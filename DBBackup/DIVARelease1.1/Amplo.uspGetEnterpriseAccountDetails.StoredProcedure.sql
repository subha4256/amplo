USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseAccountDetails]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ===============================================================================================================
-- Author:		Srinivas
-- Create date: 24-December-2019
-- Description:	This is to retrieve Enterprise Account Details
-- ===============================================================================================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseAccountDetails]
	-- Add the parameters for the stored procedure here
	@ClientID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

--	DECLARE @ClientID int
--	select @ClientID = ClientID FROM [Amplo].[User] where UserID = @UseriD;

	SELECT
		[ClientName],
		[CountryRegionCodeID],
		[IndustryID],
		[IndustryVerticalID],
		[IndustrySubVerticalID],
		[NoOfEmployees],
		[Address1],
		[Address2],
		[CompanyLogo],
		[Country],
		[StateTerritory],
		[City],
		[PostalCode],
		[FirstName],
		[LastName],
		[EmailAddress],
		subs.SubscriptionKey,
		subs.StartDate,
		subs.EndDate,
		[AuditFrequency],
		[FirstAuditDate],
		[RecentAuditDate]
  FROM [Amplo].[AmploCompanyProfile] clnt
--  INNER JOIN [Amplo].[User] usr
--  ON clnt.ClientID = usr.ClientID
  INNER JOIN [Amplo].[Subscription] subs
  ON clnt.SubscriptionID = subs.SubscriptionID
  INNER JOIN [Amplo].[ClientAudit] clntadt
  on clnt.ClientID = clntadt.ClientID
  WHERE clnt.ClientID = @ClientID
END
GO
