<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class GoalSettingController extends BaseController
{
	public $user_data = [];
    public $payload = [];
    public $dbUserName = "";
    public $dbUserPassword = "";
     /**
     * Instantiate a new GoalSettingController instance.
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
        Date   : 28/09/2019
        Name   : updateBMGoalSetting
        Params : None
        Type   : GET
        Purpose: To update BM Goal Setting
    */ 

    public function updateBMGoalSetting(Request $request){
        try{
        	$request = $request->all();
            /*$inputs = [
                'project_id' => $request->project_id
            ];

            $validator = Validator::make($inputs, [
                'project_id' => 'required|numeric'
            ]);*/

        
            $userId = $this->user_data['UserID'];
            $projectId = $request['project_id'];
                foreach($request['score_values'] as $v => $score){
                    $validator = Validator::make($score, [
                        'domain_id' => 'required|numeric',
                        'goal_setting' => 'required|numeric'
                    ]);
                    if ($validator->fails()) {
                        return $this->sendError('Validation Errors',$validator->errors());
                    }
                	
                	$domainId = $score['domain_id'];
                	$goalSetting = $score['goal_setting'];
                   
                	$data = DB::select(' EXEC uspUpdateBenchmarkingGoalSetting ?,?,?,?',array($userId,$projectId,$domainId,$goalSetting));	
                }
            return $this->sendResponse($data,'Benchmarking locking status updated successfully');
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        } 
    }   
    
}
