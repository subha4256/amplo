import { SAVE_ANSWERS,SAVE_PROFILE, SECURITY_QUESTIONS, USER_PROFILE } from '../actions/types';
const initialState = {
	questions: [],
	profile: {},
	saveprofile:{},
	saveAnswers:{},
}

export default function(state = initialState, action) {
	switch(action.type) {
		case USER_PROFILE:
			return {
				...state,
				profile: action.payload
			}
		break;
		case SECURITY_QUESTIONS:
			return {
				...state,
				questions: action.payload
			}
		break;
		case SAVE_PROFILE:
			return {
				...state,
				saveprofile: action.payload
			}
		break;
		case SAVE_ANSWERS:
			return {
				...state,
				saveAnswers: action.payload
			}
		break;
        default:
			return state;
	}
}