USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchBMQuestionDetails]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspFetchBMQuestionDetails]
 (
    @id int,
    @projectid int,
    @domainid int,
    @questionid int
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id
    select ques.BenchmarkQuestionID, ques.Question, opt.BenchmarkQuestionOptionID, opt.OptionName, opt.OptionDescription, opt.OptionDesignChoice, opt.OptionIconPath, 
         aud.ResponseUserID as LastUserResponded, aud.ResponseTimeStamp as LastUserResponseTime, currSel.ResponseTimeStamp as CurrentUserLastSelected, iSNULL(ques.DesignChoice, 'strategy') DesignChoice, aud.Response
    from (Select DomainID from Amplo.UserDomainAccess where ActiveFlag = 1 and BenchmarkProjectID = @projectid And UserID = @id and DomainID = @domainid) dom --If user is not mapped to domain or project, inner join will return null
    inner join Amplo.BenchmarkQuestion ques on dom.DomainID = ques.DomainID and BenchmarkQuestionID = @questionid         --Get questions for domain
    inner join Amplo.BenchmarkQuestionOption opt on opt.BenchmarkQuestionID = ques.BenchmarkQuestionID                    --Get options for question
    
	left outer join (select Top 1 Response ResponseID, ISNULL(ModifiedDate, CreatedOn) ResponseTimeStamp, ISNULL(ModifedBy, CreadedBy) ResponseUserID, Response 
	from Amplo.BenchmarkAssessment where QuestionID = @questionid and BenchmarkProjectID = @projectid and DomainID = @domainid)
	--left join (select Top 1 ResponseID, ResponseUserID, ResponseTimeStamp, Response from Amplo.BenchmarkAuditLog where QuestionID = @questionid and BenchmarkProjectID = @projectid and DomainID = @domainid order by ResponseTimeStamp desc) 
	--aud on aud.ResponseID = opt.BenchmarkQuestionOptionID
	aud on ceiling(aud.Response) = opt.OptionName
    
	left join (select Top 1 ResponseID, ResponseTimeStamp from Amplo.BenchmarkAuditLog where QuestionID = @questionid and BenchmarkProjectID = @projectid and DomainID = @domainid and ResponseUserID = @id order by ResponseTimeStamp desc) currSel 
	on currSel.ResponseID = opt.BenchmarkQuestionOptionID 

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
