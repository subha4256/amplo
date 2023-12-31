USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateEnterpriseAccountDetails]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =========================================================================================================================================================
-- Author:		Srinivas
-- Create date: 24-Dec-2019
-- Description:	This procedure updates Company Profile details
-- =========================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateEnterpriseAccountDetails] 
	-- Add the parameters for the stored procedure here
    @UserID int,
    @CountryRegionCodeID int,
    @IndustryVerticalID int,
    @IndustrySubVerticalID int,
    @NoOfEmployees int,
    @Country varchar(100),
    @StateTerritory varchar(100),
    @City nvarchar(50),
    @PostalCode NVARCHAR(15),
	@Address1 NVARCHAR(100),
	@Address2 NVARCHAR(100),
	@CompanyLogo NVARCHAR(100),
	@ClientName nvarchar(255),
    @CompanyProfileID INT OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
    BEGIN TRY
    BEGIN TRANSACTION;

            declare @clientId INT
            select @clientId = ClientID from Amplo.[User] where UserID = @UserID and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

            declare @IndustryID INT
            select IndustryID from Amplo.[Client] where ClientID = @clientId and ActiveFlag = 1

            declare @alreadyInput int
            select @alreadyInput = Count(CompanyProfileID) from Amplo.AmploCompanyProfile where ClientID = @clientId 

            if @alreadyInput = 0
            --If company profile not entered even once yet. Insert
            BEGIN

                Insert into Amplo.AmploCompanyProfile
                (
                    [ClientID]
                    ,[CountryRegionCodeID]
                    ,[IndustryID]
                    ,[IndustryVerticalID]
                    ,[IndustrySubVerticalID]
                    ,[NoOfEmployees]
                    ,[Country]
                    ,[StateTerritory]
                    ,[City]
                    ,[PostalCode]
                    ,[ActiveFlag]
                    ,[CreatedBy]
                    ,[CreatedDate]
					,[Address1]
					,[Address2]
					,[CompanyLogo]
					,[ClientName]
                )
                Values(
                    @clientId,
                    @CountryRegionCodeID,
                    @IndustryID,
                    @IndustryVerticalID,
                    @IndustrySubVerticalID,
                    @NoOfEmployees,
                    @Country,
                    @StateTerritory,
                    @City,
                    @PostalCode,
                    1,
                    @UserID,
                    GETDATE(),
				    @Address1,
				    @Address2,
				    @CompanyLogo,
					@ClientName
                )

  --      declare @createdCompanyProfileID int
        
            SELECT @CompanyProfileID = SCOPE_IDENTITY();

    END

    ELSE
        BEGIN

            declare @PCompanyProfileID int
            select @PCompanyProfileID = CompanyProfileID from Amplo.AmploCompanyProfile where clientID = @clientId and ActiveFlag = 1
            SELECT @CompanyProfileID = @PCompanyProfileID

            UPDATE Amplo.AmploCompanyProfile
            SET [CountryRegionCodeID] = @CountryRegionCodeID
            ,[IndustryID] = @IndustryID
            ,[IndustryVerticalID] = @IndustryVerticalID
            ,[IndustrySubVerticalID] = @IndustrySubVerticalID
            ,[NoOfEmployees] = @NoOfEmployees
            ,[Country] = @Country
            ,[StateTerritory] = @StateTerritory
            ,[City] = @City
            ,[PostalCode] = @PostalCode
            ,[ModifiedBy] = @UserID
            ,[ModifiedDate] = GETDATE()
			,[Address1] = @Address1 
			,[Address2] = @Address2
			,[CompanyLogo] = @CompanyLogo
			,[ClientName] = @ClientName
            where CompanyProfileID = @PCompanyProfileID
        END


    --Success Message

    --    select MessageName from Amplo.[Message] where MessageID = 1021

    select @CompanyProfileID;

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
