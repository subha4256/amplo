USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUPdateDecompositionAverageScores]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================================================================================================================
-- Author:		Srinivas
-- Create date: 07-October-2019
-- Description:	This procedure calcultes and updates average scores
-- =====================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspUPdateDecompositionAverageScores]
	-- Add the parameters for the stored procedure here
	@ProjectID [int]
   ,@UserID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @ProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]
	
    -- Insert statements for procedure here


	--Process Level1 Cursor
	DECLARE ProcessLevel1List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT DecompositionProcessLevel1ID from Amplo.DecompositionProcessLevel1 where DecompositionProjectID = @ProjectID
    ORDER BY DecompositionProcessLevel1ID Asc;

    OPEN ProcessLevel1List;
    FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;

    WHILE @@FETCH_STATUS = 0
    BEGIN

		-- Process Level2 Cursor
		DECLARE ProcessLevel2List CURSOR FAST_FORWARD READ_ONLY
		FOR
		SELECT DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where DecompositionProcessLevel1ID = @ProcessLevel1ID
		ORDER BY DecompositionProcessLevel2ID Asc;

		OPEN ProcessLevel2List;
		FETCH NEXT FROM ProcessLevel2List INTO @ProcessLevel2ID;

		WHILE @@FETCH_STATUS = 0
/*
		BEGIN

		if nodeflag = 0

			begin


			SELECT @ProcessLevel2AverageScore = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10]) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from Amplo.DecompositionProcessLevel2Score
			where [DecompositionProcessLevel1ID] = @ProcessLevel2ID
			GROUP BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID]
			end;
		else
			begin
				DECLARE ProcessLevel2List CURSOR FAST_FORWARD READ_ONLY
				FOR
				SELECT DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where DecompositionProcessLevel1ID = @ProcessLevel1ID
				ORDER BY DecompositionProcessLevel2ID Asc;

				OPEN ProcessLevel2List;
				FETCH NEXT FROM ProcessLevel2List INTO @ProcessLevel2ID;

				WHILE @@FETCH_STATUS = 0
				BEGIN

					SELECT @ProcessLevel2AverageScore = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10]) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from Amplo.DecompositionProcessLevel2Score
					where [DecompositionProcessLevel1ID] = @ProcessLevel2ID
					GROUP BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID]
		
				FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;
				END;

		end;


		FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;
		END;

*/
    FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;
    END;

    CLOSE ProcessLevel1List;
    DEALLOCATE ProcessLevel1List;


END
GO
