USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[User]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[User](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](100) NOT NULL,
	[FirstName] [varchar](100) NOT NULL,
	[MiddleName] [varchar](50) NULL,
	[LastName] [varchar](100) NOT NULL,
	[PhoneNumber] [nvarchar](100) NOT NULL,
	[EmailAddress] [nvarchar](256) NULL,
	[UserPassword] [nvarchar](256) NOT NULL,
	[EmailValidationStatus] [bit] NULL,
	[ActiveFlag] [bit] NULL,
	[ClientID] [int] NULL,
	[UserLinkedINProfileID] [varchar](255) NULL,
	[UserTypeID] [int] NULL,
	[UserStatusID] [int] NULL,
	[ProfilePhotoPath] [nvarchar](100) NULL,
	[UserCreatedBy] [varchar](100) NULL,
	[UserCreatedDate] [varchar](255) NULL,
	[UserModifiedBy] [varchar](100) NULL,
	[UserModifiedDate] [datetime] NULL,
	[DisableDate] [datetime] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_client] FOREIGN KEY([UserTypeID])
REFERENCES [Amplo].[UserType] ([UserTypeID])
GO
ALTER TABLE [Amplo].[User] CHECK CONSTRAINT [FK_User_client]
GO
