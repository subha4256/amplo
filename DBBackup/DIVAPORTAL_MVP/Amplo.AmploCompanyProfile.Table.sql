USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[AmploCompanyProfile]    Script Date: 20-11-2019 15:28:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploCompanyProfile](
	[CompanyProfileID] [int] NOT NULL,
	[ClientID] [int] NULL,
	[CountryRegionCodeID] [int] NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[NoOfEmployees] [int] NULL,
	[Country] [varchar](100) NULL,
	[StateTerritory] [varchar](100) NULL,
	[City] [nvarchar](50) NULL,
	[PostalCode] [nvarchar](15) NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploCompanyProfile] PRIMARY KEY CLUSTERED 
(
	[CompanyProfileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[AmploCompanyProfile]  WITH CHECK ADD  CONSTRAINT [FK_AmploCompanyProfile_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[AmploCompanyProfile] CHECK CONSTRAINT [FK_AmploCompanyProfile_Client]
GO
