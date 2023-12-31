USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspSaveFunction]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspSaveFunction]
  @Functions nvarchar(MAX)
, @UserId int
, @TemplateId int
as
begin
	SET NOCOUNT ON
	begin try
		declare @FunctionTitle as nvarchar(256)
		declare @FunctionId as int
		declare @IsSelected as bit
		SELECT *
			INTO #SelectedFunctions
			FROM OPENJSON (@Functions, '$.root')
			WITH (
				DecompositionFunctionId int
				, FunctionTitle NVARCHAR(100)
				, IsSelected bit
			)

		select Distinct PhaseID into #FrameFunctions from [Amplo].[CMTempFrameStructure] where [TemplateID] = @TemplateId
		if(select count(*) from #FrameFunctions) = 0
		begin
			insert into #FrameFunctions values(NULL)
		end

		update [Amplo].[CMTempFrameStructure] set ActiveFlag = 0 where [TemplateID] = @TemplateId

		declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
		declare @FunctionNumber as int 
		declare cr cursor
		for select DecompositionFunctionId, FunctionTitle, IsSelected from #SelectedFunctions
		open cr
		fetch next from cr into @FunctionId, @FunctionTitle, @IsSelected
		while @@fetch_status = 0
		begin
			if(@FunctionId = 0)
			begin
				set @FunctionNumber = (ISNULL((select MAX(FunctionNumber) from amplo.DecompositionFunction), 0)) + 1
				insert into amplo.DecompositionFunction
					values (1, 1, 1, @FunctionTitle, @FunctionTitle
					, @FunctionTitle, @FunctionTitle, NULL, 1, @UserName, GETDATE(), NULL, NULL, NULL, @FunctionNumber)
				set @FunctionId = Scope_Identity()
			end
			if(@IsSelected = 1)
			begin
				insert into [Amplo].[CMTempFrameStructure]
				select @TemplateId, PhaseId, @FunctionId, 1, @UserName, GETDATE(), NULL, NULL from #FrameFunctions
			end

			fetch next from cr into @FunctionId, @FunctionTitle, @IsSelected
		end
		close cr
		deallocate cr

		drop table #SelectedFunctions
		drop table #FrameFunctions
		select cast(1 as bit) Success, MessageName from amplo.[Message] where MessageId = 1038
	end try
	begin catch
	select Error_Message();
		EXECUTE [Amplo].[uspLogError];
	end catch
end
GO
