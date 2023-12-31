USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddProcessLevel2Template]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspAddProcessLevel2Template]
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
	INSERT INTO [Amplo].[DecompositionProcessLevel2]
           (DecompositionProcessLevel1ID,
		   DecompositionProcessLevel2ID,
           [DecompositionProjectID]
           ,[ProcessLevel2Name]
           ,[ProcessLevel2Title]
           ,[ProcessLevel2Description]
           -- ,[FunctionID]
           --,[PhaseID]
		   ,Owner
		   ,CountrySpecific
            ,[ActiveFlag]
          
    )
    select 
	DecompositionProcessLevel1TemplateID,
	DecompositionProcessLevel2TemplateID,
	@ProjectId,
	l2Main.ProcessLevel2Name,
	l2Main.ProcessLevel2Title,
	l2Main.ProcessLevel2Description,
	l2Main.Owner
	,l2Main.CountrySpecific,
	
	1


   
	from AmploDecompositionProcessLevel2Template l2Main where 
	DecompositionProcessLevel2TemplateID =@TemplateId and ActiveFlag = 1 

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
