import {GET_FPM_MERGE, GET_CAUSAL_DATA_AND_SCORE,CAN_SCORE_CHECK_CAUSAL,MAKELOADINGTRUE,FETCH_PROJECT_DEPENDENT_DETAILS, FETCH_PROJECTS, COPY_PROJECT, FETCH_FUNCTIONS, FETCH_PHASES, FETCH_PROCESS_DATA, ACTIVITY_BANK, SCORES, GET_ERRORS, FETCH_LINK_PROJECTS, SAVE_FPM_MERGE } from './types';

import {responseMessage} from '../utils/alert';
import { apiAction } from './apiActions';
const config = require('../config');


/* Action: Changed fetchProjects function
By: Syed On: 3/2/2020 */

export const fetchProjects = () => {
    return apiAction({
        url: config.laravelBaseUrl+'get_decomposition_user_projects', 
        onSuccess: setfetchProjects,
        onFailure: () => console.log("Error occured in fetchProjects"),
        label: FETCH_PROJECTS
      });
}
export const fetchDependentDetails = (obj) => {
    console.log("in fetch dependent details");
    return apiAction({
        url: config.laravelBaseUrl+'GetDependentDetailbyDecompositionProcessLevelID/'+obj.projectId+'/'+obj.processId, 
        onSuccess: setfetchDependentDetails,
        onFailure: () => console.log("Error occured in fetchProjects"),
        label: FETCH_PROJECT_DEPENDENT_DETAILS
      });
}

function setfetchDependentDetails(data){
    console.log({data})
    return {
        type: FETCH_PROJECT_DEPENDENT_DETAILS,
		payload: data.data.length?data.data[0].Data:[]
    }
}

export const canScoreCheckCausal = (obj) => {
    console.log("in can score check causal");
    return apiAction({
        url: config.laravelBaseUrl+'CanScoreCheckingForCausal/'+obj.projectId+'/'+obj.processId+'/0/0', 
        onSuccess: setCanScoreCheckCausal,
        onFailure: () => console.log("Error occured in fetchProjects"),
        label: CAN_SCORE_CHECK_CAUSAL
      });
}

function setCanScoreCheckCausal(data){
    console.log({data})
    return {
        type: CAN_SCORE_CHECK_CAUSAL,
		payload: data.data.CanScore
    }
}

export const getFPMMerge = (obj) => {
    console.log("in can getfpmmerge");
    return apiAction({
        url: config.laravelBaseUrl+'GetProcessForFpmMerge/'+obj.projectId1+'/'+obj.projectId2, 
        onSuccess: setGetFPMMerge,
        onFailure: () => console.log("Error occured in getFPMMerge"),
        label: GET_FPM_MERGE,
        callback:'getfpm'
      });
}

function setGetFPMMerge(data){
    console.log(data.data)
    return {
        type: GET_FPM_MERGE,
		payload: data.data
    }
}

export const saveFPMMerge = (projectObj) => {
    return apiAction({
		url: config.laravelBaseUrl+'SaveFpmMerge', 
		method: "POST",
        data: projectObj, 
        onSuccess: setSaveFPMMerge,
        onFailure: () => console.log("Error occured in saveFPMMerge"),
        label: SAVE_FPM_MERGE,
        callback:'savefpm'
      });
}

function setSaveFPMMerge(data){
    console.log({data})
    return {
        type: SAVE_FPM_MERGE,
		payload: data.data
    }
}

export const getCausalDataAndScore = (obj) => {
    console.log("in getCausalDataAndScore");
    return apiAction({
        url: config.laravelBaseUrl+'GetCausalDataAndScore/'+obj.projectId+'/'+obj.processId, 
        onSuccess: setGetCausalDataAndScore,
        onFailure: () => console.log("Error occured in fetchProjects"),
        label: GET_CAUSAL_DATA_AND_SCORE
      });
}

function setGetCausalDataAndScore(data){
    return {
        type: GET_CAUSAL_DATA_AND_SCORE,
		payload: data.data
    }
}


function setfetchProjects(data){
    console.log({data})
    return {
        type: FETCH_PROJECTS,
		payload: data.data
    }
}

export const fetchLinkProjects=()=>{
    return apiAction({
        url: config.laravelBaseUrl+'GetAllCapabilityModelProjectLinkageWithAmpProjectName', 
        onSuccess: setfetchLinkProjects,
        onFailure: () => console.log("Error occured in fetchProjects"),
        label: FETCH_LINK_PROJECTS
      });
}

