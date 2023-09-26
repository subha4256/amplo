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

class EmpathyController extends BaseController
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
        Date   : 03/07/2020
        Name   : saveEmpathyNotes
        Params : 
        Type   : POST
        Purpose: To save empathy notes 
    */
    public function saveEmpathyNotes( Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                'ProjectId'        => 'required|numeric',
                'ProjectVersionId' => 'required|numeric',
                'EpicId'           => 'required|numeric',
                'EpicVersionId'    => 'required|numeric',
                'Stakeholders'     => 'required|array|min:1'
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            foreach ($requestData['Stakeholders'] as $key => $value) {

                if(isset($value['video']) && $value['video']!=""){
                    $videoName = uniqid().'-'.$value['video']->getClientOriginalName();
                    $dirname   = "EmpatyNotes";
                    $destinationPath = public_path('/'.$dirname);
                    if(! is_dir($destinationPath)){
                        mkdir($destinationPath, 0755,true);
                    }
                    $value['video']->move($destinationPath, $videoName);
                    $videoPath = env('APP_URL').'public/EmpatyNotes/'.$videoName;
                    chmod($destinationPath, 0777);
                    $requestData['Stakeholders'][$key]['FileType'][] = array('FileId' => 1,'FilePath' => $videoPath);
                }
                if(isset($value['image']) && $value['image']!=""){
                    $imageName = uniqid().'-'.$value['image']->getClientOriginalName();
                    $dirname   = "EmpatyNotes";
                    $destinationPath = public_path('/'.$dirname);
                    if(! is_dir($destinationPath)){
                        mkdir($destinationPath, 0755,true);
                    }
                    $value['image']->move($destinationPath, $imageName);
                    $imagePath = env('APP_URL').'public/EmpatyNotes/'.$imageName;
                    chmod($destinationPath, 0777);
                    $requestData['Stakeholders'][$key]['FileType'][] = array('FileId' => 2,'FilePath' => $imagePath);
                }
                if(isset($value['audio']) && $value['audio']!=""){
                    $audioName = uniqid().'-'.$value['audio']->getClientOriginalName();
                    $dirname   = "EmpatyNotes";
                    $destinationPath = public_path('/'.$dirname);
                    if(! is_dir($destinationPath)){
                        mkdir($destinationPath, 0755,true);
                    }
                    $value['audio']->move($destinationPath, $audioName);
                    $audioPath = env('APP_URL').'public/EmpatyNotes/'.$audioName;
                    chmod($destinationPath, 0777);
                     $requestData['Stakeholders'][$key]['FileType'][] = array('FileId' => 3,'FilePath' => $audioPath);
                }
                unset($requestData['Stakeholders'][$key]['video'],$requestData['Stakeholders'][$key]['audio'],$requestData['Stakeholders'][$key]['image']);
            }
            $params_array = [
                $userId,
                json_encode($requestData)
            ];
            $data = DB::select(' EXEC uspSaveEmpathyNotes ?,?', $params_array);
            
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
        Date   : 08/07/2020
        Name   : getEmpathyNotes
        Params : 
        Type   : GET
        Purpose: To get empathy notes
    */
    public function getEmpathyNotes( Request $request, $projectId, $projectVersionId, $epicId, $epicVersionId, $stakeHolderId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $projectVersionId,
                $epicId,
                $epicVersionId,
                $stakeHolderId
            ];
            //echo "<pre>";print_r($params_array);echo "<br>";die;
            $data = DB::select(' EXEC uspGetEmpathyNotes ?,?,?,?,?', $params_array );
            //echo "<pre>";print_r($data);echo "<br>";die;
            $data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $data_array['Stakeholders'][$value->StakeholderId]['StakeholderId'] = $value->StakeholderId;
                    $data_array['Stakeholders'][$value->StakeholderId]['Sections'][$value->InterviewDetailsId]['SectionId'] = $value->InterviewDetailsId;
                    $data_array['Stakeholders'][$value->StakeholderId]['Sections'][$value->InterviewDetailsId]['SectionCategoryId'] = $value->CategoryLookupId;
                    $data_array['Stakeholders'][$value->StakeholderId]['Sections'][$value->InterviewDetailsId]['SectionCategoryTitle'] = $value->CategoryLookupTitle;
                    $data_array['Stakeholders'][$value->StakeholderId]['Sections'][$value->InterviewDetailsId]['SectionDescription'] = $value->InterviewText;

                    $data_array['Stakeholders'][$value->StakeholderId]['FileType'][] = array('FileId'=>$value->FileCategoryLookupId,'FilePath'=>$value->FilePath);
                    
                }
                $data_array['Stakeholders'] = array_values($data_array['Stakeholders']);
                foreach ($data_array['Stakeholders'] as $k => $v) {
                    if(isset($v['Sections'])){
                        $data_array['Stakeholders'][$k]['Sections'] = array_values($v['Sections']);
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
        Date   : 08/07/2020
        Name   : getEmpathyNotesAllCategory
        Params : 
        Type   : GET
        Purpose: To get all empathy notes category
    */
    public function getEmpathyNotesAllCategory( Request $request){
        try{
            $userId = $this->user_data['UserID'];
            
            $data = DB::select(' EXEC uspGetEmpathyNotesAllCategory ' );
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
        Date   : 08/07/2020
        Name   : getEmpathyNotesStakeHolders
        Params : 
        Type   : GET
        Purpose: To get empathy notes stakeholders
    */
    public function getEmpathyNotesStakeHolders( Request $request, $projectId, $projectVersionId, $epicId, $epicVersionId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $projectVersionId,
                $epicId,
                $epicVersionId
            ];
            
            $data = DB::select(' EXEC uspGetEmpathyNotesforAllStakeholder ?,?,?,?', $params_array );
            //echo "<pre>";print_r($data);echo "<br>";die;
            $data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $data_array['Stakeholders'][$value->StakeholderId]['InterviewDetailsId'] = $value->InterviewDetailsId;
                     $data_array['Stakeholders'][$value->StakeholderId]['InterviewDate'] = $value->InterviewDate;
                    $data_array['Stakeholders'][$value->StakeholderId]['StakeholderId'] = $value->StakeholderId;
                    $data_array['Stakeholders'][$value->StakeholderId]['StakeHolderName'] = $value->StakeHolderName;
                    $data_array['Stakeholders'][$value->StakeholderId]['StakeHolderType'] = $value->StakeHolderType;
                    $data_array['Stakeholders'][$value->StakeholderId]['FileType'][] = array('FileId'=>$value->FileId,'FilePath'=>$value->FilePath);
                }
                $data_array['Stakeholders'] = array_values($data_array['Stakeholders']);
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
        Name   : deleteAllEmpathyNotes
        Params : @ProjectId, @ProjectVersionId, @EpicId, @EpicVersionId, @StakeholderId
        Type   : GET
        Purpose: To all delete empathy notes
    */
    public function deleteAllEmpathyNotes( Request $request, $projectId, $projectVersionId, $epicId, $epicVersionId, $stakeholderId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $projectVersionId,
                $epicId,
                $epicVersionId,
                $stakeholderId,
                $userId
            ];
            
            $data = DB::select(' EXEC uspDeleteAllEmpathyNotes ?,?,?,?,?,?', $params_array );
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
        Date   : 20/07/2020
        Name   : deleteIndividualEmpathyNotes
        Params : @ProjectId, @ProjectVersionId, @EpicId, @EpicVersionId, @InterviewDetailsId
        Type   : GET
        Purpose: To delete individual empathy notes
    */
    public function deleteIndividualEmpathyNotes( Request $request, $projectId, $projectVersionId, $epicId, $epicVersionId, $interviewDetailsId ){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = [
                $projectId,
                $projectVersionId,
                $epicId,
                $epicVersionId,
                $interviewDetailsId,
                $userId
            ];
            
            $data = DB::select(' EXEC uspDeleteEmpathyNotes ?,?,?,?,?,?', $params_array );
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
