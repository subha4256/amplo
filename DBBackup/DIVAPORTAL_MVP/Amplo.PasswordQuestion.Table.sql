USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[PasswordQuestion]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[PasswordQuestion](
	[PasswordQuestionID] [int] IDENTITY(1,1) NOT NULL,
	[PasswordQuestion] [varchar](512) NOT NULL,
	[PasswordQuestionRemarks] [varchar](512) NULL,
	[ActiveFlag] [bit] NULL,
 CONSTRAINT [PK_PasswordQuestions] PRIMARY KEY CLUSTERED 
(
	[PasswordQuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
