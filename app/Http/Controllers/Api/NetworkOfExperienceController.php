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

class NetworkOfExperienceController extends BaseController
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
        Date   : 30/07/2020
        Name   : getNOE
        Params : @epicId
        Type   : GET
        Purpose: To Get Network Of Experience
    */
    public function getNOE( Request $request, $epicId){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                0,
                $epicId,
                0
            ];
            
            $GetEpicAndSubEpic = DB::select(' EXEC uspGetEpicAndSubEpic ?,?,?', $params_array );
            //echo "<pre>";print_r($GetEpicAndSubEpic);echo "<br>";die;
            $finaliZero = array();
            if(count($GetEpicAndSubEpic) > 0){
                foreach ($GetEpicAndSubEpic as $key => $value) {
                    if($value->ParentEpicHeaderId==''){
                        $data['Epic'][$value->DTEPICHeaderID]['id']   = $value->DTEPICHeaderID;
                        $data['Epic'][$value->DTEPICHeaderID]['name'] = $value->Title;
                        $data['Epic'][$value->DTEPICHeaderID]['Version'] = $value->Version;
                        $data['Epic'][$value->DTEPICHeaderID]['EpicOrSubEpic'] = $value->EpicOrSubEpic;
                        $data['Epic'][$value->DTEPICHeaderID]['Goal'] = $value->Goal;
                        $data['Epic'][$value->DTEPICHeaderID]['Description'] = $value->Description;

                        $EpicBenchMarkingDetails = DB::select(' EXEC uspGetEpicBenchMarkingDetails ?,?', array($value->DTEPICHeaderID,0) );
                        
                        $EpicCapabilityModellingDetails = DB::select(' EXEC uspGetEpicCapabilityModellingDetails ?,?', array($value->DTEPICHeaderID,0) );

                        $EpicDtKpiDetail = DB::select(' EXEC uspGetDtKpiDetail ?,?', array($value->DTEPICHeaderID,0) );

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
                                
                                $SubEpicBenchMarkingDetails = DB::select(' EXEC uspGetEpicBenchMarkingDetails ?,?', array($seval->DTEPICHeaderID,0) );

                                $SubEpicCapabilityModellingDetails = DB::select(' EXEC uspGetEpicCapabilityModellingDetails ?,?', array($seval->DTEPICHeaderID,0) );

                                $SubEpicDtKpiDetail = DB::select(' EXEC uspGetDtKpiDetail ?,?', array($seval->DTEPICHeaderID,0) );

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
                    
                        $lifyCycleData = DB::select(' EXEC uspLifeCycleBySubEpicId ?', array($value->DTEPICHeaderID) );
                        
                        if(count($lifyCycleData)==0){
                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'] = array();
                        }else{
                            foreach ($lifyCycleData as $key => $val) {
                               $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]["EpicLifeCycleId"] = $val->EpicLifeCycleId;
                               $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]["LifeCycleName"] = $val->LifeCycleName;
                                $KpisByLifeCycle = DB::select(' EXEC uspKPIsByLifeCycle ?,?', array($value->DTEPICHeaderID,$val->EpicLifeCycleId) );
                                //echo "<pre>";print_r(array($value->DTEPICHeaderID,$val->EpicLifeCycleId));echo "<br>";
                                if(count($KpisByLifeCycle)==0){
                                    $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Kpis'] = array();
                                }
                                
                                $personaByLifeCycle = DB::select(' EXEC uspPersonaByLifeCycle ?,?', array($value->DTEPICHeaderID,$val->EpicLifeCycleId) );
                                if(count($personaByLifeCycle)==0){
                                    $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'] = array();
                                }else{
                                    foreach ($personaByLifeCycle as $plc => $plcVal) {
                                       $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]["PersonaId"] = $plcVal->PersonaId;
                                       $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]["PersonaName"] = $plcVal->PersonaName;
                                       $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]["FilePath"] = $plcVal->FilePath;
                                    }
                                }
                                $touchPointsByLifeCycle = DB::select(' EXEC uspTouchPointsByLifeCycle ?,?', array($value->DTEPICHeaderID,$val->EpicLifeCycleId) );
                                //echo "<pre>";print_r($touchPointsByLifeCycle);echo "<br>";
                                if(count($touchPointsByLifeCycle)==0){
                                    $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['TouchPoints'] = array();
                                }else{
                                    foreach ($touchPointsByLifeCycle as $tp => $tpVal) {
                                        $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['TouchPoints'][$tpVal->DtCjmTouchPointsId]["DtCjmTouchPointsId"] = $tpVal->DtCjmTouchPointsId;
                                        $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['TouchPoints'][$tpVal->DtCjmTouchPointsId]["TouchPointName"] = $tpVal->TouchPointName;
                                        $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['TouchPoints'][$tpVal->DtCjmTouchPointsId]["SequenceNumber"] = $tpVal->SequenceNumber;
                                    }
                                }
                                $empthyByLifeCycle = DB::select(' EXEC uspEmpathyByLifeCycle ?,?', array($value->DTEPICHeaderID,$val->EpicLifeCycleId) );

                                //echo json_encode($empthyByLifeCycle);echo "<br>";
                                //echo "=========================";echo "<br>";
                                if(count($empthyByLifeCycle) > 0){
                                    foreach ($empthyByLifeCycle as $elc => $elcVal) {
                                        if($elcVal->CategoryName=='Barrier'){
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Barrier'][$elcVal->EmpathyMapDetailId]['CategoryLookUpId'] = $elcVal->CategoryLookUpId;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Barrier'][$elcVal->EmpathyMapDetailId]['CategoryName'] = $elcVal->CategoryName;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Barrier'][$elcVal->EmpathyMapDetailId]['SubCategoryText'] = $elcVal->SubCategoryText;
                                        }
                                        if($elcVal->CategoryName=='Delights'){
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Delights'][$elcVal->EmpathyMapDetailId]['CategoryLookUpId'] = $elcVal->CategoryLookUpId;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Delights'][$elcVal->EmpathyMapDetailId]['CategoryName'] = $elcVal->CategoryName;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Delights'][$elcVal->EmpathyMapDetailId]['SubCategoryText'] = $elcVal->SubCategoryText;
                                        }
                                        if($elcVal->CategoryName=='Do'){
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Do'][$elcVal->EmpathyMapDetailId]['CategoryLookUpId'] = $elcVal->CategoryLookUpId;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Do'][$elcVal->EmpathyMapDetailId]['CategoryName'] = $elcVal->CategoryName;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Do'][$elcVal->EmpathyMapDetailId]['SubCategoryText'] = $elcVal->SubCategoryText;
                                        }
                                        if($elcVal->CategoryName=='Gains'){
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Gains'][$elcVal->EmpathyMapDetailId]['CategoryLookUpId'] = $elcVal->CategoryLookUpId;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Gains'][$elcVal->EmpathyMapDetailId]['CategoryName'] = $elcVal->CategoryName;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Gains'][$elcVal->EmpathyMapDetailId]['SubCategoryText'] = $elcVal->SubCategoryText;
                                        }
                                        if($elcVal->CategoryName=='Hacks'){
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Hacks'][$elcVal->EmpathyMapDetailId]['CategoryLookUpId'] = $elcVal->CategoryLookUpId;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Hacks'][$elcVal->EmpathyMapDetailId]['CategoryName'] = $elcVal->CategoryName;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Hacks'][$elcVal->EmpathyMapDetailId]['SubCategoryText'] = $elcVal->SubCategoryText;
                                        }
                                        if($elcVal->CategoryName=='Pains'){
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Pains'][$elcVal->EmpathyMapDetailId]['CategoryLookUpId'] = $elcVal->CategoryLookUpId;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Pains'][$elcVal->EmpathyMapDetailId]['CategoryName'] = $elcVal->CategoryName;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Pains'][$elcVal->EmpathyMapDetailId]['SubCategoryText'] = $elcVal->SubCategoryText;
                                        }
                                        if($elcVal->CategoryName=='Say'){
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Say'][$elcVal->EmpathyMapDetailId]['CategoryLookUpId'] = $elcVal->CategoryLookUpId;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Say'][$elcVal->EmpathyMapDetailId]['CategoryName'] = $elcVal->CategoryName;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Say'][$elcVal->EmpathyMapDetailId]['SubCategoryText'] = $elcVal->SubCategoryText;
                                        }
                                        if($elcVal->CategoryName=='Sight'){
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Sight'][$elcVal->EmpathyMapDetailId]['CategoryLookUpId'] = $elcVal->CategoryLookUpId;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Sight'][$elcVal->EmpathyMapDetailId]['CategoryName'] = $elcVal->CategoryName;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Sight'][$elcVal->EmpathyMapDetailId]['SubCategoryText'] = $elcVal->SubCategoryText;
                                        }
                                        if($elcVal->CategoryName=='Thoughts & Feelings'){
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Thoughts & Feelings'][$elcVal->EmpathyMapDetailId]['CategoryLookUpId'] = $elcVal->CategoryLookUpId;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Thoughts & Feelings'][$elcVal->EmpathyMapDetailId]['CategoryName'] = $elcVal->CategoryName;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Thoughts & Feelings'][$elcVal->EmpathyMapDetailId]['SubCategoryText'] = $elcVal->SubCategoryText;
                                        }
                                        if($elcVal->CategoryName=='Triggers'){
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Triggers'][$elcVal->EmpathyMapDetailId]['CategoryLookUpId'] = $elcVal->CategoryLookUpId;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Triggers'][$elcVal->CategoryLookUpId]['CategoryName'] = $elcVal->CategoryName;
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Triggers'][$elcVal->EmpathyMapDetailId]['SubCategoryText'] = $elcVal->SubCategoryText;
                                        }
                                    }   
                                }
                                $painPointsByLifeCycle = DB::select(' EXEC uspPainPointsByLifeCycle ?,?', array($value->DTEPICHeaderID,$val->EpicLifeCycleId) );
                                if(count($painPointsByLifeCycle)==0){
                                    $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['PainPoints'] = array();
                                }else{
                                    foreach ($painPointsByLifeCycle as $pp => $ppVal) {
                                        $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['PainPoints'][$ppVal->DtCjmPainPointsId]["DtCjmPainPointsId"] = $ppVal->DtCjmPainPointsId;
                                        $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['PainPoints'][$ppVal->DtCjmPainPointsId]["PainPointName"] = $ppVal->PainPointName;
                                        $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['PainPoints'][$ppVal->DtCjmPainPointsId]["SequenceNumber"] = $ppVal->SequenceNumber;
                                    }
                                }
                                $opportunitiesByLifeCycle = DB::select(' EXEC uspOportunitiesByLifeCycle ?,?', array($value->DTEPICHeaderID,$val->EpicLifeCycleId) );
                                
                                if(count($opportunitiesByLifeCycle)==0){
                                    $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Opportunities'] = array();
                                }else{
                                    foreach ($opportunitiesByLifeCycle as $opp => $oppVal) {
                                        $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Opportunities'][$oppVal->DtCjmOportunitiesId]["DtCjmOportunitiesId"] = $oppVal->DtCjmOportunitiesId;
                                        $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Opportunities'][$oppVal->DtCjmOportunitiesId]["OportunityName"] = $oppVal->OportunityName;
                                        $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Opportunities'][$oppVal->DtCjmOportunitiesId]["SequenceNumber"] = $oppVal->SequenceNumber;
                                    }
                                }
                            }
                        }
                    }
                    
                    /////////
                }
                $finaliZeroData = array_values($data['Epic']);
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
                    if(isset($value['LifeCycle'])){
                        $finaliZeroData[$key]['LifeCycle'] = array_values($value['LifeCycle']);

                        foreach ($finaliZeroData[$key]['LifeCycle'] as $lc => $lcV) {
                            if(isset($lcV['Kpis'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Kpis'] = array_values($lcV['Kpis']);
                            }
                            if(isset($lcV['Personas'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Personas'] = array_values($lcV['Personas']);
                            }
                            if(isset($lcV['TouchPoints'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['TouchPoints'] = array_values($lcV['TouchPoints']);
                            }
                            if(isset($lcV['Barrier'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Barrier'] = array_values($lcV['Barrier']);
                            }
                            if(isset($lcV['Delights'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Delights'] = array_values($lcV['Delights']);
                            }
                            if(isset($lcV['Do'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Do'] = array_values($lcV['Do']);
                            }
                            if(isset($lcV['Gains'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Gains'] = array_values($lcV['Gains']);
                            }
                            if(isset($lcV['Hacks'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Hacks'] = array_values($lcV['Hacks']);
                            }
                            if(isset($lcV['Pains'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Pains'] = array_values($lcV['Pains']);
                            }
                            if(isset($lcV['Say'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Say'] = array_values($lcV['Say']);
                            }
                            if(isset($lcV['Sight'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Sight'] = array_values($lcV['Sight']);
                            }
                            if(isset($lcV['Thoughts & Feelings'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Thoughts & Feelings'] = array_values($lcV['Thoughts & Feelings']);
                            }
                            if(isset($lcV['Triggers'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Triggers'] = array_values($lcV['Triggers']);
                            }
                            if(isset($lcV['PainPoints'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['PainPoints'] = array_values($lcV['PainPoints']);
                            }
                            if(isset($lcV['Opportunities'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Opportunities'] = array_values($lcV['Opportunities']);
                            }
                        }
                    }
                }
                $finaliZero['EPic'] = $finaliZeroData;
                $message        = "Data retrieved successfully.";
            }else{
                $message = "No data found";
            }
            //echo "<pre>";print_r($data);echo "<br>";die;
            return $this->sendResponse($finaliZero, $message); 
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 04/08/2020
        Name   : getNOEBySubEpic
        Params : @epicId
        Type   : GET
        Purpose: To Get Network Of Experience
    */
    public function getNOEBySubEpic( Request $request, $epicId){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                0,
                $epicId,
                0
            ];
            
            $GetEpicAndSubEpic = DB::select(' EXEC uspGetEpicAndSubEpic ?,?,?', $params_array );
            $data = array();
            $finaliZero = array();
             if(count($GetEpicAndSubEpic) > 0){
                foreach ($GetEpicAndSubEpic as $key => $value) {
                    if($value->ParentEpicHeaderId==''){
                        $data['Epic'][$value->DTEPICHeaderID]['id']   = $value->DTEPICHeaderID;
                        $data['Epic'][$value->DTEPICHeaderID]['name'] = $value->Title;
                        $data['Epic'][$value->DTEPICHeaderID]['Version'] = $value->Version;
                        $data['Epic'][$value->DTEPICHeaderID]['EpicOrSubEpic'] = $value->EpicOrSubEpic;
                        $data['Epic'][$value->DTEPICHeaderID]['Goal'] = $value->Goal;
                        $data['Epic'][$value->DTEPICHeaderID]['Description'] = $value->Description;

                        $EpicBenchMarkingDetails = DB::select(' EXEC uspGetEpicBenchMarkingDetails ?,?', array($value->DTEPICHeaderID,0) );
                        
                        $EpicCapabilityModellingDetails = DB::select(' EXEC uspGetEpicCapabilityModellingDetails ?,?', array($value->DTEPICHeaderID,0) );

                        $EpicDtKpiDetail = DB::select(' EXEC uspGetDtKpiDetail ?,?', array($value->DTEPICHeaderID,0) );

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
                                
                                $SubEpicBenchMarkingDetails = DB::select(' EXEC uspGetEpicBenchMarkingDetails ?,?', array($seval->DTEPICHeaderID,0) );

                                $SubEpicCapabilityModellingDetails = DB::select(' EXEC uspGetEpicCapabilityModellingDetails ?,?', array($seval->DTEPICHeaderID,0) );

                                $SubEpicDtKpiDetail = DB::select(' EXEC uspGetDtKpiDetail ?,?', array($seval->DTEPICHeaderID,0) );

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
                    
                        $lifyCycleData = DB::select(' EXEC uspGetCJMLifeCycleDetailsAgainstSubEpic ?', array($value->DTEPICHeaderID) );
                        if(count($lifyCycleData) == 0){
                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'] = array();
                        }else{
                            foreach ($lifyCycleData as $key => $val) {
                                $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]["EpicLifeCycleId"] = $val->EpicLifeCycleId;
                                $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]["LifeCycleName"] = $val->LifeCycleName;

                                $personaByLifeCycle = DB::select(' EXEC uspGetCJMPersonaForNOE ?', array($val->EpicLifeCycleId) );
                                if(count($personaByLifeCycle)==0){
                                    $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'] = array();
                                }else{
                                    foreach ($personaByLifeCycle as $plc => $plcVal) {
                                       $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]["PersonaId"] = $plcVal->PersonaId;
                                       $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]["PersonaName"] = $plcVal->PersonaName;
                                       $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]["FilePath"] = $plcVal->FilePath;
                                       
                                       $params_persona =  array(
                                            0,
                                            0,
                                            $plcVal->PersonaId     
                                       ); 
                                       $impactor_array = array(
                                            0,
                                            0,
                                            $plcVal->PersonaId,
                                            1
                                        ); 
                                        $impactee_array = array(
                                            0,
                                            0,
                                            $plcVal->PersonaId,
                                            2
                                        );
                                       $stageData = DB::select(' EXEC uspGetStageDetail ?,?,?', $params_persona );
                                       if(count($stageData) == 0){
                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'] = array();
                                       }else{
                                            foreach ($stageData as $sd => $sdVal) {
                                                if($sdVal->ParentStageId==""){
                                                    $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->DtCjmStageHeaderId]['DtCjmStageHeaderId'] = $sdVal->DtCjmStageHeaderId;
                                                    $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->DtCjmStageHeaderId]['StageName'] = $sdVal->StageName;
                                                    $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->DtCjmStageHeaderId]['commentCol'] = $sdVal->commentCol;
                                                    $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->DtCjmStageHeaderId]['disableAddNewColBtn'] = $sdVal->disableAddNewColBtn;
                                                    $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->DtCjmStageHeaderId]['SequenceNumber'] = $sdVal->SequenceNumber;
                                                }
                                                if($sdVal->ParentStageId!=""){
                                                    $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['DtCjmStageHeaderId'] = $sdVal->DtCjmStageHeaderId;
                                                    $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['StageName'] = $sdVal->StageName;
                                                }
                                                $ProcessesData = DB::select(' EXEC uspGetProcesses ?,?,?', $params_persona );
                                                if(count($ProcessesData)==0){
                                                    $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'] = array();
                                                }else{
                                                    foreach ($ProcessesData as $pk => $pVal) {
                                                        if($pVal->DtCjmStageHeaderId==$sdVal->DtCjmStageHeaderId && $pVal->ParentStageId == $sdVal->ParentStageId){
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$pVal->CategoryLookUpId]["CategoryLookUpId"] = $pVal->CategoryLookUpId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$pVal->CategoryLookUpId]["CategoryName"] = $pVal->CategoryName;

                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$pVal->CategoryLookUpId]["CategoryText"][$pVal->DtCjmProcessesId]["DtCjmProcessesId"] = $pVal->DtCjmProcessesId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$pVal->CategoryLookUpId]["CategoryText"][$pVal->DtCjmProcessesId]["ProcessName"] = $pVal->ProcessName;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$pVal->CategoryLookUpId]["CategoryText"][$pVal->DtCjmProcessesId]["ColorCode"] = $pVal->ColorCode;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$pVal->CategoryLookUpId]["CategoryText"][$pVal->DtCjmProcessesId]["SequenceNumber"] = $pVal->SequenceNumber;
                                                        }
                                                    }
                                                }
                                                
                                                $TouchPointsData = DB::select(' EXEC uspGetTouchPoints ?,?,?', $params_persona );
                                                if(count($TouchPointsData) > 0){
                                                    foreach ($TouchPointsData as $tpk => $tpVal) {
                                                        if($tpVal->DtCjmStageHeaderId==$sdVal->DtCjmStageHeaderId && $tpVal->ParentStageId == $sdVal->ParentStageId){
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$tpVal->CategoryLookUpId]["CategoryLookUpId"] = $tpVal->CategoryLookUpId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$tpVal->CategoryLookUpId]["CategoryName"] = $tpVal->CategoryName;

                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$tpVal->CategoryLookUpId]["CategoryText"][$tpVal->DtCjmTouchPointsId]["DtCjmTouchPointsId"] = $tpVal->DtCjmTouchPointsId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$tpVal->CategoryLookUpId]["CategoryText"][$tpVal->DtCjmTouchPointsId]["TouchPointName"] = $tpVal->TouchPointName;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$tpVal->CategoryLookUpId]["CategoryText"][$tpVal->DtCjmTouchPointsId]["SequenceNumber"] = $tpVal->SequenceNumber;
                                                        }
                                                    }
                                                }
                                                $FeelingsData = DB::select(' EXEC uspGetFeelings ?,?,?', $params_persona );
                                                if(count($FeelingsData) > 0){
                                                    foreach ($FeelingsData as $fk => $fVal) {
                                                        if($fVal->DtCjmStageHeaderId==$sdVal->DtCjmStageHeaderId && $fVal->ParentStageId == $sdVal->ParentStageId){
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$fVal->CategoryLookUpId]["CategoryLookUpId"] = $fVal->CategoryLookUpId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$fVal->CategoryLookUpId]["CategoryName"] = $fVal->CategoryName;

                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$fVal->CategoryLookUpId]["CategoryText"][$fVal->DtCjmFeelingsId]["DtCjmFeelingsId"] = $fVal->DtCjmFeelingsId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$fVal->CategoryLookUpId]["CategoryText"][$fVal->DtCjmFeelingsId]["ProcessName"] = $fVal->ProcessName;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$fVal->CategoryLookUpId]["CategoryText"][$fVal->DtCjmFeelingsId]["HasFeelings"] = $fVal->HasFeelings;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$fVal->CategoryLookUpId]["CategoryText"][$fVal->DtCjmFeelingsId]["Comment"] = $fVal->Comment;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$fVal->CategoryLookUpId]["CategoryText"][$fVal->DtCjmFeelingsId]["CommentPlainText"] = $fVal->CommentPlainText;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$fVal->CategoryLookUpId]["CategoryText"][$fVal->DtCjmFeelingsId]["Emotion"] = $fVal->Emotion;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$fVal->CategoryLookUpId]["CategoryText"][$fVal->DtCjmFeelingsId]["SequenceNumber"] = $fVal->SequenceNumber;
                                                        }
                                                    }
                                                }
                                                $ExperienceData = DB::select(' EXEC uspGetExperiences ?,?,?', $params_persona );
                                                if(count($ExperienceData) > 0){
                                                    foreach ($ExperienceData as $ek => $eVal) {
                                                        if($eVal->DtCjmStageHeaderId==$sdVal->DtCjmStageHeaderId && $eVal->ParentStageId == $sdVal->ParentStageId){
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$eVal->CategoryLookUpId]["CategoryLookUpId"] = $eVal->CategoryLookUpId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$eVal->CategoryLookUpId]["CategoryName"] = $eVal->CategoryName;

                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$eVal->CategoryLookUpId]["CategoryText"][$eVal->DtCjmExperiencesId]["DtCjmExperiencesId"] = $eVal->DtCjmExperiencesId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$eVal->CategoryLookUpId]["CategoryText"][$eVal->DtCjmExperiencesId]["ExperienceName"] = $eVal->ExperienceName;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$fVal->CategoryLookUpId]["CategoryText"][$eVal->DtCjmExperiencesId]["SequenceNumber"] = $eVal->SequenceNumber;
                                                        }
                                                    }
                                                }
                                                /////
                                                $ImpactorData = DB::select(' EXEC uspGetStakeHolders ?,?,?,?', $impactor_array );
                                                $ImpacteeData = DB::select(' EXEC uspGetStakeHolders ?,?,?,?', $impactee_array );
                                                if(count($ImpactorData)>0){
                                                    foreach ($ImpactorData as $imptr => $imptrVal) {
                                                        if($imptrVal->DtCjmStageHeaderId==$sdVal->DtCjmStageHeaderId && $imptrVal->ParentStageId == $sdVal->ParentStageId){
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$imptrVal->CategoryLookUpId]["CategoryLookUpId"] = $imptrVal->CategoryLookUpId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$imptrVal->CategoryLookUpId]["CategoryName"] = $imptrVal->CategoryName;

                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$imptrVal->CategoryLookUpId]["CategoryText"][$imptrVal->DtStakeholderId]["DtStakeholderId"] = $imptrVal->DtStakeholderId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$imptrVal->CategoryLookUpId]["CategoryText"][$imptrVal->DtStakeholderId]["ImagePath"] = ($imptrVal->Image!="") ? env('APP_URL').'public/StakeHoldersImages/'.$imptrVal->Image : "";
                                                            
                                                        }
                                                    }
                                                }
                                                if(count($ImpacteeData)>0){
                                                    foreach ($ImpacteeData as $imptee => $impteeVal) {
                                                        if($impteeVal->DtCjmStageHeaderId==$sdVal->DtCjmStageHeaderId && $impteeVal->ParentStageId == $sdVal->ParentStageId){
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$impteeVal->CategoryLookUpId]["CategoryLookUpId"] = $impteeVal->CategoryLookUpId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$impteeVal->CategoryLookUpId]["CategoryName"] = $impteeVal->CategoryName;

                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$impteeVal->CategoryLookUpId]["CategoryText"][$impteeVal->DtStakeholderId]["DtStakeholderId"] = $impteeVal->DtStakeholderId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$impteeVal->CategoryLookUpId]["CategoryText"][$impteeVal->DtStakeholderId]["ImagePath"] = ($impteeVal->Image!="") ? env('APP_URL').'public/StakeHoldersImages/'.$impteeVal->Image : "";
                                                            
                                                        }
                                                    }
                                                }
                                                $PainPointsData = DB::select(' EXEC uspGetPainPoints ?,?,?', $params_persona );
                                                if(count($PainPointsData) > 0){
                                                    foreach ($PainPointsData as $ppk => $ppVal) {
                                                        if($ppVal->DtCjmStageHeaderId==$sdVal->DtCjmStageHeaderId && $ppVal->ParentStageId == $sdVal->ParentStageId){
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$ppVal->CategoryLookUpId]["CategoryLookUpId"] = $ppVal->CategoryLookUpId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$ppVal->CategoryLookUpId]["CategoryName"] = $ppVal->CategoryName;

                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$ppVal->CategoryLookUpId]["CategoryText"][$ppVal->DtCjmPainPointsId]["DtCjmPainPointsId"] = $ppVal->DtCjmPainPointsId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$ppVal->CategoryLookUpId]["CategoryText"][$ppVal->DtCjmPainPointsId]["PainPointName"] = $ppVal->PainPointName;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$ppVal->CategoryLookUpId]["CategoryText"][$ppVal->DtCjmPainPointsId]["SequenceNumber"] = $ppVal->SequenceNumber;
                                                        }
                                                    }
                                                }

                                                $OpportunitiesData = DB::select(' EXEC uspGetOportunities ?,?,?', $params_persona );
                                                if(count($OpportunitiesData) > 0){
                                                    foreach ($OpportunitiesData as $ok => $oVal) {
                                                        if($oVal->DtCjmStageHeaderId==$sdVal->DtCjmStageHeaderId && $oVal->ParentStageId == $sdVal->ParentStageId){
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$oVal->CategoryLookUpId]["CategoryLookUpId"] = $oVal->CategoryLookUpId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$oVal->CategoryLookUpId]["CategoryName"] = $oVal->CategoryName;

                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$oVal->CategoryLookUpId]["CategoryText"][$oVal->DtCjmOportunitiesId]["DtCjmOportunitiesId"] = $oVal->DtCjmOportunitiesId;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$oVal->CategoryLookUpId]["CategoryText"][$oVal->DtCjmOportunitiesId]["OportunityName"] = $oVal->OportunityName;
                                                            $data['Epic'][$value->DTEPICHeaderID]['LifeCycle'][$val->EpicLifeCycleId]['Personas'][$plcVal->PersonaId]['Stages'][$sdVal->ParentStageId]['SubStages'][$sdVal->DtCjmStageHeaderId]['Categories'][$oVal->CategoryLookUpId]["CategoryText"][$oVal->DtCjmOportunitiesId]["SequenceNumber"] = $oVal->SequenceNumber;
                                                        }
                                                    }
                                                }
                                            }
                                       }
                                    }
                                }

                            }
                        }
                        
                    }
                    
                    /////////
                }
                $finaliZeroData = array_values($data['Epic']);
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
                    if(isset($value['LifeCycle'])){
                        $finaliZeroData[$key]['LifeCycle'] = array_values($value['LifeCycle']);

                        foreach ($finaliZeroData[$key]['LifeCycle'] as $lc => $lcV) {
                            
                            if(isset($lcV['Personas'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Personas'] = array_values($lcV['Personas']);

                                foreach ($finaliZeroData[$key]['LifeCycle'][$lc]['Personas'] as $ps => $psV) {
                                    if(isset($psV['Stages'])){
                                        $finaliZeroData[$key]['LifeCycle'][$lc]['Personas'][$ps]['Stages'] = array_values($psV['Stages']);
                                        foreach ($finaliZeroData[$key]['LifeCycle'][$lc]['Personas'][$ps]['Stages'] as $ssk => $ssVal) {
                                            if(isset($ssVal['SubStages'])){
                                                $finaliZeroData[$key]['LifeCycle'][$lc]['Personas'][$ps]['Stages'][$ssk]['SubStages'] = array_values($ssVal['SubStages']);
                                                foreach($finaliZeroData[$key]['LifeCycle'][$lc]['Personas'][$ps]['Stages'][$ssk]['SubStages'] as $ck=>$cVal){                                                    
                                                    if(isset($cVal['Categories'])){
                                                        $finaliZeroData[$key]['LifeCycle'][$lc]['Personas'][$ps]['Stages'][$ssk]['SubStages'][$ck]['Categories'] = array_values($cVal['Categories']);
                                                        foreach($finaliZeroData[$key]['LifeCycle'][$lc]['Personas'][$ps]['Stages'][$ssk]['SubStages'][$ck]['Categories'] as $catKey=>$catVal){
                                                            if(isset($catVal['CategoryText'])){
                                                                $finaliZeroData[$key]['LifeCycle'][$lc]['Personas'][$ps]['Stages'][$ssk]['SubStages'][$ck]['Categories'][$catKey]['CategoryText'] = array_values($catVal['CategoryText']);         
                                                            }        
                                                        }                                                        
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            /*if(isset($lcV['TouchPoints'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['TouchPoints'] = array_values($lcV['TouchPoints']);
                            }
                            if(isset($lcV['Barrier'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Barrier'] = array_values($lcV['Barrier']);
                            }
                            if(isset($lcV['Delights'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Delights'] = array_values($lcV['Delights']);
                            }
                            if(isset($lcV['Do'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Do'] = array_values($lcV['Do']);
                            }
                            if(isset($lcV['Gains'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Gains'] = array_values($lcV['Gains']);
                            }
                            if(isset($lcV['Hacks'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Hacks'] = array_values($lcV['Hacks']);
                            }
                            if(isset($lcV['Pains'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Pains'] = array_values($lcV['Pains']);
                            }
                            if(isset($lcV['Say'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Say'] = array_values($lcV['Say']);
                            }
                            if(isset($lcV['Sight'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Sight'] = array_values($lcV['Sight']);
                            }
                            if(isset($lcV['Thoughts & Feelings'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Thoughts & Feelings'] = array_values($lcV['Thoughts & Feelings']);
                            }
                            if(isset($lcV['Triggers'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Triggers'] = array_values($lcV['Triggers']);
                            }
                            if(isset($lcV['PainPoints'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['PainPoints'] = array_values($lcV['PainPoints']);
                            }
                            if(isset($lcV['Opportunities'])){
                                $finaliZeroData[$key]['LifeCycle'][$lc]['Opportunities'] = array_values($lcV['Opportunities']);
                            }*/
                        }
                    }
                }
                $finaliZero['EPic'] = $finaliZeroData;
                $message        = "Data retrieved successfully.";
            }else{
                $message = "No data found";
            }
            return $this->sendResponse($finaliZero, $message); 
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }   
       

}
