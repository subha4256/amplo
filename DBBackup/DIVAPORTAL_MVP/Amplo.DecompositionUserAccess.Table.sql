USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionUserAccess]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionUserAccess](
	[DecompositionUserAccessID] [int] IDENTITY(1,1) NOT NULL,
	[UserAccessName] [varchar](100) NULL,
	[UserAccessDescription] [varchar](512) NULL,
	[ClientID] [int] NULL,
	[UserID] [int] NULL,
	[DecompositionProjectID] [int] NULL,
	[FunctionID] [int] NULL,
	[PhaseID] [int] NULL,
	[ActiveFlag] [bit] NULL,
	[CreadedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_DecompositionUserAccess] PRIMARY KEY CLUSTERED 
(
	[DecompositionUserAccessID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
