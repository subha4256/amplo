USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetClientProjects]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetClientProjects]
 (
    @id [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT MessageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    --Upper section only for projects which are not disabled and not locked by flag
	select main.BMProjectID
      ,main.BMProjectName
      ,main.NoOfUsers
      ,main.StatusID
      ,main.StatusName
      ,main.DisableDate
	  , main.CreatedDate
	  from(
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,proj.status as StatusID
      ,stat.StatusName as StatusName
      ,proj.DisableDate as DisableDate
	  , proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status], CreatedDate, ModifiedDate from Amplo.BenchmarkProject where ISNULL(DisabledFlag, 0) = 0 and LockedFlag = 0) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
      --where projUser.ClientID = @clientid
      group by proj.[BenchmarkProjectID] 
      ,proj.[BenchmarkProjectName]
      ,proj.status
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate
      , ISNULL(proj.ModifiedDate, proj.CreatedDate)
    UNION all
    --section only for projects where disabled flag is set , status returned as disabled
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,100 as StatusID
      ,'DISABLED' as StatusName
      ,proj.DisableDate as DisableDate
	  , proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status], CreatedDate, ModifiedDate from Amplo.BenchmarkProject where ISNULL(DisabledFlag, 0) = 1) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
      --where projUser.ClientID = @clientid
      group by proj.[BenchmarkProjectID] 
      ,proj.[BenchmarkProjectName]
      ,proj.status
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate
      , ISNULL(proj.ModifiedDate, proj.CreatedDate)
    UNION all
    --section only for projects where disabled flag is not set but locked flag is set , status returned as locked
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,90 as StatusID
      ,'Locked' as StatusName
      ,proj.DisableDate as DisableDate
	  , proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status], CreatedDate, ModifiedDate from Amplo.BenchmarkProject where ISNULL(DisabledFlag, 0) = 0 and LockedFlag = 1) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
      --where projUser.ClientID = @clientid
      group by proj.[BenchmarkProjectID] 
      ,proj.[BenchmarkProjectName]
      ,proj.status
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate)
    ) main
    ORDER BY main.OrderDate desc, main.StatusId
  
     
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
