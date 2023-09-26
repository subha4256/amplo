import React, { Component } from 'react';
import  Loader  from '../Loader';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import { DesignThinkingEpicScreenWrapper } from './Styling/DesignThinkingEpicScreen';
import FooterComponent from "../includes/dashboardFooter/FooterComponent";
import AsideComponent from "../includes/asideComponent/AsideComponent";
import DesignThinkingEpicBreadCrumb from './DesignThinkingEpicBreadCrumb';
import DesignThinkingEpicLeftSidebar from './DesignThinkingEpicLeftSidebar';
import DesignThinkingEpicBody from './DesignThinkingEpicBody';
import DesignThinkingEpicRightSidebar from './DesignThinkingEpicRightSidebar';
import DesignThinkingEpicTopbar from './DesignThinkingEpicTopbar';
import DesignThinkingEpicNoiModal from './DesignThinkingEpicNoiModal';
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
    fetchDtChampion
} from '../../actions/epicScreenActions';
import {errorAlert,responseMessage} from '../../utils/alert';
import { connect } from 'react-redux';
import axios from 'axios';
import { green } from 'color-name';
import { Global } from '../../utils/Env';
const config = require('../../config');

class DesignThinkingEpicScreen extends Component{
    constructor( props ){
        super( props );
        this.state = {
            epic:[],
            parentEpicId:"",
            subEpicId:"",
            dtProjects:{},
            UserInfo:{},
            searchTerm:"",
            UserProjectDetails: [],
            NetworkOfInfluence:[],
            StakeHolder:[],
            FilterStakeHolder:[],
            dtId : this.props.match.params.dtId?this.props.match.params.dtId:0,
            dragValue:{},
            dragchildValue:{},
            successMessage:'',
            checkNoi:'',
            decompositionProjects:[],
            decompositionchildData:[],
            loading:false,
            showClass: false,
            filterVal:'',
            ptype:'',
            versionHistoryNo: 0,
            currentSelectedTemplate : {},
            decompProjectId: "",
            NOISearchTerm : ""
        }
        Global.callback.saveEpicAction_onComplete = (res) => {
            this.getEpicCallback(res);        
        }
        Global.callback.fetchDecompositionProjectsFunctionPhaseLevel_onComplete = (res) => {
            this.getDecomProject(res);        
        }
        Global.callback.fetchEpic_onComplete = (res) => {
            this.fetchEpicCallback(res);        
        }
    }
    fetchEpicCallback(res){
        // this.setState({epic: res.data.EPic})
    }
    getDecomProject(res){
        let jsonObj = {
            projectId: this.state.decompProjectId,
            data: res.data
        }
        this.setState({decompositionchildData:jsonObj})
    }
    getEpicCallback(res){
        this.props.fetchEpic(this.props.match.params.dtId,0,this.state.versionHistoryNo);
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
    componentDidMount() {
        this.props.fetchBenchmarkProjectsWithDomains();
        this.props.fetchDecompositionProjects();
        this.props.fetchKpisControls();
        this.props.fetchOtherProjectsOfUser();
        this.props.fetchUserDetails();
        this.props.fetchNetworkOfInfluenceTemplates();
        this.props.fetchDesignThinkingStakeHolders();
        this.props.fetchDesignThinkingProjectDetails(this.props.match.params.dtId,this.state.versionHistoryNo);
        this.props.fetchEpic(this.props.match.params.dtId,0,this.state.versionHistoryNo);
        this.props.fetchEpicVersionHistory(this.props.match.params.dtId);
        this.props.fetchDtChampion(this.props.match.params.dtId,0)
        
        // axios.get(config.laravelBaseUrl + `getDTChampion/${this.props.match.params.dtId}/0`,{
        //     headers: {
        //         "authorization": "Bearer " + sessionStorage.getItem("userToken")
        //     }
        // }).then(res => {
        //     console.log("getDTChampion",res)
        // })
    } 
    saveEpic(e){
        this.setState({parentEpicId: ""})
        let currentId = this.state.dtId;
        const data = this.props.UserProjectDetails.filter(function (item) {
            return parseInt(item.DTProjectID) == currentId;
        });
        const newData = {
              "DtProjectId":data[0].DTProjectID,
              "Title":data[0].ProjectTitle,
              "Version":data[0].ProjectVersion,
              "VersionStatus":1,
              "Epic":this.state.epic
            } 
        this.props.saveEpicAction(newData);
    }  
    doEpicLockUnlock(e){
        let data = {
            "EpicId":"1",
            "IsUnlocked":e.target.value == 'unlock'?1:0,
            "VersionNo":"1.1",
            "ReasonForNewVersion":"Change Version"
        }
        this.props.doEpicLockUnlock(data)
    }
    filterProject(e,type){
        this.setState({filterVal:e.target.value,ptype:type})
    }   
    showSelectedNoiTemplate = () => {
        let epicdata = [...this.props.epic]; 
        let i = epicdata.map(epic=>epic.id).indexOf(this.state.parentEpicId)
        this.setState({ currentSelectedTemplate :epicdata[i].NOI})
    }
    addDrag(e,domain,projectId){
        let type = ""
        let id = projectId.split("_")
        if(id[0] == "bmproject"){
            type = "BenchmarkingProjects"
        } else if (id[0] == "cmproject"){
            type = "CapabilityModellingProjects"
        } else {
            type = "Kpis"
        }
        const data = {id: domain.id,name:domain.name, type: type}
        this.setState({'dragValue':data});      
    }
    dropEpic = (e, data ) =>{ 
       let epicdata = this.props.epic;
       let payload = [];
      
       payload.push(this.state.dragValue);     
        
        for(let i=0;i<epicdata.length;i++){
            if(epicdata[i].id === data.id){             
                if(epicdata[i].Association){                    
                    epicdata[i].Association.push(this.state.dragValue);
                    const uniques = Object.values(
                        epicdata[i].Association.reduce((a, c) => {
                          a[c.id] = c;
                          return a
                        }, {}))
                        epicdata[i].Association = uniques;  
                }else{
                    epicdata[i].Association = payload;
                }
            }          
        }
        this.setState({epic:epicdata})       
    }
    dropchildEpic = (e,parentEpicId,child) => {

        let epicdata = this.props.epic;
        let payload = [];
         payload.push(this.state.dragValue);

        for(let i=0;i<epicdata.length;i++){
            if(epicdata[i].id == parentEpicId){
                for(let j=0;j<epicdata[i].SubEpic.length;j++){
                    if(epicdata[i].SubEpic[j].id == child.id){
                        if(epicdata[i].SubEpic[j].Association){
                            epicdata[i].SubEpic[j].Association.push(this.state.dragValue);
                            const uniques = Object.values(
                                epicdata[i].SubEpic[j].Association.reduce((a, c) => {
                                    a[c.id + '|' + c.name] = c;
                                    return a
                                }, {}))
                                epicdata[i].SubEpic[j].Association = uniques;     
                        }else{
                        epicdata[i].SubEpic[j].Association = payload;
                        }
                    }
                }
            }
        }
        this.setState({epic:epicdata})

    }
    saveSelectedtemplate = () => {
        let epicdata = [...this.props.epic]; 
        let i = epicdata.map(epic=>epic.id).indexOf(this.state.parentEpicId)
        let id = {...this.state.currentSelectedTemplate}
        if(epicdata[i].NOI){
            if(epicdata[i].NOI.NoiId){
                const noiData = {
                    NoiId: epicdata[i].NOI.NoiId,                    
                    TemplateNoiName:id.Title,
                    TemplateNoiId:id.Id,
                    NoiDetails:epicdata[i].NOI.NoiDetails
                }
                epicdata[i].NOI = noiData
            }
        }else{
            const noiData = {
                NoiId: 0,
                TemplateNoiId:id.Id,
                TemplateNoiName:id.Title
            }
            epicdata[i].NOI = noiData
        }    
        this.setState({
            epic:epicdata,
            currentSelectedTemplate : {}
        })
    }
    selectTemplate = (e,id) => {
        this.setState({
            currentSelectedTemplate : id
        })
    }
    cancelTemplatePopUpHandler = () => {
        this.setState({
            currentSelectedTemplate : {}
        })
    }
    editTitle = (e,id) => {
       let epicdata = this.props.epic;        
        for(let i in epicdata) {
            if(epicdata[i].id == id){
                epicdata[i].name =  e.currentTarget.textContent;
            }              
        } 
        this.setState({epic:epicdata})
    }
    editsubTitle = (e,id,parentEpicId) => {       
        let epicdata = this.props.epic;        
        for(let i in epicdata) {
            if(epicdata[i].id == parentEpicId){
                for(let j=0;j<epicdata[i].SubEpic.length;j++){
                    if(epicdata[i].SubEpic[j].id== id){
                      epicdata[i].SubEpic[j].name =  e.currentTarget.textContent;
                    }
                }
            }              
        } 
        this.setState({epic:epicdata})
    }
    addEpic = ( e )=>{
        let epic      = this.props.epic;
        //if(epic.length>0){

        let epicIndex = parseInt(epic.length)+1;
        epic.push({
            "id":Math.random().toString(36).substring(7),
            "name":"Epic "+epicIndex,
            "Association": []
        })
        this.setState({
            epic: epic
        })
    }
    selectEpic = ( id )=>{
        this.setState({
            parentEpicId: this.state.parentEpicId == id ? "" : id,            
        })
    }
    addSubEpic = (e)=>{
        if(this.state.parentEpicId==""){
           alert('Please select epic first');
        }else{
            let idStr = Math.random().toString(36).substring(7);

            let epic  = this.props.epic;
            for(let i in this.props.epic) {
                
                if(epic[i].id===this.state.parentEpicId){
                    if(!epic[i].SubEpic) {
                        epic[i].SubEpic = [];
                    }
                    let epicSubIndex = parseInt(epic[i].SubEpic.length)+1;
                    epic[i].SubEpic.push({
                        "id":idStr,
                        "name":"SubEpic "+epicSubIndex,
                        "Association": []
                    })
                }
            }
            this.setState({epic: [...epic]})
        }
    } 
    selectSubEpic = (e, parentEpicId, subEpicId)=>{
        this.setState({
            parentEpicId:parentEpicId,
            subEpicId:subEpicId
        })
    }
    removeEpic = (e)=>{
        if(this.state.parentEpicId==""){
            alert('Please expand an epic first');
        }else{
            for(let i in this.props.epic) {
                let epic = this.props.epic;
                if(epic[i].id==this.state.parentEpicId){
                    epic.splice(i,1)
                    this.setState({
                        epic: epic
                    },() => {
                        this.setState({parentEpicId: ""})
                    })
                }
            }
        }
    }
    removeSubEpic = (e)=>{
        if(this.state.subEpicId==""){
            alert('Please select sub epic first');
        }else{
            for(let i in this.props.epic) {
                let epic = this.props.epic;
                if(epic[i].id==this.state.parentEpicId){
                    if(epic[i].hasOwnProperty("SubEpic")){
                        for(let j in this.props.epic[i].SubEpic) {
                            if(epic[i].SubEpic[j].id==this.state.subEpicId){
                                epic[i].SubEpic.splice(j,1)
                            }
                            this.setState({
                                epic: epic
                            })
                        }
                    }
                }
            }
        }
    }
    getChild(data){
        this.setState({decompProjectId: data.projectId})
        this.props.fetchDecompositionProjectsFunctionPhaseLevel(data.projectId)
    }
    searchStakeholders = (e) => {
        const text = e.target.value;
        const regex = new RegExp(text, "i");
        let data = this.props.StakeHolder.filter(word => regex.test(word.StakeHolderName));
        this.setState({FilterStakeHolder: data})
    }
    render(){

        console.log("All_State =>>", this.state)
        console.log("All_Props =>>", this.props)


        
        const NetworkOfInfluence = this.props.NetworkOfInfluence.filter(NOI => {
            let noiName = NOI.Title ? NOI.Title.toLowerCase() : '';
            return noiName.includes(this.state.NOISearchTerm.toLowerCase());
        })
        
        const filterStakeHolder = this.props.FilterStakeHolder.filter(stk => {
            let stkName = stk.StakeHolderName ? stk.StakeHolderName.toLowerCase() : '';
            return stkName.includes(this.state.searchTerm.toLowerCase());
        })

        return(
            <>
              <DashboardHeader />
              <Loader loading={this.state.loading}/>
              <DesignThinkingEpicScreenWrapper id="wrapper">
                {/* <!-- Content Wrapper --> */}
                <div id="content-wrapper" className="d-flex flex-column">
                  {/* <!-- Main Content --> */}
                  <div id="content">
                    <DesignThinkingEpicBreadCrumb />
                    {/* <!-- Begin Page Content --> */}
                    <div className="container-fluid container-dashboard">
                    {this.state.successMessage ? <span color={{color:green,width:"100%"}}>{this.state.successMessage}</span>:null}
                      <DesignThinkingEpicTopbar dtProjects={this.props.dtProjects} saveEpic={this.saveEpic.bind(this)} />
                      <div className="row">
                        <div className="dt-screen-main">
                          <DesignThinkingEpicLeftSidebar
                            toggleClass={() => this.toggleClass()}
                            closePanel={() => this.closePanel()} 
                            ptype={this.state.ptype} 
                            filterVal={this.state.filterVal} 
                            filterProject={this.filterProject.bind(this)} 
                            addDrag={this.addDrag.bind(this)}  
                            getChild={this.getChild.bind(this)} 
                            decompositionchildData ={this.state.decompositionchildData} 
                          />
                          <DesignThinkingEpicBody 
                            showClass={this.state.showClass}
                            editsubTitle= {this.editsubTitle.bind(this)} 
                            editTitle = {this.editTitle.bind(this)} 
                            dropEpic={this.dropEpic.bind(this)} 
                            dropchildEpic={this.dropchildEpic.bind(this)} 
                            epic={this.props.epic} 
                            epicId={this.props.epicId}
                            subEpicId={this.state.subEpicId}
                            dtId={this.state.dtId} 
                            parentEpicId={this.state.parentEpicId}
                            addEpic={this.addEpic.bind(this)} 
                            selectEpic={this.selectEpic.bind(this)} 
                            addSubEpic={this.addSubEpic.bind(this)} 
                            selectSubEpic={this.selectSubEpic.bind(this)} 
                            removeSubEpic={this.removeSubEpic.bind(this)} 
                            removeEpic={this.removeEpic.bind(this)}
                            doEpicLockUnlock={(e) => this.doEpicLockUnlock(e)}
                          />
                          <DesignThinkingEpicRightSidebar  
                            DtChampion={this.props.DtChampion}
                            UserInfo={this.props.UserInfo} 
                            UserProjectDetails={this.props.UserProjectDetails}  
                            StackHolder={filterStakeHolder} 
                            epicdata={this.props.checkNoi} 
                            // searchStakeholders={this.searchStakeholders.bind(this)}
                            selectedEpic={this.state.parentEpicId}
                            showSelectedNoiTemplate = {this.showSelectedNoiTemplate.bind(this)}

                            searchTerm = {this.state.searchTerm}
                            searchStakeholders = {(e)=>this.setState({ searchTerm : e.target.value })}

                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DesignThinkingEpicScreenWrapper>
              <DesignThinkingEpicNoiModal 
                NetworkOfInfluence={NetworkOfInfluence}  
                NOISearchTerm = {this.state.NOISearchTerm}
                setNOISearchTerm = {(value)=>this.setState({ NOISearchTerm : value })}
                selectTemplate={this.selectTemplate.bind(this)}  
                allEpic={this.props.epic} 
                selectedEpic={this.state.parentEpicId}
                saveSelectedtemplate = {this.saveSelectedtemplate.bind(this)}
                cancelTemplatePopUpHandler = {this.cancelTemplatePopUpHandler.bind(this)}
                currentSelectedTemplate = {this.state.currentSelectedTemplate}
              />
              <AsideComponent />
              <FooterComponent />
            </>
        );
    }
}
const mapStatetoProps= (state) =>{
    return {
        UserInfo: state.epicScreenData.UserDetail,
        UserProjectDetails : state.epicScreenData.UserProjectDetails,
        NetworkOfInfluence: state.epicScreenData.NetworkOfInfluence,
        StakeHolder: state.epicScreenData.StakeHolder,
        FilterStakeHolder: state.epicScreenData.StakeHolder,
        dtProjects: state.epicScreenData.dtProjects,
        epic: state.epicScreenData.epic.EPic ? state.epicScreenData.epic.EPic : [],
        checkNoi: state.epicScreenData.checkNoi,
        versionHistoryNo: state.epicScreenData.versionHistoryNo,
        DtChampion: state.epicScreenData.DtChampion?state.epicScreenData.DtChampion:[]
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
    fetchDtChampion
})(DesignThinkingEpicScreen);

