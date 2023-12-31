USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeViewHeatMapScoresCalculation]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ======================================================================================================================================================
-- Author:      Srinivas
-- Create Date: 25-October-2019
-- Description: This procedure retrieves capability modelling treeview
-- ======================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeViewHeatMapScoresCalculation]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]

--	<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN

	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

--	DECLARE @PROJECTID [int]

	DECLARE @PProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]
	DECLARE @TotalAvgScore [float]
	DECLARE @TotalAvgScore1 [float]
	DECLARE @TotalAvgScore2 [float]
	DECLARE @TotalAvgScore3 [float]
	DECLARE @TotalAvgScore4 [float]
	DECLARE @TotalAvgScore5 [float]


	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[float]
	DECLARE @ScoreCriteria2	[float]
	DECLARE @ScoreCriteria3	[float]
	DECLARE @ScoreCriteria4	[float]
	DECLARE @ScoreCriteria5	[float]
	DECLARE @ScoreCriteria6	[float]
	DECLARE @ScoreCriteria7	[float]
	DECLARE @ScoreCriteria8	[float]
	DECLARE @ScoreCriteria9	[float]
	DECLARE @ScoreCriteria10 [float]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]
	DECLARE @ScoreCriteriaUsedCount [int]

	SET @ScoreCriteria1	= 0.00
	SET @ScoreCriteria2	= 0.00
	SET @ScoreCriteria3	= 0.00
	SET @ScoreCriteria4 = 0.00
	SET @ScoreCriteria5	= 0.00
	SET @ScoreCriteria6	= 0.00
	SET @ScoreCriteria7	= 0.00
	SET @ScoreCriteria8	= 0.00
	SET @ScoreCriteria9	= 0.00
	SET @ScoreCriteria10 = 0.00
	SET @ScoreCriteriaUsedCount = 7
	SET @DecompositionProcessLevel1ID = 6
	SET @ProjectID = 4

	SET @TotalAvgScore1 = 4.5
	SET @TotalAvgScore2 = 2.7
	SET @TotalAvgScore3 = 3.8
	SET @TotalAvgScore4 = 1.5
	SET @TotalAvgScore5  = 4.6
	SET @ScoreCriteriaUsedCount = 0

--select * from Amplo.DecompositionProcessLevel5;
--select * from Amplo.Decompositionprocesslevel5score;
--select (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
--from Amplo.Decompositionprocesslevel5score
--

--select (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from 
--						Amplo.DecompositionProcessLevel5Score a inner join Amplo.DecompositionProcessLevel5 b 
--						on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID and b.DecompositionProcessLevel1ID = 6


		select @ScoreCriteriaUsedCount = count([UsedFlag]) from Amplo.DecompositionScoreCriteriaProject where [UsedFlag] = 1

		UPDATE Amplo.DecompositionProcessLevel5Score
		SET Level5CalcAggrScore = (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
		where DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID

--DecompositionProcessLevel4Score

		DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
		FOR
		SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
		ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)  
		FROM Amplo.DecompositionProcessLevel4 a
		INNER JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
		WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
		ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

		OPEN ProcessLeveL4List;
		FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

		WHILE @@FETCH_STATUS = 0
		BEGIN
			if @LeafNodeFlag = 1

				Begin

					SELECT  'leafnode flag 1'
					SELECT @DecompositionProcessLevel4ID
					

					
					select @TotalAvgScore4 = (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
					from Amplo.DecompositionProcessLevel4Score a inner join Amplo.DecompositionProcessLevel4 b on a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
					and b.DecompositionProcessLevel4ID = @DecompositionProcessLevel4ID;
					
					select @TotalAvgScore4

					UPDATE Amplo.DecompositionProcessLevel4Score
					set Level4CalcAggrScore = @TotalAvgScore4 
					where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID

				end

			else if @LeafNodeFlag = 0
				
					begin

						SELECT 'leafnode flag 0'
						select @DecompositionProcessLevel4ID

						select @TotalAvgScore4 = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from 
						Amplo.DecompositionProcessLevel5Score a inner join Amplo.DecompositionProcessLevel5 b 
						on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID and b.DecompositionProcessLevel4ID = @DecompositionProcessLevel4ID and b.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID
						--where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
						GROUP BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel4ID]

						select @TotalAvgScore4

						update Amplo.DecompositionProcessLevel4Score
						set Level4CalcAggrScore = @TotalAvgScore4 
						where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID

					end


--					select @TotalAvgScore4 as TotalAvgScore4

					--SELECT @ProcessLevel2AverageScore = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10]) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from Amplo.DecompositionProcessLevel2Score
					--where [DecompositionProcessLevel1ID] = @ProcessLevel2ID
					--GROUP BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID]

		FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
		END;

		CLOSE ProcessLeveL4List;

		DEALLOCATE ProcessLevel4List;




