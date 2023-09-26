import { ENTERPRISE_ACCOUNTS,APPROVE_ACCOUNT, CLIENT_DETAILS, UPDATE_ENTERPRISE_ACCOUNT, GET_ERRORS, MARKET_INDUSTRIES } from './types';

import {responseMessage} from '../utils/alert';
import { apiAction } from './apiActions';
const config = require('../config');


/* Action: Changed fetchEnterpriseAccounts function
By: Syed On: 3/3/2020 */

export const fetchEnterpriseAccounts = () => {
    return apiAction({
        url: config.laravelBaseUrl+'manageEnterpriseAccount', 
        onSuccess: setfetchEnterpriseAccounts,
        onFailure: () => console.log("Error occured in fetchEnterpriseAccounts"),
        label: ENTERPRISE_ACCOUNTS
      });
}

function setfetchEnterpriseAccounts(data){
    return {
        type: ENTERPRISE_ACCOUNTS,
		payload: data
    }
}


/* Action: Changed approveAccount function
By: Syed On: 3/3/2020 */

export const approveAccount = (clientID) => {
    return apiAction({
        url: config.laravelBaseUrl+'approve/'+clientID, 
        method: "POST",
        onSuccess: setapproveAccount,
        onFailure: () => console.log("Error occured in approveAccount"),
        label: APPROVE_ACCOUNT
      });
}

function setapproveAccount(res){
    responseMessage("success",res.message,"");
    return {
        type: APPROVE_ACCOUNT,
        payload: res.data
    }
}
export const fetchClientDetails = (clientData) => dispatch => {
	if(clientData.status === 200) {
        dispatch({
            type: CLIENT_DETAILS,
            payload: clientData.data.data
        })
    }else{
        dispatch({
            type: GET_ERRORS,
            payload: clientData.response.data
        })
    }
};

/* Action: Changed updateAccount function
By: Syed On: 3/3/2020 */

export const updateAccount = (clientData) => {
    return apiAction({
        url: config.laravelBaseUrl+'updateClientProfile', 
        method: "POST",
        data: clientData,
        onSuccess: setupdateAccount,
        onFailure: () => console.log("Error occured in updateAccount"),
        label: UPDATE_ENTERPRISE_ACCOUNT
      });
}

function setupdateAccount(res){
    responseMessage("success",res.message,"");
    return {
        type: UPDATE_ENTERPRISE_ACCOUNT,
        payload: res.data
    }
}



/* Action: Changed fetchIndustries function
By: Syed On: 3/3/2020 */

export const fetchIndustries = () => {
    return apiAction({
        url: config.laravelBaseUrl+'industry-collection', 
        onSuccess: setfetchIndustries,
        onFailure: () => console.log("Error occured in fetchIndustries"),
        label: MARKET_INDUSTRIES
      });
}

function setfetchIndustries(data){
    return {
        type: MARKET_INDUSTRIES,
		payload: data.data
    }
}


