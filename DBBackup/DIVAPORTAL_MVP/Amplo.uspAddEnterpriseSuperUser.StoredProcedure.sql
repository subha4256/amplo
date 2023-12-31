USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddEnterpriseSuperUser]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspAddEnterpriseSuperUser]
    (
        @PClientName [varchar](255),
        @PClientBusinessUnit [varchar](100),
        @PClientParentCompany [varchar](255),
        @PIndustryID [int],
        @PClientRevenueRangeID [int],
        @PPhoneNumber [nvarchar](50),
        @PEmailAddress [nvarchar](100),
        @PSubscriptionKey [varchar](100),
        @PRegistrationModeID [int],
        @PUserName [varchar](100),
        @PFirstName [varchar](100),
        @MiddleName [varchar](50),
        @PLastName [varchar](100),
        @PUserPassword [nvarchar](256),
        @PHash [varchar](512)


    )
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;
    DECLARE @countRowUser int,@countOrgDivUser int,@userID int
    DECLARE @Message VARCHAR(512)
    SELECT @countRowUser = Count(*) FROM [Amplo].[User]  WHERE EmailAddress = @PEmailAddress;
    SELECT @countOrgDivUser = Count(*) FROM [Amplo].[Client] WHERE ClientName = @PClientName 
    --AND ClientBusinessUnit = @PClientBusinessUnit;
    IF (@countRowUser>0)
        BEGIN
            --RETURN 1;
            select MessageName from Amplo.Message where MessageID = 1
        END
    ELSE IF(@countOrgDivUser>0)
        BEGIN
           -- RETURN 2;
           select MessageName from Amplo.Message where MessageID = 2
        END
    ELSE
    BEGIN 
    INSERT INTO [Amplo].[Client]
    (
    [ClientName],
	[ClientBusinessUnit],
	[ClientParentCompany],
	[IndustryID],
	[ClientRevenueRangeID],
	[PhoneNumber],
	[EmailAddress],
	[SubscriptionKey],
	[ActiveFlag],
	[RegistrationModeID],
	[ClientCreatedBy],
	[ClientCreatedDate]
    )
    VALUES
    (
        @PClientName,
        @PClientBusinessUnit,
        @PClientParentCompany,
        @PIndustryID,
        @PClientRevenueRangeID,
        @PPhoneNumber,
        @PEmailAddress,
        @PSubscriptionKey,
        1,
        1,
        'SYSADMIN',
        GETDATE()
      )
    DECLARE @id int
    SET @id =  @@IDENTITY

     
    
    INSERT INTO [Amplo].[User]
    (
        [UserName],
        [FirstName],
        [MiddleName],
        [LastName],
        [PhoneNumber],
        [EmailAddress],
        [UserPassword],
        [EmailValidationStatus],
        [ActiveFlag],
        [ClientID],
        [UserLinkedINProfileID],
        [UserTypeID],
        [UserStatusID],
        [UserCreatedBy],
        [UserCreatedDate]
    )
    VALUES
    (
        @PUserName,
        @PFirstName,
        @MiddleName,
        @PLastName,
        @PPhoneNumber,
        @PEmailAddress,
        @PUserPassword,
        0,
        1,
        @id,
        NULL,
        1,
        2,
        'SYSADMIN',
        GETDATE()
    );
    SELECT @userID = UserID FROM [Amplo].[User] WHERE UserName = @PUserName;
    INSERT INTO [Amplo].[EmailVerification]
    (
        [UserID],
      [UserName],
      [VerificationHashCode],
      [VerificationHashCodeDate],
      [VerificationFlag],
      [ActiveFlag],
      [VerificationDate],
      [VerificationRemarks],
      [UserIPAddress]
    )
    VALUES
    (
        @userID,
        @PUserName,
        @PHash,
        GETDATE(),
        0,
        1,
        NULL,
        NULL,
        NULL
    );
   -- RETURN 3;
   select MessageName from Amplo.Message where MessageID = 3
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
