import { FETCH_PROJECTS_ACCESS, FETCH_DOMAINS_ACCESS, FETCH_USER_ACCESS } from '../actions/types';
const initialState = {
	projects: [],
	domains: [],
	users: []
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_PROJECTS_ACCESS:
			return {
				...state,
				projects: action.payload
			}
		break;
		case FETCH_DOMAINS_ACCESS:
			return {
				...state,
				domains: action.payload
			}
		break;
		case FETCH_USER_ACCESS:
			return {
				...state,
				users: action.payload
			}
		break;
        default:
			return state;
	}
}