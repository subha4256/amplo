USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardWebinars]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13 Sept 2019
-- Description:	This procedure populates Dashboard Popular Resources
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardWebinars]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DashboardWebinarID]
      ,[ClientID]
      ,[DashboardWebinarName]
      ,[DashboardWebinarDescription]
      ,[DashboardWebinarDate]
      ,[DashboardWebinarURLPath]
      ,[DashboardWebinarSource]
      ,[DashboardWebinarCategory]
      ,[DashboardWebinarDigitalAsset]
  FROM [Amplo].[DashboardWebinar]
--  where [ClientID] = @ClientID
  Order by [DashboardWebinarDate] desc;

END

GO
