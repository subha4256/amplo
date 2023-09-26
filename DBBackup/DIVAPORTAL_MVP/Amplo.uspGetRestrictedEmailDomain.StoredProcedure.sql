USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetRestrictedEmailDomain]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspGetRestrictedEmailDomain]
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all industry types
    SELECT [EmailDomainName] 
    FROM [Amplo].[RestrictedEmailDomain]
    where [ActiveFlag] = 1;
  END;


GO
