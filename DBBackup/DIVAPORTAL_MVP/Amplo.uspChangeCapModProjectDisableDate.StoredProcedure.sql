USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspChangeCapModProjectDisableDate]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspChangeCapModProjectDisableDate]
 (
    @id int,
    @CapModProjectID int,
    @disableDate DATETIME
 )
AS
BEGIN
/*
@id - Logged in userID
@CapModProjectID - ID of set to update
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
    select @projFforClientFlag = Count(DecompositionProjectID) from Amplo.DecompositionProject where ClientID = (select ClientID from Amplo.[User] where UserID = @id) and DecompositionProjectID = @CapModProjectID

    IF ISNULL(@projFforClientFlag,0) < 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


--update disable date in table
    Update Amplo.DecompositionProject
    SET DisableDate = @disableDate, ModifiedBy = @id, ModifiedDate = GETDATE() where DecompositionProjectID = @CapModProjectID

    --update disabled flag if to be disabled
    IF @disableDate < GETDATE()
    BEGIN
        
        Update Amplo.DecompositionProject
        SET DisabledFlag = 1 where DecompositionProjectID = @CapModProjectID
    END

    ELSE
    Begin
         Update Amplo.DecompositionProject
        SET DisabledFlag = 0 where DecompositionProjectID = @CapModProjectID
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
