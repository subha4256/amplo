USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardEvent]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13 Sept 2019
-- Description:	This procedure populates Dashboard Events
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardEvent]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT
        [DashboardEventID],
        [ClientID],
        [DashboardEventName],
        [DashboardEvent],
        [DashboardEventDate],
        [DashboardEventURLPath],
        [DashboardEventSource],
        [DashboardEventCategory],
        [DashboardEventsDigitalAsset]
    from [Amplo].[DashboardEvent]
--  where [ClientID] = @ClientID
  Order by [DashboardEventDate] desc;

END


GO
