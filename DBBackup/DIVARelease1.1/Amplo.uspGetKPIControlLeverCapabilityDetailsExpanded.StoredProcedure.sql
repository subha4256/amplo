USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPIControlLeverCapabilityDetailsExpanded]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================
-- Author:		Biswajit
-- Create date: 21-Otober-2019
-- Description:	This procedure retrieves KPI Control Lever details along with Inhibitors and Capabilities 
-- ====================================================================
CREATE PROCEDURE [Amplo].[uspGetKPIControlLeverCapabilityDetailsExpanded]
	-- Add the parameters for the stored procedure here
	@KPIControlLeverID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT a.[KPIControlLeversID] AS 'ControlLeverID' 
		,[KPIID] AS 'KPIID'
		,[ControlLeversTitle] AS 'ControlLeversTitle'
		,[PersonaImpacted] AS 'PersonaImpacted'
		,c.[CapabilitiesTitle] AS 'Capabilities'
		, c.KPICapabilitiesId as 'KPICapabilitiesId'
	FROM [Amplo].[KPIControlLevers] a
	--INNER JOIN (SELECT * FROM [Amplo].[KPIInhibitors] WHERE ActiveFlag=1) b on a.KPIControlLeversID = b.KPIControlLeversID
	INNER JOIN (SELECT * FROM [Amplo].[KPICapabilities] WHERE ActiveFlag=1) c on a.KPIControlLeversID = c.KPIControlLeversID
	WHERE a.KPIControlLeversID = @KPIControlLeverID AND a.[ActiveFlag] = 1
	ORDER BY a.CREATEDDATE ASC
--	FOR JSON AUTO;
END

GO
