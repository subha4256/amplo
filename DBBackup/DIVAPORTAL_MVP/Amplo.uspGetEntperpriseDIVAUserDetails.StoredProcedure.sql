USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEntperpriseDIVAUserDetails]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================================
-- Author:		Srinivas
-- Create date: 11-Oct-2019
-- Description:	This procedure retrieves Selected Enterprise DIVA user details
-- =====================================================================
CREATE PROCEDURE [Amplo].[uspGetEntperpriseDIVAUserDetails]
	-- Add the parameters for the stored procedure here
--	@UserID [int],
	@DIVAUserID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	SELECT [UserDIVATeamID]
		,[FirstName]
		,[LastName]
		,[Email]
		,[DisableDate]
		,a.UserTypeID
		,c.[UserTypeName]
		,a.UserStatusID
		,b.LookupTitle
	FROM [Amplo].[UserDIVATeam] a
	inner join Amplo.StatusLookup b on a.UserStatusID = b.StatusLookupID
	inner join Amplo.UserType c on a.UserTypeID = c.UserTypeID
	where a.UserDIVATeamID = @DIVAUserID;



END
GO
