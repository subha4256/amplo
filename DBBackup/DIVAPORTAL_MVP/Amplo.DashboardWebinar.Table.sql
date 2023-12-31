USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DashboardWebinar]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DashboardWebinar](
	[DashboardWebinarID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[DashboardWebinarName] [varchar](100) NULL,
	[DashboardWebinarDescription] [varchar](2000) NULL,
	[DashboardWebinarURLPath] [varchar](512) NULL,
	[DashboardWebinarSource] [varchar](100) NULL,
	[DashboardWebinarCategory] [varchar](100) NULL,
	[DashboardWebinarDigitalAsset] [varbinary](max) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[DashboardWebinarDate] [datetime] NULL,
 CONSTRAINT [PK_DashboardWebinar] PRIMARY KEY CLUSTERED 
(
	[DashboardWebinarID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DashboardWebinar]  WITH CHECK ADD  CONSTRAINT [FK_DashboardWebinar_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardWebinar] CHECK CONSTRAINT [FK_DashboardWebinar_Client]
GO
