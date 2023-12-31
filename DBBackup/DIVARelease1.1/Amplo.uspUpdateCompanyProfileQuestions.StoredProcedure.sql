USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateCompanyProfileQuestions]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateCompanyProfileQuestions]
 (
    @UserID int,
    @CompanyProfileID int,
    @QuestionID int,
    @QuestionResponse varchar(max)
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

--   declare @IndustryID INT
--   select IndustryID from Amplo.[Client] where ClientID = @clientId and ActiveFlag = 1

   declare @alreadyInput int
   select @alreadyInput = Count(CompanyProfileID) from Amplo.AmploProfilingAnswers where ClientID = @clientId and ProfilingQuestionID = @QuestionID 

    if @alreadyInput = 0
    --If company profile not entered even once yet. Insert
    BEGIN

        Insert into Amplo.AmploProfilingAnswers
        (
              [ClientID]
			 ,[CompanyProfileID]
             ,[ProfilingQuestionID]
             ,[ProfilingAnswers]   
            ,[CreatedBy]
            ,[CreatedDate]
        )
        Values(
			 @clientId
            ,@CompanyProfileID
            ,@QuestionID
            ,@QuestionResponse
            ,@UserID,
            GETDATE()        
        )


    END

    ELSE
    BEGIN

        Update Amplo.AmploProfilingAnswers
        SET ProfilingAnswers = @QuestionResponse
        where CompanyProfileID = @CompanyProfileID and ProfilingQuestionID = @QuestionID 

    END


    --Success Message

    select MessageName from Amplo.[Message] where MessageID = 1021

--    RETURN @CompanyProfileID;

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
