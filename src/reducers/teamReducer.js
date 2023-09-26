import { FETCH_TEAM_USER, SAVE_TEAM_USER, GET_ACCESS_TYPE, UPDATE_USER,GET_INDIVIDUAL_USER } from '../actions/types';

const initialState = {
	teamData: [],
	saveTeamUser:{},
	accessType:[],
	updateUser:{},
	getUserData:{}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case 'FETCH_TEAM_USER':
			return {
				...state,
				teamData: action.payload
			}
		break;
		case SAVE_TEAM_USER:
			return {
				...state,
				saveTeamUser: action.payload
			}
		break;
		case GET_ACCESS_TYPE:
			return {
				...state,
				accessType: action.payload
			}
		break;		
		case UPDATE_USER:
			return {
				...state,
				updateUser: action.payload
			}
		break;
		case GET_INDIVIDUAL_USER:
			return {
				...state,
				getUserData: action.payload
			}
		break;
		default:
			return state;
	}
}