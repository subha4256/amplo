import { FETCH_PROTOTYPE } from '../actions/types';

const initialState = {
	prototype : []
}

export default (state=initialState, action) => {
    switch(action.type){
        case FETCH_PROTOTYPE:
            return {
                ...state,
                prototype : action.payload
            }
        default : 
            return state
    }
}