USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel3]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel3](
	[DecompositionProcessLevel3ID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProjectID] [int] NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NULL,
	[ProcessLevel3NodeID] [varchar](50) NULL,
	[ProcessLevel3Name] [varchar](100) NULL,
	[ProcessLevel3Title] [varchar](100) NULL,
	[ProcessLevel3Description] [varchar](512) NULL,
	[Owner] [varchar](100) NULL,
	[CountrySpecific] [varchar](100) NULL,
	[LeafNodeFlag] [bit] NULL,
	[DisableDate] [date] NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel3] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel3ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel3] ADD  CONSTRAINT [DF_DecompositionProcessLevel3_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel3]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel3_DecompositionProcessLevel2] FOREIGN KEY([DecompositionProcessLevel2ID])
REFERENCES [Amplo].[DecompositionProcessLevel2] ([DecompositionProcessLevel2ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel3] CHECK CONSTRAINT [FK_DecompositionProcessLevel3_DecompositionProcessLevel2]
GO
