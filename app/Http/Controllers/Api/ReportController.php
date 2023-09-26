<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
//use Illuminate\Database\Connectors\SqlServerConnector->getSqlSrvDsn(array $config);
use App\Http\Controllers\Controller;
use DB;
use Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Mail;
use Redirect;
use App\Http\Controllers\EmailController;

class ReportController extends BaseController
{
    public $user_data = [];
    public $payload = [];
    public $dbUserName = "";
    public $dbUserPassword = "";
     /**
     * Instantiate a new GoalSettingController instance.
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
        Author : Prabir
        Date   : 23/10/2019
        Name   : getServices
        Params : None
        Type   : GET
        Purpose: To Get Services Count
    */ 

    public function uspGetServicesCount(Request $request, $ServiceId){

        try{  
            $userId = $this->user_data['UserID'];          
            $data = DB::select(' EXEC uspGetServices ?,?',array($ServiceId, $userId));
			$count_service = count($data);
            $total = $count_service;
            $message = "services retrieved.";

            return $this->sendResponse($total, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
    }

    public function uspGetServicesCountNew(Request $request, $ServiceId){

        try{  
            $userId = $this->user_data['UserID'];          
            $data1 = DB::select(' EXEC uspGetServices ?,?',array(1, $userId));
            $data2 = DB::select(' EXEC uspGetServices ?,?',array(2, $userId));
            $data3 = DB::select(' EXEC uspGetServices ?,?',array(3, $userId));
            $count_service1 = count($data1);
            $count_service2 = count($data2);
            $count_service3 = count($data3);
            $array = array('benchmark'=>$data1, 'capability'=>$data2, 'kpi'=>$data3);
            $message = "services retrieved.";

            return $this->sendResponse($array, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
    }


    /*
        Author : Prabir
        Date   : 23/10/2019
        Name   : getServices
        Params : None
        Type   : GET
        Purpose: To Get Services
    */ 

    public function uspGetServices(Request $request, $ServiceId){

        try{   
            $userId = $this->user_data['UserID'];          
            $data = DB::select(' EXEC uspGetServices ?,?',array($ServiceId, $userId));
                if(count($data) > 0){
                    $message = "services retrieved.";
                }else{
                    //$data = (Object)[];
                    $message = "No data found";
                }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
    }

    /*
        Author : Prabir
        Date   : 23/10/2019
        Name   : getReports
        Params : None
        Type   : GET
        Purpose: To Get Reports
    */

    public function uspGetReports(Request $request, $ServiceId){
     	try{
        	$userId = $this->user_data['UserID'];
            $data = DB::select(' EXEC uspGetReports ?,?',array($userId, $ServiceId));
          		if(count($data) > 0){
                    $message = "reports retrieved.";
                }else{
                    //$data = (Object)[];
                    $message = "No data found";
                }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
    }
	
	/*
        Author : Prabir
        Date   : 01/11/2019
        Name   : uspGetL1ProcessSummaryPie
        Params : @project_id
        Type   : GET
        Purpose: To get Level 1 process summary
    */
    public function getL1ProcessSummaryPie($decompositionProjectId){
        try{
			$userId = $this->user_data['UserID'];
            $data = DB::select(' EXEC uspGetL1ProcessSummaryPie ?',array($decompositionProjectId ));  
			$resp = DB::select(' EXEC GetCapabilityModellingProjectUserDetails ?,?', array($userId, $decompositionProjectId));
            if($data){
				
				$data1['scores'] = $data;
				$data1['projectName'] = $resp[0]->CapModProjectName;
                $message = "level 1 process summary retrieved.";
            }else{
                $data1 = [];
				$data1['scores'] = array();
				$data1['projectName'] = $resp[0]->CapModProjectName;
                $message = "No data found";
            }          
        return $this->sendResponse($data1, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Prabir
        Date   : 01/11/2019
        Name   : getL1ProcessSummary
        Params : @project_id
        Type   : GET
        Purpose: To get Level 1 process summary
    */
    public function getL1ProcessSummary($decompositionProjectId){
        try{
			$userId = $this->user_data['UserID'];
            $data = DB::select(' EXEC uspGetL1ProcessSummary ?',array($decompositionProjectId ));  
            if($data){
				$resp = DB::select(' EXEC GetCapabilityModellingProjectUserDetails ?,?', array($userId, $decompositionProjectId));
				$data1['scores'] = $data;
				$data1['projectName'] = $resp[0]->CapModProjectName;
				//print_r($resp);
                $message = "level 1 process summary retrieved.";
            }else{
                $data1 = [];
                $message = "No data found";
            }          
        return $this->sendResponse($data1, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Prabir
        Date   : 01/11/2019
        Name   : getL1Processes
        Params : @project_id
        Type   : GET
        Purpose: To get Level 1 process
    */
    public function getL1Processes($decompositionProjectId, $order){
        try{
            $data = DB::select(' EXEC uspGetL1Processes ?, ?',array($decompositionProjectId, $order ));
            if($data){
                $message = "level 1 process retrieved.";
            }else{
                $data = [];
                $message = "No data found";
            }  
        return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Prabir
        Date   : 11/11/2019
        Name   : getDecompositionReportAvergaeScore
        Params : @project_id
        Type   : GET
        Purpose: To get report average score
    */
    public function getDecompositionReportAvergaeScore($decompositionProjectId){
        try{
			$userId = $this->user_data['UserID'];
            $data = DB::select(' EXEC uspGetL1ProcessSummary ?',array($decompositionProjectId ));  
            if($data){
				$resp = DB::select(' EXEC GetCapabilityModellingProjectUserDetails ?,?', array($userId, $decompositionProjectId));
				//print_r($data);print_r($resp);
                $functions = array_unique(array_column($data, "FunctionName", "FunctionID"));
                $functionsUnique = array_values(array_unique(array_column($data, "FunctionName")));
                $phases = array_unique(array_column($data, "PhaseName","PhaseID"));
                $data1['score'] = [];
                foreach($phases as $pKey=>$phase)
                {
                   
                    $data3['key']     = $phase;
                    $data3['PhaseID'] = $pKey;
                    $data3['scoreData'] = array();
                    foreach($functions as $fKey=> $function)
                    {
                        foreach($data as $value)
                        {
                            if(($value->FunctionName == $function) && ($value->PhaseName == $phase))
                            {
                                $data3['scoreData'][] = array('score' => $value->AverageScore, 'FunctionID' => $fKey);
                            }
                        }
                    }
                    $data1['score'][] = $data3;
                }
                $data1['functions'] = $functionsUnique;
                $data1['projectName'] = $resp[0]->CapModProjectName;
                //$data1['data'] = $array;
                $message = "level 1 process retrieved.";
            }else{
                $data1 = [];
                $message = "No data found";
            }  
            return $this->sendResponse($data1, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Prabir
        Date   : 06/11/2019
        Name   : getSpiralReport
        Params : @project_id
        Type   : GET
        Purpose: To get spiral report
    */
    public function getSpiralReport($decompositionProjectId, $FuncionId, $PhaseId){
        try{
			$userId = $this->user_data['UserID'];
			$dataFunction = DB::select(' EXEC uspGetFunctionDetails ?', array($FuncionId));
			$dataPhase = DB::select(' EXEC uspGetPhaseDetails ?', array($PhaseId));
			$resp = DB::select(' EXEC GetCapabilityModellingProjectUserDetails ?,?', array($userId, $decompositionProjectId));
            $data1 = DB::select(' EXEC uspGetSpiralReportForDecomposingModel ?, ?, ?, ?',array($decompositionProjectId, 'l1', $FuncionId, $PhaseId ));
            $data2 = DB::select(' EXEC uspGetSpiralReportForDecomposingModel ?, ?, ?, ?',array($decompositionProjectId, 'l2', $FuncionId, $PhaseId ));
            $data3 = DB::select(' EXEC uspGetSpiralReportForDecomposingModel ?, ?, ?, ?',array($decompositionProjectId, 'l3', $FuncionId, $PhaseId ));
            $data4 = DB::select(' EXEC uspGetSpiralReportForDecomposingModel ?, ?, ?, ?',array($decompositionProjectId, 'l4', $FuncionId, $PhaseId ));
            $data5 = DB::select(' EXEC uspGetSpiralReportForDecomposingModel ?, ?, ?, ?',array($decompositionProjectId, 'l5', $FuncionId, $PhaseId ));
            $data[0] = $data1;
            $data[1] = $data2;
            $data[2] = $data3;
            $data[3] = $data4;
            $data[4] = $data5;
			$data['FunctionName'] = $dataFunction[0];
			$data['PhaseName'] = $dataPhase[0];
            if($data){
                $message = "Spiral report retrieved.";
            }else{
                $data = [];
                $message = "No data found";
            }  
        return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
     /*
        Author : Abdul
        Date   : 29/11/2019
        Name   : getDecompositionReportProcessRanking
        Params : @UserID,@DecompositionProjectID,@FunctionID,@PhaseID
        Type   : GET
        Purpose: To get decomposition report process ranking
    */ 
    public function getDecompositionReportProcessRanking ( Request $request,$DecompositionProjectID,$FunctionID,$PhaseID ){
        try{
            //uspGetDecompositionReportProcessRanking
            /*$validator = Validator::make($request->all(), [
                'DecompositionProjectID'  => 'required|numeric',
                'FunctionID'             => 'required|numeric',
                'PhaseID'                => 'required|numeric',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
           

            $params = [
                $this->user_data['UserID'],
                $requestData['DecompositionProjectID'],
                $requestData['FunctionID'],
                $requestData['PhaseID']
            ];*/
            $params = [
                $this->user_data['UserID'],
                $DecompositionProjectID,
                $FunctionID,
                $PhaseID
            ];
           
            $data = DB::select(' EXEC uspGetDecompositionReportProcessRanking ?,?,?,?',$params );

            //$data = DB::select(' EXEC uspGetDecompositionReportProcessRanking ?,?,?,?',array(1015,1062,1,1 )); 
            if( count($data) > 0){
                $message = "Decomposition report process ranking retrieved successfully.";
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
        Date   : 02/12/2019
        Name   : getReportsAccess
        Params : @UserID
        Type   : GET
        Purpose: To get report access
    */ 
    public function getReportsAccess( Request $request, $UserID ){
        try{
            $data = DB::select(' EXEC uspGetReportsAccess ?',array($UserID) );
            //print_r($data); exit;
            if( count($data) > 0){
                $reports = [];
                foreach ($data as $key => $value) {
                    $reports[$key]['ServiceID']    = $value->ServiceID;
                    $reports[$key]['ServicesName'] = $value->ServicesName;
                    $reports[$key]['report']       = array(
                        "ReportID"    => $value->ReportID,
                        "ReportTitle" => $value->ReportTitle,
                        "IsSelected" => $value->IsSelected,
                    );
                }
                
                $message = "Report access retrieved successfully.";
                return $this->sendResponse($reports, $message);
            }else{
                $message = "No record found.";
                return $this->sendResponse($data, $message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 06/12/2019
        Name   : saveReportAccess
        Params : @UserID
        Type   : GET
        Purpose: To save report access
    */ 
    public function saveReportAccess( Request $request){
        try{
           $validator = Validator::make($request->all(), [
                'UserID'            => 'required|numeric',
                "permissions" => "required|array|min:1"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $flag = 0;
            $UserReportAccessName = "";
            foreach ($requestData['permissions'] as $key => $value) {
               
               $params_array = [
                    $this->user_data['UserID'],
                    $requestData['UserID'],
                    $value['ServiceID'],
                    $value['ReportID'],
                    $value['AccessType'],
                    $UserReportAccessName 
                ];
                $data = DB::select(' EXEC uspSaveReportAccess ?,?,?,?,?,?',$params_array );
                
                $flag = 1; 
            }
            if(  $flag==1 ) {
                $message = "Report access saved successfully.";
                return $this->sendResponse($data, $message);
            }else{
                $message = "An error occured.";
                return $this->sendResponse($data, $message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }    
}
