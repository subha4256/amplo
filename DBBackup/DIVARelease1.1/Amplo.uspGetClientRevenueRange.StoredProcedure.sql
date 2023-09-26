USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetClientRevenueRange]    Script Date: 1/9/2020 6:50:44 PM ******/
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
