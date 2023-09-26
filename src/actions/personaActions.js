import { SAVE_PERSONA_DETAILS, GET_ALL_PERSONA, GET_PERSONA_DETAILS, GET_ALL_LIFECYCLE_FOR_PERSONA, GET_ALL_STAKLEHOLDERS_FOR_PERSONA, GET_ALL_MOTIVATION_CATEGORY_FOR_PERSONA, GET_ALL_PERSONALITY_CATEGORY_FOR_PERSONA, DELETE_PERSONA } from './types';
import { apiAction } from './apiActions';
import  { responseMessage } from '../utils/alert';

const config = require('../config');

/* Save Persona Details */
export const savePersonaDetails = (fd) => {
    return apiAction({
        url: config.laravelBaseUrl+'saveEmpathyPersona', 
        method: "POST",
        data: fd, 
        callback : 'savePersonaDetails',
        onSuccess: setsavePersonaDetails,
        onFailure: () => {},
        label: SAVE_PERSONA_DETAILS
    });
}
  
function setsavePersonaDetails(res){
    responseMessage("success",res.message,"");
    return {
        type: SAVE_PERSONA_DETAILS,
        payload: res
    }
}

/* Get All Persona */
export const getAllPersona = (projectId, projectVersionId, epicId, epicVersionId) => {
    return apiAction({
        url: config.laravelBaseUrl + `getAllEmpathyPersona/${projectId}/${projectVersionId}/${epicId}/${epicVersionId}`, 
        onSuccess: setgetAllPersona,
        callback : 'getAllPersona',
        onFailure: () => {},
        label: GET_ALL_PERSONA
    });
}
  
function setgetAllPersona(data){
    return {
        type: GET_ALL_PERSONA,
        payload: data.data
    }
}

/* Get Persona Details */
export const getPersonaDetails = (projectId, projectVersionId, epicId, epicVersionId, personaId) => {
    return apiAction({
        url: config.laravelBaseUrl + `getEmpathyPersonaDetails/${projectId}/${projectVersionId}/${epicId}/${epicVersionId}/${personaId}`, 
        onSuccess: setgetPersonaDetails,
    //   callback : 'getPersonaDetails',
        onFailure: () => {},
        label: GET_PERSONA_DETAILS
    });
}
  
function setgetPersonaDetails(data){
    return {
        type: GET_PERSONA_DETAILS,
        payload: data.data
    }
}

/* Get All lifecycles for Persona */
export const getAllLifecycleForPersona = (projectId, epicId) => {
    return apiAction({
        url: config.laravelBaseUrl + `getAllLifeCycle/${projectId}/${epicId}`, 
        onSuccess: setgetAllLifecycleForPersona,
    //   callback : 'getAllLifecycleForPersona',
        onFailure: () => {},
        label: 'NEW_GET_ALL_LIFECYCLE_FOR_PERSONA'
    });
}
  
function setgetAllLifecycleForPersona(data){
    return {
        type: 'NEW_GET_ALL_LIFECYCLE_FOR_PERSONA',
        payload: data.data
    }
}

/* Get All Stakeholders for Persona */
export const getAllStakeholdersForPersona = (projectId, epicId) => {
    return apiAction({
        url: config.laravelBaseUrl + `getAllStakeholders/${projectId}/${epicId}`, 
        onSuccess: setgetAllStakeholdersForPersona,
    //   callback : 'getAllStakeholdersForPersona',
        onFailure: () => {},
        label: GET_ALL_STAKLEHOLDERS_FOR_PERSONA
    });
}
  
function setgetAllStakeholdersForPersona(data){
    return {
        type: GET_ALL_STAKLEHOLDERS_FOR_PERSONA,
        payload: data.data
    }
}

/* Get All Motivation Categories */
export const getAllMotivationCategories = () => {
    return apiAction({
        url: config.laravelBaseUrl + `getMotivationCategory`, 
        onSuccess: setgetAllMotivationCategories,
    //   callback : 'getAllMotivationCategories',
        onFailure: () => {},
        label: GET_ALL_MOTIVATION_CATEGORY_FOR_PERSONA
    });
}
  
function setgetAllMotivationCategories(data){
    return {
        type: GET_ALL_MOTIVATION_CATEGORY_FOR_PERSONA,
        payload: data.data
    }
}

/* Get All Personality Categories */
export const getAllPersonalityCategories = () => {
    return apiAction({
        url: config.laravelBaseUrl + `getPersonalityCategory`, 
        onSuccess: setgetAllPersonalityCategories,
    //   callback : 'getAllPersonalityCategories',
        onFailure: () => {},
        label: GET_ALL_PERSONALITY_CATEGORY_FOR_PERSONA
    });
}
  
function setgetAllPersonalityCategories(data){
    return {
        type: GET_ALL_PERSONALITY_CATEGORY_FOR_PERSONA,
        payload: data.data
    }
}

/* Delete Persons */
export const deletePersona = (projectId, projectVersionId, epicId, epicVersionId, PersonaId) => {
    return apiAction({
        url: config.laravelBaseUrl + `deletePersona/${projectId}/${projectVersionId}/${epicId}/${epicVersionId}/${PersonaId}`, 
        onSuccess: setdeletePersona,
        callback : 'deletePersona',
        onFailure: () => {},
        label: DELETE_PERSONA
    });
}
  
function setdeletePersona(data){
    responseMessage("success",data.message,"");
    return {
        type: DELETE_PERSONA,
        payload: data.data
    }
}