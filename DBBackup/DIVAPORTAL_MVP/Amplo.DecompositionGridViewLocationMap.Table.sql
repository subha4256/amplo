USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionGridViewLocationMap]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionGridViewLocationMap](
	[DecompositionGridViewLocationMapID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionFunctionID] [int] NULL,
	[DecompositionPhaseID] [int] NULL,
	[GridViewLocationID] [int] NULL,
	[GridViewLocationCode] [varchar](100) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_GridViewLocationMap] PRIMARY KEY CLUSTERED 
(
	[DecompositionGridViewLocationMapID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionGridViewLocationMap] ADD  CONSTRAINT [DF_GridViewLocationMap_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionGridViewLocationMap]  WITH CHECK ADD  CONSTRAINT [FK_GridViewLocationMap_DecompositionFunction] FOREIGN KEY([DecompositionFunctionID])
REFERENCES [Amplo].[DecompositionFunction] ([DecompositionFunctionID])
GO
ALTER TABLE [Amplo].[DecompositionGridViewLocationMap] CHECK CONSTRAINT [FK_GridViewLocationMap_DecompositionFunction]
GO
ALTER TABLE [Amplo].[DecompositionGridViewLocationMap]  WITH CHECK ADD  CONSTRAINT [FK_GridViewLocationMap_DecompositionPhase] FOREIGN KEY([DecompositionPhaseID])
REFERENCES [Amplo].[DecompositionPhase] ([DecompositionPhaseID])
GO
ALTER TABLE [Amplo].[DecompositionGridViewLocationMap] CHECK CONSTRAINT [FK_GridViewLocationMap_DecompositionPhase]
GO
