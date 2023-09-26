import { FETCH_PROJECTS,FETCH_TEMPLATES, FETCH_FUNCTIONS, FETCH_PHASES, FETCH_PROJECT_FUNCTIONS, FETCH_PROJECT_PHASES, PROJECT_USERS, CAPABILITY_USER_PERMISSIONS, EDIT_CLIENT_FUNC_PHASE_TEMP , FETCH_LINK_PROJECTS } from "../actions/types";

const initialState = {
	items: {},
	templates: {},
	functions: [],
	phases: [],
	projectFunctions: [],
	projectPhases: [],
	projectUsers: {},
	userPermissions: {},
	editClientFuncPhase: {}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_PROJECTS:
			return {
				...state,
				items: action.payload
			}
		break;
		case FETCH_TEMPLATES:
			return {
				...state,
				templates: action.payload
			}
		break;
		case FETCH_FUNCTIONS:
			return {
				...state,
				functions: action.payload
			}
		break;
		case FETCH_PHASES:
			return {
				...state,
				phases: action.payload
			}
		break;
		case FETCH_PROJECT_FUNCTIONS:
			return {
				...state,
				projectFunctions: action.payload
			}
		break;
		case FETCH_PROJECT_PHASES:
			return {
				...state,
				projectPhases: action.payload
			}
		break;
		case PROJECT_USERS:
			return {
				...state,
				projectUsers: action.payload
			}
		break;
		case CAPABILITY_USER_PERMISSIONS:
			return {
				...state,
				userPermissions: action.payload
			}
		break;
		case EDIT_CLIENT_FUNC_PHASE_TEMP:
			return {
				...state,
				editClientFuncPhase: action.payload
			}
		break;
		default:
			return state;
	}
}