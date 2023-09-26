<?php
namespace App\Http\Controllers\Api;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use JWTFactory;
use JWTAuth;
use Mail;

class ProjectController extends BaseController
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
    public function getClientUserList(Request $request ){
        try {
            $successResponseData['status'] = 'Success';
            $successResponseData['message'] = '';
            $successResponseData['data'] = null;
            $successResponseData['MessageCode'] = 200;
            
            $user_data=JWTAuth::parseToken()->authenticate()->toArray();
            $clientId = $user_data['ClientID'];

           $resp=DB::select(' EXEC uspGetUserList ?',array($clientId));
           $successResponseData['data']=$resp;
           $successResponseData['message']='Client User List';
           $responseData=$successResponseData;
           return response()->json($responseData, $responseData['MessageCode']);
        } catch (\Exception $e) {
            die("error:" . $e );
        }
    }
    public function getClientProjects(Request $request ){
        try {
            $successResponseData['status'] = 'Success';
            $successResponseData['message'] = '';
            $successResponseData['data'] = null;
            $successResponseData['MessageCode'] = 200;

             
            $user_data=JWTAuth::parseToken()->authenticate()->toArray();
            $clientId =$user_data['UserID'];
           // echo $clientId;die;
           $resp=DB::select(' EXEC uspGetClientProjects ?',array($clientId));

           //$pageNumber=$request->query('pageNumber')?$request->query('pageNumber'):1;

           //$pageSize=$request->query('pageSize')?$request->query('pageSize'):10;
           
           //$offset=($pageNumber-1)*$pageSize;
           //$totalResult= count($resp);
           //$sliceResp=array_slice($resp,$offset,$pageSize);

        //   if(array_key_exists('messageName',(array)$sliceResp[0]))
        //    {
        //        $sliceResp=[];
        //        $totalResult=0;
        //    }


           $successResponseData['data']=$resp;
           //$successResponseData['totalResultCount']=$totalResult;
           $successResponseData['message']='Client Projects List';
           $responseData=$successResponseData;
           return response()->json($responseData, $responseData['MessageCode']);
        } catch (\Exception $e) {
            die("error:" . $e );
        }
    }
    public function getProjectDetails(Request $request ,$assesmentId){
        try {
            $successResponseData['status'] = 'Success';
            $successResponseData['message'] = '';
            $successResponseData['data'] = null;
            $successResponseData['MessageCode'] = 200;
    
              
            $user_data=JWTAuth::parseToken()->authenticate()->toArray();
            $clientId =$user_data['UserID'];
            
            $resp=DB::select(' EXEC GetBMProjectUserDetails ?,?',array($clientId,$assesmentId));
            $relationShipData =DB::select(' EXEC uspGetProjectRelationship ?,?',array($assesmentId,'bm'));
            $relationShipData_array = array();
            if(count($relationShipData) > 0){
                foreach($relationShipData as $key=>$val){
                    $relationShipData_array[$key]['RelationshipId'] = $val->RelationshipId;
                    $relationShipData_array[$key]['RelationTypeId'] = $val->LookupId;
                    $relationShipData_array[$key]['RelatedProjectId']   = $val->RelatedProjectId;
                }     
            }
            
           $successResponseData['data']['Projects']=$resp;
           $successResponseData['data']['Relation']=$relationShipData_array;
           $successResponseData['message']='Assesment Details';
           $responseData=$successResponseData;
           return response()->json($responseData, $responseData['MessageCode']);
        } catch (\Exception $e) {
            die("error:" . $e );
        }
    }
    public function addClientProject(Request $request){
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

            $requestData=$request->all();

            $validator = Validator::make($requestData, [
                'assesmentSetName' => 'required|string',
                'userId'=>'required|array',
                'userId.*'=>'distinct'
            ]);
            if ($validator->fails()) {
                $errorResponseData['message'] = 'Invalid data';
                $errorResponseData['data'] = $validator->errors();
                $responseData=$errorResponseData;

                return response()->json($responseData, 400);
            }
            

              
            $user_data=JWTAuth::parseToken()->authenticate()->toArray();
            $clientId = $user_data['UserID'];

            $spParams=[$clientId,
            $requestData['assesmentSetName'],
            implode(",",$requestData['userId'])];
            $resp=DB::select(' EXEC uspAddNewClientProject ?,?,?',$spParams);
            
            $successResponseData['message']=$resp[0]->messageName;
            $responseData=$successResponseData;
           
            if( isset($resp[0]->Success) && ($resp[0]->Success == true || $resp[0]->Success ===1)){
                return response()->json($responseData, $responseData['MessageCode']);
            }else{
                $responseData['status'] = 'Error';
                return response()->json($responseData, $responseData['MessageCode']);
            }
        } catch (\Exception $e) {
            die("error:" . $e );
        }
    }
    public function updateClientProject(Request $request){

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

            $requestData=$request->all();

            $validator = Validator::make($requestData, [
                'assesmentId'=>'required',
                'assesmentSetName' => 'required|string',
                'userId'=>'required|array',
                'userId.*'=>'distinct',
                //'disableDate'=>'required|date_format:Y-m-d'
            ]);
            if ($validator->fails()) {
                $errorResponseData['message'] = 'Invalid data';
                $errorResponseData['data'] = $validator->errors();
                $responseData=$errorResponseData;

                return response()->json($responseData, 400);
            }

              
            $user_data=JWTAuth::parseToken()->authenticate()->toArray();
            $clientId = $user_data['UserID'];

            $assesmentSetName  = "".$requestData['assesmentSetName']."";
            $param_array = array(
                $clientId,
                $requestData['assesmentId'],
                $assesmentSetName,
                implode(',',$requestData['userId']),
                isset($requestData['Relation']) ? json_encode($requestData['Relation']):json_encode([])
            );
           
            $resp=DB::select(' EXEC uspUpdateClientProject ?,?,?,?,?',$param_array);
           
            if ($request->has('disableDate')) {
                $disableSpParams = [
                    $clientId,
                    $requestData['assesmentId'],
                    date_create($requestData['disableDate'])
                ];
                $disableResp = DB::select(' EXEC uspChangeBMProjectDisableDate ?,?,?', $disableSpParams);
            }

            
           $successResponseData['message']=$resp[0]->messageName;
           $responseData=$successResponseData;
           if($resp[0]->messageName != 'Project already exist!'){
                return response()->json($responseData, $responseData['MessageCode']);
           }else{
                $responseData['status'] = 'Error';
                return response()->json($responseData, $responseData['MessageCode']);
           }
        }
        catch (\Exception $e) {
           return $this->sendError($e->getMessage()); 
        }

    }
    /*
        Author : Abdul
        Date   : 31/08/2020
        Name   : getRelationShipData
        Params : @ProjectType
        Type   : GET
        Purpose: To GET Relationship data
    */
    public function getRelationShipData(Request $request, $projectType ){
        try{
            $data = DB::select(' EXEC uspGetRelationShipLookup ?',array($projectType)  );
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
        Date   : 04/09/2020
        Name   : deleteProjectRelation
        Params : @RelationShipId
        Type   : DELETE
        Purpose: To Delete Project Relationship
    */
    public function deleteProjectRelation(Request $request, $relationShipId ){
        try{
            $data = DB::select(' EXEC uspDeleteProjectRelationship ?',array($relationShipId)  );
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
    
}

?>