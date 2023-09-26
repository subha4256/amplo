import { FETCH_TEAM_USER, SAVE_TEAM_USER, GET_ACCESS_TYPE, GET_ERRORS, UPDATE_USER, GET_INDIVIDUAL_USER } from './types';

import { apiAction } from './apiActions';
import {responseMessage} from '../utils/alert';
const config = require('../config');

/* Action: Changed saveReportsAccess function
By: Syed On: 3/12/2020 */
export const getIndividualUser = (userObj) => {
	return apiAction({
	 url: config.laravelBaseUrl + "getEnterpriseUser",
	 method: "POST",
	 data: userObj,
	 onSuccess: setgetIndividualUser,
	 onFailure: () => console.log("Error occured getIndividualUser"),
	 label: GET_INDIVIDUAL_USER
   });
}
 
function setgetIndividualUser(data) {
   console.log(data);
   return {
	 type: GET_INDIVIDUAL_USER,
	 payload: data
   };
}


/* Action: Changed updateTeamUser function
By: Syed On: 3/12/2020 */
export const updateTeamUser = (userObj) => {
	return apiAction({
	 url: config.laravelBaseUrl + "update_enterprise_team",
	 method: "POST",
	 data: userObj,
	 onSuccess: setupdateTeamUser,
	 onFailure: () => console.log("Error occured updateTeamUser"),
	 callback:'updateTeamUser',
	 label: UPDATE_USER
   });
}
 
function setupdateTeamUser(data) {
	let $status ="success";
	if(data.data.Success==0){
        $status ="error";
     }
	responseMessage($status, data.message, "");
    return {
	 type: UPDATE_USER,
	 payload: data
   };
}


/* Action: Changed saveTeamUser function
By: Syed On: 3/12/2020 */
export const saveTeamUser = (userObj) => {
	return apiAction({
	 url: config.laravelBaseUrl + "update_enterprise_team",
	 method: "POST",
	 data: userObj,
	 onSuccess: setsaveTeamUser,
	 onFailure: () => console.log("Error occured saveTeamUser"),
	 callback:'saveTeamUser',
	 label: SAVE_TEAM_USER
   });
}
 
function setsaveTeamUser(data) {
	responseMessage("success", data.message, "");
   return {
	 type: SAVE_TEAM_USER,
	 payload: data
   };
}


/* Action: Changed fetchTeamUser function
By: Syed On: 3/12/2020 */
export const fetchTeamUser = () => {
	return apiAction({
	 url: config.laravelBaseUrl + "get_enterprise_team",
	 onSuccess: setfetchTeamUser,
	 callback : 'fetchTeamUser',
	 onFailure: () => console.log("Error occured fetchTeamUser"),
	 label: FETCH_TEAM_USER
   });
}
 
function setfetchTeamUser(data) {
   return {
	 type: FETCH_TEAM_USER,
	 payload: data.data
   };
}



/* Action: Changed getAccessType function
By: Syed On: 3/12/2020 */
export const getAccessType = () => {
	return apiAction({
	 url: config.laravelBaseUrl + "get_enterprise_user",
	 onSuccess: setgetAccessType,
	 onFailure: () => console.log("Error occured getAccessType"),
	 label: GET_ACCESS_TYPE
   });
}
 
function setgetAccessType(data) {
   return {
	 type: GET_ACCESS_TYPE,
	 payload: data.data
   };
}




