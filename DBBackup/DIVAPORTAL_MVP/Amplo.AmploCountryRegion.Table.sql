USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[AmploCountryRegion]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploCountryRegion](
	[CountryRegionID] [int] IDENTITY(1,1) NOT NULL,
	[CountryRegionCode] [varchar](100) NOT NULL,
	[Name] [varchar](100) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploCountryRegion] PRIMARY KEY CLUSTERED 
(
	[CountryRegionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
