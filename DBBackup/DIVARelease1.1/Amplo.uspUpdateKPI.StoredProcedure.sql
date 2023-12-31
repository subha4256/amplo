USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateKPI]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Biswajit
-- Create date: 22-October-2019
-- Description:	This procedure updates KPI
-- =============================================
CREATE PROCEDURE [Amplo].[uspUpdateKPI]
	-- Add the parameters for the stored procedure here
		   @KpiId [int]
          ,@UserID [varchar](100)
		  ,@KPITitle [varchar](100)
		  ,@BusinessOutcome [varchar](512)
          ,@BusinessMetrics [varchar](256) 
          ,@PersonaImpacted [varchar](256)
          ,@EstimatedSavings [varchar](100)
--KPI Sets Implementation
		  ,@ExpectedTargetGrowth [nvarchar](100)
		  ,@UnitOfMeasurement [nvarchar](50)
		  ,@TargetDate [datetime]
		  ,@Improvementbasis [varchar](50)
		  ,@AuditFrequency [varchar](50)

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
		set 
			KPITItle = @KPITitle
			,BusinessOutcome = @BusinessOutcome 
			, BusinessMetrics = @BusinessMetrics
			, PersonaImpacted = @PersonaImpacted
			, EstimatedSavings = @EstimatedSavings
			, ModifiedBy = @UserID
			, ModifiedDate = GETDATE()
			,ExpectedTargetGrowth = @ExpectedTargetGrowth
			,UnitOfMeasurement = @UnitOfMeasurement 
			,TargetDate = @TargetDate 
			,Improvementbasis = @Improvementbasis
			,AuditFrequency = @AuditFrequency 
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
