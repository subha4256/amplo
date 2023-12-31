USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionFunctionProject]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionFunctionProject](
	[DecompositionFunctionProjectID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[UserID] [int] NULL,
	[DecompositionProjectID] [int] NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[FunctionNumber] [int] NULL,
	[FunctionName] [varchar](100) NULL,
	[FunctionTitle] [varchar](100) NULL,
	[FunctionDescription] [varchar](2000) NULL,
	[FunctionMeaning] [varchar](2000) NULL,
	[ProcesDeisgnChoice] [varchar](100) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
 CONSTRAINT [PK_DecompositionFunctionProject] PRIMARY KEY CLUSTERED 
(
	[DecompositionFunctionProjectID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionFunctionProject] ADD  CONSTRAINT [DF_DecompositionFunctionProject_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
