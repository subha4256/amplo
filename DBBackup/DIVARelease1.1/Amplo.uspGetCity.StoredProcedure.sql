USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetCity]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create PROCEDURE [Amplo].[uspGetCity]
@StateProvince varchar(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all industry types
  select * from Amplo.City where ISO = @StateProvince

END;

GO
