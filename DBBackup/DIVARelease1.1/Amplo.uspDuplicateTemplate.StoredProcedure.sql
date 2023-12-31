USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspDuplicateTemplate]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspDuplicateTemplate]
@TemplateId as int
, @UserId as int
, @TemplateName as nvarchar(100) = NULL
as
begin
	set nocount on
	begin try
		declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
		INSERT INTO [Amplo].[CMTemplate]
			   ( [TemplateName]
			   , [TemplateTitle]
			   , [ActiveFlag]
			   , [CreatedBy]
			   , [CreatedDate])
		 select  ISNULL(@TemplateName, @TemplateName)
			   , @TemplateName
			   , [ActiveFlag]
			   , @UserName
			   , GETDATE()
		 from [Amplo].[CMTemplate] where TemplateId = @TemplateId
		 
		 declare @NewTemplateId as int = scope_identity()
		INSERT INTO [Amplo].[CMTempFrameStructure]
				   ([TemplateID]
				   ,[PhaseID]
				   ,[FunctionID]
				   ,[ActiveFlag]
				   ,[CreatedBy]
				   ,[CreatedDate])
			select @NewTemplateId
				   ,[PhaseID]
				   ,[FunctionID]
				   ,[ActiveFlag]
				   ,@UserName
				   ,GETDATE()
				from [Amplo].[CMTempFrameStructure] where TemplateId = @TemplateId and ActiveFlag = 1
     

		 select cast(1 as bit) Success, MessageName from amplo.[Message] where MessageId = 1043
	end try
	begin catch
		exec amplo.uspLogError
	end catch
end
GO
