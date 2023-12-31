USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[KPIInhibitors]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[KPIInhibitors](
	[KPIInhibitorsID] [int] IDENTITY(1,1) NOT NULL,
	[KPIControlLeversID] [int] NULL,
	[InhibitorsName] [varchar](100) NULL,
	[InhibitorsTitle] [varchar](512) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_KPIInhibitors] PRIMARY KEY CLUSTERED 
(
	[KPIInhibitorsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[KPIInhibitors] ADD  CONSTRAINT [DF_KPIInhibitors_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
