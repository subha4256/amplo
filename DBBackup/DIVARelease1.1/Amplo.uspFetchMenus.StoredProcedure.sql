USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchMenus]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspFetchMenus]
 (
    @id [int],
     @menuBlock [int]
 )
AS
BEGIN
	/*
	@id - Logged in userID
	@menuBlock - Top pane menus 1 for dashboard, 2 for configuration/users, 3 for reports
	*/
	SET NOCOUNT ON
	DECLARE @SuperUser INT
	Select @SuperUser = UserTypeID from Amplo.[User] where UserID = @id

	if((select ClientId from amplo.[User] where UserId = @Id) IS NOT NULL)
	begin
		--Configuration flag -> Submenu available only to superuser if set as 1
		-- Category -> menublock - 1 for menus in dashboard, 2 for menus in configuration, 3 for reports (When needed)

		--Create view. Filter from view on basis of superuser/add on user access and Menu block
		Select fr.FunctionalResourceID, fr.MenuName, fr.MenuParentID, fr.ConfigurationFlag, rfr.ActionFlag, rfr.Action, fr.Category, fr.MenuURL INTO #formenus from
		((Select ClientID from Amplo.[User] where UserID = @id and ActiveFlag = 1) u  ---Client id to fetch role
		Inner JOIN Amplo.[UserAccessResource] uar ON uar.ClientID = u.ClientID and uar.ActiveFlag =1   --Client id fetches role
		--Inner Join Amplo.[Role] r ON uar.RoleID = r.RoleID and r.ActiveFlag = 1 
		Inner Join Amplo.RolesFunctionalResource rfr on rfr.RoleID = uar.RoleID  --RoleID fetches functional resource IDs
		Inner JOIN Amplo.[FunctionalResources] fr on rfr.FunctionalResourceID = fr.FunctionalResourceID AND fr.ActiveFlag = 1)   -- Details of functional resources
		where IsForClient = 1
		If @SuperUser = 1
		BEGIN
			-- get all menus submenus, thus no filter for configuration
			Select DISTINCT 
					Parent.FunctionalResourceID as ParentMenuID,
					Parent.MenuName AS ParentMenu,
					Child.FunctionalResourceID as SubmenuID,
					Child.MenuName As Submenu,
					Child.MenuURL AS Link,
					Child.ActionFlag As Access 
			from #formenus Child
			left join Amplo.FunctionalResources Parent on Child.MenuParentID = Parent.FunctionalResourceID And Parent.ActiveFlag = 1
			WHERE  Child.Category  = @MenuBlock
		END

		ELSE
		BEGIN
		-- get only menus and submenus which are available to superuser
			Select DISTINCT
				 Parent.FunctionalResourceID as ParentMenuID,
					Parent.MenuName AS ParentMenu,
					Child.FunctionalResourceID as SubmenuID,
					Child.MenuName As Submenu,
					Child.MenuURL AS Link,
					Child.ActionFlag As Access 
			from #formenus Child
			left join Amplo.FunctionalResources Parent on Child.MenuParentID = Parent.FunctionalResourceID And Parent.ActiveFlag = 1
			WHERE  Child.Category  = @MenuBlock AND Child.ConfigurationFlag = 0
		END

		DROP TABLE #formenus
	end
	else
	begin
		Select fr.FunctionalResourceID, fr.MenuName, fr.MenuParentID, fr.ConfigurationFlag, rfr.ActionFlag, rfr.Action, fr.Category, fr.MenuURL INTO #formenusAmplo from
		Amplo.RolesFunctionalResource rfr --on rfr.RoleID = uar.RoleID
		Inner JOIN Amplo.[FunctionalResources] fr on rfr.FunctionalResourceID = fr.FunctionalResourceID AND fr.ActiveFlag = 1
		where (IsForClient = 0 and rfr.RoleId = 1) or fr.FunctionalResourceID in (23, 24, 20, 11, 25)
		--select * from #formenusAmplo
		set @SuperUser = 1
		If @SuperUser = 1
		BEGIN
			-- get all menus submenus, thus no filter for configuration
			Select DISTINCT 
					Parent.FunctionalResourceID as ParentMenuID,
					Parent.MenuName AS ParentMenu,
					Child.FunctionalResourceID as SubmenuID,
					Child.MenuName As Submenu,
					Child.MenuURL AS Link,
					Child.ActionFlag As Access 
			from #formenusAmplo Child
			left join Amplo.FunctionalResources Parent on Child.MenuParentID = Parent.FunctionalResourceID And Parent.ActiveFlag = 1
			WHERE  Child.Category  = @MenuBlock --and Child.FunctionalResourceID not in (16, 14) --and Child.FunctionalResourceID not in (23, 24)
		END

		ELSE
		BEGIN
		-- get only menus and submenus which are available to superuser
			Select DISTINCT
				 Parent.FunctionalResourceID as ParentMenuID,
					Parent.MenuName AS ParentMenu,
					Child.FunctionalResourceID as SubmenuID,
					Child.MenuName As Submenu,
					Child.MenuURL AS Link,
					Child.ActionFlag As Access 
			from #formenusAmplo Child
			left join Amplo.FunctionalResources Parent on Child.MenuParentID = Parent.FunctionalResourceID And Parent.ActiveFlag = 1
			WHERE  Child.Category  = @MenuBlock AND Child.ConfigurationFlag = 0
		END

		DROP TABLE #formenusAmplo
	end
END








GO
