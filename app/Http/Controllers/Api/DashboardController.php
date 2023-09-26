<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use DB;
use Validator;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;


class DashboardController extends BaseController
{
    public $payload = [];
    public $dbUserName = "";
    public $dbUserPassword = "";
    public function __construct()
    {
        $this->payload = JWTAuth::parseToken()->getPayload(); 
        $this->dbUserName = $this->payload->get('DbUserName');
        $this->dbUserPassword = $this->payload->get('DbUserPassword');
        if($this->dbUserName != '' && $this->dbUserName != null){
            config(['database.connections.sqlsrv.username' => $this->dbUserName]);
            config(['database.connections.sqlsrv.password' => $this->dbUserPassword]);
        }
        try{
            $this->user_data = JWTAuth::parseToken()->authenticate()->toArray(); 
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }catch(JWTException $e){
            return $this->sendError($e->getMessage(),401);
        }
    }
    public function fetchDashBoardData(Request $request)
    {
        try {
            $responseData;

            $successResponseData['status'] = 'Success';
            $successResponseData['message'] = '';
            $successResponseData['data'] = null;
            $successResponseData['MessageCode'] = 200;

            $errorResponseData['status'] = 'Error';
            $errorResponseData['message'] = '';
            $errorResponseData['data'] = null;
            $errorResponseData['MessageCode'] = 400;

            $user_data=JWTAuth::parseToken()->authenticate()->toArray();
            $userId = $user_data['UserID'];//1022
            $requestData = $request->all();
            $dashBoardHighlight = DB::select(' EXEC Amplo.uspGetDashboardHighlights  ?', array($userId));
            $announcements = DB::select(' EXEC Amplo.uspGetDashboardAnnouncements  ?', array($userId));
            $industryNews = DB::select(' EXEC Amplo.uspGetDashboardIndustryNews  ?', array($userId));
            $popularResources = DB::select(' EXEC Amplo.uspGetDashboardPopularResources  ?', array($userId));
            $webinars = DB::select(' EXEC Amplo.uspGetDashboardWebinars  ?', array($userId));
            $todo = DB::select(' EXEC Amplo.uspGetDashboardTODO  ?', array($userId));
            $event=DB::select(' EXEC Amplo.uspGetDashboardEvent  ?', array($userId));

            $todoList=[
                'notStarted'=>[],
                'inProgress'=>[],
                'completed'=>[],
                'unknownStatus'=>[]
            ];
            
            $todoArr=json_decode(json_encode($todo),true);
            foreach($todoArr as $val){
                if($val['DashboardTODOStatus']=='In Progress'){
                    if(count($todoList['inProgress'])<=2){
                        array_push($todoList['inProgress'],$val);
                    }
                }
                elseif($val['DashboardTODOStatus']=='Not Started'){
                    if(count($todoList['notStarted'])<=2){
                        array_push($todoList['notStarted'],$val);
                    }
                    
                }
                elseif($val['DashboardTODOStatus']=='completed'){
                    if(count($todoList['completed'])<=2){
                        array_push($todoList['completed'],$val);
                    }                
                }
                else{
                    array_push($todoList['unknownStatus'],$val);
                }
            }

            
            $resp=[
                'dashBoardHighlight'=>$dashBoardHighlight?$dashBoardHighlight:[],
                'announcements'=>$announcements?$announcements:[],
                'industryNews'=>$industryNews?$industryNews:[],
                'popularResources'=>$popularResources?array_slice($popularResources,0,4):[],
                'webinars'=>$webinars?array_slice($webinars,0,3):[],
                'todo'=>$todoList,
                'event'=>$event?array_slice($event,1,3):[]
            ];
                $successResponseData['data'] = $resp;
                $responseData = $successResponseData;

                return response()->json($responseData, $responseData['MessageCode']);




        }
        catch (\Exception $e) {
            die("error:" . $e);
        }
    }
    /*
        Author : Abdul
        Date   : 11/06/2020
        Name   : getProgressDataForDashBoard
        Params : 
        Type   : GET
        Purpose: To Get Progress Data For Dashbaord
    */
    public function getProgressDataForDashBoard(Request $request,$projectType, $projectId){
        try{
            $validator = Validator::make(['projectType'=>$projectType,'projectId'=>$projectId], [
                'projectType' => "required|string",
                'projectId' => "required",
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $projectType,
                $projectId,
                $this->user_data['UserID']
            );
            $data = DB::select('EXEC uspGetProgressDataForDashBoard ?,?,?',$param_array);
           
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
    public function CalculateCO2Emmision(Request $request,$UOM,$EPA ){
        try{
            $params = array(
                $UOM,
                $EPA
               // $UserID =$this->user_data['UserID'],
            );
            $data = DB::select('EXEC uspCalculateCO2Emmision ?,?',$params);
          
            $sorted_data = array();
           if($data){
           foreach($data as $k => $value){
                $sorted_data["tCO2"] = $value->tCO2;
                              
            }
            $message = "TCo2   retrieved successfully";
        } else{
            $sorted_data = (Object)[];
            $message = 'data not found';
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
    } 
    public function GetCountryforCo2Emmision(Request $request){
        try{
            $params = array(
               
                $UserId =$this->user_data['UserID'],
            );
            $data = DB::select('EXEC uspGetCountryforCo2Emmision ?',$params);
          
            $sorted_data = array();
           if($data){
           foreach($data as $k => $value){
                $sorted_data[$value->id]["id"] = $value->id;
                $sorted_data[$value->id]["Country"] = $value->name;
                              
            }
            $message = "Country    retrieved successfully";
        } else{
            $sorted_data = (Object)[];
            $message = 'data not found';
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
    } 
    public function GetCo2EmmisionType(Request $request){
        try{
            $params = array(
               
                $UserId =$this->user_data['UserID'],
            );
            $data = DB::select('EXEC uspGetCo2EmmisionType ?',$params);
          
            $sorted_data = array();
           if($data){
           foreach($data as $k => $value){
                $sorted_data[$value->Text]["Text"] = $value->Text;
                $sorted_data[$value->Text]["Value"] = $value->Value;
                              
            }
            $message = "Country    retrieved successfully";
        } else{
            $sorted_data = (Object)[];
            $message = 'data not found';
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
    } 
    public function GetUOMDetails(Request $request){
        try{
            $params = array(
               
                $UserId =$this->user_data['UserID'],
            );
            $data = DB::select('EXEC uspGetUOMDetails ?',$params);
          
            $sorted_data = [];
           if($data){
           foreach($data as $k => $value){
                $sorted_data[$value->UOMID]["UOMID"] = $value->UOMID;
                $sorted_data[$value->UOMID]["UOMTitle"] = $value->UOMTitle;
                              
            }
            $message = "UOM details  retrieved successfully";
            return $this->sendResponse($sorted_data, $message);
        } else{
            $message = "No record found.";
            return $this->sendResponse($data, $message);
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
    } 
}