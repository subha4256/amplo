import {FETCH_DASHBOARD_WIDGETS} from './types';
import {apiAction} from './apiActions';
const config = require('../config')
export const fetchDashboardWidgets = (id) => {
	return apiAction({
        url: config.laravelBaseUrl + 'getDashboardReport/'+id, 
        onSuccess: setDashboardWidgets,
        onFailure: () => console.log("Error occured in fetchDesignThinkingProjects "),
        label: FETCH_DASHBOARD_WIDGETS,
      });
};

function setDashboardWidgets(data){
    
    return {
        type: FETCH_DASHBOARD_WIDGETS,
        payload: data.data
    }
}
export const saveDashboardAccess = (obj) => {
	return apiAction({
        url: config.laravelBaseUrl + 'saveDashboardReportAccess', 
        onSuccess: setsaveDashboardAccess,
        
        method : "POST",
        data : obj,
        onSuccess : setsaveDashboardAccess,
        onFailure: () => console.log("Error occured in saveFilterPreference"),
        label: 'SAVE_DASHBOARD_ACCESS'
      });
};

function setsaveDashboardAccess(data){
    return{
        type:'SAVE_DASHBOARD_ACCESS',
        payload:data.data
    }
}
export const saveFpmDashboards = (obj) => {
	return apiAction({
        url: config.laravelBaseUrl + 'saveFPMComparision', 
        onSuccess: setsaveFpmDashboards,
        
        method : "POST",
        data : obj,
        onSuccess : setsaveFpmDashboards,
        onFailure: () => console.log("Error occured in saveFilterPreference"),
        label: 'SAVE_FPM_COMPARISON_DASHBOARD' 
      });
};

function setsaveFpmDashboards(data){
    return{
        type:'SAVE_FPM_COMPARISON_DASHBOARD',
        payload:data.data
    }
}
// GET_FPM_COMPARISON_DASHBOARD
export const getFpmDashboards = (obj) => {
	return apiAction({
        url: config.laravelBaseUrl + 'getFPMList', 
        
        method : "GET",
        data : obj,
        onSuccess : setgetFpmDashboards,
        onFailure: () => console.log("Error occured in saveFilterPreference"),
        label: 'GET_FPM_COMPARISON_DASHBOARD'
      });
};

function setgetFpmDashboards(data){
    return{
        type:'GET_FPM_COMPARISON_DASHBOARD',
        payload:data.data
    }
}
export const resetSaveValue= ()=>dispatch=>{
dispatch({
    type:'RESET_SAVE_FPM_VALUE',
    data:null
})
}