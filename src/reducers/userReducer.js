import { FORGOT_PASSWORD, RESET_PASSWORD, CHANGE_PASSWORD, USER_INFO, RESTRICTED_DOMAINS, EMP_REGISTER, USER_ACCESS_TYPES } from '../actions/types';
const initialState = {
	forgotData: {},
	resetData: {},
	changePwdData: {},
	userData: {},
	restrictedDomains: [],
	accountTypes: [],
	empRegister: {}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FORGOT_PASSWORD:
			return {
				...state,
				forgotData: action.payload
			}
		break;
		case RESET_PASSWORD:
			return {
				...state,
				resetData: action.payload
			}
		break;
		case CHANGE_PASSWORD:
			return {
				...state,
				changePwdData: action.payload
			}
		break;
		case USER_INFO:
			return {
				...state,
				userData: action.payload
			}
		break;
		case RESTRICTED_DOMAINS:
			return {
				...state,
				restrictedDomains: action.payload
			}
		break;
		case USER_ACCESS_TYPES:
			return {
				...state,
				accountTypes: action.payload
			}
		break;
		case EMP_REGISTER:
			return {
				...state,
				empRegister: action.payload
			}
		break;
        default:
			return state;
	}
}