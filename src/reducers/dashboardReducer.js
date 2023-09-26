import { FETCH_DASHBORAD_DATA, FETCH_DASHBOARD_WIDGETS,FETCH_AM_PERCENTAGE_VAL, FETCH_CM_PERCENTAGE_VAL } from '../actions/types';

const initialState = {
	items: {},
	amPercentageVal: null,
	amPercentageVal: null,
	registrationData  : [],
	dashboardWidgets:[],
	saveDashboard:{},
	saveFpmDashboard:null,
	getFpmComparisonData:[]
}
export default function(state = initialState, action) {
	switch(action.type) {
		case 'RESET_SAVE_FPM_VALUE':
			return{
				...state,saveFpmDashboard:null
			}
		case 'SAVE_FPM_COMPARISON_DASHBOARD':
			return{
				...state,saveFpmDashboard:action.payload
			}
			case 'GET_FPM_COMPARISON_DASHBOARD':
			return{
				...state,getFpmComparisonData:action.payload
			}
		case 'FETCH_USER_REGISTRATION_DETAILS':
			return{
				...state,
				registrationData : action.payload
			}
		case FETCH_DASHBORAD_DATA:
			return {
				...state,
				items: action.payload
			}
		break;
		case FETCH_AM_PERCENTAGE_VAL:
			return {
				...state,
				amPercentageVal: action.payload[0].Percentage
			}
		break;
		case FETCH_CM_PERCENTAGE_VAL:
			return {
				...state,
				cmPercentageVal: action.payload[0].Percentage
			}
		break;
		case FETCH_DASHBOARD_WIDGETS:
			return {
				...state,
				dashboardWidgets  : action.payload
			}
		break;
		case 'SAVE_DASHBOARD_ACCESS':
			return{
				saveDashboard:action.payload
			}
		default:
			return state; 
	}
}
