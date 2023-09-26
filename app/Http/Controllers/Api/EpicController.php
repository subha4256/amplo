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

class EpicController extends BaseController
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
        Date   : 07/03/2020
        Name   : getBenchmarkingProjectsDomain
        Params : @USERID
        Type   : GET
        Purpose: To Get Benchmarking Projects With Domains 
    */
    public function getBenchmarkingProjectsDomain( Request $request ){
        try{
            
            $requestData = $request->all();
            $userId = $this->user_data['UserID'];
            $params_array = [
                $userId
            ];
           
            $bmpProjectsData = DB::select(' EXEC uspGetUserBMProjects ?', $params_array);
            //echo "<pre>";print_r($bmpProjectsData);echo "<br>";die;
            $data = array();
            if(count($bmpProjectsData)>0){
                foreach($bmpProjectsData as $key=>$val) {
                    $data[$key]["id"]    = "bmproject_".$val->BenchmarkProjectID;
                    $data[$key]["name"]  = $val->BenchmarkProjectName;
                    $domainsData = DB::select('EXEC uspGetUserDomainsForBMProject ?,?', array($userId, $val->BenchmarkProjectID));
                    if(count($domainsData)){
                       foreach ($domainsData as $dk => $value) {
                            $data[$key]['domains'][$dk] = array(
                                'id'  => "bmdomain_".$val->BenchmarkProjectID."_".$value->DomainID,
                                'name'=>$value->DomainName,
                                'isSelected'=>1
                            );
                       }
                    }else{
                        $data[$key]['domains'] = array();
                    }
                }
            }
           
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
    /*
        Author : Abdul
        Date   : 07/03/2020
        Name   : getDecompositionProjects
        Params : @USERID
        Type   : GET
        Purpose: To Get Decomposition Projects 
    */
    public function getDecompositionProjects( Request $request ){
        try{
            $KpiController= new KpiController();
            $userId = $this->user_data['UserID'];
            $params_array = [
                $userId
            ];
            $decompositionProjects = DB::select(' EXEC uspGetDecompositionUserProjects ?', $params_array );
            $data = array();
            $finaliZeroKpis = array();
            if(count($decompositionProjects)>0){
                foreach($decompositionProjects as $key=>$val) {
                    $data[$key]["id"]         = "cmproject_".$val->DecompositionProjectID;
                    $data[$key]["name"]       = $val->ProjectName;
                    $data[$key]["projectId"]  = $val->DecompositionProjectID;
                    $data[$key]["FunctionCount"]= $val->FunctionCount;
                }
            }
            $finaliZeroKpis = $data;
           
            if($finaliZeroKpis){
                $message = "Decomposition projects retrived.";
            }else{
                $message = "No record found";
            }

            return $this->sendResponse($finaliZeroKpis, $message);
            
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    public function getDecompositionProjectsFunctionPhaseLevel( Request $request, $projectId ){
        try{
            $KpiController= new KpiController();
            $userId = $this->user_data['UserID'];
            $decompositionLevel1 = DB::select(' EXEC uspGetDecompositionLevel1 ?,?', array($userId,$projectId) );
            //echo "<pre>";print_r($decompositionLevel1);echo "<br>";die;
            $data = array();
            if(count($decompositionLevel1)>0){
                foreach($decompositionLevel1 as $dl=>$dlVal){
                    $data[$dlVal->FunctionID]['id']   = "cmfunction_".$projectId."_".$dlVal->FunctionID;
                    $data[$dlVal->FunctionID]['name'] = $dlVal->FunctionName;
                    $data[$dlVal->FunctionID]['phases'][$dlVal->PhaseID]['id']   = "cmphase_".$projectId."_".$dlVal->PhaseID;
                    $data[$dlVal->FunctionID]['phases'][$dlVal->PhaseID]['name']   = $dlVal->PhaseName;
                    $my_array = $KpiController->getprocesses($projectId,$dlVal->DecompositionProcessLevel1ID);
                    $data[$dlVal->FunctionID]['phases'][$dlVal->PhaseID]['processes'][] =  $my_array;
                }
            }
            
            $finaliZeroKpis = array_values($data);
            foreach ($finaliZeroKpis as $key => $value) {
                if(isset($value['phases'])){
                    $finaliZeroKpis[$key]['phases']= array_values($value['phases']);
                }
            }
            if($finaliZeroKpis){
                $message = "Decomposition projects retrived.";
            }else{
                $message = "No record found";
            }

            return $this->sendResponse($finaliZeroKpis, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }    
    public function getDecompositionProjectsOld( Request $request ){
        try{
            $KpiController= new KpiController();
            $userId = $this->user_data['UserID'];
            $params_array = [
                $userId
            ];
            $decompositionProjects = DB::select(' EXEC uspGetDecompositionUserProjects ?', $params_array );
            //echo "<pre>";print_r($decompositionProjects);echo "<br>";die;
            $data = array();
            $finaliZeroKpis = array();
            if(count($decompositionProjects)>0){
                foreach($decompositionProjects as $key=>$val) {
                    $data[$key]["id"]  = "cmproject_".$val->DecompositionProjectID;
                    $data[$key]["name"]             = $val->ProjectName;
                    $decompositionLevel1 = DB::select(' EXEC uspGetDecompositionLevel1 ?,?', array($userId,$val->DecompositionProjectID) );
                    if(count($decompositionLevel1)>0){
                        foreach($decompositionLevel1 as $dl=>$dlVal){ 
                            $data[$key]["functions"][$dlVal->FunctionID]['id'] = "cmfunction_".$val->DecompositionProjectID."_".$dlVal->FunctionID;
                            $data[$key]["functions"][$dlVal->FunctionID]['name'] = $dlVal->FunctionName;
                            $data[$key]["functions"][$dlVal->FunctionID]['phases'][$dlVal->PhaseID]['id']   = "cmphase_".$val->DecompositionProjectID."_".$dlVal->PhaseID;
                            $data[$key]["functions"][$dlVal->FunctionID]['phases'][$dlVal->PhaseID]['name']   = $dlVal->PhaseName;
                            $my_array = $KpiController->getprocesses($val->DecompositionProjectID,$dlVal->DecompositionProcessLevel1ID);
                            $data[$key]['functions'][$dlVal->FunctionID]['phases'][$dlVal->PhaseID]['processes'][] =  $my_array;
                        }
                    }else{
                        $data[$key]["functions"] = array();
                    }

                }
            }
            $finaliZeroKpis = $data;
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
            if($finaliZeroKpis){
                $message = "Decomposition projects retrived.";
            }else{
                $message = "No record found";
            }

            return $this->sendResponse($finaliZeroKpis, $message);
            
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 08/03/2020
        Name   : getKpisControllerLever
        Params : @USERID
        Type   : GET
        Purpose: To Get Kpis Controller Lever
    */ 
    public function getKpisControlLevers( Request $request ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $userId
            ];
            $kpiData = array();
            $Kpis = array();
            $iZero = array();
            $finaliZeroKpis = array();
            $data = DB::select(' EXEC uspGetKpis ?',$params_array);
            $kpiData = array();
            if(count($data) > 0){
                $json_decode =json_decode(json_encode($data),true);
               
                foreach ($json_decode as $key => $value) {
                    $kpiData[$value['KPISetID']]['id']   = "kpiset_".$value['KPISetID'];
                    $kpiData[$value['KPISetID']]['name'] = $value['KPISetTitle'];
                    $kpiData[$value['KPISetID']]['kpi'][$value['KPIID']]['id'] = "kpi_".$value['KPISetID']."_".$value['KPIID'];
                    $kpiData[$value['KPISetID']]['kpi'][$value['KPIID']]['name'] = $value['KPITitle'];
                    $kpiData[$value['KPISetID']]['kpi'][$value['KPIID']]['controllevers'][$value['KPIID']]['id'] = "controllevers".$value['KPISetID']."_".$value['KPIID']."_".$value['KPIControlLeversID'];
                    $kpiData[$value['KPISetID']]['kpi'][$value['KPIID']]['controllevers'][$value['KPIID']]['name'] = $value['ControlLeversTitle'];
                }

                $finaliZeroKpis = array_values($kpiData);
                foreach ($finaliZeroKpis as $key => $value) {
                    $finaliZeroKpis[$key]['kpi']= array_values($value['kpi']);
                    foreach($finaliZeroKpis[$key]['kpi'] as $k1=>$v1){
                        $finaliZeroKpis[$key]['kpi'][$k1]['controllevers']= array_values($v1['controllevers']);
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
        Date   : 09/03/2020
        Name   : getUserDetails
        Params : @USERID
        Type   : GET
        Purpose: To Get User Details 
    */   
    public function getUserDetails( Request $request ){
         try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $userId
            ];
            $data = DB::select(' EXEC uspGetUserDetails ?', $params_array );
            
            if(count($data)> 0 ){
                $message = "User Retrieved Successfully.";
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
        Date   : 07/03/2020
        Name   : getDTProjects
        Params : @USERID
        Type   : GET
        Purpose: To Get Other ProjectsOfUser
    */
    public function getOtherProjectsOfUser( Request $request ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $userId
            ];

            $data = DB::select(' EXEC uspGetOtherProjectsOfUser ?', $params_array );
            if(count($data)> 0 ){
                $message = "Projects Retrieved Successfully.";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    public function getprocessesLevel($project_id,$process_id){
        $data = DB::select(' EXEC uspGetDecompositionTreeView ?,?',array($project_id,$process_id)); 
        $response['processes'] = [];
        if(count($data) > 0){
            $my_array = [];
            foreach($data as $l => $level){

                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID=='' && $level->ProcessLevel3ID=='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){
                       
                       $my_array = array(
                           "ProcessLevelTitle" => $level->ProcessLevelTitle,
                           "ProcessLevel1ID"   => $level->ProcessLevel1ID,
                           "isSelected"=>1
                        );
                    }
                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID=='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){

                        $my_array['child'][] = array(
                           "ProcessLevelTitle" => $level->ProcessLevelTitle,
                           "ProcessLevel1ID"   => $level->ProcessLevel1ID,
                           "ProcessLevel2ID"   => $level->ProcessLevel2ID,
                           "isSelected"=>1,
                           'child' => []
                        );
                    }
                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){

                        foreach ($my_array['child'] as $key => $value) {
                            if($value['ProcessLevel2ID']==$level->ProcessLevel2ID){
                                $my_array['child'][$key]['child'][] = array(
                                   "ProcessLevelTitle" => $level->ProcessLevelTitle,
                                   "ProcessLevel1ID"   => $level->ProcessLevel1ID,
                                   "ProcessLevel2ID"   => $level->ProcessLevel2ID,
                                   "ProcessLevel3ID"   => $level->ProcessLevel3ID,
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
                                       "ProcessLevelTitle" => $level->ProcessLevelTitle,
                                       "ProcessLevel1ID"   => $level->ProcessLevel1ID,
                                       "ProcessLevel2ID"   => $level->ProcessLevel2ID,
                                       "ProcessLevel3ID"   => $level->ProcessLevel3ID,
                                       "ProcessLevel4ID"   => $level->ProcessLevel4ID,
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
                                           "ProcessLevelTitle" => $level->ProcessLevelTitle,
                                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                           "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                           "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                           "ProcessLevel4ID"=>$level->ProcessLevel4ID,
                                           "ProcessLevel5ID"=>$level->ProcessLevel5ID,
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
        Author : Abdul
        Date   : 13/03/2020
        Name   : saveEpic
        Params : 
        Type   : POST
        Purpose: To Save Epic
    */
    public function saveEpic( Request $request ){
        try{
            $userId = $this->user_data['UserID'];
            $requestData = $request->all();
            $params_array = [
                $userId,
                json_encode($requestData)
            ];
            
            $data = DB::select(' EXEC uspSaveEpic ?,?', $params_array );

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
        Date   : 13/03/2020
        Name   : getEpic
        Params : @ProjectId,@EpicId,@VersionId
        Type   : GET
        Purpose: To Get Epic
    */
     public function getEpic( Request $request, $projectId,$epicId, $versionId ){
        try{
            $userId = $this->user_data['UserID'];
            $epicParams = [
                $projectId,
                $epicId,
                $versionId
            ];
            $projectData = DB::select(' EXEC uspGetDtProjectDetails ?,?', array($projectId,$versionId));
            $GetEpicAndSubEpic = DB::select(' EXEC uspGetEpicAndSubEpic ?,?,?', $epicParams );
            //echo "<pre>";print_r($projectData);echo "<br>";
            //echo "<pre>";print_r($GetEpicAndSubEpic);echo "<br>";die;
            $data = array();
            $finaliZero = array();
            $data['DtProjectId'] = $projectData[0]->DTProjectID;
            $data['Title'] = $projectData[0]->ProjectTitle;
            $data['Version'] = $projectData[0]->ProjectVersion;
            if(count($GetEpicAndSubEpic) > 0){
                foreach ($GetEpicAndSubEpic as $key => $value) {
                    if($value->ParentEpicHeaderId==''){
                        $data['Epic'][$value->DTEPICHeaderID]['id']   = $value->DTEPICHeaderID;
                        $data['Epic'][$value->DTEPICHeaderID]['name'] = $value->Title;
                        $data['Epic'][$value->DTEPICHeaderID]['Version'] = $value->Version;
                        $data['Epic'][$value->DTEPICHeaderID]['EpicOrSubEpic'] = $value->EpicOrSubEpic;
                        $data['Epic'][$value->DTEPICHeaderID]['Goal'] = $value->Goal;
                        $data['Epic'][$value->DTEPICHeaderID]['Description'] = $value->Description;
                        
                        $EpicBenchMarkingDetails = DB::select(' EXEC uspGetEpicBenchMarkingDetails ?,?', array($value->DTEPICHeaderID,$versionId) );
                        
                        $EpicCapabilityModellingDetails = DB::select(' EXEC uspGetEpicCapabilityModellingDetails ?,?', array($value->DTEPICHeaderID,$versionId) );

                        $EpicDtKpiDetail = DB::select(' EXEC uspGetDtKpiDetail ?,?', array($value->DTEPICHeaderID,$versionId) );
                      
                        if(count($EpicBenchMarkingDetails) > 0){
                            foreach($EpicBenchMarkingDetails as $k=>$val){
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->Name;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['score'] = $val->Score;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['type'] = "BenchmarkingProjects";
                            }
                        }
                        if(count($EpicCapabilityModellingDetails) > 0){
                            foreach($EpicCapabilityModellingDetails as $k=>$val){
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->Name;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['score'] = $val->Score;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['type'] = "CapabilityModellingProjects";
                            }
                        }
                        if(count($EpicDtKpiDetail) > 0){
                            foreach($EpicDtKpiDetail as $k=>$val){
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->Name;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['score'] = $val->Score;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['type'] = "Kpis";
                            }
                        }
                        $DtNoiHeader = DB::select(' EXEC uspGetDtNoiHeader ?,?', array($value->DTEPICHeaderID,$versionId) );
                        if(count($DtNoiHeader)>0){
                            $data['Epic'][$value->DTEPICHeaderID]['NOI']['NoiId'] = $DtNoiHeader[0]->NOIID;
                            $data['Epic'][$value->DTEPICHeaderID]['NOI']['TemplateNoiName'] = $DtNoiHeader[0]->NOITitle;
                            $data['Epic'][$value->DTEPICHeaderID]['NOI']['OriginalTemplateID'] = $DtNoiHeader[0]->OriginalTemplateID;
                            $data['Epic'][$value->DTEPICHeaderID]['NOI']['NOIImageURL'] = $DtNoiHeader[0]->NOIImageURL;

                            $DtNoiDetails = DB::select(' EXEC uspGetDtNoiDetail ?,?', array($DtNoiHeader[0]->NOIID,$versionId) );
                            $data['Epic'][$value->DTEPICHeaderID]['NOI']['NoiDetails'] = $DtNoiDetails;
                        }else{
                             $data['Epic'][$value->DTEPICHeaderID]['NOI'] = '';
                        }
                        if(count($EpicBenchMarkingDetails)==0 && count($EpicCapabilityModellingDetails)==0 && count($EpicDtKpiDetail)==0){
                            $data['Epic'][$value->DTEPICHeaderID]['Association'] = array();   
                        }
                        $subEpicData = DB::select(' EXEC uspGetSubEpicByEpic ?', array($value->DTEPICHeaderID) );
                        if(count($subEpicData) > 0){
                            foreach ($subEpicData as $sekey => $seval) {
                                $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['id'] = $seval->DTEPICHeaderID;
                                $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['name'] = $seval->Title;
                                $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Version'] = $seval->Version;
                                $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['EpicOrSubEpic'] = '';
                                $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Goal'] = $seval->Goal;
                                $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Description'] = $seval->Description;
                                $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['SequenceNumber'] = $seval->SequenceNumber;
                                
                                $SubEpicBenchMarkingDetails = DB::select(' EXEC uspGetEpicBenchMarkingDetails ?,?', array($seval->DTEPICHeaderID,$versionId) );

                                $SubEpicCapabilityModellingDetails = DB::select(' EXEC uspGetEpicCapabilityModellingDetails ?,?', array($seval->DTEPICHeaderID,$versionId) );

                                $SubEpicDtKpiDetail = DB::select(' EXEC uspGetDtKpiDetail ?,?', array($seval->DTEPICHeaderID,$versionId) );

                                if(count($SubEpicBenchMarkingDetails) > 0){
                                    foreach($SubEpicBenchMarkingDetails as $k=>$val){
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->Name;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['score'] = $val->Score;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['type'] = "BenchmarkingProjects";
                                    }
                                }
                                if(count($SubEpicCapabilityModellingDetails) > 0){
                                    foreach($SubEpicCapabilityModellingDetails as $k=>$val){
                                      
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->Name;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['score'] = $val->Score;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['type'] = "CapabilityModellingProjects";
                                    }
                                }
                                if(count($SubEpicDtKpiDetail) > 0){
                                    foreach($SubEpicDtKpiDetail as $k=>$val){
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->Name;
                                         $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['score'] = $val->Score;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['type'] = "Kpis";
                                    }
                                }
                                if(count($SubEpicBenchMarkingDetails)==0 && count($SubEpicCapabilityModellingDetails)==0 && count($SubEpicDtKpiDetail)==0){
                                     $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'] = array();
                                }
                            }
                        }else{
                            $data['Epic'][$value->DTEPICHeaderID]['SubEpic'] = array();
                        }
                    }
                }

                $finaliZero['DtProjectId'] = $data['DtProjectId'];
                $finaliZero['Title']       = $data['Title'];
                $finaliZero['Version']     = $data['Version'];
                $finaliZeroData            = array_values($data['Epic']);
                foreach ($finaliZeroData as $key => $value) {
                    if(isset($value['Association']) && count($value['Association']) > 0){
                        $finaliZeroData[$key]['Association'] = array_values($value['Association']);
                    }
                    if(isset($value['SubEpic'])){
                        $finaliZeroData[$key]['SubEpic'] = array_values($value['SubEpic']);
                        foreach ($finaliZeroData[$key]['SubEpic'] as $k => $v) {
                            if(isset($v['Association'])){
                                $finaliZeroData[$key]['SubEpic'][$k]['Association'] = array_values($v['Association']);
                            }
                        }
                    }
                }
                $finaliZero['EPic'] = $finaliZeroData;
                $message            = "Epic data retrieved.";
            }else{
                $message = "No data found";
            }
            return $this->sendResponse($finaliZero, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }    
    public function getEpicOld( Request $request, $projectId ){
        try{
            $userId = $this->user_data['UserID'];
            $epicId = 0;
            $epicSubparams_array = [
                $projectId,
                $epicId
            ];
            $projectData = DB::select(' EXEC uspGetDtProjectDetails ?', array($projectId));
            $GetEpicAndSubEpic = DB::select(' EXEC uspGetEpicAndSubEpic ?,?', $epicSubparams_array );
            //echo "<pre>";print_r($GetEpicAndSubEpic);echo "<br>";die;
            $data = array();
            $finaliZero = array();
            $data['DtProjectId'] = $projectData[0]->DTProjectID;
            $data['Title'] = $projectData[0]->ProjectTitle;
            $data['Version'] = $projectData[0]->ProjectVersion;
            if(count($GetEpicAndSubEpic) > 0){
                foreach ($GetEpicAndSubEpic as $key => $value) {
                    if($value->ParentEpicHeaderId==''){
                        $data['Epic'][$value->DTEPICHeaderID]['id']   = $value->DTEPICHeaderID;
                        $data['Epic'][$value->DTEPICHeaderID]['name'] = $value->Title;

                        $EpicBenchMarkingDetails = DB::select(' EXEC uspGetEpicBenchMarkingDetails ?', array($value->DTEPICHeaderID) );

                        $EpicCapabilityModellingDetails = DB::select(' EXEC uspGetEpicCapabilityModellingDetails ?', array($value->DTEPICHeaderID) );

                        $EpicDtKpiDetail = DB::select(' EXEC uspGetDtKpiDetail ?', array($value->DTEPICHeaderID) );
                        
                        if(count($EpicBenchMarkingDetails) > 0){
                            foreach($EpicBenchMarkingDetails as $k=>$val){
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                 $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->DomainName;
                            }
                        }
                        if(count($EpicCapabilityModellingDetails) > 0){
                            foreach($EpicCapabilityModellingDetails as $k=>$val){
                                $cmlStr   = explode('_',$val->InputId);
                                $cml      = substr($cmlStr[0],'-1');
                                $titleKey = "ProcessLevel".$cml."Title";
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                 $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->$titleKey;
                            }
                        }
                        if(count($EpicDtKpiDetail) > 0){
                            foreach($EpicDtKpiDetail as $k=>$val){
                                $data['Epic'][$value->ParentEpicHeaderId]['Association'][$val->InputId]['id'] = $val->InputId;
                                $data['Epic'][$value->ParentEpicHeaderId]['Association'][$val->InputId]['id'] = $val->ControlLeversTitle;
                            }
                        }
                    }
                    
                    if($value->ParentEpicHeaderId!=''){
                        $data['Epic'][$value->ParentEpicHeaderId]['SubEpic'][$value->DTEPICHeaderID]['id']   = $value->DTEPICHeaderID;
                        $data['Epic'][$value->ParentEpicHeaderId]['SubEpic'][$value->DTEPICHeaderID]['name'] = $value->Title;

                        $SubEpicBenchMarkingDetails = DB::select(' EXEC uspGetEpicBenchMarkingDetails ?', array($value->DTEPICHeaderID) );

                        $SubEpicCapabilityModellingDetails = DB::select(' EXEC uspGetEpicCapabilityModellingDetails ?', array($value->DTEPICHeaderID) );

                        $SubEpicDtKpiDetail = DB::select(' EXEC uspGetDtKpiDetail ?', array($value->DTEPICHeaderID) );

                        
                        if(count($SubEpicBenchMarkingDetails) > 0){
                            foreach($SubEpicBenchMarkingDetails as $k=>$val){
                                $data['Epic'][$value->ParentEpicHeaderId]['SubEpic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                $data['Epic'][$value->ParentEpicHeaderId]['SubEpic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->DomainName;
                            }
                        }
                        if(count($SubEpicCapabilityModellingDetails) > 0){
                            foreach($SubEpicCapabilityModellingDetails as $k=>$val){
                                $cmlStr   = explode('_',$val->InputId);
                                $cml      = substr($cmlStr[0],'-1');
                                $titleKey = "ProcessLevel".$cml."Title";
                              
                                $data['Epic'][$value->ParentEpicHeaderId]['SubEpic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                $data['Epic'][$value->ParentEpicHeaderId]['SubEpic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->$titleKey;
                            }
                        }
                        if(count($SubEpicDtKpiDetail) > 0){
                            foreach($SubEpicDtKpiDetail as $k=>$val){
                                $data['Epic'][$value->ParentEpicHeaderId]['SubEpic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                $data['Epic'][$value->ParentEpicHeaderId]['SubEpic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->ControlLeversTitle;
                            }
                        }
                    }
                    $DtNoiHeader = DB::select(' EXEC uspGetDtNoiHeader ?', array($value->DTEPICHeaderID) );
                        
                    if(count($DtNoiHeader)>0){
                        $data['Epic'][$value->DTEPICHeaderID]['NOI']['NoiId'] = $DtNoiHeader[0]->NOIID;
                        $data['Epic'][$value->DTEPICHeaderID]['NOI']['TemplateNoiName'] = $DtNoiHeader[0]->NOITitle;

                        $DtNoiDetails = DB::select(' EXEC uspGetDtNoiDetail ?', array($DtNoiHeader[0]->NOIID) );
                        $data['Epic'][$value->DTEPICHeaderID]['NOI']['NoiDetails'] = $DtNoiDetails;
                    }
                }  
                $finaliZero['DtProjectId'] = $data['DtProjectId'];
                $finaliZero['Title']       = $data['Title'];
                $finaliZero['Version']     = $data['Version'];
                $finaliZeroData = array_values($data['Epic']);
                foreach ($finaliZeroData as $key => $value) {
                    if(isset($value['SubEpic'])){
                        $finaliZeroData[$key]['SubEpic'] = array_values($value['SubEpic']);
                        foreach ($finaliZeroData[$key]['SubEpic'] as $k => $v) {
                            if(isset($v['Association'])){
                                $finaliZeroData[$key]['SubEpic'][$k]['Association'] = array_values($v['Association']);
                            }
                        }
                    }
                }
        
                $finaliZero['EPic'] = $finaliZeroData;
                $message = "Epic data retrieved.";
            }else{
                $message = "No data found";
            }
           return $this->sendResponse($finaliZero, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 21/04/2020
        Name   : getEpicProject
        Params : @DtProjectId
        Type   : GET
        Purpose: To Get Epic Project
    */
    public function getEpicProject(request $request, $projectId, $versionId){
        try {
            $userId = $this->user_data['UserID'];
            $projectId;
            $data = DB::select(' EXEC uspGetDtProjectDetails ?,?', array($projectId,$versionId));
            if(count($data) > 0){
                $message = "Project data retrieved successfully.";
            }else{
                $message = "No record found.";
            }
            return $this->sendResponse($data, $message);
        }catch (\Exception $e) {
            return $this->sendError($e->getMessage());
       }
    }
    /*
        Author : Abdul
        Date   : 21/04/2020
        Name   : getAllEpic
        Params : @DtProjectId
        Type   : GET
        Purpose: To Get All Epic By Project
    */
    public function getAllEpic(request $request, $projectId, $versionId){
        try {
            $userId = $this->user_data['UserID'];
            $epicId = 0;
            $params = [
                $projectId,
                $epicId,
                $versionId
            ];
            $epicSubEpicData = DB::select(' EXEC uspGetEpicAndSubEpic ?,?,?', $params );
            $data = array();
            if(count($epicSubEpicData) > 0){
                foreach ($epicSubEpicData as $key => $value) {
                    if($value->ParentEpicHeaderId==''){
                        $data[$key]['DTEPICHeaderID'] = $value->DTEPICHeaderID;
                        $data[$key]['Title']   = $value->Title;
                        $data[$key]['Version'] = $value->Version;
                    }
                }
                $data = array_values($data);
                $message = "Epic data retrieved successfully.";
            }else{
                $message = "No record found.";
            }
            return $this->sendResponse($data, $message);
        }catch (\Exception $e) {
            return $this->sendError($e->getMessage());
       }
    }
    /*
        Author : Abdul
        Date   : 22/04/2020
        Name   : getEpicSubEpicDeatils
        Params : @DtProjectId,@EpicId,@VersionId
        Type   : GET
        Purpose: To Get Epic And Sub Epic
    */
    public function getEpicSubEpicDeatils(request $request, $projectId, $epicId, $versionId){
        try {
            $userId = $this->user_data['UserID'];
            $params = [
                $projectId,
                $epicId,
                $versionId
            ];
            
            $epicData = DB::select(' EXEC uspGetEpicAndSubEpic ?,?,?', $params );
            if(count($epicData) > 0){
                $data['DTEPICHeaderID'] = $epicData[0]->DTEPICHeaderID;
                $data['Title']          = $epicData[0]->Title;
                $data['Version']        = $epicData[0]->Version;
                $data['Epic']           = $epicData[0]->EpicOrSubEpic;
                $data['Goal']           = $epicData[0]->Goal;
                $data['Description']    = $epicData[0]->Description; 
                $DtNoiHeader    = DB::select(' EXEC uspGetDtNoiHeader ?,?', array($epicData[0]->DTEPICHeaderID,$versionId) );
                $data['NOI']    = isset($DtNoiHeader[0]->NOITitle) ? $DtNoiHeader[0]->NOITitle : "";
                $epicBMDetails = DB::select(' EXEC uspGetEpicBenchMarkingDetails ?,?', array($epicData[0]->DTEPICHeaderID, $versionId) );

                $epicCMDetails = DB::select(' EXEC uspGetEpicCapabilityModellingDetails ?,?', array($epicData[0]->DTEPICHeaderID, $versionId) );

                $epicDtKpiDetail = DB::select(' EXEC uspGetDtKpiDetail ?,?', array($epicData[0]->DTEPICHeaderID, $versionId) );
                if(count($epicBMDetails) >0){
                    foreach ($epicBMDetails as $ebmkey => $ebmval) {
                        $data['BenchmarkingProjects'][$ebmkey]['id']   = $ebmval->InputId;
                        $data['BenchmarkingProjects'][$ebmkey]['name'] = $ebmval->Name;
                    }
                }else{
                    $data['BenchmarkingProjects'] = array();
                }

                if(count($epicCMDetails) > 0){
                    foreach($epicCMDetails as $ecmkey=>$ecmval){
                        $data['CapabilityModellingProjects'][$ecmkey]['id']   = $ecmval->InputId;
                        $data['CapabilityModellingProjects'][$ecmkey]['name'] = $ecmval->Name;
                    }
                }else{
                    $data['CapabilityModellingProjects'] = array();
                }

                if(count($epicDtKpiDetail) > 0){
                    foreach($epicDtKpiDetail as $kpikey=>$kpival){
                        $data['Kpis'][$kpikey]['id']   = $kpival->InputId;
                        $data['Kpis'][$kpikey]['name'] = $kpival->Name;
                    }
                }else{
                     $data['Kpis'] = array();
                }

                $subEpicData = DB::select(' EXEC uspGetSubEpicByEpic ?', array($epicData[0]->DTEPICHeaderID) );
                if(count($subEpicData) > 0){
                    foreach ($subEpicData as $key => $value) {
                       $data['SubEpic'][$key]['DTEPICHeaderID'] = $value->DTEPICHeaderID;
                       $data['SubEpic'][$key]['Title']          = $value->Title;
                       $data['SubEpic'][$key]['Version']        = $value->Version;
                       $data['SubEpic'][$key]['Sub Epic']       = "";
                       $data['SubEpic'][$key]['Goal']           = $value->Goal;
                       $data['SubEpic'][$key]['Description']    = $value->Description;

                        $subEpicBenchMarkingDetails = DB::select(' EXEC uspGetEpicBenchMarkingDetails ?,?', array($value->DTEPICHeaderID,$versionId) );

                        $subEpicCapabilityModellingDetails = DB::select(' EXEC uspGetEpicCapabilityModellingDetails ?,?', array($value->DTEPICHeaderID,$versionId) );

                        $subEpicDtKpiDetail = DB::select(' EXEC uspGetDtKpiDetail ?,?', array($value->DTEPICHeaderID,$versionId) );

                        if(count($subEpicBenchMarkingDetails) >0){
                            foreach ($subEpicBenchMarkingDetails as $bmkey => $bmval) {
                                $data['SubEpic'][$key]['BenchmarkingProjects'][$bmkey]['id'] = $bmval->InputId;
                                $data['SubEpic'][$key]['BenchmarkingProjects'][$bmkey]['name'] = $bmval->Name;
                            }
                        }else{
                            $data['SubEpic'][$key]['BenchmarkingProjects'] = array();
                        }
                      
                        if(count($subEpicCapabilityModellingDetails) >0){
                            foreach ($subEpicCapabilityModellingDetails as $cmkey => $cmval) {
                                $data['SubEpic'][$key]['CapabilityModellingProjects'][$cmkey]['id'] = $cmval->InputId;
                                $data['SubEpic'][$key]['CapabilityModellingProjects'][$cmkey]['name'] = $cmval->Name;
                            }
                        }else{
                            $data['SubEpic'][$key]['CapabilityModellingProjects'] = array();
                        }

                        if(count($subEpicDtKpiDetail) > 0){
                            foreach($subEpicDtKpiDetail as $kpikey=>$kpival){
                                $data['SubEpic'][$key]['Kpis'][$kpikey]['id'] = $kpival->InputId;
                                $data['SubEpic'][$key]['Kpis'][$kpikey]['name'] = $kpival->Name;
                            }
                        }else{
                             $data['SubEpic'][$key]['Kpis'] = array();
                        }
                    }
                }
                else{
                    $data['SubEpic'] = array();
                }
                $message = "Epic details retrieved successfully.";
            }else{
                $data = '{}';
                $message = "No record found.";
            }
            
            return $this->sendResponse($data, $message);
        }catch (\Exception $e) {
            return $this->sendError($e->getMessage());
       }
    }
      /*
        Author : Abdul
        Date   : 07/07/2020
        Name   : projectLockUnLock
        Params : 
        Type   : POST
        Purpose: To save project version lock unlock
    */
    public function projectLockUnLock(Request $request){
        try{
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = [
                $requestData['ProjectId'],
                $requestData['IsUnlocked'],
                $userId,
                $requestData['VersionNo'],
                $requestData['ReasonForNewVersion']
            ];
            $data = DB::select(' EXEC uspProjectLockUnLock ?,?,?,?,?', $params_array);
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
        Date   : 02/07/2020
        Name   : getDtProjectVersionHistory
        Params : @ProjectId
        Type   : GET
        Purpose: To Get All Version Of DT Project
    */
    public function getDtProjectVersionHistory( Request $request, $projectId ){
        try{
            
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId
            ];
            $data = DB::select(' EXEC uspGetProjectVersionHistory ?', $params_array);
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
    /*
        Author : Abdul
        Date   : 02/07/2020
        Name   : getEpicVersionHistory
        Params : @EpicId,@ProjectId
        Type   : GET
        Purpose: To Get All Version Of Epic
    */
    public function getEpicVersionHistory( Request $request, $epicId, $projectId ){
        try{
            
            $userId = $this->user_data['UserID'];
            $params_array = [
                $epicId,
                $projectId
            ];
            $data = DB::select(' EXEC uspGetEpicVersionHistory ?,?', $params_array);
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

    /*
        Author : Abdul
        Date   : 03/07/2020
        Name   : epicLockUnLock
        Params : 
        Type   : POST
        Purpose: To save epic version lock unlock
    */
    public function epicLockUnLock(Request $request){
        try{
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = [
                $requestData['EpicId'],
                $requestData['IsUnlocked'],
                $userId,
                $requestData['VersionNo'],
                $requestData['ReasonForNewVersion']
            ];
            $data = DB::select(' EXEC uspEpicLockUnLock ?,?,?,?,?', $params_array);
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
        Author : Narinder
        Date   : 23/07/2020
        Name   : getEpicSubEpicAllDeatils
        Params : @DtProjectId,@EpicId,@VersionId
        Type   : GET
        Purpose: To Get Epic And Sub Epic
    */
    public function getEpicSubEpicAllDeatils(request $request, $projectId, $epicId, $versionId){
        try {
            $userId = $this->user_data['UserID'];
            $params = [
                $projectId,
                $epicId,
                $versionId
            ];
            
            $epicData = DB::select(' EXEC uspGetEpicAndSubEpic ?,?,?', $params );
            
            if(count($epicData) > 0){
                $data['DTEPICHeaderID'] = $epicData[0]->DTEPICHeaderID;
                $data['Title']          = $epicData[0]->Title;
                $data['Version']        = $epicData[0]->Version;
                $data['Epic']           = $epicData[0]->EpicOrSubEpic;
                $data['Goal']           = $epicData[0]->Goal;
                $data['Description']    = $epicData[0]->Description; 
                $data['Epiccount']      = count($epicData);
                $DtNoiHeader    = DB::select(' EXEC uspGetDtNoiHeader ?,?', array($epicData[0]->DTEPICHeaderID,$versionId) );
                $data['NOI']    = isset($DtNoiHeader[0]->NOITitle) ? $DtNoiHeader[0]->NOITitle : "";
                $epicBMDetails = DB::select(' EXEC uspGetEpicBenchMarkingDetails ?,?', array($epicData[0]->DTEPICHeaderID, $versionId) );

                $epicCMDetails = DB::select(' EXEC uspGetEpicCapabilityModellingDetails ?,?', array($epicData[0]->DTEPICHeaderID, $versionId) );

                $epicDtKpiDetail = DB::select(' EXEC uspGetDtKpiDetail ?,?', array($epicData[0]->DTEPICHeaderID, $versionId) );
                if(count($epicBMDetails) >0){
                    foreach ($epicBMDetails as $ebmkey => $ebmval) {
                        $data['BenchmarkingProjects'][$ebmkey]['id']   = $ebmval->InputId;
                        $data['BenchmarkingProjects'][$ebmkey]['name'] = $ebmval->Name;
                    }
                }else{
                    $data['BenchmarkingProjects'] = array();
                }

                if(count($epicCMDetails) > 0){
                    foreach($epicCMDetails as $ecmkey=>$ecmval){
                        $data['CapabilityModellingProjects'][$ecmkey]['id']   = $ecmval->InputId;
                        $data['CapabilityModellingProjects'][$ecmkey]['name'] = $ecmval->Name;
                    }
                }else{
                    $data['CapabilityModellingProjects'] = array();
                }

                if(count($epicDtKpiDetail) > 0){
                    foreach($epicDtKpiDetail as $kpikey=>$kpival){
                        $data['Kpis'][$kpikey]['id']   = $kpival->InputId;
                        $data['Kpis'][$kpikey]['name'] = $kpival->Name;
                    }
                }else{
                     $data['Kpis'] = array();
                }

                $subEpicData = DB::select(' EXEC uspGetSubEpicByEpic ?', array($epicData[0]->DTEPICHeaderID) );
                if(count($subEpicData) > 0){
                    foreach ($subEpicData as $key => $value) {
                       $data['SubEpic'][$key]['DTEPICHeaderID'] = $value->DTEPICHeaderID;
                       $data['SubEpic'][$key]['Title']          = $value->Title;
                       $data['SubEpic'][$key]['Version']        = $value->Version;
                       $data['SubEpic'][$key]['Sub Epic']       = "";
                       $data['SubEpic'][$key]['Goal']           = $value->Goal;
                       $data['SubEpic'][$key]['Description']    = $value->Description;

                        $subEpicBenchMarkingDetails = DB::select(' EXEC uspGetEpicBenchMarkingDetails ?,?', array($value->DTEPICHeaderID,$versionId) );

                        $subEpicCapabilityModellingDetails = DB::select(' EXEC uspGetEpicCapabilityModellingDetails ?,?', array($value->DTEPICHeaderID,$versionId) );

                        $subEpicDtKpiDetail = DB::select(' EXEC uspGetDtKpiDetail ?,?', array($value->DTEPICHeaderID,$versionId) );

                        if(count($subEpicBenchMarkingDetails) >0){
                            foreach ($subEpicBenchMarkingDetails as $bmkey => $bmval) {
                                $data['SubEpic'][$key]['BenchmarkingProjects'][$bmkey]['id'] = $bmval->InputId;
                                $data['SubEpic'][$key]['BenchmarkingProjects'][$bmkey]['name'] = $bmval->Name;
                            }
                        }else{
                            $data['SubEpic'][$key]['BenchmarkingProjects'] = array();
                        }
                      
                        if(count($subEpicCapabilityModellingDetails) >0){
                            foreach ($subEpicCapabilityModellingDetails as $cmkey => $cmval) {
                                $data['SubEpic'][$key]['CapabilityModellingProjects'][$cmkey]['id'] = $cmval->InputId;
                                $data['SubEpic'][$key]['CapabilityModellingProjects'][$cmkey]['name'] = $cmval->Name;
                            }
                        }else{
                            $data['SubEpic'][$key]['CapabilityModellingProjects'] = array();
                        }

                        if(count($subEpicDtKpiDetail) > 0){
                            foreach($subEpicDtKpiDetail as $kpikey=>$kpival){
                                $data['SubEpic'][$key]['Kpis'][$kpikey]['id'] = $kpival->InputId;
                                $data['SubEpic'][$key]['Kpis'][$kpikey]['name'] = $kpival->Name;
                            }
                        }else{
                             $data['SubEpic'][$key]['Kpis'] = array();
                        }
                    }
                }
                else{
                    $data['SubEpic'] = array();
                }
                $message = "Epic details retrieved successfully.";
            }else{
                $data = '{}';
                $message = "No record found.";
            }
            
            return $this->sendResponse($data, $message);
        }catch (\Exception $e) {
            return $this->sendError($e->getMessage());
       }
    }
    /*
        Author : Narinder
        Date   : 23/07/2020
        Name   : getEpicsubEpic
        Params : @ProjectId,@EpicId,@VersionId
        Type   : GET
        Purpose: To Get Epic and subepic data
    */
     public function getEpicSubEpic( Request $request, $projectId,$epicId, $versionId ){
        try{
            $userId = $this->user_data['UserID'];
            $epicParams = [
                $projectId,
                $epicId,
                $versionId
            ];
            $projectData = DB::select(' EXEC uspGetDtProjectDetails ?,?', array($projectId,$versionId));
            $GetEpicAndSubEpic = DB::select(' EXEC uspGetEpicAndSubEpic ?,?,?', $epicParams );
            // echo "<pre>";print_r($projectData);echo "<br>";   echo "<pre>";print_r($GetEpicAndSubEpic);echo "<br>";die;
            $data = array();
            $finaliZero = array();
            $data['DtProjectId'] = $projectData[0]->DTProjectID;
            $data['Title'] = $projectData[0]->ProjectTitle;
            $data['Version'] = $projectData[0]->ProjectVersion;
            if(count($GetEpicAndSubEpic) > 0){
                foreach ($GetEpicAndSubEpic as $key => $value) {
                    if($value->ParentEpicHeaderId==''){
                        $data['Epic'][$value->DTEPICHeaderID]['id']   = $value->DTEPICHeaderID;
                        $data['Epic'][$value->DTEPICHeaderID]['name'] = $value->Title;
                        $data['Epic'][$value->DTEPICHeaderID]['Version'] = $value->Version;
                        $data['Epic'][$value->DTEPICHeaderID]['EpicOrSubEpic'] = $value->EpicOrSubEpic;
                        $data['Epic'][$value->DTEPICHeaderID]['Goal'] = $value->Goal;
                        $data['Epic'][$value->DTEPICHeaderID]['Description'] = $value->Description;
                        
                        $EpicBenchMarkingDetails = DB::select(' EXEC uspGetEpicBenchMarkingDetails ?,?', array($value->DTEPICHeaderID,$versionId) );
                        
                        $EpicCapabilityModellingDetails = DB::select(' EXEC uspGetEpicCapabilityModellingDetails ?,?', array($value->DTEPICHeaderID,$versionId) );

                        $EpicDtKpiDetail = DB::select(' EXEC uspGetDtKpiDetail ?,?', array($value->DTEPICHeaderID,$versionId) );
                        $data['Epic'][$value->DTEPICHeaderID]['scenarios'] = count($EpicBenchMarkingDetails) + count($EpicCapabilityModellingDetails) + count($EpicDtKpiDetail);
     
                        if(count($EpicBenchMarkingDetails) > 0){
                            foreach($EpicBenchMarkingDetails as $k=>$val){
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->Name;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['score'] = $val->Score;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['type'] = "BenchmarkingProjects";
                            }
                        }
                        if(count($EpicCapabilityModellingDetails) > 0){
                            foreach($EpicCapabilityModellingDetails as $k=>$val){
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->Name;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['score'] = $val->Score;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['type'] = "CapabilityModellingProjects";
                            }
                        }
                        if(count($EpicDtKpiDetail) > 0){
                            foreach($EpicDtKpiDetail as $k=>$val){
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->Name;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['score'] = $val->Score;
                                $data['Epic'][$value->DTEPICHeaderID]['Association'][$val->InputId]['type'] = "Kpis";
                            }
                        }                    
                        $DtNoiHeader = DB::select(' EXEC uspGetDtNoiHeader ?,?', array($value->DTEPICHeaderID,$versionId) );
                        if(count($DtNoiHeader)>0){
                            $data['Epic'][$value->DTEPICHeaderID]['NOI']['NoiId'] = $DtNoiHeader[0]->NOIID;
                            $data['Epic'][$value->DTEPICHeaderID]['NOI']['TemplateNoiName'] = $DtNoiHeader[0]->NOITitle;

                            $DtNoiDetails = DB::select(' EXEC uspGetDtNoiDetail ?,?', array($DtNoiHeader[0]->NOIID,$versionId) );
                            $data['Epic'][$value->DTEPICHeaderID]['NOI']['NoiDetails'] = $DtNoiDetails;
                        }
                        if(count($EpicBenchMarkingDetails)==0 && count($EpicCapabilityModellingDetails)==0 && count($EpicDtKpiDetail)==0){
                            $data['Epic'][$value->DTEPICHeaderID]['Association'] = array();   
                        }
                        $subEpicData = DB::select(' EXEC uspGetSubEpicByEpic ?', array($value->DTEPICHeaderID) );
                        if(count($subEpicData) > 0){
                            foreach ($subEpicData as $sekey => $seval) {
                                $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['id'] = $seval->DTEPICHeaderID;
                                $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['name'] = $seval->Title;
                                $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Version'] = $seval->Version;
                                $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['EpicOrSubEpic'] = '';
                                $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Goal'] = $seval->Goal;
                                $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Description'] = $seval->Description;

                                $SubEpicBenchMarkingDetails = DB::select(' EXEC uspGetEpicBenchMarkingDetails ?,?', array($seval->DTEPICHeaderID,$versionId) );

                                $SubEpicCapabilityModellingDetails = DB::select(' EXEC uspGetEpicCapabilityModellingDetails ?,?', array($seval->DTEPICHeaderID,$versionId) );

                                $SubEpicDtKpiDetail = DB::select(' EXEC uspGetDtKpiDetail ?,?', array($seval->DTEPICHeaderID,$versionId) );
                                $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['scenarios']  =  count($SubEpicBenchMarkingDetails) + count($SubEpicCapabilityModellingDetails) + count($SubEpicDtKpiDetail);
                                
                                if(count($SubEpicBenchMarkingDetails) > 0){
                                    foreach($SubEpicBenchMarkingDetails as $k=>$val){
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->Name;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['score'] = $val->Score;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['type'] = "BenchmarkingProjects";
                                    }
                                }
                                if(count($SubEpicCapabilityModellingDetails) > 0){
                                    foreach($SubEpicCapabilityModellingDetails as $k=>$val){
                                      
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->Name;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['score'] = $val->Score;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['type'] = "CapabilityModellingProjects";
                                    }
                                }
                                if(count($SubEpicDtKpiDetail) > 0){
                                    foreach($SubEpicDtKpiDetail as $k=>$val){
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['id'] = $val->InputId;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['name'] = $val->Name;
                                         $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['score'] = $val->Score;
                                        $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'][$val->InputId]['type'] = "Kpis";
                                    }
                                }
                                if(count($SubEpicBenchMarkingDetails)==0 && count($SubEpicCapabilityModellingDetails)==0 && count($SubEpicDtKpiDetail)==0){
                                     $data['Epic'][$value->DTEPICHeaderID]['SubEpic'][$seval->DTEPICHeaderID]['Association'] = array();
                                }
                            }
                        }else{
                            $data['Epic'][$value->DTEPICHeaderID]['SubEpic'] = array();
                        }
                    }
                }

                $finaliZero['DtProjectId'] = $data['DtProjectId'];
                $finaliZero['Title']       = $data['Title'];
                $finaliZero['Version']     = $data['Version'];
                $finaliZeroData            = array_values($data['Epic']);
                foreach ($finaliZeroData as $key => $value) {
                    if(isset($value['Association']) && count($value['Association']) > 0){
                        $finaliZeroData[$key]['Association'] = array_values($value['Association']);
                    }
                    if(isset($value['SubEpic'])){
                        $finaliZeroData[$key]['SubEpic'] = array_values($value['SubEpic']);
                        foreach ($finaliZeroData[$key]['SubEpic'] as $k => $v) {
                            if(isset($v['Association'])){
                                $finaliZeroData[$key]['SubEpic'][$k]['Association'] = array_values($v['Association']);
                            }
                        }
                    }
                }
                $finaliZero['EPic'] = $finaliZeroData;
                $message            = "Epic data retrieved.";
            }else{
                $message = "No data found";
            }
            return $this->sendResponse($finaliZero, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }  
    /*
        Author : Abdul
        Date   : 14/08/2020
        Name   : getDTChampion
        Params : @ProjectId,@EpicId
        Type   : GET
        Purpose: To Get DT Champion
    */
    public function getDTChampion(Request $request, $projectId, $epicId){
        try{
            $params_array = array(
                $projectId,
                $epicId
            );
           
            $data = DB::select(' EXEC uspGetDtChampion ?,?', $params_array);
            if(count($data) >0){
                foreach ($data as $key => $value) {
                    if($this->user_data['EmailAddress'] == $value->EmailAddress){
                        $data[$key]->DTChamp = true;
                    }else{
                        $data[$key]->DTChamp = false;
                    }
                }
                $message = "Data retrieved successfully.";
            }else{
                $message = "No record found.";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
}
