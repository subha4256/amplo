USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchTemplates]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =======================================================================================================================================
-- Author:		Srinivas
-- Create date: 13-December-2019
-- Description:	This procedure retrieves template details 
-- =======================================================================================================================================
CREATE PROCEDURE [Amplo].[uspFetchTemplates]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [TemplateID]
		,[TemplateTitle]
		,[IMAGEPATH] AS 'ImagePath'
	FROM [Amplo].[CMTemplate]
	WHERE [ActiveFlag] = 1
  
  END
GO
