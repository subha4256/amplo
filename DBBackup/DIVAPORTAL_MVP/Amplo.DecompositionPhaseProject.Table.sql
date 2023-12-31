USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionPhaseProject]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionPhaseProject](
	[DecompositionPhaseProjectID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[UserID] [int] NULL,
	[DecompositionProjectID] [int] NULL,
	[PhaseName] [varchar](100) NOT NULL,
	[PhaseTitle] [varchar](100) NULL,
	[PhaseDescription] [varchar](512) NULL,
	[PhaseMeaning] [varchar](512) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[PhaseNumber] [int] NULL,
 CONSTRAINT [PK_DecompositionPhaseProjectID] PRIMARY KEY CLUSTERED 
(
	[DecompositionPhaseProjectID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionPhaseProject] ADD  CONSTRAINT [DF_DecompositionPhaseProject_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionPhaseProject]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionPhaseProject_DecompositionProject] FOREIGN KEY([DecompositionProjectID])
REFERENCES [Amplo].[DecompositionProject] ([DecompositionProjectID])
GO
ALTER TABLE [Amplo].[DecompositionPhaseProject] CHECK CONSTRAINT [FK_DecompositionPhaseProject_DecompositionProject]
GO
ALTER TABLE [Amplo].[DecompositionPhaseProject]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionPhaseProject_User] FOREIGN KEY([UserID])
REFERENCES [Amplo].[User] ([UserID])
GO
ALTER TABLE [Amplo].[DecompositionPhaseProject] CHECK CONSTRAINT [FK_DecompositionPhaseProject_User]
GO
