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

class EmpathyPersonaController extends BaseController
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
        Name   : getMotivationCategory
        Params : 
        Type   : GET
        Purpose: To Get All Motivation Category
    */
    public function getMotivationCategory( Request $request){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = array(
                "Motivation"
            );
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
        Name   : getPersonalityCategory
        Params : 
        Type   : GET
        Purpose: To Get All Personality Category
    */
    public function getPersonalityCategory( Request $request){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = array(
                "Personality"
            );
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
        Date   : 14/07/2020
        Name   : saveEmpathyPersona
        Params : 
        Type   : POST
        Purpose: To Save Empathy Persona
    */
    public function saveEmpathyPersona( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'ProjectId'        => 'required|numeric',
                'ProjectVersionId' => 'required|numeric',
                'EpicId'           => 'required|numeric',
                'EpicVersionId'    => 'required|numeric',
                'Persona'          => 'required|array|min:1'    
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            foreach ($requestData['Persona'] as $key => $value) {

                if(is_string($value['File'])){
                    $requestData['Persona'][$key]['FilePath'] = $value['File'];
                }else{    
                    if(isset($value['File']) && $value['File']!=""){
                        $FileName = uniqid().'-'.$value['File']->getClientOriginalName();
                        $dirname   = "PersonaImages";
                        $destinationPath = public_path('/'.$dirname);
                        if(! is_dir($destinationPath)){
                            mkdir($destinationPath, 0755,true);
                        }
                        $value['File']->move($destinationPath, $FileName);
                        $FilePath = env('APP_URL').'public/PersonaImages/'.$FileName;
                        chmod($destinationPath, 0777);
                        $requestData['Persona'][$key]['FilePath'] = $FilePath;
                    }
                }
                unset($requestData['Persona'][$key]['File']);
            }
            
            $params_array = array(
                $userId,
                json_encode($requestData)
            );
            
            $data = DB::select(' EXEC uspSavePersona ?,?', $params_array );
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
        Date   : 14/07/2020
        Name   : getAllEmpathyPersona
        Params : 
        Type   : GET
        Purpose: To Get All Empathy Persona
    */
    public function getAllEmpathyPersona( Request $request, $projectId, $projectVersionId, $epicId, $epicVersionId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $projectVersionId,
                $epicId,
                $epicVersionId
            ];
            $data = DB::select(' EXEC uspAllGetEmpathyPersona ?,?,?,?', $params_array );
            //echo "<pre>";print_r($data);echo "<br>";die;
            $data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $data_array["Persona"][$value->PersonaId]["CustomerJourneyMapId"] = $value->CustomerJourneyMapId;
                    $data_array["Persona"][$value->PersonaId]["PersonaId"] = $value->PersonaId;
                    $data_array["Persona"][$value->PersonaId]["PersonaName"] = $value->PersonaName;
                    $data_array["Persona"][$value->PersonaId]["FilePath"] = $value->FilePath ?? "";
                    $data_array["Persona"][$value->PersonaId]["Bio"] = $value->Bio;
                    $data_array["Persona"][$value->PersonaId]["Summary"] = $value->Summary; 
                    $data_array["Persona"][$value->PersonaId]["Age"] = $value->Age;
                    $data_array["Persona"][$value->PersonaId]["Occupation"] = $value->Occupation;
                    $data_array["Persona"][$value->PersonaId]["Family"] = $value->Family;
                    $data_array["Persona"][$value->PersonaId]["Location"] = $value->Location;
                    $data_array["Persona"][$value->PersonaId]["Archetype"] = $value->Archetype;
                    $data_array["Persona"][$value->PersonaId]["LifeCycleId"] = $value->LifecycleId;
                    $data_array["Persona"][$value->PersonaId]["Goals"][$value->GoalId]["Id"] = $value->GoalId;
                    $data_array["Persona"][$value->PersonaId]["Goals"][$value->GoalId]["Text"] = $value->GoalName;
                    $data_array["Persona"][$value->PersonaId]["PainPoints"][$value->PainPointId]["Id"] = $value->PainPointId;
                    $data_array["Persona"][$value->PersonaId]["PainPoints"][$value->PainPointId]["Text"] = $value->PainPointName;
                    
                    if($value->CategoryType ==="Motivation"){
                        //echo $value->CategoryLookUpId;die;
                        $data_array["Persona"][$value->PersonaId]["Motivations"][$value->CategoryLookUpId]["MotivationId"] = $value->CategoryLookUpId;
                        $data_array["Persona"][$value->PersonaId]["Motivations"][$value->CategoryLookUpId]["CategoryText"] = $value->CategoryText;
                        $data_array["Persona"][$value->PersonaId]["Motivations"][$value->CategoryLookUpId]["PersonalityText"] = $value->PersonalityText;
                        $data_array["Persona"][$value->PersonaId]["Motivations"][$value->CategoryLookUpId]["Value"] = $value->CategoryValue;
                    }
                    if($value->CategoryType=="Personality"){
                        $data_array["Persona"][$value->PersonaId]["Personality"][$value->CategoryLookUpId]["PersonalityId"] = $value->CategoryLookUpId;
                        $data_array["Persona"][$value->PersonaId]["Personality"][$value->CategoryLookUpId]["CategoryText"] = $value->CategoryText;
                        $data_array["Persona"][$value->PersonaId]["Personality"][$value->CategoryLookUpId]["PersonalityText"] = $value->PersonalityText;
                        $data_array["Persona"][$value->PersonaId]["Personality"][$value->CategoryLookUpId]["Value"] = $value->CategoryValue;
                    }/*else{
                        $data_array["Persona"][$value->PersonaId]["Personality"] = array();
                    }*/
                    if($value->DtStakeHolderId!=""){
                        $data_array["Persona"][$value->PersonaId]["Links"][$value->DtStakeHolderId]["StakeholderId"] = $value->DtStakeHolderId;
                    }else{
                        $data_array["Persona"][$value->PersonaId]["Links"] = array();
                    }

                }
                //echo "<pre>";print_r($data_array);echo "<br>";die;
                $data_array["Persona"] = array_values($data_array["Persona"]);
                foreach ($data_array["Persona"] as $key => $value) {
                    if(isset($value["Goals"])){
                        $data_array["Persona"][$key]["Goals"]= array_values($value["Goals"]);
                    }
                    if(isset($value["PainPoints"])){
                        $data_array["Persona"][$key]["PainPoints"]= array_values($value["PainPoints"]);
                    }
                    if(isset($value["Motivations"])){
                        $data_array["Persona"][$key]["Motivations"]= array_values($value["Motivations"]);
                    }else{
                         $data_array["Persona"][$key]["Motivations"] = array();
                    }
                    if(isset($value["Personality"])){
                        $data_array["Persona"][$key]["Personality"]= array_values($value["Personality"]);
                    }else{
                         $data_array["Persona"][$key]["Personality"]= array();
                    }
                    if(isset($value["Links"])){
                        $data_array["Persona"][$key]["Links"]= array_values($value["Links"]);
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
        Date   : 14/07/2020
        Name   : getEmpathyPersonaDetails
        Params : 
        Type   : GET
        Purpose: To Get Empathy Persona Details
    */
    public function getEmpathyPersonaDetails( Request $request, $projectId, $projectVersionId, $epicId, $epicVersionId, $personaId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $projectVersionId,
                $epicId,
                $epicVersionId,
                $personaId
            ];

            $data = DB::select(' EXEC uspGetEmpathyPersona  ?,?,?,?,?', $params_array );
            $data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $data_array["Persona"][$value->PersonaId]["PersonaId"] = $value->PersonaId;
                    $data_array["Persona"][$value->PersonaId]["PersonaName"] = $value->PersonaName;
                    $data_array["Persona"][$value->PersonaId]["FilePath"] = $value->FilePath;
                    $data_array["Persona"][$value->PersonaId]["Bio"] = $value->Bio;
                    $data_array["Persona"][$value->PersonaId]["Summary"] = $value->Summary; 
                    $data_array["Persona"][$value->PersonaId]["Age"] = $value->Age;
                    $data_array["Persona"][$value->PersonaId]["Occupation"] = $value->Occupation;
                    $data_array["Persona"][$value->PersonaId]["Family"] = $value->Family;
                    $data_array["Persona"][$value->PersonaId]["Location"] = $value->Location;
                    $data_array["Persona"][$value->PersonaId]["Archetype"] = $value->Archetype;
                    $data_array["Persona"][$value->PersonaId]["LifeCycleId"] = $value->LifecycleId;
                    $data_array["Persona"][$value->PersonaId]["Goals"][$value->GoalId]["Id"] = $value->GoalId;
                    $data_array["Persona"][$value->PersonaId]["Goals"][$value->GoalId]["Text"] = $value->GoalName;
                    $data_array["Persona"][$value->PersonaId]["PainPoints"][$value->PainPointId]["Id"] = $value->PainPointId;
                    $data_array["Persona"][$value->PersonaId]["PainPoints"][$value->PainPointId]["Text"] = $value->PainPointName;
                    
                    if($value->CategoryType=="Motivation"){
                        $data_array["Persona"][$value->PersonaId]["Motivations"][$value->CategoryLookUpId]["MotivationId"] = $value->CategoryLookUpId;
                        $data_array["Persona"][$value->PersonaId]["Motivations"][$value->CategoryLookUpId]["Value"] = $value->CategoryValue;
                    }
                    if($value->CategoryType=="Personality"){
                        $data_array["Persona"][$value->PersonaId]["Personality"][$value->CategoryLookUpId]["PersonalityId"] = $value->CategoryLookUpId;
                        $data_array["Persona"][$value->PersonaId]["Personality"][$value->CategoryLookUpId]["Value"] = $value->CategoryValue;
                    }
                    $data_array["Persona"][$value->PersonaId]["Links"][$value->DtStakeHolderId]["StakeholderId"] = $value->DtStakeHolderId;

                }
                $data_array["Persona"] = array_values($data_array["Persona"]);
                foreach ($data_array["Persona"] as $key => $value) {
                    if(isset($value["Goals"])){
                        $data_array["Persona"][$key]["Goals"]= array_values($value["Goals"]);
                    }
                    if(isset($value["PainPoints"])){
                        $data_array["Persona"][$key]["PainPoints"]= array_values($value["PainPoints"]);
                    }
                    if(isset($value["PainPoints"])){
                        $data_array["Persona"][$key]["Motivations"]= array_values($value["Motivations"]);
                    }
                    if(isset($value["Personality"])){
                        $data_array["Persona"][$key]["Personality"]= array_values($value["Personality"]);
                    }
                    if(isset($value["Links"])){
                        $data_array["Persona"][$key]["Links"]= array_values($value["Links"]);
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
        Author : Mohammed Mushran
        Date   : 25/05/2021
        Name   : uspDeleteEpiSubEpic
        Params : 
        Type   : GET
        Purpose: To delete the subEpic data
    */
    public function uspDeleteEpiSubEpic (Request $request) {
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $request->EpiSubEpicId,
                $userId
            ];
            $data = DB::select(' EXEC uspDeleteEpiSubEpic ?,?', $params_array );
            // console.log($data);
            if( count($data) > 0) {
                $message = "Deleted Successfully.";
            } else {
                $message = "Error Occured.";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }

    /*
        Author : Abdul
        Date   : 15/07/2020
        Name   : getAllLifeCycle
        Params : 
        Type   : GET
        Purpose: To Get All Life Cycle
    */
    public function getAllLifeCycle( Request $request, $projectId, $epicId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $epicId
            ];

            $data = DB::select(' EXEC uspGetAllLifeCycleforPersona  ?,?', $params_array );
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
        Date   : 15/07/2020
        Name   : getAllStakeholders
        Params : 
        Type   : GET
        Purpose: To Get All Stake Holders For Persona
    */
    public function getAllStakeholders( Request $request, $projectId, $epicId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $epicId
            ];

            $data = DB::select(' EXEC uspGetAllStakeholdersforPersona  ?,?', $params_array );
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
        Date   : 20/07/2020
        Name   : deletePersona
        Params : @ProjectId,@ProjectVersionId, @EpicId,@EpicVersionId, @PersonaId
        Type   : GET
        Purpose: To delete persona
    */
    public function deletePersona( Request $request, $projectId, $projectVersionId, $epicId, $epicVersionId, $personaId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $projectVersionId,
                $epicId,
                $epicVersionId,
                $personaId,
                $userId
            ];
            
            $data = DB::select(' EXEC uspDeleteEmpathyPersona ?,?,?,?,?,?', $params_array );
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
