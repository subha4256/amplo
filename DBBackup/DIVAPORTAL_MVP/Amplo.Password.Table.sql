USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[Password]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Password](
	[PasswordID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[PasswordQuestionID] [int] NOT NULL,
	[PasswordAnswer] [varchar](512) NOT NULL,
	[BeginDate] [date] NULL,
	[EndDate] [date] NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifedBy] [varchar](100) NULL,
	[ModifiedOn] [datetime] NULL,
 CONSTRAINT [PK_Password] PRIMARY KEY CLUSTERED 
(
	[PasswordID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
