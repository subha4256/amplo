USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardAnnouncements]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13 Sept 2019
-- Description:	This procedure populates Dashboard Announcements
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardAnnouncements]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DashboardAnnouncementID]
      ,[ClientID]
      ,[DashboardAnnouncementName]
      ,[DashboardAnnouncementHighlights]
      ,[DashboardAnnouncementSubHighlights]
      ,[DashboardAnnouncementURLPath]
      ,[DashboardAnnouncementSource]
      ,[DashboardAnnouncementCategory]
      ,[DashboardAnnouncementDigitalAsset]
  FROM [Amplo].[DashboardAnnouncement]
--  where [ClientID] = @ClientID
  Order by [CreatedDate] desc;

END


GO
