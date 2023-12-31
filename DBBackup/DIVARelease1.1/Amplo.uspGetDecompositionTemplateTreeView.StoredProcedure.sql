USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTemplateTreeView]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTemplateTreeView]
	@TemplateId [int],
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
		NodeLevelID [varchar](100),
		ProcessLevel [int]
		, LeafNodeFlag bit
	  );
	  declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	  declare @Status as int = 0
		--Process Level1 Cursor

	SELECT top 1 @PProcessLevel1ID = a.AmploDecompositionProcessLevel1TemplateID, @ProcessLevelTitle = ProceeLevel1Title FROM Amplo.AmploDecompositionProcessLevel1Template a
	WHERE a.TemplateID = @TemplateId AND a.AmploDecompositionProcessLevel1TemplateID = @ProcessLevel1ID
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;
	INSERT INTO #DecompositionProcessLevelDetails
	(
		ProcessLevel1ID, ProcessLevelTitle, ProcessLevel, LeafNodeFlag
	)
	VALUES
	(
		@ProcessLevel1ID, @ProcessLevelTitle, 1, 0
	)

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT 
	a.DecompositionProcessLevel1TemplateID, 
	a.DecompositionProcessLevel2TemplateID, 
	a.[ProcessLevel2NodeID],
	a.[ProcessLevel2Title],
	ISNULL(a.LeafNodeFlag, 0) 
	
	FROM Amplo.AmploDecompositionProcessLevel2Template a 
	WHERE a.DecompositionProcessLevel1TemplateID = @ProcessLevel1ID 
	--added by Srini on 10-November 2019
	AND ActiveFlag = 1
    ORDER BY DecompositionProcessLevel1TemplateID, DecompositionProcessLevel2TemplateID Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Level2LeafNodeFlag
	
    WHILE @@FETCH_STATUS = 0
    BEGIN
			
		INSERT INTO #DecompositionProcessLevelDetails
		(
			ProcessLevel1ID, ProcessLevel2ID, ProcessLevelNodeID, ProcessLevelTitle, ProcessLevel, LeafNodeFlag)
			VALUES
			(
				@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, 2, @Level2LeafNodeFlag
			);


			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.DecompositionProcessLevel1TemplateID, a.DecompositionProcessLevel1TemplateID, a.DecompositionProcessLevel3TemplateID, [ProcessLevel3NodeID], [ProcessLevel3Title], ISNULL(a.LeafNodeFlag, 0)
			FROM Amplo.AmploDecompositionProcessLevel3Template a
			WHERE a.DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			ORDER BY a.DecompositionProcessLevel1TemplateID, a.DecompositionProcessLevel2TemplateID, a.DecompositionProcessLevel3TemplateID Asc;

			OPEN ProcessLevel3List
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Level3LeafNodeFlag

			WHILE @@FETCH_STATUS = 0
			BEGIN
			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ProcessLevel, LeafNodeFlag)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, 3, @Level3LeafNodeFlag);

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.DecompositionProcessLevel1TemplateID, a.DecompositionProcessLevel2TemplateID, a.DecompositionProcessLevel3TemplateID, a.DecompositionProcessLevel4TemplateID, a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], ISNULL(a.LeafNodeFlag, 0)
			FROM Amplo.AmploDecompositionProcessLevel4Template a
			WHERE  a.DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID 
			AND a.DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
			AND ActiveFlag = 1 --Added by Srini on 10-November-2019
			ORDER BY DecompositionProcessLevel1TemplateID, DecompositionProcessLevel2TemplateID, DecompositionProcessLevel3TemplateID, DecompositionProcessLevel4TemplateID Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Level4LeafNodeFlag


			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
				INSERT INTO #DecompositionProcessLevelDetails
				(
					ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
					VALUES
					(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, 4, @Level4LeafNodeFlag, @ProcessLevelNodeID);
							
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.DecompositionProcessLevel1TemplateID, a.DecompositionProcessLevel2TemplateID, a.DecompositionProcessLevel3TemplateID, a.DecompositionProcessLevel4TemplateID
							,a.DecompositionProcessLevel5TemplateID, [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag]
							, ISNULL(a.LeafNodeFlag, 0)
							from Amplo.AmploDecompositionProcessLevel5Template a
							where a.DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
							AND a.DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID AND a.DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
							AND ActiveFlag = 1 --Added by Srini on 10-November-2019
							ORDER BY DecompositionProcessLevel1TemplateID, DecompositionProcessLevel2TemplateID, DecompositionProcessLevel3TemplateID, DecompositionProcessLevel4TemplateID
							, DecompositionProcessLevel5TemplateID Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Level5LeafNodeFlag

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, 5, @Level5LeafNodeFlag, @ProcessLevelNodeID);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Level5LeafNodeFlag
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Level4LeafNodeFlag
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Level3LeafNodeFlag
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Level2LeafNodeFlag
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
			NodeLevelID,
			ProcessLevel
			, LeafNodeFlag
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
