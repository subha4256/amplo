<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Request;
use Validator;
use JWTAuth;
use App\Http\Controllers\Api\BaseController as BaseController;

class DecompositionController extends BaseController
{
    public $payload = [];
    public $dbUserName = "";
    public $dbUserPassword = "";
    public function __construct()
    {
        $this->payload = JWTAuth::parseToken()->getPayload(); 
        $this->dbUserName = $this->payload->get('DbUserName');
        $this->dbUserPassword = $this->payload->get('DbUserPassword');

        config(['database.connections.sqlsrv.username' => $this->dbUserName]);
        config(['database.connections.sqlsrv.password' => $this->dbUserPassword]);

    }
    public function getClientProjects(Request $request)
    {
        try {
            $successResponseData['status'] = 'Success';
            $successResponseData['message'] = '';
            $successResponseData['data'] = null;
            $successResponseData['MessageCode'] = 200;

            $user_data=JWTAuth::parseToken()->authenticate()->toArray();
            $clientId = $user_data['UserID'];
            $resp = DB::select(' EXEC uspGetClientCapModProjects ?', array($clientId));

            // $pageNumber = $request->query('pageNumber') ? $request->query('pageNumber') : 1;

            // $pageSize = $request->query('pageSize') ? $request->query('pageSize') : 10;

            // $offset = ($pageNumber - 1) * $pageSize;
            // $totalResult = count($resp);
            // $sliceResp = array_slice($resp, $offset, $pageSize);
           
            // if(array_key_exists('messageName',(array)$sliceResp[0]))
            // {
            //     $sliceResp=[];
            //     $totalResult=0;
            // }

            $successResponseData['data'] = $resp;
            //$successResponseData['totalResultCount'] = $totalResult;
            $successResponseData['message'] = 'Client Projects List';
            $responseData = $successResponseData;
            return response()->json($responseData, $responseData['MessageCode']);
        } catch (\Exception $e) {
            die("error:" . $e);
        }
    }
    public function getProjectDetails(Request $request, $assesmentId)
    {
        try {
            $successResponseData['status'] = 'Success';
            $successResponseData['message'] = '';
            $successResponseData['data'] = null;
            $successResponseData['MessageCode'] = 200;

            $user_data=JWTAuth::parseToken()->authenticate()->toArray();
            $clientId = $user_data['UserID'];
            
            $resp = DB::select(' EXEC GetCapabilityModellingProjectUserDetails ?,?', array($clientId, $assesmentId));
            $relationShipData =DB::select(' EXEC uspGetProjectRelationship ?,?',array($assesmentId,'cm'));
            $relationShipData_array = array();
            if(count($relationShipData) > 0){
                foreach($relationShipData as $key=>$val){
                    $relationShipData_array[$key]['RelationshipId'] = $val->RelationshipId;
                    $relationShipData_array[$key]['RelationTypeId'] = $val->LookupId;
                    $relationShipData_array[$key]['RelatedProjectId'] = $val->RelatedProjectId;
                }     
            }
            $successResponseData['data']['Projects'] = $resp;
            $successResponseData['data']['Relation'] = $relationShipData_array;
            $successResponseData['message'] = 'Assesment Details';
            $responseData = $successResponseData;
            return response()->json($responseData, $responseData['MessageCode']);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
    public function addClientProject(Request $request)
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
                'assesmentSetName' => 'required|string',
                'userId' => 'required|array',
                'userId.*' => 'distinct'
            ]);
            if ($validator->fails()) {
                $errorResponseData['message'] = 'Invalid data';
                $errorResponseData['data'] = $validator->errors();
                $responseData = $errorResponseData;

                return response()->json($responseData, 400);
            }

            $CapabilityProjectName = $request->assesmentSetName;
            $CapabilityProjectProjectID = 0;

            $param_array = array(
                $CapabilityProjectName,
                $CapabilityProjectProjectID
            );
            $data = DB::select('EXEC uspCheckDuplicateClientCapabilityProjectName ?,?',$param_array);
            // print_r($data);
            // echo $data[0]->MessageName;
            // die; 
            if (!empty($data[0]->MessageName) && $data[0]->MessageName == 'Capability project name  already present') {
                $message = $data[0]->MessageName;
                return $this->sendError($message);
            }

