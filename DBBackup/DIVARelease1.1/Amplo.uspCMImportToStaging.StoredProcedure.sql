USE [DIVAPORTAL]
GO
/****** Object:  StoredProcedure [Amplo].[uspCMImportToStaging]    Script Date: 1/9/2020 6:50:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [Amplo].[uspCMImportToStaging]
@ProjectName as nvarchar(100)
, @ScoringMechanism as nvarchar(MAX)
, @ProcessL1 as nvarchar(MAX)
, @Decomposition as nvarchar(MAX)
, @AdditionalDetail as nvarchar(MAX)
, @UserId int
As
begin
	set nocount on
	begin try
		declare @ClientId int = (select ClientId from amplo.[User] where UserId = @UserId)
		declare @ProcessLevel1Title as nvarchar(100)
		declare @MasterId uniqueidentifier = newId()
		declare @SuccessFlag as bit = 0
		declare @ProjectId as int = (select top 1 [DecompositionProjectID] from [Amplo].[DecompositionProject] where [ProjectName] = @ProjectName and [ClientID] = @ClientId and ActiveFlag = 1 and DisabledFlag = 0)
		if(@ProjectId is not null and @ProjectId > 0)
		begin
			set @SuccessFlag = @SuccessFlag
		end
		else
		begin
			set @SuccessFlag = 0
			insert into amplo.CMImportLogStaging
			values(newId(), @MasterId, 'error', 'The project is not available!', '', GETDATE())
		end

		if(select count(1) from [Amplo].[DecompositionProjectUser] where [DecompositionProjectID] = @ProjectId and [UserID] = @UserId and ActiveFlag = 1) > 0
		begin
			set @SuccessFlag = @SuccessFlag
		end
		else
		begin
			set @SuccessFlag = 0
			insert into amplo.CMImportLogStaging
			values(newId(), @MasterId, 'error', 'The user is not permitted to edit this project!', '', GETDATE())
		end

		SELECT *
		INTO #ProcessLevel1
		FROM OPENJSON (@ProcessL1, '$.root')
		WITH (
		[Phase] NVARCHAR(100)
        , [Function] NVARCHAR(100)
		, Title NVARCHAR(100)
		, [Priority] NVARCHAR(100)
		, [Owner] NVARCHAR(100)
		, Country NVARCHAR(100)
		)
		if(select count(1) from [Amplo].[DecompositionProcessLevel1] l1 
			join [Amplo].[DecompositionFunctionProject] f on (l1.[DecompositionProjectID] = f.[DecompositionProjectID] and f.ActiveFlag = 1)
			join [Amplo].[DecompositionPhaseProject] p on (p.[DecompositionProjectID] = l1.[DecompositionProjectID] and p.ActiveFlag = 1)
			join #ProcessLevel1 pl1 on (pl1.[Phase] = p.PhaseName and l1.[ProcessLevel1Title] = Title
			and pl1.[Function] = f.FunctionName)
			where l1.[DecompositionProjectID] = @ProjectId
			) > 0
		begin
			
			set @SuccessFlag = @SuccessFlag
		end
		else
		begin
			set @SuccessFlag = 0
			insert into amplo.CMImportLogStaging
			values(newId(), @MasterId, 'error', 'The phase or function or the activity is not present. You cannot edit either of these!', '', GETDATE())
		end

		set @SuccessFlag = 1
		if(@SuccessFlag = 1)
		begin
			set @ProcessLevel1Title = (select top 1 Title from #ProcessLevel1)
			insert into amplo.CMProjectImportStaging
			values(@MasterId, @ProjectName, @ProcessLevel1Title, @ClientId, @UserId, GETDATE(), 0)

			------------- Scoring mechanism --------------
			SELECT *
			INTO #ScoringMechanism
			FROM OPENJSON (@ScoringMechanism, '$.root')
			WITH (
			ScoreCriteria1 NVARCHAR(100)
			, ScoreCriteria2 NVARCHAR(100)
			, ScoreCriteria3 NVARCHAR(100)
			, ScoreCriteria4 NVARCHAR(100)
			, ScoreCriteria5 NVARCHAR(100)
			, ScoreCriteria6 NVARCHAR(100)
			, ScoreCriteria7 NVARCHAR(100)
			, ScoreCriteria8 NVARCHAR(100)
			, ScoreCriteria9 NVARCHAR(100)
			, ScoreCriteria10 NVARCHAR(100)
			)

			insert into amplo.CMScoringMechanismImportStaging
			select top 1 NewId(), @MasterId, ScoreCriteria1, ScoreCriteria2, ScoreCriteria3, ScoreCriteria4, ScoreCriteria5
			, ScoreCriteria6, ScoreCriteria7, ScoreCriteria8, ScoreCriteria9, ScoreCriteria10 from #ScoringMechanism


			-------------------- Process Level 1 ------------------
			insert into amplo.CMProcessL1ImportStaging
			select NewId(), @MasterId, [Phase], [Function], Title, [Priority], [Owner], Country from #ProcessLevel1


			--------------------- Decomposition ------------------
			SELECT *
			INTO #Decomposition
			FROM OPENJSON (@Decomposition, '$.root')
			WITH (
			  L1ActivityTitle nvarchar(100)
			, L2ActivityTitle nvarchar(100)
			, L3ActivityTitle nvarchar(100)
			, L4ActivityTitle nvarchar(100)
			, L5ActivityTitle nvarchar(100)
			, ScoringCriteria1 numeric(2, 1)
			, ScoringCriteria2 numeric(2, 1)
			, ScoringCriteria3 numeric(2, 1)
			, ScoringCriteria4 numeric(2, 1)
			, ScoringCriteria5 numeric(2, 1)
			, ScoringCriteria6 numeric(2, 1)
			, ScoringCriteria7 numeric(2, 1)
			, ScoringCriteria8 numeric(2, 1)
			, ScoringCriteria9 numeric(2, 1)
			, ScoringCriteria10 numeric(2, 1)
			, [Priority] nvarchar(100)
			, [Owner] nvarchar(100)
			, Country nvarchar(100)
			)

			insert into amplo.CMDecompositionImportStaging
			select NewId(), @MasterId, L2ActivityTitle, L3ActivityTitle, L4ActivityTitle, L5ActivityTitle, ScoringCriteria1, ScoringCriteria2, ScoringCriteria3, ScoringCriteria4
			, ScoringCriteria5, ScoringCriteria6, ScoringCriteria7, ScoringCriteria8, ScoringCriteria9, ScoringCriteria10, [Priority], [Owner], Country from #Decomposition

			--------------------- Additional Detail ------------------
			SELECT *
			INTO #AdditionalDetail
			FROM OPENJSON (@Decomposition, '$.root')
			WITH (
			  L1ActivityTitle nvarchar(100)
			, L2ActivityTitle nvarchar(100)
			, L3ActivityTitle nvarchar(100)
			, L4ActivityTitle nvarchar(100)
			, L5ActivityTitle nvarchar(100)
			, Number1 numeric(10, 2), Number2 numeric(10, 2), Number3 numeric(10, 2), Number4 numeric(10, 2), Number5 numeric(10, 2)
			, Number6 numeric(10, 2), Number7 numeric(10, 2), Number8 numeric(10, 2), Number9 numeric(10, 2), Number10 numeric(10, 2)
			, Attribute1 nvarchar(256), Attribute2 nvarchar(256), Attribute3 nvarchar(256), Attribute4 nvarchar(256), Attribute5 nvarchar(256)
			, Attribute6 nvarchar(256), Attribute7 nvarchar(256), Attribute8 nvarchar(256), Attribute9 nvarchar(256), Attribute10 nvarchar(256)
			, Blob1 varbinary(MAX), Blob2 varbinary(MAX), Blob3 varbinary(MAX), Clob1 varchar(MAX), Clob2 varchar(MAX), Clob3 varchar(MAX)
			)

			insert into amplo.CMAdditionalDetailImportStaging
			select NewId(), @MasterId, L2ActivityTitle, L3ActivityTitle, L4ActivityTitle, L5ActivityTitle, Number1, Number2, Number3, Number4
			, Number5, Number6, Number7, Number8, Number9, Number10, Attribute1, Attribute2, Attribute3, Attribute4, Attribute5, Attribute6, Attribute7, Attribute8
			, Attribute9, Attribute10, Blob1, Blob2, Blob3, Clob1, Clob2, Clob3
			from #AdditionalDetail
		end

		select @SuccessFlag Success, 'Imported successfully' [Message]
	end try
	begin catch
		select cast(0 as bit) Success, error_message() [Message]
		exec dbo.uspLogError
	end catch
end


	
GO
