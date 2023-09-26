import { 
	FETCH_STAKEHOLDERS, 
	FETCH_STAKEHOLDERS_TYPE, 
	FETCH_DT_STAKEHOLDER_LOCATIONS, 
	FETCH_DT_STAKEHOLDER_MANAGERS, 
	FETCH_DT_STAKEHOLDER_DEPARTMENTS, 
	GET_ERRORS, 
	FETCH_DT_STAKEHOLDER_BUSINESS_ENTITY,
	FETCH_DT_STAKEHOLDER_EMPLOYEE_TYPE,
	FETCH_DT_STAKEHOLDER_MODEL,
	FETCH_DT_STAKEHOLDER_PARTNER_TYPE,
	FETCH_DT_STAKEHOLDER_ORGANIZATIONAL_LEVEL,
	FETCH_DT_STAKEHOLDER_ASSET_CATEGORY,
	FETCH_DT_STAKEHOLDER_ASSET_TYPE,
	SAVE_DT_STAKEHOLDER,
	ERROR 
} from './types';

import { apiAction } from './apiActions';
import {responseMessage} from '../utils/alert';
const config = require('../config');

/* Save Design Thinking Stakeholders */
export const saveDTStakeholder = (Obj) => {
	return apiAction({
	  url: config.laravelBaseUrl + 'saveDesignThinkingStakeHolder', 
	  method: "POST",
	  data: Obj,  
	  onSuccess: setsaveDTStakeholder,
	  onFailure: errsaveDTStakeholder,
	  callback : 'saveDTStakeholder', 
	  label: SAVE_DT_STAKEHOLDER
	});
  }
  function errsaveDTStakeholder(res){
	return {
	  type: ERROR,
	  payload: res.response.data
	}
  }
  function setsaveDTStakeholder(res){
	responseMessage("success",res.message,"");
	return {
	  type: SAVE_DT_STAKEHOLDER,
	  payload: res
	}
  }
  


/* Save Design Thinking Stakeholders */
// export const saveDTStakeholder = (Obj) => {
// 	return apiAction({
// 	  url: config.laravelBaseUrl+'saveDesignThinkingStakeHolder', 
// 	  method: "POST",
// 	  data: Obj, 
// 	  onSuccess: setsaveDTStakeholder,
// 	  callback : 'saveDTStakeholder',
// 	  onFailure: () => {responseMessage("error","Error Occured while saving Stakeholder.")},
// 	  label: SAVE_DT_STAKEHOLDER
// 	});
//   }
  
// function setsaveDTStakeholder(res){
// 	responseMessage("success",res.message,"");
// 	return {
// 	type: SAVE_DT_STAKEHOLDER,
// 		payload: res
// 	}
// }

/* Get Design Thinking Stakeholders */
export const fetchStakeHolders = () => {
	return apiAction({
	  url: config.laravelBaseUrl+'getDesignThinkingStakeHolders', 
	  method: "GET",
	  onSuccess: setfetchStakeHolders,
	  onFailure: () => {responseMessage("error","Error Occured in getDesignThinkingStakeHolders.")},
	  label: FETCH_STAKEHOLDERS
	});
  }
  
function setfetchStakeHolders(res){
	return {
		type: FETCH_STAKEHOLDERS,
		payload: res.data
	}
}


// export const fetchStakeHolders = (stakeHolders) => (dispatch) => {
//     if(stakeHolders.status === 200) {
// 		dispatch({
// 			type: FETCH_STAKEHOLDERS,
// 			payload: stakeHolders.data.data
// 		})
// 	}else{
//         dispatch({
// 			type: GET_ERRORS,
// 			payload: stakeHolders.data.data
// 		})
//     }
// }

/* Get Design Thinking Stakeholders Types */
export const fetchStakeHoldersType = () => {
	return apiAction({
	  url: config.laravelBaseUrl+'getStakeHolderType', 
	  method: "GET",
	  onSuccess: setfetchStakeHoldersType,
	  onFailure: () => {responseMessage("error","Error Occured in getStakeHolderType.")},
	  label: FETCH_STAKEHOLDERS_TYPE
	});
  }
  
function setfetchStakeHoldersType(res){
	return {
		type: FETCH_STAKEHOLDERS_TYPE,
		payload: res.data
	}
}

// export const fetchStakeHoldersType = (stakeHoldersType) => (dispatch) => {
//     if(stakeHoldersType.status === 200) {
// 		dispatch({
// 			type: FETCH_STAKEHOLDERS_TYPE,
// 			payload: stakeHoldersType.data.data
// 		})
// 	}else{
//         dispatch({
// 			type: GET_ERRORS,
// 			payload: stakeHoldersType.data.data
// 		})
//     }
// }

/* Get Design Thinking Stakeholders Locations */
export const fetchDtStakeholderLocations = () => {
	return apiAction({
	  url: config.laravelBaseUrl+'getLocation', 
	  method: "GET",
	  onSuccess: setfetchDtStakeholderLocations,
	  onFailure: () => {responseMessage("error","Error Occured in getLocation.")},
	  label: FETCH_DT_STAKEHOLDER_LOCATIONS
	});
  }
  