            $user_data=JWTAuth::parseToken()->authenticate()->toArray();
            $clientId = $user_data['UserID'];

            $spParams = [$clientId,
                $requestData['assesmentSetName'],
                implode(",", $requestData['userId'])
            ];

            $resp = DB::select(' EXEC uspAddNewCapabilityModellingProject ?,?,?', $spParams);
            $successResponseData['data']=$resp;
            $successResponseData['message'] = $resp[0]->messageName;
            $responseData = $successResponseData;
            if($resp[0]->messageName != 'Project already exist!'){
                return response()->json($responseData, $responseData['MessageCode']);
            }else{
                $responseData['status'] = 'Error';
                return response()->json($responseData, $responseData['MessageCode']);
            }
        } catch (\Exception $e) {
            die("error:" . $e);
        }
    }
    public function updateClientProject(Request $request)
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
              
                'assesmentId' => 'required',
                'assesmentSetName' => 'required|string',
                'userId' => 'required|array',
                'userId.*' => 'distinct',
                //'disableDate' => 'date_format:Y-m-d',
            ]);
            if ($validator->fails()) {
                $errorResponseData['message'] = 'Invalid data';
                $errorResponseData['data'] = $validator->errors();
                $responseData = $errorResponseData;

                return response()->json($responseData, 400);
            }

            $CapabilityProjectName = $request->assesmentSetName;
            $CapabilityProjectProjectID = $request->assesmentId; 

            $param_array = array(
                $CapabilityProjectName,
                $CapabilityProjectProjectID
            ); 
            $data = DB::select('EXEC uspCheckDuplicateClientCapabilityProjectName ?,?',$param_array);
            // print_r($data);
            // echo $data[0]->MessageName;
            // die;
            if (!empty($data[0]->MessageName) && $data[0]->MessageName == 'Capability project name  already present') {
                $message = $data[0]->MessageName;
                return $this->sendError($message);
            }

            $user_data=JWTAuth::parseToken()->authenticate()->toArray();
            $clientId = $user_data['UserID'];
            
            $spParams = [
                $clientId,
                $requestData['assesmentId'],
                $requestData['assesmentSetName'],
                implode(",", $requestData['userId']),
                isset($requestData['Relation']) ? json_encode($requestData['Relation']):json_encode([])
            ];

            $resp = DB::select(' EXEC uspUpdateCapabilityModellingClientProject ?,?,?,?,?', $spParams);
            
            if ($request->has('disableDate')) {
                $disableSpParams = [
                    $clientId,
                    $requestData['assesmentId'],
                    date_create($requestData['disableDate'])
                ];
                $disableResp = DB::select(' EXEC uspChangeCapModProjectDisableDate ?,?,?', $disableSpParams);
            }

            $successResponseData['message'] = $resp[0]->messageName;
            $responseData = $successResponseData;
            if($resp[0]->messageName != 'Project already exist!'){
                return response()->json($responseData, $responseData['MessageCode']);
            }else{
                $responseData['status'] = 'Error';
                return response()->json($responseData, $responseData['MessageCode']);
            }
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
        }

    }
    /*
        Author : Abdul
        Date   : 28/04/2020
        Name   : copyCapabilityProject
        Params : 
        Type   : POST
        Purpose: To Copy Capability Project
    */
    public function copyCapabilityProject(Request $request){
        try {
            $requestData = $request->all();
            $this->user_data = JWTAuth::parseToken()->authenticate()->toArray(); 
            $userId = $this->user_data['UserID'];
            $params = array(
                $requestData['SourceProjectId'],
                $userId,
                $requestData['DestinationProjectName'],
                $requestData['CopyConfiguration'],
                $requestData['VersionId'],
            );
            $data = DB::select(' EXEC uspCopyProject ?,?,?,?,?',$params );
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                $message = $data[0]->MessageName;
                $code = 200;
                $response = [
                    'success' => true,
                    'data'    => $data[0],
                    'message' => $message,
                ];
                return response()->json($response, $code);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                $code = 400;
                $response = [
                    'success' => false,
                    'data'    => $data[0],
                    'message' => $message,
                ];
                return response()->json($response, $code);
            }
        }catch(\Exception $e){
            $response = [
                'success' => false,
                'message' => $e->getMessage()
            ];
            return response()->json($response);
        }
    }
    /*
        Author : Abdul
        Date   : 30/04/2020
        Name   : GetDecompositionUserProjectsToCopy
        Params : @UserID
        Type   : GET
        Purpose: To Get decomposition projects for copy
    */
    public function GetDecompositionUserProjectsToCopy(Request $request){
        try {
            $requestData     = $request->all();
            $this->user_data = JWTAuth::parseToken()->authenticate()->toArray(); 
            $userId          = $this->user_data['UserID'];
            $params = array(
                $userId
            );
            $data = DB::select(' EXEC uspGetDecompositionUserProjectsToCopy ?',$params );
            
            if( count($data) > 0){
                $message = "Decomposition projects retrived successfully.";
                $code = 200;
                $response = [
                    'success' => true,
                    'data'    => $data,
                    'message' => $message,
                ];
                return response()->json($response, $code);
            }else{
                $message = "No record found.";  
                $code = 200;
                $response = [
                    'success' => true,
                    'data'    => $data,
                    'message' => $message,
                ];
                return response()->json($response, $code);
            }
        }catch(\Exception $e){
            $response = [
                'success' => false,
                'message' => $e->getMessage()
            ];
            return response()->json($response);
        }
    }
    /*
        Author : Abdul
        Date   : 30/04/2020
        Name   : uspGetDecompositionVersion
        Params : @projectId,@processLevel1Id,@projectVersionId
        Type   : GET
        Purpose: To Get decomposition projects version
    */
    public function getDecompositionProjectVersion(Request $request, $projectId, $processLevel1Id, $projectVersionId){
        try {
            $requestData     = $request->all();
            $this->user_data = JWTAuth::parseToken()->authenticate()->toArray(); 
            $userId          = $this->user_data['UserID'];
            $params = array(
                $projectId,
                $processLevel1Id,
                $projectVersionId
            );
            $data = DB::select(' EXEC uspGetDecompositionVersion ?,?,?', $params);
            if( count($data) > 0){
                $message = "Version retrived successfully.";
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
        Date   : 04/05/2020
        Name   : decompositionLockUnlock
        Params : @ProjectId,@ProcessLevel1Id,@IsUnlocked,@UserId,@VersionNo,@ReasonForNewVersion,@ProjectVersionId
        Type   : POST
        Purpose: To save decomposition projects version
    */
    public function decompositionLockUnlock(Request $request){
        try {
            $requestData     = $request->all();
            $this->user_data = JWTAuth::parseToken()->authenticate()->toArray(); 
            $userId          = $this->user_data['UserID'];
            $params = array(
                $requestData['ProjectId'],
                $requestData['ProcessLevel1Id'],
                $requestData['IsUnlocked'],
                $userId,
                $requestData['VersionNo'],
                $requestData['ReasonForNewVersion'],
                $requestData['ProjectVersionId'],
            );
            $data = DB::select(' EXEC uspDecompositionLockUnlock ?,?,?,?,?,?,?', $params);
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
        Author : Mohammed Mushran
        Date   : 25/08/2021
        Name   : AmpProjectLinkWithCMProject
        Params : @
        Type   : GET
        Purpose: To get the AmpProjectLinkWithCMProject data
    */
    public function AmpProjectLinkWithCMProject(Request $request, $DecompositionProjectID, $AmpMarkingProjectId) {
        try{
            $validator = Validator::make(['DecompositionProjectID'=>$DecompositionProjectID, 'AmpMarkingProjectId'=>$AmpMarkingProjectId], [
                'DecompositionProjectID' => "required",
                'AmpMarkingProjectId' => "required"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $DecompositionProjectID,
                $AmpMarkingProjectId
            );
            $data = DB::select('EXEC AmpProjectLinkWithCMProject ?,?',$param_array);
           
            if(is_array($data) && count($data) > 0){
                $message = "Data retrieved successfully.";
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

}
