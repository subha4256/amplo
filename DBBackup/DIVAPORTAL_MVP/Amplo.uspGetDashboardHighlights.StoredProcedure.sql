USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardHighlights]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDashboardHighlights]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DashboardHighlightsID]
      ,[ClientID]
      ,[DashboardHighlightsName]
      ,[DashboardHighlights]
      ,[DashboardHighlightsURLPath]
      ,[DashboardHighlightsSource]
      ,[DashboardHighlightsCategory]
      ,[DashboardHighlightsDigitalAsset]
  FROM [Amplo].[DashboardHighlights]
--  Where [ClientID] = @ClientID
  Order by [CreatedDate] desc;

END

GO
