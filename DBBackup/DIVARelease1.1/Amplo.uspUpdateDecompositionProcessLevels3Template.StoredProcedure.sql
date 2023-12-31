USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels3Template]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels3Template]
       @DecompositionProcessLevel2ID [int]
       ,@ProcessLevel3NodeID [varchar](50)
       ,@ProcessLevel3Title [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@DecompositionProcessLevel3ID [int] OUTPUT
	   , @Action nvarchar(10)
	   , @DecompositionProcessLevel3IDInput [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	DECLARE @PDecompositionProcessLevel3ID INT

    BEGIN TRY
--        BEGIN TRANSACTION;

	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(DecompositionProcessLevel3TemplateID) from Amplo.AmploDecompositionProcessLevel3Template where DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
	AND ProcessLevel3NodeId = @ProcessLevel3NodeID and ActiveFlag = 1

	if(@Action = 'add')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel3Template SET  
			   [ProcessLevel3Title] = @ProcessLevel3Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
			  AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID
	
			select @PDecompositionProcessLevel3ID = DecompositionProcessLevel3TemplateID 
			from Amplo.AmploDecompositionProcessLevel3Template where DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
			AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID

			SELECT @DecompositionProcessLevel3ID = @PDecompositionProcessLevel3ID
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel3Template
			(
			  DecompositionProcessLevel3TemplateID
			  ,[ProcessLevel3NodeID]
			  ,[ProcessLevel3Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				@DecompositionProcessLevel2ID
				,@ProcessLevel3NodeID
				,@ProcessLevel3Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel3ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID
		END
	end
	else if(@Action = 'update')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel3Template SET  
			   [ProcessLevel3Title] = @ProcessLevel3Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
			  AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID
	
			select @PDecompositionProcessLevel3ID = DecompositionProcessLevel3TemplateID 
			from Amplo.AmploDecompositionProcessLevel3Template where DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
			AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID

	
			select @PDecompositionProcessLevel3ID = DecompositionProcessLevel3TemplateID 
			from Amplo.AmploDecompositionProcessLevel3Template where DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
			AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID
 
			SELECT @DecompositionProcessLevel3ID = @PDecompositionProcessLevel3ID
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

			RETURN
		END

		ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel3Template
			(
			   DecompositionProcessLevel3TemplateID
			  ,[ProcessLevel3NodeID]
			  ,[ProcessLevel3Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				 @DecompositionProcessLevel2ID
				,@ProcessLevel3NodeID
				,@ProcessLevel3Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel3ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID
		END
	end
	else if(@Action = 'delete')
	begin
		UPDATE Amplo.AmploDecompositionProcessLevel3Template SET ActiveFlag = 0
			WHERE DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3IDInput
	
			select @PDecompositionProcessLevel3ID = DecompositionProcessLevel3TemplateID 
			from Amplo.AmploDecompositionProcessLevel3Template where DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
			AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID

			SELECT @DecompositionProcessLevel3ID = @PDecompositionProcessLevel3ID
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

			RETURN
	end
	
		RETURN @DecompositionProcessLevel3ID;
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
