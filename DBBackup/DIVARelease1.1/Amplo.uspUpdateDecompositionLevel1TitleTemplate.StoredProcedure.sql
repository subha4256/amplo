USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionLevel1TitleTemplate]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionLevel1TitleTemplate]
    @ProcessLevel1ID [int],
    @ProcessLevel1Title nvarchar(512)
AS
BEGIN
    SET NOCOUNT ON; 

    BEGIN TRY
        BEGIN TRANSACTION;
        UPDATE [Amplo].AmploDecompositionProcessLevel1Template
        SET  ProcessLevel1Name = @ProcessLevel1Title,  ProceeLevel1Title = @ProcessLevel1Title
        WHERE AmploDecompositionProcessLevel1TemplateID = @ProcessLevel1ID 

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
