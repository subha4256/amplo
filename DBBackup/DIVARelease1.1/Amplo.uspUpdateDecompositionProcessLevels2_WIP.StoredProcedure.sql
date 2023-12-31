USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2_WIP]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 11-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2_WIP]
	-- Add the parameters for the stored procedure here
        @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [varchar](100)
       ,@ProcessLevel2Title [varchar](50)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@Action [varchar](30)
	   ,@DecompositionProcessLevel2ID [int]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	DECLARE @PDecompositionProcessLevel2ID INT
	DECLARE @StatusLookupID [int]

    BEGIN TRY
--        BEGIN TRANSACTION;
	
	SELECT UPPER(@Action)
	IF UPPER(@Action) = N'MODIFY'

		BEGIN
	
			SELECT N'MODIFY'

		UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
	
--			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID;

	--		SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

		END

	ELSE IF UPPER(@Action) = N'ADD'

		BEGIN

		SELECT N'ÁDD'

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

			SELECT @PDecompositionProcessLevel2ID = SCOPE_IDENTITY() 
			SELECT @PDecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			select @StatusLookupID = StatusLookupID from Amplo.StatusLookup where Lookupcode='DECOMP_INPROGRESS';
			update Amplo.DecompositionProcessLevel1 set Status  = @StatusLookupID where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID  = @DecompositionProcessLevel1ID;

			END


	ELSE IF UPPER(@Action) = N'DELETE'

		BEGIN

		SELECT N'DELETE'

			UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ActiveFlag] = 0	
			  ,[ModifiedBy] = @UserID
			  ,[ModifiedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
	
--			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID;

	--		SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			select @StatusLookupID = StatusLookupID from Amplo.StatusLookup where Lookupcode='DECOMP_NEW';
			update Amplo.DecompositionProcessLevel1 set Status  = @StatusLookupID where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID  = @DecompositionProcessLevel1ID;

		END

--		RETURN @DecompositionProcessLevel2ID;
  --      COMMIT TRANSACTION;
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
