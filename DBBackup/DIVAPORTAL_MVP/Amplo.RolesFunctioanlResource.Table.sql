USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[RolesFunctioanlResource]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[RolesFunctioanlResource](
	[RolesFunctioanlResourceID] [int] IDENTITY(1,1) NOT NULL,
	[RoleID] [int] NOT NULL,
	[FunctioanlResourceID] [int] NOT NULL,
	[Action] [varchar](50) NULL,
	[ActionFlag] [bit] NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploRolesFunctioanlResources] PRIMARY KEY CLUSTERED 
(
	[RolesFunctioanlResourceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[RolesFunctioanlResource]  WITH CHECK ADD  CONSTRAINT [FK_RolesFunctioanlResource_Role] FOREIGN KEY([RoleID])
REFERENCES [Amplo].[Role] ([RoleID])
GO
ALTER TABLE [Amplo].[RolesFunctioanlResource] CHECK CONSTRAINT [FK_RolesFunctioanlResource_Role]
GO
