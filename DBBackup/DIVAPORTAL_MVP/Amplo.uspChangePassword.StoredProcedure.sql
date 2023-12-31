USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspChangePassword]    Script Date: 20-11-2019 15:28:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [Amplo].[uspChangePassword]
@UserId int
, @NewPassword nvarchar(256)
as
begin
	BEGIN TRY
		update [Amplo].[User] set [UserPassword] = @NewPassword
		where UserId = @UserId
    END TRY
    BEGIN CATCH
        EXECUTE [AMPLO].[uspLogError];
    END CATCH
end
GO
