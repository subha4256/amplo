USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[BenchmarkQuestion]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkQuestion](
	[BenchmarkQuestionID] [int] IDENTITY(1,1) NOT NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[DomainID] [int] NOT NULL,
	[QuestionGroup] [varchar](10) NULL,
	[QuestionSeries] [float] NULL,
	[QuestionCategory] [varchar](256) NULL,
	[Question] [varchar](max) NOT NULL,
	[QuestionComments] [varchar](512) NULL,
	[QuestionWeightage] [int] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDdate] [datetime] NULL,
	[DesignChoice] [varchar](100) NULL,
 CONSTRAINT [PK_AmploBenchmarkQuestions] PRIMARY KEY CLUSTERED 
(
	[BenchmarkQuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
