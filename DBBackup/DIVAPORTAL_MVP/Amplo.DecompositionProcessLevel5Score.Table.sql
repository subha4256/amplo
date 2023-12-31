USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel5Score]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel5Score](
	[DecompositionProcessLevel5ScoreID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NULL,
	[DecompositionProcessLevel3ID] [int] NULL,
	[DecompositionProcessLevel4ID] [int] NULL,
	[DecompositionProcessLevel5ID] [int] NULL,
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
	[Level5CalcAggrScore] [float] NULL,
	[AvgScoreWeightage] [float] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel5Score] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel5ScoreID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel5Score]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel5Score_DecompositionProcessLevel5] FOREIGN KEY([DecompositionProcessLevel5ID])
REFERENCES [Amplo].[DecompositionProcessLevel5] ([DecompositionProcessLevel5ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel5Score] CHECK CONSTRAINT [FK_DecompositionProcessLevel5Score_DecompositionProcessLevel5]
GO
