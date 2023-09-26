USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetClientRevenueRange]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetClientRevenueRange]
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all industry types
SELECT ClientRevenueRangeID, ClientRevenueRangeName FROM Amplo.ClientRevenueRange order by ClientRevenueRangeID asc; 

END;
GO
