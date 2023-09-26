<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Controllers\Api\BaseController as BaseController;
use DB;
use Validator;
use JWTAuth;
use Illuminate\Support\Facades\Crypt;

class DesignThinkingController extends BaseController
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
        Date   : 03/03/2020
        Name   : SaveDesignThinkingProject
        Params : @DtProjectId,@ProjectName,@DisableDate,@ChampionName,@userId
        Type   : POST
        Purpose: To Add/Edit Design Thinking Project 
    */
    public function SaveDesignThinkingProject( Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                'DtProjectId' => 'required|numeric',
                'ProjectName' => 'required|between:2,40',
                //'DisableDate' => 'required',
                'ChampionUserId'=> 'required|numeric',
                "userId"      => "required|array|min:1"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $params_array = [
                $requestData['DtProjectId'],
                $this->user_data['UserID'],
                $requestData['ProjectName'],
                implode(",", $requestData['userId']),
                $requestData['DisableDate'],
                $requestData['ChampionUserId']
            ];
           
            $data = DB::select(' EXEC uspSaveDtProject ?,?,?,?,?,?', $params_array);
            
            if( isset($data[0]->Success) && $data[0]->Success == true){
               $message = $data[0]->messageName;
            }else{
                $message = $data[0]->messageName;  
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
             return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 03/03/2020
        Name   : getDesignThinkingProject
        Params : @ProjectName
        Type   : POST
        Purpose: To get All Design Thinking Project 
    */
    public function getDesignThinkingProject( Request $request ){
        try{

            $requestData = $request->all();
           
            if(isset($requestData['ProjectName']) && $requestData['ProjectName']!="" ){
                $ProjectName = $requestData['ProjectName'];
            }else{
                $ProjectName = "";
            }
           
            $params_array = [
                $ProjectName
            ];
            
            $data = DB::select(' EXEC uspListDtProjects ?', $params_array);
            
            if( count($data) >0 ){
               $message = "Record fetched successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
             return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 03/03/2020
        Name   : getDesignThinkingProjectDetails
        Params : @ProjectId
        Type   : POST
        Purpose: To get Design Thinking Project Details 
    */
    public function getDesignThinkingProjectDetails( Request $request, $ProjectId, $versionId ){
        try{
            $params_array = [
                $ProjectId,
                $versionId
            ];
            
            $data = DB::select(' EXEC uspGetDtProjectDetails ?,?', $params_array);
            if( count($data) >0 ){
               $message = "Record fetched successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
             return $this->sendError($e->getMessage()); 
        }
    }
      /*
        Author : Abdul
        Date   : 03/03/2020
        Name   : getDesignThinkingProjectUserDetails
        Params : @ProjectId
        Type   : POST
        Purpose: To get Design Thinking Project User Details 
    */
    public function getDesignThinkingProjectUserDetails( Request $request, $ProjectId ){
        try{
            $params_array = [
                $ProjectId
            ];
            
            $data = DB::select(' EXEC uspGetDtProjectUserDetails ?', $params_array);
            if( count($data) >0 ){
               $message = "Record fetched successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
             return $this->sendError($e->getMessage()); 
        }
    } 
     /*
        Author : Abdul
        Date   : 16/03/2020
        Name   : getDtProjectCreatePermission
        Params : @userId
        Type   : POST
        Purpose: To Get Dt Project Create Permission
    */ 
    public function getDtProjectCreatePermission( Request $request){
        try{
            $params_array = [
                $this->user_data['UserID']
            ];
            
            $data = DB::select(' EXEC uspGetDtProjectCreatePermission ?', $params_array);
            if( count($data) >0 ){
               $message = "Record fetched successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
             return $this->sendError($e->getMessage()); 
        }
    }
    public function getDtProject( Request $request){
        try{
            $ProjectName = "";
            $params_array = [
                $ProjectName
            ];
            
            $data = DB::select(' EXEC uspListDtProjects ?', $params_array);
            $dt_array = array();
            if( count($data) >0 ){

                foreach ($data as $key => $value) {
                    $dt_array[$key]["id"]   = "dtproject_".$value->DTProjectID;
                    $dt_array[$key]["name"] = $value->ProjectTitle;
                }
               $message = "Record fetched successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($dt_array, $message);
        }catch(\Exception $e){
             return $this->sendError($e->getMessage()); 
        }
    }         
}
