USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddNewCapabilityModellingProject_28102019]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspAddNewCapabilityModellingProject_28102019]
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

	--------- Insert level 1 template data start -----------

/*
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
      ,[UserID]
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
	@id,
    l1Main.GridViewLocationID,
    l1Main.GridVViewLocationFlag,
    l1Main.DecompositionFunctionID,
    l1Main.DecompositionPhaseID

    from Amplo.DecompositionLevel1Activity l1Main where ActiveFlag = 1 
  */
  
  	Insert into Amplo.DecompositionProcessLevel1(
       [ClientID]
      ,[DecompositionProjectID]
      ,[ProcessLevel1Name]
	  ,[ProcessLevel1Title]
      ,[ActiveFlag]
      ,[LockedFlag]
      ,[Status]
      ,[DesignChoice]
     -- ,[LockedBy]
     -- ,[LockedDateTime]
      ,[UserID]
      ,[GridViewLocationID]
      ,[GridVViewLocationFlag]
    --  ,[GridViewPreviousLocationID]
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
	from Amplo.AmploDecompositionProcessLevel1 l1Main where ActiveFlag = 1 
    --from Amplo.DecompositionLevel1Activity l1Main where ActiveFlag = 1 

	--------- Insert level 1 template data end -----------

/*
   -- Add Phase and Function mapping when project is added

   declare  @domainMap Table(
       userid int,
       domainid int
   ) 

    insert into @domainMap
    select b.userids, a.domainID
    from (select DomainID from Amplo.AmploDomain where ActiveFlag=1) a  
    cross join @ValidUserIDs b

    -- Access Type - 1- Read+Write, 2 - Read Only, 3- No Access
    INSERT INTO Amplo.[UserDomainAccess](
       [ClientID]
      ,[UserID]
      ,[DomainID]
      ,[AccessType]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[BenchmarkProjectID]
    )
    Select
        @clientid,
        userid,
        domainid,
        1,
        1,
        @id,
        GETDATE(),
        @createdSetID
    from @domainMap
 */

    -- Successfull addition of new benchmark project
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
