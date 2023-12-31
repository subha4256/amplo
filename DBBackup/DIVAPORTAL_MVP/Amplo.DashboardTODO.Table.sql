USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DashboardTODO]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DashboardTODO](
	[DashboardTODOID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[DashboardTODOName] [varchar](100) NULL,
	[DashboardTODOTaskDescription] [varchar](512) NULL,
	[DashboardTODOStatus] [varchar](2000) NULL,
	[DashboardTODURLPath] [varchar](2000) NULL,
	[DashboardTODODate] [datetime] NULL,
	[DashboardTODOSource] [varchar](100) NULL,
	[DashboardTODOCategory] [varchar](100) NULL,
	[DashboardTODODigitalAsset] [varbinary](max) NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedDBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_DashboardTODO] PRIMARY KEY CLUSTERED 
(
	[DashboardTODOID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DashboardTODO] ADD  CONSTRAINT [DF_DashboardTODO_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DashboardTODO]  WITH CHECK ADD  CONSTRAINT [FK_DashboardTODO_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardTODO] CHECK CONSTRAINT [FK_DashboardTODO_Client]
GO
