USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspLogin]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspLogin]
(
    @PUserName [varchar](100),
    @PPassword [varchar](100)
)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;
    
    DECLARE @userName VARCHAR(100),@pwd VARCHAR(100),@emailValid INT,@status INT,@activeFlag INT,@countUser INT
    SELECT @userName = [UserName] , @pwd = UserPassword,@emailValid = EmailValidationStatus,@status = UserStatusID
     FROM [Amplo].[User] WHERE UserName = @PUserName AND ActiveFlag = 1;
     SELECT @countUser = Count(*) FROM [Amplo].[User] WHERE UserName = @PUserName AND ActiveFlag = 1;
    IF(@countUser>0)
    BEGIN
        IF(@userName != @PUserName OR @pwd != @PPassword)
        BEGIN
            --RETURN 'Wrong UserName or Password';
            SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 4;
        END;
        ELSE IF(@emailValid=0)
        BEGIN
            --RETURN 'Please Verify Email';
            SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 5;
        END
        ELSE IF(@status=2)
        BEGIN
            --RETURN 'Waiting For Admin Approval';
            SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 6;
        END
        ELSE
        BEGIN
            --RETURN 'LOGGED IN';
            SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 7;
        END
    END
    ELSE
    BEGIN
        --RETURN 'No Such User Exists.'
        SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 8;
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

        EXECUTE [dbo].[uspLogError];
    END CATCH;

END;






GO
