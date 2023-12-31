USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionLevel1Title]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionLevel1Title]
    @ProcessLevel1ID [int],
    @ProcessLevel1Title nvarchar(512)
AS
BEGIN
    SET NOCOUNT ON; 

    BEGIN TRY
        BEGIN TRANSACTION;
        UPDATE [Amplo].[DecompositionProcessLevel1]
        SET  ProcessLevel1Name = @ProcessLevel1Title,  ProcessLevel1Title = @ProcessLevel1Title
        WHERE [DecompositionProcessLevel1ID] = @ProcessLevel1ID 

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
	select @ProcessLevel1ID as ProcessLevel1ID
END
GO
