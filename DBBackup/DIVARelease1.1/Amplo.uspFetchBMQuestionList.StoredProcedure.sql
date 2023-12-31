USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchBMQuestionList]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspFetchBMQuestionList]
 (
    @id int,
    @projectid int,
    @domainid int
 )
AS
BEGIN
/*
@id - Logged in userID
@projectid - Project for which questions are required
@domainid - Domain for which questions are required
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

--Categorizations values to be used later
    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    Declare @regionId as INT
    Declare @benchmarkProjectUserID as INT
   
    Select ques.BenchmarkQuestionID, ques.Question, opt.BenchmarkQuestionOptionID as OptionID ,opt.OptionName, 
    --opt.OptionDescription ,opt.OptionDesignChoice, 
    auditlog.ResponseUserID as LastResponseUser, auditlog.TimeStampLatest as LastResponseTime, ISNULL(accessed.LastAccessedFlag,0) as LastAccessedFlag
    from (Select DomainID from Amplo.UserDomainAccess where ActiveFlag = 1 and BenchmarkProjectID = @projectid And UserID = @id and DomainID = @domainid) dom --If user is not mapped to domain or project, inner join will return null
    inner join Amplo.BenchmarkQuestion ques on dom.DomainID = ques.DomainID --Get questions for domain
    inner join Amplo.BenchmarkQuestionOption opt on opt.BenchmarkQuestionID = ques.BenchmarkQuestionID -- Get options for question
    left Join (select Count(QuestionID) as LastAccessedFlag, QuestionID from amplo.[BenchmarkAssessment] 
	where IsNull(ModifedBy, CreadedBy) = @id and BenchmarkProjectID =@projectid and @domainid = @domainid group by QuestionID) accessed
    on ques.BenchmarkQuestionID =accessed.QuestionID
        -- return current user's last accessed flag  - 0 is not accessed
    left join (
        select te.ResponseUserID, te.BenchmarkProjectID, te.DomainID, te.QuestionID, te.ResponseID, te.TimeStampLatest from
        (select BenchmarkProjectID, DomainID, QuestionID, ISNULL(ModifiedDate, CreatedOn) as TimeStampLatest 
		, ISNULL(ModifedBy, CreadedBy) ResponseUserID, Response ResponseID
		from amplo.[BenchmarkAssessment] 
        where DomainId = @domainid and BenchmarkProjectId = @projectid
        --group by BenchmarkProjectID, DomainID, QuestionID
		) te
        --inner join amplo.[BenchmarkAssessment] b on te.BenchmarkProjectID = b.BenchmarkProjectID and te.DomainID = b.DomainID and te.QuestionID =b.QuestionID and te.TimeStampLatest = ISNULL(ModifiedDate, CreatedOn)
		) auditLog 
    on 1 = 1 --auditlog.ResponseID = opt.BenchmarkQuestionOptionID  -- Return Net Last response

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