function setfetchDtStakeholderLocations(res){
	return {
		type: FETCH_DT_STAKEHOLDER_LOCATIONS,
		payload: res.data
	}
}

// export const fetchDtStakeholderLocations = (locations) => (dispatch) => {
//     if(locations.status === 200) {
// 		dispatch({
// 			type: FETCH_DT_STAKEHOLDER_LOCATIONS,
// 			payload: locations.data.data
// 		})
// 	}else{
//         dispatch({
// 			type: GET_ERRORS,
// 			payload: locations.data.data
// 		})
//     }
// }

/* Get Design Thinking Stakeholders Managers */
export const fetchDtStakeholderManagers = () => {
	return apiAction({
	  url: config.laravelBaseUrl+'getManager', 
	  method: "GET",
	  onSuccess: setfetchDtStakeholderManagers,
	  onFailure: () => {responseMessage("error","Error Occured in getManager.")},
	  label: FETCH_DT_STAKEHOLDER_MANAGERS
	});
  }
  
function setfetchDtStakeholderManagers(res){
	return {
		type: FETCH_DT_STAKEHOLDER_MANAGERS,
		payload: res.data
	}
}

// export const fetchDtStakeholderManagers = (managers) => (dispatch) => {
//     if(managers.status === 200) {
// 		dispatch({
// 			type: FETCH_DT_STAKEHOLDER_MANAGERS,
// 			payload: managers.data.data
// 		})
// 	}else{
//         dispatch({
// 			type: GET_ERRORS,
// 			payload: managers.data.data
// 		})
//     }
// }

/* Get Design Thinking Stakeholders Departments */
export const fetchDtStakeholderDepartments = () => {
	return apiAction({
	  url: config.laravelBaseUrl+'getDepartment', 
	  method: "GET",
	  onSuccess: setfetchDtStakeholderDepartments,
	  onFailure: () => {responseMessage("error","Error Occured in getDepartment.")},
	  label: FETCH_DT_STAKEHOLDER_DEPARTMENTS
	});
  }
  
function setfetchDtStakeholderDepartments(res){
	return {
		type: FETCH_DT_STAKEHOLDER_DEPARTMENTS,
		payload: res.data
	}
}

// export const fetchDtStakeholderDepartments = (departments) => (dispatch) => {
//     if(departments.status === 200) {
// 		dispatch({
// 			type: FETCH_DT_STAKEHOLDER_DEPARTMENTS,
// 			payload: departments.data.data
// 		})
// 	}else{
//         dispatch({
// 			type: GET_ERRORS,
// 			payload: departments.data.data
// 		})
//     }
// }

/* Get Design Thinking Stakeholders Business Entity */
export const fetchBusinessEntity = () => {
	return apiAction({
	  url: config.laravelBaseUrl+'getBusinessEntity', 
	  method: "GET",
	  onSuccess: setfetchBusinessEntity,
	  onFailure: () => {responseMessage("error","Error Occured in getBusinessEntity.")},
	  label: FETCH_DT_STAKEHOLDER_BUSINESS_ENTITY
	});
  }
  
function setfetchBusinessEntity(res){
	return {
		type: FETCH_DT_STAKEHOLDER_BUSINESS_ENTITY,
		payload: res.data
	}
}

// export const fetchBusinessEntity = (businessEntity) => (dispatch) => {
//     if(businessEntity.status === 200) {
// 		dispatch({
// 			type: FETCH_DT_STAKEHOLDER_BUSINESS_ENTITY,
// 			payload: businessEntity.data.data
// 		})
// 	}else{
//         dispatch({
// 			type: GET_ERRORS,
// 			payload: businessEntity.data.data
// 		})
//     }
// }

/* Get Design Thinking Stakeholders Employee Type */
export const fetchEmployeeType = () => {
	return apiAction({
	  url: config.laravelBaseUrl+'getEmployeeType', 
	  method: "GET",
	  onSuccess: setfetchEmployeeType,
	  onFailure: () => {responseMessage("error","Error Occured in getEmployeeType.")},
	  label: FETCH_DT_STAKEHOLDER_EMPLOYEE_TYPE
	});
  }
  
function setfetchEmployeeType(res){
	return {
		type: FETCH_DT_STAKEHOLDER_EMPLOYEE_TYPE,
		payload: res.data
	}
}

// export const fetchEmployeeType = (employeeType) => (dispatch) => {
//     if(employeeType.status === 200) {
// 		dispatch({
// 			type: FETCH_DT_STAKEHOLDER_EMPLOYEE_TYPE,
// 			payload: employeeType.data.data
// 		})
// 	}else{
//         dispatch({
// 			type: GET_ERRORS,
// 			payload: employeeType.data.data
// 		})
//     }
// }
/* Get Design Thinking Stakeholders Model */
export const fetchModel = () => {
	return apiAction({
	  url: config.laravelBaseUrl+'getModel', 
	  method: "GET",
	  onSuccess: setfetchModel,
	  onFailure: () => {responseMessage("error","Error Occured in getModel.")},
	  label: FETCH_DT_STAKEHOLDER_MODEL
	});
  }
  
