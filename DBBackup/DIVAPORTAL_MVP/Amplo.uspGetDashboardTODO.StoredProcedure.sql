USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardTODO]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 15 Sept 2019
-- Description:	This procedure populates TODO task details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardTODO]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT
	[DashboardTODOID],
	[DashboardTODOTaskDescription],
	[DashboardTODOStatus],
	[DashboardTODURLPath],
	[DashboardTODODate],
	[DashboardTODOSource],
	[DashboardTODOCategory],
	[DashboardTODODigitalAsset],
	[ActiveFlag]
  FROM [Amplo].[DashboardTODO]
--  where [ClientID] = @ClientID 
  Order by [DashboardTODODate] desc;

END


GO
