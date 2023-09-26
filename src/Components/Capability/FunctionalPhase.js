import React, { Component } from 'react';
import Style1 from './templates/Style1';
import Style2 from './templates/Style2';
import Style3 from './templates/Style3';
import Style4 from './templates/Style4';
import Style5 from './templates/Style5';
import Style6 from './templates/Style6';
import Style7 from './templates/Style7';
import Style8 from './templates/Style8';
import Style9 from './templates/Style9';
import Style10 from './templates/Style10';
import Style11 from './templates/Style11';
import Style12 from './templates/Style12';
import Style13 from './templates/Style13';
import Style14 from './templates/Style14';
import Style15 from './templates/Style15';
import Style16 from './templates/Style16';
import Style17 from './templates/Style17';
import ModalPopup from '../common/ModalPopup';
import Col from 'reactstrap/lib/Col';
import _ from 'underscore';

import axios from 'axios';
import config from '../../config';
import { responseMessage } from '../../utils/alert';
import { connect } from 'react-redux';

import {fetchProcessData } from '../../actions/capabilityActions';
import Modal from 'react-bootstrap/Modal'
import { confirmAlert } from 'react-confirm-alert';
import "../../../node_modules/react-confirm-alert/src/react-confirm-alert.css"


// import hello from "../../common/images"

