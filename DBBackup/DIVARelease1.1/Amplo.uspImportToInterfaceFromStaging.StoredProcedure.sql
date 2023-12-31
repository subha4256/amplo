USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspImportToInterfaceFromStaging]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Amplo].[uspImportToInterfaceFromStaging]
@StagingId uniqueidentifier
as
begin
	declare @ProjectId as int
	declare @ProjectName as nvarchar(256)
	declare @UserId as int
	declare @ClientId as int
	declare @IsSuccess as bit = 1
	
	select top 1 @ProjectId = ap.[DecompositionProjectID], @ProjectName = ap.[ProjectName], @ClientId = sp.ClientId, @UserId = sp.UserId
	from [Amplo].[DecompositionProject] ap join [Amplo].[CMProjectImportStaging] sp on ap.[ProjectName] = sp.DecompositionProjectName
	where ap.[ClientID] = @ClientId and ap.ActiveFlag = 1 and ap.DisabledFlag = 0

	declare @InterfaceId as uniqueidentifier = NewId()
	insert into amplo.CMProjectImportInterface
	values(@InterfaceId, @StagingId, @ProjectName, @ProjectId, @ClientId, @UserId, GETDATE(), 0)
end
GO
