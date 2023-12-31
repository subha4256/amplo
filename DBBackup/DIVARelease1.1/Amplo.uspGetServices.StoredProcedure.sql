USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetServices]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetServices]
	@ServiceID int
	, @UserID int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT [ServicesID]
		  ,[ServicesName]
	FROM [Amplo].[Services]
	WHERE ServicesID = @ServiceID AND ActiveFlag = 1 and ServicesID in
	(select ServiceId from amplo.[UserReportAccess] where UserId = @UserID and ActiveFlag = 1 and AccessType = 1)
END
GO
