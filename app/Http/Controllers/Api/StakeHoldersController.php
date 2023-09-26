<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Controllers\Api\BaseController as BaseController;
use DB;
use Validator;
use JWTAuth;
use Illuminate\Support\Facades\Crypt;

class StakeHoldersController extends BaseController
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
        Date   : 04/03/2020
        Name   : saveDesignThinkingStakeHolder
        Params : 
        Type   : POST
        Purpose: To save Design Thinking Stake Holder 
    */
    public function saveDesignThinkingStakeHolder( Request $request ){
        try{
            if($request["DTStakeHolderType"]=='Asset/Resources'){
                $validator = Validator::make($request->all(), [
                    'ModelName' => 'required|between:2,20',
                    'Model'     => 'required',
                    'AssetType' => 'required',
                    'AssetName' => 'required',
                    'Location'  => 'required'
                ]);
                if ($validator->fails()) {
                    return $this->sendError('Validation Errors',$validator->errors());
                }
            }
            if($request["DTStakeHolderType"]=='MarketIntellegence'){
                $validator = Validator::make($request->all(), [
                    'Title'     => 'required|between:2,20',
                    'SourceName'=> 'required|between:2,20',
                    'Location'  => 'required'
                ]);
                if ($validator->fails()) {
                    return $this->sendError('Validation Errors',$validator->errors());
                }
            }
            if($request["DTStakeHolderType"]=='RegulatoryBody'){
                $validator = Validator::make($request->all(), [
                    'Title'       => 'required|between:2,20',
                    'Headquarter' => 'required|between:2,20',
                    'Location'    => 'required'
                ]);
                if ($validator->fails()) {
                    return $this->sendError('Validation Errors',$validator->errors());
                }
            }
            if($request["DTStakeHolderType"]=='TradingPartner' || $request["DTStakeHolderType"]=='Trading Partner'){
                $validator = Validator::make($request->all(), [
                    'Title'       => 'required|between:2,20',
                    'PartnerType' => 'required',
                    'Industry'    => 'required',
                    'Location'    => 'required'
                ]);
                if ($validator->fails()) {
                    return $this->sendError('Validation Errors',$validator->errors());
                }
            }
            if($request["DTStakeHolderType"]=='Employee'){
                $validator = Validator::make($request->all(), [
                    'FirstName'=> 'required|between:2,20',
                    'LastName' => 'required|between:2,20',
                    //'BirthDate'=> 'required|date_format:Y-m-d',
                    'HireDate' => 'required|date_format:Y-m-d',
                    'Email'    => 'required',
                    'ManagerID'=> 'required',
                    'Location' => 'required',
                ]);
                if ($validator->fails()) {
                    return $this->sendError('Validation Errors',$validator->errors());
                }
            }
            $requestData = $request->all();
            if($request->hasFile('Image')){

                $dirname = 'StakeHoldersImages';
                $destinationPath        = public_path('/'.$dirname);

                if(! is_dir($destinationPath) ){
                    mkdir($destinationPath, 0755,true);
                }
                $image = $request->file('Image');
                $img_name = time().'.'.$image->getClientOriginalExtension();
                $image->move($destinationPath, $img_name);
                $requestData['Image'] = $img_name;
                chmod($destinationPath, 0777);
            }

            $additionalJson = $requestData['additional'];
            $additionalArr = json_decode($additionalJson,true);
            if(empty($additionalArr)){
               $additional = $additionalJson;
            }else{
                $additional = $additionalArr;
            }
            $requestData['additional'] = $additional;
            //$requestData['root'] = $request->all();
            $params_array = array(
                $this->user_data['UserID'],
                json_encode($requestData),
                $requestData['DTStakeHolderType']
            );
            //echo "<pre>";print_r( $params_array );echo "<br>";die;
            $data = DB::select(" EXEC uspSaveDtStakeHolder ?,?,?", $params_array);
            //echo "<pre>";print_r($data);echo "<br>";die;
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
    public function saveDesignThinkingStakeHolder_old( Request $request ){
        try{
           
            $requestData = $request->all();
            if($request->hasFile('Image')){
                //StakeHoldersImages
                $image = $request->file('Image');
                $img_name = time().'.'.$image->getClientOriginalExtension();
                $destinationPath = public_path('/StakeHoldersImages');
                $image->move($destinationPath, $img_name);
                $requestData['Image'] = $img_name;
            }
            $additionalJson = $requestData['additional'];
            $additionalArr = json_decode($additionalJson,true);
            if(empty($additionalArr)){
               $additional = $additionalJson;
            }else{
                $additional = $additionalArr;
            }
            $requestData['additional'] = $additional;
            //echo  json_encode($requestData);die;
            //$requestData['root'] = $request->all();
            $params_array = array(
                $this->user_data['UserID'],
                json_encode($requestData),
                $requestData['DTStakeHolderType']
            );
            //echo "<pre>";print_r( $params_array );echo "<br>";die;
            $data = DB::select(" EXEC uspSaveDtStakeHolder ?,?,?", $params_array);
            //echo "<pre>";print_r($data);echo "<br>";die;
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
        Date   : 04/03/2020
        Name   : getDesignThinkingStakeHolders
        Params : 
        Type   : GET
        Purpose: To Get Design Thinking Stake Holders 
    */
    public function getDesignThinkingStakeHolders( Request $request ){
        try{
           $requestData = $request->all();
           
            if(isset($requestData['StakeHolderName']) && $requestData['StakeHolderName']!="" ){
                $StakeHolderName = $requestData['StakeHolderName'];
            }else{
                $StakeHolderName = "";
            }

            $params_array = [
                $StakeHolderName
            ];
            $data = DB::select(' EXEC uspListDtStakeHolders ?', $params_array);
            
            if( count($data) > 0){
                $message = "Stake holders fetched successfully";
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
        Date   : 13/03/2020
        Name   : getDtStakeHolderDetails
        Params : 
        Type   : GET
        Purpose: To Get Design Thinking Stake Holder Deatils
    */
    public function getDtStakeHolderDetails( Request $request, $stakeHolderId ){
        try{
           
            $params_array = [
                $stakeHolderId
            ];
            
            $data = DB::select(' EXEC uspGetDtStakeHolderDetails ?', $params_array);
            if( count($data) > 0){
                $message = "Stake holders fetched successfully";
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
        Date   : 11/03/2020
        Name   : getNetworkOfInfluenceTemplates
        Params : 
        Type   : GET
        Purpose: To Get Network of influence templates
    */
    public function getNetworkOfInfluenceTemplates( Request $request ){
        try{
           
            $data = DB::select(" EXEC uspListNoiTemplates ");
           
            if( count($data) > 0){
               $message = "NOI templates fetched successfully";
            }else{
                $message = "No record found"; 
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }    

    /*
        Author : Mohammed Mushran
        Date   : 05/05/2021
        Name   : uspGetAllNoiTemplateName
        Params : 
        Type   : GET
        Purpose: To Get Network of influence id
    */
    public function uspGetAllNoiTemplateName ( Request $request ) {
        try{
           
            $data = DB::select(" EXEC uspGetAllNoiTemplateName ");
            // print_r($data);die;
           
            if( count($data) > 0){
               $message = "NOI id fetched successfully";
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
        Date   : 11/03/2020
        Name   : getNetworkOfInfluenceHeader
        Params : 
        Type   : POST
        Purpose: To Get Network of influence header
    */
    /*public function getNetworkOfInfluenceHeader( Request $request, $TemplateId, $Id ){
        try{
            //echo $TemplateId."====".$Id;die;
            
            $params_array = array(
                $TemplateId,
                $Id,
            );
            $data = DB::select(" EXEC uspGetNOIHeader ?,?", $params_array);
            if( count($data) > 0){
               $message = "NOI header fetched successfully";
            }else{
                $message = "No record found"; 
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }*/    
    /*
        Author : Abdul
        Date   : 11/03/2020
        Name   : saveNetworkOfInfluence
        Params : 
        Type   : POST
        Purpose: To save Network of influence 
    */
    public function saveNetworkOfInfluence( Request $request ){
        try{
           $validator = Validator::make($request->all(), [
                'Title' => 'required|between:2,20',
                'connections' => 'array',
                'network' => 'array',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData =$request->all();
            $params_array = array(
                 $this->user_data['UserID'],
                json_encode( $requestData)
            );
            $data = DB::select(" EXEC uspSaveNOI ?,?", $params_array);
            //echo "<pre>";print_r($data);echo "<br>";die;
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success) && ($data[0]->Success == false || $data[0]->Success ===0)){
                $message =$data[0]->MessageName; 
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 11/03/2020
        Name   : getNetworkOfInfluence
        Params : 
        Type   : GET
        Purpose: To Get Network of influence 
    */
    /*public function getNetworkOfInfluence( Request $request, $NOIID ){
        try{
            
            $params_array = [
                $NOIID
            ]; 
            $data = DB::select(' EXEC uspGetNOI ?', $params_array);
            
            if( count($data) > 0){
                $message = "Network of influence fetched successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    } */
     public function getNetworkOfInfluence( Request $request, $TemplateId  ){
        try{
            $NOIId = 0;
            $params_array = [
                $TemplateId,
                $NOIId
            ];
            //echo "<pre>";print_r($params_array);echo "<br>";die;
            $template   = DB::select(" EXEC uspGetNoiTemplateDetail ?", array($TemplateId));
            $header     = DB::select(" EXEC uspGetNOIHeader ?,?", $params_array); 
            $connection = DB::select(' EXEC uspGetNOIConnection ?,?', $params_array);
            $network    = DB::select(' EXEC uspGetNOINetwork ?,?', $params_array);
            
            $templateData   = json_decode(json_encode($template), true);
            $headerData     = json_decode(json_encode($header), true);
            $connectionData = json_decode(json_encode($connection), true);
            $networkData    = json_decode(json_encode($network), true);

            //echo "<pre>";print_r($templateData);echo "<br>";
            //echo "<pre>";print_r($headerData);echo "<br>";
            //echo "<pre>";print_r($connectionData);echo "<br>";
            //echo "<pre>";print_r($networkData);echo "<br>";
            //die;
            if( count($template) > 0){
                $response = array(
                    "templateid" => $templateData[0]['Id'],
                    "id"         => $templateData[0]['Id'],
                    "Title"      => $templateData[0]['Title'],
                    "UpdatedAt"  => $templateData[0]['UpdatedAt'],
                    "connections"=> $connectionData,
                    "network"    => $networkData,
                );
            }else{
                $response = array();
            }
            if( count($response) > 0){
                $message = "Network of influence fetched successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($response, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    } 
     /*
        Author : Abdul
        Date   : 12/03/2020
        Name   : getStakeHolderType
        Params : 
        Type   : POST
        Purpose: To get all Stake Holder Type 
    */
    public function getStakeHolderType(){
        try{
            $params_array = [
                "stakeholdertype"
            ];
            $data   = DB::select(" EXEC Amplo.uspListDTType ?", $params_array);
            
            if( count($data) > 0){
                $message = "Stake holders type fetched successfully";
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
        Date   : 25/03/2020
        Name   : getManager
        Params : 
        Type   : Get
        Purpose: To get all manager 
    */
    public function getManager(){
        try{
            $data   = DB::select(" EXEC uspGetManagerList ");
            
            if( count($data) > 0){
                $message = "Manager fetched successfully";
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
        Date   : 25/03/2020
        Name   : getDepartment
        Params : 
        Type   : Get
        Purpose: To Get All Department 
    */
    public function getDepartment(){
        try{
            $data   = DB::select(" EXEC uspGetDTDepartmentList ");
            if( count($data) > 0){
                $message = "Department fetched successfully";
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
        Date   : 25/03/2020
        Name   : getLocation
        Params : 
        Type   : Get
        Purpose: To Get All Location 
    */
    public function getLocation(){
        try{
            $data   = DB::select(" EXEC uspGetLocationList ");
            if( count($data) > 0){
                $message = "Location fetched successfully";
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
        Date   : 26/06/2020
        Name   : getBusinessEntity
        Params : 
        Type   : Get
        Purpose: To Get All Business Entity 
    */
    public function getBusinessEntity(Request $request){
        try{
            $data   = DB::select(" EXEC uspDTBusinessEntityList ");
            if( count($data) > 0){
                $message = "Business Entity fetched successfully";
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
        Date   : 26/06/2020
        Name   : getEmployeeType
        Params : 
        Type   : Get
        Purpose: To Get All Employee Type 
    */
    public function getEmployeeType(Request $request){
        try{
            $data   = DB::select(" EXEC uspDTEmployeeTypeList ");
            if( count($data) > 0){
                $message = "Employee Type fetched successfully";
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
        Date   : 26/06/2020
        Name   : getModel
        Params : 
        Type   : Get
        Purpose: To Get All Model 
    */
    public function getModel(Request $request){
        try{
            $data   = DB::select(" EXEC uspDTModelList ");
            if( count($data) > 0){
                $message = "Model fetched successfully";
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
        Date   : 26/06/2020
        Name   : getPartnerType
        Params : 
        Type   : Get
        Purpose: To Get All Partner Type 
    */
    public function getPartnerType(Request $request){
        try{
            $data   = DB::select(" EXEC uspDTPartnerTypeList ");
            if( count($data) > 0){
                $message = "Partner Type fetched successfully";
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
        Date   : 26/06/2020
        Name   : getOrganizationalLevel
        Params : 
        Type   : Get
        Purpose: To Get All Organizational Level 
    */
    public function getOrganizationalLevel(Request $request){
        try{
            $data   = DB::select(" EXEC uspOrganizationalLevelList ");
            if( count($data) > 0){
                $message = "Organizational Level fetched successfully";
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
        Date   : 26/06/2020
        Name   : getAssetCategory
        Params : 
        Type   : Get
        Purpose: To Get All Asset Category 
    */
    public function getAssetCategory(Request $request){
        try{
            $data   = DB::select(" EXEC uspDTAssetCategoryDetailsList ");
            if( count($data) > 0){
                $message = "Asset Category fetched successfully";
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
        Date   : 26/06/2020
        Name   : getAssetType
        Params : 
        Type   : Get
        Purpose: To Get All Asset Type
    */
    public function getAssetType(Request $request){
        try{
            $data   = DB::select(" EXEC uspDTAssetTypeList ");
            if( count($data) > 0){
                $message = "Asset Type fetched successfully";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }  
}
    