USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[CreateSchemaAndAllPOC]    Script Date: 1/9/2020 6:50:44 PM ******/
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
