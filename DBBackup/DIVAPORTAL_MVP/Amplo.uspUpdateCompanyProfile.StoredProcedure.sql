USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateCompanyProfile]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateCompanyProfile]
 (
    @UserID int,
    @CountryRegionCodeID int,
    @IndustryVerticalID int,
    @IndustrySubVerticalID int,
    @NoOfEmployees int,
    @Country varchar(100),
    @StateTerritory varchar(100),
    @City nvarchar(50),
    @PostalCode NVARCHAR(15),
    @CompanyProfileID INT OUTPUT
 )
AS
BEGIN
/*
@UserID - Logged in userID
@Responses AS Amplo.ProfilingResponses - Question ID alongwith Answer text
*/
SET NOCOUNT ON
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
                    GETDATE()        
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
