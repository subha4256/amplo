import {FETCH_BENCHMARK_PROJECTS_WITH_DOMAINS, FETCH_DECOMPOSITION_PROJECTS,
    FETCH_DESIGNTHINKING_PROJECTS, ADD_CONTROLEVER, GET_AUDIT_HISTORY, FETCH_KPIS_SET_UESERS,
    GET_KPI_AUDIT_TYPES, ASSOCIATION_DATA, SAVE_KPI_ASSOCATION, DELETE_RELATED, SAVE_KPI_AUDIT,
     GET_KPI_AUDIT, SAVE_KPIS_PERMISSION, FETCH_KPIS_SET_DETAILS, FETCH_KPIS_ACCESS, 
     FETCH_KPISET_ACCESS, FETCH_KPI_ACCESS_USER, FETCH_KPIS_BSC, FETCH_KPIS_USERS, 
     FETCH_KPIS_SETS, FETCH_KPIS, ADD_KPI, GET_KPI, GET_FREQUENCY, GET_IMPRVBASIS, GET_UOM, 
     GET_UEM, GET_CONTROL_LEVER, UPDATED_LEVER, DELETE_KPI, DELETE_LEVER,GET_AUDIT_NAMES ,
     GET_ERRORS ,FETCH_KPI_SETS_FOR_USER,FETCH_KPI_AUDIT_DATA,SAVE_CO2EMMISIONTYPE_DATA,SAVE_CO2EMMISIONCOUNTRY,SAVE_CALCULATECO2EMMISION } from './types';

import {responseMessage} from '../utils/alert';
import { apiAction } from './apiActions';
import CacheStorage from '../utils/CacheStorage';
const config = require('../config');


export const fetchKpiSets = (projects) => (dispatch) => {
    if(projects.status === 200) {
		dispatch({
			type: FETCH_KPISET_ACCESS,
			payload: projects.data.data
		})
	}else{
		dispatch({
			type: GET_ERRORS,
			payload: projects.data.data
		})
	}
}


export const fetchKpikUsers = (users) => (dispatch) => {
    if(users.status === 200) {
		dispatch({
			type: FETCH_KPI_ACCESS_USER,
			payload: users.data.data
		})
	}else{
		dispatch({
			type: GET_ERRORS,
			payload: users.data.data
		})
	}
}

/* Action: Created fetchKpisAccess function
By: Syed On: 3/13/2020 */
export const fetchKpisAccess = (obj) => {
	return apiAction({
        url: config.laravelBaseUrl + 'get_kpi_user_access/'+ obj.UserId+"/"+obj.SetId, 
        onSuccess: setfetchKpisAccess,
        onFailure: () => console.log("Error occured in fetchKpisAccess"),
        label: FETCH_KPIS_ACCESS
      });
};

function setfetchKpisAccess(data){
    return {
        type: FETCH_KPIS_ACCESS,
		payload: data.data
    }
}

export const saveFilterPreference = (obj) => {
	return apiAction({
        url: config.laravelBaseUrl + 'saveUpdateKpiFilterPreference', 
        onSuccess: setSaveFilterPreference,
        data : obj,
        method : "POST",
        callback : "saveFilterPreference",
        onFailure: () => console.log("Error occured in saveFilterPreference"),
        label: 'SAVE_KPI_FILTER_PREFERENCE'
      });
};

function setSaveFilterPreference(data){
    return {
        type: 'SAVE_KPI_FILTER_PREFERENCE',
		payload: data.data
    }
}

export const getSavedPreferences = () => {
	return apiAction({
        url: config.laravelBaseUrl + 'getSavedKpiFilterPreference/0', 
        onSuccess: setGetSavedPreferences,
        onFailure: () => console.log("Error occured in getSavedPreferences"),
        label: 'GET_SAVED_FILTER_PREFERENCES'
      });
};

function setGetSavedPreferences(data){
    return {
        type: 'GET_SAVED_FILTER_PREFERENCES',
		payload: data.data
    }
}



/* Action: Created saveKpiAccessPermissions function
By: Syed On: 3/13/2020 */

