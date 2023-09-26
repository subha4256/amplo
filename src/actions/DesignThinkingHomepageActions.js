import { FETCH_DTPROJECTS, DTPROJECT_CREATE_PERMISSION, GET_ERRORS } from './types';
import {responseMessage} from '../utils/alert';
import { apiAction } from './apiActions';
const config = require('../config');

export const fetchDesignThinkingProjects = () => {
	return apiAction({
	  url: config.laravelBaseUrl + `getDesignThinkingProject`, 
	  onSuccess: setfetchDesignThinkingProjects,
      callback : 'fetchDesignThinkingProjects', 
      onFailure:  errfetchDesignThinkingProjects,
	  label: FETCH_DTPROJECTS
	});
  }
  function errfetchDesignThinkingProjects(res){
    // responseMessage("Error",res.message,"");
	return {
	  type: GET_ERRORS,
	  payload: res
	}
  }
  function setfetchDesignThinkingProjects(res){
	
	// responseMessage("success",res.message,"");
	return {
	  type: FETCH_DTPROJECTS,
	  payload: res.data
	}
  }


  export const fetchDesignThinkingProjectsCreatePermission = () => {
	return apiAction({
	  url: config.laravelBaseUrl + `getDtProjectCreatePermission`, 
	  onSuccess: setfetchDesignThinkingProjectsCreatePermission,
      callback : 'fetchDesignThinkingProjectsCreatePermission', 
      onFailure:  errfetchDesignThinkingProjectsCreatePermission,
	  label: DTPROJECT_CREATE_PERMISSION
	});
  }
  function errfetchDesignThinkingProjectsCreatePermission(res){
    // responseMessage("Error",res.message,"");
	return {
	  type: GET_ERRORS,
	  payload: res
	}
  }
  function setfetchDesignThinkingProjectsCreatePermission(res){
	// responseMessage("success",res.message,"");
	return {
	  type: DTPROJECT_CREATE_PERMISSION,
	  payload: res.data[0].Permission
	}
  }
