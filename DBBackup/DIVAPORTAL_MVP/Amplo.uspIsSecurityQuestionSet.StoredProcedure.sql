USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspIsSecurityQuestionSet]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspIsSecurityQuestionSet]
(
    @PUserName [varchar](100)
)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @count INT
    SELECT @count = COUNT(*) FROM [Password] WHERE UserID = (SELECT userID FROM [User] WHERE UserName = @PUserName)
    IF(@count>0)
    BEGIN
        RETURN 'Security Question is set'
    END
    ELSE
    BEGIN
        RETURN 'Security Question is not set'
    END  
  END;


GO
