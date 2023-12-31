USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[UserCategory]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UserCategory](
	[UserCategoryID] [int] IDENTITY(1,1) NOT NULL,
	[UserCategoryName] [varchar](100) NOT NULL,
	[UserCategoryDescription] [varchar](255) NULL,
	[ActiveFlag] [bit] NULL,
	[UserCategoryCreatedBy] [varchar](100) NULL,
	[UserCategoryModifiedBy] [varchar](100) NULL,
	[UserCategoryCreatedOn] [datetime] NULL,
	[UserCategoryCreatedDate] [datetime] NULL,
 CONSTRAINT [PK_UserCategory] PRIMARY KEY CLUSTERED 
(
	[UserCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
