USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetBenchmarkingReportLockStatus]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 16-Sep-2019
-- Description:	This procedure retrieves Benchmarking Report Lock Status
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetBenchmarkingReportLockStatus] 
	-- Add the parameters for the stored procedure here
	@UserID int,
--	@ClientID int,
	@ProjectID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	declare @clientId INT
	select @clientId = ClientID from Amplo.[User] where UserID = @UserID and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

	SELECT  BP.BenchmarkProjectID, BP.LockedFlag as LockedStatus from [Amplo].BenchmarkProject BP WHERE BP.ClientID = @ClientID and BP.BenchmarkProjectID = @ProjectID; 

END









GO
