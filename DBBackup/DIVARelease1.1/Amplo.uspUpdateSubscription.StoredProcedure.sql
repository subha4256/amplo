USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateSubscription]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateSubscription]
 (
      @ClientID int
	  ,@SubscriptionKey varchar(50)
      ,@StartDate datetime
      ,@EndDate datetime

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

--            declare @clientId INT
--            select @clientId = ClientID from Amplo.[User] where UserID = @UserID and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

            declare @alreadyInput int
            select @alreadyInput = Count(ClientAuditID) from Amplo.ClientAudit where ClientID = @clientId 

            if @alreadyInput = 0
            --If company profile not entered even once yet. Insert
            BEGIN

			INSERT INTO [Amplo].[Subscription]
					   ([ClientID]
					   ,[SubscriptionKey]
					   ,[StartDate]
					   ,[EndDate])
				 VALUES
					   (@ClientID
					   ,@SubscriptionKey
					   ,@StartDate
					   ,@EndDate
)

  --      declare @createdCompanyProfileID int
        
--            SELECT @CompanyProfileID = SCOPE_IDENTITY();

    END

    ELSE
        BEGIN

			UPDATE [Amplo].[Subscription]
			   SET [ClientID] = @ClientID
				  ,[SubscriptionKey] = @SubscriptionKey
				  ,[StartDate] = @StartDate
				  ,[EndDate] = @EndDate
			 WHERE ClientID = @ClientID

    --Success Message

        select MessageName from Amplo.[Message] where MessageID = 1021
		end

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
