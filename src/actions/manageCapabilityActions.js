import { NEW_ACTIVITY_LOCATION, FETCH_PROJECTS, FETCH_FUNCTIONS, FETCH_PHASES, FETCH_PROCESS_DATA, ACTIVITY_BANK, NEW_ACTIVITY, SCORES, GET_ERRORS } from './types';

import CacheStorage from '../utils/CacheStorage';
const config = require('../config');
import { apiAction } from './apiActions';
/* Action: Changed fetchProjects function
By: Syed On: 3/3/2020 */

export const fetchProjects = () => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_decomposition_user_projects', 
        onSuccess: setfetchProjects,
        onFailure: () => console.log("Error occured in fetchProjects"),
        label: FETCH_PROJECTS
      });
}

function setfetchProjects(data){
    return {
        type: FETCH_PROJECTS,
		payload: data.data
    }
}

export const fetchFunctions = (projectId) => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_decomposition_function_project/'+projectId, 
        onSuccess: setfetchFunctions,
        onFailure: () => console.log("Error occured in fetchFunctions"),
        label: FETCH_FUNCTIONS
      });
}

function setfetchFunctions(data){
    return {
        type: FETCH_FUNCTIONS,
		payload: data.data
    }
}

export const fetchProcessData = (projectId) => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_decomposition_level_one_activities/'+projectId, 
        onSuccess: setfetchProcessData,
        onFailure: () => console.log("Error occured in fetchProcessData"),
        label: FETCH_PROCESS_DATA
      });
}

function setfetchProcessData(data){
    return {
        type: FETCH_PROCESS_DATA,
		payload: data.data
    }
}

export const fetchHeatmapData = (projectId) => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_process_level_one_heatmap/'+projectId, 
        onSuccess: setfetchHeatmapData,
        onFailure: () => console.log("Error occured in fetchProcessData"),
        label: FETCH_PROCESS_DATA
      });
}

function setfetchHeatmapData(data){
    return {
        type: FETCH_PROCESS_DATA,
		payload: data.data
    }
}

export const fetchActivityBank = (projectId) => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_decomposition_activity_bank/'+projectId, 
        onSuccess: setfetchActivityBank,
        onFailure: () => console.log("Error occured in fetchActivityBank"),
        label: ACTIVITY_BANK
      });
}

function setfetchActivityBank(data){
    return {
        type: ACTIVITY_BANK,
		payload: data.data
    }
}

export const fetchPhases = (projectId) => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_decomposition_phase_project/'+projectId, 
        onSuccess: setfetchPhases,
        onFailure: () => console.log("Error occured in fetchPhases"),
        label: FETCH_PHASES
      });
}

function setfetchPhases(data){
    return {
        type: FETCH_PHASES,
		payload: data.data
    }
}

export const saveProcessLocation = (processData) => {
    return apiAction({
		url: config.laravelBaseUrl + 'update_decomposition_level_location', 
		method:"POST",
		onSuccess: setsaveProcessLocation,
		data:processData,
        onFailure: () => console.log("Error occured in saveProcessLocation"),
        label: NEW_ACTIVITY_LOCATION
      });
}

function setsaveProcessLocation(data){
    return {
        type: NEW_ACTIVITY_LOCATION,
		payload: data.data
    }
}


export const saveActivity = (activityObj) => {
    return apiAction({
		url: config.laravelBaseUrl + 'add_decomposition_process_level_activities', 
		method:"POST",
		onSuccess: setsaveActivity,
		data:activityObj,
        onFailure: () => console.log("Error occured in saveActivity"),
        label: NEW_ACTIVITY
      });
}

function setsaveActivity(data){
    return {
        type: NEW_ACTIVITY,
		payload: data.data
    }
}



export const fetchScores = (projectId,version) => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_decomposition_activity_status_summary/'+projectId+"/"+version, 
        onSuccess: setfetchScores,
        onFailure: () => console.log("Error occured in fetchScores"),
        label: SCORES
      });
}

function setfetchScores(data){
    return {
        type: SCORES,
		payload: data.data
    }
}
