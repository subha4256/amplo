USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetBenchmarkingProjects]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetBenchmarkingProjects]
	@UserID [int]
AS
BEGIN
	SET NOCOUNT ON;
    BEGIN TRY
    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @UserID

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    SELECT MessageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID
	select main.BMProjectID
      ,main.BMProjectName
	  from(
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,proj.status as StatusID
      ,stat.StatusName as StatusName
      ,proj.DisableDate as DisableDate
	  , proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status], CreatedDate, ModifiedDate from Amplo.BenchmarkProject where ISNULL(DisabledFlag, 0) = 0 and LockedFlag = 0) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid and UserId = @UserID) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
    UNION all
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,90 as StatusID
      ,'Locked' as StatusName
      ,proj.DisableDate as DisableDate
	  , proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status], CreatedDate, ModifiedDate from Amplo.BenchmarkProject where ISNULL(DisabledFlag, 0) = 0 and LockedFlag = 1) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid and UserId = @UserID) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
    ) main
    ORDER BY main.OrderDate desc, main.StatusId
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
