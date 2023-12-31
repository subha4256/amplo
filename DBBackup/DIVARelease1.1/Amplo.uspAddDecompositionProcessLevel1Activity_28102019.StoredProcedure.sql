USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddDecompositionProcessLevel1Activity_28102019]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 16-October-2019
-- Description:	This procedure addes activity details in activity bank
-- =============================================
CREATE PROCEDURE [Amplo].[uspAddDecompositionProcessLevel1Activity_28102019]
	-- Add the parameters for the stored procedure here
           @UserID [int],
           @DecompositionProjectID [int],
           @ProcessLevel1Title [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
	Declare @DecompositionProcessLevel1ID int
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here
	INSERT INTO [Amplo].[DecompositionProcessLevel1]
			([ClientID]
			,[UserID]
			,[DecompositionProjectID]
			,[ProcessLevel1Name]
			,[ProcessLevel1Title]
			,[GridViewLocationID]
			,[GridVViewLocationFlag]
			,[ActiveFlag]
			)
		 VALUES
			(@clientid
			,@UserID
			,@DecompositionProjectID
			,'Non Seeded ProcessLevel1 Name'
			,@ProcessLevel1Title
			,-1
			,0
			,1
			)
	
	SELECT @DecompositionProcessLevel1ID = SCOPE_IDENTITY();
	SELECT @DecompositionProcessLevel1ID AS ProcessLevel1ID;
    SELECT messageName from Amplo.[Message] where MessageID = 1028

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
