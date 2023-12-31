USE [DIVAPORTAL]
GO
/****** Object:  Table [Amplo].[Role]    Script Date: 20-11-2019 15:28:24 ******/
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
ALTER TABLE [Amplo].[Role] ADD  CONSTRAINT [DF_Amplo_Role_ActiveFlag]  DEFAULT ((1)) FOR [ActiveFlag]
GO
