USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPIControlLeverDetails]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetKPIControlLeverDetails]
	-- Add the parameters for the stored procedure here
	@KPIID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

--	Declare @clientid as INT
--    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here

	SELECT [KPIControlLeversID] AS 'ControlLeverID' 
		,[KPIID] AS 'KPIID'
		,[ControlLeversTitle] AS 'ControlLeversTitle'
		,[PersonaImpacted] AS 'PersonaImpacted'
--KPI Sets Implementation
		,[ExpectedTargetGrowth]
		,[UnitOfMeasurement]
		,[TargetDate]
		,[Improvementbasis]
		,[AuditFrequency]
		,(SELECT COUNT(1) FROM Amplo.KPIInhibitors b where b.[KPIControlLeversID] = a.[KPIControlLeversID] and b.ActiveFlag=1) AS 'KPIInhibitorsCount'
		,(SELECT COUNT(1) FROM [Amplo].[KPICapabilities] b where b.[KPIControlLeversID] = a.[KPIControlLeversID] and b.ActiveFlag=1) AS 'KPICapabilities'
		, ISNULL([ExpectedTargetGrowth], '') expect_target_growth
		, ISNULL([UnitOfMeasurement], '') measurement_unit
		, ISNULL([TargetDate], GETDATE()) target_date
		, ISNULL([Improvementbasis], '') improvement_basis
		, ISNULL(EstimatedSavings, '') estimated_savings
		, ISNULL([AuditFrequency], '') audit_frequency
	FROM [Amplo].[KPIControlLevers] a
	WHERE KPIID = @KPIID AND [ActiveFlag] = 1
	ORDER BY a.CREATEDDATE ASC
--	FOR JSON AUTO;
END
GO
