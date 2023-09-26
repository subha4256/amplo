import { SAVE_AMPLO_QUESTIONS_ANSWERS, SAVE_QUESTIONS_BANK, SAVE_CLIENT_QUESTIONS_BANK, SAVE_CLIENT_DOMAINS, SAVE_AMPLO_DOMAINS, GET_AMPLO_QUESTIONS_BANK , GET_CLIENT_QUESTIONS_BANK, GET_AMPLO_DOMAINS, GET_CLIENT_DOMAINS, GET_AMPLO_QUESTIONS_BY_DOMAIN, GET_CLIENT_QUESTIONS_BY_DOMAIN, CURRENT_SELECTED_DOMAIN , CURRENT_SELECTED_QUESTIONS_BANK, SAVE_CLIENT_QUESTIONS_ANSWERS, CURRENT_SELECTED_DOMAIN_AMPLO, CURRENT_SELECTED_QUESTIONS_BANK_AMPLO, GET_ALL_QUESTION_STYLES_LISTING, SAVE_QUESTIONS_ATTACHMENT, GET_QUESTIONS_ATTACHMENT, GET_CLIENT_SIDEBAR_DOMAINS_QUESTIONS, GET_AMPLO_QUESTIONS_ATTACHMENT, GET_AMPLO_SIDEBAR_DOMAINS_QUESTIONS, GET_CLIENT_ASSIGNMENT, GET_AFLY_SCORE, GET_AFLY_DOMAIN_SCORE, IMPORT_GET_DOMAINS_BY_QUESTIONBANK, IMPORT_GET_QUESTIONSBANK_BY_BATCHID, IMPORT_GET_QUESTIONS_BY_DOMAIN, IMPORT_GET_INTERFACE_ATTACHMENT_BY_BATCHID, IMPORT_GET_AMPLO_DOMAINS_BY_QUESTIONBANK, IMPORT_GET_AMPLO_QUESTIONSBANK_BY_BATCHID, IMPORT_GET_AMPLO_QUESTIONS_BY_DOMAIN, IMPORT_GET_AMPLO_INTERFACE_ATTACHMENT_BY_BATCHID, GET_AMPLO_CLIENT_QUESTIONS_BANK } from '../actions/types';

const initialState = {
    AmploAndClientQuestionsBank : [],
    SaveAmploQuestionsAnswers:{},
    SaveClientQuestionsAnswers:{},
    SaveAmploQuestionsBank : {},
    ClientQuestionsBankSave : {}, 
    AmploDomainsSave : {},  
    ClientDomainsSave : {},
    AmploQuestionsBank : [],
    ClientQuestionsBank : [],
    AmploDomains : [],
    ClientDomains : [],
    AmploQuestions : [],
    ClientQuestions : [],
    currentSelectedDomainName : {},
    currentSelectedQuestionBank : {},
    currentSelectedDomainAmplo : {},
    currentSelectedQuestionBankAmplo : {},
    stylesList : [],
    saveClientQuestionAttachment : {},
    getClientQuestionAttachment : [],
    getAmploQuestionAttachment : [],
    clientSidebarDomainsQuestions : [],
    amploSidebarDomainsQuestions : [],
    clientAssignment : [],
    aFlyScore : [],
    aFlyDomainScore : [],
    previewQuestionBank : [],
    previewDomains : [],
    previewQuestions : [],
    previewInterfaceAttachments : [],
    previewAmploQuestionBank : [],
    previewAmploDomains : [],
    previewAmploQuestions : [],
    previewAmploInterfaceAttachments : [],
    amploUploadBatchInfo : [],
    clientUploadbatchInfo : [],
    clientQuestionsBankforAmplo : [],
    getCLientAnalyticsUsecaseData:[],
    setCLientAnalyticsUsecaseData:null,
    aflyScoreNew:[],
    aflyScoreDomain:[],
    painpointInitiatives:[],
    selectedCapabilityProject:null
}

