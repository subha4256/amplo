import { FETCH_DASHBORAD_DATA, FETCH_AM_PERCENTAGE_VAL, FETCH_CM_PERCENTAGE_VAL } from "./types";
import { apiAction } from './apiActions';

const config = require("../config");

export const fetchDashboardData = () => {
   return apiAction({
    url: config.laravelBaseUrl + "dashboard-data",
    onSuccess: setDashBoardData,
    onFailure: () => console.log("Error occured fetchDashboardData"),
    label: FETCH_DASHBORAD_DATA
  });
}

function setDashBoardData(data) {
  return {
    type: FETCH_DASHBORAD_DATA,
    payload: data.data
  };
}

export const fetchRegistrationDetails = () => {
  return apiAction({
   url: config.laravelBaseUrl + "getUserRegistrationDetails",
   onSuccess: setFetchRegistrationDetails,
   onFailure: () => console.log("Error occured fetchRegistrationDetails"),
   label: 'FETCH_USER_REGISTRATION_DETAILS'
 });
}

function setFetchRegistrationDetails(data) {
 return {
   type: 'FETCH_USER_REGISTRATION_DETAILS',
   payload: data.data
 };
}

export const fetchAMPercentagevalue = (projectId) => {
      return apiAction({
        url: config.laravelBaseUrl + `getProgressDataForDashBoard/BM/${projectId}`,
        onSuccess: setAMPercentageValue,
        onFailure: () => console.log("Error occured fetchDashboardData"),
        label: FETCH_AM_PERCENTAGE_VAL
      });
  }
  
  function setAMPercentageValue(data) {
    return {
      type: FETCH_AM_PERCENTAGE_VAL,
      payload: data.data
    };
  }

export const fetchCMPercentageValue = (projectId) => {
  return apiAction({
    url: config.laravelBaseUrl + `getProgressDataForDashBoard/CM/${projectId}`,
    onSuccess: setCMPercentageValue,
    onFailure: () => console.log("Error occured fetchDashboardData"),
    label: FETCH_CM_PERCENTAGE_VAL
  });
}

function setCMPercentageValue(data) {
return {
  type: FETCH_CM_PERCENTAGE_VAL,
  payload: data.data
};
}