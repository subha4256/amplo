import { GET_ERRORS } from './types';
import {responseMessage} from '../utils/alert';
import { apiAction } from './apiActions';
const config = require('../config');

/* Action: Changed uploadFiles function
By: Syed On: 3/3/2020 */

export const uploadFiles = (fileObj) => {
    return apiAction({
        url: config.laravelBaseUrl+'post_upload_file', 
        method: "POST",
        data: fileObj,
        onSuccess: setuploadFiles,
        onFailure: failureOfuploadFiles,
        label: "uploadFiles"
      });
}

function failureOfuploadFiles(res){
    let messages = res.response.data.message
    if(Array.isArray(messages)){
        messages = messages.map(msg => msg.Message)
        responseMessage("error",messages.join("\n"),"");
    }else{
        responseMessage("error",messages,"");
    }
}

function setuploadFiles(res){
    responseMessage("success",res.message,"");
    setTimeout(()=>{
        sessionStorage.setItem('refreshCapabilityModelling','refresh');
        window.close();
    },2000) 
    return {
        type: "uploadFiles",
        payload: res.data
    }
}

export const CMProjectImportUploadFile = (fileObj) => {
    return apiAction({
        url: config.laravelBaseUrl+'importCMProject', 
        method: "POST",
        data: fileObj,
        onSuccess: setCMProjectImportUploadFile,
        onFailure: failureOfCMProjectImportUploadFile,
        label: "CMProjectImportUploadFile"
      });
}

function failureOfCMProjectImportUploadFile(res){
    let messages = res.response.data.message
    if(Array.isArray(messages)){
        messages = messages.map(msg => msg.Message)
        responseMessage("error",messages.join("\n"),"");
    }else{
        responseMessage("error",messages,"");
    }
}

function setCMProjectImportUploadFile(res){
    responseMessage("success",res.message,"");
    setTimeout(()=>{
        sessionStorage.setItem('refreshCapability','refresh');
        window.close();
    },2000) 
    return {
        type: "CMProjectImportUploadFile",
        payload: res.data
    }
}

export const uploadFilesValidate = (fileObj) => {
    return apiAction({
        url: config.laravelBaseUrl+'checkKPIIdInKpiSheet', 
        method: "POST",
        data: fileObj,
        onSuccess: setuploadFilesValidate,
        callback:'uploadFilesValidate',
        onFailure: () => console.log("Error occured in uploadFilesValidate"),
        label: "uploadFilesValidate"
      });
}

function setuploadFilesValidate(res){
    return {
        type: "uploadFilesValidate",
        payload: res.data
    }
}

export const kpiuploadFiles = (fileObj) => {
    return apiAction({
        url: config.laravelBaseUrl+'importKpi', 
        method: "POST",
        data: fileObj,
        onSuccess: setkpiuploadFiles,
        onFailure: () => console.log("Error occured in uploadFiles"),
        label: "setkpiuploadFiles"
      });
}

function setkpiuploadFiles(res){
    responseMessage("success",res.message,"");
    setTimeout(()=>{
        sessionStorage.setItem('refreshKpiPage','refresh');
        window.close();
    },2000) 
    return {
        type: "setkpiuploadFiles",
        payload: res.data
    }
}

export const kpiAudituploadFiles = (fileObj) => {
    return apiAction({
        url: config.laravelBaseUrl+'importKpiAudit', 
        method: "POST",
        data: fileObj,
        onSuccess: setkpiAudituploadFiles,
        onFailure: () => console.log("Error occured in uploadFiles"),
        label: "setkpiAudituploadFiles"
      });
}

function setkpiAudituploadFiles(res){
    responseMessage("success",res.message,"");
    setTimeout(()=>{
        sessionStorage.setItem('refreshKpiAuditPage','refresh');
        window.close();
    },2000) 
    return {
        type: "setkpiAudituploadFiles",
        payload: res.data
    }
}

export const questionsBankUploadFile = (fileObj) => {
    return apiAction({
        url: config.laravelBaseUrl+'importClientQuestionBank', 
        method: "POST",
        data: fileObj,
        onSuccess: setQuestionsBankUploadFile,
        callback : 'questionsBankUploadFile',
        onFailure: () => console.log("Error occured in questionsBankUploadFile"),
        label: "QUESTIONS_BANK_UPLOAD_FILE"
    });
}

function setQuestionsBankUploadFile(res){
    // responseMessage("success",res.message,""); 
    return {
        type: "QUESTIONS_BANK_UPLOAD_FILE",
        payload: res.data
    }
}

export const questionsBankAdminUploadFile = (fileObj) => {
    return apiAction({
        url: config.laravelBaseUrl+'importAmploQuestionBank', 
        method: "POST",
        data: fileObj,
        callback : 'questionsBankAdminUploadFile',
        onSuccess: setQuestionsBankAdminUploadFile,
        onFailure: () => console.log("Error occured in questionsBankAdminUploadFile"),
        label: "QUESTIONS_BANK_ADMIN_UPLOAD_FILE"
      });
}

function setQuestionsBankAdminUploadFile(res){
  
    return {
        type: "QUESTIONS_BANK_ADMIN_UPLOAD_FILE",
        payload: res.data
    }
}

// e bidata uploads
export const uploadEbiFiles = (fileObj) => {
    return apiAction({
        url: config.laravelBaseUrl+'import-ebidata', 
        method: "POST",
        data: fileObj,
        onSuccess: setEbifileUploads,
        onFailure: failureOfEbiupload,
        label: "uploadFiles"
      });
}

function failureOfEbiupload(res){
    let messages = res.response.data.message
    if(Array.isArray(messages)){
        messages = messages.map(msg => msg.Message)
        responseMessage("error",messages.join("\n"),"");
    }else{
        responseMessage("error",messages,"");
    }
}

function setEbifileUploads(res){
    responseMessage("success",res.message,"");
    setTimeout(()=>{
        // sessionStorage.setItem('refreshCapabilityModelling','refresh');
        
    },2000) 
    return {
        type: "uploadFiles",
        payload: res.data
    }
}

export const CMAdminTemplateImportUploadFile = (fileObj) => {
    return apiAction({
        url: config.laravelBaseUrl+'importAmploCMTemplate', 
        method: "POST",
        data: fileObj,
        onSuccess: setCMAdminTemplateImportUploadFile,
        onFailure: failureOfCMAdminTemplateImportUploadFile,
        label: "CMAdminTemplateImportUploadFile"
      });
}

function failureOfCMAdminTemplateImportUploadFile(res){
    let messages = res.response.data.message
    if(Array.isArray(messages)){
        messages = messages.map(msg => msg.Message)
        responseMessage("error",messages.join("\n"),"");
    }else{
        responseMessage("error",messages,"");
    }
}

function setCMAdminTemplateImportUploadFile(res){
    responseMessage("success",res.message,"");
    setTimeout(()=>{
        sessionStorage.setItem('refreshAdminTemplate','refresh');
        window.close();
    },2000) 
    return {
        type: "CMAdminTemplateImportUploadFile",
        payload: res.data
    }
}