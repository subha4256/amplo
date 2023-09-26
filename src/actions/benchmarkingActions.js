import { SAVE_AMPLO_QUESTIONS_ANSWERS, SAVE_QUESTIONS_BANK, SAVE_CLIENT_QUESTIONS_BANK, SAVE_CLIENT_DOMAINS, SAVE_AMPLO_DOMAINS, GET_AMPLO_QUESTIONS_BANK, GET_CLIENT_QUESTIONS_BANK, GET_AMPLO_DOMAINS, GET_CLIENT_DOMAINS, GET_AMPLO_QUESTIONS_BY_DOMAIN, GET_CLIENT_QUESTIONS_BY_DOMAIN, CURRENT_SELECTED_DOMAIN, CURRENT_SELECTED_QUESTIONS_BANK, SAVE_CLIENT_QUESTIONS_ANSWERS, CURRENT_SELECTED_DOMAIN_AMPLO, CURRENT_SELECTED_QUESTIONS_BANK_AMPLO, GET_ALL_QUESTION_STYLES_LISTING, SAVE_QUESTIONS_ATTACHMENT, GET_QUESTIONS_ATTACHMENT, GET_CLIENT_SIDEBAR_DOMAINS_QUESTIONS, DELETE_CLIENT_ATTACHMENTS, DELETE_CLIENT_QUESTIONS, DELETE_AMPLO_QUESTIONS, DELETE_CLIENT_DOMAINS, DELETE_AMPLO_DOMAINS, DELETE_CLIENT_QUESTIONS_BANK, DELETE_AMPLO_QUESTIONS_BANK, SAVE_AMPLO_QUESTIONS_ATTACHMENT, GET_AMPLO_QUESTIONS_ATTACHMENT, DELETE_AMPLO_ATTACHMENTS, GET_AMPLO_SIDEBAR_DOMAINS_QUESTIONS, GET_CLIENT_ASSIGNMENT, SAVE_CLIENT_ASSIGNMENT, ASSIGN_QUESTIONS_BANK_TO_AMPMARKING_PROJECT, GET_AFLY_SCORE, SAVE_CLIENT_DUPLICATE_QUESTIONS_BANK, SAVE_AMPLO_DUPLICATE_QUESTIONS_BANK, SAVE_CLIENT_ASSIGNED_INDUSTRY_CLASSIFICATION, SAVE_AMPLO_ASSIGNED_INDUSTRY_CLASSIFICATION, GET_AFLY_DOMAIN_SCORE, EXPORT_QUESTIONS_BANK, EXPORT_AMPLO_QUESTIONS_BANK, IMPORT_GET_AMPLO_QUESTIONSBANK_BY_BATCHID, IMPORT_GET_AMPLO_DOMAINS_BY_QUESTIONBANK, IMPORT_GET_QUESTIONSBANK_BY_BATCHID, IMPORT_GET_DOMAINS_BY_QUESTIONBANK, IMPORT_GET_QUESTIONS_BY_DOMAIN, IMPORT_GET_INTERFACE_ATTACHMENT_BY_BATCHID, IMPORT_GET_AMPLO_QUESTIONS_BY_DOMAIN, IMPORT_GET_AMPLO_INTERFACE_ATTACHMENT_BY_BATCHID, GET_AMPLO_CLIENT_QUESTIONS_BANK } from './types';

import { apiAction } from './apiActions';
import { responseMessage } from '../utils/alert';
const config = require('../config');

/* Save Amplo Questions Answers */
export const saveAmploQuestionsAnswers = (QBObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'saveAmploQuesionsAnswers',
    method: "POST",
    data: QBObj,
    callback: 'saveAmploQuestionsAnswers',
    onSuccess: setsaveAmploQuestionsAnswers,
    onFailure: () => { responseMessage("error", "Error Occured while saving Questions Answers.") },
    label: SAVE_AMPLO_QUESTIONS_ANSWERS
  });
}

function setsaveAmploQuestionsAnswers(res) {
  responseMessage("success", res.message, "");
  return {
    type: SAVE_AMPLO_QUESTIONS_ANSWERS,
    payload: res
  }
}

/* Save Client Questions Answers */
export const saveClientQuestionsAnswers = (QBObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'saveClientQuesionsAnswers',
    method: "POST",
    data: QBObj,
    callback: 'saveClientQuestionsAnswers',
    onSuccess: setsaveClientQuestionsAnswers,
    onFailure: () => { responseMessage("error", "Error Occured while saving Questions Answers.") },
    label: SAVE_CLIENT_QUESTIONS_ANSWERS
  });
}

function setsaveClientQuestionsAnswers(res) {
  responseMessage("success", res.message, "");
  return {
    type: SAVE_CLIENT_QUESTIONS_ANSWERS,
    payload: res
  }
}

/* Save Client Questions Bank */
export const saveClientQuestionsBank = (QBObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'saveClientQuestionBank',
    method: "POST",
    data: QBObj,
    onSuccess: setsaveClientQuestionsBank,
    callback: "saveClientQuestionsBank",
    onFailure: () => { },
    label: SAVE_CLIENT_QUESTIONS_BANK
  });

}

function setsaveClientQuestionsBank(res) {

  return {
    type: SAVE_CLIENT_QUESTIONS_BANK,
    payload: res

  }

}

/* Save Amplo Questions Bank */
export const saveAmploQuestionsBank = (QBObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'saveAmploQuestionBank',
    method: "POST",
    data: QBObj,
    onSuccess: setsaveAmploQuestionsBank,
    callback: "saveAmploQuestionsBank",
    onFailure: () => { responseMessage("error", "Error Occured while saving Questions Bank.") },
    label: SAVE_QUESTIONS_BANK
  });
}

function setsaveAmploQuestionsBank(res) {
  responseMessage("success", res.message, "");
  return {
    type: SAVE_QUESTIONS_BANK,
    payload: res
  }
}

/* Save Amplo Domains */
export const saveAmploDomains = (QBObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'saveAmploDomain',
    method: "POST",
    data: QBObj,
    callback: 'saveAmploDomains',
    onSuccess: setsaveAmploDomains,
    onFailure: () => { responseMessage("error", "Error Occured while saving Questions Bank.") },
    label: SAVE_AMPLO_DOMAINS
  });
}

function setsaveAmploDomains(res) {
  responseMessage("success", res.message, "");
  return {
    type: SAVE_AMPLO_DOMAINS,
    payload: res
  }
}

/* Save Client Domains */
export const saveClientDomains = (QBObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'saveClientDomain',
    method: "POST",
    data: QBObj,
    callback: 'saveClientDomains',
    onSuccess: setsaveClientDomains,
    onFailure: () => { responseMessage("error", "Error Occured while saving Questions Bank.") },
    label: SAVE_CLIENT_DOMAINS
  });
}

