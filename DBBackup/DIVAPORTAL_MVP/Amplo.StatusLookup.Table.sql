USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[StatusLookup]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[StatusLookup](
	[StatusLookupID] [int] IDENTITY(1,1) NOT NULL,
	[LookupCode] [varchar](100) NULL,
	[LookupName] [varchar](100) NULL,
	[LookupTitle] [varchar](100) NULL,
	[LookupCategory] [varchar](100) NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
 CONSTRAINT [PK_StatusLookup] PRIMARY KEY CLUSTERED 
(
	[StatusLookupID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[StatusLookup] ADD  CONSTRAINT [DF_StatusLookup_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
