import {
    CREATE_CJM,
    FETCH_CJM,
    ERROR
} from './types';
import {responseMessage} from '../utils/alert';
import { apiAction } from './apiActions';
const config = require('../config');

export const createCustomerJourneyMap = (personaId) => {
	return apiAction({
	  url: config.laravelBaseUrl + `createCustomerJourneyMap/${personaId}`, 
	  onSuccess: setcreateCustomerJourneyMap,
      callback : 'createCustomerJourneyMap', 
      onFailure:  errcreateCustomerJourneyMap,
	  label: CREATE_CJM
	});
  }
  function errcreateCustomerJourneyMap(res){
    // responseMessage("Error",res.message,"");
	return {
	  type: ERROR,
	  payload: res
	}
  }
  function setcreateCustomerJourneyMap(res){
	responseMessage("success",res.message,"");
	return {
	  type: CREATE_CJM,
	  payload: res
	}
  }

export const fetchCustomerJourneyMap = (cjmId,epicId,personaId) => {
	return apiAction({
	  url: config.laravelBaseUrl + `getCustomerJourneyMap/${cjmId}/${epicId}/${personaId}`, 
	  onSuccess: setfetchCustomerJourneyMap,
      callback : 'fetchCustomerJourneyMap', 
      onFailure:  errfetchCustomerJourneyMap,
	  label: FETCH_CJM
	});
  }
  function errfetchCustomerJourneyMap(res){
    // responseMessage("Error",res.message,"");
	return {
	  type: ERROR,
	  payload: res
	}
  }
  function setfetchCustomerJourneyMap(res){
	responseMessage("success",res.message,"");
	return {
	  type: FETCH_CJM,
	  payload: res.data
	}
  }

/*
export const fetchEmpathyNotesStakeHolders = (Obj) => {
	return apiAction({
	  url: config.laravelBaseUrl + 'saveEpic', 
	  method: "POST",
	  data: Obj,  
	  onSuccess: setfetchEmpathyNotesStakeHolders,
      callback : 'fetchEmpathyNotesStakeHolders', 
      onFailure:  () => console.log("Error occured in fetchEpic"),, 
	  label: EMPATHY_NOTES_STAKEHOLDERS
	});
  }
  function errfetchEmpathyNotesStakeHolders(res){
	return {
	  type: ERROR,
	  payload: res.response.data
	}
  }
  function setfetchEmpathyNotesStakeHolders(res){
	responseMessage("success",res.message,"");
	return {
	  type: EMPATHY_NOTES_STAKEHOLDERS,
	  payload: res
	}
  }

  */

