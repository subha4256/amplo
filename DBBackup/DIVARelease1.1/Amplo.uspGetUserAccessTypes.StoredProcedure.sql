USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserAccessTypes]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =========================================================================================================================================
-- Author:		Srinivas
-- Create date: <Create Date,,>
-- Description:	This Procedure retrieves Amplo user types
-- =========================================================================================================================================
CREATE PROCEDURE [Amplo].[uspGetUserAccessTypes]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [UserTypeID]
		  ,[UserTypeName]
	  FROM [Amplo].[UserType]
	  where [UserTypeIsEnabled] = 'Yes' and [UserCategoryID] = 2

END
GO
