USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspUpdateDecompositionStatus]    Script Date: 20-11-2019 15:28:24 ******/
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
