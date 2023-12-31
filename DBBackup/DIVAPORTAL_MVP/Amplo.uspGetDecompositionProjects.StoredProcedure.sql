USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProjects]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionProjects] 
 (
    @UserID [int]
 )
AS
BEGIN

SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID

    --Upper section only for projects which are not disabled and not locked by flag
    Select dpu.DecompositionProjectID, dp.ProjectName, dpu.UserID from Amplo.DecompositionProjectUser dpu
    inner join Amplo.DecompositionProject dp on dpu.decompositionprojectid= dp.DecompositionProjectID
    where dp.ClientID = @clientid 
	--and dpu.UserID = @UserID 
	and dp.ActiveFlag = 1 and dp.DisabledFlag = 0 order by dp.CreatedDate desc;

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
