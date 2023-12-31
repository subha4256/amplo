USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[FunctionalResources]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[FunctionalResources](
	[FunctionalResourceID] [int] IDENTITY(1,1) NOT NULL,
	[ServicesID] [int] NULL,
	[MenuName] [varchar](50) NOT NULL,
	[MenuURL] [varchar](50) NULL,
	[MenuParentID] [int] NULL,
	[MenuDescription] [varchar](50) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[Created_By] [varchar](50) NULL,
	[Created_Date] [datetime] NULL,
	[Modified_By] [varchar](50) NULL,
	[Modified_Date] [datetime] NULL,
	[ConfigurationFlag] [bit] NULL,
	[Category] [varchar](100) NULL,
	[IconPath] [varchar](100) NULL,
 CONSTRAINT [PK_FunctionalResources] PRIMARY KEY CLUSTERED 
(
	[FunctionalResourceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[FunctionalResources] ADD  CONSTRAINT [DF_FunctionalResources_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
