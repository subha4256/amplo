import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import { CapabilityWrapper } from './Styling/CapabilityStyling';
import CapabilityHeader from './CapabilityHeader';
import CapabilityAside from './CapabilityAside';
import CapabilityScores from './CapabilityScores';
import FunctionGrid from './FunctionGrid';
import CapabilityRatings from './CapabilityRatings';
import SidebarJs from '../../common/js/sidebarAnimation'; 
import  Loader  from '../Loader';
import {copyProjectData, fetchFunctions, fetchPhases, fetchProcessData, fetchHeatmapData, fetchActivityBank, fetchScores, makeloadingTrue, removeProcess } from '../../actions/capabilityActions';
import {resetProject,restoreUseCaseState,saveClientAnalyticsUsecaseruns,getClientAnalyticsUsecaserunsDetails,fetchPainPointsInitiatives} from '../../actions/benchmarkingActions'
import axios from 'axios';
import {errorAlert,responseMessage} from '../../utils/alert';
import CacheStorage from '../../utils/CacheStorage';
import $ from 'jquery'

import DragDropContext from "../DesignThinkingRoadmap/withDnDContext";

const config = require('../../config');

//.. Reviewed by Ashim:: Need to implement LoadAPI > action creators

class Capability extends Component {
    constructor(props) {
        super(props);
        this.state = {
            capabilityState: 'progress',
            projectId: this.props.match.params.projectId ? this.props.match.params.projectId : 0,
            processData: [],
            processes: [],
            functions: [],
            phases: [],
            searchResults:{},
            counter:1,
            projectName:"",
            modelingMode:0,
            loading:true,
            searchStr: "",
            defaultVersion:0,
            versionData:[],
            versionVal:'',
            readOnly:false,
            latestversionVal:"",
            draggedFunction: null,
            draggedPhase: null,
            currentVersionData : {},
            toggled:false,
            buttonText:"Request PainPoints Initiative",
            scoreDetails: {} ,
            projectLinkName:"",
            isEditableProcess: false,
            templateId: ""

            
        }
        this.sidebarAnimation=new SidebarJs();

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log('nextProps',nextProps);
        let returnObj = {};
        if(Object.keys(nextProps.copySuccess).length > 0){
            // console.log(nextProps.copySuccess);
            returnObj.loading = false;
        }
        if(prevState.projectId > 0){
        if(nextProps.processData.success) {
            returnObj.processData = nextProps.processData.data;
            returnObj.functions = nextProps.functions;
            returnObj.phases = nextProps.phases;
        }
        }
        else{
            returnObj.processData = [];
            returnObj.functions = [];
            returnObj.phases = [];
        }
        
        if(nextProps.processes.success && nextProps.processes.data !== prevState.processes) {
            returnObj.processes = nextProps.processes.data.length ? nextProps.processes.data : prevState.processes;
            returnObj.loading = nextProps.loadingstatus;
        }
        //returnObj.loading = false;
       // console.log(nextProps.activity);
       if(nextProps.CLientAnalyticsUsecaseData && nextProps.CLientAnalyticsUsecaseData !== null &&
        typeof nextProps.CLientAnalyticsUsecaseData.success !== 'undefined' && nextProps.CLientAnalyticsUsecaseData.success === true){
        //  console.log('Nextprsops',previousProps);
         
           $('#showSuccess').click(); 
           
        nextProps.restoreUseCaseState()
       
        
       //   $('#requestPopup').modal({
       //     show: 'true'
       // }); 
       }
        return(returnObj);
        
    }
    componentDidUpdate(previousProps){
        // console.log('Nextprops',previousProps);
        
            if(previousProps.loadingstatus !== this.props.loadingstatus){
                this.setState({
                    loading: this.props.loadingstatus
                })
            }
    }


