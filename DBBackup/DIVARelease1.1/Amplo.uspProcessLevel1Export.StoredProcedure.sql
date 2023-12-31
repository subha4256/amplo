USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspProcessLevel1Export]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspProcessLevel1Export]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN

	SET NOCOUNT ON;

	Declare @clientid as INT
	--Declare @ProcessLevel1ID as INT
	
	DECLARE @AvgScoreWeightage [int]
	
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]
	


	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		
		
		NodeLevelID [varchar](100), 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int],
		TotalAvgScore numeric(10, 2),
		TotalAvgScore1  numeric(10, 2)
		
		, LeafNodeFlag bit
	  );
	  declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	  declare @Status as int = 0
--Process Level1 Cursor

	SELECT top 1 @Status = a.[Status],  @ProcessLevel1ID = a.[DecompositionProcessLevel1ID], @ProcessLevelTitle=[ProcessLevel1Title], @Owner=[Owner], @AvgScoreWeightage = ISNULL([Avg_Score_Weight],2.00) FROM DecompositionProcessLevel1 a
	INNER JOIN DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID and a.DecompositionProcessLevel1ID=@ProcessLevel1ID and a.ActiveFlag = 1
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;
	INSERT INTO #DecompositionProcessLevelDetails
	(
		ProcessLevel1ID, ProcessLevelTitle, Owner, Priority, ProcessLevel, LeafNodeFlag, TotalAvgScore1
	)
	VALUES
	(
		@ProcessLevel1ID, @ProcessLevelTitle, @Owner, @AvgScoreWeightage, 1, 0, -1
	)

   --------------------------------------------------------------------------------------------------------------

select DISTINCT
	        --ProjectName,
			PhaseName, 
			FunctionName,
			ProcessLevel1Title,
			
			--ProcessLevelNodeID as ProcessLevelID, 
			
			 CASE 
     WHEN Priority =  0 THEN 'LOW'
     WHEN Priority =  1 THEN 'Medium'
	 Else 'High'
  
      end AS Priority
		
			--,NodeLevelID, 
			,ISNULL(d.Owner,'') Owner, 
			ISNULL(d.CountrySpecific,'') Country
			
		FROM #DecompositionProcessLevelDetails d 
		inner  join Amplo.DecompositionProcessLevel1 a on a.DecompositionProjectID = 

		 @ProjectID and a.DecompositionProcessLevel1ID=@ProcessLevel1ID
		inner join Amplo.DecompositionProject r on r.DecompositionProjectID=

		@ProjectID
		inner join Amplo.DecompositionFunction f on 
		--f.DecompositionProjectID=r.DecompositionProjectID 
		--and 
		f.FunctionNumber =a.FunctionID
		
		
	    inner  join Amplo.DecompositionPhase p on 
		--p.DecompositionProjectID=a.DecompositionProjectID and 
		 p.PhaseNumber =a.PhaseID
	
		  
		WHERE
		 a.DecompositionProcessLevel1ID = @ProcessLevel1ID 
		

	DROP TABLE if exists #DecompositionProcessLevelDetails;
	

    

END
GO
