USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetRegion]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 26-09-2019
-- Description:	This procedure retrieves Region details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetRegion]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [RegionID]
      ,[RegionName]
FROM [Amplo].[Region]


END
GO
