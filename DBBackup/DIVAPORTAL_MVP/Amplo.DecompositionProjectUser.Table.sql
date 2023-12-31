USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[DecompositionProjectUser]    Script Date: 20-11-2019 15:28:24 ******/
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
