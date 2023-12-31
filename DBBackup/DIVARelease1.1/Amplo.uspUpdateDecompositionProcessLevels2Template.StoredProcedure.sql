USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2Template]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2Template]
       @DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [varchar](50)
       ,@ProcessLevel2Title [varchar](100)
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

	select  @RecordExists = COUNT(DecompositionProcessLevel2TemplateID) from Amplo.AmploDecompositionProcessLevel2Template where DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID
	AND ProcessLevel2NodeId = @Processlevel2NodeID and ActiveFlag = 1

	if(@Action = 'add')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel2Template SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID
			  AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
	
			select @PDecompositionProcessLevel2ID = DecompositionProcessLevel2TemplateID 
			from Amplo.AmploDecompositionProcessLevel2Template where DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID
			AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID

			SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel2Template
			(
			  DecompositionProcessLevel2TemplateID
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel2ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID
		END
	end
	else if(@Action = 'update')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel2Template SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID
			  AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
	
			select @PDecompositionProcessLevel2ID = DecompositionProcessLevel2TemplateID 
			from Amplo.AmploDecompositionProcessLevel2Template where DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID
			AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID

	
			select @PDecompositionProcessLevel2ID = DecompositionProcessLevel2TemplateID 
			from Amplo.AmploDecompositionProcessLevel2Template where DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID
			AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
 
			SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			RETURN
		END

		ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel2Template
			(
			   DecompositionProcessLevel2TemplateID
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				 @DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel2ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID
		END
	end
	else if(@Action = 'delete')
	begin
		UPDATE Amplo.AmploDecompositionProcessLevel2Template SET ActiveFlag = 0
			WHERE DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2IDInput
	
			select @PDecompositionProcessLevel2ID = DecompositionProcessLevel2TemplateID 
			from Amplo.AmploDecompositionProcessLevel2Template where DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID
			AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID

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
