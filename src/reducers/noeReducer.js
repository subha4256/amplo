import {
    FETCH_NOE_BY_SUBEPIC,
    FETCH_NOE
} from '../actions/types';


const initialState = {
    noeData: [],
    noeBySubepicData: [],

}

export default (state = initialState,action) => {
    switch(action.type){
        case FETCH_NOE_BY_SUBEPIC:
            return{
                ...state,
                noeBySubepicData: action.payload
            }
        case FETCH_NOE:
            return{
                ...state,
                noeData: action.payload
            }

        default : 
            return state;
    }
}