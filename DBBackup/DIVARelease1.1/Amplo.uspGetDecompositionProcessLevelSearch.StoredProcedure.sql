USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProcessLevelSearch]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ======================================================================================================================================================
-- Author:		Srinivas
-- Create date: 14-October-2019
-- Description:	This procedure searches Process L1 to L5 process title and highlights the Process Level1
-- ======================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionProcessLevelSearch] 
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@SearchKey [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		WITH ProcessLevelSearch_CTE (DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel1Title)  
		AS  
		(
			SELECT DecompositionProjectID,  DecompositionProcessLevel1ID, ProcessLevel1Title from Amplo.DecompositionProcessLevel1 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel1Title) LIKE '%' + UPPER(@SearchKey) + '%' 
	
			UNION ALL

			SELECT DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel2Title from Amplo.DecompositionProcessLevel2 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel2Title) LIKE '%' + UPPER(@SearchKey) + '%'  

			UNION ALL

			SELECT DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel3Title  from Amplo.DecompositionProcessLevel3 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel3Title) LIKE '%' + UPPER(@SearchKey) + '%'  
	
			UNION ALL

			SELECT DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel4Title from Amplo.DecompositionProcessLevel4 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel4Title) LIKE '%' + UPPER(@SearchKey) + '%' 

			UNION ALL

			SELECT DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel5Title from Amplo.DecompositionProcessLevel5 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel5Title) LIKE '%' + UPPER(@SearchKey) + '%'  
		)
		SELECT psc.DecompositionProjectID, psc.DecompositionProcessLevel1ID, psc.ProcessLevel1Title OtherResult, dp.ProcessLevel1Title, dp.FunctionID, dp.PhaseID, dp.GridViewLocationID, dp.GridVViewLocationFlag, dp.Status  
		FROM ProcessLevelSearch_CTE psc
		INNER JOIN DecompositionProcessLevel1 dp
		on psc.DecompositionProjectID = dp.DecompositionProjectID AND 
		PSC.DecompositionProcessLevel1ID = DP.DecompositionProcessLevel1ID
		where dp.FunctionID != 0 and dp.PhaseID != 0
--	)
END
GO
