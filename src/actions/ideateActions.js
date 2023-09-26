import { FETCH_EPICS, FETCH_IDEAS, ENABLE_SWOT_VOTING, FETCH_LOOKUPS, FETCH_PROBLEM_PINNING, FETCH_SWOT  } from './types';

import { apiAction } from './apiActions';
import { responseMessage } from '../utils/alert';
const config = require('../config');

export const fetchEpics = (project_id, epic_id) => {
    return apiAction({
        url: config.laravelBaseUrl+'getEpic/'+project_id+'/'+epic_id+'/0', 
        onSuccess: setfetchEpics,
        onFailure: () => console.log("Error occured in fetchEpics"),
        label: FETCH_EPICS
      });
}

export const fetchSwotEpics = (project_id, epic_id) => {
    return apiAction({
        url: config.laravelBaseUrl+'getEpic/'+project_id+'/'+epic_id+'/0', 
        onSuccess: setfetchEpics,
        callback : 'fetchSwotEpics',
        onFailure: () => console.log("Error occured in fetchEpics"),
        label: FETCH_EPICS
      });
}

function setfetchEpics(data){
    return {
        type: FETCH_EPICS,
		payload: data.data
    }
}

export const fetchSwotIdeas = (subEpicId) => {
    return apiAction({
        url: config.laravelBaseUrl+'getAllIdeas/'+subEpicId, 
        callback : 'fetchSwotIdeas',
        onSuccess: setFetchIdeas,
        onFailure: () => console.log("Error occured in fetchSwotIdeas"),
        label: FETCH_IDEAS
    });
}

export const setFetchIdeas = (data) => {
    return {
        type: FETCH_IDEAS,
		payload: data.data
    }
}

export const fetchSwot = (ideaId) => {
    return apiAction({
        url: config.laravelBaseUrl+'getSwot/'+ideaId, 
        onSuccess: setfetchSwot,
        onFailure: () => console.log("Error occured in fetchSwot"),
        label: FETCH_SWOT
    });
}

export const setfetchSwot = (data) => {
    return {
        type: FETCH_SWOT,
		payload: data.data
    }
}

export const saveSwot = (saveObj) => {
    return apiAction({
        url: config.laravelBaseUrl+'saveSwot', 
        method : 'POST',
        data : saveObj,
        callback : 'saveSwot',
        onSuccess: setSaveSwot,
        onFailure: () => console.log("Error occured in saveSwot"),
        label: 'SAVE_SWOT'
    })
}

const setSaveSwot = (data) => {
    responseMessage('success',data.message);
    return {
        type : 'SAVE_SWOT',
        payload : data.data
    }
}

export const saveDvf = (dvf) => {
    return apiAction({
        url: config.laravelBaseUrl+'saveIdeaScore', 
        method : 'POST',
        data : dvf,
        callback : 'saveDvf',
        onSuccess: setsaveDvf,
        onFailure: () => console.log("Error occured in saveDvf"),
        label: 'SAVE_DVF'
    })
}

const setsaveDvf = (data) => {
    responseMessage('success',data.message);

    return {
        type : 'SAVE_DVF',
        payload : data.data
    }
}

export const enableSwotVoting = (enVote) => {
    return apiAction({
        url: config.laravelBaseUrl+'enableVoting', 
        onSuccess: setenableSwotVoting,
        method : 'POST',
        data : enVote,
        callback : "enableSwotVoting",
        onFailure: () => console.log("Error occured in fetchSwotIdeas"),
        label: ENABLE_SWOT_VOTING
    });
}

export const setenableSwotVoting = (data) => {
    responseMessage('success',data.message);

    return {
        type: ENABLE_SWOT_VOTING,
        payload: data.data
    }
}

export const castVote = (vote) => {
    return apiAction({
        url: config.laravelBaseUrl+'castVote', 
        onSuccess: setcastVote,
        method : "POST",
        data : vote,
        callback : "castVote",
        onFailure: () => console.log("Error occured in castVote"),
        label: 'CAST_VOTE'
    });
}

export const setcastVote = (data) => {
    responseMessage('success',data.message);

    return {
        type: 'CAST_VOTE',
        payload: data.data
    }
}

export const markComplete = (complete) => {
    return apiAction({
        url: config.laravelBaseUrl+'markcompleteIdeaVoting', 
        onSuccess: setmarkComplete,
        method : "POST",
        data : complete,
        callback : "markComplete",
        onFailure: () => console.log("Error occured in markComplete"),
        label: 'MARK_COMPLETE_VOTING'
    });
}

export const setmarkComplete = (data) => {
    responseMessage('success',data.message);

    return {
        type: 'MARK_COMPLETE_VOTING',
        payload: data.data
    }
}

export const publishScores = (publishObj) => {
    return apiAction({
        url: config.laravelBaseUrl+'publishScore', 
        onSuccess: setpublishScores,
        method : "POST",
        data : publishObj,
        onFailure: () => console.log("Error occured in publishScores"),
        label: 'PUBLISH_SCORES'
    });
}

export const setpublishScores = (data) => {
    responseMessage('success',data.message);

    return {
        type: 'PUBLISH_SCORES',
        payload: data.data
    }
}

export const getAllVoters = (ideaId) => {
    return apiAction({
        url: config.laravelBaseUrl+`getAllVoters/${ideaId}`, 
        onSuccess: setgetAllVoters,
        onFailure: () => console.log("Error occured in getAllVoters"),
        label: 'GET_ALL_VOTERS'
    });
}

export const setgetAllVoters = (data) => {
    return {
        type: 'GET_ALL_VOTERS',
        payload: data.data
    }
}

export const getDvfScore = (subEpicId) => {
    return apiAction({
        url: config.laravelBaseUrl+`getIdeaScore/${subEpicId}`, 
        onSuccess: setgetDvfScore,
        onFailure: () => console.log("Error occured in getDvfScore"),
        label: 'GET_DVF_SCORE'
    });
}

export const setgetDvfScore = (data) => {
    return {
        type: 'GET_DVF_SCORE',
        payload: data.data
    }
}

export const setFetchLookups = (data) => {
    return {
        type: FETCH_LOOKUPS,
		payload: data.data
    }
}