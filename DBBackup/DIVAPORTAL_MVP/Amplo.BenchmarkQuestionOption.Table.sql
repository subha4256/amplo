USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[BenchmarkQuestionOption]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkQuestionOption](
	[BenchmarkQuestionOptionID] [int] IDENTITY(1,1) NOT NULL,
	[BenchmarkQuestionID] [int] NOT NULL,
	[OptionName] [varchar](100) NULL,
	[OptionDescription] [varchar](2000) NOT NULL,
	[OptionIconPath] [varchar](100) NULL,
	[OptionWeightage] [int] NULL,
	[OptionDesignChoice] [nchar](10) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedOn] [datetime] NULL,
 CONSTRAINT [PK_BenchmarkQuestionOption] PRIMARY KEY CLUSTERED 
(
	[BenchmarkQuestionOptionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[BenchmarkQuestionOption]  WITH CHECK ADD  CONSTRAINT [FK_BenchmarkQuestionOption_BenchmarkQuestion] FOREIGN KEY([BenchmarkQuestionID])
REFERENCES [Amplo].[BenchmarkQuestion] ([BenchmarkQuestionID])
GO
ALTER TABLE [Amplo].[BenchmarkQuestionOption] CHECK CONSTRAINT [FK_BenchmarkQuestionOption_BenchmarkQuestion]
GO
