USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[Client]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Client](
	[ClientID] [int] IDENTITY(1,1) NOT NULL,
	[ClientName] [varchar](100) NULL,
	[ClientBusinessUnit] [varchar](100) NULL,
	[ClientParentCompany] [varchar](100) NULL,
	[IndustryID] [int] NULL,
	[ClientRevenueRangeID] [int] NULL,
	[PhoneNumber] [nvarchar](50) NOT NULL,
	[EmailAddress] [nvarchar](100) NULL,
	[SubscriptionKey] [varchar](100) NULL,
	[PrimaryUserID] [int] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[RegistrationModeID] [int] NULL,
	[ClientCreatedBy] [varchar](100) NULL,
	[ClientCreatedDate] [datetime] NULL,
	[ClientModifiedBy] [varchar](100) NULL,
	[ClientModifiedDate] [datetime] NULL,
	[ClientStatus] [varchar](50) NULL,
 CONSTRAINT [PK_client] PRIMARY KEY CLUSTERED 
(
	[ClientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
