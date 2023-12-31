USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddDecompositionProcessLevels2]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 11-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspAddDecompositionProcessLevels2]
	-- Add the parameters for the stored procedure here
       @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [float]
       ,@ProcessLevel2Title [varchar](100)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
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
	   ,@LVL2CalcAggrScore [float]
	   ,@AvgScoreWeightage [float]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;
	DECLARE @PDecompositionProcessLevel2ID INT

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]


		BEGIN

			INSERT INTO [Amplo].[DecompositionProcessLevel2]
			(
			   [DecompositionProjectID]
			  ,[DecompositionProcessLevel1ID]
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[Owner]
			  ,[CountrySpecific]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  ,[CreatedBy]
			  ,[CreatedDate]
			  )
			  values
			(
				 @DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
				, 1
				,@UserID
				,GETDATE()
			);

			SET @PDecompositionProcessLevel2ID = SCOPE_IDENTITY();  

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
				@PDecompositionProcessLevel2ID,
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
				);

		END

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
