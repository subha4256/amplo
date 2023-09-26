<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController as BaseController;
use DB;
use Validator;
use JWTAuth;

class AccessControlsController extends BaseController
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
        Author : Amit
        Date   : 21/10/2019
        Name   : changeDisableDate
        Params : None
        Type   : POST
        Purpose: To update disable date 
    */

     public function changeDisableDate(Request $request){
     	try{
     		$userId = $this->user_data['UserID'];
            $validator = Validator::make($request->all(), [
                'id' => 'required|numeric',
                'user_id' => 'required|numeric',
                'disable_date'      => 'required|date|date_format:d/m/Y|after:yesterday',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $id = $request->input('id');
            $user_id = $request->input('user_id');
            $disable_date = $request->input('disable_date');
            $data = DB::statement(' EXEC uspChangeDisableDate ?,?,?',array($id,$user_id,$disable_date));
             
            return $this->sendResponse($data, $message);
     	}catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
     }
}
