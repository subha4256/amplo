USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspDisableUser]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspDisableUser]
(
    @id int,
    @userID int
)

/*
@id - Logged in SuperUser ID
@userID - User ID to disable
*/

AS
BEGIN
    SET NOCOUNT ON;

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

    DECLARE @clientID int
    Select @clientID = ClientID from Amplo.[User] where @id = UserID
 
    UPDATE Amplo.[User]
    SET UserStatusID = '3', UserModifiedBy = @id --change the value to suspended
    WHERE UserID = @userID and ClientID = @clientID  

    --Message for successfull disable
    select MessageName from Amplo.[Message] where MessageID = 1018


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

END;



GO
