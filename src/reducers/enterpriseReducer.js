import { ENTERPRISE_ACCOUNTS, CLIENT_DETAILS, UPDATE_ENTERPRISE_ACCOUNT, MARKET_INDUSTRIES } from '../actions/types';
const initialState = {
	accounts: {},
	clientDetail: {},
	updateAccountStatus: {},
	marketIndustries: []
}

export default function (state = initialState, action) {
	switch (action.type) {
		case ENTERPRISE_ACCOUNTS:
			return {
				...state,
				accounts: action.payload
			}
			break;
		case CLIENT_DETAILS:
			return {
				...state,
				clientDetail: action.payload
			}
			break;
		case UPDATE_ENTERPRISE_ACCOUNT:
			return {
				...state,
				updateAccountStatus: action.payload
			}
			break;
		case MARKET_INDUSTRIES:
			return {
				...state,
				marketIndustries: action.payload
			}
			break;
		default:
			return state;
	}
}