USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeView_Original]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeView_Original]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	WITH DecompositionProcessLevel(ProcessLevelID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2,ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,ScoreCriteria9,ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel) AS
	(

	SELECT i.[DecompositionProcessLevel1ID],[ProcessLevel1Title],NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL, [Owner],NULL,Avg_Score_Weight, 1 AS ProcessLevel
	FROM [Amplo].[DecompositionProcessLevel1] i 
	inner join [Amplo].[DecompositionProcessLevel1Score] j on i.[DecompositionProcessLevel1ID] = j.[DecompositionProcessLevel1ID]
	UNION ALL

	SELECT a.DecompositionProcessLevel2ID, a.ProcessLevel2Title , b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, a.ProcessLevel2NodeID, a.owner, a.CountrySpecific, b.AvgScoreWeightage, 2 AS ProcessLevel
	from Amplo.DecompositionProcessLevel2  a
	inner join Amplo.DecompositionProcessLevel2Score b on a.DecompositionProcessLevel2ID = b.DecompositionProcessLevel2ID
	UNION ALL
	SELECT a.DecompositionProcessLevel3ID, a.ProcessLevel3Title , b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, a.ProcessLevel3NodeID, a.owner, a.CountrySpecific, b.AvgScoreWeightage, 3 AS ProcessLevel
	from Amplo.DecompositionProcessLevel3  a
	inner join Amplo.DecompositionProcessLevel3Score b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
	UNION ALL
	SELECT a.DecompositionProcessLevel4ID, a.ProcessLevel4Title , b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, a.ProcessLevel4NodeID, a.owner, a.CountrySpecific, b.AvgScoreWeightage, 4 AS ProcessLevel
	from Amplo.DecompositionProcessLevel4  a
	inner join Amplo.DecompositionProcessLevel4Score b on a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
	UNION ALL
	SELECT a.DecompositionProcessLevel5ID, a.ProcessLevel5Title , b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, a.ProcessLevel5NodeID, a.owner, a.CountrySpecific, b.AvgScoreWeightage, 5 AS ProcessLevel
	from Amplo.DecompositionProcessLevel5  a
	inner join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
	)

	--if @OrderBy = 2
	--SELECT * from DecompositionProcessLevel order by DecompositionProcessLevel2ID
	--else if @OrderBy = 3
	--SELECT * from DecompositionProcessLevel order by DecompositionProcessLevel3ID
	--else if @OrderBy = 4
	--SELECT * from DecompositionProcessLevel order by DecompositionProcessLevel4ID
	
	SELECT * from DecompositionProcessLevel

	/*
	SELECT a.DecompositionProcessLevel2ID, a.DecompositionProcessLevel1ID, 
	b.DecompositionProcessLevel2ScoreID, b.Score_Criteria_1, b.Score_Criteria_2, b.Score_Criteria_3, b.Score_Criteria_4,b.Score_Criteria_5, b.Score_Criteria_6, b.Score_Criteria_7, b.Score_Criteria_8, b.Score_Criteria_9, b.Score_Criteria_10, 
	c.DecompositionProcessLevel3ID, d.DecompositionProcessLevel3ScoreID, d.Score_Criteria_1, d.Score_Criteria_2, d.Score_Criteria_3,d.Score_Criteria_4, d.Score_Criteria_5, d.score_Criteria_6, d.Score_Criteria_7, d.Score_Criteria_8, d.Score_Criteria_9, d.Score_Criteria_10,
	f.DecompositionProcessLevel4ID , f.DecompositionProcessLevel4ScoreID , f.Score_Criteria_1, f.Score_Criteria_2, f.Score_Criteria_3,f.Score_Criteria_4, f.Score_Criteria_5, f.score_Criteria_6, f.Score_Criteria_7, f.Score_Criteria_8, f.Score_Criteria_9, f.Score_Criteria_10,
	h.DecompositionProcessLevel5ID, h.DecompositionProcessLevel5ScoreID, h.Score_Criteria_1, h.Score_Criteria_2, h.Score_Criteria_3,h.Score_Criteria_4, h.Score_Criteria_5, h.score_Criteria_6, h.Score_Criteria_7, h.Score_Criteria_8, h.Score_Criteria_9, h.Score_Criteria_10
	from Amplo.DecompositionProcessLevel2  a
	inner join Amplo.DecompositionProcessLevel2Score b on a.DecompositionProcessLevel2ID = b.DecompositionProcessLevel2ID
	inner join Amplo.DecompositionProcessLevel3 c on b.DecompositionProcessLevel2ID = c.DecompositionProcessLevel3ID
	inner join Amplo.DecompositionProcessLevel3Score d on c.DecompositionProcessLevel2ID = d.DecompositionProcessLevel3ID
	inner join Amplo.DecompositionProcessLevel4 e on e.DecompositionProcessLevel4ID = c.DecompositionProcessLevel3ID
	inner join Amplo.DecompositionProcessLevel4Score f on f.DecompositionProcessLevel4ID = e.DecompositionProcessLevel3ID
	inner join Amplo.DecompositionProcessLevel5 g on g.DecompositionProcessLevel5ID = e.DecompositionProcessLevel4ID
	inner join Amplo.DecompositionProcessLevel5Score h on g.DecompositionProcessLevel5ID = f.DecompositionProcessLevel4ID
	*/


	/*
	
		DECLARE @ProjectID [int]
	DECLARE @ProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[INT]
	DECLARE @ScoreCriteria2	[INT]
	DECLARE @ScoreCriteria3	[INT]
	DECLARE @ScoreCriteria4	[INT]
	DECLARE @ScoreCriteria5	[INT]
	DECLARE @ScoreCriteria6	[INT]
	DECLARE @ScoreCriteria7	[INT]
	DECLARE @ScoreCriteria8	[INT]
	DECLARE @ScoreCriteria9	[INT]
	DECLARE @ScoreCriteria10 [INT]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevel2NodeID [VARCHAR](30)
	DECLARE @ProcessLevel2Title [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]


    -- Insert statements for procedure here
	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
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
		NodeLevelID [float], 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int]
	  );


	--Process Level1 Cursor

	SET @ProcessLevel1ID = 1
	set @ProjectID = 4
	DECLARE ProcessLevel1List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[ProcessLevel2NodeID],a.[ProcessLevel2Title], a.[Owner], a.[CountrySpecific], a.[LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10 
	FROM Amplo.DecompositionProcessLevel2 a 
    INNER JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel1ID] = b.[DecompositionProcessLevel1ID]
	where a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;

    OPEN ProcessLevel1List;
    FETCH NEXT FROM ProcessLevel1List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
	
	INSERT INTO #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID, 
		ProcessLevel2ID,
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
		ProcessLevel)
		VALUES
		(
		@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevel2Title, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, NULL, @Owner, @CountrySpecific, '1', 1
		);

--		SELECT * FROM #DecompositionProcessLevelDetails

--	SELECT 	@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag;
    WHILE @@FETCH_STATUS = 0
    BEGIN
			

			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag] from Amplo.DecompositionProcessLevel3 where DecompositionProjectID = @ProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, 
				ProcessLevel2ID,
				ProcessLevel3ID,
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
				ProcessLevel)
				VALUES
				(
				@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevel2Title, NULL, NULL, NULL,NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL,@Owner, @CountrySpecific, '1', 1
				);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [ProcessLevel4NodeID],[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag] from Amplo.DecompositionProcessLevel4 where DecompositionProjectID = @ProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
				VALUES
				(
				@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevel2Title, NULL, NULL, NULL,NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL,@Owner, @CountrySpecific, '1', 1
				);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID],[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag] from Amplo.DecompositionProcessLevel5 where DecompositionProjectID = @ProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID AND [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID AND [DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag

							INSERT INTO #DecompositionProcessLevelDetails
							(
							ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
							VALUES
							(
							@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevel2Title, NULL, NULL, NULL,NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL,@Owner, @CountrySpecific, '1', 1
							);

							SELECT * FROM #DecompositionProcessLevelDetails

							WHILE @@FETCH_STATUS = 0
							BEGIN
							FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;




	
    FETCH NEXT FROM ProcessLevel1List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag
    END;

    CLOSE ProcessLevel1List;
    DEALLOCATE ProcessLevel1List;
	
	*/



END
GO
