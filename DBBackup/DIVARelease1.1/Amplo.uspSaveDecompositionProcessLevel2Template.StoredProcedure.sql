USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspSaveDecompositionProcessLevel2Template]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Amplo].[uspSaveDecompositionProcessLevel2Template]
@TemplateId int
, @Input nvarchar(MAX)
, @UserId as int
as
begin
	SET NOCOUNT ON
	begin try
		declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
		update [Amplo].[TemplateFunctPhaseStyleAssignment] set ActiveFlag = 0
		where TemplateId = @TemplateId

		SELECT *
			INTO #Assignment
			FROM OPENJSON (@Input, '$.root')
			WITH (FunctionId int, PhaseId int, StyleTitle nvarchar(100), processes nvarchar(MAX) as json)
		insert into amplo.TemplateFunctPhaseStyleAssignment
		select @TemplateId, PhaseId, FunctionId, FunctionPhaseStyleId, 1, @UserName, GETDATE(), NULL, NULL
		from #Assignment a join [Amplo].[FunctionPhaseStyle] fp on fp.StyletTitle = a.StyleTitle

		SELECT *
			from #Assignment

		declare @Processes as nvarchar(MAX)
		declare @FunctionId int
		declare @PhaseId int
		declare @StyleId int
		declare @ProcessesNames1 as nvarchar(MAX)
		declare cr cursor
		for select processes, FunctionId, PhaseId, FunctionPhaseStyleId
		from #Assignment a join [Amplo].[FunctionPhaseStyle] fp on fp.StyletTitle = a.StyleTitle
		open cr
		fetch next from cr into @Processes, @FunctionId, @PhaseId, @StyleId
		while @@fetch_status = 0
		begin
		
	

			SELECT *
			INTO #ProcessesNames1
			FROM OPENJSON (@Processes)
			WITH (ProcessLevel1Title nvarchar(100))
			
			INSERT INTO [Amplo].[AmploDecompositionProcessLevel1Template]
				   ([DecompositionProcessLevel1ID]
				   ,[DecompositionFunctionID]
				   ,[DecompositionPhaseID]
				   ,[ProcessLevel1Name]
				   ,[ProceeLevel1Title]
				   ,[ProcessLevel1Description]
				   ,[ProcessLevel1Meaning]
				   ,[DesignChoice]
				   ,[ProcessLevel1DeisgnChoice]
				   ,[GridViewLocationID]
				   ,[GridVViewLocationFlag]
				   ,[ActiveFlag]
				   ,[TemplateID]
				   ,[StyleID]
				   ,[CreatedBy]
				   ,[CreatedDate])
			 select 1
				   ,@FunctionId
				   ,@PhaseId
				   ,ProcessLevel1Title
				   ,'ProcessLevel1Title'
				   ,'ProcessLevel1Title'
				   ,ProcessLevel1Title
				   ,NULL
				   ,NULL
				   ,NULL
				   ,NULL
				   ,1
				   ,@TemplateId
				   ,@StyleId
				   ,@UserName
				   ,GETDATE() from #ProcessesNames1

				   drop table #ProcessesNames1

			fetch next from cr into @Processes, @FunctionId, @PhaseId, @StyleId
		end

		close cr
		deallocate cr

		select cast(1 as bit) Success, MessageName from amplo.Message where MessageId = 1040
	end try
	begin catch
	select Error_Message();
		EXECUTE [Amplo].[uspLogError];
	end catch
end

GO
