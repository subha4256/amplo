import { BALANCED_SCORECARD_KPI, BALANCED_SCORECARD_CATEGORIES, FETCH_ALL_BALANCED_SCORECARDS,FETCH_ALL_KPI_AGAINST_BALANCED_SCORECARDS } from '../actions/types';

const initialState = {
    kpiData : [],
    categories : [],
    allBsc : [],
    strategicObjectives:[]
}

export default (state = initialState, action) => {
    switch(action.type){
        case BALANCED_SCORECARD_KPI:
            return{
                ...state,
                kpiData : action.payload
            }
        case BALANCED_SCORECARD_CATEGORIES:
            return{
                ...state,
                categories:action.payload
            }
        case FETCH_ALL_BALANCED_SCORECARDS:
            return{
                ...state,
                allBsc : action.payload
            }
        case FETCH_ALL_KPI_AGAINST_BALANCED_SCORECARDS:
            return{
                ...state,
                strategicObjectives : action.payload
            }
        default : 
            return state;
    }
}