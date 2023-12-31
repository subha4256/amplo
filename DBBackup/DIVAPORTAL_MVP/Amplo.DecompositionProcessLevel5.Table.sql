USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel5]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel5](
	[DecompositionProcessLevel5ID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProjectID] [int] NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NULL,
	[DecompositionProcessLevel3ID] [int] NULL,
	[DecompositionProcessLevel4ID] [int] NULL,
	[ProcessLevel5NodeID] [varchar](50) NULL,
	[ProcessLevel5Name] [varchar](100) NULL,
	[ProcessLevel5Title] [varchar](100) NULL,
	[ProcessLevel5Description] [varchar](512) NULL,
	[LeafNodeFlag] [bit] NULL,
	[Owner] [varchar](100) NULL,
	[CountrySpecific] [varchar](100) NULL,
	[DisableDate] [date] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel5] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel5ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel5] ADD  CONSTRAINT [DF_DecompositionProcessLevel5_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel5]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel5_DecompositionProcessLevel4] FOREIGN KEY([DecompositionProcessLevel4ID])
REFERENCES [Amplo].[DecompositionProcessLevel4] ([DecompositionProcessLevel4ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel5] CHECK CONSTRAINT [FK_DecompositionProcessLevel5_DecompositionProcessLevel4]
GO
