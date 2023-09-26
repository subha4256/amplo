import React, { Component,useRef } from 'react';
import  Loader  from '../Loader';
import _ from "lodash";
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import { DesignThinkingEpicDetailScreenWrapper } from './Styling/EmpathyScreen'
import FooterComponent from "../includes/dashboardFooter/FooterComponent";
import AsideComponent from "../includes/asideComponent/AsideComponent";
import EmpathyScreenBreadCrumb from './EmpathyScreenBreadCrumb';
import EmpathyScreenLeftSidebar from './EmpathyScreenLeftSidebar';
import EmpathyScreenBodyDetail from './EmpathyScreenBodyDetail';
import EmpathyScreenTopbar from './EmpathyScreenTopbar';
import EmpathyScreenNoiModal from './EmpathyScreenNoiModal';
import EmpathyMapModellingPopup from './EmpathyMapModellingPopup';
import EmpathyModalPopup from './EmpathyModalPopup';
import EmpathyModalPopupAudio from  './EmpathyModalPopupAudio';
import EmpathyModalImagePopup from  './EmpathyModalImagePopup';
import AddStakeHolders from './AddStakeholderPopup'
import {jsPlumb,jsPlumbUtil} from 'jsplumb';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { 
    fetchBenchmarkProjectsWithDomains, 
    fetchDecompositionProjects, 
    fetchKpisControls,
    fetchUserDetails,
    fetchOtherProjectsOfUser,
    fetchNetworkOfInfluenceTemplates,
    fetchDesignThinkingStakeHolders,
    fetchDesignThinkingProjectDetails,
    fetchEpic,
    fetchEpicVersionHistory,
    saveEpicAction,
    fetchDecompositionProjectsFunctionPhaseLevel,
    doEpicLockUnlock,
    fetchEpicProject,
    fetchAllEpic 
} from '../../actions/epicScreenActions';
import { 
    fetchEmpathyNotesStakeHolders,
    fetchEmpathyNotes,
    fetchAllEmpathyLifeCycle,
    saveEmpathyMap,
    deleteEmpathyMap,
    fetchEmpathyNotesStkDesc,
    deleteEmpathyNotesStakeHolders,
    fetchDtNoiStkhldrDetail
} from '../../actions/empathyScreenActions';
import { 
    fetchCustomerJourneyMap,
    createCustomerJourneyMap
} from '../../actions/cjmActions';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import {errorAlert,responseMessage} from '../../utils/alert';
import { Global } from '../../utils/Env';
import { green } from 'color-name';
const config = require('../../config');


