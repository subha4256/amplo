import { FETCH_PROJECTS_ACCESS, FETCH_DOMAINS_ACCESS, FETCH_USER_ACCESS, GET_ERRORS } from './types';

import {responseMessage} from '../utils/alert';
import { apiAction } from './apiActions';
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
			type: FETCH_PROJECTS_ACCESS,
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

export const fetchBenchmarkDomains = (domains) => dispatch => {
	if(domains.status === 200) {
		dispatch({
			type: FETCH_DOMAINS_ACCESS,
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

export const fetchBenchmarkUsers = (users) => dispatch => {
	if(users.status === 200) {
		dispatch({
			type: FETCH_USER_ACCESS,
			payload: users.data.data
		})
	}else{
		dispatch({
			type: GET_ERRORS,
			payload: users.data.data
		})
	}
};

/* Action: Changed savePermissions function
By: Syed On: 3/3/2020 */

export const savePermissions = (permissionObj) => {
    return apiAction({
        url: config.laravelBaseUrl+'save_benchmarking_domain_access', 
        method: "POST",
        data: permissionObj,
        onSuccess: setsavePermissions,
        onFailure: () => console.log("Error occured in savePermissions"),
        label: "saveDomainsPermissions"
      });
}

function setsavePermissions(res){
    responseMessage("success",res.message,"");
    return {
        type: "saveDomainsPermissions",
        payload: res.data
    }
}

