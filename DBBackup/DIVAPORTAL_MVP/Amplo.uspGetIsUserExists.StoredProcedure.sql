USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetIsUserExists]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		uspGetIsUserExists
-- Create date: 21-October-2019
-- Description:	This procedure verified whether the user exists or not
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetIsUserExists]
	-- Add the parameters for the stored procedure here
	@PEmailAddress [nvarchar](256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	BEGIN TRY
    DECLARE @countRowUser int
	DECLARE @RetVal int
	SELECT @countRowUser = Count(*) FROM [Amplo].[User]  WHERE UPPER(TRIM(EmailAddress)) = UPPER(TRIM(@PEmailAddress));
	    
	IF (@countRowUser>0)
        BEGIN
            SELECT @RetVal=1 
		END
	else
		BEGIN
			SELECT @RetVal=0 
		END
	SELECT  @RetVal AS 'iSUserExists'
    END TRY


    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
