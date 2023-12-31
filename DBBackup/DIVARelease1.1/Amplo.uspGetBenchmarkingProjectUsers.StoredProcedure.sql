USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetBenchmarkingProjectUsers]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetBenchmarkingProjectUsers]
	-- Add the parameters for the stored procedure here
	@ProjectID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
  select bpu.UserID, CONCAT(usr.[FirstName], ' ', usr.[MiddleName], ' ', usr.[LastName]) as 'UserName', usr.EmailAddress 
  from [Amplo].[BenchmarkProjectUser] bpu
  inner join [Amplo].[User] usr on bpu.UserID = usr.UserID
  where bpu.[BenchmarkProjectID] = @ProjectID and bpu.activeflag=1;


END
GO
