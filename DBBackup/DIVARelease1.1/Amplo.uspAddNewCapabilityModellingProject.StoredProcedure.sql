USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddNewCapabilityModellingProject]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspAddNewCapabilityModellingProject]
 (
    @id int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
SET NOCOUNT ON
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

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    DECLARE @Target_Table TABLE (
    userIDs int
    );

    INSERT INTO @Target_Table
    SELECT * 
    FROM  String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @Target_Table a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    ) b
    on a.userids = b.UserID

    --Create New Capability Modelling project
    insert into Amplo.[DecompositionProject](
       [ProjectName]
      ,[ProjectDescription]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ClientID]
      ,[StatusID]
    )
    VALUES(
        @CapabilityProjectName,
        NULL,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
        1, 
        @id,
        GETDATE(),
        @clientid,
        1
    )

    declare @createdProjectID INT

    SELECT @createdProjectID = SCOPE_IDENTITY();

    --Add users to Capability Modelling project
    INSERT INTO Amplo.DecompositionProjectUser(
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[ActivityFlag]
    )
    SELECT 
        @createdProjectID,
        @clientid,
        userIDs,
        1,
      --  1,
        @id,
        GETDATE(),
        1
    from @ValidUserIDs
	
    -- Succe[])ssfull addition of new benchmark project
    SELECT messageName from Amplo.[Message] where MessageID = 1019

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
