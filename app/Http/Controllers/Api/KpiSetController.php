<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Controllers\Api\BaseController as BaseController;
use DB;
use Validator;
use JWTAuth;

class KpiSetController extends BaseController

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
        Author : Prabir
        Date   : 17/03/2020
        Name   : saveKpiSet
        Params : None
        Type   : POST
        Purpose: To save KPISet 
    */
	public function saveKpiSet(Request $request)
	{
		try{
            $validator = Validator::make($request->all(), [
                "postData" => "required|array|min:1"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
			$data = true;
            $UserID = $this->user_data['UserID'];
            $ClientID = $this->user_data['ClientID'];
			$requestData = $request->all();
			$postData = $requestData['postData'];

            $inputJson = json_encode($postData);
            //print_r(array($UserID, $ClientID, $inputJson)); die;
            $data = DB::select(' EXEC uspSaveKPISet ?,?,?', array($UserID, $ClientID, $inputJson));
          
            if(count($data) > 0){
                if(isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ==1)){
                    return $this->sendResponse($data[0], $data[0]->MessageName);
                }else{
                    return $this->sendError($data[0]->MessageName);
                }
            }else{
                $message = "Stored Procedure are not returning anything.";
                return $this->sendResponse($message, $data);
            }
			
		}catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    
    /*
        Author : Prabir
        Date   : 17/03/2020
        Name   : saveKpiSet
        Params : None
        Type   : GET
        Purpose: To save KPISet 
    */
	public function listKPISet()
	{
		try{
			$ClientID = $this->user_data['ClientID'];
            $UserID = 0;
			$data = DB::select(' EXEC uspListKPISet ?,?', array($ClientID,$UserID));
			if($data){
                $message = "kpi sets retrived.";
            }else{
                $message = "No record found.";
            }
            return $this->sendResponse($data, $message);
		}catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
     /*
        Author : 
        Date   : 25/03/2020
        Name   : getKpiUserAccess
        Params : None
        Type   : GET
        Purpose: To get kpi access details by user
    */
	public function getKpiUserAccess($UserId, $SetId)
	{
		try{
            $data = DB::select(' EXEC uspGetKpiUserAccessDetail ?,?', array($UserId , $SetId));
            //print_r($data);
			if($data){
                if( count( $data ) > 0){
               
                    foreach ($data as $key => $value) {
                      
                        if($value->AccessType=='1'){
                            $AccessType = "read";
                        }
                        else if($value->AccessType=='2'){
                            $AccessType = "readWrite";
                        }
                        else if($value->AccessType=='3'){
                            $AccessType = "noAccess";
                        } else if ($value->AccessType == '4') {
                        	$AccessType = "Owner";
                        }
                        $data[$key]->AccessType = $AccessType;
                    }
                }
                $message = "kpi sets retrived.";
            }else{
                $message = "error occured";
            }
            return $this->sendResponse($data, $message);
		}catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    
	/*
        Author : Prabir
        Date   : 26/03/2020
        Name   : updateKPIUserAccess
        Params : None
        Type   : POST
        Purpose: To save KPISet 
    */
    public function updateKPIUserAccess(Request $request)
    {
        try{
            $data = true;
            $userId = $this->user_data['UserID'];
            $inputJsonReq = $request->input ( 'inputJson' );
            $KPIs = $inputJsonReq ["KPIs"];
            // return json_encode($KPIs);
            if (! empty ( $KPIs ) && is_array ( $KPIs ) && count ( $KPIs ) > 0) {
            	foreach ( $KPIs as $key => $value ) {
            		if ($value ['AccessType'] == "read") {
            			$AccessType = 1;
            		} else if ($value ['AccessType'] == "readWrite") {
            			$AccessType = 2;
            		} else if ($value ['AccessType'] == "noAccess") {
            			$AccessType = 3;
            		} else if ($value ['AccessType'] == "Owner") {
            			$AccessType = 4;
            		}
            		$KPIs [$key] ['AccessType'] = $AccessType;
            	}
            } else {
            	// do nothing
            }
            $inputJsonReq ["KPIs"] = $KPIs;
            $inputJson = json_encode ( $inputJsonReq );
            
            $data = DB::select(' EXEC uspUpdateKPIUserAccess ?,?',array($userId,$inputJson));
            //print_r(array($clientId,$userId,$inputJson));
            return $this->sendResponse($data[0], $data[0]);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
	
	/*
        Author : Prabir
        Date   : 26/03/2020
        Name   : uspGetPersonaList
        Params : None
        Type   : GET
        Purpose: To save KPISet 
    */
	public function getPersonaList()
	{
		try{
			$ClientID = $this->user_data['ClientID'];
			$data = DB::select(' EXEC uspGetPersonaList ?', array($ClientID));
			if($data){
                $message = "persona retrived.";
            }else{
                $message = "error occured";
            }
            return $this->sendResponse($data, $message);
		}catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
	}
	
	/*
        Author : Prabir
        Date   : 26/03/2020
        Name   : uspGetUserList
        Params : None
        Type   : GET
        Purpose: To Get  User List 
    */
	public function getUserList()
	{
		try{
			$ClientID = $this->user_data['ClientID'];
			$data = DB::select(' EXEC uspGetUserList ?', array($ClientID));
			if($data){
                $message = "user lists retrived.";
            }else{
                $message = "error occured";
            }
            return $this->sendResponse($data, $message);
		}catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
	}


    /*
        Author : Prabir
        Date   : 17/03/2020
        Name   : saveKpiSet
        Params : None
        Type   : GET
        Purpose: To save KPISet 
    */
	public function getKpiSet($SetId)
	{
		try{
			$ClientID = $this->user_data['ClientID'];
			$data = DB::select(' EXEC uspGetKpiSetUserDetail ?,?', array($SetId, $ClientID));
			if($data){
                $message = "kpi sets retrived.";
            }else{
                $message = "No record found.";
            }
            return $this->sendResponse($data, $message);
		}catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
	}
	
	/*
        Author : Prabir
        Date   : 18/03/2020
        Name   : getBscCategory
        Params : None
        Type   : POST
        Purpose: To get Bsc Category 
    */
	public function getBscCategory()
	{
		try{
			$ClientID = $this->user_data['ClientID'];
			$CategoryType = "BSC";
			$data = DB::select(' EXEC uspListCategoryByType ?,?', array($ClientID, $CategoryType));
			if($data){
                $message = "Bsc Category retrived.";
            }else{
                $message = "error occured";
            }
            return $this->sendResponse($data, $message);
		}catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    
   /*
        Author : Neel
        Date   : 26/03/2020
        Name   : getListKpiByKpiSet
        Params : None
        Type   : GET
        Purpose: To get kpi list by KpiSetId
    */
    public function getListKpiByKpiSet($KpiSetId){
        
        try{
            $data = DB::select(' EXEC uspListKpiByKpiSet ?',array($KpiSetId));
            if($data){
                $message = "kpi data retrived.";
            }else{
                $message = "error occured";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    
    /*
     Author : Neel
     Date   : 31/03/2020
     Name   : getListCategoryByAuditType
     Params : None
     Type   : GET
     Purpose: To get list of category by Audit type
     */
    public function getListCategoryByAuditType(){
    	try{
    		$ClientID = $this->user_data['ClientID'];
    		$data = DB::select(' EXEC uspListCategoryByType ?,?',array($ClientID,"Audit"));
    		if($data){
    			$message = "audit type category data retrived.";
    		}else{
    			$message = "No record found";
    		}
    		return $this->sendResponse($data, $message);
    	}catch(\Exception $e){
    		return $this->sendError($e->getMessage());
    	}
    }
    /*
     Author : Abdul
     Date   : 08/05/2020
     Name   : getListCategoryByAuditType
     Params : None
     Type   : GET
     Purpose: To get list of category by Audit type
     */
    public function getAuditType(Request $request,$auditType){
        try{
            $ClientID = $this->user_data['ClientID'];
            $data = DB::select(' EXEC uspListCategoryByType ?,?',array($ClientID,$auditType));
            if($data){
                $message = "audit type category data retrived.";
            }else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
     Author : Neel
     Date   : 31/03/2020
     Name   : getUserByKpiSet
     Params : None
     Type   : GET
     Purpose: To get user by Kpi Set Id
     */
    public function getUserByKpiSet($KpiSetId){
    	try{
    		$ClientID = $this->user_data['ClientID'];
    		
    		$data = DB::select('EXEC uspGetUserDetailByKpiSet ?,?',array($KpiSetId, $ClientID));
    		
    		if($data){
    			$message = "audit type category data retrived.";
    		}else{
    			$message = "error occured";
    		}
    		return $this->sendResponse($data, $message);
    	}catch(\Exception $e){
    		return $this->sendError($e->getMessage());
    	}
    }
    /*
        Author : Abdul
        Date   : 10/06/2020
        Name   : getAccessKpiSet 
        Params : 
        Type   : GET
        Purpose: To get access kpi set
    */
    public function getAccessKpiSet(Request $request){
        try{
            $ClientID = $this->user_data['ClientID'];
            $UserID   = $this->user_data['UserID'];
            $data = DB::select(' EXEC uspListKPISet ?,?', array($ClientID,$UserID));
            if($data){
                $message = "kpi sets retrived.";
            }else{
                $message = "error occured";
            }
            return $this->sendResponse($data, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
}