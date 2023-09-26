import {GET_FPM_MERGE,SAVE_FPM_MERGE,GET_CAUSAL_DATA_AND_SCORE,FETCH_PROJECT_DEPENDENT_DETAILS, MAKELOADINGTRUE, COPY_PROJECT, FETCH_PROJECTS, FETCH_FUNCTIONS, FETCH_PROCESS_DATA, ACTIVITY_BANK, FETCH_PHASES, SCORES, ACTIVITY_LOCATION ,FETCH_LINK_PROJECTS, CAN_SCORE_CHECK_CAUSAL} from "../actions/types";
import {responseMessage} from '../utils/alert';
const initialState = {
	items: [],
	functions: [],
	phases: [],
	processData: {},
	processes: {},
	item: {},
	scores: [], 
	copySuccess:{},
	activityLocation: {},
	loadingstatus: true ,
	linkProjects:[],
	projectDependentDetails:[],
	canScoreCheckCausal:'0',
	getScoreAndDataCausal:{},
	fpmData:[],
	saveFpmData:{}

}

export default function(state = initialState, action) {
	switch(action.type) {

		case FETCH_LINK_PROJECTS:
			return {
				...state ,
				linkProjects: action.payload
			}
		break;
		case GET_FPM_MERGE:
			return {
				...state ,
				fpmData: action.payload
			}
		break;
		case SAVE_FPM_MERGE:
			return {
				...state ,
				saveFpmData: action.payload
			}
		break;
		case FETCH_PROJECT_DEPENDENT_DETAILS:
			return{
				...state,
				projectDependentDetails:action.payload
			}
		break;
		case FETCH_PROJECTS:
			return {
				...state,
				items: action.payload
			}
		break;
		case COPY_PROJECT:
			return {
				...state,
				copySuccess: action.payload,
				loadingstatus: !action.payload.success
			}
		break;
		case CAN_SCORE_CHECK_CAUSAL:
			return {
				...state,
				canScoreCheckCausal: action.payload
			}
		break;
		case GET_CAUSAL_DATA_AND_SCORE:
			return {
				...state,
				getScoreAndDataCausal: action.payload
			}
		break;
		case FETCH_FUNCTIONS:
			return {
				...state,
				functions: action.payload
			}
		break;
		case FETCH_PROCESS_DATA:
			return {
				...state,
				processData: action.payload,
				loadingstatus: !action.payload.success
			}
		break;
		case MAKELOADINGTRUE:
			return {
				...state,
				loadingstatus: true
			}
		case ACTIVITY_BANK:
			return {
				...state,
				processes: action.payload
			}
		break;
		case ACTIVITY_LOCATION:
			return {
				...state,
				activityLocation: action.payload
			}
		break;
		case FETCH_PHASES:
			return {
				...state,
				phases: action.payload
			}
		break;
		case SCORES:
			return {
				...state,
				scores: action.payload
			}
		break;
		default:
			return state;
	}
}