export const saveKpiAccessPermissions = (prmsnobj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'update_kpi_user_access', 
        method:"POST",
        data: prmsnobj,
        onSuccess: setsaveKpiAccessPermissions,
        onFailure: () => console.log("Error occured in saveKpiAccessPermissions"),
        label: SAVE_KPIS_PERMISSION
      });
}

function setsaveKpiAccessPermissions(data){
    responseMessage("success", data.message.MessageName, "");
    return {
        type: SAVE_KPIS_PERMISSION,
		payload: data.data
    }
}
/* Action: Created saveKpiAssocation function
By: Syed On: 3/29/2020 */

export const saveKpiAssocation = (saveobj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'save_kpi_association', 
        method:"POST",
        data: saveobj,
        onSuccess: setsaveKpiAssocation,
        onFailure: () => console.log("Error occured in saveKpiAssocation"),
        label: SAVE_KPI_ASSOCATION
      });
}

function setsaveKpiAssocation(data){
    responseMessage("success", data.message.MessageName, "");
    return {
        type: SAVE_KPI_ASSOCATION,
		payload: data.data
    }
}
/* Action: Created deleteRelated function
By: Syed On: 3/29/2020 */
export const deleteRelated = (dltObj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'delete_kpi_releted', 
        method:"POST",
        data: dltObj,
        onSuccess: setdeleteRelated,
        callback: 'deleteRelated',
        onFailure: () => console.log("Error occured in deleteRelated"),
        label: DELETE_RELATED
      });
}

function setdeleteRelated(data){
    responseMessage("success", data.message.MessageName, "");
    return {
        type: DELETE_RELATED,
		payload: data.data
    }
}

/* Action: Created getKpiAssociation function
By: Syed On: 3/29/2020 */
export const getKpiAssociation = (dltObj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_kpi_association', 
        onSuccess: setgetKpiAssociation,
        onFailure: () => console.log("Error occured in getKpiAssociation"),
        label: ASSOCIATION_DATA
      });
}

function setgetKpiAssociation(data){
    return {
        type: ASSOCIATION_DATA,
		payload: data.data
    }
}

/* Action: Created saveKpiAccessPermissions function
By: Syed On: 3/27/2020 */
export const saveKpiAudit = (saveObj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'save_kpi_audit_logger', 
        method:"POST",
        data: saveObj,
        onSuccess: setsaveKpiAudit,
        onFailure: () => console.log("Error occured in saveKpiAudit"),
        label: SAVE_KPI_AUDIT
      });
}

function setsaveKpiAudit(data){
    responseMessage("success", "Data Saved Successfully", "");
    return {
        type: SAVE_KPI_AUDIT,
		payload: data.data
    }
}

export const getAuditNames = (obj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'kpi_audit_search', 
        method:"POST",
        data: obj,
        onSuccess: setgetAuditNames,
        onFailure: () => console.log("Error occured in getAuditName"),
        label: GET_AUDIT_NAMES
      });
}

function setgetAuditNames(data){
    return {
        type: GET_AUDIT_NAMES,
		payload: data.data
    }
}

/* Action: Created fetchKpiUserList function
By: Syed On: 3/12/2020 */

export const fetchKpiUserList = () => {
    return apiAction({
        url: config.laravelBaseUrl + 'client-users', 
        onSuccess: setfetchKpiUserList,
        onFailure: () => console.log("Error occured in fetchKpiUserList"),
        label: FETCH_KPIS_USERS
      });
}

function setfetchKpiUserList(data){
    return {
        type: FETCH_KPIS_USERS,
		payload: data.data
    }
}

/* Action: Created fetchBcsList function
By: Syed On: 3/13/2020 */

export const fetchBcsList = () => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_bsccategory', 
        onSuccess: setfetchBcsList,
        onFailure: () => console.log("Error occured in fetchBcsList"),
        label: FETCH_KPIS_BSC
      });
}

