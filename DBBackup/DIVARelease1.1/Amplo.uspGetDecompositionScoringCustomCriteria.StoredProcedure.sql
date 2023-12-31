USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionScoringCustomCriteria]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionScoringCustomCriteria]
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
	AND DecompositionProcessLevel1ID = @ProcessLevel1ID
	and [SeededFlag] = 0 AND [UsedFlag] = 0

END
GO
