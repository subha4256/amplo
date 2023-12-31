USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProcessLevel2Tasks]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================================================================
-- Author:		Srinivas
-- Create date: 30-Sept-2019
-- Description:	Thsi procedure retrieves ProcessLevel2 task details
-- =============================================================================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionProcessLevel2Tasks]
	-- Add the parameters for the stored procedure here
	@UserID int,
	@DecompositionProjectID int,
	@DecompositionProcessLevel1ID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT DecompositionProcessLevel2ID, DecompositionProcessLevel1ID, ProcessLevel2Title from Amplo.DecompositionProcessLevel2 where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID;
END
GO
