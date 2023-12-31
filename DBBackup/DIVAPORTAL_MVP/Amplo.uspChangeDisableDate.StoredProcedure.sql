USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspChangeDisableDate]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspChangeDisableDate]
 (
    @id int,
    @userIDtoChangeDate varchar(100),
    @disableDate DATETIME
 )
AS
BEGIN
/*
@id - Logged in userID
@userIDtoChangeDate - User ID to update
@disableDate - DateTime type to update disable date
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF @SuperUser <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    declare @sameClientFlag INT
    select @sameClientFlag = COUNT(UserID) from Amplo.[User] where UserID = @userIDtoChangeDate and ClientID = (Select ClientID from Amplo.[User] where UserID = @id)

    IF @sameClientFlag = 0
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    Update Amplo.[User]
    SET DisableDate = @disableDate, UserModifiedBy = @id, UserModifiedDate = GETDATE() where UserID = @userIDtoChangeDate


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
