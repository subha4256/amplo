<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use \stdClass;
use App\Http\Controllers\Controller;

use App\Http\Controllers\Api\BaseController as BaseController;
use DB;
use Validator;
use JWTAuth;
use App\Models\Common;
use PHPExcel; 
use PHPExcel_IOFactory;
use PHPExcel_Style_Fill;
use PHPExcel_Style_Border;
use PHPExcel_Style_Protection;

class BenchmarkQuestionsBankController extends BaseController
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
        Date   : 20/05/2020
        Name   : saveAmploQuestionBank
        Params : N/A
        Type   : POST
        Purpose: To save amplo quesion bank
    */
    public function saveAmploQuestionBank(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                //'questionsBankId'  => "required|min:0",
                'QuestionBankName' => "required|between:2,20"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $request['QuestionBankId'],
                $request['QuestionBankName'],
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC Amplo.uspSaveAmploQuestionBank ?,?,?',$param_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success) && ($data[0]->Success == false || $data[0]->Success ===0)){
                $message =$data[0]->MessageName; 
                return $this->sendError($message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 20/05/2020
        Name   : saveClientQuestionBank
        Params : N/A
        Type   : POST
        Purpose: To save client quesion bank
    */
    public function saveClientQuestionBank(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                //'questionsBankId'  => 'required',
                'QuestionBankName' => 'required'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
           
            $param_array = array(
                $request['QuestionBankId'],
                $request['QuestionBankName'],
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC uspSaveClientQuestionBank ?,?,?',$param_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success) && ($data[0]->Success == false || $data[0]->Success ===0)){
                $message =$data[0]->MessageName; 
                return $this->sendError($message);
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 20/05/2020
        Name   : saveAmploDomain
        Params : N/A
        Type   : POST
        Purpose: To save amplo domain
    */
    public function saveAmploDomain(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                //'questionsBankId'  => 'required',
                //'DomainId' => 'required'
                'DomainName' => 'required'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $request['QuestionBankId'],
                $request['DomainId'],
                $request['DomainName'],
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC Amplo.uspSaveAmploDomain ?,?,?,?',$param_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success) && ($data[0]->Success == false || $data[0]->Success ===0)){
                $message =$data[0]->MessageName; 
                return $this->sendError($message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
     /*
        Author : Abdul
        Date   : 20/05/2020
        Name   : saveClientDomain
        Params : N/A
        Type   : POST
        Purpose: To save client domain
    */
    public function saveClientDomain(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                //'questionsBankId'  => 'required',
                //'DomainId' => 'required'
                'DomainName' => 'required'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $request['QuestionBankId'],
                $request['DomainId'],
                $request['DomainName'],
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC uspSaveClientDomain ?,?,?,?',$param_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success) && ($data[0]->Success == false || $data[0]->Success ===0)){
                $message =$data[0]->MessageName; 
                return $this->sendError($message);
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }     
    /*
        Author : Abdul
        Date   : 14/05/2020
        Name   : saveAmploQuesionsAnswers
        Params : N/A
        Type   : POST
        Purpose: To save amplo quesion and answers
    */     
    public function saveAmploQuesionsAnswers(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'questionsBankId'  => 'required|numeric',
                'QuestionBankName' => 'required',
                'domainId'         => 'required|numeric',
                'domainName'       => 'required',
                'questions'        => 'required|array|min:1',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $this->user_data['UserID'],
                json_encode($request->all())
            );
            $data = DB::select('EXEC Amplo.uspSaveAmploQuesionBank ?,?',$param_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success) && ($data[0]->Success == false || $data[0]->Success ===0)){
                $message =$data[0]->MessageName; 
                return $this->sendError($message);
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 29/06/2020
        Name   : saveClientQuesionsAnswers
        Params : N/A
        Type   : POST
        Purpose: To save client quesion and answers
    */     
    public function saveClientQuesionsAnswers(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'questionsBankId'  => 'required|numeric',
                'QuestionBankName' => 'required',
                'domainId'         => 'required|numeric',
                'domainName'       => 'required',
                'questions'        => 'required|array|min:1',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $this->user_data['UserID'],
                json_encode($request->all())
            );
            $data = DB::select('EXEC uspSaveClientQuesionBank ?,?',$param_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success) && ($data[0]->Success == false || $data[0]->Success ===0)){
                $message =$data[0]->MessageName; 
                return $this->sendError($message);
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 13/05/2020
        Name   : getAmploQuestionBank
        Params : N/A
        Type   : GET
        Purpose: To get amplo question bank
    */     
    public function getAmploQuestionBank(Request $request){
        try{
            $data = DB::select('EXEC Amplo.uspGetAmploQuestionBank');
            if( count($data) > 0){
                $message = "Question bank retrieved";
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
        Date   : 13/05/2020
        Name   : getClientQuestionBank
        Params : @UserID
        Type   : GET
        Purpose: To get client question bank
    */     
    public function getClientQuestionBank(Request $request, $flag){
        try{
            $params = array(
                $this->user_data['UserID'],
                $flag
            );
            $data = DB::select('EXEC uspGetClientQuestionBank ?,?',$params);
            if( count($data) > 0){
                $message = "Question bank retrieved";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 16/07/2021
        Name   : uspCheckDuplicateAmploQuestionBankName
        Params : @QuestionBankName
        Type   : POST
        Purpose: To get question bank name for Amplo side
    */
    public function uspCheckDuplicateAmploQuestionBankName(Request $request) {
        try{
            $params = array(
                $request->QuestionBankName
            );
            $data = DB::select('EXEC Amplo.uspCheckDuplicateAmploQuestionBankName ?',$params);
            // print_r($data);die;
            if( count($data) > 0){
                $message = "QuestionBank name already present";
            }else{
                $message = "QuestionBank name not present";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 16/07/2021
        Name   : uspCheckDuplicateClientQuestionBankName
        Params : @QuestionBankName
        Type   : POST
        Purpose: To get question bank name for client side
    */
    public function uspCheckDuplicateClientQuestionBankName(Request $request) {
        try{
            $params = array(
                $request->QuestionBankName
            );
            $data = DB::select('EXEC uspCheckDuplicateClientQuestionBankName ?',$params);
            if( count($data) > 0){
                $message = "QuestionBank name already present";
            }else{
                $message = "QuestionBank name not present";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 23/07/2021
        Name   : UpdateClientQuestionBankFromInterface
        Params : @
        Type   : PATCH
        Purpose: 
    */
    public function UpdateClientQuestionBankFromInterface(Request $request) {
        try{
            $this->user_data = JWTAuth::parseToken()->authenticate()->toArray(); 
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }catch(JWTException $e){
            return $this->sendError($e->getMessage(),401);
        }
        try{
            $QuestionBankId = $request->QuestionBankId;
            $BatchId = $request->BatchId;
            $UserId = $this->user_data['UserID'];
            $params = array(
                $QuestionBankId,
                $BatchId,
                $UserId
            );
            $data = DB::select('EXEC UpdateClientQuestionBankFromInterface ?,?,?',$params);
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
        Author : Abdul
        Date   : 15/05/2020
        Name   : getAmploDomainQuestions
        Params : @QuestionBankId
        Type   : GET
        Purpose: To get amplo domain questions by question bank id
    */     
    public function getAmploDomainQuestions(Request $request,$QuestionBankId){
        try{
            $params = array(
               $QuestionBankId
            );
            $data = DB::select('EXEC Amplo.uspGetAmploQuestions ?',$params);
            $data_array = array();
            $final_data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $data_array[$value->AmploBMDomainId]["AmploBMDomainId"] = $value->AmploBMDomainId;
                    $data_array[$value->AmploBMDomainId]["DomainName"]   = $value->DomainName;
                    
                    if($value->QuestionsId ==null || $value->QuestionsId==""){
                        $data_array[$value->AmploBMDomainId]['questions'] = array();
                    }else{
                        $data_array[$value->AmploBMDomainId]['questions'][$value->QuestionsId]["id"] = $value->QuestionsId;
                        $data_array[$value->AmploBMDomainId]['questions'][$value->QuestionsId]["questionText"] = $value->QuestionText;
                        $data_array[$value->AmploBMDomainId]['questions'][$value->QuestionsId]["StyleId"] = $value->StyleId;
                        $data_array[$value->AmploBMDomainId]['questions'][$value->QuestionsId]["OrderOfQuestion"] = $value->OrderOfQuestion;

                        $data_array[$value->AmploBMDomainId]["questions"][$value->QuestionsId]["response"][]=array("position"=>$value->Position,"responseText"=>$value->QuestionOptionText,"responseName"=>$value->QuestionOptionName,"ImagePath"=>$value->ImagePath);
                    }
                }
                $final_data_array = array_values($data_array);
                foreach ($final_data_array as $key => $value) {
                    $final_data_array[$key]['questions'] = array_values($value['questions']);
                }
                $message = "Domain Question retrieved successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($final_data_array, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 15/05/2020
        Name   : getClientDomainQuestions
        Params : @QuestionBankId
        Type   : GET
        Purpose: To get client domain questions by question bank id
    */     
    public function getClientDomainQuestions(Request $request,$QuestionBankId){
        try{
            $params = array(
               $QuestionBankId
            );
            $data = DB::select('EXEC uspGetClientQuestions ?',$params);
            //echo "<pre>";print_r($data);echo "<br>";die;
            $data_array = array();
            $final_data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                   $data_array[$value->BMDomainId]["BMDomainId"] = $value->BMDomainId;
                   $data_array[$value->BMDomainId]["DomainName"]   = $value->DomainName;

                   if($value->QuestionsId ==null || $value->QuestionsId==""){
                        $data_array[$value->BMDomainId]['questions'] = array();
                   }else{
                       $data_array[$value->BMDomainId]['questions'][$value->QuestionsId]["id"] = $value->QuestionsId;
                        $data_array[$value->BMDomainId]['questions'][$value->QuestionsId]["questionText"] = $value->QuestionText;
                        $data_array[$value->BMDomainId]['questions'][$value->QuestionsId]["StyleId"] = $value->StyleId;
                        $data_array[$value->BMDomainId]['questions'][$value->QuestionsId]["OrderOfQuestion"] = $value->OrderOfQuestion;

                        $data_array[$value->BMDomainId]["questions"][$value->QuestionsId]["response"][]=array("position"=>$value->Position,"responseText"=>$value->QuestionOptionText,"responseName"=>$value->QuestionOptionName,"ImagePath"=>$value->ImagePath);
                    }
                }
                $final_data_array = array_values($data_array);
                foreach ($final_data_array as $key => $value) {
                    $final_data_array[$key]['questions'] = array_values($value['questions']);
                }
                $message = "Domain Question retrieved successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($final_data_array, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
     /*
        Author : Abdul
        Date   : 15/05/2020
        Name   : getAmploDomains
        Params : @QuestionBankId
        Type   : GET
        Purpose: To get amplo domains
    */     
    public function getAmploDomains(Request $request,$QuestionBankId){
        try{
            $params = array(
               $QuestionBankId
            );
            $data = DB::select('EXEC Amplo.uspGetAmploDomains ?',$params);
            if( count($data) > 0){
                $message = "Domains retrieved successfully";
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
        Date   : 15/05/2020
        Name   : getClientDomains
        Params : @QuestionBankId
        Type   : GET
        Purpose: To get client domains
    */     
    public function getClientDomains(Request $request,$QuestionBankId){
        try{
            $params = array(
               $QuestionBankId
            );
            $data = DB::select('EXEC uspGetClientDomains ?',$params);
            if( count($data) > 0){
                $message = "Domains retrieved successfully";
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
        Date   : 15/05/2020
        Name   : getAmploQuesionsAnswers
        Params : @DomainId,@QuestionBankId
        Type   : GET
        Purpose: To get amplo questions answers by domain id and question bankId
    */     
    public function getAmploQuesionsAnswers(Request $request,$DomainId, $QuestionBankId){
        try{
            $params = array(
               $DomainId,
               $QuestionBankId
            );
            $data = DB::select('EXEC Amplo.uspGetAmploQuestionsByDomain ?,?',$params);
            $data_array = array();
            $final_data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $data_array[$value->QuestionBankId]['questionsBankId']  = $value->QuestionBankId;
                    $data_array[$value->QuestionBankId]['QuestionBankName'] = $value->QuestionBankName;
                    $data_array[$value->QuestionBankId]['domainId']         = $value->AmploBMDomainId;
                    $data_array[$value->QuestionBankId]['domainName']       = $value->DomainName;
                    
                    if($value->QuestionsId==null || $value->QuestionsId==""){
                        $data_array[$value->QuestionBankId]['questions'] = array();
                    }else{
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionsId]["id"] = $value->QuestionsId;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionsId]["questionText"] = $value->QuestionText;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionsId]["StyleId"] = $value->StyleId;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionsId]["OrderOfQuestion"] = $value->OrderOfQuestion;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionsId]["IsAFlyScoreEnabled"] = $value->IsAFlyScoreEnabled;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionsId]["importance"] = $value->QuestionWeightage;
                        
                        
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionsId]["response"][] = array("position"=>$value->Position,"responseText"=>$value->QuestionOptionText,"responseName"=>$value->QuestionOptionName,"ImagePath"=>$value->ImagePath);
                    }
                }
               
                $final_data_array = array_values($data_array);
                foreach ($final_data_array as $key => $value) {
                    $final_data_array[$key]['questions'] = array_values($value['questions']);
                }
                $message = "Questions answers retrieved successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($final_data_array, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 21/05/2020
        Name   : getClientQuestionsAnswers
        Params : @DomainId,@QuestionBankId
        Type   : GET
        Purpose: To get client questions answers by domain id and question bankId
    */     
    public function getClientQuestionsAnswers(Request $request,$DomainId, $QuestionBankId){
        try{
            $params = array(
               $DomainId,
               $QuestionBankId
            );
            $data = DB::select('EXEC uspGetClientQuestionsByDomain ?,?',$params);
            $data_array = array();
            $final_data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $data_array[$value->QuestionBankId]['questionsBankId']  = $value->QuestionBankId;
                    $data_array[$value->QuestionBankId]['QuestionBankName'] = $value->QuestionBankName;
                    $data_array[$value->QuestionBankId]['domainId']         = $value->BMDomainId;
                    $data_array[$value->QuestionBankId]['domainName']       = $value->DomainName;
                    
                    if($value->QuestionsId==null || $value->QuestionsId==""){
                         $data_array[$value->QuestionBankId]['questions'] = array();
                    }else{
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionsId]["id"] = $value->QuestionsId;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionsId]["questionText"] = $value->QuestionText;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionsId]["StyleId"] = $value->StyleId;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionsId]["OrderOfQuestion"] = $value->OrderOfQuestion;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionsId]["IsAFlyScoreEnabled"] = $value->IsAFlyScoreEnabled;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionsId]["importance"] = $value->QuestionWeightage;
                        
                        
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionsId]["response"][] = array("position"=>$value->Position,"QuestionOptionId"=>$value->QuestionOptionId,"responseText"=>$value->QuestionOptionText,"responseName"=>$value->QuestionOptionName,"ImagePath"=>$value->ImagePath);
                    }
                }

                $final_data_array = array_values($data_array);
                foreach ($final_data_array as $key => $value) {
                    $final_data_array[$key]['questions'] = array_values($value['questions']);
                }
                $message = "Questions answers retrieved successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($final_data_array, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 30/06/2020
        Name   : getAllBmStyles
        Params : 
        Type   : GET
        Purpose: To get all bm styles
    */     
    public function getAllBmStyles(Request $request){
        try{
            $data = DB::select('EXEC Amplo.GetAllBmStyles ');
            if( count($data) > 0){
                $message = "Styles retrieved successfully";
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
        Date   : 30/06/2020
        Name   : getAllBmStyles
        Params : 
        Type   : GET
        Purpose: To get all bm styles
    */     
    public function getBmListStyle(Request $request){
        try{
            $requestData = $request->all();
            $params_array = array(
                $requestData['StyleId'],
                $requestData['StyleName']=='' ? '' : $requestData['StyleName']
            );
            //echo "<pre>";print_r($params_array);echo "<br>";die;
            $data = DB::select('EXEC Amplo.uspListStyle ?,?', $params_array);
            if( count($data) > 0){
                $message = "Styles retrieved successfully";
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
        Date   : 01/07/2020
        Name   : getBmStyleDetails
        Params : 
        Type   : GET
        Purpose: To get benchmarking style details
    */     
    public function getBmStyleDetails(Request $request, $StyleId){
        try{
            $params_array = array(
                $StyleId
            );
            $data = DB::select('EXEC Amplo.uspGetStyleDetails ?', $params_array);
            if( count($data) > 0){
                $message = "Styles retrieved successfully";
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
        Date   : 01/07/2020
        Name   : deleteAmploQuestion
        Params : @QuestionId
        Type   : GET
        Purpose: To delete amplo question
    */     
    public function deleteAmploQuestion(Request $request, $QuestionId){
        try{
            $params_array = array(
                $QuestionId
            );
            $data = DB::select('EXEC Amplo.DeleteAmploQuestion ?', $params_array);

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 01/07/2020
        Name   : deleteAmploDomain
        Params : @DomainId
        Type   : GET
        Purpose: To delete amplo domain
    */     
    public function deleteAmploDomain(Request $request, $DomainId){
        try{
            $params_array = array(
                $DomainId
            );
            $data = DB::select('EXEC Amplo.DeleteAmploDomain ?', $params_array);

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 01/07/2020
        Name   : deleteAmploQuestionBank
        Params : @QuestionBankId
        Type   : GET
        Purpose: To delete amplo question bank
    */     
    public function deleteAmploQuestionBank(Request $request, $QuestionBankId){
        try{
            $params_array = array(
                $QuestionBankId
            );
            $data = DB::select('EXEC Amplo.DeleteAmploQuestionBank ?', $params_array);

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 01/07/2020
        Name   : saveAmploAttachment
        Params : 
        Type   : POST
        Purpose: To save amplo attachment
    */ 
    public function saveAmploAttachment(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'files'      => 'required',
                'QuestionId' => 'required'
                
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $files           = $request->file('files');
            $attachment_note = $request->attachment_note;
            $extension       = $files->getClientOriginalExtension();
            $file_name       = $files->getClientOriginalName();
            
            $dirname         = "QuestionAttachment";
            $destinationPath = public_path('/'.$dirname);
            
            if(! is_dir($destinationPath)){
                mkdir($destinationPath, 0755,true);
            }
            if($files->move($destinationPath, $file_name)){
                chmod($destinationPath, 0777);
                $file_path = env('APP_URL').$file_name;
                
                $params_array = array(
                    $request->QuestionId,
                    $extension,
                    $file_path,
                    $file_name,
                    $attachment_note,
                    $this->user_data['UserID']
                ); 
                $data = DB::select(' EXEC Amplo.uspSaveAmploAttachment ?,?,?,?,?,?',$params_array);
                if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                   $message = $data[0]->MessageName;
                   return $this->sendResponse($data[0], $message);
                }else if(isset($data[0]->Success)){
                    $message = $data[0]->MessageName;  
                    return $this->sendError($message);
                }
            }else{
                $message = "file not uploaded successfully";
                return $this->sendError($message);
            }
            
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }    
    /*
        Author : Abdul
        Date   : 01/07/2020
        Name   : getAmploAttachment
        Params : @QuestionId
        Type   : GET
        Purpose: To get amplo attachment by question id
    */     
    public function getAmploAttachment(Request $request, $QuestionId){
        try{
            $params_array = array(
                $QuestionId
            );
            $data = DB::select('EXEC Amplo.uspGetAmploAttachment ?', $params_array);
            if( count($data)>0){
               $message = "Data retrived successfully";
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
        Date   : 01/07/2020
        Name   : deleteAmploAttachment
        Params : @AttachmentId
        Type   : GET
        Purpose: To delete amplo attachment
    */     
    public function deleteAmploAttachment(Request $request, $attachmentId){
        try{
            $params_array = array(
                $attachmentId,
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC Amplo.uspDeleteAmploAttachment ?,?', $params_array);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
            
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 03/09/2020
        Name   : getAllClientQuestionBank
        Params : 
        Type   : GET
        Purpose: To Get All Client Question Bank
    */
    public function getAllClientQuestionBank(Request $request){
        try{
            $params_array = array(
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC Amplo.uspGetAllClientQuestionBank ?',$params_array);
            //echo "<pre>";print_r($data);echo "<br>";die;
            $data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                   $data_array[$value->ClientId]['ClientId']   = $value->ClientId;
                   $data_array[$value->ClientId]['ClientName'] = $value->ClientName;
                   $data_array[$value->ClientId]['QuestionBank'][$value->SchemaName.'_'.$value->QuestionBankId]['QuestionBankId'] = $value->SchemaName.'_'.$value->QuestionBankId;
                   $data_array[$value->ClientId]['QuestionBank'][$value->SchemaName.'_'.$value->QuestionBankId]['QuestionBankName'] = $value->QuestionBankName;
                   $data_array[$value->ClientId]['QuestionBank'][$value->SchemaName.'_'.$value->QuestionBankId]['IsAmploAssigned'] = $value->IsAmploAssigned;
                   $data_array[$value->ClientId]['QuestionBank'][$value->SchemaName.'_'.$value->QuestionBankId]['Assignment'] = $value->Assignment;
                   $data_array[$value->ClientId]['QuestionBank'][$value->SchemaName.'_'.$value->QuestionBankId]['IsAFlyScoreEnabled'] = $value->IsAFlyScoreEnabled;

                    /*$data_array['QuestionBank'][$value->SchemaName.'_'.$value->QuestionBankId]['QuestionBankId'] = $value->SchemaName.'_'.$value->QuestionBankId;
                    $data_array['QuestionBank'][$value->SchemaName.'_'.$value->QuestionBankId]['QuestionBankName'] = $value->QuestionBankName;
                    $data_array['QuestionBank'][$value->SchemaName.'_'.$value->QuestionBankId]['IsAmploAssigned'] = $value->IsAmploAssigned;
                    $data_array['QuestionBank'][$value->SchemaName.'_'.$value->QuestionBankId]['Assignment'] = $value->Assignment;
                    $data_array['QuestionBank'][$value->SchemaName.'_'.$value->QuestionBankId]['IsAFlyScoreEnabled'] = $value->IsAFlyScoreEnabled;*/
                }
                $data_array = array_values($data_array);
                foreach ($data_array as $key => $value) {
                    if(isset($value['QuestionBank'])){
                        $data_array[$key]['QuestionBank'] = array_values($value['QuestionBank']);
                    }
                }
                /*if(isset($data_array['QuestionBank'])){
                    $data_array['QuestionBank'] = array_values($data_array['QuestionBank']);
                }*/
                $message = "Question bank retrieved";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($data_array, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }  
    /*
        Author : Abdul
        Date   : 03/09/2020
        Name   : getClientQuestion
        Params : 
        Type   : GET
        Purpose: To Get All Client Question
    */  
    public function getClientQuestions(Request $request,$QuestionBankId){
        try{
            $str = explode("_",$QuestionBankId);

           
            $params_array = array(
               $str[1]
            );
            $data = DB::select(' EXEC '.$str[0].'.uspGetClientQuestions ? ' , $params_array );
            $data_array = array();
            $final_data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                   $data_array[$value->BMDomainId]["BMDomainId"] = $value->BMDomainId;
                   $data_array[$value->BMDomainId]["DomainName"]   = $value->DomainName;

                   if($value->QuestionsId ==null || $value->QuestionsId==""){
                        $data_array[$value->BMDomainId]['questions'] = array();
                   }else{
                       $data_array[$value->BMDomainId]['questions'][$value->QuestionsId]["id"] = $value->QuestionsId;
                        $data_array[$value->BMDomainId]['questions'][$value->QuestionsId]["questionText"] = $value->QuestionText;
                        $data_array[$value->BMDomainId]['questions'][$value->QuestionsId]["StyleId"] = $value->StyleId;
                        $data_array[$value->BMDomainId]['questions'][$value->QuestionsId]["OrderOfQuestion"] = $value->OrderOfQuestion;
                        $data_array[$value->BMDomainId]['questions'][$value->QuestionsId]["IsAFlyScoreEnabled"] = $value->IsAFlyScoreEnabled;

                        $data_array[$value->BMDomainId]["questions"][$value->QuestionsId]["response"][]=array("position"=>$value->Position,"responseText"=>$value->QuestionOptionText,"responseName"=>$value->QuestionOptionName,"ImagePath"=>$value->ImagePath);
                    }
                }
                $final_data_array = array_values($data_array);
                foreach ($final_data_array as $key => $value) {
                    $final_data_array[$key]['questions'] = array_values($value['questions']);
                }
                $message = "Domain Question retrieved successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($final_data_array, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }    
    /*
        Author : Abdul
        Date   : 01/07/2020
        Name   : deleteClientQuestion
        Params : @QuestionId
        Type   : GET
        Purpose: To delete client question
    */     
    public function deleteClientQuestion(Request $request, $QuestionId){
        try{
            $requestData = $request->all();
            $params_array = array(
                $QuestionId
            );
            $data = DB::select('EXEC DeleteClientQuestion ?', $params_array);

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    
    /*
        Author : Abdul
        Date   : 01/07/2020
        Name   : deleteClientDomain
        Params : @DomainId
        Type   : GET
        Purpose: To delete client domain
    */     
    public function deleteClientDomain(Request $request, $DomainId){
        try{
            $requestData = $request->all();
            $params_array = array(
                $DomainId
            );
            $data = DB::select('EXEC DeleteClientDomain ?', $params_array);

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 01/07/2020
        Name   : deleteClientQuestionBank
        Params : @QuestionBankId
        Type   : GET
        Purpose: To delete client question bank
    */     
    public function deleteClientQuestionBank(Request $request, $QuestionBankId){
        try{
            $requestData = $request->all();
            $params_array = array(
                $QuestionBankId
            );
            $data = DB::select('EXEC DeleteClientQuestionBank ?', $params_array);

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 01/07/2020
        Name   : saveClientAttachment
        Params : 
        Type   : POST
        Purpose: To save client attachment
    */ 
    public function saveClientAttachment(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'files'      => 'required',
                'QuestionId' => 'required'
                
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $files           = $request->file('files');
            $attachment_note = $request->attachment_note;
            $extension       = $files->getClientOriginalExtension();
            $file_name       = $files->getClientOriginalName();
            
            $dirname         = "QuestionAttachment";
            $destinationPath = public_path('/'.$dirname);
            
            if(! is_dir($destinationPath)){
                mkdir($destinationPath, 0755,true);
            }
            if($files->move($destinationPath, $file_name)){
                chmod($destinationPath, 0777);
                $file_path = env('APP_URL').$file_name;
                
                $params_array = array(
                    $request->QuestionId,
                    $extension,
                    $file_path,
                    $file_name,
                    $attachment_note,
                    $this->user_data['UserID']
                ); 
                $data = DB::select(' EXEC uspSaveClientAttachment ?,?,?,?,?,?',$params_array);
                if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                   $message = $data[0]->MessageName;
                   return $this->sendResponse($data[0], $message);
                }else if(isset($data[0]->Success)){
                    $message = $data[0]->MessageName;  
                    return $this->sendError($message);
                }
            }else{
                $message = "file not uploaded successfully";
                return $this->sendError($message);
            }
            
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 01/07/2020
        Name   : getClientAttachment
        Params : @QuestionId
        Type   : GET
        Purpose: To get client attachment by question id
    */     
    public function getClientAttachment(Request $request, $QuestionId){
        try{
            $requestData = $request->all();
            $params_array = array(
                $QuestionId
            );
            $data = DB::select('EXEC uspGetClientAttachment ?', $params_array);
            if( count($data)>0){
               $message = "Data retrived successfully";
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
        Date   : 01/07/2020
        Name   : deleteClientAttachment
        Params : @AttachmentId
        Type   : GET
        Purpose: To delete client attachment
    */     
    public function deleteClientAttachment(Request $request, $attachmentId){
        try{
            $params_array = array(
                $attachmentId,
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC uspDeleteClientAttachment ?,?', $params_array);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
            
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 02/07/2020
        Name   : saveClientAssignment
        Params :
        Type   : POST
        Purpose: To save client assignment
    */     
    public function saveClientAssignment(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'QuestionId' => 'required',
                'Clients'    => 'required|array'
                
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $params_array = array(
                $requestData['QuestionId'],
                $this->user_data['UserID'],
                json_encode($requestData['Clients'])
            );
            $data = DB::select('EXEC Amplo.uspSaveClientAssignment ?,?,?', $params_array);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
            
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 02/07/2020
        Name   : getClientAssignment
        Params :
        Type   : GET
        Purpose: To get client assignment
    */     
    public function getClientAssignment(Request $request, $QuestionBankId){
        try{
            $params_array = array(
                $QuestionBankId
            );
            $data = DB::select('EXEC Amplo.uspGetClientAssignment ?', $params_array);
            
            if(count($data)>0){
                $message = "Data retrived successfully";
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
        Date   : 15/07/2020
        Name   : clientDuplicateQuestionBank
        Params :
        Type   : POST
        Purpose: To save duplicate question bank for client
    */     
    public function clientDuplicateQuestionBank(Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                "SourceQuestionBankId" => "required|numeric",
                "QuestionBankName"     => "required|between:2,30"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();

            $params = array(
                $requestData['QuestionBankName']
            );
            $data = DB::select('EXEC uspCheckDuplicateClientQuestionBankName ?',$params);
            if( count($data) > 0 && $data[0]->Success == 0){
                $message = $data[0]->MessageName;
                return $this->sendError($message);
            }

            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $requestData['SourceQuestionBankId'],
                $requestData['QuestionBankName'],
                $userId
            );
            $data = DB::select('EXEC uspDuplicateClientQuestionBank ?,?,?', $params_array);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else{
                $message = "";
                return $this->sendResponse($data, $message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 15/07/2020
        Name   : amploDuplicateQuestionBank
        Params :
        Type   : POST
        Purpose: To save duplicate question bank for amplo
    */     
    public function amploDuplicateQuestionBank(Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                "SourceQuestionBankId" => "required|numeric",
                "QuestionBankName"     => "required|between:2,30"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();

            $params = array(
                $requestData['QuestionBankName']
            );
            $data = DB::select('EXEC Amplo.uspCheckDuplicateAmploQuestionBankName ?',$params);
            if( count($data) > 0){
                $message = $data[0]->MessageName;
                return $this->sendError($message);
            }

            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $requestData['SourceQuestionBankId'],
                $requestData['QuestionBankName'],
                $userId
            );
            $data = DB::select('EXEC Amplo.uspDuplicateAmploQuestionBank ?,?,?', $params_array);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else{
                $message = "";
                return $this->sendResponse($data, $message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 15/07/2020
        Name   : updateClientQuestionBankIndustry
        Params :
        Type   : POST
        Purpose: To Update Client Question Bank Industry
    */     
    public function updateClientQuestionBankIndustry(Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                "QuestionBankId"       => "required|numeric",
                "IndustryVerticalId"   => "required|numeric",
                "IndustrySubVerticalId"=> "required|numeric"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $requestData['QuestionBankId'],
                $requestData['IndustryVerticalId'],
                $requestData['IndustrySubVerticalId'],
                $userId
            );
            $data = DB::select('EXEC uspUpdateClientQuestionBankIndustry ?,?,?,?', $params_array);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else{
                $message = "";
                return $this->sendResponse($data, $message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 15/07/2020
        Name   : updateAmploQuestionBankIndustry
        Params :
        Type   : POST
        Purpose: To Update Amplo Question Bank Industry
    */     
    public function updateAmploQuestionBankIndustry(Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                "QuestionBankId"       => "required|numeric",
                "IndustryVerticalId"   => "required|numeric",
                "IndustrySubVerticalId"=> "required|numeric"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $requestData['QuestionBankId'],
                $requestData['IndustryVerticalId'],
                $requestData['IndustrySubVerticalId'],
                $userId
            );
            $data = DB::select('EXEC Amplo.uspUpdateAmploQuestionBankIndustry ?,?,?,?', $params_array);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else{
                $message = "";
                return $this->sendResponse($data, $message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 06/10/2020
        Name   : getAmploQuestionBankIndustry
        Params :
        Type   : GET
        Purpose: To Get Amplo Question Bank Industry
    */
    public function getAmploQuestionBankIndustry(Request $request, $QuestionBankId ){
        try{
            $params_array = array(
                $QuestionBankId
            );
            $data = DB::select('EXEC Amplo.uspGetAmploQuestionBankIndustry ?', $params_array);
            if(count($data) > 0){
                $message = "Data retrieved successfully.";
            }else{
                $message = "No data found";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 06/10/2020
        Name   : getClientQuestionBankIndustry
        Params :
        Type   : GET
        Purpose: To Get Client Question Bank Industry
    */
    public function getClientQuestionBankIndustry(Request $request, $QuestionBankId ){
        try{
            $params_array = array(
                $QuestionBankId
            );
            $data = DB::select('EXEC uspGetClientQuestionBankIndustry ?', $params_array);
            if(count($data) > 0){
                $message = "Data retrieved successfully.";
            }else{
                $message = "No data found";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }    
    /*
        Author : Abdul
        Date   : 18/08/2020
        Name   : exportAmploQuestionBank
        Params :
        Type   : GET
        Purpose: To Export Amplo Question Bank
    */  
    public function exportAmploQuestionBank( Request $request, $questionBankId){
        try{
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $questionBankId
            );
            $questionBankData = DB::select('EXEC Amplo.uspAmploBmQuestionBankExport ?', $params_array);
           
            $questionBankDetails = DB::select('EXEC Amplo.uspAmploBmQuestionBankDetailsExport ?', $params_array);
           
            if(count($questionBankData) >0 && count($questionBankDetails) > 0){
                $questionBankData  = json_decode(json_encode($questionBankData), true);
                $questionBankDetails  = json_decode(json_encode($questionBankDetails), true);

                /* Create new PHPExcel object*/
                $objPHPExcel = new PHPExcel();

                $styleArray = array(
                    'fill' => array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'color' => array('rgb' => 'D3D3D3')
                    ),
                    'font'  => array(
                        'bold'  => true
                    ),
                    'borders' => array(
                        'allborders' => array(
                            'style' => PHPExcel_Style_Border::BORDER_THIN,
                            'color' => array('rgb' => '000000')
                        )
                    )
                );
                $styleArrayCol = array(
                    'borders' => array(
                        'allborders' => array(
                            'style' => PHPExcel_Style_Border::BORDER_THIN,
                            'color' => array('rgb' => '000000')
                        )
                    )
                );
                 /* Create a first sheet, representing sales data*/
                $objPHPExcel->setActiveSheetIndex(0);
                $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($questionBankData)), null, 'A1');
                $objPHPExcel->getActiveSheet()->fromArray($questionBankData, null, 'A2');

                $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);

                for ($i = 'A'; $i !=  $objPHPExcel->getActiveSheet()->getHighestColumn(); $i++) {
                    $objPHPExcel->getActiveSheet()->getColumnDimension($i)->setAutoSize(TRUE);
                    
                }
                for($i=1; $i<=count($questionBankData); $i++){
                    $objPHPExcel->getActiveSheet()->getStyle('A'.$i.':'.$column.($i+1))->applyFromArray($styleArrayCol);;
                }
                /* Rename 1st sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('QuestionBank');


                /* Create a new worksheet, after the default sheet*/
                $objPHPExcel->createSheet();

                $objPHPExcel->setActiveSheetIndex(1);
                $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($questionBankDetails)), null, 'A1');
                $objPHPExcel->getActiveSheet()->fromArray($questionBankDetails, null, 'A2');

                $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);

                for ($i = 'A'; $i !=  $objPHPExcel->getActiveSheet()->getHighestColumn(); $i++) {
                    $objPHPExcel->getActiveSheet()->getColumnDimension($i)->setAutoSize(TRUE);
                    
                }
                for($i=1; $i<=count($questionBankDetails); $i++){
                    $objPHPExcel->getActiveSheet()->getStyle('A'.$i.':'.$column.($i+1))->applyFromArray($styleArrayCol);;
                }

                /* Rename 2nd sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Options');

                $date=date('d-M-Y-H-i-s');
                $filename   ='QuestionBank'.'-'.$date.'.xls'; 
    
                /* Redirect output to a client’s web browser (Excel5)*/
                $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
                // Sending headers to force the user to download the file
                header('Content-Type: application/vnd.ms-excel');
                header('Content-Disposition: attachment;filename="'.$filename.'"');
                header('Cache-Control: max-age=0');
                //$objWriter->save('php://output');
                //die;
                $objWriter->save($filename);
                if (file_exists(public_path($filename))){
                    $message = "file generate successfully";
                    $data    = array("file_name"=> $filename );
                    return $this->sendResponse($data, $message);  
                } 
                else{
                    $message = "file not generated";
                    $data    = array("file_name"=>"");
                    return $this->sendResponse($data, $message);  
                }
            }else{
                $message  = "No record found";
                $data    = array("file_name"=>"");
                return $this->sendResponse($data, $message); 
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 
    /*
        Author : Abdul
        Date   : 18/08/2020
        Name   : exportClientQuestionBank
        Params :
        Type   : GET
        Purpose: To Export Client Question Bank
    */  
    public function exportClientQuestionBank( Request $request, $questionBankId){
        try{
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $questionBankId
            );
            $questionBankData = DB::select('EXEC uspBmQuestionBankExport ?', $params_array);
           
            $questionBankDetails = DB::select('EXEC uspBmQuestionBankDetailsExport ?', $params_array);
            
            if(count($questionBankData) >0 && count($questionBankDetails) > 0){
                $questionBankData  = json_decode(json_encode($questionBankData), true);
                $questionBankDetails  = json_decode(json_encode($questionBankDetails), true);
                /* Create new PHPExcel object*/
                $objPHPExcel = new PHPExcel();

                $styleArray = array(
                    'fill' => array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'color' => array('rgb' => 'D3D3D3')
                    ),
                    'font'  => array(
                        'bold'  => true
                    ),
                    'borders' => array(
                        'allborders' => array(
                            'style' => PHPExcel_Style_Border::BORDER_THIN,
                            'color' => array('rgb' => '000000')
                        )
                    )
                );
                $styleArrayCol = array(
                    'borders' => array(
                        'allborders' => array(
                            'style' => PHPExcel_Style_Border::BORDER_THIN,
                            'color' => array('rgb' => '000000')
                        )
                    )
                );
                 /* Create a first sheet, representing sales data*/
                $objPHPExcel->setActiveSheetIndex(0);
                $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($questionBankData)), null, 'A1');
                $objPHPExcel->getActiveSheet()->fromArray($questionBankData, null, 'A2');

                $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);

                for ($i = 'A'; $i !=  $objPHPExcel->getActiveSheet()->getHighestColumn(); $i++) {
                    $objPHPExcel->getActiveSheet()->getColumnDimension($i)->setAutoSize(TRUE);
                    
                }
                for($i=1; $i<=count($questionBankData); $i++){
                    $objPHPExcel->getActiveSheet()->getStyle('A'.$i.':'.$column.($i+1))->applyFromArray($styleArrayCol);;
                }
                /* Rename 1st sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('QuestionBank');


                /* Create a new worksheet, after the default sheet*/
                $objPHPExcel->createSheet();

                $objPHPExcel->setActiveSheetIndex(1);
                $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($questionBankDetails)), null, 'A1');
                $objPHPExcel->getActiveSheet()->fromArray($questionBankDetails, null, 'A2');

                $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);

                for ($i = 'A'; $i !=  $objPHPExcel->getActiveSheet()->getHighestColumn(); $i++) {
                    $objPHPExcel->getActiveSheet()->getColumnDimension($i)->setAutoSize(TRUE);
                    
                }
                for($i=1; $i<=count($questionBankDetails); $i++){
                    $objPHPExcel->getActiveSheet()->getStyle('A'.$i.':'.$column.($i+1))->applyFromArray($styleArrayCol);;
                }

                /* Rename 2nd sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Options');

                $date=date('d-M-Y-H-i-s');
                $filename   ='QuestionBank'.'-'.$date.'.xls'; 
    
                /* Redirect output to a client’s web browser (Excel5)*/
                $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
                // Sending headers to force the user to download the file
                header('Content-Type: application/vnd.ms-excel');
                header('Content-Disposition: attachment;filename="'.$filename.'"');
                header('Cache-Control: max-age=0');
                //$objWriter->save('php://output');
                //die;
                $objWriter->save($filename);
                if (file_exists(public_path($filename))){
                    $message = "file generate successfully";
                    $data    = array("file_name"=> $filename );
                    return $this->sendResponse($data, $message);  
                } 
                else{
                    $message = "file not generated";
                    $data    = array("file_name"=>"");
                    return $this->sendResponse($data, $message);  
                }
            }else{
                $message  = "No record found";
                $data    = array("file_name"=>"");
                return $this->sendResponse($data, $message); 
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 17/08/2020
        Name   : importAmploQuestionBank
        Params :
        Type   : POST
        Purpose: To Import Amplo Question Bank
    */  
    public function importAmploQuestionBank( Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                'files'   => 'required',
                'files.*' => 'mimes:xls,xlsx'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $files = $request->file('files');
            $file_name  = time().'-'.$files->getClientOriginalName();
            $dirname    = "QuestionsBank";
            $destinationPath        = public_path('/'.$dirname);
            $destinationPathImport  = public_path('/'.$dirname.'/Import');
            $destinationPathArchive = public_path('/'.$dirname.'/Archive');
            if(! is_dir($destinationPath) && ! is_dir($destinationPathImport) && ! is_dir($destinationPathArchive)){
                mkdir($destinationPath, 0755,true);
                mkdir($destinationPathImport, 0755,true);
                mkdir($destinationPathArchive, 0755,true);
            }
            $files->move($destinationPathImport, $file_name);
            $source_file      =  $destinationPathImport.'/'.$file_name;
            $common_model     = new Common();
            $column_array     = $common_model->readQBXLSJsonRoot( $source_file );
            $questionBankJson = json_encode($column_array);
            
            $params_array = array(
                $questionBankJson,
                $this->user_data['UserID'],
                0,
                $file_name,
                $request['ImportedOn']

            );
            //echo "<pre>";print_r($column_array);echo "<br>";die;
            $data = DB::select(' EXEC Amplo.uspImportAmploQuestionBank ?,?,?,?,?',$params_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                rename($source_file, $destinationPathArchive.'/'. pathinfo($source_file, PATHINFO_BASENAME));
                $message = $data[0]->MessageName;
                $dataMsg = array("message"=>$message);
                return $this->sendResponse($data, $message);
            }else{
                $message = $data[0]->MessageName; 
                $dataMsg = array("message"=>$message);
            }
        }catch(\Exception $e){
           return $this->sendError($e->getMessage());
        }
    } 
    /*
        Author : Abdul
        Date   : 18/08/2020
        Name   : importClientQuestionBank
        Params :
        Type   : POST
        Purpose: To Import Client Question Bank
    */  
    public function importClientQuestionBank( Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                'files'   => 'required',
                'files.*' => 'mimes:xls,xlsx'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $files = $request->file('files');
            $file_name  = time().'-'.$files->getClientOriginalName();
            $dirname    = "QuestionsBank";
            $destinationPath        = public_path('/'.$dirname);
            $destinationPathImport  = public_path('/'.$dirname.'/Import');
            $destinationPathArchive = public_path('/'.$dirname.'/Archive');
            if(! is_dir($destinationPath) && ! is_dir($destinationPathImport) && ! is_dir($destinationPathArchive)){
                mkdir($destinationPath, 0755,true);
                mkdir($destinationPathImport, 0755,true);
                mkdir($destinationPathArchive, 0755,true);
            }
            $files->move($destinationPathImport, $file_name);
            $source_file      =  $destinationPathImport.'/'.$file_name;
            $common_model     = new Common();
            $column_array     = $common_model->readQBXLSJsonRoot( $source_file );
            $questionBankJson = json_encode($column_array);
            
            $params_array = array(
                $questionBankJson,
                $this->user_data['UserID'],
                0,
                $file_name,
                $request['ImportedOn']
            );
            $data = DB::select(' EXEC uspImportClientQuestionBank ?,?,?,?,?',$params_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                rename($source_file, $destinationPathArchive.'/'. pathinfo($source_file, PATHINFO_BASENAME));
                $message = $data[0]->MessageName;
                $dataMsg = array("message"=>$message);
                return $this->sendResponse($data, $message);
            }else{
                $message = $data[0]->MessageName; 
                $dataMsg = array("message"=>$message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 19/08/2020
        Name   : getAmploQuestionBankImport
        Params :
        Type   : GET
        Purpose: To Get Amplo Question Bank From Import
    */
    public function getAmploQuestionBankImport( Request $request, $batchId ){
        try{
            $params_array = array(
                $batchId
            );
            $data = DB::select(' EXEC Amplo.uspGetAmploQuestionBankImport ?', $params_array );
            if( count($data) > 0){
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
   
    /*
        Author : Abdul
        Date   : 19/08/2020
        Name   : getAmploQuestionsImport
        Params :
        Type   : GET
        Purpose: To Get Amplo Question From Import
    */
    public function getAmploQuestionsImport( Request $request, $questionBankId, $batchId ){
        try{
            $params_array = array(
                $questionBankId,
                $batchId
            );
            $data = DB::select(' EXEC Amplo.uspGetAmploQuestionsImport ?,?', $params_array );

            $data_array = array();
            $final_data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $data_array[$value->BMDomainImportId]["BMDomainImportId"] = $value->BMDomainImportId;
                    $data_array[$value->BMDomainImportId]["DomainName"]   = $value->DomainName;
                    
                    if($value->QuestionsImportId ==null || $value->QuestionsImportId==""){
                        $data_array[$value->BMDomainImportId]['questions'] = array();
                    }else{
                        $data_array[$value->BMDomainImportId]['questions'][$value->QuestionsImportId]["id"] = $value->QuestionsImportId;
                        $data_array[$value->BMDomainImportId]['questions'][$value->QuestionsImportId]["questionText"] = $value->QuestionText;
                        $data_array[$value->BMDomainImportId]['questions'][$value->QuestionsImportId]["StyleId"] = $value->StyleId;
                        $data_array[$value->BMDomainImportId]['questions'][$value->QuestionsImportId]["OrderOfQuestion"] = $value->OrderOfQuestion;

                        $data_array[$value->BMDomainImportId]["questions"][$value->QuestionsImportId]["response"][]=array("position"=>$value->Position,"responseText"=>$value->QuestionOptionText,"responseName"=>$value->QuestionOptionName,"ImagePath"=>$value->ImagePath);
                    }
                }
                
                $final_data_array = array_values($data_array);
                foreach ($final_data_array as $key => $value) {
                    $final_data_array[$key]['questions'] = array_values($value['questions']);
                }
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($final_data_array, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 19/08/2020
        Name   : getAmploDomainsImport
        Params :
        Type   : GET
        Purpose: To Get Amplo Domains From Import
    */
    public function getAmploDomainsImport( Request $request, $questionBankId ){
        try{
            $params_array = array(
                $questionBankId
            );
            $data = DB::select(' EXEC Amplo.uspGetAmploDomainsImport ?', $params_array );
            if( count($data) > 0){
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 19/08/2020
        Name   : getAmploQuestionsByDomainImport
        Params :
        Type   : GET
        Purpose: To Get Amplo Question By Domain From Import
    */
    public function getAmploQuestionsByDomainImport( Request $request, $domainId, $questionBankId, $batchId ){
        try{
            $params_array = array(
                $domainId,
                $questionBankId,
                $batchId
            );
            $data = DB::select(' EXEC Amplo.uspGetAmploQuestionsByDomainImport ?,?,?', $params_array );
            $data_array = array();
            $final_data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $data_array[$value->QuestionBankImportId]['questionsBankId']= $value->QuestionBankImportId;
                    $data_array[$value->QuestionBankImportId]['questionBankName']= $value->QuestionBankName;
                    $data_array[$value->QuestionBankImportId]['domainId']= $value->BMDomainImportId;
                    $data_array[$value->QuestionBankImportId]['domainName']= $value->DomainName;
                    if($value->QuestionsImportId==null || $value->QuestionsImportId==""){
                        $data_array[$value->QuestionBankImportId]['questions'] = array();
                    }else{
                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["id"] = $value->QuestionsImportId;
                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["questionText"] = $value->QuestionText;

                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["StyleId"] = $value->StyleId;
                         $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["StyleName"] = $value->StyleName;
                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["OrderOfQuestion"] = $value->OrderOfQuestion;
                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["IsAflyScoreEnabled"] = $value->IsAflyScoreEnabled;
                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["importance"] = $value->QuestionWeightage;
                        

                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["response"][] = array("position"=>$value->Position,"responseText"=>$value->QuestionOptionText,"responseName"=>$value->QuestionOptionName,"ImagePath"=>$value->ImagePath);
                    }
                }
                
                $final_data_array = array_values($data_array);
                foreach ($final_data_array as $key => $value) {
                    $final_data_array[$key]['questions'] = array_values($value['questions']);
                }
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($final_data_array, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 19/08/2020
        Name   : getAmploAttachmentImport
        Params :
        Type   : GET
        Purpose: To Get Amplo Question Attachment From Import
    */
    public function getAmploAttachmentImport( Request $request, $questionId ){
        try{
            $params_array = array(
                $questionId
            );
            $data = DB::select(' EXEC Amplo.uspGetAmploAttachmentImport ?', $params_array );
            $data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $data_array[$key]['AttachmentId'] = $value->AttachmentImportImportId;
                    $data_array[$key]['QuestionsId'] = $value->QuestionsImportId;
                    $data_array[$key]['AttachmentType'] = $value->AttachmentType;
                    $data_array[$key]['AttachmentPath'] = $value->AttachmentPath;
                    $data_array[$key]['AttachmentName'] = $value->AttachmentName;
                    $data_array[$key]['AttachmentNote'] = $value->AttachmentNote;
                    $data_array[$key]['ActiveFlag']     = isset($value->ActiveFlag)? $value->ActiveFlag: 0;
                    $data_array[$key]['CreatedBy']     = isset($value->CreatedBy)? $value->CreatedBy: 0;
                    $data_array[$key]['CreatedAt']     = isset($value->CreatedAt)? $value->CreatedAt: "";
                    $data_array[$key]['ModifiedBy']     = isset($value->ModifiedBy)? $value->ModifiedBy: "";
                    $data_array[$key]['ModifiedAt']     = isset($value->ModifiedAt)? $value->ModifiedAt: "";
                    $data_array[$key]['BatchId']     = $value->BatchId;
                }
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($data_array, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Kapi
        Date   : 19/08/2020
        Name   : getAmploQuestionBankImport
        Params :
        Type   : GET
        Purpose: To Get Client Question Bank From Import
    */
    public function getClientQuestionBankImport(Request $request, $batchId){
        try {
            $userId = $this->user_data['UserID'];

            $params_array = [
                $userId,
                0,
                $batchId
            ];
            $data = DB::select(' EXEC uspGetClientQuestionBankImport ?,?,?', $params_array);
            if( count($data) > 0){
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($data, $message);
        } catch (\Exception $e) {
           return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 19/08/2020
        Name   : getClientQuestionsImport
        Params :
        Type   : GET
        Purpose: To Get Client Question From Import
    */
    public function getClientQuestionsImport(Request $request,$questionBankId, $batchId){
        try {

            $params_array = [
                $questionBankId,
                $batchId
            ];
            $data = DB::select(' EXEC uspGetClientQuestionsImport ?,?', $params_array);
            //  echo "<pre>";print_r($data);echo "<br>";die;
            $data_array = array();
            $final_data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                $data_array[$value->BMDomainImportId]["BMDomainImportId"] = $value->BMDomainImportId;
                $data_array[$value->BMDomainImportId]["DomainName"]   = $value->DomainName;

                if($value->QuestionsImportId ==null || $value->QuestionsImportId==""){
                        $data_array[$value->BMDomainImportId]['questions'] = array();
                }else{
                    $data_array[$value->BMDomainImportId]['questions'][$value->QuestionsImportId]["id"] = $value->QuestionsImportId;
                        $data_array[$value->BMDomainImportId]['questions'][$value->QuestionsImportId]["questionText"] = $value->QuestionText;
                        $data_array[$value->BMDomainImportId]['questions'][$value->QuestionsImportId]["StyleId"] = $value->StyleId;
                        $data_array[$value->BMDomainImportId]['questions'][$value->QuestionsImportId]["StyleName"] = $value->StyleName;
                        $data_array[$value->BMDomainImportId]['questions'][$value->QuestionsImportId]["OrderOfQuestion"] = $value->OrderOfQuestion;

                        $data_array[$value->BMDomainImportId]["questions"][$value->QuestionsImportId]["response"][]=array("position"=>$value->Position,"responseText"=>$value->QuestionOptionText,"responseName"=>$value->QuestionOptionName,"ImagePath"=>$value->ImagePath);
                    }
                }
                $final_data_array = array_values($data_array);
                foreach ($final_data_array as $key => $value) {
                    $final_data_array[$key]['questions'] = array_values($value['questions']);
                }
                $message = "Data retrieved successfully";
            }else{
                $message = "No record found";
            }
             return $this->sendResponse($final_data_array, $message);
        } catch (\Exception $e) {
           return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Kapil
        Date   : 19/08/2020
        Name   : getClientDomainsImport
        Params :
        Type   : GET
        Purpose: To Get Client Domains From Import
    */
    public function getClientDomainsImport(Request $request, $questionBankId){
        try {

            $params_array = [
                $questionBankId,
            ];

            $data = DB::select(' EXEC uspGetClientDomainsImport ?', $params_array);
            if( count($data) > 0){
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($data, $message);
        } catch (\Exception $e) {
           return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Kapil
        Date   : 19/08/2020
        Name   : getClientQuestionsByDomainImport
        Params :
        Type   : GET
        Purpose: To Get Client Question By Domain From Import
    */
    public function getClientQuestionsByDomainImport(Request $request, $domainId, $questionBankId, $batchId){
        try {

            $params_array = [
                $domainId,
                $questionBankId,
                $batchId
            ];

            $data = DB::select(' EXEC uspGetClientQuestionsByDomainImport ?,?,?', $params_array);
            // print_r($data);die;
            $data_array = array();
            $final_data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $data_array[$value->QuestionBankImportId]['questionBankImportId']  = $value->QuestionBankImportId;
                    $data_array[$value->QuestionBankImportId]['questionBankName'] = $value->QuestionBankName;
                    $data_array[$value->QuestionBankImportId]['domainId']         = $value->BMDomainImportId;
                    $data_array[$value->QuestionBankImportId]['domainName']       = $value->DomainName;
                    
                    if($value->QuestionsImportId==null || $value->QuestionsImportId==""){
                         $data_array[$value->QuestionBankImportId]['questions'] = array();
                    }else{
                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["id"] = $value->QuestionsImportId;
                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["questionText"] = $value->QuestionText;
                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["StyleId"] = $value->StyleId;
                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["StyleName"] = $value->StyleName;
                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["OrderOfQuestion"] = $value->OrderOfQuestion;
                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["IsAflyScoreEnabled"] = $value->IsAflyScoreEnabled;
                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["importance"] = $value->QuestionWeightage;
                        
                        $data_array[$value->QuestionBankImportId]['questions'][$value->QuestionsImportId]["response"][] = array("position"=>$value->Position,"responseText"=>$value->QuestionOptionText,"responseName"=>$value->QuestionOptionName,"ImagePath"=>$value->ImagePath);
                    }
                }

                $final_data_array = array_values($data_array);
                foreach ($final_data_array as $key => $value) {
                    $final_data_array[$key]['questions'] = array_values($value['questions']);
                }
                $message = "Data retrieved successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($final_data_array, $message);
        } catch (\Exception $e) {
           return $this->sendError($e->getMessage());
        }
    }
     /*
        Author : Kapi;
        Date   : 19/08/2020
        Name   : getClientAttachmentImport
        Params :
        Type   : GET
        Purpose: To Get Client Question Attachment From Import
    */
    public function getClientAttachmentImport(Request $request, $questionsId){
        try {

            $params_array = [
                $questionsId
            ];

            $data = DB::select(' EXEC uspGetClientAttachmentImport ?', $params_array);
            $data_array = array();
            if( count($data) > 0){

                foreach ($data as $key => $value) {
                    $data_array[$key]['AttachmentId'] = $value->AttachmentImportImportId;
                    $data_array[$key]['QuestionsId'] = $value->QuestionsImportId;
                    $data_array[$key]['AttachmentType'] = $value->AttachmentType;
                    $data_array[$key]['AttachmentPath'] = $value->AttachmentPath;
                    $data_array[$key]['AttachmentName'] = $value->AttachmentName;
                    $data_array[$key]['AttachmentNote'] = $value->AttachmentNote;
                    $data_array[$key]['ActiveFlag']     = isset($value->ActiveFlag)? $value->ActiveFlag: 0;
                    $data_array[$key]['CreatedBy']     = isset($value->CreatedBy)? $value->CreatedBy: 0;
                    $data_array[$key]['CreatedAt']     = isset($value->CreatedAt)? $value->CreatedAt: "";
                    $data_array[$key]['ModifiedBy']     = isset($value->ModifiedBy)? $value->ModifiedBy: "";
                    $data_array[$key]['ModifiedAt']     = isset($value->ModifiedAt)? $value->ModifiedAt: "";
                    $data_array[$key]['BatchId']     = $value->BatchId;
                }
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($data_array, $message);
        } catch (\Exception $e) {
           return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 22/10/2020
        Name   : getAmploClientQuestionBank
        Params :
        Type   : GET
        Purpose: To Get Amplo Client Question Bank
    */
    public function getAmploClientQuestionBank(Request $request){
        try{
            $params_array = array(
                $this->user_data['UserID'],
                0
            );
            $data = DB::select(' EXEC Amplo.uspGetAmploClientQuestionBank ?,?',$params_array);
            if( count($data) > 0){
                $message = "Question bank retrieved";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch( \Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    public function SaveClientDomainForProject(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                //'questionsBankId'  => 'required',
                //'DomainId' => 'required'
                'DomainName' => 'required'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $request['BenchmarkProjectId'],
                $request['DomainId'],
                $request['DomainName'],
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC uspSaveClientDomainForProject ?,?,?,?',$param_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success) && ($data[0]->Success == false || $data[0]->Success ===0)){
                $message =$data[0]->MessageName; 
                return $this->sendError($message);
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }  
  
    

    public function DeleteClientDomainForProject (Request $request,$projectId,$DomainId){
        try{
           
            $requestData = $request->all();
            $params_array = array(
                $projectId,
                $DomainId,
                $this->user_data['UserID']          
            );
            $data = DB::select('EXEC uspDeleteClientDomainForProject ?,?,?', $params_array);

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 
    public function getQBDomainsForEdit(Request $request, $BenchmarkProjectId ){
        try{
            $requestData = $request->all();
            $params_array= array(
               $this->user_data['UserID'],
               $BenchmarkProjectId,
               0
            );
            $data = DB::select('EXEC uspGetQBDomainsForEdit ?,?,?',$params_array);
            if( count($data) > 0){
                $message = "QB retrieved successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 
   
    public function getClientBenchmarkQuestionsAnswers(Request $request,$DomainId, $QuestionBankId){
        try{
            $params = array(
               $DomainId,
               $QuestionBankId,
               $this->user_data['UserID'],
            );
            $data = DB::select('EXEC uspGetBenchmarkClientQuestionsByDomain ?,?,?',$params);
            $data_array = array();
            $final_data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    if($value->QuestionBankId==null || $value->QuestionBankId==""){
                         $data_array[$value->QuestionBankId]['questions'] = array();
                    }else{
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionBankId]["QuestionId"] = $value->QuestionBankId;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionBankId]["questionText"] = $value->QuestionText;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionBankId]["StyleId"] = $value->StyleId;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionBankId]["OrderOfQuestion"] = $value->OrderOfQuestion;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionBankId]["IsAFlyScoreEnabled"] = $value->IsAFlyScoreEnabled;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionBankId]["importance"] = $value->QuestionWeightage;
                        $data_array[$value->QuestionBankId]['questions'][$value->QuestionBankId]["IsDropDownScoringEnabled"] = $value->IsDropdownScoringEnabled;
                        
                       $data_array[$value->QuestionBankId]['questions'][$value->QuestionBankId]["response"][] = array("QuestionOptionId"=>$value->BenchmarkQuestionOptionID,"position"=>$value->Position,"responseText"=>$value->QuestionOptionText,"responseName"=>$value->QuestionOptionName,"ImagePath"=>$value->ImagePath);
                    }
                }

                $final_data_array = array_values($data_array);
                foreach ($final_data_array as $key => $value) {
                    $final_data_array[$key]['questions'] = array_values($value['questions']);
                }
                $message = "Questions answers retrieved successfully";
            } else{
                $message = "No record found";
            }
            return $this->sendResponse($final_data_array, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    public function SaveClientBenchMarkQuestionAnswers(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'projectId'  => 'required|numeric',
                'projectName' => 'required',
                'domainId'         => 'required|numeric',
                'domainName'       => 'required',
                'questions'        => 'required|array|min:1',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $this->user_data['UserID'],
                json_encode($request->all())
            );
            $data = DB::select('EXEC uspSaveClientBenchMarkQuesionAnswers ?,?',$param_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)&& ($data[0]->Success == false || $data[0]->Success ===0)){
                $message =$data[0]->MessageName; 
                return $this->sendError($message);
            }
            return $this->sendResponse($data, $message);
            
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    public function DeleteBenchMarkQuestionAnswers (Request $request,$projectId,$domainId,$BenchmarkQuestionID ){
        try{
           
            $requestData = $request->all();
            $params_array = array(
                $projectId,
                $domainId,
                $BenchmarkQuestionID,
                $this->user_data['UserID']          
            );
            $data = DB::select('EXEC uspDeleteBenchMarkQuestionAnswers ?,?,?,?', $params_array);

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }     

    
    public function UpdateAFlyScoreOfBenchMarkQuestion (Request $request, $BenchmarkQuestionID,$IsAFlyScoreEnabled){
        try{
           
            $requestData = $request->all();
            $params_array = array(
                $BenchmarkQuestionID,
                $IsAFlyScoreEnabled,
                $this->user_data['UserID']          
            );
            $data = DB::select('EXEC uspUpdatingAFlyScore ?,?,?', $params_array);

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 

    public function getClientBenchmarkResponses(Request $request,$ProjectId){
        try{
            $params = array(
                $ProjectId,
               $this->user_data['UserID'],
            );
            $data = DB::select('EXEC uspGetResponseByProjectId ?,?',$params);
           
        $sorted_data=new stdClass;
        
        if($data){
            $sorted_data->ProjectName = $data[0]->BenchmarkProjectName;
               $sorted_data->ProjectId = $data[0]->BenchmarkProjectID;
               $sorted_data->EntreprenuerName = $data[0]->EntreprenuerName;
               $sorted_data->CompanyName = $data[0]->CompanyName;
               $sorted_data->domain_with_questions=array();
               $count=1;
               foreach($data as $k => $value){
                   $index=NULL;
                   for ($x = 0; $x <= count($sorted_data->domain_with_questions); $x++) {
                       if(isset($sorted_data->domain_with_questions[$x]->DomainId))
                       {
                           if($sorted_data->domain_with_questions[$x]->DomainId==$value->DomainID)
                           {
                               $index=$x;
                             
                           }
                       }
                   }
               
               if($index!==NULL || $index===0)
               {
                   $obj=new stdClass;
                   $obj->question_serial_no=$count;
                   $obj->question_id=$value->BenchmarkQuestionID;
                   $obj->question_text=$value->Question;
                   $obj->response=$value->Response;
                   $obj->response_text=$value->ResponseText;
                   array_push($sorted_data->domain_with_questions[$index]->Questions,$obj);
               }
               else if($index=== NULL)
               {
                   $obj=new stdClass;
                   $obj->DomainId=$value->DomainID;
                   $obj->domain_name=$value->DomainName;
                   $obj->Questions=array();
                   $sub_obj=new stdClass;
                   $sub_obj->question_serial_no=$count;
                   $sub_obj->question_id=$value->BenchmarkQuestionID;
                   $sub_obj->question_text=$value->Question;
                   $sub_obj->response=$value->Response;
                   $sub_obj->response_text=$value->ResponseText;
                   array_push($obj->Questions,$sub_obj);
                   array_push($sorted_data->domain_with_questions,$obj);
               }
               $count++;
           
           }  
                   $message = "Client Responses  retrieved successfully";
               } else{
                   $sorted_data = (Object)[];
                   $message = 'data not found';
               }
               return $this->sendResponse($sorted_data, $message);
           }catch(\Exception $e){
               return $this->sendError($e->getMessage());
   
           }
       }  
     
    public function getClientPerformanceSummary(Request $request,$ProjectId){
        try{
            $params = array(
                $ProjectId,
               $this->user_data['UserID'],
            );
            $data = DB::select('EXEC uspGetPerformanceSummary ?,?',$params);
          
           $sorted_data = array();
           if($data){
            foreach($data as $k => $value){
                $sorted_data['ProjectName'] = $value->BenchmarkProjectName;
                $sorted_data['ProjectId'] = $value->BenchmarkProjectID;
                $sorted_data['EntreprenuerName'] = $value->EntreprenuerName;
                $sorted_data['CompanyName'] = $value->CompanyName;
                $sorted_data['OverallScore'] = $value->OverallScore1;
                $sorted_data['Domain'][$k]['DomainId']=$value->DomainID;
                $sorted_data['Domain'][$k]['DomainName'] = $value->DomainName;             
               $sorted_data['Domain'][$k]['ThisScore']['Total'] = $value->TotalScore;
               $sorted_data['Domain'][$k]['ThisScore']['Score'] = $value->DomainScore;
            }
            $message = "Client Performance Summary   retrieved successfully";
        } else{
            $sorted_data = (Object)[];
            $message = 'data not found';
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
}  
public function getClientKPIDashBoard(Request $request,$ProjectId,$FinancialYear){
    try{
        $params = array(
            $ProjectId,
            $FinancialYear,
           $this->user_data['UserID'],
        );
       $data = DB::select('EXEC uspGetKPIDashboard  ?,?,?',$params);
       
       $sorted_data = array();
       if($data){
        foreach($data as $k => $value){
            $sorted_data['ProjectName'] = $value->ProjectName;
            $sorted_data['ProjectId'] = $value->ProjectId;
            $sorted_data['EntreprenuerName'] = $value->EntreprenuerName;
            $sorted_data['CompanyName'] = $value->CompanyName;
            $sorted_data[$value->PropertyName]['Title'] = $value->Title;
            $sorted_data[$value->PropertyName]['Value'] = $value->Value;
            $sorted_data[$value->PropertyName]['ValuePercent'] = $value->ValuePercent;
            $sorted_data[$value->PropertyName]['Color'] = $value->Color;
            $sorted_data[$value->PropertyName]['BenchmarkPercent'] = $value->BenchmarkPercent;
            $sorted_data[$value->PropertyName]['BenchmarkValue'] = $value->BenchmarkValue;
          
        }
        $message = "Client KPIDash Board Assessment data  retrieved successfully";
    } else{
       // $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}
}  
public function getClientStrategyAssessment(Request $request,$ProjectId){
    try{
        $params = array(
            $ProjectId,
           $this->user_data['UserID'],
        );
      $data = DB::select('EXEC uspGetStrategyAssessment ?,?',$params);
          
   
      
      $sorted_data = array();
       if($data){
        foreach($data as $k => $value){
            $sorted_data['ProjectName'] = $value->ProjectName;
            $sorted_data['ProjectId'] = $value->ProjectId;
            $sorted_data['EntreprenuerName'] = $value->EntreprenuerName;
            $sorted_data['CompanyName'] = $value->CompanyName;
            $sorted_data[$value->PropertyName]['Title'] = $value->Title;
            $sorted_data[$value->PropertyName]['ValuePercent'] = $value->ValuePercent;
            $sorted_data[$value->PropertyName]['Color'] = $value->Color;
            $sorted_data[$value->PropertyName]['BenchmarkPercent'] = $value->BenchmarkPercent;
            $sorted_data[$value->PropertyName]['Observation'] = $value->ObsTilte;
            $sorted_data[$value->PropertyName]['ObservationData'] = $value->ObsData;
            $sorted_data[$value->PropertyName]['Report'] = $value->TitleData;
        }
        $message = "Client StrategyAssessment data  retrieved successfully";
    } else{
       $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}
}  
public function getClientStrategyAssessmentDetailsData(Request $request,$ProjectId){
    try{
        $params = array(
            $ProjectId,
           $this->user_data['UserID'],
        );
       $data = DB::select('EXEC getClientStrategyAssessmentDetails ?,?',$params);
       
       $sorted_data = array();
       if($data){
        foreach($data as $k => $value){
            $sorted_data['ProjectName'] = $value->ProjectName;
            $sorted_data['ProjectId'] = $value->ProjectId;
            $sorted_data['EntreprenuerName'] = $value->EntreprenuerName;
            $sorted_data['CompanyName'] = $value->CompanyName;
            $sorted_data[$value->PropertyName]['Parameter'] = $value->Title;
            $sorted_data[$value->PropertyName]['Observation'] = $value->Observations;
            $sorted_data[$value->PropertyName]['Value'] = $value->Value;
            $sorted_data[$value->PropertyName]['ValuePercent'] = $value->ValuePercent;
            $sorted_data[$value->PropertyName]['Color'] = $value->Color;
            $sorted_data[$value->PropertyName]['Observations'] = $value->ObsData;
            $sorted_data[$value->PropertyName]['Parameter1'] = $value->Parameter1;
            $sorted_data[$value->PropertyName]['Parameter2'] = $value->Parameter2;
            $sorted_data[$value->PropertyName]['Parameter3'] = $value->Parameter3;
        }
        $message = "Client StrategyAssessment Details  retrieved successfully";
    } else{
       // $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}
}  
public function getClientStrategyAssessmentReport(Request $request,$ProjectId){
    try{
        $params = array(
            $ProjectId,
           $this->user_data['UserID'],
        );
       $data = DB::select('EXEC getClientStrategyAssessmentData ?,?',$params);
       
       $sorted_data = array();
       if($data){
        foreach($data as $k => $value){
            $sorted_data['ProjectName'] = $value->ProjectName;
            $sorted_data['ProjectId'] = $value->ProjectId;
            $sorted_data['EntreprenuerName'] = $value->EntreprenuerName;
            $sorted_data['CompanyName'] = $value->CompanyName;
            $sorted_data[$value->PropertyName]['Title'] = $value->Title;
            $sorted_data[$value->PropertyName]['Value'] = $value->Value;
            $sorted_data[$value->PropertyName]['CommentaryObservations'] = $value->ComentaryObservations;
            $sorted_data[$value->PropertyName]['Observations'] = $value->Observations;
            $sorted_data[$value->PropertyName]['Color'] = $value->Color;
            $sorted_data[$value->PropertyName]['Parameter1'] = $value->Parameter1;
            $sorted_data[$value->PropertyName]['Parameter2'] = $value->Parameter2;
            $sorted_data[$value->PropertyName]['Parameter3'] = $value->Parameter3;
        }
        $message = "Client StrategyAssessment Report   retrieved successfully";
    } else{
       // $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}
}  
public function getClientRevenueGrowthManagement(Request $request,$ProjectId,$FinancialYear){
    try{
        $params = array(
            $ProjectId,
           $this->user_data['UserID'],
           $FinancialYear
        );
       $data = DB::select('EXEC uspGetRevenueGrowthMangement ?,?,?',$params);
       
      
       $sorted_data = array();
       if($data){
        foreach($data as $k => $value){
            $sorted_data['ProjectName'] = $value->ProjectName;
            $sorted_data['ProjectId'] = $value->ProjectId;
            $sorted_data['EntreprenuerName'] = $value->EntreprenuerName;
            $sorted_data['CompanyName'] = $value->CompanyName;
            $sorted_data[$value->PropertyName]['Title'] = $value->Title;
            $sorted_data[$value->PropertyName]['Value'] = $value->Value;
            $sorted_data[$value->PropertyName]['ValuePercent'] = $value->ValuePercent;
            $sorted_data[$value->PropertyName]['Color'] = $value->Color;
            $sorted_data[$value->PropertyName]['BenchmarkPercent'] = $value->BenchmarkPercent;
            $sorted_data[$value->PropertyName]['BenchmarkValue'] = $value->BenchmarkValue;
            $sorted_data[$value->PropertyName]['Parameter'] = $value->Parameter;
            $sorted_data[$value->PropertyName]['KeyObservations'] = $value->KeyObseravtions;
        }
        $message = "Client Revenue Growth Management data   retrieved successfully";
    } else{
       // $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}
}  
public function getClientRevenueGrowthManagementDetailsData(Request $request,$ProjectId,$FinancialYear){
    try{
        $params = array(
            $ProjectId,
           $this->user_data['UserID'],
           $FinancialYear
        );
       $data = DB::select('EXEC uspGetRevenueGrowthManagementDetails ?,?,?',$params);         
             
      
      $sorted_data = array();
       if($data){
        foreach($data as $k => $value){
            $sorted_data['ProjectName'] = $value->ProjectName;
            $sorted_data['ProjectId'] = $value->ProjectId;
            $sorted_data['EntreprenuerName'] = $value->EntreprenuerName;
            $sorted_data['CompanyName'] = $value->CompanyName;
            $sorted_data[$value->PropertyName]['Title'] = $value->Title;
            $sorted_data[$value->PropertyName]['KPI'] = $value->KPI;
            $sorted_data[$value->PropertyName]['KeyObservations'] = $value->Observations;
            $sorted_data[$value->PropertyName]['RevenueTrend'] = $value->RevTrend;
            
        }
        $message = "Client Revenue Growth Management Details   retrieved successfully";
    } else{
       // $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}
}
public function getClientRevenueGrowthManagementReport(Request $request,$ProjectId,$FinancialYear){
    try{
        $params = array(
            $ProjectId,
           $this->user_data['UserID'],
           $FinancialYear
        );
        $data = DB::select('EXEC uspGetRevenueGrowthMangementData ?,?,?',$params);
       
      $sorted_data = array();
       if($data){
        foreach($data as $k => $value){
           $sorted_data['ProjectName'] = $value->ProjectName;
            $sorted_data['ProjectId'] = $value->ProjectId;
            $sorted_data['EntreprenuerName'] = $value->EntreprenuerName;
            $sorted_data['CompanyName'] = $value->CompanyName;
            $sorted_data[$value->PropertyName]['Title'] = $value->Title;
            $sorted_data[$value->PropertyName]['RevenueTrend'] = $value->RevTrend;
            $sorted_data[$value->PropertyName]['ChallengesAndAdvantages'] = $value->ChallengesAndAdvantages;
            $sorted_data[$value->PropertyName]['GrowthDimension'] = $value->GrowthDimension;
            $sorted_data[$value->PropertyName]['Description'] = $value->DescriptionData;
            
        }
        $message = "Client Revenue Growth Management Report   retrieved successfully";
    } else{
        $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}
}  
public function getClientOpertaionManagement(Request $request,$ProjectId){
    try{
        $params = array(
            $ProjectId,
           $this->user_data['UserID'],
        );
       $data = DB::select('EXEC uspGetOperationsManagementReport ?,?',$params);
       
             
      
       $sorted_data = array();
       if($data){
        foreach($data as $k => $value){
            $sorted_data['ProjectName'] = $value->ProjectName;
             $sorted_data['ProjectId'] = $value->ProjectId;
             $sorted_data['EntreprenuerName'] = $value->EntreprenuerName;
             $sorted_data['CompanyName'] = $value->CompanyName;
             $sorted_data[$value->PropertyName]['Title'] = $value->Title;
             $sorted_data[$value->PropertyName]['Value'] = $value->Value;
             $sorted_data[$value->PropertyName]['ValuePercent'] = $value->ValuePercent;
             $sorted_data[$value->PropertyName]['Color'] = $value->Color;
             $sorted_data[$value->PropertyName]['BenchmarkPercent'] = $value->BenchmarkPercent;
             $sorted_data[$value->PropertyName]['BenchmarkValue'] = $value->BenchmarkValue;
             $sorted_data[$value->PropertyName]['Parameter'] = $value->Parameter;
             $sorted_data[$value->PropertyName]['KeyObservations'] = $value->KeyObseravtions;
             
         }
        $message = "Client Operation  Management data   retrieved successfully";
    } else{
        $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}
}  
public function getClientPeopleManagement(Request $request,$ProjectId){
    try{
        $params = array(
            $ProjectId,
           $this->user_data['UserID'],
        );
       $data = DB::select('EXEC uspGetPeopleManagementReport ?,?',$params);
       
      
       $sorted_data = array();
       if($data){
        foreach($data as $k => $value){
            $sorted_data['ProjectName'] = $value->ProjectName;
            $sorted_data['ProjectId'] = $value->ProjectId;
            $sorted_data['EntreprenuerName'] = $value->EntreprenuerName;
            $sorted_data['CompanyName'] = $value->CompanyName;
            $sorted_data[$value->PropertyName]['Title'] = $value->Title;
            $sorted_data[$value->PropertyName]['Value'] = $value->Value;
            $sorted_data[$value->PropertyName]['ValuePercent'] = $value->ValuePercent;
            $sorted_data[$value->PropertyName]['Color'] = $value->Color;
            $sorted_data[$value->PropertyName]['BenchmarkPercent'] = $value->BenchmarkPercent;
            $sorted_data[$value->PropertyName]['BenchmarkValue'] = $value->BenchmarkValue;
            $sorted_data[$value->PropertyName]['Parameter'] = $value->Parameter;
            $sorted_data[$value->PropertyName]['KeyObservations'] = $value->KeyObseravtions;
        }
        $message = "Client People  Management data   retrieved successfully";
    } else{
       $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}
}  
public function getClientDigitalAdoptation(Request $request,$ProjectId){
    try{
        $params = array(
            $ProjectId,
           $this->user_data['UserID'],
        );
        $data = DB::select('EXEC uspGetDigitalAdoptationReport ?,?',$params);
       
      
      $sorted_data = array();
       if($data){
        foreach($data as $k => $value){
            $sorted_data['ProjectName'] = $value->ProjectName;
            $sorted_data['ProjectId'] = $value->ProjectId;
            $sorted_data['EntreprenuerName'] = $value->EntreprenuerName;
            $sorted_data['CompanyName'] = $value->CompanyName;
            $sorted_data[$value->PropertyName]['Title'] = $value->Title;
            $sorted_data[$value->PropertyName]['Value'] = $value->Value;
            $sorted_data[$value->PropertyName]['ValuePercent'] = $value->ValuePercent;
            $sorted_data[$value->PropertyName]['Color'] = $value->Color;
            $sorted_data[$value->PropertyName]['BenchmarkPercent'] = $value->BenchmarkPercent;
            $sorted_data[$value->PropertyName]['BenchmarkValue'] = $value->BenchmarkValue;
            $sorted_data[$value->PropertyName]['Parameter'] = $value->Parameter;
            $sorted_data[$value->PropertyName]['KeyObservations'] = $value->KeyObseravtions;
        }
        $message = "Client Digital Adoptation data   retrieved successfully";
    } else{
        $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}
}  

public function getClientTransformationProject(Request $request,$ProjectId){
    try{
        $params = array(
            $ProjectId,
           $this->user_data['UserID'],
        );
        $data = DB::select('EXEC uspTransformationsProjectReport ?,?',$params);
       
      
      $sorted_data = array();
       if($data){
       foreach($data as $k => $value){
            $sorted_data['ProjectName'] = $value->ProjectName;
            $sorted_data['ProjectId'] = $value->ProjectId;
            $sorted_data['EntreprenuerName'] = $value->EntreprenuerName;
            $sorted_data['CompanyName'] = $value->CompanyName;
            $sorted_data[$value->PropertyName]['ProjectTitle']= $value->TitleProject;
            $sorted_data[$value->PropertyName]['ProjectDescription'] = $value->ProjectDescription;
            $sorted_data[$value->PropertyName]['ProjectArea'] = $value->ProjectArea;
            $sorted_data[$value->PropertyName]['TotalLink'] = $value->TotalLink;
            
        }
        $message = "Client Transformation Project Report   retrieved successfully";
    } else{
        $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}
}  
public function SaveUpdateKPIDashBoardDetail(Request $request){
    try{
        $validator = Validator::make($request->all(), [
          //  'BenchmarkProjectId'=>'required'
            
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Errors',$validator->errors());
        }
        $param_array = array(
            $this->user_data['UserID'],
            json_encode($request->all())
        );
        $data = DB::select('EXEC uspSaveUpdateKPIDashBoardDetails ?,?',$param_array);
        if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
           $message = $data[0]->MessageName;
           return $this->sendResponse($data[0], $message);
        }else if(isset($data[0]->Success)&& ($data[0]->Success == false || $data[0]->Success ===0)){
            $message =$data[0]->MessageName; 
            return $this->sendError($message);
        }
        return $this->sendResponse($data, $message);
        
    }catch(\ Exception $e){
        return $this->sendError($e->getMessage());
    }
}
public function getActionListForQuestion(Request $request){
    try{
        $params = array(
            
           $this->user_data['UserID'],
          
        );
        $data = DB::select('EXEC uspGetActionListForQuestion ?',$params);
       
      
      $sorted_data = array();
       if($data){
       foreach($data as $k => $value){
            
            $sorted_data[$value->Value]['ID'] = $value->Id;
            $sorted_data[$value->Value]['Value'] = $value->Value;
            $sorted_data[$value->Value]['Text'] = $value->Text;
            
        }
        $message = "Action List for Questions   retrieved successfully";
    } else{
        $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}
}  
public function getListOfQuestionDomainWise(Request $request,$DomainId,$CurrentBenchmarkQuestionId,$BenchmarkQuestionOptionId,$CallFrom,$QuestionBankId ){
    try{
        $params = array(
            $DomainId,
            $CurrentBenchmarkQuestionId,
            $BenchmarkQuestionOptionId ,
            $UserID =$this->user_data['UserID'],
            $CallFrom,
            $QuestionBankId,


        );
        $data = DB::select('EXEC ListOfQuestionDomainwise ?,?,?,?,?,?',$params);
      
        $sorted_data = array();
       if($data){
       foreach($data as $k => $value){
            $sorted_data[$k]["QuestionId"] = $value->QuestionId;
            $sorted_data[$k]["questionText"] = $value->QuestionText;
            $sorted_data[$k]["IsChecked"] = $value->IsChecked;      
           
        }
        $message = "List Of Question Domainwise    retrieved successfully";
    } else{
        $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}
} 
public function InsertUpdateSkipQuestion(Request $request){
    try{
        $validator = Validator::make($request->all(), [
          //  'BenchmarkProjectId'=>'required'
            
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Errors',$validator->errors());
        }
        $param_array = array(
            //$CalledFrom,
            $this->user_data['UserID'],
            json_encode($request->all())
        );
        $data = DB::select('EXEC upsInsertUpdateSkipQuestion ?,?',$param_array);
        if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
           $message = $data[0]->MessageName;
           return $this->sendResponse($data[0], $message);
        }else if(isset($data[0]->Success)&& ($data[0]->Success == false || $data[0]->Success ===0)){
            $message =$data[0]->MessageName; 
            return $this->sendError($message);
        }
        return $this->sendResponse($data, $message);
        
    }catch(\ Exception $e){
        return $this->sendError($e->getMessage());
    }
}
public function GetWeightageforScoringMechanisms(Request $request,$DecompositionProjectID,$DecompositionProcessLevel1ID){
    try{
        $params = array(
            
            $DecompositionProjectID,
            $DecompositionProcessLevel1ID,
            $UserID =$this->user_data['UserID']

        );
        $data = DB::select('EXEC GetWeightageforScoringMechanisms ?,?,?',$params);
      
        $sorted_data = array();
       if($data){
       foreach($data as $k => $value){
            $sorted_data[$k]["DecompositionScoreCriteriaID"] = $value->DecompositionScoreCriteriaID;
            $sorted_data[$k]["ScoreCriteriaTitle"] = $value->ScoreCriteriaTitle;
            $sorted_data[$k]["ScoreCriteriaName"] = $value->ScoreCriteriaName;
            $sorted_data[$k]["Weightage"] = $value->Weightage;     
           
        }
        $message = "Weight for Scoring Mechanism Retrieved Successfully";
    } else{
        $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}

}
public function GetWeightageforPriority(Request $request,$DecompositionProjectID,$DecompositionProcessLevel1ID){
    try{
        $params = array(
            
            $DecompositionProjectID,
            $DecompositionProcessLevel1ID,
            $UserID =$this->user_data['UserID']

        );
        $data = DB::select('EXEC UspGetWeightageforPriority  ?,?,?',$params);
      
        $sorted_data = array();
       if($data){
        foreach($data as $k => $value){
            $sorted_data[$k]["ID"] = $value->ID;
            $sorted_data[$k]["Priority"] = $value->Priority;
            $sorted_data[$k]["Weightage"] = $value->Weightage;
           
        }
        $message = "Weight for Scoring Mechanism Retrieved Successfully";
    } else{
        $sorted_data = (Object)[];
        $message = 'data not found';
    }
    return $this->sendResponse($sorted_data, $message);
}catch(\Exception $e){
    return $this->sendError($e->getMessage());
}

}

public function SaveUpdateWeightageforScoringMechanisms(Request $request){
    try{
        $validator = Validator::make($request->all(), [
          //  'BenchmarkProjectId'=>'required'
            
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Errors',$validator->errors());
        }
        $param_array = array(
            $this->user_data['UserID'],
            json_encode($request->all())
        );
        $data = DB::select('EXEC uspSaveWeightageforScoringMechanisms ?,?',$param_array);
        if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
           $message = $data[0]->MessageName;
           return $this->sendResponse($data[0], $message);
        }else if(isset($data[0]->Success)&& ($data[0]->Success == false || $data[0]->Success ===0)){
            $message =$data[0]->MessageName; 
            return $this->sendError($message);
        }
        return $this->sendResponse($data, $message);
        
    }catch(\ Exception $e){
        return $this->sendError($e->getMessage());
    }
}
public function SaveUpdateWeightageforPriority(Request $request){
    try{
        $validator = Validator::make($request->all(), [
          //  'BenchmarkProjectId'=>'required'
            
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Errors',$validator->errors());
        }
        $param_array = array(
            $this->user_data['UserID'],
            json_encode($request->all())
        );
        $data = DB::select('EXEC uspSaveUpdateWeightageforPriority ?,?',$param_array);
        if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
           $message = $data[0]->MessageName;
           return $this->sendResponse($data[0], $message);
        }else if(isset($data[0]->Success)&& ($data[0]->Success == false || $data[0]->Success ===0)){
            $message =$data[0]->MessageName; 
            return $this->sendError($message);
        }
        return $this->sendResponse($data, $message);
        
    }catch(\ Exception $e){
        return $this->sendError($e->getMessage());
    }
}

}
