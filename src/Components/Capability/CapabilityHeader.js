import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Form, FormGroup, Label, Input,Modal,ModalHeader,ModalBody,ModalFooter,Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { fetchProjects ,fetchLinkProjects } from '../../actions/capabilityActions';
import {errorAlert,responseMessage} from '../../utils/alert';
import CacheStorage from '../../utils/CacheStorage';
import ModalPopup from '../common/ModalPopup';
import { confirmAlert } from 'react-confirm-alert';
import "../../../node_modules/react-confirm-alert/src/react-confirm-alert.css"
import ProcessModel from "./ProcessLinks/Model"
import FPMMerge from './FPMMerge';
import CardSetting from '../Kpi/CardSetting';

// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'



import axios from 'axios';

const config = require('../../config');


class CapabilityHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            isOpen: false,
            project_name: "",
            formFields: { 
                 version:'',
              description:'',
           },
           completeText:'',
           versionData:[],
           markComplete:true,
           latestVersion : "",
           toggled:false,
           capState : "progress",
           selectAmploPorjectId: "",
           linkAmpProjectId: "",
           showLinkProcessStatus: false,
           nonUsedKey: Date.now(),
           showFPMMerge:false,
           isshowPri:false
        }
    }
    componentDidMount() {
        this.props.fetchLinkProjects()

        axios.get(config.laravelBaseUrl+'get_user_bm_projects', {
            headers: {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
        })
        .then(res => {
                // console.log({res})
                if(res.status == 200)  {
                      this.setState({projects: res.data.data})
                }
        })
        .catch(error => responseMessage("error","Failed to fetch projects") )
        try{
            this.props.fetchProjects();
        }catch(error) {
            this.setState({
                loading: false,
                capState:"progress"
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
        if(nextProps.projectId >0){
            //this.getVersion(nextProps.projectId);
            if(nextProps.versionVal != ''){
                // let formFields = {...this.state.formFields};                
                //   formFields.version = parseFloat(nextProps.versionVal);
                  this.setState({latestVersion:nextProps.versionData[0] ? nextProps.versionData[0].Version : 0});
                    // console.log("here")     toggle
            }
        }
        //this.props.initializeProject(nextProps.items);
    }
    // toggleDuplicate() {
    //     this.setState(prevState => ({
    //         isDuplicateOpen: !prevState.isDuplicateOpen
    //     }))
    // }
    
    handleTemplateNameChange(e) {
        this.setState({ project_name: e.target.value })
    }
    handleToggleCapabilityState = (capabilityState) => {
        this.props.toggleCapabilityState(capabilityState);
        this.props.toggler(!this.state.toggled)
        this.setState({...this.state,toggled:!this.state.toggled,capState:capabilityState});
       
    }
    handleSearchChange = (event) => {
        this.props.handleSearchChange( event.target.value);
        this.props.handleSearchItem( event.target.value );
    }
    // handleCopyProject = () => {
    //     this.toggleDuplicate();
    //     this.setState({project_name: ""});
    // }
    // duplicateTemplate = () => {
    //     if (this.state.project_name !== "") {
    //         this.props.handleCopyProject(this.state.project_name);
    //         this.toggleDuplicate();
    //     } else {
    //         responseMessage("warning", "Poject name is required.", "");
    //     }
    // }
    async  inputChangeHandler(e){
        let formFields = { ...this.state.formFields };
        let value = e.target.value;
        let decimals = 0;
        if(e.target.name == "version"){
            if (Math.floor(value) !== value)   {
                decimals = value.toString().split(".")[1]?value.toString().split(".")[1].length:0 || 0;
            }
        }
        if(e.target.name == "version" && decimals < 2){
            formFields[e.target.name] = e.target.value;
        }else if(e.target.name == "description"){
            formFields[e.target.name] = e.target.value;
        }
        
        await this.setState({
            formFields
        });
    }
    async handleSubmit(e){
        // console.log('inIt')
        let data = {
            "ProjectId":parseInt(this.props.projectId),
            "ProcessLevel1Id":0,
            "IsUnlocked":1,
            "VersionNo":this.state.formFields.version.toString(),
            "ReasonForNewVersion":this.state.formFields.description,
            'ProjectVersionId':this.props.defaultVersion
        }
        let selfObj = this;
        await axios.post(config.laravelBaseUrl+'decompositionLockUnlock', data, {
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        }).then(function(response){
            
            
            selfObj.props.changeReadonly();
            responseMessage("success", response.data.message, "");
            selfObj.setState({
                isOpen: false
              });
            selfObj.props.loadRefreshProject();
              selfObj.setState({
                showUncompleteValidations :false
              })
            
            
        }).catch(function(error) {
            responseMessage("Error", "Something Went Wrong!", "");
            
        });
    }
   
    async markComplete(e){
        e.preventDefault();
        let data = {
            "ProjectId":parseInt(this.props.projectId),
            "ProcessLevel1Id":0,
            "IsUnlocked":0,
            "VersionNo":this.props.versionVal,
            "ReasonForNewVersion":"",
            'ProjectVersionId':this.props.defaultVersion
        }
        let selfObj = this;
        await axios.post(config.laravelBaseUrl+'decompositionLockUnlock', data, {
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        }).then(function(response){
            selfObj.props.changeReadonly();
            
            responseMessage("success", response.data.message, "");
        }).catch(function(error) {
            responseMessage("Error", "Something Went Wrong!", "");
            
        });
      

    }
    toggle(e) {
        e.preventDefault();
         let formFields = {...this.state.formFields}
        formFields.version = Number(this.state.latestVersion)+0.1
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
            formFields : formFields
        }))
       
    }
    toggleshowPriority(action) {
        this.setState(prevState => ({
            isshowPri: !prevState.isshowPri,
            custom_attribute: "",
            scoringAction: action
        }))
        this.PriorityWeightage();
    }
    async PriorityWeightage (){
        //  axios.get('http://divadev.azurewebsites.net/public/api/generateCSV/9/598'+'/'+this.props.projectId+'/'+this.props.functionId, {
        //     headers: headers
        // })
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken")
          }
          await axios.get(config.laravelBaseUrl+'GetWeightageforPriority/'+this.props.projectId+'/'+0,{
            headers: headers
          })
        .then(res => {
            console.log("PriorityWeightage", res.data);
            let priorityweightage = res.data.data;
            if(res.data.message !="data not found"){
            this.setState({
                priorityweightage: priorityweightage,
                prweightage: true
              });
            }
            // setTimeout(function(){
            //     return axios.post(config.laravelBaseUrl+ 'unlinkFile', fileArray, {
            //         headers: headers
            //     })
            // },10000);
        }); 
    }
    handlePriorityweightage(e,id,name) {
        let temp=JSON.parse(JSON.stringify(this.state.priorityweightage));
        console.log("temp",temp);
        let index=temp.findIndex((item)=>item.ID==id);
        temp[index].Weightage=e.target.value;
        this.setState({ 
            priorityweightage:temp
         });   
}
    savePriorityWeightage = () => {
        let finalArray=[]
        let filterArry= this.state.priorityweightage.filter((item)=>item.Weightage==0)
        if(filterArry.length!=0)
        {
        let temp=JSON.parse(JSON.stringify(this.state.priorityweightage));
            filterArry.map( function(item, i){
            let index=temp.findIndex((item1)=>item1.ID==item.ID);
            if(item.Priority=="High"){
                temp[index].Weightage=3
                responseMessage("warning", 'Default Priority set 3', "");
            }
            if(item.Priority=="Medium"){
                temp[index].Weightage=2
                responseMessage("warning", 'Default Priority set 2', "");
            }
            if(item.Priority=="Low"){
                temp[index].Weightage=1
                responseMessage("warning", 'Default Priority set 1', "");
            }
        });
        this.setState({ 
            priorityweightage:temp
            });
        }
        else{
        this.state.priorityweightage.map((item)=>finalArray.push({"Priority":item.Priority,"Weightage":item.Weightage}))
            let obj={
                "DecompositionProjectID": this.props.projectId,
                "DecompositionProcessLevel1ID": 0,
                "PriorityWeightage":finalArray
            }
            axios.post(`${config.laravelBaseUrl}SaveUpdateWeightageforPriority`,obj, {
                headers: {
                    authorization: "Bearer " + sessionStorage.getItem("userToken"),
                },
            })
            .then((res) => {
                responseMessage("success", 'Saved Successfully', "");
                this.toggleshowPriority();
            })
            .catch((error) => console.log(error));
        }
    }
    exportDataHandler = () => {
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken"),
        }
        let versionId = this.props.versionData.length > 0 ? this.props.versionData[0].VersionId : "0";
        // console.log(versionId)
        axios.get(config.laravelBaseUrl+ 'exportCMProject/'+this.props.projectId+'/'+versionId, {
            headers: headers
        }).then(res => {
            let fileName = res.data.data.file_name;
            window.open(config.ApiBaseUrl+fileName, '_blank');
            let fileArray = {
                'file_name': fileName
            }
            setTimeout(function(){
                return axios.post(config.laravelBaseUrl+ 'unlinkFile', fileArray, {
                    headers: headers
                })
            },10000);
        }); 
    }
    handleProjectChange = (e)=>{
        this.setState({...this.state,toggled:false,capState:"progress"})
        this.props.handleProjectChange(e)
        this.setState({ linkAmpProjectId: "" })
    }
    
    
    handleActionChange =(e) =>{
        this.setState({selectAmploPorjectId: e.target.value})  
    }

    //    Method for linkage AmpProject to Capablity template ***************
      handleLinkProjects =() =>{
        axios.get(`${config.laravelBaseUrl}AmpProjectLinkWithCMProject/${this.props.projectId}/${this.state.selectAmploPorjectId}`,
        {
          headers: {
              "authorization": "Bearer " + sessionStorage.getItem("userToken")
          }
       }).then((res)=>{
        //   console.log({res})
          if(res.data.data[0].IsSuccess == 1) {
             responseMessage("success" , res.data.data[0].MessageName)

             axios.get(`${config.laravelBaseUrl}getDecompositionProjectVersion/${this.props.projectId}/0/0`,
             {
               headers: {
                   "authorization": "Bearer " + sessionStorage.getItem("userToken")
               }
            }).then(res => {
                // console.log(res)
                 this.props.handleScoreDetails(this.state.selectAmploPorjectId)
                 this.props.fetchLinkProjects()

                this.setState({linkAmpProjectId: res.data.data[0].AmpMarkingProjectId})
                this.props.handleLinkProjectName(res.data.data[0].AmpMarkingProjectName)
            }).catch(error =>  responseMessage("Error", "Something Went Wrong While linking project!", ""))

          }

          this.setState({ selectAmploPorjectId: "" })
         
       }).catch(error =>  responseMessage("Error", "Something Went Wrong!", ""))
      }


          // METHODS FOR REMOVE PROJECT LINKAGE ****
      handleRemoveProjectLinkage=()=>{

        confirmAlert({
            title: 'Confirmation',
            message: 'You want to remove this project linkage?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
          axios.get(`${config.laravelBaseUrl}AmpProjectLinkWithCMProject/${this.props.projectId}/${0}`,
          {
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
         })
         .then(res => {
            if(res.data.data[0].IsSuccess == 1) {
              
                this.setState({
                    linkAmpProjectId: ""
                })

                axios.get(`${config.laravelBaseUrl}getDecompositionProjectVersion/${this.props.projectId}/0/0`,
                {
                  headers: {
                      "authorization": "Bearer " + sessionStorage.getItem("userToken")
                  }
               }).then(res => {
                //    console.log(res)
                   this.props.fetchLinkProjects()

                    this.props.handleRemoveSideNameProject()
                   this.setState({linkAmpProjectId: res.data.data[0].AmpMarkingProjectId})
                   responseMessage("success" , "Remove Project linkage successfully!")
               }).catch(error =>  responseMessage("Error", "Something Went Wrong While linkage remove!", ""))
            }
         })
     }
        },
        {
            label: 'No',
            onClick: () => {

            //
            }
        }
    ]
});     
}

    render() {

        console.log("Header Props ==>" ,this.props)
        console.log("Header State ==>" ,this.state)

        let matchId = this.state.linkAmpProjectId? this.state.linkAmpProjectId : this.props.currentVersionData.AmpMarkingProjectId 

        let linkAmpProject = this.state.projects?.filter( (item) => item.BenchmarkProjectID == matchId)

        // console.log(linkAmpProject)

        // console.log(this.props)
        let projectOptions = [];
        if(this.props.items.length > 0 ) {
            projectOptions = this.props.items.map((project, i) => {
                let uniqId = project.ProjectName.trim() + '-'+ i;
                return (
                    <option value={project.DecompositionProjectID} key={uniqId}>{ project.ProjectName }</option>
                )
            })
        }
        let versionOptions = [];
        if(this.props.versionData.length > 0 ) {
            versionOptions = this.props.versionData.map((val) => {   
                                            
                return (
                    <option value={val.VersionId} key={val.VersionId}>{val.Version}{ val.ProjectName }</option>
                )
            })
        }
        let priorityweightage=[];
        if(this.state.prweightage) {
            priorityweightage = this.state.priorityweightage.map((mechanism, i) => {
                
                return (
                    <div className="custom-control custom-checkbox" key={'mechanismPopUpLi-'+mechanism.ID}>
                        <label className="scoring">{mechanism.Priority}</label>
                        <input type="number" class="form-control-scoringinput" name="mechanism-li" onChange={ (e) => this.handlePriorityweightage(e,mechanism.ID,mechanism.Priority) } value={ mechanism.Weightage } id={'mechanism-'+mechanism.ID}></input>
                    </div>
                );
            });
        }

        let projects = this.props.linkProjects?.map((project, i) => {
            return (
                <option disabled={project.Status == "Linked" && true} name={project.BenchmarkProjectName} value={project.BenchmarkProjectID} key={'projectOpt-'+project.BenchmarkProjectID}>{project.BenchmarkProjectName}</option>
            )
        })

        const linkProcessStatusChange = () =>{
            this.forceUpdate()
              this.setState({showLinkProcessStatus: !this.state.showLinkProcessStatus})
        }

        // let activeClass = "inactive-Btn"
        // if(this.props.projectId > 0){
        //     activeClass = "active-Btn"
        // }
        return (
            <>
            {/* reate Correlation MODEL */}
                <Row className="business-decomposition-sec mt-4">
                    <Col xl="12" className="pr-0">
                        <div className="model-list">
                        <Label className="model-label">Select Capability Modeling Project:</Label>
                        
                        </div>
                </Col></Row>
                <Row className="business-decomposition-sec">
                    <Col xl="12" className="pr-0">
                        <div className="model-list">
                            {/* <h2> { this.props.projectName }</h2> */}
                            {/* <Form className="bussiness-top-sec">
                            <FormGroup className="mb-0">
                                <Col sm="5" className="pl-0">
                                    <select className="form-control" name="project" onChange={(e) => this.handleProjectChange(e)} value={this.props.projectId}>
                                        <option value={0}>Select Project</option>
                                        { projectOptions }
                                    </select>
                                </Col>
                            </FormGroup>
                           </Form> */}

                                      <div className="row">
                                    <div className="col-4">
                                    <select className="form-control" name="project" onChange={(e) => this.handleProjectChange(e)} value={this.props.projectId}>
                                        <option value={0}>Select Project</option>
                                        { projectOptions }
                                    </select>
                                    </div>
                                    {this.props.projectId==0?
                                    <React.Fragment>
                                    <div className="col-4">
                                    <CardSetting 
                                    bgClass={"bg-warning"}
                                    heading={"Add/Edit Causal"} 
                                    innerComponent={
                                    <div style={{height:"164px"}}>
                                        <b>The module allows one to select capabilities from two different projects from capability modelling, analyse interdependencies among them, and bring dependent capabilities and independent capabilities. </b>
                                    </div>
                                    }
                                    functionClick={() => this.setState({ showLinkProcessStatus: true  })}
                                    />
                                    </div>
                                    <div className="col-4">
                                    <CardSetting 
                                    bgClass={"bg-info"}
                                    heading={"FPM Merge"} 
                                    innerComponent={
                                    <div style={{height:"164px"}}>
                                        <b>The module allows one to select two projects (FPMs) from capability modelling, merge them, and create a new project.</b>
                                    </div>
                                    }
                                    functionClick={() => window.location.href='/fpm-merge'}
                                    />
                                
                                    </div>
                                    </React.Fragment>
                                    :null}
                                </div>
                          
                           {(this.props.projectId > 0 && Object.keys(this.props.processData).length > 0) ? 
                            <div className="form-group has-search ml-auto mr-5">
                                <Input type="text" className="form-control" placeholder="Search" onChange={this.handleSearchChange.bind(this)} />
                                <span className="fas fa-search form-control-search" ></span>
                            </div> : "" }
                            {(this.props.projectId > 0 && Object.keys(this.props.processData).length > 0) ? 
                            
                            <div className="CustomRadio toggle-btn pr-0">
                                <Label className="">
                                    <input type="radio" className="" name="toggleCapabilityState" id="progress" value="progress" onClick={this.handleToggleCapabilityState.bind(this, 'progress')} checked={(this.state.capState === "progress") ? true : false } />
                                    <Label className="" htmlFor="progress"></Label>
                                    <span><i className='fa fa-check'></i> Progress</span>
                                </Label>
                                <Label className="">
                                    <input type="radio" className="" name="toggleCapabilityState" id="heatmap" value="heatmap" onClick={this.handleToggleCapabilityState.bind(this, 'heatmap')} checked={(this.state.capState === "heatmap") ? true : false } />
                                    <Label className="" htmlFor="heatmap"></Label>
                                    <span><i className='fa fa-check'></i> Heatmap</span>
                                </Label>
                            </div> : "" }
                            </div>
                    </Col>
                </Row>
            {(this.props.projectId > 0 && Object.keys(this.props.processData).length > 0)?<div className="row mt-2 mb-4">
                <div className="col-xl-12 businessrow">
                    <div className="dropdown version-drop">
                        <a className="btn-drop dropdown-toggle" data-toggle="dropdown">
                            {this.props.currentVersionData?
                            this.props.currentVersionData.Version?this.props.currentVersionData.Version+" - ":" - ":" - "}
                            {this.props.currentVersionData?
                            this.props.currentVersionData.VersionNote?this.props.currentVersionData.VersionNote+" - ":" - ":" - "}
                            {this.props.currentVersionData?
                            this.props.currentVersionData.ProjectName?this.props.currentVersionData.ProjectName:"":""}
                        {/* {this.props.versionVal} { this.props.projectName }  */}
                        </a>
                        <div className="dropdown-menu"  >
                            <div style={{"height":"200px","overflowY":"scroll"}}>
                        {/*<select className="form-control" name="project" onChange={(e) => this.props.handleVersionChange(e)} value={this.props.defaultVersion}>
                        <option value={0}>Select Version</option>                                        
                                        { versionOptions }
                                         <option value={val.VersionId} key={val.VersionId}>{val.Version}{ val.ProjectName }</option>
                            </select>*/}
                            {/* <div className="version-style"> 
                                                                                                  
                            <input type="radio"   onChange={(e) => this.props.handleVersionChange(e,'')}  name="selectedVersion" />                                                   
                            <p className="d-flex date-txt justify-content-between"><span className="fontbold">{this.props.latestversionVal} { this.props.projectName }</span> <span className="date">Current version</span></p>
                            <p className="d-flex revised-txt justify-content-between"><span></span> </p>
                            </div> */}
                           {this.props.versionData ?
                               this.props.versionData.map((val,ind) => {   
                                            
                                            return (                                               
                                               <div className="version-style" key={'version-'+ind}>                                                                                                   
                                                    <input type="radio"   onChange={(e) => this.props.handleVersionChange(e,val)}  name="selectedVersion" />                                                   
                                                    <p className="d-flex date-txt justify-content-between"><span className="fontbold">{val.Version} { val.ProjectName }</span>{ind==0?<span className="date">Current version</span>:null} <span className="date">{val.EffectiveDate}</span></p>
                                                    <p className="d-flex revised-txt justify-content-between"><span>Revised by: {val.CreatedBy}</span> <span className="text-success">{this.props.versionVal==val.Version?"Selected":null}</span></p>
                                                </div> 
                                            )
                                        })
                                   :null
                            }     
                            </div>                           
                        </div>
                    </div>
                    <div className="ml-auto mr-4">
                        {/* <select className="custom-select">
                            <option>Actions</option>
                        </select> */}
                        <button style={{textAlign:'left'}} className="custom-select"  data-toggle="dropdown" role="button" aria-expanded="false">Actions<span class="caret"></span></button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a className="dropdown-item" style={{fontSize : "14px"}}  onClick={()=>this.exportDataHandler()}>Export</a></li>
                            <li><Link className="dropdown-item" style={{fontSize : "14px"}} to={`/cm-project-import/${this.props.projectId}`} >Import</Link></li>
                            <li data-toggle="modal" data-target="#linktotemplate" ><a className="dropdown-item" style={{fontSize : "14px" , cursor: "pointer"}}  >
                                {linkAmpProject[0] ? "Update linkage": "Link AmpProject"}
                                </a></li>
                            <li><a className="dropdown-item" style={{fontSize : "14px",cursor: "pointer"}}  onClick={this.toggleshowPriority.bind(this,1)}>Add/Update Priority Weightage</a></li>

                                {/* <li onClick={() => this.setState({ showLinkProcessStatus: true  })}>
                                <a className="dropdown-item" style={{fontSize : "14px" , cursor: "pointer"}}  >
                                Add/Edit Causal
                                </a>
                                </li> */}
                        </ul>
                    </div>
                    
                    <div className="savelink mr-2">
                       { this.props.readOnly  ==  true ?  
                       <a href="#" onClick={(e) => this.toggle(e)} data-toggle="modal" data-target="#markCompleted"> Mark as Incomplete </a>:
                       null
                      }
                     
                     { this.props.readOnly  === false ?
                     <a href="#" onClick={(e) => this.markComplete(e)}>Mark as complete</a> 
                     :null
                     }
                     &nbsp;&nbsp;|&nbsp; <a href="#">Save</a>

                     <div className="d-flex mt-1 justify-content-center">
                     <button onClick={this.props.isEdiableProcessToggle } className={`btn btn-sm ${this.props.isEditableProcess ? "btn-outline-info bg-white text-dark ": "btn-outline-primary bg-white text-dark "}`}> {this.props.isEditableProcess ? "Normal FPM" : "Edit FPM"}</button>
                     </div>

                    </div>
                    <ModalPopup isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} title="Mark Incomplete">
                        <div className="form-group">
                            <label>Version <span className="text-danger">*</span></label>
                            <Input className="form-control" type="text" name="version" onChange={(e) => this.inputChangeHandler(e)} value={this.state.formFields.version} />  
                            {this.state.formFields.version == "" && this.state.showUncompleteValidations?<span className="text-danger">Version Number is required.</span>:""}{this.state.formFields.version != ""?Number(this.state.formFields.version) <= Number(this.state.latestVersion)?<span className="text-danger">Version Number has to be greater than previous version.</span>:"":""}
                        </div>
                        <div className="form-group">
                            <label>Description<span className="text-danger">*</span></label>
                            <Input className="form-control" type="text" name="description"  onChange={(e) => this.inputChangeHandler(e)} value={this.state.formFields.description} />  {this.state.formFields.description == "" && this.state.showUncompleteValidations ?<span className="text-danger">Version Updrade reason is required.</span>:""}                                              
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary ml-3"  onClick={(e) => this.toggle(e)}>Cancel</button> 
                        <button type="button" className="btn btn-primary ml-3"  onClick={(this.state.formFields.description != "" && this.state.formFields.version != "" && Number(this.state.formFields.version) > Number(this.state.latestVersion))?(e) => this.handleSubmit(e):()=>{this.setState({showUncompleteValidations : true})}}>Save</button> 
                        </div> 
                    </ModalPopup>
                    <ModalPopup isOpen={this.state.isshowPri} toggle={this.toggleshowPriority.bind(this)} title="Select Priority Weightage" onSave={this.savePriorityWeightage.bind(this)} onDelete={this.deleteGridHandler} className="capability_modeling modal-lg" footer={true} saveBtnTitle={this.state.scoringAction ? "SAVE GRID" : "EDIT GRID"}
                          cancelButton={!this.state.scoringAction}>
                            <div className="row mt-4">
                                <div className="col-sm-12">
                                    <h3 className="mb-4">Add from AmploFly 4.0 provide attributes</h3>
                                    {priorityweightage}
                                </div>
                                
                            </div>
                        </ModalPopup>
                        
                </div>
            </div>:""}

            {this.state.showFPMMerge?
            <Modal size={"lg"} isOpen={this.state.showFPMMerge} toggle={()=>this.setState({showFPMMerge:false})}>
          <ModalHeader toggle={()=>this.setState({showFPMMerge:false})}>FPM Merge</ModalHeader>
          <ModalBody>
          <FPMMerge closeModal={()=>this.setState({showFPMMerge:false})}/>
          </ModalBody>
        </Modal>:''}


 {/* POP MODEL FOR Link to Ampscore **** */}
 <div className="modal fade" id="linktotemplate" tabindex="-1" aria-labelledby="linkscore" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="linkscore"> {linkAmpProject[0] ? "Update Linkage" : "Select project to Link"} </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body" style={{ height: "300px" }}>

         {linkAmpProject[0] ? <div className="d-flex justify-content-between mx-2"><p className="p-1"> Linked With : <strong>{linkAmpProject[0].BenchmarkProjectName}</strong> </p> <button className="btn btn-danger btn-sm" data-dismiss="modal" onClick={this.handleRemoveProjectLinkage}>Remove</button></div> : null } 
      <form className="p-3">
          <div className="form-group">
          <Label>Select AmpMarking Project:</Label>
        <div className="d-flex">
            <select className="form-control col-sm-10 mx2" 
            value={this.state.selectAmploPorjectId}
            onChange={(e) => this.handleActionChange(e)}
            >
            <option selected>Choose...</option>
            {projects}
            </select>
            {/* {Object.keys(this.props.lock).length > 0 && this.props.lock.flag==1 ? <i className="fa fa-lock"></i> : <></>} */}
        </div>
          </div>
          </form>
      </div>
      <div className="modal-footer">
                  
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={this.handleLinkProjects} type="button" className="btn btn-success" data-dismiss="modal" disabled={!this.state.selectAmploPorjectId}>Link</button>
      </div>
    </div>
  </div>
</div>


{this.state.showLinkProcessStatus &&<ProcessModel projectOptions={projectOptions}  hideMethod={linkProcessStatusChange} status={this.state.showLinkProcessStatus} projects={this.props.items} />}
          
            </>

        )
    }
}

CapabilityHeader.propTypes = {
    fetchProjects: PropTypes.func.isRequired,
    linkProjects: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    toggleCapabilityState: PropTypes.func.isRequired 
}

const mapStateToProps = state => {
    
    return {
        items: state.capability.items ,
        linkProjects: state.capability.linkProjects
    }
};
export default connect(mapStateToProps, { fetchProjects , fetchLinkProjects })(CapabilityHeader);
