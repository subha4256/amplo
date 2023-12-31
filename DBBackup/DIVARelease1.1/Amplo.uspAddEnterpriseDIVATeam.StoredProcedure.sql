USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddEnterpriseDIVATeam]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ===========================================================================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	The procedure updates DIVA team (Enterprise user details from DIVA Team functionality)
-- ===========================================================================================================================
CREATE PROCEDURE [Amplo].[uspAddEnterpriseDIVATeam]
	-- Add the parameters for the stored procedure here
        @UserID [int],
        @EmailAddress [nvarchar](100),
        @FirstName [varchar](100),
        @LastName [varchar](100),
		@UserType [int],
		@UserStatusID [int],
--		@DisableDate [date],
		@UserIPAddress [varchar](50)
AS

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    DECLARE @countRowUser int,@countOrgDivUser int, @ClientID int
	DECLARE @CountDIVAUser int
    DECLARE @Message VARCHAR(512)
	DECLARE @StatukLookupID int
    -- Insert statements for procedure here
    BEGIN TRY
    BEGIN TRANSACTION;

    SELECT @countRowUser = Count(*) FROM [Amplo].[User] WHERE EmailAddress = @EmailAddress;
	SELECT @CountDIVAUser = COUNT(*) FROM [Amplo].[UserDIVATeam] WHERE Email = @EmailAddress; 
	SELECT @UserStatusID = StatusLookupID from [Amplo].[StatusLookup] WHERE LookupCode = 'USERSTATUS_NEW';

	select @ClientID = ClientID FROM [Amplo].[User] where UserID = @UseriD;
    IF (@countRowUser > 0 OR @CountDIVAUser > 0 )
        BEGIN
            --RETURN 1;
            select MessageName from Amplo.Message where MessageID = 1
        END
    ELSE
	BEGIN 

	INSERT INTO [Amplo].[UserDIVATeam]
           ([ClientID]
           ,[SuperUserID]
           ,[FirstName]
           ,[LastName]
           ,[Email]
--           ,[DisableDate]
           ,[UserTypeID]
		   ,[UserStatusID]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate])
     VALUES
           (@ClientID
           ,@UserID
           ,@FirstName
           ,@LastName
           ,@EmailAddress
--         ,<DisableDate, date,>
           ,@UserType
		   ,@UserStatusID
           ,0
           ,@UserID
           ,GETDATE()
		)


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
