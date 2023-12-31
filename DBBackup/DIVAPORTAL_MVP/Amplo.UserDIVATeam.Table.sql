USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[UserDIVATeam]    Script Date: 20-11-2019 15:28:24 ******/
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
ALTER TABLE [Amplo].[UserDIVATeam] ADD  CONSTRAINT [DF_UserDIVATeam_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
