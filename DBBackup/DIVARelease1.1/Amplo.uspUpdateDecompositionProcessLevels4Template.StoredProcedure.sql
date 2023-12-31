USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels4Template]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels4Template]
       @DecompositionProcessLevel3ID [int]
       ,@ProcessLevel4NodeID [varchar](50)
       ,@ProcessLevel4Title [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@DecompositionProcessLevel4ID [int] OUTPUT
	   , @Action nvarchar(10)
	   , @DecompositionProcessLevel4IDInput [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	DECLARE @PDecompositionProcessLevel4ID INT

    BEGIN TRY
--        BEGIN TRANSACTION;

	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(DecompositionProcessLevel4TemplateID) from Amplo.AmploDecompositionProcessLevel4Template where DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
	AND ProcessLevel4NodeId = @ProcessLevel4NodeID and ActiveFlag = 1

	if(@Action = 'add')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel4Template SET  
			   [ProcessLevel4Title] = @ProcessLevel4Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
			  AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID
	
			select @PDecompositionProcessLevel4ID = DecompositionProcessLevel4TemplateID 
			from Amplo.AmploDecompositionProcessLevel4Template where DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
			AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID

			SELECT @DecompositionProcessLevel4ID = @PDecompositionProcessLevel4ID
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel4Template
			(
			  DecompositionProcessLevel4TemplateID
			  ,[ProcessLevel4NodeID]
			  ,[ProcessLevel4Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				@DecompositionProcessLevel3ID
				,@ProcessLevel4NodeID
				,@ProcessLevel4Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel4ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID
		END
	end
	else if(@Action = 'update')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel4Template SET  
			   [ProcessLevel4Title] = @ProcessLevel4Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
			  AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID
	
			select @PDecompositionProcessLevel4ID = DecompositionProcessLevel4TemplateID 
			from Amplo.AmploDecompositionProcessLevel4Template where DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
			AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID

	
			select @PDecompositionProcessLevel4ID = DecompositionProcessLevel4TemplateID 
			from Amplo.AmploDecompositionProcessLevel4Template where DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
			AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID
 
			SELECT @DecompositionProcessLevel4ID = @PDecompositionProcessLevel4ID
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

			RETURN
		END

		ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel4Template
			(
			   DecompositionProcessLevel4TemplateID
			  ,[ProcessLevel4NodeID]
			  ,[ProcessLevel4Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				 @DecompositionProcessLevel3ID
				,@ProcessLevel4NodeID
				,@ProcessLevel4Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel4ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID
		END
	end
	else if(@Action = 'delete')
	begin
		UPDATE Amplo.AmploDecompositionProcessLevel4Template SET ActiveFlag = 0
			WHERE DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4IDInput
	
			select @PDecompositionProcessLevel4ID = DecompositionProcessLevel4TemplateID 
			from Amplo.AmploDecompositionProcessLevel4Template where DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
			AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID

			SELECT @DecompositionProcessLevel4ID = @PDecompositionProcessLevel4ID
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

			RETURN
	end
	
		RETURN @DecompositionProcessLevel4ID;
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
