USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetBenchmarkingLevels]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 09-Sep-2019
-- Description:	This procedure retrieves Benchmarking ASIS score, TO Be score and Industry Benchmarking score for reporting purpose
-- =============================================
create PROCEDURE [Amplo].[uspGetBenchmarkingLevels] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 	[BenchmarkingLevelName], [BenchmarkingDescription], [BenchmarkingCharacterizedby], 	[BenchmarkingKeyEnablers] from Amplo.benchmarkingLevel;

END

GO
