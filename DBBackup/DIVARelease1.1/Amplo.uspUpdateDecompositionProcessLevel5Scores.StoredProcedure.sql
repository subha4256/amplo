USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevel5Scores]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevel5Scores]
			    @DecompositionProcessLevel1ID [int]
			   ,@DecompositionProcessLevel2ID [int]
			   ,@DecompositionProcessLevel3ID [int]
			   ,@DecompositionProcessLevel4ID [int]
			   ,@DecompositionProcessLevel5ID [int]
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
			   ,@Level5CalcAggrScore [float]
			   ,@AvgScoreWeightage [float]
			   , @Action nvarchar(10)
AS
BEGIN
	SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = count(DecompositionProcessLevel5ScoreID) from [Amplo].[DecompositionProcessLevel5Score] where  [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID 
	and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID and [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID AND [DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID

	if(@Action = 'update' or (@RecordExists != 0 and @Action != 'delete'))
	begin
	UPDATE [Amplo].[DecompositionProcessLevel5Score]
	   SET 
		   [ScoreCriteria1] = @ScoreCriteria1
		  ,[ScoreCriteria2] = @ScoreCriteria2
		  ,[ScoreCriteria3] = @ScoreCriteria3
		  ,[ScoreCriteria4] = @ScoreCriteria4
		  ,[ScoreCriteria5] = @ScoreCriteria5
		  ,[ScoreCriteria6] = @ScoreCriteria6
		  ,[ScoreCriteria7] = @ScoreCriteria7
		  ,[ScoreCriteria8] = @ScoreCriteria8
		  ,[ScoreCriteria9] = @ScoreCriteria9
		  ,[ScoreCriteria10] = @ScoreCriteria10
		  ,[Level5CalcAggrScore] = @Level5CalcAggrScore
		  ,[AvgScoreWeightage] = @AvgScoreWeightage
	 WHERE 
	--	   [DecompositionProcessLevel5ScoreID] = @DecompositionProcessLevel5ScoreID
		  [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
		  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
		  AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
		  AND [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
		  AND [DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
	end
		  ELSE if(@Action = 'add')
	begin
	INSERT INTO [Amplo].[DecompositionProcessLevel5Score]
			   (
			    [DecompositionProcessLevel1ID]
			   ,[DecompositionProcessLevel2ID]
			   ,[DecompositionProcessLevel3ID]
			   ,[DecompositionProcessLevel4ID]
			   ,[DecompositionProcessLevel5ID]
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
			   ,[Level5CalcAggrScore]
			   ,[AvgScoreWeightage])
		 VALUES
			   (
			    @DecompositionProcessLevel1ID
			   ,@DecompositionProcessLevel2ID
			   ,@DecompositionProcessLevel3ID
			   ,@DecompositionProcessLevel4ID
			   ,@DecompositionProcessLevel5ID
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
			   ,@Level5CalcAggrScore
			   ,@AvgScoreWeightage
			  )
		end
		else if(@Action = 'delete')
		begin
			delete from [Amplo].[DecompositionProcessLevel5Score]
			where [DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
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
