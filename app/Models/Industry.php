<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class Industry extends Model
{
    // get industry details
    static function getIndustryData(){
        return DB::select(' EXEC Amplo.uspGetIndustry');
    }
}
