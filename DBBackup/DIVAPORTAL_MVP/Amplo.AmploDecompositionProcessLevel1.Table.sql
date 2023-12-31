USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[AmploDecompositionProcessLevel1]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploDecompositionProcessLevel1](
	[AmploDecompositionProcessLevel1ID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionFunctionID] [int] NULL,
	[DecompositionPhaseID] [int] NULL,
	[ProcessLevel1Name] [varchar](100) NULL,
	[ProceeLevel1Title] [varchar](100) NOT NULL,
	[ProcessLevel1Description] [varchar](512) NULL,
	[ProcessLevel1Meaning] [varchar](512) NULL,
	[DesignChoice] [varchar](100) NULL,
	[ProcessLevel1DeisgnChoice] [varchar](100) NULL,
	[GridViewLocationID] [float] NULL,
	[GridVViewLocationFlag] [bit] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploDecompositionProcessLevel1_1] PRIMARY KEY CLUSTERED 
(
	[AmploDecompositionProcessLevel1ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1] ADD  CONSTRAINT [DF_AmploDecompositionProcessLevel1_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel1_DecompositionFunction] FOREIGN KEY([DecompositionFunctionID])
REFERENCES [Amplo].[DecompositionFunction] ([DecompositionFunctionID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel1_DecompositionFunction]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel1_DecompositionPhase] FOREIGN KEY([DecompositionPhaseID])
REFERENCES [Amplo].[DecompositionPhase] ([DecompositionPhaseID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel1_DecompositionPhase]
GO
