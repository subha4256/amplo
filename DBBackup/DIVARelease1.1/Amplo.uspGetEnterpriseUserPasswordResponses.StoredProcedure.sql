USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseUserPasswordResponses]    Script Date: 1/9/2020 6:50:44 PM ******/
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
