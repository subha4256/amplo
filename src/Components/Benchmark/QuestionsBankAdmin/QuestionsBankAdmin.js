import React, { Component } from "react";
import { connect } from "react-redux";
import { Global } from "../../../utils/Env";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";

import ModalPopup from "../../common/ModalPopup";
import DashboardHeader from "../../includes/dashboardHeader/DashboardHeader";
import FooterComponent from "../../includes/dashboardFooter/FooterComponent";
import AsideComponent from "../../includes/asideComponent/AsideComponent";
import DashboardSidebar from "../../includes/dashboardSidebar/DashboardSidebar";
import QuestionsBankBreadcrumb from "./QuestionsBankBreadcrumb";
import QuestionsBankSlider from "./QuestionsBankSlider";
import QuestionsBankQuestionsAndResponses from "./QuestionsBankQuestionsAndResponses";
import QuestionsBankRightSidebar from "./QuestionsBankRightSidebar";
import QuestionsBankEditDomain from "./QuestionsBankEditDomain";
import QuestionsBankAddDomain from "./QuestionsBankAddDomain";
import QuestionsBankSelectStyle from "./QuestionsBankSelectStyle";
import QuestionsBankAddQuestionsBank from "./QuestionsBankAddQuestionsBank";
import QuestionsBankDuplicateQuestionsBank from "./QuestionsBankDuplicateQuestionsBank";
import QuestionsBankAssignIndustryClassification from "./QuestionsBankAssignIndustryClassification";
import { QuestionsBankWrapper } from "./Styling/QuestionsBank";
import { QuestionsBankSelectStyleWrapper } from "./Styling/QuestionsBankSelectStyle";
import {
    saveAmploQuestionsBank,
    saveAmploDomains,
    getAmploQuestionsBank,
    getAmploDomains,
    getAmploQuestionsByDomain,
    setCurrentSelectedDomainAmplo,
    setCurrentSelectedQuestionsBankAmplo,
    saveAmploQuestionsAnswers,
    getAllStylesListing,
    getAmploQuestionsAttachment,
    deleteAmploQuestions,
    getClientAssignment,
    saveClientAssignment,
    exportAmploQuestionsBank,
    getClientQuestionsBankForAmplo,
    getIndustryClassificationByQuestionsBankAmplo,
    getAmploAndClientQuestionsBank,
    deleteAmploQuestionsBank,
} from "../../../actions/benchmarkingActions";
import { fetchIndustryData } from "../../../actions/companyActions";

const config = require("../../../config");

class QuestionsBankAdmin extends Component {
    constructor(props) {
        super(props);

        Global.callback.getAmploQuestionsBank_onComplete = (res) => {
            // if(Object.keys(this.props.currentQuestionBank).length === 0){
            //     if(res.data.length > 0){
            //         this.props.getAmploDomains(res.data[0].QuestionBankId)
            //         this.props.getClientAssignment(res.data[0].QuestionBankId)
            //         this.props.setCurrentSelectedQuestionsBankAmplo(res.data[0])
            //     }
            //     this.props.setCurrentSelectedDomainAmplo({})
            // }
        };

        Global.callback.saveAmploQuestionsAnswers_onComplete = () => {
            this.props.getAmploQuestionsByDomain(
                this.props.currentDomain.AmploBMDomainId,
                this.props.currentQuestionBank.QuestionBankId
            );
        };

        Global.callback.deleteAmploQuestions_onComplete = () => {
            this.props.getAmploQuestionsByDomain(
                this.props.currentDomain.AmploBMDomainId,
                this.props.currentQuestionBank.QuestionBankId
            );
        };

        Global.callback.saveClientAssignment_onComplete = () => {
            this.props.getClientAssignment(
                this.props.currentQuestionBank.QuestionBankId
            );
        };

        Global.callback.exportAmploQuestionsBank_onComplete = (res) => {
            let file_name = res.data.file_name;
            window.open(config.ApiBaseUrl + file_name, "_blank");
            let fileArray = {
                file_name: file_name,
            };
            setTimeout(() => {
                return axios.post(
                    config.laravelBaseUrl + "unlinkFile",
                    fileArray,
                    {
                        headers: {
                            authorization:
                                "Bearer " + sessionStorage.getItem("userToken"),
                        },
                    }
                );
            }, 10000);
        };

        let arr = [];

        this.state = {
            questions: arr,
            selectedQuestionsBankId: 0,
            fetchedQuestions: arr,
            currentSelectedQuestionIndex: -1,
            assignPopupOpen: false,
            clients: [],
            fetchedClients: [],
            qbChanged: false,
            isSelected: "",
        };
    }

