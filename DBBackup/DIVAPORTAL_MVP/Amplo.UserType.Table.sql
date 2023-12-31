USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[UserType]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UserType](
	[UserTypeID] [int] NOT NULL,
	[UserTypeName] [varchar](100) NOT NULL,
	[UserTypeDescription] [varchar](255) NULL,
	[UserTypeIsEnabled] [varchar](5) NULL,
	[UserCategoryID] [int] NULL,
	[UserTypeCreatedBy] [varchar](100) NULL,
	[UserTypeCreatedOn] [datetime] NULL,
	[UserTypeModifiedBy] [varchar](100) NULL,
	[UserTypeCreatedDate] [datetime] NULL,
 CONSTRAINT [PK_UserType] PRIMARY KEY CLUSTERED 
(
	[UserTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
