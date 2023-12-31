USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseUserTypes]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =======================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	This procedure retireves Enterprise User Types
-- =======================================================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseUserTypes]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [UserTypeID]
		  ,[UserTypeName]
		  , UserTypeIsEnabled
	  FROM [Amplo].[UserType]
	  where [UserTypeIsEnabled] = 'Yes' and [UserCategoryID] = 1

END
GO
