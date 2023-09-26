const initialState = {
	items: [],
	item: {}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case 'FETCH_IOT':
			return {
				...state,
				items: action.payload
			}
		break;
		case 'TOGGLE_LOCK':
			return {
				...state,
				item: action.payload
			}
		break;
		default:
			return state;
	}
}