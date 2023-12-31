USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionGridViewMap]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionGridViewMap](
	[DecompositionGridViewMapID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionGridViewMapName] [varchar](100) NULL,
	[ClienntID] [int] NULL,
	[DecompositionProjectID] [int] NOT NULL,
	[DecompositionPhaseID] [int] NULL,
	[DecompositionPhaseFunctionID] [int] NULL,
	[DecompositionGridViewProcessLocationID] [int] NULL,
	[ProcesDeisgnChoice] [nchar](10) NULL,
	[DecompositionGridViewMapGridFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_DecompositionGridViewMap] PRIMARY KEY CLUSTERED 
(
	[DecompositionGridViewMapID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
