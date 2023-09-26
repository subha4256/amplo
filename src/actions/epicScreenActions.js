import {
    FETCH_BENCHMARK_PROJECTS_WITH_DOMAINS, 
    FETCH_DECOMPOSITION_PROJECTS, 
    FETCH_KPIS_CONTROLS, 
    FETCH_USER_DETAILS,
    FETCH_OTHER_PROJECTS_OF_USER,
    FETCH_NOI_TEMPLATES,
    FETCH_DT_STAKEHOLDERS,
    FETCH_DT_PROJ_DETAILS,
    FETCH_EPIC,
    FETCH_EPIC_VERSION_HISTORY,
    SAVE_EPIC,
    ERROR,
    FETCH_DECOMP_PROJ_FN_PHASE_LVL,
    EPIC_LOCK_UNLOCK,
    FETCH_ALL_EPIC,
    FETCH_EPIC_PROJECT,
    FETCH_EPIC_SUBEPIC_DETAILS,
    FETCH_DT_CHAMPION
} from './types';
import {responseMessage} from '../utils/alert';
import { apiAction } from './apiActions';
const config = require('../config');

export const fetchDtChampion = (dtId,epicId) => {
	return apiAction({
        url: config.laravelBaseUrl + `getDTChampion/${dtId}/${epicId}`, 
        onSuccess: setfetchDtChampion,
        onFailure: () => console.log("Error occured in fetchDtChampion"),
        label: FETCH_DT_CHAMPION,
      });
};
function setfetchDtChampion(data){
    return {
        type: FETCH_DT_CHAMPION,
        payload: data.data
    }
}

export const fetchEpicSubEpicDeatils = (dtId,epicId,versionNo) => {
	return apiAction({
        url: config.laravelBaseUrl + `getEpicSubEpicDeatils/${dtId}/${epicId}/${versionNo}`, 
        onSuccess: setfetchEpicSubEpicDeatils,
        onFailure: () => console.log("Error occured in fetchEpicSubEpicDeatils"),
        label: FETCH_EPIC_SUBEPIC_DETAILS,
      });
};
function setfetchEpicSubEpicDeatils(data){
    return {
        type: FETCH_EPIC_SUBEPIC_DETAILS,
        payload: data.data
    }
}




export const fetchEpicProject = (dtId, versionNo) => {
	return apiAction({
        url: config.laravelBaseUrl + `getEpicProject/${dtId}/${versionNo}`, 
        onSuccess: setfetchEpicProject,
        onFailure: () => console.log("Error occured in fetchEpicProject"),
        label: FETCH_EPIC_PROJECT,
      });
};
function setfetchEpicProject(data){
    return {
        type: FETCH_EPIC_PROJECT,
        payload: data.data
    }
}

export const fetchAllEpic = (dtId, versionNo) => {
	return apiAction({
        url: config.laravelBaseUrl + `getAllEpic/${dtId}/${versionNo}`, 
        onSuccess: setfetchAllEpic,
        callback : 'fetchAllEpic',
        onFailure: () => console.log("Error occured in fetchAllEpic"),
        label: FETCH_ALL_EPIC,
      });
};
function setfetchAllEpic(data){
    return {
        type: FETCH_ALL_EPIC,
        payload: data.data
    }
}


export const doEpicLockUnlock = (Obj) => {
	return apiAction({
        url: config.laravelBaseUrl + 'epicLockUnLock', 
        onSuccess: setdoEpicLockUnlock,
        method: "POST",
	    data: Obj, 
        onFailure: () => console.log("Error occured in doEpicLockUnlock"),
        label: EPIC_LOCK_UNLOCK,
      });
};
function setdoEpicLockUnlock(data){
    responseMessage("success",data.message,"");
    return {
        type: EPIC_LOCK_UNLOCK,
        payload: data.data
    }
}

export const fetchDecompositionProjectsFunctionPhaseLevel = (projectId) => {
	return apiAction({
        url: config.laravelBaseUrl + `getDecompositionProjectsFunctionPhaseLevel/${projectId}`, 
        onSuccess: setfetchDecompositionProjectsFunctionPhaseLevel,
        callback : 'fetchDecompositionProjectsFunctionPhaseLevel', 
        onFailure: () => console.log("Error occured in fetchDecompositionProjectsFunctionPhaseLevel"),
        label: FETCH_DECOMP_PROJ_FN_PHASE_LVL,
      });
};
function setfetchDecompositionProjectsFunctionPhaseLevel(data){
    return {
        type: FETCH_DECOMP_PROJ_FN_PHASE_LVL,
        payload: data.data
    }
}



