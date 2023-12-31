USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddDecompositionProcessLevel1Activity]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspAddDecompositionProcessLevel1Activity]
	-- Add the parameters for the stored procedure here
           @UserID [int],
           @DecompositionProjectID [int],
           @ProcessLevel1Title [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
	Declare @DecompositionProcessLevel1ID int
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here
	INSERT INTO [Amplo].[DecompositionProcessLevel1]
			([ClientID]
			,[UserID]
			,[DecompositionProjectID]
			,[FunctionID]
			,[PhaseID]
			,[ProcessLevel1Name]
			,[ProcessLevel1Title]
			,[GridViewLocationID]
			,[GridVViewLocationFlag]
			,[ActiveFlag]
			, [Status]
			)
		 VALUES
			(@clientid
			,@UserID
			,@DecompositionProjectID
			,0
			,0
			,'Activity Bank'
			,@ProcessLevel1Title
			,-1
			,0
			,1
			,1
			)
	
	SELECT @DecompositionProcessLevel1ID = SCOPE_IDENTITY();
	SELECT @DecompositionProcessLevel1ID AS ProcessLevel1ID;

	--added by Srinivas on 27th October 2019

	INSERT INTO [Amplo].[DecompositionProcessLevel1Score]
           ([DecompositionProcessLevel1ID]
           ,[LeafNodeLevelID]
           ,[Level1_Calc_Aggr_Score]
           ,[Avg_Score_Weight]
           ,[LeafNodeFlag]
           ,[Owner]
           )
		   VALUES
		   (@DecompositionProcessLevel1ID
           ,1.1
           ,0.00
           ,2
           ,1
           ,NULL
           )


	INSERT INTO [Amplo].[DecompositionScoreCriteriaProject]
           ([ServiceID]
           ,[ClientID]
           ,[DecompositionProjectID]
           ,[DecompositionProcessLevel1ID]
           ,[ScoreCriteriaName]
           ,[ScoreCriteriaActualName]
           ,[ScoreCriteriaTitle]
           ,[ScoreCriteriaDescription]
           ,[SeededFlag]
           ,[UsedFlag])
     select ServiceID
			, @clientid
			, @DecompositionProjectID
			, @DecompositionProcessLevel1ID
			, ScoreCriteriaName
			, ScoreCriteriaActualName
			, ScoreCriteriaTitle
			, ScoreCriteriaDescription
			, SeededFlag
			, UsedFlag from [Amplo].[DecompositionScoreCriteria]

    SELECT messageName from Amplo.[Message] where MessageID = 1028

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
