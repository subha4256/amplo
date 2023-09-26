import {
    FETCH_BENCHMARK_PROJECTS_WITH_DOMAINS, 
    FETCH_DECOMPOSITION_PROJECTS, 
    FETCH_KPIS_CONTROLS,
    FETCH_USER_DETAILS,
    FETCH_OTHER_PROJECTS_OF_USER,
    FETCH_NOI_TEMPLATES,
    FETCH_DT_STAKEHOLDERS,
    FETCH_DT_PROJ_DETAILS,
    FETCH_EPIC,
    FETCH_EPIC_VERSION_HISTORY,
    SAVE_EPIC,
    FETCH_DECOMP_PROJ_FN_PHASE_LVL,
    EPIC_LOCK_UNLOCK,
    FETCH_ALL_EPIC,
    FETCH_EPIC_PROJECT,
    FETCH_EPIC_SUBEPIC_DETAILS,
    FETCH_DT_CHAMPION
} from '../actions/types';


const initialState = {
    benchmarkingProjects : [],
    decompositionProjects: [],
    kpiscontrols:[],
    projectdetails: [],
    UserDetail: {},
    UserProjectDetails: [],
    NetworkOfInfluence: [],
    StakeHolder: [],
    UserProjectDetails: [],
    NetworkOfInfluence: [],
    dtProjects:{},
    epic:[],
    checkNoi:'',
    versionHistoryNo: 0,
    epicList:[],
    epicProject:[],
    EpicSubepicDetailData:[],
    DtChampion: []
}

export default (state = initialState,action) => {
    switch(action.type){
        case FETCH_DT_CHAMPION:
            return{
                ...state,
                DtChampion: action.payload 
            }
        case FETCH_EPIC_SUBEPIC_DETAILS:
            return{
                ...state,
                EpicSubepicDetailData: action.payload 
            }
        case FETCH_EPIC_PROJECT:
            return{
                ...state,
                epicProject: action.payload 
            }
        case FETCH_ALL_EPIC:
            return{
                ...state,
                epicList: action.payload 
            }
        case EPIC_LOCK_UNLOCK:
            return{
                ...state
            }
        case FETCH_DECOMP_PROJ_FN_PHASE_LVL:
            return{
                ...state
            }
        case SAVE_EPIC:
            return{
                ...state,
                epic : action.payload
            }
        case FETCH_EPIC:
            return{
                ...state,
                epic : action.payload,
                checkNoi: action.payload ? 1 : 0,    
            }
        case FETCH_EPIC_VERSION_HISTORY:
            return{
                ...state,
                versionHistoryNo : action.payload.length>0 ? action.payload : 0
            }
        case FETCH_DT_PROJ_DETAILS:
            return{
                ...state,
                dtProjects : action.payload
            }
        case FETCH_OTHER_PROJECTS_OF_USER:
            return{
                ...state,
                UserProjectDetails : action.payload
            }
        case FETCH_NOI_TEMPLATES:
            return{
                ...state,
                NetworkOfInfluence : action.payload
            }
        case FETCH_DT_STAKEHOLDERS:
            return{
                ...state,
                StakeHolder : action.payload
            }

        case FETCH_USER_DETAILS:
            return{
                ...state,
                UserDetail : action.payload
            }
        case FETCH_BENCHMARK_PROJECTS_WITH_DOMAINS:
            return{
                ...state,
                benchmarkingProjects : action.payload
            }
        case FETCH_DECOMPOSITION_PROJECTS:
            return{
                ...state,
                decompositionProjects: action.payload
            }
        case FETCH_KPIS_CONTROLS:
            return{
                ...state,
                kpiscontrols: action.payload
            }
        default : 
            return state;
    }
}