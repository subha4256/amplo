/* eslint-disable */
import React, { Component, Suspense, lazy } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle";
import "jquery";
import "popper.js/dist/popper";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "../common/css/fontawesome/css/all.min.css";
import "../common/css/fonts.css";
import "./App.css";
import { Provider } from "react-redux";

import ErrorBoundary from "../Components/ErrorBoundary";
import Dashboard from "../Components/dashboardComponent/Dashboard";
import AdminDashboard from "../Components/dashboardComponent/AdminDashboard";
import Login from "../Components/LoginComponent/Login";
import Registration from "../Components/registrationComponent/Registration";
import EmpRegistration from "../Components/registrationComponent/EmpRegistration";

import Home from "../Components/Home/Home";
import ForgotPassword from "../Components/LoginComponent/ForgotPassword";
import Benchmark from "../Components/benchmarkComponent/Benchmark";
import BenchmarkManageAccess from "../Components/Benchmark/Access/ManageAccess";
import BenchmarkReportsAccess from "../Components/Benchmark/Access/ManageReportsAccess";
import GettingStarted from "../Components/gettingStarted/GettingStarted";
import Decomposition from "../Components/decompositionComponent/Decomposition";
import RadarChart from "../Components/Benchmark/RadarChart";
import CapabilityModelingReport from "../Components/Benchmark/CapabilityModelingReport";
import Capability from "../Components/Capability/Capability";
import ClientTemplates from "../Components/ClientTemplates/Capability/Capability";
import ClientTemplateCapabilityModeling from "../Components/ClientTemplates/CapabilityModeling/CapabilityModeling";
import CapabilityAccess from "../Components/Capability/Access/ManageAccess";
import FPMMerge from '../Components/Capability/FPMMerge'
import ManageAccount from "../Components/Enterprise/ManageAccount";
import ManageAccountDetail from "../Components/Enterprise/ManageAccountDetail";
import BenchmarkQuestionaire from "../Components/Benchmark/Questionaire";
//const CompanyProfile = lazy(() => import('../Components/Company/Profile'));
import CompanyProfile from "../Components/Company/Profile";
import UserProfile from "../Components/User/Profile";
import ManageTeam from "../Components/Team/ManageTeam";
import FileUploads from "../Components/FileUploads/FileUploads";
import CMProjectImportFileUpload from "../Components/FileUploads/CMProjectImportFileUpload";
import CMAdminTemplateImportFileUpload from "../Components/FileUploads/CMAdminTemplateImportFileUpload";
import KpiFileUploads from "../Components/FileUploads/KpiFileUploads";
import KpiAuditFileUploads from "../Components/FileUploads/KpiAuditFileUploads";
import QuestionBankFileUpload from "../Components/FileUploads/QuestionBankFileUpload";
import QuestionBankAdminFileUpload from "../Components/FileUploads/QuestionBankAdminFileUpload";
//import DemoDiag from '../Components/DemoDiag/DemoDiag'
import PrivateRoute from "../Components/common/PrivateRoute";
import CreateManageProjectsDT from "../Components/Design Thinking/CreateManageProject/CreateManageProjectsDT";
import BalancedScorecard from "../Components/balancedScorecard/balancedScorecard";
import BalancedScorecardReport from "../Components/balancedScorecard/balancedScorecardReport/balancedScorecardReport";

