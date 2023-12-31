USE [DIVAPORTAL]
GO
/****** Object:  UserDefinedFunction [Amplo].[CSVToList]    Script Date: 20-11-2019 15:28:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [Amplo].[CSVToList] (@CSV varchar(3000)) 
    RETURNS @Result TABLE (Value varchar(100))
AS   
BEGIN
    DECLARE @List TABLE
    (
        Value varchar(30)
    )

    DECLARE
        @Value varchar(30),
        @Pos int

    SET @CSV = LTRIM(RTRIM(@CSV))+ ','
    SET @Pos = CHARINDEX(',', @CSV, 1)

    IF REPLACE(@CSV, ',', '') <> ''
    BEGIN
        WHILE @Pos > 0
        BEGIN
            SET @Value = LTRIM(RTRIM(LEFT(@CSV, @Pos - 1)))

            IF @Value <> ''
                INSERT INTO @List (Value) VALUES (@Value) 

            SET @CSV = RIGHT(@CSV, LEN(@CSV) - @Pos)
            SET @Pos = CHARINDEX(',', @CSV, 1)
        END
    END     

    INSERT @Result
    SELECT
        Value
    FROM
        @List
    
    RETURN
END
GO
