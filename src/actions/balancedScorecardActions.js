import { BALANCED_SCORECARD_KPI, BALANCED_SCORECARD_CATEGORIES,FETCH_ALL_BALANCED_SCORECARDS,FETCH_ALL_KPI_AGAINST_BALANCED_SCORECARDS } from './types';
import { apiAction } from './apiActions';
const config = require('../config');

export const fetchBalancedScorecardKpi = (id) => {
    return apiAction({
        url: config.laravelBaseUrl + 'getKpis/0/'+id, 
        onSuccess: setfetchBalancedScorecardKpi,
        onFailure: () => console.log("Error occured in fetchBalancedScorecardKPI"),
        label: BALANCED_SCORECARD_KPI
      });
}

const setfetchBalancedScorecardKpi = data => {
    return {
        type: BALANCED_SCORECARD_KPI,
		payload: data
    }
}

export const fetchBalancedScorecardCategories = (id) => {
    return apiAction({
        url: config.laravelBaseUrl + 'getBscCategories/bsc/'+id, 
        onSuccess: setfetchBalancedScorecardCategories,
        onFailure: () => console.log("Error occured in fetchBalancedScorecardCategories"),
        label: BALANCED_SCORECARD_CATEGORIES
      });
}

const setfetchBalancedScorecardCategories = data => {
    return {
        type: BALANCED_SCORECARD_CATEGORIES,
		payload: data
    }
}

export const fetchAllBalancedScorecards = () => {
    return apiAction({
        url: config.laravelBaseUrl + 'getAllBSC', 
        onSuccess: setfetchAllBalancedScorecards,
        onFailure: () => console.log("Error occured in fetchAllBalancedScorecards"),
        label: FETCH_ALL_BALANCED_SCORECARDS
      });
}

const setfetchAllBalancedScorecards = data => {
    return {
        type: FETCH_ALL_BALANCED_SCORECARDS,
		payload: data.data
    }
}

export const fetchAllKpiAgainstBalancedScorecards = (projectId) => {
    return apiAction({
        url: config.laravelBaseUrl + 'GetKpisAgainstBalanceScoreCardId/'+projectId, 
        onSuccess: setfetchAllKpiAgainstBalancedScorecards,
        onFailure: () => console.log("Error occured in setfetchAllKpiAgainstBalancedScorecards"),
        label: FETCH_ALL_KPI_AGAINST_BALANCED_SCORECARDS
      });
}

const setfetchAllKpiAgainstBalancedScorecards = data => {
    console.log("fetch kpi data",data);
    console.log("fetch kpi",data && data.data && data.data[0].strategicobjective && data.data.strategicobjective[0] && data.data.strategicobjective[0].Kpi?data.data.strategicobjective[0].Kpi:[]);
    return {
        type: FETCH_ALL_KPI_AGAINST_BALANCED_SCORECARDS,
		payload: data && data.data?data.data:[]
    }
}

