USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionFunctionProject]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetDecompositionFunctionProject] --1015, 49
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


select FunctionNumber as DecompositionFunctionProjectID, FunctionName from Amplo.DecompositionFunctionProject 
where DecompositionProjectID = @projectid 


/*select DecompositionFunctionProjectID, FunctionName from Amplo.DecompositionFunctionProject 
where DecompositionProjectID = @projectid 
--and ActiveFlag = 1;
*/


END
















GO
