USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetSelectedFunctions]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspGetSelectedFunctions] --1
@TemplateId as int
as
begin
	select distinct f.DecompositionFunctionId, f.FunctionTilte FunctionTitle, cast(ISNULL(sf.FunctionId, 0) as bit) IsSelected
	from amplo.decompositionfunction f
	left outer join amplo.CMTempFrameStructure sf on (f.DecompositionFunctionId = sf.FunctionId and sf.ActiveFlag = 1)
	and sf.TemplateId = @TemplateId
end
GO
