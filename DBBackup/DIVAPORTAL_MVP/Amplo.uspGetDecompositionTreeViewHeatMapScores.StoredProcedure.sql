USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeViewHeatMapScores]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeViewHeatMapScores]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN

	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT

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

	SET @TotalAvgScore1 = -1
	SET @TotalAvgScore2 = -1
	SET @TotalAvgScore3 = -1
	SET @TotalAvgScore4 = -1
	SET @TotalAvgScore5  = 0
	SET @ScoreCriteriaUsedCount = 0


	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 [float], 
		ScoreCriteria2 [float],
		ScoreCriteria3 [float],
		ScoreCriteria4 [float],
		ScoreCriteria5 [float],
		ScoreCriteria6 [float],
		ScoreCriteria7 [float],
		ScoreCriteria8 [float],
		ScoreCriteria9 [float],
		ScoreCriteria10 [float], 
		NodeLevelID [varchar](100), 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int],
		TotalAvgScore numeric(10, 2),
		TotalAvgScore1  numeric(10, 2),
		TotalAvgScore2  numeric(10, 2),
		TotalAvgScore3  numeric(10, 2),
		TotalAvgScore4  numeric(10, 2),
		TotalAvgScore5  numeric(10, 2)
		, LeafNodeFlag bit
	  );
	  declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	  declare @Status as int = 0
