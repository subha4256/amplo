USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels3]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels3]
	-- Add the parameters for the stored procedure here
          (
		    @DecompositionProjectID [int]
           ,@DecompositionProcessLevel1ID [int]
           ,@DecompositionProcessLevel2ID [int]
           ,@ProcessLevel3NodeID [varchar](50)
--          ,@ProcessLevel3Name [varchar](100)
           ,@ProcessLevel3Title [varchar](100)
           ,@Owner [varchar](100)
           ,@CountrySpecific [varchar](100)
           ,@LeafNodeFlag [bit]
--         ,@DisableDate [date]
           ,@UsreID [varchar](100)
		   ,@DecompositionProcessLevel3ID [int] OUTPUT
		   , @Action nvarchar(10)
		   ,@DecompositionProcessLevel3IDinput [int]
 		)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    BEGIN TRY
--        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]
	DECLARE @PDecompositionProcessLevel3ID [int]

	select  @RecordExists = count(ProcessLevel3NodeId) from Amplo.DecompositionProcessLevel3 where [DecompositionProjectID] = @DecompositionProjectID 
	AND DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND ProcessLevel3NodeId = @Processlevel3NodeID

	if @Action = 'update'
		BEGIN
		update Amplo.DecompositionProcessLevel3 set 
			[ProcessLevel3Title] = @ProcessLevel3Title
			,[Owner] = @Owner
			,[CountrySpecific] = @CountrySpecific
			,[LeafNodeFlag] = @LeafNodeFlag
--			,[DisableDate] = @DisableDate
			,[ActiveFlag] = 1
			,[ModifiedBy] = @UsreID
			,[ModifiedDate]= GETDATE()
			WHERE [DecompositionProjectID] = @DecompositionProjectID 
			AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID

			select @PDecompositionProcessLevel3ID=DecompositionProcessLevel3ID from Amplo.DecompositionProcessLevel3 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel3NodeId
 = @Processlevel3NodeID;

			SET @DecompositionProcessLevel3ID = @PDecompositionProcessLevel3ID
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

			RETURN
			END
	else if @Action = 'add'
	BEGIN
	INSERT INTO [Amplo].[DecompositionProcessLevel3]
			   ([DecompositionProjectID]
			   ,[DecompositionProcessLevel1ID]
			   ,[DecompositionProcessLevel2ID]
			   ,[ProcessLevel3NodeID]
--			   ,[ProcessLevel3Name]
			   ,[ProcessLevel3Title]
			   ,[Owner]
			   ,[CountrySpecific]
			   ,[LeafNodeFlag]
--			   ,[DisableDate]
			   ,[ActiveFlag]
			   ,[CreatedBy]
			   ,[CreatedDate])
     VALUES
           (
				@DecompositionProjectID
			   ,@DecompositionProcessLevel1ID
			   ,@DecompositionProcessLevel2ID
			   ,@ProcessLevel3NodeID
			   --,@ProcessLevel3Name
			   ,@ProcessLevel3Title
			   ,@Owner
			   ,@CountrySpecific
			   ,@LeafNodeFlag
--			   ,@DisableDate
			   ,1
			   ,@UsreID
			   ,GETDATE()
			)

	SET @DecompositionProcessLevel3ID = SCOPE_IDENTITY();  
	SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

	END
	else if @Action = 'delete'
		BEGIN
		update Amplo.DecompositionProcessLevel3 set 
			 [ActiveFlag] = 0
			,[ModifiedBy] = @UsreID
			,[ModifiedDate]= GETDATE()
			WHERE DecompositionProcessLevel3ID = @DecompositionProcessLevel3IDinput

			select @PDecompositionProcessLevel3ID=DecompositionProcessLevel3ID from Amplo.DecompositionProcessLevel3 where [DecompositionProjectID] = @DecompositionProjectID 
			AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel3NodeId = @Processlevel3NodeID;

			SET @DecompositionProcessLevel3ID = @PDecompositionProcessLevel3ID
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

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
