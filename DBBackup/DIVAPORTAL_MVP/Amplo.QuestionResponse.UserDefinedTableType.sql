USE [DIVAPORTAL]
GO
/****** Object:  UserDefinedTableType [Amplo].[QuestionResponse]    Script Date: 20-11-2019 15:28:23 ******/
CREATE TYPE [Amplo].[QuestionResponse] AS TABLE(
	[questionId] [int] NULL,
	[responseID] [int] NULL
)
GO
