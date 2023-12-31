USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[GettingStartedVideos]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[GettingStartedVideos](
	[GettingStartedVideosID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[GettingStartedVideosName] [varchar](100) NULL,
	[GettingStartedVideosDescription] [varchar](2000) NULL,
	[GettingStartedVideosURLPath] [varchar](512) NULL,
	[GettingStartedVideosSource] [varchar](100) NULL,
	[GettingStartedVideosCategory] [varchar](100) NULL,
	[GettingStartedVideosDigitalAsset] [varbinary](max) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[GettingStartedVideosDate] [datetime] NULL,
 CONSTRAINT [PK_GettingStartedVideos] PRIMARY KEY CLUSTERED 
(
	[GettingStartedVideosID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [Amplo].[GettingStartedVideos]  WITH CHECK ADD  CONSTRAINT [FK_GettingStartedVideos_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[GettingStartedVideos] CHECK CONSTRAINT [FK_GettingStartedVideos_Client]
GO
