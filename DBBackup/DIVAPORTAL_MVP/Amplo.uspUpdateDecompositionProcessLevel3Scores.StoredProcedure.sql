USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevel3Scores]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevel3Scores]
		@DecompositionProcessLevel1ID [int]
		,@DecompositionProcessLevel2ID [int]
		,@DecompositionProcessLevel3ID [int]
		,@ScoreCriteria1 [float]
		,@ScoreCriteria2 [float]
		,@ScoreCriteria3 [float]
		,@ScoreCriteria4 [float]
		,@ScoreCriteria5 [float]
		,@ScoreCriteria6 [float]
		,@ScoreCriteria7 [float]
		,@ScoreCriteria8 [float]
		,@ScoreCriteria9 [float]
		,@ScoreCriteria10 [float]
		,@AvgScoreWeightage [int]
		, @Action nvarchar(10)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = count(DecompositionProcessLevel3ScoreID) from [Amplo].[DecompositionProcessLevel3Score] 
	where  [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID 
	and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID and [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID

	if(@Action = 'update' or (@RecordExists != 0 and @Action != 'delete'))
	begin
			UPDATE [Amplo].[DecompositionProcessLevel3Score]
			SET [ScoreCriteria1] = @ScoreCriteria1
			,[ScoreCriteria2] = @ScoreCriteria2
			,[ScoreCriteria3] = @ScoreCriteria3
			,[ScoreCriteria4] = @ScoreCriteria4
			,[ScoreCriteria5] = @ScoreCriteria5
			,[ScoreCriteria6] = @ScoreCriteria6
			,[ScoreCriteria7] = @ScoreCriteria7
			,[ScoreCriteria8] = @ScoreCriteria8
			,[ScoreCriteria9] = @ScoreCriteria9
			,[ScoreCriteria10] = @ScoreCriteria10
			,[AvgScoreWeightage] = @AvgScoreWeightage
			WHERE [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
	end
	  ELSE if(@Action = 'add')
	  begin
			INSERT INTO [Amplo].[DecompositionProcessLevel3Score]
				([DecompositionProcessLevel1ID]
				,[DecompositionProcessLevel2ID]
				,[DecompositionProcessLevel3ID]
				,[ScoreCriteria1]
				,[ScoreCriteria2]
				,[ScoreCriteria3]
				,[ScoreCriteria4]
				,[ScoreCriteria5]
				,[ScoreCriteria6]
				,[ScoreCriteria7]
				,[ScoreCriteria8]
				,[ScoreCriteria9]
				,[ScoreCriteria10]
				,[AvgScoreWeightage])
			VALUES
				(@DecompositionProcessLevel1ID
				,@DecompositionProcessLevel2ID
				,@DecompositionProcessLevel3ID
				,@ScoreCriteria1
				,@ScoreCriteria2
				,@ScoreCriteria3
				,@ScoreCriteria4
				,@ScoreCriteria5
				,@ScoreCriteria6
				,@ScoreCriteria7
				,@ScoreCriteria8
				,@ScoreCriteria9
				,@ScoreCriteria10
				,@AvgScoreWeightage)
	end
	else if(@Action = 'delete')
	begin
		delete from [Amplo].[DecompositionProcessLevel3Score] 
		WHERE [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
		AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
		AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
	end
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
