USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetIndustry]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 18-Sep-2019
-- Description:	This procedure retrieves Industry Details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetIndustry] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
    SELECT IndustryID, IndustryName, IndustryDescription from Amplo.Industry order by IndustryName desc;

END


GO
