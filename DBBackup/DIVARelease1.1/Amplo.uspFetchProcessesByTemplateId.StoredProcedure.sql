USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchProcessesByTemplateId]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Amplo].[uspFetchProcessesByTemplateId]
@TemplateId int,
@FunctionId int,
@PhaseId int
as
begin
	SET NOCOUNT ON
	begin try
		select DecompositionProcessLevel1ID as DecompositionProcessLevel1ID, ProceeLevel1Title as ProcessLevel1Title from amplo.amploDecompositionProcessLevel1Template ta
		where ta.ActiveFlag = 1 and ta.TemplateId = @TemplateId and ta.DecompositionFunctionID=@FunctionId 
		and ta.DecompositionPhaseID=@PhaseId
	end try
	begin catch
		EXECUTE [Amplo].[uspLogError];
	end catch
end


GO
