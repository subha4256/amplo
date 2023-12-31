USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspDeleteTemplate]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Amplo].[uspDeleteTemplate]
@TemplateId as int
, @UserId as int
as
begin
	set nocount on
	declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
	update [Amplo].[CMTemplate]
	set ActiveFlag = 0, [ModifiedBy] = @UserName, [ModifiedDate] = GETDATE() where TemplateId = @TemplateId
	select cast(1 as bit) Success, MessageName from amplo.[Message] where MessageId = 1042
end
GO
