<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Common;

class DashboardReportController extends BaseController
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


    public function getDashboardReport($userId){
        try {

            $params_array = array(
                $this->user_data['ClientID'],
                $userId
            );
        
            $data = DB::select(' EXEC uspGetDashboardReport ?,?',$params_array);

            if(count($data) > 0){
                $message = "Data retrived successfully";
                return $this->sendResponse($data, $message);
            }else{
                $message = "No record found";
                return $this->sendResponse($data, $message);
            }

        } catch (\Exception $th) {
            $this->sendError($th->getMessage());
        }
    }

    public function saveDashboardReportAccess(Request $request){
        try {

            $validator = Validator::make($request->all(), [
                'InputJson' => 'required|array|min:1'
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }

            $params_array = array(
                $this->user_data['ClientID'],
                $this->user_data['UserID'],
                json_encode($request->InputJson)
            );
        
            $data = DB::select(' EXEC uspSaveDashboardReportAccess ?,?,?',$params_array);

            if(isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){

                $message = $data[0]->MessageName;
                return $this->sendResponse($data, $message);

            }else if(isset($data[0]->Success)){

                $message = $data[0]->MessageName;  
                return $this->sendError($message);

            }else if(is_array($data) && count($data) === 0){

                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);

            }else{

                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }

        } catch (\Exception $th) {
            $this->sendError($th->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 13/10/2020
        Name   : getFPMList
        Params : @ClientId
        Type   : GET
        Purpose: To get fpm data
    */
    public function getFPMList(Request $request){
        try{
            $params_array = array(
                $this->user_data['ClientID']
            );
            $data = DB::select(' EXEC uspGetFPMList ?', $params_array);
            if(count($data)>0){
                $message = "Data retrived successfully.";
                return $this->sendResponse($data,$message);
            }else if(is_array($data) && count($data) === 0){
                $message = "No record found.";
                return $this->sendResponse($data,$message);
            }
            else{
                return $this->sendError($data);
            }
        }catch( \ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 13/10/2020
        Name   : saveFPMComparision
        Params : 
        Type   : POST
        Purpose: To save fpm comparision data
    */
    public function saveFPMComparision( Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                'ProjectId1' => 'required|numeric',
                'VersionId1' => 'required|numeric',
                'ProjectId2' => 'required|numeric',
                'VersionId2' => 'required|numeric'
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            $params_array = array(
                $this->user_data['ClientID'],
                $this->user_data['UserID'],
                $requestData['ProjectId1'],
                $requestData['VersionId1'],
                $requestData['ProjectId2'],
                $requestData['VersionId2']
            );

            $data = DB::select(' EXEC uspInsertDataForFPMComparision ?,?,?,?,?,?',$params_array);

            if(isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                $message = $data[0]->MessageName;
                return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch( \ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }

    /*
     Author : Kapil
     Date   : 09-10-2020
     Name   : importEBIDTAData
     Params : None
     Type   : POST
     Purpose: to import the ebidata file
     */
    public function importEBIDTAData(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'files'   => 'required',
                'files.*' => 'mimes:xls,xlsx',
                'module'  => 'required',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }

            $files = $request->file('files');

            $uploadcount = 0;

            foreach($files as $file) {
                $file_name              = date('d-M-Y-H-i-s').'-'.$file->getClientOriginalName();
                $dirname                = $request['module'];
                $destinationPath        = public_path('/'.$dirname);
                $destinationPathImport  = public_path('/'.$dirname.'/Import');
                $destinationPathArchive = public_path('/'.$dirname.'/Archive');
                

                if(! is_dir($destinationPath) && ! is_dir($destinationPathImport) && ! is_dir($destinationPathArchive)){
                    mkdir($destinationPath, 0755,true);
                    mkdir($destinationPathImport, 0755,true);
                    mkdir($destinationPathArchive, 0755,true);
                }
                $file->move($destinationPathImport, $file_name);
                $source_file =  $destinationPathImport.'/'.$file_name;

                chmod($destinationPath, 0777);
                chmod($destinationPathImport, 0777);
                chmod($destinationPathArchive, 0777);
                chmod($source_file, 0777);

                $common_model   = new Common();
                $column_array  = $common_model->readXLSEBIDTA( $source_file );

                $ebiData['root'] = $column_array['EBIDTA'];
                $ebiDataJson     = json_encode($ebiData);

                $params_array = array(
                    $this->user_data['ClientID'],
                    $this->user_data['UserID'],
                    $ebiDataJson,
                );

                $data = DB::select(' EXEC uspImportEBIDTAData ?,?,?',$params_array);

                if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){

                     rename($source_file, $destinationPathArchive.'/'. pathinfo($source_file, PATHINFO_BASENAME));

                }
                $uploadcount ++;
            }

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                $message = $data[0]->MessageName;
                return $this->sendResponse($data, $message);
            }else{
                if(isset($data[0]->MessageName)){
                    $message = $data[0]->MessageName; 
                    return $this->sendError($message);
                }
                else{
                    return $this->sendError($data);
                }
            }
        }
        catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
}
