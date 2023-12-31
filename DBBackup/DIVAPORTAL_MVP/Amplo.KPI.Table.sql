USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[KPI]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[KPI](
	[KPIID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NOT NULL,
	[KPIName] [varchar](100) NULL,
	[KPITitle] [varchar](100) NOT NULL,
	[BusinessOutcome] [varchar](512) NULL,
	[BusinessMetrics] [varchar](256) NULL,
	[PersonaImpacted] [varchar](256) NULL,
	[EstimatedSavings] [varchar](100) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_KPI] PRIMARY KEY CLUSTERED 
(
	[KPIID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[KPI] ADD  CONSTRAINT [DF_KPI_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[KPI]  WITH CHECK ADD  CONSTRAINT [FK_KPI_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[KPI] CHECK CONSTRAINT [FK_KPI_Client]
GO
