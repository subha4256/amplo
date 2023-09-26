<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class PowerBiController extends BaseController
{
    public $payload = [];
    public $dbUserName = "";
    public $dbUserPassword = "";
    public function __construct()
    {
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
        Author : kapil
        Date   : 12/10/2020
        Name   : powerBiLogin
        Params : nonoe
        Type   : GET
        Purpose: to get the acces token use powerbi rest api's
    */
    public function powerBiLogin(){
        try {
            $options = array(
                CURLOPT_URL             => "https://login.microsoftonline.com/common/oauth2/token",
                CURLOPT_RETURNTRANSFER  => true,
                CURLOPT_ENCODING        => "",
                CURLOPT_MAXREDIRS       => 10,
                CURLOPT_TIMEOUT         => 30,
                CURLOPT_CUSTOMREQUEST   => "POST",

                CURLOPT_POSTFIELDS      => array(
                                                "grant_type"        => 'password',
                                                "scope"             => 'openid',
                                                "resource"          => 'https://analysis.windows.net/powerbi/api',
                                                "client_id"         => env('PBI_APP_ID'), // Registered App ApplicationID
                                                "client_secret"     => env('PBI_APP_SECRET'), // Registered App ApplicationSecret
                                                "username"          => env('PBI_USERNAME'), // for example john.doe@yourdomain.com
                                                "password"          => env('PBI_PWD') // Azure password for above user
                                            )
                );
            $curlPostToken = curl_init();
            curl_setopt_array($curlPostToken, $options);
            $tokenResponse = curl_exec($curlPostToken);
            $tokenError = curl_error($curlPostToken);
            curl_close($curlPostToken);
            if(!empty($tokenResponse)){
                $tokenResult            = json_decode($tokenResponse);
                if(isset($tokenResult->error)){
                    $data = [];
                    $message = $tokenResult->error ?? 'Something went wrong';
                    return $this->sendError($message, $data);
                }elseif(isset($tokenResult->access_token)){
                    $data['access_token']   = $tokenResult->access_token;
                    $data['client_id']      = $this->user_data['ClientID'];
                    $message                = 'Authentication successfull';
                    return $this->sendResponse($data, $message);
                }
            }else{
                $data = json_decode($tokenError);
                $message = 'Something went wrong please try again';
                return $this->sendError($message, $data);
            }

        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
    
     /*
        Author : kapil
        Date   : 12/10/2020
        Name   : getEmbedToken
        Params : $request
        Type   : POST
        Purpose: To generate the embed token of the given report
    */
    public function getEmbedToken(Request $request){
        try {
            
            $accessToken = "Bearer ".$request->pbiToken;
            $url = 'https://api.powerbi.com/v1.0/myorg/groups/'.env('PBI_GROUP_ID').'/reports/'.$request->reportId.'/GenerateToken';
            $options = array(
                CURLOPT_URL             => $url,
                CURLOPT_RETURNTRANSFER  => true,
                CURLOPT_ENCODING        => "",
                CURLOPT_MAXREDIRS       => 10,
                CURLOPT_TIMEOUT         => 30,
                CURLOPT_CUSTOMREQUEST   => "POST",
                CURLOPT_POSTFIELDS      => json_encode(array()),
                CURLOPT_HTTPHEADER      => array(
                                                "Authorization: $accessToken",
                                                "Cache-Control: no-cache",
                                            ),
                );

            $ch = curl_init();
    
            curl_setopt_array($ch, $options);
            
            $response = curl_exec($ch);
            $error = curl_error($ch);
            
            curl_close($ch);
    
            if(!empty($response)){
                $result            = json_decode($response);
                $data = array();

                if(isset($result->error)){
                    $message = $result->error->message ?? '';
                    return $this->sendError($message, $data);
                }else{
                    $data    = $result;
                    $message = 'Token Retrived successfully';
                    return $this->sendResponse($data, $message);
                }

            }else{
                $data = json_decode($error);
                $message = 'Something went wrong please try again';
                return $this->sendError($message, $data);
            }

        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : kapil
        Date   : 12/10/2020
        Name   : getReportsOfGroup
        Params : $request
        Type   : GET
        Purpose: To get the report list from powerbi of particular workspace
    */
    public function getReportsOfGroup(Request $request){
        try {
            $token = $request->query('pbiToken') ?? null;
            if(!isset($token)){
                return $this->sendError('Accces token is required');
            }

            $getReportList = $this->getReportsFromPowerBI($token);

            if(!empty($getReportList['response'])){
                $result            = json_decode($getReportList['response']);
                $data = array();
            
                if(isset($result->error)){

                    $message = $result->error->message ?? '';
                    return $this->sendError($message, $data);

                }elseif(isset($result->value)){
                    if( count($result->value) > 0 ){
                        foreach ($result->value as $key => $value) {
                            if($value->id == '1813e85c-f92e-4713-b3e2-bec4c2045bb7' || $value->id == "83c1f8c2-ab56-4ed6-b460-6a9f7695e0ec"){
                                continue;
                            }
                            array_push($data,[
                                'reportId'          => $value->id,
                                'reportName'        => $value->name,
                                'reportEmbedUrl'    => $value->embedUrl,
                            ]);
                        }
        
                        $message = 'Reports Retrived successfully';
                    }else{
                        $message = "No reports found";
                    }
                    return $this->sendResponse($data, $message);
                }

            }else{
                $data = json_decode($getReportList['error']);
                $message = 'Something went wrong please try again';
                return $this->sendError($message, $data);
            }

        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : kapil
        Date   : 12/10/2020
        Name   : exportReport
        Params : $request
        Type   : POST
        Purpose: To export the poswerbu report in the given format
    */
    public function exportReport(Request $request){
        try {

            $validator = Validator::make($request->all(), [
                "pbiToken"  => 'required',
                "reportId"  => 'required',
                "format"    => 'required|string',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            
            $accessToken = "Bearer ".$request->pbiToken;
            $url = 'https://api.powerbi.com/v1.0/myorg/groups/'.env('PBI_GROUP_ID').'/reports/'.$request->reportId.'/ExportTo';
            $options = array(
                CURLOPT_URL             => $url,
                CURLOPT_RETURNTRANSFER  => true,
                CURLOPT_ENCODING        => "",
                CURLOPT_MAXREDIRS       => 10,
                CURLOPT_TIMEOUT         => 30,
                CURLOPT_CUSTOMREQUEST   => "POST",
                CURLOPT_POSTFIELDS      => array(
                                                "format" => $request->format,
                                            ),
                CURLOPT_HTTPHEADER      => array(
                                                "Authorization: $accessToken",
                                                "Cache-Control: no-cache",
                                            ),
                );

            $ch = curl_init();
    
            curl_setopt_array($ch, $options);
            
            $response = curl_exec($ch);
            $error = curl_error($ch);
            
            curl_close($ch);

            if(!empty($response)){
                $result            = json_decode($response);
                $data = array();
                if(isset($result->error)){

                    $message = $result->error->message ?? '';
                    return $this->sendError($message, $data);

                }elseif(isset($result->value)){
                    $data = $result;
                    return $this->sendResponse($data, $message);
                }

            }else{
                $data = json_decode($error);
                $message = 'Something went wrong please try again';
                return $this->sendError($message, $data);
            }

        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }

    /*
     Author : Kapil
     Date   : 12-10-2020
     Name   : getReportsFromPowerBI
     Params : None
     Type   : none
     Purpose: get the list of reports from powerbi
     */
    private function getReportsFromPowerBI($accessToken){
        try {
            // $accessToken = "Bearer ".$request->query('pbiToken');
            $accessToken = "Bearer ".$accessToken;
            $url = 'https://api.powerbi.com/v1.0/myorg/groups/'.env('PBI_GROUP_ID').'/reports';
            $options = array(
                CURLOPT_URL             => $url,
                CURLOPT_RETURNTRANSFER  => true,
                CURLOPT_ENCODING        => "",
                CURLOPT_MAXREDIRS       => 10,
                CURLOPT_TIMEOUT         => 30,
                CURLOPT_CUSTOMREQUEST   => "GET",
                CURLOPT_HTTPHEADER      => array(
                                                "Authorization: $accessToken",
                                                "Cache-Control: no-cache",
                                            ),
                );

            $ch = curl_init();

            curl_setopt_array($ch, $options);
            
            $response = curl_exec($ch);
            $error = curl_error($ch);
            
            curl_close($ch);
            $data['response'] = $response;
            $data['error'] = $error;
            
            return $data;

        } catch (\Exception $th) {
            return false;
        }
    }


    /*
     Author : Kapil
     Date   : 12-10-2020
     Name   : getCxOReportByUser
     Params : None
     Type   : GET
     Purpose: get the CxO report by user
     */
    public function getCxOReportByUser(Request $request){
        try {

            $token = $request->query('pbiToken') ?? null;
            if(!isset($token)){
                return $this->sendError('Accces token is required');
            }

            $getReportList = $this->getReportsFromPowerBI($token);

            $params_array = array(
                $this->user_data['ClientID'],
                $this->user_data['UserID'],
            );
        
            $reportFromProc = DB::select(' EXEC uspGerCxOReportByUser ?,?',$params_array);

            if((count($reportFromProc) > 0) && isset($getReportList['response'])){
                $result            = json_decode($getReportList['response']);
                $data = array();
            
                if(isset($result->error)){

                    $message = $result->error->message ?? '';
                    return $this->sendError($message, $data);

                }elseif(isset($result->value)){
                    if( count($result->value) > 0 ){
                        foreach ($result->value as $key => $value) {
                            foreach ($reportFromProc as $reportKey => $reportValue) {
                                if(($reportValue->DashboardPowerBiReportId == $value->id) && $reportValue->ViewAccess == 1 ) {
                                    array_push($data,[
                                        'reportId'          => $value->id,
                                        'reportName'        => $reportValue->Dashboardwidgetname,
                                        'reportEmbedUrl'    => $value->embedUrl,
                                    ]);
                                }
                            }
                        }
                        $message = 'Reports Retrived successfully';
                    }else{
                        $message = "No reports found";
                    }
                    return $this->sendResponse($data, $message);
                }
            }else{
                $message = "No record found";
                return $this->sendResponse([], $message);
            }

        } catch (\Exception $th) {
            $this->sendError($th->getMessage());
        }
    }
    
}
