USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[AmploRatings]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploRatings](
	[RatingID] [int] NULL,
	[RatingName] [varchar](50) NULL,
	[RatingDescription] [varchar](512) NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL
) ON [PRIMARY]
GO