function setsaveClientDomains(res) {
  responseMessage("success", res.message, "");
  return {
    type: SAVE_CLIENT_DOMAINS,
    payload: res
  }
}

/* Get Amplo Questions Bank */
export const getAmploQuestionsBank = () => {
  return apiAction({
    url: config.laravelBaseUrl + 'getAmploQuestionBank',
    onSuccess: setgetAmploQuestionsBank,
    callback: 'getAmploQuestionsBank',
    onFailure: () => console.log("Error occured in getAmploQuestionsBank"),
    label: GET_AMPLO_QUESTIONS_BANK
  });
}

function setgetAmploQuestionsBank(data) {
  return {
    type: GET_AMPLO_QUESTIONS_BANK,
    payload: data.data
  }
}

/* Get Amplo and Client Questions Bank */
export const getAmploAndClientQuestionsBank = () => {
  return apiAction({
    url: config.laravelBaseUrl + 'getAmploClientQuestionBank',
    onSuccess: setgetAmploAndClientQuestionsBank,
    // callback : 'getAmploAndClientQuestionsBank',
    onFailure: () => console.log("Error occured in getAmploAndClientQuestionsBank"),
    label: GET_AMPLO_CLIENT_QUESTIONS_BANK
  });
}

function setgetAmploAndClientQuestionsBank(data) {
  return {
    type: GET_AMPLO_CLIENT_QUESTIONS_BANK,
    payload: data.data
  }
}

/* Get Client Questions Bank */
export const getClientQuestionsBank = (mode) => {
  return apiAction({
    url: config.laravelBaseUrl + 'getClientQuestionBank/' + mode,
    onSuccess: setgetClientQuestionsBank,
    callback: 'getClientQuestionsBank',
    onFailure: () => console.log("Error occured in getClientQuestionsBank"),
    label: GET_CLIENT_QUESTIONS_BANK
  });
}

function setgetClientQuestionsBank(data) {
  return {
    type: GET_CLIENT_QUESTIONS_BANK,
    payload: data.data
  }
}

/* Get Amplo Domains */
export const getAmploDomains = (id) => {
  return apiAction({
    url: config.laravelBaseUrl + 'getAmploDomains/' + id,
    onSuccess: setgetAmploDomains,
    onFailure: () => console.log("Error occured in getAmploDomains"),
    label: GET_AMPLO_DOMAINS
  });
}

function setgetAmploDomains(data) {
  return {
    type: GET_AMPLO_DOMAINS,
    payload: data.data
  }
}

/* Get Client Domains */
export const getClientDomains = (id) => {
  return apiAction({
    url: config.laravelBaseUrl + 'getClientDomains/' + id,
    onSuccess: setgetClientDomains,
    onFailure: () => console.log("Error occured in getClientDomains"),
    label: GET_CLIENT_DOMAINS
  });
}

function setgetClientDomains(data) {
  return {
    type: GET_CLIENT_DOMAINS,
    payload: data.data
  }
}

/* Get Amplo Questions By Domains */
export const getAmploQuestionsByDomain = (DomainId, QuestionsBankId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'getAmploQuesionsAnswers/' + DomainId + '/' + QuestionsBankId,
    onSuccess: setgetAmploQuestionsByDomain,
    onFailure: () => console.log("Error occured in getAmploQuestionsByDomain"),
    label: GET_AMPLO_QUESTIONS_BY_DOMAIN
  });
}

function setgetAmploQuestionsByDomain(data) {
  return {
    type: GET_AMPLO_QUESTIONS_BY_DOMAIN,
    payload: data.data
  }
}

/* Get Client Questions By Domains */
export const getClientQuestionsByDomain = (DomainId, QuestionsBankId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'getClientQuestionsAnswers/' + DomainId + '/' + QuestionsBankId,
    onSuccess: setgetClientQuestionsByDomain,
    onFailure: () => { },
    label: GET_CLIENT_QUESTIONS_BY_DOMAIN
  });
}

function setgetClientQuestionsByDomain(data) {
  return {
    type: GET_CLIENT_QUESTIONS_BY_DOMAIN,
    payload: data.data
  }
}

export const setCurrentSelectedDomain = domain => dispatch => {
  dispatch({
    type: CURRENT_SELECTED_DOMAIN,
    payload: domain
  })
}

export const setCurrentSelectedQuestionsBank = QuestionBank => dispatch => {
  dispatch({
    type: CURRENT_SELECTED_QUESTIONS_BANK,
    payload: QuestionBank
  })
}

export const setCurrentSelectedDomainAmplo = domain => dispatch => {
  dispatch({
    type: CURRENT_SELECTED_DOMAIN_AMPLO,
    payload: domain
  })
}

export const setCurrentSelectedQuestionsBankAmplo = QuestionBank => dispatch => {
  dispatch({
    type: CURRENT_SELECTED_QUESTIONS_BANK_AMPLO,
    payload: QuestionBank
  })
}

/* Get All styles */
export const getAllStylesListing = () => {
  console.log('FINDING STYLE')
  return apiAction({
    url: config.laravelBaseUrl + 'getBmListStyle',
    method: "POST",
    data: {
      StyleId: 0,
      StyleName: ""
    },
    onSuccess: setgetAllStylesListing,
    onFailure: () => { console.log("Error Occured while saving fetching Styles.") },
    label: GET_ALL_QUESTION_STYLES_LISTING
  });
}

function setgetAllStylesListing(res) {
  return {
    type: GET_ALL_QUESTION_STYLES_LISTING,
    payload: res.data
  }
}

/* Save Question attachment */
export const saveQuestionsAttachment = (attchObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'saveClientAttachment',
    method: "POST",
    data: attchObj,
    onSuccess: setsaveQuestionsAttachment,
    onFailure: () => { console.log("Error Occured while saving attachment.") },
    label: SAVE_QUESTIONS_ATTACHMENT
  });
}

function setsaveQuestionsAttachment(res) {
  responseMessage("success", res.message, "");
  return {
    type: SAVE_QUESTIONS_ATTACHMENT,
    payload: res.data
  }
}

/* Get Questions attachment */
export const getQuestionsAttachment = (QuestionId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'getClientAttachment/' + QuestionId,
    onSuccess: setgetQuestionsAttachment,
    onFailure: () => { },
    label: GET_QUESTIONS_ATTACHMENT
  });
}

function setgetQuestionsAttachment(data) {
  return {
    type: GET_QUESTIONS_ATTACHMENT,
    payload: data.data
  }
}

