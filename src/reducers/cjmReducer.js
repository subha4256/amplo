import {
    CREATE_CJM,
    FETCH_CJM
} from '../actions/types';


const initialState = {
    cjmData: {},
}

export default (state = initialState,action) => {
    switch(action.type){
        case FETCH_CJM:
            return{
                ...state,
                cjmData: action.payload
            }
        case CREATE_CJM:
            return{
                ...state
            }
        default : 
            return state;
    }
}