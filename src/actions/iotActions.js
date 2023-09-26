import { FETCH_IOT, FETCH_RATINGS, TOGGLE_LOCK } from './types';
import { apiAction } from './apiActions';
import {responseMessage} from '../utils/alert';
const config = require('../config');


/* Action: Changed fetchIot function
By: Syed On: 3/3/2020 */

export const fetchIot = () => {
    return apiAction({
        url: config.laravelBaseUrl+'get_benchmark', 
        onSuccess: setfetchIot,
        onFailure: () => console.log("Error occured in fetchIot"),
        label: FETCH_IOT
      });
}

function setfetchIot(data){
    return {
        type: FETCH_IOT,
		payload: data.data
    }
}

/* Action: Changed fetchRatings function
By: Syed On: 3/3/2020 */

export const fetchRatings = (project_id) => {
    return apiAction({
        url: config.laravelBaseUrl+'get_benchmark_level/'+project_id, 
        onSuccess: setfetchRatings,
        onFailure: () => console.log("Error occured in fetchRatings"),
        label: FETCH_RATINGS
      });
}

function setfetchRatings(data){
    return {
        type: FETCH_RATINGS,
		payload: data.data
    }
}


/* Action: Changed getLock function
By: Syed On: 3/3/2020 */

export const getLock = (project_id) => {
    return apiAction({
        url: config.laravelBaseUrl+'get_benchmark_report_status/'+project_id, 
        onSuccess: setgetLock,
        onFailure: () => console.log("Error occured in getLock"),
        label: TOGGLE_LOCK
      });
}

function setgetLock(data){
	//responseMessage("success",data.data.message,"");
    return {
        type: TOGGLE_LOCK,
		payload: data.data
    }
}

/* Action: Changed toggleLock function
By: Syed On: 3/3/2020 */

export const toggleLock = (lockData) => {
    return apiAction({
		url: config.laravelBaseUrl+'update_project_locking_status',
		method: "POST",
        data: lockData, 
        onSuccess: settoggleLock,
        onFailure: () => console.log("Error occured in toggleLock"),
		label: TOGGLE_LOCK
      });
}

function settoggleLock(data){
	responseMessage("success",data.message,"");
    return {
        type: TOGGLE_LOCK,
		payload: data.data
    }
}
