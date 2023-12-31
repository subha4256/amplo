USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2_Original]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 04-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2_Original]
	-- Add the parameters for the stored procedure here
       @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [int]
       ,@ProcessLevel2Title [varchar](100)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@CreatedBy [varchar](100)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = ProcessLevel2NodeId from Amplo.DecompositionProcessLevel2 where ProcessLevel2NodeId = @Processlevel2NodeID

	if @RecordExists > 0

	update Amplo.DecompositionProcessLevel2 set 
	
	   [DecompositionProjectID]=@DecompositionProjectID
      ,[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
      ,[ProcessLevel2NodeID] = @ProcessLevel2NodeID
      ,[ProcessLevel2Title] = @ProcessLevel2Title
      ,[Owner] = @Owner
      ,[CountrySpecific] = @CountrySpecific
      ,[LeafNodeFlag] = @LeafNodeFlag
      ,[CreatedBy] = @CreatedBy


	else
	insert into [Amplo].[DecompositionProcessLevel2]
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
		,@CreatedBy
		,GetDate()
	);

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
