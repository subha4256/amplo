USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspBenchmarkingReport]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 09-Sep-2019
-- Description:	This procedure retrieves Benchmarking ASIS score, TO Be score and Industry Benchmarking score for reporting purpose
-- =============================================
CREATE PROCEDURE [Amplo].[uspBenchmarkingReport] 
	-- Add the parameters for the stored procedure here
	@UserID [int]
--	@ClientID int,
   ,@ProjectID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	Declare @ClientID as INT
	Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

    -- Insert statements for procedure here
	SELECT  BGS.[BenchmarkProjectID], [RegionID], BP.[IndustryID], BP.[IndustryVerticalID], BP.[IndustrySubVerticalID], BGS.[DomainID], [IndustryBenchmark], [ASISBenchmark], [GoalSetting], BDM.[DomainName], BP.LockedFlag as LockedStatus from Amplo.BenchmarkingGoalSetting BGS
			--inner join [Amplo].[AmploDomain] DM on  BGS.DomainID = DM.DomainID
            inner join [Amplo].[BenchmarkingDomain] BDM on  BGS.DomainID = BDM.DomainID
            inner join [Amplo].BenchmarkProject BP on BGS.BenchmarkProjectID = BP.BenchmarkProjectID
	where BGS.[BenchmarkProjectID] = @ProjectID and BGS.ClientID = @ClientID
	order by BGS.DomainID asc;

END







GO
