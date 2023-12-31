USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetIndustrySubVerticals]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 18-Sep-2019
-- Description:	This procedure retrieves Industry Vertical Details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetIndustrySubVerticals] 
	-- Add the parameters for the stored procedure here
    @IndustryVerticalID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


    -- Insert statements for procedure here

    SELECT IndustrySubVerticalID, IndustrySubVerticalName, IndustryVerticalDescription from Amplo.AmploIndustrySubvertical 
    where IndustryVerticalID=@IndustryVerticalID and  ActiveFlag = 1 order by IndustrySubVerticalName desc;

END



GO
