USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspFetchTemplateByClientId]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Amplo].[uspFetchTemplateByClientId]
@ClientId as int
as
BEGIN
    set nocount on
    select cmt.TemplateID, cmt.TemplateTitle
    from amplo.CMTempClientRelationship cmr
    join amplo.CMTemplate cmt on cmt.TemplateID = cmr.TemplateID
    where cmr.ClientID = @ClientId
end
GO
