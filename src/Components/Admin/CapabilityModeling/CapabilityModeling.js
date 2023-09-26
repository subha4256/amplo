import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import {Prompt} from 'react-router-dom';
import _ from 'underscore';

import DashboardHeader from "../../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../../includes/dashboardFooter/FooterComponent';
import { CapabilityModelingWrapper } from './Styling/CapabilityModeling';
import { fetchProcessData, saveTemplateDecompositionData } from '../../../actions/adminCapabilityModelingActions';
import OrderExecution  from './OrderExecution';
import Processes  from './Processes';
import SidebarJs from '../../../common/js/sidebarAnimation';
import {errorAlert,responseMessage} from '../../../utils/alert';
import CapabilityRelationModal from '../CapabilityModeling/CapabilityRelationModal';

class CapabilityModeling extends Component {
    constructor (props){
        super (props);
        this.state = {
            processes: [],
            parentId:"",
            selectedCol: "",
            templateId: this.props.match.params.templateId,
            processId: this.props.match.params.processId,
            functionId: this.props.match.params.functionId,
            phaseId: this.props.match.params.phaseId,
            disabledButton:1,
            saveDecomposition:{},
            loading:true,
            isBlocking: false,
            relationModal:false
        };
        this.sidebarAnimation=new SidebarJs();        
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.beforeunload.bind(this));
    }
    
    beforeunload(e) {
        if (this.state.isBlocking) {
          e.preventDefault();
          e.returnValue = true;
        }
    }

    componentDidMount() {
        try{
            let params = {
                templateId: this.state.templateId,
                processId: this.state.processId,
                functionId: this.state.functionId,
                phaseId: this.state.phaseId,
            }
            this.props.fetchProcessData(params);
            this.sidebarAnimation.toggle();
            window.addEventListener('beforeunload', this.beforeunload.bind(this));
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
    componentDidUpdate() {
        try{
            if(this.state.processId !== this.props.match.params.processId) {
                this.setState({
                    processId: this.props.match.params.processId
                }, function() {
                    let params = {
                        templateId: this.state.templateId,
                        processId: this.state.processId,
                        functionId: this.state.functionId,
                        phaseId: this.state.phaseId,
                    }
                    this.props.fetchProcessData(params);
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
    componentWillReceiveProps(nextProps) {
        if(Object.keys(nextProps.processes).length > 0) {
            this.setState({
                processes: nextProps.processes.processes,
                loading: false
            })
        }
       
        //if( Object.keys(nextProps.saveDecomposition).length > 0 && nextProps.saveDecomposition.success==true){
        if(nextProps.saveDecomposition!=this.props.saveDecomposition){
            let params = {
                templateId: this.state.templateId,
                processId: this.state.processId,
                functionId: this.state.functionId,
                phaseId: this.state.phaseId,
            }
            this.setState({
                loading:false
            })
            this.props.fetchProcessData(params);
            responseMessage("success", nextProps.saveDecomposition.message, "");
            this.forceUpdate();
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
        for(let i in this.state.processes[0].child) {
            if(this.state.processes[0].child[i].id === this.state.parentId && this.state.processes[0].child[i].ProcessLevel == selectedCol) {
                let processes = this.state.processes;
                processes[0].child[i].action = "delete";
                this.setState({
                    processes: processes,
                    selectedCol: ""
                });
                break;
            }else{
                for(let j in this.state.processes[0].child[i].child) {
                    
                    if(this.state.processes[0].child[i].child[j].id === this.state.parentId && this.state.processes[0].child[i].child[j].ProcessLevel == selectedCol) {
                        let processes = this.state.processes;
                        processes[0].child[i].action = "update";
                        processes[0].child[i].child[j].action = "delete";
                        this.setState({
                            processes: processes,
                            selectedCol: ""
                        })
                        break;
                    }else{
                        for(let k in this.state.processes[0].child[i].child[j].child) {
                            if(this.state.processes[0].child[i].child[j].child[k].id === this.state.parentId && this.state.processes[0].child[i].child[j].child[k].ProcessLevel == selectedCol) {
                                let processes = this.state.processes;
                                processes[0].child[i].action = "update";
                                processes[0].child[i].child[j].action = "update";
                                processes[0].child[i].child[j].child[k].action = "delete";
                                this.setState({
                                    processes: processes,
                                    selectedCol: ""
                                })
                                break;
                            }else{
                                for(let l in this.state.processes[0].child[i].child[j].child[k].child) {
                                    if(this.state.processes[0].child[i].child[j].child[k].child[l].id === this.state.parentId && this.state.processes[0].child[i].child[j].child[k].child[l].ProcessLevel == selectedCol) {
                                        let processes = this.state.processes;
                                        processes[0].child[i].action = "update";
                                        processes[0].child[i].child[j].action = "update";
                                        processes[0].child[i].child[j].child[k].action = "update";
                                        processes[0].child[i].child[j].child[k].child[l].action = "delete";
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
        //console.log(JSON.stringify( this.state.processes, null, 4))
    }
    
    handleSaveDetail = (gridId, updatedValue, column) => {
        //console.log("hi")
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
    handleCustomerOrders = (parentId, processLevel) =>{
        this.setState({
            parentId:parentId,
            selectedCol: processLevel
        })
    }
    handleSaveData() {
        try {
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
            //console.log(JSON.stringify(this.state.scores, null, 4));
            // update_decomposition_levels_data
            let cmObj = {
                templateId: this.state.templateId,
                processId: this.state.processId,
                processes: this.state.processes,
                status:2
            }
            //console.log(JSON.stringify(cmObj, null, 4));
            //return false;
            this.setState({
                loading:true,
                isBlocking: false
            })
            this.props.saveTemplateDecompositionData(cmObj, this.props.history);
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
    render(){       
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
                <CapabilityModelingWrapper id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        {/* Breadcrumb */}    
                        <ol className="breadcrumb dashbread">
                            <li className="breadcrumb-item active"><a href="#">Home</a></li>
                            <li className="breadcrumb-item">Capability Modeling</li>
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
                                {<img src={require('./../../../common/images/diva-icon.png')} className="logo-img" alt="Logo" />}
                                    <a className="btn powered p-0" href="#">
                                        <i className="icon-graph"></i> &nbsp;
                                    <i>Powered by Amploglobal</i>
                                    </a>
                            </li>
                        </ol>
                        {/* End Breadcrumb */}
                       
                        <div className="container-fluid container-dashboard">
                            <div className="capability-responsive-section px-4 my-5">
                                <OrderExecution processId={this.state.processId} processes={ this.state.processes } disabledButton={this.state.disabledButton} updateRelation={()=>this.setState({relationModal:!this.state.relationModal})} handleSaveData={this.handleSaveData.bind(this)} templateId={this.state.templateId} functionId={this.state.functionId} phaseId={this.state.phaseId} />
                                {/*Start L1 to L5 Processes Section */}
                                <Row className="mt-4 l1-l5-scroll">
                                    <div className="processes-section">
                                        <Processes processes={ this.state.processes } selectedCol={this.state.selectedCol} onClickhandleCustomerOrders={ this.handleCustomerOrders } onClickhandleAddProcess={ this.handleAddProcess } handleDeleteProcess={this.handleDeleteProcess.bind(this)} saveTitle={this.handleSaveTitle} />
                                    </div>
                                </Row>
                                { /*End L1 to L5 Processes Section */}

                            </div>
                        </div>
                                    
                    </div>
                </CapabilityModelingWrapper>
                {this.state.relationModal?<CapabilityRelationModal projectId={this.state.projectId} processId={this.state.processId} updateRelation={()=>this.setState({relationModal:!this.state.relationModal})}/>:''}
            </div>,
            <FooterComponent key="dashboard-footer"></FooterComponent>
            ]
        )
    }
}
CapabilityModeling.propTypes = {
    fetchProcessData: PropTypes.func.isRequired,
    processes: PropTypes.object.isRequired,
    saveTemplateDecompositionData: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    processes: state.adminCapabilityModeling.processes,
    saveDecomposition: state.adminCapabilityModeling.saveDecomposition,
    errors: state.errors
});
export default connect(mapStateToProps, { fetchProcessData, saveTemplateDecompositionData })(CapabilityModeling);