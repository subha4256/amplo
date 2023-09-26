
import { combineReducers } from 'redux';
import apiReducer from './apiReducer';
import powerbiReducer from './powerbiReducer';
import iotReducer from './iotReducer';
import scoreGoalReducer from './scoreGoalReducer';
import menuReducer from './menuReducer';
import dashboardReducer from './dashboardReducer';
import capabilityReducer from './capabilityReducer';
import capabilityAccessReducer from './capabilityAccessReducer';
import questionaireReducer from './questionaireReducer';
import reportReducer from './reportReducer';
import domainAccessReducer from './domainAccessReducer';
import enterpriseReducer from './enterpriseReducer';
import companyReducer from './companyReducer';
import capabilityModelingReducer from './capabilityModelingReducer';
import kpiReducer from './kpiReducer';
import errorReducer from './errorReducer';
import teamReducer from './teamReducer';
import profileReducer from './profileReducer';
import userReducer from './userReducer';
import ideateReducer from './ideateReducer';
import reportAccessReducer from './reportAccessReducer';
import adminCapabilityReducer from './adminCapabilityReducer';
import adminCapabilityModelingReducer from './adminCapabilityModelingReducer';
import clientTemplateReducer from './clientTemplateReducer';
import SearchReducer from './SearchReducer';
import balancedScorecardReducer from './balancedScorecardReducer';
import designThinkingStakeHolderViewReducer from './designThinkingStakeHolderViewReducer';
import DesignThinkingHomepageReducer from './DesignThinkingHomepageReducer';
import DesignThinkingManageStakeholdersReducer from './DesignThinkingManageStakeholdersReducer';
import epicScreenReducer from './epicScreenReducer';
import benchmarkingReducer from './benchmarkingReducer';
import empathyScreenReducer from './empathyScreenReducer';
import personaReducer from './personaReducer';
import cjmReducer from './cjmReducer';
import roadmapReducer from './roadmapReducer';
import noeReducer from './noeReducer';
import prototypeReducer from './prototypeReducer';
import { reducer as form } from "redux-form";
import supportReducer from './supportReducer';
import { Reports_Reducer } from './Reports';
export default combineReducers({
	supportItems:supportReducer,
	api: apiReducer,
	iot: iotReducer,
	Ratings: scoreGoalReducer,
	menu:menuReducer,
	dashboardData:dashboardReducer,
	capability: capabilityReducer,
	capabilityAccess: capabilityAccessReducer,
	questionaire: questionaireReducer,
	report: reportReducer,
	domainAccess: domainAccessReducer,
	company: companyReducer,
	capabilityModeling: capabilityModelingReducer,
	kpiData: kpiReducer,
	profile: profileReducer,
	user: userReducer,
	errors: errorReducer,
	team_array:teamReducer,
	reportAccess: reportAccessReducer,
	enterpriseData: enterpriseReducer,
	adminCapability: adminCapabilityReducer,
	adminCapabilityModeling: adminCapabilityModelingReducer,
	clientTemplate: clientTemplateReducer,
	Search: SearchReducer,
	balancedScorecard : balancedScorecardReducer,
	designThinkingStakeHolder : designThinkingStakeHolderViewReducer,
	designThinkingHomeProjects : DesignThinkingHomepageReducer,
	DesignThinkingManageStakeholders : DesignThinkingManageStakeholdersReducer,
	epicScreenData : epicScreenReducer,
	benchmarkingData : benchmarkingReducer,
	powerbiData:powerbiReducer,
	ideate: ideateReducer,
	empathyScreen : empathyScreenReducer,
	ideate: ideateReducer,
	persona : personaReducer,
	cjm: cjmReducer,
	roadmap : roadmapReducer,
	noe: noeReducer,
	prototype : prototypeReducer,
	form,
	reports: Reports_Reducer
});