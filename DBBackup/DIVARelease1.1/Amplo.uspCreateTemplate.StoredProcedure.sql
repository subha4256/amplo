USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspCreateTemplate]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspCreateTemplate]
@TemplateId as int
, @TemplateName as nvarchar(100)
, @UserId as int
, @Clients as nvarchar(MAX)
as
begin
	set NOCOUNT on
	begin try
		declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
		if(@TemplateId = 0)
		begin
			insert into [Amplo].[CMTemplate]
			values(@TemplateName, @TemplateName, 1, @UserName, GETDATE(), NULL, NULL, NULL)
			set @TemplateId = Scope_identity()
		end
		else
		begin
			update [Amplo].[CMTemplate] set [TemplateName] = @TemplateName, [TemplateTitle] = @TemplateName
			where [TemplateID] = @TemplateId
		end
		SELECT *
			INTO #Clients
			FROM OPENJSON (@Clients, '$.root')
			WITH (ClientId int, IsSelected bit)
		
		delete from [Amplo].[CMTempClientRelationship] where TemplateId = @TemplateId
		insert into [Amplo].[CMTempClientRelationship] select @TemplateId, ClientId from #Clients where IsSelected Is Not NULL and IsSelected = 1
		drop table #Clients
		select cast(1 as bit) Seccess, MessageName, @TemplateName name from amplo.[Message] where MessageId = 1040
	end try
	begin catch
		select error_message()
		exec dbo.uspLogError
	end catch
end
GO
