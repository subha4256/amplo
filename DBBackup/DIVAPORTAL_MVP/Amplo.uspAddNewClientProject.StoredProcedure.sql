USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddNewClientProject]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspAddNewClientProject]
 (
    @id int,
    @assessmentSetName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
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

    --Create New benchmark project
    insert into Amplo.BenchmarkProject(
        [BenchmarkProjectName],
        [BenchmarkProjectDescription],
        [ServiceID],
        [IndustryID],
        [IndustryVerticalID],
        [IndustrySubVerticalID],
      --[ActiveFlag],
        [CreatedBy],
        [CreatedDate]
      ,[status]
    )
    VALUES(
        @assessmentSetName,
        NULL,
        1,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
     -- 1, 
        @id,
        GETDATE(),
        1
    )

    declare @createdSetID INT

    SELECT @createdSetID = SCOPE_IDENTITY();

    --Add users to benchmark project
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
        @createdSetID,
        @clientID,
        userIDs,
        1,
        1,
        @id,
        GETDATE()
    from @ValidUserIDs


   -- Add domain mapping when set is added

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

	INSERT INTO [Amplo].[BenchmarkingGoalSetting]
           ([BenchmarkProjectID]
           ,[ClientID]
           ,[IndustryBenchmark]
           ,[ASISBenchmark]
           ,[GoalSetting]
           ,[CreadedBy]
           ,[CreatedOn]
           ,[DomainID])
	select
			@createdSetID
           ,@clientid
           ,0.00
           ,0.00
           ,0.00
           ,@id
           ,GETDATE()
           ,domainid
	from Amplo.AmploDomain where ActiveFlag=1

    -- Successfull addition of new benchmark project
    SELECT messageName from Amplo.[Message] where MessageID = 12

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
