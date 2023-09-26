import { UPDATE_COMPANY_PROFILE,FETCH_INDUSTRIES, FETCH_REGIONS, FETCH_COUNTRIES, FETCH_STATES, FETCH_CITIES, FETCH_PROFILE_QUESTIONS, FETCH_COMPANY_PROFILE, GET_ERRORS } from './types';
import {responseMessage} from '../utils/alert';
import { apiAction } from './apiActions';
const config = require('../config');


//.. updated by Ashim
export const fetchCompanyProfile = () => {
    return apiAction({
        url: config.laravelBaseUrl+ 'get_company_profile', 
        onSuccess: setfetchCompanyProfile,
        onFailure: () => console.log("Error occured in fetchCompanyProfile"),
        callback:'fetchCompanyProfile',
        label: FETCH_COMPANY_PROFILE
      });
}

function setfetchCompanyProfile(data){
    console.log(data);
    return {
        type: FETCH_COMPANY_PROFILE,
		payload: data.data
    }
}

/* Action: Changed fetchIndustryData function
By: Syed On: 3/2/2020 */
export const fetchIndustryData = () => {
    return apiAction({
        url: config.laravelBaseUrl+ 'get_industry_vertical_subvertical', 
        onSuccess: setfetchIndustryData,
        onFailure: () => console.log("Error occured in fetchIndustryData"),
        label: FETCH_INDUSTRIES
      });
}

function setfetchIndustryData(data){
    return {
        type: FETCH_INDUSTRIES,
		payload: data.data
    }
}

/* Action: Changed fetchRegions function
By: Syed On: 3/2/2020 */

export const fetchRegions = () => {
    return apiAction({
        url: config.laravelBaseUrl+ 'get_regions', 
        onSuccess: setfetchRegions,
        onFailure: () => console.log("Error occured in fetchRegions"),
        label: FETCH_REGIONS
      });
}

function setfetchRegions(data){
    return {
        type: FETCH_REGIONS,
		payload: data.data
    }
}


/* Action: Changed fetchCountries function
By: Syed On: 3/2/2020 */

export const fetchCountries = () => {
    return apiAction({
        url: config.laravelBaseUrl+ 'get_countries', 
        onSuccess: setfetchCountries,
        onFailure: () => console.log("Error occured in fetchCountries"),
        label: FETCH_COUNTRIES
      });
}

function setfetchCountries(data){
    return {
        type: FETCH_COUNTRIES,
		payload: data.data
    }
}

/* Action: Changed fetchStates function
By: Syed On: 3/2/2020 */

export const fetchStates = (country) => {
    return apiAction({
        url: config.laravelBaseUrl+ 'get_states/'+country, 
        onSuccess: setfetchStates,
        onFailure: () => console.log("Error occured in fetchStates"),
        label: FETCH_STATES
      });
}

function setfetchStates(data){
    return {
        type: FETCH_STATES,
		payload: data.data
    }
}

/* Action: Changed fetchInitialStates function
By: Syed On: 3/2/2020 */

export const fetchInitialStates = (country) => {
    return apiAction({
        url: config.laravelBaseUrl+'get_states/'+country, 
        onSuccess: setfetchInitialStates,
        onFailure: () => console.log("Error occured in fetchInitialStates"),
        label: FETCH_STATES
      });
}

function setfetchInitialStates(data){
    return {
        type: FETCH_STATES,
		payload: data.data
    }
}

/* Action: Changed fetchCities function
By: Syed On: 3/2/2020 */

export const fetchCities = (state) => {
    return apiAction({
        url: config.laravelBaseUrl+ 'get_cities/'+state, 
        onSuccess: setfetchCities,
        onFailure: () => console.log("Error occured in fetchCities"),
        label: FETCH_CITIES
      });
}

function setfetchCities(data){
    return {
        type: FETCH_CITIES,
		payload: data.data
    }
}


/* Action: Changed fetchInitialCities function
By: Syed On: 3/2/2020 */

export const fetchInitialCities = (state) => {
    return apiAction({
        url: config.laravelBaseUrl+ 'get_cities/'+state, 
        onSuccess: setfetchInitialCities,
        onFailure: () => console.log("Error occured in fetchInitialCities"),
        label: FETCH_CITIES
      });
}

function setfetchInitialCities(data){
    return {
        type: FETCH_CITIES,
		payload: data.data
    }
}

export const fetchQuestions = () => {

    return apiAction({
        url: config.laravelBaseUrl+ 'get_profiling_question', 
        onSuccess: setfetchQuestions,
        onFailure: () => console.log("Error occured in fetchQuestions"),
        label: FETCH_PROFILE_QUESTIONS
      });
}

function setfetchQuestions(data){
    return {
        type: FETCH_PROFILE_QUESTIONS,
		payload: data.data
    }
}


/* Action: Changed updateCompanyProfile function
By: Syed On: 3/2/2020 */

export const updateCompanyProfile = (profileData) => {
    return apiAction({
		url: config.laravelBaseUrl+'update_company_profile', 
		method: "POST",
        data: profileData, 
        onSuccess: setupdateCompanyProfile,
        onFailure: () => console.log("Error occured in updateCompanyProfile"),
        label: UPDATE_COMPANY_PROFILE
      });
}

function setupdateCompanyProfile(res){
	responseMessage("success",res.message,"");
	//alert(res.message);
    return {
        type: UPDATE_COMPANY_PROFILE,
		payload: res.data
    }
}
