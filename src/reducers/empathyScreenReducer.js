import {
    EMPATHY_NOTES_STAKEHOLDERS,
    EMPATHY_NOTES,
    GET_ALL_EMPATHY_LIFECYCLE,
    SAVE_EMPATHY_MAP,
    GET_EMPATHY_NOTES_STK_DESC,
    GET_DTNOI_STK
} from '../actions/types';


const initialState = {
    allempathyLifecycle: {},
    StkDescOnEmpathyMap: [],
    dtnoiStakeholder: []
}

export default (state = initialState,action) => {
    switch(action.type){
        case GET_DTNOI_STK: 
            return {
                ...state,
                dtnoiStakeholder: action.payload
            }
        case GET_EMPATHY_NOTES_STK_DESC:
            return{
                ...state,
                StkDescOnEmpathyMap: action.payload
            }
        case SAVE_EMPATHY_MAP:
            return{
                ...state
            }
        case GET_ALL_EMPATHY_LIFECYCLE:
            return{
                ...state,
                allempathyLifecycle: action.payload
            }
        case EMPATHY_NOTES_STAKEHOLDERS:
            return{
                ...state
            }
        case EMPATHY_NOTES:
            return{
                ...state
            }
        default : 
            return state;
    }
}