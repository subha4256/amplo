<?php
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Route::group(['prefix' => 'api/v1'], function () {
  
// });
Route::get('/', function () {
//    try {
//       $resp=DB::table('Amplo.user')->get();
//       echo $resp;
//   } catch (\Exception $e) {
//       die("Could not connect to the database.  Please check your configuration. error:" . $e );
//   }
//echo phpinfo();
      // echo $resp;
    });
Route::get('getAflyScores/{region}/{subject}', 'TestController@getAflyScores');
Route::post('postAflyScores', 'TestController@postAflyScores');
Route::get('aflyScores', 'TestController@aflyScores');
Route::post('aflyScores', 'TestController@aflyScoresPost');
Route::get('/sendKpiAuditNotification','CronJobController@sendKpiAuditNotification');

