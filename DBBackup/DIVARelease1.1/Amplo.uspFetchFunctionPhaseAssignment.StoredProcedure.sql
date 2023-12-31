USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchFunctionPhaseAssignment]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspFetchFunctionPhaseAssignment] 
@TemplateId int
as
begin
	SET NOCOUNT ON
	begin try
		select ta.PhaseId, dp.PhaseTitle, ta.FunctionId, df.FunctionTilte FunctionTitle, StyletTitle StyleTitle from [Amplo].[TemplateFunctPhaseStyleAssignment] ta
		join amplo.FunctionPhaseStyle fps on fps.FunctionPhaseStyleId = StyleId
		join amplo.DecompositionFunction df on ta.FunctionId = df.DecompositionFunctionId
		join amplo.DecompositionPhase dp on ta.PhaseId = dp.DecompositionPhaseId
		where ta.ActiveFlag = 1 and ta.TemplateId = @TemplateId
	end try
	begin catch
		EXECUTE [Amplo].[uspLogError];
	end catch
end
GO
