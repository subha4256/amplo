USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddProcessLevel3Template]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspAddProcessLevel3Template]
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
	INSERT INTO [Amplo].[DecompositionProcessLevel3]
           (
		   DecompositionProcessLevel1ID,
		   DecompositionProcessLevel2ID,
		   DecompositionProcessLevel3ID,
           [DecompositionProjectID]
           ,[ProcessLevel3Name]
           ,[ProcessLevel3Title]
           ,[ProcessLevel3Description]
           
		   ,Owner
		   ,CountrySpecific
            ,[ActiveFlag]
          
    )
    select 
	DecompositionProcessLevel1TempateID,
	DecompositionProcessLevel2TempateID,
	DecompositionProcessLevel3TemplateID,
	
	@ProjectId,
	l3Main.ProcessLevel3Name,
	l3Main.ProcessLevel3Title,
	l3Main.ProcessLevel3Description,
	l3Main.Owner
	,l3Main.CountrySpecific,
	
	1


   
	from AmploDecompositionProcessLevel3Template l3Main where 
	DecompositionProcessLevel3TemplateID =@TemplateId and ActiveFlag = 1 

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
