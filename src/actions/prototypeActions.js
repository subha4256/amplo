import { FETCH_PROTOTYPE, SAVE_PROTOTYPE, SAVE_PROTOTYPE_SESSION, UPLOAD_FILE_PROTOTYPE, DELETE_SHAPES_TEXTS_POSTIDS, DELETE_PROTOTYPE_FILES } from './types';
import { apiAction } from './apiActions';
import { responseMessage } from '../utils/alert';
const config = require('../config');

export const fetchPrototype = (ideaId) => {
    return apiAction({
        url: config.laravelBaseUrl+'getPrototype/'+ideaId, 
        onSuccess: setfetchPrototype,
        onFailure: () => console.log("Error occured in fetchPrototype"),
        label: FETCH_PROTOTYPE
      });
}

function setfetchPrototype(data){
    return {
        type: FETCH_PROTOTYPE,
		payload: data.data
    }
}

export const deleteTextsPostIdsShapes = (id) => {
    return apiAction({
        url: config.laravelBaseUrl+'deleteShapeTextPostIds/'+id, 
        onSuccess: setDeleteTextsPostIdsShapes,
        method : "DELETE",
        onFailure: () => console.log("Error occured in deleteTextsPostIdsShapes"),
        label: DELETE_SHAPES_TEXTS_POSTIDS
      });
}

function setDeleteTextsPostIdsShapes(data){
    return {
        type: DELETE_SHAPES_TEXTS_POSTIDS,
		payload: data.data
    }
}

export const savePrototype = (prototypeObj) => {
    return apiAction({
        url : config.laravelBaseUrl+'savePrototype',
        method : 'POST',
        data : prototypeObj,
        callback : 'savePrototype',
        onSuccess : setSavePrototype,
        onFailure : () => console.log('Error occured in savePrototype'),
        label : SAVE_PROTOTYPE
    })
}

function setSavePrototype(data){
    responseMessage('success', data.message);
    return {
        type : SAVE_PROTOTYPE,
        payload : data.data
    }
}

export const savePrototypeSession = (prototypeSessionObj) => {
    return apiAction({
        url : config.laravelBaseUrl+'savePrototypeSession',
        method : 'POST',
        data : prototypeSessionObj,
        onSuccess : setSavePrototypeSession,
        onFailure : () => console.log('Error occured in savePrototypeSession'),
        label : SAVE_PROTOTYPE_SESSION
    })
}

function setSavePrototypeSession(data){
    responseMessage('success', data.message);
    return {
        type : SAVE_PROTOTYPE_SESSION,
        payload : data.data
    }
}

export const uploadFilePrototype = (formData) => {
    return apiAction({
        url : config.laravelBaseUrl+'uploadPrototypeFile',
        method : 'POST',
        data : formData,
        callback : 'uploadFilePrototype',
        onSuccess : setUploadFilePrototype,
        onFailure : () => console.log('Error occured in uploadFilePrototype'),
        label : UPLOAD_FILE_PROTOTYPE
    })
}

function setUploadFilePrototype(data){
    return {
        type : UPLOAD_FILE_PROTOTYPE,
        payload : data.data
    }
}

export const deletePrototypeFile = (path) => {
    return apiAction({
        url : config.laravelBaseUrl+'deletePrototypeFile',
        method : 'DELETE',
        data : path,
        onSuccess : setDeletePrototypeFile,
        onFailure : () => console.log('Error occured in deletePrototypeFile'),
        label : DELETE_PROTOTYPE_FILES
    })
}

function setDeletePrototypeFile(data){
    return {
        type : DELETE_PROTOTYPE_FILES,
        payload : data.data
    }
}