const initialState = {
	items: [],
	item: {}
}

export default function(state = initialState, action) {
	switch(action.type) {
		case 'FETCH_RATINGS':
			return {
				...state,
				items: action.payload
			}
		break;
		default:
			return state;
	}
}