/* Save Amplo Question attachment */
export const saveAmploQuestionsAttachment = (attchObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'saveAmploAttachment',
    method: "POST",
    data: attchObj,
    onSuccess: setsaveAmploQuestionsAttachment,
    onFailure: () => { console.log("Error Occured while saving attachment.") },
    label: SAVE_AMPLO_QUESTIONS_ATTACHMENT
  });
}

function setsaveAmploQuestionsAttachment(res) {
  responseMessage("success", res.message, "");
  return {
    type: SAVE_AMPLO_QUESTIONS_ATTACHMENT,
    payload: res.data
  }
}

/* Get Amplo Questions attachment */
export const getAmploQuestionsAttachment = (QuestionId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'getAmploAttachment/' + QuestionId,
    onSuccess: setgetAmploQuestionsAttachment,
    onFailure: () => { },
    label: GET_AMPLO_QUESTIONS_ATTACHMENT
  });
}

function setgetAmploQuestionsAttachment(data) {
  return {
    type: GET_AMPLO_QUESTIONS_ATTACHMENT,
    payload: data.data
  }
}

/* Delete Amplo Attachments */
export const deleteAmploAttachment = (attchId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'deleteAmploAttachment/' + attchId,
    onSuccess: setdeleteAmploAttachment,
    onFailure: () => { },
    callback: "deleteAmploAttachment",
    label: DELETE_AMPLO_ATTACHMENTS
  });
}

function setdeleteAmploAttachment(data) {
  responseMessage("success", data.message, "");
  return {
    type: DELETE_AMPLO_ATTACHMENTS,
    payload: data.data
  }
}

/* Get Client Sidebar Questions */
export const getClientSidebarQuestions = (QBId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'getClientDomainQuestions/' + QBId,
    onSuccess: setgetClientSidebarQuestions,
    onFailure: () => { },
    callback: "getClientSidebarQuestions",
    label: GET_CLIENT_SIDEBAR_DOMAINS_QUESTIONS
  });
}

function setgetClientSidebarQuestions(data) {
  return {
    type: GET_CLIENT_SIDEBAR_DOMAINS_QUESTIONS,
    payload: data.data
  }
}

/* Get Amplo Sidebar Questions */
export const getAmploSidebarQuestions = (QBId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'getAmploDomainQuestions/' + QBId,
    onSuccess: setgetAmploSidebarQuestions,
    onFailure: () => { },
    callback: "getAmploSidebarQuestions",
    label: GET_AMPLO_SIDEBAR_DOMAINS_QUESTIONS
  });
}

function setgetAmploSidebarQuestions(data) {
  return {
    type: GET_AMPLO_SIDEBAR_DOMAINS_QUESTIONS,
    payload: data.data
  }
}

/* Delete Client Attachments */
export const deleteClientAttachment = (attchId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'deleteClientAttachment/' + attchId,
    onSuccess: setdeleteClientAttachment,
    onFailure: () => { },
    callback: "deleteClientAttachment",
    label: DELETE_CLIENT_ATTACHMENTS
  });
}

function setdeleteClientAttachment(data) {
  responseMessage("success", data.message, "");
  return {
    type: DELETE_CLIENT_ATTACHMENTS,
    payload: data.data
  }
}

/* Delete Client Questions */
export const deleteClientQuestions = (quesId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'deleteClientQuestion/' + quesId,
    onSuccess: setdeleteClientQuestions,
    onFailure: () => { },
    callback: "deleteClientQuestions",
    label: DELETE_CLIENT_QUESTIONS
  });
}

function setdeleteClientQuestions(data) {
  responseMessage("success", data.message, "");
  return {
    type: DELETE_CLIENT_QUESTIONS,
    payload: data.data
  }
}

/* Delete Amplo Questions */
export const deleteAmploQuestions = (quesId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'deleteAmploQuestion/' + quesId,
    onSuccess: setdeleteAmploQuestions,
    onFailure: () => { },
    callback: "deleteAmploQuestions",
    label: DELETE_AMPLO_QUESTIONS
  });
}

function setdeleteAmploQuestions(data) {
  responseMessage("success", data.message, "");
  return {
    type: DELETE_AMPLO_QUESTIONS,
    payload: data.data
  }
}

/* Delete Client Domains */
export const deleteClientDomains = (domId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'deleteClientDomain/' + domId,
    onSuccess: setdeleteClientDomains,
    onFailure: () => { },
    callback: "deleteClientDomains",
    label: DELETE_CLIENT_DOMAINS
  });
}

function setdeleteClientDomains(data) {
  responseMessage("success", data.message, "");
  return {
    type: DELETE_CLIENT_DOMAINS,
    payload: data.data
  }
}

/* Delete Amplo Domains */
export const deleteAmploDomains = (domId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'deleteAmploDomain/' + domId,
    onSuccess: setdeleteAmploDomains,
    onFailure: () => { },
    callback: "deleteAmploDomains",
    label: DELETE_AMPLO_DOMAINS
  });
}

function setdeleteAmploDomains(data) {
  responseMessage("success", data.message, "");
  return {
    type: DELETE_AMPLO_DOMAINS,
    payload: data.data
  }
}

/* Delete Client Questions Bank */
export const deleteClientQuestionsBank = (QBId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'deleteClientQuestionBank/' + QBId,
    onSuccess: setdeleteClientQuestionsBank,
    onFailure: () => { },
    callback: "deleteClientQuestionsBank",
    label: DELETE_CLIENT_QUESTIONS_BANK
  });
}

function setdeleteClientQuestionsBank(data) {
  responseMessage("success", data.message, "");
  return {
    type: DELETE_CLIENT_QUESTIONS_BANK,
    payload: data.data
  }
}

/* Delete Amplo Questions Bank */
export const deleteAmploQuestionsBank = (QBId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'deleteAmploQuestionBank/' + QBId,
    onSuccess: setdeleteAmploQuestionsBank,
    onFailure: () => { },
    callback: "deleteAmploQuestionsBank",
    label: DELETE_AMPLO_QUESTIONS_BANK
  });
}

function setdeleteAmploQuestionsBank(data) {
  responseMessage("success", data.message, "");
  return {
    type: DELETE_AMPLO_QUESTIONS_BANK,
    payload: data.data
  }
}

/* Get Client Assignment Questions Bank */
export const getClientAssignment = (QBId) => {
  return apiAction({
    url: config.laravelBaseUrl + 'getClientAssignment/' + QBId,
    onSuccess: setgetClientAssignment,
    onFailure: () => { },
    label: GET_CLIENT_ASSIGNMENT
  });
}

