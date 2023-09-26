<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Mail;
use Redirect;
use App\Http\Controllers\EmailController;
use Illuminate\Support\Facades\Crypt;

class EnterpriseController extends BaseController
{
    public $user_data = [];
    public $payload = [];
    public $dbUserName = "";
    public $dbUserPassword = "";
     /**
     * Instantiate a new GoalSettingController instance.
     */
    public function __construct(){
        // $this->payload = JWTAuth::parseToken()->getPayload(); 
        // $this->dbUserName = $this->payload->get('DbUserName');
        // $this->dbUserPassword = $this->payload->get('DbUserPassword');

        // config(['database.connections.sqlsrv.username' => $this->dbUserName]);
        // config(['database.connections.sqlsrv.password' => $this->dbUserPassword]);
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
        Date   : 28/09/2019
        Name   : getEnterpriseUserType
        Params : None
        Type   : GET
        Purpose: To update BM Goal Setting
    */ 

     public function getEnterpriseUserType(Request $request){
     	try{
        	//$userId = $this->user_data['UserID'];
        	$data = DB::select(' EXEC Amplo.uspGetEnterpriseUserTypes');
          		if(count($data) > 0){
                    $message = "user data retrieved.";
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
        Author : Amit
        Date   : 28/09/2019
        Name   : getEnterpriseUserType
        Params : None
        Type   : GET
        Purpose: To update BM Goal Setting
    */ 

     public function uspGetEnterpriseDivaTeam(Request $request){
     	try{
        	$userId = $this->user_data['UserID'];
        	$data = DB::select(' EXEC Amplo.uspGetEntperpriseDIVATeam ?',array($userId));
          		if(count($data) > 0){
                    $message = "user data retrieved.";
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
        Author : Amit
        Date   : 28/09/2019
        Name   : uspAddEnterpriseDivaTeam
        Params : None
        Type   : POST
        Purpose: To add enterprise team
    */ 

     public function uspAddEnterpriseDivaTeam(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'first_name' => 'required|max:50|regex:/^[\pL\s\-]+$/u',
                'last_name' => 'required|max:50|regex:/^[\pL\s\-]+$/u',
                'user_type' => 'required|numeric'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $userId = $this->user_data['UserID'];
            
            $email = $request->input('email');
            $first_name = $request->input('first_name');
            $last_name = $request->input('last_name');
            $user_type = $request->input('user_type');
            $status = 8;
            $IP = \Request::ip();
            $encryptedEmail =Crypt::encryptString($email);
            
            $data = DB::select(' EXEC Amplo.uspAddEnterpriseDIVATeam ?,?,?,?,?,?,?',array($userId,$email,$first_name,$last_name,$user_type,$status,$IP));
            
            if(count($data) > 0){
                $data1 = DB::select(' EXEC Amplo.uspGetUserDetailFromEmail  ?',array($email));
                if(count($data1) > 0){
                    $organisation = $data1[0]->organisation;
                }else{
                    $organisation = "";
                }
                //send mail code
                $email_array['to']          = $email;
                $email_array['first_name']  = $first_name;
                $email_array['last_name']   = $last_name;
                $email_array['name']        = $this->user_data['FirstName'].' '.$this->user_data['MiddleName'].' '.$this->user_data['LastName'];
                $email_array['organisation'] = $organisation;
                $email_array['title']       = 'Welcome';
                $email_array['subject']     = 'Set Up Account';
                $email_array['template']    = 'email.emailWelcomeSetupAccount';
                $flag = 'user';
                $email_array['link']        =  env('CLIENT_SITE_URL').'registration-addon-user/'.$encryptedEmail.'?type='.$flag;
                
                $mail = new EmailController;
                $mail_response = $mail->sendWelcomeEmail($email_array);

                if($mail_response==1){
                    $status = $data[0];
                    $message = $data[0]->MessageName;
                }
                else{
                    $status = "error";
                    $message = $data[0]->MessageName;
                }
            }else{
                $status = 'error';
                //$data = (Object)[];
                $message = "An error occured";
            }
            return $this->sendResponse($status, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
     }
     /*
        Author : Amit
        Date   : 30/09/2019
        Name   : uspAddEnterpriseDivaTeam
        Params : None
        Type   : GET
        Purpose: To edit enterprise team
    */ 

     public function uspUpdateEnterpriseDivaTeam(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'user_team_id' => 'required|numeric',
                'email' => 'required|email',
                'first_name' => 'required|max:50|regex:/^[\pL\s\-]+$/u',
                'last_name' => 'required|max:50|regex:/^[\pL\s\-]+$/u',
                'user_type' => 'required|numeric',
                //'disable_date'      => 'required|date|date_format:d/m/Y|after:yesterday',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            
            $userId = $this->user_data['UserID'];
            $userTeamId = $request->input('user_team_id');
            $email = $request->input('email');
            $first_name = $request->input('first_name');
            $last_name = $request->input('last_name');
            $user_type = $request->input('user_type');
            $disable_date = $request->input('disable_date');
            $IP = \Request::ip();
            $status = 8;
            $params_array = [
                $userId,
                $userTeamId,
                $email,
                $first_name,
                $last_name,
                $user_type,
                $disable_date,
                $IP,
                $status
            ];

            $data = DB::select(' EXEC Amplo.uspUpdateEnterpriseDivaTeam ?,?,?,?,?,?,?,?,?',$params_array);
            
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                if($userTeamId==0){
                    $data1 = DB::select(' EXEC Amplo.uspGetUserDetailFromEmail  ?',array($email));
                    if(count($data1) > 0){
                        $organisation = $data1[0]->organisation;
                    }else{
                        $organisation = "";
                    }
                    $encryptedEmail =Crypt::encryptString($email);
                    $email_array['to']          = $email;
                    $email_array['first_name']  = $first_name;
                    $email_array['last_name']   = $last_name;
                    $email_array['name']        = $this->user_data['FirstName'].' '.$this->user_data['MiddleName'].' '.$this->user_data['LastName'];
                    $email_array['organisation'] = $organisation;
                    $email_array['title']       = 'Welcome';
                    $email_array['subject']     = 'Set Up Account';
                    $email_array['template']    = 'email.emailWelcomeSetupAccount';
                    $flag = 'user';
                    $email_array['link']        =  env('CLIENT_SITE_URL').'registration-addon-user/'.$encryptedEmail.'?type='.$flag;
                    
                     $mail = new EmailController;
                     $mail_response = $mail->sendWelcomeEmail($email_array);
                }
                $message = $data[0]->MessageName;
                return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
               return $this->sendResponse($data[0], $message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
     }

     /*
        Author : Amit
        Date   : 28/09/2019
        Name   : uspAddSecurityQuestion
        Params : None
        Type   : POST
        Purpose: To add security question

    */ 
     public function uspAddSecurityQuestion(){
        try{
            $validator = Validator::make($request->all(), [
                'password_question_id' => 'required|numeric',
                'password_question' => 'required',
                'password_answer' => 'required',
                'created_by' => 'required'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $userId = $this->user_data['UserID'];
            $password_question_id = $request->input('password_question_id');
            $password_question = $request->input('password_question');
            $password_answer = $request->input('password_answer');
            $created_by = $request->input('created_by');
            $data = DB::select(' EXEC Amplo.uspAddSecurityQuestion ?,?,?,?,?',array($userId,$password_question_id,$password_question,$password_answer,$created_by));
            if(count($data) > 0){
                    $message = "security question addedd.";
                }else{
                    //$data = (Object)[];
                    $message = "An error occured";
                }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
     }
     public function uspGetEntperpriseDIVAUserDetails(Request $request){
        
        try{
            $array = array();
            
            $userId = $this->user_data['UserID'];
            $divaUserID = $request->input('DIVAUserID');
            $dataObject = DB::select(' EXEC Amplo.uspGetEntperpriseDIVAUserDetails ? ',array($divaUserID) );
            
            $data = json_decode(json_encode($dataObject), true);

            if(count($data) > 0){
                $array = array(
                    "UserDIVATeamID"=>$data[0]['UserDIVATeamID'],
                    "FirstName"=>$data[0]['FirstName'],
                    "LastName"=>$data[0]['LastName'],
                    "Email"=>$data[0]['Email'],
                    "UserTypeID"=>$data[0]['UserTypeID'],
                    "UserTypeName"=> $data[0]['UserTypeName'],
                    "UserStatusID"=>$data[0]['UserStatusID'],
                    "LookupTitle"=> $data[0]['LookupTitle'],
                    "DisableDate"=> $data[0]['DisableDate'],
                );
                 $message = "user data retrieved.";
                return $this->sendResponse($array, $message);
            }
            else{
                $message = "No data found";
                return $this->sendResponse($array, $message);
            }
            
        }catch(\Exception $e){
            //return $this->sendError($e->getMessage());
             return $this->sendError($e->getMessage());
            //return $this->sendResponse($data1, $message);
        }     
     } 
    public function manageEnterpriseAccount( request $request){

        try{
            $data = DB::select(' EXEC Amplo.uspGetEnterpriseAccounts ');
            //echo "<pre>";print_r( $data );echo "<br>";die;

            /*$data1 = array(
                array(
                "ClientName"      =>"testingA",
                "registrationDate"=>"2019-12-05",
                "CountryName"     =>"US",
                "FirstName"       =>"testingA",
                "LastName"        =>"softB",
                "Email"           =>"testingA@gmail.com",
                "LicenseType"     =>"testing",
                "LicenseExpiryDate"=>"2019-12-10",
                "ApprovalStatus"   =>"Approved"
                ),
                array(
                "ClientName"      =>"testingB",
                "registrationDate"=>"2019-12-06",
                "CountryName"     =>"US",
                "FirstName"       =>"testingB",
                "LastName"        =>"softB",
                "Email"           =>"testingB@gmail.com",
                "LicenseType"     =>"testing",
                "LicenseExpiryDate"=>"2019-12-10",
                "ApprovalStatus"   =>"Approved"
                )
            );*/
            if( count($data) > 0){
              
                foreach( $data as $key=>$val){
                    if($val->ClientStatus == 0){
                        $approve = "Pending";
                    }else{
                        $approve = "Approved";
                    }
                    $enterprise_array[] = array(
                        "ClientID"         => $val->ClientID,
                        "ClientName"       => $val->ClientName,
                        "registrationDate" => date('Y-m-d', strtotime($val->ClientCreatedDate)),
                        "FirstName"        => $val->FirstName,
                        "LastName"         => $val->LastName,
                        "Email"            => $val->EmailAddress,
                        "ClientStatus"         => $val->ClientStatus,
                        "ApprovalStatus"   => $approve, //1=>Approved,2=>Pending,3=>Suspended
                        "CountryName"      => "US",
                        "LicenseType"      => "testing",
                        "LicenseExpiryDate"=> "2019-12-10",
                    );
                }    
                $message = "Enterprise data retrived";
                return $this->sendResponse($enterprise_array, $message);
            }
            else{
                $message = "No record found";  
                return $this->sendResponse($data, $message);  
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 20/12/2019
        Name   : getClientDetails
        Params : @ClientId
        Type   : GET
        Purpose: To fetch the client details
    */
    public function getClientDetails( request $request, $ClientId ){
        try{
            $data = DB::select('EXEC Amplo.uspGetEnterpriseAccountDetails ?',array($ClientId));
            if( count($data) > 0){
                $datas = $data[0];
                $message = "Client data retrieved.";
            }else{
                $datas = (object)[];
                $message = "No record found.";
            }
            return $this->sendResponse($datas, $message);
        }catch( \Exception $e ){
            return $this->sendError($e->getMessage());   
        }
    }
    
    /*
        Author : Prabir
        Date   : 23/12/2019
        Name   : updateClientProfile
        Params : @ClientId
        Type   : GET
        Purpose: To fetch the client details
    */
    public function updateClientProfile(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'ClientName'            => 'required',
                'IndustryID'            => 'required|numeric',
                'IndustryVerticalID'    => 'required|numeric',
                'IndustrySubVerticalID' => 'required|numeric',
                'NoOfEmployees'         => 'required|numeric',
                'CountryRegionCodeID'   => 'required|numeric',
                'Address1'              => 'required',
                'Address2'              => 'required',
                'Country'               => 'required',
                'StateTerritory'        => 'required',
                'City'                  => 'required',
                'PostalCode'            => 'required',
                'SubscriptionKey'       => 'required',
                'StartDate'             => 'required',
                'EndDate'               => 'required',
                'AuditFrequency'        => 'required',
                'FirstAuditDate'        => 'required|date',
                'RecentAuditDate'       => 'required|date',
                'FirstName'             => 'required',
                'LastName'              => 'required',
                'EmailAddress'          => 'required'
            ]);


            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }

            $ClientID               = $request->input('ClientID');
            $ClientName             = $request->input('ClientName');
            $CountryRegionCodeID    = $request->input('CountryRegionCodeID');
            $IndustryID             = $request->input('IndustryID');
            $IndustryVerticalID     = $request->input('IndustryVerticalID');
            $IndustrySubVerticalID  = $request->input('IndustrySubVerticalID');
            $NoOfEmployees          = $request->input('NoOfEmployees');
            
            //$CompanyLogo = $request->input('CompanyLogo');
            $Country                = $request->input('Country');
            $region                 = $request->input('CountryRegionCodeID');
            $StateTerritory         = $request->input('StateTerritory');
            $City                   = $request->input('City');
            $PostalCode             = $request->input('PostalCode');
            $Address1               = $request->input('Address1');
            $Address2               = $request->input('Address2');
            $FirstName              = $request->input('FirstName');
            $LastName               = $request->input('LastName');
            $EmailAddress           = $request->input('EmailAddress');
            $SubscriptionKey        = $request->input('SubscriptionKey');
            $StartDate              = $request->input('StartDate');
            if($request->input('EndDate')=="null"){
                $EndDate = "";    
            }else{
                $EndDate                = $request->input('EndDate');    
            }
            $AuditFrequency         = $request->input('AuditFrequency');
            $FirstAuditDate         = $request->input('FirstAuditDate');
            $RecentAuditDate        = $request->input('RecentAuditDate');
            //$company_profile_id = 0;
            $img_name = "";
            if($request->hasFile('CompanyLogo')){
                $image = $request->file('CompanyLogo');
                $img_name = time().'.'.$image->getClientOriginalExtension();
                $destinationPath = public_path('/images');
                $image->move($destinationPath, $img_name);
            }else{
                if($request->deletePhoto == false){
                    $details = DB::select(' EXEC Amplo.uspRetrieveCompanyProfile ?',[$ClientID]);
                    $img_name = $details[0]->CompanyLogo;
                }
            }
            
            $params = array(
                $this->user_data['UserID'],
                $ClientID,
                $CountryRegionCodeID,
                $IndustryVerticalID,
                $IndustrySubVerticalID,
                $NoOfEmployees,
                $Country,
                $StateTerritory,
                $City,
                $PostalCode,
                $Address1,
                $Address2,
                $img_name,
                $ClientName,
                $IndustryID,
                $FirstName,
                $LastName,
                $EmailAddress
            );
            //echo "<pre>";print_r( $params );echo "<br>";die;
            $paramUpdateClientAudit = array(
                $ClientID,
                $AuditFrequency,
                $FirstAuditDate,
                $RecentAuditDate
            );
            $paramUpdateSubscription = array(
                $ClientID,
                $SubscriptionKey,
                $StartDate,
                $EndDate
            );
            $updateEnterPriseAccountDetails = DB::select(' EXEC Amplo.uspUpdateEnterPriseAccountDetail ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',$params);
            
            if($updateEnterPriseAccountDetails){
                $updateClientAudit = DB::select(' EXEC Amplo.uspUpdateClientAudit ?,?,?,?',$paramUpdateClientAudit);

                $updateSubscription = DB::select(' EXEC Amplo.uspUpdateSubscription ?,?,?,?',$paramUpdateSubscription);

                $message = 'Enterprise data updated successfully';
               
            }else{
                $message = 'Enterprise data not updated';
            }
            return $this->sendResponse($updateEnterPriseAccountDetails,$message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }

    } 
}
