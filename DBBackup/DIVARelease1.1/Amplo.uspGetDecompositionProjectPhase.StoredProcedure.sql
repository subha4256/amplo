USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProjectPhase]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [Amplo].[uspGetDecompositionProjectPhase]
 (
    @Userid [int],
    @DecompositionProjectID [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY

		Declare @ClientID as INT
		Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

		SELECT [DecompositionPhaseProjectID]
			  ,[DecompositionProjectID]
			  ,[PhaseTitle]
			  ,[IndustryID]
			  ,[IndustryVerticalID]
			  ,[IndustrySubVerticalID]
			  ,[PhaseNumber] [PhaseId]
		FROM [Amplo].[DecompositionPhaseProject]
		WHERE UserId = @Userid AND [DecompositionProjectID] = @DecompositionProjectID
		and ActiveFlag = 1
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
