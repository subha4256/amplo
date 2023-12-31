USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspSavePhase]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [Amplo].[uspSavePhase]
  @Phases nvarchar(MAX)
, @UserId int
, @TemplateId int
as
begin
	SET NOCOUNT ON
	begin try
		declare @FunctionTitle as nvarchar(256)
		declare @PhaseId as int
		declare @IsSelected as bit
		SELECT *
			INTO #SelectedPhases
			FROM OPENJSON (@Phases, '$.root')
			WITH (
				DecompositionPhaseId int
				, PhaseTitle NVARCHAR(100)
				, IsSelected bit
			)
		select Distinct FunctionId into #FrameFunctions from [Amplo].[CMTempFrameStructure] where [TemplateID] = @TemplateId
		if(select count(*) from #FrameFunctions) = 0
		begin
			insert into #FrameFunctions values(NULL)
		end
		update [Amplo].[CMTempFrameStructure] set ActiveFlag = 0 where [TemplateID] = @TemplateId

		declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
		declare @PhaseNumber as int 
		declare cr cursor
		for select DecompositionPhaseId, PhaseTitle, IsSelected from #SelectedPhases
		open cr
		fetch next from cr into @PhaseId, @FunctionTitle, @IsSelected
		while @@fetch_status = 0
		begin
			if(@PhaseId = 0)
			begin
				set @PhaseNumber = (ISNULL((select MAX(PhaseNumber) from amplo.DecompositionPhase), 0)) + 1
				insert into amplo.DecompositionPhase
				values (@FunctionTitle, @FunctionTitle, @FunctionTitle, @FunctionTitle, 1, @UserName, GETDATE(), NULL, NULL
					, 1, 1, 1, NULL, @PhaseNumber)
				set @PhaseId = Scope_Identity()
			end

			if(@IsSelected = 1)
			begin
				insert into [Amplo].[CMTempFrameStructure]
				select @TemplateId, @PhaseId, FunctionId, 1, @UserName, GETDATE(), NULL, NULL from #FrameFunctions
			end

			fetch next from cr into @PhaseId, @FunctionTitle, @IsSelected
		end
		close cr
		deallocate cr

		drop table #SelectedPhases
		select cast(1 as bit) Success, MessageName from amplo.[Message] where MessageId = 1039
	end try
	begin catch
		EXECUTE [Amplo].[uspLogError];
	end catch
end
GO
