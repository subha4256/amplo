import { UPDATE_COMPANY_PROFILE, FETCH_INDUSTRIES, FETCH_REGIONS, FETCH_COUNTRIES, FETCH_STATES, FETCH_CITIES, FETCH_PROFILE_QUESTIONS, FETCH_COMPANY_PROFILE } from '../actions/types';
const initialState = {
	industries: [],
	regions: [],
	countries: [],
	states: [],
	cities: [],
	questions: [],
	profile: {},
	updateCompanyProfileStatus:{}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_INDUSTRIES:
			return {
				...state,
				industries: action.payload
			}
		break;
		case FETCH_REGIONS:
			return {
				...state,
				regions: action.payload
			}
		break;
		case FETCH_COUNTRIES:
			return {
				...state,
				countries: action.payload
			}
		break;
		case FETCH_STATES:
			return {
				...state,
				states: action.payload
			}
		break;
		case FETCH_CITIES:
			return {
				...state,
				cities: action.payload
			}
		break;
		case FETCH_PROFILE_QUESTIONS:
			return {
				...state,
				questions: action.payload
			}
		break;
		case FETCH_COMPANY_PROFILE:
			return {
				...state,
				profileData: action.payload
			}
		break;
		case UPDATE_COMPANY_PROFILE:
			return {
				...state,
				updateCompanyProfileStatus: action.payload
			}
		break;
        default:
			return state;
	}
}