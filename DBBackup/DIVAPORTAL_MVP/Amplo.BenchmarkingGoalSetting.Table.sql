USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[BenchmarkingGoalSetting]    Script Date: 20-11-2019 15:28:24 ******/
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
ALTER TABLE [Amplo].[BenchmarkingGoalSetting]  WITH CHECK ADD  CONSTRAINT [FK_AmploBenchmarkingGoalSetting_Client] FOREIGN KEY([ClientID])
REFERENCES [Amplo].[Client] ([ClientID])
GO
ALTER TABLE [Amplo].[BenchmarkingGoalSetting] CHECK CONSTRAINT [FK_AmploBenchmarkingGoalSetting_Client]
GO