    assignPopup = () => {
        this.setState({
            assignPopupOpen: !this.state.assignPopupOpen,
        });
    };

    handleClientChange = (e, index) => {
        let clients = [...this.state.clients];
        clients[index].IsSelected = e.target.checked === true ? "1" : "0";
        this.setState({
            clients,
        });
    };

    assignQuestionBanktoClient = () => {
        let selectedClients = [...this.state.clients];
        selectedClients = selectedClients.filter((client) => {
            return client.IsSelected === "1";
        });
        selectedClients = selectedClients.map((client) => {
            return {
                ClientId: client.ClientId,
            };
        });
        let saveObj = {
            QuestionId: this.props.currentQuestionBank.QuestionBankId,
            Clients: selectedClients,
        };
        this.props.saveClientAssignment(saveObj);
        this.assignPopup();
    };

    componentDidMount = () => {
        this.props.getAmploAndClientQuestionsBank();
        this.props.getAmploQuestionsBank();
        this.props.getAllStylesListing();
        this.props.fetchIndustryData();
        this.props.getClientQuestionsBankForAmplo();
        setInterval(() => {
            if (
                sessionStorage.getItem("QuestionBankAdminRefresh") &&
                sessionStorage.getItem("QuestionBankAdminRefresh") == "refresh"
            ) {
                let arr = [];
                this.props.setCurrentSelectedDomainAmplo({});
                this.props.setCurrentSelectedQuestionsBankAmplo({});
                this.setState(
                    {
                        questions: arr,
                        selectedQuestionsBankId: 0,
                        fetchedQuestions: arr,
                        currentSelectedQuestionIndex: -1,
                        assignPopupOpen: false,
                        clients: [],
                        fetchedClients: [],
                        qbChanged: false,
                    },
                    () => {
                        this.props.getAmploQuestionsBank();
                        this.props.getAllStylesListing();
                        this.props.fetchIndustryData();
                    }
                );
                sessionStorage.removeItem("QuestionBankAdminRefresh");
            }
        }, 1000);
    };

    static getDerivedStateFromProps = (nextProps, prevState) => {

        
        let returnObj = { ...prevState };
        if (nextProps.Questions.length > 0) {
            if (nextProps.Questions[0].questions) {
                if (
                    prevState.fetchedQuestions !==
                        nextProps.Questions[0].questions &&
                    !prevState.qbChanged
                ) {
                    returnObj = {
                        ...returnObj,
                        questions: nextProps.Questions[0].questions,
                        fetchedQuestions: nextProps.Questions[0].questions,
                    };
                }
            }
        }
        if (nextProps.clients !== prevState.fetchedClients) {
            returnObj = {
                ...returnObj,
                clients: nextProps.clients,
                fetchedClients: nextProps.clients,
            };
        }
        return returnObj;
    };

    changeCurrentSelectedQuestionIndexHandler = (ind) => {
        this.setState(
            {
                currentSelectedQuestionIndex: ind,
            },
            () => {
                let currentQuestion =
                    this.state.questions[
                        this.state.currentSelectedQuestionIndex
                    ];
                if (currentQuestion && currentQuestion.id > 0) {
                    this.props.getAmploQuestionsAttachment(currentQuestion.id);
                }
            }
        );
    };

    assignStyleToQuestion = (styleId) => {
        let questions = [...this.state.questions];
        if (this.state.currentSelectedQuestionIndex != -1) {
            questions[this.state.currentSelectedQuestionIndex].StyleId =
                styleId;
            this.setState({
                questions: questions,
                currentSelectedQuestionIndex: -1,
            });
        }
    };

