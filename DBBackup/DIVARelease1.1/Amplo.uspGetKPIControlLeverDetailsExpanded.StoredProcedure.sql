USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPIControlLeverDetailsExpanded]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================
-- Author:		Srinivas
-- Create date: 17-Otober-2019
-- Description:	This procedure retrieves KPI Control Lever details along with Inhibitors and Capabilities 
-- Modified by Biswajit on 22nd Oct, 2019
-- ====================================================================
CREATE PROCEDURE [Amplo].[uspGetKPIControlLeverDetailsExpanded]
	-- Add the parameters for the stored procedure here
	@KPIControlLeverID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

--	Declare @clientid as INT
--    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here

	SELECT a.[KPIControlLeversID] AS 'ControlLeverID' 
		,[KPIID] AS 'KPIID'
		,[ControlLeversTitle] AS 'ControlLeversTitle'
		,[PersonaImpacted] AS 'PersonaImpacted'
		,b.[InhibitorsTitle] AS 'Inhibitors'
		--,c.[CapabilitiesTitle] AS 'Capabilities'
		, b.[KPIInhibitorsId] As 'KPIInhibitorsId'
		--, c.KPICapabilitiesId as 'KPICapabilitiesId'
	FROM [Amplo].[KPIControlLevers] a
	INNER JOIN (SELECT * FROM [Amplo].[KPIInhibitors] WHERE ActiveFlag=1) b on a.KPIControlLeversID = b.KPIControlLeversID
	--INNER JOIN (SELECT * FROM [Amplo].[KPICapabilities] WHERE ActiveFlag=1) c on a.KPIControlLeversID = c.KPIControlLeversID
	WHERE a.KPIControlLeversID = @KPIControlLeverID AND a.[ActiveFlag] = 1
	ORDER BY a.CREATEDDATE ASC
--	FOR JSON AUTO;
END

GO
