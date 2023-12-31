USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddNewCapabilityModellingProject2]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspAddNewCapabilityModellingProject2]
 (
    @id int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@CapabilityProjectName - Name of new set
@userids - comma separated string of userids to map to set
@disableDate - Date for disable of client project
*/
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
    --AND DisableDate > GETDATE()
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
      -- [DecompositionProjectUserName]
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
    --  ,[ProductionFlag]
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
---------------------------Adding mapping of phases and functions to project level and user level -----------------------

-- For inserting project level mapping of functions
    declare @functionNetMap TABLE(
       functionID int 
    )

    insert into @functionNetMap
    select DecompositionFunctionID from Amplo.DecompositionFunction where ActiveFlag = 1
    --Insert filters for industry after MVP1


--Insert project mapping with function
    insert into [Amplo].[DecompositionFunctionProject]
     ([DecompositionProjectID]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[FunctionName]
      ,[FunctionDescription]
      ,[FunctionMeaning]
      ,[ProcesDeisgnChoice]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[UserID])

    select
    @createdProjectID,
    @industryid,
    @industryverticalid,
    @industrysubverticalid,
    template.FunctionName,
    template.FunctionDescription,
    template.FunctionMeaning,
    template.ProcesDeisgnChoice,
    1,
    @id,
    GETDATE(),
    NULL

    from @functionNetMap map
    inner join Amplo.DecompositionFunction template
    on map.functionID = template.DecompositionFunctionID


-- For inserting project level mapping of phases
    declare @phaseNetMap TABLE(
       phaseID int
    )

    insert into @phaseNetMap
    select DecompositionPhaseID from 
    Amplo.DecompositionPhase 
    where ActiveFlag = 1
    --Industry filters to be applied after MVP1

--Insert project mapping with phase
    insert into [Amplo].[DecompositionPhaseProject]
     ([UserID]
      ,[DecompositionProjectID]
      ,[PhaseName]
      ,[PhaseDescription]
      ,[PhaseMeaning]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
    )
    select
    NULL,
    @createdProjectID,
    PhaseName,
    PhaseDescription,
    PhaseMeaning,
    1,
    @id,
    GETDATE(),
    @industryid,
    @industryverticalid,
    @industrysubverticalid
    from 
    (select phaseID from @phaseNetMap) map
    inner join (Select PhaseName, PhaseDescription,PhaseMeaning, DecompositionPhaseID from Amplo.DecompositionPhase) template
    on map.[phaseID] = template.DecompositionPhaseID




--For mapping users with access
    declare  @phaseFunctionUserMap Table(
       userid int,
       functionID int,
       phaseID int
   ) 

    insert into @phaseFunctionUserMap
    SELECT usr.userIDs, fn.functionID, ph.phaseID
    from (select userIDs from @ValidUserIDs) usr
    cross join @functionNetMap fn
    cross join @phaseNetMap ph

-- Insert User mapping to phases and functions
    INSERT INTO Amplo.[DecompositionUserAccess](
       [UserAccessName]
      ,[UserAccessDescription]
      ,[ClientID]
      ,[UserID]
      ,[DecompositionProjectID]
      ,[FunctionID]
      ,[PhaseID]
      ,[ActiveFlag]
      ,[CreadedBy]
      ,[CreatedDate]
    )
    Select
        NULL,
        NULL,
        @clientid,
        userid,
        @createdProjectID,
        functionID,
        phaseID,
        1,
        @id,
        GETDATE()
    from @phaseFunctionUserMap



------------------Replicating all default L1 activities from master template to project specific L1s------------------------------


    Insert into Amplo.DecompositionProcessLevel1(
       [ClientID]
      ,[DecompositionProjectID]
      ,[ProcessLevel1Name]
      ,[ActiveFlag]
      ,[LockedFlag]
      ,[Status]
      ,[DesignChoice]
     -- ,[LockedBy]
     -- ,[LockedDateTime]
    --  ,[UserID]
      ,[GridViewLocationID]
      ,[GridVViewLocationFlag]
    --  ,[GridViewPreviousLocationID]
      ,[FunctionID]
      ,[PhaseID]
    )
    select 
    @clientid,
    @createdProjectID,
    l1Main.Level1ActivityName,
    1,
    0,
    NULL,--Insert status here
    l1Main.Level1ActivityDeisgnChoice,
    l1Main.GridViewLocationID,
    l1Main.GridVViewLocationFlag,
    l1Main.DecompositionFunctionID,
    l1Main.DecompositionPhaseID

    from (Select Level1ActivityName, Level1ActivityDeisgnChoice, GridViewLocationID, GridVViewLocationFlag, DecompositionFunctionID, DecompositionPhaseID from Amplo.DecompositionLevel1Activity where ActiveFlag = 1) l1Main
    inner join @functionNetMap fn on fn.functionID = l1Main.DecompositionFunctionID
    inner JOIN @phaseNetMap ph on ph.phaseID = l1Main.DecompositionPhaseID 


    -- Successfull addition of new capability modelling project
    SELECT messageName from Amplo.[Message] where MessageID = 1019

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END























GO
