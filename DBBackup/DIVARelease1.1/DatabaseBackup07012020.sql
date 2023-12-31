USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[AmploCompanyProfile]    Script Date: 1/7/2020 6:55:30 PM ******/
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
	[Address1] [nvarchar](100) NULL,
	[Address2] [nvarchar](100) NULL,
	[CompanyLogo] [nvarchar](100) NULL,
	[Country] [varchar](100) NULL,
	[StateTerritory] [varchar](100) NULL,
	[City] [nvarchar](50) NULL,
	[PostalCode] [nvarchar](15) NULL,
	[ActiveFlag] [bit] NULL,
	[SubscriptionID] [int] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[ClientName] [nvarchar](255) NULL,
	[FirstName] [varchar](100) NULL,
	[MiddleName] [varchar](100) NULL,
	[LastName] [varchar](100) NULL,
	[EmailAddress] [nvarchar](100) NULL,
 CONSTRAINT [PK_AmploCompanyProfile] PRIMARY KEY CLUSTERED 
(
	[CompanyProfileID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploCountryRegion]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploCountryRegion](
	[CountryRegionID] [int] IDENTITY(1,1) NOT NULL,
	[CountryRegionCode] [varchar](100) NOT NULL,
	[Name] [varchar](100) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploCountryRegion] PRIMARY KEY CLUSTERED 
(
	[CountryRegionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploDecompositionProcessLevel1]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploDecompositionProcessLevel1](
	[AmploDecompositionProcessLevel1ID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionFunctionID] [int] NULL,
	[DecompositionPhaseID] [int] NULL,
	[ProcessLevel1Name] [varchar](100) NULL,
	[ProceeLevel1Title] [varchar](100) NOT NULL,
	[ProcessLevel1Description] [varchar](512) NULL,
	[ProcessLevel1Meaning] [varchar](512) NULL,
	[DesignChoice] [varchar](100) NULL,
	[ProcessLevel1DeisgnChoice] [varchar](100) NULL,
	[GridViewLocationID] [float] NULL,
	[GridVViewLocationFlag] [bit] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploDecompositionProcessLevel1_1] PRIMARY KEY CLUSTERED 
(
	[AmploDecompositionProcessLevel1ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploDecompositionProcessLevel1Template]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploDecompositionProcessLevel1Template](
	[AmploDecompositionProcessLevel1TemplateID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionFunctionID] [int] NULL,
	[DecompositionPhaseID] [int] NULL,
	[ProcessLevel1Name] [varchar](100) NULL,
	[ProceeLevel1Title] [varchar](100) NOT NULL,
	[ProcessLevel1Description] [varchar](512) NULL,
	[ProcessLevel1Meaning] [varchar](512) NULL,
	[DesignChoice] [varchar](100) NULL,
	[ProcessLevel1DeisgnChoice] [varchar](100) NULL,
	[GridViewLocationID] [float] NULL,
	[GridVViewLocationFlag] [bit] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[TemplateID] [int] NULL,
	[StyleID] [int] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
 CONSTRAINT [PK_AmploDecompositionProcessLevel1Template_1] PRIMARY KEY CLUSTERED 
(
	[AmploDecompositionProcessLevel1TemplateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploDecompositionProcessLevel2Template]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploDecompositionProcessLevel2Template](
	[DecompositionProcessLevel2TemplateID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1TemplateID] [int] NOT NULL,
	[ProcessLevel2NodeID] [varchar](50) NULL,
	[ProcessLevel2Name] [varchar](100) NULL,
	[ProcessLevel2Title] [varchar](100) NOT NULL,
	[ProcessLevel2Description] [varchar](512) NULL,
	[Owner] [varchar](100) NULL,
	[CountrySpecific] [varchar](100) NULL,
	[LeafNodeFlag] [bit] NULL,
	[DisableDate] [date] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel2_Template] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel2TemplateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploDecompositionProcessLevel3Template]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploDecompositionProcessLevel3Template](
	[DecompositionProcessLevel3TemplateID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1TempateID] [int] NULL,
	[DecompositionProcessLevel2TempateID] [int] NULL,
	[ProcessLevel3NodeID] [varchar](50) NULL,
	[ProcessLevel3Name] [varchar](100) NULL,
	[ProcessLevel3Title] [varchar](100) NOT NULL,
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
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel3Template] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel3TemplateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploDecompositionProcessLevel4Template]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploDecompositionProcessLevel4Template](
	[DecompositionProcessLevel4TemplateID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1TempateID] [int] NULL,
	[DecompositionProcessLevel2TempateID] [int] NULL,
	[DecompositionProcessLevel3TempateID] [int] NULL,
	[ProcessLevel4NodeID] [varchar](50) NULL,
	[ProcessLevel4Name] [varchar](100) NULL,
	[ProcessLevel4Title] [varchar](100) NOT NULL,
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
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel4Template] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel4TemplateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploDecompositionProcessLevel5Template]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploDecompositionProcessLevel5Template](
	[DecompositionProcessLevel5TemplateID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1TemplateID] [int] NULL,
	[DecompositionProcessLevel2TemplateID] [int] NULL,
	[DecompositionProcessLevel3TemplateID] [int] NULL,
	[DecompositionProcessLevel4TemplateID] [int] NULL,
	[ProcessLevel5NodeID] [varchar](50) NULL,
	[ProcessLevel5Name] [varchar](100) NULL,
	[ProcessLevel5Title] [varchar](100) NOT NULL,
	[ProcessLevel5Description] [varchar](512) NULL,
	[LeafNodeFlag] [bit] NULL,
	[Owner] [varchar](100) NULL,
	[CountrySpecific] [varchar](100) NULL,
	[DisableDate] [date] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel5Template] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel5TemplateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploDomain]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploDomain](
	[DomainID] [int] IDENTITY(1,1) NOT NULL,
	[DomianName] [varchar](100) NOT NULL,
	[DomainDescription] [varchar](max) NOT NULL,
	[DomainComments] [nchar](10) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploDomain] PRIMARY KEY CLUSTERED 
