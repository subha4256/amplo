USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[Country]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Country](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[iso] [char](2) NOT NULL,
	[name] [varchar](80) NOT NULL,
	[nicename] [varchar](80) NOT NULL,
	[iso3] [char](3) NULL,
	[numcode] [int] NULL,
	[phonecode] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[Country] ADD  DEFAULT (NULL) FOR [iso3]
GO
ALTER TABLE [Amplo].[Country] ADD  DEFAULT (NULL) FOR [numcode]
GO
