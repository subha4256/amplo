USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetIndustryVerticalName]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 18-Sep-2019
-- Description:	This procedure retrieves Industry Vertical Details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetIndustryVerticalName] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


    -- Insert statements for procedure here
    SELECT IndustryVerticalID, IndustryVerticalName, IndustryVerticalDescription from Amplo.AmploIndustryVertical 
    where ActiveFlag = 1 order by IndustryVerticalName desc;

END



GO
