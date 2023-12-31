USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetL1Processes]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetL1Processes]
	@DecompositionProjectId int
	, @Order nvarchar(20)
AS
BEGIN
	BEGIN TRY
		if(@Order = 'desc')
		begin
			select top 5 l1.[DecompositionProcessLevel1ID], [ProcessLevel1Name], [ProcessLevel1Title], [ProcessLevel1Description], ISNULL([Avg_Score_Weight], 0.00) Score, 0
			from [Amplo].[DecompositionProcessLevel1] l1
			left outer join [Amplo].[DecompositionProcessLevel1Score] score on score.[DecompositionProcessLevel1ID] = l1.[DecompositionProcessLevel1ID]
			where l1.[DecompositionProjectID] = @DecompositionProjectId
			order by ISNULL([Avg_Score_Weight], 0.00) desc
		end
		else
		begin
			select top 5 l1.[DecompositionProcessLevel1ID], [ProcessLevel1Name], [ProcessLevel1Title], [ProcessLevel1Description], ISNULL([Avg_Score_Weight], 0.00) Score, 0
			from [Amplo].[DecompositionProcessLevel1] l1
			left outer join [Amplo].[DecompositionProcessLevel1Score] score on score.[DecompositionProcessLevel1ID] = l1.[DecompositionProcessLevel1ID]
			where l1.[DecompositionProjectID] = @DecompositionProjectId
			order by ISNULL([Avg_Score_Weight], 0.00) asc
		end
    END TRY
    BEGIN CATCH
        EXECUTE [AMPLO].[uspLogError];
    END CATCH
END
GO
