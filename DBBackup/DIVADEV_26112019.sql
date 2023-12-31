/****** Object:  Database [DIVAMT2]    Script Date: 26-11-2019 15:02:51 ******/
CREATE DATABASE [DIVAMT2]  (EDITION = 'Standard', SERVICE_OBJECTIVE = 'S0', MAXSIZE = 250 GB) WITH CATALOG_COLLATION = SQL_Latin1_General_CP1_CI_AS;
GO
ALTER DATABASE [DIVAMT2] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DIVAMT2] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DIVAMT2] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DIVAMT2] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DIVAMT2] SET ARITHABORT OFF 
GO
ALTER DATABASE [DIVAMT2] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DIVAMT2] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DIVAMT2] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DIVAMT2] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DIVAMT2] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DIVAMT2] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DIVAMT2] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DIVAMT2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DIVAMT2] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [DIVAMT2] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DIVAMT2] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [DIVAMT2] SET  MULTI_USER 
GO
ALTER DATABASE [DIVAMT2] SET ENCRYPTION ON
GO
ALTER DATABASE [DIVAMT2] SET QUERY_STORE = ON
GO
ALTER DATABASE [DIVAMT2] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 100, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO)
GO
/****** Object:  User [DIVADevelop]    Script Date: 26-11-2019 15:02:52 ******/
CREATE USER [DIVADevelop] FOR LOGIN [DIVADevelop] WITH DEFAULT_SCHEMA=[dbo;Amplo]
GO
/****** Object:  User [biswajitb]    Script Date: 26-11-2019 15:02:52 ******/
CREATE USER [biswajitb] FOR LOGIN [biswajitb] WITH DEFAULT_SCHEMA=[dbo;Amplo]
GO
/****** Object:  DatabaseRole [DIVAPORTALDEVELOPERS]    Script Date: 26-11-2019 15:02:53 ******/
CREATE ROLE [DIVAPORTALDEVELOPERS]
GO
/****** Object:  DatabaseRole [DIVADEVELOPERS]    Script Date: 26-11-2019 15:02:54 ******/
CREATE ROLE [DIVADEVELOPERS]
GO
/****** Object:  DatabaseRole [divadbreadrole]    Script Date: 26-11-2019 15:02:54 ******/
CREATE ROLE [divadbreadrole]
GO
sys.sp_addrolemember @rolename = N'DIVADEVELOPERS', @membername = N'DIVADevelop'
GO
sys.sp_addrolemember @rolename = N'DIVAPORTALDEVELOPERS', @membername = N'DIVADevelop'
GO
sys.sp_addrolemember @rolename = N'db_owner', @membername = N'DIVADevelop'
GO
sys.sp_addrolemember @rolename = N'db_ddladmin', @membername = N'DIVADevelop'
GO
sys.sp_addrolemember @rolename = N'db_datareader', @membername = N'DIVADevelop'
GO
sys.sp_addrolemember @rolename = N'db_datawriter', @membername = N'DIVADevelop'
GO
sys.sp_addrolemember @rolename = N'DIVADEVELOPERS', @membername = N'biswajitb'
GO
sys.sp_addrolemember @rolename = N'DIVAPORTALDEVELOPERS', @membername = N'biswajitb'
GO
sys.sp_addrolemember @rolename = N'db_owner', @membername = N'biswajitb'
GO
sys.sp_addrolemember @rolename = N'db_accessadmin', @membername = N'biswajitb'
GO
sys.sp_addrolemember @rolename = N'db_securityadmin', @membername = N'biswajitb'
GO
/****** Object:  Schema [Amplo]    Script Date: 26-11-2019 15:03:02 ******/
CREATE SCHEMA [Amplo]
GO
/****** Object:  Schema [AmploDev]    Script Date: 26-11-2019 15:03:02 ******/
CREATE SCHEMA [AmploDev]
GO
/****** Object:  Schema [HumanResources]    Script Date: 26-11-2019 15:03:02 ******/
CREATE SCHEMA [HumanResources]
GO
/****** Object:  Schema [poc1]    Script Date: 26-11-2019 15:03:02 ******/
CREATE SCHEMA [poc1]
GO
/****** Object:  UserDefinedTableType [Amplo].[ProfilingResponses]    Script Date: 26-11-2019 15:03:02 ******/
CREATE TYPE [Amplo].[ProfilingResponses] AS TABLE(
	[questionID] [int] NULL,
	[profilingAnswer] [varchar](max) NULL
)
GO
/****** Object:  UserDefinedTableType [Amplo].[QuestionResponse]    Script Date: 26-11-2019 15:03:02 ******/
CREATE TYPE [Amplo].[QuestionResponse] AS TABLE(
	[questionId] [int] NULL,
	[responseID] [int] NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[ProfilingResponses]    Script Date: 26-11-2019 15:03:02 ******/
CREATE TYPE [dbo].[ProfilingResponses] AS TABLE(
	[questionID] [int] NULL,
	[profilingAnswer] [varchar](max) NULL
)
GO
/****** Object:  UserDefinedFunction [Amplo].[CSVToList]    Script Date: 26-11-2019 15:03:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [Amplo].[CSVToList] (@CSV varchar(3000)) 
    RETURNS @Result TABLE (Value varchar(100))
AS   
BEGIN
    DECLARE @List TABLE
    (
        Value varchar(30)
    )

    DECLARE
        @Value varchar(30),
        @Pos int

    SET @CSV = LTRIM(RTRIM(@CSV))+ ','
    SET @Pos = CHARINDEX(',', @CSV, 1)

    IF REPLACE(@CSV, ',', '') <> ''
    BEGIN
        WHILE @Pos > 0
        BEGIN
            SET @Value = LTRIM(RTRIM(LEFT(@CSV, @Pos - 1)))

            IF @Value <> ''
                INSERT INTO @List (Value) VALUES (@Value) 

            SET @CSV = RIGHT(@CSV, LEN(@CSV) - @Pos)
            SET @Pos = CHARINDEX(',', @CSV, 1)
        END
    END     

    INSERT @Result
    SELECT
        Value
    FROM
        @List
    
    RETURN
END
GO
/****** Object:  UserDefinedFunction [Amplo].[ufngetAverageScore]    Script Date: 26-11-2019 15:03:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date, ,>
-- Description:	<Description, ,>
-- =============================================
CREATE FUNCTION [Amplo].[ufngetAverageScore]
(
	-- Add the parameters for the function here
	 @Score1 [float]
	,@Score2 [float]
	,@Score3 [float]
	,@Score4 [float]
	,@Score5 [float]
	,@Score6 [float]
	,@Score7 [float]
	,@Score8 [float]
	,@Score9 [float]
	,@Score10 [float]
	,@ScoreCriteriaCount [int]

)
RETURNS [float]
AS
BEGIN
	-- Declare the return variable here
	DECLARE @AverageScore [float]
--	DECLARE @TotalNoOfScoreCriteria [int]

--	SET @TotalNoOfScoreCriteria = 10;

	-- Add the T-SQL statements to compute the return value here
	
	SELECT @AverageScore = ((ISNULL(@Score1, 0.00) + ISNULL(@Score2, 0.00) + ISNULL(@Score3, 0.00) + ISNULL(@Score4, 0.00) + ISNULL(@Score5, 0.00) + ISNULL(@Score6, 0.00)+ ISNULL(@Score7, 0.00) + ISNULL(@Score8, 0.00) + ISNULL(@Score9, 0.00) + ISNULL(@Score10, 0.00)) / ISNULL(@ScoreCriteriaCount,4));

--	@AverageScore = @AverageScore / 10;
	
	-- Return the result of the function
	RETURN @AverageScore;

END
GO
/****** Object:  Table [Amplo].[UserAccessResource]    Script Date: 26-11-2019 15:03:02 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[User]    Script Date: 26-11-2019 15:03:04 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[formenu]    Script Date: 26-11-2019 15:03:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[formenu] AS
SELECT UAR.ClientID FROM((SELECT ClientID from Amplo.[User] WHERE UserID = 2 AND ActiveFlag = 1 AND DisableDate >GETDATE()) AS CID
INNER JOIN Amplo.[UserAccessResource] UAR
ON CID.ClientID = UAR.ClientID)
GO
/****** Object:  Table [Amplo].[Role]    Script Date: 26-11-2019 15:03:09 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[RolesFunctionalResource]    Script Date: 26-11-2019 15:03:09 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[FunctionalResources]    Script Date: 26-11-2019 15:03:10 ******/
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
 CONSTRAINT [PK_FunctionalResources] PRIMARY KEY CLUSTERED 
(
	[FunctionalResourceID] ASC
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[forMenus]    Script Date: 26-11-2019 15:03:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[forMenus] as Select fr.FunctionalResourceID, fr.MenuName, fr.MenuParentID, fr.ConfigurationFlag, rfr.ActionFlag, rfr.Action, fr.Category, fr.MenuURL  from
(Select ClientID from Amplo.[User] where UserID = 11 and ActiveFlag = 1) u
Inner JOIN Amplo.[UserAccessResource] uar ON uar.ClientID = u.ClientID and uar.ActiveFlag =1
Inner Join Amplo.[Role] r ON uar.RoleID = r.RoleID and r.ActiveFlag = 1
Inner Join Amplo.RolesFunctionalResource rfr on rfr.RoleID = r.RoleID
Inner JOIN Amplo.[FunctionalResources] fr on rfr.FunctionalResourceID = fr.FunctionalResourceID AND fr.ActiveFlag = 1
GO
/****** Object:  Table [Amplo].[AmploCompanyProfile]    Script Date: 26-11-2019 15:03:10 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploCountryRegion]    Script Date: 26-11-2019 15:03:10 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploDecompositionProcessLevel1]    Script Date: 26-11-2019 15:03:11 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploDomain]    Script Date: 26-11-2019 15:03:11 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploIndustry]    Script Date: 26-11-2019 15:03:13 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploIndustrySubVertical]    Script Date: 26-11-2019 15:03:14 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploIndustryVertical]    Script Date: 26-11-2019 15:03:14 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploProfilingAnswers]    Script Date: 26-11-2019 15:03:14 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploProfilingQuestions]    Script Date: 26-11-2019 15:03:15 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[AmploRatings]    Script Date: 26-11-2019 15:03:15 ******/
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
/****** Object:  Table [Amplo].[AmploUser]    Script Date: 26-11-2019 15:03:16 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkAssessment]    Script Date: 26-11-2019 15:03:17 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkAuditLog]    Script Date: 26-11-2019 15:03:17 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkGoalSetting]    Script Date: 26-11-2019 15:03:19 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkingDomain]    Script Date: 26-11-2019 15:03:20 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkingGoalSetting]    Script Date: 26-11-2019 15:03:20 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkingLevel]    Script Date: 26-11-2019 15:03:20 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkProject]    Script Date: 26-11-2019 15:03:22 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkProjectUser]    Script Date: 26-11-2019 15:03:22 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkQuestion]    Script Date: 26-11-2019 15:03:22 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkQuestionOption]    Script Date: 26-11-2019 15:03:22 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BenchmarkStatus]    Script Date: 26-11-2019 15:03:23 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[BusinessEntity]    Script Date: 26-11-2019 15:03:26 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[City]    Script Date: 26-11-2019 15:03:26 ******/
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
/****** Object:  Table [Amplo].[Client]    Script Date: 26-11-2019 15:03:28 ******/
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
	[SubscriptionKey] [varchar](100) NULL,
	[PrimaryUserID] [int] NULL,
	[ActiveFlag] [bit] NOT NULL,
	[RegistrationModeID] [int] NULL,
	[ClientCreatedBy] [varchar](100) NULL,
	[ClientCreatedDate] [datetime] NULL,
	[ClientModifiedBy] [varchar](100) NULL,
	[ClientModifiedDate] [datetime] NULL,
	[ClientStatus] [varchar](50) NULL,
 CONSTRAINT [PK_client] PRIMARY KEY CLUSTERED 
(
	[ClientID] ASC
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[ClientRevenueRange]    Script Date: 26-11-2019 15:03:28 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Country]    Script Date: 26-11-2019 15:03:29 ******/
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
 CONSTRAINT [PK__Country__3213E83F57A51C81] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[countryregions]    Script Date: 26-11-2019 15:03:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[countryregions](
	[CountryRegionCode] [nvarchar](50) NOT NULL,
	[Name] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DashboardAnnouncement]    Script Date: 26-11-2019 15:03:31 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DashboardEvent]    Script Date: 26-11-2019 15:03:31 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DashboardHighlights]    Script Date: 26-11-2019 15:03:32 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DashboardIndustryNews]    Script Date: 26-11-2019 15:03:32 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DashboardPopularResource]    Script Date: 26-11-2019 15:03:33 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DashboardTODO]    Script Date: 26-11-2019 15:03:33 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DashboardWebinar]    Script Date: 26-11-2019 15:03:34 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionActivityBank]    Script Date: 26-11-2019 15:03:35 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionFunction]    Script Date: 26-11-2019 15:03:35 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionFunctionProject]    Script Date: 26-11-2019 15:03:35 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionGridViewLocationMap]    Script Date: 26-11-2019 15:03:35 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionGridViewMap]    Script Date: 26-11-2019 15:03:36 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionLevel1Activity]    Script Date: 26-11-2019 15:03:36 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionLevel1ActivityBank]    Script Date: 26-11-2019 15:03:36 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionPhase]    Script Date: 26-11-2019 15:03:37 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionPhaseProject]    Script Date: 26-11-2019 15:03:37 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel0ID]    Script Date: 26-11-2019 15:03:38 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel1]    Script Date: 26-11-2019 15:03:39 ******/
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
 CONSTRAINT [PK_DecompositionProcessLevel1] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel1ID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel1Score]    Script Date: 26-11-2019 15:03:40 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel2]    Script Date: 26-11-2019 15:03:40 ******/
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
 CONSTRAINT [PK_DecompositionProcessLevel2] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel2ID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel2Score]    Script Date: 26-11-2019 15:03:41 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel3]    Script Date: 26-11-2019 15:03:41 ******/
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
 CONSTRAINT [PK_DecompositionProcessLevel3] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel3ID] ASC
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel3Score]    Script Date: 26-11-2019 15:03:41 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel4]    Script Date: 26-11-2019 15:03:41 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel4Score]    Script Date: 26-11-2019 15:03:44 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel5]    Script Date: 26-11-2019 15:05:48 ******/
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
 CONSTRAINT [PK_DecompositionProcessLevel5] PRIMARY KEY CLUSTERED 
(
	[DecompositionProcessLevel5ID] ASC
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProcessLevel5Score]    Script Date: 26-11-2019 15:05:52 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProject]    Script Date: 26-11-2019 15:05:52 ******/
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
 CONSTRAINT [PK_DecompositionProject] PRIMARY KEY CLUSTERED 
(
	[DecompositionProjectID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionProjectUser]    Script Date: 26-11-2019 15:05:53 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionScoreCalculationFunction]    Script Date: 26-11-2019 15:05:53 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionScoreCriteria]    Script Date: 26-11-2019 15:05:54 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionScoreCriteriaProject]    Script Date: 26-11-2019 15:05:54 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionStatus]    Script Date: 26-11-2019 15:05:54 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[DecompositionUserAccess]    Script Date: 26-11-2019 15:05:55 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[EmailVerification]    Script Date: 26-11-2019 15:05:56 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[ErrorLog]    Script Date: 26-11-2019 15:05:59 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[GettingStartedVideos]    Script Date: 26-11-2019 15:06:32 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Industry]    Script Date: 26-11-2019 15:06:34 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[KPI]    Script Date: 26-11-2019 15:06:35 ******/
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
 CONSTRAINT [PK_KPI] PRIMARY KEY CLUSTERED 
