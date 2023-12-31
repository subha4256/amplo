USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddNewCapabilityModellingProject]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspAddNewCapabilityModellingProject]
 (
    @id int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    DECLARE @Target_Table TABLE (
    userIDs int
    );

    INSERT INTO @Target_Table
    SELECT * 
    FROM  String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @Target_Table a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    ) b
    on a.userids = b.UserID

    --Create New Capability Modelling project
    insert into Amplo.[DecompositionProject](
       [ProjectName]
      ,[ProjectDescription]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ClientID]
      ,[StatusID]
    )
    VALUES(
        @CapabilityProjectName,
        NULL,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
        1, 
        @id,
        GETDATE(),
        @clientid,
        1
    )

    declare @createdProjectID INT

    SELECT @createdProjectID = SCOPE_IDENTITY();

    --Add users to Capability Modelling project
    INSERT INTO Amplo.DecompositionProjectUser(
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ActivityFlag]
    )
    SELECT 
        @createdProjectID,
        @clientid,
        userIDs,
        1,
      --  1,
        @id,
        GETDATE(),
        1
    from @ValidUserIDs
	
	--------- Insert level 1 template data start -----------
	Insert into Amplo.DecompositionProcessLevel1(
       [ClientID]
      ,[DecompositionProjectID]
      ,[ProcessLevel1Name]
	  ,[ProcessLevel1Title]
      ,[ActiveFlag]
      ,[LockedFlag]
      ,[Status]
      ,[DesignChoice]
      ,[UserID]
      ,[GridViewLocationID]
      ,[GridVViewLocationFlag]
      ,[FunctionID]
      ,[PhaseID]
    )
    select 
    @clientid,
    @createdProjectID,
    l1Main.ProcessLevel1Name,
	l1Main.ProceeLevel1Title,
    1,
    0,
    1,--Insert status here
    l1Main.DesignChoice,
	@id,
    l1Main.GridViewLocationID,
    l1Main.GridVViewLocationFlag,
    l1Main.DecompositionFunctionID,
    l1Main.DecompositionPhaseID
	from Amplo.AmploDecompositionProcessLevel1 l1Main where ActiveFlag = 1 and CreatedBy = 'SYSADMIN-BISWAJIT'
    

	INSERT INTO [Amplo].[DecompositionProcessLevel1Score]
           ([DecompositionProcessLevel1ID]
           ,[LeafNodeLevelID]
           ,[Level1_Calc_Aggr_Score]
           ,[Avg_Score_Weight]
           ,[LeafNodeFlag]
           ,[Owner]
           )
		   select DecompositionProcessLevel1Id
           ,1.1
           ,0.0
           ,2
           ,0
           ,NULL
           from Amplo.DecompositionProcessLevel1 where DecompositionProjectID = @createdProjectID



		INSERT INTO [Amplo].[DecompositionFunctionProject]
           ([ClientID]
           ,[UserID]
           ,[DecompositionProjectID]
           ,[IndustryID]
           ,[IndustryVerticalID]
           ,[IndustrySubVerticalID]
           ,[FunctionName]
           ,[FunctionTitle]
           ,[FunctionDescription]
           ,[FunctionMeaning]
           ,[ProcesDeisgnChoice]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ModifiedBy]
           ,[ModifiedDate]
		   ,[FunctionNumber])
     select @ClientId
           ,@Id
           ,@createdProjectID
           ,[IndustryID]
           ,[IndustryVerticalID]
           ,[IndustrySubVerticalID]
           ,[FunctionName]
           ,FunctionTilte
           ,[FunctionDescription]
           ,[FunctionMeaning]
           ,[ProcesDeisgnChoice]
           ,1
           ,@Id
           ,GETDATE()
           ,NULL
           ,NULL
		   ,[FunctionNumber] from [Amplo].[DecompositionFunction]


		INSERT INTO [Amplo].[DecompositionPhaseProject]
           ([ClientID]
           ,[UserID]
           ,[DecompositionProjectID]
           ,[PhaseName]
           ,[PhaseTitle]
           ,[PhaseDescription]
           ,[PhaseMeaning]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ModifiedBy]
           ,[ModifiedDate]
		   ,[PhaseNumber])
     select @ClientId
           ,@Id
           ,@createdProjectID
           ,[PhaseName]
           ,[PhaseTitle]
           ,[PhaseDescription]
           ,[PhaseMeaning]
           ,1
           ,@Id
           ,GETDATE()
           ,NULL
           ,NULL
		   ,[PhaseNumber] from [Amplo].[DecompositionPhase]
           

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
			, @ClientId
			, @createdProjectID
			, dp.DecompositionProcessLevel1ID
			, ScoreCriteriaName
			, ScoreCriteriaActualName
			, ScoreCriteriaTitle
			, ScoreCriteriaDescription
			, SeededFlag
			, UsedFlag from [Amplo].[DecompositionScoreCriteria]
	join [Amplo].[DecompositionProcessLevel1] dp on (dp.[DecompositionProjectID] = @createdProjectID)
    -- Succe[])ssfull addition of new benchmark project
    SELECT messageName from Amplo.[Message] where MessageID = 1019

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
