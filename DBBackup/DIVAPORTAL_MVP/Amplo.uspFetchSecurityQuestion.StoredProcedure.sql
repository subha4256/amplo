USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchSecurityQuestion]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspFetchSecurityQuestion]
(
    @PUserID [int]
)
AS
BEGIN
    SET NOCOUNT ON;
    --fetches security question and answer of the resp
    Declare @isSecuritySet INT
    SELECT @isSecuritySet=Count(*) FROM [Password] WHERE UserID = @PUserID
    IF(@isSecuritySet>0)
    BEGIN

        SELECT [PasswordQuestion].PasswordQuestion,[Password].PasswordAnswer 
        FROM [Amplo].[Password]
        INNER JOIN [Amplo].[PasswordQuestion]
        ON [Password].PasswordQuestionID = [PasswordQuestion].PasswordQuestionID
        WHERE [Password].UserID = @PUserID
    END
    ELSE
    BEGIN
        SELECT MessageName FROM Amplo.Message WHERE MessageID = 11
    END
  
  END;

GO
