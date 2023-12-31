USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBMQuestionsResponses_Aashay]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateBMQuestionsResponses_Aashay]
 (
    @id int,
    @forSubmission AS Amplo.QuestionResponse READONLY,
    @projectid int,
    @domainid int,
    @userIP varchar(20)
 )
AS
BEGIN
/*
@id - Logged in userID
@quesResp - Question Response mapping table
@projectid - Project for which update is required
@domainid - Domain against which update is required
@userIP - User's IP address

QuestionResponse table type -  questionid as int, responseid as int
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    declare @username as varchar(100)
    select @username = UserName from Amplo.[User]

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    Declare @regionId as INT
    Declare @benchmarkProjectUserID as INT
    Select @benchmarkProjectUserID = BenchmarkProjectUserID from Amplo.BenchmarkProjectUser where UserID = @id and BenchmarkProjectID = @projectid

    declare @validity INT
    select @validity = COUNT(UserID) from Amplo.UserDomainAccess where UserID = @id and BenchmarkProjectID = @projectid and DomainID = @domainid and ActiveFlag = 1 

    IF @validity = 0
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    Declare @nowTime as DATETIME
    SET @nowTime= GETDATE()

    declare @quesResp Amplo.QuestionResponse
    insert into @quesResp
    select questionId, responseID
    from @forSubmission 
    intersect (Select BenchmarkQuestionID, BenchmarkQuestionOptionID from Amplo.BenchmarkQuestionOption)

    --Update Audit log
    Insert into Amplo.BenchmarkAuditLog(
        [ClientID]
      ,[BenchmarkProjectID]
      ,[DomainID]
      ,[QuestionGroup]
      ,[QuestionSeries]
      ,[QuestionCategory]
      ,[QuestionID]
      ,[Question]
      ,[QuestionWeightage]
      ,[ResponseID]
      ,[Response]
      ,[ResponseUserID]
      ,[ResponseUserName]
      ,[ResponseTimeStamp]
      ,[DesignChoice]
      ,[FirstResponseFlag]
      ,[UserIPAddress]
    )
    select
    @clientid,
    @projectid,
    @domainid,
    ques.QuestionGroup,
    ques.QuestionSeries,
    ques.QuestionCategory,
    a.questionId,
    ques.Question,
    ques.QuestionWeightage,
    a.responseID,
    opt.OptionName,
    @id,
    @username,
    @nowTime,
    ques.DesignChoice,
    NULL, --To be modified
    @userIP
    from @quesResp a
    inner Join BenchmarkQuestion ques on a.questionId = ques.BenchmarkQuestionID and ques.DomainID = @domainid
    inner join Amplo.BenchmarkQuestionOption opt on opt.BenchmarkQuestionOptionID = a.responseID
    inner join Amplo.UserDomainAccess userDets on userDets.DomainID = ques.DomainID and userDets.BenchmarkProjectID = @projectid and userDets.UserID=@id and userDets.ActiveFlag = 1




    -- BY default question weightage taken as 1 for all questions

    --Update existing responses in table
    Update Amplo.BenchmarkAssessment
    Set LastResponse = Response, LastResponseBy = RessponseUserID, LastResponseDate = ResponseDate
    from Amplo.BenchmarkAssessment BMA inner join @quesResp rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid 
    
    Update Amplo.BenchmarkAssessment
    Set Response = rcvd.responseId, RessponseUserID=@id, ResponseDate = @nowTime, ModifedBy = @id, ModifiedDate = @nowTime 
    from Amplo.BenchmarkAssessment BMA inner join @quesResp rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid 
   

-- Response for these questions do not exist in Assessment table - Insert
    
    --Set as NULL values which are already present in benchmark assessment table
    Update @quesResp
    SET questionId = NULL, responseID = NULL
    from Amplo.BenchmarkAssessment BMA 
    inner join @quesResp rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid
    

    Insert into Amplo.BenchmarkAssessment(
       [BenchmarkProjectID]
      ,[RegionID]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[DomainID]
      ,[GroupID]
      ,[QuestionID]
      ,[Response]
      ,[RessponseUserID]
      ,[ResponseDate]
      ,[LastResponse]
      ,[LastResponseBy]
      ,[LastResponseDate]
      ,[ResponseComments]
      ,[QuestionWeight]
      ,[BenchMark]
      ,[CreadedBy]
      ,[CreatedOn]
      ,[ModifedBy]
      ,[ModifiedDate]
    )
    Select 
        @projectid,
        @regionId,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
        @domainid,
        NULL,
        questionId,
        responseID,
        @id,
        @nowTime,
        NULL,
        NULL,
        NULL,
        NULL,
        1,
        NULL,
        @id,
        @nowTime,
        NULL,
        NULL
    from (select * from @quesResp where questionId IS NOT NULL and responseID IS NOT NULL) ques
    inner join Amplo.BenchmarkQuestion domFilter on domFilter.BenchmarkQuestionID = ques.questionId and domFilter.DomainID = @domainid 
    inner join Amplo.UserDomainAccess userDets on userDets.DomainID = domFilter.DomainID and userDets.BenchmarkProjectID = @projectid and userDets.UserID=@id and userDets.ActiveFlag = 1 


-- Successfull updation of records
    SELECT messageName from Amplo.[Message] where MessageID = 1015

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    


END






GO
