USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionScoreCriteriaProject]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionScoreCriteriaProject](
	[DecompositionScoreCriteriaID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceID] [int] NULL,
	[ClientID] [int] NULL,
	[DecompositionProjectID] [int] NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[ScoreCriteriaName] [varchar](100) NULL,
	[ScoreCriteriaActualName] [varchar](100) NULL,
	[ScoreCriteriaTitle] [varchar](100) NULL,
	[ScoreCriteriaDescription] [varchar](512) NULL,
	[SeededFlag] [bit] NULL,
	[UsedFlag] [bit] NULL,
 CONSTRAINT [PK_DecompositionScoreCriteriaProject] PRIMARY KEY CLUSTERED 
(
	[DecompositionScoreCriteriaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionScoreCriteriaProject] ADD  CONSTRAINT [DF_DecompositionScoreCriteriaProject_SeededFlag]  DEFAULT ((0)) FOR [SeededFlag]
GO
ALTER TABLE [Amplo].[DecompositionScoreCriteriaProject] ADD  CONSTRAINT [DF_DecompositionScoreCriteriaProject_UsedFlag]  DEFAULT ((0)) FOR [UsedFlag]
GO
ALTER TABLE [Amplo].[DecompositionScoreCriteriaProject]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionScoreCriteriaProject_DecompositionProject] FOREIGN KEY([DecompositionProcessLevel1ID])
REFERENCES [Amplo].[DecompositionProcessLevel1] ([DecompositionProcessLevel1ID])
GO
ALTER TABLE [Amplo].[DecompositionScoreCriteriaProject] CHECK CONSTRAINT [FK_DecompositionScoreCriteriaProject_DecompositionProject]
GO
