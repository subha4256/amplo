USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel2]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel2](
	[DecompositionProcessLevel2ID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProjectID] [int] NULL,
	[DecompositionProcessLevel1ID] [int] NOT NULL,
	[ProcessLevel2NodeID] [varchar](50) NULL,
	[ProcessLevel2Name] [varchar](100) NULL,
	[ProcessLevel2Title] [varchar](100) NULL,
	[ProcessLevel2Description] [varchar](512) NULL,
	[Owner] [varchar](100) NULL,
	[CountrySpecific] [varchar](100) NULL,
	[LeafNodeFlag] [bit] NULL,
	[DisableDate] [date] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel2] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel2ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel2] ADD  CONSTRAINT [DF_DecompositionProcessLevel2_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
