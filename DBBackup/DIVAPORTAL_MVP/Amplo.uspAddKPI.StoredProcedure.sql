USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddKPI]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 15-October-2019
-- Description:	This procedure creates KPI
-- =============================================
CREATE PROCEDURE [Amplo].[uspAddKPI]
	-- Add the parameters for the stored procedure here
           @UserID [varchar](100)
		  ,@BusinessOutcome [varchar](512)
          ,@BusinessMetrics [varchar](256) 
          ,@PersonaImpacted [varchar](256)
          ,@EstimatedSavings [varchar](100)
		  , @KpiTitle [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @KPIID [INT]

	Declare @clientid as INT
	Select @clientid = ClientID from Amplo.[User] where UserID = @UserID

    BEGIN TRY
    BEGIN TRANSACTION;

    -- Insert statements for procedure here
	INSERT INTO [Amplo].[KPI]
			   (ClientID
			   ,[KPIName]
			   ,[KPITitle]
			   ,[BusinessOutcome]
			   ,[BusinessMetrics]
			   ,[PersonaImpacted]
			   ,[EstimatedSavings]
			   ,[ActiveFlag]
			   ,[CreatedBy]
			   ,[CreatedDate]
				)
		 VALUES
			   (
				@clientid
			   ,'KPI Name' 
			   ,@KpiTitle
			   ,@BusinessOutcome 
			   ,@BusinessMetrics
			   ,@PersonaImpacted
			   ,@EstimatedSavings
			   ,1
			   ,@UserID
			   ,GETDATE()
				)

		   SELECT @KPIID = SCOPE_IDENTITY();
		   SELECT @KPIID AS KPIID;

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
