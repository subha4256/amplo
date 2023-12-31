USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevel4]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevel4]
	-- Add the parameters for the stored procedure here
		 @UserID [int]
		,@DecompositionProjectID [int]
		,@DecompositionProcessLevel1ID [int]
		,@DecompositionProcessLevel2ID [int]
		,@DecompositionProcessLevel3ID [int]
		,@ProcessLevel4NodeID [varchar](50)
		,@ProcessLevel4Title [varchar](100)
		,@Owner [varchar](100)
		,@CountrySpecific [varchar](100)
		,@LeafNodeFlag [bit]
--		,@DisableDate [date]
		,@DecompositionProcessLevel4ID [int] OUTPUT
		, @Action nvarchar(10)
		,@DecompositionProcessLevel4IDInput [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;
	DECLARE @PDecompositionProcessLevel4ID int
    BEGIN TRY
        --BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = count(ProcessLevel4NodeId) from [Amplo].[DecompositionProcessLevel4] where DecompositionProjectID = @DecompositionProjectID AND  ProcessLevel4NodeId = @ProcessLevel4NodeID

	if @Action = 'update'
	 BEGIN
		UPDATE [Amplo].[DecompositionProcessLevel4]
		SET  [ProcessLevel4Title] = @ProcessLevel4Title
			,[Owner] = @Owner
			,[CountrySpecific] = @CountrySpecific
			,[LeafNodeFlag] = @LeafNodeFlag
--			,[DisableDate] = @DisableDate
			,[ActiveFlag] = 1
			,[ModifiedBy] = @UserID
			,[ModifiedDate] = GETDATE()
		WHERE DecompositionProjectID = @DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			  AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			  AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID

			select @PDecompositionProcessLevel4ID=DecompositionProcessLevel4ID from Amplo.DecompositionProcessLevel4 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel4NodeId
 = @Processlevel4NodeID;

			SET @DecompositionProcessLevel4ID = @PDecompositionProcessLevel4ID
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

			RETURN
	 END
	else if @Action = 'add'
		BEGIN
			INSERT INTO [Amplo].[DecompositionProcessLevel4]
				([DecompositionProjectID]
				,[DecompositionProcessLevel1ID]
				,[DecompositionProcessLevel2ID]
				,[DecompositionProcessLevel3ID]
				,[ProcessLevel4NodeID]
	--			,[ProcessLevel4Name]
				,[ProcessLevel4Title]
				,[Owner]
				,[CountrySpecific]
				,[LeafNodeFlag]
--				,[DisableDate]
				,[ActiveFlag]
				,[CreatedBy]
				,[CreatedDate]
				)
				VALUES
				(@DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@DecompositionProcessLevel2ID
				,@DecompositionProcessLevel3ID
				,@ProcessLevel4NodeID
	--			,@ProcessLevel4Name
				,@ProcessLevel4Title
	--			,@ProcessLevel4Description
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
--				,@DisableDate
				,1
				,@UserID
				,GETDATE()
				)
		SET @DecompositionProcessLevel4ID = SCOPE_IDENTITY();  
		SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

		END
		if @Action = 'delete'
	 BEGIN
		UPDATE [Amplo].[DecompositionProcessLevel4]
		SET  [ActiveFlag] = 0
			,[ModifiedBy] = @UserID
			,[ModifiedDate] = GETDATE()
		WHERE DecompositionProcessLevel4ID = @DecompositionProcessLevel4IDInput

			select @PDecompositionProcessLevel4ID=DecompositionProcessLevel4ID from Amplo.DecompositionProcessLevel4 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel4NodeId
 = @Processlevel4NodeID;

			SET @DecompositionProcessLevel4ID = @PDecompositionProcessLevel4ID
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

			RETURN
	 END
--        COMMIT TRANSACTION;
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