(
	[KPIID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[KPICapabilities]    Script Date: 26-11-2019 15:06:35 ******/
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
 CONSTRAINT [PK_KPICapabilities] PRIMARY KEY CLUSTERED 
(
	[KPICapabilitiesID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[KPIControlLevers]    Script Date: 26-11-2019 15:06:36 ******/
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
 CONSTRAINT [PK_KPIControlLevers] PRIMARY KEY CLUSTERED 
(
	[KPIControlLeversID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[KPIInhibitors]    Script Date: 26-11-2019 15:06:37 ******/
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
 CONSTRAINT [PK_KPIInhibitors] PRIMARY KEY CLUSTERED 
(
	[KPIInhibitorsID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Message]    Script Date: 26-11-2019 15:06:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Message](
	[MessageID] [int] IDENTITY(1,1) NOT NULL,
	[MessageName] [varchar](100) NOT NULL,
 CONSTRAINT [PK__Message__C87C037C47BFBAD3] PRIMARY KEY CLUSTERED 
(
	[MessageID] ASC
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Message1]    Script Date: 26-11-2019 15:06:38 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Password]    Script Date: 26-11-2019 15:06:38 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[PasswordQuestion]    Script Date: 26-11-2019 15:06:38 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Region]    Script Date: 26-11-2019 15:06:39 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[RegistrationMode]    Script Date: 26-11-2019 15:06:39 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Report]    Script Date: 26-11-2019 15:06:39 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[RestrictedEmailDomain]    Script Date: 26-11-2019 15:06:40 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[RolesFunctioanlResource]    Script Date: 26-11-2019 15:06:40 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Services]    Script Date: 26-11-2019 15:06:40 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[SimpleDemo]    Script Date: 26-11-2019 15:06:41 ******/
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
/****** Object:  Table [Amplo].[StateProvince]    Script Date: 26-11-2019 15:06:42 ******/
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
/****** Object:  Table [Amplo].[StatusLookup]    Script Date: 26-11-2019 15:06:42 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[Subscription]    Script Date: 26-11-2019 15:06:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [Amplo].[Subscription](
	[SubscriptionID] [int] NOT NULL,
	[SubscriptionName] [varchar](100) NOT NULL,
	[SubscriptionDescription] [varchar](256) NULL,
	[SubscriptionKey] [varchar](50) NULL,
	[ActiveFlag] [bit] NOT NULL,
	[StartDate] [nchar](10) NULL,
	[EndDate] [nchar](10) NULL,
	[Created_By] [varchar](50) NULL,
	[Created_On] [datetime] NULL,
	[Modified_By] [varchar](50) NULL,
	[Modified_Date] [datetime] NULL,
 CONSTRAINT [PK_Subscription] PRIMARY KEY CLUSTERED 
(
	[SubscriptionID] ASC
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UserCategory]    Script Date: 26-11-2019 15:06:43 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UserDIVATeam]    Script Date: 26-11-2019 15:06:43 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UserDomainAccess]    Script Date: 26-11-2019 15:06:43 ******/
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
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UserReportAccess]    Script Date: 26-11-2019 15:06:44 ******/
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
 CONSTRAINT [PK_UserReportAccess] PRIMARY KEY CLUSTERED 
(
	[UserReportAccessID] ASC
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UserStatus]    Script Date: 26-11-2019 15:06:48 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [Amplo].[UserType]    Script Date: 26-11-2019 15:06:48 ******/
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BusinessEntity]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BusinessEntity](
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
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [HumanResources].[Employee]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [HumanResources].[Employee](
	[BusinessEntityID] [int] IDENTITY(1,1) NOT NULL,
	[NationalIDNumber] [nvarchar](15) NULL,
	[EmployeeID] [nvarchar](50) NOT NULL,
	[OrganizationLevel] [int] NULL,
	[JobTitle] [nvarchar](50) NULL,
	[BirthDate] [date] NULL,
	[MaritalStatus] [nchar](1) NULL,
	[Gender] [nchar](1) NULL,
	[HireDate] [date] NULL,
	[ActiveFlag] [bit] NULL,
 CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC
)WITH (STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_BenchmarkAuditLog]    Script Date: 26-11-2019 15:06:49 ******/
CREATE NONCLUSTERED INDEX [IX_BenchmarkAuditLog] ON [Amplo].[BenchmarkAuditLog]
(
	[BenchmarkProjectID] ASC,
	[ClientID] ASC,
	[DomainID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_BenchmarkAuditLog_1]    Script Date: 26-11-2019 15:06:49 ******/
CREATE NONCLUSTERED INDEX [IX_BenchmarkAuditLog_1] ON [Amplo].[BenchmarkAuditLog]
(
	[BenchmarkProjectID] ASC,
	[ClientID] ASC,
	[DomainID] ASC,
	[QuestionID] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF) ON [PRIMARY]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1] ADD  CONSTRAINT [DF_AmploDecompositionProcessLevel1_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[AmploDomain] ADD  CONSTRAINT [DF_AmploDomain_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[AmploIndustrySubVertical] ADD  CONSTRAINT [DF_IndustrySubVertical_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[BenchmarkingDomain] ADD  CONSTRAINT [DF_BenchmarkDomain_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[BenchmarkProject] ADD  CONSTRAINT [DF__Benchmark__Disab__5A1A5A11]  DEFAULT ((0)) FOR [DisabledFlag]
GO
ALTER TABLE [Amplo].[BenchmarkProject] ADD  CONSTRAINT [DF__Benchmark__Disab__5B0E7E4A]  DEFAULT ((0)) FOR [DisableFlag]
GO
ALTER TABLE [Amplo].[BenchmarkProject] ADD  CONSTRAINT [DF_BenchmarkProject_LockFlag]  DEFAULT ((0)) FOR [LockedFlag]
GO
ALTER TABLE [Amplo].[BenchmarkProjectUser] ADD  CONSTRAINT [DF_BenchmarkProjectUser_ActivityFlag]  DEFAULT ((1)) FOR [ActivityFlag]
GO
ALTER TABLE [Amplo].[BenchmarkProjectUser] ADD  CONSTRAINT [DF__Benchmark__Activ__5649C92D]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[Country] ADD  CONSTRAINT [DF__Country__iso3__2D7CBDC4]  DEFAULT (NULL) FOR [iso3]
GO
ALTER TABLE [Amplo].[Country] ADD  CONSTRAINT [DF__Country__numcode__2E70E1FD]  DEFAULT (NULL) FOR [numcode]
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
ALTER TABLE [Amplo].[UserAccessResource] ADD  CONSTRAINT [DF_FUserAccessResource_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[UserDIVATeam] ADD  CONSTRAINT [DF_UserDIVATeam_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
ALTER TABLE [Amplo].[AmploCompanyProfile]  WITH NOCHECK ADD  CONSTRAINT [FK_AmploCompanyProfile_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[AmploCompanyProfile] NOCHECK CONSTRAINT [FK_AmploCompanyProfile_Client]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1]  WITH NOCHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel1_DecompositionFunction] FOREIGN KEY([DecompositionFunctionID])
REFERENCES [Amplo].[DecompositionFunction] ([DecompositionFunctionID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1] NOCHECK CONSTRAINT [FK_AmploDecompositionProcessLevel1_DecompositionFunction]
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1]  WITH NOCHECK ADD  CONSTRAINT [FK_AmploDecompositionProcessLevel1_DecompositionPhase] FOREIGN KEY([DecompositionPhaseID])
REFERENCES [Amplo].[DecompositionPhase] ([DecompositionPhaseID])
GO
ALTER TABLE [Amplo].[AmploDecompositionProcessLevel1] NOCHECK CONSTRAINT [FK_AmploDecompositionProcessLevel1_DecompositionPhase]
GO
ALTER TABLE [Amplo].[AmploIndustrySubVertical]  WITH NOCHECK ADD  CONSTRAINT [FK_AmploIndustrySubVertical_AmploIndustryVertical] FOREIGN KEY([IndustryVerticalID])
REFERENCES [Amplo].[AmploIndustryVertical] ([IndustryVerticalID])
GO
ALTER TABLE [Amplo].[AmploIndustrySubVertical] NOCHECK CONSTRAINT [FK_AmploIndustrySubVertical_AmploIndustryVertical]
GO
ALTER TABLE [Amplo].[AmploUser]  WITH NOCHECK ADD  CONSTRAINT [FK_AmploUsers_AmploUsers] FOREIGN KEY([UserTypeID])
REFERENCES [Amplo].[UserType] ([UserTypeID])
GO
ALTER TABLE [Amplo].[AmploUser] NOCHECK CONSTRAINT [FK_AmploUsers_AmploUsers]
GO
ALTER TABLE [Amplo].[AmploUser]  WITH NOCHECK ADD  CONSTRAINT [FK_AmploUsers_Employee] FOREIGN KEY([EmployeeID])
REFERENCES [HumanResources].[Employee] ([EmployeeID])
GO
ALTER TABLE [Amplo].[AmploUser] NOCHECK CONSTRAINT [FK_AmploUsers_Employee]
GO
ALTER TABLE [Amplo].[BenchmarkAssessment]  WITH CHECK ADD  CONSTRAINT [FK_BenchmarkAssessment_BenchmarkProject1] FOREIGN KEY([BenchmarkProjectID])
REFERENCES [Amplo].[BenchmarkProject] ([BenchmarkProjectID])
GO
ALTER TABLE [Amplo].[BenchmarkAssessment] CHECK CONSTRAINT [FK_BenchmarkAssessment_BenchmarkProject1]
GO
ALTER TABLE [Amplo].[BenchmarkGoalSetting]  WITH NOCHECK ADD  CONSTRAINT [FK_BenchmarkingGoalSetting_BenchmarkProject1] FOREIGN KEY([BenchmarkProjectID])
REFERENCES [Amplo].[BenchmarkProject] ([BenchmarkProjectID])
GO
ALTER TABLE [Amplo].[BenchmarkGoalSetting] NOCHECK CONSTRAINT [FK_BenchmarkingGoalSetting_BenchmarkProject1]
GO
ALTER TABLE [Amplo].[BenchmarkingGoalSetting]  WITH NOCHECK ADD  CONSTRAINT [FK_AmploBenchmarkingGoalSetting_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[BenchmarkingGoalSetting] NOCHECK CONSTRAINT [FK_AmploBenchmarkingGoalSetting_Client]
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
ALTER TABLE [Amplo].[BenchmarkQuestionOption]  WITH NOCHECK ADD  CONSTRAINT [FK_BenchmarkQuestionOption_BenchmarkQuestion] FOREIGN KEY([BenchmarkQuestionID])
REFERENCES [Amplo].[BenchmarkQuestion] ([BenchmarkQuestionID])
GO
ALTER TABLE [Amplo].[BenchmarkQuestionOption] NOCHECK CONSTRAINT [FK_BenchmarkQuestionOption_BenchmarkQuestion]
GO
ALTER TABLE [Amplo].[DashboardAnnouncement]  WITH NOCHECK ADD  CONSTRAINT [FK_DashboardAnnouncement_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardAnnouncement] NOCHECK CONSTRAINT [FK_DashboardAnnouncement_Client]
GO
ALTER TABLE [Amplo].[DashboardEvent]  WITH NOCHECK ADD  CONSTRAINT [FK_DashboardEvent_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardEvent] NOCHECK CONSTRAINT [FK_DashboardEvent_Client]
GO
ALTER TABLE [Amplo].[DashboardHighlights]  WITH NOCHECK ADD  CONSTRAINT [FK_DashboardHighlights_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardHighlights] NOCHECK CONSTRAINT [FK_DashboardHighlights_Client]
GO
ALTER TABLE [Amplo].[DashboardIndustryNews]  WITH NOCHECK ADD  CONSTRAINT [FK_DashboardIndustryNews_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardIndustryNews] NOCHECK CONSTRAINT [FK_DashboardIndustryNews_Client]
GO
ALTER TABLE [Amplo].[DashboardPopularResource]  WITH NOCHECK ADD  CONSTRAINT [FK_DashboardPopularResource_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardPopularResource] NOCHECK CONSTRAINT [FK_DashboardPopularResource_Client]
GO
ALTER TABLE [Amplo].[DashboardTODO]  WITH NOCHECK ADD  CONSTRAINT [FK_DashboardTODO_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardTODO] NOCHECK CONSTRAINT [FK_DashboardTODO_Client]
GO
ALTER TABLE [Amplo].[DashboardWebinar]  WITH NOCHECK ADD  CONSTRAINT [FK_DashboardWebinar_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[DashboardWebinar] NOCHECK CONSTRAINT [FK_DashboardWebinar_Client]
GO
ALTER TABLE [Amplo].[DecompositionActivityBank]  WITH NOCHECK ADD  CONSTRAINT [FK_ActivityBank_DecompositionFunction] FOREIGN KEY([DecompositionFunctionID])
REFERENCES [Amplo].[DecompositionFunction] ([DecompositionFunctionID])
GO
ALTER TABLE [Amplo].[DecompositionActivityBank] NOCHECK CONSTRAINT [FK_ActivityBank_DecompositionFunction]
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
ALTER TABLE [Amplo].[DecompositionProcessLevel3]  WITH NOCHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel3_DecompositionProcessLevel2] FOREIGN KEY([DecompositionProcessLevel2ID])
REFERENCES [Amplo].[DecompositionProcessLevel2] ([DecompositionProcessLevel2ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel3] NOCHECK CONSTRAINT [FK_DecompositionProcessLevel3_DecompositionProcessLevel2]
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
ALTER TABLE [Amplo].[DecompositionProcessLevel5]  WITH NOCHECK ADD  CONSTRAINT [FK_DecompositionProcessLevel5_DecompositionProcessLevel4] FOREIGN KEY([DecompositionProcessLevel4ID])
REFERENCES [Amplo].[DecompositionProcessLevel4] ([DecompositionProcessLevel4ID])
GO
ALTER TABLE [Amplo].[DecompositionProcessLevel5] NOCHECK CONSTRAINT [FK_DecompositionProcessLevel5_DecompositionProcessLevel4]
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
ALTER TABLE [Amplo].[GettingStartedVideos]  WITH NOCHECK ADD  CONSTRAINT [FK_GettingStartedVideos_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[GettingStartedVideos] NOCHECK CONSTRAINT [FK_GettingStartedVideos_Client]
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
ALTER TABLE [Amplo].[RolesFunctioanlResource]  WITH NOCHECK ADD  CONSTRAINT [FK_RolesFunctioanlResource_Role] FOREIGN KEY([RoleID])
REFERENCES [Amplo].[Role] ([RoleID])
GO
ALTER TABLE [Amplo].[RolesFunctioanlResource] NOCHECK CONSTRAINT [FK_RolesFunctioanlResource_Role]
GO
ALTER TABLE [Amplo].[RolesFunctionalResource]  WITH NOCHECK ADD  CONSTRAINT [FK_RolesFunctionalResource_Role] FOREIGN KEY([RoleID])
REFERENCES [Amplo].[Role] ([RoleID])
GO
ALTER TABLE [Amplo].[RolesFunctionalResource] NOCHECK CONSTRAINT [FK_RolesFunctionalResource_Role]
GO
ALTER TABLE [Amplo].[User]  WITH NOCHECK ADD  CONSTRAINT [FK_User_client] FOREIGN KEY([UserTypeID])
REFERENCES [Amplo].[UserType] ([UserTypeID])
GO
ALTER TABLE [Amplo].[User] NOCHECK CONSTRAINT [FK_User_client]
GO
ALTER TABLE [HumanResources].[Employee]  WITH NOCHECK ADD  CONSTRAINT [FK_Employee_BusinessEntity] FOREIGN KEY([BusinessEntityID])
REFERENCES [dbo].[BusinessEntity] ([BusinessEntityID])
GO
ALTER TABLE [HumanResources].[Employee] NOCHECK CONSTRAINT [FK_Employee_BusinessEntity]
GO
/****** Object:  StoredProcedure [Amplo].[CreateSchemaAndAllPOC]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[CreateSchemaAndAllPOC]
@SchemaName as nvarchar(100)
, @Login as nvarchar(100)
, @Password as nvarchar(100)
as
begin
	declare @SqlString as nvarchar(MAX) 
	= 
	'exec sp_executesql N''create schema ' + @SchemaName + '''
	 exec sp_addlogin ''' + @Login + ''', ''' + @Password + '''
		exec sp_adduser ''' + @Login + ''', ''' + @Login + '''

		GRANT REFERENCES, VIEW CHANGE TRACKING, CONTROL, CREATE SEQUENCE, EXECUTE, TAKE OWNERSHIP, VIEW DEFINITION, ALTER, SELECT, INSERT, UPDATE, DELETE ON SCHEMA :: ' + @SchemaName + ' TO ' + @Login + '
		
	'

	select @SqlString
	exec (@SqlString)

	--set @SqlString = 'SETUSER ''' + @Login + ''';  
	--GO

	--CREATE TABLE Test (ID int, width dec(10,2))'
	--select @SqlString
	--exec (@SqlString)
end
GO
/****** Object:  StoredProcedure [Amplo].[GetBMProjectUserDetails]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[GetBMProjectUserDetails]
 (
    @id int,
    @assessmentSetID varchar(100)
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentSetID - ID of set to get user details of
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    declare @clientID as INT
    Select @clientID = ClientID from Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

   select proj.BenchmarkProjectID as BMProjectID, proj.BenchmarkProjectName as BMProjectName, projUser.UserID as UserID, usr.FirstName, usr.MiddleName,usr.LastName 
   FROM
    (select BenchmarkProjectID, BenchmarkProjectName from Amplo.BenchmarkProject where BenchmarkProjectID =@assessmentSetID) proj --Filter out details only of project passed as parameter
   inner join (select BenchmarkProjectID, UserID from Amplo.BenchmarkProjectUser where ActiveFlag = 1 and ClientID = @clientID) projUser  -- Filter out project users based on client , inner join ensures that if user and project are of separate clients, no results are returned
   on proj.BenchmarkProjectID = projUser.BenchmarkProjectID
   inner Join (select UserID, FirstName, MiddleName, LastName from Amplo.[User] where ActiveFlag = 1) usr -- get user's name details
   on usr.UserID = projUser.UserID

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[GetCapabilityModellingProjectUserDetails]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[GetCapabilityModellingProjectUserDetails]
 (
    @id int,
    @CapabilityProjectID varchar(100)
 )
AS
BEGIN
/*
@id - Logged in userID
@CapabilityProjectID - ID of project to get user details of
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    declare @clientID as INT
    Select @clientID = ClientID from Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

   select proj.DecompositionProjectID as CapModProjectID, proj.ProjectName as CapModProjectName, projUser.UserID as UserID, usr.FirstName, usr.MiddleName,usr.LastName 
   FROM
    (select DecompositionProjectID, ProjectName from Amplo.DecompositionProject where DecompositionProjectID =@CapabilityProjectID) proj --Filter out details only of project passed as parameter
   inner join (select DecompositionProjectID, UserID from Amplo.DecompositionProjectUser where ActiveFlag = 1 and ClientID = @clientID) projUser  -- Filter out project users based on client , inner join ensures that if user and project are of separate clients, no results are returned
   on proj.DecompositionProjectID = projUser.DecompositionProjectID
   inner Join (select UserID, FirstName, MiddleName, LastName from Amplo.[User] where ActiveFlag = 1) usr -- get user's name details
   on usr.UserID = projUser.UserID

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[GetCapModProjectUserDetails]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[GetCapModProjectUserDetails]
 (
    @id int,
    @CapModProjectID varchar(100)
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentSetID - ID of set to get user details of
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    declare @clientID as INT
    Select @clientID = ClientID from Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

   select proj.DecompositionProjectID as CapModProjectID, proj.ProjectName as CapModProjectName, projUser.UserID as UserID, usr.FirstName, usr.MiddleName,usr.LastName 
   FROM
    (select DecompositionProjectID, ProjectName from Amplo.DecompositionProject where DecompositionProjectID =@CapModProjectID) proj --Filter out details only of project passed as parameter
   inner join (select DecompositionProjectID, UserID from Amplo.DecompositionProjectUser where ActiveFlag = 1 and ClientID = @clientID) projUser  -- Filter out project users based on client , inner join ensures that if user and project are of separate clients, no results are returned
   on proj.DecompositionProjectID = projUser.DecompositionProjectID
   inner Join (select UserID, FirstName, MiddleName, LastName from Amplo.[User] where ActiveFlag = 1) usr -- get user's name details
   on usr.UserID = projUser.UserID

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[GetDecompositionFunctionPhases]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[GetDecompositionFunctionPhases] AS
GO
/****** Object:  StoredProcedure [Amplo].[uspAddDecompositionProcessLevel1Activity]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspAddDecompositionProcessLevel1Activity]
	-- Add the parameters for the stored procedure here
           @UserID [int],
           @DecompositionProjectID [int],
           @ProcessLevel1Title [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
	Declare @DecompositionProcessLevel1ID int
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here
	INSERT INTO [Amplo].[DecompositionProcessLevel1]
			([ClientID]
			,[UserID]
			,[DecompositionProjectID]
			,[FunctionID]
			,[PhaseID]
			,[ProcessLevel1Name]
			,[ProcessLevel1Title]
			,[GridViewLocationID]
			,[GridVViewLocationFlag]
			,[ActiveFlag]
			, [Status]
			)
		 VALUES
			(@clientid
			,@UserID
			,@DecompositionProjectID
			,0
			,0
			,'Activity Bank'
			,@ProcessLevel1Title
			,-1
			,0
			,1
			,1
			)
	
	SELECT @DecompositionProcessLevel1ID = SCOPE_IDENTITY();
	SELECT @DecompositionProcessLevel1ID AS ProcessLevel1ID;

	--added by Srinivas on 27th October 2019

	INSERT INTO [Amplo].[DecompositionProcessLevel1Score]
           ([DecompositionProcessLevel1ID]
           ,[LeafNodeLevelID]
           ,[Level1_Calc_Aggr_Score]
           ,[Avg_Score_Weight]
           ,[LeafNodeFlag]
           ,[Owner]
           )
		   VALUES
		   (@DecompositionProcessLevel1ID
           ,1.1
           ,0.00
           ,2
           ,1
           ,NULL
           )


	INSERT INTO [Amplo].[DecompositionScoreCriteriaProject]
           ([ServiceID]
           ,[ClientID]
           ,[DecompositionProjectID]
           ,[DecompositionProcessLevel1ID]
           ,[ScoreCriteriaName]
           ,[ScoreCriteriaActualName]
           ,[ScoreCriteriaTitle]
           ,[ScoreCriteriaDescription]
           ,[SeededFlag]
           ,[UsedFlag])
     select ServiceID
			, @clientid
			, @DecompositionProjectID
			, @DecompositionProcessLevel1ID
			, ScoreCriteriaName
			, ScoreCriteriaActualName
			, ScoreCriteriaTitle
			, ScoreCriteriaDescription
			, SeededFlag
			, UsedFlag from [Amplo].[DecompositionScoreCriteria]

    SELECT messageName from Amplo.[Message] where MessageID = 1028

   COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddDecompositionProcessLevel1Activity_28102019]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 16-October-2019
-- Description:	This procedure addes activity details in activity bank
-- =============================================
CREATE PROCEDURE [Amplo].[uspAddDecompositionProcessLevel1Activity_28102019]
	-- Add the parameters for the stored procedure here
           @UserID [int],
           @DecompositionProjectID [int],
           @ProcessLevel1Title [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
	Declare @DecompositionProcessLevel1ID int
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here
	INSERT INTO [Amplo].[DecompositionProcessLevel1]
			([ClientID]
			,[UserID]
			,[DecompositionProjectID]
			,[ProcessLevel1Name]
			,[ProcessLevel1Title]
			,[GridViewLocationID]
			,[GridVViewLocationFlag]
			,[ActiveFlag]
			)
		 VALUES
			(@clientid
			,@UserID
			,@DecompositionProjectID
			,'Non Seeded ProcessLevel1 Name'
			,@ProcessLevel1Title
			,-1
			,0
			,1
			)
	
	SELECT @DecompositionProcessLevel1ID = SCOPE_IDENTITY();
	SELECT @DecompositionProcessLevel1ID AS ProcessLevel1ID;
    SELECT messageName from Amplo.[Message] where MessageID = 1028

   COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddDecompositionProcessLevels2]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 11-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspAddDecompositionProcessLevels2]
	-- Add the parameters for the stored procedure here
       @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [float]
       ,@ProcessLevel2Title [varchar](100)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@ScoreCriteria1 [float]
	   ,@ScoreCriteria2 [float]
	   ,@ScoreCriteria3 [float]
	   ,@ScoreCriteria4 [float]
	   ,@ScoreCriteria5 [float]
	   ,@ScoreCriteria6 [float]
	   ,@ScoreCriteria7 [float]
	   ,@ScoreCriteria8 [float]
  	   ,@ScoreCriteria9 [float]
	   ,@ScoreCriteria10 [float]
	   ,@LVL2CalcAggrScore [float]
	   ,@AvgScoreWeightage [float]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;
	DECLARE @PDecompositionProcessLevel2ID INT

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]


		BEGIN

			INSERT INTO [Amplo].[DecompositionProcessLevel2]
			(
			   [DecompositionProjectID]
			  ,[DecompositionProcessLevel1ID]
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[Owner]
			  ,[CountrySpecific]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  ,[CreatedBy]
			  ,[CreatedDate]
			  )
			  values
			(
				 @DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
				, 1
				,@UserID
				,GETDATE()
			);

			SET @PDecompositionProcessLevel2ID = SCOPE_IDENTITY();  

			INSERT INTO [Amplo].[DecompositionProcessLevel2Score]
			(
				[DecompositionProcessLevel1ID]
				,[DecompositionProcessLevel2ID]
				,[ScoreCriteria1]
				,[ScoreCriteria2]
				,[ScoreCriteria3]
				,[ScoreCriteria4]
				,[ScoreCriteria5]
				,[ScoreCriteria6]
				,[ScoreCriteria7]
				,[ScoreCriteria8]
				,[ScoreCriteria9]
				,[ScoreCriteria10]
				,[LVL2CalcAggrScore]
				,[AvgScoreWeightage]
			)
			VALUES
				(
				@DecompositionProcessLevel1ID,
				@PDecompositionProcessLevel2ID,
				@ScoreCriteria1,
				@ScoreCriteria2,
				@ScoreCriteria3,
				@ScoreCriteria4,
				@ScoreCriteria5,
				@ScoreCriteria6,
				@ScoreCriteria7,
				@ScoreCriteria8,
				@ScoreCriteria9,
				@ScoreCriteria10,
				@LVL2CalcAggrScore,
				@AvgScoreWeightage
				);

		END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddEnterpriseDIVATeam]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ===========================================================================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	The procedure updates DIVA team (Enterprise user details from DIVA Team functionality)
-- ===========================================================================================================================
CREATE PROCEDURE [Amplo].[uspAddEnterpriseDIVATeam]
	-- Add the parameters for the stored procedure here
        @UserID [int],
        @EmailAddress [nvarchar](100),
        @FirstName [varchar](100),
        @LastName [varchar](100),
		@UserType [int],
		@UserStatusID [int],
--		@DisableDate [date],
		@UserIPAddress [varchar](50)
AS

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    DECLARE @countRowUser int,@countOrgDivUser int, @ClientID int
	DECLARE @CountDIVAUser int
    DECLARE @Message VARCHAR(512)
	DECLARE @StatukLookupID int
    -- Insert statements for procedure here
    BEGIN TRY
    BEGIN TRANSACTION;

    SELECT @countRowUser = Count(*) FROM [Amplo].[User] WHERE EmailAddress = @EmailAddress;
	SELECT @CountDIVAUser = COUNT(*) FROM [Amplo].[UserDIVATeam] WHERE Email = @EmailAddress; 
	SELECT @UserStatusID = StatusLookupID from [Amplo].[StatusLookup] WHERE LookupCode = 'USERSTATUS_NEW';

	select @ClientID = ClientID FROM [Amplo].[User] where UserID = @UseriD;
    IF (@countRowUser > 0 OR @CountDIVAUser > 0 )
        BEGIN
            --RETURN 1;
            select MessageName from Amplo.Message where MessageID = 1
        END
    ELSE
	BEGIN 

	INSERT INTO [Amplo].[UserDIVATeam]
           ([ClientID]
           ,[SuperUserID]
           ,[FirstName]
           ,[LastName]
           ,[Email]
--           ,[DisableDate]
           ,[UserTypeID]
		   ,[UserStatusID]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate])
     VALUES
           (@ClientID
           ,@UserID
           ,@FirstName
           ,@LastName
           ,@EmailAddress
--         ,<DisableDate, date,>
           ,@UserType
		   ,@UserStatusID
           ,0
           ,@UserID
           ,GETDATE()
		)


  INSERT INTO [Amplo].[EmailVerification]
    (
      [UserID],
      [UserName],
      [VerificationFlag],
      [ActiveFlag],
      [VerificationDate],
      [UserIPAddress]
    )
    VALUES
    (
        @userID,
        @FirstName,
		0,
		0,
        GETDATE(),
		@UserIPAddress
    );
  
   -- RETURN 3;
   select MessageName from Amplo.Message where MessageID = 1023
    END

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddEnterpriseDIVATeam_Original]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ===========================================================================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	The procedure updates DIVA team (Enterprise user details from DIVA Team functionality)
-- ===========================================================================================================================
CREATE PROCEDURE [Amplo].[uspAddEnterpriseDIVATeam_Original]
	-- Add the parameters for the stored procedure here
        @UserID int,
        @EmailAddress [nvarchar](100),
        @FirstName [varchar](100),
--      @MiddleName [varchar](50),
        @PLastName [varchar](100),
		@UserType int,
		@UserStatusID int,
		@DisableDate date,
		@UserIPAddress varchar(50)
AS

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
    BEGIN TRY
    BEGIN TRANSACTION;
    DECLARE @countRowUser int,@countOrgDivUser int, @ClientID int
    DECLARE @Message VARCHAR(512)
    SELECT @countRowUser = Count(*) FROM [Amplo].[User] WHERE EmailAddress = @EmailAddress;
	select @ClientID = ClientID FROM [Amplo].[User] where UserID = @UseriD;
--    SELECT @countOrgDivUser = Count(*) FROM [Amplo].[Client] WHERE ClientName = @PClientName 
    --AND ClientBusinessUnit = @PClientBusinessUnit;
    IF (@countRowUser>0)
        BEGIN
            --RETURN 1;
            select MessageName from Amplo.Message where MessageID = 1
        END
    ELSE
	BEGIN 

    		INSERT INTO [Amplo].[User]
    (
        [USERNAME],
		[FirstName],
--      [MiddleName],
        [LastName],
        [EmailAddress],
		[UserPassword],
        [EmailValidationStatus],
		[PhoneNumber],
        [ActiveFlag],
        [ClientID],
        [UserLinkedINProfileID],
        [UserTypeID],
        [UserStatusID],
		[DisableDate],
        [UserCreatedBy],
        [UserCreatedDate]
    )
    VALUES
    (
       @FirstName + ' '+ @PLastName,
		@FirstName,
--      @MiddleName,
        @PLastName,
        @EmailAddress,
		'tmppassword'
        ,0,
		'1434456',
        1,
        @ClientID,
        NULL,
        @UserType,
        @UserStatusID,
		@DisableDate,
        @UserID,
        GETDATE()
    );

/*		INSERT INTO [Amplo].[User]
    (
        [FirstName],
--      [MiddleName],
        [LastName],
        [EmailAddress],
        [EmailValidationStatus],
        [ActiveFlag],
        [ClientID],
        [UserLinkedINProfileID],
        [UserTypeID],
        [UserStatusID],
        [UserCreatedBy],
        [UserCreatedDate]
    )
    VALUES
    (
        @FirstName,
--      @MiddleName,
        @PLastName,
        @EmailAddress,
        0,
        1,
        @ClientID,
        NULL,
        @UserType,
        @UserStatusID,
        @UserID,
        GETDATE()
    );
	*/
--    SELECT @userID = UserID FROM [Amplo].[User] WHERE UserName = @PUserName;
  INSERT INTO [Amplo].[EmailVerification]
    (
      [UserID],
      [UserName],
      [VerificationFlag],
      [ActiveFlag],
      [VerificationDate],
      [UserIPAddress]
    )
    VALUES
    (
        @userID,
        @FirstName,
		0,
		0,
        GETDATE(),
		@UserIPAddress
    );
  
   -- RETURN 3;
   select MessageName from Amplo.Message where MessageID = 1023
    END

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddEnterpriseSuperUser]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspAddEnterpriseSuperUser]
    (
        @PClientName [varchar](255),
        @PClientBusinessUnit [varchar](100),
        @PClientParentCompany [varchar](255),
        @PIndustryID [int],
        @PClientRevenueRangeID [int],
        @PPhoneNumber [nvarchar](50),
        @PEmailAddress [nvarchar](100),
        @PSubscriptionKey [varchar](100),
        @PRegistrationModeID [int],
        @PUserName [varchar](100),
        @PFirstName [varchar](100),
        @MiddleName [varchar](50),
        @PLastName [varchar](100),
        @PUserPassword [nvarchar](256),
        @PHash [varchar](512)


    )
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;
    DECLARE @countRowUser int,@countOrgDivUser int,@userID int
    DECLARE @Message VARCHAR(512)
    SELECT @countRowUser = Count(*) FROM [Amplo].[User]  WHERE EmailAddress = @PEmailAddress;
    SELECT @countOrgDivUser = Count(*) FROM [Amplo].[Client] WHERE ClientName = @PClientName 
    --AND ClientBusinessUnit = @PClientBusinessUnit;
    IF (@countRowUser>0)
        BEGIN
            --RETURN 1;
            select MessageName from Amplo.Message where MessageID = 1
        END
    ELSE IF(@countOrgDivUser>0)
        BEGIN
           -- RETURN 2;
           select MessageName from Amplo.Message where MessageID = 2
        END
    ELSE
    BEGIN 
    INSERT INTO [Amplo].[Client]
    (
    [ClientName],
	[ClientBusinessUnit],
	[ClientParentCompany],
	[IndustryID],
	[ClientRevenueRangeID],
	[PhoneNumber],
	[EmailAddress],
	[SubscriptionKey],
	[ActiveFlag],
	[RegistrationModeID],
	[ClientCreatedBy],
	[ClientCreatedDate]
    )
    VALUES
    (
        @PClientName,
        @PClientBusinessUnit,
        @PClientParentCompany,
        @PIndustryID,
        @PClientRevenueRangeID,
        @PPhoneNumber,
        @PEmailAddress,
        @PSubscriptionKey,
        1,
        1,
        'SYSADMIN',
        GETDATE()
      )
    DECLARE @id int
    SET @id =  @@IDENTITY

     
    
    INSERT INTO [Amplo].[User]
    (
        [UserName],
        [FirstName],
        [MiddleName],
        [LastName],
        [PhoneNumber],
        [EmailAddress],
        [UserPassword],
        [EmailValidationStatus],
        [ActiveFlag],
        [ClientID],
        [UserLinkedINProfileID],
        [UserTypeID],
        [UserStatusID],
        [UserCreatedBy],
        [UserCreatedDate]
    )
    VALUES
    (
        @PUserName,
        @PFirstName,
        @MiddleName,
        @PLastName,
        @PPhoneNumber,
        @PEmailAddress,
        @PUserPassword,
        0,
        1,
        @id,
        NULL,
        1,
        2,
        'SYSADMIN',
        GETDATE()
    );
    SELECT @userID = UserID FROM [Amplo].[User] WHERE UserName = @PUserName;
    INSERT INTO [Amplo].[EmailVerification]
    (
        [UserID],
      [UserName],
      [VerificationHashCode],
      [VerificationHashCodeDate],
      [VerificationFlag],
      [ActiveFlag],
      [VerificationDate],
      [VerificationRemarks],
      [UserIPAddress]
    )
    VALUES
    (
        @userID,
        @PUserName,
        @PHash,
        GETDATE(),
        0,
        1,
        NULL,
        NULL,
        NULL
    );
   -- RETURN 3;
   select MessageName from Amplo.Message where MessageID = 3
    END

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END;
GO
/****** Object:  StoredProcedure [Amplo].[uspAddKPI]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 15-October-2019
-- Description:	This procedure creates KPI
-- =============================================
CREATE PROCEDURE [Amplo].[uspAddKPI]
	-- Add the parameters for the stored procedure here
           @UserID [varchar](100)
		  ,@BusinessOutcome [varchar](512)
          ,@BusinessMetrics [varchar](256) 
          ,@PersonaImpacted [varchar](256)
          ,@EstimatedSavings [varchar](100)
		  , @KpiTitle [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @KPIID [INT]

	Declare @clientid as INT
	Select @clientid = ClientID from Amplo.[User] where UserID = @UserID

    BEGIN TRY
    BEGIN TRANSACTION;

    -- Insert statements for procedure here
	INSERT INTO [Amplo].[KPI]
			   (ClientID
			   ,[KPIName]
			   ,[KPITitle]
			   ,[BusinessOutcome]
			   ,[BusinessMetrics]
			   ,[PersonaImpacted]
			   ,[EstimatedSavings]
			   ,[ActiveFlag]
			   ,[CreatedBy]
			   ,[CreatedDate]
				)
		 VALUES
			   (
				@clientid
			   ,'KPI Name' 
			   ,@KpiTitle
			   ,@BusinessOutcome 
			   ,@BusinessMetrics
			   ,@PersonaImpacted
			   ,@EstimatedSavings
			   ,1
			   ,@UserID
			   ,GETDATE()
				)

		   SELECT @KPIID = SCOPE_IDENTITY();
		   SELECT @KPIID AS KPIID;

       Select MessageName from Amplo.[Message] where MessageID = 1026

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddKPIControlLevers]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================
-- Author:		Srinivas
-- Create date: 15-October-2019
-- Description:	This procedure creates KPI ControlLevers
-- =====================================================
CREATE PROCEDURE [Amplo].[uspAddKPIControlLevers]
	-- Add the parameters for the stored procedure here
           @UserID [varchar](100)
		  ,@KPIID [int]
          ,@ControlLeversTitle [varchar](256)
          ,@PersonaImpacted [varchar](256)
		  ,@KPIInhibitors [NVARCHAR](MAX)
		  ,@KPICapabilities [NVARCHAR](MAX)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    BEGIN TRY
    BEGIN TRANSACTION;

	DECLARE @KPIControlLeverID [int]
	DECLARE
    @counter    INT = 1,
    @max        INT = 0,
	@InhibitorsTitle VARCHAR(512),
    @CapabilitiesTitle VARCHAR(512),
	@ROWNumber int

    -- Insert statements for procedure here
INSERT INTO [Amplo].[KPIControlLevers]
           ([KPIID]
           ,[ControlLeversName]
           ,[ControlLeversTitle]
           ,[PersonaImpacted]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate]
			)
     VALUES
           (@KPIID
           ,'Control Levers'
		   ,@ControlLeversTitle
           ,@PersonaImpacted
           ,1
           ,@UserID
           ,GETDATE()
		)

		select @KPIControlLeverID = SCOPE_IDENTITY()
		select @KPIControlLeverID as KPIControlLeverID


/* KPI Inhibitors Deatils Persistence*/


		SELECT ID, Name
		INTO #tblInhibitors
		FROM OPENJSON (@KPIInhibitors, '$.root')
		WITH (
		ID INT,
        Name NVARCHAR(512)
		)

		SELECT @max = COUNT(1) FROM #tblInhibitors


	while @counter <= @max
		BEGIN

		-- Do whatever you want with each row in your table variable filtering by the Id column
		SELECT @InhibitorsTitle = Name
		FROM #tblInhibitors
		WHERE ID = @counter

		INSERT INTO [Amplo].[KPIInhibitors]
			([KPIControlLeversID]
			,[InhibitorsName]
			,[InhibitorsTitle]
			,[ActiveFlag]
			,[CreatedBy]
			,[CreatedDate]
			)
		VALUES
			(@KPIControlLeverID
			,'Inhibitors Name'
			,@InhibitorsTitle
			,1
			,@UserID
			,GETDATE()
			)

		SET @counter = @counter + 1
	END

/* KPI Capabilities Deatils Persistence*/

		SELECT ID, Name
		INTO #tblKPICapabilities
		FROM OPENJSON (@KPICapabilities, '$.root')
		WITH (
		ID INT,
        Name NVARCHAR(512)
		)

		SET @counter = 1;
		SELECT @max = COUNT(1) FROM #tblKPICapabilities;

		while @counter <= @max
		BEGIN
			-- Do whatever you want with each row in your table variable filtering by the Id column
			SELECT @CapabilitiesTitle = Name
			FROM #tblKPICapabilities
			WHERE ID = @counter

			INSERT INTO [Amplo].[KPICapabilities]
				([KPIControlLeversID]
				,[CapabilitiesName]
				,[CapabilitiesTitle]
				,[ActiveFlag]
				,[CreatedBy]
				,[CreatedDate]
				)
			VALUES
				(@KPIControlLeverID
				,'Capabilities Name'
				,@CapabilitiesTitle
				,1
				,@UserID
				,GETDATE()
				);
			SET @counter = @counter + 1
		END

    Select messageName from Amplo.[Message] where MessageID = 1027;

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [AMPLO].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddNewCapabilityModellingProject]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspAddNewCapabilityModellingProject]
 (
    @id int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    DECLARE @Target_Table TABLE (
    userIDs int
    );

    INSERT INTO @Target_Table
    SELECT * 
    FROM  String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @Target_Table a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    ) b
    on a.userids = b.UserID

    --Create New Capability Modelling project
    insert into Amplo.[DecompositionProject](
       [ProjectName]
      ,[ProjectDescription]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ClientID]
      ,[StatusID]
    )
    VALUES(
        @CapabilityProjectName,
        NULL,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
        1, 
        @id,
        GETDATE(),
        @clientid,
        1
    )

    declare @createdProjectID INT

    SELECT @createdProjectID = SCOPE_IDENTITY();

    --Add users to Capability Modelling project
    INSERT INTO Amplo.DecompositionProjectUser(
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ActivityFlag]
    )
    SELECT 
        @createdProjectID,
        @clientid,
        userIDs,
        1,
      --  1,
        @id,
        GETDATE(),
        1
    from @ValidUserIDs
	
	--------- Insert level 1 template data start -----------
	Insert into Amplo.DecompositionProcessLevel1(
       [ClientID]
      ,[DecompositionProjectID]
      ,[ProcessLevel1Name]
	  ,[ProcessLevel1Title]
      ,[ActiveFlag]
      ,[LockedFlag]
      ,[Status]
      ,[DesignChoice]
      ,[UserID]
      ,[GridViewLocationID]
      ,[GridVViewLocationFlag]
      ,[FunctionID]
      ,[PhaseID]
    )
    select 
    @clientid,
    @createdProjectID,
    l1Main.ProcessLevel1Name,
	l1Main.ProceeLevel1Title,
    1,
    0,
    1,--Insert status here
    l1Main.DesignChoice,
	@id,
    l1Main.GridViewLocationID,
    l1Main.GridVViewLocationFlag,
    l1Main.DecompositionFunctionID,
    l1Main.DecompositionPhaseID
	from Amplo.AmploDecompositionProcessLevel1 l1Main where ActiveFlag = 1 and CreatedBy = 'SYSADMIN-BISWAJIT'
    

	INSERT INTO [Amplo].[DecompositionProcessLevel1Score]
           ([DecompositionProcessLevel1ID]
           ,[LeafNodeLevelID]
           ,[Level1_Calc_Aggr_Score]
           ,[Avg_Score_Weight]
           ,[LeafNodeFlag]
           ,[Owner]
           )
		   select DecompositionProcessLevel1Id
           ,1.1
           ,0.0
           ,2
           ,0
           ,NULL
           from Amplo.DecompositionProcessLevel1 where DecompositionProjectID = @createdProjectID



		INSERT INTO [Amplo].[DecompositionFunctionProject]
           ([ClientID]
           ,[UserID]
           ,[DecompositionProjectID]
           ,[IndustryID]
           ,[IndustryVerticalID]
           ,[IndustrySubVerticalID]
           ,[FunctionName]
           ,[FunctionTitle]
           ,[FunctionDescription]
           ,[FunctionMeaning]
           ,[ProcesDeisgnChoice]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ModifiedBy]
           ,[ModifiedDate]
		   ,[FunctionNumber])
     select @ClientId
           ,@Id
           ,@createdProjectID
           ,[IndustryID]
           ,[IndustryVerticalID]
           ,[IndustrySubVerticalID]
           ,[FunctionName]
           ,FunctionTilte
           ,[FunctionDescription]
           ,[FunctionMeaning]
           ,[ProcesDeisgnChoice]
           ,1
           ,@Id
           ,GETDATE()
           ,NULL
           ,NULL
		   ,[FunctionNumber] from [Amplo].[DecompositionFunction]


		INSERT INTO [Amplo].[DecompositionPhaseProject]
           ([ClientID]
           ,[UserID]
           ,[DecompositionProjectID]
           ,[PhaseName]
           ,[PhaseTitle]
           ,[PhaseDescription]
           ,[PhaseMeaning]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ModifiedBy]
           ,[ModifiedDate]
		   ,[PhaseNumber])
     select @ClientId
           ,@Id
           ,@createdProjectID
           ,[PhaseName]
           ,[PhaseTitle]
           ,[PhaseDescription]
           ,[PhaseMeaning]
           ,1
           ,@Id
           ,GETDATE()
           ,NULL
           ,NULL
		   ,[PhaseNumber] from [Amplo].[DecompositionPhase]
           

	INSERT INTO [Amplo].[DecompositionScoreCriteriaProject]
           ([ServiceID]
           ,[ClientID]
           ,[DecompositionProjectID]
           ,[DecompositionProcessLevel1ID]
           ,[ScoreCriteriaName]
           ,[ScoreCriteriaActualName]
           ,[ScoreCriteriaTitle]
           ,[ScoreCriteriaDescription]
           ,[SeededFlag]
           ,[UsedFlag])
     select ServiceID
			, @ClientId
			, @createdProjectID
			, dp.DecompositionProcessLevel1ID
			, ScoreCriteriaName
			, ScoreCriteriaActualName
			, ScoreCriteriaTitle
			, ScoreCriteriaDescription
			, SeededFlag
			, UsedFlag from [Amplo].[DecompositionScoreCriteria]
	join [Amplo].[DecompositionProcessLevel1] dp on (dp.[DecompositionProjectID] = @createdProjectID)
    -- Succe[])ssfull addition of new benchmark project
    SELECT messageName from Amplo.[Message] where MessageID = 1019

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddNewCapabilityModellingProject_27102019]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      Srinivas
-- Create Date: 25-Oct-2019
-- Description: This procedure adds Capability Modelling project details 
-- =============================================
CREATE PROCEDURE [Amplo].[uspAddNewCapabilityModellingProject_27102019]
 (
    @id int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@CapabilityProjectName - Name of new set
@userids - comma separated string of userids to map to set
@disableDate - Date for disable of client project
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    DECLARE @Target_Table TABLE (
    userIDs int
    );

    INSERT INTO @Target_Table
    SELECT * 
    FROM  String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @Target_Table a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    --AND DisableDate > GETDATE()
    ) b
    on a.userids = b.UserID

    --Create New Capability Modelling project
    insert into Amplo.[DecompositionProject](
       [ProjectName]
      ,[ProjectDescription]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ClientID]
      ,[StatusID]
    )
    VALUES(
        @CapabilityProjectName,
        NULL,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
        1, 
        @id,
        GETDATE(),
        @clientid,
        1
    )

    declare @createdProjectID INT

    SELECT @createdProjectID = SCOPE_IDENTITY();

    --Add users to Capability Modelling project
    INSERT INTO Amplo.DecompositionProjectUser(
      -- [DecompositionProjectUserName]
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
    --  ,[ProductionFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ActivityFlag]
    )
    SELECT 
        @createdProjectID,
        @clientid,
        userIDs,
        1,
      --  1,
        @id,
        GETDATE(),
        1
    from @ValidUserIDs

	--------- Insert level 1 template data start -----------
	Insert into Amplo.DecompositionProcessLevel1(
       [ClientID]
      ,[DecompositionProjectID]
      ,[ProcessLevel1Name]
	  ,[ProcessLevel1Title]
      ,[ActiveFlag]
      ,[LockedFlag]
      ,[Status]
      ,[DesignChoice]
     -- ,[LockedBy]
     -- ,[LockedDateTime]
      ,[UserID]
      ,[GridViewLocationID]
      ,[GridVViewLocationFlag]
    --  ,[GridViewPreviousLocationID]
      ,[FunctionID]
      ,[PhaseID]
    )
    select 
    @clientid,
    @createdProjectID,
    l1Main.ProcessLevel1Name,
	l1Main.ProceeLevel1Title,
    1,
    0,
    1,--Insert status here
    l1Main.DesignChoice,
	@id,
    l1Main.GridViewLocationID,
    l1Main.GridVViewLocationFlag,
    l1Main.DecompositionFunctionID,
    l1Main.DecompositionPhaseID
	from Amplo.AmploDecompositionProcessLevel1 l1Main where ActiveFlag = 1 
    --from Amplo.DecompositionLevel1Activity l1Main where ActiveFlag = 1 
    


	--------- Insert level 1 template data end -----------

/*
   -- Add Phase and Function mapping when project is added

   declare  @domainMap Table(
       userid int,
       domainid int
   ) 

    insert into @domainMap
    select b.userids, a.domainID
    from (select DomainID from Amplo.AmploDomain where ActiveFlag=1) a  
    cross join @ValidUserIDs b

    -- Access Type - 1- Read+Write, 2 - Read Only, 3- No Access
    INSERT INTO Amplo.[UserDomainAccess](
       [ClientID]
      ,[UserID]
      ,[DomainID]
      ,[AccessType]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[BenchmarkProjectID]
    )
    Select
        @clientid,
        userid,
        domainid,
        1,
        1,
        @id,
        GETDATE(),
        @createdSetID
    from @domainMap
 */

    -- Successfull addition of new benchmark project
    SELECT messageName from Amplo.[Message] where MessageID = 1019

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddNewCapabilityModellingProject_28102019]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspAddNewCapabilityModellingProject_28102019]
 (
    @id int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@CapabilityProjectName - Name of new set
@userids - comma separated string of userids to map to set
@disableDate - Date for disable of client project
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    DECLARE @Target_Table TABLE (
    userIDs int
    );

    INSERT INTO @Target_Table
    SELECT * 
    FROM  String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @Target_Table a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    --AND DisableDate > GETDATE()
    ) b
    on a.userids = b.UserID

    --Create New Capability Modelling project
    insert into Amplo.[DecompositionProject](
       [ProjectName]
      ,[ProjectDescription]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ClientID]
      ,[StatusID]
    )
    VALUES(
        @CapabilityProjectName,
        NULL,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
        1, 
        @id,
        GETDATE(),
        @clientid,
        1
    )

    declare @createdProjectID INT

    SELECT @createdProjectID = SCOPE_IDENTITY();

    --Add users to Capability Modelling project
    INSERT INTO Amplo.DecompositionProjectUser(
      -- [DecompositionProjectUserName]
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
    --  ,[ProductionFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ActivityFlag]
    )
    SELECT 
        @createdProjectID,
        @clientid,
        userIDs,
        1,
      --  1,
        @id,
        GETDATE(),
        1
    from @ValidUserIDs

	--------- Insert level 1 template data start -----------

/*
	Insert into Amplo.DecompositionProcessLevel1(
       [ClientID]
      ,[DecompositionProjectID]
      ,[ProcessLevel1Name]
      ,[ActiveFlag]
      ,[LockedFlag]
      ,[Status]
      ,[DesignChoice]
     -- ,[LockedBy]
     -- ,[LockedDateTime]
      ,[UserID]
      ,[GridViewLocationID]
      ,[GridVViewLocationFlag]
    --  ,[GridViewPreviousLocationID]
      ,[FunctionID]
      ,[PhaseID]
    )
    select 
    @clientid,
    @createdProjectID,
    l1Main.Level1ActivityName,
    1,
    0,
    NULL,--Insert status here
    l1Main.Level1ActivityDeisgnChoice,
	@id,
    l1Main.GridViewLocationID,
    l1Main.GridVViewLocationFlag,
    l1Main.DecompositionFunctionID,
    l1Main.DecompositionPhaseID

    from Amplo.DecompositionLevel1Activity l1Main where ActiveFlag = 1 
  */
  
  	Insert into Amplo.DecompositionProcessLevel1(
       [ClientID]
      ,[DecompositionProjectID]
      ,[ProcessLevel1Name]
	  ,[ProcessLevel1Title]
      ,[ActiveFlag]
      ,[LockedFlag]
      ,[Status]
      ,[DesignChoice]
     -- ,[LockedBy]
     -- ,[LockedDateTime]
      ,[UserID]
      ,[GridViewLocationID]
      ,[GridVViewLocationFlag]
    --  ,[GridViewPreviousLocationID]
      ,[FunctionID]
      ,[PhaseID]
    )
    select 
    @clientid,
    @createdProjectID,
    l1Main.ProcessLevel1Name,
	l1Main.ProceeLevel1Title,
    1,
    0,
    1,--Insert status here
    l1Main.DesignChoice,
	@id,
    l1Main.GridViewLocationID,
    l1Main.GridVViewLocationFlag,
    l1Main.DecompositionFunctionID,
    l1Main.DecompositionPhaseID
	from Amplo.AmploDecompositionProcessLevel1 l1Main where ActiveFlag = 1 
    --from Amplo.DecompositionLevel1Activity l1Main where ActiveFlag = 1 

	--------- Insert level 1 template data end -----------

/*
   -- Add Phase and Function mapping when project is added

   declare  @domainMap Table(
       userid int,
       domainid int
   ) 

    insert into @domainMap
    select b.userids, a.domainID
    from (select DomainID from Amplo.AmploDomain where ActiveFlag=1) a  
    cross join @ValidUserIDs b

    -- Access Type - 1- Read+Write, 2 - Read Only, 3- No Access
    INSERT INTO Amplo.[UserDomainAccess](
       [ClientID]
      ,[UserID]
      ,[DomainID]
      ,[AccessType]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[BenchmarkProjectID]
    )
    Select
        @clientid,
        userid,
        domainid,
        1,
        1,
        @id,
        GETDATE(),
        @createdSetID
    from @domainMap
 */

    -- Successfull addition of new benchmark project
    SELECT messageName from Amplo.[Message] where MessageID = 1019

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddNewCapabilityModellingProject2]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspAddNewCapabilityModellingProject2]
 (
    @id int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@CapabilityProjectName - Name of new set
@userids - comma separated string of userids to map to set
@disableDate - Date for disable of client project
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    DECLARE @Target_Table TABLE (
    userIDs int
    );

    INSERT INTO @Target_Table
    SELECT * 
    FROM  String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @Target_Table a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    --AND DisableDate > GETDATE()
    ) b
    on a.userids = b.UserID

    --Create New Capability Modelling project
    insert into Amplo.[DecompositionProject](
       [ProjectName]
      ,[ProjectDescription]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ClientID]
      ,[StatusID]
    )
    VALUES(
        @CapabilityProjectName,
        NULL,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
        1, 
        @id,
        GETDATE(),
        @clientid,
        1
    )

    declare @createdProjectID INT

    SELECT @createdProjectID = SCOPE_IDENTITY();

    --Add users to Capability Modelling project
    INSERT INTO Amplo.DecompositionProjectUser(
      -- [DecompositionProjectUserName]
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
    --  ,[ProductionFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ActivityFlag]
    )
    SELECT 
        @createdProjectID,
        @clientid,
        userIDs,
        1,
      --  1,
        @id,
        GETDATE(),
        1
    from @ValidUserIDs
---------------------------Adding mapping of phases and functions to project level and user level -----------------------

-- For inserting project level mapping of functions
    declare @functionNetMap TABLE(
       functionID int 
    )

    insert into @functionNetMap
    select DecompositionFunctionID from Amplo.DecompositionFunction where ActiveFlag = 1
    --Insert filters for industry after MVP1


--Insert project mapping with function
    insert into [Amplo].[DecompositionFunctionProject]
     ([DecompositionProjectID]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[FunctionName]
      ,[FunctionDescription]
      ,[FunctionMeaning]
      ,[ProcesDeisgnChoice]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[UserID])

    select
    @createdProjectID,
    @industryid,
    @industryverticalid,
    @industrysubverticalid,
    template.FunctionName,
    template.FunctionDescription,
    template.FunctionMeaning,
    template.ProcesDeisgnChoice,
    1,
    @id,
    GETDATE(),
    NULL

    from @functionNetMap map
    inner join Amplo.DecompositionFunction template
    on map.functionID = template.DecompositionFunctionID


-- For inserting project level mapping of phases
    declare @phaseNetMap TABLE(
       phaseID int
    )

    insert into @phaseNetMap
    select DecompositionPhaseID from 
    Amplo.DecompositionPhase 
    where ActiveFlag = 1
    --Industry filters to be applied after MVP1

--Insert project mapping with phase
    insert into [Amplo].[DecompositionPhaseProject]
     ([UserID]
      ,[DecompositionProjectID]
      ,[PhaseName]
      ,[PhaseDescription]
      ,[PhaseMeaning]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
    )
    select
    NULL,
    @createdProjectID,
    PhaseName,
    PhaseDescription,
    PhaseMeaning,
    1,
    @id,
    GETDATE(),
    @industryid,
    @industryverticalid,
    @industrysubverticalid
    from 
    (select phaseID from @phaseNetMap) map
    inner join (Select PhaseName, PhaseDescription,PhaseMeaning, DecompositionPhaseID from Amplo.DecompositionPhase) template
    on map.[phaseID] = template.DecompositionPhaseID




--For mapping users with access
    declare  @phaseFunctionUserMap Table(
       userid int,
       functionID int,
       phaseID int
   ) 

    insert into @phaseFunctionUserMap
    SELECT usr.userIDs, fn.functionID, ph.phaseID
    from (select userIDs from @ValidUserIDs) usr
    cross join @functionNetMap fn
    cross join @phaseNetMap ph

-- Insert User mapping to phases and functions
    INSERT INTO Amplo.[DecompositionUserAccess](
       [UserAccessName]
      ,[UserAccessDescription]
      ,[ClientID]
      ,[UserID]
      ,[DecompositionProjectID]
      ,[FunctionID]
      ,[PhaseID]
      ,[ActiveFlag]
      ,[CreadedBy]
      ,[CreatedDate]
    )
    Select
        NULL,
        NULL,
        @clientid,
        userid,
        @createdProjectID,
        functionID,
        phaseID,
        1,
        @id,
        GETDATE()
    from @phaseFunctionUserMap



