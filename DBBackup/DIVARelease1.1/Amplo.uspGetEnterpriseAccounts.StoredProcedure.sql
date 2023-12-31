USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseAccounts]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspGetEnterpriseAccounts]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	clnt.[ClientID]
			,clnt.[ClientName] 
			,'' [SubscriptionKey]
			,ISNULL([ClientCreatedDate], GETDATE()) [ClientCreatedDate]
			,ISNULL([ClientStatus], 0) ClientStatus
			,(select top 1 [FirstName] from [Amplo].[User] where ClientId = clnt.ClientId and ActiveFlag = 1 order by UserId asc) [FirstName]
			,(select top 1 [MiddleName] from [Amplo].[User] where ClientId = clnt.ClientId and ActiveFlag = 1 order by UserId asc) [MiddleName]
			,(select top 1 [LastName] from [Amplo].[User] where ClientId = clnt.ClientId and ActiveFlag = 1 order by UserId asc) [LastName]
			,clnt.[EmailAddress]
  FROM [Amplo].[Client] clnt
  --INNER JOIN (select top 1 * from [Amplo].[User] where ClientId = clnt.ClientId) usr
  --ON clnt.ClientID = usr.ClientID
  --WHERE CLNT.ACTIVEFLAG=1
  ORDER BY clnt.ClientCreatedDate desc;
END
GO
