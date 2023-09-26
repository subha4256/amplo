<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\KPINotification;
use DB;
use Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Mail;

class EmailController extends Controller
{
    public function sendWelcomeEmail($emailarr){
        try{
           
            Mail::send(['html'=>$emailarr['template'] ], ['first_name' => $emailarr['first_name'], 'last_name' => $emailarr['last_name'], 'name'=> $emailarr['name'], 'organisation'=> $emailarr['organisation'], 'link' => $emailarr['link']  ], function ($message) use ($emailarr)
            {
                 $message->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME') );

                $message->to($emailarr['to'])->subject($emailarr['subject']);

            });
            return true;
        }catch(Exception $e){
            return false;
        }
    }
    public function sendVerificationEmail($emailarr){
        try{
           
            Mail::send(['html'=>$emailarr['template'] ], ['first_name' => $emailarr['first_name'], 'last_name' => $emailarr['last_name'], 'link' => $emailarr['link']  ], function ($message) use ($emailarr)
            {
                 $message->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME') );

                $message->to($emailarr['to'])->subject($emailarr['subject']);

            });
            return true;
        }catch(Exception $e){
            return false;
        }
    }
    public function sendVerificationEmailUser($emailarr){
        try{
           
            Mail::send(['html'=>$emailarr['template'] ], ['first_name' => $emailarr['first_name'], 'last_name' => $emailarr['last_name'], 'link' => $emailarr['link']  ], function ($message) use ($emailarr)
            {
                 $message->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME') );
                $message->to($emailarr['to'])->subject($emailarr['subject']);
            });
            return true;
        }catch(Exception $e){
            return false;
        }
    }

    public function sendApprovalEmailToAdmin($emailarr) {
        try{
           
            Mail::send(['html'=>$emailarr['template'] ], ['first_name' => $emailarr['first_name'],'middle_name' => $emailarr['middle_name'], 'last_name' => $emailarr['last_name'], 'email1' => $emailarr['email1'], 'FirstName' => $emailarr['FirstName'], 'LastName' => $emailarr['LastName'], 'link' => $emailarr['link']   ], function ($message) use ($emailarr)
            {
                $message->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME') );
                $message->to($emailarr['to'])->subject($emailarr['subject']);
            });
            return true;
        }catch(Exception $e){
            return false;
        }
    }

    public function sendForgotPasswordEmail($emailarr){
        try{
           
            Mail::send(['html'=>$emailarr['template'] ], ['first_name' => $emailarr['first_name'], 'middle_name' => $emailarr['middle_name'], 'last_name' => $emailarr['last_name'], 'link' => $emailarr['link']  ], function ($message) use ($emailarr)
            {
                 $message->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME') );
                $message->to($emailarr['to'])->subject($emailarr['subject']);
            });
            return true;
        }catch(Exception $e){
            return false;
        }
    }
    public function sendEmailManager($emailarr){
        
        try{
           
            Mail::send(['html'=>$emailarr['template'] ],[
                'employee_first_name' => $emailarr['employee_first_name'], 
                'employee_last_name' => $emailarr['employee_last_name'], 
                'employee_email' => $emailarr['employee_email'],
                'employee_id' => $emailarr['employee_id'],
                'employee_type' => $emailarr['employee_type'], 
                'manager_first_name' => $emailarr['manager_first_name'], 
                'manager_last_name' => $emailarr['manager_last_name'], 
                'manager_email' => $emailarr['manager_email'],
                'link' => $emailarr['link'] 
            ], function ($message) use ($emailarr)
            {
                $message->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME') );
                $message->to($emailarr['to'])->subject($emailarr['subject']);
            });
            return true;
        }catch(Exception $e){
            return false;
        }
    }
    public function sendRequestEmailToEmployee($emailarr){
        
        try{
            Mail::send(['html'=>$emailarr['template'] ],[], function ($message) use ($emailarr)
            {
                $message->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME') );
                $message->to($emailarr['to'])->subject($emailarr['subject']);
            });
            return true;
        }catch(Exception $e){
            return false;
        }
    }
    public function sendIdeateSessionEmail($emailarr){
        
        try{
            Mail::send(['html'=>$emailarr['template'] ],['link' => $emailarr['link'] ], function ($message) use ($emailarr)
            {
                $message->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME') );
                $message->to($emailarr['to'])->subject($emailarr['subject']);
            });
            return true;
        }catch(Exception $e){
            return false;
        }
    }

    public function sendKPINotificationEmail(){
        try {
            $data = DB::select('EXEC Amplo.uspGetKPiForNotification');
            if(count($data) > 0){
                foreach ($data as $key => $value) {
                    $currentTime = date('h:i A');
                    if(
                        (strtotime($value->AuditDueDate) >= strtotime($value->NotificationStartDate))
                    ){
                        // today <= audit and today >= startdate
                        if(
                            strtotime(date('Y-m-d')) <= strtotime($value->AuditDueDate) 
                            && 
                            strtotime(date('Y-m-d')) >= strtotime($value->NotificationStartDate)
                        ){
                    //     if(strtotime($currentTime) == strtotime($value->NotificationStartTimeFrame)){
                            $recipientMails = explode(',', $value->NotificationEmails);
                            // $data['kpi_name'] = $value->KPIName;
                            // $data['kpi_title'] = $value->KPITitle;
                            $data['url'] = env('APP_URL').'kpi-setting/audit/'.$value->KpiSetId.'/'.$value->KPIID;
                            foreach ($recipientMails as $mailId) {
                                if(!empty($mailId)){
                                    Mail::to($mailId)->send(new KPINotification($data));
        
                                    $param = [
                                        $value->ClientID,
                                        $value->KPIID,
                                        $mailId,
                                        date('Y-m-d'),
                                        $data['url'],
                                        0,
                                        1
                                    ];
                                    $response = DB::select('EXEC Amplo.uspSaveKPINotification ?,?,?,?,?,?,?',$param);
                                }
                            }
                    //     }
                        }
                    }
                }
                return true;
            }
        } catch (Exception $th) {
            return false;
        }
    }
    
}
