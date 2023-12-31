USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateCompanyProfile_Aashay]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateCompanyProfile_Aashay]
 (
    @id int,
    @Responses AS Amplo.ProfilingResponses READONLY,
    @CountryRegionCodeID int,
  --  @IndustryID int,
    @IndustryVerticalID int,
    @IndustrySubVerticalID int,
    @NoOfEmployees int,
    @Country varchar(100),
    @StateTerritory varchar(100),
    @City nvarchar(50),
    @PostalCode NVARCHAR(15)
 )
AS
BEGIN
/*
@id - Logged in userID
@Responses AS Amplo.ProfilingResponses - Question ID alongwith Answer text
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   declare @clientId INT
   select @clientId = ClientID from Amplo.[User] where UserID = @id and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

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
            @id,
            GETDATE()        
        )

        declare @createdCompanyProfileID int
        
        SELECT @createdCompanyProfileID = SCOPE_IDENTITY();

        INSERT into Amplo.AmploProfilingAnswers
        (
        [CompanyProfileID]
        ,[ProfilingQuestionID]
        ,[ProfilingAnswers]
        ,[ProfilingRatings]
        ,[ProfilingAnswersFeedback]
        ,[CreatedBy]
        ,[CreatedDate]
        )
        select
        @createdCompanyProfileID,
        questionID,
        profilingAnswer,
        NULL,
        NULL,
        @id,
        GETDATE()
        from @Responses
        where profilingAnswer IS NOT NULL
    
    END

    ELSE
    BEGIN

        declare @companyProfileID int
        select @companyProfileID = CompanyProfileID from Amplo.AmploCompanyProfile where clientID = @clientId and ActiveFlag = 1

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
        ,[ModifiedBy] = @id
        ,[ModifiedDate] = GETDATE()

        ---Update question responses which had already been answered

        Update Amplo.AmploProfilingAnswers
        SET ProfilingAnswers = b.profilingAnswer from 
        Amplo.AmploProfilingAnswers a inner join @Responses b on b.questionID = a.ProfilingQuestionID

        --Insert new responses
            INSERT into Amplo.AmploProfilingAnswers
        (
        [CompanyProfileID]
        ,[ProfilingQuestionID]
        ,[ProfilingAnswers]
        ,[ProfilingRatings]
        ,[ProfilingAnswersFeedback]
        ,[CreatedBy]
        ,[CreatedDate]
        )
        select
        @companyProfileID,
        questionID,
        profilingAnswer,
        NULL,
        NULL,
        @id,
        GETDATE()
        from @Responses
        where profilingAnswer IS NOT NULL AND questionID NOT IN (select ProfilingQuestionID from Amplo.AmploProfilingAnswers where CompanyProfileID = @companyProfileID)

    END


    --Success Message

    select MessageName from Amplo.[Message] where MessageID = 1021

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
    



END






GO
