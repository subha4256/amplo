import React, { Component } from 'react';
import swal from "sweetalert"; 
import { Row } from 'reactstrap';
import { CapabilityAsideWrapper } from './Styling/CapabilityStyling';
import axios from "axios";
import config from '../../config';
import { responseMessage } from '../../utils/alert';
import CapabilityDependentDetails from './CapabilityDependentDetails';

class CapabilityAside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processes: [] ,
       
        }
    }
    handleDragStart = (ev, text, id, index) => {
        console.log(id);
        this.props.onDragStart(ev, text, id, index);
    }
    handleDrop = (ev, fId, pId, functionKey, phaseKey, phaseName, phaseId) => {
        if (!this.props.modelingMode) {
            this.props.onDrop(ev, fId, pId, functionKey, phaseKey, phaseName, phaseId);
        }
    }

    handleDragOver = (ev) => {
        ev.preventDefault();
    }
    static getDerivedStateFromProps(nextProps) {
        return({
            processes: nextProps.processes
        })
    }
    editProcessName(index) {
        this.setState({
            ["showName"+index]: 'none',
            ["showText"+index]: 'block'
        })
    }
    addProcess(e, index,DecompositionProcessLevel1ID) {
        this.setState({
            ["showName"+index]: 'inline-block',
            ["showText"+index]: 'none'
        });
        this.props.addProcess(e, index,DecompositionProcessLevel1ID);
    }
    handleRemoveProcess(e, pIndex, DecompositionProcessLevel1ID) {
        e.preventDefault();
        swal({
            title: "Are you sure you want to delete this process?",
            //text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((data) => {
            if(data) {
                let processes = this.state.processes;
                processes.splice(pIndex, 1);
                this.setState({processes});
                if(DecompositionProcessLevel1ID !== -1) {
                    this.props.handleRemoveProcess(DecompositionProcessLevel1ID);
                }
            }
        })
    }
    render() {


        console.log("Capability Aside =>>>" , this.props)
        console.log("Capability Aside =>>>" , this.state)


        let processList = this.state.processes.map((process, i) => {
            //console.log( parseInt(process.DecompositionProcessLevel1ID) +'===='+process.DecompositionProcessLevel1ID );
            return(
                <div className={process.Status === "1" ? "select-activity mb-2 isDecomposed" : "select-activity mb-2"} key={process.ProcessLevel1Title+'-'+process.DecompositionProcessLevel1ID} rel={process.DecompositionProcessLevel1ID} onDragStart={!this.props.modelingMode && !this.props.readOnly ? (e) => this.handleDragStart(e, process.ProcessLevel1Title, process.DecompositionProcessLevel1ID, i) : () => {}} draggable onDragOver={(e) => this.handleDragOver(e)} onDrop={(e) => this.props.handleAsideDrop(e, process.ProcessLevel1Title, process.DecompositionProcessLevel1ID, i)}>
                    <span className="processLabel" onClick={!this.props.modelingMode && !this.props.readOnly ? this.editProcessName.bind(this, i) : () => {}} style={{display: this.state["showName"+i]}}>{ process.ProcessLevel1Title }</span><input type="text" name={'processText-'+i} onBlur={(e) => this.addProcess(e, i,process.DecompositionProcessLevel1ID)} defaultValue={process.ProcessLevel1Title} className="processText" style={{display: this.state["showText"+i]}} />
                    <a href="#" className="float-right" onClick={(e) => this.handleRemoveProcess(e, i, process.DecompositionProcessLevel1ID)}><i className="fa fa-times"></i></a>
                </div>
            )
        })
    
        return(
            <>
            {(this.props.projectId != 0 && this.props.projectId != "0")?<CapabilityAsideWrapper className="aside-menu aside-menu-right" style={(this.props.projectId != 0 && this.props.projectId != "0")?{display:"block"}:{display:"none"}}>
                {(this.props.projectId != 0 && this.props.projectId != "0")?<Row>
                    <div className="tab-content">
                        <div className="tab-pane active px-3 tab-message" id="messages" role="tabpanel">
                            <div className='d-flex'>
                                <a href='#' className='toggleRightBar' id='hideRightBar'><i className='fa fa-angle-right'></i></a>
                                <h3>L1 Process Bank</h3>
                            </div>
                            <div className="message p-3">
                                <h4 className="font-weight-bold">Add New Process</h4>
                                <p className="text-muted">Input the process description name and drag & drop in the process you want to
                                replace.</p>
                                <a href="#" className="add-activity" onClick={(e) => this.props.addActivity(e)}>+ Add New Process</a>
                            </div>
                            <div className="message p-3">
                                <h4 className="font-weight-bold">Select Process</h4>
                                { processList }
                                </div>

                            { this.props.projectName && ( <div className="message p-3 ">
                              <p className="font-weight-bold text-secondary">Project Linkage: <strong className="text-dark">{ this.props.projectName}</strong> </p>
                              <p className="font-weight-bold text-secondary">As-Is AFLY Score:  <strong className="text-dark" >{this.props.score.AsIsAflyScore}</strong> </p> 
                              <p className="font-weight-bold text-secondary">Re-Establish Score: <strong className="text-dark" >{this.props.score.ReestablishAsIsAflyScore}</strong> </p>
                            </div>)}
                              
                            {/*this.props.projectId?<CapabilityDependentDetails projectId={this.props.projectId} />:''*/}
                        </div>
                    </div>
                </Row>:""}
            </CapabilityAsideWrapper>:""}
            </>
        )
    }
}

export default CapabilityAside;