--Process Level3

			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)
			FROM Amplo.DecompositionProcessLevel3 a
			INNER JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

			WHILE @@FETCH_STATUS = 0
			BEGIN


			if @LeafNodeFlag = 1

				Begin

					SELECT  'leafnode flag 1'
					SELECT @DecompositionProcessLevel4ID
					

					select @TotalAvgScore3 = (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
					from Amplo.DecompositionProcessLevel3Score a inner join Amplo.DecompositionProcessLevel3 b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
					and b.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID;
										select @TotalAvgScore3

					UPDATE Amplo.DecompositionProcessLevel3Score
					set Level3CalcAggrScore = @TotalAvgScore3 
					where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID

				end

			else if @LeafNodeFlag = 0
				
					begin

						SELECT 'leafnode flag 0'
						select @DecompositionProcessLevel3ID

						select @TotalAvgScore3 = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from 
						Amplo.DecompositionProcessLevel4Score a inner join Amplo.DecompositionProcessLevel4 b 
						on a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID and b.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID and b.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID
						--where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
						GROUP BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel4ID]

						select @TotalAvgScore3

						update Amplo.DecompositionProcessLevel3Score
						set Level3CalcAggrScore = @TotalAvgScore3 
						where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID

					end



			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT 
	a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], 
	a.[ProcessLevel2NodeID],
	a.[ProcessLevel2Title], 
	a.[Owner], 
	a.[CountrySpecific], 
	a.[LeafNodeFlag], 
	ISNULL(b.[AvgScoreWeightage],2.00), 
	ISNULL(b.ScoreCriteria1, 0.00), 
	ISNULL(b.ScoreCriteria2,0.00), 
	ISNULL(b.ScoreCriteria3,0.00), 
	ISNULL(b.ScoreCriteria4,0.00),
	ISNULL(b.ScoreCriteria5,0.00), 
	ISNULL(b.ScoreCriteria6,0.00), 
	ISNULL(b.ScoreCriteria7,0.00), 
	ISNULL(b.ScoreCriteria8,0.00), 
	ISNULL(b.ScoreCriteria9,0.00), 
	ISNULL(b.ScoreCriteria10,0.00) 
	FROM Amplo.DecompositionProcessLevel2 a 
    INNER JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10

    WHILE @@FETCH_STATUS = 0
    BEGIN

    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
    END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;

			if @LeafNodeFlag = 1

				Begin

					SELECT  'leafnode flag 1'
					SELECT @DecompositionProcessLevel3ID
					

					select @TotalAvgScore2 = (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
					from Amplo.DecompositionProcessLevel2Score a inner join Amplo.DecompositionProcessLevel4 b on a.DecompositionProcessLevel2ID = b.DecompositionProcessLevel2ID
					and b.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID;
					
					select @TotalAvgScore2

					UPDATE Amplo.DecompositionProcessLevel2Score
--					select * from Amplo.DecompositionProcessLevel2Score
					set LVL2CalcAggrScore = @TotalAvgScore2 
					where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID

				end

			else if @LeafNodeFlag = 0
				
					begin

						SELECT 'leafnode flag 0'
						select @DecompositionProcessLevel2ID

						select @TotalAvgScore2 = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from 
						Amplo.DecompositionProcessLevel3Score a inner join Amplo.DecompositionProcessLevel3 b 
						on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID and b.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and b.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID
						--where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
						GROUP BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID]

						select @TotalAvgScore2

						update Amplo.DecompositionProcessLevel2Score
						set LVL2CalcAggrScore = @TotalAvgScore2 
						where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID

					end

		    COMMIT TRANSACTION;
	RETURN 0;
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