------------------Replicating all default L1 activities from master template to project specific L1s------------------------------


    Insert into Amplo.DecompositionProcessLevel1(
       [ClientID]
      ,[DecompositionProjectID]
      ,[ProcessLevel1Name]
      ,[ActiveFlag]
      ,[LockedFlag]
      ,[Status]
      ,[DesignChoice]
     -- ,[LockedBy]
     -- ,[LockedDateTime]
    --  ,[UserID]
      ,[GridViewLocationID]
      ,[GridVViewLocationFlag]
    --  ,[GridViewPreviousLocationID]
      ,[FunctionID]
      ,[PhaseID]
    )
    select 
    @clientid,
    @createdProjectID,
    l1Main.Level1ActivityName,
    1,
    0,
    NULL,--Insert status here
    l1Main.Level1ActivityDeisgnChoice,
    l1Main.GridViewLocationID,
    l1Main.GridVViewLocationFlag,
    l1Main.DecompositionFunctionID,
    l1Main.DecompositionPhaseID

    from (Select Level1ActivityName, Level1ActivityDeisgnChoice, GridViewLocationID, GridVViewLocationFlag, DecompositionFunctionID, DecompositionPhaseID from Amplo.DecompositionLevel1Activity where ActiveFlag = 1) l1Main
    inner join @functionNetMap fn on fn.functionID = l1Main.DecompositionFunctionID
    inner JOIN @phaseNetMap ph on ph.phaseID = l1Main.DecompositionPhaseID 


    -- Successfull addition of new capability modelling project
    SELECT messageName from Amplo.[Message] where MessageID = 1019

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddNewClientProject]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspAddNewClientProject]
 (
    @id int,
    @assessmentSetName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentSetName - Name of new set
@userids - comma separated string of userids to map to set
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    DECLARE @Target_Table TABLE (
    userIDs int
    );

    INSERT INTO @Target_Table
    SELECT * 
    FROM  String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @Target_Table a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    --AND DisableDate > GETDATE()
    ) b
    on a.userids = b.UserID

    --Create New benchmark project
    insert into Amplo.BenchmarkProject(
        [BenchmarkProjectName],
        [BenchmarkProjectDescription],
        [ServiceID],
        [IndustryID],
        [IndustryVerticalID],
        [IndustrySubVerticalID],
      --[ActiveFlag],
        [CreatedBy],
        [CreatedDate]
      ,[status]
    )
    VALUES(
        @assessmentSetName,
        NULL,
        1,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
     -- 1, 
        @id,
        GETDATE(),
        1
    )

    declare @createdSetID INT

    SELECT @createdSetID = SCOPE_IDENTITY();

    --Add users to benchmark project
    INSERT INTO Amplo.BenchmarkProjectUser(
       [BenchmarkProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActivityFlag]
      ,[ActiveFlag]
   -- ,[DisableDate]
      ,[CreatedBy]
      ,[CreatedDate]
    )
    SELECT 
        @createdSetID,
        @clientID,
        userIDs,
        1,
        1,
        @id,
        GETDATE()
    from @ValidUserIDs


   -- Add domain mapping when set is added

   declare  @domainMap Table(
       userid int,
       domainid int
   ) 

    insert into @domainMap
    select b.userids, a.domainID
    from (select DomainID from Amplo.AmploDomain where ActiveFlag=1) a  
    cross join @ValidUserIDs b

    -- Access Type - 1- Read+Write, 2 - Read Only, 3- No Access
    INSERT INTO Amplo.[UserDomainAccess](
       [ClientID]
      ,[UserID]
      ,[DomainID]
      ,[AccessType]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[BenchmarkProjectID]
    )
    Select
        @clientid,
        userid,
        domainid,
        1,
        1,
        @id,
        GETDATE(),
        @createdSetID
    from @domainMap

	INSERT INTO [Amplo].[BenchmarkingGoalSetting]
           ([BenchmarkProjectID]
           ,[ClientID]
           ,[IndustryBenchmark]
           ,[ASISBenchmark]
           ,[GoalSetting]
           ,[CreadedBy]
           ,[CreatedOn]
           ,[DomainID])
	select
			@createdSetID
           ,@clientid
           ,0.00
           ,0.00
           ,0.00
           ,@id
           ,GETDATE()
           ,domainid
	from Amplo.AmploDomain where ActiveFlag=1

    -- Successfull addition of new benchmark project
    SELECT messageName from Amplo.[Message] where MessageID = 12

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddNewClientProject_15112019]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspAddNewClientProject_15112019]
 (
    @id int,
    @assessmentSetName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentSetName - Name of new set
@userids - comma separated string of userids to map to set
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    DECLARE @Target_Table TABLE (
    userIDs int
    );

    INSERT INTO @Target_Table
    SELECT * 
    FROM  String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @Target_Table a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    --AND DisableDate > GETDATE()
    ) b
    on a.userids = b.UserID

    --Create New benchmark project
    insert into Amplo.BenchmarkProject(
        [BenchmarkProjectName],
        [BenchmarkProjectDescription],
        [ServiceID],
        [IndustryID],
        [IndustryVerticalID],
        [IndustrySubVerticalID],
      --[ActiveFlag],
        [CreatedBy],
        [CreatedDate]
      ,[status]
    )
    VALUES(
        @assessmentSetName,
        NULL,
        1,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
     -- 1, 
        @id,
        GETDATE(),
        1
    )

    declare @createdSetID INT

    SELECT @createdSetID = SCOPE_IDENTITY();

    --Add users to benchmark project
    INSERT INTO Amplo.BenchmarkProjectUser(
       [BenchmarkProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActivityFlag]
      ,[ActiveFlag]
   -- ,[DisableDate]
      ,[CreatedBy]
      ,[CreatedDate]
    )
    SELECT 
        @createdSetID,
        @clientID,
        userIDs,
        1,
        1,
        @id,
        GETDATE()
    from @ValidUserIDs


   -- Add domain mapping when set is added

   declare  @domainMap Table(
       userid int,
       domainid int
   ) 

    insert into @domainMap
    select b.userids, a.domainID
    from (select DomainID from Amplo.AmploDomain where ActiveFlag=1) a  
    cross join @ValidUserIDs b

    -- Access Type - 1- Read+Write, 2 - Read Only, 3- No Access
    INSERT INTO Amplo.[UserDomainAccess](
       [ClientID]
      ,[UserID]
      ,[DomainID]
      ,[AccessType]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[BenchmarkProjectID]
    )
    Select
        @clientid,
        userid,
        domainid,
        1,
        1,
        @id,
        GETDATE(),
        @createdSetID
    from @domainMap


    -- Successfull addition of new benchmark project
    SELECT messageName from Amplo.[Message] where MessageID = 12

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddSecurityQuestion]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspAddSecurityQuestion]
    (
        @UserID [int],
        @PasswordQuestionID [int],
--        @PasswordQuestion [nvarchar](512),
        @PasswordAnswer[nvarchar](512)
    )
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;
    INSERT INTO [Password]
    (
      [UserID],
      [PasswordQuestionID],
      [PasswordAnswer],
      [BeginDate],
      [EndDate],
      [ActiveFlag],
      [CreatedBy],
      [CreatedOn],
	  [ModifedBy],
	  [ModifiedOn]
    )
    VALUES
    (
        @UserID,
        @PasswordQuestionID,
        @PasswordAnswer,
        GETDATE(),
        NULL,
        1,
        @UserID,
        GETDATE(),
        @UserID,
        GETDATE()
    )

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END;
GO
/****** Object:  StoredProcedure [Amplo].[uspBenchmarkingReport]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 09-Sep-2019
-- Description:	This procedure retrieves Benchmarking ASIS score, TO Be score and Industry Benchmarking score for reporting purpose
-- =============================================
CREATE PROCEDURE [Amplo].[uspBenchmarkingReport] 
	-- Add the parameters for the stored procedure here
	@UserID [int]
--	@ClientID int,
   ,@ProjectID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	Declare @ClientID as INT
	Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

    -- Insert statements for procedure here
	SELECT  BGS.[BenchmarkProjectID], [RegionID], BP.[IndustryID], BP.[IndustryVerticalID], BP.[IndustrySubVerticalID], BGS.[DomainID], [IndustryBenchmark], [ASISBenchmark], [GoalSetting], BDM.[DomainName], BP.LockedFlag as LockedStatus from Amplo.BenchmarkingGoalSetting BGS
			--inner join [Amplo].[AmploDomain] DM on  BGS.DomainID = DM.DomainID
            inner join [Amplo].[BenchmarkingDomain] BDM on  BGS.DomainID = BDM.DomainID
            inner join [Amplo].BenchmarkProject BP on BGS.BenchmarkProjectID = BP.BenchmarkProjectID
	where BGS.[BenchmarkProjectID] = @ProjectID and BGS.ClientID = @ClientID
	order by BGS.DomainID asc;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspChangeBMProjectDisableDate]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspChangeBMProjectDisableDate]
 (
    @id int,
    @assessmentSetID int,
    @disableDate DATETIME
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentSetID - ID of set to update
@disableDate - DateTime type to update disable date
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    declare @projFforClientFlag as int
    select @projFforClientFlag = Count(BenchmarkProjectID) from Amplo.BenchmarkProjectUser where ClientID = (select ClientID from Amplo.[User] where UserID = @id) and BenchmarkProjectID = @assessmentSetID

    IF ISNULL(@projFforClientFlag,0) < 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


--update disable date in table
    Update Amplo.BenchmarkProject
    SET DisableDate = @disableDate, ModifiedBy = @id, ModifiedDate = GETDATE() where BenchmarkProjectID = @assessmentSetID

    --update disabled flag if to be disabled
    IF @disableDate < GETDATE()
    BEGIN
        
        Update Amplo.BenchmarkProject
        SET DisabledFlag = 1 where BenchmarkProjectID = @assessmentSetID
    END

    ELSE
    Begin
         Update Amplo.BenchmarkProject
        SET DisabledFlag = 0 where BenchmarkProjectID = @assessmentSetID
    END

    select MessageName from Amplo.Message where MessageID = 1013

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspChangeCapModProjectDisableDate]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspChangeCapModProjectDisableDate]
 (
    @id int,
    @CapModProjectID int,
    @disableDate DATETIME
 )
AS
BEGIN
/*
@id - Logged in userID
@CapModProjectID - ID of set to update
@disableDate - DateTime type to update disable date
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    declare @projFforClientFlag as int
    select @projFforClientFlag = Count(DecompositionProjectID) from Amplo.DecompositionProject where ClientID = (select ClientID from Amplo.[User] where UserID = @id) and DecompositionProjectID = @CapModProjectID

    IF ISNULL(@projFforClientFlag,0) < 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


--update disable date in table
    Update Amplo.DecompositionProject
    SET DisableDate = @disableDate, ModifiedBy = @id, ModifiedDate = GETDATE() where DecompositionProjectID = @CapModProjectID

    --update disabled flag if to be disabled
    IF @disableDate < GETDATE()
    BEGIN
        
        Update Amplo.DecompositionProject
        SET DisabledFlag = 1 where DecompositionProjectID = @CapModProjectID
    END

    ELSE
    Begin
         Update Amplo.DecompositionProject
        SET DisabledFlag = 0 where DecompositionProjectID = @CapModProjectID
    END

    select MessageName from Amplo.Message where MessageID = 1013

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspChangeDisableDate]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspChangeDisableDate]
 (
    @id int,
    @userIDtoChangeDate varchar(100),
    @disableDate DATETIME
 )
AS
BEGIN
/*
@id - Logged in userID
@userIDtoChangeDate - User ID to update
@disableDate - DateTime type to update disable date
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF @SuperUser <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    declare @sameClientFlag INT
    select @sameClientFlag = COUNT(UserID) from Amplo.[User] where UserID = @userIDtoChangeDate and ClientID = (Select ClientID from Amplo.[User] where UserID = @id)

    IF @sameClientFlag = 0
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    Update Amplo.[User]
    SET DisableDate = @disableDate, UserModifiedBy = @id, UserModifiedDate = GETDATE() where UserID = @userIDtoChangeDate


    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspChangePassword]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspChangePassword]
@UserId int
, @NewPassword nvarchar(256)
as
begin
	BEGIN TRY
		update [Amplo].[User] set [UserPassword] = @NewPassword
		where UserId = @UserId
    END TRY
    BEGIN CATCH
        EXECUTE [AMPLO].[uspLogError];
    END CATCH
end
GO
/****** Object:  StoredProcedure [Amplo].[uspDeleteClientProject]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspDeleteClientProject] AS
GO
/****** Object:  StoredProcedure [Amplo].[uspDeleteKPI]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Biswajit
-- Create date: 22-October-2019
-- Description:	This procedure updates KPI
-- =============================================
CREATE PROCEDURE [Amplo].[uspDeleteKPI]
	-- Add the parameters for the stored procedure here
		   @KpiId [int]
          ,@UserID [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    BEGIN TRY
    BEGIN TRANSACTION;
	if(@KpiId is not null and @KpiId != 0)
	begin
		update [Amplo].[KPI]
		set ActiveFlag = 0
			, ModifiedBy = @UserID
			, ModifiedDate = GETDATE()
		where KpiId = @KpiId
	end
    Select MessageName from Amplo.[Message] where MessageID = 1026

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspDisableUser]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspDisableUser]
(
    @id int,
    @userID int
)

/*
@id - Logged in SuperUser ID
@userID - User ID to disable
*/

AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    DECLARE @clientID int
    Select @clientID = ClientID from Amplo.[User] where @id = UserID
 
    UPDATE Amplo.[User]
    SET UserStatusID = '3', UserModifiedBy = @id --change the value to suspended
    WHERE UserID = @userID and ClientID = @clientID  

    --Message for successfull disable
    select MessageName from Amplo.[Message] where MessageID = 1018


    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;

END;
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchBMQuestionDetails]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspFetchBMQuestionDetails]
 (
    @id int,
    @projectid int,
    @domainid int,
    @questionid int
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id
    select ques.BenchmarkQuestionID, ques.Question, opt.BenchmarkQuestionOptionID, opt.OptionName, opt.OptionDescription, opt.OptionDesignChoice, opt.OptionIconPath, 
         aud.ResponseUserID as LastUserResponded, aud.ResponseTimeStamp as LastUserResponseTime, currSel.ResponseTimeStamp as CurrentUserLastSelected, iSNULL(ques.DesignChoice, 'strategy') DesignChoice, aud.Response
    from (Select DomainID from Amplo.UserDomainAccess where ActiveFlag = 1 and BenchmarkProjectID = @projectid And UserID = @id and DomainID = @domainid) dom --If user is not mapped to domain or project, inner join will return null
    inner join Amplo.BenchmarkQuestion ques on dom.DomainID = ques.DomainID and BenchmarkQuestionID = @questionid         --Get questions for domain
    inner join Amplo.BenchmarkQuestionOption opt on opt.BenchmarkQuestionID = ques.BenchmarkQuestionID                    --Get options for question
    
	left outer join (select Top 1 Response ResponseID, ISNULL(ModifiedDate, CreatedOn) ResponseTimeStamp, ISNULL(ModifedBy, CreadedBy) ResponseUserID, Response 
	from Amplo.BenchmarkAssessment where QuestionID = @questionid and BenchmarkProjectID = @projectid and DomainID = @domainid)
	--left join (select Top 1 ResponseID, ResponseUserID, ResponseTimeStamp, Response from Amplo.BenchmarkAuditLog where QuestionID = @questionid and BenchmarkProjectID = @projectid and DomainID = @domainid order by ResponseTimeStamp desc) 
	--aud on aud.ResponseID = opt.BenchmarkQuestionOptionID
	aud on ceiling(aud.Response) = opt.OptionName
    
	left join (select Top 1 ResponseID, ResponseTimeStamp from Amplo.BenchmarkAuditLog where QuestionID = @questionid and BenchmarkProjectID = @projectid and DomainID = @domainid and ResponseUserID = @id order by ResponseTimeStamp desc) currSel 
	on currSel.ResponseID = opt.BenchmarkQuestionOptionID 

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchBMQuestionList]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspFetchBMQuestionList]
 (
    @id int,
    @projectid int,
    @domainid int
 )
AS
BEGIN
/*
@id - Logged in userID
@projectid - Project for which questions are required
@domainid - Domain for which questions are required
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

--Categorizations values to be used later
    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    Declare @regionId as INT
    Declare @benchmarkProjectUserID as INT
   
    Select ques.BenchmarkQuestionID, ques.Question, opt.BenchmarkQuestionOptionID as OptionID ,opt.OptionName, 
    --opt.OptionDescription ,opt.OptionDesignChoice, 
    auditlog.ResponseUserID as LastResponseUser, auditlog.TimeStampLatest as LastResponseTime, ISNULL(accessed.LastAccessedFlag,0) as LastAccessedFlag
    from (Select DomainID from Amplo.UserDomainAccess where ActiveFlag = 1 and BenchmarkProjectID = @projectid And UserID = @id and DomainID = @domainid) dom --If user is not mapped to domain or project, inner join will return null
    inner join Amplo.BenchmarkQuestion ques on dom.DomainID = ques.DomainID --Get questions for domain
    inner join Amplo.BenchmarkQuestionOption opt on opt.BenchmarkQuestionID = ques.BenchmarkQuestionID -- Get options for question
    left Join (select Count(QuestionID) as LastAccessedFlag, QuestionID from amplo.[BenchmarkAssessment] 
	where IsNull(ModifedBy, CreadedBy) = @id and BenchmarkProjectID =@projectid and @domainid = @domainid group by QuestionID) accessed
    on ques.BenchmarkQuestionID =accessed.QuestionID
        -- return current user's last accessed flag  - 0 is not accessed
    left join (
        select te.ResponseUserID, te.BenchmarkProjectID, te.DomainID, te.QuestionID, te.ResponseID, te.TimeStampLatest from
        (select BenchmarkProjectID, DomainID, QuestionID, ISNULL(ModifiedDate, CreatedOn) as TimeStampLatest 
		, ISNULL(ModifedBy, CreadedBy) ResponseUserID, Response ResponseID
		from amplo.[BenchmarkAssessment] 
        where DomainId = @domainid and BenchmarkProjectId = @projectid
        --group by BenchmarkProjectID, DomainID, QuestionID
		) te
        --inner join amplo.[BenchmarkAssessment] b on te.BenchmarkProjectID = b.BenchmarkProjectID and te.DomainID = b.DomainID and te.QuestionID =b.QuestionID and te.TimeStampLatest = ISNULL(ModifiedDate, CreatedOn)
		) auditLog 
    on 1 = 1 --auditlog.ResponseID = opt.BenchmarkQuestionOptionID  -- Return Net Last response

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchMenus]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspFetchMenus]
 (
    @id [int],
     @menuBlock [int]
 )
AS
BEGIN
/*
@id - Logged in userID
@menuBlock - Top pane menus 1 for dashboard, 2 for configuration/users, 3 for reports
*/
SET NOCOUNT ON
DECLARE @SuperUser INT
Select @SuperUser = UserTypeID from Amplo.[User] where UserID = @id

--Configuration flag -> Submenu available only to superuser if set as 1
-- Category -> menublock - 1 for menus in dashboard, 2 for menus in configuration, 3 for reports (When needed)

--Create view. Filter from view on basis of superuser/add on user access and Menu block
Select fr.FunctionalResourceID, fr.MenuName, fr.MenuParentID, fr.ConfigurationFlag, rfr.ActionFlag, rfr.Action, fr.Category, fr.MenuURL INTO #formenus from
((Select ClientID from Amplo.[User] where UserID = @id and ActiveFlag = 1) u  ---Client id to fetch role
Inner JOIN Amplo.[UserAccessResource] uar ON uar.ClientID = u.ClientID and uar.ActiveFlag =1   --Client id fetches role
--Inner Join Amplo.[Role] r ON uar.RoleID = r.RoleID and r.ActiveFlag = 1 
Inner Join Amplo.RolesFunctionalResource rfr on rfr.RoleID = uar.RoleID  --RoleID fetches functional resource IDs
Inner JOIN Amplo.[FunctionalResources] fr on rfr.FunctionalResourceID = fr.FunctionalResourceID AND fr.ActiveFlag = 1)   -- Details of functional resources


If @SuperUser = 1
BEGIN
    -- get all menus submenus, thus no filter for configuration
    Select DISTINCT 
            Parent.FunctionalResourceID as ParentMenuID,
            Parent.MenuName AS ParentMenu,
            Child.FunctionalResourceID as SubmenuID,
            Child.MenuName As Submenu,
            Child.MenuURL AS Link,
            Child.ActionFlag As Access 
    from #formenus Child
    left join Amplo.FunctionalResources Parent on Child.MenuParentID = Parent.FunctionalResourceID And Parent.ActiveFlag = 1
    WHERE  Child.Category  = @MenuBlock
END

ELSE
BEGIN
-- get only menus and submenus which are available to superuser
    Select DISTINCT
         Parent.FunctionalResourceID as ParentMenuID,
            Parent.MenuName AS ParentMenu,
            Child.FunctionalResourceID as SubmenuID,
            Child.MenuName As Submenu,
            Child.MenuURL AS Link,
            Child.ActionFlag As Access 
    from #formenus Child
    left join Amplo.FunctionalResources Parent on Child.MenuParentID = Parent.FunctionalResourceID And Parent.ActiveFlag = 1
    WHERE  Child.Category  = @MenuBlock AND Child.ConfigurationFlag = 0
END
DROP TABLE #formenus
END
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchSecurityQuestion]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspFetchSecurityQuestion]
(
    @PUserID [int]
)
AS
BEGIN
    SET NOCOUNT ON;
    --fetches security question and answer of the resp
    Declare @isSecuritySet INT
    SELECT @isSecuritySet=Count(*) FROM [Password] WHERE UserID = @PUserID
    IF(@isSecuritySet>0)
    BEGIN

        SELECT [PasswordQuestion].PasswordQuestion,[Password].PasswordAnswer 
        FROM [Amplo].[Password]
        INNER JOIN [Amplo].[PasswordQuestion]
        ON [Password].PasswordQuestionID = [PasswordQuestion].PasswordQuestionID
        WHERE [Password].UserID = @PUserID
    END
    ELSE
    BEGIN
        SELECT MessageName FROM Amplo.Message WHERE MessageID = 11
    END
  
  END;
GO
/****** Object:  StoredProcedure [Amplo].[uspGetBenchmarkingLevels]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 09-Sep-2019
-- Description:	This procedure retrieves Benchmarking ASIS score, TO Be score and Industry Benchmarking score for reporting purpose
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetBenchmarkingLevels] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 	[BenchmarkingLevelName], [BenchmarkingDescription], [BenchmarkingCharacterizedby], 	[BenchmarkingKeyEnablers] from Amplo.benchmarkingLevel;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetBenchmarkingReportLockStatus]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 16-Sep-2019
-- Description:	This procedure retrieves Benchmarking Report Lock Status
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetBenchmarkingReportLockStatus] 
	-- Add the parameters for the stored procedure here
	@UserID int,
--	@ClientID int,
	@ProjectID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	declare @clientId INT
	select @clientId = ClientID from Amplo.[User] where UserID = @UserID and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

	SELECT  BP.BenchmarkProjectID, BP.LockedFlag as LockedStatus from [Amplo].BenchmarkProject BP WHERE BP.ClientID = @ClientID and BP.BenchmarkProjectID = @ProjectID; 

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetCity]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetCity]
@StateProvince varchar(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all industry types
  select * from Amplo.City where ISO = @StateProvince

END;
GO
/****** Object:  StoredProcedure [Amplo].[uspGetClientCapModProjects]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetClientCapModProjects]
 (
    @id [int]
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT MessageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id
	select CapModProjectID
      , CapModProjectName
      , NoOfUsers
      , StatusID
      , StatusName
	  from (
    Select proj.[DecompositionProjectID] as CapModProjectID
      ,proj.[ProjectName] as CapModProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,proj.StatusID as StatusID
      ,stat.StatusName as StatusName
      ,proj.DisableDate as DisableDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select DecompositionProjectID,ProjectName, DisableDate, StatusID, ActiveFlag, CreatedDate, ModifiedDate from Amplo.DecompositionProject where ISNULL(DisabledFlag, 0) = 0 and ISNULL(LockedFlag, 0) = 0) proj
      inner join (Select DecompositionProjectID,UserID from Amplo.DecompositionProjectUser where ClientID = @clientid) projUser on projUser.DecompositionProjectID = proj.DecompositionProjectID
      left join Amplo.DecompositionStatus stat on proj.StatusID = stat.StatusID
	  where proj.ActiveFlag = 1
      group by proj.[DecompositionProjectID] 
      ,proj.[ProjectName]
      ,proj.StatusID
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate, proj.ModifiedDate
      
    UNION all
    Select proj.[DecompositionProjectID] as CapModProjectID
      ,proj.[ProjectName] as CapModProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,100 as StatusID
      ,'DISABLED' as StatusName
      ,proj.DisableDate as DisableDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select DecompositionProjectID,ProjectName, DisableDate, StatusID, ActiveFlag, CreatedDate, ModifiedDate from Amplo.DecompositionProject where ISNULL(DisabledFlag, 0) = 1) proj
      inner join (Select DecompositionProjectID,UserID from Amplo.DecompositionProjectUser where ClientID = @clientid) projUser on projUser.DecompositionProjectID = proj.DecompositionProjectID
      left join Amplo.DecompositionStatus stat on proj.StatusID = stat.StatusID
	  where proj.ActiveFlag = 1
      group by proj.[DecompositionProjectID] 
      ,proj.[ProjectName]
      ,proj.StatusID
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate, proj.ModifiedDate
      
    UNION all
    Select proj.[DecompositionProjectID] as CapModProjectID
      ,proj.[ProjectName] as CapModProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,90 as StatusID
      ,'Locked' as StatusName
      ,proj.DisableDate as DisableDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select DecompositionProjectID,ProjectName, DisableDate, StatusID, ActiveFlag, CreatedDate, ModifiedDate from Amplo.DecompositionProject where ISNULL(DisabledFlag, 0) = 0 and ISNULL(LockedFlag, 0) = 1) proj
      inner join (Select DecompositionProjectID,UserID from Amplo.DecompositionProjectUser where ClientID = @clientid) projUser on projUser.DecompositionProjectID = proj.DecompositionProjectID
      left join Amplo.DecompositionStatus stat on proj.StatusID = stat.StatusID
	  where proj.ActiveFlag = 1
      group by proj.[DecompositionProjectID] 
      ,proj.[ProjectName]
      ,proj.StatusID
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate, proj.ModifiedDate
	  ) MainTable
    --ORDER BY MainTable.StatusID
	 order by MainTable.OrderDate desc
  
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetClientProjects]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetClientProjects]
 (
    @id [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT MessageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    --Upper section only for projects which are not disabled and not locked by flag
	select main.BMProjectID
      ,main.BMProjectName
      ,main.NoOfUsers
      ,main.StatusID
      ,main.StatusName
      ,main.DisableDate
	  , main.CreatedDate
	  from(
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,proj.status as StatusID
      ,stat.StatusName as StatusName
      ,proj.DisableDate as DisableDate
	  , proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status], CreatedDate, ModifiedDate from Amplo.BenchmarkProject where ISNULL(DisabledFlag, 0) = 0 and LockedFlag = 0) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
      --where projUser.ClientID = @clientid
      group by proj.[BenchmarkProjectID] 
      ,proj.[BenchmarkProjectName]
      ,proj.status
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate
      , ISNULL(proj.ModifiedDate, proj.CreatedDate)
    UNION all
    --section only for projects where disabled flag is set , status returned as disabled
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,100 as StatusID
      ,'DISABLED' as StatusName
      ,proj.DisableDate as DisableDate
	  , proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status], CreatedDate, ModifiedDate from Amplo.BenchmarkProject where ISNULL(DisabledFlag, 0) = 1) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
      --where projUser.ClientID = @clientid
      group by proj.[BenchmarkProjectID] 
      ,proj.[BenchmarkProjectName]
      ,proj.status
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate
      , ISNULL(proj.ModifiedDate, proj.CreatedDate)
    UNION all
    --section only for projects where disabled flag is not set but locked flag is set , status returned as locked
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,90 as StatusID
      ,'Locked' as StatusName
      ,proj.DisableDate as DisableDate
	  , proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status], CreatedDate, ModifiedDate from Amplo.BenchmarkProject where ISNULL(DisabledFlag, 0) = 0 and LockedFlag = 1) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
      --where projUser.ClientID = @clientid
      group by proj.[BenchmarkProjectID] 
      ,proj.[BenchmarkProjectName]
      ,proj.status
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate)
    ) main
    ORDER BY main.OrderDate desc, main.StatusId
  
     
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
  -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetClientProjects2]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetClientProjects2]
 (
    @id [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT MessageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    --update disable flag for all projects
    UPDATE Amplo.BenchmarkProject
    set DisabledFlag = 1 where DisableDate < GETDATE()

   -- Update

    
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,proj.status as StatusID
      ,stat.StatusName as StatusName
      ,proj.DisableDate as DisableDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status] from Amplo.BenchmarkProject where DisabledFlag = 0) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
      --where projUser.ClientID = @clientid
      group by proj.[BenchmarkProjectID] 
      ,proj.[BenchmarkProjectName]
      ,proj.status
      ,stat.StatusName 
      ,proj.DisableDate
      
    UNION all
    
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,100 as StatusID
      ,'DISABLED' as StatusName
      ,proj.DisableDate as DisableDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status] from Amplo.BenchmarkProject where DisabledFlag = 1) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
      --where projUser.ClientID = @clientid
      group by proj.[BenchmarkProjectID] 
      ,proj.[BenchmarkProjectName]
      ,proj.status
      ,stat.StatusName 
      ,proj.DisableDate
      ORDER BY proj.status
    
    
     
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetClientRevenueRange]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetClientRevenueRange]
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all industry types
SELECT ClientRevenueRangeID, ClientRevenueRangeName FROM Amplo.ClientRevenueRange order by ClientRevenueRangeID asc; 

END;
GO
/****** Object:  StoredProcedure [Amplo].[uspGetCompanyProfileQuestions]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 27-09-2019
-- Description:	This procedure retrieve company profile questions
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetCompanyProfileQuestions]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [QuestionID]
      ,[Question]
      ,[ActiveFlag]
  FROM [Amplo].[AmploProfilingQuestions]
  WHERE ActiveFlag = 1


END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetCountry]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetCountry]
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all countries
    SELECT [CountryRegionCode] CountryID, [Name] CountryName
    FROM Amplo.CountryRegions order by CountryRegionCode; 
END;
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardAnnouncements]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13 Sept 2019
-- Description:	This procedure populates Dashboard Announcements
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardAnnouncements]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DashboardAnnouncementID]
      ,[ClientID]
      ,[DashboardAnnouncementName]
      ,[DashboardAnnouncementHighlights]
      ,[DashboardAnnouncementSubHighlights]
      ,[DashboardAnnouncementURLPath]
      ,[DashboardAnnouncementSource]
      ,[DashboardAnnouncementCategory]
      ,[DashboardAnnouncementDigitalAsset]
  FROM [Amplo].[DashboardAnnouncement]
--  where [ClientID] = @ClientID
  Order by [CreatedDate] desc;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardEvent]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13 Sept 2019
-- Description:	This procedure populates Dashboard Events
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardEvent]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT
        [DashboardEventID],
        [ClientID],
        [DashboardEventName],
        [DashboardEvent],
        [DashboardEventDate],
        [DashboardEventURLPath],
        [DashboardEventSource],
        [DashboardEventCategory],
        [DashboardEventsDigitalAsset]
    from [Amplo].[DashboardEvent]
--  where [ClientID] = @ClientID
  Order by [DashboardEventDate] desc;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardHighlights]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDashboardHighlights]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DashboardHighlightsID]
      ,[ClientID]
      ,[DashboardHighlightsName]
      ,[DashboardHighlights]
      ,[DashboardHighlightsURLPath]
      ,[DashboardHighlightsSource]
      ,[DashboardHighlightsCategory]
      ,[DashboardHighlightsDigitalAsset]
  FROM [Amplo].[DashboardHighlights]
--  Where [ClientID] = @ClientID
  Order by [CreatedDate] desc;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardIndustryNews]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13 Sept 2019
-- Description:	This procedure populated Highlights for Dashboard
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardIndustryNews]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DashboardIndustryNewsID]
      ,[ClientID]
      ,[DashboardIndustryNewsName]
      ,[IndustryNews]
      ,[IndustryNewsURLPath]
      ,[DashboardIndustryNewsDate]        
      ,[IndustryNewsSource]
      ,[IndustryNewsCategory]
      ,[IndustryNewsDigitalAsset]
  FROM [Amplo].[DashboardIndustryNews]
--  where [ClientID] = @ClientID 
  Order by [DashboardIndustryNewsDate] desc;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardPopularResources]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13 Sept 2019
-- Description:	This procedure populates Dashboard Popular Resources
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardPopularResources]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DashboardPopularResourceID]
      ,[ClientID]
      ,[DashboardPopularResourceName]
      ,[DashboardPopularResourceHighlights]
      ,[DashboardPopularResourceSubHighlights]
      ,[DashboardPopularResourceURLPath]
      ,[DashboardPopularResourceSource]
      ,[DashboardPopularResourceCategory]
      ,[DashboardPopularResourceDigitalAsset]
  FROM [Amplo].[DashboardPopularResource]
--  where [ClientID] = @ClientID
  Order by [DashboardPopularResourceID] desc;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardTODO]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 15 Sept 2019
-- Description:	This procedure populates TODO task details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardTODO]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT
	[DashboardTODOID],
	[DashboardTODOTaskDescription],
	[DashboardTODOStatus],
	[DashboardTODURLPath],
	[DashboardTODODate],
	[DashboardTODOSource],
	[DashboardTODOCategory],
	[DashboardTODODigitalAsset],
	[ActiveFlag]
  FROM [Amplo].[DashboardTODO]
--  where [ClientID] = @ClientID 
  Order by [DashboardTODODate] desc;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardWebinars]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13 Sept 2019
-- Description:	This procedure populates Dashboard Popular Resources
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardWebinars]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DashboardWebinarID]
      ,[ClientID]
      ,[DashboardWebinarName]
      ,[DashboardWebinarDescription]
      ,[DashboardWebinarDate]
      ,[DashboardWebinarURLPath]
      ,[DashboardWebinarSource]
      ,[DashboardWebinarCategory]
      ,[DashboardWebinarDigitalAsset]
  FROM [Amplo].[DashboardWebinar]
--  where [ClientID] = @ClientID
  Order by [DashboardWebinarDate] desc;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionActivityBank]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas Kancharla
-- Create date: 20th Sept 2019
-- Description:	This procedure retrieves activity bank details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionActivityBank]
@DecompositionProjectID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

/*
    select [DecompositionLevel1ActivityBankID],
	[Level1ActivityBankName],
	[DecompositionProjectUserID],
	[ProcessName],
	[ProcessDescription],
	[ProcessLevel1Meaning],
	[GridViewLocationID]
    from [Amplo].[DecompositionLevel1ActivityBank]
    where activeflag = 1 and DecompositionProjectUserID = @ProjectuserID
    order by createddate desc;
 */
 
		select [DecompositionProcessLevel1ID],
			   [ProcessLevel1Title],
			   [GridViewLocationID],
			   [GridVViewLocationFlag],
			   [Status]
		 FROM [Amplo].[DecompositionProcessLevel1]
		where [DecompositionProjectID] =  @DecompositionProjectID AND activeflag = 1 AND GridViewLocationID = -1 AND GridVViewLocationFlag = 0 
		order by [ProcessLevel1Title] desc;

    END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionActivityStatusSummary]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionActivityStatusSummary]
@UseriD int,
@ProjectID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;


	SELECT
	ISNULL(SUM((CASE WHEN Status = 1  THEN 1 END)),0) as '1',
	ISNULL(SUM((CASE WHEN Status = 2  THEN 1 END)),0) as '2',
	ISNULL(SUM((CASE WHEN Status = 3  THEN 1 END)),0) as '3'
	from [Amplo].[DecompositionProcessLevel1]
	where [DecompositionProjectID] = @ProjectID and activeflag = 1 and GridVViewLocationFlag = 1
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionFunctionProject]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionFunctionProject] --1015, 49
 (
    @Userid [int],
    @projectid [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON


select FunctionNumber as DecompositionFunctionProjectID, FunctionName from Amplo.DecompositionFunctionProject 
where DecompositionProjectID = @projectid 


/*select DecompositionFunctionProjectID, FunctionName from Amplo.DecompositionFunctionProject 
where DecompositionProjectID = @projectid 
--and ActiveFlag = 1;
*/


END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionLevel1Activities]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionLevel1Activities]
 (
    @Userid [int],
    @projectid [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY

		Declare @ClientID as INT
		Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

		Select DecompositionProcessLevel1ID, FunctionID, PhaseID, ProcessLevel1Title, GridViewLocationID, GridVViewLocationFlag, Status 
	--	select FunctionID, PhaseID, ProcessLevel1Name, GridViewLocationID 
		from Amplo.DecompositionProcessLevel1 
		where ClientID = @ClientID And DecompositionProjectID = @projectid and ActiveFlag = 1 and GridVViewLocationFlag = 1;
	--UserID = @Userid and 

    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionPhaseProject]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionPhaseProject]
 (
    @Userid [int],
    @projectid [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;


select PhaseNumber as DecompositionPhaseProjectID, PhaseName from Amplo.DecompositionPhaseProject where UserID = @Userid and DecompositionProjectID = @projectid and ActiveFlag = 1;

/*
select DecompositionPhaseProjectID, PhaseName from Amplo.DecompositionPhaseProject where UserID = @Userid and DecompositionProjectID = @projectid and ActiveFlag = 1;
*/

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProcessLevel1Connected]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionProcessLevel1Connected]
	-- Add the parameters for the stored procedure here
