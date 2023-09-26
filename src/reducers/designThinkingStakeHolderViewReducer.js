import { FETCH_STAKEHOLDERS, FETCH_NOI} from '../actions/types';

const initialState = {
    stakeholders: [],
    noi : {},
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_STAKEHOLDERS:
            return{
                ...state,
                stakeholders:action.payload
            }
        break;
        case FETCH_NOI:
            return{
                ...state,
                noi:action.payload
            }
        break;
        default:
            return state;
    }
}