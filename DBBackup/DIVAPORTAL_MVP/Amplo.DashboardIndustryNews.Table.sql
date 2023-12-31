USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DashboardIndustryNews]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DashboardIndustryNews](
	[DashboardIndustryNewsID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[DashboardIndustryNewsName] [varchar](100) NULL,
	[IndustryNews] [varchar](2000) NULL,
	[IndustryNewsURLPath] [varchar](512) NULL,
	[IndustryNewsSource] [varchar](100) NULL,
	[IndustryNewsCategory] [varchar](100) NULL,
	[IndustryNewsDigitalAsset] [varbinary](max) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[DashboardIndustryNewsDate] [datetime] NULL,
 CONSTRAINT [PK_DashboardIndustryNews] PRIMARY KEY CLUSTERED 
(
	[DashboardIndustryNewsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DashboardIndustryNews]  WITH CHECK ADD  CONSTRAINT [FK_DashboardIndustryNews_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardIndustryNews] CHECK CONSTRAINT [FK_DashboardIndustryNews_Client]
GO
