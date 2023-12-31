USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetDecompositionActivityBank]    Script Date: 1/9/2020 6:50:44 PM ******/
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
