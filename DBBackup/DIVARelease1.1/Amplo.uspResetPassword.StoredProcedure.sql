USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspResetPassword]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspResetPassword]
(
    @PUserName [varchar](100),
    @PPassword [varchar](100)
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
    BEGIN TRANSACTION;
  
  
    --reset user Password
    UPDATE Amplo.[User] 
    SET UserPassword = @PPassword WHERE UserName = @PUserName;
  
    if @@ROWCOUNT > 0
    begin
       Select MessageName from Amplo.[Message] where MessageID = 1014
    end
    
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
    

  END;


GO
