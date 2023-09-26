import React, {Component, useState} from 'react';
import {Label} from 'reactstrap';
import SidebarJs from '../../common/js/sidebarAnimation';
import { Link } from "react-router-dom";
import ModalPopup from '../common/ModalPopup';
import Search from '../common/Search/Search';
import axios from 'axios';
import $ from "jquery";
import {responseMessage} from '../../utils/alert';
import CacheStorage from '../../utils/CacheStorage';
import { toast } from "react-toastify";
const config = require('../../config');
//import { saveAs } from 'file-saver';

//.. Reviewed by Ashim: Need to implement LoadAPI > action-creator

class OrderExecution extends Component {
    constructor (props){
        super ( props );
        this.state = {
            score_criteria_id: "",
            custom_attribute:"",
            showModal: true,
            modelingMode: this.props.modelingMode,
            isOpen: false,
            processId:this.props.processId,
            projectId:this.props.projectId,
            version:0,
            actionVal : "",
            isshow:false,
            isshowPri:false,
            scweightage:false,
            prweightage:false,
            getData :0

          };
        this.sidebarAnimation=new SidebarJs();
        this.saveGrid = this.saveGrid.bind(this);
    }
    toggle(action) {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
            custom_attribute: "",
            scoringAction: action
        }))
    }

    /*componentDidMount() {
        this.sidebarAnimation.toggle();
        this.setState({
            showClass: this.props.showClass
        })

    }*/
    
    componentWillReceiveProps(nextProps) {
        if( nextProps.processes!= this.props.processes ){
            if(nextProps.processes.length !== 0){
                if (nextProps.processes[0].status ==3) {
                    $('.conected-drop').css('pointer-events', "none");
                    $('.scoring-drop').css('pointer-events', "none");
                }
                else if (this.state.modelingMode == 1){
                    $('.conected-drop').css('pointer-events', "none");
                    $('.scoring-drop').css('pointer-events', "none");
                }
                else {
                    $('.conected-drop').css('pointer-events', "auto");
                    $('.scoring-drop').css('pointer-events', "auto");
                }
            }
        }
    }
    
    handleScoringAttribute = (event, attribute_id ) => {
        this.setState({
            custom_attribute:event.target.value,
            score_criteria_id:attribute_id
        })
    }
    updateInputValue = (event) =>{
        if(this.state.custom_attribute!= event.target.value){
            this.setState({
                custom_attribute:event.target.value
            })
        }
        
    }
    deleteGridHandler=()=>{
        if (this.state.score_criteria_id != "" && this.state.custom_attribute!=""){
            let mechanismObj = {
                score_criteria_id:this.state.score_criteria_id,
                title:this.state.custom_attribute,
                flag: 0
            }
            this.props.updateMechanisms( mechanismObj );
            this.toggle();
        }else{
            responseMessage("warning", "Please choose customer attribute", "");
        }
    }
    saveGrid(){
        if (this.state.score_criteria_id != "" && this.state.custom_attribute!=""){
            let mechanismObj = {
                score_criteria_id:this.state.score_criteria_id,
                title:this.state.custom_attribute,
                flag: 1
            }
            //console.log(mechanismObj);
            this.props.updateMechanisms( mechanismObj );
            this.toggle();
        }else{
            responseMessage("warning", "Please choose customer attribute", "");
        }
    }
    handleScoringMechanisms(e,id) {
        let temp=JSON.parse(JSON.stringify(this.state.scoringmechanismsweightage));
        let index=temp.findIndex((item)=>item.DecompositionScoreCriteriaID==id);
        temp[index].Weightage=e.target.value;
        this.setState({ 
            scoringmechanismsweightage:temp
         });  
        }
    
    saveScoringmechanisms = () => {
        let finalArray=[]
        let filterArry= this.state.scoringmechanismsweightage.filter((item)=>item.Weightage==0)
        if(filterArry.length!=0)
        {
            let temp=JSON.parse(JSON.stringify(this.state.scoringmechanismsweightage));
                filterArry.map( function(item, i){
                let index=temp.findIndex((item1)=>item1.DecompositionScoreCriteriaID==item.DecompositionScoreCriteriaID);
                    temp[index].Weightage=1
                    responseMessage("warning", 'Default Weightage set 1', "");
            });
            this.setState({ 
                scoringmechanismsweightage:temp
                });
        }
        else{
            this.state.scoringmechanismsweightage.map((item)=>finalArray.push({"ScoringMechanism":item.ScoreCriteriaTitle,"Weightage":item.Weightage}))
            let obj={
                "DecompositionProjectID": this.state.projectId,
                "DecompositionProcessLevel1ID": this.state.processId,
                "PriorityWeightage":finalArray
            }
            console.log("obj",obj)
        axios.post(`${config.laravelBaseUrl}SaveUpdateWeightageforScoringMechanisms`,obj, {
            headers: {
                authorization: "Bearer " + sessionStorage.getItem("userToken"),
            },
        })
        .then((res) => {
            responseMessage("success", 'Saved Successfully', "");
            this.toggleshow();
        })
        .catch((error) => console.log(error));
        }  
    }

    toggleIt(mode) {
        this.setState({
            modelingMode: mode
        });
        this.props.toggleMode(mode);
    }
    exportDataHandler = () => {
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken"),
        }
        axios.get(config.laravelBaseUrl+ 'generateCSV/'+this.state.projectId+'/'+this.state.processId+'/'+this.props.version, {
            headers: headers
        })
        .then(res => {
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
    actionChangeHandler = (e,targetValue) => {
        let val = targetValue;
        this.setState({
            actionVal : val
        },()=>{
            console.log(val)
            switch(val){
                case "import":
                    console.log(this.props.modelingMode)
                    if(this.props.processes[0]){
                        if(this.props.processes[0].status != 3 && this.props.modelingMode == 0){
                            window.open(window.location.origin.toString()+"/excel-uploads/"+this.state.projectId+"/"+this.state.processId+"/"+this.props.projectVersionId,"_blank");
                        }
                    }
                break;
                case "export":
                    if(this.props.processes[0]){
                        this.exportDataHandler()
                    }
                break;
            }
        })
    }
    toggleshow(action) {
        this.setState(prevState => ({
            isshow: !prevState.isshow,
            custom_attribute: "",
            scoringAction: action
        }))
        this.scoringmechanismsweightage();
    }
    async scoringmechanismsweightage () {
        //  axios.get('http://divadev.azurewebsites.net/public/api/generateCSV/9/598'+'/'+this.props.projectId+'/'+this.props.functionId, {
        //     headers: headers
        // })
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken")
          }
        //   await axios.get(config.laravelBaseUrl+'GetWeightageforScoringMechanisms/'+this.props.projectId+'/'+this.props.processId,{
        //     headers: headers
        //   })
        await axios.get(config.laravelBaseUrl+'GetWeightageforScoringMechanisms/'+this.props.projectId+'/'+this.props.processes[0].ProcessLevel1ID ,{
            headers: headers
          })
        .then(res => {
            let scoringmechanismsweightage = res.data.data;
            console.log(scoringmechanismsweightage)
            if(res.data.message !="data not found"){
            this.setState({
                scoringmechanismsweightage: scoringmechanismsweightage,
                scweightage: true
              });
            }
            // setTimeout(function(){
            //     return axios.post(config.laravelBaseUrl+ 'unlinkFile', fileArray, {
            //         headers: headers
            //     })
            // },10000);
            //this.props.processes[0].ProcessLevel1ID  this.props.projectId
        }); 
    }

    checkScoring=()=>{
        if(!(this.props.CanScore && this.props.CanScore=='1'))
        toast.info("Until you score indepedent process, You can not score depedent process",{autoClose: 5000});
    }
    render(){
        console.log(this.props.versionsArr,"orderExecution");
        const { disabledButton } = this.props;
        let { versionsArr } = this.props;
        let versions = versionsArr?versionsArr.map((version,ind)=>{
            return(
                <div className="version-style" key={"version"+ind} onClick={()=>this.props.verionChangeHandler(version)}>
                    <p style={{pointerEvents:"none"}} className="d-flex date-txt justify-content-between"><span className="fontbold">{version.Version} {version.ProcessLevel1Title} </span>{(version.Version == this.props.versionNumber)?<span className="text-success">Active</span>:""} <span
                        className="date">{version.CreatedAt}</span></p>
                    <p style={{pointerEvents:"none"}} className="d-flex revised-txt justify-content-between"><span>Revised by: {version.CreatedBy}</span> {(version.VersionId == this.props.version)?<span
                    className="selected">Selected</span>:""}</p>
                </div>
            )
        }):"";
        let mechLi = [];
        if(this.state.scoringAction) {
            mechLi = this.props.customMechanisms.map((mechanism, i) => {
                
                return (
                    <div className="custom-control custom-checkbox" key={'mechanismPopUpLi-'+mechanism.DecompositionScoreCriteriaID}>
                        <input type="radio" className="custom-control-input" name="mechanism-li" onChange={ (e) => this.handleScoringAttribute(e, mechanism.DecompositionScoreCriteriaID ) } value={ mechanism.ScoreCriteriaTitle } id={'mechanism-'+mechanism.DecompositionScoreCriteriaID} />
                        <label className="custom-control-label" htmlFor={'mechanism-'+mechanism.DecompositionScoreCriteriaID}>{mechanism.ScoreCriteriaTitle}</label>
                    </div>
                );
            });
        }else{
            mechLi = this.props.mechanisms.map((mechanism, i) => {
                return (
                    <div className="custom-control custom-checkbox" key={'mechanismPopUpLi-'+mechanism.DecompositionScoreCriteriaID}>

                        {(i > 3) ? <input type="radio" className="custom-control-input" name="mechanism-li" onChange={ (e) => this.handleScoringAttribute(e, mechanism.DecompositionScoreCriteriaID ) } value={ mechanism.ScoreCriteriaTitle } id={'mechanism-'+mechanism.DecompositionScoreCriteriaID} /> : ""}

                        <label className={i > 3 ? 'custom-control-label' : ''} htmlFor={'mechanism-'+mechanism.DecompositionScoreCriteriaID}>{mechanism.ScoreCriteriaTitle}</label>
                    </div>
                );
            });
        }
        let scoringmechanisms = [];
        if(this.state.scweightage) {
            scoringmechanisms = this.state.scoringmechanismsweightage.map((mechanism, i) => {     
                return (
                    <div className="custom-control custom-checkbox pl-0" key={'mechanismPopUpLi-'+mechanism.DecompositionScoreCriteriaID}>
                        <label className="scoring" >{mechanism.ScoreCriteriaTitle}</label>
                        <input type="number" class="form-control-scoringinput" name="Weightage" onChange={ (e) => this.handleScoringMechanisms(e,mechanism.DecompositionScoreCriteriaID) } value={ mechanism.Weightage } id={'mechanism-'+mechanism.DecompositionScoreCriteriaID}></input>
                    </div>
                );
            });
        }

        let connectedProcesses = this.props.connectedProcesses.map((process, key) => {
            return (
                <div className="dropdown-item bg-white" key={'connectedProcess-'+key}>
                    <Link to={'/capability-modeling/'+this.props.projectId+'/'+process.DecompositionProcessLevel1ID+'/'+this.props.functionId+'/'+this.props.phaseId+'/'+this.props.modelingMode}>{process.Processlevel1title}</Link>
                </div>
            )
        })
        return(
                <>
                <div className="row header-row">
                    <div className="header-sec col-sm-12 p-0">
                    <div className="dropdown version-drop">
                        <a className="btn-drop dropdown-toggle" data-toggle="dropdown">
                            {this.props.versionNumber?this.props.versionNumber:0} L1 - { this.props.processes[0]!=undefined ? this.props.processes[0].text : ""}
                        </a>
                        <i className="fa fa-info-circle" style={{marginLeft:"5px",cursor:"pointer"}} onClick={()=>this.props.updateRelation()}></i>
                        <div className="dropdown-menu">
                            {versions}
                            {/* <div className="version-style">
                            <p className="d-flex date-txt justify-content-between"><span className="fontbold">1.3 Business Decomposition Model 1 </span><span className="text-success">Active</span> <span
                                className="date">06/03/20</span></p>
                            <p className="d-flex revised-txt justify-content-between"><span>Revised by: Dave Denis</span> <span
                                className="selected">Selected</span></p>
                            </div>
                            <div className="version-style">
                            <p className="d-flex date-txt justify-content-between"><span className="fontbold">1.2 Business Decomposition Model 1</span> <span
                                className="date">06/03/20</span></p>
                            <p className="d-flex revised-txt justify-content-between"><span>Revised by: James Denis</span> </p>
                            </div>
                            <div className="version-style">
                            <p className="d-flex date-txt justify-content-between"><span className="fontbold">1.1 Business Decomposition Model 1 </span> <span
                                className="date">06/03/20</span></p>
                            <p className="d-flex revised-txt justify-content-between"><span>Revised by: Steve</span> </p>
                            </div> */}
                        </div>
                    </div>
                        {/* <h1 className="header-sec-h1">L1 - { this.props.processes[0]!=undefined ? this.props.processes[0].text : ""}</h1> */}
                        
                        {/* <div className="form-group has-search ml-auto">
                            <input type="text" className="form-control" placeholder="Search" onChange={(e) => this.handleSearchChange(e)}/>
                            <span className="fa fa-search form-control-search "></span>
                        </div> */}
                        <Search/>
                        <div className="CustomRadio ml-4">
                            <Label className="">

                            <input type="radio" className="" name="modelingMode" id="true" onClick={this.toggleIt.bind(this, 0)} checked={ this.state.modelingMode==0 ? 'checked': ''}/>
                            <Label className="" for="true"></Label>
                            <span><i className='fa fa-check'></i>Off</span>
                            </Label>
                            <Label className="">
                            <input type="radio" disabled={this.props.isBlocking} className="" name="modelingMode" id="false" onClick={this.toggleIt.bind(this, 1)} checked={this.state.modelingMode==1 ? 'checked': ''}/>
                            <Label className="" for="false"></Label>
                            <span><i className='fa fa-check'></i>Heatmap</span>
                            </Label>
                        </div>
                        <div className="back-btn ml-4">
                            <Link to={"/capability/"+this.props.projectId}><i className="fas fa-chevron-left"></i> Back</Link>
                        </div>
                    </div>
                </div>

                <div className="row top-dropdown-sec align-items-center">
                    <div className="btn-group conected-drop mr-3">
                        <a className="btn btn-outline-white dropdown-toggle" data-toggle="dropdown">
                        L1 Connected Processes
                        </a>
                        <div className="dropdown-menu">
                        {connectedProcesses}
                        </div>
                    </div>
                    <div className="btn-group scoring-drop mr-3">
                        <a className="btn btn-outline-white dropdown-toggle">
                        Scoring Mechanism Attribute <i className="fas fa-plus ml-2 mr-2" onClick={this.toggle.bind(this, 1)}></i> <i className="fas fa-minus" onClick={this.toggle.bind(this, 0)}></i>
                        </a>

                        <ModalPopup isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} title="Select Scoring Mechanism Atribute" onSave={this.saveGrid} onDelete={this.deleteGridHandler} className="capability_modeling modal-lg" footer={true} saveBtnTitle={this.state.scoringAction ? "SAVE GRID" : "EDIT GRID"}
                         disabled={this.state.custom_attribute ? false : true } cancelButton={!this.state.scoringAction}>
                            <div className="row mt-4">
                                <div className="col-sm-5">
                                    <h3 className="mb-4">Add from AmploFly 4.0 provide attributes</h3>
                                    {mechLi}
                                </div>
                                <div className="col-sm-7 border-left pl-4">
                                    <h3 className="mb-3">Add upto six Custom Attribute</h3>
                                    <div className="form-group">
                                        <label>Custom Attribute Name </label>
                                        <input type="text" className="form-control" disabled={this.state.custom_attribute ? false : true } name="custom_attribute" placeholder="" defaultValue={ this.state.custom_attribute } onChange={this.updateInputValue}/>
                                    </div>
                                </div>
                            </div>
                        </ModalPopup>
                        
                        {/*<div className={"dropdown-menu " + (this.state.showClass? "show":"")}>
                            <h2>Select Scoring Mechanism Atribute</h2>
                            <div className="row mt-4">
                                <div className="col-sm-5">
                                    <h3 className="mb-4">Add from DIVA provide attributes</h3>
                                    {mechLi}
                                </div>
                                <div className="col-sm-7 border-left pl-4">
                                <h3 className="mb-3">Add upto six Custom Attribute</h3>
                                <div className="form-group">
                                    <label>Custom Attribute 1 Name </label>
                                    <input type="text" className="form-control" name="custom_attribute" placeholder="" defaultValue={ this.state.custom_attribute } onChange={this.updateInputValue}/>
                                </div>
                                <div className="form-group mt-4 text-right">
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({showClass: false})}}>Cancel</a>
                                    <Button color="primary" className="ml-4" onClick={this.saveGrid}>SAVE TO GRID</Button>
                                </div>
                                </div>
                            </div>
                        </div>*/}
                    </div>

                    {/*<div className="btn-group levels-drop">
                        <a className="btn btn-outline-white dropdown-toggle" data-toggle="dropdown">
                        Sort by Levels
                        </a>
                        <div className="dropdown-menu">
                        <div className="dropdown-item">
                            <a href="#">Levels1</a>
                        </div>
                        <div className="dropdown-item"><a href="#">Levels2</a></div>
                        </div>
                    </div>*/}
                    {/* <div className="ml-auto complete-sec">
                        <button type="button" className="btn btn-info"    onClick={()=>{this.props.handleSaveData()}}>SAVE DATA</button>
                    </div> */}
                    {/* <div className="ml-auto complete-sec">
                        <button type="button" className="btn btn-info"  onClick={this.exportDataHandler}>EXPORT</button>
                    </div>
                    <div className="ml-auto complete-sec">
                        <Link to={"/excel-uploads/"+this.state.projectId+"/"+this.state.processId} target="_blank" className="btn btn-info center-importbutton">IMPORT</Link>
                    </div> */}
                    {/* <div className="ml-auto complete-sec">
                        <button type="button" className="btn btn-primary" disabled={(this.props.processes[0]) ? ((this.props.processes[0].status ==3)  ? true : false) : true } onClick={()=>{this.props.handleMarkComplete()}}>MARK COMPLETE</button> 
                        <button type="button" className="btn btn-primary" style={{display: (this.props.processes[0]) ? ((this.props.processes[0].status ==3)   ? "none" : "block") : "block" }}  onClick={()=>{this.props.handleMarkComplete()}}>MARK COMPLETE</button> 
                        <button type="button" className="btn btn-primary" style={{display: (this.props.processes[0]) ? ((this.props.processes[0].status ==3)  ? "block" : "none") : "none" }}  onClick={()=>{this.props.handleMarkUnComplete()}}>UNCOMPLETE</button>         
                    </div> */}
                    {/* <div className="ml-auto pr-3">
                        <select className="custom-select" value={this.state.actionVal} onChange={(e)=>this.actionChangeHandler(e)}>this.state.scoringAction
                        <option value="">Actions</option>
                        <option value="export">Export</option>
                        <option value="import">Import</option>
                        </select>
                    </div> */}
                     <div className="ml-auto pr-3">
                     <button style={{textAlign:'left'}} className="custom-select"  data-toggle="dropdown" role="button" aria-expanded="false">Actions<span class="caret"></span></button>
    <ul class="dropdown-menu" role="menu">
       <li><a className="dropdown-item" style={{fontSize : "14px"}}  onClick={(e)=>this.actionChangeHandler(e,"export")}>Export</a></li>
       <li><Link className="dropdown-item" style={{fontSize : "14px"}} to={`/excel-uploads/${this.state.projectId}/${this.state.processId}/${this.props.projectVersionId}`} >Import</Link></li>
       <li><a className="dropdown-item" style={{fontSize : "14px",cursor: "pointer"}}  onClick={this.toggleshow.bind(this, 1)}>Add/Update scoring mechanisms weightage</a></li>
       {/*<li><Link className="dropdown-item" style={{fontSize : "14px"}} onClick={()=>this.props.updateRelation()}  >View Relation</Link></li>*/}
       
    </ul>
                        {/* <select className="custom-select" value={this.state.actionVal} onChange={(e)=>this.actionChangeHandler(e)}>
                        <option value="">Actions</option>
                        <option value="export">Export</option>
                        <option value="import">Import</option>
                        </select> */}
                       <ModalPopup isOpen={this.state.isshow} toggle={this.toggleshow.bind(this)} title="Select scoring mechanisms weightage "  onSave={this.saveScoringmechanisms.bind(this)} onDelete={this.deleteGridHandler} className="capability_modeling modal-lg" footer={true} saveBtnTitle={this.state.scoringAction ? "SAVE GRID" : "EDIT GRID"}
                          cancelButton={!this.state.scoringAction}>
                            <div className="row mt-4">
                                <div className="col-sm-12">
                                    <h3 className="mb-4">Add from AmploFly 4.0 provide attributes</h3>
                                    {scoringmechanisms}
                                </div>
                                
                            </div>
                        </ModalPopup>

                    </div>
                    <div className="savelink" style={{display:'inline-flex'}}>
                        <div onClick={()=>this.checkScoring()}>
                        <div style={(this.props.CanScore && this.props.CanScore=='1')?{}:{pointerEvents:'none'}}>
                        {(this.props.processes[0]) ? (this.props.processes[0].status ==3)?<a href="#" onClick={this.props.modelingMode == 1?()=>{}:()=>{this.props.toggleIncompletePopUp()}}>Mark as InComplete</a>:<a href="#" onClick={this.props.modelingMode == 1?()=>{}:()=>{this.props.handleMarkComplete()}}>Mark as complete</a>:<a href="#">Mark as complete</a>}
                        </div>
                        </div>
                        <span>  | </span>
                        <a href="#" onClick={(this.props.processes[0])?(this.props.processes[0].status ==3 || this.props.modelingMode == 1)?()=>{}:()=>{this.props.handleSaveData()}:()=>{}} >Save</a>
                    </div>
                </div>
                </>
            
        )
    }
}


export default OrderExecution;