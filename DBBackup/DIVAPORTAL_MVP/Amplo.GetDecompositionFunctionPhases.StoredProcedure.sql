USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[GetDecompositionFunctionPhases]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[GetDecompositionFunctionPhases]
 (
        @id int,
        @ProjectID varchar(100)
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentSetID - ID of set to get user details of
*/
SET NOCOUNT ON

--    declare @SuperUser as INT
--    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    declare @clientID as INT
    Select @clientID = ClientID from Amplo.[User] where UserID = @id

	SELECT DF.DecompositionFunctionID, DF.FunctionName, DF.FunctionDescription, DP.DecompositionPhaseID, DP.PhaseName , DP.PhaseDescription from Amplo.DecompositionFunction DF inner join
	Amplo.DecompositionPhase DP on DF.DecompositionFunctionID = DP.DecompositionFunctionID
	where DF.ActiveFlag = 1;

END
GO
