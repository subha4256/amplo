USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspSaveFunctionPhaseWithStyle]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspSaveFunctionPhaseWithStyle]
@TemplateId as int
, @FunctionId as int
, @PhaseId as int
, @StyleName as nvarchar(100)
, @UserId as int
as
begin
	SET NOCOUNT ON
	BEGIN TRY
		BEGIN TRANSACTION trMain
		declare @StyleId as int = (select top 1 FunctionPhaseStyleID from amplo.FunctionPhaseStyle where [StyleTtitle] = @StyleName and [ActiveFlag] = 1)
		declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
		if(@StyleId IS NOT NULL and @StyleId != 0)
		begin
			declare @TemplateStructureId as int = (select top 1 CMTempFrameStructureID from [Amplo].[CMTempFrameStructure]
				where [TemplateID] = @TemplateId and [FunctionID] = @FunctionId and [PhaseID] = @PhaseId and [ActiveFlag] = 1)
			if(@TemplateStructureId IS NULL or @TemplateStructureId = 0)
				begin
					INSERT INTO [Amplo].[CMTempFrameStructure]
				   ([TemplateID]
				   ,[PhaseID]
				   ,[FunctionID]
				   ,[ActiveFlag]
				   ,[CreatedBy]
				   ,[CreatedDate])
				 VALUES
				   (@TemplateId
				   , @PhaseId
				   , @FunctionId
				   , 1
				   , @UserName
				   , GetDate())

				set @TemplateStructureId = (select top 1 CMTempFrameStructureID from [Amplo].[CMTempFrameStructure]
				where [TemplateID] = @TemplateId and [FunctionID] = @FunctionId and [PhaseID] = @PhaseId and [ActiveFlag] = 1)
			end

			update amplo.TemplateFunctPhaseStyleAssignment set ActiveFlag = 0, ModifiedBy = @UserName, ModifiedDate = GETDATE()
			where [TemplateID] = @TemplateId and [FunctionID] = @FunctionId and [PhaseID] = @PhaseId and [ActiveFlag] = 1

			INSERT INTO [Amplo].[TemplateFunctPhaseStyleAssignment]
				   ([TemplateID]
				   ,[PhaseID]
				   ,[FunctionID]
				   ,[StyleID]
				   ,[ActiveFlag]
				   ,[CreatedBy]
				   ,[CreatedOn])
			 VALUES
				   (@TemplateId
				   , @PhaseId
				   , @FunctionId
				   , @StyleId
				   , 1
				   , @UserName
				   , GETDATE())

			select cast(1 as bit) Success, MessageName from amplo.[Message] where MessageId = 1037
		end
		else
		begin
			update amplo.TemplateFunctPhaseStyleAssignment set ActiveFlag = 0, ModifiedBy = @UserName, ModifiedDate = GETDATE()
			where [TemplateID] = @TemplateId and [FunctionID] = @FunctionId and [PhaseID] = @PhaseId and [ActiveFlag] = 1
			
			select cast(1 as bit) Success, MessageName from amplo.[Message] where MessageId = 1037
		end

		COMMIT TRANSACTION trMain
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION trMain
		EXECUTE [dbo].[uspLogError];
	END CATCH
end
GO
