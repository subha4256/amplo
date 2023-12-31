USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateEnterpriseUserProfileDetails]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =======================================================================================
-- Author:		Srinivas
-- Create date: 22-October-2019
-- Description:	This procedure updated User Profile details
-- =======================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateEnterpriseUserProfileDetails]
	-- Add the parameters for the stored procedure here
       @UserID [int]
      ,@FirstName [varchar](100)
      ,@MiddleName [varchar](50)
      ,@LastName [varchar](100)
      ,@PhoneNumber [nvarchar](100)
	  ,@ProfilePhotoPath [nvarchar](100)
--      ,@EmailAddress nvarchar(256)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   -- Insert statements for procedure here
    BEGIN TRY

	UPDATE [Amplo].[User]
	   SET 
		   [FirstName] = @FirstName
		  ,[MiddleName] = @MiddleName
		  ,[LastName] = @LastName
		  ,[PhoneNumber] = @PhoneNumber
		  ,[ProfilePhotoPath] = @ProfilePhotoPath
--		  ,[EmailAddress] = @EmailAddress
	 WHERE UserID=@UserID

    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