function setfetchLinkProjects(data){
    return {
        type: FETCH_LINK_PROJECTS,
		payload: data.data
    }
}



/* Action: Changed fetchFunctions function
By: Syed On: 3/2/2020 */

export const fetchFunctions = (projectId,version) => {
    if(version == ''){
        version = 0;
    }
    return apiAction({
        url: config.laravelBaseUrl+'get_decomposition_function_project/'+projectId+"/"+version, 
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

/* Action: Changed fetchProcessData function
By: Syed On: 3/2/2020 */

export const fetchProcessData = (projectId,version) => {
    if(version == ''){
        version = 0;
    }
    return apiAction({
        url: config.laravelBaseUrl+'get_decomposition_level_one_activities/'+projectId+'/'+version, 
        onSuccess: setfetchProcessData,
        onFailure: () => console.log("Error occured in fetchProcessData"),
        label: FETCH_PROCESS_DATA
      });
}

function setfetchProcessData(processes){
    return {
        type: FETCH_PROCESS_DATA,
		payload: processes
    }
}

/* Action: Changed copyProjectData function
By: Syed On: 3/2/2020 */

export const copyProjectData = (projectObj) => {
    return apiAction({
		url: config.laravelBaseUrl+'decomposition_duplicate_projects', 
		method: "POST",
        data: projectObj, 
        onSuccess: setcopyProjectData,
        onFailure: () => console.log("Error occured in copyProjectData"),
        label: COPY_PROJECT
      });
}

function setcopyProjectData(res){
	responseMessage("success",res.data.message,"");
    return {
        type: COPY_PROJECT,
		payload: res
    }
}
export const makeloadingTrue= () => dispatch => {
	dispatch({
		type: MAKELOADINGTRUE,
		payload: true
	})
}

/* Action: Changed fetchHeatmapData function
By: Syed On: 3/2/2020 */

export const fetchHeatmapData = (projectId,versionId) => {
    return apiAction({
        url: config.laravelBaseUrl+'get_process_level_one_heatmap/'+projectId+'/'+versionId, 
        onSuccess: setfetchHeatmapData,
        onFailure: () => console.log("Error occured in fetchHeatmapData"),
        label: FETCH_PROCESS_DATA
      });
}

function setfetchHeatmapData(processes){
    return {
        type: FETCH_PROCESS_DATA,
		payload: processes
    }
}




/* Action: Changed fetchActivityBank function
By: Syed On: 3/2/2020 */

export const fetchActivityBank = (projectId,version) => {
        if(version == '' || version == undefined){
            version = 0;
        }
    return apiAction({
        url: config.laravelBaseUrl+'get_decomposition_activity_bank/'+projectId+'/'+version, 
        onSuccess: setfetchActivityBank,
        onFailure: () => console.log("Error occured in fetchActivityBank"),
        label: ACTIVITY_BANK
      });
}

function setfetchActivityBank(processes){
    return {
        type: ACTIVITY_BANK,
		payload: processes
    }
}

export const removeProcess = (processId) => {
    return apiAction({
        url: config.laravelBaseUrl+'deleteProcess/'+processId, 
        method: "DELETE",
        onSuccess: null,
        onFailure: () => console.log("Error occured in remove process")
    });
}




/* Action: Changed fetchPhases function
By: Syed On: 3/2/2020 */

export const fetchPhases = (projectId,version) => {
    if(version == ''){
        version = 0;
    }
    return apiAction({
        url: config.laravelBaseUrl+'get_decomposition_phase_project/'+projectId+'/'+version, 
        onSuccess: setfetchPhases,
        onFailure: () => console.log("Error occured in fetchPhases"),
        label: FETCH_PHASES
      });
}

function setfetchPhases(processes){
    return {
        type: FETCH_PHASES,
		payload: processes.data
    }
}

/* Action: Changed fetchScores function
By: Syed On: 3/2/2020 */

export const fetchScores = (projectId,version) => {
    if(version == ''){
        version = 0;
    }
    return apiAction({
        url: config.laravelBaseUrl+'get_decomposition_activity_status_summary/'+projectId+'/'+version, 
        onSuccess: setfetchScores,
        onFailure: () => console.log("Error occured in fetchScores"),
        label: SCORES
      });
}

function setfetchScores(scores){
    return {
        type: SCORES,
		payload: scores.data
    }
}
