USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPISet]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		uspGetKPISet
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetKPISet]
	-- Add the parameters for the stored procedure here
	@UserID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    Declare @clientid as INT
    Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

    -- Insert statements for procedure here
SELECT [ClientID]
      ,[KPISetID]
      ,[KPISetName]
      ,[KPISetTitle]
      ,[BSCCategory]
      ,[Status]
      ,[GlobalFlag]
      ,[KPIDimensionID]
  FROM [Amplo].[KPISet]
  where [ClientID] = @ClientID and [ActiveFlag]=1;
  
  END
GO
