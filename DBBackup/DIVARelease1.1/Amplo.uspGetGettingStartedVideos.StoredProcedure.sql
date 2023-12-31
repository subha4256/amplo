USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetGettingStartedVideos]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetGettingStartedVideos]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [GettingStartedVideosID]
      ,[ClientID]
      ,[GettingStartedVideosName]
      ,[GettingStartedVideosDescription]
      ,[GettingStartedVideosDate]
      ,[GettingStartedVideosURLPath]
      ,[GettingStartedVideossource]
      ,[GettingStartedVideosCategory]
      ,[GettingStartedVideosDigitalAsset]
  FROM [Amplo].[GettingStartedVideos]
--  where [ClientID] = @ClientID
  Order by [GettingStartedVideosDate] desc;

END

GO
