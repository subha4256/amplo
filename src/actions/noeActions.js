import {
	FETCH_NOE_BY_SUBEPIC,
    FETCH_NOE,
    ERROR
} from './types';
import {responseMessage} from '../utils/alert';
import { apiAction } from './apiActions';
const config = require('../config');

export const fetchNoe = (epicId) => {
	return apiAction({
	  url: config.laravelBaseUrl + `getNOE/${epicId}`, 
	  onSuccess: setfetchNoe,
      callback : 'fetchNoe', 
      onFailure:  errfetchNoe,
	  label: FETCH_NOE
	});
  }
  function errfetchNoe(res){
    // responseMessage("Error",res.message,"");
	return {
	  type: ERROR,
	  payload: res
	}
  }
  function setfetchNoe(res){
	// responseMessage("success",res.message,"");
	return {
	  type: FETCH_NOE,
	  payload: res.data.EPic
	}
  }

  export const fetchNOEBySubEpic = (epicId) => {
	return apiAction({
	  url: config.laravelBaseUrl + `getNOEBySubEpic/${epicId}`, 
	  onSuccess: setfetchNOEBySubEpic,
      callback : 'fetchNOEBySubEpic', 
      onFailure:  errfetchNOEBySubEpic,
	  label: FETCH_NOE_BY_SUBEPIC
	});
  }
  function errfetchNOEBySubEpic(res){
    // responseMessage("Error",res.message,"");
	return {
	  type: ERROR,
	  payload: res
	}
  }
  function setfetchNOEBySubEpic(res){
	// responseMessage("success",res.message,"");
	return {
	  type: FETCH_NOE_BY_SUBEPIC,
	  payload: res.data.EPic
	}
  }
