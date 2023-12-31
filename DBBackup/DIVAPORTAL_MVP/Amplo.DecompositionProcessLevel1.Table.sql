USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel1]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel1](
	[DecompositionProcessLevel1ID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[UserID] [int] NULL,
	[DecompositionProjectID] [int] NULL,
	[ProcessLevel1Name] [varchar](100) NULL,
	[ProcessLevel1Title] [varchar](100) NULL,
	[ProcessLevel1Description] [varchar](512) NULL,
	[FunctionID] [int] NULL,
	[PhaseID] [int] NULL,
	[LockedFlag] [bit] NULL,
	[Status] [int] NULL,
	[DesignChoice] [varchar](100) NULL,
	[LockedBy] [varchar](100) NULL,
	[LockedDateTime] [datetime] NULL,
	[GridViewLocationID] [int] NULL,
	[GridVViewLocationFlag] [int] NULL,
	[GridViewPreviousLocationID] [int] NULL,
	[ActiveFlag] [bit] NOT NULL,
 CONSTRAINT [PK_DecompositionProcessLevel1] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel1ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel1] ADD  CONSTRAINT [DF_DecompositionProcessLevel1_ActiveFlag_1]  DEFAULT ((1)) FOR [ActiveFlag]
GO
