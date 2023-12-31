USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[StateProvince]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[StateProvince](
	[StateProvinceID] [tinyint] NOT NULL,
	[StateProvinceCode] [nvarchar](50) NOT NULL,
	[CountryRegionCode] [nvarchar](50) NOT NULL,
	[IsOnlyStateProvinceFlag] [bit] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[TerritoryID] [tinyint] NOT NULL,
	[rowguid] [nvarchar](50) NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL
) ON [PRIMARY]
GO
