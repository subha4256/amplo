USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetSpiralReportForDecomposingModel]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspGetSpiralReportForDecomposingModel]
	@DecompositionProjectId int
	, @LevelName as nvarchar(2)
as
begin
	SET NOCOUNT ON 
		declare @TempTable table
		(
			ProcessStatus nvarchar(100)
			, NoOfRows int NOT NULL
			, Percentage  numeric(10, 2) NOT NULL
		)
		BEGIN TRY
		
		DECLARE @ExcelentCutOff as numeric(10, 2) = 4, @GoodCutOff as numeric(10, 2) = 3, @AverageCutOff as numeric(10, 2) = 2
		, @SatisfactoryCutOff as numeric(10, 2) = 1
		declare @TotalRows int = 0

		if(@LevelName = 'l1')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] >= @GoodCutOff and pls.[Level1_Calc_Aggr_Score] < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] >= @AverageCutOff and pls.[Level1_Calc_Aggr_Score] < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] >= @SatisfactoryCutOff and pls.[Level1_Calc_Aggr_Score] < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end

		else if(@LevelName = 'l2')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore >= @GoodCutOff and pls.LVL2CalcAggrScore < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore >= @AverageCutOff and pls.LVL2CalcAggrScore < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore >= @SatisfactoryCutOff and pls.LVL2CalcAggrScore < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end

		else if(@LevelName = 'l3')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore >= @GoodCutOff and pls.Level3CalcAggrScore < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore >= @AverageCutOff and pls.Level3CalcAggrScore < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore >= @SatisfactoryCutOff and pls.Level3CalcAggrScore < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end

		else if(@LevelName = 'l4')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore >= @GoodCutOff and pls.Level4CalcAggrScore < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore >= @AverageCutOff and pls.Level4CalcAggrScore < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore >= @SatisfactoryCutOff and pls.Level4CalcAggrScore < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end

		else if(@LevelName = 'l5')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore >= @GoodCutOff and pls.Level5CalcAggrScore < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore >= @AverageCutOff and pls.Level5CalcAggrScore < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore >= @SatisfactoryCutOff and pls.Level5CalcAggrScore < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end
    END TRY
    BEGIN CATCH
		--select Error_Message()
        EXECUTE [AMPLO].[uspLogError];
    END CATCH

	select ProcessStatus, NoOfRows, Percentage from @TempTable
end


GO
