import { SAVE_DECOMPOSITION,FETCH_CUSTOM_SCORING_MECHANISMS,FETCH_SCORING_MECHANISMS, NEW_MECHANISM, PROCESSES, CONNECTED_PROCESSES } from '../actions/types';
const initialState = {
	mechanisms: [],
	processes: {},
	connectedProcesses: [],
	mechanism:{},
	customMechanisms:[],
	saveDecomposition:{}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_SCORING_MECHANISMS:
			return {
				...state,
				mechanisms: action.payload
			}
		break;
		case NEW_MECHANISM:
			return {
				...state,
				mechanism: action.payload
			}
		break;
		case FETCH_CUSTOM_SCORING_MECHANISMS:
			return {
				...state,
				customMechanisms: action.payload
			}
		break;
		case PROCESSES:
			return {
				...state,
				processes: action.payload
			}
		break;
		case CONNECTED_PROCESSES:
			return {
				...state,
				connectedProcesses: action.payload
			}
		break;
		case SAVE_DECOMPOSITION:
			return {
				...state,
				saveDecomposition: action.payload
			}
		break;
        default:
			return state;
	}
}