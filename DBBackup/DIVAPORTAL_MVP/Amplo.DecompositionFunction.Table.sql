USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionFunction]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionFunction](
	[DecompositionFunctionID] [int] IDENTITY(1,1) NOT NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[FunctionName] [varchar](100) NULL,
	[FunctionTilte] [varchar](100) NULL,
	[FunctionDescription] [varchar](2000) NULL,
	[FunctionMeaning] [varchar](2000) NULL,
	[ProcesDeisgnChoice] [varchar](100) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[rowguid] [uniqueidentifier] NULL,
	[FunctionNumber] [int] NULL,
 CONSTRAINT [PK_DecompositionPhaseFunction] PRIMARY KEY CLUSTERED 
(
	[DecompositionFunctionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionFunction] ADD  CONSTRAINT [DF_DecompositionPhaseFunction_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
