USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[BenchmarkGoalSetting]    Script Date: 20-11-2019 15:28:24 ******/
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
ALTER TABLE [Amplo].[BenchmarkGoalSetting]  WITH CHECK ADD  CONSTRAINT [FK_BenchmarkingGoalSetting_BenchmarkProject1] FOREIGN KEY([BenchmarkProjectID])
REFERENCES [Amplo].[BenchmarkProject] ([BenchmarkProjectID])
GO
ALTER TABLE [Amplo].[BenchmarkGoalSetting] CHECK CONSTRAINT [FK_BenchmarkingGoalSetting_BenchmarkProject1]
GO
