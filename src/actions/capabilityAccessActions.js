import { FETCH_PROJECTS, FETCH_TEMPLATES, FETCH_FUNCTIONS, FETCH_PHASES, FETCH_PROJECT_FUNCTIONS, FETCH_PROJECT_PHASES, GET_ERRORS, PROJECT_USERS, CAPABILITY_USER_PERMISSIONS, EDIT_CLIENT_FUNC_PHASE_TEMP } from './types';
import {responseMessage} from '../utils/alert';
import { apiAction } from './apiActions';
const config = require('../config');
/* Action: Changed fetchProjects function
By: Syed On: 2/28/2020 */

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
		payload: data
    }
}



/* Action: Changed fetchTemplates function
By: Syed On: 2/28/2020 */

export const fetchTemplates = () => {
    return apiAction({
        url: config.laravelBaseUrl + 'getTemplateByClientId', 
        onSuccess: setfetchTemplates,
        onFailure: () => console.log("Error occured in fetchTemplates"),
        label: FETCH_TEMPLATES
      });
}

function setfetchTemplates(data){
    return {
        type: FETCH_TEMPLATES,
		payload: data
    }
}



/* Action: Changed fetchFunctions function
By: Syed On: 2/28/2020 */

export const fetchFunctions = (templateId) => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_decomposition_function/'+templateId, 
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



/* Action: Changed fetchProjectFunctions function
By: Syed On: 2/28/2020 */

export const fetchProjectFunctions = (obj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'getDecompositionProjectFunction/'+obj.projectId+'/'+obj.templateId , 
        onSuccess: setfetchProjectFunctions,
        onFailure: () => console.log("Error occured in fetchProjectFunctions"),
        label: FETCH_PROJECT_FUNCTIONS
      });
}

function setfetchProjectFunctions(data){
    return {
        type: FETCH_PROJECT_FUNCTIONS,
		payload: data.data
    }
}

/* Action: Changed fetchPhases function
By: Syed On: 2/28/2020 */

export const fetchPhases = (templateId) => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_decomposition_phase/'+templateId , 
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



/* Action: Changed fetchProjectPhases function
By: Syed On: 2/28/2020 */

export const fetchProjectPhases = (obj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'getDecompositionProjectPhase/'+ obj.projectId+'/'+ obj.templateId, 
        onSuccess: setfetchProjectPhases,
        onFailure: () => console.log("Error occured in fetchProjectPhases"),
        label: FETCH_PROJECT_PHASES
      });
}

function setfetchProjectPhases(data){
    return {
        type: FETCH_PROJECT_PHASES,
		payload: data.data
    }
}


/* Action: Changed fetchProjectUsers function
By: Syed On: 2/28/2020 */

export const fetchProjectUsers = (projectId) => {
    return apiAction({
        url: config.laravelBaseUrl + 'getDecompositionProjectUsers/'+projectId, 
        onSuccess: setfetchProjectUsers,
        onFailure: () => console.log("Error occured in fetchProjectUsers"),
        label: PROJECT_USERS
      });
}

function setfetchProjectUsers(data){
    return {
        type: PROJECT_USERS,
		payload: data
    }
}


/* Action: Changed fetchUserPermissions function
By: Syed On: 2/28/2020 */

export const fetchUserPermissions = (obj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'getDecompositionUserAccess/'+obj.projectId+'/'+obj.userId+'/'+obj.templateId, 
        onSuccess: setfetchUserPermissions,
        onFailure: () => console.log("Error occured in fetchUserPermissions"),
        label: CAPABILITY_USER_PERMISSIONS
      });
}

function setfetchUserPermissions(data){
    return {
        type: CAPABILITY_USER_PERMISSIONS,
		payload: data
    }
}



/* Action: Changed savePermissions function
By: Syed On: 2/28/2020 */

export const savePermissions = (permissionObj) => {
    return apiAction({
		url: config.laravelBaseUrl + 'saveDecompositionProjectUsersAccess',
		method: "POST",
        data: permissionObj, 
        onSuccess: setsavePermissions,
        onFailure: () => console.log("Error occured in savePermissions"),
        label: "SAVE_CAPABILITY_USER_PERMISSIONS"
      });
}

function setsavePermissions(data){
	responseMessage("success", data.data.message, "");
	return {
        type: "SAVE_CAPABILITY_USER_PERMISSIONS",
		payload: data.data
    }
}

export const editClientFunctionPhaseTemplate = (payload) => {
    return apiAction({
		url: config.laravelBaseUrl + 'editClientFunctionPhaseDecompositionProject',
		method: "POST",
        data: payload, 
        onSuccess: setEditClientFunctionPhaseTemplate,
        onFailure: () => console.log("Error occured in edit function phase template"),
        label: "EDIT_CLIENT_FUNC_PHASE_TEMP"
      });
}

function setEditClientFunctionPhaseTemplate(data){
	responseMessage("success", data.data.message, "");
	return {
        type: "EDIT_CLIENT_FUNC_PHASE_TEMP",
		payload: data.data
    }
}

export const savePermissions1 = (permissionObj) => {
    return apiAction({
		url: config.laravelBaseUrl + 'saveDecompositionProjectUsersAccess',
		method: "POST",
        data: permissionObj, 
        onSuccess: setsavePermissions1,
        onFailure: () => console.log("Error occured in savePermissions"),
        label: "SAVE_CAPABILITY_USER_PERMISSIONS"
      });
}

function setsavePermissions1(data){
	return {
        type: "SAVE_CAPABILITY_USER_PERMISSIONS",
		payload: data.data
    }
}
