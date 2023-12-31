USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPIControlLeverDetails]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 15-Otober-2019
-- Description:	This procedure retrieves KPI details
-- =============================================
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
		,(SELECT COUNT(1) FROM Amplo.KPIInhibitors b where b.[KPIControlLeversID] = a.[KPIControlLeversID] and b.ActiveFlag=1) AS 'KPIInhibitorsCount'
		,(SELECT COUNT(1) FROM [Amplo].[KPICapabilities] b where b.[KPIControlLeversID] = a.[KPIControlLeversID] and b.ActiveFlag=1) AS 'KPICapabilities'
	FROM [DIVAPORTAL].[Amplo].[KPIControlLevers] a
	WHERE KPIID = @KPIID AND [ActiveFlag] = 1
	ORDER BY a.CREATEDDATE ASC
--	FOR JSON AUTO;
END
GO
