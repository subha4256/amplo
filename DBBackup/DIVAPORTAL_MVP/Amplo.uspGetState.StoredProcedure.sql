USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetState]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetState]
@CountryRegionCode nvarchar(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all states

	SELECT [StateProvinceID],
	[StateProvinceCode],
	[CountryRegionCode],
	[Name]
	FROM
	[Amplo].[StateProvince]
	where CountryRegionCode = @CountryRegionCode

END;


GO
