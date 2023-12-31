USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddProcessLevel1Template]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspAddProcessLevel1Template]
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

   declare @DecompositionProcessLevel1TemplateID int
   declare @DecompositionProcessLevel2TemplateID int
   declare @DecompositionProcessLevel3TemplateID int
   declare @DecompositionProcessLevel4TemplateID int
   declare @DecompositionProcessLevel5TemplateID int

    declare @DecompositionProcessLevel1ID int
   declare @DecompositionProcessLevel2ID int
   declare @DecompositionProcessLevel3ID int
   declare @DecompositionProcessLevel4ID int

   Declare @ErrorMessage varchar(100)

   --set @DecompositionProcessLevel2ID= (select DecompositionProcessLevel2TemplateID from AmploDecompositionProcessLevel2Template 
   --where DecompositionProcessLevel1TemplateID=@TemplateId)

  
	
	--------- Insert level 1 template data start -----------

	
	DECLARE insert_cursor1 CURSOR FOR 
SELECT AmploDecompositionProcessLevel1TemplateID from AmploDecompositionProcessLevel1Template
where AmploDecompositionProcessLevel1TemplateID = @TemplateId and ActiveFlag = 1 
 
-- open cursor and fetch first row into variables
OPEN insert_cursor1
FETCH NEXT FROM insert_cursor1 into @DecompositionProcessLevel1TemplateID
 
-- check for a new row
WHILE @@FETCH_STATUS=0
BEGIN


	INSERT INTO [Amplo].[DecompositionProcessLevel1]
           ([ClientID]
           ,[UserID]
           ,[DecompositionProjectID]
           ,[ProcessLevel1Name]
           ,[ProcessLevel1Title]
           ,[ProcessLevel1Description]
            ,[FunctionID]
           ,[PhaseID]
            ,[ActiveFlag]
          
    )
    select 
	@clientid,
	@id,
	@ProjectId,
	l1Main.ProcessLevel1Name,
	l1Main.ProceeLevel1Title,
	l1Main.ProcessLevel1Description,
	l1Main.[DecompositionFunctionID],
    l1Main.[DecompositionPhaseID],
	1


   
	from AmploDecompositionProcessLevel1Template l1Main where 
	AmploDecompositionProcessLevel1TemplateID =@DecompositionProcessLevel1TemplateID and ActiveFlag = 1 

	set @DecompositionProcessLevel1ID =Scope_identity()
    
	
	DECLARE insert_cursor2 CURSOR FOR 
SELECT DecompositionProcessLevel2TemplateID from AmploDecompositionProcessLevel2Template
where DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1TemplateID and ActiveFlag = 1 
 
-- open cursor and fetch first row into variables
OPEN insert_cursor2
FETCH NEXT FROM insert_cursor2 into @DecompositionProcessLevel2TemplateID
 
-- check for a new row
WHILE @@FETCH_STATUS=0
BEGIN
	
  
	
	--------- Insert level 2 template data start -----------

	INSERT INTO [Amplo].[DecompositionProcessLevel2]
           (DecompositionProcessLevel1ID,
		   
           [DecompositionProjectID]
           ,[ProcessLevel2Name]
           ,[ProcessLevel2Title]
           ,[ProcessLevel2Description]
         
		   ,Owner
		   ,CountrySpecific
            ,[ActiveFlag]
          
    )
    select 
	@DecompositionProcessLevel1ID,
	
	@ProjectId,
	l2Main.ProcessLevel2Name,
	l2Main.ProcessLevel2Title,
	l2Main.ProcessLevel2Description,
	l2Main.Owner
	,l2Main.CountrySpecific,
	
	1


   
	from AmploDecompositionProcessLevel2Template l2Main where 
	DecompositionProcessLevel2TemplateID =@DecompositionProcessLevel2TemplateID and ActiveFlag = 1 

	set @DecompositionProcessLevel2ID =Scope_identity()

	--Print @DecompositionProcessLevel2ID

-- get next available row into variables


	

	DECLARE insert_cursor3 CURSOR FOR 
SELECT DecompositionProcessLevel3TemplateID from AmploDecompositionProcessLevel3Template
where DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2TemplateID and ActiveFlag = 1 
 
-- open cursor and fetch first row into variables
OPEN insert_cursor3
FETCH NEXT FROM insert_cursor3 into @DecompositionProcessLevel3TemplateID
 --Print @DecompositionProcessLevel3TemplateID
