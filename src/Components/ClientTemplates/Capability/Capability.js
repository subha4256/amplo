import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import axios from 'axios';
import swal from "sweetalert";
import {Prompt} from 'react-router-dom';
import DashboardHeader from "../../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../../includes/dashboardFooter/FooterComponent';
import { CapabilityWrapper } from './Styling/CapabilityStyling';
import TemplateSlider from './TemplateSlider';
import FunctionGrid from './FunctionGrid';
import SidebarJs from '../../../common/js/sidebarAnimation';
import { fetchTemplates, fetchFunctions, fetchPhases, saveFunction, savePhase, createTemplate, updateTemplate, fetchTemplateStyles, getTemplate, saveData, deleteTemplate, duplicateTemplate } from '../../../actions/clientTemplateActions';
import {startLoader , stopLoader} from '../../../actions/loaderActions';
import { errorAlert, successAlert, responseMessage } from '../../../utils/alert';
import htmlToImage from 'html-to-image';
import CacheStorage from '../../../utils/CacheStorage';
const config = require('../../../config');

class Capability extends Component {
    constructor(props) {
        super(props);

        this.state = {
	        templateId: this.props.match.params.templateId ? this.props.match.params.templateId : "",
            processData: [],
            updateProcessData : true
        }
        this.sidebarAnimation = new SidebarJs();
    }

    componentWillReceiveProps(nextProps, prevState) {
        this.setState({
            processData: nextProps.templateStyles,
            updateProcessData : true
        });
    }

    async componentDidMount() {
        try {
            const headers = {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
            this.props.startLoader();
            let templates = await axios.get(config.laravelBaseUrl + 'getClientDecompositionTemplates', {
                headers: headers
            });
            this.props.fetchTemplates(templates);
            this.props.fetchFunctions({status: 200, data: {data: []}});
            this.props.fetchPhases({status: 200, data: {data: []}});
            this.props.fetchTemplateStyles({status: 200, data: {data: []}});
            let templateId = this.state.templateId;
            if(templateId > 0){
                this.fetchFunctions(templateId);
                this.fetchPhases(templateId);
                this.fetchTemplateStyles(templateId);
            }else{
                this.props.stopLoader();
            }
            this.sidebarAnimation.toggle();
        } catch (error) {
            if (error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }
    

    async fetchFunctions(templateId) {
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken")
        }
        let functions = await axios.get(config.laravelBaseUrl + 'getClientDecompositionFunctions/' + templateId, {
            headers: headers
        }).then((functions)=>{this.props.fetchFunctions(functions); }); 
    }

    async fetchPhases(templateId) {
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken")
        }
        let phases = await axios.get(config.laravelBaseUrl + 'getClientDecompositionPhases/' + templateId, {
            headers: headers
        });
        this.props.fetchPhases(phases);
    }

    async fetchTemplateStyles(templateId) {
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken")
        }
        this.setState({
            updateProcessData : true
        })
        let styles = await axios.get(config.laravelBaseUrl + 'getClientDecompositionFunctionPhaseStylesByTemplate/' + templateId, {
            headers: headers
        })
        this.props.fetchTemplateStyles(styles);
        this.props.stopLoader();
    }

    handleTemplateSelect(index) {
        if(index !== -1) {
            this.setState({
                templateId: this.props.templates.length > 0?this.props.templates[index].value:"",
                activeItemIndex: index,
                processData: []
            }, function () {
                if(this.state.templateId > 0){
                    this.props.startLoader();
                    this.fetchFunctions(this.state.templateId);
                    this.fetchPhases(this.state.templateId);
                    this.fetchTemplateStyles(this.state.templateId);
                }
            })
        }else{
            this.setState({
                templateId: "",
                processData: [],
                activeItemIndex: null,
            }, function () {
                    this.props.fetchFunctions({status: 200, data: {data: []}});
                    this.props.fetchPhases({status: 200, data: {data: []}});
                    this.props.fetchTemplateStyles({status: 200, data: {data: []}});
            })
        }
        
    }

