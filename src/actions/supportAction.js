import {GET_SUPPORT_MENU,GET_SUPPORT_DETAILS,GET_SUPPORT_PAGE_DETAILS} from './types'
import { apiAction } from './apiActions';
const config = require('../config');

export const getSupportMenu = () => {
    return apiAction({
      url: config.laravelBaseUrl+'getSupportMainMenus', 
      method: "GET",
      
      onSuccess: setgetSupportMenu,
      onFailure: (err) => {console.log("Error Occured while getting menus.",err.message)},
      label: GET_SUPPORT_MENU
    });
  }
function setgetSupportMenu(res){
    
return {
    type: GET_SUPPORT_MENU,
		  payload: res.data
}
}
  

export const getSupportDetails = () => {
  return apiAction({
    url: config.laravelBaseUrl+'getSupportPage/0', 
    method: "GET",
    
    onSuccess: setgetSupportDetails,
    onFailure: (err) => {console.log("Error Occured while getting menus.",err.message)},
    label: GET_SUPPORT_DETAILS
  });
}
function setgetSupportDetails(res){
  
return {
  type: GET_SUPPORT_DETAILS,
    payload: res.data
}
}

export const getSupportPageDetails = (catid,supportFunctionalityId) => {
  return apiAction({
    url: config.laravelBaseUrl+`getSupportPageDetails/${catid}/${supportFunctionalityId}`, 
    method: "GET",
    onSuccess: setgetSupportPageDetails,
    onFailure: (err) => {console.log("Error Occured in getSupportPageDetails",err.message)},
    label: GET_SUPPORT_PAGE_DETAILS
  });
}

function setgetSupportPageDetails(res){
  return {
    type: GET_SUPPORT_PAGE_DETAILS,
      payload: res.data
  }
}