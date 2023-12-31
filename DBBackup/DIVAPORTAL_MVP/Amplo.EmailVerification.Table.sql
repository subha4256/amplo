USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[EmailVerification]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[EmailVerification](
	[EmailVerificationID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[UserName] [varchar](100) NULL,
	[VerificationHashCode] [varchar](512) NULL,
	[VerificationHashCodeDate] [datetime] NULL,
	[VerificationFlag] [bit] NULL,
	[ActiveFlag] [bit] NULL,
	[VerificationDate] [datetime] NULL,
	[VerificationRemarks] [varchar](100) NULL,
	[UserIPAddress] [varchar](100) NULL,
	[BeginDateTime] [datetime] NULL,
	[EndDateTime] [datetime] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_EmailVerificationID] PRIMARY KEY CLUSTERED 
(
	[EmailVerificationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