import CapabilityModeling from "../Components/CapabilityModeling/CapabilityModeling";
import TemplateCapabilityModeling from "../Components/Admin/CapabilityModeling/CapabilityModeling";
import KpiSetting from "../Components/Kpi/KpiSetting";
import kpiSetCreate from "../Components/Kpi/KpiSetCreate";
import KpiSetManageAccess from "../Components/Kpi/KpiSetManageAccess";
import Reports from "../Components/Reports/Reports";
import DesignThinkingManageStakeholders from "../Components/DesignThinkingManageStakeholders/DesignThinkingManageStakeholders";
import DesignThinkingStakeHolderView from "../Components/designThinkingStakeHolderView/designThinkingStakeHolderView";
import DesignThinkingHomepage from "../Components/DesignThinkingHomepage/DesignThinkingHomepage";
import DesignThinkingEpicScreen from "../Components/DesignThinkingEpicScreen/DesignThinkingEpicScreen";
import DesignThinkingEpicDetail from "../Components/DesignThinkingEpicDetailScreen/DesignThinkingEpicDetail";
import EmpathyScreen from "../Components/EmpathyScreen/EmpathyScreen";
import CustomerJourneyMap from "../Components/CustomerJourneyMap/CustomerJourneyMap";
import DesignThinkingNetworkOfExperience from "../Components/DesignThinkingNetworkOfExperience/DesignThinkingNoe";
import DesignThinkingNoeDetails from "../Components/DesignThinkingNetworkOfExperience/DesignThinkingNoeDetails/DesignThinkingNoeDetails";
import DesignThinkingProblemPinning from "../Components/DesignThinkingProblemPinning/DTProblemPinning";
import DesignThinkingSwotAnalysis from "../Components/DesignThinkingSwotAnalysis/DTSwotAnalysis";
import DesignThinkingDVF from "../Components/DesignThinkingDVF/DTDVF";
import DesignThinkingRoadmap from "../Components/DesignThinkingRoadmap/DTRoadmap";
import DesignThinkingPrototype from "../Components/DesignThinkingPrototype/DesignThinkingPrototype";
import RegistrationDetails from "../Components/RegistrationDetails/RegistrationDetails";

import QuestionsBank from "../Components/Benchmark/QuestionsBank/QuestionsBank";
import QuestionsBankUploadPreview from "../Components/Benchmark/QuestionsBank/QuestionsBankUploadPreview";
import QuestionsBankAdmin from "../Components/Benchmark/QuestionsBankAdmin/QuestionsBankAdmin";
import QuestionsBankAdminUploadPreview from "../Components/Benchmark/QuestionsBankAdmin/QuestionsBankAdminUploadPreview";

import store from "../store";
import ResetPassword from "../Components/LoginComponent/ResetPassword";

//Admin routes
import AdminCapability from "../Components/Admin/Capability/Capability";

import DivaLoader from "./DivaLoader";
import CacheStorage from "../utils/CacheStorage";
import Support from "../Components/support/Support";
import SupportAmp from "../Components/support/AmpMarking/SupportAmp";
import ConfigureKPI from "../Components/Kpi/ConfigureKPI";
import PowerBi from "../Components/dashboardComponent/PowerBi";
import DashboardAccess from "../Components/dashboardComponent/DashboardAccess";
import KpiDashboard from "../Components/dashboardComponent/Kpi-Dashboard";
import PainPoints from "../Components/Capability/PainPontResult";
import EbidataUpload from "../Components/FileUploads/EbidataUpload";
import FpmDashboard from "../Components/dashboardComponent/FpmDashboard";
import ReEstablishAfly from "../Components/Reports/ReEstablishAfly";
import AwsExpirePage from "../Components/LoginComponent/AwsExpirePage";
import PerformanceBody from "../Components/Business Reports/PerformanceReports/PerformanceBody";
import BusinessReports from "../Components/Business Reports/BusineesReports/BusinessReports";
import KPIReportsBody from "../Components/Business Reports/KPIReports/KPIReportsBody";
import StrategyAssesmentOneBody from "../Components/Business Reports/StreategyAssessment/StrategyAssessment_One/StrategyAssesmentOneBody";
import StrategyAssesmentTwoBody from "../Components/Business Reports/StreategyAssessment/StrategyAssesment_Two/StrategyAssesmentTwoBody";
import StrategyAssesmentThreeBody from "../Components/Business Reports/StreategyAssessment/StrategyAssesmentThree/StrategyAssesmentThreeBody";
import RevnueBodyOne from "../Components/Business Reports/RevenueGrowth/RevenueGrowthOne/RevnueBodyOne";
import RevenueTwoBody from "../Components/Business Reports/RevenueGrowth/RevenueGrowthTwo/RevenueTwoBody";
import RevenueThirdBody from "../Components/Business Reports/RevenueGrowth/RevnueGrowthThree/RevenueThirdBody";
import OperationManagmentBody from "../Components/Business Reports/OperatonManagment/OperationManagmentBody";
import PeopleManagmentBody from "../Components/Business Reports/PeopleManagement/PeopleManagmentBody";
import DigitalManagmentBody from "../Components/Business Reports/DigitalAdoptionReports/DigitalManagmentBody";
import TransformationBody from "../Components/Business Reports/TransformationReports/TransformationBody";
import HeatMapAnalysisBody from "../Components/Business Reports/CapabilityModeling/HeatMapAnalysis/HeatMapAnalysisBody";

