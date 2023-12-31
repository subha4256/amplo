USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionPhase]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspGetDecompositionPhase]
	@TemplateId as int
AS
BEGIN
	SET NOCOUNT ON;

SELECT [DecompositionPhaseID]
      ,[PhaseName]
      ,[PhaseTitle]
      ,[PhaseDescription]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[PhaseNumber]
  FROM [Amplo].[DecompositionPhase]
  where [DecompositionPhaseID] in 
  (select PhaseId from [Amplo].[CMTempFrameStructure] where ActiveFlag = 1 and TemplateId = @TemplateId)
END
GO