function setgetClientAssignment(data) {
  return {
    type: GET_CLIENT_ASSIGNMENT,
    payload: data.data
  }
}

/* Save Client Assignment */
export const saveClientAssignment = (assignObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'saveClientAssignment',
    method: "POST",
    data: assignObj,
    callback: 'saveClientAssignment',
    onSuccess: setsaveClientAssignment,
    onFailure: () => { responseMessage("error", "Error Occured while saving Questions Answers.") },
    label: SAVE_CLIENT_ASSIGNMENT
  });
}

function setsaveClientAssignment(res) {
  responseMessage("success", res.message, "");
  return {
    type: SAVE_CLIENT_ASSIGNMENT,
    payload: res
  }
}

/* Assign Questions Bank to AmpMarking Project */
export const assignQuestionsBankToAmpMarkingProject = (assignObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'generateDataForAmpMarking',
    method: "POST",
    data: assignObj,
    callback: 'assignQuestionsBankToAmpMarkingProject',
    onSuccess: setassignQuestionsBankToAmpMarkingProject,
    onFailure: () => { responseMessage("error", "Error Occured while saving Questions Answers.") },
    label: ASSIGN_QUESTIONS_BANK_TO_AMPMARKING_PROJECT
  });
}

function setassignQuestionsBankToAmpMarkingProject(res) {
  responseMessage("success", res.message, "");
  return {
    type: ASSIGN_QUESTIONS_BANK_TO_AMPMARKING_PROJECT,
    payload: res
  }
}

/* Get AFLY Score */
export const getAflyScore = (id) => {
  return apiAction({
    url: config.laravelBaseUrl + 'getAflyScores/' + id,
    onSuccess: setgetAflyScore,
    onFailure: () => { },
    callback: "getAflyScore",
    label: GET_AFLY_SCORE
  });
}

function setgetAflyScore(data) {
  return {
    type: GET_AFLY_SCORE,
    payload: data.data
  }
}

/* Get AFLY Domain Score */
export const getAflyDomainScore = (data) => {
  return apiAction({
    url: config.laravelBaseUrl + 'getAflyScoresDomainWise',
    method: "POST",
    data: data,
    onSuccess: setgetAflyDomainScore,
    onFailure: () => { },
    label: GET_AFLY_DOMAIN_SCORE
  });
}

function setgetAflyDomainScore(data) {
  return {
    type: GET_AFLY_DOMAIN_SCORE,
    payload: data.data
  }
}

/* Save Client Duplicate Questions Bank */
export const duplicateClientQuestionsBank = (QBObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'clientDuplicateQuestionBank',
    method: "POST",
    data: QBObj,
    callback: 'duplicateClientQuestionsBank',
    onSuccess: setduplicateClientQuestionsBank,
    onFailure: () => { responseMessage("error", "Error Occured while saving Questions Answers.") },
    label: SAVE_CLIENT_DUPLICATE_QUESTIONS_BANK
  });
}

function setduplicateClientQuestionsBank(res) {
  responseMessage("success", res.message, "");
  return {
    type: SAVE_CLIENT_DUPLICATE_QUESTIONS_BANK,
    payload: res
  }
}

/* Save Amplo Duplicate Questions Bank */
export const duplicateAmploQuestionsBank = (QBObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'amploDuplicateQuestionBank',
    method: "POST",
    data: QBObj,
    callback: 'duplicateAmploQuestionsBank',
    onSuccess: setduplicateAmploQuestionsBank,
    onFailure: () => { responseMessage("error", "Error Occured while saving Questions Answers.") },
    label: SAVE_AMPLO_DUPLICATE_QUESTIONS_BANK
  });
}

function setduplicateAmploQuestionsBank(res) {
  responseMessage("success", res.message, "");
  return {
    type: SAVE_AMPLO_DUPLICATE_QUESTIONS_BANK,
    payload: res
  }
}

/* Save Client Assigned Industry Classification */
export const saveClientAssignedIndustryClassification = (QBObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'updateClientQuestionBankIndustry',
    method: "POST",
    data: QBObj,
    callback: 'saveClientAssignedIndustryClassification',
    onSuccess: setsaveClientAssignedIndustryClassification,
    onFailure: () => { responseMessage("error", "Error Occured while saving Questions Answers.") },
    label: SAVE_CLIENT_ASSIGNED_INDUSTRY_CLASSIFICATION
  });
}

function setsaveClientAssignedIndustryClassification(res) {
  responseMessage("success", res.message, "");
  return {
    type: SAVE_CLIENT_ASSIGNED_INDUSTRY_CLASSIFICATION,
    payload: res
  }
}

/* Save Amplo Assigned Industry Classification */
export const saveAmploAssignedIndustryClassification = (QBObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'updateAmploQuestionBankIndustry',
    method: "POST",
    data: QBObj,
    callback: 'saveAmploAssignedIndustryClassification',
    onSuccess: setsaveAmploAssignedIndustryClassification,
    onFailure: () => { responseMessage("error", "Error Occured while saving Questions Answers.") },
    label: SAVE_AMPLO_ASSIGNED_INDUSTRY_CLASSIFICATION
  });
}

function setsaveAmploAssignedIndustryClassification(res) {
  responseMessage("success", res.message, "");
  return {
    type: SAVE_AMPLO_ASSIGNED_INDUSTRY_CLASSIFICATION,
    payload: res
  }
}

/* Export Question Bank  */
export const exportQuestionsBank = (questionBankId) => {
  return apiAction({
    url: config.laravelBaseUrl + `exportClientQuestionBank/${questionBankId}`,
    method: 'GET',
    callback: 'exportQuestionsBank',
    onSuccess: setExportQuestionsBank,
    onFailure: () => { console.log('error in exportQuestionsBank') },
    label: EXPORT_QUESTIONS_BANK
  })
}

function setExportQuestionsBank(data) {
  return {
    type: EXPORT_QUESTIONS_BANK,
    payload: data.data
  }
}

/* Export Amplo Question Bank  */
export const exportAmploQuestionsBank = (questionBankId) => {
  return apiAction({
    url: config.laravelBaseUrl + `exportAmploQuestionBank/${questionBankId}`,
    method: 'GET',
    callback: 'exportAmploQuestionsBank',
    onSuccess: setExportAmploQuestionsBank,
    onFailure: () => { console.log('error in exportAmploQuestionsBank') },
    label: EXPORT_AMPLO_QUESTIONS_BANK
  })
}

function setExportAmploQuestionsBank(data) {
  return {
    type: EXPORT_AMPLO_QUESTIONS_BANK,
    payload: data.data
  }
}

