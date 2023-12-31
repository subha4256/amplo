USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspChangeBMProjectDisableDate]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspChangeBMProjectDisableDate]
 (
    @id int,
    @assessmentSetID int,
    @disableDate DATETIME
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentSetID - ID of set to update
@disableDate - DateTime type to update disable date
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    declare @projFforClientFlag as int
    select @projFforClientFlag = Count(BenchmarkProjectID) from Amplo.BenchmarkProjectUser where ClientID = (select ClientID from Amplo.[User] where UserID = @id) and BenchmarkProjectID = @assessmentSetID

    IF ISNULL(@projFforClientFlag,0) < 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


--update disable date in table
    Update Amplo.BenchmarkProject
    SET DisableDate = @disableDate, ModifiedBy = @id, ModifiedDate = GETDATE() where BenchmarkProjectID = @assessmentSetID

    --update disabled flag if to be disabled
    IF @disableDate < GETDATE()
    BEGIN
        
        Update Amplo.BenchmarkProject
        SET DisabledFlag = 1 where BenchmarkProjectID = @assessmentSetID
    END

    ELSE
    Begin
         Update Amplo.BenchmarkProject
        SET DisabledFlag = 0 where BenchmarkProjectID = @assessmentSetID
    END

    select MessageName from Amplo.Message where MessageID = 1013

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
