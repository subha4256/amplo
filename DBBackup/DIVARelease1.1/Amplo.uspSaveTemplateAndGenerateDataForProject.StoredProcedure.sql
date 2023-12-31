USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspSaveTemplateAndGenerateDataForProject]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspSaveTemplateAndGenerateDataForProject]
@ProjectId as int
, @TemplateId as int
, @UserId as int
as
begin
	set nocount on
	begin try
		if(select ISNULL(StatusId, 1) from [Amplo].[DecompositionProject] where [DecompositionProjectID] = @ProjectId) = 1
		begin
			declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
			update [Amplo].[DecompositionProject] set [TemplateId] = @TemplateId, [ModifiedBy] = @UserName, [ModifiedDate] = GETDATE()
			where [DecompositionProjectID] = @ProjectId


			--------- Insert level 1 template data start -----------
			Declare @clientid as INT
			Select @clientid = ClientID from Amplo.[User] where UserID = @UserId

			exec [Amplo].[uspAddProcessLevel1Template] @UserId, @ProjectId, @TemplateId

			--Insert into Amplo.DecompositionProcessLevel1(
			--   [ClientID]
			--  ,[DecompositionProjectID]
			--  ,[ProcessLevel1Name]
			--  ,[ProcessLevel1Title]
			--  ,[ActiveFlag]
			--  ,[LockedFlag]
			--  ,[Status]
			--  ,[DesignChoice]
			--  ,[UserID]
			--  ,[GridViewLocationID]
			--  ,[GridVViewLocationFlag]
			--  ,[FunctionID]
			--  ,[PhaseID]
			--)
			--select 
			--@clientid,
			--@ProjectId,
			--l1Main.ProcessLevel1Name,
			--l1Main.ProceeLevel1Title,
			--1,
			--0,
			--1,--Insert status here
			--l1Main.DesignChoice,
			--@UserId,
			--l1Main.GridViewLocationID,
			--l1Main.GridVViewLocationFlag,
			--l1Main.DecompositionFunctionID,
			--l1Main.DecompositionPhaseID
			--from Amplo.AmploDecompositionProcessLevel1Template l1Main where ActiveFlag = 1 and TemplateId = @TemplateId
    

			--INSERT INTO [Amplo].[DecompositionProcessLevel1Score]
			--	   ([DecompositionProcessLevel1ID]
			--	   ,[LeafNodeLevelID]
			--	   ,[Level1_Calc_Aggr_Score]
			--	   ,[Avg_Score_Weight]
			--	   ,[LeafNodeFlag]
			--	   ,[Owner]
			--	   )
			--	   select DecompositionProcessLevel1Id
			--	   ,1.1
			--	   ,0.0
			--	   ,2
			--	   ,0
			--	   ,NULL
			--	   from Amplo.DecompositionProcessLevel1 where DecompositionProjectID = @ProjectId



				INSERT INTO [Amplo].[DecompositionFunctionProject]
				   ([ClientID]
					,[UserID]
				   ,[DecompositionProjectID]
				   ,[IndustryID]
				   ,[IndustryVerticalID]
				   ,[IndustrySubVerticalID]
				   ,[FunctionName]
				   ,[FunctionTitle]
				   ,[FunctionDescription]
				   ,[FunctionMeaning]
				   ,[ProcesDeisgnChoice]
				   ,[ActiveFlag]
				   ,[CreatedBy]
				   ,[CreatedDate]
				   ,[ModifiedBy]
				   ,[ModifiedDate]
				   ,[FunctionNumber])
			 select @ClientId
				   ,@UserId
				   ,@ProjectId
				   ,[IndustryID]
				   ,[IndustryVerticalID]
				   ,[IndustrySubVerticalID]
				   ,[FunctionName]
				   ,FunctionTilte
				   ,[FunctionDescription]
				   ,[FunctionMeaning]
				   ,[ProcesDeisgnChoice]
				   ,1
				   ,@UserId
				   ,GETDATE()
				   ,NULL
				   ,NULL
				   ,[FunctionNumber] from [Amplo].[DecompositionFunction]
				   where [DecompositionFunctionID] in 
					(select FunctionId from [Amplo].[CMTempFrameStructure] where ActiveFlag = 1 and TemplateId = @TemplateId)

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
				   ,[PhaseNumber])
			 select top 3 @ClientId
				   ,@UserId
				   ,@ProjectId
				   ,[PhaseName]
				   ,[PhaseTitle]
				   ,[PhaseDescription]
				   ,[PhaseMeaning]
				   ,1
				   ,@UserId
				   ,GETDATE()
				   ,NULL
				   ,NULL
				   ,[PhaseNumber] from [Amplo].[DecompositionPhase]
				where [DecompositionPhaseID] in 
				(select PhaseId from [Amplo].[CMTempFrameStructure] where ActiveFlag = 1 and TemplateId = @TemplateId)

			INSERT INTO [Amplo].[DecompositionScoreCriteriaProject]
				   ([ServiceID]
				   ,[ClientID]
				   ,[DecompositionProjectID]
				   ,[DecompositionProcessLevel1ID]
				 ,[ScoreCriteriaName]
				   ,[ScoreCriteriaActualName]
				   ,[ScoreCriteriaTitle]
				   ,[ScoreCriteriaDescription]
				   ,[SeededFlag]
				   ,[UsedFlag])
			 select ServiceID
					, @ClientId
					, @ProjectId
					, dp.DecompositionProcessLevel1ID
					, ScoreCriteriaName
					, ScoreCriteriaActualName
					, ScoreCriteriaTitle
					, ScoreCriteriaDescription
					, SeededFlag
					, UsedFlag from [Amplo].[DecompositionScoreCriteria]
			join [Amplo].[DecompositionProcessLevel1] dp on (dp.[DecompositionProjectID] = @ProjectId)
		end
	end try
	begin catch
		exec amplo.uspLogError
	end catch
end
GO
