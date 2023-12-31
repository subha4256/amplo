USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetIndustryVerticalSubvertical]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetIndustryVerticalSubvertical]
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
    BEGIN TRANSACTION;
    
    -- Use query to list out all industry types
        
        
        SELECT v.IndustryVerticalID, v.IndustryVerticalName, sv.IndustrySubVerticalID, sv.IndustrySubVerticalName
        FROM (select * from Amplo.AmploIndustryVertical where ActiveFlag = 1) v
        left Join (select * from Amplo.AmploIndustrySubVertical where ActiveFlag = 1) sv
        ON v.IndustryVerticalID = sv.IndustryVerticalID
        order by v.IndustryVerticalID

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;

END;




GO
