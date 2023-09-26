import { 
    FETCH_STAKEHOLDERS, 
    FETCH_STAKEHOLDERS_TYPE, 
    FETCH_DT_STAKEHOLDER_LOCATIONS, 
    FETCH_DT_STAKEHOLDER_MANAGERS, 
    FETCH_DT_STAKEHOLDER_DEPARTMENTS, 
    FETCH_DT_STAKEHOLDER_BUSINESS_ENTITY,
	FETCH_DT_STAKEHOLDER_EMPLOYEE_TYPE,
	FETCH_DT_STAKEHOLDER_MODEL,
	FETCH_DT_STAKEHOLDER_PARTNER_TYPE,
	FETCH_DT_STAKEHOLDER_ORGANIZATIONAL_LEVEL,
	FETCH_DT_STAKEHOLDER_ASSET_CATEGORY,
	FETCH_DT_STAKEHOLDER_ASSET_TYPE,
    SAVE_DT_STAKEHOLDER,
    ERROR  
} from '../actions/types';

const initialState = {
    stakeholders: [],
    stakeholdersType : [],
    locations : [],
    managers : [],
    departments : [],
    businessEntity: [],
    employeeType: [],
    model: [],
    partnerType: [],
    organizationalLevel: [],
    assetCategory: [],
    assetType: [],
    responseData: [],
    validationErrMsg: []
}

export default function(state = initialState, action){
    switch(action.type){
        case SAVE_DT_STAKEHOLDER:
            return {
                ...state,
                responseData: action.payload,
                validationErrMsg: []
            }            
        case FETCH_STAKEHOLDERS:
            return{
                ...state,
                stakeholders:action.payload
            }
        case FETCH_STAKEHOLDERS_TYPE : 
            return{
                ...state,
                stakeholdersType : action.payload
            }
        case FETCH_DT_STAKEHOLDER_LOCATIONS : 
            return{
                ...state,
                locations : action.payload
            }
        case FETCH_DT_STAKEHOLDER_MANAGERS :
            return{
                ...state,
                managers : action.payload
            }
        case FETCH_DT_STAKEHOLDER_DEPARTMENTS :
            return{
                ...state,
                departments : action.payload
            }
        case FETCH_DT_STAKEHOLDER_BUSINESS_ENTITY :
            return{
                ...state,
                businessEntity : action.payload
            }
        case FETCH_DT_STAKEHOLDER_EMPLOYEE_TYPE :
                return{
                    ...state,
                    employeeType : action.payload
                }
        case FETCH_DT_STAKEHOLDER_MODEL :
            return{
                ...state,
                model : action.payload
            }
        case FETCH_DT_STAKEHOLDER_PARTNER_TYPE :
            return{
                ...state,
                partnerType : action.payload
            }
        case FETCH_DT_STAKEHOLDER_ORGANIZATIONAL_LEVEL :
            return{
                ...state,
                organizationalLevel : action.payload
            }
        case FETCH_DT_STAKEHOLDER_ASSET_CATEGORY :
            return{
                ...state,
                assetCategory : action.payload
            }
        case FETCH_DT_STAKEHOLDER_ASSET_TYPE :
            return{
                ...state,
                assetType : action.payload
            }
        case ERROR: 
            return{
                ...state,
                validationErrMsg: action.payload
            }        
        default:
            return state;
    }
}