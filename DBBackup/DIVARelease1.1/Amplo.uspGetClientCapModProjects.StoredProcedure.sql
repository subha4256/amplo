USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetClientCapModProjects]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetClientCapModProjects]
 (
    @id [int]
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
    SELECT MessageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id
	select CapModProjectID
      , CapModProjectName
      , NoOfUsers
      , StatusID
      , StatusName
	  from (
    Select proj.[DecompositionProjectID] as CapModProjectID
      ,proj.[ProjectName] as CapModProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,proj.StatusID as StatusID
      ,stat.StatusName as StatusName
      ,proj.DisableDate as DisableDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select DecompositionProjectID,ProjectName, DisableDate, StatusID, ActiveFlag, CreatedDate, ModifiedDate from Amplo.DecompositionProject where ISNULL(DisabledFlag, 0) = 0 and ISNULL(LockedFlag, 0) = 0) proj
      inner join (Select DecompositionProjectID,UserID from Amplo.DecompositionProjectUser where ClientID = @clientid) projUser on projUser.DecompositionProjectID = proj.DecompositionProjectID
      left join Amplo.DecompositionStatus stat on proj.StatusID = stat.StatusID
	  where proj.ActiveFlag = 1
      group by proj.[DecompositionProjectID] 
      ,proj.[ProjectName]
      ,proj.StatusID
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate, proj.ModifiedDate
      
    UNION all
    Select proj.[DecompositionProjectID] as CapModProjectID
      ,proj.[ProjectName] as CapModProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,100 as StatusID
      ,'DISABLED' as StatusName
      ,proj.DisableDate as DisableDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select DecompositionProjectID,ProjectName, DisableDate, StatusID, ActiveFlag, CreatedDate, ModifiedDate from Amplo.DecompositionProject where ISNULL(DisabledFlag, 0) = 1) proj
      inner join (Select DecompositionProjectID,UserID from Amplo.DecompositionProjectUser where ClientID = @clientid) projUser on projUser.DecompositionProjectID = proj.DecompositionProjectID
      left join Amplo.DecompositionStatus stat on proj.StatusID = stat.StatusID
	  where proj.ActiveFlag = 1
      group by proj.[DecompositionProjectID] 
      ,proj.[ProjectName]
      ,proj.StatusID
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate, proj.ModifiedDate
      
    UNION all
    Select proj.[DecompositionProjectID] as CapModProjectID
      ,proj.[ProjectName] as CapModProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,90 as StatusID
      ,'Locked' as StatusName
      ,proj.DisableDate as DisableDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select DecompositionProjectID,ProjectName, DisableDate, StatusID, ActiveFlag, CreatedDate, ModifiedDate from Amplo.DecompositionProject where ISNULL(DisabledFlag, 0) = 0 and ISNULL(LockedFlag, 0) = 1) proj
      inner join (Select DecompositionProjectID,UserID from Amplo.DecompositionProjectUser where ClientID = @clientid) projUser on projUser.DecompositionProjectID = proj.DecompositionProjectID
      left join Amplo.DecompositionStatus stat on proj.StatusID = stat.StatusID
	  where proj.ActiveFlag = 1
      group by proj.[DecompositionProjectID] 
      ,proj.[ProjectName]
      ,proj.StatusID
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate, proj.ModifiedDate
	  ) MainTable
    --ORDER BY MainTable.StatusID
	 order by MainTable.OrderDate desc
  
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
END
GO
