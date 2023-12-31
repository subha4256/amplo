USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel3Score]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel3Score](
	[DecompositionProcessLevel3ScoreID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NULL,
	[DecompositionProcessLevel3ID] [int] NULL,
	[ScoreCriteria1] [float] NULL,
	[ScoreCriteria2] [float] NULL,
	[ScoreCriteria3] [float] NULL,
	[ScoreCriteria4] [float] NULL,
	[ScoreCriteria5] [float] NULL,
	[ScoreCriteria6] [float] NULL,
	[ScoreCriteria7] [float] NULL,
	[ScoreCriteria8] [float] NULL,
	[ScoreCriteria9] [float] NULL,
	[ScoreCriteria10] [float] NULL,
	[Level3CalcAggrScore] [float] NULL,
	[AvgScoreWeightage] [int] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel3Score] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel3ScoreID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel3Score]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel3Score_DecompositionProcessLevel3] FOREIGN KEY([DecompositionProcessLevel3ID])
REFERENCES [Amplo].[DecompositionProcessLevel3] ([DecompositionProcessLevel3ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel3Score] CHECK CONSTRAINT [FK_DecompositionProcessLevel3Score_DecompositionProcessLevel3]
GO
