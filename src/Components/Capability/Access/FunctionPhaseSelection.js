import React, {Component} from 'react';
import _ from 'underscore';
import {responseMessage} from '../../../utils/alert';
import { Label, Row, Col, FormGroup } from 'reactstrap';
import ModalPopup from '../../common/ModalPopup';

class FunctionPhaseSelection extends Component {
    constructor(props) {
        super(props);
        this.state={
            phasecount:0,
            functioncount:0,
            isOpen: 0,
            editedFuncPhase: {},
            editType: ''
        }
    }
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps.projectPhases); 
        // console.log(nextProps.projectFunctions); 
        // console.log(this.props.projectFunctions); 
        if(nextProps.projectFunctions && nextProps.projectFunctions !== this.props.projectFunctions) {
            //console.log(this.props.projectFunctions); 
            if(nextProps.projectFunctions.length > 0) {
                for(let p in nextProps.projectFunctions) {
                    if(nextProps.projectFunctions[p].selected == 1) {
                        this.setState({
                            ['function-'+nextProps.projectFunctions[p].DecompositionFunctionID]: true
                        }, function() {
                            this.props.handleFunctionChange(true, nextProps.projectFunctions[p].DecompositionFunctionID, nextProps.projectFunctions[p].FunctionTitle);
                        })
                    }else{
                        this.setState({
                            ['function-'+nextProps.projectFunctions[p].DecompositionFunctionID]: false
                        })
                    }
                }
            }
        }
        if(nextProps.projectPhases && nextProps.projectPhases !== this.props.projectPhases){
            // console.log(nextProps.projectPhases);
            // console.log(this.props.selectedPhases);
            if(nextProps.projectPhases.length > 0) {

                for(let p in nextProps.projectPhases) {
                    if(nextProps.projectPhases[p].selected == 1) {
                        this.setState({
                            ['phase-'+nextProps.projectPhases[p].DecompositionPhaseID]: true
                        }, function() {
                            this.props.handlePhaseChange(true, nextProps.projectPhases[p].DecompositionPhaseID, nextProps.projectPhases[p].PhaseTitle);
                        })
                    }else{
                        this.setState({
                            ['phase-'+nextProps.projectPhases[p].DecompositionPhaseID]: false
                        })
                    }
                }
            }
        }
    }


    componentWillMount() {
        // console.log(1);
    }

    toggle(e, funcPhase, type) {
        e.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen,
            editedFuncPhase: funcPhase,
            editType: type
        })
    }

    handleNameChange(e) {
        let editedFuncPhase = this.state.editedFuncPhase;
        if(this.state.editType === 'function') {
            editedFuncPhase.FunctionTitle = e.target.value;
        }else{
            editedFuncPhase.PhaseTitle = e.target.value;
        }
        this.setState({editedFuncPhase})
    }
    handleNameEdit() {
        this.props.handleNameEdit(this.state.editedFuncPhase, this.state.editType);
        this.setState({
            editedFuncPhase: {},
            editType: '',
            isOpen: false
        })
    }

    handleFunctionChange(e, functionId, functionName) {        
        let functions = this.props.selectedFunctions;
        for(let i in this.props.selectedFunctions ){
            let functionIndex = _.findIndex(this.props.projectFunctions, {"DecompositionFunctionID": this.props.selectedFunctions[i].FunctionId});
            if(functionIndex === -1){
                functions.splice(this.props.selectedFunctions[i], 1);
            }
        }
        // console.log(functions);
        if(e.target.checked) {
            if(functions.length < 4){
                this.setState({
                    ['function-'+functionId]: true
                }, function() {
                    this.props.handleFunctionChange(true, functionId, functionName);
                })
            }else{
                document.getElementById("Function-"+functionId).checked = false;
                responseMessage("warning", "You can't select more than 4 functions", "");
            }
        }else{
            this.setState({
                ['function-'+functionId]: false
            }, function() {
                this.props.handleFunctionChange(false, functionId, functionName);
            })
        }
    }

    handlePhaseChange(e, phaseId, phaseName) {
        let phases = this.props.selectedPhases;
        for(let i in this.props.selectedPhases ){
            let phaseIndex = _.findIndex(this.props.projectPhases, {"DecompositionPhaseID": this.props.selectedPhases[i].PhaseId});
            if(phaseIndex === -1){
                phases.splice(this.props.selectedPhases[i], 1);
            }
        }
        // console.log(phases);
        if(e.target.checked) {
            if(phases.length < 3){
                this.setState({
                    ['phase-'+phaseId]: true
                }, function() {
                    this.props.handlePhaseChange(true, phaseId, phaseName);
                });
            }else{
                document.getElementById("phase-"+phaseId).checked = false;
                responseMessage("warning", "You can't select more than 3 phases", "");
            }
        }else{
            this.setState({
                ['phase-'+phaseId]: false
            }, function() {
                this.props.handlePhaseChange(false, phaseId, phaseName);
            });
        }
    }
    render() {
        const functionList = this.props.projectFunctions.map((func, key) => {
            return (
                <div key={'functionHeader-'+key}>
                    <div className="custom-control custom-checkbox" key={'functionHeader-'+key}>
                        <input type="checkbox" className="custom-control-input" id={"Function-"+func.DecompositionFunctionID} onChange={(e) => this.handleFunctionChange(e, func.DecompositionFunctionID, func.FunctionTitle)} checked={this.state['function-'+func.DecompositionFunctionID] ? true : false} />
                        <label className="custom-control-label" htmlFor={"Function-"+func.DecompositionFunctionID}>{ func.FunctionTitle }</label>
                        <a href="#" className="float-right" onClick={(e) => this.toggle(e, func, 'function')} title="Edit"><i className="fas fa-pencil-alt"></i></a>
                    </div>
                </div>
            )
        })
        const phaseList = this.props.projectPhases.map((phase, key) => {
            return (
                <div key={'phaseHeader-'+key}>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id={"phase-"+phase.DecompositionPhaseID} onChange={(e) => this.handlePhaseChange(e, phase.DecompositionPhaseID, phase.PhaseTitle)} checked={this.state['phase-'+phase.DecompositionPhaseID] ? true : false} />
                        <label className="custom-control-label" htmlFor={"phase-"+phase.DecompositionPhaseID}>{ phase.PhaseTitle }</label>
                        <a href="#" className="float-right" onClick={(e) => this.toggle(e, phase, 'phase')} title="Edit"><i className="fas fa-pencil-alt"></i></a>
                    </div>
                </div>
            )
        })
        return (
            <Row className="form-group">
                <Col sm="4" className="tab-manageboxwidth50percent mob-50percent">
                    <label>Functions<span className="text-danger">*</span></label>
                    <div className="managebox">
                        {functionList}                        
                    </div>
                </Col>
                <Col sm="4" className="tab-manageboxwidth50percent mob-50percent">
                    <label>Phases<span className="text-danger">*</span></label>
                    <div className="managebox">
                        {phaseList}
                    </div>
                </Col>
                <Col sm="6">
                </Col>
                <ModalPopup isOpen={this.state.isOpen} toggle={(e) => this.toggle(e, {}, '')} title={this.state.editType === 'function' ? 'Edit Function' : 'Edit Phase'} onSave={this.handleNameEdit.bind(this)} className="funcPhaseEditModal" footer={true} saveBtnTitle="Save">
                    <div className="row">
                        <div className="col-md-12">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="funcPhaseName" className="form-control" value={this.state.editedFuncPhase.DecompositionFunctionID ? this.state.editedFuncPhase.FunctionTitle : this.state.editedFuncPhase.PhaseTitle} onChange={(e) => this.handleNameChange(e)} />
                            </div>
                        </form>
                        </div>
                    </div>
                </ModalPopup>
            </Row>
        )
    }
}

export default FunctionPhaseSelection;