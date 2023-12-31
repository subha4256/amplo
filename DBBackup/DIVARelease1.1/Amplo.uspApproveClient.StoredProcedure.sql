USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspApproveClient]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspApproveClient]
@ClientId as int
, @ApprovedBy nvarchar(200)
, @ApprovedAt datetime
, @Login nvarchar(256)
, @Password nvarchar(256)
as
begin
	declare @ClientName as nvarchar(200) = (select ClientName from [Amplo].[Client] where [ClientID] = @ClientId)
	set @ClientName = Substring(replace(replace(@ClientName, ' ', ''), '.', ''), 1, 100) + cast(@ClientId as nvarchar(20)) + '11'
	update amplo.Client set ClientStatus = 1 where ClientId = @ClientId
	--declare @Login as nvarchar(256) = 'NewLogin11' + cast(@ClientId as nvarchar(20)) + '50'
	--declare @Password as nvarchar(256) = 'NewPassword1' + cast(@ClientId as nvarchar(20)) + '50'
	declare @User as nvarchar(256) = 'NewUser11' + cast(@ClientId as nvarchar(20)) + '11'
	exec amplo.CreateMultipleSchema
	  @ClientName
	, @Login
	, @Password
	, @ClientId
	, @User
end

GO
