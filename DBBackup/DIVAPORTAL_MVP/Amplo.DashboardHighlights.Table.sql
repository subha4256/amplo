USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DashboardHighlights]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DashboardHighlights](
	[DashboardHighlightsID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NOT NULL,
	[DashboardHighlightsName] [varchar](100) NULL,
	[DashboardHighlights] [varchar](2000) NULL,
	[DashboardHighlightsURLPath] [varchar](512) NULL,
	[DashboardHighlightsSource] [varchar](100) NULL,
	[DashboardHighlightsCategory] [varchar](100) NULL,
	[DashboardHighlightsDigitalAsset] [varbinary](max) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[DashboardHighlightsDate] [datetime] NULL,
 CONSTRAINT [PK_DashboardHighlights] PRIMARY KEY CLUSTERED 
(
	[DashboardHighlightsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DashboardHighlights]  WITH CHECK ADD  CONSTRAINT [FK_DashboardHighlights_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardHighlights] CHECK CONSTRAINT [FK_DashboardHighlights_Client]
GO
