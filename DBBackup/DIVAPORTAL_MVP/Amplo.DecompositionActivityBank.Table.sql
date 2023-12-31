USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionActivityBank]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionActivityBank](
	[ActivityBankID] [int] IDENTITY(1,1) NOT NULL,
	[ActivityBanName] [varchar](100) NULL,
	[DecompositionFunctionID] [int] NULL,
	[ProcessLevel1ActivityName] [varchar](512) NULL,
	[ProcessLevel1ActivityDescription] [varchar](512) NULL,
	[ProcessLevel1Meaning] [varchar](512) NULL,
	[ProcesDeisgnChoice] [varchar](100) NULL,
	[DecompositionPhaseID] [int] NULL,
	[ProcessLevel1ActivityLocation] [float] NULL,
	[GridVViewLocationFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_DecompositionActivityBank] PRIMARY KEY CLUSTERED 
(
	[ActivityBankID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionActivityBank]  WITH CHECK ADD  CONSTRAINT [FK_ActivityBank_DecompositionFunction] FOREIGN KEY([DecompositionFunctionID])
REFERENCES [Amplo].[DecompositionFunction] ([DecompositionFunctionID])
GO
ALTER TABLE [Amplo].[DecompositionActivityBank] CHECK CONSTRAINT [FK_ActivityBank_DecompositionFunction]
GO
