USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionLevel1ActivityBank]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionLevel1ActivityBank](
	[DecompositionLevel1ActivityBankID] [int] IDENTITY(1,1) NOT NULL,
	[Level1ActivityBankName] [varchar](100) NULL,
	[DecompositionProjectUserID] [int] NULL,
	[ProcessName] [varchar](100) NULL,
	[ProcessDescription] [varchar](512) NULL,
	[ProcessLevel1Meaning] [varchar](512) NULL,
	[GridViewLocationID] [int] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_DecompositionLevel1ActivityBank] PRIMARY KEY CLUSTERED 
(
	[DecompositionLevel1ActivityBankID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[DecompositionLevel1ActivityBank] ADD  CONSTRAINT [DF_DecompositionLevel1ActivityBank_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionLevel1ActivityBank]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionLevel1ActivityBank_DecompositionProjectUser] FOREIGN KEY([DecompositionProjectUserID])
REFERENCES [Amplo].[DecompositionProjectUser] ([DecompositionProjectUserID])
GO
ALTER TABLE [Amplo].[DecompositionLevel1ActivityBank] CHECK CONSTRAINT [FK_DecompositionLevel1ActivityBank_DecompositionProjectUser]
GO
