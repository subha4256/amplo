USE [DIVAPORTAL]
GO
/****** Object:  UserDefinedFunction [Amplo].[ufngetAverageScore]    Script Date: 20-11-2019 15:28:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [Amplo].[ufngetAverageScore]
(
	-- Add the parameters for the function here
	 @Score1 [float]
	,@Score2 [float]
	,@Score3 [float]
	,@Score4 [float]
	,@Score5 [float]
	,@Score6 [float]
	,@Score7 [float]
	,@Score8 [float]
	,@Score9 [float]
	,@Score10 [float]
	,@ScoreCriteriaCount [int]

)
RETURNS [float]
AS
BEGIN
	-- Declare the return variable here
	DECLARE @AverageScore [float]
--	DECLARE @TotalNoOfScoreCriteria [int]

--	SET @TotalNoOfScoreCriteria = 10;

	-- Add the T-SQL statements to compute the return value here
	
	SELECT @AverageScore = ((ISNULL(@Score1, 0.00) + ISNULL(@Score2, 0.00) + ISNULL(@Score3, 0.00) + ISNULL(@Score4, 0.00) + ISNULL(@Score5, 0.00) + ISNULL(@Score6, 0.00)+ ISNULL(@Score7, 0.00) + ISNULL(@Score8, 0.00) + ISNULL(@Score9, 0.00) + ISNULL(@Score10, 0.00)) / ISNULL(@ScoreCriteriaCount,4));

--	@AverageScore = @AverageScore / 10;
	
	-- Return the result of the function
	RETURN @AverageScore;

END
GO
