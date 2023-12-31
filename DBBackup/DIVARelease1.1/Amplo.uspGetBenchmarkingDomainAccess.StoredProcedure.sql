USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetBenchmarkingDomainAccess]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetBenchmarkingDomainAccess]
	-- Add the parameters for the stored procedure here
	@UserID [int],
	@BenchmarkProjectID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT da.[UserDomainAccessID]
      ,da.[ClientID]
      ,da.[UserID]
      ,da.[DomainID]
      ,da.[AccessType]
      ,da.[ActiveFlag]
      ,da.[BenchmarkProjectID]
	  ,bd.[DomainName]
  FROM [Amplo].[UserDomainAccess] da
  join [Amplo].[BenchmarkingDomain] bd on bd.[DomainID] = da.[DomainID]
  where [BenchmarkProjectID] = @BenchmarkProjectID and da.UserID = @UserID and da.ActiveFlag=1

END
GO
