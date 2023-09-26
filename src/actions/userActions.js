import { FORGOT_PASSWORD, RESET_PASSWORD, USER_INFO, CHANGE_PASSWORD, RESTRICTED_DOMAINS, GET_ERRORS, USER_ACCESS_TYPES, EMP_REGISTER } from './types';

import { apiAction } from './apiActions';
import {responseMessage} from '../utils/alert';
const config = require('../config');

/* Action: Changed forgotPassword function
By: Syed On: 3/13/2020 */
export const forgotPassword = (emailObj) => {
	return apiAction({
     url: config.laravelBaseUrl + "send_forgot_password",
     method: "POST",
	 data: emailObj,
	 onSuccess: setforgotPassword,
	 onFailure: () => console.log("Error occured forgotPassword"),
	 label: FORGOT_PASSWORD
   });
}
 
function setforgotPassword(data) {
    responseMessage("success", data.message, "");
   return {
	 type: FORGOT_PASSWORD,
	 payload: data.data
   };
}

/* Action: Changed resetPassword function
By: Syed On: 3/13/2020 */
export const resetPassword = (passObj) => {
	return apiAction({
     url: config.laravelBaseUrl + "reset-password",
     method: "POST",
	 data: passObj,
	 onSuccess: setresetPassword,
	 callback : "resetPassword",
	 onFailure: () => console.log("Error occured resetPassword"),
	 label: RESET_PASSWORD
   });
}
 
function setresetPassword(data) {
    responseMessage("success", data.message, "");
   return {
	 type: RESET_PASSWORD,
	 payload: data.data
   };
}

/* Action: Changed changePassword function
By: Syed On: 3/13/2020 */
export const changePassword = (passObj) => {
	return apiAction({
     url: config.laravelBaseUrl + "change-password",
     method: "POST",
	 data: passObj,
	 onSuccess: setchangePassword,
	 onFailure: () => console.log("Error occured changePassword"),
	 label: CHANGE_PASSWORD
   });
}
 
function setchangePassword(data) {
    responseMessage("success", data.message, "");
   return {
	 type: CHANGE_PASSWORD,
	 payload: data.data
   };
}

/* Action: Changed fetchUserInfo function
By: Syed On: 3/13/2020 */
export const fetchUserInfo = (hash) => {
	return apiAction({
	 url: config.laravelBaseUrl + "userDetailFromEmail",
	 method : "GET",
	 data : {
		hash : hash
	 },
	 onSuccess: setfetchUserInfo,
	 onFailure: () => console.log("Error occured fetchUserInfo"),
	 label: USER_INFO
   });
}
 
function setfetchUserInfo(data) {
   return {
	 type: USER_INFO,
	 payload: data.data
   };
}


/* Action: Changed fetchRestrictedDomain function
By: Syed On: 3/13/2020 */
export const fetchRestrictedDomain = () => {
	return apiAction({
     url: config.laravelBaseUrl + "restricted-domain",
	 onSuccess: setfetchRestrictedDomain,
	 onFailure: () => console.log("Error occured fetchRestrictedDomain"),
	 label: RESTRICTED_DOMAINS
   });
}
 
function setfetchRestrictedDomain(data) {
   return {
	 type: RESTRICTED_DOMAINS,
	 payload: data.data
   };
}

/* Action: Changed fetchUserAccessTypes function
By: Syed On: 3/13/2020 */
export const fetchUserAccessTypes = () => {
	return apiAction({
     url: config.laravelBaseUrl + "getUserAccessType",
	 onSuccess: setfetchUserAccessTypes,
	 onFailure: () => console.log("Error occured fetchUserAccessTypes"),
	 label: USER_ACCESS_TYPES
   });
}
 
function setfetchUserAccessTypes(data) {
   return {
	 type: USER_ACCESS_TYPES,
	 payload: data.data
   };
}

/* Action: Changed registerEmployee function
By: Syed On: 3/13/2020 */
export const registerEmployee = (empObj) => {
	return apiAction({
     url: config.laravelBaseUrl + "register-employee",
     method: "POST",
	 data: empObj,
	 onSuccess: setregisterEmployee,
	 onFailure: (err) => console.log(err),
	 label: EMP_REGISTER
   });
}
 
function setregisterEmployee(data) {
   return {
	 type: EMP_REGISTER,
	 payload: data.data
   };
}
