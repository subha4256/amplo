USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspGetUserDomainsForBMProject]    Script Date: 1/9/2020 6:50:44 PM ******/
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
SET NOCOUNT ON
    BEGIN TRY
    BEGIN TRANSACTION;

   select MappedDomains.DomainID, domainDetails.DomianName DomainName, MappedDomains.AccessType, 
   cast((case when (select count(1) from amplo.BenchmarkAuditLog where BenchmarkProjectId = @projectid and DomainId = MappedDomains.DomainId)
   > 0 then 1 else 0 end) as bit) IsAuditLogPresent
   from (select DomainID, [AccessType] from Amplo.UserDomainAccess where UserID = @id and BenchmarkProjectID = @projectid And ActiveFlag = 1 and AccessType != 3) MappedDomains ---get mapped Domains
   inner join (select DomainID,DomianName from Amplo.AmploDomain) domainDetails -- get Domain Name
   ON MappedDomains.DomainID = domainDetails.DomainID 
    COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

        EXECUTE [dbo].[uspLogError];
    END CATCH;
END














GO
