USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[GrantAccessSP]    Script Date: 1/9/2020 6:50:44 PM ******/
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
