import { SEARCH_PROCESS } from '../actions/types';

const initialState = {
    srchArray: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SEARCH_PROCESS:
			return {
				...state,
                srchArray: action.payload
            }
        break;
        default:
			return state;
    }
}