@UserID int,
@ProjectID int,
@FunctionID int,
@PhaseID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT DecompositionProcessLevel1ID, Processlevel1title FROM Amplo.DecompositionProcessLevel1 
	WHERE UserID = @UserID 
	AND  DecompositionProjectID = @ProjectID 
	AND FunctionID = @FunctionID 
	AND PhaseID = @PhaseID 
	AND GridVViewLocationFlag=1 
	AND ActiveFlag=1;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProcessLevel1HeatMap]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 24-October-2019
-- Description:	This procedure provides Capability Modelling Heatmap with Score Details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionProcessLevel1HeatMap] --1015, 4
	-- Add the parameters for the stored procedure here
    @Userid [int],
    @projectid [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    BEGIN TRY

	Declare @ClientID as INT
	Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

    -- Insert statements for procedure here
	SELECT dpl.DecompositionProcessLevel1ID, dpl.DecompositionProjectID, dpl.FunctionID,dpl.PhaseID,dpl.ProcessLevel1Title,dpl.GridVViewLocationFlag,dpl.GridViewLocationID,dpl.Status,ISNULL((dpls.Level1_Calc_Aggr_Score), 0) As AggrScore 
	FROM Amplo.DecompositionProcessLevel1 dpl
	LEFT JOIN
	Amplo.DecompositionProcessLevel1Score dpls
	ON dpl.DecompositionProcessLevel1ID = dpls.DecompositionProcessLevel1ID
	WHERE dpl.ClientID = @ClientID And dpl.DecompositionProjectID = @projectid and dpl.ActiveFlag = 1 and dpl.GridVViewLocationFlag = 1
	--and dpls.Disable_Date is null
    END TRY
    BEGIN CATCH
        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProcessLevel2Tasks]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================================================================
-- Author:		Srinivas
-- Create date: 30-Sept-2019
-- Description:	Thsi procedure retrieves ProcessLevel2 task details
-- =============================================================================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionProcessLevel2Tasks]
	-- Add the parameters for the stored procedure here
	@UserID int,
	@DecompositionProjectID int,
	@DecompositionProcessLevel1ID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT DecompositionProcessLevel2ID, DecompositionProcessLevel1ID, ProcessLevel2Title from Amplo.DecompositionProcessLevel2 where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProcessLevelSearch]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ======================================================================================================================================================
-- Author:		Srinivas
-- Create date: 14-October-2019
-- Description:	This procedure searches Process L1 to L5 process title and highlights the Process Level1
-- ======================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionProcessLevelSearch]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@SearchKey [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	--select * from Amplo.DecompositionProcessLevel1;
    -- Insert statements for procedure here
--	SELECT DecompositionProcessLevel1ID, ProcessLevel1Title, FunctionID, PhaseID, GridViewLocationID from Amplo.DecompositionProcessLevel1 WHERE DecompositionProcessLevel1ID in
--	(
/*
	SELECT DecompositionProcessLevel1ID from Amplo.DecompositionProcessLevel1 WHERE UPPER(ProcessLevel1Title) LIKE '%' + UPPER(@SearchKey) + '%' 
	
	UNION 

	SELECT DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 WHERE UPPER(ProcessLevel2Title) LIKE '%' + UPPER(@SearchKey) + '%'  

	UNION 

	SELECT DecompositionProcessLevel3ID from Amplo.DecompositionProcessLevel3 WHERE UPPER(ProcessLevel3Title) LIKE '%' + UPPER(@SearchKey) + '%'  
	
	UNION 

	SELECT DecompositionProcessLevel4ID from Amplo.DecompositionProcessLevel4 WHERE UPPER(ProcessLevel4Title) LIKE '%' + UPPER(@SearchKey) + '%' 
	UNION 

	SELECT DecompositionProcessLevel5ID from Amplo.DecompositionProcessLevel5 WHERE UPPER(ProcessLevel5Title) LIKE '%' + UPPER(@SearchKey) + '%'  
*/


		WITH ProcessLevelSearch_CTE (DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel1Title)  
		AS  
		(
			SELECT DecompositionProjectID,  DecompositionProcessLevel1ID, ProcessLevel1Title from Amplo.DecompositionProcessLevel1 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel1Title) LIKE '%' + UPPER(@SearchKey) + '%' 
	
			UNION ALL

			SELECT DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel2Title from Amplo.DecompositionProcessLevel2 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel2Title) LIKE '%' + UPPER(@SearchKey) + '%'  

			UNION ALL

			SELECT DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel3Title  from Amplo.DecompositionProcessLevel3 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel3Title) LIKE '%' + UPPER(@SearchKey) + '%'  
	
			UNION ALL

			SELECT DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel4Title from Amplo.DecompositionProcessLevel4 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel4Title) LIKE '%' + UPPER(@SearchKey) + '%' 

			UNION ALL

			SELECT DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel5Title from Amplo.DecompositionProcessLevel5 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel5Title) LIKE '%' + UPPER(@SearchKey) + '%'  
		)
		SELECT psc.DecompositionProjectID, psc.DecompositionProcessLevel1ID, psc.ProcessLevel1Title, dp.FunctionID, dp.PhaseID, dp.GridViewLocationID, dp.GridVViewLocationFlag, dp.Status  
		FROM ProcessLevelSearch_CTE psc
		INNER JOIN DecompositionProcessLevel1 dp
		on psc.DecompositionProjectID = dp.DecompositionProjectID AND PSC.DecompositionProcessLevel1ID = DP.DecompositionProcessLevel1ID
		where dp.FunctionID != 0 and dp.PhaseID != 0
--	)
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProjects]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionProjects] 
 (
    @UserID [int]
 )
AS
BEGIN

SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID

    --Upper section only for projects which are not disabled and not locked by flag
    Select dpu.DecompositionProjectID, dp.ProjectName, dpu.UserID from Amplo.DecompositionProjectUser dpu
    inner join Amplo.DecompositionProject dp on dpu.decompositionprojectid= dp.DecompositionProjectID
    where dp.ClientID = @clientid 
	--and dpu.UserID = @UserID 
	and dp.ActiveFlag = 1 and dp.DisabledFlag = 0 order by dp.CreatedDate desc;

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionReportAverageScore]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 11-November-2019
-- Description:	This procedure retrieves average score for capability modelling workbench
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionReportAverageScore]
	-- Add the parameters for the stored procedure here
@ProjectID [int]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
select b.FunctionTilte FunctionTitle, c.PhaseTitle PhaseTitile, avg(d.Level1_Calc_Aggr_Score) AvgScore from Amplo.DecompositionProcessLevel1 a
inner join Amplo.DecompositionFunction b on a.FunctionID = b.DecompositionFunctionID
inner join Amplo.DecompositionPhase c on c.DecompositionPhaseID = a.PhaseID
inner join Amplo.DecompositionProcessLevel1score d on a.DecompositionProcessLevel1ID = d.DecompositionProcessLevel1ID
where a.DecompositionProjectID = @ProjectID
group by b.FunctionTilte, c.PhaseTitle

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionScoringCriteria]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionScoringCriteria]
	-- Add the parameters for the stored procedure here
	@DecompositionProjectID int,
	@ProcessLevel1ID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select 
		[DecompositionScoreCriteriaID],
		[DecompositionProjectID],
		[DecompositionProcessLevel1ID],
		[ScoreCriteriaName],
		[ScoreCriteriaActualName],
		[ScoreCriteriaTitle],
		[ScoreCriteriaDescription],
		[SeededFlag],
		[UsedFlag] 
	from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID = @DecompositionProjectID 
	--and [SeededFlag] = 1 
	and [UsedFlag] = 1
	and [DecompositionProcessLevel1ID] = @ProcessLevel1ID
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionScoringCriteria_08112019]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionScoringCriteria_08112019]
	-- Add the parameters for the stored procedure here
	@DecompositionProjectID int,
	@ProcessLevel1ID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select 
		[DecompositionScoreCriteriaID],
		[DecompositionProjectID],
		[DecompositionProcessLevel1ID],
		[ScoreCriteriaName],
		[ScoreCriteriaActualName],
		[ScoreCriteriaTitle],
		[ScoreCriteriaDescription],
		[SeededFlag],
		[UsedFlag] 
	from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID = @DecompositionProjectID 
	and (DecompositionProcessLevel1ID = 1 or DecompositionProcessLevel1ID = @ProcessLevel1ID)

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionScoringCustomCriteria]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionScoringCustomCriteria]
	-- Add the parameters for the stored procedure here
	@DecompositionProjectID int,
	@ProcessLevel1ID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select 
		[DecompositionScoreCriteriaID],
		[DecompositionProjectID],
		[DecompositionProcessLevel1ID],
		[ScoreCriteriaName],
		[ScoreCriteriaActualName],
		[ScoreCriteriaTitle],
		[ScoreCriteriaDescription],
		[SeededFlag],
		[UsedFlag] 
	from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID = @DecompositionProjectID 
	AND DecompositionProcessLevel1ID = @ProcessLevel1ID
	and [SeededFlag] = 0 AND [UsedFlag] = 0

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeView]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeView]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
	DECLARE @PProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[float]
	DECLARE @ScoreCriteria2	[float]
	DECLARE @ScoreCriteria3	[float]
	DECLARE @ScoreCriteria4	[float]
	DECLARE @ScoreCriteria5	[float]
	DECLARE @ScoreCriteria6	[float]
	DECLARE @ScoreCriteria7	[float]
	DECLARE @ScoreCriteria8	[float]
	DECLARE @ScoreCriteria9	[float]
	DECLARE @ScoreCriteria10 [float]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]


	SET @ScoreCriteria1	= 0.00
	SET @ScoreCriteria2	= 0.00
	SET @ScoreCriteria3	= 0.00
	SET @ScoreCriteria4 = 0.00
	SET @ScoreCriteria5	= 0.00
	SET @ScoreCriteria6	= 0.00
	SET @ScoreCriteria7	= 0.00
	SET @ScoreCriteria8	= 0.00
	SET @ScoreCriteria9	= 0.00
	SET @ScoreCriteria10 = 0.00

    -- Insert statements for procedure here
	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 numeric(10, 2), 
		ScoreCriteria2 numeric(10, 2),
		ScoreCriteria3 numeric(10, 2),
		ScoreCriteria4 numeric(10, 2),
		ScoreCriteria5 numeric(10, 2),
		ScoreCriteria6 numeric(10, 2),
		ScoreCriteria7 numeric(10, 2),
		ScoreCriteria8 numeric(10, 2),
		ScoreCriteria9 numeric(10, 2),
		ScoreCriteria10 numeric(10, 2), 
		NodeLevelID [varchar](100), 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int]
		, LeafNodeFlag bit
	  );
	  declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	  declare @Status as int = 0
		--Process Level1 Cursor

	SELECT top 1 @Status = a.[Status], @PProcessLevel1ID = a.[DecompositionProcessLevel1ID], @ProcessLevelTitle=[ProcessLevel1Title], @Owner=[Owner], @AvgScoreWeightage = ISNULL([Avg_Score_Weight],2.00) FROM Amplo.DecompositionProcessLevel1 a
	INNER JOIN Amplo.DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;
	INSERT INTO #DecompositionProcessLevelDetails
	(
		ProcessLevel1ID, ProcessLevelTitle, Owner, Priority, ProcessLevel, LeafNodeFlag
	)
	VALUES
	(
		@ProcessLevel1ID, @ProcessLevelTitle, @Owner, @AvgScoreWeightage, 1, 0
	)

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT 
	a.[DecompositionProcessLevel1ID], 
	a.[DecompositionProcessLevel2ID], 
	a.[ProcessLevel2NodeID],
	a.[ProcessLevel2Title], 
	a.[Owner], 
	a.[CountrySpecific], 
	a.[LeafNodeFlag], 
	ISNULL(b.[AvgScoreWeightage],2.00), 
	ISNULL(b.ScoreCriteria1, 0.00), 
	ISNULL(b.ScoreCriteria2,0.00), 
	ISNULL(b.ScoreCriteria3,0.00), 
	ISNULL(b.ScoreCriteria4,0.00),
	ISNULL(b.ScoreCriteria5,0.00), 
	ISNULL(b.ScoreCriteria6,0.00), 
	ISNULL(b.ScoreCriteria7,0.00), 
	ISNULL(b.ScoreCriteria8,0.00), 
	ISNULL(b.ScoreCriteria9,0.00), 
	ISNULL(b.ScoreCriteria10,0.00),
	ISNULL(a.LeafNodeFlag, 0) 
	
	FROM Amplo.DecompositionProcessLevel2 a 
    left outer JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID 
	--added by Srini on 10-November 2019
	AND ActiveFlag = 1
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Level2LeafNodeFlag
	
    WHILE @@FETCH_STATUS = 0
    BEGIN
			
		INSERT INTO #DecompositionProcessLevelDetails
		(
			ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
			VALUES
			(
				@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2, @Level2LeafNodeFlag
			);


			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)
			, ISNULL(a.LeafNodeFlag, 0)
			FROM Amplo.DecompositionProcessLevel3 a
			left outer JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			AND ActiveFlag = 1 --Added by Srini on 10-November-2019
			ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level3LeafNodeFlag

			WHILE @@FETCH_STATUS = 0
			BEGIN
			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3, @Level3LeafNodeFlag);

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)  
			, ISNULL(a.LeafNodeFlag, 0)
			FROM Amplo.DecompositionProcessLevel4 a
			left outer JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			AND ActiveFlag = 1 --Added by Srini on 10-November-2019
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level4LeafNodeFlag


			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
				INSERT INTO #DecompositionProcessLevelDetails
				(
					ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
					VALUES
					(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4, @Level4LeafNodeFlag, @ProcessLevelNodeID);
							
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],
							ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)
							, ISNULL(a.LeafNodeFlag, 0)
							from Amplo.DecompositionProcessLevel5 a
							left outer join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID AND a.[DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
							AND ActiveFlag = 1 --Added by Srini on 10-November-2019
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level5LeafNodeFlag

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5, @Level5LeafNodeFlag, @ProcessLevelNodeID);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level5LeafNodeFlag
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level4LeafNodeFlag
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level3LeafNodeFlag
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Level2LeafNodeFlag
    END;

    CLOSE ProcessLeveL2List
    DEALLOCATE ProcessLeveL2List

   CREATE INDEX IX_ProcessLevelID ON #DecompositionProcessLevelDetails (ProcessLevel1ID, ProcessLevel2ID,ProcessLevel3ID,ProcessLevel4ID,ProcessLevel5ID);

	select 
			ProcessLevel1ID,
			ProcessLevel2ID,
			ProcessLevel3ID,
			ProcessLevel4ID,
			ProcessLevel5ID,
			ProcessLevelNodeID as ProcessLevelID, 
			ProcessLevelTitle, 
			ScoreCriteria1, 
			ScoreCriteria2,
			ScoreCriteria3,
			ScoreCriteria4,
			ScoreCriteria5,
			ScoreCriteria6,
			ScoreCriteria7,
			ScoreCriteria8,
			ScoreCriteria9,
			ScoreCriteria10, 
			NodeLevelID, 
			Owner, 
			CountrySpecific, 
			Priority, 
			ProcessLevel
			, LeafNodeFlag
			, @Status [Status]
		FROM #DecompositionProcessLevelDetails


		DROP TABLE if exists #DecompositionProcessLevelDetails;

    COMMIT TRANSACTION;
	RETURN 0;
    END TRY
    BEGIN CATCH
		CLOSE ProcessLeveL2List
		DEALLOCATE ProcessLeveL2List

		CLOSE ProcessLeveL3List
		DEALLOCATE ProcessLeveL3List

		--CLOSE ProcessLeveL4List
		--DEALLOCATE ProcessLeveL4List

		--CLOSE ProcessLeveL2List
		--DEALLOCATE ProcessLeveL2List

		select Error_Message(), error_Line()
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeView_28102019]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeView_28102019]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]

--	<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
--	Declare @DecompositionProcessLevel1ID int
 --   Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here
--	DECLARE @ProjectID [int]
--	DECLARE @ProcessLevel1ID [int]
	DECLARE @PProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[INT]
	DECLARE @ScoreCriteria2	[INT]
	DECLARE @ScoreCriteria3	[INT]
	DECLARE @ScoreCriteria4	[INT]
	DECLARE @ScoreCriteria5	[INT]
	DECLARE @ScoreCriteria6	[INT]
	DECLARE @ScoreCriteria7	[INT]
	DECLARE @ScoreCriteria8	[INT]
	DECLARE @ScoreCriteria9	[INT]
	DECLARE @ScoreCriteria10 [INT]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]

--	set @ProjectID = 4
--	set @ProcessLevel1ID = 1
    -- Insert statements for procedure here
	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 [float], 
		ScoreCriteria2 [float],
		ScoreCriteria3 [float],
		ScoreCriteria4 [float],
		ScoreCriteria5 [float],
		ScoreCriteria6 [float],
		ScoreCriteria7 [float],
		ScoreCriteria8 [float],
		ScoreCriteria9 [float],
		ScoreCriteria10 [float], 
		NodeLevelID [float], 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int]
	  );

--Process Level1 Cursor

	SELECT top 1 @PProcessLevel1ID = a.[DecompositionProcessLevel1ID], @ProcessLevelTitle=[ProcessLevel1Title], @Owner=[Owner] FROM Amplo.DecompositionProcessLevel1 a
	INNER JOIN Amplo.DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;
	INSERT INTO #DecompositionProcessLevelDetails
	(
		ProcessLevel1ID, ProcessLevelTitle, Owner, ProcessLevel
	)
	VALUES
	(
		@ProcessLevel1ID, @ProcessLevelTitle, @Owner, 1
	)


	--Process Level2 Cursor

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[ProcessLevel2NodeID],a.[ProcessLevel2Title], a.[Owner], a.[CountrySpecific], a.[LeafNodeFlag], b.[AvgScoreWeightage], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10 
	FROM Amplo.DecompositionProcessLevel2 a 
    INNER JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
	
	INSERT INTO #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific, Priority, ProcessLevel)
		VALUES
		(
			@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2
		);

--		SELECT * FROM #DecompositionProcessLevelDetails

--	SELECT 	@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag;
    WHILE @@FETCH_STATUS = 0
    BEGIN
			

			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage
			FROM Amplo.DecompositionProcessLevel3 a
			INNER JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage  
			FROM Amplo.DecompositionProcessLevel4 a
			INNER JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage
							from Amplo.DecompositionProcessLevel5 a
							inner join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.[DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

							INSERT INTO #DecompositionProcessLevelDetails
							(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
							VALUES
							(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5);

--							SELECT * FROM #DecompositionProcessLevelDetails

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
    END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;

	select 
		    ProcessLevel1ID,
			ProcessLevelNodeID as ProcessLevelID, 
			ProcessLevelTitle, 
			ScoreCriteria1, 
			ScoreCriteria2,
			ScoreCriteria3,
			ScoreCriteria4,
			ScoreCriteria5,
			ScoreCriteria6,
			ScoreCriteria7,
			ScoreCriteria8,
			ScoreCriteria9,
			ScoreCriteria10, 
			NodeLevelID, 
			Owner, 
			CountrySpecific, 
			Priority, 
			ProcessLevel 
		FROM #DecompositionProcessLevelDetails
		/*
	UNION ALL

	SELECT 1 as ProcessLevelID, ProcessLevel1Title, NULL as ScoreCriteria1,NULL as ScoreCriteria2,NULL as ScoreCriteria3,NULL as ScoreCriteria4,NULL as ScoreCriteria5,NULL as ScoreCriteria6,NULL as ScoreCriteria7,NULL as ScoreCriteria8,NULL as ScoreCriteria9,NULL as ScoreCriteria10,NULL as NodeLevelID, Owner,null as CountrySpecific,Avg_Score_Weight as Priority, 1 AS ProcessLevel
	FROM [Amplo].[DecompositionProcessLevel1] i 
	inner join [Amplo].[DecompositionProcessLevel1Score] j on i.[DecompositionProcessLevel1ID] = j.[DecompositionProcessLevel1ID]
	WHERE i.DecompositionProjectID = @ProjectID AND i.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID
	*/
--	SELECT * FROM #DecompositionProcessLevelDetails

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeView_Original]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeView_Original]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	WITH DecompositionProcessLevel(ProcessLevelID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2,ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,ScoreCriteria9,ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel) AS
	(

	SELECT i.[DecompositionProcessLevel1ID],[ProcessLevel1Title],NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL, [Owner],NULL,Avg_Score_Weight, 1 AS ProcessLevel
	FROM [Amplo].[DecompositionProcessLevel1] i 
	inner join [Amplo].[DecompositionProcessLevel1Score] j on i.[DecompositionProcessLevel1ID] = j.[DecompositionProcessLevel1ID]
	UNION ALL

	SELECT a.DecompositionProcessLevel2ID, a.ProcessLevel2Title , b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, a.ProcessLevel2NodeID, a.owner, a.CountrySpecific, b.AvgScoreWeightage, 2 AS ProcessLevel
	from Amplo.DecompositionProcessLevel2  a
	inner join Amplo.DecompositionProcessLevel2Score b on a.DecompositionProcessLevel2ID = b.DecompositionProcessLevel2ID
	UNION ALL
	SELECT a.DecompositionProcessLevel3ID, a.ProcessLevel3Title , b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, a.ProcessLevel3NodeID, a.owner, a.CountrySpecific, b.AvgScoreWeightage, 3 AS ProcessLevel
	from Amplo.DecompositionProcessLevel3  a
	inner join Amplo.DecompositionProcessLevel3Score b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
	UNION ALL
	SELECT a.DecompositionProcessLevel4ID, a.ProcessLevel4Title , b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, a.ProcessLevel4NodeID, a.owner, a.CountrySpecific, b.AvgScoreWeightage, 4 AS ProcessLevel
	from Amplo.DecompositionProcessLevel4  a
	inner join Amplo.DecompositionProcessLevel4Score b on a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
	UNION ALL
	SELECT a.DecompositionProcessLevel5ID, a.ProcessLevel5Title , b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, a.ProcessLevel5NodeID, a.owner, a.CountrySpecific, b.AvgScoreWeightage, 5 AS ProcessLevel
	from Amplo.DecompositionProcessLevel5  a
	inner join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
	)

	--if @OrderBy = 2
	--SELECT * from DecompositionProcessLevel order by DecompositionProcessLevel2ID
	--else if @OrderBy = 3
	--SELECT * from DecompositionProcessLevel order by DecompositionProcessLevel3ID
	--else if @OrderBy = 4
	--SELECT * from DecompositionProcessLevel order by DecompositionProcessLevel4ID
	
	SELECT * from DecompositionProcessLevel

	/*
	SELECT a.DecompositionProcessLevel2ID, a.DecompositionProcessLevel1ID, 
	b.DecompositionProcessLevel2ScoreID, b.Score_Criteria_1, b.Score_Criteria_2, b.Score_Criteria_3, b.Score_Criteria_4,b.Score_Criteria_5, b.Score_Criteria_6, b.Score_Criteria_7, b.Score_Criteria_8, b.Score_Criteria_9, b.Score_Criteria_10, 
	c.DecompositionProcessLevel3ID, d.DecompositionProcessLevel3ScoreID, d.Score_Criteria_1, d.Score_Criteria_2, d.Score_Criteria_3,d.Score_Criteria_4, d.Score_Criteria_5, d.score_Criteria_6, d.Score_Criteria_7, d.Score_Criteria_8, d.Score_Criteria_9, d.Score_Criteria_10,
	f.DecompositionProcessLevel4ID , f.DecompositionProcessLevel4ScoreID , f.Score_Criteria_1, f.Score_Criteria_2, f.Score_Criteria_3,f.Score_Criteria_4, f.Score_Criteria_5, f.score_Criteria_6, f.Score_Criteria_7, f.Score_Criteria_8, f.Score_Criteria_9, f.Score_Criteria_10,
	h.DecompositionProcessLevel5ID, h.DecompositionProcessLevel5ScoreID, h.Score_Criteria_1, h.Score_Criteria_2, h.Score_Criteria_3,h.Score_Criteria_4, h.Score_Criteria_5, h.score_Criteria_6, h.Score_Criteria_7, h.Score_Criteria_8, h.Score_Criteria_9, h.Score_Criteria_10
	from Amplo.DecompositionProcessLevel2  a
	inner join Amplo.DecompositionProcessLevel2Score b on a.DecompositionProcessLevel2ID = b.DecompositionProcessLevel2ID
	inner join Amplo.DecompositionProcessLevel3 c on b.DecompositionProcessLevel2ID = c.DecompositionProcessLevel3ID
	inner join Amplo.DecompositionProcessLevel3Score d on c.DecompositionProcessLevel2ID = d.DecompositionProcessLevel3ID
	inner join Amplo.DecompositionProcessLevel4 e on e.DecompositionProcessLevel4ID = c.DecompositionProcessLevel3ID
	inner join Amplo.DecompositionProcessLevel4Score f on f.DecompositionProcessLevel4ID = e.DecompositionProcessLevel3ID
	inner join Amplo.DecompositionProcessLevel5 g on g.DecompositionProcessLevel5ID = e.DecompositionProcessLevel4ID
	inner join Amplo.DecompositionProcessLevel5Score h on g.DecompositionProcessLevel5ID = f.DecompositionProcessLevel4ID
	*/


	/*
	
		DECLARE @ProjectID [int]
	DECLARE @ProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[INT]
	DECLARE @ScoreCriteria2	[INT]
	DECLARE @ScoreCriteria3	[INT]
	DECLARE @ScoreCriteria4	[INT]
	DECLARE @ScoreCriteria5	[INT]
	DECLARE @ScoreCriteria6	[INT]
	DECLARE @ScoreCriteria7	[INT]
	DECLARE @ScoreCriteria8	[INT]
	DECLARE @ScoreCriteria9	[INT]
	DECLARE @ScoreCriteria10 [INT]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevel2NodeID [VARCHAR](30)
	DECLARE @ProcessLevel2Title [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]


    -- Insert statements for procedure here
	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 [float], 
		ScoreCriteria2 [float],
		ScoreCriteria3 [float],
		ScoreCriteria4 [float],
		ScoreCriteria5 [float],
		ScoreCriteria6 [float],
		ScoreCriteria7 [float],
		ScoreCriteria8 [float],
		ScoreCriteria9 [float],
		ScoreCriteria10 [float], 
		NodeLevelID [float], 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int]
	  );


	--Process Level1 Cursor

	SET @ProcessLevel1ID = 1
	set @ProjectID = 4
	DECLARE ProcessLevel1List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[ProcessLevel2NodeID],a.[ProcessLevel2Title], a.[Owner], a.[CountrySpecific], a.[LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10 
	FROM Amplo.DecompositionProcessLevel2 a 
    INNER JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel1ID] = b.[DecompositionProcessLevel1ID]
	where a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;

    OPEN ProcessLevel1List;
    FETCH NEXT FROM ProcessLevel1List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
	
	INSERT INTO #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID, 
		ProcessLevel2ID,
		ProcessLevelTitle, 
		ScoreCriteria1, 
		ScoreCriteria2,
		ScoreCriteria3,
		ScoreCriteria4,
		ScoreCriteria5,
		ScoreCriteria6,
		ScoreCriteria7,
		ScoreCriteria8,
		ScoreCriteria9,
		ScoreCriteria10, 
		NodeLevelID, 
		Owner, 
		CountrySpecific, 
		Priority, 
		ProcessLevel)
		VALUES
		(
		@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevel2Title, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, NULL, @Owner, @CountrySpecific, '1', 1
		);

--		SELECT * FROM #DecompositionProcessLevelDetails

--	SELECT 	@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag;
    WHILE @@FETCH_STATUS = 0
    BEGIN
			

			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag] from Amplo.DecompositionProcessLevel3 where DecompositionProjectID = @ProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, 
				ProcessLevel2ID,
				ProcessLevel3ID,
				ProcessLevelTitle, 
				ScoreCriteria1, 
				ScoreCriteria2,
				ScoreCriteria3,
				ScoreCriteria4,
				ScoreCriteria5,
				ScoreCriteria6,
				ScoreCriteria7,
				ScoreCriteria8,
				ScoreCriteria9,
				ScoreCriteria10, 
				NodeLevelID, 
				Owner, 
				CountrySpecific, 
				Priority, 
				ProcessLevel)
				VALUES
				(
				@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevel2Title, NULL, NULL, NULL,NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL,@Owner, @CountrySpecific, '1', 1
				);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [ProcessLevel4NodeID],[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag] from Amplo.DecompositionProcessLevel4 where DecompositionProjectID = @ProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
				VALUES
				(
				@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevel2Title, NULL, NULL, NULL,NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL,@Owner, @CountrySpecific, '1', 1
				);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID],[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag] from Amplo.DecompositionProcessLevel5 where DecompositionProjectID = @ProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID AND [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID AND [DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag

							INSERT INTO #DecompositionProcessLevelDetails
							(
							ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
							VALUES
							(
							@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevel2Title, NULL, NULL, NULL,NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL,@Owner, @CountrySpecific, '1', 1
							);

							SELECT * FROM #DecompositionProcessLevelDetails

							WHILE @@FETCH_STATUS = 0
							BEGIN
							FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;




	
    FETCH NEXT FROM ProcessLevel1List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag
    END;

    CLOSE ProcessLevel1List;
    DEALLOCATE ProcessLevel1List;
	
	*/



END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeViewHeatmap]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeViewHeatmap]
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[INT]
	DECLARE @ScoreCriteria2	[INT]
	DECLARE @ScoreCriteria3	[INT]
	DECLARE @ScoreCriteria4	[INT]
	DECLARE @ScoreCriteria5	[INT]
	DECLARE @ScoreCriteria6	[INT]
	DECLARE @ScoreCriteria7	[INT]
	DECLARE @ScoreCriteria8	[INT]
	DECLARE @ScoreCriteria9	[INT]
	DECLARE @ScoreCriteria10 [INT]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]

    -- Insert statements for procedure here
	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 [float], 
		ScoreCriteria2 [float],
		ScoreCriteria3 [float],
		ScoreCriteria4 [float],
		ScoreCriteria5 [float],
		ScoreCriteria6 [float],
		ScoreCriteria7 [float],
		ScoreCriteria8 [float],
		ScoreCriteria9 [float],
		ScoreCriteria10 [float], 
		NodeLevelID [float], 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int]
		, LeafNodeFlag bit
	  );

	declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	--Process Level2 Cursor

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[ProcessLevel2NodeID],a.[ProcessLevel2Title], a.[Owner], a.[CountrySpecific], a.[LeafNodeFlag], b.[AvgScoreWeightage], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10 
	, ISNULL(a.LeafNodeFlag, 0) 
	FROM Amplo.DecompositionProcessLevel2 a 
    INNER JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID and a.ActiveFlag = 1
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;

    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Level2LeafNodeFlag
	
	INSERT INTO #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
		VALUES
		(
			@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2, @Level2LeafNodeFlag
		);
    WHILE @@FETCH_STATUS = 0
    BEGIN
			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage
			, ISNULL(a.LeafNodeFlag, 0) 
			FROM Amplo.DecompositionProcessLevel3 a
			INNER JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			 and a.ActiveFlag = 1ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level3LeafNodeFlag

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3, @Level3LeafNodeFlag);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage  
			, ISNULL(a.LeafNodeFlag, 0) 
			FROM Amplo.DecompositionProcessLevel4 a
			INNER JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			 and a.ActiveFlag = 1ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level4LeafNodeFlag

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4, @Level4LeafNodeFlag, @ProcessLevelNodeID);

			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage
							, ISNULL(a.LeafNodeFlag, 0) 
							from Amplo.DecompositionProcessLevel5 a
							inner join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.[DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
							 and a.ActiveFlag = 1ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level5LeafNodeFlag

							INSERT INTO #DecompositionProcessLevelDetails
							(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
							VALUES
							(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5, @Level5LeafNodeFlag, @ProcessLevelNodeID);

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level5LeafNodeFlag
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level4LeafNodeFlag
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level3LeafNodeFlag
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Level2LeafNodeFlag
    END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;


		select
			ProcessLevelNodeID as ProcessLevelID,
			ProcessLevelTitle, 
			ScoreCriteria1, 
			ScoreCriteria2,
			ScoreCriteria3,
			ScoreCriteria4,
			ScoreCriteria5,
			ScoreCriteria6,
			ScoreCriteria7,
			ScoreCriteria8,
			ScoreCriteria9,
			ScoreCriteria10, 
			NodeLevelID, 
			Owner, 
			CountrySpecific, 
			Priority, 
			ProcessLevel
			, LeafNodeFlag
		FROM #DecompositionProcessLevelDetails;

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeViewHeatmap_10112019]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeViewHeatmap_10112019]
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[INT]
	DECLARE @ScoreCriteria2	[INT]
	DECLARE @ScoreCriteria3	[INT]
	DECLARE @ScoreCriteria4	[INT]
	DECLARE @ScoreCriteria5	[INT]
	DECLARE @ScoreCriteria6	[INT]
	DECLARE @ScoreCriteria7	[INT]
	DECLARE @ScoreCriteria8	[INT]
	DECLARE @ScoreCriteria9	[INT]
	DECLARE @ScoreCriteria10 [INT]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]

    -- Insert statements for procedure here
	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 [float], 
		ScoreCriteria2 [float],
		ScoreCriteria3 [float],
		ScoreCriteria4 [float],
		ScoreCriteria5 [float],
		ScoreCriteria6 [float],
		ScoreCriteria7 [float],
		ScoreCriteria8 [float],
		ScoreCriteria9 [float],
		ScoreCriteria10 [float], 
		NodeLevelID [float], 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int]
		, LeafNodeFlag bit
	  );

	declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	--Process Level2 Cursor

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[ProcessLevel2NodeID],a.[ProcessLevel2Title], a.[Owner], a.[CountrySpecific], a.[LeafNodeFlag], b.[AvgScoreWeightage], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10 
	, ISNULL(a.LeafNodeFlag, 0) 
	FROM Amplo.DecompositionProcessLevel2 a 
    INNER JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
	AND ActiveFlag = 1 --Added by Srini on 10-November-2019
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;

    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Level2LeafNodeFlag
	
	INSERT INTO #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
		VALUES
		(
			@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2, @Level2LeafNodeFlag
		);
    WHILE @@FETCH_STATUS = 0
    BEGIN
			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage
			, ISNULL(a.LeafNodeFlag, 0) 
			FROM Amplo.DecompositionProcessLevel3 a
			INNER JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			AND ActiveFlag = 1 --Added by Srini on 10-November-2019
			ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level3LeafNodeFlag

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3, @Level3LeafNodeFlag);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage  
			, ISNULL(a.LeafNodeFlag, 0) 
			FROM Amplo.DecompositionProcessLevel4 a
			INNER JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			AND ActiveFlag = 1 --Added by Srini on 10-November-2019
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level4LeafNodeFlag

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4, @Level4LeafNodeFlag, @ProcessLevelNodeID);

			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage
							, ISNULL(a.LeafNodeFlag, 0) 
							from Amplo.DecompositionProcessLevel5 a
							inner join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.[DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
--							AND ActiveFlag = 1 --Added by Srini on 10-November-2019
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level5LeafNodeFlag

							INSERT INTO #DecompositionProcessLevelDetails
							(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
							VALUES
							(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5, @Level5LeafNodeFlag, @ProcessLevelNodeID);

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level5LeafNodeFlag
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level4LeafNodeFlag
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level3LeafNodeFlag
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Level2LeafNodeFlag
    END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;


		select
			ProcessLevelNodeID as ProcessLevelID,
			ProcessLevelTitle, 
			ScoreCriteria1, 
			ScoreCriteria2,
			ScoreCriteria3,
			ScoreCriteria4,
			ScoreCriteria5,
			ScoreCriteria6,
			ScoreCriteria7,
			ScoreCriteria8,
			ScoreCriteria9,
			ScoreCriteria10, 
			NodeLevelID, 
			Owner, 
			CountrySpecific, 
			Priority, 
			ProcessLevel
			, LeafNodeFlag
		FROM #DecompositionProcessLevelDetails;

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeViewHeatMapScores]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeViewHeatMapScores]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN

	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT

	DECLARE @PProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]
	DECLARE @TotalAvgScore [float]
	DECLARE @TotalAvgScore1 [float]
	DECLARE @TotalAvgScore2 [float]
	DECLARE @TotalAvgScore3 [float]
	DECLARE @TotalAvgScore4 [float]
	DECLARE @TotalAvgScore5 [float]


	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[float]
	DECLARE @ScoreCriteria2	[float]
	DECLARE @ScoreCriteria3	[float]
	DECLARE @ScoreCriteria4	[float]
	DECLARE @ScoreCriteria5	[float]
	DECLARE @ScoreCriteria6	[float]
	DECLARE @ScoreCriteria7	[float]
	DECLARE @ScoreCriteria8	[float]
	DECLARE @ScoreCriteria9	[float]
	DECLARE @ScoreCriteria10 [float]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]
	DECLARE @ScoreCriteriaUsedCount [int]

	SET @ScoreCriteria1	= 0.00
	SET @ScoreCriteria2	= 0.00
	SET @ScoreCriteria3	= 0.00
	SET @ScoreCriteria4 = 0.00
	SET @ScoreCriteria5	= 0.00
	SET @ScoreCriteria6	= 0.00
	SET @ScoreCriteria7	= 0.00
	SET @ScoreCriteria8	= 0.00
	SET @ScoreCriteria9	= 0.00
	SET @ScoreCriteria10 = 0.00

	SET @TotalAvgScore1 = -1
	SET @TotalAvgScore2 = -1
	SET @TotalAvgScore3 = -1
	SET @TotalAvgScore4 = -1
	SET @TotalAvgScore5  = 0
	SET @ScoreCriteriaUsedCount = 0


	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 [float], 
		ScoreCriteria2 [float],
		ScoreCriteria3 [float],
		ScoreCriteria4 [float],
		ScoreCriteria5 [float],
		ScoreCriteria6 [float],
		ScoreCriteria7 [float],
		ScoreCriteria8 [float],
		ScoreCriteria9 [float],
		ScoreCriteria10 [float], 
		NodeLevelID [varchar](100), 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int],
		TotalAvgScore numeric(10, 2),
		TotalAvgScore1  numeric(10, 2),
		TotalAvgScore2  numeric(10, 2),
		TotalAvgScore3  numeric(10, 2),
		TotalAvgScore4  numeric(10, 2),
		TotalAvgScore5  numeric(10, 2)
		, LeafNodeFlag bit
	  );
	  declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	  declare @Status as int = 0
