import { object } from 'underscore';
import {FETCH_BENCHMARK_PROJECTS_WITH_DOMAINS, 
	FETCH_DECOMPOSITION_PROJECTS,FETCH_DESIGNTHINKING_PROJECTS,GET_AUDIT_HISTORY, 
	FETCH_KPIS_SET_UESERS, GET_KPI_AUDIT_TYPES, ASSOCIATION_DATA, SAVE_KPI_AUDIT, GET_KPI_AUDIT,
	 CREATE_KPI, ADD_KPI, FETCH_KPIS_SET_DETAILS, SAVE_KPIS_PERMISSION, FETCH_KPIS_ACCESS, 
	 FETCH_KPI_ACCESS_USER, FETCH_KPISET_ACCESS, FETCH_KPIS_BSC, FETCH_KPIS_USERS, 
	 FETCH_KPIS_SETS, FETCH_KPIS, GET_CONTROL_LEVER, UPDATED_LEVER, GET_KPI, GET_FREQUENCY,
	  GET_IMPRVBASIS, GET_UOM, GET_UEM, DELETE_KPI, DELETE_LEVER,GET_AUDIT_NAMES, 
	  FETCH_KPI_SETS_FOR_USER,FETCH_KPI_AUDIT_DATA,SAVE_CO2EMMISIONTYPE_DATA,SAVE_CO2EMMISIONCOUNTRY,SAVE_CALCULATECO2EMMISION } from '../actions/types';
const initialState = {
	kpis: [],
	kpi: {},
	kpiAssociatonData: {},
	auditTypes:[],
	auditHistory:[],
	kpiAudit:{},
	leverData: {},
	deleteKpiData: {},
	deleteLeverData: {},
	updatedLever: {},
	frequency:[],
	improvement_basis:[],
	uom:[],
	kpiUsers:[],
	kpiSetUser:[],
	kpiSets:[],
	kpiSetsForUser:[],
	kpiAuditData:null,
	kpiBsc: [],
	kpiAccessSets:[],
	kpiAccessUsers:[],
	kpiAccessKpis:[],
	kpiAccessSavePermission:[],
	kpiSetDetails:[],
	uem:[],
	kpiSetSave:{},
	kpiAuditSave:{},
	benchmarkingProjects : [],
	decompositionProjects: [],
	designthinkingProjects:[],
	auditNames : [],
	filterPreferences : [],
	kpiCo2EmmusiontypeData:[],
	getcountryforco2emmision:[],
	savecalculateEmmisionValue:[]
}

export default function(state = initialState, action) {
	switch(action.type) {
		case 'GET_SAVED_FILTER_PREFERENCES':
			return {
				...state,
				filterPreferences : action.payload
			}
		case FETCH_KPI_SETS_FOR_USER: 
			return {
				...state,
				kpiSetsForUser: action.payload
			}
		case FETCH_KPI_AUDIT_DATA:
			
			return{
				...state,
				kpiAuditData:action.payload
			}	
		case SAVE_KPI_AUDIT:
			return {
				...state,
				kpiAuditSave: action.payload
			}
		case GET_AUDIT_HISTORY:
			return {
				...state,
				auditHistory: action.payload
			}
		case GET_KPI_AUDIT_TYPES:
			return {
				...state,
				auditTypes:action.payload
			}
		case FETCH_KPIS_SET_UESERS:
			return {
				...state,
				kpiSetUser:action.payload
			}
		case FETCH_KPIS:
			return {
				...state,
				kpis: action.payload
			}
		case ASSOCIATION_DATA:
			return {
				...state,
				kpiAssociatonData: action.payload
			}
			
		//break;
		case ADD_KPI:
		case CREATE_KPI:	
			return {
				...state,
				kpiCreate: action.payload
			}
		//break;
		case "SAVE_KPIS_SETS":
			return {
				...state,
				kpiSetSave: action.payload
			}
		//break;
		case FETCH_KPIS_SET_DETAILS:
			return {
				...state,
				kpiSetDetails: action.payload
			}
		//break;
		case FETCH_KPIS_USERS:
			return {
				...state,
				kpiUsers: action.payload
			}
		//break;
		case FETCH_KPIS_BSC:
			return {
				...state,
				kpiBsc: action.payload
			}
		//break;
		case SAVE_CO2EMMISIONTYPE_DATA:
			return {
				...state,
				kpiCo2EmmusiontypeData: Object.values(action.payload),
			}
			//break
			
		case SAVE_CO2EMMISIONCOUNTRY:
				return {
					...state,
					getcountryforco2emmision: Object.values(action.payload),
				}
				//break
		case SAVE_CALCULATECO2EMMISION:
			console.log("hii",action.payload)
			return{
				...state,
				savecalculateEmmisionValue:action.payload,
			}
			//break
		case FETCH_KPIS_SETS:
			return {
				...state,
				kpiSets: action.payload,
				kpiAccessKpis:[],
				kpiSetUser:[]
			}
		//break;
		case FETCH_KPISET_ACCESS:
			return {
				...state,
				kpiAccessSets: action.payload
			}
		//break;
		case FETCH_KPI_ACCESS_USER:
			return {
				...state,
				kpiAccessUsers: action.payload
			}
		//break;
		
		case FETCH_KPIS_ACCESS:
			return {
				...state,
				kpiAccessKpis: action.payload
			}
		//break;

		case SAVE_KPIS_PERMISSION:
			return {
				...state,
				kpiAccessSavePermission: action.payload
			}
		//break;

		case GET_FREQUENCY:
			return {
				...state,
				frequency: action.payload
			}
			//break;
		case GET_IMPRVBASIS:
			return {
				...state,
				improvement_basis: action.payload
			}
			//break;
		case GET_UOM:
			return {
				...state,
				uom: action.payload
			}
			//break;
		case GET_UEM:
		return {
			...state,
			uem: action.payload
		}
		case GET_KPI:
			return {
				...state,
				kpi: action.payload
			}
		//break;
		case GET_KPI_AUDIT:
			return {
				...state,
				kpiAudit: action.payload
			}
		case GET_CONTROL_LEVER:
			return {
				...state,
				leverData: action.payload
			}
		//break;
		case UPDATED_LEVER:
			return {
				...state,
				updatedLever: action.payload
			}
		//break;
		case DELETE_KPI:
			return {
				...state,
				deleteKpiData: action.payload
			}
		//break;
		case DELETE_LEVER:
			return {
				...state,
				deleteLeverData: action.payload
			}
		case GET_AUDIT_NAMES:
			return{
				...state,
				auditNames : action.payload
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
		case FETCH_DESIGNTHINKING_PROJECTS:
			return{
				...state,
				designthinkingProjects: action.payload
			}

		//break;
        default:
			return state;
	}
}