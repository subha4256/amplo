import { TEMPLATES, GET_SUCCESS, FETCH_FUNCTIONS, FETCH_PHASES, SAVE_FUNCTION, SAVE_PHASE, CREATE_TEMPLATE, TEMPLATE_STYLES, GET_TEMPLATE, UPDATE_TEMPLATE, DELETE_TEMPLATE, DUPLICATE_TEMPLATE } from "../actions/types";

const initialState = {
	templates: [],
	functions: [],
	phases: [],
	saveFunctionData: {},
	savePhaseData: {},
	templateData: {},
	templateStyles: [],
	template: {},
	updateTemplateData: {},
	deleteTemplateData: {},
	duplicateTemplateData: [],
	successmsg: false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case TEMPLATES:
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
		case SAVE_FUNCTION:
			return {
				...state,
				saveFunctionData: action.payload
			}
		break;
		case SAVE_PHASE:
			return {
				...state,
				savePhaseData: action.payload
			}
		break;
		case CREATE_TEMPLATE:
			return {
				...state,
				templateData: action.payload
			}
		break;
		case UPDATE_TEMPLATE:
			return {
				...state,
				updateTemplateData: action.payload
			}
		break;
		case TEMPLATE_STYLES:
			return {
				...state,
				templateStyles: action.payload
			}
		break;
		case GET_SUCCESS:
			return {
				...state,
				successmsg: action.payload
			}
		break;
		case GET_TEMPLATE:
			return {
				...state,
				template: action.payload
			}
		break;
		case DELETE_TEMPLATE:
			return {
				...state,
				deleteTemplateData: action.payload
			}
		break;
		case DUPLICATE_TEMPLATE:
			return {
				...state,
				duplicateTemplateData: action.payload
			}
		break;
		default:
			return state;
	}
}