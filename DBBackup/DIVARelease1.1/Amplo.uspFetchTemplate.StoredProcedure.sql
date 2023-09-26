USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchTemplate]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspFetchTemplate]
@TemplateId as int
AS
BEGIN
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [TemplateID]
		,[TemplateTitle]
		,[IMAGEPATH] AS 'ImagePath'
	FROM [Amplo].[CMTemplate]
	WHERE [ActiveFlag] = 1 and TemplateId = @TemplateId
  
  END
GO
