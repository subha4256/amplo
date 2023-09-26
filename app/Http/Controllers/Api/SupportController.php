<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Controllers\Api\BaseController as BaseController;
use DB;
use Validator;
use JWTAuth;
use Illuminate\Support\Facades\Crypt;
use App\Http\Controllers\Api\KpiController;
use App\Http\Controllers\EmailController;

class SupportController extends BaseController
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
        Date   : 17/08/2020
        Name   : getSupportMainMenus
        Params : 
        Type   : GET
        Purpose: To Get Support Main Menus
    */
    public function getSupportMainMenus(Request $request){
        try {
             
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            
            $data = DB::select(' EXEC Amplo.uspGetSupportMainMenus ');
           
            if( count($data) > 0){
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($data, $message);
        } catch ( \Exception $e ) {
            return $this->sendError($e->getMessage()); 
        }
    }    
    /*
        Author : Abdul
        Date   : 17/08/2020
        Name   : getSupportPage
        Params : 
        Type   : GET
        Purpose: To Get Support Page
    */
    public function getSupportPage(Request $request, $categoryId){
        try {
             
            $requestData  = $request->all();
            $userId       = $this->user_data['UserID'];
            $params_array = array(
                $categoryId    
            );
            $data = DB::select(' EXEC Amplo.uspGetSupportPage ?', $params_array);
            $data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $data_array[$value->CategoryId]['Header'] = $value->Header;
                    $data_array[$value->CategoryId]['CategoryId'] = $value->CategoryId;
                    $data_array[$value->CategoryId]['CategoryName'] = $value->CategoryName;
                    if($value->FileId==null || $value->FileId ==''){
                        $data_array[$value->CategoryId]['Files'] = array();    
                    }
                    $data_array[$value->CategoryId]['SubCategory'][$value->SubCategoryId]['SubCategoryId'] = $value->SubCategoryId;
                    $data_array[$value->CategoryId]['SubCategory'][$value->SubCategoryId]['SubCategoryName'] = $value->SubCategoryName;
                    $data_array[$value->CategoryId]['SubCategory'][$value->SubCategoryId]['DisplayText'] = $value->DisplayText;
                    $data_array[$value->CategoryId]['SubCategory'][$value->SubCategoryId]['SupportFunctionalityId'] = $value->SupportFunctionalityId;
                }
                $data_array = array_values($data_array);
                foreach ($data_array as $key => $value) {
                   if(isset($value['SubCategory'])){
                        $data_array[$key]['SubCategory']= array_values($value['SubCategory']); 
                   }
                }
                //echo "<pre>";print_r($data_array);echo "<br>";die;
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($data_array, $message);
        } catch ( \Exception $e ) {
            return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 17/08/2020
        Name   : getSupportPageDetails
        Params : 
        Type   : GET
        Purpose: To Get Support Page Details
    */
    public function getSupportPageDetails(Request $request, $categoryId, $subCategoryId){
        try {
             
            $requestData  = $request->all();
            $userId       = $this->user_data['UserID'];
            $params_array = array(
                $categoryId,
                $subCategoryId    
            );
            $data = DB::select(' EXEC Amplo.uspGetSupportPageDetails ?,?', $params_array);
            
            $data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    if($value->ParentQuestionId==null || $value->ParentQuestionId==""){
                        $data_array['Questions'][$value->QuestionId]['QuestionId'] = $value->QuestionId; 
                        $data_array['Questions'][$value->QuestionId]['Question'] = $value->Question;
                        $data_array['Questions'][$value->QuestionId]['Answers'][$value->AnswerId]['AnswerId'] = $value->AnswerId;
                        $data_array['Questions'][$value->QuestionId]['Answers'][$value->AnswerId]['Answer'] = $value->Answer;
                        $data_array['Questions'][$value->QuestionId]['Answers'][$value->AnswerId]['Files'][] = array('FileName'=>$value->FileName,'FileType'=>$value->FileType,'FilePath'=>$value->FilePath,'ImagePath'=>$value->ImagePath,'ShowImage'=>$value->ShowImage);
                    }
                    if($value->ParentQuestionId!=null || $value->ParentQuestionId!=""){
                        $data_array['Questions'][$value->ParentQuestionId]['SubQuestions'][$value->QuestionId]['SubQuestionId'] = $value->QuestionId;
                        $data_array['Questions'][$value->ParentQuestionId]['SubQuestions'][$value->QuestionId]['SubQuestion'] = $value->Question; 
                        $data_array['Questions'][$value->ParentQuestionId]['SubQuestions'][$value->QuestionId]['SubQuestionAnswers'][$value->AnswerId]['AnswerId'] = $value->AnswerId;
                        $data_array['Questions'][$value->ParentQuestionId]['SubQuestions'][$value->QuestionId]['SubQuestionAnswers'][$value->AnswerId]['Answer'] = $value->Answer;

                        $data_array['Questions'][$value->ParentQuestionId]['SubQuestions'][$value->QuestionId]['SubQuestionAnswers'][$value->AnswerId]['Files'][] = array('FileName'=>$value->FileName,'FileType'=>$value->FileType,'FilePath'=>$value->FilePath,'ImagePath'=>$value->ImagePath,'ShowImage'=>$value->ShowImage);
                    }
                    
                }
                if(isset($data_array['Questions'])){
                    $data_array['Questions'] = array_values($data_array['Questions']);
                    foreach ($data_array['Questions'] as $key => $value) {

                        if(isset($value['Answers'])){
                            $data_array['Questions'][$key]['Answers'] = array_values($value['Answers']);
                        }
                        if(isset($value['SubQuestions'])){
                            $data_array['Questions'][$key]['SubQuestions'] = array_values($value['SubQuestions']);
                            foreach ($data_array['Questions'][$key]['SubQuestions'] as $k => $v) {
                                if(isset($v['SubQuestionAnswers'])){
                                    $data_array['Questions'][$key]['SubQuestions'][$k]['SubQuestionAnswers'] = array_values($v['SubQuestionAnswers']);
                                }
                            }
                        }
                    }
                }
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($data_array, $message);
        } catch ( \Exception $e ) {
            return $this->sendError($e->getMessage()); 
        }
    }
}
