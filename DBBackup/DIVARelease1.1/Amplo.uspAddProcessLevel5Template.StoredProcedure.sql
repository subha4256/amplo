USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddProcessLevel5Template]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspAddProcessLevel5Template]
 (
    @id int,
    @ProjectId varchar(100),
    @TemplateId int
	
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

   

   

  
	
	--------- Insert level 1 template data start -----------
	INSERT INTO [Amplo].[DecompositionProcessLevel5]
           (
		   DecompositionProcessLevel1ID,
		   DecompositionProcessLevel2ID,
		   DecompositionProcessLevel3ID,
		   DecompositionProcessLevel4ID,
		   DecompositionProcessLevel5ID,
           [DecompositionProjectID]
           ,[ProcessLevel5Name]
           ,[ProcessLevel5Title]
           ,[ProcessLevel5Description]
           
		   ,Owner
		   ,CountrySpecific
            ,[ActiveFlag]
          
    )
    select 
	DecompositionProcessLevel1TemplateID,
	DecompositionProcessLevel2TemplateID,
	DecompositionProcessLevel3TemplateID,
	DecompositionProcessLevel4TemplateID,
	DecompositionProcessLevel5TemplateID,
	@ProjectId,
	l5Main.ProcessLevel5Name,
	l5Main.ProcessLevel5Title,
	l5Main.ProcessLevel5Description,
	l5Main.Owner
	,l5Main.CountrySpecific,
	
	1


   
	from AmploDecompositionProcessLevel5Template l5Main where 
	DecompositionProcessLevel5TemplateID =@TemplateId and ActiveFlag = 1 

	--and CreatedBy = 'SYSADMIN-BISWAJIT'
    

	

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
