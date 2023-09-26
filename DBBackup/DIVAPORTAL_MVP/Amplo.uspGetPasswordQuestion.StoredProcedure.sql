USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetPasswordQuestion]    Script Date: 20-11-2019 15:28:24 ******/
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
