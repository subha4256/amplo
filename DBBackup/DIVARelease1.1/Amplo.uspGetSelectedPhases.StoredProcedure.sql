USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetSelectedPhases]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Amplo].[uspGetSelectedPhases] 
@TemplateId as int
as
begin
	select distinct f.DecompositionPhaseId, f.PhaseTitle, cast(ISNULL(sf.PhaseId, 0) as bit) IsSelected
	from amplo.decompositionPhase f
	left outer join amplo.CMTempFrameStructure sf on (f.DecompositionPhaseId = sf.PhaseId and sf.ActiveFlag = 1)
	where sf.TemplateId = @TemplateId
end
GO
