USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserDetailFromEmail]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspGetUserDetailFromEmail]
@EmailId as nvarchar(256)
as
begin
	select dv.[UserDIVATeamID] UserId, dv.ClientId, ClientName, ClientParentCompany, ClientBusinessUnit
	, dv.FirstName, dv.LastName, dv.Email, dv.UserTypeId
	from  [Amplo].[UserDIVATeam] dv
	join [Amplo].[Client] cl on cl.ClientId = dv.ClientId

	where UPPER(dv.Email) = UPPER(@EmailId )
	--and dv.Email not in (select Email from amplo.[User])
end
GO
