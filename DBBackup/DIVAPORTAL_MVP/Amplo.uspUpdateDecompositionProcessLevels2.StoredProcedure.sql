USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2]
	-- Add the parameters for the stored procedure here
       @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [varchar](50)
       ,@ProcessLevel2Title [varchar](100)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@DecompositionProcessLevel2ID [int] OUTPUT
	   , @Action nvarchar(10)
	   , @DecompositionProcessLevel2IDInput [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	DECLARE @PDecompositionProcessLevel2ID INT

    BEGIN TRY
--        BEGIN TRANSACTION;

	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(@DecompositionProcessLevel2ID) from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID 
	AND DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID

	if(@Action = 'add')
	begin
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
	
			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 
			where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID 
			AND ProcessLevel2NodeId = @Processlevel2NodeID;

			SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

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

			SELECT @DecompositionProcessLevel2ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			--Update Status as Inprogress
			update Amplo.DecompositionProcessLevel1
			set status = 2 where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID;

		END
	end
	else if(@Action = 'update')
	begin
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
	
			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId
 = @Processlevel2NodeID;

			SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

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

			SELECT @DecompositionProcessLevel2ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			--Update Status as Inprogress
			update Amplo.DecompositionProcessLevel1
			set status = 2 where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID;

		END
	end
	else if(@Action = 'delete')
	begin
		UPDATE Amplo.DecompositionProcessLevel2 SET  
			   ActiveFlag = 0
			  ,ModifiedBy = @UserID
			  ,[ModifiedDate] = GETDATE()
			WHERE DecompositionProcessLevel2ID = @DecompositionProcessLevel2IDInput
	
			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId
 = @Processlevel2NodeID;

			SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			RETURN
	end
	
		RETURN @DecompositionProcessLevel2ID;
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
