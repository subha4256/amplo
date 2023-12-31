USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserBMProjects]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetUserBMProjects]
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

   select Distinct (proj.BenchmarkProjectID), proj.BenchmarkProjectName, stat.StatusID, stat.StatusName, proj.CreatedDate
   from (select BenchmarkProjectID from Amplo.BenchmarkProjectUser where UserID = @id and ActiveFlag = 1) projUser ---get projects of user
   inner join (select BenchmarkProjectID,BenchmarkProjectName, [status], CreatedDate from Amplo.BenchmarkProject where (DisableDate > GETDATE() OR DisableDate is null)) proj -- get project details. Check for disable based on date. Not returning disabled projects by disable date
   ON proj.BenchmarkProjectID = projUser.BenchmarkProjectID
   inner join Amplo.BenchmarkStatus stat on stat.StatusID = proj.[status]
   order by proj.CreatedDate desc

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
