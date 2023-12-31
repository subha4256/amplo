USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionScoringCriteria]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 07-October-2019
-- Description:	This procedure updates Custom Scoring Criteria
-- =============================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionScoringCriteria]
	-- Add the parameters for the stored procedure here
	@UserID [int]
	,@DecompositionProjectID [int]
	,@DecompositionProcessLevel1ID [int]
	,@ScoreCriteriaTitle [varchar](100)
	,@DecompositionScoreCriteriaID [int]
	,@UsedFlag [bit]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
        BEGIN TRY
    BEGIN TRANSACTION;


	Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID
	BEGIN
    -- Insert statements for procedure here
		UPDATE [Amplo].[DecompositionScoreCriteriaProject]
		   SET [ScoreCriteriaTitle] = @ScoreCriteriaTitle
			  ,[UsedFlag] = @UsedFlag
		 WHERE [ClientID] = @ClientID
			   AND [DecompositionProjectID] = @DecompositionProjectID
			   AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			   AND [DecompositionScoreCriteriaID] = @DecompositionScoreCriteriaID

			-- Successfull updation of records
			SELECT messageName from Amplo.[Message] where MessageID = 1025
	END
    
	COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		-- Rollback any active or uncommittable transactions before
		-- inserting information in the ErrorLog
		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
		END

		EXECUTE [Amplo].[uspLogError];
	END CATCH;
END
GO
