USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseDIVATeam]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	This procedure retrieves Enterprise DIVA users
-- =====================================================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseDIVATeam]
	-- Add the parameters for the stored procedure here
	@UserID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	DECLARE @ClientID int
	select @ClientID = ClientID FROM [Amplo].[User] where UserID = @UseriD;

	SELECT [UserDIVATeamID]
		,[FirstName]
		,[LastName]
		,[Email]
		,[DisableDate]
		,c.[UserTypeName]
	FROM [Amplo].[UserDIVATeam] a
	inner join Amplo.StatusLookup b on a.UserStatusID = b.StatusLookupID
	inner join Amplo.UserType c on a.UserTypeID = c.UserTypeID
	where a.ClientID = @ClientID and a.SuperUserID = @UserID
	order by a.CreatedDate desc, a.ModifiedDate desc;



END

GO
