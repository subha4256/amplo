USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPIDetails]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 15-Otober-2019
-- Description:	This procedure retrieves KPI details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetKPIDetails]
	-- Add the parameters for the stored procedure here
	@USERID [int],
	@KPIID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here
	if @KPIID = 0

		SELECT [KPIID]
		,[KPIName] 
		,[KPITitle]
		,[BusinessOutcome]
		,[BusinessMetrics]
		,[PersonaImpacted]
		,[EstimatedSavings]
		,(select count(*) from Amplo.KPIControlLevers b where a.KPIID = b.KPIID and b.ActiveFlag=1) AS ControlLevelCount
		 FROM Amplo.KPI a
		WHERE ClientID = @clientid AND [ActiveFlag] = 1

	else

		SELECT [KPIID]
		,[KPIName] 
		,[KPITitle]
		,[BusinessOutcome]
		,[BusinessMetrics]
		,[PersonaImpacted]
		,[EstimatedSavings]
		,(select count(*) from Amplo.KPIControlLevers b where a.KPIID = b.KPIID and b.ActiveFlag=1) AS ControlLevelCount
		 FROM Amplo.KPI a
		WHERE KPIID = @KPIID AND ClientID = @clientid AND [ActiveFlag] = 1


--	FOR JSON AUTO;

END
GO
