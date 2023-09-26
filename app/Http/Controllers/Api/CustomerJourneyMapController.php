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

class CustomerJourneyMapController extends BaseController
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
        Date   : 20/07/2020
        Name   : createCustomerJourneyMap
        Params : @PersonaId
        Type   : GET
        Purpose: To Insert LC TO CJM
    */
    public function createCustomerJourneyMap( Request $request, $personaId){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $personaId,
                $userId
            ];
            //echo "<pre>";print_r($params_array);echo "<br>";die;
            $data = DB::select(' EXEC uspInsertLifeCycleToCustJourneyMap ?,?', $params_array );
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
     /*
        Author : Abdul
        Date   : 23/07/2020
        Name   : getCustomerJourneyMap
        Params : @CjmId,@EpicId,@PersonaId
        Type   : GET
        Purpose: To Get Customer Journey Map
    */
    public function getCustomerJourneyMap( Request $request, $cjmId, $epicId, $personaId){
        try{

            $userId = $this->user_data['UserID'];
            $personaIds = array($personaId);
            $params_array = array(
                $cjmId,
                $epicId,
                $personaId
            );
            $feelings_params_array = array(
                $cjmId,
                $epicId,
                //"'".$personaId."'"
                implode(',',$personaIds)
            );
            $impactor_array = array(
                $cjmId,
                $epicId,
                $personaId,
                1
            ); 
            $impactee_array = array(
                $cjmId,
                $epicId,
                $personaId,
                2
            ); 
            $CjmPersona = DB::select(' EXEC uspGetCJMPersona ?', array($personaId) );
            $CjmData = DB::select(' EXEC uspGetCjmDetails ?,?,?', $params_array );
            $StageData = DB::select(' EXEC uspGetStageDetail ?,?,?', $params_array );
            $ProcessesData = DB::select(' EXEC uspGetProcesses ?,?,?', $params_array );
            $TouchPointsData = DB::select(' EXEC uspGetTouchPoints ?,?,?', $params_array );
            $ExperienceData = DB::select(' EXEC uspGetExperiences ?,?,?', $params_array );
            $PainPointsData = DB::select(' EXEC uspGetPainPoints ?,?,?', $params_array );
            $OpportunitiesData = DB::select(' EXEC uspGetOportunities ?,?,?', $params_array );
            $FeelingsData = DB::select(' EXEC uspGetFeelings ?,?,?', $feelings_params_array );
            $ImpactorData = DB::select(' EXEC uspGetStakeHolders ?,?,?,?', $impactor_array );
            $ImpacteeData = DB::select(' EXEC uspGetStakeHolders ?,?,?,?', $impactee_array );
            /*$ExperienceData[0]->StageName = "Stage 1";
            $ExperienceData[0]->DtCjmExperiencesId = 1;
            $ExperienceData[0]->ExperienceName = "Teststst";
            $ExperienceData[0]->DtCjmStageHeaderId = 2;
            $ExperienceData[0]->ParentStageId = 1;

            $FeelingsData[0]->DtCjmFeelingsId = 1;
            $FeelingsData[0]->Comment = "Test";
            $FeelingsData[0]->Emotion = "Positive";
            $FeelingsData[0]->StageName = "Stage 1";
            $FeelingsData[0]->DtCjmStageHeaderId =2;
            $FeelingsData[0]->ParentStageId =1;*/
            
            //echo "<pre>";print_r($CjmPersona);echo "<br>";die;
            //echo "<pre>";print_r($CjmData);echo "<br>";die;
            //echo "<pre>";print_r($StageData);echo "<br>";die;
            //echo "<pre>";print_r($ProcessesData);echo "<br>";die;
            //echo "<pre>";print_r($TouchPointsData);echo "<br>";die;
            //echo "<pre>";print_r($ExperienceData);echo "<br>";
            //echo "<pre>";print_r($PainPointsData);echo "<br>";die;
            //echo "<pre>";print_r($OpportunitiesData);echo "<br>";die;
            //echo "<pre>";print_r($FeelingsData);echo "<br>";die;
            //echo "<pre>";print_r($ImpactorData);echo "<br>";die;
            //echo "<pre>";print_r($ImpacteeData);echo "<br>";die;
           
            $data_array = array();
            if(count($CjmData) > 0){
                if(count($CjmPersona)==0){
                    $data_array["PersonaId"]      = $CjmData[0]->PersonaId;
                    $data_array["PersonaName"]    = "";
                    $data_array["PersonaDescription"] = "";
                    $data_array["GoalName"]       = "";
                    $data_array["GoalDescription"]= "";
                    $data_array["FilePath"]       = "";
                }else{
                    $data_array["PersonaId"]      = $CjmData[0]->PersonaId;
                    $data_array["PersonaName"]    = $CjmPersona[0]->PersonaName;
                    $data_array["PersonaDescription"] = $CjmPersona[0]->PersonaDescription;
                    $data_array["GoalName"]       = "";
                    $data_array["GoalDescription"]= "";
                    $data_array["FilePath"]       = $CjmPersona[0]->FilePath;
                }
                $data_array["MapId"]          = $CjmData[0]->DtCustomerJourneyMapId;
                $data_array["MapName"]        = $CjmData[0]->MapName;
                $data_array["MapDescription"] = $CjmData[0]->MapDescription;
                $data_array["MapGoal"]        = $CjmData[0]->MapGoal;
                $data_array["EpicLifeCycleId"] = $CjmData[0]->EpicLifeCycleId;
                if(count($StageData) ==0){
                    $data_array["Stages"] = array();
                }else{
                    foreach ($StageData as $key => $value) {
                        if($value->ParentStageId==""){
                            $data_array["Stages"][$value->DtCjmStageHeaderId]["StageId"]   = $value->DtCjmStageHeaderId;
                            $data_array["Stages"][$value->DtCjmStageHeaderId]["StageName"] = $value->StageName;
                            $data_array["Stages"][$value->DtCjmStageHeaderId]["commentCol"] = $value->commentCol;
                            $data_array["Stages"][$value->DtCjmStageHeaderId]["disableAddNewColBtn"] = $value->disableAddNewColBtn;
                            $data_array["Stages"][$value->DtCjmStageHeaderId]["SequenceNumber"] = $value->SequenceNumber;
                        }
                        if($value->ParentStageId!=""){
                            $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["StageId"]   = $value->DtCjmStageHeaderId;
                            $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["SubStageName"] = $value->StageName;
                            $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["RaiseFlag"] = $value->IsFlagRaised;
                            $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["RaiseFlagText"] = $value->FlagRaisedText;
                            
                        }

                        if(count($ProcessesData)>0){
                            foreach ($ProcessesData as $k => $v) {

                                if($v->DtCjmStageHeaderId==$value->DtCjmStageHeaderId && $v->ParentStageId == $value->ParentStageId){
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryLookUpId"] = $v->CategoryLookUpId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryName"] = $v->CategoryName;

                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmProcessesId]["Id"] = $v->DtCjmProcessesId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmProcessesId]["Text"] = $v->ProcessName;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmProcessesId]["SequenceNumber"] = isset($v->SequenceNumber) ? $v->SequenceNumber : "";
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmProcessesId]["ColorCode"] = $v->ColorCode;  
                                }
                            }
                        }
                        if(count($TouchPointsData)>0){
                            foreach ($TouchPointsData as $k => $v) {
                                if($v->DtCjmStageHeaderId==$value->DtCjmStageHeaderId && $v->ParentStageId == $value->ParentStageId){
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryLookUpId"] = $v->CategoryLookUpId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryName"] = $v->CategoryName;
                                   
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmTouchPointsId]["Id"] = $v->DtCjmTouchPointsId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmTouchPointsId]["Text"] = $v->TouchPointName;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmTouchPointsId]["SequenceNumber"] = $v->SequenceNumber;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmTouchPointsId]["SequenceNumber"] = $v->SequenceNumber;
                                }
                            }
                        }
                        if(count($ExperienceData)>0){
                            foreach ($ExperienceData as $k => $v) {
                                if($v->DtCjmStageHeaderId==$value->DtCjmStageHeaderId && $v->ParentStageId == $value->ParentStageId){
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryLookUpId"] = $v->CategoryLookUpId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryName"] = $v->CategoryName;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmExperiencesId]["Id"] = $v->DtCjmExperiencesId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmExperiencesId]["Text"] = $v->ExperienceName;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmExperiencesId]["SequenceNumber"] = $v->SequenceNumber;
                                }
                            }
                        }
                        if(count($PainPointsData)>0){
                            foreach ($PainPointsData as $k => $v) {
                                if($v->DtCjmStageHeaderId==$value->DtCjmStageHeaderId && $v->ParentStageId == $value->ParentStageId){
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryLookUpId"] = $v->CategoryLookUpId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryName"] = $v->CategoryName;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmPainPointsId]["Id"] = $v->DtCjmPainPointsId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmPainPointsId]["Text"] = $v->PainPointName;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmPainPointsId]["SequenceNumber"] = $v->SequenceNumber;

                                }
                            }
                        }
                        if(count($OpportunitiesData)>0){
                            foreach ($OpportunitiesData as $k => $v) {
                                if($v->DtCjmStageHeaderId==$value->DtCjmStageHeaderId && $v->ParentStageId == $value->ParentStageId){
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryLookUpId"] = $v->CategoryLookUpId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryName"] = $v->CategoryName;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmOportunitiesId]["Id"] = $v->DtCjmOportunitiesId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmOportunitiesId]["Text"] = $v->OportunityName;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmOportunitiesId]["SequenceNumber"] = $v->SequenceNumber;

                                }
                            }
                        }
                        if(count($FeelingsData)>0){
                            foreach ($FeelingsData as $k => $v) {
                                if($v->DtCjmStageHeaderId==$value->DtCjmStageHeaderId && $v->ParentStageId == $value->ParentStageId){
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryLookUpId"] = $v->CategoryLookUpId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryName"] = $v->CategoryName;
                                     $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["ShowEmojis"] = $v->HasFeelings;
                                    
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmFeelingsId]["Id"] = $v->DtCjmFeelingsId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmFeelingsId]["ProcessId"] = $v->DtCjmProcessId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmFeelingsId]["ProcessName"] = $v->ProcessName;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmFeelingsId]["HasFeelings"] = $v->HasFeelings;

                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmFeelingsId]["Comment"] = $v->Comment;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmFeelingsId]["CommentPlainText"] = $v->CommentPlainText;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmFeelingsId]["Emotion"] = $v->Emotion;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmFeelingsId]["SequenceNumber"] = $v->SequenceNumber;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmFeelingsId]["AppliedFor"] = $v->AppliedFor;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtCjmFeelingsId]["AppliedForID"] = $v->AppliedForID;
                                }
                            }
                        }
                        if(count($ImpactorData)>0){
                            foreach ($ImpactorData as $k => $v) {
                                if($v->DtCjmStageHeaderId==$value->DtCjmStageHeaderId && $v->ParentStageId == $value->ParentStageId){
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryLookUpId"] = $v->CategoryLookUpId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryName"] = $v->CategoryName;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtStakeholderId]["Id"] = $v->DtStakeholderId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtStakeholderId]["ImagePath"] = ($v->Image!="") ? env('APP_URL').'public/StakeHoldersImages/'.$v->Image : "";
                                }
                            }
                        }
                        if(count($ImpacteeData)>0){
                            foreach ($ImpacteeData as $k => $v) {
                                if($v->DtCjmStageHeaderId==$value->DtCjmStageHeaderId && $v->ParentStageId == $value->ParentStageId){
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryLookUpId"] = $v->CategoryLookUpId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryName"] = $v->CategoryName;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtStakeholderId]["Id"] = $v->DtStakeholderId;
                                    $data_array["Stages"][$value->ParentStageId]["SubStages"][$value->DtCjmStageHeaderId]["Categories"][$v->CategoryLookUpId]["CategoryText"][$v->DtStakeholderId]["ImagePath"] = ($v->Image!="") ? env('APP_URL').'public/StakeHoldersImages/'.$v->Image : "";
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
                                    foreach($data_array["Stages"][$key]["SubStages"][$k]["Categories"] as $j=>$vj){
                                        if(isset($vj["CategoryText"]) && count($vj["CategoryText"]) >0){
                                            $data_array["Stages"][$key]["SubStages"][$k]["Categories"][$j]["CategoryText"] = array_values($vj["CategoryText"]);
                                        }
                                    }
                                }
                            }
                        }
                    }
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
        Date   : 21/07/2020
        Name   : saveCustomerJourneyMap
        Params : 
        Type   : POST
        Purpose: To Save Customer Journey Map
    */
   
    public function saveCustomerJourneyMap( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'ProjectId'        => 'required|numeric',
                'ProjectVersionId' => 'required|numeric',
                'EpicId'           => 'required|numeric',
                'EpicVersionId'    => 'required|numeric',
                'PersonaId'        => 'required|numeric',
                'MapName'          => 'required',
                'MapGoal'          => 'required',
                'MapDescription'   => 'required',
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
            //echo "<pre>";print_r($params_array);echo "<br>";die;
            $data = DB::select(' EXEC uspSaveCustomerJourneyMap ?,?', $params_array );
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
        

}
