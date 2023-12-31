USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionLevel1Activity]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionLevel1Activity](
	[DecompositionLevel1ActivityID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionFunctionID] [int] NULL,
	[DecompositionPhaseID] [int] NULL,
	[Level1ActivityName] [varchar](512) NULL,
	[Level1ActivityDescription] [varchar](512) NULL,
	[Level1ActivityMeaning] [varchar](512) NULL,
	[Level1ActivityDeisgnChoice] [varchar](100) NULL,
	[GridViewLocationID] [float] NULL,
	[GridVViewLocationFlag] [bit] NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_DecompositionLevel1Activity] PRIMARY KEY CLUSTERED 
(
	[DecompositionLevel1ActivityID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionLevel1Activity]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionLevel1Activity_DecompositionLevel1Activity] FOREIGN KEY([DecompositionFunctionID])
REFERENCES [Amplo].[DecompositionFunction] ([DecompositionFunctionID])
GO
ALTER TABLE [Amplo].[DecompositionLevel1Activity] CHECK CONSTRAINT [FK_DecompositionLevel1Activity_DecompositionLevel1Activity]
GO
