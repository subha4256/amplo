USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[RestrictedEmailDomain]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[RestrictedEmailDomain](
	[RestrictedEmailDomainID] [int] IDENTITY(1,1) NOT NULL,
	[EmailDomainName] [varchar](50) NOT NULL,
	[EmailDomainDescription] [varchar](255) NULL,
	[ActiveFlag] [bit] NULL,
	[Created_By] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_EmailDomain] PRIMARY KEY CLUSTERED 
(
	[RestrictedEmailDomainID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
