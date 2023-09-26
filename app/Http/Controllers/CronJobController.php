<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CronJobController extends Controller
{
    public function sendKpiAuditNotification(){
        try {
            $obj = new EmailController();
            $response = $obj->sendKPINotificationEmail();
            return $response;
        } catch (\Exception $th) {
            return $th->getMessage();
        }
    }
}
