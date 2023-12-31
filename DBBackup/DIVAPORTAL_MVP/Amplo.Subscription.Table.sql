USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[Subscription]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Subscription](
	[SubscriptionID] [int] NOT NULL,
	[SubscriptionName] [varchar](100) NOT NULL,
	[SubscriptionDescription] [varchar](256) NULL,
	[SubscriptionKey] [varchar](50) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[StartDate] [nchar](10) NULL,
	[EndDate] [nchar](10) NULL,
	[Created_By] [varchar](50) NULL,
	[Created_On] [datetime] NULL,
	[Modified_By] [varchar](50) NULL,
	[Modified_Date] [datetime] NULL,
 CONSTRAINT [PK_Subscription] PRIMARY KEY CLUSTERED 
(
	[SubscriptionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[Subscription] ADD  CONSTRAINT [DF_Subscription_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
