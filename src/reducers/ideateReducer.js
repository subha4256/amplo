import { FETCH_EPICS, FETCH_IDEAS, FETCH_LOOKUPS, FETCH_PROBLEM_PINNING, FETCH_SWOT } from '../actions/types';
const initialState = {
	epics: {},
	ideas: [],
	lookups: [],
	pins: [],
	swot : [],
	voters : [],
	dvf : []
}

export default function(state = initialState, action) {
	switch(action.type) {
		case 'GET_DVF_SCORE' :
			return {
				...state,
				dvf : action.payload
			}
		case 'GET_ALL_VOTERS':
			return {
				...state,
				voters : action.payload
			}
		case FETCH_SWOT :
			return {
				...state,
				swot : action.payload
			}
		case FETCH_EPICS:
			return {
				...state,
				epics: action.payload
			}
		break;
		case FETCH_IDEAS:
			return {
				...state,
				ideas: action.payload
			}
		break;
		case FETCH_LOOKUPS:
			return {
				...state,
				lookups: action.payload
			}
		break;
		case FETCH_PROBLEM_PINNING:
			return {
				...state,
				pins: action.payload
			}
		break;
        default:
			return state;
	}
}