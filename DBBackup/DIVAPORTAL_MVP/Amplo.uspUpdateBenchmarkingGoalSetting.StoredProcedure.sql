USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBenchmarkingGoalSetting]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ==============================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	This procedure updates Benchmarking Goal setting details
-- ==============================================================================

CREATE PROCEDURE [Amplo].[uspUpdateBenchmarkingGoalSetting]
 (
    @UserID int,
    @projectid int,
    @domainid int,
--	@IndustryBenchmark float,
--	@ASISBenchmark float,
	@GoalSetting float
)
AS
BEGIN
/*
@UserID - Logged in userID
@projectid - Project for which update is required
@domainid - Domain against which update is required
@IndustryBenchmark - Industry Benchmarking Score
@ASISBenchmark - ASIS Benchmarking Score
@GoalSetting - Goal setting Benchmarking Score
@userIP - User's IP address

QuestionResponse table type -  questionid as int, responseid as int
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID

    BEGIN
    --Update existing responses in table

		UPDATE Amplo.BenchmarkingGoalSetting
		SET [GoalSetting] = @GoalSetting, [ModifedBy] = @UserID, [ModifiedDate]= Getdate()
--		SET [IndustryBenchmark] = @IndustryBenchmark, [GoalSetting] = @GoalSetting, [ASISBenchmark] = @ASISBenchmark, [ModifedBy] = @UserID, [ModifiedDate]= Getdate()
		where ClientID = @clientid and  [BenchmarkProjectID] = @projectid and [DomainID]=@domainid;
		-- Successfull updation of records
		SELECT messageName from Amplo.[Message] where MessageID = 1022

    END

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END






GO
