<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use DB;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class MenuController extends Controller
{   
    public $payload = [];
    public $dbUserName = "";
    public $dbUserPassword = "";
    public function __construct()
    {
        $this->payload = JWTAuth::parseToken()->getPayload(); 
        $this->dbUserName = $this->payload->get('DbUserName');
        $this->dbUserPassword = $this->payload->get('DbUserPassword');
        if($this->dbUserName != '' && $this->dbUserName != null){
            config(['database.connections.sqlsrv.username' => $this->dbUserName]);
            config(['database.connections.sqlsrv.password' => $this->dbUserPassword]);
        }
    }
    public function fetchMenu(Request $request, $menuBlockId)
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
            $user_data=JWTAuth::parseToken()->authenticate()->toArray();
            $userId = $user_data['UserID'];
            
            $requestData = $request->all();
            $resp = DB::select(' EXEC Amplo.uspFetchMenus ?,?', array($userId, $menuBlockId));
            $menuArr = [];
            if (count($resp) > 0) {
                
                $respArray = json_decode(json_encode($resp), true);
                //print_r($respArray);exit;
                foreach ($respArray as $valArr) {
                    if ($valArr['ParentMenuID'] == '') {
                        array_push($menuArr,
                            ['menuId' => $valArr['SubmenuID'],
                                'menuName' => $valArr['Submenu'],
                                'link' => $valArr['Link'],
                                'access' => $valArr['Access'],
                                'subMenu' => [],
                            ]);

                    }
                }
                foreach ($menuArr as $menuKey=>$menuVal) {
                    //echo $menuVal;
                    foreach ($respArray as $respVal) {
                       // print_r($respVal);
                        if ((int)$menuVal['menuId'] == (int)$respVal['ParentMenuID']) {
                            // print_r($respVal);
                            array_push(
                                $menuArr[$menuKey]['subMenu'],
                                [
                                    'menuId' => $respVal['SubmenuID'],
                                    'menuName' => $respVal['Submenu'],
                                    'link' => $respVal['Link'],
                                    'access' => $respVal['Access'],
                                ]);
                        }
                    }
                }
            
                
               

                

            }
            $successResponseData['data'] = $menuArr;
            return response()->json($successResponseData, $successResponseData['MessageCode']);

        } catch (\Exception $e) {
            die("error:" . $e);
        }

    }
}
