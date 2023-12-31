USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspSaveFunctionsAndPhases]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspSaveFunctionsAndPhases]
@ClientId as int
, @ProjectId as int
, @UserId as int
, @SelectedFunctions nvarchar(MAX)
, @SelectedPhases nvarchar(MAX)
, @SelectedPermission nvarchar(MAX)
as
begin
declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
CREATE TABLE #TempJSONFunctions(FunctionId varchar(200),FunctionName varchar(200))
INSERT INTO #TempJSONFunctions(FunctionId,FunctionName) 
SELECT FunctionId,FunctionName
  FROM OPENJSON(@SelectedFunctions, '$.root') with (FunctionId varchar(200) '$.FunctionId', FunctionName varchar(200) '$.FunctionName' ) 

  CREATE TABLE #TempJSONPhases(PhaseId varchar(200),PhaseName varchar(200))
INSERT INTO #TempJSONPhases(PhaseId,PhaseName) 
SELECT PhaseId,PhaseName
  FROM OPENJSON(@SelectedPhases, '$.root') with (PhaseId varchar(200) '$.PhaseId', PhaseName varchar(200) '$.PhaseName' ) 

  CREATE TABLE #TempJSONPermission(FunctionId varchar(200),PhaseId varchar(200))
INSERT INTO #TempJSONPermission(FunctionId,PhaseId) 
SELECT FunctionId,PhaseId
  FROM OPENJSON(@SelectedPermission, '$.root') with (FunctionId varchar(200) '$.FunctionId', PhaseId varchar(200) '$.PhaseId' ) 

update [Amplo].[DecompositionFunctionProject] set ActiveFlag = 0 where [DecompositionProjectID] = @ProjectId and [UserID] = @UserId
INSERT INTO [Amplo].[DecompositionFunctionProject]
           ([ClientID]
           ,[UserID]
           ,[DecompositionProjectID]
           ,[IndustryID]
           ,[IndustryVerticalID]
           ,[IndustrySubVerticalID]
           ,[FunctionNumber]
           ,[FunctionName]
           ,[FunctionTitle]
           ,[FunctionDescription]
           ,[FunctionMeaning]
           ,[ProcesDeisgnChoice]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ModifiedBy]
           ,[ModifiedDate])
     select @ClientId, 
	        @UserId,
			@ProjectId,
			D.IndustryID,
			D.IndustryVerticalID,
			D.IndustrySubVerticalID,
			T.FunctionId,
			T.FunctionName,
			D.FunctionTilte,
			D.FunctionDescription,
			D.FunctionMeaning,
			D.ProcesDeisgnChoice,
	        D.ActiveFlag,
			NULL,
			NULL,
			NULL,
			NULL 
	from 
	 #TempJSONFunctions T, amplo.DecompositionFunction D
	 where  T.FunctionId=D.FunctionNumber  ---Not sure


	 ---------------------------------------------------
update [Amplo].[DecompositionPhaseProject] set ActiveFlag = 0 where [DecompositionProjectID] = @ProjectId and [UserID] = @UserId
INSERT INTO [Amplo].[DecompositionPhaseProject]
           ([ClientID]
           ,[UserID]
           ,[DecompositionProjectID]
           ,[PhaseName]
           ,[PhaseTitle]
           ,[PhaseDescription]
           ,[PhaseMeaning]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ModifiedBy]
           ,[ModifiedDate]
           ,[IndustryID]
           ,[IndustryVerticalID]
           ,[IndustrySubVerticalID]
           ,[PhaseNumber])
     Select
           @ClientID
           ,@UserID
           ,@ProjectId
           ,T.PhaseName
           ,PhaseTitle
           ,PhaseDescription
           ,PhaseMeaning
           ,ActiveFlag
           ,CreatedBy
           ,CreatedDate
           ,ModifiedBy
           ,ModifiedDate
           ,IndustryID
           ,IndustryVerticalID
           ,IndustrySubVerticalID
           ,T.PhaseId
		   from 
	 #TempJSONPhases T, amplo.[DecompositionPhase] D
	 where  T.PhaseId=D.PhaseNumber  ---Not sure
	 

-------------------------------------------------------------------------

update [Amplo].[DecompositionUserAccess] set ActiveFlag = 0 where [DecompositionProjectID] = @ProjectId and [UserID] = @UserId
INSERT INTO [Amplo].[DecompositionUserAccess]
           ([UserAccessName]
           ,[UserAccessDescription]
           ,[ClientID]
           ,[UserID]
           ,[DecompositionProjectID]
           ,[FunctionID]
           ,[PhaseID]
    ,[ActiveFlag]
           ,[CreadedBy]
           ,[CreatedDate]
           ,[ModifedBy]
           ,[ModifiedDate])
     Select
           ''
           ,''
           ,@ClientId
           ,@UserId
           ,@ProjectId
           ,FunctionID
			,PhaseID
           ,1
           ,@UserName
           ,GETDATE()
           ,NULL
           ,NULL
		   From 
#TempJSONPermission 


select Cast(1 AS bit ) AS ISSUCCESS , MessageName  from Amplo.Message where MessageID=1034

	

end







GO