--Process Level1 Cursor

	SELECT top 1 @Status = a.[Status], @PProcessLevel1ID = a.[DecompositionProcessLevel1ID], @ProcessLevelTitle=[ProcessLevel1Title], @Owner=[Owner], @AvgScoreWeightage = ISNULL([Avg_Score_Weight],2.00) FROM Amplo.DecompositionProcessLevel1 a
	INNER JOIN Amplo.DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID and a.ActiveFlag = 1
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;
	INSERT INTO #DecompositionProcessLevelDetails
	(
		ProcessLevel1ID, ProcessLevelTitle, Owner, Priority, ProcessLevel, LeafNodeFlag, TotalAvgScore1
	)
	VALUES
	(
		@ProcessLevel1ID, @ProcessLevelTitle, @Owner, @AvgScoreWeightage, 1, 0, -1
	)


	SELECT @ScoreCriteriaUsedCount = COUNT(1) FROM Amplo.DecompositionScoreCriteriaProject WHERE DecompositionProjectID = @ProjectID AND DecompositionProcessLevel1ID= @ProcessLevel1ID AND USEDFLAG=1;
	--select @ScoreCriteriaUsedCount as ScoreCriteriaUsedCount

	--Process Level2 Cursor

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT 
	a.[DecompositionProcessLevel1ID], 
	a.[DecompositionProcessLevel2ID], 
	a.[ProcessLevel2NodeID],
	a.[ProcessLevel2Title], 
	a.[Owner], 
	a.[CountrySpecific], 
	a.[LeafNodeFlag], 
	ISNULL(b.[AvgScoreWeightage],2.00), 
	ISNULL(b.ScoreCriteria1, 0.00), 
	ISNULL(b.ScoreCriteria2,0.00), 
	ISNULL(b.ScoreCriteria3,0.00), 
	ISNULL(b.ScoreCriteria4,0.00),
	ISNULL(b.ScoreCriteria5,0.00), 
	ISNULL(b.ScoreCriteria6,0.00), 
	ISNULL(b.ScoreCriteria7,0.00), 
	ISNULL(b.ScoreCriteria8,0.00), 
	ISNULL(b.ScoreCriteria9,0.00), 
	ISNULL(b.ScoreCriteria10,0.00),
	(case when a.[LeafNodeFlag] = 0 then CAST(-1 as numeric(10, 2)) else ((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) end) AS TotalAvgScore
	FROM Amplo.DecompositionProcessLevel2 a 
    left outer JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID and a.ActiveFlag = 1
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
	, @TotalAvgScore2

    WHILE @@FETCH_STATUS = 0
    BEGIN
			
		INSERT INTO #DecompositionProcessLevelDetails
		(
			TotalAvgScore2, ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific,
 Priority, ProcessLevel, LeafNodeFlag)
			VALUES
			(
				@TotalAvgScore2, @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2, ISNULL(@LeafNodeFlag, 0)
			);


			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)
			, (case when a.[LeafNodeFlag] = 0 then CAST(-1 as numeric(10, 2)) else ((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) end) AS TotalAvgScore
			FROM Amplo.DecompositionProcessLevel3 a
			left outer JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			 and a.ActiveFlag = 1ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore3

			WHILE @@FETCH_STATUS = 0
			BEGIN

			INSERT INTO #DecompositionProcessLevelDetails
			(
				TotalAvgScore3, ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
				VALUES
				(@TotalAvgScore3, @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3, ISNULL(@LeafNodeFlag, 0));

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)  
			, (case when a.[LeafNodeFlag] = 0 then CAST(-1 as numeric(10, 2)) else ((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) end) AS TotalAvgScore
			FROM Amplo.DecompositionProcessLevel4 a
			left outer JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			 and a.ActiveFlag = 1
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore4
			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
			INSERT INTO #DecompositionProcessLevelDetails
			(
				TotalAvgScore4, ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
				VALUES
				(@TotalAvgScore4, @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4, ISNULL(@LeafNodeFlag, 0), @ProcessLevelNodeID);
							
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage,
							((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) AS TotalAvgScore
							from Amplo.DecompositionProcessLevel5 a
							left outer join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID AND a.[DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
							 and a.ActiveFlag = 1 --Added by Srini on 10-November-2019
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @TotalAvgScore5

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9
								, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, TotalAvgScore5, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, '', @TotalAvgScore5, 5, ISNULL(@LeafNodeFlag, 0), @ProcessLevelNodeID);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @TotalAvgScore5
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore4
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore3
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
    , @TotalAvgScore2
	END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;

   CREATE INDEX IX_ProcessLevelID ON #DecompositionProcessLevelDetails (ProcessLevel1ID, ProcessLevel2ID,ProcessLevel3ID,ProcessLevel4ID,ProcessLevel5ID);

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = ISNULL(TotalAvgScore4, 0) + ISNULL(TotalAvgScore5, 0.00) --+ 1
   where ISNULL(TotalAvgScore4, 0) = -1 or TotalAvgScore4 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = ISNULL(TotalAvgScore3, 0) + ISNULL(TotalAvgScore4, 0.00) --+ 1
   where ISNULL(TotalAvgScore3, 0) = -1 or TotalAvgScore3 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = ISNULL(TotalAvgScore2, 0) + ISNULL(TotalAvgScore3, 0.00) --+ 1
   where ISNULL(TotalAvgScore2, 0) = -1 or TotalAvgScore2 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = ISNULL(TotalAvgScore1, 0) + ISNULL(TotalAvgScore2, 0.00) --+ 1
   where ISNULL(TotalAvgScore1, 0) = -1 or TotalAvgScore1 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = 0
   where ISNULL(TotalAvgScore4, 0) = -1 or TotalAvgScore4 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = 0
   where ISNULL(TotalAvgScore3, 0) = -1 or TotalAvgScore3 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = 0
   where ISNULL(TotalAvgScore2, 0) = -1 or TotalAvgScore2 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = 0
   where ISNULL(TotalAvgScore1, 0) = -1 or TotalAvgScore1 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore4) / Count(TotalAvgScore4) score, ProcessLevel4Id from #DecompositionProcessLevelDetails where LeafNodeFlag = 1 group by ProcessLevel4Id) grp
   on grp.ProcessLevel4Id = main.ProcessLevel4Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore4) / Count(TotalAvgScore4) score, ProcessLevel3Id from #DecompositionProcessLevelDetails where ProcessLevel = 4 group by ProcessLevel3Id) grp
   on grp.ProcessLevel3Id = main.ProcessLevel3Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore3) / Count(TotalAvgScore3) score, ProcessLevel2Id from #DecompositionProcessLevelDetails where ProcessLevel = 3 group by ProcessLevel2Id) grp
   on grp.ProcessLevel2Id = main.ProcessLevel2Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore2) / Count(TotalAvgScore2) score, ProcessLevel1Id from #DecompositionProcessLevelDetails where ProcessLevel = 2 group by ProcessLevel1Id) grp
   on grp.ProcessLevel1Id = main.ProcessLevel1Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = 4.6 where (TotalAvgScore1 > 5 or TotalAvgScore1 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = 4.6 where (TotalAvgScore2 > 5 or TotalAvgScore2 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = 4.6 where (TotalAvgScore3 > 5 or TotalAvgScore3 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = 4.6 where (TotalAvgScore4 > 5 or TotalAvgScore4 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore5 = 4.6 where (TotalAvgScore5 > 5 or TotalAvgScore5 < 0)

	select 
			ProcessLevel1ID,
			ProcessLevel2ID,
			ProcessLevel3ID,
			ProcessLevel4ID,
			ProcessLevel5ID,
			ProcessLevelNodeID as ProcessLevelID, 
			ProcessLevelTitle, 
			ScoreCriteria1, 
			ScoreCriteria2,
			ScoreCriteria3,
			ScoreCriteria4,
			ScoreCriteria5,
			ScoreCriteria6,
			ScoreCriteria7,
			ScoreCriteria8,
			ScoreCriteria9,
			ScoreCriteria10, 
			NodeLevelID, 
			Owner, 
			CountrySpecific, 
			Priority, 
			TotalAvgScore,
			TotalAvgScore1,
			TotalAvgScore2,
			TotalAvgScore3,
			TotalAvgScore4,
			TotalAvgScore5,
			ProcessLevel,
			LeafNodeFlag,
			@Status [Status]
		FROM #DecompositionProcessLevelDetails

	DROP TABLE if exists #DecompositionProcessLevelDetails;

    COMMIT TRANSACTION;
	RETURN 0;
    END TRY
    BEGIN CATCH
	select Error_Message()
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeViewHeatMapScores_28102019]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeViewHeatMapScores_28102019] AS
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeViewHeatMapScoresCalculation]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ======================================================================================================================================================
-- Author:      Srinivas
-- Create Date: 25-October-2019
-- Description: This procedure retrieves capability modelling treeview
-- ======================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeViewHeatMapScoresCalculation]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]

--	<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN

	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

--	DECLARE @PROJECTID [int]

	DECLARE @PProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]
	DECLARE @TotalAvgScore [float]
	DECLARE @TotalAvgScore1 [float]
	DECLARE @TotalAvgScore2 [float]
	DECLARE @TotalAvgScore3 [float]
	DECLARE @TotalAvgScore4 [float]
	DECLARE @TotalAvgScore5 [float]


	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[float]
	DECLARE @ScoreCriteria2	[float]
	DECLARE @ScoreCriteria3	[float]
	DECLARE @ScoreCriteria4	[float]
	DECLARE @ScoreCriteria5	[float]
	DECLARE @ScoreCriteria6	[float]
	DECLARE @ScoreCriteria7	[float]
	DECLARE @ScoreCriteria8	[float]
	DECLARE @ScoreCriteria9	[float]
	DECLARE @ScoreCriteria10 [float]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]
	DECLARE @ScoreCriteriaUsedCount [int]

	SET @ScoreCriteria1	= 0.00
	SET @ScoreCriteria2	= 0.00
	SET @ScoreCriteria3	= 0.00
	SET @ScoreCriteria4 = 0.00
	SET @ScoreCriteria5	= 0.00
	SET @ScoreCriteria6	= 0.00
	SET @ScoreCriteria7	= 0.00
	SET @ScoreCriteria8	= 0.00
	SET @ScoreCriteria9	= 0.00
	SET @ScoreCriteria10 = 0.00
	SET @ScoreCriteriaUsedCount = 7
	SET @DecompositionProcessLevel1ID = 6
	SET @ProjectID = 4

	SET @TotalAvgScore1 = 4.5
	SET @TotalAvgScore2 = 2.7
	SET @TotalAvgScore3 = 3.8
	SET @TotalAvgScore4 = 1.5
	SET @TotalAvgScore5  = 4.6
	SET @ScoreCriteriaUsedCount = 0

--select * from Amplo.DecompositionProcessLevel5;
--select * from Amplo.Decompositionprocesslevel5score;
--select (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
--from Amplo.Decompositionprocesslevel5score
--

--select (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from 
--						Amplo.DecompositionProcessLevel5Score a inner join Amplo.DecompositionProcessLevel5 b 
--						on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID and b.DecompositionProcessLevel1ID = 6


		select @ScoreCriteriaUsedCount = count([UsedFlag]) from Amplo.DecompositionScoreCriteriaProject where [UsedFlag] = 1

		UPDATE Amplo.DecompositionProcessLevel5Score
		SET Level5CalcAggrScore = (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
		where DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID

--DecompositionProcessLevel4Score

		DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
		FOR
		SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
		ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)  
		FROM Amplo.DecompositionProcessLevel4 a
		INNER JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
		WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
		ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

		OPEN ProcessLeveL4List;
		FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

		WHILE @@FETCH_STATUS = 0
		BEGIN
			if @LeafNodeFlag = 1

				Begin

					SELECT  'leafnode flag 1'
					SELECT @DecompositionProcessLevel4ID
					

					
					select @TotalAvgScore4 = (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
					from Amplo.DecompositionProcessLevel4Score a inner join Amplo.DecompositionProcessLevel4 b on a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
					and b.DecompositionProcessLevel4ID = @DecompositionProcessLevel4ID;
					
					select @TotalAvgScore4

					UPDATE Amplo.DecompositionProcessLevel4Score
					set Level4CalcAggrScore = @TotalAvgScore4 
					where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID

				end

			else if @LeafNodeFlag = 0
				
					begin

						SELECT 'leafnode flag 0'
						select @DecompositionProcessLevel4ID

						select @TotalAvgScore4 = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from 
						Amplo.DecompositionProcessLevel5Score a inner join Amplo.DecompositionProcessLevel5 b 
						on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID and b.DecompositionProcessLevel4ID = @DecompositionProcessLevel4ID and b.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID
						--where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
						GROUP BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel4ID]

						select @TotalAvgScore4

						update Amplo.DecompositionProcessLevel4Score
						set Level4CalcAggrScore = @TotalAvgScore4 
						where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID

					end


--					select @TotalAvgScore4 as TotalAvgScore4

					--SELECT @ProcessLevel2AverageScore = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10]) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from Amplo.DecompositionProcessLevel2Score
					--where [DecompositionProcessLevel1ID] = @ProcessLevel2ID
					--GROUP BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID]

		FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
		END;

		CLOSE ProcessLeveL4List;

		DEALLOCATE ProcessLevel4List;




--Process Level3

			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)
			FROM Amplo.DecompositionProcessLevel3 a
			INNER JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

			WHILE @@FETCH_STATUS = 0
			BEGIN


			if @LeafNodeFlag = 1

				Begin

					SELECT  'leafnode flag 1'
					SELECT @DecompositionProcessLevel4ID
					

					select @TotalAvgScore3 = (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
					from Amplo.DecompositionProcessLevel3Score a inner join Amplo.DecompositionProcessLevel3 b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
					and b.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID;
										select @TotalAvgScore3

					UPDATE Amplo.DecompositionProcessLevel3Score
					set Level3CalcAggrScore = @TotalAvgScore3 
					where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID

				end

			else if @LeafNodeFlag = 0
				
					begin

						SELECT 'leafnode flag 0'
						select @DecompositionProcessLevel3ID

						select @TotalAvgScore3 = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from 
						Amplo.DecompositionProcessLevel4Score a inner join Amplo.DecompositionProcessLevel4 b 
						on a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID and b.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID and b.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID
						--where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
						GROUP BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel4ID]

						select @TotalAvgScore3

						update Amplo.DecompositionProcessLevel3Score
						set Level3CalcAggrScore = @TotalAvgScore3 
						where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID

					end



			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT 
	a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], 
	a.[ProcessLevel2NodeID],
	a.[ProcessLevel2Title], 
	a.[Owner], 
	a.[CountrySpecific], 
	a.[LeafNodeFlag], 
	ISNULL(b.[AvgScoreWeightage],2.00), 
	ISNULL(b.ScoreCriteria1, 0.00), 
	ISNULL(b.ScoreCriteria2,0.00), 
	ISNULL(b.ScoreCriteria3,0.00), 
	ISNULL(b.ScoreCriteria4,0.00),
	ISNULL(b.ScoreCriteria5,0.00), 
	ISNULL(b.ScoreCriteria6,0.00), 
	ISNULL(b.ScoreCriteria7,0.00), 
	ISNULL(b.ScoreCriteria8,0.00), 
	ISNULL(b.ScoreCriteria9,0.00), 
	ISNULL(b.ScoreCriteria10,0.00) 
	FROM Amplo.DecompositionProcessLevel2 a 
    INNER JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10

    WHILE @@FETCH_STATUS = 0
    BEGIN

    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
    END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;

			if @LeafNodeFlag = 1

				Begin

					SELECT  'leafnode flag 1'
					SELECT @DecompositionProcessLevel3ID
					

					select @TotalAvgScore2 = (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
					from Amplo.DecompositionProcessLevel2Score a inner join Amplo.DecompositionProcessLevel4 b on a.DecompositionProcessLevel2ID = b.DecompositionProcessLevel2ID
					and b.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID;
					
					select @TotalAvgScore2

					UPDATE Amplo.DecompositionProcessLevel2Score
--					select * from Amplo.DecompositionProcessLevel2Score
					set LVL2CalcAggrScore = @TotalAvgScore2 
					where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID

				end

			else if @LeafNodeFlag = 0
				
					begin

						SELECT 'leafnode flag 0'
						select @DecompositionProcessLevel2ID

						select @TotalAvgScore2 = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from 
						Amplo.DecompositionProcessLevel3Score a inner join Amplo.DecompositionProcessLevel3 b 
						on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID and b.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and b.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID
						--where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
						GROUP BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID]

						select @TotalAvgScore2

						update Amplo.DecompositionProcessLevel2Score
						set LVL2CalcAggrScore = @TotalAvgScore2 
						where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID

					end

		    COMMIT TRANSACTION;
	RETURN 0;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeViewProcessLevel]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ===========================================================================================================================================================
-- Author:		Srinivas
-- Create date: 14-October-2019
-- Description:	This procedure retrieves all the Decomposition Process Level1 treeview details
-- ===========================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeViewProcessLevel]
	-- Add the parameters for the stored procedure here
	@ProjectID [int]
   ,@UserID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]
	
    -- Insert statements for procedure here


	--Process Level1 Cursor
	DECLARE @ProcessLevel1ID [int]
	SET @ProcessLevel1ID = 1
	DECLARE ProcessLevel1List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT DecompositionProcessLevel1ID from Amplo.DecompositionProcessLevel1 where DecompositionProjectID = @ProjectID
    ORDER BY DecompositionProcessLevel1ID Asc;

    OPEN ProcessLevel1List;
    FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;

    WHILE @@FETCH_STATUS = 0
    BEGIN

		-- Process Level2 Cursor
		DECLARE ProcessLevel2List CURSOR FAST_FORWARD READ_ONLY
		FOR
		SELECT DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where DecompositionProcessLevel1ID = @ProcessLevel1ID
		ORDER BY DecompositionProcessLevel2ID Asc;

		OPEN ProcessLevel2List;
		FETCH NEXT FROM ProcessLevel2List INTO @ProcessLevel2ID;

		WHILE @@FETCH_STATUS = 0
/*
		BEGIN

		if nodeflag = 0

			begin


			SELECT @ProcessLevel2AverageScore = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10]) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from Amplo.DecompositionProcessLevel2Score
			where [DecompositionProcessLevel1ID] = @ProcessLevel2ID
			GROUP BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID]
			end;
		else
			begin
				DECLARE ProcessLevel2List CURSOR FAST_FORWARD READ_ONLY
				FOR
				SELECT DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where DecompositionProcessLevel1ID = @ProcessLevel1ID
				ORDER BY DecompositionProcessLevel2ID Asc;

				OPEN ProcessLevel2List;
				FETCH NEXT FROM ProcessLevel2List INTO @ProcessLevel2ID;

				WHILE @@FETCH_STATUS = 0
				BEGIN

					SELECT @ProcessLevel2AverageScore = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10]) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from Amplo.DecompositionProcessLevel2Score
					where [DecompositionProcessLevel1ID] = @ProcessLevel2ID
					GROUP BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID]
		
				FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;
				END;

		end;


		FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;
		END;

*/
    FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;
    END;

    CLOSE ProcessLevel1List;
    DEALLOCATE ProcessLevel1List;


END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionUserProjects]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionUserProjects]
 (
    @UserID [int]
 )
AS
BEGIN
/*
@UserID - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   select Distinct proj.DecompositionProjectID, proj.ProjectName, stat.StatusID, stat.StatusName
   from (select DecompositionProjectID from Amplo.DecompositionProjectUser where UserID = @UserID and ActiveFlag = 1) projUser ---get projects of user
   inner join (select DecompositionProjectID,ProjectName, StatusID from Amplo.DecompositionProject where (DisableDate > GETDATE() OR DisableDate is null) and ActiveFlag = 1) proj -- get project details. Check for disable based on date. Not returning disabled projects by disable date
   ON proj.DecompositionProjectID = projUser.DecompositionProjectID
   inner join Amplo.DecompositionStatus stat on stat.StatusID = proj.[StatusID]


    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseDIVATeam]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	This procedure retrieves Enterprise DIVA users
-- =====================================================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseDIVATeam]
	-- Add the parameters for the stored procedure here
	@UserID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	DECLARE @ClientID int
	select @ClientID = ClientID FROM [Amplo].[User] where UserID = @UseriD;

	SELECT [UserDIVATeamID]
		,[FirstName]
		,[LastName]
		,[Email]
		,[DisableDate]
		,c.[UserTypeName]
	FROM [Amplo].[UserDIVATeam] a
	inner join Amplo.StatusLookup b on a.UserStatusID = b.StatusLookupID
	inner join Amplo.UserType c on a.UserTypeID = c.UserTypeID
	where a.ClientID = @ClientID and a.SuperUserID = @UserID
	order by a.CreatedDate desc, a.ModifiedDate desc;



END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseUserPasswordQuestionResponses]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 23-October-2019
-- Description:	This procedure retrieves Password Security Questions and Answer details for an Enterprise User
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseUserPasswordQuestionResponses]
	-- Add the parameters for the stored procedure here
	@UserID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT a.[PasswordQuestionID] 
      ,a.[PasswordQuestion]
	  ,c.PasswordAnswer
  FROM [Amplo].[PasswordQuestion] a 
  left join (select a.PasswordQuestionID, a.PasswordAnswer from Amplo.Password a
  where a.ModifiedOn = (select max(ModifiedOn) from Amplo.Password c where a.PasswordQuestionID = c.PasswordQuestionID)
  ) c
  on a.[PasswordQuestionID] = c.[PasswordQuestionID]
  where a.ActiveFlag = 1;


END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseUserPasswordResponses]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 23-October-2019
-- Description:	This procedure retrieves Password Security Questions and Answer details for an Enterprise User
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseUserPasswordResponses]
	-- Add the parameters for the stored procedure here
	@UserID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT a.[PasswordQuestionID] 
      ,a.[PasswordQuestion]
	  ,c.PasswordAnswer
  FROM [Amplo].[PasswordQuestion] a 
  left join (select a.PasswordQuestionID, a.PasswordAnswer from Amplo.Password a
  where a.ModifiedOn = (select max(ModifiedOn) from Amplo.Password c where a.PasswordQuestionID = c.PasswordQuestionID)
  ) c
  on a.[PasswordQuestionID] = c.[PasswordQuestionID]
  where a.ActiveFlag = 1;


END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseUserProfileDetails]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 22-October-2019
-- Description:	This procedure retrieves User Profile details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseUserProfileDetails]
	-- Add the parameters for the stored procedure here
	@UserID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   -- Insert statements for procedure here
	SELECT a.[UserID]
		  ,a.[FirstName]
		  ,a.[MiddleName]
		  ,a.[LastName]
		  ,b.[ClientBusinessUnit]
		  ,b.[ClientParentCompany]
		  ,a.[PhoneNumber]
		  ,a.[EmailAddress]
		  ,a.[UserLinkedINProfileID]
		  ,a.[DisableDate]
		  ,a.[UserCreatedDate]
		  ,a.[ProfilePhotoPath]
		  ,c.[UserTypeName]
	FROM [Amplo].[User] a 
	INNER JOIN [Amplo].[Client] b
		on a.ClientiD = b.ClientID
	INNER JOIN [Amplo].[UserType] c
	on a.UserTypeID = c.UserTypeID
	where UserID=@UserID
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseUserTypes]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =======================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	This procedure retireves Enterprise User Types
-- =======================================================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseUserTypes]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [UserTypeID]
		  ,[UserTypeName]
		  , UserTypeIsEnabled
	  FROM [Amplo].[UserType]
	  where [UserTypeIsEnabled] = 'Yes' and [UserCategoryID] = 1

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEntperpriseDIVATeam]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	This procedure retrieves Enterprise DIVA users
-- =====================================================================
CREATE PROCEDURE [Amplo].[uspGetEntperpriseDIVATeam]
	-- Add the parameters for the stored procedure here
	@UserID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	DECLARE @ClientID int
	select @ClientID = ClientID FROM [Amplo].[User] where UserID = @UseriD;

	SELECT [UserDIVATeamID]
		,[FirstName]
		,[LastName]
		,[Email]
		,[DisableDate]
		,c.[UserTypeName]
	FROM [Amplo].[UserDIVATeam] a
	inner join Amplo.StatusLookup b on a.UserStatusID = b.StatusLookupID
	inner join Amplo.UserType c on a.UserTypeID = c.UserTypeID
	where a.ClientID = @ClientID and a.SuperUserID = @UserID order by a.CreatedDate desc, a.ModifiedDate desc;



END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEntperpriseDIVAUserDetails]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================================
-- Author:		Srinivas
-- Create date: 11-Oct-2019
-- Description:	This procedure retrieves Selected Enterprise DIVA user details
-- =====================================================================
CREATE PROCEDURE [Amplo].[uspGetEntperpriseDIVAUserDetails]
	-- Add the parameters for the stored procedure here
--	@UserID [int],
	@DIVAUserID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	SELECT [UserDIVATeamID]
		,[FirstName]
		,[LastName]
		,[Email]
		,[DisableDate]
		,a.UserTypeID
		,c.[UserTypeName]
		,a.UserStatusID
		,b.LookupTitle
	FROM [Amplo].[UserDIVATeam] a
	inner join Amplo.StatusLookup b on a.UserStatusID = b.StatusLookupID
	inner join Amplo.UserType c on a.UserTypeID = c.UserTypeID
	where a.UserDIVATeamID = @DIVAUserID;



END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetGettingStartedVideos]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetGettingStartedVideos]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [GettingStartedVideosID]
      ,[ClientID]
      ,[GettingStartedVideosName]
      ,[GettingStartedVideosDescription]
      ,[GettingStartedVideosDate]
      ,[GettingStartedVideosURLPath]
      ,[GettingStartedVideossource]
      ,[GettingStartedVideosCategory]
      ,[GettingStartedVideosDigitalAsset]
  FROM [Amplo].[GettingStartedVideos]
--  where [ClientID] = @ClientID
  Order by [GettingStartedVideosDate] desc;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetIndustry]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 18-Sep-2019
-- Description:	This procedure retrieves Industry Details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetIndustry] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
    SELECT IndustryID, IndustryName, IndustryDescription from Amplo.Industry order by IndustryName desc;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetIndustrySubVerticals]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 18-Sep-2019
-- Description:	This procedure retrieves Industry Vertical Details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetIndustrySubVerticals] 
	-- Add the parameters for the stored procedure here
    @IndustryVerticalID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


    -- Insert statements for procedure here

    SELECT IndustrySubVerticalID, IndustrySubVerticalName, IndustryVerticalDescription from Amplo.AmploIndustrySubvertical 
    where IndustryVerticalID=@IndustryVerticalID and  ActiveFlag = 1 order by IndustrySubVerticalName desc;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetIndustryVerticalName]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 18-Sep-2019
-- Description:	This procedure retrieves Industry Vertical Details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetIndustryVerticalName] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


    -- Insert statements for procedure here
    SELECT IndustryVerticalID, IndustryVerticalName, IndustryVerticalDescription from Amplo.AmploIndustryVertical 
    where ActiveFlag = 1 order by IndustryVerticalName desc;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetIndustryVerticals]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 18-Sep-2019
-- Description:	This procedure retrieves Industry Vertical Details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetIndustryVerticals] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


    -- Insert statements for procedure here
    SELECT IndustryVerticalID, IndustryVerticalName, IndustryVerticalDescription from Amplo.AmploIndustryVertical 
    where ActiveFlag = 1 order by IndustryVerticalName desc;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetIndustryVerticalSubvertical]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetIndustryVerticalSubvertical]
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
    BEGIN TRANSACTION;
    
    -- Use query to list out all industry types
        
        
        SELECT v.IndustryVerticalID, v.IndustryVerticalName, sv.IndustrySubVerticalID, sv.IndustrySubVerticalName
        FROM (select * from Amplo.AmploIndustryVertical where ActiveFlag = 1) v
        left Join (select * from Amplo.AmploIndustrySubVertical where ActiveFlag = 1) sv
        ON v.IndustryVerticalID = sv.IndustryVerticalID
        order by v.IndustryVerticalID

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;

END;
GO
/****** Object:  StoredProcedure [Amplo].[uspGetIsUserExists]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		uspGetIsUserExists
-- Create date: 21-October-2019
-- Description:	This procedure verified whether the user exists or not
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetIsUserExists]
	-- Add the parameters for the stored procedure here
	@PEmailAddress [nvarchar](256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	BEGIN TRY
    DECLARE @countRowUser int
	DECLARE @RetVal int
	SELECT @countRowUser = Count(*) FROM [Amplo].[User]  WHERE UPPER(TRIM(EmailAddress)) = UPPER(TRIM(@PEmailAddress));
	    
	IF (@countRowUser>0)
        BEGIN
            SELECT @RetVal=1 
		END
	else
		BEGIN
			SELECT @RetVal=0 
		END
	SELECT  @RetVal AS 'iSUserExists'
    END TRY


    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPIControlLeverCapabilityDetailsExpanded]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================
-- Author:		Biswajit
-- Create date: 21-Otober-2019
-- Description:	This procedure retrieves KPI Control Lever details along with Inhibitors and Capabilities 
-- ====================================================================
CREATE PROCEDURE [Amplo].[uspGetKPIControlLeverCapabilityDetailsExpanded]
	-- Add the parameters for the stored procedure here
	@KPIControlLeverID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT a.[KPIControlLeversID] AS 'ControlLeverID' 
		,[KPIID] AS 'KPIID'
		,[ControlLeversTitle] AS 'ControlLeversTitle'
		,[PersonaImpacted] AS 'PersonaImpacted'
		,c.[CapabilitiesTitle] AS 'Capabilities'
		, c.KPICapabilitiesId as 'KPICapabilitiesId'
	FROM [Amplo].[KPIControlLevers] a
	--INNER JOIN (SELECT * FROM [Amplo].[KPIInhibitors] WHERE ActiveFlag=1) b on a.KPIControlLeversID = b.KPIControlLeversID
	INNER JOIN (SELECT * FROM [Amplo].[KPICapabilities] WHERE ActiveFlag=1) c on a.KPIControlLeversID = c.KPIControlLeversID
	WHERE a.KPIControlLeversID = @KPIControlLeverID AND a.[ActiveFlag] = 1
	ORDER BY a.CREATEDDATE ASC
--	FOR JSON AUTO;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPIControlLeverDetails]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetKPIControlLeverDetails] AS
GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPIControlLeverDetailsExpanded]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================
-- Author:		Srinivas
-- Create date: 17-Otober-2019
-- Description:	This procedure retrieves KPI Control Lever details along with Inhibitors and Capabilities 
-- Modified by Biswajit on 22nd Oct, 2019
-- ====================================================================
CREATE PROCEDURE [Amplo].[uspGetKPIControlLeverDetailsExpanded]
	-- Add the parameters for the stored procedure here
	@KPIControlLeverID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

--	Declare @clientid as INT
--    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here

	SELECT a.[KPIControlLeversID] AS 'ControlLeverID' 
		,[KPIID] AS 'KPIID'
		,[ControlLeversTitle] AS 'ControlLeversTitle'
		,[PersonaImpacted] AS 'PersonaImpacted'
		,b.[InhibitorsTitle] AS 'Inhibitors'
		--,c.[CapabilitiesTitle] AS 'Capabilities'
		, b.[KPIInhibitorsId] As 'KPIInhibitorsId'
		--, c.KPICapabilitiesId as 'KPICapabilitiesId'
	FROM [Amplo].[KPIControlLevers] a
	INNER JOIN (SELECT * FROM [Amplo].[KPIInhibitors] WHERE ActiveFlag=1) b on a.KPIControlLeversID = b.KPIControlLeversID
	--INNER JOIN (SELECT * FROM [Amplo].[KPICapabilities] WHERE ActiveFlag=1) c on a.KPIControlLeversID = c.KPIControlLeversID
	WHERE a.KPIControlLeversID = @KPIControlLeverID AND a.[ActiveFlag] = 1
	ORDER BY a.CREATEDDATE ASC
--	FOR JSON AUTO;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPIDetails]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 15-Otober-2019
-- Description:	This procedure retrieves KPI details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetKPIDetails]
	-- Add the parameters for the stored procedure here
	@USERID [int],
	@KPIID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here
	if @KPIID = 0

		SELECT [KPIID]
		,[KPIName] 
		,[KPITitle]
		,[BusinessOutcome]
		,[BusinessMetrics]
		,[PersonaImpacted]
		,[EstimatedSavings]
		,(select count(*) from Amplo.KPIControlLevers b where a.KPIID = b.KPIID and b.ActiveFlag=1) AS ControlLevelCount
		 FROM Amplo.KPI a
		WHERE ClientID = @clientid AND [ActiveFlag] = 1

	else

		SELECT [KPIID]
		,[KPIName] 
		,[KPITitle]
		,[BusinessOutcome]
		,[BusinessMetrics]
		,[PersonaImpacted]
		,[EstimatedSavings]
		,(select count(*) from Amplo.KPIControlLevers b where a.KPIID = b.KPIID and b.ActiveFlag=1) AS ControlLevelCount
		 FROM Amplo.KPI a
		WHERE KPIID = @KPIID AND ClientID = @clientid AND [ActiveFlag] = 1


--	FOR JSON AUTO;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetL1Processes]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetL1Processes]
	@DecompositionProjectId int
	, @Order nvarchar(20)
AS
BEGIN
	BEGIN TRY
		if(@Order = 'desc')
		begin
			select top 5 l1.[DecompositionProcessLevel1ID], [ProcessLevel1Name], [ProcessLevel1Title], [ProcessLevel1Description], ISNULL([Avg_Score_Weight], 0.00) Score, 0
			from [Amplo].[DecompositionProcessLevel1] l1
			left outer join [Amplo].[DecompositionProcessLevel1Score] score on score.[DecompositionProcessLevel1ID] = l1.[DecompositionProcessLevel1ID]
			where l1.[DecompositionProjectID] = @DecompositionProjectId
			order by ISNULL([Avg_Score_Weight], 0.00) desc
		end
		else
		begin
			select top 5 l1.[DecompositionProcessLevel1ID], [ProcessLevel1Name], [ProcessLevel1Title], [ProcessLevel1Description], ISNULL([Avg_Score_Weight], 0.00) Score, 0
			from [Amplo].[DecompositionProcessLevel1] l1
			left outer join [Amplo].[DecompositionProcessLevel1Score] score on score.[DecompositionProcessLevel1ID] = l1.[DecompositionProcessLevel1ID]
			where l1.[DecompositionProjectID] = @DecompositionProjectId
			order by ISNULL([Avg_Score_Weight], 0.00) asc
		end
    END TRY
    BEGIN CATCH
        EXECUTE [AMPLO].[uspLogError];
    END CATCH
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetL1ProcessSummary]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetL1ProcessSummary]
	@DecompositionProjectId int
AS
BEGIN
	SET NOCOUNT ON 
	declare @TempTable table
		(
			FunctionID int NOT NULL
			, FunctionName nvarchar(500)
			, PhaseID int NOT NULL
			, PhaseName nvarchar(500)
			, AverageScore numeric(10, 2) NOT NULL
			, Percentage  numeric(10, 2) NOT NULL
		)
		BEGIN TRY
        

		insert into @TempTable
		select [FunctionID], [FunctionName], [PhaseID], [PhaseName], AVG(ISNULL([Avg_Score_Weight], 0.00)), 0
		from [Amplo].[DecompositionProcessLevel1] l1
		left outer join [Amplo].[DecompositionProcessLevel1Score] score on score.[DecompositionProcessLevel1ID] = l1.[DecompositionProcessLevel1ID]
		join [Amplo].[DecompositionPhase] phase on phase.[DecompositionPhaseID] = l1.[PhaseID]
		join [Amplo].[DecompositionFunction] func on func.[DecompositionFunctionID] = l1.[FunctionID]
		where l1.[DecompositionProjectID] = @DecompositionProjectId
		group by [FunctionID], [PhaseID], [FunctionName], [PhaseName]

		declare @TotalScore numeric(10, 2) = (select SUM(AverageScore) from @TempTable)
		if(@TotalScore != 0)
		begin
			update @TempTable set Percentage = AverageScore * 100 / @TotalScore
		end

		
    END TRY
    BEGIN CATCH
		--select Error_Message()
        --EXECUTE [AMPLO].[uspLogError];
    END CATCH

	select FunctionID, FunctionName, PhaseID, PhaseName, AverageScore, Percentage from @TempTable
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetL1ProcessSummaryForPhaseAndFunctionWise]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetL1ProcessSummaryForPhaseAndFunctionWise]
	@DecompositionProjectId int
AS
BEGIN
	SET NOCOUNT ON 
	create table #TempTable
		(
			Id int Identity(1, 1) primary key
			, FunctionID int NOT NULL
			, FunctionName nvarchar(500)
			, PhaseID int NOT NULL
			, PhaseName nvarchar(500)
			, AverageScore numeric(10, 2) NOT NULL
			, Percentage  numeric(10, 2) NOT NULL
		)

		insert into #TempTable
		select ISNULL([FunctionID], 0) FunctionId, ISNULL([FunctionName], '') FunctionName
		, ISNULL([PhaseID], 0) PhaseId, ISNULL([PhaseName], '') PhaseName, ISNULL(AVG(ISNULL([Avg_Score_Weight], 0.00)), 0) AvgScore
		, Cast(0 as numeric(10, 2)) Percentage
		from [Amplo].[DecompositionProcessLevel1] l1
		left outer join [Amplo].[DecompositionProcessLevel1Score] score on score.[DecompositionProcessLevel1ID] = l1.[DecompositionProcessLevel1ID]
		join [Amplo].[DecompositionPhase] phase on phase.[DecompositionPhaseID] = l1.[PhaseID]
		join [Amplo].[DecompositionFunction] func on func.[DecompositionFunctionID] = l1.[FunctionID]
		where l1.[DecompositionProjectID] = @DecompositionProjectId
		group by [FunctionID], [PhaseID], [FunctionName], [PhaseName]

		--declare @TotalScore numeric(10, 2) = (select SUM(AverageScore) from @TempTable)
		--if(@TotalScore != 0)
		--begin
		--	update @TempTable set Percentage = AverageScore * 100 / @TotalScore
		--end

	select FunctionID, FunctionName, PhaseID, PhaseName, AverageScore, Percentage from #TempTable
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetPasswordQuestion]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetPasswordQuestion]
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all industry types
SELECT [PasswordQuestionID] AS 'QuestionID'
      ,[PasswordQuestion] AS 'QuestionTitle'
  FROM [Amplo].[PasswordQuestion]
  where ActiveFlag = 1;
  
  END;
GO
/****** Object:  StoredProcedure [Amplo].[uspGetRegion]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 26-09-2019
-- Description:	This procedure retrieves Region details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetRegion]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [RegionID]
      ,[RegionName]
FROM [Amplo].[Region]


END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetReports]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 22-October-2019
-- Description:	This procedure retrieves report details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetReports]
	-- Add the parameters for the stored procedure here
	@UserID int,
	@ServiceID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [ReportID]
      ,[ClientID]
      ,[UserID]
      ,[ServiceID]
      ,[ReportTitle]
      ,[ReportDescrption]
      ,[ReportPath]
      ,[ProjectID]
      ,[ActiveFlag]
      ,[CreatedDate]
      ,[CreatedBy]
      ,[ModifiedDate]
      ,[ModifiedBy]
  FROM [Amplo].[Report]
  WHERE  [UserID] = @UserID AND [ServiceID] =@ServiceID
  order by [CreatedDate] desc

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetRestrictedEmailDomain]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetRestrictedEmailDomain]
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all industry types
    SELECT [EmailDomainName] 
    FROM [Amplo].[RestrictedEmailDomain]
    where [ActiveFlag] = 1;
  END;
GO
/****** Object:  StoredProcedure [Amplo].[uspGetServices]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================================================================================
-- Author:		Srinivas
-- Create date: 23-Oct-2019
-- Description:	This procedure retrieves Service details 
-- =====================================================================================================================
CREATE PROCEDURE [Amplo].[uspGetServices]
	-- Add the parameters for the stored procedure here
	@ServiceID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [ServicesID]
      ,[ServicesName]
FROM [Amplo].[Services]
WHERE ServicesID = @ServiceID AND ActiveFlag = 1
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetSpiralReportForDecomposingModel]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspGetSpiralReportForDecomposingModel]
	@DecompositionProjectId int
	, @LevelName as nvarchar(2)
as
begin
	SET NOCOUNT ON 
		declare @TempTable table
		(
			ProcessStatus nvarchar(100)
			, NoOfRows int NOT NULL
			, Percentage  numeric(10, 2) NOT NULL
		)
		BEGIN TRY
		
		DECLARE @ExcelentCutOff as numeric(10, 2) = 4, @GoodCutOff as numeric(10, 2) = 3, @AverageCutOff as numeric(10, 2) = 2
		, @SatisfactoryCutOff as numeric(10, 2) = 1
		declare @TotalRows int = 0

		if(@LevelName = 'l1')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] >= @GoodCutOff and pls.[Level1_Calc_Aggr_Score] < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] >= @AverageCutOff and pls.[Level1_Calc_Aggr_Score] < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] >= @SatisfactoryCutOff and pls.[Level1_Calc_Aggr_Score] < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end

		else if(@LevelName = 'l2')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore >= @GoodCutOff and pls.LVL2CalcAggrScore < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore >= @AverageCutOff and pls.LVL2CalcAggrScore < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore >= @SatisfactoryCutOff and pls.LVL2CalcAggrScore < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end

		else if(@LevelName = 'l3')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore >= @GoodCutOff and pls.Level3CalcAggrScore < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore >= @AverageCutOff and pls.Level3CalcAggrScore < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore >= @SatisfactoryCutOff and pls.Level3CalcAggrScore < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end

		else if(@LevelName = 'l4')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore >= @GoodCutOff and pls.Level4CalcAggrScore < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore >= @AverageCutOff and pls.Level4CalcAggrScore < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore >= @SatisfactoryCutOff and pls.Level4CalcAggrScore < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end

		else if(@LevelName = 'l5')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore >= @GoodCutOff and pls.Level5CalcAggrScore < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore >= @AverageCutOff and pls.Level5CalcAggrScore < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore >= @SatisfactoryCutOff and pls.Level5CalcAggrScore < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end
    END TRY
    BEGIN CATCH
		--select Error_Message()
        EXECUTE [AMPLO].[uspLogError];
    END CATCH

	select ProcessStatus, NoOfRows, Percentage from @TempTable
end
GO
/****** Object:  StoredProcedure [Amplo].[uspGetState]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetState]
@CountryRegionCode nvarchar(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all states

	SELECT [StateProvinceID],
	[StateProvinceCode],
	[CountryRegionCode],
	[Name]
	FROM
	[Amplo].[StateProvince]
	where CountryRegionCode = @CountryRegionCode

END;
GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserAccessTypes]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetUserAccessTypes]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [UserTypeID]
		  ,[UserTypeName]
	  FROM [Amplo].[UserType]
--	  where [UserTypeIsEnabled] = 1 and [UserCategoryID] = 1

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserBMProjects]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetUserBMProjects]
 (
    @id [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   select Distinct (proj.BenchmarkProjectID), proj.BenchmarkProjectName, stat.StatusID, stat.StatusName, proj.CreatedDate
   from (select BenchmarkProjectID from Amplo.BenchmarkProjectUser where UserID = @id and ActiveFlag = 1) projUser ---get projects of user
   inner join (select BenchmarkProjectID,BenchmarkProjectName, [status], CreatedDate from Amplo.BenchmarkProject where (DisableDate > GETDATE() OR DisableDate is null)) proj -- get project details. Check for disable based on date. Not returning disabled projects by disable date
   ON proj.BenchmarkProjectID = projUser.BenchmarkProjectID
   inner join Amplo.BenchmarkStatus stat on stat.StatusID = proj.[status]
   order by proj.CreatedDate desc

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserDetailFromEmail]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspGetUserDetailFromEmail]
@EmailId as nvarchar(256)
as
begin
	select dv.[UserDIVATeamID] UserId, dv.ClientId, ClientName, ClientParentCompany, ClientBusinessUnit
	, dv.FirstName, dv.LastName, dv.Email
	from  [Amplo].[UserDIVATeam] dv
	join [Amplo].[Client] cl on cl.ClientId = dv.ClientId

	where UPPER(dv.Email) = UPPER(@EmailId )
	--and dv.Email not in (select Email from amplo.[User])
end
GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserDomainsForBMProject]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetUserDomainsForBMProject]
 (
    @id [int],
    @projectid [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   select MappedDomains.DomainID, domainDetails.DomianName DomainName, 
   cast((case when (select count(1) from amplo.BenchmarkAuditLog where BenchmarkProjectId = @projectid and DomainId = MappedDomains.DomainId)
   > 0 then 1 else 0 end) as bit) IsAuditLogPresent
   from (select DomainID from Amplo.UserDomainAccess where UserID = @id and BenchmarkProjectID = @projectid And ActiveFlag = 1 ) MappedDomains ---get mapped Domains
   inner join (select DomainID,DomianName from Amplo.AmploDomain) domainDetails -- get Domain Name
   ON MappedDomains.DomainID = domainDetails.DomainID 

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserList]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetUserList]
 (
    @id [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
   Select @clientid = ClientID from Amplo.[User] where UserID = @id

    Select UserID, FirstName, MiddleName, LastName from Amplo.[User] where ClientID = @clientid and EmailValidationStatus = 1 and UserStatusID = 1 and ActiveFlag = 1 and ISNULL(DisableDate, GETDATE() +1) > GETDATE()

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserList2]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetUserList2]
 (
    @id [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    Select UserID, FirstName, MiddleName, LastName from Amplo.[User]

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspIsSecurityQuestionSet]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspIsSecurityQuestionSet]
(
    @PUserName [varchar](100)
)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @count INT
    SELECT @count = COUNT(*) FROM [Password] WHERE UserID = (SELECT userID FROM [User] WHERE UserName = @PUserName)
    IF(@count>0)
    BEGIN
        RETURN 'Security Question is set'
    END
    ELSE
    BEGIN
        RETURN 'Security Question is not set'
    END  
  END;
GO
/****** Object:  StoredProcedure [Amplo].[uspLogError]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- uspLogError logs error information in the ErrorLog table about the 
-- error that caused execution to jump to the CATCH block of a 
-- TRY...CATCH construct. This should be executed from within the scope 
-- of a CATCH block otherwise it will return without inserting error 
-- information. 
CREATE PROCEDURE [Amplo].[uspLogError] 
    @ErrorLogID [int] = 0 OUTPUT -- contains the ErrorLogID of the row inserted
AS                               -- by uspLogError in the ErrorLog table
BEGIN
    SET NOCOUNT ON;

    -- Output parameter value of 0 indicates that error 
    -- information was not logged
    SET @ErrorLogID = 0;

    BEGIN TRY
        -- Return if there is no error information to log
        IF ERROR_NUMBER() IS NULL
            RETURN;

        -- Return if inside an uncommittable transaction.
        -- Data insertion/modification is not allowed when 
        -- a transaction is in an uncommittable state.
        IF XACT_STATE() = -1
        BEGIN
            PRINT 'Cannot log error since the current transaction is in an uncommittable state. ' 
                + 'Rollback the transaction before executing uspLogError in order to successfully log error information.';
            RETURN;
        END

        INSERT [Amplo].[ErrorLog] 
            (
            [UserName], 
            [ErrorNumber], 
            [ErrorSeverity], 
            [ErrorState], 
            [ErrorProcedure], 
            [ErrorLine], 
            [ErrorMessage]
            ) 
        VALUES 
            (
            CONVERT(sysname, CURRENT_USER), 
            ERROR_NUMBER(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_MESSAGE()
            );

        -- Pass back the ErrorLogID of the row inserted
        SET @ErrorLogID = @@IDENTITY;
    END TRY
    BEGIN CATCH
        PRINT 'An error occurred in stored procedure uspLogError: ';
        /*EXECUTE [Amplo].[uspPrintError];*/
        RETURN -1;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [Amplo].[uspLogin]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspLogin]
