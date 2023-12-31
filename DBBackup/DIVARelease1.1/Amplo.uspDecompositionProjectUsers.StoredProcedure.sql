USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspDecompositionProjectUsers]    Script Date: 1/9/2020 6:50:44 PM ******/
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
