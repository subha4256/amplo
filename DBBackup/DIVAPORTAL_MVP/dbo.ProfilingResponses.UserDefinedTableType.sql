USE [DIVAPORTAL]
GO
/****** Object:  UserDefinedTableType [dbo].[ProfilingResponses]    Script Date: 20-11-2019 15:28:23 ******/
CREATE TYPE [dbo].[ProfilingResponses] AS TABLE(
	[questionID] [int] NULL,
	[profilingAnswer] [varchar](max) NULL
)
GO
