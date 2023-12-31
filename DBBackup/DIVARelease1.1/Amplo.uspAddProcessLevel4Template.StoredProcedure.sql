USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddProcessLevel4Template]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create PROCEDURE [Amplo].[uspAddProcessLevel4Template]
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
	INSERT INTO [Amplo].[DecompositionProcessLevel4]
           (
		   DecompositionProcessLevel1ID,
		   DecompositionProcessLevel2ID,
		   DecompositionProcessLevel3ID,
		   DecompositionProcessLevel4ID,
           [DecompositionProjectID]
           ,[ProcessLevel4Name]
           ,[ProcessLevel4Title]
           ,[ProcessLevel4Description]
           
		   ,Owner
		   ,CountrySpecific
            ,[ActiveFlag]
          
    )
    select 
	DecompositionProcessLevel1TempateID,
	DecompositionProcessLevel2TempateID,
	DecompositionProcessLevel3TempateID,
	DecompositionProcessLevel4TemplateID,
	@ProjectId,
	l4Main.ProcessLevel4Name,
	l4Main.ProcessLevel4Title,
	l4Main.ProcessLevel4Description,
	l4Main.Owner
	,l4Main.CountrySpecific,
	
	1


   
	from AmploDecompositionProcessLevel4Template l4Main where 
	DecompositionProcessLevel4TemplateID =@TemplateId and ActiveFlag = 1 

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
