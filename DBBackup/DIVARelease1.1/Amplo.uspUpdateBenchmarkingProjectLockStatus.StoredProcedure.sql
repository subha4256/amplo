USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBenchmarkingProjectLockStatus]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateBenchmarkingProjectLockStatus]
(
    @UserID int,
    @PProjectID int,
    @ProjectLockedFlag bit
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;

		Declare @ClientID as INT
		Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

		   
		UPDATE Amplo.BenchmarkProject 
		SET LockedFlag = @ProjectLockedFlag WHERE ClientID= @ClientID AND BenchmarkProjectID = @PProjectID;

		-- Successfull updation of records
		SELECT messageName from Amplo.[Message] where MessageID = 1029
		

        COMMIT TRANSACTION;

--        if @@ROWCOUNT > 0 
--            select 'Project status has been done successfully';
--        ELSE
--            select 'Project status has not been done successfully';
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



End;


GO
