USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[AmploDomain]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploDomain](
	[DomainID] [int] IDENTITY(1,1) NOT NULL,
	[DomianName] [varchar](100) NOT NULL,
	[DomainDescription] [varchar](max) NOT NULL,
	[DomainComments] [nchar](10) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploDomain] PRIMARY KEY CLUSTERED 
(
	[DomainID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [Amplo].[AmploDomain] ADD  CONSTRAINT [DF_AmploDomain_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