function setfetchBcsList(data){
    return {
        type: FETCH_KPIS_BSC,
		payload: data.data
    }
}
/* Action: Created GetCo2EmmisionType function
By: Syed On: 3/29/2020 */
export const GetCo2EmmisionType = () => {
    return apiAction({
        url: config.laravelBaseUrl + 'GetCo2EmmisionType', 
        onSuccess: setGetCo2EmmisionType,
        onFailure: () => console.log("Error occured in GetCo2EmmisionType"),
        label: SAVE_CO2EMMISIONTYPE_DATA
      });
}

function setGetCo2EmmisionType(data){
    return {
        type: SAVE_CO2EMMISIONTYPE_DATA,
		payload: data.data    
    }
}
/* Action: Created GetCountryforCo2Emmision function
By: Syed On: 3/29/2020 */
export const GetCountryforCo2Emmision = () => {
    return apiAction({
        url: config.laravelBaseUrl + 'GetCountryforCo2Emmision', 
        onSuccess: setCountryforCo2Emmision,
        onFailure: () => console.log("Error occured in GetCountryforCo2Emmision"),
        label: SAVE_CO2EMMISIONCOUNTRY
      });
}

function setCountryforCo2Emmision(data){
    return {
        type: SAVE_CO2EMMISIONCOUNTRY,
		payload: data.data    
    }
}
/* Action: Created CalculateCO2Emmision function
By: Syed On: 3/29/2020 */
export const CalculateCO2Emmision = (obj) => {
    return apiAction({
        url: config.laravelBaseUrl + `CalculateCO2Emmision/${obj.$UOM}/${obj.$EPA}`,
        method: "GET", 
        onSuccess: saveCalculateCO2Emmision,
        onFailure: () => console.log("Error occured in CalculateCO2Emmision"),
        label: SAVE_CALCULATECO2EMMISION
      });
    }
function saveCalculateCO2Emmision(data){
    console.log(data)
    return {
        type: SAVE_CALCULATECO2EMMISION,
		payload: data.data    
    }
}
/* Action: Created fetchKpiSetList function
By: Syed On: 3/12/2020 */

export const fetchKpiSetList = () => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_kpi_Setlist', 
        onSuccess: setfetchKpiSetList,
        onFailure: () => console.log("Error occured in fetchKpiSetList"),
        label: FETCH_KPIS_SETS
      });
}

function setfetchKpiSetList(data){
    return {
        type: FETCH_KPIS_SETS,
		payload: data.data
    }
}

export const getKpiAuditData = (kpiId,kpiMetricsOutcomeId)=>{
   
    return apiAction({
        url: config.laravelBaseUrl + `getKpiAuditData/${kpiId}/${kpiMetricsOutcomeId}`, 
        onSuccess: setGetKpiAuditData,
        onFailure: () => console.log("Error occured in getAuditData"), 
        label: FETCH_KPI_AUDIT_DATA
      });
}

export const setGetKpiAuditData = (data)=>{
    
    return {
        type: FETCH_KPI_AUDIT_DATA,
		payload: data.data
    }
}
export const fetchKpiSetListForUser = () => {
    return apiAction({
        url: config.laravelBaseUrl + 'getAccessKpiSet', 
        onSuccess: setfetchKpiSetListForUser,
        onFailure: () => console.log("Error occured in fetchKpiSetList"),
        label: FETCH_KPI_SETS_FOR_USER
      });
}

function setfetchKpiSetListForUser(data){
    return {
        type: FETCH_KPI_SETS_FOR_USER,
		payload: data.data
    }
}

/* Action: Created saveKpiSet function
By: Syed On: 3/21/2020 */
export const saveKpiAudioDataSet = (kpiSetObj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'save_kpi_Set', 
        method: "POST",
        data:kpiSetObj,
        onSuccess: setsaveKpiAuditDataSet,
        onFailure: (data) => {responseMessage("error", data.message, "")},
        label: "SAVE_KPIS_AUDIT_DATA_SET"
      });
}

function setsaveKpiAuditDataSet(data){
    responseMessage("success", data.message, "")
    return {
        type: "SAVE_KPIS_AUDIT_DATA_SET",
		payload: data.data
    }
}
export const saveKpiSet = (kpiSetObj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'save_kpi_Set', 
        method: "POST",
        data:kpiSetObj,
        onSuccess: setsaveKpiSet,
        onFailure: (data) => {responseMessage("error", data.message, "")},
        label: "SAVE_KPIS_SETS"
      });
}

