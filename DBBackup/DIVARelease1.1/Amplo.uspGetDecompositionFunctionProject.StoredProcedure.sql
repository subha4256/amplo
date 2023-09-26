USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionFunctionProject]    Script Date: 1/9/2020 6:50:44 PM ******/
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
where DecompositionProjectID = @projectid and UserId = @Userid and ActiveFlag = 1


/*select DecompositionFunctionProjectID, FunctionName from Amplo.DecompositionFunctionProject 
where DecompositionProjectID = @projectid 
--and ActiveFlag = 1;
*/


END
















GO
