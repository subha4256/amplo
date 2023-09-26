USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[SimpleDemo]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[SimpleDemo](
	[Level] [hierarchyid] NOT NULL,
	[Location] [nvarchar](30) NOT NULL,
	[LocationType] [nvarchar](9) NULL
) ON [PRIMARY]
GO