function setsaveKpiSet(data){
    responseMessage("success", data.message, "")
    return {
        type: "SAVE_KPIS_SETS",
		payload: data.data
    }
}

export const saveBscCategory = (saveObj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'saveBscCategory', 
        method: "POST",
        data:saveObj,
        onSuccess: setsaveBscCategory,
        onFailure: (data) => {responseMessage("error", data.message, "")},
        label: "SAVE_BSC_CATEGORY"
      });
}

function setsaveBscCategory(data){
    responseMessage("success", data.message, "")
    fetchBcsList();
    return {
        type: "SAVE_BSC_CATEGORY",
		payload: data.data
    }
}

/* Action: Created fetchKpiSetById function
By: Syed On: 3/21/2020 */

export const fetchKpiSetById = (KPISetID) => {
    return apiAction({
        url: config.laravelBaseUrl + "get_kpi_set/" + KPISetID, 
        onSuccess: setfetchKpiSetById,
        callback: 'fetchKpiSetById',
        onFailure: () => console.log("Error occured in fetchKpiSetById"),
        label: FETCH_KPIS_SET_DETAILS
      });
}

function setfetchKpiSetById(data){
    return {
        type: FETCH_KPIS_SET_DETAILS,
		payload: data.data
    }
}


/* Action: Created fetchKpiSetUserById function
By: Syed On: 3/21/2020 */

export const fetchKpiSetUserById = (KPISetID) => {
    return apiAction({
        url: config.laravelBaseUrl + "get_user_by_kpi_set/" + KPISetID, 
        onSuccess: setfetchKpiSetUserById,
        callback: 'fetchKpiSetUserById',
        onFailure: () => console.log("Error occured in fetchKpiSetUserById"),
        label: FETCH_KPIS_SET_UESERS
      });
}

function setfetchKpiSetUserById(data){
    return {
        type: FETCH_KPIS_SET_UESERS,
		payload: data.data
    }
}
/* Action: Changed fetchKpis function
By: Syed On: 3/3/2020 */

export const fetchKpis = (showAll, preferenceId) => {
    return apiAction({
        url: config.laravelBaseUrl + 'getDynamicKpiListByKpiSet/'+showAll+'/'+preferenceId, 
        onSuccess: setfetchKpis,
        onFailure: () => console.log("Error occured in fetchKpis"),
        label: FETCH_KPIS
      });
}

function setfetchKpis(data){
    return {
        type: FETCH_KPIS,
		payload: data.data
    }
}

/* Action: Changed getaudit_frequency function
By: Syed On: 3/3/2020 */

export const getaudit_frequency = (kpisetid) => {
    return apiAction({
        url: config.laravelBaseUrl + 'audit_frequency', 
        onSuccess: setgetaudit_frequency,
        onFailure: () => console.log("Error occured in getaudit_frequency"),
        label: GET_FREQUENCY
      });
}

function setgetaudit_frequency(data){
    return {
        type: GET_FREQUENCY,
		payload: data.data
    }
}


/* Action: Changed getimprovement_basis function
By: Syed On: 3/3/2020 */

export const getimprovement_basis = (kpisetid) => {
    return apiAction({
        url: config.laravelBaseUrl + 'improvement_basis', 
        onSuccess: setgetimprovement_basis,
        onFailure: () => console.log("Error occured in getimprovement_basis"),
        label: GET_IMPRVBASIS
      });
}

function setgetimprovement_basis(data){
    return {
        type: GET_IMPRVBASIS,
		payload: data.data
    }
}


/* Action: Changed getpersona function
By: Syed On: 3/26/2020 */

export const getuseremails = () => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_user_list', 
        onSuccess: setgetuseremails,
        onFailure: () => console.log("Error occured in getuseremails"),
        label: GET_UEM
      });
}

function setgetuseremails(data){
    return {
        type: GET_UEM,
		payload: data.data
    }
}