/* Client Question Bank Import  */
export const getClientQuestionBankImport = (batchId) => {
  return apiAction({
    url: config.laravelBaseUrl + `getClientQuestionBankImport/${batchId}`,
    method: 'GET',
    callback: 'getClientQuestionBankImport',
    onSuccess: setGetClientQuestionBankImport,
    onFailure: () => { console.log('error in getClientQuestionBankImport') },
    label: IMPORT_GET_QUESTIONSBANK_BY_BATCHID
  })
}

function setGetClientQuestionBankImport(data) {
  return {
    type: IMPORT_GET_QUESTIONSBANK_BY_BATCHID,
    payload: data.data
  }
}

/* Client Domains Import  */
export const getClientDomainsImport = (questionsBankId) => {
  return apiAction({
    url: config.laravelBaseUrl + `getClientDomainsImport/${questionsBankId}`,
    method: 'GET',
    callback: 'getClientDomainsImport',
    onSuccess: setGetClientDomainsImport,
    onFailure: () => { console.log('error in getClientDomainsImport') },
    label: IMPORT_GET_DOMAINS_BY_QUESTIONBANK
  })
}

function setGetClientDomainsImport(data) {
  return {
    type: IMPORT_GET_DOMAINS_BY_QUESTIONBANK,
    payload: data.data
  }
}

/* Export Client Questions By Domains Import  */
export const getClientQuestionsByDomainImport = (domainId, questionsBankId, batchId) => {
  return apiAction({
    url: config.laravelBaseUrl + `getClientQuestionsByDomainImport/${domainId}/${questionsBankId}/${batchId}`,
    method: 'GET',
    onSuccess: setGetClientQuestionsByDomainImport,
    onFailure: () => { console.log('error in getClientQuestionsByDomainImport') },
    label: IMPORT_GET_QUESTIONS_BY_DOMAIN
  })
}

function setGetClientQuestionsByDomainImport(data) {
  return {
    type: IMPORT_GET_QUESTIONS_BY_DOMAIN,
    payload: data.data
  }
}

/* Export Client Questions By Domains Import  */
export const getClientInterfaceAttachmentImport = (questionsBankId) => {
  return apiAction({
    url: config.laravelBaseUrl + `getClientAttachmentImport/${questionsBankId}`,
    method: 'GET',
    onSuccess: setGetClientInterfaceAttachmentImport,
    onFailure: () => { console.log('error in getClientInterfaceAttachmentImport') },
    label: IMPORT_GET_INTERFACE_ATTACHMENT_BY_BATCHID
  })
}

function setGetClientInterfaceAttachmentImport(data) {
  return {
    type: IMPORT_GET_INTERFACE_ATTACHMENT_BY_BATCHID,
    payload: data.data
  }
}

/* Amplo Question Bank Import  */
export const getAmploQuestionBankImport = (batchId) => {
  return apiAction({
    url: config.laravelBaseUrl + `getAmploQuestionBankImport/${batchId}`,
    method: 'GET',
    callback: 'getAmploQuestionBankImport',
    onSuccess: setGetAmploQuestionBankImport,
    onFailure: () => { console.log('error in getAmploQuestionBankImport') },
    label: IMPORT_GET_AMPLO_QUESTIONSBANK_BY_BATCHID
  })
}

function setGetAmploQuestionBankImport(data) {
  return {
    type: IMPORT_GET_AMPLO_QUESTIONSBANK_BY_BATCHID,
    payload: data.data
  }
}

/* Amplo Domains Import  */
export const getAmploDomainsImport = (questionsBankId) => {
  return apiAction({
    url: config.laravelBaseUrl + `getAmploDomainsImport/${questionsBankId}`,
    method: 'GET',
    callback: 'getAmploDomainsImport',
    onSuccess: setGetAmploDomainsImport,
    onFailure: () => { console.log('error in getAmploDomainsImport') },
    label: IMPORT_GET_AMPLO_DOMAINS_BY_QUESTIONBANK
  })
}

function setGetAmploDomainsImport(data) {
  return {
    type: IMPORT_GET_AMPLO_DOMAINS_BY_QUESTIONBANK,
    payload: data.data
  }
}

/* Amplo Questions By Domains Import  */
export const getAmploQuestionsByDomainImport = (domainId, questionsBankId, batchId) => {
  return apiAction({
    url: config.laravelBaseUrl + `getAmploQuestionsByDomainImport/${domainId}/${questionsBankId}/${batchId}`,
    method: 'GET',
    onSuccess: setGetAmploQuestionsByDomainImport,
    onFailure: () => { console.log('error in setGetAmploQuestionsByDomainImport') },
    label: IMPORT_GET_AMPLO_QUESTIONS_BY_DOMAIN
  })
}

function setGetAmploQuestionsByDomainImport(data) {
  return {
    type: IMPORT_GET_AMPLO_QUESTIONS_BY_DOMAIN,
    payload: data.data
  }
}

/* Amplo Questions By Domains Import  */
export const getAmploAttachmentImport = (questionsBankId, batchId) => {
  return apiAction({
    url: config.laravelBaseUrl + `getAmploAttachmentImport/${questionsBankId}`,
    method: 'GET',
    onSuccess: setGetAmploAttachmentImport,
    onFailure: () => { console.log('error in getAmploAttachmentImport') },
    label: IMPORT_GET_AMPLO_INTERFACE_ATTACHMENT_BY_BATCHID
  })
}

function setGetAmploAttachmentImport(data) {
  return {
    type: IMPORT_GET_AMPLO_INTERFACE_ATTACHMENT_BY_BATCHID,
    payload: data.data
  }
}

/* Save Amplo Questions Answers Import  */
export const saveImportQuestionsAnswers = (saveObj) => {
  return apiAction({
    url: config.laravelBaseUrl + `saveAmploQuesionsAnswersImport`,
    method: 'POST',
    data: saveObj,
    callback: 'saveImportQuestionsAnswers',
    onSuccess: setSaveImportQuestionsAnswers,
    onFailure: () => { console.log('error in saveImportQuestionsAnswers') },
    label: 'SAVE_IMPORT_QUESTIONS_ANSWERS'
  })
}

function setSaveImportQuestionsAnswers(data) {
  return {
    type: 'SAVE_IMPORT_QUESTIONS_ANSWERS',
    payload: data.data
  }
}

/* Save Client Questions Answers Import  */
export const saveClientImportQuestionsAnswers = (saveObj) => {
  return apiAction({
    url: config.laravelBaseUrl + `saveClientQuesionsAnswersImport`,
    method: 'POST',
    data: saveObj,
    callback: 'saveClientImportQuestionsAnswers',
    onSuccess: setSaveClientImportQuestionsAnswers,
    onFailure: () => { console.log('error in saveClientImportQuestionsAnswers') },
    label: 'SAVE_CLIENT_IMPORT_QUESTIONS_ANSWERS'
  })
}

