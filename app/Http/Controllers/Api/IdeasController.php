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
class IdeasController extends BaseController
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
        Date   : 23/07/2020
        Name   : saveIdeateSession
        Params : 
        Type   : POST
        Purpose: To Save Ideate Session
    */
    public function saveIdeateSession( Request $request){
        try{
           $validator = Validator::make($request->all(), [
                'FromDateTime'     => 'required|date_format:Y-m-d H:i:s',
                'ToDateTime'       => 'required|date_format:Y-m-d H:i:s',
                'TimeZoneName'     => 'required',
                'Location'         => 'required',
                'NotifyBefore'     => 'required',
                'NotifyType'       => 'required',
                'Note'             => 'required',
                'NotePlainText'    => 'required',
                'SubEpicId'        => 'required|numeric',
                //'DtIdeatSessionId' => 'required|numeric',
                'ProjectVersionId' => 'required|numeric', 
                'EpicVersionId'    => 'required|numeric',    
                'Participants'     => 'required|array|min:1',
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                $requestData["FromDateTime"],
                $requestData["ToDateTime"],
                $requestData["TimeZoneName"],
                $requestData["Location"],
                $requestData["NotifyBefore"],
                $requestData["NotifyType"],
                $requestData["Note"],
                $requestData["NotePlainText"],
                $requestData["SubEpicId"],
                isset($requestData["DtIdeatSessionId"]) ? $requestData["DtIdeatSessionId"] : 0,
                $requestData["ProjectVersionId"],
                $requestData["EpicVersionId"],
                $userId,
                // $requestData["pageId"],
                json_encode($requestData["Participants"])
            );
            $numemail = count($requestData["Participants"]);
            //echo "<pre>";print_r($params_array);echo "<br>";die;
            $data = DB::select(' EXEC uspSaveIdeateSession ?,?,?,?,?,?,?,?,?,?,?,?,?,?', $params_array );

            if( isset($data[0]->IsSuccess) && ($data[0]->IsSuccess == true || $data[0]->IsSuccess ===1)){
                $mailsend = 0;

                foreach ($requestData["Participants"] as $key => $value) {

                    $encryptedEmail =Crypt::encryptString($value["email"]);
                    $email_array['to']          = $value["email"];
                    $email_array['title']       = 'Ideate Setup';
                    $email_array['subject']     = 'AmploFly 4.0 Ideate Setup';
                    $email_array['template']    = 'email.emailIdeateSession';
                    // $email_array['link']        =  env('CLIENT_SITE_URL').'xxxxxx/'.$encryptedEmail;
                    $email_array['link']        =  env('CLIENT_SITE_URL').'login/?'. $requestData["pageId"];

                    $mail = new EmailController;
                    $mail_response = $mail->sendIdeateSessionEmail($email_array);

                  //  $mailsend++;
                }
               // if( $mailsend == $numemail ) {
                   $message = $data[0]->MessageName;
                   return $this->sendResponse($data, $message);
                // }

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
        Name   : getPriorityLookup
        Params : 
        Type   : GET
        Purpose: To Get All Priority Lookup
    */
    public function getPriorityLookup( Request $request){
        try{
            $userId = $this->user_data['UserID'];
        
            $data = DB::select(' EXEC uspGetPriorityLookup' );
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
        Date   : 23/07/2020
        Name   : saveSubEpicPriority
        Params : 
        Type   : POST
        Purpose: To Save Sub Epic Priority
    */
    public function saveSubEpicPriority( Request $request){
        try{
           $validator = Validator::make($request->all(), [
                // 'DtIdeateSessionId'=> 'required|numeric', 
                'Priority'         => 'required|array|min:1',
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $emailId = $this->user_data['EmailAddress'];
            
            $params_array = array(
                json_encode($requestData["Priority"]),
                $emailId,
                $userId
            );
           
            $data = DB::select(' EXEC uspSaveSubEpicPriority ?,?,?', $params_array );
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
    }
     /*
        Author : Abdul
        Date   : 23/07/2020
        Name   : getSubEpicByPriority
        Params : 
        Type   : GET
        Purpose: To Get Sub Epic By Priority
    */

    public function getSubEpicByPriority( Request $request, $epicId, $lookupId){
        try{
            $userId = $this->user_data['UserID'];
            $email  = $this->user_data['EmailAddress'];
            $params_array = array(
                $epicId,
                $lookupId,
                $email
            );
            //echo "<pre>";print_r($params_array);echo "<br>";die;
            $data = DB::select(' EXEC uspGetSubEpicByPriority ?,?,?',$params_array );
            $data = json_decode(json_encode($data),true);
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $data[$key]['SubEpicId']        = $value['DtSubEpicId'];
                    $data[$key]['PriorityLookUpId'] = $value['DtIdeatePriorityLookUpId'];
                    unset($data[$key]['DtSubEpicId'],$data[$key]['DtIdeatePriorityLookUpId']);
                }
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
        Date   : 23/07/2020
        Name   : saveIdeas
        Params : 
        Type   : POST
        Purpose: To Save Ideas
    */

    
    public function saveIdeas( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'Ideas'     => 'required|array|min:1',
                'dtSubEpicId' => 'required|numeric'   
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            
            $userId      = $this->user_data['UserID'];
            $emailId     = $this->user_data['EmailAddress'];
           
            
            $params_array = array(
                $emailId,
                $requestData["dtSubEpicId"],
                json_encode($requestData['Ideas'])
            );
            //echo "<pre>";print_r($params_array);echo "<br>";die;
            $data = DB::select(' EXEC uspSaveIdeas ?,?,?', $params_array );
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
    } 
    /*
        Author : Abdul
        Date   : 24/07/2020
        Name   : getAllIdeas
        Params : 
        Type   : GET
        Purpose: To Get All Ideas
    */

    public function getAllIdeas( Request $request, $subEpicId){
        try{
            $userId = $this->user_data['UserID'];
            $emailId = $this->user_data['EmailAddress'];
            $params_array = array(
                $subEpicId,
                $emailId       
            );
            //echo "<pre>";print_r($params_array);echo "<br>";die;
            $data = DB::select(' EXEC uspGetAllIdeas ?,?', $params_array );
            if( count($data) > 0){
                foreach($data as $key => $value){
                    foreach (explode(',',$value->Emails) as $key) {
                        if(strcmp($emailId,trim($key)) == 0){
                            $value->HasVoted = 1;
                            break;
                        }else{
                            $value->HasVoted = 0;
                        }
                    }
                }
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
        Date   : 23/07/2020
        Name   : getAllParticipants
        Params : 
        Type   : GET
        Purpose: To Get All Participants
    */

    public function getAllParticipants( Request $request, $dtEpicHeaderId,$dtIdeatSessionId,$projectVersionId,$epicVersionId){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = array(
                $dtEpicHeaderId,
                $dtIdeatSessionId,
                $projectVersionId,
                $epicVersionId       
            );
            $data = DB::select(' EXEC uspGetAllParticipants ?,?,?,?', $params_array );
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
        Date   : 24/07/2020
        Name   : getIdeateHeader
        Params : 
        Type   : GET
        Purpose: To Get Ideate Header
    */

    public function getIdeateHeader( Request $request, $subEpicId,$dtIdeatSessionId){
        try{
            $userId = $this->user_data['UserID'];
            $params_array = array(
                $subEpicId,
                $dtIdeatSessionId
            );
            $data = DB::select(' EXEC uspGetIdeateHeader ?,?', $params_array );
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
        Date   : 24/07/2020
        Name   : markCompleteIdea
        Params : 
        Type   : POST
        Purpose: To save complete idea
    */

    public function markCompleteIdea( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                // 'IdeateIdeaId' => 'required|numeric',
                'IsCompleted'       => 'required|numeric',
                'EpicId'            => 'required|numeric'
            ]);
        
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $email       = $this->user_data['EmailAddress'];
            $params_array = array(
                $requestData["EpicId"],
                $email,
                $requestData["IsCompleted"],
                $userId,
            );
            $data = DB::select(' EXEC uspCompleteIdea ?,?,?,?', $params_array );
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
    }
    /*
        Author : Abdul
        Date   : 25/07/2020
        Name   : changeIdeaSequence
        Params : 
        Type   : POST
        Purpose: To Change Idea Sequence 
    */

    public function changeIdeaSequence( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'Input' => 'required|array|min:2'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            
            $userId      = $this->user_data['UserID'];
            $params_array = array(
                json_encode($requestData["Input"])
            );
            $data = DB::select(' EXEC uspSequenceChange ?', $params_array );
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
    }
    /*
        Author : Abdul
        Date   : 25/07/2020
        Name   : enableVoting
        Params : 
        Type   : POST
        Purpose: To Enable Voting 
    */

    public function enableVoting( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'SubEpicId'            => 'required|numeric',
                'IsEnabledVoting'   => 'required|numeric',
                'VoteForYourOwnIdea' => 'required|numeric',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $emailId     = $this->user_data['EmailAddress'];
        //    echo $emailId; die;
            $params_array = array(
                $requestData["SubEpicId"],
                $requestData["IsEnabledVoting"],
                $requestData["VoteForYourOwnIdea"],
                $emailId,
                $userId
            );
            $data = DB::select(' EXEC uspEnableVoting ?,?,?,?,?', $params_array );
            if( isset($data[0]->IsSuccess) && ($data[0]->IsSuccess == true || $data[0]->IsSuccess ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->IsSuccess) && ($data[0]->IsSuccess == false || $data[0]->IsSuccess ===0)){
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
        Date   : 25/07/2020
        Name   : castVote
        Params : 
        Type   : POST
        Purpose: To Cast Vote 
    */

    public function castVote( Request $request){
        try{
            $validator = Validator::make($request->all(), [
               // 'EmailId'      => 'required|email',
                'IdeateIdeaId' => 'required|numeric',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId = $this->user_data['UserID'];
            if(isset($requestData["EmailId"])){
                $emailId = $requestData["EmailId"];
            }else{
                $emailId = $this->user_data['UserName'];
            }
            //echo $emailId; die;
            $params_array = array(
                // $requestData["EmailId"],
                $userId,
                $emailId,
                $requestData["IdeateIdeaId"]
            );
            $data = DB::select(' EXEC uspCastVote ?,?,?', $params_array );
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
    }
    /*
        Author : Abdul
        Date   : 25/07/2020
        Name   : saveSwot
        Params : 
        Type   : POST
        Purpose: To Save Swot 
    */

    public function saveSwot( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                // 'IdeaSwotId'   => 'required|numeric',
                // 'EmailId'      => 'required|email',
                'IdeateIdeaId' => 'required|numeric',
                // 'Type'         => 'required',
                // 'Note'         => 'required',
                'IsActive'     => 'required|numeric',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $emailId     = $this->user_data['EmailAddress'];
            // if(isset($requestData["UserName"])){
            //     $emailId = $requestData["EmailId"];
            // }else{
            //     $emailId = $this->user_data['UserName'];
            // }
            //echo "<pre>";print_r($requestData);echo "<br>";die;
            $newarray = array();
            $i = 0;
            foreach( $requestData["Swot"] as $key => $value ){
                $Type = $value['Type'];
                foreach ( $value['Notes'] as $key => $value ){
                    // print_r($value) ;
                    $newarray[$i]['IdeaSwotId'] = $value['IdeaSwotId'];
                    $newarray[$i]["EmailId"] = $emailId;
                    $newarray[$i]["IdeateIdeaId"] = $requestData["IdeateIdeaId"];
                    $newarray[$i]["Type"] = $Type;
                    $newarray[$i]["Note"] = $value['Note'];
                    $newarray[$i]["IsActive"] = $requestData["IsActive"];
                    $i++;
                }
            }
            if(count($newarray)==0){
                $message = "Please enter SWOT before saving.";  
                return $this->sendError($message);
            }else{
                foreach ( $newarray as $paramval){
                    $params_array = array(
                        $paramval["IdeaSwotId"],
                        $paramval["EmailId"],
                        $paramval["IdeateIdeaId"],
                        $paramval["Type"],
                        $paramval["Note"],
                        $paramval["IsActive"]
                    );                
                    $data = DB::select(' EXEC uspSaveSwot ?,?,?,?,?,?', $params_array );
                    
                }
                
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
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 25/07/2020
        Name   : getSwot
        Params : 
        Type   : POST
        Purpose: To GET Swot 
    */

    public function getSwot( Request $request, $ideateIdeaId){
        try{
            
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $emailId  = $this->user_data['EmailAddress'];
            // if( isset($emailId) ){
            //     if( $emailId == '0'  ){
            //         $emailId = $this->user_data['UserName'];
            //     } else {
            //         $emailId = $emailId;
            //     }
            // }else{
            //     $emailId = $this->user_data['UserName'];
            // }
            $params_array = array(
                $emailId,
                $ideateIdeaId,
                'All'
            );
            $data = DB::select(' EXEC uspGetSwot ?,?,?', $params_array );
            if( count($data) > 0){
                $response = array();
                $response['EmailId'] = $data[0]->EmailId;
                $response['IdeateIdeaId'] = $data[0]->IdeateIdeaId;
                $response['IsActive'] = $data[0]->IsActive;
                $response['Swot'] = array();
                $strengthNote = array();
                $weeknessNote = array();
                $opportunityNote = array();
                $threatNote = array();

                foreach ($data as $key => $value) {
                    if($value->Type == 'Strength'){
                        array_push($strengthNote,[
                                        'IdeaSwotId'=> $value->IdeaSwotId,
                                        'Note' => $value->Note
                                    ]);
                    }
                    if($value->Type == 'Weakness'){
                        array_push($weeknessNote,[
                            'IdeaSwotId'=> $value->IdeaSwotId,
                            'Note' => $value->Note
                        ]);
                    }
                    if($value->Type == 'Opportunities'){
                        array_push($opportunityNote,[
                            'IdeaSwotId'=> $value->IdeaSwotId,
                            'Note' => $value->Note
                        ]);
                    }
                    if($value->Type == 'Threats'){
                        array_push($threatNote,[
                            'IdeaSwotId'=> $value->IdeaSwotId,
                            'Note' => $value->Note
                        ]);
                    }
                }
                array_push($response['Swot'],[
                    'Type' => 'Strength',
                    'Notes' => $strengthNote
                ]);
                array_push($response['Swot'],[
                    'Type' => 'Weakness',
                    'Notes' => $weeknessNote
                ]);
                array_push($response['Swot'],[
                    'Type' => 'Opportunities',
                    'Notes' => $opportunityNote
                ]);
                array_push($response['Swot'],[
                    'Type' => 'Threats',
                    'Notes' => $threatNote
                ]);
                $message = "Data retrieved successfully.";
                return $this->sendResponse($response, $message);
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
        Date   : 28/07/2020
        Name   : markcompleteIdeaVoting
        Params : 
        Type   : POST
        Purpose: To Mark complete Idea Voting 
    */
    public function markcompleteIdeaVoting( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'SubEpicId' => 'required|numeric',
                'IsCompleted'  => 'required|numeric',
                // 'Email'        => 'required|email'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            if(isset($requestData["Email"])){
                $emailId = $requestData["Email"];
            }else{
                $emailId = $this->user_data['UserName'];
            }
            // echo $emailId; die;
            $params_array = array(
                $requestData["SubEpicId"],
                $requestData["IsCompleted"],
                $emailId
            );
            $data = DB::select(' EXEC uspCompleteIdeaVoting ?,?,?', $params_array );
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
        Author : Abdul
        Date   : 28/07/2020
        Name   : getAllVoters
        Params : 
        Type   : GET
        Purpose: To Get All Voters 
    */
    public function getAllVoters( Request $request, $ideaId){
        try{
            
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $email       = $this->user_data['EmailAddress'];
            
            // if( isset($email) ){
            //     if( $email == '0'  ){
            //         $email = $this->user_data['UserName'];
            //     } else {
            //         $email = $email;
            //     }
            // }else{
            //     $email = $this->user_data['UserName'];
            // }

            $params_array = array(
                $ideaId,
                $email
            );
            $data = DB::select(' EXEC uspGetAllVoters ?,?', $params_array );
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
        Author : Narinder
        Date   : 27/07/2020
        Name   : saveIdeaScore
        Params : 
        Type   : POST
        Purpose: To save IdeaScore 
    */
    public function saveIdeaScore( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                // 'Email'      => 'required|email',
                'InputJson'  => 'required|array|min:1'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId = $this->user_data['UserID'];
            $email  = $this->user_data['EmailAddress'];
            $params_array = array(
                $email,
                json_encode($requestData["InputJson"]),
                $userId,
            );

            $data = DB::select(' EXEC uspSaveIdeaScore ?,?,?', $params_array );
            // echo "<pre>"; print_r($data); die;
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
    }

    /*
        Author : Narinder
        Date   : 27/07/2020
        Name   : getIdeaScore
        Params : 
        Type   : POST
        Purpose: To GET IdeaScore 
    */
    public function getIdeaScore( Request $request, $subEpicId){
        try{
            
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $email  = $this->user_data['EmailAddress'];
            $params_array = array(
                0,
                $subEpicId,
                $email
            );
            $data = DB::select(' EXEC uspGetIdeaScore ?,?,?', $params_array );
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
        Author : Mohammed Mushran
        Date   : 11/05/2021
        Name   : uspCastVoteOut
        Params : 
        Type   : POST
        Purpose: To save usp CastVoteOut 
    */
    public function uspCastVoteOut( Request $request ) {
        try{
            $validator = Validator::make($request->all(), [
                 'IdeaId' => ''
             ]);
             if ($validator->fails()) {
                 return $this->sendError('Validation Errors',$validator->errors());
             }
             $requestData =$request->all();
             $params_array = array(
                  $this->user_data['UserID'],
                  $request->IdeaId
                //  json_encode( $requestData)
             );
             $data = DB::select(" EXEC uspCastVoteOut ?,?", $params_array);
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
        Date   : 28/07/2020
        Name   : publishScore
        Params : 
        Type   : POST
        Purpose: To publishScore
    */
    public function publishScore( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'InputJson' => 'required|array|min:1'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            $email      = $this->user_data['EmailAddress'];
            $params_array = array(
                json_encode($requestData["InputJson"]),
                $email
            );

            $data = DB::select(' EXEC uspPublishScore ?,?', $params_array );
            // echo "<pre>"; print_r($data); die;
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
    }
    /*
        Author : Narinder
        Date   : 27/07/2020
        Name   : getIdeateProblemPinningDetails
        Params : 
        Type   : POST
        Purpose: To GET Ideate Problem Pinning Details 
    */
    public function getIdeateProblemPinningDetails( Request $request, $epicId, $dtIdeateSessionId){
        try{
            
            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];
            
            $params_array = array(
                $epicId,
                $dtIdeateSessionId
            );
            // echo "<pre>"; print_r($params_array); die;
            $data = DB::select(' EXEC uspGetIdeateProblemPinningDetails ?,?', $params_array );
            // echo "<pre>"; print_r($data); die;
            if( count($data) > 0){
                $newres = array();
                foreach( $data as $key => $value ) {
                    $newres['Priority'][$key]['Id'] = $value->DtIdeateProblemPinningId;
                    $newres['Priority'][$key]['SubEpicId'] = $value->DtSubEpicId;
                    $newres['Priority'][$key]['PriorityLookUpId'] = $value->DtIdeatePriorityLookUpId;
                    $newres['Priority'][$key]['Difficulty'] = $value->DifficultyPoint;
                    $newres['Priority'][$key]['AnticipatedBenifitPoint'] = $value->AnticipatedBenefitPoint;
                    $newres['Priority'][$key]['LocationX'] = $value->LocationX;
                    $newres['Priority'][$key]['LocationY'] = $value->LocationY;
                    $newres['Priority'][$key]['SequenceNumber'] = $value->SequenceNumber;
                }      
                 //print_r($newres); 
                $data = $newres;
                $message = "Data retrieved successfully.";
            }else {
                $message = "No record found.";  
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }


    public function mergeIdeas(Request $request){
        try{
    
            $requestData = $request->all();
            $email      = $this->user_data['EmailAddress'];

            $params_array = array(
                json_encode($requestData)
            );
            //echo "<pre>";print_r($requestData);echo "<br>";die;
            $data = DB::select(' EXEC uspMergeIdeas ?', $params_array );

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
    }

    public function submitIdeas(Request $request){
        try{

            $validator = Validator::make($request->all(), [
                'EpicId' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }

            $requestData = $request->all();
            $userId      = $this->user_data['UserID'];

            $params_array = array(
                $requestData["EpicId"],
                $userId
            );
            
            $data = DB::select(' EXEC uspSubmitIdeas ?,?', $params_array );

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
    }
}
