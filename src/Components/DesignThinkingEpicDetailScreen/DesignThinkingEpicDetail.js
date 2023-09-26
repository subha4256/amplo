import React, { Component } from 'react';
import  Loader  from '../Loader';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import { DesignThinkingEpicDetailScreenWrapper } from './Styling/DesignThinkingEpicDetailScreen'
import FooterComponent from "../includes/dashboardFooter/FooterComponent";
import AsideComponent from "../includes/asideComponent/AsideComponent";
import DesignThinkingEpicDetailBreadCrumb from './DesignThinkingEpicDetailBreadCrumb';
import DesignThinkingEpicDetailLeftSidebar from './DesignThinkingEpicDetailLeftSidebar';
import DesignThinkingEpicBodyDetail from './DesignThinkingEpicBodyDetail';
import DesignThinkingEpicDetailTopbar from './DesignThinkingEpicDetailTopbar';
import DesignThinkingEpicDetailNoiModal from './DesignThinkingEpicDetailNoiModal';
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
    fetchAllEpic,
    fetchEpicProject,
    fetchEpicSubEpicDeatils
} from '../../actions/epicScreenActions';
import {errorAlert,responseMessage} from '../../utils/alert';
import { connect } from 'react-redux';
import axios from 'axios';
import { green } from 'color-name';
import { func } from 'prop-types';
import { Global } from '../../utils/Env';
const config = require('../../config');



class DesignThinkingEpicDetail extends Component{
    constructor( props ){
        super( props );
        this.state = {
            epic:[],
            epicList:[],
            epicProject:[],
            epicDetail:{},
            parentEpicId:"",
            subEpicId:"",
            dtProjects:{},
            UserInfo:{},
            UserProjectDetails: [],
            NetworkOfInfluence:[],
            StackHolder:[],
            dtId : this.props.match.params.dtId?this.props.match.params.dtId:0,
            epicId: this.props.match.params.epicId?this.props.match.params.epicId:0,
            dragValue:{},
            dragchildValue:{},
            successMessage:'',
            showSubEpic:0,
            decompositionchildData:[],
            loading:false,
            filterVal:'',
            ptype:'',
            versionHistoryNo: 0,
            EpicSubepicDetailData: {},
            allEpicData: {},
            showClass: false,
            decompProjectId: "",
            NOISearchTerm : "",
            currentSelectedTemplate : {}
        }
        Global.callback.saveEpicAction_onComplete = (res) => {
            this.getEpicCallback(res);        
        }
        Global.callback.fetchDecompositionProjectsFunctionPhaseLevel_onComplete = (res) => {
            this.getDecomProject(res);        
        }
    }
    getDecomProject(res){
        let jsonObj = {
            projectId: this.state.decompProjectId,
            data: res.data
        }
        this.setState({decompositionchildData:jsonObj})
    }
    getEpicCallback(res){
        this.props.fetchEpic(this.props.match.params.dtId,this.props.match.params.epicId,this.state.versionHistoryNo);
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
        this.props.fetchEpicVersionHistory(this.props.match.params.dtId);
        this.props.fetchEpic(this.props.match.params.dtId,this.props.match.params.epicId,this.state.versionHistoryNo);
        this.props.fetchAllEpic(this.props.match.params.dtId,this.state.versionHistoryNo);
        this.props.fetchEpicProject(this.props.match.params.dtId,this.state.versionHistoryNo);
        this.props.fetchEpicSubEpicDeatils(this.props.match.params.dtId,this.props.match.params.epicId,this.state.versionHistoryNo);
    }

