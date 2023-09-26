<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use App\Client;
use config;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Illuminate\Support\Facades\Log;
use Validator;
use Mail;
use Redirect;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\Api\ApproveController;
use App\Models\Common;
class UserController extends BaseController
{
    public $user_data = [];

    public function __construct()
    {
		// config(['database.connections.sqlsrv.database' => env('DB_DATABASE')]);
    }
    public function infoCheck(Request $request){
        echo phpinfo();die;
    }
    public function checkLogin(Request $request)
    {

        try {
            $responseData;

            $successResponseData['status'] = 'Success';
            $successResponseData['message'] = '';
            $successResponseData['data'] = null;
            $successResponseData['MessageCode'] = 200;

            $errorResponseData['status'] = 'Error';
            $errorResponseData['message'] = '';
            $errorResponseData['data'] = null;
            $errorResponseData['MessageCode'] = 400;

            $requestData = $request->all();

            $validator = Validator::make($requestData, [
                'uname' => 'required|email'
            ]);
            if ($validator->fails()) {
                $errorResponseData['message'] = 'Invalid data';
                $errorResponseData['data'] = $validator->errors();
                $responseData = $errorResponseData;

                return response()->json($responseData, 400);
            }
           
            $userData = User::where(['EmailAddress' => $requestData['uname'] ])->first();
            
            if ($userData) {
                
                if( $userData->EmailValidationStatus==0 ){
                    $errorResponseData['message'] = 'Your account is not verified. You need to verified your account in order to login.';
                    $responseData = $errorResponseData;
                }
                else{
                   
                    if($userData->ClientID != '' && $userData->ClientID != null)
                    {
                        $client = Client::where('ClientId', $userData->ClientID)->get()->first();
                        $token = JWTAuth::customClaims(['DbUserName'=>$client->DbUserName, 'DbUserPassword'=>$client->DbUserPassword])->fromUser($userData);
                    }else{
                        $token = JWTAuth::customClaims(['DbUserName'=>env('DB_USERNAME'), 'DbUserPassword'=>env('DB_PASSWORD')])->fromUser($userData);
                    }
                    
                    $moduleData = DB::select(' EXEC Amplo.uspGetSubscribedModules ?',array($userData['UserID']));
                    $common_model   = new Common();
                    $moduleEncrypted = $common_model->cryptoJsAesEncrypt('modulePhrase', json_encode($moduleData) );
                    ;
                    if($userData->UserTypeID == 1){
                        $userRole = 'Super User';
                    }elseif($userData->UserTypeID == 2){
                        $userRole = 'Normal User';
                    }elseif($userData->UserTypeID == 3){
                        $userRole = 'Amplo_LEAD';
                    }elseif($userData->UserTypeID == 4){
                        $userRole = 'Amplo_SYSADMIN';
                    }elseif($userData->UserTypeID == 5){
                        $userRole = 'Amplo_CONSULTANT';
                    }elseif($userData->UserTypeID == 6){
                        $userRole = 'Amplo_BACKEND_USR';
                    }
                    $successResponseData['message'] = 'logged in';
                    $successResponseData['data']['token'] = $token;
                    if($userData->ClientID != '')
                    {
                        $successResponseData['data']['Employee'] = false;
                    }else{
                        $successResponseData['data']['Employee'] = true;
                    }
                    $successResponseData['data']['UserName'] = $userData['UserName'];
                    $successResponseData['data']['FirstName'] = $userData['FirstName'];
                    $successResponseData['data']['LastName'] = $userData['LastName'];
                    $successResponseData['data']['EmailAddress'] = $userData['EmailAddress'];
                    $successResponseData['data']['PhoneNumber'] = $userData['PhoneNumber'];
                    $successResponseData['data']['UserTypeID'] = $userData['UserTypeID'];
                    $successResponseData['data']['UserRole'] = $userRole;
                    $successResponseData['data']['ModuleEncrypted'] = $moduleEncrypted;

                    $responseData = $successResponseData;
                }
            } else {
                $errorResponseData['message'] = 'This email is not available in our database';
                $responseData = $errorResponseData;
            }
            return response()->json($responseData, $responseData['MessageCode']);

        } catch (\Exception $e) {
            die("error:" . $e);
        }
    }
    public function post_upload_file( Request $request ){
       
        try{
            $validator = Validator::make($request->all(), [
                'files'   => 'required',
                'files.*' => 'mimes:doc,docx,xls,txt,csv'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $files           = $request->file('files');
           
            $uploadcount = 0;
            foreach($files as $file) {
                
                //$file_name      = microtime().'.'.$file->getClientOriginalExtension();
                $file_name      = $file->getClientOriginalName();
                $dirname        = $request['module'];
                $destinationPath= public_path('/'.$dirname);
                
                if(! is_dir($destinationPath)){
                   mkdir($destinationPath, 0777);
                }
                $file->move($destinationPath, $file_name);

                $uploadcount ++;
            }
            
            if( $uploadcount ){
                $message = "file upload successfully";
                $data    = array("message"=>$message);
            }else{
                $message = "file not uploaded successfully";
                $data    = array("message"=>$message);
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
       
    }
    
    public function registerUser(Request $request)
    {

        try {
            $responseData;
            $successResponseData['status'] = 'Success';
            $successResponseData['message'] = '';
            $successResponseData['data'] = null;
            $successResponseData['MessageCode'] = 200;

            $errorResponseData['status'] = 'Error';
            $errorResponseData['message'] = '';
            $errorResponseData['data'] = null;
            $errorResponseData['MessageCode'] = 400;

            $requestData = $request->all();
           //echo "<pre>";print_r($requestData);echo "<br>";die;
            $validator = Validator::make($requestData, [
                'email1' => 'required|email',
                'organisation' => 'required|string',
                'organisationrevenue' => 'required|integer',
                'Industry' => 'required|integer',
                'division' => 'required|string',
                'ph2' => 'required|integer',
                'ph' => 'required|integer',
                'fn' => 'required|string',
                'ln' => 'required|string',
                'password' => 'required|string',

            ]);
            if ($validator->fails()) {
                $errorResponseData['message'] = 'Invalid data';
                $errorResponseData['data'] = $validator->errors();
                $responseData = $errorResponseData;

                return response()->json($responseData, 400);
            }

            $clientData = DB::table('Amplo.Client')->where(['EmailAddress' => $requestData['email1']])->first();
            $userData = DB::table('Amplo.User')->where(['EmailAddress' => $requestData['email1']])->first();
            
            if ($userData || $clientData) {
                $errorResponseData['message'] = 'This User already Exists. Please try to Login Instead';
                return response()->json($errorResponseData, 400);
            }

            $requestData['password'] = md5($requestData['password']);
            $phoneNumber = $requestData['ph'] . $requestData['ph2']; // concateing country code and phone number
            if(isset($requestData['ClientId'])){
                $clientId = $requestData['ClientId'];
            }else{
                $clientId = "";
                $divaTeam = DB::table('Amplo.UserDIVATeam')->where(['Email' => $requestData['email1']])->first();
                if ($divaTeam) {
                    $errorResponseData['message'] = 'This User already Exists. Please try to Login Instead';
                    return response()->json($errorResponseData, 400);
                }
            }
            /*if($clientId != "") {
                $clientUpdateData = [
                    'ClientName' => $requestData['organisation'],
                    'ClientBusinessUnit' => $requestData['division'],
                    'ClientParentCompany' => $requestData['parentcompany'] ? $requestData['parentcompany'] : '',
                    'IndustryID' => $requestData['Industry'],
                    'ClientRevenueRangeID' => $requestData['organisationrevenue'],
                    'PhoneNumber' => $phoneNumber,
                    'EmailAddress' => $requestData['email1']
                ];
                DB::table('Amplo.Client')->where('ClientId', $clientId)->update($clientUpdateData);                
            }*/
            if($clientId == "") {
                $clientInsertData = [
                    'ClientName' => $requestData['organisation'],
                    'ClientBusinessUnit' => $requestData['division'],
                    'ClientParentCompany' => $requestData['parentcompany'] ? $requestData['parentcompany'] : '',
                    'IndustryID' => $requestData['Industry'],
                    'ClientRevenueRangeID' => $requestData['organisationrevenue'],
                    'PhoneNumber' => $phoneNumber,
                    //'UserStatusID'=>2, //constant value provided for status
                    'ActiveFlag' => 0, //when registering active flag has to be zero.
                    'EmailAddress' => $requestData['email1'],
                    'ClientCreatedDate' => date('Y-m-d H:i:s'),

                ];
                $clientId = DB::table('Amplo.Client')->insertGetId($clientInsertData);
            }
            

            if ($clientId != "") {
                $userInsertData = [
                    'UserName' => $requestData['email1'],
                    'FirstName' => $requestData['fn'],
                    'MiddleName' => $requestData['mn'] ? $requestData['mn'] : '',
                    'LastName' => $requestData['ln'],
                    'PhoneNumber' => $phoneNumber,
                    'EmailAddress' => $requestData['email1'],
                    'UserPassword' => $requestData['password'],
                    'UserCreatedDate' => date('Y-m-d H:i:s'),
                    'ClientID' => $clientId,
                    'UserTypeID' => $requestData['UserTypeId'],
                    'ActiveFlag' => 1,
                    "EmailValidationStatus"=>1,
					"UserStatusId"=>1
                ];
                $lastUserId = DB::table('Amplo.User')->insertGetId($userInsertData);

                if ($lastUserId != "") {
                    $email_token =  str_random(30);
                    $emailVerifyData= array(
                        "UserID" => $lastUserId,
                        "UserName" => $requestData['email1'],
                        "VerificationHashCode" => $email_token,
                        "VerificationHashCodeDate" => date("Y-m-d H:i:s"),
                        "VerificationFlag" => 0,
                        "ActiveFlag" => 1,
                        "UserIPAddress" => \Request::ip()
                    );
                    $emailData= DB::table('Amplo.EmailVerification')->insert($emailVerifyData);
                
                    if($emailData){
                        $teamData = DB::table('Amplo.USERDIVATEAM')->where(['Email' => $requestData['email1'],'ClientID'=>$clientId])->first();
                        if($teamData){
                            $team_array = array(
                                'FirstName'=>$requestData['fn'],
                                'LastName'=>$requestData['ln'],
                                'UserStatusID'=>10
                            );
                            DB::table('Amplo.USERDIVATEAM')->where('UserDIVATeamID', $teamData->UserDIVATeamID)->update($team_array);
                        }
                        $data['to'] = $requestData['email1'];
                        $data['first_name']= $requestData['fn'];
                        $data['last_name'] = $requestData['ln'];
                        $data['title'] = 'Email Verification!';
                        $data['subject']   = 'AmploFly 4.0 Registration';
                        $data['template']  = 'email.emailVerification';
                        $data['link'] = url('/api/verifyUserEmail?security='.$email_token);
                        
                        $mail = new EmailController;
                        $mail_response = $mail->sendVerificationEmailUser($data);
                        if( $mail_response ==1){
                            $message = "Registration Successfull. Please check your mail.";
                        }else{
                            $message = "Registration Successfull.But email does not sent.";
                        }
                    }
                    else{
                        $message = "Registration Successfull.But email does not sent.";
                    }
                    $successResponseData['message'] =  $message;
                    $responseData = $successResponseData;
                } else {
                    $errorResponseData['message'] = 'Sorry Registration Failed. Please try again';
                    $responseData = $errorResponseData;
                }
            } else {
                $errorResponseData['message'] = 'Sorry Registration Failed. Please try again';
                $responseData = $errorResponseData;
            }
            return response()->json($responseData, $responseData['MessageCode']);
        } catch (\Exception $e) {
            die("error:" . $e);
        }

    }
    public function loginUser(Request $request)
    {

        try {
            $responseData;

            $successResponseData['status'] = 'Success';
            $successResponseData['message'] = '';
            $successResponseData['data'] = null;
            $successResponseData['MessageCode'] = 200;

            $errorResponseData['status'] = 'Error';
            $errorResponseData['message'] = '';
            $errorResponseData['data'] = null;
            $errorResponseData['MessageCode'] = 400;

            $requestData = $request->all();

            $validator = Validator::make($requestData, [
                'uname' => 'required|email',
                'psw' => 'required|string',
            ]);
            if ($validator->fails()) {
                $errorResponseData['message'] = 'Invalid data';
                $errorResponseData['data'] = $validator->errors();
                $responseData = $errorResponseData;

                return response()->json($responseData, 400);
            }
            //$userData = User::where(['EmailAddress' => $requestData['uname'],'UserPassword' => md5($requestData['psw'])])->select('UserID')->first();
            //echo DB::connection()->getDatabaseName();
            $userData = User::where(['EmailAddress' => $requestData['uname'] ])->first();
            //print_r($userData);die;
            //echo DB::connection()->getDatabaseName();
            if ($userData) {
                if( $userData->UserPassword!=md5($requestData['psw']) ){

                    $errorResponseData['message'] = 'This password is not associated with this email.';
                    $responseData = $errorResponseData;
                }
                else if( $userData->EmailValidationStatus==0 ){
                    $errorResponseData['message'] = 'Your account is not verified. You need to verified your account in order to login.';
                    $responseData = $errorResponseData;
                }
                else{
                    //print_r($userData);
                    if($userData->ClientID != '' && $userData->ClientID != null)
                    {
                        $client = Client::where('ClientId', $userData->ClientID)->get()->first();
                        $token = JWTAuth::customClaims(['DbUserName'=>$client->DbUserName, 'DbUserPassword'=>$client->DbUserPassword])->fromUser($userData);
                    }else{
                        $token = JWTAuth::customClaims(['DbUserName'=>env('DB_USERNAME'), 'DbUserPassword'=>env('DB_PASSWORD')])->fromUser($userData);
                    }
                    //$token = JWTAuth::fromUser($userData);
                   
                    //$moduleData = DB::select(' EXEC Amplo.uspGetPermission ?',array($userData['UserID']));
                    $moduleData = DB::select(' EXEC Amplo.uspGetSubscribedModules ?',array($userData['UserID']));
                    $common_model   = new Common();
                    $moduleEncrypted = $common_model->cryptoJsAesEncrypt('modulePhrase', json_encode($moduleData) );
                    //$decrypted = $common_model->cryptoJsAesDecrypt('modulePhrase', $encrypted );
                    //echo "<pre>";print_r($moduleEncrypted);echo "<br>";
                    //echo "<pre>";print_r($decrypted);echo "<br>";
                    //die;
                    if($userData->UserTypeID == 1){
                        $userRole = 'Super User';
                    }elseif($userData->UserTypeID == 2){
                        $userRole = 'Normal User';
                    }elseif($userData->UserTypeID == 3){
                        $userRole = 'Amplo_LEAD';
                    }elseif($userData->UserTypeID == 4){
                        $userRole = 'Amplo_SYSADMIN';
                    }elseif($userData->UserTypeID == 5){
                        $userRole = 'Amplo_CONSULTANT';
                    }elseif($userData->UserTypeID == 6){
                        $userRole = 'Amplo_BACKEND_USR';
                    }
                    $successResponseData['message'] = 'logged in';
                    $successResponseData['data']['token'] = $token;
                    if($userData->ClientID != '')
                    {
                        $successResponseData['data']['Employee'] = false;
                    }else{
                        $successResponseData['data']['Employee'] = true;
                    }
                    $successResponseData['data']['UserName'] = $userData['UserName'];
                    $successResponseData['data']['FirstName'] = $userData['FirstName'];
                    $successResponseData['data']['LastName'] = $userData['LastName'];
                    $successResponseData['data']['EmailAddress'] = $userData['EmailAddress'];
                    $successResponseData['data']['PhoneNumber'] = $userData['PhoneNumber'];
                    $successResponseData['data']['UserTypeID'] = $userData['UserTypeID'];
                    $successResponseData['data']['UserRole'] = $userRole;
                    $successResponseData['data']['ModuleEncrypted'] = $moduleEncrypted;

                    $responseData = $successResponseData;
                }
            } else {
                $errorResponseData['message'] = 'This email is not available in our database';
                $responseData = $errorResponseData;
            }
            return response()->json($responseData, $responseData['MessageCode']);

        } catch (\Exception $e) {
            die("error:" . $e);
        }
    }
    public function fetchIndustryCollection(Request $request)
    {

        try {
            $responseData;

            $successResponseData['status'] = 'Success';
            $successResponseData['message'] = '';
            $successResponseData['data'] = null;
            $successResponseData['MessageCode'] = 200;

            $errorResponseData['status'] = 'Error';
            $errorResponseData['message'] = '';
            $errorResponseData['data'] = null;
            $errorResponseData['MessageCode'] = 400;

            $requestData = $request->all();
            $resp = DB::table('Amplo.Industry')->select(['IndustryName', 'IndustryID'])->get();
            $resp = json_decode(json_encode($resp), true);
            $newResp = [];
            foreach ($resp as $arr) {
                array_push($newResp, ['ID' => $arr['IndustryID'], 'valueToShow' => $arr['IndustryName']]);
            }
            $successResponseData['data'] = $newResp;
            $responseData = $successResponseData;

            return response()->json($responseData, $responseData['MessageCode']);

        } catch (\Exception $e) {
            die("error:" . $e);
        }
    }
    public function fetchRevnueCollection(Request $request)
    {

        try {
            $responseData;

            $successResponseData['status'] = 'Success';
            $successResponseData['message'] = '';
            $successResponseData['data'] = null;
            $successResponseData['MessageCode'] = 200;

            $errorResponseData['status'] = 'Error';
            $errorResponseData['message'] = '';
            $errorResponseData['data'] = null;
            $errorResponseData['MessageCode'] = 400;

            $requestData = $request->all();
            $resp = DB::table('Amplo.ClientRevenueRange')
                ->select(['ClientRevenueRangeID', 'ClientRevenueRangeName'])->get();

            $resp = json_decode(json_encode($resp), true);
            $newResp = [];
            foreach ($resp as $arr) {
                array_push($newResp,
                    ['ID' => $arr['ClientRevenueRangeID'], 'valueToShow' => $arr['ClientRevenueRangeName']]);
            }
            $successResponseData['data'] = $newResp;
            $responseData = $successResponseData;

            return response()->json($responseData, $responseData['MessageCode']);

        } catch (\Exception $e) {
            die("error:" . $e);
        }
    }
    public function fetchRestrictedDomain(Request $request)
    {

        try {
            $responseData;

            $successResponseData['status'] = 'Success';
            $successResponseData['message'] = '';
            $successResponseData['data'] = null;
            $successResponseData['MessageCode'] = 200;

            $errorResponseData['status'] = 'Error';
            $errorResponseData['message'] = '';
            $errorResponseData['data'] = null;
            $errorResponseData['MessageCode'] = 400;

            $requestData = $request->all();
            $resp = DB::select(' EXEC Amplo.uspGetRestrictedEmailDomain');

            $newResp = [];
            foreach ($resp as $value) {
                array_push($newResp, $value->EmailDomainName);

            }
            $successResponseData['data'] = $newResp;
            $responseData = $successResponseData;

            return response()->json($responseData, $responseData['MessageCode']);

        } catch (\Exception $e) {
            die("error:" . $e);
        }
    }

    public function uspVerifyUserEmail(Request $request){
        $verificationHashCode = $request['security'];
        $emailVerifyData = DB::select(' EXEC Amplo.uspVerifyUserEmail ? ',array($verificationHashCode) );
       
        
        if($emailVerifyData[0]->MessageName == "Email Verification NOT Successful." ||  $emailVerifyData[0]->MessageName =="Error in verification"){
            return Redirect::to( env('CLIENT_SITE_URL').'login/error' );

        }else{
            //Succesfully Verified

            $EmailVerificationData =DB::table('Amplo.EmailVerification')->join('Amplo.User','Amplo.User.UserID','=','Amplo.EmailVerification.UserID')->where(['VerificationHashCode' => $verificationHashCode ])->first();
            if($EmailVerificationData){

                    $data['to']        = $EmailVerificationData->EmailAddress;
                    $data['first_name']= $EmailVerificationData->FirstName;
                    $data['last_name'] = $EmailVerificationData->LastName;
                    $data['title']     = 'Welcome Email';
                    $data['subject']   = 'Welcome email';
                    $data['template']  = 'email.emailAccessAccount';
                    $data['link']      =  env('CLIENT_SITE_URL');
                  
                    $mail = new EmailController;
                    $mail_response = $mail->sendVerificationEmailUser($data);
                    if( $mail_response == 1){  
                        $message = "Email Verification successful.";
                         return Redirect::to( env('CLIENT_SITE_URL').'login/success' );
                    }else{
                        
                        $message = "Email Verification successful.";
                         return Redirect::to( env('CLIENT_SITE_URL').'login/success' );
                    }
            }            
       }
    }    

    public function sendForgotPassword(Request $request){

        $responseData;

        $successResponseData['status'] = 'Success';
        $successResponseData['message'] = '';
        $successResponseData['data'] = null;
        $successResponseData['MessageCode'] = 200;

        $errorResponseData['status'] = 'Error';
        $errorResponseData['message'] = '';
        $errorResponseData['data'] = null;
        $errorResponseData['MessageCode'] = 400;

        try{    

            $requestData = $request->all();
            
            $validator = Validator::make($requestData, [
                'email' => 'required|email'
            ]);
            if ($validator->fails()) {
                $errorResponseData['message'] = 'Invalid data';
                $errorResponseData['data'] = $validator->errors();
                $responseData = $errorResponseData;

                return response()->json($responseData, 400);
            }
            $email = $requestData['email'];
            $userData = DB::select(' EXEC Amplo.uspGetIsUserExists ? ',array($email) );
            
            if( $userData[0]->iSUserExists==1 ){
                $userData = DB::table('Amplo.User')->where(['EmailAddress' => $requestData['email']])->first();

                $email_token =  str_random(30);
                $emailVerifyData = array(
                    "UserID"                    => $userData->UserID,
                    "UserName"                  => $userData->UserName,
                    "VerificationHashCode"      => $email_token,
                    "VerificationHashCodeDate"  => date("Y-m-d H:i:s"),
                    "VerificationFlag"          => 0,
                    "ActiveFlag"                => 1,
                    "UserIPAddress"             => \Request::ip()
                );
                
                $emailData= DB::table('Amplo.EmailVerification')->insert($emailVerifyData);

                $email_array['to']          = $userData->UserName;
                $email_array['first_name']  = $userData->FirstName;
                $email_array['middle_name'] = $userData->MiddleName;
                $email_array['last_name']   = $userData->LastName;
                $email_array['title']       = 'Reset Your Password';
                $email_array['subject']     = 'Reset Your Password';
                $email_array['template']    = 'email.emailResetPassword';
                $email_array['link']        = env('CLIENT_SITE_URL').'reset-password/'.$email_token;
               
                $mail = new EmailController;
                $mail_response = $mail->sendForgotPasswordEmail($email_array);

                if($mail_response==1){
                    $message = "An email has been sent to your email id that will guide you to the rest of password reset process";
                 }
                else{
                     $message = "Something went wrong, please try again";
                }
                $successResponseData['message'] =  $message;
                $responseData = $successResponseData;
            }else{
                $errorResponseData['message'] = 'No such email found in our database';
                $responseData = $errorResponseData;
            }
        }
        catch (\Exception $e) {
            $e->getMessage();
            $errorResponseData['message'] = $e->getMessage();
            $responseData = $errorResponseData;
        }  
        return response()->json($responseData, $responseData['MessageCode']);  
        
    }

    public function resetPassword(Request $request){
         try {
            $responseData;

            $successResponseData['status'] = 'Success';
            $successResponseData['message'] = '';
            $successResponseData['data'] = null;
            $successResponseData['MessageCode'] = 200;

            $errorResponseData['status'] = 'Error';
            $errorResponseData['message'] = '';
            $errorResponseData['data'] = null;
            $errorResponseData['MessageCode'] = 400;

            $requestData = $request->all();
          
            $validator = Validator::make($requestData, [
                'email_token' => 'required',
                'password' => 'min:8|required_with:confirm_password|same:confirm_password',
                'confirm_password' => 'min:8'

            ]);
            if ($validator->fails()) {
                $errorResponseData['message'] = 'Invalid data';
                $errorResponseData['data'] = $validator->errors();
                $responseData = $errorResponseData;

                return response()->json($responseData, 400);
            }
            $email_token = $request->input('email_token');
            
            $emailVerifyData = DB::select(' EXEC Amplo.uspVerifyUserEmail ? ',array($email_token) );

            if($emailVerifyData[0]->MessageName == "Error in verification"){
               
                $errorResponseData['message'] = 'Error in verification';
                return response()->json($errorResponseData, $errorResponseData['MessageCode']);
            }else{

                $EmailVerificationData =DB::table('Amplo.EmailVerification')->join('Amplo.User','Amplo.User.UserID','=','Amplo.EmailVerification.UserID')->where(['VerificationHashCode' => $email_token ])->first();
                

                $username = $EmailVerificationData->EmailAddress;
                $password = md5($request->input('password'));
                $resp = DB::statement(' EXEC Amplo.uspResetPassword ?,?',array($username,$password));
                if($resp){
                    $successResponseData['message'] = 'password reset';
                    return response()->json($successResponseData, $successResponseData['MessageCode']);
                }else{
                     $errorResponseData['message'] = 'problem occured';
                     return response()->json($errorResponseData, $errorResponseData['MessageCode']);
                }
            }
        } catch (\Exception $e) {
            $errorResponseData['message'] = $e->getMessage();
           return response()->json($errorResponseData, $errorResponseData['MessageCode']);
        }
    }

    /*
        Author : Prabir
        Date   : 31/10/2019
        Name   : getUserDetailFromEmail
        Params : None
        Type   : GET
        Purpose: get user profile
    */ 
    public function getUserDetailFromEmail (Request $request)
    {
        try {
            $responseData;

            $successResponseData['status'] = 'Success';
            $successResponseData['message'] = '';
            $successResponseData['data'] = null;
            $successResponseData['MessageCode'] = 200;

            $errorResponseData['status'] = 'Error';
            $errorResponseData['message'] = '';
            $errorResponseData['data'] = null;
            $errorResponseData['MessageCode'] = 400;

            $requestData = $request->all();
          
            $validator = Validator::make($requestData, [
                'hash' => 'required'

            ]);
            if ($validator->fails()) {
                $errorResponseData['message'] = 'Invalid data';
                $errorResponseData['data'] = $validator->errors();
                $responseData = $errorResponseData;

                return response()->json($responseData, 400);
            }
            $hash = $request['hash'];
            //$hash1 = Crypt::encryptString('sbs@gmail.com');
            $email = Crypt::decryptString($hash);
            $data = DB::select(' EXEC Amplo.uspGetUserDetailFromEmail  ?',array($email));
                if($data){
                    $data = $data[0];
                    $message = "user retrieved.";
                }else{
                    $data = (Object)[];
                    $message = "No user found";
                }
            return $this->sendResponse($data, $message);
            //return response()->json((Object)$data[0], $successResponseData['MessageCode']);  
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }

    }
    public function registerEmployee (Request $request){
        
        try{
           
            $requestData = $request->all();
            $validator = Validator::make($requestData, [
                'employee_email'    => 'required|email',
                'manager_email'     => 'required|email',
                'user_name'         => 'required|email',
                'password'          => 'min:8|required_with:confirm_password|same:confirm_password',
                'confirm_password'  => 'min:8',
                'user_type_id'      => 'required|numeric'
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $data = DB::select(' EXEC humanresources.uspAddAmploUser ?,?,?,?,?',array($requestData['employee_email'], $requestData['manager_email'], $requestData['user_name'], md5($requestData['password']), $requestData['user_type_id']));
            
            if( isset($data[0]->Success) && ($data[0]->Success == false || $data[0]->Success ==0)){    
                return $this->sendError($data[0]->MessageName,$data);
            }else if(isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ==1)){
                

                //$decodeData = json_decode($data[0], true);
                $email_token =  str_random(30);
                $email_array['to']                  = $data[0]->ManagerEmail;
                $email_array['employee_first_name'] = $data[0]->EmployeeFirstName;
                $email_array['employee_last_name']  = $data[0]->EmployeeLastName;
                $email_array['employee_email']      = $data[0]->EmployeeEmail;
                $email_array['employee_id']         = $data[0]->EmployeeId;
                $email_array['employee_type']       = $data[0]->UserTypeName;
                $email_array['manager_first_name']  = $data[0]->ManagerFirstName;
                $email_array['manager_last_name']   = $data[0]->ManagerLastName;
                $email_array['manager_email']       = $data[0]->ManagerEmail;
                $email_array['link']                = url('/api/verifyEmployeeEmail?security='.$email_token );

                $email_array['title']               = 'Verify Employee';
                $email_array['subject']             = 'Verify Employee';
                $email_array['template']            = 'email.emailEmployeeVerificationManager';

                $emailVerifyData= array(
                    "UserID" => $data[0]->UserId,
                    "UserName" => $data[0]->EmployeeEmail,
                    "VerificationHashCode" => $email_token,
                    "VerificationHashCodeDate" => date("Y-m-d H:i:s"),
                    "VerificationFlag" => 0,
                    "ActiveFlag" => 1,
                    "UserIPAddress" => \Request::ip()
                );
                $emailData= DB::table('Amplo.EmailVerification')->insert($emailVerifyData);
               
                $mail = new EmailController;
                $mail_response = $mail->sendEmailManager($email_array);
                if($mail_response==1){

                    $email_array_emp['to']          = $requestData['employee_email'];
                    $email_array_emp['title']       = 'Account Request';
                    $email_array_emp['subject']     = 'Account Request';
                    $email_array_emp['template']    = 'email.emailEmployeeRequest';

                    $mail_response_emp = $mail->sendRequestEmailToEmployee( $email_array_emp );

                    $message = $data[0]->MessageName;
                    return $this->sendResponse($message, $data);
                }
                else{
                    $message = $data[0]->MessageName;
                   return $this->sendResponse($message, $data);
                }
            }else{
                $message = "Stored Procedure not returning anything.";
                return $this->sendResponse($message, $data);
            }
           
        }catch(\Exception $e){
           return $this->sendError($e->getMessage());
        }
    }

    public function verifyEmployeeEmail(Request $request){
        $verificationHashCode = $request['security'];
        $emailVerifyData = DB::select(' EXEC Amplo.uspVerifyUserEmail ? ',array($verificationHashCode) );
        //print_r($emailVerifyData);
      
        if($emailVerifyData[0]->MessageName == "Email Verification NOT Successful."){
            return Redirect::to( env('CLIENT_SITE_URL').'login/error' );

        }else{
            //Succesfully Verified

            $EmailVerificationData =DB::table('Amplo.EmailVerification')->join('Amplo.User','Amplo.User.UserID','=','Amplo.EmailVerification.UserID')->where(['VerificationHashCode' => $verificationHashCode ])->first();
            if($EmailVerificationData){

                    $data['to']        = $EmailVerificationData->EmailAddress;
                    $data['first_name']= $EmailVerificationData->FirstName;
                    $data['last_name'] = $EmailVerificationData->LastName;
                    $data['title']     = 'Welcome Email';
                    $data['subject']   = 'Welcome email';
                    $data['template']  = 'email.emailAccessAccount';
                    $data['link']      =  env('CLIENT_SITE_URL');
                  
                    $mail = new EmailController;
                    $mail_response = $mail->sendVerificationEmailUser($data);
                    if( $mail_response == 1){  
                        $message = "Email Verification successful.";
                         return Redirect::to( env('CLIENT_SITE_URL').'login/success' );
                    }else{
                        
                        $message = "Email Verification successful.";
                         return Redirect::to( env('CLIENT_SITE_URL').'login/success' );
                    }
            }            
       }
    }

    public function getAccountType (Request $request){
        try{
            $data = DB::select(' EXEC Amplo.uspGetAccountType ');
            if(count($data) > 0) {
                $message = "Users account type retrieved.";   
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
        Date   : 30/12/2019
        Name   : getUserAccessType
        Params : 
        Type   : GET
        Purpose: To fetch user access type
    */
    public function getUserAccessType (Request $request){
        try{
            $data = DB::select(' EXEC Amplo.uspGetUserAccessTypes ');
            if(count($data) > 0) {
                $message = "Users access type retrieved.";   
            }else{
                $message = "No record found.";   
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
           return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 19/07/2021
        Name   : UpdateAmploQuestionBankFromInterface
        Params : @
        Type   : PATCH
        Purpose: 
    */
    public function UpdateAmploQuestionBankFromInterface(Request $request) {
        try{
            $this->user_data = JWTAuth::parseToken()->authenticate()->toArray(); 
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }catch(JWTException $e){
            return $this->sendError($e->getMessage(),401);
        }
        try{
            $QuestionBankId = $request->QuestionBankId;
            $BatchId = $request->BatchId;
            $clientId = $this->user_data['ClientID'];
            $params = array(
                $QuestionBankId,
                $BatchId,
                $clientId
            );
            $data = DB::select('EXEC Amplo.UpdateAmploQuestionBankFromInterface ?,?,?',$params);
            // print_r($data);die;
            if( count($data) > 0){
                $message = "Data retrieved successfully";
            }else{
                $message = "Error Occured, Please try again";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
        
}