    componentWillUnmount() {
        // DragDropContext()
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        setInterval(()=>{
            if(sessionStorage.getItem('refreshCapability')!=null){
                sessionStorage.removeItem('refreshCapability');
                this.loadRefreshProject();
            }
        },1000)
        // console.log('Redux',this.props.selectedCapabilityProject)
        // this.handleProjectChange(null,this.props.selectedCapabilityProject)
        try{
            if(this.state.projectId > 0) {
               
                this.loadRefreshProject();
              //  this.props.fetchScores(this.state.projectId,this.state.defaultVersion);
              //  this.props.fetchFunctions(this.state.projectId,this.state.defaultVersion);
              //  this.props.fetchPhases(this.state.projectId,this.state.defaultVersion);
              //  this.props.fetchProcessData(this.state.projectId,this.state.defaultVersion);
              //  this.props.fetchActivityBank(this.state.projectId,this.state.defaultVersion);
            }else{
                this.setState({
                    loading: false,
                    processData:[],
                    processes:[],
                    functions: [],
                    phases: []
                });
            }
            //this.sidebarAnimation.toggle();
            this.rightBarBtn.click();
        }catch(error) {
            this.setState({
                loading: false
            });
            if(error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }

handlePorjectName = (id) =>{
    axios.get(`${config.laravelBaseUrl}getDecompositionProjectVersion/${id}/0/0`,
    {
      headers: {
          "authorization": "Bearer " + sessionStorage.getItem("userToken")
      }
   }).then(res => {
       // console.log(res)
        this.setState({projectName:res.data.data[0].AmpMarkingProjectName })
       this.setState({linkAmpProjectId: res.data.data[0].AmpMarkingProjectId})
   }).catch(error =>  responseMessage("Error", "Something Went Wrong!", ""))
}

       handleLinkProjectName =(name)=>{
       this.setState({ projectLinkName: name })
     }


     handleRemoveSideNameProject =()=>{
            this.setState({ projectLinkName: ""})
     }


    handleScoreDetails=(id)=> {
                axios.get(`${config.laravelBaseUrl}GetReestablishAflyScore/${id}`,{
            headers : {
              authorization : sessionStorage.getItem('userToken')
            }
          }).then(res=>{
            console.log({res})
                if(res.status == 200) {
                     this.setState({scoreDetails: {
                      AsIsAflyScore: res.data.data[0].AsIsAflyScore ,
                      ReestablishAsIsAflyScore: res.data.data[0].ReestablishAsIsAflyScore
                     }})
                }
                return res.data
          }).catch((error) =>{
            console.log("Error", error)
          })
    }

    
    handleCapabilityState(capabilityState) {
        try {
            this.setState({
                capabilityState: capabilityState
            })
            
            if(capabilityState === "progress") {
                // console.log(4);
                this.props.fetchProcessData(this.state.projectId,this.state.defaultVersion);
                this.props.makeloadingTrue();
                this.setState({
                    modelingMode: 0,
                    loading: true
                })
            }else{
                // console.log(5);
                this.props.fetchHeatmapData(this.state.projectId,this.state.defaultVersion);
                this.props.makeloadingTrue();
                this.setState({
                    modelingMode: 1,
                    loading: true
                })
            }
        }catch(error) {
            this.setState({
                loading: false
            });
            if(error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }

    onDragStart = (ev, text, id, index) => {
        if(this.state.readOnly === false){
        //console.log(id);
        ev.dataTransfer.setData('dragText', text);
        ev.dataTransfer.setData('dragIndex', index);
        ev.dataTransfer.setData('dragId', id);
        }
    }


    isEdiableProcessToggle = () => {
          this.setState((prevState) =>  (
              { isEditableProcess : !prevState.isEditableProcess }
          ))
    }

    handleGridDragStart = (ev, fId, pId, functionKey, phaseKey, name, id, index) => {
        if(this.state.readOnly === false){
            this.setState({
                draggedFunction: fId,
                draggedPhase: pId,
                draggedFunctionKey: functionKey,
                draggedPhaseKey: phaseKey
            });
            ev.dataTransfer.setData('dragText', name);
            ev.dataTransfer.setData('dragIndex', index);
            ev.dataTransfer.setData('dragId', id);
        }
    }

    handleAsideDrop = async (ev, text, id, index) => {
        if(this.state.readOnly === false){
            let dragIndex = ev.dataTransfer.getData('dragIndex');
            let dragText = ev.dataTransfer.getData('dragText');
            let dragId = ev.dataTransfer.getData('dragId');
            if(dragId !== id) {
                let processData = this.state.processData;
                let phaseKey = this.state.draggedPhaseKey;
                let functionKey = this.state.draggedFunctionKey;
                let phaseArr  = processData[this.state.draggedFunction][this.state.draggedPhase];
                // set values in grid
                phaseArr[dragIndex].DecompositionProcessLevel1ID = id;
                phaseArr[dragIndex].ProcessLevel1Name = text;
                processData[this.state.draggedFunction][this.state.draggedPhase] = phaseArr;
                // set values in aside bar
                let processes = this.state.processes;
                processes[index].ProcessLevel1Title = dragText;
                processes[index].DecompositionProcessLevel1ID = dragId;
                let phaseNumKey = phaseKey.substr(phaseKey.length - 1, phaseKey.length);
                let functionNumKey = functionKey.substr(functionKey.length - 1, functionKey.length);
                let payload = {
                    phase_id: this.props.phases[phaseNumKey-1].DecompositionPhaseProjectID,
                    function_id: this.props.functions[functionNumKey-1].DecompositionFunctionProjectID,
                    project_id: this.state.projectId,
                    location_id: parseInt(dragIndex)+1,
                    location_flag: 1,
                    process_level_id: id
                }
                let saveLocation = await axios.post(config.laravelBaseUrl+'update_decomposition_level_location', payload, {
                    headers: {
                        "authorization": "Bearer " + sessionStorage.getItem("userToken")
                    }
                });
                this.setState({
                    processData: processData,
                    processes: processes,
                    draggedPhase: null,
                    draggedFunction: null,
                    draggedFunctionKey: null,
                    draggedPhaseKey: null
                }, async () => {
                    let payload2 = {
                        phase_id: 0,
                        function_id: 0,
                        project_id: this.state.projectId,
                        location_id: -1,
                        location_flag: 0,
                        process_level_id: dragId
                    }
                    let saveLocation2 = await axios.post(config.laravelBaseUrl+'update_decomposition_level_location', payload2, {
                        headers: {
                            "authorization": "Bearer " + sessionStorage.getItem("userToken")
                        }
                    });
                    if(saveLocation.data.success && saveLocation2.data.success) {
                        this.props.fetchProcessData(this.state.projectId,this.state.defaultVersion);
                        this.props.fetchActivityBank(this.state.projectId,this.state.defaultVersion);
                    }
                });
            }
        }
    }

    onDrop = async (ev, fId, pId, functionKey, phaseKey, name, id) => {
        if(this.state.readOnly === false){
            let dragIndex = ev.dataTransfer.getData('dragIndex');
            let dragText = ev.dataTransfer.getData('dragText');
            let dragId = ev.dataTransfer.getData('dragId');
            if(dragId !== id) {
                let processData = this.state.processData;
                let phaseArr  = processData[fId][pId];
                let processKey = null;
                let processId = id;
                for(let index=0; index < phaseArr.length; index++) {
                    phaseArr = phaseArr.filter(function(el, i) {
                        if(el.DecompositionProcessLevel1ID == id) {
                            processKey = i;
                            el.ProcessLevel1Name = dragText;
                            el.DecompositionProcessLevel1ID = dragId;
                        }
                        return el;
                    });
                }
                processData[fId][pId] = phaseArr;

                /*let processes = this.state.processes.filter((process, i) => {
                    if(i == dragIndex) {
                        process.ProcessLevel1Title = name;
                        process.DecompositionProcessLevel1ID = id;
                    }
                    return process;
                });
                this.setState({
                    processData: processData,
                    processes: processes
                });*/
                let phaseNumKey = phaseKey.substr(phaseKey.length - 1, phaseKey.length);
                let functionNumKey = functionKey.substr(functionKey.length - 1, functionKey.length);
                let payload = {
                    phase_id: this.props.phases[phaseNumKey-1].DecompositionPhaseProjectID,
                    function_id: this.props.functions[functionNumKey-1].DecompositionFunctionProjectID,
                    project_id: this.state.projectId,
                    location_id: processKey+1,
                    location_flag: 1,
                    process_level_id: dragId
                }
                let saveLocation = await axios.post(config.laravelBaseUrl+'update_decomposition_level_location', payload, {
                    headers: {
                        "authorization": "Bearer " + sessionStorage.getItem("userToken")
                    }
                });
                let payload2 = {
                    phase_id: 0,
                    function_id: 0,
                    project_id: this.state.projectId,
                    location_id: -1,
                    location_flag: 0,
                    process_level_id: processId
                }
                if(this.state.draggedFunction && fId) {
                    console.log('dropped in between');
                    let draggedPhaseKey = this.state.draggedPhaseKey;
                    let draggedFunctionKey = this.state.draggedFunctionKey;
                    let phaseNumKey2 = draggedPhaseKey.substr(draggedPhaseKey.length - 1, draggedPhaseKey.length);
                    let functionNumKey2 = draggedFunctionKey.substr(draggedFunctionKey.length - 1, draggedFunctionKey.length);
                    payload2 = {
                        phase_id: this.props.phases[phaseNumKey2-1].DecompositionPhaseProjectID,
                        function_id: this.props.functions[functionNumKey2-1].DecompositionFunctionProjectID,
                        project_id: this.state.projectId,
                        location_id: dragIndex+1,
                        location_flag: 1,
                        process_level_id: processId
                    }
                }
                let saveLocation2 = await axios.post(config.laravelBaseUrl+'update_decomposition_level_location', payload2, {
                    headers: {
                        "authorization": "Bearer " + sessionStorage.getItem("userToken")
                    }
                });
                if(saveLocation.data.success && saveLocation2.data.success) {
                    this.props.fetchProcessData(this.state.projectId,this.state.defaultVersion);
                    this.props.fetchActivityBank(this.state.projectId,this.state.defaultVersion);
                }
            }
        }
    }

    initializeProject = (projects) => {
        try {
            if(this.state.projectId === "" && projects.length > 0) {
                this.setState({
                    projectId: projects[0].DecompositionProjectID,
                    projectName: projects[0].ProjectName
                }, function() {
                    this.props.fetchScores(this.state.projectId,this.state.defaultVersion);
                    this.props.fetchFunctions(this.state.projectId,this.state.defaultVersion);
                    this.props.fetchPhases(this.state.projectId,this.state.defaultVersion);
                    this.props.fetchProcessData(this.state.projectId,this.state.defaultVersion);
                    this.props.fetchActivityBank(this.state.projectId,this.state.defaultVersion);
                });
            }
        }catch(error) {
            this.setState({
                loading: false
            });
            if(error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }
    // handleCopyProject = (project_name) => {
    //     this.setState({
    //         loading: true
    //     })
    //     let copyObj = {
    //         project_id: this.state.projectId,
    //         project_name: project_name
    //     }
    //     this.props.copyProjectData(copyObj);
    //     this.props.makeloadingTrue();
    // }



    handleVersionChange = (e,val) => {

        // console.log"VALUE",val)
        let integratedVersion = parseFloat(this.state.versionData[0].Version) + parseFloat(0.1);  
        if(val == ''){
            this.setState({defaultVersion:0});
                            
            this.setState({versionVal:integratedVersion.toFixed(1)}); 
            this.setState({latestversionVal:integratedVersion.toFixed(1)});
            this.setState({readOnly:true});
            this.props.makeloadingTrue();
            this.props.fetchScores(this.state.projectId,0);
            this.props.fetchFunctions(this.state.projectId,0);
            this.props.fetchPhases(this.state.projectId,0);
            this.props.fetchProcessData(this.state.projectId,0);
            this.props.fetchActivityBank(this.state.projectId,val.VersionId);
        }else{          
            this.setState({currentVersionData : val})   

            this.setState({defaultVersion:val.VersionId});
            this.setState({latestversionVal:integratedVersion.toFixed(1)});
            let filterData =  this.state.versionData.filter(function (item) {
                return item.VersionId === val.VersionId;
            });    
            if(filterData){      
                this.setState({versionVal:val.Version});
            }
            if(val.Status == 'complete'){
                this.setState({readOnly:true});
            }else if(val.Status == "incomplete"){
                this.setState({readOnly:false});
            }
            this.props.makeloadingTrue();
            this.props.fetchScores(this.state.projectId,val.VersionId);
            this.props.fetchFunctions(this.state.projectId,val.VersionId);
            this.props.fetchPhases(this.state.projectId,val.VersionId);
            this.props.fetchProcessData(this.state.projectId,val.VersionId);
            this.props.fetchActivityBank(this.state.projectId,val.VersionId);
        }  
    }

    changeReadonly = (e) => {
        if(this.state.readOnly === false){
            this.setState({readOnly:true});
        }else{
            this.setState({readOnly:false});   
            
        }
        
        //this.handleProjectChange();
    }
    loadRefreshProject = (e) =>{
             let selfOBj = this;
                axios.get(config.laravelBaseUrl+'getDecompositionProjectVersion/' +this.state.projectId+'/0/0',{
                    headers: {
                        "authorization": "Bearer " + sessionStorage.getItem("userToken")
                    }
                }).then(function(response){   
                  

                    if(response?.data?.data?.length == 0 ){
                        // console.log("loaded0");
                        
                        selfOBj.setState({projectLinkName: response?.data?.data[0]?.AmpMarkingProjectName , templateId: response.data?.data[0]?.TemplateId })
                        selfOBj.setState({versionData:response?.data?.data})
                        selfOBj.setState({defaultVersion:0});
                        selfOBj.setState({versionVal:0});
                        selfOBj.setState({
                            readOnly : false
                        })
                        selfOBj.setState({latestversionVal:0});
                        selfOBj.props.makeloadingTrue();
                        selfOBj.props.fetchScores(selfOBj.state.projectId,0);
                        selfOBj.props.fetchFunctions(selfOBj.state.projectId,0);
                        selfOBj.props.fetchPhases(selfOBj.state.projectId,0);
                        selfOBj.props.fetchProcessData(selfOBj.state.projectId,0);
                        selfOBj.props.fetchActivityBank(selfOBj.state.projectId,0); 
                    }else{
                        // let integratedVersion = parseFloat(response.data.data[0].Version) + parseFloat(0.1);
                        // console.log("loaded>1");
                        selfOBj.setState({versionData:response?.data?.data})
                        selfOBj.setState({currentVersionData : response?.data?.data[0] , templateId: response?.data?.data[0].TemplateId})
                        if(response.data.data[0].Status === 'complete'){
                            selfOBj.setState({
                                readOnly : true
                            })
                        }else if(response.data.data[0].Status === 'incomplete'){
                            selfOBj.setState({
                                readOnly : false
                            })
                        }
                        selfOBj.setState({defaultVersion:0});
                        selfOBj.setState({versionVal:response.data.data[0].Version});
                        selfOBj.setState({latestversionVal:response.data.data[0].Version});
                        selfOBj.props.makeloadingTrue();
                        selfOBj.props.fetchScores(selfOBj.state.projectId,0);
                        selfOBj.props.fetchFunctions(selfOBj.state.projectId,0);
                        selfOBj.props.fetchPhases(selfOBj.state.projectId,0);
                        selfOBj.props.fetchProcessData(selfOBj.state.projectId,0);
                        selfOBj.props.fetchActivityBank(selfOBj.state.projectId,0); 

                    }                 
                                       
                });
    }
    handleRemoveProcess(DecompositionProcessLevel1ID) {
        this.props.removeProcess(DecompositionProcessLevel1ID);
    }
    handleProjectChange = (e,project) => {
        let projectId ;
        let projectName;
                if(project !== null && typeof project !== 'undefined'){
                    // console.log('If',project)
                    if(typeof project.projId === 'undefined' || typeof project.projName === 'undefined'){
                        return
                    }
                     projectId    = project.projId
         projectName  = project.projName;
         let selectedProjectId = projectId;
         this.setState({
            projectId:   projectId,
            projectName: projectName,
            processes: [],
            loading:true,
            capabilityState: 'progress' /* hotfix */,
            toggled:false
        }, function() {
            try{
                let selfOBj = this;
                axios.get(config.laravelBaseUrl+'getDecompositionProjectVersion/' +selectedProjectId+'/0/0',{
                    headers: {
                        "authorization": "Bearer " + sessionStorage.getItem("userToken")
                    }
                }).then(function(response){   
                    console.log({response});
                    if(response.data.data.length == 0 ){
                        selfOBj.setState({versionData:response.data.data})
                        selfOBj.setState({defaultVersion:0});
                        selfOBj.setState({versionVal:0});
                        selfOBj.setState({
                            readOnly : false
                        })
                        selfOBj.setState({latestversionVal:0});
                        selfOBj.props.makeloadingTrue();
                        selfOBj.props.fetchScores(selfOBj.state.projectId,0);
                        selfOBj.props.fetchFunctions(selfOBj.state.projectId,0);
                        selfOBj.props.fetchPhases(selfOBj.state.projectId,0);
                        selfOBj.props.fetchProcessData(selfOBj.state.projectId,0);
                        selfOBj.props.fetchActivityBank(selfOBj.state.projectId,0); 
                    }else{
                        // let integratedVersion = parseFloat(response.data.data[0].Version) + parseFloat(0.1);
                        // console.log(integratedVersion);
                        selfOBj.setState({versionData:response.data.data})
                        if(response.data.data[0].Status === 'complete'){
                            selfOBj.setState({
                                readOnly : true
                            })
                        }else if(response.data.data[0].Status === 'incomplete'){
                            selfOBj.setState({
                                readOnly : false
                            })
                        }
                        selfOBj.setState({currentVersionData : response.data.data[0] ,templateId: response.data.data[0].TemplateId})
                        selfOBj.setState({defaultVersion:0});
                        selfOBj.setState({latestversionVal:response.data.data[0].Version});
                        selfOBj.setState({versionVal:response.data.data[0].Version});
                        selfOBj.props.makeloadingTrue();
                        selfOBj.props.fetchScores(selfOBj.state.projectId,0);
                        selfOBj.props.fetchFunctions(selfOBj.state.projectId,0);
                        selfOBj.props.fetchPhases(selfOBj.state.projectId,0);
                        selfOBj.props.fetchProcessData(selfOBj.state.projectId,0);
                        selfOBj.props.fetchActivityBank(selfOBj.state.projectId,0); 
                    }                 
                                       
                });
                               
            }catch(error) {
                this.setState({
                    loading: false
                });
                if(error.response) {
                    responseMessage("error", error.response.data.message, "");
                    return;
                }
                responseMessage("error", "Something Went Wrong!", "");
                throw error;
            }
        });
                }
        //console.log('handleProjectChange -> ', e);
        else if(e === null || typeof e === 'undefined'){
            return
        }
        else{
            let projectId    = e.nativeEvent.target.selectedIndex
        let projectName  = e.nativeEvent.target[projectId].text;
        let selectedProjectId = e.target.value;
        this.setState({
            projectId:   e.target.value,
            projectName: projectName,
            processes: [],
            loading:true,
            capabilityState: 'progress' /* hotfix */,
            toggled:false
        }, function() {
            try{
                let selfOBj = this;
                axios.get(config.laravelBaseUrl+'getDecompositionProjectVersion/' +selectedProjectId+'/0/0',{
                    headers: {
                        "authorization": "Bearer " + sessionStorage.getItem("userToken")
                    }
                }).then(function(response){   
                    console.log({response});
                    if(response.data.data.length == 0 ){
                         
                    
                        selfOBj.setState({versionData:response.data.data})
                        selfOBj.setState({defaultVersion:0});
                        selfOBj.setState({versionVal:0});
                        selfOBj.setState({
                            readOnly : false
                        })
                        selfOBj.setState({latestversionVal:0});
                        selfOBj.props.makeloadingTrue();
                        selfOBj.props.fetchScores(selfOBj.state.projectId,0);
                        selfOBj.props.fetchFunctions(selfOBj.state.projectId,0);
                        selfOBj.props.fetchPhases(selfOBj.state.projectId,0);
                        selfOBj.props.fetchProcessData(selfOBj.state.projectId,0);
                        selfOBj.props.fetchActivityBank(selfOBj.state.projectId,0); 
                    }else{
                        // let integratedVersion = parseFloat(response.data.data[0].Version) + parseFloat(0.1);
                        // console.log(integratedVersion);
                        selfOBj.setState({projectLinkName: response.data.data[0].AmpMarkingProjectName})

                        selfOBj.handleScoreDetails(response.data.data[0].AmpMarkingProjectId)

                        selfOBj.setState({versionData:response.data.data})
                        if(response.data.data[0].Status === 'complete'){
                            selfOBj.setState({
                                readOnly : true
                            })
                        }else if(response.data.data[0].Status === 'incomplete'){
                            selfOBj.setState({
                                readOnly : false
                            })
                        }
                        selfOBj.setState({currentVersionData : response.data.data[0] , templateId: response.data.data[0].TemplateId})
                        selfOBj.setState({defaultVersion:0});
                        selfOBj.setState({latestversionVal:response.data.data[0].Version});
                        selfOBj.setState({versionVal:response.data.data[0].Version});
                        selfOBj.props.makeloadingTrue();
                        selfOBj.props.fetchScores(selfOBj.state.projectId,0);
                        selfOBj.props.fetchFunctions(selfOBj.state.projectId,0);
                        selfOBj.props.fetchPhases(selfOBj.state.projectId,0);
                        selfOBj.props.fetchProcessData(selfOBj.state.projectId,0);
                        selfOBj.props.fetchActivityBank(selfOBj.state.projectId,0); 
                    }                 
                                       
                });
                               
            }catch(error) {
                this.setState({
                    loading: false
                });
                if(error.response) {
                    responseMessage("error", error.response.data.message, "");
                    return;
                }
                responseMessage("error", "Something Went Wrong!", "");
                throw error;
            }
        });
    
    }
        // console.log(e.target.value);
        
    }
    
    addActivity(e) {
        e.preventDefault();
        let activities = this.state.processes;
        let result           = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        // for ( let i = 0; i < 5; i++ ) {
        //     result += (Math.floor(Math.random() * 1000));
        // }
        result = -1;
        activities.push({
            DecompositionProcessLevel1ID: result,
            ProcessLevel1Title: "New Process "+this.state.counter
        });
        this.setState({
            processes: activities,
            counter:this.state.counter+1
        });
        
        //console.log(this.state.processes)
    }

    async addProcess(e, index,DecompositionProcessLevel1ID) {
        try{
            let activities = this.state.processes;
            let processLevelId;
            if(isNaN(DecompositionProcessLevel1ID) == false)
            {
                processLevelId = DecompositionProcessLevel1ID;
            }else{
                processLevelId = 0;
            }
            if(e.target.value!=''){
                //console.log(7);
                delete activities[index];
                this.setState({
                    processes: activities,
                    loading: true
                });
            
                const activityObj = {
                    project_id: this.state.projectId,
                    process_level_title: e.target.value,
                    process_level_id: processLevelId
                }
                let saveActivity = await axios.post(config.laravelBaseUrl+'add_decomposition_process_level_activities', activityObj, {
                    headers: {
                        "authorization": "Bearer " + sessionStorage.getItem("userToken")
                    }
                });
                if(saveActivity.data.success) {
                    this.props.fetchActivityBank(this.state.projectId,this.state.defaultVersion);
                }
            }
        }catch(error) {
            this.setState({
                loading: false
            });
            if(error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
        /*let activities = this.state.processes;
        activities[index].ProcessName = e.target.value;
        this.setState({
            processes: activities
        })*/
    }
   
    handleSearchItem = (str) => {
        this.setState({ searchStr: str.trim()})
    }
    handleSearchChange = async (str) => {
        try{
            if(str.trim() !=''){
                
                let searchResults = await axios.get(config.laravelBaseUrl+'get_decomposition_process_level_search/'+this.state.projectId+'/'+str, {
                    headers: {
                        "authorization": "Bearer " + CacheStorage.getItem("userToken")
                    }
                });
                
                if(searchResults.data.success==true){
                    this.setState({
                        searchResults:searchResults.data.data
                    })
                }
            }else{
                this.setState({
                    searchResults:{}
                })
            }
        }catch(error) {
            this.setState({
                loading: false
            });
            if(error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }
onToggled = (value)=>{
this.setState({...this.state,toggled:value})
}
onPainpointsSave = (e)=>{
    if(this.state.projectName == "" || typeof this.state.projectName === 'undefined' || 
    this.state.projectName === null){
       let projectName = this.state.currentVersionData.ProjectName;
// alert(projectName)
        this.setState(prevState=>{
            let obj = Object.assign({},prevState);
            obj.projectName = projectName
            return obj
        })
        let InputJson = {
      
            "IndustryLeaderID" : 0,
            "IndustryLeaderName":0,
            "ProjectID":this.state.projectId,
            "ProjectName"  :projectName,
            "UseCaseName"  :"GetPainPointInitiative", 
            "ProjectModuleName":"FPM",
            "RunStatus"    :1,
            "ComparisionProjectId":0,
            "ComparisionProjectName" :"",
       "ComparisionProjectModuleName" :""
          
        }
        this.props.saveClientAnalyticsUsecaseruns(InputJson)
    }
    
   else{
    let InputJson = {
      
        "IndustryLeaderID" : 0,
        "IndustryLeaderName":0,
        "ProjectID":this.state.projectId,
        "ProjectName"  :this.state.projectName,
        "UseCaseName"  :"GetPainPointInitiative", 
        "ProjectModuleName":"FPM",
        "RunStatus"    :1,
        "ComparisionProjectId":0,
        "ComparisionProjectName" :"",
   "ComparisionProjectModuleName" :""
      
    }
    this.props.saveClientAnalyticsUsecaseruns(InputJson)
   }
    

}
onViewPainPoint = (e)=>{
    if(this.state.projectName == "" || typeof this.state.projectName === 'undefined' || 
    this.state.projectName === null){
       let projectName = this.state.currentVersionData.ProjectName;
       this.props.history.push(`/painpoint-results/${this.state.projectId}/${projectName}`)

    }
    else{
        this.props.history.push(`/painpoint-results/${this.state.projectId}/${this.state.projectName}`)

    }
}
    render() {

        console.log("Capa ===>" , this.state)

        // console.log(this.state.readOnly)
        return (
            [
            <DashboardHeader key="dashboard-header"></DashboardHeader>,
            <div id="wrapper" key="body-wrapper">
                <DashboardSidebar></DashboardSidebar>
                <Loader loading={this.state.loading}/>
                <a style={{display:'none'}} id="showSuccess" href="#requestPopup" className="data-btn"  data-toggle="modal">Success</a>
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
                                {<img src={require('./../../common/images/diva-icon.png')} className="logo-img" alt="Logo" />}
                                <a className="btn powered p-0" href="#">
                                    <i className="icon-graph"></i> &nbsp;
                                <i>Powered by Amploglobal</i>
                                </a>
                            </li>
                        </ol>
                        <div className="d-flex">
                            <div className="container-fluid container-dashboard container-capability" style={{ width: "100% !important",
                                 overflowX: "scroll"}}  >
                                 <CapabilityWrapper> 
                                     <CapabilityHeader 
                                     isEditableProcess={this.state.isEditableProcess}
                                     isEdiableProcessToggle={this.isEdiableProcessToggle}
                                     handleRemoveSideNameProject={this.handleRemoveSideNameProject}
                                     handleLinkProjectName={this.handleLinkProjectName} handlePorjectName={this.handlePorjectName} handleScoreDetails={this.handleScoreDetails} toggler = {this.onToggled} currentVersionData={this.state.currentVersionData} latestversionVal={this.state.latestversionVal} loadRefreshProject={this.loadRefreshProject} changeReadonly={this.changeReadonly} readOnly={this.state.readOnly} versionVal ={this.state.versionVal} versionData={this.state.versionData} handleVersionChange={this.handleVersionChange} defaultVersion={this.state.defaultVersion} processData={this.state.processData} projectName={this.state.projectName} projectId={this.state.projectId} handleSearchItem={this.handleSearchItem} handleSearchChange={this.handleSearchChange} toggleCapabilityState={this.handleCapabilityState.bind(this)} capabilityState={this.state.capabilityState} handleProjectChange={this.handleProjectChange} initializeProject={this.initializeProject} />
                                    <div>
                                         {Object.keys(this.state.processData).length > 0 ? (this.state.capabilityState == 'progress' ? <CapabilityScores scores={this.props.scores} /> : <CapabilityRatings />) : ""}
                                      
                                        <FunctionGrid 
                                        templateId={this.state.templateId}
                                        isEditableProcess={this.state.isEditableProcess}
                                       
                                        modelingMode={this.state.modelingMode} defaultVersion={this.state.defaultVersion} capabilityState={this.state.capabilityState} searchResults={this.state.searchResults} searchStr={this.state.searchStr} onDrop={this.onDrop.bind(this)} processData={this.state.processData} projectName={this.state.projectName} projectId={this.state.projectId} functions={this.state.functions} handleGridDragStart={this.handleGridDragStart.bind(this)} phases={this.state.phases}/>
                                        {this.state.toggled === true?(<div style={{float:'right'}} className="buttonResult modal-footer"><button style={{backgroundColor:"#0c33a5",padding:7}} onClick={this.onPainpointsSave} type="button" className="btn btn btn-primary">{this.state.buttonText}</button>
                                        <button style={{backgroundColor:"#0c33a5",padding:7}} onClick={this.onViewPainPoint} type="button" className="btn btn btn-primary">View Painpoint Initiative</button>
                                        </div>):""}
                                    </div>
                                      {/* Success Popup */}
                                        <div class="modal" id="requestPopup" tabindex="-1" role="dialog">

                                        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                                            <div class="modal-content">
                                            <div class="modal-header border-0">
                                                <a class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true"><img src={require("./../../common/images/close-icon.png")} alt=""/></span>
                                                </a>
                                            </div>
                                            <div class="modal-body text-center px-5 pb-5 pt-0">
                                                <div class="mb-4"><i class="fas fa-check-circle"></i></div>
                                        <h2>Your request is received!</h2>
                                                <p class="mb-5 mt-4" style={{textAlign:"center",alignItems:"center",justifyContent:"center"}}>Painpoints Initiative request submitted successfully</p>
                                            </div>
                                            
                                            </div>
                                        </div>
                                        </div>
                                   {/* Success Popup Ends */}
                                </CapabilityWrapper>
                            </div>

                            <CapabilityAside score={this.state.scoreDetails} 
                            projectName={this.state.projectLinkName}
                            currentSelectProject={this.state.currentVersionData} projectId={this.state.projectId} processData={this.state.processData} onDragStart={this.onDragStart.bind(this)} handleAsideDrop={this.handleAsideDrop.bind(this)} modelingMode={this.state.modelingMode} processes={this.state.processes} addActivity={this.addActivity.bind(this)} readOnly={this.state.readOnly} addProcess={this.addProcess.bind(this)} handleRemoveProcess={this.handleRemoveProcess.bind(this)} />
                            <a href='#' ref={rightBarBtn => this.rightBarBtn = rightBarBtn} className='toggleRightBar' id='showRightBar'><i className='fa fa-angle-left'></i></a>
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
    projects: PropTypes.array,
    toggleCapabilityState: PropTypes.func,
    fetchProcessData: PropTypes.func.isRequired,
    processData: PropTypes.object.isRequired,
    fetchHeatmapData: PropTypes.func,
    fetchActivityBank: PropTypes.func.isRequired,
    processes: PropTypes.object.isRequired,
    fetchFunctions: PropTypes.func.isRequired,
    copyProjectData: PropTypes.func.isRequired,
    functions: PropTypes.array.isRequired,
    fetchPhases: PropTypes.func.isRequired,
    phases: PropTypes.array.isRequired,
    fetchScores: PropTypes.func.isRequired,
    scores: PropTypes.array.isRequired,
    makeloadingTrue: PropTypes.func.isRequired,
    removeProcess: PropTypes.func,
    CLientAnalyticsUsecaseData:PropTypes.object
}

const mapStateToProps = state => ({
    processData: state.capability.processData,
    processes: state.capability.processes,
    functions: state.capability.functions,
    phases: state.capability.phases,
    scores: state.capability.scores,
    activity: state.capability.activity,
    activityLocation: state.capability.activityLocation,
    loadingstatus: state.capability.loadingstatus,
    copySuccess: state.capability.copySuccess,
    CLientAnalyticsUsecaseData:state.benchmarkingData.setCLientAnalyticsUsecaseData,
    selectedCapabilityProject:state.benchmarkingData.selectedCapabilityProject
});
export default DragDropContext(connect(mapStateToProps, { resetProject,restoreUseCaseState,makeloadingTrue, copyProjectData, fetchFunctions, fetchPhases, fetchProcessData, fetchHeatmapData, fetchActivityBank, fetchScores, removeProcess, saveClientAnalyticsUsecaseruns,getClientAnalyticsUsecaserunsDetails })(Capability));