/*const borderBlue = {
    border: '3px #083ac8 solid !important'
};*/
class FunctionalPhase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isProcesOpen: false,
            functionId: "",
            phaseId: "",
            originalTemplateStyles: [{name: 'style1', count: 6}, {name: 'style2', count: 4}, {name: 'style3', count: 7}, {name: 'style4', count: 6}, {name: 'style5', count: 6}, {name: 'style6', count: 7}, {name: 'style7', count: 8}, {name: 'style8', count: 6}, {name: 'style9', count: 8}, {name: 'style10', count: 4}, {name: 'style11', count: 7}, {name: 'style12', count: 4}, {name: 'style13', count: 5}, {name: 'style14', count: 10}, {name: 'style15', count: 9}, {name: 'style16', count: 11}, {name: 'style17', count: 12}],
            templateStyles: [{name: 'style1', count: 6}, {name: 'style2', count: 4}, {name: 'style3', count: 7}, {name: 'style4', count: 6}, {name: 'style5', count: 6}, {name: 'style6', count: 7}, {name: 'style7', count: 8}, {name: 'style8', count: 6}, {name: 'style9', count: 8}, {name: 'style10', count: 4}, {name: 'style11', count: 7}, {name: 'style12', count: 4}, {name: 'style13', count: 5}, {name: 'style14', count: 10}, {name: 'style15', count: 9}, {name: 'style16', count: 11}, {name: 'style17', count: 12}],
            isEditFuncPhaseOpen: false,
            editedFuncPhase: {},
            editType: '',
            TemplateFunctPhaseStyleAssignmentID:"",
            processTitleId: "",
            processFunName: "",
            updateProcessTitle: '', 
            addNew: ""
        }
    }
    
    handleDrop = (ev, fId, pId, functionKey, phaseKey, phaseName, phaseId) => {
        if (!this.props.modelingMode) {
            this.props.onDrop(ev, fId, pId, functionKey, phaseKey, phaseName, phaseId);
        }
    }

    handleDragOver = (ev) => {
        ev.preventDefault();
    }
    getValueByKey = (key, func, phase) => {

        let searchResults = this.props.searchResults;
        let searchStr = this.props.searchStr;
        //console.log(searchStr)
        if (searchResults.hasOwnProperty(func) == true && searchStr !== "") {
            let searchFunction = searchResults[func];
            if (searchFunction.hasOwnProperty(phase) == true) {
                let searchPhase = searchFunction[phase];
                var filtered = searchPhase.filter(n => n.ProcessLevel1Name === key).length;
                return filtered;
            }
        }else {
            return 0;
        }
    }
    renderProcess(fIndex, pIndex , getSytleId , selectProcessLevelBox , getStyleName ,isEditableProcess ) {

        if (Object.keys(this.props.processData).length > 0) {
            //console.log(this.props.processData);
            //console.log(this.props.functions);
            //console.log(this.props.phases);
            ////console.log(fIndex, pIndex)
            // let fname = 'function'+this.props.functions[fIndex-0].DecompositionFunctionProjectID;
            // let pname = 'phase'+this.props.phases[pIndex-0].DecompositionPhaseProjectID;
            // if(fIndex === 1 && pIndex === 1) {
            let fname = 'function' + this.props.functions[fIndex - 1].DecompositionFunctionProjectID;
            let pname = 'phase' + this.props.phases[pIndex - 1].DecompositionPhaseProjectID;
            // console.log(fname, pname);
            //console.log(this.props.processData[fname]);
            let phaseData = [];
            let templateId = ""
            if (this.props.processData[fname]) {
                if (this.props.processData[fname][pname]) {
                    phaseData = this.props.processData[fname][pname];
                    getSytleId(phaseData[0].TemplateFunctPhaseStyleAssignmentID)
                    templateId = phaseData[0].TemplateFunctPhaseStyleAssignmentID;
                }
            }
            if (phaseData.length > 0) {
                return (
                    <>
                        {
                            phaseData.map((phase, i) => {
                                let filteredCount = 0;
                                if (phase.ProcessLevel1Name) {
                                    filteredCount = this.getValueByKey(phase.ProcessLevel1Name, `function${fIndex}`, `phase${pIndex}`)
                                }
                                let borderBlue = "";
                                let processClass = 'box-white';
                                if(!phase.AggrScore){
                                if (phase.Status === "2" && !(filteredCount > 0)) {
                                    processClass = 'box-warning';
                                }
                                if (phase.Status === "3" && !(filteredCount > 0)) {
                                    processClass = 'box-sucess';
                                }
                                if (filteredCount > 0) {
                                    borderBlue = 'borderBlue';
                                }
                                }
                                let ratingClass="";
                                //console.log(phase);
                                if (phase.AggrScore && phase.Status === "3") {
                                    let rating = Math.ceil(phase.AggrScore);
                                    ratingClass = " bg-poor";
                                    if (rating === 5) {
                                        ratingClass = " bg-excellent";
                                    } else if (rating === 4) {
                                        ratingClass = " bg-good";
                                    } else if (rating === 3) {
                                        ratingClass = " bg-average";
                                    } else if (rating === 2) {
                                        ratingClass = " bg-satisfactory";
                                    }
                                   // processClass = processClass + borderBlue + ratingClass;
                                }

                                if(phase.style_id == 0) {
                                        getStyleName("Style0")
                                }
                                
                                if (i >= 0 ) {
                                    if(phase.style_id == 1)
                                    {    return (
                                            <Style1 
                                            isEditableProcess={isEditableProcess}
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleDragOver={this.handleDragOver} handleGridDragStart={this.props.handleGridDragStart} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                    else if(phase.style_id == 2)
                                    {    return (
                                            <Style2 
                                            isEditableProcess={isEditableProcess}
                                            
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                    else if(phase.style_id == 3)
                                    {    return (
                                            <Style3 
                                            isEditableProcess={isEditableProcess}
                                            
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                    else if(phase.style_id == 4)
                                    {    return (
                                            <Style4
                                            isEditableProcess={isEditableProcess}
                                            
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                    else if(phase.style_id == 5)
                                    {    return (
                                            <Style5
                                            isEditableProcess={isEditableProcess}
                                            
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                    else if(phase.style_id == 6)
                                    {    return (
                                            <Style6
                                            isEditableProcess={isEditableProcess}
                                            
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                    else if(phase.style_id == 7)
                                    {    return (
                                            <Style7
                                            isEditableProcess={isEditableProcess}
                                            
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                    else if(phase.style_id == 8)
                                    {    return (
                                            <Style8
                                            isEditableProcess={isEditableProcess}
                                            
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                    else if(phase.style_id == 9)
                                    {    return (
                                            <Style9
                                            isEditableProcess={isEditableProcess}

                                             selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                    else if(phase.style_id == 10)
                                    {    return (
                                            <Style10
                                            isEditableProcess={isEditableProcess}
                                            
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                    else if(phase.style_id == 11)
                                    {    return (
                                            <Style11
                                            isEditableProcess={isEditableProcess}
                                            
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                    else if(phase.style_id == 12)
                                    {    return (
                                            <Style12 
                                            isEditableProcess={isEditableProcess}
                                            
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                    else if(phase.style_id == 13)
                                    {    return (
                                            <Style13 
                                            isEditableProcess={isEditableProcess}
   
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                    else if(phase.style_id == 14)
                                    {    return (
                                            <Style14 
                                            isEditableProcess={isEditableProcess}
                                            
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }    
                                    else if(phase.style_id == 15)
                                    {    return (
                                            <Style15 
                                            isEditableProcess={isEditableProcess}
                                            
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                    else if(phase.style_id == 16)
                                    {    return (
                                            <Style16 
                                            isEditableProcess={isEditableProcess}
                                            
                                            selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                        );
                                        }
                                        else if(phase.style_id == 17)
                                        {    return (
                                                <Style17
                                                isEditableProcess={isEditableProcess}
                                                selectProcessLevelBox={selectProcessLevelBox} i={i} processClass={processClass} ratingClass={ratingClass} getValueByKey={this.getValueByKey} fname={fname} pname={pname} fname1={`function${fIndex}`} pname1={`phase${pIndex}`} handleGridDragStart={this.props.handleGridDragStart} handleDragOver={this.handleDragOver} handleDrop={this.handleDrop} key={phase.ProcessLevel1Name + i} processData={phase} functionId={this.props.functions[fIndex - 1].DecompositionFunctionProjectID} phaseId={this.props.phases[pIndex - 1].DecompositionPhaseProjectID} templateId={this.props.projectId} modelingMode={this.props.modelingMode} defaultVersion={this.props.defaultVersion} />
                                            );
                                            }         
                                }
                            })
                        }

                    </>
                )
            }else{
                return null
            }
            
        }
    }


    toggle(e, functionId, phaseId) {

        console.log("Template Id ==>",functionId)
        e.preventDefault();
   
        let styles = this.state.templateStyles;
      
        styles = this.state.originalTemplateStyles;
        
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
            functionId: functionId,
            phaseId: phaseId,
            templateStyles: styles,
            TemplateFunctPhaseStyleAssignmentID: functionId,
        }))
    }

     /* METHOD:  TO UPDATE THE STYLE OF PHASE AND FUNCTION PROCESS..**************
                    BY: SONU SHARMA   3-09-2021  */
    hanldeSelectStyle=(name)=>{
        let styleId = name.replaceAll("Style","")

        let data = { 
            TemplateFunctPhaseStyleAssignmentID: this.state.TemplateFunctPhaseStyleAssignmentID,
            StyleID: styleId ,
            ProjectId:this.props.projectId
        }
         axios.patch(`${config.laravelBaseUrl}uspUpdateStyleAgainstProjectLevelNew`,
         data,{
            headers : {
              authorization : sessionStorage.getItem('userToken')
            }
          }).then(res=>{
            console.log({res})
            if(res.status == 200) {
                this.setState({ isOpen: false})
                setTimeout(() => {
                    responseMessage("success" , res.data.data[0].MessageName)
                    this.props.fetchProcessData(this.props.projectId , this.props.defaultVersion)
                }, 2000);
            }
          }).catch((error) =>{
            console.log("Error", error)
            responseMessage("error", "Somethig went wrong while updating styels")
          })

    }


    /*  METHOD: UPDATE FOR PROCESS LEVEL TITLE AND DELETE ************
     BY: SONU SHARMA   6-09-2021  */z
     selectProcessLevelBox =(id, name) => {
         if(name == "edit") {
             this.setState({ isProcesOpen: true , processTitleId:id , processFunName: name });
         }else {
            confirmAlert({
                title: 'Confirmation!',
                message: 'Deleting a process will delete all its decomposition data. Do you still want to proceed?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            axios.post(`${config.laravelBaseUrl}uspDeleteProcessAgainstProjectLevelForDelete`,
                            {DecompositionProcessLevel1ID: id} ,{
                            headers : {
                                authorization : sessionStorage.getItem('userToken')
                            }
                            }).then(res=>{
                            console.log({res})
                            if(res.status == 200) {
                                this.props.fetchProcessData(this.props.projectId , this.props.defaultVersion)
                                responseMessage("success", "Process Title Delete Successfully")
                                this.setState({ updateProcessTitle: "" })
                            }
                            }).catch((error) =>{
                            console.log("Error", error)
                            responseMessage("error", "Somethig went wrong while deleting Title")
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
 } 

    /*  METHOD: UPDATE FOR PROCESS LEVEL TITLE ************
     BY: SONU SHARMA   6-09-2021  */
     submitUpdateHandle =()=>{
        let data = {
             DecompositionProcessLevel1ID: this.state.processTitleId,
             ProcessLevelName: this.state.updateProcessTitle
        };

        if( this.state.processFunName == "edit" ) {
            axios.patch(`${config.laravelBaseUrl}uspUpdateProcessAgainstProjectLevel`,
            data,{
               headers : {
                 authorization : sessionStorage.getItem('userToken')
               }
             }).then(res=>{
               console.log({res})
               if(res.status == 200) {
                   this.props.fetchProcessData(this.props.projectId , this.props.defaultVersion)
                   responseMessage("success", "Process Title Update Successfully");

                   this.setState({ updateProcessTitle: "" })
               }
             }).catch((error) =>{
               console.log("Error", error)
               responseMessage("error", "Something Went Wrong While Process Title!")
             }) 
        }
         this.setState({ isProcesOpen: false })
     }


        /* METHOD: REMOVE STYLE ***********
        BY: SONU SHARMA   6-09-2021  */
           deleteStyle =(id)=>{
               if (!id) return null;
            confirmAlert({
                        title: 'Confirmation',
                        message: 'You want To Remove This Style?',
                        buttons: [
                            {
                                label: 'Yes',
                                onClick: () => {
                                    axios.delete(`${config.laravelBaseUrl}uspDeleteStyleAgainstProjectLevel/${id}`,
                                    {
                                    headers : {
                                        authorization : sessionStorage.getItem('userToken')
                                    }
                                    }).then(res=>{
                                    console.log({res})
                                    if(res.status == 200) {
                                        this.props.fetchProcessData(this.props.projectId , this.props.defaultVersion)
                                        responseMessage("success", "Style delete successfully")
                                        
                                    }
                                    }).catch((error) =>{
                                    console.log("Error", error)
                                    responseMessage("error", "Somethig went wrong while removing style")
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
        console.log("Funtction Phase Steta==>",this.state);
        console.log("Function Phase ==>", this.props)

        const styleGrid = this.state.templateStyles.map((style, key) => {
            let styleName = style.name.charAt(0).toUpperCase() + style.name.slice(1);
            return (
                <Col style={{ cursor: "pointer" }} sm="3" key={'styleGrid-'+key}  onClick={()=>this.hanldeSelectStyle(styleName)}>
                    <img height="150" src={require('../../common/images/CapabilityStyles/'+styleName+'.PNG')} />
                    <p className="text-center">{styleName}</p>
                </Col>
            )
        })


        let functionPhase = [];
        for (let i = 1; i <= this.props.phases.length; i++) {
            //console.log(i, this.props.index);
            //let wrapClassName = 'function' + this.props.index + '-phase' + i;
            let wrapClassName = 'function1' + '-phase1';
            let wrapClassName1 = 'function' + this.props.index + '-phase' + i;

            let id = ""
            const getSytleId = (param) =>{
                  return id = param
            }

            let noStyle = ""
            const getSytleName = (param) =>{
                return noStyle = param
          }

            let processWrap = this.renderProcess(this.props.index, i , getSytleId , this.selectProcessLevelBox , getSytleName , this.props.isEditableProcess );
            // console.log("processWrap ==>",processWrap);
              
            functionPhase.push(
                <>
                {/* REMOVE THE COMMENT AFTER THE PR MERGED ... *****/}
               {this.props.isEditableProcess && !noStyle && ( <div><a onClick={(e) => this.toggle(e ,id)}  href="#" className="text-dark pr-1 editStyle ml-1"><i className="fa fa-edit"></i></a>
                <a style={{ cursor: 'pointer'}} onClick={()=> this.deleteStyle(id)} className="text-dark pr-1 removeStyle"><i className="fas fa-times-circle" ></i></a>
                </div>
                )}
                <div className={wrapClassName} key={wrapClassName1} style={{ padding: '3px 5px 0px 5px' }}>
                { this.props.isEditableProcess&& this.props.isEditableProcess && noStyle &&  <a onClick={(e) => this.toggle(e ,id)}  href="#" className=" p-3 editStyle ml-1 mt-2">Add New</a>} 
                    {processWrap}
                </div>
                </>
            );
        }
        return (
            <>
                {functionPhase}
                <div>
                 <ModalPopup isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} title="Select Style" onSave={()=>{}} className="capabilityStylingModal modal-lg" footer={false} >
                 <div className="row">
                     {styleGrid}
                     </div>
                 </ModalPopup>

                 <Modal show={this.state.isProcesOpen} onHide={()=> this.setState({isProcesOpen:false})}>
                <Modal.Header closeButton>
                <Modal.Title>Update Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Name</label>
                    <input placeholder="Type..." type="text" class="form-control" onChange={(e) => this.setState({ updateProcessTitle: e.target.value})} value={this.state.updateProcessTitle} />
                </div>
                   </form>
                  </Modal.Body>
                  <Modal.Footer>
                  <button className="btn btn-danger" variant="secondary" onClick={()=> this.setState( {isProcesOpen:false})}>
                    Close
                  </button>
                 <button className="btn btn-primary" variant="primary" onClick={this.submitUpdateHandle} disabled={!this.state.updateProcessTitle}>
                        Update
                    </button>
              </Modal.Footer>
           </Modal>
          </div>
         </>
        );
    }
}

export default connect(null,{ fetchProcessData })(FunctionalPhase);