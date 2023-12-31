USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[KPIControlLevers]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[KPIControlLevers](
	[KPIControlLeversID] [int] IDENTITY(1,1) NOT NULL,
	[KPIID] [int] NOT NULL,
	[ControlLeversName] [varchar](100) NULL,
	[ControlLeversTitle] [varchar](256) NOT NULL,
	[PersonaImpacted] [varchar](256) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_KPIControlLevers] PRIMARY KEY CLUSTERED 
(
	[KPIControlLeversID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[KPIControlLevers] ADD  CONSTRAINT [DF_KPIControlLevers_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[KPIControlLevers]  WITH CHECK ADD  CONSTRAINT [FK_KPIControlLevers_KPI] FOREIGN KEY([KPIID])
REFERENCES [Amplo].[KPI] ([KPIID])
GO
ALTER TABLE [Amplo].[KPIControlLevers] CHECK CONSTRAINT [FK_KPIControlLevers_KPI]
GO
