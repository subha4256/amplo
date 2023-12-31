USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionPhase]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionPhase](
	[DecompositionPhaseID] [int] IDENTITY(1,1) NOT NULL,
	[PhaseName] [varchar](100) NULL,
	[PhaseTitle] [varchar](100) NULL,
	[PhaseDescription] [varchar](512) NULL,
	[PhaseMeaning] [varchar](512) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[rowid] [uniqueidentifier] NULL,
	[PhaseNumber] [int] NULL,
 CONSTRAINT [PK_DecompositionPhase] PRIMARY KEY CLUSTERED 
(
	[DecompositionPhaseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionPhase] ADD  CONSTRAINT [DF_DecompositionPhase_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
