USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPIDetails]    Script Date: 1/9/2020 6:50:44 PM ******/
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
--KPI Sets Implementation
		,[ExpectedTargetGrowth]
		,[UnitOfMeasurement]
		,[TargetDate]
		,[Improvementbasis]
		,[AuditFrequency]
		,(select count(*) from Amplo.KPIControlLevers b where a.KPIID = b.KPIID and b.ActiveFlag=1) AS ControlLevelCount
		, ISNULL([ExpectedTargetGrowth], '') expect_target_growth
		, ISNULL([UnitOfMeasurement], '') measurement_unit
		, ISNULL([TargetDate], GETDATE()) target_date
		, ISNULL([Improvementbasis], '') improvement_basis
		, ISNULL([AuditFrequency], '') audit_frequency
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
		,[ExpectedTargetGrowth]
		,[UnitOfMeasurement]
		,[TargetDate]
		,[Improvementbasis]
		,[AuditFrequency]
		,(select count(*) from Amplo.KPIControlLevers b where a.KPIID = b.KPIID and b.ActiveFlag=1) AS ControlLevelCount
		, ISNULL([ExpectedTargetGrowth], '') expect_target_growth
		, ISNULL([UnitOfMeasurement], '') measurement_unit
		, ISNULL([TargetDate], GETDATE()) target_date
		, ISNULL([Improvementbasis], '') improvement_basis
		, ISNULL([AuditFrequency], '') audit_frequency
		 FROM Amplo.KPI a
		WHERE KPIID = @KPIID AND ClientID = @clientid AND [ActiveFlag] = 1


--	FOR JSON AUTO;

END
GO
