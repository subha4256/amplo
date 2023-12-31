USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[RegistrationMode]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[RegistrationMode](
	[RegistrationModeID] [int] IDENTITY(1,1) NOT NULL,
	[RegistrationModeName] [varchar](50) NOT NULL,
	[RegistrationModeDescription] [varchar](100) NOT NULL,
	[RegistrationModeActiveFlag] [bit] NOT NULL,
	[RegistrationModeCreatedBy] [varchar](100) NULL,
	[RegistrationModeCreatedDate] [datetime] NULL,
	[RegistrationModeModifiedBy] [varchar](100) NULL,
	[RegistrationModeModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_RegistrationMode] PRIMARY KEY CLUSTERED 
(
	[RegistrationModeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
