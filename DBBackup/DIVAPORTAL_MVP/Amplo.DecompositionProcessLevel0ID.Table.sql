USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel0ID]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel0ID](
	[DecompositionProcessLevel0ID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NOT NULL,
	[DecompositionProjectID] [int] NOT NULL,
	[ProcessLevelTitle] [varchar](100) NULL,
	[FunctionID] [int] NULL,
	[FunctionName] [varchar](100) NULL,
	[PhaseID] [int] NULL,
	[PhaseName] [varchar](100) NULL,
	[CalcAggrScore] [float] NULL,
	[Status] [varchar](20) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel0ID] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel0ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
