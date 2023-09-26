USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetRestrictedEmailDomain]    Script Date: 1/9/2020 6:50:44 PM ******/
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
