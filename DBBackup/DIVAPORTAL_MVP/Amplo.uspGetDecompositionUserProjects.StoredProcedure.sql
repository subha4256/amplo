USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionUserProjects]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionUserProjects]
 (
    @UserID [int]
 )
AS
BEGIN
/*
@UserID - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   select Distinct proj.DecompositionProjectID, proj.ProjectName, stat.StatusID, stat.StatusName
   from (select DecompositionProjectID from Amplo.DecompositionProjectUser where UserID = @UserID and ActiveFlag = 1) projUser ---get projects of user
   inner join (select DecompositionProjectID,ProjectName, StatusID from Amplo.DecompositionProject where (DisableDate > GETDATE() OR DisableDate is null) and ActiveFlag = 1) proj -- get project details. Check for disable based on date. Not returning disabled projects by disable date
   ON proj.DecompositionProjectID = projUser.DecompositionProjectID
   inner join Amplo.DecompositionStatus stat on stat.StatusID = proj.[StatusID]


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
