USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[CreateMultipleSchema]    Script Date: 1/9/2020 6:47:55 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [Amplo].[CreateMultipleSchema]
  @SchemaName AS NVARCHAR(100)
, @Login AS NVARCHAR(100)
, @Password AS NVARCHAR(100)
, @ClientId AS INT
, @UserId AS NVARCHAR(100)
AS
BEGIN 
	BEGIN TRY
		--BEGIN TRANSACTION trMain
			DECLARE @User AS NVARCHAR(100) = @Login + 'User'
			declare @IsSuccess as BIT = 1
			DECLARE @SqlString AS NVARCHAR(MAX) = N'create schema ' + @SchemaName
			EXEC(@SqlString) 
            --exec ('Use master')
			--SET @SqlString = 'CREATE LOGIN ' + @Login + ' WITH PASSWORD = ''' + @Password + '''' --'exec sp_addlogin ''' + @Login + ''', ''' + @Password + ''''
			--EXEC (@SqlString)
            --exec ('Use divaamt2')
			SET @SqlString = 'CREATE USER ' + @User + ' FOR LOGIN ' + @Login --'exec sp_adduser ''' + @Login + ''', ''' + @User + ''''
			EXEC (@SqlString)
			EXEC ('ALTER USER ' + @User + ' WITH DEFAULT_SCHEMA = ' + @SchemaName)
			SET @SqlString = 'GRANT REFERENCES, VIEW CHANGE TRACKING, CONTROL, CREATE SEQUENCE, EXECUTE, TAKE OWNERSHIP, VIEW DEFINITION, ALTER, SELECT, INSERT, UPDATE, DELETE ON SCHEMA :: ' 
				+ @SchemaName + ' TO ' + @User
			EXEC (@SqlString)
	
			DECLARE @BaseSchemaName AS NVARCHAR(100) = 'Amplo'
			DECLARE @TableName AS NVARCHAR(500)
			DECLARE @ProcName AS NVARCHAR(500)
			DECLARE @ClientSchemaCreationId AS BIGINT
		

			INSERT INTO [Amplo].ClientSchemaCreation 
			VALUES (@ClientId, @SchemaName, @UserId, GETDATE(), 0)

			update Amplo.Client set DbUserName = @Login, DbUserPassword = @Password where ClientId = @ClientId

			SET @ClientSchemaCreationId = (SELECT MAX(ClientSchemaCreationId) FROM [Amplo].ClientSchemaCreation)
	
			DECLARE @DbObjectToCreateId AS INT
			DECLARE @ObjectType AS NVARCHAR(200)
			declare @TableSql as nvarchar(MAX)
			declare @DoCopyValues as bit

			DECLARE object_cursor CURSOR FOR   
			--select DbObjectToCreateId,ObjectName, ObjectType, DoCopyValues
			--	from 
			--		sys.foreign_keys fk
			--		inner join sys.foreign_key_columns fkcols
			--			on fk.object_id = fkcols.constraint_object_id
			--		inner join sys.objects OnTable
			--			on fk.parent_object_id = OnTable.object_id
			--		inner join sys.schemas ots
			--			on OnTable.schema_id = ots.schema_id
			--		inner join sys.objects AgainstTable
			--			on fk.referenced_object_id = AgainstTable.object_id
			--		inner join sys.schemas ats
			--			on AgainstTable.schema_id = ats.schema_id
			--		inner join sys.columns OnColumn
			--			on fkcols.parent_column_id = OnColumn.column_id
			--			and fkcols.parent_object_id = OnColumn.object_id
			--		inner join sys.columns AgainstColumn
			--			on fkcols.referenced_column_id = AgainstColumn.column_id
			--			and fkcols.referenced_object_id = AgainstColumn.object_id
			--		right outer join DbObjectsToCreate dbob on dbob.ObjectName = OnTable.name
			--and ots.name = @BaseSchemaName
			--WHERE ObjectType = 'table'
			--AND ActiveFlag = 1
			--ORDER BY [Order] 
			select OnTable.Name
			from sys.objects OnTable
			inner join sys.schemas ots
			on OnTable.schema_id = ots.schema_id
			where ots.name = 'amplo'
			and OnTable.type_desc = 'USER_TABLE'
			and 'amplo.' + OnTable.Name not in (
			select ObjectName from [Amplo].GrantAccessToOtherObjects)

			OPEN object_cursor 
			FETCH NEXT FROM object_cursor
			INTO @TableName
			WHILE @@FETCH_STATUS = 0  
			BEGIN 
				BEGIN TRY
					--SET @TableSql = (dbo.GetTableScript(@TableName, @BaseSchemaName, @SchemaName))
					--SET @TableSql = (dbo.ReplaceSchemaName(@TableSql, @BaseSchemaName, @SchemaName))
					----'SELECT * INTO ' + @SchemaName + '.' + @TableName + ' from ' + @BaseSchemaName + '.' + @TableName
					--EXEC (@TableSql)
					--INSERT INTO ClientSchemaCreationLog 
					--VALUES (@DbObjectToCreateId, @ClientSchemaCreationId, 1, @TableSql, '')
					--if(@DoCopyValues = 1)
					--begin
					--	set @SqlString = 'SELECT * INTO ' + @SchemaName + '.' + @TableName + ' from ' + @BaseSchemaName + '.' + @TableName
					--	EXEC (@SqlString)
						--INSERT INTO ClientSchemaCreationLog 
						--VALUES (@DbObjectToCreateId, @ClientSchemaCreationId, 1, @SqlString, '')
					--end
					--select @TableSql
						set @SqlString = 'SELECT * INTO ' + @SchemaName + '.' + @TableName + ' from ' + @BaseSchemaName + '.' + @TableName
						EXEC (@SqlString)
						INSERT INTO [Amplo].ClientSchemaCreationLog 
						VALUES (@TableName, @ClientSchemaCreationId, 1, @SqlString, '')
				END TRY
				BEGIN CATCH
					INSERT INTO [Amplo].ClientSchemaCreationLog 
					VALUES (@TableName, @ClientSchemaCreationId, 0, @SqlString, ERROR_MESSAGE())
					select ERROR_MESSAGE()
					set @IsSuccess = 0
				END CATCH

				FETCH NEXT FROM object_cursor INTO @TableName
			END 
			CLOSE object_cursor 
			DEALLOCATE object_cursor 

			------------- For store procs --------------
			declare @OriginalName as nvarchar(200)
			DECLARE object_Proc_cursor CURSOR FOR   
			select @BaseSchemaName + '.' + OnTable.Name, OnTable.Name
			from sys.objects OnTable
			inner join sys.schemas ots
			on OnTable.schema_id = ots.schema_id
			where ots.name = 'amplo'
			and OnTable.type_desc = 'SQL_STORED_PROCEDURE'
			and @BaseSchemaName + '.' + OnTable.Name not in (
			select ObjectName from [Amplo].GrantAccessToOtherObjects)

			OPEN object_Proc_cursor 
			FETCH NEXT FROM object_Proc_cursor
			INTO @ProcName, @OriginalName
			WHILE @@FETCH_STATUS = 0  
			BEGIN 
				BEGIN TRY
					
					--set @ProcName = (SELECT top 1 value FROM STRING_SPLIT(@ProcName, '.'))
					declare @ProcDefinition as nvarchar(MAX) = OBJECT_DEFINITION (OBJECT_ID(@ProcName))
					--set @ProcDefinition = REPLACE(@ProcDefinition, '''', '''''')
					declare @SPDefinition as nvarchar(MAX) = @ProcDefinition
					set @SPDefinition = (dbo.OmitSchemaName(@ProcDefinition, @BaseSchemaName, @SchemaName, @OriginalName))
					EXEC sp_executesql @SPDefinition
					--select @ProcDefinition, @ProcName, @SPDefinition
					INSERT INTO [Amplo].ClientSchemaCreationLog 
						VALUES (@ProcName, @ClientSchemaCreationId, 1, @SPDefinition, '')
				END TRY
				BEGIN CATCH
					select ERROR_MESSAGE()
					INSERT INTO [Amplo].ClientSchemaCreationLog 
					VALUES (@ProcName, @ClientSchemaCreationId, 0, @SPDefinition, ERROR_MESSAGE())

					set @IsSuccess = 0
				END CATCH

				FETCH NEXT FROM object_Proc_cursor INTO @ProcName, @OriginalName
			END 
			CLOSE object_Proc_cursor 
			DEALLOCATE object_Proc_cursor 

			declare @ClientSchemaGrantLogId as bigint
			DECLARE object_grant_cursor CURSOR FOR   
			SELECT GrantAccessToOtherObjectsId, ObjectName, ObjectType FROM [Amplo].GrantAccessToOtherObjects WHERE ActiveFlag = 1
			OPEN object_grant_cursor 
			FETCH NEXT FROM object_grant_cursor INTO @ClientSchemaGrantLogId, @ProcName, @ObjectType 
			WHILE @@FETCH_STATUS = 0  
			BEGIN 
				BEGIN TRY
					if(@ObjectType = 'table')
					begin
						SET @SqlString = 'GRANT INSERT, SELECT, UPDATE ON ' + @ProcName + ' TO ' + @User
					end
					else
					begin
						SET @SqlString = 'GRANT EXECUTE ON ' + @ProcName + ' TO ' + @User
					end
					EXEC (@SqlString)
					
					INSERT INTO [Amplo].ClientSchemaGrantLog 
					VALUES (@ClientSchemaGrantLogId, @ClientSchemaCreationId, 1, @SqlString, '')
				END TRY
				BEGIN CATCH
					set @IsSuccess = 0
					INSERT INTO [Amplo].ClientSchemaGrantLog 
					VALUES (@ClientSchemaGrantLogId, @ClientSchemaCreationId, 0, @SqlString, ERROR_MESSAGE())
				END CATCH

				FETCH NEXT FROM object_grant_cursor INTO @ClientSchemaGrantLogId, @ProcName, @ObjectType
			END 
			CLOSE object_grant_cursor 
			DEALLOCATE object_grant_cursor 
			
			SET @SqlString = 'GRANT INSERT, SELECT, UPDATE ON amplo.[User] TO ' + @User
			EXEC (@SqlString)
			UPDATE [Amplo].[ClientSchemaCreation] SET IsSuccess = @IsSuccess WHERE [ClientSchemaCreationId] = @ClientSchemaCreationId
		--COMMIT
	END TRY
	BEGIN CATCH
	select ERROR_MESSAGE(), Error_Line()
		--ROLLBACK TRANSACTION trMain
		EXECUTE [dbo].[uspLogError];
	END CATCH
END

GO
/****** Object:  StoredProcedure [Amplo].[CreateSchemaAndAllPOC]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[CreateSchemaAndAllPOC]
@SchemaName as nvarchar(100)
, @Login as nvarchar(100)
, @Password as nvarchar(100)
as
begin
	declare @SqlString as nvarchar(MAX) 
	= 
	'exec sp_executesql N''create schema ' + @SchemaName + '''
	 exec sp_addlogin ''' + @Login + ''', ''' + @Password + '''
		exec sp_adduser ''' + @Login + ''', ''' + @Login + '''

		GRANT REFERENCES, VIEW CHANGE TRACKING, CONTROL, CREATE SEQUENCE, EXECUTE, TAKE OWNERSHIP, VIEW DEFINITION, ALTER, SELECT, INSERT, UPDATE, DELETE ON SCHEMA :: ' + @SchemaName + ' TO ' + @Login + '
		
	'

	select @SqlString
	exec (@SqlString)

	--set @SqlString = 'SETUSER ''' + @Login + ''';  
	--GO

	--CREATE TABLE Test (ID int, width dec(10,2))'
	--select @SqlString
	--exec (@SqlString)
end
GO
/****** Object:  StoredProcedure [Amplo].[GetBMProjectUserDetails]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[GetBMProjectUserDetails]
 (
    @id int,
    @assessmentSetID varchar(100)
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

   select proj.BenchmarkProjectID as BMProjectID, proj.BenchmarkProjectName as BMProjectName, projUser.UserID as UserID, usr.FirstName, usr.MiddleName,usr.LastName 
   FROM
    (select BenchmarkProjectID, BenchmarkProjectName from Amplo.BenchmarkProject where BenchmarkProjectID =@assessmentSetID) proj --Filter out details only of project passed as parameter
   inner join (select BenchmarkProjectID, UserID from Amplo.BenchmarkProjectUser where ActiveFlag = 1 and ClientID = @clientID) projUser  -- Filter out project users based on client , inner join ensures that if user and project are of separate clients, no results are returned
   on proj.BenchmarkProjectID = projUser.BenchmarkProjectID
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
/****** Object:  StoredProcedure [Amplo].[GetCapabilityModellingProjectUserDetails]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[GetCapabilityModellingProjectUserDetails]
 (
    @id int,
    @CapabilityProjectID varchar(100)
 )
AS
BEGIN
/*
@id - Logged in userID
@CapabilityProjectID - ID of project to get user details of
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
    (select DecompositionProjectID, ProjectName from Amplo.DecompositionProject where DecompositionProjectID =@CapabilityProjectID) proj --Filter out details only of project passed as parameter
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
/****** Object:  StoredProcedure [Amplo].[GetCapModProjectUserDetails]    Script Date: 1/9/2020 6:47:56 PM ******/
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
/****** Object:  StoredProcedure [Amplo].[GetDecompositionFunctionPhases]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[GetDecompositionFunctionPhases]
 (
        @id int,
        @ProjectID varchar(100)
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentSetID - ID of set to get user details of
*/
SET NOCOUNT ON

--    declare @SuperUser as INT
--    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    declare @clientID as INT
    Select @clientID = ClientID from Amplo.[User] where UserID = @id

	SELECT DF.DecompositionFunctionID, DF.FunctionName, DF.FunctionDescription, DP.DecompositionPhaseID, DP.PhaseName , DP.PhaseDescription from Amplo.DecompositionFunction DF inner join
	Amplo.DecompositionPhase DP on DF.DecompositionFunctionID = DP.DecompositionFunctionID
	where DF.ActiveFlag = 1;

END
GO
/****** Object:  StoredProcedure [Amplo].[GrantAccessSP]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
CREATE PROCEDURE [Amplo].[GrantAccessSP]
	@ProcName AS nvarchar(100)
AS
BEGIN

declare @BaseSchemaName as nvarchar(100) = 'amplo'
declare @SchemaName as nvarchar(100) --= 'Test102211'
DECLARE Tmp_Cursor CURSOR FOR     
SELECT SchemaName   
FROM Amplo.ClientSchemaCreation  
order by SchemaName;    
  
OPEN Tmp_Cursor    
  
FETCH NEXT FROM Tmp_Cursor     
INTO @SchemaName  
  
  
WHILE @@FETCH_STATUS = 0    
BEGIN    
   

declare @ProcDefinition as nvarchar(MAX) = OBJECT_DEFINITION (OBJECT_ID(@BaseSchemaName+'.'+@ProcName))

declare @SPDefinition as nvarchar(MAX) = @ProcDefinition
set @SPDefinition = (dbo.OmitSchemaName(@ProcDefinition, @BaseSchemaName, @SchemaName, @ProcName))
select @SPDefinition
EXEC sp_executesql @SPDefinition
      
    FETCH NEXT FROM Tmp_Cursor     
INTO @SchemaName     
   
END     
CLOSE Tmp_Cursor;    
DEALLOCATE Tmp_Cursor;  


	
END

GO
/****** Object:  StoredProcedure [Amplo].[GrantAccessToAllUser]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
CREATE PROCEDURE [Amplo].[GrantAccessToAllUser]
	@ProcName AS nvarchar(100)
AS
BEGIN
---insert into amplo.GrantAccessToOtherObjects values('Amplo.uspCMImportToStaging', 'proc', 1, GETDATE())
declare @SqlString as nvarchar(500) = ''

declare @ObjectType as nvarchar(500) = ''
declare @User as nvarchar(500) 


DECLARE object_grant_cursor CURSOR FOR   
SELECT UserId FROM Amplo.ClientSchemaCreation --and ObjectType != 'table'
OPEN object_grant_cursor 
FETCH NEXT FROM object_grant_cursor INTO @User
WHILE @@FETCH_STATUS = 0  
BEGIN 
	BEGIN TRY
		if(@ObjectType = 'table')
		begin
			SET @SqlString = 'GRANT INSERT, SELECT, UPDATE ON ' + @ProcName + ' TO ' + @User
		end
		else
		begin
			SET @SqlString = 'GRANT EXECUTE ON ' + @ProcName + ' TO ' + @User
		end
		select @SqlString
		EXEC (@SqlString)
	END TRY
	BEGIN CATCH
		select ERROR_MESSAGE()
	END CATCH

	FETCH NEXT FROM object_grant_cursor INTO @User
END 
CLOSE object_grant_cursor 
DEALLOCATE object_grant_cursor

	
END

GO
/****** Object:  StoredProcedure [Amplo].[RunScriptForAllSchema]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
CREATE PROCEDURE [Amplo].[RunScriptForAllSchema]
	@Script AS nvarchar(max)
AS
BEGIN

declare @SqlString as nvarchar(max) = ''

declare @BaseSchemaName as nvarchar(100) = 'amplo'
declare @SchemaName as nvarchar(500) 
declare @TableSql as nvarchar(max)

DECLARE object_grant_cursor CURSOR FOR   
SELECT SchemaName FROM Amplo.ClientSchemaCreation 
OPEN object_grant_cursor 
FETCH NEXT FROM object_grant_cursor INTO @SchemaName
WHILE @@FETCH_STATUS = 0  
BEGIN 
	BEGIN TRY
	
	SET @TableSql = (dbo.ReplaceSchemaName(@Script, @BaseSchemaName, @SchemaName))

	exec (@TableSql)
	END TRY
	BEGIN CATCH
		select ERROR_MESSAGE()
	END CATCH

	FETCH NEXT FROM object_grant_cursor INTO @SchemaName
END 
CLOSE object_grant_cursor 
DEALLOCATE object_grant_cursor

	
END

GO
/****** Object:  StoredProcedure [Amplo].[uspAddDecompositionProcessLevel1Activity]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspAddDecompositionProcessLevel1Activity]
	-- Add the parameters for the stored procedure here
           @UserID [int],
           @DecompositionProjectID [int],
           @ProcessLevel1Title [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
	Declare @DecompositionProcessLevel1ID int
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here
	INSERT INTO [Amplo].[DecompositionProcessLevel1]
			([ClientID]
			,[UserID]
			,[DecompositionProjectID]
			,[FunctionID]
			,[PhaseID]
			,[ProcessLevel1Name]
			,[ProcessLevel1Title]
			,[GridViewLocationID]
			,[GridVViewLocationFlag]
			,[ActiveFlag]
			, [Status]
			)
		 VALUES
			(@clientid
			,@UserID
			,@DecompositionProjectID
			,0
			,0
			,'Activity Bank'
			,@ProcessLevel1Title
			,-1
			,0
			,1
			,1
			)
	
	SELECT @DecompositionProcessLevel1ID = SCOPE_IDENTITY();
	SELECT @DecompositionProcessLevel1ID AS ProcessLevel1ID;

	--added by Srinivas on 27th October 2019

	INSERT INTO [Amplo].[DecompositionProcessLevel1Score]
           ([DecompositionProcessLevel1ID]
           ,[LeafNodeLevelID]
           ,[Level1_Calc_Aggr_Score]
           ,[Avg_Score_Weight]
           ,[LeafNodeFlag]
           ,[Owner]
           )
		   VALUES
		   (@DecompositionProcessLevel1ID
           ,1.1
           ,0.00
           ,2
           ,1
           ,NULL
           )


	INSERT INTO [Amplo].[DecompositionScoreCriteriaProject]
           ([ServiceID]
           ,[ClientID]
           ,[DecompositionProjectID]
           ,[DecompositionProcessLevel1ID]
           ,[ScoreCriteriaName]
           ,[ScoreCriteriaActualName]
           ,[ScoreCriteriaTitle]
           ,[ScoreCriteriaDescription]
           ,[SeededFlag]
           ,[UsedFlag])
     select ServiceID
			, @clientid
			, @DecompositionProjectID
			, @DecompositionProcessLevel1ID
			, ScoreCriteriaName
			, ScoreCriteriaActualName
			, ScoreCriteriaTitle
			, ScoreCriteriaDescription
			, SeededFlag
			, UsedFlag from [Amplo].[DecompositionScoreCriteria]

    SELECT messageName from Amplo.[Message] where MessageID = 1028

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
/****** Object:  StoredProcedure [Amplo].[uspAddDecompositionProcessLevel1Activity_28102019]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 16-October-2019
-- Description:	This procedure addes activity details in activity bank
-- =============================================
CREATE PROCEDURE [Amplo].[uspAddDecompositionProcessLevel1Activity_28102019]
	-- Add the parameters for the stored procedure here
           @UserID [int],
           @DecompositionProjectID [int],
           @ProcessLevel1Title [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
	Declare @DecompositionProcessLevel1ID int
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here
	INSERT INTO [Amplo].[DecompositionProcessLevel1]
			([ClientID]
			,[UserID]
			,[DecompositionProjectID]
			,[ProcessLevel1Name]
			,[ProcessLevel1Title]
			,[GridViewLocationID]
			,[GridVViewLocationFlag]
			,[ActiveFlag]
			)
		 VALUES
			(@clientid
			,@UserID
			,@DecompositionProjectID
			,'Non Seeded ProcessLevel1 Name'
			,@ProcessLevel1Title
			,-1
			,0
			,1
			)
	
	SELECT @DecompositionProcessLevel1ID = SCOPE_IDENTITY();
	SELECT @DecompositionProcessLevel1ID AS ProcessLevel1ID;
    SELECT messageName from Amplo.[Message] where MessageID = 1028

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
/****** Object:  StoredProcedure [Amplo].[uspAddDecompositionProcessLevels2]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 11-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspAddDecompositionProcessLevels2]
	-- Add the parameters for the stored procedure here
       @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [float]
       ,@ProcessLevel2Title [varchar](100)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@ScoreCriteria1 [float]
	   ,@ScoreCriteria2 [float]
	   ,@ScoreCriteria3 [float]
	   ,@ScoreCriteria4 [float]
	   ,@ScoreCriteria5 [float]
	   ,@ScoreCriteria6 [float]
	   ,@ScoreCriteria7 [float]
	   ,@ScoreCriteria8 [float]
  	   ,@ScoreCriteria9 [float]
	   ,@ScoreCriteria10 [float]
	   ,@LVL2CalcAggrScore [float]
	   ,@AvgScoreWeightage [float]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;
	DECLARE @PDecompositionProcessLevel2ID INT

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]


		BEGIN

			INSERT INTO [Amplo].[DecompositionProcessLevel2]
			(
			   [DecompositionProjectID]
			  ,[DecompositionProcessLevel1ID]
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[Owner]
			  ,[CountrySpecific]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  ,[CreatedBy]
			  ,[CreatedDate]
			  )
			  values
			(
				 @DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
				, 1
				,@UserID
				,GETDATE()
			);

			SET @PDecompositionProcessLevel2ID = SCOPE_IDENTITY();  

			INSERT INTO [Amplo].[DecompositionProcessLevel2Score]
			(
				[DecompositionProcessLevel1ID]
				,[DecompositionProcessLevel2ID]
				,[ScoreCriteria1]
				,[ScoreCriteria2]
				,[ScoreCriteria3]
				,[ScoreCriteria4]
				,[ScoreCriteria5]
				,[ScoreCriteria6]
				,[ScoreCriteria7]
				,[ScoreCriteria8]
				,[ScoreCriteria9]
				,[ScoreCriteria10]
				,[LVL2CalcAggrScore]
				,[AvgScoreWeightage]
			)
			VALUES
				(
				@DecompositionProcessLevel1ID,
				@PDecompositionProcessLevel2ID,
				@ScoreCriteria1,
				@ScoreCriteria2,
				@ScoreCriteria3,
				@ScoreCriteria4,
				@ScoreCriteria5,
				@ScoreCriteria6,
				@ScoreCriteria7,
				@ScoreCriteria8,
				@ScoreCriteria9,
				@ScoreCriteria10,
				@LVL2CalcAggrScore,
				@AvgScoreWeightage
				);

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

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddEnterpriseDIVATeam]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ===========================================================================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	The procedure updates DIVA team (Enterprise user details from DIVA Team functionality)
-- ===========================================================================================================================
CREATE PROCEDURE [Amplo].[uspAddEnterpriseDIVATeam]
	-- Add the parameters for the stored procedure here
        @UserID [int],
        @EmailAddress [nvarchar](100),
        @FirstName [varchar](100),
        @LastName [varchar](100),
		@UserType [int],
		@UserStatusID [int],
--		@DisableDate [date],
		@UserIPAddress [varchar](50)
AS

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    DECLARE @countRowUser int,@countOrgDivUser int, @ClientID int
	DECLARE @CountDIVAUser int
    DECLARE @Message VARCHAR(512)
	DECLARE @StatukLookupID int
    -- Insert statements for procedure here
    BEGIN TRY
    BEGIN TRANSACTION;

    SELECT @countRowUser = Count(*) FROM [Amplo].[User] WHERE EmailAddress = @EmailAddress;
	SELECT @CountDIVAUser = COUNT(*) FROM [Amplo].[UserDIVATeam] WHERE Email = @EmailAddress; 
	SELECT @UserStatusID = StatusLookupID from [Amplo].[StatusLookup] WHERE LookupCode = 'USERSTATUS_NEW';

	select @ClientID = ClientID FROM [Amplo].[User] where UserID = @UseriD;
    IF (@countRowUser > 0 OR @CountDIVAUser > 0 )
        BEGIN
            --RETURN 1;
            select MessageName from Amplo.Message where MessageID = 1
        END
    ELSE
	BEGIN 

	INSERT INTO [Amplo].[UserDIVATeam]
           ([ClientID]
           ,[SuperUserID]
           ,[FirstName]
           ,[LastName]
           ,[Email]
--           ,[DisableDate]
           ,[UserTypeID]
		   ,[UserStatusID]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate])
     VALUES
           (@ClientID
           ,@UserID
           ,@FirstName
           ,@LastName
           ,@EmailAddress
--         ,<DisableDate, date,>
           ,@UserType
		   ,@UserStatusID
           ,0
           ,@UserID
           ,GETDATE()
		)


  INSERT INTO [Amplo].[EmailVerification]
    (
      [UserID],
      [UserName],
      [VerificationFlag],
      [ActiveFlag],
      [VerificationDate],
      [UserIPAddress]
    )
    VALUES
    (
        @userID,
        @FirstName,
		0,
		0,
        GETDATE(),
		@UserIPAddress
    );
  
   -- RETURN 3;
   select MessageName from Amplo.Message where MessageID = 1023
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

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddEnterpriseDIVATeam_Original]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ===========================================================================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	The procedure updates DIVA team (Enterprise user details from DIVA Team functionality)
-- ===========================================================================================================================
CREATE PROCEDURE [Amplo].[uspAddEnterpriseDIVATeam_Original]
	-- Add the parameters for the stored procedure here
        @UserID int,
        @EmailAddress [nvarchar](100),
        @FirstName [varchar](100),
--      @MiddleName [varchar](50),
        @PLastName [varchar](100),
		@UserType int,
		@UserStatusID int,
		@DisableDate date,
		@UserIPAddress varchar(50)
AS

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
    BEGIN TRY
    BEGIN TRANSACTION;
    DECLARE @countRowUser int,@countOrgDivUser int, @ClientID int
    DECLARE @Message VARCHAR(512)
    SELECT @countRowUser = Count(*) FROM [Amplo].[User] WHERE EmailAddress = @EmailAddress;
	select @ClientID = ClientID FROM [Amplo].[User] where UserID = @UseriD;
--    SELECT @countOrgDivUser = Count(*) FROM [Amplo].[Client] WHERE ClientName = @PClientName 
    --AND ClientBusinessUnit = @PClientBusinessUnit;
    IF (@countRowUser>0)
        BEGIN
            --RETURN 1;
            select MessageName from Amplo.Message where MessageID = 1
        END
    ELSE
	BEGIN 

    		INSERT INTO [Amplo].[User]
    (
        [USERNAME],
		[FirstName],
--      [MiddleName],
        [LastName],
        [EmailAddress],
		[UserPassword],
        [EmailValidationStatus],
		[PhoneNumber],
        [ActiveFlag],
        [ClientID],
        [UserLinkedINProfileID],
        [UserTypeID],
        [UserStatusID],
		[DisableDate],
        [UserCreatedBy],
        [UserCreatedDate]
    )
    VALUES
    (
       @FirstName + ' '+ @PLastName,
		@FirstName,
--      @MiddleName,
        @PLastName,
        @EmailAddress,
		'tmppassword'
        ,0,
		'1434456',
        1,
        @ClientID,
        NULL,
        @UserType,
        @UserStatusID,
		@DisableDate,
        @UserID,
        GETDATE()
    );

/*		INSERT INTO [Amplo].[User]
    (
        [FirstName],
--      [MiddleName],
        [LastName],
        [EmailAddress],
        [EmailValidationStatus],
        [ActiveFlag],
        [ClientID],
        [UserLinkedINProfileID],
        [UserTypeID],
        [UserStatusID],
        [UserCreatedBy],
        [UserCreatedDate]
    )
    VALUES
    (
        @FirstName,
--      @MiddleName,
        @PLastName,
        @EmailAddress,
        0,
        1,
        @ClientID,
        NULL,
        @UserType,
        @UserStatusID,
        @UserID,
        GETDATE()
    );
	*/
--    SELECT @userID = UserID FROM [Amplo].[User] WHERE UserName = @PUserName;
  INSERT INTO [Amplo].[EmailVerification]
    (
      [UserID],
      [UserName],
      [VerificationFlag],
      [ActiveFlag],
      [VerificationDate],
      [UserIPAddress]
    )
    VALUES
    (
        @userID,
        @FirstName,
		0,
		0,
        GETDATE(),
		@UserIPAddress
    );
  
   -- RETURN 3;
   select MessageName from Amplo.Message where MessageID = 1023
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

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspAddEnterpriseSuperUser]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspAddEnterpriseSuperUser]
    (
        @PClientName [varchar](255),
        @PClientBusinessUnit [varchar](100),
        @PClientParentCompany [varchar](255),
        @PIndustryID [int],
        @PClientRevenueRangeID [int],
        @PPhoneNumber [nvarchar](50),
        @PEmailAddress [nvarchar](100),
        @PSubscriptionKey [varchar](100),
        @PRegistrationModeID [int],
        @PUserName [varchar](100),
        @PFirstName [varchar](100),
        @MiddleName [varchar](50),
        @PLastName [varchar](100),
        @PUserPassword [nvarchar](256),
        @PHash [varchar](512)


    )
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;
    DECLARE @countRowUser int,@countOrgDivUser int,@userID int
    DECLARE @Message VARCHAR(512)
    SELECT @countRowUser = Count(*) FROM [Amplo].[User]  WHERE EmailAddress = @PEmailAddress;
    SELECT @countOrgDivUser = Count(*) FROM [Amplo].[Client] WHERE ClientName = @PClientName 
    --AND ClientBusinessUnit = @PClientBusinessUnit;
    IF (@countRowUser>0)
        BEGIN
            --RETURN 1;
            select MessageName from Amplo.Message where MessageID = 1
        END
    ELSE IF(@countOrgDivUser>0)
        BEGIN
           -- RETURN 2;
           select MessageName from Amplo.Message where MessageID = 2
        END
    ELSE
    BEGIN 
    INSERT INTO [Amplo].[Client]
    (
    [ClientName],
	[ClientBusinessUnit],
	[ClientParentCompany],
	[IndustryID],
	[ClientRevenueRangeID],
	[PhoneNumber],
	[EmailAddress],
	[SubscriptionKey],
	[ActiveFlag],
	[RegistrationModeID],
	[ClientCreatedBy],
	[ClientCreatedDate]
    )
    VALUES
    (
        @PClientName,
        @PClientBusinessUnit,
        @PClientParentCompany,
        @PIndustryID,
        @PClientRevenueRangeID,
        @PPhoneNumber,
        @PEmailAddress,
        @PSubscriptionKey,
        1,
        1,
        'SYSADMIN',
        GETDATE()
      )
    DECLARE @id int
    SET @id =  @@IDENTITY

     
    
    INSERT INTO [Amplo].[User]
    (
        [UserName],
        [FirstName],
        [MiddleName],
        [LastName],
        [PhoneNumber],
        [EmailAddress],
        [UserPassword],
        [EmailValidationStatus],
        [ActiveFlag],
        [ClientID],
        [UserLinkedINProfileID],
        [UserTypeID],
        [UserStatusID],
        [UserCreatedBy],
        [UserCreatedDate]
    )
    VALUES
    (
        @PUserName,
        @PFirstName,
        @MiddleName,
        @PLastName,
        @PPhoneNumber,
        @PEmailAddress,
        @PUserPassword,
        0,
        1,
        @id,
        NULL,
        1,
        2,
        'SYSADMIN',
        GETDATE()
    );
    SELECT @userID = UserID FROM [Amplo].[User] WHERE UserName = @PUserName;
    INSERT INTO [Amplo].[EmailVerification]
    (
        [UserID],
      [UserName],
      [VerificationHashCode],
      [VerificationHashCodeDate],
      [VerificationFlag],
      [ActiveFlag],
      [VerificationDate],
      [VerificationRemarks],
      [UserIPAddress]
    )
    VALUES
    (
        @userID,
        @PUserName,
        @PHash,
        GETDATE(),
        0,
        1,
        NULL,
        NULL,
        NULL
    );
   -- RETURN 3;
   select MessageName from Amplo.Message where MessageID = 3
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

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END;










GO
/****** Object:  StoredProcedure [Amplo].[uspAddKPI]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspAddKPI]
	-- Add the parameters for the stored procedure here
           @UserID [varchar](100)
		  ,@BusinessOutcome [varchar](512)
          ,@BusinessMetrics [varchar](256) 
          ,@PersonaImpacted [varchar](256)
          ,@EstimatedSavings [varchar](100)
   	      ,@KpiTitle [varchar](100)
		  ,@ExpectedTargetGrowth [nvarchar](100)
		  ,@UnitOfMeasurement [nvarchar](50)
		  ,@TargetDate [datetime]
		  ,@Improvementbasis [varchar](50)
		  ,@AuditFrequency [varchar](50)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @KPIID [INT]

	Declare @clientid as INT
	Select @clientid = ClientID from Amplo.[User] where UserID = @UserID

    BEGIN TRY
    BEGIN TRANSACTION;

    -- Insert statements for procedure here
	INSERT INTO [Amplo].[KPI]
			   (ClientID
			   ,[KPIName]
			   ,[KPITitle]
			   ,[BusinessOutcome]
			   ,[BusinessMetrics]
			   ,[PersonaImpacted]
			   ,[EstimatedSavings]
			   ,[ActiveFlag]
			   ,[CreatedBy]
			   ,[CreatedDate]
			   ,[ExpectedTargetGrowth]
			   ,[UnitOfMeasurement]
			   ,[TargetDate]
			   ,[Improvementbasis]
			   ,[AuditFrequency]

				)
		 VALUES
			   (
				@clientid
			   ,'KPI Name' 
			   ,@KpiTitle
			   ,@BusinessOutcome 
			   ,@BusinessMetrics
			   ,@PersonaImpacted
			   ,@EstimatedSavings
			   ,1
			   ,@UserID
			   ,GETDATE()
			  ,@ExpectedTargetGrowth
			  ,@UnitOfMeasurement
			  ,@TargetDate
			  ,@Improvementbasis
			  ,@AuditFrequency
				)

		   SELECT @KPIID = SCOPE_IDENTITY();
		   SELECT @KPIID AS KPIID;

       Select MessageName from Amplo.[Message] where MessageID = 1026

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
/****** Object:  StoredProcedure [Amplo].[uspAddKPIControlLevers]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [Amplo].[uspAddKPIControlLevers]
	-- Add the parameters for the stored procedure here
           @UserID [varchar](100)
		  ,@KPIID [int]
          ,@ControlLeversTitle [varchar](256)
          ,@PersonaImpacted [varchar](256)
		  ,@KPIInhibitors [NVARCHAR](MAX)
		  ,@KPICapabilities [NVARCHAR](MAX)
		  ,@ExpectedTargetGrowth [nvarchar](100)
		  ,@UnitOfMeasurement [nvarchar](50)
		  ,@TargetDate [datetime]
		  ,@Improvementbasis [varchar](50)
		  ,@AuditFrequency [varchar](50)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    BEGIN TRY
    BEGIN TRANSACTION;

	DECLARE @KPIControlLeverID [int]
	DECLARE
    @counter    INT = 1,
    @max        INT = 0,
	@InhibitorsTitle VARCHAR(512),
    @CapabilitiesTitle VARCHAR(512),
	@Probability nvarchar(20),
	@ImpactCost nvarchar(50),
	@InvestmentRequired [nvarchar](50),
	@ExpectedBy [datetime],
	@ROWNumber int, @Capex nvarchar(100),
		@Opex nvarchar(100),
		@Frequency nvarchar(100), @CapexSpreadYears int

    -- Insert statements for procedure here
INSERT INTO [Amplo].[KPIControlLevers]
           ([KPIID]
           ,[ControlLeversName]
           ,[ControlLeversTitle]
           ,[PersonaImpacted]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate]
		   ,[ExpectedTargetGrowth]
	 	   ,[UnitOfMeasurement]
		   ,[TargetDate]
		   ,[Improvementbasis]
		   ,[AuditFrequency]
			)
     VALUES
           (@KPIID
           ,'Control Levers'
		   ,@ControlLeversTitle
           ,@PersonaImpacted
           ,1
           ,@UserID
           ,GETDATE()
		   ,@ExpectedTargetGrowth
		   ,@UnitOfMeasurement
		   ,@TargetDate
		   ,@Improvementbasis
		   ,@AuditFrequency
		)

		select @KPIControlLeverID = SCOPE_IDENTITY()
		select @KPIControlLeverID as KPIControlLeverID


/* KPI Inhibitors Deatils Persistence*/


		SELECT ID, Name, Probability, ImpactCost
		INTO #tblInhibitors
		FROM OPENJSON (@KPIInhibitors, '$.root')
		WITH (
		ID INT,
        Name NVARCHAR(512),
		Probability [nvarchar](20),
		ImpactCost [nvarchar](50)
		)

		SELECT @max = COUNT(1) FROM #tblInhibitors


	while @counter <= @max
		BEGIN

		-- Do whatever you want with each row in your table variable filtering by the Id column
		SELECT @InhibitorsTitle = Name, @Probability= Probability, @ImpactCost=ImpactCost FROM #tblInhibitors
		WHERE ID = @counter

		INSERT INTO [Amplo].[KPIInhibitors]
			([KPIControlLeversID]
			,[InhibitorsName]
			,[InhibitorsTitle]
			,[Probability]
			,[ImpactCost]
			,[ActiveFlag]
			,[CreatedBy]
			,[CreatedDate]
			)
		VALUES
			(@KPIControlLeverID
			,'Inhibitors Name'
			,@InhibitorsTitle
			,@Probability
			,@ImpactCost
			,1
			,@UserID
			,GETDATE()
			)

		SET @counter = @counter + 1
	END

/* KPI Capabilities Deatils Persistence*/

		SELECT ID, Name, ExpectedBy
		INTO #tblKPICapabilities
		FROM OPENJSON (@KPICapabilities, '$.root')
		WITH (
		ID INT,
        Name NVARCHAR(512),
		ExpectedBy datetime,
		Capex nvarchar(100),
		Opex nvarchar(100),
		Frequency nvarchar(100),
		CapexSpreadYears int
		)

		SET @counter = 1;
		SELECT @max = COUNT(1) FROM #tblKPICapabilities;

		while @counter <= @max
		BEGIN
			-- Do whatever you want with each row in your table variable filtering by the Id column
			SELECT @CapabilitiesTitle = Name, @ExpectedBy = ExpectedBy
			, @Capex = Capex, @Opex = Opex, @Frequency = Frequency, @CapexSpreadYears = CapexSpreadYears
			FROM #tblKPICapabilities
			WHERE ID = @counter

			INSERT INTO [Amplo].[KPICapabilities]
				([KPIControlLeversID]
				,[CapabilitiesName]
				,[CapabilitiesTitle]
				,[ExpectedBy]
				,[ActiveFlag]
				,[CreatedBy]
				,[CreatedDate]
				, Capex,
				Opex,
				Frequency,
				CapexSpreadYears
				)
			VALUES
				(@KPIControlLeverID
				,'Capabilities Name'
				,@CapabilitiesTitle
				,@ExpectedBy
				,1
				,@UserID
				,GETDATE()
				, @Capex,
				@Opex,
				@Frequency,
				@CapexSpreadYears
				);
			SET @counter = @counter + 1
		END

    Select messageName from Amplo.[Message] where MessageID = 1027;

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [AMPLO].[uspLogError];
    END CATCH;

END


declare @BaseSchemaName as nvarchar(100) = 'amplo'
declare @SchemaName as nvarchar(100) = 'Test102211'
declare @OriginalName as nvarchar(100) = 'uspAddKPIControlLevers'
drop proc Test102211.uspAddKPIControlLevers
declare @ProcDefinition as nvarchar(MAX) = OBJECT_DEFINITION (OBJECT_ID('[Amplo].[uspAddKPIControlLevers]'))
declare @SPDefinition as nvarchar(MAX) = @ProcDefinition
set @SPDefinition = (dbo.OmitSchemaName(@ProcDefinition, @BaseSchemaName, @SchemaName, @OriginalName))
select @SPDefinition
EXEC sp_executesql @SPDefinition


select * from Amplo.[KPICapabilities]
GO
/****** Object:  StoredProcedure [Amplo].[uspAddNewCapabilityModellingProject]    Script Date: 1/9/2020 6:47:56 PM ******/
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
/****** Object:  StoredProcedure [Amplo].[uspAddNewCapabilityModellingProject_27102019]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:      Srinivas
-- Create Date: 25-Oct-2019
-- Description: This procedure adds Capability Modelling project details 
-- =============================================
CREATE PROCEDURE [Amplo].[uspAddNewCapabilityModellingProject_27102019]
 (
    @id int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@CapabilityProjectName - Name of new set
@userids - comma separated string of userids to map to set
@disableDate - Date for disable of client project
*/
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
    --AND DisableDate > GETDATE()
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
      -- [DecompositionProjectUserName]
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
    --  ,[ProductionFlag]
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

	--------- Insert level 1 template data start -----------
	Insert into Amplo.DecompositionProcessLevel1(
       [ClientID]
      ,[DecompositionProjectID]
      ,[ProcessLevel1Name]
	  ,[ProcessLevel1Title]
      ,[ActiveFlag]
      ,[LockedFlag]
      ,[Status]
      ,[DesignChoice]
     -- ,[LockedBy]
     -- ,[LockedDateTime]
      ,[UserID]
      ,[GridViewLocationID]
      ,[GridVViewLocationFlag]
    --  ,[GridViewPreviousLocationID]
      ,[FunctionID]
      ,[PhaseID]
    )
    select 
    @clientid,
    @createdProjectID,
    l1Main.ProcessLevel1Name,
	l1Main.ProceeLevel1Title,
    1,
    0,
    1,--Insert status here
    l1Main.DesignChoice,
	@id,
    l1Main.GridViewLocationID,
    l1Main.GridVViewLocationFlag,
    l1Main.DecompositionFunctionID,
    l1Main.DecompositionPhaseID
	from Amplo.AmploDecompositionProcessLevel1 l1Main where ActiveFlag = 1 
    --from Amplo.DecompositionLevel1Activity l1Main where ActiveFlag = 1 
    


	--------- Insert level 1 template data end -----------

/*
   -- Add Phase and Function mapping when project is added

   declare  @domainMap Table(
       userid int,
       domainid int
   ) 

    insert into @domainMap
    select b.userids, a.domainID
    from (select DomainID from Amplo.AmploDomain where ActiveFlag=1) a  
    cross join @ValidUserIDs b

    -- Access Type - 1- Read+Write, 2 - Read Only, 3- No Access
    INSERT INTO Amplo.[UserDomainAccess](
       [ClientID]
      ,[UserID]
      ,[DomainID]
      ,[AccessType]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[BenchmarkProjectID]
    )
    Select
        @clientid,
        userid,
        domainid,
        1,
        1,
        @id,
        GETDATE(),
        @createdSetID
    from @domainMap
 */

    -- Successfull addition of new benchmark project
    SELECT messageName from Amplo.[Message] where MessageID = 1019

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
/****** Object:  StoredProcedure [Amplo].[uspAddNewCapabilityModellingProject_28102019]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspAddNewCapabilityModellingProject_28102019]
 (
    @id int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@CapabilityProjectName - Name of new set
@userids - comma separated string of userids to map to set
@disableDate - Date for disable of client project
*/
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
    --AND DisableDate > GETDATE()
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
      -- [DecompositionProjectUserName]
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
    --  ,[ProductionFlag]
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

	--------- Insert level 1 template data start -----------

/*
	Insert into Amplo.DecompositionProcessLevel1(
       [ClientID]
      ,[DecompositionProjectID]
      ,[ProcessLevel1Name]
      ,[ActiveFlag]
      ,[LockedFlag]
      ,[Status]
      ,[DesignChoice]
     -- ,[LockedBy]
     -- ,[LockedDateTime]
      ,[UserID]
      ,[GridViewLocationID]
      ,[GridVViewLocationFlag]
    --  ,[GridViewPreviousLocationID]
      ,[FunctionID]
      ,[PhaseID]
    )
    select 
    @clientid,
    @createdProjectID,
    l1Main.Level1ActivityName,
    1,
    0,
    NULL,--Insert status here
    l1Main.Level1ActivityDeisgnChoice,
	@id,
    l1Main.GridViewLocationID,
    l1Main.GridVViewLocationFlag,
    l1Main.DecompositionFunctionID,
    l1Main.DecompositionPhaseID

    from Amplo.DecompositionLevel1Activity l1Main where ActiveFlag = 1 
  */
  
  	Insert into Amplo.DecompositionProcessLevel1(
       [ClientID]
      ,[DecompositionProjectID]
      ,[ProcessLevel1Name]
	  ,[ProcessLevel1Title]
      ,[ActiveFlag]
      ,[LockedFlag]
      ,[Status]
      ,[DesignChoice]
     -- ,[LockedBy]
     -- ,[LockedDateTime]
      ,[UserID]
      ,[GridViewLocationID]
      ,[GridVViewLocationFlag]
    --  ,[GridViewPreviousLocationID]
      ,[FunctionID]
      ,[PhaseID]
    )
    select 
    @clientid,
    @createdProjectID,
    l1Main.ProcessLevel1Name,
	l1Main.ProceeLevel1Title,
    1,
    0,
    1,--Insert status here
    l1Main.DesignChoice,
	@id,
    l1Main.GridViewLocationID,
    l1Main.GridVViewLocationFlag,
    l1Main.DecompositionFunctionID,
    l1Main.DecompositionPhaseID
	from Amplo.AmploDecompositionProcessLevel1 l1Main where ActiveFlag = 1 
    --from Amplo.DecompositionLevel1Activity l1Main where ActiveFlag = 1 

	--------- Insert level 1 template data end -----------

/*
   -- Add Phase and Function mapping when project is added

   declare  @domainMap Table(
       userid int,
       domainid int
   ) 

    insert into @domainMap
    select b.userids, a.domainID
    from (select DomainID from Amplo.AmploDomain where ActiveFlag=1) a  
    cross join @ValidUserIDs b

    -- Access Type - 1- Read+Write, 2 - Read Only, 3- No Access
    INSERT INTO Amplo.[UserDomainAccess](
       [ClientID]
      ,[UserID]
      ,[DomainID]
      ,[AccessType]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[BenchmarkProjectID]
    )
    Select
        @clientid,
        userid,
        domainid,
        1,
        1,
        @id,
        GETDATE(),
        @createdSetID
    from @domainMap
 */

    -- Successfull addition of new benchmark project
    SELECT messageName from Amplo.[Message] where MessageID = 1019

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
/****** Object:  StoredProcedure [Amplo].[uspAddNewCapabilityModellingProject2]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspAddNewCapabilityModellingProject2]
 (
    @id int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@CapabilityProjectName - Name of new set
@userids - comma separated string of userids to map to set
@disableDate - Date for disable of client project
*/
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
    --AND DisableDate > GETDATE()
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
      -- [DecompositionProjectUserName]
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
    --  ,[ProductionFlag]
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
---------------------------Adding mapping of phases and functions to project level and user level -----------------------

-- For inserting project level mapping of functions
    declare @functionNetMap TABLE(
       functionID int 
    )

    insert into @functionNetMap
    select DecompositionFunctionID from Amplo.DecompositionFunction where ActiveFlag = 1
    --Insert filters for industry after MVP1


--Insert project mapping with function
    insert into [Amplo].[DecompositionFunctionProject]
     ([DecompositionProjectID]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[FunctionName]
      ,[FunctionDescription]
      ,[FunctionMeaning]
      ,[ProcesDeisgnChoice]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[UserID])

    select
    @createdProjectID,
    @industryid,
    @industryverticalid,
    @industrysubverticalid,
    template.FunctionName,
    template.FunctionDescription,
    template.FunctionMeaning,
    template.ProcesDeisgnChoice,
    1,
    @id,
    GETDATE(),
    NULL

    from @functionNetMap map
    inner join Amplo.DecompositionFunction template
    on map.functionID = template.DecompositionFunctionID


-- For inserting project level mapping of phases
    declare @phaseNetMap TABLE(
       phaseID int
    )

    insert into @phaseNetMap
    select DecompositionPhaseID from 
    Amplo.DecompositionPhase 
    where ActiveFlag = 1
    --Industry filters to be applied after MVP1

--Insert project mapping with phase
    insert into [Amplo].[DecompositionPhaseProject]
     ([UserID]
      ,[DecompositionProjectID]
      ,[PhaseName]
      ,[PhaseDescription]
      ,[PhaseMeaning]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
    )
    select
    NULL,
    @createdProjectID,
    PhaseName,
    PhaseDescription,
    PhaseMeaning,
    1,
    @id,
    GETDATE(),
    @industryid,
    @industryverticalid,
    @industrysubverticalid
    from 
    (select phaseID from @phaseNetMap) map
    inner join (Select PhaseName, PhaseDescription,PhaseMeaning, DecompositionPhaseID from Amplo.DecompositionPhase) template
    on map.[phaseID] = template.DecompositionPhaseID




--For mapping users with access
    declare  @phaseFunctionUserMap Table(
       userid int,
       functionID int,
       phaseID int
   ) 

    insert into @phaseFunctionUserMap
    SELECT usr.userIDs, fn.functionID, ph.phaseID
    from (select userIDs from @ValidUserIDs) usr
    cross join @functionNetMap fn
    cross join @phaseNetMap ph

-- Insert User mapping to phases and functions
    INSERT INTO Amplo.[DecompositionUserAccess](
       [UserAccessName]
      ,[UserAccessDescription]
      ,[ClientID]
      ,[UserID]
      ,[DecompositionProjectID]
      ,[FunctionID]
      ,[PhaseID]
      ,[ActiveFlag]
      ,[CreadedBy]
      ,[CreatedDate]
    )
    Select
        NULL,
        NULL,
        @clientid,
        userid,
        @createdProjectID,
        functionID,
        phaseID,
        1,
        @id,
        GETDATE()
    from @phaseFunctionUserMap



------------------Replicating all default L1 activities from master template to project specific L1s------------------------------


    Insert into Amplo.DecompositionProcessLevel1(
       [ClientID]
      ,[DecompositionProjectID]
      ,[ProcessLevel1Name]
      ,[ActiveFlag]
      ,[LockedFlag]
      ,[Status]
      ,[DesignChoice]
     -- ,[LockedBy]
     -- ,[LockedDateTime]
    --  ,[UserID]
      ,[GridViewLocationID]
      ,[GridVViewLocationFlag]
    --  ,[GridViewPreviousLocationID]
      ,[FunctionID]
      ,[PhaseID]
    )
    select 
    @clientid,
    @createdProjectID,
    l1Main.Level1ActivityName,
    1,
    0,
    NULL,--Insert status here
    l1Main.Level1ActivityDeisgnChoice,
    l1Main.GridViewLocationID,
    l1Main.GridVViewLocationFlag,
    l1Main.DecompositionFunctionID,
    l1Main.DecompositionPhaseID

    from (Select Level1ActivityName, Level1ActivityDeisgnChoice, GridViewLocationID, GridVViewLocationFlag, DecompositionFunctionID, DecompositionPhaseID from Amplo.DecompositionLevel1Activity where ActiveFlag = 1) l1Main
    inner join @functionNetMap fn on fn.functionID = l1Main.DecompositionFunctionID
    inner JOIN @phaseNetMap ph on ph.phaseID = l1Main.DecompositionPhaseID 


    -- Successfull addition of new capability modelling project
    SELECT messageName from Amplo.[Message] where MessageID = 1019

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
/****** Object:  StoredProcedure [Amplo].[uspAddNewClientProject]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspAddNewClientProject]
 (
    @id int,
    @assessmentSetName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentSetName - Name of new set
@userids - comma separated string of userids to map to set
*/
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
    --AND DisableDate > GETDATE()
    ) b
    on a.userids = b.UserID

    --Create New benchmark project
    insert into Amplo.BenchmarkProject(
        [BenchmarkProjectName],
        [BenchmarkProjectDescription],
        [ServiceID],
        [IndustryID],
        [IndustryVerticalID],
        [IndustrySubVerticalID],
      DisabledFlag,
        [CreatedBy],
        [CreatedDate]
      ,[status]
	  , ClientId
	  , LockedFlag
    )
    VALUES(
        @assessmentSetName,
        NULL,
        1,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
		0, 
        @id,
        GETDATE(),
        1,
		@ClientId
		, 0
    )

    declare @createdSetID INT

    SELECT @createdSetID = SCOPE_IDENTITY();

    --Add users to benchmark project
    INSERT INTO Amplo.BenchmarkProjectUser(
       [BenchmarkProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActivityFlag]
      ,[ActiveFlag]
   -- ,[DisableDate]
      ,[CreatedBy]
      ,[CreatedDate]
    )
    SELECT 
        @createdSetID,
        @clientID,
        userIDs,
        1,
        1,
        @id,
        GETDATE()
    from @ValidUserIDs


   -- Add domain mapping when set is added

   declare  @domainMap Table(
       userid int,
       domainid int
   ) 

    insert into @domainMap
    select b.userids, a.domainID
    from (select DomainID from Amplo.AmploDomain where ActiveFlag=1) a  
    cross join @ValidUserIDs b

    -- Access Type - 1- Read+Write, 2 - Read Only, 3- No Access
    INSERT INTO Amplo.[UserDomainAccess](
       [ClientID]
      ,[UserID]
      ,[DomainID]
      ,[AccessType]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[BenchmarkProjectID]
    )
    Select
        @clientid,
        userid,
        domainid,
        1,
        1,
        @id,
        GETDATE(),
        @createdSetID
    from @domainMap

	INSERT INTO [Amplo].[BenchmarkingGoalSetting]
           ([BenchmarkProjectID]
           ,[ClientID]
           ,[IndustryBenchmark]
           ,[ASISBenchmark]
           ,[GoalSetting]
           ,[CreadedBy]
           ,[CreatedOn]
           ,[DomainID])
	select
			@createdSetID
           ,@clientid
           ,0.00
           ,0.00
           ,0.00
           ,@id
           ,GETDATE()
           ,domainid
	from Amplo.AmploDomain where ActiveFlag=1

    -- Successfull addition of new benchmark project
    SELECT messageName from Amplo.[Message] where MessageID = 12

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
/****** Object:  StoredProcedure [Amplo].[uspAddProcessLevel1Template]    Script Date: 1/9/2020 6:47:56 PM ******/
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
/****** Object:  StoredProcedure [Amplo].[uspAddProcessLevel2Template]    Script Date: 1/9/2020 6:47:56 PM ******/
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
/****** Object:  StoredProcedure [Amplo].[uspAddProcessLevel3Template]    Script Date: 1/9/2020 6:47:56 PM ******/
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
/****** Object:  StoredProcedure [Amplo].[uspAddProcessLevel4Template]    Script Date: 1/9/2020 6:47:56 PM ******/
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
/****** Object:  StoredProcedure [Amplo].[uspAddProcessLevel5Template]    Script Date: 1/9/2020 6:47:56 PM ******/
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
/****** Object:  StoredProcedure [Amplo].[uspAddSecurityQuestion]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspAddSecurityQuestion]
    (
        @UserID [int],
        @PasswordQuestionID [int],
--        @PasswordQuestion [nvarchar](512),
        @PasswordAnswer[nvarchar](512)
    )
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;
    INSERT INTO [Password]
    (
      [UserID],
      [PasswordQuestionID],
      [PasswordAnswer],
      [BeginDate],
      [EndDate],
      [ActiveFlag],
      [CreatedBy],
      [CreatedOn],
	  [ModifedBy],
	  [ModifiedOn]
    )
    VALUES
    (
        @UserID,
        @PasswordQuestionID,
        @PasswordAnswer,
        GETDATE(),
        NULL,
        1,
        @UserID,
        GETDATE(),
        @UserID,
        GETDATE()
    )

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

END;






GO
/****** Object:  StoredProcedure [Amplo].[uspApproveClient]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspApproveClient]
@ClientId as int
, @ApprovedBy nvarchar(200)
, @ApprovedAt datetime
, @Login nvarchar(256)
, @Password nvarchar(256)
as
begin
	declare @ClientName as nvarchar(200) = (select ClientName from [Amplo].[Client] where [ClientID] = @ClientId)
	set @ClientName = Substring(replace(replace(@ClientName, ' ', ''), '.', ''), 1, 100) + cast(@ClientId as nvarchar(20)) + '11'
	update amplo.Client set ClientStatus = 1 where ClientId = @ClientId
	--declare @Login as nvarchar(256) = 'NewLogin11' + cast(@ClientId as nvarchar(20)) + '50'
	--declare @Password as nvarchar(256) = 'NewPassword1' + cast(@ClientId as nvarchar(20)) + '50'
	declare @User as nvarchar(256) = 'NewUser11' + cast(@ClientId as nvarchar(20)) + '11'
	exec amplo.CreateMultipleSchema
	  @ClientName
	, @Login
	, @Password
	, @ClientId
	, @User
end

GO
/****** Object:  StoredProcedure [Amplo].[uspApproveClientProc]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Amplo].[uspApproveClientProc]
@ClientId as int
, @ProcName as nvarchar(200)
, @OriginalName as nvarchar(200)
as
begin
	set nocount on
	
	
	
	----declare @Login as nvarchar(256) = 'NewLogin11' + cast(@ClientId as nvarchar(20)) + '50'
	----declare @Password as nvarchar(256) = 'NewPassword1' + cast(@ClientId as nvarchar(20)) + '50'
	--declare @User as nvarchar(256) = 'NewUser10' + cast(@ClientId as nvarchar(20))
	--declare @UserId as nvarchar(256) = @User + 'User'
	--exec amplo.CreateMultipleSchema
	--  @ClientName
	--, @Login
	--, @Password
	--, @ClientId
	--, @User

    DECLARE @ClientSchemaCreationId AS BIGINT
    declare @iSsUCCESS AS BIT
	BEGIN TRY
		--SET NOCOUNT ON
		--BEGIN TRANSACTION trMain
			
	
			DECLARE @BaseSchemaName AS NVARCHAR(100) = 'Amplo'
			DECLARE @TableName AS NVARCHAR(500)


			SET @ClientSchemaCreationId = (SELECT MAX(ClientSchemaCreationId) FROM [Amplo].ClientSchemaCreation where ClientId = @ClientId)
	        declare @SchemaName as nvarchar(200) = (SELECT SchemaName FROM [Amplo].ClientSchemaCreation where ClientSchemaCreationId = @ClientSchemaCreationId)
	
			DECLARE @DbObjectToCreateId AS INT
			DECLARE @ObjectType AS NVARCHAR(200)
			declare @TableSql as nvarchar(MAX)
			declare @DoCopyValues as bit

			
			------------- For store procs --------------
			
			BEGIN TRY
					
					--set @ProcName = (SELECT top 1 value FROM STRING_SPLIT(@ProcName, '.'))
					declare @ProcDefinition as nvarchar(MAX) = OBJECT_DEFINITION (OBJECT_ID(@ProcName))
					--set @ProcDefinition = REPLACE(@ProcDefinition, '''', '''''')
					declare @SPDefinition as nvarchar(MAX) = @ProcDefinition
					set @SPDefinition = (dbo.OmitSchemaName(@ProcDefinition, @BaseSchemaName, @SchemaName, @OriginalName))
					EXEC sp_executesql @SPDefinition
					--select @ProcDefinition, @ProcName, @SPDefinition
					INSERT INTO [Amplo].ClientSchemaCreationLog 
						VALUES (@ProcName, @ClientSchemaCreationId, 1, @SPDefinition, '')
				END TRY
				BEGIN CATCH
					select ERROR_MESSAGE()
					INSERT INTO [Amplo].ClientSchemaCreationLog 
					VALUES (@ProcName, @ClientSchemaCreationId, 0, @SPDefinition, ERROR_MESSAGE())

					set @IsSuccess = 0
				END CATCH
			
		--COMMIT

        select @ClientSchemaCreationId as ClientSchemaCreationId
	END TRY
	BEGIN CATCH
        INSERT INTO [Amplo].ClientSchemaCreationLog 
						VALUES ('Error', @ClientSchemaCreationId, 0, ERROR_MESSAGE(), Error_Line())
                        select 0 as ClientSchemaCreationId
	select ERROR_MESSAGE(), Error_Line()
		--ROLLBACK TRANSACTION trMain
		EXECUTE [dbo].[uspLogError];
	END CATCH
end
GO
/****** Object:  StoredProcedure [Amplo].[uspBenchmarkingReport]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 09-Sep-2019
-- Description:	This procedure retrieves Benchmarking ASIS score, TO Be score and Industry Benchmarking score for reporting purpose
-- =============================================
CREATE PROCEDURE [Amplo].[uspBenchmarkingReport] 
	-- Add the parameters for the stored procedure here
	@UserID [int]
--	@ClientID int,
   ,@ProjectID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	Declare @ClientID as INT
	Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

    -- Insert statements for procedure here
	SELECT  BGS.[BenchmarkProjectID], [RegionID], BP.[IndustryID], BP.[IndustryVerticalID], BP.[IndustrySubVerticalID], BGS.[DomainID], [IndustryBenchmark], [ASISBenchmark], [GoalSetting], BDM.[DomainName], BP.LockedFlag as LockedStatus from Amplo.BenchmarkingGoalSetting BGS
			--inner join [Amplo].[AmploDomain] DM on  BGS.DomainID = DM.DomainID
            inner join [Amplo].[BenchmarkingDomain] BDM on  BGS.DomainID = BDM.DomainID
            inner join [Amplo].BenchmarkProject BP on BGS.BenchmarkProjectID = BP.BenchmarkProjectID
	where BGS.[BenchmarkProjectID] = @ProjectID and BGS.ClientID = @ClientID
	order by BGS.DomainID asc;

END







GO
/****** Object:  StoredProcedure [Amplo].[UspCapabilityModelingProjectsExport]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[UspCapabilityModelingProjectsExport]
	-- Add the parameters for the stored procedure here
	@ProjectID [int]
	--@ProcessLevel1ID [int]
AS
BEGIN

	
   --------------------------------------------------------------------------------------------------------------

  select DISTINCT
			
			ProjectName
			
			--ProcessLevelNodeID as ProcessLevelID, 
			--ProcessLevelTitle, 
			
		
			--d.Owner, 
			--d.CountrySpecific, 
			--Priority, 
			
			--ProcessLevel
			
		FROM 
		--#DecompositionProcessLevelDetails d 
		
		--inner join 
		 DecompositionProject r Where r.DecompositionProjectID=@ProjectID 
		--inner join DecompositionFunctionProject f on f.DecompositionProjectID=r.DecompositionProjectID 
		--inner  join DecompositionProcessLevel1 a on a.DecompositionProjectID =@ProjectID 
			--	WHERE
		 --a.DecompositionProcessLevel1ID = @ProcessLevel1ID 
		

	

END
GO
/****** Object:  StoredProcedure [Amplo].[uspChangeBMProjectDisableDate]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspChangeBMProjectDisableDate]
 (
    @id int,
    @assessmentSetID int,
    @disableDate DATETIME
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentSetID - ID of set to update
@disableDate - DateTime type to update disable date
*/
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

    declare @projFforClientFlag as int
    select @projFforClientFlag = Count(BenchmarkProjectID) from Amplo.BenchmarkProjectUser where ClientID = (select ClientID from Amplo.[User] where UserID = @id) and BenchmarkProjectID = @assessmentSetID

    IF ISNULL(@projFforClientFlag,0) < 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


--update disable date in table
    Update Amplo.BenchmarkProject
    SET DisableDate = @disableDate, ModifiedBy = @id, ModifiedDate = GETDATE() where BenchmarkProjectID = @assessmentSetID

    --update disabled flag if to be disabled
    IF @disableDate < GETDATE()
    BEGIN
        
        Update Amplo.BenchmarkProject
        SET DisabledFlag = 1 where BenchmarkProjectID = @assessmentSetID
    END

    ELSE
    Begin
         Update Amplo.BenchmarkProject
        SET DisabledFlag = 0 where BenchmarkProjectID = @assessmentSetID
    END

    select MessageName from Amplo.Message where MessageID = 1013

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
/****** Object:  StoredProcedure [Amplo].[uspChangeCapModProjectDisableDate]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspChangeCapModProjectDisableDate]
 (
    @id int,
    @CapModProjectID int,
    @disableDate DATETIME
 )
AS
BEGIN
/*
@id - Logged in userID
@CapModProjectID - ID of set to update
@disableDate - DateTime type to update disable date
*/
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

    declare @projFforClientFlag as int
    select @projFforClientFlag = Count(DecompositionProjectID) from Amplo.DecompositionProject where ClientID = (select ClientID from Amplo.[User] where UserID = @id) and DecompositionProjectID = @CapModProjectID

    IF ISNULL(@projFforClientFlag,0) < 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


--update disable date in table
    Update Amplo.DecompositionProject
    SET DisableDate = @disableDate, ModifiedBy = @id, ModifiedDate = GETDATE() where DecompositionProjectID = @CapModProjectID

    --update disabled flag if to be disabled
    IF @disableDate < GETDATE()
    BEGIN
        
        Update Amplo.DecompositionProject
        SET DisabledFlag = 1 where DecompositionProjectID = @CapModProjectID
    END

    ELSE
    Begin
         Update Amplo.DecompositionProject
        SET DisabledFlag = 0 where DecompositionProjectID = @CapModProjectID
    END

    select MessageName from Amplo.Message where MessageID = 1013

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
/****** Object:  StoredProcedure [Amplo].[uspChangeDisableDate]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspChangeDisableDate]
 (
    @id int,
    @userIDtoChangeDate varchar(100),
    @disableDate DATETIME
 )
AS
BEGIN
/*
@id - Logged in userID
@userIDtoChangeDate - User ID to update
@disableDate - DateTime type to update disable date
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF @SuperUser <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    declare @sameClientFlag INT
    select @sameClientFlag = COUNT(UserID) from Amplo.[User] where UserID = @userIDtoChangeDate and ClientID = (Select ClientID from Amplo.[User] where UserID = @id)

    IF @sameClientFlag = 0
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    Update Amplo.[User]
    SET DisableDate = @disableDate, UserModifiedBy = @id, UserModifiedDate = GETDATE() where UserID = @userIDtoChangeDate


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
/****** Object:  StoredProcedure [Amplo].[uspChangePassword]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Amplo].[uspChangePassword]
@UserId int
, @NewPassword nvarchar(256)
as
begin
	BEGIN TRY
		update [Amplo].[User] set [UserPassword] = @NewPassword
		where UserId = @UserId
    END TRY
    BEGIN CATCH
        EXECUTE [AMPLO].[uspLogError];
    END CATCH
end
GO
/****** Object:  StoredProcedure [Amplo].[uspCMImportToStaging]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspCMImportToStaging]
@ProjectName as nvarchar(100)
, @ScoringMechanism as nvarchar(MAX)
, @ProcessL1 as nvarchar(MAX)
, @Decomposition as nvarchar(MAX)
, @AdditionalDetail as nvarchar(MAX)
, @UserId int
As
begin
	set nocount on
	begin try
		declare @ClientId int = (select ClientId from amplo.[User] where UserId = @UserId)
		declare @ProcessLevel1Title as nvarchar(100)
		declare @MasterId uniqueidentifier = newId()
		declare @SuccessFlag as bit = 0
		declare @ProjectId as int = (select top 1 [DecompositionProjectID] from [Amplo].[DecompositionProject] where [ProjectName] = @ProjectName and [ClientID] = @ClientId and ActiveFlag = 1 and DisabledFlag = 0)
		if(@ProjectId is not null and @ProjectId > 0)
		begin
			set @SuccessFlag = @SuccessFlag
		end
		else
		begin
			set @SuccessFlag = 0
			insert into amplo.CMImportLogStaging
			values(newId(), @MasterId, 'error', 'The project is not available!', '', GETDATE())
		end

		if(select count(1) from [Amplo].[DecompositionProjectUser] where [DecompositionProjectID] = @ProjectId and [UserID] = @UserId and ActiveFlag = 1) > 0
		begin
			set @SuccessFlag = @SuccessFlag
		end
		else
		begin
			set @SuccessFlag = 0
			insert into amplo.CMImportLogStaging
			values(newId(), @MasterId, 'error', 'The user is not permitted to edit this project!', '', GETDATE())
		end

		SELECT *
		INTO #ProcessLevel1
		FROM OPENJSON (@ProcessL1, '$.root')
		WITH (
		[Phase] NVARCHAR(100)
        , [Function] NVARCHAR(100)
		, Title NVARCHAR(100)
		, [Priority] NVARCHAR(100)
		, [Owner] NVARCHAR(100)
		, Country NVARCHAR(100)
		)
		if(select count(1) from [Amplo].[DecompositionProcessLevel1] l1 
			join [Amplo].[DecompositionFunctionProject] f on (l1.[DecompositionProjectID] = f.[DecompositionProjectID] and f.ActiveFlag = 1)
			join [Amplo].[DecompositionPhaseProject] p on (p.[DecompositionProjectID] = l1.[DecompositionProjectID] and p.ActiveFlag = 1)
			join #ProcessLevel1 pl1 on (pl1.[Phase] = p.PhaseName and l1.[ProcessLevel1Title] = Title
			and pl1.[Function] = f.FunctionName)
			where l1.[DecompositionProjectID] = @ProjectId
			) > 0
		begin
			
			set @SuccessFlag = @SuccessFlag
		end
		else
		begin
			set @SuccessFlag = 0
			insert into amplo.CMImportLogStaging
			values(newId(), @MasterId, 'error', 'The phase or function or the activity is not present. You cannot edit either of these!', '', GETDATE())
		end

		set @SuccessFlag = 1
		if(@SuccessFlag = 1)
		begin
			set @ProcessLevel1Title = (select top 1 Title from #ProcessLevel1)
			insert into amplo.CMProjectImportStaging
			values(@MasterId, @ProjectName, @ProcessLevel1Title, @ClientId, @UserId, GETDATE(), 0)

			------------- Scoring mechanism --------------
			SELECT *
			INTO #ScoringMechanism
			FROM OPENJSON (@ScoringMechanism, '$.root')
			WITH (
			ScoreCriteria1 NVARCHAR(100)
			, ScoreCriteria2 NVARCHAR(100)
			, ScoreCriteria3 NVARCHAR(100)
			, ScoreCriteria4 NVARCHAR(100)
			, ScoreCriteria5 NVARCHAR(100)
			, ScoreCriteria6 NVARCHAR(100)
			, ScoreCriteria7 NVARCHAR(100)
			, ScoreCriteria8 NVARCHAR(100)
			, ScoreCriteria9 NVARCHAR(100)
			, ScoreCriteria10 NVARCHAR(100)
			)

			insert into amplo.CMScoringMechanismImportStaging
			select top 1 NewId(), @MasterId, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5
			, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10 from #ScoringMechanism


			-------------------- Process Level 1 ------------------
			insert into amplo.CMProcessL1ImportStaging
			select NewId(), @MasterId, [Phase], [Function], Title, [Priority], [Owner], Country from #ProcessLevel1


			--------------------- Decomposition ------------------
			SELECT *
			INTO #Decomposition
			FROM OPENJSON (@Decomposition, '$.root')
			WITH (
			  L1ActivityTitle nvarchar(100)
			, L2ActivityTitle nvarchar(100)
			, L3ActivityTitle nvarchar(100)
			, L4ActivityTitle nvarchar(100)
			, L5ActivityTitle nvarchar(100)
			, ScoringCriteria1 numeric(2, 1)
			, ScoringCriteria2 numeric(2, 1)
			, ScoringCriteria3 numeric(2, 1)
			, ScoringCriteria4 numeric(2, 1)
			, ScoringCriteria5 numeric(2, 1)
			, ScoringCriteria6 numeric(2, 1)
			, ScoringCriteria7 numeric(2, 1)
			, ScoringCriteria8 numeric(2, 1)
			, ScoringCriteria9 numeric(2, 1)
			, ScoringCriteria10 numeric(2, 1)
			, [Priority] nvarchar(100)
			, [Owner] nvarchar(100)
			, Country nvarchar(100)
			)

			insert into amplo.CMDecompositionImportStaging
			select NewId(), @MasterId, L2ActivityTitle, L3ActivityTitle, L4ActivityTitle, L5ActivityTitle, ScoringCriteria1, ScoringCriteria2, ScoringCriteria3, ScoringCriteria4
			, ScoringCriteria5, ScoringCriteria6, ScoringCriteria7, ScoringCriteria8, ScoringCriteria9, ScoringCriteria10, [Priority], [Owner], Country from #Decomposition

			--------------------- Additional Detail ------------------
			SELECT *
			INTO #AdditionalDetail
			FROM OPENJSON (@Decomposition, '$.root')
			WITH (
			  L1ActivityTitle nvarchar(100)
			, L2ActivityTitle nvarchar(100)
			, L3ActivityTitle nvarchar(100)
			, L4ActivityTitle nvarchar(100)
			, L5ActivityTitle nvarchar(100)
			, Number1 numeric(10, 2), Number2 numeric(10, 2), Number3 numeric(10, 2), Number4 numeric(10, 2), Number5 numeric(10, 2)
			, Number6 numeric(10, 2), Number7 numeric(10, 2), Number8 numeric(10, 2), Number9 numeric(10, 2), Number10 numeric(10, 2)
			, Attribute1 nvarchar(256), Attribute2 nvarchar(256), Attribute3 nvarchar(256), Attribute4 nvarchar(256), Attribute5 nvarchar(256)
			, Attribute6 nvarchar(256), Attribute7 nvarchar(256), Attribute8 nvarchar(256), Attribute9 nvarchar(256), Attribute10 nvarchar(256)
			, Blob1 varbinary(MAX), Blob2 varbinary(MAX), Blob3 varbinary(MAX), Clob1 varchar(MAX), Clob2 varchar(MAX), Clob3 varchar(MAX)
			)

			insert into amplo.CMAdditionalDetailImportStaging
			select NewId(), @MasterId, L2ActivityTitle, L3ActivityTitle, L4ActivityTitle, L5ActivityTitle, Number1, Number2, Number3, Number4
			, Number5, Number6, Number7, Number8, Number9, Number10, Attribute1, Attribute2, Attribute3, Attribute4, Attribute5, Attribute6, Attribute7, Attribute8
			, Attribute9, Attribute10, Blob1, Blob2, Blob3, Clob1, Clob2, Clob3
			from #AdditionalDetail
		end

		select @SuccessFlag Success, 'Imported successfully' [Message]
	end try
	begin catch
		select cast(0 as bit) Success, error_message() [Message]
		exec dbo.uspLogError
	end catch
end


	
GO
/****** Object:  StoredProcedure [Amplo].[uspCreateTemplate]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspCreateTemplate]
@TemplateId as int
, @TemplateName as nvarchar(100)
, @UserId as int
, @Clients as nvarchar(MAX)
as
begin
	set NOCOUNT on
	begin try
		declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
		if(@TemplateId = 0)
		begin
			insert into [Amplo].[CMTemplate]
			values(@TemplateName, @TemplateName, 1, @UserName, GETDATE(), NULL, NULL, NULL)
			set @TemplateId = Scope_identity()
		end
		else
		begin
			update [Amplo].[CMTemplate] set [TemplateName] = @TemplateName, [TemplateTitle] = @TemplateName
			where [TemplateID] = @TemplateId
		end
		SELECT *
			INTO #Clients
			FROM OPENJSON (@Clients, '$.root')
			WITH (ClientId int, IsSelected bit)
		
		delete from [Amplo].[CMTempClientRelationship] where TemplateId = @TemplateId
		insert into [Amplo].[CMTempClientRelationship] select @TemplateId, ClientId from #Clients where IsSelected Is Not NULL and IsSelected = 1
		drop table #Clients
		select cast(1 as bit) Seccess, MessageName, @TemplateName name from amplo.[Message] where MessageId = 1040
	end try
	begin catch
		select error_message()
		exec dbo.uspLogError
	end catch
end
GO
/****** Object:  StoredProcedure [Amplo].[uspDecompositionExport]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc[Amplo].[uspDecompositionExport]
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN
	Declare @sql1 nvarchar(max)
	DECLARE @AvgScoreWeightage [int]
	SELECT top 1 @AvgScoreWeightage = ISNULL([Avg_Score_Weight],2.00) FROM DecompositionProcessLevel1 a
	INNER JOIN DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID  and a.ActiveFlag = 1
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;

	CREATE table #DecompositionProcessLevelDetails
	(
		  ProcessLevel1Id int
		, ProcessLevel1Title nvarchar(100)
		, ProcessLevel2Id int
		, ProcessLevel2Title nvarchar(100)
		, ProcessLevel3Id int
		, ProcessLevel3Title nvarchar(100)
		, ProcessLevel4Id int
		, ProcessLevel4Title nvarchar(100)
		, ProcessLevel5Id int
		, ProcessLevel5Title nvarchar(100)
		, [Priority] nvarchar(100)
		, [Owner] nvarchar(100)
		, Country nvarchar(100)
	)

	declare @UsedFlag bit = 1
	DECLARE @MyScoreCriteriaCursor CURSOR;
	DECLARE @ScoreCriteriaTitles varchar(100);
	dECLARE @ScoreCnt int;
	Declare @SQLscore Varchar(100);
	set @ScoreCnt =1
	BEGIN
		SET @MyScoreCriteriaCursor = CURSOR FOR
		select (case when UsedFlag = 1 then ScoreCriteriaTitle else ScoreCriteriaName End) ScoreCriteriaTitle, UsedFlag from Amplo.DecompositionScoreCriteriaProject
		where DecompositionProjectID = @ProjectID and DecompositionProcessLevel1ID = @ProcessLevel1ID --and UsedFlag = 1 

		OPEN @MyScoreCriteriaCursor 
		FETCH NEXT FROM @MyScoreCriteriaCursor
		INTO @ScoreCriteriaTitles, @UsedFlag

		WHILE @@FETCH_STATUS = 0
		BEGIN
			if(@UsedFlag = 1)
			begin
				set @sql1 = 'Alter table #DecompositionProcessLevelDetails add [' + @ScoreCriteriaTitles + '] numeric(2, 1)'
			end
			else
			begin
				set @sql1 = 'Alter table #DecompositionProcessLevelDetails add [' + @ScoreCriteriaTitles + '] numeric(2, 1)'
			end
			EXEC (@sql1)

		  --set @SQLscore = 'Update #DecompositionProcessLevelDetails Set [' + @ScoreCriteriaTitles + '] = Score_Criteria_' + cast(@ScoreCnt as varchar)
		  --EXEC (@SQLscore)
		  --PRINT (@SQLscore)
		  FETCH NEXT FROM @MyScoreCriteriaCursor
		  INTO @ScoreCriteriaTitles, @UsedFlag
		   set @ScoreCnt =@ScoreCnt+1;
		END; 

		CLOSE @MyScoreCriteriaCursor
		DEALLOCATE @MyScoreCriteriaCursor
	END

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, l3.DecompositionProcessLevel3ID, l3.ProcessLevel3Title, l4.DecompositionProcessLevel4ID, l4.ProcessLevel4Title
	, l5.DecompositionProcessLevel5ID, l5.ProcessLevel5Title, @AvgScoreWeightage, l5.[Owner], l5.[CountrySpecific]
	, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6
	, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10
	from [Amplo].[DecompositionProcessLevel5] l5
	join [Amplo].[DecompositionProcessLevel4] l4 on l4.DecompositionProcessLevel4ID = l5.DecompositionProcessLevel4ID
	join [Amplo].[DecompositionProcessLevel3] l3 on l3.DecompositionProcessLevel3ID = l4.DecompositionProcessLevel3ID
	join [Amplo].[DecompositionProcessLevel2] l2 on l2.DecompositionProcessLevel2ID = l3.DecompositionProcessLevel2ID
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel5Score] scr on scr.DecompositionProcessLevel5ID = l5.DecompositionProcessLevel5ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l5.ActiveFlag = 1 and l4.ActiveFlag = 1 and l3.ActiveFlag = 1 and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l5.LeafNodeFlag = 1

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, l3.DecompositionProcessLevel3ID, l3.ProcessLevel3Title, l4.DecompositionProcessLevel4ID, l4.ProcessLevel4Title
	, NULL, NULL, @AvgScoreWeightage, l4.[Owner], l4.[CountrySpecific]
	, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6
	, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10
	from [Amplo].[DecompositionProcessLevel4] l4
	join [Amplo].[DecompositionProcessLevel3] l3 on l3.DecompositionProcessLevel3ID = l4.DecompositionProcessLevel3ID
	join [Amplo].[DecompositionProcessLevel2] l2 on l2.DecompositionProcessLevel2ID = l3.DecompositionProcessLevel2ID
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel4Score] scr on scr.DecompositionProcessLevel4ID = l4.DecompositionProcessLevel4ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l4.ActiveFlag = 1 and l3.ActiveFlag = 1 and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l4.LeafNodeFlag = 1

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, l3.DecompositionProcessLevel3ID, l3.ProcessLevel3Title, NULL, NULL
	, NULL, NULL, @AvgScoreWeightage, l3.[Owner], l3.[CountrySpecific]
	, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6
	, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10
	from [Amplo].[DecompositionProcessLevel3] l3
	join [Amplo].[DecompositionProcessLevel2] l2 on l2.DecompositionProcessLevel2ID = l3.DecompositionProcessLevel2ID
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel3Score] scr on scr.DecompositionProcessLevel3ID = l3.DecompositionProcessLevel3ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l3.ActiveFlag = 1 and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l3.LeafNodeFlag = 1

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, NULL, NULL, NULL, NULL
	, NULL, NULL, @AvgScoreWeightage, l2.[Owner], l2.[CountrySpecific]
	, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6
	, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10
	from [Amplo].[DecompositionProcessLevel2] l2
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel2Score] scr on scr.DecompositionProcessLevel2ID = l2.DecompositionProcessLevel2ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l2.LeafNodeFlag = 1

	DECLARE @Columns as VARCHAR(MAX)
	Declare @ProjectID1 as Varchar(500)
    Declare @ProcessID1 as Varchar(500)
	SET @ProjectID1 =CAST(@ProjectID as varchar(50));
	SET @ProcessID1 =CAST(@ProcessLevel1ID as varchar(50));
	SELECT @Columns =
	COALESCE(@Columns + ', ','') + QUOTENAME(ScoreCriteriaName)
	FROM
	(SELECT DISTINCT (case when p.UsedFlag = 1 then p.ScoreCriteriaTitle else p.ScoreCriteriaName End) ScoreCriteriaName, p.DecompositionScoreCriteriaId
		FROM Amplo.DecompositionScoreCriteriaProject P
           where P.DecompositionProcessLevel1ID=@ProcessLevel1ID and P.DecompositionProjectID =@ProjectID
	) AS B Order by B.DecompositionScoreCriteriaId

	exec('select ProcessLevel1Title, ProcessLevel2Title, ProcessLevel3Title, ProcessLevel4Title, ProcessLevel5Title, [Priority], [Owner], Country
	, ' + @Columns + '
	from #DecompositionProcessLevelDetails')
	drop table #DecompositionProcessLevelDetails
END
GO
/****** Object:  StoredProcedure [Amplo].[uspDecompositionProjectUsers]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ==================================================================================================================================================================
-- Author:		Srinivas
-- Create date: 12-December-2019
-- Description:	This procedure retrieves users associated with capability modelling
-- ==================================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspDecompositionProjectUsers]
	-- Add the parameters for the stored procedure here
	@DecompositionProjectID [int],
	@UserID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    declare @clientID as INT
    Select @clientID = ClientID from Amplo.[User] where UserID = @UserID

    -- Insert statements for procedure here
SELECT [DecompositionProjectID]
      ,dpu.[ClientID]
      ,dpu.[UserID]
	  ,CONCAT(usr.[FirstName], ' ', usr.[MiddleName], ' ', usr.[LastName]) as 'User Name'
	  ,usr.[UserName]
      ,dpu.[ActiveFlag]
      ,dpu.[ProductionFlag]
      ,dpu.[CreatedBy]
      ,dpu.[CreatedDate]
      ,[ActivityFlag]
  FROM [Amplo].[DecompositionProjectUser] dpu 
  INNER JOIN [Amplo].[User] usr 
  ON dpu.UserID = usr.UserID
  WHERE dpu.[DecompositionProjectID] = @DecompositionProjectID
  AND dpu.[ClientID] = @clientID 
  AND dpu.ActiveFlag = 1
  END
GO
/****** Object:  StoredProcedure [Amplo].[uspDeleteClientProject]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspDeleteClientProject]
 (
    @id int,
    @assessmentsetid int
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentsetid - ID of set to be updated
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF @SuperUser <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT MessageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    update Amplo.BenchmarkProject
    SET ActiveFlag = 0, ModifiedBy = @id, ModifiedDate = GETDATE()
    where BenchmarkProjectID = @assessmentsetid
    

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
/****** Object:  StoredProcedure [Amplo].[uspDeleteKPI]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Biswajit
-- Create date: 22-October-2019
-- Description:	This procedure updates KPI
-- =============================================
create PROCEDURE [Amplo].[uspDeleteKPI]
	-- Add the parameters for the stored procedure here
		   @KpiId [int]
          ,@UserID [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    BEGIN TRY
    BEGIN TRANSACTION;
	if(@KpiId is not null and @KpiId != 0)
	begin
		update [Amplo].[KPI]
		set ActiveFlag = 0
			, ModifiedBy = @UserID
			, ModifiedDate = GETDATE()
		where KpiId = @KpiId
	end
    Select MessageName from Amplo.[Message] where MessageID = 1026

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
/****** Object:  StoredProcedure [Amplo].[uspDeleteTemplate]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Amplo].[uspDeleteTemplate]
@TemplateId as int
, @UserId as int
as
begin
	set nocount on
	declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
	update [Amplo].[CMTemplate]
	set ActiveFlag = 0, [ModifiedBy] = @UserName, [ModifiedDate] = GETDATE() where TemplateId = @TemplateId
	select cast(1 as bit) Success, MessageName from amplo.[Message] where MessageId = 1042
end
GO
/****** Object:  StoredProcedure [Amplo].[uspDisableUser]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspDisableUser]
(
    @id int,
    @userID int
)

/*
@id - Logged in SuperUser ID
@userID - User ID to disable
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
 
    UPDATE Amplo.[User]
    SET UserStatusID = '3', UserModifiedBy = @id --change the value to suspended
    WHERE UserID = @userID and ClientID = @clientID  

    --Message for successfull disable
    select MessageName from Amplo.[Message] where MessageID = 1018


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
/****** Object:  StoredProcedure [Amplo].[uspDuplicateTemplate]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspDuplicateTemplate]
@TemplateId as int
, @UserId as int
, @TemplateName as nvarchar(100) = NULL
as
begin
	set nocount on
	begin try
		declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
		INSERT INTO [Amplo].[CMTemplate]
			   ( [TemplateName]
			   , [TemplateTitle]
			   , [ActiveFlag]
			   , [CreatedBy]
			   , [CreatedDate])
		 select  ISNULL(@TemplateName, @TemplateName)
			   , @TemplateName
			   , [ActiveFlag]
			   , @UserName
			   , GETDATE()
		 from [Amplo].[CMTemplate] where TemplateId = @TemplateId
		 
		 declare @NewTemplateId as int = scope_identity()
		INSERT INTO [Amplo].[CMTempFrameStructure]
				   ([TemplateID]
				   ,[PhaseID]
				   ,[FunctionID]
				   ,[ActiveFlag]
				   ,[CreatedBy]
				   ,[CreatedDate])
			select @NewTemplateId
				   ,[PhaseID]
				   ,[FunctionID]
				   ,[ActiveFlag]
				   ,@UserName
				   ,GETDATE()
				from [Amplo].[CMTempFrameStructure] where TemplateId = @TemplateId and ActiveFlag = 1
     

		 select cast(1 as bit) Success, MessageName from amplo.[Message] where MessageId = 1043
	end try
	begin catch
		exec amplo.uspLogError
	end catch
end
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchBMQuestionDetails]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspFetchBMQuestionDetails]
 (
    @id int,
    @projectid int,
    @domainid int,
    @questionid int
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id
    select ques.BenchmarkQuestionID, ques.Question, opt.BenchmarkQuestionOptionID, opt.OptionName, opt.OptionDescription, opt.OptionDesignChoice, opt.OptionIconPath, 
         aud.ResponseUserID as LastUserResponded, aud.ResponseTimeStamp as LastUserResponseTime, currSel.ResponseTimeStamp as CurrentUserLastSelected, iSNULL(ques.DesignChoice, 'strategy') DesignChoice, aud.Response
    from (Select DomainID from Amplo.UserDomainAccess where ActiveFlag = 1 and BenchmarkProjectID = @projectid And UserID = @id and DomainID = @domainid) dom --If user is not mapped to domain or project, inner join will return null
    inner join Amplo.BenchmarkQuestion ques on dom.DomainID = ques.DomainID and BenchmarkQuestionID = @questionid         --Get questions for domain
    inner join Amplo.BenchmarkQuestionOption opt on opt.BenchmarkQuestionID = ques.BenchmarkQuestionID                    --Get options for question
    
	left outer join (select Top 1 Response ResponseID, ISNULL(ModifiedDate, CreatedOn) ResponseTimeStamp, ISNULL(ModifedBy, CreadedBy) ResponseUserID, Response 
	from Amplo.BenchmarkAssessment where QuestionID = @questionid and BenchmarkProjectID = @projectid and DomainID = @domainid)
	--left join (select Top 1 ResponseID, ResponseUserID, ResponseTimeStamp, Response from Amplo.BenchmarkAuditLog where QuestionID = @questionid and BenchmarkProjectID = @projectid and DomainID = @domainid order by ResponseTimeStamp desc) 
	--aud on aud.ResponseID = opt.BenchmarkQuestionOptionID
	aud on ceiling(aud.Response) = opt.OptionName
    
	left join (select Top 1 ResponseID, ResponseTimeStamp from Amplo.BenchmarkAuditLog where QuestionID = @questionid and BenchmarkProjectID = @projectid and DomainID = @domainid and ResponseUserID = @id order by ResponseTimeStamp desc) currSel 
	on currSel.ResponseID = opt.BenchmarkQuestionOptionID 

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
/****** Object:  StoredProcedure [Amplo].[uspFetchBMQuestionList]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspFetchBMQuestionList]
 (
    @id int,
    @projectid int,
    @domainid int
 )
AS
BEGIN
/*
@id - Logged in userID
@projectid - Project for which questions are required
@domainid - Domain for which questions are required
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

--Categorizations values to be used later
    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    Declare @regionId as INT
    Declare @benchmarkProjectUserID as INT
   
    Select ques.BenchmarkQuestionID, ques.Question, opt.BenchmarkQuestionOptionID as OptionID ,opt.OptionName, 
    --opt.OptionDescription ,opt.OptionDesignChoice, 
    auditlog.ResponseUserID as LastResponseUser, auditlog.TimeStampLatest as LastResponseTime, ISNULL(accessed.LastAccessedFlag,0) as LastAccessedFlag
    from (Select DomainID from Amplo.UserDomainAccess where ActiveFlag = 1 and BenchmarkProjectID = @projectid And UserID = @id and DomainID = @domainid) dom --If user is not mapped to domain or project, inner join will return null
    inner join Amplo.BenchmarkQuestion ques on dom.DomainID = ques.DomainID --Get questions for domain
    inner join Amplo.BenchmarkQuestionOption opt on opt.BenchmarkQuestionID = ques.BenchmarkQuestionID -- Get options for question
    left Join (select Count(QuestionID) as LastAccessedFlag, QuestionID from amplo.[BenchmarkAssessment] 
	where IsNull(ModifedBy, CreadedBy) = @id and BenchmarkProjectID =@projectid and @domainid = @domainid group by QuestionID) accessed
    on ques.BenchmarkQuestionID =accessed.QuestionID
        -- return current user's last accessed flag  - 0 is not accessed
    left join (
        select te.ResponseUserID, te.BenchmarkProjectID, te.DomainID, te.QuestionID, te.ResponseID, te.TimeStampLatest from
        (select BenchmarkProjectID, DomainID, QuestionID, ISNULL(ModifiedDate, CreatedOn) as TimeStampLatest 
		, ISNULL(ModifedBy, CreadedBy) ResponseUserID, Response ResponseID
		from amplo.[BenchmarkAssessment] 
        where DomainId = @domainid and BenchmarkProjectId = @projectid
        --group by BenchmarkProjectID, DomainID, QuestionID
		) te
        --inner join amplo.[BenchmarkAssessment] b on te.BenchmarkProjectID = b.BenchmarkProjectID and te.DomainID = b.DomainID and te.QuestionID =b.QuestionID and te.TimeStampLatest = ISNULL(ModifiedDate, CreatedOn)
		) auditLog 
    on 1 = 1 --auditlog.ResponseID = opt.BenchmarkQuestionOptionID  -- Return Net Last response

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
/****** Object:  StoredProcedure [Amplo].[uspFetchClientByTemplate]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspFetchClientByTemplate]
@TemplateId as int
AS
BEGIN
	SET NOCOUNT ON;

	SELECT c.ClientId, c.ClientName, Cast((ISNULL([CMTempClientRelationshipId], 0)) as bit) IsSelected
	FROM amplo.Client c
	left join [Amplo].[CMTempClientRelationship] cl on (cl.ClientId = c.ClientId and cl.TemplateId = @TemplateId)
	join amplo.[User] u on (u.ClientId = c.ClientId and u.EmailAddress = c.EmailAddress)
	and u.ActiveFlag=1
END
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchFunctionPhaseAssignment]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspFetchFunctionPhaseAssignment] 
@TemplateId int
as
begin
	SET NOCOUNT ON
	begin try
		select ta.PhaseId, dp.PhaseTitle, ta.FunctionId, df.FunctionTilte FunctionTitle, StyletTitle StyleTitle from [Amplo].[TemplateFunctPhaseStyleAssignment] ta
		join amplo.FunctionPhaseStyle fps on fps.FunctionPhaseStyleId = StyleId
		join amplo.DecompositionFunction df on ta.FunctionId = df.DecompositionFunctionId
		join amplo.DecompositionPhase dp on ta.PhaseId = dp.DecompositionPhaseId
		where ta.ActiveFlag = 1 and ta.TemplateId = @TemplateId
	end try
	begin catch
		EXECUTE [Amplo].[uspLogError];
	end catch
end
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchFunctionPhaseStyles]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13-December-2019
-- Description:	This procedure retrieves Function, Phase and Style details 
-- =============================================
CREATE PROCEDURE [Amplo].[uspFetchFunctionPhaseStyles]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [TemplateID],
	[PhaseID],
	[FunctionID],
	[StyleID]
	FROM [Amplo].[TemplateFunctPhaseStyleAssignment]
	WHERE [ActiveFlag] = 1

END
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchMenus]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspFetchMenus]
 (
    @id [int],
     @menuBlock [int]
 )
AS
BEGIN
	/*
	@id - Logged in userID
	@menuBlock - Top pane menus 1 for dashboard, 2 for configuration/users, 3 for reports
	*/
	SET NOCOUNT ON
	DECLARE @SuperUser INT
	Select @SuperUser = UserTypeID from Amplo.[User] where UserID = @id

	if((select ClientId from amplo.[User] where UserId = @Id) IS NOT NULL)
	begin
		--Configuration flag -> Submenu available only to superuser if set as 1
		-- Category -> menublock - 1 for menus in dashboard, 2 for menus in configuration, 3 for reports (When needed)

		--Create view. Filter from view on basis of superuser/add on user access and Menu block
		Select fr.FunctionalResourceID, fr.MenuName, fr.MenuParentID, fr.ConfigurationFlag, rfr.ActionFlag, rfr.Action, fr.Category, fr.MenuURL INTO #formenus from
		((Select ClientID from Amplo.[User] where UserID = @id and ActiveFlag = 1) u  ---Client id to fetch role
		Inner JOIN Amplo.[UserAccessResource] uar ON uar.ClientID = u.ClientID and uar.ActiveFlag =1   --Client id fetches role
		--Inner Join Amplo.[Role] r ON uar.RoleID = r.RoleID and r.ActiveFlag = 1 
		Inner Join Amplo.RolesFunctionalResource rfr on rfr.RoleID = uar.RoleID  --RoleID fetches functional resource IDs
		Inner JOIN Amplo.[FunctionalResources] fr on rfr.FunctionalResourceID = fr.FunctionalResourceID AND fr.ActiveFlag = 1)   -- Details of functional resources
		where IsForClient = 1
		If @SuperUser = 1
		BEGIN
			-- get all menus submenus, thus no filter for configuration
			Select DISTINCT 
					Parent.FunctionalResourceID as ParentMenuID,
					Parent.MenuName AS ParentMenu,
					Child.FunctionalResourceID as SubmenuID,
					Child.MenuName As Submenu,
					Child.MenuURL AS Link,
					Child.ActionFlag As Access 
			from #formenus Child
			left join Amplo.FunctionalResources Parent on Child.MenuParentID = Parent.FunctionalResourceID And Parent.ActiveFlag = 1
			WHERE  Child.Category  = @MenuBlock
		END

		ELSE
		BEGIN
		-- get only menus and submenus which are available to superuser
			Select DISTINCT
				 Parent.FunctionalResourceID as ParentMenuID,
					Parent.MenuName AS ParentMenu,
					Child.FunctionalResourceID as SubmenuID,
					Child.MenuName As Submenu,
					Child.MenuURL AS Link,
					Child.ActionFlag As Access 
			from #formenus Child
			left join Amplo.FunctionalResources Parent on Child.MenuParentID = Parent.FunctionalResourceID And Parent.ActiveFlag = 1
			WHERE  Child.Category  = @MenuBlock AND Child.ConfigurationFlag = 0
		END

		DROP TABLE #formenus
	end
	else
	begin
		Select fr.FunctionalResourceID, fr.MenuName, fr.MenuParentID, fr.ConfigurationFlag, rfr.ActionFlag, rfr.Action, fr.Category, fr.MenuURL INTO #formenusAmplo from
		Amplo.RolesFunctionalResource rfr --on rfr.RoleID = uar.RoleID
		Inner JOIN Amplo.[FunctionalResources] fr on rfr.FunctionalResourceID = fr.FunctionalResourceID AND fr.ActiveFlag = 1
		where (IsForClient = 0 and rfr.RoleId = 1) or fr.FunctionalResourceID in (23, 24, 20, 11, 25)
		--select * from #formenusAmplo
		set @SuperUser = 1
		If @SuperUser = 1
		BEGIN
			-- get all menus submenus, thus no filter for configuration
			Select DISTINCT 
					Parent.FunctionalResourceID as ParentMenuID,
					Parent.MenuName AS ParentMenu,
					Child.FunctionalResourceID as SubmenuID,
					Child.MenuName As Submenu,
					Child.MenuURL AS Link,
					Child.ActionFlag As Access 
			from #formenusAmplo Child
			left join Amplo.FunctionalResources Parent on Child.MenuParentID = Parent.FunctionalResourceID And Parent.ActiveFlag = 1
			WHERE  Child.Category  = @MenuBlock --and Child.FunctionalResourceID not in (16, 14) --and Child.FunctionalResourceID not in (23, 24)
		END

		ELSE
		BEGIN
		-- get only menus and submenus which are available to superuser
			Select DISTINCT
				 Parent.FunctionalResourceID as ParentMenuID,
					Parent.MenuName AS ParentMenu,
					Child.FunctionalResourceID as SubmenuID,
					Child.MenuName As Submenu,
					Child.MenuURL AS Link,
					Child.ActionFlag As Access 
			from #formenusAmplo Child
			left join Amplo.FunctionalResources Parent on Child.MenuParentID = Parent.FunctionalResourceID And Parent.ActiveFlag = 1
			WHERE  Child.Category  = @MenuBlock AND Child.ConfigurationFlag = 0
		END

		DROP TABLE #formenusAmplo
	end
END








GO
/****** Object:  StoredProcedure [Amplo].[uspFetchProcessesByTemplateId]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Amplo].[uspFetchProcessesByTemplateId]
@TemplateId int,
@FunctionId int,
@PhaseId int
as
begin
	SET NOCOUNT ON
	begin try
		select DecompositionProcessLevel1ID as DecompositionProcessLevel1ID, ProceeLevel1Title as ProcessLevel1Title from amplo.amploDecompositionProcessLevel1Template ta
		where ta.ActiveFlag = 1 and ta.TemplateId = @TemplateId and ta.DecompositionFunctionID=@FunctionId 
		and ta.DecompositionPhaseID=@PhaseId
	end try
	begin catch
		EXECUTE [Amplo].[uspLogError];
	end catch
end


GO
/****** Object:  StoredProcedure [Amplo].[uspFetchSecurityQuestion]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspFetchSecurityQuestion]
(
    @PUserID [int]
)
AS
BEGIN
    SET NOCOUNT ON;
    --fetches security question and answer of the resp
    Declare @isSecuritySet INT
    SELECT @isSecuritySet=Count(*) FROM [Password] WHERE UserID = @PUserID
    IF(@isSecuritySet>0)
    BEGIN

        SELECT [PasswordQuestion].PasswordQuestion,[Password].PasswordAnswer 
        FROM [Amplo].[Password]
        INNER JOIN [Amplo].[PasswordQuestion]
        ON [Password].PasswordQuestionID = [PasswordQuestion].PasswordQuestionID
        WHERE [Password].UserID = @PUserID
    END
    ELSE
    BEGIN
        SELECT MessageName FROM Amplo.Message WHERE MessageID = 11
    END
  
  END;

GO
/****** Object:  StoredProcedure [Amplo].[uspFetchTemplate]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspFetchTemplate]
@TemplateId as int
AS
BEGIN
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [TemplateID]
		,[TemplateTitle]
		,[IMAGEPATH] AS 'ImagePath'
	FROM [Amplo].[CMTemplate]
	WHERE [ActiveFlag] = 1 and TemplateId = @TemplateId
  
  END
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchTemplateByClientId]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Amplo].[uspFetchTemplateByClientId]
@ClientId as int
as
BEGIN
    set nocount on
    select cmt.TemplateID, cmt.TemplateTitle
    from amplo.CMTempClientRelationship cmr
    join amplo.CMTemplate cmt on cmt.TemplateID = cmr.TemplateID
    where cmr.ClientID = @ClientId
end
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchTemplates]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =======================================================================================================================================
-- Author:		Srinivas
-- Create date: 13-December-2019
-- Description:	This procedure retrieves template details 
-- =======================================================================================================================================
CREATE PROCEDURE [Amplo].[uspFetchTemplates]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [TemplateID]
		,[TemplateTitle]
		,[IMAGEPATH] AS 'ImagePath'
	FROM [Amplo].[CMTemplate]
	WHERE [ActiveFlag] = 1
  
  END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetAccountType]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetAccountType]
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
		select [UserTypeID], [UserTypeName], [UserTypeDescription]
		from [Amplo].[UserType]
		where ISNULL([UserTypeIsEnabled], 'Yes') = 'yes'
		and UserTypeDescription = 'Amplo Internal User'
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
/****** Object:  StoredProcedure [Amplo].[uspGetBenchmarkingDomainAccess]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetBenchmarkingDomainAccess]
	-- Add the parameters for the stored procedure here
	@UserID [int],
	@BenchmarkProjectID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT da.[UserDomainAccessID]
      ,da.[ClientID]
      ,da.[UserID]
      ,da.[DomainID]
      ,da.[AccessType]
      ,da.[ActiveFlag]
      ,da.[BenchmarkProjectID]
	  ,bd.[DomainName]
  FROM [Amplo].[UserDomainAccess] da
  join [Amplo].[BenchmarkingDomain] bd on bd.[DomainID] = da.[DomainID]
  where [BenchmarkProjectID] = @BenchmarkProjectID and da.UserID = @UserID and da.ActiveFlag=1

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetBenchmarkingLevels]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 09-Sep-2019
-- Description:	This procedure retrieves Benchmarking ASIS score, TO Be score and Industry Benchmarking score for reporting purpose
-- =============================================
create PROCEDURE [Amplo].[uspGetBenchmarkingLevels] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 	[BenchmarkingLevelName], [BenchmarkingDescription], [BenchmarkingCharacterizedby], 	[BenchmarkingKeyEnablers] from Amplo.benchmarkingLevel;

END

GO
/****** Object:  StoredProcedure [Amplo].[uspGetBenchmarkingProjects]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetBenchmarkingProjects]
	@UserID [int]
AS
BEGIN
	SET NOCOUNT ON;
    BEGIN TRY
    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @UserID

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    SELECT MessageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID
	select main.BMProjectID
      ,main.BMProjectName
	  from(
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,proj.status as StatusID
      ,stat.StatusName as StatusName
      ,proj.DisableDate as DisableDate
	  , proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status], CreatedDate, ModifiedDate from Amplo.BenchmarkProject where ISNULL(DisabledFlag, 0) = 0 and LockedFlag = 0) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid and UserId = @UserID) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
    UNION all
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,90 as StatusID
      ,'Locked' as StatusName
      ,proj.DisableDate as DisableDate
	  , proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status], CreatedDate, ModifiedDate from Amplo.BenchmarkProject where ISNULL(DisabledFlag, 0) = 0 and LockedFlag = 1) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid and UserId = @UserID) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
    ) main
    ORDER BY main.OrderDate desc, main.StatusId
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
/****** Object:  StoredProcedure [Amplo].[uspGetBenchmarkingProjectUsers]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetBenchmarkingProjectUsers]
	-- Add the parameters for the stored procedure here
	@ProjectID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
  select bpu.UserID, CONCAT(usr.[FirstName], ' ', usr.[MiddleName], ' ', usr.[LastName]) as 'UserName', usr.EmailAddress 
  from [Amplo].[BenchmarkProjectUser] bpu
  inner join [Amplo].[User] usr on bpu.UserID = usr.UserID
  where bpu.[BenchmarkProjectID] = @ProjectID and bpu.activeflag=1;


END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetBenchmarkingReportLockStatus]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 16-Sep-2019
-- Description:	This procedure retrieves Benchmarking Report Lock Status
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetBenchmarkingReportLockStatus] 
	-- Add the parameters for the stored procedure here
	@UserID int,
--	@ClientID int,
	@ProjectID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	declare @clientId INT
	select @clientId = ClientID from Amplo.[User] where UserID = @UserID and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

	SELECT  BP.BenchmarkProjectID, BP.LockedFlag as LockedStatus from [Amplo].BenchmarkProject BP WHERE BP.ClientID = @ClientID and BP.BenchmarkProjectID = @ProjectID; 

END









GO
/****** Object:  StoredProcedure [Amplo].[uspGetCity]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create PROCEDURE [Amplo].[uspGetCity]
@StateProvince varchar(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all industry types
  select * from Amplo.City where ISO = @StateProvince

END;

GO
/****** Object:  StoredProcedure [Amplo].[uspGetClientCapModProjects]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetClientCapModProjects]
 (
    @id [int]
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
    SELECT MessageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id
	select CapModProjectID
      , CapModProjectName
      , NoOfUsers
      , StatusID
      , StatusName
	  from (
    Select proj.[DecompositionProjectID] as CapModProjectID
      ,proj.[ProjectName] as CapModProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,proj.StatusID as StatusID
      ,stat.StatusName as StatusName
      ,proj.DisableDate as DisableDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select DecompositionProjectID,ProjectName, DisableDate, StatusID, ActiveFlag, CreatedDate, ModifiedDate from Amplo.DecompositionProject where ISNULL(DisabledFlag, 0) = 0 and ISNULL(LockedFlag, 0) = 0) proj
      inner join (Select DecompositionProjectID,UserID from Amplo.DecompositionProjectUser where ClientID = @clientid) projUser on projUser.DecompositionProjectID = proj.DecompositionProjectID
      left join Amplo.DecompositionStatus stat on proj.StatusID = stat.StatusID
	  where proj.ActiveFlag = 1
      group by proj.[DecompositionProjectID] 
      ,proj.[ProjectName]
      ,proj.StatusID
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate, proj.ModifiedDate
      
    UNION all
    Select proj.[DecompositionProjectID] as CapModProjectID
      ,proj.[ProjectName] as CapModProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,100 as StatusID
      ,'DISABLED' as StatusName
      ,proj.DisableDate as DisableDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select DecompositionProjectID,ProjectName, DisableDate, StatusID, ActiveFlag, CreatedDate, ModifiedDate from Amplo.DecompositionProject where ISNULL(DisabledFlag, 0) = 1) proj
      inner join (Select DecompositionProjectID,UserID from Amplo.DecompositionProjectUser where ClientID = @clientid) projUser on projUser.DecompositionProjectID = proj.DecompositionProjectID
      left join Amplo.DecompositionStatus stat on proj.StatusID = stat.StatusID
	  where proj.ActiveFlag = 1
      group by proj.[DecompositionProjectID] 
      ,proj.[ProjectName]
      ,proj.StatusID
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate, proj.ModifiedDate
      
    UNION all
    Select proj.[DecompositionProjectID] as CapModProjectID
      ,proj.[ProjectName] as CapModProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,90 as StatusID
      ,'Locked' as StatusName
      ,proj.DisableDate as DisableDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select DecompositionProjectID,ProjectName, DisableDate, StatusID, ActiveFlag, CreatedDate, ModifiedDate from Amplo.DecompositionProject where ISNULL(DisabledFlag, 0) = 0 and ISNULL(LockedFlag, 0) = 1) proj
      inner join (Select DecompositionProjectID,UserID from Amplo.DecompositionProjectUser where ClientID = @clientid) projUser on projUser.DecompositionProjectID = proj.DecompositionProjectID
      left join Amplo.DecompositionStatus stat on proj.StatusID = stat.StatusID
	  where proj.ActiveFlag = 1
      group by proj.[DecompositionProjectID] 
      ,proj.[ProjectName]
      ,proj.StatusID
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate, proj.ModifiedDate
	  ) MainTable
    --ORDER BY MainTable.StatusID
	 order by MainTable.OrderDate desc
  
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetClientDetails]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspGetClientDetails]
@ClientId As nvarchar(MAx)
as
begin

--Declare @SQL nvarchar(MAx)

select
cl.ClientId, cl.ClientName, ClientCreatedDate as registrationDate, '' CountryName
, u.FirstName, u.LastName, u.EmailAddress Email, '' LicenseType, GETDATE() LicenseExpiryDate
, ISNULL(cl.ClientStatus, 0) ApprovalStatus
from amplo.Client cl
join amplo.[User] u on (u.ClientId = cl.ClientId and u.EmailAddress = cl.EmailAddress)
where cl.ClientId=@ClientId
--Exec (@SQL)

end
GO
/****** Object:  StoredProcedure [Amplo].[uspGetClientProjects]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetClientProjects]
 (
    @id [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT MessageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    --Upper section only for projects which are not disabled and not locked by flag
	select main.BMProjectID
      ,main.BMProjectName
      ,main.NoOfUsers
      ,main.StatusID
      ,main.StatusName
      ,main.DisableDate
	  , main.CreatedDate
	  from(
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,proj.status as StatusID
      ,stat.StatusName as StatusName
      ,proj.DisableDate as DisableDate
	  , proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status], CreatedDate, ModifiedDate from Amplo.BenchmarkProject where ISNULL(DisabledFlag, 0) = 0 and LockedFlag = 0) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
      --where projUser.ClientID = @clientid
      group by proj.[BenchmarkProjectID] 
      ,proj.[BenchmarkProjectName]
      ,proj.status
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate
      , ISNULL(proj.ModifiedDate, proj.CreatedDate)
    UNION all
    --section only for projects where disabled flag is set , status returned as disabled
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,100 as StatusID
      ,'DISABLED' as StatusName
      ,proj.DisableDate as DisableDate
	  , proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status], CreatedDate, ModifiedDate from Amplo.BenchmarkProject where ISNULL(DisabledFlag, 0) = 1) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
      --where projUser.ClientID = @clientid
      group by proj.[BenchmarkProjectID] 
      ,proj.[BenchmarkProjectName]
      ,proj.status
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate
      , ISNULL(proj.ModifiedDate, proj.CreatedDate)
    UNION all
    --section only for projects where disabled flag is not set but locked flag is set , status returned as locked
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,90 as StatusID
      ,'Locked' as StatusName
      ,proj.DisableDate as DisableDate
	  , proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate) OrderDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status], CreatedDate, ModifiedDate from Amplo.BenchmarkProject where ISNULL(DisabledFlag, 0) = 0 and LockedFlag = 1) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
      --where projUser.ClientID = @clientid
      group by proj.[BenchmarkProjectID] 
      ,proj.[BenchmarkProjectName]
      ,proj.status
      ,stat.StatusName 
      ,proj.DisableDate, proj.CreatedDate
	  , ISNULL(proj.ModifiedDate, proj.CreatedDate)
    ) main
    ORDER BY main.OrderDate desc, main.StatusId
  
     
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
/****** Object:  StoredProcedure [Amplo].[uspGetClientProjects2]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetClientProjects2]
 (
    @id [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @id

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT MessageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    --update disable flag for all projects
    UPDATE Amplo.BenchmarkProject
    set DisabledFlag = 1 where DisableDate < GETDATE()

   -- Update

    
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,proj.status as StatusID
      ,stat.StatusName as StatusName
      ,proj.DisableDate as DisableDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status] from Amplo.BenchmarkProject where DisabledFlag = 0) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
      --where projUser.ClientID = @clientid
      group by proj.[BenchmarkProjectID] 
      ,proj.[BenchmarkProjectName]
      ,proj.status
      ,stat.StatusName 
      ,proj.DisableDate
      
    UNION all
    
    Select proj.[BenchmarkProjectID] as BMProjectID
      ,proj.[BenchmarkProjectName] as BMProjectName
      ,Count(projUser.[UserID]) as NoOfUsers
      ,100 as StatusID
      ,'DISABLED' as StatusName
      ,proj.DisableDate as DisableDate
      from (Select BenchmarkProjectID,BenchmarkProjectName, DisableDate, [status] from Amplo.BenchmarkProject where DisabledFlag = 1) proj
      inner join (Select BenchmarkProjectID,UserID from Amplo.BenchmarkProjectUser where ClientID = @clientid) projUser on projUser.BenchmarkProjectID = proj.BenchmarkProjectID
      left join Amplo.BenchmarkStatus stat on proj.Status = stat.StatusID
      --where projUser.ClientID = @clientid
      group by proj.[BenchmarkProjectID] 
      ,proj.[BenchmarkProjectName]
      ,proj.status
      ,stat.StatusName 
      ,proj.DisableDate
      ORDER BY proj.status
    
    
     
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
/****** Object:  StoredProcedure [Amplo].[uspGetClientRevenueRange]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetClientRevenueRange]
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all industry types
SELECT ClientRevenueRangeID, ClientRevenueRangeName FROM Amplo.ClientRevenueRange order by ClientRevenueRangeID asc; 

END;
GO
/****** Object:  StoredProcedure [Amplo].[uspGetClients]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspGetClients]
as
begin
select
cl.ClientId, cl.ClientName, ClientCreatedDate as registrationDate, '' CountryName
, u.FirstName, u.LastName, u.EmailAddress Email, '' LicenseType, GETDATE() LicenseExpiryDate
, ISNULL(cl.ClientStatus, 0) ApprovalStatus
from amplo.Client cl
join amplo.[User] u on (u.ClientId = cl.ClientId and u.EmailAddress = cl.EmailAddress)
end
GO
/****** Object:  StoredProcedure [Amplo].[uspGetCompanyProfileQuestions]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 27-09-2019
-- Description:	This procedure retrieve company profile questions
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetCompanyProfileQuestions]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [QuestionID]
      ,[Question]
      ,[ActiveFlag]
  FROM [Amplo].[AmploProfilingQuestions]
  WHERE ActiveFlag = 1


END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetCountry]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetCountry]
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all countries
    SELECT [CountryRegionCode] CountryID, [Name] CountryName
    FROM Amplo.CountryRegions order by CountryRegionCode; 
END;


GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardAnnouncements]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13 Sept 2019
-- Description:	This procedure populates Dashboard Announcements
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardAnnouncements]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DashboardAnnouncementID]
      ,[ClientID]
      ,[DashboardAnnouncementName]
      ,[DashboardAnnouncementHighlights]
      ,[DashboardAnnouncementSubHighlights]
      ,[DashboardAnnouncementURLPath]
      ,[DashboardAnnouncementSource]
      ,[DashboardAnnouncementCategory]
      ,[DashboardAnnouncementDigitalAsset]
  FROM [Amplo].[DashboardAnnouncement]
--  where [ClientID] = @ClientID
  Order by [CreatedDate] desc;

END


GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardEvent]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13 Sept 2019
-- Description:	This procedure populates Dashboard Events
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardEvent]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT
        [DashboardEventID],
        [ClientID],
        [DashboardEventName],
        [DashboardEvent],
        [DashboardEventDate],
        [DashboardEventURLPath],
        [DashboardEventSource],
        [DashboardEventCategory],
        [DashboardEventsDigitalAsset]
    from [Amplo].[DashboardEvent]
--  where [ClientID] = @ClientID
  Order by [DashboardEventDate] desc;

END


GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardHighlights]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDashboardHighlights]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DashboardHighlightsID]
      ,[ClientID]
      ,[DashboardHighlightsName]
      ,[DashboardHighlights]
      ,[DashboardHighlightsURLPath]
      ,[DashboardHighlightsSource]
      ,[DashboardHighlightsCategory]
      ,[DashboardHighlightsDigitalAsset]
  FROM [Amplo].[DashboardHighlights]
--  Where [ClientID] = @ClientID
  Order by [CreatedDate] desc;

END

GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardIndustryNews]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13 Sept 2019
-- Description:	This procedure populated Highlights for Dashboard
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardIndustryNews]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DashboardIndustryNewsID]
      ,[ClientID]
      ,[DashboardIndustryNewsName]
      ,[IndustryNews]
      ,[IndustryNewsURLPath]
      ,[DashboardIndustryNewsDate]        
      ,[IndustryNewsSource]
      ,[IndustryNewsCategory]
      ,[IndustryNewsDigitalAsset]
  FROM [Amplo].[DashboardIndustryNews]
--  where [ClientID] = @ClientID 
  Order by [DashboardIndustryNewsDate] desc;

END

GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardPopularResources]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13 Sept 2019
-- Description:	This procedure populates Dashboard Popular Resources
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardPopularResources]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DashboardPopularResourceID]
      ,[ClientID]
      ,[DashboardPopularResourceName]
      ,[DashboardPopularResourceHighlights]
      ,[DashboardPopularResourceSubHighlights]
      ,[DashboardPopularResourceURLPath]
      ,[DashboardPopularResourceSource]
      ,[DashboardPopularResourceCategory]
      ,[DashboardPopularResourceDigitalAsset]
  FROM [Amplo].[DashboardPopularResource]
--  where [ClientID] = @ClientID
  Order by [DashboardPopularResourceID] desc;

END

GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardTODO]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 15 Sept 2019
-- Description:	This procedure populates TODO task details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardTODO]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT
	[DashboardTODOID],
	[DashboardTODOTaskDescription],
	[DashboardTODOStatus],
	[DashboardTODURLPath],
	[DashboardTODODate],
	[DashboardTODOSource],
	[DashboardTODOCategory],
	[DashboardTODODigitalAsset],
	[ActiveFlag]
  FROM [Amplo].[DashboardTODO]
--  where [ClientID] = @ClientID 
  Order by [DashboardTODODate] desc;

END


GO
/****** Object:  StoredProcedure [Amplo].[uspGetDashboardWebinars]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 13 Sept 2019
-- Description:	This procedure populates Dashboard Popular Resources
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDashboardWebinars]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DashboardWebinarID]
      ,[ClientID]
      ,[DashboardWebinarName]
      ,[DashboardWebinarDescription]
      ,[DashboardWebinarDate]
      ,[DashboardWebinarURLPath]
      ,[DashboardWebinarSource]
      ,[DashboardWebinarCategory]
      ,[DashboardWebinarDigitalAsset]
  FROM [Amplo].[DashboardWebinar]
--  where [ClientID] = @ClientID
  Order by [DashboardWebinarDate] desc;

END

GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionActivityBank]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas Kancharla
-- Create date: 20th Sept 2019
-- Description:	This procedure retrieves activity bank details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionActivityBank]
@DecompositionProjectID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

/*
    select [DecompositionLevel1ActivityBankID],
	[Level1ActivityBankName],
	[DecompositionProjectUserID],
	[ProcessName],
	[ProcessDescription],
	[ProcessLevel1Meaning],
	[GridViewLocationID]
    from [Amplo].[DecompositionLevel1ActivityBank]
    where activeflag = 1 and DecompositionProjectUserID = @ProjectuserID
    order by createddate desc;
 */
 
		select [DecompositionProcessLevel1ID],
			   [ProcessLevel1Title],
			   [GridViewLocationID],
			   [GridVViewLocationFlag],
			   [Status]
		 FROM [Amplo].[DecompositionProcessLevel1]
		where [DecompositionProjectID] =  @DecompositionProjectID AND activeflag = 1 AND GridViewLocationID = -1 AND GridVViewLocationFlag = 0 
		order by [ProcessLevel1Title] desc;

    END



GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionActivityStatusSummary]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionActivityStatusSummary]
@UseriD int,
@ProjectID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;


	SELECT
	ISNULL(SUM((CASE WHEN Status = 1  THEN 1 END)),0) as '1',
	ISNULL(SUM((CASE WHEN Status = 2  THEN 1 END)),0) as '2',
	ISNULL(SUM((CASE WHEN Status = 3  THEN 1 END)),0) as '3'
	from [Amplo].[DecompositionProcessLevel1]
	where [DecompositionProjectID] = @ProjectID and activeflag = 1 and GridVViewLocationFlag = 1
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionFunction]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionFunction]
	@TemplateId as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [DecompositionFunctionID]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[FunctionName]
      ,[FunctionTilte] as 'FunctionTitle'
      ,[FunctionDescription]
      ,[FunctionNumber]
  FROM [Amplo].[DecompositionFunction]
  where [DecompositionFunctionID] in 
  (select FunctionId from [Amplo].[CMTempFrameStructure] where ActiveFlag = 1 and TemplateId = @TemplateId)
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionFunctionProject]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetDecompositionFunctionProject] --1015, 49
 (
    @Userid [int],
    @projectid [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON


select FunctionNumber as DecompositionFunctionProjectID, FunctionName from Amplo.DecompositionFunctionProject 
where DecompositionProjectID = @projectid and UserId = @Userid and ActiveFlag = 1


/*select DecompositionFunctionProjectID, FunctionName from Amplo.DecompositionFunctionProject 
where DecompositionProjectID = @projectid 
--and ActiveFlag = 1;
*/


END
















GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionLevel1Activities]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionLevel1Activities]
 (
    @Userid [int],
    @projectid [int]
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY

		Declare @ClientID as INT
		Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

		Select l1.DecompositionProcessLevel1ID, l1.FunctionID, l1.PhaseID, l1.ProcessLevel1Title, l1.GridViewLocationID, l1.GridVViewLocationFlag, l1.[Status]
		into #Output from Amplo.DecompositionProcessLevel1 l1
		join amplo.[DecompositionUserAccess] du on (du.DecompositionProjectId = @projectid and du.UserId = @Userid and du.ActiveFlag = 1 and du.FunctionId = l1.FunctionId and du.PhaseId = l1.PhaseId)
		where l1.ClientID = @ClientID And l1.DecompositionProjectID = @projectid and l1.ActiveFlag = 1 and l1.GridVViewLocationFlag = 1
		
		--delete from #Output where FunctionID not in (select FunctionId from amplo.[DecompositionUserAccess] where DecompositionProjectId = @projectid and UserId = @Userid and ActiveFlag = 1)
		--delete from #Output where PhaseID not in (select PhaseID from amplo.[DecompositionUserAccess] where DecompositionProjectId = @projectid and UserId = @Userid and ActiveFlag = 1)

		select * from #Output
		drop table #Output
    END TRY
    BEGIN CATCH
        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END

















GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionPhase]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspGetDecompositionPhase]
	@TemplateId as int
AS
BEGIN
	SET NOCOUNT ON;

SELECT [DecompositionPhaseID]
      ,[PhaseName]
      ,[PhaseTitle]
      ,[PhaseDescription]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[PhaseNumber]
  FROM [Amplo].[DecompositionPhase]
  where [DecompositionPhaseID] in 
  (select PhaseId from [Amplo].[CMTempFrameStructure] where ActiveFlag = 1 and TemplateId = @TemplateId)
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionPhaseProject]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetDecompositionPhaseProject]
 (
    @Userid [int],
    @projectid [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;


select PhaseNumber as DecompositionPhaseProjectID, PhaseName from Amplo.DecompositionPhaseProject where UserID = @Userid and DecompositionProjectID = @projectid and ActiveFlag = 1;

/*
select DecompositionPhaseProjectID, PhaseName from Amplo.DecompositionPhaseProject where UserID = @Userid and DecompositionProjectID = @projectid and ActiveFlag = 1;
*/

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
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProcessLevel1Connected]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionProcessLevel1Connected]
	-- Add the parameters for the stored procedure here
@UserID int,
@ProjectID int,
@FunctionID int,
@PhaseID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT DecompositionProcessLevel1ID, Processlevel1title FROM Amplo.DecompositionProcessLevel1 
	WHERE UserID = @UserID 
	AND  DecompositionProjectID = @ProjectID 
	AND FunctionID = @FunctionID 
	AND PhaseID = @PhaseID 
	AND GridVViewLocationFlag=1 
	AND ActiveFlag=1;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProcessLevel1HeatMap]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Srinivas
-- Create date: 24-October-2019
-- Description:	This procedure provides Capability Modelling Heatmap with Score Details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionProcessLevel1HeatMap] --1015, 4
	-- Add the parameters for the stored procedure here
    @Userid [int],
    @projectid [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    BEGIN TRY

	Declare @ClientID as INT
	Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

    -- Insert statements for procedure here
	SELECT dpl.DecompositionProcessLevel1ID, dpl.DecompositionProjectID, dpl.FunctionID,dpl.PhaseID,dpl.ProcessLevel1Title,dpl.GridVViewLocationFlag,dpl.GridViewLocationID,dpl.Status,ISNULL((dpls.Level1_Calc_Aggr_Score), 0) As AggrScore 
	FROM Amplo.DecompositionProcessLevel1 dpl
	LEFT JOIN
	Amplo.DecompositionProcessLevel1Score dpls
	ON dpl.DecompositionProcessLevel1ID = dpls.DecompositionProcessLevel1ID
	WHERE dpl.ClientID = @ClientID And dpl.DecompositionProjectID = @projectid and dpl.ActiveFlag = 1 and dpl.GridVViewLocationFlag = 1
	--and dpls.Disable_Date is null
    END TRY
    BEGIN CATCH
        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProcessLevel2Tasks]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================================================================
-- Author:		Srinivas
-- Create date: 30-Sept-2019
-- Description:	Thsi procedure retrieves ProcessLevel2 task details
-- =============================================================================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionProcessLevel2Tasks]
	-- Add the parameters for the stored procedure here
	@UserID int,
	@DecompositionProjectID int,
	@DecompositionProcessLevel1ID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT DecompositionProcessLevel2ID, DecompositionProcessLevel1ID, ProcessLevel2Title from Amplo.DecompositionProcessLevel2 where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProcessLevelSearch]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ======================================================================================================================================================
-- Author:		Srinivas
-- Create date: 14-October-2019
-- Description:	This procedure searches Process L1 to L5 process title and highlights the Process Level1
-- ======================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionProcessLevelSearch] 
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@SearchKey [varchar](100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
		WITH ProcessLevelSearch_CTE (DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel1Title)  
		AS  
		(
			SELECT DecompositionProjectID,  DecompositionProcessLevel1ID, ProcessLevel1Title from Amplo.DecompositionProcessLevel1 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel1Title) LIKE '%' + UPPER(@SearchKey) + '%' 
	
			UNION ALL

			SELECT DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel2Title from Amplo.DecompositionProcessLevel2 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel2Title) LIKE '%' + UPPER(@SearchKey) + '%'  

			UNION ALL

			SELECT DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel3Title  from Amplo.DecompositionProcessLevel3 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel3Title) LIKE '%' + UPPER(@SearchKey) + '%'  
	
			UNION ALL

			SELECT DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel4Title from Amplo.DecompositionProcessLevel4 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel4Title) LIKE '%' + UPPER(@SearchKey) + '%' 

			UNION ALL

			SELECT DecompositionProjectID, DecompositionProcessLevel1ID, ProcessLevel5Title from Amplo.DecompositionProcessLevel5 WHERE DecompositionProjectID=@ProjectID AND UPPER(ProcessLevel5Title) LIKE '%' + UPPER(@SearchKey) + '%'  
		)
		SELECT psc.DecompositionProjectID, psc.DecompositionProcessLevel1ID, psc.ProcessLevel1Title OtherResult, dp.ProcessLevel1Title, dp.FunctionID, dp.PhaseID, dp.GridViewLocationID, dp.GridVViewLocationFlag, dp.Status  
		FROM ProcessLevelSearch_CTE psc
		INNER JOIN DecompositionProcessLevel1 dp
		on psc.DecompositionProjectID = dp.DecompositionProjectID AND 
		PSC.DecompositionProcessLevel1ID = DP.DecompositionProcessLevel1ID
		where dp.FunctionID != 0 and dp.PhaseID != 0
--	)
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProjectFunction]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspGetDecompositionProjectFunction]
 (
    @Userid [int],
    @DecompositionProjectID [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY

		Declare @ClientID as INT
		Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

		SELECT [DecompositionFunctionProjectID]
			,[DecompositionProjectID]
			,[IndustryID]
			,[IndustryVerticalID]
			,[IndustrySubVerticalID]
			,[FunctionNumber] [FunctionId]
			,[FunctionTitle]
		FROM [Amplo].[DecompositionFunctionProject]
		WHERE UserId = @Userid AND [DecompositionProjectID] = @DecompositionProjectID
		and ActiveFlag = 1
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
      
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProjectPhase]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [Amplo].[uspGetDecompositionProjectPhase]
 (
    @Userid [int],
    @DecompositionProjectID [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY

		Declare @ClientID as INT
		Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

		SELECT [DecompositionPhaseProjectID]
			  ,[DecompositionProjectID]
			  ,[PhaseTitle]
			  ,[IndustryID]
			  ,[IndustryVerticalID]
			  ,[IndustrySubVerticalID]
			  ,[PhaseNumber] [PhaseId]
		FROM [Amplo].[DecompositionPhaseProject]
		WHERE UserId = @Userid AND [DecompositionProjectID] = @DecompositionProjectID
		and ActiveFlag = 1
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProjects]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionProjects] 
 (
    @UserID [int]
 )
AS
BEGIN

SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID

    --Upper section only for projects which are not disabled and not locked by flag
    Select dpu.DecompositionProjectID, dp.ProjectName, dpu.UserID from Amplo.DecompositionProjectUser dpu
    inner join Amplo.DecompositionProject dp on dpu.decompositionprojectid= dp.DecompositionProjectID
    where dp.ClientID = @clientid 
	--and dpu.UserID = @UserID 
	and dp.ActiveFlag = 1 and dp.DisabledFlag = 0 order by dp.CreatedDate desc;

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
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionProjectUsers]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ==================================================================================================================================================================
-- Author:		Srinivas
-- Create date: 12-December-2019
-- Description:	This procedure retrieves users associated with capability modelling
-- ==================================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionProjectUsers]
	-- Add the parameters for the stored procedure here
	@DecompositionProjectID [int],
	@UserID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    declare @clientID as INT
    Select @clientID = ClientID from Amplo.[User] where UserID = @UserID

    -- Insert statements for procedure here
SELECT [DecompositionProjectID]
      ,dpu.[ClientID]
      ,dpu.[UserID]
	  ,CONCAT(usr.[FirstName], ' ', usr.[MiddleName], ' ', usr.[LastName]) as 'UserName'
	  ,usr.[EmailAddress]
      ,dpu.[ActiveFlag]
      ,dpu.[ProductionFlag]
      ,dpu.[CreatedBy]
      ,dpu.[CreatedDate]
      ,[ActivityFlag]
  FROM [Amplo].[DecompositionProjectUser] dpu 
  INNER JOIN [Amplo].[User] usr 
  ON dpu.UserID = usr.UserID
  WHERE dpu.[DecompositionProjectID] = @DecompositionProjectID
  AND dpu.[ClientID] = @clientID 
  AND dpu.ActiveFlag = 1
  END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionReportAverageScore]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 11-November-2019
-- Description:	This procedure retrieves average score for capability modelling workbench
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionReportAverageScore]
	-- Add the parameters for the stored procedure here
@ProjectID [int]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
select b.FunctionTilte FunctionTitle, c.PhaseTitle PhaseTitile, avg(d.Level1_Calc_Aggr_Score) AvgScore from Amplo.DecompositionProcessLevel1 a
inner join Amplo.DecompositionFunction b on a.FunctionID = b.DecompositionFunctionID
inner join Amplo.DecompositionPhase c on c.DecompositionPhaseID = a.PhaseID
inner join Amplo.DecompositionProcessLevel1score d on a.DecompositionProcessLevel1ID = d.DecompositionProcessLevel1ID
where a.DecompositionProjectID = @ProjectID
group by b.FunctionTilte, c.PhaseTitle

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionReportProcessRanking]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 29-Nov-2019
-- Description:	This procedure retrieves process level details and respective socres
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionReportProcessRanking]
	-- Add the parameters for the stored procedure here
	@UserID [int],
	@DecompositionProjectID [int],
	@FunctionID [int],
	@PhaseID [int]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    BEGIN TRY

		Declare @ClientID as INT
		Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

    -- Insert statements for procedure here
	SELECT [ProcessLevel1Title]
		  ,[FunctionID]
		  ,[PhaseID]
		  ,[Level1_Calc_Aggr_Score]
		  ,RANK () OVER ( 
		  ORDER BY Level1_Calc_Aggr_Score DESC
		  ) Ranking 
	FROM [Amplo].[DecompositionProcessLevel1] ProcessLevel1
		INNER JOIN [Amplo].[DecompositionProcessLevel1Score] ProcessLevel1Score
		ON ProcessLevel1.[DecompositionProcessLevel1ID] = ProcessLevel1Score.[DecompositionProcessLevel1ID]
		WHERE ProcessLevel1.ClientID = @ClientID AND ProcessLevel1.DecompositionProjectID = @DecompositionProjectID 
		AND ProcessLevel1.FunctionID = @FunctionID AND ProcessLevel1.PhaseID = @PhaseID
		AND ProcessLevel1.ActiveFlag = 1 AND ProcessLevel1.GridVViewLocationFlag = 1;
	END TRY
	BEGIN CATCH
			-- Rollback any active or uncommittable transactions before
			-- inserting information in the ErrorLog

			EXECUTE [Amplo].[uspLogError];
	END CATCH;


END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionScoringCriteria]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionScoringCriteria]
	-- Add the parameters for the stored procedure here
	@DecompositionProjectID int,
	@ProcessLevel1ID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select 
		[DecompositionScoreCriteriaID],
		[DecompositionProjectID],
		[DecompositionProcessLevel1ID],
		[ScoreCriteriaName],
		[ScoreCriteriaActualName],
		[ScoreCriteriaTitle],
		[ScoreCriteriaDescription],
		[SeededFlag],
		[UsedFlag] 
	from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID = @DecompositionProjectID 
	--and [SeededFlag] = 1 
	and [UsedFlag] = 1
	and [DecompositionProcessLevel1ID] = @ProcessLevel1ID
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionScoringCriteria_08112019]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionScoringCriteria_08112019]
	-- Add the parameters for the stored procedure here
	@DecompositionProjectID int,
	@ProcessLevel1ID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select 
		[DecompositionScoreCriteriaID],
		[DecompositionProjectID],
		[DecompositionProcessLevel1ID],
		[ScoreCriteriaName],
		[ScoreCriteriaActualName],
		[ScoreCriteriaTitle],
		[ScoreCriteriaDescription],
		[SeededFlag],
		[UsedFlag] 
	from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID = @DecompositionProjectID 
	and (DecompositionProcessLevel1ID = 1 or DecompositionProcessLevel1ID = @ProcessLevel1ID)

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionScoringCustomCriteria]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionScoringCustomCriteria]
	-- Add the parameters for the stored procedure here
	@DecompositionProjectID int,
	@ProcessLevel1ID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	select 
		[DecompositionScoreCriteriaID],
		[DecompositionProjectID],
		[DecompositionProcessLevel1ID],
		[ScoreCriteriaName],
		[ScoreCriteriaActualName],
		[ScoreCriteriaTitle],
		[ScoreCriteriaDescription],
		[SeededFlag],
		[UsedFlag] 
	from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID = @DecompositionProjectID 
	AND DecompositionProcessLevel1ID = @ProcessLevel1ID
	and [SeededFlag] = 0 AND [UsedFlag] = 0

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTemplateTreeView]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTemplateTreeView]
	@TemplateId [int],
	@ProcessLevel1ID [int]
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
	DECLARE @PProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[float]
	DECLARE @ScoreCriteria2	[float]
	DECLARE @ScoreCriteria3	[float]
	DECLARE @ScoreCriteria4	[float]
	DECLARE @ScoreCriteria5	[float]
	DECLARE @ScoreCriteria6	[float]
	DECLARE @ScoreCriteria7	[float]
	DECLARE @ScoreCriteria8	[float]
	DECLARE @ScoreCriteria9	[float]
	DECLARE @ScoreCriteria10 [float]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]


	SET @ScoreCriteria1	= 0.00
	SET @ScoreCriteria2	= 0.00
	SET @ScoreCriteria3	= 0.00
	SET @ScoreCriteria4 = 0.00
	SET @ScoreCriteria5	= 0.00
	SET @ScoreCriteria6	= 0.00
	SET @ScoreCriteria7	= 0.00
	SET @ScoreCriteria8	= 0.00
	SET @ScoreCriteria9	= 0.00
	SET @ScoreCriteria10 = 0.00

    -- Insert statements for procedure here
	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100),
		NodeLevelID [varchar](100),
		ProcessLevel [int]
		, LeafNodeFlag bit
	  );
	  declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	  declare @Status as int = 0
		--Process Level1 Cursor

	SELECT top 1 @PProcessLevel1ID = a.AmploDecompositionProcessLevel1TemplateID, @ProcessLevelTitle = ProceeLevel1Title FROM Amplo.AmploDecompositionProcessLevel1Template a
	WHERE a.TemplateID = @TemplateId AND a.AmploDecompositionProcessLevel1TemplateID = @ProcessLevel1ID
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;
	INSERT INTO #DecompositionProcessLevelDetails
	(
		ProcessLevel1ID, ProcessLevelTitle, ProcessLevel, LeafNodeFlag
	)
	VALUES
	(
		@ProcessLevel1ID, @ProcessLevelTitle, 1, 0
	)

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT 
	a.DecompositionProcessLevel1TemplateID, 
	a.DecompositionProcessLevel2TemplateID, 
	a.[ProcessLevel2NodeID],
	a.[ProcessLevel2Title],
	ISNULL(a.LeafNodeFlag, 0) 
	
	FROM Amplo.AmploDecompositionProcessLevel2Template a 
	WHERE a.DecompositionProcessLevel1TemplateID = @ProcessLevel1ID 
	--added by Srini on 10-November 2019
	AND ActiveFlag = 1
    ORDER BY DecompositionProcessLevel1TemplateID, DecompositionProcessLevel2TemplateID Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Level2LeafNodeFlag
	
    WHILE @@FETCH_STATUS = 0
    BEGIN
			
		INSERT INTO #DecompositionProcessLevelDetails
		(
			ProcessLevel1ID, ProcessLevel2ID, ProcessLevelNodeID, ProcessLevelTitle, ProcessLevel, LeafNodeFlag)
			VALUES
			(
				@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, 2, @Level2LeafNodeFlag
			);


			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.DecompositionProcessLevel1TemplateID, a.DecompositionProcessLevel1TemplateID, a.DecompositionProcessLevel3TemplateID, [ProcessLevel3NodeID], [ProcessLevel3Title], ISNULL(a.LeafNodeFlag, 0)
			FROM Amplo.AmploDecompositionProcessLevel3Template a
			WHERE a.DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			ORDER BY a.DecompositionProcessLevel1TemplateID, a.DecompositionProcessLevel2TemplateID, a.DecompositionProcessLevel3TemplateID Asc;

			OPEN ProcessLevel3List
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Level3LeafNodeFlag

			WHILE @@FETCH_STATUS = 0
			BEGIN
			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ProcessLevel, LeafNodeFlag)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, 3, @Level3LeafNodeFlag);

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.DecompositionProcessLevel1TemplateID, a.DecompositionProcessLevel2TemplateID, a.DecompositionProcessLevel3TemplateID, a.DecompositionProcessLevel4TemplateID, a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], ISNULL(a.LeafNodeFlag, 0)
			FROM Amplo.AmploDecompositionProcessLevel4Template a
			WHERE  a.DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID 
			AND a.DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
			AND ActiveFlag = 1 --Added by Srini on 10-November-2019
			ORDER BY DecompositionProcessLevel1TemplateID, DecompositionProcessLevel2TemplateID, DecompositionProcessLevel3TemplateID, DecompositionProcessLevel4TemplateID Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Level4LeafNodeFlag


			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
				INSERT INTO #DecompositionProcessLevelDetails
				(
					ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
					VALUES
					(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, 4, @Level4LeafNodeFlag, @ProcessLevelNodeID);
							
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.DecompositionProcessLevel1TemplateID, a.DecompositionProcessLevel2TemplateID, a.DecompositionProcessLevel3TemplateID, a.DecompositionProcessLevel4TemplateID
							,a.DecompositionProcessLevel5TemplateID, [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag]
							, ISNULL(a.LeafNodeFlag, 0)
							from Amplo.AmploDecompositionProcessLevel5Template a
							where a.DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
							AND a.DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID AND a.DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
							AND ActiveFlag = 1 --Added by Srini on 10-November-2019
							ORDER BY DecompositionProcessLevel1TemplateID, DecompositionProcessLevel2TemplateID, DecompositionProcessLevel3TemplateID, DecompositionProcessLevel4TemplateID
							, DecompositionProcessLevel5TemplateID Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Level5LeafNodeFlag

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, 5, @Level5LeafNodeFlag, @ProcessLevelNodeID);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Level5LeafNodeFlag
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Level4LeafNodeFlag
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Level3LeafNodeFlag
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Level2LeafNodeFlag
    END;

    CLOSE ProcessLeveL2List
    DEALLOCATE ProcessLeveL2List

   CREATE INDEX IX_ProcessLevelID ON #DecompositionProcessLevelDetails (ProcessLevel1ID, ProcessLevel2ID,ProcessLevel3ID,ProcessLevel4ID,ProcessLevel5ID);

	select 
			ProcessLevel1ID,
			ProcessLevel2ID,
			ProcessLevel3ID,
			ProcessLevel4ID,
			ProcessLevel5ID,
			ProcessLevelNodeID as ProcessLevelID, 
			ProcessLevelTitle,
			NodeLevelID,
			ProcessLevel
			, LeafNodeFlag
		FROM #DecompositionProcessLevelDetails


		DROP TABLE if exists #DecompositionProcessLevelDetails;

    COMMIT TRANSACTION;
	RETURN 0;
    END TRY
    BEGIN CATCH
		CLOSE ProcessLeveL2List
		DEALLOCATE ProcessLeveL2List

		CLOSE ProcessLeveL3List
		DEALLOCATE ProcessLeveL3List

		--CLOSE ProcessLeveL4List
		--DEALLOCATE ProcessLeveL4List

		--CLOSE ProcessLeveL2List
		--DEALLOCATE ProcessLeveL2List

		select Error_Message(), error_Line()
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeView]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeView]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
	DECLARE @PProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[float]
	DECLARE @ScoreCriteria2	[float]
	DECLARE @ScoreCriteria3	[float]
	DECLARE @ScoreCriteria4	[float]
	DECLARE @ScoreCriteria5	[float]
	DECLARE @ScoreCriteria6	[float]
	DECLARE @ScoreCriteria7	[float]
	DECLARE @ScoreCriteria8	[float]
	DECLARE @ScoreCriteria9	[float]
	DECLARE @ScoreCriteria10 [float]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]


	SET @ScoreCriteria1	= 0.00
	SET @ScoreCriteria2	= 0.00
	SET @ScoreCriteria3	= 0.00
	SET @ScoreCriteria4 = 0.00
	SET @ScoreCriteria5	= 0.00
	SET @ScoreCriteria6	= 0.00
	SET @ScoreCriteria7	= 0.00
	SET @ScoreCriteria8	= 0.00
	SET @ScoreCriteria9	= 0.00
	SET @ScoreCriteria10 = 0.00

    -- Insert statements for procedure here
	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 numeric(10, 2), 
		ScoreCriteria2 numeric(10, 2),
		ScoreCriteria3 numeric(10, 2),
		ScoreCriteria4 numeric(10, 2),
		ScoreCriteria5 numeric(10, 2),
		ScoreCriteria6 numeric(10, 2),
		ScoreCriteria7 numeric(10, 2),
		ScoreCriteria8 numeric(10, 2),
		ScoreCriteria9 numeric(10, 2),
		ScoreCriteria10 numeric(10, 2), 
		NodeLevelID [varchar](100), 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int]
		, LeafNodeFlag bit
	  );
	  declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	  declare @Status as int = 0
		--Process Level1 Cursor

	SELECT top 1 @Status = a.[Status], @PProcessLevel1ID = a.[DecompositionProcessLevel1ID], @ProcessLevelTitle=[ProcessLevel1Title], @Owner=[Owner], @AvgScoreWeightage = ISNULL([Avg_Score_Weight],2.00) FROM Amplo.DecompositionProcessLevel1 a
	INNER JOIN Amplo.DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;
	INSERT INTO #DecompositionProcessLevelDetails
	(
		ProcessLevel1ID, ProcessLevelTitle, Owner, Priority, ProcessLevel, LeafNodeFlag
	)
	VALUES
	(
		@ProcessLevel1ID, @ProcessLevelTitle, @Owner, @AvgScoreWeightage, 1, 0
	)

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT 
	a.[DecompositionProcessLevel1ID], 
	a.[DecompositionProcessLevel2ID], 
	a.[ProcessLevel2NodeID],
	a.[ProcessLevel2Title], 
	a.[Owner], 
	a.[CountrySpecific], 
	a.[LeafNodeFlag], 
	ISNULL(b.[AvgScoreWeightage],2.00), 
	ISNULL(b.ScoreCriteria1, 0.00), 
	ISNULL(b.ScoreCriteria2,0.00), 
	ISNULL(b.ScoreCriteria3,0.00), 
	ISNULL(b.ScoreCriteria4,0.00),
	ISNULL(b.ScoreCriteria5,0.00), 
	ISNULL(b.ScoreCriteria6,0.00), 
	ISNULL(b.ScoreCriteria7,0.00), 
	ISNULL(b.ScoreCriteria8,0.00), 
	ISNULL(b.ScoreCriteria9,0.00), 
	ISNULL(b.ScoreCriteria10,0.00),
	ISNULL(a.LeafNodeFlag, 0) 
	
	FROM Amplo.DecompositionProcessLevel2 a 
    left outer JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID 
	--added by Srini on 10-November 2019
	AND ActiveFlag = 1
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Level2LeafNodeFlag
	
    WHILE @@FETCH_STATUS = 0
    BEGIN
			
		INSERT INTO #DecompositionProcessLevelDetails
		(
			ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
			VALUES
			(
				@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2, @Level2LeafNodeFlag
			);


			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)
			, ISNULL(a.LeafNodeFlag, 0)
			FROM Amplo.DecompositionProcessLevel3 a
			left outer JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			AND ActiveFlag = 1 --Added by Srini on 10-November-2019
			ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level3LeafNodeFlag

			WHILE @@FETCH_STATUS = 0
			BEGIN
			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3, @Level3LeafNodeFlag);

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)  
			, ISNULL(a.LeafNodeFlag, 0)
			FROM Amplo.DecompositionProcessLevel4 a
			left outer JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			AND ActiveFlag = 1 --Added by Srini on 10-November-2019
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level4LeafNodeFlag


			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
				INSERT INTO #DecompositionProcessLevelDetails
				(
					ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
					VALUES
					(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4, @Level4LeafNodeFlag, @ProcessLevelNodeID);
							
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],
							ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)
							, ISNULL(a.LeafNodeFlag, 0)
							from Amplo.DecompositionProcessLevel5 a
							left outer join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID AND a.[DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
							AND ActiveFlag = 1 --Added by Srini on 10-November-2019
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level5LeafNodeFlag

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5, @Level5LeafNodeFlag, @ProcessLevelNodeID);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level5LeafNodeFlag
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level4LeafNodeFlag
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level3LeafNodeFlag
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Level2LeafNodeFlag
    END;

    CLOSE ProcessLeveL2List
    DEALLOCATE ProcessLeveL2List

   CREATE INDEX IX_ProcessLevelID ON #DecompositionProcessLevelDetails (ProcessLevel1ID, ProcessLevel2ID,ProcessLevel3ID,ProcessLevel4ID,ProcessLevel5ID);

	select 
			ProcessLevel1ID,
			ProcessLevel2ID,
			ProcessLevel3ID,
			ProcessLevel4ID,
			ProcessLevel5ID,
			ProcessLevelNodeID as ProcessLevelID, 
			ProcessLevelTitle, 
			ScoreCriteria1, 
			ScoreCriteria2,
			ScoreCriteria3,
			ScoreCriteria4,
			ScoreCriteria5,
			ScoreCriteria6,
			ScoreCriteria7,
			ScoreCriteria8,
			ScoreCriteria9,
			ScoreCriteria10, 
			NodeLevelID, 
			Owner, 
			CountrySpecific, 
			Priority, 
			ProcessLevel
			, LeafNodeFlag
			, @Status [Status]
		FROM #DecompositionProcessLevelDetails


		DROP TABLE if exists #DecompositionProcessLevelDetails;

    COMMIT TRANSACTION;
	RETURN 0;
    END TRY
    BEGIN CATCH
		CLOSE ProcessLeveL2List
		DEALLOCATE ProcessLeveL2List

		CLOSE ProcessLeveL3List
		DEALLOCATE ProcessLeveL3List

		--CLOSE ProcessLeveL4List
		--DEALLOCATE ProcessLeveL4List

		--CLOSE ProcessLeveL2List
		--DEALLOCATE ProcessLeveL2List

		select Error_Message(), error_Line()
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeView_28102019]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeView_28102019]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]

--	<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
--	Declare @DecompositionProcessLevel1ID int
 --   Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here
--	DECLARE @ProjectID [int]
--	DECLARE @ProcessLevel1ID [int]
	DECLARE @PProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[INT]
	DECLARE @ScoreCriteria2	[INT]
	DECLARE @ScoreCriteria3	[INT]
	DECLARE @ScoreCriteria4	[INT]
	DECLARE @ScoreCriteria5	[INT]
	DECLARE @ScoreCriteria6	[INT]
	DECLARE @ScoreCriteria7	[INT]
	DECLARE @ScoreCriteria8	[INT]
	DECLARE @ScoreCriteria9	[INT]
	DECLARE @ScoreCriteria10 [INT]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]

--	set @ProjectID = 4
--	set @ProcessLevel1ID = 1
    -- Insert statements for procedure here
	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 [float], 
		ScoreCriteria2 [float],
		ScoreCriteria3 [float],
		ScoreCriteria4 [float],
		ScoreCriteria5 [float],
		ScoreCriteria6 [float],
		ScoreCriteria7 [float],
		ScoreCriteria8 [float],
		ScoreCriteria9 [float],
		ScoreCriteria10 [float], 
		NodeLevelID [float], 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int]
	  );

--Process Level1 Cursor

	SELECT top 1 @PProcessLevel1ID = a.[DecompositionProcessLevel1ID], @ProcessLevelTitle=[ProcessLevel1Title], @Owner=[Owner] FROM Amplo.DecompositionProcessLevel1 a
	INNER JOIN Amplo.DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;
	INSERT INTO #DecompositionProcessLevelDetails
	(
		ProcessLevel1ID, ProcessLevelTitle, Owner, ProcessLevel
	)
	VALUES
	(
		@ProcessLevel1ID, @ProcessLevelTitle, @Owner, 1
	)


	--Process Level2 Cursor

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[ProcessLevel2NodeID],a.[ProcessLevel2Title], a.[Owner], a.[CountrySpecific], a.[LeafNodeFlag], b.[AvgScoreWeightage], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10 
	FROM Amplo.DecompositionProcessLevel2 a 
    INNER JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
	
	INSERT INTO #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific, Priority, ProcessLevel)
		VALUES
		(
			@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2
		);

--		SELECT * FROM #DecompositionProcessLevelDetails

--	SELECT 	@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag;
    WHILE @@FETCH_STATUS = 0
    BEGIN
			

			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage
			FROM Amplo.DecompositionProcessLevel3 a
			INNER JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage  
			FROM Amplo.DecompositionProcessLevel4 a
			INNER JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage
							from Amplo.DecompositionProcessLevel5 a
							inner join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.[DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

							INSERT INTO #DecompositionProcessLevelDetails
							(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
							VALUES
							(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5);

--							SELECT * FROM #DecompositionProcessLevelDetails

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
    END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;

	select 
		    ProcessLevel1ID,
			ProcessLevelNodeID as ProcessLevelID, 
			ProcessLevelTitle, 
			ScoreCriteria1, 
			ScoreCriteria2,
			ScoreCriteria3,
			ScoreCriteria4,
			ScoreCriteria5,
			ScoreCriteria6,
			ScoreCriteria7,
			ScoreCriteria8,
			ScoreCriteria9,
			ScoreCriteria10, 
			NodeLevelID, 
			Owner, 
			CountrySpecific, 
			Priority, 
			ProcessLevel 
		FROM #DecompositionProcessLevelDetails
		/*
	UNION ALL

	SELECT 1 as ProcessLevelID, ProcessLevel1Title, NULL as ScoreCriteria1,NULL as ScoreCriteria2,NULL as ScoreCriteria3,NULL as ScoreCriteria4,NULL as ScoreCriteria5,NULL as ScoreCriteria6,NULL as ScoreCriteria7,NULL as ScoreCriteria8,NULL as ScoreCriteria9,NULL as ScoreCriteria10,NULL as NodeLevelID, Owner,null as CountrySpecific,Avg_Score_Weight as Priority, 1 AS ProcessLevel
	FROM [Amplo].[DecompositionProcessLevel1] i 
	inner join [Amplo].[DecompositionProcessLevel1Score] j on i.[DecompositionProcessLevel1ID] = j.[DecompositionProcessLevel1ID]
	WHERE i.DecompositionProjectID = @ProjectID AND i.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID
	*/
--	SELECT * FROM #DecompositionProcessLevelDetails

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
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeView_Original]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeView_Original]
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	WITH DecompositionProcessLevel(ProcessLevelID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2,ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,ScoreCriteria9,ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel) AS
	(

	SELECT i.[DecompositionProcessLevel1ID],[ProcessLevel1Title],NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL, [Owner],NULL,Avg_Score_Weight, 1 AS ProcessLevel
	FROM [Amplo].[DecompositionProcessLevel1] i 
	inner join [Amplo].[DecompositionProcessLevel1Score] j on i.[DecompositionProcessLevel1ID] = j.[DecompositionProcessLevel1ID]
	UNION ALL

	SELECT a.DecompositionProcessLevel2ID, a.ProcessLevel2Title , b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, a.ProcessLevel2NodeID, a.owner, a.CountrySpecific, b.AvgScoreWeightage, 2 AS ProcessLevel
	from Amplo.DecompositionProcessLevel2  a
	inner join Amplo.DecompositionProcessLevel2Score b on a.DecompositionProcessLevel2ID = b.DecompositionProcessLevel2ID
	UNION ALL
	SELECT a.DecompositionProcessLevel3ID, a.ProcessLevel3Title , b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, a.ProcessLevel3NodeID, a.owner, a.CountrySpecific, b.AvgScoreWeightage, 3 AS ProcessLevel
	from Amplo.DecompositionProcessLevel3  a
	inner join Amplo.DecompositionProcessLevel3Score b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
	UNION ALL
	SELECT a.DecompositionProcessLevel4ID, a.ProcessLevel4Title , b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, a.ProcessLevel4NodeID, a.owner, a.CountrySpecific, b.AvgScoreWeightage, 4 AS ProcessLevel
	from Amplo.DecompositionProcessLevel4  a
	inner join Amplo.DecompositionProcessLevel4Score b on a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
	UNION ALL
	SELECT a.DecompositionProcessLevel5ID, a.ProcessLevel5Title , b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, a.ProcessLevel5NodeID, a.owner, a.CountrySpecific, b.AvgScoreWeightage, 5 AS ProcessLevel
	from Amplo.DecompositionProcessLevel5  a
	inner join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
	)

	--if @OrderBy = 2
	--SELECT * from DecompositionProcessLevel order by DecompositionProcessLevel2ID
	--else if @OrderBy = 3
	--SELECT * from DecompositionProcessLevel order by DecompositionProcessLevel3ID
	--else if @OrderBy = 4
	--SELECT * from DecompositionProcessLevel order by DecompositionProcessLevel4ID
	
	SELECT * from DecompositionProcessLevel

	/*
	SELECT a.DecompositionProcessLevel2ID, a.DecompositionProcessLevel1ID, 
	b.DecompositionProcessLevel2ScoreID, b.Score_Criteria_1, b.Score_Criteria_2, b.Score_Criteria_3, b.Score_Criteria_4,b.Score_Criteria_5, b.Score_Criteria_6, b.Score_Criteria_7, b.Score_Criteria_8, b.Score_Criteria_9, b.Score_Criteria_10, 
	c.DecompositionProcessLevel3ID, d.DecompositionProcessLevel3ScoreID, d.Score_Criteria_1, d.Score_Criteria_2, d.Score_Criteria_3,d.Score_Criteria_4, d.Score_Criteria_5, d.score_Criteria_6, d.Score_Criteria_7, d.Score_Criteria_8, d.Score_Criteria_9, d.Score_Criteria_10,
	f.DecompositionProcessLevel4ID , f.DecompositionProcessLevel4ScoreID , f.Score_Criteria_1, f.Score_Criteria_2, f.Score_Criteria_3,f.Score_Criteria_4, f.Score_Criteria_5, f.score_Criteria_6, f.Score_Criteria_7, f.Score_Criteria_8, f.Score_Criteria_9, f.Score_Criteria_10,
	h.DecompositionProcessLevel5ID, h.DecompositionProcessLevel5ScoreID, h.Score_Criteria_1, h.Score_Criteria_2, h.Score_Criteria_3,h.Score_Criteria_4, h.Score_Criteria_5, h.score_Criteria_6, h.Score_Criteria_7, h.Score_Criteria_8, h.Score_Criteria_9, h.Score_Criteria_10
	from Amplo.DecompositionProcessLevel2  a
	inner join Amplo.DecompositionProcessLevel2Score b on a.DecompositionProcessLevel2ID = b.DecompositionProcessLevel2ID
	inner join Amplo.DecompositionProcessLevel3 c on b.DecompositionProcessLevel2ID = c.DecompositionProcessLevel3ID
	inner join Amplo.DecompositionProcessLevel3Score d on c.DecompositionProcessLevel2ID = d.DecompositionProcessLevel3ID
	inner join Amplo.DecompositionProcessLevel4 e on e.DecompositionProcessLevel4ID = c.DecompositionProcessLevel3ID
	inner join Amplo.DecompositionProcessLevel4Score f on f.DecompositionProcessLevel4ID = e.DecompositionProcessLevel3ID
	inner join Amplo.DecompositionProcessLevel5 g on g.DecompositionProcessLevel5ID = e.DecompositionProcessLevel4ID
	inner join Amplo.DecompositionProcessLevel5Score h on g.DecompositionProcessLevel5ID = f.DecompositionProcessLevel4ID
	*/


	/*
	
		DECLARE @ProjectID [int]
	DECLARE @ProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[INT]
	DECLARE @ScoreCriteria2	[INT]
	DECLARE @ScoreCriteria3	[INT]
	DECLARE @ScoreCriteria4	[INT]
	DECLARE @ScoreCriteria5	[INT]
	DECLARE @ScoreCriteria6	[INT]
	DECLARE @ScoreCriteria7	[INT]
	DECLARE @ScoreCriteria8	[INT]
	DECLARE @ScoreCriteria9	[INT]
	DECLARE @ScoreCriteria10 [INT]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevel2NodeID [VARCHAR](30)
	DECLARE @ProcessLevel2Title [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]


    -- Insert statements for procedure here
	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 [float], 
		ScoreCriteria2 [float],
		ScoreCriteria3 [float],
		ScoreCriteria4 [float],
		ScoreCriteria5 [float],
		ScoreCriteria6 [float],
		ScoreCriteria7 [float],
		ScoreCriteria8 [float],
		ScoreCriteria9 [float],
		ScoreCriteria10 [float], 
		NodeLevelID [float], 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int]
	  );


	--Process Level1 Cursor

	SET @ProcessLevel1ID = 1
	set @ProjectID = 4
	DECLARE ProcessLevel1List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[ProcessLevel2NodeID],a.[ProcessLevel2Title], a.[Owner], a.[CountrySpecific], a.[LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10 
	FROM Amplo.DecompositionProcessLevel2 a 
    INNER JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel1ID] = b.[DecompositionProcessLevel1ID]
	where a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;

    OPEN ProcessLevel1List;
    FETCH NEXT FROM ProcessLevel1List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
	
	INSERT INTO #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID, 
		ProcessLevel2ID,
		ProcessLevelTitle, 
		ScoreCriteria1, 
		ScoreCriteria2,
		ScoreCriteria3,
		ScoreCriteria4,
		ScoreCriteria5,
		ScoreCriteria6,
		ScoreCriteria7,
		ScoreCriteria8,
		ScoreCriteria9,
		ScoreCriteria10, 
		NodeLevelID, 
		Owner, 
		CountrySpecific, 
		Priority, 
		ProcessLevel)
		VALUES
		(
		@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevel2Title, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, NULL, @Owner, @CountrySpecific, '1', 1
		);

--		SELECT * FROM #DecompositionProcessLevelDetails

--	SELECT 	@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag;
    WHILE @@FETCH_STATUS = 0
    BEGIN
			

			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag] from Amplo.DecompositionProcessLevel3 where DecompositionProjectID = @ProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, 
				ProcessLevel2ID,
				ProcessLevel3ID,
				ProcessLevelTitle, 
				ScoreCriteria1, 
				ScoreCriteria2,
				ScoreCriteria3,
				ScoreCriteria4,
				ScoreCriteria5,
				ScoreCriteria6,
				ScoreCriteria7,
				ScoreCriteria8,
				ScoreCriteria9,
				ScoreCriteria10, 
				NodeLevelID, 
				Owner, 
				CountrySpecific, 
				Priority, 
				ProcessLevel)
				VALUES
				(
				@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevel2Title, NULL, NULL, NULL,NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL,@Owner, @CountrySpecific, '1', 1
				);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [ProcessLevel4NodeID],[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag] from Amplo.DecompositionProcessLevel4 where DecompositionProjectID = @ProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
				VALUES
				(
				@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevel2Title, NULL, NULL, NULL,NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL,@Owner, @CountrySpecific, '1', 1
				);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID],[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag] from Amplo.DecompositionProcessLevel5 where DecompositionProjectID = @ProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID AND [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID AND [DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag

							INSERT INTO #DecompositionProcessLevelDetails
							(
							ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
							VALUES
							(
							@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevel2Title, NULL, NULL, NULL,NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL,@Owner, @CountrySpecific, '1', 1
							);

							SELECT * FROM #DecompositionProcessLevelDetails

							WHILE @@FETCH_STATUS = 0
							BEGIN
							FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;




	
    FETCH NEXT FROM ProcessLevel1List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevel2NodeID, @ProcessLevel2Title, @Owner, @CountrySpecific, @LeafNodeFlag
    END;

    CLOSE ProcessLevel1List;
    DEALLOCATE ProcessLevel1List;
	
	*/



END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeViewHeatmap]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeViewHeatmap]
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[INT]
	DECLARE @ScoreCriteria2	[INT]
	DECLARE @ScoreCriteria3	[INT]
	DECLARE @ScoreCriteria4	[INT]
	DECLARE @ScoreCriteria5	[INT]
	DECLARE @ScoreCriteria6	[INT]
	DECLARE @ScoreCriteria7	[INT]
	DECLARE @ScoreCriteria8	[INT]
	DECLARE @ScoreCriteria9	[INT]
	DECLARE @ScoreCriteria10 [INT]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]

    -- Insert statements for procedure here
	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 [float], 
		ScoreCriteria2 [float],
		ScoreCriteria3 [float],
		ScoreCriteria4 [float],
		ScoreCriteria5 [float],
		ScoreCriteria6 [float],
		ScoreCriteria7 [float],
		ScoreCriteria8 [float],
		ScoreCriteria9 [float],
		ScoreCriteria10 [float], 
		NodeLevelID [float], 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int]
		, LeafNodeFlag bit
	  );

	declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	--Process Level2 Cursor

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[ProcessLevel2NodeID],a.[ProcessLevel2Title], a.[Owner], a.[CountrySpecific], a.[LeafNodeFlag], b.[AvgScoreWeightage], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10 
	, ISNULL(a.LeafNodeFlag, 0) 
	FROM Amplo.DecompositionProcessLevel2 a 
    INNER JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID and a.ActiveFlag = 1
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;

    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Level2LeafNodeFlag
	
	INSERT INTO #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
		VALUES
		(
			@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2, @Level2LeafNodeFlag
		);
    WHILE @@FETCH_STATUS = 0
    BEGIN
			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage
			, ISNULL(a.LeafNodeFlag, 0) 
			FROM Amplo.DecompositionProcessLevel3 a
			INNER JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			 and a.ActiveFlag = 1ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level3LeafNodeFlag

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3, @Level3LeafNodeFlag);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage  
			, ISNULL(a.LeafNodeFlag, 0) 
			FROM Amplo.DecompositionProcessLevel4 a
			INNER JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			 and a.ActiveFlag = 1ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level4LeafNodeFlag

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4, @Level4LeafNodeFlag, @ProcessLevelNodeID);

			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage
							, ISNULL(a.LeafNodeFlag, 0) 
							from Amplo.DecompositionProcessLevel5 a
							inner join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.[DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
							 and a.ActiveFlag = 1ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level5LeafNodeFlag

							INSERT INTO #DecompositionProcessLevelDetails
							(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
							VALUES
							(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5, @Level5LeafNodeFlag, @ProcessLevelNodeID);

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level5LeafNodeFlag
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level4LeafNodeFlag
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level3LeafNodeFlag
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Level2LeafNodeFlag
    END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;


		select
			ProcessLevelNodeID as ProcessLevelID,
			ProcessLevelTitle, 
			ScoreCriteria1, 
			ScoreCriteria2,
			ScoreCriteria3,
			ScoreCriteria4,
			ScoreCriteria5,
			ScoreCriteria6,
			ScoreCriteria7,
			ScoreCriteria8,
			ScoreCriteria9,
			ScoreCriteria10, 
			NodeLevelID, 
			Owner, 
			CountrySpecific, 
			Priority, 
			ProcessLevel
			, LeafNodeFlag
		FROM #DecompositionProcessLevelDetails;

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
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeViewHeatmap_10112019]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeViewHeatmap_10112019]
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[INT]
	DECLARE @ScoreCriteria2	[INT]
	DECLARE @ScoreCriteria3	[INT]
	DECLARE @ScoreCriteria4	[INT]
	DECLARE @ScoreCriteria5	[INT]
	DECLARE @ScoreCriteria6	[INT]
	DECLARE @ScoreCriteria7	[INT]
	DECLARE @ScoreCriteria8	[INT]
	DECLARE @ScoreCriteria9	[INT]
	DECLARE @ScoreCriteria10 [INT]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]

    -- Insert statements for procedure here
	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 [float], 
		ScoreCriteria2 [float],
		ScoreCriteria3 [float],
		ScoreCriteria4 [float],
		ScoreCriteria5 [float],
		ScoreCriteria6 [float],
		ScoreCriteria7 [float],
		ScoreCriteria8 [float],
		ScoreCriteria9 [float],
		ScoreCriteria10 [float], 
		NodeLevelID [float], 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int]
		, LeafNodeFlag bit
	  );

	declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	--Process Level2 Cursor

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[ProcessLevel2NodeID],a.[ProcessLevel2Title], a.[Owner], a.[CountrySpecific], a.[LeafNodeFlag], b.[AvgScoreWeightage], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10 
	, ISNULL(a.LeafNodeFlag, 0) 
	FROM Amplo.DecompositionProcessLevel2 a 
    INNER JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
	AND ActiveFlag = 1 --Added by Srini on 10-November-2019
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;

    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Level2LeafNodeFlag
	
	INSERT INTO #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
		VALUES
		(
			@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2, @Level2LeafNodeFlag
		);
    WHILE @@FETCH_STATUS = 0
    BEGIN
			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage
			, ISNULL(a.LeafNodeFlag, 0) 
			FROM Amplo.DecompositionProcessLevel3 a
			INNER JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			AND ActiveFlag = 1 --Added by Srini on 10-November-2019
			ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level3LeafNodeFlag

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3, @Level3LeafNodeFlag);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage  
			, ISNULL(a.LeafNodeFlag, 0) 
			FROM Amplo.DecompositionProcessLevel4 a
			INNER JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			AND ActiveFlag = 1 --Added by Srini on 10-November-2019
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level4LeafNodeFlag

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4, @Level4LeafNodeFlag, @ProcessLevelNodeID);

			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage
							, ISNULL(a.LeafNodeFlag, 0) 
							from Amplo.DecompositionProcessLevel5 a
							inner join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.[DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
--							AND ActiveFlag = 1 --Added by Srini on 10-November-2019
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level5LeafNodeFlag

							INSERT INTO #DecompositionProcessLevelDetails
							(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
							VALUES
							(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5, @Level5LeafNodeFlag, @ProcessLevelNodeID);

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level5LeafNodeFlag
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level4LeafNodeFlag
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Level3LeafNodeFlag
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Level2LeafNodeFlag
    END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;


		select
			ProcessLevelNodeID as ProcessLevelID,
			ProcessLevelTitle, 
			ScoreCriteria1, 
			ScoreCriteria2,
			ScoreCriteria3,
			ScoreCriteria4,
			ScoreCriteria5,
			ScoreCriteria6,
			ScoreCriteria7,
			ScoreCriteria8,
			ScoreCriteria9,
			ScoreCriteria10, 
			NodeLevelID, 
			Owner, 
			CountrySpecific, 
			Priority, 
			ProcessLevel
			, LeafNodeFlag
		FROM #DecompositionProcessLevelDetails;

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
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeViewHeatMapScores]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeViewHeatMapScores]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN

	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT

	DECLARE @PProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]
	DECLARE @TotalAvgScore [float]
	DECLARE @TotalAvgScore1 [float]
	DECLARE @TotalAvgScore2 [float]
	DECLARE @TotalAvgScore3 [float]
	DECLARE @TotalAvgScore4 [float]
	DECLARE @TotalAvgScore5 [float]


	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[float]
	DECLARE @ScoreCriteria2	[float]
	DECLARE @ScoreCriteria3	[float]
	DECLARE @ScoreCriteria4	[float]
	DECLARE @ScoreCriteria5	[float]
	DECLARE @ScoreCriteria6	[float]
	DECLARE @ScoreCriteria7	[float]
	DECLARE @ScoreCriteria8	[float]
	DECLARE @ScoreCriteria9	[float]
	DECLARE @ScoreCriteria10 [float]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]
	DECLARE @ScoreCriteriaUsedCount [int]

	SET @ScoreCriteria1	= 0.00
	SET @ScoreCriteria2	= 0.00
	SET @ScoreCriteria3	= 0.00
	SET @ScoreCriteria4 = 0.00
	SET @ScoreCriteria5	= 0.00
	SET @ScoreCriteria6	= 0.00
	SET @ScoreCriteria7	= 0.00
	SET @ScoreCriteria8	= 0.00
	SET @ScoreCriteria9	= 0.00
	SET @ScoreCriteria10 = 0.00

	SET @TotalAvgScore1 = -1
	SET @TotalAvgScore2 = -1
	SET @TotalAvgScore3 = -1
	SET @TotalAvgScore4 = -1
	SET @TotalAvgScore5  = 0
	SET @ScoreCriteriaUsedCount = 0


	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 [float], 
		ScoreCriteria2 [float],
		ScoreCriteria3 [float],
		ScoreCriteria4 [float],
		ScoreCriteria5 [float],
		ScoreCriteria6 [float],
		ScoreCriteria7 [float],
		ScoreCriteria8 [float],
		ScoreCriteria9 [float],
		ScoreCriteria10 [float], 
		NodeLevelID [varchar](100), 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int],
		TotalAvgScore numeric(10, 2),
		TotalAvgScore1  numeric(10, 2),
		TotalAvgScore2  numeric(10, 2),
		TotalAvgScore3  numeric(10, 2),
		TotalAvgScore4  numeric(10, 2),
		TotalAvgScore5  numeric(10, 2)
		, LeafNodeFlag bit
	  );
	  declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	  declare @Status as int = 0
--Process Level1 Cursor

	SELECT top 1 @Status = a.[Status], @PProcessLevel1ID = a.[DecompositionProcessLevel1ID], @ProcessLevelTitle=[ProcessLevel1Title], @Owner=[Owner], @AvgScoreWeightage = ISNULL([Avg_Score_Weight],2.00) FROM Amplo.DecompositionProcessLevel1 a
	INNER JOIN Amplo.DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID and a.ActiveFlag = 1
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;
	INSERT INTO #DecompositionProcessLevelDetails
	(
		ProcessLevel1ID, ProcessLevelTitle, Owner, Priority, ProcessLevel, LeafNodeFlag, TotalAvgScore1
	)
	VALUES
	(
		@ProcessLevel1ID, @ProcessLevelTitle, @Owner, @AvgScoreWeightage, 1, 0, -1
	)


	SELECT @ScoreCriteriaUsedCount = COUNT(1) FROM Amplo.DecompositionScoreCriteriaProject WHERE DecompositionProjectID = @ProjectID AND DecompositionProcessLevel1ID= @ProcessLevel1ID AND USEDFLAG=1;
	--select @ScoreCriteriaUsedCount as ScoreCriteriaUsedCount

	--Process Level2 Cursor

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT 
	a.[DecompositionProcessLevel1ID], 
	a.[DecompositionProcessLevel2ID], 
	a.[ProcessLevel2NodeID],
	a.[ProcessLevel2Title], 
	a.[Owner], 
	a.[CountrySpecific], 
	a.[LeafNodeFlag], 
	ISNULL(b.[AvgScoreWeightage],2.00), 
	ISNULL(b.ScoreCriteria1, 0.00), 
	ISNULL(b.ScoreCriteria2,0.00), 
	ISNULL(b.ScoreCriteria3,0.00), 
	ISNULL(b.ScoreCriteria4,0.00),
	ISNULL(b.ScoreCriteria5,0.00), 
	ISNULL(b.ScoreCriteria6,0.00), 
	ISNULL(b.ScoreCriteria7,0.00), 
	ISNULL(b.ScoreCriteria8,0.00), 
	ISNULL(b.ScoreCriteria9,0.00), 
	ISNULL(b.ScoreCriteria10,0.00),
	(case when a.[LeafNodeFlag] = 0 then CAST(-1 as numeric(10, 2)) else ((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) end) AS TotalAvgScore
	FROM Amplo.DecompositionProcessLevel2 a 
    left outer JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID and a.ActiveFlag = 1
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
	, @TotalAvgScore2

    WHILE @@FETCH_STATUS = 0
    BEGIN
			
		INSERT INTO #DecompositionProcessLevelDetails
		(
			TotalAvgScore2, ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific,
 Priority, ProcessLevel, LeafNodeFlag)
			VALUES
			(
				@TotalAvgScore2, @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2, ISNULL(@LeafNodeFlag, 0)
			);


			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)
			, (case when a.[LeafNodeFlag] = 0 then CAST(-1 as numeric(10, 2)) else ((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) end) AS TotalAvgScore
			FROM Amplo.DecompositionProcessLevel3 a
			left outer JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			 and a.ActiveFlag = 1ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore3

			WHILE @@FETCH_STATUS = 0
			BEGIN

			INSERT INTO #DecompositionProcessLevelDetails
			(
				TotalAvgScore3, ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
				VALUES
				(@TotalAvgScore3, @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3, ISNULL(@LeafNodeFlag, 0));

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)  
			, (case when a.[LeafNodeFlag] = 0 then CAST(-1 as numeric(10, 2)) else ((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) end) AS TotalAvgScore
			FROM Amplo.DecompositionProcessLevel4 a
			left outer JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			 and a.ActiveFlag = 1
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore4
			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
			INSERT INTO #DecompositionProcessLevelDetails
			(
				TotalAvgScore4, ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
				VALUES
				(@TotalAvgScore4, @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4, ISNULL(@LeafNodeFlag, 0), @ProcessLevelNodeID);
							
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage,
							((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) AS TotalAvgScore
							from Amplo.DecompositionProcessLevel5 a
							left outer join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID AND a.[DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
							 and a.ActiveFlag = 1 --Added by Srini on 10-November-2019
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @TotalAvgScore5

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9
								, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, TotalAvgScore5, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, '', @TotalAvgScore5, 5, ISNULL(@LeafNodeFlag, 0), @ProcessLevelNodeID);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @TotalAvgScore5
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore4
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore3
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
    , @TotalAvgScore2
	END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;

   CREATE INDEX IX_ProcessLevelID ON #DecompositionProcessLevelDetails (ProcessLevel1ID, ProcessLevel2ID,ProcessLevel3ID,ProcessLevel4ID,ProcessLevel5ID);

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = ISNULL(TotalAvgScore4, 0) + ISNULL(TotalAvgScore5, 0.00) --+ 1
   where ISNULL(TotalAvgScore4, 0) = -1 or TotalAvgScore4 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = ISNULL(TotalAvgScore3, 0) + ISNULL(TotalAvgScore4, 0.00) --+ 1
   where ISNULL(TotalAvgScore3, 0) = -1 or TotalAvgScore3 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = ISNULL(TotalAvgScore2, 0) + ISNULL(TotalAvgScore3, 0.00) --+ 1
   where ISNULL(TotalAvgScore2, 0) = -1 or TotalAvgScore2 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = ISNULL(TotalAvgScore1, 0) + ISNULL(TotalAvgScore2, 0.00) --+ 1
   where ISNULL(TotalAvgScore1, 0) = -1 or TotalAvgScore1 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = 0
   where ISNULL(TotalAvgScore4, 0) = -1 or TotalAvgScore4 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = 0
   where ISNULL(TotalAvgScore3, 0) = -1 or TotalAvgScore3 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = 0
   where ISNULL(TotalAvgScore2, 0) = -1 or TotalAvgScore2 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = 0
   where ISNULL(TotalAvgScore1, 0) = -1 or TotalAvgScore1 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore4) / Count(TotalAvgScore4) score, ProcessLevel4Id from #DecompositionProcessLevelDetails where LeafNodeFlag = 1 group by ProcessLevel4Id) grp
   on grp.ProcessLevel4Id = main.ProcessLevel4Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore4) / Count(TotalAvgScore4) score, ProcessLevel3Id from #DecompositionProcessLevelDetails where ProcessLevel = 4 group by ProcessLevel3Id) grp
   on grp.ProcessLevel3Id = main.ProcessLevel3Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore3) / Count(TotalAvgScore3) score, ProcessLevel2Id from #DecompositionProcessLevelDetails where ProcessLevel = 3 group by ProcessLevel2Id) grp
   on grp.ProcessLevel2Id = main.ProcessLevel2Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore2) / Count(TotalAvgScore2) score, ProcessLevel1Id from #DecompositionProcessLevelDetails where ProcessLevel = 2 group by ProcessLevel1Id) grp
   on grp.ProcessLevel1Id = main.ProcessLevel1Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = 4.6 where (TotalAvgScore1 > 5 or TotalAvgScore1 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = 4.6 where (TotalAvgScore2 > 5 or TotalAvgScore2 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = 4.6 where (TotalAvgScore3 > 5 or TotalAvgScore3 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = 4.6 where (TotalAvgScore4 > 5 or TotalAvgScore4 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore5 = 4.6 where (TotalAvgScore5 > 5 or TotalAvgScore5 < 0)

	select 
			ProcessLevel1ID,
			ProcessLevel2ID,
			ProcessLevel3ID,
			ProcessLevel4ID,
			ProcessLevel5ID,
			ProcessLevelNodeID as ProcessLevelID, 
			ProcessLevelTitle, 
			ScoreCriteria1, 
			ScoreCriteria2,
			ScoreCriteria3,
			ScoreCriteria4,
			ScoreCriteria5,
			ScoreCriteria6,
			ScoreCriteria7,
			ScoreCriteria8,
			ScoreCriteria9,
			ScoreCriteria10, 
			NodeLevelID, 
			Owner, 
			CountrySpecific, 
			Priority, 
			TotalAvgScore,
			TotalAvgScore1,
			TotalAvgScore2,
			TotalAvgScore3,
			TotalAvgScore4,
			TotalAvgScore5,
			ProcessLevel,
			LeafNodeFlag,
			@Status [Status]
		FROM #DecompositionProcessLevelDetails

	DROP TABLE if exists #DecompositionProcessLevelDetails;

    COMMIT TRANSACTION;
	RETURN 0;
    END TRY
    BEGIN CATCH
	select Error_Message()
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
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeViewHeatMapScores_28102019]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeViewHeatMapScores_28102019]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]

--	<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
--	Declare @DecompositionProcessLevel1ID int
 --   Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here
--	DECLARE @ProjectID [int]
--	DECLARE @ProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]
	DECLARE @TotalAvgScore [float]
	DECLARE @TotalAvgScore1 [float]
	DECLARE @TotalAvgScore2 [float]
	DECLARE @TotalAvgScore3 [float]
	DECLARE @TotalAvgScore4 [float]
	DECLARE @TotalAvgScore5 [float]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[INT]
	DECLARE @ScoreCriteria2	[INT]
	DECLARE @ScoreCriteria3	[INT]
	DECLARE @ScoreCriteria4	[INT]
	DECLARE @ScoreCriteria5	[INT]
	DECLARE @ScoreCriteria6	[INT]
	DECLARE @ScoreCriteria7	[INT]
	DECLARE @ScoreCriteria8	[INT]
	DECLARE @ScoreCriteria9	[INT]
	DECLARE @ScoreCriteria10 [INT]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]

	SET @TotalAvgScore1 = 4.5
	SET @TotalAvgScore2 = 2.7
	SET @TotalAvgScore3 = 3.8
	SET @TotalAvgScore4 = 1.5
	SET @TotalAvgScore5  = 4.6


--	set @ProjectID = 4
--	set @ProcessLevel1ID = 1
    -- Insert statements for procedure here
	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 [float], 
		ScoreCriteria2 [float],
		ScoreCriteria3 [float],
		ScoreCriteria4 [float],
		ScoreCriteria5 [float],
		ScoreCriteria6 [float],
		ScoreCriteria7 [float],
		ScoreCriteria8 [float],
		ScoreCriteria9 [float],
		ScoreCriteria10 [float], 
		NodeLevelID [float], 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int],
		TotalAvgScore [float],
		TotalAvgScore1 [float],
		TotalAvgScore2 [float],
		TotalAvgScore3 [float],
		TotalAvgScore4 [float],
		TotalAvgScore5 [float]
	  );

	--Process Level2 Cursor

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[ProcessLevel2NodeID],a.[ProcessLevel2Title], a.[Owner], a.[CountrySpecific], a.[LeafNodeFlag], b.[AvgScoreWeightage], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10 
	FROM Amplo.DecompositionProcessLevel2 a 
    INNER JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;

    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
	
	INSERT INTO #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific, Priority, ProcessLevel)
		VALUES
		(
			@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2
		);

--		SELECT * FROM #DecompositionProcessLevelDetails

--	SELECT 	@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag;
    WHILE @@FETCH_STATUS = 0
    BEGIN
			

			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage
			FROM Amplo.DecompositionProcessLevel3 a
			INNER JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage  
			FROM Amplo.DecompositionProcessLevel4 a
			INNER JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4);

--			SELECT * FROM #DecompositionProcessLevelDetails

			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage,
							(Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10]) * [AvgScoreWeightage]) AS TotalAvgScore
							from Amplo.DecompositionProcessLevel5 a
							inner join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.[DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

							SET @TotalAvgScore5 = 0;
							SELECT @TotalAvgScore5 = (@TotalAvgScore5) + @AvgScoreWeightage;
							INSERT INTO #DecompositionProcessLevelDetails
							(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel,TotalAvgScore, TotalAvgScore5)
							VALUES
							(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5,@TotalAvgScore, @TotalAvgScore5);

--							SELECT * FROM #DecompositionProcessLevelDetails

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel,TotalAvgScore, TotalAvgScore5)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5,@TotalAvgScore, @TotalAvgScore5);
								SELECT @TotalAvgScore5 = (@TotalAvgScore5) + @AvgScoreWeightage;
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
    END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;


		select
			ProcessLevelNodeID as ProcessLevelID,
			ProcessLevelTitle, 
			ScoreCriteria1, 
			ScoreCriteria2,
			ScoreCriteria3,
			ScoreCriteria4,
			ScoreCriteria5,
			ScoreCriteria6,
			ScoreCriteria7,
			ScoreCriteria8,
			ScoreCriteria9,
			ScoreCriteria10, 
			NodeLevelID, 
			Owner, 
			CountrySpecific, 
			Priority, 
			ProcessLevel,
			TotalAvgScore,
			4.5 TotalAvgScore1,
			2.7 TotalAvgScore2,
			3.8 TotalAvgScore3,
			1.5 TotalAvgScore4,
			4.6 TotalAvgScore5
		FROM #DecompositionProcessLevelDetails;

--	SELECT * FROM #DecompositionProcessLevelDetails

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
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeViewHeatMapScoresCalculation]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ======================================================================================================================================================
-- Author:      Srinivas
-- Create Date: 25-October-2019
-- Description: This procedure retrieves capability modelling treeview
-- ======================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeViewHeatMapScoresCalculation]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]

--	<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN

	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

--	DECLARE @PROJECTID [int]

	DECLARE @PProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]
	DECLARE @TotalAvgScore [float]
	DECLARE @TotalAvgScore1 [float]
	DECLARE @TotalAvgScore2 [float]
	DECLARE @TotalAvgScore3 [float]
	DECLARE @TotalAvgScore4 [float]
	DECLARE @TotalAvgScore5 [float]


	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[float]
	DECLARE @ScoreCriteria2	[float]
	DECLARE @ScoreCriteria3	[float]
	DECLARE @ScoreCriteria4	[float]
	DECLARE @ScoreCriteria5	[float]
	DECLARE @ScoreCriteria6	[float]
	DECLARE @ScoreCriteria7	[float]
	DECLARE @ScoreCriteria8	[float]
	DECLARE @ScoreCriteria9	[float]
	DECLARE @ScoreCriteria10 [float]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]
	DECLARE @ScoreCriteriaUsedCount [int]

	SET @ScoreCriteria1	= 0.00
	SET @ScoreCriteria2	= 0.00
	SET @ScoreCriteria3	= 0.00
	SET @ScoreCriteria4 = 0.00
	SET @ScoreCriteria5	= 0.00
	SET @ScoreCriteria6	= 0.00
	SET @ScoreCriteria7	= 0.00
	SET @ScoreCriteria8	= 0.00
	SET @ScoreCriteria9	= 0.00
	SET @ScoreCriteria10 = 0.00
	SET @ScoreCriteriaUsedCount = 7
	SET @DecompositionProcessLevel1ID = 6
	SET @ProjectID = 4

	SET @TotalAvgScore1 = 4.5
	SET @TotalAvgScore2 = 2.7
	SET @TotalAvgScore3 = 3.8
	SET @TotalAvgScore4 = 1.5
	SET @TotalAvgScore5  = 4.6
	SET @ScoreCriteriaUsedCount = 0

--select * from Amplo.DecompositionProcessLevel5;
--select * from Amplo.Decompositionprocesslevel5score;
--select (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
--from Amplo.Decompositionprocesslevel5score
--

--select (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from 
--						Amplo.DecompositionProcessLevel5Score a inner join Amplo.DecompositionProcessLevel5 b 
--						on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID and b.DecompositionProcessLevel1ID = 6


		select @ScoreCriteriaUsedCount = count([UsedFlag]) from Amplo.DecompositionScoreCriteriaProject where [UsedFlag] = 1

		UPDATE Amplo.DecompositionProcessLevel5Score
		SET Level5CalcAggrScore = (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
		where DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID

--DecompositionProcessLevel4Score

		DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
		FOR
		SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
		ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)  
		FROM Amplo.DecompositionProcessLevel4 a
		INNER JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
		WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
		ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

		OPEN ProcessLeveL4List;
		FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

		WHILE @@FETCH_STATUS = 0
		BEGIN
			if @LeafNodeFlag = 1

				Begin

					SELECT  'leafnode flag 1'
					SELECT @DecompositionProcessLevel4ID
					

					
					select @TotalAvgScore4 = (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
					from Amplo.DecompositionProcessLevel4Score a inner join Amplo.DecompositionProcessLevel4 b on a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
					and b.DecompositionProcessLevel4ID = @DecompositionProcessLevel4ID;
					
					select @TotalAvgScore4

					UPDATE Amplo.DecompositionProcessLevel4Score
					set Level4CalcAggrScore = @TotalAvgScore4 
					where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID

				end

			else if @LeafNodeFlag = 0
				
					begin

						SELECT 'leafnode flag 0'
						select @DecompositionProcessLevel4ID

						select @TotalAvgScore4 = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from 
						Amplo.DecompositionProcessLevel5Score a inner join Amplo.DecompositionProcessLevel5 b 
						on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID and b.DecompositionProcessLevel4ID = @DecompositionProcessLevel4ID and b.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID
						--where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
						GROUP BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel4ID]

						select @TotalAvgScore4

						update Amplo.DecompositionProcessLevel4Score
						set Level4CalcAggrScore = @TotalAvgScore4 
						where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID

					end


--					select @TotalAvgScore4 as TotalAvgScore4

					--SELECT @ProcessLevel2AverageScore = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10]) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from Amplo.DecompositionProcessLevel2Score
					--where [DecompositionProcessLevel1ID] = @ProcessLevel2ID
					--GROUP BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID]

		FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
		END;

		CLOSE ProcessLeveL4List;

		DEALLOCATE ProcessLevel4List;




--Process Level3

			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)
			FROM Amplo.DecompositionProcessLevel3 a
			INNER JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

			WHILE @@FETCH_STATUS = 0
			BEGIN


			if @LeafNodeFlag = 1

				Begin

					SELECT  'leafnode flag 1'
					SELECT @DecompositionProcessLevel4ID
					

					select @TotalAvgScore3 = (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
					from Amplo.DecompositionProcessLevel3Score a inner join Amplo.DecompositionProcessLevel3 b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
					and b.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID;
										select @TotalAvgScore3

					UPDATE Amplo.DecompositionProcessLevel3Score
					set Level3CalcAggrScore = @TotalAvgScore3 
					where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID

				end

			else if @LeafNodeFlag = 0
				
					begin

						SELECT 'leafnode flag 0'
						select @DecompositionProcessLevel3ID

						select @TotalAvgScore3 = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from 
						Amplo.DecompositionProcessLevel4Score a inner join Amplo.DecompositionProcessLevel4 b 
						on a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID and b.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID and b.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID
						--where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
						GROUP BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel4ID]

						select @TotalAvgScore3

						update Amplo.DecompositionProcessLevel3Score
						set Level3CalcAggrScore = @TotalAvgScore3 
						where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID

					end



			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT 
	a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], 
	a.[ProcessLevel2NodeID],
	a.[ProcessLevel2Title], 
	a.[Owner], 
	a.[CountrySpecific], 
	a.[LeafNodeFlag], 
	ISNULL(b.[AvgScoreWeightage],2.00), 
	ISNULL(b.ScoreCriteria1, 0.00), 
	ISNULL(b.ScoreCriteria2,0.00), 
	ISNULL(b.ScoreCriteria3,0.00), 
	ISNULL(b.ScoreCriteria4,0.00),
	ISNULL(b.ScoreCriteria5,0.00), 
	ISNULL(b.ScoreCriteria6,0.00), 
	ISNULL(b.ScoreCriteria7,0.00), 
	ISNULL(b.ScoreCriteria8,0.00), 
	ISNULL(b.ScoreCriteria9,0.00), 
	ISNULL(b.ScoreCriteria10,0.00) 
	FROM Amplo.DecompositionProcessLevel2 a 
    INNER JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10

    WHILE @@FETCH_STATUS = 0
    BEGIN

    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
    END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;

			if @LeafNodeFlag = 1

				Begin

					SELECT  'leafnode flag 1'
					SELECT @DecompositionProcessLevel3ID
					

					select @TotalAvgScore2 = (Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))
					from Amplo.DecompositionProcessLevel2Score a inner join Amplo.DecompositionProcessLevel4 b on a.DecompositionProcessLevel2ID = b.DecompositionProcessLevel2ID
					and b.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID;
					
					select @TotalAvgScore2

					UPDATE Amplo.DecompositionProcessLevel2Score
--					select * from Amplo.DecompositionProcessLevel2Score
					set LVL2CalcAggrScore = @TotalAvgScore2 
					where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID

				end

			else if @LeafNodeFlag = 0
				
					begin

						SELECT 'leafnode flag 0'
						select @DecompositionProcessLevel2ID

						select @TotalAvgScore2 = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from 
						Amplo.DecompositionProcessLevel3Score a inner join Amplo.DecompositionProcessLevel3 b 
						on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID and b.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and b.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID
						--where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
						GROUP BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID]

						select @TotalAvgScore2

						update Amplo.DecompositionProcessLevel2Score
						set LVL2CalcAggrScore = @TotalAvgScore2 
						where [DecompositionProcessLevel1ID] = 6 and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID

					end

		    COMMIT TRANSACTION;
	RETURN 0;
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
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionTreeViewHeatMapScoresExport]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetDecompositionTreeViewHeatMapScoresExport]
	-- Add the parameters for the stored procedure here
	@ProjectID [int]
	--@ProcessLevel1ID [int]
AS
BEGIN

	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
	Declare @ProcessLevel1ID as INT
	DECLARE @PProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]
	DECLARE @TotalAvgScore [float]
	DECLARE @TotalAvgScore1 [float]
	DECLARE @TotalAvgScore2 [float]
	DECLARE @TotalAvgScore3 [float]
	DECLARE @TotalAvgScore4 [float]
	DECLARE @TotalAvgScore5 [float]


	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[float]
	DECLARE @ScoreCriteria2	[float]
	DECLARE @ScoreCriteria3	[float]
	DECLARE @ScoreCriteria4	[float]
	DECLARE @ScoreCriteria5	[float]
	DECLARE @ScoreCriteria6	[float]
	DECLARE @ScoreCriteria7	[float]
	DECLARE @ScoreCriteria8	[float]
	DECLARE @ScoreCriteria9	[float]
	DECLARE @ScoreCriteria10 [float]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]
	DECLARE @ScoreCriteriaUsedCount [int]

	SET @ScoreCriteria1	= 0.00
	SET @ScoreCriteria2	= 0.00
	SET @ScoreCriteria3	= 0.00
	SET @ScoreCriteria4 = 0.00
	SET @ScoreCriteria5	= 0.00
	SET @ScoreCriteria6	= 0.00
	SET @ScoreCriteria7	= 0.00
	SET @ScoreCriteria8	= 0.00
	SET @ScoreCriteria9	= 0.00
	SET @ScoreCriteria10 = 0.00

	SET @TotalAvgScore1 = -1
	SET @TotalAvgScore2 = -1
	SET @TotalAvgScore3 = -1
	SET @TotalAvgScore4 = -1
	SET @TotalAvgScore5  = 0
	SET @ScoreCriteriaUsedCount = 0


	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 [float], 
		ScoreCriteria2 [float],
		ScoreCriteria3 [float],
		ScoreCriteria4 [float],
		ScoreCriteria5 [float],
		ScoreCriteria6 [float],
		ScoreCriteria7 [float],
		ScoreCriteria8 [float],
		ScoreCriteria9 [float],
		ScoreCriteria10 [float], 
		NodeLevelID [varchar](100), 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int],
		TotalAvgScore numeric(10, 2),
		TotalAvgScore1  numeric(10, 2),
		TotalAvgScore2  numeric(10, 2),
		TotalAvgScore3  numeric(10, 2),
		TotalAvgScore4  numeric(10, 2),
		TotalAvgScore5  numeric(10, 2)
		, LeafNodeFlag bit
	  );
	  declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	  declare @Status as int = 0
--Process Level1 Cursor

	SELECT top 1 @Status = a.[Status],  @ProcessLevel1ID = a.[DecompositionProcessLevel1ID], @ProcessLevelTitle=[ProcessLevel1Title], @Owner=[Owner], @AvgScoreWeightage = ISNULL([Avg_Score_Weight],2.00) FROM DecompositionProcessLevel1 a
	INNER JOIN DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID  and a.ActiveFlag = 1
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;
	INSERT INTO #DecompositionProcessLevelDetails
	(
		ProcessLevel1ID, ProcessLevelTitle, Owner, Priority, ProcessLevel, LeafNodeFlag, TotalAvgScore1
	)
	VALUES
	(
		@ProcessLevel1ID, @ProcessLevelTitle, @Owner, @AvgScoreWeightage, 1, 0, -1
	)


	SELECT @ScoreCriteriaUsedCount = COUNT(1) FROM DecompositionScoreCriteriaProject WHERE DecompositionProjectID = @ProjectID  AND USEDFLAG=1;
	--select @ScoreCriteriaUsedCount as ScoreCriteriaUsedCount

	--Process Level2 Cursor

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT 
	a.[DecompositionProcessLevel1ID], 
	a.[DecompositionProcessLevel2ID], 
	a.[ProcessLevel2NodeID],
	a.[ProcessLevel2Title], 
	a.[Owner], 
	a.[CountrySpecific], 
	a.[LeafNodeFlag], 
	ISNULL(b.[AvgScoreWeightage],2.00), 
	ISNULL(b.ScoreCriteria1, 0.00), 
	ISNULL(b.ScoreCriteria2,0.00), 
	ISNULL(b.ScoreCriteria3,0.00), 
	ISNULL(b.ScoreCriteria4,0.00),
	ISNULL(b.ScoreCriteria5,0.00), 
	ISNULL(b.ScoreCriteria6,0.00), 
	ISNULL(b.ScoreCriteria7,0.00), 
	ISNULL(b.ScoreCriteria8,0.00), 
	ISNULL(b.ScoreCriteria9,0.00), 
	ISNULL(b.ScoreCriteria10,0.00),
	(case when a.[LeafNodeFlag] = 0 then CAST(-1 as numeric(10, 2)) else ((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) end) AS TotalAvgScore
	FROM DecompositionProcessLevel2 a 
    left outer JOIN DecompositionProcessLevel2Score b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID  and a.ActiveFlag = 1
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
	, @TotalAvgScore2

    WHILE @@FETCH_STATUS = 0
    BEGIN
			
		INSERT INTO #DecompositionProcessLevelDetails
		(
			TotalAvgScore2, ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific,
 Priority, ProcessLevel, LeafNodeFlag)
			VALUES
			(
				@TotalAvgScore2, @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2, ISNULL(@LeafNodeFlag, 0)
			);


			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)
			, (case when a.[LeafNodeFlag] = 0 then CAST(-1 as numeric(10, 2)) else ((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) end) AS TotalAvgScore
			FROM DecompositionProcessLevel3 a
			left outer JOIN DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			 and a.ActiveFlag = 1ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore3

			WHILE @@FETCH_STATUS = 0
			BEGIN

			INSERT INTO #DecompositionProcessLevelDetails
			(
				TotalAvgScore3, ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag)
				VALUES
				(@TotalAvgScore3, @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3, ISNULL(@LeafNodeFlag, 0));

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)  
			, (case when a.[LeafNodeFlag] = 0 then CAST(-1 as numeric(10, 2)) else ((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) end) AS TotalAvgScore
			FROM DecompositionProcessLevel4 a
			left outer JOIN DecompositionProcessLevel4Score b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			 and a.ActiveFlag = 1
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore4
			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
			INSERT INTO #DecompositionProcessLevelDetails
			(
				TotalAvgScore4, ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
				VALUES
				(@TotalAvgScore4, @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4, ISNULL(@LeafNodeFlag, 0), @ProcessLevelNodeID);
							
							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage,
							((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10],@ScoreCriteriaUsedCount))) AS TotalAvgScore
							from DecompositionProcessLevel5 a
							left outer join DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID AND a.[DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
							 and a.ActiveFlag = 1 --Added by Srini on 10-November-2019
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @TotalAvgScore5

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9
								, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, TotalAvgScore5, ProcessLevel, LeafNodeFlag, ProcessLevelNodeID)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, '', @TotalAvgScore5, 5, ISNULL(@LeafNodeFlag, 0), @ProcessLevelNodeID);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @TotalAvgScore5
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;



			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore4
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			, @TotalAvgScore3
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
    , @TotalAvgScore2
	END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;

   CREATE INDEX IX_ProcessLevelID ON #DecompositionProcessLevelDetails (ProcessLevel1ID, ProcessLevel2ID,ProcessLevel3ID,ProcessLevel4ID,ProcessLevel5ID);

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = ISNULL(TotalAvgScore4, 0) + ISNULL(TotalAvgScore5, 0.00) --+ 1
   where ISNULL(TotalAvgScore4, 0) = -1 or TotalAvgScore4 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = ISNULL(TotalAvgScore3, 0) + ISNULL(TotalAvgScore4, 0.00) --+ 1
   where ISNULL(TotalAvgScore3, 0) = -1 or TotalAvgScore3 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = ISNULL(TotalAvgScore2, 0) + ISNULL(TotalAvgScore3, 0.00) --+ 1
   where ISNULL(TotalAvgScore2, 0) = -1 or TotalAvgScore2 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = ISNULL(TotalAvgScore1, 0) + ISNULL(TotalAvgScore2, 0.00) --+ 1
   where ISNULL(TotalAvgScore1, 0) = -1 or TotalAvgScore1 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = 0
   where ISNULL(TotalAvgScore4, 0) = -1 or TotalAvgScore4 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = 0
   where ISNULL(TotalAvgScore3, 0) = -1 or TotalAvgScore3 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = 0
   where ISNULL(TotalAvgScore2, 0) = -1 or TotalAvgScore2 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = 0
   where ISNULL(TotalAvgScore1, 0) = -1 or TotalAvgScore1 IS NULL

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore4) / Count(TotalAvgScore4) score, ProcessLevel4Id from #DecompositionProcessLevelDetails where LeafNodeFlag = 1 group by ProcessLevel4Id) grp
   on grp.ProcessLevel4Id = main.ProcessLevel4Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore4) / Count(TotalAvgScore4) score, ProcessLevel3Id from #DecompositionProcessLevelDetails where ProcessLevel = 4 group by ProcessLevel3Id) grp
   on grp.ProcessLevel3Id = main.ProcessLevel3Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore3) / Count(TotalAvgScore3) score, ProcessLevel2Id from #DecompositionProcessLevelDetails where ProcessLevel = 3 group by ProcessLevel2Id) grp
   on grp.ProcessLevel2Id = main.ProcessLevel2Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = grp.score from #DecompositionProcessLevelDetails main join
   (select SUM(TotalAvgScore2) / Count(TotalAvgScore2) score, ProcessLevel1Id from #DecompositionProcessLevelDetails where ProcessLevel = 2 group by ProcessLevel1Id) grp
   on grp.ProcessLevel1Id = main.ProcessLevel1Id

   update #DecompositionProcessLevelDetails
   set TotalAvgScore1 = 4.6 where (TotalAvgScore1 > 5 or TotalAvgScore1 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore2 = 4.6 where (TotalAvgScore2 > 5 or TotalAvgScore2 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore3 = 4.6 where (TotalAvgScore3 > 5 or TotalAvgScore3 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore4 = 4.6 where (TotalAvgScore4 > 5 or TotalAvgScore4 < 0)

   update #DecompositionProcessLevelDetails
   set TotalAvgScore5 = 4.6 where (TotalAvgScore5 > 5 or TotalAvgScore5 < 0)
   
	select DISTINCT
	        ProjectName,
			PhaseName,
			FunctionName,
			--ProcessLevel1ID,
			a.ProcessLevel1Name,
			a.ProcessLevel1Title,
			--ProcessLevel2ID,
			a2.ProcessLevel2Name,
			a2.ProcessLevel2Title,
			--ProcessLevel3ID,
			a3.ProcessLevel3Name,
			a3.ProcessLevel3Title,
			--ProcessLevel4ID,
			a4.ProcessLevel4Name,
			a4.ProcessLevel4Title,
			--ProcessLevel5ID,
			a5.ProcessLevel5Name,
			a5.ProcessLevel5Title,
			ProcessLevelNodeID as ProcessLevelID, 
			ProcessLevelTitle, 
			ProjectName,
			PhaseName,
			FunctionName,
			ScoreCriteria1, 
			ScoreCriteria2,
			ScoreCriteria3,
			ScoreCriteria4,
			ScoreCriteria5,
			ScoreCriteria6,
			ScoreCriteria7,
			ScoreCriteria8,
			ScoreCriteria9,
			ScoreCriteria10, 
			NodeLevelID, 
			d.Owner, 
			d.CountrySpecific, 
			Priority, 
			TotalAvgScore,
			TotalAvgScore1,
			TotalAvgScore2,
			TotalAvgScore3,
			TotalAvgScore4,
			TotalAvgScore5,
			ProcessLevel,
			d.LeafNodeFlag,
			@Status [Status]
		FROM #DecompositionProcessLevelDetails d 
		inner join DecompositionProject r on r.DecompositionProjectID=@ProjectID
		inner join DecompositionFunctionProject f on f.DecompositionProjectID=r.DecompositionProjectID
		inner  join DecompositionProcessLevel1 a on a.DecompositionProjectID =@ProjectID
		
	    inner  join DecompositionPhaseProject p on p.DecompositionProjectID=a.DecompositionProjectID
		left outer join DecompositionProcessLevel2 a2 on ( a2.DecompositionProcessLevel2ID=d.ProcessLevel2ID  and a2.ActiveFlag=1)
		left outer join DecompositionProcessLevel3 a3 on (a3.DecompositionProcessLevel3ID=d.ProcessLevel3ID and a3.ActiveFlag=1)
		left outer join DecompositionProcessLevel4 a4 on (a4.DecompositionProcessLevel4ID=d.ProcessLevel4ID and a4.ActiveFlag=1)
		left outer join DecompositionProcessLevel5 a5 on  (a5.DecompositionProcessLevel5ID=d.ProcessLevel5ID and a5.ActiveFlag=1)
		   
		--WHERE
		-- a.DecompositionProcessLevel1ID = @ProcessLevel1ID 
		

	DROP TABLE if exists #DecompositionProcessLevelDetails;

    COMMIT TRANSACTION;
	RETURN 0;
    END TRY
    BEGIN CATCH
	select Error_Message()
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE uspLogError;
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionUserAccess]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Amplo].[uspGetDecompositionUserAccess]
@ProjectId as int
, @UserId as int
as
begin
	select [UserAccessName]
           ,[UserAccessDescription]
           ,[ClientID]
           ,[UserID]
           ,[DecompositionProjectID]
           ,[FunctionID]
           ,[PhaseID]
		   from amplo.[DecompositionUserAccess]
		   where [UserID] = @UserId and [DecompositionProjectID] = @ProjectId and [ActiveFlag] = 1
end
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionUserProjects]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--alter table [Amplo].[DecompositionProject]
--add TemplateId int
--go

--alter table Test102211.[DecompositionProject]
--add TemplateId int
--go

--update Test102211.[DecompositionProject] set TemplateId = 1
--go

CREATE PROCEDURE [Amplo].[uspGetDecompositionUserProjects]
 (
    @UserID [int]
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   select Distinct proj.DecompositionProjectID, proj.ProjectName, stat.StatusID, stat.StatusName, ISNULL(TemplateId, 0) as SelectedTemplate
   from (select DecompositionProjectID from Amplo.DecompositionProjectUser where UserID = @UserID and ActiveFlag = 1) projUser ---get projects of user
   inner join (select DecompositionProjectID,ProjectName, StatusID, TemplateId from Amplo.DecompositionProject where (DisableDate > GETDATE() OR DisableDate is null) and ActiveFlag = 1) proj -- get project details. Check for disable based on date. Not returning disabled projects by disable date
   ON proj.DecompositionProjectID = projUser.DecompositionProjectID
   inner join Amplo.DecompositionStatus stat on stat.StatusID = proj.[StatusID]


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
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseAccountDetails]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ===============================================================================================================
-- Author:		Srinivas
-- Create date: 24-December-2019
-- Description:	This is to retrieve Enterprise Account Details
-- ===============================================================================================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseAccountDetails]
	-- Add the parameters for the stored procedure here
	@ClientID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

--	DECLARE @ClientID int
--	select @ClientID = ClientID FROM [Amplo].[User] where UserID = @UseriD;

	SELECT
		[ClientName],
		[CountryRegionCodeID],
		[IndustryID],
		[IndustryVerticalID],
		[IndustrySubVerticalID],
		[NoOfEmployees],
		[Address1],
		[Address2],
		[CompanyLogo],
		[Country],
		[StateTerritory],
		[City],
		[PostalCode],
		[FirstName],
		[LastName],
		[EmailAddress],
		subs.SubscriptionKey,
		subs.StartDate,
		subs.EndDate,
		[AuditFrequency],
		[FirstAuditDate],
		[RecentAuditDate]
  FROM [Amplo].[AmploCompanyProfile] clnt
--  INNER JOIN [Amplo].[User] usr
--  ON clnt.ClientID = usr.ClientID
  INNER JOIN [Amplo].[Subscription] subs
  ON clnt.SubscriptionID = subs.SubscriptionID
  INNER JOIN [Amplo].[ClientAudit] clntadt
  on clnt.ClientID = clntadt.ClientID
  WHERE clnt.ClientID = @ClientID
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseAccounts]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspGetEnterpriseAccounts]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT	clnt.[ClientID]
			,clnt.[ClientName] 
			,'' [SubscriptionKey]
			,ISNULL([ClientCreatedDate], GETDATE()) [ClientCreatedDate]
			,ISNULL([ClientStatus], 0) ClientStatus
			,(select top 1 [FirstName] from [Amplo].[User] where ClientId = clnt.ClientId and ActiveFlag = 1 order by UserId asc) [FirstName]
			,(select top 1 [MiddleName] from [Amplo].[User] where ClientId = clnt.ClientId and ActiveFlag = 1 order by UserId asc) [MiddleName]
			,(select top 1 [LastName] from [Amplo].[User] where ClientId = clnt.ClientId and ActiveFlag = 1 order by UserId asc) [LastName]
			,clnt.[EmailAddress]
  FROM [Amplo].[Client] clnt
  --INNER JOIN (select top 1 * from [Amplo].[User] where ClientId = clnt.ClientId) usr
  --ON clnt.ClientID = usr.ClientID
  --WHERE CLNT.ACTIVEFLAG=1
  ORDER BY clnt.ClientCreatedDate desc;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseDIVATeam]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	This procedure retrieves Enterprise DIVA users
-- =====================================================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseDIVATeam]
	-- Add the parameters for the stored procedure here
	@UserID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	DECLARE @ClientID int
	select @ClientID = ClientID FROM [Amplo].[User] where UserID = @UseriD;

	SELECT [UserDIVATeamID]
		,[FirstName]
		,[LastName]
		,[Email]
		,[DisableDate]
		,c.[UserTypeName]
	FROM [Amplo].[UserDIVATeam] a
	inner join Amplo.StatusLookup b on a.UserStatusID = b.StatusLookupID
	inner join Amplo.UserType c on a.UserTypeID = c.UserTypeID
	where a.ClientID = @ClientID and a.SuperUserID = @UserID
	order by a.CreatedDate desc, a.ModifiedDate desc;



END

GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseUserPasswordQuestionResponses]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 23-October-2019
-- Description:	This procedure retrieves Password Security Questions and Answer details for an Enterprise User
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseUserPasswordQuestionResponses]
	-- Add the parameters for the stored procedure here
	@UserID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT a.[PasswordQuestionID] 
      ,a.[PasswordQuestion]
	  ,c.PasswordAnswer
  FROM [Amplo].[PasswordQuestion] a 
  left join (select a.PasswordQuestionID, a.PasswordAnswer from Amplo.Password a
  where a.ModifiedOn = (select max(ModifiedOn) from Amplo.Password c where a.PasswordQuestionID = c.PasswordQuestionID)
  ) c
  on a.[PasswordQuestionID] = c.[PasswordQuestionID]
  where a.ActiveFlag = 1;


END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseUserPasswordResponses]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 23-October-2019
-- Description:	This procedure retrieves Password Security Questions and Answer details for an Enterprise User
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseUserPasswordResponses]
	-- Add the parameters for the stored procedure here
	@UserID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT a.[PasswordQuestionID] 
      ,a.[PasswordQuestion]
	  ,c.PasswordAnswer
  FROM [Amplo].[PasswordQuestion] a 
  left join (select a.PasswordQuestionID, a.PasswordAnswer from Amplo.Password a
  where a.ModifiedOn = (select max(ModifiedOn) from Amplo.Password c where a.PasswordQuestionID = c.PasswordQuestionID)
  ) c
  on a.[PasswordQuestionID] = c.[PasswordQuestionID]
  where a.ActiveFlag = 1;


END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseUserProfileDetails]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 22-October-2019
-- Description:	This procedure retrieves User Profile details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseUserProfileDetails]
	-- Add the parameters for the stored procedure here
	@UserID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   -- Insert statements for procedure here
	SELECT a.[UserID]
		  ,a.[FirstName]
		  ,a.[MiddleName]
		  ,a.[LastName]
		  ,b.[ClientBusinessUnit]
		  ,b.[ClientParentCompany]
		  ,a.[PhoneNumber]
		  ,a.[EmailAddress]
		  ,a.[UserLinkedINProfileID]
		  ,a.[DisableDate]
		  ,a.[UserCreatedDate]
		  ,a.[ProfilePhotoPath]
		  ,c.[UserTypeName]
	FROM [Amplo].[User] a 
	INNER JOIN [Amplo].[Client] b
		on a.ClientiD = b.ClientID
	INNER JOIN [Amplo].[UserType] c
	on a.UserTypeID = c.UserTypeID
	where UserID=@UserID
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEnterpriseUserTypes]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =======================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	This procedure retireves Enterprise User Types
-- =======================================================================
CREATE PROCEDURE [Amplo].[uspGetEnterpriseUserTypes]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [UserTypeID]
		  ,[UserTypeName]
		  , UserTypeIsEnabled
	  FROM [Amplo].[UserType]
	  where [UserTypeIsEnabled] = 'Yes' and [UserCategoryID] = 1

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEntperpriseDIVATeam]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	This procedure retrieves Enterprise DIVA users
-- =====================================================================
CREATE PROCEDURE [Amplo].[uspGetEntperpriseDIVATeam]
	-- Add the parameters for the stored procedure here
	@UserID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	DECLARE @ClientID int
	select @ClientID = ClientID FROM [Amplo].[User] where UserID = @UseriD;

	SELECT [UserDIVATeamID]
		,[FirstName]
		,[LastName]
		,[Email]
		,[DisableDate]
		,c.[UserTypeName]
	FROM [Amplo].[UserDIVATeam] a
	inner join Amplo.StatusLookup b on a.UserStatusID = b.StatusLookupID
	inner join Amplo.UserType c on a.UserTypeID = c.UserTypeID
	where a.ClientID = @ClientID and a.SuperUserID = @UserID order by a.CreatedDate desc, a.ModifiedDate desc;



END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetEntperpriseDIVAUserDetails]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================================
-- Author:		Srinivas
-- Create date: 11-Oct-2019
-- Description:	This procedure retrieves Selected Enterprise DIVA user details
-- =====================================================================
CREATE PROCEDURE [Amplo].[uspGetEntperpriseDIVAUserDetails]
	-- Add the parameters for the stored procedure here
--	@UserID [int],
	@DIVAUserID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	SELECT [UserDIVATeamID]
		,[FirstName]
		,[LastName]
		,[Email]
		,[DisableDate]
		,a.UserTypeID
		,c.[UserTypeName]
		,a.UserStatusID
		,b.LookupTitle
	FROM [Amplo].[UserDIVATeam] a
	inner join Amplo.StatusLookup b on a.UserStatusID = b.StatusLookupID
	inner join Amplo.UserType c on a.UserTypeID = c.UserTypeID
	where a.UserDIVATeamID = @DIVAUserID;



END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetGettingStartedVideos]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetGettingStartedVideos]
	-- Add the parameters for the stored procedure here
@ClientID int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [GettingStartedVideosID]
      ,[ClientID]
      ,[GettingStartedVideosName]
      ,[GettingStartedVideosDescription]
      ,[GettingStartedVideosDate]
      ,[GettingStartedVideosURLPath]
      ,[GettingStartedVideossource]
      ,[GettingStartedVideosCategory]
      ,[GettingStartedVideosDigitalAsset]
  FROM [Amplo].[GettingStartedVideos]
--  where [ClientID] = @ClientID
  Order by [GettingStartedVideosDate] desc;

END

GO
/****** Object:  StoredProcedure [Amplo].[uspGetIndustry]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 18-Sep-2019
-- Description:	This procedure retrieves Industry Details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetIndustry] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
    SELECT IndustryID, IndustryName, IndustryDescription from Amplo.Industry order by IndustryName desc;

END


GO
/****** Object:  StoredProcedure [Amplo].[uspGetIndustrySubVerticals]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 18-Sep-2019
-- Description:	This procedure retrieves Industry Vertical Details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetIndustrySubVerticals] 
	-- Add the parameters for the stored procedure here
    @IndustryVerticalID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


    -- Insert statements for procedure here

    SELECT IndustrySubVerticalID, IndustrySubVerticalName, IndustryVerticalDescription from Amplo.AmploIndustrySubvertical 
    where IndustryVerticalID=@IndustryVerticalID and  ActiveFlag = 1 order by IndustrySubVerticalName desc;

END



GO
/****** Object:  StoredProcedure [Amplo].[uspGetIndustryVerticalName]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 18-Sep-2019
-- Description:	This procedure retrieves Industry Vertical Details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetIndustryVerticalName] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


    -- Insert statements for procedure here
    SELECT IndustryVerticalID, IndustryVerticalName, IndustryVerticalDescription from Amplo.AmploIndustryVertical 
    where ActiveFlag = 1 order by IndustryVerticalName desc;

END



GO
/****** Object:  StoredProcedure [Amplo].[uspGetIndustryVerticals]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 18-Sep-2019
-- Description:	This procedure retrieves Industry Vertical Details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetIndustryVerticals] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;


    -- Insert statements for procedure here
    SELECT IndustryVerticalID, IndustryVerticalName, IndustryVerticalDescription from Amplo.AmploIndustryVertical 
    where ActiveFlag = 1 order by IndustryVerticalName desc;

END



GO
/****** Object:  StoredProcedure [Amplo].[uspGetIndustryVerticalSubvertical]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetIndustryVerticalSubvertical]
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
    BEGIN TRANSACTION;
    
    -- Use query to list out all industry types
        
        
        SELECT v.IndustryVerticalID, v.IndustryVerticalName, sv.IndustrySubVerticalID, sv.IndustrySubVerticalName
        FROM (select * from Amplo.AmploIndustryVertical where ActiveFlag = 1) v
        left Join (select * from Amplo.AmploIndustrySubVertical where ActiveFlag = 1) sv
        ON v.IndustryVerticalID = sv.IndustryVerticalID
        order by v.IndustryVerticalID

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
/****** Object:  StoredProcedure [Amplo].[uspGetIsUserExists]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		uspGetIsUserExists
-- Create date: 21-October-2019
-- Description:	This procedure verified whether the user exists or not
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetIsUserExists]
	-- Add the parameters for the stored procedure here
	@PEmailAddress [nvarchar](256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	BEGIN TRY
    DECLARE @countRowUser int
	DECLARE @RetVal int
	SELECT @countRowUser = Count(*) FROM [Amplo].[User]  WHERE UPPER(TRIM(EmailAddress)) = UPPER(TRIM(@PEmailAddress));
	    
	IF (@countRowUser>0)
        BEGIN
            SELECT @RetVal=1 
		END
	else
		BEGIN
			SELECT @RetVal=0 
		END
	SELECT  @RetVal AS 'iSUserExists'
    END TRY


    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPIControlLeverCapabilityDetailsExpanded]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================
-- Author:		Biswajit
-- Create date: 21-Otober-2019
-- Description:	This procedure retrieves KPI Control Lever details along with Inhibitors and Capabilities 
-- ====================================================================
CREATE PROCEDURE [Amplo].[uspGetKPIControlLeverCapabilityDetailsExpanded]
	-- Add the parameters for the stored procedure here
	@KPIControlLeverID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	SELECT a.[KPIControlLeversID] AS 'ControlLeverID' 
		,[KPIID] AS 'KPIID'
		,[ControlLeversTitle] AS 'ControlLeversTitle'
		,[PersonaImpacted] AS 'PersonaImpacted'
		,c.[CapabilitiesTitle] AS 'Capabilities'
		, c.KPICapabilitiesId as 'KPICapabilitiesId'
	FROM [Amplo].[KPIControlLevers] a
	--INNER JOIN (SELECT * FROM [Amplo].[KPIInhibitors] WHERE ActiveFlag=1) b on a.KPIControlLeversID = b.KPIControlLeversID
	INNER JOIN (SELECT * FROM [Amplo].[KPICapabilities] WHERE ActiveFlag=1) c on a.KPIControlLeversID = c.KPIControlLeversID
	WHERE a.KPIControlLeversID = @KPIControlLeverID AND a.[ActiveFlag] = 1
	ORDER BY a.CREATEDDATE ASC
--	FOR JSON AUTO;
END

GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPIControlLeverDetails]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetKPIControlLeverDetails]
	-- Add the parameters for the stored procedure here
	@KPIID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

--	Declare @clientid as INT
--    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here

	SELECT [KPIControlLeversID] AS 'ControlLeverID' 
		,[KPIID] AS 'KPIID'
		,[ControlLeversTitle] AS 'ControlLeversTitle'
		,[PersonaImpacted] AS 'PersonaImpacted'
--KPI Sets Implementation
		,[ExpectedTargetGrowth]
		,[UnitOfMeasurement]
		,[TargetDate]
		,[Improvementbasis]
		,[AuditFrequency]
		,(SELECT COUNT(1) FROM Amplo.KPIInhibitors b where b.[KPIControlLeversID] = a.[KPIControlLeversID] and b.ActiveFlag=1) AS 'KPIInhibitorsCount'
		,(SELECT COUNT(1) FROM [Amplo].[KPICapabilities] b where b.[KPIControlLeversID] = a.[KPIControlLeversID] and b.ActiveFlag=1) AS 'KPICapabilities'
		, ISNULL([ExpectedTargetGrowth], '') expect_target_growth
		, ISNULL([UnitOfMeasurement], '') measurement_unit
		, ISNULL([TargetDate], GETDATE()) target_date
		, ISNULL([Improvementbasis], '') improvement_basis
		, ISNULL(EstimatedSavings, '') estimated_savings
		, ISNULL([AuditFrequency], '') audit_frequency
	FROM [Amplo].[KPIControlLevers] a
	WHERE KPIID = @KPIID AND [ActiveFlag] = 1
	ORDER BY a.CREATEDDATE ASC
--	FOR JSON AUTO;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPIControlLeverDetailsExpanded]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================
-- Author:		Srinivas
-- Create date: 17-Otober-2019
-- Description:	This procedure retrieves KPI Control Lever details along with Inhibitors and Capabilities 
-- Modified by Biswajit on 22nd Oct, 2019
-- ====================================================================
CREATE PROCEDURE [Amplo].[uspGetKPIControlLeverDetailsExpanded]
	-- Add the parameters for the stored procedure here
	@KPIControlLeverID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

--	Declare @clientid as INT
--    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here

	SELECT a.[KPIControlLeversID] AS 'ControlLeverID' 
		,[KPIID] AS 'KPIID'
		,[ControlLeversTitle] AS 'ControlLeversTitle'
		,[PersonaImpacted] AS 'PersonaImpacted'
		,b.[InhibitorsTitle] AS 'Inhibitors'
		--,c.[CapabilitiesTitle] AS 'Capabilities'
		, b.[KPIInhibitorsId] As 'KPIInhibitorsId'
		--, c.KPICapabilitiesId as 'KPICapabilitiesId'
	FROM [Amplo].[KPIControlLevers] a
	INNER JOIN (SELECT * FROM [Amplo].[KPIInhibitors] WHERE ActiveFlag=1) b on a.KPIControlLeversID = b.KPIControlLeversID
	--INNER JOIN (SELECT * FROM [Amplo].[KPICapabilities] WHERE ActiveFlag=1) c on a.KPIControlLeversID = c.KPIControlLeversID
	WHERE a.KPIControlLeversID = @KPIControlLeverID AND a.[ActiveFlag] = 1
	ORDER BY a.CREATEDDATE ASC
--	FOR JSON AUTO;
END

GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPIDetails]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 15-Otober-2019
-- Description:	This procedure retrieves KPI details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetKPIDetails]
	-- Add the parameters for the stored procedure here
	@USERID [int],
	@KPIID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

    -- Insert statements for procedure here
	if @KPIID = 0

		SELECT [KPIID]
		,[KPIName] 
		,[KPITitle]
		,[BusinessOutcome]
		,[BusinessMetrics]
		,[PersonaImpacted]
		,[EstimatedSavings]
--KPI Sets Implementation
		,[ExpectedTargetGrowth]
		,[UnitOfMeasurement]
		,[TargetDate]
		,[Improvementbasis]
		,[AuditFrequency]
		,(select count(*) from Amplo.KPIControlLevers b where a.KPIID = b.KPIID and b.ActiveFlag=1) AS ControlLevelCount
		, ISNULL([ExpectedTargetGrowth], '') expect_target_growth
		, ISNULL([UnitOfMeasurement], '') measurement_unit
		, ISNULL([TargetDate], GETDATE()) target_date
		, ISNULL([Improvementbasis], '') improvement_basis
		, ISNULL([AuditFrequency], '') audit_frequency
		 FROM Amplo.KPI a
		WHERE ClientID = @clientid AND [ActiveFlag] = 1

	else

		SELECT [KPIID]
		,[KPIName] 
		,[KPITitle]
		,[BusinessOutcome]
		,[BusinessMetrics]
		,[PersonaImpacted]
		,[EstimatedSavings]
		,[ExpectedTargetGrowth]
		,[UnitOfMeasurement]
		,[TargetDate]
		,[Improvementbasis]
		,[AuditFrequency]
		,(select count(*) from Amplo.KPIControlLevers b where a.KPIID = b.KPIID and b.ActiveFlag=1) AS ControlLevelCount
		, ISNULL([ExpectedTargetGrowth], '') expect_target_growth
		, ISNULL([UnitOfMeasurement], '') measurement_unit
		, ISNULL([TargetDate], GETDATE()) target_date
		, ISNULL([Improvementbasis], '') improvement_basis
		, ISNULL([AuditFrequency], '') audit_frequency
		 FROM Amplo.KPI a
		WHERE KPIID = @KPIID AND ClientID = @clientid AND [ActiveFlag] = 1


--	FOR JSON AUTO;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetKPISet]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		uspGetKPISet
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetKPISet]
	-- Add the parameters for the stored procedure here
	@UserID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    Declare @clientid as INT
    Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

    -- Insert statements for procedure here
SELECT [ClientID]
      ,[KPISetID]
      ,[KPISetName]
      ,[KPISetTitle]
      ,[BSCCategory]
      ,[Status]
      ,[GlobalFlag]
      ,[KPIDimensionID]
  FROM [Amplo].[KPISet]
  where [ClientID] = @ClientID and [ActiveFlag]=1;
  
  END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetL1Processes]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetL1Processes]
	@DecompositionProjectId int
	, @Order nvarchar(20)
AS
BEGIN
	BEGIN TRY
		if(@Order = 'desc')
		begin
			select top 5 l1.[DecompositionProcessLevel1ID], [ProcessLevel1Name], [ProcessLevel1Title], [ProcessLevel1Description], ISNULL([Avg_Score_Weight], 0.00) Score, 0
			from [Amplo].[DecompositionProcessLevel1] l1
			left outer join [Amplo].[DecompositionProcessLevel1Score] score on score.[DecompositionProcessLevel1ID] = l1.[DecompositionProcessLevel1ID]
			where l1.[DecompositionProjectID] = @DecompositionProjectId
			order by ISNULL([Avg_Score_Weight], 0.00) desc
		end
		else
		begin
			select top 5 l1.[DecompositionProcessLevel1ID], [ProcessLevel1Name], [ProcessLevel1Title], [ProcessLevel1Description], ISNULL([Avg_Score_Weight], 0.00) Score, 0
			from [Amplo].[DecompositionProcessLevel1] l1
			left outer join [Amplo].[DecompositionProcessLevel1Score] score on score.[DecompositionProcessLevel1ID] = l1.[DecompositionProcessLevel1ID]
			where l1.[DecompositionProjectID] = @DecompositionProjectId
			order by ISNULL([Avg_Score_Weight], 0.00) asc
		end
    END TRY
    BEGIN CATCH
        EXECUTE [AMPLO].[uspLogError];
    END CATCH
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetL1ProcessSummary]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetL1ProcessSummary]
	@DecompositionProjectId int
AS
BEGIN
	SET NOCOUNT ON 
	declare @TempTable table
		(
			FunctionID int NOT NULL
			, FunctionName nvarchar(500)
			, PhaseID int NOT NULL
			, PhaseName nvarchar(500)
			, AverageScore numeric(10, 2) NOT NULL
			, Percentage  numeric(10, 2) NOT NULL
		)
		BEGIN TRY
        

		insert into @TempTable
		select [FunctionID], [FunctionName], [PhaseID], [PhaseName], AVG(ISNULL([Avg_Score_Weight], 0.00)), 0
		from [Amplo].[DecompositionProcessLevel1] l1
		left outer join [Amplo].[DecompositionProcessLevel1Score] score on score.[DecompositionProcessLevel1ID] = l1.[DecompositionProcessLevel1ID]
		join [Amplo].[DecompositionPhase] phase on phase.[DecompositionPhaseID] = l1.[PhaseID]
		join [Amplo].[DecompositionFunction] func on func.[DecompositionFunctionID] = l1.[FunctionID]
		where l1.[DecompositionProjectID] = @DecompositionProjectId
		group by [FunctionID], [PhaseID], [FunctionName], [PhaseName]

		declare @TotalScore numeric(10, 2) = (select SUM(AverageScore) from @TempTable)
		if(@TotalScore != 0)
		begin
			update @TempTable set Percentage = AverageScore * 100 / @TotalScore
		end

		
    END TRY
    BEGIN CATCH
		--select Error_Message()
        --EXECUTE [AMPLO].[uspLogError];
    END CATCH

	select FunctionID, FunctionName, PhaseID, PhaseName, AverageScore, Percentage from @TempTable
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetL1ProcessSummaryForPhaseAndFunctionWise]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetL1ProcessSummaryForPhaseAndFunctionWise]
	@DecompositionProjectId int
AS
BEGIN
	SET NOCOUNT ON 
	create table #TempTable
		(
			Id int Identity(1, 1) primary key
			, FunctionID int NOT NULL
			, FunctionName nvarchar(500)
			, PhaseID int NOT NULL
			, PhaseName nvarchar(500)
			, AverageScore numeric(10, 2) NOT NULL
			, Percentage  numeric(10, 2) NOT NULL
		)

		insert into #TempTable
		select ISNULL([FunctionID], 0) FunctionId, ISNULL([FunctionName], '') FunctionName
		, ISNULL([PhaseID], 0) PhaseId, ISNULL([PhaseName], '') PhaseName, ISNULL(AVG(ISNULL([Avg_Score_Weight], 0.00)), 0) AvgScore
		, Cast(0 as numeric(10, 2)) Percentage
		from [Amplo].[DecompositionProcessLevel1] l1
		left outer join [Amplo].[DecompositionProcessLevel1Score] score on score.[DecompositionProcessLevel1ID] = l1.[DecompositionProcessLevel1ID]
		join [Amplo].[DecompositionPhase] phase on phase.[DecompositionPhaseID] = l1.[PhaseID]
		join [Amplo].[DecompositionFunction] func on func.[DecompositionFunctionID] = l1.[FunctionID]
		where l1.[DecompositionProjectID] = @DecompositionProjectId
		group by [FunctionID], [PhaseID], [FunctionName], [PhaseName]

		--declare @TotalScore numeric(10, 2) = (select SUM(AverageScore) from @TempTable)
		--if(@TotalScore != 0)
		--begin
		--	update @TempTable set Percentage = AverageScore * 100 / @TotalScore
		--end

	select FunctionID, FunctionName, PhaseID, PhaseName, AverageScore, Percentage from #TempTable
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetPasswordQuestion]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetPasswordQuestion]
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all industry types
SELECT [PasswordQuestionID] AS 'QuestionID'
      ,[PasswordQuestion] AS 'QuestionTitle'
  FROM [Amplo].[PasswordQuestion]
  where ActiveFlag = 1;
  
  END;

GO
/****** Object:  StoredProcedure [Amplo].[uspGetRegion]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 26-09-2019
-- Description:	This procedure retrieves Region details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetRegion]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [RegionID]
      ,[RegionName]
FROM [Amplo].[Region]


END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetReports]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 22-October-2019
-- Description:	This procedure retrieves report details
-- =============================================
CREATE PROCEDURE [Amplo].[uspGetReports]
	-- Add the parameters for the stored procedure here
	@UserID int,
	@ServiceID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
SELECT [ReportID]
      ,[ClientID]
      ,[UserID]
      ,[ServiceID]
      ,[ReportTitle]
      ,[ReportDescrption]
      ,[ReportPath]
      ,[ProjectID]
      ,[ActiveFlag]
      ,[CreatedDate]
      ,[CreatedBy]
      ,[ModifiedDate]
      ,[ModifiedBy]
  FROM [Amplo].[Report]
  WHERE [UserID] = @UserID AND [ServiceID] = @ServiceID
  and ReportId in 
  (select ReportId from amplo.[UserReportAccess] where UserId = @UserID and ServiceId = @ServiceID and ActiveFlag = 1)
  order by [CreatedDate] desc

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetReportsAccess]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetReportsAccess]
	@UserID int
AS
BEGIN
	SET NOCOUNT ON;

	Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;
	SELECT [ReportID]
      ,[ClientID]
      ,[UserID]
      ,rep.[ServiceID]
	  ,[ServicesName]
      ,[ReportTitle]
      ,[ReportDescrption]
      ,[ReportPath]
      ,[ProjectID]
	  , cast((case when (select ISNULL(AccessType, 0) from amplo.[UserReportAccess] uac 
		where uac.UserId = @UserID and ActiveFlag = 1 and uac.ServiceId = rep.[ServiceID] and uac.[ReportID] = rep.[ReportID]) = 0 then 0 else 1 end) as bit) IsSelected
  FROM [Amplo].[Report] rep
  INNER JOIN [Amplo].[Services] svc ON rep.ServiceID = svc.[ServicesID]
  WHERE  ClientID = @clientid AND rep.ActiveFlag=1
  --AND [ServiceID] =@ServiceID
  ORDER BY rep.[CreatedDate] desc

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetRestrictedEmailDomain]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspGetRestrictedEmailDomain]
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all industry types
    SELECT [EmailDomainName] 
    FROM [Amplo].[RestrictedEmailDomain]
    where [ActiveFlag] = 1;
  END;


GO
/****** Object:  StoredProcedure [Amplo].[uspGetSelectedFunctions]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspGetSelectedFunctions] --1
@TemplateId as int
as
begin
	select distinct f.DecompositionFunctionId, f.FunctionTilte FunctionTitle, cast(ISNULL(sf.FunctionId, 0) as bit) IsSelected
	from amplo.decompositionfunction f
	left outer join amplo.CMTempFrameStructure sf on (f.DecompositionFunctionId = sf.FunctionId and sf.ActiveFlag = 1)
	and sf.TemplateId = @TemplateId
end
GO
/****** Object:  StoredProcedure [Amplo].[uspGetSelectedPhases]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Amplo].[uspGetSelectedPhases] 
@TemplateId as int
as
begin
	select distinct f.DecompositionPhaseId, f.PhaseTitle, cast(ISNULL(sf.PhaseId, 0) as bit) IsSelected
	from amplo.decompositionPhase f
	left outer join amplo.CMTempFrameStructure sf on (f.DecompositionPhaseId = sf.PhaseId and sf.ActiveFlag = 1)
	where sf.TemplateId = @TemplateId
end
GO
/****** Object:  StoredProcedure [Amplo].[uspGetServices]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetServices]
	@ServiceID int
	, @UserID int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT [ServicesID]
		  ,[ServicesName]
	FROM [Amplo].[Services]
	WHERE ServicesID = @ServiceID AND ActiveFlag = 1 and ServicesID in
	(select ServiceId from amplo.[UserReportAccess] where UserId = @UserID and ActiveFlag = 1 and AccessType = 1)
END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetSpiralReportForDecomposingModel]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspGetSpiralReportForDecomposingModel]
	@DecompositionProjectId int
	, @LevelName as nvarchar(2)
as
begin
	SET NOCOUNT ON 
		declare @TempTable table
		(
			ProcessStatus nvarchar(100)
			, NoOfRows int NOT NULL
			, Percentage  numeric(10, 2) NOT NULL
		)
		BEGIN TRY
		
		DECLARE @ExcelentCutOff as numeric(10, 2) = 4, @GoodCutOff as numeric(10, 2) = 3, @AverageCutOff as numeric(10, 2) = 2
		, @SatisfactoryCutOff as numeric(10, 2) = 1
		declare @TotalRows int = 0

		if(@LevelName = 'l1')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] >= @GoodCutOff and pls.[Level1_Calc_Aggr_Score] < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] >= @AverageCutOff and pls.[Level1_Calc_Aggr_Score] < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] >= @SatisfactoryCutOff and pls.[Level1_Calc_Aggr_Score] < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel1] pl
			join [Amplo].[DecompositionProcessLevel1Score] pls on pl.[DecompositionProcessLevel1ID] = pls.[DecompositionProcessLevel1ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.[Level1_Calc_Aggr_Score] < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end

		else if(@LevelName = 'l2')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore >= @GoodCutOff and pls.LVL2CalcAggrScore < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore >= @AverageCutOff and pls.LVL2CalcAggrScore < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore >= @SatisfactoryCutOff and pls.LVL2CalcAggrScore < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel2] pl
			join [Amplo].[DecompositionProcessLevel2Score] pls on pl.[DecompositionProcessLevel2ID] = pls.[DecompositionProcessLevel2ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.LVL2CalcAggrScore < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end

		else if(@LevelName = 'l3')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore >= @GoodCutOff and pls.Level3CalcAggrScore < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore >= @AverageCutOff and pls.Level3CalcAggrScore < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore >= @SatisfactoryCutOff and pls.Level3CalcAggrScore < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel3] pl
			join [Amplo].[DecompositionProcessLevel3Score] pls on pl.[DecompositionProcessLevel3ID] = pls.[DecompositionProcessLevel3ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level3CalcAggrScore < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end

		else if(@LevelName = 'l4')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore >= @GoodCutOff and pls.Level4CalcAggrScore < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore >= @AverageCutOff and pls.Level4CalcAggrScore < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore >= @SatisfactoryCutOff and pls.Level4CalcAggrScore < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel4] pl
			join [Amplo].[DecompositionProcessLevel4Score] pls on pl.[DecompositionProcessLevel4ID] = pls.[DecompositionProcessLevel4ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level4CalcAggrScore < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end

		else if(@LevelName = 'l5')
		begin
			insert into @TempTable
			select 'Excellent', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore >= @ExcelentCutOff

			insert into @TempTable
			select 'Good', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore >= @GoodCutOff and pls.Level5CalcAggrScore < @ExcelentCutOff

			insert into @TempTable
			select 'Average', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore >= @AverageCutOff and pls.Level5CalcAggrScore < @GoodCutOff

			insert into @TempTable
			select 'Satisfactory', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore >= @SatisfactoryCutOff and pls.Level5CalcAggrScore < @AverageCutOff

			insert into @TempTable
			select 'Poor', COUNT(1), 0
			from [Amplo].[DecompositionProcessLevel5] pl
			join [Amplo].[DecompositionProcessLevel5Score] pls on pl.[DecompositionProcessLevel5ID] = pls.[DecompositionProcessLevel5ID]
			where pl.[DecompositionProjectID] = @DecompositionProjectId and pl.[ActiveFlag] = 1
			and pls.Level5CalcAggrScore < @SatisfactoryCutOff

			set @TotalRows = (select SUM(NoOfRows) from @TempTable)
			update @TempTable set Percentage = Cast(Cast(NoOfRows as numeric(10, 2)) * 100 / Cast(@TotalRows as numeric(10, 2)) as numeric(10, 2))
		end
    END TRY
    BEGIN CATCH
		--select Error_Message()
        EXECUTE [AMPLO].[uspLogError];
    END CATCH

	select ProcessStatus, NoOfRows, Percentage from @TempTable
end


GO
/****** Object:  StoredProcedure [Amplo].[uspGetState]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetState]
@CountryRegionCode nvarchar(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Use query to list out all states

	SELECT [StateProvinceID],
	[StateProvinceCode],
	[CountryRegionCode],
	[Name]
	FROM
	[Amplo].[StateProvince]
	where CountryRegionCode = @CountryRegionCode

END;


GO
/****** Object:  StoredProcedure [Amplo].[uspGetUOM]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =======================================================================================================
-- Author:		Srinivas
-- Create date: 08-Jan-2020
-- Description:	This procedure retrieves UOM details
-- =======================================================================================================
CREATE PROCEDURE [Amplo].[uspGetUOM]
	-- Add the parameters for the stored procedure here
@UOMClassID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [UOMID]
      ,[UOMTitle]
  FROM [Amplo].[UOM]
  where [UOMClassID] = @UOMClassID and ActiveFlag=1;


END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserAccessTypes]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =========================================================================================================================================
-- Author:		Srinivas
-- Create date: <Create Date,,>
-- Description:	This Procedure retrieves Amplo user types
-- =========================================================================================================================================
CREATE PROCEDURE [Amplo].[uspGetUserAccessTypes]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT [UserTypeID]
		  ,[UserTypeName]
	  FROM [Amplo].[UserType]
	  where [UserTypeIsEnabled] = 'Yes' and [UserCategoryID] = 2

END
GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserBMProjects]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetUserBMProjects]
 (
    @id [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   select Distinct (proj.BenchmarkProjectID), proj.BenchmarkProjectName, stat.StatusID, stat.StatusName, proj.CreatedDate
   from (select BenchmarkProjectID from Amplo.BenchmarkProjectUser where UserID = @id and ActiveFlag = 1) projUser ---get projects of user
   inner join (select BenchmarkProjectID,BenchmarkProjectName, [status], CreatedDate from Amplo.BenchmarkProject where (DisableDate > GETDATE() OR DisableDate is null)) proj -- get project details. Check for disable based on date. Not returning disabled projects by disable date
   ON proj.BenchmarkProjectID = projUser.BenchmarkProjectID
   inner join Amplo.BenchmarkStatus stat on stat.StatusID = proj.[status]
   order by proj.CreatedDate desc

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
/****** Object:  StoredProcedure [Amplo].[uspGetUserDetailFromEmail]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspGetUserDetailFromEmail]
@EmailId as nvarchar(256)
as
begin
	select dv.[UserDIVATeamID] UserId, dv.ClientId, ClientName, ClientParentCompany, ClientBusinessUnit
	, dv.FirstName, dv.LastName, dv.Email, dv.UserTypeId
	from  [Amplo].[UserDIVATeam] dv
	join [Amplo].[Client] cl on cl.ClientId = dv.ClientId

	where UPPER(dv.Email) = UPPER(@EmailId )
	--and dv.Email not in (select Email from amplo.[User])
end
GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserDomainsForBMProject]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspGetUserDomainsForBMProject]
 (
    @id [int],
    @projectid [int]
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   select MappedDomains.DomainID, domainDetails.DomianName DomainName, MappedDomains.AccessType, 
   cast((case when (select count(1) from amplo.BenchmarkAuditLog where BenchmarkProjectId = @projectid and DomainId = MappedDomains.DomainId)
   > 0 then 1 else 0 end) as bit) IsAuditLogPresent
   from (select DomainID, [AccessType] from Amplo.UserDomainAccess where UserID = @id and BenchmarkProjectID = @projectid And ActiveFlag = 1 and AccessType != 3) MappedDomains ---get mapped Domains
   inner join (select DomainID,DomianName from Amplo.AmploDomain) domainDetails -- get Domain Name
   ON MappedDomains.DomainID = domainDetails.DomainID 
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
END














GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserList]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetUserList]
 (
    @id [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
   Select @clientid = ClientID from Amplo.[User] where UserID = @id

    Select UserID, FirstName, MiddleName, LastName from Amplo.[User] where ClientID = @clientid and EmailValidationStatus = 1 and UserStatusID = 1 and ActiveFlag = 1 and ISNULL(DisableDate, GETDATE() +1) > GETDATE()

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
/****** Object:  StoredProcedure [Amplo].[uspGetUserList2]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetUserList2]
 (
    @id [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    Select UserID, FirstName, MiddleName, LastName from Amplo.[User]

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
/****** Object:  StoredProcedure [Amplo].[uspImportToInterfaceFromStaging]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Amplo].[uspImportToInterfaceFromStaging]
@StagingId uniqueidentifier
as
begin
	declare @ProjectId as int
	declare @ProjectName as nvarchar(256)
	declare @UserId as int
	declare @ClientId as int
	declare @IsSuccess as bit = 1
	
	select top 1 @ProjectId = ap.[DecompositionProjectID], @ProjectName = ap.[ProjectName], @ClientId = sp.ClientId, @UserId = sp.UserId
	from [Amplo].[DecompositionProject] ap join [Amplo].[CMProjectImportStaging] sp on ap.[ProjectName] = sp.DecompositionProjectName
	where ap.[ClientID] = @ClientId and ap.ActiveFlag = 1 and ap.DisabledFlag = 0

	declare @InterfaceId as uniqueidentifier = NewId()
	insert into amplo.CMProjectImportInterface
	values(@InterfaceId, @StagingId, @ProjectName, @ProjectId, @ClientId, @UserId, GETDATE(), 0)
end
GO
/****** Object:  StoredProcedure [Amplo].[uspIsSecurityQuestionSet]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspIsSecurityQuestionSet]
(
    @PUserName [varchar](100)
)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @count INT
    SELECT @count = COUNT(*) FROM [Password] WHERE UserID = (SELECT userID FROM [User] WHERE UserName = @PUserName)
    IF(@count>0)
    BEGIN
        RETURN 'Security Question is set'
    END
    ELSE
    BEGIN
        RETURN 'Security Question is not set'
    END  
  END;


GO
/****** Object:  StoredProcedure [Amplo].[uspLogError]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- uspLogError logs error information in the ErrorLog table about the 
-- error that caused execution to jump to the CATCH block of a 
-- TRY...CATCH construct. This should be executed from within the scope 
-- of a CATCH block otherwise it will return without inserting error 
-- information. 
CREATE PROCEDURE [Amplo].[uspLogError] 
    @ErrorLogID [int] = 0 OUTPUT -- contains the ErrorLogID of the row inserted
AS                               -- by uspLogError in the ErrorLog table
BEGIN
    SET NOCOUNT ON;

    -- Output parameter value of 0 indicates that error 
    -- information was not logged
    SET @ErrorLogID = 0;

    BEGIN TRY
        -- Return if there is no error information to log
        IF ERROR_NUMBER() IS NULL
            RETURN;

        -- Return if inside an uncommittable transaction.
        -- Data insertion/modification is not allowed when 
        -- a transaction is in an uncommittable state.
        IF XACT_STATE() = -1
        BEGIN
            PRINT 'Cannot log error since the current transaction is in an uncommittable state. ' 
                + 'Rollback the transaction before executing uspLogError in order to successfully log error information.';
            RETURN;
        END

        INSERT [Amplo].[ErrorLog] 
            (
            [UserName], 
            [ErrorNumber], 
            [ErrorSeverity], 
            [ErrorState], 
            [ErrorProcedure], 
            [ErrorLine], 
            [ErrorMessage]
            ) 
        VALUES 
            (
            CONVERT(sysname, CURRENT_USER), 
            ERROR_NUMBER(),
            ERROR_SEVERITY(),
            ERROR_STATE(),
            ERROR_PROCEDURE(),
            ERROR_LINE(),
            ERROR_MESSAGE()
            );

        -- Pass back the ErrorLogID of the row inserted
        SET @ErrorLogID = @@IDENTITY;
    END TRY
    BEGIN CATCH
        PRINT 'An error occurred in stored procedure uspLogError: ';
        /*EXECUTE [Amplo].[uspPrintError];*/
        RETURN -1;
    END CATCH
END;


GO
/****** Object:  StoredProcedure [Amplo].[uspLogin]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspLogin]
(
    @PUserName [varchar](100),
    @PPassword [varchar](100)
)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;
    
    DECLARE @userName VARCHAR(100),@pwd VARCHAR(100),@emailValid INT,@status INT,@activeFlag INT,@countUser INT
    SELECT @userName = [UserName] , @pwd = UserPassword,@emailValid = EmailValidationStatus,@status = UserStatusID
     FROM [Amplo].[User] WHERE UserName = @PUserName AND ActiveFlag = 1;
     SELECT @countUser = Count(*) FROM [Amplo].[User] WHERE UserName = @PUserName AND ActiveFlag = 1;
    IF(@countUser>0)
    BEGIN
        IF(@userName != @PUserName OR @pwd != @PPassword)
        BEGIN
            --RETURN 'Wrong UserName or Password';
            SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 4;
        END;
        ELSE IF(@emailValid=0)
        BEGIN
            --RETURN 'Please Verify Email';
            SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 5;
        END
        ELSE IF(@status=2)
        BEGIN
            --RETURN 'Waiting For Admin Approval';
            SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 6;
        END
        ELSE
        BEGIN
            --RETURN 'LOGGED IN';
            SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 7;
        END
    END
    ELSE
    BEGIN
        --RETURN 'No Such User Exists.'
        SELECT MessageName FROM Amplo.[Message] WHERE MessageID = 8;
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
/****** Object:  StoredProcedure [Amplo].[uspPhaseApprovedClient]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspPhaseApprovedClient]

as
begin



select
cl.ClientId, cl.ClientName
from amplo.Client cl
join amplo.[User] u on (u.ClientId = cl.ClientId and u.EmailAddress = cl.EmailAddress)
where u.ActiveFlag=1


end
GO
/****** Object:  StoredProcedure [Amplo].[uspProcessDecompositionExport]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [Amplo].[uspProcessDecompositionExport]
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN
	set nocount on
	Declare @sql1 nvarchar(max)
	DECLARE @AvgScoreWeightage [int]
	SELECT top 1 @AvgScoreWeightage = ISNULL([Avg_Score_Weight],2.00) FROM DecompositionProcessLevel1 a
	INNER JOIN DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID  and a.ActiveFlag = 1
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;

	CREATE table #DecompositionProcessLevelDetails
	(
		  ProcessLevel1Id int
		, ProcessLevel1Title nvarchar(100)
		, ProcessLevel2Id int
		, ProcessLevel2Title nvarchar(100)
		, ProcessLevel3Id int
		, ProcessLevel3Title nvarchar(100)
		, ProcessLevel4Id int
		, ProcessLevel4Title nvarchar(100)
		, ProcessLevel5Id int
		, ProcessLevel5Title nvarchar(100)
		, [Priority] nvarchar(100)
		, [Owner] nvarchar(100)
		, Country nvarchar(100)
	)

	declare @UsedFlag bit = 1
	DECLARE @MyScoreCriteriaCursor CURSOR;
	DECLARE @ScoreCriteriaTitles varchar(100);
	dECLARE @ScoreCnt int;
	Declare @SQLscore Varchar(100);
	set @ScoreCnt =1
	BEGIN
		SET @MyScoreCriteriaCursor = CURSOR FOR
		select (case when UsedFlag = 1 then ScoreCriteriaTitle else ScoreCriteriaName End) ScoreCriteriaTitle, UsedFlag from Amplo.DecompositionScoreCriteriaProject
		where DecompositionProjectID = @ProjectID and DecompositionProcessLevel1ID = @ProcessLevel1ID --and UsedFlag = 1 

		OPEN @MyScoreCriteriaCursor 
		FETCH NEXT FROM @MyScoreCriteriaCursor
		INTO @ScoreCriteriaTitles, @UsedFlag

		WHILE @@FETCH_STATUS = 0
		BEGIN
			if(@UsedFlag = 1)
			begin
				set @sql1 = 'Alter table #DecompositionProcessLevelDetails add [' + @ScoreCriteriaTitles + '] numeric(2, 1)'
			end
			else
			begin
				set @sql1 = 'Alter table #DecompositionProcessLevelDetails add [' + @ScoreCriteriaTitles + '] numeric(2, 1)'
			end
			EXEC (@sql1)

		  --set @SQLscore = 'Update #DecompositionProcessLevelDetails Set [' + @ScoreCriteriaTitles + '] = Score_Criteria_' + cast(@ScoreCnt as varchar)
		  --EXEC (@SQLscore)
		  --PRINT (@SQLscore)
		  FETCH NEXT FROM @MyScoreCriteriaCursor
		  INTO @ScoreCriteriaTitles, @UsedFlag
		   set @ScoreCnt =@ScoreCnt+1;
		END; 

		CLOSE @MyScoreCriteriaCursor
		DEALLOCATE @MyScoreCriteriaCursor
	END

	--select * from #DecompositionProcessLevelDetails

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, l3.DecompositionProcessLevel3ID, l3.ProcessLevel3Title, l4.DecompositionProcessLevel4ID, l4.ProcessLevel4Title
	, l5.DecompositionProcessLevel5ID, l5.ProcessLevel5Title, @AvgScoreWeightage, l5.[Owner], l5.[CountrySpecific]
	, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6
	, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10
	from [Amplo].[DecompositionProcessLevel5] l5
	join [Amplo].[DecompositionProcessLevel4] l4 on l4.DecompositionProcessLevel4ID = l5.DecompositionProcessLevel4ID
	join [Amplo].[DecompositionProcessLevel3] l3 on l3.DecompositionProcessLevel3ID = l4.DecompositionProcessLevel3ID
	join [Amplo].[DecompositionProcessLevel2] l2 on l2.DecompositionProcessLevel2ID = l3.DecompositionProcessLevel2ID
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel5Score] scr on scr.DecompositionProcessLevel5ID = l5.DecompositionProcessLevel5ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l5.ActiveFlag = 1 and l4.ActiveFlag = 1 and l3.ActiveFlag = 1 and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l5.LeafNodeFlag = 1

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, l3.DecompositionProcessLevel3ID, l3.ProcessLevel3Title, l4.DecompositionProcessLevel4ID, l4.ProcessLevel4Title
	, NULL, NULL, @AvgScoreWeightage, l4.[Owner], l4.[CountrySpecific]
	, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6
	, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10
	from [Amplo].[DecompositionProcessLevel4] l4
	join [Amplo].[DecompositionProcessLevel3] l3 on l3.DecompositionProcessLevel3ID = l4.DecompositionProcessLevel3ID
	join [Amplo].[DecompositionProcessLevel2] l2 on l2.DecompositionProcessLevel2ID = l3.DecompositionProcessLevel2ID
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel4Score] scr on scr.DecompositionProcessLevel4ID = l4.DecompositionProcessLevel4ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l4.ActiveFlag = 1 and l3.ActiveFlag = 1 and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l4.LeafNodeFlag = 1

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, l3.DecompositionProcessLevel3ID, l3.ProcessLevel3Title, NULL, NULL
	, NULL, NULL, @AvgScoreWeightage, l3.[Owner], l3.[CountrySpecific]
	, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6
	, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10
	from [Amplo].[DecompositionProcessLevel3] l3
	join [Amplo].[DecompositionProcessLevel2] l2 on l2.DecompositionProcessLevel2ID = l3.DecompositionProcessLevel2ID
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel3Score] scr on scr.DecompositionProcessLevel3ID = l3.DecompositionProcessLevel3ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l3.ActiveFlag = 1 and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l3.LeafNodeFlag = 1

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, NULL, NULL, NULL, NULL
	, NULL, NULL, @AvgScoreWeightage, l2.[Owner], l2.[CountrySpecific]
	, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6
	, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10
	from [Amplo].[DecompositionProcessLevel2] l2
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel2Score] scr on scr.DecompositionProcessLevel2ID = l2.DecompositionProcessLevel2ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l2.LeafNodeFlag = 1

	DECLARE @Columns as VARCHAR(MAX)
	Declare @ProjectID1 as Varchar(500)
    Declare @ProcessID1 as Varchar(500)
	SET @ProjectID1 =CAST(@ProjectID as varchar(50));
	SET @ProcessID1 =CAST(@ProcessLevel1ID as varchar(50));
	SELECT @Columns =
	COALESCE(@Columns + ', ','') + QUOTENAME(ScoreCriteriaName)
	FROM
	(SELECT DISTINCT (case when p.UsedFlag = 1 then p.ScoreCriteriaTitle else p.ScoreCriteriaName End) ScoreCriteriaName, p.DecompositionScoreCriteriaId
		FROM Amplo.DecompositionScoreCriteriaProject P
           where P.DecompositionProcessLevel1ID=@ProcessLevel1ID and P.DecompositionProjectID =@ProjectID
	) AS B Order by B.DecompositionScoreCriteriaId

	exec('select ProcessLevel1Title, ProcessLevel2Title, ProcessLevel3Title, ProcessLevel4Title, ProcessLevel5Title, (case when [Priority] = 3 then ''Hign'' when [Priority] = 2 then ''Medium'' else ''Low'' End) [Priority], [Owner], Country
	, ' + @Columns + '
	from #DecompositionProcessLevelDetails')
	drop table #DecompositionProcessLevelDetails
END
GO
/****** Object:  StoredProcedure [Amplo].[uspProcessDetailsExport]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [Amplo].[uspProcessDetailsExport]
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN
	set nocount on
	Declare @sql1 nvarchar(max)
	DECLARE @AvgScoreWeightage [int]
	SELECT top 1 @AvgScoreWeightage = ISNULL([Avg_Score_Weight],2.00) FROM DecompositionProcessLevel1 a
	INNER JOIN DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID  and a.ActiveFlag = 1
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;

	CREATE table #DecompositionProcessLevelDetails
	(
		  ProcessLevel1Id int
		, ProcessLevel1Title nvarchar(100)
		, ProcessLevel2Id int
		, ProcessLevel2Title nvarchar(100)
		, ProcessLevel3Id int
		, ProcessLevel3Title nvarchar(100)
		, ProcessLevel4Id int
		, ProcessLevel4Title nvarchar(100)
		, ProcessLevel5Id int
		, ProcessLevel5Title nvarchar(100)
		, Number1 numeric(10, 2)
		, Number2 numeric(10, 2)
		, Number3 numeric(10, 2)
		, Number4 numeric(10, 2)
		, Number5 numeric(10, 2)
		, Number6 numeric(10, 2)
		, Number7 numeric(10, 2)
		, Number8 numeric(10, 2)
		, Number9 numeric(10, 2)
		, Number10 numeric(10, 2)
		, Attribute1 nvarchar(256)
		, Attribute2 nvarchar(256)
		, Attribute3 nvarchar(256)
		, Attribute4 nvarchar(256)
		, Attribute5 nvarchar(256)
		, Attribute6 nvarchar(256)
		, Attribute7 nvarchar(256)
		, Attribute8 nvarchar(256)
		, Attribute9 nvarchar(256)
		, Attribute10 nvarchar(256)
		, Blob1 varbinary(MAX)
		, Blob2 varbinary(MAX)
		, Blob3 varbinary(MAX)
		, Clob1 varchar(MAX)
		, Clob2 varchar(MAX)
		, Clob3 varchar(MAX)
	)

	

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, l3.DecompositionProcessLevel3ID, l3.ProcessLevel3Title, l4.DecompositionProcessLevel4ID, l4.ProcessLevel4Title
	, l5.DecompositionProcessLevel5ID, l5.ProcessLevel5Title, l5.Number1, l5.Number2, l5.Number3, l5.Number4, l5.Number5, l5.Number6
	, l5.Number7, l5.Number8, l5.Number9, l5.Number10, l5.Attribute1, l5.Attribute2, l5.Attribute3, l5.Attribute4, l5.Attribute5, l5.Attribute6
	, l5.Attribute7, l5.Attribute8, l5.Attribute9, l5.Attribute10, l5.Blob1, l5.Blob2, l5.Blob3, l5.Clob1, l5.Clob2, l5.Clob3
	from [Amplo].[DecompositionProcessLevel5] l5
	join [Amplo].[DecompositionProcessLevel4] l4 on l4.DecompositionProcessLevel4ID = l5.DecompositionProcessLevel4ID
	join [Amplo].[DecompositionProcessLevel3] l3 on l3.DecompositionProcessLevel3ID = l4.DecompositionProcessLevel3ID
	join [Amplo].[DecompositionProcessLevel2] l2 on l2.DecompositionProcessLevel2ID = l3.DecompositionProcessLevel2ID
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel5Score] scr on scr.DecompositionProcessLevel5ID = l5.DecompositionProcessLevel5ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l5.ActiveFlag = 1 and l4.ActiveFlag = 1 and l3.ActiveFlag = 1 and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l5.LeafNodeFlag = 1

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, l3.DecompositionProcessLevel3ID, l3.ProcessLevel3Title, l4.DecompositionProcessLevel4ID, l4.ProcessLevel4Title
	, NULL, NULL, l4.Number1, l4.Number2, l4.Number3, l4.Number4, l4.Number5, l4.Number6
	, l4.Number7, l4.Number8, l4.Number9, l4.Number10, l4.Attribute1, l4.Attribute2, l4.Attribute3, l4.Attribute4, l4.Attribute5, l4.Attribute6
	, l4.Attribute7, l4.Attribute8, l4.Attribute9, l4.Attribute10, l4.Blob1, l4.Blob2, l4.Blob3, l4.Clob1, l4.Clob2, l4.Clob3
	from [Amplo].[DecompositionProcessLevel4] l4
	join [Amplo].[DecompositionProcessLevel3] l3 on l3.DecompositionProcessLevel3ID = l4.DecompositionProcessLevel3ID
	join [Amplo].[DecompositionProcessLevel2] l2 on l2.DecompositionProcessLevel2ID = l3.DecompositionProcessLevel2ID
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel4Score] scr on scr.DecompositionProcessLevel4ID = l4.DecompositionProcessLevel4ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l4.ActiveFlag = 1 and l3.ActiveFlag = 1 and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l4.LeafNodeFlag = 1

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, l3.DecompositionProcessLevel3ID, l3.ProcessLevel3Title, NULL, NULL
	, NULL, NULL, l3.Number1, l3.Number2, l3.Number3, l3.Number4, l3.Number5, l3.Number6
	, l3.Number7, l3.Number8, l3.Number9, l3.Number10, l3.Attribute1, l3.Attribute2, l3.Attribute3, l3.Attribute4, l3.Attribute5, l3.Attribute6
	, l3.Attribute7, l3.Attribute8, l3.Attribute9, l3.Attribute10, l3.Blob1, l3.Blob2, l3.Blob3, l3.Clob1, l3.Clob2, l3.Clob3
	from [Amplo].[DecompositionProcessLevel3] l3
	join [Amplo].[DecompositionProcessLevel2] l2 on l2.DecompositionProcessLevel2ID = l3.DecompositionProcessLevel2ID
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel3Score] scr on scr.DecompositionProcessLevel3ID = l3.DecompositionProcessLevel3ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l3.ActiveFlag = 1 and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l3.LeafNodeFlag = 1

	insert into #DecompositionProcessLevelDetails
	select l1.DecompositionProcessLevel1ID, l1.ProcessLevel1Title, l2.DecompositionProcessLevel2ID, l2.ProcessLevel2Title
	, NULL, NULL, NULL, NULL
	, NULL, NULL, l2.Number1, l2.Number2, l2.Number3, l2.Number4, l2.Number5, l2.Number6
	, l2.Number7, l2.Number8, l2.Number9, l2.Number10, l2.Attribute1, l2.Attribute2, l2.Attribute3, l2.Attribute4, l2.Attribute5, l2.Attribute6
	, l2.Attribute7, l2.Attribute8, l2.Attribute9, l2.Attribute10, l2.Blob1, l2.Blob2, l2.Blob3, l2.Clob1, l2.Clob2, l2.Clob3
	from [Amplo].[DecompositionProcessLevel2] l2
	join [Amplo].[DecompositionProcessLevel1] l1 on l1.DecompositionProcessLevel1ID = l2.DecompositionProcessLevel1ID
	left outer join [Amplo].[DecompositionProcessLevel2Score] scr on scr.DecompositionProcessLevel2ID = l2.DecompositionProcessLevel2ID
	where l1.[DecompositionProjectID] = @ProjectId and l1.DecompositionProcessLevel1ID = @ProcessLevel1ID
	and l2.ActiveFlag = 1 and l1.ActiveFlag = 1 and l2.LeafNodeFlag = 1

	DECLARE @Columns as VARCHAR(MAX)
	Declare @ProjectID1 as Varchar(500)
    Declare @ProcessID1 as Varchar(500)
	SET @ProjectID1 =CAST(@ProjectID as varchar(50));
	SET @ProcessID1 =CAST(@ProcessLevel1ID as varchar(50));
	SELECT @Columns =
	COALESCE(@Columns + ', ','') + QUOTENAME(ScoreCriteriaName)
	FROM
	(SELECT DISTINCT (case when p.UsedFlag = 1 then p.ScoreCriteriaTitle else p.ScoreCriteriaName End) ScoreCriteriaName, p.DecompositionScoreCriteriaId
		FROM Amplo.DecompositionScoreCriteriaProject P
           where P.DecompositionProcessLevel1ID=@ProcessLevel1ID and P.DecompositionProjectID =@ProjectID
	) AS B Order by B.DecompositionScoreCriteriaId

	select ProcessLevel1Title, ProcessLevel2Title, ProcessLevel3Title, ProcessLevel4Title, ProcessLevel5Title, Number1, Number2, Number3, Number4, Number5, Number6
	, Number7, Number8, Number9, Number10, Attribute1, Attribute2, Attribute3, Attribute4, Attribute5, Attribute6
	, Attribute7, Attribute8, Attribute9, Attribute10, Blob1, Blob2, Blob3, Clob1, Clob2, Clob3
	from #DecompositionProcessLevelDetails
	drop table #DecompositionProcessLevelDetails
END
GO
/****** Object:  StoredProcedure [Amplo].[uspProcessLevel1Export]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspProcessLevel1Export]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN

	SET NOCOUNT ON;

	Declare @clientid as INT
	--Declare @ProcessLevel1ID as INT
	
	DECLARE @AvgScoreWeightage [int]
	
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]
	


	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		
		
		NodeLevelID [varchar](100), 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int],
		TotalAvgScore numeric(10, 2),
		TotalAvgScore1  numeric(10, 2)
		
		, LeafNodeFlag bit
	  );
	  declare @Level2LeafNodeFlag as bit, @Level3LeafNodeFlag as bit, @Level4LeafNodeFlag as bit, @Level5LeafNodeFlag as bit
	  declare @Status as int = 0
--Process Level1 Cursor

	SELECT top 1 @Status = a.[Status],  @ProcessLevel1ID = a.[DecompositionProcessLevel1ID], @ProcessLevelTitle=[ProcessLevel1Title], @Owner=[Owner], @AvgScoreWeightage = ISNULL([Avg_Score_Weight],2.00) FROM DecompositionProcessLevel1 a
	INNER JOIN DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID and a.DecompositionProcessLevel1ID=@ProcessLevel1ID and a.ActiveFlag = 1
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;
	INSERT INTO #DecompositionProcessLevelDetails
	(
		ProcessLevel1ID, ProcessLevelTitle, Owner, Priority, ProcessLevel, LeafNodeFlag, TotalAvgScore1
	)
	VALUES
	(
		@ProcessLevel1ID, @ProcessLevelTitle, @Owner, @AvgScoreWeightage, 1, 0, -1
	)

   --------------------------------------------------------------------------------------------------------------

select DISTINCT
	        --ProjectName,
			PhaseName, 
			FunctionName,
			ProcessLevel1Title,
			
			--ProcessLevelNodeID as ProcessLevelID, 
			
			 CASE 
     WHEN Priority =  0 THEN 'LOW'
     WHEN Priority =  1 THEN 'Medium'
	 Else 'High'
  
      end AS Priority
		
			--,NodeLevelID, 
			,ISNULL(d.Owner,'') Owner, 
			ISNULL(d.CountrySpecific,'') Country
			
		FROM #DecompositionProcessLevelDetails d 
		inner  join Amplo.DecompositionProcessLevel1 a on a.DecompositionProjectID = 

		 @ProjectID and a.DecompositionProcessLevel1ID=@ProcessLevel1ID
		inner join Amplo.DecompositionProject r on r.DecompositionProjectID=

		@ProjectID
		inner join Amplo.DecompositionFunction f on 
		--f.DecompositionProjectID=r.DecompositionProjectID 
		--and 
		f.FunctionNumber =a.FunctionID
		
		
	    inner  join Amplo.DecompositionPhase p on 
		--p.DecompositionProjectID=a.DecompositionProjectID and 
		 p.PhaseNumber =a.PhaseID
	
		  
		WHERE
		 a.DecompositionProcessLevel1ID = @ProcessLevel1ID 
		

	DROP TABLE if exists #DecompositionProcessLevelDetails;
	

    

END
GO
/****** Object:  StoredProcedure [Amplo].[uspResetPassword]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspResetPassword]
(
    @PUserName [varchar](100),
    @PPassword [varchar](100)
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
    BEGIN TRANSACTION;
  
  
    --reset user Password
    UPDATE Amplo.[User] 
    SET UserPassword = @PPassword WHERE UserName = @PUserName;
  
    if @@ROWCOUNT > 0
    begin
       Select MessageName from Amplo.[Message] where MessageID = 1014
    end
    
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
    

  END;


GO
/****** Object:  StoredProcedure [Amplo].[uspRetrieveCompanyProfile]    Script Date: 1/9/2020 6:47:56 PM ******/
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
/****** Object:  StoredProcedure [Amplo].[uspSaveBenchmarkingDomainAccess]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspSaveBenchmarkingDomainAccess]
	-- Add the parameters for the stored procedure here
	@UserID [int],
	@BenchmarkProjectID [int],
	@DomainId [int],
	@AccessType [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	update [Amplo].[UserDomainAccess] set [AccessType] = @AccessType
	where [DomainID] = @DomainId and [BenchmarkProjectID] = @BenchmarkProjectID and [UserID] = @UserID and ActiveFlag=1
    -- Insert statements for procedure here
  SELECT Cast(1 as bit) as Success, (select MessageName from amplo.[Message] where MessageId = 1033) MessageName, [UserDomainAccessID]
      ,da.[ClientID]
      ,da.[UserID]
      ,da.[DomainID]
      ,da.[AccessType]
      ,da.[ActiveFlag]
      ,[BenchmarkProjectID]
	  ,bd.[DomainName]
  FROM [Amplo].[UserDomainAccess] da
  join [Amplo].[BenchmarkingDomain] bd on bd.[DomainID] = da.[DomainID]
  where [BenchmarkProjectID] = @BenchmarkProjectID and da.UserID = @UserID and da.ActiveFlag=1

END
GO
/****** Object:  StoredProcedure [Amplo].[uspSaveDecompositionProcessLevel2Template]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Amplo].[uspSaveDecompositionProcessLevel2Template]
@TemplateId int
, @Input nvarchar(MAX)
, @UserId as int
as
begin
	SET NOCOUNT ON
	begin try
		declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
		update [Amplo].[TemplateFunctPhaseStyleAssignment] set ActiveFlag = 0
		where TemplateId = @TemplateId

		SELECT *
			INTO #Assignment
			FROM OPENJSON (@Input, '$.root')
			WITH (FunctionId int, PhaseId int, StyleTitle nvarchar(100), processes nvarchar(MAX) as json)
		insert into amplo.TemplateFunctPhaseStyleAssignment
		select @TemplateId, PhaseId, FunctionId, FunctionPhaseStyleId, 1, @UserName, GETDATE(), NULL, NULL
		from #Assignment a join [Amplo].[FunctionPhaseStyle] fp on fp.StyletTitle = a.StyleTitle

		SELECT *
			from #Assignment

		declare @Processes as nvarchar(MAX)
		declare @FunctionId int
		declare @PhaseId int
		declare @StyleId int
		declare @ProcessesNames1 as nvarchar(MAX)
		declare cr cursor
		for select processes, FunctionId, PhaseId, FunctionPhaseStyleId
		from #Assignment a join [Amplo].[FunctionPhaseStyle] fp on fp.StyletTitle = a.StyleTitle
		open cr
		fetch next from cr into @Processes, @FunctionId, @PhaseId, @StyleId
		while @@fetch_status = 0
		begin
		
	

			SELECT *
			INTO #ProcessesNames1
			FROM OPENJSON (@Processes)
			WITH (ProcessLevel1Title nvarchar(100))
			
			INSERT INTO [Amplo].[AmploDecompositionProcessLevel1Template]
				   ([DecompositionProcessLevel1ID]
				   ,[DecompositionFunctionID]
				   ,[DecompositionPhaseID]
				   ,[ProcessLevel1Name]
				   ,[ProceeLevel1Title]
				   ,[ProcessLevel1Description]
				   ,[ProcessLevel1Meaning]
				   ,[DesignChoice]
				   ,[ProcessLevel1DeisgnChoice]
				   ,[GridViewLocationID]
				   ,[GridVViewLocationFlag]
				   ,[ActiveFlag]
				   ,[TemplateID]
				   ,[StyleID]
				   ,[CreatedBy]
				   ,[CreatedDate])
			 select 1
				   ,@FunctionId
				   ,@PhaseId
				   ,ProcessLevel1Title
				   ,'ProcessLevel1Title'
				   ,'ProcessLevel1Title'
				   ,ProcessLevel1Title
				   ,NULL
				   ,NULL
				   ,NULL
				   ,NULL
				   ,1
				   ,@TemplateId
				   ,@StyleId
				   ,@UserName
				   ,GETDATE() from #ProcessesNames1

				   drop table #ProcessesNames1

			fetch next from cr into @Processes, @FunctionId, @PhaseId, @StyleId
		end

		close cr
		deallocate cr

		select cast(1 as bit) Success, MessageName from amplo.Message where MessageId = 1040
	end try
	begin catch
	select Error_Message();
		EXECUTE [Amplo].[uspLogError];
	end catch
end

GO
/****** Object:  StoredProcedure [Amplo].[uspSaveFunction]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspSaveFunction]
  @Functions nvarchar(MAX)
, @UserId int
, @TemplateId int
as
begin
	SET NOCOUNT ON
	begin try
		declare @FunctionTitle as nvarchar(256)
		declare @FunctionId as int
		declare @IsSelected as bit
		SELECT *
			INTO #SelectedFunctions
			FROM OPENJSON (@Functions, '$.root')
			WITH (
				DecompositionFunctionId int
				, FunctionTitle NVARCHAR(100)
				, IsSelected bit
			)

		select Distinct PhaseID into #FrameFunctions from [Amplo].[CMTempFrameStructure] where [TemplateID] = @TemplateId
		if(select count(*) from #FrameFunctions) = 0
		begin
			insert into #FrameFunctions values(NULL)
		end

		update [Amplo].[CMTempFrameStructure] set ActiveFlag = 0 where [TemplateID] = @TemplateId

		declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
		declare @FunctionNumber as int 
		declare cr cursor
		for select DecompositionFunctionId, FunctionTitle, IsSelected from #SelectedFunctions
		open cr
		fetch next from cr into @FunctionId, @FunctionTitle, @IsSelected
		while @@fetch_status = 0
		begin
			if(@FunctionId = 0)
			begin
				set @FunctionNumber = (ISNULL((select MAX(FunctionNumber) from amplo.DecompositionFunction), 0)) + 1
				insert into amplo.DecompositionFunction
					values (1, 1, 1, @FunctionTitle, @FunctionTitle
					, @FunctionTitle, @FunctionTitle, NULL, 1, @UserName, GETDATE(), NULL, NULL, NULL, @FunctionNumber)
				set @FunctionId = Scope_Identity()
			end
			if(@IsSelected = 1)
			begin
				insert into [Amplo].[CMTempFrameStructure]
				select @TemplateId, PhaseId, @FunctionId, 1, @UserName, GETDATE(), NULL, NULL from #FrameFunctions
			end

			fetch next from cr into @FunctionId, @FunctionTitle, @IsSelected
		end
		close cr
		deallocate cr

		drop table #SelectedFunctions
		drop table #FrameFunctions
		select cast(1 as bit) Success, MessageName from amplo.[Message] where MessageId = 1038
	end try
	begin catch
	select Error_Message();
		EXECUTE [Amplo].[uspLogError];
	end catch
end
GO
/****** Object:  StoredProcedure [Amplo].[uspSaveFunctionPhaseAssignment]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspSaveFunctionPhaseAssignment]
@TemplateId int
, @Input nvarchar(MAX)
, @UserId as int
as
begin
	SET NOCOUNT ON
	begin try
		declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
		update [Amplo].[TemplateFunctPhaseStyleAssignment] set ActiveFlag = 0
		where TemplateId = @TemplateId

		SELECT *
			INTO #Assignment
			FROM OPENJSON (@Input)
			WITH (FunctionId int, PhaseId int, StyleTitle nvarchar(100), processes nvarchar(MAX))
		insert into amplo.TemplateFunctPhaseStyleAssignment
		select @TemplateId, PhaseId, FunctionId, FunctionPhaseStyleId, 1, @UserName, GETDATE(), NULL, NULL
		from #Assignment a join [Amplo].[FunctionPhaseStyle] fp on fp.StyleTtitle = a.StyleTitle

		declare @Processes as nvarchar(MAX)
		declare @FunctionId int
		declare @PhaseId int
		declare @StyleId int

		declare cr cursor
		for select processes, FunctionId, PhaseId, FunctionPhaseStyleId
		from #Assignment a join [Amplo].[FunctionPhaseStyle] fp on fp.StyletTitle = a.StyleTitle
		open cr
		fetch next from cr into @Processes, @FunctionId, @PhaseId, @StyleId
		while @@fetch_status = 0
		begin
			SELECT *
			INTO #Processes
			FROM OPENJSON (@Processes)
			WITH (ProcessLevel1Title nvarchar(100))

			INSERT INTO [Amplo].[AmploDecompositionProcessLevel1Template]
				   ([DecompositionProcessLevel1ID]
				   ,[DecompositionFunctionID]
				   ,[DecompositionPhaseID]
				   ,[ProcessLevel1Name]
				   ,[ProceeLevel1Title]
				   ,[ProcessLevel1Description]
				   ,[ProcessLevel1Meaning]
				   ,[DesignChoice]
				   ,[ProcessLevel1DeisgnChoice]
				   ,[GridViewLocationID]
				   ,[GridVViewLocationFlag]
				   ,[ActiveFlag]
				   ,[TemplateID]
				   ,[StyleID]
				   ,[CreatedBy]
				   ,[CreatedDate])
			 select 1
				   ,@FunctionId
				   ,@PhaseId
				   ,ProcessLevel1Title
				   ,ProcessLevel1Title
				   ,ProcessLevel1Title
				   ,ProcessLevel1Title
				   ,NULL
				   ,NULL
				   ,NULL
				   ,NULL
				   ,1
				   ,@TemplateId
				   ,@StyleId
				   ,@UserName
				   ,GETDATE() from #Processes

			fetch next from cr into @Processes, @FunctionId, @PhaseId, @StyleId
		end

		close cr
		deallocate cr

		select cast(1 as bit) Success, MessageName from amplo.Message where MessageId = 1040
	end try
	begin catch
		EXECUTE [Amplo].[uspLogError];
	end catch
end

GO
/****** Object:  StoredProcedure [Amplo].[uspSaveFunctionPhaseWithStyle]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspSaveFunctionPhaseWithStyle]
@TemplateId as int
, @FunctionId as int
, @PhaseId as int
, @StyleName as nvarchar(100)
, @UserId as int
as
begin
	SET NOCOUNT ON
	BEGIN TRY
		BEGIN TRANSACTION trMain
		declare @StyleId as int = (select top 1 FunctionPhaseStyleID from amplo.FunctionPhaseStyle where [StyleTtitle] = @StyleName and [ActiveFlag] = 1)
		declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
		if(@StyleId IS NOT NULL and @StyleId != 0)
		begin
			declare @TemplateStructureId as int = (select top 1 CMTempFrameStructureID from [Amplo].[CMTempFrameStructure]
				where [TemplateID] = @TemplateId and [FunctionID] = @FunctionId and [PhaseID] = @PhaseId and [ActiveFlag] = 1)
			if(@TemplateStructureId IS NULL or @TemplateStructureId = 0)
				begin
					INSERT INTO [Amplo].[CMTempFrameStructure]
				   ([TemplateID]
				   ,[PhaseID]
				   ,[FunctionID]
				   ,[ActiveFlag]
				   ,[CreatedBy]
				   ,[CreatedDate])
				 VALUES
				   (@TemplateId
				   , @PhaseId
				   , @FunctionId
				   , 1
				   , @UserName
				   , GetDate())

				set @TemplateStructureId = (select top 1 CMTempFrameStructureID from [Amplo].[CMTempFrameStructure]
				where [TemplateID] = @TemplateId and [FunctionID] = @FunctionId and [PhaseID] = @PhaseId and [ActiveFlag] = 1)
			end

			update amplo.TemplateFunctPhaseStyleAssignment set ActiveFlag = 0, ModifiedBy = @UserName, ModifiedDate = GETDATE()
			where [TemplateID] = @TemplateId and [FunctionID] = @FunctionId and [PhaseID] = @PhaseId and [ActiveFlag] = 1

			INSERT INTO [Amplo].[TemplateFunctPhaseStyleAssignment]
				   ([TemplateID]
				   ,[PhaseID]
				   ,[FunctionID]
				   ,[StyleID]
				   ,[ActiveFlag]
				   ,[CreatedBy]
				   ,[CreatedOn])
			 VALUES
				   (@TemplateId
				   , @PhaseId
				   , @FunctionId
				   , @StyleId
				   , 1
				   , @UserName
				   , GETDATE())

			select cast(1 as bit) Success, MessageName from amplo.[Message] where MessageId = 1037
		end
		else
		begin
			update amplo.TemplateFunctPhaseStyleAssignment set ActiveFlag = 0, ModifiedBy = @UserName, ModifiedDate = GETDATE()
			where [TemplateID] = @TemplateId and [FunctionID] = @FunctionId and [PhaseID] = @PhaseId and [ActiveFlag] = 1
			
			select cast(1 as bit) Success, MessageName from amplo.[Message] where MessageId = 1037
		end

		COMMIT TRANSACTION trMain
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION trMain
		EXECUTE [dbo].[uspLogError];
	END CATCH
end
GO
/****** Object:  StoredProcedure [Amplo].[uspSaveFunctionsAndPhases]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspSaveFunctionsAndPhases]
@ClientId as int
, @ProjectId as int
, @UserId as int
, @SelectedFunctions nvarchar(MAX)
, @SelectedPhases nvarchar(MAX)
, @SelectedPermission nvarchar(MAX)
as
begin
declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
CREATE TABLE #TempJSONFunctions(FunctionId varchar(200),FunctionName varchar(200))
INSERT INTO #TempJSONFunctions(FunctionId,FunctionName) 
SELECT FunctionId,FunctionName
  FROM OPENJSON(@SelectedFunctions, '$.root') with (FunctionId varchar(200) '$.FunctionId', FunctionName varchar(200) '$.FunctionName' ) 

  CREATE TABLE #TempJSONPhases(PhaseId varchar(200),PhaseName varchar(200))
INSERT INTO #TempJSONPhases(PhaseId,PhaseName) 
SELECT PhaseId,PhaseName
  FROM OPENJSON(@SelectedPhases, '$.root') with (PhaseId varchar(200) '$.PhaseId', PhaseName varchar(200) '$.PhaseName' ) 

  CREATE TABLE #TempJSONPermission(FunctionId varchar(200),PhaseId varchar(200))
INSERT INTO #TempJSONPermission(FunctionId,PhaseId) 
SELECT FunctionId,PhaseId
  FROM OPENJSON(@SelectedPermission, '$.root') with (FunctionId varchar(200) '$.FunctionId', PhaseId varchar(200) '$.PhaseId' ) 

update [Amplo].[DecompositionFunctionProject] set ActiveFlag = 0 where [DecompositionProjectID] = @ProjectId and [UserID] = @UserId
INSERT INTO [Amplo].[DecompositionFunctionProject]
           ([ClientID]
           ,[UserID]
           ,[DecompositionProjectID]
           ,[IndustryID]
           ,[IndustryVerticalID]
           ,[IndustrySubVerticalID]
           ,[FunctionNumber]
           ,[FunctionName]
           ,[FunctionTitle]
           ,[FunctionDescription]
           ,[FunctionMeaning]
           ,[ProcesDeisgnChoice]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ModifiedBy]
           ,[ModifiedDate])
     select @ClientId, 
	        @UserId,
			@ProjectId,
			D.IndustryID,
			D.IndustryVerticalID,
			D.IndustrySubVerticalID,
			T.FunctionId,
			T.FunctionName,
			D.FunctionTilte,
			D.FunctionDescription,
			D.FunctionMeaning,
			D.ProcesDeisgnChoice,
	        D.ActiveFlag,
			NULL,
			NULL,
			NULL,
			NULL 
	from 
	 #TempJSONFunctions T, amplo.DecompositionFunction D
	 where  T.FunctionId=D.FunctionNumber  ---Not sure


	 ---------------------------------------------------
update [Amplo].[DecompositionPhaseProject] set ActiveFlag = 0 where [DecompositionProjectID] = @ProjectId and [UserID] = @UserId
INSERT INTO [Amplo].[DecompositionPhaseProject]
           ([ClientID]
           ,[UserID]
           ,[DecompositionProjectID]
           ,[PhaseName]
           ,[PhaseTitle]
           ,[PhaseDescription]
           ,[PhaseMeaning]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ModifiedBy]
           ,[ModifiedDate]
           ,[IndustryID]
           ,[IndustryVerticalID]
           ,[IndustrySubVerticalID]
           ,[PhaseNumber])
     Select
           @ClientID
           ,@UserID
           ,@ProjectId
           ,T.PhaseName
           ,PhaseTitle
           ,PhaseDescription
           ,PhaseMeaning
           ,ActiveFlag
           ,CreatedBy
           ,CreatedDate
           ,ModifiedBy
           ,ModifiedDate
           ,IndustryID
           ,IndustryVerticalID
           ,IndustrySubVerticalID
           ,T.PhaseId
		   from 
	 #TempJSONPhases T, amplo.[DecompositionPhase] D
	 where  T.PhaseId=D.PhaseNumber  ---Not sure
	 

-------------------------------------------------------------------------

update [Amplo].[DecompositionUserAccess] set ActiveFlag = 0 where [DecompositionProjectID] = @ProjectId and [UserID] = @UserId
INSERT INTO [Amplo].[DecompositionUserAccess]
           ([UserAccessName]
           ,[UserAccessDescription]
           ,[ClientID]
           ,[UserID]
           ,[DecompositionProjectID]
           ,[FunctionID]
           ,[PhaseID]
    ,[ActiveFlag]
           ,[CreadedBy]
           ,[CreatedDate]
           ,[ModifedBy]
           ,[ModifiedDate])
     Select
           ''
           ,''
           ,@ClientId
           ,@UserId
           ,@ProjectId
           ,FunctionID
			,PhaseID
           ,1
           ,@UserName
           ,GETDATE()
           ,NULL
           ,NULL
		   From 
#TempJSONPermission 


select Cast(1 AS bit ) AS ISSUCCESS , MessageName  from Amplo.Message where MessageID=1034

	

end







GO
/****** Object:  StoredProcedure [Amplo].[uspSavePhase]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [Amplo].[uspSavePhase]
  @Phases nvarchar(MAX)
, @UserId int
, @TemplateId int
as
begin
	SET NOCOUNT ON
	begin try
		declare @FunctionTitle as nvarchar(256)
		declare @PhaseId as int
		declare @IsSelected as bit
		SELECT *
			INTO #SelectedPhases
			FROM OPENJSON (@Phases, '$.root')
			WITH (
				DecompositionPhaseId int
				, PhaseTitle NVARCHAR(100)
				, IsSelected bit
			)
		select Distinct FunctionId into #FrameFunctions from [Amplo].[CMTempFrameStructure] where [TemplateID] = @TemplateId
		if(select count(*) from #FrameFunctions) = 0
		begin
			insert into #FrameFunctions values(NULL)
		end
		update [Amplo].[CMTempFrameStructure] set ActiveFlag = 0 where [TemplateID] = @TemplateId

		declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
		declare @PhaseNumber as int 
		declare cr cursor
		for select DecompositionPhaseId, PhaseTitle, IsSelected from #SelectedPhases
		open cr
		fetch next from cr into @PhaseId, @FunctionTitle, @IsSelected
		while @@fetch_status = 0
		begin
			if(@PhaseId = 0)
			begin
				set @PhaseNumber = (ISNULL((select MAX(PhaseNumber) from amplo.DecompositionPhase), 0)) + 1
				insert into amplo.DecompositionPhase
				values (@FunctionTitle, @FunctionTitle, @FunctionTitle, @FunctionTitle, 1, @UserName, GETDATE(), NULL, NULL
					, 1, 1, 1, NULL, @PhaseNumber)
				set @PhaseId = Scope_Identity()
			end

			if(@IsSelected = 1)
			begin
				insert into [Amplo].[CMTempFrameStructure]
				select @TemplateId, @PhaseId, FunctionId, 1, @UserName, GETDATE(), NULL, NULL from #FrameFunctions
			end

			fetch next from cr into @PhaseId, @FunctionTitle, @IsSelected
		end
		close cr
		deallocate cr

		drop table #SelectedPhases
		select cast(1 as bit) Success, MessageName from amplo.[Message] where MessageId = 1039
	end try
	begin catch
		EXECUTE [Amplo].[uspLogError];
	end catch
end
GO
/****** Object:  StoredProcedure [Amplo].[uspSaveReportAccess]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [Amplo].[uspSaveReportAccess]
@ClientId as int
, @UserID as int
, @ServiceID as int
, @ReportID as int
, @AccessType as int
, @UserReportAccessName as nvarchar(500)
as
begin
	Set  nocount On;
	update amplo.[UserReportAccess] set ActiveFlag = 0 where UserId = @UserID and ServiceId = @ServiceID
	INSERT INTO amplo.[UserReportAccess]
           ([UserReportAccessName]
           ,[ClientID]
           ,[UserID]
           ,[ServiceID]
           ,[AccessType]
           ,[ActiveFlag]
           ,[CreatedBy]
           ,[CreatedDate]
           ,[ReportId])
     VALUES
           (@UserReportAccessName
           ,@ClientId
           ,@UserID
           ,@ServiceID
           ,@AccessType
           ,1
           ,@UserID
           ,GETDATE()
           ,@ReportID)
	select cast(1 as bit) as IsSuccess, MessageName from amplo.Message where MessageId = 1035
end
GO
/****** Object:  StoredProcedure [Amplo].[uspSaveTemplateAndGenerateDataForProject]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspSaveTemplateAndGenerateDataForProject]
@ProjectId as int
, @TemplateId as int
, @UserId as int
as
begin
	set nocount on
	begin try
		if(select ISNULL(StatusId, 1) from [Amplo].[DecompositionProject] where [DecompositionProjectID] = @ProjectId) = 1
		begin
			declare @UserName as nvarchar(100) = (select top 1 UserName from amplo.[User] where UserId = @UserId)
			update [Amplo].[DecompositionProject] set [TemplateId] = @TemplateId, [ModifiedBy] = @UserName, [ModifiedDate] = GETDATE()
			where [DecompositionProjectID] = @ProjectId


			--------- Insert level 1 template data start -----------
			Declare @clientid as INT
			Select @clientid = ClientID from Amplo.[User] where UserID = @UserId

			exec [Amplo].[uspAddProcessLevel1Template] @UserId, @ProjectId, @TemplateId

			--Insert into Amplo.DecompositionProcessLevel1(
			--   [ClientID]
			--  ,[DecompositionProjectID]
			--  ,[ProcessLevel1Name]
			--  ,[ProcessLevel1Title]
			--  ,[ActiveFlag]
			--  ,[LockedFlag]
			--  ,[Status]
			--  ,[DesignChoice]
			--  ,[UserID]
			--  ,[GridViewLocationID]
			--  ,[GridVViewLocationFlag]
			--  ,[FunctionID]
			--  ,[PhaseID]
			--)
			--select 
			--@clientid,
			--@ProjectId,
			--l1Main.ProcessLevel1Name,
			--l1Main.ProceeLevel1Title,
			--1,
			--0,
			--1,--Insert status here
			--l1Main.DesignChoice,
			--@UserId,
			--l1Main.GridViewLocationID,
			--l1Main.GridVViewLocationFlag,
			--l1Main.DecompositionFunctionID,
			--l1Main.DecompositionPhaseID
			--from Amplo.AmploDecompositionProcessLevel1Template l1Main where ActiveFlag = 1 and TemplateId = @TemplateId
    

			--INSERT INTO [Amplo].[DecompositionProcessLevel1Score]
			--	   ([DecompositionProcessLevel1ID]
			--	   ,[LeafNodeLevelID]
			--	   ,[Level1_Calc_Aggr_Score]
			--	   ,[Avg_Score_Weight]
			--	   ,[LeafNodeFlag]
			--	   ,[Owner]
			--	   )
			--	   select DecompositionProcessLevel1Id
			--	   ,1.1
			--	   ,0.0
			--	   ,2
			--	   ,0
			--	   ,NULL
			--	   from Amplo.DecompositionProcessLevel1 where DecompositionProjectID = @ProjectId



				INSERT INTO [Amplo].[DecompositionFunctionProject]
				   ([ClientID]
					,[UserID]
				   ,[DecompositionProjectID]
				   ,[IndustryID]
				   ,[IndustryVerticalID]
				   ,[IndustrySubVerticalID]
				   ,[FunctionName]
				   ,[FunctionTitle]
				   ,[FunctionDescription]
				   ,[FunctionMeaning]
				   ,[ProcesDeisgnChoice]
				   ,[ActiveFlag]
				   ,[CreatedBy]
				   ,[CreatedDate]
				   ,[ModifiedBy]
				   ,[ModifiedDate]
				   ,[FunctionNumber])
			 select @ClientId
				   ,@UserId
				   ,@ProjectId
				   ,[IndustryID]
				   ,[IndustryVerticalID]
				   ,[IndustrySubVerticalID]
				   ,[FunctionName]
				   ,FunctionTilte
				   ,[FunctionDescription]
				   ,[FunctionMeaning]
				   ,[ProcesDeisgnChoice]
				   ,1
				   ,@UserId
				   ,GETDATE()
				   ,NULL
				   ,NULL
				   ,[FunctionNumber] from [Amplo].[DecompositionFunction]
				   where [DecompositionFunctionID] in 
					(select FunctionId from [Amplo].[CMTempFrameStructure] where ActiveFlag = 1 and TemplateId = @TemplateId)

				INSERT INTO [Amplo].[DecompositionPhaseProject]
				   ([ClientID]
				   ,[UserID]
				   ,[DecompositionProjectID]
				   ,[PhaseName]
				   ,[PhaseTitle]
				   ,[PhaseDescription]
				   ,[PhaseMeaning]
				   ,[ActiveFlag]
				   ,[CreatedBy]
				   ,[CreatedDate]
				   ,[ModifiedBy]
				   ,[ModifiedDate]
				   ,[PhaseNumber])
			 select top 3 @ClientId
				   ,@UserId
				   ,@ProjectId
				   ,[PhaseName]
				   ,[PhaseTitle]
				   ,[PhaseDescription]
				   ,[PhaseMeaning]
				   ,1
				   ,@UserId
				   ,GETDATE()
				   ,NULL
				   ,NULL
				   ,[PhaseNumber] from [Amplo].[DecompositionPhase]
				where [DecompositionPhaseID] in 
				(select PhaseId from [Amplo].[CMTempFrameStructure] where ActiveFlag = 1 and TemplateId = @TemplateId)

			INSERT INTO [Amplo].[DecompositionScoreCriteriaProject]
				   ([ServiceID]
				   ,[ClientID]
				   ,[DecompositionProjectID]
				   ,[DecompositionProcessLevel1ID]
				 ,[ScoreCriteriaName]
				   ,[ScoreCriteriaActualName]
				   ,[ScoreCriteriaTitle]
				   ,[ScoreCriteriaDescription]
				   ,[SeededFlag]
				   ,[UsedFlag])
			 select ServiceID
					, @ClientId
					, @ProjectId
					, dp.DecompositionProcessLevel1ID
					, ScoreCriteriaName
					, ScoreCriteriaActualName
					, ScoreCriteriaTitle
					, ScoreCriteriaDescription
					, SeededFlag
					, UsedFlag from [Amplo].[DecompositionScoreCriteria]
			join [Amplo].[DecompositionProcessLevel1] dp on (dp.[DecompositionProjectID] = @ProjectId)
		end
	end try
	begin catch
		exec amplo.uspLogError
	end catch
end
GO
/****** Object:  StoredProcedure [Amplo].[uspScoreCriteriaExport]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspScoreCriteriaExport]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]
AS
BEGIN

	SET NOCOUNT ON;
	Declare @ScoreCriteria1 [VARCHAR](100) ;
	Declare @ScoreCriteria2 [VARCHAR](100) ;
	Declare @ScoreCriteria3 [VARCHAR](100) ;
	Declare @ScoreCriteria4 [VARCHAR](100) ;
	Declare @ScoreCriteria5 [VARCHAR](100) ;
	Declare @ScoreCriteria6 [VARCHAR](100) ;
    Declare @ScoreCriteria7 [VARCHAR](100) ;
	Declare @ScoreCriteria8 [VARCHAR](100) ;
	Declare @ScoreCriteria9 [VARCHAR](100) ;
	Declare @ScoreCriteria10 [VARCHAR](100) ;

	SET @ScoreCriteria1= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=1)
	SET @ScoreCriteria2= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=2)
	SET @ScoreCriteria3= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=3)
	SET @ScoreCriteria4= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=4)
	SET @ScoreCriteria5= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=5)
	SET @ScoreCriteria6= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=6)
	SET @ScoreCriteria7= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=7)
	SET @ScoreCriteria8= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=8)
	SET @ScoreCriteria9= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=9)
	SET @ScoreCriteria10= (select ScoreCriteriaName  from Amplo.DecompositionScoreCriteriaProject where DecompositionProjectID=@ProjectID and DecompositionProcessLevel1ID=@ProcessLevel1ID and UsedFlag=1 and DecompositionScoreCriteriaID=10)

	DROP TABLE if exists #DecompositionScoreCriteria;
	CREATE TABLE #DecompositionScoreCriteria
    (
		ScoringCriteriaColumn [varchar](100),
		
		ScoreCriteria1 [varchar](100), 
		ScoreCriteria2 [varchar](100),
		ScoreCriteria3 [varchar](100),
		ScoreCriteria4 [varchar](100),
		ScoreCriteria5 [varchar](100),
		ScoreCriteria6 [varchar](100),
		ScoreCriteria7 [varchar](100),
		ScoreCriteria8 [varchar](100),
		ScoreCriteria9 [varchar](100),
		ScoreCriteria10 [varchar](100)
	  );
   INSERT INTO #DecompositionScoreCriteria
    (
		ScoringCriteriaColumn,ScoreCriteria1,ScoreCriteria2,ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,ScoreCriteria9,ScoreCriteria10)
		VALUES
		(
			'Scoring Criteria New Title',@ScoreCriteria1,@ScoreCriteria2,@ScoreCriteria3,@ScoreCriteria4,@ScoreCriteria5,@ScoreCriteria6,@ScoreCriteria7,@ScoreCriteria8,@ScoreCriteria9,@ScoreCriteria10)

		
		


   --------------------------------------------------------------------------------------------------------------

--   DECLARE @Columns as VARCHAR(MAX)
--   Declare @ProjectID1 as Varchar(500)
 Declare @ProcessID1 as Varchar(500)
--   SET @ProjectID1 =CAST(@ProjectID as varchar(50));
   SET @ProcessID1 =CAST(@ProcessLevel1ID as varchar(50));
--SELECT @Columns =
--COALESCE(@Columns + ', ','') + QUOTENAME(ScoreCriteriaName)
--FROM
--   (SELECT DISTINCT P.ScoreCriteriaName
--    FROM   Amplo.DecompositionScoreCriteria P
--           INNER JOIN Amplo.DecompositionProcessLevel1 L
--           ON L.DecompositionProcessLevel1ID = P.DecompositionProcessLevel1ID and L.DecompositionProjectID =@ProjectID and L.ActiveFlag=1
--   ) AS B Order by B.ScoreCriteriaName
  -- PRINT (@Columns)

  --DECLARE @SQL AS NVARCHAR(MAX)

  Declare @cols nvarchar(max)
Declare @query nvarchar(max)

--Select @cols = stuff((select ','+QuoteName(Row_Number() over (Order by (Select NULL))) from Amplo.DecompositionScoreCriteria for xml path('')),1,1,'')
--Select @query = ' Select * from (
--    Select ScoreCriteriaName, RowN = Row_Number() over (order by ScoreCriteriaName) from Amplo.DecompositionScoreCriteria P 
--	where DecompositionProcessLevel1ID =' + @ProcessID1 + '
--    ) a
--    pivot (max(ScoreCriteriaName) for RowN in (' + @cols + ')) p '
--	PRINT(@query)
--Exec sp_executesql @query



  
select DISTINCT
	       
			ScoringCriteriaColumn,
		
		ISNULL(ScoreCriteria1 ,'') ScoreCriteria1, 
		ISNULL(ScoreCriteria2 ,'') ScoreCriteria2, 
		ISNULL(ScoreCriteria3  ,'') ScoreCriteria3, 
		ISNULL(ScoreCriteria4  ,'') ScoreCriteria4, 
		ISNULL(ScoreCriteria5  ,'') ScoreCriteria5, 
		ISNULL(ScoreCriteria6  ,'') ScoreCriteria6, 
		ISNULL(ScoreCriteria7  ,'') ScoreCriteria7, 
		ISNULL(ScoreCriteria8  ,'') ScoreCriteria8, 
		ISNULL(ScoreCriteria9  ,'') ScoreCriteria9, 
		ISNULL(ScoreCriteria10  ,'') ScoreCriteria10
		
		FROM #DecompositionScoreCriteria d 
		
		--PRINT(@SQL)

		--EXEC(@SQL)
		   
		
		



   

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBenchmarkingGoalSetting]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ==============================================================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	This procedure updates Benchmarking Goal setting details
-- ==============================================================================

CREATE PROCEDURE [Amplo].[uspUpdateBenchmarkingGoalSetting]
 (
    @UserID int,
    @projectid int,
    @domainid int,
--	@IndustryBenchmark float,
--	@ASISBenchmark float,
	@GoalSetting float
)
AS
BEGIN
/*
@UserID - Logged in userID
@projectid - Project for which update is required
@domainid - Domain against which update is required
@IndustryBenchmark - Industry Benchmarking Score
@ASISBenchmark - ASIS Benchmarking Score
@GoalSetting - Goal setting Benchmarking Score
@userIP - User's IP address

QuestionResponse table type -  questionid as int, responseid as int
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID

    BEGIN
    --Update existing responses in table

		UPDATE Amplo.BenchmarkingGoalSetting
		SET [GoalSetting] = @GoalSetting, [ModifedBy] = @UserID, [ModifiedDate]= Getdate()
--		SET [IndustryBenchmark] = @IndustryBenchmark, [GoalSetting] = @GoalSetting, [ASISBenchmark] = @ASISBenchmark, [ModifedBy] = @UserID, [ModifiedDate]= Getdate()
		where ClientID = @clientid and  [BenchmarkProjectID] = @projectid and [DomainID]=@domainid;
		-- Successfull updation of records
		SELECT messageName from Amplo.[Message] where MessageID = 1022

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

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END






GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBenchmarkingProjectLockStatus]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateBenchmarkingProjectLockStatus]
(
    @UserID int,
    @PProjectID int,
    @ProjectLockedFlag bit
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;

		Declare @ClientID as INT
		Select @ClientID = ClientID from Amplo.[User] where UserID = @UserID

		   
		UPDATE Amplo.BenchmarkProject 
		SET LockedFlag = @ProjectLockedFlag WHERE ClientID= @ClientID AND BenchmarkProjectID = @PProjectID;

		-- Successfull updation of records
		SELECT messageName from Amplo.[Message] where MessageID = 1029
		

        COMMIT TRANSACTION;

--        if @@ROWCOUNT > 0 
--            select 'Project status has been done successfully';
--        ELSE
--            select 'Project status has not been done successfully';
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



End;


GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBenchmarkiningGoalSetting]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 09-Sep-2019
-- Description:	This procedure retrieves Benchmarking ASIS score, TO Be score and Industry Benchmarking score for reporting purpose
-- =============================================
create PROCEDURE [Amplo].[uspUpdateBenchmarkiningGoalSetting]
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT ClientID, BenchmarkProjectID, DomainID, Response, QuestionWeight from Amplo.BenchmarkAssessment;

END


GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateBMProjectStatus]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateBMProjectStatus]
 (
    @projectid int
 )
AS
BEGIN
/*
@projectid - Project ID to update status of 
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;


--Update status

    Declare @DisabledStatus INT
    select @DisabledStatus = DisabledFlag from Amplo.BenchmarkProject where BenchmarkProjectID = @projectid
    IF @DisabledStatus = 1
    BEGIN
      --  Update Amplo.BenchmarkProject
     --   SET [status] = 6 where BenchmarkProjectID = @projectid 

     --Commented out as now 'Disabled' is not a status of master table but referenced by flag
        SELECT messageName from Amplo.[Message] where MessageID = 1015
        COMMIT
        RETURN
    END


    declare @LockStatus int
    select @LockStatus = LockedFlag from Amplo.BenchmarkProject where BenchmarkProjectID = @projectid

    IF @LockStatus = 1
    BEGIN
     --   Update Amplo.BenchmarkProject
     --   SET [status] = 5 where BenchmarkProjectID = @projectid 

     --Commented out as now 'Locked' is not a status of master table but referenced by flag
        SELECT messageName from Amplo.[Message] where MessageID = 1015
        COMMIT
        RETURN
    END
    
    ELSE 
    BEGIN
       
       ---IF ELSE FOR GOALS SET STATUS

       
        --count of questions in the domain
        declare @countQuestions int
        select @countQuestions = Count(ques.BenchmarkQuestionID) from
        (Select distinct(DomainID) from Amplo.UserDomainAccess where BenchmarkProjectID = @projectid) doms
        inner join Amplo.BenchmarkQuestion ques on doms.DomainID = ques.DomainID

        --count of responses in benchmark assessment
        declare @countResp INT
        select @countResp = Count(BenchmarkAssessmentID) from Amplo.BenchmarkAssessment where BenchmarkProjectID = @projectid and Response is not null
        
        update Amplo.BenchmarkProject
        Set [status]=
        CASE
            when @countResp = @countQuestions THEN 3
            when @countResp = 0 THEN 1
            when @countResp < @countQuestions THEN 2
        END
        where BenchmarkProjectID = @projectid
    END    

    
    -- Successfull updation of records
    SELECT messageName from Amplo.[Message] where MessageID = 1015
    
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
/****** Object:  StoredProcedure [Amplo].[uspUpdateBMQuestionsResponses]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateBMQuestionsResponses]
 (
    @id int,
--    @forSubmission AS Amplo.QuestionResponse READONLY,
    @QuestionID int,
    @ResponseID numeric(5, 2),
    @projectid int,
    @domainid int,
    @userIP varchar(20)
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    declare @username as varchar(100)
    select @username = UserName from Amplo.[User]

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    Declare @regionId as INT
    Declare @benchmarkProjectUserID as INT
    Select @benchmarkProjectUserID = BenchmarkProjectUserID from Amplo.BenchmarkProjectUser where UserID = @id and BenchmarkProjectID = @projectid

    declare @validity INT
    select @validity = COUNT(UserID) from Amplo.UserDomainAccess where UserID = @id and BenchmarkProjectID = @projectid and DomainID = @domainid and ActiveFlag = 1 

    IF @validity = 0
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    Declare @nowTime as DATETIME
    SET @nowTime= GETDATE()

    CREATE TABLE #QuestionResponses
    (
        questionid int,
        responseid numeric(5, 2)
    )

    insert into  #QuestionResponses
    VALUES (@QuestionID, @ResponseID);
	

    CREATE TABLE #QuestionResponse
    (
        questionid int,
        responseid numeric(5, 2)
    )

    insert into #QuestionResponse
    select questionId, responseID
    from #QuestionResponses
    --intersect (Select BenchmarkQuestionID, BenchmarkQuestionOptionID from Amplo.BenchmarkQuestionOption)

    --Update Audit log
    Insert into Amplo.BenchmarkAuditLog(
        [ClientID]
      ,[BenchmarkProjectID]
      ,[DomainID]
      ,[QuestionGroup]
      ,[QuestionSeries]
      ,[QuestionCategory]
      ,[QuestionID]
      ,[Question]
      ,[QuestionWeightage]
      ,[ResponseID]
      ,[Response]
      ,[ResponseUserID]
      ,[ResponseUserName]
      ,[ResponseTimeStamp]
      ,[DesignChoice]
      ,[FirstResponseFlag]
      ,[UserIPAddress]
    )
    select
    @clientid,
    @projectid,
    @domainid,
    ques.QuestionGroup,
    ques.QuestionSeries,
    ques.QuestionCategory,
    a.questionId,
    ques.Question,
    ques.QuestionWeightage,
    a.responseID,
    a.responseID, --opt.OptionName,
    @id,
    @username,
    @nowTime,
    ques.DesignChoice,
    NULL, --To be modified
    @userIP
    from #QuestionResponse a
    inner Join BenchmarkQuestion ques on a.questionId = ques.BenchmarkQuestionID and ques.DomainID = @domainid
    --inner join Amplo.BenchmarkQuestionOption opt on opt.BenchmarkQuestionOptionID = a.responseID
    inner join Amplo.UserDomainAccess userDets on userDets.DomainID = ques.DomainID and userDets.BenchmarkProjectID = @projectid and userDets.UserID=@id and userDets.ActiveFlag = 1

    -- BY default question weightage taken as 1 for all questions

    --Update existing responses in table
    Update Amplo.BenchmarkAssessment
    Set LastResponse = ResponseId, LastResponseBy = @id, LastResponseDate = GETDATE()
    from 
	--Amplo.BenchmarkAssessment BMA inner join 
	#QuestionResponse rcvd 
	--LastResponse = Response, LastResponseBy = RessponseUserID, LastResponseDate = ResponseDate
 --   from 
	--Amplo.BenchmarkAssessment BMA 
	--inner join 
	--#QuestionResponse rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid 
    
    Update Amplo.BenchmarkAssessment
    Set Response = rcvd.responseId, RessponseUserID=@id, ResponseDate = @nowTime, ModifedBy = @id, ModifiedDate = @nowTime 
    from Amplo.BenchmarkAssessment BMA inner join #QuestionResponse rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid 
   

-- Response for these questions do not exist in Assessment table - Insert
    
    --Set as NULL values which are already present in benchmark assessment table
    Update #QuestionResponse
    SET questionId = NULL, responseID = NULL
    from Amplo.BenchmarkAssessment BMA 
    inner join #QuestionResponse rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid
    Insert into Amplo.BenchmarkAssessment(
       [BenchmarkProjectID]
      ,[RegionID]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[DomainID]
      ,[GroupID]
      ,[QuestionID]
      ,[Response]
      ,[RessponseUserID]
      ,[ResponseDate]
      ,[LastResponse]
      ,[LastResponseBy]
      ,[LastResponseDate]
      ,[ResponseComments]
      ,[QuestionWeight]
      ,[BenchMark]
      ,[CreadedBy]
      ,[CreatedOn]
      ,[ModifedBy]
      ,[ModifiedDate]
    )
    Select 
        @projectid,
        @regionId,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
        @domainid,
        NULL,
        questionId,
        responseID,
        @id,
        @nowTime,
        NULL,
        NULL,
        NULL,
        NULL,
        1,
        NULL,
        @id,
        @nowTime,
        NULL,
        NULL
    from (select * from #QuestionResponse where questionId IS NOT NULL and responseID IS NOT NULL) ques
    inner join Amplo.BenchmarkQuestion domFilter on domFilter.BenchmarkQuestionID = ques.questionId and domFilter.DomainID = @domainid 
    inner join Amplo.UserDomainAccess userDets on userDets.DomainID = domFilter.DomainID and userDets.BenchmarkProjectID = @projectid and userDets.UserID=@id and userDets.ActiveFlag = 1 

	update Amplo.BenchmarkingGoalSetting
	set ASISBenchmark = (select AVG(response) from Amplo.BenchmarkAssessment
	where BenchmarkProjectID = @projectid and DomainID=@domainid group by DomainID)
	where BenchmarkProjectID = @projectid and DomainID = @domainid


-- Successfull updation of records
    SELECT messageName from Amplo.[Message] where MessageID = 1015

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateBMQuestionsResponses_15112019]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateBMQuestionsResponses_15112019]
 (
    @id int,
--    @forSubmission AS Amplo.QuestionResponse READONLY,
    @QuestionID int,
    @ResponseID numeric(5, 2),
    @projectid int,
    @domainid int,
    @userIP varchar(20)
 )
AS
BEGIN
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    declare @username as varchar(100)
    select @username = UserName from Amplo.[User]

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    Declare @regionId as INT
    Declare @benchmarkProjectUserID as INT
    Select @benchmarkProjectUserID = BenchmarkProjectUserID from Amplo.BenchmarkProjectUser where UserID = @id and BenchmarkProjectID = @projectid

    declare @validity INT
    select @validity = COUNT(UserID) from Amplo.UserDomainAccess where UserID = @id and BenchmarkProjectID = @projectid and DomainID = @domainid and ActiveFlag = 1 

    IF @validity = 0
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    Declare @nowTime as DATETIME
    SET @nowTime= GETDATE()

    CREATE TABLE #QuestionResponses
    (
        questionid int,
        responseid numeric(5, 2)
    )

    insert into  #QuestionResponses
    VALUES (@QuestionID, @ResponseID);
	

    CREATE TABLE #QuestionResponse
    (
        questionid int,
        responseid numeric(5, 2)
    )

    insert into #QuestionResponse
    select questionId, responseID
    from #QuestionResponses
    --intersect (Select BenchmarkQuestionID, BenchmarkQuestionOptionID from Amplo.BenchmarkQuestionOption)

    --Update Audit log
    Insert into Amplo.BenchmarkAuditLog(
        [ClientID]
      ,[BenchmarkProjectID]
      ,[DomainID]
      ,[QuestionGroup]
      ,[QuestionSeries]
      ,[QuestionCategory]
      ,[QuestionID]
      ,[Question]
      ,[QuestionWeightage]
      ,[ResponseID]
      ,[Response]
      ,[ResponseUserID]
      ,[ResponseUserName]
      ,[ResponseTimeStamp]
      ,[DesignChoice]
      ,[FirstResponseFlag]
      ,[UserIPAddress]
    )
    select
    @clientid,
    @projectid,
    @domainid,
    ques.QuestionGroup,
    ques.QuestionSeries,
    ques.QuestionCategory,
    a.questionId,
    ques.Question,
    ques.QuestionWeightage,
    a.responseID,
    a.responseID, --opt.OptionName,
    @id,
    @username,
    @nowTime,
    ques.DesignChoice,
    NULL, --To be modified
    @userIP
    from #QuestionResponse a
    inner Join BenchmarkQuestion ques on a.questionId = ques.BenchmarkQuestionID and ques.DomainID = @domainid
    --inner join Amplo.BenchmarkQuestionOption opt on opt.BenchmarkQuestionOptionID = a.responseID
    inner join Amplo.UserDomainAccess userDets on userDets.DomainID = ques.DomainID and userDets.BenchmarkProjectID = @projectid and userDets.UserID=@id and userDets.ActiveFlag = 1

    -- BY default question weightage taken as 1 for all questions

    --Update existing responses in table
    Update Amplo.BenchmarkAssessment
    Set LastResponse = ResponseId, LastResponseBy = @id, LastResponseDate = GETDATE()
    from 
	--Amplo.BenchmarkAssessment BMA inner join 
	#QuestionResponse rcvd 
	--LastResponse = Response, LastResponseBy = RessponseUserID, LastResponseDate = ResponseDate
 --   from 
	--Amplo.BenchmarkAssessment BMA 
	--inner join 
	--#QuestionResponse rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid 
    
    Update Amplo.BenchmarkAssessment
    Set Response = rcvd.responseId, RessponseUserID=@id, ResponseDate = @nowTime, ModifedBy = @id, ModifiedDate = @nowTime 
    from Amplo.BenchmarkAssessment BMA inner join #QuestionResponse rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid 
   

-- Response for these questions do not exist in Assessment table - Insert
    
    --Set as NULL values which are already present in benchmark assessment table
    Update #QuestionResponse
    SET questionId = NULL, responseID = NULL
    from Amplo.BenchmarkAssessment BMA 
    inner join #QuestionResponse rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid
    Insert into Amplo.BenchmarkAssessment(
       [BenchmarkProjectID]
      ,[RegionID]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[DomainID]
      ,[GroupID]
      ,[QuestionID]
      ,[Response]
      ,[RessponseUserID]
      ,[ResponseDate]
      ,[LastResponse]
      ,[LastResponseBy]
      ,[LastResponseDate]
      ,[ResponseComments]
      ,[QuestionWeight]
      ,[BenchMark]
      ,[CreadedBy]
      ,[CreatedOn]
      ,[ModifedBy]
      ,[ModifiedDate]
    )
    Select 
        @projectid,
        @regionId,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
        @domainid,
        NULL,
        questionId,
        responseID,
        @id,
        @nowTime,
        NULL,
        NULL,
        NULL,
        NULL,
        1,
        NULL,
        @id,
        @nowTime,
        NULL,
        NULL
    from (select * from #QuestionResponse where questionId IS NOT NULL and responseID IS NOT NULL) ques
    inner join Amplo.BenchmarkQuestion domFilter on domFilter.BenchmarkQuestionID = ques.questionId and domFilter.DomainID = @domainid 
    inner join Amplo.UserDomainAccess userDets on userDets.DomainID = domFilter.DomainID and userDets.BenchmarkProjectID = @projectid and userDets.UserID=@id and userDets.ActiveFlag = 1 


-- Successfull updation of records
    SELECT messageName from Amplo.[Message] where MessageID = 1015

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateBMQuestionsResponses_Aashay]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateBMQuestionsResponses_Aashay]
 (
    @id int,
    @forSubmission AS Amplo.QuestionResponse READONLY,
    @projectid int,
    @domainid int,
    @userIP varchar(20)
 )
AS
BEGIN
/*
@id - Logged in userID
@quesResp - Question Response mapping table
@projectid - Project for which update is required
@domainid - Domain against which update is required
@userIP - User's IP address

QuestionResponse table type -  questionid as int, responseid as int
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

    Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @id

    declare @username as varchar(100)
    select @username = UserName from Amplo.[User]

    Declare @industryid as INT
    Select @industryid = IndustryID from Amplo.[Client] where ClientID = @clientid

    Declare @industryverticalid as INT
    Declare @industrysubverticalid as INT
    Select @industryverticalid = IndustryVerticalID, @industrysubverticalid= IndustrySubVerticalID from Amplo.[AmploCompanyProfile] where ClientID = @clientid

    Declare @regionId as INT
    Declare @benchmarkProjectUserID as INT
    Select @benchmarkProjectUserID = BenchmarkProjectUserID from Amplo.BenchmarkProjectUser where UserID = @id and BenchmarkProjectID = @projectid

    declare @validity INT
    select @validity = COUNT(UserID) from Amplo.UserDomainAccess where UserID = @id and BenchmarkProjectID = @projectid and DomainID = @domainid and ActiveFlag = 1 

    IF @validity = 0
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    Declare @nowTime as DATETIME
    SET @nowTime= GETDATE()

    declare @quesResp Amplo.QuestionResponse
    insert into @quesResp
    select questionId, responseID
    from @forSubmission 
    intersect (Select BenchmarkQuestionID, BenchmarkQuestionOptionID from Amplo.BenchmarkQuestionOption)

    --Update Audit log
    Insert into Amplo.BenchmarkAuditLog(
        [ClientID]
      ,[BenchmarkProjectID]
      ,[DomainID]
      ,[QuestionGroup]
      ,[QuestionSeries]
      ,[QuestionCategory]
      ,[QuestionID]
      ,[Question]
      ,[QuestionWeightage]
      ,[ResponseID]
      ,[Response]
      ,[ResponseUserID]
      ,[ResponseUserName]
      ,[ResponseTimeStamp]
      ,[DesignChoice]
      ,[FirstResponseFlag]
      ,[UserIPAddress]
    )
    select
    @clientid,
    @projectid,
    @domainid,
    ques.QuestionGroup,
    ques.QuestionSeries,
    ques.QuestionCategory,
    a.questionId,
    ques.Question,
    ques.QuestionWeightage,
    a.responseID,
    opt.OptionName,
    @id,
    @username,
    @nowTime,
    ques.DesignChoice,
    NULL, --To be modified
    @userIP
    from @quesResp a
    inner Join BenchmarkQuestion ques on a.questionId = ques.BenchmarkQuestionID and ques.DomainID = @domainid
    inner join Amplo.BenchmarkQuestionOption opt on opt.BenchmarkQuestionOptionID = a.responseID
    inner join Amplo.UserDomainAccess userDets on userDets.DomainID = ques.DomainID and userDets.BenchmarkProjectID = @projectid and userDets.UserID=@id and userDets.ActiveFlag = 1




    -- BY default question weightage taken as 1 for all questions

    --Update existing responses in table
    Update Amplo.BenchmarkAssessment
    Set LastResponse = Response, LastResponseBy = RessponseUserID, LastResponseDate = ResponseDate
    from Amplo.BenchmarkAssessment BMA inner join @quesResp rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid 
    
    Update Amplo.BenchmarkAssessment
    Set Response = rcvd.responseId, RessponseUserID=@id, ResponseDate = @nowTime, ModifedBy = @id, ModifiedDate = @nowTime 
    from Amplo.BenchmarkAssessment BMA inner join @quesResp rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid 
   

-- Response for these questions do not exist in Assessment table - Insert
    
    --Set as NULL values which are already present in benchmark assessment table
    Update @quesResp
    SET questionId = NULL, responseID = NULL
    from Amplo.BenchmarkAssessment BMA 
    inner join @quesResp rcvd on BMA.QuestionID = rcvd.questionId AND BMA.BenchmarkProjectID = @projectid and BMA.DomainID = @domainid
    

    Insert into Amplo.BenchmarkAssessment(
       [BenchmarkProjectID]
      ,[RegionID]
      ,[IndustryID]
      ,[IndustryVerticalID]
      ,[IndustrySubVerticalID]
      ,[DomainID]
      ,[GroupID]
      ,[QuestionID]
      ,[Response]
      ,[RessponseUserID]
      ,[ResponseDate]
      ,[LastResponse]
      ,[LastResponseBy]
      ,[LastResponseDate]
      ,[ResponseComments]
      ,[QuestionWeight]
      ,[BenchMark]
      ,[CreadedBy]
      ,[CreatedOn]
      ,[ModifedBy]
      ,[ModifiedDate]
    )
    Select 
        @projectid,
        @regionId,
        @industryid,
        @industryverticalid,
        @industrysubverticalid,
        @domainid,
        NULL,
        questionId,
        responseID,
        @id,
        @nowTime,
        NULL,
        NULL,
        NULL,
        NULL,
        1,
        NULL,
        @id,
        @nowTime,
        NULL,
        NULL
    from (select * from @quesResp where questionId IS NOT NULL and responseID IS NOT NULL) ques
    inner join Amplo.BenchmarkQuestion domFilter on domFilter.BenchmarkQuestionID = ques.questionId and domFilter.DomainID = @domainid 
    inner join Amplo.UserDomainAccess userDets on userDets.DomainID = domFilter.DomainID and userDets.BenchmarkProjectID = @projectid and userDets.UserID=@id and userDets.ActiveFlag = 1 


-- Successfull updation of records
    SELECT messageName from Amplo.[Message] where MessageID = 1015

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateCapabilityModellingClientProject]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateCapabilityModellingClientProject]
 (
    @id int,
    @CapabilityProjectID int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@CapabilityProjectID - ID of project to update
@CapabilityProjectName - Name of Capability Project to be set to
@userids - comma separated string of userids to map to set
*/
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
    
    DECLARE @ReceivedUserIDs TABLE (
    userIDs int
    );

    --Filter out received  users who are valid approved members of client company 
    INSERT INTO @ReceivedUserIDs
    SELECT * 
    FROM String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @ReceivedUserIDs a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    --AND DisableDate > GETDATE()
    ) b
    on a.userids = b.UserID

   declare @ifNameReturnedNullRetainName varchar(100)
   select @ifNameReturnedNullRetainName = ProjectName from Amplo.DecompositionProject where DecompositionProjectID = @CapabilityProjectID

   --Change Name of  Capability Modelling Project
    Update Amplo.DecompositionProject
    set ProjectName = ISNULL(@CapabilityProjectName, @ifNameReturnedNullRetainName), ModifiedBy = @id, ModifiedDate = GETDATE() WHERE DecompositionProjectID = @CapabilityProjectID

    --List of users mapped to selected project
    DECLARE @MappedUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @MappedUserIDs
    SELECT UserID
    FROM [Amplo].[DecompositionProjectUser] where DecompositionProjectID = @CapabilityProjectID and ActiveFlag = 1

    DECLARE @ToRemoveUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ToRemoveUserIDs
    SELECT  toRem.userIDs 
    FROM    @MappedUserIDs toRem LEFT JOIN @ValidUserIDs new 
    ON new.userIDs = toRem.userIDs
    WHERE new.userIDs IS NULL

    DECLARE @ToAddUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ToAddUserIDs
    SELECT  new.userIDs 
    FROM    @MappedUserIDs toRem Right JOIN @ValidUserIDs new 
    ON new.userIDs = toRem.userIDs
    WHERE toRem.userIDs IS NULL

    --Remove User access to Capability Modelling Project
    Update Amplo.DecompositionProjectUser
    SET ActiveFlag = 0, ModifiedBy= @id, ModifiedDate = GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) and DecompositionProjectID = @CapabilityProjectID


    --Remove Phase and function for the user for the project
    --TO Be added when the mapping is discussed and finalized
/*
    Update Amplo.UserDomainAccess
    SET ActiveFlag = 0, ModifiedBy = @id, ModifiedDate= GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) AND BenchmarkProjectID = @assessmentsetid 
*/

    --Map new users to Capability Modelling Project 
-- 1 taken as default for activity Flag . To be modified when requirements finalized

    INSERT INTO Amplo.DecompositionProjectUser(
    --   [DecompositionProjectUserName]
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
    --  ,[ProductionFlag]
      ,[CreatedBy]
      ,[CreatedDate]
    --  ,[ModifiedBy]
    --  ,[ModifiedDate]
      ,[ActivityFlag]
    )
    SELECT 
        @CapabilityProjectID,
        @clientID,
        userIDs,
        1,
        @id,
        GETDATE(),
        1
    from @ToAddUserIDs

   -- Add Phase and function for the user for the project
    --TO Be added when the mapping is discussed and finalized
/*
    declare  @domainMap Table(
       userid int,
       domainid int
   ) 

    insert into @domainMap
    select b.userids, a.domainID
    from (select DomainID from Amplo.AmploDomain where ActiveFlag=1) a  
    cross join @ToAddUserIDs b

    -- Access Type - 1- Read+Write, 2 - Read Only, 3- No Access
    INSERT INTO Amplo.[UserDomainAccess](
       [ClientID]
      ,[UserID]
      ,[DomainID]
      ,[AccessType]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[BenchmarkProjectID]
    )
    Select
        @clientid,
        userid,
        domainid,
        1,
        1,
        @id,
        GETDATE(),
        @assessmentsetid
    from @domainMap
*/
    Select messageName from Amplo.[Message] where MessageID = 1020

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateCapabilityModellingClientProject2]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateCapabilityModellingClientProject2]
 (
    @id int,
    @CapabilityProjectID int,
    @CapabilityProjectName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@CapabilityProjectID - ID of project to update
@CapabilityProjectName - Name of Capability Project to be set to
@userids - comma separated string of userids to map to set
*/
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
    
    DECLARE @ReceivedUserIDs TABLE (
    userIDs int
    );

    --Filter out received  users who are valid approved members of client company 
    INSERT INTO @ReceivedUserIDs
    SELECT * 
    FROM String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @ReceivedUserIDs a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    --AND DisableDate > GETDATE()
    ) b
    on a.userids = b.UserID

   declare @ifNameReturnedNullRetainName varchar(100)
   select @ifNameReturnedNullRetainName = ProjectName from Amplo.DecompositionProject where DecompositionProjectID = @CapabilityProjectID

   --Change Name of  Capability Modelling Project
    Update Amplo.DecompositionProject
    set ProjectName = ISNULL(@CapabilityProjectName, @ifNameReturnedNullRetainName), ModifiedBy = @id, ModifiedDate = GETDATE() WHERE DecompositionProjectID = @CapabilityProjectID

    --List of users mapped to selected project
    DECLARE @MappedUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @MappedUserIDs
    SELECT UserID
    FROM [Amplo].[DecompositionProjectUser] where DecompositionProjectID = @CapabilityProjectID and ActiveFlag = 1

    DECLARE @ToRemoveUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ToRemoveUserIDs
    SELECT  toRem.userIDs 
    FROM    @MappedUserIDs toRem LEFT JOIN @ValidUserIDs new 
    ON new.userIDs = toRem.userIDs
    WHERE new.userIDs IS NULL

    DECLARE @ToAddUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ToAddUserIDs
    SELECT  new.userIDs 
    FROM    @MappedUserIDs toRem Right JOIN @ValidUserIDs new 
    ON new.userIDs = toRem.userIDs
    WHERE toRem.userIDs IS NULL

    --Remove User access to Capability Modelling Project
    Update Amplo.DecompositionProjectUser
    SET ActiveFlag = 0, ModifiedBy= @id, ModifiedDate = GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) and DecompositionProjectID = @CapabilityProjectID


    --Remove Phase and function for the user for the project
    Update Amplo.[DecompositionUserAccess]
    SET ActiveFlag = 0, ModifedBy = @id, ModifiedDate= GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) and DecompositionProjectID = @CapabilityProjectID


    --Map new users to Capability Modelling Project 

    INSERT INTO Amplo.DecompositionProjectUser(
    --   [DecompositionProjectUserName]
      [DecompositionProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActiveFlag]
    --  ,[ProductionFlag]
      ,[CreatedBy]
      ,[CreatedDate]
    --  ,[ModifiedBy]
    --  ,[ModifiedDate]
      ,[ActivityFlag]
    )
    SELECT 
        @CapabilityProjectID,
        @clientID,
        userIDs,
        1,
        @id,
        GETDATE(),
        1
    from @ToAddUserIDs

   -- Add Phase and function for the user for the project
    declare @functionNetMap TABLE(
       functionID int 
    )

    insert into @functionNetMap
    select DecompositionFunctionID from Amplo.DecompositionFunction where ActiveFlag = 1
    
    --Industry filters to be applied after MVP1


      declare @phaseNetMap TABLE(
       phaseID int
    )

    insert into @phaseNetMap
    select DecompositionPhaseID from Amplo.DecompositionPhase where ActiveFlag = 1
    --Industry filters to be applied after MVP1

    declare  @phaseFunctionUserMap Table(
       userid int,
       functionID int,
       phaseID int
   ) 

    insert into @phaseFunctionUserMap
    SELECT usr.userIDs, fn.functionID, ph.phaseID
    from (select userIDs from @ValidUserIDs) usr
    cross join @functionNetMap fn
    cross join @phaseNetMap ph

-- Insert User mapping to phases and functions
    INSERT INTO Amplo.[DecompositionUserAccess](
       [UserAccessName]
      ,[UserAccessDescription]
      ,[ClientID]
      ,[UserID]
      ,[DecompositionProjectID]
      ,[FunctionID]
      ,[PhaseID]
      ,[ActiveFlag]
      ,[CreadedBy]
      ,[CreatedDate]
    )
    Select
        NULL,
        NULL,
        @clientid,
        userid,
        @CapabilityProjectID,
        functionID,
        phaseID,
        1,
        @id,
        GETDATE()
    from @phaseFunctionUserMap


    Select messageName from Amplo.[Message] where MessageID = 1020

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateClientAudit]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateClientAudit]
 (
		@ClientID [int]
       ,@AuditFrequency nvarchar(100)
       ,@FirstAuditDate datetime
       ,@RecentAuditDate datetime
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

--            declare @clientId INT
--            select @clientId = ClientID from Amplo.[User] where UserID = @UserID and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

            declare @alreadyInput int
            select @alreadyInput = Count(ClientAuditID) from Amplo.ClientAudit where ClientID = @clientId 

            if @alreadyInput = 0
            --If company profile not entered even once yet. Insert
            BEGIN

			INSERT INTO [Amplo].[ClientAudit]
						([ClientID]
						,[AuditFrequency]
						,[FirstAuditDate]
						,[RecentAuditDate])
					VALUES
						(@ClientID
						,@AuditFrequency
						,@FirstAuditDate
						,@RecentAuditDate)

  --      declare @createdCompanyProfileID int
        
--            SELECT @CompanyProfileID = SCOPE_IDENTITY();

    END

    ELSE
        BEGIN

			UPDATE [Amplo].[ClientAudit]
			   SET [AuditFrequency] = @AuditFrequency
				  ,[FirstAuditDate] = @FirstAuditDate
				  ,[RecentAuditDate] = @RecentAuditDate
			 WHERE ClientID = @ClientID

    --Success Message

        select MessageName from Amplo.[Message] where MessageID = 1021
		end

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateClientProject]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateClientProject]
 (
    @id int,
    @assessmentsetid int,
    @assessmentSetName varchar(100),
    @userids varchar(max)
 )
AS
BEGIN
/*
@id - Logged in userID
@assessmentsetid - ID of assessment to update
@assessmentSetName - Name of new set
@userids - comma separated string of userids to map to set
*/
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
    
    DECLARE @ReceivedUserIDs TABLE (
    userIDs int
    );

    --Filter out received  users who are valid approved members of client company 
    INSERT INTO @ReceivedUserIDs
    SELECT * 
    FROM String_Split(@userids, ',')

    DECLARE @ValidUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ValidUserIDs
    SELECT userids 
    FROM @ReceivedUserIDs a
    inner join (Select UserID from Amplo.[User] where ClientID = @clientid and ActiveFlag = 1 and EmailValidationStatus = 1 and UserStatusID = 1  
    --AND DisableDate > GETDATE()
    ) b
    on a.userids = b.UserID

    
   declare @ifNameReturnedNullRetainName varchar(100)
   select @ifNameReturnedNullRetainName = BenchmarkProjectName from Amplo.BenchmarkProject where BenchmarkProjectID = @assessmentsetid

   --Change Name of Benchmark Project
    Update Amplo.BenchmarkProject
    set BenchmarkProjectName = ISNULL(@assessmentSetName, @ifNameReturnedNullRetainName), ModifiedBy = @id, ModifiedDate = GETDATE() WHERE BenchmarkProjectID = @assessmentsetid

    --List of users mapped to selected project
    DECLARE @MappedUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @MappedUserIDs
    SELECT UserID
    FROM [Amplo].[BenchmarkProjectUser] where BenchmarkProjectID = @assessmentsetid and ActiveFlag = 1

    DECLARE @ToRemoveUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ToRemoveUserIDs
    SELECT  toRem.userIDs 
    FROM    @MappedUserIDs toRem LEFT JOIN @ValidUserIDs new 
    ON new.userIDs = toRem.userIDs
    WHERE new.userIDs IS NULL

    DECLARE @ToAddUserIDs TABLE (
    userIDs int
    );

    INSERT INTO @ToAddUserIDs
    SELECT  new.userIDs 
    FROM    @MappedUserIDs toRem Right JOIN @ValidUserIDs new 
    ON new.userIDs = toRem.userIDs
    WHERE toRem.userIDs IS NULL

    --Remove User access to Benchmark Project
    Update Amplo.BenchmarkProjectUser
    SET ActiveFlag = 0, ModifiedBy= @id, ModifiedDate = GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) and BenchmarkProjectID = @assessmentsetid

    --Remove domain access for the user for the project
    Update Amplo.UserDomainAccess
    SET ActiveFlag = 0, ModifiedBy = @id, ModifiedDate= GETDATE() where UserID IN (SELECT userids FROM @ToRemoveUserIDs) AND BenchmarkProjectID = @assessmentsetid 


    --Map new users to Benchmark Project 
    INSERT INTO Amplo.BenchmarkProjectUser(
       [BenchmarkProjectID]
      ,[ClientID]
      ,[UserID]
      ,[ActivityFlag]
      ,[ActiveFlag]
     -- ,[DisableDate]
      ,[CreatedBy]
      ,[CreatedDate]
    )
    SELECT 
        @assessmentsetid,
        @clientID,
        userIDs,
        1,
        1,
        @id,
        GETDATE()
    from @ToAddUserIDs

   -- Add domain mapping for new users added
    declare  @domainMap Table(
       userid int,
       domainid int
   ) 

    insert into @domainMap
    select b.userids, a.domainID
    from (select DomainID from Amplo.AmploDomain where ActiveFlag=1) a  
    cross join @ToAddUserIDs b

    -- Access Type - 1- Read+Write, 2 - Read Only, 3- No Access
    INSERT INTO Amplo.[UserDomainAccess](
       [ClientID]
      ,[UserID]
      ,[DomainID]
      ,[AccessType]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
      ,[BenchmarkProjectID]
    )
    Select
        @clientid,
        userid,
        domainid,
        1,
        1,
        @id,
        GETDATE(),
        @assessmentsetid
    from @domainMap

    Select messageName from Amplo.[Message] where MessageID = 1012

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateCompanyProfile]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateCompanyProfile]
 (
    @UserID int,
--	@ClientID int,
    @CountryRegionCodeID int,
    @IndustryVerticalID int,
    @IndustrySubVerticalID int,
    @NoOfEmployees int,
    @Country varchar(100),
    @StateTerritory varchar(100),
    @City nvarchar(50),
    @PostalCode NVARCHAR(15),
	@Address1 NVARCHAR(100),
	@Address2 NVARCHAR(100),
	@CompanyLogo NVARCHAR(100)
--	@ClientName nvarchar(255)
--    @CompanyProfileID INT OUTPUT
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

            declare @IndustryID INT
            select IndustryID from Amplo.[Client] where ClientID = @clientId and ActiveFlag = 1

            declare @alreadyInput int
            select @alreadyInput = Count(CompanyProfileID) from Amplo.AmploCompanyProfile where ClientID = @clientId 

            if @alreadyInput = 0
            --If company profile not entered even once yet. Insert
            BEGIN

                Insert into Amplo.AmploCompanyProfile
                (
                    [ClientID]
                    ,[CountryRegionCodeID]
                    ,[IndustryID]
                    ,[IndustryVerticalID]
                    ,[IndustrySubVerticalID]
                    ,[NoOfEmployees]
                    ,[Country]
                    ,[StateTerritory]
                    ,[City]
                    ,[PostalCode]
                    ,[ActiveFlag]
                    ,[CreatedBy]
                    ,[CreatedDate]
					,[Address1]
					,[Address2]
					,[CompanyLogo]
--					,[ClientName]
                )
                Values(
                    @clientId,
                    @CountryRegionCodeID,
                    @IndustryID,
                    @IndustryVerticalID,
                    @IndustrySubVerticalID,
                    @NoOfEmployees,
                    @Country,
                    @StateTerritory,
                    @City,
                    @PostalCode,
                    1,
                    @UserID,
                    GETDATE(),
				    @Address1,
				    @Address2,
				    @CompanyLogo
--					@ClientName
                )

  --      declare @createdCompanyProfileID int
        
--            SELECT @CompanyProfileID = SCOPE_IDENTITY();

    END

    ELSE
        BEGIN

            declare @PCompanyProfileID int
            select @PCompanyProfileID = CompanyProfileID from Amplo.AmploCompanyProfile where clientID = @clientId and ActiveFlag = 1
            --SELECT @CompanyProfileID = @PCompanyProfileID

            UPDATE Amplo.AmploCompanyProfile
            SET [CountryRegionCodeID] = @CountryRegionCodeID
            ,[IndustryID] = @IndustryID
            ,[IndustryVerticalID] = @IndustryVerticalID
            ,[IndustrySubVerticalID] = @IndustrySubVerticalID
            ,[NoOfEmployees] = @NoOfEmployees
            ,[Country] = @Country
            ,[StateTerritory] = @StateTerritory
            ,[City] = @City
            ,[PostalCode] = @PostalCode
            ,[ModifiedBy] = @UserID
            ,[ModifiedDate] = GETDATE()
			,[Address1] = @Address1 
			,[Address2] = @Address2
			,[CompanyLogo] = @CompanyLogo
--			,[ClientName] = @ClientName
            where CompanyProfileID = @PCompanyProfileID
        END


    --Success Message

            select MessageName from Amplo.[Message] where MessageID = 1041

    --select @CompanyProfileID;

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateCompanyProfile_Aashay]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateCompanyProfile_Aashay]
 (
    @id int,
    @Responses AS Amplo.ProfilingResponses READONLY,
    @CountryRegionCodeID int,
  --  @IndustryID int,
    @IndustryVerticalID int,
    @IndustrySubVerticalID int,
    @NoOfEmployees int,
    @Country varchar(100),
    @StateTerritory varchar(100),
    @City nvarchar(50),
    @PostalCode NVARCHAR(15)
 )
AS
BEGIN
/*
@id - Logged in userID
@Responses AS Amplo.ProfilingResponses - Question ID alongwith Answer text
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   declare @clientId INT
   select @clientId = ClientID from Amplo.[User] where UserID = @id and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

   declare @IndustryID INT
   select IndustryID from Amplo.[Client] where ClientID = @clientId and ActiveFlag = 1

   declare @alreadyInput int
   select @alreadyInput = Count(CompanyProfileID) from Amplo.AmploCompanyProfile where ClientID = @clientId 

    if @alreadyInput = 0
    --If company profile not entered even once yet. Insert
    BEGIN

        Insert into Amplo.AmploCompanyProfile
        (
            [ClientID]
        ,[CountryRegionCodeID]
        ,[IndustryID]
        ,[IndustryVerticalID]
        ,[IndustrySubVerticalID]
        ,[NoOfEmployees]
        ,[Country]
        ,[StateTerritory]
        ,[City]
        ,[PostalCode]
        ,[ActiveFlag]
        ,[CreatedBy]
        ,[CreatedDate]
        )
        Values(
            @clientId,
            @CountryRegionCodeID,
            @IndustryID,
            @IndustryVerticalID,
            @IndustrySubVerticalID,
            @NoOfEmployees,
            @Country,
            @StateTerritory,
            @City,
            @PostalCode,
            1,
            @id,
            GETDATE()        
        )

        declare @createdCompanyProfileID int
        
        SELECT @createdCompanyProfileID = SCOPE_IDENTITY();

        INSERT into Amplo.AmploProfilingAnswers
        (
        [CompanyProfileID]
        ,[ProfilingQuestionID]
        ,[ProfilingAnswers]
        ,[ProfilingRatings]
        ,[ProfilingAnswersFeedback]
        ,[CreatedBy]
        ,[CreatedDate]
        )
        select
        @createdCompanyProfileID,
        questionID,
        profilingAnswer,
        NULL,
        NULL,
        @id,
        GETDATE()
        from @Responses
        where profilingAnswer IS NOT NULL
    
    END

    ELSE
    BEGIN

        declare @companyProfileID int
        select @companyProfileID = CompanyProfileID from Amplo.AmploCompanyProfile where clientID = @clientId and ActiveFlag = 1

        UPDATE Amplo.AmploCompanyProfile
        SET [CountryRegionCodeID] = @CountryRegionCodeID
        ,[IndustryID] = @IndustryID
        ,[IndustryVerticalID] = @IndustryVerticalID
        ,[IndustrySubVerticalID] = @IndustrySubVerticalID
        ,[NoOfEmployees] = @NoOfEmployees
        ,[Country] = @Country
        ,[StateTerritory] = @StateTerritory
        ,[City] = @City
        ,[PostalCode] = @PostalCode
        ,[ModifiedBy] = @id
        ,[ModifiedDate] = GETDATE()

        ---Update question responses which had already been answered

        Update Amplo.AmploProfilingAnswers
        SET ProfilingAnswers = b.profilingAnswer from 
        Amplo.AmploProfilingAnswers a inner join @Responses b on b.questionID = a.ProfilingQuestionID

        --Insert new responses
            INSERT into Amplo.AmploProfilingAnswers
        (
        [CompanyProfileID]
        ,[ProfilingQuestionID]
        ,[ProfilingAnswers]
        ,[ProfilingRatings]
        ,[ProfilingAnswersFeedback]
        ,[CreatedBy]
        ,[CreatedDate]
        )
        select
        @companyProfileID,
        questionID,
        profilingAnswer,
        NULL,
        NULL,
        @id,
        GETDATE()
        from @Responses
        where profilingAnswer IS NOT NULL AND questionID NOT IN (select ProfilingQuestionID from Amplo.AmploProfilingAnswers where CompanyProfileID = @companyProfileID)

    END


    --Success Message

    select MessageName from Amplo.[Message] where MessageID = 1021

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateCompanyProfileQuestions]    Script Date: 1/9/2020 6:47:56 PM ******/
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
/****** Object:  StoredProcedure [Amplo].[uspUPdateDecompositionAverageScores]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =====================================================================================================================================================
-- Author:		Srinivas
-- Create date: 07-October-2019
-- Description:	This procedure calcultes and updates average scores
-- =====================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspUPdateDecompositionAverageScores]
	-- Add the parameters for the stored procedure here
	@ProjectID [int]
   ,@UserID [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @ProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]

	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]
	
    -- Insert statements for procedure here


	--Process Level1 Cursor
	DECLARE ProcessLevel1List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT DecompositionProcessLevel1ID from Amplo.DecompositionProcessLevel1 where DecompositionProjectID = @ProjectID
    ORDER BY DecompositionProcessLevel1ID Asc;

    OPEN ProcessLevel1List;
    FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;

    WHILE @@FETCH_STATUS = 0
    BEGIN

		-- Process Level2 Cursor
		DECLARE ProcessLevel2List CURSOR FAST_FORWARD READ_ONLY
		FOR
		SELECT DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where DecompositionProcessLevel1ID = @ProcessLevel1ID
		ORDER BY DecompositionProcessLevel2ID Asc;

		OPEN ProcessLevel2List;
		FETCH NEXT FROM ProcessLevel2List INTO @ProcessLevel2ID;

		WHILE @@FETCH_STATUS = 0
/*
		BEGIN

		if nodeflag = 0

			begin


			SELECT @ProcessLevel2AverageScore = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10]) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from Amplo.DecompositionProcessLevel2Score
			where [DecompositionProcessLevel1ID] = @ProcessLevel2ID
			GROUP BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID]
			end;
		else
			begin
				DECLARE ProcessLevel2List CURSOR FAST_FORWARD READ_ONLY
				FOR
				SELECT DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where DecompositionProcessLevel1ID = @ProcessLevel1ID
				ORDER BY DecompositionProcessLevel2ID Asc;

				OPEN ProcessLevel2List;
				FETCH NEXT FROM ProcessLevel2List INTO @ProcessLevel2ID;

				WHILE @@FETCH_STATUS = 0
				BEGIN

					SELECT @ProcessLevel2AverageScore = (SUM((Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10]) * [AvgScoreWeightage])) / SUM([AvgScoreWeightage])) from Amplo.DecompositionProcessLevel2Score
					where [DecompositionProcessLevel1ID] = @ProcessLevel2ID
					GROUP BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID]
		
				FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;
				END;

		end;


		FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;
		END;

*/
    FETCH NEXT FROM ProcessLevel1List INTO @ProcessLevel1ID;
    END;

    CLOSE ProcessLevel1List;
    DEALLOCATE ProcessLevel1List;


END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionLevel1Location]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateDecompositionLevel1Location]
    @ProjectID [int], 
    @ProcessLevel1ID [int],
    @FunctionID [int],
    @PhaseID [int],
    @LocationID [int],
    @LocationFlag [int]
AS
BEGIN
    SET NOCOUNT ON; 

    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Amplo].[DecompositionProcessLevel1]
        SET  [GridViewLocationID] = @LocationID,  [GridVViewLocationFlag] = @LocationFlag, FunctionID = @FunctionID, PhaseID = @PhaseID
        WHERE [DecompositionProjectID] = @ProjectID 
--		AND FunctionID = @FunctionID
--		AND PhaseID = @PhaseID
		AND [DecompositionProcessLevel1ID] = @ProcessLevel1ID 

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
END;

GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionLevel1Location_WIP]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateDecompositionLevel1Location_WIP]
    @ProjectID [int], 
    @ProcessLevel1ID [int],
    @FunctionID [int],
    @PhaseID [int],
	@ProcessLevelTitle [varchar](100),
    @LocationID [int],
    @LocationFlag [int]
AS
BEGIN
    SET NOCOUNT ON; 

    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE [Amplo].[DecompositionProcessLevel1]
        SET  
			[FunctionID] = @FunctionID, 
			[PhaseID] = @PhaseID, 
			[ProcessLevel1Title]=@ProcessLevelTitle,
			[GridViewLocationID] = @LocationID,  
			[GridVViewLocationFlag] = @LocationFlag 
        WHERE [DecompositionProjectID] = @ProjectID AND [DecompositionProcessLevel1ID] = @ProcessLevel1ID 

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
END;

GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionLevel1Title]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionLevel1Title]
    @ProcessLevel1ID [int],
    @ProcessLevel1Title nvarchar(512)
AS
BEGIN
    SET NOCOUNT ON; 

    BEGIN TRY
        BEGIN TRANSACTION;
        UPDATE [Amplo].[DecompositionProcessLevel1]
        SET  ProcessLevel1Name = @ProcessLevel1Title,  ProcessLevel1Title = @ProcessLevel1Title
        WHERE [DecompositionProcessLevel1ID] = @ProcessLevel1ID 

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
	select @ProcessLevel1ID as ProcessLevel1ID
END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionLevel1TitleTemplate]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionLevel1TitleTemplate]
    @ProcessLevel1ID [int],
    @ProcessLevel1Title nvarchar(512)
AS
BEGIN
    SET NOCOUNT ON; 

    BEGIN TRY
        BEGIN TRANSACTION;
        UPDATE [Amplo].AmploDecompositionProcessLevel1Template
        SET  ProcessLevel1Name = @ProcessLevel1Title,  ProceeLevel1Title = @ProcessLevel1Title
        WHERE AmploDecompositionProcessLevel1TemplateID = @ProcessLevel1ID 

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
	select @ProcessLevel1ID as ProcessLevel1ID
END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevel2Scores]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevel2Scores]
	-- Add the parameters for the stored procedure here
	@DecompositionProcessLevel1ID [int],
	@DecompositionProcessLevel2ID [int],
	@ScoreCriteria1 [float],
	@ScoreCriteria2 [float],
	@ScoreCriteria3 [float],
	@ScoreCriteria4 [float],
	@ScoreCriteria5 [float],
	@ScoreCriteria6 [float],
	@ScoreCriteria7 [float],
	@ScoreCriteria8 [float],
	@ScoreCriteria9 [float],
	@ScoreCriteria10 [float],
	@LVL2CalcAggrScore [float],
	@AvgScoreWeightage [float]
	, @Action nvarchar(10)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = count(DecompositionProcessLevel2ScoreID) from [Amplo].[DecompositionProcessLevel2Score] where [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID

	if(@Action = 'update' or (@RecordExists != 0 and @Action != 'delete'))
	begin
		update [Amplo].[DecompositionProcessLevel2Score] set 
	
       [ScoreCriteria1] = @ScoreCriteria1
      ,[ScoreCriteria2] =@ScoreCriteria2
      ,[ScoreCriteria3] = @ScoreCriteria3
      ,[ScoreCriteria4] =@ScoreCriteria4
      ,[ScoreCriteria5] = @ScoreCriteria5
      ,[ScoreCriteria6] = @ScoreCriteria6
      ,[ScoreCriteria7] = @ScoreCriteria7
      ,[ScoreCriteria8] = @ScoreCriteria8
      ,[ScoreCriteria9] = @ScoreCriteria9
      ,[ScoreCriteria10] = @ScoreCriteria10
      ,[LVL2CalcAggrScore] = @LVL2CalcAggrScore 
      ,[AvgScoreWeightage] = @AvgScoreWeightage
	 where [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
	end
	else if(@Action = 'add')
	begin
		INSERT INTO [Amplo].[DecompositionProcessLevel2Score]
	(
		[DecompositionProcessLevel1ID]
		,[DecompositionProcessLevel2ID]
		,[ScoreCriteria1]
		,[ScoreCriteria2]
		,[ScoreCriteria3]
		,[ScoreCriteria4]
		,[ScoreCriteria5]
		,[ScoreCriteria6]
		,[ScoreCriteria7]
		,[ScoreCriteria8]
		,[ScoreCriteria9]
		,[ScoreCriteria10]
		,[LVL2CalcAggrScore]
		,[AvgScoreWeightage]
	)
	VALUES
		(
		@DecompositionProcessLevel1ID,
		@DecompositionProcessLevel2ID,
		@ScoreCriteria1,
		@ScoreCriteria2,
		@ScoreCriteria3,
		@ScoreCriteria4,
		@ScoreCriteria5,
		@ScoreCriteria6,
		@ScoreCriteria7,
		@ScoreCriteria8,
		@ScoreCriteria9,
		@ScoreCriteria10,
		@LVL2CalcAggrScore,
		@AvgScoreWeightage
		)
	end
	else if(@Action = 'delete')
	begin
		delete from [Amplo].[DecompositionProcessLevel2Score] 
		where [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
	end
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
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevel3Scores]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevel3Scores]
		@DecompositionProcessLevel1ID [int]
		,@DecompositionProcessLevel2ID [int]
		,@DecompositionProcessLevel3ID [int]
		,@ScoreCriteria1 [float]
		,@ScoreCriteria2 [float]
		,@ScoreCriteria3 [float]
		,@ScoreCriteria4 [float]
		,@ScoreCriteria5 [float]
		,@ScoreCriteria6 [float]
		,@ScoreCriteria7 [float]
		,@ScoreCriteria8 [float]
		,@ScoreCriteria9 [float]
		,@ScoreCriteria10 [float]
		,@AvgScoreWeightage [int]
		, @Action nvarchar(10)
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = count(DecompositionProcessLevel3ScoreID) from [Amplo].[DecompositionProcessLevel3Score] 
	where  [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID 
	and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID and [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID

	if(@Action = 'update' or (@RecordExists != 0 and @Action != 'delete'))
	begin
			UPDATE [Amplo].[DecompositionProcessLevel3Score]
			SET [ScoreCriteria1] = @ScoreCriteria1
			,[ScoreCriteria2] = @ScoreCriteria2
			,[ScoreCriteria3] = @ScoreCriteria3
			,[ScoreCriteria4] = @ScoreCriteria4
			,[ScoreCriteria5] = @ScoreCriteria5
			,[ScoreCriteria6] = @ScoreCriteria6
			,[ScoreCriteria7] = @ScoreCriteria7
			,[ScoreCriteria8] = @ScoreCriteria8
			,[ScoreCriteria9] = @ScoreCriteria9
			,[ScoreCriteria10] = @ScoreCriteria10
			,[AvgScoreWeightage] = @AvgScoreWeightage
			WHERE [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
	end
	  ELSE if(@Action = 'add')
	  begin
			INSERT INTO [Amplo].[DecompositionProcessLevel3Score]
				([DecompositionProcessLevel1ID]
				,[DecompositionProcessLevel2ID]
				,[DecompositionProcessLevel3ID]
				,[ScoreCriteria1]
				,[ScoreCriteria2]
				,[ScoreCriteria3]
				,[ScoreCriteria4]
				,[ScoreCriteria5]
				,[ScoreCriteria6]
				,[ScoreCriteria7]
				,[ScoreCriteria8]
				,[ScoreCriteria9]
				,[ScoreCriteria10]
				,[AvgScoreWeightage])
			VALUES
				(@DecompositionProcessLevel1ID
				,@DecompositionProcessLevel2ID
				,@DecompositionProcessLevel3ID
				,@ScoreCriteria1
				,@ScoreCriteria2
				,@ScoreCriteria3
				,@ScoreCriteria4
				,@ScoreCriteria5
				,@ScoreCriteria6
				,@ScoreCriteria7
				,@ScoreCriteria8
				,@ScoreCriteria9
				,@ScoreCriteria10
				,@AvgScoreWeightage)
	end
	else if(@Action = 'delete')
	begin
		delete from [Amplo].[DecompositionProcessLevel3Score] 
		WHERE [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
		AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
		AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
	end
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
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevel4]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevel4]
	-- Add the parameters for the stored procedure here
		 @UserID [int]
		,@DecompositionProjectID [int]
		,@DecompositionProcessLevel1ID [int]
		,@DecompositionProcessLevel2ID [int]
		,@DecompositionProcessLevel3ID [int]
		,@ProcessLevel4NodeID [varchar](50)
		,@ProcessLevel4Title [varchar](100)
		,@Owner [varchar](100)
		,@CountrySpecific [varchar](100)
		,@LeafNodeFlag [bit]
--		,@DisableDate [date]
		,@DecompositionProcessLevel4ID [int] OUTPUT
		, @Action nvarchar(10)
		,@DecompositionProcessLevel4IDInput [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;
	DECLARE @PDecompositionProcessLevel4ID int
    BEGIN TRY
        --BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = count(ProcessLevel4NodeId) from [Amplo].[DecompositionProcessLevel4] 
	where DecompositionProjectID = @DecompositionProjectID AND  ProcessLevel4NodeId = @ProcessLevel4NodeID And ActiveFlag = 1
	AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
	AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
	AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID

	if (@Action = 'update' or (@RecordExists > 0 and @Action != 'delete'))
	 BEGIN
		UPDATE [Amplo].[DecompositionProcessLevel4]
		SET  [ProcessLevel4Title] = @ProcessLevel4Title
			,[Owner] = @Owner
			,[CountrySpecific] = @CountrySpecific
			,[LeafNodeFlag] = @LeafNodeFlag
--			,[DisableDate] = @DisableDate
			,[ActiveFlag] = 1
			,[ModifiedBy] = @UserID
			,[ModifiedDate] = GETDATE()
		WHERE DecompositionProjectID = @DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			  AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			  AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID

			select @PDecompositionProcessLevel4ID=DecompositionProcessLevel4ID from Amplo.DecompositionProcessLevel4 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel4NodeId

 = @Processlevel4NodeID;

			SET @DecompositionProcessLevel4ID = @PDecompositionProcessLevel4ID
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

			RETURN
	 END
	else if @Action = 'add'
		BEGIN
			INSERT INTO [Amplo].[DecompositionProcessLevel4]
				([DecompositionProjectID]
				,[DecompositionProcessLevel1ID]
				,[DecompositionProcessLevel2ID]
				,[DecompositionProcessLevel3ID]
				,[ProcessLevel4NodeID]
	--			,[ProcessLevel4Name]
				,[ProcessLevel4Title]
				,[Owner]
				,[CountrySpecific]
				,[LeafNodeFlag]
--				,[DisableDate]
				,[ActiveFlag]
				,[CreatedBy]
				,[CreatedDate]
				)
				VALUES
				(@DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@DecompositionProcessLevel2ID
				,@DecompositionProcessLevel3ID
				,@ProcessLevel4NodeID
	--			,@ProcessLevel4Name
				,@ProcessLevel4Title
	--			,@ProcessLevel4Description
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
--				,@DisableDate
				,1
				,@UserID
				,GETDATE()
				)
		SET @DecompositionProcessLevel4ID = SCOPE_IDENTITY();  
		SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

		END
		if @Action = 'delete'
	 BEGIN
		UPDATE [Amplo].[DecompositionProcessLevel4]
		SET  [ActiveFlag] = 0
			,[ModifiedBy] = @UserID
			,[ModifiedDate] = GETDATE()
		WHERE DecompositionProcessLevel4ID = @DecompositionProcessLevel4IDInput

			select @PDecompositionProcessLevel4ID=DecompositionProcessLevel4ID from Amplo.DecompositionProcessLevel4 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel4NodeId

 = @Processlevel4NodeID;

			SET @DecompositionProcessLevel4ID = @PDecompositionProcessLevel4ID
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

			RETURN
	 END
--        COMMIT TRANSACTION;
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
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevel4Scores]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevel4Scores]
	-- Add the parameters for the stored procedure here
		@DecompositionProcessLevel1ID [int]
		,@DecompositionProcessLevel2ID [int]
		,@DecompositionProcessLevel3ID [int]
		,@DecompositionProcessLevel4ID [int]
		,@ScoreCriteria1 [float]
		,@ScoreCriteria2 [float]
		,@ScoreCriteria3 [float]
		,@ScoreCriteria4 [float]
		,@ScoreCriteria5 [float]
		,@ScoreCriteria6 [float]
		,@ScoreCriteria7 [float]
		,@ScoreCriteria8 [float]
		,@ScoreCriteria9 [float]
		,@ScoreCriteria10 [float]
		,@Level4CalcAggrScore [float]
		,@AvgScoreWeightage [float]
		, @Action nvarchar(10)
AS
BEGIN
	SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = count(DecompositionProcessLevel4ScoreID) from [Amplo].[DecompositionProcessLevel4Score] 
	where  [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID 
	and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID 
	and [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID 
	and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID

	if(@Action = 'update' or (@RecordExists != 0 and @Action != 'delete'))
	begin
		UPDATE [Amplo].[DecompositionProcessLevel4Score]
		SET [ScoreCriteria1] = @ScoreCriteria1
			,[ScoreCriteria2] = @ScoreCriteria2
			,[ScoreCriteria3] = @ScoreCriteria3
			,[ScoreCriteria4] = @ScoreCriteria4
			,[ScoreCriteria5] = @ScoreCriteria5
			,[ScoreCriteria6] = @ScoreCriteria6
			,[ScoreCriteria7] = @ScoreCriteria7
			,[ScoreCriteria8] = @ScoreCriteria8
			,[ScoreCriteria9] = @ScoreCriteria9
			,[ScoreCriteria10] = @ScoreCriteria10
			,[Level4CalcAggrScore] = @Level4CalcAggrScore
			,[AvgScoreWeightage] = @AvgScoreWeightage
		WHERE  
			 [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			 AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			 AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			 AND [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
	end
	else if(@Action = 'add')
	begin
		INSERT INTO [Amplo].[DecompositionProcessLevel4Score]
			([DecompositionProcessLevel1ID]
			,[DecompositionProcessLevel2ID]
			,[DecompositionProcessLevel3ID]
			,[DecompositionProcessLevel4ID]
			,[ScoreCriteria1]
			,[ScoreCriteria2]
			,[ScoreCriteria3]
			,[ScoreCriteria4]
			,[ScoreCriteria5]
			,[ScoreCriteria6]
			,[ScoreCriteria7]
			,[ScoreCriteria8]
			,[ScoreCriteria9]
			,[ScoreCriteria10]
			,[Level4CalcAggrScore]
			,[AvgScoreWeightage])
		VALUES
			(@DecompositionProcessLevel1ID
			,@DecompositionProcessLevel2ID
			,@DecompositionProcessLevel3ID
			,@DecompositionProcessLevel4ID
			,@ScoreCriteria1
			,@ScoreCriteria2
			,@ScoreCriteria3
			,@ScoreCriteria4
			,@ScoreCriteria5
			,@ScoreCriteria6
			,@ScoreCriteria7
			,@ScoreCriteria8
			,@ScoreCriteria9
			,@ScoreCriteria10
			,@Level4CalcAggrScore
			,@AvgScoreWeightage)
	end
	else if(@Action = 'delete')
	begin
		delete from [Amplo].[DecompositionProcessLevel4Score]
		where [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
	end

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevel5Scores]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevel5Scores]
			    @DecompositionProcessLevel1ID [int]
			   ,@DecompositionProcessLevel2ID [int]
			   ,@DecompositionProcessLevel3ID [int]
			   ,@DecompositionProcessLevel4ID [int]
			   ,@DecompositionProcessLevel5ID [int]
			   ,@ScoreCriteria1 [float]
			   ,@ScoreCriteria2 [float]
			   ,@ScoreCriteria3 [float]
			   ,@ScoreCriteria4 [float]
			   ,@ScoreCriteria5 [float]
			   ,@ScoreCriteria6 [float]
			   ,@ScoreCriteria7 [float]
			   ,@ScoreCriteria8 [float]
			   ,@ScoreCriteria9 [float]
			   ,@ScoreCriteria10 [float]
			   ,@Level5CalcAggrScore [float]
			   ,@AvgScoreWeightage [float]
			   , @Action nvarchar(10)
AS
BEGIN
	SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = count(DecompositionProcessLevel5ScoreID) from [Amplo].[DecompositionProcessLevel5Score] where  [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID 
	and [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID and [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID and [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID AND [DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID

	if(@Action = 'update' or (@RecordExists != 0 and @Action != 'delete'))
	begin
	UPDATE [Amplo].[DecompositionProcessLevel5Score]
	   SET 
		   [ScoreCriteria1] = @ScoreCriteria1
		  ,[ScoreCriteria2] = @ScoreCriteria2
		  ,[ScoreCriteria3] = @ScoreCriteria3
		  ,[ScoreCriteria4] = @ScoreCriteria4
		  ,[ScoreCriteria5] = @ScoreCriteria5
		  ,[ScoreCriteria6] = @ScoreCriteria6
		  ,[ScoreCriteria7] = @ScoreCriteria7
		  ,[ScoreCriteria8] = @ScoreCriteria8
		  ,[ScoreCriteria9] = @ScoreCriteria9
		  ,[ScoreCriteria10] = @ScoreCriteria10
		  ,[Level5CalcAggrScore] = @Level5CalcAggrScore
		  ,[AvgScoreWeightage] = @AvgScoreWeightage
	 WHERE 
	--	   [DecompositionProcessLevel5ScoreID] = @DecompositionProcessLevel5ScoreID
		  [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
		  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
		  AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
		  AND [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
		  AND [DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
	end
		  ELSE if(@Action = 'add')
	begin
	INSERT INTO [Amplo].[DecompositionProcessLevel5Score]
			   (
			    [DecompositionProcessLevel1ID]
			   ,[DecompositionProcessLevel2ID]
			   ,[DecompositionProcessLevel3ID]
			   ,[DecompositionProcessLevel4ID]
			   ,[DecompositionProcessLevel5ID]
			   ,[ScoreCriteria1]
			   ,[ScoreCriteria2]
			   ,[ScoreCriteria3]
			   ,[ScoreCriteria4]
			   ,[ScoreCriteria5]
			   ,[ScoreCriteria6]
			   ,[ScoreCriteria7]
			   ,[ScoreCriteria8]
			   ,[ScoreCriteria9]
			   ,[ScoreCriteria10]
			   ,[Level5CalcAggrScore]
			   ,[AvgScoreWeightage])
		 VALUES
			   (
			    @DecompositionProcessLevel1ID
			   ,@DecompositionProcessLevel2ID
			   ,@DecompositionProcessLevel3ID
			   ,@DecompositionProcessLevel4ID
			   ,@DecompositionProcessLevel5ID
			   ,@ScoreCriteria1
			   ,@ScoreCriteria2
			   ,@ScoreCriteria3
			   ,@ScoreCriteria4
			   ,@ScoreCriteria5
			   ,@ScoreCriteria6
			   ,@ScoreCriteria7
			   ,@ScoreCriteria8
			   ,@ScoreCriteria9
			   ,@ScoreCriteria10
			   ,@Level5CalcAggrScore
			   ,@AvgScoreWeightage
			  )
		end
		else if(@Action = 'delete')
		begin
			delete from [Amplo].[DecompositionProcessLevel5Score]
			where [DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
		end

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2]
	-- Add the parameters for the stored procedure here
       @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [varchar](50)
       ,@ProcessLevel2Title [varchar](100)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@DecompositionProcessLevel2ID [int] OUTPUT
	   , @Action nvarchar(10)
	   , @DecompositionProcessLevel2IDInput [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	DECLARE @PDecompositionProcessLevel2ID INT

    BEGIN TRY
--        BEGIN TRANSACTION;

	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(@DecompositionProcessLevel2ID) from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID 
	AND DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID and ActiveFlag = 1

	if(@Action = 'add')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
	
			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 
			where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID 
			AND ProcessLevel2NodeId = @Processlevel2NodeID;

			SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].[DecompositionProcessLevel2]
			(
			   [DecompositionProjectID]
			  ,[DecompositionProcessLevel1ID]
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[Owner]
			  ,[CountrySpecific]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  ,[CreatedBy]
			  ,[CreatedDate]
			  )
			  values
			(
				 @DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
				, 1
				,@UserID
				,GETDATE()
			);

			SELECT @DecompositionProcessLevel2ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			--Update Status as Inprogress
			update Amplo.DecompositionProcessLevel1
			set status = 2 where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID;

		END
	end
	else if(@Action = 'update')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
	
			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId

 = @Processlevel2NodeID;

			SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			RETURN
		END

		ELSE

		BEGIN

			INSERT INTO [Amplo].[DecompositionProcessLevel2]
			(
			   [DecompositionProjectID]
			  ,[DecompositionProcessLevel1ID]
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[Owner]
			  ,[CountrySpecific]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  ,[CreatedBy]
			  ,[CreatedDate]
			  )
			  values
			(
				 @DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
				, 1
				,@UserID
				,GETDATE()
			);

			SELECT @DecompositionProcessLevel2ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			--Update Status as Inprogress
			update Amplo.DecompositionProcessLevel1
			set status = 2 where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID;

		END
	end
	else if(@Action = 'delete')
	begin
		UPDATE Amplo.DecompositionProcessLevel2 SET  
			   ActiveFlag = 0
			  ,ModifiedBy = @UserID
			  ,[ModifiedDate] = GETDATE()
			WHERE DecompositionProcessLevel2ID = @DecompositionProcessLevel2IDInput
	
			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId

 = @Processlevel2NodeID;

			SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			RETURN
	end
	
		RETURN @DecompositionProcessLevel2ID;
  --      COMMIT TRANSACTION;
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
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2_10_OCT_2019]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 04-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2_10_OCT_2019]
	-- Add the parameters for the stored procedure here
       @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [float]
       ,@ProcessLevel2Title [varchar](100)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@DecompositionProcessLevel2ID [int] OUTPUT

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;
	DECLARE @PDecompositionProcessLevel2ID INT

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(@DecompositionProcessLevel2ID) from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID

	if @RecordExists > 0

		BEGIN
			UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
	
			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID;

			SET @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].[DecompositionProcessLevel2]
			(
			   [DecompositionProjectID]
			  ,[DecompositionProcessLevel1ID]
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[Owner]
			  ,[CountrySpecific]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  ,[CreatedBy]
			  ,[CreatedDate]
			  )
			  values
			(
				 @DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
				, 1
				,@UserID
				,GETDATE()
			);

			SET @DecompositionProcessLevel2ID = SCOPE_IDENTITY();  
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

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2_New]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 04-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2_New]
	-- Add the parameters for the stored procedure here
        @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [int]
       ,@ProcessLevel2Title [varchar](100)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)

	   ,@DecompositionProcessLevel2ID [int] OUTPUT

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;
	DECLARE @PDecompositionProcessLevel2ID INT

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(@DecompositionProcessLevel2ID) from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID

	if @RecordExists > 0

		BEGIN
			UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
	
			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID;

			SET @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].[DecompositionProcessLevel2]
			(
			   [DecompositionProjectID]
			  ,[DecompositionProcessLevel1ID]
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[Owner]
			  ,[CountrySpecific]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  ,[CreatedBy]
			  ,[CreatedDate]
			  )
			  values
			(
				 @DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
				, 1
				,@UserID
				,GETDATE()
			);

			SET @DecompositionProcessLevel2ID = SCOPE_IDENTITY();  
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

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2_Original]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 04-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2_Original]
	-- Add the parameters for the stored procedure here
       @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [int]
       ,@ProcessLevel2Title [varchar](100)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@CreatedBy [varchar](100)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;

    BEGIN TRY
        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]

	select  @RecordExists = ProcessLevel2NodeId from Amplo.DecompositionProcessLevel2 where ProcessLevel2NodeId = @Processlevel2NodeID

	if @RecordExists > 0

	update Amplo.DecompositionProcessLevel2 set 
	
	   [DecompositionProjectID]=@DecompositionProjectID
      ,[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
      ,[ProcessLevel2NodeID] = @ProcessLevel2NodeID
      ,[ProcessLevel2Title] = @ProcessLevel2Title
      ,[Owner] = @Owner
      ,[CountrySpecific] = @CountrySpecific
      ,[LeafNodeFlag] = @LeafNodeFlag
      ,[CreatedBy] = @CreatedBy


	else
	insert into [Amplo].[DecompositionProcessLevel2]
	(
       [DecompositionProjectID]
      ,[DecompositionProcessLevel1ID]
      ,[ProcessLevel2NodeID]
      ,[ProcessLevel2Title]
      ,[Owner]
      ,[CountrySpecific]
      ,[LeafNodeFlag]
      ,[ActiveFlag]
      ,[CreatedBy]
      ,[CreatedDate]
	  )
	  values
	(
		@DecompositionProjectID
		,@DecompositionProcessLevel1ID
		,@ProcessLevel2NodeID
		,@ProcessLevel2Title
		,@Owner
		,@CountrySpecific
		,@LeafNodeFlag
		, 1
		,@CreatedBy
		,GetDate()
	);

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2_WIP]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 11-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2_WIP]
	-- Add the parameters for the stored procedure here
        @DecompositionProjectID [int]
       ,@DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [varchar](100)
       ,@ProcessLevel2Title [varchar](50)
	   ,@Owner [varchar](100)
       ,@CountrySpecific [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@Action [varchar](30)
	   ,@DecompositionProcessLevel2ID [int]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	DECLARE @PDecompositionProcessLevel2ID INT
	DECLARE @StatusLookupID [int]

    BEGIN TRY
--        BEGIN TRANSACTION;
	
	SELECT UPPER(@Action)
	IF UPPER(@Action) = N'MODIFY'

		BEGIN
	
			SELECT N'MODIFY'

		UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
	
--			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID;

	--		SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

		END

	ELSE IF UPPER(@Action) = N'ADD'

		BEGIN

		SELECT N'ÁDD'

			INSERT INTO [Amplo].[DecompositionProcessLevel2]
			(
			   [DecompositionProjectID]
			  ,[DecompositionProcessLevel1ID]
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[Owner]
			  ,[CountrySpecific]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  ,[CreatedBy]
			  ,[CreatedDate]
			  )
			  values
			(
				 @DecompositionProjectID
				,@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@Owner
				,@CountrySpecific
				,@LeafNodeFlag
				, 1
				,@UserID
				,GETDATE()
			);

			SELECT @PDecompositionProcessLevel2ID = SCOPE_IDENTITY() 
			SELECT @PDecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			select @StatusLookupID = StatusLookupID from Amplo.StatusLookup where Lookupcode='DECOMP_INPROGRESS';
			update Amplo.DecompositionProcessLevel1 set Status  = @StatusLookupID where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID  = @DecompositionProcessLevel1ID;

			END


	ELSE IF UPPER(@Action) = N'DELETE'

		BEGIN

		SELECT N'DELETE'

			UPDATE Amplo.DecompositionProcessLevel2 SET  
			   [ActiveFlag] = 0	
			  ,[ModifiedBy] = @UserID
			  ,[ModifiedDate] = GETDATE()
			WHERE [DecompositionProjectID]=@DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
	
--			select @PDecompositionProcessLevel2ID=DecompositionProcessLevel2ID from Amplo.DecompositionProcessLevel2 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel2NodeId = @Processlevel2NodeID;

	--		SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			select @StatusLookupID = StatusLookupID from Amplo.StatusLookup where Lookupcode='DECOMP_NEW';
			update Amplo.DecompositionProcessLevel1 set Status  = @StatusLookupID where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID  = @DecompositionProcessLevel1ID;

		END

--		RETURN @DecompositionProcessLevel2ID;
  --      COMMIT TRANSACTION;
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
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels2Template]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels2Template]
       @DecompositionProcessLevel1ID [int]
       ,@ProcessLevel2NodeID [varchar](50)
       ,@ProcessLevel2Title [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@DecompositionProcessLevel2ID [int] OUTPUT
	   , @Action nvarchar(10)
	   , @DecompositionProcessLevel2IDInput [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	DECLARE @PDecompositionProcessLevel2ID INT

    BEGIN TRY
--        BEGIN TRANSACTION;

	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(DecompositionProcessLevel2TemplateID) from Amplo.AmploDecompositionProcessLevel2Template where DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID
	AND ProcessLevel2NodeId = @Processlevel2NodeID and ActiveFlag = 1

	if(@Action = 'add')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel2Template SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID
			  AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
	
			select @PDecompositionProcessLevel2ID = DecompositionProcessLevel2TemplateID 
			from Amplo.AmploDecompositionProcessLevel2Template where DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID
			AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID

			SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel2Template
			(
			  DecompositionProcessLevel2TemplateID
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				@DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel2ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID
		END
	end
	else if(@Action = 'update')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel2Template SET  
			   [ProcessLevel2Title] = @ProcessLevel2Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID
			  AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
	
			select @PDecompositionProcessLevel2ID = DecompositionProcessLevel2TemplateID 
			from Amplo.AmploDecompositionProcessLevel2Template where DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID
			AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID

	
			select @PDecompositionProcessLevel2ID = DecompositionProcessLevel2TemplateID 
			from Amplo.AmploDecompositionProcessLevel2Template where DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID
			AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID
 
			SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			RETURN
		END

		ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel2Template
			(
			   DecompositionProcessLevel2TemplateID
			  ,[ProcessLevel2NodeID]
			  ,[ProcessLevel2Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				 @DecompositionProcessLevel1ID
				,@ProcessLevel2NodeID
				,@ProcessLevel2Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel2ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID
		END
	end
	else if(@Action = 'delete')
	begin
		UPDATE Amplo.AmploDecompositionProcessLevel2Template SET ActiveFlag = 0
			WHERE DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2IDInput
	
			select @PDecompositionProcessLevel2ID = DecompositionProcessLevel2TemplateID 
			from Amplo.AmploDecompositionProcessLevel2Template where DecompositionProcessLevel1TemplateID = @DecompositionProcessLevel1ID
			AND [ProcessLevel2NodeID] = @ProcessLevel2NodeID

			SELECT @DecompositionProcessLevel2ID = @PDecompositionProcessLevel2ID
			SELECT @DecompositionProcessLevel2ID as DecompositionProcessLevel2ID

			RETURN
	end
	
		RETURN @DecompositionProcessLevel2ID;
  --      COMMIT TRANSACTION;
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
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels3]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels3]
	-- Add the parameters for the stored procedure here
          (
		    @DecompositionProjectID [int]
           ,@DecompositionProcessLevel1ID [int]
           ,@DecompositionProcessLevel2ID [int]
           ,@ProcessLevel3NodeID [varchar](50)
--          ,@ProcessLevel3Name [varchar](100)
           ,@ProcessLevel3Title [varchar](100)
           ,@Owner [varchar](100)
           ,@CountrySpecific [varchar](100)
           ,@LeafNodeFlag [bit]
--         ,@DisableDate [date]
           ,@UsreID [varchar](100)
		   ,@DecompositionProcessLevel3ID [int] OUTPUT
		   , @Action nvarchar(10)
		   ,@DecompositionProcessLevel3IDinput [int]
 		)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    BEGIN TRY
--        BEGIN TRANSACTION;
	
	DECLARE @RecordExists [int]
	DECLARE @PDecompositionProcessLevel3ID [int]

	select  @RecordExists = count(ProcessLevel3NodeId) from Amplo.DecompositionProcessLevel3 where [DecompositionProjectID] = @DecompositionProjectID 
	AND DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND ProcessLevel3NodeId = @Processlevel3NodeID and ActiveFlag = 1

	if (@Action = 'update' or (@RecordExists > 0 and @Action != 'delete'))
		BEGIN
		update Amplo.DecompositionProcessLevel3 set 
			[ProcessLevel3Title] = @ProcessLevel3Title
			,[Owner] = @Owner
			,[CountrySpecific] = @CountrySpecific
			,[LeafNodeFlag] = @LeafNodeFlag
--			,[DisableDate] = @DisableDate
			,[ActiveFlag] = 1
			,[ModifiedBy] = @UsreID
			,[ModifiedDate]= GETDATE()
			WHERE [DecompositionProjectID] = @DecompositionProjectID 
			AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID

			select @PDecompositionProcessLevel3ID=DecompositionProcessLevel3ID from Amplo.DecompositionProcessLevel3 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel3NodeId

 = @Processlevel3NodeID;

			SET @DecompositionProcessLevel3ID = @PDecompositionProcessLevel3ID
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

			RETURN
			END
	else if @Action = 'add'
	BEGIN
	INSERT INTO [Amplo].[DecompositionProcessLevel3]
			   ([DecompositionProjectID]
			   ,[DecompositionProcessLevel1ID]
			   ,[DecompositionProcessLevel2ID]
			   ,[ProcessLevel3NodeID]
--			   ,[ProcessLevel3Name]
			   ,[ProcessLevel3Title]
			   ,[Owner]
			   ,[CountrySpecific]
			   ,[LeafNodeFlag]
--			   ,[DisableDate]
			   ,[ActiveFlag]
			   ,[CreatedBy]
			   ,[CreatedDate])
     VALUES
           (
				@DecompositionProjectID
			   ,@DecompositionProcessLevel1ID
			   ,@DecompositionProcessLevel2ID
			   ,@ProcessLevel3NodeID
			   --,@ProcessLevel3Name
			   ,@ProcessLevel3Title
			   ,@Owner
			   ,@CountrySpecific
			   ,@LeafNodeFlag
--			   ,@DisableDate
			   ,1
			   ,@UsreID
			   ,GETDATE()
			)

	SET @DecompositionProcessLevel3ID = SCOPE_IDENTITY();  
	SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

	END
	else if @Action = 'delete'
		BEGIN
		update Amplo.DecompositionProcessLevel3 set 
			 [ActiveFlag] = 0
			,[ModifiedBy] = @UsreID
			,[ModifiedDate]= GETDATE()
			WHERE DecompositionProcessLevel3ID = @DecompositionProcessLevel3IDinput

			select @PDecompositionProcessLevel3ID=DecompositionProcessLevel3ID from Amplo.DecompositionProcessLevel3 where [DecompositionProjectID] = @DecompositionProjectID 
			AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel3NodeId = @Processlevel3NodeID;

			SET @DecompositionProcessLevel3ID = @PDecompositionProcessLevel3ID
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

			RETURN
			END
--        COMMIT TRANSACTION;
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
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels3Template]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels3Template]
       @DecompositionProcessLevel2ID [int]
       ,@ProcessLevel3NodeID [varchar](50)
       ,@ProcessLevel3Title [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@DecompositionProcessLevel3ID [int] OUTPUT
	   , @Action nvarchar(10)
	   , @DecompositionProcessLevel3IDInput [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	DECLARE @PDecompositionProcessLevel3ID INT

    BEGIN TRY
--        BEGIN TRANSACTION;

	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(DecompositionProcessLevel3TemplateID) from Amplo.AmploDecompositionProcessLevel3Template where DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
	AND ProcessLevel3NodeId = @ProcessLevel3NodeID and ActiveFlag = 1

	if(@Action = 'add')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel3Template SET  
			   [ProcessLevel3Title] = @ProcessLevel3Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
			  AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID
	
			select @PDecompositionProcessLevel3ID = DecompositionProcessLevel3TemplateID 
			from Amplo.AmploDecompositionProcessLevel3Template where DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
			AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID

			SELECT @DecompositionProcessLevel3ID = @PDecompositionProcessLevel3ID
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel3Template
			(
			  DecompositionProcessLevel3TemplateID
			  ,[ProcessLevel3NodeID]
			  ,[ProcessLevel3Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				@DecompositionProcessLevel2ID
				,@ProcessLevel3NodeID
				,@ProcessLevel3Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel3ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID
		END
	end
	else if(@Action = 'update')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel3Template SET  
			   [ProcessLevel3Title] = @ProcessLevel3Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
			  AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID
	
			select @PDecompositionProcessLevel3ID = DecompositionProcessLevel3TemplateID 
			from Amplo.AmploDecompositionProcessLevel3Template where DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
			AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID

	
			select @PDecompositionProcessLevel3ID = DecompositionProcessLevel3TemplateID 
			from Amplo.AmploDecompositionProcessLevel3Template where DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
			AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID
 
			SELECT @DecompositionProcessLevel3ID = @PDecompositionProcessLevel3ID
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

			RETURN
		END

		ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel3Template
			(
			   DecompositionProcessLevel3TemplateID
			  ,[ProcessLevel3NodeID]
			  ,[ProcessLevel3Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				 @DecompositionProcessLevel2ID
				,@ProcessLevel3NodeID
				,@ProcessLevel3Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel3ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID
		END
	end
	else if(@Action = 'delete')
	begin
		UPDATE Amplo.AmploDecompositionProcessLevel3Template SET ActiveFlag = 0
			WHERE DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3IDInput
	
			select @PDecompositionProcessLevel3ID = DecompositionProcessLevel3TemplateID 
			from Amplo.AmploDecompositionProcessLevel3Template where DecompositionProcessLevel2TemplateID = @DecompositionProcessLevel2ID
			AND [ProcessLevel3NodeID] = @ProcessLevel3NodeID

			SELECT @DecompositionProcessLevel3ID = @PDecompositionProcessLevel3ID
			SELECT @DecompositionProcessLevel3ID as DecompositionProcessLevel3ID

			RETURN
	end
	
		RETURN @DecompositionProcessLevel3ID;
  --      COMMIT TRANSACTION;
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
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels4Template]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels4Template]
       @DecompositionProcessLevel3ID [int]
       ,@ProcessLevel4NodeID [varchar](50)
       ,@ProcessLevel4Title [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@DecompositionProcessLevel4ID [int] OUTPUT
	   , @Action nvarchar(10)
	   , @DecompositionProcessLevel4IDInput [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	DECLARE @PDecompositionProcessLevel4ID INT

    BEGIN TRY
--        BEGIN TRANSACTION;

	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(DecompositionProcessLevel4TemplateID) from Amplo.AmploDecompositionProcessLevel4Template where DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
	AND ProcessLevel4NodeId = @ProcessLevel4NodeID and ActiveFlag = 1

	if(@Action = 'add')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel4Template SET  
			   [ProcessLevel4Title] = @ProcessLevel4Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
			  AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID
	
			select @PDecompositionProcessLevel4ID = DecompositionProcessLevel4TemplateID 
			from Amplo.AmploDecompositionProcessLevel4Template where DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
			AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID

			SELECT @DecompositionProcessLevel4ID = @PDecompositionProcessLevel4ID
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel4Template
			(
			  DecompositionProcessLevel4TemplateID
			  ,[ProcessLevel4NodeID]
			  ,[ProcessLevel4Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				@DecompositionProcessLevel3ID
				,@ProcessLevel4NodeID
				,@ProcessLevel4Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel4ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID
		END
	end
	else if(@Action = 'update')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel4Template SET  
			   [ProcessLevel4Title] = @ProcessLevel4Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
			  AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID
	
			select @PDecompositionProcessLevel4ID = DecompositionProcessLevel4TemplateID 
			from Amplo.AmploDecompositionProcessLevel4Template where DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
			AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID

	
			select @PDecompositionProcessLevel4ID = DecompositionProcessLevel4TemplateID 
			from Amplo.AmploDecompositionProcessLevel4Template where DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
			AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID
 
			SELECT @DecompositionProcessLevel4ID = @PDecompositionProcessLevel4ID
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

			RETURN
		END

		ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel4Template
			(
			   DecompositionProcessLevel4TemplateID
			  ,[ProcessLevel4NodeID]
			  ,[ProcessLevel4Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				 @DecompositionProcessLevel3ID
				,@ProcessLevel4NodeID
				,@ProcessLevel4Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel4ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID
		END
	end
	else if(@Action = 'delete')
	begin
		UPDATE Amplo.AmploDecompositionProcessLevel4Template SET ActiveFlag = 0
			WHERE DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4IDInput
	
			select @PDecompositionProcessLevel4ID = DecompositionProcessLevel4TemplateID 
			from Amplo.AmploDecompositionProcessLevel4Template where DecompositionProcessLevel3TemplateID = @DecompositionProcessLevel3ID
			AND [ProcessLevel4NodeID] = @ProcessLevel4NodeID

			SELECT @DecompositionProcessLevel4ID = @PDecompositionProcessLevel4ID
			SELECT @DecompositionProcessLevel4ID as DecompositionProcessLevel4ID

			RETURN
	end
	
		RETURN @DecompositionProcessLevel4ID;
  --      COMMIT TRANSACTION;
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
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels5]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels5]
	-- Add the parameters for the stored procedure here
          (
			    @UserID [int]	
			   ,@DecompositionProjectID [int]
			   ,@DecompositionProcessLevel1ID [int]
			   ,@DecompositionProcessLevel2ID [int]
			   ,@DecompositionProcessLevel3ID [int]
			   ,@DecompositionProcessLevel4ID [int]
			   ,@ProcessLevel5NodeID [varchar](50)
			   ,@ProcessLevel5Title [varchar](100)
			   ,@LeafNodeFlag [bit]
			   ,@Owner [varchar](100)
			   ,@CountrySpecific [varchar](100)
--			   ,@DisableDate [date]
--			   ,@ActiveFlag [bit]
			   ,@DecompositionProcessLevel5ID [int] OUTPUT
			   , @Action nvarchar(10)
			   , @DecompositionProcessLevel5IDInput [int]
		)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
    SET NOCOUNT ON;

    BEGIN TRY
--        BEGIN TRANSACTION;
	
			DECLARE @RecordExists [int]
			DECLARE @PDecompositionProcessLevel5ID int
			select  @RecordExists = count(ProcessLevel5NodeID) from Amplo.DecompositionProcessLevel5 
			where DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID 
			AND DecompositionProcessLevel2ID =  @DecompositionProcessLevel2ID 
			AND DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID 
			AND DecompositionProcessLevel4ID =  @DecompositionProcessLevel4ID 
			AND ProcessLevel5NodeId = @ProcessLevel5NodeID
			and ActiveFlag = 1

	if (@Action = 'update' or (@RecordExists > 0 and @Action != 'delete'))
	BEGIN
		UPDATE [Amplo].[DecompositionProcessLevel5]
		   SET 
--				[ProcessLevel5Name] = @ProcessLevel5Name
			   [ProcessLevel5Title] = @ProcessLevel5Title
--			  ,[ProcessLevel5Description] = @ProcessLevel5Description
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[Owner] = @Owner
			  ,[CountrySpecific] = @CountrySpecific
--			  ,[DisableDate] = @DisableDate
			  ,[ActiveFlag] = 1
			  ,[ModifiedBy] = @UserID
			  ,[ModifiedDate] = GETDATE()
		 WHERE [DecompositionProjectID] = @DecompositionProjectID
			  AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			  AND [DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID
			  AND [DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			  AND [DecompositionProcessLevel4ID] = @DecompositionProcessLevel4ID
			  AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID
		select @PDecompositionProcessLevel5ID=DecompositionProcessLevel5ID from Amplo.DecompositionProcessLevel5 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel5NodeId 

= @Processlevel5NodeID;
		SET @DecompositionProcessLevel5ID = @PDecompositionProcessLevel5ID
		select @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID
		RETURN
	END

 else if @Action = 'add'
	begin
	 INSERT INTO [Amplo].[DecompositionProcessLevel5]
			   ([DecompositionProjectID]
			   ,[DecompositionProcessLevel1ID]
			   ,[DecompositionProcessLevel2ID]
			   ,[DecompositionProcessLevel3ID]
			   ,[DecompositionProcessLevel4ID]
			   ,[ProcessLevel5NodeID]
--			   ,[ProcessLevel5Name]
			   ,[ProcessLevel5Title]
--			   ,[ProcessLevel5Description]
			   ,[LeafNodeFlag]
			   ,[Owner]
			   ,[CountrySpecific]
--			   ,[DisableDate]
			   ,[ActiveFlag]
			   ,[CreatedBy]
			   ,[CreatedDate]
				)
		 VALUES
			   (@DecompositionProjectID
			   ,@DecompositionProcessLevel1ID
			   ,@DecompositionProcessLevel2ID
			   ,@DecompositionProcessLevel3ID
			   ,@DecompositionProcessLevel4ID
			   ,@ProcessLevel5NodeID
--			   ,<ProcessLevel5Name, varchar(100),>
			   ,@ProcessLevel5Title
--			   ,<ProcessLevel5Description, varchar(512),>
			   ,@LeafNodeFlag
			   ,@Owner
			   ,@CountrySpecific
--			   ,@DisableDate
			   ,1
			   ,@UserID
			   ,GETDATE()
				)
		SET @DecompositionProcessLevel5ID = SCOPE_IDENTITY();  
		select @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID

		end
		else if @Action = 'delete'
	BEGIN
		UPDATE [Amplo].[DecompositionProcessLevel5]
		   SET 
			   [ActiveFlag] = 0
			  ,[ModifiedBy] = @UserID
			  ,[ModifiedDate] = GETDATE()
		 WHERE DecompositionProcessLevel5ID = @DecompositionProcessLevel5IDInput
		select @PDecompositionProcessLevel5ID=DecompositionProcessLevel5ID from Amplo.DecompositionProcessLevel5 where [DecompositionProjectID] = @DecompositionProjectID AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND ProcessLevel5NodeId 

= @Processlevel5NodeID;
		SET @DecompositionProcessLevel5ID = @PDecompositionProcessLevel5ID
		select @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID
		RETURN
	END
--        COMMIT TRANSACTION;
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
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionProcessLevels5Template]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionProcessLevels5Template]
       @DecompositionProcessLevel4ID [int]
       ,@ProcessLevel5NodeID [varchar](50)
       ,@ProcessLevel5Title [varchar](100)
       ,@LeafNodeFlag [bit]
       ,@UserID [varchar](100)
	   ,@DecompositionProcessLevel5ID [int] OUTPUT
	   , @Action nvarchar(10)
	   , @DecompositionProcessLevel5IDInput [int]
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	
	DECLARE @PDecompositionProcessLevel5ID INT

    BEGIN TRY
--        BEGIN TRANSACTION;

	DECLARE @RecordExists [int]

	select  @RecordExists = COUNT(DecompositionProcessLevel5TemplateID) from Amplo.AmploDecompositionProcessLevel5Template where DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
	AND ProcessLevel5NodeId = @ProcessLevel5NodeID and ActiveFlag = 1

	if(@Action = 'add')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel5Template SET  
			   [ProcessLevel5Title] = @ProcessLevel5Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
			  AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID
	
			select @PDecompositionProcessLevel5ID = DecompositionProcessLevel5TemplateID 
			from Amplo.AmploDecompositionProcessLevel5Template where DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
			AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID

			SELECT @DecompositionProcessLevel5ID = @PDecompositionProcessLevel5ID
			SELECT @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID

			RETURN
		END

	ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel5Template
			(
			  DecompositionProcessLevel5TemplateID
			  ,[ProcessLevel5NodeID]
			  ,[ProcessLevel5Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				@DecompositionProcessLevel4ID
				,@ProcessLevel5NodeID
				,@ProcessLevel5Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel5ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID
		END
	end
	else if(@Action = 'update')
	begin
		if @RecordExists > 0

		BEGIN
			UPDATE Amplo.AmploDecompositionProcessLevel5Template SET  
			   [ProcessLevel5Title] = @ProcessLevel5Title
			  ,[LeafNodeFlag] = @LeafNodeFlag
			  ,[CreatedBy] = @UserID
			  ,[CreatedDate] = GETDATE()
			WHERE DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
			  AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID
	
			select @PDecompositionProcessLevel5ID = DecompositionProcessLevel5TemplateID 
			from Amplo.AmploDecompositionProcessLevel5Template where DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
			AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID

	
			select @PDecompositionProcessLevel5ID = DecompositionProcessLevel5TemplateID 
			from Amplo.AmploDecompositionProcessLevel5Template where DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
			AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID
 
			SELECT @DecompositionProcessLevel5ID = @PDecompositionProcessLevel5ID
			SELECT @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID

			RETURN
		END

		ELSE

		BEGIN

			INSERT INTO [Amplo].AmploDecompositionProcessLevel5Template
			(
			   DecompositionProcessLevel5TemplateID
			  ,[ProcessLevel5NodeID]
			  ,[ProcessLevel5Title]
			  ,[LeafNodeFlag]
			  ,[ActiveFlag]
			  )
			  values
			(
				 @DecompositionProcessLevel4ID
				,@ProcessLevel5NodeID
				,@ProcessLevel5Title
				,@LeafNodeFlag
				, 1
			);

			SELECT @DecompositionProcessLevel5ID = SCOPE_IDENTITY() 
			SELECT @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID
		END
	end
	else if(@Action = 'delete')
	begin
		UPDATE Amplo.AmploDecompositionProcessLevel5Template SET ActiveFlag = 0
			WHERE DecompositionProcessLevel5TemplateID = @DecompositionProcessLevel5IDInput
	
			select @PDecompositionProcessLevel5ID = DecompositionProcessLevel5TemplateID 
			from Amplo.AmploDecompositionProcessLevel5Template where DecompositionProcessLevel4TemplateID = @DecompositionProcessLevel4ID
			AND [ProcessLevel5NodeID] = @ProcessLevel5NodeID

			SELECT @DecompositionProcessLevel5ID = @PDecompositionProcessLevel5ID
			SELECT @DecompositionProcessLevel5ID as DecompositionProcessLevel5ID

			RETURN
	end
	
		RETURN @DecompositionProcessLevel5ID;
  --      COMMIT TRANSACTION;
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
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionScoringCriteria]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 07-October-2019
-- Description:	This procedure updates Custom Scoring Criteria
-- =============================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionScoringCriteria]
	-- Add the parameters for the stored procedure here
	@UserID [int]
	,@DecompositionProjectID [int]
	,@DecompositionProcessLevel1ID [int]
	,@ScoreCriteriaTitle [varchar](100)
	,@DecompositionScoreCriteriaID [int]
	,@UsedFlag [bit]

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
        BEGIN TRY
    BEGIN TRANSACTION;


	Declare @clientid as INT
    Select @clientid = ClientID from Amplo.[User] where UserID = @UserID
	BEGIN
    -- Insert statements for procedure here
		UPDATE [Amplo].[DecompositionScoreCriteriaProject]
		   SET [ScoreCriteriaTitle] = @ScoreCriteriaTitle
			  ,[UsedFlag] = @UsedFlag
		 WHERE [ClientID] = @ClientID
			   AND [DecompositionProjectID] = @DecompositionProjectID
			   AND [DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID
			   AND [DecompositionScoreCriteriaID] = @DecompositionScoreCriteriaID

			-- Successfull updation of records
			SELECT messageName from Amplo.[Message] where MessageID = 1025
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

		EXECUTE [Amplo].[uspLogError];
	END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionStatus]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:      <Author, , Name>
-- Create Date: <Create Date, , >
-- Description: <Description, , >
-- =============================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionStatus]
(
    -- Add the parameters for the stored procedure here
       @DecompositionProjectID [int],
       @DecompositionProcessLevel1ID [int],
	   @Status int
)
AS
BEGIN
    -- SET NOCOUNT ON added to prevent extra result sets from
    -- interfering with SELECT statements.
    SET NOCOUNT ON

    -- Insert statements for procedure here
			--Update Status as Inprogress
			update Amplo.DecompositionProcessLevel1
			set status = @Status where DecompositionProjectID = @DecompositionProjectID and DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionTreeViewHeatMapScores]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ======================================================================================================================================================
-- Author:      Srinivas
-- Create Date: 25-October-2019
-- Description: This procedure retrieves capability modelling treeview
-- ======================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateDecompositionTreeViewHeatMapScores]
	-- Add the parameters for the stored procedure here
	@ProjectID [int],
	@ProcessLevel1ID [int]

--	<@Param2, sysname, @p2> <Datatype_For_Param2, , int> = <Default_Value_For_Param2, , 0>
AS
BEGIN

	SET NOCOUNT ON;

	BEGIN TRY
    BEGIN TRANSACTION;

	Declare @clientid as INT
--	Declare @DecompositionProcessLevel1ID int
 --   Select @clientid = ClientID from Amplo.[User] where UserID = @UserID;

	DECLARE @PProcessLevel1ID [int]
	DECLARE @ProcessLevel2ID [int]
	DECLARE @ProcessLevel3ID [int]
	DECLARE @ProcessLevel4ID [int]
	DECLARE @AvgScoreWeightage [int]
	DECLARE @TotalAvgScore [float]
	DECLARE @TotalAvgScore1 [float]
	DECLARE @TotalAvgScore2 [float]
	DECLARE @TotalAvgScore3 [float]
	DECLARE @TotalAvgScore4 [float]
	DECLARE @TotalAvgScore5 [float]


	DECLARE @ProcessLevel1AverageScore [float]
	DECLARE @ProcessLevel2AverageScore [float]
	DECLARE @ProcessLevel3AverageScore [float]
	DECLARE @ProcessLevel4AverageScore [float]
	DECLARE @ProcessLevel5AverageScore [float]

	DECLARE @ScoreCriteria1	[float]
	DECLARE @ScoreCriteria2	[float]
	DECLARE @ScoreCriteria3	[float]
	DECLARE @ScoreCriteria4	[float]
	DECLARE @ScoreCriteria5	[float]
	DECLARE @ScoreCriteria6	[float]
	DECLARE @ScoreCriteria7	[float]
	DECLARE @ScoreCriteria8	[float]
	DECLARE @ScoreCriteria9	[float]
	DECLARE @ScoreCriteria10 [float]

	DECLARE @DecompositionProcessLevel1ID [INT]
	DECLARE @DecompositionProcessLevel2ID [INT]
	DECLARE @DecompositionProcessLevel3ID [INT]
	DECLARE @DecompositionProcessLevel4ID [INT]
	DECLARE @DecompositionProcessLevel5ID [INT]

	DECLARE @ProcessLevelNodeID [VARCHAR](30)
	DECLARE @ProcessLevelTitle [VARCHAR](100)
	DECLARE @Owner [VARCHAR](100) 
	DECLARE @CountrySpecific [VARCHAR](100)
	DECLARE @LeafNodeFlag [BIT]


	SET @ScoreCriteria1	= 0.00
	SET @ScoreCriteria2	= 0.00
	SET @ScoreCriteria3	= 0.00
	SET @ScoreCriteria4 = 0.00
	SET @ScoreCriteria5	= 0.00
	SET @ScoreCriteria6	= 0.00
	SET @ScoreCriteria7	= 0.00
	SET @ScoreCriteria8	= 0.00
	SET @ScoreCriteria9	= 0.00
	SET @ScoreCriteria10 = 0.00

	SET @TotalAvgScore1 = 4.5
	SET @TotalAvgScore2 = 2.7
	SET @TotalAvgScore3 = 3.8
	SET @TotalAvgScore4 = 1.5
	SET @TotalAvgScore5  = 4.6




--	set @ProjectID = 4
--	set @ProcessLevel1ID = 1
    -- Insert statements for procedure here
	DROP TABLE if exists #DecompositionProcessLevelDetails;
	CREATE TABLE #DecompositionProcessLevelDetails
    (
		ProcessLevel1ID [int],
		ProcessLevel2ID [int],
		ProcessLevel3ID [int],
		ProcessLevel4ID [int],
		ProcessLevel5ID [int],
		ProcessLevelNodeID [varchar](30),
		ProcessLevelTitle [varchar](100), 
		ScoreCriteria1 [float], 
		ScoreCriteria2 [float],
		ScoreCriteria3 [float],
		ScoreCriteria4 [float],
		ScoreCriteria5 [float],
		ScoreCriteria6 [float],
		ScoreCriteria7 [float],
		ScoreCriteria8 [float],
		ScoreCriteria9 [float],
		ScoreCriteria10 [float], 
		NodeLevelID [float], 
		Owner [varchar](100), 
		CountrySpecific [varchar](100), 
		Priority [varchar](100), 
		ProcessLevel [int],
		TotalAvgScore [float],
		TotalAvgScore1 [float],
		TotalAvgScore2 [float],
		TotalAvgScore3 [float],
		TotalAvgScore4 [float],
		TotalAvgScore5 [float]
	  );

--Process Level1 Cursor

	SELECT top 1 @PProcessLevel1ID = a.[DecompositionProcessLevel1ID], @ProcessLevelTitle=[ProcessLevel1Title], @Owner=[Owner], @AvgScoreWeightage = ISNULL([Avg_Score_Weight],2.00) FROM Amplo.DecompositionProcessLevel1 a
	INNER JOIN Amplo.DecompositionProcessLevel1SCORE b on a.DecompositionProcessLevel1ID = b.DecompositionProcessLevel1ID
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
	ORDER BY a.[DecompositionProcessLevel1ID] Asc;
	INSERT INTO #DecompositionProcessLevelDetails
	(
		ProcessLevel1ID, ProcessLevelTitle, Owner, Priority, ProcessLevel
	)
	VALUES
	(
		@ProcessLevel1ID, @ProcessLevelTitle, @Owner, @AvgScoreWeightage, 1
	)


	--Process Level2 Cursor

	DECLARE ProcessLeveL2List CURSOR FAST_FORWARD READ_ONLY
    FOR
	SELECT 
	a.[DecompositionProcessLevel1ID], 
	a.[DecompositionProcessLevel2ID], 
	a.[ProcessLevel2NodeID],
	a.[ProcessLevel2Title], 
	a.[Owner], 
	a.[CountrySpecific], 
	a.[LeafNodeFlag], 
	ISNULL(b.[AvgScoreWeightage],2.00), 
	ISNULL(b.ScoreCriteria1, 0.00), 
	ISNULL(b.ScoreCriteria2,0.00), 
	ISNULL(b.ScoreCriteria3,0.00), 
	ISNULL(b.ScoreCriteria4,0.00),
	ISNULL(b.ScoreCriteria5,0.00), 
	ISNULL(b.ScoreCriteria6,0.00), 
	ISNULL(b.ScoreCriteria7,0.00), 
	ISNULL(b.ScoreCriteria8,0.00), 
	ISNULL(b.ScoreCriteria9,0.00), 
	ISNULL(b.ScoreCriteria10,0.00) 
	FROM Amplo.DecompositionProcessLevel2 a 
    INNER JOIN [Amplo].[DecompositionProcessLevel2Score] b on a.[DecompositionProcessLevel2ID] = b.[DecompositionProcessLevel2ID]
	WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @ProcessLevel1ID
    ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID] Asc;


    OPEN ProcessLeveL2List;
    FETCH NEXT FROM ProcessLeveL2List 
	INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
	

    WHILE @@FETCH_STATUS = 0
    BEGIN
			
		INSERT INTO #DecompositionProcessLevelDetails
		(
			ProcessLevel1ID,ProcessLevel2ID, ProcessLevelNodeID,ProcessLevelTitle, ScoreCriteria1,ScoreCriteria2, ScoreCriteria3,ScoreCriteria4,ScoreCriteria5,	ScoreCriteria6,	ScoreCriteria7,	ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, Owner, CountrySpecific, Priority, ProcessLevel)
			VALUES
			(
				@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @Owner, @CountrySpecific, @AvgScoreWeightage, 2
			);


			DECLARE ProcessLevel3List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], [ProcessLevel3NodeID],[ProcessLevel3Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)
			FROM Amplo.DecompositionProcessLevel3 a
			INNER JOIN Amplo.DecompositionProcessLevel3SCORE b on a.DecompositionProcessLevel3ID = b.DecompositionProcessLevel3ID
			WHERE a.DecompositionProjectID = @ProjectID AND a.DecompositionProcessLevel1ID = @DecompositionProcessLevel1ID AND a.DecompositionProcessLevel2ID = @DecompositionProcessLevel2ID -- and  a.DecompositionProcessLevel3ID = @DecompositionProcessLevel3ID
			ORDER BY a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID] Asc;

			OPEN ProcessLevel3List;
			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage


			WHILE @@FETCH_STATUS = 0
			BEGIN

			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevelNodeID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6,ScoreCriteria7,ScoreCriteria8,	ScoreCriteria9,	ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID,  @Owner, @CountrySpecific, @AvgScoreWeightage, 3);

			DECLARE ProcessLevel4List CURSOR FAST_FORWARD READ_ONLY
			FOR
			SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID], a.[ProcessLevel4NodeID],a.[ProcessLevel4Title], [Owner], [CountrySpecific], [LeafNodeFlag], 
			ISNULL(b.ScoreCriteria1,0.00), ISNULL(b.ScoreCriteria2,0.00), ISNULL(b.ScoreCriteria3,0.00), ISNULL(b.ScoreCriteria4,0.00),ISNULL(b.ScoreCriteria5,0.00), ISNULL(b.ScoreCriteria6,0.00), ISNULL(b.ScoreCriteria7,0.00), ISNULL(b.ScoreCriteria8,0.00), ISNULL(b.ScoreCriteria9,0.00), ISNULL(b.ScoreCriteria10,0.00), ISNULL(b.AvgScoreWeightage,2.00)  
			FROM Amplo.DecompositionProcessLevel4 a
			INNER JOIN [Amplo].[DecompositionProcessLevel4Score] b ON a.DecompositionProcessLevel4ID = b.DecompositionProcessLevel4ID
			WHERE  a.DecompositionProjectID = @ProjectID AND a.[DecompositionProcessLevel1ID] = @DecompositionProcessLevel1ID AND a.[DecompositionProcessLevel2ID] = @DecompositionProcessLevel2ID AND a.[DecompositionProcessLevel3ID] = @DecompositionProcessLevel3ID
			ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID] Asc;

			OPEN ProcessLevel4List;
			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

			WHILE @@FETCH_STATUS = 0
			BEGIN
			--Process Level5
			INSERT INTO #DecompositionProcessLevelDetails
			(
				ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
				VALUES
				(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10,@ProcessLevelNodeID, @Owner, @CountrySpecific, @AvgScoreWeightage, 4);

							DECLARE ProcessLevel5List CURSOR FAST_FORWARD READ_ONLY
							FOR
							SELECT a.[DecompositionProcessLevel1ID], a.[DecompositionProcessLevel2ID], a.[DecompositionProcessLevel3ID], a.[DecompositionProcessLevel4ID],a.[DecompositionProcessLevel5ID], [ProcessLevel5NodeID],[ProcessLevel5Title], [Owner], [CountrySpecific], [LeafNodeFlag],b.ScoreCriteria1, b.ScoreCriteria2, b.ScoreCriteria3, b.ScoreCriteria4,b.ScoreCriteria5, b.ScoreCriteria6, b.ScoreCriteria7, b.ScoreCriteria8, b.ScoreCriteria9, b.ScoreCriteria10, b.AvgScoreWeightage,
							(Amplo.ufngetAverageScore([ScoreCriteria1],[ScoreCriteria2],[ScoreCriteria3],[ScoreCriteria4],[ScoreCriteria5],[ScoreCriteria6],[ScoreCriteria7],[ScoreCriteria8],[ScoreCriteria9],[ScoreCriteria10]) * [AvgScoreWeightage]) AS TotalAvgScore
							from Amplo.DecompositionProcessLevel5 a
							inner join Amplo.DecompositionProcessLevel5Score b on a.DecompositionProcessLevel5ID = b.DecompositionProcessLevel5ID
							where a.[DecompositionProcessLevel5ID] = @DecompositionProcessLevel5ID
							ORDER BY [DecompositionProcessLevel1ID], [DecompositionProcessLevel2ID], [DecompositionProcessLevel3ID], [DecompositionProcessLevel4ID], [DecompositionProcessLevel5ID] Asc;

							OPEN ProcessLevel5List;
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage

							WHILE @@FETCH_STATUS = 0
							BEGIN

								INSERT INTO #DecompositionProcessLevelDetails
								(ProcessLevel1ID, ProcessLevel2ID, ProcessLevel3ID, ProcessLevel4ID, ProcessLevel5ID, ProcessLevelTitle, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10, NodeLevelID, Owner, CountrySpecific, Priority, ProcessLevel)
								VALUES
								(@DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID,@DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelTitle, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4, @ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage, @Owner, @CountrySpecific, @AvgScoreWeightage, 5);
							
							FETCH NEXT FROM ProcessLevel5List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @DecompositionProcessLevel5ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
							END;

							CLOSE ProcessLevel5List;
							DEALLOCATE ProcessLevel5List;

							

			FETCH NEXT FROM ProcessLevel4List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @DecompositionProcessLevel4ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			END;

			CLOSE ProcessLevel4List;
			DEALLOCATE ProcessLevel4List;
		

			FETCH NEXT FROM ProcessLevel3List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID, @DecompositionProcessLevel3ID, @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10, @AvgScoreWeightage
			END;

			CLOSE ProcessLevel3List;
			DEALLOCATE ProcessLevel3List;

	
    FETCH NEXT FROM ProcessLeveL2List INTO @DecompositionProcessLevel1ID, @DecompositionProcessLevel2ID,  @ProcessLevelNodeID, @ProcessLevelTitle, @Owner, @CountrySpecific, @LeafNodeFlag, @AvgScoreWeightage, @ScoreCriteria1, @ScoreCriteria2, @ScoreCriteria3, @ScoreCriteria4,@ScoreCriteria5, @ScoreCriteria6, @ScoreCriteria7, @ScoreCriteria8, @ScoreCriteria9, @ScoreCriteria10
    END;

    CLOSE ProcessLeveL2List;
    DEALLOCATE ProcessLeveL2List;

   CREATE INDEX IX_ProcessLevelID ON #DecompositionProcessLevelDetails (ProcessLevel1ID, ProcessLevel2ID,ProcessLevel3ID,ProcessLevel4ID,ProcessLevel5ID);

	select 
			ProcessLevel1ID,
			ProcessLevel2ID,
			ProcessLevel3ID,
			ProcessLevel4ID,
			ProcessLevel5ID,
			ProcessLevelNodeID as ProcessLevelID, 
			ProcessLevelTitle, 
			ScoreCriteria1, 
			ScoreCriteria2,
			ScoreCriteria3,
			ScoreCriteria4,
			ScoreCriteria5,
			ScoreCriteria6,
			ScoreCriteria7,
			ScoreCriteria8,
			ScoreCriteria9,
			ScoreCriteria10, 
			NodeLevelID, 
			Owner, 
			CountrySpecific, 
			Priority, 
			TotalAvgScore,
			4.5 TotalAvgScore1,
			2.7 TotalAvgScore2,
			3.8 TotalAvgScore3,
			1.5 TotalAvgScore4,
			4.6 TotalAvgScore5,

			ProcessLevel 
		FROM #DecompositionProcessLevelDetails


		DROP TABLE if exists #DecompositionProcessLevelDetails;

    COMMIT TRANSACTION;
	RETURN 0;
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
/****** Object:  StoredProcedure [Amplo].[uspUpdateEnterpriseAccountDetail]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =========================================================================================================================================================
-- Author:		Srinivas
-- Create date: 24-Dec-2019
-- Description:	This procedure updates Company Profile details
-- =========================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateEnterpriseAccountDetail]
	-- Add the parameters for the stored procedure here
    @UserID int,
	@ClientID int,
    @CountryRegionCodeID int,
    @IndustryVerticalID int,
    @IndustrySubVerticalID int,
    @NoOfEmployees int,
    @Country varchar(100),
    @StateTerritory varchar(100),
    @City nvarchar(50),
    @PostalCode NVARCHAR(15),
	@Address1 NVARCHAR(100),
	@Address2 NVARCHAR(100),
	@CompanyLogo NVARCHAR(100),
	@ClientName nvarchar(255),
	@IndustryID int,
	@FirstName varchar(100),
    @LastName varchar(100),
	@EmailAddress varchar(100)
--    @CompanyProfileID INT OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
    BEGIN TRY
    BEGIN TRANSACTION;

--            declare @clientId INT
--            select @clientId = ClientID from Amplo.[User] where UserID = @UserID and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

--            declare @IndustryID INT
--            select IndustryID from Amplo.[Client] where ClientID = @clientId and ActiveFlag = 1

            declare @alreadyInput int
            select @alreadyInput = Count(CompanyProfileID) from Amplo.AmploCompanyProfile where ClientID = @clientId 

            if @alreadyInput = 0
            --If company profile not entered even once yet. Insert
            BEGIN

                Insert into Amplo.AmploCompanyProfile
                (
                    [ClientID]
                    ,[CountryRegionCodeID]
                    ,[IndustryID]
                    ,[IndustryVerticalID]
                    ,[IndustrySubVerticalID]
                    ,[NoOfEmployees]
                    ,[Country]
                    ,[StateTerritory]
                    ,[City]
                    ,[PostalCode]
                    ,[ActiveFlag]
                    ,[CreatedBy]
                    ,[CreatedDate]
					,[Address1]
					,[Address2]
					,[CompanyLogo]
					,[ClientName]
					,[FirstName]
					,[LastName]
					,[EmailAddress]

                )
                Values(
                    @clientId,
                    @CountryRegionCodeID,
                    @IndustryID,
                    @IndustryVerticalID,
                    @IndustrySubVerticalID,
                    @NoOfEmployees,
                    @Country,
                    @StateTerritory,
                    @City,
                    @PostalCode,
                    1,
                    @UserID,
                    GETDATE(),
				    @Address1,
				    @Address2,
				    @CompanyLogo,
					@ClientName,
					@FirstName,
					@LastName,
					@EmailAddress
                )

  --      declare @createdCompanyProfileID int
        
--            SELECT @CompanyProfileID = SCOPE_IDENTITY();

    END

    ELSE
        BEGIN

--            declare @PCompanyProfileID int
--            select @PCompanyProfileID = CompanyProfileID from Amplo.AmploCompanyProfile where clientID = @clientId and ActiveFlag = 1
--            SELECT @CompanyProfileID = @PCompanyProfileID

            UPDATE Amplo.AmploCompanyProfile
            SET [CountryRegionCodeID] = @CountryRegionCodeID
            ,[IndustryID] = @IndustryID
            ,[IndustryVerticalID] = @IndustryVerticalID
            ,[IndustrySubVerticalID] = @IndustrySubVerticalID
            ,[NoOfEmployees] = @NoOfEmployees
            ,[Country] = @Country
            ,[StateTerritory] = @StateTerritory
            ,[City] = @City
            ,[PostalCode] = @PostalCode
            ,[ModifiedBy] = @UserID
            ,[ModifiedDate] = GETDATE()
			,[Address1] = @Address1 
			,[Address2] = @Address2
			,[CompanyLogo] = @CompanyLogo
			,[ClientName] = @ClientName
			,[FirstName] = @FirstName
		    ,[LastName] = @LastName
			,[EmailAddress] = @EmailAddress
           where ClientID = @ClientID
        END


    --Success Message

        select MessageName from Amplo.[Message] where MessageID = 1041

--    select @CompanyProfileID;

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateEnterpriseAccountDetails]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =========================================================================================================================================================
-- Author:		Srinivas
-- Create date: 24-Dec-2019
-- Description:	This procedure updates Company Profile details
-- =========================================================================================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateEnterpriseAccountDetails] 
	-- Add the parameters for the stored procedure here
    @UserID int,
    @CountryRegionCodeID int,
    @IndustryVerticalID int,
    @IndustrySubVerticalID int,
    @NoOfEmployees int,
    @Country varchar(100),
    @StateTerritory varchar(100),
    @City nvarchar(50),
    @PostalCode NVARCHAR(15),
	@Address1 NVARCHAR(100),
	@Address2 NVARCHAR(100),
	@CompanyLogo NVARCHAR(100),
	@ClientName nvarchar(255),
    @CompanyProfileID INT OUTPUT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
    BEGIN TRY
    BEGIN TRANSACTION;

            declare @clientId INT
            select @clientId = ClientID from Amplo.[User] where UserID = @UserID and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

            declare @IndustryID INT
            select IndustryID from Amplo.[Client] where ClientID = @clientId and ActiveFlag = 1

            declare @alreadyInput int
            select @alreadyInput = Count(CompanyProfileID) from Amplo.AmploCompanyProfile where ClientID = @clientId 

            if @alreadyInput = 0
            --If company profile not entered even once yet. Insert
            BEGIN

                Insert into Amplo.AmploCompanyProfile
                (
                    [ClientID]
                    ,[CountryRegionCodeID]
                    ,[IndustryID]
                    ,[IndustryVerticalID]
                    ,[IndustrySubVerticalID]
                    ,[NoOfEmployees]
                    ,[Country]
                    ,[StateTerritory]
                    ,[City]
                    ,[PostalCode]
                    ,[ActiveFlag]
                    ,[CreatedBy]
                    ,[CreatedDate]
					,[Address1]
					,[Address2]
					,[CompanyLogo]
					,[ClientName]
                )
                Values(
                    @clientId,
                    @CountryRegionCodeID,
                    @IndustryID,
                    @IndustryVerticalID,
                    @IndustrySubVerticalID,
                    @NoOfEmployees,
                    @Country,
                    @StateTerritory,
                    @City,
                    @PostalCode,
                    1,
                    @UserID,
                    GETDATE(),
				    @Address1,
				    @Address2,
				    @CompanyLogo,
					@ClientName
                )

  --      declare @createdCompanyProfileID int
        
            SELECT @CompanyProfileID = SCOPE_IDENTITY();

    END

    ELSE
        BEGIN

            declare @PCompanyProfileID int
            select @PCompanyProfileID = CompanyProfileID from Amplo.AmploCompanyProfile where clientID = @clientId and ActiveFlag = 1
            SELECT @CompanyProfileID = @PCompanyProfileID

            UPDATE Amplo.AmploCompanyProfile
            SET [CountryRegionCodeID] = @CountryRegionCodeID
            ,[IndustryID] = @IndustryID
            ,[IndustryVerticalID] = @IndustryVerticalID
            ,[IndustrySubVerticalID] = @IndustrySubVerticalID
            ,[NoOfEmployees] = @NoOfEmployees
            ,[Country] = @Country
            ,[StateTerritory] = @StateTerritory
            ,[City] = @City
            ,[PostalCode] = @PostalCode
            ,[ModifiedBy] = @UserID
            ,[ModifiedDate] = GETDATE()
			,[Address1] = @Address1 
			,[Address2] = @Address2
			,[CompanyLogo] = @CompanyLogo
			,[ClientName] = @ClientName
            where CompanyProfileID = @PCompanyProfileID
        END


    --Success Message

    --    select MessageName from Amplo.[Message] where MessageID = 1021

    select @CompanyProfileID;

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateEnterpriseDIVATeam]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Srinivas
-- Create date: 28-Sept-2019
-- Description:	This procedure updates Enterprise DIVA team
-- =============================================
CREATE PROCEDURE [Amplo].[uspUpdateEnterpriseDIVATeam]

-- Add the parameters for the stored procedure here
        @UserID [int],
		@DIVAUserID [int],
        @EmailAddress [nvarchar](100),
        @FirstName [varchar](100),
--      @MiddleName [varchar](50),
        @LastName [varchar](100),
		@UserType [int],
		@DisableDate [date],
		@UserIPAddress [varchar](50),
		@UserStatusID [int]
		
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
    BEGIN TRY
    BEGIN TRANSACTION;

    declare @SuperUser as INT
    Select @SuperUser = UserTypeID From Amplo.[User] where UserID = @UserID

    IF ISNULL(@SuperUser,0) <> 1
    BEGIN
    --Not Allowed returned as message
    SELECT messageName from Amplo.[Message] where MessageID = 1011
        COMMIT
        Return
    END


    DECLARE @clientID int
    Select @clientID = ClientID from Amplo.[User] where @UserID = UserID
    
    BEGIN
        --Set every to add on user
        Update Amplo.[UserDIVATeam]
        Set [FirstName] = @FirstName 
        ,[LastName] = @LastName
        ,[Email] = @EmailAddress
       ,[ActiveFlag] = 1
       ,[UserTypeID] = @UserType
       ,[UserStatusID] = @UserStatusID
  	   ,[DisableDate] = @DisableDate
       ,[ModifiedBy] = @UserID
       ,[ModifiedDate]= GETDATE()
		where UserDIVATeamID = @DIVAUserID

       select MessageName from Amplo.[Message] where MessageID = 1024   --Successful updation of superusers message returned
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

        EXECUTE [Amplo].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateEnterpriseUserProfileDetails]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =======================================================================================
-- Author:		Srinivas
-- Create date: 22-October-2019
-- Description:	This procedure updated User Profile details
-- =======================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateEnterpriseUserProfileDetails]
	-- Add the parameters for the stored procedure here
       @UserID [int]
      ,@FirstName [varchar](100)
      ,@MiddleName [varchar](50)
      ,@LastName [varchar](100)
      ,@PhoneNumber [nvarchar](100)
	  ,@ProfilePhotoPath [nvarchar](100)
--      ,@EmailAddress nvarchar(256)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   -- Insert statements for procedure here
    BEGIN TRY

	UPDATE [Amplo].[User]
	   SET 
		   [FirstName] = @FirstName
		  ,[MiddleName] = @MiddleName
		  ,[LastName] = @LastName
		  ,[PhoneNumber] = @PhoneNumber
		  ,[ProfilePhotoPath] = @ProfilePhotoPath
--		  ,[EmailAddress] = @EmailAddress
	 WHERE UserID=@UserID

    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateKPI]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Biswajit
-- Create date: 22-October-2019
-- Description:	This procedure updates KPI
-- =============================================
CREATE PROCEDURE [Amplo].[uspUpdateKPI]
	-- Add the parameters for the stored procedure here
		   @KpiId [int]
          ,@UserID [varchar](100)
		  ,@KPITitle [varchar](100)
		  ,@BusinessOutcome [varchar](512)
          ,@BusinessMetrics [varchar](256) 
          ,@PersonaImpacted [varchar](256)
          ,@EstimatedSavings [varchar](100)
--KPI Sets Implementation
		  ,@ExpectedTargetGrowth [nvarchar](100)
		  ,@UnitOfMeasurement [nvarchar](50)
		  ,@TargetDate [datetime]
		  ,@Improvementbasis [varchar](50)
		  ,@AuditFrequency [varchar](50)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    BEGIN TRY
    BEGIN TRANSACTION;
	if(@KpiId is not null and @KpiId != 0)
	begin
		update [Amplo].[KPI]
		set 
			KPITItle = @KPITitle
			,BusinessOutcome = @BusinessOutcome 
			, BusinessMetrics = @BusinessMetrics
			, PersonaImpacted = @PersonaImpacted
			, EstimatedSavings = @EstimatedSavings
			, ModifiedBy = @UserID
			, ModifiedDate = GETDATE()
			,ExpectedTargetGrowth = @ExpectedTargetGrowth
			,UnitOfMeasurement = @UnitOfMeasurement 
			,TargetDate = @TargetDate 
			,Improvementbasis = @Improvementbasis
			,AuditFrequency = @AuditFrequency 
		where KpiId = @KpiId
	end
    Select MessageName from Amplo.[Message] where MessageID = 1026

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateKPIControlLevers]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ====================================================================================
-- Author:		Srinivas
-- Create date: 11-October-2019
-- Description:	This procedure udpates ProcessLevel2 details
-- ====================================================================================
CREATE PROCEDURE [Amplo].[uspUpdateKPIControlLevers]
	-- Add the parameters for the stored procedure here
        @USERID [int]
	   ,@KPIID [int]
       ,@KPIControlLeversID [int]
       ,@ControlLeversTitle [varchar](512)
       ,@PersonaImpacted [varchar](512)
	   ,@Action [varchar](30)
	   ,@KPIInhibitors [NVARCHAR](MAX)
	   ,@KPICapabilities [NVARCHAR](MAX)
       ,@ExpectedTargetGrowth [nvarchar](100)
       ,@UnitOfMeasurement [nvarchar](50)
       ,@TargetDate [datetime]
       ,@Improvementbasis [varchar](50)
       ,@AuditFrequency [varchar](50)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE
    @counter    INT = 1,
    @max        INT = 0,
	@KPIControlLeverID [int],
	@KPIInhibitorsID [int],
	@KPICapabilitiesID int,
	@InhibitorsTitle VARCHAR(512),
    @CapabilitiesTitle VARCHAR(512),
	@Probability nvarchar(20),
	@ImpactCost nvarchar(50),
	@InvestmentRequired nvarchar(50),
	@ExpectedBy datetime,
	@ROWNumber int

    -- Insert statements for procedure here
	
    BEGIN TRY
        BEGIN TRANSACTION;
	
	IF UPPER(@Action) = N'MODIFY'

		BEGIN
	
	
			UPDATE [Amplo].[KPIControlLevers]
			   SET [ControlLeversTitle] = @ControlLeversTitle
				  ,[PersonaImpacted] = @PersonaImpacted
				  ,[ExpectedTargetGrowth] = @ExpectedTargetGrowth
				  ,[UnitOfMeasurement] = @UnitOfMeasurement
				  ,[TargetDate] = @TargetDate
				  ,[Improvementbasis] = @Improvementbasis
				  ,[AuditFrequency] = @AuditFrequency
				  ,[ModifiedBy] = @USERID
				  ,[ModifiedDate] = GETDATE()
			 WHERE [KPIID] = @KPIID AND [KPIControlLeversID] = @KPIControlLeversID

		/* 
		This section is for KPI Inhibitors details to update and delete 
		*/


			SELECT ID, KPIInhibitorsID, InhibitorsTitle, Action, Probability, ImpactCost
			INTO #tblInhibitors
			FROM OPENJSON (@KPIInhibitors, '$.root')
			WITH (
			ID int,
			KPIInhibitorsID INT,
			InhibitorsTitle VARCHAR(512),
		    Probability nvarchar(20),
			ImpactCost nvarchar(50),
			Action VARCHAR(30)
			);

				SELECT @max = COUNT(1) FROM #tblInhibitors

				while @counter <= @max
					BEGIN
						SELECT @KPIInhibitorsID = KPIInhibitorsID, @InhibitorsTitle = InhibitorsTitle, @Action = Action, @Probability=Probability, @ImpactCost=ImpactCost
						FROM #tblInhibitors WHERE ID = @counter
						select UPPER(@Action) AS INHIBITORACTIONS

						IF UPPER(@Action) = 'ADD'
						BEGIN
							INSERT INTO [Amplo].[KPIInhibitors]
								([KPIControlLeversID]
								,[InhibitorsName]
								,[InhibitorsTitle]
								,[Probability]
								,[ImpactCost]
								,[ActiveFlag]
								,[CreatedBy]
								,[CreatedDate]
								)
							VALUES
								(@KPIControlLeverID
								,'Inhibitors Name'
								,@InhibitorsTitle
								,@Probability
								,@ImpactCost
								,1
								,@UserID
								,GETDATE()
								)
						END
						ELSE IF UPPER(@Action) = 'MODIFY'
						BEGIN
							UPDATE [Amplo].[KPIInhibitors]
							SET 
								 [InhibitorsTitle] = @InhibitorsTitle
								,[Probability] = @Probability
								,[ImpactCost] = @ImpactCost
								,[ActiveFlag] = 1
								,[ModifiedBy] = @USERID
								,[ModifiedDate] = GETDATE()
							WHERE [KPIControlLeversID] = @KPIControlLeversID AND [KPIInhibitorsID] = @KPIInhibitorsID
						END
						ELSE IF UPPER(@Action) = 'DELETE'
							UPDATE [Amplo].[KPIInhibitors]
							SET 
								 [ActiveFlag] = 0
								,[ModifiedBy] = @USERID
								,[ModifiedDate] = GETDATE()
							WHERE [KPIControlLeversID] = @KPIControlLeversID AND [KPIInhibitorsID] = @KPIInhibitorsID

						SET @counter = @counter + 1

					END


		/* 
		This section is for KPI Capabilities details to update and delete 
		*/

			SET @counter = 1
			SELECT ID, [KPICapabilitiesID], [CapabilitiesTitle], Action
			INTO #tblCapabiliities
			FROM OPENJSON (@KPICapabilities, '$.root')
			WITH (
			ID int,
			KPICapabilitiesID INT,
			CapabilitiesTitle VARCHAR(512),
			Action VARCHAR(30)
			);

				SELECT @max = COUNT(1) FROM #tblCapabiliities
				SELECT @max 
				while @counter <= @max
					BEGIN
						select UPPER(@Action) AS INHIBITORACTIONS

						SELECT @KPICapabilitiesID = KPICapabilitiesID, @CapabilitiesTitle = CapabilitiesTitle, @Action = Action, @InvestmentRequired=InvestmentRequired,@ExpectedBy=ExpectedBy 
						FROM #tblCapabiliities WHERE ID = @counter
						IF UPPER(@Action) = 'ADD'
						BEGIN
							INSERT INTO [Amplo].[KPICapabilities]
							([KPIControlLeversID]
							,[CapabilitiesName]
							,[CapabilitiesTitle]
							,[InvestmentRequired]
							,[ExpectedBy]
							,[ActiveFlag]
							,[CreatedBy]
							,[CreatedDate]
							)
							VALUES
							(@KPIControlLeverID
							,'Capabilities Name'
							,@CapabilitiesTitle
							,@InvestmentRequired
							,@ExpectedBy
							,1
							,@UserID
							,GETDATE()
							);
						END
						IF UPPER(@Action) = 'MODIFY'
						BEGIN
							UPDATE [Amplo].[KPICapabilities]
							SET 
								 [CapabilitiesTitle] = @CapabilitiesTitle
								 ,[InvestmentRequired] = @InvestmentRequired
								 ,[ExpectedBy] = @ExpectedBy
								,[ActiveFlag] = 1
								,[ModifiedBy] = @USERID
								,[ModifiedDate] = GETDATE()
							WHERE [KPIControlLeversID] = @KPIControlLeversID AND KPICapabilitiesID = @KPICapabilitiesID
						END
						ELSE IF UPPER(@Action) = N'DELETE'
							UPDATE [Amplo].[KPICapabilities]
							SET 
								 [ActiveFlag] = 0
								,[ModifiedBy] = @USERID
								,[ModifiedDate] = GETDATE()
							WHERE [KPIControlLeversID] = @KPIControlLeversID AND KPICapabilitiesID = @KPICapabilitiesID
					
						SET @counter = @counter + 1
					END
		END




	/*ELSE IF UPPER(@Action) = N'ADD'

		BEGIN

		SELECT N'ÁDD'





			END
*/

	ELSE IF UPPER(@Action) = N'DELETE'

		BEGIN

		SELECT N'DELETE'

			UPDATE [Amplo].[KPIControlLevers]
			SET ActiveFlag = 0
			WHERE [KPIID] = @KPIID AND [KPIControlLeversID] = @KPIControlLeversID

		END

    Select messageName from Amplo.[Message] where MessageID = 1027;

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [AMPLO].[uspLogError];
    END CATCH;
END
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateSubscription]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspUpdateSubscription]
 (
      @ClientID int
	  ,@SubscriptionKey varchar(50)
      ,@StartDate datetime
      ,@EndDate datetime

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

--            declare @clientId INT
--            select @clientId = ClientID from Amplo.[User] where UserID = @UserID and ActiveFlag = 1 and EmailValidationStatus =1 and UserStatusID = 1

            declare @alreadyInput int
            select @alreadyInput = Count(ClientAuditID) from Amplo.ClientAudit where ClientID = @clientId 

            if @alreadyInput = 0
            --If company profile not entered even once yet. Insert
            BEGIN

			INSERT INTO [Amplo].[Subscription]
					   ([ClientID]
					   ,[SubscriptionKey]
					   ,[StartDate]
					   ,[EndDate])
				 VALUES
					   (@ClientID
					   ,@SubscriptionKey
					   ,@StartDate
					   ,@EndDate
)

  --      declare @createdCompanyProfileID int
        
--            SELECT @CompanyProfileID = SCOPE_IDENTITY();

    END

    ELSE
        BEGIN

			UPDATE [Amplo].[Subscription]
			   SET [ClientID] = @ClientID
				  ,[SubscriptionKey] = @SubscriptionKey
				  ,[StartDate] = @StartDate
				  ,[EndDate] = @EndDate
			 WHERE ClientID = @ClientID

    --Success Message

        select MessageName from Amplo.[Message] where MessageID = 1021
		end

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
/****** Object:  StoredProcedure [Amplo].[uspUpdateSuperusers]    Script Date: 1/9/2020 6:47:56 PM ******/
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
/****** Object:  StoredProcedure [Amplo].[uspVerifyUserEmail]    Script Date: 1/9/2020 6:47:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspVerifyUserEmail]
    (
        @PHashCode [varchar](512)
    )
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
    BEGIN TRANSACTION;
    
    DECLARE @PAvailable INT
    SELECT @PAvailable = Count(UserID) from Amplo.EmailVerification WHERE VerificationHashCode = @PHashCode AND ActiveFlag=1

    IF (@PAvailable<1)
        BEGIN
            SELECT MessageName from Amplo.[Message] WHERE MessageID=10
        END

    ELSE
        BEGIN

            Declare @PUserID INT
            Select @PUserID = UserID from Amplo.EmailVerification WHERE VerificationHashCode = @PHashCode AND ActiveFlag=1 
            
            UPDATE Amplo.[EmailVerification]
            SET VerificationFlag = 1, VerificationDate = GETDATE(), ActiveFlag=0 WHERE VerificationHashCode = @PHashCode AND ActiveFlag=1
            
            UPDATE Amplo.[User]
            SET EmailValidationStatus=1 WHERE UserID = @PUserID

            SELECT MessageName from Amplo.[Message] WHERE MessageID=9
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

        EXECUTE [Amplo].[uspLogError];
    END CATCH;

END;










GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Logs error information in the ErrorLog table about the error that caused execution to jump to the CATCH block of a TRY...CATCH construct. Should be executed from within the scope of a CATCH block otherwise it will return without inserting error information.' , @level0type=N'SCHEMA',@level0name=N'Amplo', @level1type=N'PROCEDURE',@level1name=N'uspLogError'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Output parameter for the stored procedure uspLogError. Contains the ErrorLogID value corresponding to the row inserted by uspLogError in the ErrorLog table.' , @level0type=N'SCHEMA',@level0name=N'Amplo', @level1type=N'PROCEDURE',@level1name=N'uspLogError', @level2type=N'PARAMETER',@level2name=N'@ErrorLogID'
GO
