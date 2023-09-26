<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'Api','middleware'=>'api'], function () {
    
    Route::get('/clear-cache', function() {
        $run = Artisan::call('config:clear');
        $run = Artisan::call('cache:clear');
        $run = Artisan::call('config:cache');
        return 'FINISHED';  
    });
    //Route::post('/post_upload_file', 'UserController@post_upload_file');
    // user related apis
    Route::get('/infoCheck', 'UserController@infoCheck');
    Route::post('/checkLogin', 'UserController@checkLogin');
    Route::post('/register-user', 'UserController@registerUser');
    Route::post('/login-user', 'UserController@loginUser');
    Route::post('/login-token-market-place', 'UserController@loginTokenMarketPlace');
    Route::post('/get-aws-customer', 'UserController@getAwsCustomer');
    Route::post('/get-aws-entitlements', 'UserController@getAwsEntitlements');
    Route::post('/uspSaveMarketplaceUsers', 'UserController@uspSaveMarketplaceUsersApi');
    Route::get('/uspGetMarketplaceUsersDetails', 'UserController@uspGetMarketplaceUsersDetails');
    Route::post('/reset-password', 'UserController@resetPassword');
    Route::get('/verifyUserEmail','UserController@uspVerifyUserEmail');
    Route::get('/verifyEmployeeEmail','UserController@verifyEmployeeEmail');
    Route::get('/approve/{clientId}','ApproveController@Approve');
    Route::get('/get-approve/{clientId}','ApproveController@getApprove');
    Route::get('/userDetailFromEmail','UserController@getUserDetailFromEmail');
    Route::post('/send_forgot_password','UserController@sendForgotPassword');
    Route::post('/register-employee','UserController@registerEmployee');
    Route::get('/get-account-type','UserController@getAccountType');
    Route::get('/getUserAccessType','UserController@getUserAccessType');
    Route::PATCH('/UpdateAmploQuestionBankFromInterface','UserController@UpdateAmploQuestionBankFromInterface');
    Route::PATCH('/UpdateClientQuestionBankFromInterface','BenchmarkQuestionsBankController@UpdateClientQuestionBankFromInterface');
    //Industry collection
    Route::get('/industry-collection', 'UserController@fetchIndustryCollection');

    //Revunue collection
    Route::get('/revenue-collection', 'UserController@fetchRevnueCollection');

     //Revunue collection
    Route::get('/restricted-domain', 'UserController@fetchRestrictedDomain');

    Route::group(['middleware' => 'jwt.verify'], function () {
        Route::get('/getUserRegistrationDetails', 'UserProfileController@getUserRegistrationDetails');
        Route::post('/saveUserActivity', 'UserProfileController@saveUserActivity');
        Route::get('/getLastUserActivity/{Activity}', 'UserProfileController@getLastUserActivity');
        Route::get('/getting-started-video', 'UserProfileController@gettingStartedVideos');
         //Menu collection
        Route::get('/fetch-menus/{menuBlockId}', 'MenuController@fetchMenu');


        Route::get('/dashboard-data', 'DashboardController@fetchDashBoardData');
        Route::get('/CalculateCO2Emmision/{UOM}/{EPA}', 'DashboardController@CalculateCO2Emmision');
        Route::get('/GetCountryforCo2Emmision', 'DashboardController@GetCountryforCo2Emmision');
        Route::get('/GetCo2EmmisionType', 'DashboardController@GetCo2EmmisionType');
        Route::get('/GetUOMDetails', 'DashboardController@GetUOMDetails');
        Route::get('/getProgressDataForDashBoard/{projectType}/{projectId}', 'DashboardController@getProgressDataForDashBoard');

        //capability related Apis
        Route::get('/capability-client-projects', 'DecompositionController@getClientProjects');
        Route::get('/capability-project-details/{assesmentId}', 'DecompositionController@getProjectDetails');
        Route::post('/add-capability-project', 'DecompositionController@addClientProject');
        Route::put('/update-capability-project', 'DecompositionController@updateClientProject');

        Route::get('/AmpProjectLinkWithCMProject/{DecompositionProjectID}/{AmpMarkingProjectId}', 'DecompositionController@AmpProjectLinkWithCMProject');

        /* 28-04-2020 */
        Route::post('/copyCapabilityProject', 'DecompositionController@copyCapabilityProject');
        Route::get('/GetDecompositionUserProjectsToCopy', 'DecompositionController@GetDecompositionUserProjectsToCopy');
        Route::get('/getDecompositionProjectVersion/{projectId}/{processLevel1Id}/{projectVersionId}/', 'DecompositionController@getDecompositionProjectVersion');
        Route::post('/decompositionLockUnlock/', 'DecompositionController@decompositionLockUnlock');

        // project related apis
        Route::get('/client-users', 'ProjectController@getClientUserList');
        Route::get('/client-projects', 'ProjectController@getClientProjects');
        Route::post('/add-client-project', 'ProjectController@addClientProject');
        Route::put('/update-client-project', 'ProjectController@updateClientProject');
        Route::get('/project-details/{assesmentId}', 'ProjectController@getProjectDetails');
        Route::get('/getRelationShipData/{projectType}', 'ProjectController@getRelationShipData');

        Route::delete('/deleteProjectRelation/{relationShipId}', 'ProjectController@deleteProjectRelation');

        /*Amit's routes*/
        //benchmark routes
        Route::get('/get_benchmark','BenchmarkController@getBenchmarkingLevels');
        Route::get('/get_benchmark_level/{projectId}','BenchmarkController@getLevelData');
        Route::get('/get_benchmark_report_status/{projectId}','BenchmarkController@getBMReportLockStatus');
        Route::get('/get_user_bm_projects','BenchmarkController@getUserBMProjects');
        Route::get('/get_user_domains_bm_project/{projectId}','BenchmarkController@getUserDomainsForBMProject');
        Route::get('/fetch_bm_question_list/{projectId}/{domainId}','BenchmarkController@fetchBMQuestionList');

        Route::get('/fetchBQBQuestionList/{BenchMarkProjectId}/{domainId}','BenchmarkQuestionsBankController@fetchBQBQuestionList');

        Route::get('/fetchQBQuestionList/{BenchmarkProjectId}/{domainId}','BenchmarkController@fetchQBQuestionList');
        Route::get('/fetch_bm_question_details/{projectId}/{domainId}/{questionId}','BenchmarkController@fetchBMQuestionDetails');
        Route::get('/BackBMPreviousQuestionDetails/{projectId}/{domainId}/{questionId}','BenchmarkController@BackBMPreviousQuestionDetails');
        Route::get('/fetchBQBQuestionDetails/{BenchMarkProjectId}/{domainId}/{questionId}','BenchmarkQuestionsBankController@fetchBQBQuestionDetails');
        Route::post('/update_project_locking_status','BenchmarkController@updateBenchmarkingProjectLockStatus');
        Route::post('/update_bm_question_response','BenchmarkController@updateBMQuestionResponse');
        

        /* Abdul routes*/
        //Route::group(['middleware' => 'permission.check'], function () {
            Route::get('/get_benchmarking_project_users/{projectId}','BenchmarkController@getBenchmarkingProjectUsers');
            Route::get('/get_benchmarking_projects','BenchmarkController@getBenchmarkingProjects');
            Route::get('/get_benchmarking_domain_access/{benchmarkProjectId}/{UserId}','BenchmarkController@getBenchmarkingDomainAccess');
            Route::post('/save_benchmarking_domain_access','BenchmarkController@saveBenchmarkingDomainAccess');
            Route::get('/get_decomposition_phase/{TemplateId}','BenchmarkController@getDecompositionPhase');
            Route::get('/get_decomposition_function/{TemplateId}','BenchmarkController@getDecompositionFunction');
        //});
        Route::get('/getUnAnsweredQuestion/{projectId}/{domainId}','BenchmarkController@getUnAnsweredQuestion'); 
        Route::post('/generateDataForAmpMarking/','BenchmarkController@generateDataForAmpMarking');
        
        Route::get('/getASISAflyScores/{projectId}', 'BenchmarkController@getASISAflyScores');
        Route::post('/saveAmploAnalyticsUsecaseruns', 'BenchmarkController@saveAmploAnalyticsUsecaseruns');
        Route::post('/saveClientAnalyticsUsecaseruns', 'BenchmarkController@saveClientAnalyticsUsecaseruns');
        Route::get('/getAmploAnalyticsUsecaserunsDetails/{IndustryLeaderID}/{IndustryLeaderName}', 'BenchmarkController@getAmploAnalyticsUsecaserunsDetails');
        Route::get('/getClientAnalyticsUsecaserunsDetails/{IndustryLeaderID}/{IndustryLeaderName}', 'BenchmarkController@getClientAnalyticsUsecaserunsDetails');

        /*Benchmarking Questions Bank routes*/ 
        Route::post('/saveAmploQuestionBank','BenchmarkQuestionsBankController@saveAmploQuestionBank');
        Route::post('/saveClientQuestionBank','BenchmarkQuestionsBankController@saveClientQuestionBank');
        Route::post('/saveAmploDomain','BenchmarkQuestionsBankController@saveAmploDomain');
        Route::post('/saveClientDomain','BenchmarkQuestionsBankController@saveClientDomain');
        Route::post('/SaveClientDomainForProject','BenchmarkQuestionsBankController@SaveClientDomainForProject');
        Route::post('/saveAmploQuesionsAnswers','BenchmarkQuestionsBankController@saveAmploQuesionsAnswers');
        Route::post('/saveClientQuesionsAnswers','BenchmarkQuestionsBankController@saveClientQuesionsAnswers');
        Route::get('/GetKpisAgainstBalanceScoreCardId/{BalanceScoreCardId}', 'KpiController@GetKpisAgainstBalanceScoreCardId');
        Route::post('/InsertUpdateBenchmarkDropdoenScoring','KpiController@InsertUpdateBenchmarkDropdoenScoring');

        Route::post('/SaveClientBenchMarkQuestionAnswers','BenchmarkQuestionsBankController@SaveClientBenchMarkQuestionAnswers');
        Route::post('/SaveUpdateKPIDashBoardDetail','BenchmarkQuestionsBankController@SaveUpdateKPIDashBoardDetail');
        Route::post('/SaveUpdateWeightageforScoringMechanisms','BenchmarkQuestionsBankController@SaveUpdateWeightageforScoringMechanisms');
        Route::post('/SaveUpdateWeightageforPriority','BenchmarkQuestionsBankController@SaveUpdateWeightageforPriority');
       // Route::post('/SaveUpdateWeightageforPriority','BenchmarkQuestionsBankController@SaveUpdateWeightageforPriority');
        Route::post('/InsertUpdateSkipQuestion','BenchmarkQuestionsBankController@InsertUpdateSkipQuestion');
        Route::post('/SaveAmpMarkingCapabilityProjectRelation','DecompositionProjectController@SaveAmpMarkingCapabilityProjectRelation');
        Route::post('/CheckCircularDependency','DecompositionProjectController@CheckCircularDependency');
        Route::post('/SaveDependentDetail','DecompositionProjectController@SaveDependentDetail');
        Route::post('/SaveFpmMerge','DecompositionProjectController@SaveFpmMerge');
        Route::get('/getAmploQuestionBank','BenchmarkQuestionsBankController@getAmploQuestionBank');   
        Route::get('/getClientQuestionBank/{flag}','BenchmarkQuestionsBankController@getClientQuestionBank');
        Route::post('/uspCheckDuplicateAmploQuestionBankName','BenchmarkQuestionsBankController@uspCheckDuplicateAmploQuestionBankName');
        Route::post('/uspCheckDuplicateClientQuestionBankName','BenchmarkQuestionsBankController@uspCheckDuplicateClientQuestionBankName');
        Route::get('/getAmploDomainQuestions/{QuestionBankId}','BenchmarkQuestionsBankController@getAmploDomainQuestions');
        Route::get('/getClientDomainQuestions/{QuestionBankId}','BenchmarkQuestionsBankController@getClientDomainQuestions');
        Route::get('/getAmploDomains/{QuestionBankId}','BenchmarkQuestionsBankController@getAmploDomains');
        Route::get('/getClientDomains/{QuestionBankId}','BenchmarkQuestionsBankController@getClientDomains');
        Route::get('/getQBDomainsForEdit/{BenchmarkProjectId}','BenchmarkQuestionsBankController@getQBDomainsForEdit');
        Route::get('/getAmploQuesionsAnswers/{DomainId}/{QuestionBankId}','BenchmarkQuestionsBankController@getAmploQuesionsAnswers');
        Route::get('/getClientQuestionsAnswers/{DomainId}/{QuestionBankId}','BenchmarkQuestionsBankController@getClientQuestionsAnswers');
        Route::get('/getClientBenchmarkQuestionsAnswers/{DomainId}/{QuestionBankId}','BenchmarkQuestionsBankController@getClientBenchmarkQuestionsAnswers');
        Route::get('/getClientBenchmarkResponses/{ProjectId}','BenchmarkQuestionsBankController@getClientBenchmarkResponses');
        Route::get('/getClientPerformanceSummary/{ProjectId}','BenchmarkQuestionsBankController@getClientPerformanceSummary');
        Route::get('/getClientStrategyAssessment/{ProjectId}','BenchmarkQuestionsBankController@getClientStrategyAssessment');
        Route::get('/getClientKPIDashBoard/{ProjectId}/{FinancialYear}','BenchmarkQuestionsBankController@getClientKPIDashBoard');
        Route::get('/getClientStrategyAssessmentDetailsData/{ProjectId}','BenchmarkQuestionsBankController@getClientStrategyAssessmentDetailsData');
        Route::get('/getClientStrategyAssessmentReport/{ProjectId}','BenchmarkQuestionsBankController@getClientStrategyAssessmentReport');
        Route::get('/getClientRevenueGrowthManagement/{ProjectId}/{FinancialYear}','BenchmarkQuestionsBankController@getClientRevenueGrowthManagement');
        Route::get('/getClientRevenueGrowthManagementDetailsData/{ProjectId}/{FinancialYear}','BenchmarkQuestionsBankController@getClientRevenueGrowthManagementDetailsData');
        Route::get('/getClientRevenueGrowthManagementReport/{ProjectId}/{FinancialYear}','BenchmarkQuestionsBankController@getClientRevenueGrowthManagementReport');
        Route::get('/getClientOpertaionManagement/{ProjectId}','BenchmarkQuestionsBankController@getClientOpertaionManagement');
        Route::get('/getListOfQuestionDomainWise/{DomainId}/{CurrentBenchmarkQuestionId}/{BenchmarkQuestionOptionId}/{CallFrom}/{QuestionBankId}','BenchmarkQuestionsBankController@getListOfQuestionDomainWise');
        Route::get('/GetWeightageforScoringMechanisms/{DecompositionProjectID}/{DecompositionProcessLevel1ID}','BenchmarkQuestionsBankController@GetWeightageforScoringMechanisms');
        
        Route::get('/GetWeightageforPriority/{DecompositionProjectID}/{DecompositionProcessLevel1ID}','BenchmarkQuestionsBankController@GetWeightageforPriority');
        Route::get('/GetSliderValue/{ProjectId}/{DomainId}/{QuestionId}/{DropdownOptionValue}','BenchmarkController@GetSliderValue');
        Route::get('/getAmpMarkingCapabilityProjectRelation/{AmpMarkingProjectId}/{CapabilityModelingProjectId}','DecompositionProjectController@getAmpMarkingCapabilityProjectRelation');
        Route::get('/GetFunctionPhasebyProjectId/{DecompositionProjectID}','DecompositionProjectController@GetFunctionPhasebyProjectId'); 
        Route::get('/GetCausalDataAndScore/{DecompositionProjectID}/{DecompositionProcessLevel1ID}','DecompositionProjectController@GetCausalDataAndScore'); 
        Route::get('/GetDependentDetail/{DecompositionProjectID}/{DecompositionProcessLevel1ID}/{DependentMasterId}','DecompositionProjectController@GetDependentDetail');
        Route::get('/GetDependentDetailbyDecompositionProcessLevelID/{DecompositionProjectID}/{DecompositionProcessLevel1ID}','DecompositionProjectController@GetDependentDetailbyDecompositionProcessLevelID');
        Route::get('/GetProcessForFpmMerge/{DecompositionProjectID1}/{DecompositionProjectID2}','DecompositionProjectController@GetProcessForFpmMerge');
        Route::get('/GetCausalByProjectId/{DecompositionProjectID}','DecompositionProjectController@GetCausalByProjectId');    
        Route::get('/getQuantitativeQuestionsScore/{QuestionId}/{QuestionsText}','KpiController@getQuantitativeQuestionsScore');
        Route::get('/getBenchmarkDropdoenScoring/{BenchmarkProjectId}/{DomainID}/{BenchmarkQuestionId}','KpiController@getBenchmarkDropdoenScoring');
        Route::get('/getActionListForQuestion/{ProjectId}','BenchmarkQuestionsBankController@getActionListForQuestion');
        Route::get('/getClientDigitalAdoptation/{ProjectId}','BenchmarkQuestionsBankController@getClientDigitalAdoptation');
        Route::get('/getClientTransformationProject/{ProjectId}','BenchmarkQuestionsBankController@getClientTransformationProject');
        Route::get('/getActionListForQuestion','BenchmarkQuestionsBankController@getActionListForQuestion');
        Route::get('/getKPIDashboardValueForEdit/{BenchmarkProjectId}/{FinancialYear}','KpiController@getKPIDashboardValueForEdit');
        Route::get('/getFinancialYear','KpiController@getFinancialYear');
        Route::get('/getAllBmStyles/','BenchmarkQuestionsBankController@getAllBmStyles');
        Route::post('/getBmListStyle/','BenchmarkQuestionsBankController@getBmListStyle');
        Route::get('/getBmStyleDetails/{StyleId}','BenchmarkQuestionsBankController@getBmStyleDetails');
        Route::get('/deleteAmploQuestion/{QuestionId}','BenchmarkQuestionsBankController@deleteAmploQuestion');
        Route::get('/deleteAmploDomain/{DomainId}','BenchmarkQuestionsBankController@deleteAmploDomain');
        Route::get('/deleteAmploQuestionBank/{QuestionBankId}','BenchmarkQuestionsBankController@deleteAmploQuestionBank');
        Route::post('/saveAmploAttachment/','BenchmarkQuestionsBankController@saveAmploAttachment');
        Route::get('/getAmploAttachment/{QuestionId}','BenchmarkQuestionsBankController@getAmploAttachment');
        Route::get('/deleteAmploAttachment/{attachmentId}','BenchmarkQuestionsBankController@deleteAmploAttachment');
        Route::get('/getAllClientQuestionBank/','BenchmarkQuestionsBankController@getAllClientQuestionBank');
        Route::get('/getClientQuestions/{QuestionBankId}','BenchmarkQuestionsBankController@getClientQuestions');
        Route::get('/getAmploClientQuestionBank/','BenchmarkQuestionsBankController@getAmploClientQuestionBank');

        Route::get('/deleteClientQuestion/{QuestionId}','BenchmarkQuestionsBankController@deleteClientQuestion');
        Route::get('/deleteClientDomain/{DomainId}','BenchmarkQuestionsBankController@deleteClientDomain');
        Route::get('/DeleteClientDomainForProject/{projectId}/{DomainId}','BenchmarkQuestionsBankController@DeleteClientDomainForProject');
        Route::get('/DeleteBenchMarkQuestionAnswers/{projectId}/{domainId}/{BenchmarkQuestionID}','BenchmarkQuestionsBankController@DeleteBenchMarkQuestionAnswers'); 
        Route::get('/UpdateAFlyScoreOfBenchMarkQuestion/{BenchmarkQuestionID}/{IsAFlyScoreEnabled}','BenchmarkQuestionsBankController@UpdateAFlyScoreOfBenchMarkQuestion');
        Route::get('/deleteClientQuestionBank/{QuestionBankId}','BenchmarkQuestionsBankController@deleteClientQuestionBank');
        Route::post('/saveClientAttachment/','BenchmarkQuestionsBankController@saveClientAttachment');
        Route::get('/getClientAttachment/{QuestionId}','BenchmarkQuestionsBankController@getClientAttachment');
        Route::get('/getBQClientAttachment/{QuestionId}','BenchmarkQuestionsBankController@getBQClientAttachment');

        Route::get('/DeleteDependentDetail/{DecompositionProjectID}/{DecompositionProcessLevel1ID}/{DependentMasterId}','DecompositionProjectController@DeleteDependentDetail');
        Route::get('/DeleteDependentMaster/{DecompositionProjectID}/{DecompositionProcessLevel1ID}/{DependentMasterId}','DecompositionProjectController@DeleteDependentMaster');
        Route::get('/DeleteDependentCapability/{DecompositionProjectID}/{DecompositionProcessLevel1ID}/{DependentMasterId}','DecompositionProjectController@DeleteDependentCapability');
        Route::get('/deleteClientAttachment/{attachmentId}','BenchmarkQuestionsBankController@deleteClientAttachment');
        Route::post('/saveClientAssignment','BenchmarkQuestionsBankController@saveClientAssignment');
        Route::get('/getClientAssignment/{QuestionBankId}','BenchmarkQuestionsBankController@getClientAssignment');

        Route::post('/clientDuplicateQuestionBank/','BenchmarkQuestionsBankController@clientDuplicateQuestionBank');
        Route::post('/amploDuplicateQuestionBank/','BenchmarkQuestionsBankController@amploDuplicateQuestionBank');

        Route::post('/updateClientQuestionBankIndustry/','BenchmarkQuestionsBankController@updateClientQuestionBankIndustry');
        Route::post('/updateAmploQuestionBankIndustry/','BenchmarkQuestionsBankController@updateAmploQuestionBankIndustry');
        
        Route::get('/getAmploQuestionBankIndustry/{QuestionBankId}','BenchmarkQuestionsBankController@getAmploQuestionBankIndustry');
        Route::get('/getClientQuestionBankIndustry/{QuestionBankId}','BenchmarkQuestionsBankController@getClientQuestionBankIndustry');

        /*Amplo Side QB Import*/
        Route::get('/exportAmploQuestionBank/{questionBankId}','BenchmarkQuestionsBankController@exportAmploQuestionBank');
        Route::post('/importAmploQuestionBank/','BenchmarkQuestionsBankController@importAmploQuestionBank');

        Route::get('/getAmploQuestionBankImport/{batchId}','BenchmarkQuestionsBankController@getAmploQuestionBankImport');
        Route::get('/getAmploQuestionsImport/{questionBankId}/{batchId}','BenchmarkQuestionsBankController@getAmploQuestionsImport');
        Route::get('/getAmploDomainsImport/{questionBankId}/','BenchmarkQuestionsBankController@getAmploDomainsImport');
        Route::get('/getAmploQuestionsByDomainImport/{domainId}/{questionBankId}/{batchId}','BenchmarkQuestionsBankController@getAmploQuestionsByDomainImport');
        Route::get('/getAmploAttachmentImport/{questionId}','BenchmarkQuestionsBankController@getAmploAttachmentImport');

        Route::post('/saveAmploQuestionBankImport/','BenchmarkQuestionsBankImportController@saveAmploQuestionBankImport');
        Route::post('/saveAmploDomainImport/','BenchmarkQuestionsBankImportController@saveAmploDomainImport');
        Route::post('/saveAmploQuesionsAnswersImport/','BenchmarkQuestionsBankImportController@saveAmploQuesionsAnswersImport');
        Route::delete('/deleteAmploQuestionImport/{questionId}','BenchmarkQuestionsBankImportController@deleteAmploQuestionImport');
        Route::delete('/deleteAmploDomianImport/{domainId}','BenchmarkQuestionsBankImportController@deleteAmploDomianImport');               
        Route::delete('/deleteAmploQuestionBankImport/{questionBankId}','BenchmarkQuestionsBankImportController@deleteAmploQuestionBankImport');
        Route::delete('/deleteAmploAttachmentImport/{attachmentId}','BenchmarkQuestionsBankImportController@deleteAmploAttachmentImport');
        Route::post('/saveAmploAttachmentImport/','BenchmarkQuestionsBankImportController@saveAmploAttachmentImport');
        Route::post('/updateAmploQuestionBankIndustryImport/','BenchmarkQuestionsBankImportController@updateAmploQuestionBankIndustryImport');

        Route::post('/saveAmploQuestionBankFromInterface/','BenchmarkQuestionsBankImportController@saveAmploQuestionBankFromInterface');
        Route::get('/getAmploQuestionBankImportInfo/{batchId}','BenchmarkQuestionsBankImportController@getAmploQuestionBankImportInfo');

        /*Client Side QB Import*/
        Route::get('/exportClientQuestionBank/{questionBankId}','BenchmarkQuestionsBankController@exportClientQuestionBank');
        Route::post('/importClientQuestionBank/','BenchmarkQuestionsBankController@importClientQuestionBank');

        Route::get('/getClientQuestionBankImport/{batchId}','BenchmarkQuestionsBankController@getClientQuestionBankImport');
        Route::get('/getClientQuestionsImport/{questionBankId}/{batchId}','BenchmarkQuestionsBankController@getClientQuestionsImport');
        Route::get('/getClientDomainsImport/{questionBankId}','BenchmarkQuestionsBankController@getClientDomainsImport');
        Route::get('/getClientQuestionsByDomainImport/{domainId}/{questionBankId}/{batchId}','BenchmarkQuestionsBankController@getClientQuestionsByDomainImport');
        Route::get('/getClientAttachmentImport/{questionsId}','BenchmarkQuestionsBankController@getClientAttachmentImport');

        Route::post('/saveClientQuestionBankImport/','BenchmarkQuestionsBankImportController@saveClientQuestionBankImport');
        Route::post('/saveClientDomainImport/','BenchmarkQuestionsBankImportController@saveClientDomainImport');
        Route::post('/saveClientQuesionsAnswersImport/','BenchmarkQuestionsBankImportController@saveClientQuesionsAnswersImport');
        Route::delete('/deleteClientQuestionImport/{questionId}','BenchmarkQuestionsBankImportController@deleteClientQuestionImport');
        Route::delete('/deleteClientDomianImport/{domainId}','BenchmarkQuestionsBankImportController@deleteClientDomianImport');
        Route::delete('/deleteClientQuestionBankImport/{questionBankId}','BenchmarkQuestionsBankImportController@deleteClientQuestionBankImport');
        Route::delete('/deleteClientAttachmentImport/{attachmentId}','BenchmarkQuestionsBankImportController@deleteClientAttachmentImport');
        Route::post('/saveClientAttachmentImport/','BenchmarkQuestionsBankImportController@saveClientAttachmentImport');
        Route::post('/updateClientQuestionBankIndustryImport/','BenchmarkQuestionsBankImportController@updateClientQuestionBankIndustryImport');

        Route::post('/saveClientQuestionBankFromInterface/','BenchmarkQuestionsBankImportController@saveClientQuestionBankFromInterface');
        Route::get('/getClientQuestionBankImportInfo/{batchId}','BenchmarkQuestionsBankImportController@getClientQuestionBankImportInfo');
        //capabilty routes
        Route::get('/get_decomposition_user_projects','DecompositionProjectController@getDecompositionUserProjects');
		Route::post('/decomposition_duplicate_projects','DecompositionProjectController@decompositionDuplicateProjects');
        Route::get('/get_decomposition_function_project/{projectId}/{versionId}','DecompositionProjectController@getDecompositionFunctionProject');
        Route::get('/get_decomposition_phase_project/{projectId}/{versionId}','DecompositionProjectController@getDecompositionPhaseProject');
        Route::get('/get_decomposition_level_one_activities/{projectId}/{versionId}','DecompositionProjectController@getDecompositionLevel1Activities');
        Route::get('/get_decomposition_activity_status_summary/{projectId}/{versionId}','DecompositionProjectController@getDecompositionActivityStatusSummary');
        Route::get('/get_decomposition_activity_bank/{projectId}/{versionId}','DecompositionProjectController@getDecompositionActivityBank');
        Route::post('/add_decomposition_process_level_activities','DecompositionProjectController@addDecompositionProcessLevel1Activity');
        Route::get('/fetch_templates','DecompositionProjectController@fetchTemplates');  
        Route::get('fetch_functions/{TemplateID}','DecompositionProjectController@fetchFunctions');
        Route::get('fetch_phases/{TemplateID}','DecompositionProjectController@fetchPhases'); 
        Route::post('/save_function_phase','DecompositionProjectController@saveFunctionPhase');  
        Route::post('/createTemplate','DecompositionProjectController@createTemplate');  
        Route::post('/updateTemplate','DecompositionProjectController@updateTemplate'); 
        Route::post('deleteTemplate','DecompositionProjectController@deleteTemplate');  
        Route::post('duplicateTemplate','DecompositionProjectController@duplicateTemplate');          
        Route::get('/getTemplates', 'DecompositionProjectController@getTemplates');
        Route::get('/getTemplate/{TemplateID}', 'DecompositionProjectController@getTemplate');
        Route::get('/getTemplateByClientId', 'DecompositionProjectController@getTemplateByClientId');
        Route::get('/getFunctionPhaseStyles', 'DecompositionProjectController@getFunctionPhaseStyles');
        Route::get('/getFunctionPhaseStylesByTemplate/{TemplateID}', 'DecompositionProjectController@getFunctionPhaseStylesByTemplate');
        Route::post('/saveFunctionPhaseAssignment', 'DecompositionProjectController@saveFunctionPhaseAssignment');
        Route::get('/get-styles/{ProjectID}', 'DecompositionProjectController@getStyles');
        Route::post('/save-template-image', 'DecompositionProjectController@SaveTemplateImage');
        Route::post('/deleteFunction', 'DecompositionProjectController@deleteFunction');
		Route::post('/deletePhase', 'DecompositionProjectController@deletePhase');
        //decomposition routes
        Route::get('/get_decomposition_process_level_one_connected/{ProjectID}/{ProcessLevelId}/{FunctionId}/{PhaseId}/{versionId}','DecompositionProjectController@getDecompositionProcessLevel1Connected');
        Route::get('/get_decomposition_process_level_two_tasks/{ProjectId}/{ProcessLevelId}','DecompositionProjectController@getDecompositionProcessLevel2Tasks');
        
        Route::post('/update_decomposition_level_location','DecompositionProjectController@updateDecompositionLevelLocation');

        Route::get('/get_decomposition_scoring_criteria/{ProjectId}/{processLevelId}/{versionId}','DecompositionProjectController@getDecompositionScoringCriteria');

        Route::get('/get_decomposition_scoring_custom_criteria/{ProjectId}/{processLevelId}/{versionId}','DecompositionProjectController@getDecompositionScoringCustomCriteria');
        
        Route::post('/update_decomposition_scoring_criteria','DecompositionProjectController@updateDecompositionScoringCriteria');
        Route::post('/update_decomposition_levels_data','DecompositionProjectController@updateDecompositionLevelsData');
        Route::post('/update_decomposition_levels_template_data','DecompositionProjectController@updateDecompositionLevelsTemplateData');
        
        Route::get('/get_decomposition_tree_view/{projectId}/{processLevelId}/{versionId}/{projectVersionId}','DecompositionProjectController@getDecompositionTreeView');
        Route::get('/get_decomposition_tree_view_heatmap/{projectId}/{processLevelId}/{versionId}/{projectVersionId}','DecompositionProjectController@getDecompositionTreeViewHeatMap');
        Route::get('/get_decomposition_level_tasks/{projectId}/{levelId}','DecompositionProjectController@getDecompositionProcessLevel2Tasks');
        Route::get('/get_decomposition_process_level_search/{projectId}/{searchKey}','DecompositionProjectController@getDecompositionProcessLevelSearch');

        //decomposition heat map view
        Route::get('/get_process_level_one_heatmap/{projectId}/{versionId}','DecompositionProjectController@getProcessLevel1HeatMap');

        //Decomposition Template Tree View
        Route::get('/get_decomposition_template_tree_view/{templateId}/{processLevelId}','DecompositionProjectController@getDecompositionTemplateTreeView');

        Route::get('/getDecompositionProjectFunction/{projectId}/{templateId}','DecompositionProjectController@getDecompositionProjectFunction');
        Route::get('/getDecompositionProjectPhase/{projectId}/{templateId}','DecompositionProjectController@getDecompositionProjectPhase');
        Route::get('/getDecompositionProjectUsers/{projectId}','DecompositionProjectController@getDecompositionProjectUsers');
        Route::get('/getDecompositionUserAccess/{projectId}/{userId}/{templateId}','DecompositionProjectController@getDecompositionUserAccess'); 
        Route::post('/saveDecompositionProjectUsersAccess','DecompositionProjectController@saveDecompositionProjectUsersAccess');
        /* 13-12-2019 */
        Route::get('/generateCSV/{projectId}/{processLevel1ID}/{Version}','DecompositionProjectController@generateCSV'); 
        Route::post('/post_upload_file','DecompositionProjectController@post_upload_file');
        Route::post('/unlinkFile', 'DecompositionProjectController@unlinkFile');
        /* 01-10-2019 */
        Route::get('/exportCMProject/{projectId}/{Version}','DecompositionProjectController@exportCMProject'); 
        Route::post('/importCMProject','DecompositionProjectController@importCMProject');

         /* 26-12-2019 */
        Route::post('/saveFunction', 'DecompositionProjectController@saveFunction');
        Route::post('/savePhase', 'DecompositionProjectController@savePhase');
         /* 30-12-2019 */
        Route::post('/createTemplate', 'DecompositionProjectController@createTemplate');
        /*17-04-2020*/
        Route::get('/generatePaintPointsExcelSheet/{projectId}/{processLevel1ID}', 'DecompositionProjectController@generatePaintPointsExcelSheet');

        Route::delete('/deleteProcess/{processLevelId}', 'DecompositionProjectController@deleteProcess');   
        Route::delete('/deleteProcessName/{processLevelId}', 'DecompositionProjectController@deleteProcessName');
        Route::delete('/deleteClientDecompositionTemplateProcess/{processLevelId}', 'DecompositionProjectController@deleteClientDecompositionTemplateProcess');     
        Route::post('/editAdminFunctionPhaseDecompositionTemplate/', 'DecompositionProjectController@editAdminFunctionPhaseDecompositionTemplate');
        Route::post('/editClientFunctionPhaseDecompositionTemplate/', 'DecompositionProjectController@editClientFunctionPhaseDecompositionTemplate');
        Route::post('/editClientFunctionPhaseDecompositionProject/', 'DecompositionProjectController@editClientFunctionPhaseDecompositionProject');
        Route::post('/updateAmploDecompositionTemplateProcess/', 'DecompositionProjectController@updateAmploDecompositionTemplateProcess');
        Route::post('/updateAmploDecompositionTemplateFunctionPhaseSortOrder/', 'DecompositionProjectController@updateAmploDecompositionTemplateFunctionPhaseSortOrder');

        /* Client Decomposition */
        /* 14 September 2020*/
        Route::get('/getClientDecompositionTemplates/', 'DecompositionProjectController@getClientDecompositionTemplates');
        Route::get('/getClientDecompositionFunctions/{templateId}', 'DecompositionProjectController@getClientDecompositionFunctions');
        Route::get('/getClientDecompositionPhases/{templateId}', 'DecompositionProjectController@getClientDecompositionPhases');
        Route::get('/getClientDecompositionFunctionPhaseStylesByTemplate/{templateId}', 'DecompositionProjectController@getClientDecompositionFunctionPhaseStylesByTemplate');
        Route::post('/saveClientDecompositionFunction', 'DecompositionProjectController@saveClientDecompositionFunction');
        Route::post('/saveClientDecompositionPhase', 'DecompositionProjectController@saveClientDecompositionPhase');
        Route::post('/createUpdateClientDecompositionTemplate', 'DecompositionProjectController@createUpdateClientDecompositionTemplate');
        Route::post('/saveClientFunctionPhaseAssignment', 'DecompositionProjectController@saveClientFunctionPhaseAssignment');
        Route::post('/saveClientDecompositionTemplateImage', 'DecompositionProjectController@saveClientDecompositionTemplateImage');
        Route::post('duplicateTemplateClient','DecompositionProjectController@duplicateTemplateClient');  
        Route::delete('deleteTemplateClient/{templateId}','DecompositionProjectController@deleteTemplateClient');
        Route::post('/saveClientFunctionPhase','DecompositionProjectController@saveClientFunctionPhase');
        Route::get('/getClientDecompositionTemplateTreeView/{templateId}/{processLevelId}','DecompositionProjectController@getClientDecompositionTemplateTreeView');
        Route::post('/updateClientDecompositionLevelsTemplateData','DecompositionProjectController@updateClientDecompositionLevelsTemplateData');
        Route::delete('/deleteClientDecompositionTemplateFunction/{functionId}','DecompositionProjectController@deleteClientDecompositionTemplateFunction');
        Route::delete('/deleteClientDecompositionTemplatePhase/{phaseId}','DecompositionProjectController@deleteClientDecompositionTemplatePhase');
        Route::get('/getClientDecompositionTemplateByClientId/','DecompositionProjectController@getClientDecompositionTemplateByClientId');
        Route::get('/getClientDecompositionTemplate/{TemplateID}', 'DecompositionProjectController@getClientDecompositionTemplate');
        Route::post('/saveAmploCustomizeDecompositionTemplate/', 'DecompositionProjectController@saveAmploCustomizeDecompositionTemplate');
        Route::post('/saveClientCustomizeDecompositionTemplate/', 'DecompositionProjectController@saveClientCustomizeDecompositionTemplate');
        Route::get('/CanScoreCheckingForCausal/{ProjectID}/{ProcessLevel1ID}/{VersionId}/{ProjectVersionId}','DecompositionProjectController@CanScoreCheckingForCausal');
        Route::post('/updateClientDecompositionTemplateProcess/', 'DecompositionProjectController@updateClientDecompositionTemplateProcess');
        Route::get('/getAllClient/', 'DecompositionProjectController@getAllClient');
        Route::get('/getAllDecompositionTemplateByClientId/{clientId}', 'DecompositionProjectController@getAllDecompositionTemplateByClientId');
        Route::post('/updateClientDecompositionTemplateFunctionPhaseSortOrder/', 'DecompositionProjectController@updateClientDecompositionTemplateFunctionPhaseSortOrder');
        Route::get('/exportAmploCMTemplate/{templateId}', 'DecompositionProjectController@exportAmploCMTemplate');
        Route::post('/importAmploCMTemplate/', 'DecompositionProjectController@importAmploCMTemplate');
        Route::get('/uspCheckDuplicateAmploTemplateName', 'DecompositionProjectController@uspCheckDuplicateAmploTemplateName');
        Route::get('/uspCheckDuplicateClientTemplateName', 'DecompositionProjectController@uspCheckDuplicateClientTemplateName');

        Route::get('/getUseCaseFour/{projectId}','DecompositionProjectController@getUseCaseFour');
        Route::get('/exportPainPointsInitiatives/{projectId}', 'DecompositionProjectController@exportPainPointsInitiatives');

        //Company Profile Routes
        
        Route::get('/get_industries','CompanyProfileController@getIndustry');
        Route::get('/get_company_profile','CompanyProfileController@getCompanyProfile');
        Route::get('/getClientProfile','UserProfileController@getClientProfile');
        Route::post('/update_company_profile','CompanyProfileController@updateCompanyProfile');
        Route::get('/get_industry_vertical_subvertical','CompanyProfileController@getIndustryVerticalSubvertical');
        Route::get('/get_regions','CompanyProfileController@getRegions');
        Route::get('/get_countries','CompanyProfileController@getCountries');
        Route::get('/get_states/{country_code}','CompanyProfileController@getStates');
        Route::get('/get_cities/{state_code}','CompanyProfileController@getCities');
        Route::get('/get_profiling_question','CompanyProfileController@getProfileQuestion');

        //user profile
        Route::get('/get_password_question','UserProfileController@getPasswordQuestion');
        Route::post('/add_security_question_answer','UserProfileController@addSecurityQuestionAnswer');
        Route::get('/fetch_profile','UserProfileController@getEnterpriseUserProfileDetails');
        Route::post('/update_profile','UserProfileController@updateProfileDetails');
        Route::post('/change-password','UserProfileController@changePassword');

        //update Goal Setting
        Route::post('/update_bm_goal_setting','GoalSettingController@updateBMGoalSetting');

        //get enterprise user
        Route::get('/get_enterprise_user','EnterpriseController@getEnterpriseUserType');
        Route::get('/get_enterprise_team','EnterpriseController@uspGetEnterpriseDivaTeam');
        
        Route::post('/add_enterprise_team','EnterpriseController@uspAddEnterpriseDivaTeam');
        Route::post('/update_enterprise_team','EnterpriseController@uspUpdateEnterpriseDivaTeam');
        Route::post('/add_security_question','EnterpriseController@uspAddSecurityQuestion');
        Route::post('/getEnterpriseUser','EnterpriseController@uspGetEntperpriseDIVAUserDetails');

        Route::get('/manageEnterpriseAccount','EnterpriseController@manageEnterpriseAccount');
        /* 20-12-2019 */
        Route::get('/getClientDetails/{ClientId}','EnterpriseController@getClientDetails');
        Route::post('/updateClientProfile','EnterpriseController@updateClientProfile');

        //KPI Routes
        Route::post('/save_kpi','KpiController@saveKpi');
        Route::post('/add_kpi','KpiController@addKpi');
        Route::post('/update_kpi','KpiController@updateKPI');
        Route::post('/update_kpi_control_levers','KpiController@updateKpiControlLevers');
        Route::post('/add_kpi_control_levers','KpiController@addKpiControlLevers');
        Route::get('/get_kpi_list/{KpiId}/{KpiSetId}','KpiController@getKpiList');
        Route::get('/get_kpi_details/{kpi_id}/{kpi_set_id}','KpiController@getKpiDetail');
        Route::get('/get_kpi_control_levers_details/{control_levers_id}','KpiController@getKPIControlLeverDetails');
        Route::post('/delete_kpi','KpiController@deleteKpi');
        Route::get('/get_uom/{UOMClassID}','KpiController@getUom');
        Route::get('/get_uom_controllLever/{UOMClassID}','KpiController@getUomControllLever');
        Route::get('/audit_frequency','KpiController@auditFrequency');
        Route::get('/improvement_basis','KpiController@improvementBasis');
        Route::get('/kpi_set','KpiController@kpiSets');
        Route::post('/delete_kpi_releted','KpiController@deleteKpiRelated');
        Route::post('/save_kpi_association','KpiController@saveKPIAssociation');
        Route::post('/save_kpi_audit_logger','KpiController@saveKPIAuditLogger');
        Route::get('/get_kpi_audit/{KpiId}','KpiController@getKPIAuditLogger');
        Route::get('/get_kpi_association','KpiController@getKPIAssociation');
        Route::get('/kpi_audit_logger_history/{KpiId}','KpiController@getAuditLoggerHistory');
        Route::post('/kpi_audit_search/','KpiController@kpiAuditSearch');
        Route::get('/exportKpi/{kpiId}','KpiController@exportKpi');
        Route::get('/exportKpiAudit/{kpiId}','KpiController@exportKpiAudit');
        Route::post('/importKpi/','KpiController@importKpi');
        Route::post('/importKpiAudit/','KpiController@importKpiAudit');
        Route::get('/getKPIVersionHistory/{kpiId}','KpiController@getKPIVersionHistory');
        Route::post('/checkKPIIdInKpiSheet/','KpiController@checkKPIIdInKpiSheet');
        Route::get('/getKpiAuditData/{KpiId}/{KpiOutcomeMetricsId}','KpiController@getKpiAuditData');
        Route::post('/saveUpdateKpiFilterPreference/','KpiController@saveUpdateKpiFilterPreference');
        Route::get('/getSavedKpiFilterPreference/{KpiSearchandSortPreferenceId}','KpiController@getSavedKpiFilterPreference');
        Route::get('/getSavedKpiFilterPreferenceDetail/{KpiSearchandSortPreferenceId}','KpiController@getSavedKpiFilterPreferenceDetail');
        Route::get('/getTimeframeKpiFilter/','KpiController@getTimeframeKpiFilter');
        Route::get('/getDynamicKpiListByKpiSet/{ShowAllKPI}/{KpiSearchandSortPreferenceId}','KpiController@getDynamicKpiListByKpiSet');
        Route::delete('/deleteKpiControlever/{KpiId}/{KpiControlLeversId}','KpiController@deleteKpiControlever');

		//KPI SET Routes
        Route::get('/getAccessKpiSet','KpiSetController@getAccessKpiSet');
		Route::post('/save_kpi_set','KpiSetController@saveKpiSet');
		Route::get('/get_kpi_Setlist','KpiSetController@listKPISet');
        Route::get('/get_bsccategory','KpiSetController@getBscCategory');
        Route::get('/get_kpi_set/{SetId}','KpiSetController@getKpiSet');
        Route::get('/get_kpi_user_access/{UserId}/{SetId}','KpiSetController@getKpiUserAccess');
        Route::post('/update_kpi_user_access','KpiSetController@updateKPIUserAccess');
		Route::get('/get_persona_list','KpiSetController@getPersonaList');
        Route::get('/get_user_list','KpiSetController@getUserList');
        Route::get('/get_kpi_list_by_kpi_set/{KpiSetId}','KpiSetController@getListKpiByKpiSet');
        Route::get('/get_audit_type_catagories','KpiSetController@getListCategoryByAuditType');
        Route::get('/get_user_by_kpi_set/{KpiSetId}','KpiSetController@getUserByKpiSet');
        Route::get('/get_audit_type/{auditType}','KpiSetController@getAuditType');
        
        //Access controls
        Route::post('/change_disable_date','AccessControlsController@changeDisableDate');

        //Report (Added by Prabir)
        Route::get('/get_service_count/{serviceId}','ReportController@uspGetServicesCount');
        Route::get('/get_service/{serviceId}','ReportController@uspGetServices');
        Route::get('/get_report/{serviceId}','ReportController@uspGetReports');

		
		Route::get('/get_l1_process_summary_pie/{projectId}','ReportController@getL1ProcessSummaryPie');
        Route::get('/get_l1_process_summary/{projectId}','ReportController@getL1ProcessSummary');
        Route::get('/get_average_score/{projectId}','ReportController@getDecompositionReportAvergaeScore');
        Route::get('/get_l1_process/{projectId}/{order}','ReportController@getL1Processes');
        Route::get('/get_spiral_report/{projectId}/{FunctionId}/{PhaseId}','ReportController@getSpiralReport');

        /* Abdul routes*/
        Route::get('/getDecompositionReportProcessRanking/{DecompositionProjectID}/{FunctionID}/{PhaseID}','ReportController@getDecompositionReportProcessRanking');

        Route::get('/getReportsAccess/{UserID}','ReportController@getReportsAccess');
        Route::post('/saveReportAccess','ReportController@saveReportAccess');

        /*Prabir's routes*/
        Route::get('/allApproveClients','UserProfileController@approveClient');

        /*Score Board*/
        Route::get('/getKpis/{VersionId}/{BalanceScoreCardId}','BalancedScoreCardController@getKpis');
        Route::get('/getBscCategories/{CategoryTitle}/{BalanceScoreCardId}','BalancedScoreCardController@getBscCategories');
        Route::post('/saveBscConfig','BalancedScoreCardController@saveBscConfig');
        Route::get('/getBscConfig/{BalanceScoreCardId}','BalancedScoreCardController@getBscConfig');
        Route::get('/getGoalSettings/{BalanceScoreCardId}','BalancedScoreCardController@getGoalSettings');
        Route::post('/getBSCReportKpi/','BalancedScoreCardController@getBSCReportKpi');
        Route::post('/getBscReportKpiActual/','BalancedScoreCardController@getBscReportKpiActual');
        Route::get('/getBalanceScoreCard/','BalancedScoreCardController@getBalanceScoreCard');
        Route::get('/getAllBSC/','BalancedScoreCardController@getAllBSC');
        Route::post('/saveBscCategory/','BalancedScoreCardController@saveBscCategory');
        Route::get('/deleteBsc/{BalanceScoreCardId}','BalancedScoreCardController@deleteBsc');
        
        /* Design Thinking Projects */
        /* 03 March 2020*/
        Route::post('/saveDesignThinkingProject','DesignThinkingController@SaveDesignThinkingProject');
        Route::get('/getDesignThinkingProject','DesignThinkingController@getDesignThinkingProject');
        Route::get('/getDesignThinkingProjectDetails/{ProjectId}/{versionId}','DesignThinkingController@getDesignThinkingProjectDetails');
        Route::get('/getDesignThinkingProjectUserDetails/{ProjectId}','DesignThinkingController@getDesignThinkingProjectUserDetails');
        Route::get('/getDtProjectCreatePermission/','DesignThinkingController@getDtProjectCreatePermission');
        
        Route::get('/getDtProject','DesignThinkingController@getDtProject');
        
        /* 04 March 2020*/
        Route::post('/saveDesignThinkingStakeHolder/','StakeHoldersController@saveDesignThinkingStakeHolder');
        /*Route::post('/saveDesignThinkingStakeHolderM/','StakeHoldersController@saveDesignThinkingStakeHolder');
        Route::post('/saveDesignThinkingStakeHolderRB/','StakeHoldersController@saveDesignThinkingStakeHolder');
        Route::post('/saveDesignThinkingStakeHolderTP/','StakeHoldersController@saveDesignThinkingStakeHolder');
        Route::post('/saveDesignThinkingStakeHolderE/','StakeHoldersController@saveDesignThinkingStakeHolder');*/
        /* 11 March 2020*/
        Route::get('/getDesignThinkingStakeHolders/','StakeHoldersController@getDesignThinkingStakeHolders');
         Route::get('/getDtStakeHolderDetails/{stakeHolderId}','StakeHoldersController@getDtStakeHolderDetails');
        Route::get('/getNetworkOfInfluenceTemplates/','StakeHoldersController@getNetworkOfInfluenceTemplates');
        //Route::get('/getNetworkOfInfluenceHeader/{TemplateId}/{Id}','StakeHoldersController@getNetworkOfInfluenceHeader');
        Route::post('/saveNetworkOfInfluence/','StakeHoldersController@saveNetworkOfInfluence');
        //Route::get('/getNetworkOfInfluence/{NOIID}','StakeHoldersController@getNetworkOfInfluence');
        Route::get('/getNetworkOfInfluence/{TemplateId}','StakeHoldersController@getNetworkOfInfluence');
        Route::get('/uspGetAllNoiTemplateName','StakeHoldersController@uspGetAllNoiTemplateName'); 

        Route::get('/getStakeHolderType/','StakeHoldersController@getStakeHolderType');
        Route::get('/getManager/','StakeHoldersController@getManager');
        Route::get('/getDepartment/','StakeHoldersController@getDepartment');
        Route::get('/getLocation/','StakeHoldersController@getLocation');
        /* 26 June 2020*/
        Route::get('/getBusinessEntity/','StakeHoldersController@getBusinessEntity');
        Route::get('/getEmployeeType/','StakeHoldersController@getEmployeeType');
        Route::get('/getModel/','StakeHoldersController@getModel');
        Route::get('/getPartnerType/','StakeHoldersController@getPartnerType');
        Route::get('/getOrganizationalLevel/','StakeHoldersController@getOrganizationalLevel');
        Route::get('/getAssetCategory/','StakeHoldersController@getAssetCategory');
        Route::get('/getAssetType/','StakeHoldersController@getAssetType');

        /* Epic Dashbaord */
        Route::get('/getBenchmarkingProjectsDomain','EpicController@getBenchmarkingProjectsDomain');
        Route::get('/getDecompositionProjects','EpicController@getDecompositionProjects');
         Route::get('/getDecompositionProjectsFunctionPhaseLevel/{projectId}','EpicController@getDecompositionProjectsFunctionPhaseLevel');
        Route::get('/getDecompositionProjectsOld','EpicController@getDecompositionProjectsOld');
        Route::get('/getKpisControlLevers','EpicController@getKpisControlLevers'); 
        Route::get('/getUserDetails','EpicController@getUserDetails'); 
        Route::get('/getOtherProjectsOfUser','EpicController@getOtherProjectsOfUser');
        Route::post('/saveEpic','EpicController@saveEpic'); 
        Route::post('/saveEpic1','EpicController@saveEpic'); 
        Route::get('/getEpic/{dtProjectId}/{epicId}/{versionId}','EpicController@getEpic');
        Route::get('/getEpicOld/{dtProjectId}/','EpicController@getEpicOld');
        Route::get('/getEpicProject/{projectId}/{versionId}','EpicController@getEpicProject');
        Route::get('/getAllEpic/{projectId}/{versionId}','EpicController@getAllEpic');
        Route::get('/getEpicSubEpicDeatils/{projectId}/{epicId}/{versionId}','EpicController@getEpicSubEpicDeatils');
        Route::post('/projectLockUnLock/','EpicController@projectLockUnLock');
        Route::get('/getDtProjectVersionHistory/{projectId}','EpicController@getDtProjectVersionHistory');
        Route::get('/getEpicVersionHistory/{epicId}/{projectId}','EpicController@getEpicVersionHistory');
        Route::post('/epicLockUnLock/','EpicController@epicLockUnLock');
        /**/
        Route::get('/getEpicAllDeatils/{projectId}/{epicId}/{versionId}','EpicController@getEpicAllDeatils');
        Route::get('/getEpicSubEpic/{projectId}/{epicId}/{versionId}','EpicController@getEpicSubEpic');
        Route::get('/getDTChampion/{projectId}/{epicId}/','EpicController@getDTChampion');
        /**/
        /* Empathy */
        Route::post('/saveEmpathyNotes/','EmpathyController@saveEmpathyNotes');
        Route::get('/getEmpathyNotes/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}/{stakeHolderId}','EmpathyController@getEmpathyNotes');
        Route::get('/getEmpathyNotesAllCategory/','EmpathyController@getEmpathyNotesAllCategory');
        Route::get('/getEmpathyNotesStakeHolders/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}/','EmpathyController@getEmpathyNotesStakeHolders');
        Route::get('/deleteAllEmpathyNotes/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}/{stakeholderId}/','EmpathyController@deleteAllEmpathyNotes');
        Route::get('/deleteIndividualEmpathyNotes/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}/{interviewDetailsId}/','EmpathyController@deleteIndividualEmpathyNotes');

        Route::get('/getEmpathyLifeCycleCategory/','EmpathyLifeCycleController@getEmpathyLifeCycleCategory');
        Route::post('/saveEmpathyLifeCycle/','EmpathyLifeCycleController@saveEmpathyLifeCycle');
        Route::post('/saveMultipleEmpathyLifeCycle/','EmpathyLifeCycleController@saveMultipleEmpathyLifeCycle');
        Route::get('/getAllEmpathyLifeCycle/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}','EmpathyLifeCycleController@getAllEmpathyLifeCycle');
        Route::get('/getMultipleEmpathyLifeCycle/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}','EmpathyLifeCycleController@getMultipleEmpathyLifeCycle');

        Route::get('/getEmpathyLifeCycle/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}/{epicLifeCycleId}','EmpathyLifeCycleController@getEmpathyLifeCycle');
        Route::get('/deleteLifeCycle/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}/{epicLifeCycleId}','EmpathyLifeCycleController@deleteLifeCycle');

        Route::get('/getDtNoiDetailForStakeholder/{stakeholderId}','EmpathyLifeCycleController@getDtNoiDetailForStakeholder');

        Route::get('/getEmpathyMapCategory/','EmpathyMapController@getEmpathyMapCategory');
        Route::post('/saveEmpathyMap/','EmpathyMapController@saveEmpathyMap');
        Route::get('/getAllEmpathyMap/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}','EmpathyMapController@getAllEmpathyMap');
        Route::get('/getEmpathyMapDetails/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}/{empathyMapId}','EmpathyMapController@getEmpathyMapDetails');

        Route::get('/deleteEmpathyMap/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}/{empathyMapId}/','EmpathyMapController@deleteEmpathyMap');

        Route::get('/getMotivationCategory/','EmpathyPersonaController@getMotivationCategory');
         Route::get('/getPersonalityCategory/','EmpathyPersonaController@getPersonalityCategory');
        Route::post('/saveEmpathyPersona/','EmpathyPersonaController@saveEmpathyPersona');
        Route::get('/getAllEmpathyPersona/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}','EmpathyPersonaController@getAllEmpathyPersona');
        Route::get('/getEmpathyPersonaDetails/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}/{personaId}','EmpathyPersonaController@getEmpathyPersonaDetails');

        Route::get('/getAllLifeCycle/{projectId}/{epicId}','EmpathyPersonaController@getAllLifeCycle');
        Route::get('/getAllStakeholders/{projectId}/{epicId}','EmpathyPersonaController@getAllStakeholders');

        Route::get('/deletePersona/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}/{PersonaId}/','EmpathyPersonaController@deletePersona');

        Route::get('/deletePersona/{projectId}/{projectVersionId}/{epicId}/{epicVersionId}/{PersonaId}/','EmpathyPersonaController@deletePersona');

        Route::post('/uspDeleteEpiSubEpic','EmpathyPersonaController@uspDeleteEpiSubEpic');

        Route::get('/createCustomerJourneyMap/{personaId}','CustomerJourneyMapController@createCustomerJourneyMap');
        Route::get('/getCustomerJourneyMap/{cjmId}/{epicId}/{personaId}','CustomerJourneyMapController@getCustomerJourneyMap');
       
		Route::post('/saveCustomerJourneyMap/','CustomerJourneyMapController@saveCustomerJourneyMap');
       
        /* NetworkOfExperience */
        Route::get('/getNOE/{epicId}','NetworkOfExperienceController@getNOE');
         Route::get('/getNOEBySubEpic/{epicId}','NetworkOfExperienceController@getNOEBySubEpic');

         /* Idea routes*/
        Route::post('/saveIdeateSession/','IdeasController@saveIdeateSession');
         Route::get('/getPriorityLookup/','IdeasController@getPriorityLookup');
        Route::post('/saveSubEpicPriority/','IdeasController@saveSubEpicPriority');
        Route::get('/getSubEpicByPriority/{epicId}/{lookupId}','IdeasController@getSubEpicByPriority');
        Route::post('/saveIdeasOld/','IdeasController@saveIdeasOld');
        Route::post('/saveIdeas/','IdeasController@saveIdeas');
        Route::get('/getAllIdeas/{subEpicId}','IdeasController@getAllIdeas');
        Route::get('/getAllParticipants/{dtEpicHeaderId}/{dtIdeatSessionId}/{projectVersionId}/{epicVersionId}','IdeasController@getAllParticipants');
       
        Route::get('/getIdeateHeader/{subEpicId}/{dtIdeatSessionId}','IdeasController@getIdeateHeader');
        Route::post('/markCompleteIdea/','IdeasController@markCompleteIdea');
        Route::post('/changeIdeaSequence/','IdeasController@changeIdeaSequence');

        Route::post('/enableVoting/','IdeasController@enableVoting');
        Route::post('/castVote/','IdeasController@castVote');
        Route::post('/saveSwot/','IdeasController@saveSwot');
        Route::get('/getSwot/{ideateIdeaId}','IdeasController@getSwot');
        Route::post('/markcompleteIdeaVoting/','IdeasController@markcompleteIdeaVoting');
        Route::get('/getAllVoters/{ideaId}','IdeasController@getAllVoters');
        Route::post('/saveIdeaScore/','IdeasController@saveIdeaScore');
        Route::get('/getIdeaScore/{subEpicId}','IdeasController@getIdeaScore');
        Route::post('/uspCastVoteOut','IdeasController@uspCastVoteOut');
        Route::post('/publishScore/','IdeasController@publishScore');
        Route::get('/getIdeateProblemPinningDetails/{epicId}/{dtIdeateSessionId}','IdeasController@getIdeateProblemPinningDetails');
        Route::post('/mergeIdeas/','IdeasController@mergeIdeas');
        Route::post('/submitIdeas/','IdeasController@submitIdeas');
        /* Prototype routes*/
        Route::post('/savePrototypeSession/','PrototypeController@savePrototypeSession');
         Route::get('/getPrototypeSession/{prototypeSessionId}','PrototypeController@getPrototypeSession');
        Route::post('/savePrototype/','PrototypeController@savePrototype');
        Route::post('/uploadPrototypeFile/','PrototypeController@uploadPrototypeFile');
        Route::delete('/deletePrototypeFile/','PrototypeController@deletePrototypeFile');
        Route::get('/getPrototype/{ideaId}','PrototypeController@getPrototype');
        Route::get('/getIdeasForPrototype/{subEpicId}','PrototypeController@getIdeasForPrototype');
        Route::delete('/deleteShapeTextPostIds/{id}','PrototypeController@deleteShapeTextPostIds');
       
        //Route::post('/savePrototypeAndPrototypeDetail/','PrototypeController@savePrototypeAndPrototypeDetail');
        //Route::get('/getPrototypeAndPrototypeDetail/{epicId}/{epicVersionId}/{dtPrototypeId}','PrototypeController@getPrototypeAndPrototypeDetail');


        //Route::get('/getPrototype/{epicId}/{epicVersionId}/{dtPrototypeId}','PrototypeController@getPrototype');
        //Route::get('/getPrototypeDetails/{epicId}/{epicVersionId}/{dtPrototypeId}','PrototypeController@getPrototypeDetails');

        /* RoadMap routes*/
        Route::get('/getRoadMapDetails/{roadMapId}','RoadMapController@getRoadMapDetails');

        Route::get('/getMilestone/{roadMapId}/{roadMapMileStoneId}','RoadMapController@getMilestone');
        Route::get('/getRoadMapOwner/{roadMapId}/{roadMapMileStoneId}/{roadMapMileStoneOwnerId}','RoadMapController@getRoadMapOwner');
        Route::get('/getRoadMapTasks/{roadMapId}/{roadMapMileStoneId}/{roadMapMileStoneOwnerId}/{roadMapMileStoneTaskId}','RoadMapController@getRoadMapTasks');
        Route::post('/saveRoadMap/','RoadMapController@saveRoadMap');
        Route::get('/getTaskStatus/','RoadMapController@getTaskStatus');
        Route::post('/updateStatus/','RoadMapController@updateStatus');
        Route::delete('/deleteRoadMapTask/{taskId}','RoadMapController@deleteRoadMapTask');
        /* Support routes*/
        Route::get('/getSupportMainMenus/','SupportController@getSupportMainMenus');
        Route::get('/getSupportPage/{categoryId}','SupportController@getSupportPage');
        Route::get('/getSupportPageDetails/{categoryId}/{subCategoryId}','SupportController@getSupportPageDetails');

        //Powerbi
        Route::get('/login-power-bi','PowerBiController@powerBiLogin');
        Route::post('/getEmbedToken','PowerBiController@getEmbedToken');
        Route::get('/getAllReports','PowerBiController@getReportsOfGroup');
        Route::get('/export-report','PowerBiController@exportReport');
        Route::get('/getCxOReportByUser','PowerBiController@getCxOReportByUser');

        //dashboard Report
        Route::get('/getDashboardReport/{userId}','DashboardReportController@getDashboardReport');
        Route::post('/saveDashboardReportAccess','DashboardReportController@saveDashboardReportAccess');
        Route::get('/getFPMList','DashboardReportController@getFPMList');
        Route::post('/saveFPMComparision','DashboardReportController@saveFPMComparision');
        Route::post('/import-ebidata','DashboardReportController@importEBIDTAData');
       
        /* AflyScore routes*/
        Route::get('/getAflyScoresOld/{bmprojectId}', 'BenchmarkController@getAflyScoresOld'); 
        Route::post('/getAflyScoresDomainWiseOld/', 'BenchmarkController@getAflyScoresDomainWiseOld'); 

        Route::get('/getAflyScores/{bmprojectId}','AflyScoreController@getAflyScores');
        Route::get('/getAflyScoresDomainWise/{bmprojectId}','AflyScoreController@getAflyScoresDomainWise');
        Route::post('/updateAflyScores','AflyScoreController@updateAflyScores');

        Route::get('/usecase3ReestablishingAFLYScore/{ProjectId}','AflyScoreController@usecase3ReestablishingAFLYScore');
        Route::post('/ReestablishAflyScore','AflyScoreController@ReestablishAflyScore');
        Route::get('/GetReestablishAflyScore/{BenchmarkProjectID}','AflyScoreController@GetReestablishAflyScore');
        Route::get('/usecase3CheckAgainstProjectId/{ProjectId}','AflyScoreController@usecase3CheckAgainstProjectId');

        Route::PATCH('/uspEnableClientQuestionBankAFlyScoreFromAmploSide','AflyScoreController@uspEnableClientQuestionBankAFlyScoreFromAmploSide');
        Route::post('/uspEnableClientQuestionBankAFlyScoreFromAmploSidePost','AflyScoreController@uspEnableClientQuestionBankAFlyScoreFromAmploSidePost');

        Route::PATCH('/uspUpdateFunctionPhaseTitleAgainstProjectLevel','AflyScoreController@uspUpdateFunctionPhaseTitleAgainstProjectLevel');
        Route::PATCH('/uspUpdateStyleAgainstProjectLevel','AflyScoreController@uspUpdateStyleAgainstProjectLevel');
        Route::DELETE('/uspDeleteStyleAgainstProjectLevel/{tfpsaid}','AflyScoreController@uspDeleteStyleAgainstProjectLevel');

        Route::get('/CheckAmpProjectLinkWithCapabilityProject/{ProjectId}','AflyScoreController@CheckAmpProjectLinkWithCapabilityProject');
        Route::get('/GetAllCapabilityModelProjectLinkageWithAmpProjectName','AflyScoreController@GetAllCapabilityModelProjectLinkageWithAmpProjectName');
        Route::get('/GetCapabilityModelProjectLinkageWithAmpProjectName/{AmpMarkingProjectId}','AflyScoreController@GetCapabilityModelProjectLinkageWithAmpProjectName');

        Route::DELETE('/uspDeleteProcessAgainstProjectLevel','AflyScoreController@uspDeleteProcessAgainstProjectLevel');
        Route::post('/uspDeleteProcessAgainstProjectLevelForDelete','AflyScoreController@uspDeleteProcessAgainstProjectLevelForDelete');
        Route::PATCH('/uspUpdateProcessAgainstProjectLevel','AflyScoreController@uspUpdateProcessAgainstProjectLevel');
        Route::get('/GetAllCapabilityModelProjectLinkageWithAmpProjectNameFromUsecase3','AflyScoreController@GetAllCapabilityModelProjectLinkageWithAmpProjectNameFromUsecase3');
        
        Route::PATCH('/uspUpdateStyleAgainstProjectLevelNew','AflyScoreController@uspUpdateStyleAgainstProjectLevelNew');

        Route::post('/uspSaveFunctionsAndPhasesAgainstProjectLevel','DecompositionProjectController@uspSaveFunctionsAndPhasesAgainstProjectLevel');
        Route::PATCH('/uspDeleteFunctionsAndPhasesAgainstProjectLevel','DecompositionProjectController@uspDeleteFunctionsAndPhasesAgainstProjectLevel');

        Route::get('/uspGetSelectedFunctionsAgainstProjectLevel/{TemplateId}/{ProjectId}','DecompositionProjectController@uspGetSelectedFunctionsAgainstProjectLevel');
        Route::get('/uspGetSelectedPhasesAgainstProjectLevel/{TemplateId}/{ProjectId}','DecompositionProjectController@uspGetSelectedPhasesAgainstProjectLevel');

        Route::post('/uspAddFunctionsAndPhasesAgainstProjectLevel','DecompositionProjectController@uspAddFunctionsAndPhasesAgainstProjectLevel');
        Route::get('/uspGetSelectedFunctionsForProjectDetails/{TemplateId}/{ProjectId}','DecompositionProjectController@uspGetSelectedFunctionsForProjectDetails');
        Route::PATCH('/uspDeleteFunctionsAndPhasesForProjectDetails','DecompositionProjectController@uspDeleteFunctionsAndPhasesForProjectDetails');
        Route::post('/uspSaveFunctionsAndPhasesForFunctionDetails','DecompositionProjectController@uspSaveFunctionsAndPhasesForFunctionDetails');
               
        Route::get('/test','TestController@test');  
       
    });
    

     //Dashboard data
     

});
