USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionPhaseProject]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetDecompositionPhaseProject]
 (
    @Userid [int],
    @projectid [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;


select PhaseNumber as DecompositionPhaseProjectID, PhaseName from Amplo.DecompositionPhaseProject where UserID = @Userid and DecompositionProjectID = @projectid and ActiveFlag = 1;

/*
select DecompositionPhaseProjectID, PhaseName from Amplo.DecompositionPhaseProject where UserID = @Userid and DecompositionProjectID = @projectid and ActiveFlag = 1;
*/

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
