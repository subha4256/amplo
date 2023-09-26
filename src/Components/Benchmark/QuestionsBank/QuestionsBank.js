import React, { Component } from "react";
import { connect } from "react-redux";
import { Global } from "../../../utils/Env";
import axios from "axios";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";

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
import QuestionsAddDomain from '../QuestionsAddDomain';
import QuestionsBankSelectStyle from "./QuestionsBankSelectStyle";
import QuestionsBankAddQuestionsBank from "./QuestionsBankAddQuestionsBank";
import QuestionsBankDuplicateQuestionsBank from "./QuestionsBankDuplicateQuestionsBank";
import QuestionsBankAssignIndustryClassification from "./QuestionsBankAssignIndustryClassification";
import { QuestionsBankWrapper } from "./Styling/QuestionsBank";
import { QuestionsBankSelectStyleWrapper } from "./Styling/QuestionsBankSelectStyle";
import {
    saveClientQuestionsBank,
    saveClientDomains,
    getClientQuestionsBank,
    getClientDomains,
    getClientQuestionsByDomain,
    setCurrentSelectedDomain,
    setCurrentSelectedQuestionsBank,
    saveClientQuestionsAnswers,
    getAllStylesListing,
    getQuestionsAttachment,
    deleteClientQuestions,
    duplicateClientQuestionsBank,
    exportQuestionsBank,
    getIndustryClassificationByQuestionsBankClient
} from "../../../actions/benchmarkingActions";
import {
    getQBDomainsForEdit,
    fetchBQBQuestionList,
    fetchBQBQuestionDetails,
    getBQClientAttachment,
    saveClientBenchMarkQuestionAnswers,
    deleteBenchMarkQuestionAnswers,
    updateAFlyScoreOfBenchMarkQuestion,
    clearAssesmentEdit
} from '../../../actions/questionaireActions';
import { fetchIndustryData } from "../../../actions/companyActions";
import { difference, flatMap, isEqual } from "lodash";
import Axios from "axios";

const config = require("../../../config");

class QuestionsBank extends Component {
    constructor(props) {
        super(props);



        Global.callback.getClientQuestionsBank_onComplete = (res) => {
            // if(Object.keys(this.props.currentQuestionBank).length === 0){
            //     if(res.data.length > 0){
            //         this.props.getClientDomains(res.data[0].QuestionBankId)
            //         this.props.setCurrentSelectedQuestionsBank(res.data[0])
            //     }
            //     this.props.setCurrentSelectedDomain({})
            // }
        };
        Global.callback.qbdomainsforedit_onComplete = (res) => {

        };
        Global.callback.saveclientbenchmarkquestionanswers_onComplete = async () => {
            this.props.fetchBQBQuestionList({ "domainId": this.props.currentDomainForEdit.DomainID, "projectId": this.state.projectId });
        };

        Global.callback.deletebenchmarkquestionAnswers_onComplete = () => {
            this.props.fetchBQBQuestionList({ "domainId": this.props.currentDomainForEdit.DomainID, "projectId": this.state.projectId });
        };
        Global.callback.setupdateaflyscoreofbenchmarkquestion_onComplete = () => {
            this.props.fetchBQBQuestionList({ "domainId": this.props.currentDomainForEdit.DomainID, "projectId": this.state.projectId });
        };

        Global.callback.saveClientQuestionsAnswers_onComplete = () => {
            this.props.getClientQuestionsByDomain(
                this.props.currentDomain.BMDomainId,
                this.props.currentQuestionBank.QuestionBankId
            );
        };

        Global.callback.deleteClientQuestions_onComplete = () => {
            this.props.getClientQuestionsByDomain(
                this.props.currentDomain.BMDomainId,
                this.props.currentQuestionBank.QuestionBankId
            );
        };

        Global.callback.exportQuestionsBank_onComplete = (res) => {
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
            mode: this.props.match.params.mode ? this.props.match.params.mode : null,
            projectId: this.props.match.params.projectId ? this.props.match.params.projectId : null,
            currentSelectedQuestionIndex: -1,
            qbChanged: false,
            isSelected: "",
            saveButtonStatus: false,
            status: false,
            updateAflyScore: "",
            checkedList:[] ,
            responseOptionId:""
        };
    }

