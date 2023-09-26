import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';

import {withRouter, Prompt} from 'react-router-dom';
import { Label, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import $ from 'jquery';
import Permissions from './Permissions';
import FunctionPhaseSelection from './FunctionPhaseSelection';
import { BenchmarkManageAccess } from '../Styling/ManageAccess';
import DashboardHeader from "../../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../../includes/dashboardFooter/FooterComponent';
import SidebarJs from '../../../common/js/sidebarAnimation';

import axios from 'axios';
import { fetchProjects, fetchTemplates, fetchFunctions, fetchPhases, fetchProjectFunctions, fetchProjectPhases, fetchProjectUsers, fetchUserPermissions, savePermissions, savePermissions1, editClientFunctionPhaseTemplate } from '../../../actions/capabilityAccessActions';
 
class ManageAccess extends Component {
    constructor(props) {
        super(props);
        this.state={
            permissions: [],
            userId: 0,
            currentProject: "",
            currentTemplate: "",
            currentProjectTemplate: "",
            StatusID:"",
            selectedFunctions: [],
            selectedPhases: [],
            loading: true,
            errors: {},
            x:0,
            isBlocking: false,
            disableTemplate: 0,
            setPermission: true,
            firstTimeSave : false
        }
        this.sidebarAnimation=new SidebarJs();
    }

    async componentWillMount() {
        window.removeEventListener('beforeunload', this.beforeunload.bind(this));
    }
    
    initialFetch(){
        this.props.fetchProjects();
        this.props.fetchTemplates();
	    
}
    componentDidMount() {
        this.initialFetch();
        this.sidebarAnimation.toggle();
        window.addEventListener('beforeunload', this.beforeunload.bind(this));
    }

    componentWillReceiveProps(newProps) {
        if(newProps.errors && newProps.errors != this.props.error && newProps.errors.message != '') {
            this.setState({
                errors: newProps.errors
            })
        }
        
        if(Object.keys(newProps.projects).length > 0 && newProps.projects.success) {
            this.setState({
                loading: false
            }
            // , function() {
            //     if(newProps.projects.data.length > 0 && this.state.currentProject === "" ) {
            //         this.setState({
            //             currentProject: newProps.projects.data[0].DecompositionProjectID,
            //             currentTemplate: newProps.projects.data[0].SelectedTemplate,
            //             StatusID: newProps.projects.data[0].StatusID
            //         }, function() {

            //             this.sequenceAxiosCalls(
            //                 [//this.props.fetchFunctions(this.state.currentTemplate),
            //                     this.props.fetchProjectFunctions(this.state.currentProject, this.state.currentTemplate), 
            //                     //this.props.fetchPhases(this.state.currentTemplate), 
            //                     this.props.fetchProjectPhases(this.state.currentProject, this.state.currentTemplate),                                 
            //                     this.props.fetchProjectUsers(this.state.currentProject)], 
            //                     "called in componentWillReceiveProps")
            //         })
            //     }
            // }
            )
        }

        // if(this.state.currentTemplate ==='' && newProps.templates.success){
        //     this.setState({
        //         currentTemplate: newProps.templates.data[0].TemplateID
        //     }, () => {
        //         //console.log('------------')
        //     })            
        // }

        if(Object.keys(newProps.templates).length > 0 && newProps.templates.success) {
            let templateIndex = newProps.templates.data.findIndex(x => x.TemplateID ===this.state.currentProjectTemplate);
            if(templateIndex === -1){
                this.setState({
                    disableTemplate: 0
                })
            }else{
                this.setState({
                    disableTemplate: 1
                })
            }  
        }
        
        if(Object.keys(newProps.projectUsers).length > 0 && newProps.projectUsers.success) {
            this.setState({
                loading: false
            })
        }
        if(Object.keys(newProps.userPermissions).length > 0 && newProps.userPermissions.success) {
            this.setState({
                loading: false
            })
        }
    }

    beforeunload(e) {
        if (this.state.isBlocking) {
          e.preventDefault();
          e.returnValue = true;
        }
    }

    sequenceAxiosCalls(arr, logVal){
        axios.all(arr)
        .then(axios.spread(function (acct, perms) {
            // Both requests are now complete
            //console.log(logVal);
        }));
    }


    handleProjectChange(e) {
        let valueStatus  = e.target.value.split("#");
       
        if(valueStatus[2] != 0){ 
            this.setState({
                currentTemplate: valueStatus[2],
                currentProjectTemplate: valueStatus[2],
                currentProject: valueStatus[0],
                StatusID: valueStatus[1],
                loading: true,
                selectedFunctions: [],
                selectedPhases: [],
                permissions: [],
                firstTimeSave : false
            }, function() {
                this.props.fetchProjectFunctions({projectId: this.state.currentProject, templateId: this.state.currentTemplate});
                this.props.fetchProjectPhases({projectId: this.state.currentProject, templateId: this.state.currentTemplate});
                this.props.fetchProjectUsers(this.state.currentProject);
            })
            //console.log('abc'+ valuStatus);
        }else{
            //console.log("why");
            //return false;
            this.setState({
                currentTemplate: 0,
                currentProject: valueStatus[0],
                isBlocking: true,
                StatusID: 0,
                selectedFunctions: [],
                selectedPhases: [],
                permissions: [],
                disableTemplate: 0,
                firstTimeSave : true
            }, function() {
                this.props.fetchProjectFunctions({projectId: this.state.currentProject, templateId: this.state.currentTemplate});
                this.props.fetchProjectPhases({projectId: this.state.currentProject, templateId: this.state.currentTemplate});
                this.props.fetchProjectUsers(this.state.currentProject);
            })
        }
    }

    handleFunctionChange(checked, functionId, functionName) {
        if(this.state.userId !== ""){
	    	this.props.fetchUserPermissions({
                projectId : this.state.currentProject, 
                userId: this.state.userId, 
                templateId: this.state.currentTemplate
            });
        }
	
        let functions = this.state.selectedFunctions;
        //console.log(functions.length);
        let funcIndex = _.findIndex(functions, {"FunctionId": functionId});
        //console.log(functionName, checked, funcIndex);
        let funcIndex1 = _.findIndex(this.props.projectFunctions, {"DecompositionFunctionID": functionId});
        if(funcIndex1 === -1){
            functions.splice(funcIndex, 1);
        }else if(checked == true) {
            if(funcIndex === -1) {
                functions.push({"FunctionId": functionId, "FunctionName": functionName});
            }  
        }else if(checked == false) {
            if(funcIndex > -1) {
                functions.splice(funcIndex, 1);
            }
        }
        //console.log(functions);
        this.setState({
            selectedFunctions: functions,
            x: 1
        })
    }

    //.. todo
    handlePhaseChange(checked, phaseId, phaseName) {
	
	if(this.state.userId !== ""){
	    	this.props.fetchUserPermissions({
			projectId : this.state.currentProject, 
			userId: this.state.userId, 
			templateId: this.state.currentTemplate
		});
        }
	
        let phases = this.state.selectedPhases;
        let phaseIndex = _.findIndex(phases, {"PhaseId": phaseId});
       
        let phaseIndex1 = _.findIndex(this.props.projectPhases, {"DecompositionPhaseID": phaseId});
        if(phaseIndex1 === -1){
            phases.splice(phaseIndex, 1);
        }else if(checked == true) {
            if(phaseIndex === -1) {
                phases.push({"PhaseId": phaseId, "PhaseName": phaseName});
            }
        }else if(checked == false) {
            if(phaseIndex > -1) {
                phases.splice(phaseIndex, 1);
            }
        }
        //console.log(phases);
        this.setState({
            selectedPhases: phases,
            x: 1
        })
    }
    handleNameEdit(editedData, type) {
        let payload = {
            "ProjectId": this.state.currentProject,
            "TemplateId": this.state.currentTemplate,
        }
        if(type === 'function') {
            payload.FunctionId = editedData.DecompositionFunctionID;
            payload.Title = editedData.FunctionTitle;
        }else{
            payload.PhaseId = editedData.DecompositionPhaseID;
            payload.Title = editedData.PhaseTitle;
        }
        this.props.editClientFunctionPhaseTemplate(payload);
    }
    templateSelectHandler(e){
        this.setState({
            currentTemplate: e.target.value,
            loading: true,
            selectedFunctions: [],
            selectedPhases: [],
            permissions: [],
            isBlocking: true,
            disableTemplate: 0
        }, function() {
            this.props.fetchProjectFunctions({projectId: this.state.currentProject, templateId: this.state.currentTemplate});
            this.props.fetchProjectPhases({projectId: this.state.currentProject, templateId: this.state.currentTemplate});
        })
    }
    handleUserChange(e) {
        // if(e.target.value !== "") {  
            // console.log(e) 
            this.props.fetchUserPermissions({projectId : this.state.currentProject, userId: e.target.value, templateId: this.state.currentTemplate}); 
        //     if(this.state.userId !== ""){
        //         let permissionObj = {
        //             ProjectId: this.state.currentProject,
        //             TemplateId:this.state.currentTemplate,
        //             UserID: this.state.userId,
        //             selectedFunctions: this.state.selectedFunctions,
        //             selectedPhases: this.state.selectedPhases,
        //             permissions: this.state.permissions
        //         }
        //         //console.log(permissionObj);
        //         this.props.savePermissions1(permissionObj);     
        //     }    
            this.setState({
                userId: e.target.value,
                loading: true,
                permissions: [],
                isBlocking: true
            }, function() {
                //this.props.fetchUserPermissions(this.state.currentProject, this.state.userId, this.state.currentTemplate);                
            })
        // }else{
        //     this.setState({
        //         userId: e.target.value,
        //         isBlocking: true,
        //         setPermission: false
        //     })
        // }
    }

    handlePermissionChange(checked, phaseId, functionId) {
        let permissions = this.state.permissions;
        //console.log(permissions);
        let permissionIndex = _.findIndex(permissions, {FunctionId: functionId, PhaseId: phaseId});
        //console.log(checked, phaseId, functionId, permissionIndex);
        if(checked == true) {
            if(permissionIndex === -1) {
                permissions.push({
                    FunctionId: functionId,
                    PhaseId: phaseId
                })
            }
        }else if(checked == false) {
            if(permissionIndex > -1) {
                permissions.splice(permissionIndex, 1);
            }
        }
        //console.log(permissions);
        this.setState({
            permissions: permissions
        })
    }

    handleOnSortStop(e, ui) {
        let order = $(".move-tbody").sortable('toArray');
        let phases = this.state.selectedPhases;
        for(let i in phases) {
            let phaseIndex = order.indexOf(phases[i].PhaseId);
            if(phaseIndex !== -1) {
                phases[i].SortOrder = phaseIndex+1;
            }else{
                phases[i].SortOrder = "";
            }
        }
        this.setState({
            selectedPhases: phases
        })
    }

    handleSavePermissions() {
        let permissionObj = {
            ProjectId: this.state.currentProject,
            TemplateId:this.state.currentTemplate,
            UserID: this.state.userId,
            selectedFunctions: this.state.selectedFunctions,
            selectedPhases: this.state.selectedPhases,
            permissions: this.state.permissions
        }
        //console.log(permissionObj);
        this.props.savePermissions(permissionObj);
        this.setState({
            isBlocking: false,
            firstTimeSave : false
        })
    }
    refreshPage() {
        window.location.reload(false);
    }
    handleGoBack(){
        this.refreshPage();
        // if(this.state.currentProject !== ""){
        //     this.setState({
        //         loading: true
        //     })
        //     this.props.fetchProjectUsers(this.state.currentProject);
        //     this.props.fetchProjectFunctions(this.state.currentProject, this.state.currentTemplate);
        //     this.props.fetchProjectPhases(this.state.currentProject, this.state.currentTemplate);
        // }
    }

    render() {
        // console.log(this.state.selectedFunctions,this.state.selectedPhases,this.state.permissions)
        let projects = [];
        let projectStatusID = "";
        if(this.props.projects.success ) {
            // console.log(this.props.projects);
            if(Object.keys(this.props.projects).length > 0) {          
                projects = this.props.projects.data.map(project => {
                    //  projectStatusID = project.StatusID;
                    // console.log(projectStatusID);
                    return (
                        <option key={'projectOpt-'+project.DecompositionProjectID} value={project.DecompositionProjectID+"#"+project.StatusID+'#'+project.SelectedTemplate} statusid={project.StatusID}>{project.ProjectName}</option>
                    )
                })
            }
        }
        let templates = [];
        if(this.props.templates) {            
            if(Object.keys(this.props.templates).length > 0) {
                templates = this.props.templates.data.map(template => {  
                    return (
                        <option key={'templateOpt'+template.TemplateID} value={template.TemplateID}>{template.TemplateTitle}</option>
                    )
                })
            }
        }
        return (
            [
            <DashboardHeader key="dashboard-header"></DashboardHeader>,
            <div id="wrapper" key="body-wrapper">
                <Prompt
                    when={this.state.isBlocking}
                    message={() =>
                    `Are you sure you want to leave this page? Your changes may get lost.`
                    }
                />
                <DashboardSidebar></DashboardSidebar>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <ol className="breadcrumb dashbread">
                            <li className="breadcrumb-item">Home</li>
                            <li className="breadcrumb-item">Manage</li>
                            <li className="breadcrumb-item active">Capability</li>
                            <li className="breadcrumb-menu d-md-down-none ml-auto">
                               <img src={ require('../../../common/images/diva-icon.png') } className="logo-img" alt="Logo" />
                                <a className="btn powered p-0" href="#">
                                    <i className="icon-graph"></i> &nbsp;
                                    <i>Powered by Amploglobal</i>
                                </a>
                                
                            </li>
                        </ol>
                        <div className="container-fluid container-dashboard">
                            <BenchmarkManageAccess className="user-content">
                                <h1 className="heading mt-3">Capability Modeling - Manage Access</h1>
                                <Card className="manage-user-section">
                                    <CardHeader>
                                        Manage Access for Capability Modeling Projects
                                    </CardHeader>
                                    <CardBody>
                                        <p className="card-text">Assign Function and Phases access to the respective Capability Modeling Projects.</p>
                                        <Col sm="12" md="12" lg="10" className="user-form-section p-0">
                                            <Row className="form-group">
                                                <Col sm="12">
                                                    <Label>Capability Modeling Project Name<span className="text-danger">*</span></Label>
                                                    <select className="form-control" onChange={this.handleProjectChange.bind(this)}>
                                                        <option value={0}>Select Project</option>
                                                        {projects}
                                                    </select>
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <Col sm="12">
                                                    <Label>Choose from Assigned Organization Templates<span className="text-danger">*</span></Label>
                                                    <select className="form-control" value={this.state.currentTemplate} 
                                                    disabled={(this.state.StatusID == "1" && this.state.disableTemplate === 1) ? true : false} id="templateId" onChange={this.templateSelectHandler.bind(this)}>
                                                        <option value="0">Select Template</option>
                                                        {templates}
                                                    </select>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm="12">
                                                    <p className="card-text mb-3">Select up to maximum 4 Functions & 3 Phases:</p>
                                                </Col>                   
                                            </Row>
                                            <FunctionPhaseSelection selectedFunctions={this.state.selectedFunctions} selectedPhases={this.state.selectedPhases} handleFunctionChange={this.handleFunctionChange.bind(this)} handlePhaseChange={this.handlePhaseChange.bind(this)} projectFunctions={this.props.projectFunctions} projectPhases={this.props.projectPhases} handleNameEdit={this.handleNameEdit.bind(this)} />
                                            {this.state.firstTimeSave===true?<Row className="form-group row-btn mt-4">
                                                <Col sm="6">
                                                    <Button color="primary" className="mr-3" onClick={this.handleSavePermissions.bind(this)}>SAVE</Button>
                                                    <a href="javascript:void(0)" onClick={ this.handleGoBack.bind(this) }>Cancel</a>
                                                </Col>
                                            </Row>:null}
                                        </Col>
                                    </CardBody>
                                </Card>
                                <Permissions x={this.state.x} selectedFunctions={this.state.selectedFunctions} 
                                            firstTimeSave={this.state.firstTimeSave} userId={this.state.userId} selectedPhases={this.state.selectedPhases} projectUsers={Object.keys(this.props.projectUsers).length > 0 ?this.props.projectUsers.data : []} handlePermissionChange={this.handlePermissionChange.bind(this)} handleUserChange={this.handleUserChange.bind(this)} handleOnSortStop={this.handleOnSortStop.bind(this)} userPermissions={this.props.userPermissions.data} projectFunctions={this.props.projectFunctions} projectPhases={this.props.projectPhases} setPermission={this.state.setPermission} handleSavePermissions={this.handleSavePermissions.bind(this)} handleGoBack={this.handleGoBack.bind(this)}/>
                            </BenchmarkManageAccess>
                        </div>
                    </div>
                </div>
            </div>,
            <FooterComponent key="dashboard-footer"></FooterComponent>
            ]
        )
    }
}

ManageAccess.propTypes = {
    errors: PropTypes.object.isRequired,
    fetchProjects: PropTypes.func.isRequired,
    fetchTemplates: PropTypes.func.isRequired,
    projects: PropTypes.object.isRequired,
    fetchFunctions: PropTypes.func.isRequired,
    functions: PropTypes.array.isRequired,
    fetchPhases: PropTypes.func.isRequired,
    phases: PropTypes.array.isRequired,
    fetchProjectFunctions: PropTypes.func.isRequired,
    projectFunctions: PropTypes.array.isRequired,
    fetchProjectPhases: PropTypes.func.isRequired,
    projectPhases: PropTypes.array.isRequired,
    fetchProjectUsers: PropTypes.func.isRequired,
    projectUsers: PropTypes.object.isRequired,
    fetchUserPermissions: PropTypes.func.isRequired,
    userPermissions: PropTypes.object.isRequired,
    savePermissions: PropTypes.func.isRequired,
    savePermissions1: PropTypes.func.isRequired,
    editClientFunctionPhaseTemplate: PropTypes.func
}

const mapStateToProps = state => ({
    projects: state.capabilityAccess.items,
    templates: state.capabilityAccess.templates,
    functions: state.capabilityAccess.functions,
    phases: state.capabilityAccess.phases,
    projectFunctions: state.capabilityAccess.projectFunctions,
    projectPhases: state.capabilityAccess.projectPhases,
    projectUsers: state.capabilityAccess.projectUsers,
    userPermissions: state.capabilityAccess.userPermissions,
    editClientFuncPhase: state.capabilityAccess.editClientFuncPhase,
    errors: state.errors
});
export default connect(mapStateToProps, { fetchProjects, fetchTemplates, fetchFunctions, fetchPhases, fetchProjectFunctions, fetchProjectPhases, fetchProjectUsers, fetchUserPermissions, savePermissions, savePermissions1, editClientFunctionPhaseTemplate })(ManageAccess);