    addQuestionHandler = () => {
        let questions = [...this.state.questions];
        let order = questions.length + 1;
        questions.push({
            id: 0,
            questionText: "",
            StyleId: "1",
            OrderOfQuestion: order,
            importance: "3",
            IsAFlyScoreEnabled: "0",
            response: [
                {
                    position: 1,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    position: 2,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    position: 3,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    position: 4,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    position: 5,
                    responseText: "",
                    ImagePath: "0",
                },
            ],
        });

        this.setState({
            questions,
        });
    };

    verifyQuestionsChanged = () => {
        if (this.state.questions != this.state.fetchedQuestions) {
            return true;
        } else {
            return false;
        }
    };

    removeQuestionHandler = (ind) => {
        confirmAlert({
            title: "Confirm to continue",
            message: "Are you sure to delete this Question ?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        let questions = [...this.state.questions];
                        if (questions[ind].id > 0) {
                            this.props.deleteAmploQuestions(questions[ind].id);
                        } else {
                            questions.splice(ind, 1);
                            this.setState({
                                questions,
                            });
                        }
                    },
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
        });
    };

    questionChangeHandler = (e, ind) => {
        let questions = [...this.state.questions];
        questions[ind].questionText = e.target.value;
        this.setState({
            questions,
        });
    };

    reponseChangeHandler = (e, ind, resNum) => {
        let questions = [...this.state.questions];
        questions[ind].response[resNum].responseText = e.target.value;
        this.setState({
            questions,
        });
    };

    responseSequenceChangeHandler = (e, ind, resNum) => {
        let questions = [...this.state.questions];
        let prevPosition = questions[ind].response[resNum].position;
        let prevResponse = "";
        for (let i = 0; i < questions[ind].response.length; i++) {
            if (questions[ind].response[i].position == e.target.value) {
                prevResponse = i;
            }
        }
        questions[ind].response[prevResponse].position = prevPosition;
        questions[ind].response[resNum].position = e.target.value;
        this.setState({
            questions,
        });
    };

    moveQuestionsHandler = (location, ind) => {
        let questions = [...this.state.questions];
        let nextIndex = null;
        if (location == "Up" && ind != 0) {
            nextIndex = ind - 1;
        } else if (location == "Down" && questions[ind + 1] != null) {
            nextIndex = ind + 1;
        }
        if (nextIndex != null) {
            let currentQuestion = questions[ind];
            let replacingQuestion = questions[nextIndex];
            questions[nextIndex] = currentQuestion;
            questions[ind] = replacingQuestion;
        }
        this.setState({
            questions,
        });
    };

    duplicateQuestionHandler = (ind) => {
        let questions = [...this.state.questions];
        let newQuestion = { ...questions[ind], id: 0 };
        questions.push(newQuestion);
        this.setState({
            questions,
        });
    };

    clearQuestionHandler = (ind) => {
        let questions = [...this.state.questions];
        questions[ind] = {
            id: 0,
            questionText: "",
            StyleId: "1",
            OrderOfQuestion: ind + 1,
            response: [
                {
                    position: 1,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    position: 2,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    position: 3,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    position: 4,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    position: 5,
                    responseText: "",
                    ImagePath: "0",
                },
            ],
        };
        this.setState({
            questions,
        });
    };

    saveQuestionsBankDataHandler = () => {
        let QuesBankObj = {
            questionsBankId: this.props.currentQuestionBank.QuestionBankId,
            QuestionBankName: this.props.currentQuestionBank.QuestionBankName,
            domainId: this.props.currentDomain.AmploBMDomainId,
            domainName: this.props.currentDomain.DomainName,
            questions: this.state.questions,
        };
        this.props.saveAmploQuestionsAnswers(QuesBankObj);
    };

    sidebarQuesDragStart = (ques) => {
        this.setState({
            draggedQuestion: {
                ...ques,
                id: 0,
            },
        });
    };

    onDraggedQuestionDragOver = (e) => {
        e.preventDefault();
    };

    onDraggedQuestionDrop = (e) => {
        let questions = [...this.state.questions];
        if (this.state.draggedQuestion) {
            questions.push(this.state.draggedQuestion);
        }
        this.setState({
            questions,
            draggedQuestion: null,
        });
    };

    setQbChanged = () => {
        this.setState({
            qbChanged: false,
        });
    };

    componentWillUnmount = () => {
        this.props.setCurrentSelectedDomainAmplo("");
        this.props.setCurrentSelectedQuestionsBankAmplo({});
    };

    questionsBankChangeHandler = (e) => {
        
        //  console.log("Select=>>" , e.target.value)
         (e.target.value) ?
             this.setState({
                 isSelected:e.target.value 
             }):  this.setState({
                isSelected: ""
            })


        if (e.target.value != "") {
            this.props.getAmploDomains(e.target.value);
            this.props.getIndustryClassificationByQuestionsBankAmplo(
                e.target.value
            );
            this.props.setCurrentSelectedDomainAmplo("");
            this.props.getClientAssignment(e.target.value);
            let ind = this.props.QuestionBanks.map(
                (QB) => QB.QuestionBankId
            ).indexOf(e.target.value);
            this.props.setCurrentSelectedQuestionsBankAmplo(
                this.props.QuestionBanks[ind]
            );
        } else {
            this.props.setCurrentSelectedDomainAmplo("");
            this.props.setCurrentSelectedQuestionsBankAmplo({});
        }
        let arr = [];
        this.setState({
            questions: arr,
            fetchedQuestions: arr,
            qbChanged: true,
        });
    };

    enableAflyScoreHandler = (e, ind) => {
        let questions = [...this.state.questions];
        if (e.target.checked == true) {
            questions[ind].IsAFlyScoreEnabled = "1";
        } else {
            questions[ind].IsAFlyScoreEnabled = "0";
        }
        this.setState({
            questions,
        });
    };

    questionPriorityChangeHandler = (val, ind) => {
        let questions = [...this.state.questions];
        questions[ind].importance = val;
        this.setState({
            questions,
        });
    };


    deleteQuestionBank = () =>{
        confirmAlert({
            title: 'Confirm to continue',
            message: 'Are you sure to delete this Question Bank ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.deleteAmploQuestionsBank(this.state.isSelected)
                        this.setState({
                            isSelected: ""
                        })
                       
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        }); 

    }

    render() {


        // const bansk = this.props.QuestionBanks.sort((a, b) => a.QuestionBankName.localeCompare(b.QuestionBankName))

        return (
            <>
                <DashboardHeader />
                <QuestionsBankWrapper id="wrapper">
                    <DashboardSidebar />
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* <!-- Main Content --> */}
                        <div id="content">
                            <QuestionsBankBreadcrumb />
                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid container-dashboard">
                                <div className="row mt-4 question-dropsec">
                                    <div className="col-md-12 col-lg-12 col-xl-8">
                                        <h2>Question Banks:</h2>
                                        <div className="d-flex justify-content-between">
                                            <select        
                                                className="custom-select bank-select"
                                                onChange={(e) => {
                                                    if (
                                                        this.verifyQuestionsChanged()
                                                    ) {
                                                        if (
                                                            window.confirm(
                                                                "Questions are not saved, Do you still want to continue ?"
                                                            )
                                                        ) {
                                                            this.questionsBankChangeHandler(
                                                                e
                                                            );
                                                        }
                                                    } else {
                                                        this.questionsBankChangeHandler(
                                                            e
                                                        );
                                                    }
                                                }}
                                                value={
                                                    this.props
                                                        .currentQuestionBank
                                                        .QuestionBankId
                                                }
                                            >
                                                <option value="">
                                                    {" "}
                                                    Select Question Bank{" "}
                                                </option>
                                                {this.props.QuestionBanks.map(
                                                    (QB) => {
                                                        return (
                                                            <option
                                                                key={
                                                                    QB.QuestionBankId
                                                                }
                                                                value={
                                                                    QB.QuestionBankId
                                                                }
                                                            >
                                                                {
                                                                    QB.QuestionBankName
                                                                }
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                            <div>
                                                <span className="dropdown">
                                                    <a
                                                        href="javascript:void(0)"
                                                        className="btn dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                    >
                                                        Actions
                                                    </a>
                                                    <div className="dropdown-menu">
                                                        <a
                                                          hidden={!this.state.isSelected && "true"}
                                                            href="#"
                                                            onClick={
                                                                Object.keys(
                                                                    this.props
                                                                        .currentQuestionBank
                                                                ).length > 0 &&
                                                                Object.keys(
                                                                    this.props
                                                                        .currentDomain
                                                                ).length > 0 &&
                                                                this.state
                                                                    .questions
                                                                    .length > 0
                                                                    ? () =>
                                                                          this.saveQuestionsBankDataHandler()
                                                                    : () => {}
                                                            }
                                                        >
                                                            Save Questions Bank
                                                        </a>
                                                        <a
                                                            href="#"
                                                            data-toggle="modal"
                                                            data-target="#addQuestionsBank"
                                                        >
                                                            Add/Edit/Delete Questions
                                                            Bank
                                                        </a>
                                                        <a
                                                          hidden={!this.state.isSelected && "true"}
                                                            href="#"
                                                            data-toggle="modal"
                                                            data-target="#duplicateQuestionsBank"
                                                        >
                                                            Duplicate Questions
                                                            Bank{" "}
                                                        </a>
                                                        <a
                                                        hidden={!this.state.isSelected && "true"}
                                                            href="#"
                                                            onClick={() =>
                                                                this.props.exportAmploQuestionsBank(
                                                                    this.props
                                                                        .currentQuestionBank
                                                                        .QuestionBankId
                                                                )
                                                            }
                                                        >
                                                            Download Questions
                                                            Bank
                                                        </a>
                                                      
                                                        <Link     
                                                        to={this.state.isSelected ? `/questions-bank-admin-excel-upload/${this.state.isSelected}` : "/questions-bank-admin-excel-upload"  }
                                                        >
                                                           {this.state.isSelected && "Upload existing Question Bank" || "Upload New Question Bank"} {" "}
                                                        </Link>
                                                        <a
                                                            href="#"
                                                            data-toggle="modal"
                                                            data-target="#assignIndustryClassification"
                                                        >
                                                            Assign Industry
                                                            Classification
                                                        </a>

                                                        {/* <a
                                                        hidden={this.state.isSelected ==""&& "true"}
                                                            href="#"
                                                            onClick={
                                                             this.deleteQuestionBank   
                                                            }
                                                        >
                                                        Delete Question Bank
                                                        </a> */}

                                                    </div>
                                                </span>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary ml-3"
                                                    onClick={() =>
                                                        this.assignPopup()
                                                    }
                                                >
                                                    ASSIGN
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Start question Slider Section --> */}
                                <QuestionsBankSlider
                                    verifyQuestionsChanged={this.verifyQuestionsChanged.bind(
                                        this
                                    )}
                                    setQbChanged={this.setQbChanged.bind(this)}
                                />
                                <QuestionsBankQuestionsAndResponses
                                    questionPriorityChangeHandler={this.questionPriorityChangeHandler.bind(
                                        this
                                    )}
                                    selectedQuestionsBankId={this.state.selectedQuestionsBankId}
                                    enableAflyScoreHandler={this.enableAflyScoreHandler.bind(
                                        this
                                    )}
                                    onDraggedQuestionDragOver={this.onDraggedQuestionDragOver.bind(
                                        this
                                    )}
                                    onDraggedQuestionDrop={this.onDraggedQuestionDrop.bind(
                                        this
                                    )}
                                    questions={this.state.questions}
                                    addQuestionHandler={this.addQuestionHandler.bind(
                                        this
                                    )}
                                    removeQuestionHandler={this.removeQuestionHandler.bind(
                                        this
                                    )}
                                    questionChangeHandler={this.questionChangeHandler.bind(
                                        this
                                    )}
                                    reponseChangeHandler={this.reponseChangeHandler.bind(
                                        this
                                    )}
                                    responseSequenceChangeHandler={this.responseSequenceChangeHandler.bind(
                                        this
                                    )}
                                    duplicateQuestionHandler={this.duplicateQuestionHandler.bind(
                                        this
                                    )}
                                    clearQuestionHandler={this.clearQuestionHandler.bind(
                                        this
                                    )}
                                    moveQuestionsHandler={this.moveQuestionsHandler.bind(
                                        this
                                    )}
                                    changeCurrentSelectedQuestionIndexHandler={this.changeCurrentSelectedQuestionIndexHandler.bind(
                                        this
                                    )}
                                />
                                <QuestionsBankRightSidebar
                                    getAllQuestionBanks={ this.props.getClientQuestionsBankForAmplo}
                                    sidebarQuesDragStart={this.sidebarQuesDragStart.bind(
                                        this
                                    )}
                                />
                                {/* <!-- /End container-fluid --> */}
                            </div>
                            {/* <!-- End of Main Content --> */}
                        </div>
                        {/* <!-- End of Content Wrapper --> */}
                    </div>
                </QuestionsBankWrapper>
                <AsideComponent />
                <FooterComponent />
                <ModalPopup
                    isOpen={this.state.assignPopupOpen}
                    toggle={this.assignPopup.bind(this)}
                    title={"Assign Questions Bank to Clients"}
                    onSave={this.assignQuestionBanktoClient.bind(this)}
                    className="templateModal"
                    footer={true}
                    saveBtnTitle="SAVE"
                >
                    <div className="form-group">
                        <p className="name-fub-phase-heading">
                            Questions Bank Name
                        </p>
                        <input
                            type="text"
                            className="form-control"
                            disabled={true}
                            value={
                                this.props.currentQuestionBank.QuestionBankName
                            }
                        />
                    </div>
                    <p className="mb-0">Select Clients:</p>
                    <div className="managebox">
                        {this.state.clients.map((client, key) => {
                            return (
                                <div
                                    className="custom-control custom-checkbox"
                                    key={"clientList-" + client.ClientId}
                                >
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id={"Client-" + client.ClientId}
                                        onChange={(e) =>
                                            this.handleClientChange(e, key)
                                        }
                                        checked={
                                            client.IsSelected === "1"
                                                ? true
                                                : false
                                        }
                                    />
                                    <label
                                        className="custom-control-label width100percent"
                                        htmlFor={"Client-" + client.ClientId}
                                    >
                                        {client.ClientName}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </ModalPopup>
                <QuestionsBankWrapper>
                    <QuestionsBankEditDomain />
                </QuestionsBankWrapper>
                <QuestionsBankWrapper>
                    <QuestionsBankAddDomain
                        QuestionBankId={this.state.selectedQuestionsBankId}
                    />
                    <QuestionsBankAddQuestionsBank />
                    <QuestionsBankDuplicateQuestionsBank
                     questionBanks={this.props.QuestionBanks}
                        verifyQuestionsChanged={this.verifyQuestionsChanged.bind(
                            this
                        )}
                    />
                    <QuestionsBankAssignIndustryClassification />
                </QuestionsBankWrapper>
                <QuestionsBankSelectStyleWrapper>
                    <QuestionsBankSelectStyle
                        selectedQuestion={
                            this.state.questions[
                                this.state.currentSelectedQuestionIndex
                            ]
                        }
                        assignStyleToQuestion={this.assignStyleToQuestion.bind(
                            this
                        )}
                    />
                </QuestionsBankSelectStyleWrapper>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    saveQuestionsBankData: state.benchmarkingData.SaveAmploQuestionsBank,
    domainsSaveData: state.benchmarkingData.AmploDomainsSave,
    QuestionBanks: state.benchmarkingData.AmploQuestionsBank,
    Domains: state.benchmarkingData.AmploDomains,
    Questions: state.benchmarkingData.AmploQuestions,
    currentDomain: state.benchmarkingData.currentSelectedDomainAmplo,
    currentQuestionBank:
        state.benchmarkingData.currentSelectedQuestionBankAmplo,
    clients: state.benchmarkingData.clientAssignment,
});

export default connect(mapStateToProps, {
    saveAmploQuestionsBank,
    saveAmploDomains,
    getAmploQuestionsBank,
    getAmploDomains,
    getAmploQuestionsByDomain,
    setCurrentSelectedDomainAmplo,
    setCurrentSelectedQuestionsBankAmplo,
    saveAmploQuestionsAnswers,
    getAllStylesListing,
    getAmploQuestionsAttachment,
    deleteAmploQuestions,
    getClientAssignment,
    saveClientAssignment,
    fetchIndustryData,
    exportAmploQuestionsBank,
    getClientQuestionsBankForAmplo,
    getIndustryClassificationByQuestionsBankAmplo,
    getAmploAndClientQuestionsBank,
    deleteAmploQuestionsBank
    
})(QuestionsBankAdmin);
