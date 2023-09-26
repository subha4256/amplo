<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Mail;
use Redirect;
use App\Http\Controllers\EmailController;
use Illuminate\Support\Facades\Crypt;

class BalancedScoreCardController extends BaseController
{
    public $user_data = [];
    public $payload = [];
    public $dbUserName = "";
    public $dbUserPassword = "";


    /**
     * Updated by Ashim after resolving conflict locally.
     */

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
        Author : Abdul
        Date   : 27/03/2020
        Name   : getKpis
        Params : None
        Type   : GET
        Purpose: To Get KPIS
    */ 
    public function getKpis(Request $request,$VersionId, $BalanceScoreCardId){
       
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $userId,
                $VersionId,
                $BalanceScoreCardId
            ];
           
            $kpiData = array();
            $Kpis = array();
            $iZero = array();
            $finaliZeroKpis = array();
            $data = DB::select(' EXEC uspGetKpis ?,?,?',$params_array);
           
            $kpiData = array();
            if(count($data) > 0){
                $json_decode =json_decode(json_encode($data),true);
               
                foreach ($json_decode as $key => $value) {
                    $kpiData[$value['KPISetID']]['KPISetID'] = $value['KPISetID'];
                    $kpiData[$value['KPISetID']]['KPISetTitle'] = $value['KPISetTitle'];
                    $kpiData[$value['KPISetID']]['KPI'][$value['KPIID']]['KPIID'] = $value['KPIID'];
                    $kpiData[$value['KPISetID']]['KPI'][$value['KPIID']]['KPITitle'] = $value['KPITitle'];
                    $kpiData[$value['KPISetID']]['KPI'][$value['KPIID']]['Target'] = $value['Target'];
                    $kpiData[$value['KPISetID']]['KPI'][$value['KPIID']]['ControlLevers'][$value['KPIID']]['KPIControlLeversID'] = $value['KPIControlLeversID'];
                    $kpiData[$value['KPISetID']]['KPI'][$value['KPIID']]['ControlLevers'][$value['KPIID']]['ControlLeversTitle'] = $value['ControlLeversTitle'];
                     $kpiData[$value['KPISetID']]['KPI'][$value['KPIID']]['ControlLevers'][$value['KPIID']]['ControlLeverTarget'] = $value['ControlLeverTarget'];
                     $kpiData[$value['KPISetID']]['KPI'][$value['KPIID']]['ControlLevers'][$value['KPIID']]['CheckStatus'] = $value['CheckStatus'];
                }

                $finaliZeroKpis = array_values($kpiData);
                foreach ($finaliZeroKpis as $key => $value) {
                    $finaliZeroKpis[$key]['KPI']= array_values($value['KPI']);
                    foreach($finaliZeroKpis[$key]['KPI'] as $k1=>$v1){
                        $finaliZeroKpis[$key]['KPI'][$k1]['ControlLevers']= array_values($v1['ControlLevers']);
                    }
                }
                  
                $message = "Kpis data retrieved.";
            }else{
                //$data = (Object)[];
                $message = "No data found";
            }
            return $this->sendResponse($finaliZeroKpis, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    
    /*
        Author : Abdul
        Date   : 27/03/2020
        Name   : getBscCategories
        Params : None
        Type   : GET
        Purpose: To Get Bsc Categories
    */ 
    public function getBscCategories(Request $request, $CategoryTitle,$BalanceScoreCardId){
       
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $userId,
                $CategoryTitle,
                $BalanceScoreCardId
            ];
            //print_r($params_array);die;
            $data = DB::select(' EXEC uspGetCategories ?,?,?',$params_array);
            if(count($data) > 0){
                $message = "Bsc categories data retrieved.";
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
        Author : Abdul
        Date   : 27/03/2020
        Name   : saveBscConfig
        Params : None
        Type   : POST
        Purpose: To Save Bsc Config
    */
    public function saveBscConfig(Request $request){
       
        try{
            $validator = Validator::make($request->all(), [
                'title'              => 'required|between:2,20',
                'goalsetting'        => 'array',
                'strategicobjective' => 'array',
                'Ovals'              => 'array',  
                'connections'        => 'array'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId = $this->user_data['UserID'];
            //echo json_encode($requestData);die;
            $params_array = [
                $userId,
                json_encode($requestData)
            ];
           
            $data = DB::select(' EXEC uspSaveBscConfig ?,?', $params_array);
           
             if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->messageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
    }
    /*
        Author : Abdul
        Date   : 27/03/2020
        Name   : getBscConfig
        Params : None
        Type   : GET
        Purpose: To GET Bsc Config
    */
    public function getBscConfig(Request $request,$BalanceScoreCardId){
        try{
            $params_array = [
                $BalanceScoreCardId
            ];
            
            $header              = DB::select(' EXEC uspGetBscConfigHeader ?',$params_array);
            $vision              = DB::select(' EXEC uspGetBscConfigVision ?',$params_array);
            $purpose             = DB::select(' EXEC uspGetBscConfigBusinessPurpose ?',$params_array);
            $StrategicPriorities    = DB::select(' EXEC uspGetBscConfigStrategicPriorities ?',$params_array);
            $StrategicResults       = DB::select(' EXEC uspGetBscConfigStrategicResults ?',$params_array);
            
            $Kpis           = DB::select(' EXEC uspGetBscConfigKpi ?',$params_array);
            $StrategicObjectiveDetails    = DB::select(' EXEC uspGetBscConfigStrategicObjectiveDetails ?',$params_array);
            $connection   = DB::select(' EXEC uspGetBscConfigConnection ?',$params_array);
            //print_r($header);
            //print_r($vision);
            //print_r($purpose);
            //print_r($StrategicPriorities);
            //print_r($StrategicResults);
            //print_r($StrategicObjectiveDetails);
            //print_r($Kpis);
            //print_r($connection);
            //die;
            $purposeData = array();
            $strategicPrioritiesData = array() ;
            $StrategicResultsData = array() ;
            $ovals = array();
            $KpisData = array();
            foreach ($purpose as $key => $value) {
                $purposeData[$key]['id'] = $value->BscBusinessPurposeId;
                $purposeData[$key]['description'] = $value->BscBusinessPurposeDescription;
            }
            foreach ($StrategicPriorities as $key => $value) {
                $strategicPrioritiesData[$key]['id'] = $value->BscStrategicPrioritiesId;
                $strategicPrioritiesData[$key]['description'] = $value->BscStrategicPrioritiesDescription;
            }
            foreach ($StrategicResults as $key => $value) {
                $StrategicResultsData[$key]['id'] = $value->BscStrategicResultsId;
                $StrategicResultsData[$key]['description'] = $value->BscStrategicResultsDescription;
            }
            foreach ($StrategicObjectiveDetails as $key => $value) {
               $ovals[$key]['CategoryId'] = $value->CategoryId; 
               $ovals[$key]['OvalId'] = $value->BscStrategicObjectivesId;
               $ovals[$key]['OvalText'] = $value->BscStrategicObjectiveTitle;
               $ovals[$key]['OvalColor'] = $value->color;
               $ovals[$key]['OvalColor'] = $value->color;
               $ovals[$key]['x'] = $value->x;
               $ovals[$key]['y'] = $value->y;
               $ovals[$key]['KPIID'] = $value->KPIID;
               $ovals[$key]['KPIControlLeversID'] = $value->KPIControlLeversID;
               $ovals[$key]['KPIControlLeversType'] = $value->KPIControlLeversType;
            }
            foreach ($Kpis as $key => $value) {
                
                $KpisData[$value->CategoryId]['CategoryId'] = $value->CategoryId;
                $KpisData[$value->CategoryId]['title'] = $value->Category;
                if($value->KpiId!=null){
                    $KpisData[$value->CategoryId]['Kpi'][$value->KpiId] = array('KpiId'=>$value->KpiId,'KpiName'=>$value->KPITitle,'Target'=>$value->Target);
                }else{
                    $KpisData[$value->CategoryId]['Kpi'] = array();
                }
            }
            $iZero = array_values($KpisData);
            foreach ($iZero as $key => $value) {
                if(isset($value['Kpi'])){
                    $iZero[$key]['Kpi'] = array_values($value['Kpi']);
                }
            }
            //print_r($iZero);
            //echo "================";echo "<br>";die;
            $data = array(
                "id"=> $header[0]->BalanceScoreCardId,
                "title"=>$header[0]->BalanceScoreCardName,
                "goalsetting"=> array(
                    array("id"=>$vision[0]->BscCorporateVisionId,"title"=>"Vision","description"=>$vision[0]->BscCorporateVisionDescription),
                    array("id"=>0,"title"=>"Purpose","description"=>$purposeData),
                    array("id"=>0,"title"=>"StrategicPriorities","description"=>$strategicPrioritiesData),
                    array("id"=>0,"title"=>"StrategicResults","description"=>$StrategicResultsData),
                ),
                "strategicobjective"=>$iZero,
                "Ovals"=>$ovals,
                "connections"=>$connection
            );
            //echo json_encode($data);
            //die;
            if(count($data) > 0){
                $message = "BSC data retrieved.";
                return $this->sendResponse($data, $message);
            }else{
                $message = "No data found";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
    }     
    /*
        Author : Abdul
        Date   : 27/03/2020
        Name   : getGoalSetting
        Params : None
        Type   : GET
        Purpose: To Get Goal Setting
    */ 

     public function getGoalSettings(Request $request, $BalanceScoreCardId){
     	try{
            $params_array = [
                $BalanceScoreCardId
            ];
        	$visionData             = DB::select(' EXEC uspGetVision ?',$params_array);
            $purposeData             = DB::select(' EXEC uspGetPurpose ?',$params_array);
            $strategicPrioritiesData = DB::select(' EXEC uspGetStrategicPriorities ?',$params_array);
            $uspGetStrategicResultsData = DB::select(' EXEC uspGetStrategicResults ?',$params_array);
            print_r($visionData);
            print_r($purposeData);
            print_r($strategicPrioritiesData);
            print_r($uspGetStrategicResultsData);die;
      		/*if(count($data) > 0){
                $message = "user data retrieved.";
            }else{
                $message = "No data found";
            }*/
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
    }
    /*
        Author : Abdul
        Date   : 03/04/2020
        Name   : getBSCReportKpi
        Params : None
        Type   : GET
        Purpose: To Get BSC Report
    */
    public function getBSCReportKpi(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'BalanceScoreCardId'=> 'required|integer'
                //'FromDate'          => 'required|date_format:Y-m-d',
                //'ToDate'            => 'required|date_format:Y-m-d'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId = $this->user_data['UserID'];
            //echo json_encode($requestData);die;
            
            $params_array = [
                $requestData['BalanceScoreCardId']
            ];
            /*$params_array_report = [
                $requestData['BalanceScoreCardId'],
                $requestData['FromDate'],
                $requestData['ToDate'],
            ];*/
            $header              = DB::select(' EXEC uspGetBscConfigHeader ?',$params_array);
            $vision              = DB::select(' EXEC uspGetBscConfigVision ?',$params_array);
            $purpose             = DB::select(' EXEC uspGetBscConfigBusinessPurpose ?',$params_array);
            $StrategicPriorities    = DB::select(' EXEC uspGetBscConfigStrategicPriorities ?',$params_array);
            $StrategicResults       = DB::select(' EXEC uspGetBscConfigStrategicResults ?',$params_array);
            $StrategicObjectiveDetails    = DB::select(' EXEC uspGetBscConfigStrategicObjectiveDetails ?',$params_array);
            
            //$Kpis           = DB::select(' EXEC uspGetBscReportKpi ?,?,?',$params_array_report);
            $Kpis           = DB::select(' EXEC uspGetBscConfigKpi ?',$params_array);
            
            $connection   = DB::select(' EXEC uspGetBscConfigConnection ?',$params_array);
            //print_r($header);
            //print_r($vision);
            //print_r($purpose);
            //print_r($StrategicPriorities);
            //print_r($StrategicResults);
            //print_r($StrategicObjectiveDetails);
            //print_r($Kpis);
            //print_r($connection);
            //die;
            $purposeData = array();
            $strategicPrioritiesData = array() ;
            $StrategicResultsData = array() ;
            $ovals = array();
            $KpisData = array();
            foreach ($purpose as $key => $value) {
                $purposeData[$key]['id'] = $value->BscBusinessPurposeId;
                $purposeData[$key]['description'] = $value->BscBusinessPurposeDescription;
            }
            foreach ($StrategicPriorities as $key => $value) {
                $strategicPrioritiesData[$key]['id'] = $value->BscStrategicPrioritiesId;
                $strategicPrioritiesData[$key]['description'] = $value->BscStrategicPrioritiesDescription;
            }
            foreach ($StrategicResults as $key => $value) {
                $StrategicResultsData[$key]['id'] = $value->BscStrategicResultsId;
                $StrategicResultsData[$key]['description'] = $value->BscStrategicResultsDescription;
            }
            foreach ($StrategicObjectiveDetails as $key => $value) {
               $ovals[$key]['CategoryId'] = $value->CategoryId; 
               $ovals[$key]['OvalId'] = $value->BscStrategicObjectivesId;
               $ovals[$key]['OvalText'] = $value->BscStrategicObjectiveTitle;
               $ovals[$key]['OvalColor'] = $value->color;
               $ovals[$key]['OvalColor'] = $value->color;
               $ovals[$key]['x'] = $value->x;
               $ovals[$key]['y'] = $value->y;
            }
            foreach ($Kpis as $key => $value) {
                $KpisData[$value->CategoryId]['CategoryId'] = $value->CategoryId;
                $KpisData[$value->CategoryId]['title'] = $value->Category;
                $KpisData[$value->CategoryId]['Kpi'][] = array('KpiId'=>$value->KpiId,'KpiName'=>$value->KPITitle,'Target'=>$value->Target);
            }
            $iZero = array_values($KpisData);
            
            $data = array(
                "id"=> $header[0]->BalanceScoreCardId,
                "title"=>$header[0]->BalanceScoreCardName,
                "goalsetting"=> array(
                    array("id"=>$vision[0]->BscCorporateVisionId,"title"=>"Vision","description"=>$vision[0]->BscCorporateVisionDescription),
                    array("id"=>0,"title"=>"Purpose","description"=>$purposeData),
                    array("id"=>0,"title"=>"StrategicPriorities","description"=>$strategicPrioritiesData),
                    array("id"=>0,"title"=>"StrategicResults","description"=>$StrategicResultsData),
                ),
                "strategicobjective"=>$iZero,
                "Ovals"=>$ovals,
                "connections"=>$connection
            );
            //echo json_encode($data);
            //die;
            if(count($data) > 0){
                $message = "Report retrieved.";
                return $this->sendResponse($data, $message);
            }else{
                $message = "No data found";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
    }
    /*
        Author : Abdul
        Date   : 06/04/2020
        Name   : getBscReportKpiActual
        Params : None
        Type   : GET
        Purpose: To Get BSC Report Actual
    */
    public function getBscReportKpiActual(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'BalanceScoreCardId'=> 'required|integer',
                'FromDate'          => 'required|date_format:Y-m-d',
                'ToDate'            => 'required|date_format:Y-m-d'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId = $this->user_data['UserID'];
            
            $params_array = [
                $requestData['BalanceScoreCardId']
            ];
            $params_array_report = [
                $requestData['BalanceScoreCardId'],
                $requestData['FromDate'],
                $requestData['ToDate'],
            ];
            $header              = DB::select(' EXEC uspGetBscConfigHeader ?',$params_array);
            $vision              = DB::select(' EXEC uspGetBscConfigVision ?',$params_array);
            $purpose             = DB::select(' EXEC uspGetBscConfigBusinessPurpose ?',$params_array);
            $StrategicPriorities    = DB::select(' EXEC uspGetBscConfigStrategicPriorities ?',$params_array);
            $StrategicResults       = DB::select(' EXEC uspGetBscConfigStrategicResults ?',$params_array);
            $StrategicObjectiveDetails    = DB::select(' EXEC uspGetBscConfigStrategicObjectiveDetails ?',$params_array);
            
            $Kpis           = DB::select(' EXEC uspGetBscReportKpiActual ?,?,?',$params_array_report);
            $connection   = DB::select(' EXEC uspGetBscConfigConnection ?',$params_array);
            //print_r($header);
            //print_r($vision);
            //print_r($purpose);
            //print_r($StrategicPriorities);
            //print_r($StrategicResults);
            //print_r($StrategicObjectiveDetails);
            //print_r($Kpis);
            //print_r($connection);
            //die;
            $purposeData = array();
            $strategicPrioritiesData = array() ;
            $StrategicResultsData = array() ;
            $ovals = array();
            $KpisData = array();
            foreach ($purpose as $key => $value) {
                $purposeData[$key]['id'] = $value->BscBusinessPurposeId;
                $purposeData[$key]['description'] = $value->BscBusinessPurposeDescription;
            }
            foreach ($StrategicPriorities as $key => $value) {
                $strategicPrioritiesData[$key]['id'] = $value->BscStrategicPrioritiesId;
                $strategicPrioritiesData[$key]['description'] = $value->BscStrategicPrioritiesDescription;
            }
            foreach ($StrategicResults as $key => $value) {
                $StrategicResultsData[$key]['id'] = $value->BscStrategicResultsId;
                $StrategicResultsData[$key]['description'] = $value->BscStrategicResultsDescription;
            }
            foreach ($StrategicObjectiveDetails as $key => $value) {
               $ovals[$key]['CategoryId'] = $value->CategoryId; 
               $ovals[$key]['OvalId'] = $value->BscStrategicObjectivesId;
               $ovals[$key]['OvalText'] = $value->BscStrategicObjectiveTitle;
               $ovals[$key]['OvalColor'] = $value->color;
               $ovals[$key]['OvalColor'] = $value->color;
               $ovals[$key]['x'] = $value->x;
               $ovals[$key]['y'] = $value->y;
            }
            foreach ($Kpis as $key => $value) {
               
                    $KpisData[$value->CategoryId]['CategoryId'] = $value->CategoryId;
                    $KpisData[$value->CategoryId]['title'] = $value->Category;
                    if($value->KpiId!=null){
                        $net = "";
                        $actual = "";
                        if(!empty($value->Actual)){
                            $temp = explode('#', $value->Actual);
                            $net = $temp[0] ?? "";
                            $actual = $temp[1] ?? "";
                        }
                        $KpisData[$value->CategoryId]['Kpi'][$value->KpiId] = array('KpiId'=>$value->KpiId,'KpiName'=>$value->KPITitle,'Target'=>$value->Target,'Actual' => $actual, 'Net' => $net);
                    }else{
                         $KpisData[$value->CategoryId]['Kpi'] = array();
                    }
                }
            $iZero = array_values($KpisData);
            foreach ($iZero as $key => $value) {
                if(isset($value['Kpi'])){
                    $iZero[$key]['Kpi'] = array_values($value['Kpi']);
                }
            }
            $data = array(
                "id"=> $header[0]->BalanceScoreCardId,
                "title"=>$header[0]->BalanceScoreCardName,
                "goalsetting"=> array(
                    array("id"=>$vision[0]->BscCorporateVisionId,"title"=>"Vision","description"=>$vision[0]->BscCorporateVisionDescription),
                    array("id"=>0,"title"=>"Purpose","description"=>$purposeData),
                    array("id"=>0,"title"=>"StrategicPriorities","description"=>$strategicPrioritiesData),
                    array("id"=>0,"title"=>"StrategicResults","description"=>$StrategicResultsData),
                ),
                "strategicobjective"=>$iZero,
                "Ovals"=>$ovals,
                "connections"=>$connection
            );
            //echo json_encode($data);
            //die;
            if(count($data) > 0){
                $message = "Report retrieved.";
                return $this->sendResponse($data, $message);
            }else{
                $message = "No data found";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
    } 
     /*
        Author : Abdul
        Date   : 06/04/2020
        Name   : getBalanceScoreCard
        Params : @@UserId
        Type   : GET
        Purpose: To Get Balanced Score Card
    */
    public function getBalanceScoreCard(Request $request){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
               $userId
            ];
            
            $data = DB::select(' EXEC uspGetBalanceScoreCard ?',$params_array);
            
            if(count($data) > 0){
                $message = "Balanced Score Card retrieved.";
                return $this->sendResponse($data, $message);
            }else{
                $message = "No data found";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
    }
    /*
        Author : Abdul
        Date   : 30/05/2020
        Name   : getAllBSC
        Params : None
        Type   : GET
        Purpose: To get all Bsc
    */
    public function getAllBSC(Request $request){
        try{
            $userId = $this->user_data['UserID'];
           
            $data = DB::select(' EXEC uspListBscs ');
            
            if(count($data) > 0){
                $message = "Balanced Score Card retrieved.";
                return $this->sendResponse($data, $message);
            }else{
                $message = "No data found";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
    }
    /*
        Author : Abdul
        Date   : 30/05/2020
        Name   : saveBscCategory
        Params : None
        Type   : POST
        Purpose: To save bsc category
    */
    public function saveBscCategory(Request $request){
        try{
            $userId   = $this->user_data['UserID'];
            $clientId = $this->user_data['ClientID'];
            
            $requestData = $request->all();
            $params_array = array(
                $requestData['Id'],
                $requestData['Name'],
                $requestData['Description'],
                $requestData['EndDate'],
                $requestData['ActiveFlag'],
                $clientId,
                $userId
            );
           
            $data = DB::select(' EXEC uspSaveBscCategory ?,?,?,?,?,?,?', $params_array);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
    } 
    /*
        Author : Abdul
        Date   : 30/05/2020
        Name   : deleteBsc
        Params : None
        Type   : GET
        Purpose: To delete balanced score card
    */
    public function deleteBsc(Request $request, $BalanceScoreCardId){
        try{
            $userId   = $this->user_data['UserID'];
            $clientId = $this->user_data['ClientID'];
            
            $requestData = $request->all();
            $params_array = array(
                $BalanceScoreCardId
            );
           
            $data = DB::select(' EXEC uspDeleteBalanceScoreCard ?', $params_array);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
    }   
}
