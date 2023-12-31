USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[UserAccessResource]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UserAccessResource](
	[UserAccessResourceID] [int] IDENTITY(1,1) NOT NULL,
	[UserAccessResourceName] [varchar](100) NOT NULL,
	[ResourceDescription] [varchar](512) NULL,
	[SubscriptionID] [int] NULL,
	[ClientID] [int] NULL,
	[RoleID] [int] NULL,
	[BeginDate] [date] NULL,
	[EndDate] [date] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[Created_By] [varchar](50) NULL,
	[Created_Date] [datetime] NULL,
	[Modified_By] [varchar](50) NULL,
	[Modified_Date] [datetime] NULL,
	[ConfigurationFlag] [bit] NULL,
 CONSTRAINT [PK_UserAccessResource] PRIMARY KEY CLUSTERED 
(
	[UserAccessResourceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[UserAccessResource] ADD  CONSTRAINT [DF_FUserAccessResource_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
