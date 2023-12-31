USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspScoreCriteriaExport]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspScoreCriteriaExport]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN

	SET NOCOUNT ON;
	Declare @ScoreCriteria1 [VARCHAR](100) ;
	Declare @ScoreCriteria2 [VARCHAR](100) ;
	Declare @ScoreCriteria3 [VARCHAR](100) ;
	Declare @ScoreCriteria4 [VARCHAR](100) ;
	Declare @ScoreCriteria5 [VARCHAR](100) ;
	Declare @ScoreCriteria6 [VARCHAR](100) ;
    Declare @ScoreCriteria7 [VARCHAR](100) ;
	Declare @ScoreCriteria8 [VARCHAR](100) ;
	Declare @ScoreCriteria9 [VARCHAR](100) ;
	Declare @ScoreCriteria10 [VARCHAR](100) ;

	SET @ScoreCriteria1= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=1)
	SET @ScoreCriteria2= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=2)
	SET @ScoreCriteria3= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=3)
	SET @ScoreCriteria4= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=4)
	SET @ScoreCriteria5= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=5)
	SET @ScoreCriteria6= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=6)
	SET @ScoreCriteria7= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=7)
	SET @ScoreCriteria8= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=8)
	SET @ScoreCriteria9= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=9)
	SET @ScoreCriteria10= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=10)

	DROP TABLE if exists #DecompositionScoreCriteria;
	CREATE TABLE #DecompositionScoreCriteria
    (
		ScoringCriteriaColumn [varchar](100),
		
		ScoreCriteria1 [varchar](100), 
		ScoreCriteria2 [varchar](100),
		ScoreCriteria3 [varchar](100),
		ScoreCriteria4 [varchar](100),
		ScoreCriteria5 [varchar](100),
		ScoreCriteria6 [varchar](100),
		ScoreCriteria7 [varchar](100),
		ScoreCriteria8 [varchar](100),
		ScoreCriteria9 [varchar](100),
		ScoreCriteria10 [varchar](100)
	  );
   INSERT INTO #DecompositionScoreCriteria
    (
		ScoringCriteriaColumn,ScoreCriteria1,ScoreCriteria2,ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,ScoreCriteria9,ScoreCriteria10)
		VALUES
		(
			'Scoring Criteria New Title',@ScoreCriteria1,@ScoreCriteria2,@ScoreCriteria3,@ScoreCriteria4,@ScoreCriteria5,@ScoreCriteria6,@ScoreCriteria7,@ScoreCriteria8,@ScoreCriteria9,@ScoreCriteria10)

		
		


   --------------------------------------------------------------------------------------------------------------

--   DECLARE @Columns as VARCHAR(MAX)
--   Declare @ProjectID1 as Varchar(500)
 Declare @ProcessID1 as Varchar(500)
--   SET @ProjectID1 =CAST(@ProjectID as varchar(50));
   SET @ProcessID1 =CAST(@ProcessLevel1ID as varchar(50));
--SELECT @Columns =
--COALESCE(@Columns + ', ','') + QUOTENAME(ScoreCriteriaName)
--FROM
--   (SELECT DISTINCT P.ScoreCriteriaName
--    FROM   Amplo.DecompositionScoreCriteria P
--           INNER JOIN Amplo.DecompositionProcessLevel1 L
--           ON L.DecompositionProcessLevel1ID = P.DecompositionProcessLevel1ID and L.DecompositionProjectID =@ProjectID and L.ActiveFlag=1
--   ) AS B Order by B.ScoreCriteriaName
  -- PRINT (@Columns)

  --DECLARE @SQL AS NVARCHAR(MAX)

  Declare @cols nvarchar(max)
Declare @query nvarchar(max)

--Select @cols = stuff((select ','+QuoteName(Row_Number() over (Order by (Select NULL))) from Amplo.DecompositionScoreCriteria for xml path('')),1,1,'')
--Select @query = ' Select * from (
--    Select ScoreCriteriaName, RowN = Row_Number() over (order by ScoreCriteriaName) from Amplo.DecompositionScoreCriteria P 
--	where DecompositionProcessLevel1ID =' + @ProcessID1 + '
--    ) a
--    pivot (max(ScoreCriteriaName) for RowN in (' + @cols + ')) p '
--	PRINT(@query)
--Exec sp_executesql @query



  
select DISTINCT
	       
			ScoringCriteriaColumn,
		
		ISNULL(ScoreCriteria1 ,'') ScoreCriteria1, 
		ISNULL(ScoreCriteria2 ,'') ScoreCriteria2, 
		ISNULL(ScoreCriteria3  ,'') ScoreCriteria3, 
		ISNULL(ScoreCriteria4  ,'') ScoreCriteria4, 
		ISNULL(ScoreCriteria5  ,'') ScoreCriteria5, 
		ISNULL(ScoreCriteria6  ,'') ScoreCriteria6, 
		ISNULL(ScoreCriteria7  ,'') ScoreCriteria7, 
		ISNULL(ScoreCriteria8  ,'') ScoreCriteria8, 
		ISNULL(ScoreCriteria9  ,'') ScoreCriteria9, 
		ISNULL(ScoreCriteria10  ,'') ScoreCriteria10
		
		FROM #DecompositionScoreCriteria d 
		
		--PRINT(@SQL)

		--EXEC(@SQL)
		   
		
		



   

END
GO
