USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateClientProject]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateClientProject]
 (
    @id int,
    @assessmentsetid int,
    @assessmentSetName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentsetid - ID of assessment to update
@assessmentSetName - Name of new set
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
   select @ifNameReturnedNullRetainName = BenchmarkProjectName from Amplo.BenchmarkProject where BenchmarkProjectID = @assessmentsetid

   --Change Name of Benchmark Project
    Update Amplo.BenchmarkProject
    set BenchmarkProjectName = ISNULL(@assessmentSetName, @ifNameReturnedNullRetainName), ModifiedBy = @id, ModifiedDate = GETDATE() WHERE BenchmarkProjectID = @assessmentsetid

    --List of users mapped to selected project
    DECLARE @MappedUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @MappedUserIDs
    SELECT UserID
    FROM [Amplo].[BenchmarkProjectUser] where BenchmarkProjectID = @assessmentsetid and ActiveFlag = 1

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

    --Remove User access to Benchmark Project
    Update Amplo.BenchmarkProjectUser
    SET ActiveFlag = 0, ModifiedBy= @id, ModifiedDate = GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) and BenchmarkProjectID = @assessmentsetid

    --Remove domain access for the user for the project
    Update Amplo.UserDomainAccess
    SET ActiveFlag = 0, ModifiedBy = @id, ModifiedDate= GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) AND BenchmarkProjectID = @assessmentsetid 


    --Map new users to Benchmark Project 
    INSERT INTO Amplo.BenchmarkProjectUser(
       [BenchmarkProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActivityFlag]
      ,[ActiveFlag]
     -- ,[DisableDate]
      ,[CreatedBy]
      ,[CreatedDate]
    )
    SELECT 
        @assessmentsetid,
        @clientID,
        userIDs,
        1,
        1,
        @id,
        GETDATE()
    from @ToAddUserIDs

   -- Add domain mapping for new users added
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

    Select messageName from Amplo.[Message] where MessageID = 1012

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
