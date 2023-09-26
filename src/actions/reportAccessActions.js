import { FETCH_USERS, FETCH_REPORTS, GET_ERRORS } from './types';
import { apiAction } from './apiActions';


import {responseMessage} from '../utils/alert';
const config = require('../config');

export const fetchUsers = () => {
	return apiAction({
	 url: config.laravelBaseUrl + "client-users",
	 onSuccess: setUsers,
	 onFailure: () => console.log("Error occured fetchUsers"),
	 label: FETCH_USERS
   });
}
 
function setUsers(data) {
   console.log(data);
   return {
	 type: FETCH_USERS,
	 payload: data
   };
}

export const fetchReports = (userId) => {
	return apiAction({
	 url: config.laravelBaseUrl + "getReportsAccess/"+userId,
	 onSuccess: setReports,
	 onFailure: () => console.log("Error occured fetchReports"),
	 label: FETCH_REPORTS
   });
}
 
function setReports(data) {
   return {
	 type: FETCH_REPORTS,
	 payload: data
   };
}

/* Action: Changed saveReportsAccess function
By: Syed On: 3/12/2020 */

export const saveReportsAccess = (permissionObj) => {
    return apiAction({
        url: config.laravelBaseUrl + "saveReportAccess" , 
        method: "POST",
        data: permissionObj,
        onSuccess: setsaveReportsAccess,
        onFailure: () => console.log("Error occured in saveReportsAccess"),
        label: "SAVE_REPORT_ACCESS"
      });
}

function setsaveReportsAccess(data){
    responseMessage("success", data.message, "");
    return {
        type: "SAVE_REPORT_ACCESS",
        payload: data.data
    }
}
