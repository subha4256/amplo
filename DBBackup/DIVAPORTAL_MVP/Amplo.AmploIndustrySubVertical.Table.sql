USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[AmploIndustrySubVertical]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploIndustrySubVertical](
	[IndustrySubVerticalID] [int] IDENTITY(1,1) NOT NULL,
	[IndustryVerticalID] [int] NOT NULL,
	[IndustrySubVerticalName] [varchar](100) NOT NULL,
	[IndustryVerticalDescription] [varchar](512) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_IndustrySubVertical] PRIMARY KEY CLUSTERED 
(
	[IndustrySubVerticalID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[AmploIndustrySubVertical] ADD  CONSTRAINT [DF_IndustrySubVertical_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[AmploIndustrySubVertical]  WITH CHECK ADD  CONSTRAINT [FK_AmploIndustrySubVertical_AmploIndustryVertical] FOREIGN KEY([IndustryVerticalID])
REFERENCES [Amplo].[AmploIndustryVertical] ([IndustryVerticalID])
GO
ALTER TABLE [Amplo].[AmploIndustrySubVertical] CHECK CONSTRAINT [FK_AmploIndustrySubVertical_AmploIndustryVertical]
GO
