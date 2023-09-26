import { HANDLE_SELECT_PROJECT, CLEAR_ASSESMENT_EDIT, UPDATE_AFLY_SCORE_QUESTION, SAVE_PROJECT_QUESTIONS, DELETE_PROJECT_QUESTION, FETCH_PROJECT_DOMAIN_QUESTION, FETCH_PROJECT_DOMAIN_QUESTION_DETAILS, FETCH_PROJECT_CLIENT_ATTACHMENT, FETCH_PROJECT_DOMAINS, SAVE_PROJECT_DOMAIN, DELETE_PROJECT_DOMAIN, SET_PROJECT_SELECTED_DOMAIN, FETCH_BENCHMARK_PROJECTS, FETCH_BENCHMARK_DOMAINS, FETCH_DOMAIN_QUESTIONS, FETCH_QUESTION, SAVE_ANSWER, GET_UNANSWERED_QUESTIONS } from '../actions/types';
const initialState = {

	projects: [],
	domains: [],
	questions: [],
	question: {},
	answer: {},
	unansweredQuestions: [],
	saveProjectDomainData: {},
	deleteProjectDomainData: {},
	projectSelectedDomainData: {},
	domainsForEdit: [],
	domainQuestionForEdit: [],
	questionForEdit: {},
	projectAttachmentForEdit: {},
	saveClientBenchMarkQuestionAnswersData: {},
	deleteBenchMarkQuestionAnswersData: {},
	updateAFlyScoreOfBenchMarkQuestionData: {},
	selectedProject: {},
	dbFetchQuestions: []
}

export default function (state = initialState, action) {
	switch (action.type) {
		case FETCH_PROJECT_DOMAINS:
			return {
				...state,
				domainsForEdit: action.payload
			}
			break;
		case FETCH_PROJECT_DOMAIN_QUESTION:
			return {
				...state,
				domainQuestionForEdit: action.payload ,
				dbFetchQuestions: JSON.parse(JSON.stringify(action.payload))
			}

		case HANDLE_SELECT_PROJECT:
			return {
				...state,
				selectedProject: action.payload
			}
			break;
		case UPDATE_AFLY_SCORE_QUESTION:
			return {
				...state,
				updateAFlyScoreOfBenchMarkQuestionData: action.payload
			}
			break;
		case CLEAR_ASSESMENT_EDIT:
			return {
				...state,
				unansweredQuestions: [],
				saveProjectDomainData: {},
				deleteProjectDomainData: {},
				projectSelectedDomainData: {},
				domainsForEdit: [],
				domainQuestionForEdit: [],
				questionForEdit: {},
				projectAttachmentForEdit: {},
				saveClientBenchMarkQuestionAnswersData: {},
				deleteBenchMarkQuestionAnswersData: {},
				updateAFlyScoreOfBenchMarkQuestionData: {}
			}
			break;
		case FETCH_PROJECT_DOMAIN_QUESTION_DETAILS:
			return {
				...state,
				questionForEdit: action.payload
			}
			break;
		case SAVE_PROJECT_QUESTIONS:
			return {
				...state,
				saveClientBenchMarkQuestionAnswersData: action.payload
			}
			break;
		case DELETE_PROJECT_QUESTION:
			return {
				...state,
				deleteBenchMarkQuestionAnswersData: action.payload
			}
			break;
		case FETCH_PROJECT_CLIENT_ATTACHMENT:
			return {
				...state,
				projectAttachmentForEdit: action.payload
			}
			break;
		case SAVE_PROJECT_DOMAIN:
			return {
				...state,
				saveProjectDomainData: action.payload
			}
			break;
		case DELETE_PROJECT_DOMAIN:
			return {
				...state,
				deleteProjectDomainData: action.payload
			}
			break;
		case SET_PROJECT_SELECTED_DOMAIN:
			return {
				...state,
				projectSelectedDomainData: action.payload
			}
			break;
		case GET_UNANSWERED_QUESTIONS:
			return {
				...state,
				unansweredQuestions: action.payload
			}
			break;
		case FETCH_BENCHMARK_PROJECTS:
			return {
				...state,
				projects: action.payload
			}
			break;
		case FETCH_BENCHMARK_DOMAINS:
			return {
				...state,
				domains: action.payload
			}
			break;
		case FETCH_DOMAIN_QUESTIONS:
			return {
				...state,
				questions: action.payload
			}
			break;
		case FETCH_QUESTION:
			return {
				...state,
				question: action.payload
			}
			break;
		case SAVE_ANSWER:
			return {
				...state,
				answer: action.payload
			}
		default:
			return state;
	}
}