import { GET_SUPPORT_MENU, GET_SUPPORT_DETAILS, GET_SUPPORT_PAGE_DETAILS } from '../actions/types';
const config = require('../config');

const initialState = {
    MenuItems:[],
    SupportDetails:[],
    SupportQuestions : {}
}

export default function(state = initialState,action){
    
    switch(action.type){
        case GET_SUPPORT_MENU:
            return{
                ...state,
                MenuItems : action.payload
            }
        case GET_SUPPORT_DETAILS:
            return{
                ...state,
                SupportDetails:action.payload
            }
        case GET_SUPPORT_PAGE_DETAILS:
            return {
                ...state,
                SupportQuestions : action.payload
            }
        default:
			return state;
    }
}