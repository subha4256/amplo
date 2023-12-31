USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionUserAccess]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Amplo].[uspGetDecompositionUserAccess]
@ProjectId as int
, @UserId as int
as
begin
	select [UserAccessName]
           ,[UserAccessDescription]
           ,[ClientID]
           ,[UserID]
           ,[DecompositionProjectID]
           ,[FunctionID]
           ,[PhaseID]
		   from amplo.[DecompositionUserAccess]
		   where [UserID] = @UserId and [DecompositionProjectID] = @ProjectId and [ActiveFlag] = 1
end
GO
