USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionLevel1Activities]    Script Date: 20-11-2019 15:28:24 ******/
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
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY

		Declare @ClientID as INT
		Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

		Select DecompositionProcessLevel1ID, FunctionID, PhaseID, ProcessLevel1Title, GridViewLocationID, GridVViewLocationFlag, Status 
	--	select FunctionID, PhaseID, ProcessLevel1Name, GridViewLocationID 
		from Amplo.DecompositionProcessLevel1 
		where ClientID = @ClientID And DecompositionProjectID = @projectid and ActiveFlag = 1 and GridVViewLocationFlag = 1;
	--UserID = @Userid and 

    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
    



END

















GO
