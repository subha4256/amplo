USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspSaveBenchmarkingDomainAccess]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspSaveBenchmarkingDomainAccess]
	-- Add the parameters for the stored procedure here
	@UserID [int],
	@BenchmarkProjectID [int],
	@DomainId [int],
	@AccessType [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	update [Amplo].[UserDomainAccess] set [AccessType] = @AccessType
	where [DomainID] = @DomainId and [BenchmarkProjectID] = @BenchmarkProjectID and [UserID] = @UserID and ActiveFlag=1
    -- Insert statements for procedure here
  SELECT Cast(1 as bit) as Success, (select MessageName from amplo.[Message] where MessageId = 1033) MessageName, [UserDomainAccessID]
      ,da.[ClientID]
      ,da.[UserID]
      ,da.[DomainID]
      ,da.[AccessType]
      ,da.[ActiveFlag]
      ,[BenchmarkProjectID]
	  ,bd.[DomainName]
  FROM [Amplo].[UserDomainAccess] da
  join [Amplo].[BenchmarkingDomain] bd on bd.[DomainID] = da.[DomainID]
  where [BenchmarkProjectID] = @BenchmarkProjectID and da.UserID = @UserID and da.ActiveFlag=1

END
GO
