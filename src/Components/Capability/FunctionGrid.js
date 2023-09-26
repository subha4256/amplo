import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import FunctionalPhase from "./FunctionalPhase";
import axios from "axios";
import { responseMessage } from "../../utils/alert";
import { connect } from "react-redux";
import {
    fetchFunctions,
    fetchPhases,
    fetchProcessData,
} from "../../actions/capabilityActions";
import ModalPopup from "../common/ModalPopup";
import { confirmAlert } from "react-confirm-alert";

const config = require("../../config");

class FunctionGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateValue: "",
            selectedNameId: "",
            name: "",
            isFunctionOpen: false,
            isPhaseOpen: false,
            functions: [],
            phases: [],
            isFunctionChecked: false,
            isPhaseChecked: false,
            newAddName:"",
            newAddButton: false
        };
    }
    renderFunctionalPhase(index) {
        return (
            <FunctionalPhase
                isEditableProcess={this.props.isEditableProcess}
                projectName={this.props.projectName}
                defaultVersion={this.props.defaultVersion}
                handleGridDragStart={this.props.handleGridDragStart}
                modelingMode={this.props.modelingMode}
                searchStr={this.props.searchStr}
                capabilityState={this.props.capabilityState}
                searchResults={this.props.searchResults}
                phases={this.props.phases}
                functions={this.props.functions}
                index={index}
                projectId={this.props.projectId}
                onDrop={this.props.onDrop}
                processData={this.props.processData}
            />
        );
    }

    fetchAllFucntions = (templateId , projectId) => {
        const headers = {
            authorization: "Bearer " + sessionStorage.getItem("userToken"),
        };
        axios
            .get(
                config.laravelBaseUrl + "uspGetSelectedFunctionsAgainstProjectLevel/" + templateId + "/"+ projectId ,
                {
                    headers: headers,
                }
            )
            .then((res) => this.setState({ functions: res.data.data }))
            .catch((error) =>
                console.error(
                    "Something went wrong while fetching the functions data"
                )
            );
    };

    fetchAllPhases = (templateId , projectId) => {
                const headers = {
                    authorization: "Bearer " + sessionStorage.getItem("userToken"),
                };
                axios
                    .get(config.laravelBaseUrl + "uspGetSelectedPhasesAgainstProjectLevel/" + templateId + "/" + projectId, {
                        headers: headers,
                    })
                    .then((res) => this.setState({ phases: res.data.data }))
                    .catch((error) =>
                        console.error(
                            "Something went wrong while fetching the phases data"
                        )
                    );
    };

    //    componentDidMount() ==>  THIS METHOD IS USE FOR UPDATE COMPONENT OF THE CODE BASED ON THE  IF (PREPROPS !== THIS.PROPS) { == }

    componentDidUpdate(prevProps) {
        if (prevProps.templateId !== this.props.templateId) {
            this.fetchAllFucntions(this.props.templateId , this.props.projectId);
            this.fetchAllPhases(this.props.templateId, this.props.projectId);
        }
    }

    /* METHOD: UPDATE TITLE NAME FOR FUNCTION AND PHASE ***********
                       BY:  SONU SHARMA  */

    handleNameUpdate = () => {
        // console.log(this.state)

        let data = {
            DecompositionProjectID: this.props.projectId,
            FunctionId:
                this.state.name == "functionName"
                    ? this.state.selectedNameId
                    : 0,
            PhaseId:
                this.state.name == "phaseName" ? this.state.selectedNameId : 0,
            Title: this.state.updateValue,
        };

        axios
            .patch(
                `${config.laravelBaseUrl}uspUpdateFunctionPhaseTitleAgainstProjectLevel`,
                data,
                {
                    headers: {
                        authorization:
                            "Bearer " + sessionStorage.getItem("userToken"),
                    },
                }
            )
            .then((res) => {
                // console.log({res})
                responseMessage("success", res.data.data[0].MessageName);
                if (res.status == 200) {
                    this.props.fetchFunctions(this.props.projectId, 0);
                    this.props.fetchPhases(this.props.projectId, 0);
                    this.fetchAllFucntions(this.props.templateId , this.props.projectId);
                    this.fetchAllPhases(this.props.templateId, this.props.projectId);
                }
                this.setState({
                    updateValue: "",
                    selectedNameId: "",
                    name: "",
                });
            })
            .catch((error) => {
                // console.log(error);
                responseMessage(
                    "error",
                    "Something Went Wrong while update title"
                );
            });
    };

    toggleFunction() {
       this.setState({newAddName: ""})
        this.setState((prevState) => ({
            isFunctionOpen: !prevState.isFunctionOpen,
        }));
        
    }

    editFunction = () => {
        this.setState({
            isFunctionOpen: true,
            funcPhaseErr: "",
        });
    };

    togglePhase() {
       this.setState({newAddName: ""})
        this.setState((prevState) => ({
            isPhaseOpen: !prevState.isPhaseOpen,
        }));
    }

    editPhase = () => {
        this.setState({
            isPhaseOpen: true,
            funcPhaseErr: "",
        });
    };

    /* METHDO: FOR CREATE A NEW FUNCTION OR REMOVE******************
        BY: SONU SHARMA ------------------------------------------ */
    handleFunctionChange = (e, index, id, name) => {
        // console.log(e.target.checked);

        let functionData = { FunctionId: id, FunctionName: name };

        this.setState((prevState) => ({
            isFunctionChecked: !prevState.isFunctionChecked,
        }));

        let phases = this.props.phases.map((item) => ({
            FunctionId: id,
            PhaseId: item.DecompositionPhaseProjectID,
        }));

        let data = {
            ProjectId: this.props.projectId,
            TemplateId: this.props.templateId,
            SelectedFunctions: [functionData],
            SelectedPhases: [{ PhaseId: "0", PhaseName: "abc" }],
            SelectedPermission: phases,
            UserId: 0
        };

        if (e.target.checked) {
            // console.log(data);
            axios
                .post(
                    `${config.laravelBaseUrl}uspSaveFunctionsAndPhasesAgainstProjectLevel`,
                    data,
                    {
                        headers: {
                            authorization:
                                "Bearer " + sessionStorage.getItem("userToken"),
                        },
                    }
                )
                .then((res) => {
                  
                    this.setState((prevState) => ({
                        isFunctionOpen: !prevState.isFunctionOpen,
                    }));

                    this.props.fetchFunctions(
                        this.props.projectId,
                        this.props.defaultVersion
                    );
                    this.props.fetchPhases(
                        this.props.projectId,
                        this.props.defaultVersion
                    );
                    this.props.fetchProcessData(
                        this.props.projectId,
                        this.props.defaultVersion
                    );

                    this.fetchAllFucntions(this.props.templateId , this.props.projectId);
                    responseMessage("success", "Function Added Successfully");
                })
                .catch((error) =>
                    responseMessage(
                        "error",
                        "Something went wrong while adding new function!",
                        ""
                    )
                );
        } else {
            // DELETE FUNCTIONALITY  FOR FUNCTION **
            delete data.SelectedFunctions;
            delete data.SelectedPermission;
            delete data.SelectedPhases;

            data["SelectedFunctionID"] = id;
            data["SelectedPhaseID"] = 0;

            confirmAlert({
                title: 'Confirm to continue',
                message: 'Are you sure to remove the Function ?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                           
                            axios
                            .patch(
                                `${config.laravelBaseUrl}uspDeleteFunctionsAndPhasesAgainstProjectLevel`,
                                data,
                                {
                                    headers: {
                                        authorization:
                                            "Bearer " + sessionStorage.getItem("userToken"),
                                    },
                                }
                            )
                            .then((res) => {
                                this.setState((prevState) => ({
                                    isFunctionOpen: !prevState.isFunctionOpen,
                                }));
                                this.props.fetchProcessData(
                                    this.props.projectId,
                                    this.props.defaultVersion
                                );
                                this.props.fetchFunctions(
                                    this.props.projectId,
                                    this.props.defaultVersion
                                );
                                this.props.fetchPhases(
                                    this.props.projectId,
                                    this.props.defaultVersion
                                );
                                this.fetchAllFucntions(this.props.templateId , this.props.projectId);
                                responseMessage("success", "Function Remove Successfully");
                            })
                            .catch((err) =>
                                responseMessage(
                                    "error",
                                    "Something Went Wrong While Removing Function"
                                )
                    );
                           
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {}
                    }
                ]
            }); 

        }
    };

    /* METHDO: FOR CREATE A NEW PHASE OR REMOVE ******************
        BY: SONU SHARMA ------------------------------------------ */
    handlePhaseChange = (e, index, id, name) => {
        let phaseData = { PhaseId: id, PhaseName: name };

        this.setState((prevState) => ({
            isPhaseChecked: !prevState.isPhaseChecked,
        }));

        let phases = this.props.functions.map((item) => ({
            FunctionId: item.DecompositionFunctionProjectID,
            PhaseId: id,
        }));

        let data = {
            ProjectId: this.props.projectId,
            TemplateId: this.props.templateId,
            SelectedFunctions: [{ FunctionId: "0", FunctionName: "abc" }],
            SelectedPhases: [phaseData],
            SelectedPermission: phases,
            UserId: 0
            
        };
        if (e.target.checked) {
            axios
                .post(
                    `${config.laravelBaseUrl}uspSaveFunctionsAndPhasesAgainstProjectLevel`,
                    data,
                    {
                        headers: {
                            authorization:
                                "Bearer " + sessionStorage.getItem("userToken"),
                        },
                    }
                )
                .then((res) => {
                    // console.log({ res });
                    this.setState((prevState) => ({
                        isPhaseOpen: !prevState.isPhaseOpen,
                    }));
                    this.props.fetchFunctions(
                        this.props.projectId,
                        this.props.defaultVersion
                    );
                    this.props.fetchPhases(
                        this.props.projectId,
                        this.props.defaultVersion
                    );
                    this.props.fetchProcessData(
                        this.props.projectId,
                        this.props.defaultVersion
                    );
                    this.fetchAllPhases(this.props.templateId , this.props.projectId);
                    responseMessage("success", "Phase added Successfully");
                })
                .catch((error) =>
                    responseMessage(
                        "error",
                        "Something went wrong while adding new Phase!",
                        ""
                    )
                );
        } else {
            // DELETE FUNCTIONALITY  FOR PHASE **
            delete data.SelectedFunctions;
            delete data.SelectedPermission;
            delete data.SelectedPhases;

            data["SelectedFunctionID"] = 0;
            data["SelectedPhaseID"] = id;

            confirmAlert({
                title: 'Confirm to continue',
                message: 'Are you sure to remove the Phase ?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                           
                            axios
                            .patch(
                                `${config.laravelBaseUrl}uspDeleteFunctionsAndPhasesAgainstProjectLevel`,
                                data,
                                {
                                    headers: {
                                        authorization:
                                            "Bearer " + sessionStorage.getItem("userToken"),
                                    },
                                }
                            )
                            .then((res) => {
                                this.setState((prevState) => ({
                                    isPhaseOpen: !prevState.isPhaseOpen,
                                }));
                                this.props.fetchFunctions(
                                    this.props.projectId,
                                    this.props.defaultVersion
                                );
                                this.props.fetchPhases(
                                    this.props.projectId,
                                    this.props.defaultVersion
                                );
                                this.props.fetchProcessData(
                                    this.props.projectId,
                                    this.props.defaultVersion
                                );
                                this.fetchAllPhases(this.props.templateId , this.props.projectId);
                                responseMessage("success", "Phase Remove Successfully");
                            })
                            .catch((err) =>
                                responseMessage(
                                    "error",
                                    "Something Went Wrong While Removing Phase"
                                )
                            );
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {}
                    }
                ]
            }); 

           
        }
    };

      /* METHDO: FOR CREATE A NEW FUNCTION AND PHASE ******************
        BY: SONU SHARMA ------------------------------------------ */
    addNewFunctionPhase =(type) =>{  
         if(type == 'function') {
           const data = { 
            FunctionName: this.state.newAddName,
            PhaseName:""
           }
           axios
           .post(
               `${config.laravelBaseUrl}uspAddFunctionsAndPhasesAgainstProjectLevel`,
               data,
               {
                   headers: {
                       authorization:
                           "Bearer " + sessionStorage.getItem("userToken"),
                   },
               }
           )
           .then((res) => {
               if(res.data.data[0].MessageName == "Function name already present") {
               responseMessage("warning", "Function name already present")
               }else{
                   this.fetchAllFucntions(this.props.templateId , this.props.projectId);
                      responseMessage("success", "Function Added Successfully");                   
               }
           })
           .catch((error) =>
               responseMessage(
                   "error",
                   "Something went wrong while creating new function!",
                   ""
               )
           );
            
         }else if (type == "phase") {
            const data = { 
                FunctionName:"" ,
                PhaseName:this.state.newAddName
               }

               axios
               .post(
                   `${config.laravelBaseUrl}uspAddFunctionsAndPhasesAgainstProjectLevel`,
                   data,
                   {
                       headers: {
                           authorization:
                               "Bearer " + sessionStorage.getItem("userToken"),
                       },
                   }
               )
               .then((res) => {
                   if(res.data.data[0].MessageName == "Phase name already present") {
                   responseMessage("warning", "Phase name already present")
                   }else{
                       this.fetchAllPhases(this.props.templateId, this.props.projectId); 
                       responseMessage("success", "Phase Added Successfully");                   
                   }
               })
               .catch((error) =>
                   responseMessage(
                       "error",
                       "Something went wrong while creating new Phase!",
                       ""
                   )
               );


         }
      
      
         this.setState({newAddName: "" , newAddButton:false})
    }

    render() {
        // console.log("FuncitonGrid ==>", this.props);
        // console.log("FuncitonGrid State ==>", this.state);
         
           let functionList = this.state.functions.map((func, index) => {
            return (
                <div
                    className="custom-control custom-checkbox"
                    key={"functionList-" + index}
                    
                >
                    <input
                        style={{ cursor: "pointer"}}
                        type="checkbox"
                        className="custom-control-input"
                        id={"Function-" + index}
                        checked={func.IsSelected === "1" ? true : false}
                        onChange={(e) =>
                            this.handleFunctionChange(
                                e,
                                index,
                                func.DecompositionFunctionId,
                                func.FunctionTitle
                            )
                        }
                    />
                    <label
                        style={{ cursor: "pointer"}}
                        className="custom-control-label width100percent"
                        htmlFor={"Function-" + index}
                    >
                        {func.FunctionTitle}
                    </label>
                </div>
            );
        });

        let phaseList = this.state.phases.map((phase, key) => {
            return (
                <div
                    className="custom-control custom-checkbox"
                    key={"phaseList-" + key}
                >
                    <input
                        type="checkbox"
                        style={{ cursor: "pointer"}}
                        className="custom-control-input"
                        id={"Phase-" + key}
                        checked={phase.IsSelected === "1" ? true : false}
                        onChange={(e) =>
                            this.handlePhaseChange(
                                e,
                                key,
                                phase.DecompositionPhaseId,
                                phase.PhaseTitle
                            )
                        }
                    />
                    <label
                        className="custom-control-label width100percent"
                        htmlFor={"Phase-" + key}
                        style={{ cursor: "pointer"}}
                    >
                        {phase.PhaseTitle}
                    </label>
                </div>
            );
        });

        let msg = "";
        this.props.projectId > 0
            ? (msg =
                  "Data is not accessible for this project. Please contact you application super-user.")
            : (msg = "");
        const boxContainer = this.props.functions.map((func, i) => {
            let uniqId = "box-container-" + i;
            return (
                <div className="box-container" key={uniqId}>
                    <div className="heading-box">
                        {func.FunctionName}
                        {this.props.isEditableProcess && (
                            <a
                                onClick={() =>
                                    this.setState({
                                        selectedNameId:
                                            func.DecompositionFunctionProjectID,
                                        name: "functionName",
                                    })
                                }
                                data-toggle="modal"
                                data-target="#editFunction"
                                href="#"
                                className="float-left edit-function-icon text-white ml-2"
                                title="Edit"
                            >
                                <i className="fas fa-pencil-alt"></i>
                            </a>
                        )}
                    </div>
                    {this.renderFunctionalPhase(i + 1)}
                </div>
            );
        });
        ////console.log(this.props.phases);
        const phaseRows = this.props.phases.map((phase, i) => {
            return (
                <div
                    className="heading-box-vertical"
                    key={"phase-" + phase.DecompositionPhaseProjectID}
                >
                    {this.props.isEditableProcess && (
                        <a
                            onClick={() =>
                                this.setState({
                                    selectedNameId:
                                        phase.DecompositionPhaseProjectID,
                                    name: "phaseName",
                                })
                            }
                            data-toggle="modal"
                            data-target="#editFunction"
                            href="#"
                            className="float-left edit-phase-icon text-white mt-2 ml-2"
                            title="Edit"
                        >
                            <i className="fas fa-pencil-alt "></i>
                        </a>
                    )}
                    <span>{phase.PhaseName}</span>
                </div>
            );
        });
        return (
            <>
                <Row className="business-decomposition-functionbox-sec mb-5">
                    <Col lg="12">
                        {this.props.isEditableProcess && (
                            <>
                                <div className="d-flex justify-content-end mb-2">
                                    <div className="dropdown-widthcapabilty-model tab-fullwidth100 mr-2">
                                        <div
                                            onClick={this.editFunction}
                                            className="btn-group scoring-drop functioneditwidth"
                                        >
                                            <a
                                                className="btn btn-outline-info bg-white text-dark"
                                                id="functionedit"
                                                href="#"
                                            >
                                                Edit Functions
                                                <i className="fas fa-plus ml-4 mr-2"></i>{" "}
                                                <i className="fas fa-minus"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div
                                        onClick={this.editPhase}
                                        className="dropdown-widthcapabilty-model tab-fullwidth100"
                                    >
                                        <div className="btn-group scoring-drop phaseneditwidth">
                                            <a
                                                className="btn btn-outline-info bg-white text-dark"
                                                id="phaseedit"
                                                href="#"
                                            >
                                                Edit Phases
                                                <i className="fas fa-plus ml-2 mr-2"></i>{" "}
                                                <i className="fas fa-minus"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="function-box-holder">
                            {this.props.phases.length > 0 ||
                            this.props.functions.length > 0 ? (
                                <>
                                    <div className="vertical-left-box">
                                        {phaseRows}
                                    </div>
                                    <div className="function-box">
                                        {boxContainer}
                                    </div>
                                </>
                            ) : (
                                <p>{msg}</p>
                            )}
                        </div>
                    </Col>
                </Row>

                {/* POP MODEL FOR RE-ESTABLISH SCORE **** */}
                {/*  */}
                <div
                    className="modal fade"
                    id="editFunction"
                    tabindex="-1"
                    aria-labelledby="editFunction"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title mt-0"
                                    id="exampleModalLabel"
                                >
                                    Update
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label
                                            for="recipient-name"
                                            className="col-form-label"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            onChange={(e) =>
                                                this.setState({
                                                    updateValue: e.target.value,
                                                })
                                            }
                                            className="form-control"
                                            id="recipient-name"
                                            placeholder="Name"
                                            value={this.state.updateValue}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={this.handleNameUpdate}
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                >
                                    Save 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* POP MODEL FOR Function Add **** */}

                <ModalPopup
                    isOpen={this.state.isFunctionOpen} toggle={this.toggleFunction.bind(this)} title="Edit Function(s)"  className="capabilityFunctionsModal modal-lg" saveBtnTitle="SAVE"
                >
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
                            <input type="text" className="form-control" name="custom_function" 
                            placeholder="Type..."
                            value={this.state.newAddName} onChange={(e) => this.setState({newAddName: e.target.value , newAddButton:true})} />
                        </div>
                        <button className="btn btn-primary" disabled={!this.state.newAddButton}  onClick={()=>this.addNewFunctionPhase("function")}>+ Add Function</button>
                        {/* <p className="text-danger">{this.state.funcPhaseErr}</p> */}
                    </div>
                </ModalPopup>

                {/* POP MODEL FOR Phase Add **** */}

                <ModalPopup
                    isOpen={this.state.isPhaseOpen}
                    toggle={this.togglePhase.bind(this)}
                    title="Edit Phase(s)"
                    className="capabilityFunctionsModal modal-lg"
                    footer={false}
                    saveBtnTitle="SAVE"
                >
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
                            <input type="text" className="form-control" 
                            placeholder="Type..."
                            name="custom_phase" value={this.state.newAddName} onChange={(e) => this.setState({newAddName: e.target.value})}  />
                        </div>
                        <button className="btn btn-primary" disabled={!this.state.newAddButton} onClick={()=>this.addNewFunctionPhase("phase")}><b>+ Add Phase</b></button>
                        {/* <p className="text-danger">{this.state.funcPhaseErr}</p> */}
                    </div>
                </ModalPopup>
            </>
        );
    }
}

export default connect(null, { fetchFunctions, fetchPhases, fetchProcessData })(
    FunctionGrid
);

