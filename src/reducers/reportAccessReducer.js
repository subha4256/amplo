import { FETCH_USERS, FETCH_REPORTS } from '../actions/types';
const initialState = {
	users: {},
	reports: {}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_USERS:
			return {
				...state,
				users: action.payload
			}
		break;
		case FETCH_REPORTS:
			return {
				...state,
				reports: action.payload
			}
		break;
        default:
			return state;
	}
}