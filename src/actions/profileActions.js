import { SAVE_ANSWERS,SAVE_PROFILE, USER_PROFILE, SECURITY_QUESTIONS, GET_ERRORS } from './types';
import { apiAction } from './apiActions';
const config = require('../config');

export const fetchSecurityQuestions = () => {
	return apiAction({
	 url: config.laravelBaseUrl + "get_password_question",
	 onSuccess: setSecurityQuestions,
	 onFailure: () => console.log("Error occured setSecurityQuestions"),
	 label: SECURITY_QUESTIONS
   });
 }
 
 function setSecurityQuestions(data) {
   return {
	 type: SECURITY_QUESTIONS,
	 payload: data.data
   };
 }


export const saveSecurityQuestions = (answerObj, history) => {
	return apiAction({
	 url: config.laravelBaseUrl + "add_security_question_answer",
	 method: "POST",
  	 data: answerObj,
	 onSuccess: setSaveAnswers,
	 onFailure: () => console.log("Error occured saveSecurityQuestions"),
	 label: SAVE_ANSWERS
   });
}
 
function setSaveAnswers(data) {
   return {
	 type: SAVE_ANSWERS,
	 payload: data
   };
}


export const saveProfile = (profileObj, history) => {
	return apiAction({
	 url: config.laravelBaseUrl + "update_profile",
	 method: "POST",
  	 data: profileObj,
	 onSuccess: setsaveProfile,
	 onFailure: () => console.log("Error occured saveProfile"),
	 label: SAVE_PROFILE
   });
}
 
function setsaveProfile(data) {
   return {
	 type: SAVE_PROFILE,
	 payload: data
   };
}

export const fetchUserProfile = () => {
	return apiAction({
	 url: config.laravelBaseUrl + "fetch_profile",
	 onSuccess: setUserProfile,
	 onFailure: () => console.log("Error occured fetchUserProfile"),
	 label: USER_PROFILE
   });
 }
 
 function setUserProfile(data) {
   return {
	 type: USER_PROFILE,
	 payload: data.data
   };
 }
