USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[BenchmarkStatus]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkStatus](
	[StatusID] [int] IDENTITY(1,1) NOT NULL,
	[StatusName] [varchar](100) NOT NULL,
	[StatusDescription] [varchar](512) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
 CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED 
(
	[StatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
