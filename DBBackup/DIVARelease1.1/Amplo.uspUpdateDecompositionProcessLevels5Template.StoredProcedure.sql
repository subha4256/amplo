USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels5Template]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels5Template]
       @DecompositionProcessLevel4ID [int]
       ,@ProcessLevel5NodeID [varchar](50)
       ,@ProcessLevel5Title [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@DecompositionProcessLevel5ID [int] OUTPUT
	   , @Action nvarchar(10)
	   , @DecompositionProcessLevel5IDInput [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	DECLARE @PDecompositionProcessLevel5ID INT

    BEGIN TRY
--        BEGIN TRANSACTION;

	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(DecompositionProcessLevel5TemplateID) from Amplo.AmploDecompositionProcessLevel5Template where DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
	AND ProcessLevel5NodeId = @ProcessLevel5NodeID and ActiveFlag = 1

	if(@Action = 'add')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel5Template SET  
			   [ProcessLevel5Title] = @ProcessLevel5Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
			  AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID
	
			select @PDecompositionProcessLevel5ID = DecompositionProcessLevel5TemplateID 
			from Amplo.AmploDecompositionProcessLevel5Template where DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
			AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID

			SELECT @DecompositionProcessLevel5ID = @PDecompositionProcessLevel5ID
			SELECT @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel5Template
			(
			  DecompositionProcessLevel5TemplateID
			  ,[ProcessLevel5NodeID]
			  ,[ProcessLevel5Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				@DecompositionProcessLevel4ID
				,@ProcessLevel5NodeID
				,@ProcessLevel5Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel5ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID
		END
	end
	else if(@Action = 'update')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel5Template SET  
			   [ProcessLevel5Title] = @ProcessLevel5Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
			  AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID
	
			select @PDecompositionProcessLevel5ID = DecompositionProcessLevel5TemplateID 
			from Amplo.AmploDecompositionProcessLevel5Template where DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
			AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID

	
			select @PDecompositionProcessLevel5ID = DecompositionProcessLevel5TemplateID 
			from Amplo.AmploDecompositionProcessLevel5Template where DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
			AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID
 
			SELECT @DecompositionProcessLevel5ID = @PDecompositionProcessLevel5ID
			SELECT @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID

			RETURN
		END

		ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel5Template
			(
			   DecompositionProcessLevel5TemplateID
			  ,[ProcessLevel5NodeID]
			  ,[ProcessLevel5Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				 @DecompositionProcessLevel4ID
				,@ProcessLevel5NodeID
				,@ProcessLevel5Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel5ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID
		END
	end
	else if(@Action = 'delete')
	begin
		UPDATE Amplo.AmploDecompositionProcessLevel5Template SET ActiveFlag = 0
			WHERE DecompositionProcessLevel5TemplateID = @DecompositionProcessLevel5IDInput
	
			select @PDecompositionProcessLevel5ID = DecompositionProcessLevel5TemplateID 
			from Amplo.AmploDecompositionProcessLevel5Template where DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
			AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID

			SELECT @DecompositionProcessLevel5ID = @PDecompositionProcessLevel5ID
			SELECT @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID

			RETURN
	end
	
		RETURN @DecompositionProcessLevel5ID;
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