(
    @PUserName [varchar](100),
    @PPassword [varchar](100)
)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;
    
    DECLARE @userName VARCHAR(100),@pwd VARCHAR(100),@emailValid INT,@status INT,@activeFlag INT,@countUser INT
    SELECT @userName = [UserName] , @pwd = UserPassword,@emailValid = EmailValidationStatus,@status = UserStatusID
     FROM [Amplo].[User] WHERE UserName = @PUserName AND ActiveFlag = 1;
     SELECT @countUser = Count(*) FROM [Amplo].[User] WHERE UserName = @PUserName AND ActiveFlag = 1;
    IF(@countUser>0)
    BEGIN
        IF(@userName != @PUserName OR @pwd != @PPassword)
        BEGIN
            --RETURN 'Wrong UserName or Password';
            SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 4;
        END;
        ELSE IF(@emailValid=0)
        BEGIN
            --RETURN 'Please Verify Email';
            SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 5;
        END
        ELSE IF(@status=2)
        BEGIN
            --RETURN 'Waiting For Admin Approval';
            SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 6;
        END
        ELSE
        BEGIN
            --RETURN 'LOGGED IN';
            SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 7;
        END
    END
    ELSE
    BEGIN
        --RETURN 'No Such User Exists.'
        SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 8;
    END

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;

END;
GO
/****** Object:  StoredProcedure [Amplo].[uspResetPassword]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspResetPassword]
(
    @PUserName [varchar](100),
    @PPassword [varchar](100)
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
    BEGIN TRANSACTION;
  
  
    --reset user Password
    UPDATE Amplo.[User] 
    SET UserPassword = @PPassword WHERE UserName = @PUserName;
  
    if @@ROWCOUNT > 0
    begin
       Select MessageName from Amplo.[Message] where MessageID = 1014
    end
    
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
    

  END;
GO
/****** Object:  StoredProcedure [Amplo].[uspRetrieveCompanyProfile]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspRetrieveCompanyProfile]
 (
    @id int  
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   declare @clientId INT
   select @clientId = ClientID from Amplo.[User] where UserID = @id and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

   declare @companyProfileID INT
   select @companyProfileID = CompanyProfileID from Amplo.AmploCompanyProfile where ClientID = @clientId 

   declare @quesAns TABLE(
       questionID int,
       question varchar(max),
       answerID int,
       answer VARCHAR(max)
   )

--get all questions and answers which have been answered for the questions
   insert into @quesAns
   select ques.QuestionID, ques.Question, ans.ProfilingAnswersID, ans.ProfilingAnswers from
   (select QuestionID, Question from Amplo.AmploProfilingQuestions where ActiveFlag = 1) ques 
   left JOIN 
   (select ProfilingAnswersID, ProfilingAnswers, ProfilingQuestionID from 
		(
		   SELECT *,
				 ROW_NUMBER() OVER (PARTITION BY ProfilingQuestionID ORDER BY CreatedDate DESC) AS rn
		   FROM Amplo.AmploProfilingAnswers where CompanyProfileID = @companyProfileID
		) grp
		WHERE rn = 1) 
   ans on ques.QuestionID = ans.ProfilingQuestionID


   select * from
   (select [CountryRegionCodeID]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[NoOfEmployees]
      ,[Country]
      ,[StateTerritory]
      ,[City]
      ,[PostalCode]
     from Amplo.AmploCompanyProfile where ClientID = @clientId and ActiveFlag = 1) prof
     cross join @quesAns quesAns

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBenchmarkingGoalSetting]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ==============================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	This procedure updates Benchmarking Goal setting details
-- ==============================================================================

CREATE PROCEDURE [Amplo].[uspUpdateBenchmarkingGoalSetting]
 (
    @UserID int,
    @projectid int,
    @domainid int,
--	@IndustryBenchmark float,
--	@ASISBenchmark float,
	@GoalSetting float
)
AS
BEGIN
/*
@UserID - Logged in userID
@projectid - Project for which update is required
@domainid - Domain against which update is required
@IndustryBenchmark - Industry Benchmarking Score
@ASISBenchmark - ASIS Benchmarking Score
@GoalSetting - Goal setting Benchmarking Score
@userIP - User's IP address

QuestionResponse table type -  questionid as int, responseid as int
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID

    BEGIN
    --Update existing responses in table

		UPDATE Amplo.BenchmarkingGoalSetting
		SET [GoalSetting] = @GoalSetting, [ModifedBy] = @UserID, [ModifiedDate]= Getdate()
--		SET [IndustryBenchmark] = @IndustryBenchmark, [GoalSetting] = @GoalSetting, [ASISBenchmark] = @ASISBenchmark, [ModifedBy] = @UserID, [ModifiedDate]= Getdate()
		where ClientID = @clientid and  [BenchmarkProjectID] = @projectid and [DomainID]=@domainid;
		-- Successfull updation of records
		SELECT messageName from Amplo.[Message] where MessageID = 1022

    END

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBenchmarkingProjectLockStatus]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateBenchmarkingProjectLockStatus]
(
    @UserID int,
    @PProjectID int,
    @ProjectLockedFlag bit
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;

		Declare @ClientID as INT
		Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

		   
		UPDATE Amplo.BenchmarkProject 
		SET LockedFlag = @ProjectLockedFlag WHERE ClientID= @ClientID AND BenchmarkProjectID = @PProjectID;

		-- Successfull updation of records
		SELECT messageName from Amplo.[Message] where MessageID = 1029
		

        COMMIT TRANSACTION;

--        if @@ROWCOUNT > 0 
--            select 'Project status has been done successfully';
--        ELSE
--            select 'Project status has not been done successfully';
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;



End;
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBenchmarkiningGoalSetting]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 09-Sep-2019
-- Description:	This procedure retrieves Benchmarking ASIS score, TO Be score and Industry Benchmarking score for reporting purpose
-- =============================================
CREATE PROCEDURE [Amplo].[uspUpdateBenchmarkiningGoalSetting]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT ClientID, BenchmarkProjectID, DomainID, Response, QuestionWeight from Amplo.BenchmarkAssessment;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBMProjectStatus]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateBMProjectStatus]
 (
    @projectid int
 )
AS
BEGIN
/*
@projectid - Project ID to update status of 
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;


--Update status

    Declare @DisabledStatus INT
    select @DisabledStatus = DisabledFlag from Amplo.BenchmarkProject where BenchmarkProjectID = @projectid
    IF @DisabledStatus = 1
    BEGIN
      --  Update Amplo.BenchmarkProject
     --   SET [status] = 6 where BenchmarkProjectID = @projectid 

     --Commented out as now 'Disabled' is not a status of master table but referenced by flag
        SELECT messageName from Amplo.[Message] where MessageID = 1015
        COMMIT
        RETURN
    END


    declare @LockStatus int
    select @LockStatus = LockedFlag from Amplo.BenchmarkProject where BenchmarkProjectID = @projectid

    IF @LockStatus = 1
    BEGIN
     --   Update Amplo.BenchmarkProject
     --   SET [status] = 5 where BenchmarkProjectID = @projectid 

     --Commented out as now 'Locked' is not a status of master table but referenced by flag
        SELECT messageName from Amplo.[Message] where MessageID = 1015
        COMMIT
        RETURN
    END
    
    ELSE 
    BEGIN
       
       ---IF ELSE FOR GOALS SET STATUS

       
        --count of questions in the domain
        declare @countQuestions int
        select @countQuestions = Count(ques.BenchmarkQuestionID) from
        (Select distinct(DomainID) from Amplo.UserDomainAccess where BenchmarkProjectID = @projectid) doms
        inner join Amplo.BenchmarkQuestion ques on doms.DomainID = ques.DomainID

        --count of responses in benchmark assessment
        declare @countResp INT
        select @countResp = Count(BenchmarkAssessmentID) from Amplo.BenchmarkAssessment where BenchmarkProjectID = @projectid and Response is not null
        
        update Amplo.BenchmarkProject
        Set [status]=
        CASE
            when @countResp = @countQuestions THEN 3
            when @countResp = 0 THEN 1
            when @countResp < @countQuestions THEN 2
        END
        where BenchmarkProjectID = @projectid
    END    

    
    -- Successfull updation of records
    SELECT messageName from Amplo.[Message] where MessageID = 1015
    
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    


END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBMQuestionsResponses]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateBMQuestionsResponses]
 (
    @id int,
--    @forSubmission AS Amplo.QuestionResponse READONLY,
    @QuestionID int,
    @ResponseID numeric(5, 2),
    @projectid int,
    @domainid int,
    @userIP varchar(20)
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    declare @username as varchar(100)
    select @username = UserName from Amplo.[User]

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    Declare @regionId as INT
    Declare @benchmarkProjectUserID as INT
    Select @benchmarkProjectUserID = BenchmarkProjectUserID from Amplo.BenchmarkProjectUser where UserID = @id and BenchmarkProjectID = @projectid

    declare @validity INT
    select @validity = COUNT(UserID) from Amplo.UserDomainAccess where UserID = @id and BenchmarkProjectID = @projectid and DomainID = @domainid and ActiveFlag = 1 

    IF @validity = 0
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    Declare @nowTime as DATETIME
    SET @nowTime= GETDATE()

    CREATE TABLE #QuestionResponses
    (
        questionid int,
        responseid numeric(5, 2)
    )

    insert into  #QuestionResponses
    VALUES (@QuestionID, @ResponseID);
	

    CREATE TABLE #QuestionResponse
    (
        questionid int,
        responseid numeric(5, 2)
    )

    insert into #QuestionResponse
    select questionId, responseID
    from #QuestionResponses
    --intersect (Select BenchmarkQuestionID, BenchmarkQuestionOptionID from Amplo.BenchmarkQuestionOption)

    --Update Audit log
    Insert into Amplo.BenchmarkAuditLog(
        [ClientID]
      ,[BenchmarkProjectID]
      ,[DomainID]
      ,[QuestionGroup]
      ,[QuestionSeries]
      ,[QuestionCategory]
      ,[QuestionID]
      ,[Question]
      ,[QuestionWeightage]
      ,[ResponseID]
      ,[Response]
      ,[ResponseUserID]
      ,[ResponseUserName]
      ,[ResponseTimeStamp]
      ,[DesignChoice]
      ,[FirstResponseFlag]
      ,[UserIPAddress]
    )
    select
    @clientid,
    @projectid,
    @domainid,
    ques.QuestionGroup,
    ques.QuestionSeries,
    ques.QuestionCategory,
    a.questionId,
    ques.Question,
    ques.QuestionWeightage,
    a.responseID,
    a.responseID, --opt.OptionName,
    @id,
    @username,
    @nowTime,
    ques.DesignChoice,
    NULL, --To be modified
    @userIP
    from #QuestionResponse a
    inner Join BenchmarkQuestion ques on a.questionId = ques.BenchmarkQuestionID and ques.DomainID = @domainid
    --inner join Amplo.BenchmarkQuestionOption opt on opt.BenchmarkQuestionOptionID = a.responseID
    inner join Amplo.UserDomainAccess userDets on userDets.DomainID = ques.DomainID and userDets.BenchmarkProjectID = @projectid and userDets.UserID=@id and userDets.ActiveFlag = 1

    -- BY default question weightage taken as 1 for all questions

    --Update existing responses in table
    Update Amplo.BenchmarkAssessment
    Set LastResponse = ResponseId, LastResponseBy = @id, LastResponseDate = GETDATE()
    from 
	--Amplo.BenchmarkAssessment BMA inner join 
	#QuestionResponse rcvd 
	--LastResponse = Response, LastResponseBy = RessponseUserID, LastResponseDate = ResponseDate
 --   from 
	--Amplo.BenchmarkAssessment BMA 
	--inner join 
	--#QuestionResponse rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid 
    
    Update Amplo.BenchmarkAssessment
    Set Response = rcvd.responseId, RessponseUserID=@id, ResponseDate = @nowTime, ModifedBy = @id, ModifiedDate = @nowTime 
    from Amplo.BenchmarkAssessment BMA inner join #QuestionResponse rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid 
   

-- Response for these questions do not exist in Assessment table - Insert
    
    --Set as NULL values which are already present in benchmark assessment table
    Update #QuestionResponse
    SET questionId = NULL, responseID = NULL
    from Amplo.BenchmarkAssessment BMA 
    inner join #QuestionResponse rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid
    Insert into Amplo.BenchmarkAssessment(
       [BenchmarkProjectID]
      ,[RegionID]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[DomainID]
      ,[GroupID]
      ,[QuestionID]
      ,[Response]
      ,[RessponseUserID]
      ,[ResponseDate]
      ,[LastResponse]
      ,[LastResponseBy]
      ,[LastResponseDate]
      ,[ResponseComments]
      ,[QuestionWeight]
      ,[BenchMark]
      ,[CreadedBy]
      ,[CreatedOn]
      ,[ModifedBy]
      ,[ModifiedDate]
    )
    Select 
        @projectid,
        @regionId,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
        @domainid,
        NULL,
        questionId,
        responseID,
        @id,
        @nowTime,
        NULL,
        NULL,
        NULL,
        NULL,
        1,
        NULL,
        @id,
        @nowTime,
        NULL,
        NULL
    from (select * from #QuestionResponse where questionId IS NOT NULL and responseID IS NOT NULL) ques
    inner join Amplo.BenchmarkQuestion domFilter on domFilter.BenchmarkQuestionID = ques.questionId and domFilter.DomainID = @domainid 
    inner join Amplo.UserDomainAccess userDets on userDets.DomainID = domFilter.DomainID and userDets.BenchmarkProjectID = @projectid and userDets.UserID=@id and userDets.ActiveFlag = 1 

	update Amplo.BenchmarkingGoalSetting
	set ASISBenchmark = (select AVG(response) from Amplo.BenchmarkAssessment
	where BenchmarkProjectID = @projectid and DomainID=@domainid group by DomainID)
	where BenchmarkProjectID = @projectid and DomainID = @domainid


-- Successfull updation of records
    SELECT messageName from Amplo.[Message] where MessageID = 1015

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
    


END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBMQuestionsResponses_15112019]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateBMQuestionsResponses_15112019]
 (
    @id int,
--    @forSubmission AS Amplo.QuestionResponse READONLY,
    @QuestionID int,
    @ResponseID numeric(5, 2),
    @projectid int,
    @domainid int,
    @userIP varchar(20)
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    declare @username as varchar(100)
    select @username = UserName from Amplo.[User]

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    Declare @regionId as INT
    Declare @benchmarkProjectUserID as INT
    Select @benchmarkProjectUserID = BenchmarkProjectUserID from Amplo.BenchmarkProjectUser where UserID = @id and BenchmarkProjectID = @projectid

    declare @validity INT
    select @validity = COUNT(UserID) from Amplo.UserDomainAccess where UserID = @id and BenchmarkProjectID = @projectid and DomainID = @domainid and ActiveFlag = 1 

    IF @validity = 0
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    Declare @nowTime as DATETIME
    SET @nowTime= GETDATE()

    CREATE TABLE #QuestionResponses
    (
        questionid int,
        responseid numeric(5, 2)
    )

    insert into  #QuestionResponses
    VALUES (@QuestionID, @ResponseID);
	

    CREATE TABLE #QuestionResponse
    (
        questionid int,
        responseid numeric(5, 2)
    )

    insert into #QuestionResponse
    select questionId, responseID
    from #QuestionResponses
    --intersect (Select BenchmarkQuestionID, BenchmarkQuestionOptionID from Amplo.BenchmarkQuestionOption)

    --Update Audit log
    Insert into Amplo.BenchmarkAuditLog(
        [ClientID]
      ,[BenchmarkProjectID]
      ,[DomainID]
      ,[QuestionGroup]
      ,[QuestionSeries]
      ,[QuestionCategory]
      ,[QuestionID]
      ,[Question]
      ,[QuestionWeightage]
      ,[ResponseID]
      ,[Response]
      ,[ResponseUserID]
      ,[ResponseUserName]
      ,[ResponseTimeStamp]
      ,[DesignChoice]
      ,[FirstResponseFlag]
      ,[UserIPAddress]
    )
    select
    @clientid,
    @projectid,
    @domainid,
    ques.QuestionGroup,
    ques.QuestionSeries,
    ques.QuestionCategory,
    a.questionId,
    ques.Question,
    ques.QuestionWeightage,
    a.responseID,
    a.responseID, --opt.OptionName,
    @id,
    @username,
    @nowTime,
    ques.DesignChoice,
    NULL, --To be modified
    @userIP
    from #QuestionResponse a
    inner Join BenchmarkQuestion ques on a.questionId = ques.BenchmarkQuestionID and ques.DomainID = @domainid
    --inner join Amplo.BenchmarkQuestionOption opt on opt.BenchmarkQuestionOptionID = a.responseID
    inner join Amplo.UserDomainAccess userDets on userDets.DomainID = ques.DomainID and userDets.BenchmarkProjectID = @projectid and userDets.UserID=@id and userDets.ActiveFlag = 1

    -- BY default question weightage taken as 1 for all questions

    --Update existing responses in table
    Update Amplo.BenchmarkAssessment
    Set LastResponse = ResponseId, LastResponseBy = @id, LastResponseDate = GETDATE()
    from 
	--Amplo.BenchmarkAssessment BMA inner join 
	#QuestionResponse rcvd 
	--LastResponse = Response, LastResponseBy = RessponseUserID, LastResponseDate = ResponseDate
 --   from 
	--Amplo.BenchmarkAssessment BMA 
	--inner join 
	--#QuestionResponse rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid 
    
    Update Amplo.BenchmarkAssessment
    Set Response = rcvd.responseId, RessponseUserID=@id, ResponseDate = @nowTime, ModifedBy = @id, ModifiedDate = @nowTime 
    from Amplo.BenchmarkAssessment BMA inner join #QuestionResponse rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid 
   

-- Response for these questions do not exist in Assessment table - Insert
    
    --Set as NULL values which are already present in benchmark assessment table
    Update #QuestionResponse
    SET questionId = NULL, responseID = NULL
    from Amplo.BenchmarkAssessment BMA 
    inner join #QuestionResponse rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid
    Insert into Amplo.BenchmarkAssessment(
       [BenchmarkProjectID]
      ,[RegionID]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[DomainID]
      ,[GroupID]
      ,[QuestionID]
      ,[Response]
      ,[RessponseUserID]
      ,[ResponseDate]
      ,[LastResponse]
      ,[LastResponseBy]
      ,[LastResponseDate]
      ,[ResponseComments]
      ,[QuestionWeight]
      ,[BenchMark]
      ,[CreadedBy]
      ,[CreatedOn]
      ,[ModifedBy]
      ,[ModifiedDate]
    )
    Select 
        @projectid,
        @regionId,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
        @domainid,
        NULL,
        questionId,
        responseID,
        @id,
        @nowTime,
        NULL,
        NULL,
        NULL,
        NULL,
        1,
        NULL,
        @id,
        @nowTime,
        NULL,
        NULL
    from (select * from #QuestionResponse where questionId IS NOT NULL and responseID IS NOT NULL) ques
    inner join Amplo.BenchmarkQuestion domFilter on domFilter.BenchmarkQuestionID = ques.questionId and domFilter.DomainID = @domainid 
    inner join Amplo.UserDomainAccess userDets on userDets.DomainID = domFilter.DomainID and userDets.BenchmarkProjectID = @projectid and userDets.UserID=@id and userDets.ActiveFlag = 1 


-- Successfull updation of records
    SELECT messageName from Amplo.[Message] where MessageID = 1015

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
    


END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBMQuestionsResponses_Aashay]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateBMQuestionsResponses_Aashay]
 (
    @id int,
    @forSubmission AS Amplo.QuestionResponse READONLY,
    @projectid int,
    @domainid int,
    @userIP varchar(20)
 )
AS
BEGIN
/*
@id - Logged in userID
@quesResp - Question Response mapping table
@projectid - Project for which update is required
@domainid - Domain against which update is required
@userIP - User's IP address

QuestionResponse table type -  questionid as int, responseid as int
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    declare @username as varchar(100)
    select @username = UserName from Amplo.[User]

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    Declare @regionId as INT
    Declare @benchmarkProjectUserID as INT
    Select @benchmarkProjectUserID = BenchmarkProjectUserID from Amplo.BenchmarkProjectUser where UserID = @id and BenchmarkProjectID = @projectid

    declare @validity INT
    select @validity = COUNT(UserID) from Amplo.UserDomainAccess where UserID = @id and BenchmarkProjectID = @projectid and DomainID = @domainid and ActiveFlag = 1 

    IF @validity = 0
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    Declare @nowTime as DATETIME
    SET @nowTime= GETDATE()

    declare @quesResp Amplo.QuestionResponse
    insert into @quesResp
    select questionId, responseID
    from @forSubmission 
    intersect (Select BenchmarkQuestionID, BenchmarkQuestionOptionID from Amplo.BenchmarkQuestionOption)

    --Update Audit log
    Insert into Amplo.BenchmarkAuditLog(
        [ClientID]
      ,[BenchmarkProjectID]
      ,[DomainID]
      ,[QuestionGroup]
      ,[QuestionSeries]
      ,[QuestionCategory]
      ,[QuestionID]
      ,[Question]
      ,[QuestionWeightage]
      ,[ResponseID]
      ,[Response]
      ,[ResponseUserID]
      ,[ResponseUserName]
      ,[ResponseTimeStamp]
      ,[DesignChoice]
      ,[FirstResponseFlag]
      ,[UserIPAddress]
    )
    select
    @clientid,
    @projectid,
    @domainid,
    ques.QuestionGroup,
    ques.QuestionSeries,
    ques.QuestionCategory,
    a.questionId,
    ques.Question,
    ques.QuestionWeightage,
    a.responseID,
    opt.OptionName,
    @id,
    @username,
    @nowTime,
    ques.DesignChoice,
    NULL, --To be modified
    @userIP
    from @quesResp a
    inner Join BenchmarkQuestion ques on a.questionId = ques.BenchmarkQuestionID and ques.DomainID = @domainid
    inner join Amplo.BenchmarkQuestionOption opt on opt.BenchmarkQuestionOptionID = a.responseID
    inner join Amplo.UserDomainAccess userDets on userDets.DomainID = ques.DomainID and userDets.BenchmarkProjectID = @projectid and userDets.UserID=@id and userDets.ActiveFlag = 1




    -- BY default question weightage taken as 1 for all questions

    --Update existing responses in table
    Update Amplo.BenchmarkAssessment
    Set LastResponse = Response, LastResponseBy = RessponseUserID, LastResponseDate = ResponseDate
    from Amplo.BenchmarkAssessment BMA inner join @quesResp rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid 
    
    Update Amplo.BenchmarkAssessment
    Set Response = rcvd.responseId, RessponseUserID=@id, ResponseDate = @nowTime, ModifedBy = @id, ModifiedDate = @nowTime 
    from Amplo.BenchmarkAssessment BMA inner join @quesResp rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid 
   

-- Response for these questions do not exist in Assessment table - Insert
    
    --Set as NULL values which are already present in benchmark assessment table
    Update @quesResp
    SET questionId = NULL, responseID = NULL
    from Amplo.BenchmarkAssessment BMA 
    inner join @quesResp rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid
    

    Insert into Amplo.BenchmarkAssessment(
       [BenchmarkProjectID]
      ,[RegionID]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[DomainID]
      ,[GroupID]
      ,[QuestionID]
      ,[Response]
      ,[RessponseUserID]
      ,[ResponseDate]
      ,[LastResponse]
      ,[LastResponseBy]
      ,[LastResponseDate]
      ,[ResponseComments]
      ,[QuestionWeight]
      ,[BenchMark]
      ,[CreadedBy]
      ,[CreatedOn]
      ,[ModifedBy]
      ,[ModifiedDate]
    )
    Select 
        @projectid,
        @regionId,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
        @domainid,
        NULL,
        questionId,
        responseID,
        @id,
        @nowTime,
        NULL,
        NULL,
        NULL,
        NULL,
        1,
        NULL,
        @id,
        @nowTime,
        NULL,
        NULL
    from (select * from @quesResp where questionId IS NOT NULL and responseID IS NOT NULL) ques
    inner join Amplo.BenchmarkQuestion domFilter on domFilter.BenchmarkQuestionID = ques.questionId and domFilter.DomainID = @domainid 
    inner join Amplo.UserDomainAccess userDets on userDets.DomainID = domFilter.DomainID and userDets.BenchmarkProjectID = @projectid and userDets.UserID=@id and userDets.ActiveFlag = 1 


-- Successfull updation of records
    SELECT messageName from Amplo.[Message] where MessageID = 1015

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    


END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateCapabilityModellingClientProject]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateCapabilityModellingClientProject]
 (
    @id int,
    @CapabilityProjectID int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@CapabilityProjectID - ID of project to update
@CapabilityProjectName - Name of Capability Project to be set to
@userids - comma separated string of userids to map to set
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id
    
    DECLARE @ReceivedUserIDs TABLE (
    userIDs int
    );

    --Filter out received  users who are valid approved members of client company 
    INSERT INTO @ReceivedUserIDs
    SELECT * 
    FROM String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @ReceivedUserIDs a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    --AND DisableDate > GETDATE()
    ) b
    on a.userids = b.UserID

   declare @ifNameReturnedNullRetainName varchar(100)
   select @ifNameReturnedNullRetainName = ProjectName from Amplo.DecompositionProject where DecompositionProjectID = @CapabilityProjectID

   --Change Name of  Capability Modelling Project
    Update Amplo.DecompositionProject
    set ProjectName = ISNULL(@CapabilityProjectName, @ifNameReturnedNullRetainName), ModifiedBy = @id, ModifiedDate = GETDATE() WHERE DecompositionProjectID = @CapabilityProjectID

    --List of users mapped to selected project
    DECLARE @MappedUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @MappedUserIDs
    SELECT UserID
    FROM [Amplo].[DecompositionProjectUser] where DecompositionProjectID = @CapabilityProjectID and ActiveFlag = 1

    DECLARE @ToRemoveUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ToRemoveUserIDs
    SELECT  toRem.userIDs 
    FROM    @MappedUserIDs toRem LEFT JOIN @ValidUserIDs new 
    ON new.userIDs = toRem.userIDs
    WHERE new.userIDs IS NULL

    DECLARE @ToAddUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ToAddUserIDs
    SELECT  new.userIDs 
    FROM    @MappedUserIDs toRem Right JOIN @ValidUserIDs new 
    ON new.userIDs = toRem.userIDs
    WHERE toRem.userIDs IS NULL

    --Remove User access to Capability Modelling Project
    Update Amplo.DecompositionProjectUser
    SET ActiveFlag = 0, ModifiedBy= @id, ModifiedDate = GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) and DecompositionProjectID = @CapabilityProjectID


    --Remove Phase and function for the user for the project
    --TO Be added when the mapping is discussed and finalized
/*
    Update Amplo.UserDomainAccess
    SET ActiveFlag = 0, ModifiedBy = @id, ModifiedDate= GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) AND BenchmarkProjectID = @assessmentsetid 
*/

    --Map new users to Capability Modelling Project 
