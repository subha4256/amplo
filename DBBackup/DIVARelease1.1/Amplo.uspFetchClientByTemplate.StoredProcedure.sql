USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchClientByTemplate]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspFetchClientByTemplate]
@TemplateId as int
AS
BEGIN
	SET NOCOUNT ON;

	SELECT c.ClientId, c.ClientName, Cast((ISNULL([CMTempClientRelationshipId], 0)) as bit) IsSelected
	FROM amplo.Client c
	left join [Amplo].[CMTempClientRelationship] cl on (cl.ClientId = c.ClientId and cl.TemplateId = @TemplateId)
	join amplo.[User] u on (u.ClientId = c.ClientId and u.EmailAddress = c.EmailAddress)
	and u.ActiveFlag=1
END
GO
