USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspProcessDetailsExport]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [Amplo].[uspProcessDetailsExport]
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN
	set nocount on
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
		, Number1 numeric(10, 2)
		, Number2 numeric(10, 2)
		, Number3 numeric(10, 2)
		, Number4 numeric(10, 2)
		, Number5 numeric(10, 2)
		, Number6 numeric(10, 2)
		, Number7 numeric(10, 2)
		, Number8 numeric(10, 2)
		, Number9 numeric(10, 2)
		, Number10 numeric(10, 2)
		, Attribute1 nvarchar(256)
		, Attribute2 nvarchar(256)
		, Attribute3 nvarchar(256)
		, Attribute4 nvarchar(256)
		, Attribute5 nvarchar(256)
		, Attribute6 nvarchar(256)
		, Attribute7 nvarchar(256)
		, Attribute8 nvarchar(256)
		, Attribute9 nvarchar(256)
		, Attribute10 nvarchar(256)
		, Blob1 varbinary(MAX)
		, Blob2 varbinary(MAX)
		, Blob3 varbinary(MAX)
		, Clob1 varchar(MAX)
		, Clob2 varchar(MAX)
		, Clob3 varchar(MAX)
	)

	

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, l3.DecompositionProcessLevel3ID, l3.ProcessLevel3Title, l4.DecompositionProcessLevel4ID, l4.ProcessLevel4Title
	, l5.DecompositionProcessLevel5ID, l5.ProcessLevel5Title, l5.Number1, l5.Number2, l5.Number3, l5.Number4, l5.Number5, l5.Number6
	, l5.Number7, l5.Number8, l5.Number9, l5.Number10, l5.Attribute1, l5.Attribute2, l5.Attribute3, l5.Attribute4, l5.Attribute5, l5.Attribute6
	, l5.Attribute7, l5.Attribute8, l5.Attribute9, l5.Attribute10, l5.Blob1, l5.Blob2, l5.Blob3, l5.Clob1, l5.Clob2, l5.Clob3
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
	, NULL, NULL, l4.Number1, l4.Number2, l4.Number3, l4.Number4, l4.Number5, l4.Number6
	, l4.Number7, l4.Number8, l4.Number9, l4.Number10, l4.Attribute1, l4.Attribute2, l4.Attribute3, l4.Attribute4, l4.Attribute5, l4.Attribute6
	, l4.Attribute7, l4.Attribute8, l4.Attribute9, l4.Attribute10, l4.Blob1, l4.Blob2, l4.Blob3, l4.Clob1, l4.Clob2, l4.Clob3
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
	, NULL, NULL, l3.Number1, l3.Number2, l3.Number3, l3.Number4, l3.Number5, l3.Number6
	, l3.Number7, l3.Number8, l3.Number9, l3.Number10, l3.Attribute1, l3.Attribute2, l3.Attribute3, l3.Attribute4, l3.Attribute5, l3.Attribute6
	, l3.Attribute7, l3.Attribute8, l3.Attribute9, l3.Attribute10, l3.Blob1, l3.Blob2, l3.Blob3, l3.Clob1, l3.Clob2, l3.Clob3
	from [Amplo].[DecompositionProcessLevel3] l3
	join [Amplo].[DecompositionProcessLevel2] l2 on l2.DecompositionProcessLevel2ID = l3.DecompositionProcessLevel2ID
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel3Score] scr on scr.DecompositionProcessLevel3ID = l3.DecompositionProcessLevel3ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l3.ActiveFlag = 1 and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l3.LeafNodeFlag = 1

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, NULL, NULL, NULL, NULL
	, NULL, NULL, l2.Number1, l2.Number2, l2.Number3, l2.Number4, l2.Number5, l2.Number6
	, l2.Number7, l2.Number8, l2.Number9, l2.Number10, l2.Attribute1, l2.Attribute2, l2.Attribute3, l2.Attribute4, l2.Attribute5, l2.Attribute6
	, l2.Attribute7, l2.Attribute8, l2.Attribute9, l2.Attribute10, l2.Blob1, l2.Blob2, l2.Blob3, l2.Clob1, l2.Clob2, l2.Clob3
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

	select ProcessLevel1Title, ProcessLevel2Title, ProcessLevel3Title, ProcessLevel4Title, ProcessLevel5Title, Number1, Number2, Number3, Number4, Number5, Number6
	, Number7, Number8, Number9, Number10, Attribute1, Attribute2, Attribute3, Attribute4, Attribute5, Attribute6
	, Attribute7, Attribute8, Attribute9, Attribute10, Blob1, Blob2, Blob3, Clob1, Clob2, Clob3
	from #DecompositionProcessLevelDetails
	drop table #DecompositionProcessLevelDetails
END
GO