class EmpathyScreen extends Component{
    constructor( props ){
        super( props );
        this.child = React.createRef();
        this.state = {
            decompProjectId: "",
            stkId: null,
            SelectedStkName:"",
            dropText:"",
            selectedTxt:"",
            selectedStage: null,
            selectedSubstage: null,
            showcjmbtn: false,
            cjmId: 0,
            lifecycleSaveBtnStatus: false,
            empathyNotesSaveBtnStatus: false,
            empathyMapSaveBtnStatus: false,
            personaSaveBtnStatus: false,
            lifecycleData: [],
            epic:[],
            StkHolderForLinkEmpathyMap:[],
            epicList:[],
            draggedStakeholderId: null,
            draggedStakeholderImage:'',
            aa:[],
            showClass: false,
            selectedDtNoiStk: {},
            epicProject:[],
            epicDetail:{},
            parentEpicId:"",
            subEpicId:"",
            dtProjects:{},
            UserInfo:{},
            UserProjectDetails: [],
            NetworkOfInfluence:[],
            StackHolder:[],
            FilterStackHolder:[],
            FilterStackHolderLeftSidebar:[],
            dtId : this.props.match.params.dtId?this.props.match.params.dtId:0,
            epicId: this.props.match.params.epicId?this.props.match.params.epicId:0,
            dragValue:{},
            dragchildValue:{},
            successMessage:'',
            checkNoi:'',
            showSubEpic:0,
            decompositionchildData:[],
            loading:false,
            filterVal:'',
            ptype:'',
            stakeHolders:[
                {
                    name: "Kathey K. Hernandez",
                    position: "Researcher",
                    image: null,
                    lastUpdated: "Updated 1min ago",
                    profile: true,
                    video: true,
                    audio: true
                },
                {
                    name: "John doe",
                    position: "Researcher",
                    image: null,
                    lastUpdated: "Updated 1min ago",
                    profile: true,
                    video: true,
                    audio: false
                },
                {
                    name: "Jony Stark",
                    position: "Researcher",
                    image: null,
                    lastUpdated: "Updated 1min ago",
                    profile: true,
                    video: false,
                    audio: true
                },
                {
                    name: "Aegon",
                    position: "Researcher",
                    lastUpdated: "Updated 1min ago",
                    profile: false,
                    video: true,
                    audio: true
                },
            ],
            color : "yellow",
            ovalId : 1,
            currentStakeholderSelectedForInterview : {},
            selectedStakeholdersForInterview: [],
            selectedStakeholdersNotesForInterview: [],
            ovalShape : [], 
            currentSelectedEmpathyMap : {},
            currentSelectedEmpathyMapInd : -1,
            goalSetting : [
                {
                    "id": 0,
                    "title": "Vision",
                    "description": "Double Tap to Edit."
                },{
                    "id": 0,
                    "title": "Purpose",
                    "description": []
                },{
                    "id": 0,
                    "title": "StrategicPriorities",
                    "description": []
                },{
                    "id": 0,
                    "title": "StrategicResults",
                    "description": []
                }
            ],
            empathylist:[],
            isOpen: false,
            selectedPainpointIndex : null,
            empathyMap:[{
                "id":1
            }],
            searchTerm:"",
            selectedStakeholders:[],
            fixedSectionState: "",
            isUpdateing: false,
            fixedSectionTextIndex: null,
            newlyAddedFixedSectionItems:[],
            // fixedSectionState: EditorState.createEmpty(),
            stakeHoldersInterviewData: [],
            EmpathyNotesAllCategory: [],
            selectedStackHolderForInterview: 0,
            selectedStackHolderForEmpathyMap: 0,
            versionHistoryNo: 0,
            ProjectVersionId: 0,
            EpicId: this.props.match.params.epicId?this.props.match.params.epicId:0,
            EpicVersionId: 0,
            StkDescOnEmpathyMap: [],
            StackHolderEmpathyMap: [],
            draggedStakeholder:{},
            lifecycleIdForDelete:"",
            SelectStkForLinkEmpMap:[],
            LifecycleCategories: [],
            EmpathyMapSections: []
        }
        Global.callback.fetchAllEpic_onComplete = (res) => {
            this.fetchAllEpicCallback(res);        
        }
        Global.callback.fetchEpic_onComplete = (res) => {
            this.fetchEpicCallback(res);        
        }
        Global.callback.fetchEmpathyNotesStakeHolders_onComplete = (res) => {
            this.fetchEmpathyNotesStakeHoldersCallback(res);        
        }
        Global.callback.fetchEmpathyNotes_onComplete = (res) => {
            this.fetchEmpathyNotesCallback(res);        
        }
        Global.callback.fetchDecompositionProjectsFunctionPhaseLevel_onComplete = (res) => {
            this.getDecomProject(res);        
        }
        Global.callback.saveEmpathyMap_onComplete = (res) => {
            this.saveEmpathyCallback(res);        
        }
        Global.callback.deleteEmpathyNotesStakeHolders_onComplete = (res) => {
            // this.props.fetchEmpathyNotesStakeHolders(this.state.dtId,this.state.ProjectVersionId,this.state.epicId,this.state.EpicVersionId)               
        }
        Global.callback.fetchAllEmpathyLifeCycle_onComplete = (res) => {
            this.fetchAllEmpathyLifeCycleCallback(res);        
        }
        Global.callback.createCustomerJourneyMap_onComplete = (res) => {
            this.createCustomerJourneyMapCallback(res);        
        }
    }
    createCustomerJourneyMapCallback = (res) => {
        console.log(res)
        this.setState({showcjmbtn: true, cjmId: res.data[0].CustomerJourneyMapId})
    }
    fetchAllEmpathyLifeCycleCallback = (res) => {
        const updateData =  res.data.LifeCycle?res.data.LifeCycle.map((d,i) => {
            return {
                ...d,
                Stages: d.Stages.map(s => {
                    if(s.StageName == null){
                        if(!s.hasOwnProperty('SubStages')){
                            return{
                                ...s,
                                SubStages: []
                            }
                        }
                    }
                    return {
                        ...s,
                        SubStages: s.SubStages.map(c => {
                            return {
                                ...c,
                                Categories: c.Categories.map( j=> {
                                    if(j.CategoryName == "Impactor" || j.CategoryName == "Impactee"){
                                        if(j.hasOwnProperty('CategoryText')){
                                            return {...j}
                                        } else {
                                            return {
                                                ...j,
                                                CategoryText:[]
                                            }
                                        }
                                    }
                                    return {...j}
                                })
                            }
                        })
                    }
                })
            }
        }):[]

        const aa = updateData.map(d => {
            return{
                ...d,
                Stages: _.sortBy(d.Stages, 'SequenceNumber')
            }
        })
        this.setState({lifecycleData: aa})
    } 
    saveEmpathyCallback(res){
        this.getAllEmpathyMaps()
    }
    getDecomProject(res){
        let jsonObj = {
            projectId: this.state.decompProjectId,
            data: res.data
        }
        this.setState({decompositionchildData:jsonObj})
    }
    fetchEmpathyNotesCallback = (res) => {
        let notes = [...this.state.selectedStakeholdersNotesForInterview]
        let noteInd = notes.map(note=>note.stakeholderId).indexOf(this.state.stkId)
        let sections = res.data.Stakeholders[0].Sections.map(sec => {
            return {
                title: sec.SectionCategoryTitle,
                SectionId: sec.SectionId,
                SectionCategoryId: sec.SectionCategoryId,
                newSection: true,
                desc: sec.SectionDescription
            }
        })

        if(noteInd == -1){
            notes.push({
                stakeholderId : this.state.stkId,
                detailInfo: sections
            })
            this.setState({
                selectedStakeholdersNotesForInterview : notes,
                stkId: null
            })
        }   
    }
    fetchEmpathyNotesStakeHoldersCallback = (res) => {

        let linkStakeholderForEmpathyMap = res.data.Stakeholders?res.data.Stakeholders.map((stakeholder)=>{
            return {
                name: stakeholder.StakeHolderName,
                stakeholderId: stakeholder.StakeholderId,
            }
        }):[]
        this.setState({StkHolderForLinkEmpathyMap: linkStakeholderForEmpathyMap})

        let stakeholders = res.data.Stakeholders?res.data.Stakeholders.map((stakeholder)=>{
            return {
                ...stakeholder,
                name: stakeholder.StakeHolderName,
                type: stakeholder.StakeHolderType,
                stakeholderId: stakeholder.StakeholderId,
                video: "",
                audio: "",
                image: "",
            }
        }):[]
        this.setState({
            selectedStakeholdersForInterview : stakeholders,
            currentStakeholderSelectedForInterview : stakeholders[0]?stakeholders[0]:{}
        },()=>{
            this.fetchEmpathyNotesByStakeholder(this.state.currentStakeholderSelectedForInterview.stakeholderId)
            if(this.state.selectedStakeholdersForInterview.length > 0){
                this.doToggleStackHolders(this.state.selectedStakeholdersForInterview[0].StakeholderId, this.state.selectedStakeholdersForInterview[0].StakeHolderName)
            }
        })
    }
    fetchEpicCallback = () => {
        this.setState({ProjectVersionId: 0})
    }
    fetchAllEpicCallback = () => {
        this.setState({EpicVersionId: 0})
    }
    componentDidMount() {
        let empathyState = [...this.state.empathylist];
        empathyState.push({
            action: "add",
            id: "",
            paintpoint_title : "",
            paintpoint_description : EditorState.createEmpty()
        });       
        this.props.fetchBenchmarkProjectsWithDomains();
        this.props.fetchDecompositionProjects();
        this.props.fetchKpisControls();
        
        // from epic 
        this.props.fetchOtherProjectsOfUser(); // no
        this.props.fetchUserDetails(); //no
        this.props.fetchNetworkOfInfluenceTemplates();
        this.props.fetchDesignThinkingStakeHolders();
        this.props.fetchDesignThinkingProjectDetails(this.props.match.params.dtId,this.state.versionHistoryNo); //used
        this.props.fetchEpic(this.props.match.params.dtId,0,this.state.versionHistoryNo);
        this.props.fetchEpicVersionHistory(this.props.match.params.dtId);
        this.props.fetchEpicProject(this.props.match.params.dtId,this.state.versionHistoryNo);
        this.props.fetchAllEpic(this.props.match.params.dtId,this.state.versionHistoryNo);
        // from epic 

        // empathy screen actions
        this.props.fetchEmpathyNotesStakeHolders(this.state.dtId,this.state.ProjectVersionId,this.state.epicId,this.state.EpicVersionId)
        this.getAllEmpathyMaps()
        this.setState({empathylist : empathyState})

        // axios.get(config.laravelBaseUrl+'getEmpathyMapCategory', {
        //     headers: {
        //         "authorization": "Bearer " + sessionStorage.getItem("userToken")
        //     }
        // }).then((response) => {
        //     const emcData = [...this.state.EmpathyMapSections] 
        //     const emc = emcData.map((itm,ind) => itm?  {...itm, SectionCategoryId : response.data.data[ind].CategoryLookUpId} : "")
        //     this.setState({EmpathyMapSections: emc})
        // })

        this.props.fetchAllEmpathyLifeCycle(this.state.dtId,this.state.ProjectVersionId,this.state.epicId,this.state.EpicVersionId)

        axios.get(config.laravelBaseUrl+'getEmpathyLifeCycleCategory', {
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        }).then((response) => {
            
            const filterLsCat = response.data.data.filter((d,i) => {
                if(d.CategoryName !== "Experiences"  &&  d.CategoryName !== "Feelings"){
                    return{
                        ...d
                    }
                }
            })
            const updatedLsCat = filterLsCat.map((d,i) => (
                {
                    CategoryLookUpId : d.CategoryLookUpId,
                    CategoryName: d.CategoryName,
                    SequenceNumber: i+1,
                    CategoryText: d.CategoryName == "Impactor" || d.CategoryName == "Impactee" ? [] : [{SequenceNumber:1,Text: "Enter some text 1"}] 
                }
            ))

            this.setState({LifecycleCategories: updatedLsCat})
        })
        axios.get(config.laravelBaseUrl+'getEmpathyMapCategory', {
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        }).then((response) => {
            
            const updatedEmapCat = response.data.data.map((d,i) => (
                {
                    SectionCategoryId: d.CategoryLookUpId,
                    SectionCategoryTitle: d.CategoryName,
                    SectionCategoryOrderNumber:i+1,
                    Mapping:[
                        {
                            MappingText:1,
                            MappingDetailsText: null,
                            MappingId:0,
                            MappingOrderOfInsertion:"1"
                        }
                    ]
                }
            ))
            this.setState({EmpathyMapSections: updatedEmapCat})
        })

        jsPlumb.
        ready(() => {
            var instance = jsPlumb.getInstance({
                Endpoint: ["Dot", {radius: 2}],
                HoverPaintStyle: {stroke: "#1e8151", strokeWidth: 2 },
                ConnectionOverlays: [
                    [ "Arrow", {
                        location: 1,
                        id: "arrow",
                        length: 14,
                        foldback: 0.8
                    } ],
                ],
                Container: "canvas"
            });
            instance.registerConnectionType("basic", {anchor:[ "Perimeter", { shape:"Ellipse" } ]});
            window.jsp = instance;
            var canvas = document.getElementById("canvas");
            var windows = jsPlumb.getSelector(".oval-shape");
            instance.bind("click",(c) => {
                let conns = [...this.state.connections];
                conns.splice(conns.indexOf({
                    source : c.source.id,
                    target : c.target.id,
                    strength : "medium"
                }),1)
                this.setState({
                    connections : conns
                },()=>{instance.deleteConnection(c);})
            });
            instance.bind("connection", (info) => {
                if(info.connection.target.id===info.connection.source.id){
                    instance.deleteConnection(info.connection);
                }else{
                    let conns = [...this.state.connections];
                    conns.push({
                        source : info.connection.source.id,
                        target : info.connection.target.id,
                        strength : "medium"
                    })
                    this.setState({connections : conns});
                }
            });
            jsPlumb.on(canvas, "dblclick", (e) => {
                if(e.target.classList.contains("oval-shape-row")){
                    if(e.target.childElementCount < 4){
                        this.newNode(e.offsetX, e.offsetY, e.target,this.state.color,"dblClick");
                    }
                }
            });
            
            instance.batch(() => {
                for (var i = 0; i < windows.length; i++) {
                    this.initNode(windows[i], true);
                }
            });
            jsPlumb.fire("jsPlumbDemoLoaded", instance);
        
        });    
    }
    getAllEmpathyMaps(){
        axios.get(config.laravelBaseUrl+`getAllEmpathyMap/${this.state.dtId}/${this.state.ProjectVersionId}/${this.state.epicId}/${this.state.EpicVersionId}`, {
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        }).then((response) => {
            console.log("getAllEmpathyMap",response.data.data.EmpathyMap)
            this.setState({
                StackHolderEmpathyMap : response.data.data.EmpathyMap ? response.data.data.EmpathyMap : []
            })
        })
    }
    getEmpathyNotes(e,stakeHolder){
        if(e.target.id != "deleteStakeholder"){
        console.log(stakeHolder)
            if(stakeHolder){
                this.setState({
                    currentStakeholderSelectedForInterview : stakeHolder
                })
                let notes = [...this.state.selectedStakeholdersNotesForInterview]
                let noteInd = notes.map(note=>note.stakeholderId).indexOf(stakeHolder.stakeholderId)
                if(noteInd == -1){
                    this.fetchEmpathyNotesByStakeholder(stakeHolder.stakeholderId)
                }
            }
        }
    }
    handleEmpathyDescriptionChange = (e,noteInd,descInd,type) => {
        let notes = [...this.state.selectedStakeholdersNotesForInterview]
        notes[noteInd].detailInfo[descInd][type] = e.target.value
        this.setState({
            selectedStakeholdersNotesForInterview : notes
        })
    }
    fetchEmpathyNotesByStakeholder = (stkId) => {
        this.setState({
            stkId: stkId
        },() => {
            this.props.fetchEmpathyNotes(this.state.dtId,this.state.ProjectVersionId,this.state.epicId,this.state.EpicVersionId,stkId)
        })
    }
    selectStakeholder(item){
        let stakeholder = {
            name: item.StakeHolderName,
            type: item.StakeHolderType,
            stakeholderId: item.StakeHolderId,
            video: "",
            audio: "",
            image: "",
        }
        let empathyDetail = {
            stakeholderId : item.StakeHolderId,
            detailInfo: [
                {
                    title: "Describe current position",
                    SectionId: 0,
                    SectionCategoryId: 0,
                    newSection: true,
                    desc: "This is the description."
                },
                {
                    title: "Day in a life",
                    SectionId: 0,
                    SectionCategoryId: 0,
                    newSection: true,
                    desc: "This is the description."
                },
                {
                    title: "Painpoints",
                    SectionId: 0,
                    SectionCategoryId: 0,
                    newSection: true,
                    desc: "This is the description."
                },
                {
                    title: "Challenges",
                    SectionId: 0,
                    SectionCategoryId: 0,
                    newSection: true,
                    desc: "This is the description."
                }
            ]
        }
        let stakeholders = [...this.state.selectedStakeholdersForInterview]
        let notes = [...this.state.selectedStakeholdersNotesForInterview]
        let stkInd = stakeholders.map(stk=>stk.stakeholderId).indexOf(item.StakeHolderId)
        let noteInd = notes.map(note=>note.stakeholderId).indexOf(item.StakeHolderId)
        if(stkInd == -1 && noteInd == -1){
            stakeholders.push(stakeholder)
            notes.push(empathyDetail)
            this.setState({
                selectedStakeholdersForInterview : stakeholders,
                selectedStakeholdersNotesForInterview : notes,
                selectedStakeholders: [...this.state.selectedStakeholders, item]
            },()=>{
                if(this.state.selectedStakeholdersForInterview.length == 1){
                    this.setState({
                        currentStakeholderSelectedForInterview : this.state.selectedStakeholdersForInterview[0]
                    })
                }
            })
        }
    }
    searchStakeholders = (e) => {
        const text = e.target.value;
        const regex = new RegExp(text, "i");
        let data = this.props.StackHolder.filter(word => regex.test(word.StakeHolderName));
        this.setState({FilterStackHolder: data})
    } 
 