function setfetchModel(res){
	return {
		type: FETCH_DT_STAKEHOLDER_MODEL,
		payload: res.data
	}
}

// export const fetchModel = (model) => (dispatch) => {
//     if(model.status === 200) {
// 		dispatch({
// 			type: FETCH_DT_STAKEHOLDER_MODEL,
// 			payload: model.data.data
// 		})
// 	}else{
//         dispatch({
// 			type: GET_ERRORS,
// 			payload: model.data.data
// 		})
//     }
// }
/* Get Design Thinking Stakeholders Partner Type */
export const fetchPartnerType = () => {
	return apiAction({
	  url: config.laravelBaseUrl+'getPartnerType', 
	  method: "GET",
	  onSuccess: setfetchPartnerType,
	  onFailure: () => {responseMessage("error","Error Occured in getPartnerType.")},
	  label: FETCH_DT_STAKEHOLDER_PARTNER_TYPE
	});
  }
  
function setfetchPartnerType(res){
	return {
		type: FETCH_DT_STAKEHOLDER_PARTNER_TYPE,
		payload: res.data
	}
}

// export const fetchPartnerType = (partnerType) => (dispatch) => {
//     if(partnerType.status === 200) {
// 		dispatch({
// 			type: FETCH_DT_STAKEHOLDER_PARTNER_TYPE,
// 			payload: partnerType.data.data
// 		})
// 	}else{
//         dispatch({
// 			type: GET_ERRORS,
// 			payload: partnerType.data.data
// 		})
//     }
// }

/* Get Design Thinking Stakeholders Organizational Level */
export const fetchOrganizationalLevel = () => {
	return apiAction({
	  url: config.laravelBaseUrl+'getOrganizationalLevel', 
	  method: "GET",
	  onSuccess: setfetchOrganizationalLevel,
	  onFailure: () => {responseMessage("error","Error Occured in getOrganizationalLevel.")},
	  label: FETCH_DT_STAKEHOLDER_ORGANIZATIONAL_LEVEL
	});
  }
  
function setfetchOrganizationalLevel(res){
	return {
		type: FETCH_DT_STAKEHOLDER_ORGANIZATIONAL_LEVEL,
		payload: res.data
	}
}


// export const fetchOrganizationalLevel = (organizationalLevel) => (dispatch) => {
//     if(organizationalLevel.status === 200) {
// 		dispatch({
// 			type: FETCH_DT_STAKEHOLDER_ORGANIZATIONAL_LEVEL,
// 			payload: organizationalLevel.data.data
// 		})
// 	}else{
//         dispatch({
// 			type: GET_ERRORS,
// 			payload: organizationalLevel.data.data
// 		})
//     }
// }

/* Get Design Thinking Stakeholders Asset Category */
export const fetchAssetCategory = () => {
	return apiAction({
	  url: config.laravelBaseUrl+'getAssetCategory', 
	  method: "GET",
	  onSuccess: setfetchAssetCategory,
	  onFailure: () => {responseMessage("error","Error Occured in getAssetCategory.")},
	  label: FETCH_DT_STAKEHOLDER_ASSET_CATEGORY
	});
  }
  
function setfetchAssetCategory(res){
	return {
		type: FETCH_DT_STAKEHOLDER_ASSET_CATEGORY,
		payload: res.data
	}
}

// export const fetchAssetCategory = (assetCategory) => (dispatch) => {
//     if(assetCategory.status === 200) {
// 		dispatch({
// 			type: FETCH_DT_STAKEHOLDER_ASSET_CATEGORY,
// 			payload: assetCategory.data.data
// 		})
// 	}else{
//         dispatch({
// 			type: GET_ERRORS,
// 			payload: assetCategory.data.data
// 		})
//     }
// }

/* Get Design Thinking Stakeholders Asset Type */
export const fetchAssetType = () => {
	return apiAction({
	  url: config.laravelBaseUrl+'getAssetType', 
	  method: "GET",
	  onSuccess: setfetchAssetType,
	  onFailure: () => {responseMessage("error","Error Occured in getAssetType.")},
	  label: FETCH_DT_STAKEHOLDER_ASSET_TYPE
	});
  }
  
function setfetchAssetType(res){
	return {
		type: FETCH_DT_STAKEHOLDER_ASSET_TYPE,
		payload: res.data
	}
}
// export const fetchAssetType = (assetType) => (dispatch) => {
//     if(assetType.status === 200) {
// 		dispatch({
// 			type: FETCH_DT_STAKEHOLDER_ASSET_TYPE,
// 			payload: assetType.data.data
// 		})
// 	}else{
//         dispatch({
// 			type: GET_ERRORS,
// 			payload: assetType.data.data
// 		})
//     }
// }