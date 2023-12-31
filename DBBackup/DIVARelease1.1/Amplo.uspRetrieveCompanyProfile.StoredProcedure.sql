USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspRetrieveCompanyProfile]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspRetrieveCompanyProfile]
 (
    @id int  
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   declare @clientId INT
   select @clientId = ClientID from Amplo.[User] where UserID = @id and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

   declare @companyProfileID INT
   select @companyProfileID = CompanyProfileID from Amplo.AmploCompanyProfile where ClientID = @clientId 

   declare @quesAns TABLE(
       questionID int,
       question varchar(max),
       answerID int,
       answer VARCHAR(max)
   )

--get all questions and answers which have been answered for the questions
   insert into @quesAns
   select ques.QuestionID, ques.Question, ans.ProfilingAnswersID, ans.ProfilingAnswers from
   (select QuestionID, Question from Amplo.AmploProfilingQuestions where ActiveFlag = 1) ques 
   left JOIN 
   (select ProfilingAnswersID, ProfilingAnswers, ProfilingQuestionID from 
		(
		   SELECT *,
				 ROW_NUMBER() OVER (PARTITION BY ProfilingQuestionID ORDER BY CreatedDate DESC) AS rn
		   FROM Amplo.AmploProfilingAnswers where CompanyProfileID = @companyProfileID
		) grp
		WHERE rn = 1) 
   ans on ques.QuestionID = ans.ProfilingQuestionID


   select * from
   (select [CountryRegionCodeID]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[NoOfEmployees]
      ,[Country]
      ,[StateTerritory]
      ,[City]
      ,[PostalCode]
	  ,[Address1]
	  ,[Address2]
	  ,[CompanyLogo]
     from Amplo.AmploCompanyProfile where ClientID = @clientId and ActiveFlag = 1) prof
     cross join @quesAns quesAns

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
