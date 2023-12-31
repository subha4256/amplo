USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DashboardPopularResource]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DashboardPopularResource](
	[DashboardPopularResourceID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[DashboardPopularResourceName] [varchar](100) NULL,
	[DashboardPopularResourceHighlights] [varchar](2000) NULL,
	[DashboardPopularResourceSubHighlights] [varchar](2000) NULL,
	[DashboardPopularResourceURLPath] [varchar](512) NULL,
	[DashboardPopularResourceSource] [varchar](100) NULL,
	[DashboardPopularResourceCategory] [varchar](100) NULL,
	[DashboardPopularResourceDigitalAsset] [varbinary](max) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[DashboardPopularResourceDate] [datetime] NULL,
 CONSTRAINT [PK_DashboardPopularResource] PRIMARY KEY CLUSTERED 
(
	[DashboardPopularResourceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DashboardPopularResource]  WITH CHECK ADD  CONSTRAINT [FK_DashboardPopularResource_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardPopularResource] CHECK CONSTRAINT [FK_DashboardPopularResource_Client]
GO
