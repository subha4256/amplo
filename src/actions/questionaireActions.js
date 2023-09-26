import {HANDLE_SELECT_PROJECT,CLEAR_ASSESMENT_EDIT,UPDATE_AFLY_SCORE_QUESTION,SAVE_PROJECT_QUESTIONS,DELETE_PROJECT_QUESTION,FETCH_PROJECT_DOMAIN_QUESTION,FETCH_PROJECT_DOMAIN_QUESTION_DETAILS,FETCH_PROJECT_CLIENT_ATTACHMENT,FETCH_PROJECT_DOMAINS,SAVE_PROJECT_DOMAIN,DELETE_PROJECT_DOMAIN,SET_PROJECT_SELECTED_DOMAIN, FETCH_BENCHMARK_PROJECTS, FETCH_BENCHMARK_DOMAINS, FETCH_DOMAIN_QUESTIONS, FETCH_QUESTION, GET_ERRORS, SAVE_ANSWER ,GET_UNANSWERED_QUESTIONS } from './types';
import axios from 'axios';
import CacheStorage from '../utils/CacheStorage';
import { apiAction } from './apiActions';
import {responseMessage} from '../utils/alert';
const config = require('../config');


export const fetchBenchmarkProjects = (projects) => (dispatch) => {
	// fetch(config.laravelBaseUrl+'get_user_bm_projects')
	// .then(response => response.json())
	// .then(projects => dispatch({
	// 	type: FETCH_BENCHMARK_PROJECTS,
	// 	payload: projects.data
	// }));
	if(projects.status === 200) {
		dispatch({
			type: FETCH_BENCHMARK_PROJECTS,
			payload: projects.data.data
		})
	}else{
		dispatch({
			type: GET_ERRORS,
			payload: projects.data.data
		})
	}
	// .then(response => response.json())
	// .then(projects => dispatch({
	// 	type: FETCH_BENCHMARK_PROJECTS,
	// 	payload: projects.data
	// }));
};

export const getQBDomainsForEdit=(obj) =>{
	return apiAction({
	  url: config.laravelBaseUrl+`getQBDomainsForEdit/${obj.projectId}`, 
	  method: "GET",
	  callback : 'qbdomainsforedit',
	  onSuccess: setQBDomainsForEdit,
	  onFailure: () => {responseMessage("error","Error Occured while getting Project Domains For Edit.")},
	  label: FETCH_PROJECT_DOMAINS
	});
  } 

  function setQBDomainsForEdit(res){
	return {
	  type: FETCH_PROJECT_DOMAINS,
	payload: res.data
	}
}
export const clearAssesmentEdit=()=>{
	return {
		type: CLEAR_ASSESMENT_EDIT,
	  payload: {}
	  }
}
export const handleSelectProject=(obj)=>{
	return {
		type: HANDLE_SELECT_PROJECT,
	  payload: obj
	  }
}
export const saveClientBenchMarkQuestionAnswers=(obj) =>{
	return apiAction({
	  url: config.laravelBaseUrl+`SaveClientBenchMarkQuestionAnswers`, 
	  method: "POST",
	  data:obj,
	  callback : 'saveclientbenchmarkquestionanswers',
	  onSuccess: setSaveClientBenchMarkQuestionAnswers,
	  onFailure: () => {responseMessage("error","Error Occured while getting Project Domains For Edit.")},
	  label: SAVE_PROJECT_QUESTIONS
	});
  } 

  function setSaveClientBenchMarkQuestionAnswers(res){
	responseMessage("success",res.message,"");
	return {
	  type: SAVE_PROJECT_QUESTIONS,
	payload: res.data
	}
}
export const deleteBenchMarkQuestionAnswers=(obj) =>{
	return apiAction({
	  url: config.laravelBaseUrl+`DeleteBenchMarkQuestionAnswers/${obj.projectId}/${obj.domainId}/${obj.questionId}`, 
	  method: "GET",
	  callback : 'deletebenchmarkquestionAnswers',
	  onSuccess: setDeleteBenchMarkQuestionAnswers,
	  onFailure: () => {responseMessage("error","Error Occured while Deleting Benchmark Question")},
	  label: DELETE_PROJECT_QUESTION
	});
  } 

  function setDeleteBenchMarkQuestionAnswers(res){
	responseMessage("success",res.message,"");
	return {
	  type: DELETE_PROJECT_QUESTION,
	payload: res.data
	}
}
export const updateAFlyScoreOfBenchMarkQuestion=(obj) =>{
	return apiAction({
	  url: config.laravelBaseUrl+`UpdateAFlyScoreOfBenchMarkQuestion/${obj.questionId}/${obj.aflyscore}`, 
	  method: "GET",
	  callback : 'setupdateaflyscoreofbenchmarkquestion',
	  onSuccess: setUpdateAFlyScoreOfBenchMarkQuestion,
	  onFailure: () => {responseMessage("error","Error Occured while Updating Afly Score Value")},
	  label: UPDATE_AFLY_SCORE_QUESTION
	});
  } 

  function setUpdateAFlyScoreOfBenchMarkQuestion(res){
	responseMessage("success",res.message,"");
	return {
	  type: UPDATE_AFLY_SCORE_QUESTION,
	payload: res.data
	}
}
export const fetchBQBQuestionList=(obj) =>{
	return apiAction({
	  url: config.laravelBaseUrl+`getClientBenchmarkQuestionsAnswers/${obj.domainId}/${obj.projectId}`, 
	  method: "GET",
	  onSuccess: setBQBQuestionList,
	  onFailure: () => {responseMessage("error","Error Occured while fetching Project Questions for Edit.")},
	  label: FETCH_PROJECT_DOMAIN_QUESTION
	});
  } 


