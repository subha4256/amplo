USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[UserStatus]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UserStatus](
	[UserStatusID] [int] NOT NULL,
	[UserStatusName] [varchar](100) NOT NULL,
	[UserStatusIsEnabled] [varchar](5) NULL,
	[UserStatusCreatedBy] [varchar](100) NULL,
	[UserStatusCreatedDate] [datetime] NULL,
	[UserStatusModifiedBy] [varchar](100) NULL,
	[UserStatusModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_User_Status] PRIMARY KEY CLUSTERED 
(
	[UserStatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
