USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateCapabilityModellingClientProject]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateCapabilityModellingClientProject]
 (
    @id int,
    @CapabilityProjectID int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@CapabilityProjectID - ID of project to update
@CapabilityProjectName - Name of Capability Project to be set to
@userids - comma separated string of userids to map to set
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
    
    DECLARE @ReceivedUserIDs TABLE (
    userIDs int
    );

    --Filter out received  users who are valid approved members of client company 
    INSERT INTO @ReceivedUserIDs
    SELECT * 
    FROM String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @ReceivedUserIDs a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    --AND DisableDate > GETDATE()
    ) b
    on a.userids = b.UserID

   declare @ifNameReturnedNullRetainName varchar(100)
   select @ifNameReturnedNullRetainName = ProjectName from Amplo.DecompositionProject where DecompositionProjectID = @CapabilityProjectID

   --Change Name of  Capability Modelling Project
    Update Amplo.DecompositionProject
    set ProjectName = ISNULL(@CapabilityProjectName, @ifNameReturnedNullRetainName), ModifiedBy = @id, ModifiedDate = GETDATE() WHERE DecompositionProjectID = @CapabilityProjectID

    --List of users mapped to selected project
    DECLARE @MappedUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @MappedUserIDs
    SELECT UserID
    FROM [Amplo].[DecompositionProjectUser] where DecompositionProjectID = @CapabilityProjectID and ActiveFlag = 1

    DECLARE @ToRemoveUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ToRemoveUserIDs
    SELECT  toRem.userIDs 
    FROM    @MappedUserIDs toRem LEFT JOIN @ValidUserIDs new 
    ON new.userIDs = toRem.userIDs
    WHERE new.userIDs IS NULL

    DECLARE @ToAddUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ToAddUserIDs
    SELECT  new.userIDs 
    FROM    @MappedUserIDs toRem Right JOIN @ValidUserIDs new 
    ON new.userIDs = toRem.userIDs
    WHERE toRem.userIDs IS NULL

    --Remove User access to Capability Modelling Project
    Update Amplo.DecompositionProjectUser
    SET ActiveFlag = 0, ModifiedBy= @id, ModifiedDate = GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) and DecompositionProjectID = @CapabilityProjectID


    --Remove Phase and function for the user for the project
    --TO Be added when the mapping is discussed and finalized
/*
    Update Amplo.UserDomainAccess
    SET ActiveFlag = 0, ModifiedBy = @id, ModifiedDate= GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) AND BenchmarkProjectID = @assessmentsetid 
*/

    --Map new users to Capability Modelling Project 
-- 1 taken as default for activity Flag . To be modified when requirements finalized

    INSERT INTO Amplo.DecompositionProjectUser(
    --   [DecompositionProjectUserName]
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
    --  ,[ProductionFlag]
      ,[CreatedBy]
      ,[CreatedDate]
    --  ,[ModifiedBy]
    --  ,[ModifiedDate]
      ,[ActivityFlag]
    )
    SELECT 
        @CapabilityProjectID,
        @clientID,
        userIDs,
        1,
        @id,
        GETDATE(),
        1
    from @ToAddUserIDs

   -- Add Phase and function for the user for the project
    --TO Be added when the mapping is discussed and finalized
/*
    declare  @domainMap Table(
       userid int,
       domainid int
   ) 

    insert into @domainMap
    select b.userids, a.domainID
    from (select DomainID from Amplo.AmploDomain where ActiveFlag=1) a  
    cross join @ToAddUserIDs b

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
        @assessmentsetid
    from @domainMap
*/
    Select messageName from Amplo.[Message] where MessageID = 1020

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
