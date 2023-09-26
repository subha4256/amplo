import { GET_REPORTS_DATA } from "../actions/types"


const initial_state = {
    reports_data: []
}

export const Reports_Reducer = ( state = initial_state , action) => {

    switch(action.type) {
		case GET_REPORTS_DATA:
			return {
				...state,
				reports_data: action.payload?.data
			}
		break;
	
		default:
			return state;
	}

}