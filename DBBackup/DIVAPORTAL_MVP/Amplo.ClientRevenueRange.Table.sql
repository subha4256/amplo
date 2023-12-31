USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[ClientRevenueRange]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[ClientRevenueRange](
	[ClientRevenueRangeID] [int] NOT NULL,
	[ClientRevenueRangeName] [varchar](100) NOT NULL,
	[ClientRevenueRangeDescription] [varchar](255) NULL,
	[ClientRevenueRangeISEnabled] [varchar](5) NULL,
	[ClientRevenueRangeCreatedBy] [varchar](100) NULL,
	[ClientRevenueRangeCreatedDate] [datetime] NULL,
	[ClientRevenueRangeModifiedBy] [varchar](100) NULL,
	[ClientRevenueRangeModifie_Date] [datetime] NULL,
 CONSTRAINT [PK_ClientRevenueRange] PRIMARY KEY CLUSTERED 
(
	[ClientRevenueRangeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
