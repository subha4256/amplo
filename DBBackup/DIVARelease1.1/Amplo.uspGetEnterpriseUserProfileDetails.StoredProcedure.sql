USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseUserProfileDetails]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 22-October-2019
-- Description:	This procedure retrieves User Profile details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseUserProfileDetails]
	-- Add the parameters for the stored procedure here
	@UserID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   -- Insert statements for procedure here
	SELECT a.[UserID]
		  ,a.[FirstName]
		  ,a.[MiddleName]
		  ,a.[LastName]
		  ,b.[ClientBusinessUnit]
		  ,b.[ClientParentCompany]
		  ,a.[PhoneNumber]
		  ,a.[EmailAddress]
		  ,a.[UserLinkedINProfileID]
		  ,a.[DisableDate]
		  ,a.[UserCreatedDate]
		  ,a.[ProfilePhotoPath]
		  ,c.[UserTypeName]
	FROM [Amplo].[User] a 
	INNER JOIN [Amplo].[Client] b
		on a.ClientiD = b.ClientID
	INNER JOIN [Amplo].[UserType] c
	on a.UserTypeID = c.UserTypeID
	where UserID=@UserID
END
GO
