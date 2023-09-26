<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class ApproveController extends BaseController{

    public function __construct(){
        //config(['database.connections.sqlsrv.database' => 'master']);  
    }
    public function Approve($clientId){   
        
        try{
        //$connection = "sqlsrv_master";
        $connection  = env('DB_CONNECTION_MASTER'); 
        $db_name  = env('DB_DATABASE');   
        app('db')->setDefaultConnection($connection);
        
        //$login = "NewLogin".$clientId;
        $login = $db_name.$clientId;

        $password = '2xlt2hfjhf63XTN2n76gxyv3h2b3jjd5kcacmp5yymmi34hfnmka';
       
        Log::debug(DB::connection()->getDatabaseName());
        DB::statement("CREATE LOGIN ".$login." WITH PASSWORD = '".$password."'"); 

        $connection = env('DB_CONNECTION');
        app('db')->setDefaultConnection($connection);
      
        $data = array('success'=>"Success");
        return $this->sendResponse($data, "Success");   
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    public function ApproveOld($clientId){   
        //echo env('DB_DATABASE'); exit; 
        $login = "NewLogin".$clientId;
        $password = '2xlt2hfjhf63XTN2n76gxyv3h2b3jjd5kcacmp5yymmi34hfnmka';
        //$connection = env('DB_CONNECTION_MASTER');
        //app('db')->setDefaultConnection($connection);
        //echo app('db')->getDefaultConnection();
        //die;
        Log::debug(DB::connection()->getDatabaseName());
        DB::statement("CREATE LOGIN ".$login." WITH PASSWORD = '".$password."'"); 

        //$UserController = new UserController();
        //$UserController->getApprove($clientId);

        // //$data = DB::statement(' EXEC amplo.uspApproveClient ?,?,?,?,?',array($clientId, "", "", $login, $password)); 

        // //print_r($data);

        // $data['data']['login'] = $login;
        // $data['data']['password'] = $password;
        // $data['data']['clientID'] = $clientId;

        // return $this->sendResponse($data, "Success");
    }
    
    /**
     * @param $clientId
     * @author :
     * @desc : getApprove this functions helps to do the followings:
     * 		1. approve client
     * 		2. give permission
     * 		2. create procedures, tables
     * 		3. save prepopulated data
     */
    public function getApprove($clientId){
        //echo app('db')->getDefaultConnection();
        //die;
    	// $approve = new ApproveController();
    	// $response = $approve->Approve($clientId);
    	//echo env('DB_DATABASE');
    	//$user_data = JWTAuth::parseToken()->authenticate()->toArray();
    	//$userId = $user_data['UserID'];
        try{
    	$db_name  = env('DB_DATABASE');
    	// login information
    	//$login = "NewLogin".$clientId;
        $login = $db_name.$clientId;
        //echo $login;die;
    	$password = '2xlt2hfjhf63XTN2n76gxyv3h2b3jjd5kcacmp5yymmi34hfnmka';
    	
    	// get the client approval data
    	$client_approval_data = DB::statement(' EXEC amplo.uspApproveClient ?,?,?,?,?',array($clientId, "", "", $login, $password));
    	Log::debug("client_approval_data:".$client_approval_data);
    	
    	// exec permission proc
    	DB::statement(' EXEC amplo.uspPermissionProc ?',array($clientId));
    	
    	/* Creating Table(s) */
    	/**
    	 * To get objects
    	 * amplo.uspGetApproveClientTable
    	 *
    	 * To create object
    	 * amplo.uspApproveClientTable
    	 * 		@ClientId as int
    	 * 		@TableName as nvarchar(200)
    	 */
    	$tables_data = DB::select(' EXEC amplo.uspGetApproveClientTable ?',array($clientId));
    	Log::debug("tables_data:".json_encode($tables_data));
    	foreach($tables_data as $table_data){
    		//echo $clientId;
    		DB::statement(' EXEC amplo.uspApproveClientTable ?,?',array($clientId, $table_data->TableName));
    	}
    	
    	/* Creating Proc(s) */
    	/**
    	 * To get objects
    	 * amplo.uspGetApproveClientProc
    	 *
    	 * To create object
    	 * amplo.uspApproveClientProc
    	 * 		@ClientId as int
    	 * 		@ProcName as nvarchar(200)
    	 * 		@OriginalName as nvarchar(200)
    	 */
    	$procs_data = DB::select(' EXEC amplo.uspGetApproveClientProc ?', array ($clientId));
    	// Log::debug("procs_data:".json_encode($procs_data));
    	foreach ( $procs_data as $proc_data ) {
    		//echo $clientId;
    		DB::statement(' EXEC amplo.uspApproveClientProc ?,?,?',array($clientId, $proc_data->ProcName, $proc_data->OriginalName));
    	}
    	
    	DB::statement(' EXEC amplo.uspSavePrepopulatedData ?,?',array($clientId, 0));
        
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
}

?>