    saveSelectedtemplate = () => {
        let epicdata = [...this.props.epic]; 
        let i = epicdata.map(epic=>epic.id).indexOf(this.state.epicId)
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
    
    cancelTemplatePopUpHandler = () => {
        this.setState({
            currentSelectedTemplate : {}
        })
    }
    selectTemplate = (e,id) => {
        this.setState({
            currentSelectedTemplate : id
        })
    }

    saveEpic(e){
        let currentId = this.state.dtId;
        const data = this.props.UserProjectDetails.filter(function (item) {
            return parseInt(item.DTProjectID) == currentId;
        });
        let currentEpic = this.props.match.params.epicId;
        const filterEpic =  this.props.epic.filter(function(item){
            return item.id == currentEpic
        })

        const newData = {
              "DtProjectId":data[0].DTProjectID,
              "Title":data[0].ProjectTitle,
              "Version":data[0].ProjectVersion,
              "VersionStatus":1,
              "Epic":filterEpic
            }
        this.props.saveEpicAction(newData);
    //     const selfOBj = this;    

    //    await axios.post(config.laravelBaseUrl+'saveEpic', newData, {
    //         headers: {
    //             "authorization": "Bearer " + sessionStorage.getItem("userToken")
    //         }
    //     }).then(function(response){            
    //         responseMessage("Success", response.data.message, "");

    //     });
        


    }    
    filterProject(e,type){
        this.setState({filterVal:e.target.value,ptype:type})
    }  
    addDrag(e,domain,projectId){
        // console.log("projectId 2",projectId)
        
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
    dropEpic = (e, data,type ) =>{   
        let b = '';
        if(type == 1){
            b = "BenchmarkingProjects"; 
        }
        if(type == 2){
            b = "CapabilityModellingProjects"; 
        }
        if(type == 3){
            b = "Kpis"; 
        }

        if(this.state.dragValue.type == b){
            let epicdata = this.props.epic;
            let payload = [];
            payload.push(this.state.dragValue);     
        
            for(let i=0;i<epicdata.length;i++){
                if(epicdata[i].id == data.id){
                //   console.log(epicdata[i].Association);
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
        } else {
            return false;
        }
        
        //console.log(id);
        //console.log(this.state.dragValue);

    }
    dropchildEpic = (e,child,type) => {
        
        let a = '';
        if(type == 1){
            a = "BenchmarkingProjects"; 
        }
        if(type == 2){
            a = "CapabilityModellingProjects"; 
        }
        if(type == 3){
            a = "Kpis"; 
        }

        if(this.state.dragValue.type == a){
            // e.preventDefault();            
            let epicdata = this.props.epic;
            let payload = [];
            payload.push(this.state.dragValue);

            for(let i=0;i<epicdata.length;i++){
                if(epicdata[i].id == this.props.match.params.epicId){
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
        } else {
            return false;
        }
    }
    // selectTemplate = (e,id) => {
    //  let epicdata = this.props.epic; 
    //     for(let i in epicdata) {
    //         if(epicdata[i].id == this.state.parentEpicId){
    //             if(epicdata[i].NOI){
    //                 if(epicdata[i].NOI.NoiId){
    //                     const noiData = {
    //                         "NoiId": epicdata[i].NOI.NoiId,                    
    //                         "TemplateNoiName":id.Title,
    //                         "NoiDetails":epicdata[i].NOI.NoiDetails
    //                     }
    //                     epicdata[i].NOI = noiData
    //                 }
    //             }else{
    //                 const noiData = {
    //                     "NoiId": 0,
    //                     "TemplateNoiId":id.Id,
    //                     "TemplateNoiName":id.Title
    //                 }
    //                 epicdata[i].NOI = noiData
    //             }
    //         }            
    //     }        
    //     this.setState({epic:epicdata})
    //     //console.log(epicdata);


    // }
    editTitle = (e,id,type) => {
        let epicdata = this.props.epic;
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
        let epicdata = this.props.epic;
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
        let epic      = this.props.epic;
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
            let epic  = this.props.epic;

            for(let i in this.props.epic) {
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
            this.setState({
                epic: epic
            })
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
            for(let i in this.props.epic) {
                let epic = this.props.epic;
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
            for(let i in this.props.epic) {
                let epic = this.props.epic;
                if(epic[i].id==this.props.match.params.epicId){
                    if(epic[i].hasOwnProperty("SubEpic")){
                        for(let j in this.props.epic[i].SubEpic) {
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
        window.location.href = '/dt-epicdetail/'+this.props.match.params.dtId+"/"+e.target.value;
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

    render(){

        const NetworkOfInfluence = this.props.NetworkOfInfluence.filter(NOI => {
            let noiName = NOI.Title ? NOI.Title.toLowerCase() : '';
            return noiName.includes(this.state.NOISearchTerm.toLowerCase());
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
                    <DesignThinkingEpicDetailBreadCrumb dtId={this.state.dtId} epicDetail={this.props.epicDetail} />
                    {/* <!-- Begin Page Content --> */}
                    <div className="container-fluid container-dashboard">
                    {this.state.successMessage ? <span color={{color:green,width:"100%"}}>{this.state.successMessage}</span>:null}
                      <DesignThinkingEpicDetailTopbar 
                      allEpicData={this.props.allEpicData}
                      dtId={this.state.dtId}
                      epicId={this.state.epicId}

                      epicProject={this.props.epicProject} 
                      saveEpic={this.saveEpic.bind(this)} />
                      <div className="row">
                        <div className="dt-screen-main">
                          <DesignThinkingEpicDetailLeftSidebar 
                            ptype={this.state.ptype} 
                            filterVal={this.state.filterVal} 
                            toggleClass={() => this.toggleClass()}
                            closePanel={() => this.closePanel()}
                            filterProject={this.filterProject.bind(this)}
                            addDrag={this.addDrag.bind(this)}  
                            getChild={this.getChild.bind(this)} 
                            decompositionchildData ={this.state.decompositionchildData} 
                          />
                          <DesignThinkingEpicBodyDetail 
                            editsubTitle = {this.editsubTitle.bind(this)} 
                            editTitle = {this.editTitle.bind(this)}   
                            previouSubEpic = {this.previouSubEpic.bind(this)} 
                            nextSubEpic = {this.nextSubEpic.bind(this)} 
                            showSubEpic={this.state.showSubEpic}  
                            showClass={this.state.showClass}
                            selectedEpicId = {this.state.epicId} 
                            getEpic = {this.getEpic.bind(this)} 
                            epicDetail={this.props.epicDetail}  
                            epicList = {this.props.epicList} 
                            dropEpic={this.dropEpic.bind(this)} 
                            dropchildEpic={this.dropchildEpic.bind(this)} 
                            epic={this.props.epic} 
                            epicId={this.state.epicId} 
                            addEpic={this.addEpic.bind(this)} 
                            selectEpic={this.selectEpic.bind(this)} 
                            addSubEpic={this.addSubEpic.bind(this)} 
                            selectSubEpic={this.selectSubEpic.bind(this)} 
                            removeSubEpic={this.removeSubEpic.bind(this)} 
                            removeEpic={this.removeEpic.bind(this)}
                            allEpicData={this.props.allEpicData}
                          />
                        </div>
                      </div>
                      {/* <!-- /End container-fluid --> */}
                    </div>
                    {/* <!-- End of Main Content --> */}
                  </div>
                  {/* <!-- End of Content Wrapper --> */}
                </div>
              </DesignThinkingEpicDetailScreenWrapper>
              <DesignThinkingEpicDetailNoiModal 
                NOISearchTerm = {this.state.NOISearchTerm}
                setNOISearchTerm = {(value)=>this.setState({ NOISearchTerm : value })}
                NetworkOfInfluence={NetworkOfInfluence}  
                selectTemplate={this.selectTemplate.bind(this)}  
                allEpic={this.props.epic} 
                selectedEpic={this.state.parentEpicId}
                cancelTemplatePopUpHandler = {this.cancelTemplatePopUpHandler.bind(this)}
                currentSelectedTemplate = {this.state.currentSelectedTemplate}
                saveSelectedtemplate = {this.saveSelectedtemplate.bind(this)}
                allEpic={this.props.epic}
            />
              <AsideComponent />
              <FooterComponent />
            </>
        );
    }
}
const mapStatetoProps= (state) =>{
    return {
        // test: state.epicScreenData.decompositionProjects,
        // test1: state.epicScreenData.benchmarkingProjects,
        // test3: state.epicScreenData.kpiscontrols

        UserInfo: state.epicScreenData.UserDetail,
        UserProjectDetails : state.epicScreenData.UserProjectDetails,
        NetworkOfInfluence: state.epicScreenData.NetworkOfInfluence,
        // StakeHolder: state.epicScreenData.StakeHolder,
        // FilterStakeHolder: state.epicScreenData.StakeHolder,
        dtProjects: state.epicScreenData.dtProjects,
        epicDetail: state.epicScreenData.epic ? state.epicScreenData.epic : {},
        versionHistoryNo: state.epicScreenData.versionHistoryNo,
        epicList: state.epicScreenData.epicList ? state.epicScreenData.epicList : [], 
        epicProject: state.epicScreenData.epicProject ? state.epicScreenData.epicProject : [],
        allEpicData: state.epicScreenData.epic,
        epic: state.epicScreenData.epic.EPic ? state.epicScreenData.epic.EPic : [],
        EpicSubepicDetailData: state.epicScreenData.EpicSubepicDetailData,
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
    fetchAllEpic,
    fetchEpicProject,
    fetchEpicSubEpicDeatils
})(DesignThinkingEpicDetail);
