<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
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

class BenchmarkQuestionsBankImportController extends BaseController
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
        Date   : 20/08/2020
        Name   : saveAmploQuestionBankImport
        Params :
        Type   : POST
        Purpose: To Save Amplo Question Bank Import
    */
    public function saveAmploQuestionBankImport(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'QuestionBankId'  => "required|numeric",
                'QuestionBankName' => "required|between:2,40"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $request['QuestionBankId'],
                $request['QuestionBankName'],
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC Amplo.uspSaveAmploQuestionBankImport ?,?,?',$param_array);
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
        Date   : 20/08/2020
        Name   : saveAmploDomainImport
        Params :
        Type   : POST
        Purpose: To Save Amplo Domain Import
    */
    public function saveAmploDomainImport(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'QuestionBankId'=> "required|numeric",
                'DomainId'      => "required|numeric",
                'DomainName'    => "required|between:2,40"
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
            $data = DB::select('EXEC Amplo.uspSaveAmploDomainImport ?,?,?,?',$param_array);
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
        Date   : 20/08/2020
        Name   : saveAmploQuesionsAnswersImport
        Params :
        Type   : POST
        Purpose: To save amplo quesion and answers import
    */
    public function saveAmploQuesionsAnswersImport(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'batchId'          => 'required|numeric',
                'questionsBankId'  => 'required|numeric',
                'questionBankName' => 'required',
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
            $data = DB::select('EXEC Amplo.uspSaveAmploQuesionBankImport ?,?',$param_array);
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
        Date   : 20/08/2020
        Name   : deleteAmploQuestionImport
        Params : @questionId
        Type   : DELETE
        Purpose: To delete amplo question import
    */     
    public function deleteAmploQuestionImport(Request $request, $questionId){
        try{
            $params_array = array(
                $questionId
            );
            $data = DB::select('EXEC Amplo.DeleteAmploQuestionImport ?', $params_array);
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
        Date   : 20/08/2020
        Name   : deleteAmploDomianImport
        Params : @domainId
        Type   : DELETE
        Purpose: To delete amplo domain import
    */     
    public function deleteAmploDomianImport(Request $request, $domainId){
        try{
            $params_array = array(
                $domainId
            );
            $data = DB::select('EXEC Amplo.DeleteAmploDomainImport ?', $params_array);
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
        Date   : 20/08/2020
        Name   : deleteAmploQuestionBankImport
        Params : @questionId
        Type   : DELETE
        Purpose: To delete amplo question bank import
    */     
    public function deleteAmploQuestionBankImport(Request $request, $questionId){
        try{
            $params_array = array(
                $questionId
            );
            $data = DB::select('EXEC Amplo.DeleteAmploQuestionBankImport ?', $params_array);
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
        Date   : 20/08/2020
        Name   : deleteAmploAttachmentImport
        Params : @attachmentId
        Type   : DELETE
        Purpose: To delete amplo question attachment import
    */     
    public function deleteAmploAttachmentImport(Request $request, $attachmentId){
        try{
            $params_array = array(
                $attachmentId,
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC Amplo.uspDeleteAmploAttachmentImport ?,?', $params_array);
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
        Date   : 20/07/2020
        Name   : saveAmploAttachmentImport
        Params : 
        Type   : POST
        Purpose: To save amplo attachment import
    */ 
    public function saveAmploAttachmentImport(Request $request){
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
                $data = DB::select(' EXEC Amplo.uspSaveAmploAttachmentImport ?,?,?,?,?,?',$params_array);
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
        Date   : 20/08/2020
        Name   : updateAmploQuestionBankIndustryImport
        Params :
        Type   : POST
        Purpose: To Update Amplo Question Bank Industry Import
    */     
    public function updateAmploQuestionBankIndustryImport(Request $request ){
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
            $data = DB::select('EXEC Amplo.uspUpdateAmploQuestionBankIndustryImport ?,?,?,?', $params_array);
            
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
        Date   : 21/08/2020
        Name   : saveAmploQuestionBankFromInterface
        Params :
        Type   : POST
        Purpose: To Save Amplo Question Bank From Interface
    */     
    public function saveAmploQuestionBankFromInterface(Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                "batchId" => "required|numeric"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $requestData['batchId'],
                $userId
            );
            $data = DB::select('EXEC Amplo.SaveAmploQuestionBankFromInterface ?,?', $params_array);
            if( isset($data[0]->IsSuccess) && ($data[0]->IsSuccess == true || $data[0]->IsSuccess ===1)){
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
        Date   : 21/08/2020
        Name   : getAmploQuestionBankImportInfo
        Params :
        Type   : GET
        Purpose: To Get Amplo Question Bank Import Info
    */     
    public function getAmploQuestionBankImportInfo(Request $request, $batchId ){
        try{
           
            $params_array = array(
                $batchId
            );
            $data = DB::select('EXEC Amplo.GetImportInfo ?', $params_array);
            if( isset($data[0]->IsSuccess) && ($data[0]->IsSuccess == true || $data[0]->IsSuccess ===1)){
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
    /* Client  Side API's*/ 
    /*
        Author : Abdul
        Date   : 20/08/2020
        Name   : saveClientQuestionBankImport
        Params :
        Type   : POST
        Purpose: To Save Client Question Bank Import
    */
    public function saveClientQuestionBankImport(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'QuestionBankId'  => "required|numeric",
                'QuestionBankName' => "required|between:2,40"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $request['QuestionBankId'],
                $request['QuestionBankName'],
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC uspSaveClientQuestionBankImport ?,?,?',$param_array);
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
        Date   : 20/08/2020
        Name   : saveClientDomainImport
        Params :
        Type   : POST
        Purpose: To Save Client Domain Import
    */
    public function saveClientDomainImport(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'QuestionBankId'=> "required|numeric",
                'DomainId'      => "required|numeric",
                'DomainName'    => "required|between:2,40"
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
            $data = DB::select('EXEC uspSaveClientDomainImport ?,?,?,?',$param_array);
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
        Date   : 20/08/2020
        Name   : saveClientQuesionsAnswersImport
        Params :
        Type   : POST
        Purpose: To save client quesion and answers import
    */
    public function saveClientQuesionsAnswersImport(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'batchId'          => 'required|numeric',
                'questionsBankId'  => 'required|numeric',
                'questionBankName' => 'required',
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
            $data = DB::select('EXEC uspSaveClientQuesionBankImport ?,?',$param_array);
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
        Date   : 20/08/2020
        Name   : deleteClientQuestionImport
        Params : @questionId
        Type   : DELETE
        Purpose: To delete client question import
    */     
    public function deleteClientQuestionImport(Request $request, $questionId){
        try{
            $params_array = array(
                $questionId
            );
            $data = DB::select('EXEC DeleteClientQuestionImport ?', $params_array);
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
        Date   : 20/08/2020
        Name   : deleteClientDomianImport
        Params : @domainId
        Type   : DELETE
        Purpose: To delete client domain import
    */     
    public function deleteClientDomianImport(Request $request, $domainId){
        try{
            $params_array = array(
                $domainId
            );
            $data = DB::select('EXEC DeleteClientDomainImport ?', $params_array);
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
        Date   : 20/08/2020
        Name   : deleteClientQuestionBankImport
        Params : @questionId
        Type   : DELETE
        Purpose: To delete client question bank import
    */     
    public function deleteClientQuestionBankImport(Request $request, $questionId){
        try{
            $params_array = array(
                $questionId
            );
            $data = DB::select('EXEC DeleteClientQuestionBankImport ?', $params_array);
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
        Date   : 20/08/2020
        Name   : deleteClientAttachmentImport
        Params : @attachmentId
        Type   : DELETE
        Purpose: To delete client question attachment import
    */     
    public function deleteClientAttachmentImport(Request $request, $attachmentId){
        try{
            $params_array = array(
                $attachmentId,
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC uspDeleteClientAttachmentImport ?,?', $params_array);
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
        Date   : 20/08/2020
        Name   : saveClientAttachmentImport
        Params : 
        Type   : POST
        Purpose: To save client attachment import
    */ 
    public function saveClientAttachmentImport(Request $request){
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
                $data = DB::select(' EXEC uspSaveClientAttachmentImport ?,?,?,?,?,?',$params_array);
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
        Date   : 20/08/2020
        Name   : updateClientQuestionBankIndustryImport
        Params :
        Type   : POST
        Purpose: To Update Client Question Bank Industry Import
    */     
    public function updateClientQuestionBankIndustryImport(Request $request ){
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
            $data = DB::select('EXEC uspUpdateClientQuestionBankIndustryImport ?,?,?,?', $params_array);
            
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
        Date   : 21/08/2020
        Name   : saveClientQuestionBankFromInterface
        Params :
        Type   : POST
        Purpose: To Save Client Question Bank From Interface
    */     
    public function saveClientQuestionBankFromInterface(Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                "batchId" => "required|numeric"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $requestData['batchId'],
                $userId
            );
            $data = DB::select('EXEC SaveClientQuestionBankFromInterface ?,?', $params_array);
            if( isset($data[0]->IsSuccess) && ($data[0]->IsSuccess == true || $data[0]->IsSuccess ===1)){
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
        Date   : 21/08/2020
        Name   : getClientQuestionBankImportInfo
        Params :
        Type   : GET
        Purpose: To Get Client Question Bank Import Info
    */     
    public function getClientQuestionBankImportInfo(Request $request , $batchId){
        try{
            
            $params_array = array(
                $batchId
            );
            $data = DB::select('EXEC GetImportInfo ?', $params_array);
            if( isset($data[0]->IsSuccess) && ($data[0]->IsSuccess == true || $data[0]->IsSuccess ===1)){
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
}
