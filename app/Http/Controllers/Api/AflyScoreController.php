<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Controllers\Api\BaseController as BaseController;
use DB;
use Validator;
use JWTAuth;


class AflyScoreController extends BaseController
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
        
    }
       
    /*
        Author : Abdul
        Date   : 08/10/2020
        Name   : getAflyScores
        Params : None
        Type   : GET
        Purpose: To get afly scores (getUseCaseOne)
    */
    public function getAflyScores(Request $request, $bmprojectId){
        try{
            $params_array = array(
                $this->user_data['UserID']
            );
            $userData = DB::select(' EXEC Amplo.uspGetCompanyProfileAiMl ?', $params_array);
            if(count($userData) > 0){
                $postRequest = array(
                    'industryId'=> $userData[0]->IndustryID,
                    'clientId'  => $this->user_data['ClientID'],
                    'projectId' => $bmprojectId
                );
                $Url = env('AFLY_SITE_URL')."api/getUseCaseOne";

                $cURLConnection = curl_init($Url);
                curl_setopt($cURLConnection, CURLOPT_POSTFIELDS, $postRequest);
                curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

                $apiResponse = curl_exec($cURLConnection);
                curl_close($cURLConnection);
                $apiResponse = json_decode($apiResponse,true);

                if(is_array($apiResponse) && count($apiResponse) > 0){
                    foreach ($apiResponse as $key => $value) {
                        $apiResponse[$key]["AFlyscore"] = round($value['AFlyscore'], 2);
                    }
                    $afly_array = array(
                        $apiResponse[0]['AflyScoreId'],
                        $apiResponse[0]['AFlyscore'],
                        $apiResponse[0]['Name'],
                        $apiResponse[0]['project_id'],
                        $this->user_data['UserID'],
                        $apiResponse[0]['ProcessDate']
                    ); 
                    $aflyData = DB::select(' EXEC uspSaveBMAflyScore ?,?,?,?,?,?', $afly_array);
                    if( isset($aflyData[0]->Success) && ($aflyData[0]->Success == true || $aflyData[0]->Success ===1)){
                        $message = "Data retrieved successfully.";
                        return $this->sendResponse($apiResponse,$message);
                    }else if(isset($data[0]->Success)){
                        $message = $data[0]->MessageName;  
                        return $this->sendError($message);
                    }
                }
                else if(is_array($apiResponse) && count($apiResponse) === 0){
                    $message = "No record found.";
                    return $this->sendResponse($apiResponse,$message);
                }
                else{
                    return $this->sendError($apiResponse);
                }
            }else{
                $message = "Company profile data not found.";
                return $this->sendResponse($data,$message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 08/10/2020
        Name   : getAflyScoresDomainWise
        Params : None
        Type   : GET
        Purpose: To get afly score domain wise(getUseCaseTwo) 
    */
    public function getAflyScoresDomainWise(Request $request, $bmprojectId){
        try{
            $params_array = array(
                $this->user_data['UserID']
            );
            $userData = DB::select(' EXEC Amplo.uspGetCompanyProfileAiMl ?', $params_array);
            if(count($userData) > 0){
                $postRequest = array(
                    'industryId'=> $userData[0]->IndustryID,
                    'clientId'  =>$this->user_data['ClientID'],
                    'projectId' => $bmprojectId
                );
                
                $Url = env('AFLY_SITE_URL')."api/getUseCaseTwo";

                $cURLConnection = curl_init($Url);
                curl_setopt($cURLConnection, CURLOPT_POSTFIELDS, $postRequest);
                curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

                $apiResponse = curl_exec($cURLConnection);
                curl_close($cURLConnection);
                $apiResponse = json_decode($apiResponse,true);

                if(is_array($apiResponse) && count($apiResponse) > 0){
                    foreach ($apiResponse as $key => $value) {
                        $apiResponse[$key]["DomainScore"] = round($value['DomainScore'], 2);
                    }
                    $message = "Data retrieved successfully.";
                    return $this->sendResponse($apiResponse,$message);
                }
                else if(is_array($apiResponse) && count($apiResponse) === 0){
                    $message = "No record found.";
                    return $this->sendResponse($apiResponse,$message);
                }
                else{
                    return $this->sendError($apiResponse);
                }
            }
            else{
                $message = "Company profile data not found.";
                return $this->sendResponse($data,$message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 29/10/2020
        Name   : updateAflyScores
        Params : None
        Type   : POST
        Purpose: To update afly scores (Update UseCase Three)
    */
    public function updateAflyScores(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                "ProjectId" => 'required|numeric',
                "AflyScore" => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $params_array = array(
                $request->ProjectId,
                $request->AflyScore,
                $this->user_data['UserID']
            );
            $data = DB::select(' EXEC uspUpdateAflyScore ?,?,?',$params_array);

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
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());  
        }
    }  

    /*
        Author : Mohammed Mushran
        Date   : 27/07/2021
        Name   : uspEnableClientQuestionBankAFlyScoreFromAmploSide
        Params : @
        Type   : PATCH
        Purpose: 
    */
    public function uspEnableClientQuestionBankAFlyScoreFromAmploSide( Request $request ) {
        try{
            $this->user_data = JWTAuth::parseToken()->authenticate()->toArray(); 
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }catch(JWTException $e){
            return $this->sendError($e->getMessage(),401);
        }
        try{
            $ClientId = $request->ClientId;
            $QuestionsId = $request->QuestionsId;
            $UserId = $this->user_data['ClientID'];
            $params = array(
                $ClientId,
                $QuestionsId,
                $UserId
            );
            $data = DB::select('EXEC Amplo.uspEnableClientQuestionBankAFlyScoreFromAmploSide ?,?,?',$params);
            // print_r($data);die;
            if( count($data) > 0){
                $message = "Updated successfully";
            }else{
                $message = "Error Occured, Please try again";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 28/07/2021
        Name   : uspEnableClientQuestionBankAFlyScoreFromAmploSidePost
        Params : @
        Type   : post
        Purpose: 
    */
    public function uspEnableClientQuestionBankAFlyScoreFromAmploSidePost( Request $request ) {
        try{
            $this->user_data = JWTAuth::parseToken()->authenticate()->toArray(); 
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }catch(JWTException $e){
            return $this->sendError($e->getMessage(),401);
        }
        try{
            $ClientId = $request->ClientId;
            $QuestionsId = $request->QuestionsId;
            $UserId = $this->user_data['ClientID'];
            $params = array(
                $ClientId,
                $QuestionsId,
                $UserId
            );
            $data = DB::select('EXEC Amplo.uspEnableClientQuestionBankAFlyScoreFromAmploSide ?,?,?',$params);
            // print_r($data);die;
            if( count($data) > 0){
                $message = "Updated successfully";
            }else{
                $message = "Error Occured, Please try again";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 23/08/2021
        Name   : usecase3ReestablishingAFLYScore
        Params : @
        Type   : GET
        Purpose: To get the AmpMarking/AflyScore data
    */
    public function usecase3ReestablishingAFLYScore(Request $request, $ProjectId) {
        try{
            $validator = Validator::make(['ProjectId'=>$ProjectId], [
                'ProjectId' => "required",
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $ProjectId
            );
            $data = DB::connection('sqlsrv_two')->select('EXEC AmpAI.usecase3ReestablishingAFLYScore ?',$param_array);
           
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
        Author : Mohammed Mushran
        Date   : 23/08/2021
        Name   : ReestablishAflyScore
        Params : @
        Type   : POST
        Purpose: To post the data
    */
    public function ReestablishAflyScore(Request $request) {
        try{
            $validator = Validator::make($request->all(), [
                'BenchmarkProjectID'   => 'required|numeric',
                'ReestablishAsIsAflyScore' => 'required',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData    = $request->all();
           
            $params_array = array(
                $requestData['BenchmarkProjectID'],
                $requestData['ReestablishAsIsAflyScore']
            );

            $data = DB::select(' EXEC ReestablishAflyScore ?,?', $params_array);
            if( count($data) > 0){
                $message = "Saved successfully";
            }else{
                $message = "Error Occured, Please try again";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 23/08/2021
        Name   : GetReestablishAflyScore
        Params : @
        Type   : GET
        Purpose: To get the BenchmarkProjectID data
    */
    public function GetReestablishAflyScore(Request $request, $BenchmarkProjectID) {
        try{
            $validator = Validator::make(['BenchmarkProjectID'=>$BenchmarkProjectID], [
                'BenchmarkProjectID' => "required",
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $BenchmarkProjectID
            );
            $data = DB::select('EXEC GetReestablishAflyScore ?',$param_array);
           
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
        Author : Mohammed Mushran
        Date   : 24/08/2021
        Name   : usecase3CheckAgainstProjectId
        Params : @
        Type   : GET
        Purpose: To get the CheckAgainstProjectId data
    */
    public function usecase3CheckAgainstProjectId(Request $request, $ProjectId) {
        try{
            $validator = Validator::make(['ProjectId'=>$ProjectId], [
                'ProjectId' => "required",
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $ProjectId
            );
            $data = DB::connection('sqlsrv_two')->select('EXEC AmpAI.usecase3CheckAgainstProjectId ?',$param_array);
           
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
        Author : Mohammed Mushran
        Date   : 31/08/2021
        Name   : uspUpdateFunctionPhaseTitleAgainstProjectLevel
        Params : @
        Type   : PATCH
        Purpose: 
    */
    public function uspUpdateFunctionPhaseTitleAgainstProjectLevel( Request $request ) {
        try{
            $this->user_data = JWTAuth::parseToken()->authenticate()->toArray(); 
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }catch(JWTException $e){
            return $this->sendError($e->getMessage(),401);
        }
        try{
            $DecompositionProjectID = $request->DecompositionProjectID;
            $FunctionId = $request->FunctionId;
            $PhaseId = $request->PhaseId;
            $Title = $request->Title;
            $UserId = $this->user_data['UserID'];
            $params = array(
                $DecompositionProjectID,
                $FunctionId,
                $PhaseId,
                $Title,
                $UserId
            );
            $data = DB::select('EXEC uspUpdateFunctionPhaseTitleAgainstProjectLevel ?,?,?,?,?',$params);
            // print_r($data);die;
            if( count($data) > 0){
                $message = "Updated successfully";
            }else{
                $message = "Error Occured, Please try again";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 31/08/2021
        Name   : uspUpdateStyleAgainstProjectLevel
        Params : @
        Type   : PATCH
        Purpose: 
    */
    public function uspUpdateStyleAgainstProjectLevel( Request $request ) {
        try{
            $this->user_data = JWTAuth::parseToken()->authenticate()->toArray(); 
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }catch(JWTException $e){
            return $this->sendError($e->getMessage(),401);
        }
        try{
            $TemplateFunctPhaseStyleAssignmentID = $request->TemplateFunctPhaseStyleAssignmentID;
            $StyleID = $request->StyleID;
            $UserId = $this->user_data['UserID'];
            $params = array(
                $TemplateFunctPhaseStyleAssignmentID,
                $StyleID,
                $UserId
            );
            $data = DB::select('EXEC uspUpdateStyleAgainstProjectLevel ?,?,?',$params);
            // print_r($data);die;
            if( count($data) > 0){
                $message = "Updated successfully";
            }else{
                $message = "Error Occured, Please try again";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    
    /*
        Author : Mohammed Mushran
        Date   : 31/08/2021
        Name   : uspDeleteStyleAgainstProjectLevel
        Params : 
        Type   : Delete
        Purpose: To delete style against project level
    */
    public function uspDeleteStyleAgainstProjectLevel (Request $request, $tfpsaid) {
        try{
            $UserId = $this->user_data['UserID'];
            $params_array = [
                $tfpsaid,
                $UserId
            ];
            $data = DB::select(' EXEC uspDeleteStyleAgainstProjectLevel ?,?', $params_array );
            // console.log($data);
            if( count($data) > 0) {
                $message = "Deleted Successfully.";
            } else {
                $message = "Error Occured.";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 01/09/2021
        Name   : CheckAmpProjectLinkWithCapabilityProject
        Params : @
        Type   : GET
        Purpose: To get the CheckAmpProjectLinkWithCapabilityProject data
    */
    public function CheckAmpProjectLinkWithCapabilityProject(Request $request, $ProjectId) {
        try{
            $validator = Validator::make(['ProjectId'=>$ProjectId], [
                'ProjectId' => "required",
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $ProjectId
            );
            $data = DB::select('EXEC CheckAmpProjectLinkWithCapabilityProject ?',$param_array);
           
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
        Author : Mohammed Mushran
        Date   : 02/09/2021
        Name   : GetAllCapabilityModelProjectLinkageWithAmpProjectName
        Params : @
        Type   : GET
        Purpose: To get the GetAllCapabilityModelProjectLinkageWithAmpProjectName data
    */
    public function GetAllCapabilityModelProjectLinkageWithAmpProjectName(Request $request) {
        try{
            
            $data = DB::select('EXEC GetAllCapabilityModelProjectLinkageWithAmpProjectName');
           
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
        Author : Mohammed Mushran
        Date   : 02/09/2021
        Name   : GetCapabilityModelProjectLinkageWithAmpProjectName
        Params : @
        Type   : GET
        Purpose: To get the GetCapabilityModelProjectLinkageWithAmpProjectName data
    */
    public function GetCapabilityModelProjectLinkageWithAmpProjectName(Request $request, $AmpMarkingProjectId) {
        try{
            $validator = Validator::make(['AmpMarkingProjectId'=>$AmpMarkingProjectId], [
                'AmpMarkingProjectId' => "required",
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $AmpMarkingProjectId
            );
            $data = DB::select('EXEC GetCapabilityModelProjectLinkageWithAmpProjectName ?',$param_array);
           
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
        Author : Mohammed Mushran
        Date   : 03/09/2021
        Name   : uspDeleteProcessAgainstProjectLevel
        Params : 
        Type   : Delete
        Purpose: To delete the ProcessAgainstProjectLevel data
    */
    public function uspDeleteProcessAgainstProjectLevel (Request $request) {
        try{
            $UserId = $this->user_data['UserID'];
            $params_array = [
                $request->DecompositionProcessLevel1ID,
                $UserId
            ];
            $data = DB::select(' EXEC uspDeleteProcessAgainstProjectLevel ?,?', $params_array );
            // console.log($data);
            if( count($data) > 0) {
                $message = "Deleted Successfully.";
            } else {
                $message = "Error Occured.";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    
    /*
        Author : Mohammed Mushran
        Date   : 06/09/2021
        Name   : uspDeleteProcessAgainstProjectLevelForDelete
        Params : 
        Type   : post
        Purpose: To delete the ProcessAgainstProjectLevel data
    */
    public function uspDeleteProcessAgainstProjectLevelForDelete (Request $request) {
        try{
            $UserId = $this->user_data['UserID'];
            $params_array = [
                $request->DecompositionProcessLevel1ID,
                $UserId
            ];
            $data = DB::select(' EXEC uspDeleteProcessAgainstProjectLevel ?,?', $params_array );
            // console.log($data);
            if( count($data) > 0) {
                $message = "Deleted Successfully.";
            } else {
                $message = "Error Occured.";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 03/09/2021
        Name   : uspUpdateProcessAgainstProjectLevel
        Params : @
        Type   : PATCH
        Purpose: 
    */
    public function uspUpdateProcessAgainstProjectLevel( Request $request ) {
        try{
            $this->user_data = JWTAuth::parseToken()->authenticate()->toArray(); 
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }catch(JWTException $e){
            return $this->sendError($e->getMessage(),401);
        }
        try{
            $DecompositionProcessLevel1ID = $request->DecompositionProcessLevel1ID;
            $ProcessLevelName = $request->ProcessLevelName;
            $UserId = $this->user_data['UserID'];
            $params = array(
                $DecompositionProcessLevel1ID,
                $ProcessLevelName,
                $UserId
            );
            $data = DB::select('EXEC uspUpdateProcessAgainstProjectLevel ?,?,?',$params);
            // print_r($data);die;
            if( count($data) > 0){
                $message = "Updated successfully";
            }else{
                $message = "Error Occured, Please try again";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 03/09/2021
        Name   : GetAllCapabilityModelProjectLinkageWithAmpProjectNameFromUsecase3
        Params : @
        Type   : GET
        Purpose: To get the GetAllCapabilityModelProjectLinkageWithAmpProjectNameFromUsecase3 data
    */
    public function GetAllCapabilityModelProjectLinkageWithAmpProjectNameFromUsecase3(Request $request) {
        try{
            
            $data = DB::select('EXEC GetAllCapabilityModelProjectLinkageWithAmpProjectNameFromUsecase3');
           
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
        Author : Mohammed Mushran
        Date   : 16/09/2021
        Name   : uspUpdateStyleAgainstProjectLevelNew
        Params : @
        Type   : PATCH
        Purpose: 
    */
    public function uspUpdateStyleAgainstProjectLevelNew( Request $request ) {
        try{
            $this->user_data = JWTAuth::parseToken()->authenticate()->toArray(); 
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }catch(JWTException $e){
            return $this->sendError($e->getMessage(),401);
        }
        try{
            $TemplateFunctPhaseStyleAssignmentID = $request->TemplateFunctPhaseStyleAssignmentID;
            $StyleID = $request->StyleID;
            $UserId = $this->user_data['UserID'];
            $ProjectId = $request->ProjectId;

            $params = array(
                $TemplateFunctPhaseStyleAssignmentID,
                $StyleID,
                $UserId,
                $ProjectId
            );
            $data = DB::select('EXEC uspUpdateStyleAgainstProjectLevelNew ?,?,?,?',$params);
            // print_r($data);die;
            if( count($data) > 0){
                $message = "Updated successfully";
            }else{
                $message = "Error Occured, Please try again";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

}