-- check for a new row
WHILE @@FETCH_STATUS=0
BEGIN

	
	--------- Insert level 3 template data start -----------
	INSERT INTO [Amplo].[DecompositionProcessLevel3]
           (
		   DecompositionProcessLevel1ID,
		   DecompositionProcessLevel2ID,
		  
           [DecompositionProjectID]
           ,[ProcessLevel3Name]
           ,[ProcessLevel3Title]
           ,[ProcessLevel3Description]
           
		   ,Owner
		   ,CountrySpecific
            ,[ActiveFlag]
          
    )
    select 
	@DecompositionProcessLevel1ID,
	@DecompositionProcessLevel2ID,
	
	
	@ProjectId,
	l3Main.ProcessLevel3Name,
	l3Main.ProcessLevel3Title,
	l3Main.ProcessLevel3Description,
	l3Main.Owner
	,l3Main.CountrySpecific,
	
	1


   
	from AmploDecompositionProcessLevel3Template l3Main where 
	DecompositionProcessLevel3TemplateID =@DecompositionProcessLevel3TemplateID and ActiveFlag = 1 

	

	set @DecompositionProcessLevel3ID =Scope_identity()

	DECLARE insert_cursor4 CURSOR FOR 
SELECT DecompositionProcessLevel4TemplateID from AmploDecompositionProcessLevel4Template
where DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3TemplateID and ActiveFlag = 1 
 
-- open cursor and fetch first row into variables
OPEN insert_cursor4
FETCH NEXT FROM insert_cursor4 into @DecompositionProcessLevel4TemplateID
 
-- check for a new row
WHILE @@FETCH_STATUS=0
BEGIN

	
	
	--------- Insert level 4 template data start -----------
	INSERT INTO [Amplo].[DecompositionProcessLevel4]
           (
		   DecompositionProcessLevel1ID,
		   DecompositionProcessLevel2ID,
		   DecompositionProcessLevel3ID,
		  
           [DecompositionProjectID]
           ,[ProcessLevel4Name]
           ,[ProcessLevel4Title]
           ,[ProcessLevel4Description]
           
		   ,Owner
		   ,CountrySpecific
            ,[ActiveFlag]
          
    )
    select 
	@DecompositionProcessLevel1ID,
	@DecompositionProcessLevel2ID,
	@DecompositionProcessLevel3ID,
	
	@ProjectId,
	l4Main.ProcessLevel4Name,
	l4Main.ProcessLevel4Title,
	l4Main.ProcessLevel4Description,
	l4Main.Owner
	,l4Main.CountrySpecific,
	
	1


   
	from AmploDecompositionProcessLevel4Template l4Main where 
	DecompositionProcessLevel4TemplateID =@DecompositionProcessLevel4TemplateID and ActiveFlag = 1 


	
	set @DecompositionProcessLevel4ID =Scope_identity()
  
	
	--------- Insert level 5 template data start -----------
	INSERT INTO [Amplo].[DecompositionProcessLevel5]
           (
		   DecompositionProcessLevel1ID,
		   DecompositionProcessLevel2ID,
		   DecompositionProcessLevel3ID,
		   DecompositionProcessLevel4ID,
		  
           [DecompositionProjectID]
           ,[ProcessLevel5Name]
           ,[ProcessLevel5Title]
           ,[ProcessLevel5Description]
           
		   ,Owner
		   ,CountrySpecific
            ,[ActiveFlag]
          
    )
    select 
	@DecompositionProcessLevel1ID,
	@DecompositionProcessLevel2ID,
	@DecompositionProcessLevel3ID,
	@DecompositionProcessLevel4ID,
	
	@ProjectId,
	l5Main.ProcessLevel5Name,
	l5Main.ProcessLevel5Title,
	l5Main.ProcessLevel5Description,
	l5Main.Owner
	,l5Main.CountrySpecific,
	
	1


   
	from AmploDecompositionProcessLevel5Template l5Main where 
	DecompositionProcessLevel4TemplateID =@DecompositionProcessLevel4TemplateID and ActiveFlag = 1 

	


FETCH NEXT FROM insert_cursor4 into @DecompositionProcessLevel4TemplateID
END
close insert_cursor4
Deallocate insert_cursor4


FETCH NEXT FROM insert_cursor3 into @DecompositionProcessLevel3TemplateID
END
close insert_cursor3
Deallocate insert_cursor3
	
FETCH NEXT FROM insert_cursor2 into @DecompositionProcessLevel2TemplateID
END
close insert_cursor2
Deallocate insert_cursor2


FETCH NEXT FROM insert_cursor1 into @DecompositionProcessLevel1TemplateID
END
close insert_cursor1
Deallocate insert_cursor1


    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
	
	SET @ErrorMessage  = ERROR_MESSAGE()
	Print  @ErrorMessage
        IF @@TRANCOUNT > 0
        BEGIN

            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
