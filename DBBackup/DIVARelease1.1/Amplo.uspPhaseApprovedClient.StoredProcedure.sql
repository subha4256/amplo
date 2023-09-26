USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspPhaseApprovedClient]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspPhaseApprovedClient]

as
begin



select
cl.ClientId, cl.ClientName
from amplo.Client cl
join amplo.[User] u on (u.ClientId = cl.ClientId and u.EmailAddress = cl.EmailAddress)
where u.ActiveFlag=1


end
GO
