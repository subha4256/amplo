USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetReports]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 22-October-2019
-- Description:	This procedure retrieves report details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetReports]
	-- Add the parameters for the stored procedure here
	@UserID int,
	@ServiceID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [ReportID]
      ,[ClientID]
      ,[UserID]
      ,[ServiceID]
      ,[ReportTitle]
      ,[ReportDescrption]
      ,[ReportPath]
      ,[ProjectID]
      ,[ActiveFlag]
      ,[CreatedDate]
      ,[CreatedBy]
      ,[ModifiedDate]
      ,[ModifiedBy]
  FROM [Amplo].[Report]
  WHERE [UserID] = @UserID AND [ServiceID] = @ServiceID
  and ReportId in 
  (select ReportId from amplo.[UserReportAccess] where UserId = @UserID and ServiceId = @ServiceID and ActiveFlag = 1)
  order by [CreatedDate] desc

END
GO
