USE [DIVAPORTAL]
GO
/****** Object:  UserDefinedTableType [Amplo].[ProfilingResponses]    Script Date: 20-11-2019 15:28:23 ******/
CREATE TYPE [Amplo].[ProfilingResponses] AS TABLE(
	[questionID] [int] NULL,
	[profilingAnswer] [varchar](max) NULL
)
GO
