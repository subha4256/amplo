USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionScoringCriteria_08112019]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionScoringCriteria_08112019]
	-- Add the parameters for the stored procedure here
	@DecompositionProjectID int,
	@ProcessLevel1ID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select 
		[DecompositionScoreCriteriaID],
		[DecompositionProjectID],
		[DecompositionProcessLevel1ID],
		[ScoreCriteriaName],
		[ScoreCriteriaActualName],
		[ScoreCriteriaTitle],
		[ScoreCriteriaDescription],
		[SeededFlag],
		[UsedFlag] 
	from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID = @DecompositionProjectID 
	and (DecompositionProcessLevel1ID = 1 or DecompositionProcessLevel1ID = @ProcessLevel1ID)

END
GO
