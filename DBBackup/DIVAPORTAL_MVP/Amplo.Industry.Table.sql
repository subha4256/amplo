USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[Industry]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Industry](
	[IndustryID] [int] NOT NULL,
	[IndustryName] [varchar](100) NOT NULL,
	[IndustryDescription] [varchar](255) NULL,
	[IndustryCreatedBy] [varchar](100) NULL,
	[IndustryCreatedDate] [datetime] NULL,
	[IndustryModifiedBy] [varchar](100) NULL,
	[IndustryModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_Industry] PRIMARY KEY CLUSTERED 
(
	[IndustryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
