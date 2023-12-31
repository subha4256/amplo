USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBMProjectStatus]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateBMProjectStatus]
 (
    @projectid int
 )
AS
BEGIN
/*
@projectid - Project ID to update status of 
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;


--Update status

    Declare @DisabledStatus INT
    select @DisabledStatus = DisabledFlag from Amplo.BenchmarkProject where BenchmarkProjectID = @projectid
    IF @DisabledStatus = 1
    BEGIN
      --  Update Amplo.BenchmarkProject
     --   SET [status] = 6 where BenchmarkProjectID = @projectid 

     --Commented out as now 'Disabled' is not a status of master table but referenced by flag
        SELECT messageName from Amplo.[Message] where MessageID = 1015
        COMMIT
        RETURN
    END


    declare @LockStatus int
    select @LockStatus = LockedFlag from Amplo.BenchmarkProject where BenchmarkProjectID = @projectid

    IF @LockStatus = 1
    BEGIN
     --   Update Amplo.BenchmarkProject
     --   SET [status] = 5 where BenchmarkProjectID = @projectid 

     --Commented out as now 'Locked' is not a status of master table but referenced by flag
        SELECT messageName from Amplo.[Message] where MessageID = 1015
        COMMIT
        RETURN
    END
    
    ELSE 
    BEGIN
       
       ---IF ELSE FOR GOALS SET STATUS

       
        --count of questions in the domain
        declare @countQuestions int
        select @countQuestions = Count(ques.BenchmarkQuestionID) from
        (Select distinct(DomainID) from Amplo.UserDomainAccess where BenchmarkProjectID = @projectid) doms
        inner join Amplo.BenchmarkQuestion ques on doms.DomainID = ques.DomainID

        --count of responses in benchmark assessment
        declare @countResp INT
        select @countResp = Count(BenchmarkAssessmentID) from Amplo.BenchmarkAssessment where BenchmarkProjectID = @projectid and Response is not null
        
        update Amplo.BenchmarkProject
        Set [status]=
        CASE
            when @countResp = @countQuestions THEN 3
            when @countResp = 0 THEN 1
            when @countResp < @countQuestions THEN 2
        END
        where BenchmarkProjectID = @projectid
    END    

    
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
