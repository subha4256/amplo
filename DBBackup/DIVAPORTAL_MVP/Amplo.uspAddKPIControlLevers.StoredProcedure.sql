USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddKPIControlLevers]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================
-- Author:		Srinivas
-- Create date: 15-October-2019
-- Description:	This procedure creates KPI ControlLevers
-- =====================================================
CREATE PROCEDURE [Amplo].[uspAddKPIControlLevers]
	-- Add the parameters for the stored procedure here
           @UserID [varchar](100)
		  ,@KPIID [int]
          ,@ControlLeversTitle [varchar](256)
          ,@PersonaImpacted [varchar](256)
		  ,@KPIInhibitors [NVARCHAR](MAX)
		  ,@KPICapabilities [NVARCHAR](MAX)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    BEGIN TRY
    BEGIN TRANSACTION;

	DECLARE @KPIControlLeverID [int]
	DECLARE
    @counter    INT = 1,
    @max        INT = 0,
	@InhibitorsTitle VARCHAR(512),
    @CapabilitiesTitle VARCHAR(512),
	@ROWNumber int

    -- Insert statements for procedure here
INSERT INTO [Amplo].[KPIControlLevers]
           ([KPIID]
           ,[ControlLeversName]
           ,[ControlLeversTitle]
           ,[PersonaImpacted]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate]
			)
     VALUES
           (@KPIID
           ,'Control Levers'
		   ,@ControlLeversTitle
           ,@PersonaImpacted
           ,1
           ,@UserID
           ,GETDATE()
		)

		select @KPIControlLeverID = SCOPE_IDENTITY()
		select @KPIControlLeverID as KPIControlLeverID


/* KPI Inhibitors Deatils Persistence*/


		SELECT ID, Name
		INTO #tblInhibitors
		FROM OPENJSON (@KPIInhibitors, '$.root')
		WITH (
		ID INT,
        Name NVARCHAR(512)
		)

		SELECT @max = COUNT(1) FROM #tblInhibitors


	while @counter <= @max
		BEGIN

		-- Do whatever you want with each row in your table variable filtering by the Id column
		SELECT @InhibitorsTitle = Name
		FROM #tblInhibitors
		WHERE ID = @counter

		INSERT INTO [Amplo].[KPIInhibitors]
			([KPIControlLeversID]
			,[InhibitorsName]
			,[InhibitorsTitle]
			,[ActiveFlag]
			,[CreatedBy]
			,[CreatedDate]
			)
		VALUES
			(@KPIControlLeverID
			,'Inhibitors Name'
			,@InhibitorsTitle
			,1
			,@UserID
			,GETDATE()
			)

		SET @counter = @counter + 1
	END

/* KPI Capabilities Deatils Persistence*/

		SELECT ID, Name
		INTO #tblKPICapabilities
		FROM OPENJSON (@KPICapabilities, '$.root')
		WITH (
		ID INT,
        Name NVARCHAR(512)
		)

		SET @counter = 1;
		SELECT @max = COUNT(1) FROM #tblKPICapabilities;

		while @counter <= @max
		BEGIN
			-- Do whatever you want with each row in your table variable filtering by the Id column
			SELECT @CapabilitiesTitle = Name
			FROM #tblKPICapabilities
			WHERE ID = @counter

			INSERT INTO [Amplo].[KPICapabilities]
				([KPIControlLeversID]
				,[CapabilitiesName]
				,[CapabilitiesTitle]
				,[ActiveFlag]
				,[CreatedBy]
				,[CreatedDate]
				)
			VALUES
				(@KPIControlLeverID
				,'Capabilities Name'
				,@CapabilitiesTitle
				,1
				,@UserID
				,GETDATE()
				);
			SET @counter = @counter + 1
		END

    Select messageName from Amplo.[Message] where MessageID = 1027;

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [AMPLO].[uspLogError];
    END CATCH;

END
GO