    filterProject(e,type){
        this.setState({filterVal:e.target.value,ptype:type})
    }
    createFormData = (formData, key, data, pureKey) => {
        if (data === Object(data) || Array.isArray(data)) {
            if(pureKey === 'image' || pureKey === 'video' || pureKey === 'audio'){
                formData.append(key, data);
            }else{
                for (var i in data) {
                    this.createFormData(formData, key + '[' + i + ']', data[i],i);
                }
            }
        } else {
            formData.append(key, data);
        }
    }
    saveNotes = (e) => {
        let notes = [...this.state.selectedStakeholdersNotesForInterview]
        let stakeholderData = this.state.selectedStakeholdersForInterview.map(data => {
            let noteInd = notes.map(note=>note.stakeholderId).indexOf(data.stakeholderId)
            return {
                StakeholderId: data.stakeholderId,
                Sections: notes[noteInd] ? notes[noteInd].detailInfo.map(note=>{
                    return{
                        SectionId: note.SectionId,
                        SectionCategoryId: note.SectionCategoryId,
                        SectionCategoryTitle: note.title,
                        SectionDescription: note.desc
                    }
                }):null,
                video: data.video,
                audio: data.audio,
                image: data.image
            }
        })
        stakeholderData = stakeholderData.filter((data)=>{
            return data.Sections != null
        })
        if(this.state.lifecycleSaveBtnStatus){
            const updateStkFiellds = [...this.state.lifecycleData]
            
            const dd = updateStkFiellds.map((item) => ({
                ...item,
                Stages: item.Stages.map((itm,ind) => ({
                    ...itm,
                    SequenceNumber: ind+1,
                    SubStages: itm.SubStages.map((item1) => ({
                        ...item1,
                        Categories: item1.Categories.map(category => {
                            if (Array.isArray(category.CategoryText)){
                                return {
                                    ...category, 
                                    CategoryText: category.CategoryName == "Impactor" || category.CategoryName == "Impactee" ? category.CategoryText.map(({ Id }) => Id).join(',') : category.CategoryText
                                }
                            } else return category
                        })
                    }))
                }))
            }))

            const data = {
                "ProjectId":this.state.dtId,
                "ProjectVersionId":0,
                "EpicId":this.state.epicId,
                "EpicVersionId":0,
                "Lifecycles": dd
            }
            axios.post(config.laravelBaseUrl+'saveMultipleEmpathyLifeCycle', data, {
                headers: {
                    "authorization": "Bearer " + sessionStorage.getItem("userToken")
                }
            }).then((response) => {
                responseMessage("Success", response.data.message, "");
                this.props.fetchAllEmpathyLifeCycle(this.state.dtId,this.state.ProjectVersionId,this.state.epicId,this.state.EpicVersionId)
            }).catch(err => {
                console.log("Error",err)
            })
        }

        if(this.state.empathyNotesSaveBtnStatus){
            let fd = new FormData;
            fd.append("ProjectId",this.state.dtId);
            fd.append("ProjectVersionId",this.state.ProjectVersionId);
            fd.append("EpicId",this.state.epicId);
            fd.append("EpicVersionId",this.state.EpicVersionId);
            this.createFormData(fd,"Stakeholders",stakeholderData)
            axios.post(config.laravelBaseUrl+'saveEmpathyNotes', fd, {
                headers: {
                    "authorization": "Bearer " + sessionStorage.getItem("userToken")
                }
            }).then((response) => {            
                responseMessage("Success", response.data.message, "");
                this.props.fetchEmpathyNotesStakeHolders(this.state.dtId,this.state.ProjectVersionId,this.state.epicId,this.state.EpicVersionId)
            
                // axios.get(config.laravelBaseUrl+`getAllStakeholders/${this.state.dtId}/${this.state.epicId}`, {
                //     headers: {
                //         "authorization": "Bearer " + sessionStorage.getItem("userToken")
                //     }
                // }).then((res) => {
                //     this.setState({StkHolderForLinkEmpathyMap: res.data.data})
                // })
            
            }).catch(err => {
                console.log("Error",err)
            })
        }

        if(this.state.empathyMapSaveBtnStatus){

            for(let item of this.state.StackHolderEmpathyMap){
                if(item.Links.length < 1 ){
                    responseMessage('error',`Please Link  Stakeholders for ${item.MapName}`)
                    return;
                }
            }
            const empathyMapData = {
                ProjectId: this.state.dtId,
                ProjectVersionId: this.state.ProjectVersionId,
                EpicId: this.state.epicId,
                EpicVersionId: this.state.EpicVersionId,
                EmpathyMap: [...this.state.StackHolderEmpathyMap]
            }
            this.props.saveEmpathyMap(empathyMapData);
        }
        if(this.state.personaSaveBtnStatus){
            this.child.current.savePersona({
                ProjectId: this.state.dtId,
                ProjectVersionId: this.state.ProjectVersionId,
                EpicId: this.state.epicId,
                EpicVersionId: this.state.EpicVersionId
            })
        }

    }
    getVideo = (e) => {
        let stakeholders = [...this.state.selectedStakeholdersForInterview]
        let curStake = this.state.currentStakeholderSelectedForInterview
        if(e.target.value != ""){
            let stkInd = stakeholders.map(stk=>stk.StakeholderId).indexOf(curStake.StakeholderId)
            stakeholders[stkInd].video = e.target.files[0]
            this.setState({
                selectedStakeholdersForInterview : stakeholders
            })
        }
    }
    getAudio = (e) => {
        let stakeholders = [...this.state.selectedStakeholdersForInterview]
        let curStake = this.state.currentStakeholderSelectedForInterview
        if(e.target.value != ""){
            let stkInd = stakeholders.map(stk=>stk.StakeholderId).indexOf(curStake.StakeholderId)
            stakeholders[stkInd].audio = e.target.files[0]
            this.setState({
                selectedStakeholdersForInterview : stakeholders
            })
        }
    }
    getImage = (e) => {
        let stakeholders = [...this.state.selectedStakeholdersForInterview]
        let curStake = this.state.currentStakeholderSelectedForInterview
        if(e.target.value != ""){
            let stkInd = stakeholders.map(stk=>stk.StakeholderId).indexOf(curStake.StakeholderId)
            stakeholders[stkInd].image = e.target.files[0]
            this.setState({
                selectedStakeholdersForInterview : stakeholders
            })
        }
    }
    addDrag(e,domain){      
        const data = {id: domain.id,name:domain.name}
        this.setState({'dragValue':data});      
    }
    editTitle = (e,id,type) => {
        let epicdata = this.state.epic;
        for(let i in epicdata) {
            if(epicdata[i].id == id && type == 'goal'){
                epicdata[i].Goal =  e.currentTarget.textContent;
            }
            if(epicdata[i].id == id && type == 'name'){
                epicdata[i].name =  e.currentTarget.textContent;
            } 
            if(epicdata[i].id == id && type == 'description'){
                epicdata[i].Description =  e.currentTarget.textContent;
            }              
        } 
        this.setState({epic:epicdata})
    }
    editsubTitle = (e,id,type) => {
        let epicdata = this.state.epic;
        for(let i in epicdata) {
            if(epicdata[i].id == this.props.match.params.epicId){
             for(let j in epicdata[i].SubEpic){
                if(epicdata[i].SubEpic[j].id == id && type == 'goal'){
                    epicdata[i].SubEpic[j].Goal =  e.currentTarget.textContent;
                }
                if(epicdata[i].SubEpic[j].id == id && type == 'name'){
                    epicdata[i].SubEpic[j].name =  e.currentTarget.textContent;
                }
                if(epicdata[i].SubEpic[j].id == id && type == 'description'){
                    epicdata[i].SubEpic[j].Description =  e.currentTarget.textContent;
                }               
             }  
            } 
         }                        
        
        this.setState({epic:epicdata})
    }
    addEpic = ( e )=>{
        let epic      = this.state.epic;
        //if(epic.length>0){

        let epicIndex = parseInt(epic.length)+1;
        epic.push({
            "id":Math.random().toString(36).substring(7),
            "name":"Epic "+epicIndex
        })
        this.setState({
            epic: epic
        })
    }
    selectEpic = (e, id )=>{
        //alert("hi")
        this.setState({
            parentEpicId: id
        })
    }
    addSubEpic = (e)=>{
        let idStr = Math.random().toString(36).substring(7);
            for(let i in this.state.epic) {
                let epic  = this.state.epic;
                if(epic[i].id===this.props.match.params.epicId){
                    if(!epic[i].SubEpic) {
                        epic[i].SubEpic = [];
                    }
                    let epicSubIndex = parseInt(epic[i].SubEpic.length)+1;
                    epic[i].SubEpic.push({
                        "id":idStr,
                        "name":"SubEpic "+epicSubIndex,
                        "Goal":'',
                        "Version":"",
                        "Description":"",
                        "Association":[]
                    })
                }
              
            }

        console.log(this.state.epic);    
        
       
    } 
    selectSubEpic = (e,subEpicId)=>{
        this.setState({          
            subEpicId:subEpicId
        })
    }
    removeEpic = (e)=>{
        if(this.state.parentEpicId==""){
            alert('Please select sub epic first');
        }else{
            for(let i in this.state.epic) {
                let epic = this.state.epic;
                if(epic[i].id==this.state.parentEpicId){
                    epic.splice(i,1)
                    this.setState({
                        epic: epic
                    })
                }
            }
        }
    }
    removeSubEpic = (e)=>{
        if(this.state.subEpicId==""){
           alert('Please select sub epic first');
        }else{
            //alert(this.state.parentEpicId+'======'+this.state.subEpicId)
            for(let i in this.state.epic) {
                let epic = this.state.epic;
                if(epic[i].id==this.props.match.params.epicId){
                    if(epic[i].hasOwnProperty("SubEpic")){
                        for(let j in this.state.epic[i].SubEpic) {
                            //epic[i].child[j].action = "delete";
                            if(epic[i].SubEpic[j].id==this.state.subEpicId){
                                epic[i].SubEpic.splice(j,1)
                            }
                            //myArray.splice(n,1);
                            this.setState({
                                epic: epic
                            })
                        }
                    }
                }
            }
            this.setState({
                subEpicId: ''
            })

       }
    }
    getEpic =  (e) =>{
        // console.log(this.props)
        // this.props.history.push('/empathydetail/'+this.props.match.params.dtId+"/"+e.target.value)       
        window.location.href = '/empathydetail/'+this.props.match.params.dtId+"/"+e.target.value;
        this.props.fetchAllEmpathyLifeCycle(this.state.dtId,this.state.ProjectVersionId,this.state.epicId,this.state.EpicVersionId)
    }
    nextSubEpic = (e,index) => {

        index = index + 1;

        this.setState({showSubEpic:index})
    }
    previouSubEpic = (e,index) => {
        index = index - 1;
        this.setState({showSubEpic:index})
    }
    getChild(data){
        this.setState({decompProjectId: data.projectId})
        this.props.fetchDecompositionProjectsFunctionPhaseLevel(data.projectId)
    }
    addStakeHolders(){
      
        let stakeHolders      = this.state.stakeHolders;
        let epicIndex         = parseInt(stakeHolders.length)+1;
        stakeHolders.push({
            "id":Math.random().toString(36).substring(7),
            "name":"stakeHolders "+epicIndex
        })
        this.setState({
            stakeHolders: stakeHolders
        })
    }
    removeStakeHolders(){
        let stakeHolders      = this.state.stakeHolders;        
        stakeHolders.splice(0,stakeHolders.length-1)            
        this.setState({
            stakeHolders: stakeHolders
        }) 
    }
    createOvalOnDrop = (e) =>{
        e.persist();
        let droppedEl = document.elementFromPoint(e.clientX,e.clientY);
        if(droppedEl.classList.contains("stikynote-box")){           
                this.newNode(e.clientX,e.clientY,droppedEl,e.target.id,"drop");          
        }else if(droppedEl.classList.contains("oval-shape")){           
                this.newNode(e.clientX,e.clientY,droppedEl.parentElement,e.target.id,"drop");
            
        }
    }
    newNode = (x, y, parent,color,type) => {
        let d = document.createElement("div");
        let innerD = document.createElement("div");
        let p = document.createElement("p");
        let input = document.createElement("input");
        let id = "oval"+this.state.ovalId;
        let clnm = "";
        switch(color){
            case "yellow":
                clnm = "oval-shape bg-yellow";
            break;
            case "blue":
                clnm = "oval-shape bg-blue";
            break;
            case "green":
                clnm = "oval-shape bg-green";
            break;
            case "orange":
                clnm = "oval-shape bg-orange";
            break;
        }
        p.innerHTML = "Double Click to Edit";
        p.ondblclick = this.editTextHandler.bind(this);
        input.value = "Double Click to Edit";
        input.onblur = this.editOverHandler.bind(this);
        input.id = id;
        input.style.display = "none";
        innerD.appendChild(p);
        innerD.appendChild(input);
        let oval = [
            ...this.state.ovalShape
        ]
        let objjj = {
            id : id,
            text : "Double Click to Edit"
        };
        oval.push(objjj);
        this.setState({
            ovalShape: oval
        })
        d.className = clnm;
        d.id = id;
        d.innerHTML = "<div class=\"ep\"></div>";
        innerD.style.zIndex = "1";
        d.appendChild(innerD);
        d.ondblclick = this.removeOvalOnClickHandler.bind(this)
        if(type === "dblClick"){
            d.style.left = x-70 + "px";
            d.style.top = y-40 + "px";
        }else if(type === "drop"){
            d.style.left = 250+ "px";
            d.style.top = 0 + "px";
        }
        
        parent.appendChild(d);
        this.initNode(d);
        this.setState({
            ovalId : this.state.ovalId+1
        })
        return d;
    }
    initNode = (el) => {
        window.jsp.draggable(el,{
            containment:true,
        });
        window.jsp.makeSource(el, {
            filter: ".ep",
            anchor:[ "Perimeter", { shape:"Ellipse" } ],
            connectorStyle: { stroke: "#5c96bc", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4 },
            connectionType:"basic",
            extract:{
                "action":"the-action"
            },
            maxConnections: -1,
            onMaxConnections: function (info, e) {
                alert("Maximum connections (" + info.maxConnections + ") reached");
            }
        });

        window.jsp.makeTarget(el, {
            dropOptions: { hoverClass: "dragHover" },
            anchor:[ "Perimeter", { shape:"Ellipse" } ],
            allowLoopback: true
        });
        window.jsp.fire("jsPlumbDemoNodeAdded", el);
    };
    ovalColorChangeHandler = (e) => {
        this.setState({
            color : e.target.id
        })
    }
    editTextHandler = (e) => {
        e.target.style.display = "none";
        e.target.nextElementSibling.style.display = "block";
    }
    editOverHandler = (e) => {
        let oval = [...this.state.ovalShape];
        // console.log(oval,e.target.id)
        let ind = oval.map((oval)=>oval.id).indexOf(e.target.id);
        // console.log(ind)
        oval[ind].text = e.target.value;
        this.setState({
            ovalShape : oval
        },()=>{
            e.target.value = this.state.ovalShape[ind].text;
            e.target.previousElementSibling.innerHTML = this.state.ovalShape[ind].text;
            e.target.style.display = "none";
            e.target.previousElementSibling.style.display = "flex";
        })
        
    }
    removeOvalOnClickHandler = (e) => {
        if(e.target.classList.contains("oval-shape")){
            confirmAlert({
                title: 'Confirm to continue',
                message: 'Are you sure you want to delete this Strategic Object ? ',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            window.jsp.remove(e.target.id);
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {}
                    }
                ]
            });
        }
    }
    onPainPointChange = (painPointState, Ind, type) => {
        let empathyState = [...this.state.empathylist];
        switch(type){
            case "title" :
                empathyState[Ind].paintpoint_title = painPointState;
            break;
            case "editor" :
                empathyState[Ind].paintpoint_description = painPointState;
            break;
        }
        this.setState({
            empathylist : empathyState
        })
    }
    deletePopupButton(type,index){
        switch(type){           
            case "painpoints":
                let empathyState = [...this.state.empathylist]
                if(index !== null){
                    if(empathyState[index].id != ""){
                        empathyState[index].action = "delete";
                    }else {
                        empathyState.splice(index,1);
                    }
                }
                this.setState({
                    empathylist : empathyState,
                    selectedPainpointIndex : null
                })
            break;
        }
    }
    addPainPointHandler = () => {
        let empathyState = [...this.state.empathylist];
        empathyState.push({
            action: "add",
            id: "",
            paintpoint_title : "",
            paintpoint_description : EditorState.createEmpty()
        });
        this.setState({
            empathylist : empathyState
        })       
    }
    selectPainpointForDelete(ind){
        this.setState({
            selectedPainpointIndex : ind
        })
    }
    addNewSection = (i) => {
        const newSection = {
            title: "Add Title",
            desc: "Add description",
            newSection: true,
            SectionCategoryId: 0,
            SectionId: 0
        }
        let notes = [...this.state.selectedStakeholdersNotesForInterview]
        notes[i].detailInfo.push(newSection)   
        this.setState({selectedStakeholdersNotesForInterview: notes })
    }
    doToggleStackHolders = (stkid, name) => {
        this.setState({SelectedStkName: name})
        this.props.fetchEmpathyNotesStkDesc(this.state.dtId,this.state.ProjectVersionId,this.state.epicId,this.state.EpicVersionId,stkid)
    }
    doSaveText = (ind,key) => {
        const addData = [...this.state.StackHolderEmpathyMap]
        const newData = {
            MappingText: addData[ind].Sections[key].Mapping.length+1,
            MappingDetailsText: this.state.fixedSectionState,
            MappingId: 0,
            MappingOrderOfInsertion: (addData[ind].Sections[key].Mapping.length+1).toString()
        }
        if(addData[ind].Sections[key].Mapping[0].MappingDetailsText == null){
            addData[ind].Sections[key].Mapping[0].MappingDetailsText = this.state.fixedSectionState;
        } else {
            addData[ind].Sections[key].Mapping = [...addData[ind].Sections[key].Mapping, newData]
        }
        this.setState({
            StackHolderEmpathyMap : addData
        }, () => {
            this.setState({fixedSectionState : "", newlyAddedFixedSectionItems: []});
        });
    }
    getText = (index,text) => {
        this.setState({
            fixedSectionState: text, 
            isUpdateing: true, 
            fixedSectionTextIndex: index, 
            newlyAddedFixedSectionItems:[]
        })
    }
    onFixedSectionStateChange = (e) => {
        this.setState({
            fixedSectionState : e.target.value
        });
    };
    doUpdateText = (ind,key) => {
        const updateData = [...this.state.StackHolderEmpathyMap]
        updateData[ind].Sections[key].Mapping[this.state.fixedSectionTextIndex].MappingDetailsText = this.state.fixedSectionState;
        this.setState({
            StackHolderEmpathyMap : updateData
        }, () => {
            this.setState({fixedSectionState : "",isUpdateing: false});
        });
    }
    addAnother = (ind, key) => {
        const addAnotherData = [...this.state.StackHolderEmpathyMap]        
        const newData = {
            MappingText: addAnotherData[ind].Sections[key].Mapping.length+1,
            MappingDetailsText: this.state.fixedSectionState,
            MappingId: 0,
            MappingOrderOfInsertion: (addAnotherData[ind].Sections[key].Mapping.length+1).toString()
        }
        const newData1 = {
            MappingText: this.state.newlyAddedFixedSectionItems.length+1,
            // MappingText: addAnotherData[ind].Sections[key].Mapping.length+1,
            MappingDetailsText: this.state.fixedSectionState,
            MappingId: 0,
            MappingOrderOfInsertion: (addAnotherData[ind].Sections[key].Mapping.length+1).toString(),
            open: false
        }

        // addAnotherData[ind].Sections[key].Mapping = [...addAnotherData[ind].Sections[key].Mapping, newData]
        
        if(addAnotherData[ind].Sections[key].Mapping[0].MappingDetailsText == null){
            addAnotherData[ind].Sections[key].Mapping[0].MappingDetailsText = this.state.fixedSectionState;
        } else {
            addAnotherData[ind].Sections[key].Mapping = [...addAnotherData[ind].Sections[key].Mapping, newData]
        }

        this.setState({
            StackHolderEmpathyMap : addAnotherData,
            newlyAddedFixedSectionItems: [...this.state.newlyAddedFixedSectionItems, newData1]
        }, () => {
            this.setState({fixedSectionState : ""});
        });
    }
    selectStackholderForInterview = (i) => {
        this.setState({selectedStackHolderForInterview: i})
    } 
    clearAllText = () => {
        this.setState({fixedSectionState: "", isUpdateing: false})
    }
    selectText = (e) => {
        const selection = e.target.value.substring(e.target.selectionStart,e.target.selectionEnd);
    }
    addStages = (outerId) => {
        const newStage = {
            StageId: 0,
            // StageName: `stage ${this.state.lifecycleData[outerId].Stages.length + 1}`,
            StageName: "Enter Stage Name",

            SequenceNumber:this.state.lifecycleData[outerId].Stages.length + 1,
            SubStages: [
                {
                    SubStageId: 1,
                    SequenceNumber:1,
                    SubStageName: `sub-stage 1`,
                    Categories: _.cloneDeep(this.state.LifecycleCategories)
                }
            ]
        }
        const addNewStage = [...this.state.lifecycleData]
        addNewStage[outerId].Stages = [...addNewStage[outerId].Stages, newStage] 
        this.setState({lifecycleData: addNewStage})
    }
    removeStages = (outerId) => {
        if(this.state.selectedStage !== null){   
            const updatedData = [...this.state.lifecycleData]
            const data = updatedData.map((d,ind) => ind == outerId ? {...d, Stages: d.Stages.filter((item,i) => i !== this.state.selectedStage)} : d)
            this.setState({lifecycleData: data}, () => this.setState({selectedStage: null}));
        } else { 
            alert("Select a stage first.")
        }
    }
    updateStageName = (event,id,outerId) => {
        const updateStage = [...this.state.lifecycleData]
        updateStage[outerId].Stages[id].StageName = event;
        this.setState({lifecycleData: updateStage},() => {
            console.log("stage name updated ", this.state.lifecycleData)
        })
    }
    selectStage = i => {
        console.log("selectedStage",i)
        this.setState({selectedStage: i})
    }
    addSubStages = (outerId) => {
        if(this.state.selectedStage !== null){
            const data = [...this.state.lifecycleData]            
            const obj1 = data.map((item,i) => {
                if(i !== outerId){
                    return item;
                }
                return {
                    ...item,
                    Stages: item.Stages.map((s, si) => {
                        if(si !== this.state.selectedStage) {
                            return s;
                        }
                        return {
                            ...s,
                            SubStages: [...s.SubStages, 
                                {
                                    SubStageId: 0,
                                    SubStageName: `sub-stage ${s.SubStages.length+1}`,
                                    SequenceNumber: s.SubStages.length+1,
                                    Categories: _.cloneDeep(this.state.LifecycleCategories)
                                }
                            ]
                        }
                    })
                }
            })

            console.log("add sub stage",obj1)

            // const obj3 = this.state.lifecycleData.filter((item, i) => i == this.state.selectedStage)
            // this.setState({lifecycleData:[...obj1], selectedSubstage: obj3[0].SubStages})
            this.setState({lifecycleData:obj1})
            
        } else {
            alert("Please select a stage.")
        }
    }
    selectSubstage = (substageInd, stageInd) => {
        this.setState({selectedSubstage : substageInd, selectedStage: stageInd})
    }
    removeSubStages = (outerId) => {
        if(this.state.selectedSubstage !== null){
            const obj4 = this.state.lifecycleData.map((item,i) => {
                if(i !== outerId) {
                    return item;
                }
                return {
                    ...item,
                    Stages: item.Stages.map((s,i) => {
                        if(i !== this.state.selectedStage){
                            return s;
                        } 
                        return {
                            ...s,
                            SubStages: s.SubStages.filter((ss,i) => i !== this.state.selectedSubstage)
                        }
                    })
                }
            })
            // data.map(datum => [1, 2].include(datum.id) ? { ...datum, subStage: datum.subStage.slice(0, -1) } : datum)
            // const obj4 = this.state.lifecycleData.map((item,i) => outerId {this.state.selectedStage} == i ? { ...item, Stages: item.Stages.filter((item,i) => i !== this.state.selectedSubstage) } : item)
            this.setState({lifecycleData: [...obj4]}, () => this.setState({selectedStage: null, selectedSubstage: null}))
        } else {
            alert("Please select a sub stage")
        }
    }
    updateSubStageName = (event,stageInd, substageInd, outerId) => {
        const updateSubStage = [...this.state.lifecycleData]
        updateSubStage[outerId].Stages[stageInd].SubStages[substageInd].SubStageName = event.target.value;
        this.setState({lifecycleData: updateSubStage})
        console.log('updateSubStage',updateSubStage)
    }
    updateActivities = (event,stageInd,subStageInd,activityIndex, outerId,catTxtInd) => {
        const updateActivities = [...this.state.lifecycleData]
        updateActivities[outerId].Stages[stageInd].SubStages[subStageInd].Categories[activityIndex].CategoryText[catTxtInd].Text = event.target.innerHTML;
        this.setState({lifecycleData: updateActivities})
    }
    updateTouchpoints = (event,stageInd,subStageInd,touchpointIndex,outerId,catTxtInd) => {
        const updateTouchpoints = [...this.state.lifecycleData]
        updateTouchpoints[outerId].Stages[stageInd].SubStages[subStageInd].Categories[touchpointIndex].CategoryText[catTxtInd].Text = event;
        this.setState({lifecycleData: updateTouchpoints})
    }
    updatePainpoints = (event,stageInd,subStageInd,painpointIndex,outerId,catTxtInd) => {
        const updatePainpoints = [...this.state.lifecycleData]
        updatePainpoints[outerId].Stages[stageInd].SubStages[subStageInd].Categories[painpointIndex].CategoryText[catTxtInd].Text = event;
        this.setState({lifecycleData: updatePainpoints})
    }
    updateOpportunities = (event,stageInd,subStageInd,oppertunityIndex,outerId,catTxtInd) => {
        const updateOpportunities = [...this.state.lifecycleData]
        updateOpportunities[outerId].Stages[stageInd].SubStages[subStageInd].Categories[oppertunityIndex].CategoryText[catTxtInd].Text = event;
        this.setState({lifecycleData: updateOpportunities})
    }
    lifecycleSaveBtn = () => {
        this.setState({
            lifecycleSaveBtnStatus: true,
            empathyMapSaveBtnStatus: false,
            empathyNotesSaveBtnStatus: false,
            personaSaveBtnStatus: false 
        })
    }
    empathyMapSaveBtn = () => {

        this.setState({
            lifecycleSaveBtnStatus: false,
            empathyMapSaveBtnStatus: true,
            empathyNotesSaveBtnStatus: false,
            personaSaveBtnStatus: false 
        })
    }
    empathyNotesSaveBtn = () => {

        this.setState({
            lifecycleSaveBtnStatus: false,
            empathyMapSaveBtnStatus: false,
            empathyNotesSaveBtnStatus: true,
            personaSaveBtnStatus: false 
        })
    }
    personaSaveBtn = () => {

        this.setState({
            lifecycleSaveBtnStatus: false,
            empathyMapSaveBtnStatus: false,
            empathyNotesSaveBtnStatus: false,
            personaSaveBtnStatus: true 
        })
    }
    addCommentCol = (index,outerId) => {
        const newCommentCol = {
            StageId: 0,
            StageName: null,
            commentCol: true?1:0,
            disableAddNewColBtn: true?1:0,
            SequenceNumber:1,
            SubStages: []

            //     {
            //         SubStageId: 1,
            //         SubStageName: null,
            //         SequenceNumber:1,
            //         Categories: []

            //         // Categories: _.cloneDeep(this.state.LifecycleCategories)
            //     }
            // ]
        }

        let d = [...this.state.lifecycleData]
        d[outerId].Stages.splice(index+1, 0, newCommentCol)
        d[outerId].Stages[index].disableAddNewColBtn = true;
        console.log("lifecycle Daata",d)
        this.setState({lifecycleData: d})
    }
    dragStakeholder = (e,item) => {
        const i = JSON.stringify(item)
        e.dataTransfer.setData("draggedStk", i);
        this.setState({draggedStakeholder: item})
    }
    dropStakeholder = (e, stageInd,subStageInd,outerId) => {
        const dragImpactor = JSON.parse(e.dataTransfer.getData("draggedStk"));
        
        const data = [...this.state.lifecycleData]

        const impactorData = {
            Id: dragImpactor.StakeHolderId,
            ImagePath: dragImpactor.Image
        }

        const impactorIndex = data[outerId].Stages[stageInd].SubStages[subStageInd].Categories.findIndex(d => d.CategoryName == "Impactor")

        let impactors = data[outerId].Stages[stageInd].SubStages[subStageInd].Categories[impactorIndex].CategoryText

        if(impactors.length == 0){
            data[outerId].Stages[stageInd].SubStages[subStageInd].Categories[impactorIndex].CategoryText = [...data[outerId].Stages[stageInd].SubStages[subStageInd].Categories[impactorIndex].CategoryText, impactorData] 
        } 
        else {
            const a = impactors.some(d => d.Id == impactorData.Id)
            if(!a){
                data[outerId].Stages[stageInd].SubStages[subStageInd].Categories[impactorIndex].CategoryText = [...data[outerId].Stages[stageInd].SubStages[subStageInd].Categories[impactorIndex].CategoryText, impactorData] 
            }
        }

        this.setState({lifecycleData: data},() => {
            console.log("this.state.lifecycleData",this.state.lifecycleData)
        })
        
    } 
    dropStakeholderInimpactee = (e,stageInd,subStageInd,outerId) => {
        const dragImpactee = JSON.parse(e.dataTransfer.getData("draggedStk"));
        // const dragImpactee = {...this.state.draggedStakeholder}

        const data = [...this.state.lifecycleData]
        
        const impacteeData = {
            Id: dragImpactee.StakeHolderId,
            ImagePath: dragImpactee.Image
        }
        const impacteeIndex = data[outerId].Stages[stageInd].SubStages[subStageInd].Categories.findIndex(d => d.CategoryName == "Impactee")        
        
        const impactee = data[outerId].Stages[stageInd].SubStages[subStageInd].Categories[impacteeIndex].CategoryText

        if(impactee.length == 0){
            data[outerId].Stages[stageInd].SubStages[subStageInd].Categories[impacteeIndex].CategoryText = [...data[outerId].Stages[stageInd].SubStages[subStageInd].Categories[impacteeIndex].CategoryText, impacteeData] 
        } 
        else {
            const a = impactee.some(d => d.Id == impacteeData.Id)
            if(!a){
                data[outerId].Stages[stageInd].SubStages[subStageInd].Categories[impacteeIndex].CategoryText = [...data[outerId].Stages[stageInd].SubStages[subStageInd].Categories[impacteeIndex].CategoryText, impacteeData] 
            }
        }

        this.setState({lifecycleData: data},() => {
            this.setState({draggedStakeholder: {} })
            console.log("this.state.lifecycleData",this.state.lifecycleData)
        })
    } 
    selectedText = () =>  {
        if (window.getSelection) {
            const txt = window.getSelection().toString();
            this.setState({
                selectedTxt: txt
            })
        }
    }
    dragSelectedText = (ev) => {
        if(this.state.selectedTxt !== ""){
            ev.dataTransfer.setData("text", this.state.selectedTxt);
        }
    }
    dropSelectedText = (ev,ind,section) => {
        ev.preventDefault();
        if(this.state.selectedTxt !== ""){
            const selectedText = ev.dataTransfer.getData("text");
            const addData1 = [...this.state.StackHolderEmpathyMap]
            const key = addData1[ind].Sections.map(i=>i.SectionCategoryTitle).indexOf(section)
            const newData1 = {
                MappingText: addData1[ind].Sections[key].Mapping.length+1,
                MappingDetailsText: selectedText,
                MappingId: 0,
                MappingOrderOfInsertion: (addData1[ind].Sections[key].Mapping.length+1).toString()
            }
            if(addData1[ind].Sections[key].Mapping[0].MappingDetailsText == null){
                addData1[ind].Sections[key].Mapping[0].MappingDetailsText = selectedText;
            } else {
                addData1[ind].Sections[key].Mapping = [...addData1[ind].Sections[key].Mapping, newData1]
            }

            // addData1[ind].Sections[key].Mapping = [...addData1[ind].Sections[key].Mapping, newData1]
            this.setState({
                StackHolderEmpathyMap : addData1
            }, () => {
                this.setState({selectedTxt : ""});
            });
        }
    }
    deleteEmpathyMap = (EmpathyMapId) => {
        if(window.confirm("Are you sure, you want to delete it ?")){
            axios.get(config.laravelBaseUrl+`deleteEmpathyMap/${this.state.dtId}/${this.state.ProjectVersionId}/${this.state.epicId}/${this.state.EpicVersionId}/${EmpathyMapId}`,{
                headers: {
                    "authorization": "Bearer " + sessionStorage.getItem("userToken")
                }
            }).then((response) => {
                responseMessage("Success", response.data.message, "");
                this.getAllEmpathyMaps();
            }).catch(err => {
                console.log("Error",err)
            })
        }
    }
    addNewEmpathyMap = () => {
        const newEmpathyMapData = {
            EmpathyMapId: 0,
            MapName: `Empathy Map ${this.state.StackHolderEmpathyMap.length + 1}`,
            Links: [],
            Sections: _.cloneDeep(this.state.EmpathyMapSections)
        }

        this.setState({StackHolderEmpathyMap : [...this.state.StackHolderEmpathyMap, newEmpathyMapData]})
    }
    duplicateEmpathyMap = (item) => {        
        let newEmap = _.cloneDeep(item);
        let allEmap = [...this.state.StackHolderEmpathyMap];
        const updateId = newEmap.Sections.map(d => {
            return {
                ...d,
                Mapping: d.Mapping.map(j => {
                    return {
                        ...j,
                        MappingId: 0

                    }
                })
            }
        })
        newEmap.EmpathyMapId = 0;
        // newEmap.Links = [];
        newEmap.Sections = updateId;

        allEmap.push(newEmap)

        this.setState({
            StackHolderEmpathyMap : allEmap
        })

    }
    fetchEmpathyLifeCycle = (id) => {
        axios.get(config.laravelBaseUrl+`getEmpathyLifeCycle/${this.state.dtId}/${this.state.ProjectVersionId}/${this.state.epicId}/${this.state.EpicVersionId}/${id}`, {
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        }).then((res) => {
            this.setState({lifecycleData: res.data.data.Stages, lifecycleIdForDelete: res.data.data.LifeCycleId})
        })
    }
    fetchDtNoiStkhldrDetail = (item) => {
        this.setState({selectedDtNoiStk : this.props.StackHolder.find(d => item.Id == d.StakeHolderId)})
        this.props.fetchDtNoiStkhldrDetail(item.Id)

        // axios.get(config.laravelBaseUrl+`getDtNoiDetailForStakeholder/${item.Id}`, {
        //     headers: {
        //         "authorization": "Bearer " + sessionStorage.getItem("userToken")
        //     }
        // }).then((res) => {
        //     console.log(" fetchDtNoiStkhldrDetail",res.data.data)
        // })
    }
    deleteLifecycle = (lifecycleid) => {
        if(window.confirm("Are you sure, you want to delete it ?")){
            
                axios.get(config.laravelBaseUrl+`deleteLifeCycle/${this.state.dtId}/${this.state.ProjectVersionId}/${this.state.epicId}/${this.state.EpicVersionId}/${lifecycleid}`, {
                    headers: {
                        "authorization": "Bearer " + sessionStorage.getItem("userToken")
                    }
                }).then((res) => {
                    responseMessage("Success", res.data.message, "");
                    this.setState({lifecycleIdForDelete: "", lifecycleData:[]})
                    this.props.fetchAllEmpathyLifeCycle(this.state.dtId,this.state.ProjectVersionId,this.state.epicId,this.state.EpicVersionId)
                })
            
        }
    }
    deleteStakeholderInterviewStakeholderHandler = (stakeholder) => {
        if(window.confirm("Are you sure, you want to delete all notes for this stakeholder ?")){
            this.props.deleteEmpathyNotesStakeHolders(this.state.dtId,this.state.ProjectVersionId,this.state.epicId,this.state.EpicVersionId,stakeholder.stakeholderId)
            let notes = [...this.state.selectedStakeholdersNotesForInterview]
            let stakeHolders = [...this.state.selectedStakeholdersForInterview]
            stakeHolders = stakeHolders.filter(stk => stk.stakeholderId != stakeholder.stakeholderId);
            notes = notes.filter((note)=>note.stakeholderId != stakeholder.stakeholderId);
            let selecStake = this.state.selectedStakeholders.filter(stk=> stk.StakeHolderId != stakeholder.stakeholderId);
            this.setState({
                selectedStakeholdersNotesForInterview : notes,
                selectedStakeholdersForInterview : stakeHolders,
                selectedStakeholders : selecStake
            })
        }
    }
    addNewLifecycle = () => {

        const addLifecycle = {
            LifeCycleId: 0,
            LifeCycleName:`LifeCycle ${this.state.lifecycleData.length + 1}`,
            LifeCycleDescription: "description",
            Stages: [
                {
                    StageId: 0,
                    StageName:"Enter Stage Name",
                    commentCol: false?1:0,
                    disableAddNewColBtn: false?1:0,
                    SequenceNumber:1,
                    SubStages:[
                        {
                            SubStageId: 0,
                            SubStageName: "sub stage 1",
                            SequenceNumber:1,
                            Categories: _.cloneDeep(this.state.LifecycleCategories)
                        }
                    ]
                }
            ]
            
        }
        this.setState({lifecycleData: [...this.state.lifecycleData, addLifecycle]})
    }
    currentSelectedEmpathyMapHandler = (item,ind) => {
        this.setState({currentSelectedEmpathyMap : _.cloneDeep(item), currentSelectedEmpathyMapInd : ind})
    }
    onSelectStkForLinkEmpMap = (e, StakeholderId, selectAll) => {
        let Emap = {...this.state.currentSelectedEmpathyMap};
        if(e.target.checked == true){
            if(selectAll == true){
                Emap.Links = [];
                for(let stakeholder of this.state.StkHolderForLinkEmpathyMap){
                    Emap.Links.push({
                        StakeholderId : stakeholder.stakeholderId
                    })
                }
            }else{
                if(!Emap.Links.map(stk=>stk.StakeholderId).includes(StakeholderId)){
                    Emap.Links.push({
                        StakeholderId : StakeholderId
                    })
                }
            }
        }else{
            if(selectAll == true){
                Emap.Links = [];
            }else{
                let ind = Emap.Links.map(stk=>stk.StakeholderId).indexOf(StakeholderId)
                if(ind != -1){
                    Emap.Links.splice(ind,1)
                }
            }
        }
        this.setState({
            currentSelectedEmpathyMap : Emap
        })


        // const { value, checked } = e.target;

        // console.log("Checked",checked,ind)

        // const selctedStk = {
        //     StakeholderId: value,
        // };
        // const data = [...this.state.StackHolderEmpathyMap]
        // const aa = data.map((d,i) => {
        //     if(ind == i){
        //         if(checked){
        //             return {
        //                 ...d,
        //                 Links: d.Links.concat(selctedStk)
        //             }
        //         } else {
        //             return {
        //                 ...d,
        //                 Links: d.Links.filter((el) => el.StakeholderId !== value)
        //             }
        //         }
        //     } else {
        //         return d;
        //     }
        // })
        // this.setState({StackHolderEmpathyMap: aa})
        
        // console.log(value,"hola",data[0].Links.some(d => d.StakeholderId == value))
        // this.setState((prevState) => ({
        // SelectStkForLinkEmpMap: checked
        //     ? prevState.SelectStkForLinkEmpMap.concat(selctedStk)
        //     : prevState.SelectStkForLinkEmpMap.filter((el) => el.StakeholderId !== value),
        // }));
        
        
        // if(e.target.checked){
        //     const selctedStk = {
        //         StakeholderId : e.target.value
        //     }
        //     this.setState({SelectStkForLinkEmpMap: [...this.state.SelectStkForLinkEmpMap, selctedStk]}, () => {
        //         console.log("checked",this.state.SelectStkForLinkEmpMap)
        //     })
        // } else {
        //     const data1 = [...this.state.SelectStkForLinkEmpMap]
        //     this.setState({SelectStkForLinkEmpMap : data1.filter(el => el.StakeholderId !== e.target.value)}, () => {
        //         console.log("notchecked",this.state.SelectStkForLinkEmpMap)
        //     })
        // }
    }
    onSaveSelectStkForLinkEmpMap = (ind) => {
        const allEmpathyMap = [...this.state.StackHolderEmpathyMap]
        allEmpathyMap[this.state.currentSelectedEmpathyMapInd] = _.cloneDeep(this.state.currentSelectedEmpathyMap)
        this.setState({
            StackHolderEmpathyMap : allEmpathyMap
        }, () => {
            this.setState({fixedSectionState : "", newlyAddedFixedSectionItems: [], SelectStkForLinkEmpMap:[]});
        });
    }
    createCjm = (id) => {
        this.props.createCustomerJourneyMap(id)
    }
    viewCjm = (id) => {
        this.props.fetchCustomerJourneyMap(0,this.state.epicId,id)
    }
    createDuplicateLifecycle = (item) => {
        const duplicateLifecycle = _.cloneDeep(item)
        let allLs = [...this.state.lifecycleData];
        
        const updateId = duplicateLifecycle.Stages.map(d => {
            return {
                ...d,
                StageId: 0,
                SubStages: d.SubStages.map(j => {
                    return {
                        ...j,
                        SubStageId: 0

                    }
                })
            }
        })
        duplicateLifecycle.LifeCycleId = 0;
        duplicateLifecycle.Stages = updateId;

        allLs.push(duplicateLifecycle)

        this.setState({lifecycleData : allLs})

    }
    addNewLine = (stageInd,subStageInd,activityIndex,outerId) => {
        const addNewLine = [...this.state.lifecycleData]
        const length = addNewLine[outerId].Stages[stageInd].SubStages[subStageInd].Categories[activityIndex].CategoryText.length+1
        const newData = {
            SequenceNumber:length,
            Text: `Enter some text ${length}`
        }
        addNewLine[outerId].Stages[stageInd].SubStages[subStageInd].Categories[activityIndex].CategoryText = [...addNewLine[outerId].Stages[stageInd].SubStages[subStageInd].Categories[activityIndex].CategoryText, newData];
        this.setState({lifecycleData: addNewLine})   
    }

    removeLifecycle = (outerId) => {
        if(window.confirm("Are you sure, you want to delete it ?")){
            const removels = [...this.state.lifecycleData]
            this.setState({lifecycleData : removels.filter((d,i) => outerId != i)})
    
        }
    }
    removeEmpathyMap = (ind) => {
        if(window.confirm("Are you sure, you want to delete it ?")){
            const removeEm = [...this.state.StackHolderEmpathyMap]
            this.setState({StackHolderEmpathyMap : removeEm.filter((d,i) => ind != i)})
        }
    }

    toggleClass = () => {
        if(this.state.showClass){
            this.setState({showClass: false})
        } else {
            this.setState({showClass: true})
        }
    }
    closePanel = () => {
        this.setState({showClass: false})
    }
    removeLifecycleStakeholder = (e,Id,stgInd,subStgInd,catInd,catTextInd,outerId,type) => {
        if(e.button == 2 && Id !== ""){
            const data = [...this.state.lifecycleData]
            const removeStakeholder = data.map((d,i) => {
                if(i == outerId){
                    return {
                        ...d,
                        Stages: d.Stages.map((d1,i1) => {
                            if(i1 == stgInd){
                                return {
                                    ...d1,
                                    SubStages: d1.SubStages.map((d2,i2) => {
                                        if(i2 == subStgInd){
                                            return{
                                                ...d2,
                                                Categories: d2.Categories.map((d3,i3) => {
                                                    if(i3 == catInd){
                                                        return {
                                                            ...d3,
                                                            CategoryText: d3.CategoryText.filter(d4 => d4.Id !== Id)
                                                        }
                                                    }
                                                    return d3;
                                                })   
                                            }
                                        }
                                        return d2
                                    })
                                }
                            }
                            return d1;
                        })
                    }
                }
                return d;                
            })
            this.setState({lifecycleData: removeStakeholder})
        }
    }
    removeLine = (e,stgInd, subStgInd, catInd, outerId,catTxtInd) => {
        if(e.target.innerHTML == "" && e.key == "Backspace"){
            const data = [...this.state.lifecycleData]
            const removeLine = data.map((d,i) => {
                if(i == outerId){
                    return {
                        ...d,
                        Stages: d.Stages.map((d1,i1) => {
                            if(i1 == stgInd){
                                return {
                                    ...d1,
                                    SubStages: d1.SubStages.map((d2,i2) => {
                                        if(i2 == subStgInd){
                                            return{
                                                ...d2,
                                                Categories: d2.Categories.map((d3,i3) => {
                                                    if(i3 == catInd){
                                                        return {
                                                            ...d3,
                                                            CategoryText: d3.CategoryText.filter((d4,i4) => d4.SequenceNumber !== catTxtInd)
                                                        }
                                                    }
                                                    return d3;
                                                })   
                                            }
                                        }
                                        return d2
                                    })
                                }
                            }
                            return d1;
                        })
                    }
                }
                return d;                
            })
            console.log("removeLine",removeLine)
            this.setState({lifecycleData: removeLine})
        }
    }
    render(){    
        const filterStackHolderLeftSidebar = this.props.FilterStackHolderLeftSidebar.filter(stk => {
            let stkName = stk.StakeHolderName ? stk.StakeHolderName.toLowerCase() : '';
            return stkName.includes(this.state.searchTerm.toLowerCase());
        })

        return(
            <>
                <DashboardHeader />
                <Loader loading={this.state.loading}/>
                <DesignThinkingEpicDetailScreenWrapper id="wrapper">
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* <!-- Main Content --> */}
                        <div id="content">
                            <EmpathyScreenBreadCrumb dtId={this.state.dtId} epicId={this.state.epicId} epicDetail={this.state.epicDetail} />
                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid container-dashboard">
                                {this.state.successMessage ? <span color={{color:green,width:"100%"}}>{this.state.successMessage}</span>:null}
                                <EmpathyScreenTopbar 
                                    dtProjects={this.props.dtProjects}
                                    dtId={this.state.dtId}
                                    epicId={this.state.epicId}
                                    epicProject={this.state.epicProject} 
                                    saveNotes={this.saveNotes.bind(this)} 
                                />
                                <div className="row">
                                    <div className="dt-screen-main">
                                        <EmpathyScreenLeftSidebar                                            
                                            ptype={this.state.ptype} 
                                            filterVal={this.state.filterVal} 
                                            filterProject={this.filterProject.bind(this)} 
                                            addDrag={this.addDrag.bind(this)} 
                                            getChild={this.getChild.bind(this)}
                                            toggleClass={() => this.toggleClass()}
                                            closePanel={() => this.closePanel()}
                                            decompositionchildData ={this.state.decompositionchildData}
                                            StackHolderLeftSidebar={filterStackHolderLeftSidebar}
                                            dragStakeholder={(e,item) => this.dragStakeholder(e,item)}
                            
                                            searchTerm = {this.state.searchTerm}
                                            searchStakeholdersLeftSidebar = {(e)=>this.setState({ searchTerm : e.target.value })}
                                        />
                                        <EmpathyScreenBodyDetail
                                            removeLine = {(e,stgInd, subStgInd, catInd, outerId,catTxtInd) => this.removeLine(e,stgInd, subStgInd, catInd, outerId,catTxtInd)}
                                            removeLifecycleStakeholder= {(e,Id,stgInd,subStgInd,impactorInd,catTextInd,outerId,type) => this.removeLifecycleStakeholder(e,Id,stgInd,subStgInd,impactorInd,catTextInd,outerId,type)}
                                            currentSelectedEmpathyMap={this.state.currentSelectedEmpathyMap}
                                            currentSelectedEmpathyMapHandler={(item,ind) => this.currentSelectedEmpathyMapHandler(item,ind)}
                                            showClass={this.state.showClass}
                                            removeEmpathyMap={(ind) => this.removeEmpathyMap(ind)}
                                            removeLifecycle={(outerId) => this.removeLifecycle(outerId)}
                                            addNewLine = {(stageInd,subStageInd,activityIndex,outerId) => this.addNewLine(stageInd,subStageInd,activityIndex,outerId)}
                                            StakeHolder={this.props.StackHolder}
                                            dtnoiStakeholder={this.props.dtnoiStakeholder}
                                            createDuplicateLifecycle={(item) => this.createDuplicateLifecycle(item)}
                                            showcjmbtn={this.state.showcjmbtn}
                                            cjmId={this.state.cjmId}
                                            createCjm={(id) => this.createCjm(id)} 
                                            viewCjm={(id) => this.viewCjm(id)}
                                            ProjectId = {this.state.dtId}
                                            ProjectVersionId = {this.state.ProjectVersionId}
                                            EpicId = {this.state.epicId}
                                            EpicVersionId = {this.state.EpicVersionId}
                                            ref={this.child}
                                            onSaveSelectStkForLinkEmpMap={(ind) => this.onSaveSelectStkForLinkEmpMap(ind)}
                                            onSelectStkForLinkEmpMap={(e, ind, selectAll) => this.onSelectStkForLinkEmpMap(e, ind, selectAll)}
                                            StkHolderForLinkEmpathyMap={this.state.StkHolderForLinkEmpathyMap}
                                            addNewLifecycle={() => this.addNewLifecycle()}
                                            deleteLifecycle={(id) => this.deleteLifecycle(id)}
                                            fetchDtNoiStkhldrDetail={(id) => this.fetchDtNoiStkhldrDetail(id)}
                                            fetchEmpathyLifeCycle={(id) => this.fetchEmpathyLifeCycle(id)}
                                            allempathyLifecycle={this.props.allempathyLifecycle}
                                            SelectedStkName={this.state.SelectedStkName}
                                            StkDescOnEmpathyMap={this.props.StkDescOnEmpathyMap}
                                            duplicateEmpathyMap={(item) => this.duplicateEmpathyMap(item)}
                                            addNewEmpathyMap={this.addNewEmpathyMap.bind(this)}
                                            deleteEmpathyMap={(EmpathyMapId) => this.deleteEmpathyMap(EmpathyMapId)}
                                            deleteStakeholderInterviewStakeholderHandler = {this.deleteStakeholderInterviewStakeholderHandler.bind(this)}
                                            handleEmpathyDescriptionChange = {this.handleEmpathyDescriptionChange.bind(this)}
                                            currentStakeholderSelectedForInterview = {this.state.currentStakeholderSelectedForInterview}
                                            selectedStakeholdersForInterview = {this.state.selectedStakeholdersForInterview}
                                            selectedStakeholdersNotesForInterview = {this.state.selectedStakeholdersNotesForInterview}
                                            empathyMap={this.state.empathyMap}                        
                                            removeStakeHolders ={this.removeStakeHolders.bind(this)}
                                            addStakeHolders = {this.addStakeHolders.bind(this)} 
                                            stakeHolders={this.state.stakeHolders} 
                                            editsubTitle = {this.editsubTitle.bind(this)} 
                                            editTitle = {this.editTitle.bind(this)}
                                            previouSubEpic = {this.previouSubEpic.bind(this)} 
                                            nextSubEpic = {this.nextSubEpic.bind(this)} 
                                            showSubEpic={this.state.showSubEpic}  
                                            selectedEpicId = {this.state.epicId}
                                            getEpic = {this.getEpic.bind(this)} 
                                            epicDetail={this.state.epicDetail}
                                            epicList = {this.props.epicList}
                                            epic={this.state.epic}
                                            epicId={this.state.epicId}
                                            addEpic={this.addEpic.bind(this)} 
                                            selectEpic={this.selectEpic.bind(this)}
                                            addSubEpic={this.addSubEpic.bind(this)}
                                            selectSubEpic={this.selectSubEpic.bind(this)}
                                            removeSubEpic={this.removeSubEpic.bind(this)}
                                            removeEpic={this.removeEpic.bind(this)}
                                            stakeHoldersInterviewData={this.state.stakeHoldersInterviewData}
                                            addNewSection={(i) => this.addNewSection(i)}
                                            StackHolderEmpathyMap={this.state.StackHolderEmpathyMap}
                                            selectedStackHolderForEmpathyMap={this.state.selectedStackHolderForEmpathyMap}
                                            doToggleStackHolders={(id,name) => this.doToggleStackHolders(id,name)}
                                            getText={(index,text) => this.getText(index,text)}
                                            getEmpathyNotes={(e,id) => this.getEmpathyNotes(e,id)}
                                            selectedStackHolderForInterview={this.state.selectedStackHolderForInterview}
                                            selectTex={(e) => this.selectText(e)}
                                            EmpathyNotesAllCategory={this.state.EmpathyNotesAllCategory}
                                            addStages={(outerId) => this.addStages(outerId)}
                                            removeStages={(outerId) => this.removeStages(outerId)}
                                            updateStageName={(event,id,outerId) => this.updateStageName(event,id,outerId)}
                                            selectStage={(i) => this.selectStage(i)}
                                            selectedStage={this.state.selectedStage}
                                            lifecycleData={this.state.lifecycleData}
                                            addSubStages={(outerId) => this.addSubStages(outerId)}
                                            selectedSubstage={this.state.selectedSubstage}
                                            selectSubstage={(substageInd, stageInd) => this.selectSubstage(substageInd, stageInd)}
                                            removeSubStages={(outerId) => this.removeSubStages(outerId)}
                                            updateSubStageName={(event,stageInd, substageInd, outerId) => this.updateSubStageName(event,stageInd, substageInd, outerId)} 
                                            updateActivities = {(event,stageInd,subStageInd,activityIndex, outerId,catTxtInd) => this.updateActivities(event,stageInd,subStageInd,activityIndex, outerId,catTxtInd)}
                                            updateTouchpoints = {(event,stageInd,subStageInd,touchpointIndex,outerId,catTxtInd) => this.updateTouchpoints(event,stageInd,subStageInd,touchpointIndex,outerId,catTxtInd)}
                                            updatePainpoints = {(event,stageInd,subStageInd,painpointIndex,outerId,catTxtInd)=> this.updatePainpoints(event,stageInd,subStageInd,painpointIndex,outerId,catTxtInd)}
                                            updateOpportunities = {(event,stageInd,subStageInd,oppertunityIndex,outerId,catTxtInd) => this.updateOpportunities(event,stageInd,subStageInd,oppertunityIndex,outerId,catTxtInd)}
                                            lifecycleSaveBtn={(status) => this.lifecycleSaveBtn(status)}
                                            empathyNotesSaveBtn={(status) => this.empathyNotesSaveBtn(status)}
                                            empathyMapSaveBtn={(status) => this.empathyMapSaveBtn(status)}
                                            personaSaveBtn={(status) => this.personaSaveBtn(status)}
                                            addCommentCol={(index,outerId) => this.addCommentCol(index,outerId)}
                                            dropStakeholder={(e, stageInd,subStageInd,outerId) => this.dropStakeholder(e, stageInd,subStageInd,outerId)}
                                            dropStakeholderInimpactee={(e,stageInd,subStageInd,outerId) => this.dropStakeholderInimpactee(e,stageInd,subStageInd,outerId)}
                                            selectedText={this.selectedText}
                                            dragSelectedText={(e) => this.dragSelectedText(e)}
                                            dropSelectedText={(e,ind,key) => this.dropSelectedText(e,ind,key)}
                                            selectedDtNoiStk={this.state.selectedDtNoiStk}
                                        />  
                                    </div>
                                </div>
                                {/* <!-- /End container-fluid --> */}
                            </div>
                            {/* <!-- End of Main Content --> */}
                        </div>
                        {/* <!-- End of Content Wrapper --> */}
                    </div>
                    <EmpathyMapModellingPopup 
                        doUpdateText={(key,value) => this.doUpdateText(key,value)}
                        isUpdateing={this.state.isUpdateing}
                        fixedSectionState={this.state.fixedSectionState}
                        selectedStackHolderForEmpathyMap={this.state.selectedStackHolderForEmpathyMap}
                        StackHolderEmpathyMap={this.state.StackHolderEmpathyMap}
                        doSaveText={(ind,key) => this.doSaveText(ind,key)}
                        onFixedSectionStateChange={(e) => this.onFixedSectionStateChange(e)}
                        addAnother={(ind,key) => this.addAnother(ind,key)}
                        newlyAddedFixedSectionItems={this.state.newlyAddedFixedSectionItems}
                        // onPainPointChange={this.onPainPointChange.bind(this)} 
                        // // ondescriptionState={this.ondescriptionState.bind(this)} 
                        // addPainPointHandler={this.addPainPointHandler.bind(this)}
                        // // oncommentsState={this.oncommentsState.bind(this)}
                        // painpointsState={this.state.painpointsState} 
                        // commentsState={this.state.commentsState} 
                        // descriptionState={this.state.descriptionState} 
                        // // savePopUpData={this.savePopUpData.bind(this)} 
                        // selectedProcess={this.state.popUpSelectedProcess} 
                        // deletePopupButton={this.deletePopupButton.bind(this)}
                        // selectPainpointForDelete={this.selectPainpointForDelete.bind(this)}
                        clearAllText={() => this.clearAllText()}
                    />
                    <EmpathyModalPopup
                        getVideo={(e) => this.getVideo(e)}
                    />
                    <EmpathyModalPopupAudio
                        getAudio={(e) => this.getAudio(e)}
                    />
                    <EmpathyModalImagePopup
                        getImage={(e) => this.getImage(e)}
                    />
                    <AddStakeHolders 
                        selectStakeholder={(item) => this.selectStakeholder(item)}
                        selectedStakeholders={this.state.selectedStakeholders}
                        StackHolder={this.props.FilterStackHolder}
                        searchStakeholders={this.searchStakeholders.bind(this)}
                    />
                    </DesignThinkingEpicDetailScreenWrapper>
                    {/*<EmpathyScreenNoiModal NetworkOfInfluence={this.state.NetworkOfInfluence}  selectTemplate={this.selectTemplate.bind(this)}  allEpic={this.state.epic} selectedEpic={this.state.parentEpicId}/>
                    */}
                    <AsideComponent />
                    <FooterComponent />
            </>
        );
    }
}
const mapStatetoProps= (state) =>{
    // console.log("state.empathyScreen.allempathyLifecycle",state.empathyScreen.allempathyLifecycle)
    return {
        UserInfo: state.epicScreenData.UserDetail,
        UserProjectDetails : state.epicScreenData.UserProjectDetails,
        NetworkOfInfluence: state.epicScreenData.NetworkOfInfluence,
        // StakeHolder: state.epicScreenData.StakeHolder,

        StackHolder: state.epicScreenData.StakeHolder,
        FilterStackHolder: state.epicScreenData.StakeHolder, 
        FilterStackHolderLeftSidebar: state.epicScreenData.StakeHolder,
        
        allempathyLifecycle: state.empathyScreen.allempathyLifecycle.data,
        StkDescOnEmpathyMap: state.empathyScreen.StkDescOnEmpathyMap,
        dtnoiStakeholder: state.empathyScreen.dtnoiStakeholder ? state.empathyScreen.dtnoiStakeholder : [],

        dtProjects: state.epicScreenData.dtProjects,
        epic: state.epicScreenData.epic.EPic ? state.epicScreenData.epic.EPic : [],
        checkNoi: state.epicScreenData.checkNoi,
        versionHistoryNo: state.epicScreenData.versionHistoryNo,
        epicList: state.epicScreenData.epicList ? state.epicScreenData.epicList : []
    }
}
export default connect(mapStatetoProps,{
    fetchBenchmarkProjectsWithDomains, 
    fetchDecompositionProjects, 
    fetchKpisControls,
    fetchUserDetails,
    fetchOtherProjectsOfUser,
    fetchNetworkOfInfluenceTemplates,
    fetchDesignThinkingStakeHolders,
    fetchDesignThinkingProjectDetails,
    fetchEpic,
    fetchEpicVersionHistory,
    saveEpicAction,
    fetchDecompositionProjectsFunctionPhaseLevel,
    doEpicLockUnlock,
    fetchEpicProject,
    fetchAllEpic,
    fetchEmpathyNotesStakeHolders,
    deleteEmpathyNotesStakeHolders,
    fetchEmpathyNotes,
    fetchAllEmpathyLifeCycle,
    saveEmpathyMap,
    deleteEmpathyMap,
    fetchEmpathyNotesStkDesc,
    fetchCustomerJourneyMap,
    createCustomerJourneyMap,
    fetchDtNoiStkhldrDetail
})(EmpathyScreen);
