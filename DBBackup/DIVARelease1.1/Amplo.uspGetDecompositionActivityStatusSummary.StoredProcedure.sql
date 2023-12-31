USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionActivityStatusSummary]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionActivityStatusSummary]
@UseriD int,
@ProjectID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;


	SELECT
	ISNULL(SUM((CASE WHEN Status = 1  THEN 1 END)),0) as '1',
	ISNULL(SUM((CASE WHEN Status = 2  THEN 1 END)),0) as '2',
	ISNULL(SUM((CASE WHEN Status = 3  THEN 1 END)),0) as '3'
	from [Amplo].[DecompositionProcessLevel1]
	where [DecompositionProjectID] = @ProjectID and activeflag = 1 and GridVViewLocationFlag = 1
END
GO
