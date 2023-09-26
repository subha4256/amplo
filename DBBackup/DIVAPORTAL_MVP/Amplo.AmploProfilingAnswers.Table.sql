USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[AmploProfilingAnswers]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploProfilingAnswers](
	[ProfilingAnswersID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[CompanyProfileID] [int] NULL,
	[ProfilingQuestionID] [int] NULL,
	[ProfilingAnswers] [varchar](max) NULL,
	[ProfilingRatings] [int] NULL,
	[ProfilingAnswersFeedback] [varchar](512) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploProfilingAnswers] PRIMARY KEY CLUSTERED 
(
	[ProfilingAnswersID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
