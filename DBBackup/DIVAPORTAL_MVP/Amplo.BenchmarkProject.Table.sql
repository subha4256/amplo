USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[BenchmarkProject]    Script Date: 20-11-2019 15:28:24 ******/
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
ALTER TABLE [Amplo].[BenchmarkProject] ADD  DEFAULT ((0)) FOR [DisabledFlag]
GO
ALTER TABLE [Amplo].[BenchmarkProject] ADD  DEFAULT ((0)) FOR [DisableFlag]
GO
ALTER TABLE [Amplo].[BenchmarkProject] ADD  CONSTRAINT [DF_BenchmarkProject_LockFlag]  DEFAULT ((0)) FOR [LockedFlag]
GO
ALTER TABLE [Amplo].[BenchmarkProject]  WITH CHECK ADD  CONSTRAINT [FK_AmploBenchmarkProject_BenchmarkProjectStatus] FOREIGN KEY([status])
REFERENCES [Amplo].[BenchmarkStatus] ([StatusID])
GO
ALTER TABLE [Amplo].[BenchmarkProject] CHECK CONSTRAINT [FK_AmploBenchmarkProject_BenchmarkProjectStatus]
GO
