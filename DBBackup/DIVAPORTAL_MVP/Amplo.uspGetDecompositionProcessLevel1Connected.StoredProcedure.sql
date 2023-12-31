USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProcessLevel1Connected]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionProcessLevel1Connected]
	-- Add the parameters for the stored procedure here
@UserID int,
@ProjectID int,
@FunctionID int,
@PhaseID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT DecompositionProcessLevel1ID, Processlevel1title FROM Amplo.DecompositionProcessLevel1 
	WHERE UserID = @UserID 
	AND  DecompositionProjectID = @ProjectID 
	AND FunctionID = @FunctionID 
	AND PhaseID = @PhaseID 
	AND GridVViewLocationFlag=1 
	AND ActiveFlag=1;
END
GO