--Process Level1 Cursor

	SELECT top 1 @Status = a.[Status], @PProcessLevel1ID = a.[DecompositionProcessLevel1ID], @ProcessLevelTitle=[ProcessLevel1Title], @Owner=[Owner], @AvgScoreWeightage = ISNULL([Avg_Score_Weight],2.00) FROM Amplo.DecompositionProcessLevel1 a
	INNER JOIN Amplo.DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID and a.ActiveFlag = 1
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;
	INSERT INTO #DecompositionProcessLevelDetails
	(
		ProcessLevel1ID, ProcessLevelTitle, Owner, Priority, ProcessLevel, LeafNodeFlag, TotalAvgScore1
	)
	VALUES
	(
		@ProcessLevel1ID, @ProcessLevelTitle, @Owner, @AvgScoreWeightage, 1, 0, -1
	)


	SELECT @ScoreCriteriaUsedCount = COUNT(1) FROM Amplo.DecompositionScoreCriteriaProject WHERE DecompositionProjectID = @ProjectID AND DecompositionProcessLevel1ID= @ProcessLevel1ID AND USEDFLAG=1;
	--select @ScoreCriteriaUsedCount as ScoreCriteriaUsedCount

	--Process Level2 Cursor

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT 
	a.[DecompositionProcessLevel1ID], 
	a.[DecompositionProcessLevel2ID], 
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
	ISNULL(b.ScoreCriteria10,0.00),
	(case when a.[LeafNodeFlag] = 0 then CAST(-1 as numeric(10, 2)) else ((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) end) AS TotalAvgScore
	FROM Amplo.DecompositionProcessLevel2 a 
    left outer JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID and a.ActiveFlag = 1
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
	, @TotalAvgScore2

    WHILE @@FETCH_STATUS = 0
    BEGIN
			
		INSERT INTO #DecompositionProcessLevelDetails
		(
			TotalAvgScore2, ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific,
 Priority, ProcessLevel, LeafNodeFlag)
			VALUES
			(
				@TotalAvgScore2, @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2, ISNULL(@LeafNodeFlag, 0)
			);


			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)
			, (case when a.[LeafNodeFlag] = 0 then CAST(-1 as numeric(10, 2)) else ((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) end) AS TotalAvgScore
			FROM Amplo.DecompositionProcessLevel3 a
			left outer JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			 and a.ActiveFlag = 1ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore3

			WHILE @@FETCH_STATUS = 0
			BEGIN

			INSERT INTO #DecompositionProcessLevelDetails
			(
				TotalAvgScore3, ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
				VALUES
				(@TotalAvgScore3, @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3, ISNULL(@LeafNodeFlag, 0));

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)  
			, (case when a.[LeafNodeFlag] = 0 then CAST(-1 as numeric(10, 2)) else ((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) end) AS TotalAvgScore
			FROM Amplo.DecompositionProcessLevel4 a
			left outer JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			 and a.ActiveFlag = 1
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore4
			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
			INSERT INTO #DecompositionProcessLevelDetails
			(
				TotalAvgScore4, ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
				VALUES
				(@TotalAvgScore4, @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4, ISNULL(@LeafNodeFlag, 0), @ProcessLevelNodeID);
							
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage,
							((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) AS TotalAvgScore
							from Amplo.DecompositionProcessLevel5 a
							left outer join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID AND a.[DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
							 and a.ActiveFlag = 1 --Added by Srini on 10-November-2019
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @TotalAvgScore5

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9
								, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, TotalAvgScore5, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, '', @TotalAvgScore5, 5, ISNULL(@LeafNodeFlag, 0), @ProcessLevelNodeID);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @TotalAvgScore5
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore4
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore3
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
    , @TotalAvgScore2
	END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;

   CREATE INDEX IX_ProcessLevelID ON #DecompositionProcessLevelDetails (ProcessLevel1ID, ProcessLevel2ID,ProcessLevel3ID,ProcessLevel4ID,ProcessLevel5ID);

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = ISNULL(TotalAvgScore4, 0) + ISNULL(TotalAvgScore5, 0.00) --+ 1
   where ISNULL(TotalAvgScore4, 0) = -1 or TotalAvgScore4 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = ISNULL(TotalAvgScore3, 0) + ISNULL(TotalAvgScore4, 0.00) --+ 1
   where ISNULL(TotalAvgScore3, 0) = -1 or TotalAvgScore3 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = ISNULL(TotalAvgScore2, 0) + ISNULL(TotalAvgScore3, 0.00) --+ 1
   where ISNULL(TotalAvgScore2, 0) = -1 or TotalAvgScore2 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = ISNULL(TotalAvgScore1, 0) + ISNULL(TotalAvgScore2, 0.00) --+ 1
   where ISNULL(TotalAvgScore1, 0) = -1 or TotalAvgScore1 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = 0
   where ISNULL(TotalAvgScore4, 0) = -1 or TotalAvgScore4 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = 0
   where ISNULL(TotalAvgScore3, 0) = -1 or TotalAvgScore3 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = 0
   where ISNULL(TotalAvgScore2, 0) = -1 or TotalAvgScore2 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = 0
   where ISNULL(TotalAvgScore1, 0) = -1 or TotalAvgScore1 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore4) / Count(TotalAvgScore4) score, ProcessLevel4Id from #DecompositionProcessLevelDetails where LeafNodeFlag = 1 group by ProcessLevel4Id) grp
   on grp.ProcessLevel4Id = main.ProcessLevel4Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore4) / Count(TotalAvgScore4) score, ProcessLevel3Id from #DecompositionProcessLevelDetails where ProcessLevel = 4 group by ProcessLevel3Id) grp
   on grp.ProcessLevel3Id = main.ProcessLevel3Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore3) / Count(TotalAvgScore3) score, ProcessLevel2Id from #DecompositionProcessLevelDetails where ProcessLevel = 3 group by ProcessLevel2Id) grp
   on grp.ProcessLevel2Id = main.ProcessLevel2Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore2) / Count(TotalAvgScore2) score, ProcessLevel1Id from #DecompositionProcessLevelDetails where ProcessLevel = 2 group by ProcessLevel1Id) grp
   on grp.ProcessLevel1Id = main.ProcessLevel1Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = 4.6 where (TotalAvgScore1 > 5 or TotalAvgScore1 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = 4.6 where (TotalAvgScore2 > 5 or TotalAvgScore2 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = 4.6 where (TotalAvgScore3 > 5 or TotalAvgScore3 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = 4.6 where (TotalAvgScore4 > 5 or TotalAvgScore4 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore5 = 4.6 where (TotalAvgScore5 > 5 or TotalAvgScore5 < 0)

	select 
			ProcessLevel1ID,
			ProcessLevel2ID,
			ProcessLevel3ID,
			ProcessLevel4ID,
			ProcessLevel5ID,
			ProcessLevelNodeID as ProcessLevelID, 
			ProcessLevelTitle, 
			ScoreCriteria1, 
			ScoreCriteria2,
			ScoreCriteria3,
			ScoreCriteria4,
			ScoreCriteria5,
			ScoreCriteria6,
			ScoreCriteria7,
			ScoreCriteria8,
			ScoreCriteria9,
			ScoreCriteria10, 
			NodeLevelID, 
			Owner, 
			CountrySpecific, 
			Priority, 
			TotalAvgScore,
			TotalAvgScore1,
			TotalAvgScore2,
			TotalAvgScore3,
			TotalAvgScore4,
			TotalAvgScore5,
			ProcessLevel,
			LeafNodeFlag,
			@Status [Status]
		FROM #DecompositionProcessLevelDetails

	DROP TABLE if exists #DecompositionProcessLevelDetails;

    COMMIT TRANSACTION;
	RETURN 0;
    END TRY
    BEGIN CATCH
	select Error_Message()
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
