<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;

class UserProfileController extends BaseController
{
    public $user_data = [];
    public $payload = [];
    public $dbUserName = "";
    public $dbUserPassword = "";
     /**
     * Instantiate a new GoalSettingController instance.
     */
    public function __construct(){
        $this->payload = JWTAuth::parseToken()->getPayload(); 
        $this->dbUserName = $this->payload->get('DbUserName');
        $this->dbUserPassword = $this->payload->get('DbUserPassword');
        if($this->dbUserName != '' && $this->dbUserName != null){
            config(['database.connections.sqlsrv.username' => $this->dbUserName]);
            config(['database.connections.sqlsrv.password' => $this->dbUserPassword]);
        }
	
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
        Date   : 21/10/2019
        Name   : getPasswordQuestion
        Params : None
        Type   : GET
        Purpose: To add security question
    */ 
    public function getPasswordQuestion(){
        try{
            $data = DB::select(' EXEC Amplo.uspGetPasswordQuestion');
                if(count($data) > 0){
                    $message = "password question data retrieved.";
                }else{
                    $message = "No data found";
                }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Amit
        Date   : 22/10/2019
        Name   : addSecurityQuestionAnswer
        Params : None
        Type   : POST
        Purpose: To add security question
    */ 
    public function addSecurityQuestionAnswer(Request $request){
    	try{
    		$userId = $this->user_data['UserID'];
    		$request = $request->all();
    		foreach($request as $value){
	            $validator = Validator::make($value, [
	                'QuestionID' => 'required|numeric',
	                'answer' => 'required|max:512',
	            ]);
            
	            if ($validator->fails()) {
	                return $this->sendError('Validation Errors',$validator->errors());
	            }
	            $data = DB::statement(' EXEC Amplo.uspAddSecurityQuestion ?,?,?',array($userId,$value['QuestionID'],$value['answer']));
        	}
            return $this->sendResponse($data, 'data added');
    	}catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

     /*
        Author : Amit
        Date   : 21/10/2019
        Name   : getEnterpriseUserProfileDetails
        Params : None
        Type   : GET
        Purpose: To fetch enterprise user details
    */ 
    public function getEnterpriseUserProfileDetails(){
        try{
        	$userId = $this->user_data['UserID'];
            $data = DB::select(' EXEC Amplo.uspGetEnterpriseUserProfileDetails ?',array($userId));
                if($data){
                	$data = $data[0];
                    $message = "user retrieved.";
                }else{
                	$data = (Object)[];
                    $message = "No user found";
                }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

     /*
        Author : Amit
        Date   : 23/10/2019
        Name   : updateEnterpriseUserProfileDetails
        Params : None
        Type   : POST
        Purpose: update user profile
    */ 
        public function updateProfileDetails(Request $request){
            $userId = $this->user_data['UserID'];
            try{
                $validator = Validator::make($request->all(), [
                    'FirstName' => 'required|max:100',
                    'MiddleName' => 'max:50',
                    'LastName' => 'required|max:100',
                    'PhoneNumber' => 'required|numeric|digits_between:8,15',
                    'ProfilePhoto' => 'mimes:jpeg,jpg,png,gif',
                ]);
            
                if ($validator->fails()) {
                    return $this->sendError('Validation Errors',$validator->errors());
                }

                $img_name = NULL;
                if ($request->hasFile('ProfilePhoto')) {
                    $image = $request->file('ProfilePhoto');
                    $img_name = time().'.'.$image->getClientOriginalExtension();
                    $destinationPath = public_path('/images');
                    $image->move($destinationPath, $img_name);
                }else{
                    if($request->deletePhoto == false){
                         $details = DB::select(' EXEC Amplo.uspGetEnterpriseUserProfileDetails ?',array($userId));
                         $img_name = $details[0]->ProfilePhotoPath;
                     }
                }
                $data = DB::statement(' EXEC Amplo.uspUpdateEnterpriseUserProfileDetails ?,?,?,?,?,?,?,?',array($userId,$request->FirstName,$request->MiddleName,$request->LastName,$request->PhoneNumber,$img_name,$request->ClientBusinessUnit,$request->ClientParentCompany));
                return $this->sendResponse($data, 'profile updated');
            }catch(\Exception $e){
                return $this->sendError($e->getMessage());
            }

        }


        public function changePassword(Request $request){
            $userId = $this->user_data['UserID'];
            try{

                $validator = Validator::make($request->all(), [
                    'old_password' => 'required',
                    'password' => 'min:6|required_with:confirm_password|same:confirm_password',
                    'confirm_password' => 'min:6'
                ]);
                if ($validator->fails()) {
                    return $this->sendError('Validation Errors',$validator->errors());
                }
                /*$userData = DB::table('Amplo.User')->where(['UserID' => $userId])->first()->toArray();
                    if($userData['UserPassword'] != md5($request->old_password)){
                        $message = 'Old password not matched';
                    }

                    if($userData['UserPassword'] != md5($request->password)){
                        $message = 'password can not be same';
                    }*/
                 $new_password = md5($request->password);  
                 $clientUpdateData = [
                    'UserPassword' => $new_password
                ];
                 $data = DB::table('Amplo.User')->where('UserID', $userId)->update($clientUpdateData); 
                 return $this->sendResponse($data, 'profile updated');
            }catch(\Exception $e){
                return $this->sendError($e->getMessage());
            }

        }

        public function gettingStartedVideos(Request $request)
        {
            $userId = $this->user_data['UserID'];
            try{            
                $data = DB::select(' EXEC Amplo.uspGetGettingStartedVideos ?',array($userId));
                    if(count($data) > 0){
                        $message = "videos retrieved.";
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
            Author : Prabir
            Date   : 02/01/2020
            Name   : approveClient
            Params : None
            Type   : GET
            Purpose: To add security question
        */ 
        public function approveClient(){
            try{
                $data = DB::select(' EXEC Amplo.uspPhaseApprovedClient');
                    if(count($data) > 0){
                        $message = "Client retrieved.";
                    }else{
                        $message = "No data found";
                    }
                return $this->sendResponse($data, $message);
            }catch(\Exception $e){
                return $this->sendError($e->getMessage());
            }
        }
    /*
        Author : Abdul
        Date   : 11/06/2020
        Name   : saveUserActivity
        Params : 
        Type   : POST
        Purpose: To save user login and logout activity
    */
    public function saveUserActivity(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'ActivityDate' => "date_format:Y-m-d H:i:s",
                'TimeZone'     => "required|string",
                'Activity'     => "required|string",
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $this->user_data['ClientID'],
                $this->user_data['UserID'],
                $request['ActivityDate'],
                $request['TimeZone'],
                $request['Activity'],
                $request->bearerToken(),
                $request->ip(),
            );
            $data = DB::select('EXEC Amplo.uspSaveUserActivity ?,?,?,?,?,?,?',$param_array);
            if(is_array($data) && count($data) > 0){
                if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                    $message = $data[0]->MessageName;
                    unset($data[0]->MessageName,$data[0]->Success);
                    return $this->sendResponse($data, $message);
                }else if(isset($data[0]->Success) && ($data[0]->Success == false || $data[0]->Success ===0)){
                    $message =$data[0]->MessageName; 
                    return $this->sendError($message);
                }
            }
            else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendResponse($data,$message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendResponse($data,$message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 11/06/2020
        Name   : getLastUserActivity
        Params : 
        Type   : GET
        Purpose: To Get user last activity
    */
    public function getLastUserActivity(Request $request, $activity){
        try{
            $validator = Validator::make(['activity'=>$activity], [
                'activity' => "required|string"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $this->user_data['ClientID'],
                $this->user_data['UserID'],
                $activity
            );
            $data = DB::select('EXEC Amplo.uspGetLastUserActivity ?,?,?',$param_array);
           
            if(is_array($data) && count($data) > 0){
                $message = "Activity retrieved successfully.";
                return $this->sendResponse($data, $message);
            }
            else{
                $message = "No record found.";
                return $this->sendResponse($data,$message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 03/09/2020
        Name   : getUserRegistrationDetails
        Params : 
        Type   : GET
        Purpose: To Get User Registration Details
    */
    public function getUserRegistrationDetails (Request $request){
        try{
            $param_array = array(
                $this->user_data['UserID']
            );
            $data = DB::select(' EXEC Amplo.uspGetUserDetail ?',$param_array);
            if(count($data) > 0) {
                $message = "Data retrieved successfully.";   
            }else{
                $message = "No record found.";   
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
           return $this->sendError($e->getMessage());
        }

    }
    
    public function getClientProfile(){
        try{
            $id = $this->user_data['UserID'];
            $data = DB::select(' EXEC uspGetUserProfile ?',[$id]);
            //print_r($data);
            $record = array();
                if(count($data) > 0){
                    foreach($data as $k => $value){
                        //$record['ProjectName'] = $value->BenchmarkProjectName;
                       // $record['ProjectId'] = $value->BenchmarkProjectID;
                        $record['EntrepreneurName'] = $value->EntrepreneurName;
                        $record['PhoneNo'] = $value->PhoneNumber;
                        $record['EmailId'] = $value->EmailAddress;
                        $record['CompanyName'] = $value->ClientParentCompany;
                        $record['Location'] = $value->City;
                        $record['ERPSystem'] = $value->ErpName;
                        $record['Industry'] = $value->IndustryName;
                        $record['PayrollEmployee'] = $value->PayrollEmployees;
                        $record['SubContractedEmployee'] = $value->SubcontarctedEmployees;
                        
                    }
                    $message = "client details retrieved.";
                }else{
                    $record = (Object)[];
                    $message = "No data found";
                }
            return $this->sendResponse($record, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 
         
}