export const saveEpicAction = (Obj) => {
	return apiAction({
	  url: config.laravelBaseUrl + 'saveEpic', 
	  method: "POST",
	  data: Obj,  
	  onSuccess: setsaveEpicAction,
      callback : 'saveEpicAction', 
      onFailure: errsaveEpicAction, 
	  label: SAVE_EPIC
	});
  }
  function errsaveEpicAction(res){
	return {
	  type: ERROR,
	  payload: res.response.data
	}
  }
  function setsaveEpicAction(res){
	responseMessage("success",res.message,"");
	return {
	  type: SAVE_EPIC,
	  payload: res
	}
  }

export const fetchEpic = (dtId,epicId,versionNo) => {
	return apiAction({
        url: config.laravelBaseUrl + `getEpic/${dtId}/${epicId}/${versionNo}`, 
        onSuccess: setfetchEpic,
        callback: 'fetchEpic',
        onFailure: () => console.log("Error occured in fetchEpic"),
        label: FETCH_EPIC,
      });
};
function setfetchEpic(data){
    return {
        type: FETCH_EPIC,
        payload: data.data
    }
}

export const fetchEpicVersionHistory = (dtId) => {
	return apiAction({
        url: config.laravelBaseUrl + `getEpicVersionHistory/0/${dtId}`, 
        onSuccess: setfetchEpicVersionHistory,
        onFailure: () => console.log("Error occured in fetchEpicVersionHistory"),
        label: FETCH_EPIC_VERSION_HISTORY,
      });
};
function setfetchEpicVersionHistory(data){
    return {
        type: FETCH_EPIC_VERSION_HISTORY,
        payload: data.data
    }
}

export const fetchDesignThinkingProjectDetails = (dtId, versionNo) => {
	return apiAction({
        url: config.laravelBaseUrl + `getDesignThinkingProjectDetails/${dtId}/${versionNo}`, 
        onSuccess: setfetchDesignThinkingProjectDetails,
        onFailure: () => console.log("Error occured in fetchDesignThinkingProjectDetails"),
        label: FETCH_DT_PROJ_DETAILS,
      });
};
function setfetchDesignThinkingProjectDetails(data){
    return {
        type: FETCH_DT_PROJ_DETAILS,
        payload: data.data[0]
    }
}

export const fetchOtherProjectsOfUser = () => {
	return apiAction({
        url: config.laravelBaseUrl + 'getOtherProjectsOfUser', 
        onSuccess: setfetchOtherProjectsOfUser,
        onFailure: () => console.log("Error occured in fetchOtherProjectsOfUser"),
        label: FETCH_OTHER_PROJECTS_OF_USER,
      });
};
function setfetchOtherProjectsOfUser(data){
    return {
        type: FETCH_OTHER_PROJECTS_OF_USER,
        payload: data.data
    }
}

export const fetchNetworkOfInfluenceTemplates = () => {
	return apiAction({
        url: config.laravelBaseUrl + 'getNetworkOfInfluenceTemplates', 
        onSuccess: setfetchNetworkOfInfluenceTemplates,
        onFailure: () => console.log("Error occured in fetchNetworkOfInfluenceTemplates"),
        label: FETCH_NOI_TEMPLATES,
      });
};
function setfetchNetworkOfInfluenceTemplates(data){
    return {
        type: FETCH_NOI_TEMPLATES,
        payload: data.data
    }
}

export const fetchDesignThinkingStakeHolders = () => {
	return apiAction({
        url: config.laravelBaseUrl + 'getDesignThinkingStakeHolders', 
        onSuccess: setfetchDesignThinkingStakeHolders,
        onFailure: () => console.log("Error occured in fetchDesignThinkingStakeHolders"),
        label: FETCH_DT_STAKEHOLDERS,
      });
};
function setfetchDesignThinkingStakeHolders(data){
    return {
        type: FETCH_DT_STAKEHOLDERS,
        payload: data.data
    }
}

export const fetchUserDetails = () => {
	return apiAction({
        url: config.laravelBaseUrl + 'getUserDetails', 
        onSuccess: setfetchUserDetails,
        onFailure: () => console.log("Error occured in fetchUserDetails"),
        label: FETCH_USER_DETAILS,
      });
};
function setfetchUserDetails(data){
    return {
        type: FETCH_USER_DETAILS,
        payload: data.data[0]
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

export const fetchKpisControls = () => {
	return apiAction({
        url: config.laravelBaseUrl + 'getKpisControlLevers', 
        onSuccess: setfetchKpisControl,
        onFailure: () => console.log("Error occured in fetchKpisControl "),
        label: FETCH_KPIS_CONTROLS,
      });
};
function setfetchKpisControl(data){
    return {
        type: FETCH_KPIS_CONTROLS,
        payload: data.data
    }
}