USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetCompanyProfileQuestions]    Script Date: 1/9/2020 6:50:44 PM ******/
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
