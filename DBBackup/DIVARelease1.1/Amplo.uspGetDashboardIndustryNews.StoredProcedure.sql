USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardIndustryNews]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13 Sept 2019
-- Description:	This procedure populated Highlights for Dashboard
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardIndustryNews]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DashboardIndustryNewsID]
      ,[ClientID]
      ,[DashboardIndustryNewsName]
      ,[IndustryNews]
      ,[IndustryNewsURLPath]
      ,[DashboardIndustryNewsDate]        
      ,[IndustryNewsSource]
      ,[IndustryNewsCategory]
      ,[IndustryNewsDigitalAsset]
  FROM [Amplo].[DashboardIndustryNews]
--  where [ClientID] = @ClientID 
  Order by [DashboardIndustryNewsDate] desc;

END

GO
