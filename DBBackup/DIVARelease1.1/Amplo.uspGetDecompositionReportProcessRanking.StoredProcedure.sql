USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionReportProcessRanking]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 29-Nov-2019
-- Description:	This procedure retrieves process level details and respective socres
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionReportProcessRanking]
	-- Add the parameters for the stored procedure here
	@UserID [int],
	@DecompositionProjectID [int],
	@FunctionID [int],
	@PhaseID [int]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    BEGIN TRY

		Declare @ClientID as INT
		Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

    -- Insert statements for procedure here
	SELECT [ProcessLevel1Title]
		  ,[FunctionID]
		  ,[PhaseID]
		  ,[Level1_Calc_Aggr_Score]
		  ,RANK () OVER ( 
		  ORDER BY Level1_Calc_Aggr_Score DESC
		  ) Ranking 
	FROM [Amplo].[DecompositionProcessLevel1] ProcessLevel1
		INNER JOIN [Amplo].[DecompositionProcessLevel1Score] ProcessLevel1Score
		ON ProcessLevel1.[DecompositionProcessLevel1ID] = ProcessLevel1Score.[DecompositionProcessLevel1ID]
		WHERE ProcessLevel1.ClientID = @ClientID AND ProcessLevel1.DecompositionProjectID = @DecompositionProjectID 
		AND ProcessLevel1.FunctionID = @FunctionID AND ProcessLevel1.PhaseID = @PhaseID
		AND ProcessLevel1.ActiveFlag = 1 AND ProcessLevel1.GridVViewLocationFlag = 1;
	END TRY
	BEGIN CATCH
			-- Rollback any active or uncommittable transactions before
			-- inserting information in the ErrorLog

			EXECUTE [Amplo].[uspLogError];
	END CATCH;


END
GO
