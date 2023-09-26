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

class RoadMapController extends BaseController
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
        Date   : 06/08/2020
        Name   : getRoadMapDetails
        Params : 
        Type   : GET
        Purpose: To Get Road Map Details
    */
    public function getRoadMapDetails(Request $request, $roadMapId){
        try{
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $roadMapId
            );
            $data = DB::select(' EXEC uspGetRoadMapDetails ?', $params_array );
            if(count($data)>0){
                $message = "Data retrieved successfully.";
            }else{
                $message = "No record found.";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
       
    /*
        Author : Abdul
        Date   : 06/08/2020
        Name   : getMilestone
        Params : 
        Type   : GET
        Purpose: To Get Road Map Milestone
    */
    public function getMilestone(Request $request, $roadMapId, $roadMapMileStoneId){
        try{
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $roadMapId,
                $roadMapMileStoneId
            );
            $data = DB::select(' EXEC uspGetMilestone ?,?', $params_array );
            if(count($data)>0){
                $message = "Data retrieved successfully.";
            }else{
                $message = "No record found.";
            }
            return $this->sendResponse($data, $message); 
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 06/08/2020
        Name   : getMilestoneOwner
        Params : 
        Type   : GET
        Purpose: To Get Road Map Milestone And Owners Data
    */
    public function getRoadMapOwner(Request $request, $roadMapId, $roadMapMileStoneId,$roadMapMileStoneOwnerId){
        try{
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $roadMapId,
                $roadMapMileStoneId,
                $roadMapMileStoneOwnerId
            );
            $data = DB::select(' EXEC uspGetRoadMapOwner ?,?,?', $params_array );
            $data = json_decode(json_encode($data),true);
            $data_array1 = array();
            $data_array2 = array();
            $data_array  = array();
            if(count($data) > 0){
               foreach($data as $key=>$val){
                    $data_array1[$val['RoadMapMileStoneId']]['id']        = $val['RoadMapMileStoneId'];
                    $data_array1[$val['RoadMapMileStoneId']]['name']      = $val['MileStoneName'];
                    $data_array1[$val['RoadMapMileStoneId']]['groupOnly'] = true;
                    
                    $data_array2[$val['RoadMapMileStoneOwnerId']]['id']       = $val['RoadMapMileStoneOwnerId'];
                    $data_array2[$val['RoadMapMileStoneOwnerId']]['name']     = $val['MileStoneOwnerName'];
                    $data_array2[$val['RoadMapMileStoneOwnerId']]['parentId'] = $val['RoadMapMileStoneId'];
                     
                }
                $data_array = array_merge($data_array1,$data_array2);
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
        Author : Abdul
        Date   : 06/08/2020
        Name   : getRoadMapTasks
        Params : 
        Type   : GET
        Purpose: To Get Road Map Task
    */
    public function getRoadMapTasks(Request $request, $roadMapId, $roadMapMileStoneId,$roadMapMileStoneOwnerId, $roadMapMileStoneTaskId){
        try{
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $roadMapId,
                $roadMapMileStoneId,
                $roadMapMileStoneOwnerId,
                $roadMapMileStoneTaskId
            );
            $data = DB::select(' EXEC uspGetRoadMapTasks ?,?,?,?', $params_array );
            $data = json_decode(json_encode($data),true);
            $data_array = array();
            if(count($data) > 0){
               foreach($data as $key=>$val){
                    $data_array[$key]['id']    = $val['RoadMapMileStoneTaskId'];
                    $data_array[$key]['start'] = date('Y-m-d H:i:s', strtotime($val['TaskStartDate']));
                    $data_array[$key]['end']   = date('Y-m-d H:i:s', strtotime($val['TaskEndDate']));
                    $data_array[$key]['resourceId'] = $val['RoadMapMileStoneOwnerId'];
                    $data_array[$key]['title'] = $val['TaskName'];
                    $data_array[$key]['taskstatusid'] = $val['RoadMapTaskStatusId'];
                    $data_array[$key]['bgColor'] = $val['Color'];
                    $data_array[$key]['Status'] = $val['RoadMapTaskStatusName'];
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
        Author : Abdul
        Date   : 06/08/2020
        Name   : saveRoadMap
        Params : 
        Type   : POST
        Purpose: To Save Road Map
    */
    public function saveRoadMap(Request $request){
        try{
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $userId,
                json_encode($requestData)
            );
            $data = DB::select(' EXEC uspSaveRoadMap ?,?', $params_array );
            if( isset($data[0]->IsSuccess) && ($data[0]->IsSuccess == true || $data[0]->IsSuccess ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->IsSuccess)){
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
    /*
        Author : Abdul
        Date   : 06/08/2020
        Name   : getTaskStatus
        Params : 
        Type   : GET
        Purpose: To Get Task Status
    */
    public function getTaskStatus(Request $request){
        try{
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            
            $data = DB::select(' EXEC uspListTaskStatus ' );
            if(count($data) > 0){
                $message = "Data retrieved successfully.";
            }else{
                $message = "No record found.";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 06/08/2020
        Name   : updateStatus
        Params : 
        Type   : POST
        Purpose: To Update Status
    */
    public function updateStatus(Request $request){
        try{
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            
            $params_array = array(
                $requestData['TaskId'],
                $requestData['Status'],
                $userId
            );
            $data = DB::select(' EXEC uspUpdateStatus ?,?,?' , $params_array);
            
            if( isset($data[0]->IsSuccess) && ($data[0]->IsSuccess == true || $data[0]->IsSuccess ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->IsSuccess)){
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
    /*
        Author : Abdul
        Date   : 08/08/2020
        Name   : deleteRoadMapTask
        Params : 
        Type   : POST
        Purpose: To Delete RoadMap Task
    */
    public function deleteRoadMapTask(Request $request,$taskId){
        try{
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            
            $params_array = array(
                $taskId
            );
            
            $data = DB::select(' EXEC uspRemoveTask ?' , $params_array);
            
            if( isset($data[0]->IsSuccess) && ($data[0]->IsSuccess == true || $data[0]->IsSuccess ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->IsSuccess)){
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
}
