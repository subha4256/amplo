USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[RunScriptForAllSchema]    Script Date: 1/9/2020 6:50:44 PM ******/
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
