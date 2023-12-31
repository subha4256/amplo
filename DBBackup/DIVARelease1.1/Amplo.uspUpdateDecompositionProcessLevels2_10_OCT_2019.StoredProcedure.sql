USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2_10_OCT_2019]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 04-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2_10_OCT_2019]
	-- Add the parameters for the stored procedure here
       @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [float]
       ,@ProcessLevel2Title [varchar](100)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@DecompositionProcessLevel2ID [int] OUTPUT

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;
	DECLARE @PDecompositionProcessLevel2ID INT

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(@DecompositionProcessLevel2ID) from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID

	if @RecordExists > 0

		BEGIN
			UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
	
			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID;

			SET @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].[DecompositionProcessLevel2]
			(
			   [DecompositionProjectID]
			  ,[DecompositionProcessLevel1ID]
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[Owner]
			  ,[CountrySpecific]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  ,[CreatedBy]
			  ,[CreatedDate]
			  )
			  values
			(
				 @DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
				, 1
				,@UserID
				,GETDATE()
			);

			SET @DecompositionProcessLevel2ID = SCOPE_IDENTITY();  
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