class App extends Component {
    constructor(props) {
        super(props);
    }

    getAuthUser(props) {
        let component = <Login {...props} />;
        switch (props.match.path) {
            case "/":
                component = <Home {...props} />;
                break;
            case "/registration":
                component = <Registration {...props} />;
                break;
            case "/registration-addon-user/:hash":
                component = <Registration {...props} />;
                break;
            case "/emp-registration":
                component = <EmpRegistration {...props} />;
                break;
            case "/reset-password/:token":
                component = <ResetPassword {...props} />;
                break;
            case "/serviceExpiration":
                component = <AwsExpirePage />;
                break;
            default:
                component = <Login {...props} />;
        }
        if (!CacheStorage.getItem("userToken")) {
            return component;
        } else {
            if (CacheStorage.getItem("userType") === "1") {
                return <Redirect to="/dashboard" />;
            } else {
                return <Redirect to="/admin-dashboard" />;
            }
        }
    }

    render() {
        const routes = (
            <div className="App" id="app">
                <Route
                    exact
                    path="/"
                    render={(props) =>
                        !CacheStorage.getItem("userToken") ? (
                            <Home {...props} />
                        ) : (
                            <Redirect to="/dashboard" />
                        )
                    }
                />
                <Route
                    path="/login"
                    exact
                    render={(props) =>
                        !CacheStorage.getItem("userToken") ? (
                            <Login {...props} /> 
                        ) : (
                            <Redirect to="/dashboard" />
                        )
                    }
                ></Route>
                <Route
                    path="/login/:id"
                    exact
                    render={(props) => <Login {...props}></Login>}
                ></Route>
                <Route
                    exact
                    path="/registration"
                    render={(props) =>
                        !CacheStorage.getItem("userToken") ? (
                            <Registration {...props} />
                        ) : (
                            <Redirect to="/dashboard" />
                        )
                    }
                ></Route>
                <Route
                    exact
                    path="/serviceExpiration"
                    render={(props) =>
                        !CacheStorage.getItem("userToken") ? (
                            <AwsExpirePage {...props} />
                        ) : null
                    }
                ></Route>
                <Route
                    exact
                    path="/registration-addon-user/:hash"
                    render={(props) =>
                        !CacheStorage.getItem("userToken") ? (
                            <Registration {...props} />
                        ) : (
                            <Redirect to="/dashboard" />
                        )
                    }
                ></Route>
                <Route
                    exact
                    path="/emp-registration"
                    render={(props) =>
                        !CacheStorage.getItem("userToken") ? (
                            <EmpRegistration {...props} />
                        ) : (
                            <Redirect to="/dashboard" />
                        )
                    }
                ></Route>
                <Route
                    exact
                    path="/forgot-password"
                    render={(props) =>
                        !CacheStorage.getItem("userToken") ? (
                            <ForgotPassword {...props} />
                        ) : (
                            <Redirect to="/dashboard" />
                        )
                    }
                ></Route>
                <Route
                    exact
                    path="/reset-password/:token"
                    render={(props) =>
                        !CacheStorage.getItem("userToken") ? (
                            <ResetPassword {...props} />
                        ) : (
                            <Redirect to="/dashboard" />
                        )
                    }
                ></Route>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/decomposition"
                        role="superuser"
                        module="Capability Modeling"
                        component={Decomposition}
                    ></PrivateRoute>
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/manage-project"
                        role="superuser"
                        module="AmpMarking"
                        component={Benchmark}
                    ></PrivateRoute>
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/getting-started"
                        role="normaluser"
                        module="All"
                        component={GettingStarted}
                    ></PrivateRoute>
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dashboard"
                        role="normaluser"
                        module="All"
                        component={Dashboard}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/fpm-comparison"
                        role="normaluser"
                        module="All"
                        component={FpmDashboard}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dashboard-access"
                        role="superuser"
                        module="All"
                        component={DashboardAccess}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/support"
                        role="normaluser"
                        module="All"
                        component={Support}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/registration-details"
                        role="normaluser"
                        module="All"
                        component={RegistrationDetails}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/support/AmpMarking/:catId/:subCatId"
                        role="normaluser"
                        module="All"
                        component={SupportAmp}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/admin-dashboard"
                        role="admin"
                        module="All"
                        component={AdminDashboard}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/kpi-dashboard"
                        role="normaluser"
                        module="All"
                        component={KpiDashboard}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/benchmark-questionaire"
                        role="normaluser"
                        module="AmpMarking"
                        component={BenchmarkQuestionaire}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/benchmark-access"
                        role="superuser"
                        module="AmpMarking"
                        component={BenchmarkManageAccess}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports-access"
                        role="superuser"
                        module="Reports & Analytics"
                        component={BenchmarkReportsAccess}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/capability-access"
                        role="superuser"
                        module="Capability Modeling"
                        component={CapabilityAccess}
                    />
                </Switch>
                <Switch>
                    <Route
                        exact
                        path="/company-profile"
                        role="superuser"
                        module="All"
                        component={CompanyProfile}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/profile"
                        role="normaluser"
                        module="All"
                        component={UserProfile}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/benchmark-report/:id/:name"
                        role="normaluser"
                        module="AmpMarking"
                        component={RadarChart}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/capability"
                        role="normaluser"
                        module="Capability Modeling"
                        component={Capability}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/fpm-merge"
                        role="normaluser"
                        module="All"
                        component={FPMMerge}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/capability/:projectId"
                        role="normaluser"
                        module="Capability Modeling"
                        component={Capability}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/capability-report/:id"
                        role="normaluser"
                        module="Capability Modeling"
                        component={CapabilityModelingReport}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/capability-modeling/:projectId/:processId/:functionId/:phaseId/:modelingMode/:projectVersionId"
                        role="normaluser"
                        module="Capability Modeling"
                        component={CapabilityModeling}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/capability-modeling/:templateId/:processId/:functionId/:phaseId"
                        component={TemplateCapabilityModeling}
                        role="admin"
                        module="Capability Modeling"
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/kpi-setting/"
                        role="normaluser"
                        module="Performance Measuring"
                        component={KpiSetting}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/kpi-setting/:kpiSetId"
                        role="normaluser"
                        module="Performance Measuring"
                        component={KpiSetting}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/kpi-setting/:action/:kpiSetId"
                        role="normaluser"
                        module="Performance Measuring"
                        component={KpiSetting}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/kpi-setting/:action/:kpiSetId/:KpiId"
                        role="normaluser"
                        module="Performance Measuring"
                        component={KpiSetting}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={Reports}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/benchmark-report/:id"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={BusinessReports}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/performance-report/:id"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={PerformanceBody}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/kpi-reports/:id/:year"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={KPIReportsBody}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/strategy-reports-one/:id"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={StrategyAssesmentOneBody}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/strategy-reports-two/:id"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={StrategyAssesmentTwoBody}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/heatmap-analysis/:id"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={HeatMapAnalysisBody}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/strategy-reports-three/:id"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={StrategyAssesmentThreeBody}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/revenue-one/:id/:year"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={RevnueBodyOne}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/revenue-two/:id"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={RevenueTwoBody}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/revenue-three/:id"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={RevenueThirdBody}
                    />
                </Switch>

                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/revenue-three/:id"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={RevenueThirdBody}
                    />
                </Switch>

                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/operationManagment/:id"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={OperationManagmentBody}
                    />
                </Switch>

                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/peopleManagment/:id"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={PeopleManagmentBody}
                    />
                </Switch>

                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/transformation/:id"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={TransformationBody}
                    />
                </Switch>

                <Switch>
                    <PrivateRoute
                        exact
                        path="/reports/digitalManagement/:id"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={DigitalManagmentBody}
                    />
                </Switch>
              
              
                <Switch>
                    <PrivateRoute
                        exact
                        path="/powerbi-report"
                        role="normaluser"
                        module="Reports & Analytics"
                        component={PowerBi}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/manage-team"
                        role="superuser"
                        module="All"
                        component={ManageTeam}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/painpoint-results/:projectId/:projectName"
                        role="normaluser"
                        module="All"
                        component={PainPoints}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/afly-report/:projId/:name"
                        role="normaluser"
                        module="All"
                        component={ReEstablishAfly}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/excel-uploads/:projectId/:processId/:projectVersionId"
                        role="normaluser"
                        module="Capability Modeling"
                        component={FileUploads}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/ebidata-uploads"
                        role="normaluser"
                        module="Capability Modeling"
                        component={EbidataUpload}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/cm-project-import/:projectId"
                        role="normaluser"
                        module="Capability Modeling"
                        component={CMProjectImportFileUpload}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/cm-template-upload-admin/:templateId"
                        role="admin"
                        module="All"
                        component={CMAdminTemplateImportFileUpload}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/enterprise-accounts"
                        role="admin"
                        module="All"
                        component={ManageAccount}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/enterprise-accounts/:id"
                        role="admin"
                        module="All"
                        component={ManageAccountDetail}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/edit-team/:id"
                        role="superuser"
                        module="All"
                        component={ManageTeam}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/manage-templates"
                        role="admin"
                        module="All"
                        component={AdminCapability}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/manage-templates/:templateId"
                        role="admin"
                        module="All"
                        component={AdminCapability}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/client-templates"
                        role="normaluser"
                        module="All"
                        component={ClientTemplates}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/client-templates/:templateId"
                        role="normaluser"
                        module="All"
                        component={ClientTemplates}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/client-capability-modeling/:templateId/:processId/:functionId/:phaseId"
                        component={ClientTemplateCapabilityModeling}
                        role="normaluser"
                        module="Capability Modeling"
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/manage-dtprojects"
                        role="superuser"
                        module="Design Thinking"
                        component={CreateManageProjectsDT}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/configure-initiative"
                        role="superuser"
                        module="Performance Measuring"
                        component={ConfigureKPI}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/manage-kpiset"
                        role="superuser"
                        module="Performance Measuring"
                        component={kpiSetCreate}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/manage-access-kpiset"
                        role="superuser"
                        module="Performance Measuring"
                        component={KpiSetManageAccess}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/balanced-scorecard"
                        role="superuser"
                        module="Performance Measuring"
                        component={BalancedScorecard}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/balanced-scorecard/:bscId"
                        role="superuser"
                        module="Performance Measuring"
                        component={BalancedScorecard}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/balanced-scorecard/report/:bscId/:fromDate/:toDate"
                        module="Performance Measuring"
                        role="superuser"
                        component={BalancedScorecardReport}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/balanced-scorecard/report/:bscId"
                        role="superuser"
                        module="Performance Measuring"
                        component={BalancedScorecardReport}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/manage-dtstakeholders"
                        role="superuser"
                        module="Design Thinking"
                        component={DesignThinkingManageStakeholders}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dt-stakeholdersview"
                        role="normaluser"
                        module="Design Thinking"
                        component={DesignThinkingStakeHolderView}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dt-stakeholdersview/:noiId"
                        role="normaluser"
                        module="Design Thinking"
                        component={DesignThinkingStakeHolderView}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dt-dashboard"
                        role="normaluser"
                        module="Design Thinking"
                        component={DesignThinkingHomepage}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dt-epic-dashboard/:dtId/"
                        role="normaluser"
                        module="Design Thinking"
                        component={DesignThinkingEpicScreen}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dt-epicdetail/:dtId/:epicId"
                        role="normaluser"
                        module="Design Thinking"
                        component={DesignThinkingEpicDetail}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/empathydetail/:dtId/:epicId"
                        role="normaluser"
                        module="Design Thinking"
                        component={EmpathyScreen}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/customer-journey-map/:dtId/:epicId/:personaId/:cjmId"
                        role="normaluser"
                        module="Design Thinking"
                        component={CustomerJourneyMap}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dt-network-of-experience/:dtId/:epicId"
                        role="normaluser"
                        module="Design Thinking"
                        component={DesignThinkingNetworkOfExperience}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dt-network-of-experience-details/:dtId/:epicId"
                        role="normaluser"
                        module="Design Thinking"
                        component={DesignThinkingNoeDetails}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dt-problem-pinning/:projectId/:epicId"
                        role="normaluser"
                        module="Design Thinking"
                        component={DesignThinkingProblemPinning}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dt-swot-analysis/:projectId/:epicId"
                        role="normaluser"
                        module="Design Thinking"
                        component={DesignThinkingSwotAnalysis}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dt-dvf/:projectId/:epicId"
                        role="normaluser"
                        module="Design Thinking"
                        component={DesignThinkingDVF}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dt-roadmap/:projectId/:epicId"
                        role="normaluser"
                        module="Roadmap"
                        component={DesignThinkingRoadmap}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/dt-prototype/:projectId/:epicId"
                        role="normaluser"
                        module="Design Thinking"
                        component={DesignThinkingPrototype}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/questions-bank"
                        role="superuser"
                        module="AmpMarking"
                        component={QuestionsBank}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/questions-bank-project/:mode/:projectId"
                        role="superuser"
                        module="AmpMarking"
                        component={QuestionsBank}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/questions-bank-admin"
                        role="admin"
                        module="AmpMarking"
                        component={QuestionsBankAdmin}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/questions-bank-admin-project/:mode/:projectId"
                        role="admin"
                        module="AmpMarking"
                        component={QuestionsBankAdmin}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/kpi-excel-uploads/:kpiId"
                        role="normaluser"
                        module="Performance Measuring"
                        component={KpiFileUploads}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/kpi-audit-excel-uploads/:kpiId"
                        role="normaluser"
                        module="Performance Measuring"
                        component={KpiAuditFileUploads}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/questions-bank-excel-upload"
                        role="superuser"
                        module="AmpMarking"
                        component={QuestionBankFileUpload}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/questions-bank-excel-upload/:questionBankId"
                        role="superuser"
                        module="AmpMarking"
                        component={QuestionBankFileUpload}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path={"/questions-bank-admin-excel-upload"}
                        role="admin"
                        module="AmpMarking"
                        component={QuestionBankAdminFileUpload}
                    />
                </Switch>

                <Switch>
                    <PrivateRoute
                        exact
                        path={`/questions-bank-admin-excel-upload/:questionBankId`}
                        role="admin"
                        module="AmpMarking"
                        component={QuestionBankAdminFileUpload}
                    />
                </Switch>

                <Switch>
                    <PrivateRoute
                        exact
                        path="/questions-bank-preview/:batchId"
                        role="superuser"
                        module="AmpMarking"
                        component={QuestionsBankUploadPreview}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/questions-bank-preview/:batchId/:questionBankId"
                        role="superuser"
                        module="AmpMarking"
                        component={QuestionsBankUploadPreview}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/questions-bank-admin-preview/:batchId"
                        role="admin"
                        module="AmpMarking"
                        component={QuestionsBankAdminUploadPreview}
                    />
                </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/questions-bank-admin-preview/:batchId/:quesitonBankId"
                        role="admin"
                        module="AmpMarking"
                        component={QuestionsBankAdminUploadPreview}
                    />
                </Switch>
            </div>
        );
        return (
            <Provider store={store}>
                <Router>
                    <ErrorBoundary>{routes}</ErrorBoundary>
                    <DivaLoader />
                    <ToastContainer autoClose={false} />
                </Router>
            </Provider>
        );
    }
}

export default App;
