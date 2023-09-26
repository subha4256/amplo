import { SAVE_DECOMPOSITION, FETCH_CUSTOM_SCORING_MECHANISMS, FETCH_SCORING_MECHANISMS, NEW_MECHANISM, PROCESSES, CONNECTED_PROCESSES, CAPABILITY_VERSION , GET_ERRORS } from './types';

import { apiAction } from './apiActions';
import {responseMessage} from '../utils/alert';
const config = require('../config');


/* Action: Changed fetchCustomScoringMechanisms function
By: Syed On: 3/2/2020 */

export const fetchCustomScoringMechanisms = (options) => {
    return apiAction({
        url: config.laravelBaseUrl+'get_decomposition_scoring_custom_criteria/'+options.projectId+'/'+options.processId+'/'+options.version, 
        onSuccess: setfetchCustomScoringMechanisms,
        onFailure: () => console.log("Error occured in fetchCustomScoringMechanisms"),
        label: FETCH_CUSTOM_SCORING_MECHANISMS
      });
}

function setfetchCustomScoringMechanisms(data){
    return {
        type: FETCH_CUSTOM_SCORING_MECHANISMS,
		payload: data
    }
} 

/* Action: Changed fetchScoringMechanisms function
By: Syed On: 3/2/2020 */

export const fetchScoringMechanisms = (options) => {
    return apiAction({
        url: config.laravelBaseUrl+'get_decomposition_scoring_criteria/'+options.projectId+'/'+options.processId+'/'+options.version, 
        onSuccess: setfetchScoringMechanisms,
        onFailure: () => console.log("Error occured in fetchScoringMechanisms"),
        label: FETCH_SCORING_MECHANISMS
      });
}

function setfetchScoringMechanisms(data){
    return {
        type: FETCH_SCORING_MECHANISMS,
		payload: data.data
    }
} 


/* Action: Changed fetchConnectedProcesses function
By: Syed On: 3/2/2020 */

export const fetchConnectedProcesses = (options) => {
    return apiAction({
        url: config.laravelBaseUrl+'get_decomposition_process_level_one_connected/'+options.projectId+'/'+options.processId+'/'+options.functionId+'/'+options.phaseId+'/'+options.version, 
        onSuccess: setfetchConnectedProcesses,
        onFailure: () => console.log("Error occured in fetchConnectedProcesses"),
        label: CONNECTED_PROCESSES
      });
}

function setfetchConnectedProcesses(data){
    return {
        type: CONNECTED_PROCESSES,
		payload: data.data
    }
} 


/* Action: Changed fetchProcessData function
By: Syed On: 3/2/2020 */

export const fetchProcessData = (options) => {
    options.version = options.version ? options.version : 0;
    return apiAction({
        url: config.laravelBaseUrl+'get_decomposition_tree_view/'+options.projectId+'/'+options.processId+'/'+options.version+'/0', 
        onSuccess: setfetchProcessData,
        onFailure: () => console.log("Error occured in fetchProcessData"),
        label: PROCESSES
      });
}

function setfetchProcessData(data){
    return {
        type: PROCESSES,
		payload: data.data
    }
}

/* Action: Changed fetchHeatmapProcessData function
By: Syed On: 3/2/2020 */

export const fetchHeatmapProcessData = (options) => {
    options.version = options.version ? options.version : 0;
    return apiAction({
        url: config.laravelBaseUrl+'get_decomposition_tree_view_heatmap/'+options.projectId+'/'+options.processId+'/'+options.version+'/0', 
        onSuccess: setfetchHeatmapProcessData,
        onFailure: () => console.log("Error occured in fetchHeatmapProcessData"),
        label: PROCESSES
      });
}

function setfetchHeatmapProcessData(data){
    return {
        type: PROCESSES,
		payload: data.data
    }
}

/* Action: Changed updateScoringMechanism function
By: Syed On: 3/2/2020 */

export const updateScoringMechanism = (mechanismObj) => {
    return apiAction({
		url: config.laravelBaseUrl+'update_decomposition_scoring_criteria', 
		method: "POST",
        data: mechanismObj, 
        onSuccess: setupdateScoringMechanism,
        onFailure: () => console.log("Error occured in updateScoringMechanism"),
        label: NEW_MECHANISM
      });
}

function setupdateScoringMechanism(res){
	responseMessage("success",res.message,"");
    return {
        type: NEW_MECHANISM,
		payload: res.data
    }
}

/* Action: Changed saveDecompositionData function
By: Syed On: 3/2/2020 */

export const saveDecompositionData = (cmObj) => {
    return apiAction({
		url: config.laravelBaseUrl+'update_decomposition_levels_data', 
		method: "POST",
        data: cmObj, 
        onSuccess: setsaveDecompositionData,
        onFailure: () => console.log("Error occured in saveDecompositionData"),
        label: SAVE_DECOMPOSITION
      });
}

function setsaveDecompositionData(res){
	responseMessage("success",res.message,"");
    return {
        type: SAVE_DECOMPOSITION,
		payload: res
    }
}

export const startLoader = () => dispatch => {
    dispatch({
        type : "API_START_LOADER",
        payload : []
    })
}
export const stopLoader = () => dispatch => {
    dispatch({
        type : "API_STOP_LOADER",
        payload : []
    })
}

export const capabilityVersionUpgrade = (cmObj) => {
    return apiAction({
		url: config.laravelBaseUrl+'decompositionLockUnlock', 
		method: "POST",
        data: cmObj, 
        onSuccess: setcapabilityVersionUpgrade,
        onFailure: () => console.log("Error occured in Upgrading Capability Version"),
        label: CAPABILITY_VERSION
      });
}

function setcapabilityVersionUpgrade(res){
    console.log(res)
    // return {
    //     type: CAPABILITY_VERSION,
	// 	payload: res
    // }
}
