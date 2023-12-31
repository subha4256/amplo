USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspSaveReportAccess]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Amplo].[uspSaveReportAccess]
@ClientId as int
, @UserID as int
, @ServiceID as int
, @ReportID as int
, @AccessType as int
, @UserReportAccessName as nvarchar(500)
as
begin
	Set  nocount On;
	update amplo.[UserReportAccess] set ActiveFlag = 0 where UserId = @UserID and ServiceId = @ServiceID
	INSERT INTO amplo.[UserReportAccess]
           ([UserReportAccessName]
           ,[ClientID]
           ,[UserID]
           ,[ServiceID]
           ,[AccessType]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ReportId])
     VALUES
           (@UserReportAccessName
           ,@ClientId
           ,@UserID
           ,@ServiceID
           ,@AccessType
           ,1
           ,@UserID
           ,GETDATE()
           ,@ReportID)
	select cast(1 as bit) as IsSuccess, MessageName from amplo.Message where MessageId = 1035
end
GO
