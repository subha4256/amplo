USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevel2Scores]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevel2Scores]
	-- Add the parameters for the stored procedure here
	@DecompositionProcessLevel1ID [int],
	@DecompositionProcessLevel2ID [int],
	@ScoreCriteria1 [float],
	@ScoreCriteria2 [float],
	@ScoreCriteria3 [float],
	@ScoreCriteria4 [float],
	@ScoreCriteria5 [float],
	@ScoreCriteria6 [float],
	@ScoreCriteria7 [float],
	@ScoreCriteria8 [float],
	@ScoreCriteria9 [float],
	@ScoreCriteria10 [float],
	@LVL2CalcAggrScore [float],
	@AvgScoreWeightage [float]
	, @Action nvarchar(10)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = count(DecompositionProcessLevel2ScoreID) from [Amplo].[DecompositionProcessLevel2Score] where [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID

	if(@Action = 'update' or (@RecordExists != 0 and @Action != 'delete'))
	begin
		update [Amplo].[DecompositionProcessLevel2Score] set 
	
       [ScoreCriteria1] = @ScoreCriteria1
      ,[ScoreCriteria2] =@ScoreCriteria2
      ,[ScoreCriteria3] = @ScoreCriteria3
      ,[ScoreCriteria4] =@ScoreCriteria4
      ,[ScoreCriteria5] = @ScoreCriteria5
      ,[ScoreCriteria6] = @ScoreCriteria6
      ,[ScoreCriteria7] = @ScoreCriteria7
      ,[ScoreCriteria8] = @ScoreCriteria8
      ,[ScoreCriteria9] = @ScoreCriteria9
      ,[ScoreCriteria10] = @ScoreCriteria10
      ,[LVL2CalcAggrScore] = @LVL2CalcAggrScore 
      ,[AvgScoreWeightage] = @AvgScoreWeightage
	 where [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
	end
	else if(@Action = 'add')
	begin
		INSERT INTO [Amplo].[DecompositionProcessLevel2Score]
	(
		[DecompositionProcessLevel1ID]
		,[DecompositionProcessLevel2ID]
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
		,[LVL2CalcAggrScore]
		,[AvgScoreWeightage]
	)
	VALUES
		(
		@DecompositionProcessLevel1ID,
		@DecompositionProcessLevel2ID,
		@ScoreCriteria1,
		@ScoreCriteria2,
		@ScoreCriteria3,
		@ScoreCriteria4,
		@ScoreCriteria5,
		@ScoreCriteria6,
		@ScoreCriteria7,
		@ScoreCriteria8,
		@ScoreCriteria9,
		@ScoreCriteria10,
		@LVL2CalcAggrScore,
		@AvgScoreWeightage
		)
	end
	else if(@Action = 'delete')
	begin
		delete from [Amplo].[DecompositionProcessLevel2Score] 
		where [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
	end
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