/* Action: Changed getpersona function
By: Syed On: 3/26/2020 */

export const getpersona = () => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_persona_list', 
        onSuccess: setgetpersona,
        onFailure: () => console.log("Error occured in getpersona"),
        label: GET_UOM
      });
}

function setgetpersona(data){
    return {
        type: GET_UOM,
		payload: data.data
    }
}

/* Action: Changed createKpi function
By: Syed On: 3/12/2020 */

export const createKpi = (kpiObj) => {
    return apiAction({
        url: config.laravelBaseUrl + "save_kpi" , 
        method: "POST",
        data: kpiObj,
        onSuccess: setcreateKpi,
        callback: 'createKpi',
        onFailure: () => console.log("Error occured in createKpi"),
        label: "CREATE_KPI",
      });
}

function setcreateKpi(data){
    responseMessage("success", "Kpi added successfully", "");
    return {
        type: "CREATE_KPI",
        payload: data
    }
}

// TODO: needs refactor
export const addKpi = (kpiObj) => {
    return apiAction({
        url: config.laravelBaseUrl + "add_kpi" , 
        method: "POST",
        data: kpiObj,
        onSuccess: setaddKpi,
        onFailure: () => console.log("Error occured in addKpi"),
        callback:'addKpi',
        label: ADD_KPI,
      });
}

function setaddKpi(data){
    responseMessage("success", "Kpi added successfully", "");
    return {
        type: ADD_KPI,
        payload: data
    }
}

export const getAuditTypes = () => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_audit_type/Audit', 
        onSuccess: setgetAuditTypes,
        onFailure: () => console.log("Error occured in getAuditTypes"),
        label: GET_KPI_AUDIT_TYPES
      });
}

function setgetAuditTypes(data){
    return {
        type: GET_KPI_AUDIT_TYPES,
		payload: data.data
    }
}
/* Action: Changed getKpi function
By: Syed On: 3/3/2020 */

export const getKpi = (kpi) => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_kpi_details/' + kpi.id +'/'+ kpi.kpiSetId, 
        onSuccess: setgetKpi,
        onFailure: () => console.log("Error occured in getKpi"),
        label: GET_KPI
      });
}

function setgetKpi(data){
    return {
        type: GET_KPI,
		payload: data.data
    }
}

export const getKpiAudit = (kpi) => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_kpi_details/' + kpi.id +'/'+ kpi.kpiSetId, 
        onSuccess: setgetKpiAudit,
        onFailure: () => console.log("Error occured in getKpiAudit"),
        label: GET_KPI_AUDIT
      });
}

function setgetKpiAudit(data){
    return {
        type: GET_KPI_AUDIT,
		payload: data.data
    }
}

export const getAuditHistory = (id) => {
    return apiAction({
        url: config.laravelBaseUrl + 'kpi_audit_logger_history/' + id, 
        onSuccess: setgetAuditHistory,
        onFailure: () => console.log("Error occured in getAuditHistory"),
        label: GET_AUDIT_HISTORY
      });
}

function setgetAuditHistory(data){
    return {
        type: GET_AUDIT_HISTORY,
		payload: data.data
    }
}

/* Action: Changed getControlLever function
By: Syed On: 3/3/2020 */

export const getControlLever = (id) => {
    return apiAction({
        url: config.laravelBaseUrl + 'get_kpi_control_levers_details/' + id, 
        onSuccess: setgetControlLever,
        onFailure: () => console.log("Error occured in getControlLever"),
        label: GET_CONTROL_LEVER
      });
}

function setgetControlLever(data){
    return {
        type: GET_CONTROL_LEVER,
		payload: data.data
    }
}

/* Action: Changed updateControlLever function
By: Syed On: 3/3/2020 */

export const updateControlLever = (leverObj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'update_kpi_control_levers', 
        method: "POST",
        data: leverObj, 
        onSuccess: setupdateControlLever,
        onFailure: () => console.log("Error occured in updateControlLever"),
        label: UPDATED_LEVER
      });
}

