USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProcessLevel1HeatMap]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Srinivas
-- Create date: 24-October-2019
-- Description:	This procedure provides Capability Modelling Heatmap with Score Details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionProcessLevel1HeatMap] --1015, 4
	-- Add the parameters for the stored procedure here
    @Userid [int],
    @projectid [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    BEGIN TRY

	Declare @ClientID as INT
	Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

    -- Insert statements for procedure here
	SELECT dpl.DecompositionProcessLevel1ID, dpl.DecompositionProjectID, dpl.FunctionID,dpl.PhaseID,dpl.ProcessLevel1Title,dpl.GridVViewLocationFlag,dpl.GridViewLocationID,dpl.Status,ISNULL((dpls.Level1_Calc_Aggr_Score), 0) As AggrScore 
	FROM Amplo.DecompositionProcessLevel1 dpl
	LEFT JOIN
	Amplo.DecompositionProcessLevel1Score dpls
	ON dpl.DecompositionProcessLevel1ID = dpls.DecompositionProcessLevel1ID
	WHERE dpl.ClientID = @ClientID And dpl.DecompositionProjectID = @projectid and dpl.ActiveFlag = 1 and dpl.GridVViewLocationFlag = 1
	--and dpls.Disable_Date is null
    END TRY
    BEGIN CATCH
        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
