import { FETCH_STAKEHOLDERS, FETCH_NOI, GET_ERRORS } from './types';

export const fetchStakeHolders = (stakeHolders) => (dispatch) => {
    if(stakeHolders.status === 200) {
		dispatch({
			type: FETCH_STAKEHOLDERS,
			payload: stakeHolders.data.data
		})
	}else{
        dispatch({
			type: GET_ERRORS,
			payload: stakeHolders.data.data
		})
    }
}

export const fetchNoi = (noi) => (dispatch) => {
	if(noi.status === 200){
		dispatch({
			type: FETCH_NOI,
			payload : noi.data.data
		})
	}else{
		dispatch({
			type:GET_ERRORS,
			payload: noi.data.data
		})
	}
}