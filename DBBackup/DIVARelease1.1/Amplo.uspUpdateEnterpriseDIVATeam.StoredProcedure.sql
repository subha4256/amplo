USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateEnterpriseDIVATeam]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	This procedure updates Enterprise DIVA team
-- =============================================
CREATE PROCEDURE [Amplo].[uspUpdateEnterpriseDIVATeam]

-- Add the parameters for the stored procedure here
        @UserID [int],
		@DIVAUserID [int],
        @EmailAddress [nvarchar](100),
        @FirstName [varchar](100),
--      @MiddleName [varchar](50),
        @LastName [varchar](100),
		@UserType [int],
		@DisableDate [date],
		@UserIPAddress [varchar](50),
		@UserStatusID [int]
		
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @UserID

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    DECLARE @clientID int
    Select @clientID = ClientID from Amplo.[User] where @UserID = UserID
    
    BEGIN
        --Set every to add on user
        Update Amplo.[UserDIVATeam]
        Set [FirstName] = @FirstName 
        ,[LastName] = @LastName
        ,[Email] = @EmailAddress
       ,[ActiveFlag] = 1
       ,[UserTypeID] = @UserType
       ,[UserStatusID] = @UserStatusID
  	   ,[DisableDate] = @DisableDate
       ,[ModifiedBy] = @UserID
       ,[ModifiedDate]= GETDATE()
		where UserDIVATeamID = @DIVAUserID

       select MessageName from Amplo.[Message] where MessageID = 1024   --Successful updation of superusers message returned
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
