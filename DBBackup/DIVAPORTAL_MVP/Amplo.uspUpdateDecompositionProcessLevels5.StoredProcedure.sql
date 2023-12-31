USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels5]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels5]
	-- Add the parameters for the stored procedure here
          (
			    @UserID [int]	
			   ,@DecompositionProjectID [int]
			   ,@DecompositionProcessLevel1ID [int]
			   ,@DecompositionProcessLevel2ID [int]
			   ,@DecompositionProcessLevel3ID [int]
			   ,@DecompositionProcessLevel4ID [int]
			   ,@ProcessLevel5NodeID [varchar](50)
			   ,@ProcessLevel5Title [varchar](100)
			   ,@LeafNodeFlag [bit]
			   ,@Owner [varchar](100)
			   ,@CountrySpecific [varchar](100)
--			   ,@DisableDate [date]
--			   ,@ActiveFlag [bit]
			   ,@DecompositionProcessLevel5ID [int] OUTPUT
			   , @Action nvarchar(10)
			   , @DecompositionProcessLevel5IDInput [int]
		)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;

    BEGIN TRY
--        BEGIN TRANSACTION;
	
			DECLARE @RecordExists [int]
			DECLARE @PDecompositionProcessLevel5ID int
			select  @RecordExists = count(ProcessLevel5NodeID) from Amplo.DecompositionProcessLevel5 where DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID 
			AND DecompositionProcessLevel2ID =  @DecompositionProcessLevel2ID AND DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID AND DecompositionProcessLevel4ID =  @DecompositionProcessLevel4ID

	if @Action = 'update'
	BEGIN
		UPDATE [Amplo].[DecompositionProcessLevel5]
		   SET 
--				[ProcessLevel5Name] = @ProcessLevel5Name
			   [ProcessLevel5Title] = @ProcessLevel5Title
--			  ,[ProcessLevel5Description] = @ProcessLevel5Description
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
--			  ,[DisableDate] = @DisableDate
			  ,[ActiveFlag] = 1
			  ,[ModifiedBy] = @UserID
			  ,[ModifiedDate] = GETDATE()
		 WHERE [DecompositionProjectID] = @DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			  AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			  AND [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
			  AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID
		select @PDecompositionProcessLevel5ID=DecompositionProcessLevel5ID from Amplo.DecompositionProcessLevel5 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel5NodeId 
= @Processlevel5NodeID;
		SET @DecompositionProcessLevel5ID = @PDecompositionProcessLevel5ID
		select @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID
		RETURN
	END

 else if @Action = 'add'
	begin
	 INSERT INTO [Amplo].[DecompositionProcessLevel5]
			   ([DecompositionProjectID]
			   ,[DecompositionProcessLevel1ID]
			   ,[DecompositionProcessLevel2ID]
			   ,[DecompositionProcessLevel3ID]
			   ,[DecompositionProcessLevel4ID]
			   ,[ProcessLevel5NodeID]
--			   ,[ProcessLevel5Name]
			   ,[ProcessLevel5Title]
--			   ,[ProcessLevel5Description]
			   ,[LeafNodeFlag]
			   ,[Owner]
			   ,[CountrySpecific]
--			   ,[DisableDate]
			   ,[ActiveFlag]
			   ,[CreatedBy]
			   ,[CreatedDate]
				)
		 VALUES
			   (@DecompositionProjectID
			   ,@DecompositionProcessLevel1ID
			   ,@DecompositionProcessLevel2ID
			   ,@DecompositionProcessLevel3ID
			   ,@DecompositionProcessLevel4ID
			   ,@ProcessLevel5NodeID
--			   ,<ProcessLevel5Name, varchar(100),>
			   ,@ProcessLevel5Title
--			   ,<ProcessLevel5Description, varchar(512),>
			   ,@LeafNodeFlag
			   ,@Owner
			   ,@CountrySpecific
--			   ,@DisableDate
			   ,1
			   ,@UserID
			   ,GETDATE()
				)
		SET @DecompositionProcessLevel5ID = SCOPE_IDENTITY();  
		select @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID

		end
		else if @Action = 'delete'
	BEGIN
		UPDATE [Amplo].[DecompositionProcessLevel5]
		   SET 
			   [ActiveFlag] = 0
			  ,[ModifiedBy] = @UserID
			  ,[ModifiedDate] = GETDATE()
		 WHERE DecompositionProcessLevel5ID = @DecompositionProcessLevel5IDInput
		select @PDecompositionProcessLevel5ID=DecompositionProcessLevel5ID from Amplo.DecompositionProcessLevel5 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel5NodeId 
= @Processlevel5NodeID;
		SET @DecompositionProcessLevel5ID = @PDecompositionProcessLevel5ID
		select @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID
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
