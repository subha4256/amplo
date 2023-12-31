USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel4Score]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel4Score](
	[DecompositionProcessLevel4ScoreID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NULL,
	[DecompositionProcessLevel3ID] [int] NULL,
	[DecompositionProcessLevel4ID] [int] NULL,
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
	[Level4CalcAggrScore] [float] NULL,
	[AvgScoreWeightage] [float] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel4Score] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel4ScoreID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel4Score]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel4Score_DecompositionProcessLevel4] FOREIGN KEY([DecompositionProcessLevel4ID])
REFERENCES [Amplo].[DecompositionProcessLevel4] ([DecompositionProcessLevel4ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel4Score] CHECK CONSTRAINT [FK_DecompositionProcessLevel4Score_DecompositionProcessLevel4]
GO