-- 1 taken as default for activity Flag . To be modified when requirements finalized

    INSERT INTO Amplo.DecompositionProjectUser(
    --   [DecompositionProjectUserName]
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
    --  ,[ProductionFlag]
      ,[CreatedBy]
      ,[CreatedDate]
    --  ,[ModifiedBy]
    --  ,[ModifiedDate]
      ,[ActivityFlag]
    )
    SELECT 
        @CapabilityProjectID,
        @clientID,
        userIDs,
        1,
        @id,
        GETDATE(),
        1
    from @ToAddUserIDs

   -- Add Phase and function for the user for the project
    --TO Be added when the mapping is discussed and finalized
/*
    declare  @domainMap Table(
       userid int,
       domainid int
   ) 

    insert into @domainMap
    select b.userids, a.domainID
    from (select DomainID from Amplo.AmploDomain where ActiveFlag=1) a  
    cross join @ToAddUserIDs b

    -- Access Type - 1- Read+Write, 2 - Read Only, 3- No Access
    INSERT INTO Amplo.[UserDomainAccess](
       [ClientID]
      ,[UserID]
      ,[DomainID]
      ,[AccessType]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[BenchmarkProjectID]
    )
    Select
        @clientid,
        userid,
        domainid,
        1,
        1,
        @id,
        GETDATE(),
        @assessmentsetid
    from @domainMap
*/
    Select messageName from Amplo.[Message] where MessageID = 1020

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateCapabilityModellingClientProject2]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateCapabilityModellingClientProject2]
 (
    @id int,
    @CapabilityProjectID int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@CapabilityProjectID - ID of project to update
@CapabilityProjectName - Name of Capability Project to be set to
@userids - comma separated string of userids to map to set
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id
    
    DECLARE @ReceivedUserIDs TABLE (
    userIDs int
    );

    --Filter out received  users who are valid approved members of client company 
    INSERT INTO @ReceivedUserIDs
    SELECT * 
    FROM String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @ReceivedUserIDs a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    --AND DisableDate > GETDATE()
    ) b
    on a.userids = b.UserID

   declare @ifNameReturnedNullRetainName varchar(100)
   select @ifNameReturnedNullRetainName = ProjectName from Amplo.DecompositionProject where DecompositionProjectID = @CapabilityProjectID

   --Change Name of  Capability Modelling Project
    Update Amplo.DecompositionProject
    set ProjectName = ISNULL(@CapabilityProjectName, @ifNameReturnedNullRetainName), ModifiedBy = @id, ModifiedDate = GETDATE() WHERE DecompositionProjectID = @CapabilityProjectID

    --List of users mapped to selected project
    DECLARE @MappedUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @MappedUserIDs
    SELECT UserID
    FROM [Amplo].[DecompositionProjectUser] where DecompositionProjectID = @CapabilityProjectID and ActiveFlag = 1

    DECLARE @ToRemoveUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ToRemoveUserIDs
    SELECT  toRem.userIDs 
    FROM    @MappedUserIDs toRem LEFT JOIN @ValidUserIDs new 
    ON new.userIDs = toRem.userIDs
    WHERE new.userIDs IS NULL

    DECLARE @ToAddUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ToAddUserIDs
    SELECT  new.userIDs 
    FROM    @MappedUserIDs toRem Right JOIN @ValidUserIDs new 
    ON new.userIDs = toRem.userIDs
    WHERE toRem.userIDs IS NULL

    --Remove User access to Capability Modelling Project
    Update Amplo.DecompositionProjectUser
    SET ActiveFlag = 0, ModifiedBy= @id, ModifiedDate = GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) and DecompositionProjectID = @CapabilityProjectID


    --Remove Phase and function for the user for the project
    Update Amplo.[DecompositionUserAccess]
    SET ActiveFlag = 0, ModifedBy = @id, ModifiedDate= GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) and DecompositionProjectID = @CapabilityProjectID


    --Map new users to Capability Modelling Project 

    INSERT INTO Amplo.DecompositionProjectUser(
    --   [DecompositionProjectUserName]
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
    --  ,[ProductionFlag]
      ,[CreatedBy]
      ,[CreatedDate]
    --  ,[ModifiedBy]
    --  ,[ModifiedDate]
      ,[ActivityFlag]
    )
    SELECT 
        @CapabilityProjectID,
        @clientID,
        userIDs,
        1,
        @id,
        GETDATE(),
        1
    from @ToAddUserIDs

   -- Add Phase and function for the user for the project
    declare @functionNetMap TABLE(
       functionID int 
    )

    insert into @functionNetMap
    select DecompositionFunctionID from Amplo.DecompositionFunction where ActiveFlag = 1
    
    --Industry filters to be applied after MVP1


      declare @phaseNetMap TABLE(
       phaseID int
    )

    insert into @phaseNetMap
    select DecompositionPhaseID from Amplo.DecompositionPhase where ActiveFlag = 1
    --Industry filters to be applied after MVP1

    declare  @phaseFunctionUserMap Table(
       userid int,
       functionID int,
       phaseID int
   ) 

    insert into @phaseFunctionUserMap
    SELECT usr.userIDs, fn.functionID, ph.phaseID
    from (select userIDs from @ValidUserIDs) usr
    cross join @functionNetMap fn
    cross join @phaseNetMap ph

-- Insert User mapping to phases and functions
    INSERT INTO Amplo.[DecompositionUserAccess](
       [UserAccessName]
      ,[UserAccessDescription]
      ,[ClientID]
      ,[UserID]
      ,[DecompositionProjectID]
      ,[FunctionID]
      ,[PhaseID]
      ,[ActiveFlag]
      ,[CreadedBy]
      ,[CreatedDate]
    )
    Select
        NULL,
        NULL,
        @clientid,
        userid,
        @CapabilityProjectID,
        functionID,
        phaseID,
        1,
        @id,
        GETDATE()
    from @phaseFunctionUserMap


    Select messageName from Amplo.[Message] where MessageID = 1020

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateClientProject]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateClientProject]
 (
    @id int,
    @assessmentsetid int,
    @assessmentSetName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentsetid - ID of assessment to update
@assessmentSetName - Name of new set
@userids - comma separated string of userids to map to set
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id
    
    DECLARE @ReceivedUserIDs TABLE (
    userIDs int
    );

    --Filter out received  users who are valid approved members of client company 
    INSERT INTO @ReceivedUserIDs
    SELECT * 
    FROM String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @ReceivedUserIDs a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    --AND DisableDate > GETDATE()
    ) b
    on a.userids = b.UserID

    
   declare @ifNameReturnedNullRetainName varchar(100)
   select @ifNameReturnedNullRetainName = BenchmarkProjectName from Amplo.BenchmarkProject where BenchmarkProjectID = @assessmentsetid

   --Change Name of Benchmark Project
    Update Amplo.BenchmarkProject
    set BenchmarkProjectName = ISNULL(@assessmentSetName, @ifNameReturnedNullRetainName), ModifiedBy = @id, ModifiedDate = GETDATE() WHERE BenchmarkProjectID = @assessmentsetid

    --List of users mapped to selected project
    DECLARE @MappedUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @MappedUserIDs
    SELECT UserID
    FROM [Amplo].[BenchmarkProjectUser] where BenchmarkProjectID = @assessmentsetid and ActiveFlag = 1

    DECLARE @ToRemoveUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ToRemoveUserIDs
    SELECT  toRem.userIDs 
    FROM    @MappedUserIDs toRem LEFT JOIN @ValidUserIDs new 
    ON new.userIDs = toRem.userIDs
    WHERE new.userIDs IS NULL

    DECLARE @ToAddUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ToAddUserIDs
    SELECT  new.userIDs 
    FROM    @MappedUserIDs toRem Right JOIN @ValidUserIDs new 
    ON new.userIDs = toRem.userIDs
    WHERE toRem.userIDs IS NULL

    --Remove User access to Benchmark Project
    Update Amplo.BenchmarkProjectUser
    SET ActiveFlag = 0, ModifiedBy= @id, ModifiedDate = GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) and BenchmarkProjectID = @assessmentsetid

    --Remove domain access for the user for the project
    Update Amplo.UserDomainAccess
    SET ActiveFlag = 0, ModifiedBy = @id, ModifiedDate= GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) AND BenchmarkProjectID = @assessmentsetid 


    --Map new users to Benchmark Project 
    INSERT INTO Amplo.BenchmarkProjectUser(
       [BenchmarkProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActivityFlag]
      ,[ActiveFlag]
     -- ,[DisableDate]
      ,[CreatedBy]
      ,[CreatedDate]
    )
    SELECT 
        @assessmentsetid,
        @clientID,
        userIDs,
        1,
        1,
        @id,
        GETDATE()
    from @ToAddUserIDs

   -- Add domain mapping for new users added
    declare  @domainMap Table(
       userid int,
       domainid int
   ) 

    insert into @domainMap
    select b.userids, a.domainID
    from (select DomainID from Amplo.AmploDomain where ActiveFlag=1) a  
    cross join @ToAddUserIDs b

    -- Access Type - 1- Read+Write, 2 - Read Only, 3- No Access
    INSERT INTO Amplo.[UserDomainAccess](
       [ClientID]
      ,[UserID]
      ,[DomainID]
      ,[AccessType]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[BenchmarkProjectID]
    )
    Select
        @clientid,
        userid,
        domainid,
        1,
        1,
        @id,
        GETDATE(),
        @assessmentsetid
    from @domainMap

    Select messageName from Amplo.[Message] where MessageID = 1012

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateCompanyProfile]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateCompanyProfile]
 (
    @UserID int,
    @CountryRegionCodeID int,
    @IndustryVerticalID int,
    @IndustrySubVerticalID int,
    @NoOfEmployees int,
    @Country varchar(100),
    @StateTerritory varchar(100),
    @City nvarchar(50),
    @PostalCode NVARCHAR(15),
    @CompanyProfileID INT OUTPUT
 )
AS
BEGIN
/*
@UserID - Logged in userID
@Responses AS Amplo.ProfilingResponses - Question ID alongwith Answer text
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

            declare @clientId INT
            select @clientId = ClientID from Amplo.[User] where UserID = @UserID and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

            declare @IndustryID INT
            select IndustryID from Amplo.[Client] where ClientID = @clientId and ActiveFlag = 1

            declare @alreadyInput int
            select @alreadyInput = Count(CompanyProfileID) from Amplo.AmploCompanyProfile where ClientID = @clientId 

            if @alreadyInput = 0
            --If company profile not entered even once yet. Insert
            BEGIN

                Insert into Amplo.AmploCompanyProfile
                (
                    [ClientID]
                    ,[CountryRegionCodeID]
                    ,[IndustryID]
                    ,[IndustryVerticalID]
                    ,[IndustrySubVerticalID]
                    ,[NoOfEmployees]
                    ,[Country]
                    ,[StateTerritory]
                    ,[City]
                    ,[PostalCode]
                    ,[ActiveFlag]
                    ,[CreatedBy]
                    ,[CreatedDate]
                )
                Values(
                    @clientId,
                    @CountryRegionCodeID,
                    @IndustryID,
                    @IndustryVerticalID,
                    @IndustrySubVerticalID,
                    @NoOfEmployees,
                    @Country,
                    @StateTerritory,
                    @City,
                    @PostalCode,
                    1,
                    @UserID,
                    GETDATE()        
                )

  --      declare @createdCompanyProfileID int
        
            SELECT @CompanyProfileID = SCOPE_IDENTITY();

    END

    ELSE
        BEGIN

            declare @PCompanyProfileID int
            select @PCompanyProfileID = CompanyProfileID from Amplo.AmploCompanyProfile where clientID = @clientId and ActiveFlag = 1
            SELECT @CompanyProfileID = @PCompanyProfileID

            UPDATE Amplo.AmploCompanyProfile
            SET [CountryRegionCodeID] = @CountryRegionCodeID
            ,[IndustryID] = @IndustryID
            ,[IndustryVerticalID] = @IndustryVerticalID
            ,[IndustrySubVerticalID] = @IndustrySubVerticalID
            ,[NoOfEmployees] = @NoOfEmployees
            ,[Country] = @Country
            ,[StateTerritory] = @StateTerritory
            ,[City] = @City
            ,[PostalCode] = @PostalCode
            ,[ModifiedBy] = @UserID
            ,[ModifiedDate] = GETDATE()
            where CompanyProfileID = @PCompanyProfileID
        END


    --Success Message

    --    select MessageName from Amplo.[Message] where MessageID = 1021

    select @CompanyProfileID;

    COMMIT TRANSACTION;


    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateCompanyProfile_Aashay]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateCompanyProfile_Aashay]
 (
    @id int,
    @Responses AS Amplo.ProfilingResponses READONLY,
    @CountryRegionCodeID int,
  --  @IndustryID int,
    @IndustryVerticalID int,
    @IndustrySubVerticalID int,
    @NoOfEmployees int,
    @Country varchar(100),
    @StateTerritory varchar(100),
    @City nvarchar(50),
    @PostalCode NVARCHAR(15)
 )
AS
BEGIN
/*
@id - Logged in userID
@Responses AS Amplo.ProfilingResponses - Question ID alongwith Answer text
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   declare @clientId INT
   select @clientId = ClientID from Amplo.[User] where UserID = @id and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

   declare @IndustryID INT
   select IndustryID from Amplo.[Client] where ClientID = @clientId and ActiveFlag = 1

   declare @alreadyInput int
   select @alreadyInput = Count(CompanyProfileID) from Amplo.AmploCompanyProfile where ClientID = @clientId 

    if @alreadyInput = 0
    --If company profile not entered even once yet. Insert
    BEGIN

        Insert into Amplo.AmploCompanyProfile
        (
            [ClientID]
        ,[CountryRegionCodeID]
        ,[IndustryID]
        ,[IndustryVerticalID]
        ,[IndustrySubVerticalID]
        ,[NoOfEmployees]
        ,[Country]
        ,[StateTerritory]
        ,[City]
        ,[PostalCode]
        ,[ActiveFlag]
        ,[CreatedBy]
        ,[CreatedDate]
        )
        Values(
            @clientId,
            @CountryRegionCodeID,
            @IndustryID,
            @IndustryVerticalID,
            @IndustrySubVerticalID,
            @NoOfEmployees,
            @Country,
            @StateTerritory,
            @City,
            @PostalCode,
            1,
            @id,
            GETDATE()        
        )

        declare @createdCompanyProfileID int
        
        SELECT @createdCompanyProfileID = SCOPE_IDENTITY();

        INSERT into Amplo.AmploProfilingAnswers
        (
        [CompanyProfileID]
        ,[ProfilingQuestionID]
        ,[ProfilingAnswers]
        ,[ProfilingRatings]
        ,[ProfilingAnswersFeedback]
        ,[CreatedBy]
        ,[CreatedDate]
        )
        select
        @createdCompanyProfileID,
        questionID,
        profilingAnswer,
        NULL,
        NULL,
        @id,
        GETDATE()
        from @Responses
        where profilingAnswer IS NOT NULL
    
    END

    ELSE
    BEGIN

        declare @companyProfileID int
        select @companyProfileID = CompanyProfileID from Amplo.AmploCompanyProfile where clientID = @clientId and ActiveFlag = 1

        UPDATE Amplo.AmploCompanyProfile
        SET [CountryRegionCodeID] = @CountryRegionCodeID
        ,[IndustryID] = @IndustryID
        ,[IndustryVerticalID] = @IndustryVerticalID
        ,[IndustrySubVerticalID] = @IndustrySubVerticalID
        ,[NoOfEmployees] = @NoOfEmployees
        ,[Country] = @Country
        ,[StateTerritory] = @StateTerritory
        ,[City] = @City
        ,[PostalCode] = @PostalCode
        ,[ModifiedBy] = @id
        ,[ModifiedDate] = GETDATE()

        ---Update question responses which had already been answered

        Update Amplo.AmploProfilingAnswers
        SET ProfilingAnswers = b.profilingAnswer from 
        Amplo.AmploProfilingAnswers a inner join @Responses b on b.questionID = a.ProfilingQuestionID

        --Insert new responses
            INSERT into Amplo.AmploProfilingAnswers
        (
        [CompanyProfileID]
        ,[ProfilingQuestionID]
        ,[ProfilingAnswers]
        ,[ProfilingRatings]
        ,[ProfilingAnswersFeedback]
        ,[CreatedBy]
        ,[CreatedDate]
        )
        select
        @companyProfileID,
        questionID,
        profilingAnswer,
        NULL,
        NULL,
        @id,
        GETDATE()
        from @Responses
        where profilingAnswer IS NOT NULL AND questionID NOT IN (select ProfilingQuestionID from Amplo.AmploProfilingAnswers where CompanyProfileID = @companyProfileID)

    END


    --Success Message

    select MessageName from Amplo.[Message] where MessageID = 1021

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateCompanyProfileQuestions]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateCompanyProfileQuestions]
 (
    @UserID int,
    @CompanyProfileID int,
    @QuestionID int,
    @QuestionResponse varchar(max)
 )
AS
BEGIN
/*
@UserID - Logged in userID
@Responses AS Amplo.ProfilingResponses - Question ID alongwith Answer text
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   declare @clientId INT
   select @clientId = ClientID from Amplo.[User] where UserID = @UserID and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

--   declare @IndustryID INT
--   select IndustryID from Amplo.[Client] where ClientID = @clientId and ActiveFlag = 1

   declare @alreadyInput int
   select @alreadyInput = Count(CompanyProfileID) from Amplo.AmploProfilingAnswers where ClientID = @clientId and ProfilingQuestionID = @QuestionID 

    if @alreadyInput = 0
    --If company profile not entered even once yet. Insert
    BEGIN

        Insert into Amplo.AmploProfilingAnswers
        (
              [ClientID]
			 ,[CompanyProfileID]
             ,[ProfilingQuestionID]
             ,[ProfilingAnswers]   
            ,[CreatedBy]
            ,[CreatedDate]
        )
        Values(
			 @clientId
            ,@CompanyProfileID
            ,@QuestionID
            ,@QuestionResponse
            ,@UserID,
            GETDATE()        
        )


    END

    ELSE
    BEGIN

        Update Amplo.AmploProfilingAnswers
        SET ProfilingAnswers = @QuestionResponse
        where CompanyProfileID = @CompanyProfileID and ProfilingQuestionID = @QuestionID 

    END


    --Success Message

    select MessageName from Amplo.[Message] where MessageID = 1021

--    RETURN @CompanyProfileID;

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
    



END
GO
/****** Object:  StoredProcedure [Amplo].[uspUPdateDecompositionAverageScores]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================================================================================================================
-- Author:		Srinivas
-- Create date: 07-October-2019
-- Description:	This procedure calcultes and updates average scores
-- =====================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspUPdateDecompositionAverageScores]
	-- Add the parameters for the stored procedure here
	@ProjectID [int]
   ,@UserID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @ProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]
	
    -- Insert statements for procedure here


	--Process Level1 Cursor
	DECLARE ProcessLevel1List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT DecompositionProcessLevel1ID from Amplo.DecompositionProcessLevel1 where DecompositionProjectID = @ProjectID
    ORDER BY DecompositionProcessLevel1ID Asc;

    OPEN ProcessLevel1List;
    FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;

    WHILE @@FETCH_STATUS = 0
    BEGIN

		-- Process Level2 Cursor
		DECLARE ProcessLevel2List CURSOR FAST_FORWARD READ_ONLY
		FOR
		SELECT DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where DecompositionProcessLevel1ID = @ProcessLevel1ID
		ORDER BY DecompositionProcessLevel2ID Asc;

		OPEN ProcessLevel2List;
		FETCH NEXT FROM ProcessLevel2List INTO @ProcessLevel2ID;

		WHILE @@FETCH_STATUS = 0
/*
		BEGIN

		if nodeflag = 0

			begin


			SELECT @ProcessLevel2AverageScore = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10]) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from Amplo.DecompositionProcessLevel2Score
			where [DecompositionProcessLevel1ID] = @ProcessLevel2ID
			GROUP BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID]
			end;
		else
			begin
				DECLARE ProcessLevel2List CURSOR FAST_FORWARD READ_ONLY
				FOR
				SELECT DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where DecompositionProcessLevel1ID = @ProcessLevel1ID
				ORDER BY DecompositionProcessLevel2ID Asc;

				OPEN ProcessLevel2List;
				FETCH NEXT FROM ProcessLevel2List INTO @ProcessLevel2ID;

				WHILE @@FETCH_STATUS = 0
				BEGIN

					SELECT @ProcessLevel2AverageScore = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10]) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from Amplo.DecompositionProcessLevel2Score
					where [DecompositionProcessLevel1ID] = @ProcessLevel2ID
					GROUP BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID]
		
				FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;
				END;

		end;


		FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;
		END;

*/
    FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;
    END;

    CLOSE ProcessLevel1List;
    DEALLOCATE ProcessLevel1List;


END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionLevel1Location]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionLevel1Location]
    @ProjectID [int], 
    @ProcessLevel1ID [int],
    @FunctionID [int],
    @PhaseID [int],
    @LocationID [int],
    @LocationFlag [int]
AS
BEGIN
    SET NOCOUNT ON; 

    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Amplo].[DecompositionProcessLevel1]
        SET  [GridViewLocationID] = @LocationID,  [GridVViewLocationFlag] = @LocationFlag, FunctionID = @FunctionID, PhaseID = @PhaseID
        WHERE [DecompositionProjectID] = @ProjectID 
--		AND FunctionID = @FunctionID
--		AND PhaseID = @PhaseID
		AND [DecompositionProcessLevel1ID] = @ProcessLevel1ID 

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionLevel1Location_WIP]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionLevel1Location_WIP]
    @ProjectID [int], 
    @ProcessLevel1ID [int],
    @FunctionID [int],
    @PhaseID [int],
	@ProcessLevelTitle [varchar](100),
    @LocationID [int],
    @LocationFlag [int]
AS
BEGIN
    SET NOCOUNT ON; 

    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Amplo].[DecompositionProcessLevel1]
        SET  
			[FunctionID] = @FunctionID, 
			[PhaseID] = @PhaseID, 
			[ProcessLevel1Title]=@ProcessLevelTitle,
			[GridViewLocationID] = @LocationID,  
			[GridVViewLocationFlag] = @LocationFlag 
        WHERE [DecompositionProjectID] = @ProjectID AND [DecompositionProcessLevel1ID] = @ProcessLevel1ID 

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionLevel1Title]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionLevel1Title]
    @ProcessLevel1ID [int],
    @ProcessLevel1Title nvarchar(512)
AS
BEGIN
    SET NOCOUNT ON; 

    BEGIN TRY
        BEGIN TRANSACTION;
        UPDATE [Amplo].[DecompositionProcessLevel1]
        SET  ProcessLevel1Name = @ProcessLevel1Title,  ProcessLevel1Title = @ProcessLevel1Title
        WHERE [DecompositionProcessLevel1ID] = @ProcessLevel1ID 

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
	select @ProcessLevel1ID as ProcessLevel1ID
