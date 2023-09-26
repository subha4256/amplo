import { FETCH_OWNERS, FETCH_TASKS } from '../actions/types';
const initialState = {
	owners: [],
	tasks: []
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_OWNERS:
			return {
				...state,
				owners: action.payload
			}
		break;
		case FETCH_TASKS:
			return {
				...state,
				tasks: action.payload
			}
		break;
		default:
			return state;
	}
}