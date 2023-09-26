<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Controllers\Api\BaseController as BaseController;
use DB;
use Validator;
use JWTAuth;


class BenchmarkController extends BaseController
{
    public $user_data = [];
    public $payload = [];
    public $dbUserName = "";
    public $dbUserPassword = "";
     /**
     * Instantiate a new UserController instance.
     */
    public function __construct(){
        $this->payload = JWTAuth::parseToken()->getPayload(); 
        $this->dbUserName = $this->payload->get('DbUserName');
        $this->dbUserPassword = $this->payload->get('DbUserPassword');

        config(['database.connections.sqlsrv.username' => $this->dbUserName]);
        config(['database.connections.sqlsrv.password' => $this->dbUserPassword]);
        try{
            $this->user_data = JWTAuth::parseToken()->authenticate()->toArray(); 
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }catch(JWTException $e){
            return $this->sendError($e->getMessage(),401);
        }
        //$this->middleware('log', ['only' => ['fooAction', 'barAction']]);
        //$this->middleware('subscribed', ['except' => ['fooAction', 'barAction']]);
    }
       
    /*
        Author : Amit
        Date   : 11/09/2019
        Name   : getBenchmarkingLevels
        Params : None
        Type   : GET
        Purpose: To get Benchmarking levels 
    */
    public function getBenchmarkingLevels(){
        try{
            $data = DB::select(' EXEC uspGetBenchmarkingLevels');
            if ($data) {
                $sorted_data = [];
                foreach($data as $v => $record){
                    $sorted_data[$v]['level'] =  $record->BenchmarkingLevelName;
                    $sorted_data[$v]['desc'] =  $record->BenchmarkingDescription;
                    $sorted_data[$v]['characterized'] =  $record->BenchmarkingCharacterizedby;
                    $sorted_data[$v]['keyEnablers'] =  $record->BenchmarkingKeyEnablers;
                }
                $data = $sorted_data;
                $message = 'benchmark data retrieved successfully.';
            }else {
                $message = 'benchmark data not found.';
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
             return $this->sendError($e->getMessage()); 
        }
    }

    /*
        Author : Amit
        Date   : 11/09/2019
        Name   : getLevelData
        Params : @clientId,@projectId
        Type   : GET
        Purpose: To get BM Data 
    */

    public function getLevelData(Request $request ,$projectId){

        try{  
            $clientId=$this->user_data['UserID'];
            $data = DB::select(' EXEC uspBenchmarkingReport ?,?',array($clientId,$projectId));
           //echo '<pre>';
            //print_r($clientId);die;
                $sorted_data = [];
                $domains = array_map('trim',array_column($data,'DomainName'));

                $sorted_data[0]['name'] =  "IndustryBenchmark";
                $sorted_data[1]['name'] =  "ASISBenchmark";
                $sorted_data[2]['name'] =  "GoalSetting";

                $IndustryBenchmark =  array_map('trim',array_column($data, 'IndustryBenchmark'));
                $ASISBenchmark =  array_map('trim',array_column($data, 'ASISBenchmark'));
                $GoalSetting =  array_map('trim',array_column($data, 'GoalSetting'));

                $sort[0]['ratings'] =  array_map(function($string){
                                                    return round($string, 2);
                                                }, $IndustryBenchmark);
                $sort[1]['ratings'] =  array_map(function($string){
                                                    return round($string, 2);
                                                }, $ASISBenchmark);
                $sort[2]['ratings'] =  array_map(function($string){
                                                    return round($string, 2);
                                                }, $GoalSetting);

                $sort[0]['domains'] = array_map('trim',array_column($data,'DomainName'));
                $sort[1]['domains'] = array_map('trim',array_column($data,'DomainName'));
                $sort[2]['domains'] = array_map('trim',array_column($data,'DomainName'));
                    
                    foreach($sort as $v => $values){
                        $records = [];
                        foreach($values['ratings'] as $k => $value){
                            $records[$k]['label'] = $values['domains'][$k];
                            $records[$k]['rating'] = $value;
                            //$records[$k]['LockedStatus'] = 0;
                        }
                        $sorted_data[$v]['data'] = $records;
                    }
                    
                    $data = $sorted_data;
            return $this->sendResponse($data, 'benchmark data retrieved successfully.');
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }

     /*
        Author : Amit
        Date   : 12/09/2019
        Name   : getUserBMProjects
        Params : None
        Type   : GET
        Purpose: Get list of projects mapped to user with status 
    */
    
    public function getUserBMProjects(Request $request){
        try{
            $userId=$this->user_data['UserID'];
            $data = DB::select(' EXEC uspGetUserBMProjects ?',array($userId));
            if(count($data) > 0){
                $message = 'benchmark data retrieved successfully.';
            }else{
                $message = 'data not found';
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    public function search($array, $key, $value) { 
        $results = array(); 
          
        // if it is array 
        if (is_array($array)) { 
              
            // if array has required key and value 
            // matched store result  
            if (isset($array[$key]) && $array[$key] == $value) { 
                $results[] = $array; 
            } 
              
            // Iterate for each element in array 
            foreach ($array as $subarray) { 
                  
                // recur through each element and append result  
                $results = array_merge($results,  
                        $this->search($subarray, $key, $value)); 
            } 
        } 
      
        return $results; 
    } 
     /*
        Author : Amit
        Date   : 12/09/2019
        Name   : getUserDomainsForBMProject
        Params : @projectId
        Type   : GET
        Purpose: Get list of domains 
    */

    public function getUserDomainsForBMProject(Request $request,$projectId){
        try{
            $userId=$this->user_data['UserID'];
          
            $domains = DB::select(' EXEC uspGetUserDomainsForBMProject ?,?',array($userId,$projectId));
            $scores = DB::select(' EXEC uspBenchmarkingReport ?,?',array($userId,$projectId));
            $params_array = array(
                $this->user_data['UserID']
            );
            $userData = DB::select(' EXEC Amplo.uspGetCompanyProfileAiMl ?', $params_array);
            $postRequest = array(
                'industryId'=> isset($userData[0]->IndustryID) ? $userData[0]->IndustryID : '',
                'clientId'  => $this->user_data['ClientID'],
                'projectId' => $projectId
            );
            $Url = env('AFLY_SITE_URL')."api/getUseCaseTwo";

            $cURLConnection = curl_init($Url);
            curl_setopt($cURLConnection, CURLOPT_POSTFIELDS, $postRequest);
            curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

            $apiResponse = curl_exec($cURLConnection);
            curl_close($cURLConnection);
            $apiResponse = json_decode($apiResponse,true);

            
            $response = [];
           
            if(count($domains) > 0){
                $scores = json_decode(json_encode($scores), true);
                foreach($domains as  $k => $value){
                    
                    $res = $this->search($apiResponse, 'DomainName', $value->DomainName); 
                    
                    if($value->AccessType==1){
                        $AccessType = "read";
                    }
                    else if($value->AccessType==2){
                        $AccessType = "readWrite";
                    }else if($value->AccessType==3){
                        $AccessType = "noAccess";
                    }
                    $record['DomainID']         =  $value->DomainID;
                    $record['DomainName']       =  $value->DomainName;
                    $record['AccessType']       =  $AccessType;
                    $record['IsAuditLogPresent']=  $value->IsAuditLogPresent;

                    $industry_benchmark = isset($scores[$k]['IndustryBenchmark'])?round(trim($scores[$k]['IndustryBenchmark']),2):0;
                    $asis_benchmark = isset($scores[$k]['ASISBenchmark'])?round(trim($scores[$k]['ASISBenchmark']),2):0;
                    $goal_setting = isset($scores[$k]['GoalSetting'])?round(trim($scores[$k]['GoalSetting']),2):0;

                    $record['score_values']['industry_benchmark'] = $industry_benchmark;
                    $record['score_values']['asis_benchmark'] =  $asis_benchmark;
                    $record['score_values']['goal_setting']   = $goal_setting;
                    $record['score_values']['leader_domain_score']    = (count($res) > 0) ? round($res[0]['DomainScore'],2) : 0;
                    $response[$k] = $record; 
                }
                $message = 'user becnmark domain data retrived successfully';
            }else{
                $message = 'data not found';
            }
            return $this->sendResponse($response, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }  

    /*
        Author : Amit
        Date   : 12/09/2019
        Name   : fetchBMQuestionList
        Params : @projectId,@domainId
        Type   : GET
        Purpose: Get list of domains 
    */

    public function fetchBMQuestionList(Request $request,$projectId,$domainId){
        try{
            $userId=$this->user_data['UserID'];
            $data = DB::select(' EXEC uspFetchBMQuestionList ?,?,?',array($userId,$projectId,$domainId));
            
            $response_data = [];
             if(count($data) > 0){
                foreach($data as $v => $value){
                    $response_data[$value->BenchmarkQuestionID] = $value->BenchmarkQuestionID;
                }
                $response_data = array_values($response_data);
                $message = 'user becnmark domain data retrived successfully';
            }else{
                $message = 'data not found';
            }
            return $this->sendResponse($response_data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 

    /*
        Author : Amit
        Date   : 13/09/2019
        Name   : fetchBMQuestionDetails
        Params : @projectId,@domainId,@questionId
        Type   : GET
        Purpose: Fetch quertion details of options
    */
    public function fetchBMQuestionDetails(Request $request,$projectId,$domainId,$questionId){
        try{
            //sleep(3);
            $userId=$this->user_data['UserID'];
            //$userId=1015;
            $data = DB::select(' EXEC uspFetchBMQuestionDetails ?,?,?,?',array($userId,$projectId,$domainId,$questionId));
            $dataval = DB::select(' EXEC uspFetchBenchmarkScoringDropdownDetails ?,?,?',array($projectId,$domainId,$questionId));
            $sorted_data = [];
            if($data){
                foreach($data as $k => $value){
                    $sorted_data['Question'] = $value->Question;
                    $sorted_data['BenchmarkQuestionID'] = $value->BenchmarkQuestionID;
                    $sorted_data['DesignChoice'] = $value->DesignChoice;
                    $sorted_data['OrderOfQuestion'] = $value->OrderOfQuestion;
                    $sorted_data['options'][$k]['BenchmarkQuestionOptionID'] = $value->BenchmarkQuestionOptionID;
                    $sorted_data['options'][$k]['OptionName'] = $value->OptionName;
                    $sorted_data['options'][$k]['OptionDescription'] = $value->OptionDescription;
                    $sorted_data['options'][$k]['OptionDesignChoice'] = $value->OptionDesignChoice;
                    $sorted_data['options'][$k]['OptionIconPath'] = $value->OptionIconPath;
                    $sorted_data['options'][$k]['Response'] = $value->Response;
                    $sorted_data['HasDropDown'] = $value->HasDropDown;
                  if($value->HasDropDown=true && $dataval)
                   {
                    foreach($dataval as $key => $value){
                    $sorted_data['DropdownOptions'][$key]['OptionText'] = $value->DropdownText;
                    $sorted_data['DropdownOptions'][$key]['OptionId'] = $value->BenchmarkScoringDropdownId;
                    $sorted_data['DropdownOptions'][$key]['OptionValue'] = $value->DropdownValue;
                    $sorted_data['DropdownOptions'][$key]['IsSelected'] = $value->IsSelected;
                    }
                    }
                    else
                    {
                        $sorted_data['DropdownOptions'] =[];
                    }

                }
                $message = 'user becnmark question data retrived successfully';
            }else{
                $sorted_data = (Object)[];
                $message = 'data not found';
            }
            return $this->sendResponse($sorted_data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }  

    

    /*
        Author : Amit
        Date   : 13/09/2019
        Name   : updateBMQuestionResponse
        Params : @projectId,@domainId,@questionId
        Type   : POST
        Purpose: Fetch quertion details of options
    */

    public function updateBMQuestionResponse(Request $request){
        try{
            $data = (Object)[];
             $validator = Validator::make($request->all(), [
                'project_id' => 'required|numeric',
                'domain_id' => 'required|numeric',
                'option_id' => 'required|numeric',
                'question_id' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $userId = $this->user_data['UserID'];
            $projectId = $request->input('project_id');
            $domainId = $request->input('domain_id');
            //$IP = $request->input('user_ip');
            $IP = \Request::ip();
            $optionID = $request->input('option_id');
            $questionID = $request->input('question_id');
            $SelectedDropDownValue = $request->input('SelectedDropDownValue');
            $IsDropdownScoringEnabled =$request->input('IsDropdownScoringEnabled');
            $BenchmarkScoringDropdownId =$request->input('BenchmarkScoringDropdownId');
            $data = DB::statement(' EXEC uspUpdateBMQuestionsResponses ?,?,?,?,?,?,?,?,?',array($userId,$questionID,$optionID,$projectId,$domainId,$IP,$SelectedDropDownValue,$IsDropdownScoringEnabled,$BenchmarkScoringDropdownId));
            return $this->sendResponse($data,'Benchmark question response updated.');
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Amit
        Date   : 13/09/2019
        Name   : updateBenchmarkingProjectLockStatus
        Params : @projectId,@domainId,@questionId
        Type   : POST
        Purpose: Fetch quertion details of options
    */
    public function updateBenchmarkingProjectLockStatus(Request $request){
        try{
            $data = [];
            $validator = Validator::make($request->all(), [
                'project_id' => 'required',
                'flag' => 'required',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $ClientId = $this->user_data['UserID'];
            $projectId = $request->input('project_id');
            $projectLocked = $request->input('flag');
            $status = DB::statement(' EXEC uspUpdateBenchmarkingProjectLockStatus ?,?,?',array($ClientId,$projectId,$projectLocked));
           
            //get response
            $data = DB::select(' EXEC uspGetBenchmarkingReportLockStatus ?,?',array($ClientId,$projectId));
            $respData = [];
                foreach($data as $value){
                    $respData['flag'] = $value->LockedStatus;
                    $respData['project_id'] = $value->BenchmarkProjectID;   
                }
            $message = 'Benchmarking locking status updated successfully';
            return $this->sendResponse($respData, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }  
    
    /*
        Author : Amit
        Date   : 16/09/2019
        Name   : getBMReportLockStatus
        Params : None
        Type   : Get
        Purpose: Fetch BM staus
    */

     public function getBMReportLockStatus(Request $request ,$projectId){
        try{
            $ClientId = $this->user_data['UserID'];
            $data = DB::select(' EXEC uspGetBenchmarkingReportLockStatus ?,?',array($ClientId,$projectId));
            if($data){
                
                    $respData = [];
                    foreach($data as $value){
                        $respData['flag'] = $value->LockedStatus;
                        $respData['project_id'] = $value->BenchmarkProjectID;   
                    }
                    $message = 'Locked status retrived successfully';
                }else{
                     $respData = (Object)[];
                     $message = 'Locked status retrived successfully';
                }
            return $this->sendResponse($respData, $message);
        }catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }
     }   

    /*
        Author : Abdul
        Date   : 27/11/2019
        Name   : getBenchmarkingProjectUsers
        Params : @ProjectId
        Type   : GET
        Purpose: To get benchmarking project users
    */
    public function getBenchmarkingProjectUsers( Request $request, $ProjectId ){
       try{
            $data = DB::select(' EXEC uspGetBenchmarkingProjectUsers ? ', array($ProjectId) );
            
            if( count( $data ) > 0){
                $message = "Users retrieved";
                return $this->sendResponse($data, $message);
            }else{
                $message = "No record found";
                return $this->sendResponse($data, $message);
            }
            
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 28/11/2019
        Name   : getBenchmarkingProjects
        Params : @UserID
        Type   : GET
        Purpose: To get benchmarking projects
    */
    public function getBenchmarkingProjects( Request $request ){
        try{
           
            //$data = DB::select(' EXEC uspGetBenchmarkingProjects ? ' , array($this->user_data['UserID']) );
            $data = DB::select(' EXEC uspGetUserBMProjects ? ' , array($this->user_data['UserID']) );
            $data_array = array();
            if( count( $data ) > 0){
                foreach ($data as $key => $value) {
                   $data_array[$key]['BMProjectID']  = $value->BenchmarkProjectID;
                   $data_array[$key]['BMProjectName'] = $value->BenchmarkProjectName;
                   $data_array[$key]['QuestionBankId'] = $value->QuestionBankId;
                   $data_array[$key]['QuestionBankName'] = $value->QuestionBankName;
                }
                $message = "Projects retrieved";
                return $this->sendResponse($data_array, $message);
            }else{
                $message = "No record found";
                return $this->sendResponse($data, $message);
            }
            
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 28/11/2019
        Name   : getBenchmarkingDomainAccess
        Params : @UserID, @BenchmarkProjectID
        Type   : GET
        Purpose: To get bench marking domaincaccess projects
    */  
    public function getBenchmarkingDomainAccess( Request $request, $benchmarkProjectId, $UserId ){
        try{
            $params_array = [
                $UserId,
                $benchmarkProjectId
            ];
            $data = DB::select(' EXEC uspGetBenchmarkingDomainAccess ?,?' ,$params_array );
            if( count( $data ) > 0){
               
                foreach ($data as $key => $value) {
                  
                    if($value->AccessType=='1'){
                        $AccessType = "read";
                    }
                    else if($value->AccessType=='2'){
                        $AccessType = "readWrite";
                    }
                    else if($value->AccessType=='3'){
                        $AccessType = "noAccess";
                    }
                    $data[$key]->AccessType = $AccessType;
                }
                $message = "Benchmarking domain access retrieved";
                return $this->sendResponse($data, $message);
            }else{
                $message = "No record found";
                return $this->sendResponse($data, $message);
            }
            
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 29/11/2019
        Name   : getBenchmarkingDomainAccess
        Params : @UserID, @BenchmarkProjectID,@DomainId, @AccessType 
        Type   : POST
        Purpose: To Save benchmarking domain access projects
    */  
    public function saveBenchmarkingDomainAccess( Request $request ){
       try{

            $validator = Validator::make($request->all(), [
                'UserID'             => 'required|numeric',
                'BenchmarkProjectID' => 'required|numeric',
                "domains"          => "required|array|min:1",
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }

            $requestData = $request->all();
            
            $flag = 0;
            foreach ($requestData['domains'] as $key => $value) {
                if($value['AccessType']=='read'){
                    $AccessType = 1;
                }
                else if($value['AccessType']=='readWrite'){
                    $AccessType = 2;
                }
                else if($value['AccessType']=='noAccess'){
                    $AccessType = 3;
                }
                $params_array = [
                    $requestData['UserID'],
                    $requestData['BenchmarkProjectID'],
                    $value['DomainID'],
                    $AccessType,
                    $this->user_data['ClientID'] 
                ];
                $data = DB::select(' EXEC uspSaveBenchmarkingDomainAccess ?,?,?,?,?',$params_array );
                
                $flag = 1;    
            }
            
            if(  $flag==1 ) {
                $message = "Benchmarking domain access updated.";
                return $this->sendResponse($data, $message);
            }else{
                $message = "Benchmarking domain access not updated.";
                return $this->sendResponse($data, $message);
            }

       }catch(\Exception $e){
            return $this->sendError($e->getMessage());
       }
    } 
    /*
        Author : Abdul
        Date   : 29/11/2019
        Name   : getDecompositionPhase
        Params : N/A
        Type   : GET
        Purpose: To get decomposition phase
    */  
    public function getDecompositionPhase( Request $request, $TemplateId ){
        try{
            $data = DB::select(' EXEC Amplo.uspGetDecompositionPhase ?' , array($TemplateId));
            if( count($data) > 0){
                $message = "Phase retrieved";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 
    /*
        Author : Abdul
        Date   : 29/11/2019
        Name   : getDecompositionFunction
        Params : N/A
        Type   : GET
        Purpose: To get decomposition function
    */  
    public function getDecompositionFunction( Request $request, $TemplateId){
        try{
            $data = DB::select(' EXEC Amplo.uspGetDecompositionFunction ?', array($TemplateId) );
            if( count($data) > 0){
                $message = "Function retrieved";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 11/06/2020
        Name   : getUnAnsweredQuestion
        Params : @ProjectId, @DomainId, @UserId
        Type   : GET
        Purpose: To Get UnAnswered Question 
    */
    public function getUnAnsweredQuestion(Request $request,$projectId, $domainId){
        try{
            $validator = Validator::make(['projectId'=>$projectId,'domainId'=>$domainId], [
                'projectId' => "required",
                'domainId'  => "required",
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $projectId,
                $domainId,
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC uspGetUnAnsweredQuestion ?,?,?',$param_array);
           
            if(is_array($data) && count($data) > 0){
                $message = "Data retrieved successfully.";
                return $this->sendResponse($data, $message);
            }
            else{
                $message = "No record found.";
                return $this->sendResponse($data,$message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 03/07/2020
        Name   : generateDataForAmpMarking
        Params : @ProjectId,@QuestionBankId,@UserID 
        Type   : POST
        Purpose: To assign question bank to benchmarking project
    */     
    public function generateDataForAmpMarking(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'ProjectId'      => 'required',
                'QuestionBankId' => 'required'
                
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $params_array = array(
                $requestData['ProjectId'],
                $requestData['QuestionBankId'],
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC uspGenerateDataForAmpMarking ?,?,?', $params_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MesssageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MesssageName;  
                return $this->sendError($message);
            }
            
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    public function getAflyScoresOld( Request $request, $bmprojectId ){
        $userId = $this->user_data['UserID'];

        $params_array = array(
            $userId
        );
        $userData = DB::select(' EXEC Amplo.uspGetCompanyProfileAiMl ?', $params_array);
        if(count($userData) > 0){
            $Industry = $userData[0]->IndustryName;
            $Country  = $userData[0]->Country;
            $Revenue  = $userData[0]->ClientRevenueRangeName;
            $Category = $userData[0]->Category;
            $OptVar2  = "";
            $OptVar3  = "";

        
            $url = env('AFLY_SITE_URL')."api/aflyScores";
            
            $query_array = array(
                $Industry,
                $Country,
                $Revenue,
                $Category,
                $OptVar2,
                $OptVar3
            );
            $query = http_build_query($query_array);
            $data = file_get_contents($url . '?' . $query);
            $responseDecode = json_decode($data,true);
            
            if(is_array($responseDecode) && count($responseDecode) > 0){
                foreach ($responseDecode as $key => $value) {
                    $responseDecode[$key]["AFlyscore"] = round($value['AFlyscore'], 2);
                }
                $BMAflyScoreId = 0;
                $afly_array = array(
                    $BMAflyScoreId,
                    $responseDecode[0]['AFlyscore'],
                    $responseDecode[0]['Name'],
                    $bmprojectId,
                    $userId,
                    date("Y-m-d H:i:s",strtotime($responseDecode[0]['ProcessDate']))
                ); 
                $aflyData = DB::select(' EXEC uspSaveBMAflyScore ?,?,?,?,?,?', $afly_array);
                if( isset($aflyData[0]->Success) && ($aflyData[0]->Success == true || $aflyData[0]->Success ===1)){
                    $message = "Data retrieved successfully.";
                    return $this->sendResponse($responseDecode,$message);
                }else if(isset($data[0]->Success)){
                    $message = $data[0]->MessageName;  
                    return $this->sendError($message);
                }
            }else if(is_array($responseDecode) && count($responseDecode) === 0){
                $message = "No record found.";
                return $this->sendResponse($data,$message);
            }
            else{
                return $this->sendError($data);
            }
        }
        
    }
    public function getAflyScoresDomainWiseOld( Request $request){
        $clientId = $this->user_data['ClientID'];
        $userId   = $this->user_data['UserID'];
        $requestData = $request->all();
        
        $domains = DB::select(' EXEC uspGetUserDomainsForBMProject ?,?',array($userId,$requestData["BMProjectId"]));
        $scores = DB::select(' EXEC uspBenchmarkingReport ?,?',array($userId,$requestData["BMProjectId"]));
        $domains_array = array();
        if(count($domains) > 0){
            $scores = json_decode(json_encode($scores), true);
            if(count($scores) > 0){
                foreach ($domains as $key => $value) {
                    $domains_array[$key]['DomainID']   = $value->DomainID;
                    $domains_array[$key]['DomainName'] = $value->DomainName;
                    foreach ($scores as $k => $v) {
                       if($v['DomainID'] == $value->DomainID){
                            $domains_array[$key]['IndustryBenchmark'] = $v['IndustryBenchmark'];
                            $domains_array[$key]['ASISBenchmark']     = $v['ASISBenchmark'];
                            $domains_array[$key]['GoalSetting']       = $v['GoalSetting'];
                       }
                    }
                }
               
                $query_array = array(
                    $requestData["IndustryLeaderName"],
                    json_encode($domains_array)
                );
                $url = env('AFLY_SITE_URL')."api/getAflyScoresDomainWise";
                $query = http_build_query($query_array);
                $dataq = file_get_contents($url . '?' . $query);
                $responseDecode = json_decode($dataq,true);
                
                if(is_array($responseDecode) && count($responseDecode) > 0){
                    foreach ($responseDecode as $key => $value) {
                        $responseDecode[$key]["DomainScore"] = round($value['DomainScore'], 2);
                    }
                    $message = "Data retrieved successfully.";
                    return $this->sendResponse($responseDecode,$message);
                }
                else if(is_array($responseDecode) && count($responseDecode) ==0){
                    $message = "No record found.";
                    return $this->sendResponse($dataq,$message);
                }
                else{
                    return $this->sendError($dataq);
                }
            }else{
                $message = "scores not found.";
                return $this->sendResponse($scores, $message);
            }
        }else{
            $message = "Domains not found.";
            return $this->sendResponse($domains_array, $message);
        }
        
    }
    
    public function getASISAflyScores( Request $request, $projectId){
       
        try {
            $data = DB::select(' EXEC uspGetAFlyScore ?,?', array($projectId, 1));
            $data_array = array();
            if(count($data)>0){
                foreach ($data as $key => $value) {
                    $data_array[$key]['AsIsAFlyScore'] = round($value->AsIsAFlyScore,2);
                }
                $message = "Data retrieved successfully.";
            }else{
                $message = "No record found."; 
            }
            return $this->sendResponse($data_array, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }   
    }  
    
    /*
        Author : Kapil
        Date   : 06/10/2020
        Name   : saveAmploAnalyticsUsecaseruns
        Params : @ClientId, @IndustryLeaderID, @IndustryLeaderName, @ProjectID, @ProjectName,@UseCaseName, @Version, @RunStatus
        Type   : POST
        Purpose: To save the analytics use case for amplo
    */
    public function saveAmploAnalyticsUsecaseruns(Request $request){
        try{

            $validator = Validator::make($request->all(), [
                "IndustryLeaderID"      => 'required|numeric',
                "IndustryLeaderName"    => 'required',
                "ProjectID"             => 'required|numeric',
                "ProjectName"           => 'required|max:245',
                "UseCaseName"           => 'required|max:95',
                "RunStatus"             => 'required|max:95',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            if($this->user_data['ClientID']==''){
                $clientId = 0;
            }else{
                $clientId = $this->user_data['ClientID'];
            }
            $param_array = array(
                $clientId,
                $request->IndustryLeaderID,
                $request->IndustryLeaderName,
                $request->ProjectID,
                $request->ProjectName,
                $request->UseCaseName,
                $request->RunStatus,
            );

            $data = DB::select('EXEC Amplo.uspSaveAnalyticsUsecaseruns ?,?,?,?,?,?,?',$param_array);

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                $message = $data[0]->MessageName;
                return $this->sendResponse($data, $message);
             }else if(isset($data[0]->Success)){
                 $message = $data[0]->MessageName;  
                 return $this->sendError($message);
             }else if(is_array($data) && count($data) === 0){
                 $message = "Stored procedure is not returning anything.";
                 return $this->sendError($message);
             }
             else{
                 $message = "Stored procedure is returning wrong response.";
                 return $this->sendError($message);
             }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Kapil
        Date   : 06/10/2020
        Name   : saveClientAnalyticsUsecaseruns
        Params : @ClientId, @IndustryLeaderID, @IndustryLeaderName, @ProjectID, @ProjectName,@UseCaseName, @Version, @RunStatus
        Type   : POST
        Purpose: To save the analytics use case for client
    */
    public function saveClientAnalyticsUsecaseruns(Request $request){
        try{

            $validator = Validator::make($request->all(), [
                //"IndustryLeaderID"      => 'required|numeric',
                //"IndustryLeaderName"    => 'required',
                "ProjectID"             => 'required|numeric',
                "ProjectName"           => 'required|max:245',
                "UseCaseName"           => 'required|max:95',
                "RunStatus"             => 'required|max:95',
                "ProjectModuleName"     => 'required',
                "ComparisionProjectId"  => 'required|numeric',
                "ComparisionProjectName"=> 'present',
                "ComparisionProjectModuleName"=> 'present',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $array = array(
                $this->user_data['UserID']
            );
            $userData = DB::select(' EXEC Amplo.uspGetCompanyProfileAiMl ?', $array);
            if(count($userData) > 0){
                $param_array = array(
                    $this->user_data['ClientID'],
                    $userData[0]->IndustryID,
                    $userData[0]->IndustryName,
                    $request->ProjectID,
                    $request->ProjectName,
                    $request->UseCaseName,
                    $request->RunStatus,
                    $request->ProjectModuleName,
                    $request->ComparisionProjectId,
                    $request->ComparisionProjectName,
                    $request->ComparisionProjectModuleName
                );
                $data = DB::select('EXEC uspSaveAnalyticsUsecaserunsClient ?,?,?,?,?,?,?,?,?,?,?',$param_array);
               
                if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                    $message = $data[0]->MessageName;
                    return $this->sendResponse($data, $message);
                }else if(isset($data[0]->Success)){
                     $message = $data[0]->MessageName;  
                     return $this->sendError($message);
                }else if(is_array($data) && count($data) === 0){
                     $message = "Stored procedure is not returning anything.";
                     return $this->sendError($message);
                }
                else{
                     $message = "Stored procedure is returning wrong response.";
                     return $this->sendError($message);
                }
            }else{
                $message = "Company profile data not found.";
                return $this->sendResponse($data,$message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Kapil
        Date   : 06/10/2020
        Name   : getAmploAnalyticsUsecaserunsDetails
        Params : @ClientId, @IndustryLeaderID, @IndustryLeaderName
        Type   : get
        Purpose: To get the analytics use case for amplo
    */
    public function getAmploAnalyticsUsecaserunsDetails(Request $request, $IndustryLeaderID, $IndustryLeaderName){
        try{

            $clientId = $this->user_data['ClientID'] ?? 0;
            $param_array = array(
                $clientId,
                $IndustryLeaderID,
                $IndustryLeaderName,
            );
           
            $data = DB::select('EXEC amplo.uspGetAnalyticsUsecaserunsDetails ?,?,?',$param_array);
            if( count( $data ) > 0){
                $message = "Data retrieved successfully";
                return $this->sendResponse($data, $message);
            }else{
                $message = "No record found";
                return $this->sendResponse($data, $message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Kapil
        Date   : 06/10/2020
        Name   : getClientAnalyticsUsecaserunsDetails
        Params : @ClientId, @IndustryLeaderID, @IndustryLeaderName
        Type   : get
        Purpose: To get the analytics use case for client
    */
    public function getClientAnalyticsUsecaserunsDetails(Request $request, $IndustryLeaderID, $IndustryLeaderName){
        try{

            $param_array = array(
                $this->user_data['ClientID'],
                $IndustryLeaderID,
                $IndustryLeaderName,
            );
            
            $data = DB::select('EXEC uspGetAnalyticsUsecaserunsDetailsClient ?,?,?',$param_array);
            if( count( $data ) > 0){
                $message = "Data retrieved successfully";
                return $this->sendResponse($data, $message);
            }else{
                $message = "No record found";
                return $this->sendResponse($data, $message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    public function BackBMPreviousQuestionDetails(Request $request,$projectId,$domainId,$questionId){
        try{
            $userId=$this->user_data['UserID'];
            //$userId=1015;
            $data = DB::select(' EXEC uspBackBMPreviousQuestionDetails ?,?,?,?',array($userId,$projectId,$domainId,$questionId));
            $sorted_data = [];
            if($data){
                foreach($data as $k => $value){
                    $sorted_data['Question'] = $value->Question;
                    $sorted_data['BenchmarkQuestionID'] = $value->BenchmarkQuestionID;
                    $sorted_data['DesignChoice'] = $value->DesignChoice;
                    $sorted_data['OrderOfQuestion'] = $value->OrderOfQuestion;
                    $sorted_data['options'][$k]['BenchmarkQuestionOptionID'] = $value->BenchmarkQuestionOptionID;
                    $sorted_data['options'][$k]['OptionName'] = $value->OptionName;
                    $sorted_data['options'][$k]['OptionDescription'] = $value->OptionDescription;
                    $sorted_data['options'][$k]['OptionDesignChoice'] = $value->OptionDesignChoice;
                    $sorted_data['options'][$k]['OptionIconPath'] = $value->OptionIconPath;
                    $sorted_data['options'][$k]['Response'] = $value->Response;
                }
                $message = 'user becnmark question data retrived successfully';
            }else{
                $sorted_data = (Object)[];
                $message = 'data not found';
            }
            return $this->sendResponse($sorted_data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }  
    public function GetSliderValue(Request $request,$ProjectId,$DomainId,$QuestionId,$DropdownOptionValue ){
        try{
            $params = array(
                $ProjectId,
                $DomainId,
                $QuestionId ,
               // $UserID =$this->user_data['UserID'],
                $DropdownOptionValue, 
            );
            $data = DB::select('EXEC uspGetSliderValue ?,?,?,?',$params);
          
            $sorted_data = array();
           if($data){
           foreach($data as $k => $value){
                $sorted_data["SliderValue"] = $value->SliderValue;
                $sorted_data["BenchmarkQuestionId"] = $value->BenchmarkQuestionId;
                              
            }
            $message = "GetSliderValue   retrieved successfully";
        } else{
            $sorted_data = (Object)[];
            $message = 'data not found';
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
    } 
    

}
