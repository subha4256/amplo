USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspVerifyUserEmail]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspVerifyUserEmail]
    (
        @PHashCode [varchar](512)
    )
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;
    
    DECLARE @PAvailable INT
    SELECT @PAvailable = Count(UserID) from Amplo.EmailVerification WHERE VerificationHashCode = @PHashCode AND ActiveFlag=1

    IF (@PAvailable<1)
        BEGIN
            SELECT MessageName from Amplo.[Message] WHERE MessageID=10
        END

    ELSE
        BEGIN

            Declare @PUserID INT
            Select @PUserID = UserID from Amplo.EmailVerification WHERE VerificationHashCode = @PHashCode AND ActiveFlag=1 
            
            UPDATE Amplo.[EmailVerification]
            SET VerificationFlag = 1, VerificationDate = GETDATE(), ActiveFlag=0 WHERE VerificationHashCode = @PHashCode AND ActiveFlag=1
            
            UPDATE Amplo.[User]
            SET EmailValidationStatus=1 WHERE UserID = @PUserID

            SELECT MessageName from Amplo.[Message] WHERE MessageID=9
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

END;










GO
