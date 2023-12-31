USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[AmploUser]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploUser](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](100) NOT NULL,
	[FirstName] [varchar](100) NOT NULL,
	[MiddleName] [varchar](50) NULL,
	[LastName] [varbinary](100) NOT NULL,
	[EmployeeID] [nvarchar](50) NOT NULL,
	[PhoneNumber] [nvarchar](256) NULL,
	[EmailAddress] [nvarchar](250) NULL,
	[UserPassword] [nvarchar](256) NOT NULL,
	[ActiveFlag] [bit] NOT NULL,
	[UserTypeID] [int] NULL,
	[Email_Validation_Status] [bit] NULL,
	[UserStatusID] [int] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploUser] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[AmploUser]  WITH CHECK ADD  CONSTRAINT [FK_AmploUsers_AmploUsers] FOREIGN KEY([UserTypeID])
REFERENCES [Amplo].[UserType] ([UserTypeID])
GO
ALTER TABLE [Amplo].[AmploUser] CHECK CONSTRAINT [FK_AmploUsers_AmploUsers]
GO
ALTER TABLE [Amplo].[AmploUser]  WITH CHECK ADD  CONSTRAINT [FK_AmploUsers_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [HumanResources].[Employee] ([EmployeeID])
GO
ALTER TABLE [Amplo].[AmploUser] CHECK CONSTRAINT [FK_AmploUsers_Employee]
GO
