USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeView]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeView]
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

    -- Insert statements for procedure here
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
		ScoreCriteria1 numeric(10, 2), 
		ScoreCriteria2 numeric(10, 2),
		ScoreCriteria3 numeric(10, 2),
		ScoreCriteria4 numeric(10, 2),
		ScoreCriteria5 numeric(10, 2),
		ScoreCriteria6 numeric(10, 2),
		ScoreCriteria7 numeric(10, 2),
		ScoreCriteria8 numeric(10, 2),
		ScoreCriteria9 numeric(10, 2),
		ScoreCriteria10 numeric(10, 2), 
		NodeLevelID [varchar](100), 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int]
		, LeafNodeFlag bit
	  );
	  declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	  declare @Status as int = 0
		--Process Level1 Cursor

	SELECT top 1 @Status = a.[Status], @PProcessLevel1ID = a.[DecompositionProcessLevel1ID], @ProcessLevelTitle=[ProcessLevel1Title], @Owner=[Owner], @AvgScoreWeightage = ISNULL([Avg_Score_Weight],2.00) FROM Amplo.DecompositionProcessLevel1 a
	INNER JOIN Amplo.DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;
	INSERT INTO #DecompositionProcessLevelDetails
	(
		ProcessLevel1ID, ProcessLevelTitle, Owner, Priority, ProcessLevel, LeafNodeFlag
	)
	VALUES
	(
		@ProcessLevel1ID, @ProcessLevelTitle, @Owner, @AvgScoreWeightage, 1, 0
	)

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
	ISNULL(a.LeafNodeFlag, 0) 
	
	FROM Amplo.DecompositionProcessLevel2 a 
    left outer JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID 
	--added by Srini on 10-November 2019
	AND ActiveFlag = 1
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Level2LeafNodeFlag
	
    WHILE @@FETCH_STATUS = 0
    BEGIN
			
		INSERT INTO #DecompositionProcessLevelDetails
		(
			ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
			VALUES
			(
				@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2, @Level2LeafNodeFlag
			);


			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)
			, ISNULL(a.LeafNodeFlag, 0)
			FROM Amplo.DecompositionProcessLevel3 a
			left outer JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			AND ActiveFlag = 1 --Added by Srini on 10-November-2019
			ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level3LeafNodeFlag

			WHILE @@FETCH_STATUS = 0
			BEGIN
			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3, @Level3LeafNodeFlag);

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)  
			, ISNULL(a.LeafNodeFlag, 0)
			FROM Amplo.DecompositionProcessLevel4 a
			left outer JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			AND ActiveFlag = 1 --Added by Srini on 10-November-2019
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level4LeafNodeFlag


			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
				INSERT INTO #DecompositionProcessLevelDetails
				(
					ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
					VALUES
					(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4, @Level4LeafNodeFlag, @ProcessLevelNodeID);
							
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],
							ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)
							, ISNULL(a.LeafNodeFlag, 0)
							from Amplo.DecompositionProcessLevel5 a
							left outer join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID AND a.[DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
							AND ActiveFlag = 1 --Added by Srini on 10-November-2019
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level5LeafNodeFlag

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5, @Level5LeafNodeFlag, @ProcessLevelNodeID);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level5LeafNodeFlag
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level4LeafNodeFlag
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level3LeafNodeFlag
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Level2LeafNodeFlag
    END;

    CLOSE ProcessLeveL2List
    DEALLOCATE ProcessLeveL2List

   CREATE INDEX IX_ProcessLevelID ON #DecompositionProcessLevelDetails (ProcessLevel1ID, ProcessLevel2ID,ProcessLevel3ID,ProcessLevel4ID,ProcessLevel5ID);

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
			ProcessLevel
			, LeafNodeFlag
			, @Status [Status]
		FROM #DecompositionProcessLevelDetails


		DROP TABLE if exists #DecompositionProcessLevelDetails;

    COMMIT TRANSACTION;
	RETURN 0;
    END TRY
    BEGIN CATCH
		CLOSE ProcessLeveL2List
		DEALLOCATE ProcessLeveL2List

		CLOSE ProcessLeveL3List
		DEALLOCATE ProcessLeveL3List

		--CLOSE ProcessLeveL4List
		--DEALLOCATE ProcessLeveL4List

		--CLOSE ProcessLeveL2List
		--DEALLOCATE ProcessLeveL2List

		select Error_Message(), error_Line()
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
