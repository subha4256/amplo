USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionLevel1Activities]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionLevel1Activities]
 (
    @Userid [int],
    @projectid [int]
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY

		Declare @ClientID as INT
		Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

		Select l1.DecompositionProcessLevel1ID, l1.FunctionID, l1.PhaseID, l1.ProcessLevel1Title, l1.GridViewLocationID, l1.GridVViewLocationFlag, l1.[Status]
		into #Output from Amplo.DecompositionProcessLevel1 l1
		join amplo.[DecompositionUserAccess] du on (du.DecompositionProjectId = @projectid and du.UserId = @Userid and du.ActiveFlag = 1 and du.FunctionId = l1.FunctionId and du.PhaseId = l1.PhaseId)
		where l1.ClientID = @ClientID And l1.DecompositionProjectID = @projectid and l1.ActiveFlag = 1 and l1.GridVViewLocationFlag = 1
		
		--delete from #Output where FunctionID not in (select FunctionId from amplo.[DecompositionUserAccess] where DecompositionProjectId = @projectid and UserId = @Userid and ActiveFlag = 1)
		--delete from #Output where PhaseID not in (select PhaseID from amplo.[DecompositionUserAccess] where DecompositionProjectId = @projectid and UserId = @Userid and ActiveFlag = 1)

		select * from #Output
		drop table #Output
    END TRY
    BEGIN CATCH
        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END

















GO
