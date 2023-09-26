import { SAVE_TEMPLATE_DECOMPOSITION, TEMPLATE_PROCESSES } from '../actions/types';
const initialState = {
	processes: {},
	saveDecomposition:{}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case TEMPLATE_PROCESSES:
			return {
				...state,
				processes: action.payload
			}
		break;
		case SAVE_TEMPLATE_DECOMPOSITION:
			return {
				...state,
				saveDecomposition: action.payload
			}
		break;
        default:
			return state;
	}
}