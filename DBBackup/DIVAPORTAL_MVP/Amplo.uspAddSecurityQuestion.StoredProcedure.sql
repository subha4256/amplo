USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddSecurityQuestion]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspAddSecurityQuestion]
    (
        @UserID [int],
        @PasswordQuestionID [int],
--        @PasswordQuestion [nvarchar](512),
        @PasswordAnswer[nvarchar](512)
    )
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;
    INSERT INTO [Password]
    (
      [UserID],
      [PasswordQuestionID],
      [PasswordAnswer],
      [BeginDate],
      [EndDate],
      [ActiveFlag],
      [CreatedBy],
      [CreatedOn],
	  [ModifedBy],
	  [ModifiedOn]
    )
    VALUES
    (
        @UserID,
        @PasswordQuestionID,
        @PasswordAnswer,
        GETDATE(),
        NULL,
        1,
        @UserID,
        GETDATE(),
        @UserID,
        GETDATE()
    )

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
