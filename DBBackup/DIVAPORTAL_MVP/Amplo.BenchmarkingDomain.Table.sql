USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[BenchmarkingDomain]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkingDomain](
	[DomainID] [int] NOT NULL,
	[DomainName] [varchar](50) NOT NULL,
	[DomainDescription] [varchar](512) NULL,
	[ActiveFlag] [varchar](5) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_BenchmarkDomain] PRIMARY KEY CLUSTERED 
(
	[DomainID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[BenchmarkingDomain] ADD  CONSTRAINT [DF_BenchmarkDomain_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
