USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetReportsAccess]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetReportsAccess]
	@UserID int
AS
BEGIN
	SET NOCOUNT ON;

	Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;
	SELECT [ReportID]
      ,[ClientID]
      ,[UserID]
      ,rep.[ServiceID]
	  ,[ServicesName]
      ,[ReportTitle]
      ,[ReportDescrption]
      ,[ReportPath]
      ,[ProjectID]
	  , cast((case when (select ISNULL(AccessType, 0) from amplo.[UserReportAccess] uac 
		where uac.UserId = @UserID and ActiveFlag = 1 and uac.ServiceId = rep.[ServiceID] and uac.[ReportID] = rep.[ReportID]) = 0 then 0 else 1 end) as bit) IsSelected
  FROM [Amplo].[Report] rep
  INNER JOIN [Amplo].[Services] svc ON rep.ServiceID = svc.[ServicesID]
  WHERE  ClientID = @clientid AND rep.ActiveFlag=1
  --AND [ServiceID] =@ServiceID
  ORDER BY rep.[CreatedDate] desc

END
GO
