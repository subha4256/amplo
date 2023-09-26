USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[UserReportAccess]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UserReportAccess](
	[UserReportAccessID] [int] IDENTITY(1,1) NOT NULL,
	[UserReportAccessName] [varchar](100) NULL,
	[ClientID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[ServiceID] [int] NOT NULL,
	[AccessType] [int] NOT NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_UserReportAccess] PRIMARY KEY CLUSTERED 
(
	[UserReportAccessID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
