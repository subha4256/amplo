USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserDomainsForBMProject]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [Amplo].[uspGetUserDomainsForBMProject]
 (
    @id [int],
    @projectid [int]
 )
AS
BEGIN
/*
@id - Logged in userID
*/
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   select MappedDomains.DomainID, domainDetails.DomianName DomainName, 
   cast((case when (select count(1) from amplo.BenchmarkAuditLog where BenchmarkProjectId = @projectid and DomainId = MappedDomains.DomainId)
   > 0 then 1 else 0 end) as bit) IsAuditLogPresent
   from (select DomainID from Amplo.UserDomainAccess where UserID = @id and BenchmarkProjectID = @projectid And ActiveFlag = 1 ) MappedDomains ---get mapped Domains
   inner join (select DomainID,DomianName from Amplo.AmploDomain) domainDetails -- get Domain Name
   ON MappedDomains.DomainID = domainDetails.DomainID 

    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        -- Rollback any active or uncommittable transactions before
        -- inserting information in the ErrorLog
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
    



END














GO
