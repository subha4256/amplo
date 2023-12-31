USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspDeleteClientProject]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspDeleteClientProject]
 (
    @id int,
    @assessmentsetid int
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentsetid - ID of set to be updated
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF @SuperUser <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT MessageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    update Amplo.BenchmarkProject
    SET ActiveFlag = 0, ModifiedBy = @id, ModifiedDate = GETDATE()
    where BenchmarkProjectID = @assessmentsetid
    

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
