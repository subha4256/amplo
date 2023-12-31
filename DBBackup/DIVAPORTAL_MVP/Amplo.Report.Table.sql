USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[Report]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Report](
	[ReportID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NOT NULL,
	[UserID] [int] NULL,
	[ServiceID] [int] NULL,
	[ReportTitle] [varchar](100) NULL,
	[ReportDescrption] [varchar](256) NULL,
	[ReportPath] [varchar](100) NULL,
	[ProjectID] [int] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
 CONSTRAINT [PK_Amplo_Report] PRIMARY KEY CLUSTERED 
(
	[ReportID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[Report] ADD  CONSTRAINT [DF_Report_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
