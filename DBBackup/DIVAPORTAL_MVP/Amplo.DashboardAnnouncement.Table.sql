USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DashboardAnnouncement]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DashboardAnnouncement](
	[DashboardAnnouncementID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[DashboardAnnouncementName] [varchar](100) NULL,
	[DashboardAnnouncementHighlights] [varchar](2000) NULL,
	[DashboardAnnouncementSubHighlights] [varchar](2000) NULL,
	[DashboardAnnouncementURLPath] [varchar](512) NULL,
	[DashboardAnnouncementSource] [varchar](100) NULL,
	[DashboardAnnouncementCategory] [varchar](100) NULL,
	[DashboardAnnouncementDigitalAsset] [varbinary](max) NULL,
	[CreatedBy] [varchar](100) NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[CreatedDate] [datetime] NULL,
	[DashboardAnnouncementDate] [datetime] NULL,
 CONSTRAINT [PK_DashboardAnnouncement] PRIMARY KEY CLUSTERED 
(
	[DashboardAnnouncementID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DashboardAnnouncement]  WITH CHECK ADD  CONSTRAINT [FK_DashboardAnnouncement_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardAnnouncement] CHECK CONSTRAINT [FK_DashboardAnnouncement_Client]
GO