(
	[DomainID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploIndustry]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploIndustry](
	[IndustryID] [int] NOT NULL,
	[IndustryName] [varchar](100) NOT NULL,
	[IndustryDescription] [varchar](255) NULL,
	[IndustryCreatedBy] [varchar](100) NULL,
	[IndustryCreatedDate] [datetime] NULL,
	[IndustryModifiedBy] [varchar](100) NULL,
	[IndustryModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploIndustry] PRIMARY KEY CLUSTERED 
(
	[IndustryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploIndustrySubVertical]    Script Date: 1/7/2020 6:55:31 PM ******/
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
/****** Object:  Table [Amplo].[AmploIndustryVertical]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploIndustryVertical](
	[IndustryVerticalID] [int] IDENTITY(1,1) NOT NULL,
	[IndustryVerticalName] [varchar](100) NOT NULL,
	[IndustryVerticalDescription] [varchar](512) NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_IndustryVertical] PRIMARY KEY CLUSTERED 
(
	[IndustryVerticalID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploProfilingAnswers]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploProfilingAnswers](
	[ProfilingAnswersID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[CompanyProfileID] [int] NULL,
	[ProfilingQuestionID] [int] NULL,
	[ProfilingAnswers] [varchar](max) NULL,
	[ProfilingRatings] [int] NULL,
	[ProfilingAnswersFeedback] [varchar](512) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploProfilingAnswers] PRIMARY KEY CLUSTERED 
(
	[ProfilingAnswersID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploProfilingQuestions]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploProfilingQuestions](
	[QuestionID] [int] IDENTITY(1,1) NOT NULL,
	[Question] [varchar](max) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[Option1] [varchar](512) NULL,
	[Option2] [varchar](512) NULL,
	[Option3] [varchar](512) NULL,
	[Option4] [varchar](512) NULL,
	[Option5] [varchar](512) NULL,
 CONSTRAINT [PK_AmploProfilingQuestions] PRIMARY KEY CLUSTERED 
(
	[QuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploRatings]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploRatings](
	[RatingID] [int] NULL,
	[RatingName] [varchar](50) NULL,
	[RatingDescription] [varchar](512) NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploUser]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[AmploUser](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](100) NOT NULL,
	[FirstName] [varchar](100) NOT NULL,
	[MiddleName] [varchar](50) NULL,
	[LastName] [varbinary](100) NOT NULL,
	[EmployeeID] [nvarchar](50) NOT NULL,
	[PhoneNumber] [nvarchar](256) NULL,
	[EmailAddress] [nvarchar](250) NULL,
	[UserPassword] [nvarchar](256) NOT NULL,
	[ActiveFlag] [bit] NOT NULL,
	[UserTypeID] [int] NULL,
	[Email_Validation_Status] [bit] NULL,
	[UserStatusID] [int] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploUser] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkAssessment]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkAssessment](
	[BenchmarkAssessmentID] [int] IDENTITY(1,1) NOT NULL,
	[BenchmarkProjectID] [int] NOT NULL,
	[RegionID] [int] NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[DomainID] [int] NULL,
	[GroupID] [int] NULL,
	[QuestionID] [int] NOT NULL,
	[Response] [numeric](5, 2) NULL,
	[RessponseUserID] [varchar](100) NOT NULL,
	[ResponseDate] [datetime] NOT NULL,
	[LastResponse] [int] NULL,
	[LastResponseBy] [varchar](100) NULL,
	[LastResponseDate] [datetime] NULL,
	[ResponseComments] [varchar](512) NULL,
	[QuestionWeight] [int] NULL,
	[BenchMark] [int] NULL,
	[CreadedBy] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[ClientID] [int] NULL,
 CONSTRAINT [PK_BenchmarkAssessment] PRIMARY KEY CLUSTERED 
(
	[BenchmarkAssessmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkAuditLog]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkAuditLog](
	[BenchmarkAuditLogID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[BenchmarkProjectID] [int] NULL,
	[DomainID] [int] NULL,
	[QuestionGroup] [varchar](100) NULL,
	[QuestionSeries] [varchar](20) NULL,
	[QuestionCategory] [varchar](256) NULL,
	[QuestionID] [int] NULL,
	[Question] [varchar](2000) NULL,
	[QuestionWeightage] [int] NULL,
	[ResponseID] [numeric](5, 2) NULL,
	[Response] [varchar](2000) NULL,
	[ResponseUserID] [int] NULL,
	[ResponseUserName] [varchar](100) NULL,
	[ResponseTimeStamp] [datetime] NULL,
	[DesignChoice] [varchar](100) NULL,
	[FirstResponseFlag] [bit] NULL,
	[UserIPAddress] [varchar](100) NULL,
 CONSTRAINT [PK_BenchmarkAuditLog] PRIMARY KEY CLUSTERED 
(
	[BenchmarkAuditLogID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkGoalSetting]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkGoalSetting](
	[BenchmarkingGoalSettingID] [int] IDENTITY(1,1) NOT NULL,
	[BenchmarkProjectID] [int] NULL,
	[RegionID] [int] NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[DomainID] [int] NULL,
	[GoalSetting] [float] NULL,
	[GoalSettingRemarks] [varchar](2000) NULL,
	[CreadedBy] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[ASISBenchmark] [float] NULL,
	[IndustryBenchmark] [float] NULL,
 CONSTRAINT [PK_AmploBenchmarkingGoalSetting] PRIMARY KEY CLUSTERED 
(
	[BenchmarkingGoalSettingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkingDomain]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkingDomain](
	[DomainID] [int] NOT NULL,
	[DomainName] [varchar](50) NOT NULL,
	[DomainDescription] [varchar](512) NULL,
	[ActiveFlag] [varchar](5) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_BenchmarkDomain] PRIMARY KEY CLUSTERED 
(
	[DomainID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkingGoalSetting]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkingGoalSetting](
	[BenchmarkingGoalSettingID] [int] IDENTITY(1,1) NOT NULL,
	[BenchmarkProjectID] [int] NOT NULL,
	[ClientID] [int] NULL,
	[RegionID] [int] NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[IndustryBenchmark] [float] NULL,
	[ASISBenchmark] [float] NULL,
	[GoalSetting] [float] NULL,
	[GoalSettingRemarks] [varchar](2000) NULL,
	[CreadedBy] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[DomainID] [int] NULL,
 CONSTRAINT [PK_AmploBenchmarkingGoalSetting1] PRIMARY KEY CLUSTERED 
(
	[BenchmarkingGoalSettingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkingLevel]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkingLevel](
	[BenchmarkingLevelID] [int] IDENTITY(1,1) NOT NULL,
	[BenchmarkingLevelName] [varchar](100) NULL,
	[BenchmarkingDescription] [varchar](2000) NULL,
	[BenchmarkingCharacterizedby] [varchar](512) NULL,
	[BenchmarkingKeyEnablers] [varchar](100) NULL,
 CONSTRAINT [PK_BenchmarkingLevel] PRIMARY KEY CLUSTERED 
(
	[BenchmarkingLevelID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkProject]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkProject](
	[BenchmarkProjectID] [int] IDENTITY(1,1) NOT NULL,
	[BenchmarkProjectName] [varchar](100) NOT NULL,
	[BenchmarkProjectDescription] [varchar](2000) NULL,
	[ServiceID] [int] NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[status] [int] NULL,
	[DisableDate] [date] NULL,
	[DesignChoice] [varchar](100) NULL,
	[DisabledFlag] [bit] NULL,
	[DisableFlag] [bit] NULL,
	[ClientID] [int] NULL,
	[LockedFlag] [bit] NULL,
 CONSTRAINT [PK_AmploMaturityModeSet] PRIMARY KEY CLUSTERED 
(
	[BenchmarkProjectID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkProjectUser]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkProjectUser](
	[BenchmarkProjectUserID] [int] IDENTITY(1,1) NOT NULL,
	[BenchmarkProjectUserName] [varchar](100) NULL,
	[BenchmarkProjectID] [int] NOT NULL,
	[ClientID] [int] NULL,
	[UserID] [int] NOT NULL,
	[ActivityFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[ActiveFlag] [bit] NULL,
 CONSTRAINT [PK_AmploBenchmarkProjectUser] PRIMARY KEY CLUSTERED 
(
	[BenchmarkProjectUserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkQuestion]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkQuestion](
	[BenchmarkQuestionID] [int] IDENTITY(1,1) NOT NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[DomainID] [int] NOT NULL,
	[QuestionGroup] [varchar](10) NULL,
	[QuestionSeries] [float] NULL,
	[QuestionCategory] [varchar](256) NULL,
	[Question] [varchar](max) NOT NULL,
	[QuestionComments] [varchar](512) NULL,
	[QuestionWeightage] [int] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDdate] [datetime] NULL,
	[DesignChoice] [varchar](100) NULL,
 CONSTRAINT [PK_AmploBenchmarkQuestions] PRIMARY KEY CLUSTERED 
(
	[BenchmarkQuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkQuestionOption]    Script Date: 1/7/2020 6:55:31 PM ******/
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
/****** Object:  Table [Amplo].[BenchmarkStatus]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BenchmarkStatus](
	[StatusID] [int] IDENTITY(1,1) NOT NULL,
	[StatusName] [varchar](100) NOT NULL,
	[StatusDescription] [varchar](512) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
 CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED 
(
	[StatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BusinessEntity]    Script Date: 1/7/2020 6:55:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[BusinessEntity](
	[BusinessEntityID] [int] NOT NULL,
	[BusinessEntityName] [varchar](100) NULL,
	[BusinessDomain] [nvarchar](100) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_BusinessEntity] PRIMARY KEY CLUSTERED 
(
	[BusinessEntityID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[City]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[City](
	[FIPS] [nvarchar](50) NULL,
	[ISO] [varchar](50) NULL,
	[NAME] [varchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Client]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Client](
	[ClientID] [int] IDENTITY(1,1) NOT NULL,
	[ClientName] [varchar](100) NULL,
	[ClientBusinessUnit] [varchar](100) NULL,
	[ClientParentCompany] [varchar](100) NULL,
	[IndustryID] [int] NULL,
	[ClientRevenueRangeID] [int] NULL,
	[PhoneNumber] [nvarchar](50) NOT NULL,
	[EmailAddress] [nvarchar](100) NULL,
	[PrimaryUserID] [int] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[RegistrationModeID] [int] NULL,
	[ClientCreatedBy] [varchar](100) NULL,
	[ClientCreatedDate] [datetime] NULL,
	[ClientModifiedBy] [varchar](100) NULL,
	[ClientModifiedDate] [datetime] NULL,
	[ClientStatus] [varchar](50) NULL,
	[DbUserName] [nvarchar](256) NULL,
	[DbUserPassword] [nvarchar](256) NULL,
 CONSTRAINT [PK_client] PRIMARY KEY CLUSTERED 
(
	[ClientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[ClientAudit]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[ClientAudit](
	[ClientAuditID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NOT NULL,
	[ClientAuditName] [varchar](50) NULL,
	[AuditFrequency] [nvarchar](100) NULL,
	[FirstAuditDate] [datetime] NULL,
	[RecentAuditDate] [datetime] NULL,
 CONSTRAINT [PK_ClientAudit] PRIMARY KEY CLUSTERED 
(
	[ClientAuditID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[ClientRevenueRange]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[ClientRevenueRange](
	[ClientRevenueRangeID] [int] NOT NULL,
	[ClientRevenueRangeName] [varchar](100) NOT NULL,
	[ClientRevenueRangeDescription] [varchar](255) NULL,
	[ClientRevenueRangeISEnabled] [varchar](5) NULL,
	[ClientRevenueRangeCreatedBy] [varchar](100) NULL,
	[ClientRevenueRangeCreatedDate] [datetime] NULL,
	[ClientRevenueRangeModifiedBy] [varchar](100) NULL,
	[ClientRevenueRangeModifie_Date] [datetime] NULL,
 CONSTRAINT [PK_ClientRevenueRange] PRIMARY KEY CLUSTERED 
(
	[ClientRevenueRangeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[ClientSchemaCreation]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[ClientSchemaCreation](
	[ClientSchemaCreationId] [bigint] IDENTITY(1,1) NOT NULL,
	[ClientId] [int] NOT NULL,
	[SchemaName] [nvarchar](200) NOT NULL,
	[UserId] [nvarchar](200) NOT NULL,
	[ExecutedAt] [datetime] NOT NULL,
	[IsSuccess] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ClientSchemaCreationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[ClientSchemaCreationLog]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[ClientSchemaCreationLog](
	[ClientSchemaCreationLogId] [bigint] IDENTITY(1,1) NOT NULL,
	[ObjectName] [nvarchar](max) NOT NULL,
	[ClientSchemaCreationId] [bigint] NOT NULL,
	[IsSuccess] [bit] NOT NULL,
	[InputScript] [nvarchar](max) NULL,
	[DetailedOutput] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ClientSchemaCreationLogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[ClientSchemaGrantLog]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[ClientSchemaGrantLog](
	[ClientSchemaGrantLogId] [bigint] IDENTITY(1,1) NOT NULL,
	[GrantAccessToOtherObjectsId] [bigint] NOT NULL,
	[ClientSchemaCreationId] [bigint] NOT NULL,
	[IsSuccess] [bit] NOT NULL,
	[InputScript] [nvarchar](max) NULL,
	[DetailedOutput] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[ClientSchemaGrantLogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[CMAdditionalDetailImportStaging]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[CMAdditionalDetailImportStaging](
	[Id] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[ActivityTitleL2] [nvarchar](100) NULL,
	[ActivityTitleL3] [nvarchar](100) NULL,
	[ActivityTitleL4] [nvarchar](100) NULL,
	[ActivityTitleL5] [nvarchar](100) NULL,
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[CMDecompositionImportStaging]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[CMDecompositionImportStaging](
	[Id] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[ActivityTitleL2] [nvarchar](100) NULL,
	[ActivityTitleL3] [nvarchar](100) NULL,
	[ActivityTitleL4] [nvarchar](100) NULL,
	[ActivityTitleL5] [nvarchar](100) NULL,
	[ScoringCriteria1Value] [numeric](2, 1) NULL,
	[ScoringCriteria2Value] [numeric](2, 1) NULL,
	[ScoringCriteria3Value] [numeric](2, 1) NULL,
	[ScoringCriteria4Value] [numeric](2, 1) NULL,
	[ScoringCriteria5Value] [numeric](2, 1) NULL,
	[ScoringCriteria6Value] [numeric](2, 1) NULL,
	[ScoringCriteria7Value] [numeric](2, 1) NULL,
	[ScoringCriteria8Value] [numeric](2, 1) NULL,
	[ScoringCriteria9Value] [numeric](2, 1) NULL,
	[ScoringCriteria10Value] [numeric](2, 1) NULL,
	[Priority] [nvarchar](100) NOT NULL,
	[Owner] [nvarchar](100) NULL,
	[Country] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[CMImportLogInterface]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[CMImportLogInterface](
	[LogId] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[LogType] [nvarchar](100) NOT NULL,
	[LogMessage] [nvarchar](max) NOT NULL,
	[DetailedMessage] [nvarchar](max) NULL,
	[CreatedAt] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[CMImportLogStaging]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[CMImportLogStaging](
	[LogId] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[LogType] [nvarchar](100) NOT NULL,
	[LogMessage] [nvarchar](max) NOT NULL,
	[DetailedMessage] [nvarchar](max) NULL,
	[CreatedAt] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[LogId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[CMProcessL1ImportStaging]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[CMProcessL1ImportStaging](
	[Id] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[PhaseName] [nvarchar](100) NOT NULL,
	[FunctionName] [nvarchar](100) NOT NULL,
	[ActivityTitleL1] [nvarchar](100) NOT NULL,
	[Priority] [nvarchar](100) NOT NULL,
	[Owner] [nvarchar](100) NULL,
	[Country] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[CMProjectImportInterface]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[CMProjectImportInterface](
	[Id] [uniqueidentifier] NOT NULL,
	[StagingId] [uniqueidentifier] NOT NULL,
	[DecompositionProjectName] [nvarchar](100) NOT NULL,
	[DecompositionProjectId] [int] NOT NULL,
	[ClientId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[CurrentStatus] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[CMProjectImportStaging]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[CMProjectImportStaging](
	[Id] [uniqueidentifier] NOT NULL,
	[DecompositionProjectName] [nvarchar](100) NOT NULL,
	[ProcessLevel1Title] [nvarchar](100) NOT NULL,
	[ClientId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[CurrentStatus] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[CMScoringMechanismImportStaging]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[CMScoringMechanismImportStaging](
	[Id] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[ScoringCriteria1Name] [nvarchar](100) NULL,
	[ScoringCriteria2Name] [nvarchar](100) NULL,
	[ScoringCriteria3Name] [nvarchar](100) NULL,
	[ScoringCriteria4Name] [nvarchar](100) NULL,
	[ScoringCriteria5Name] [nvarchar](100) NULL,
	[ScoringCriteria6Name] [nvarchar](100) NULL,
	[ScoringCriteria7Name] [nvarchar](100) NULL,
	[ScoringCriteria8Name] [nvarchar](100) NULL,
	[ScoringCriteria9Name] [nvarchar](100) NULL,
	[ScoringCriteria10Name] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[CMTempClientRelationship]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[CMTempClientRelationship](
	[CMTempClientRelationshipId] [int] IDENTITY(1,1) NOT NULL,
	[TemplateID] [int] NOT NULL,
	[ClientID] [int] NULL,
 CONSTRAINT [PK_CMTempClientRelationship_1] PRIMARY KEY CLUSTERED 
(
	[CMTempClientRelationshipId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[CMTempFrameStructure]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[CMTempFrameStructure](
	[TemplateID] [int] NOT NULL,
	[PhaseID] [int] NULL,
	[FunctionID] [int] NULL,
	[ActiveFlag] [int] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[CMTempFrameStructureID] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_CMTempFrameStructure_1] PRIMARY KEY CLUSTERED 
(
	[CMTempFrameStructureID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[CMTemplate]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[CMTemplate](
	[TemplateID] [int] IDENTITY(1,1) NOT NULL,
	[TemplateName] [varchar](100) NULL,
	[TemplateTitle] [varchar](100) NOT NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[IMAGEPATH] [varchar](100) NULL,
 CONSTRAINT [PK_CMTemplate] PRIMARY KEY CLUSTERED 
(
	[TemplateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Country]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Country](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[iso] [char](2) NOT NULL,
	[name] [varchar](80) NOT NULL,
	[nicename] [varchar](80) NOT NULL,
	[iso3] [char](3) NULL,
	[numcode] [int] NULL,
	[phonecode] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[countryregions]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[countryregions](
	[CountryRegionCode] [nvarchar](50) NOT NULL,
	[Name] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DashboardAnnouncement]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DashboardAnnouncement](
	[DashboardAnnouncementID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[DashboardAnnouncementName] [varchar](100) NULL,
	[DashboardAnnouncementHighlights] [varchar](2000) NULL,
	[DashboardAnnouncementSubHighlights] [varchar](2000) NULL,
	[DashboardAnnouncementURLPath] [varchar](512) NULL,
	[DashboardAnnouncementSource] [varchar](100) NULL,
	[DashboardAnnouncementCategory] [varchar](100) NULL,
	[DashboardAnnouncementDigitalAsset] [varbinary](max) NULL,
	[CreatedBy] [varchar](100) NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[CreatedDate] [datetime] NULL,
	[DashboardAnnouncementDate] [datetime] NULL,
 CONSTRAINT [PK_DashboardAnnouncement] PRIMARY KEY CLUSTERED 
(
	[DashboardAnnouncementID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DashboardEvent]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DashboardEvent](
	[DashboardEventID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[DashboardEventName] [varchar](100) NULL,
	[DashboardEvent] [varchar](2000) NULL,
	[DashboardEventDate] [datetime] NULL,
	[DashboardEventURLPath] [varchar](512) NULL,
	[DashboardEventSource] [varchar](100) NULL,
	[DashboardEventCategory] [varchar](100) NULL,
	[DashboardEventsDigitalAsset] [varbinary](max) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_DashboardEvent] PRIMARY KEY CLUSTERED 
(
	[DashboardEventID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DashboardHighlights]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DashboardHighlights](
	[DashboardHighlightsID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NOT NULL,
	[DashboardHighlightsName] [varchar](100) NULL,
	[DashboardHighlights] [varchar](2000) NULL,
	[DashboardHighlightsURLPath] [varchar](512) NULL,
	[DashboardHighlightsSource] [varchar](100) NULL,
	[DashboardHighlightsCategory] [varchar](100) NULL,
	[DashboardHighlightsDigitalAsset] [varbinary](max) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[DashboardHighlightsDate] [datetime] NULL,
 CONSTRAINT [PK_DashboardHighlights] PRIMARY KEY CLUSTERED 
(
	[DashboardHighlightsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DashboardIndustryNews]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DashboardIndustryNews](
	[DashboardIndustryNewsID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[DashboardIndustryNewsName] [varchar](100) NULL,
	[IndustryNews] [varchar](2000) NULL,
	[IndustryNewsURLPath] [varchar](512) NULL,
	[IndustryNewsSource] [varchar](100) NULL,
	[IndustryNewsCategory] [varchar](100) NULL,
	[IndustryNewsDigitalAsset] [varbinary](max) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[DashboardIndustryNewsDate] [datetime] NULL,
 CONSTRAINT [PK_DashboardIndustryNews] PRIMARY KEY CLUSTERED 
(
	[DashboardIndustryNewsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DashboardPopularResource]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DashboardPopularResource](
	[DashboardPopularResourceID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[DashboardPopularResourceName] [varchar](100) NULL,
	[DashboardPopularResourceHighlights] [varchar](2000) NULL,
	[DashboardPopularResourceSubHighlights] [varchar](2000) NULL,
	[DashboardPopularResourceURLPath] [varchar](512) NULL,
	[DashboardPopularResourceSource] [varchar](100) NULL,
	[DashboardPopularResourceCategory] [varchar](100) NULL,
	[DashboardPopularResourceDigitalAsset] [varbinary](max) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[DashboardPopularResourceDate] [datetime] NULL,
 CONSTRAINT [PK_DashboardPopularResource] PRIMARY KEY CLUSTERED 
(
	[DashboardPopularResourceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DashboardTODO]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DashboardTODO](
	[DashboardTODOID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[DashboardTODOName] [varchar](100) NULL,
	[DashboardTODOTaskDescription] [varchar](512) NULL,
	[DashboardTODOStatus] [varchar](2000) NULL,
	[DashboardTODURLPath] [varchar](2000) NULL,
	[DashboardTODODate] [datetime] NULL,
	[DashboardTODOSource] [varchar](100) NULL,
	[DashboardTODOCategory] [varchar](100) NULL,
	[DashboardTODODigitalAsset] [varbinary](max) NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedDBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_DashboardTODO] PRIMARY KEY CLUSTERED 
(
	[DashboardTODOID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DashboardWebinar]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DashboardWebinar](
	[DashboardWebinarID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[DashboardWebinarName] [varchar](100) NULL,
	[DashboardWebinarDescription] [varchar](2000) NULL,
	[DashboardWebinarURLPath] [varchar](512) NULL,
	[DashboardWebinarSource] [varchar](100) NULL,
	[DashboardWebinarCategory] [varchar](100) NULL,
	[DashboardWebinarDigitalAsset] [varbinary](max) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[DashboardWebinarDate] [datetime] NULL,
 CONSTRAINT [PK_DashboardWebinar] PRIMARY KEY CLUSTERED 
(
	[DashboardWebinarID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionActivityBank]    Script Date: 1/7/2020 6:55:32 PM ******/
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
/****** Object:  Table [Amplo].[DecompositionFunction]    Script Date: 1/7/2020 6:55:32 PM ******/
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
/****** Object:  Table [Amplo].[DecompositionFunctionProject]    Script Date: 1/7/2020 6:55:32 PM ******/
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
/****** Object:  Table [Amplo].[DecompositionGridViewLocationMap]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionGridViewLocationMap](
	[DecompositionGridViewLocationMapID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionFunctionID] [int] NULL,
	[DecompositionPhaseID] [int] NULL,
	[GridViewLocationID] [int] NULL,
	[GridViewLocationCode] [varchar](100) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_GridViewLocationMap] PRIMARY KEY CLUSTERED 
(
	[DecompositionGridViewLocationMapID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionGridViewMap]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionGridViewMap](
	[DecompositionGridViewMapID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionGridViewMapName] [varchar](100) NULL,
	[ClienntID] [int] NULL,
	[DecompositionProjectID] [int] NOT NULL,
	[DecompositionPhaseID] [int] NULL,
	[DecompositionPhaseFunctionID] [int] NULL,
	[DecompositionGridViewProcessLocationID] [int] NULL,
	[ProcesDeisgnChoice] [nchar](10) NULL,
	[DecompositionGridViewMapGridFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_DecompositionGridViewMap] PRIMARY KEY CLUSTERED 
(
	[DecompositionGridViewMapID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionLevel1Activity]    Script Date: 1/7/2020 6:55:32 PM ******/
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
/****** Object:  Table [Amplo].[DecompositionLevel1ActivityBank]    Script Date: 1/7/2020 6:55:32 PM ******/
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
/****** Object:  Table [Amplo].[DecompositionPhase]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionPhase](
	[DecompositionPhaseID] [int] IDENTITY(1,1) NOT NULL,
	[PhaseName] [varchar](100) NULL,
	[PhaseTitle] [varchar](100) NULL,
	[PhaseDescription] [varchar](512) NULL,
	[PhaseMeaning] [varchar](512) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[rowid] [uniqueidentifier] NULL,
	[PhaseNumber] [int] NULL,
 CONSTRAINT [PK_DecompositionPhase] PRIMARY KEY CLUSTERED 
(
	[DecompositionPhaseID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionPhaseProject]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionPhaseProject](
	[DecompositionPhaseProjectID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[UserID] [int] NULL,
	[DecompositionProjectID] [int] NULL,
	[PhaseName] [varchar](100) NOT NULL,
	[PhaseTitle] [varchar](100) NULL,
	[PhaseDescription] [varchar](512) NULL,
	[PhaseMeaning] [varchar](512) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[PhaseNumber] [int] NULL,
 CONSTRAINT [PK_DecompositionPhaseProjectID] PRIMARY KEY CLUSTERED 
(
	[DecompositionPhaseProjectID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel0ID]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel0ID](
	[DecompositionProcessLevel0ID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NOT NULL,
	[DecompositionProjectID] [int] NOT NULL,
	[ProcessLevelTitle] [varchar](100) NULL,
	[FunctionID] [int] NULL,
	[FunctionName] [varchar](100) NULL,
	[PhaseID] [int] NULL,
	[PhaseName] [varchar](100) NULL,
	[CalcAggrScore] [float] NULL,
	[Status] [varchar](20) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel0ID] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel0ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel1]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel1](
	[DecompositionProcessLevel1ID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[UserID] [int] NULL,
	[DecompositionProjectID] [int] NULL,
	[ProcessLevel1Name] [varchar](100) NULL,
	[ProcessLevel1Title] [varchar](100) NULL,
	[ProcessLevel1Description] [varchar](512) NULL,
	[FunctionID] [int] NULL,
	[PhaseID] [int] NULL,
	[LockedFlag] [bit] NULL,
	[Status] [int] NULL,
	[DesignChoice] [varchar](100) NULL,
	[LockedBy] [varchar](100) NULL,
	[LockedDateTime] [datetime] NULL,
	[GridViewLocationID] [int] NULL,
	[GridVViewLocationFlag] [int] NULL,
	[GridViewPreviousLocationID] [int] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel1] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel1ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel1Interface]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel1Interface](
	[Id] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[DecompositionProcessLevel1ID] [int] NOT NULL,
	[DecompositionProjectID] [int] NULL,
	[ProcessLevel1Name] [varchar](100) NULL,
	[ProcessLevel1Title] [varchar](100) NULL,
	[ProcessLevel1Description] [varchar](512) NULL,
	[FunctionID] [int] NULL,
	[PhaseID] [int] NULL,
	[Priority] [int] NOT NULL,
	[Owner] [varchar](100) NULL,
	[Country] [varchar](100) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel1Interface] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel1Score]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel1Score](
	[DecompositionProcessLevel1ScoreID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[LeafNodeLevelID] [float] NULL,
	[Level1_Calc_Aggr_Score] [float] NULL,
	[Avg_Score_Weight] [int] NULL,
	[LeafNodeFlag] [bit] NULL,
	[Owner] [varchar](100) NULL,
	[Disable_Date] [date] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel1Score] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel1ScoreID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel2]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel2](
	[DecompositionProcessLevel2ID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProjectID] [int] NULL,
	[DecompositionProcessLevel1ID] [int] NOT NULL,
	[ProcessLevel2NodeID] [varchar](50) NULL,
	[ProcessLevel2Name] [varchar](100) NULL,
	[ProcessLevel2Title] [varchar](100) NULL,
	[ProcessLevel2Description] [varchar](512) NULL,
	[Owner] [varchar](100) NULL,
	[CountrySpecific] [varchar](100) NULL,
	[LeafNodeFlag] [bit] NULL,
	[DisableDate] [date] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel2] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel2ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel2Interface]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel2Interface](
	[Id] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[DecompositionProcessLevel2ID] [int] NOT NULL,
	[DecompositionProcessLevel1ID] [int] NOT NULL,
	[ProcessLevel2Name] [varchar](100) NULL,
	[ProcessLevel2Title] [varchar](100) NULL,
	[ProcessLevel2Description] [varchar](512) NULL,
	[Owner] [varchar](100) NULL,
	[CountrySpecific] [varchar](100) NULL,
	[LeafNodeFlag] [bit] NULL,
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel2Interface] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel2Score]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel2Score](
	[DecompositionProcessLevel2ScoreID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NOT NULL,
	[ScoreCriteria1] [float] NULL,
	[ScoreCriteria2] [float] NULL,
	[ScoreCriteria3] [float] NULL,
	[ScoreCriteria4] [float] NULL,
	[ScoreCriteria5] [float] NULL,
	[ScoreCriteria6] [float] NULL,
	[ScoreCriteria7] [float] NULL,
	[ScoreCriteria8] [float] NULL,
	[ScoreCriteria9] [float] NULL,
	[ScoreCriteria10] [float] NULL,
	[LVL2CalcAggrScore] [float] NULL,
	[AvgScoreWeightage] [float] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel2Score] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel2ScoreID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel2ScoreInterface]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel2ScoreInterface](
	[Id] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[DecompositionProcessLevel2ScoreID] [int] NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NOT NULL,
	[ScoreCriteria1] [float] NULL,
	[ScoreCriteria2] [float] NULL,
	[ScoreCriteria3] [float] NULL,
	[ScoreCriteria4] [float] NULL,
	[ScoreCriteria5] [float] NULL,
	[ScoreCriteria6] [float] NULL,
	[ScoreCriteria7] [float] NULL,
	[ScoreCriteria8] [float] NULL,
	[ScoreCriteria9] [float] NULL,
	[ScoreCriteria10] [float] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel2ScoreInterface] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel3]    Script Date: 1/7/2020 6:55:32 PM ******/
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
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel3] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel3ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel3Interface]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel3Interface](
	[Id] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[DecompositionProcessLevel3ID] [int] NOT NULL,
	[DecompositionProcessLevel2ID] [int] NOT NULL,
	[DecompositionProcessLevel1ID] [int] NOT NULL,
	[ProcessLevel3Name] [varchar](100) NULL,
	[ProcessLevel3Title] [varchar](100) NULL,
	[ProcessLevel3Description] [varchar](512) NULL,
	[Owner] [varchar](100) NULL,
	[CountrySpecific] [varchar](100) NULL,
	[LeafNodeFlag] [bit] NULL,
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel3Interface] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel3Score]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel3Score](
	[DecompositionProcessLevel3ScoreID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NULL,
	[DecompositionProcessLevel3ID] [int] NULL,
	[ScoreCriteria1] [float] NULL,
	[ScoreCriteria2] [float] NULL,
	[ScoreCriteria3] [float] NULL,
	[ScoreCriteria4] [float] NULL,
	[ScoreCriteria5] [float] NULL,
	[ScoreCriteria6] [float] NULL,
	[ScoreCriteria7] [float] NULL,
	[ScoreCriteria8] [float] NULL,
	[ScoreCriteria9] [float] NULL,
	[ScoreCriteria10] [float] NULL,
	[Level3CalcAggrScore] [float] NULL,
	[AvgScoreWeightage] [int] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel3Score] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel3ScoreID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel3ScoreInterface]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel3ScoreInterface](
	[Id] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[DecompositionProcessLevel3ScoreID] [int] NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NOT NULL,
	[DecompositionProcessLevel3ID] [int] NOT NULL,
	[ScoreCriteria1] [float] NULL,
	[ScoreCriteria2] [float] NULL,
	[ScoreCriteria3] [float] NULL,
	[ScoreCriteria4] [float] NULL,
	[ScoreCriteria5] [float] NULL,
	[ScoreCriteria6] [float] NULL,
	[ScoreCriteria7] [float] NULL,
	[ScoreCriteria8] [float] NULL,
	[ScoreCriteria9] [float] NULL,
	[ScoreCriteria10] [float] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel3ScoreInterface] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel4]    Script Date: 1/7/2020 6:55:32 PM ******/
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
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel4] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel4ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel4Interface]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel4Interface](
	[Id] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[DecompositionProcessLevel4ID] [int] NOT NULL,
	[DecompositionProcessLevel3ID] [int] NOT NULL,
	[DecompositionProcessLevel2ID] [int] NOT NULL,
	[DecompositionProcessLevel1ID] [int] NOT NULL,
	[ProcessLevel4Name] [varchar](100) NULL,
	[ProcessLevel4Title] [varchar](100) NULL,
	[ProcessLevel4Description] [varchar](512) NULL,
	[Owner] [varchar](100) NULL,
	[CountrySpecific] [varchar](100) NULL,
	[LeafNodeFlag] [bit] NULL,
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel4Interface] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel4Score]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel4Score](
	[DecompositionProcessLevel4ScoreID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NULL,
	[DecompositionProcessLevel3ID] [int] NULL,
	[DecompositionProcessLevel4ID] [int] NULL,
	[ScoreCriteria1] [float] NULL,
	[ScoreCriteria2] [float] NULL,
	[ScoreCriteria3] [float] NULL,
	[ScoreCriteria4] [float] NULL,
	[ScoreCriteria5] [float] NULL,
	[ScoreCriteria6] [float] NULL,
	[ScoreCriteria7] [float] NULL,
	[ScoreCriteria8] [float] NULL,
	[ScoreCriteria9] [float] NULL,
	[ScoreCriteria10] [float] NULL,
	[Level4CalcAggrScore] [float] NULL,
	[AvgScoreWeightage] [float] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel4Score] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel4ScoreID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel4ScoreInterface]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel4ScoreInterface](
	[Id] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[DecompositionProcessLevel4ScoreID] [int] NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NOT NULL,
	[DecompositionProcessLevel3ID] [int] NOT NULL,
	[DecompositionProcessLevel4ID] [int] NOT NULL,
	[ScoreCriteria1] [float] NULL,
	[ScoreCriteria2] [float] NULL,
	[ScoreCriteria3] [float] NULL,
	[ScoreCriteria4] [float] NULL,
	[ScoreCriteria5] [float] NULL,
	[ScoreCriteria6] [float] NULL,
	[ScoreCriteria7] [float] NULL,
	[ScoreCriteria8] [float] NULL,
	[ScoreCriteria9] [float] NULL,
	[ScoreCriteria10] [float] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel4ScoreInterface] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel5]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel5](
	[DecompositionProcessLevel5ID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProjectID] [int] NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NULL,
	[DecompositionProcessLevel3ID] [int] NULL,
	[DecompositionProcessLevel4ID] [int] NULL,
	[ProcessLevel5NodeID] [varchar](50) NULL,
	[ProcessLevel5Name] [varchar](100) NULL,
	[ProcessLevel5Title] [varchar](100) NULL,
	[ProcessLevel5Description] [varchar](512) NULL,
	[LeafNodeFlag] [bit] NULL,
	[Owner] [varchar](100) NULL,
	[CountrySpecific] [varchar](100) NULL,
	[DisableDate] [date] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel5] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel5ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel5Interface]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel5Interface](
	[Id] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[DecompositionProcessLevel5ID] [int] NOT NULL,
	[DecompositionProcessLevel4ID] [int] NOT NULL,
	[DecompositionProcessLevel3ID] [int] NOT NULL,
	[DecompositionProcessLevel2ID] [int] NOT NULL,
	[DecompositionProcessLevel1ID] [int] NOT NULL,
	[ProcessLevel5Name] [varchar](100) NULL,
	[ProcessLevel5Title] [varchar](100) NULL,
	[ProcessLevel5Description] [varchar](512) NULL,
	[Owner] [varchar](100) NULL,
	[CountrySpecific] [varchar](100) NULL,
	[LeafNodeFlag] [bit] NULL,
	[Number1] [numeric](10, 2) NULL,
	[Number2] [numeric](10, 2) NULL,
	[Number3] [numeric](10, 2) NULL,
	[Number4] [numeric](10, 2) NULL,
	[Number5] [numeric](10, 2) NULL,
	[Number6] [numeric](10, 2) NULL,
	[Number7] [numeric](10, 2) NULL,
	[Number8] [numeric](10, 2) NULL,
	[Number9] [numeric](10, 2) NULL,
	[Number10] [numeric](10, 2) NULL,
	[Attribute1] [nvarchar](256) NULL,
	[Attribute2] [nvarchar](256) NULL,
	[Attribute3] [nvarchar](256) NULL,
	[Attribute4] [nvarchar](256) NULL,
	[Attribute5] [nvarchar](256) NULL,
	[Attribute6] [nvarchar](256) NULL,
	[Attribute7] [nvarchar](256) NULL,
	[Attribute8] [nvarchar](256) NULL,
	[Attribute9] [nvarchar](256) NULL,
	[Attribute10] [nvarchar](256) NULL,
	[Blob1] [varbinary](max) NULL,
	[Blob2] [varbinary](max) NULL,
	[Blob3] [varbinary](max) NULL,
	[Clob1] [varchar](max) NULL,
	[Clob2] [varchar](max) NULL,
	[Clob3] [varchar](max) NULL,
 CONSTRAINT [PK_DecompositionProcessLevel5Interface] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel5Score]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel5Score](
	[DecompositionProcessLevel5ScoreID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NULL,
	[DecompositionProcessLevel3ID] [int] NULL,
	[DecompositionProcessLevel4ID] [int] NULL,
	[DecompositionProcessLevel5ID] [int] NULL,
	[ScoreCriteria1] [float] NULL,
	[ScoreCriteria2] [float] NULL,
	[ScoreCriteria3] [float] NULL,
	[ScoreCriteria4] [float] NULL,
	[ScoreCriteria5] [float] NULL,
	[ScoreCriteria6] [float] NULL,
	[ScoreCriteria7] [float] NULL,
	[ScoreCriteria8] [float] NULL,
	[ScoreCriteria9] [float] NULL,
	[ScoreCriteria10] [float] NULL,
	[Level5CalcAggrScore] [float] NULL,
	[AvgScoreWeightage] [float] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel5Score] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel5ScoreID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel5ScoreInterface]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProcessLevel5ScoreInterface](
	[Id] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[DecompositionProcessLevel5ScoreID] [int] NOT NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[DecompositionProcessLevel2ID] [int] NOT NULL,
	[DecompositionProcessLevel3ID] [int] NOT NULL,
	[DecompositionProcessLevel4ID] [int] NOT NULL,
	[DecompositionProcessLevel5ID] [int] NOT NULL,
	[ScoreCriteria1] [float] NULL,
	[ScoreCriteria2] [float] NULL,
	[ScoreCriteria3] [float] NULL,
	[ScoreCriteria4] [float] NULL,
	[ScoreCriteria5] [float] NULL,
	[ScoreCriteria6] [float] NULL,
	[ScoreCriteria7] [float] NULL,
	[ScoreCriteria8] [float] NULL,
	[ScoreCriteria9] [float] NULL,
	[ScoreCriteria10] [float] NULL,
 CONSTRAINT [PK_DecompositionProcessLevel5ScoreInterface] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProject]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProject](
	[DecompositionProjectID] [int] IDENTITY(1,1) NOT NULL,
	[ProjectName] [varchar](100) NOT NULL,
	[ProjectDescription] [varchar](256) NULL,
	[IndustryID] [int] NULL,
	[IndustryVerticalID] [int] NULL,
	[IndustrySubVerticalID] [int] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[DisableDate] [date] NULL,
	[ClientID] [int] NULL,
	[DisabledFlag] [bit] NULL,
	[StatusID] [int] NULL,
	[LockedFlag] [bit] NULL,
	[ServiceID] [int] NULL,
	[TemplateId] [int] NULL,
 CONSTRAINT [PK_DecompositionProject] PRIMARY KEY CLUSTERED 
(
	[DecompositionProjectID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProjectUser]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionProjectUser](
	[DecompositionProjectUserID] [int] IDENTITY(1,1) NOT NULL,
	[DecompositionProjectUserName] [varchar](100) NULL,
	[DecompositionProjectID] [int] NOT NULL,
	[ClientID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[ActiveFlag] [bit] NULL,
	[ProductionFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[ActivityFlag] [int] NULL,
 CONSTRAINT [PK_DecompositionProjectUser] PRIMARY KEY CLUSTERED 
(
	[DecompositionProjectUserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionScoreCalculationFunction]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionScoreCalculationFunction](
	[DecompositionScoreCalculationFunctionID] [int] IDENTITY(1,1) NOT NULL,
	[ScoreCalculationFunctionName] [varchar](100) NULL,
	[ScoreCalculationFunctionTitle] [varchar](100) NULL,
	[ScoreCalculationFunctionDescription] [varchar](100) NULL,
 CONSTRAINT [PK_DecompositionScoreCalculationFunction] PRIMARY KEY CLUSTERED 
(
	[DecompositionScoreCalculationFunctionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionScoreCriteria]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionScoreCriteria](
	[DecompositionScoreCriteriaID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceID] [int] NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[ScoreCriteriaName] [varchar](100) NULL,
	[ScoreCriteriaActualName] [varchar](100) NULL,
	[ScoreCriteriaTitle] [varchar](100) NULL,
	[ScoreCriteriaDescription] [varchar](512) NULL,
	[SeededFlag] [bit] NULL,
	[UsedFlag] [bit] NULL,
 CONSTRAINT [PK_DecompositionScoreCriteria] PRIMARY KEY CLUSTERED 
(
	[DecompositionScoreCriteriaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionScoreCriteriaProject]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionScoreCriteriaProject](
	[DecompositionScoreCriteriaID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceID] [int] NULL,
	[ClientID] [int] NULL,
	[DecompositionProjectID] [int] NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[ScoreCriteriaName] [varchar](100) NULL,
	[ScoreCriteriaActualName] [varchar](100) NULL,
	[ScoreCriteriaTitle] [varchar](100) NULL,
	[ScoreCriteriaDescription] [varchar](512) NULL,
	[SeededFlag] [bit] NULL,
	[UsedFlag] [bit] NULL,
 CONSTRAINT [PK_DecompositionScoreCriteriaProject] PRIMARY KEY CLUSTERED 
(
	[DecompositionScoreCriteriaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionScoreCriteriaProjectInterface]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionScoreCriteriaProjectInterface](
	[Id] [uniqueidentifier] NOT NULL,
	[MasterId] [uniqueidentifier] NOT NULL,
	[DecompositionScoreCriteriaID] [int] NOT NULL,
	[DecompositionProjectID] [int] NULL,
	[DecompositionProcessLevel1ID] [int] NULL,
	[ScoreCriteriaName] [varchar](100) NULL,
	[ScoreCriteriaActualName] [varchar](100) NULL,
	[ScoreCriteriaTitle] [varchar](100) NULL,
 CONSTRAINT [PK_DecompositionScoreCriteriaProjectInterface] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionStatus]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionStatus](
	[StatusID] [int] IDENTITY(1,1) NOT NULL,
	[StatusName] [varchar](100) NOT NULL,
	[StatusDescription] [varchar](512) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
 CONSTRAINT [PK_[DecompositionStatus] PRIMARY KEY CLUSTERED 
(
	[StatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionUserAccess]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[DecompositionUserAccess](
	[DecompositionUserAccessID] [int] IDENTITY(1,1) NOT NULL,
	[UserAccessName] [varchar](100) NULL,
	[UserAccessDescription] [varchar](512) NULL,
	[ClientID] [int] NULL,
	[UserID] [int] NULL,
	[DecompositionProjectID] [int] NULL,
	[FunctionID] [int] NULL,
	[PhaseID] [int] NULL,
	[ActiveFlag] [bit] NULL,
	[CreadedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_DecompositionUserAccess] PRIMARY KEY CLUSTERED 
(
	[DecompositionUserAccessID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[EmailVerification]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[EmailVerification](
	[EmailVerificationID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[UserName] [varchar](100) NULL,
	[VerificationHashCode] [varchar](512) NULL,
	[VerificationHashCodeDate] [datetime] NULL,
	[VerificationFlag] [bit] NULL,
	[ActiveFlag] [bit] NULL,
	[VerificationDate] [datetime] NULL,
	[VerificationRemarks] [varchar](100) NULL,
	[UserIPAddress] [varchar](100) NULL,
	[BeginDateTime] [datetime] NULL,
	[EndDateTime] [datetime] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_EmailVerificationID] PRIMARY KEY CLUSTERED 
(
	[EmailVerificationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[ErrorLog]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[ErrorLog](
	[ErrorLogID] [int] IDENTITY(1,1) NOT NULL,
	[ErrorTime] [datetime] NOT NULL,
	[UserName] [sysname] NOT NULL,
	[ErrorNumber] [int] NOT NULL,
	[ErrorSeverity] [int] NULL,
	[ErrorState] [int] NULL,
	[ErrorProcedure] [nvarchar](126) NULL,
	[ErrorLine] [int] NULL,
	[ErrorMessage] [nvarchar](4000) NOT NULL,
 CONSTRAINT [PK_ErrorLog_ErrorLogID] PRIMARY KEY CLUSTERED 
(
	[ErrorLogID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[FunctionalResources]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[FunctionalResources](
	[FunctionalResourceID] [int] IDENTITY(1,1) NOT NULL,
	[ServicesID] [int] NULL,
	[MenuName] [varchar](50) NOT NULL,
	[MenuURL] [varchar](50) NULL,
	[MenuParentID] [int] NULL,
	[MenuDescription] [varchar](50) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[Created_By] [varchar](50) NULL,
	[Created_Date] [datetime] NULL,
	[Modified_By] [varchar](50) NULL,
	[Modified_Date] [datetime] NULL,
	[ConfigurationFlag] [bit] NULL,
	[Category] [varchar](100) NULL,
	[IconPath] [varchar](100) NULL,
	[IsForClient] [bit] NOT NULL,
 CONSTRAINT [PK_FunctionalResources] PRIMARY KEY CLUSTERED 
(
	[FunctionalResourceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[FunctionPhaseStyle]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[FunctionPhaseStyle](
	[FunctionPhaseStyleID] [int] IDENTITY(1,1) NOT NULL,
	[StyleName] [varchar](100) NULL,
	[StyletTitle] [varchar](100) NULL,
	[ProcessLimit] [int] NOT NULL,
	[ActiveFlag] [bit] NULL,
	[ThumbnailID] [int] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
 CONSTRAINT [PK_FunctionPhaseStyle] PRIMARY KEY CLUSTERED 
(
	[FunctionPhaseStyleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[GettingStartedVideos]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[GettingStartedVideos](
	[GettingStartedVideosID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[GettingStartedVideosName] [varchar](100) NULL,
	[GettingStartedVideosDescription] [varchar](2000) NULL,
	[GettingStartedVideosURLPath] [varchar](512) NULL,
	[GettingStartedVideosSource] [varchar](100) NULL,
	[GettingStartedVideosCategory] [varchar](100) NULL,
	[GettingStartedVideosDigitalAsset] [varbinary](max) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[GettingStartedVideosDate] [datetime] NULL,
 CONSTRAINT [PK_GettingStartedVideos] PRIMARY KEY CLUSTERED 
(
	[GettingStartedVideosID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[GrantAccessToOtherObjects]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[GrantAccessToOtherObjects](
	[GrantAccessToOtherObjectsId] [bigint] IDENTITY(1,1) NOT NULL,
	[ObjectName] [nvarchar](200) NOT NULL,
	[ObjectType] [nvarchar](200) NOT NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[GrantAccessToOtherObjectsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Industry]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Industry](
	[IndustryID] [int] NOT NULL,
	[IndustryName] [varchar](100) NOT NULL,
	[IndustryDescription] [varchar](255) NULL,
	[IndustryCreatedBy] [varchar](100) NULL,
	[IndustryCreatedDate] [datetime] NULL,
	[IndustryModifiedBy] [varchar](100) NULL,
	[IndustryModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_Industry] PRIMARY KEY CLUSTERED 
(
	[IndustryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[KPI]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[KPI](
	[KPIID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NOT NULL,
	[KPIName] [varchar](100) NULL,
	[KPITitle] [varchar](100) NOT NULL,
	[BusinessOutcome] [varchar](512) NULL,
	[BusinessMetrics] [varchar](256) NULL,
	[PersonaImpacted] [varchar](256) NULL,
	[EstimatedSavings] [varchar](100) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[ExpectedTargetGrowth] [nvarchar](100) NULL,
	[UnitOfMeasurement] [nvarchar](50) NULL,
	[TargetDate] [datetime] NULL,
	[Improvementbasis] [varchar](50) NULL,
	[AuditFrequency] [varchar](50) NULL,
 CONSTRAINT [PK_KPI] PRIMARY KEY CLUSTERED 
(
	[KPIID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[KPICapabilities]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[KPICapabilities](
	[KPICapabilitiesID] [int] IDENTITY(1,1) NOT NULL,
	[KPIControlLeversID] [int] NULL,
	[CapabilitiesName] [varchar](100) NULL,
	[CapabilitiesTitle] [varchar](512) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[InvestmentRequired] [nvarchar](50) NULL,
	[ExpectedBy] [datetime] NULL,
 CONSTRAINT [PK_KPICapabilities] PRIMARY KEY CLUSTERED 
(
	[KPICapabilitiesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[KPIControlLevers]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[KPIControlLevers](
	[KPIControlLeversID] [int] IDENTITY(1,1) NOT NULL,
	[KPIID] [int] NOT NULL,
	[ControlLeversName] [varchar](100) NULL,
	[ControlLeversTitle] [varchar](256) NOT NULL,
	[PersonaImpacted] [varchar](256) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[ExpectedTargetGrowth] [nvarchar](100) NULL,
	[UnitOfMeasurement] [nvarchar](50) NULL,
	[TargetDate] [datetime] NULL,
	[ImprovementBasis] [varchar](50) NULL,
	[EstimatedSavings] [nvarchar](50) NULL,
	[AuditFrequency] [varchar](50) NULL,
 CONSTRAINT [PK_KPIControlLevers] PRIMARY KEY CLUSTERED 
(
	[KPIControlLeversID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[KPIDimension]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[KPIDimension](
	[KPIDimensionID] [int] NOT NULL,
	[KPIDimensionName] [varchar](50) NULL,
	[KPIID] [int] NULL,
	[KPIControlLeversID] [int] NULL,
	[BenchmarkProjectID] [int] NULL,
	[DecompositionProjectID] [int] NULL,
	[ActiveFlag] [int] NULL,
	[BSCCategory] [varchar](100) NULL,
 CONSTRAINT [PK_KPIDimension] PRIMARY KEY CLUSTERED 
(
	[KPIDimensionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[KPIInhibitors]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[KPIInhibitors](
	[KPIInhibitorsID] [int] IDENTITY(1,1) NOT NULL,
	[KPIControlLeversID] [int] NULL,
	[InhibitorsName] [varchar](100) NULL,
	[InhibitorsTitle] [varchar](512) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[Probability] [nvarchar](20) NULL,
	[ImpactCost] [nvarchar](50) NULL,
 CONSTRAINT [PK_KPIInhibitors] PRIMARY KEY CLUSTERED 
(
	[KPIInhibitorsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[KPISet]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[KPISet](
	[ClientID] [int] NULL,
	[KPISetID] [int] NULL,
	[KPISetName] [varchar](100) NULL,
	[KPISetTitle] [varchar](100) NOT NULL,
	[BSCCategory] [varchar](100) NULL,
	[Status] [nchar](10) NULL,
	[GlobalFlag] [bit] NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
	[KPIDimensionID] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Message]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Message](
	[MessageID] [int] IDENTITY(1,1) NOT NULL,
	[MessageName] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[MessageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Message1]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Message1](
	[MessageID] [smallint] NOT NULL,
	[MessageName] [nvarchar](512) NOT NULL,
 CONSTRAINT [PK_Message1] PRIMARY KEY CLUSTERED 
(
	[MessageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Password]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Password](
	[PasswordID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NOT NULL,
	[PasswordQuestionID] [int] NOT NULL,
	[PasswordAnswer] [varchar](512) NOT NULL,
	[BeginDate] [date] NULL,
	[EndDate] [date] NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModifedBy] [varchar](100) NULL,
	[ModifiedOn] [datetime] NULL,
 CONSTRAINT [PK_Password] PRIMARY KEY CLUSTERED 
(
	[PasswordID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[PasswordQuestion]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[PasswordQuestion](
	[PasswordQuestionID] [int] IDENTITY(1,1) NOT NULL,
	[PasswordQuestion] [varchar](512) NOT NULL,
	[PasswordQuestionRemarks] [varchar](512) NULL,
	[ActiveFlag] [bit] NULL,
 CONSTRAINT [PK_PasswordQuestions] PRIMARY KEY CLUSTERED 
(
	[PasswordQuestionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Region]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Region](
	[RegionID] [int] NOT NULL,
	[RegionName] [varchar](100) NOT NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_Region] PRIMARY KEY CLUSTERED 
(
	[RegionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[RegistrationMode]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[RegistrationMode](
	[RegistrationModeID] [int] IDENTITY(1,1) NOT NULL,
	[RegistrationModeName] [varchar](50) NOT NULL,
	[RegistrationModeDescription] [varchar](100) NOT NULL,
	[RegistrationModeActiveFlag] [bit] NOT NULL,
	[RegistrationModeCreatedBy] [varchar](100) NULL,
	[RegistrationModeCreatedDate] [datetime] NULL,
	[RegistrationModeModifiedBy] [varchar](100) NULL,
	[RegistrationModeModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_RegistrationMode] PRIMARY KEY CLUSTERED 
(
	[RegistrationModeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Report]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Report](
	[ReportID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NOT NULL,
	[UserID] [int] NULL,
	[ServiceID] [int] NULL,
	[ReportTitle] [varchar](100) NULL,
	[ReportDescrption] [varchar](256) NULL,
	[ReportPath] [varchar](100) NULL,
	[ProjectID] [int] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
 CONSTRAINT [PK_Amplo_Report] PRIMARY KEY CLUSTERED 
(
	[ReportID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[RestrictedEmailDomain]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[RestrictedEmailDomain](
	[RestrictedEmailDomainID] [int] IDENTITY(1,1) NOT NULL,
	[EmailDomainName] [varchar](50) NOT NULL,
	[EmailDomainDescription] [varchar](255) NULL,
	[ActiveFlag] [bit] NULL,
	[Created_By] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_EmailDomain] PRIMARY KEY CLUSTERED 
(
	[RestrictedEmailDomainID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Role]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Role](
	[RoleID] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [varchar](50) NOT NULL,
	[RoleDescription] [varchar](250) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[Created_Date] [datetime] NULL,
	[Created_By] [varchar](50) NULL,
	[Modified_By] [varchar](50) NULL,
	[Modified_Dt] [datetime] NULL,
 CONSTRAINT [PK_AmploRole] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[RolesFunctioanlResource]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[RolesFunctioanlResource](
	[RolesFunctioanlResourceID] [int] IDENTITY(1,1) NOT NULL,
	[RoleID] [int] NOT NULL,
	[FunctioanlResourceID] [int] NOT NULL,
	[Action] [varchar](50) NULL,
	[ActionFlag] [bit] NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploRolesFunctioanlResources] PRIMARY KEY CLUSTERED 
(
	[RolesFunctioanlResourceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[RolesFunctionalResource]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[RolesFunctionalResource](
	[RolesFunctionalResourceID] [int] IDENTITY(1,1) NOT NULL,
	[RoleID] [int] NOT NULL,
	[FunctionalResourceID] [int] NOT NULL,
	[Action] [varchar](50) NULL,
	[ActionFlag] [bit] NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_AmploRolesFunctionalResources] PRIMARY KEY CLUSTERED 
(
	[RolesFunctionalResourceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Services]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Services](
	[ServicesID] [int] IDENTITY(1,1) NOT NULL,
	[ServicesName] [varchar](50) NOT NULL,
	[ServicesDescription] [varchar](256) NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](50) NULL,
	[ModifiedDate] [date] NULL,
 CONSTRAINT [PK_Services] PRIMARY KEY CLUSTERED 
(
	[ServicesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[SimpleDemo]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[SimpleDemo](
	[Level] [hierarchyid] NOT NULL,
	[Location] [nvarchar](30) NOT NULL,
	[LocationType] [nvarchar](9) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[StateProvince]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[StateProvince](
	[StateProvinceID] [tinyint] NOT NULL,
	[StateProvinceCode] [nvarchar](50) NOT NULL,
	[CountryRegionCode] [nvarchar](50) NOT NULL,
	[IsOnlyStateProvinceFlag] [bit] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[TerritoryID] [tinyint] NOT NULL,
	[rowguid] [nvarchar](50) NOT NULL,
	[ModifiedDate] [datetime2](7) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[StatusLookup]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[StatusLookup](
	[StatusLookupID] [int] IDENTITY(1,1) NOT NULL,
	[LookupCode] [varchar](100) NULL,
	[LookupName] [varchar](100) NULL,
	[LookupTitle] [varchar](100) NULL,
	[LookupCategory] [varchar](100) NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
 CONSTRAINT [PK_StatusLookup] PRIMARY KEY CLUSTERED 
(
	[StatusLookupID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Subscription]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Subscription](
	[SubscriptionID] [int] IDENTITY(1,1) NOT NULL,
	[SubscriptionName] [varchar](100) NULL,
	[SubscriptionDescription] [varchar](256) NULL,
	[ClientID] [int] NULL,
	[SubscriptionKey] [varchar](50) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[StartDate] [datetime] NULL,
	[EndDate] [datetime] NULL,
	[Created_By] [varchar](50) NULL,
	[Created_On] [datetime] NULL,
	[Modified_By] [varchar](50) NULL,
	[Modified_Date] [datetime] NULL,
 CONSTRAINT [PK_Subscription] PRIMARY KEY CLUSTERED 
(
	[SubscriptionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[TemplateFunctPhaseStyleAssignment]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[TemplateFunctPhaseStyleAssignment](
	[TemplateFunctPhaseStyleAssignmentID] [int] IDENTITY(1,1) NOT NULL,
	[TemplateID] [int] NOT NULL,
	[PhaseID] [int] NULL,
	[FunctionID] [int] NULL,
	[StyleID] [int] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedOn] [date] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [date] NULL,
 CONSTRAINT [PK_TemplateFunctPhaseStyleAssignment_1] PRIMARY KEY CLUSTERED 
(
	[TemplateFunctPhaseStyleAssignmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UOM]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UOM](
	[UOMID] [int] IDENTITY(1,1) NOT NULL,
	[UOMName] [varchar](100) NULL,
	[UOMClassID] [int] NULL,
	[UnitOf] [varchar](100) NULL,
	[System] [varchar](100) NULL,
	[Formula] [nvarchar](2000) NULL,
	[BaseFlag] [varchar](100) NULL,
 CONSTRAINT [PK_UOM] PRIMARY KEY CLUSTERED 
(
	[UOMID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UOMClass]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UOMClass](
	[UOMClassID] [int] IDENTITY(1,1) NOT NULL,
	[UOMClassName] [varchar](100) NULL,
	[UOMClassTitle] [varchar](100) NULL,
	[UOMClassRemarks] [varchar](100) NULL,
 CONSTRAINT [PK_UOMClass] PRIMARY KEY CLUSTERED 
(
	[UOMClassID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UOMClassConversion]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UOMClassConversion](
	[UOMClassConversionID] [int] NULL,
	[UOMClassConversionName] [varchar](100) NULL,
	[UOMClassFromID] [int] NULL,
	[UOMFromID] [int] NULL,
	[UOMFromQuantity] [float] NULL,
	[UOMClassTo] [int] NULL,
	[UOMToID] [int] NULL,
	[UOMToQuantity] [float] NULL,
	[ConversionRate] [float] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedOn] [datetime] NULL,
	[ModiiedBy] [varchar](100) NULL,
	[ModifiedOn] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[User]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[User](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](100) NOT NULL,
	[FirstName] [varchar](100) NOT NULL,
	[MiddleName] [varchar](50) NULL,
	[LastName] [varchar](100) NOT NULL,
	[PhoneNumber] [nvarchar](100) NOT NULL,
	[EmailAddress] [nvarchar](256) NULL,
	[UserPassword] [nvarchar](256) NOT NULL,
	[EmailValidationStatus] [bit] NULL,
	[ActiveFlag] [bit] NULL,
	[ClientID] [int] NULL,
	[UserLinkedINProfileID] [varchar](255) NULL,
	[UserTypeID] [int] NULL,
	[UserStatusID] [int] NULL,
	[ProfilePhotoPath] [nvarchar](100) NULL,
	[UserCreatedBy] [varchar](100) NULL,
	[UserCreatedDate] [varchar](255) NULL,
	[UserModifiedBy] [varchar](100) NULL,
	[UserModifiedDate] [datetime] NULL,
	[DisableDate] [datetime] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UserAccessResource]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UserAccessResource](
	[UserAccessResourceID] [int] IDENTITY(1,1) NOT NULL,
	[UserAccessResourceName] [varchar](100) NOT NULL,
	[ResourceDescription] [varchar](512) NULL,
	[SubscriptionID] [int] NULL,
	[ClientID] [int] NULL,
	[RoleID] [int] NULL,
	[BeginDate] [date] NULL,
	[EndDate] [date] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[Created_By] [varchar](50) NULL,
	[Created_Date] [datetime] NULL,
	[Modified_By] [varchar](50) NULL,
	[Modified_Date] [datetime] NULL,
	[ConfigurationFlag] [bit] NULL,
 CONSTRAINT [PK_UserAccessResource] PRIMARY KEY CLUSTERED 
(
	[UserAccessResourceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UserCategory]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UserCategory](
	[UserCategoryID] [int] IDENTITY(1,1) NOT NULL,
	[UserCategoryName] [varchar](100) NOT NULL,
	[UserCategoryDescription] [varchar](255) NULL,
	[ActiveFlag] [bit] NULL,
	[UserCategoryCreatedBy] [varchar](100) NULL,
	[UserCategoryModifiedBy] [varchar](100) NULL,
	[UserCategoryCreatedOn] [datetime] NULL,
	[UserCategoryCreatedDate] [datetime] NULL,
 CONSTRAINT [PK_UserCategory] PRIMARY KEY CLUSTERED 
(
	[UserCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UserDIVATeam]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UserDIVATeam](
	[UserDIVATeamID] [int] IDENTITY(1,1) NOT NULL,
	[ClientID] [int] NULL,
	[SuperUserID] [int] NULL,
	[FirstName] [varchar](100) NULL,
	[LastName] [varchar](100) NULL,
	[Email] [nvarchar](256) NULL,
	[DisableDate] [date] NULL,
	[UserTypeID] [int] NULL,
	[UserStatusID] [int] NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_UserDIVATeam] PRIMARY KEY CLUSTERED 
(
	[UserDIVATeamID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UserDomainAccess]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UserDomainAccess](
	[UserDomainAccessID] [int] IDENTITY(1,1) NOT NULL,
	[UserDomainAccessName] [varchar](100) NULL,
	[ClientID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[DomainID] [int] NOT NULL,
	[AccessType] [int] NOT NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[BenchmarkProjectID] [int] NULL,
 CONSTRAINT [PK_UserDomainAccess] PRIMARY KEY CLUSTERED 
(
	[UserDomainAccessID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UserReportAccess]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UserReportAccess](
	[UserReportAccessID] [int] IDENTITY(1,1) NOT NULL,
	[UserReportAccessName] [varchar](100) NULL,
	[ClientID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
	[ServiceID] [int] NOT NULL,
	[AccessType] [int] NOT NULL,
	[ActiveFlag] [bit] NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedBy] [varchar](100) NULL,
	[ModifiedDate] [datetime] NULL,
	[ReportId] [int] NULL,
 CONSTRAINT [PK_UserReportAccess] PRIMARY KEY CLUSTERED 
(
	[UserReportAccessID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UserStatus]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UserStatus](
	[UserStatusID] [int] NOT NULL,
	[UserStatusName] [varchar](100) NOT NULL,
	[UserStatusIsEnabled] [varchar](5) NULL,
	[UserStatusCreatedBy] [varchar](100) NULL,
	[UserStatusCreatedDate] [datetime] NULL,
	[UserStatusModifiedBy] [varchar](100) NULL,
	[UserStatusModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_User_Status] PRIMARY KEY CLUSTERED 
(
	[UserStatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UserType]    Script Date: 1/7/2020 6:55:32 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[UserType](
	[UserTypeID] [int] NOT NULL,
	[UserTypeName] [varchar](100) NOT NULL,
	[UserTypeDescription] [varchar](255) NULL,
	[UserTypeIsEnabled] [varchar](5) NULL,
	[UserCategoryID] [int] NULL,
	[UserTypeCreatedBy] [varchar](100) NULL,
	[UserTypeCreatedOn] [datetime] NULL,
	[UserTypeModifiedBy] [varchar](100) NULL,
	[UserTypeCreatedDate] [datetime] NULL,
 CONSTRAINT [PK_UserType] PRIMARY KEY CLUSTERED 
(
	[UserTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1] ADD  CONSTRAINT [DF_AmploDecompositionProcessLevel1_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1Template] ADD  CONSTRAINT [DF_AmploDecompositionProcessLevel1Template_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel2Template] ADD  CONSTRAINT [DF_DecompopProcessLevel2_Template_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel4Template] ADD  CONSTRAINT [DF_DecompProcessLevel4_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel5Template] ADD  CONSTRAINT [DF_DecompProcessLevel5_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[AmploDomain] ADD  CONSTRAINT [DF_AmploDomain_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[AmploIndustrySubVertical] ADD  CONSTRAINT [DF_IndustrySubVertical_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[BenchmarkingDomain] ADD  CONSTRAINT [DF_BenchmarkDomain_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[BenchmarkProject] ADD  DEFAULT ((0)) FOR [DisabledFlag]
GO
ALTER TABLE [Amplo].[BenchmarkProject] ADD  DEFAULT ((0)) FOR [DisableFlag]
GO
ALTER TABLE [Amplo].[BenchmarkProject] ADD  CONSTRAINT [DF_BenchmarkProject_LockFlag]  DEFAULT ((0)) FOR [LockedFlag]
GO
ALTER TABLE [Amplo].[BenchmarkProjectUser] ADD  CONSTRAINT [DF_BenchmarkProjectUser_ActivityFlag]  DEFAULT ((1)) FOR [ActivityFlag]
GO
ALTER TABLE [Amplo].[BenchmarkProjectUser] ADD  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[ClientSchemaCreation] ADD  DEFAULT (getdate()) FOR [ExecutedAt]
GO
ALTER TABLE [Amplo].[ClientSchemaCreation] ADD  DEFAULT ((1)) FOR [IsSuccess]
GO
ALTER TABLE [Amplo].[ClientSchemaCreationLog] ADD  DEFAULT ((1)) FOR [IsSuccess]
GO
ALTER TABLE [Amplo].[ClientSchemaGrantLog] ADD  DEFAULT ((1)) FOR [IsSuccess]
GO
ALTER TABLE [Amplo].[CMImportLogInterface] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [Amplo].[CMImportLogStaging] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [Amplo].[CMProjectImportInterface] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [Amplo].[CMProjectImportStaging] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [Amplo].[CMTempFrameStructure] ADD  CONSTRAINT [DF_CMTempFrameStructure_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[CMTemplate] ADD  CONSTRAINT [DF_CMTemplate_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[Country] ADD  DEFAULT (NULL) FOR [iso3]
GO
ALTER TABLE [Amplo].[Country] ADD  DEFAULT (NULL) FOR [numcode]
GO
ALTER TABLE [Amplo].[DashboardTODO] ADD  CONSTRAINT [DF_DashboardTODO_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionFunction] ADD  CONSTRAINT [DF_DecompositionPhaseFunction_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionFunctionProject] ADD  CONSTRAINT [DF_DecompositionFunctionProject_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionGridViewLocationMap] ADD  CONSTRAINT [DF_GridViewLocationMap_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionLevel1ActivityBank] ADD  CONSTRAINT [DF_DecompositionLevel1ActivityBank_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionPhase] ADD  CONSTRAINT [DF_DecompositionPhase_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionPhaseProject] ADD  CONSTRAINT [DF_DecompositionPhaseProject_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel1] ADD  CONSTRAINT [DF_DecompositionProcessLevel1_ActiveFlag_1]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel2] ADD  CONSTRAINT [DF_DecompositionProcessLevel2_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel3] ADD  CONSTRAINT [DF_DecompositionProcessLevel3_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel4] ADD  CONSTRAINT [DF_DecompositionProcessLevel4_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel5] ADD  CONSTRAINT [DF_DecompositionProcessLevel5_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionProject] ADD  CONSTRAINT [DF_DecompositionProject_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[DecompositionScoreCriteria] ADD  CONSTRAINT [DF_DecompositionScoreCriteria_SeededFlag]  DEFAULT ((0)) FOR [SeededFlag]
GO
ALTER TABLE [Amplo].[DecompositionScoreCriteria] ADD  CONSTRAINT [DF_DecompositionScoreCriteria_UsedFlag]  DEFAULT ((0)) FOR [UsedFlag]
GO
ALTER TABLE [Amplo].[DecompositionScoreCriteriaProject] ADD  CONSTRAINT [DF_DecompositionScoreCriteriaProject_SeededFlag]  DEFAULT ((0)) FOR [SeededFlag]
GO
ALTER TABLE [Amplo].[DecompositionScoreCriteriaProject] ADD  CONSTRAINT [DF_DecompositionScoreCriteriaProject_UsedFlag]  DEFAULT ((0)) FOR [UsedFlag]
GO
ALTER TABLE [Amplo].[ErrorLog] ADD  CONSTRAINT [DF_ErrorLog_ErrorTime]  DEFAULT (getdate()) FOR [ErrorTime]
GO
ALTER TABLE [Amplo].[FunctionalResources] ADD  CONSTRAINT [DF_FunctionalResources_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[FunctionalResources] ADD  DEFAULT ((1)) FOR [IsForClient]
GO
ALTER TABLE [Amplo].[FunctionPhaseStyle] ADD  CONSTRAINT [DF_FunctionPhaseStyle_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[GrantAccessToOtherObjects] ADD  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[GrantAccessToOtherObjects] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [Amplo].[KPI] ADD  CONSTRAINT [DF_KPI_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[KPICapabilities] ADD  CONSTRAINT [DF_KPICapabilities_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[KPIControlLevers] ADD  CONSTRAINT [DF_KPIControlLevers_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[KPIInhibitors] ADD  CONSTRAINT [DF_KPIInhibitors_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[Report] ADD  CONSTRAINT [DF_Report_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[Role] ADD  CONSTRAINT [DF_Amplo_Role_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[StatusLookup] ADD  CONSTRAINT [DF_StatusLookup_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[Subscription] ADD  CONSTRAINT [DF_Subscription_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[TemplateFunctPhaseStyleAssignment] ADD  CONSTRAINT [DF_TemplateFunctPhaseStyleAssignment_TemplateID]  DEFAULT ((1)) FOR [TemplateID]
GO
ALTER TABLE [Amplo].[TemplateFunctPhaseStyleAssignment] ADD  CONSTRAINT [DF_TemplateFunctPhaseStyleAssignment_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[UserAccessResource] ADD  CONSTRAINT [DF_FUserAccessResource_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[UserDIVATeam] ADD  CONSTRAINT [DF_UserDIVATeam_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[AmploCompanyProfile]  WITH CHECK ADD  CONSTRAINT [FK_AmploCompanyProfile_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[AmploCompanyProfile] CHECK CONSTRAINT [FK_AmploCompanyProfile_Client]
GO
ALTER TABLE [Amplo].[AmploCompanyProfile]  WITH CHECK ADD  CONSTRAINT [FK_AmploCompanyProfile_Subscription] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[AmploCompanyProfile] CHECK CONSTRAINT [FK_AmploCompanyProfile_Subscription]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel1_DecompositionFunction] FOREIGN KEY([DecompositionFunctionID])
REFERENCES [Amplo].[DecompositionFunction] ([DecompositionFunctionID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel1_DecompositionFunction]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel1_DecompositionPhase] FOREIGN KEY([DecompositionPhaseID])
REFERENCES [Amplo].[DecompositionPhase] ([DecompositionPhaseID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel1_DecompositionPhase]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1Template]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel1Template_CMTemplate] FOREIGN KEY([TemplateID])
REFERENCES [Amplo].[CMTemplate] ([TemplateID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1Template] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel1Template_CMTemplate]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1Template]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel1Template_FunctionPhaseStyle] FOREIGN KEY([StyleID])
REFERENCES [Amplo].[FunctionPhaseStyle] ([FunctionPhaseStyleID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1Template] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel1Template_FunctionPhaseStyle]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1Template]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionTemplate_DecompositionFunction] FOREIGN KEY([DecompositionFunctionID])
REFERENCES [Amplo].[DecompositionFunction] ([DecompositionFunctionID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1Template] CHECK CONSTRAINT [FK_AmploDecompositionTemplate_DecompositionFunction]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1Template]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionTemplate_DecompositionPhase] FOREIGN KEY([DecompositionPhaseID])
REFERENCES [Amplo].[DecompositionPhase] ([DecompositionPhaseID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1Template] CHECK CONSTRAINT [FK_AmploDecompositionTemplate_DecompositionPhase]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel2Template]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel2Template_AmploDecompositionProcessLevel1Template1] FOREIGN KEY([DecompositionProcessLevel1TemplateID])
REFERENCES [Amplo].[AmploDecompositionProcessLevel1Template] ([AmploDecompositionProcessLevel1TemplateID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel2Template] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel2Template_AmploDecompositionProcessLevel1Template1]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel3Template]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel3Template_AmploDecompositionProcessLevel1Template] FOREIGN KEY([DecompositionProcessLevel1TempateID])
REFERENCES [Amplo].[AmploDecompositionProcessLevel1Template] ([AmploDecompositionProcessLevel1TemplateID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel3Template] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel3Template_AmploDecompositionProcessLevel1Template]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel3Template]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel3Template_AmploDecompositionProcessLevel2Template] FOREIGN KEY([DecompositionProcessLevel2TempateID])
REFERENCES [Amplo].[AmploDecompositionProcessLevel2Template] ([DecompositionProcessLevel2TemplateID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel3Template] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel3Template_AmploDecompositionProcessLevel2Template]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel4Template]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel4Template_AmploDecompositionProcessLevel2Template] FOREIGN KEY([DecompositionProcessLevel2TempateID])
REFERENCES [Amplo].[AmploDecompositionProcessLevel2Template] ([DecompositionProcessLevel2TemplateID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel4Template] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel4Template_AmploDecompositionProcessLevel2Template]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel4Template]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel4Template_AmploDecompositionProcessLevel3Template] FOREIGN KEY([DecompositionProcessLevel3TempateID])
REFERENCES [Amplo].[AmploDecompositionProcessLevel3Template] ([DecompositionProcessLevel3TemplateID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel4Template] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel4Template_AmploDecompositionProcessLevel3Template]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel4Template]  WITH CHECK ADD  CONSTRAINT [FK_DecompProcessLevel4_DecompProcessLevel3] FOREIGN KEY([DecompositionProcessLevel1TempateID])
REFERENCES [Amplo].[AmploDecompositionProcessLevel1Template] ([AmploDecompositionProcessLevel1TemplateID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel4Template] CHECK CONSTRAINT [FK_DecompProcessLevel4_DecompProcessLevel3]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel5Template]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel5Template_AmploDecompositionProcessLevel2Template] FOREIGN KEY([DecompositionProcessLevel2TemplateID])
REFERENCES [Amplo].[AmploDecompositionProcessLevel2Template] ([DecompositionProcessLevel2TemplateID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel5Template] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel5Template_AmploDecompositionProcessLevel2Template]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel5Template]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel5Template_AmploDecompositionProcessLevel3Template] FOREIGN KEY([DecompositionProcessLevel3TemplateID])
REFERENCES [Amplo].[AmploDecompositionProcessLevel3Template] ([DecompositionProcessLevel3TemplateID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel5Template] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel5Template_AmploDecompositionProcessLevel3Template]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel5Template]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel5Template_AmploDecompositionProcessLevel4Template] FOREIGN KEY([DecompositionProcessLevel4TemplateID])
REFERENCES [Amplo].[AmploDecompositionProcessLevel4Template] ([DecompositionProcessLevel4TemplateID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel5Template] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel5Template_AmploDecompositionProcessLevel4Template]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel5Template]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel5Template_AmploDecompositionProcessLevel5Template] FOREIGN KEY([DecompositionProcessLevel5TemplateID])
REFERENCES [Amplo].[AmploDecompositionProcessLevel5Template] ([DecompositionProcessLevel5TemplateID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel5Template] CHECK CONSTRAINT [FK_AmploDecompositionProcessLevel5Template_AmploDecompositionProcessLevel5Template]
GO
ALTER TABLE [Amplo].[AmploIndustrySubVertical]  WITH CHECK ADD  CONSTRAINT [FK_AmploIndustrySubVertical_AmploIndustryVertical] FOREIGN KEY([IndustryVerticalID])
REFERENCES [Amplo].[AmploIndustryVertical] ([IndustryVerticalID])
GO
ALTER TABLE [Amplo].[AmploIndustrySubVertical] CHECK CONSTRAINT [FK_AmploIndustrySubVertical_AmploIndustryVertical]
GO
ALTER TABLE [Amplo].[BenchmarkAssessment]  WITH CHECK ADD  CONSTRAINT [FK_BenchmarkAssessment_BenchmarkProject1] FOREIGN KEY([BenchmarkProjectID])
REFERENCES [Amplo].[BenchmarkProject] ([BenchmarkProjectID])
GO
ALTER TABLE [Amplo].[BenchmarkAssessment] CHECK CONSTRAINT [FK_BenchmarkAssessment_BenchmarkProject1]
GO
ALTER TABLE [Amplo].[BenchmarkGoalSetting]  WITH CHECK ADD  CONSTRAINT [FK_BenchmarkingGoalSetting_BenchmarkProject1] FOREIGN KEY([BenchmarkProjectID])
REFERENCES [Amplo].[BenchmarkProject] ([BenchmarkProjectID])
GO
ALTER TABLE [Amplo].[BenchmarkGoalSetting] CHECK CONSTRAINT [FK_BenchmarkingGoalSetting_BenchmarkProject1]
GO
ALTER TABLE [Amplo].[BenchmarkingGoalSetting]  WITH CHECK ADD  CONSTRAINT [FK_AmploBenchmarkingGoalSetting_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[BenchmarkingGoalSetting] CHECK CONSTRAINT [FK_AmploBenchmarkingGoalSetting_Client]
GO
ALTER TABLE [Amplo].[BenchmarkProject]  WITH CHECK ADD  CONSTRAINT [FK_AmploBenchmarkProject_BenchmarkProjectStatus] FOREIGN KEY([status])
REFERENCES [Amplo].[BenchmarkStatus] ([StatusID])
GO
ALTER TABLE [Amplo].[BenchmarkProject] CHECK CONSTRAINT [FK_AmploBenchmarkProject_BenchmarkProjectStatus]
GO
ALTER TABLE [Amplo].[BenchmarkProjectUser]  WITH CHECK ADD  CONSTRAINT [FK_AmploBenchmarkProjectUser_BenchmarkProject] FOREIGN KEY([BenchmarkProjectID])
REFERENCES [Amplo].[BenchmarkProject] ([BenchmarkProjectID])
GO
ALTER TABLE [Amplo].[BenchmarkProjectUser] CHECK CONSTRAINT [FK_AmploBenchmarkProjectUser_BenchmarkProject]
GO
ALTER TABLE [Amplo].[BenchmarkProjectUser]  WITH CHECK ADD  CONSTRAINT [FK_AmploBenchmarkProjectUser_User] FOREIGN KEY([UserID])
REFERENCES [Amplo].[User] ([UserID])
GO
ALTER TABLE [Amplo].[BenchmarkProjectUser] CHECK CONSTRAINT [FK_AmploBenchmarkProjectUser_User]
GO
ALTER TABLE [Amplo].[BenchmarkQuestionOption]  WITH CHECK ADD  CONSTRAINT [FK_BenchmarkQuestionOption_BenchmarkQuestion] FOREIGN KEY([BenchmarkQuestionID])
REFERENCES [Amplo].[BenchmarkQuestion] ([BenchmarkQuestionID])
GO
ALTER TABLE [Amplo].[BenchmarkQuestionOption] CHECK CONSTRAINT [FK_BenchmarkQuestionOption_BenchmarkQuestion]
GO
ALTER TABLE [Amplo].[ClientAudit]  WITH CHECK ADD  CONSTRAINT [FK_ClientAudit_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[ClientAudit] CHECK CONSTRAINT [FK_ClientAudit_Client]
GO
ALTER TABLE [Amplo].[ClientSchemaCreation]  WITH CHECK ADD FOREIGN KEY([ClientId])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[ClientSchemaCreationLog]  WITH CHECK ADD FOREIGN KEY([ClientSchemaCreationId])
REFERENCES [Amplo].[ClientSchemaCreation] ([ClientSchemaCreationId])
GO
ALTER TABLE [Amplo].[ClientSchemaGrantLog]  WITH CHECK ADD FOREIGN KEY([ClientSchemaCreationId])
REFERENCES [Amplo].[ClientSchemaCreation] ([ClientSchemaCreationId])
GO
ALTER TABLE [Amplo].[ClientSchemaGrantLog]  WITH CHECK ADD FOREIGN KEY([GrantAccessToOtherObjectsId])
REFERENCES [Amplo].[GrantAccessToOtherObjects] ([GrantAccessToOtherObjectsId])
GO
ALTER TABLE [Amplo].[CMAdditionalDetailImportStaging]  WITH CHECK ADD FOREIGN KEY([MasterId])
REFERENCES [Amplo].[CMProjectImportStaging] ([Id])
GO
ALTER TABLE [Amplo].[CMDecompositionImportStaging]  WITH CHECK ADD FOREIGN KEY([MasterId])
REFERENCES [Amplo].[CMProjectImportStaging] ([Id])
GO
ALTER TABLE [Amplo].[CMProcessL1ImportStaging]  WITH CHECK ADD FOREIGN KEY([MasterId])
REFERENCES [Amplo].[CMProjectImportStaging] ([Id])
GO
ALTER TABLE [Amplo].[CMScoringMechanismImportStaging]  WITH CHECK ADD FOREIGN KEY([MasterId])
REFERENCES [Amplo].[CMProjectImportStaging] ([Id])
GO
ALTER TABLE [Amplo].[CMTempClientRelationship]  WITH CHECK ADD  CONSTRAINT [FK_CMTempClientRelationship_Client_1] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[CMTempClientRelationship] CHECK CONSTRAINT [FK_CMTempClientRelationship_Client_1]
GO
ALTER TABLE [Amplo].[DashboardAnnouncement]  WITH CHECK ADD  CONSTRAINT [FK_DashboardAnnouncement_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardAnnouncement] CHECK CONSTRAINT [FK_DashboardAnnouncement_Client]
GO
ALTER TABLE [Amplo].[DashboardEvent]  WITH CHECK ADD  CONSTRAINT [FK_DashboardEvent_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardEvent] CHECK CONSTRAINT [FK_DashboardEvent_Client]
GO
ALTER TABLE [Amplo].[DashboardHighlights]  WITH CHECK ADD  CONSTRAINT [FK_DashboardHighlights_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardHighlights] CHECK CONSTRAINT [FK_DashboardHighlights_Client]
GO
ALTER TABLE [Amplo].[DashboardIndustryNews]  WITH CHECK ADD  CONSTRAINT [FK_DashboardIndustryNews_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardIndustryNews] CHECK CONSTRAINT [FK_DashboardIndustryNews_Client]
GO
ALTER TABLE [Amplo].[DashboardPopularResource]  WITH CHECK ADD  CONSTRAINT [FK_DashboardPopularResource_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardPopularResource] CHECK CONSTRAINT [FK_DashboardPopularResource_Client]
GO
ALTER TABLE [Amplo].[DashboardTODO]  WITH CHECK ADD  CONSTRAINT [FK_DashboardTODO_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardTODO] CHECK CONSTRAINT [FK_DashboardTODO_Client]
GO
ALTER TABLE [Amplo].[DashboardWebinar]  WITH CHECK ADD  CONSTRAINT [FK_DashboardWebinar_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardWebinar] CHECK CONSTRAINT [FK_DashboardWebinar_Client]
GO
ALTER TABLE [Amplo].[DecompositionActivityBank]  WITH CHECK ADD  CONSTRAINT [FK_ActivityBank_DecompositionFunction] FOREIGN KEY([DecompositionFunctionID])
REFERENCES [Amplo].[DecompositionFunction] ([DecompositionFunctionID])
GO
ALTER TABLE [Amplo].[DecompositionActivityBank] CHECK CONSTRAINT [FK_ActivityBank_DecompositionFunction]
GO
ALTER TABLE [Amplo].[DecompositionGridViewLocationMap]  WITH CHECK ADD  CONSTRAINT [FK_GridViewLocationMap_DecompositionFunction] FOREIGN KEY([DecompositionFunctionID])
REFERENCES [Amplo].[DecompositionFunction] ([DecompositionFunctionID])
GO
ALTER TABLE [Amplo].[DecompositionGridViewLocationMap] CHECK CONSTRAINT [FK_GridViewLocationMap_DecompositionFunction]
GO
ALTER TABLE [Amplo].[DecompositionGridViewLocationMap]  WITH CHECK ADD  CONSTRAINT [FK_GridViewLocationMap_DecompositionPhase] FOREIGN KEY([DecompositionPhaseID])
REFERENCES [Amplo].[DecompositionPhase] ([DecompositionPhaseID])
GO
ALTER TABLE [Amplo].[DecompositionGridViewLocationMap] CHECK CONSTRAINT [FK_GridViewLocationMap_DecompositionPhase]
GO
ALTER TABLE [Amplo].[DecompositionLevel1Activity]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionLevel1Activity_DecompositionLevel1Activity] FOREIGN KEY([DecompositionFunctionID])
REFERENCES [Amplo].[DecompositionFunction] ([DecompositionFunctionID])
GO
ALTER TABLE [Amplo].[DecompositionLevel1Activity] CHECK CONSTRAINT [FK_DecompositionLevel1Activity_DecompositionLevel1Activity]
GO
ALTER TABLE [Amplo].[DecompositionLevel1ActivityBank]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionLevel1ActivityBank_DecompositionProjectUser] FOREIGN KEY([DecompositionProjectUserID])
REFERENCES [Amplo].[DecompositionProjectUser] ([DecompositionProjectUserID])
GO
ALTER TABLE [Amplo].[DecompositionLevel1ActivityBank] CHECK CONSTRAINT [FK_DecompositionLevel1ActivityBank_DecompositionProjectUser]
GO
ALTER TABLE [Amplo].[DecompositionPhaseProject]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionPhaseProject_DecompositionProject] FOREIGN KEY([DecompositionProjectID])
REFERENCES [Amplo].[DecompositionProject] ([DecompositionProjectID])
GO
ALTER TABLE [Amplo].[DecompositionPhaseProject] CHECK CONSTRAINT [FK_DecompositionPhaseProject_DecompositionProject]
GO
ALTER TABLE [Amplo].[DecompositionPhaseProject]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionPhaseProject_User] FOREIGN KEY([UserID])
REFERENCES [Amplo].[User] ([UserID])
GO
ALTER TABLE [Amplo].[DecompositionPhaseProject] CHECK CONSTRAINT [FK_DecompositionPhaseProject_User]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel1Score]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel1Score_DecompositionProcessLevel1] FOREIGN KEY([DecompositionProcessLevel1ID])
REFERENCES [Amplo].[DecompositionProcessLevel1] ([DecompositionProcessLevel1ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel1Score] CHECK CONSTRAINT [FK_DecompositionProcessLevel1Score_DecompositionProcessLevel1]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel2Score]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel2Score_DecompositionProcessLevel2] FOREIGN KEY([DecompositionProcessLevel2ID])
REFERENCES [Amplo].[DecompositionProcessLevel2] ([DecompositionProcessLevel2ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel2Score] CHECK CONSTRAINT [FK_DecompositionProcessLevel2Score_DecompositionProcessLevel2]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel3]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel3_DecompositionProcessLevel2] FOREIGN KEY([DecompositionProcessLevel2ID])
REFERENCES [Amplo].[DecompositionProcessLevel2] ([DecompositionProcessLevel2ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel3] CHECK CONSTRAINT [FK_DecompositionProcessLevel3_DecompositionProcessLevel2]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel3Score]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel3Score_DecompositionProcessLevel3] FOREIGN KEY([DecompositionProcessLevel3ID])
REFERENCES [Amplo].[DecompositionProcessLevel3] ([DecompositionProcessLevel3ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel3Score] CHECK CONSTRAINT [FK_DecompositionProcessLevel3Score_DecompositionProcessLevel3]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel4]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel4_DecompositionProcessLevel3] FOREIGN KEY([DecompositionProcessLevel3ID])
REFERENCES [Amplo].[DecompositionProcessLevel3] ([DecompositionProcessLevel3ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel4] CHECK CONSTRAINT [FK_DecompositionProcessLevel4_DecompositionProcessLevel3]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel4Score]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel4Score_DecompositionProcessLevel4] FOREIGN KEY([DecompositionProcessLevel4ID])
REFERENCES [Amplo].[DecompositionProcessLevel4] ([DecompositionProcessLevel4ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel4Score] CHECK CONSTRAINT [FK_DecompositionProcessLevel4Score_DecompositionProcessLevel4]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel5]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel5_DecompositionProcessLevel4] FOREIGN KEY([DecompositionProcessLevel4ID])
REFERENCES [Amplo].[DecompositionProcessLevel4] ([DecompositionProcessLevel4ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel5] CHECK CONSTRAINT [FK_DecompositionProcessLevel5_DecompositionProcessLevel4]
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel5Score]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel5Score_DecompositionProcessLevel5] FOREIGN KEY([DecompositionProcessLevel5ID])
REFERENCES [Amplo].[DecompositionProcessLevel5] ([DecompositionProcessLevel5ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel5Score] CHECK CONSTRAINT [FK_DecompositionProcessLevel5Score_DecompositionProcessLevel5]
GO
ALTER TABLE [Amplo].[DecompositionProject]  WITH CHECK ADD  CONSTRAINT [FK_AmploDecompositionProject_ProjectStatus] FOREIGN KEY([StatusID])
REFERENCES [Amplo].[DecompositionStatus] ([StatusID])
GO
ALTER TABLE [Amplo].[DecompositionProject] CHECK CONSTRAINT [FK_AmploDecompositionProject_ProjectStatus]
GO
ALTER TABLE [Amplo].[DecompositionProjectUser]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProjectUser_DecompositionProject] FOREIGN KEY([DecompositionProjectID])
REFERENCES [Amplo].[DecompositionProject] ([DecompositionProjectID])
GO
ALTER TABLE [Amplo].[DecompositionProjectUser] CHECK CONSTRAINT [FK_DecompositionProjectUser_DecompositionProject]
GO
ALTER TABLE [Amplo].[DecompositionProjectUser]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionProjectUser_User] FOREIGN KEY([UserID])
REFERENCES [Amplo].[User] ([UserID])
GO
ALTER TABLE [Amplo].[DecompositionProjectUser] CHECK CONSTRAINT [FK_DecompositionProjectUser_User]
GO
ALTER TABLE [Amplo].[DecompositionScoreCriteriaProject]  WITH CHECK ADD  CONSTRAINT [FK_DecompositionScoreCriteriaProject_DecompositionProject] FOREIGN KEY([DecompositionProcessLevel1ID])
REFERENCES [Amplo].[DecompositionProcessLevel1] ([DecompositionProcessLevel1ID])
GO
ALTER TABLE [Amplo].[DecompositionScoreCriteriaProject] CHECK CONSTRAINT [FK_DecompositionScoreCriteriaProject_DecompositionProject]
GO
ALTER TABLE [Amplo].[GettingStartedVideos]  WITH CHECK ADD  CONSTRAINT [FK_GettingStartedVideos_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[GettingStartedVideos] CHECK CONSTRAINT [FK_GettingStartedVideos_Client]
GO
ALTER TABLE [Amplo].[KPI]  WITH CHECK ADD  CONSTRAINT [FK_KPI_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[KPI] CHECK CONSTRAINT [FK_KPI_Client]
GO
ALTER TABLE [Amplo].[KPIControlLevers]  WITH CHECK ADD  CONSTRAINT [FK_KPIControlLevers_KPI] FOREIGN KEY([KPIID])
REFERENCES [Amplo].[KPI] ([KPIID])
GO
ALTER TABLE [Amplo].[KPIControlLevers] CHECK CONSTRAINT [FK_KPIControlLevers_KPI]
GO
ALTER TABLE [Amplo].[KPIDimension]  WITH CHECK ADD  CONSTRAINT [FK_KPIDimension_BenchmarkProject] FOREIGN KEY([BenchmarkProjectID])
REFERENCES [Amplo].[BenchmarkProject] ([BenchmarkProjectID])
GO
ALTER TABLE [Amplo].[KPIDimension] CHECK CONSTRAINT [FK_KPIDimension_BenchmarkProject]
GO
ALTER TABLE [Amplo].[KPIDimension]  WITH CHECK ADD  CONSTRAINT [FK_KPIDimension_DecompositionProject] FOREIGN KEY([DecompositionProjectID])
REFERENCES [Amplo].[DecompositionProject] ([DecompositionProjectID])
GO
ALTER TABLE [Amplo].[KPIDimension] CHECK CONSTRAINT [FK_KPIDimension_DecompositionProject]
GO
ALTER TABLE [Amplo].[KPIDimension]  WITH CHECK ADD  CONSTRAINT [FK_KPIDimension_KPI] FOREIGN KEY([KPIID])
REFERENCES [Amplo].[KPI] ([KPIID])
GO
ALTER TABLE [Amplo].[KPIDimension] CHECK CONSTRAINT [FK_KPIDimension_KPI]
GO
ALTER TABLE [Amplo].[KPISet]  WITH CHECK ADD  CONSTRAINT [FK_KPISet_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[KPISet] CHECK CONSTRAINT [FK_KPISet_Client]
GO
ALTER TABLE [Amplo].[KPISet]  WITH CHECK ADD  CONSTRAINT [FK_KPISet_KPIDimension] FOREIGN KEY([KPIDimensionID])
REFERENCES [Amplo].[KPIDimension] ([KPIDimensionID])
GO
ALTER TABLE [Amplo].[KPISet] CHECK CONSTRAINT [FK_KPISet_KPIDimension]
GO
ALTER TABLE [Amplo].[RolesFunctioanlResource]  WITH CHECK ADD  CONSTRAINT [FK_RolesFunctioanlResource_Role] FOREIGN KEY([RoleID])
REFERENCES [Amplo].[Role] ([RoleID])
GO
ALTER TABLE [Amplo].[RolesFunctioanlResource] CHECK CONSTRAINT [FK_RolesFunctioanlResource_Role]
GO
ALTER TABLE [Amplo].[RolesFunctionalResource]  WITH CHECK ADD  CONSTRAINT [FK_RolesFunctionalResource_Role] FOREIGN KEY([RoleID])
REFERENCES [Amplo].[Role] ([RoleID])
GO
ALTER TABLE [Amplo].[RolesFunctionalResource] CHECK CONSTRAINT [FK_RolesFunctionalResource_Role]
GO
ALTER TABLE [Amplo].[Subscription]  WITH CHECK ADD  CONSTRAINT [FK_Subscription_Subscription] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[Subscription] CHECK CONSTRAINT [FK_Subscription_Subscription]
GO
ALTER TABLE [Amplo].[TemplateFunctPhaseStyleAssignment]  WITH CHECK ADD  CONSTRAINT [FK_TemplateFunctPhaseStyleAssignment_FunctionPhaseStyle] FOREIGN KEY([StyleID])
REFERENCES [Amplo].[FunctionPhaseStyle] ([FunctionPhaseStyleID])
GO
ALTER TABLE [Amplo].[TemplateFunctPhaseStyleAssignment] CHECK CONSTRAINT [FK_TemplateFunctPhaseStyleAssignment_FunctionPhaseStyle]
GO
ALTER TABLE [Amplo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[User] CHECK CONSTRAINT [FK_User_client]
GO
ALTER TABLE [Amplo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_UserType] FOREIGN KEY([UserTypeID])
REFERENCES [Amplo].[UserType] ([UserTypeID])
GO
ALTER TABLE [Amplo].[User] CHECK CONSTRAINT [FK_User_UserType]
GO
ALTER TABLE [Amplo].[UserType]  WITH CHECK ADD  CONSTRAINT [FK_UserType_UserCategory] FOREIGN KEY([UserCategoryID])
REFERENCES [Amplo].[UserCategory] ([UserCategoryID])
GO
ALTER TABLE [Amplo].[UserType] CHECK CONSTRAINT [FK_UserType_UserCategory]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Primary key for ErrorLog records.' , @level0type=N'SCHEMA',@level0name=N'Amplo', @level1type=N'TABLE',@level1name=N'ErrorLog', @level2type=N'COLUMN',@level2name=N'ErrorLogID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The date and time at which the error occurred.' , @level0type=N'SCHEMA',@level0name=N'Amplo', @level1type=N'TABLE',@level1name=N'ErrorLog', @level2type=N'COLUMN',@level2name=N'ErrorTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Default constraint value of GETDATE()' , @level0type=N'SCHEMA',@level0name=N'Amplo', @level1type=N'TABLE',@level1name=N'ErrorLog', @level2type=N'CONSTRAINT',@level2name=N'DF_ErrorLog_ErrorTime'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The user who executed the batch in which the error occurred.' , @level0type=N'SCHEMA',@level0name=N'Amplo', @level1type=N'TABLE',@level1name=N'ErrorLog', @level2type=N'COLUMN',@level2name=N'UserName'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The error number of the error that occurred.' , @level0type=N'SCHEMA',@level0name=N'Amplo', @level1type=N'TABLE',@level1name=N'ErrorLog', @level2type=N'COLUMN',@level2name=N'ErrorNumber'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The severity of the error that occurred.' , @level0type=N'SCHEMA',@level0name=N'Amplo', @level1type=N'TABLE',@level1name=N'ErrorLog', @level2type=N'COLUMN',@level2name=N'ErrorSeverity'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The state number of the error that occurred.' , @level0type=N'SCHEMA',@level0name=N'Amplo', @level1type=N'TABLE',@level1name=N'ErrorLog', @level2type=N'COLUMN',@level2name=N'ErrorState'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The name of the stored procedure or trigger where the error occurred.' , @level0type=N'SCHEMA',@level0name=N'Amplo', @level1type=N'TABLE',@level1name=N'ErrorLog', @level2type=N'COLUMN',@level2name=N'ErrorProcedure'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The line number at which the error occurred.' , @level0type=N'SCHEMA',@level0name=N'Amplo', @level1type=N'TABLE',@level1name=N'ErrorLog', @level2type=N'COLUMN',@level2name=N'ErrorLine'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'The message text of the error that occurred.' , @level0type=N'SCHEMA',@level0name=N'Amplo', @level1type=N'TABLE',@level1name=N'ErrorLog', @level2type=N'COLUMN',@level2name=N'ErrorMessage'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Primary key (clustered) constraint' , @level0type=N'SCHEMA',@level0name=N'Amplo', @level1type=N'TABLE',@level1name=N'ErrorLog', @level2type=N'CONSTRAINT',@level2name=N'PK_ErrorLog_ErrorLogID'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Audit table tracking errors in the the AdventureWorks database that are caught by the CATCH block of a TRY...CATCH construct. Data is inserted by stored procedure Amplo.uspLogError when it is executed from inside the CATCH block of a TRY...CATCH construct.' , @level0type=N'SCHEMA',@level0name=N'Amplo', @level1type=N'TABLE',@level1name=N'ErrorLog'
GO
