USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[BenchmarkProjectUser]    Script Date: 20-11-2019 15:28:24 ******/
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
ALTER TABLE [Amplo].[BenchmarkProjectUser] ADD  CONSTRAINT [DF_BenchmarkProjectUser_ActivityFlag]  DEFAULT ((1)) FOR [ActivityFlag]
GO
ALTER TABLE [Amplo].[BenchmarkProjectUser] ADD  DEFAULT ((1)) FOR [ActiveFlag]
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
