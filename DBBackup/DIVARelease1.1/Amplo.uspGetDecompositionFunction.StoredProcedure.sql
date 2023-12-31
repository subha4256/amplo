USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionFunction]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionFunction]
	@TemplateId as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DecompositionFunctionID]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[FunctionName]
      ,[FunctionTilte] as 'FunctionTitle'
      ,[FunctionDescription]
      ,[FunctionNumber]
  FROM [Amplo].[DecompositionFunction]
  where [DecompositionFunctionID] in 
  (select FunctionId from [Amplo].[CMTempFrameStructure] where ActiveFlag = 1 and TemplateId = @TemplateId)
END
GO
