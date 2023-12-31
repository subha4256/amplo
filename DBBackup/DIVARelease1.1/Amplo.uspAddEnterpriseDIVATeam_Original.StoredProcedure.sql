USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddEnterpriseDIVATeam_Original]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ===========================================================================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	The procedure updates DIVA team (Enterprise user details from DIVA Team functionality)
-- ===========================================================================================================================
CREATE PROCEDURE [Amplo].[uspAddEnterpriseDIVATeam_Original]
	-- Add the parameters for the stored procedure here
        @UserID int,
        @EmailAddress [nvarchar](100),
        @FirstName [varchar](100),
--      @MiddleName [varchar](50),
        @PLastName [varchar](100),
		@UserType int,
		@UserStatusID int,
		@DisableDate date,
		@UserIPAddress varchar(50)
AS

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
    BEGIN TRY
    BEGIN TRANSACTION;
    DECLARE @countRowUser int,@countOrgDivUser int, @ClientID int
    DECLARE @Message VARCHAR(512)
    SELECT @countRowUser = Count(*) FROM [Amplo].[User] WHERE EmailAddress = @EmailAddress;
	select @ClientID = ClientID FROM [Amplo].[User] where UserID = @UseriD;
--    SELECT @countOrgDivUser = Count(*) FROM [Amplo].[Client] WHERE ClientName = @PClientName 
    --AND ClientBusinessUnit = @PClientBusinessUnit;
    IF (@countRowUser>0)
        BEGIN
            --RETURN 1;
            select MessageName from Amplo.Message where MessageID = 1
        END
    ELSE
	BEGIN 

    		INSERT INTO [Amplo].[User]
    (
        [USERNAME],
		[FirstName],
--      [MiddleName],
        [LastName],
        [EmailAddress],
		[UserPassword],
        [EmailValidationStatus],
		[PhoneNumber],
        [ActiveFlag],
        [ClientID],
        [UserLinkedINProfileID],
        [UserTypeID],
        [UserStatusID],
		[DisableDate],
        [UserCreatedBy],
        [UserCreatedDate]
    )
    VALUES
    (
       @FirstName + ' '+ @PLastName,
		@FirstName,
--      @MiddleName,
        @PLastName,
        @EmailAddress,
		'tmppassword'
        ,0,
		'1434456',
        1,
        @ClientID,
        NULL,
        @UserType,
        @UserStatusID,
		@DisableDate,
        @UserID,
        GETDATE()
    );

/*		INSERT INTO [Amplo].[User]
    (
        [FirstName],
--      [MiddleName],
        [LastName],
        [EmailAddress],
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
        @FirstName,
--      @MiddleName,
        @PLastName,
        @EmailAddress,
        0,
        1,
        @ClientID,
        NULL,
        @UserType,
        @UserStatusID,
        @UserID,
        GETDATE()
    );
	*/
--    SELECT @userID = UserID FROM [Amplo].[User] WHERE UserName = @PUserName;
  INSERT INTO [Amplo].[EmailVerification]
    (
      [UserID],
      [UserName],
      [VerificationFlag],
      [ActiveFlag],
      [VerificationDate],
      [UserIPAddress]
    )
    VALUES
    (
        @userID,
        @FirstName,
		0,
		0,
        GETDATE(),
		@UserIPAddress
    );
  
   -- RETURN 3;
   select MessageName from Amplo.Message where MessageID = 1023
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
