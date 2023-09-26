import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import {Prompt} from 'react-router-dom';
import _ from 'underscore';
import $ from "jquery";
import swal from "sweetalert"; 
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import ModalPopup from '../common/ModalPopup';
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import { CapabilityModelingWrapper } from './Styling/CapabilityModeling';
import { convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { fetchCustomScoringMechanisms, fetchScoringMechanisms, fetchProcessData, fetchConnectedProcesses, updateScoringMechanism, saveDecompositionData, fetchHeatmapProcessData, startLoader, stopLoader } from '../../actions/capabilityModelingActions';
import {canScoreCheckCausal,getCausalDataAndScore} from '../../actions/capabilityActions';
import OrderExecution  from './OrderExecution';
import DisplayScore from './DisplayScore';
import Processes  from './Processes';
import CapabilityModelingPopup from './capabilityModellingPopup';
import ScoringMechanisms  from './ScoringMechanisms';
import SidebarJs from '../../common/js/sidebarAnimation';
import Details  from './Details';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import {errorAlert, responseMessage} from '../../utils/alert';
import CapabilityRelationModal  from '../Admin/CapabilityModeling/CapabilityRelationModal';
import axios from 'axios';
const config = require('../../config');
class CapabilityModeling extends Component {
    constructor (props){
        super (props);
        this.state = {
            processes: [],
            mechanisms: [],
            scores:[],
            parentId:"",
            selectedCol: "",
            projectId: this.props.match.params.projectId,
            processId: this.props.match.params.processId,
            functionId: this.props.match.params.functionId,
            phaseId: this.props.match.params.phaseId,
            modelingMode:this.props.match.params.modelingMode,
            customMechanisms:[],
            disabledButton:1,
            saveDecomposition:{},
            loading:true,
            isBlocking: false,
            saveData: false,
            viewLock: 0,
            popUpSelectedProcess : {},
            descriptionState: EditorState.createEmpty(),
            commentsState : EditorState.createEmpty(),
            painpointsState : [],
            selectedPainpointIndex : null,
            parent : {},
            updateProcesses : true,
            version:'',
            incompletePopupOpen : false,
            versionNo : "",
            versionReason : "",
            relationModal:false,
            isMounted : false,
            priorityweightage:[]
        };
        this.sidebarAnimation=new SidebarJs();   
             
    }


    
    _beforeunload(e) {
        if (this.state.isBlocking) {
          e.preventDefault();
          e.returnValue = true;
        }
    }

    ondescriptionState = (descriptionState) => {
        this.setState({
            descriptionState,
            isBlocking: true
        });
    };
    oncommentsState = (commentsState) => {
        this.setState({
            commentsState,
            isBlocking: true
        });
    };
    onPainPointChange = (painPointState, Ind, type) => {
        let painPoState = [...this.state.painpointsState];
        switch(type){
            case "title" :
                painPoState[Ind].paintpoint_title = painPointState;
            break;
            case "editor" :
                painPoState[Ind].paintpoint_description = painPointState;
            break;
        }
        this.setState({
            painpointsState : painPoState,
            isBlocking: true
        })
    }
    addPainPointHandler = () => {
        let painPoState = [...this.state.painpointsState];
        painPoState.push({
            action: "add",
            id: "",
            paintpoint_title : "",
            paintpoint_description : EditorState.createEmpty()
        });
        // console.log(painPoState)
        this.setState({
            painpointsState : painPoState,
            isBlocking: true
        })
    }

    selectPainpointForDelete(ind){
        this.setState({
            selectedPainpointIndex : ind
        })
    }


    selectedProcessChange(process){
        if(this.state.popUpSelectedProcess !== process){
            this.setState({
                popUpSelectedProcess : process
            },()=>{
                this.setState({
                    descriptionState: this.state.popUpSelectedProcess.description?(typeof(this.state.popUpSelectedProcess.description)==="object")?EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft("<p></p>").contentBlocks)):EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(this.state.popUpSelectedProcess.description).contentBlocks)):EditorState.createEmpty(),
                    commentsState : this.state.popUpSelectedProcess.comment?(typeof(this.state.popUpSelectedProcess.comment)==="object")?EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft("<p></p>").contentBlocks)):EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(this.state.popUpSelectedProcess.comment).contentBlocks)):EditorState.createEmpty(),
                    painpointsState : (this.state.popUpSelectedProcess.paintpoints != "" && this.state.popUpSelectedProcess.paintpoints != null)?this.state.popUpSelectedProcess.paintpoints.map((painpoint)=>{
                        return{
                            id:painpoint.id,
                            paintpoint_title : painpoint.paintpoint_title,
                            paintpoint_description : (typeof(painpoint.paintpoint_description)==="object")?EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft("<p></p>").contentBlocks)):EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(painpoint.paintpoint_description).contentBlocks))
                        }
                    }):[{
                        action: "add",
                        id: "",
                        paintpoint_title : "",
                        paintpoint_description : EditorState.createEmpty()
                    }]
                },()=>{
                    // console.log(this.state.painpointsState)
                })
            })
        }
    }
    
    savePopUpData=(process, description, comment, painpoints)=>{
        let curProcess = [...this.state.processes]
        let { ProcessLevel } = process;
        let pLv1Ind = null;
        let pLv2Ind = null;
        let pLv3Ind = null;
        let pLv4Ind = null;
        let pLv5Ind = null;
        switch(ProcessLevel){
            case "1" :
                pLv1Ind = curProcess.map((lv1)=>lv1.ProcessLevel1ID).indexOf(process.ProcessLevel1ID);
                curProcess[pLv1Ind] = {
                    ...curProcess[pLv1Ind],
                    description : draftToHtml(convertToRaw(description.getCurrentContent())),
                    description_raw : draftToHtml(convertToRaw(description.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                    comment : draftToHtml(convertToRaw(comment.getCurrentContent())),
                    comment_raw : draftToHtml(convertToRaw(comment.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                    paintpoints : painpoints.map((painpoint)=>{
                        return{
                            id:painpoint.id,
                            action : painpoint.action?painpoint.action:"update",
                            paintpoint_title : painpoint.paintpoint_title,
                            paintpoint_description : draftToHtml(convertToRaw(painpoint.paintpoint_description.getCurrentContent())),
                            paintpoint_description_raw : draftToHtml(convertToRaw(painpoint.paintpoint_description.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                        }
                    })
                }
                // console.log(curProcess);
            break;
            case "2" : 
                pLv1Ind = curProcess.map((lv1)=>lv1.ProcessLevel1ID).indexOf(process.ProcessLevel1ID);
                pLv2Ind = curProcess[pLv1Ind].child.map((lv2)=>lv2.ProcessLevel2ID).indexOf(process.ProcessLevel2ID);
                curProcess[pLv1Ind].child[pLv2Ind] = {
                    ...curProcess[pLv1Ind].child[pLv2Ind],
                    description : draftToHtml(convertToRaw(description.getCurrentContent())),
                    description_raw : draftToHtml(convertToRaw(description.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                    comment : draftToHtml(convertToRaw(comment.getCurrentContent())),
                    comment_raw : draftToHtml(convertToRaw(comment.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                    paintpoints : painpoints.map((painpoint)=>{
                        return{
                            id:painpoint.id,
                            action : painpoint.action?painpoint.action:"update",
                            paintpoint_title : painpoint.paintpoint_title,
                            paintpoint_description : draftToHtml(convertToRaw(painpoint.paintpoint_description.getCurrentContent())),
                            paintpoint_description_raw : draftToHtml(convertToRaw(painpoint.paintpoint_description.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                        }
                    })
                }
                // console.log(curProcess);
            break;
            case "3" : 
                pLv1Ind = curProcess.map((lv1)=>lv1.ProcessLevel1ID).indexOf(process.ProcessLevel1ID);
                pLv2Ind = curProcess[pLv1Ind].child.map((lv2)=>lv2.ProcessLevel2ID).indexOf(process.ProcessLevel2ID);
                pLv3Ind = curProcess[pLv1Ind].child[pLv2Ind].child.map((lv3)=>lv3.ProcessLevel3ID).indexOf(process.ProcessLevel3ID);
                curProcess[pLv1Ind].child[pLv2Ind].child[pLv3Ind] = {
                    ...curProcess[pLv1Ind].child[pLv2Ind].child[pLv3Ind],
                    description : draftToHtml(convertToRaw(description.getCurrentContent())),
                    description_raw : draftToHtml(convertToRaw(description.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                    comment : draftToHtml(convertToRaw(comment.getCurrentContent())),
                    comment_raw : draftToHtml(convertToRaw(comment.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                    paintpoints : painpoints.map((painpoint)=>{
                        return{
                            id:painpoint.id,
                            action : painpoint.action?painpoint.action:"update",
                            paintpoint_title : painpoint.paintpoint_title,
                            paintpoint_description : draftToHtml(convertToRaw(painpoint.paintpoint_description.getCurrentContent())),
                            paintpoint_description_raw : draftToHtml(convertToRaw(painpoint.paintpoint_description.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                        }
                    })
                }
                // console.log(curProcess);
            break;
            case "4" :
                pLv1Ind = curProcess.map((lv1)=>lv1.ProcessLevel1ID).indexOf(process.ProcessLevel1ID);
                pLv2Ind = curProcess[pLv1Ind].child.map((lv2)=>lv2.ProcessLevel2ID).indexOf(process.ProcessLevel2ID);
                pLv3Ind = curProcess[pLv1Ind].child[pLv2Ind].child.map((lv3)=>lv3.ProcessLevel3ID).indexOf(process.ProcessLevel3ID);
                pLv4Ind = curProcess[pLv1Ind].child[pLv2Ind].child[pLv3Ind].child.map((lv4)=>lv4.ProcessLevel4ID).indexOf(process.ProcessLevel4ID);
                curProcess[pLv1Ind].child[pLv2Ind].child[pLv3Ind].child[pLv4Ind] = {
                    ...curProcess[pLv1Ind].child[pLv2Ind].child[pLv3Ind].child[pLv4Ind],
                    description : draftToHtml(convertToRaw(description.getCurrentContent())),
                    description_raw : draftToHtml(convertToRaw(description.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                    comment : draftToHtml(convertToRaw(comment.getCurrentContent())),
                    comment_raw : draftToHtml(convertToRaw(comment.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                    paintpoints : painpoints.map((painpoint)=>{
                        return{
                            id:painpoint.id,
                            action : painpoint.action?painpoint.action:"update",
                            paintpoint_title : painpoint.paintpoint_title,
                            paintpoint_description : draftToHtml(convertToRaw(painpoint.paintpoint_description.getCurrentContent())),
                            paintpoint_description_raw : draftToHtml(convertToRaw(painpoint.paintpoint_description.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                        }
                    })
                }
                // console.log(curProcess);
            break;
            case "5" : 
                // console.log(curProcess)
                // console.log(process,"currentProcess")
                pLv1Ind = curProcess.map((lv1)=>lv1.ProcessLevel1ID).indexOf(process.ProcessLevel1ID);
                // console.log(pLv1Ind)
                pLv2Ind = curProcess[pLv1Ind].child.map((lv2)=>lv2.ProcessLevel2ID).indexOf(process.ProcessLevel2ID);
                pLv3Ind = curProcess[pLv1Ind].child[pLv2Ind].child.map((lv3)=>lv3.ProcessLevel3ID).indexOf(process.ProcessLevel3ID);
                pLv4Ind = curProcess[pLv1Ind].child[pLv2Ind].child[pLv3Ind].child.map((lv4)=>lv4.ProcessLevel4ID).indexOf(process.ProcessLevel4ID);
                pLv5Ind = curProcess[pLv1Ind].child[pLv2Ind].child[pLv3Ind].child[pLv4Ind].child.map((lv5)=>lv5.ProcessLevel5ID).indexOf(process.ProcessLevel5ID);
                curProcess[pLv1Ind].child[pLv2Ind].child[pLv3Ind].child[pLv4Ind].child[pLv5Ind] = {
                    ...curProcess[pLv1Ind].child[pLv2Ind].child[pLv3Ind].child[pLv4Ind].child[pLv5Ind],
                    description : draftToHtml(convertToRaw(description.getCurrentContent())),
                    description_raw : draftToHtml(convertToRaw(description.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                    comment : draftToHtml(convertToRaw(comment.getCurrentContent())),
                    comment_raw : draftToHtml(convertToRaw(comment.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                    paintpoints : painpoints.map((painpoint)=>{
                        return{
                            id:painpoint.id,
                            action : painpoint.action?painpoint.action:"update",
                            paintpoint_title : painpoint.paintpoint_title,
                            paintpoint_description : draftToHtml(convertToRaw(painpoint.paintpoint_description.getCurrentContent())),
                            paintpoint_description_raw : draftToHtml(convertToRaw(painpoint.paintpoint_description.getCurrentContent())).replace( /(<([^>]+)>)/ig, ''),
                        }
                    })
                }
                // console.log(curProcess);
            break;
        }
        this.setState({
            processes : curProcess
        },()=>{
            // console.log(this.state.processes,"stateChanged")
        })
    }

    deletePopupButton(type,index){
        switch(type){
            case "description":
                this.setState({
                    descriptionState: EditorState.createEmpty(),
                    isBlocking: true
                })
            break;
            case "painpoints":
                let painpoint = [...this.state.painpointsState]
                if(index !== null){
                    if(painpoint[index].id != ""){
                        painpoint[index].action = "delete";
                    }else {
                        painpoint.splice(index,1);
                    }
                }
                this.setState({
                    painpointsState : painpoint,
                    selectedPainpointIndex : null,
                    isBlocking: true
                })
            break;
            case "comment":
                this.setState({
                    commentsState : EditorState.createEmpty(),
                    isBlocking: true
                })
            break;
        }
    }

    componentDidMount() {
        //this.getProcessversion(); 
        setInterval(()=>{
            if(sessionStorage.getItem('refreshCapabilityModelling')!=null){
                console.log(sessionStorage.getItem('refreshCapabilityModelling'))
                sessionStorage.removeItem('refreshCapabilityModelling');
                this.getAllVersionAndProcessData();
            }
        },1000)
        console.log('calling causal')
        this.props.canScoreCheckCausal({projectId:this.state.projectId,processId:this.state.processId});
        this.props.getCausalDataAndScore({projectId:this.state.projectId,processId:this.state.processId});
        this.getAllVersionAndProcessData();
        this.PriorityWeightage();

    }
    getAllVersionAndProcessData = () =>{
        let selfObj = this;     
        axios.get(config.laravelBaseUrl+'getDecompositionProjectVersion/'+this.props.match.params.projectId+'/'+this.props.match.params.processId+'/'+this.props.match.params.projectVersionId,{
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        }).then(function(response){
            // console.log(response.data.data,"version") 
            let  versionId = response.data.data[0]? response.data.data[0].VersionId : 0 ;
            let  Version = response.data.data[0]? response.data.data[0].Version : 0 ;
            selfObj.setState({version:versionId,versionNumber:Version,latestVersion : Version,versionsArr : response.data.data,updateProcesses:true})
            window.addEventListener('scroll', selfObj.myFunction, true);
            window.addEventListener('beforeunload', selfObj._beforeunload.bind(selfObj));
            try{
                let params = {
                    projectId: selfObj.state.projectId,
                    processId: selfObj.state.processId,
                    functionId: selfObj.state.functionId,
                    phaseId: selfObj.state.phaseId,
                    version: selfObj.state.version,
                    ProjectVersionId : selfObj.props.match.params.projectVersionId
                }
            
                if(selfObj.state.modelingMode == 0) {
                    selfObj.setState({
                        updateProcesses : true
                    },selfObj.props.fetchProcessData(params))
                }else{
                    selfObj.setState({
                        updateProcesses : true
                    },selfObj.props.fetchHeatmapProcessData(params))
                }
                selfObj.setState({
                    modelingMode:selfObj.state.modelingMode
                })
                
                selfObj.props.fetchConnectedProcesses(params);
                selfObj.props.fetchScoringMechanisms(params);
                selfObj.props.fetchCustomScoringMechanisms(params);
                
                //this.apiCalls(params);

                selfObj.sidebarAnimation.toggle();
                
            }catch(error) {
                selfObj.setState({
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

    PriorityWeightage=()=>{
        console.log("insider Call",this.props)
            this.state.isMounted=true;
            
            if (this.state.isMounted) {
            const headers = {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
              }
               axios.get(config.laravelBaseUrl+'GetWeightageforPriority/'+this.state.projectId+'/'+this.state.processId,{
                headers: headers
              })
            .then(res => {
                console.log("PriorityWeightage", res.data);
                if(res.data.message !="data not found"){
                this.setState({
                    priorityweightage: res.data.data,
                    //prweightage: true
                  });
                }
                // setTimeout(function(){
                    //     return axios.post(config.laravelBaseUrl+ 'unlinkFile', fileArray, {
                        //         headers: headers
                        //     })
                        // },10000);
                    }); 
                }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.myFunction);
        window.removeEventListener('beforeunload', this._beforeunload.bind(this));
        this.state.isMounted = false;

    }  

    apiCalls(){

        let params = {
            projectId: this.state.projectId,
            processId: this.state.processId,
            functionId: this.state.functionId,
            phaseId: this.state.phaseId,
            version : this.state.version
        }

        this.props.fetchConnectedProcesses(params);
        this.props.fetchScoringMechanisms(params);
        this.props.fetchCustomScoringMechanisms(params);
    }


    // myFunction=()=>{
    //     if($('.capability-responsive-section')!= undefined && $('#theadId').offset() != undefined && $('#table-container').offset() !=undefined && $('#theadId1').offset() != undefined ){
    //     var left = $('.capability-responsive-section').scrollLeft();
    //     // var getWidth = $('#theadId').offset().left - $('#table-container').offset().left;
    //     var getWidth1 = $('#theadId1').offset().left - $('#theadId').offset().left;
    //     //console.log(getWidth, getWidth1, left);
        
    //     $('.capability-responsive-section').css('z-index',0);
    //     // $('#table-container').css('left', 249-left);
    //     // $('#theadId').css('left', (249+getWidth)-left);
    //     // $('#theadId1').css('left', (249+getWidth+getWidth1)-left);
    // }
    // }
    componentDidUpdate(prevProps, prevState) {
        try{
            if(this.state.processId !== this.props.match.params.processId) {
                this.setState({
                    processId: this.props.match.params.processId
                }, function() {
                    let params = {
                        projectId: this.state.projectId,
                        processId: this.state.processId,
                        functionId: this.state.functionId,
                        phaseId: this.state.phaseId,
                        version : this.state.version,
                        ProjectVersionId : this.props.match.params.projectVersionId
                    }
                    if(this.state.modelingMode == 0) {
                        this.setState({
                            // processes : []
                            updateProcesses : true
                        },()=>{
                            this.props.fetchProcessData(params);
                        })
                    }else{
                        this.setState({
                            // processes : []
                            updateProcesses : true
                        },()=>{
                            this.props.fetchHeatmapProcessData(params);
                        })
                    }
                    
                    this.props.fetchConnectedProcesses(params);
                    this.props.fetchScoringMechanisms(params);
                    this.props.fetchCustomScoringMechanisms(params);
                })
            }
            if(Object.keys(this.props.mechanism).length > 0 && prevProps.mechanism !== this.props.mechanism){
                let params = {
                projectId: this.state.projectId,
                processId: this.state.processId,
                functionId: this.state.functionId,
                phaseId: this.state.phaseId,
                version : this.state.version
                }
                this.props.fetchCustomScoringMechanisms(params);
                this.props.fetchScoringMechanisms(params);
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
    componentWillReceiveProps(nextProps) {
        if(nextProps.customMechanisms !== this.state.customMechanisms){
        if(Object.keys(nextProps.customMechanisms).length > 0) {
            this.setState({
                customMechanisms: nextProps.customMechanisms.data,
                //loading:false
            })
        }

        if(nextProps.mechanisms.length > 0) {
            this.setState({
                mechanisms: nextProps.mechanisms
            })
            
        }
        if(Object.keys(nextProps.mechanism).length > 0 && nextProps.mechanism !== this.props.mechanism){
            //let findMechanismIndex = _.findIndex(this.state.mechanisms, {DecompositionScoreCriteriaID: nextProps.mechanism.DecompositionScoreCriteriaID});
            //if(findMechanismIndex !== -1) {
            let mechanisms = this.state.mechanisms;
            let mechIndex = _.findIndex(mechanisms, {DecompositionScoreCriteriaID: nextProps.mechanism.DecompositionScoreCriteriaID});
            if(mechIndex === -1) {
                mechanisms.push(nextProps.mechanism);
            }else{
                mechanisms[mechIndex].ScoreCriteriaTitle = nextProps.mechanism.ScoreCriteriaTitle;
            }
            this.setState({
                mechanisms: mechanisms,
                isBlocking: true
            })
        }
        if(Object.keys(nextProps.processes).length > 0) {
            let disabledButton=""
            let tempObject=JSON.parse(JSON.stringify(nextProps.processes));
            let canScore=nextProps.CanScore;
            let finalScore=nextProps.getScoreAndDataCausal && nextProps.getScoreAndDataCausal.Details && nextProps.getScoreAndDataCausal.Details.filter((item)=>item.IsDependent=='1').length>0?nextProps.getScoreAndDataCausal.Details.filter((item)=>item.IsDependent=='1')[0].FinalScore:0;
            if(canScore && canScore=='1' && Number(finalScore)>0)
            {
                tempObject.processes.map((item,index)=>{
                    if(item.ProcessLevel=='1' && typeof(item.TotalAvgScore)!='undefined')
                    tempObject.processes[index].TotalAvgScore=Number(finalScore);
                });
            }
            if(tempObject.processes[0].status !== "1"){
                disabledButton = 1
            }
            else{
                disabledButton = 0
            }
            if(tempObject.processes[0].status !== "3"){
                $('.processes-section').css('pointer-events', "auto");
            }else{
                $('.processes-section').css('pointer-events', "none");
            }
            // console.log(nextProps.processes.processes,"inWillRecieve")
            this.setState({
                processes: (this.state.updateProcesses === true)?tempObject.processes:this.state.processes,
                scores: tempObject.scores,
                loading: false,
                disabledButton:disabledButton
            })
        }
       
        //if( Object.keys(nextProps.saveDecomposition).length > 0 && nextProps.saveDecomposition.success==true){
        if(nextProps.saveDecomposition!=this.props.saveDecomposition){
            let params = {
                projectId: this.state.projectId,
                processId: this.state.processId,
                functionId: this.state.functionId,
                phaseId: this.state.phaseId,
                version : this.state.version,
                ProjectVersionId : this.props.match.params.projectVersionId
            }
            this.setState({
                loading:false
            })
            if(this.state.modelingMode == 0) {
                this.setState({
                    // processes : []
                    updateProcesses : true
                },()=>{
                    this.props.fetchProcessData(params); 
                })
            }else{
                this.setState({
                    // processes : []
                    updateProcesses : true
                },()=>{
                    this.props.fetchHeatmapProcessData(params);
                })
            }
            responseMessage("success", nextProps.saveDecomposition.message, "");
            this.forceUpdate();
        }
        }
    }
    
    handleAddProcess = (processCol) => {
        processCol = processCol.slice(-1);
        if (this.state.parentId !== ""){
            for(let p in this.state.processes) {
                if(this.state.processes[p].id === this.state.parentId && this.state.processes[p].ProcessLevel == (processCol-1)) {
                    let processes = this.state.processes;
                    if(!processes[p].child) {
                        processes[p].child = [];
                    }
                    let ProcessLevel1ID = this.state.parent.ProcessLevel1ID?this.state.parent.ProcessLevel1ID:null;
                    let ProcessLevel2ID = (processCol == 2)?"p"+(processes[p].child.length+1):this.state.parent.ProcessLevel2ID?this.state.parent.ProcessLevel2ID:null;
                    let ProcessLevel3ID = (processCol == 3)?"p"+(processes[p].child.length+1):this.state.parent.ProcessLevel3ID?this.state.parent.ProcessLevel3ID:null;
                    let ProcessLevel4ID = (processCol == 4)?"p"+(processes[p].child.length+1):this.state.parent.ProcessLevel4ID?this.state.parent.ProcessLevel4ID:null;
                    let ProcessLevel5ID = (processCol == 5)?"p"+(processes[p].child.length+1):this.state.parent.ProcessLevel5ID?this.state.parent.ProcessLevel5ID:null;
                    let sequenceNum = '1.'+(processes[p].child.length+1);
                    processes[p].child.push({
                        "id": "p"+(processes[p].child.length+1),
                        "number": sequenceNum,
                        "text": "New Item",
                        "owner": "",
                        "country": "",
                        "priority": "2",
                        "action": "add",
                        "ProcessLevel":processCol,
                        ProcessLevel1ID,
                        ProcessLevel2ID,
                        ProcessLevel3ID,
                        ProcessLevel4ID,
                        ProcessLevel5ID,
                        "child": []
                    });

                    this.setState({
                        processes: processes
                    })
                    break;
                }else{
                   
                    for(let i in this.state.processes[p].child) {
                        if(this.state.processes[p].child[i].id === this.state.parentId && this.state.processes[p].child[i].ProcessLevel == (processCol-1)) {
                            let processes = this.state.processes;
                            if(!processes[p].child[i].child) {
                                processes[p].child[i].child = [];
                            }
                           
                            //let sequenceNum = '1.1.'+(processes[p].child[i].child.length+1);
                            let sequenceNum = processes[p].child[i].number+'.'+(processes[p].child[i].child.length+1);
                            let ProcessLevel1ID = this.state.parent.ProcessLevel1ID?this.state.parent.ProcessLevel1ID:null;
                            let ProcessLevel2ID = (processCol == 2)?"i"+sequenceNum:this.state.parent.ProcessLevel2ID?this.state.parent.ProcessLevel2ID:null;
                            let ProcessLevel3ID = (processCol == 3)?"i"+sequenceNum:this.state.parent.ProcessLevel3ID?this.state.parent.ProcessLevel3ID:null;
                            let ProcessLevel4ID = (processCol == 4)?"i"+sequenceNum:this.state.parent.ProcessLevel4ID?this.state.parent.ProcessLevel4ID:null;
                            let ProcessLevel5ID = (processCol == 5)?"i"+sequenceNum:this.state.parent.ProcessLevel5ID?this.state.parent.ProcessLevel5ID:null;
                            processes[p].child[i].child.push({
                                //"id": "i"+(processes[p].child[i].child.length+1),
                                "id":"i"+sequenceNum,
                                "number": sequenceNum,
                                "text": "New Item",
                                "owner": "",
                                "country": "",
                                "priority": "2",
                                "action": "add",
                                "ProcessLevel":processCol,
                                ProcessLevel1ID,
                                ProcessLevel2ID,
                                ProcessLevel3ID,
                                ProcessLevel4ID,
                                ProcessLevel5ID,
                                "child": []
                            });

                            this.setState({
                                processes: processes
                            })
                            break;
                        }else{
                            for(let j in this.state.processes[p].child[i].child) {
                                if(this.state.processes[p].child[i].child[j].id === this.state.parentId && this.state.processes[p].child[i].child[j].ProcessLevel == (processCol-1)) {
                                    let processes = this.state.processes;
                                    if(!processes[p].child[i].child[j].child) {
                                        processes[p].child[i].child[j].child = [];
                                    }
                                   
                                    //let sequenceNumL3 = '1.1.1.'+(processes[p].child[i].child[j].child.length+1);
                                    let sequenceNumL3 = processes[p].child[i].child[j].number+'.'+(processes[p].child[i].child[j].child.length+1);
                                    let ProcessLevel1ID = this.state.parent.ProcessLevel1ID?this.state.parent.ProcessLevel1ID:null;
                                    let ProcessLevel2ID = (processCol == 2)?"j"+sequenceNumL3:this.state.parent.ProcessLevel2ID?this.state.parent.ProcessLevel2ID:null;
                                    let ProcessLevel3ID = (processCol == 3)?"j"+sequenceNumL3:this.state.parent.ProcessLevel3ID?this.state.parent.ProcessLevel3ID:null;
                                    let ProcessLevel4ID = (processCol == 4)?"j"+sequenceNumL3:this.state.parent.ProcessLevel4ID?this.state.parent.ProcessLevel4ID:null;
                                    let ProcessLevel5ID = (processCol == 5)?"j"+sequenceNumL3:this.state.parent.ProcessLevel5ID?this.state.parent.ProcessLevel5ID:null;

                                    processes[p].child[i].child[j].child.push({
                                        //"id": "j"+(sequenceNumL3+1),
                                        "id": "j"+sequenceNumL3,
                                        "number": sequenceNumL3,
                                        "text": "New Item",
                                        "owner": "",
                                        "country": "",
                                        "priority": "2",
                                        "action": "add",
                                        "ProcessLevel":processCol,
                                        ProcessLevel1ID,
                                        ProcessLevel2ID,
                                        ProcessLevel3ID,
                                        ProcessLevel4ID,
                                        ProcessLevel5ID,
                                        "child": []
                                    });
                                    this.setState({
                                        processes: processes
                                    })
                                    break;
                                }else{
                                    for(let k in this.state.processes[p].child[i].child[j].child) {
                                        if(this.state.processes[p].child[i].child[j].child[k].id === this.state.parentId && this.state.processes[p].child[i].child[j].child[k].ProcessLevel == (processCol-1)) {
                                            let processes = this.state.processes;
                                            if(!processes[p].child[i].child[j].child[k].child) {
                                                processes[p].child[i].child[j].child[k].child = [];
                                            }
                                           
                                            //console.log(processes[p].child[i].child[j].child[k])
                                            //let sequenceNumL4 = '1.1.1.1.'+(processes[p].child[i].child[j].child[k].child.length+1);
                                            let sequenceNumL4 = processes[p].child[i].child[j].child[k].number+'.'+(processes[p].child[i].child[j].child[k].child.length+1);
                                            let ProcessLevel1ID = this.state.parent.ProcessLevel1ID?this.state.parent.ProcessLevel1ID:null;
                                            let ProcessLevel2ID = (processCol == 2)?"k"+sequenceNumL4:this.state.parent.ProcessLevel2ID?this.state.parent.ProcessLevel2ID:null;
                                            let ProcessLevel3ID = (processCol == 3)?"k"+sequenceNumL4:this.state.parent.ProcessLevel3ID?this.state.parent.ProcessLevel3ID:null;
                                            let ProcessLevel4ID = (processCol == 4)?"k"+sequenceNumL4:this.state.parent.ProcessLevel4ID?this.state.parent.ProcessLevel4ID:null;
                                            let ProcessLevel5ID = (processCol == 5)?"k"+sequenceNumL4:this.state.parent.ProcessLevel5ID?this.state.parent.ProcessLevel5ID:null;

                                            processes[p].child[i].child[j].child[k].child.push({
                                                //"id": "k"+(processes[p].child[i].child[j].child[k].child.length+1),
                                                "id":"k"+sequenceNumL4,
                                                "number": sequenceNumL4,
                                                "text": "New Item",
                                                "owner": "",
                                                "country": "",
                                                "priority": "2",
                                                "action": "add",
                                                "ProcessLevel":processCol,
                                                ProcessLevel1ID,
                                                ProcessLevel2ID,
                                                ProcessLevel3ID,
                                                ProcessLevel4ID,
                                                ProcessLevel5ID,
                                                "child": []
                                            });
                                            
                                            this.setState({
                                                processes: processes
                                            })
                                            break;
                                        }
                                    }
                                    
                                       
                                }
                            }
                        }
                    }
                }
            }
            
            for(let p in this.state.processes) {
                let processes = this.state.processes;
               
                if(processes[p].hasOwnProperty("child")){
                   
                    for(let i in this.state.processes[p].child) {
                        if(!isNaN( processes[p].child[i].id) && processes[p].child[i].action!="delete" ){
                            processes[p].child[i].action = "update";
                            this.setState({
                                processes: processes
                            })
                        }
                        if(processes[p].child[i].hasOwnProperty("child")){
                            for(let j in this.state.processes[p].child[i].child) {
                                if(!isNaN( processes[p].child[i].child[j].id) && processes[p].child[i].child[j].action!="delete" ){
                                    processes[p].child[i].child[j].action = "update";
                                    this.setState({
                                        processes: processes
                                    })
                                }
                                if(processes[p].child[i].child[j].hasOwnProperty("child")){
                                    for(let k in this.state.processes[p].child[i].child[j].child) {
                                        if(!isNaN( processes[p].child[i].child[j].child[k].id) && processes[p].child[i].child[j].child[k].action!="delete"){
                                            processes[p].child[i].child[j].child[k].action = "update";
                                            this.setState({
                                                processes: processes
                                            })
                                        }

                                        if(processes[p].child[i].child[j].child[k].hasOwnProperty("child")){
                                            for(let l in this.state.processes[p].child[i].child[j].child[k].child) {
                                                if(!isNaN( processes[p].child[i].child[j].child[k].child[l].id) && processes[p].child[i].child[j].child[k].child[l].action!="delete"){
                                                    processes[p].child[i].child[j].child[k].child[l].action = "update";
                                                    this.setState({
                                                        processes: processes
                                                    })
                                                }
                                            }
                                        }
                                    }
                                }
                                
                            }
                        }
                    }
                }
                
            }
           
            this.setState({
                disabledButton:0,
                isBlocking: true
            })
            //console.log( JSON.stringify( this.state.processes, null , 4));
            //console.log( processCol+' = '+ this.state.parentId );
        }else{
            responseMessage("warning", "No parent selected.", "");
        }
    }
    handleDeleteProcess() {
        let selectedCol = this.state.selectedCol;
        selectedCol = selectedCol.slice(-1);
        let scoresToDelete = [];
        let warning = false;
        for(let i in this.state.processes[0].child) {
            if(this.state.processes[0].child[i].id === this.state.parentId && this.state.processes[0].child[i].ProcessLevel == selectedCol) {
                if(this.state.processes[0].child[i].hasOwnProperty('child')){
                    if(this.state.processes[0].child[i].child.length>0){
                        for(let child3 in this.state.processes[0].child[i].child){
                            if(this.state.processes[0].child[i].child[child3].action != 'delete'){
                                warning =true;
                            }
                        }
                    }
                }
                break;
            }else{
                for(let j in this.state.processes[0].child[i].child) {
                    if(this.state.processes[0].child[i].child[j].id === this.state.parentId && this.state.processes[0].child[i].child[j].ProcessLevel == selectedCol) {
                        if(this.state.processes[0].child[i].child[j].hasOwnProperty('child')){
                            if(this.state.processes[0].child[i].child[j].child.length>0){
                                for(let child4 in this.state.processes[0].child[i].child[j].child){
                                    if(this.state.processes[0].child[i].child[j].child[child4].action != 'delete'){
                                        warning =true;
                                    }
                                }
                            }
                        }
                        break;
                    }else{
                        for(let k in this.state.processes[0].child[i].child[j].child) {
                            if(this.state.processes[0].child[i].child[j].child[k].id === this.state.parentId && this.state.processes[0].child[i].child[j].child[k].ProcessLevel == selectedCol) {
                                if(this.state.processes[0].child[i].child[j].child[k].hasOwnProperty('child')){
                                    if(this.state.processes[0].child[i].child[j].child[k].child.length>0){
                                        for(let child5 in this.state.processes[0].child[i].child[j].child[k].child){
                                            if(this.state.processes[0].child[i].child[j].child[k].child[child5].action != 'delete'){
                                                warning =true;
                                            }
                                        }
                                    }
                                }
                                break;
                            }else{
                                for(let l in this.state.processes[0].child[i].child[j].child[k].child) {
                                    if(this.state.processes[0].child[i].child[j].child[k].child[l].id === this.state.parentId && this.state.processes[0].child[i].child[j].child[k].child[l].ProcessLevel == selectedCol) {
                                        if(this.state.processes[0].child[i].child[j].child[k].child[l].hasOwnProperty('child')){
                                            if(this.state.processes[0].child[i].child[j].child[k].child[l].child.length>0){
                                                warning =true;
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        let conf = true;
        if(warning == true){
            conf = window.confirm('Deleting this process will delete all the child processes of this process. Do you want to continue ?')
        }
        if(conf == true){
            for(let i in this.state.processes[0].child){
                if(this.state.processes[0].child[i].id === this.state.parentId && this.state.processes[0].child[i].ProcessLevel == selectedCol){
                    scoresToDelete.push(this.state.processes[0].child[i].id);
                    if(this.state.processes[0].child[i].child && this.state.processes[0].child[i].child.length > 0){
                        for(let j in this.state.processes[0].child[i].child){
                            scoresToDelete.push(this.state.processes[0].child[i].child[j].id)
                            if(this.state.processes[0].child[i].child[j].child && this.state.processes[0].child[i].child[j].child.length > 0){
                                for(let k in this.state.processes[0].child[i].child[j].child){
                                    scoresToDelete.push(this.state.processes[0].child[i].child[j].child[k].id)
                                    if(this.state.processes[0].child[i].child[j].child[k].child && this.state.processes[0].child[i].child[j].child[k].child.length > 0){
                                        for(let l in this.state.processes[0].child[i].child[j].child[k].child){
                                            scoresToDelete.push(this.state.processes[0].child[i].child[j].child[k].child[l].id)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }else{
                    for(let j in this.state.processes[0].child[i].child){
                        if(this.state.processes[0].child[i].child[j].id === this.state.parentId && this.state.processes[0].child[i].child[j].ProcessLevel == selectedCol){
                            scoresToDelete.push(this.state.processes[0].child[i].child[j].id)
                            if(this.state.processes[0].child[i].child[j].child && this.state.processes[0].child[i].child[j].child.length > 0){
                                for(let k in this.state.processes[0].child[i].child[j].child){
                                    scoresToDelete.push(this.state.processes[0].child[i].child[j].child[k].id)
                                    if(this.state.processes[0].child[i].child[j].child[k].child && this.state.processes[0].child[i].child[j].child[k].child.length > 0){
                                        for(let l in this.state.processes[0].child[i].child[j].child[k].child){
                                            scoresToDelete.push(this.state.processes[0].child[i].child[j].child[k].child[l].id)
                                        }
                                    }
                                }
                            }
                        }else{
                            for(let k in this.state.processes[0].child[i].child[j].child){
                                if(this.state.processes[0].child[i].child[j].child[k].id === this.state.parentId && this.state.processes[0].child[i].child[j].child[k].ProcessLevel == selectedCol){
                                    scoresToDelete.push(this.state.processes[0].child[i].child[j].child[k].id)
                                    if(this.state.processes[0].child[i].child[j].child[k].child && this.state.processes[0].child[i].child[j].child[k].child.length > 0){
                                        for(let l in this.state.processes[0].child[i].child[j].child[k].child){
                                            scoresToDelete.push(this.state.processes[0].child[i].child[j].child[k].child[l].id)
                                        }
                                    }
                                }else{
                                    for(let l in this.state.processes[0].child[i].child[j].child[k].child){
                                        if(this.state.processes[0].child[i].child[j].child[k].child[l].id === this.state.parentId && this.state.processes[0].child[i].child[j].child[k].child[l].ProcessLevel == selectedCol){
                                            scoresToDelete.push(this.state.processes[0].child[i].child[j].child[k].child[l].id)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            let scores = [...this.state.scores];
            for(let scoreInd in scoresToDelete){
                let ind = scores.map((score)=>score.id).indexOf(scoresToDelete[scoreInd])
                if(ind != -1){
                    if(Number.isInteger(Number(scores[ind].id))){
                        scores[ind].action = "delete";
                    }else{
                        scores.splice(ind,1);
                    }
                }
            }
            this.setState({
                scores : scores
            })
            for(let i in this.state.processes[0].child) {
                if(this.state.processes[0].child[i].id === this.state.parentId && this.state.processes[0].child[i].ProcessLevel == selectedCol) {
                    let processes = this.state.processes;
                    if(Number.isInteger(Number(processes[0].child[i].id))){
                        processes[0].child[i].action = "delete";
                        if(this.state.processes[0].child[i].child && this.state.processes[0].child[i].child.length > 0){
                            for(let j in this.state.processes[0].child[i].child){
                                if(!Number.isInteger(Number(this.state.processes[0].child[i].child[j].id))){
                                    this.state.processes[0].child[i].child.splice(j,1)
                                }else{
                                    if(this.state.processes[0].child[i].child[j].child && this.state.processes[0].child[i].child[j].child.length > 0){
                                        for(let k in this.state.processes[0].child[i].child[j].child){
                                            if(!Number.isInteger(Number(this.state.processes[0].child[i].child[j].child[k].id))){
                                                this.state.processes[0].child[i].child[j].child.splice(k,1)
                                            }else{
                                                if(this.state.processes[0].child[i].child[j].child[k].child && this.state.processes[0].child[i].child[j].child[k].child.length > 0){
                                                    for(let l in this.state.processes[0].child[i].child[j].child[k].child){
                                                        if(!Number.isInteger(Number(this.state.processes[0].child[i].child[j].child[k].child[l].id))){
                                                            this.state.processes[0].child[i].child[j].child[k].child.splice(l,1)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }else{
                        processes[0].child.splice(i,1);
                    }
                    this.setState({
                        processes: processes,
                        selectedCol: ""
                    });
                    break;
                }else{
                    for(let j in this.state.processes[0].child[i].child) {
                        
                        if(this.state.processes[0].child[i].child[j].id === this.state.parentId && this.state.processes[0].child[i].child[j].ProcessLevel == selectedCol) {
                            let processes = this.state.processes;
                            if(Number.isInteger(Number(processes[0].child[i].child[j].id))){
                                processes[0].child[i].action = "update";
                                processes[0].child[i].child[j].action = "delete";
                                if(this.state.processes[0].child[i].child[j].child && this.state.processes[0].child[i].child[j].child.length > 0){
                                    for(let k in this.state.processes[0].child[i].child[j].child){
                                        if(!Number.isInteger(Number(this.state.processes[0].child[i].child[j].child[k].id))){
                                            this.state.processes[0].child[i].child[j].child.splice(k,1)
                                        }else{
                                            if(this.state.processes[0].child[i].child[j].child[k].child && this.state.processes[0].child[i].child[j].child[k].child.length > 0){
                                                for(let l in this.state.processes[0].child[i].child[j].child[k].child){
                                                    if(!Number.isInteger(Number(this.state.processes[0].child[i].child[j].child[k].child[l].id))){
                                                        this.state.processes[0].child[i].child[j].child[k].child.splice(l,1)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }else{
                                processes[0].child[i].child.splice(j,1);
                            }
                            this.setState({
                                processes: processes,
                                selectedCol: ""
                            })
                            break;
                        }else{
                            for(let k in this.state.processes[0].child[i].child[j].child) {
                                if(this.state.processes[0].child[i].child[j].child[k].id === this.state.parentId && this.state.processes[0].child[i].child[j].child[k].ProcessLevel == selectedCol) {
                                    let processes = this.state.processes;
                                    if(Number.isInteger(Number(processes[0].child[i].child[j].child[k].id))){
                                        processes[0].child[i].action = "update";
                                        processes[0].child[i].child[j].action = "update";
                                        processes[0].child[i].child[j].child[k].action = "delete";
                                        if(this.state.processes[0].child[i].child[j].child[k].child && this.state.processes[0].child[i].child[j].child[k].child.length > 0){
                                            for(let l in this.state.processes[0].child[i].child[j].child[k].child){
                                                if(!Number.isInteger(Number(this.state.processes[0].child[i].child[j].child[k].child[l].id))){
                                                    this.state.processes[0].child[i].child[j].child[k].child.splice(l,1)
                                                }
                                            }
                                        }
                                    }else{
                                        processes[0].child[i].child[j].child.splice(k,1);
                                    }
                                    this.setState({
                                        processes: processes,
                                        selectedCol: ""
                                    })
                                    break;
                                }else{
                                    for(let l in this.state.processes[0].child[i].child[j].child[k].child) {
                                        if(this.state.processes[0].child[i].child[j].child[k].child[l].id === this.state.parentId && this.state.processes[0].child[i].child[j].child[k].child[l].ProcessLevel == selectedCol) {
                                            let processes = this.state.processes;
                                            if(Number.isInteger(Number(processes[0].child[i].child[j].child[k].child[l].id))){
                                                processes[0].child[i].action = "update";
                                                processes[0].child[i].child[j].action = "update";
                                                processes[0].child[i].child[j].child[k].action = "update";
                                                processes[0].child[i].child[j].child[k].child[l].action = "delete";
                                            }else{
                                                processes[0].child[i].child[j].child[k].child.splice(l,1);
                                            }
                                            
                                            this.setState({
                                                processes: processes,
                                                selectedCol: ""
                                            })
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for(let p in this.state.processes) {
                let processes = this.state.processes;
                if(processes[p].hasOwnProperty("child")){
                    for(let i in this.state.processes[p].child) {
                    
                        if(!processes[p].child[i].hasOwnProperty("action")){
                            
                            processes[p].child[i].action = "update";
                            this.setState({
                                processes: processes
                            })
                        }
                        if(processes[p].child[i].hasOwnProperty("child")){
                            for(let j in this.state.processes[p].child[i].child) {
                                
                                if(processes[p].child[i].hasOwnProperty("action") &&  processes[p].child[i].action=='delete'){
                                    processes[p].child[i].child[j].action = "delete";
                                    this.setState({
                                        processes: processes
                                    })
                                }
                                else if( !processes[p].child[i].child[j].hasOwnProperty("action") ){
                                    processes[p].child[i].child[j].action = "update";
                                    this.setState({
                                        processes: processes
                                    })
                                }
                                if(processes[p].child[i].child[j].hasOwnProperty("child")){
                                    for(let k in this.state.processes[p].child[i].child[j].child) {
                                        if(processes[p].child[i].child[j].hasOwnProperty("action") &&  processes[p].child[i].child[j].action=='delete'){
                                            processes[p].child[i].child[j].child[k].action = "delete";
                                            this.setState({
                                                processes: processes
                                            })
                                        }
                                        else if( !processes[p].child[i].child[j].child[k].hasOwnProperty("action") ){
                                            processes[p].child[i].child[j].child[k].action = "update";
                                            this.setState({
                                                processes: processes
                                            })
                                        }
                                        if(processes[p].child[i].child[j].child[k].hasOwnProperty("child")){
                                            for(let l in this.state.processes[p].child[i].child[j].child[k].child) {
                                                if(processes[p].child[i].child[j].child[k].hasOwnProperty("action") &&  processes[p].child[i].child[j].child[k].action=='delete'){
                                                    processes[p].child[i].child[j].child[k].child[l].action = "delete";
                                                    this.setState({
                                                        processes: processes
                                                    })
                                                }
                                                else if( !processes[p].child[i].child[j].child[k].child[l].hasOwnProperty("action") ){
                                                    processes[p].child[i].child[j].child[k].child[l].action = "update";
                                                    this.setState({
                                                        processes: processes
                                                    })
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            this.setState({
                disabledButton:0,
                isBlocking: true
            })
        }
        //console.log(JSON.stringify( this.state.processes, null, 4))
    }
    
    handleSaveDetail = (gridId, updatedValue, column) => {
        // console.log("hi")
        for(let p in this.state.processes) {
            if(this.state.processes[p].id === gridId) {
                let processes = this.state.processes;
                processes[p][column]=updatedValue;
                this.setState({
                    processes: processes
                })
                break;
            }else{
                for(let i in this.state.processes[p].child) {
                    if(this.state.processes[p].child[i].id === gridId) {
                        let processes = this.state.processes;
                        processes[p].child[i][column]=updatedValue;
                        this.setState({
                            processes: processes
                        })
                        break;
                    }else{
                        for(let j in this.state.processes[p].child[i].child) {
                            if(this.state.processes[p].child[i].child[j].id === gridId) {
                                let processes = this.state.processes;
                                processes[p].child[i].child[j][column] = updatedValue;
                                this.setState({
                                    processes: processes
                                })
                                break;
                            }else{
                                for(let k in this.state.processes[p].child[i].child[j].child) {
                                    if(this.state.processes[p].child[i].child[j].child[k].id === gridId) {
                                        let processes = this.state.processes;
                                        processes[p].child[i].child[j].child[k][column] = updatedValue;
                                        this.setState({
                                            processes: processes
                                        })
                                        break;
                                    }else{
                                        for(let l in this.state.processes[p].child[i].child[j].child[k].child) {
                                            if(this.state.processes[p].child[i].child[j].child[k].child[l].id === gridId) {
                                                let processes = this.state.processes;
                                                processes[p].child[i].child[j].child[k].child[l][column] = updatedValue;
                                                this.setState({
                                                    processes: processes
                                                })
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //console.log(JSON.stringify(this.state.processes, null, 4));
    }

    handleSaveTitle = (e, gridId, processLevel) => {
        processLevel = processLevel.slice(-1);
        if(e.target.value !== '') {
            for(let i in this.state.processes[0].child) {
                if(this.state.processes[0].child[i].id === gridId && this.state.processes[0].child[i].ProcessLevel == processLevel) {
                    let processes = this.state.processes;
                    processes[0].child[i].text=e.target.value;
                    if(!processes[0].child[i].action) {
                        processes[0].child[i].action = 'update';
                    }
                    this.setState({
                        processes: processes
                    })
                    break;
                }else{
                    for(let j in this.state.processes[0].child[i].child) {
                        if(this.state.processes[0].child[i].child[j].id === gridId && this.state.processes[0].child[i].child[j].ProcessLevel == processLevel) {
                            let processes = this.state.processes;
                            processes[0].child[i].child[j].text = e.target.value;
                            if(!processes[0].child[i].child[j].action) {
                                processes[0].child[i].child[j].action = 'update';
                            }
                            this.setState({
                                processes: processes
                            })
                            break;
                        }else{
                            for(let k in this.state.processes[0].child[i].child[j].child) {
                                if(this.state.processes[0].child[i].child[j].child[k].id === gridId && this.state.processes[0].child[i].child[j].child[k].ProcessLevel == processLevel) {
                                    let processes = this.state.processes;
                                    processes[0].child[i].child[j].child[k].text = e.target.value;
                                    if(!processes[0].child[i].child[j].child[k].action) {
                                        processes[0].child[i].child[j].child[k].action = 'update';
                                    }
                                    this.setState({
                                        processes: processes
                                    })
                                    break;
                                }else{
                                    for(let l in this.state.processes[0].child[i].child[j].child[k].child) {
                                        if(this.state.processes[0].child[i].child[j].child[k].child[l].id === gridId && this.state.processes[0].child[i].child[j].child[k].child[l].ProcessLevel == processLevel) {
                                            let processes = this.state.processes;
                                            processes[0].child[i].child[j].child[k].child[l].text = e.target.value;
                                            if(!processes[0].child[i].child[j].child[k].child[l].action) {
                                                processes[0].child[i].child[j].child[k].child[l].action = 'update';
                                            }
                                            this.setState({
                                                processes: processes
                                            })
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for(let p in this.state.processes) {
            let processes = this.state.processes;
           
            if(processes[p].hasOwnProperty("child")){
               
                for(let i in this.state.processes[p].child) {
                    if(!isNaN( processes[p].child[i].id) && processes[p].child[i].action!="delete" ){
                        processes[p].child[i].action = "update";
                        this.setState({
                            processes: processes
                        })
                    }
                    if(processes[p].child[i].hasOwnProperty("child")){
                        for(let j in this.state.processes[p].child[i].child) {
                            if(!isNaN( processes[p].child[i].child[j].id) && processes[p].child[i].child[j].action!="delete" ){
                                processes[p].child[i].child[j].action = "update";
                                this.setState({
                                    processes: processes
                                })
                            }
                            if(processes[p].child[i].child[j].hasOwnProperty("child")){
                                for(let k in this.state.processes[p].child[i].child[j].child) {
                                    if(!isNaN( processes[p].child[i].child[j].child[k].id) && processes[p].child[i].child[j].child[k].action!="delete"){
                                        processes[p].child[i].child[j].child[k].action = "update";
                                        this.setState({
                                            processes: processes
                                        })
                                    }

                                    if(processes[p].child[i].child[j].child[k].hasOwnProperty("child")){
                                        for(let l in this.state.processes[p].child[i].child[j].child[k].child) {
                                            if(!isNaN( processes[p].child[i].child[j].child[k].child[l].id) && processes[p].child[i].child[j].child[k].child[l].action!="delete"){
                                                processes[p].child[i].child[j].child[k].child[l].action = "update";
                                                this.setState({
                                                    processes: processes
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                }
            }
            
        }
        this.setState({
            disabledButton:0,
            isBlocking: true
        })
        
    }
    handleCustomerOrders = (parentId, processLevel, parent) =>{
        this.setState({
            parentId:parentId,
            selectedCol: processLevel,
            parent : parent
        })
    }
    updateMechanisms = ( mechanismObj ) =>{
        mechanismObj.project_id = this.state.projectId;
        mechanismObj.process_level_id = this.state.processId;
        mechanismObj.versionId = this.state.version;
        //console.log( JSON.stringify( mechanismObj, null,4) )
        this.props.updateScoringMechanism(mechanismObj);
        
    }
    handleScoreOnBlur(e, index, id,processLevel) {
        if(e.target.value.trim() !== "") {
            if(!/^(?!0\d|$)\d*(\.\d{1})?$/.test(e.target.value)) {
                if(!isNaN(e.target.value)) {
                    e.target.value = Math.round(e.target.value * 10 ) / 10;
                }else{
                    e.target.value = '';
                }
            }
        }
        if(e.target.value > 5) {
            e.target.value = 5;
        }else if(e.target.value < 1){
            e.target.value = "";
        }
        let scores = this.state.scores;
       
        let findScoreIndex = _.findIndex(scores, {id: id});
        
        let scoreArr = [];
        if(findScoreIndex !== -1) {
            for(let i in scores){
                //console.log( JSON.stringify(scores[i] ,null, 4))
                if(scores[i].id===id){
                   
                    if(scores[i].scoreArr.length ===0){
                        scores[i].action = "add";
                        scores[i].ProcessLevel  = processLevel;
                       
                    }else{
                        if(!scores[i].action) {
                            scores[i].action = "update";
                        }
                    }
                    scores[i].scoreArr[index] = e.target.value;
                }else{
                   
                    scores[i].action = "update";
                }
            }
            
        }else{
            scoreArr[index] = e.target.value;
            scores.push({
                id: id,
                action: "add",
                ProcessLevel : processLevel,
                scoreArr: scoreArr
            })
        }
        //console.log( JSON.stringify(scores,null,4) );
        //console.log( "===================");
        //return false;
        for(let p in this.state.processes) {
            let processes = this.state.processes;
           
            if(processes[p].hasOwnProperty("child")){
               
                for(let i in this.state.processes[p].child) {
                    if(!isNaN( processes[p].child[i].id) && processes[p].child[i].action!="delete" ){
                        processes[p].child[i].action = "update";
                        this.setState({
                            processes: processes
                        })
                    }
                    if(processes[p].child[i].hasOwnProperty("child")){
                        for(let j in this.state.processes[p].child[i].child) {
                            if(!isNaN( processes[p].child[i].child[j].id) && processes[p].child[i].child[j].action!="delete"){
                                processes[p].child[i].child[j].action = "update";
                                this.setState({
                                    processes: processes
                                })
                            }
                            if(processes[p].child[i].child[j].hasOwnProperty("child")){
                                for(let k in this.state.processes[p].child[i].child[j].child) {
                                    if(!isNaN( processes[p].child[i].child[j].child[k].id) && processes[p].child[i].child[j].child[k].action!="delete"){
                                        processes[p].child[i].child[j].child[k].action = "update";
                                        this.setState({
                                            processes: processes
                                        })
                                    }

                                    if(processes[p].child[i].child[j].child[k].hasOwnProperty("child")){
                                        for(let l in this.state.processes[p].child[i].child[j].child[k].child) {
                                            if(!isNaN( processes[p].child[i].child[j].child[k].child[l].id) && processes[p].child[i].child[j].child[k].child[l].action!="delete"){
                                                processes[p].child[i].child[j].child[k].child[l].action = "update";
                                                this.setState({
                                                    processes: processes
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                }
            }
            
        }
        this.setState({
            scores: scores,
            disabledButton:0,
            isBlocking: true
        })
    }
    handleSaveData() {
        try {
            for(let p in this.state.scores) {
                let scores  = this.state.scores
                if(!scores[p].hasOwnProperty('action') && !isNaN(scores[p].id) ){
                        scores[p].action = "update";
                        this.setState({
                            scores: scores
                        })
                }
            }
            for(let p in this.state.processes) {
                let processes = this.state.processes;
                if(processes[p].hasOwnProperty("child")){
                    for(let lv1p in processes[p].paintpoints){
                        if(!processes[p].paintpoints[lv1p].action){
                            processes[p].paintpoints[lv1p].action = "update";
                            this.setState({
                                processes: processes
                            })
                        }
                    }
                    for(let i in this.state.processes[p].child) {
                        for(let lv2p in processes[p].child[i].paintpoints){
                            if(!processes[p].child[i].paintpoints[lv2p].action){
                                processes[p].child[i].paintpoints[lv2p].action = "update";
                                this.setState({
                                    processes: processes
                                })
                            }
                        }
                        if(!isNaN( processes[p].child[i].id) && processes[p].child[i].action!="delete" ){
                            processes[p].child[i].action = "update";
                            this.setState({
                                processes: processes
                            })
                        }
                        if(processes[p].child[i].hasOwnProperty("child")){
                            for(let j in this.state.processes[p].child[i].child) {
                                for(let lv3p in processes[p].child[i].child[j].paintpoints){
                                    if(!processes[p].child[i].child[j].paintpoints[lv3p].action){
                                        processes[p].child[i].child[j].paintpoints[lv3p].action = "update";
                                        this.setState({
                                            processes: processes
                                        })
                                    }
                                }
                                if(!isNaN( processes[p].child[i].child[j].id) && processes[p].child[i].child[j].action!="delete"){
                                    processes[p].child[i].child[j].action = "update";
                                    this.setState({
                                        processes: processes
                                    })
                                }
                                if(processes[p].child[i].child[j].hasOwnProperty("child")){
                                    for(let k in this.state.processes[p].child[i].child[j].child) {
                                        for(let lv4p in processes[p].child[i].child[j].child[k].paintpoints){
                                            if(!processes[p].child[i].child[j].child[k].paintpoints[lv4p].action){
                                                processes[p].child[i].child[j].child[k].paintpoints[lv4p].action = "update";
                                                this.setState({
                                                    processes: processes
                                                })
                                            }
                                        }
                                        if(!isNaN( processes[p].child[i].child[j].child[k].id) && processes[p].child[i].child[j].child[k].action!="delete"){
                                            processes[p].child[i].child[j].child[k].action = "update";
                                            this.setState({
                                                processes: processes
                                            })
                                        }

                                        if(processes[p].child[i].child[j].child[k].hasOwnProperty("child")){
                                            for(let l in this.state.processes[p].child[i].child[j].child[k].child) {
                                                for(let lv5p in processes[p].child[i].child[j].child[k].child[l].paintpoints){
                                                    if(!processes[p].child[i].child[j].child[k].child[l].paintpoints[lv5p].action){
                                                        processes[p].child[i].child[j].child[k].child[l].paintpoints[lv5p].action = "update";
                                                        this.setState({
                                                            processes: processes
                                                        })
                                                    }
                                                }
                                                if(!isNaN( processes[p].child[i].child[j].child[k].child[l].id) && processes[p].child[i].child[j].child[k].child[l].action!="delete"){
                                                    processes[p].child[i].child[j].child[k].child[l].action = "update";
                                                    this.setState({
                                                        processes: processes
                                                    })
                                                }
                                            }
                                        }
                                    }
                                }
                                
                            }
                        }
                    }
                }
                
            } 
            //console.log(JSON.stringify(this.state.scores, null, 4));
            // update_decomposition_levels_data
            let cmObj = {
                projectId: this.state.projectId,
                processId: this.state.processId,
                processes: [...this.state.processes],
                scores: this.state.scores,
                status:2,
                version: this.state.version
            }
            //console.log(JSON.stringify(cmObj, null, 4));
            //return false;
            this.setState({
                loading:true,
                isBlocking: false,
                saveData: true,
                viewLock: 1
            })
            //$('.processes-section').css('pointer-events', "none");
            this.props.saveDecompositionData(cmObj, this.props.history);
            this.setState({
                // processes : []
                updateProcesses : true
            })
            //  setTimeout(
            //     ()=> {this.componentDidMount()}, 100
            // ); 
            // setTimeout(()=>{
                // console.log(this.state.processes)
            // },1000)
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
    viewLockHandle = () =>{
        this.setState({viewLock:0})
    }
    handleLeafCount(leafCount) {
        
        if(this.state.leafCount !== leafCount) {
            this.setState({
                leafCount: leafCount
            });
        }
    }
    async handleMarkUnComplete(){
        for(let p in this.state.scores) {
            let scores  = this.state.scores
            if(!scores[p].hasOwnProperty('action') && !isNaN(scores[p].id) ){
                    scores[p].action = "update";
                    this.setState({
                        scores: scores
                    })
            }
        }
        for(let p in this.state.processes) {
            let processes = this.state.processes;
            if(processes[p].hasOwnProperty("child")){
                for(let lv1p in processes[p].paintpoints){
                    if(!processes[p].paintpoints[lv1p].action){
                        processes[p].paintpoints[lv1p].action = "update";
                        this.setState({
                            processes: processes
                        })
                    }
                }
                for(let i in this.state.processes[p].child) {
                    for(let lv2p in processes[p].child[i].paintpoints){
                        if(!processes[p].child[i].paintpoints[lv2p].action){
                            processes[p].child[i].paintpoints[lv2p].action = "update";
                            this.setState({
                                processes: processes
                            })
                        }
                    }
                    if(!isNaN( processes[p].child[i].id) && processes[p].child[i].action!="delete" ){
                        processes[p].child[i].action = "update";
                        this.setState({
                            processes: processes
                        })
                    }
                    if(processes[p].child[i].hasOwnProperty("child")){
                        for(let j in this.state.processes[p].child[i].child) {
                            for(let lv3p in processes[p].child[i].child[j].paintpoints){
                                if(!processes[p].child[i].child[j].paintpoints[lv3p].action){
                                    processes[p].child[i].child[j].paintpoints[lv3p].action = "update";
                                    this.setState({
                                        processes: processes
                                    })
                                }
                            }
                            if(!isNaN( processes[p].child[i].child[j].id) && processes[p].child[i].child[j].action!="delete"){
                                processes[p].child[i].child[j].action = "update";
                                this.setState({
                                    processes: processes
                                })
                            }
                            if(processes[p].child[i].child[j].hasOwnProperty("child")){
                                for(let k in this.state.processes[p].child[i].child[j].child) {
                                    for(let lv4p in processes[p].child[i].child[j].child[k].paintpoints){
                                        if(!processes[p].child[i].child[j].child[k].paintpoints[lv4p].action){
                                            processes[p].child[i].child[j].child[k].paintpoints[lv4p].action = "update";
                                            this.setState({
                                                processes: processes
                                            })
                                        }
                                    }
                                    if(!isNaN( processes[p].child[i].child[j].child[k].id) && processes[p].child[i].child[j].child[k].action!="delete"){
                                        processes[p].child[i].child[j].child[k].action = "update";
                                        this.setState({
                                            processes: processes
                                        })
                                    }

                                    if(processes[p].child[i].child[j].child[k].hasOwnProperty("child")){
                                        for(let l in this.state.processes[p].child[i].child[j].child[k].child) {
                                            for(let lv5p in processes[p].child[i].child[j].child[k].child[l].paintpoints){
                                                if(!processes[p].child[i].child[j].child[k].child[l].paintpoints[lv5p].action){
                                                    processes[p].child[i].child[j].child[k].child[l].paintpoints[lv5p].action = "update";
                                                    this.setState({
                                                        processes: processes
                                                    })
                                                }
                                            }
                                            if(!isNaN( processes[p].child[i].child[j].child[k].child[l].id) && processes[p].child[i].child[j].child[k].child[l].action!="delete"){
                                                processes[p].child[i].child[j].child[k].child[l].action = "update";
                                                this.setState({
                                                    processes: processes
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                }
            }
            
        }   
        let cmObj = {
            projectId: this.state.projectId,
            processId: this.state.processId,
            processes: this.state.processes,
            scores: this.state.scores,
            status:2,
            VersionNo : this.state.versionNo,
            ReasonForNewVersion : this.state.versionReason,
            IsUnlocked : 1,
            ProjectVersionId : this.props.match.params.projectVersionId
        }
        this.setState({
            loading:true,
            isBlocking: false,
            saveData: false,
            updateProcesses : true,
            versionNo : "",
            versionReason : "",
            incompletePopupOpen : false,
            loading : true
        })
        this.props.startLoader();
        axios.post(config.laravelBaseUrl + 'update_decomposition_levels_data',cmObj,{
            headers : {
              "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        }).then(res => {
            responseMessage("success",res.data.message)
            this.getAllVersionAndProcessData();
            this.setState({showUncompleteValidations : false,loading: false})
            // this.props.stopLoader();
        }).catch(err => {
            responseMessage("error",err.response.data.message)
        })
        
    }
    verionChangeHandler = (version) => {
        this.setState({
            versionNumber : version.Version,
            version : version.VersionId
        },()=>{
            let params = {
                projectId: this.state.projectId,
                processId: this.state.processId,
                functionId: this.state.functionId,
                phaseId: this.state.phaseId,
                version : this.state.version,
                ProjectVersionId : this.props.match.params.projectVersionId
            }
        
            if(this.state.modelingMode == 0) {
                this.setState({
                    updateProcesses : true
                },this.props.fetchProcessData(params))
            }else{
                this.setState({
                    updateProcesses : true
                },this.props.fetchHeatmapProcessData(params))
            }
            this.setState({
                modelingMode:this.state.modelingMode
            })
            
            this.props.fetchConnectedProcesses(params);
            this.props.fetchScoringMechanisms(params);
            this.props.fetchCustomScoringMechanisms(params);
        })
    }
    handleMarkComplete() {
        for(let p in this.state.scores) {
            let scores  = this.state.scores
            if(!scores[p].hasOwnProperty('action') && !isNaN(scores[p].id) ){
                    scores[p].action = "update";
                    this.setState({
                        scores: scores
                    })
            }
        }
        for(let p in this.state.processes) {
            let processes = this.state.processes;
            if(processes[p].hasOwnProperty("child")){
                for(let lv1p in processes[p].paintpoints){
                    if(!processes[p].paintpoints[lv1p].action){
                        processes[p].paintpoints[lv1p].action = "update";
                        this.setState({
                            processes: processes
                        })
                    }
                }
                for(let i in this.state.processes[p].child) {
                    for(let lv2p in processes[p].child[i].paintpoints){
                        if(!processes[p].child[i].paintpoints[lv2p].action){
                            processes[p].child[i].paintpoints[lv2p].action = "update";
                            this.setState({
                                processes: processes
                            })
                        }
                    }
                    if(!isNaN( processes[p].child[i].id) && processes[p].child[i].action!="delete" ){
                        processes[p].child[i].action = "update";
                        this.setState({
                            processes: processes
                        })
                    }
                    if(processes[p].child[i].hasOwnProperty("child")){
                        for(let j in this.state.processes[p].child[i].child) {
                            for(let lv3p in processes[p].child[i].child[j].paintpoints){
                                if(!processes[p].child[i].child[j].paintpoints[lv3p].action){
                                    processes[p].child[i].child[j].paintpoints[lv3p].action = "update";
                                    this.setState({
                                        processes: processes
                                    })
                                }
                            }
                            if(!isNaN( processes[p].child[i].child[j].id) && processes[p].child[i].child[j].action!="delete"){
                                processes[p].child[i].child[j].action = "update";
                                this.setState({
                                    processes: processes
                                })
                            }
                            if(processes[p].child[i].child[j].hasOwnProperty("child")){
                                for(let k in this.state.processes[p].child[i].child[j].child) {
                                    for(let lv4p in processes[p].child[i].child[j].child[k].paintpoints){
                                        if(!processes[p].child[i].child[j].child[k].paintpoints[lv4p].action){
                                            processes[p].child[i].child[j].child[k].paintpoints[lv4p].action = "update";
                                            this.setState({
                                                processes: processes
                                            })
                                        }
                                    }
                                    if(!isNaN( processes[p].child[i].child[j].child[k].id) && processes[p].child[i].child[j].child[k].action!="delete"){
                                        processes[p].child[i].child[j].child[k].action = "update";
                                        this.setState({
                                            processes: processes
                                        })
                                    }

                                    if(processes[p].child[i].child[j].child[k].hasOwnProperty("child")){
                                        for(let l in this.state.processes[p].child[i].child[j].child[k].child) {
                                            for(let lv5p in processes[p].child[i].child[j].child[k].child[l].paintpoints){
                                                if(!processes[p].child[i].child[j].child[k].child[l].paintpoints[lv5p].action){
                                                    processes[p].child[i].child[j].child[k].child[l].paintpoints[lv5p].action = "update";
                                                    this.setState({
                                                        processes: processes
                                                    })
                                                }
                                            }
                                            if(!isNaN( processes[p].child[i].child[j].child[k].child[l].id) && processes[p].child[i].child[j].child[k].child[l].action!="delete"){
                                                processes[p].child[i].child[j].child[k].child[l].action = "update";
                                                this.setState({
                                                    processes: processes
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                            
                        }
                    }
                }
            }
            
        }   
        let cmObj = {
            projectId: this.state.projectId,
            processId: this.state.processId,
            processes: this.state.processes,
            scores: this.state.scores,
            status:3, 
            ProjectVersionId : this.props.match.params.projectVersionId
        }
        this.setState({
            loading:true,
            isBlocking: false
        })
        this.props.saveDecompositionData(cmObj, this.props.history);
    }
    toggleMode(mode) {
        this.setState({
            modelingMode:mode,
            loading: true
        }, function() {
            const params = {
                projectId: this.state.projectId,
                processId: this.state.processId,
                version : this.state.version,
                ProjectVersionId : this.props.match.params.projectVersionId
            }
            if(mode === 0) {
                this.setState({
                    // processes : []
                    updateProcesses : true
                },()=>{
                    this.props.fetchProcessData(params);
                    $('.processes-section').css('pointer-events', "auto");
                })
            }else{
                this.setState({
                    // processes : []
                    updateProcesses : true
                },()=>{
                    this.props.fetchHeatmapProcessData(params);
                    $('.processes-section').css('pointer-events', "none");
                })
            }
        })
    }
    DetailsChangeHandler=()=>{
        this.setState({
            disabledButton: 0
        })
    }
    toggleIncompletePopUp = () => {
        this.setState({
            incompletePopupOpen : !this.state.incompletePopupOpen,
            versionNo : Number(this.state.latestVersion)+0.1
        })
    }
    versionDataChangeHandler = (e) => {
        console.log(this.state.latestVersion)
        let value = e.target.value;
        let decimals = 0;
        if(e.target.name == "versionNo"){
            if (Math.floor(value) !== value)   {
                decimals = value.toString().split(".")[1]?value.toString().split(".")[1].length:0 || 0;
            }
        }
        if(e.target.name == "versionNo" && decimals < 2){
            this.setState({
                versionNo : e.target.value
            })
        }else if(e.target.name == "versionReason"){
            this.setState({
                versionReason : e.target.value
            })
        }
    }
    checkScoring=()=>{
        if(!(this.props.CanScore && this.props.CanScore=='1'))
        toast.info("Until you score indepedent process, You can not score depedent process",{autoClose: 5000});
    }
    render(){
        // console.log(this.state.processes,this.state.scores,this.state.selectedCol,this.state.parentId)
        const pro_array = this.state.processes;
        return (
            [
            <DashboardHeader key="dashboard-header"></DashboardHeader>,
            <div id="wrapper" key="body-wrapper">
                <Prompt
                    when={this.state.isBlocking}
                    message={() =>
                    `You have some unsaved Data. Do you still want to proceed ?`
                    }
                />
                <DashboardSidebar></DashboardSidebar>
                <CapabilityModelingWrapper id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        {/* Breadcrumb */}    
                        <ol className="breadcrumb dashbread">
                            <li className="breadcrumb-item active"><Link to="/dashboard">Home</Link></li>
                            <li className="breadcrumb-item"><Link to={"/capability/"+this.state.projectId}>Capability Modeling</Link></li>
                            <li className="breadcrumb-item">Process Decomposition</li>
                            <li className="breadcrumb-menu d-md-down-none ml-auto">
                                <span className="position-relative helpwrap">
                                    <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                                    <div className="dropdown-menu" aria-labelledby="helpBtn">
                                        <p>Lorem Ipsum Dolor</p>
                                    </div>
                                </span>
                            </li>
                            <li className="breadcrumb-menu d-md-down-none">
                            {<img src={ require('./../../common/images/diva-icon.png') } className="logo-img" alt="Logo" /> }
                                <a className="btn powered p-0" href="#">
                                    <i className="icon-graph"></i> &nbsp;
                                    <i>Powered by Amploglobal</i>
                                </a>
                            </li>
                        </ol> 
                        {/* End Breadcrumb */}
                       
                        <div className="container-fluid container-dashboard">
                            <div className="capability-responsive-section px-4 my-5">
                                <OrderExecution CanScore={this.props.CanScore} version={this.state.version} handleSearchChange={this.handleSearchChange} updateRelation={()=>this.setState({relationModal:!this.state.relationModal})} saveData={this.state.saveData} isBlocking={this.state.isBlocking} modelingMode={this.state.modelingMode} processId={this.state.processId} disabledButton={this.state.disabledButton} customMechanisms={this.state.customMechanisms} processes={ this.state.processes } mechanisms={this.state.mechanisms} updateMechanisms={this.updateMechanisms} handleSaveData={this.handleSaveData.bind(this)} handleMarkUnComplete={this.handleMarkUnComplete.bind(this)} handleMarkComplete={this.handleMarkComplete.bind(this)} connectedProcesses={this.props.connectedProcesses} toggleMode={this.toggleMode.bind(this)} projectId={this.state.projectId} functionId={this.state.functionId} phaseId={this.state.phaseId}
                                toggleIncompletePopUp={this.toggleIncompletePopUp.bind(this)} versionsArr={this.state.versionsArr} versionNumber={this.state.versionNumber} latestVersion={this.state.latestVersion} verionChangeHandler={this.verionChangeHandler.bind(this)} projectVersionId={this.props.match.params.projectVersionId} />
                                {/*Start L1 to L5 Processes Section */}
                                <Row className="mt-4">
                                    <div className="processes-section" style={{border:"none"}}>
                                        <Processes selectedProcessChange={this.selectedProcessChange.bind(this)}  viewLockHandle={this.viewLockHandle.bind(this)} viewLock={this.state.viewLock} processes={ this.state.processes } selectedCol={this.state.selectedCol} onClickhandleCustomerOrders={ this.handleCustomerOrders } onClickhandleAddProcess={ this.handleAddProcess } handleDeleteProcess={this.handleDeleteProcess.bind(this)} saveTitle={this.handleSaveTitle} modelingMode={this.state.modelingMode} />
                                        <div onClick={()=>this.checkScoring()}>
                                        <div style={(this.props.CanScore && this.props.CanScore=='1')?{}:{pointerEvents:'none'}}>
                                        <ScoringMechanisms loading={this.state.loading} modelingMode={this.state.modelingMode} processes={ this.state.processes } mechanisms={this.state.mechanisms} handleScoreOnBlur={this.handleScoreOnBlur.bind(this)} scores={this.state.scores} handleLeafCount={this.handleLeafCount.bind(this)} />
                                        </div>
                                        </div>
                                        <Details priorityweightage={this.state.priorityweightage} viewLockHandle={this.viewLockHandle.bind(this)} viewLock={this.state.viewLock} DetailsChangeHandler={this.DetailsChangeHandler} processes={ this.state.processes } handleSaveDetail={this.handleSaveDetail} />
                                        <DisplayScore data={this.props.getScoreAndDataCausal.Details} />
                                    </div>
                                </Row>
                                { /*End L1 to L5 Processes Section */}

                            </div>
                        </div>
                                    
                    </div>
                    <CapabilityModelingPopup 
                        onPainPointChange={this.onPainPointChange.bind(this)} 
                        ondescriptionState={this.ondescriptionState.bind(this)} 
                        addPainPointHandler={this.addPainPointHandler.bind(this)}
                        oncommentsState={this.oncommentsState.bind(this)}
                        painpointsState={this.state.painpointsState} 
                        commentsState={this.state.commentsState} 
                        descriptionState={this.state.descriptionState} 
                        savePopUpData={this.savePopUpData.bind(this)} 
                        selectedProcess={this.state.popUpSelectedProcess} 
                        deletePopupButton={this.deletePopupButton.bind(this)}
                        selectPainpointForDelete={this.selectPainpointForDelete.bind(this)}
                    />
                </CapabilityModelingWrapper>
                {this.state.relationModal?<CapabilityRelationModal projectId={this.state.projectId} processId={this.state.processId} prompt={this.state.firstPrompt} updateRelation={()=>this.setState({relationModal:!this.state.relationModal})}/>:''}
            </div>,
            <ModalPopup isOpen={this.state.incompletePopupOpen} toggle={this.toggleIncompletePopUp.bind(this)} title="Mark Incomplete">
                <div class="form-group">
                    <label>Version <span class="text-danger">*</span></label>
                    <input className="form-control" type="text" name="versionNo" onChange={(e) => this.versionDataChangeHandler(e)} value={this.state.versionNo} />  {this.state.versionNo == "" && this.state.showUncompleteValidations?<span class="text-danger">Version Number is required.</span>:""}{this.state.versionNo != ""?Number(this.state.versionNo) <= Number(this.state.latestVersion)?<span class="text-danger">Version Number has to be greater than previous version.</span>:"":""}
                </div>
                <div class="form-group">
                    <label>Description<span class="text-danger">*</span></label>
                    <input className="form-control" type="text" name="versionReason"  onChange={(e) => this.versionDataChangeHandler(e)} value={this.state.versionReason} />    {this.state.versionReason == "" && this.state.showUncompleteValidations ?<span class="text-danger">Version Updrade reason is required.</span>:""}                                          
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary ml-3"  onClick={this.toggleIncompletePopUp.bind(this)}>Cancel</button> 
                    <button type="button" className="btn btn-primary ml-3"  onClick={(this.state.versionReason != "" && this.state.versionNo != "" && Number(this.state.versionNo) > Number(this.state.latestVersion))?()=>this.handleMarkUnComplete():()=>{this.setState({showUncompleteValidations : true})}}>Save</button> 
                </div> 
            </ModalPopup>,
            <FooterComponent key="dashboard-footer"></FooterComponent>
            ]
        )
    }
}
CapabilityModeling.propTypes = {
    fetchProcessData: PropTypes.func.isRequired,
    processes: PropTypes.object.isRequired,
    fetchConnectedProcesses: PropTypes.func.isRequired,
    connectedProcesses: PropTypes.array.isRequired,
    fetchScoringMechanisms: PropTypes.func.isRequired,
    updateScoringMechanism:PropTypes.func.isRequired,
    mechanisms: PropTypes.array.isRequired,
    mechanism:PropTypes.object,
    saveDecompositionData: PropTypes.func.isRequired,
    fetchHeatmapProcessData: PropTypes.func,
    fetchCustomScoringMechanisms: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    mechanisms: state.capabilityModeling.mechanisms,
    mechanism: state.capabilityModeling.mechanism,
    processes: state.capabilityModeling.processes,
    connectedProcesses: state.capabilityModeling.connectedProcesses,
    customMechanisms: state.capabilityModeling.customMechanisms,
    saveDecomposition: state.capabilityModeling.saveDecomposition,
    errors: state.errors,
    CanScore:state.capability.canScoreCheckCausal,
    getScoreAndDataCausal:state.capability.getScoreAndDataCausal
});
export default connect(mapStateToProps, {getCausalDataAndScore, fetchCustomScoringMechanisms, fetchScoringMechanisms, fetchProcessData, fetchConnectedProcesses, updateScoringMechanism, saveDecompositionData, fetchHeatmapProcessData, startLoader, stopLoader,canScoreCheckCausal })(CapabilityModeling);