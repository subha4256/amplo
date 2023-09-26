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
use App\Http\Controllers\EmailController;

class PrototypeController extends BaseController
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
        Author : Narinder
        Date   : 28/07/2020
        Name   : savePrototypeSession
        Params : 
        Type   : POST
        Purpose: To Save Prototype Session
    */
    public function savePrototypeSession(Request $request){
        try {
             
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $userId,
                json_encode($requestData),
            );

            $data = DB::select(' EXEC uspSavePrototypeSession ?,?', $params_array );
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                $mailsend = 0;

                foreach ($requestData["Participants"] as $key => $value) {

                    $encryptedEmail         = Crypt::encryptString($value["email"]);
                    $email_array['to']      = $value["email"];
                    $email_array['title']   = 'Schedule Prototype Session';
                    $email_array['subject'] = 'AmploFly 4.0 Schedule Prototype Session';
                    $email_array['template']= 'email.emailPrototypeSession';
                    // $email_array['link']    =  env('CLIENT_SITE_URL').'xxxxxx/'.$encryptedEmail;
                    $email_array['link']    =  env('CLIENT_SITE_URL').'login/?'. $requestData["pageId"];

                    $mail = new EmailController;
                    $mail_response = $mail->sendIdeateSessionEmail($email_array);

                    $mailsend++;
                }
                if($mailsend==count($requestData["Participants"])){
                    $message = $data[0]->MessageName;
                }else{
                    $message = "Email could not be sent.";
                }
                return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else{
                $message = "";
                return $this->sendResponse($data, $message);
            }
        } catch ( \Exception $e ) {
            return $this->sendError($e->getMessage()); 
        }
    }    
    /*
        Author : Narinder
        Date   : 27/07/2020
        Name   : getPrototypeSession
        Params : 
        Type   : GET
        Purpose: To GET PrototypeSession 
    */
    public function getPrototypeSession( Request $request,$prototypeSessionId){
        try{
            
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            
            $params_array = array(
                $prototypeSessionId
            );
            $data = DB::select(' EXEC uspGetPrototypeSession ?', $params_array );
            $data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $data_array[$value->DtPrototypeId]['PrototypeSessionId'] = $value->DtPrototypeId;
                    $data_array[$value->DtPrototypeId]['FromDateTime'] = date('Y-m-d H:i:s',strtotime($value->FromDateTime));
                    $data_array[$value->DtPrototypeId]['ToDateTime'] = date('Y-m-d H:i:s',strtotime($value->ToDateTime));
                    $data_array[$value->DtPrototypeId]['TimeZoneName'] = $value->TimeZoneName;
                    $data_array[$value->DtPrototypeId]['Location'] = $value->Location;
                    $data_array[$value->DtPrototypeId]['NotifyBefore'] = $value->NotifyBefore;
                    $data_array[$value->DtPrototypeId]['TimeType'] = $value->TimeType;
                    $data_array[$value->DtPrototypeId]['Note'] = $value->DtPrototypeSessionNote;
                    $data_array[$value->DtPrototypeId]['NotePlainText'] = $value->DtPrototypeSessionNotePlainText;
                    $data_array[$value->DtPrototypeId]['EpicId'] = $value->DTEPICHeaderId;
                    $data_array[$value->DtPrototypeId]['EpicVersionId'] = $value->DtEpicVersionId;
                    $data_array[$value->DtPrototypeId]['ProjectId'] = $value->DTProjectID;
                    $data_array[$value->DtPrototypeId]['ProjectVersionId'] = $value->DtProjectVersionId;
                    $data_array[$value->DtPrototypeId]['Participants'][$value->DtParticipantId]['email']= $value->ParticipantEmail;
                }
                $data_array = array_values($data_array);
                foreach ($data_array as $key => $value) {
                    if(isset($value['Participants'])){
                        $data_array[$key]['Participants']= array_values($value['Participants']);
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
        Date   : 10/08/2020
        Name   : savePrototype
        Params : 
        Type   : POST
        Purpose: To Save Prototype
    */
    public function savePrototype(Request $request){
        try {
            
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            
            $params_array = array(
                $userId,
                json_encode($requestData)
            );
            $data = DB::select(' EXEC uspSavePrototypes ?,?', $params_array );
            if( isset($data[0]->IsSuccess) && ($data[0]->IsSuccess == true || $data[0]->IsSuccess ===1)){
                $message = $data[0]->MessageName;
                return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else{
                $message = "";
                return $this->sendResponse($data, $message);
            }
        } catch ( \Exception $e ) {
            return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 10/08/2020
        Name   : uploadPrototypeFile
        Params : 
        Type   : POST
        Purpose: To Upload Prototype File  
    */
    public function uploadPrototypeFile(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'File' => 'required',
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $data = array();
            $message = "";
            if(isset($requestData['File']) && $requestData['File']!=""){
                $FileName = uniqid().'-'.$requestData['File']->getClientOriginalName();
                $dirname   = "PrototypeFiles";
                $destinationPath = public_path('/'.$dirname);
                if(! is_dir($destinationPath)){
                    mkdir($destinationPath, 0755,true);
                }
                $requestData['File']->move($destinationPath, $FileName);
                $FilePath = env('APP_URL').'public/PrototypeFiles/'.$FileName;
                //chmod($destinationPath, 0777);
                $data = array(
                    'FilePath' => $FilePath
                );
                $message = "File uploaded successfully";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }  
    /*
        Author : Abdul
        Date   : 10/08/2020
        Name   : deletePrototypeFile
        Params : 
        Type   : DELETE
        Purpose: To Delete Prototype File  
    */
    public function deletePrototypeFile(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'FilePath' => 'required',
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $params_array = array(
                $requestData['FilePath']
            );
            $data = DB::select(' EXEC uspDeleteFile ?' , $params_array);

            if( isset($data[0]->IsSuccess) && ($data[0]->IsSuccess == true || $data[0]->IsSuccess ===1)){
                $file_array = explode('/',$requestData['FilePath']);
                $file_path = public_path().'/'.$file_array[3].'/'.$file_array[4];
                unlink($file_path);
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->IsSuccess)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else{
                $message = "";
                return $this->sendResponse($data, $message);
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 10/08/2020
        Name   : getPrototype
        Params : 
        Type   : GET
        Purpose: To GET Prototype By Idead Id
    */
    public function getPrototype( Request $request, $ideaId){
        try{
            $requestData = $request->all();
            $params_array = array(
                $ideaId
            );
            $data = DB::select(' EXEC uspGetPrototypes ?', $params_array );
            $data = json_decode(json_encode($data), true);
            $data_array = array();
            if( count($data) > 0){
                foreach($data as $key=>$val){
                    $data_array['Prototype'][$val['PrototypeId']]['PrototypeId']      = $val['PrototypeId'];
                    $data_array['Prototype'][$val['PrototypeId']]['ProjectId']        = $val['ProjectId'];
                    $data_array['Prototype'][$val['PrototypeId']]['ProjectVersionId'] = $val['DtProjectVersionId'];
                    $data_array['Prototype'][$val['PrototypeId']]['EpicId']           = "";//$val['DtProjectVersionId'];
                    $data_array['Prototype'][$val['PrototypeId']]['EpicVersionId']    = $val['DtEpicVersionId'];
                    $data_array['Prototype'][$val['PrototypeId']]['SubEpicId']        = $val['DtSubEpicId'];
                    if($val['LookUpName']=="Files"){
                        $data_array['Prototype'][$val['PrototypeId']][$val['LookUpName']][$val['Id']]["Id"] = $val["Id"]; 
                        $data_array['Prototype'][$val['PrototypeId']][$val['LookUpName']][$val['Id']]["x"] = $val["LocationX"];
                        $data_array['Prototype'][$val['PrototypeId']][$val['LookUpName']][$val['Id']]["y"] = $val["LocationY"];
                        $data_array['Prototype'][$val['PrototypeId']][$val['LookUpName']][$val['Id']]["path"] = $val["LookupValue1"];
                    }
                    if($val['LookUpName']=="shapes"){
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["Id"] = $val["Id"]; 
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["x"] = $val["LocationX"];
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["y"] = $val["LocationY"];
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["height"] = $val["LookupValue1"];
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["width"] = $val["LookupValue2"];
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["rotations"] = $val["LookupValue3"];
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["type"] = $val["LookupValue4"];
                    }
                    if($val['LookUpName']=="text"){
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["Id"] = $val["Id"]; 
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["x"] = $val["LocationX"];
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["y"] = $val["LocationY"];
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["height"] = $val["LookupValue1"];
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["width"] = $val["LookupValue2"];
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["description"] = $val["LookupValue3"];
                    }
                    if($val['LookUpName']=="PostIds"){
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["Id"] = $val["Id"]; 
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["x"] = $val["LocationX"];
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["y"] = $val["LocationY"];
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["height"] = $val["LookupValue1"];
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["width"] = $val["LookupValue2"];
                        $data_array['Prototype'][$val['PrototypeId']][ucfirst($val['LookUpName'])][$val['Id']]["colour"] = $val["LookupValue3"];
                    }
                }
                $data_array['Prototype'] =array_values($data_array['Prototype']);
                foreach ($data_array['Prototype'] as $key => $value) {
                    if(isset($value['Files'])){
                        $data_array['Prototype'][$key]['Files']= array_values($value['Files']);
                    }
                    if(isset($value['Shapes'])){
                        $data_array['Prototype'][$key]['Shapes']= array_values($value['Shapes']);
                    }
                    if(isset($value['Text'])){
                        $data_array['Prototype'][$key]['Text']= array_values($value['Text']);
                    }
                    if(isset($value['PostIds'])){
                        $data_array['Prototype'][$key]['PostIds']= array_values($value['PostIds']);
                    }
                }
                $message = "Data retrieved successfully.";
                return $this->sendResponse($data_array['Prototype'], $message);
            }else {
                $message = "No record found.";  
                return $this->sendResponse($data, $message);
            }
           
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 10/08/2020
        Name   : getIdeasForPrototype
        Params : 
        Type   : GET
        Purpose: To GET Ideas For Prototype By SubEpic Id
    */
    public function getIdeasForPrototype( Request $request, $subEpicId){
        try{
            $requestData = $request->all();
            $params_array = array(
                $subEpicId
            );
            $data = DB::select(' EXEC uspGetIdeasForPrototype ?', $params_array );
            $data = json_decode(json_encode($data), true);
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
        Date   : 10/08/2020
        Name   : deleteShapeTextPostIdsPrototype
        Params : 
        Type   : DELETE
        Purpose: To Delete Prototype,Shape,Text,PostIds 
    */ 
    public function deleteShapeTextPostIds( Request $request, $id){
        try{
            $requestData = $request->all();
            $params_array = array(
                $id
            );
            $data = DB::select(' EXEC uspDeleteShapesOrTextOrPostIds ?', $params_array );
            if( isset($data[0]->IsSuccess) && ($data[0]->IsSuccess == true || $data[0]->IsSuccess ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }
            else if(isset($data[0]->IsSuccess)){
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
        Author : Narinder
        Date   : 28/07/2020
        Name   : savePrototypeAndPrototypeDetail
        Params : 
        Type   : POST
        Purpose: To save Prototype And Prototype Detail 
    */  
    /*public function savePrototypeAndPrototypeDetail( Request $request){
        try{
            
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $userId,
                json_encode($requestData["InputJson"]),
            );
            $data = DB::select(' EXEC uspSavePrototypeAndPrototypeDetail ?,?', $params_array );
            if( isset($data[0]->IsSuccess) && ($data[0]->IsSuccess == true || $data[0]->IsSuccess ===1)){
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
    }*/
    /*
        Author : Narinder
        Date   : 27/07/2020
        Name   : getPrototypeAndPrototypeDetail
        Params : 
        Type   : POST
        Purpose: To GET prototype and Prototype Detail 
    */
    /*public function getPrototypeAndPrototypeDetail( Request $request, $epicId, $epicVersionId, $dtPrototypeId){
        try{
            
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            
            $params_array = array(
                $epicId,
                $epicVersionId,
                $dtPrototypeId
            );
            $data = DB::select(' EXEC uspGetPrototypeAndPrototypeDetail ?,?,?', $params_array );
            if( count($data) > 0){
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }*/
    /*
        Author : Narinder
        Date   : 29/07/2020
        Name   : getPrototype
        Params : 
        Type   : get
        Purpose: To GET prototype
    */
    /*public function getPrototype( Request $request, $epicId, $epicVersionId, $dtPrototypeId){
        try{
            
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            
            $params_array = array(
                $epicId,
                $epicVersionId,
                $dtPrototypeId
            );
            $data = DB::select(' EXEC uspGetPrototype ?,?,?', $params_array );
            if( count($data) > 0){
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }*/
   /*
        Author : Narinder
        Date   : 29/07/2020
        Name   : getPrototype
        Params : 
        Type   : get
        Purpose: To GET prototype
    */
    /*public function getPrototypeDetails( Request $request, $epicId, $epicVersionId, $dtPrototypeId){
        try{
            
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            
            $params_array = array(
                $epicId,
                $epicVersionId,
                $dtPrototypeId
            );
            $data = DB::select(' EXEC uspGetPrototypeDetails ?,?,?', $params_array );
            if( count($data) > 0){
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }*/    
}
