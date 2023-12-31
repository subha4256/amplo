USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[BenchmarkAssessment]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkAssessment](
	[BenchmarkAssessmentID] [int] IDENTITY(1,1) NOT NULL,
	[BenchmarkProjectID] [int] NOT NULL,
	[RegionID] [int] NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[DomainID] [int] NULL,
	[GroupID] [int] NULL,
	[QuestionID] [int] NOT NULL,
	[Response] [numeric](5, 2) NULL,
	[RessponseUserID] [varchar](100) NOT NULL,
	[ResponseDate] [datetime] NOT NULL,
	[LastResponse] [int] NULL,
	[LastResponseBy] [varchar](100) NULL,
	[LastResponseDate] [datetime] NULL,
	[ResponseComments] [varchar](512) NULL,
	[QuestionWeight] [int] NULL,
	[BenchMark] [int] NULL,
	[CreadedBy] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[ClientID] [int] NULL,
 CONSTRAINT [PK_BenchmarkAssessment] PRIMARY KEY CLUSTERED 
(
	[BenchmarkAssessmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[BenchmarkAssessment]  WITH CHECK ADD  CONSTRAINT [FK_BenchmarkAssessment_BenchmarkProject1] FOREIGN KEY([BenchmarkProjectID])
REFERENCES [Amplo].[BenchmarkProject] ([BenchmarkProjectID])
GO
ALTER TABLE [Amplo].[BenchmarkAssessment] CHECK CONSTRAINT [FK_BenchmarkAssessment_BenchmarkProject1]
GO
