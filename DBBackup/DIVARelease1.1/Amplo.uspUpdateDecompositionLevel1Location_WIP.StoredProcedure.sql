USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionLevel1Location_WIP]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateDecompositionLevel1Location_WIP]
    @ProjectID [int], 
    @ProcessLevel1ID [int],
    @FunctionID [int],
    @PhaseID [int],
	@ProcessLevelTitle [varchar](100),
    @LocationID [int],
    @LocationFlag [int]
AS
BEGIN
    SET NOCOUNT ON; 

    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Amplo].[DecompositionProcessLevel1]
        SET  
			[FunctionID] = @FunctionID, 
			[PhaseID] = @PhaseID, 
			[ProcessLevel1Title]=@ProcessLevelTitle,
			[GridViewLocationID] = @LocationID,  
			[GridVViewLocationFlag] = @LocationFlag 
        WHERE [DecompositionProjectID] = @ProjectID AND [DecompositionProcessLevel1ID] = @ProcessLevel1ID 

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
END;

GO
