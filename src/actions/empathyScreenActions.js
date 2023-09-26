import {
	EMPATHY_NOTES_STAKEHOLDERS,
	EMPATHY_NOTES,
	ERROR,
	GET_ALL_EMPATHY_LIFECYCLE,
	SAVE_EMPATHY_MAP,
	GET_EMPATHY_NOTES_STK_DESC,
	DELETE_ALL_EMPATHY_NOTES,
	GET_DTNOI_STK
} from './types';
import {responseMessage} from '../utils/alert';
import { apiAction } from './apiActions';
const config = require('../config');

export const fetchDtNoiStkhldrDetail = (id) => {
	return apiAction({
	  url: config.laravelBaseUrl + `getDtNoiDetailForStakeholder/${id}`, 
	  onSuccess: setfetchDtNoiStkhldrDetail,
      onFailure: errfetchDtNoiStkhldrDetail, 
	  label: GET_DTNOI_STK
	});
  }
function setfetchDtNoiStkhldrDetail(response){	  
	return {
	  type: GET_DTNOI_STK,
	  payload: response.data
	}
}
function errfetchDtNoiStkhldrDetail(res){
	responseMessage("Error",res.message,"");
	return {
		type: ERROR,
		payload: res.response.data
	}
}

export const fetchEmpathyNotesStkDesc = (dtId,projectVerId,epicId,epicVerId,stkid) => {
	return apiAction({
	  url: config.laravelBaseUrl + `getEmpathyNotes/${dtId}/${projectVerId}/${epicId}/${epicVerId}/${stkid}`, 
	  onSuccess: setfetchEmpathyNotesStkDesc,
      onFailure: () => console.log("Error occured in fetchEmpathyNotesStkDesc"), 
	  label: GET_EMPATHY_NOTES_STK_DESC
	});
  }
  function setfetchEmpathyNotesStkDesc(response){	  
	return {
	  type: GET_EMPATHY_NOTES_STK_DESC,
	  payload: response.data.Stakeholders[0].Sections? response.data.Stakeholders[0].Sections: []
	}
  }

export const deleteEmpathyMap = (Obj) => {
	return apiAction({
	  url: config.laravelBaseUrl + 'deleteEmpathyMap', 
	  method: "POST",
	  data: Obj,  
	  onSuccess: setdeleteEmpathyMap,
      onFailure: errdeleteEmpathyMap, 
	  label: SAVE_EMPATHY_MAP
	});
  }
  function setdeleteEmpathyMap(res){
	responseMessage("success",res.message,"");
	return {
	  type: SAVE_EMPATHY_MAP,
	  payload: res
	}
  }
  function errdeleteEmpathyMap(res){
	responseMessage("Error",res.message,"");
	return {
	  type: ERROR,
	  payload: res.response.data
	}
  }


export const saveEmpathyMap = (Obj) => {
	return apiAction({
	  url: config.laravelBaseUrl + 'saveEmpathyMap', 
	  method: "POST",
	  data: Obj,  
	  callback : 'saveEmpathyMap', 
	  onSuccess: setsaveEmpathyMap,
      onFailure: errsaveEmpathyMap, 
	  label: SAVE_EMPATHY_MAP
	});
  }
  function setsaveEmpathyMap(res){
	responseMessage("success",res.message,"");
	return {
	  type: SAVE_EMPATHY_MAP,
	  payload: res
	}
  }
  function errsaveEmpathyMap(res){
	responseMessage("Error",res.message,"");
	return {
	  type: ERROR,
	  payload: res.response.data
	}
  }

export const fetchAllEmpathyLifeCycle = (dtId,projectVerId,epicId,epicVerId) => {
	return apiAction({
	  url: config.laravelBaseUrl + `getMultipleEmpathyLifeCycle/${dtId}/${projectVerId}/${epicId}/${epicVerId}`, 
	  onSuccess: setfetchAllEmpathyLifeCycle,
	  callback : 'fetchAllEmpathyLifeCycle',
      onFailure: () => console.log("Error occured in fetchAllEmpathyLifeCycle"), 
	  label: GET_ALL_EMPATHY_LIFECYCLE
	});
  }
  function setfetchAllEmpathyLifeCycle(res){	 
	return {
	  type: GET_ALL_EMPATHY_LIFECYCLE,
	  payload: res
	}
  }

export const fetchEmpathyNotes = (dtId,projectVerId,epicId,epicVerId,stkId) => {
	return apiAction({
	  url: config.laravelBaseUrl + `getEmpathyNotes/${dtId}/${projectVerId}/${epicId}/${epicVerId}/${stkId}`, 
	  onSuccess: setfetchEmpathyNotes,
      callback : 'fetchEmpathyNotes', 
      onFailure: () => console.log("Error occured in fetchEmpathyNotes"), 
	  label: EMPATHY_NOTES
	});
  }
  function setfetchEmpathyNotes(res){	  
	return {
	  type: EMPATHY_NOTES,
	  payload: res
	}
  }

export const fetchEmpathyNotesStakeHolders = (dtId,projectVerId,epicId,epicVerId) => {
	return apiAction({
	  url: config.laravelBaseUrl + `getEmpathyNotesStakeHolders/${dtId}/${projectVerId}/${epicId}/${epicVerId}`, 
	  onSuccess: setfetchEmpathyNotesStakeHolders,
      callback : 'fetchEmpathyNotesStakeHolders', 
      onFailure: () => console.log("Error occured in fetchEmpathyNotesStakeHolders"), 
	  label: EMPATHY_NOTES_STAKEHOLDERS
	});
  }
  function setfetchEmpathyNotesStakeHolders(res){	  
	return {
	  type: EMPATHY_NOTES_STAKEHOLDERS,
	  payload: res
	}
  }

  export const deleteEmpathyNotesStakeHolders = (dtId,projectVerId,epicId,epicVerId,stakeholderId) => {
	return apiAction({
	  url: config.laravelBaseUrl + `deleteAllEmpathyNotes/${dtId}/${projectVerId}/${epicId}/${epicVerId}/${stakeholderId}`, 
	  onSuccess: setdeleteEmpathyNotesStakeHolders,
      callback : 'deleteEmpathyNotesStakeHolders', 
      onFailure: () => console.log("Error occured in deleteEmpathyNotesStakeHolders"), 
	  label: DELETE_ALL_EMPATHY_NOTES
	});
  }
  function setdeleteEmpathyNotesStakeHolders(res){	  
	return {
	  type: DELETE_ALL_EMPATHY_NOTES,
	  payload: res
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

