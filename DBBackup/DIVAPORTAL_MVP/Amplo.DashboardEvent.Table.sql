USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DashboardEvent]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DashboardEvent](
	[DashboardEventID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[DashboardEventName] [varchar](100) NULL,
	[DashboardEvent] [varchar](2000) NULL,
	[DashboardEventDate] [datetime] NULL,
	[DashboardEventURLPath] [varchar](512) NULL,
	[DashboardEventSource] [varchar](100) NULL,
	[DashboardEventCategory] [varchar](100) NULL,
	[DashboardEventsDigitalAsset] [varbinary](max) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_DashboardEvent] PRIMARY KEY CLUSTERED 
(
	[DashboardEventID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DashboardEvent]  WITH CHECK ADD  CONSTRAINT [FK_DashboardEvent_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardEvent] CHECK CONSTRAINT [FK_DashboardEvent_Client]
GO