function setSaveClientImportQuestionsAnswers(data) {
  return {
    type: 'SAVE_CLIENT_IMPORT_QUESTIONS_ANSWERS',
    payload: data.data
  }
}

/* Save Amplo Questions Bank Import  */
export const saveAmploImportQuestionsBank = (saveObj) => {
  return apiAction({
    url: config.laravelBaseUrl + `saveAmploQuestionBankImport`,
    method: 'POST',
    data: saveObj,
    onSuccess: setSaveAmploImportQuestionsBank,
    onFailure: () => { console.log('error in saveAmploImportQuestionsBank') },
    label: 'SAVE_AMPLO_IMPORT_QUESTIONS_BANK'
  })
}

function setSaveAmploImportQuestionsBank(data) {
  return {
    type: 'SAVE_AMPLO_IMPORT_QUESTIONS_BANK',
    payload: data.data
  }
}

/* Save Client Questions Bank Import  */
export const saveClientImportQuestionsBank = (saveObj) => {
  return apiAction({
    url: config.laravelBaseUrl + `saveClientQuestionBankImport`,
    method: 'POST',
    data: saveObj,
    onSuccess: setSaveClientImportQuestionsBank,
    onFailure: () => { console.log('error in saveClientImportQuestionsBank') },
    label: 'SAVE_CLIENT_IMPORT_QUESTIONS_BANK'
  })
}

function setSaveClientImportQuestionsBank(data) {
  return {
    type: 'SAVE_CLIENT_IMPORT_QUESTIONS_BANK',
    payload: data.data
  }
}

/* Save Amplo Domains Import  */
export const saveAmploImportDomains = (saveObj) => {
  return apiAction({
    url: config.laravelBaseUrl + `saveAmploDomainImport`,
    method: 'POST',
    data: saveObj,
    callback: 'saveAmploImportDomains',
    onSuccess: setSaveAmploImportDomains,
    onFailure: () => { console.log('error in saveAmploImportDomains') },
    label: 'SAVE_AMPLO_IMPORT_DOMAINS'
  })
}

function setSaveAmploImportDomains(data) {
  return {
    type: 'SAVE_AMPLO_IMPORT_DOMAINS',
    payload: data.data
  }
}

/* Save Client Domains Import  */
export const saveClientImportDomains = (saveObj) => {
  return apiAction({
    url: config.laravelBaseUrl + `saveClientDomainImport`,
    method: 'POST',
    data: saveObj,
    callback: 'saveClientImportDomains',
    onSuccess: setSaveClientImportDomains,
    onFailure: () => { console.log('error in saveClientImportDomains') },
    label: 'SAVE_CLIENT_IMPORT_DOMAINS'
  })
}

function setSaveClientImportDomains(data) {
  return {
    type: 'SAVE_CLIENT_IMPORT_DOMAINS',
    payload: data.data
  }
}

/* Delete Amplo Domains Import  */
export const deleteAmploImportDomains = (domainId) => {
  return apiAction({
    url: config.laravelBaseUrl + `deleteAmploDomianImport/${domainId}`,
    method: 'DELETE',
    callback: 'deleteAmploImportDomains',
    onSuccess: setDeleteAmploImportDomains,
    onFailure: () => { console.log('error in deleteAmploImportDomains') },
    label: 'DELETE_AMPLO_IMPORT_DOMAINS'
  })
}

function setDeleteAmploImportDomains(data) {
  return {
    type: 'DELETE_AMPLO_IMPORT_DOMAINS',
    payload: data.data
  }
}

/* Delete Client Domains Import  */
export const deleteClientImportDomains = (domainId) => {
  return apiAction({
    url: config.laravelBaseUrl + `deleteClientDomianImport/${domainId}`,
    method: 'DELETE',
    callback: 'deleteClientImportDomains',
    onSuccess: setDeleteClientImportDomains,
    onFailure: () => { console.log('error in deleteClientImportDomains') },
    label: 'DELETE_CLIENT_IMPORT_DOMAINS'
  })
}

function setDeleteClientImportDomains(data) {
  return {
    type: 'DELETE_CLIENT_IMPORT_DOMAINS',
    payload: data.data
  }
}

/* Delete Amplo Questions Import  */
export const deleteAmploImportQuestions = (questionId) => {
  return apiAction({
    url: config.laravelBaseUrl + `deleteAmploQuestionImport/${questionId}`,
    method: 'DELETE',
    onSuccess: setDeleteAmploImportQuestions,
    onFailure: () => { console.log('error in deleteAmploImportQuestions') },
    label: 'DELETE_AMPLO_IMPORT_QUESTIONS'
  })
}

function setDeleteAmploImportQuestions(data) {
  return {
    type: 'DELETE_AMPLO_IMPORT_QUESTIONS',
    payload: data.data
  }
}

/* Delete Client Questions Import  */
export const deleteClientImportQuestions = (questionId) => {
  return apiAction({
    url: config.laravelBaseUrl + `deleteClientQuestionImport/${questionId}`,
    method: 'DELETE',
    onSuccess: setDeleteClientImportQuestions,
    onFailure: () => { console.log('error in deleteClientImportQuestions') },
    label: 'DELETE_CLIENT_IMPORT_QUESTIONS'
  })
}

function setDeleteClientImportQuestions(data) {
  return {
    type: 'DELETE_CLIENT_IMPORT_QUESTIONS',
    payload: data.data
  }
}

/* Delete Amplo Attachment Import  */
export const deleteAmploImportAttachment = (attachmentId) => {
  return apiAction({
    url: config.laravelBaseUrl + `deleteAmploAttachmentImport/${attachmentId}`,
    method: 'DELETE',
    callback: 'deleteAmploImportAttachment',
    onSuccess: setDeleteAmploImportAttachment,
    onFailure: () => { console.log('error in deleteAmploImportAttachment') },
    label: 'DELETE_AMPLO_IMPORT_ATTACHMENT'
  })
}

function setDeleteAmploImportAttachment(data) {
  return {
    type: 'DELETE_AMPLO_IMPORT_ATTACHMENT',
    payload: data.data
  }
}

/* Delete Client Attachment Import  */
export const deleteClientImportAttachment = (attachmentId) => {
  return apiAction({
    url: config.laravelBaseUrl + `deleteClientAttachmentImport/${attachmentId}`,
    method: 'DELETE',
    callback: 'deleteClientImportAttachment',
    onSuccess: setDeleteClientImportAttachment,
    onFailure: () => { console.log('error in deleteClientImportAttachment') },
    label: 'DELETE_CLIENT_IMPORT_ATTACHMENT'
  })
}

