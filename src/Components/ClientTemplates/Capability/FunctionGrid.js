import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import _ from 'underscore';
import ModalPopup from '../../common/ModalPopup';
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


class FunctionGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            functionId: "",
            phaseId: "",
            originalTemplateStyles: [{name: 'style1', count: 6}, {name: 'style2', count: 4}, {name: 'style3', count: 7}, {name: 'style4', count: 6}, {name: 'style5', count: 6}, {name: 'style6', count: 7}, {name: 'style7', count: 8}, {name: 'style8', count: 6}, {name: 'style9', count: 8}, {name: 'style10', count: 4}, {name: 'style11', count: 7}, {name: 'style12', count: 4}, {name: 'style13', count: 5}, {name: 'style14', count: 10}, {name: 'style15', count: 9}, {name: 'style16', count: 11}, {name: 'style17', count: 12}],
            templateStyles: [{name: 'style1', count: 6}, {name: 'style2', count: 4}, {name: 'style3', count: 7}, {name: 'style4', count: 6}, {name: 'style5', count: 6}, {name: 'style6', count: 7}, {name: 'style7', count: 8}, {name: 'style8', count: 6}, {name: 'style9', count: 8}, {name: 'style10', count: 4}, {name: 'style11', count: 7}, {name: 'style12', count: 4}, {name: 'style13', count: 5}, {name: 'style14', count: 10}, {name: 'style15', count: 9}, {name: 'style16', count: 11}, {name: 'style17', count: 12}],
            isEditFuncPhaseOpen: false,
            editedFuncPhase: {},
            editType: ''
        }
    }
    toggle(e, functionId, phaseId) {
        e.preventDefault();
        let selectedGrid = _.findWhere(this.props.processData, {FunctionId: functionId, PhaseId: phaseId});
        let styles = this.state.templateStyles;
        let processes = [];
        if(selectedGrid) {
            processes = selectedGrid.processes;
            processes = _.filter(processes, function(process){ return (process.processTitle !== 'Add Process' || process.HasDecomposition === "1") });
            styles = _.filter(styles, function(style){ return style.count >= processes.length });
        }else{
            styles = this.state.originalTemplateStyles;
        }
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
            functionId: functionId,
            phaseId: phaseId,
            templateStyles: styles
        }))
    }
    /*handleToggle(e, functionId, phaseId) {
        e.preventDefault();
        for(let i in this.props.functions) {
            for(let j in this.props.phases) {
                if(this.props.functions[i].FunctionId !== functionId || this.props.phases[j].PhaseId !== phaseId) {
                    this.setState({
                        ['dropdownOpen-'+this.props.functions[i].FunctionId+this.props.phases[j].PhaseId]: false
                    })
                }
            }
        }
        this.setState(prevState => ({
            ['dropdownOpen-'+functionId+phaseId]: !prevState['dropdownOpen-'+functionId+phaseId]
        }))
    }*/
    componentDidUpdate(prevProps) {
        if(this.props.processData){
        if(this.props.processData.length > 0) {
            if(prevProps.processData !== this.props.processData) {
                for(let i in this.props.processData) {
                    this.handleSelectStyle(this.props.processData[i].StyleTitle, this.props.processData[i].FunctionId, this.props.processData[i].PhaseId);
                }
            }
        }
    }
    }
    toggleFuncPhaseEdit(e, funcPhase, type) {
        e.preventDefault();
        this.setState({
            isEditFuncPhaseOpen: !this.state.isEditFuncPhaseOpen,
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
    handleEditFuncPhase() {
        this.props.handleEditFuncPhase(this.state.editedFuncPhase, this.state.editType);
        this.setState({
            editedFuncPhase: {},
            editType: '',
            isEditFuncPhaseOpen: false
        })
}
    // static getDerivedStateFromProps(nextProps){
    //     if(nextProps.successmsg){
    //         return ({
    //             isOpen: false
    //         })
    //     }
    // }
    handleTitleChange(e, style, index, functionId, phaseId) {
        this.handleSelectStyle(style, functionId, phaseId);
        this.props.handleTitleChange(e, style, index, functionId, phaseId);
    }
    handleRemoveStyle(e, functionId, phaseId) {
        e.preventDefault();
        if(window.confirm('Are you sure to remove this style?')) {
            this.setState({
                ['styleContent'+functionId+phaseId+this.props.templateId]: null
            });
            let styleObj = {
                style: '',
                functionId: functionId,
                phaseId: phaseId
            }
            this.props.handleStyleSelect(styleObj,"remove");
        }
    }
    componentWillReceiveProps = (nextProps) => {
        // console.log(nextProps)
    }
    handleSelectStyle( style, functionId, phaseId, popup) {
        const processData = this.props.processData;
        const styleIndex = _.findIndex(processData, {FunctionId: functionId, PhaseId: phaseId});
        switch(style) {
            case 'style1':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style1 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style2':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style2 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style3':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style3 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style4':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style4 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style5':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style5 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style6':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style6 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.props.handleTitleChange} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style7':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style7 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style8':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style8 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style9':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style9 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style10':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style10 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style11':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style11 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style12':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style12 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style13':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style13 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style14':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style14 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style15':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style15 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style16':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style16 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            case 'style17':
                this.setState({
                    ['styleContent'+functionId+phaseId+this.props.templateId]: <Style17 handleProcessTitleUpdate={this.props.handleProcessTitleUpdate.bind(this)} handleTitleChange={this.handleTitleChange.bind(this)} processData={styleIndex !== -1 && !popup ? processData[styleIndex]['processes'] : []} functionId={functionId} phaseId={phaseId} templateId={this.props.templateId} handleDeleteProcess={this.props.handleDeleteProcess} />,
                    isOpen: false
                });
                break;
            default:
                break;
        }
        if(popup) {
            let styleObj = {
                style: style,
                functionId: this.state.functionId,
                phaseId: this.state.phaseId,
                processes: processData[styleIndex] ? processData[styleIndex]['processes'] : []
            }
            this.props.handleStyleSelect(styleObj,"addNew");
        }
    }
    render() {
        // if(this.props.successmsg){
        //     this.setState({
        //         isOpen:false
        //     })
        // }

        console.log("Client_Functions Props==>", this.props)
       
        const styleGrid = this.state.templateStyles.map((style, key) => {
            let styleName = style.name.charAt(0).toUpperCase() + style.name.slice(1);
            return (
                <Col sm="3" onClick={this.handleSelectStyle.bind(this, style.name, this.state.functionId, this.state.phaseId, true)} key={'styleGrid-'+key}>
                    <img height="150" src={require('../../../common/images/CapabilityStyles/'+styleName+'.PNG')} />
                    <p className="text-center">{styleName}</p>
                </Col>
            )
        })
        const boxContainer = this.props.functions.map((func, i) => {
            let funcTitleEditLinks = null;
            if(this.props.templates.length > 0) {
                if(this.props.templates[this.props.activeItemIndex]) {
                    if(this.props.templates[this.props.activeItemIndex].IsAmploAssigned === "0") {
                        funcTitleEditLinks = <a href="#" className="float-right edit-function-icon" title="Edit" onClick={(e) => this.toggleFuncPhaseEdit(e, func, 'function')}><i className="fas fa-pencil-alt"></i></a>
                    }
                }
            }
            if(func.IsSelected === "1") {
                let uniqId = 'box-container-'+i;
                return (
                    <div className='box-container' key={uniqId}>
                        <div className="heading-box">
                            { func.FunctionTitle }
                            <div className="sort-arrows">
                                <i className="fa fa-arrow-right" onClick={() => this.props.handleSort(func, 'function', 'right')}></i>
                                <i className="fa fa-arrow-left" onClick={() => this.props.handleSort(func, 'function', 'left')}></i>
                            </div>
                            {funcTitleEditLinks}
                        </div>
                        {
                            this.props.phases.map((phase, j) => {
                                if(phase.IsSelected === "1" && phase.DecompositionPhaseId != "0") {
                                    let wrapClassKey = 'processesWrappper function'+func.DecompositionFunctionId+'-phase'+phase.DecompositionPhaseId+this.props.templateId;
                                    let wrapClassName = 'processesWrappper function-phase ';
                                    let styleEditLinks = null;
                                    if(this.state['styleContent'+func.DecompositionFunctionId+phase.DecompositionPhaseId+this.props.templateId] && this.props.templates.length > 0) {
                                        if(this.props.templates[this.props.activeItemIndex]) {
                                            if(this.props.templates[this.props.activeItemIndex].IsAmploAssigned === "0") {
                                                styleEditLinks = <><a href="#" onClick={(e) => this.toggle(e, func.DecompositionFunctionId, phase.DecompositionPhaseId)} className="text-dark pr-1 editStyle"><i className="fa fa-edit"></i></a><a href="#" className="text-dark pr-1 removeStyle"><i className="fas fa-times-circle" onClick={(e) => this.handleRemoveStyle(e, func.DecompositionFunctionId, phase.DecompositionPhaseId)}></i></a></>
                                            }
                                        }
                                    }
                                    return(
                                        <div className={wrapClassName} key={wrapClassKey}>
                                            {styleEditLinks}
                                            {!this.state['styleContent'+func.DecompositionFunctionId+phase.DecompositionPhaseId+this.props.templateId] ? <><a href="#" onClick={(e) => this.toggle(e, func.DecompositionFunctionId, phase.DecompositionPhaseId)}><i className="fa fa-plus"></i>Add Style</a></> : this.state['styleContent'+func.DecompositionFunctionId+phase.DecompositionPhaseId+this.props.templateId] }
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                )
            }
        });
        const phaseRows = this.props.phases.map((phase, i) => {
            let phaseTitleEditLinks = null;
            if(this.props.templates.length > 0 && this.props.activeItemIndex !== -1) {
                if(this.props.templates[this.props.activeItemIndex]) {
                    if(this.props.templates[this.props.activeItemIndex].IsAmploAssigned === "0") {
                        phaseTitleEditLinks = <a href="#" className="float-right edit-phase-icon" title="Edit" onClick={(e) => this.toggleFuncPhaseEdit(e, phase, 'phase')}><i className="fas fa-pencil-alt"></i></a>
                    }
                }
            }
            if(phase.IsSelected === "1" && phase.DecompositionPhaseId != "0") {
                return (
                    <div className="heading-box-vertical" key={'phase-'+phase.DecompositionPhaseId}>
                        <span>{ phase.PhaseTitle }</span>
                        <div className="sort-arrows">
                            <i className="fa fa-arrow-down" onClick={() => this.props.handleSort(phase, 'phase', 'right')}></i>
                            <i className="fa fa-arrow-up" onClick={() => this.props.handleSort(phase, 'phase', 'left')}></i>
                        </div>
                        {phaseTitleEditLinks}
                    </div>
                )
            }
        });
        return (
            <Row className="business-decomposition-functionbox-sec mb-5">
                <Col lg="12">
                    <div className="function-box-holder">
                        <div className="vertical-left-box">
                            { phaseRows }
                        </div>
                        <div className="function-box">
                            { boxContainer }
                        </div>
                    </div>
                </Col>
                <ModalPopup isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} title="Select Style" onSave={()=>{}} className="capabilityStylingModal modal-lg" footer={false}>
                    <div className="row">
                        {styleGrid}
                    </div>
                </ModalPopup>
                <ModalPopup isOpen={this.state.isEditFuncPhaseOpen} toggle={(e) => this.toggleFuncPhaseEdit(e, {}, '')} title={this.state.editType === 'function' ? 'Edit Function' : 'Edit Phase'} onSave={this.handleEditFuncPhase.bind(this)} className="editFuncPhaseModal" footer={true} saveBtnTitle="Save">
                    <div className="row">
                    <div className="col-md-12">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="funcPhaseName" className="form-control" value={this.state.editedFuncPhase.DecompositionFunctionId ? this.state.editedFuncPhase.FunctionTitle : this.state.editedFuncPhase.PhaseTitle} onChange={(e) => this.handleNameChange(e)} />
                            </div>
                        </form>
                        </div>
                    </div>
                </ModalPopup>
            </Row>
        );
    }
}
const mapStateToProps = state =>({
    successmsg: state.adminCapability.successmsg
});
export default connect(mapStateToProps)(FunctionGrid);