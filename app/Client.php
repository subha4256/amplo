<?php

namespace App;
use Illuminate\Database\Eloquent\Model;
use DB;
//test

class Client extends Model
{
    protected $table = 'Amplo.Client';
    protected $primaryKey = 'ClientId';
}
