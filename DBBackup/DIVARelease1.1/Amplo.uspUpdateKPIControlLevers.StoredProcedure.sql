USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateKPIControlLevers]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 11-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateKPIControlLevers]
	-- Add the parameters for the stored procedure here
        @USERID [int]
	   ,@KPIID [int]
       ,@KPIControlLeversID [int]
       ,@ControlLeversTitle [varchar](512)
       ,@PersonaImpacted [varchar](512)
	   ,@Action [varchar](30)
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

	DECLARE
    @counter    INT = 1,
    @max        INT = 0,
	@KPIControlLeverID [int],
	@KPIInhibitorsID [int],
	@KPICapabilitiesID int,
	@InhibitorsTitle VARCHAR(512),
    @CapabilitiesTitle VARCHAR(512),
	@Probability nvarchar(20),
	@ImpactCost nvarchar(50),
	@InvestmentRequired nvarchar(50),
	@ExpectedBy datetime,
	@ROWNumber int

    -- Insert statements for procedure here
	
    BEGIN TRY
        BEGIN TRANSACTION;
	
	IF UPPER(@Action) = N'MODIFY'

		BEGIN
	
	
			UPDATE [Amplo].[KPIControlLevers]
			   SET [ControlLeversTitle] = @ControlLeversTitle
				  ,[PersonaImpacted] = @PersonaImpacted
				  ,[ExpectedTargetGrowth] = @ExpectedTargetGrowth
				  ,[UnitOfMeasurement] = @UnitOfMeasurement
				  ,[TargetDate] = @TargetDate
				  ,[Improvementbasis] = @Improvementbasis
				  ,[AuditFrequency] = @AuditFrequency
				  ,[ModifiedBy] = @USERID
				  ,[ModifiedDate] = GETDATE()
			 WHERE [KPIID] = @KPIID AND [KPIControlLeversID] = @KPIControlLeversID

		/* 
		This section is for KPI Inhibitors details to update and delete 
		*/


			SELECT ID, KPIInhibitorsID, InhibitorsTitle, Action, Probability, ImpactCost
			INTO #tblInhibitors
			FROM OPENJSON (@KPIInhibitors, '$.root')
			WITH (
			ID int,
			KPIInhibitorsID INT,
			InhibitorsTitle VARCHAR(512),
		    Probability nvarchar(20),
			ImpactCost nvarchar(50),
			Action VARCHAR(30)
			);

				SELECT @max = COUNT(1) FROM #tblInhibitors

				while @counter <= @max
					BEGIN
						SELECT @KPIInhibitorsID = KPIInhibitorsID, @InhibitorsTitle = InhibitorsTitle, @Action = Action, @Probability=Probability, @ImpactCost=ImpactCost
						FROM #tblInhibitors WHERE ID = @counter
						select UPPER(@Action) AS INHIBITORACTIONS

						IF UPPER(@Action) = 'ADD'
						BEGIN
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
						END
						ELSE IF UPPER(@Action) = 'MODIFY'
						BEGIN
							UPDATE [Amplo].[KPIInhibitors]
							SET 
								 [InhibitorsTitle] = @InhibitorsTitle
								,[Probability] = @Probability
								,[ImpactCost] = @ImpactCost
								,[ActiveFlag] = 1
								,[ModifiedBy] = @USERID
								,[ModifiedDate] = GETDATE()
							WHERE [KPIControlLeversID] = @KPIControlLeversID AND [KPIInhibitorsID] = @KPIInhibitorsID
						END
						ELSE IF UPPER(@Action) = 'DELETE'
							UPDATE [Amplo].[KPIInhibitors]
							SET 
								 [ActiveFlag] = 0
								,[ModifiedBy] = @USERID
								,[ModifiedDate] = GETDATE()
							WHERE [KPIControlLeversID] = @KPIControlLeversID AND [KPIInhibitorsID] = @KPIInhibitorsID

						SET @counter = @counter + 1

					END


		/* 
		This section is for KPI Capabilities details to update and delete 
		*/

			SET @counter = 1
			SELECT ID, [KPICapabilitiesID], [CapabilitiesTitle], Action
			INTO #tblCapabiliities
			FROM OPENJSON (@KPICapabilities, '$.root')
			WITH (
			ID int,
			KPICapabilitiesID INT,
			CapabilitiesTitle VARCHAR(512),
			Action VARCHAR(30)
			);

				SELECT @max = COUNT(1) FROM #tblCapabiliities
				SELECT @max 
				while @counter <= @max
					BEGIN
						select UPPER(@Action) AS INHIBITORACTIONS

						SELECT @KPICapabilitiesID = KPICapabilitiesID, @CapabilitiesTitle = CapabilitiesTitle, @Action = Action, @InvestmentRequired=InvestmentRequired,@ExpectedBy=ExpectedBy 
						FROM #tblCapabiliities WHERE ID = @counter
						IF UPPER(@Action) = 'ADD'
						BEGIN
							INSERT INTO [Amplo].[KPICapabilities]
							([KPIControlLeversID]
							,[CapabilitiesName]
							,[CapabilitiesTitle]
							,[InvestmentRequired]
							,[ExpectedBy]
							,[ActiveFlag]
							,[CreatedBy]
							,[CreatedDate]
							)
							VALUES
							(@KPIControlLeverID
							,'Capabilities Name'
							,@CapabilitiesTitle
							,@InvestmentRequired
							,@ExpectedBy
							,1
							,@UserID
							,GETDATE()
							);
						END
						IF UPPER(@Action) = 'MODIFY'
						BEGIN
							UPDATE [Amplo].[KPICapabilities]
							SET 
								 [CapabilitiesTitle] = @CapabilitiesTitle
								 ,[InvestmentRequired] = @InvestmentRequired
								 ,[ExpectedBy] = @ExpectedBy
								,[ActiveFlag] = 1
								,[ModifiedBy] = @USERID
								,[ModifiedDate] = GETDATE()
							WHERE [KPIControlLeversID] = @KPIControlLeversID AND KPICapabilitiesID = @KPICapabilitiesID
						END
						ELSE IF UPPER(@Action) = N'DELETE'
							UPDATE [Amplo].[KPICapabilities]
							SET 
								 [ActiveFlag] = 0
								,[ModifiedBy] = @USERID
								,[ModifiedDate] = GETDATE()
							WHERE [KPIControlLeversID] = @KPIControlLeversID AND KPICapabilitiesID = @KPICapabilitiesID
					
						SET @counter = @counter + 1
					END
		END




	/*ELSE IF UPPER(@Action) = N'ADD'

		BEGIN

		SELECT N'ÁDD'





			END
*/

	ELSE IF UPPER(@Action) = N'DELETE'

		BEGIN

		SELECT N'DELETE'

			UPDATE [Amplo].[KPIControlLevers]
			SET ActiveFlag = 0
			WHERE [KPIID] = @KPIID AND [KPIControlLeversID] = @KPIControlLeversID

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
