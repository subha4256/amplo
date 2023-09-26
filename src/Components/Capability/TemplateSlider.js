import React, {Component} from 'react';
import _ from 'underscore';
import {Row, Col, Input, FormGroup} from 'reactstrap';
import ModalPopup from '../../common/ModalPopup';
import ItemsCarousel from 'react-items-carousel';
import { errorAlert,responseMessage } from '../../../utils/alert';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class TemplateSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFunctionOpen: false,
            isPhaseOpen: false,
            isTemplateOpen: false,
            isDuplicateOpen: false,
            activeItemIndex: 0,
            custom_function: "",
            custom_phase: "",
            template_name: "",
            functions: [],
            phases: [],
            clients: [],
            editTemplate: false,
            action: "",
            scoreDetails: {
                AsIsAflyScore:"" ,
                ReestablishAsIsAflyScore:""
              }
        }
    }
    changeActiveItem = (activeItemIndex) => {
        this.setState({ activeItemIndex });
        this.props.handleTemplateSelect(activeItemIndex);
        //this.state.functions.map((func)=>{})
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        let returnObj={}
        if (Object.keys(nextProps.template).length > 0) {
            if (nextProps.template !== prevState.template) {
                    returnObj.template= nextProps.template
                    returnObj.template_name= nextProps.template.TemplateTitle
                    returnObj.clients=nextProps.template.clients
            }
        }
        return (returnObj);
    }
    
    // componentDidMount() {

    //     axios.get(`${config.laravelBaseUrl}GetReestablishAflyScore/${this.props.projId}`,{
    //         headers : {
    //           authorization : sessionStorage.getItem('userToken')
    //         }
    //       }).then(res=>{
    //         console.log({res})
    //             if(res.status == 200) {
    //                  this.setState({scoreDetails: {
    //                   AsIsAflyScore: res.data.data[0].AsIsAflyScore ,
    //                   ReestablishAsIsAflyScore: res.data.data[0].ReestablishAsIsAflyScore
    //                  }})
    //             }
    //       }).catch((error) =>{
    //         console.log("Error", error)
    //       })

    // }

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
            isTemplateOpen: !prevState.isTemplateOpen
        }))
    }
    toggleDuplicate() {
        this.setState(prevState => ({
            isDuplicateOpen: !prevState.isDuplicateOpen
        }))
    }
    editFunctions(e) {
        e.preventDefault();
        this.setState({
            isFunctionOpen: true
        })
    }
    editPhases(e) {
        e.preventDefault();
        this.setState({
            isPhaseOpen: true
        })
    }
    handleSearchTemplate(e) {
        const keyword = e.target.value;
        for(let i in this.props.templates) {
            if(this.props.templates[i].label.includes(keyword)) {
                this.changeActiveItem(parseInt(i));
                //this.props.processDataClearHandler();
                break;
            }
        }
    }
    handleAddFunction(e) {
        e.preventDefault();
        if(this.state.custom_function !== "") {
            let functions = this.state.functions;
            functions.unshift({
                DecompositionFunctionId: 0,
                FunctionTitle: this.state.custom_function,
                IsSelected: "1"
            })
            this.setState({
                functions: functions,
                custom_function: ""
            })
        }
    }
    handleAddPhase(e) {
        e.preventDefault();
        if(this.state.custom_phase !== "") {
            let phases = this.state.phases;
            phases.unshift({
                DecompositionPhaseId: 0,
                PhaseTitle: this.state.custom_phase,
                IsSelected: "1"
            })
            this.setState({
                phases: phases,
                custom_phase: ""
            })
            document.getElementById('Phase-0').checked = true;
        }
    }
    handleFunctionChange(e, key) {
        let functions = this.state.functions;
        if(e.target.checked) {
            functions[key].IsSelected = "1";
        }else{
            functions[key].IsSelected = "0";
        }
        this.setState({
            functions: functions
        })
    }
    handlePhaseChange(e, key) {
        let phases = this.state.phases;
        if(e.target.checked) {
            phases[key].IsSelected = "1";
        }else{
            phases[key].IsSelected = "0";
        }
        this.setState({
            phases: phases
        })
    }
    handleTemplateChange(e) {
        const templateId = e.target.value;
        let index = _.findIndex(this.props.templates, {value: templateId});
        this.changeActiveItem(index);
        this.props.processDataClearHandler();
    }
    handleTemplateNameChange(e) {
        this.setState({template_name: e.target.value})
    }
    handleClientChange(e, key) {
        let clients = this.state.clients;
        if(e.target.checked) {
            clients[key].IsSelected = "1";
        }else{
            clients[key].IsSelected = "0";
        }
        this.setState({
            clients: clients
        })
    }
    duplicateTemplate() {
        if(this.state.template_name !== "") {
            this.props.duplicateTemplate(this.state.template_name);
            this.toggleDuplicate();
        }else{
            responseMessage("warning", "Template name is required.", "");
        }
    }
    handleActionChange(e) {
        switch(e.target.value) {
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
    saveFunction() {
        this.props.saveFunction(this.state.functions);
        this.toggleFunction();
    }
    savePhase() {
        this.props.savePhase(this.state.phases);
        this.togglePhase();
    }
    createTemplate(editMode) {
        this.toggleTemplate();
        if(editMode) {
            const tempObj = {
                templateId: this.props.templates[this.state.activeItemIndex].value,
                templateName: this.state.template_name,
                clients: this.state.clients
            }
            this.props.updateTemplate(tempObj);
        }else{
            const tempObj = {
                templateName: this.state.template_name,
                clients: this.state.clients
            }
            this.props.createTemplate(tempObj);
        }
    }
    render() {
        console.log(this.state.functions);
        console.log(this.state.phases);
        let templateItems = this.props.templates.map((template, key) => {
            return (
                <div key={'templateItem-'+key} className={key === this.state.activeItemIndex ? 'templateItem active p-2' : 'templateItem p-2'} onClick={() => this.changeActiveItem(key)}>
                    <img src={template.image_path ? template.image_path : "https://placeimg.com/90/60/nature"} />
                    <h6 className="slider-text-botom">{template.label}</h6>
                    <h6 className="slider-text-botom">Nov 25,1.38pm</h6>
                </div>
            )
        });
        let functionList = this.state.functions.map((func, index) => {
            return (
                <div className="custom-control custom-checkbox" key={'functionList-'+index}>
                    <input type="checkbox" className="custom-control-input" id={"Function-"+index} checked={func.IsSelected === "1" ? true : false} onChange={(e) => this.handleFunctionChange(e, index)} />
                    <label className="custom-control-label width100percent" htmlFor={"Function-"+index}>{func.FunctionTitle}<i className="fas fa-trash-alt float-right del-icon" aria-hidden="true"></i>
                    </label>
                </div>
            )
        })
        let phaseList = this.state.phases.map((phase, key) => {
            return (
                <div className="custom-control custom-checkbox" key={'phaseList-'+key}>
                    <input type="checkbox" className="custom-control-input" id={"Phase-"+key} checked={phase.IsSelected === "1" ? true : false} onChange={(e) => this.handlePhaseChange(e, key)} />
                    <label className="custom-control-label width100percent" htmlFor={"Phase-"+key}>{phase.PhaseTitle}<i className="fas fa-trash-alt float-right del-icon" aria-hidden="true"></i>
                    </label>
                </div>
            )
        })
        let clientList = this.state.clients.map((client, key) => {
            return (
                <div className="custom-control custom-checkbox" key={'clientList-'+client.ClientId}>
                    <input type="checkbox" className="custom-control-input" id={"Client-"+client.ClientId}  onChange={(e) => this.handleClientChange(e, key)} checked={client.IsSelected === "1" ? true : false} />
                    <label className="custom-control-label width100percent" htmlFor={"Client-"+client.ClientId}>{client.ClientName}
                    </label>
                </div>
            )
        })

        let templateOptions = this.props.templates.map(template => {
            return (
                <option key={'templateOpt-'+template.value} value={template.value}>{template.label}</option>
            )
        })
        let templateOptions1 = templateOptions.reverse();
        const {
            activeItemIndex
          } = this.state;
          let settings = {
            // dots: true,
                infinite: true,
              slidesToShow: 8,
              slidesToScroll: 1,
        }
        return(
            <>
                <Row className="business-decomposition-sec mt-2 mr-0 ml-0">
                    <Col xl="12" className="pr-0 pl-0">
                        <div className="model-list">
                            <Col md="4"  className="pr-0 pl-0"><h2>All Templates</h2></Col>
                            <Col md="4" className="text-right mt-2 pad-right0">
                                <a href="#" className="view-a">View All Template</a>
                            </Col>
                            <Col md="4" className="pad-right0">
                                <div className="form-group has-search">
                                    <Input type="text" className="form-control" placeholder="Search" onKeyUp={(e) => this.handleSearchTemplate(e)} />
                                    <span className="fa fa-search form-control-search "></span>
                                </div>
                            </Col>
                        </div>
                    </Col>
                    {/* <Col lg="12" className="pr-0  pl-0">
                        <div className="model-slider">
                            <div className="bx-wrapper">
                                <ItemsCarousel
                                    // Placeholder configurations
                                    enablePlaceholder
                                    numberOfPlaceholderItems={8}
                                    minimumPlaceholderTime={1000}
                                    placeholderItem={<div style={{ height: 90, background: '#900' }}>Placeholder</div>}

                                    // Carousel configurations
                                    numberOfCards={8}
                                    gutter={12}
                                    showSlither={false}
                                    firstAndLastGutter={true}
                                    freeScrolling={false}

                                    // Active item configurations
                                    requestToChangeActive={this.changeActiveItem}
                                    activeItemIndex={activeItemIndex}
                                    activePosition={'left'}

                                    chevronWidth={24}
                                    rightChevron={<img src={ require('../../../common/images/slider-right-arrow.png') } alt=">" />}
                                    leftChevron={<img src={ require('../../../common/images/slider-left-arrow.png') } alt="<" />}
                                    outsideChevron={false}
                                >
                                    {templateItems}
                                </ItemsCarousel>
                                
                            </div>
                        </div>
                    </Col> */}
                    <Col style={{background:"#fff"}}>
                    <Slider {...settings} >{templateItems}</Slider>
                    </Col>
                </Row>
                <Row className="bussiness-top-sec mt-4">
                    <Col lg="12">
                        <FormGroup>
                            <label className="box-holder-headerlabel width100percent">Showing Template:</label>
                            <div className="dropdown-widthcapabilty-model creatableDropDown tab-fullwidth100">
                            
                                <select className="form-control customwidth-icon select-headeroption" onChange={(e) => this.handleTemplateChange(e)} value={this.props.templates.length > 0 ? this.props.templates[this.state.activeItemIndex].value : ""}>
                                { templateOptions1 }
                                </select>
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
                                    <option value="create">Create Template</option>
                                    <option value="edit">Edit Template</option>
                                    <option value="save">Save Template</option>
                                    <option value="duplicate">Duplicate Template</option>
                                    <option value="delete">Delete Template</option>
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
                            <input type="text" className="form-control" name="custom_function" onChange={(e) => this.setState({[e.target.name]: e.target.value})} value={this.state.custom_function} />
                        </div>
                        <a href="#" onClick={(e) => this.handleAddFunction(e)}><b>+ Add Another</b></a>
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
                            <input type="text" className="form-control" name="custom_phase" onChange={(e) => this.setState({[e.target.name]: e.target.value})} value={this.state.custom_phase} />
                        </div>
                        <a href="#" onClick={(e) => this.handleAddPhase(e)}><b>+ Add Another</b></a>
                    </div>
                </ModalPopup>
                <ModalPopup isOpen={this.state.isTemplateOpen} toggle={this.toggleTemplate.bind(this)} title={this.state.editTemplate ? "Edit Template" : "Create New Template"} onSave={this.createTemplate.bind(this, this.state.editTemplate)} className="templateModal" footer={true} saveBtnTitle="SAVE">
                    <div className="form-group">
                        <p className="name-fub-phase-heading">Template Name</p>
                        <input type="text" className="form-control" name="template_name" onChange={(e) => this.handleTemplateNameChange(e)} defaultValue={this.state.template_name} />
                    </div>
                    <p className="mb-0">Select Clients:</p>
                    <div className="managebox">
                        {clientList}
                    </div>
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