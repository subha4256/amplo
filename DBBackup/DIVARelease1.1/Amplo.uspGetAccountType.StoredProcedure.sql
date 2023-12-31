USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetAccountType]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetAccountType]
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
		select [UserTypeID], [UserTypeName], [UserTypeDescription]
		from [Amplo].[UserType]
		where ISNULL([UserTypeIsEnabled], 'Yes') = 'yes'
		and UserTypeDescription = 'Amplo Internal User'
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