function setBQBQuestionList(res){
	return {
	  type: FETCH_PROJECT_DOMAIN_QUESTION,
		  payload: res.data
	}
}
export const fetchBQBQuestionDetails=(obj) =>{
	return apiAction({
	  url: config.laravelBaseUrl+`fetchBQBQuestionDetails/${obj.projectId}/${obj.domainId}/${obj.questionId}`, 
	  method: "GET",
	  callback : 'bqbQuestionDetails',
	  onSuccess: setBQBQuestionDetails,
	  onFailure: () => {responseMessage("error","Error Occured while fetching Project Question Details for Edit.")},
	  label: FETCH_PROJECT_DOMAIN_QUESTION_DETAILS
	});
  } 

  function setBQBQuestionDetails(res){
	return {
	  type: FETCH_PROJECT_DOMAIN_QUESTION_DETAILS,
		  payload: res
	}
}

export const getBQClientAttachment=(obj) =>{
	return apiAction({
	  url: config.laravelBaseUrl+`getBQClientAttachment/${obj.id}`, 
	  method: "GET",
	  callback : 'bqClientAttachment',
	  onSuccess: setBQClientAttachment,
	  onFailure: () => {responseMessage("error","Error Occured while fetching Project Question Attachment for edit.")},
	  label: FETCH_PROJECT_CLIENT_ATTACHMENT
	});
  } 

  function setBQClientAttachment(res){
	return {
	  type: FETCH_PROJECT_CLIENT_ATTACHMENT,
		  payload: res
	}
}

