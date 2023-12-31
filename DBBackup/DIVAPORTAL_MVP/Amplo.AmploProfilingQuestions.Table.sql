USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[AmploProfilingQuestions]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploProfilingQuestions](
	[QuestionID] [int] IDENTITY(1,1) NOT NULL,
	[Question] [varchar](max) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[Option1] [varchar](512) NULL,
	[Option2] [varchar](512) NULL,
	[Option3] [varchar](512) NULL,
	[Option4] [varchar](512) NULL,
	[Option5] [varchar](512) NULL,
 CONSTRAINT [PK_AmploProfilingQuestions] PRIMARY KEY CLUSTERED 
(
	[QuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