export default function(state = initialState,action){
    switch(action.type){
        case GET_AMPLO_CLIENT_QUESTIONS_BANK:
            return{
                ...state,
                AmploAndClientQuestionsBank:action.payload
            }
        case 'RESET_SAVED_CLIENT_DATA':
            return{
               ...state,setCLientAnalyticsUsecaseData:null
            }
        case 'SET_CAPABILITY_PROJECT_WITH_ID':
            return{
                ...state,
                selectedCapabilityProject:action.payload
            }
        case 'RESET_CAPABILITY_PROJECT_WITH_ID':
            return{
                ...state,
            selectedCapabilityProject:null
            }
        case 'RESET_INITIATIVES':
            return{
                ...state,
                painpointInitiatives:[]
            }
        case 'FETCH_PAINPOINT_INITIATIVES':
            return{
                ...state,
                painpointInitiatives:action.payload
            }
        case 'GET_CLIENT_ANALYTICS_USER_RUNS':
            return{
                ...state,
                getCLientAnalyticsUsecaseData:action.payload,
            }
        case 'GET_CLIENT_ANALYTICS_BENCHMARK':
            return{
                ...state,
                aflyScoreNew:action.payload
            }
        case 'GET_CLIENT_ANALYTICS_DOMAIN_WISE':
            return{
                ...state,
                aflyScoreDomain:action.payload
            }
        case 'SAVE_CLIENT_ANALYTICS_USE_CASE':
            return{
                ...state,
                setCLientAnalyticsUsecaseData:action.payload
            }
        case 'RESTORE_USE_CASE_SAVE':
            return{
                ...state,setCLientAnalyticsUsecaseData:null
            }
        case 'GET_CLIENT_QUESTIONS_BANK_FOR_AMPLO':
            return{
                ...state,
                clientQuestionsBankforAmplo : action.payload
            }
        case 'GET_AMPLO_UPLOAD_BATCH_INFO':
            return{
                ...state,
                amploUploadBatchInfo : action.payload
            }
        case 'GET_CLIENT_UPLOAD_BATCH_INFO':
            return{
                ...state,
                clientUploadbatchInfo : action.payload
            }
        case IMPORT_GET_AMPLO_INTERFACE_ATTACHMENT_BY_BATCHID:
            return{
                ...state,
                previewAmploInterfaceAttachments : action.payload
            }
        case IMPORT_GET_AMPLO_QUESTIONS_BY_DOMAIN:
            return{
                ...state,
                previewAmploQuestions : action.payload
            }
        case IMPORT_GET_AMPLO_DOMAINS_BY_QUESTIONBANK:
            return{
                ...state,
                previewAmploDomains : action.payload
            }
        case IMPORT_GET_AMPLO_QUESTIONSBANK_BY_BATCHID:
            return{
                ...state,
                previewAmploQuestionBank : action.payload
            }
        case IMPORT_GET_INTERFACE_ATTACHMENT_BY_BATCHID:
            return{
                ...state,
                previewInterfaceAttachments : action.payload
            }
        case IMPORT_GET_QUESTIONS_BY_DOMAIN:
            return{
                ...state,
                previewQuestions : action.payload
            }
        case IMPORT_GET_DOMAINS_BY_QUESTIONBANK:
            return{
                ...state,
                previewDomains : action.payload
            }
        case IMPORT_GET_QUESTIONSBANK_BY_BATCHID:
            return{
                ...state,
                previewQuestionBank : action.payload
            }
        case GET_AFLY_DOMAIN_SCORE:
            return{
                ...state,
                aFlyDomainScore : action.payload
            }
        case GET_AFLY_SCORE:
            return{
                ...state,
                aFlyScore : action.payload
            }
        case GET_AMPLO_SIDEBAR_DOMAINS_QUESTIONS:
            return{
                ...state,
                amploSidebarDomainsQuestions:action.payload
            }
        case GET_CLIENT_ASSIGNMENT:
            return{
                ...state,
                clientAssignment : action.payload
            }
        case GET_AMPLO_QUESTIONS_ATTACHMENT:
            return{
                ...state,
                getAmploQuestionAttachment : action.payload
            }
        case GET_CLIENT_SIDEBAR_DOMAINS_QUESTIONS:
            return{
                ...state,
                clientSidebarDomainsQuestions: action.payload
            }
        case SAVE_QUESTIONS_ATTACHMENT:
            return{
                ...state,
                saveClientQuestionAttachment: action.payload
            }
        case GET_QUESTIONS_ATTACHMENT:
            return{
                ...state,
                getClientQuestionAttachment: action.payload
            }
        case GET_ALL_QUESTION_STYLES_LISTING:
            return{
                ...state,
                stylesList : action.payload.splice(0,5)
            }
        case CURRENT_SELECTED_QUESTIONS_BANK:
            return{
                ...state,
                currentSelectedQuestionBank : action.payload
            }
        case CURRENT_SELECTED_DOMAIN:
            return{
                ...state,
                currentSelectedDomainName:action.payload
            }
        case CURRENT_SELECTED_QUESTIONS_BANK_AMPLO:
            return{
                ...state,
                currentSelectedQuestionBankAmplo : action.payload
            }
        case CURRENT_SELECTED_DOMAIN_AMPLO:
            return{
                ...state,
                currentSelectedDomainAmplo:action.payload
            }
        case SAVE_CLIENT_QUESTIONS_ANSWERS:
            return{
                ...state,
                SaveClientQuestionsAnswers:action.payload
            }
        case SAVE_AMPLO_QUESTIONS_ANSWERS:
            return{
                ...state,
                SaveAmploQuestionsAnswers:action.payload
            }
        case SAVE_QUESTIONS_BANK:
            return{
                ...state,
                AmploQuestionsBankSave : action.payload
            }
        case SAVE_CLIENT_QUESTIONS_BANK:
            return{
                ...state,
                ClientQuestionsBankSave : action.payload
            }
        case SAVE_AMPLO_DOMAINS:
            return{
                ...state,
                AmploDomainsSave : action.payload
            }
        case SAVE_CLIENT_DOMAINS:
            return{
                ...state,
                ClientDomainsSave : action.payload
            }
        case GET_AMPLO_QUESTIONS_BANK:
            return{
                ...state,
                AmploQuestionsBank : action.payload
            }
        case GET_CLIENT_QUESTIONS_BANK:
            return{
                ...state,
                ClientQuestionsBank : action.payload
            }
        case GET_AMPLO_DOMAINS:
            return{
                ...state,
                AmploDomains : action.payload
            }
        case GET_CLIENT_DOMAINS:
            return{
                ...state,
                ClientDomains : action.payload
            }
        case GET_AMPLO_QUESTIONS_BY_DOMAIN:
            return{
                ...state,
                AmploQuestions : action.payload
            }
        case GET_CLIENT_QUESTIONS_BY_DOMAIN:
            return{
                ...state,
                ClientQuestions : action.payload
            }
        default:
			return state;
    }
}