USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[GetCapModProjectUserDetails]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[GetCapModProjectUserDetails]
 (
    @id int,
    @CapModProjectID varchar(100)
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentSetID - ID of set to get user details of
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    declare @clientID as INT
    Select @clientID = ClientID from Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

   select proj.DecompositionProjectID as CapModProjectID, proj.ProjectName as CapModProjectName, projUser.UserID as UserID, usr.FirstName, usr.MiddleName,usr.LastName 
   FROM
    (select DecompositionProjectID, ProjectName from Amplo.DecompositionProject where DecompositionProjectID =@CapModProjectID) proj --Filter out details only of project passed as parameter
   inner join (select DecompositionProjectID, UserID from Amplo.DecompositionProjectUser where ActiveFlag = 1 and ClientID = @clientID) projUser  -- Filter out project users based on client , inner join ensures that if user and project are of separate clients, no results are returned
   on proj.DecompositionProjectID = projUser.DecompositionProjectID
   inner Join (select UserID, FirstName, MiddleName, LastName from Amplo.[User] where ActiveFlag = 1) usr -- get user's name details
   on usr.UserID = projUser.UserID

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
