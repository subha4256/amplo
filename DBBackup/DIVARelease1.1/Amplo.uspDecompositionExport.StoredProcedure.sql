USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspDecompositionExport]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc[Amplo].[uspDecompositionExport]
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN
	Declare @sql1 nvarchar(max)
	DECLARE @AvgScoreWeightage [int]
	SELECT top 1 @AvgScoreWeightage = ISNULL([Avg_Score_Weight],2.00) FROM DecompositionProcessLevel1 a
	INNER JOIN DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID  and a.ActiveFlag = 1
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;

	CREATE table #DecompositionProcessLevelDetails
	(
		  ProcessLevel1Id int
		, ProcessLevel1Title nvarchar(100)
		, ProcessLevel2Id int
		, ProcessLevel2Title nvarchar(100)
		, ProcessLevel3Id int
		, ProcessLevel3Title nvarchar(100)
		, ProcessLevel4Id int
		, ProcessLevel4Title nvarchar(100)
		, ProcessLevel5Id int
		, ProcessLevel5Title nvarchar(100)
		, [Priority] nvarchar(100)
		, [Owner] nvarchar(100)
		, Country nvarchar(100)
	)

	declare @UsedFlag bit = 1
	DECLARE @MyScoreCriteriaCursor CURSOR;
	DECLARE @ScoreCriteriaTitles varchar(100);
	dECLARE @ScoreCnt int;
	Declare @SQLscore Varchar(100);
	set @ScoreCnt =1
	BEGIN
		SET @MyScoreCriteriaCursor = CURSOR FOR
		select (case when UsedFlag = 1 then ScoreCriteriaTitle else ScoreCriteriaName End) ScoreCriteriaTitle, UsedFlag from Amplo.DecompositionScoreCriteriaProject
		where DecompositionProjectID = @ProjectID and DecompositionProcessLevel1ID = @ProcessLevel1ID --and UsedFlag = 1 

		OPEN @MyScoreCriteriaCursor 
		FETCH NEXT FROM @MyScoreCriteriaCursor
		INTO @ScoreCriteriaTitles, @UsedFlag

		WHILE @@FETCH_STATUS = 0
		BEGIN
			if(@UsedFlag = 1)
			begin
				set @sql1 = 'Alter table #DecompositionProcessLevelDetails add [' + @ScoreCriteriaTitles + '] numeric(2, 1)'
			end
			else
			begin
				set @sql1 = 'Alter table #DecompositionProcessLevelDetails add [' + @ScoreCriteriaTitles + '] numeric(2, 1)'
			end
			EXEC (@sql1)

		  --set @SQLscore = 'Update #DecompositionProcessLevelDetails Set [' + @ScoreCriteriaTitles + '] = Score_Criteria_' + cast(@ScoreCnt as varchar)
		  --EXEC (@SQLscore)
		  --PRINT (@SQLscore)
		  FETCH NEXT FROM @MyScoreCriteriaCursor
		  INTO @ScoreCriteriaTitles, @UsedFlag
		   set @ScoreCnt =@ScoreCnt+1;
		END; 

		CLOSE @MyScoreCriteriaCursor
		DEALLOCATE @MyScoreCriteriaCursor
	END

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, l3.DecompositionProcessLevel3ID, l3.ProcessLevel3Title, l4.DecompositionProcessLevel4ID, l4.ProcessLevel4Title
	, l5.DecompositionProcessLevel5ID, l5.ProcessLevel5Title, @AvgScoreWeightage, l5.[Owner], l5.[CountrySpecific]
	, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6
	, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10
	from [Amplo].[DecompositionProcessLevel5] l5
	join [Amplo].[DecompositionProcessLevel4] l4 on l4.DecompositionProcessLevel4ID = l5.DecompositionProcessLevel4ID
	join [Amplo].[DecompositionProcessLevel3] l3 on l3.DecompositionProcessLevel3ID = l4.DecompositionProcessLevel3ID
	join [Amplo].[DecompositionProcessLevel2] l2 on l2.DecompositionProcessLevel2ID = l3.DecompositionProcessLevel2ID
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel5Score] scr on scr.DecompositionProcessLevel5ID = l5.DecompositionProcessLevel5ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l5.ActiveFlag = 1 and l4.ActiveFlag = 1 and l3.ActiveFlag = 1 and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l5.LeafNodeFlag = 1

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, l3.DecompositionProcessLevel3ID, l3.ProcessLevel3Title, l4.DecompositionProcessLevel4ID, l4.ProcessLevel4Title
	, NULL, NULL, @AvgScoreWeightage, l4.[Owner], l4.[CountrySpecific]
	, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6
	, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10
	from [Amplo].[DecompositionProcessLevel4] l4
	join [Amplo].[DecompositionProcessLevel3] l3 on l3.DecompositionProcessLevel3ID = l4.DecompositionProcessLevel3ID
	join [Amplo].[DecompositionProcessLevel2] l2 on l2.DecompositionProcessLevel2ID = l3.DecompositionProcessLevel2ID
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel4Score] scr on scr.DecompositionProcessLevel4ID = l4.DecompositionProcessLevel4ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l4.ActiveFlag = 1 and l3.ActiveFlag = 1 and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l4.LeafNodeFlag = 1

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, l3.DecompositionProcessLevel3ID, l3.ProcessLevel3Title, NULL, NULL
	, NULL, NULL, @AvgScoreWeightage, l3.[Owner], l3.[CountrySpecific]
	, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6
	, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10
	from [Amplo].[DecompositionProcessLevel3] l3
	join [Amplo].[DecompositionProcessLevel2] l2 on l2.DecompositionProcessLevel2ID = l3.DecompositionProcessLevel2ID
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel3Score] scr on scr.DecompositionProcessLevel3ID = l3.DecompositionProcessLevel3ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l3.ActiveFlag = 1 and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l3.LeafNodeFlag = 1

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, NULL, NULL, NULL, NULL
	, NULL, NULL, @AvgScoreWeightage, l2.[Owner], l2.[CountrySpecific]
	, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6
	, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10
	from [Amplo].[DecompositionProcessLevel2] l2
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel2Score] scr on scr.DecompositionProcessLevel2ID = l2.DecompositionProcessLevel2ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l2.LeafNodeFlag = 1

	DECLARE @Columns as VARCHAR(MAX)
	Declare @ProjectID1 as Varchar(500)
    Declare @ProcessID1 as Varchar(500)
	SET @ProjectID1 =CAST(@ProjectID as varchar(50));
	SET @ProcessID1 =CAST(@ProcessLevel1ID as varchar(50));
	SELECT @Columns =
	COALESCE(@Columns + ', ','') + QUOTENAME(ScoreCriteriaName)
	FROM
	(SELECT DISTINCT (case when p.UsedFlag = 1 then p.ScoreCriteriaTitle else p.ScoreCriteriaName End) ScoreCriteriaName, p.DecompositionScoreCriteriaId
		FROM Amplo.DecompositionScoreCriteriaProject P
           where P.DecompositionProcessLevel1ID=@ProcessLevel1ID and P.DecompositionProjectID =@ProjectID
	) AS B Order by B.DecompositionScoreCriteriaId

	exec('select ProcessLevel1Title, ProcessLevel2Title, ProcessLevel3Title, ProcessLevel4Title, ProcessLevel5Title, [Priority], [Owner], Country
	, ' + @Columns + '
	from #DecompositionProcessLevelDetails')
	drop table #DecompositionProcessLevelDetails
END
GO
