import {  GET_ACCESS_TYPE } from '../actions/types';

const initialState = {
    powerbiAccessToken:{},
    powerbiEmbedToken:{},
    powerbiReports:[]
}
export default function(state = initialState,action){
    switch(action.type){
        case 'GET_ACCESS_TOKEN':
            return{
                ...state,
                powerbiAccessToken : action.payload
            }
            case 'GET_EMBED_TOKEN':
                
                    return{
                        ...state,
                        powerbiEmbedToken : action.payload
                    }
                    case 'GET_POWERBI_REPORTS':
                
                    return{
                        ...state,
                        powerbiReports : action.payload
                    }
        case 'EMPTY_POWERBI_REPORTS':
            console.log('Action dispatched');
            return{
                ...state,
                powerbiAccessToken:{},
                powerbiEmbedToken:{},
                powerbiReports:[]
            }            
        default:
            return{
                ...state
            }
    }
        

    }