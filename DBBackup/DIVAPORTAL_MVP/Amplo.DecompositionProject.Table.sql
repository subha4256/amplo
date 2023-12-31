USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionProject]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProject](
	[DecompositionProjectID] [int] IDENTITY(1,1) NOT NULL,
	[ProjectName] [varchar](100) NOT NULL,
	[ProjectDescription] [varchar](256) NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[DisableDate] [date] NULL,
	[ClientID] [int] NULL,
	[DisabledFlag] [bit] NULL,
	[StatusID] [int] NULL,
	[LockedFlag] [bit] NULL,
	[ServiceID] [int] NULL,
 CONSTRAINT [PK_DecompositionProject] PRIMARY KEY CLUSTERED 
(
	[DecompositionProjectID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionProject] ADD  CONSTRAINT [DF_DecompositionProject_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionProject]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProject_ProjectStatus] FOREIGN KEY([StatusID])
REFERENCES [Amplo].[DecompositionStatus] ([StatusID])
GO
ALTER TABLE [Amplo].[DecompositionProject] CHECK CONSTRAINT [FK_AmploDecompositionProject_ProjectStatus]
GO
