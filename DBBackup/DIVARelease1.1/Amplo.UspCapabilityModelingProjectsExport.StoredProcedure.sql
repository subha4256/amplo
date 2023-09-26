USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[UspCapabilityModelingProjectsExport]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[UspCapabilityModelingProjectsExport]
	-- Add the parameters for the stored procedure here
	@ProjectID [int]
	--@ProcessLevel1ID [int]
AS
BEGIN

	
   --------------------------------------------------------------------------------------------------------------

  select DISTINCT
			
			ProjectName
			
			--ProcessLevelNodeID as ProcessLevelID, 
			--ProcessLevelTitle, 
			
		
			--d.Owner, 
			--d.CountrySpecific, 
			--Priority, 
			
			--ProcessLevel
			
		FROM 
		--#DecompositionProcessLevelDetails d 
		
		--inner join 
		 DecompositionProject r Where r.DecompositionProjectID=@ProjectID 
		--inner join DecompositionFunctionProject f on f.DecompositionProjectID=r.DecompositionProjectID 
		--inner  join DecompositionProcessLevel1 a on a.DecompositionProjectID =@ProjectID 
			--	WHERE
		 --a.DecompositionProcessLevel1ID = @ProcessLevel1ID 
		

	

END
GO
