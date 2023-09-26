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

class EmpathyLifeCycleController extends BaseController
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
        Date   : 09/07/2020
        Name   : getEmpathyLifeCycleCategory
        Params : 
        Type   : GET
        Purpose: To Get Empathy Life Cycle Category
    */
    public function getEmpathyLifeCycleCategory( Request $request){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = array(
                "LifeCycle"
            );
            //echo "<pre>";print_r($params_array);echo "<br>";die;
            $data = DB::select(' EXEC uspGetAllCategoryType ?', $params_array );
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
        Date   : 09/07/2020
        Name   : saveEmpathyLifeCycle
        Params : 
        Type   : POST
        Purpose: To Save Empathy Life Cycle
    */
    public function saveEmpathyLifeCycle( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'ProjectId'        => 'required|numeric',
                'ProjectVersionId' => 'required|numeric',
                'EpicId'           => 'required|numeric',
                'EpicVersionId'    => 'required|numeric',
                'LifeCycleId'      => 'required|numeric',
                'LifeCycleName'    => 'required',
                'Stages'           => 'required|array|min:1'    
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];

            $params_array = array(
                $userId,
                json_encode($requestData)
            );

            $data = DB::select(' EXEC uspSaveLifeCycle ?,?', $params_array );
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 11/08/2020
        Name   : saveMultipleEmpathyLifeCycle
        Params : 
        Type   : POST
        Purpose: To Save Multiple Empathy Life Cycle
    */
    public function saveMultipleEmpathyLifeCycle( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'ProjectId'        => 'required|numeric',
                'ProjectVersionId' => 'required|numeric',
                'EpicId'           => 'required|numeric',
                'EpicVersionId'    => 'required|numeric',
                'Lifecycles'       => 'required|array|min:1'    
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];

            $params_array = array(
                $userId,
                json_encode($requestData)
            );
            //echo "<pre>";print_r($params_array);echo "<br>";die;
            $data = DB::select(' EXEC uspSaveMultipleLifeCycle ?,?', $params_array );
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 09/07/2020
        Name   : getAllEmpathyLifeCycle
        Params : 
        Type   : GET
        Purpose: To Get All Empathy LifeCycle
    */
    public function getAllEmpathyLifeCycle( Request $request, $projectId, $projectVersionId, $epicId, $epicVersionId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $projectVersionId,
                $epicId,
                $epicVersionId
            ];

            $data = DB::select(' EXEC uspGetAllEmpathyLifeCycle ?,?,?,?', $params_array );
            //echo "<pre>";print_r($data);echo "<br>";die;
            $data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                   $data_array['LifeCycle'][$value->EpicLifeCycleId] =  array('EpicLifeCycleId'=>$value->EpicLifeCycleId,'LifeCycleName'=>$value->LifeCycleName,'LifeCycleDescription'=>$value->LifeCycleDescription);
                }
                $data_array['LifeCycle'] = array_values($data_array['LifeCycle']);
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
        Author : Abdul
        Date   : 11/08/2020
        Name   : getMultipleEmpathyLifeCycle
        Params : 
        Type   : GET
        Purpose: To Get Multiple Empathy LifeCycle
    */
    public function getMultipleEmpathyLifeCycle( Request $request, $projectId, $projectVersionId, $epicId, $epicVersionId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $projectVersionId,
                $epicId,
                $epicVersionId
            ];

            $data = DB::select(' EXEC uspGetAllEmpathyLifeCycle ?,?,?,?', $params_array );
            //echo "<pre>";print_r($data);echo "<br>";die;
            $data_array = array();
            if( count($data) > 0){
                $data_array['ProjectId']        = $data[0]->ProjectId;
                $data_array['ProjectVersionId'] = $data[0]->ProjectVersionId;
                $data_array['EpicId']           = $data[0]->EpicId;
                $data_array['EpicVersionId']    = $data[0]->EPICVersionId;
                foreach ($data as $key => $value) {
                   $data_array['LifeCycle'][$value->EpicLifeCycleId] =  array('LifeCycleId'=>$value->EpicLifeCycleId,'LifeCycleName'=>$value->LifeCycleName,'LifeCycleDescription'=>$value->LifeCycleDescription);
                }
                $data_array['LifeCycle'] = array_values($data_array['LifeCycle']);

                foreach ($data_array['LifeCycle'] as $k => $v) {
                    $params_array2 = [
                        $projectId,
                        $projectVersionId,
                        $epicId,
                        $epicVersionId,
                        $v['LifeCycleId']
                    ];
                    $data2 = DB::select(' EXEC uspGetEmpathyLifeCycle ?,?,?,?,?', $params_array2 );
                    $data2 = json_decode(json_encode($data2), true);
                    //echo "<pre>";print_r($data2);echo "<br>";
                    foreach ($data2 as $key => $value) {
                        if($v['LifeCycleId']==$value['EpicLifeCycleId']){
                            if($value["ParentStageId"]==""){
                                $data_array['LifeCycle'][$k]['Stages'][$value["StageId"]]["StageId"]   = $value["StageId"];
                                $data_array['LifeCycle'][$k]['Stages'][$value["StageId"]]["StageName"]   = $value["StageName"];
                                $data_array['LifeCycle'][$k]['Stages'][$value["StageId"]]["commentCol"]   = $value["CommentCol"];
                                $data_array['LifeCycle'][$k]['Stages'][$value["StageId"]]["disableAddNewColBtn"]   = $value["DisableAddNewColBtn"];
                                $data_array['LifeCycle'][$k]['Stages'][$value["StageId"]]["SequenceNumber"]   = $value["StageSequenceNumber"];
                            }
                            if($value["ParentStageId"]!=""){
                                $data_array['LifeCycle'][$k]['Stages'][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["SubStageId"]   = $value["StageId"];
                                $data_array['LifeCycle'][$k]['Stages'][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["SubStageName"]   = $value["StageName"];
                                $data_array['LifeCycle'][$k]['Stages'][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["SequenceNumber"]   = $value["StageSequenceNumber"];
                                if($value["CategoryLookupId"]=="" || $value["CategoryLookupId"]==null){
                                    $data_array['LifeCycle'][$k]['Stages'][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"] = array();
                                }else{
                                    $data_array['LifeCycle'][$k]['Stages'][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["CategoryLookupId"] = $value["CategoryLookupId"];
                                    $data_array['LifeCycle'][$k]['Stages'][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["CategoryName"] = $value["CategoryName"];
                                     $data_array['LifeCycle'][$k]['Stages'][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["SequenceNumber"] = $value["CategorySequenceNumber"];
                                    
                                    if($value["CategoryName"]=="Impactor" || $value["CategoryName"]=="Impactee"){
                                        if($value["StageText"]!=""){
                                            $StData = DB::select(' EXEC uspGetDtStakeHolderDetails ?', array($value["StageText"]));
                                            if(count($StData) > 0){
                                                
                                                $data_array['LifeCycle'][$k]['Stages'][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["CategoryText"][$value['StageText']]['Id'] = $value['StageText'];
                                                $data_array['LifeCycle'][$k]['Stages'][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["CategoryText"][$value['StageText']]['ImagePath'] = ($StData[0]->Image!="") ? env('APP_URL').'public/StakeHoldersImages/'.$StData[0]->Image : "";
                                            }else{
                                                 $data_array['LifeCycle'][$k]['Stages'][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["CategoryText"][$value['StageText']]['Id'] = $value['StageText'];
                                                $data_array['LifeCycle'][$k]['Stages'][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["CategoryText"][$value['StageText']]['ImagePath'] = ($StData[0]->Image!="") ? env('APP_URL').'public/StakeHoldersImages/'.$StData[0]->Image : "";
                                            }
                                        }
                                    }else{
                                        $data_array['LifeCycle'][$k]['Stages'][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["CategoryText"][$value['StageTextId']]['Text'] = $value["StageText"];
                                        $data_array['LifeCycle'][$k]['Stages'][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["CategoryText"][$value['StageTextId']]['SequenceNumber'] = $value["StageDetailSequenceNumber"];
                                        
                                    }

                                }
                            }
                        }
                    }
                }
                //echo "<pre>";print_r($data_array);echo "<br>";die;
                foreach ($data_array['LifeCycle'] as $key => $value) {
                   if(isset($value['Stages'])){
                        $data_array['LifeCycle'][$key]['Stages'] = array_values($value['Stages']);
                        foreach ($data_array['LifeCycle'][$key]['Stages'] as $k => $v) {
                            if(isset($v['SubStages'])){
                                $data_array['LifeCycle'][$key]['Stages'][$k]['SubStages'] = array_values($v['SubStages']);
                                foreach ($data_array['LifeCycle'][$key]['Stages'][$k]['SubStages'] as $ck => $cv) {
                                    if(isset($cv["Categories"]) && count($cv["Categories"]) >0){
                                        $data_array['LifeCycle'][$key]['Stages'][$k]['SubStages'][$ck]['Categories'] = array_values($cv['Categories']);
                                        foreach ($data_array['LifeCycle'][$key]['Stages'][$k]['SubStages'][$ck]['Categories'] as $ctk => $ctv) {
                                            if(isset($ctv['CategoryText'])){
                                                $data_array['LifeCycle'][$key]['Stages'][$k]['SubStages'][$ck]['Categories'][$ctk]['CategoryText'] = array_values($ctv['CategoryText']);   
                                            }
                                        }
                                    }
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
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 09/07/2020
        Name   : getEmpathyLifeCycle
        Params : 
        Type   : GET
        Purpose: To Get Empathy LifeCycle Details
    */
    public function getEmpathyLifeCycle( Request $request, $projectId, $projectVersionId, $epicId, $epicVersionId, $epicLifeCycleId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $projectVersionId,
                $epicId,
                $epicVersionId,
                $epicLifeCycleId
            ];
            $data = DB::select(' EXEC uspGetEmpathyLifeCycle ?,?,?,?,?', $params_array );
            //echo "<pre>";print_r($data);echo "<br>";die;
            $data_array = array();
            if( count($data) > 0){
                $data = json_decode(json_encode($data), true);

                $data_array['LifeCycleId']          = $data[0]['EpicLifeCycleId'];
                $data_array['LifeCycleName']        = $data[0]['LifeCycleName'];
                $data_array['LifeCycleDescription'] = $data[0]['LifeCycleDescription'];
                foreach ($data as $key => $value) {
                    if($value["ParentStageId"]==""){
                        $data_array["Stages"][$value["StageId"]]["StageId"]   = $value["StageId"];
                        $data_array["Stages"][$value["StageId"]]["StageName"] = $value["StageName"];
                        $data_array["Stages"][$value["StageId"]]["commentCol"] = $value["CommentCol"];
                        $data_array["Stages"][$value["StageId"]]["disableAddNewColBtn"] = $value["DisableAddNewColBtn"];   
                    }
                    if($value["ParentStageId"]!=""){
                        $data_array["Stages"][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["StageId"]   = $value["StageId"];
                        $data_array["Stages"][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["SubStageName"] = $value["StageName"];
                        if($value["CategoryLookupId"]=="" || $value["CategoryLookupId"]==null){
                            $data_array["Stages"][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"] = array();
                        }else{
                            $data_array["Stages"][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["CategoryLookupId"] = $value["CategoryLookupId"];
                            $data_array["Stages"][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["CategoryName"] = $value["CategoryName"];
                            if($value["CategoryName"]=="Impactor" || $value["CategoryName"]=="Impactee"){
                                if($value["StageText"]!=""){
                                 
                                    $StData = DB::select(' EXEC uspGetDtStakeHolderDetails ?', array($value["StageText"]));
                                    if(count($StData) > 0){
                                        $data_array["Stages"][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["CategoryText"][] = array("Id"=>$value["StageText"],"ImagePath"=>($StData[0]->Image!="") ? env('APP_URL').'public/StakeHoldersImages/'.$StData[0]->Image : "");
                                    }else{
                                         $data_array["Stages"][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["CategoryText"][] = array("Id"=>$value["StageText"],"ImagePath"=>($StData[0]->Image!="") ? env('APP_URL').'public/StakeHoldersImages/'.$StData[0]->Image : "");
                                    }

                                    /*$stakeholdersIds = explode(",",$value["StageText"]);
                                    $stakeholders_array = array();
                                    foreach($stakeholdersIds as $keys=>$val){
                                        $stakeholders_array[$keys]["Id"] = $val;
                                        $StData = DB::select(' EXEC uspGetDtStakeHolderDetails ?', array($val));
                                        if(count($StData) > 0){
                                            $stakeholders_array[$keys]["ImagePath"] = ($StData[0]->Image!="") ? env('APP_URL').'StakeHoldersImages/'.$StData[0]->Image : "";
                                        }else{
                                            $stakeholders_array[$keys]["ImagePath"] = "";
                                        }
                                    }
                                    $data_array["Stages"][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["CategoryText"] = $stakeholders_array;*/
                                }
                            }else{
                                $data_array["Stages"][$value["ParentStageId"]]["SubStages"][$value["StageId"]]["Categories"][$value["CategoryLookupId"]]["CategoryText"] = $value["StageText"];
                            }
                        }   
                    }
                    
                }
                $data_array['Stages'] = array_values($data_array['Stages']);
                foreach ($data_array['Stages'] as $key => $val) {
                    if(isset($val['SubStages'])){
                        $data_array['Stages'][$key]['SubStages'] = array_values($val['SubStages']);
                        foreach($data_array["Stages"][$key]["SubStages"] as $k=>$v){
                            if(isset($v["Categories"]) && count($v["Categories"]) >0){
                                $data_array["Stages"][$key]["SubStages"][$k]["Categories"] = array_values($v["Categories"]);
                            }
                        }
                    }
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
        Author : Abdul
        Date   : 20/07/2020
        Name   : deleteLifeCycle
        Params : @ProjectId,@ProjectVersionId, @EpicId,@EpicVersionId, @EpicLifeCycleId
        Type   : GET
        Purpose: To delete life cycle
    */
    public function deleteLifeCycle( Request $request, $projectId, $projectVersionId, $epicId, $epicVersionId, $epicLifeCycleId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $projectVersionId,
                $epicId,
                $epicVersionId,
                $epicLifeCycleId,
                $userId
            ];
            
            $data = DB::select(' EXEC uspDeleteEmpathyLifeCycle ?,?,?,?,?,?', $params_array );
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
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    public function getDtNoiDetailForStakeholder( Request $request,$stakeholderId){
        try{
           
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            
            $params_array = array(
                $stakeholderId
            );
            $data = DB::select(' EXEC uspGetDtNoiDetailForStakeholder ?', $params_array );
            
            if(count($data) > 0){
                $message = "Data retrieved successfully.";
            }else{
                $message = "NO record found.";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    } 
}
    