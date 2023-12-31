USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetServices]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================================================================================
-- Author:		Srinivas
-- Create date: 23-Oct-2019
-- Description:	This procedure retrieves Service details 
-- =====================================================================================================================
CREATE PROCEDURE [Amplo].[uspGetServices]
	-- Add the parameters for the stored procedure here
	@ServiceID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [ServicesID]
      ,[ServicesName]
FROM [Amplo].[Services]
WHERE ServicesID = @ServiceID AND ActiveFlag = 1
END
GO
