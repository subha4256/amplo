USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetL1ProcessSummary]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetL1ProcessSummary]
	@DecompositionProjectId int
AS
BEGIN
	SET NOCOUNT ON 
	declare @TempTable table
		(
			FunctionID int NOT NULL
			, FunctionName nvarchar(500)
			, PhaseID int NOT NULL
			, PhaseName nvarchar(500)
			, AverageScore numeric(10, 2) NOT NULL
			, Percentage  numeric(10, 2) NOT NULL
		)
		BEGIN TRY
        

		insert into @TempTable
		select [FunctionID], [FunctionName], [PhaseID], [PhaseName], AVG(ISNULL([Avg_Score_Weight], 0.00)), 0
		from [Amplo].[DecompositionProcessLevel1] l1
		left outer join [Amplo].[DecompositionProcessLevel1Score] score on score.[DecompositionProcessLevel1ID] = l1.[DecompositionProcessLevel1ID]
		join [Amplo].[DecompositionPhase] phase on phase.[DecompositionPhaseID] = l1.[PhaseID]
		join [Amplo].[DecompositionFunction] func on func.[DecompositionFunctionID] = l1.[FunctionID]
		where l1.[DecompositionProjectID] = @DecompositionProjectId
		group by [FunctionID], [PhaseID], [FunctionName], [PhaseName]

		declare @TotalScore numeric(10, 2) = (select SUM(AverageScore) from @TempTable)
		if(@TotalScore != 0)
		begin
			update @TempTable set Percentage = AverageScore * 100 / @TotalScore
		end

		
    END TRY
    BEGIN CATCH
		--select Error_Message()
        --EXECUTE [AMPLO].[uspLogError];
    END CATCH

	select FunctionID, FunctionName, PhaseID, PhaseName, AverageScore, Percentage from @TempTable
END
GO
