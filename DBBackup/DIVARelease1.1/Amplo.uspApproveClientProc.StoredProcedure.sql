USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspApproveClientProc]    Script Date: 1/9/2020 6:50:44 PM ******/
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
