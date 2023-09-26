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

class EmpathyMapController extends BaseController
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
        Name   : getEmpathyMapCategory
        Params : 
        Type   : GET
        Purpose: To Get Empathy Map Category
    */
    public function getEmpathyMapCategory( Request $request){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = array(
                "EmpathyMap"
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
        Name   : saveEmpathyMap
        Params : 
        Type   : POST
        Purpose: To Save Empathy Map
    */
     public function saveEmpathyMap( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'ProjectId'        => 'required|numeric',
                'ProjectVersionId' => 'required|numeric',
                'EpicId'           => 'required|numeric',
                'EpicVersionId'    => 'required|numeric',
                'EmpathyMap'       => 'required|array|min:1'    
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
            //echo json_encode($requestData);die;
            $data = DB::select(' EXEC uspSaveEmpathyMap ?,?', $params_array );
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
        Date   : 09/07/2020
        Name   : getAllEmpathyMap
        Params : 
        Type   : GET
        Purpose: To Get All Empathy Map
    */
    public function getAllEmpathyMap( Request $request, $projectId, $projectVersionId, $epicId, $epicVersionId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $projectVersionId,
                $epicId,
                $epicVersionId
            ];

            $data = DB::select(' EXEC uspAllGetEmpathyMap ?,?,?,?', $params_array );
            //echo "<pre>";print_r($data);echo "<br>";die;
            $data_array = array();
            if( count($data) > 0){
                $data_array["ProjectId"]        = $data[0]->ProjectID; 
                $data_array["ProjectVersionId"] = isset($data[0]->ProjectVersionId) ? $data[0]->ProjectVersionId : "" ;
                $data_array["EpicId"]           = $data[0]->DTEPICHeaderId;
                $data_array["EpicVersionId"]    = isset($data[0]->EpicVersionId) ? $data[0]->EpicVersionId : "";
                foreach ($data as $key => $value) {
                    $stakeHolderData = DB::select(' EXEC uspGetStakeholderbyEmpathyMapId ?', array($value->EmpathyMapId) );
                    
                    
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["EmpathyMapId"] = $value->EmpathyMapId;
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["MapName"] = $value->MapName; 
                    //$data_array["EmpathyMap"][$value->EmpathyMapId]["Links"][$value->DtStakeHolderId]["StakeholderId"]   = $value->DtStakeHolderId; 
                    //$data_array["EmpathyMap"][$value->EmpathyMapId]["Links"] =$stake_holder_array;
                    if(count($stakeHolderData) ==0){
                         $data_array["EmpathyMap"][$value->EmpathyMapId]["Links"] = array();
                    }else{
                        /*foreach ($stakeHolderData as $k => $v) {
                            $data_array["EmpathyMap"][$value->EmpathyMapId]["Links"][$v->DtStakeHolderId]['StakeholderId'] =$v->DtStakeHolderId;
                        }*/
                        $data_array["EmpathyMap"][$value->EmpathyMapId]["Links"][$value->DtStakeHolderId]['StakeholderId'] = $value->DtStakeHolderId;
                    }
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Sections"][$value->CategoryLookupId]["SectionCategoryId"] = $value->CategoryLookupId;
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Sections"][$value->CategoryLookupId]["SectionCategoryTitle"] = $value->CategoryName;
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Sections"][$value->CategoryLookupId]["SectionCategoryOrderNumber"] = $value->CategoryNameOrderNumber;
                    
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Sections"][$value->CategoryLookupId]["Mapping"][$value->MappingId]["MappingId"] = $value->MappingId;
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Sections"][$value->CategoryLookupId]["Mapping"][$value->MappingId]["MappingText"] = $value->MappingText;
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Sections"][$value->CategoryLookupId]["Mapping"][$value->MappingId]["MappingDetailsText"] = $value->MappingDetailsText;
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Sections"][$value->CategoryLookupId]["Mapping"][$value->MappingId]["MappingOrderOfInsertion"] = $value->MappingOrderOfInsertion;

                   
                }
                $data_array["EmpathyMap"] = array_values($data_array["EmpathyMap"]);
               
                foreach ($data_array["EmpathyMap"] as $k => $v) {
                    if(isset($v['Links'])){
                        $data_array["EmpathyMap"][$k]["Links"] = array_values($v["Links"]);
                    }
                    if(isset($v['Sections'])){
                        $data_array["EmpathyMap"][$k]["Sections"] = array_values($v["Sections"]);

                        foreach ($data_array["EmpathyMap"][$k]["Sections"] as $i => $vi) {
                            if(isset($vi["Mapping"])){
                               $data_array["EmpathyMap"][$k]["Sections"][$i]["Mapping"] = array_values($vi["Mapping"]);
                            }
                        } 
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
        Name   : getEmpathyMapDetails
        Params : 
        Type   : GET
        Purpose: To Get Empathy Map Details
    */
    public function getEmpathyMapDetails( Request $request, $projectId, $projectVersionId, $epicId, $epicVersionId, $empathyMapId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $projectVersionId,
                $epicId,
                $epicVersionId,
                $empathyMapId
            ];

            $data = DB::select(' EXEC uspGetEmpathyMap ?,?,?,?,?', $params_array );
            $data_array = array();
            if( count($data) > 0){
                $data_array["ProjectId"]        = $data[0]->ProjectID; 
                $data_array["ProjectVersionId"] = isset($data[0]->ProjectVersionId) ? $data[0]->ProjectVersionId : "" ;
                $data_array["EpicId"]           = $data[0]->DTEPICHeaderId;
                $data_array["EpicVersionId"]    = isset($data[0]->EpicVersionId) ? $data[0]->EpicVersionId : "";
                foreach ($data as $key => $value) {
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["EmpathyMapId"] = $value->EmpathyMapId;
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["MapName"] = $value->MapName; 
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Links"][$value->DtStakeHolderId]["StakeholderId"]   = $value->DtStakeHolderId; 

                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Sections"][$value->CategoryLookupId]["SectionCategoryId"] = $value->CategoryLookupId;
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Sections"][$value->CategoryLookupId]["SectionCategoryTitle"] = $value->CategoryName;
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Sections"][$value->CategoryLookupId]["SectionCategoryOrderNumber"] = $value->CategoryNameOrderNumber;
                    
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Sections"][$value->CategoryLookupId]["Mapping"][$value->MappingId]["MappingId"] = $value->MappingId;
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Sections"][$value->CategoryLookupId]["Mapping"][$value->MappingId]["MappingText"] = $value->MappingText;
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Sections"][$value->CategoryLookupId]["Mapping"][$value->MappingId]["MappingDetailsText"] = $value->MappingDetailsText;
                    $data_array["EmpathyMap"][$value->EmpathyMapId]["Sections"][$value->CategoryLookupId]["Mapping"][$value->MappingId]["MappingOrderOfInsertion"] = $value->MappingOrderOfInsertion;

                   
                }
                $data_array["EmpathyMap"] = array_values($data_array["EmpathyMap"]);
               
                foreach ($data_array["EmpathyMap"] as $k => $v) {
                    if(isset($v['Links'])){
                        $data_array["EmpathyMap"][$k]["Links"] = array_values($v["Links"]);
                    }
                    if(isset($v['Sections'])){
                        $data_array["EmpathyMap"][$k]["Sections"] = array_values($v["Sections"]);

                        foreach ($data_array["EmpathyMap"][$k]["Sections"] as $i => $vi) {
                            if(isset($vi["Mapping"])){
                               $data_array["EmpathyMap"][$k]["Sections"][$i]["Mapping"] = array_values($vi["Mapping"]);
                            }
                        } 
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
        Date   : 20/07/2020
        Name   : deleteEmpathyMap
        Params : @ProjectId,@ProjectVersionId, @EpicId,@EpicVersionId, @empathyMapId
        Type   : GET
        Purpose: To delete empathy map
    */
    public function deleteEmpathyMap( Request $request, $projectId, $projectVersionId, $epicId, $epicVersionId, $empathyMapId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $projectVersionId,
                $epicId,
                $epicVersionId,
                $empathyMapId,
                $userId
            ];
            
            $data = DB::select(' EXEC uspDeleteEmpathyMap ?,?,?,?,?,?', $params_array );
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
