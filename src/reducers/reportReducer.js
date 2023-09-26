import { FETCH_FUNCTIONAL_GRID_DATA, SELECTED_MODULE, SELECTED_MODULE_PARAMETER, EMPTY_MODULE } from '../actions/types';
const initialState = {
	gridData: {},
	currentModule:[],
	currentModuleParameter: []
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_FUNCTIONAL_GRID_DATA:
			return {
				...state,
				gridData: action.payload
			}

		case SELECTED_MODULE:
			return {
				...state,
				currentModule: action.payload,
				currentModuleParameter: []
			}	
		case EMPTY_MODULE:
			
			return{
				...state,
				currentModule:[]
			}
		case SELECTED_MODULE_PARAMETER:
			return {
				...state,
				currentModuleParameter: action.payload
			}		
	
        default:
			return state;
	}
}