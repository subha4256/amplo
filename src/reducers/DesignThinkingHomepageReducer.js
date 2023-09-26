import { FETCH_DTPROJECTS , DTPROJECT_CREATE_PERMISSION } from '../actions/types';

const initialState = {
    projects: [],
    permission : ""
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_DTPROJECTS:
            return{
                ...state,
                projects:action.payload
            }
        break;
        case DTPROJECT_CREATE_PERMISSION:
            return{
                ...state,
                permission:action.payload
            }
        break;
        default:
            return state;
    }
}
