USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[KPICapabilities]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[KPICapabilities](
	[KPICapabilitiesID] [int] IDENTITY(1,1) NOT NULL,
	[KPIControlLeversID] [int] NULL,
	[CapabilitiesName] [varchar](100) NULL,
	[CapabilitiesTitle] [varchar](512) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_KPICapabilities] PRIMARY KEY CLUSTERED 
(
	[KPICapabilitiesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[KPICapabilities] ADD  CONSTRAINT [DF_KPICapabilities_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
