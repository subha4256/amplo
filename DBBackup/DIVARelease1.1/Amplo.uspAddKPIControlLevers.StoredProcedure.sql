USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddKPIControlLevers]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [Amplo].[uspAddKPIControlLevers]
	-- Add the parameters for the stored procedure here
           @UserID [varchar](100)
		  ,@KPIID [int]
          ,@ControlLeversTitle [varchar](256)
          ,@PersonaImpacted [varchar](256)
		  ,@KPIInhibitors [NVARCHAR](MAX)
		  ,@KPICapabilities [NVARCHAR](MAX)
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

	DECLARE @KPIControlLeverID [int]
	DECLARE
    @counter    INT = 1,
    @max        INT = 0,
	@InhibitorsTitle VARCHAR(512),
    @CapabilitiesTitle VARCHAR(512),
	@Probability nvarchar(20),
	@ImpactCost nvarchar(50),
	@InvestmentRequired [nvarchar](50),
	@ExpectedBy [datetime],
	@ROWNumber int, @Capex nvarchar(100),
		@Opex nvarchar(100),
		@Frequency nvarchar(100), @CapexSpreadYears int

    -- Insert statements for procedure here
INSERT INTO [Amplo].[KPIControlLevers]
           ([KPIID]
           ,[ControlLeversName]
           ,[ControlLeversTitle]
           ,[PersonaImpacted]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate]
		   ,[ExpectedTargetGrowth]
	 	   ,[UnitOfMeasurement]
		   ,[TargetDate]
		   ,[Improvementbasis]
		   ,[AuditFrequency]
			)
     VALUES
           (@KPIID
           ,'Control Levers'
		   ,@ControlLeversTitle
           ,@PersonaImpacted
           ,1
           ,@UserID
           ,GETDATE()
		   ,@ExpectedTargetGrowth
		   ,@UnitOfMeasurement
		   ,@TargetDate
		   ,@Improvementbasis
		   ,@AuditFrequency
		)

		select @KPIControlLeverID = SCOPE_IDENTITY()
		select @KPIControlLeverID as KPIControlLeverID


/* KPI Inhibitors Deatils Persistence*/


		SELECT ID, Name, Probability, ImpactCost
		INTO #tblInhibitors
		FROM OPENJSON (@KPIInhibitors, '$.root')
		WITH (
		ID INT,
        Name NVARCHAR(512),
		Probability [nvarchar](20),
		ImpactCost [nvarchar](50)
		)

		SELECT @max = COUNT(1) FROM #tblInhibitors


	while @counter <= @max
		BEGIN

		-- Do whatever you want with each row in your table variable filtering by the Id column
		SELECT @InhibitorsTitle = Name, @Probability= Probability, @ImpactCost=ImpactCost FROM #tblInhibitors
		WHERE ID = @counter

		INSERT INTO [Amplo].[KPIInhibitors]
			([KPIControlLeversID]
			,[InhibitorsName]
			,[InhibitorsTitle]
			,[Probability]
			,[ImpactCost]
			,[ActiveFlag]
			,[CreatedBy]
			,[CreatedDate]
			)
		VALUES
			(@KPIControlLeverID
			,'Inhibitors Name'
			,@InhibitorsTitle
			,@Probability
			,@ImpactCost
			,1
			,@UserID
			,GETDATE()
			)

		SET @counter = @counter + 1
	END

/* KPI Capabilities Deatils Persistence*/

		SELECT ID, Name, ExpectedBy
		INTO #tblKPICapabilities
		FROM OPENJSON (@KPICapabilities, '$.root')
		WITH (
		ID INT,
        Name NVARCHAR(512),
		ExpectedBy datetime,
		Capex nvarchar(100),
		Opex nvarchar(100),
		Frequency nvarchar(100),
		CapexSpreadYears int
		)

		SET @counter = 1;
		SELECT @max = COUNT(1) FROM #tblKPICapabilities;

		while @counter <= @max
		BEGIN
			-- Do whatever you want with each row in your table variable filtering by the Id column
			SELECT @CapabilitiesTitle = Name, @ExpectedBy = ExpectedBy
			, @Capex = Capex, @Opex = Opex, @Frequency = Frequency, @CapexSpreadYears = CapexSpreadYears
			FROM #tblKPICapabilities
			WHERE ID = @counter

			INSERT INTO [Amplo].[KPICapabilities]
				([KPIControlLeversID]
				,[CapabilitiesName]
				,[CapabilitiesTitle]
				,[ExpectedBy]
				,[ActiveFlag]
				,[CreatedBy]
				,[CreatedDate]
				, Capex,
				Opex,
				Frequency,
				CapexSpreadYears
				)
			VALUES
				(@KPIControlLeverID
				,'Capabilities Name'
				,@CapabilitiesTitle
				,@ExpectedBy
				,1
				,@UserID
				,GETDATE()
				, @Capex,
				@Opex,
				@Frequency,
				@CapexSpreadYears
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


declare @BaseSchemaName as nvarchar(100) = 'amplo'
declare @SchemaName as nvarchar(100) = 'Test102211'
declare @OriginalName as nvarchar(100) = 'uspAddKPIControlLevers'
drop proc Test102211.uspAddKPIControlLevers
declare @ProcDefinition as nvarchar(MAX) = OBJECT_DEFINITION (OBJECT_ID('[Amplo].[uspAddKPIControlLevers]'))
declare @SPDefinition as nvarchar(MAX) = @ProcDefinition
set @SPDefinition = (dbo.OmitSchemaName(@ProcDefinition, @BaseSchemaName, @SchemaName, @OriginalName))
select @SPDefinition
EXEC sp_executesql @SPDefinition


select * from Amplo.[KPICapabilities]
GO
