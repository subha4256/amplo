USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[BenchmarkAuditLog]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkAuditLog](
	[BenchmarkAuditLogID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[BenchmarkProjectID] [int] NULL,
	[DomainID] [int] NULL,
	[QuestionGroup] [varchar](100) NULL,
	[QuestionSeries] [varchar](20) NULL,
	[QuestionCategory] [varchar](256) NULL,
	[QuestionID] [int] NULL,
	[Question] [varchar](2000) NULL,
	[QuestionWeightage] [int] NULL,
	[ResponseID] [numeric](5, 2) NULL,
	[Response] [varchar](2000) NULL,
	[ResponseUserID] [int] NULL,
	[ResponseUserName] [varchar](100) NULL,
	[ResponseTimeStamp] [datetime] NULL,
	[DesignChoice] [varchar](100) NULL,
	[FirstResponseFlag] [bit] NULL,
	[UserIPAddress] [varchar](100) NULL,
 CONSTRAINT [PK_BenchmarkAuditLog] PRIMARY KEY CLUSTERED 
(
	[BenchmarkAuditLogID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
