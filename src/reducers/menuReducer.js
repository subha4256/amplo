import { FETCH_MENU } from '../actions/types';

const initialState = {
	items: [],
	
}
export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_MENU:
			return {
				...state,
				items: action.payload
			}
		break;
		default:
			return state;
	}
}
