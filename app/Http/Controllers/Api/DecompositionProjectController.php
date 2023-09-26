<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Controllers\Api\BaseController as BaseController;
use DB;
use Validator;
use JWTAuth;

use App\Models\Common;
use PHPExcel; 
use PHPExcel_IOFactory;
use PHPExcel_Style_Fill;
use PHPExcel_Style_Border;
use PHPExcel_Style_Protection;
class DecompositionProjectController extends BaseController
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
        //$this->middleware('log', ['only' => ['fooAction', 'barAction']]);
        //$this->middleware('subscribed', ['except' => ['fooAction', 'barAction']]);
    }
    /*
        Author : Amit
        Date   : 17/09/2019
        Name   : getDecompositionUserProjects
        Params : None
        Type   : GET
        Purpose: To get decomposition user projects 
    */

    public function getDecompositionUserProjects(Request $request){
        try{
            $userId = $this->user_data['UserID'];
            $data = DB::select(' EXEC uspGetDecompositionUserProjects ?',array($userId));
                if(count($data) > 0){
                    $message = "decomposition projects retrieved.";
                }else{
                    $message = "No data found";
                }
                return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
	
	/*
        Author : Amit
        Date   : 17/09/2019
        Name   : getDecompositionUserProjects
        Params : None
        Type   : GET
        Purpose: To get decomposition user projects 
    */

    public function decompositionDuplicateProjects(Request $request){
        try{
			$validator = Validator::make($request->all(), [
                'project_id' => 'required|numeric',
                'project_name' => 'required',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $UserId = $this->user_data['UserID'];
			$ClientID = $this->user_data['ClientID'];
            $Project_id = $request->input('project_id');
            $Project_name = $request->input('project_name');
            $data = DB::select(' EXEC uspDuplicateProject ?,?,?',array($Project_id, $UserId, $Project_name));
			if(count($data) > 0){
				$message = "Project Duplicated successfully.";
			}else{
				$message = "No data found";
			}
			return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Amit
        Date   : 17/09/2019
        Name   : getDecompositionFunctionProject
        Params : @ProjectId
        Type   : GET
        Purpose: To get decomposition function projects 
    */

    public function getDecompositionFunctionProject(Request $request,$ProjectId,$versionId){
        try{
            $userId = $this->user_data['UserID'];
            //validations
            $input = [
                'ProjectId' => $ProjectId,
            ];

            $validator = Validator::make($input, [
                'ProjectId' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }

            $data = DB::select(' EXEC uspGetDecompositionFunctionProject ?,?,?',array($userId,$ProjectId,$versionId));
			if(count($data) > 0){
				$message = "decomposition function project data retrieved successfully.";
			}else{
				$message = "No data found";
			}
			return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }    

    /*
        Author : Amit
        Date   : 17/09/2019
        Name   : getDecompositionPhaseProject
        Params : @ProjectId
        Type   : GET
        Purpose: To get decomposition phase projects 
    */

    public function getDecompositionPhaseProject(Request $request,$ProjectId,$versionId){
        try{
            $userId = $this->user_data['UserID'];
            //validations
            $input = [
                'ProjectId' => $ProjectId,
            ];

            $validator = Validator::make($input, [
                'ProjectId' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }

            $data = DB::select(' EXEC uspGetDecompositionPhaseProject ?,?,?',array($userId,$ProjectId,$versionId));
            if(count($data) > 0){
                $message = "decomposition projects phases retrieved.";
            }else{
                $message = "No data found";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }    

     /*
        Author : Amit
        Date   : 17/09/2019
        Name   : getDecompositionLevel1Activities
        Params : @ProjectId
        Type   : GET
        Purpose: To get decomposition levpl 1 activities 
    */

    public function getDecompositionLevel1Activities(Request $request,$ProjectId,$versionId){
        try{
            $userId = $this->user_data['UserID'];
            $function_data = [];
            //validations
            $input = [
                'ProjectId' => $ProjectId,
            ];

            $validator = Validator::make($input, [
                'ProjectId' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $params = array(
                $userId,
                $ProjectId,
                $versionId
            );
            $data = DB::select(' EXEC uspGetDecompositionLevel1Activities ?,?,?',$params); 
            
            //print_r($newArray);
            //$function_phase_data = array();
            if(count($data) > 0){
                foreach ($data as $row)
                {
                    $newArray['function'.$row->FunctionID]['phase'.$row->PhaseID][] = array(
                        'DecompositionProcessLevel1ID'=>$row->DecompositionProcessLevel1ID, 
                        'GridViewLocationID'=>$row->GridViewLocationID,
                        'ProcessLevel1Name'=>$row->ProcessLevel1Title,
                        'Status' => $row->Status,
                        'function_id'=>$row->FunctionID,
                        'phase_id' => $row->PhaseID,
                        'style_id' => $row->StyleID,
                        'style_name' => $row->StyleName,
                        'TemplateFunctPhaseStyleAssignmentID' => $row->TemplateFunctPhaseStyleAssignmentID
                    );
                }

                // foreach($data as $k => $value){
                //     $phase_data['DecompositionProcessLevel1ID'] = $value->DecompositionProcessLevel1ID;
                //     $phase_data['GridViewLocationID'] = $value->GridViewLocationID;
                //     $phase_data['ProcessLevel1Name'] = $value->ProcessLevel1Title;
                //     $phase_data['Status'] = $value->Status;
                //     $phase_data['function_id'] = $value->FunctionID;
                //     $phase_data['phase_id'] = $value->PhaseID;
                //     $all_data[] = $phase_data;
                // }
                
                // //sort functions by order
                // usort($all_data, array($this,'sortByFunction'));
                
                // foreach($all_data as $data){
                //     $function_data['f'.$data['function_id']][] = $data;
                // }
                
                // foreach($function_data as $k => $phases){
                //     usort($phases, array($this,'sortByPhase'));
                //     foreach($phases as $phase){
                //         $fp_data[$k][$phase['phase_id']][] = $phase;
                //     }      
                // }
                // //create json response
                // $f_id = 1;
                
                // foreach($fp_data as $k => $p_data){
                //     $p_id = 1;
                //     foreach($p_data as $p => $value){
                //         $response_data['function'.$f_id]['phase'.$p_id] = $value;
                //         $p_id++;
                //     }
                //     $f_id++;
                // }
                
                // //sort by location
                // foreach($response_data as $key => $r_data){
                //     foreach($r_data as $pk => $v_data){
                //         usort($v_data, array($this,'sortByLocation'));
                //             $response[$key][$pk] = $v_data;
                //     }  
                // }
                $response = $newArray;
                $message = "decomposition level 1 data retrieved.";
            }else{
                $response= (Object)[];
                $message = "No data found";
            }
            return $this->sendResponse($response, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 
    /*
        Author : Amit
        Date   : 19/09/2019
        Name   : sortByFunction
        Params : @a,@b
        Purpose: sort values 
    */    
    function sortByFunction($a, $b) {
        return $a['function_id'] - $b['function_id'];
    }
    /*
        Author : Amit
        Date   : 19/09/2019
        Name   : sortByPhase
        Params : @a,@b
        Purpose: sort values 
    */    
    function sortByPhase($a, $b) {
        return $a['phase_id'] - $b['phase_id'];
    }
    /*
        Author : Amit
        Date   : 19/09/2019
        Name   : sortByLocation
        Params : @a,@b
        Purpose: sort values 
    */   
    function sortByLocation($a, $b) {
        return $a['GridViewLocationID'] - $b['GridViewLocationID'];
    }
     /*
        Author : Amit
        Date   : 19/09/2019
        Name   : getDecompositionActivityStatusSummary
        Params : @@ProjectID
        Type   : GET
        Purpose: To get decomposition activity status summary 
    */

    public function getDecompositionActivityStatusSummary(Request $request,$ProjectId,$versionId){
        try{
            $userId = $this->user_data['UserID'];
            $response_data = [];
            $data = DB::select(' EXEC uspGetDecompositionActivityStatusSummary ?,?,?',array($userId,$ProjectId,$versionId)); 
            //echo '<pre>';print_r($data);die;
            if(count($data) > 0){
                $i = 0;
                 $res_data = [];
                foreach($data as $value){
                    foreach($value as $key=>$val) {
                        $res_data['status'] = $key;
                        $res_data['count'] = $val;
                        $response_data[] = $res_data;
                        $status[$key]  = $key;
                      }
                   // $status[$v]  = $value->Status;
                    // $i++;
                    //     if($i == 3){
                    //         break;
                    //     }
                }
               array_multisort($status, SORT_DESC, $response_data);
               $message = "decomposition activity status summary retrieved.";
            }else{
                $message = "No data found";
            }
            return $this->sendResponse($response_data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }   
    /*
        Author : Amit
        Date   : 18/10/2019
        Name   : addDecompositionProcessLevel1Activity
        Params : None
        Type   : POST
        Purpose: To add level 1 activity 
    */
     public function addDecompositionProcessLevel1Activity(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'project_id' => 'required|numeric',
                'process_level_title' => 'required|max:100',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $response_data = [];
            $userId = $this->user_data['UserID'];
            $project_id = $request->input('project_id');
            $process_level_id = $request->input('process_level_id');
            $process_level_title = $request->input('process_level_title');
            if($process_level_id != -1)
            {
                $data = DB::select(' EXEC uspUpdateDecompositionLevel1Title ?,?',array($process_level_id,$process_level_title));
            }else{
                $data = DB::select(' EXEC uspAddDecompositionProcessLevel1Activity ?,?,?',array($userId,$project_id,$process_level_title));
            }
           
            if($data){
                $response_data['DecompositionProcessLevel1ID'] = $data[0]->ProcessLevel1ID;
                $response_data['ProcessLevel1Title'] = $process_level_title;
                $response_data['GridViewLocationID'] = -1;
                $response_data['GridVViewLocationFlag'] = 0;
                $response_data['process_level_id'] = $process_level_id;
                $message = "level one activity added.";
            }else{
                $response_data = (Object)[];
                $message = "An error occured";
            }
                
            return $this->sendResponse($response_data, $message);
            
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
        
     }   

    /*
        Author : Amit
        Date   : 20/09/2019
        Name   : getDecompositionActivityBank
        Params : @@ProjectID
        Type   : GET
        Purpose: To get decomposition activity status summary 
    */

    public function getDecompositionActivityBank(Request $request,$ProjectId,$versionId){
        try{
            $userId = $this->user_data['UserID'];
            //validations
            $input = [
                'ProjectId' => $ProjectId,
            ];

            $validator = Validator::make($input, [
                'ProjectId' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }

            $data = DB::select(' EXEC uspGetDecompositionActivityBank ?,?',array($ProjectId,$versionId)); 
            if(count($data) > 0){
                $message = "decomposition activity bank retrieved.";
            }else{
                $message = "No data found";
            }
            return $this->sendResponse($data, $message);

        }catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Amit
        Date   : 20/09/2019
        Name   : updateDecompositionLevelLocation
        Params : N/A
        Type   : POST
        Purpose: To update decomposition level location 
    */

    public function updateDecompositionLevelLocation(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'project_id' => 'required|numeric',
                'process_level_id' => 'required|numeric',
                'function_id' => 'required|numeric',
                'phase_id' => 'required|numeric',
                'location_id' => 'required|numeric',
                'location_flag' => 'required|numeric',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $project_id = $request->input('project_id');
            $process_level_id = $request->input('process_level_id');
            $function_id = $request->input('function_id');
            $phase_id = $request->input('phase_id');
            $location_id = $request->input('location_id');
            $location_flag = $request->input('location_flag');
            $data = DB::statement(' EXEC uspUpdateDecompositionLevel1Location ?,?,?,?,?,?',array($project_id,$process_level_id,$function_id,$phase_id,$location_id,$location_flag));
                if($data){
                    $message = "location data updated.";
                }else{
                    $message = "An error occured";
                }
                
            return $this->sendResponse($data, $message);
            
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }

    }
    
            
     /*
        Author : Amit
        Date   : 03/10/2019
        Name   : getDecompositionProcessLevel1Connected
        Params : @ProjectID
        Type   : GET
        Purpose: To get decomposition activity status summary 
    */
    public function getDecompositionProcessLevel1Connected(Request $request,$ProjectID,$ProcessLevelId,$FunctionId,$PhaseId,$versionId){
        try{
            $userId = $this->user_data['UserID'];
            /*$input = [
                'FunctionId' => $FunctionId,
                'PhaseId' => $PhaseId
            ];

            $validator = Validator::make($input, [
                'FunctionId' => 'required|numeric',
                'PhaseId' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }*/

            $data = DB::select(' EXEC uspGetDecompositionProcessLevel1Connected ?,?,?,?,?',array($userId,$ProjectID,$FunctionId,$PhaseId,$versionId)); 
            if(count($data) > 0){
                $connectedProcess = [];
                foreach( $data as $key=>$val ){
                    if($val->DecompositionProcessLevel1ID!=$ProcessLevelId){
                        $connectedProcess[] = $val;            
                    }
                }
                $message = "decomposition level 1 connected data retrieved.";
                return $this->sendResponse($connectedProcess, $message);
            }else{
                $message = "No data found";
                return $this->sendResponse($data, $message);
            }
        }catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }    
    }

    /*
        Author : Amit
        Date   : 03/10/2019
        Name   : getDecompositionProcessLevel1Connected
        Params : @ProjectID
        Type   : GET
        Purpose: To get decomposition activity status summary 
    */
    public function getDecompositionProcessLevel2Tasks(Request $request,$ProjectId,$ProcessLevelId){
        try{
            $userId = $this->user_data['UserID'];
            $data = DB::select(' EXEC uspGetDecompositionProcessLevel2Tasks ?,?,?',array($userId,$ProjectId,$ProcessLevelId));
           
            if(count($data) > 0){
                $message = "decomposition level two tasks retrieved.";
            }else{
                $message = "No data found";
            }
            return $this->sendResponse($data, $message);
            
        }catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }    
    }

    /*
        Author : Amit
        Date   : 03/10/2019
        Name   : getDecompositionProcessLevel1Connected
        Params : @ProjectID
        Type   : GET
        Purpose: To get decomposition activity status summary 
    */
    public function getDecompositionTreeView(Request $request,$project_id,$process_id,$versionId,$projectVersionId){
        try{
            $userId = $this->user_data['UserID'];
            $status = 1;
            $data = DB::select(' EXEC uspGetDecompositionTreeView ?,?,?,?',array($project_id,$process_id,$versionId,$projectVersionId));
            $response['processes'] = [];
            $response['scores'] = [];
            $response['status'] = 1;
            $scores =[];
            if(count($data) > 0){
                $my_array = [];
                foreach($data as $l => $level){

                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID=='' && $level->ProcessLevel3ID=='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){
                        $status = $level->Status;
                        $paintPointsData = DB::select(' EXEC uspGetDecompositionPainPoint ?,?',array($level->ProcessLevel1ID,$level->ProcessLevel));

                        $paintpoints = array();
                        if(count($paintPointsData)>0){
                            foreach ($paintPointsData as $k1 => $v1) {
                               $paintpoints[$k1]['id'] = $v1->DecompositionProcessLevel1PainPointID;
                               $paintpoints[$k1]['paintpoint_title'] = $v1->PaintPointTitle;
                                if(isset($v1->DoEncode) && $v1->DoEncode!=0){
                                    $paintpoints[$k1]['paintpoint_description'] = json_decode($v1->PaintPointDescription,true);
                                }else{
                                    $paintpoints[$k1]['paintpoint_description'] =$v1->PaintPointDescription;
                                }
                               $paintpoints[$k1]['paintpoint_description_raw'] = $v1->PainPointDescPlainText;
                            }
                        }
                        $descriptionComment = DB::select(' EXEC uspGetDecompositionDescription ?,?',array($level->ProcessLevel1ID,$level->ProcessLevel));
                         
                        $description     = "";
                        $comment         = "";
                        $description_raw = "";
                        $comment_raw     = "";
                        if(count($descriptionComment)>0){
                            if(isset($descriptionComment[0]->DoEncode) && $descriptionComment[0]->DoEncode!=0){
                                $description = json_decode($descriptionComment[0]->Description,true);
                                $comment     = json_decode($descriptionComment[0]->Comment,true);
                            }else{
                                $description = $descriptionComment[0]->Description;
                                $comment     = $descriptionComment[0]->Comment;
                            }
                            $description_raw = $descriptionComment[0]->DescriptionPlainText;
                            $comment_raw     = $descriptionComment[0]->CommentPlainText;
                        }
                        //echo json_encode(json_decode($comment,true));die;
                        $my_array = array(
                           "ProcessLevel" => $level->ProcessLevel,
                           "number" => $level->ProcessLevelID,
                           "text" => $level->ProcessLevelTitle,
                           "owner" => $level->Owner,
                           "country" => $level->CountrySpecific,
                           "priority" => $level->Priority,
                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                           "id" => $level->ProcessLevel1ID,
                           "status" => $level->Status,
                           "paintpoints"=>$paintpoints,
                           "description"=>$description,
                           "comment"=>$comment,
                           "description_raw"=>$description_raw,
                           "comment_raw"=>$comment_raw
                        );
                    }
                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID=='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){
                        $paintPointsData = DB::select(' EXEC uspGetDecompositionPainPoint ?,?',array($level->ProcessLevel2ID,$level->ProcessLevel));
                        $paintpoints = array();
                        if(count($paintPointsData)>0){
                            foreach ($paintPointsData as $k2 => $v2) {
                               $paintpoints[$k2]['id'] = $v2->DecompositionProcessLevel2PainPointID;
                               $paintpoints[$k2]['paintpoint_title'] = $v2->PaintPointTitle;
                                if(isset($v1->DoEncode) && $v1->DoEncode!=0){
                                    $paintpoints[$k2]['paintpoint_description'] = json_decode($v2->PaintPointDescription,true);
                                }else{
                                    $paintpoints[$k2]['paintpoint_description'] = $v2->PaintPointDescription;
                                }
                               $paintpoints[$k2]['paintpoint_description_raw'] = $v2->PainPointDescPlainText;
                            }
                        }
                        $descriptionComment = DB::select(' EXEC uspGetDecompositionDescription ?,?',array($level->ProcessLevel2ID,$level->ProcessLevel));
                        $description = "";
                        $comment       = "";
                        $description_raw = "";
                        $comment_raw     = "";
                        if(count($descriptionComment)>0){
                            if(isset($descriptionComment[0]->DoEncode) && $descriptionComment[0]->DoEncode!=0){
                                $description = json_decode($descriptionComment[0]->Description,true);
                                $comment     = json_decode($descriptionComment[0]->Comment,true);
                            }else{
                                $description = $descriptionComment[0]->Description;
                                $comment     = $descriptionComment[0]->Comment;
                            }
                            $description_raw = $descriptionComment[0]->DescriptionPlainText;
                            $comment_raw     = $descriptionComment[0]->CommentPlainText;
                        }
                        $my_array['child'][] = array(
                           "ProcessLevel" => $level->ProcessLevel,
                           "number" => $level->ProcessLevelID,
                           "text" => $level->ProcessLevelTitle,
                           "owner" => $level->Owner,
                           "country" => $level->CountrySpecific,
                           "priority" => $level->Priority,
                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                           "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                           "id" => $level->ProcessLevel2ID,
                           "paintpoints"=>$paintpoints,
                           "description"=>$description,
                           "comment"=>$comment,
                           "description_raw"=>$description_raw,
                           "comment_raw"=>$comment_raw,
                           'child' => []
                        );
                    }
                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){

                        foreach ($my_array['child'] as $key => $value) {
                            if($value['ProcessLevel2ID']==$level->ProcessLevel2ID){
                                $paintPointsData = DB::select(' EXEC uspGetDecompositionPainPoint ?,?',array($level->ProcessLevel3ID,$level->ProcessLevel));
                                $paintpoints = array();
                                if(count($paintPointsData)>0){
                                    foreach ($paintPointsData as $k3 => $v3) {
                                        $paintpoints[$k3]['id'] = $v3->DecompositionProcessLevel3PainPointID;
                                        $paintpoints[$k3]['paintpoint_title'] = $v3->PaintPointTitle;
                                        if(isset($v3->DoEncode) && $v3->DoEncode!=0){
                                            $paintpoints[$k3]['paintpoint_description'] = json_decode($v3->PaintPointDescription,true);
                                        }else{
                                            $paintpoints[$k3]['paintpoint_description'] = $v3->PaintPointDescription;
                                        }
                                       $paintpoints[$k3]['paintpoint_description_raw'] = $v3->PainPointDescPlainText;
                                    }
                                }
                                $descriptionComment = DB::select(' EXEC uspGetDecompositionDescription ?,?',array($level->ProcessLevel3ID,$level->ProcessLevel));
                                $description = "";
                                $comment     = "";
                                $description_raw = "";
                                $comment_raw     = "";
                                if(count($descriptionComment)>0){
                                    if(isset($descriptionComment[0]->DoEncode) && $descriptionComment[0]->DoEncode!=0){
                                        $description = json_decode($descriptionComment[0]->Description,true);
                                        $comment     = json_decode($descriptionComment[0]->Comment,true);
                                    }else{
                                        $description = $descriptionComment[0]->Description;
                                        $comment     = $descriptionComment[0]->Comment;   
                                    }
                                    $description_raw = $descriptionComment[0]->DescriptionPlainText;
                                    $comment_raw     = $descriptionComment[0]->CommentPlainText;
                                }
                                $my_array['child'][$key]['child'][] = array(
                                    "ProcessLevel" => $level->ProcessLevel,
                                   "number" => $level->ProcessLevelID,
                                   "text" => $level->ProcessLevelTitle,
                                   "owner" => $level->Owner,
                                   "country" => $level->CountrySpecific,
                                   "priority" => $level->Priority,
                                   "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                   "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                   "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                   "id" => $level->ProcessLevel3ID,
                                   "paintpoints"=>$paintpoints,
                                   "description"=>$description,
                                   "comment"=>$comment,
                                   "description_raw"=>$description_raw,
                                   "comment_raw"=>$comment_raw,
                                   'child' => []
                                );
                            }
                        }
                    }
                     if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID!='' && $level->ProcessLevel5ID==''){
                        foreach ($my_array['child'] as $key=>$val) {
                            foreach($val['child'] as $k=>$v){
                                if($v['ProcessLevel3ID']==$level->ProcessLevel3ID){
                                    $paintPointsData = DB::select(' EXEC uspGetDecompositionPainPoint ?,?',array($level->ProcessLevel4ID,$level->ProcessLevel));
                                    $paintpoints = array();
                                    if(count($paintPointsData)>0){
                                        foreach ($paintPointsData as $k4 => $v4) {
                                            $paintpoints[$k4]['id'] = $v4->DecompositionProcessLevel4PainPointID;
                                            $paintpoints[$k4]['paintpoint_title'] = $v4->PaintPointTitle;
                                            if(isset($v4->DoEncode) && $v4->DoEncode!=0){
                                                $paintpoints[$k4]['paintpoint_description'] = json_decode($v4->PaintPointDescription,true);
                                            }else{
                                                $paintpoints[$k4]['paintpoint_description'] = $v4->PaintPointDescription;
                                            }
                                            $paintpoints[$k4]['paintpoint_description_raw'] = $v4->PainPointDescPlainText;
                                        }
                                    }
                                    $descriptionComment = DB::select(' EXEC uspGetDecompositionDescription ?,?',array($level->ProcessLevel4ID,$level->ProcessLevel));
                                    $description = "";
                                    $comment     = "";
                                    $description_raw = "";
                                    $comment_raw     = "";
                                    if(count($descriptionComment)>0){
                                        if(isset($descriptionComment[0]->DoEncode) && $descriptionComment[0]->DoEncode!=0){
                                            $description = json_decode($descriptionComment[0]->Description,true);
                                            $comment     = json_decode($descriptionComment[0]->Comment,true);
                                        }else{
                                            $description = $descriptionComment[0]->Description;
                                            $comment     = $descriptionComment[0]->Comment;        
                                        }
                                        $description_raw = $descriptionComment[0]->DescriptionPlainText;
                                        $comment_raw     = $descriptionComment[0]->CommentPlainText;

                                    }
                                    $val['child'][$k]['child'][] =array(
                                        "ProcessLevel" => $level->ProcessLevel,
                                       "number" => $level->ProcessLevelID,
                                       "text" => $level->ProcessLevelTitle,
                                       "owner" => $level->Owner,
                                       "country" => $level->CountrySpecific,
                                       "priority" => $level->Priority,
                                       "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                       "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                       "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                       "ProcessLevel4ID"=>$level->ProcessLevel4ID,
                                       "id" => $level->ProcessLevel4ID,
                                       "paintpoints"=>$paintpoints,
                                       "description"=>$description,
                                       "comment"=>$comment,
                                       "description_raw"=>$description_raw,
                                        "comment_raw"=>$comment_raw,
                                       'child' => []
                                    );
                                }
                            }
                            $my_array['child'][$key] = $val;
                        }
                     }

                     if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID!='' && $level->ProcessLevel5ID!=''){

                        foreach ($my_array['child'] as $key=>$val) {
                            foreach($val['child'] as $k=>$v){
                                 foreach($v['child'] as $kl=>$vl){
                                    if($vl['ProcessLevel4ID']==$level->ProcessLevel4ID){
                                        $paintPointsData = DB::select(' EXEC uspGetDecompositionPainPoint ?,?',array($level->ProcessLevel5ID,$level->ProcessLevel));
                                        $paintpoints = array();
                                        if(count($paintPointsData)>0){
                                            foreach ($paintPointsData as $k5 => $v5) {
                                                $paintpoints[$k5]['id'] = $v5->DecompositionProcessLevel5PainPointID;
                                                $paintpoints[$k5]['paintpoint_title'] = $v5->PaintPointTitle;
                                                if(isset($v5->DoEncode) && $v5->DoEncode!=0){
                                                    $paintpoints[$k5]['paintpoint_description'] = json_decode($v5->PaintPointDescription,true);
                                                }else{
                                                    $paintpoints[$k5]['paintpoint_description'] = $v5->PaintPointDescription;
                                                }
                                                $paintpoints[$k5]['paintpoint_description_raw'] = $v5->PainPointDescPlainText;
                                            }
                                        }
                                        $descriptionComment = DB::select(' EXEC uspGetDecompositionDescription ?,?',array($level->ProcessLevel5ID,$level->ProcessLevel));
                                        $description = "";
                                        $comment     = "";
                                        $description_raw = "";
                                        $comment_raw     = "";
                                        if(count($descriptionComment)>0){
                                            if(isset($descriptionComment[0]->DoEncode) && $descriptionComment[0]->DoEncode!=0){
                                                $description = json_decode($descriptionComment[0]->Description,true);
                                                $comment     = json_decode($descriptionComment[0]->Comment,true);
                                            }else{
                                                $description = $descriptionComment[0]->Description;
                                                $comment     = $descriptionComment[0]->Comment;
                                            }
                                            $description_raw = $descriptionComment[0]->DescriptionPlainText;
                                            $comment_raw     = $descriptionComment[0]->CommentPlainText;
                                        }
                                        $v['child'][$kl]['child'][] =array(
                                            "ProcessLevel" => $level->ProcessLevel,
                                           "number" => $level->ProcessLevelID,
                                           "text" => $level->ProcessLevelTitle,
                                           "owner" => $level->Owner,
                                           "country" => $level->CountrySpecific,
                                           "priority" => $level->Priority,
                                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                           "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                           "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                           "ProcessLevel4ID"=>$level->ProcessLevel4ID,
                                           "ProcessLevel5ID"=>$level->ProcessLevel5ID,
                                           "id" => $level->ProcessLevel5ID,
                                           "paintpoints"=>$paintpoints,
                                           "description"=>$description,
                                           "comment"=>$comment,
                                           "description_raw"=>$description_raw,
                                            "comment_raw"=>$comment_raw
                                        );
                                    }
                                }
                                $val['child'][$k] = $v;
                            }
                            $my_array['child'][$key] = $val;
                        }
                     }
                     //get scores
                    //echo "<pre>";print_r($level);echo "<br>";//die;
                    if(!empty($level->ScoreCriteria1) ){

                        if($level->ProcessLevel == 1){
                            $scores[$l]['id'] = $level->ProcessLevel1ID;
                            $scores[$l]['ProcessLevel'] = 1;
                        }elseif($level->ProcessLevel == 2){
                            $scores[$l]['id'] = $level->ProcessLevel2ID;
                            $scores[$l]['ProcessLevel'] = 2;
                        }elseif($level->ProcessLevel == 3){
                            $scores[$l]['id'] = $level->ProcessLevel3ID;
                            $scores[$l]['ProcessLevel'] = 3;
                        }elseif($level->ProcessLevel == 4){
                            $scores[$l]['id'] = $level->ProcessLevel4ID;
                            $scores[$l]['ProcessLevel'] = 4;
                        }elseif($level->ProcessLevel == 5){
                            $scores[$l]['id'] = $level->ProcessLevel5ID;
                            $scores[$l]['ProcessLevel'] = 5;
                        }
                        //print_r($scores);die;
                        $scoreArr = [
                            !empty($level->ScoreCriteria1) ? round($level->ScoreCriteria1, 1) : 0,
                            !empty($level->ScoreCriteria2) ? round($level->ScoreCriteria2, 1) : 0,
                            !empty($level->ScoreCriteria3) ? round($level->ScoreCriteria3, 1) : 0,
                            !empty($level->ScoreCriteria4) ? round($level->ScoreCriteria4, 1) : 0,
                            !empty($level->ScoreCriteria5) ? round($level->ScoreCriteria5, 1) : 0,
                            !empty($level->ScoreCriteria6) ? round($level->ScoreCriteria6, 1) : 0,
                            !empty($level->ScoreCriteria7) ? round($level->ScoreCriteria7, 1) : 0,
                            !empty($level->ScoreCriteria8) ? round($level->ScoreCriteria8, 1) : 0,
                            !empty($level->ScoreCriteria9) ? round($level->ScoreCriteria9, 1) : 0,
                            !empty($level->ScoreCriteria10)? round($level->ScoreCriteria10, 1) : 0
                        ];
                        //$scoreArr = [5,4,3,5];
                       
                        //$remove = array('.00');
                        $remove = array('0');
                        $scoreArr1 = array_diff($scoreArr, $remove); 
                        $scores[$l]['scoreArr'] = $scoreArr1;
                       
                    }
                    
                }
                //echo "<pre>";print_r($my_array);echo "<br>";die;
                $response['processes'][] = $my_array;
                $response['scores'] = array_values($scores);
                $response['status'] = $status;
                $message = "decomposition level two tasks retrieved.";
                return $this->sendResponse($response, $message);
            }
        }catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }  
    }
    
    /*
        Author : Prabir
        Date   : 07/01/2020
        Name   : getDecompositionTemplateTreeView
        Params : @ProjectID
        Type   : GET
        Purpose: To get decomposition activity status summary 
    */
    public function getDecompositionTemplateTreeView(Request $request,$template_id,$process_id){
        try{
            $userId = $this->user_data['UserID'];
            $status = 1;
            $data = DB::select(' EXEC Amplo.uspGetDecompositionTemplateTreeView ?,?',array($template_id,$process_id)); 
            $response['processes'] = [];
            $response['scores'] = [];
            $response['status'] = 1;
            $scores =[];
            if(count($data) > 0){
                $my_array = [];
                foreach($data as $l => $level){

                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID=='' && $level->ProcessLevel3ID=='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){
                       $my_array = array(
                           "ProcessLevel" => $level->ProcessLevel,
                           "number" => $level->ProcessLevelID,
                           "text" => $level->ProcessLevelTitle,
                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                           "id" => $level->ProcessLevel1ID,

                        );
                    }
                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID=='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){

                        $my_array['child'][] = array(
                           "ProcessLevel" => $level->ProcessLevel,
                           "number" => $level->ProcessLevelID,
                           "text" => $level->ProcessLevelTitle,
                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                           "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                           "id" => $level->ProcessLevel2ID,
                           'child' => []
                        );
                    }
                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){

                        foreach ($my_array['child'] as $key => $value) {
                            if($value['ProcessLevel2ID']==$level->ProcessLevel2ID){
                                $my_array['child'][$key]['child'][] = array(
                                    "ProcessLevel" => $level->ProcessLevel,
                                   "number" => $level->ProcessLevelID,
                                   "text" => $level->ProcessLevelTitle,
                                   "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                   "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                   "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                   "id" => $level->ProcessLevel3ID,
                                   'child' => []
                                );
                            }
                        }
                    }
                     if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID!='' && $level->ProcessLevel5ID==''){
                        foreach ($my_array['child'] as $key=>$val) {
                            foreach($val['child'] as $k=>$v){
                                if($v['ProcessLevel3ID']==$level->ProcessLevel3ID){
                                    $val['child'][$k]['child'][] =array(
                                        "ProcessLevel" => $level->ProcessLevel,
                                       "number" => $level->ProcessLevelID,
                                       "text" => $level->ProcessLevelTitle,
                                       "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                       "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                       "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                       "ProcessLevel4ID"=>$level->ProcessLevel4ID,
                                       "id" => $level->ProcessLevel4ID,
                                       'child' => []
                                    );
                                }
                            }
                            $my_array['child'][$key] = $val;
                        }
                     }

                     if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID!='' && $level->ProcessLevel5ID!=''){

                        foreach ($my_array['child'] as $key=>$val) {
                            foreach($val['child'] as $k=>$v){
                                 foreach($v['child'] as $kl=>$vl){
                                    if($vl['ProcessLevel4ID']==$level->ProcessLevel4ID){
                                        $v['child'][$kl]['child'][] =array(
                                            "ProcessLevel" => $level->ProcessLevel,
                                           "number" => $level->ProcessLevelID,
                                           "text" => $level->ProcessLevelTitle,
                                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                           "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                           "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                           "ProcessLevel4ID"=>$level->ProcessLevel4ID,
                                           "ProcessLevel5ID"=>$level->ProcessLevel5ID,
                                           "id" => $level->ProcessLevel5ID
                                        );
                                    }
                                }
                                $val['child'][$k] = $v;
                            }
                            $my_array['child'][$key] = $val;
                        }
                     }
                     //get scores
                   
                    if($level->LeafNodeFlag == 1){

                        if($level->ProcessLevel == 1){
                            $scores[$l]['id'] = $level->ProcessLevel1ID;
                            $scores[$l]['ProcessLevel'] = 1;
                        }elseif($level->ProcessLevel == 2){
                            $scores[$l]['id'] = $level->ProcessLevel2ID;
                            $scores[$l]['ProcessLevel'] = 2;
                        }elseif($level->ProcessLevel == 3){
                            $scores[$l]['id'] = $level->ProcessLevel3ID;
                            $scores[$l]['ProcessLevel'] = 3;
                        }elseif($level->ProcessLevel == 4){
                            $scores[$l]['id'] = $level->ProcessLevel4ID;
                            $scores[$l]['ProcessLevel'] = 4;
                        }elseif($level->ProcessLevel == 5){
                            $scores[$l]['id'] = $level->ProcessLevel5ID;
                            $scores[$l]['ProcessLevel'] = 5;
                        }
                        //$scoreArr = [5,4,3,5];
                       
                        //$remove = array('.00');
                        $remove = array('0');
                       
                    }
                    
                }
                $response['processes'][] = $my_array;
                $response['status'] = $status;
                $message = "decomposition level two tasks retrieved.";
                return $this->sendResponse($response, $message);
            }
        }catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }  
    }
    
    /*
        Author : Amit
        Date   : 03/10/2019
        Name   : getDecompositionTreeViewHeatMap
        Params : @ProjectID,@ProcessLevel1ID,@VersionId,@ProjectVersionId
        Type   : GET
        Purpose: To get tree view heat map
    */

    public function getDecompositionTreeViewHeatMap(Request $request,$project_id,$process_id,$versionId,$projectVersionId){
        try{
            $userId = $this->user_data['UserID'];
            $data = DB::select(' EXEC uspGetDecompositionTreeViewHeatMapScores ?,?,?,?',array($project_id,$process_id,$versionId,$projectVersionId));

            $response['processes'] = [];
            $response['scores'] = [];
            $response['status'] = 1;
            $scores =[];
            if(count($data) > 0){
                $my_array = [];
                foreach($data as $l => $level){
                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID=='' && $level->ProcessLevel3ID=='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){
                        $status = $level->Status;
                        $paintPointsData = DB::select(' EXEC uspGetDecompositionPainPoint ?,?',array($level->ProcessLevel1ID,$level->ProcessLevel));
                        $paintpoints = array();
                        if(count($paintPointsData)>0){
                            foreach ($paintPointsData as $k1 => $v1) {
                                $paintpoints[$k1]['id'] = $v1->DecompositionProcessLevel1PainPointID;
                                $paintpoints[$k1]['paintpoint_title'] = $v1->PaintPointTitle;
                                if(isset($v1->DoEncode) && $v1->DoEncode!=0){
                                    $paintpoints[$k1]['paintpoint_description'] = json_decode($v1->PaintPointDescription,true);
                                }else{
                                    $paintpoints[$k1]['paintpoint_description'] = $v1->PaintPointDescription;
                                }
                                $paintpoints[$k1]['paintpoint_description_raw'] = $v1->PainPointDescPlainText;
                            }
                        }
                        $descriptionComment = DB::select(' EXEC uspGetDecompositionDescription ?,?',array($level->ProcessLevel1ID,$level->ProcessLevel));
                        $description = "";
                        $comment       = "";
                        $description_raw = "";
                        $comment_raw     = "";
                        if(count($descriptionComment)>0){
                            if(isset($descriptionComment[0]->DoEncode) && $descriptionComment[0]->DoEncode!=0){
                                $description = json_decode($descriptionComment[0]->Description,true);
                                $comment     = json_decode($descriptionComment[0]->Comment,true);
                            }else{
                                $description = $descriptionComment[0]->Description;
                                $comment     = $descriptionComment[0]->Comment;
                            }
                            $description_raw = $descriptionComment[0]->DescriptionPlainText;
                            $comment_raw     = $descriptionComment[0]->CommentPlainText;
                        }
                       $my_array = array(
                           "ProcessLevel" => $level->ProcessLevel,
                           "number" => $level->ProcessLevelID,
                           "text" => $level->ProcessLevelTitle,
                           "owner" => $level->Owner,
                           "country" => $level->CountrySpecific,
                           "priority" => $level->Priority,
                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                           "id" => $level->ProcessLevel1ID,
                           "TotalAvgScore" => floatval($level->TotalAvgScore1),
                           "status" => $level->Status,
                           "paintpoints"=>$paintpoints,
                           "description"=>$description,
                           "comment"=>$comment,
                           "description_raw"=>$description_raw,
                            "comment_raw"=>$comment_raw,
                        );
                    }

                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID=='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){
                        $paintPointsData = DB::select(' EXEC uspGetDecompositionPainPoint ?,?',array($level->ProcessLevel2ID,$level->ProcessLevel));
                        $paintpoints = array();
                        if(count($paintPointsData)>0){
                            foreach ($paintPointsData as $k2 => $v2) {
                                $paintpoints[$k2]['id'] = $v2->DecompositionProcessLevel2PainPointID;
                                $paintpoints[$k2]['paintpoint_title'] = $v2->PaintPointTitle;
                                if(isset($v2->DoEncode) && $v2->DoEncode!=0){
                                    $paintpoints[$k2]['paintpoint_description'] = json_decode($v2->PaintPointDescription,true);
                                }else{
                                    $paintpoints[$k2]['paintpoint_description'] = $v2->PaintPointDescription;
                                }
                                $paintpoints[$k2]['paintpoint_description_raw'] = $v2->PainPointDescPlainText;
                            }
                        }
                        $descriptionComment = DB::select(' EXEC uspGetDecompositionDescription ?,?',array($level->ProcessLevel2ID,$level->ProcessLevel));
                        $description = "";
                        $comment       = "";
                        $description_raw = "";
                        $comment_raw     = "";
                        if(count($descriptionComment)>0){
                            if(isset($descriptionComment[0]->DoEncode) && $descriptionComment[0]->DoEncode!=0){
                                $description = json_decode($descriptionComment[0]->Description,true);
                                $comment     = json_decode($descriptionComment[0]->Comment,true);
                            }else{
                                $description = $descriptionComment[0]->Description;
                                $comment     = $descriptionComment[0]->Comment;
                            }
                            $description_raw = $descriptionComment[0]->DescriptionPlainText;
                            $comment_raw     = $descriptionComment[0]->CommentPlainText;
                        }
                        $my_array['child'][] = array(
                           "ProcessLevel" => $level->ProcessLevel,
                           "number" => $level->ProcessLevelID,
                           "text" => $level->ProcessLevelTitle,
                           "owner" => $level->Owner,
                           "country" => $level->CountrySpecific,
                           "priority" => $level->Priority,
                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                           "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                           "id" => $level->ProcessLevel2ID,
                           "TotalAvgScore" => floatval($level->TotalAvgScore2),
                           "id" => $level->ProcessLevel2ID,
                           "paintpoints"=>$paintpoints,
                           "description"=>$description,
                           "comment"=>$comment,
                           "description_raw"=>$description_raw,
                            "comment_raw"=>$comment_raw,
                           'child' => []
                        );
                    }
                    
                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){

                        foreach ($my_array['child'] as $key => $value) {
                            if($value['ProcessLevel2ID']==$level->ProcessLevel2ID){
                                $paintPointsData = DB::select(' EXEC uspGetDecompositionPainPoint ?,?',array($level->ProcessLevel3ID,$level->ProcessLevel));
                                $paintpoints = array();
                                if(count($paintPointsData)>0){
                                    foreach ($paintPointsData as $k3 => $v3) {
                                        $paintpoints[$k3]['id'] = $v3->DecompositionProcessLevel3PainPointID;
                                        $paintpoints[$k3]['paintpoint_title'] = $v3->PaintPointTitle;
                                        if(isset($v3->DoEncode) && $v3->DoEncode!=0){
                                            $paintpoints[$k3]['paintpoint_description'] = json_decode($v3->PaintPointDescription);
                                        }else{
                                            $paintpoints[$k3]['paintpoint_description'] = $v3->PaintPointDescription;
                                        }
                                        $paintpoints[$k3]['paintpoint_description_raw'] = $v3->PainPointDescPlainText;
                                    }
                                }
                                $descriptionComment = DB::select(' EXEC uspGetDecompositionDescription ?,?',array($level->ProcessLevel3ID,$level->ProcessLevel));
                                $description = "";
                                $comment     = "";
                                $description_raw = "";
                                $comment_raw     = "";
                                if(count($descriptionComment)>0){
                                    if(isset($descriptionComment[0]->DoEncode) && $descriptionComment[0]->DoEncode!=0){
                                        $description = json_decode($descriptionComment[0]->Description,true);
                                        $comment     = json_decode($descriptionComment[0]->Comment,true);
                                    }else{
                                        $description = $descriptionComment[0]->Description;
                                        $comment     = $descriptionComment[0]->Comment;
                                    }
                                    $description_raw = $descriptionComment[0]->DescriptionPlainText;
                                    $comment_raw     = $descriptionComment[0]->CommentPlainText;
                                }
                                $my_array['child'][$key]['child'][] = array(
                                    "ProcessLevel" => $level->ProcessLevel,
                                   "number" => $level->ProcessLevelID,
                                   "text" => $level->ProcessLevelTitle,
                                   "owner" => $level->Owner,
                                   "country" => $level->CountrySpecific,
                                   "priority" => $level->Priority,
                                   "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                   "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                   "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                   "id" => $level->ProcessLevel3ID,
                                   "TotalAvgScore" => floatval($level->TotalAvgScore3),
                                   "paintpoints"=>$paintpoints,
                                   "description"=>$description,
                                   "comment"=>$comment,
                                   "description_raw"=>$description_raw,
                                    "comment_raw"=>$comment_raw,
                                   'child' => []
                                );
                            }
                        }
                    }
                    
                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID!='' && $level->ProcessLevel5ID==''){
                        foreach ($my_array['child'] as $key=>$val) {
                            foreach($val['child'] as $k=>$v){
                                if($v['ProcessLevel3ID']==$level->ProcessLevel3ID){
                                     $paintPointsData = DB::select(' EXEC uspGetDecompositionPainPoint ?,?',array($level->ProcessLevel4ID,$level->ProcessLevel));
                                    $paintpoints = array();
                                    if(count($paintPointsData)>0){
                                        foreach ($paintPointsData as $k4 => $v4) {
                                            $paintpoints[$k4]['id'] = $v4->DecompositionProcessLevel4PainPointID;
                                            $paintpoints[$k4]['paintpoint_title'] = $v4->PaintPointTitle;
                                            if(isset($v4->DoEncode) && $v4->DoEncode!=0){
                                                $paintpoints[$k4]['paintpoint_description'] = json_decode($v4->PaintPointDescription,true);
                                            }else{
                                                $paintpoints[$k4]['paintpoint_description'] = $v4->PaintPointDescription;
                                            }
                                            $paintpoints[$k4]['paintpoint_description_raw'] = $v4->PainPointDescPlainText;
                                        }
                                    }
                                    $descriptionComment = DB::select(' EXEC uspGetDecompositionDescription ?,?',array($level->ProcessLevel4ID,$level->ProcessLevel));
                                    $description = "";
                                    $comment     = "";
                                    $description_raw = "";
                                    $comment_raw     = "";
                                    if(count($descriptionComment)>0){
                                        if(isset($descriptionComment[0]->DoEncode) && $descriptionComment[0]->DoEncode!=0){
                                            $description = json_decode($descriptionComment[0]->Description,true);
                                            $comment     = json_decode($descriptionComment[0]->Comment,true);
                                        }else{
                                            $description = $descriptionComment[0]->Description;
                                            $comment     = $descriptionComment[0]->Comment;
                                        }
                                        $description_raw = $descriptionComment[0]->DescriptionPlainText;
                                        $comment_raw     = $descriptionComment[0]->CommentPlainText;
                                    }
                                    $val['child'][$k]['child'][] =array(
                                        "ProcessLevel" => $level->ProcessLevel,
                                       "number" => $level->ProcessLevelID,
                                       "text" => $level->ProcessLevelTitle,
                                       "owner" => $level->Owner,
                                       "country" => $level->CountrySpecific,
                                       "priority" => $level->Priority,
                                       "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                       "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                       "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                       "ProcessLevel4ID"=>$level->ProcessLevel4ID,
                                       "id" => $level->ProcessLevel4ID,
                                       "TotalAvgScore" => floatval($level->TotalAvgScore4),
                                       "paintpoints"=>$paintpoints,
                                       "description"=>$description,
                                       "comment"=>$comment,
                                       "description_raw"=>$description_raw,
                                        "comment_raw"=>$comment_raw,
                                       'child' => []
                                    );
                                }
                            }
                            $my_array['child'][$key] = $val;
                        }
                     }
                      if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID!='' && $level->ProcessLevel5ID!=''){
                        foreach ($my_array['child'] as $key=>$val) {
                            foreach($val['child'] as $k=>$v){
                                 foreach($v['child'] as $kl=>$vl){
                                    if($vl['ProcessLevel4ID']==$level->ProcessLevel4ID){
                                        $paintPointsData = DB::select(' EXEC uspGetDecompositionPainPoint ?,?',array($level->ProcessLevel5ID,$level->ProcessLevel));
                                        $paintpoints = array();
                                        if(count($paintPointsData)>0){
                                            foreach ($paintPointsData as $k5 => $v5) {
                                                $paintpoints[$k5]['id'] = $v5->DecompositionProcessLevel5PainPointID;
                                                $paintpoints[$k5]['paintpoint_title'] = $v5->PaintPointTitle;
                                                if(isset($v5->DoEncode) && $v5->DoEncode!=0){
                                                    $paintpoints[$k5]['paintpoint_description'] = json_decode($v5->PaintPointDescription,true);
                                                }else{
                                                    $paintpoints[$k5]['paintpoint_description'] = $v5->PaintPointDescription;
                                                }
                                                $paintpoints[$k5]['paintpoint_description_raw'] = $v5->PainPointDescPlainText;
                                            }
                                        }
                                        $descriptionComment = DB::select(' EXEC uspGetDecompositionDescription ?,?',array($level->ProcessLevel5ID,$level->ProcessLevel));
                                        $description = "";
                                        $comment     = "";
                                        $description_raw = "";
                                        $comment_raw     = "";
                                        if(count($descriptionComment)>0){
                                            if(isset($descriptionComment[0]->DoEncode) && $descriptionComment[0]->DoEncode!=0){
                                                $description = json_decode($descriptionComment[0]->Description,true);
                                                $comment     = json_decode($descriptionComment[0]->Comment,true);
                                            }else{
                                                $description = $descriptionComment[0]->Description;
                                                $comment     = $descriptionComment[0]->Comment;
                                            }
                                            $description_raw = $descriptionComment[0]->DescriptionPlainText;
                                            $comment_raw     = $descriptionComment[0]->CommentPlainText;
                                        }
                                        $v['child'][$kl]['child'][] =array(
                                            "ProcessLevel" => $level->ProcessLevel,
                                           "number" => $level->ProcessLevelID,
                                           "text" => $level->ProcessLevelTitle,
                                           "owner" => $level->Owner,
                                           "country" => $level->CountrySpecific,
                                           "priority" => $level->Priority,
                                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                           "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                           "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                           "ProcessLevel4ID"=>$level->ProcessLevel4ID,
                                           "ProcessLevel5ID"=>$level->ProcessLevel5ID,
                                           "id" => $level->ProcessLevel5ID,
                                           "TotalAvgScore" => floatval($level->TotalAvgScore5),
                                           "id" => $level->ProcessLevel5ID,
                                           "paintpoints"=>$paintpoints,
                                           "description"=>$description,
                                           "comment"=>$comment,
                                           "description_raw"=>$description_raw,
                                            "comment_raw"=>$comment_raw
                                        );
                                    }
                                }
                                $val['child'][$k] = $v;
                            }
                            $my_array['child'][$key] = $val;
                        }
                     }
                     //get scores
                    if(!empty($level->ScoreCriteria1) ){    
                        if($level->ProcessLevel == 1){
                            $scores[$l]['id'] = $level->ProcessLevel1ID;
                            $scores[$l]['ProcessLevel'] = 1;
                        }elseif($level->ProcessLevel == 2){
                            $scores[$l]['id'] = $level->ProcessLevel2ID;
                            $scores[$l]['ProcessLevel'] = 2;
                        }elseif($level->ProcessLevel == 3){
                            $scores[$l]['id'] = $level->ProcessLevel3ID;
                            $scores[$l]['ProcessLevel'] = 3;
                        }elseif($level->ProcessLevel == 4){
                            $scores[$l]['id'] = $level->ProcessLevel4ID;
                            $scores[$l]['ProcessLevel'] = 4;
                        }elseif($level->ProcessLevel == 5){
                            $scores[$l]['id'] = $level->ProcessLevel5ID;
                            $scores[$l]['ProcessLevel'] = 5;
                        }
                        $scoreArr = [
                            !empty($level->ScoreCriteria1) ? round($level->ScoreCriteria1, 1) : 0,
                            !empty($level->ScoreCriteria2) ? round($level->ScoreCriteria2, 1) : 0,
                            !empty($level->ScoreCriteria3) ? round($level->ScoreCriteria3, 1) : 0,
                            !empty($level->ScoreCriteria4) ? round($level->ScoreCriteria4, 1) : 0,
                            !empty($level->ScoreCriteria5) ? round($level->ScoreCriteria5, 1) : 0,
                            !empty($level->ScoreCriteria6) ? round($level->ScoreCriteria6, 1) : 0,
                            !empty($level->ScoreCriteria7) ? round($level->ScoreCriteria7, 1) : 0,
                            !empty($level->ScoreCriteria8) ? round($level->ScoreCriteria8, 1) : 0,
                            !empty($level->ScoreCriteria9) ? round($level->ScoreCriteria9, 1) : 0,
                            !empty($level->ScoreCriteria10)? round($level->ScoreCriteria10,1) : 0
                        ];
                        //$scoreArr = [5,4,3,5];
                        //$remove = array('.00');
                        $remove = array('0');
                        $scoreArr1 = array_diff($scoreArr, $remove); 
                        $scores[$l]['scoreArr'] = $scoreArr1;
                    }
                }
                $response['processes'][] = $my_array;
                $response['scores'] = array_values($scores);
                $response['status'] = $status;
                $message = "decomposition level two heatmap tasks retrieved.";
               return $this->sendResponse($response, $message);
            }else{
                $message = "No data found";
            }
            return $this->sendResponse($response, $message);
            
        }catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }
     }  

     /*
        Author : Amit
        Date   : 07/10/2019
        Name   : updateDecompositionLevelsData
        Params : None
        Type   : POST
        Purpose: To get decomposition levels Data 
    */


    public function updateDecompositionLevelsData(Request $request){
        try{

        $data = [];
        //DB::beginTransaction();
        //save level 1 data
        $scores = $request->scores;
        $project_id = $request->projectId;
        $decompositionprocesslevelid_1= $request->processId;
        $status = $request->input('status');
        $userId = $this->user_data['UserID'];
        $processes_array = $request->processes;
       
        $processes = $processes_array;        
        //echo "<pre>";print_r( $processes );echo "<br>";die;
       
        
      
        foreach($processes as $i => $level1) { 
            $leaf_node_flag = 1; 
            if(array_key_exists('child',$level1) && count($level1['child']) > 0){
                foreach($level1['child'] as $j => $level2) {
                    //save level 
                    $level2Data = [];
                    $level2Data['user_id'] = $userId;
                    $level2Data['decomposition_project_id'] = $project_id;
                    $level2Data['decomposition_process_level_1_id'] = $level1['id'];
                    $level2Data['process_level_node_2_id'] = $level2['number'];
                    $level2Data['process_level_2_title'] = $level2['text'];
                    $level2Data['owner'] = $level2['owner'];
                    $level2Data['country_specific'] = $level2['country'];
                    $level2Data['priority'] = $level2['priority'];
                    $level2Data['leaf_node_flag'] = array_key_exists('child',$level2) && count($level2['child']) > 0 ?'0':'1';
                    $level2Data['action'] = $level2['action'];
                    $level2Data['update_id'] = 0;
                    $level2Data['description'] = isset($level2['description'])?$level2['description']:"";
                    $level2Data['comment']     = isset($level2['comment'])?$level2['comment']:"";
                    $level2Data['description_raw'] = isset($level2['description_raw'])?$level2['description_raw']:"";
                    $level2Data['comment_raw']     = isset($level2['comment_raw'])?$level2['comment_raw']:"";
                    $level2Data['paintpoints'] = isset($level2['paintpoints'])?$level2['paintpoints']:[];
                    if($level2['action'] =='add'){
                        $level2Data['id'] = 0;
                    }elseif($level2['action'] =='update'){
                        $level2Data['id'] = $level2['id'];
                        $level2Data['update_id'] = $level2['id'];
                    }elseif($level2['action'] =='delete'){
                        $level2Data['id'] = $level2['id'];
                        $level2Data['update_id'] = $level2['id'];
                    }
                    //echo "<pre>"; print_r($level2Data);
                    $process_level_2_id = $this->updateDecompositionProcessLevels2($level2Data);

                    if($process_level_2_id){
                        $this->updateDecompositionPainPoint($userId,2,$process_level_2_id,$level2Data['paintpoints']);
                    }
                    //save scores
                    // scores code
						//print_r($scores);
                        if(in_array($level2['id'], array_column($scores, 'id'))) { // search value in the array
                           $key = array_search($level2['id'], array_column($scores, 'id'));
                           if(isset($scores[$key]['ProcessLevel']) && $level2['ProcessLevel'] == $scores[$key]['ProcessLevel']){
                               $score_data2 = $scores[$key];
							   $score_data2['id'] = $process_level_2_id;
							   
							   //print_r(array($score_data2,$level1['id'],$process_level_2_id,$level2['priority']));
							   
                                //call add level 2 score procedure
                               $this->updateDecompositionProcessLevel2Scores($score_data2,$level1['id'],$process_level_2_id,$level2['priority']);
                            }
                        }else{
                            $score_data2['scoreArr'] = [0,0,0,0];
                            $score_data2['id'] = $process_level_2_id;
                            $score_data2['action'] = "update";
                            $this->updateDecompositionProcessLevel2Scores($score_data2,$level1['id'],$process_level_2_id,$level2['priority']);
                        }
                    // scores code
					//print_r($score_data2);
                   if(array_key_exists('child',$level2) && count($level2['child']) > 0){
                        foreach($level2['child'] as $k => $level3){
                            //save level 3 details
                            $level3Data = [];
                            $level3Data['decomposition_project_id'] = $project_id;
                            $level3Data['decomposition_process_level_1_id'] = $level1['id'];
                            $level3Data['decomposition_process_level_2_id'] = $process_level_2_id;
                            $level3Data['process_level_node_3_id'] = $level3['number'];
                            $level3Data['process_level_3_title'] = $level3['text'];
                            $level3Data['owner'] = $level3['owner'];
                            $level3Data['country_specific'] = $level3['country'];
                            $level3Data['priority'] = $level3['priority'];
                            $level3Data['leaf_node_flag'] = array_key_exists('child',$level3) && count($level3['child']) > 0 ?'0':'1';
                            $level3Data['user_id'] = $userId;
                            $level3Data['action'] = $level3['action'];
                            $level3Data['update_id'] = 0;
                            $level3Data['description'] = isset($level3['description'])?$level3['description']:"";
                            $level3Data['comment']     = isset($level3['comment'])?$level3['comment'] : "";
                            $level3Data['paintpoints'] = isset($level3['paintpoints']) ? $level3['paintpoints'] :[];

                            $level3Data['description_raw'] = isset($level3['description_raw'])? $level3['description_raw'] : "";
                            $level3Data['comment_raw'] = isset($level3['comment_raw']) ?$level3['comment_raw']:"";
                            if($level3['action'] =='add'){
                                $level3Data['id'] = 0;
                            }elseif($level3['action'] =='update'){
                                $level3Data['id'] = $level3['id'];
                                $level3Data['update_id'] = $level3['id'];
                            }elseif($level3['action'] =='delete'){
                                $level3Data['id'] = $level3['id'];
                                $level3Data['update_id'] = $level3['id'];
                            }
                                
                            $process_level_3_id = $this->updateDecompositionProcessLevels3($level3Data);
                             
                            if($process_level_3_id){
                            $this->updateDecompositionPainPoint($userId,3,$process_level_3_id,$level3Data['paintpoints']);
                            }
                            // scores code
                                if(in_array($level3['id'], array_column($scores, 'id'))) { // search value in the array
                                    $key = array_search($level3['id'], array_column($scores, 'id'));
                                    if(isset($scores[$key]['ProcessLevel']) && $level3['ProcessLevel'] == $scores[$key]['ProcessLevel']){
                                        $score_data3 = $scores[$key];
										$score_data3['id'] = $process_level_3_id;
                                        //call add level 3 score procedure
                                        $this->updateDecompositionProcessLevel3Scores($score_data3,$level1['id'],$process_level_2_id,$process_level_3_id,$level3['priority']);
                                    }
                                }else{
                                    $score_data3['scoreArr'] = [0,0,0,0];
                                    $score_data3['id'] = $process_level_3_id;
                                    $score_data3['action'] = "update";
                                    $this->updateDecompositionProcessLevel3Scores($score_data3,$level1['id'],$process_level_2_id,$process_level_3_id,$level3['priority']);
                                }
                            // scores code
                            if(array_key_exists('child',$level3) && count($level3['child']) > 0){
                                foreach($level3['child'] as $k => $level4){

                                    //save level 4 details
                                    $level4Data = [];
                                    $level4Data['user_id'] = $userId;
                                    $level4Data['decomposition_project_id'] = $project_id;
                                    $level4Data['decomposition_process_level_1_id'] = $level1['id'];
                                    $level4Data['decomposition_process_level_2_id'] = $process_level_2_id;
                                    $level4Data['decomposition_process_level_3_id'] = $process_level_3_id;
                                    $level4Data['process_level_node_4_id'] = $level4['number'];
                                    $level4Data['process_level_4_title'] = $level4['text'];
                                    $level4Data['owner'] = $level4['owner'];
                                    $level4Data['country_specific'] = $level4['country'];
                                    $level4Data['priority'] = $level4['priority'];
                                    $level4Data['leaf_node_flag'] = array_key_exists('child',$level4) && count($level4['child']) > 0 ?'0':'1';
                                    $level4Data['action'] = $level4['action'];
                                    $level4Data['update_id'] = 0;
                                    $level4Data['description'] = isset($level4['description'])?$level4['description']:"";
                                    $level4Data['comment']     = isset($level4['comment'])?$level4['comment']:"";
                                    $level4Data['paintpoints'] = isset($level4['paintpoints'])?$level4['paintpoints']:[];
                                    $level4Data['description_raw'] = isset($level4['description_raw'])?$level4['description_raw']:"";
                                    $level4Data['comment_raw'] = isset($level4['comment_raw'])?$level4['comment_raw']:"";
                                    if($level4['action'] =='add'){
                                        $level4Data['id'] = 0;
                                    }elseif($level4['action'] =='update'){
                                        $level4Data['id'] = $level4['id'];
                                        $level4Data['update_id'] = $level4['id'];
                                    }elseif($level4['action'] =='delete'){
                                        $level4Data['id'] = $level4['id'];
                                        $level4Data['update_id'] = $level4['id'];
                                    }
                                    //echo "<pre>";print_r($level4Data);echo "<br>";die;
                                    $process_level_4_id = $this->updateDecompositionProcessLevel4($level4Data);
                                   
                                   if($process_level_4_id){
                                   $this->updateDecompositionPainPoint($userId,4,$process_level_4_id,$level4Data['paintpoints']);
                                    }
                                    // scores code
                                        if(in_array($level4['id'], array_column($scores, 'id'))) { // search value in the array
                                            $key = array_search($level4['id'], array_column($scores, 'id'));
                                            if(isset($scores[$key]['ProcessLevel']) && $level4['ProcessLevel'] == $scores[$key]['ProcessLevel']){
                                                $score_data4 = $scores[$key];
												$score_data4['id'] = $process_level_4_id;
                                                
                                                //call add level 4 score procedure
                                                $this->updateDecompositionProcessLevel4Scores($score_data4,$level1['id'],$process_level_2_id,$process_level_3_id,$process_level_4_id,$level4['priority']);
                                            }
                                        }else{
                                            $score_data4['scoreArr'] = [0,0,0,0];
                                            $score_data4['id'] = $process_level_4_id;
                                            $score_data4['action'] = "update";
                                            $this->updateDecompositionProcessLevel4Scores($score_data4,$level1['id'],$process_level_2_id,$process_level_3_id,$process_level_4_id,$level4['priority']);
                                        }
                                    // scores code
                                    if(array_key_exists('child',$level4) && count($level4['child']) > 0){
                                      
                                        foreach($level4['child'] as $k => $level5){
                                            //save level 5 details
                                            $level5Data = [];
                                            $level5Data['user_id'] = $userId;
                                            $level5Data['decomposition_project_id'] = $project_id;
                                            $level5Data['decomposition_process_level_1_id'] = $level1['id'];
                                            $level5Data['decomposition_process_level_2_id'] = $process_level_2_id;
                                            $level5Data['decomposition_process_level_3_id'] = $process_level_3_id;
                                            $level5Data['decomposition_process_level_4_id'] = $process_level_4_id;
                                            $level5Data['process_level_node_5_id'] = $level5['number'];
                                            $level5Data['process_level_5_title'] = $level5['text'];
                                            $level5Data['owner'] = $level5['owner'];
                                            $level5Data['country_specific'] = $level5['country'];
                                            $level5Data['priority'] = $level5['priority'];
                                            $level5Data['leaf_node_flag'] = array_key_exists('child',$level5) && count($level5['child']) > 0 ?'0':'1';
                                          
                                            $level5Data['action'] = $level5['action'];
                                            $level5Data['update_id'] = 0;
                                            $level5Data['description'] = isset($level5['description'])?$level5['description']:"";
                                            $level5Data['comment']     = isset($level5['comment'])?$level5['comment']:"";
                                            $level5Data['paintpoints'] = isset($level5['paintpoints'])?$level5['paintpoints']:[];
                                             $level5Data['description_raw'] = isset($level5['description_raw'])?$level5['description_raw']:"";
                                            $level5Data['comment_raw'] = isset($level5['comment_raw'])?$level5['comment_raw']:"";
                                            if($level5['action'] =='add'){
                                                $level5Data['id'] = 0;
                                            }elseif($level5['action'] =='update'){
                                                $level5Data['id'] = $level5['id'];
                                                $level5Data['update_id'] = $level5['id'];
                                            }elseif($level5['action'] =='delete'){
                                                $level5Data['id'] = $level5['id'];
                                                $level5Data['update_id'] = $level5['id'];
                                            }

                                            $process_level_5_id = $this->updateDecompositionProcessLevels5($level5Data);
                                            if($process_level_5_id){
                                             $this->updateDecompositionPainPoint($userId,5,$process_level_5_id,$level5Data['paintpoints']);
                                            }
                                                if(in_array($level5['id'], array_column($scores, 'id'))) { // search value in the array
                                                    $key = array_search($level5['id'], array_column($scores, 'id'));

                                                    if(isset($scores[$key]['ProcessLevel']) && $level5['ProcessLevel'] == $scores[$key]['ProcessLevel']){
                                                        $score_data5 = $scores[$key];
                                                        $score_data5['id'] = $process_level_5_id;
                                                        //call add level 5 score procedure
                                                        $this->updateDecompositionProcessLevel5Scores($score_data5,$level1['id'],$process_level_2_id,$process_level_3_id,$process_level_4_id,$process_level_5_id,$level5['priority']);
                                                    }
                                                     
                                                }else{
                                                    $score_data5['scoreArr'] = [0,0,0,0];
                                                    $score_data5['id'] = $process_level_5_id;
                                                    $score_data5['action'] = "update";
                                                    $this->updateDecompositionProcessLevel5Scores($score_data5,$level1['id'],$process_level_2_id,$process_level_3_id,$process_level_4_id,$process_level_5_id,$level5['priority']);
                                                }
                                        }
                                    }
                                    
                                }

                            }
                            
                        }

                   }
  
                }
                try{
                   $level5level2score = DB::statement(' EXEC uspUpdateLevel5To2CalcAggrScore ?,?',array($project_id,$decompositionprocesslevelid_1));
                   
                }
                catch(\Exception $ex){
                  return $this->sendError($ex->getMessage());
                 
                }
            }
        }
        $description =isset($processes[0]['description'])?$processes[0]['description']:"";
        $comment =isset($processes[0]['comment'])?$processes[0]['comment']:"";
        $description_raw =isset($processes[0]['description_raw'])?$processes[0]['description_raw']:"";
        $comment_raw =isset($processes[0]['comment_raw'])?$processes[0]['comment_raw']:"";
        $paintpoints =isset($processes[0]['paintpoints'])?$processes[0]['paintpoints']:[];
        
        $this->updateDecompositionProcessLevel1Scores($processes[0]['ProcessLevel1ID'], $processes[0]['priority'],$description,$comment,$description_raw,$comment_raw, $processes[0]['owner'], $processes[0]['country']);
        $this->updateDecompositionPainPoint($userId,$processes[0]['ProcessLevel'],$processes[0]['id'],$paintpoints);
        //update status
        $data = DB::statement(' EXEC uspUpdateDecompositionStatus ?,?,?',array($project_id,$level1['id'],$status));
      
        if($data && $status==2 && isset($request->VersionNo)){
           
            $params_version = array(
                $request->projectId,
                $request->processId,
                $request->IsUnlocked,
                $this->user_data['UserID'],
                $request->VersionNo,
                $request->ReasonForNewVersion,
                $request->ProjectVersionId
            );
            $dataVersion = DB::select(' EXEC uspDecompositionLockUnlock ?,?,?,?,?,?,?', $params_version);
            if( isset($dataVersion[0]->Success) && ($dataVersion[0]->Success == true || $dataVersion[0]->Success ===1)){
               $message = $dataVersion[0]->MessageName;
               return $this->sendResponse($dataVersion[0], $message);
            }else if(isset($dataVersion[0]->Success)){
                $message = $dataVersion[0]->MessageName;  
                return $this->sendError($message);
            }
        }else{
             
            return $this->sendResponse($data, 'Data updated');
        }
        }catch(\Exception $e){
            //DB::rollback();
            return $this->sendError($e->getMessage());
        }

    }  
    
    public function updateDecompositionLevelsTemplateData(Request $request){
        try{
        $data = [];
        //DB::beginTransaction();
        //save level 1 data
        $scores = $request->scores;
        $project_id = $request->projectId;
        $status = $request->input('status');
        $userId = $this->user_data['UserID'];
        $processes_array = $request->processes;
       // echo '<pre>';print_r($processes_array);die;
        
        $processes = $processes_array;
        //echo "<pre>";print_r( $processes );echo "<br>";die;
        foreach($processes as $i => $level1) { 
            $leaf_node_flag = 1; 
            if(array_key_exists('child',$level1) && count($level1['child']) > 0){
                foreach($level1['child'] as $j => $level2) {
                    //save level 
                    $level2Data = [];
                    $level2Data['user_id'] = $userId;
                    $level2Data['decomposition_project_id'] = $project_id;
                    $level2Data['decomposition_process_level_1_id'] = $level1['id'];
                    $level2Data['process_level_node_2_id'] = $level2['number'];
                    $level2Data['process_level_2_title'] = $level2['text'];
                    $level2Data['leaf_node_flag'] = array_key_exists('child',$level2) && count($level2['child']) > 0 ?'0':'1';
                    $level2Data['action'] = $level2['action'];
                    $level2Data['update_id'] = 0;
                        if($level2['action'] =='add'){
                            $level2Data['id'] = 0;
                        }elseif($level2['action'] =='update'){
                            $level2Data['id'] = $level2['id'];
                        }elseif($level2['action'] =='delete'){
                            $level2Data['id'] = $level2['id'];
                            $level2Data['update_id'] = $level2['id'];
                        }
                        
                    $process_level_2_id = $this->updateDecompositionProcessLevels2Template($level2Data);
                   if(array_key_exists('child',$level2) && count($level2['child']) > 0){
                        foreach($level2['child'] as $k => $level3){
                            //save level 3 details
                            $level3Data = [];
                            $level3Data['decomposition_project_id'] = $project_id;
                            $level3Data['decomposition_process_level_1_id'] = $level1['id'];
                            $level3Data['decomposition_process_level_2_id'] = $process_level_2_id;
                            $level3Data['process_level_node_3_id'] = $level3['number'];
                            $level3Data['process_level_3_title'] = $level3['text'];
                            $level3Data['leaf_node_flag'] = array_key_exists('child',$level3) && count($level3['child']) > 0 ?'0':'1';
                            $level3Data['user_id'] = $userId;
                            $level3Data['action'] = $level3['action'];
                            $level3Data['update_id'] = 0;
                                if($level3['action'] =='add'){
                                    $level3Data['id'] = 0;
                                }elseif($level3['action'] =='update'){
                                    $level3Data['id'] = $level3['id'];
                                }elseif($level3['action'] =='delete'){
                                    $level3Data['id'] = $level3['id'];
                                    $level3Data['update_id'] = $level3['id'];
                                }
                                
                            $process_level_3_id = $this->updateDecompositionProcessLevels3Template($level3Data);
                            if(array_key_exists('child',$level3) && count($level3['child']) > 0){
                                foreach($level3['child'] as $k => $level4){

                                    //save level 4 details
                                    $level4Data = [];
                                    $level4Data['user_id'] = $userId;
                                    $level4Data['decomposition_project_id'] = $project_id;
                                    $level4Data['decomposition_process_level_1_id'] = $level1['id'];
                                    $level4Data['decomposition_process_level_2_id'] = $process_level_2_id;
                                    $level4Data['decomposition_process_level_3_id'] = $process_level_3_id;
                                    $level4Data['process_level_node_4_id'] = $level4['number'];
                                    $level4Data['process_level_4_title'] = $level4['text'];
                                    $level4Data['leaf_node_flag'] = array_key_exists('child',$level4) && count($level4['child']) > 0 ?'0':'1';
                                    $level4Data['action'] = $level4['action'];
                                    $level4Data['update_id'] = 0;
                                    if($level4['action'] =='add'){
                                        $level4Data['id'] = 0;
                                    }elseif($level4['action'] =='update'){
                                        $level4Data['id'] = $level4['id'];
                                    }elseif($level4['action'] =='delete'){
                                        $level4Data['id'] = $level4['id'];
                                        $level4Data['update_id'] = $level4['id'];
                                    }
                                    //echo "<pre>";print_r($level4Data);echo "<br>";die;
                                    $process_level_4_id = $this->updateDecompositionProcessLevels4Template($level4Data);
                                    if(array_key_exists('child',$level4) && count($level4['child']) > 0){
                                      
                                        foreach($level4['child'] as $k => $level5){
                                            //save level 5 details
                                            $level5Data = [];
                                            $level5Data['user_id'] = $userId;
                                            $level5Data['decomposition_project_id'] = $project_id;
                                            $level5Data['decomposition_process_level_1_id'] = $level1['id'];
                                            $level5Data['decomposition_process_level_2_id'] = $process_level_2_id;
                                            $level5Data['decomposition_process_level_3_id'] = $process_level_3_id;
                                            $level5Data['decomposition_process_level_4_id'] = $process_level_4_id;
                                            $level5Data['process_level_node_5_id'] = $level5['number'];
                                            $level5Data['process_level_5_title'] = $level5['text'];
                                            $level5Data['leaf_node_flag'] = array_key_exists('child',$level5) && count($level5['child']) > 0 ?'0':'1';
                                          
                                            $level5Data['action'] = $level5['action'];
                                            $level5Data['update_id'] = 0;
                                            if($level5['action'] =='add'){
                                                $level5Data['id'] = 0;
                                            }elseif($level5['action'] =='update'){
                                                $level5Data['id'] = $level5['id'];
                                            
                                            }elseif($level5['action'] =='delete'){
                                                $level5Data['id'] = $level5['id'];
                                                $level5Data['update_id'] = $level5['id'];
                                            }

                                            $process_level_5_id = $this->updateDecompositionProcessLevels5Template($level5Data);
                                        }
                                    }
                                    
                                }

                            }
                            
                        }

                   }
  
                }
            }
        }
        
        //update status
        //$data = DB::statement(' EXEC uspUpdateDecompositionStatus ?,?,?',array($project_id,$level1['id'],$status));

        return $this->sendResponse(array('message'=>"Update"), 'Data updated');
        }catch(\Exception $e){
            //DB::rollback();
            return $this->sendError($e->getMessage());
        }

    }

        public function updateDecompositionLevelsDataOld(Request $request){
            //try{
                $data = [];
                //DB::beginTransaction();
                //save level 1 data
                $scores = $request->scores;
                $project_id = $request->projectId;
                $status = $request->input('status');
                $userId = $this->user_data['UserID'];
                $processes = $request->processes;
                    //if level 1 has childs
                    foreach($processes as $i => $level1) { 

                        $leaf_node_flag = 1; 
                        if(array_key_exists('child',$level1) && count($level1['child']) > 0){
                            foreach($level1['child'] as $j => $level2) {
                                //save level 
                                $level2Data = [];
                                $level2Data['user_id'] = $userId;
                                $level2Data['decomposition_project_id'] = $project_id;
                                $level2Data['decomposition_process_level_1_id'] = $level1['id'];
                                $level2Data['process_level_node_2_id'] = $level2['number'];
                                $level2Data['process_level_2_title'] = $level2['text'];
                                $level2Data['owner'] = $level2['owner'];
                                $level2Data['country_specific'] = $level2['country'];
                                $level2Data['priority'] = $level2['priority'];
                                $level2Data['leaf_node_flag'] = array_key_exists('child',$level2)?'0':'1';
                                $level2Data['action'] = $level2['action'];
                                $level2Data['update_id'] = 0;
                                    if($level2['action'] =='add'){
                                        $level2Data['id'] = 0;
                                    }elseif($level2['action'] =='update'){
                                        $level2Data['id'] = $level2['id'];
                                    }elseif($level2['action'] =='delete'){
                                        $level2Data['id'] = $level2['id'];
                                        $level2Data['update_id'] = $level2['id'];
                                    }

                                $process_level_2_id = $this->updateDecompositionProcessLevels2($level2Data);
                                //save scores
                                /*scores code*/
                                    if(in_array($level2['id'], array_column($scores, 'id'))) { // search value in the array
                                        $key = array_search($level2['id'], array_column($scores, 'id'));
                                       $score_data = $scores[$key];
                                        //call add level 2 score procedure

                                        $this->updateDecompositionProcessLevel2Scores($score_data,$level1['id'],$process_level_2_id,$level2['priority']);
                                    }else{
                                        $score_data['scoreArr'] = [0,0,0,0];
                                        $score_data['action'] = "update";
                                        $this->updateDecompositionProcessLevel2Scores($score_data,$level1['id'],$process_level_2_id,$level2['priority']);
                                    }
                                /*scores code*/

                               if(array_key_exists('child',$level2) && count($level2['child']) > 0){
                                    foreach($level2['child'] as $k => $level3){
                                        //save level 3 details
                                        $level3Data = [];
                                        
                                        $level3Data['decomposition_project_id'] = $project_id;
                                        $level3Data['decomposition_process_level_1_id'] = $level1['id'];
                                        $level3Data['decomposition_process_level_2_id'] = $process_level_2_id;
                                        $level3Data['process_level_node_3_id'] = $level3['number'];
                                        $level3Data['process_level_3_title'] = $level3['text'];
                                        $level3Data['owner'] = $level3['owner'];
                                        $level3Data['country_specific'] = $level3['country'];
                                        $level3Data['priority'] = $level3['priority'];
                                        $level3Data['leaf_node_flag'] = array_key_exists('child',$level3)?'0':'1';
                                        $level3Data['user_id'] = $userId;
                                        $level3Data['action'] = $level3['action'];
                                        $level3Data['update_id'] = 0;
                                            if($level3['action'] =='add'){
                                                $level3Data['id'] = 0;
                                            }elseif($level3['action'] =='update'){
                                                $level3Data['id'] = $level3['id'];
                                            }elseif($level3['action'] =='delete'){
                                                $level3Data['id'] = $level3['id'];
                                                $level3Data['update_id'] = $level3['id'];
                                            }
                                            
                                        
                                        $process_level_3_id = $this->updateDecompositionProcessLevels3($level3Data);
                                        /*scores code*/
                                            if(in_array($level3['id'], array_column($scores, 'id'))) { // search value in the array
                                                
                                                $key = array_search($level3['id'], array_column($scores, 'id'));
                                                $score_data = $scores[$key];
                                                //call add level 3 score procedure
                                                $this->updateDecompositionProcessLevel3Scores($score_data,$level1['id'],$process_level_2_id,$process_level_3_id,$level3['priority']);
                                            }else{
                                                $score_data['scoreArr'] = [
                                                    '0' => 0,
                                                    '1' => 0,
                                                    '2' => 0,
                                                    '3' => 0,
                                                    '4' => 0,
                                                    '5' => 0,
                                                    '6' => 0,
                                                    '7' => 0,
                                                    '8' => 0,
                                                    '9' => 0
                                                ];
                                                $this->updateDecompositionProcessLevel3Scores($score_data,$level1['id'],$process_level_2_id,$process_level_3_id,$level3['priority']);
                                            }
                                        /*scores code*/
                                        if(array_key_exists('child',$level3) && count($level3['child']) > 0){
                                            foreach($level3['child'] as $k => $level4){
                                                //echo $process_level_3_id;echo "<br>";
                                                //save level 4 details
                                                $level4Data = [];
                                                $level4Data['user_id'] = $userId;
                                                $level4Data['decomposition_project_id'] = $project_id;
                                                $level4Data['decomposition_process_level_1_id'] = $level1['id'];
                                                $level4Data['decomposition_process_level_2_id'] = $process_level_2_id;
                                                $level4Data['decomposition_process_level_3_id'] = $process_level_3_id;
                                                $level4Data['process_level_node_4_id'] = $level4['number'];
                                                $level4Data['process_level_4_title'] = $level4['text'];
                                                $level4Data['owner'] = $level4['owner'];
                                                $level4Data['country_specific'] = $level4['country'];
                                                $level4Data['priority'] = $level4['priority'];
                                                $level4Data['leaf_node_flag'] = array_key_exists('child',$level4)?'0':'1';
                                                $level4Data['action'] = $level4['action'];
                                                $level4Data['update_id'] = 0;
                                                if($level4['action'] =='add'){
                                                    $level4Data['id'] = 0;
                                                }elseif($level4['action'] =='update'){
                                                    $level4Data['id'] = $level4['id'];
                                                }elseif($level4['action'] =='delete'){
                                                    $level4Data['id'] = $level4['id'];
                                                    $level4Data['update_id'] = $level4['id'];
                                                }

                                    
                                                $process_level_4_id = $this->updateDecompositionProcessLevel4($level4Data);
                                                /*scores code*/
                                                    if(in_array($level4['id'], array_column($scores, 'id'))) { // search value in the array
                                                        $key = array_search($level4['id'], array_column($scores, 'id'));
                                                        $score_data = $scores[$key];
                                                        //call add level 4 score procedure
                                                        $this->updateDecompositionProcessLevel4Scores($score_data,$level1['id'],$process_level_2_id,$process_level_3_id,$process_level_4_id,$level4['priority']);
                                                    }else{
                                                        $score_data['scoreArr'] = [
                                                            '0' => 0,
                                                            '1' => 0,
                                                            '2' => 0,
                                                            '3' => 0,
                                                            '4' => 0,
                                                            '5' => 0,
                                                            '6' => 0,
                                                            '7' => 0,
                                                            '8' => 0,
                                                            '9' => 0
                                                        ];
                                                        $this->updateDecompositionProcessLevel4Scores($score_data,$level1['id'],$process_level_2_id,$process_level_3_id,$process_level_4_id,$level4['priority']);
                                                    }
                                                /*scores code*/
                                                if(array_key_exists('child',$level4) && count($level4['child']) > 0){
                                                  
                                                    foreach($level4['child'] as $k => $level5){

                                                        //save level 5 details
                                                        $level5Data = [];
                                                        $level5Data['user_id'] = $userId;
                                                        $level5Data['decomposition_project_id'] = $project_id;
                                                        $level5Data['decomposition_process_level_1_id'] = $level1['id'];
                                                        $level5Data['decomposition_process_level_2_id'] = $process_level_2_id;
                                                        $level5Data['decomposition_process_level_3_id'] = $process_level_3_id;
                                                        $level5Data['decomposition_process_level_4_id'] = $process_level_4_id;
                                                        $level5Data['process_level_node_5_id'] = $level5['number'];
                                                        $level5Data['process_level_5_title'] = $level5['text'];
                                                        $level5Data['owner'] = $level5['owner'];
                                                        $level5Data['country_specific'] = $level5['country'];
                                                        $level5Data['priority'] = $level5['priority'];
                                                        $level5Data['leaf_node_flag'] = array_key_exists('child',$level5)?'0':'1';
                                                        //$level5Data['leaf_node_flag'] = 1;
                                                        $level5Data['action'] = $level5['action'];
                                                        $level5Data['update_id'] = 0;
                                                        if($level5['action'] =='add'){
                                                            $level5Data['id'] = 0;
                                                        }elseif($level5['action'] =='update'){
                                                            $level5Data['id'] = $level5['id'];
                                                        
                                                        }elseif($level5['action'] =='delete'){
                                                            $level5Data['id'] = $level5['id'];
                                                            $level5Data['update_id'] = $level5['id'];
                                                        }

                                                        $process_level_5_id = $this->updateDecompositionProcessLevels5($level5Data);

                                                        /*scores code*/
                                                            if(in_array($level5['id'], array_column($scores, 'id'))) { // search value in the array
                                                                $key = array_search($level5['id'], array_column($scores, 'id'));
                                                                $score_data = $scores[$key];
                                                                //call add level 5 score procedure
                                                                $this->updateDecompositionProcessLevel5Scores($score_data,$level1['id'],$process_level_2_id,$process_level_3_id,$process_level_4_id,$process_level_5_id,$level5['priority']);
                                                                 
                                                            }else{
                                                                $score_data['scoreArr'] = [
                                                                    '0' => 0,
                                                                    '1' => 0,
                                                                    '2' => 0,
                                                                    '3' => 0,
                                                                    '4' => 0,
                                                                    '5' => 0,
                                                                    '6' => 0,
                                                                    '7' => 0,
                                                                    '8' => 0,
                                                                    '9' => 0
                                                                ];
                                                                $this->updateDecompositionProcessLevel5Scores($score_data,$level1['id'],$process_level_2_id,$process_level_3_id,$process_level_4_id,$process_level_5_id,$level5['priority']);
                                                            }
                                                /*scores code*/

                                                    }
                                                }
                                                

                                            }

                                        }
                                        

                                    }


                               }

                                
                            }
                        }
                    }
                    
                    //update status
                    $data = DB::statement(' EXEC uspUpdateDecompositionStatus ?,?,?',array($project_id,$level1['id'],$status));

            return $this->sendResponse($data, 'data updated');
                //DB::commit();
            /*}catch(\Exception $e){
                //DB::rollback();
                return $this->sendError($e->getMessage());
            }*/

        }


    /*
        Author : Prabir
        Date   : 30/01/2020
        Name   : updateDecompositionProcessLevel2Scores
        Params : None
        Type   : POST
        Purpose: To update decomposition process level 2 scores 
    */
    public function updateDecompositionProcessLevel1Scores($level1Id, $avgScore, $description,$comment,$description_raw,$comment_raw, $owner, $country){
        //try{
            $data = DB::statement(' EXEC uspUpdateDecompositionProcessLevel1Scores ?,?,?,?,?,?,?,?',array($level1Id,$avgScore,json_encode($description),json_encode($comment),$description_raw,$comment_raw,$owner,$country)); 
            return $data;
       /* }catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }  */
    }

    /*
        Author : Prabir
        Date   : 07/01/2020
        Name   : uspUpdateDecompositionLevel1TitleTemplate
        Params : None
        Type   : POST
        Purpose: To update decomposition process level 1 scores 
    */
    public function uspUpdateDecompositionLevel1TitleTemplate($saveData){
        $data = DB::select(' EXEC Amplo.uspUpdateDecompositionLevel1TitleTemplate ?,?',array($saveData['template_id'], $saveData['decomposition_process_level_1_id']));
        return $data[0]->ProcessLevel1ID;
    }

    /*
        Author : Amit
        Date   : 04/10/2019
        Name   : updateDecompositionProcessLevels2
        Params : None
        Type   : POST
        Purpose: To update decomposition process level 2 scores 
    */
    public function updateDecompositionProcessLevels2($saveData){
            $process_level_2_id = 0;   
            $data = DB::select(' EXEC uspUpdateDecompositionProcessLevels2 ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',array($saveData['decomposition_project_id'],$saveData['decomposition_process_level_1_id'],$saveData['process_level_node_2_id'],$saveData['process_level_2_title'],$saveData['owner'],$saveData['country_specific'],$saveData['leaf_node_flag'],$saveData['user_id'],$saveData['id'],$saveData['action'],$saveData['update_id'],json_encode($saveData['description']),json_encode($saveData['comment']),$saveData['description_raw'],$saveData['comment_raw']));
            return $data[0]->DecompositionProcessLevel2ID;
    }

    /*
        Author : Prabir
        Date   : 07/01/2020
        Name   : updateDecompositionProcessLevels2Template
        Params : None
        Type   : POST
        Purpose: To update decomposition process level 2 scores 
    */
    public function updateDecompositionProcessLevels2Template($saveData){
        $process_level_2_id = 0;   
        $data = DB::select(' EXEC Amplo.uspUpdateDecompositionProcessLevels2Template ?,?,?,?,?,?,?,?',array($saveData['decomposition_process_level_1_id'],$saveData['process_level_node_2_id'],$saveData['process_level_2_title'],$saveData['leaf_node_flag'],$saveData['user_id'],$saveData['id'],$saveData['action'],$saveData['update_id']));
        return $data[0]->DecompositionProcessLevel2ID;
    }

    /*
        Author : Amit
        Date   : 04/10/2019
        Name   : updateDecompositionProcessLevel2Scores
        Params : None
        Type   : POST
        Purpose: To update decomposition process level 2 scores 
    */
    public function updateDecompositionProcessLevel2Scores($scores,$level1Id,$level2Id,$priority){
        //try{
            $scoreCriteria = [
                '0' => 0,
                '1' => 0,
                '2' => 0,
                '3' => 0,
                '4' => 0,
                '5' => 0,
                '6' => 0,
                '7' => 0,
                '8' => 0,
                '9' => 0
            ];
            foreach($scores['scoreArr'] as $k => $score){
                $scoreCriteria[$k] = $score;           
            }
            //$lvl2score = array_sum($scoreCriteria)/count($scores['scoreArr']);
            if(array_sum($scoreCriteria) > 0){
                $lvl2score = array_sum($scoreCriteria)/count($scores['scoreArr']);
            }else{
                $lvl2score = 0;
            }
            $avgScore = $priority;
                if($scores['action'] == 'add'){
                    $level2Id = $level2Id;
                }else{
                    $level2Id = $scores['id'];
                }
            //print_r(array($level1Id,$level2Id,$scoreCriteria['0'],$scoreCriteria['1'],$scoreCriteria['2'],$scoreCriteria['3'],$scoreCriteria['4'],$scoreCriteria['5'],$scoreCriteria['6'],$scoreCriteria['7'],$scoreCriteria['8'],$scoreCriteria['9'],$lvl2score,$avgScore,$scores['action']));
            $data = DB::statement(' EXEC uspUpdateDecompositionProcessLevel2Scores ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',array($level1Id,$level2Id,$scoreCriteria['0'],$scoreCriteria['1'],$scoreCriteria['2'],$scoreCriteria['3'],$scoreCriteria['4'],$scoreCriteria['5'],$scoreCriteria['6'],$scoreCriteria['7'],$scoreCriteria['8'],$scoreCriteria['9'],$lvl2score,$avgScore,$scores['action']));
            return $data;
       /* }catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }  */
    }

