USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetCountry]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetCountry]
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all countries
    SELECT [CountryRegionCode] CountryID, [Name] CountryName
    FROM Amplo.CountryRegions order by CountryRegionCode; 
END;


GO
