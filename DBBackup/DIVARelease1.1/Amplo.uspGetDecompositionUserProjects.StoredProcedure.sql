USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionUserProjects]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--alter table [Amplo].[DecompositionProject]
--add TemplateId int
--go

--alter table Test102211.[DecompositionProject]
--add TemplateId int
--go

--update Test102211.[DecompositionProject] set TemplateId = 1
--go

CREATE PROCEDURE [Amplo].[uspGetDecompositionUserProjects]
 (
    @UserID [int]
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   select Distinct proj.DecompositionProjectID, proj.ProjectName, stat.StatusID, stat.StatusName, ISNULL(TemplateId, 0) as SelectedTemplate
   from (select DecompositionProjectID from Amplo.DecompositionProjectUser where UserID = @UserID and ActiveFlag = 1) projUser ---get projects of user
   inner join (select DecompositionProjectID,ProjectName, StatusID, TemplateId from Amplo.DecompositionProject where (DisableDate > GETDATE() OR DisableDate is null) and ActiveFlag = 1) proj -- get project details. Check for disable based on date. Not returning disabled projects by disable date
   ON proj.DecompositionProjectID = projUser.DecompositionProjectID
   inner join Amplo.DecompositionStatus stat on stat.StatusID = proj.[StatusID]


    COMMIT TRANSACTION;
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
