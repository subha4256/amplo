USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspDeleteKPI]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Biswajit
-- Create date: 22-October-2019
-- Description:	This procedure updates KPI
-- =============================================
create PROCEDURE [Amplo].[uspDeleteKPI]
	-- Add the parameters for the stored procedure here
		   @KpiId [int]
          ,@UserID [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    BEGIN TRY
    BEGIN TRANSACTION;
	if(@KpiId is not null and @KpiId != 0)
	begin
		update [Amplo].[KPI]
		set ActiveFlag = 0
			, ModifiedBy = @UserID
			, ModifiedDate = GETDATE()
		where KpiId = @KpiId
	end
    Select MessageName from Amplo.[Message] where MessageID = 1026

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

END
GO