export const saveProjectDomains=(obj) =>{
	return apiAction({
	  url: config.laravelBaseUrl+'SaveClientDomainForProject', 
	  method: "POST",
	  data: obj, 
	  callback : 'saveprojectdomains',
	  onSuccess: setSaveProjectDomains,
	  onFailure: () => {responseMessage("error","Error Occured while saving Project Domain.")},
	  label: SAVE_PROJECT_DOMAIN
	});
  } 
  
  function setSaveProjectDomains(res){
	  responseMessage("success",res.message,"");
	  return {
		type: SAVE_PROJECT_DOMAIN,
			payload: res
	  }
  }
  export const deleteProjectDomains=(obj)=>{
	return apiAction({
	  url: config.laravelBaseUrl+'DeleteClientDomainForProject/'+obj.projectId+'/'+obj.domainId, 
	  method: "GET",
	  callback : 'deleteprojectdomain',
	  onSuccess: setDeleteProjectDomains,
	  onFailure: () => {responseMessage("error","Error Occured while deleting Project Domain.")},
	  label: DELETE_PROJECT_DOMAIN
	});
  }
  
  function setDeleteProjectDomains(res){
	responseMessage("success",res.message,"");
	  return {
		type: DELETE_PROJECT_DOMAIN,
			payload: res
	  }
  }
  
  export const setProjectSelectedDomain=(res)=>{
	  return {
		type: SET_PROJECT_SELECTED_DOMAIN,
			payload: res
	  }
  }
  

export const fetchBenchmarkDomains = (domains) => dispatch => {
	if(domains.status === 200) {
		dispatch({
			type: FETCH_BENCHMARK_DOMAINS,
			payload: domains.data.data
		})
	}else{
		dispatch({
			type: GET_ERRORS,
			payload: domains.data.data
		})
	}
	/*fetch(config.laravelBaseUrl+'get_user_domains_bm_project/'+obj.project_id)
	.then(response => response.json())
	.then(domains => dispatch({
		type: FETCH_BENCHMARK_DOMAINS,
		payload: domains.data
	}));*/
};

export const fetchDomainQuestions = (questions) => dispatch => {	
	if(questions.status === 200) {
		dispatch({
			type: FETCH_DOMAIN_QUESTIONS,
			payload: questions.data.data
		})
	}else{
		dispatch({
			type: GET_ERRORS,
			payload: questions.data.data
		})
	}
};

export const fetchQuestion = (quiz) => dispatch => {
	if(quiz.status === 200) {
		dispatch({
			type: FETCH_QUESTION,
			payload: quiz.data.data
		})
	}else{
		dispatch({
			type: GET_ERRORS,
			payload: quiz.data.data
		})
	}
	/*fetch(config.laravelBaseUrl+'fetch_bm_question_details/'+qObj.project_id+'/'+qObj.domain_id+'/'+qObj.question_id)
	.then(response => response.json())
	.then(ques => dispatch({
		type: FETCH_QUESTION,
		payload: ques.data
	}));*/
};

/* Action: Changed saveAnswer function
By: Syed On: 3/12/2020 */

export const saveAnswer = (answerObj) => {
    return apiAction({
        url: config.laravelBaseUrl + "update_bm_question_response" , 
        method: "POST",
        data: answerObj,
		onSuccess: setsaveAnswer,
		callback : 'saveAnswer',
        onFailure: () => console.log("Error occured in saveAnswer"),
        label: "SAVE_ANSWER"
      });
}

function setsaveAnswer(data){
    responseMessage("success", data.message, "");
    return {
        type: "SAVE_ANSWER",
        payload: data.data
    }
}

export const getUnAnsweredQuestions = (pId, dId) => {
    return apiAction({
        url: config.laravelBaseUrl + "getUnAnsweredQuestion"+"/"+pId+"/"+dId , 
        method: "GET",
        onSuccess: setgetUnAnsweredQuestions,
        onFailure: () => console.log("Error occured in getUnAnsweredQuestions"),
        label: GET_UNANSWERED_QUESTIONS
      });
}

function setgetUnAnsweredQuestions(data){
    return {
        type: GET_UNANSWERED_QUESTIONS,
        payload: data.data
    }
}

export const saveGoalSetting = (settingObj, history ,projectName) => dispatch => {
	const headers = {
		"authorization": "Bearer " + CacheStorage.getItem("userToken")
	}
	axios.post(config.laravelBaseUrl+'update_bm_goal_setting', settingObj, {
		headers: headers
	}).then(answer => history.push(`/benchmark-report/${settingObj.project_id}/${projectName}`)
	).catch(err => {
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	})
}