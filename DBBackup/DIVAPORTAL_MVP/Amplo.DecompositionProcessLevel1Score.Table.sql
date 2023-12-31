USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel1Score]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel1Score](
	[DecompositionProcessLevel1ScoreID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[LeafNodeLevelID] [float] NULL,
	[Level1_Calc_Aggr_Score] [float] NULL,
	[Avg_Score_Weight] [int] NULL,
	[LeafNodeFlag] [bit] NULL,
	[Owner] [varchar](100) NULL,
	[Disable_Date] [date] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel1Score] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel1ScoreID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel1Score]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel1Score_DecompositionProcessLevel1] FOREIGN KEY([DecompositionProcessLevel1ID])
REFERENCES [Amplo].[DecompositionProcessLevel1] ([DecompositionProcessLevel1ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel1Score] CHECK CONSTRAINT [FK_DecompositionProcessLevel1Score_DecompositionProcessLevel1]
GO