END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevel2Scores]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevel2Scores]
	-- Add the parameters for the stored procedure here
	@DecompositionProcessLevel1ID [int],
	@DecompositionProcessLevel2ID [int],
	@ScoreCriteria1 [float],
	@ScoreCriteria2 [float],
	@ScoreCriteria3 [float],
	@ScoreCriteria4 [float],
	@ScoreCriteria5 [float],
	@ScoreCriteria6 [float],
	@ScoreCriteria7 [float],
	@ScoreCriteria8 [float],
	@ScoreCriteria9 [float],
	@ScoreCriteria10 [float],
	@LVL2CalcAggrScore [float],
	@AvgScoreWeightage [float]
	, @Action nvarchar(10)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = count(DecompositionProcessLevel2ScoreID) from [Amplo].[DecompositionProcessLevel2Score] where [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID

	if(@Action = 'update' or (@RecordExists != 0 and @Action != 'delete'))
	begin
		update [Amplo].[DecompositionProcessLevel2Score] set 
	
       [ScoreCriteria1] = @ScoreCriteria1
      ,[ScoreCriteria2] =@ScoreCriteria2
      ,[ScoreCriteria3] = @ScoreCriteria3
      ,[ScoreCriteria4] =@ScoreCriteria4
      ,[ScoreCriteria5] = @ScoreCriteria5
      ,[ScoreCriteria6] = @ScoreCriteria6
      ,[ScoreCriteria7] = @ScoreCriteria7
      ,[ScoreCriteria8] = @ScoreCriteria8
      ,[ScoreCriteria9] = @ScoreCriteria9
      ,[ScoreCriteria10] = @ScoreCriteria10
      ,[LVL2CalcAggrScore] = @LVL2CalcAggrScore 
      ,[AvgScoreWeightage] = @AvgScoreWeightage
	 where [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
	end
	else if(@Action = 'add')
	begin
		INSERT INTO [Amplo].[DecompositionProcessLevel2Score]
	(
		[DecompositionProcessLevel1ID]
		,[DecompositionProcessLevel2ID]
		,[ScoreCriteria1]
		,[ScoreCriteria2]
		,[ScoreCriteria3]
		,[ScoreCriteria4]
		,[ScoreCriteria5]
		,[ScoreCriteria6]
		,[ScoreCriteria7]
		,[ScoreCriteria8]
		,[ScoreCriteria9]
		,[ScoreCriteria10]
		,[LVL2CalcAggrScore]
		,[AvgScoreWeightage]
	)
	VALUES
		(
		@DecompositionProcessLevel1ID,
		@DecompositionProcessLevel2ID,
		@ScoreCriteria1,
		@ScoreCriteria2,
		@ScoreCriteria3,
		@ScoreCriteria4,
		@ScoreCriteria5,
		@ScoreCriteria6,
		@ScoreCriteria7,
		@ScoreCriteria8,
		@ScoreCriteria9,
		@ScoreCriteria10,
		@LVL2CalcAggrScore,
		@AvgScoreWeightage
		)
	end
	else if(@Action = 'delete')
	begin
		delete from [Amplo].[DecompositionProcessLevel2Score] 
		where [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
	end
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevel3Scores]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevel3Scores]
		@DecompositionProcessLevel1ID [int]
		,@DecompositionProcessLevel2ID [int]
		,@DecompositionProcessLevel3ID [int]
		,@ScoreCriteria1 [float]
		,@ScoreCriteria2 [float]
		,@ScoreCriteria3 [float]
		,@ScoreCriteria4 [float]
		,@ScoreCriteria5 [float]
		,@ScoreCriteria6 [float]
		,@ScoreCriteria7 [float]
		,@ScoreCriteria8 [float]
		,@ScoreCriteria9 [float]
		,@ScoreCriteria10 [float]
		,@AvgScoreWeightage [int]
		, @Action nvarchar(10)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = count(DecompositionProcessLevel3ScoreID) from [Amplo].[DecompositionProcessLevel3Score] 
	where  [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID 
	and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID and [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID

	if(@Action = 'update' or (@RecordExists != 0 and @Action != 'delete'))
	begin
			UPDATE [Amplo].[DecompositionProcessLevel3Score]
			SET [ScoreCriteria1] = @ScoreCriteria1
			,[ScoreCriteria2] = @ScoreCriteria2
			,[ScoreCriteria3] = @ScoreCriteria3
			,[ScoreCriteria4] = @ScoreCriteria4
			,[ScoreCriteria5] = @ScoreCriteria5
			,[ScoreCriteria6] = @ScoreCriteria6
			,[ScoreCriteria7] = @ScoreCriteria7
			,[ScoreCriteria8] = @ScoreCriteria8
			,[ScoreCriteria9] = @ScoreCriteria9
			,[ScoreCriteria10] = @ScoreCriteria10
			,[AvgScoreWeightage] = @AvgScoreWeightage
			WHERE [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
	end
	  ELSE if(@Action = 'add')
	  begin
			INSERT INTO [Amplo].[DecompositionProcessLevel3Score]
				([DecompositionProcessLevel1ID]
				,[DecompositionProcessLevel2ID]
				,[DecompositionProcessLevel3ID]
				,[ScoreCriteria1]
				,[ScoreCriteria2]
				,[ScoreCriteria3]
				,[ScoreCriteria4]
				,[ScoreCriteria5]
				,[ScoreCriteria6]
				,[ScoreCriteria7]
				,[ScoreCriteria8]
				,[ScoreCriteria9]
				,[ScoreCriteria10]
				,[AvgScoreWeightage])
			VALUES
				(@DecompositionProcessLevel1ID
				,@DecompositionProcessLevel2ID
				,@DecompositionProcessLevel3ID
				,@ScoreCriteria1
				,@ScoreCriteria2
				,@ScoreCriteria3
				,@ScoreCriteria4
				,@ScoreCriteria5
				,@ScoreCriteria6
				,@ScoreCriteria7
				,@ScoreCriteria8
				,@ScoreCriteria9
				,@ScoreCriteria10
				,@AvgScoreWeightage)
	end
	else if(@Action = 'delete')
	begin
		delete from [Amplo].[DecompositionProcessLevel3Score] 
		WHERE [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
		AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
		AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
	end
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevel4]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevel4]
	-- Add the parameters for the stored procedure here
		 @UserID [int]
		,@DecompositionProjectID [int]
		,@DecompositionProcessLevel1ID [int]
		,@DecompositionProcessLevel2ID [int]
		,@DecompositionProcessLevel3ID [int]
		,@ProcessLevel4NodeID [varchar](50)
		,@ProcessLevel4Title [varchar](100)
		,@Owner [varchar](100)
		,@CountrySpecific [varchar](100)
		,@LeafNodeFlag [bit]
--		,@DisableDate [date]
		,@DecompositionProcessLevel4ID [int] OUTPUT
		, @Action nvarchar(10)
		,@DecompositionProcessLevel4IDInput [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;
	DECLARE @PDecompositionProcessLevel4ID int
    BEGIN TRY
        --BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = count(ProcessLevel4NodeId) from [Amplo].[DecompositionProcessLevel4] 
	where DecompositionProjectID = @DecompositionProjectID AND  ProcessLevel4NodeId = @ProcessLevel4NodeID And ActiveFlag = 1
	AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
	AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
	AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID

	if (@Action = 'update' or (@RecordExists > 0 and @Action != 'delete'))
	 BEGIN
		UPDATE [Amplo].[DecompositionProcessLevel4]
		SET  [ProcessLevel4Title] = @ProcessLevel4Title
			,[Owner] = @Owner
			,[CountrySpecific] = @CountrySpecific
			,[LeafNodeFlag] = @LeafNodeFlag
--			,[DisableDate] = @DisableDate
			,[ActiveFlag] = 1
			,[ModifiedBy] = @UserID
			,[ModifiedDate] = GETDATE()
		WHERE DecompositionProjectID = @DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			  AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			  AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID

			select @PDecompositionProcessLevel4ID=DecompositionProcessLevel4ID from Amplo.DecompositionProcessLevel4 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel4NodeId

 = @Processlevel4NodeID;

			SET @DecompositionProcessLevel4ID = @PDecompositionProcessLevel4ID
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

			RETURN
	 END
	else if @Action = 'add'
		BEGIN
			INSERT INTO [Amplo].[DecompositionProcessLevel4]
				([DecompositionProjectID]
				,[DecompositionProcessLevel1ID]
				,[DecompositionProcessLevel2ID]
				,[DecompositionProcessLevel3ID]
				,[ProcessLevel4NodeID]
	--			,[ProcessLevel4Name]
				,[ProcessLevel4Title]
				,[Owner]
				,[CountrySpecific]
				,[LeafNodeFlag]
--				,[DisableDate]
				,[ActiveFlag]
				,[CreatedBy]
				,[CreatedDate]
				)
				VALUES
				(@DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@DecompositionProcessLevel2ID
				,@DecompositionProcessLevel3ID
				,@ProcessLevel4NodeID
	--			,@ProcessLevel4Name
				,@ProcessLevel4Title
	--			,@ProcessLevel4Description
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
--				,@DisableDate
				,1
				,@UserID
				,GETDATE()
				)
		SET @DecompositionProcessLevel4ID = SCOPE_IDENTITY();  
		SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

		END
		if @Action = 'delete'
	 BEGIN
		UPDATE [Amplo].[DecompositionProcessLevel4]
		SET  [ActiveFlag] = 0
			,[ModifiedBy] = @UserID
			,[ModifiedDate] = GETDATE()
		WHERE DecompositionProcessLevel4ID = @DecompositionProcessLevel4IDInput

			select @PDecompositionProcessLevel4ID=DecompositionProcessLevel4ID from Amplo.DecompositionProcessLevel4 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel4NodeId

 = @Processlevel4NodeID;

			SET @DecompositionProcessLevel4ID = @PDecompositionProcessLevel4ID
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

			RETURN
	 END
--        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
     -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevel4Scores]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevel4Scores]
	-- Add the parameters for the stored procedure here
		@DecompositionProcessLevel1ID [int]
		,@DecompositionProcessLevel2ID [int]
		,@DecompositionProcessLevel3ID [int]
		,@DecompositionProcessLevel4ID [int]
		,@ScoreCriteria1 [float]
		,@ScoreCriteria2 [float]
		,@ScoreCriteria3 [float]
		,@ScoreCriteria4 [float]
		,@ScoreCriteria5 [float]
		,@ScoreCriteria6 [float]
		,@ScoreCriteria7 [float]
		,@ScoreCriteria8 [float]
		,@ScoreCriteria9 [float]
		,@ScoreCriteria10 [float]
		,@Level4CalcAggrScore [float]
		,@AvgScoreWeightage [float]
		, @Action nvarchar(10)
AS
BEGIN
	SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = count(DecompositionProcessLevel4ScoreID) from [Amplo].[DecompositionProcessLevel4Score] where  [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID 
	and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID and [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID

	if(@Action = 'update' or (@RecordExists != 0 and @Action != 'delete'))

		UPDATE [Amplo].[DecompositionProcessLevel4Score]
		SET [ScoreCriteria1] = @ScoreCriteria1
			,[ScoreCriteria2] = @ScoreCriteria2
			,[ScoreCriteria3] = @ScoreCriteria3
			,[ScoreCriteria4] = @ScoreCriteria4
			,[ScoreCriteria5] = @ScoreCriteria5
			,[ScoreCriteria6] = @ScoreCriteria6
			,[ScoreCriteria7] = @ScoreCriteria7
			,[ScoreCriteria8] = @ScoreCriteria8
			,[ScoreCriteria9] = @ScoreCriteria9
			,[ScoreCriteria10] = @ScoreCriteria10
			,[Level4CalcAggrScore] = @Level4CalcAggrScore
			,[AvgScoreWeightage] = @AvgScoreWeightage
		WHERE  
			 [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			 AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			 AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			 AND [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID

	else if(@Action = 'add')
	begin
		INSERT INTO [Amplo].[DecompositionProcessLevel4Score]
			([DecompositionProcessLevel1ID]
			,[DecompositionProcessLevel2ID]
			,[DecompositionProcessLevel3ID]
			,[DecompositionProcessLevel4ID]
			,[ScoreCriteria1]
			,[ScoreCriteria2]
			,[ScoreCriteria3]
			,[ScoreCriteria4]
			,[ScoreCriteria5]
			,[ScoreCriteria6]
			,[ScoreCriteria7]
			,[ScoreCriteria8]
			,[ScoreCriteria9]
			,[ScoreCriteria10]
			,[Level4CalcAggrScore]
			,[AvgScoreWeightage])
		VALUES
			(@DecompositionProcessLevel1ID
			,@DecompositionProcessLevel2ID
			,@DecompositionProcessLevel3ID
			,@DecompositionProcessLevel4ID
			,@ScoreCriteria1
			,@ScoreCriteria2
			,@ScoreCriteria3
			,@ScoreCriteria4
			,@ScoreCriteria5
			,@ScoreCriteria6
			,@ScoreCriteria7
			,@ScoreCriteria8
			,@ScoreCriteria9
			,@ScoreCriteria10
			,@Level4CalcAggrScore
			,@AvgScoreWeightage)
	end
	else if(@Action = 'delete')
	begin
		delete from [Amplo].[DecompositionProcessLevel4Score]
		where [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
	end

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevel5Scores]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevel5Scores]
			    @DecompositionProcessLevel1ID [int]
			   ,@DecompositionProcessLevel2ID [int]
			   ,@DecompositionProcessLevel3ID [int]
			   ,@DecompositionProcessLevel4ID [int]
			   ,@DecompositionProcessLevel5ID [int]
			   ,@ScoreCriteria1 [float]
			   ,@ScoreCriteria2 [float]
			   ,@ScoreCriteria3 [float]
			   ,@ScoreCriteria4 [float]
			   ,@ScoreCriteria5 [float]
			   ,@ScoreCriteria6 [float]
			   ,@ScoreCriteria7 [float]
			   ,@ScoreCriteria8 [float]
			   ,@ScoreCriteria9 [float]
			   ,@ScoreCriteria10 [float]
			   ,@Level5CalcAggrScore [float]
			   ,@AvgScoreWeightage [float]
			   , @Action nvarchar(10)
AS
BEGIN
	SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = count(DecompositionProcessLevel5ScoreID) from [Amplo].[DecompositionProcessLevel5Score] where  [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID 
	and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID and [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID AND [DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID

	if(@Action = 'update' or (@RecordExists != 0 and @Action != 'delete'))
	begin
	UPDATE [Amplo].[DecompositionProcessLevel5Score]
	   SET 
		   [ScoreCriteria1] = @ScoreCriteria1
		  ,[ScoreCriteria2] = @ScoreCriteria2
		  ,[ScoreCriteria3] = @ScoreCriteria3
		  ,[ScoreCriteria4] = @ScoreCriteria4
		  ,[ScoreCriteria5] = @ScoreCriteria5
		  ,[ScoreCriteria6] = @ScoreCriteria6
		  ,[ScoreCriteria7] = @ScoreCriteria7
		  ,[ScoreCriteria8] = @ScoreCriteria8
		  ,[ScoreCriteria9] = @ScoreCriteria9
		  ,[ScoreCriteria10] = @ScoreCriteria10
		  ,[Level5CalcAggrScore] = @Level5CalcAggrScore
		  ,[AvgScoreWeightage] = @AvgScoreWeightage
	 WHERE 
	--	   [DecompositionProcessLevel5ScoreID] = @DecompositionProcessLevel5ScoreID
		  [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
		  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
		  AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
		  AND [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
		  AND [DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
	end
		  ELSE if(@Action = 'add')
	begin
	INSERT INTO [Amplo].[DecompositionProcessLevel5Score]
			   (
			    [DecompositionProcessLevel1ID]
			   ,[DecompositionProcessLevel2ID]
			   ,[DecompositionProcessLevel3ID]
			   ,[DecompositionProcessLevel4ID]
			   ,[DecompositionProcessLevel5ID]
			   ,[ScoreCriteria1]
			   ,[ScoreCriteria2]
			   ,[ScoreCriteria3]
			   ,[ScoreCriteria4]
			   ,[ScoreCriteria5]
			   ,[ScoreCriteria6]
			   ,[ScoreCriteria7]
			   ,[ScoreCriteria8]
			   ,[ScoreCriteria9]
			   ,[ScoreCriteria10]
			   ,[Level5CalcAggrScore]
			   ,[AvgScoreWeightage])
		 VALUES
			   (
			    @DecompositionProcessLevel1ID
			   ,@DecompositionProcessLevel2ID
			   ,@DecompositionProcessLevel3ID
			   ,@DecompositionProcessLevel4ID
			   ,@DecompositionProcessLevel5ID
			   ,@ScoreCriteria1
			   ,@ScoreCriteria2
			   ,@ScoreCriteria3
			   ,@ScoreCriteria4
			   ,@ScoreCriteria5
			   ,@ScoreCriteria6
			   ,@ScoreCriteria7
			   ,@ScoreCriteria8
			   ,@ScoreCriteria9
			   ,@ScoreCriteria10
			   ,@Level5CalcAggrScore
			   ,@AvgScoreWeightage
			  )
		end
		else if(@Action = 'delete')
		begin
			delete from [Amplo].[DecompositionProcessLevel5Score]
			where [DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
		end

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2]
	-- Add the parameters for the stored procedure here
       @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [varchar](50)
       ,@ProcessLevel2Title [varchar](100)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@DecompositionProcessLevel2ID [int] OUTPUT
	   , @Action nvarchar(10)
	   , @DecompositionProcessLevel2IDInput [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	DECLARE @PDecompositionProcessLevel2ID INT

    BEGIN TRY
--        BEGIN TRANSACTION;

	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(@DecompositionProcessLevel2ID) from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID 
	AND DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID and ActiveFlag = 1

	if(@Action = 'add')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
	
			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 
			where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID 
			AND ProcessLevel2NodeId = @Processlevel2NodeID;

			SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].[DecompositionProcessLevel2]
			(
			   [DecompositionProjectID]
			  ,[DecompositionProcessLevel1ID]
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[Owner]
			  ,[CountrySpecific]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  ,[CreatedBy]
			  ,[CreatedDate]
			  )
			  values
			(
				 @DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
				, 1
				,@UserID
				,GETDATE()
			);

			SELECT @DecompositionProcessLevel2ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			--Update Status as Inprogress
			update Amplo.DecompositionProcessLevel1
			set status = 2 where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID;

		END
	end
	else if(@Action = 'update')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
	
			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId

 = @Processlevel2NodeID;

			SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			RETURN
		END

		ELSE

		BEGIN

			INSERT INTO [Amplo].[DecompositionProcessLevel2]
			(
			   [DecompositionProjectID]
			  ,[DecompositionProcessLevel1ID]
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[Owner]
			  ,[CountrySpecific]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  ,[CreatedBy]
			  ,[CreatedDate]
			  )
			  values
			(
				 @DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
				, 1
				,@UserID
				,GETDATE()
			);

			SELECT @DecompositionProcessLevel2ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			--Update Status as Inprogress
			update Amplo.DecompositionProcessLevel1
			set status = 2 where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID;

		END
	end
	else if(@Action = 'delete')
	begin
		UPDATE Amplo.DecompositionProcessLevel2 SET  
			   ActiveFlag = 0
			  ,ModifiedBy = @UserID
			  ,[ModifiedDate] = GETDATE()
			WHERE DecompositionProcessLevel2ID = @DecompositionProcessLevel2IDInput
	
			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId

 = @Processlevel2NodeID;

			SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			RETURN
	end
	
		RETURN @DecompositionProcessLevel2ID;
  --      COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2_10_OCT_2019]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 04-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2_10_OCT_2019]
	-- Add the parameters for the stored procedure here
       @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [float]
       ,@ProcessLevel2Title [varchar](100)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@DecompositionProcessLevel2ID [int] OUTPUT

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;
	DECLARE @PDecompositionProcessLevel2ID INT

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(@DecompositionProcessLevel2ID) from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID

	if @RecordExists > 0

		BEGIN
			UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
	
			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID;

			SET @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].[DecompositionProcessLevel2]
			(
			   [DecompositionProjectID]
			  ,[DecompositionProcessLevel1ID]
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[Owner]
			  ,[CountrySpecific]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  ,[CreatedBy]
			  ,[CreatedDate]
			  )
			  values
			(
				 @DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
				, 1
				,@UserID
				,GETDATE()
			);

			SET @DecompositionProcessLevel2ID = SCOPE_IDENTITY();  
		END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2_New]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 04-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2_New]
	-- Add the parameters for the stored procedure here
        @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [int]
       ,@ProcessLevel2Title [varchar](100)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)

	   ,@DecompositionProcessLevel2ID [int] OUTPUT

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;
	DECLARE @PDecompositionProcessLevel2ID INT

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(@DecompositionProcessLevel2ID) from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID

	if @RecordExists > 0

		BEGIN
			UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
	
			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID;

			SET @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].[DecompositionProcessLevel2]
			(
			   [DecompositionProjectID]
			  ,[DecompositionProcessLevel1ID]
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[Owner]
			  ,[CountrySpecific]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  ,[CreatedBy]
			  ,[CreatedDate]
			  )
			  values
			(
				 @DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
				, 1
				,@UserID
				,GETDATE()
			);

			SET @DecompositionProcessLevel2ID = SCOPE_IDENTITY();  
		END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2_Original]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 04-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2_Original]
	-- Add the parameters for the stored procedure here
       @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [int]
       ,@ProcessLevel2Title [varchar](100)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@CreatedBy [varchar](100)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = ProcessLevel2NodeId from Amplo.DecompositionProcessLevel2 where ProcessLevel2NodeId = @Processlevel2NodeID

	if @RecordExists > 0

	update Amplo.DecompositionProcessLevel2 set 
	
	   [DecompositionProjectID]=@DecompositionProjectID
      ,[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
      ,[ProcessLevel2NodeID] = @ProcessLevel2NodeID
      ,[ProcessLevel2Title] = @ProcessLevel2Title
      ,[Owner] = @Owner
      ,[CountrySpecific] = @CountrySpecific
      ,[LeafNodeFlag] = @LeafNodeFlag
      ,[CreatedBy] = @CreatedBy


	else
	insert into [Amplo].[DecompositionProcessLevel2]
	(
       [DecompositionProjectID]
      ,[DecompositionProcessLevel1ID]
      ,[ProcessLevel2NodeID]
      ,[ProcessLevel2Title]
      ,[Owner]
      ,[CountrySpecific]
      ,[LeafNodeFlag]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
	  )
	  values
	(
		@DecompositionProjectID
		,@DecompositionProcessLevel1ID
		,@ProcessLevel2NodeID
		,@ProcessLevel2Title
		,@Owner
		,@CountrySpecific
		,@LeafNodeFlag
		, 1
		,@CreatedBy
		,GetDate()
	);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2_WIP]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 11-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2_WIP]
	-- Add the parameters for the stored procedure here
        @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [varchar](100)
       ,@ProcessLevel2Title [varchar](50)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@Action [varchar](30)
	   ,@DecompositionProcessLevel2ID [int]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	DECLARE @PDecompositionProcessLevel2ID INT
	DECLARE @StatusLookupID [int]

    BEGIN TRY
--        BEGIN TRANSACTION;
	
	SELECT UPPER(@Action)
	IF UPPER(@Action) = N'MODIFY'

		BEGIN
	
			SELECT N'MODIFY'

		UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
	
--			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID;

	--		SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

		END

	ELSE IF UPPER(@Action) = N'ADD'

		BEGIN

		SELECT N'ÁDD'

			INSERT INTO [Amplo].[DecompositionProcessLevel2]
			(
			   [DecompositionProjectID]
			  ,[DecompositionProcessLevel1ID]
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[Owner]
			  ,[CountrySpecific]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  ,[CreatedBy]
			  ,[CreatedDate]
			  )
			  values
			(
				 @DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
				, 1
				,@UserID
				,GETDATE()
			);

			SELECT @PDecompositionProcessLevel2ID = SCOPE_IDENTITY() 
			SELECT @PDecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			select @StatusLookupID = StatusLookupID from Amplo.StatusLookup where Lookupcode='DECOMP_INPROGRESS';
			update Amplo.DecompositionProcessLevel1 set Status  = @StatusLookupID where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID  = @DecompositionProcessLevel1ID;

			END


	ELSE IF UPPER(@Action) = N'DELETE'

		BEGIN

		SELECT N'DELETE'

			UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ActiveFlag] = 0	
			  ,[ModifiedBy] = @UserID
			  ,[ModifiedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
	
--			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID;

	--		SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			select @StatusLookupID = StatusLookupID from Amplo.StatusLookup where Lookupcode='DECOMP_NEW';
			update Amplo.DecompositionProcessLevel1 set Status  = @StatusLookupID where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID  = @DecompositionProcessLevel1ID;

		END

--		RETURN @DecompositionProcessLevel2ID;
  --      COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels3]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels3]
	-- Add the parameters for the stored procedure here
          (
		    @DecompositionProjectID [int]
           ,@DecompositionProcessLevel1ID [int]
           ,@DecompositionProcessLevel2ID [int]
           ,@ProcessLevel3NodeID [varchar](50)
--          ,@ProcessLevel3Name [varchar](100)
           ,@ProcessLevel3Title [varchar](100)
           ,@Owner [varchar](100)
           ,@CountrySpecific [varchar](100)
           ,@LeafNodeFlag [bit]
--         ,@DisableDate [date]
           ,@UsreID [varchar](100)
		   ,@DecompositionProcessLevel3ID [int] OUTPUT
		   , @Action nvarchar(10)
		   ,@DecompositionProcessLevel3IDinput [int]
 		)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    BEGIN TRY
--        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]
	DECLARE @PDecompositionProcessLevel3ID [int]

	select  @RecordExists = count(ProcessLevel3NodeId) from Amplo.DecompositionProcessLevel3 where [DecompositionProjectID] = @DecompositionProjectID 
	AND DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND ProcessLevel3NodeId = @Processlevel3NodeID and ActiveFlag = 1

	if (@Action = 'update' or (@RecordExists > 0 and @Action != 'delete'))
		BEGIN
		update Amplo.DecompositionProcessLevel3 set 
			[ProcessLevel3Title] = @ProcessLevel3Title
			,[Owner] = @Owner
			,[CountrySpecific] = @CountrySpecific
			,[LeafNodeFlag] = @LeafNodeFlag
--			,[DisableDate] = @DisableDate
			,[ActiveFlag] = 1
			,[ModifiedBy] = @UsreID
			,[ModifiedDate]= GETDATE()
			WHERE [DecompositionProjectID] = @DecompositionProjectID 
			AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID

			select @PDecompositionProcessLevel3ID=DecompositionProcessLevel3ID from Amplo.DecompositionProcessLevel3 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel3NodeId

 = @Processlevel3NodeID;

			SET @DecompositionProcessLevel3ID = @PDecompositionProcessLevel3ID
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

			RETURN
			END
	else if @Action = 'add'
	BEGIN
	INSERT INTO [Amplo].[DecompositionProcessLevel3]
			   ([DecompositionProjectID]
			   ,[DecompositionProcessLevel1ID]
			   ,[DecompositionProcessLevel2ID]
			   ,[ProcessLevel3NodeID]
--			   ,[ProcessLevel3Name]
			   ,[ProcessLevel3Title]
			   ,[Owner]
			   ,[CountrySpecific]
			   ,[LeafNodeFlag]
--			   ,[DisableDate]
			   ,[ActiveFlag]
			   ,[CreatedBy]
			   ,[CreatedDate])
     VALUES
           (
				@DecompositionProjectID
			   ,@DecompositionProcessLevel1ID
			   ,@DecompositionProcessLevel2ID
			   ,@ProcessLevel3NodeID
			   --,@ProcessLevel3Name
			   ,@ProcessLevel3Title
			   ,@Owner
			   ,@CountrySpecific
			   ,@LeafNodeFlag
--			   ,@DisableDate
			   ,1
			   ,@UsreID
			   ,GETDATE()
			)

	SET @DecompositionProcessLevel3ID = SCOPE_IDENTITY();  
	SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

	END
	else if @Action = 'delete'
		BEGIN
		update Amplo.DecompositionProcessLevel3 set 
			 [ActiveFlag] = 0
			,[ModifiedBy] = @UsreID
			,[ModifiedDate]= GETDATE()
			WHERE DecompositionProcessLevel3ID = @DecompositionProcessLevel3IDinput

			select @PDecompositionProcessLevel3ID=DecompositionProcessLevel3ID from Amplo.DecompositionProcessLevel3 where [DecompositionProjectID] = @DecompositionProjectID 
			AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel3NodeId = @Processlevel3NodeID;

			SET @DecompositionProcessLevel3ID = @PDecompositionProcessLevel3ID
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

			RETURN
			END
--        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
   -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels5]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels5]
	-- Add the parameters for the stored procedure here
          (
			    @UserID [int]	
			   ,@DecompositionProjectID [int]
			   ,@DecompositionProcessLevel1ID [int]
			   ,@DecompositionProcessLevel2ID [int]
			   ,@DecompositionProcessLevel3ID [int]
			   ,@DecompositionProcessLevel4ID [int]
			   ,@ProcessLevel5NodeID [varchar](50)
			   ,@ProcessLevel5Title [varchar](100)
			   ,@LeafNodeFlag [bit]
			   ,@Owner [varchar](100)
			   ,@CountrySpecific [varchar](100)
--			   ,@DisableDate [date]
--			   ,@ActiveFlag [bit]
			   ,@DecompositionProcessLevel5ID [int] OUTPUT
			   , @Action nvarchar(10)
			   , @DecompositionProcessLevel5IDInput [int]
		)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;

    BEGIN TRY
--        BEGIN TRANSACTION;
	
			DECLARE @RecordExists [int]
			DECLARE @PDecompositionProcessLevel5ID int
			select  @RecordExists = count(ProcessLevel5NodeID) from Amplo.DecompositionProcessLevel5 
			where DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID 
			AND DecompositionProcessLevel2ID =  @DecompositionProcessLevel2ID 
			AND DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID 
			AND DecompositionProcessLevel4ID =  @DecompositionProcessLevel4ID 
			AND ProcessLevel5NodeId = @ProcessLevel5NodeID
			and ActiveFlag = 1

	if (@Action = 'update' or (@RecordExists > 0 and @Action != 'delete'))
	BEGIN
		UPDATE [Amplo].[DecompositionProcessLevel5]
		   SET 
--				[ProcessLevel5Name] = @ProcessLevel5Name
			   [ProcessLevel5Title] = @ProcessLevel5Title
--			  ,[ProcessLevel5Description] = @ProcessLevel5Description
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
--			  ,[DisableDate] = @DisableDate
			  ,[ActiveFlag] = 1
			  ,[ModifiedBy] = @UserID
			  ,[ModifiedDate] = GETDATE()
		 WHERE [DecompositionProjectID] = @DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			  AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			  AND [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
			  AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID
		select @PDecompositionProcessLevel5ID=DecompositionProcessLevel5ID from Amplo.DecompositionProcessLevel5 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel5NodeId 

= @Processlevel5NodeID;
		SET @DecompositionProcessLevel5ID = @PDecompositionProcessLevel5ID
		select @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID
		RETURN
	END

 else if @Action = 'add'
	begin
	 INSERT INTO [Amplo].[DecompositionProcessLevel5]
			   ([DecompositionProjectID]
			   ,[DecompositionProcessLevel1ID]
			   ,[DecompositionProcessLevel2ID]
			   ,[DecompositionProcessLevel3ID]
			   ,[DecompositionProcessLevel4ID]
			   ,[ProcessLevel5NodeID]
--			   ,[ProcessLevel5Name]
			   ,[ProcessLevel5Title]
--			   ,[ProcessLevel5Description]
			   ,[LeafNodeFlag]
			   ,[Owner]
			   ,[CountrySpecific]
--			   ,[DisableDate]
			   ,[ActiveFlag]
			   ,[CreatedBy]
			   ,[CreatedDate]
				)
		 VALUES
			   (@DecompositionProjectID
			   ,@DecompositionProcessLevel1ID
			   ,@DecompositionProcessLevel2ID
			   ,@DecompositionProcessLevel3ID
			   ,@DecompositionProcessLevel4ID
			   ,@ProcessLevel5NodeID
--			   ,<ProcessLevel5Name, varchar(100),>
			   ,@ProcessLevel5Title
--			   ,<ProcessLevel5Description, varchar(512),>
			   ,@LeafNodeFlag
			   ,@Owner
			   ,@CountrySpecific
--			   ,@DisableDate
			   ,1
			   ,@UserID
			   ,GETDATE()
				)
		SET @DecompositionProcessLevel5ID = SCOPE_IDENTITY();  
		select @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID

		end
		else if @Action = 'delete'
	BEGIN
		UPDATE [Amplo].[DecompositionProcessLevel5]
		   SET 
			   [ActiveFlag] = 0
			  ,[ModifiedBy] = @UserID
			  ,[ModifiedDate] = GETDATE()
		 WHERE DecompositionProcessLevel5ID = @DecompositionProcessLevel5IDInput
		select @PDecompositionProcessLevel5ID=DecompositionProcessLevel5ID from Amplo.DecompositionProcessLevel5 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel5NodeId 

= @Processlevel5NodeID;
		SET @DecompositionProcessLevel5ID = @PDecompositionProcessLevel5ID
		select @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID
		RETURN
	END
--        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionScoringCriteria]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 07-October-2019
-- Description:	This procedure updates Custom Scoring Criteria
-- =============================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionScoringCriteria]
	-- Add the parameters for the stored procedure here
	@UserID [int]
	,@DecompositionProjectID [int]
	,@DecompositionProcessLevel1ID [int]
	,@ScoreCriteriaTitle [varchar](100)
	,@DecompositionScoreCriteriaID [int]
	,@UsedFlag [bit]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
        BEGIN TRY
    BEGIN TRANSACTION;


	Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID
	BEGIN
    -- Insert statements for procedure here
		UPDATE [Amplo].[DecompositionScoreCriteriaProject]
		   SET [ScoreCriteriaTitle] = @ScoreCriteriaTitle
			  ,[UsedFlag] = @UsedFlag
		 WHERE [ClientID] = @ClientID
			   AND [DecompositionProjectID] = @DecompositionProjectID
			   AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			   AND [DecompositionScoreCriteriaID] = @DecompositionScoreCriteriaID

			-- Successfull updation of records
			SELECT messageName from Amplo.[Message] where MessageID = 1025
	END
    
	COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		-- Rollback any active or uncommittable transactions before
		-- inserting information in the ErrorLog
		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION;
		END

		EXECUTE [Amplo].[uspLogError];
	END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionStatus]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionStatus]
(
    -- Add the parameters for the stored procedure here
       @DecompositionProjectID [int],
       @DecompositionProcessLevel1ID [int],
	   @Status int
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
			--Update Status as Inprogress
			update Amplo.DecompositionProcessLevel1
			set status = @Status where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionTreeViewHeatMapScores]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionTreeViewHeatMapScores] AS
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateEnterpriseDIVATeam]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	This procedure updates Enterprise DIVA team
-- =============================================
CREATE PROCEDURE [Amplo].[uspUpdateEnterpriseDIVATeam]

-- Add the parameters for the stored procedure here
        @UserID [int],
		@DIVAUserID [int],
        @EmailAddress [nvarchar](100),
        @FirstName [varchar](100),
--      @MiddleName [varchar](50),
        @LastName [varchar](100),
		@UserType [int],
		@DisableDate [date],
		@UserIPAddress [varchar](50),
		@UserStatusID [int]
		
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @UserID

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    DECLARE @clientID int
    Select @clientID = ClientID from Amplo.[User] where @UserID = UserID
    
    BEGIN
        --Set every to add on user
        Update Amplo.[UserDIVATeam]
        Set [FirstName] = @FirstName 
        ,[LastName] = @LastName
        ,[Email] = @EmailAddress
       ,[ActiveFlag] = 1
       ,[UserTypeID] = @UserType
       ,[UserStatusID] = @UserStatusID
  	   ,[DisableDate] = @DisableDate
       ,[ModifiedBy] = @UserID
       ,[ModifiedDate]= GETDATE()
		where UserDIVATeamID = @DIVAUserID

       select MessageName from Amplo.[Message] where MessageID = 1024   --Successful updation of superusers message returned
    END


    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateEnterpriseUserProfileDetails]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =======================================================================================
-- Author:		Srinivas
-- Create date: 22-October-2019
-- Description:	This procedure updated User Profile details
-- =======================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateEnterpriseUserProfileDetails]
	-- Add the parameters for the stored procedure here
       @UserID [int]
      ,@FirstName [varchar](100)
      ,@MiddleName [varchar](50)
      ,@LastName [varchar](100)
      ,@PhoneNumber [nvarchar](100)
	  ,@ProfilePhotoPath [nvarchar](100)
--      ,@EmailAddress nvarchar(256)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   -- Insert statements for procedure here
    BEGIN TRY

	UPDATE [Amplo].[User]
	   SET 
		   [FirstName] = @FirstName
		  ,[MiddleName] = @MiddleName
		  ,[LastName] = @LastName
		  ,[PhoneNumber] = @PhoneNumber
		  ,[ProfilePhotoPath] = @ProfilePhotoPath
--		  ,[EmailAddress] = @EmailAddress
	 WHERE UserID=@UserID

    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateKPI]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Biswajit
-- Create date: 22-October-2019
-- Description:	This procedure updates KPI
-- =============================================
CREATE PROCEDURE [Amplo].[uspUpdateKPI]
	-- Add the parameters for the stored procedure here
		   @KpiId [int]
          ,@UserID [varchar](100)
		  ,@KPITitle [varchar](100)
		  ,@BusinessOutcome [varchar](512)
          ,@BusinessMetrics [varchar](256) 
          ,@PersonaImpacted [varchar](256)
          ,@EstimatedSavings [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    BEGIN TRY
    BEGIN TRANSACTION;
	if(@KpiId is not null and @KpiId != 0)
	begin
		update [Amplo].[KPI]
		set 
			KPITItle = @KPITitle
			,BusinessOutcome = @BusinessOutcome 
			, BusinessMetrics = @BusinessMetrics
			, PersonaImpacted = @PersonaImpacted
			, EstimatedSavings = @EstimatedSavings
			, ModifiedBy = @UserID
			, ModifiedDate = GETDATE()
		where KpiId = @KpiId
	end
    Select MessageName from Amplo.[Message] where MessageID = 1026

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateKPIControlLevers]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 11-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateKPIControlLevers]
	-- Add the parameters for the stored procedure here
        @USERID [int]
	   ,@KPIID [int]
       ,@KPIControlLeversID [int]
       ,@ControlLeversTitle [varchar](512)
       ,@PersonaImpacted [varchar](512)
	   ,@Action [varchar](30)
	   ,@KPIInhibitors [NVARCHAR](MAX)
	   ,@KPICapabilities [NVARCHAR](MAX)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE
    @counter    INT = 1,
    @max        INT = 0,
	@KPIControlLeverID [int],
	@KPIInhibitorsID [int],
	@KPICapabilitiesID int,
	@InhibitorsTitle VARCHAR(512),

    @CapabilitiesTitle VARCHAR(512),
	@ROWNumber int

    -- Insert statements for procedure here
	
    BEGIN TRY
        BEGIN TRANSACTION;
	
	IF UPPER(@Action) = N'MODIFY'

		BEGIN
	
	
			UPDATE [Amplo].[KPIControlLevers]
			   SET [ControlLeversTitle] = @ControlLeversTitle
				  ,[PersonaImpacted] = @PersonaImpacted
				  ,[ModifiedBy] = @USERID
				  ,[ModifiedDate] = GETDATE()
			 WHERE [KPIID] = @KPIID AND [KPIControlLeversID] = @KPIControlLeversID

		/* 
		This section is for KPI Inhibitors details to update and delete 
		*/


			SELECT ID, KPIInhibitorsID, InhibitorsTitle, Action
			INTO #tblInhibitors
			FROM OPENJSON (@KPIInhibitors, '$.root')
			WITH (
			ID int,
			KPIInhibitorsID INT,
			InhibitorsTitle VARCHAR(512),
			Action VARCHAR(30)
			);

				SELECT @max = COUNT(1) FROM #tblInhibitors

				while @counter <= @max
					BEGIN
						SELECT @KPIInhibitorsID = KPIInhibitorsID, @InhibitorsTitle = InhibitorsTitle, @Action = Action 
						FROM #tblInhibitors WHERE ID = @counter
						select UPPER(@Action) AS INHIBITORACTIONS

						IF UPPER(@Action) = 'ADD'
						BEGIN
							INSERT INTO [Amplo].[KPIInhibitors]
								([KPIControlLeversID]
								,[InhibitorsName]
								,[InhibitorsTitle]
								,[ActiveFlag]
								,[CreatedBy]
								,[CreatedDate]
								)
							VALUES
								(@KPIControlLeverID
								,'Inhibitors Name'
								,@InhibitorsTitle
								,1
								,@UserID
								,GETDATE()
								)
						END
						ELSE IF UPPER(@Action) = 'MODIFY'
						BEGIN
							UPDATE [Amplo].[KPIInhibitors]
							SET 
								 [InhibitorsTitle] = @InhibitorsTitle
								,[ActiveFlag] = 1
								,[ModifiedBy] = @USERID
								,[ModifiedDate] = GETDATE()
							WHERE [KPIControlLeversID] = @KPIControlLeversID AND [KPIInhibitorsID] = @KPIInhibitorsID
						END
						ELSE IF UPPER(@Action) = 'DELETE'
							UPDATE [Amplo].[KPIInhibitors]
							SET 
								 [ActiveFlag] = 0
								,[ModifiedBy] = @USERID
								,[ModifiedDate] = GETDATE()
							WHERE [KPIControlLeversID] = @KPIControlLeversID AND [KPIInhibitorsID] = @KPIInhibitorsID

						SET @counter = @counter + 1

					END


		/* 
		This section is for KPI Capabilities details to update and delete 
		*/

			SET @counter = 1
			SELECT ID, [KPICapabilitiesID], [CapabilitiesTitle], Action
			INTO #tblCapabiliities
			FROM OPENJSON (@KPICapabilities, '$.root')
			WITH (
			ID int,
			KPICapabilitiesID INT,
			CapabilitiesTitle VARCHAR(512),
			Action VARCHAR(30)
			);

				SELECT @max = COUNT(1) FROM #tblCapabiliities
				SELECT @max 
				while @counter <= @max
					BEGIN
						select UPPER(@Action) AS INHIBITORACTIONS

						SELECT @KPICapabilitiesID = KPICapabilitiesID, @CapabilitiesTitle = CapabilitiesTitle, @Action = Action 
						FROM #tblCapabiliities WHERE ID = @counter
						IF UPPER(@Action) = 'ADD'
						BEGIN
							INSERT INTO [Amplo].[KPICapabilities]
							([KPIControlLeversID]
							,[CapabilitiesName]
							,[CapabilitiesTitle]
							,[ActiveFlag]
							,[CreatedBy]
							,[CreatedDate]
							)
							VALUES
							(@KPIControlLeverID
							,'Capabilities Name'
							,@CapabilitiesTitle
							,1
							,@UserID
							,GETDATE()
							);
						END
						IF UPPER(@Action) = 'MODIFY'
						BEGIN
							UPDATE [Amplo].[KPICapabilities]
							SET 
								 [CapabilitiesTitle] = @CapabilitiesTitle
								,[ActiveFlag] = 1
								,[ModifiedBy] = @USERID
								,[ModifiedDate] = GETDATE()
							WHERE [KPIControlLeversID] = @KPIControlLeversID AND KPICapabilitiesID = @KPICapabilitiesID
						END
						ELSE IF UPPER(@Action) = N'DELETE'
							UPDATE [Amplo].[KPICapabilities]
							SET 
								 [ActiveFlag] = 0
								,[ModifiedBy] = @USERID
								,[ModifiedDate] = GETDATE()
							WHERE [KPIControlLeversID] = @KPIControlLeversID AND KPICapabilitiesID = @KPICapabilitiesID
					
						SET @counter = @counter + 1
					END
		END




	/*ELSE IF UPPER(@Action) = N'ADD'

		BEGIN

		SELECT N'ÁDD'





			END
*/

	ELSE IF UPPER(@Action) = N'DELETE'

		BEGIN

		SELECT N'DELETE'

			UPDATE [Amplo].[KPIControlLevers]
			SET ActiveFlag = 0
			WHERE [KPIID] = @KPIID AND [KPIControlLeversID] = @KPIControlLeversID

		END

    Select messageName from Amplo.[Message] where MessageID = 1027;

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [AMPLO].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateSuperusers]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateSuperusers]
    (
        @id int,
        @newSuperUsers varchar(100)
    )
        /*
        @id - Logged In User ID
        @newSuperUsers - Comma separated list of user IDs to be set as new super users 
        */
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    DECLARE @clientID int
    Select @clientID = ClientID from Amplo.[User] where @id = UserID
    
    DECLARE @receivedUserIDs TABLE (
    userID int
    );

    INSERT INTO @receivedUserIDs
    SELECT * 
    FROM  String_Split(@newSuperUsers, ',')

    DECLARE @validUserIDs TABLE (
    userID int
    );

    INSERT INTO @validUserIDs
    SELECT rcvd.userID
    FROM  @receivedUserIDs rcvd inner join Amplo.[User] usr ON rcvd.userID = usr.UserID
    where usr.ClientID = @clientID and usr.ActiveFlag = 1 and usr.EmailValidationStatus = 1 and usr.UserStatusID = 1 and ISNULL(usr.DisableDate, GETDATE() +1) > GETDATE()
    
    declare @countOfIds INT
    select @countOfIds = Count(userID) from @validUserIDs

    if @countOfIds = 1 or @countOfIds = 2
    BEGIN
        --Set every to add on user
        Update Amplo.[User]
        Set UserTypeID = 2, UserModifiedBy = @id, UserModifiedDate = GETDATE()
        where ClientID = @clientID

        --Set selected users as super users
        Update Amplo.[User]
        Set UserTypeID = 1, UserModifiedBy = @id, UserModifiedDate = GETDATE()
        from Amplo.[User] usr inner join @validUserIDs val on usr.UserID = val.userID

        select MessageName from Amplo.[Message] where MessageID = 1017   --Successful updation of superusers message returned
    END

    ELSE
    BEGIN
        -- Message returned - Invalid IDs sent
        select MessageName from Amplo.Message where MessageID = 1016
    END

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;

END;
GO
/****** Object:  StoredProcedure [Amplo].[uspVerifyUserEmail]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspVerifyUserEmail]
    (
        @PHashCode [varchar](512)
    )
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;
    
    DECLARE @PAvailable INT
    SELECT @PAvailable = Count(UserID) from Amplo.EmailVerification WHERE VerificationHashCode = @PHashCode AND ActiveFlag=1

    IF (@PAvailable<1)
        BEGIN
            SELECT MessageName from Amplo.[Message] WHERE MessageID=10
        END

    ELSE
        BEGIN

            Declare @PUserID INT
            Select @PUserID = UserID from Amplo.EmailVerification WHERE VerificationHashCode = @PHashCode AND ActiveFlag=1 
            
            UPDATE Amplo.[EmailVerification]
            SET VerificationFlag = 1, VerificationDate = GETDATE(), ActiveFlag=0 WHERE VerificationHashCode = @PHashCode AND ActiveFlag=1
            
            UPDATE Amplo.[User]
            SET EmailValidationStatus=1 WHERE UserID = @PUserID

            SELECT MessageName from Amplo.[Message] WHERE MessageID=9
        END
    
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END;
GO
/****** Object:  StoredProcedure [dbo].[uspGetDecompositionReportAverageScore]    Script Date: 26-11-2019 15:06:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 11-November-2019
-- Description:	This procedure retrieves average score for capability modelling workbench
-- =============================================
CREATE PROCEDURE [dbo].[uspGetDecompositionReportAverageScore]
	-- Add the parameters for the stored procedure here
@ProjectID [int]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
select b.FunctionTilte FunctionTitle, c.PhaseTitle PhaseTitile, avg(d.Level1_Calc_Aggr_Score) AvgScore from Amplo.DecompositionProcessLevel1 a
inner join Amplo.DecompositionFunction b on a.FunctionID = b.DecompositionFunctionID
inner join Amplo.DecompositionPhase c on c.DecompositionPhaseID = a.PhaseID
inner join Amplo.DecompositionProcessLevel1score d on a.DecompositionProcessLevel1ID = d.DecompositionProcessLevel1ID
where a.DecompositionProjectID = @ProjectID
group by b.FunctionTilte, c.PhaseTitle

END
GO
ALTER DATABASE [DIVAMT2] SET  READ_WRITE 
GO
