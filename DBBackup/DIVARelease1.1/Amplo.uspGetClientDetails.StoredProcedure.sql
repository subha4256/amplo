USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetClientDetails]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspGetClientDetails]
@ClientId As nvarchar(MAx)
as
begin

--Declare @SQL nvarchar(MAx)

select
cl.ClientId, cl.ClientName, ClientCreatedDate as registrationDate, '' CountryName
, u.FirstName, u.LastName, u.EmailAddress Email, '' LicenseType, GETDATE() LicenseExpiryDate
, ISNULL(cl.ClientStatus, 0) ApprovalStatus
from amplo.Client cl
join amplo.[User] u on (u.ClientId = cl.ClientId and u.EmailAddress = cl.EmailAddress)
where cl.ClientId=@ClientId
--Exec (@SQL)

end
GO
