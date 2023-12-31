USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[BenchmarkingLevel]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkingLevel](
	[BenchmarkingLevelID] [int] IDENTITY(1,1) NOT NULL,
	[BenchmarkingLevelName] [varchar](100) NULL,
	[BenchmarkingDescription] [varchar](2000) NULL,
	[BenchmarkingCharacterizedby] [varchar](512) NULL,
	[BenchmarkingKeyEnablers] [varchar](100) NULL,
 CONSTRAINT [PK_BenchmarkingLevel] PRIMARY KEY CLUSTERED 
(
	[BenchmarkingLevelID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
