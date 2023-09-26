<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Controllers\Api\BaseController as BaseController;
use DB;
use Illuminate\Support\Facades\Log;
use Validator;
use JWTAuth;
use App\Models\Common;
use PHPExcel; 
use PHPExcel_IOFactory;
use PHPExcel_Style_Fill;
use PHPExcel_Style_Border;
use PHPExcel_Style_Protection;

class KpiController extends BaseController

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
     Author : Amit
     Date   : 16/10/2019
     Name   : addKpi
     Params : None
     Type   : POST
     Purpose: To save KPI
     */
    
    public function saveKpi(Request $request){
    	try{
    		$data = true;
    		$userId = $this->user_data['UserID'];
    		$clientId = $this->user_data['ClientID'];
    		$inputJson = json_encode($request->input('inputJson'));
    		$data = DB::select(' EXEC uspSaveKPI ?,?,?',array($clientId,$userId,$inputJson));
    		//print_r(array($clientId,$userId,$inputJson));
    		return $this->sendResponse($data[0], $data[0]);
    	}catch(\Exception $e){
    		return $this->sendError($e->getMessage());
    	}
    	
    }
    
    public function getKpiDetail($kpiId, $kpiSetId){
        try{
            $data1 = DB::select(' EXEC uspGetKpiDetail ?,?', array($kpiSetId, $kpiId));
            $data2 = DB::select(' EXEC uspGetKpiControlLeversDetail ?', array($kpiId));
            $Inhibitors   = array();
            $Capabilities = array();
            $i =0;
            foreach($data2 as $value){
                $InhibitorsData = DB::select(' EXEC uspGetKPIKPIInhibitorsDetail ?', array($value->KPIControlLeversID));
                $CapabilitiesData = DB::select(' EXEC uspGetKPIKPICapabilitiesDetail ?', array($value->KPIControlLeversID));
                if(count($InhibitorsData) > 0){
                    foreach ($InhibitorsData as $key => $value) {
                       $Inhibitors[$i] = $value;
                        $i++;
                    }
                }
                if(count($CapabilitiesData) > 0){
                    foreach ($CapabilitiesData as $key => $value) {
                       $Capabilities[$i] = $value;
                        $i++;
                    }
                }

            }
            $array = array(
                'details'      => $data1, 
                'controls'     => $data2, 
                'inhibitors'   => $Inhibitors, 
                'capabilities' => $Capabilities);
            if($data1){
                $message = "kpi details retrived.";
            }else{
                $message = "Error Occurred";
            }
            return $this->sendResponse($array, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
   }

   public function addKpi(Request $request){
        try{
            //print_r($request->input()); exit;
            $data = true;
            $userId = $this->user_data['UserID'];
            $validator = Validator::make($request->all(), [
                'business_outcome' => 'required|max:512',
                'business_metrics' => 'required|max:256',
                'estimated_saving' => 'required|max:100',
                'KPITitle' => 'required|max:100',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $kpi_title = $request->input('KPITitle');
            $kpiSetId = $request->input('kpiSetId');
            $businessOutcome = $request->input('business_outcome');
            $businessMetrics = $request->input('business_metrics');
            $businessImpected = "";
            if(array_key_exists('persona_impacted', $request->input())){
                $businessImpected = $request->input('persona_impacted');
            }
            $businessSavings = $request->input('estimated_saving');
            $estimated_target_growth = $request->input('estimated_target_growth');
            $unitOfMeasurement = $request->input('measurement_unit');
            $targetDate = explode('T',$request->input('target_date'));
            $improvementbasis = $request->input('improvement_basis1');
            $auditFrequency = $request->input('audit_frequency');
            //print_r(array($userId,$businessOutcome,$businessMetrics,$businessImpected,$businessSavings,$kpi_title,$estimated_target_growth,$unitOfMeasurement,$targetDate[0],$improvementbasis,$auditFrequency));
            $kpiData = DB::select(' EXEC uspAddKPI ?,?,?,?,?,?,?,?,?,?,?,?',array($userId,$businessOutcome,$businessMetrics,$businessImpected,$businessSavings,$kpi_title,$estimated_target_growth,$unitOfMeasurement,$targetDate[0],$improvementbasis,$auditFrequency,$kpiSetId));
          
                if($kpiData){
                    $kpi_id = $kpiData[0]->KPIID;
                    /*add lever data*/
                        foreach($request->leverData as $v => $value){
                            if(!empty($value['ControlLever'])){								
								if(array_key_exists('business_metrics', $value)){
                                    $BusinessMetrics = $value['business_metrics'];
                                }else{
                                    $BusinessMetrics = "";
                                }
                                if(array_key_exists('ControlLever', $value)){
                                    $control_levers_title = $value['ControlLever'];
                                }else{
                                    $control_levers_title = "";
                                }
                                if(array_key_exists('PersonaImpacted', $value)){
                                    $persona_impected = $value['PersonaImpacted'];
                                }else{
                                    $persona_impected = "";
                                }
                                if(array_key_exists('expected_gains', $value)){
                                    $expected_gains1 = $value['expected_gains'];
                                }else{
                                    $expected_gains1 = "";
                                }
                                if(array_key_exists('measurement_unit', $value)){
                                    $unitOfMeasurement1 = $value['measurement_unit'];
                                }else{
                                    $unitOfMeasurement1 = "";
                                }
                                if(array_key_exists('target_date', $value)){
                                    $explodeTargetDate1 = $value['target_date'];
                                }else{
                                    $explodeTargetDate1 = null;
                                }
                                if(array_key_exists('improvement_basis1', $value)){
                                    $improvementbasis1 = $value['improvement_basis1'];
                                }else{
                                    $improvementbasis1 = "";
                                }
                                if(array_key_exists('audit_frequency', $value)){
                                    $auditFrequency1 = $value['audit_frequency'];
                                }else{
                                    $auditFrequency1 = "";
                                }
                                if(array_key_exists('estimated_annual_saving', $value)){
                                    $estimated_annual_saving = $value['estimated_annual_saving'];
                                }else{
                                    $estimated_annual_saving = "";
                                }
                                //add id
                                    $i = 0;
                                    $j = 0;
                                    if(count($value['inhibitors']) > 0){
                                        foreach($value['inhibitors'] as $k => $inhibtors){
                                            if(array_key_exists('inhibitor', $inhibtors)){
                                                $inhibitor = $inhibtors['inhibitor'];
                                            }else{
                                                $inhibitor = "";
                                            }
                                            if(array_key_exists('Probability', $inhibtors)){
                                                $Probability = $inhibtors['Probability'];
                                            }else{
                                                $Probability = "";
                                            }
                                            if(array_key_exists('ImpactCost', $inhibtors)){
                                                $ImpactCost = $inhibtors['ImpactCost'];
                                            }else{
                                                $ImpactCost = "";
                                            }
                                            $kpi_inhibitors['root'][$i]['ID'] = $k+1;
                                            $kpi_inhibitors['root'][$i]['Name'] = $inhibitor;
                                            $kpi_inhibitors['root'][$i]['Probability'] = $Probability;
                                            $kpi_inhibitors['root'][$i]['ImpactCost'] = $ImpactCost;
                                            $i++;
                                        }
                                    }else{
                                        $kpi_inhibitors = array(); 
                                    }
                                    $kpiInhibitors = json_encode($kpi_inhibitors);
                                    if(count($value['capabilities']) > 0){
                                        foreach($value['capabilities'] as $l => $capabilties){
                                            if(array_key_exists('capability', $capabilties)){
                                                $capability = $capabilties['capability'];
                                            }else{
                                                $capability = "";
                                            }
                                            if(array_key_exists('capex', $capabilties)){
                                                $capex = $capabilties['capex'];
                                            }else{
                                                $capex = "";
                                            }
                                            if(array_key_exists('opex', $capabilties)){
                                                $opex = $capabilties['opex'];
                                            }else{
                                                $opex = "";
                                            }
                                            if(array_key_exists('frequency', $capabilties)){
                                                $frequency = $capabilties['frequency'];
                                            }else{
                                                $frequency = "";
                                            }
                                            if(array_key_exists('CapexSpreadYears', $capabilties)){
                                                $CapexSpreadYears = $capabilties['CapexSpreadYears'];
                                            }else{
                                                $CapexSpreadYears = "";
                                            }
                                            $kpi_capabilties['root'][$j]['ID'] = $l+1;
                                            $kpi_capabilties['root'][$j]['Name'] = $capability;
                                            $kpi_capabilties['root'][$j]['Capex'] = $capex;
                                            $kpi_capabilties['root'][$j]['Opex'] = $opex;
                                            $kpi_capabilties['root'][$j]['Frequency'] = $frequency;
                                            $kpi_capabilties['root'][$j]['CapexSpreadYears'] = $CapexSpreadYears;
                                            $kpi_capabilties['root'][$j]['ExpectedBy'] = date('Y-m-d');
                                            $j++;
                                        }
                                    }else{
                                        $kpi_capabilties = array();
                                    }
                                    $kpiCapabilties = json_encode($kpi_capabilties);
                                    //print_r(array($userId,$kpi_id,$control_levers_title,$persona_impected,$kpiInhibitors,$kpiCapabilties,$expected_gains1,$unitOfMeasurement1,$explodeTargetDate1,$improvementbasis1,$auditFrequency1,$estimated_annual_saving));
                                    $data = DB::statement(' EXEC uspAddKPIControlLevers ?,?,?,?,?,?,?,?,?,?,?,?,?',array($userId,$kpi_id,$control_levers_title,$persona_impected,$kpiInhibitors,$kpiCapabilties,$expected_gains1,$unitOfMeasurement,$explodeTargetDate1,$improvementbasis,$auditFrequency,$estimated_annual_saving,$BusinessMetrics));
                            }
                        }
                        return $this->sendResponse($data, 'data updated');
                    /* add lever data*/
               }else{
                   throw new \Exception("Error Occurred");
                }
                
               // return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    
    /*
        Author : Amit
        Date   : 22/10/2019
        Name   : updateKPI
        Params : None
        Type   : POST
        Purpose: To update KPI details 
    */

        public function updateKPI(Request $request){
            try{
                $userId = $this->user_data['UserID'];
                $validator = Validator::make($request->all(), [
                    'KPIID' => 'required|numeric',
                    'KPITitle' => 'required|max:512',
                    'BusinessOutcome' => 'required|max:512',
                    'BusinessMetrics' => 'required|max:256',
                    'EstimatedSavings' => 'required|max:100',
                ]);

                if ($validator->fails()) {
                    return $this->sendError('Validation Errors',$validator->errors());
                }
                $kpi_id = $request->input('KPIID');
                $kpi_title = $request->input('KPITitle');
                $businessOutcome = $request->input('BusinessOutcome');
                $businessMetrics = $request->input('BusinessMetrics');
                if(array_key_exists('PersonaImpacted', $request->input())){
                    $businessImpected = $request->input('PersonaImpacted');
                }
                $businessSavings = $request->input('EstimatedSavings');
                $expectedTargetGrowth = $request->input('ExpectedTargetGrowth');
                $unitOfMeasurement = $request->input('measurement_unit');
                $targetDate = explode('T',$request->input('target_date'));
                $improvementbasis = $request->input('improvement_basis');
                $auditFrequency = $request->input('audit_frequency');
                //print_r(array($kpi_id,$userId,$kpi_title,$businessOutcome,$businessMetrics,$businessImpected,$businessSavings,$expectedTargetGrowth,$unitOfMeasurement,$targetDate[0],$improvementbasis,$auditFrequency));
                $data = DB::statement(' EXEC uspUpdateKPI ?,?,?,?,?,?,?,?,?,?,?,?',array($kpi_id,$userId,$kpi_title,$businessOutcome,$businessMetrics,$businessImpected,$businessSavings,$expectedTargetGrowth,$unitOfMeasurement,$targetDate[0],$improvementbasis,$auditFrequency));
                return $this->sendResponse($data, 'kpi details updated');
            }catch(\Exception $e){
                return $this->sendError($e->getMessage());
            }
        }
    /*
        Author : Amit
        Date   : 22/10/2019
        Name   : updateKpiControlLevers
        Params : None
        Type   : POST
        Purpose: To update KPI details 
    */
        public function updateKpiControlLevers(Request $request){
            try{
                $userId = $this->user_data['UserID'];
                if(strtoupper($request->input('Action')) != 'DELETE'){

                    $validator = Validator::make($request->all(), [
                        'KPIID' => 'required|numeric',
                        'ControlLeverID' => 'required|numeric',
                        'ControlLeversTitle' => 'required|max:512',
                        'Action' => 'required',
                        //'inhibitors'=> 'required',
                        //'capabilities'=> 'required'
                    ]);


                }else{
                    $validator = Validator::make($request->all(), [
                        'KPIID' => 'required|numeric',
                        'ControlLeverID' => 'required|numeric',
                        'Action' => 'required'
                    ]);
                }
                if ($validator->fails()) {
                    return $this->sendError('Validation Errors',$validator->errors());
                }
            $kpi_id = $request->input('KPIID');
            $control_lever_id = $request->input('ControlLeverID');
            $control_levers_title = $request->input('ControlLeversTitle');
			$BusinessMetrics = "";
			if(array_key_exists('business_metrics', $request->input())){
                $BusinessMetrics = $request->input('business_metrics');
            }
            $persona_impected = "";
            if(array_key_exists('PersonaImpacted', $request->input())){
                $persona_impected = $request->input('PersonaImpacted');
            }
            $action = $request->input('Action');
			if(array_key_exists('inhibitors', $request->input())){
                $requestInhibitors = $request->input('inhibitors');
            }else{
				$requestInhibitors = array();
			}
			if(array_key_exists('inhibitors', $request->input())){
                $requestInhibitors = $request->input('inhibitors');
            }else{
				$requestInhibitors = array();
			}
			if(array_key_exists('capabilities', $request->input())){
                $requestCapabilities = $request->input('capabilities');
            }else{
				$requestCapabilities = array();
			}
            if($request->input('ExpectedTargetGrowth') != null){
                $expectedTargetGrowth = str_replace(array('$',','),'',$request->input('ExpectedTargetGrowth'));
            }else{
                $expectedTargetGrowth = 0;
            }
            $unitOfMeasurement = $request->input('measurement_unit');
            $estimatedSavings = $request->input('estimated_savings');
            $targetDate = $request->input('target_date');
            $improvementbasis = $request->input('improvement_basis');
            $auditFrequency = $request->input('audit_frequency');
            //print_r($request->input());
            //add id
                $i = 0;
                $j = 0;
                if(count($requestInhibitors) > 0){
                    foreach($requestInhibitors as $k => $inhibtors1){
                        $Inhibitor = "";
                        $Probability = "";
                        $ImpactCost = "";
                        if(array_key_exists('Inhibitors', $inhibtors1)){
                            $Inhibitor = $inhibtors1['Inhibitors'];
                        }
                        if(array_key_exists('Probability', $inhibtors1)){
                            $Probability = str_replace('%','',$inhibtors1['Probability']);
                        }
                        if(array_key_exists('ImpactCost', $inhibtors1)){
                            $ImpactCost = str_replace(array('$',','),'',$inhibtors1['ImpactCost']);
                        }
                        $kpi_inhibitors['root'][$i]['ID'] = $k+1;
                        $kpi_inhibitors['root'][$i]['KPIInhibitorsID'] = $inhibtors1['KPIInhibitorsId'];
                        $kpi_inhibitors['root'][$i]['InhibitorsTitle'] = $Inhibitor;
                        $kpi_inhibitors['root'][$i]['Probability'] = $Probability;
                        $kpi_inhibitors['root'][$i]['ImpactCost'] = $ImpactCost;
                        $kpi_inhibitors['root'][$i]['Action'] = isset($inhibtors1['Action'])?$inhibtors1['Action']:'MODIFY';
                        $i++;
                    }
                }else{
                    $kpi_inhibitors = array();
                }
                $kpiInhibitors = json_encode($kpi_inhibitors);
                if(count($requestCapabilities) > 0){
                    foreach($requestCapabilities as $l => $capabilties){
                        if(array_key_exists('Capabilities', $capabilties)){
                            $capability = $capabilties['Capabilities'];
                        }else{
                            $capability = "";
                        }
                        if(array_key_exists('Capex', $capabilties)){
                            $capex = str_replace(array('$',','),'',$capabilties['Capex']);
                        }else{
                            $capex = 0;
                        }
                        if(array_key_exists('Opex', $capabilties)){
                            $opex = str_replace(array('$',','),'',$capabilties['Opex']);
                        }else{
                            $opex = 0;
                        }
                        if(array_key_exists('Frequency', $capabilties)){
                            $frequency = $capabilties['Frequency'];
                        }else{
                            $frequency = "";
                        }
                        if(array_key_exists('CapexSpreadYears', $capabilties)){
                            $CapexSpreadYears = $capabilties['CapexSpreadYears'];
                        }else{
                            $CapexSpreadYears = "";
                        }
                        if(array_key_exists('ExpectedBy', $capabilties)){
                            $ExpectedBy = $capabilties['ExpectedBy'];
                        }else{
                            $ExpectedBy = null;
                        }
                        $kpi_capabilties['root'][$j]['ID'] = $l+1;
                        $kpi_capabilties['root'][$j]['KPICapabilitiesId'] = $capabilties['KPICapabilitiesId'];
                        $kpi_capabilties['root'][$j]['Name'] = $capability;
                        $kpi_capabilties['root'][$j]['Capex'] = $capex;
                        $kpi_capabilties['root'][$j]['Opex'] = $opex;
                        $kpi_capabilties['root'][$j]['Frequency'] = $frequency;
                        $kpi_capabilties['root'][$j]['CapexSpreadYears'] = $CapexSpreadYears;
                        $kpi_capabilties['root'][$j]['ExpectedBy'] = $ExpectedBy;
                        $kpi_capabilties['root'][$j]['Action'] = isset($capabilties['Action'])?$capabilties['Action']:'MODIFY';
                        $j++;
                    }
                }else{
                    $kpi_capabilties = array();
                }
                $kpiCapabilties = json_encode($kpi_capabilties, JSON_UNESCAPED_SLASHES);
                //print_r(array($userId,$kpi_id,$control_lever_id,$control_levers_title,$persona_impected,$action,$kpiInhibitors,$kpiCapabilties,$expectedTargetGrowth,$unitOfMeasurement,$targetDate,$improvementbasis,$auditFrequency,$estimatedSavings));
                $data = DB::statement(' EXEC uspUpdateKPIControlLevers ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',array($userId,$kpi_id,$control_lever_id,$control_levers_title,$persona_impected,$action,$kpiInhibitors,$kpiCapabilties,$expectedTargetGrowth,$unitOfMeasurement,$targetDate,$improvementbasis,$auditFrequency,$estimatedSavings,$BusinessMetrics));

                if($data){
                    $resp['ControlLeverID'] = $control_lever_id;
                    return $this->sendResponse($resp, 'data updated');
                }else{
                    throw new \Exception('Error Occurred');
                }

            }catch(\Exception $e){
                return $this->sendError($e->getMessage());
            }

        }


        /*
        Author : Amit
        Date   : 16/10/2019
        Name   : deleteKpi
        Params : None
        Type   : POST
        Purpose: To delete kpi
    */
        public function deleteKpi(Request $request){
           try{
               $userId = $this->user_data['UserID'];
               $kpi_id = $request->input('KPIID');
               $data = DB::statement(' EXEC uspDeleteKPI ?,?',array($kpi_id,$userId));
               $resp['KpiID'] = $kpi_id;
               return $this->sendResponse($resp, 'data updated');
           }catch(\Exception $e){
                return $this->sendError($e->getMessage());
           }

        }
    /*
        Author : Amit
        Date   : 16/10/2019
        Name   : getKpiList
        Params : None
        Type   : POST
        Purpose: To get kpi details 
    */
    public function getKpiList($KpiId, $KpiSetId){
        
        try{
            $userId = $this->user_data['UserID'];
            $data = DB::select(' EXEC uspGetKPIDetails ?,?,?',array($userId,$KpiId,$KpiSetId));
            if($data){
                $message = "kpi data retrived.";
            }else{
                $message = "Error Occurred";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }  
    /*
        Author : Amit
        Date   : 16/10/2019
        Name   : getKPIControlLevers
        Params : None
        Type   : POST
        Purpose: To kpi control lever details 
    */
    public function getKPIControlLevers($kpi_id, $KpiSetId){
        try{
            $userId = $this->user_data['UserID'];
            $kpiDetails = DB::select(' EXEC uspGetKPIDetails ?,?,?',array($userId,$kpi_id,$KpiSetId));
            $response = [];
                if($kpiDetails){

                    $response['details'] = (array)$kpiDetails[0];
                    $response['controls'] = DB::select(' EXEC uspGetKPIControlLeverDetails ?',array($kpi_id));
                    $message = "Kpi data retrived";
                }else{
                    //$response = (Object)[];
                    $message = "Kpi details not found";
                }
            return $this->sendResponse($response, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }  

    /*
        Author : Amit
        Date   : 16/10/2019
        Name   : getKPIControlLeverDetails
        Params : $control_lever_id
        Type   : GET
        Purpose: To kpi control lever details 
    */
    public function getKPIControlLeverDetails($control_lever_id){
        try{
            $response = [];
            $response['inhibitors'] = [];
            $response['capabilities'] = [];
            $inhibitorsData = DB::select(' EXEC uspGetKPIControlLeverDetailsExpanded ?',array($control_lever_id));
            $capabiltiesData = DB::select(' EXEC uspGetKPIControlLeverCapabilityDetailsExpanded ?',array($control_lever_id));
            if($inhibitorsData){
                foreach($inhibitorsData as $k => $value){
                    $inhibitors['KPIInhibitorsId'] = $value->KPIInhibitorsId;
                    $inhibitors['Inhibitors'] = $value->Inhibitors;
                    $inhibitors['Probability'] = $value->Probability;
                    $inhibitors['ImpactCost'] = $value->ImpactCost;
                    $inhibitors['RiskCost'] = $value->RiskCost;
                    $response['inhibitors'][] = $inhibitors;
                }
                foreach($capabiltiesData as $k => $value){
                    $capabilties['KPICapabilitiesId'] = $value->KPICapabilitiesId;
                    $capabilties['Capabilities'] = $value->Capabilities;
                    $capabilties['ExpectedBy'] = $value->ExpectedBy;
                    $capabilties['Capex'] = $value->Capex;
                    $capabilties['CapexSpreadYears'] = $value->CapexSpreadYears;
                    $capabilties['Opex'] = $value->Opex;
                    $capabilties['Frequency'] = $value->Frequency;
                    $response['capabilities'][] = $capabilties;
                }
                $message = "kpi control lever data retrived.";
            }else{
               // $response = (Object)[];
                $message = "No data found";
            }
            return $this->sendResponse($response, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }  


    /*
        Author : Amit
        Date   : 16/10/2019
        Name   : getKpiDetails
        Params : None
        Type   : POST
        Purpose: To get kpi details 
    */

    public function addKPIControlLevers(Request $request){
        try{
            //print_r($request->input());
            $validator = Validator::make($request->all(), [
                'KpiID' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $userId = $this->user_data['UserID'];
            $kpi_id = $request->input('KpiID');
            //$expectedTargetGrowth = $request->input('expected_gains');
            //$unitOfMeasurement = $request->input('measurement_unit');
            //$targetDate = $request->input('target_date');
            //$improvementbasis = $request->input('improvement_basis');
            //$auditFrequency = $request->input('audit_frequency');
            /*add lever data*/
			    $leverData = array_filter($request->leverData);
				//print_r($leverData);
				
                foreach($leverData as $v => $value){
					if(array_key_exists('business_metrics', $value)){
                        $business_metrics = $value['business_metrics'];
                    }else{
                        $business_metrics = "";
                    }
                    if(array_key_exists('ControlLever', $value)){
                        $control_levers_title = $value['ControlLever'];
                    }else{
                        $control_levers_title = "";
                    }
                    if(array_key_exists('PersonaImpacted', $value)){
                        $persona_impected = $value['PersonaImpacted'];
                    }else{
                        $persona_impected = "";
                    }
                    if(array_key_exists('expected_gains', $value)){
                        $expected_gains1 = $value['expected_gains'];
                    }else{
                        $expected_gains1 = "";
                    }
                    if(array_key_exists('measurement_unit', $value)){
                        $unitOfMeasurement1 = $value['measurement_unit'];
                    }else{
                        $unitOfMeasurement1 = "";
                    }
                    if(array_key_exists('target_date', $value)){
                        $explodeTargetDate1 = $value['target_date'];
                    }else{
                        $explodeTargetDate1 = null;
                    }
                    if(array_key_exists('improvement_basis1', $value)){
                        $improvementbasis1 = $value['improvement_basis1'];
                    }else{
                        $improvementbasis1 = "";
                    }
                    if(array_key_exists('audit_frequency', $value)){
                        $auditFrequency1 = $value['audit_frequency'];
                    }else{
                        $auditFrequency1 = "";
                    }
                    if(array_key_exists('estimated_annual_saving', $value)){
                        $estimated_annual_saving = round($value['estimated_annual_saving']);
                    }else{
                        $estimated_annual_saving = 0;
                    }
                    //add id
                        $i = 0;
                        $j = 0;
                        if(count($value['inhibitors']) > 0){
                            foreach($value['inhibitors'] as $k => $inhibtors){
                                if(array_key_exists('inhibitor', $inhibtors)){
                                    $inhibitor = $inhibtors['inhibitor'];
                                }else{
                                    $inhibitor = "";
                                }
                                if(array_key_exists('Probability', $inhibtors)){
                                    $Probability = $inhibtors['Probability'];
                                }else{
                                    $Probability = "";
                                }
                                if(array_key_exists('ImpactCost', $inhibtors)){
                                    $ImpactCost = $inhibtors['ImpactCost'];
                                }else{
                                    $ImpactCost = "";
                                }
                                $kpi_inhibitors['root'][$i]['ID'] = $k+1;
                                $kpi_inhibitors['root'][$i]['Name'] = $inhibitor;
                                $kpi_inhibitors['root'][$i]['Probability'] = $Probability;
                                $kpi_inhibitors['root'][$i]['ImpactCost'] = $ImpactCost;
                                $i++;
                            }
                        }else{
                            $kpi_inhibitors = array();
                        }
                        $kpiInhibitors = json_encode($kpi_inhibitors);
                        if(count($value['capabilities']) > 0){
                            foreach($value['capabilities'] as $l => $capabilties){
                                if(array_key_exists('capability', $capabilties)){
                                    $capability = $capabilties['capability'];
                                }else{
                                    $capability = "";
                                }
                                if(array_key_exists('capex', $capabilties)){
                                    $capex = $capabilties['capex'];
                                }else{
                                    $capex = "";
                                }
                                if(array_key_exists('opex', $capabilties)){
                                    $opex = $capabilties['opex'];
                                }else{
                                    $opex = "";
                                }
                                if(array_key_exists('frequency', $capabilties)){
                                    $frequency = $capabilties['frequency'];
                                }else{
                                    $frequency = "";
                                }
                                if(array_key_exists('CapexSpreadYears', $capabilties)){
                                    $CapexSpreadYears = $capabilties['CapexSpreadYears'];
                                }else{
                                    $CapexSpreadYears = "";
                                }
                                $kpi_capabilties['root'][$j]['ID'] = $l+1;
                                $kpi_capabilties['root'][$j]['Name'] = $capability;
                                $kpi_capabilties['root'][$j]['Capex'] = $capex;
                                $kpi_capabilties['root'][$j]['Opex'] = $opex;
                                $kpi_capabilties['root'][$j]['Frequency'] = $frequency;
                                $kpi_capabilties['root'][$j]['CapexSpreadYears'] = $CapexSpreadYears;
                                $kpi_capabilties['root'][$j]['ExpectedBy'] = date('Y-m-d');
                                $j++;
                            }
                        }else{
                            $kpi_capabilties = array();
                        }
                        $kpiCapabilties = json_encode($kpi_capabilties);
                        //print_r(array($userId,$kpi_id,$control_levers_title,$persona_impected,$kpiInhibitors,$kpiCapabilties,$expected_gains1,$unitOfMeasurement1,$explodeTargetDate1,$improvementbasis1,$auditFrequency1,$estimated_annual_saving));
						//if($v != 0){
                        	$data = DB::statement(' EXEC uspAddKPIControlLevers ?,?,?,?,?,?,?,?,?,?,?,?,?',array($userId,$kpi_id,$control_levers_title,$persona_impected,$kpiInhibitors,$kpiCapabilties,$expected_gains1,$unitOfMeasurement1,$explodeTargetDate1,$improvementbasis1,$auditFrequency1,$estimated_annual_saving,$business_metrics));
						//}

                }
                return $this->sendResponse($data, 'data updated');
            /* add lever data*/
       
                if($data){
                    $message = "decomposition projects retrieved.";
                }else{
                    $message = "No data found";
                }
                return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }

    }   
    
    /*
        Author : Prabir
        Date   : 09/01/2020
        Name   : getUom
        Params : None
        Type   : POST
        Purpose: To get UOM List 
    */
    public function getUom(request $request, $UOMClassID){
        
        try{
            $data = DB::select(' EXEC Amplo.uspGetUOM ?',array($UOMClassID));
			$array = array();
			$data1 = array();
			foreach($data as $value){
                 if($value->UOMTitle == 'Amount' || $value->UOMTitle == 'Percentage')
                 {
                     $array[] = array('UOMID'=>$value->UOMID, 'UOMTitle'=>$value->UOMTitle);
                 }
            }
            if(count($array) > 0){
				$data1 = $array;
                $message = "UOM data retrived.";
            }else{
                $message = "Error Occurred";
            }
            return $this->sendResponse($data1, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 

    public function getUomControllLever(request $request, $UOMClassID){
        
        try{
            $data = DB::select(' EXEC Amplo.uspGetUOM ?',array($UOMClassID));
            // foreach($data as $value){
            //     if($value->UOMTitle != 'Amount' && $value->UOMTitle != 'Percentage')
            //     {
            //         $array[] = array('UOMID'=>$value->UOMID, 'UOMTitle'=>$value->UOMTitle);
            //     }
            // }
            //print_r($array);
            if($data){
               // $data1 = $array;
                $message = "UOM data retrived.";
            }else{
                //$data1 = $data;
                $message = "Error Occurred";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 

    /*
        Author : Prabir
        Date   : 09/01/2020
        Name   : getUom
        Params : None
        Type   : POST
        Purpose: To get UOM List 
    */
    public function auditFrequency(){
        
        try{
            $data = array('Monthly', 'Quarterly','Yearly');
            $message = "Success";
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 

    /*
        Author : Prabir
        Date   : 09/01/2020
        Name   : getUom
        Params : None
        Type   : POST
        Purpose: To get UOM List 
    */
    public function improvementBasis(){
        
        try{
            $data = array('Month', 'Quarter','Semi-Annually','Year');
            $message = "Success";
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    
    /*
        Author : Prabir
        Date   : 09/01/2020
        Name   : getUom
        Params : None
        Type   : POST
        Purpose: To get UOM List 
    */
    public function kpiSets(){
        
        try{
            $userId = $this->user_data['UserID'];
            $data = DB::select(' EXEC Amplo.uspGetKPISet ?', array($userId));
            if($data){
                $message = "Kpi sets retrived.";
            }else{
                $message = "Error Occurred";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
    Author : Neel
    Date   : 26/03/2019
    Name   : deleteKpiRelated
    Params : None
    Type   : POST
    Purpose: To delete kpi related
    */
    public function deleteKpiRelated(Request $request) {
        try{
            $userId = $this->user_data['UserID'];
            $Id = $request->input('Id');
            $DeleteFrom = $request->input('DeleteFrom');
            $data = DB::statement(' EXEC uspDeleteKpiRelated ?,?,?',array($DeleteFrom,$userId,$Id));
            $resp['KpiID'] = $Id;
            $resp['DeleteFrom']=$DeleteFrom;
            return $this->sendResponse($resp, 'data updated');
        }catch(\Exception $e){
                return $this->sendError($e->getMessage());
        }
    }

	/*
	 * Author : Neel
	 * Date : 26/03/2020
	 * Name : saveKPIAssociation
	 * Params : None
	 * Type : POST
	 * Purpose: To save KPI Association
	 */
    public function saveKPIAssociation(Request $request) {
		try {
			$data = true;
			$clientId = $this->user_data ['ClientID'];
			$userId = $this->user_data ['UserID'];
			$inputJson = json_encode ( $request->input ( 'inputJson' ) );
            
            $data = DB::select ( ' EXEC uspSaveKPIAssociation ?,?,?', array ( $clientId, $userId, $inputJson ) );
            
			return $this->sendResponse($data[0], $data[0]);
    	}catch(\Exception $e){
    		return $this->sendError($e->getMessage());
    	}
    }

	/*
	 * Author : Neel
	 * Date : 26/03/2020
	 * Name : saveKPIAssociation
	 * Params : None
	 * Type : POST
	 * Purpose: To save KPI Audit Logger
	 */
    public function saveKPIAuditLogger(Request $request) {
		try {
			$data = true;
			$clientId = $this->user_data ['ClientID'];
			$userId = $this->user_data ['UserID'];
			$inputJson = json_encode ( $request->input ( 'inputJson' ) );
            
            $data = DB::select ( ' EXEC uspSaveKPIAuditLogger ?,?,?', array ( $clientId, $userId, $inputJson ) );
            
			return $this->sendResponse($data[0], $data[0]);
    	}catch(\Exception $e){
    		return $this->sendError($e->getMessage());
    	}
    }

    /*
	 * Author : Neel
	 * Date : 27/03/2020
	 * Name : getKPIAuditLogger
	 * Params : None
	 * Type : GET
	 * Purpose: To get KPI Audit Logger
	 */
    public function getKPIAuditLogger($KpiId){
        try{
            $data=null;

            $kpi_outcome_metrics = DB::select(' EXEC uspKpiOutcomeMetricsList ?', array($KpiId));
            $persona =  DB::select(' EXEC uspKpiOutcomeMetricsPersonaDetail ?', array($KpiId));
            $all_control_lever_data =  DB::select(' EXEC uspControlLeverOutcomeMetricsDetail ?', array($KpiId));
            $all_inhibitors =  DB::select(' EXEC uspInhibitorOutcomeMetricsDetail ?', array($KpiId));
            $all_capabilities =  DB::select(' EXEC uspCapabilitiesOutcomeMetricsDetail ?', array($KpiId));

            // set inhibitors & capabilities inside all_control_lever_data 
            if(!empty($all_control_lever_data) && count($all_control_lever_data) > 0){
                foreach($all_control_lever_data as $key => $value) {
                    $ControlLeverOutcomeMetricsId = $value['ControlLeverOutcomeMetricsId'];
                    if($ControlLeverOutcomeMetricsId) {
                        $inhibitors = [];
                        if(empty($inhibitors) && count($inhibitors) > 0){
                            foreach($all_inhibitors as $key => $value) {
                                if($ControlLeverOutcomeMetricsId == $value['ControlLeverOutcomeMetricsId']){
                                    array_push($inhibitors, $value);
                                }
                            }
                            $value['inhibitors'] = $inhibitors;
                        }

                        $capabilties = [];
                        if(empty($capabilties) && count($capabilties) > 0){
                            foreach($all_capabilities as $key => $value) {
                                if($ControlLeverOutcomeMetricsId == $value['ControlLeverOutcomeMetricsId']){
                                    array_push($capabilties, $value);
                                }
                            }
                            $value['capabilties'] = $capabilties;
                        }
                    }
                }
            } else {
                // do nothing
            }


            // prepare data
            // set kpi_outcome_metrics
            $data['kpi_outcome_metrics']=$kpi_outcome_metrics;
            // set persona inside kpi_outcome_metrics
            $data['kpi_outcome_metrics']['persona']=$persona;

            // set control_lever_data
            $data['control_lever_data'] = $all_control_lever_data;

            if($data){
                $message = "kpi details retrived.";
            }else{
                $message = "Error Occurred";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }        
    }



    /*
	 * Author : Neel
	 * Date : 27/03/2020
	 * Name : getKPIAssociation
	 * Params : None
	 * Type : GET
	 * Purpose: To get KPI Association
	 */
    public function getKPIAssociation() {
        try {
            $data = null; // intialize data null 
            
            $userId = $this->user_data['UserID'];
            $bm_projects_raw = DB::select(' EXEC uspGetUserBMProjects ?', array($userId));
            $cm_projects_raw = DB::select(' EXEC uspGetDecompositionUserProjects ?', array($userId));
            
            // Log::debug('BM Proj: '.count($bm_projects_raw));
            // Log::debug('CM Proj: '.count($cm_projects_raw));
            // TODO will do later after getting design_thinking_project proc
            $dt_projects = []; // DB::select(' EXEC  ?', array($userId));

            // set custom bm & cm projects
            if(!empty($bm_projects_raw) && count($bm_projects_raw) > 0) {
                $bm_projects = [];
                foreach($bm_projects_raw as $bm_project_raw) {
                    $bm_project = null;
                    $bm_project["id"] = "bmproject_".$bm_project_raw->BenchmarkProjectID;
                    $bm_project["name"] = $bm_project_raw->BenchmarkProjectName;
                    $domains_raw = DB::select('EXEC uspGetUserDomainsForBMProject ?,?', array($userId, $bm_project_raw->BenchmarkProjectID));
                   
                    $domains = [];
                    if(!empty($domains_raw) && count($domains_raw) > 0) {
                        foreach($domains_raw as $domain_raw) {
                            $domain["id"] = "bmdomain_".$bm_project_raw->BenchmarkProjectID."_".$domain_raw->DomainID; 
                            $domain["name"] = $domain_raw->DomainName;
                            $domain["isSelected"] = 1;           
                            array_push($domains, $domain);
                        }
                    }
                    $bm_project["domains"] = $domains;
                    array_push($bm_projects, $bm_project);
                }
            }

            if(!empty($cm_projects_raw) && count($cm_projects_raw) > 0) {
                $cm_projects = [];
                foreach($cm_projects_raw as $key=>$cm_project_raw) {
                    $cm_projects[$cm_project_raw->DecompositionProjectID]["id"]    = "cmproject_".$cm_project_raw->DecompositionProjectID;
                    $cm_projects[$cm_project_raw->DecompositionProjectID]["name"]  = $cm_project_raw->ProjectName;

                    $func_phase_raws = DB::select(' EXEC uspGetDecompositionLevel1 ?,?',array($userId,$cm_project_raw->DecompositionProjectID));
                    
                    //echo "<pre>";print_r($func_phase_raws);echo "<br>";
                    $functions = [];
                    if(!empty($func_phase_raws) && count($func_phase_raws) > 0) {
                        foreach($func_phase_raws as $kf=>$function_raw) {
                            $cm_projects[$cm_project_raw->DecompositionProjectID]['functions'][$function_raw->FunctionID]['id'] = "cmfunction_".$cm_project_raw->DecompositionProjectID."_".$function_raw->FunctionID;
                            $cm_projects[$cm_project_raw->DecompositionProjectID]['functions'][$function_raw->FunctionID]['name'] = $function_raw->FunctionName;

                            $cm_projects[$cm_project_raw->DecompositionProjectID]['functions'][$function_raw->FunctionID]['phases'][$function_raw->PhaseID]['id'] = "cmphase_".$cm_project_raw->DecompositionProjectID."_".$function_raw->PhaseID;
                            $cm_projects[$cm_project_raw->DecompositionProjectID]['functions'][$function_raw->FunctionID]['phases'][$function_raw->PhaseID]['name'] = $function_raw->PhaseName;
                            
                            //$data = DB::select(' EXEC uspGetDecompositionTreeView ?,?',array($cm_project_raw->DecompositionProjectID,$function_raw->DecompositionProcessLevel1ID)); 
                            $my_array =$this->getprocesses($cm_project_raw->DecompositionProjectID,$function_raw->DecompositionProcessLevel1ID);
                            $cm_projects[$cm_project_raw->DecompositionProjectID]['functions'][$function_raw->FunctionID]['phases'][$function_raw->PhaseID]['processes'][] =  $my_array;
                        }
                    }
                    else{
                       $cm_projects[$key]['functions'] = $functions;
                    }
                }
                $finaliZeroKpis = array_values($cm_projects);
                foreach ($finaliZeroKpis as $key => $value) {
                    if(isset($value['functions'])){
                        $finaliZeroKpis[$key]['functions']= array_values($value['functions']);
                        foreach($finaliZeroKpis[$key]['functions'] as $k1=>$v1){
                            if(isset($v1['phases'])){
                                $finaliZeroKpis[$key]['functions'][$k1]['phases']= array_values($v1['phases']);
                            }
                        }
                    }
                }
               $cm_projects = $finaliZeroKpis;
            }
            //echo "<pre>";print_r($cm_projects);echo "<br>";die;
            $data["association_data"][0]["name"] = "Benchmarking Projects";
            $data["association_data"][0]["projects"] = $bm_projects;

            $data["association_data"][1]["name"] = "Capability Modelling Projects";
            $data["association_data"][1]["projects"] = $cm_projects;

            $data["association_data"][2]["name"] = "Design Thinking Projects";
            $data["association_data"][2]["projects"] = $dt_projects;

            if($data){
                $message = "kpi association data retrived.";
            }else{
                $message = "Error Occurred";
            }

            return $this->sendResponse($data, $message);
        } catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    
    
    /*
     * Author : 
     * Date : 31/03/2020
     * Name : getprocesses
     * Params : None
     * Type : GET
     * Purpose: To get nested structure process, supporting function for getKPIAssociation
     */
    public function getprocesses($project_id,$process_id){
        $data = DB::select(' EXEC uspGetDecompositionTreeView ?,?',array($project_id,$process_id)); 
        $response['processes'] = [];
        if(count($data) > 0){
            $my_array = [];
            foreach($data as $l => $level){

                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID=='' && $level->ProcessLevel3ID=='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){
                       
                       $my_array = array(
                           "name" => $level->ProcessLevelTitle,
                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                       	   "id" => "cml1_".$project_id."_".$level->ProcessLevel1ID,
                           "isSelected"=>1
                        );
                    }
                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID=='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){

                        $my_array['child'][] = array(
                           "name" => $level->ProcessLevelTitle,
                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                           "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                           "id" => "cml2_".$project_id."_".$level->ProcessLevel2ID,
                           "isSelected"=>1,
                           'child' => []
                        );
                    }
                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){

                        foreach ($my_array['child'] as $key => $value) {
                            if($value['ProcessLevel2ID']==$level->ProcessLevel2ID){
                                $my_array['child'][$key]['child'][] = array(
                                   "name" => $level->ProcessLevelTitle,
                                   "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                   "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                   "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                   "id" => "cml3_".$project_id."_".$level->ProcessLevel3ID,
                                   "isSelected"=>1,
                                   'child' => []
                                );
                            }
                        }
                    }
                     if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID!='' && $level->ProcessLevel5ID==''){
                        foreach ($my_array['child'] as $key=>$val) {
                            foreach($val['child'] as $k=>$v){
                                if($v['ProcessLevel3ID']==$level->ProcessLevel3ID){
                                    $val['child'][$k]['child'][] =array(
                                       "name" => $level->ProcessLevelTitle,
                                       "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                       "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                       "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                       "ProcessLevel4ID"=>$level->ProcessLevel4ID,
                                       "id" => "cml4_".$project_id."_".$level->ProcessLevel4ID,
                                       "isSelected"=>1,
                                       'child' => []
                                    );
                                }
                            }
                            $my_array['child'][$key] = $val;
                        }
                     }

                     if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID!='' && $level->ProcessLevel5ID!=''){

                        foreach ($my_array['child'] as $key=>$val) {
                            foreach($val['child'] as $k=>$v){
                                 foreach($v['child'] as $kl=>$vl){
                                    if($vl['ProcessLevel4ID']==$level->ProcessLevel4ID){
                                        $v['child'][$kl]['child'][] =array(
                                           "name" => $level->ProcessLevelTitle,
                                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                           "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                           "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                           "ProcessLevel4ID"=>$level->ProcessLevel4ID,
                                           "ProcessLevel5ID"=>$level->ProcessLevel5ID,
                                           "id" => "cml5_".$project_id."_".$level->ProcessLevel5ID,
                                           "isSelected"=>1
                                        );
                                    }
                                }
                                $val['child'][$k] = $v;
                            }
                            $my_array['child'][$key] = $val;
                        }
                     }
                     //get scores
                  
                    
                }
            return $my_array;
        }else{
            return $data;
        }
    }
    
    /*
     * Author : Neel
     * Date : 26/03/2020
     * Name : getAuditLoggerHistory
     * Params : None
     * Type : POST
     * Purpose: get KPI audit logger history
     */
    public function getAuditLoggerHistory($KpiId) {
    	try {
    		$data = null;
    		$data = DB::select ( ' EXEC uspAuditLoggerHistory ?', array ( $KpiId ) );
    		if(!empty($data)){
    			$message = "audit logger history data retrived.";
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
        Date : 07/05/2020
        Name : kpiAuditSearch
        Params : @AuditName,@ClientID
        Type : POST
        Purpose: Search kpi data
    */
    public function kpiAuditSearch(Request $request){
        try{
            
            $clientId = $this->user_data ['ClientID'];
            $userId   = $this->user_data ['UserID'];
            $params = array(
                $request['AuditName'],
                $clientId
            );
            $data = DB::select (' EXEC uspKpiAuditSearch ?,? ',$params);
            if(count($data)){
                $message = "Record fetched successfully.";
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
        Date : 06/05/2020
        Name : exportKpi
        Params : None
        Type : GET
        Purpose: To generate KPI xls sheet
    */
    public function exportKpiOld_18_05_2020(Request $request, $kpiId){
        try{
            $params = array($kpiId);
            $kpiData = DB::select('EXEC uspKpiExport ?',$params);
            $kpiAuditData = DB::select('EXEC uspKpiAuditExport ?',$params);
           
            if(count($kpiData)>0){
                
                $kpiData = json_decode(json_encode($kpiData), true);
                $kpiAuditData = json_decode(json_encode($kpiAuditData), true);

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
                $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($kpiData)), null, 'A1');
                $objPHPExcel->getActiveSheet()->fromArray($kpiData, null, 'A2');

                $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);


                for ($i = 'A'; $i !=  $objPHPExcel->getActiveSheet()->getHighestColumn(); $i++) {
                    $objPHPExcel->getActiveSheet()->getColumnDimension($i)->setAutoSize(TRUE);
                    
                }
                for($i=1; $i<=count($kpiData); $i++){
                    $objPHPExcel->getActiveSheet()->getStyle('A'.$i.':'.$column.($i+1))->applyFromArray($styleArrayCol);;
                }
                /* Rename 1st sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Kpi');

                /* Create a new worksheet, after the default sheet*/
                $objPHPExcel->createSheet();
                $objPHPExcel->setActiveSheetIndex(1);
                if(count($kpiAuditData)>0){
                    $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($kpiAuditData)), null, 'A1');
                    $objPHPExcel->getActiveSheet()->fromArray($kpiAuditData, null, 'A2');

                    $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                    $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);


                    for ($i = 'A'; $i !=  $objPHPExcel->getActiveSheet()->getHighestColumn(); $i++) {
                        $objPHPExcel->getActiveSheet()->getColumnDimension($i)->setAutoSize(TRUE);
                        
                    }
                    for($i=1; $i<=count($kpiAuditData); $i++){
                        $objPHPExcel->getActiveSheet()->getStyle('A'.$i.':'.$column.($i+1))->applyFromArray($styleArrayCol);;
                    }
                }
                /* Rename 2nd sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Kpi Audit');

                $date=date('d-M-Y-H-i-s');
                $filename   ='KpiData'.'-'.$date.'.xls'; 
    
                /* Redirect output to a client’s web browser (Excel5)*/
                $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
                // Sending headers to force the user to download the file
                header('Content-Type: application/vnd.ms-excel');
                header('Content-Disposition: attachment;filename="'.$filename.'"');
                header('Cache-Control: max-age=0');

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
    public function exportKpi(Request $request, $kpiId){
        try{
            $params = array($kpiId);
            $kpiData = DB::select('EXEC uspKpiExport ?',$params);
            
           
            if(count($kpiData)>0){
                
                $kpiData = json_decode(json_encode($kpiData), true);

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
                $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($kpiData)), null, 'A1');
                $objPHPExcel->getActiveSheet()->fromArray($kpiData, null, 'A2');

                $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);


                for ($i = 'A'; $i !=  $objPHPExcel->getActiveSheet()->getHighestColumn(); $i++) {
                    $objPHPExcel->getActiveSheet()->getColumnDimension($i)->setAutoSize(TRUE);
                    
                }
                for($i=1; $i<=count($kpiData); $i++){
                    $objPHPExcel->getActiveSheet()->getStyle('A'.$i.':'.$column.($i+1))->applyFromArray($styleArrayCol);;
                }
                /* Rename 1st sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Kpi');

                $date=date('d-M-Y-H-i-s');
                $filename   ='KpiData'.'-'.$date.'.xls'; 
    
                /* Redirect output to a client’s web browser (Excel5)*/
                $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
                // Sending headers to force the user to download the file
                header('Content-Type: application/vnd.ms-excel');
                header('Content-Disposition: attachment;filename="'.$filename.'"');
                header('Cache-Control: max-age=0');

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
    public function exportKpiAudit(Request $request, $kpiId){
        try{
            $params = array($kpiId);
           
            $kpiAuditData = DB::select('EXEC uspKpiAuditExport ?',$params);
           
            if(count($kpiAuditData)>0){
                
                $kpiAuditData = json_decode(json_encode($kpiAuditData), true);

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
               
                $objPHPExcel->createSheet();
                $objPHPExcel->setActiveSheetIndex(0);
                if(count($kpiAuditData)>0){
                    $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($kpiAuditData)), null, 'A1');
                    $objPHPExcel->getActiveSheet()->fromArray($kpiAuditData, null, 'A2');

                    $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                    $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);


                    for ($i = 'A'; $i !=  $objPHPExcel->getActiveSheet()->getHighestColumn(); $i++) {
                        $objPHPExcel->getActiveSheet()->getColumnDimension($i)->setAutoSize(TRUE);
                        
                    }
                    for($i=1; $i<=count($kpiAuditData); $i++){
                        $objPHPExcel->getActiveSheet()->getStyle('A'.$i.':'.$column.($i+1))->applyFromArray($styleArrayCol);;
                    }
                }
                /* Rename 1st sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Kpi Audit');

                $date=date('d-M-Y-H-i-s');
                $filename   ='KpiAuditData'.'-'.$date.'.xls'; 
    
                /* Redirect output to a client’s web browser (Excel5)*/
                $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
                // Sending headers to force the user to download the file
                header('Content-Type: application/vnd.ms-excel');
                header('Content-Disposition: attachment;filename="'.$filename.'"');
                header('Cache-Control: max-age=0');

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
        Date   : 07/05/2020
        Name   : importKpi
        Params : @files[],@module,@kpiId
        Type   : POST
        Purpose: To upload file, parse kpi data,Save in data base
    */
    public function importKpiOld_18_05_2020( Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                'files'   => 'required',
                'files.*' => 'mimes:xls,xlsx',
                'module'  => 'required',
                'kpiId'   => 'required'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $files = $request->file('files');
            $uploadcount = 0;
            foreach($files as $file) {
                $file_name              = date('d-M-Y-H-i-s').'-'.$file->getClientOriginalName();
                $dirname                = $request['module'];
                $destinationPath        = public_path('/'.$dirname);
                $destinationPathImport  = public_path('/'.$dirname.'/Import');
                $destinationPathArchive = public_path('/'.$dirname.'/Archive');

                if(! is_dir($destinationPath) && ! is_dir($destinationPathImport) && ! is_dir($destinationPathArchive)){
                    mkdir($destinationPath, 0755,true);
                    mkdir($destinationPathImport, 0755,true);
                    mkdir($destinationPathArchive, 0755,true);
                }
                $file->move($destinationPathImport, $file_name);
                $source_file =  $destinationPathImport.'/'.$file_name;

                chmod($destinationPath, 0777);
                chmod($destinationPathImport, 0777);
                chmod($destinationPathArchive, 0777);
                chmod($source_file, 0777);

                $common_model   = new Common();
                $column_array  = $common_model->readKpiXLSJsonRoot( $source_file );

                $kpiData['root'] = $column_array['kpiData'];
                $kpiDataJson     = json_encode($kpiData);
               
                $kpiAuditData['root'] = $column_array['kpiAuditData'];
                $kpiAuditDataJson     = json_encode($kpiAuditData);
             
                $kpiAuditDataJsonEmpty = "";
                $params_array = array(
                    $request['kpiId'],
                    $this->user_data['UserID'],
                    $kpiDataJson,
                    $kpiAuditDataJsonEmpty
                );
                $data = DB::select(' EXEC Amplo.uspImportkpiToStaging ?,?,?,?',$params_array);
                if(isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                    
                    if(count($column_array['kpiAuditData']) > 0){
                        $params_kpi_audit = array(
                            $request['kpiId'],
                            $this->user_data['UserID'],
                            $kpiAuditDataJson
                        );
                        //echo "<pre>";print_r($params_kpi_audit);echo "<br>";die;
                        $dataKpiAudit = DB::select(' EXEC Amplo.uspImportkpiAuditToStagingNew ?,?,?',$params_kpi_audit);
                    }
                      
                }
                $uploadcount ++;
            }
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                if( isset($dataKpiAudit[0]->Success) && ($dataKpiAudit[0]->Success == true || $dataKpiAudit[0]->Success ===1)){
                    $message = $data[0]->MessageName;
                    $dataMsg = array("message"=>$message);
                    return $this->sendResponse($data, $message);
                }else{
                    if(isset($dataKpiAudit[0]->MessageName)){
                        $message = $dataKpiAudit[0]->MessageName; 
                        $dataMsg = array("message"=>$message);
                        return $this->sendError($message);
                    }else{
                        return $this->sendError($dataKpiAudit);
                    }
                    
                }
            }else{
                if(isset($data[0]->MessageName)){
                    $message = $data[0]->MessageName; 
                    $dataMsg = array("message"=>$message);
                    return $this->sendError($message);
                }
                else{
                    return $this->sendError($data);
                }
            }
           
        }
        catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    public function importKpi( Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                'files'   => 'required',
                'files.*' => 'mimes:xls,xlsx',
                'module'  => 'required',
                'kpiId'   => 'required'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $files = $request->file('files');
            $uploadcount = 0;
            foreach($files as $file) {
                $file_name              = date('d-M-Y-H-i-s').'-'.$file->getClientOriginalName();
                $dirname                = $request['module'];
                $destinationPath        = public_path('/'.$dirname);
                $destinationPathImport  = public_path('/'.$dirname.'/Import');
                $destinationPathArchive = public_path('/'.$dirname.'/Archive');

                if(! is_dir($destinationPath) && ! is_dir($destinationPathImport) && ! is_dir($destinationPathArchive)){
                    mkdir($destinationPath, 0755,true);
                    mkdir($destinationPathImport, 0755,true);
                    mkdir($destinationPathArchive, 0755,true);
                }
                $file->move($destinationPathImport, $file_name);
                $source_file =  $destinationPathImport.'/'.$file_name;

                chmod($destinationPath, 0777);
                chmod($destinationPathImport, 0777);
                chmod($destinationPathArchive, 0777);
                chmod($source_file, 0777);

                $common_model   = new Common();
                $column_array  = $common_model->readKpiXLSJsonRoot( $source_file );

                $kpiData['root'] = $column_array['kpiData'];
                $kpiDataJson     = json_encode($kpiData);
           
                $kpiAuditDataJsonEmpty = "";
                $params_array = array(
                    $request['kpiId'],
                    $this->user_data['UserID'],
                    $kpiDataJson,
                    $kpiAuditDataJsonEmpty
                );
                //echo "<pre>";print_r($column_array['kpiData']);echo "<br>";die;
                //echo "<pre>";print_r($params_array);echo "<br>";die;
                $data = DB::select(' EXEC Amplo.uspImportkpiToStaging ?,?,?,?',$params_array);
                if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                     rename($source_file, $destinationPathArchive.'/'. pathinfo($source_file, PATHINFO_BASENAME));
                }
                $uploadcount ++;
            }
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                $message = $data[0]->MessageName;
                $dataMsg = array("message"=>$message);
                return $this->sendResponse($data, $message);
            }else{
                if(isset($data[0]->MessageName)){
                    $message = $data[0]->MessageName; 
                    $dataMsg = array("message"=>$message);
                    return $this->sendError($message);
                }
                else{
                    return $this->sendError($data);
                }
            }
        }
        catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    public function importKpiAudit( Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                'files'   => 'required',
                'files.*' => 'mimes:xls,xlsx',
                'module'  => 'required',
                'kpiId'   => 'required'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $files = $request->file('files');
            $uploadcount = 0;
            foreach($files as $file) {
                $file_name              = date('d-M-Y-H-i-s').'-'.$file->getClientOriginalName();
                $dirname                = $request['module'];
                $destinationPath        = public_path('/'.$dirname);
                $destinationPathImport  = public_path('/'.$dirname.'/Import');
                $destinationPathArchive = public_path('/'.$dirname.'/Archive');

                if(! is_dir($destinationPath) && ! is_dir($destinationPathImport) && ! is_dir($destinationPathArchive)){
                    mkdir($destinationPath, 0755,true);
                    mkdir($destinationPathImport, 0755,true);
                    mkdir($destinationPathArchive, 0755,true);
                }
                $file->move($destinationPathImport, $file_name);
                $source_file =  $destinationPathImport.'/'.$file_name;

                chmod($destinationPath, 0777);
                chmod($destinationPathImport, 0777);
                chmod($destinationPathArchive, 0777);
                chmod($source_file, 0777);

                $common_model   = new Common();
                $column_array  = $common_model->readKpiAuditXLSJsonRoot( $source_file );
                
                if(count($column_array["kpiAuditData"]) >0){
                    foreach ($column_array["kpiAuditData"] as $key => $value) {
                        if($value["KpiInitiationDate"]!="" && is_numeric($value["KpiInitiationDate"])){
                            $unixKpiInitiationDate = ($value["KpiInitiationDate"] - 25569) * 86400;
                            $excelKpiInitiationDate = 25569 + ($unixKpiInitiationDate / 86400);
                            $unixKpiInitiationDate = ($excelKpiInitiationDate - 25569) * 86400;
                            $column_array["kpiAuditData"][$key]["KpiInitiationDate"] = gmdate("m/d/Y", $unixKpiInitiationDate);
                        }
                        if($value["AuditOutcomeDate"]!="" && is_numeric($value["AuditOutcomeDate"])){
                            $unixAuditOutcomeDate = ($value["AuditOutcomeDate"] - 25569) * 86400;
                            $excelAuditOutcomeDate = 25569 + ($unixAuditOutcomeDate / 86400);
                            $unixAuditOutcomeDate = ($excelAuditOutcomeDate - 25569) * 86400;
                            $column_array["kpiAuditData"][$key]["AuditOutcomeDate"] = gmdate("m/d/Y", $unixAuditOutcomeDate);
                        }

                        if($value["FromDate"]!="" && is_numeric($value["FromDate"])){
                            $unixFromDate = ($value["FromDate"] - 25569) * 86400;
                            $excelFromDate = 25569 + ($unixFromDate / 86400);
                            $unixFromDate = ($excelFromDate - 25569) * 86400;
                            $column_array["kpiAuditData"][$key]["FromDate"] = gmdate("m/d/Y", $unixFromDate);
                        }
                        if($value["ToDate"]!="" && is_numeric($value["ToDate"])){
                            $unixToDateDate = ($value["ToDate"] - 25569) * 86400;
                            $excelToDateDate = 25569 + ($unixToDateDate / 86400);
                            $unixToDateDate = ($excelToDateDate - 25569) * 86400;
                            $column_array["kpiAuditData"][$key]["ToDate"] = gmdate("m/d/Y", $unixToDateDate);
                        }
                        if($value["InitiationDateCL"]!="" && is_numeric($value["InitiationDateCL"])){
                            $unixInitiationDateCL = ($value["InitiationDateCL"] - 25569) * 86400;
                            $excelInitiationDateCL = 25569 + ($unixInitiationDateCL / 86400);
                            $unixInitiationDateCL = ($excelInitiationDateCL - 25569) * 86400;
                            $column_array["kpiAuditData"][$key]["InitiationDateCL"] = gmdate("m/d/Y", $unixInitiationDateCL);
                        }
                        if($value["OutcomeDateCL"]!="" && is_numeric($value["OutcomeDateCL"])){
                            $unixOutcomeDateCL = ($value["OutcomeDateCL"] - 25569) * 86400;
                            $excelOutcomeDateCL = 25569 + ($unixOutcomeDateCL / 86400);
                            $unixOutcomeDateCL = ($excelOutcomeDateCL - 25569) * 86400;
                            $column_array["kpiAuditData"][$key]["OutcomeDateCL"] = gmdate("m/d/Y", $unixOutcomeDateCL);
                        }
                        if($value["FromDateCL"]!="" && is_numeric($value["FromDateCL"])){
                            $unixFromDateCL = ($value["FromDateCL"] - 25569) * 86400;
                            $excelFromDateCL = 25569 + ($unixFromDateCL / 86400);
                            $unixFromDateCL = ($excelFromDateCL - 25569) * 86400;
                            $column_array["kpiAuditData"][$key]["FromDateCL"] = gmdate("m/d/Y", $unixFromDateCL);
                        }
                        if($value["ToDateCL"]!="" && is_numeric($value["ToDateCL"])){
                            $unixToDateCL = ($value["ToDateCL"] - 25569) * 86400;
                            $excelToDateCL = 25569 + ($unixToDateCL / 86400);
                            $unixToDateCL = ($excelToDateCL - 25569) * 86400;
                            $column_array["kpiAuditData"][$key]["ToDateCL"] = gmdate("m/d/Y", $unixToDateCL);
                        }
                        if($value["InitiationDateIN"]!="" && is_numeric($value["InitiationDateIN"])){
                            $unixInitiationDateIN = ($value["InitiationDateIN"] - 25569) * 86400;
                            $excelInitiationDateIN = 25569 + ($unixInitiationDateIN / 86400);
                            $unixInitiationDateIN = ($excelInitiationDateIN - 25569) * 86400;
                            $column_array["kpiAuditData"][$key]["InitiationDateIN"] = gmdate("m/d/Y", $unixInitiationDateIN);
                        }
                        if($value["OutcomeDateIN"]!="" && is_numeric($value["OutcomeDateIN"])){
                            $unixOutcomeDateIN = ($value["OutcomeDateIN"] - 25569) * 86400;
                            $excelOutcomeDateIN = 25569 + ($unixOutcomeDateIN / 86400);
                            $unixOutcomeDateIN = ($excelOutcomeDateIN - 25569) * 86400;
                            $column_array["kpiAuditData"][$key]["OutcomeDateIN"] = gmdate("m/d/Y", $unixOutcomeDateIN);
                        }

                        if($value["InitiationDateCA"]!="" && is_numeric($value["InitiationDateCA"])){
                            $unixInitiationDateCA = ($value["InitiationDateCA"] - 25569) * 86400;
                            $excelInitiationDateCA = 25569 + ($unixInitiationDateCA / 86400);
                            $unixInitiationDateCA = ($excelInitiationDateCA - 25569) * 86400;
                            $column_array["kpiAuditData"][$key]["InitiationDateCA"] = gmdate("m/d/Y", $unixInitiationDateCA);
                        }
                        if($value["OutcomeDateCA"]!="" && is_numeric($value["OutcomeDateCA"])){
                            $unixOutcomeDateCA = ($value["OutcomeDateCA"] - 25569) * 86400;
                            $excelOutcomeDateCA = 25569 + ($unixOutcomeDateCA / 86400);
                            $unixOutcomeDateCA = ($excelOutcomeDateCA - 25569) * 86400;
                            $column_array["kpiAuditData"][$key]["OutcomeDateCA"] = gmdate("m/d/Y", $unixOutcomeDateCA);
                        }
                        if($value["InvestmentDate"]!="" && is_numeric($value["InvestmentDate"])){
                            $unixInvestmentDate = ($value["InvestmentDate"] - 25569) * 86400;
                            $excelInvestmentDate = 25569 + ($unixInvestmentDate / 86400);
                            $unixInvestmentDate = ($excelInvestmentDate - 25569) * 86400;
                            $column_array["kpiAuditData"][$key]["InvestmentDate"] = gmdate("m/d/Y", $unixInvestmentDate);
                        }

                    }
                }
                $kpiAuditData['root'] = $column_array['kpiAuditData'];
                $kpiAuditDataJson     = json_encode($kpiAuditData);
        
                $params_kpi_audit = array(
                    $request['kpiId'],
                    $this->user_data['UserID'],
                    $kpiAuditDataJson
                );
                //echo "<pre>";print_r($params_kpi_audit);echo "<br>";die;
                $dataKpiAudit = DB::select(' EXEC Amplo.uspImportkpiAuditToStagingNew ?,?,?',$params_kpi_audit);
                  
                $uploadcount ++;
            }
            
            if( isset($dataKpiAudit[0]->Success) && ($dataKpiAudit[0]->Success == true || $dataKpiAudit[0]->Success ===1)){
                $message = $dataKpiAudit[0]->MessageName;
                $dataMsg = array("message"=>$message);
                return $this->sendResponse($dataKpiAudit, $message);
            }else{
                if(isset($dataKpiAudit[0]->MessageName)){
                    $message = $dataKpiAudit[0]->MessageName; 
                    $dataMsg = array("message"=>$message);
                    return $this->sendError($message);
                }else{
                    return $this->sendError($dataKpiAudit);
                }   
            }
        }
        catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 05/06/2020
        Name   : getKPIVersionHistory
        Params : None
        Type   : GET
        Purpose: To get kpi version history 
    */
    public function getKPIVersionHistory(Request $request, $kpiId){
         try{
            
            $requestData = $request->all();
            $userId = $this->user_data['UserID'];
            $params_array = [
                $kpiId
            ];
            $data = DB::select(' EXEC uspGetKPIVersionHistory ?', $params_array);
            
            if( count($data)>0){
               $message = "Data retrived successfully";
            }else{
                $message = "No record found";  
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
             return $this->sendError($e->getMessage()); 
        }
    }
    public function checkKPIIdInKpiSheet( Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                'files'   => 'required',
                'files.*' => 'mimes:xls,xlsx',
                'module'  => 'required',
                'kpiId'   => 'required'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $files = $request->file('files');
            $uploadcount = 0;
            $status = 0;
            foreach($files as $file) {
                $file_name              = date('d-M-Y-H-i-s').'-'.$file->getClientOriginalName();
                $dirname                = $request['module'];
                $destinationPath        = public_path('/'.$dirname);
                $destinationPathImport  = public_path('/'.$dirname.'/Import');
                $destinationPathArchive = public_path('/'.$dirname.'/Archive');

                if(! is_dir($destinationPath) && ! is_dir($destinationPathImport) && ! is_dir($destinationPathArchive)){
                    mkdir($destinationPath, 0755,true);
                    mkdir($destinationPathImport, 0755,true);
                    mkdir($destinationPathArchive, 0755,true);
                }
                $file->move($destinationPathImport, $file_name);
                $source_file =  $destinationPathImport.'/'.$file_name;

                chmod($destinationPath, 0777);
                chmod($destinationPathImport, 0777);
                chmod($destinationPathArchive, 0777);
                chmod($source_file, 0777);
               
                $common_model   = new Common();
                $column_array  = $common_model->readKpiXLSJsonRoot( $source_file );

                
                if(count($column_array['kpiData'][0]) >0){
                    
                    $kpiData['root'] = $column_array['kpiData'];
                    $kpiDataJson     = json_encode($kpiData);
                    
                    $params_array = array(
                        $this->user_data['UserID'],
                        $kpiDataJson
                    );
                    $data_array = DB::select(' EXEC uspCheckIfKPISetExistInSystem ?,?',$params_array);
                    
                    if(is_array($data_array) && count($data_array) > 0){

                        if( isset($data_array[0]->Success) && ($data_array[0]->Success == false || $data_array[0]->Success ===0)){
                            $data = array("status"=>3);
                            $message = $data_array[0]->MessageName;
                            return $this->sendResponse($data, $message);
                        }else {
                            foreach ($column_array['kpiData'] as $key => $value) {
                                if($value['KPIID']!=0 || $value['KPIID']!=""){
                                    $status = 1;
                                }else{
                                    $status = 0;
                                }
                            }
                        }
                       
                    }else{
                        $status=4;
                        $data = array("status"=>3);
                        $message = "Stored procedure is not returning anything.";
                        return $this->sendResponse($data, $message);
                    }
                    
                }
                else{
                    $status = 2;
                }
                $uploadcount ++;
            }
            
            if($status==1){
                $data = array("status"=>$status);
                $message = "KPI id is exists in KPI sheet";
                return $this->sendResponse($data, $message);
            }else if($status==0){
                $data = array("status"=>$status);
                $message = "KPI id is not exists in KPI sheet";
                return $this->sendResponse($data, $message);
            }
            else if($status==2){
                $data = array("status"=>$status);
                $message = "No KPI in sheet";
                return $this->sendResponse($data, $message);
            }
        }
        catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
     public function getKpiAuditData( Request $request,$KpiId ,$KpiOutcomeMetricsId ){
        try{
            $params_array = array(
                $KpiId,
                $KpiOutcomeMetricsId    
            );
            $data1 = DB::select(' EXEC uspGetKpiOutcomeMetrics ?,?',$params_array);
            $data_array = array();

           
            if(count($data1)>0){
                $ControlLeverData = DB::select(' EXEC uspGetControlLeverOutcomeMetrics ?',array($KpiOutcomeMetricsId));
                $InhibitorsData = DB::select(' EXEC uspGetInhibitorOutcomeMetrics ?',array($KpiOutcomeMetricsId));
                $CapabilitiesData = DB::select(' EXEC uspGetCapabilitiesOutcomeMetrics ?',array($KpiOutcomeMetricsId));
                

                $PersonaData = DB::select(' EXEC uspGetKpiOutcomeMetricsPersonaMapping ?',array($KpiOutcomeMetricsId));

                $data_array = array(
                    "details"      => $data1, 
                    "controls"     => $ControlLeverData, 
                    "inhibitors"   => $InhibitorsData, 
                    "capabilities" => $CapabilitiesData,
                    "persona" => $PersonaData
                );
                $message = "Data retrieved successfully.";
            }else{
                $message = "No record found";
            }
           
            return $this->sendResponse($data_array, $message);
        }
        catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }


    public function saveUpdateKpiFilterPreference(Request $request){
        try{
            
            $inputJson = $request->all();
            $inputJson['KpiSetId'] = (!empty($inputJson['KpiSetId'])) ? implode(',', $inputJson['KpiSetId']) : '';

            $params_array = array(
                $this->user_data['ClientID'],
                $this->user_data['UserID'],
                json_encode($inputJson)
            );

            $data = DB::select(' EXEC uspSaveUpdateKpiFilterPreference ?,?,?',$params_array);

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
            
        }
        catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    public function getSavedKpiFilterPreference($KpiSearchandSortPreferenceId){
        try{
            
            $params_array = array(
                $this->user_data['ClientID'],
                $this->user_data['UserID'],
                $KpiSearchandSortPreferenceId
            );
        
            $data = DB::select(' EXEC uspGetSavedKpiFilterPreference ?,?,?',$params_array);

            if(count($data) > 0){
                foreach ($data as $key => $value) {
                    $value->KpiSetId = (!empty($value->KpiSetId)) ? explode(',', $value->KpiSetId) : [];
                }
                $message = 'Data retrived successfully';
                return $this->sendResponse($data, $message);
            }else{
                $message = 'No record found';
                return $this->sendResponse($data, $message);
            }
        }
        catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    public function getSavedKpiFilterPreferenceDetail($KpiSearchandSortPreferenceId){
        try{
           
            $params_array = array(
                $KpiSearchandSortPreferenceId
            );
        
            $preferenceDetail = DB::select(' EXEC uspGetSavedKpiFilterPreferenceDetail ?',$params_array);

            $params_array = array(
                $this->user_data['ClientID'],
                $this->user_data['UserID'],
                $KpiSearchandSortPreferenceId
            );
        
            $preference = DB::select(' EXEC uspGetSavedKpiFilterPreference ?,?,?',$params_array);
            $data = array();

            if((count($preferenceDetail) > 0) && (count($preference) > 0) ){

                foreach ($preference as $key => $value) {
                    $data['PreferenceId']   = $value->KpiSearchandSortPreferenceId;
                    $data['PreferenceName'] = $value->KpiSearchandSortPreferenceName;
                    $data['KpiSetId']       = (!empty($value->KpiSetId)) ? explode(',',$value->KpiSetId) : [];
                    $data['IsAllKpiSet']    = $value->IsAllKpiSet;
                    $data['FromDate']       = $value->FromKpiInitiationDate;
                    $data['ToDate']         = $value->ToBusinessOutcomeTargetDate;
                }

                $data['OrderBy'] = array();
                foreach ($preferenceDetail as $key => $value) {
                    array_push($data['OrderBy'], [
                        "SortByField"       => $value->SortByField,
                        "OrderBy"           => $value->OrderBy,
                        "SequenceNumber"    => $value->SequenceNumber
                    ]);
                }

                $message = 'Data retrived successfully';
                return $this->sendResponse($data, $message);
            }else{
                $message = 'No record found';
                return $this->sendResponse($data, $message);
            }
        }
        catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    public function getTimeframeKpiFilter(){
        try {
            $params_array = array(
                $this->user_data['UserID']
            );
        
            $data = DB::select(' EXEC uspGetTimeframeKpiFilter ?',$params_array);

            if(count($data) > 0){
                $message = 'Data retrived successfully';
                return $this->sendResponse($data, $message);
            }else{
                $message = 'No record found';
                return $this->sendResponse($data, $message);
            }
        } catch (\Exception $th) {
            return $this->sendError($th->getMessage());
        }
    }

    public function getDynamicKpiListByKpiSet($showAllKPI, $kpiSearchandSortPreferenceId){
        try {
            $params_array = array(
                $showAllKPI,
                $kpiSearchandSortPreferenceId,
                $this->user_data['UserID']
            );

            $data = DB::select(' EXEC uspGetDynamicKpiListByKpiSet ?,?,?',$params_array);

            if(count($data) > 0){
                $finalResponse = array();
                foreach ($data as $key => $value) {
                    $res = array_search($value->KpiSetId, array_column($finalResponse, 'KpiSetId'));
                    if($res === false){
                        // if($value->KpiSetId != null){
                            array_push($finalResponse,[
                                'KpiSetId'      => $value->KpiSetId,
                                'KPISetTitle'   => $value->KPISetTitle,
                                'Kpi' => array()
                            ]);   
                        // }
                    }
                }

                foreach ($data as $key => $value) {
                    foreach ($finalResponse as $kpiKey => $kpiValue) {
                        if($kpiValue['KpiSetId'] == $value->KpiSetId){
                            array_push($finalResponse[$kpiKey]['Kpi'],$value);
                            break;
                        }
                    }
                }

                $message = 'Data retrived successfully';
                return $this->sendResponse($finalResponse, $message);
            }else{
                $message = 'No record found';
                return $this->sendResponse($data, $message);
            }
        } catch (\Exception $th) {
            return $this->sendError($th->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 22/09/2020
        Name   : deleteKpiControlever
        Params : 
        Type   : DELETE
        Purpose: To delete kpi contro lever
    */
    public function deleteKpiControlever( Request $request, $KpiId, $KpiControlLeversId ){
        try{
            $requestData    = $request->all();
            $params = array(
                $KpiControlLeversId,
                $KpiId,
                $this->user_data['UserID']
            );
            $data = DB::select(' EXEC uspDeleteKPIControlever ?,?,?', $params);
            
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
        }catch( \ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    public function getKPIDashboardValueForEdit (Request $request,$BenchmarkProjectId,$FinancialYear){
        try{
            $params = array(
                $UserId=0,
                $BenchmarkProjectId,
                $FinancialYear
                
              // $this->user_data['UserID']
              
            );
            $data = DB::select('EXEC uspKPIDashboardValueForEdit ?,?,?',$params);
           
          
          $sorted_data = array();
          if($data){
           foreach($data as $k => $value){
    
                 $sorted_data[$value->HeaderValue]['KPIDashboardCategoryId']=$value->KPIDashboardCategoryId;
                 $sorted_data[$value->HeaderValue]['Data'][]=array(
                      "KPIDashboardSubCategoryId"=>$value->KPIDashboardSubCategoryId,
                       "Value"=>$value->DashboardValue,"Name"=>$value->SubCategoryValue );
                
            }
            $message = "KPI Dashboard values  retrieved successfully";
        }
         else {
            $sorted_data = (Object)[];
            $message = 'data not found';
        } 
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
    }  

    public function getFinancialYear(Request $request){
        try{
           // $params = array(
                
              // $this->user_data['UserID'],
              
            //);
            $data = DB::select('EXEC uspGetFinancialYear ');
           
              $sorted_data = array();
              if($data){
              foreach($data as $k => $value){
                
                $sorted_data['FinancialYear'][]= array("ID"=>$value->Id,"Year1"=>$value->Year1,"Year2"=>$value->Year2,"CombinedYear"=>$value->CombinedYear);
                
            }
            $message = "Financial Year   retrieved successfully";
        } else{
            $sorted_data = (Object)[];
            $message = 'data not found';
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
    }  
    public function getQuantitativeQuestionsScore( Request $request,$QuestionId,$QuestionsText ){
        try{
            $params = array(
                $QuestionId,
                $QuestionsText,
               // $UserID =$this->user_data['UserID'],
            );
            $data = DB::select('EXEC uspGetQuantitativeQuestionsScore ?,?',$params);
          
            $sorted_data = array();
           if($data){
           foreach($data as $k => $value){
                $sorted_data["SCORE"] = $value->SCORE;
                $sorted_data["QuestionId"] = $value->QuestionId;
                $sorted_data["QuestionsText"] = $value->QuestionsText;
                              
            }
            $message = "Quantitative Questions Score   retrieved successfully";
        } else{
            $sorted_data = (Object)[];
            $message = 'data not found';
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
    } 
    public function InsertUpdateBenchmarkDropdoenScoring(Request $request){
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
            $data = DB::select('EXEC uspInsertUpdateBenchmarkDropdownScoring ?,?',$param_array);
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
    public function GetKpisAgainstBalanceScoreCardId(Request $request,$BalanceScoreCardId ){
        try{
            $params = array(
                
                $UserID =$this->user_data['UserID'],
                $BalanceScoreCardId,
    
            );
            $data = DB::select('EXEC uspGetKpisAgainstBalanceScoreCardId  ?,?',$params);
          
            $sorted_data = array();
           if($data){
            foreach($data as $k => $value){
                $sorted_data[$k]["KPIName"] = $value->KPIName;
                $sorted_data[$k]["KPITitle"] = $value->KPITitle;
                $sorted_data[$k]["TargetBusinessOutcome"] = $value->TargetBusinessOutcome;
                $sorted_data[$k]["BusinessMetrics"] = $value->BusinessMetrics;
                $sorted_data[$k]["EstimatedAnnualSavingsAmount"] = $value->EstimatedAnnualSavingsAmount;
                $sorted_data[$k]["ExpectedTargetGrowthAmount"] = $value->ExpectedTargetGrowthAmount ;
                $sorted_data[$k]["UnitOfMeasurement"] = $value->UnitOfMeasurement;
                $sorted_data[$k]["BusinessOutComeTargetDate"] = $value->BusinessOutComeTargetDate;
                $sorted_data[$k]["Improvementbasis"] = $value->Improvementbasis;
                $sorted_data[$k]["AuditFrequency"] = $value->AuditFrequency;
                $sorted_data[$k]["HistoricalAchievementAmount"] = $value->HistoricalAchievementAmount;
                $sorted_data[$k]["ExpectedTargetGrowthPercentage"] = $value->ExpectedTargetGrowthPercentage;
                $sorted_data[$k]["KPIInitiationDate"] = $value->KPIInitiationDate;
                $sorted_data[$k]["ExpectedTargetGrowthQty"] = $value->ExpectedTargetGrowthQty;
                $sorted_data[$k]["ExpectedTargetQtyGrowthPercent"] = $value->ExpectedTargetQtyGrowthPercent;
               
            }
            $message = "Kpi Against balanve score card Retrieved Successfully";
        } else{
            $sorted_data = (Object)[];
            $message = 'data not found';
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
}
    public function getBenchmarkDropdoenScoring( Request $request,$BenchmarkProjectId,$DomainID,$BenchmarkQuestionId){
        try{
            $params = array(
                $BenchmarkProjectId,
                $DomainID,
                $BenchmarkQuestionId,
               // $UserID =$this->user_data['UserID'],
            );
            $data = DB::select('EXEC uspGetBenchmarkDropdoenScoring ?,?,?',$params);
          
            $sorted_data = array();
           if($data){
           foreach($data as $k => $value){
                $sorted_data[$k]["DropdownText"] = $value->DropdownText;
                $sorted_data[$k]["QuestionId"] = $value->BenchmarkQuestionID ;
                $sorted_data[$k]["DropdownValue"] = $value->DropdownValue;
                $sorted_data[$k]["IsDropdownScoringEnabled"] = $value->IsDropdownScoringEnabled;
                $sorted_data[$k]["BenchmarkScoringDropdownId"] = $value->BenchmarkScoringDropdownId;                
            }
            $message = "Dropdown Score   retrieved successfully";
        } else{
            $sorted_data = (Object)[];
            $message = 'data not found';
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
    } 
    
}
