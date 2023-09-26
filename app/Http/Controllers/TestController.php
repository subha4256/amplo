<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Mail;
class TestController extends Controller
{
    //
    public function getAflyScores( Request $request,$region, $type ){
        try{
            echo $region." ".$type."\n";
            $message = "The Industry Leader in World University Rankings is Massachusetts Institute of Technology with AFly score of 4.62";
            echo $message;die;
        }catch(\Exception $e){
            echo $e->getMessage();
        }
    }
    public function postAflyScores(request $request){
        $requestData = $request->all();
        echo $requestData['region']." ".$requestData['subject']."\n";
        $message = "The Industry Leader in World University Rankings is Massachusetts Institute of Technology with AFly score of 4.62";
        echo $message;
        die;
    }
    public function aflyScores(){
        $data = array();
        return view('aflyScores',['data'=>$data]);
    }
    public function aflyScoresPost(request $request){
        $requestData = $request->all();
        //echo $requestData['region']." ".$requestData['subject'];die;
        return view('aflyScores',['data'=>$requestData]);
    }
}
