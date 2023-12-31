USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionScoreCalculationFunction]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionScoreCalculationFunction](
	[DecompositionScoreCalculationFunctionID] [int] IDENTITY(1,1) NOT NULL,
	[ScoreCalculationFunctionName] [varchar](100) NULL,
	[ScoreCalculationFunctionTitle] [varchar](100) NULL,
	[ScoreCalculationFunctionDescription] [varchar](100) NULL,
 CONSTRAINT [PK_DecompositionScoreCalculationFunction] PRIMARY KEY CLUSTERED 
(
	[DecompositionScoreCalculationFunctionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
