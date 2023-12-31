USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[GrantAccessToAllUser]    Script Date: 1/9/2020 6:50:44 PM ******/
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
