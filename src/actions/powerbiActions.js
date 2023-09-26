import {GET_ACCESS_TOKEN,GET_EMBED_TOKEN,GET_POWERBI_REPORTS,EMPTY_POWERBI_REPORTS} from './types'
import { apiAction } from './apiActions';
import CacheStorage from '../utils/CacheStorage';
const config = require('../config');
export const getAccessToken = () => { 
    return apiAction({
      url: config.laravelBaseUrl+'login-power-bi', 
      method: "GET",
      
      onSuccess: setgetAccessToken,
      onFailure: (err) => {console.log("Error Occured while getting menus.",err.message)},
      label: GET_ACCESS_TOKEN
    });
  }
  function setgetAccessToken(res){
    
  return {
    type: GET_ACCESS_TOKEN,
      payload: res.data
  }
  }
  export const getSingleReportWithId = (id)=>{

  }
  export const getEmbedToken = (data) => { 
      
      let pbiToken = CacheStorage.getItem("pbi-token");
      
    return apiAction({
      url: config.laravelBaseUrl+'getEmbedToken', 
      method: "POST",
      data:{
        "pbiToken":pbiToken,
        "reportId":data.reportId
    },
      
      onSuccess: setgetEmbedToken,
      onFailure: (err) => {console.log("Error Occured while getting menus.",err.message)},
      label: GET_EMBED_TOKEN
    });
  }
  function setgetEmbedToken(res){
    console.log('res',res.data)
  return {
    type: GET_EMBED_TOKEN,
      payload: res.data
  }
  }
  export const getAllReports = () => { 
    let pbiToken = CacheStorage.getItem("pbi-token");
    
  return apiAction({
    url: config.laravelBaseUrl+`getAllReports?pbiToken=${pbiToken}`, 
    method: "GET",
  onSuccess: setgetPowerBiReports,
    onFailure: (err) => {console.log("Error Occured while getting menus.",err.message)},
    label: GET_POWERBI_REPORTS
  });
}
function setgetPowerBiReports(res){
  
return {
  type: GET_POWERBI_REPORTS,
    payload: res.data
}
}
export const reInitialize = () => { 
    return dispatch =>{
        dispatch({type:EMPTY_POWERBI_REPORTS,payload:null})
    }
}
// getCxOReportByUser
export const getAllUserReports = () => { 
  let pbiToken = CacheStorage.getItem("pbi-token");
  
return apiAction({
  url: config.laravelBaseUrl+`getCxOReportByUser?pbiToken=${pbiToken}`, 
  method: "GET",
onSuccess: setgetPowerBiReports,
  onFailure: (err) => {console.log("Error Occured while getting menus.",err.message)},
  label: GET_POWERBI_REPORTS
});
}