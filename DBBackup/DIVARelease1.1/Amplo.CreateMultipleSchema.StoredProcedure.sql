USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[CreateMultipleSchema]    Script Date: 1/9/2020 6:50:44 PM ******/
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
