import { GET_ALL_PERSONA, GET_ALL_LIFECYCLE_FOR_PERSONA, GET_ALL_STAKLEHOLDERS_FOR_PERSONA, GET_ALL_MOTIVATION_CATEGORY_FOR_PERSONA, GET_ALL_PERSONALITY_CATEGORY_FOR_PERSONA } from '../actions/types';

const initialState = {
    allPersona : [],
    allLifeCycle : [],
    allStakeholdersForPersona : [],
    allMotivationCategories : [],
    allPersonalityCategories : []
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_PERSONA:
            return{
                ...state,
                allPersona : action.payload
            }
        case 'NEW_GET_ALL_LIFECYCLE_FOR_PERSONA':
            return{
                ...state,
                allLifeCycle : action.payload
            }
        case GET_ALL_STAKLEHOLDERS_FOR_PERSONA:
            return{
                ...state,
                allStakeholdersForPersona : action.payload
            }
        case GET_ALL_MOTIVATION_CATEGORY_FOR_PERSONA:
            return{
                ...state,
                allMotivationCategories : action.payload
            }
        case GET_ALL_PERSONALITY_CATEGORY_FOR_PERSONA:
            return{
                ...state,
                allPersonalityCategories : action.payload
            }
        default :
            return state;
    }
}