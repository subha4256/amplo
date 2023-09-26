<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Http\Controllers\Api\BaseController as BaseController;
use App\Models\Industry;
use DB;
use Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class CompanyProfileController extends BaseController
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
        //$this->middleware('log', ['only' => ['fooAction', 'barAction']]);
        //$this->middleware('subscribed', ['except' => ['fooAction', 'barAction']]);
    }
    /*
        Author : Amit
        Date   : 18/09/2019
        Name   : getIndustry
        Params : None
        Type   : GET
        Purpose: To get industries
    */
    public function getIndustry(){
    	try{
    		//$data = Industry::getIndustryData();
            $data = DB::select(' EXEC Amplo.uspGetIndustry');
        		if(count($data) > 0){
                    $message = "Industries data retrieved.";
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
        Name   : getCountries
        Params : None
        Type   : GET
        Purpose: To get countries
    */
     public function getCountries(){
        try{
            $data = DB::select(' EXEC Amplo.uspGetCountry');
            $response = [];
                if(count($data) > 0){
                    /*foreach($data as $v => $country){
                        $response[] = $country;
                    }*/
                    $message = "countries data retrieved.";
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
        Name   : getCompanyProfile
        Params : @id
        Type   : GET
        Purpose: To get countries
    */
     public function getCompanyProfile(){
        try{
            $id = $this->user_data['UserID'];
            $data = DB::select(' EXEC Amplo.uspRetrieveCompanyProfile ?',[$id]);
            //print_r($data);
            $response = [];
                if(count($data) > 0){
                    foreach($data as $k => $value){
                        $record['industry_vertical'] = $value->IndustryVerticalID;
                        $record['industry_subvertical'] = $value->IndustrySubVerticalID;
                        $record['employees'] = $value->NoOfEmployees;
                        $record['region'] = $value->CountryRegionCodeID;
                        $record['country'] = $value->Country;
                        $record['state'] = $value->StateTerritory;
                        $record['city'] = $value->City;
                        $record['pincode'] = $value->PostalCode;
                        $record['address1'] = $value->Address1;
                        $record['address2'] = $value->Address2;
                        $record['CompanyLogo'] = $value->CompanyLogo;
                        $record['profile_questions'][$k]['question_id'] = $value->questionID;
                        $record['profile_questions'][$k]['question'] = $value->question;
                        $record['profile_questions'][$k]['answer_id'] = $value->answerID;
                        $record['profile_questions'][$k]['answer'] = $value->answer;
                        $response = $record;
                    }
                    $message = "company data retrieved.";
                }else{
                    $response = (Object)[];
                    $message = "No data found";
                }
            return $this->sendResponse($response, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    } 
    /*
        Author : Amit
        Date   : 21/09/2019
        Name   : updateCompanyProfile
        Params : @id
        Type   : GET
        Purpose: To update company profile
    */
    public function updateCompanyProfile(Request $request){
        try{
            $validator = Validator::make($request->all(), [
                'industry_vertical' => 'required|numeric',
                'industry_subvertical' => 'required|numeric',
                'employees' => 'required|numeric',
                'region' => 'required|numeric',
                'country' => 'required',
                'state' => 'required',
                'city' => 'required',
                'pincode' => 'required',
                'profile_questions' => 'required'
            ]);


            if ($validator->fails()) {
                return $this->sendError('Validation Errors',$validator->errors());
            }

            $userId              = $this->user_data['UserID'];
            $industryVertical    = $request->input('industry_vertical');
            $industrySubVertical = $request->input('industry_subvertical');
            $employees           = $request->input('employees');
            $country             = $request->input('country');
            $region              = $request->input('region');
            $state               = $request->input('state');
            $city                = $request->input('city');
            $pincode             = $request->input('pincode');
            $address1            = $request->input('address1');
            if($request->input('address2') == 'undefined'){
                $address2 = "";
            }else{
                $address2            = $request->input('address2');
            }            
            //$clientID            = 0;
            //$clientName          = "";
            //$company_profile_id  = 0;
            
            $img_name = "";
            if($request->hasFile('CompanyLogo')){
                $image = $request->file('CompanyLogo');
                $img_name = time().'.'.$image->getClientOriginalExtension();
                $destinationPath = public_path('/images');
                $image->move($destinationPath, $img_name);
            }else{
                if($request->deletePhoto == false){
                    $details = DB::select(' EXEC Amplo.uspRetrieveCompanyProfile ?',[$userId]);
                    $img_name = $details[0]->CompanyLogo;
                }
            }
            //print_r(array($userId,$region,$industryVertical,$industrySubVertical,$employees,$country,$state,$city,$pincode,$address1,$address2,$img_name));
            $data = DB::select(' EXEC Amplo.uspUpdateCompanyProfile ?,?,?,?,?,?,?,?,?,?,?,?',array($userId,$region,$industryVertical,$industrySubVertical,$employees,$country,$state,$city,$pincode,$address1,$address2,$img_name));
           
            $profileId = $data[0]->IndustryID;
            if($profileId){
                try{
                    $questions = json_decode($request->input('profile_questions'), true);
                    foreach($questions as $v => $question){
                        DB::select(' EXEC uspUpdateCompanyProfileQuestions ?,?,?,?',array($userId,$profileId,$question['question_id'],$question['answer']));
                    }
                }catch(\Exception $e1){
                    //return $this->sendError($e->getMessage());
                }
                
                
            }else{
                throw new \Exception("Industry Id not found");
            }
            
            return $this->sendResponse($data,'company data updated successfully');
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }

    }   

     /*
        Author : Amit
        Date   : 25/09/2019
        Name   : getIndustryVerticalSubvertical
        Params : None
        Type   : GET
        Purpose: To get industries vertical subvertical
    */
    public function getIndustryVerticalSubvertical(){
        try{
            $data = DB::select(' EXEC Amplo.uspGetIndustryVerticalSubvertical');
            $response_data = array();
                if(count($data) > 0){
                    $response_data = [];
                    foreach($data as $k => $value){
                        $sub_verticals = [];
                        $response_data[$value->IndustryVerticalID]['IndustryVerticalID'] = $value->IndustryVerticalID;
                        $response_data[$value->IndustryVerticalID]['IndustryVerticalName'] = $value->IndustryVerticalName;
                        $sub_verticals['IndustrySubVerticalID'] = $value->IndustrySubVerticalID;
                        $sub_verticals['IndustrySubVerticalName'] = $value->IndustrySubVerticalName;
                        $response_data[$value->IndustryVerticalID]['subverticals'][] = $sub_verticals;
                    }
                    $response_data = array_values($response_data);
                    $message = "Industries data retrieved.";
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
        Date   : 27/09/2019
        Name   : getRegions
        Params : None
        Type   : GET
        Purpose: To get regions
    */
     public function getRegions(){
        try{
            $data = DB::select(' EXEC Amplo.uspGetRegion');
            $response = [];
                if(count($data) > 0){
                    $message = "region data retrieved.";
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
        Date   : 27/09/2019
        Name   : getStates
        Params : None
        Type   : GET
        Purpose: To get states
    */
     public function getStates(Request $request,$country_code){
        try{

            $data = DB::select(' EXEC Amplo.uspGetState ?',array($country_code));
            $response = [];
                if(count($data) > 0){
                    $message = "state data retrieved.";
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
        Date   : 27/09/2019
        Name   : getCities
        Params : None
        Type   : GET
        Purpose: To get cities
    */
     public function getCities(Request $request,$state_code){
        try{
            $data = DB::select(' EXEC Amplo.uspGetCity ?',array($state_code));
            $response = [];
                if(count($data) > 0){
                    $message = "cities data retrieved.";
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
        Date   : 27/09/2019
        Name   : getProfilingQuestion
        Params : None
        Type   : GET
        Purpose: To profiling question
    */
     public function getProfileQuestion(){
        try{
            $data = DB::select(' EXEC uspGetCompanyProfileQuestions');
            $response = [];
                if(count($data) > 0){
                    $message = "cities data retrieved.";
                }else{
                    $message = "No data found";
                }
            return $this->sendResponse($data, $message);
        }catch(\Exception $e){
            return $this->sendError($e->getMessage());
        }
    }     
}