function setDeleteClientImportAttachment(data) {
  return {
    type: 'DELETE_CLIENT_IMPORT_ATTACHMENT',
    payload: data.data
  }
}

/* Save Amplo Question Attachment Import  */
export const saveAmploImportQuestionAttachment = (saveObj) => {
  return apiAction({
    url: config.laravelBaseUrl + `saveAmploAttachmentImport`,
    method: 'POST',
    data: saveObj,
    onSuccess: setSaveAmploImportQuestionAttachment,
    onFailure: () => { console.log('error in saveAmploImportQuestionAttachment') },
    label: 'SAVE_AMPLO_IMPORT_QUESTION_ATTACHMENT'
  })
}

function setSaveAmploImportQuestionAttachment(data) {
  return {
    type: 'SAVE_AMPLO_IMPORT_QUESTION_ATTACHMENT',
    payload: data.data
  }
}

/* Save Client Question Attachment Import  */
export const saveClientImportQuestionAttachment = (saveObj) => {
  return apiAction({
    url: config.laravelBaseUrl + `saveClientAttachmentImport`,
    method: 'POST',
    data: saveObj,
    onSuccess: setSaveClientImportQuestionAttachment,
    onFailure: () => { console.log('error in saveClientImportQuestionAttachment') },
    label: 'SAVE_CLIENT_IMPORT_QUESTION_ATTACHMENT'
  })
}

function setSaveClientImportQuestionAttachment(data) {
  return {
    type: 'SAVE_CLIENT_IMPORT_QUESTION_ATTACHMENT',
    payload: data.data
  }
}

/* Save Amplo Question Bank from Interface  */
export const saveAmploImportQuestionBankFromInterface = (saveObj) => {
  return apiAction({
    url: config.laravelBaseUrl + `saveAmploQuestionBankFromInterface`,
    method: 'POST',
    data: saveObj,
    callback: 'saveAmploImportQuestionBankFromInterface',
    onSuccess: setSaveAmploImportQuestionBankFromInterface,
    onFailure: () => { console.log('error in saveAmploImportQuestionBankFromInterface') },
    label: 'SAVE_AMPLO_IMPORT_QUESTION_BANK_FROM_INTERFACE'
  })
}

function setSaveAmploImportQuestionBankFromInterface(data) {
  responseMessage('success', data.message, '')
  return {
    type: 'SAVE_AMPLO_IMPORT_QUESTION_BANK_FROM_INTERFACE',
    payload: data.data
  }
}

/* Save Client Question Bank from Interface  */
export const saveClientImportQuestionBankFromInterface = (saveObj) => {
  return apiAction({
    url: config.laravelBaseUrl + `saveClientQuestionBankFromInterface`,
    method: 'POST',
    data: saveObj,
    callback: 'saveClientImportQuestionBankFromInterface',
    onSuccess: setSaveClientImportQuestionBankFromInterface,
    onFailure: () => { console.log('error in saveClientImportQuestionBankFromInterface') },
    label: 'SAVE_CLIENT_IMPORT_QUESTION_BANK_FROM_INTERFACE'
  })
}

function setSaveClientImportQuestionBankFromInterface(data) {
  responseMessage('success', data.message, '')
  return {
    type: 'SAVE_CLIENT_IMPORT_QUESTION_BANK_FROM_INTERFACE',
    payload: data.data
  }
}

/* Get Amplo Upload Batch Info  */
export const getAmploUploadBatchinfo = (batchId) => {
  return apiAction({
    url: config.laravelBaseUrl + `getAmploQuestionBankImportInfo/${batchId}`,
    method: 'GET',
    onSuccess: setGetAmploUploadBatchinfo,
    onFailure: () => { console.log('error in getAmploUploadBatchinfo') },
    label: 'GET_AMPLO_UPLOAD_BATCH_INFO'
  })
}

function setGetAmploUploadBatchinfo(data) {
  return {
    type: 'GET_AMPLO_UPLOAD_BATCH_INFO',
    payload: data.data
  }
}

/* Get Client Upload Batch Info  */
export const getClientUploadBatchinfo = (batchId) => {
  return apiAction({
    url: config.laravelBaseUrl + `getClientQuestionBankImportInfo/${batchId}`,
    method: 'GET',
    onSuccess: setGetClientUploadBatchinfo,
    onFailure: () => { console.log('error in getClientUploadBatchinfo') },
    label: 'GET_CLIENT_UPLOAD_BATCH_INFO'
  })
}

function setGetClientUploadBatchinfo(data) {
  return {
    type: 'GET_CLIENT_UPLOAD_BATCH_INFO',
    payload: data.data
  }
}

/* Get Client Questions Bank for Amplo  */
export const getClientQuestionsBankForAmplo = () => {
  return apiAction({
    url: config.laravelBaseUrl + `getAllClientQuestionBank`,
    method: 'GET',
    onSuccess: setGetClientQuestionsBankForAmplo,
    onFailure: () => { console.log('error in getClientQuestionsBankForAmplo') },
    label: 'GET_CLIENT_QUESTIONS_BANK_FOR_AMPLO'
  })
}

function setGetClientQuestionsBankForAmplo(data) {
  return {
    type: 'GET_CLIENT_QUESTIONS_BANK_FOR_AMPLO',
    payload: data.data
  }
}

/* Get Client Questions and Domains for Amplo  */
export const getClientQuestionsAndDomainsAmplo = (id) => {
  return apiAction({
    url: config.laravelBaseUrl + `getClientQuestions/${id}`,
    method: 'GET',
    onSuccess: setGetClientQuestionsAndDomainsAmplo,
    callback: 'getClientQuestionsAndDomainsAmplo',
    onFailure: () => { console.log('error in getClientQuestionsAndDomainsAmplo') },
    label: 'GET_CLIENT_QUESTIONS_AND_DOMAINS_AMPLO'
  })
}

function setGetClientQuestionsAndDomainsAmplo(data) {
  return {
    type: 'GET_CLIENT_QUESTIONS_AND_DOMAINS_AMPLO',
    payload: data.data
  }
}

/* Delete Project Relations  */
export const deleteProjectRelations = (id) => {
  return apiAction({
    url: config.laravelBaseUrl + `deleteProjectRelation/${id}`,
    method: 'DELETE',
    onSuccess: setDeleteProjectRelations,
    onFailure: () => { console.log('error in deleteProjectRelations') },
    label: 'DELETE_PROJECT_RELATIONS'
  })
}

