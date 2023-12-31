USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [dbo].[uspGetDecompositionReportAverageScore]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 11-November-2019
-- Description:	This procedure retrieves average score for capability modelling workbench
-- =============================================
CREATE PROCEDURE [dbo].[uspGetDecompositionReportAverageScore]
	-- Add the parameters for the stored procedure here
@ProjectID [int]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
select b.FunctionTilte FunctionTitle, c.PhaseTitle PhaseTitile, avg(d.Level1_Calc_Aggr_Score) AvgScore from Amplo.DecompositionProcessLevel1 a
inner join Amplo.DecompositionFunction b on a.FunctionID = b.DecompositionFunctionID
inner join Amplo.DecompositionPhase c on c.DecompositionPhaseID = a.PhaseID
inner join Amplo.DecompositionProcessLevel1score d on a.DecompositionProcessLevel1ID = d.DecompositionProcessLevel1ID
where a.DecompositionProjectID = @ProjectID
group by b.FunctionTilte, c.PhaseTitle

END
GO