    async handleStyleSelect(styleObj,actionType) {
        styleObj.templateId = this.state.templateId;
        let saveStyle = await axios.post(config.laravelBaseUrl+'saveClientFunctionPhase', styleObj, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("userToken")
            }
          });
        if(saveStyle.data.success) {
            let processData = [...this.state.processData]
            let ind = _.findIndex(processData,{FunctionId : styleObj.functionId,PhaseId : styleObj.phaseId});
            if(actionType == "remove"){
                processData[ind].StyleTitle = "";
                processData[ind].processes = [];
            }
            this.setState({
                processData : processData
            },async ()=>{
                if(actionType == "remove"){
                    this.handleSaveData();
                }
                await this.fetchTemplateStyles(styleObj.templateId);
            })
        }
    }

    deleteFunction(FunctionId){
        try {
            const headers = {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
            axios.delete(config.laravelBaseUrl+'deleteClientDecompositionTemplateFunction/'+FunctionId, {
                headers: headers
            })
            .then(data =>  {
                let templateId = this.state.templateId !== "" ? this.state.templateId : this.props.templates[0].value;
                this.fetchFunctions(templateId);
                responseMessage("success", data.data.message, "");
            });
        }catch (error) {
            if (error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }

    deletePhase(PhaseId){
        try {
            const headers = {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
            axios.delete(config.laravelBaseUrl+'deleteClientDecompositionTemplatePhase/'+PhaseId, {
                headers: headers
            })
            .then(data =>  {
                let templateId = this.state.templateId !== "" ? this.state.templateId : this.props.templates[0].value;
                this.fetchPhases(templateId);
                responseMessage("success", data.data.message, "");
            });
        }catch (error) {
            if (error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }

    async saveFunction(functions) {
        try {
            let functionObj = {
                templateId: this.state.templateId !== "" ? this.state.templateId : this.props.templates[0].value,
                functions: functions
            }
            const headers = {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
            let newFunctions = await axios.post(config.laravelBaseUrl + 'saveClientDecompositionFunction', functionObj, {
                headers: headers
            });
            this.props.saveFunction(newFunctions);
            let templateId = this.state.templateId !== "" ? this.state.templateId : this.props.templates[0].value;
            this.fetchFunctions(templateId);
        } catch (error) {
            if (error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }

    async savePhase(phases) {
        try {
            let phaseObj = {
                templateId: this.state.templateId !== "" ? this.state.templateId : this.props.templates[0].value,
                phases: phases
            }
            const headers = {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
            let newPhases = await axios.post(config.laravelBaseUrl + 'saveClientDecompositionPhase', phaseObj, {
                headers: headers
            });
            this.props.savePhase(newPhases);
            let templateId = this.state.templateId !== "" ? this.state.templateId : this.props.templates[0].value;
            this.fetchPhases(templateId);
        } catch (error) {
            if (error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }

    async createTemplate(templateObj) {
        try {
            const headers = {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
            let templates = await axios.post(config.laravelBaseUrl + 'createUpdateClientDecompositionTemplate', templateObj, {
                headers: headers
            });
            this.props.createTemplate(templates);
            console.log("Templates ==>" , templates);
            if(templates.data.message == "Template Name already present") {
                responseMessage("warning", templates.data.message, "");
            }
            let allTemplates = await axios.get(config.laravelBaseUrl + 'getClientDecompositionTemplates', {
                headers: headers
            });
            this.props.fetchTemplates(allTemplates);
            if(templates?.data?.message == "Data save successfully") {
                responseMessage("success", 'Template created successfully.', "");
                this.setState({
                    processData: [],
                    templateId : allTemplates.data.data[0].value
                },()=>{
                    this.props.startLoader();
                    this.fetchFunctions(this.state.templateId);
                    this.fetchPhases(this.state.templateId);
                    this.fetchTemplateStyles(this.state.templateId);
                })
            }
        } catch (error) {
            if (error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }

    async updateTemplate(templateObj) {
        try {
            const headers = {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
            let template = await axios.post(config.laravelBaseUrl + 'createUpdateClientDecompositionTemplate', templateObj, {
                headers: headers
            });
            this.props.updateTemplate(template);
            let allTemplates = await axios.get(config.laravelBaseUrl + 'getClientDecompositionTemplates', {
                headers: headers
            });
            this.props.fetchTemplates(allTemplates);
            responseMessage("success", 'Template updated successfully.', "");
        } catch (error) {
            if (error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }

    async getTemplate(index) {
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken")
        }
        let templateId = this.props.templates[index].value;
        let template = await axios.get(config.laravelBaseUrl + 'getClientDecompositionTemplate/' + templateId, {
            headers: headers
        });
        this.props.getTemplate(template);
    }

    handleTitleChange(e, style, index, functionId, phaseId) {
        let processData = this.state.processData;
        const functionPhaseIndex = _.findIndex(processData, { FunctionId: functionId, PhaseId: phaseId, StyleTitle: style });
        if (functionPhaseIndex !== -1) {
            if (!processData[functionPhaseIndex]['processes']) {
                processData[functionPhaseIndex]['processes'] = [];
            }
            if (processData[functionPhaseIndex]['processes'].length > 0 && processData[functionPhaseIndex]['processes'][index] !== undefined) {
                processData[functionPhaseIndex]['processes'][index] = { "processTitle": e.target.value, "processId": processData[functionPhaseIndex]['processes'][index].processId };
            } else {
                processData[functionPhaseIndex]['processes'][index] = { "processTitle": e.target.value, "processId": "" };
            }
            //  for(let i in this.props.functions){
            //     for(let j in this.props.phases){
            //         const index = _.findIndex(processData, {FunctionId: this.props.functions[i].DecompositionFunctionId, PhaseId: this.props.phases[j].DecompositionPhaseId});
            //         if(index === -1){
            //             processData.splice(index, 1);
            //         }
            //     }
            // }
            //console.log(processData);
        } else {
            let processes = [];
            processes[index] = {
                processTitle: e.target.value,
                processId: ""
            }
            //processData.pop();
            processData.push({
                FunctionId: functionId,
                PhaseId: phaseId,
                StyleTitle: style,
                processes: processes
            })
        }
        this.setState({
            processData: processData
        })
        
    }
    async handleProcessTitleUpdate(processId, processTitle) {
        let payload = {
            ProcessId: processId,
            ProcessName: processTitle
        }
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken")
        }
        let process = await axios.post(config.laravelBaseUrl + 'updateClientDecompositionTemplateProcess', payload, {
            headers: headers
        });
        if(process.data.success) {
            responseMessage("success", process.data.message, "");
            this.fetchTemplateStyles(this.state.templateId);
        }else{
            responseMessage("error", process.data.message, "");
        }
    }
    async handleSaveData() {
        try {
            this.props.startLoader();
            var node = document.getElementById('grid-container');
            const templateId = this.state.templateId !== "" ? this.state.templateId : this.props.templates[0].value;
            let payload = {
                templateId: templateId,
                input: this.state.processData
            }
            const headers = {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
            let data = await axios.post(config.laravelBaseUrl + 'saveClientFunctionPhaseAssignment', payload, {
                headers: headers
            });
            this.props.saveData(data);
            //this.fetchTemplateStyles(templateId);
            responseMessage("success", 'Template Saved Successfully', "");
            //.. Saving the template image here: 
            //.. TODO Save in the reducer saveData(data with state for optimization)
            this.saveTemplateImageToURL(templateId);
            this.fetchTemplateStyles(templateId);            
        } catch (error) {
            if (error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }

    saveTemplateImage(data) {
        //console.log('saveTemplateImage ', data)
        let node = document.getElementById('grid-container');
        try {
            var isFileSaverSupported = !!new Blob;
            htmlToImage.toBlob(node)
                .then(function (blob) {
                    let imageName = 'imageName'; //+ data.
                    //console.log(window)
                    window.saveAs(blob, imageName + '.png');

                });
        } catch (e) {
            // console.log("File saver not available");
        }
    }


    saveTemplateImageToURL(templateId){
        var that = this;
        let node = document.getElementById('grid-container');
        function filter(node) {
            return (node.tagName !== 'i');
        }
        htmlToImage.toPng(node, {filter: filter})
        .then(function (dataUrl) {
            let payload = {
                templateId: templateId,
                imageUrl: dataUrl
            }
            const headers = {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
            axios.post(config.laravelBaseUrl + 'saveClientDecompositionTemplateImage', payload, {
                headers: headers
            })
            .then(data => {
                axios.get(config.laravelBaseUrl + 'getClientDecompositionTemplates', {
                    headers: headers
                })
                .then(data => {
                    that.props.fetchTemplates(data);
                })
                
            });
        });    
    }      

    async handleDeleteProcess(processData) {
        swal({
            title: "Delete the process?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (confirmed) => {
            if(confirmed) {
                const headers = {
                    "authorization": "Bearer " + CacheStorage.getItem("userToken")
                }
                let process = await axios.delete(config.laravelBaseUrl + 'deleteProcess/'+processData.processId, {
                    headers: headers
                });
                if(process.data.success) {
                    this.fetchTemplateStyles(this.state.templateId);            
                }
            }
        })
    }
      

    async duplicateTemplate(template) {
        try {
            let payload = {
                templateId: this.state.templateId !== "" ? this.state.templateId : this.props.templates[0].value,
                templateName: template
            }
            const headers = {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
            let dupTemplate = await axios.post(config.laravelBaseUrl + 'duplicateTemplateClient', payload, {
                headers: headers
            });
            this.props.duplicateTemplate(dupTemplate);
            let allTemplates = await axios.get(config.laravelBaseUrl + 'getClientDecompositionTemplates', {
                headers: headers
            });
            this.props.fetchTemplates(allTemplates);
            responseMessage("success", 'Template duplicated successfully', "");
        } catch (error) {
            if (error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }

    async handleEditFuncPhase(editedData, type) {
        let payload = {
            "TemplateId": this.state.templateId,
        }
        if(type === 'function') {
            payload.FunctionId = editedData.DecompositionFunctionId;
            payload.Title = editedData.FunctionTitle;
        }else{
            payload.PhaseId = editedData.DecompositionPhaseId;
            payload.Title = editedData.PhaseTitle;
        }
        let editFuncPhase = await axios.post(config.laravelBaseUrl + 'editClientFunctionPhaseDecompositionTemplate', payload, {
            headers: {
                "authorization": "Bearer " + localStorage.getItem("userToken")
            }
          });
        if(editFuncPhase.data.success) {
            if(editFuncPhase.data.data.name) {
                responseMessage("error", editFuncPhase.data.data.MessageName, "");
            }else{
                responseMessage("success", editFuncPhase.data.data.MessageName, "");
            }
            if(type === 'function') {
                this.fetchFunctions(this.state.templateId);
            }else{
                this.fetchPhases(this.state.templateId);
            }  
        }
    }

    async handleSort(data, type, direction) {
        if(type === 'function') {
            let functions = this.props.functions;
            let selectedFunctions = functions.filter(fun => {
                return fun.IsSelected === "1";
            })
            let funcIndex = _.findIndex(selectedFunctions, {DecompositionFunctionId: data.DecompositionFunctionId});
            let changed = false;
            if(direction === 'left') {
                if(funcIndex > 0) {
                    selectedFunctions[funcIndex].SortOrder = parseInt(selectedFunctions[funcIndex].SortOrder) - 1;
                    selectedFunctions[funcIndex-1].SortOrder = parseInt(selectedFunctions[funcIndex].SortOrder) + 1;
                    changed = true;
                }
            }else{
                if(funcIndex < selectedFunctions.length - 1) {
                    selectedFunctions[funcIndex].SortOrder = parseInt(selectedFunctions[funcIndex].SortOrder) + 1;
                    selectedFunctions[funcIndex+1].SortOrder = parseInt(selectedFunctions[funcIndex].SortOrder) - 1;
                    changed = true;
                }
            }
            if(changed) {
                let payload = {
                    templateId: this.state.templateId,
                    funcs: selectedFunctions
                }
                let sortFuncs = await axios.post(config.laravelBaseUrl + 'updateClientDecompositionTemplateFunctionPhaseSortOrder', payload, {
                    headers: {
                        "authorization": "Bearer " + localStorage.getItem("userToken")
                    }
                });
                if(sortFuncs.data.success) {
                    this.fetchFunctions(this.state.templateId);
                }else{
                    responseMessage("error", sortFuncs.data.data.message, "");
                }
            }
        }else{
            let phases = this.props.phases;
            let selectedPhases = phases.filter(phase => {
                return phase.IsSelected === "1";
            })
            let changed = false;
            let phaseIndex = _.findIndex(selectedPhases, {DecompositionPhaseId: data.DecompositionPhaseId});
            if(direction === 'left') {
                if(phaseIndex > 0) {
                    selectedPhases[phaseIndex].SortOrder = parseInt(selectedPhases[phaseIndex].SortOrder) - 1;
                    selectedPhases[phaseIndex-1].SortOrder = parseInt(selectedPhases[phaseIndex].SortOrder) + 1;
                    changed = true;
                }
            }else{
                if(phaseIndex < selectedPhases.length - 1) {
                    selectedPhases[phaseIndex].SortOrder = parseInt(selectedPhases[phaseIndex].SortOrder) + 1;
                    selectedPhases[phaseIndex+1].SortOrder = parseInt(selectedPhases[phaseIndex].SortOrder) - 1;
                    changed = true;
                }
            }
            if(changed) {
                let payload = {
                    templateId: this.state.templateId,
                    phases: selectedPhases
                }
                let sortPhases = await axios.post(config.laravelBaseUrl + 'updateClientDecompositionTemplateFunctionPhaseSortOrder', payload, {
                    headers: {
                        "authorization": "Bearer " + localStorage.getItem("userToken")
                    }
                });
                if(sortPhases.data.success) {
                    this.fetchPhases(this.state.templateId);
                }else{
                    responseMessage("error", sortPhases.data.data.message, "");
                }
            }
        }
    }

    deleteTemplate() {
        swal({
            title: "Are you sure you want to delete template?",
            //text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((data) => {
            if (data) {
                try {
                    let templateId = this.state.templateId !== "" ? this.state.templateId : this.props.templates[0].value;
                    const headers = {
                        "authorization": "Bearer " + CacheStorage.getItem("userToken")
                    }
                    axios.delete(config.laravelBaseUrl + 'deleteTemplateClient/'+templateId, {
                        headers: headers
                    }).then((template)=>{
                    this.props.deleteTemplate(template);
                    axios.get(config.laravelBaseUrl + 'getClientDecompositionTemplates', {
                        headers: headers
                    }).then((allTemplates)=>{
                        this.props.fetchTemplates(allTemplates); 
                        this.handleTemplateSelect(allTemplates.data.data.length-1)
                    })
                    responseMessage("success", 'Template deleted successfully', "");
                    })
                } catch (error) {
                    if (error.response) {
                        responseMessage("error", error.response.data.message, "");
                        return;
                    }
                    responseMessage("error", "Something Went Wrong!", "");
                    throw error;
                }
            }
        });        
    }

    render() {
        //console.log(this.props.successmsg);
        return (
            [
                <DashboardHeader key="dashboard-header"></DashboardHeader>,
                <div id="wrapper" key="body-wrapper">
                    <DashboardSidebar></DashboardSidebar>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <ol className="breadcrumb dashbread">
                                <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>
                                <li className="breadcrumb-item active">Capability Modeling</li>
                                <li className="breadcrumb-menu d-md-down-none ml-auto">
                                    <span className="position-relative helpwrap">
                                        <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                                        <div className="dropdown-menu" aria-labelledby="helpBtn">
                                            <p>Lorem Ipsum Dolor</p>
                                        </div>
                                    </span>
                                </li>
                                <li className="breadcrumb-menu d-md-down-none">
                                    {<img src={require('./../../../common/images/diva-icon.png')} className="logo-img" alt="Logo" />}
                                    <a className="btn powered p-0" href="#">
                                        <i className="icon-graph"></i> &nbsp;
                                    <i>Powered by Amploglobal</i>
                                    </a>

                                </li>
                            </ol>
                            <div className="d-flex">
                                <div className="container-fluid container-dashboard container-capability">
                                    <CapabilityWrapper>
                                        <TemplateSlider templateId={this.state.templateId} templates={this.props.templates} handleTemplateSelect={this.handleTemplateSelect.bind(this)} functions={this.props.functions} phases={this.props.phases} deleteFunction={this.deleteFunction.bind(this)}  deletePhase={this.deletePhase.bind(this)} saveFunction={this.saveFunction.bind(this)} savePhase={this.savePhase.bind(this)} createTemplate={this.createTemplate.bind(this)} updateTemplate={this.updateTemplate.bind(this)} handleSaveData={this.handleSaveData.bind(this)} getTemplate={this.getTemplate.bind(this)} template={this.props.template} duplicateTemplate={this.duplicateTemplate.bind(this)} deleteTemplate={this.deleteTemplate.bind(this)} />
                                        <div id="grid-container">
                                            <FunctionGrid functions={this.props.functions} phases={this.props.phases} handleStyleSelect={this.handleStyleSelect.bind(this)} handleProcessTitleUpdate={this.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={this.state.processData} templates={this.props.templates} activeItemIndex={this.state.activeItemIndex} templateId={this.state.templateId} handleEditFuncPhase={this.handleEditFuncPhase.bind(this)} handleDeleteProcess={this.handleDeleteProcess.bind(this)} handleSort={this.handleSort.bind(this)} />
                                        </div>
                                    </CapabilityWrapper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                <FooterComponent key="dashboard-footer"></FooterComponent>
            ]
        )
    }
}

Capability.propTypes = {
    fetchTemplates: PropTypes.func.isRequired,
    templates: PropTypes.array.isRequired,
    fetchFunctions: PropTypes.func.isRequired,
    functions: PropTypes.array.isRequired,
    fetchPhases: PropTypes.func.isRequired,
    phases: PropTypes.array.isRequired,
    saveFunction: PropTypes.func.isRequired,
    saveFunctionData: PropTypes.object.isRequired,
    savePhase: PropTypes.func.isRequired,
    savePhaseData: PropTypes.object.isRequired,
    createTemplate: PropTypes.func.isRequired,
    templateData: PropTypes.object.isRequired,
    updateTemplate: PropTypes.func.isRequired,
    updateTemplateData: PropTypes.object.isRequired,
    fetchTemplateStyles: PropTypes.func.isRequired,
    templateStyles: PropTypes.array.isRequired,
    getTemplate: PropTypes.func.isRequired,
    template: PropTypes.object.isRequired,
    saveData: PropTypes.func.isRequired,
    deleteTemplate: PropTypes.func.isRequired,
    deleteTemplateData: PropTypes.object.isRequired,
    duplicateTemplate: PropTypes.func.isRequired,
    duplicateTemplateData: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    templates: state.clientTemplate.templates,
    functions: state.clientTemplate.functions,
    phases: state.clientTemplate.phases,
    saveFunctionData: state.clientTemplate.saveFunctionData,
    savePhaseData: state.clientTemplate.savePhaseData,
    templateData: state.clientTemplate.templateData,
    updateTemplateData: state.clientTemplate.updateTemplateData,
    templateStyles: state.clientTemplate.templateStyles,
    template: state.clientTemplate.template,
    deleteTemplateData: state.clientTemplate.deleteTemplateData,
    duplicateTemplateData: state.clientTemplate.duplicateTemplateData,
    errors: state.errors,
    successmsg: state.clientTemplate.successmsg
});
export default connect(mapStateToProps, { fetchTemplates, fetchFunctions, fetchPhases, savePhase, saveFunction, createTemplate, fetchTemplateStyles, getTemplate, updateTemplate, saveData, duplicateTemplate, deleteTemplate, startLoader , stopLoader })(Capability);