function setDeleteProjectRelations(data) {
  return {
    type: 'DELETE_PROJECT_RELATIONS',
    payload: data.data
  }
}

/* Get Industry Classification by QuestionsBank Client */
export const getIndustryClassificationByQuestionsBankClient = (id) => {
  return apiAction({
    url: config.laravelBaseUrl + `getClientQuestionBankIndustry/${id}`,
    onSuccess: setGetIndustryClassificationByQuestionsBankClient,
    onFailure: () => { console.log('error in getIndustryClassificationByQuestionsBankClient') },
    label: 'GET_INDUSTRY_CLASSIFICATION_BY_QUESTIONS_BANK_CLIENT'
  })
}

function setGetIndustryClassificationByQuestionsBankClient(data) {
  return {
    type: 'GET_INDUSTRY_CLASSIFICATION_BY_QUESTIONS_BANK_CLIENT',
    payload: data.data
  }
}

/* Get Industry Classification by QuestionsBank Amplo */
export const getIndustryClassificationByQuestionsBankAmplo = (id) => {
  return apiAction({
    url: config.laravelBaseUrl + `getAmploQuestionBankIndustry/${id}`,
    onSuccess: setGetIndustryClassificationByQuestionsBankAmplo,
    onFailure: () => { console.log('error in getIndustryClassificationByQuestionsBankAmplo') },
    label: 'GET_INDUSTRY_CLASSIFICATION_BY_QUESTIONS_BANK_AMPLO'
  })
}

function setGetIndustryClassificationByQuestionsBankAmplo(data) {
  return {
    type: 'GET_INDUSTRY_CLASSIFICATION_BY_QUESTIONS_BANK_AMPLO',
    payload: data.data
  }
}
export const saveClientAnalyticsUsecaseruns = (assignObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'saveClientAnalyticsUsecaseruns',
    method: "POST",
    data: assignObj,
    onSuccess: setsaveClientAnalyticsUsecaseruns,
    onFailure: () => { responseMessage("error", "Error Occured while saving Questions Answers.") },
    label: 'SAVE_CLIENT_ANALYTICS_USE_CASE'
  });
}

function setsaveClientAnalyticsUsecaseruns(res) {
  // responseMessage("success",res.message,"");
  return {
    type: 'SAVE_CLIENT_ANALYTICS_USE_CASE',
    payload: res
  }
}

export const saveClientAnalyticsUsecaseruns2 = (assignObj) => {
  return apiAction({
    url: config.laravelBaseUrl + 'saveClientAnalyticsUsecaseruns',
    method: "POST",
    data: assignObj,
    callback: "saveClientAnalyticsUsecaseruns2",
    onSuccess: setsaveClientAnalyticsUsecaseruns2,
    onFailure: () => { responseMessage("error", "Error Occured while saving Questions Answers.") },
    label: 'SAVE_CLIENT_ANALYTICS_USE_CASE2'
  });
}

function setsaveClientAnalyticsUsecaseruns2(res) {
  // responseMessage("success",res.message,"");
  return {
    type: 'SAVE_CLIENT_ANALYTICS_USE_CASE2',
    payload: res
  }
}

/* Get AFLY Score */
export const getClientAnalyticsUsecaserunsDetails = (industryLeaderId, industryLeaderName) => {
  let flag = false;
  if ((typeof industryLeaderId === 'undefined' || typeof industryLeaderName === 'undefined')) {
    flag = true
  }
  return apiAction({
    url: config.laravelBaseUrl + 'getClientAnalyticsUsecaserunsDetails/' + 0 + '/' + 0,
    onSuccess: setgetClientAnalyticsUsecaserunsDetails,
    onFailure: () => { },

    label: 'GET_CLIENT_ANALYTICS_USER_RUNS'
  });
}

function setgetClientAnalyticsUsecaserunsDetails(data) {
  return {
    type: 'GET_CLIENT_ANALYTICS_USER_RUNS',
    payload: data.data
  }
}
// get afly scorings
export const getClientAnalyticsBenchmarkDomain = (bmpId) => {
  let flag = false;
  if ((typeof industryLeaderId === 'undefined' || typeof industryLeaderName === 'undefined')) {
    flag = true
  }
  return apiAction({
    url: config.laravelBaseUrl + 'getAflyScoresDomainWise/' + bmpId,
    onSuccess: setgetClientAnalyticsBenchmarkDomain,
    onFailure: () => { },

    label: 'GET_CLIENT_ANALYTICS_DOMAIN_WISE'
  });
}

function setgetClientAnalyticsBenchmarkDomain(data) {
  return {
    type: 'GET_CLIENT_ANALYTICS_DOMAIN_WISE',
    payload: data.data
  }
}
// get benchmarking
export const getClientAnalyticsBenchmark = (bmpId) => {
  let flag = false;
  if ((typeof industryLeaderId === 'undefined' || typeof industryLeaderName === 'undefined')) {
    flag = true
  }
  return apiAction({
    url: config.laravelBaseUrl + 'getAflyScores/' + bmpId,
    onSuccess: setgetClientAnalyticsBenchmark,
    onFailure: () => { },

    label: 'GET_CLIENT_ANALYTICS_BENCHMARK'
  });
}

function setgetClientAnalyticsBenchmark(data) {
  return {
    type: 'GET_CLIENT_ANALYTICS_BENCHMARK',
    payload: data.data
  }
}
export const fetchPainPointsInitiatives = (projectId) => {

  return apiAction({
    url: config.laravelBaseUrl + 'getUseCaseFour/' + projectId,
    onSuccess: setfetchPainPointsInitiatives,
    onFailure: () => console.log("Error occured in fetchActivityBank"),
    label: 'FETCH_PAINPOINT_INITIATIVES'
  });
}

function setfetchPainPointsInitiatives(data) {
  return {
    type: 'FETCH_PAINPOINT_INITIATIVES',
    payload: data.data
  }
}
export const restoreUseCaseState = () => dispatch => {
  dispatch({
    type: 'RESTORE_USE_CASE_SAVE',
    payload: null
  })
}
export const setProject = (project) => dispatch => {
  dispatch({
    type: 'SET_CAPABILITY_PROJECT_WITH_ID',
    payload: project
  })
}
export const resetProject = () => dispatch => {
  dispatch({
    type: 'RESET_CAPABILITY_PROJECT_WITH_ID',
    payload: null
  })
}
export const resetInitiatives = () => dispatch => {
  dispatch({
    type: 'RESET_INITIATIVES',
    payload: []
  })
}
export const resetSavedClient = () => dispatch => {
  dispatch({
    type: 'RESET_SAVED_CLIENT_DATA',
    payload: null
  })
} 