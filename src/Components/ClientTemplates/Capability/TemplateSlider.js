import React, { Component } from 'react';
import _ from 'underscore';
import { Row, Col, Input, FormGroup } from 'reactstrap';
import axios from 'axios';
import swal from "sweetalert";
import ModalPopup from '../../common/ModalPopup';
import { responseMessage } from '../../../utils/alert';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CacheStorage from '../../../utils/CacheStorage';
const config = require('../../../config');
class TemplateSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFunctionOpen: false,
            isPhaseOpen: false,
            isTemplateOpen: false,
            isDuplicateOpen: false,
            activeItemIndex: "",
            custom_function: "",
            custom_phase: "",
            template_name: "",
            functions: [],
            phases: [],
            editTemplate: false,
            action: "",
            templateId: "",
            templateCreationMethod: '',
            modalSelectedTemplate: [],
            selectedReferenceTemplate: {},
            funcPhaseErr: ""
        }
    }
    changeActiveItem = (activeItemIndex) => {
        this.setState({ activeItemIndex });
        this.props.handleTemplateSelect(activeItemIndex);
        //this.state.functions.map((func)=>{})
    }

    async fetchFunctions(templateId) {
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken")
        }
        let functions = await axios.get(config.laravelBaseUrl + 'getClientDecompositionFunctions/' + templateId, {
            headers: headers
        });
        return functions.data.data;
    }

    async fetchPhases(templateId) {
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken")
        }
        let phases = await axios.get(config.laravelBaseUrl + 'getClientDecompositionPhases/' + templateId, {
            headers: headers
        });
        return phases.data.data;
    }

    handleModalTemplateSelect = async (template) => {
        let modalSelectedTemplate = this.state.modalSelectedTemplate;
        let templateExists = _.findIndex(modalSelectedTemplate, { value: template.value });
        if (templateExists !== -1) {
            modalSelectedTemplate.splice(templateExists, 1);
        } else {
            let functions = await this.fetchFunctions(template.value);
            let phases = await this.fetchPhases(template.value);
            template.functions = functions;
            template.phases = phases;
            modalSelectedTemplate.push({ value: template.value, label: template.label, functions: template.functions, phases: template.phases });
        }
        this.setState({ modalSelectedTemplate });
    }

    handleTemplateCreationMethodChange(e) {
        this.setState({
            templateCreationMethod: e.target.value
        })
    }

    //.. Needs refactor > attach to connect
    static getDerivedStateFromProps(nextProps, prevState) {
        let returnObj = {}
        returnObj.functions = nextProps.functions;
        returnObj.phases = nextProps.phases;

        if (Object.keys(nextProps.template).length > 0) {
            if (nextProps.template !== prevState.template) {
                returnObj.template = nextProps.template
                returnObj.template_name = nextProps.template.TemplateTitle
            }
        }
        return (returnObj);
    }
    componentDidUpdate(nextProps, prevState) {
        let index = _.findIndex(this.props.templates, { value: nextProps.templateId });
        if (nextProps.templateId && prevState.activeItemIndex !== index) {
            this.setState({
                activeItemIndex: index,
                templateId: nextProps.templateId
            })
        }
    }

    handleReferenceTemplateClick = (templateId) => {
        let modalSelectedTemplate = this.state.modalSelectedTemplate;
        let selectedReferenceTemplate = _.findWhere(modalSelectedTemplate, { value: templateId });
        this.setState({ selectedReferenceTemplate });
    }

    handleReferenceFuncPhaseSelect = (e, type) => {
        let modalSelectedTemplate = this.state.modalSelectedTemplate;
        let selectedTemplateIndex = _.findIndex(modalSelectedTemplate, { value: this.state.selectedReferenceTemplate.value });
        let checked = e.target.checked;
        let checkedValue = e.target.value;
        if (type === 'function') {
            let funRef = 'func-' + this.state.selectedReferenceTemplate.value + checkedValue;
            if (checked) {
                let funcs = _.pluck(modalSelectedTemplate, 'functions');
                let flattenFuncs = _.flatten(funcs);
                let funcExist = _.findWhere(flattenFuncs, { DecompositionFunctionId: checkedValue, selected: true });
                if (funcExist) {
                    swal({
                        title: "This function is already selected from some other template, do you still want to proceed?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((confirmed) => {
                            if (confirmed) {
                                let funcIndex = _.findIndex(modalSelectedTemplate[selectedTemplateIndex].functions, { DecompositionFunctionId: checkedValue });
                                modalSelectedTemplate[selectedTemplateIndex].functions[funcIndex].selected = checked;
                            } else {
                                let funcIndex = _.findIndex(modalSelectedTemplate[selectedTemplateIndex].functions, { DecompositionFunctionId: checkedValue });
                                modalSelectedTemplate[selectedTemplateIndex].functions[funcIndex].selected = false;
                                this.refs[funRef].checked = false;
                            }
                        });
                } else {
                    let funcIndex = _.findIndex(modalSelectedTemplate[selectedTemplateIndex].functions, { DecompositionFunctionId: checkedValue });
                    modalSelectedTemplate[selectedTemplateIndex].functions[funcIndex].selected = checked;
                }
            } else {
                let funcIndex = _.findIndex(modalSelectedTemplate[selectedTemplateIndex].functions, { DecompositionFunctionId: checkedValue });
                modalSelectedTemplate[selectedTemplateIndex].functions[funcIndex].selected = checked;
            }
        } else {
            let phsRef = 'phase-' + this.state.selectedReferenceTemplate.value + checkedValue;
            if (checked) {
                let phs = _.pluck(modalSelectedTemplate, 'phases');
                let flattenPhs = _.flatten(phs);
                let phsExist = _.findWhere(flattenPhs, { DecompositionPhaseId: checkedValue, selected: true });
                if (phsExist) {
                    swal({
                        title: "This phase is already selected from some other template, do you still want to proceed?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((confirmed) => {
                            if (confirmed) {
                                let phaseIndex = _.findIndex(modalSelectedTemplate[selectedTemplateIndex].phases, { DecompositionPhaseId: checkedValue });
                                modalSelectedTemplate[selectedTemplateIndex].phases[phaseIndex].selected = checked;
                            } else {
                                let phaseIndex = _.findIndex(modalSelectedTemplate[selectedTemplateIndex].phases, { DecompositionPhaseId: checkedValue });
                                modalSelectedTemplate[selectedTemplateIndex].phases[phaseIndex].selected = false;
                                this.refs[phsRef].checked = false;
                            }
                        });
                } else {
                    let phaseIndex = _.findIndex(modalSelectedTemplate[selectedTemplateIndex].phases, { DecompositionPhaseId: checkedValue });
                    modalSelectedTemplate[selectedTemplateIndex].phases[phaseIndex].selected = checked;
                }
            } else {
                let phaseIndex = _.findIndex(modalSelectedTemplate[selectedTemplateIndex].phases, { DecompositionPhaseId: checkedValue });
                modalSelectedTemplate[selectedTemplateIndex].phases[phaseIndex].selected = checked;
            }
        }
        this.setState({ modalSelectedTemplate });
    }

    toggleFunction() {
        this.setState(prevState => ({
            isFunctionOpen: !prevState.isFunctionOpen
        }))
    }
    togglePhase() {
        this.setState(prevState => ({
            isPhaseOpen: !prevState.isPhaseOpen
        }))
    }
    toggleTemplate() {
        this.setState(prevState => ({
            isTemplateOpen: !prevState.isTemplateOpen,
            templateCreationMethod: '',
            modalSelectedTemplate: [],
            selectedReferenceTemplate: {}
        }))
    }
    toggleDuplicate() {
        this.setState(prevState => ({
            isDuplicateOpen: !prevState.isDuplicateOpen
        }))
    }
    editFunctions(e) {
        e.preventDefault();
        if (this.props.templateId > 0) {
            if (this.props.templates[this.state.activeItemIndex]) {
                if (this.props.templates[this.state.activeItemIndex].IsAmploAssigned === "0") {
                    this.setState({
                        isFunctionOpen: true,
                        funcPhaseErr: ""
                    })
                }
            }
        }
    }
    editPhases(e) {
        e.preventDefault();
        if (this.props.templateId > 0) {
            if (this.props.templates[this.state.activeItemIndex]) {
                if (this.props.templates[this.state.activeItemIndex].IsAmploAssigned === "0") {
                    this.setState({
                        isPhaseOpen: true,
                        funcPhaseErr: ""
                    })
                }
            }
        }
    }
    handleSearchTemplate(e) {
        const keyword = e.target.value.toLowerCase();
        let srchTemplates = [];
        for (let i in this.props.templates) {
            if (this.props.templates[i].label.toLowerCase().includes(keyword)) {
                srchTemplates.push(this.props.templates[i]);
                //this.props.processDataClearHandler();
            }
        }
        this.setState({
            srchTemplates: srchTemplates
        })
        if (srchTemplates.length > 0) {
            let index = _.findIndex(this.props.templates, { value: srchTemplates[0].value });
            this.changeActiveItem(index);
        }
    }
    handleAddFunction(e) {
        e.preventDefault();
        if (this.state.custom_function !== "") {
            let functions = this.state.functions;
            let funcExists = _.findWhere(functions, { FunctionTitle: this.state.custom_function });
            if (!funcExists) {
                functions.unshift({
                    DecompositionFunctionId: 0,
                    FunctionTitle: this.state.custom_function,
                    IsSelected: "1"
                });
                this.setState({
                    functions: functions,
                    custom_function: "",
                    funcPhaseErr: ""
                })
            } else {
                this.setState({
                    funcPhaseErr: "Function already exists with same name."
                })
            }
        }
    }
    handleAddPhase(e) {
        e.preventDefault();
        if (this.state.custom_phase !== "") {
            let phases = this.state.phases;
            let phaseExists = _.findWhere(phases, { PhaseTitle: this.state.custom_phase });
            if (!phaseExists) {
                phases.unshift({
                    DecompositionPhaseId: 0,
                    PhaseTitle: this.state.custom_phase,
                    IsSelected: "1"
                })
                this.setState({
                    phases: phases,
                    custom_phase: "",
                    funcPhaseErr: ""
                })
            } else {
                this.setState({
                    funcPhaseErr: "Phase already exists with same name."
                })
            }
        }
    }
    handleFunctionChange(e, key) {
        let functions = this.state.functions;
        if (e.target.checked) {
            functions[key].IsSelected = "1";
        } else {
            functions[key].IsSelected = "0";
        }
        this.setState({
            functions: functions
        })
    }
    handlePhaseChange(e, key) {
        let phases = this.state.phases;
        if (e.target.checked) {
            phases[key].IsSelected = "1";
        } else {
            phases[key].IsSelected = "0";
        }
        this.setState({
            phases: phases
        })
    }
    handleTemplateChange(e) {
        const templateId = e.target.value;
        let index = _.findIndex(this.props.templates, { value: templateId });
        this.changeActiveItem(index);
    }
    handleTemplateNameChange(e) {
        this.setState({ template_name: e.target.value })
    }
    duplicateTemplate() {
        if (this.state.template_name !== "") {

            const is_duplicateQuestionBank = this.props.templates.some((item) => item.label.toLowerCase() == this.state.template_name.toLowerCase())

            if (is_duplicateQuestionBank) {
                return responseMessage(
                    "warning",
                    "Opps! Template name is already used!",
                    ""
                );
            }

            this.props.duplicateTemplate(this.state.template_name);
            this.toggleDuplicate();
        } else {
            responseMessage("warning", "Template name is required.", "");
        }
    }
    handleActionChange(e) {
        switch (e.target.value) {
            case "create":
                this.setState({
                    template_name: ""
                }, () => {
                    this.toggleTemplate();
                    this.setState({
                        action: ""
                    })
                })
                break;
            case "edit":
                this.setState({
                    editTemplate: true
                }, () => {
                    this.toggleTemplate();
                    this.props.getTemplate(this.state.activeItemIndex);
                    this.setState({
                        action: ""
                    })
                })
                break;
            case "save":
                this.props.handleSaveData();
                break;
            case "duplicate":
                this.setState({
                    template_name: ""
                }, () => {
                    this.toggleDuplicate();
                    this.setState({
                        action: ""
                    })
                });
                break;
            case "delete":
                this.props.deleteTemplate();
                this.setState({
                    action: ""
                })
                break;
            default:
                console.log("");
        }
    }
    deleteFunction(functionId, index) {
        //alert(functionId);
        this.props.deleteFunction(functionId);
        this.toggleFunction();
    }
    deletePhase(phaseId, index) {
        this.props.deletePhase(phaseId);
        this.togglePhase();
    }
    saveFunction() {
        let functions = this.state.functions.reverse();
        this.props.saveFunction(functions);
        this.toggleFunction();
    }
    savePhase() {
        let phases = this.state.phases.reverse();
        this.props.savePhase(phases);
        this.togglePhase();
    }
    createTemplate(editMode) {
        this.toggleTemplate();
        if (editMode) {
            let tempObj = {
                templateId: this.props.templates[this.state.activeItemIndex].value,
                templateName: this.state.template_name
            }
            this.props.updateTemplate(tempObj);
        } else {
            let tempObj = {
                templateId: 0,
                templateName: this.state.template_name
            }
            if (this.state.templateCreationMethod === 'existing') {
                tempObj.existingTempData = this.state.modalSelectedTemplate;
            }
            this.props.createTemplate(tempObj);
        }
    }


    viewAllTemplate() {
        this.setState({
            activeItemIndex: 0,
            srchTemplates: [],
        });
        this.props.handleTemplateSelect(0);
    }

    render() {

        let templates = this.props.templates
        if (this.state.srchTemplates) {
            (this.state.srchTemplates.length > 0) ? templates = this.state.srchTemplates : templates = this.props.templates;
        }
        let templateItems = templates.map((template) => {
            let key = _.findIndex(this.props.templates, { value: template.value });
            return (
                <div key={'templateItem-' + key} className={key === this.state.activeItemIndex ? 'templateItem active p-2' : 'templateItem p-2'} onClick={() => this.changeActiveItem(key)}>
                    <img src={template.image_path ? "img/project_Capability.jpg" : "https://placeimg.com/90/60/nature"} />

                    <h6 className="slider-text-botom">{template.label}</h6>
                    <h6 className="slider-text-botom">{template.CreatedDate}</h6>
                </div>
            )
        });
        let modalTemplateItems = templates.map((template) => {
            let key = _.findIndex(this.state.modalSelectedTemplate, { value: template.value });
            return (
                <div key={'modalTemplateItem-' + key} className={key !== -1 ? 'templateItem active p-2' : 'templateItem p-2'} onClick={() => this.handleModalTemplateSelect(template)}>
                    <img src={template.image_path ? config.ApiBaseUrl + 'template/' + template.image_path : "https://placeimg.com/90/60/nature"} />
                    <h6 className="slider-text-botom">{template.label}</h6>
                </div>
            )
        });
        let functionList = this.state.functions.map((func, index) => {
            return (
                <div className="custom-control custom-checkbox" key={'functionList-' + index}>
                    <input type="checkbox" className="custom-control-input" id={"Function-" + index} checked={func.IsSelected === "1" ? true : false} onChange={(e) => this.handleFunctionChange(e, index)} />
                    <label className="custom-control-label width100percent" htmlFor={"Function-" + index}>{func.FunctionTitle}<i className="fas fa-trash-alt float-right del-icon" aria-hidden="true" onClick={(e) => this.deleteFunction(func.DecompositionFunctionId, index)}></i>
                    </label>
                </div>
            )
        })
        let phaseList = this.state.phases.map((phase, key) => {
            return (
                <div className="custom-control custom-checkbox" key={'phaseList-' + key}>
                    <input type="checkbox" className="custom-control-input" id={"Phase-" + key} checked={phase.IsSelected === "1" ? true : false} onChange={(e) => this.handlePhaseChange(e, key)} />
                    <label className="custom-control-label width100percent" htmlFor={"Phase-" + key}>{phase.PhaseTitle}<i className="fas fa-trash-alt float-right del-icon" aria-hidden="true" onClick={(e) => this.deletePhase(phase.DecompositionPhaseId, key)}></i>
                    </label>
                </div>
            )
        })
        let slidesToShow = 0;
        if (templateItems.length > 8) {
            slidesToShow = 8
        } else {
            slidesToShow = templateItems.length
        }
        let settings = {
            // dots: true,
            infinite: true,
            slidesToShow: slidesToShow,
            slidesToScroll: 1,
        }
        let modalSlidesToShow = 0;
        if (templateItems.length > 6) {
            modalSlidesToShow = 6
        } else {
            modalSlidesToShow = templateItems.length
        }
        let modalSettings = {
            // dots: true,
            infinite: true,
            slidesToShow: modalSlidesToShow,
            slidesToScroll: 1,
        }
        let existingTempDiv = null;
        if (this.state.templateCreationMethod === 'existing') {
            let referencedTemplates = this.state.modalSelectedTemplate.map((temp) => {
                return (<li key={'reference_template_li_' + temp.value} className={this.state.selectedReferenceTemplate.value === temp.value ? "list-group-item active" : "list-group-item"} onClick={(e) => this.handleReferenceTemplateClick(temp.value)}>
                    {temp.label}
                </li>)
            })
            existingTempDiv = (<>
                <div className="form-group px-4">
                    <Slider {...modalSettings} >{modalTemplateItems}</Slider>
                </div>
                {this.state.modalSelectedTemplate.length ? <div className="form-group row">
                    <div className="col-md-6">
                        <p>Referenced Source Templates:</p>
                        <ul className="clickable-list list-group">{referencedTemplates}</ul>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <p>Function</p>
                                {Object.keys(this.state.selectedReferenceTemplate).length > 0 ? <ul className="unstyled-list">
                                    {this.state.selectedReferenceTemplate.functions.map(func => {
                                        return (<li key={'funckey-' + this.state.selectedReferenceTemplate.value + func.DecompositionFunctionId}>
                                            <input type="checkbox" name={'func-' + this.state.selectedReferenceTemplate.value + func.DecompositionFunctionId} id={'func-' + this.state.selectedReferenceTemplate.value + func.DecompositionFunctionId} value={func.DecompositionFunctionId} onChange={(e) => this.handleReferenceFuncPhaseSelect(e, 'function')} ref={'func-' + this.state.selectedReferenceTemplate.value + func.DecompositionFunctionId} checked={func.selected} />&nbsp;
                                            <label htmlFor={'func-' + this.state.selectedReferenceTemplate.value + func.DecompositionFunctionId}>{func.FunctionTitle}</label>
                                        </li>)
                                    })}
                                </ul> : null}
                            </div>
                            <div className="col-md-6">
                                <p>Phase</p>
                                {Object.keys(this.state.selectedReferenceTemplate).length > 0 ? <ul className="unstyled-list">
                                    {this.state.selectedReferenceTemplate.phases.map((phase, key) => {
                                        return (<li key={'phasekey-' + this.state.selectedReferenceTemplate.value + phase.DecompositionPhaseId}>
                                            <input type="checkbox" name={'phase-' + this.state.selectedReferenceTemplate.value + phase.DecompositionPhaseId} id={'phase-' + this.state.selectedReferenceTemplate.value + phase.DecompositionPhaseId} value={phase.DecompositionPhaseId} onChange={(e) => this.handleReferenceFuncPhaseSelect(e, 'phase')} checked={phase.selected} />&nbsp;
                                            <label htmlFor={'phase-' + this.state.selectedReferenceTemplate.value + phase.DecompositionPhaseId}>{phase.PhaseTitle}</label>
                                        </li>)
                                    })}
                                </ul> : null}
                            </div>
                        </div>
                    </div>
                </div> : null}
            </>)
        }
        let disabled = true;
        if (this.props.templateId > 0 && this.props.templates.length) {
            if (this.props.templates[this.state.activeItemIndex]) {
                if (this.props.templates[this.state.activeItemIndex].IsAmploAssigned === "0") {
                    disabled = false;
                }
            }
        }
        return (
            <>
                <Row className="mt-4">
                    <Col md="12" className="business-decomposition-sec mt-2 mr-0 ml-0">
                        <Col xl="12" className="pr-0 pl-0">
                            <div className="model-list">
                                <Col md="4" className="pr-0 pl-0"><h2>All FPM Templates</h2></Col>
                                <Col md="4" className="text-right mt-2 pad-right0">
                                    <a href="#" onClick={(e) => this.viewAllTemplate(e)} className="view-a">View All Templates</a>
                                </Col>
                                <Col md="4" className="pad-right0">
                                    <div className="form-group has-search">
                                        <Input type="text" className="form-control" placeholder="Search" onKeyUp={(e) => this.handleSearchTemplate(e)} />
                                        <span className="fa fa-search form-control-search "></span>
                                    </div>
                                </Col>
                            </div>
                        </Col>

                        <Col style={{ background: "#fff" }} className="py-3 px-4 rounded">
                            <Slider {...settings} >{templateItems}</Slider>
                        </Col>
                    </Col>
                </Row>
                <Row className="bussiness-top-sec mt-4">
                    <Col lg="12">
                        <FormGroup>
                            <label className="box-holder-headerlabel width100percent">Selected FPM Template:</label>
                            <div className="dropdown-widthcapabilty-model creatableDropDown tab-fullwidth100">
                                <div className="dropdown copydropdown">
                                    <div className="dropfield dropleft">
                                        {this.props.templates[this.state.activeItemIndex] ? <span><i className="fas fa-times" onClick={() => this.handleTemplateChange({ target: { value: "" } })}></i> {this.props.templates[this.state.activeItemIndex].label}</span> : ""}
                                        <a href="#" className="dropdown-toggle float-right" data-toggle="dropdown"><i className="fas fa-bars"></i></a>
                                        <div className="dropdown-menu pt-0">
                                            <div className="form-group border-bottom mb-2"></div>
                                            <div className="disabled-date">
                                                <span>Template Name</span> <span>Type</span>
                                            </div>
                                            <div className="drop-height">
                                                {templates.map((template, key) => {
                                                    return (
                                                        <div className="custom-control custom-radio ml-2 mb-2" key={"template_" + template.value}>
                                                            <input type="radio" className="custom-control-input" name="list" id={"template_" + template.value}
                                                                onChange={(e) => this.handleTemplateChange(e)}
                                                                value={template.value}
                                                                checked={this.state.activeItemIndex === key ? true : false} />
                                                            <label className="custom-control-label" htmlFor={"template_" + template.value}>{template.label}</label>
                                                            <div className="d-date">{template.Assignment}</div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown-widthcapabilty-model tab-fullwidth100">
                                <div className="btn-group scoring-drop functioneditwidth">
                                    <a className="btn btn-outline-whitecapability" id="functionedit" href="#" onClick={(e) => this.editFunctions(e)}>Edit Functions
                                        <i className="fas fa-plus ml-4 mr-2"></i> <i className="fas fa-minus"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="dropdown-widthcapabilty-model tab-fullwidth100">
                                <div className="btn-group scoring-drop phaseneditwidth">
                                    <a className="btn btn-outline-whitecapability" id="phaseedit" href="#" onClick={(e) => this.editPhases(e)}>Edit Phases
                                        <i className="fas fa-plus ml-2 mr-2"></i> <i className="fas fa-minus"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="dropdown-widthcapabilty-model actionBtnWrapper float-right mr-0">
                                <select className="form-control customwidth-icon select-headeroption" value={this.state.action} onChange={(e) => this.handleActionChange(e)}>
                                    <option value="">Action</option>
                                    {this.props.templateId && console.log("Duplicate show now")}
                                    <option value="create">Create Template</option>
                                    <option value="edit" hidden={disabled}>Edit Template</option>
                                    <option value="save" hidden={disabled}>Save Template</option>
                                    <option value="duplicate" hidden={this.props.templateId > 0 ? false : true}>Duplicate Template</option>
                                    <option value="delete" hidden={disabled}>Delete Template</option>
                                </select>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                <ModalPopup isOpen={this.state.isFunctionOpen} toggle={this.toggleFunction.bind(this)} title="Edit Function(s)" onSave={this.saveFunction.bind(this)} className="capabilityFunctionsModal modal-lg" footer={true} saveBtnTitle="SAVE">
                    <div className="d-inline-block width55">
                        <label className="mb-header mt-2">Existing Functions<span className="text-danger">*</span></label>
                        <div className="managebox">
                            {functionList}
                        </div>
                        <p className="managebox-bot-mandatory-field mt-2">* Selected Functions will be displayed on the grid</p>
                    </div>
                    <div className="d-inline-block width43">
                        <p className="card-text-capability mt-2">Add New Function</p>
                        <div className="form-group">
                            <p className="name-fub-phase-heading">New Function Name 1</p>
                            <input type="text" className="form-control" name="custom_function" onChange={(e) => this.setState({ [e.target.name]: e.target.value })} value={this.state.custom_function} />
                        </div>
                        <a href="#" onClick={(e) => this.handleAddFunction(e)}><b>+ Add Function</b></a>
                        <p className="text-danger">{this.state.funcPhaseErr}</p>
                    </div>
                </ModalPopup>
                <ModalPopup isOpen={this.state.isPhaseOpen} toggle={this.togglePhase.bind(this)} title="Edit Phase(s)" onSave={this.savePhase.bind(this)} className="capabilityFunctionsModal modal-lg" footer={true} saveBtnTitle="SAVE">
                    <div className="d-inline-block width55">
                        <label className="mb-header mt-2">Existing Phases<span className="text-danger">*</span></label>
                        <div className="managebox">
                            {phaseList}
                        </div>
                        <p className="managebox-bot-mandatory-field mt-2">* Selected Phases will be displayed on the grid</p>
                    </div>
                    <div className="d-inline-block width43">
                        <p className="card-text-capability mt-2">Add New Phase</p>
                        <div className="form-group">
                            <p className="name-fub-phase-heading">New Phase Name 1</p>
                            <input type="text" className="form-control" name="custom_phase" onChange={(e) => this.setState({ [e.target.name]: e.target.value })} value={this.state.custom_phase} />
                        </div>
                        <a href="#" onClick={(e) => this.handleAddPhase(e)}><b>+ Add Phase</b></a>
                        <p className="text-danger">{this.state.funcPhaseErr}</p>
                    </div>
                </ModalPopup>
                <ModalPopup isOpen={this.state.isTemplateOpen} toggle={this.toggleTemplate.bind(this)} title={this.state.editTemplate ? "Edit Template" : "Create New Template"} onSave={this.createTemplate.bind(this, this.state.editTemplate)} className="templateModal modal-lg" footer={true} saveBtnTitle="SAVE">
                    <div className="form-group">
                        <p className="name-fub-phase-heading">Template Name</p>
                        <input type="text" className="form-control" name="template_name" onChange={(e) => this.handleTemplateNameChange(e)} defaultValue={this.state.template_name} />
                    </div>
                    {!this.state.editTemplate ? <><div className="form-group">
                        <p className="">Template Creation Method</p>
                        <div className="row">
                            <div className="col-md-6">
                                <input type="radio" name="creation_method" value="scratch" id="scratchMethod" onClick={(e) => this.handleTemplateCreationMethodChange(e)} />&nbsp;<label htmlFor="scratchMethod">Create from Scratch</label>
                            </div>
                            <div className="col-md-6">
                                <input type="radio" name="creation_method" value="existing" id="existingMethod" onChange={(e) => this.handleTemplateCreationMethodChange(e)} />&nbsp;<label htmlFor="existingMethod">Create from Existing</label>
                            </div>
                        </div>
                    </div>{existingTempDiv}</> : null}
                </ModalPopup>
                <ModalPopup isOpen={this.state.isDuplicateOpen} toggle={this.toggleDuplicate.bind(this)} title="Duplicate Template" onSave={this.duplicateTemplate.bind(this)} className="duplicateModal" footer={true} saveBtnTitle="SAVE">
                    <div className="form-group">
                        <p className="name-fub-phase-heading">Template Name</p>
                        <input type="text" className="form-control" name="template_name" onChange={(e) => this.handleTemplateNameChange(e)} defaultValue={this.state.template_name} />
                    </div>
                </ModalPopup>
            </>
        )
    }
}

export default TemplateSlider;