/*
        Author : Amit
        Date   : 05/10/2019
        Name   : updateDecompositionProcessLevels3
        Params : None
        Type   : POST
        Purpose: To update decomposition process level 3 
    */
    public function updateDecompositionProcessLevels3($saveData){
            $process_level_3_id = 0;   
           
            $data = DB::select(' EXEC uspUpdateDecompositionProcessLevels3 ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',array($saveData['decomposition_project_id'],$saveData['decomposition_process_level_1_id'],$saveData['decomposition_process_level_2_id'],$saveData['process_level_node_3_id'],$saveData['process_level_3_title'],$saveData['owner'],$saveData['country_specific'],$saveData['leaf_node_flag'],$saveData['user_id'],$saveData['id'],$saveData['action'],$saveData['update_id'],json_encode($saveData['description']),json_encode($saveData['comment']),$saveData['description_raw'],$saveData['comment_raw']));   
			
            return $data[0]->DecompositionProcessLevel3ID;
    }

    /*
        Author : Prabir
        Date   : 07/01/2020
        Name   : updateDecompositionProcessLevels3Template
        Params : None
        Type   : POST
        Purpose: To update decomposition process level 3 scores 
    */
    public function updateDecompositionProcessLevels3Template($saveData){
        $process_level_3_id = 0;   
        $data = DB::select(' EXEC Amplo.uspUpdateDecompositionProcessLevels3Template ?,?,?,?,?,?,?,?',array($saveData['decomposition_process_level_2_id'],$saveData['process_level_node_3_id'],$saveData['process_level_3_title'],$saveData['leaf_node_flag'],$saveData['user_id'],$saveData['id'],$saveData['action'],$saveData['update_id']));
        return $data[0]->DecompositionProcessLevel3ID;
    }
    
    /*
        Author : Amit
        Date   : 04/10/2019
        Name   : updateDecompositionProcessLevel3Scores
        Params : None
        Type   : POST
        Purpose: To update decomposition process level 4 scores 
    */
    public function updateDecompositionProcessLevel3Scores($scores,$level1Id,$level2Id,$level3Id,$priority){
        //try{
            $scoreCriteria = [
                '0' => 0,
                '1' => 0,
                '2' => 0,
                '3' => 0,
                '4' => 0,
                '5' => 0,
                '6' => 0,
                '7' => 0,
                '8' => 0,
                '9' => 0
            ];
            foreach($scores['scoreArr'] as $k => $score){
                $scoreCriteria[$k] = $score;           
            }
            //$lvl3score = array_sum($scoreCriteria)/count($scores['scoreArr']);
            if(array_sum($scoreCriteria) > 0){
                $lvl3score = array_sum($scoreCriteria)/count($scores['scoreArr']);
            }else{
                $lvl3score = 0;
            }
            $avgScore = $priority;
                if($scores['action'] == 'add'){
                    $level3Id = $level3Id;
                }else{
                    $level3Id = $scores['id'];
                }
            $data = DB::statement(' EXEC uspUpdateDecompositionProcessLevel3Scores ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',array($level1Id,$level2Id,$level3Id,$scoreCriteria['0'],$scoreCriteria['1'],$scoreCriteria['2'],$scoreCriteria['3'],$scoreCriteria['4'],$scoreCriteria['5'],$scoreCriteria['6'],$scoreCriteria['7'],$scoreCriteria['8'],$scoreCriteria['9'],$avgScore,$scores['action']));
            return $data;  
       /* }catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }  */
    }

    /*
        Author : Amit
        Date   : 05/10/2019
        Name   : updateDecompositionProcessLevels4
        Params : None
        Type   : POST
        Purpose: To update decomposition process level 4 
    */
    public function updateDecompositionProcessLevel4($saveData){
            $process_level_4_id = 0;   
            
            $data = DB::select(' EXEC uspUpdateDecompositionProcessLevel4 ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',array($saveData['user_id'],$saveData['decomposition_project_id'],$saveData['decomposition_process_level_1_id'],$saveData['decomposition_process_level_2_id'],$saveData['decomposition_process_level_3_id'],$saveData['process_level_node_4_id'],$saveData['process_level_4_title'],$saveData['owner'],$saveData['country_specific'],$saveData['leaf_node_flag'],$saveData['id'],$saveData['action'],$saveData['update_id'],json_encode($saveData['description']),json_encode($saveData['comment']),$saveData['description_raw'],$saveData['comment_raw']));
			
			 
            return $data[0]->DecompositionProcessLevel4ID;
    }

    /*
        Author : Prabir
        Date   : 07/01/2020
        Name   : updateDecompositionProcessLevels4Template
        Params : None
        Type   : POST
        Purpose: To update decomposition process level 4 scores 
    */
    public function updateDecompositionProcessLevels4Template($saveData){
        $process_level_4_id = 0;   
        $data = DB::select(' EXEC Amplo.uspUpdateDecompositionProcessLevels4Template ?,?,?,?,?,?,?,?',array($saveData['decomposition_process_level_3_id'],$saveData['process_level_node_4_id'],$saveData['process_level_4_title'],$saveData['leaf_node_flag'],$saveData['user_id'],$saveData['id'],$saveData['action'],$saveData['update_id']));
        return $data[0]->DecompositionProcessLevel4ID;
    }

    /*
        Author : Amit
        Date   : 04/10/2019
        Name   : updateDecompositionProcessLevel4Scores
        Params : None
        Type   : POST
        Purpose: To update decomposition process level 4 scores 
    */
    public function updateDecompositionProcessLevel4Scores($scores,$level1Id,$level2Id,$level3Id,$level4Id,$priority){
        //try{
            $scoreCriteria = [
                '0' => 0,
                '1' => 0,
                '2' => 0,
                '3' => 0,
                '4' => 0,
                '5' => 0,
                '6' => 0,
                '7' => 0,
                '8' => 0,
                '9' => 0
            ];
            foreach($scores['scoreArr'] as $k => $score){
                $scoreCriteria[$k] = $score;           
            }
            //$lvl2score = array_sum($scoreCriteria)/count($scores['scoreArr']);
            if(array_sum($scoreCriteria) > 0){
                $lvl2score = array_sum($scoreCriteria)/count($scores['scoreArr']);
            }else{
                $lvl2score = 0;
            }
           
            $avgScore = $priority;
                if($scores['action'] == 'add'){
                    $level4Id = $level4Id;
                }else{
                    $level4Id = $scores['id'];
                }
            //$data1 = array($level1Id,$level2Id,$level3Id,$level4Id,$scoreCriteria['0'],$scoreCriteria['1'],$scoreCriteria['2'],$scoreCriteria['3'],$scoreCriteria['4'],$scoreCriteria['5'],$scoreCriteria['6'],$scoreCriteria['7'],$scoreCriteria['8'],$scoreCriteria['9'],$lvl2score,$avgScore,$scores['action']);
            //echo "<pre>";print_r(  $data1  );echo "<br>";
              
            $data = DB::statement(' EXEC uspUpdateDecompositionProcessLevel4Scores ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',array($level1Id,$level2Id,$level3Id,$level4Id,$scoreCriteria['0'],$scoreCriteria['1'],$scoreCriteria['2'],$scoreCriteria['3'],$scoreCriteria['4'],$scoreCriteria['5'],$scoreCriteria['6'],$scoreCriteria['7'],$scoreCriteria['8'],$scoreCriteria['9'],$lvl2score,$avgScore,$scores['action']));
            return $data; 
        /*}catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }  */
    }

    /*
        Author : Amit
        Date   : 05/10/2019
        Name   : updateDecompositionProcessLevels4
        Params : None
        Type   : POST
        Purpose: To update decomposition process level 4 
    */
    public function updateDecompositionProcessLevels5($saveData){
           
           $process_level_5_id = 0;   
            $data = DB::select(' EXEC uspUpdateDecompositionProcessLevels5 ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',array($saveData['user_id'],$saveData['decomposition_project_id'],$saveData['decomposition_process_level_1_id'],$saveData['decomposition_process_level_2_id'],$saveData['decomposition_process_level_3_id'],$saveData['decomposition_process_level_4_id'],$saveData['process_level_node_5_id'],$saveData['process_level_5_title'],$saveData['leaf_node_flag'],$saveData['owner'],$saveData['country_specific'],$saveData['id'],$saveData['action'],$saveData['update_id'],json_encode($saveData['description']),json_encode($saveData['comment']),$saveData['description_raw'],$saveData['comment_raw']));
            return $data[0]->DecompositionProcessLevel5ID;  
    }

    /*
        Author : Prabir
        Date   : 07/01/2020
        Name   : updateDecompositionProcessLevels5Template
        Params : None
        Type   : POST
        Purpose: To update decomposition process level 5 scores 
    */
    public function updateDecompositionProcessLevels5Template($saveData){
        $process_level_5_id = 0;   
        $data = DB::select(' EXEC Amplo.uspUpdateDecompositionProcessLevels5Template ?,?,?,?,?,?,?,?',array($saveData['decomposition_process_level_4_id'],$saveData['process_level_node_5_id'],$saveData['process_level_5_title'],$saveData['leaf_node_flag'],$saveData['user_id'],$saveData['id'],$saveData['action'],$saveData['update_id']));
        return $data[0]->DecompositionProcessLevel5ID;
    }
    
    /*
        Author : Amit
        Date   : 04/10/2019
        Name   : updateDecompositionProcessLevel5Scores
        Params : None
        Type   : POST
        Purpose: To update decomposition process level 5 scores 
    */
    public function updateDecompositionProcessLevel5Scores($scores,$level1Id,$level2Id,$level3Id,$level4Id,$level5Id,$priority){
      
        //try{
           $scoreCriteria = [
                '0' => 0,
                '1' => 0,
                '2' => 0,
                '3' => 0,
                '4' => 0,
                '5' => 0,
                '6' => 0,
                '7' => 0,
                '8' => 0,
                '9' => 0
            ];
            foreach($scores['scoreArr'] as $k => $score){
                $scoreCriteria[$k] = $score;           
            }
            if(array_sum($scoreCriteria) > 0){
                $lvl2score = array_sum($scoreCriteria)/count($scores['scoreArr']);
            }else{
                $lvl2score = 0;
            }
            $avgScore = $priority;
                if($scores['action'] == 'add'){
                    $level5Id = $level5Id;
                }else{
                    $level5Id = $scores['id'];
                }
            $data = DB::statement(' EXEC uspUpdateDecompositionProcessLevel5Scores ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',array($level1Id,$level2Id,$level3Id,$level4Id,$level5Id,$scoreCriteria['0'],$scoreCriteria['1'],$scoreCriteria['2'],$scoreCriteria['3'],$scoreCriteria['4'],$scoreCriteria['5'],$scoreCriteria['6'],$scoreCriteria['7'],$scoreCriteria['8'],$scoreCriteria['9'],$lvl2score,$avgScore,$scores['action']));
            return $data; 
            
            //return $this->sendResponse($data,'level 5 data updated successfully');   
        /*}catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }  */
    }

    /*
        Author : Amit
        Date   : 05/10/2019
        Name   : getDecompositionScoringCriteria
        Params : None
        Type   : GET
        Purpose: To get decomposition scring criteria 
    */
    public function getDecompositionScoringCriteria(Request $request, $ProjectId,$processLevelId,$versionId){
        try{
            $userId = $this->user_data['UserID'];
            //validations
            $input = [
                'ProjectId'      => $ProjectId,
                'processLevelId' => $processLevelId,
                'versionId'      => $versionId
            ];

            $validator = Validator::make($input, [
                'ProjectId'      => 'required|numeric',
                'processLevelId' => 'required|numeric',
                'versionId'      => 'required|numeric',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $data = DB::select(' EXEC uspGetDecompositionScoringCriteria ?,?,?',array($ProjectId,$processLevelId,$versionId)); 
            if(count($data) > 0){
                $message = "scoring criteria retrieved.";
            }else{
                $message = "No data found";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Amit
        Date   : 05/10/2019
        Name   : getDecompositionScoringCustomCriteria
        Params : None
        Type   : GET
        Purpose: To get decomposition scring criteria 
    */
        public function getDecompositionScoringCustomCriteria($ProjectId,$processLevelId,$versionId){
            try{
                $data = DB::select(' EXEC uspGetDecompositionScoringCustomCriteria ?,?,?',array($ProjectId,$processLevelId,$versionId)); 
                if(count($data) > 0){
                    $message = "scoring criteria retrieved.";
                }else{
                    $message = "No data found";
                }
                return $this->sendResponse($data, $message);
            }catch(\Exception $e){
                return $this->sendError($e->getMessage());
            }

        }
    /*
        Author : Amit
        Date   : 07/10/2019
        Name   : updateDecompositionScoringCriteria
        Params : None
        Type   : POST
        Purpose: To get decomposition scring criteria 
    */
    public function updateDecompositionScoringCriteria(Request $request){
        try{
            $userId = $this->user_data['UserID'];
            $flag = 1;
            $data = [];
            $validator = Validator::make($request->all(), [
                'project_id' => 'required|numeric',
                'process_level_id' => 'required|numeric',
                'title' => 'required',
                'score_criteria_id' => 'required',
                'versionId' => 'required'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $projectId = $request->input('project_id');
            $process_level_id = $request->input('process_level_id');
            $title = $request->input('title');
            $score_criteria_id = $request->input('score_criteria_id');
			$flag = $request->input('flag');
            $versionId = $request->input('versionId');
            $update = DB::select(' EXEC uspUpdateDecompositionScoringCriteria ?,?,?,?,?,?',array($userId,$projectId,$process_level_id,$title,$score_criteria_id,$flag,$versionId)); 
            if(count($update) > 0){
                    $data["DecompositionScoreCriteriaID"] = $score_criteria_id;
                    $data["DecompositionProjectID"] = $projectId;
                    $data["DecompositionProcessLevel1ID"] = $process_level_id;
                    $data["ScoreCriteriaTitle"] = $title;
                    $data["SeededFlag"] = '0';
                    $data["UsedFlag"] = $flag;
                    $message = "score criteria data updated.";
            }else{
                    //$data = (Object)[];
                    $message = "An error occured";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }

    }

     /*
        Author : Amit
        Date   : 07/10/2019
        Name   : getDecompositionProcessLevelSearch
        Params : None
        Type   : GET
        Purpose: To get decomposition process level search 
    */

     public function getDecompositionProcessLevelSearch($projectId,$searchKey=""){
        $userId = $this->user_data['UserID'];
        try{
            $function_data = [];
			if($searchKey != ""){
				$data = DB::select(' EXEC uspGetDecompositionProcessLevelSearch ?, ? ',array($projectId,$searchKey));
				if(count($data) > 0){
					foreach($data as $k => $value){
						$phase_data['GridViewLocationID'] = $value->GridViewLocationID;
						$phase_data['ProcessLevel1Name'] = $value->ProcessLevel1Title;
						$phase_data['status'] = $value->Status;
						//$function_data['function'.$value->FunctionID]['phase'.$value->PhaseID][] = $phase_data;
						
						$Common         = new Common();
						if($value->FunctionID!=0 && $value->PhaseID!=0){
							$resultFunction = $Common->getFunctionData($userId, $projectId, $value->FunctionID);
							$resultPhase    = $Common->getPhaseData($userId, $projectId, $value->PhaseID);
							if($resultFunction!=0 && $resultPhase!=0){
								$function_data['function'.$resultFunction]['phase'.$resultPhase][] = $phase_data;    
							}
						}                    
					}
					
					$message = "decomposition level 1 data retrieved.";
				}else{
					$function_data = (Object)[];
					$message = "No data found";
				}
			}else{
				$function_data = (Object)[];
				$message = "No data found";
			}
            return $this->sendResponse($function_data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }

     }

     /*
        Author : Amit
        Date   : 24/10/2019
        Name   : getProcessLevel1HeatMap
        Params : @UserID,@ProjectID,@VersionId
        Type   : GET
        Purpose: To get decomposition process level 1 heatmap 
    */
    public function getProcessLevel1HeatMap($project_id,$versionId){
        try{
            $userId = $this->user_data['UserID'];
            $params = array(
                $userId,
                $project_id,
                $versionId
            );
            $data = DB::select(' EXEC uspGetDecompositionProcessLevel1HeatMap ?,?,?',$params);
            //print_r($data);
            $function_data = [];
            if($data){
                foreach($data as $k => $value){
                    {
                        $all_data['function'.$value->FunctionID]['phase'.$value->PhaseID][] = array(
                            'DecompositionProcessLevel1ID'=>$value->DecompositionProcessLevel1ID, 
                            'GridViewLocationID'=>$value->GridViewLocationID,
                            'ProcessLevel1Name'=>$value->ProcessLevel1Title,
                            'Status' => $value->Status,
                            'AggrScore' => $value->AggrScore,
                            'status' => $value->Status,
                            'function_id'=>$value->FunctionID,
                            'phase_id' => $value->PhaseID,
                            'style_id' => $value->StyleID,
                            'style_name' => $value->StyleName,
							'Rank' => $value->Rank
                        );
                    }

                    // $phase_data['DecompositionProcessLevel1ID'] = $value->DecompositionProcessLevel1ID;
                    // $phase_data['GridViewLocationID'] = $value->GridViewLocationID;
                    // $phase_data['ProcessLevel1Name'] = $value->ProcessLevel1Title;
                    // $phase_data['Status'] = $value->Status;
                    // $phase_data['AggrScore'] = $value->AggrScore;
                    // $phase_data['status'] = $value->Status;
                    // $phase_data['function_id'] = $value->FunctionID;
                    // $phase_data['phase_id'] = $value->PhaseID;
                    // $phase_data['style_id'] = $value->StyleID;
                    // $phase_data['style_name'] = $value->StyleName;
                    // $all_data[] = $phase_data;
                }
                //sort functions by order
                // usort($all_data, array($this,'sortByFunction'));
               
                // foreach($all_data as $data){
                //     $function_data['f'.$data['function_id']][] = $data;
                // }

                // foreach($function_data as $k => $phases){
                //     usort($phases, array($this,'sortByPhase'));
                //     foreach($phases as $phase){
                //         $fp_data[$k][$phase['phase_id']][] = $phase;
                //     }      
                // }
                // //create json response
                // $f_id = 1;
                // foreach($fp_data as $k => $p_data){
                //     $p_id = 1;
                //     foreach($p_data as $p => $value){
                //         $response_data['function'.$f_id]['phase'.$p_id] = $value;
                //         $p_id++;
                //     }
                //     $f_id++;
                // }
                // //sort by location
                // foreach($response_data as $key => $r_data){
                //     foreach($r_data as $pk => $v_data){
                //         usort($v_data, array($this,'sortByLocation'));
                //          $response[$key][$pk] = $v_data;
                //     }  
                // }
                $response = $all_data;
                $message = "decomposition level 1 data retrieved.";
            }else{
                $response= (Object)[];
                $message = "No data found";
            }
        return $this->sendResponse($response, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }   
    /*
        Author : Abdul
        Date   : 02/12/2019
        Name   : getDecompositionProjectFunction
        Params : @DecompositionProjectID,@UserID
        Type   : GET
        Purpose: To get decomposition project function
    */
    public function getDecompositionProjectFunction( Request $request, $DecompositionProjectID, $TemplateID ){
        try{
           

            //$data = DB::select(' EXEC Amplo.uspGetDecompositionFunction ?', array($TemplateID) );
			$data = DB::select(' EXEC uspGetDecompositionFunctionClient ?', array($TemplateID) );
			if(count($data) > 0){
				//$data1 = DB::select(' EXEC uspGetDecompositionProjectFunction ?,?,?',array($this->user_data['UserID'],$DecompositionProjectID,$TemplateID));
                $data1 = DB::select(' EXEC uspGetDecompositionProjectFunctionClient ?,?,?',array($this->user_data['UserID'],$DecompositionProjectID,$TemplateID));
				$selected = 0;
				foreach($data as $value){
					if (array_search($value->DecompositionFunctionID, array_column($data1, 'FunctionId')) !== FALSE){
					  $selected = 1;
					}else{
						$selected = 0;
					}
					$data2['DecompositionFunctionID'] = $value->DecompositionFunctionID;
					$data2['FunctionTitle'] = $value->FunctionTitle;
					$data2['selected'] = $selected;
					$function[] = $data2;
				}
				$message = "decomposition function project data retrieved successfully.";
			}else{
				$function = array();
				$message = "No data found";
			}
			return $this->sendResponse($function, $message);         

        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 02/12/2019
        Name   : getDecompositionProjectPhase
        Params : @DecompositionProjectID,@UserID
        Type   : GET
        Purpose: To get decomposition project phase
    */
    public function getDecompositionProjectPhase( Request $request, $DecompositionProjectID, $TemplateID ){
        try{
          
			//$data = DB::select(' EXEC Amplo.uspGetDecompositionPhase ?', array($TemplateID) );
			$data = DB::select(' EXEC uspGetDecompositionPhaseClient ?', array($TemplateID) );
            if( count($data) ){
				//$data1 = DB::select(' EXEC uspGetDecompositionProjectPhase ?,?,?',array($this->user_data['UserID'],$DecompositionProjectID,$TemplateID));
                $data1 = DB::select(' EXEC uspGetDecompositionProjectPhaseClient ?,?,?',array($this->user_data['UserID'],$DecompositionProjectID,$TemplateID));
				$selected = 0;
				foreach($data as $value){
					if (array_search($value->DecompositionPhaseID, array_column($data1, 'PhaseId')) !== FALSE){
					  $selected = 1;
					}else{
						$selected = 0;
					}
					$data2['DecompositionPhaseID'] = $value->DecompositionPhaseID;
					$data2['PhaseTitle'] = $value->PhaseTitle;
					$data2['selected'] = $selected;
					$function[] = $data2;
				}
				
                $message = "Decomposition project phase retrieved successfully.";
            }else{
				$function = array();
                $message = "No record found.";
            } 
            return $this->sendResponse($function, $message); 
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
     /*
        Author : Abdul
        Date   : 04/12/2019
        Name   : getDecompositionProjectUsers
        Params : @DecompositionProjectID,@UserID
        Type   : GET
        Purpose: To get users list by passing the decomposition project id
    */
    public function getDecompositionProjectUsers( Request $request, $DecompositionProjectID ){
        try{
            $data = DB::select(' EXEC uspGetDecompositionProjectUsers ?,?',array($DecompositionProjectID, $this->user_data['UserID']) );

            if( count($data) ){
                $message = "Decomposition project user retrieved successfully.";
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
        Date   : 06/12/2019
        Name   : getDecompositionUserAccess
        Params : @DecompositionProjectID,@UserID
        Type   : GET
        Purpose: To get capability modeling access
    */
    public function getDecompositionUserAccess( Request $request,$projectId,$userId,$templateId ){
        try{
            $params_array = array(
                $projectId,
                $userId,
                $templateId
            );
            $data = DB::select('EXEC uspGetDecompositionUserAccess ?,?,?',$params_array);
            if( count($data) > 0){
                $message = "Decomposition project user access retrieved successfully.";
            }else{
                $message = "No record found.";
            }
            return $this->sendResponse($data, $message);

        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }  
    }    
    /*
        Author : Abdul
        Date   : 04/12/2019
        Name   : saveDecompositionProjectUsersAccess
        Params : 
        Type   : GET
        Purpose: To save  capability modeling access
    */
    public function saveDecompositionProjectUsersAccess( Request $request ){
        try{
            /*echo $this->user_data['UserID'];echo "<br>";
            echo $this->user_data['ClientID'];
            die;*/
            $validator = Validator::make($request->all(), [
                'ProjectId'         => 'required|numeric',
                'UserID'            => 'required|numeric',
                "selectedFunctions" => "required|array|min:1",
                "selectedPhases"    => "required|array|min:1",
                "permissions"       => "array"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            
            $ProjectId         = $requestData['ProjectId'];
            $TemplateId         = $requestData['TemplateId'];
            $UserID            = $requestData['UserID'];

            $selectedFunctions['root'] = $requestData['selectedFunctions'];
            $selectedPhases['root'] = $requestData['selectedPhases'];
            $permissions['root']  = $requestData['permissions'];

            $selFunction = json_encode($selectedFunctions);
            $selPhase    = json_encode($selectedPhases);
            $per         = json_encode($permissions);

            
            $params_array1 = array(
                $this->user_data['ClientID'],
                $ProjectId,
                $UserID,
                $selFunction,
                $selPhase,
                $per
            );
            $params_array2 = array(
                $ProjectId,
                $TemplateId,
                $this->user_data['UserID']
            );
           //echo "<pre>";print_r( $params_array1 );echo "<br>";die;
           $data = DB::statement(' EXEC uspSaveFunctionsAndPhases ?,?,?,?,?,?',$params_array1);
           DB::statement(' EXEC uspSaveTemplateAndGenerateDataForProject ?,?,?',$params_array2);
           if( $data){
                $message = "Successfully given permission";
                $resp['ProjectId'] = $ProjectId;
                return $this->sendResponse($resp, $message);    
           }else{
               throw new \Exception('An error occured');
           }
           return $this->sendResponse($resp, $message);
            
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }    
    }


    /*
        Author : Prabir
        Date   : 27/01/2020
        Name   : post_upload_template_image
        Params : 
        Type   : POST
        Purpose: To upload file, parse file data,Save in data base
    */
    public function SaveTemplateImage( Request $request ){        
        try{
            $validator = Validator::make($request->all(), [
                'templateId'         => 'required|numeric'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $destinationPathImage  = public_path('/Template');
            
            if(! is_dir($destinationPathImage)){
                mkdir($destinationPathImage, 0777,true);
            }
            $templateId           = $request->input('templateId'); 
            $imageUrl           = $request->input('imageUrl'); 
            define('UPLOAD_DIR', 'Template/');
            $img = str_replace('data:image/png;base64,', '', $imageUrl);
            $img = str_replace(' ', '+', $img);
            $data = base64_decode($img);
            $image_name = uniqid().time(). '.png';
            $file = UPLOAD_DIR . $image_name;
            $success = file_put_contents($file, $data);
			$date = date('Y-m-d H:i:s');
            DB::statement(" EXEC Amplo.uspSaveTemplateImage ".$templateId.",'".$image_name."','".$date."'");
            //return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
       
    }


     /*
        Author : Abdul
        Date   : 13/12/2019
        Name   : generateCSV
        Params : @projectId,@processLevel1Id
        Type   : GET
        Purpose: To generate xls file
    */
     public function generateCSV( request $request, $projectId,$processLevel1Id,$version ){
        try{
            if($version==0){
                $version = "";
            }
           
            $CapabilityModelingProjects = DB::select('EXEC UspCapabilityModelingProjectsExport ?,?',array($projectId, $version));
            $ScoreCriteria = DB::select('EXEC uspScoreCriteriaExport ?,?,?',array($projectId,$processLevel1Id,$version));

            $ProcessLevel1 = DB::select('EXEC uspProcessLevel1Export ?,?,?',array($projectId,$processLevel1Id,$version));

            $ProcessDecomposition = DB::select('EXEC uspProcessDecompositionExport ?,?,?',array($projectId,$processLevel1Id,$version));
           
            $CapabilityModelingProjects = json_decode(json_encode($CapabilityModelingProjects), True);
            $ScoreCriteria        = json_decode(json_encode($ScoreCriteria), True);
            $ProcessLevel1        = json_decode(json_encode($ProcessLevel1), True);
            $ProcessDecomposition = json_decode(json_encode($ProcessDecomposition), True);
            
            if( count($CapabilityModelingProjects) > 0 && count($ScoreCriteria) > 0 && count($ProcessLevel1) > 0){
                
                /* Create new PHPExcel object*/
                $objPHPExcel = new PHPExcel();

                $styleArray = array(
                    'fill' => array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'color' => array('rgb' => 'D3D3D3')
                    ),
                    'font'  => array(
                        'bold'  => true
                    ),
                    'borders' => array(
                        'allborders' => array(
                            'style' => PHPExcel_Style_Border::BORDER_THIN,
                            'color' => array('rgb' => '000000')
                        )
                    )
                );
                $styleArrayCol = array(
                    'borders' => array(
                        'allborders' => array(
                            'style' => PHPExcel_Style_Border::BORDER_THIN,
                            'color' => array('rgb' => '000000')
                        )
                    )
                );
                /* Create a first sheet, representing sales data*/
                $objPHPExcel->setActiveSheetIndex(0);
                $objPHPExcel->setActiveSheetIndex(0)->getProtection()->setSheet(true);
                $objPHPExcel->getActiveSheet()->setCellValue('A1', 'Capability Modeling Project Name')->getStyle('A1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
                
                $i=2;
                foreach ($CapabilityModelingProjects as $key => $value) {
                    
                    $ProjectName=$value['ProjectName'];
                    $objPHPExcel->getActiveSheet()->setCellValue("A$i",$ProjectName)->getStyle('A'.$i)->applyFromArray($styleArrayCol);
                    $i++;
                }
                
                /*Rename sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Capability Modeling Project');


                /* Create a new worksheet, after the default sheet*/
                $objPHPExcel->createSheet();

                /* Add some data to the second sheet, resembling some different data types*/
                $objPHPExcel->setActiveSheetIndex(1);
                $objPHPExcel->setActiveSheetIndex(1)->getProtection()->setSheet(true);
                $objPHPExcel->getActiveSheet()->setCellValue('A1', 'Scoring Criteria Column')->getStyle('A1')->applyFromArray($styleArray);
                 
                $objPHPExcel->getActiveSheet()->setCellValue('B1', 'ScoreCriteria1')->getStyle('B1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('C1', 'ScoreCriteria2')->getStyle('C1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('D1', 'ScoreCriteria3')->getStyle('D1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('E1', 'ScoreCriteria4')->getStyle('E1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('F1', 'ScoreCriteria5')->getStyle('F1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('G1', 'ScoreCriteria6')->getStyle('G1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('H1', 'ScoreCriteria7')->getStyle('H1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('I1', 'ScoreCriteria8')->getStyle('I1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('J1', 'ScoreCriteria9')->getStyle('J1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('K1', 'ScoreCriteria10')->getStyle('K1')->applyFromArray($styleArray);

                $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('G')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('H')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('I')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('J')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('K')->setAutoSize(true);

                $i=2;
                foreach ($ScoreCriteria as $key => $value) {
                    
                    $ScoringCriteriaColumn= $value['ScoringCriteriaColumn'];
                    $ScoreCriteria1       = $value['ScoreCriteria1'];
                    $ScoreCriteria2       = $value['ScoreCriteria2'];
                    $ScoreCriteria3       = $value['ScoreCriteria3'];
                    $ScoreCriteria4       = $value['ScoreCriteria4'];
                    $ScoreCriteria5       = $value['ScoreCriteria5'];
                    $ScoreCriteria6       = $value['ScoreCriteria6'];
                    $ScoreCriteria7       = $value['ScoreCriteria7'];
                    $ScoreCriteria8       = $value['ScoreCriteria8'];
                    $ScoreCriteria9       = $value['ScoreCriteria9'];
                    $ScoreCriteria10      = $value['ScoreCriteria10'];
                    
                    $objPHPExcel->getActiveSheet()->getStyle("A$i")->getFill()->applyFromArray(array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'startcolor' => array(
                             'rgb' => 'ff726f'
                        )
                    ));
 
                    $objPHPExcel->getActiveSheet()->setCellValue("A$i",$ScoringCriteriaColumn)->getStyle('A'.$i)->applyFromArray($styleArrayCol) ;
                    $objPHPExcel->getActiveSheet()->setCellValue("B$i",$ScoreCriteria1)->getStyle('B'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("C$i",$ScoreCriteria2)->getStyle('C'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("D$i",$ScoreCriteria3)->getStyle('D'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("E$i",$ScoreCriteria4)->getStyle('E'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("F$i",$ScoreCriteria5)->getStyle('F'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("G$i",$ScoreCriteria6)->getStyle('G'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("H$i",$ScoreCriteria7)->getStyle('H'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("I$i",$ScoreCriteria8)->getStyle('I'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("J$i",$ScoreCriteria9)->getStyle('J'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("K$i",$ScoreCriteria10)->getStyle('K'.$i)->applyFromArray($styleArrayCol);
                    $i++;
                }

                /* Rename 2nd sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Scoring Mechanisms');

                /* Create a new worksheet, after the second sheet*/
                $objPHPExcel->createSheet();

                /* Add some data to the second sheet, resembling some different data types*/
                $objPHPExcel->setActiveSheetIndex(2);
                $objPHPExcel->getActiveSheet()->setCellValue('A1', 'Phase (Activities Horizontal)')->getStyle('A1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('B1', 'Function (Activities Vertical)')->getStyle('B1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('C1', 'Level 1 Activity Title')->getStyle('C1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('D1', 'Priority')->getStyle('D1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('E1', 'Owner')->getStyle('E1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('F1', 'Country')->getStyle('F1')->applyFromArray($styleArray);

                $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setAutoSize(true);
                $i=2;
                
                foreach ($ProcessLevel1 as $key => $value) {
                    
                    $PhaseName          = $value['PhaseName'];
                    $FunctionName       = $value['FunctionName'];
                    $ProcessLevel1Name  = $value['ProcessLevel1Title'];
                    $Priority           = $value['Priority'];
                    $Owner              = $value['Owner'];
                    $CountrySpecific    = $value['Country'];
                    
                    $objPHPExcel->getActiveSheet()->getStyle("A$i")->getFill()->applyFromArray(array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'startcolor' => array(
                             'rgb' => 'ff726f'
                        )
                    ));
                    
                    $objPHPExcel->getActiveSheet()->getStyle("B$i")->getFill()->applyFromArray(array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'startcolor' => array(
                             'rgb' => 'ff726f'
                        )
                    ));
                    
                    $objPHPExcel->getActiveSheet()->getStyle("C$i")->getFill()->applyFromArray(array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'startcolor' => array(
                             'rgb' => 'ff726f'
                        )
                    ));

                    $objPHPExcel->getActiveSheet()->setCellValue("A$i",$PhaseName);
                    $objPHPExcel->getActiveSheet()->setCellValue("B$i",$FunctionName);
                    $objPHPExcel->getActiveSheet()->setCellValue("C$i",$ProcessLevel1Name);
                    $objPHPExcel->getActiveSheet()->setCellValue("D$i",$Priority);
                    $objPHPExcel->getActiveSheet()->setCellValue("E$i",$Owner);
                    $objPHPExcel->getActiveSheet()->setCellValue("F$i",$CountrySpecific);
                    $i++;
                }

                /* Rename 3rd sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Level1 Activity');

                /* Create a new worksheet, after the third sheet*/
                $objPHPExcel->createSheet();

                /* Add some data to the third sheet, resembling some different data types*/
                $objPHPExcel->setActiveSheetIndex(3);

                
                if(count($ProcessDecomposition) > 0){
                    $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($ProcessDecomposition)), null, 'A1');
                    $objPHPExcel->getActiveSheet()->fromArray($ProcessDecomposition, null, 'A2');
                }
                
                $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);
                for ($i = 'A'; $i !=  $objPHPExcel->getActiveSheet()->getHighestColumn(); $i++) {
                    $objPHPExcel->getActiveSheet()->getColumnDimension($i)->setAutoSize(TRUE);
                    
                }
                for($i=1; $i<=count($ProcessDecomposition); $i++){
                    $objPHPExcel->getActiveSheet()->getStyle('A'.$i.':'.$column.($i+1))->applyFromArray($styleArrayCol);;
                }
                /* Rename 4th sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Process Decomposition');
                
                
                $date=date('d-M-Y-H-i-s');
                $filename   ='DecompositionTreeViewData'.'-'.$date.'.xls'; 
                /* Redirect output to a client’s web browser (Excel5)*/
                $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
                // Sending headers to force the user to download the file
                header('Content-Type: application/vnd.ms-excel');
                header('Content-Disposition: attachment;filename="'.$filename.'"');
                header('Cache-Control: max-age=0');
                //$objWriter->save('php://output');
                //die;
                $objWriter->save($filename);
                if (file_exists(public_path($filename))){
                    $message = "file generate successfully";
                    $data    = array("file_name"=> $filename );
                    return $this->sendResponse($data, $message);  
                } 
                else{
                    $message = "file not generated";
                    $data    = array("file_name"=>"");
                    return $this->sendResponse($data, $message);  
                }
                
            }else{
                $message  = "No record found";
                $data    = array("file_name"=>"");
                return $this->sendResponse($data, $message); 
            }

        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }    
    
     /*
        Author : Abdul
        Date   : 20/12/2019
        Name   : unlinkFile
        Params : file_name
        Type   : POST
        Purpose: To unlink file from server
    */
    public function unlinkFile( Request $request ){
        try{
            $validator = Validator::make($request->all(), [
                'file_name'   => 'required'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $filename = $request['file_name'];
            if (file_exists(public_path($filename))){
                $file_path = public_path().'/'.$filename;
                if(unlink($file_path)){
                    $message = "file has been removed.";
                    $data = array("message"=>$message);
                }else{
                    $message = "file does not removed";
                    $data = array("message"=>$message);
                }
            }else{
                $message = "file does not exist";
                $data = array("message"=>$message);  
            }
            return $this->sendResponse($data, $message);
        }catch( \Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }    
    /*
        Author : Abdul
        Date   : 13/12/2019
        Name   : post_upload_file
        Params : 
        Type   : POST
        Purpose: To upload file, parse file data,Save in data base
    */
    public function post_upload_file( Request $request ){
        
        try{
            ini_set('max_execution_time', 120); //120 seconds =  2 minutes
            $validator = Validator::make($request->all(), [
                'files'   => 'required',
                'files.*' => 'mimes:xls,xlsx'
            ]);
            $processLevelId = $request->input('processLevelId');
            $projectId      = $request->input('projectId');

            // if ($validator->fails()) {
            //     return $this->sendError('Validation Errors',$validator->errors());
            // }
            $files           = $request->file('files'); 
           
            $uploadcount = 0;
            $flag =0;
            foreach($files as $file) {
                
                //echo $file_name      = microtime().'.'.$file->getClientOriginalExtension();
                $file_name      = date('d-M-Y-H-i-s').'-'.$file->getClientOriginalName();
               
                $dirname        = $request['module'];
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

                /*chmod($destinationPath, 0777);
                chmod($destinationPathImport, 0777);
                chmod($destinationPathArchive, 0777);
                chmod($source_file, 0777);*/

                $common_model   = new Common();
                $column_array  = $common_model->readXLSJsonRoot( $source_file );
                foreach($column_array['ProcessDecomposition'] as $key=>$val){
                    
                    $dotCount = substr_count($val['NodeId'],".");
                    
                    if($dotCount==1){
                        $nodeIdLevel2 = $val['NodeId'];
                        $column_array['ProcessDecomposition'][$key]['L2ActivityTitle'] = $val['L2ActivityTitle'].'('.$nodeIdLevel2.')';
                    }
                    if($dotCount==2){
                        $nodeIdLevel3 = $val['NodeId'];
                        $column_array['ProcessDecomposition'][$key]['L2ActivityTitle'] = $val['L2ActivityTitle'].'('.$nodeIdLevel2.')';
                        $column_array['ProcessDecomposition'][$key]['L3ActivityTitle'] = $val['L3ActivityTitle'].'('.$nodeIdLevel3.')';
                    }
                    if($dotCount==3){
                        $nodeIdLevel4 = $val['NodeId'];
                        $column_array['ProcessDecomposition'][$key]['L2ActivityTitle'] = $val['L2ActivityTitle'].'('.$nodeIdLevel2.')';
                        $column_array['ProcessDecomposition'][$key]['L3ActivityTitle'] = $val['L3ActivityTitle'].'('.$nodeIdLevel3.')';
                        $column_array['ProcessDecomposition'][$key]['L4ActivityTitle'] = $val['L4ActivityTitle'].'('.$nodeIdLevel4.')';
                    }
                    if($dotCount==4){
                        $nodeIdLevel5 = $val['NodeId'];
                        $column_array['ProcessDecomposition'][$key]['L2ActivityTitle'] = $val['L2ActivityTitle'].'('.$nodeIdLevel2.')';
                        $column_array['ProcessDecomposition'][$key]['L3ActivityTitle'] = $val['L3ActivityTitle'].'('.$nodeIdLevel3.')';
                        $column_array['ProcessDecomposition'][$key]['L4ActivityTitle'] = $val['L4ActivityTitle'].'('.$nodeIdLevel4.')';
                        $column_array['ProcessDecomposition'][$key]['L5ActivityTitle'] = $val['L5ActivityTitle'].'('.$nodeIdLevel5.')';
                    }
                    
                    unset($column_array['ProcessDecomposition'][$key]['NodeId']);
                }
                $CapabilityModelingProjects   = $column_array['CapabilityModelingProjects'][0]['Capability Modeling Project Name'];
                $CapabilityModelingProjectsJson       = json_encode($CapabilityModelingProjects);

                $ScoringCriteria['root']   = $column_array['ScoringCriteria'];
                $ScoringCriteriaJson       = json_encode($ScoringCriteria);

                $ProcessLevel1['root']     = $column_array['ProcessLevel1'];
                $ProcessLevel1Json         = json_encode($ProcessLevel1);

                $ProcessDecomposition['root']= $column_array['ProcessDecomposition'];
                $ProcessDecompositionJson    = json_encode($ProcessDecomposition);

                
                $params_array = array(
                    $CapabilityModelingProjectsJson,
                    $ScoringCriteriaJson,
                    $ProcessLevel1Json,
                    $ProcessDecompositionJson,
                    $this->user_data['UserID'],
                    $processLevelId,
                    $ProcessLevel1['root'][0]['Function'],
                    $ProcessLevel1['root'][0]['Phase'],
                    $projectId
                );
                $data = DB::select(' EXEC uspCMImportToStaging ?,?,?,?,?,?,?,?,?',$params_array);
                dump('uspCMImportToStaging params', $params_array);
                dump('uspCMImportToStaging response', $data);
                
                if(count($data)>0 && isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                    $response = DB::statement(" EXEC uspImportToInterfaceFromStaging '".$data[0]->StagingId."'");
                    dump('uspImportToInterfaceFromStaging params', $data[0]->StagingId);
                    dump('uspImportToInterfaceFromStaging response', $response);
                    
                    if( $response ==1){
                        DB::statement(" EXEC uspImportToInterfaceFromStaging_Step2 '".$data[0]->StagingId."'");
                        dump('uspImportToInterfaceFromStaging_Step2 params', $data[0]->StagingId);

                        DB::statement(" EXEC uspImportToInterfaceToMain '".$data[0]->StagingId."'");
                        dump('uspImportToInterfaceToMain params', $data[0]->StagingId);

                        rename($source_file, $destinationPathArchive.'/'. pathinfo($source_file, PATHINFO_BASENAME));
                        $flag =1;
                    }
                }else{
                    $flag =0;
                    $message = $data; 
                }
                $uploadcount ++;
            }
            
            if( $flag ==1 ){
                $message = "file upload successfully";
                $data    = array("message"=>$message);
                return $this->sendResponse($data, $message);
            }else{
               return $this->sendError($data);
            }
            //return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
       
    }    
    /*
        Author : Abdul
        Date   : 01/10/2020
        Name   : exportCMProject
        Params : @projectId,@version
        Type   : GET
        Purpose: To export CM project
    */
    public function exportCMProject( request $request, $projectId,$version ){
        try{
            if($version==0){
                $version = "";
            }
           
            $CapabilityModelingProjects = DB::select('EXEC UspCapabilityModelingProjectsExport ?,?',array($projectId, $version));
            
            $ScoreCriteria = DB::select('EXEC uspScoreCriteriaExportForProject ?,?',array($projectId,$version));
           
            $ProcessLevel1 = DB::select('EXEC uspProcessLevel1ExportForProject ?,?',array($projectId,$version));
            //echo "<pre>";print_r($ProcessLevel1);echo "<br>";die;
            $ProcessDecomposition = DB::select('EXEC uspProcessDecompositionExportForProject ?,?',array($projectId,$version));
           
            $CapabilityModelingProjects = json_decode(json_encode($CapabilityModelingProjects), True);
            $ScoreCriteria        = json_decode(json_encode($ScoreCriteria), True);
            $ProcessLevel1        = json_decode(json_encode($ProcessLevel1), True);
            $ProcessDecomposition = json_decode(json_encode($ProcessDecomposition), True);
            
            if( count($CapabilityModelingProjects) > 0 && count($ScoreCriteria) > 0 && count($ProcessLevel1) > 0){
                
                /* Create new PHPExcel object*/
                $objPHPExcel = new PHPExcel();

                $styleArray = array(
                    'fill' => array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'color' => array('rgb' => 'D3D3D3')
                    ),
                    'font'  => array(
                        'bold'  => true
                    ),
                    'borders' => array(
                        'allborders' => array(
                            'style' => PHPExcel_Style_Border::BORDER_THIN,
                            'color' => array('rgb' => '000000')
                        )
                    )
                );
                $styleArrayCol = array(
                    'borders' => array(
                        'allborders' => array(
                            'style' => PHPExcel_Style_Border::BORDER_THIN,
                            'color' => array('rgb' => '000000')
                        )
                    )
                );
                /* Create a first sheet, representing sales data*/
                $objPHPExcel->setActiveSheetIndex(0);
                $objPHPExcel->setActiveSheetIndex(0)->getProtection()->setSheet(true);
                $objPHPExcel->getActiveSheet()->setCellValue('A1', 'Capability Modeling Project Name')->getStyle('A1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
                
                $i=2;
                foreach ($CapabilityModelingProjects as $key => $value) {
                    
                    $ProjectName=$value['ProjectName'];
                    $objPHPExcel->getActiveSheet()->setCellValue("A$i",$ProjectName)->getStyle('A'.$i)->applyFromArray($styleArrayCol);
                    $i++;
                }
                
                /*Rename sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Capability Modeling Project');


                /* Create a new worksheet, after the default sheet*/
                $objPHPExcel->createSheet();

                /* Add some data to the second sheet, resembling some different data types*/
                $objPHPExcel->setActiveSheetIndex(1);
                $objPHPExcel->setActiveSheetIndex(1)->getProtection()->setSheet(true);
                $objPHPExcel->getActiveSheet()->setCellValue('A1', 'ProcessLevel1Id')->getStyle('A1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('B1', 'ProcessName')->getStyle('B1')->applyFromArray($styleArray);
                 
                $objPHPExcel->getActiveSheet()->setCellValue('C1', 'ScoreCriteria1')->getStyle('C1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('D1', 'ScoreCriteria2')->getStyle('D1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('E1', 'ScoreCriteria3')->getStyle('E1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('F1', 'ScoreCriteria4')->getStyle('F1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('G1', 'ScoreCriteria5')->getStyle('G1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('H1', 'ScoreCriteria6')->getStyle('H1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('I1', 'ScoreCriteria7')->getStyle('I1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('J1', 'ScoreCriteria8')->getStyle('J1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('K1', 'ScoreCriteria9')->getStyle('K1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('L1', 'ScoreCriteria10')->getStyle('L1')->applyFromArray($styleArray);

                $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('G')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('H')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('I')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('J')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('K')->setAutoSize(true);
                 $objPHPExcel->getActiveSheet()->getColumnDimension('L')->setAutoSize(true);

                $i=2;
                foreach ($ScoreCriteria as $key => $value) {
                    
                    $ProcessLevel1Id      = $value['ProcessLevel1Id'];
                    $ScoringCriteriaColumn= $value['ProcessName'];
                    $ScoreCriteria1       = $value['ScoreCriteria1'];
                    $ScoreCriteria2       = $value['ScoreCriteria2'];
                    $ScoreCriteria3       = $value['ScoreCriteria3'];
                    $ScoreCriteria4       = $value['ScoreCriteria4'];
                    $ScoreCriteria5       = $value['ScoreCriteria5'];
                    $ScoreCriteria6       = $value['ScoreCriteria6'];
                    $ScoreCriteria7       = $value['ScoreCriteria7'];
                    $ScoreCriteria8       = $value['ScoreCriteria8'];
                    $ScoreCriteria9       = $value['ScoreCriteria9'];
                    $ScoreCriteria10      = $value['ScoreCriteria10'];
                    
                    
                    $objPHPExcel->getActiveSheet()->setCellValue("A$i",$ProcessLevel1Id)->getStyle('A'.$i)->applyFromArray($styleArrayCol) ;
                    $objPHPExcel->getActiveSheet()->setCellValue("B$i",$ScoringCriteriaColumn)->getStyle('B'.$i)->applyFromArray($styleArrayCol) ;
                    $objPHPExcel->getActiveSheet()->setCellValue("C$i",$ScoreCriteria1)->getStyle('C'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("D$i",$ScoreCriteria2)->getStyle('D'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("E$i",$ScoreCriteria3)->getStyle('E'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("F$i",$ScoreCriteria4)->getStyle('F'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("G$i",$ScoreCriteria5)->getStyle('G'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("H$i",$ScoreCriteria6)->getStyle('H'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("I$i",$ScoreCriteria7)->getStyle('I'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("J$i",$ScoreCriteria8)->getStyle('J'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("K$i",$ScoreCriteria9)->getStyle('K'.$i)->applyFromArray($styleArrayCol);
                    $objPHPExcel->getActiveSheet()->setCellValue("L$i",$ScoreCriteria10)->getStyle('L'.$i)->applyFromArray($styleArrayCol);
                    $i++;
                }

                /* Rename 2nd sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Scoring Mechanisms');

                /* Create a new worksheet, after the second sheet*/
                $objPHPExcel->createSheet();

                /* Add some data to the second sheet, resembling some different data types*/
                $objPHPExcel->setActiveSheetIndex(2);
                $objPHPExcel->getActiveSheet()->setCellValue('A1', 'ProcessLevel1Id')->getStyle('A1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('B1', 'Phase (Activities Horizontal)')->getStyle('B1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('C1', 'Function (Activities Vertical)')->getStyle('C1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('D1', 'Level 1 Activity Title')->getStyle('D1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('E1', 'Priority')->getStyle('E1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('F1', 'Owner')->getStyle('F1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('G1', 'Country')->getStyle('G1')->applyFromArray($styleArray);

                $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('C')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('D')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('E')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('F')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('G')->setAutoSize(true);
                $i=2;
                
                foreach ($ProcessLevel1 as $key => $value) {
                    $ProcessLevel1Id    = $value['ProcessLevel1Id'];
                    $PhaseName          = $value['PhaseName'];
                    $FunctionName       = $value['FunctionName'];
                    $ProcessLevel1Name  = $value['ProcessLevel1Title'];
                    $Priority           = $value['Priority'];
                    $Owner              = $value['Owner'];
                    $CountrySpecific    = $value['Country'];
                    
                    $objPHPExcel->getActiveSheet()->getStyle("A$i")->getFill()->applyFromArray(array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'startcolor' => array(
                             'rgb' => 'ff726f'
                        )
                    ));
                    
                    $objPHPExcel->getActiveSheet()->getStyle("B$i")->getFill()->applyFromArray(array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'startcolor' => array(
                             'rgb' => 'ff726f'
                        )
                    ));
                    
                    $objPHPExcel->getActiveSheet()->getStyle("C$i")->getFill()->applyFromArray(array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'startcolor' => array(
                             'rgb' => 'ff726f'
                        )
                    ));
                    $objPHPExcel->getActiveSheet()->setCellValue("A$i",$ProcessLevel1Id);
                    $objPHPExcel->getActiveSheet()->setCellValue("B$i",$PhaseName);
                    $objPHPExcel->getActiveSheet()->setCellValue("C$i",$FunctionName);
                    $objPHPExcel->getActiveSheet()->setCellValue("D$i",$ProcessLevel1Name);
                    $objPHPExcel->getActiveSheet()->setCellValue("E$i",$Priority);
                    $objPHPExcel->getActiveSheet()->setCellValue("F$i",$Owner);
                    $objPHPExcel->getActiveSheet()->setCellValue("G$i",$CountrySpecific);
                    $i++;
                }

                /* Rename 3rd sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Level1 Activity');

                /* Create a new worksheet, after the third sheet*/
                $objPHPExcel->createSheet();

                /* Add some data to the third sheet, resembling some different data types*/
                $objPHPExcel->setActiveSheetIndex(3);

                
                if(count($ProcessDecomposition) > 0){
                    $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($ProcessDecomposition)), null, 'A1');
                    $objPHPExcel->getActiveSheet()->fromArray($ProcessDecomposition, null, 'A2');
                }
                
                $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);
                for ($i = 'A'; $i !=  $objPHPExcel->getActiveSheet()->getHighestColumn(); $i++) {
                    $objPHPExcel->getActiveSheet()->getColumnDimension($i)->setAutoSize(TRUE);
                    
                }
                for($i=1; $i<=count($ProcessDecomposition); $i++){
                    $objPHPExcel->getActiveSheet()->getStyle('A'.$i.':'.$column.($i+1))->applyFromArray($styleArrayCol);;
                }
                /* Rename 4th sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Process Decomposition');
                
                
                $date=date('d-M-Y-H-i-s');
                $filename   ='CMProjectData'.'-'.$date.'.xls'; 
                /* Redirect output to a client’s web browser (Excel5)*/
                $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
                // Sending headers to force the user to download the file
                header('Content-Type: application/vnd.ms-excel');
                header('Content-Disposition: attachment;filename="'.$filename.'"');
                header('Cache-Control: max-age=0');
                //$objWriter->save('php://output');
                //die;
                $objWriter->save($filename);
                if (file_exists(public_path($filename))){
                    $message = "file generate successfully";
                    $data    = array("file_name"=> $filename );
                    return $this->sendResponse($data, $message);  
                } 
                else{
                    $message = "file not generated";
                    $data    = array("file_name"=>"");
                    return $this->sendResponse($data, $message);  
                }
                
            }else{
                $message  = "No record found";
                $data    = array("file_name"=>"");
                return $this->sendResponse($data, $message); 
            }

        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 01/10/2020
        Name   : importCMProject
        Params : 
        Type   : POST
        Purpose: To import CM project
    */
    public function importCMProject( Request $request ){
        try{
            ini_set('max_execution_time', 120); //120 seconds =  2 minutes
            $validator = Validator::make($request->all(), [
                'files'   => 'required',
                'files.*' => 'mimes:xls,xlsx'
            ]);
            $projectId = $request->input('projectId');
            $file      = $request->file('files');

            $file_name = date('d-M-Y-H-i-s').'-'.$file->getClientOriginalName();
            $dirname                = $request['module'];
            $destinationPath        = public_path('/'.$dirname);
            $destinationPathImport  = public_path('/'.$dirname.'/Import');
            $destinationPathArchive = public_path('/'.$dirname.'/Archive');

            // if(! is_dir($destinationPath) && ! is_dir($destinationPathImport) && ! is_dir($destinationPathArchive)){
            //     mkdir($destinationPath, 0755,true);
            //     mkdir($destinationPathImport, 0755,true);
            //     mkdir($destinationPathArchive, 0755,true);
            // }

            if(! is_dir($destinationPath) ){
                mkdir($destinationPath, 0755,true);
            }
            if(! is_dir($destinationPathImport) ){
                mkdir($destinationPathImport, 0755,true);
            }
            if(! is_dir($destinationPathArchive)){
                mkdir($destinationPathArchive, 0755,true);
            }

            $file->move($destinationPathImport, $file_name);
            $source_file =  $destinationPathImport.'/'.$file_name;
            // dd($destinationPath, is_dir($destinationPath), $destinationPathImport, is_dir($destinationPathImport), $destinationPathArchive, is_dir($destinationPathArchive), $source_file, is_dir($source_file));

            chmod($destinationPath, 0777);
            chmod($destinationPathImport, 0777);
            chmod($destinationPathArchive, 0777);
            chmod($source_file, 0777);

            $common_model   = new Common();
            $column_array  = $common_model->readCMProjectXLSJsonRoot( $source_file );

            foreach($column_array['ProcessDecomposition'] as $k=>$v){
                foreach($v as $key=>$val){
                    $dotCount = substr_count($val['NodeId'],".");
                    if($dotCount==1){
                        $nodeIdLevel2 = $val['NodeId'];
                        $column_array['ProcessDecomposition'][$k][$key]['L2ActivityTitle'] = $val['L2ActivityTitle'].'('.$nodeIdLevel2.')';
                       
                    }
                    if($dotCount==2){
                        $nodeIdLevel3 = $val['NodeId'];
                        $column_array['ProcessDecomposition'][$k][$key]['L2ActivityTitle'] = $val['L2ActivityTitle'].'('.$nodeIdLevel2.')';
                        $column_array['ProcessDecomposition'][$k][$key]['L3ActivityTitle'] = $val['L3ActivityTitle'].'('.$nodeIdLevel3.')';
                    }
                    if($dotCount==3){
                        $nodeIdLevel4 = $val['NodeId'];
                        $column_array['ProcessDecomposition'][$k][$key]['L2ActivityTitle'] = $val['L2ActivityTitle'].'('.$nodeIdLevel2.')';
                        $column_array['ProcessDecomposition'][$k][$key]['L3ActivityTitle'] = $val['L3ActivityTitle'].'('.$nodeIdLevel3.')';
                        $column_array['ProcessDecomposition'][$k][$key]['L4ActivityTitle'] = $val['L4ActivityTitle'].'('.$nodeIdLevel4.')';
                    }
                    if($dotCount==4){
                        $nodeIdLevel5 = $val['NodeId'];
                        $column_array['ProcessDecomposition'][$k][$key]['L2ActivityTitle'] = $val['L2ActivityTitle'].'('.$nodeIdLevel2.')';
                        $column_array['ProcessDecomposition'][$k][$key]['L3ActivityTitle'] = $val['L3ActivityTitle'].'('.$nodeIdLevel3.')';
                        $column_array['ProcessDecomposition'][$k][$key]['L4ActivityTitle'] = $val['L4ActivityTitle'].'('.$nodeIdLevel4.')';
                        $column_array['ProcessDecomposition'][$k][$key]['L5ActivityTitle'] = $val['L5ActivityTitle'].'('.$nodeIdLevel5.')';
                    }

                    unset($column_array['ProcessDecomposition'][$k][$key]['NodeId']);    
                }
                
            }
            $CapabilityModelingProjects   = $column_array['CapabilityModelingProjects'][0]['Capability Modeling Project Name'];
            $CapabilityModelingProjectsJson = json_encode($CapabilityModelingProjects);
            $uploadcount = 0;
            $flag = 0;
            foreach($column_array['ScoringCriteria'] as $key=>$val){
                $ScoringCriteria['root']   = $column_array['ScoringCriteria'][$key];
                $ScoringCriteriaJson       = json_encode($ScoringCriteria);

                $ProcessLevel1['root']     = $column_array['ProcessLevel1'][$key];
                $ProcessLevel1Json         = json_encode($ProcessLevel1);

                $ProcessDecomposition['root']= $column_array['ProcessDecomposition'][$key];
                $ProcessDecompositionJson    = json_encode($ProcessDecomposition);

                $params_array = array(
                    $CapabilityModelingProjectsJson,
                    $ScoringCriteriaJson,
                    $ProcessLevel1Json,
                    $ProcessDecompositionJson,
                    $this->user_data['UserID'],
                    $key,
                    $column_array['ProcessLevel1'][$key][0]['Function'],
                    $column_array['ProcessLevel1'][$key][0]['Phase'],
                    $projectId
                );
                $data = DB::select(' EXEC uspCMImportToStaging ?,?,?,?,?,?,?,?,?',$params_array);
                dump('uspCMImportToStaging params', $params_array);
                dump('uspCMImportToStaging response', $data);
                
                if(count($data)>0 && isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                    $response = DB::statement(" EXEC uspImportToInterfaceFromStaging '".$data[0]->StagingId."'");
                    dump('uspImportToInterfaceFromStaging params', $data[0]->StagingId);
                    dump('uspImportToInterfaceFromStaging response', $response);
                    if( $response ==1){
                        DB::statement(" EXEC uspImportToInterfaceFromStaging_Step2 '".$data[0]->StagingId."'");
                        dump('uspImportToInterfaceFromStaging_Step2 params', $data[0]->StagingId);
                        
                        DB::statement(" EXEC uspImportToInterfaceToMain '".$data[0]->StagingId."'");
                        dump('uspImportToInterfaceToMain params', $data[0]->StagingId);
                        
                        if(file_exists($source_file)){
                            rename($source_file, $destinationPathArchive.'/'. pathinfo($source_file, PATHINFO_BASENAME));
                        }
                        $flag =1;
                    }
                }else{
                    $flag =0;
                    $message = $data; 
                }
                $uploadcount ++;
            }

            die;

            if( $flag ==1 ){
                $message = "file upload successfully";
                $data    = array("message"=>$message);
                return $this->sendResponse($data, $message);
            }else{
               return $this->sendError($data);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }    
    /*
        Author : Prabir
        Date   : 02/01/2020
        Name   : CreateTemplate
        Params : 
        Type   : POST
        Purpose: To get decomposition templates
    */
    public function createTemplate( request $request){
        try{
            $data = (Object)[];
            $validator = Validator::make($request->all(), [
                "templateName"  => 'required',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData       = $request->all();
            if(isset($requestData['existingTempData'])){
                $params = array(
                    $this->user_data['UserID'],
                    json_encode($requestData)
                );
                $data = DB::select(' EXEC Amplo.uspSavecustomizeTemplate ?,?', $params);
            }else{
                $clients['root'] = $requestData['clients'];
                $clientsJson     = json_encode($clients);
           
                $params_array = array(
                    0,
                    $requestData['templateName'],
                    $this->user_data['UserID'],
                    $clientsJson 
                );
                $data = DB::select(' EXEC Amplo.uspCreateTemplate ?,?,?,?',$params_array);
                $data[0]->clients = $requestData['clients'];

            }
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 

    /*
        Author : Prabir
        Date   : 02/01/2020
        Name   : UpdateTemplate
        Params : 
        Type   : POST
        Purpose: To update decomposition templates
    */
    public function updateTemplate( request $request){
        try{
            $data = (Object)[];
            $validator = Validator::make($request->all(), [
                "templateId" => 'required|numeric',
                "templateName"  => 'required',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData     = $request->all();
            $clients['root'] = $requestData['clients'];
            $clientsJson     = json_encode($clients);
           
            $params_array = array(
                $requestData['templateId'],
                $requestData['templateName'],
                $this->user_data['UserID'],
                $clientsJson 
            );
            $params = array(
                $requestData['templateId'],
                $clientsJson 
            );
            $data = DB::select(' EXEC Amplo.uspCreateTemplate ?,?,?,?',$params_array);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
                /*$data[0]->clients = $requestData['clients'];
                $message = $data[0]->MessageName;
                return $this->sendResponse($data[0], $message);*/

                $data1 = DB::select(' EXEC Amplo.uspGenerateDataForCMTemplateClient ?,?',$params);
                if(isset($data1[0]->Success) && ($data1[0]->Success == true || $data1[0]->Success ===1)){
                    $data[0]->clients = $requestData['clients'];
                    $message = $data[0]->MessageName;
                    return $this->sendResponse($data[0], $message);
                }else if(isset($data1[0]->Success)){
                    $message = $data1[0]->MessageName;  
                    return $this->sendError($message);
                }else if(is_array($data1) && count($data1) === 0){
                    $message = "Stored procedure is not returning anything.";
                    return $this->sendError($message);
                }else{
                    $message = "Stored procedure is returning wrong response.";
                    return $this->sendError($message);
                }
                
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
            //return $this->sendResponse($data[0], $data[0]->MessageName);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 


    /*
        Author : Prabir
        Date   : 06/01/2020
        Name   : deleteTemplate
        Params : 
        Type   : POST
        Purpose: To delete decomposition templates
    */
    public function deleteTemplate( request $request){
        try{
            $data = (Object)[];
            $validator = Validator::make($request->all(), [
                "templateId" => 'required|numeric'
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData       = $request->all();
           
            $params_array = array(
                $requestData['templateId'],
                $this->user_data['UserID']
            );
            //echo "<pre>"; print_r($params_array); exit;
            $data = DB::select(' EXEC Amplo.uspDeleteTemplate ?,?',$params_array);
            //echo "<pre>"; print_r($params_array); exit;
            return $this->sendResponse($data[0], $data[0]->MessageName);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 

    /*
        Author : Prabir
        Date   : 06/01/2020
        Name   : duplicateTemplate
        Params : 
        Type   : POST
        Purpose: To duplicate decomposition template
    */
    public function duplicateTemplate( request $request){
        try{
            $data = (Object)[];
            $validator = Validator::make($request->all(), [
                "templateId" => 'required|numeric',
                "templateName" => 'required',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData       = $request->all();
           
            $params_array = array(
                $requestData['templateId'],
                $this->user_data['UserID'],
                $requestData['templateName']                
            );
            //echo "<pre>"; print_r($params_array); exit;
            $data = DB::select(' EXEC Amplo.uspDuplicateTemplate ?,?,?',$params_array);
            //echo "<pre>"; print_r($params_array); exit;
            return $this->sendResponse($data[0], $data[0]->MessageName);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 

    

    /*
        Author : Abdul
        Date   : 13/12/2019
        Name   : getTemplates
        Params : 
        Type   : GET
        Purpose: To get decomposition templates
    */
    public function getTemplates( request $request){
        try{
            $params_array = [
                $this->user_data['UserID'],
            ];
            $data = DB::select(' EXEC Amplo.uspFetchTemplates ?', $params_array);
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $templates[$key]['value']      = $value->TemplateID;
                    $templates[$key]['label']      = $value->TemplateTitle;
                    $templates[$key]['image_path'] = $value->ImagePath;
					$templates[$key]['CreatedDate'] = $value->CreatedDate;
                    $templates[$key]['Assignment'] = $value->Assignment;
                    $templates[$key]['IsAmploAssigned']= $value->IsAmploAssigned;
                }
                $message = "Templates data retrieved";
                return $this->sendResponse($templates, $message);
            }else{
                $message = "No record found";
                return $this->sendResponse($data, $message);
            }
           
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    } 

    /*
        Author : Prabir
        Date   : 02/02/2020
        Name   : getTemplate
        Params : 
        Type   : GET
        Purpose: To get decomposition template
    */
    public function getTemplate( request $request, $TemplateID){
        try{
            $data = DB::select(' EXEC Amplo.uspFetchTemplate ?', array($TemplateID));
            $clients = DB::select(' EXEC Amplo.uspFetchClientByTemplate ?', array($TemplateID));
            //echo "<pre>"; print_r($data); exit;
            if( count($data) > 0){                
                $message = "Template data retrieved";
                //$data1->template = $data;
                $data1 = (Object)$data[0];
                $data1->clients = $clients;
                return $this->sendResponse($data1, $message);
            }else{
                $message = "No record found";
                return $this->sendResponse($data, $message);
            }           
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    } 

    /*
        Author : Prabir
        Date   : 06/01/2020
        Name   : getTemplateByClientId
        Params : 
        Type   : GET
        Purpose: To get Template By Client ID
    */
    public function getTemplateByClientId( request $request){
        try{
            $UserID = $this->user_data['UserID'];
            $ClientID = $this->user_data['ClientID'];
            //$data = DB::select(' EXEC Amplo.uspFetchTemplateByClientId ?', array($ClientID));
            $data = DB::select(' EXEC uspFetchTemplateByClientIdClient ?,?', array($UserID,$ClientID));
            if( count($data) > 0){                
                $message = "Template data retrieved";
                return $this->sendResponse($data, $message);
            }else{
                $message = "No record found";
                return $this->sendResponse($data, $message);
            }           
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    } 

    /*
        Author : Abdul
        Date   : 16/12/2019
        Name   : getFunctionPhaseStyles
        Params : 
        Type   : GET
        Purpose: To get decomposition function and phase styles
    */
    public function getFunctionPhaseStyles( request $request){
        try{
            $data = DB::select(' EXEC Amplo.uspFetchFunctionPhaseStyles');
            if( count($data) > 0){
                $message = "Function and phase data retrieved";
            }else{
                $message = "No record found";
            }
           return $this->sendResponse($data, $message);
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
     /*
        Author : Abdul
        Date   : 30/12/2019
        Name   : getFunctionPhaseStylesByTemplate
        Params : @TemplateID
        Type   : GET
        Purpose: To get decomposition function and phase styles by template
    */
    public function getFunctionPhaseStylesByTemplate( request $request,$TemplateID){
        try{
            $data = DB::select(' EXEC Amplo.uspFetchFunctionPhaseAssignment ?',array($TemplateID));  
			//echo "<pre>"; print_r($data);			
            if( count($data) > 0){  
                            
                foreach ($data as $key => $value) {
					//echo "<pre>"; print_r($value->FunctionId);
					//echo "<pre>"; print_r($value->PhaseId);
					
                    $processes = DB::select(' EXEC Amplo.uspFetchProcessesByTemplateId ?,?,?',array($TemplateID, $value->FunctionId, $value->PhaseId));
                    $processArray = array();  
                    foreach($processes as $process){

                        $processArray[] = array('processId'=>$process->DecompositionProcessLevel1ID, 'processTitle'=> $process->ProcessLevel1Title,'HasDecomposition'=>$process->HasDecomposition);
                        //array_push($processArray, $process->ProcessLevel1Title);
                    }
                    $my_array[$key]['FunctionId']= $value->FunctionId;
                    $my_array[$key]['PhaseId']   = $value->PhaseId;
                    $my_array[$key]['StyleTitle']= lcfirst($value->StyleTitle);
                    $my_array[$key]['processes']= $processArray;
                }
                $message = "Function and phase data retrieved";
                return $this->sendResponse($my_array, $message);
            }else{
                $message = "No record found";
                return $this->sendResponse($data, $message);
            }
           
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }  

    /*
        Author : Prabir
        Date   : 02/02/2020
        Name   : saveFunction
        Params : 
        Type   : POST
        Purpose: To save decomposition function
    */
    public function saveFunctionPhaseAssignment( request $request ) {
        try{
            $data = (Object)[];
            $validator = Validator::make($request->all(), [
                "templateId" => 'required|numeric',
                "input"  => 'required|array',
            ]);

            // if ($validator->fails()) {
            //     return $this->sendError('Validation Errors',$validator->errors());
            // }
            $requestData       = $request->all();
           
            $params_array = array(
                $requestData['templateId'],
                json_encode($requestData['input']),
                $this->user_data['UserID'],
            );
            $data = DB::select(' EXEC Amplo.uspSaveFunctionPhaseAssignment ?,?,?',$params_array);            
            return $this->sendResponse($data[0],$data[0]->MessageName);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 
    
    /*
        Author : Prabir
        Date   : 24/12/2019
        Name   : fetchTemplates
        Params : 
        Type   : GET
        Purpose: To get decomposition function and phase styles
    */
    public function fetchTemplates( request $request ){
        try{
            $params_array = [
                $this->user_data['UserID'],
            ];

            $data = DB::select(' EXEC Amplo.uspFetchTemplates ?', $params_array);
            if( count($data) > 0){
                $message = "Templates retrieved";
            }else{
                $message = "No record found";
            }
           return $this->sendResponse($data, $message);
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }

    public function fetchFunctions( request $request, $TemplateID ){
        try{
            $data = DB::select(' EXEC Amplo.uspGetSelectedFunctions ?', array($TemplateID));
            if( count($data) > 0){
                $message = "Functions retrieved";
            }else{
                $message = "No record found";
            }
           return $this->sendResponse($data, $message);
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }

    public function fetchPhases( request $request, $TemplateID ){
        try{
            $data = DB::select(' EXEC Amplo.uspGetSelectedPhases ?', array($TemplateID));
            if( count($data) > 0){
                $message = "Phases retrieved";
            }else{
                $message = "No record found";
            }
           return $this->sendResponse($data, $message);
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }

    public function saveFunctionPhase( request $request ) {
        try{
            $data = (Object)[];
            $validator = Validator::make($request->all(), [
                'templateId' => 'required|numeric',
                'functionId' => 'required|numeric',
                'phaseId' => 'required|numeric'
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $userId = $this->user_data['UserID'];
            $templateId = $request->input('templateId');
            $functionId = $request->input('functionId');
            $phaseId = $request->input('phaseId');
            $styleName = $request->input('style');
            $data = DB::select(' EXEC Amplo.uspSaveFunctionPhaseWithStyle ?,?,?,?,?',array($templateId,$functionId,$phaseId,$styleName,$userId));
            return $this->sendResponse(true,$data[0]->MessageName);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 26/12/2019
        Name   : saveFunction
        Params : @IndustryId, @IndustryVerticalId, @IndustrySubVerticalId, @FunctionName, @FunctionTitle, @FunctionDescription, @FunctionMeaning, @UserId
        Type   : POST
        Purpose: To save decomposition function
    */
    public function saveFunction( request $request ) {
        try{
            $data = (Object)[];
            $validator = Validator::make($request->all(), [
                "templateId" => 'required|numeric',
                "functions"  => 'required|array',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData       = $request->all();
            $functions['root'] = $requestData['functions'];
            $functionsJson     = json_encode($functions);
           
            $params_array = array(
                $functionsJson,
                $this->user_data['UserID'],
                $requestData['templateId']
            );
            //print_r($params_array);
            $data = DB::select(' EXEC Amplo.uspSaveFunction ?,?,?',$params_array);
            return $this->sendResponse($data[0],$data[0]->MessageName);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }   
    /*
        Author : Abdul
        Date   : 26/12/2019
        Name   : savePhase
        Params : @IndustryId, @IndustryVerticalId, @IndustrySubVerticalId, @PhaseName, @PhaseTitle, @PhaseDescription, @PhaseMeaning, @UserId
        Type   : POST
        Purpose: To save decomposition phase
    */
    public function savePhase( request $request ) {
        try{
            $data = (Object)[];
             $validator = Validator::make($request->all(), [
                "templateId" => 'required|numeric',
                "phases"  => 'required|array',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData    = $request->all();
            $phases['root'] = $requestData['phases'];
            $phasesJson     = json_encode($phases);
           
            $params = array(
                $phasesJson,
                $this->user_data['UserID'],
                $requestData['templateId']
            );
            $data = DB::select(' EXEC Amplo.uspSavePhase ?,?,?',$params);
            return $this->sendResponse($data[0],$data[0]->MessageName);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
	
	public function getStyles(request $request, $ProjectID){
		try{
            $data = DB::select(' EXEC Amplo.uspGetStyles ?', array($ProjectID));
            if( count($data) > 0){
                $message = "Styles retrieved";
            }else{
                $message = "No record found";
            }
           return $this->sendResponse($data, $message);
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    
    public function deleteFunction(Request $request){
        $requestData    = $request->all();
        $params = array(
            $requestData['FunctionId'],
            ""
        );
        //echo "<pre>"; print_r($params);
        $data = DB::select(' EXEC amplo.uspDeleteFunction ?,?', $params);
        //echo "<pre>"; print_r($data);
        return $this->sendResponse($data[0], $data[0]->MessageName);
    }
	
	public function deletePhase(Request $request){
        $requestData    = $request->all();
        $params = array(
            $requestData['PhaseId'],
            ""
        );
        echo "<pre>"; print_r($params);
        $data = DB::select(' EXEC amplo.uspDeletePhase ?,?', $params);
        echo "<pre>"; print_r($data);
        return $this->sendResponse($data[0], $data[0]->MessageName);
    }
    public function updateDecompositionPainPoint($userId,$processLevel,$processesId,$paintpoints){
        //print_r($paintpoints);die;
        if(count($paintpoints)>0){
            foreach ($paintpoints as $key => $value) {
               $params = array(
                    $userId,
                    $processLevel,
                    $processesId,
                    $value['action'],
                    $value['paintpoint_title'],
                    $value['paintpoint_description'],
                    $value['paintpoint_description_raw'],
                    $value['id']
               );

               $data = DB::select(' EXEC uspUpdateDecompositionPainPoint ?,?,?,?,?,?,?,?', array($userId, $processLevel, $processesId,$value['action'], $value['paintpoint_title'], json_encode($value['paintpoint_description']),$value['paintpoint_description_raw'],$value['id']));
            }
        }
    }
    /*
        Author : Abdul
        Date   : 17/04/2020
        Name   : generatePaintPointsExcelSheet
        Params : 
        Type   : GET
        Purpose: To Generate Paint Points ExcelSheet
    */
    public function generatePaintPointsExcelSheet(request $request, $projectId,$processLevel1Id){
       try {
            $paintpoints = DB::select('EXEC uspProcessDecompositionPainPOintExport ?,?',array($projectId,$processLevel1Id));
            //echo "<pre>";print_r($paintpoints);echo "<br>";die;
            if( count($paintpoints) > 0){
                $paintpoints_array = json_decode(json_encode($paintpoints), True);
                $keyS= array_keys(current($paintpoints_array));
                //echo "<pre>";print_r($keyS);echo "<br>";die;
                $objPHPExcel = new PHPExcel();

                $styleArray = array(
                    'fill' => array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'color' => array('rgb' => 'D3D3D3')
                    ),
                    'font'  => array(
                        'bold'  => true
                    )
                );
                /* Create a first sheet, representing sales data*/
                /*$objPHPExcel->setActiveSheetIndex(0);
                $objPHPExcel->getActiveSheet()->setCellValue('A1', 'ProcessLevelTitle')->getStyle('A1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->setCellValue('B1', 'Comment')->getStyle('B1')->applyFromArray($styleArray);
                $objPHPExcel->getActiveSheet()->getColumnDimension('A')->setAutoSize(true);
                $objPHPExcel->getActiveSheet()->getColumnDimension('B')->setAutoSize(true);
                $i=2;
                foreach ($paintpoints as $key => $value) {
            
                    $objPHPExcel->getActiveSheet()->setCellValue("A$i",$value->ProcessLevel1Title);
                    $objPHPExcel->getActiveSheet()->setCellValue("B$i",$value->Comment);
                    $i++;
                }*/
                $objPHPExcel->setActiveSheetIndex(0);
                if(count($paintpoints_array) > 0){
                    $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($paintpoints_array)), null, 'A1');
                    $objPHPExcel->getActiveSheet()->fromArray($paintpoints_array, null, 'A2');
                }
                
                for($i=1; $i<=count($paintpoints_array); $i++){
                    $objPHPExcel->getActiveSheet()->getStyle('A'.($i+1))->getFill()->applyFromArray(array(
                        'type' => PHPExcel_Style_Fill::FILL_SOLID,
                        'startcolor' => array(
                             'rgb' => 'ff726f'
                        )
                    ));
                }

                $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);
                foreach (range('A', $objPHPExcel->getActiveSheet()->getHighestDataColumn()) as $col) {
                        $objPHPExcel->getActiveSheet()->getColumnDimension($col)->setAutoSize(true);
                    }
                /*Rename sheet*/
                $objPHPExcel->getActiveSheet()->setTitle('Pain Points');
                $date=date('d-M-Y-H-i-s');
                $filename   ='PainPoints'.'-'.$date.'.xls'; 
                /* Redirect output to a client’s web browser (Excel5)*/
                $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
                // Sending headers to force the user to download the file
                header('Content-Type: application/vnd.ms-excel');
                header('Content-Disposition: attachment;filename="'.$filename.'"');
                header('Cache-Control: max-age=0');
                $objWriter->save('php://output');
                //$objWriter->save($filename);
                die;
            }
       } catch (\Exception $e) {
            return $this->sendError($e->getMessage());
       }
    }
    /*
        Author : Abdul
        Date   : 08/09/2020
        Name   : deleteProcess
        Params : 
        Type   : DELETE
        Purpose: To delete process
    */
    public function deleteProcess( Request $request, $processLevelId){
        try{
            $params_array = array(
                $processLevelId
            );
            $data = DB::select(' EXEC uspDeleteDecompositionProcessLevel ?',$params_array  );
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Abdul
        Date   : 08/09/2020
        Name   : deleteProcessName
        Params : 
        Type   : DELETE
        Purpose: To delete process
    */
    public function deleteProcessName( Request $request, $processLevelId){
        try{
            $params_array = array(
                $processLevelId
            );
            $data = DB::select(' EXEC Amplo.uspDeleteDecompositionProcessLevel ?',$params_array  );
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Abdul
        Date   : 17/09/2020
        Name   : deleteClientDecompositionTemplateProcess
        Params : 
        Type   : DELETE
        Purpose: To delete client decomposition template process
    */
    public function deleteClientDecompositionTemplateProcess( request $request, $processLevelId){
        try{
            $params_array = array(
                $processLevelId
            );
            $data = DB::select(' EXEC uspDeleteDecompositionProcessLevelClient ?',$params_array);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }    
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 14/09/2020
        Name   : editAdminFunctionPhaseDecompositionTemplate
        Params : 
        Type   : GET
        Purpose: To update function & phase for admin decomposition template
    */
    public function editAdminFunctionPhaseDecompositionTemplate(Request $request){
        try{
            
            $requestData = $request->all();
            $functionId = isset($requestData['FunctionId']) ? $requestData['FunctionId'] : 0;
            $phaseId = isset($requestData['PhaseId']) ? $requestData['PhaseId'] : 0;
            $params_array = array(
                $requestData['TemplateId'],
                $functionId,
                $phaseId,
                $requestData['Title']
            );
            $data = DB::select(' EXEC Amplo.uspUpdateAdminFunctionPhaseTitle ?,?,?,?', $params_array );
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
        Author : Abdul
        Date   : 16/09/2020
        Name   : editClientFunctionPhaseDecompositionTemplate
        Params : 
        Type   : GET
        Purpose: To update function & phase for client decomposition template
    */
    public function editClientFunctionPhaseDecompositionTemplate(Request $request){
        try{
            
            $requestData = $request->all();
            $functionId = isset($requestData['FunctionId']) ? $requestData['FunctionId'] : 0;
            $phaseId = isset($requestData['PhaseId']) ? $requestData['PhaseId'] : 0;
            $params_array = array(
                $requestData['TemplateId'],
                $functionId,
                $phaseId,
                $requestData['Title']
            );
            $data = DB::select(' EXEC uspUpdateFunctionPhaseTitleTemplateClient ?,?,?,?', $params_array );
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
        Author : Abdul
        Date   : 14/09/2020
        Name   : editClientFunctionPhaseDecompositionProject
        Params : 
        Type   : GET
        Purpose: To update function & phase for client decomposition project
    */
    public function editClientFunctionPhaseDecompositionProject(Request $request){
        try{
            $requestData = $request->all();
            $functionId = isset($requestData['FunctionId']) ? $requestData['FunctionId'] : 0;
            $phaseId = isset($requestData['PhaseId']) ? $requestData['PhaseId'] : 0;
            $params_array = array(
                $requestData['ProjectId'],
                $requestData['TemplateId'],
                $functionId,
                $phaseId,
                $requestData['Title']
            );
            $data = DB::select(' EXEC uspUpdateClientFunctionPhaseTitle ?,?,?,?,?', $params_array );
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
        Author : Abdul
        Date   : 14/09/2020
        Name   : getClientDecompositionTemplates
        Params : 
        Type   : GET
        Purpose: To get client decomposition templates
    */
    public function getClientDecompositionTemplates( Request $request){
        try{
            $UserID = $this->user_data['UserID'];
            $ClientID = $this->user_data['ClientID'];
            //$data = DB::select(' EXEC uspFetchTemplatesClient');
            $data = DB::select(' EXEC uspFetchTemplateByClientIdClient ?,?', array($UserID,$ClientID));
            $templates = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $templates[$key]['value']      = $value->TemplateID;
                    $templates[$key]['label']      = $value->TemplateTitle;
                    $templates[$key]['image_path'] = $value->ImagePath;
                    $templates[$key]['CreatedDate']= $value->CreatedDate;
                    $templates[$key]['Assignment'] = $value->Assignment;
                    $templates[$key]['IsAmploAssigned']= $value->IsAmploAssigned;
                }
                $message = "Templates data retrieved";
                return $this->sendResponse($templates, $message);
            }else{
                $message = "No record found";
                return $this->sendResponse($data, $message);
            }
           
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 14/09/2020
        Name   : getClientDecompositionFunctions
        Params : 
        Type   : GET
        Purpose: To get client decomposition functions by template id
    */
    public function getClientDecompositionFunctions( Request $request, $templateId ){
        try{
            $data = DB::select(' EXEC uspGetSelectedFunctionsClient ?', array($templateId));
            if( count($data) > 0){
                $message = "Functions retrieved";
            }else{
                $message = "No record found";
            }
           return $this->sendResponse($data, $message);
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 14/09/2020
        Name   : getClientDecompositionPhases
        Params : 
        Type   : GET
        Purpose: To get client decomposition phases by template id
    */
    public function getClientDecompositionPhases( Request $request, $templateId ){
        try{
            $data = DB::select(' EXEC uspGetSelectedPhasesClient ?', array($templateId));
            if( count($data) > 0){
                $message = "Phases retrieved";
            }else{
                $message = "No record found";
            }
           return $this->sendResponse($data, $message);
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 14/09/2020
        Name   : getClientDecompositionFunctionPhaseStylesByTemplate
        Params : @TemplateID
        Type   : GET
        Purpose: To get client decomposition function and phase styles by template
    */
    public function getClientDecompositionFunctionPhaseStylesByTemplate( Request $request,$templateId){
        try{
            $data = DB::select(' EXEC uspFetchFunctionPhaseAssignmentClient ?',array($templateId));         
            if( count($data) > 0){         
                foreach ($data as $key => $value) {
                    $processes = DB::select(' EXEC uspFetchProcessesByTemplateIdClient ?,?,?',array($templateId, $value->FunctionId, $value->PhaseId));
                    $processArray = array();  
                    foreach($processes as $process){

                        $processArray[] = array(
                            'processId'=>$process->DecompositionProcessLevel1ID, 
                            'processTitle'=> $process->ProcessLevel1Title,
                            'HasDecomposition'=>$process->HasDecomposition
                        );
                    }
                    $my_array[$key]['FunctionId']= $value->FunctionId;
                    $my_array[$key]['PhaseId']   = $value->PhaseId;
                    $my_array[$key]['StyleTitle']= lcfirst($value->StyleTitle);
                    $my_array[$key]['processes']= $processArray;
                }
                $message = "Function and phase data retrieved";
                return $this->sendResponse($my_array, $message);
            }else{
                $message = "No record found";
                return $this->sendResponse($data, $message);
            }
           
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    } 
    /*
        Author : Abdul
        Date   : 14/09/2020
        Name   : saveClientDecompositionFunction
        Params : 
        Type   : POST
        Purpose: To save client decomposition function
    */
    public function saveClientDecompositionFunction( Request $request ) {
        try{
            $validator = Validator::make($request->all(), [
                "templateId" => 'required|numeric',
                "functions"  => 'required|array',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData       = $request->all();
            $functions['root'] = $requestData['functions'];
            $functionsJson     = json_encode($functions);
           
            $params_array = array(
                $functionsJson,
                $this->user_data['UserID'],
                $requestData['templateId']
            );
            $data = DB::select(' EXEC uspSaveFunctionClient ?,?,?',$params_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
            else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 
    /*
        Author : Abdul
        Date   : 14/09/2020
        Name   : saveClientDecompositionPhase
        Params : 
        Type   : POST
        Purpose: To save client decomposition phase
    */
    public function saveClientDecompositionPhase( Request $request ) {
        try{
            $validator = Validator::make($request->all(), [
                "templateId" => 'required|numeric',
                "phases"  => 'required|array',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData    = $request->all();
            $phases['root'] = $requestData['phases'];
            $phasesJson     = json_encode($phases);
           
            $params = array(
                $phasesJson,
                $this->user_data['UserID'],
                $requestData['templateId']
            );
            $data = DB::select(' EXEC uspSavePhaseClient ?,?,?',$params);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 14/09/2020
        Name   : CreateUpdateClientDecompositionTemplate
        Params : 
        Type   : POST
        Purpose: To create & update client decomposition templates
    */
    public function createUpdateClientDecompositionTemplate( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                "templateId"   => 'required|numeric',
                "templateName" => 'required',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }

            // $CapabilityProjectName = $request->templateName;
            // $CapabilityProjectProjectID = 0;

            // $param_array = array(
            //     $CapabilityProjectName,
            //     $CapabilityProjectProjectID
            // );
            // $data = DB::select('EXEC uspCheckDuplicateClientCapabilityProjectName ?,?',$param_array);
            // print_r($data); 
            if (!empty($data->data->MessageName) && $data->data->MessageName == 'Template Name already present') {
                $message = $data->data->MessageName;
                return $this->sendError($message);
            }

            $requestData     = $request->all();
            if(isset($requestData['existingTempData'])){
                $params = array(
                    $this->user_data['UserID'],
                    json_encode($requestData)
                );
                $data = DB::select(' EXEC uspSavecustomizeTemplateClient ?,?', $params);
            }else{
                $params_array = array(
                    $requestData['templateId'],
                    $requestData['templateName'],
                    $this->user_data['UserID']
                );
                $data = DB::select(' EXEC uspCreateTemplateClient ?,?,?',$params_array);
            }
           
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 
    /*
        Author : Abdul
        Date   : 15/09/2020
        Name   : saveClientFunctionPhaseAssignment
        Params : 
        Type   : POST
        Purpose: To save client function & phase assignment
    */
    public function saveClientFunctionPhaseAssignment( request $request ) {
        try{
            $validator = Validator::make($request->all(), [
                "templateId" => 'required|numeric',
                "input"  => 'required|array',
            ]);

            $requestData       = $request->all();
           
            $params_array = array(
                $requestData['templateId'],
                json_encode($requestData['input']),
                $this->user_data['UserID'],
            );
            $data = DB::select(' EXEC uspSaveFunctionPhaseAssignmentClient ?,?,?',$params_array);            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 15/09/2020
        Name   : saveClientDecompositionTemplateImage
        Params : 
        Type   : POST
        Purpose: To save client decomposition template image
    */
    public function saveClientDecompositionTemplateImage( Request $request ){        
        try{
            $validator = Validator::make($request->all(), [
                'templateId'         => 'required|numeric'
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $destinationPathImage  = public_path('/Template');
            
            if(! is_dir($destinationPathImage)){
                mkdir($destinationPathImage, 0777,true);
            }
            $templateId         = $request->input('templateId'); 
            $imageUrl           = $request->input('imageUrl'); 
            define('UPLOAD_DIR', 'Template/');
            $img        = str_replace('data:image/png;base64,', '', $imageUrl);
            $img        = str_replace(' ', '+', $img);
            $decodeImage= base64_decode($img);
            $image_name = uniqid().time(). '.png';
            $file       = UPLOAD_DIR . $image_name;
            $success    = file_put_contents($file, $decodeImage);
            $date       = date('Y-m-d H:i:s');

            $params_array = array(
                $templateId,
                $image_name,
                $date
            );
           
            $data = DB::select(" EXEC uspSaveTemplateImageClient ".$templateId.",'".$image_name."','".$date."'");

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 15/09/2020
        Name   : duplicateTemplateClient
        Params : 
        Type   : POST
        Purpose: To duplicate client decomposition template
    */
    public function duplicateTemplateClient( request $request){
        try{
            $validator = Validator::make($request->all(), [
                "templateId"   => 'required|numeric',
                "templateName" => 'required',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData       = $request->all();
           
            $params_array = array(
                $requestData['templateId'],
                $this->user_data['UserID'],
                $requestData['templateName']                
            );
            $data = DB::select(' EXEC uspDuplicateTemplateClient ?,?,?',$params_array);
           
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 
    /*
        Author : Abdul
        Date   : 15/09/2020
        Name   : deleteTemplateClient
        Params : 
        Type   : DELETE
        Purpose: To delete client decomposition templates
    */
    public function deleteTemplateClient( request $request, $templateId){
        try{
            $requestData       = $request->all();
           
            $params_array = array(
                $templateId,
                $this->user_data['UserID']
            );
        
            $data = DB::select(' EXEC uspDeleteTemplateClient ?,?',$params_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 15/09/2020
        Name   : saveClientFunctionPhase
        Params : 
        Type   : POST
        Purpose: To save client decomposition function & phase
    */
    public function saveClientFunctionPhase( request $request ) {
        try{
            $validator = Validator::make($request->all(), [
                'templateId' => 'required|numeric',
                'functionId' => 'required|numeric',
                'phaseId'    => 'required|numeric'
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $userId     = $this->user_data['UserID'];
            $templateId = $request->input('templateId');
            $functionId = $request->input('functionId');
            $phaseId    = $request->input('phaseId');
            $styleName  = $request->input('style');
            
            $params_array = array(
                $templateId,
                $functionId,
                $phaseId,
                $styleName,
                $userId
            );
            
            $data = DB::select(' EXEC uspSaveFunctionPhaseWithStyleClient ?,?,?,?,?',$params_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 15/09/2020
        Name   : getClientDecompositionTemplateTreeView
        Params : 
        Type   : GET
        Purpose: To get client decomposition template tree view
    */
    public function getClientDecompositionTemplateTreeView(Request $request,$template_id,$process_id){
        try{
            $userId = $this->user_data['UserID'];
            $status = 1;
            $data = DB::select(' EXEC uspGetDecompositionTemplateTreeViewClient ?,?',array($template_id,$process_id)); 
            $response['processes'] = [];
            $response['scores'] = [];
            $response['status'] = 1;
            $scores =[];
            if(count($data) > 0){
                $my_array = [];
                foreach($data as $l => $level){

                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID=='' && $level->ProcessLevel3ID=='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){
                       $my_array = array(
                           "ProcessLevel" => $level->ProcessLevel,
                           "number" => $level->ProcessLevelID,
                           "text" => $level->ProcessLevelTitle,
                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                           "id" => $level->ProcessLevel1ID,

                        );
                    }
                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID=='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){

                        $my_array['child'][] = array(
                           "ProcessLevel" => $level->ProcessLevel,
                           "number" => $level->ProcessLevelID,
                           "text" => $level->ProcessLevelTitle,
                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                           "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                           "id" => $level->ProcessLevel2ID,
                           'child' => []
                        );
                    }
                    if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID=='' && $level->ProcessLevel5ID==''){

                        foreach ($my_array['child'] as $key => $value) {
                            if($value['ProcessLevel2ID']==$level->ProcessLevel2ID){
                                $my_array['child'][$key]['child'][] = array(
                                    "ProcessLevel" => $level->ProcessLevel,
                                   "number" => $level->ProcessLevelID,
                                   "text" => $level->ProcessLevelTitle,
                                   "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                   "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                   "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                   "id" => $level->ProcessLevel3ID,
                                   'child' => []
                                );
                            }
                        }
                    }
                     if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID!='' && $level->ProcessLevel5ID==''){
                        foreach ($my_array['child'] as $key=>$val) {
                            foreach($val['child'] as $k=>$v){
                                if($v['ProcessLevel3ID']==$level->ProcessLevel3ID){
                                    $val['child'][$k]['child'][] =array(
                                        "ProcessLevel" => $level->ProcessLevel,
                                       "number" => $level->ProcessLevelID,
                                       "text" => $level->ProcessLevelTitle,
                                       "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                       "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                       "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                       "ProcessLevel4ID"=>$level->ProcessLevel4ID,
                                       "id" => $level->ProcessLevel4ID,
                                       'child' => []
                                    );
                                }
                            }
                            $my_array['child'][$key] = $val;
                        }
                     }

                     if($level->ProcessLevel1ID!='' && $level->ProcessLevel2ID!='' && $level->ProcessLevel3ID!='' && $level->ProcessLevel4ID!='' && $level->ProcessLevel5ID!=''){

                        foreach ($my_array['child'] as $key=>$val) {
                            foreach($val['child'] as $k=>$v){
                                 foreach($v['child'] as $kl=>$vl){
                                    if($vl['ProcessLevel4ID']==$level->ProcessLevel4ID){
                                        $v['child'][$kl]['child'][] =array(
                                            "ProcessLevel" => $level->ProcessLevel,
                                           "number" => $level->ProcessLevelID,
                                           "text" => $level->ProcessLevelTitle,
                                           "ProcessLevel1ID"=>$level->ProcessLevel1ID,
                                           "ProcessLevel2ID"=>$level->ProcessLevel2ID,
                                           "ProcessLevel3ID"=>$level->ProcessLevel3ID,
                                           "ProcessLevel4ID"=>$level->ProcessLevel4ID,
                                           "ProcessLevel5ID"=>$level->ProcessLevel5ID,
                                           "id" => $level->ProcessLevel5ID
                                        );
                                    }
                                }
                                $val['child'][$k] = $v;
                            }
                            $my_array['child'][$key] = $val;
                        }
                     }
                     //get scores
                   
                    if($level->LeafNodeFlag == 1){

                        if($level->ProcessLevel == 1){
                            $scores[$l]['id'] = $level->ProcessLevel1ID;
                            $scores[$l]['ProcessLevel'] = 1;
                        }elseif($level->ProcessLevel == 2){
                            $scores[$l]['id'] = $level->ProcessLevel2ID;
                            $scores[$l]['ProcessLevel'] = 2;
                        }elseif($level->ProcessLevel == 3){
                            $scores[$l]['id'] = $level->ProcessLevel3ID;
                            $scores[$l]['ProcessLevel'] = 3;
                        }elseif($level->ProcessLevel == 4){
                            $scores[$l]['id'] = $level->ProcessLevel4ID;
                            $scores[$l]['ProcessLevel'] = 4;
                        }elseif($level->ProcessLevel == 5){
                            $scores[$l]['id'] = $level->ProcessLevel5ID;
                            $scores[$l]['ProcessLevel'] = 5;
                        }
                        //$scoreArr = [5,4,3,5];
                       
                        //$remove = array('.00');
                        $remove = array('0');
                       
                    }
                    
                }
                $response['processes'][] = $my_array;
                $response['status'] = $status;
                $message = "decomposition level two tasks retrieved.";
                return $this->sendResponse($response, $message);
            }
        }catch(\Exception $e){   
            return $this->sendError($e->getMessage());
        }  
    }
    /*
        Author : Abdul
        Date   : 15/09/2020
        Name   : updateClientDecompositionLevelsTemplateData
        Params : 
        Type   : POST
        Purpose: To update client decomposition template data
    */
    public function updateClientDecompositionLevelsTemplateData(Request $request){
        try{
        $data = [];
        
        //save level 1 data
        $scores = $request->scores;
        $project_id = $request->projectId;
        $status = $request->input('status');
        $userId = $this->user_data['UserID'];
        $processes_array = $request->processes;
      
        
        $processes = $processes_array;
        foreach($processes as $i => $level1) { 
            $leaf_node_flag = 1; 
            if(array_key_exists('child',$level1) && count($level1['child']) > 0){
                foreach($level1['child'] as $j => $level2) {
                    //save level 
                    $level2Data = [];
                    $level2Data['user_id'] = $userId;
                    $level2Data['decomposition_project_id'] = $project_id;
                    $level2Data['decomposition_process_level_1_id'] = $level1['id'];
                    $level2Data['process_level_node_2_id'] = $level2['number'];
                    $level2Data['process_level_2_title'] = $level2['text'];
                    $level2Data['leaf_node_flag'] = array_key_exists('child',$level2) && count($level2['child']) > 0 ?'0':'1';
                    $level2Data['action'] = $level2['action'];
                    $level2Data['update_id'] = 0;
                        if($level2['action'] =='add'){
                            $level2Data['id'] = 0;
                        }elseif($level2['action'] =='update'){
                            $level2Data['id'] = $level2['id'];
                        }elseif($level2['action'] =='delete'){
                            $level2Data['id'] = $level2['id'];
                            $level2Data['update_id'] = $level2['id'];
                        }
                        
                    $process_level_2_id = $this->updateDecompositionProcessLevels2TemplateClient($level2Data);
                   if(array_key_exists('child',$level2) && count($level2['child']) > 0){
                        foreach($level2['child'] as $k => $level3){
                            //save level 3 details
                            $level3Data = [];
                            $level3Data['decomposition_project_id'] = $project_id;
                            $level3Data['decomposition_process_level_1_id'] = $level1['id'];
                            $level3Data['decomposition_process_level_2_id'] = $process_level_2_id;
                            $level3Data['process_level_node_3_id'] = $level3['number'];
                            $level3Data['process_level_3_title'] = $level3['text'];
                            $level3Data['leaf_node_flag'] = array_key_exists('child',$level3) && count($level3['child']) > 0 ?'0':'1';
                            $level3Data['user_id'] = $userId;
                            $level3Data['action'] = $level3['action'];
                            $level3Data['update_id'] = 0;
                                if($level3['action'] =='add'){
                                    $level3Data['id'] = 0;
                                }elseif($level3['action'] =='update'){
                                    $level3Data['id'] = $level3['id'];
                                }elseif($level3['action'] =='delete'){
                                    $level3Data['id'] = $level3['id'];
                                    $level3Data['update_id'] = $level3['id'];
                                }
                                
                            $process_level_3_id = $this->updateDecompositionProcessLevels3TemplateClient($level3Data);
                            if(array_key_exists('child',$level3) && count($level3['child']) > 0){
                                foreach($level3['child'] as $k => $level4){

                                    //save level 4 details
                                    $level4Data = [];
                                    $level4Data['user_id'] = $userId;
                                    $level4Data['decomposition_project_id'] = $project_id;
                                    $level4Data['decomposition_process_level_1_id'] = $level1['id'];
                                    $level4Data['decomposition_process_level_2_id'] = $process_level_2_id;
                                    $level4Data['decomposition_process_level_3_id'] = $process_level_3_id;
                                    $level4Data['process_level_node_4_id'] = $level4['number'];
                                    $level4Data['process_level_4_title'] = $level4['text'];
                                    $level4Data['leaf_node_flag'] = array_key_exists('child',$level4) && count($level4['child']) > 0 ?'0':'1';
                                    $level4Data['action'] = $level4['action'];
                                    $level4Data['update_id'] = 0;
                                    if($level4['action'] =='add'){
                                        $level4Data['id'] = 0;
                                    }elseif($level4['action'] =='update'){
                                        $level4Data['id'] = $level4['id'];
                                    }elseif($level4['action'] =='delete'){
                                        $level4Data['id'] = $level4['id'];
                                        $level4Data['update_id'] = $level4['id'];
                                    }
                                    //echo "<pre>";print_r($level4Data);echo "<br>";die;
                                    $process_level_4_id = $this->updateDecompositionProcessLevels4TemplateClient($level4Data);
                                    if(array_key_exists('child',$level4) && count($level4['child']) > 0){
                                      
                                        foreach($level4['child'] as $k => $level5){
                                            //save level 5 details
                                            $level5Data = [];
                                            $level5Data['user_id'] = $userId;
                                            $level5Data['decomposition_project_id'] = $project_id;
                                            $level5Data['decomposition_process_level_1_id'] = $level1['id'];
                                            $level5Data['decomposition_process_level_2_id'] = $process_level_2_id;
                                            $level5Data['decomposition_process_level_3_id'] = $process_level_3_id;
                                            $level5Data['decomposition_process_level_4_id'] = $process_level_4_id;
                                            $level5Data['process_level_node_5_id'] = $level5['number'];
                                            $level5Data['process_level_5_title'] = $level5['text'];
                                            $level5Data['leaf_node_flag'] = array_key_exists('child',$level5) && count($level5['child']) > 0 ?'0':'1';
                                          
                                            $level5Data['action'] = $level5['action'];
                                            $level5Data['update_id'] = 0;
                                            if($level5['action'] =='add'){
                                                $level5Data['id'] = 0;
                                            }elseif($level5['action'] =='update'){
                                                $level5Data['id'] = $level5['id'];
                                            
                                            }elseif($level5['action'] =='delete'){
                                                $level5Data['id'] = $level5['id'];
                                                $level5Data['update_id'] = $level5['id'];
                                            }

                                            $process_level_5_id = $this->updateDecompositionProcessLevels5TemplateClient($level5Data);
                                        }
                                    }
                                    
                                }

                            }
                            
                        }

                   }
  
                }
            }
        }

        return $this->sendResponse(array('message'=>"Update"), 'Data updated');
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }

    }
    public function updateDecompositionProcessLevels2TemplateClient($saveData){
        $process_level_2_id = 0;   
        $data = DB::select(' EXEC uspUpdateDecompositionProcessLevels2TemplateClient ?,?,?,?,?,?,?,?',array($saveData['decomposition_process_level_1_id'],$saveData['process_level_node_2_id'],$saveData['process_level_2_title'],$saveData['leaf_node_flag'],$saveData['user_id'],$saveData['id'],$saveData['action'],$saveData['update_id']));
        return $data[0]->DecompositionProcessLevel2ID;
    }
    public function updateDecompositionProcessLevels3TemplateClient($saveData){
        $process_level_3_id = 0;   
        $data = DB::select(' EXEC uspUpdateDecompositionProcessLevels3TemplateClient ?,?,?,?,?,?,?,?',array($saveData['decomposition_process_level_2_id'],$saveData['process_level_node_3_id'],$saveData['process_level_3_title'],$saveData['leaf_node_flag'],$saveData['user_id'],$saveData['id'],$saveData['action'],$saveData['update_id']));
        return $data[0]->DecompositionProcessLevel3ID;
    }
    public function updateDecompositionProcessLevels4TemplateClient($saveData){
        $process_level_4_id = 0;   
        $data = DB::select(' EXEC uspUpdateDecompositionProcessLevels4TemplateClient ?,?,?,?,?,?,?,?',array($saveData['decomposition_process_level_3_id'],$saveData['process_level_node_4_id'],$saveData['process_level_4_title'],$saveData['leaf_node_flag'],$saveData['user_id'],$saveData['id'],$saveData['action'],$saveData['update_id']));
        return $data[0]->DecompositionProcessLevel4ID;
    }
    public function updateDecompositionProcessLevels5TemplateClient($saveData){
        $process_level_5_id = 0;   
        $data = DB::select(' EXEC uspUpdateDecompositionProcessLevels5TemplateClient ?,?,?,?,?,?,?,?',array($saveData['decomposition_process_level_4_id'],$saveData['process_level_node_5_id'],$saveData['process_level_5_title'],$saveData['leaf_node_flag'],$saveData['user_id'],$saveData['id'],$saveData['action'],$saveData['update_id']));
        return $data[0]->DecompositionProcessLevel5ID;
    }
    /*
        Author : Abdul
        Date   : 16/09/2020
        Name   : deleteClientDecompositionTemplateFunction
        Params : 
        Type   : DEETE
        Purpose: To delete client decomposition template function
    */
    public function deleteClientDecompositionTemplateFunction(Request $request, $functionId){
        try{
            $requestData    = $request->all();
            $params = array(
                $functionId,
                $this->user_data['UserID']
            );
            $data = DB::select(' EXEC uspDeleteFunctionClient ?,?', $params);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 16/09/2020
        Name   : deleteClientDecompositionTemplatePhase
        Params : 
        Type   : DEETE
        Purpose: To delete client decomposition template phase
    */
    public function deleteClientDecompositionTemplatePhase(Request $request, $phaseId){
        try{
            $requestData    = $request->all();
            $params = array(
                $phaseId,
                $this->user_data['UserID']
            );
            $data = DB::select(' EXEC uspDeletePhaseClient ?,?', $params);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 16/09/2020
        Name   : getClientDecompositionTemplateByClientId
        Params : 
        Type   : GET
        Purpose: To get client decomposotion template by client id
    */
    public function getClientDecompositionTemplateByClientId( request $request){
        try{
            $ClientID = $this->user_data['ClientID'];
            $data = DB::select(' EXEC uspFetchTemplateByClientIdClient ?', array($ClientID));
            if( count($data) > 0){                
                $message = "Template data retrieved";
            }else{
                $message = "No record found";
            }  
            return $this->sendResponse($data, $message);         
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 16/09/2020
        Name   : getClientDecompositionTemplate
        Params : 
        Type   : GET
        Purpose: To get client decomposition template
    */
    public function getClientDecompositionTemplate( request $request, $TemplateID){
        try{
            $data = DB::select(' EXEC uspFetchTemplateClient ?', array($TemplateID));
            
            if( count($data) > 0){                
                $message = "Template data retrieved";
                $data1 = (Object)$data[0];
                return $this->sendResponse($data1, $message);
            }else{
                $message = "No record found";
                return $this->sendResponse($data, $message);
            }    
        }catch(\ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 17/09/2020
        Name   : saveAmploCustomizeTemplate
        Params : 
        Type   : POST
        Purpose: To save amplo decomposition template from existing template
    */
    public function saveAmploCustomizeDecompositionTemplate( Request $request){
        try{
            $requestData    = $request->all();
            $params = array(
                $this->user_data['UserID'],
                json_encode($requestData)
            );
            $data = DB::select(' EXEC Amplo.uspSavecustomizeTemplate ?,?', $params);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch( \ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 17/09/2020
        Name   : saveClientCustomizeDecompositionTemplate
        Params : 
        Type   : POST
        Purpose: To save client decomposition template from existing template
    */
    public function saveClientCustomizeDecompositionTemplate( Request $request){
        try{
            $requestData    = $request->all();
            $params = array(
                $this->user_data['UserID'],
                json_encode($requestData)
            );
            $data = DB::select(' EXEC uspSavecustomizeTemplateClient ?,?', $params);
            
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch( \ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 24/09/2020
        Name   : updateAmploDecompositionTemplateProcess
        Params : 
        Type   : POST
        Purpose: To update amplo decomposition template process
    */
    public function updateAmploDecompositionTemplateProcess( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'ProcessId'   => 'required|numeric',
                'ProcessName' => 'required',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData    = $request->all();
           
            $params_array = array(
                $requestData['ProcessId'],
                $requestData['ProcessName'],
                $this->user_data['UserID']
            );

            $data = DB::select(' EXEC Amplo.uspUpdateProcessesByProcessId ?,?,?', $params_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch( \ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    } 
    /*
        Author : Abdul
        Date   : 24/09/2020
        Name   : updateClientDecompositionTemplateProcess
        Params : 
        Type   : POST
        Purpose: To update client decomposition template process
    */
    public function updateClientDecompositionTemplateProcess( Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'ProcessId'   => 'required|numeric',
                'ProcessName' => 'required',
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData    = $request->all();
           
            $params_array = array(
                $requestData['ProcessId'],
                $requestData['ProcessName'],
                $this->user_data['UserID']
            );

            $data = DB::select(' EXEC uspUpdateProcessesByProcessIdClient ?,?,?', $params_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response.";
                return $this->sendError($message);
            }
        }catch( \ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 24/09/2020
        Name   : getAllClient
        Params : 
        Type   : GET
        Purpose: To Get All Client
    */
    public function getAllClient( Request $request){
        try{
            
            $data = DB::select(' EXEC Amplo.uspFetchAllClient ');
            
            if( count($data) > 0){
                $message = "Data retrieved successfully";
            }
            else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch( \ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 30/07/2021
        Name   : uspCheckDuplicateAmploTemplateName
        Params : 
        Type   : GET
        Purpose: To Get All TemplateName on Amplo
    */
    public function uspCheckDuplicateAmploTemplateName( Request $request){
        try{
            $TemplateName = $request->TemplateName;
            
            $params_array = array(
                $TemplateName
            );
            $data = DB::select(' EXEC Amplo.uspCheckDuplicateAmploTemplateName ?',$params_array);
            
            if( count($data) > 0){
                $message = "Data retrieved successfully";
            }
            else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch( \ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 30/07/2021
        Name   : uspCheckDuplicateClientTemplateName
        Params : 
        Type   : GET
        Purpose: To Get All TemplateName on Client Side
    */
    public function uspCheckDuplicateClientTemplateName( Request $request){
        try{
            $TemplateName = $request->TemplateName;

            $params_array = array(
                $TemplateName
            );
            $data = DB::select(' EXEC uspCheckDuplicateClientTemplateName ?',$params_array);
            
            if( count($data) > 0){
                $message = "Data retrieved successfully";
            }
            else{
                $message = "No record found";
            }
            return $this->sendResponse($data, $message);
        }catch( \ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Abdul
        Date   : 24/09/2020
        Name   : getAllDecompositionTemplateByClientId
        Params : 
        Type   : GET
        Purpose: To Get All Decomposition Template By ClientId
    */
    public function getAllDecompositionTemplateByClientId( Request $request, $clientId){
        try{
            $params_array = array(
               $clientId
            );
            $data = DB::select(' EXEC Amplo.uspFetchAllTemplateByClientId ?',$params_array);
            $templates = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    $templates[$key]['value']      = $value->TemplateId;
                    $templates[$key]['label']      = $value->TemplateTitle;
                    $templates[$key]['image_path'] = $value->ImagePath;
                    $templates[$key]['CreatedDate'] = $value->CreatedDate;
                    $templates[$key]['Assignment'] = $value->Assignment;
                    $templates[$key]['IsAmploAssigned']= $value->IsAmploAssigned;
                }
                $message = "Data retrieved successfully";
            }
            else{
                $message = "No record found";
            }
            return $this->sendResponse($templates, $message);
        }catch( \ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }    
    /*
        Author : Abdul
        Date   : 28/09/2020
        Name   : updateAmploDecompositionTemplateFunctionPhaseSortOrder
        Params : 
        Type   : POST
        Purpose: To update amplo decomposition template function & phase sort order
    */
    public function updateAmploDecompositionTemplateFunctionPhaseSortOrder( Request $request){
        try{
           

            $requestData         = $request->all();
            if(isset($requestData['funcs'])){
                $requestJson['root'] = $requestData;
                $requestJsonEncode   = json_encode($requestJson);
               
                $params_array = array(
                    $this->user_data['UserID'],
                    $requestJsonEncode
                );
            
                $data = DB::select(' EXEC Amplo.uspUpdateFunctionOrder ?,?', $params_array);
            }
            else if(isset($requestData['phases'])){
                $requestJson['root'] = $requestData;
                $requestJsonEncode   = json_encode($requestJson);
               
                $params_array = array(
                    $this->user_data['UserID'],
                    $requestJsonEncode
                );
            
                $data = DB::select(' EXEC Amplo.uspUpdatePhaseOrder ?,?', $params_array);
            }
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response or JSON is not valid.";
                return $this->sendError($message);
            }
        }catch( \ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 28/09/2020
        Name   : updateClientDecompositionTemplateFunctionPhaseSortOrder
        Params : 
        Type   : POST
        Purpose: To update client decomposition template function & phase sort order
    */
    public function updateClientDecompositionTemplateFunctionPhaseSortOrder( Request $request){
        try{
           
            $requestData         = $request->all();
            if(isset($requestData['funcs'])){

                $requestJson['root'] = $requestData;
                $requestJsonEncode   = json_encode($requestJson);
               
                $params_array = array(
                    $this->user_data['UserID'],
                    $requestJsonEncode
                );
            
                $data = DB::select(' EXEC uspUpdateFunctionOrderClient ?,?', $params_array);
            }
            else if(isset($requestData['phases'])){
                $requestJson['root'] = $requestData;
                $requestJsonEncode   = json_encode($requestJson);
               
                $params_array = array(
                    $this->user_data['UserID'],
                    $requestJsonEncode
                );
            
                $data = DB::select(' EXEC uspUpdatePhaseOrderClient ?,?', $params_array);
            }
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data, $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }else if(is_array($data) && count($data) === 0){
                $message = "Stored procedure is not returning anything.";
                return $this->sendError($message);
            }
            else{
                $message = "Stored procedure is returning wrong response or JSON is not valid.";
                return $this->sendError($message);
            }
        }catch( \ Exception $e ){
            return $this->sendError($e->getMessage());
        }
    }
    /*
        Author : Abdul
        Date   : 05/10/2020
        Name   : exportAmploCMTemplate
        Params : @templateId,
        Type   : GET
        Purpose: To export amplo CM template
    */
    public function exportAmploCMTemplate( request $request, $templateId ){
        try{
                $templateData = DB::select('EXEC Amplo.AmploCmTemplateExportSheet1 ?',array($templateId));
                $fpmData = DB::select('EXEC Amplo.AmploCmTemplateExportSheet2 ?',array($templateId));
                $processData = DB::select('EXEC Amplo.AmploCmTemplateExportSheet3 ?',array($templateId));
                
                if( count($templateData) > 0 && count($fpmData)>0 && count($processData)>0){    

                    $templateData = json_decode(json_encode($templateData), true);
                    
                    /* Create new PHPExcel object*/
                    $objPHPExcel = new PHPExcel();

                    $styleArray = array(
                        'fill' => array(
                            'type' => PHPExcel_Style_Fill::FILL_SOLID,
                            'color' => array('rgb' => 'D3D3D3')
                        ),
                        'font'  => array(
                            'bold'  => true
                        ),
                        'borders' => array(
                            'allborders' => array(
                                'style' => PHPExcel_Style_Border::BORDER_THIN,
                                'color' => array('rgb' => '000000')
                            )
                        )
                    );
                    $styleArrayCol = array(
                        'borders' => array(
                            'allborders' => array(
                                'style' => PHPExcel_Style_Border::BORDER_THIN,
                                'color' => array('rgb' => '000000')
                            )
                        )
                    );
                    /* Create a first sheet, representing sales data*/
                    $objPHPExcel->setActiveSheetIndex(0);
                    $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($templateData)), null, 'A1');
                    $objPHPExcel->getActiveSheet()->fromArray($templateData, null, 'A2');

                    $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                    $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);


                    for ($i = 'A'; $i !=  $objPHPExcel->getActiveSheet()->getHighestColumn(); $i++) {
                        $objPHPExcel->getActiveSheet()->getColumnDimension($i)->setAutoSize(TRUE);
                        
                    }
                    for($i=1; $i<=count($templateData); $i++){
                        $objPHPExcel->getActiveSheet()->getStyle('A'.$i.':'.$column.($i+1))->applyFromArray($styleArrayCol);
                    }
                    /* Rename 1st sheet*/
                    $objPHPExcel->getActiveSheet()->setTitle('Template');
                    /* Create a new worksheet, after the default sheet*/
                    $objPHPExcel->createSheet();
                    $objPHPExcel->setActiveSheetIndex(1);
                    if(count($fpmData)>0){
                        $fpmData = json_decode(json_encode($fpmData), true);

                        $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($fpmData)), null, 'A1');
                        $objPHPExcel->getActiveSheet()->fromArray($fpmData, null, 'A2');

                        $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                        $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);


                        for ($i = 'A'; $i !=  $objPHPExcel->getActiveSheet()->getHighestColumn(); $i++) {
                            $objPHPExcel->getActiveSheet()->getColumnDimension($i)->setAutoSize(TRUE);
                            
                        }
                        for($i=1; $i<=count($fpmData); $i++){
                            $objPHPExcel->getActiveSheet()->getStyle('A'.$i.':'.$column.($i+1))->applyFromArray($styleArrayCol);;
                        }
                    }
                    /* Rename 2nd sheet*/
                    $objPHPExcel->getActiveSheet()->setTitle('FPM');
                    /* Create a new worksheet, after the 2nd sheet*/
                    $objPHPExcel->createSheet();
                    $objPHPExcel->setActiveSheetIndex(2);
                    if(count($fpmData)>0){
                        $processData = json_decode(json_encode($processData), true);

                        $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($processData)), null, 'A1');
                        $objPHPExcel->getActiveSheet()->fromArray($processData, null, 'A2');

                        $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                        $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);


                        for ($i = 'A'; $i !=  $objPHPExcel->getActiveSheet()->getHighestColumn(); $i++) {
                            $objPHPExcel->getActiveSheet()->getColumnDimension($i)->setAutoSize(TRUE);
                            
                        }
                        for($i=1; $i<=count($processData); $i++){
                            $objPHPExcel->getActiveSheet()->getStyle('A'.$i.':'.$column.($i+1))->applyFromArray($styleArrayCol);;
                        }
                    }
                    /* Rename 3rd sheet*/
                    $objPHPExcel->getActiveSheet()->setTitle('Process');

                    $date=date('d-M-Y-H-i-s');
                    $filename   ='CMTemplateData'.'-'.$date.'.xls'; 
                    /* Redirect output to a client’s web browser (Excel5)*/
                    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
                    // Sending headers to force the user to download the file
                    header('Content-Type: application/vnd.ms-excel');
                    header('Content-Disposition: attachment;filename="'.$filename.'"');
                    header('Cache-Control: max-age=0');
                    //$objWriter->save('php://output');
                    //die;
                    $objWriter->save($filename);
                    if (file_exists(public_path($filename))){
                        $message = "file generate successfully";
                        $data    = array("file_name"=> $filename );
                        return $this->sendResponse($data, $message);  
                    } 
                    else{
                        $message = "file not generated";
                        $data    = array("file_name"=>"");
                        return $this->sendResponse($data, $message);  
                    }
                    
                }else{
                    $message  = "No record found";
                    $data    = array("file_name"=>"");
                    return $this->sendResponse($data, $message); 
                }

        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }  
    /*
        Author : Abdul
        Date   : 05/10/2020
        Name   : importAmploCMTemplate
        Params : @templateId,
        Type   : GET
        Purpose: To import amplo CM template
    */  
    public function importAmploCMTemplate( Request $request ){
        try{
            ini_set('max_execution_time', 120); //120 seconds =  2 minutes
            $validator = Validator::make($request->all(), [
                'files'   => 'required',
                'files.*' => 'mimes:xls,xlsx'
            ]);
            $templateId = $request->input('templateId');
            $file       = $request->file('files');

            $file_name = date('d-M-Y-H-i-s').'-'.$file->getClientOriginalName();
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

            $common_model   = new Common();
            $column_array  = $common_model->readAmploCMTemplateXLS( $source_file );

            $templateData['root'] = isset($column_array['templateData']) ? $column_array['templateData'] : [];
            $templateDataJson     = json_encode($templateData);

            $fpmData['root']      = isset($column_array['fpmData']) ? $column_array['fpmData'] : [];
            $fpmDataJson          = json_encode($fpmData);

            $processData['root']  = isset($column_array['processData']) ? $column_array['processData'] : [];
            $processDataJson      = json_encode($processData);
            
            $params_array = array(
                $templateDataJson,
                $fpmDataJson,
                $processDataJson,
                $this->user_data['UserID'],
                $templateId
            );
            
            $apiResponse = DB::select(" EXEC Amplo.uspImportTemplateToStaging ?,?,?,?,?",$params_array);
            
            if(count($apiResponse)>0 && isset($apiResponse[0]->Success) && ($apiResponse[0]->Success == true || $apiResponse[0]->Success ===1)){
                $postRequest = array(
                    $apiResponse[0]->StagingId,
                    $this->user_data['UserID']
                );
                $response = DB::statement(" EXEC Amplo.uspImportTemplateToMainAmplo ?,?",$postRequest);
                if( $response ==1){
                    DB::statement(" EXEC Amplo.uspImportTemplateToMain ?,?",$postRequest);
                    if(file_exists($source_file)){
                        rename($source_file, $destinationPathArchive.'/'. pathinfo($source_file, PATHINFO_BASENAME));
                        $message = "file upload successfully";
                        $data    = array("message"=>$message);
                        return $this->sendResponse($data, $message);
                    }
                }
            }
            else{
                return $this->sendError($apiResponse);
            }
            
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }   
    /*
        Author : Abdul
        Date   : 08/10/2020
        Name   : getUseCaseFour
        Params : None
        Type   : GET
        Purpose: To get use case four 
    */
    public function getUseCaseFour(Request $request, $projectId){
        try{
            $params_array = array(
                $this->user_data['UserID']
            );
            $userData = DB::select(' EXEC Amplo.uspGetCompanyProfileAiMl ?', $params_array);
            if(count($userData) > 0){
                $postRequest = array(
                    'industryId'=> $userData[0]->IndustryID,
                    'clientId'  => $this->user_data['ClientID'],
                    'projectId' => $projectId
                );
                
                $Url = env('AFLY_SITE_URL')."api/getUseCaseFour";

                $cURLConnection = curl_init($Url);
                curl_setopt($cURLConnection, CURLOPT_POSTFIELDS, $postRequest);
                curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

                $apiResponse = curl_exec($cURLConnection);
                curl_close($cURLConnection);
                $apiResponse = json_decode($apiResponse,true);
                //echo "<pre>";print_r($apiResponse);echo "<br>";die;
                if(is_array($apiResponse) && count($apiResponse) > 0){
                    $data = array();
                    /*foreach ($apiResponse as $key => $value) {
                        $data['Function'][$value['Function']]['Function'] = $value['Function'];
                        if($value['Painpoints']!=null && $value['Painpoints']!=""){
                            $data['Function'][$value['Function']]['Painpoints'][$value['Painpoints']] = array('Painpoints'=>$value['Painpoints']);
                        }else{
                             $data['Function'][$value['Function']]['Painpoints'] = array();
                        }
                        if($value['Root_cause']!=null && $value['Root_cause']!=""){
                            $data['Function'][$value['Function']]['Root_cause'][$value['Root_cause']] = array('Root_cause'=>$value['Root_cause']);
                        }else{
                            $data['Function'][$value['Function']]['Root_cause'] = array();   
                        }
                        if($value['Solutions']!=null && $value['Root_cause']!=""){
                            $data['Function'][$value['Function']]['Solutions'][$value['Solutions']] = array('Solutions'=>$value['Solutions']);
                        }else{
                            $data['Function'][$value['Function']]['Solutions'] = array();   
                        }
                        if($value['Solution_KPI_Recommendation']!=null && $value['Solution_KPI_Recommendation']!=""){
                            $data['Function'][$value['Function']]['Solution_KPI_Recommendation'][$value['Solution_KPI_Recommendation']] = array('Solution_KPI_Recommendation'=>$value['Solution_KPI_Recommendation']);
                        }else{
                            $data['Function'][$value['Function']]['Solution_KPI_Recommendation'] = array();   
                        }
                        if($value['Painpoint_KPI_Recommendation']!=null && $value['Painpoint_KPI_Recommendation']){
                            $data['Function'][$value['Function']]['Painpoint_KPI_Recommendation'][$value['Painpoint_KPI_Recommendation']] = array('Painpoint_KPI_Recommendation'=>$value['Painpoint_KPI_Recommendation']);
                        }else{
                            $data['Function'][$value['Function']]['Painpoint_KPI_Recommendation'] = array();   
                        }
                        
                    }
                    $data['Function'] = array_values($data['Function']);
                    foreach ($data['Function'] as $key => $value) {
                        if(isset($value['Painpoints'])){
                            $data['Function'][$key]['Painpoints'] = array_values($value['Painpoints']);
                        }
                        if(isset($value['Root_cause'])){
                            $data['Function'][$key]['Root_cause'] = array_values($value['Root_cause']);
                        }
                        if(isset($value['Solutions'])){
                            $data['Function'][$key]['Solutions'] = array_values($value['Solutions']);
                        }
                        if(isset($value['Solution_KPI_Recommendation'])){
                            $data['Function'][$key]['Solution_KPI_Recommendation'] = array_values($value['Solution_KPI_Recommendation']);
                        }
                        if(isset($value['Painpoint_KPI_Recommendation'])){
                            $data['Function'][$key]['Painpoint_KPI_Recommendation'] = array_values($value['Painpoint_KPI_Recommendation']);
                        }
                    }*/
                    foreach ($apiResponse as $key => $value) {
                        $data['Painpoints'][$value['Painpoints']]['Painpoints'] = $value['Painpoints'];
                        if($value['Function']!=null && $value['Function']!=""){
                            $data['Painpoints'][$value['Painpoints']]['Function'][$value['Function']] = array('Function'=>$value['Function']);
                        }else{
                             $data['Painpoints'][$value['Painpoints']]['Function'] = array();
                        }
                        if($value['Root_cause']!=null && $value['Root_cause']!=""){
                            $data['Painpoints'][$value['Painpoints']]['Root_cause'][$value['Root_cause']] = array('Root_cause'=>$value['Root_cause']);
                        }else{
                            $data['Painpoints'][$value['Painpoints']]['Root_cause'] = array();   
                        }
                        if($value['Solutions']!=null && $value['Root_cause']!=""){
                            $data['Painpoints'][$value['Painpoints']]['Solutions'][$value['Solutions']] = array('Solutions'=>$value['Solutions']);
                        }else{
                            $data['Painpoints'][$value['Painpoints']]['Solutions'] = array();   
                        }
                        if($value['Solution_KPI_Recommendation']!=null && $value['Solution_KPI_Recommendation']!=""){
                            $data['Painpoints'][$value['Painpoints']]['Solution_KPI_Recommendation'][$value['Solution_KPI_Recommendation']] = array('Solution_KPI_Recommendation'=>$value['Solution_KPI_Recommendation']);
                        }else{
                            $data['Painpoints'][$value['Painpoints']]['Solution_KPI_Recommendation'] = array();   
                        }
                        if($value['Painpoint_KPI_Recommendation']!=null && $value['Painpoint_KPI_Recommendation']!=""){
                            $data['Painpoints'][$value['Painpoints']]['Painpoint_KPI_Recommendation'][$value['Painpoint_KPI_Recommendation']] = array('Painpoint_KPI_Recommendation'=>$value['Painpoint_KPI_Recommendation']);
                        }else{
                            $data['Painpoints'][$value['Painpoints']]['Painpoint_KPI_Recommendation'] = array();   
                        }
                    }
                    $data['Painpoints'] = array_values($data['Painpoints']);
                    foreach ($data['Painpoints'] as $key => $value) {
                        if(isset($value['Function'])){
                            $data['Painpoints'][$key]['Function'] = array_values($value['Function']);
                        }
                        if(isset($value['Root_cause'])){
                            $data['Painpoints'][$key]['Root_cause'] = array_values($value['Root_cause']);
                        }
                        if(isset($value['Solutions'])){
                            $data['Painpoints'][$key]['Solutions'] = array_values($value['Solutions']);
                        }
                        if(isset($value['Solution_KPI_Recommendation'])){
                            $data['Painpoints'][$key]['Solution_KPI_Recommendation'] = array_values($value['Solution_KPI_Recommendation']);
                        }
                        if(isset($value['Painpoint_KPI_Recommendation'])){
                            $data['Painpoints'][$key]['Painpoint_KPI_Recommendation'] = array_values($value['Painpoint_KPI_Recommendation']);
                        }
                    }
                    $message = "Data retrieved successfully.";
                    return $this->sendResponse($data['Painpoints'],$message);
                }
                else if(is_array($apiResponse) && count($apiResponse) === 0){
                    $message = "No record found.";
                    return $this->sendResponse($apiResponse,$message);
                }
                else{
                    return $this->sendError($apiResponse);
                }
            }else{
                $message = "Company profile data not found.";
                return $this->sendResponse($data,$message);
            }
        }catch(\Exception $e){
            return $this->sendError($e->getMessage()); 
        }
    }
    /*
        Author : Abdul
        Date   : 09/10/2020
        Name   : exportPainPointsInitiatives
        Params : 
        Type   : GET
        Purpose: To export pain point initiatives
    */
    public function exportPainPointsInitiatives(Request $request, $projectId){
        try{
            $params_array = array(
                $this->user_data['UserID']
            );
            $userData = DB::select(' EXEC Amplo.uspGetCompanyProfileAiMl ?', $params_array);
            if(count($userData) > 0){
                $postRequest = array(
                    'industryId'=> $userData[0]->IndustryID,
                    'clientId'  => $this->user_data['ClientID'],
                    'projectId' => $projectId
                );
                $Url = env('AFLY_SITE_URL')."api/getUseCaseFour";
                $cURLConnection = curl_init($Url);
                curl_setopt($cURLConnection, CURLOPT_POSTFIELDS, $postRequest);
                curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);

                $apiResponse = curl_exec($cURLConnection);
                curl_close($cURLConnection);
                $apiResponse = json_decode($apiResponse,true);

                if( count($apiResponse) > 0){
                    $data_array = array();
                    foreach ($apiResponse as $key => $value) {
                        
                        /*$apiResponse[$key]['Root Cause'] = $value['Root_cause'];
                        $apiResponse[$key]['Solution KPI Recommendation'] = $value['Solution_KPI_Recommendation'];
                        $apiResponse[$key]['Painpoints KPI Recommendation'] = $value['Painpoint_KPI_Recommendation'];
                        unset($apiResponse[$key]['project_id'],$apiResponse[$key]['client_id'],$apiResponse[$key]['industry_id'],$apiResponse[$key]['Root_cause'],$apiResponse[$key]['Solution_KPI_Recommendation'],$apiResponse[$key]['Painpoint_KPI_Recommendation'],$apiResponse[$key]['ProcessDate']);*/
                        $data_array[$key]['Painpoints'] = $value['Painpoints'];
                        $data_array[$key]['Function']   = $value['Function'];
                        $data_array[$key]['Root Cause'] = $value['Root_cause'];
                        $data_array[$key]['Solutions']  = $value['Solutions'];
                        $data_array[$key]['Solution KPI Recommendation']  = $value['Solution_KPI_Recommendation'];
                        $data_array[$key]['Painpoints KPI Recommendation']  = $value['Painpoint_KPI_Recommendation'];
                        
                    }
                    
                    /* Create new PHPExcel object*/
                    $objPHPExcel = new PHPExcel();

                    $styleArray = array(
                        'fill' => array(
                            'type' => PHPExcel_Style_Fill::FILL_SOLID,
                            'color' => array('rgb' => 'D3D3D3')
                        ),
                        'font'  => array(
                            'bold'  => true
                        ),
                        'borders' => array(
                            'allborders' => array(
                                'style' => PHPExcel_Style_Border::BORDER_THIN,
                                'color' => array('rgb' => '000000')
                            )
                        )
                    );

                    $styleArrayCol = array(
                        'borders' => array(
                            'allborders' => array(
                                'style' => PHPExcel_Style_Border::BORDER_THIN,
                                'color' => array('rgb' => '000000')
                            )
                        )
                    );

                    /* Create a first sheet, representing sales data*/
                    $objPHPExcel->setActiveSheetIndex(0);
                    $objPHPExcel->getActiveSheet()->fromArray(array_keys(current($data_array)), null, 'A1');
                    $objPHPExcel->getActiveSheet()->fromArray($data_array, null, 'A2');

                    $column =$objPHPExcel->getActiveSheet()->getHighestColumn();
                    $objPHPExcel->getActiveSheet()->getStyle('A1:'.$column.'1')->applyFromArray($styleArray);

                    for ($i = 'A'; $i !=  $objPHPExcel->getActiveSheet()->getHighestColumn(); $i++) {
                        $objPHPExcel->getActiveSheet()->getColumnDimension($i)->setAutoSize(TRUE);
                        
                    }
                    for($i=1; $i<=count($data_array); $i++){
                        $objPHPExcel->getActiveSheet()->getStyle('A'.$i.':'.$column.($i+1))->applyFromArray($styleArrayCol);
                    }
                    /* Rename 1st sheet*/
                    $objPHPExcel->getActiveSheet()->setTitle('PainPointsInitiatives');

                    $date=date('d-M-Y-H-i-s');
                    $filename   ='PainPointsInitiatives'.'-'.$date.'.xls'; 
                    /* Redirect output to a client’s web browser (Excel5)*/
                    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
                    // Sending headers to force the user to download the file
                    header('Content-Type: application/vnd.ms-excel');
                    header('Content-Disposition: attachment;filename="'.$filename.'"');
                    header('Cache-Control: max-age=0');
                    //echo $objWriter->save('php://output');
                    //die;
                    $objWriter->save($filename);
                    if (file_exists(public_path($filename))){
                        $message = "file generate successfully";
                        $data    = array("file_name"=> $filename );
                        return $this->sendResponse($data, $message);  
                    } 
                    else{
                        $message = "file not generated";
                        $data    = array("file_name"=>"");
                        return $this->sendResponse($data, $message);  
                    }
                }else{
                    $message  = "No record found";
                    $data    = array("file_name"=>"");
                    return $this->sendResponse($apiResponse, $message); 
                }
            }else{
                $message = "Company profile data not found.";
                return $this->sendResponse($data,$message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }    

    /*
        Author : Mohammed Mushran
        Date   : 22/09/2021
        Name   : uspSaveFunctionsAndPhasesAgainstProjectLevel
        Params : 
        Type   : POST
        Purpose: To save Functions And Phases Against Project Level
    */
    public function uspSaveFunctionsAndPhasesAgainstProjectLevel( Request $request ){
        try{
            /*echo $this->user_data['UserID'];echo "<br>";
            echo $this->user_data['ClientID'];
            die;*/
            $validator = Validator::make($request->all(), [
                'ProjectId'         => 'required|numeric',
                'UserId'            => 'required|numeric',
                "SelectedFunctions" => "required|array|min:1",
                "SelectedPhases"    => "required|array|min:1",
                "SelectedPermission"       => "array"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $requestData = $request->all();
            
            $ProjectId         = $requestData['ProjectId'];
            // $TemplateId         = $requestData['TemplateId'];
            // $UserId            = $requestData['UserId'];
            $UserId            = $this->user_data['UserID'];

            $SelectedFunctions['root'] = $requestData['SelectedFunctions'];
            $SelectedPhases['root'] = $requestData['SelectedPhases'];
            $SelectedPermission['root']  = $requestData['SelectedPermission'];

            $selFunction = json_encode($SelectedFunctions);
            $selPhase    = json_encode($SelectedPhases);
            $per         = json_encode($SelectedPermission);

            
            $params_array1 = array(
                $this->user_data['ClientID'],
                $ProjectId,
                $UserId,
                $selFunction,
                $selPhase,
                $per
            );
            // print_r($params_array1);die;
            // $params_array2 = array(
            //     $ProjectId,
            //     // $TemplateId,
            //     $this->user_data['UserID']
            // );
           //echo "<pre>";print_r( $params_array1 );echo "<br>";die;
           $data = DB::statement(' EXEC uspSaveFunctionsAndPhasesAgainstProjectLevel ?,?,?,?,?,?',$params_array1);
        //    print_r($data);die;
           //    DB::statement(' EXEC uspSaveTemplateAndGenerateDataForProject ?,?,?',$params_array2);
           if($data){
                $message = "Successfully given permission";
                $resp['ProjectId'] = $ProjectId;
                return $this->sendResponse($resp, $message);
           }else{
               throw new \Exception('An error occured');
           }
           return $this->sendResponse($resp, $message);
            
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }    
    }
    
    /*
        Author : Mohammed Mushran
        Date   : 22/09/2021
        Name   : uspDeleteFunctionsAndPhasesAgainstProjectLevel
        Params : 
        Type   : PATCH
        Purpose: To update Functions And Phases Against Project Level
    */
    public function uspDeleteFunctionsAndPhasesAgainstProjectLevel (Request $request) {
        try{
            $ProjectId = $request->ProjectId;
            $TemplateId = $request->TemplateId;
            $UserId = $this->user_data['UserID'];
            $SelectedFunctionID = $request->SelectedFunctionID;
            $SelectedPhaseID = $request->SelectedPhaseID;

            $params_array = [
                $ProjectId,
                $TemplateId,
                $UserId,
                $SelectedFunctionID,
                $SelectedPhaseID
            ];
            $data = DB::select(' EXEC uspDeleteFunctionsAndPhasesAgainstProjectLevel ?,?,?,?,?', $params_array);
            // console.log($data);
            if( count($data) > 0) {
                $message = "Updated Successfully.";
            } else {
                $message = "Error Occured, Please try again";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 23/09/2021
        Name   : uspGetSelectedFunctionsAgainstProjectLevel
        Params : @
        Type   : GET
        Purpose: To get the uspGetSelectedFunctionsAgainstProjectLevel data
    */
    public function uspGetSelectedFunctionsAgainstProjectLevel(Request $request, $TemplateId,$ProjectId) {
        try{
            $validator = Validator::make(['TemplateId'=>$TemplateId,'ProjectId'=>$ProjectId], [
                'TemplateId' => "required",
                'ProjectId' => "required"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $TemplateId,
                $ProjectId
            );
            $data = DB::select('EXEC uspGetSelectedFunctionsAgainstProjectLevel ?,?',$param_array);
           
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

    /*
        Author : Mohammed Mushran
        Date   : 23/09/2021
        Name   : uspGetSelectedPhasesAgainstProjectLevel
        Params : @
        Type   : GET
        Purpose: To get the uspGetSelectedPhasesAgainstProjectLevel data
    */
    public function uspGetSelectedPhasesAgainstProjectLevel(Request $request, $TemplateId,$ProjectId) {
        try{
            $validator = Validator::make(['TemplateId'=>$TemplateId,'ProjectId'=>$ProjectId], [
                'TemplateId' => "required",
                'ProjectId' => "required"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $TemplateId,
                $ProjectId
            );
            $data = DB::select('EXEC uspGetSelectedPhasesAgainstProjectLevel ?,?',$param_array);
           
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
    
    /*
        Author : Mohammed Mushran
        Date   : 08/10/2021
        Name   : uspAddFunctionsAndPhasesAgainstProjectLevel
        Params : 
        Type   : POST
        Purpose: To add Functions And Phases Against Project Level
    */
    public function uspAddFunctionsAndPhasesAgainstProjectLevel (Request $request) {
        try{
            // $requestData = $request->all(); 
            // print_r($requestData); die;
            $UserId = $this->user_data['UserID'];
            if (!empty($request->FunctionName)) {
                $FunctionName = $request->FunctionName;
                $PhaseName = "";
            } else {
                $FunctionName = "";
                $PhaseName = $request->PhaseName;
            }

            $params_array = [
                $UserId,
                $FunctionName,
                $PhaseName
            ];
            // print_r($params_array); die;
            $data = DB::select(' EXEC uspAddFunctionsAndPhasesAgainstProjectLevel ?,?,?', $params_array);
            // console.log($data);
            if( count($data) > 0) {
                $message = "Saved Successfully.";
            } else {
                $message = "Error Occured, Please try again";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
        Author : Mohammed Mushran
        Date   : 10/10/2021
        Name   : uspGetSelectedFunctionsForProjectDetails
        Params : @
        Type   : GET
        Purpose: To get the uspGetSelectedFunctionsForProjectDetails data
    */
    public function uspGetSelectedFunctionsForProjectDetails(Request $request, $TemplateId,$ProjectId) {
        try{
            $validator = Validator::make(['TemplateId'=>$TemplateId,'ProjectId'=>$ProjectId], [
                'TemplateId' => "required",
                'ProjectId' => "required"
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                $TemplateId,
                $ProjectId
            );
            $data = DB::select('EXEC uspGetSelectedFunctionsForProjectDetails ?,?',$param_array);
           
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
    
    /*
        Author : Mohammed Mushran
        Date   : 10/10/2021
        Name   : uspDeleteFunctionsAndPhasesForProjectDetails
        Params : 
        Type   : PATCH
        Purpose: To update Functions And Phases Against Project Level
    */
    public function uspDeleteFunctionsAndPhasesForProjectDetails (Request $request) {
        try{
            $ProjectId = $request->ProjectId;
            $TemplateId = $request->TemplateId;
            $UserId = $this->user_data['UserID'];
            $SelectedFunctionID = $request->SelectedFunctionID;
            $SelectedPhaseID = $request->SelectedPhaseID;

            $params_array = [
                $ProjectId,
                $TemplateId,
                $UserId,
                $SelectedFunctionID,
                $SelectedPhaseID
            ];
            $data = DB::select(' EXEC uspDeleteFunctionsAndPhasesForProjectDetails ?,?,?,?,?', $params_array);
            // console.log($data);
            if( count($data) > 0) {
                $message = "Updated Successfully.";
            } else {
                $message = "Error Occured, Please try again";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    
    /*
        Author : Mohammed Mushran
        Date   : 11/10/2021
        Name   : uspSaveFunctionsAndPhasesForFunctionDetails
        Params : 
        Type   : POST
        Purpose: To save the Functions And Phases Details
    */
    public function uspSaveFunctionsAndPhasesForFunctionDetails (Request $request) {
        try{
            $ClientId = $this->user_data['ClientID'];
            $ProjectId = $request->ProjectId;
            $UserId = $this->user_data['UserID'];
            $SelectedFunctions = $request->SelectedFunctions;
            $SelectedPhases = $request->SelectedPhases;
            $SelectedPermission = $request->SelectedPermission;

            $params_array = [
                $ClientId,
                $ProjectId,
                $UserId,
                $SelectedFunctions,
                $SelectedPhases,
                $SelectedPermission
            ];
            // print_r($params_array); die;
            $data = DB::select(' EXEC uspSaveFunctionsAndPhasesForFunctionDetails ?,?,?,?,?,?',$params_array);
            // console.log($data);
            if( count($data) > 0) {
                $message = "Saved Successfully.";
            } else {
                $message = "Error Occured, Please try again";
            }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    public function SaveAmpMarkingCapabilityProjectRelation(Request $request){
        try{
            $validator = Validator::make($request->all(), [
              //  'BenchmarkProjectId'=>'required'
                
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                
                $this->user_data['UserID'],
                json_encode($request->all())
            );
            $data = DB::select('EXEC uspSaveAmpMarkingCapabilityProjectRelation ?,?',$param_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)&& ($data[0]->Success == false || $data[0]->Success ===0)){
                $message =$data[0]->MessageName; 
                return $this->sendError($message);
            }
            return $this->sendResponse($data, $message);
            
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    public function getAmpMarkingCapabilityProjectRelation(Request $request,$AmpMarkingProjectId,$CapabilityModelingProjectId){
        try{
            $params = array(
                $AmpMarkingProjectId,
                $CapabilityModelingProjectId,
                $this->user_data['UserID']
            );
           $data = DB::select('EXEC uspGetAmpMarkingCapabilityProjectRelation ?,?,?',$params);         
                 
          
          $sorted_data = array();
           if($data){
            foreach($data as $k => $value){
                $sorted_data['AmpMarkingProjectId'] = $value->AmpMarkingProjectId;
                $sorted_data['CapabilityModelingProjectId'] = $value->CapabilityModelingProjectId;
                $sorted_data['RelationWithAmpmarkingProject'][$k]['AmpMarkingDomainId'] = $value->AmpMarkingDomainId;
                $sorted_data['RelationWithAmpmarkingProject'][$k]['ProjectRelationId'] = $value->ProjectRelationId;
                $sorted_data['RelationWithAmpmarkingProject'][$k]['CapabilityProcessLevelId'] = $value->CapabilityProcessLevelId;
                $sorted_data['RelationWithAmpmarkingProject'][$k]['RelationType'] = $value->RelationType;
                
            }
            $message = "AmpMarking Capability ProjectRelation Details   retrieved successfully";
        } else{
           // $sorted_data = (Object)[];
            $message = 'data not found';
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
    }

    public function SaveDependentDetail(Request $request){
        try{
            $validator = Validator::make($request->all(), [
              //  'BenchmarkProjectId'=>'required'
                
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                
                $this->user_data['UserID'],
                json_encode($request->all())
            );
            $data = DB::select('EXEC uspSaveDependentDetail ?,?',$param_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)&& ($data[0]->Success == false || $data[0]->Success ===0)){
                $message =$data[0]->MessageName; 
                return $this->sendError($message);
            }
            return $this->sendResponse($data, $message);
            
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    public function DeleteDependentDetail (Request $request,$DecompositionProjectID,$DecompositionProcessLevel1ID,$DependentMasterId){
        try{
           
            $requestData = $request->all();
            $params_array = array(
                $DecompositionProjectID,
                $DecompositionProcessLevel1ID,
                $DependentMasterId,
                $this->user_data['UserID']          
            );
            $data = DB::select('EXEC DeleteDependentDetail ?,?,?,?', $params_array);

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 

    public function DeleteDependentMaster (Request $request,$DecompositionProjectID,$DecompositionProcessLevel1ID,$DependentMasterId){
        try{
           
            $requestData = $request->all();
            $params_array = array(
                $DecompositionProjectID,
                $DecompositionProcessLevel1ID,
                $DependentMasterId,
                $this->user_data['UserID']        
            );
            $data = DB::select('EXEC uspDeleteDependentMaster ?,?,?,?', $params_array);

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 

    public function GetDependentDetail(Request $request,$DecompositionProjectID,$DecompositionProcessLevel1ID,$DependentMasterId){
        try{
            $params = array(
               $DecompositionProjectID,
               $DecompositionProcessLevel1ID,
               $DependentMasterId,
               $this->user_data['UserID'],
            );
            $data = DB::select('EXEC uspGetDependentDetail ?,?,?,?',$params);
            $data_array = array();
            $final_data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    
                        $data_array[$value->CausalName]['Name'] = $value->CausalName;
                        $data_array[$value->CausalName]['Data'][$value->DependentMasterId]["DependentMasterId"] = $value->DependentMasterId;
                        $data_array[$value->CausalName]['Data'][$value->DependentMasterId]["DecompositionProcessLevel1ID"] = $value->DecompositionProcessLevel1ID;
                        $data_array[$value->CausalName]['Data'][$value->DependentMasterId]["DecompositionProjectID"] = $value->DecompositionProjectID; 
                       $data_array[$value->CausalName]['Data'][$value->DependentMasterId]["IndependentProcess"][] = array("DecompositionProcessLevel1ID"=>$value->IndependentDecompositionProcessLevel1ID,"IndependendentDecompositionProjectID"=>$value->IndependendentDecompositionProjectID,
                       "Value"=>$value->Value);
                
                }

                $final_data_array = array_values($data_array);
                foreach ($final_data_array as $key => $value) {
                    $final_data_array[$key]['Data'] = array_values($value['Data']);
                }
                $message = "data retrieved successfully";
            } else{
                $message = "No record found";
            }
            return $this->sendResponse($final_data_array, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    public function CheckCircularDependency(Request $request){
        try{
            $validator = Validator::make($request->all(), [
              //  'BenchmarkProjectId'=>'required'
                
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                
                $this->user_data['UserID'],
                json_encode($request->all())
            );
            $data = DB::select('EXEC uspCheckCircularDependency ?,?',$param_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)&& ($data[0]->Success == false || $data[0]->Success ===0)){
                $message =$data[0]->MessageName; 
                return $this->sendError($message);
            }
            return $this->sendResponse($data, $message);
            
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    public function GetCausalByProjectId(Request $request,$DecompositionProjectID){
        try{
            $params = array(
                $DecompositionProjectID,
               $this->user_data['UserID'],
            );
           $data = DB::select('EXEC uspGetCausalByProjectId  ?,?',$params);
           
           $sorted_data = array();
           if($data){
            foreach($data as $k => $value){
                $sorted_data[$k]['DependentMasterId'] = $value->DependentMasterId;
                $sorted_data[$k]['CausalName'] = $value->CausalName;
              
            }
            $message = "Causal Details   retrieved successfully";
        } else{
           // $sorted_data = (Object)[];
            $message = 'data not found';
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
    }  
    public function GetFunctionPhasebyProjectId(Request $request,$DecompositionProjectID){
        try{
            $params = array(
                $DecompositionProjectID,
               $this->user_data['UserID'],
            );
           $data = DB::select('EXEC uspGetFunctionPhasebyProjectId  ?,?',$params);
           
           $sorted_data = array();
           if($data){
            foreach($data as $k => $value){
                $sorted_data['DecompositionProjectID'] = $value->DecompositionProjectID;
                $sorted_data['FunctionPhaseAndProject'][$k]['ProjectName'] = $value->ProjectName;
                $sorted_data['FunctionPhaseAndProject'][$k]['FunctionName'] = $value->FunctionName;
                $sorted_data['FunctionPhaseAndProject'][$k]['PhaseName'] = $value->PhaseName;
                $sorted_data['FunctionPhaseAndProject'][$k]['DecompositionFunctionProjectID'] = $value->DecompositionFunctionProjectID;
                $sorted_data['FunctionPhaseAndProject'][$k]['DecompositionPhaseProjectID'] = $value->DecompositionPhaseProjectID;
            }
            $message = "Function and Phase name   retrieved successfully";
        } else{
           // $sorted_data = (Object)[];
            $message = 'data not found';
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
    }  
    public function GetCausalDataAndScore(Request $request,$DecompositionProjectID,$DecompositionProcessLevel1ID){
        try{
            $params = array(
                $DecompositionProjectID,
                $DecompositionProcessLevel1ID,
               $this->user_data['UserID'],
            );
           $data = DB::select('EXEC uspGetCausalDataAndScore  ?,?,?',$params);
           
           $sorted_data = array();
           if($data){
            foreach($data as $k => $value){
                $sorted_data['Details'][$k]['CausalName'] = $value->CausalName;
                $sorted_data['Details'][$k]['DependentMasterId'] = $value->DependentMasterId;
                $sorted_data['Details'][$k]['DecompositionProcessLevel1ID'] = $value->CausalName;
                $sorted_data['Details'][$k]['DecompositionProjectID'] = $value->DecompositionProjectID;
                $sorted_data['Details'][$k]['DecompositionProcessLevel1ID'] = $value->DecompositionProcessLevel1ID;
                $sorted_data['Details'][$k]['IndependendentDecompositionProjectID'] = $value->IndependendentDecompositionProjectID;
                $sorted_data['Details'][$k]['IndependentDecompositionProcessLevel1ID'] = $value->IndependentDecompositionProcessLevel1ID;
                $sorted_data['Details'][$k]['IsDependent'] = $value->IsDependent;
                $sorted_data['Details'][$k]['Score'] = $value->Score;
                $sorted_data['Details'][$k]['Value'] = $value->Value;
                $sorted_data['Details'][$k]['FinalScore'] = $value->FinalScore;
            }
            $message = "Causal Data And Score   retrieved successfully";
        } else{
           // $sorted_data = (Object)[];
            $message = 'data not found';
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
    } 
    public function GetDependentDetailbyDecompositionProcessLevelID(Request $request,$DecompositionProjectID,$DecompositionProcessLevel1ID){
        try{
            $params = array(
               $DecompositionProjectID,
               $DecompositionProcessLevel1ID,
               $this->user_data['UserID'],
            );
            $data = DB::select('EXEC uspGetDependentDetailbyDecompositionProcessLevelID ?,?,?',$params);
            $data_array = array();
            $final_data_array = array();
            if( count($data) > 0){
                foreach ($data as $key => $value) {
                    
                        $data_array[$value->CausalName]['CausalName'] = $value->CausalName;
                        $data_array[$value->CausalName]['Data'][$value->DependentMasterId]["DependentMasterId"] = $value->DependentMasterId;
                        $data_array[$value->CausalName]['Data'][$value->DependentMasterId]["DecompositionProcessLevel1ID"] = $value->DecompositionProcessLevel1ID;
                        $data_array[$value->CausalName]['Data'][$value->DependentMasterId]["DecompositionProjectID"] = $value->DecompositionProjectID;
                        $data_array[$value->CausalName]['Data'][$value->DependentMasterId]["ProjectName"] = $value->ProjectName;
                        $data_array[$value->CausalName]['Data'][$value->DependentMasterId]["DependentProcessLevelName"] = $value->DependentProcessLevelName;
                        $data_array[$value->CausalName]['Data'][$value->DependentMasterId]["DependentFunctionName"] = $value->DependentFunctionName;
                        $data_array[$value->CausalName]['Data'][$value->DependentMasterId]["DependentPhaseName"] = $value->DependentPhaseName;
                       $data_array[$value->CausalName]['Data'][$value->DependentMasterId]["IndependentProcess"][] = array("IndependentDecompositionProcessLevel1ID"=>$value->IndependentDecompositionProcessLevel1ID,
                       "IndependenProcessName"=>$value->IndependenProcessName,"IndependendentDecompositionProjectID"=>$value->IndependendentDecompositionProjectID,
                       "Value"=>$value->Value,"IndependentFunctionName"=>$value->IndependentFunctionName,"IndependentPhaseName"=>$value->IndependentPhaseName,
                       "IndependentProjectName"=>$value->IndependentProjectName);
                
                }

                $final_data_array = array_values($data_array);
                foreach ($final_data_array as $key => $value) {
                    $final_data_array[$key]['Data'] = array_values($value['Data']);
                }
                $message = "data retrieved successfully";
            } else{
                $message = "No record found";
            }
            return $this->sendResponse($final_data_array, $message);
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }

    public function DeleteDependentCapability (Request $request,$DecompositionProjectID,$DecompositionProcessLevel1ID,$DependentMasterId){
        try{
           
            $requestData = $request->all();
            $params_array = array(
                $DecompositionProjectID,
                $DecompositionProcessLevel1ID,
                $DependentMasterId,
                $this->user_data['UserID']        
            );
            $data = DB::select('EXEC DeleteDependentCapability ?,?,?,?', $params_array);

            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)){
                $message = $data[0]->MessageName;  
                return $this->sendError($message);
            }
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 
    

   
    public function GetProcessForFpmMerge (Request $request,$DecompositionProjectID1,$DecompositionProjectID2){
        try{
            $params = array(
               
                $this->user_data['UserID'],
                $DecompositionProjectID1,
                $DecompositionProjectID2
             );
             $data = DB::select('EXEC uspGetProcessForFpmMerge  ?,?,?',$params);
            if(count($data) > 0){
                foreach ($data as $row)
                {
                    $newArray['function'.$row->FunctionId]['phase'.$row->PhaseId][] = array(
                      //  'DecompositionProcessLevel1ID'=>$row->DecompositionProcessLevel1ID,
                      'ProjectID'=>$row->FromProjectId, 
                      'ProjectName'=>$row->ProjectName,
                        'GridViewLocationID'=>$row->GridViewLocationID,
                        'ProcessLevel1Name'=>$row->ProcessLevel1Title,
                        'ProcessLevel1ID'=>$row->ProcessLevel1ID,
                        'Status' => $row->Status,
                        'function_id'=>$row->FunctionId,
                        'function_name'=>$row->FunctionName,
                        'phase_id' => $row->PhaseId,
                        'phase_Name'=>$row->PhaseName,
                        'GridVViewLocationFlag'=>$row->GridVViewLocationFlag,
                        'Status'=>$row->Status,
                        'style_id' => $row->StyleID,
                        'style_name' => $row->StyleName,
                        'TemplateFunctPhaseStyleAssignmentID' => $row->TemplateFunctPhaseStyleAssignmentID
                        
                    );
                }

                $response = $newArray;
                $message = "decomposition level 1 data retrieved.";
            }else{
                $response= (Object)[];
                $message = "No data found";
            }
            return $this->sendResponse($response, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 

    public function SaveFpmMerge(Request $request){
        try{
            $validator = Validator::make($request->all(), [
              //  'BenchmarkProjectId'=>'required'
                
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }
            $param_array = array(
                
                $this->user_data['UserID'],
                json_encode($request->all())
            );
            $data = DB::select('EXEC uspSaveFpmMerge ?,?',$param_array);
            if( isset($data[0]->Success) && ($data[0]->Success == true || $data[0]->Success ===1)){
               $message = $data[0]->MessageName;
               return $this->sendResponse($data[0], $message);
            }else if(isset($data[0]->Success)&& ($data[0]->Success == false || $data[0]->Success ===0)){
                $message =$data[0]->MessageName; 
                return $this->sendError($message);
            }
            return $this->sendResponse($data, $message);
            
        }catch(\ Exception $e){
            return $this->sendError($e->getMessage());
        }
    }
    public function CanScoreCheckingForCausal(Request $request,$ProjectID,$ProcessLevel1ID,$VersionId,$ProjectVersionId){
        try{
            $params = array(             
                $ProjectID,
                $ProcessLevel1ID,
                $VersionId,
                $ProjectVersionId,
                $this->user_data['UserID']
             );
             $data = DB::select('EXEC uspCanScoreCheckingForCausal  ?,?,?,?,?',$params);
           
           $sorted_data = array();
           if($data){
            foreach($data as $k => $value){
                $sorted_data['CanScore'] = $value->Canscore;
            }
            $message = "Can Score retrieved successfully";
        } else{
           // $sorted_data = (Object)[];
            $message = 'data not found';
        }
        return $this->sendResponse($sorted_data, $message);
    }catch(\Exception $e){
        return $this->sendError($e->getMessage());
    }
    } 



    

}   