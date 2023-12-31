USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel4]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel4](
	[DecompositionProcessLevel4ID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProjectID] [int] NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NULL,
	[DecompositionProcessLevel3ID] [int] NULL,
	[ProcessLevel4NodeID] [varchar](50) NULL,
	[ProcessLevel4Name] [varchar](100) NULL,
	[ProcessLevel4Title] [varchar](100) NULL,
	[ProcessLevel4Description] [varchar](512) NULL,
	[Owner] [varchar](100) NULL,
	[CountrySpecific] [varchar](100) NULL,
	[LeafNodeFlag] [bit] NULL,
	[DisableDate] [date] NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel4] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel4ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel4] ADD  CONSTRAINT [DF_DecompositionProcessLevel4_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel4]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel4_DecompositionProcessLevel3] FOREIGN KEY([DecompositionProcessLevel3ID])
REFERENCES [Amplo].[DecompositionProcessLevel3] ([DecompositionProcessLevel3ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel4] CHECK CONSTRAINT [FK_DecompositionProcessLevel4_DecompositionProcessLevel3]
GO