function setupdateControlLever(data){
    responseMessage("success",data.message,"");
    return {
        type: UPDATED_LEVER,
		payload: data.data
    }
}

/* Action: Changed updateKpi function
By: Syed On: 3/3/2020 */

export const updateKpi = (kpiObj) => {
    return apiAction({
        url: config.laravelBaseUrl + 'update_kpi', 
        method: "POST",
        data: kpiObj, 
        onSuccess: setupdateKpi,
        onFailure: () => console.log("Error occured in updateKpi"),
        label: "UPDATED_KPI"
      });
}

function setupdateKpi(data){
    responseMessage("success",data.message,"");
    return {
        type: "UPDATED_KPI",
		payload: data.data
    }
}

export const saveNewLevers = (kpiObj) => {
    return apiAction({
        url: config.laravelBaseUrl + "add_kpi_control_levers" , 
        method: "POST",
        data: kpiObj,
        onSuccess: setsaveNewLevers,
        callback:'saveNewLevers',
        onFailure: () => console.log("Error occured in saveNewLevers"),
        label: ADD_CONTROLEVER
      });
}

function setsaveNewLevers(data){
    responseMessage("success", "New Control Lever added successfully", "");
    return {
        type: ADD_CONTROLEVER,
        payload: data.data
    }
}


/* Action: Changed deleteKpi function
By: Syed On: 3/12/2020 */

export const deleteKpi = (kpiObj) => {
    return apiAction({
        url: config.laravelBaseUrl + "delete_kpi" , 
        method: "POST",
        data: kpiObj,
        onSuccess: setdeleteKpi,
        callback:'deleteKpi',
        onFailure: () => console.log("Error occured in deleteKpi"),
        label: DELETE_KPI
      });
}

function setdeleteKpi(data){
    responseMessage("success", "Kpi deleted successfully", "");
    return {
        type: DELETE_KPI,
        payload: data.data
    }
}

/* Action: Changed deleteKpiLever function
By: Syed On: 3/12/2020 */

export const deleteKpiLever = (leverObj) => {
    return apiAction({
        url: config.laravelBaseUrl + "update_kpi_control_levers" , 
        method: "POST",
        data: leverObj,
        onSuccess: setdeleteKpiLever,
        onFailure: () => console.log("Error occured in deleteKpiLever"),
        label: DELETE_LEVER
      });
}

function setdeleteKpiLever(data){
    responseMessage("success", "Control lever deleted successfully", "");
    return {
        type: DELETE_LEVER,
        payload: data.data
    }
}


export const fetchBenchmarkProjectsWithDomains = () => {
	return apiAction({
        url: config.laravelBaseUrl + 'getBenchmarkingProjectsDomain', 
        onSuccess: setfetchBenchmarkProjectsWithDomains,
        onFailure: () => console.log("Error occured in fetchBenchmarkProjectsWithDomains"),
        label: FETCH_BENCHMARK_PROJECTS_WITH_DOMAINS,
      });
    };
    

function setfetchBenchmarkProjectsWithDomains(data){
    return {
        type: FETCH_BENCHMARK_PROJECTS_WITH_DOMAINS,
        payload: data.data
    }
}

export const fetchDecompositionProjects = () => {
	return apiAction({
        url: config.laravelBaseUrl + 'getDecompositionProjects', 
        onSuccess: setfetchDecompositionProjects,
        onFailure: () => console.log("Error occured in fetchDecompositionProjects "),
        label: FETCH_DECOMPOSITION_PROJECTS
      });
};

function setfetchDecompositionProjects(data){
    return {
        type: FETCH_DECOMPOSITION_PROJECTS,
        payload: data.data
    }
}

export const fetchDesignThinkingProjects = () => {
	return apiAction({
        url: config.laravelBaseUrl + 'getDtProject', 
        onSuccess: setDesignThinkingProjects,
        onFailure: () => console.log("Error occured in fetchDesignThinkingProjects "),
        label: FETCH_DESIGNTHINKING_PROJECTS,
      });
};

function setDesignThinkingProjects(data){
    return {
        type: FETCH_DESIGNTHINKING_PROJECTS,
        payload: data.data
    }
}













