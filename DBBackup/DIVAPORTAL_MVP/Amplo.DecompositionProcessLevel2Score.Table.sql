USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel2Score]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel2Score](
	[DecompositionProcessLevel2ScoreID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NOT NULL,
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
	[LVL2CalcAggrScore] [float] NULL,
	[AvgScoreWeightage] [float] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel2Score] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel2ScoreID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel2Score]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel2Score_DecompositionProcessLevel2] FOREIGN KEY([DecompositionProcessLevel2ID])
REFERENCES [Amplo].[DecompositionProcessLevel2] ([DecompositionProcessLevel2ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel2Score] CHECK CONSTRAINT [FK_DecompositionProcessLevel2Score_DecompositionProcessLevel2]
GO
