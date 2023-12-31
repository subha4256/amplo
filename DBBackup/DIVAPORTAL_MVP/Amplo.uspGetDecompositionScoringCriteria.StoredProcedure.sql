USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionScoringCriteria]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionScoringCriteria]
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
	--and [SeededFlag] = 1 
	and [UsedFlag] = 1
	and [DecompositionProcessLevel1ID] = @ProcessLevel1ID
END
GO
