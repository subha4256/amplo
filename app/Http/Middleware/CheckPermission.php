<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class CheckPermission extends BaseMiddleware{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate()->toArray(); 
                      
        }
        catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return response()->json(['success' => false,'message' => 'Token is Invalid'],401);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return response()->json(['success' => false,'message' => 'Token is Expired'],401);
            }else{
                return response()->json(['success' => false,'message' => 'Authorization Token not found'],401);
            }
        }  
        //print_r($user); 
        //print_r($user);
        if($user['UserTypeID'] == 1){
            return response()->json(['success' => false,'message' => 'Access Forbidden'],401);
        }else{
            return $next($request);
        }  
    }
}
