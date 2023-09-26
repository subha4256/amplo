import { FETCH_SERVICES, RESET_PASSWORD, FETCH_FUNCTIONAL_GRID_DATA,EMPTY_MODULE, SELECTED_MODULE, SELECTED_MODULE_PARAMETER, GET_ERRORS } from './types';

import CacheStorage from '../utils/CacheStorage';
import { apiAction } from './apiActions';
const config = require('../config');




/* Action: Changed fetchServices function
By: Syed On: 3/12/2020 */
export const fetchServices = (serviceId) => {
	return apiAction({
	 url: config.laravelBaseUrl + "get_service/"+serviceId,
	 onSuccess: setfetchServices,
	 onFailure: () => console.log("Error occured fetchServices"),
	 label: FETCH_SERVICES
   });
}
 
function setfetchServices(data) {
   return {
	 type: FETCH_SERVICES,
	 payload: data
   };
}
export const emptyModules = ()=>{
	return dispatch =>{
		dispatch({type:EMPTY_MODULE,payload:[]})
	}
}
export const moduleService = (id) => {
	return apiAction({
	 url: config.laravelBaseUrl + "get_service/"+id,
	 onSuccess: setmoduleService,
	 onFailure: () => console.log("Error occured moduleService"),
	 callback:'moduleService',
	 label: SELECTED_MODULE
   });
}
  
function setmoduleService(data) {
	console.log(data);
   return {
	 type: SELECTED_MODULE,
	 payload: data.data
   };
}

export const moduleParameter = (id) => {
	return apiAction({
	 url: config.laravelBaseUrl + "get_report/"+id,
	 onSuccess: setmoduleParameter,
	 onFailure: () => console.log("Error occured moduleParameter"),
	 label: SELECTED_MODULE_PARAMETER
   });
}
 
function setmoduleParameter(data) {
   return {
	 type: SELECTED_MODULE_PARAMETER,
	 payload: data.data
   };
}


//.. Review by Ashim : Need to change LoadAPI>action

export const fetchFunctionalGrid = (gridData) => dispatch => {
	if(gridData.status === 200) {
		dispatch({
			type: FETCH_FUNCTIONAL_GRID_DATA,
			payload: gridData.data
		})
	}else{
		dispatch({
			type: GET_ERRORS,
			payload: gridData.data.data
		})
	}
};

export const resetPassword = (passObj) => {
	return apiAction({
	 url: config.laravelBaseUrl + "reset-password",
	 method:"POST",
	 data:passObj,
	 onSuccess: setresetPassword,
	 onFailure: () => console.log("Error occured resetPassword"),
	 label: RESET_PASSWORD
   });
}
 
function setresetPassword(data) {
   return {
	 type: RESET_PASSWORD,
	 payload: data.data
   };
}