    componentDidMount = async () => {
        this.props.getClientQuestionsBank(0);
        this.props.getAllStylesListing();
        this.props.fetchIndustryData();



        if (this.state.mode == 'edit') {
            this.props.clearAssesmentEdit();
            this.props.getQBDomainsForEdit({ "projectId": this.state.projectId });
        }
        setInterval(() => {
            if (
                sessionStorage.getItem("QuestionBankClientRefresh") &&
                sessionStorage.getItem("QuestionBankClientRefresh") == "refresh"
            ) {
                this.props.setCurrentSelectedDomain({});
                this.props.setCurrentSelectedQuestionsBank({});
                let arr = [];
                this.setState(
                    {
                        questions: arr,
                        selectedQuestionsBankId: 0,
                        fetchedQuestions: arr,
                        currentSelectedQuestionIndex: -1,
                        qbChanged: false,
                    },
                    () => {
                        this.props.getClientQuestionsBank(0);
                        this.props.getAllStylesListing();
                        this.props.fetchIndustryData();
                    }
                );
                sessionStorage.removeItem("QuestionBankClientRefresh");
            }
        }, 1000);




    };

    static getDerivedStateFromProps = (nextProps, prevState) => {
        let returnObj = { ...prevState };

        if (prevState.mode == 'edit') {

            console.log("in edit derived mode");
            let parsedQuestions = [];
            nextProps.QuestionsEdit.map((item) => {
                if (item.questions && item.questions.length > 0)
                    parsedQuestions.push(item.questions[0])
            })

            if (
                !isEqual(prevState.fetchedQuestions, parsedQuestions) &&
                !prevState.qbChanged
            ) {
                console.log("inside");
                returnObj = {
                    ...returnObj,
                    questions: parsedQuestions,
                    fetchedQuestions: parsedQuestions,

                };
            }

        }
        else {
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
        }
        return { ...returnObj };
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
                console.log("currentQuestion", currentQuestion)
                if (currentQuestion && currentQuestion.QuestionId > 0) {
                    if (this.state.mode == 'edit') {
                        console.log("getting attachment");
                        //this.props.getBQClientAttachment({id:currentQuestion.QuestionId});
                    }
                    else
                        this.props.getQuestionsAttachment(currentQuestion.id);
                }
            }
        );
    };

    assignStyleToQuestion = (styleId) => {
        let questions = JSON.parse(JSON.stringify(this.state.questions));
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
        let obj = this.state.mode == 'edit' ? {
            QuestionId: 0,
            questionText: "",
            StyleId: "1",
            OrderOfQuestion: order,
            importance: "3",
            response: [
                {
                    QuestionOptionId: 0,
                    position: 1,
                    responseName: 1,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    QuestionOptionId: 0,
                    position: 2,
                    responseName: 2,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    QuestionOptionId: 0,
                    position: 3,
                    responseName: 3,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    QuestionOptionId: 0,
                    position: 4,
                    responseName: 4,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    QuestionOptionId: 0,
                    position: 5,
                    responseName: 5,
                    responseText: "",
                    ImagePath: "0",
                },
            ],
        } : {
            id: 0,
            questionText: "",
            StyleId: "1",
            OrderOfQuestion: order,
            importance: "3",
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
        questions.push(obj);

        this.setState({
            questions,
        });
    };

    verifyQuestionsChanged = () => {
        if (this.state.mode == 'edit') {
            console.log("in edit");
            if (this.state.questions != this.state.fetchedQuestions && !(this.state.questions.length == 0 && this.state.fetchedQuestions.length == 0)) {
                return true;
            } else {
                return false;
            }
        }
        else {
            if (this.state.questions != this.state.fetchedQuestions) {
                return true;
            } else {
                return false;
            }
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
                        if (this.state.mode == 'edit') {
                            console.log("question to delete", questions[ind]);
                            if (questions[ind].QuestionId > 0) {
                                this.props.deleteBenchMarkQuestionAnswers({ "projectId": this.state.projectId, "domainId": this.props.currentDomainForEdit.DomainID, "questionId": questions[ind].QuestionId });
                            } else {
                                questions.splice(ind, 1);
                                this.setState({
                                    questions,
                                });
                            }
                        }
                        else {
                            if (questions[ind].id > 0) {
                                this.props.deleteClientQuestions(questions[ind].id);
                            } else {
                                questions.splice(ind, 1);
                                this.setState({
                                    questions,
                                });
                            }
                        }
                    },
                },
                {
                    label: "No",
                    onClick: () => { },
                },
            ],
        });
    };


    selectedResponseChecked = ( status, id , responseOptionId) =>{

        let obj = {SkipQuestionId : id}
        this.setState({
            responseOptionId: responseOptionId
        })

        if(status) {
            this.setState({
                checkedList: [...this.state.checkedList,obj]
             })
           
        }else {
            this.setState({
               checkedList: this.state.checkedList.filter(item => item != id)
            })
          
        }

    }

    questionChangeHandler = (e, ind) => {

        let questions = [...this.state.questions];
        questions[ind].questionText = e.target.value;
        this.setState({
            questions,
        });
    };
    aflyscoreChangeHandler = async (ind) => {
        let questions = [...this.state.questions];
        questions[ind].IsAFlyScoreEnabled = (questions[ind].IsAFlyScoreEnabled == 0 ? "1" : "0");
        this.setState({
            questions,
            updateAflyScore: questions[ind].QuestionId
        });
        this.props.updateAFlyScoreOfBenchMarkQuestion({ questionId: questions[ind].QuestionId, aflyscore: questions[ind].IsAFlyScoreEnabled });

    };

    reponseChangeHandler = (e, ind, resNum) => {
     
      
        let questions = [...this.state.questions];
        questions[ind].response[resNum].responseText = e.target.value;
       
        this.setState({
            questions,
        });
    };

    responseSequenceChangeHandler = (e, ind, resNum) => {
        console.log("response value", e.target.value);
        let questions = [...this.state.questions];
        let prevPosition = questions[ind].response[resNum].position;
        let prevResponse = "";
        for (let i = 0; i < questions[ind].response.length; i++) {
            if (questions[ind].response[i].position == e.target.value) {
                prevResponse = i;
            }
        }
        console.log("prevResponse", prevResponse);
        console.log("ind", ind);
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
            questions[nextIndex].OrderOfQuestion = nextIndex + 1;
            questions[ind] = replacingQuestion;
            questions[ind].OrderOfQuestion = ind + 1;
        }
        this.setState({
            questions,
        });
    };

    duplicateQuestionHandler = (ind) => {
        let questions = [...this.state.questions];
        let newQuestion = JSON.parse(JSON.stringify(questions[ind]));
        if (this.state.mode == 'edit')
            newQuestion.QuestionId = 0;
        else
            newQuestion.id = 0;
        questions.push(newQuestion);
        this.setState({
            questions: questions,
        });
    };

    clearQuestionHandler = (ind) => {
        let questions = [...this.state.questions];
        let obj = this.state.mode == 'edit' ? {
            QuestionId: 0,
            questionText: "",
            StyleId: "1",
            OrderOfQuestion: ind + 1,
            importance: "3",
            response: [
                {
                    QuestionOptionId: 0,
                    position: 1,
                    responseName: 1,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    QuestionOptionId: 0,
                    position: 2,
                    responseName: 2,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    QuestionOptionId: 0,
                    position: 3,
                    responseName: 3,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    QuestionOptionId: 0,
                    position: 4,
                    responseName: 4,
                    responseText: "",
                    ImagePath: "0",
                },
                {
                    QuestionOptionId: 0,
                    position: 5,
                    responseName: 5,
                    responseText: "",
                    ImagePath: "0",
                },
            ],
        } : {
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
        questions[ind] = obj;
        this.setState({
            questions,
        });
    };

    saveQuestionsBankDataHandlerConfirm = () => {
        confirmAlert({
            title: 'Confirm to continue',
            message: 'Project Will be Uploaded with the latest changes. Do you want to continue?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        await this.saveQuestionsBankDataHandler();
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    saveQuestionsBankDataHandler = async () => {
        if (this.state.mode == 'edit') {
            console.log("inside");
            let fetchedQuestions = this.state.questions
        

            let DBQuetion = flatMap(this.props.fetchDBQuestions, "questions");
            let quesitonArray = fetchedQuestions.map((question, index) => {

                if (DBQuetion[index] !== undefined) {
                    if (isEqual(question?.response, DBQuetion[index]?.response) && isEqual(question, DBQuetion[index])) {

                        if (this.state.updateAflyScore === DBQuetion[index].QuestionId) {
                            return { IsModified: 1, ...question, };
                        } else {
                            return { IsModified: 0, ...question, };
                        }
                    } else {
                        return { IsModified: 1, ...question, };
                    }
                } else {
                    return { IsModified: 0, ...question, };
                }
            });
            // for(var i=0;i<questions.length;i++)
            // {
            //     console.log("inside loop");
            //     let fetched=fetchedQuestions.filter((item)=>{return item.QuestionId==questions[i].QuestionId});
            //     console.log("fetched",fetched[0]);
            //     console.log("Questions",questions[i]);
            //     if(fetched.length==0)
            //     questions[i].IsModified=1;
            //     else if(isEqual(fetched[0],questions[i]))
            //     questions[i].IsModified=0;
            //     else
            //     questions[i].IsModified=1;
            //     console.log("updated questions");
            // }


            let QuesBankObj = {
                projectId: this.state.projectId,
                projectName: this.props.projects.filter((item) => item.BenchmarkProjectID == this.state.projectId).length > 0 ? this.props.projects.filter((item) => item.BenchmarkProjectID == this.state.projectId)[0].BenchmarkProjectName : 'test',
                domainId: this.props.currentDomainForEdit.DomainID,
                domainName: this.props.currentDomainForEdit.DomainName,
                questions: quesitonArray
            };

            console.log("QuestionBankGoServer =>", QuesBankObj)

            let sleee = QuesBankObj.questions.map(item => {
                return { ...item  , response: item.response.map(res => {
                    if(res.QuestionOptionId == this.state.responseOptionId) {
                         return {...res , SkipQuestion : this.state.checkedList}
                    }else {
                        return{...res , SkipQuestion: []}
                    }
                 })}
            })


            console.log("MODI =>", sleee)

            this.props.saveClientBenchMarkQuestionAnswers(QuesBankObj);
            this.setState({
                updateAflyScore: ""
            })

            // { "domainId": this.props.currentDomainForEdit.DomainID, "projectId": this.state.projectId }




            // if(questions.filter((item)=>(item.IsModified==1)).length==0)
            // alert("None of the questions have been modified. Cannot Save") 
            // else
            // {
            // this.props.saveClientBenchMarkQuestionAnswers(QuesBankObj);
            // }
        }
        else {
            let QuesBankObj = {
                questionsBankId: this.props.currentQuestionBank.QuestionBankId,
                QuestionBankName: this.props.currentQuestionBank.QuestionBankName,
                domainId: this.props.currentDomain.BMDomainId,
                domainName: this.props.currentDomain.DomainName,
                questions: this.state.questions,
            };
            this.props.saveClientQuestionsAnswers(QuesBankObj);
        }
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
        this.props.setCurrentSelectedDomain("");
        this.props.setCurrentSelectedQuestionsBank({});
    };

    questionsBankChangeHandler = (e) => {

        (e.target.value) ?
            this.setState({
                isSelected: e.target.value
            }) : this.setState({
                isSelected: ""
            })

        if (e.target.value != "") {
            this.props.getClientDomains(e.target.value);
            this.props.getIndustryClassificationByQuestionsBankClient(
                e.target.value
            );
            this.props.setCurrentSelectedDomain("");
            let ind = this.props.QuestionBanks.map(
                (QB) => QB.QuestionBankId
            ).indexOf(e.target.value);
            this.props.setCurrentSelectedQuestionsBank(
                this.props.QuestionBanks[ind]
            );
        } else {
            this.props.setCurrentSelectedDomain("");
            this.props.setCurrentSelectedQuestionsBank({});
        }
        let arr = [];
        this.setState({
            questions: arr,
            fetchedQuestions: arr,
            qbChanged: true,
        });
    };

    questionPriorityChangeHandler = (val, ind) => {
        let questions = [...this.state.questions];
        questions[ind].importance = val;
        this.setState({
            questions,
        });
    };

    render() {

        console.log("PRops =>" , this.props)
        console.log("state =>" , this.state)


        return (
            <>
                <DashboardHeader />
                <QuestionsBankWrapper id="wrapper">
                    <DashboardSidebar />
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* <!-- Main Content --> */}
                        <div id="content">
                            <QuestionsBankBreadcrumb mode={this.state.mode} />
                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid container-dashboard">
                                <div className="row mt-4 question-dropsec">
                                    {this.state.mode == 'edit' ?
                                        <div className="col-md-12 col-lg-12 col-xl-8">
                                            <div>
                                                <div style={{ float: "left", paddingTop: "11px" }}>

                                                    <h2><i className="fa fa-arrow-left" style={{ marginRight: "12px", cursor: "pointer" }} onClick={() => this.props.history.goBack()} />&nbsp;{this.props.selectedProject && this.props.selectedProject.currentProjectName ? this.props.selectedProject.currentProjectName : this.props?.location?.state?.data}</h2>
                                                </div>
                                                <div style={{ float: "right" }}>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary ml-3"
                                                        // disabled={this.state.fetchDBQuestions < this.state.questions ? false : this.state.saveButtonStatus}
                                                        onClick={
                                                            this.props
                                                                .currentDomainForEdit.DomainID &&
                                                                this.state.questions
                                                                    .length > 0
                                                                ? () =>
                                                                    this.saveQuestionsBankDataHandlerConfirm()
                                                                : () => { }
                                                        }>
                                                        SAVE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        :
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
                                                                onClick={() =>
                                                                    this.props.exportQuestionsBank(
                                                                        this.props
                                                                            .currentQuestionBank
                                                                            .QuestionBankId
                                                                    )
                                                                }
                                                            >
                                                                Download Questions
                                                                Bank
                                                            </a>
                                                            <Link to={this.state.isSelected ? `/questions-bank-excel-upload/${this.state.isSelected}` : "/questions-bank-excel-upload"}>
                                                                {this.state.isSelected && "Upload existing Question Bank" || "Upload New Questionn Bank"} {" "}
                                                            </Link>
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
                                                                href="#"
                                                                data-toggle="modal"
                                                                data-target="#assignIndustryClassification"
                                                            >
                                                                Assign Industry
                                                                Classification
                                                            </a>
                                                        </div>
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary ml-3"
                                                        onClick={
                                                            Object.keys(
                                                                this.props
                                                                    .currentQuestionBank
                                                            ).length > 0 &&
                                                                Object.keys(
                                                                    this.props
                                                                        .currentDomain
                                                                ).length > 0 &&
                                                                this.state.questions
                                                                    .length > 0
                                                                ? () =>
                                                                    this.saveQuestionsBankDataHandler()
                                                                : () => { }
                                                        }
                                                        disabled={
                                                            Object.keys(
                                                                this.props
                                                                    .currentQuestionBank
                                                            ).length > 0 &&
                                                                Object.keys(
                                                                    this.props
                                                                        .currentDomain
                                                                ).length > 0 &&
                                                                this.state.questions
                                                                    .length > 0
                                                                ? false
                                                                : true
                                                        }
                                                    >
                                                        SAVE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>}
                                </div>
                                {/* <!-- Start question Slider Section --> */}
                                <QuestionsBankSlider
                                    verifyQuestionsChanged={this.verifyQuestionsChanged.bind(
                                        this
                                    )}

                                    mode={this.state.mode}
                                    projectId={this.state.projectId}
                                    setQbChanged={this.setQbChanged.bind(this)}
                                />
                                <QuestionsBankQuestionsAndResponses
                                    mode={this.state.mode}
                                    projectId={this.state.projectId}
                                    checkedMethod={this.selectedResponseChecked}
                                    questionPriorityChangeHandler={this.questionPriorityChangeHandler.bind(
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
                                    aflyscoreChangeHandler={this.aflyscoreChangeHandler.bind(this)}
                                />
                                {/* <!-- /End container-fluid --> */}
                            </div>
                            {/* <!-- End of Main Content --> */}
                        </div>
                        {/* <!-- End of Content Wrapper --> */}
                    </div>
                    {this.state.mode != 'edit' ?
                        <QuestionsBankRightSidebar
                            sidebarQuesDragStart={this.sidebarQuesDragStart.bind(
                                this
                            )}
                        /> : ''}
                </QuestionsBankWrapper>
                <AsideComponent />
                <FooterComponent />
                <QuestionsBankWrapper>
                    <QuestionsBankEditDomain />
                </QuestionsBankWrapper>
                <QuestionsBankWrapper>
                    {this.state.mode != 'edit' ?
                        <QuestionsBankAddDomain
                            QuestionBankId={this.state.selectedQuestionsBankId}
                        /> :
                        <QuestionsAddDomain
                            projectId={this.state.projectId}
                            Domains={this.props.domainsForEdit}
                        />}
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
    saveQuestionsBankData: state.benchmarkingData.ClientQuestionsBankSave,
    domainsSaveData: state.benchmarkingData.ClientDomainsSave,
    QuestionBanks: state.benchmarkingData.ClientQuestionsBank,
    Domains: state.benchmarkingData.ClientDomains,
    Questions: state.benchmarkingData.ClientQuestions,
    QuestionsEdit: state.questionaire.domainQuestionForEdit,
    currentDomain: state.benchmarkingData.currentSelectedDomainName,
    currentQuestionBank: state.benchmarkingData.currentSelectedQuestionBank,
    projects: state.questionaire.projects,
    domainsForEdit: state.questionaire.domainsForEdit,
    domainQuestionForEdit: state.questionaire.domainQuestionForEdit,
    questionForEdit: state.questionaire.questionForEdit,
    projectAttachmentForEdit: state.questionaire.projectAttachmentForEdit,
    currentDomainForEdit: state.questionaire.projectSelectedDomainData,
    saveProjectQuestionData: state.questionaire.saveClientBenchMarkQuestionAnswersData,
    deleteProjectQuestionData: state.questionaire.deleteBenchMarkQuestionAnswersData,
    updateAFlyScoreOfBenchMarkQuestionData: state.questionaire.updateAFlyScoreOfBenchMarkQuestionData,
    fetchDBQuestions: state.questionaire.dbFetchQuestions,
    selectedProject: state.questionaire.selectedProject
});

export default connect(mapStateToProps, {
    saveClientQuestionsBank,
    saveClientDomains,
    getClientQuestionsBank,
    getClientDomains,
    getClientQuestionsByDomain,
    setCurrentSelectedDomain,
    setCurrentSelectedQuestionsBank,
    saveClientQuestionsAnswers,
    getAllStylesListing,
    getQuestionsAttachment,
    deleteClientQuestions,
    duplicateClientQuestionsBank,
    fetchIndustryData,
    exportQuestionsBank,
    getIndustryClassificationByQuestionsBankClient,
    getQBDomainsForEdit,
    fetchBQBQuestionList,
    fetchBQBQuestionDetails,
    getBQClientAttachment,
    saveClientBenchMarkQuestionAnswers,
    deleteBenchMarkQuestionAnswers,
    updateAFlyScoreOfBenchMarkQuestion,
    clearAssesmentEdit,

})(QuestionsBank);
