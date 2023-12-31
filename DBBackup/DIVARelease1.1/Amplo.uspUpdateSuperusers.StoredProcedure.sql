USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateSuperusers]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create PROCEDURE [Amplo].[uspUpdateSuperusers]
    (
        @id int,
        @newSuperUsers varchar(100)
    )
        /*
        @id - Logged In User ID
        @newSuperUsers - Comma separated list of user IDs to be set as new super users 
        */
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    DECLARE @clientID int
    Select @clientID = ClientID from Amplo.[User] where @id = UserID
    
    DECLARE @receivedUserIDs TABLE (
    userID int
    );

    INSERT INTO @receivedUserIDs
    SELECT * 
    FROM  String_Split(@newSuperUsers, ',')

    DECLARE @validUserIDs TABLE (
    userID int
    );

    INSERT INTO @validUserIDs
    SELECT rcvd.userID
    FROM  @receivedUserIDs rcvd inner join Amplo.[User] usr ON rcvd.userID = usr.UserID
    where usr.ClientID = @clientID and usr.ActiveFlag = 1 and usr.EmailValidationStatus = 1 and usr.UserStatusID = 1 and ISNULL(usr.DisableDate, GETDATE() +1) > GETDATE()
    
    declare @countOfIds INT
    select @countOfIds = Count(userID) from @validUserIDs

    if @countOfIds = 1 or @countOfIds = 2
    BEGIN
        --Set every to add on user
        Update Amplo.[User]
        Set UserTypeID = 2, UserModifiedBy = @id, UserModifiedDate = GETDATE()
        where ClientID = @clientID

        --Set selected users as super users
        Update Amplo.[User]
        Set UserTypeID = 1, UserModifiedBy = @id, UserModifiedDate = GETDATE()
        from Amplo.[User] usr inner join @validUserIDs val on usr.UserID = val.userID

        select MessageName from Amplo.[Message] where MessageID = 1017   --Successful updation of superusers message returned
    END

    ELSE
    BEGIN
        -- Message returned - Invalid IDs sent
        select MessageName from Amplo.Message where MessageID = 1016
    END

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

END;










GO
