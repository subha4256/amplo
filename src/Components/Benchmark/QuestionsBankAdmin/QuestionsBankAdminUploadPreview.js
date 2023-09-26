import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { Global } from '../../../utils/Env';
import { QuestionsBankWrapper } from "./Styling/QuestionsBank";
import { QuestionsBankSelectStyleWrapper } from "./Styling/QuestionsBankSelectStyle";
import QuestionsBankSelectStyle from "./QuestionsBankSelectStyle";
import QuestionsBankAddDomain from "./QuestionsBankAddDomain";
import { getAmploQuestionBankImport, getAmploDomainsImport, getAmploQuestionsByDomainImport, getAmploAttachmentImport, getAllStylesListing , saveImportQuestionsAnswers, saveAmploImportQuestionsBank, deleteAmploImportQuestions, saveAmploImportQuestionBankFromInterface, getAmploUploadBatchinfo} from "../../../actions/benchmarkingActions";
import axios from 'axios';
import CacheStorage from '.././../../utils/CacheStorage';
import { responseMessage } from '../../../utils/alert';
const config = require('../../../config');


class QuestionsBankAdminUploadPreview extends Component {

    constructor(props){
        super(props);
        let arr = [];

        this.state = {
            batchId : this.props.match.params.batchId,
            QuestionBankId : 0,
            QuestionBankName : '',
            currentSelectedDomainId : 0,
            currentSelectedDomainName : "",
            questions : arr,
            fetchedQuestions : arr,
            currentSelectedQuestionIndex : -1
        }

        Global.callback.saveImportQuestionsAnswers_onComplete = res => {
            this.props.getAmploQuestionsByDomainImport(this.state.currentSelectedDomainId, this.state.QuestionBankId, this.state.batchId);
        }

        Global.callback.saveAmploImportQuestionBankFromInterface_onComplete = res => {
            setTimeout(()=>{
                sessionStorage.setItem('QuestionBankAdminRefresh','refresh');
                window.close();
            },2000)
        }

        Global.callback.getAmploQuestionBankImport_onComplete = res => {
            this.setState({
                QuestionBankId : res.data[0].QuestionBankImportId,
                QuestionBankName : res.data[0].QuestionBankName
            },()=>{
                this.props.getAmploDomainsImport(this.state.QuestionBankId);
            })
        }

        Global.callback.getAmploDomainsImport_onComplete = res => {
            if(this.state.currentSelectedDomainId == 0){
                this.setState({
                    currentSelectedDomainId : res.data[0].BMDomainImportId,
                    currentSelectedDomainName : res.data[0].DomainName
                },()=>{
                    this.props.getAmploQuestionsByDomainImport(this.state.currentSelectedDomainId, this.state.QuestionBankId, this.state.batchId);
                })    
            }
        }
    }

    static getDerivedStateFromProps = (nextProps,prevState) => {
        let returnObj = {...prevState}
        console.log(nextProps.previewAmploQuestions)
        if(nextProps.previewAmploQuestions.length > 0){
            if(nextProps.previewAmploQuestions[0].questions){
                if(prevState.fetchedQuestions !== nextProps.previewAmploQuestions[0].questions && !prevState.qbChanged){
                    returnObj = {
                        ...returnObj,
                        questions : nextProps.previewAmploQuestions[0].questions,
                        fetchedQuestions : nextProps.previewAmploQuestions[0].questions
                    }
                }
            }
        }else{
            if(prevState.fetchedQuestions !== nextProps.previewAmploQuestions){
                returnObj = {
                    ...returnObj,
                    questions : nextProps.previewAmploQuestions,
                    fetchedQuestions : nextProps.previewAmploQuestions
                }
            }
        }
        return returnObj;
    }

    componentDidMount(){
        this.props.getAmploQuestionBankImport(this.state.batchId);
        this.props.getAmploUploadBatchinfo(this.state.batchId)
        this.props.getAllStylesListing();
    }

    domainChangeHandler = (domainId, domainName) => {
        this.setState({
            currentSelectedDomainId : domainId,
            currentSelectedDomainName : domainName
        },()=>{
            this.props.getAmploQuestionsByDomainImport(this.state.currentSelectedDomainId, this.state.QuestionBankId, this.state.batchId);
        })
    }

    responseSequenceChangeHandler = (e,ind,resNum) => {
        let questions = [...this.state.questions];
        let prevPosition = questions[ind].response[resNum].position;
        let prevResponse = "";
        for(let i=0; i < questions[ind].response.length; i++){
            if(questions[ind].response[i].position == e.target.value){
                prevResponse = i;
            }
        }
        questions[ind].response[prevResponse].position = prevPosition;
        questions[ind].response[resNum].position = e.target.value;
        this.setState({
            questions
        })
    }

    reponseChangeHandler = (e,ind,resNum) => {
        let questions = [...this.state.questions];
        questions[ind].response[resNum].responseText = e.target.value;
        this.setState({
            questions
        })
    }

    changeCurrentSelectedQuestionIndexHandler = (ind) => {
        this.setState({
            currentSelectedQuestionIndex : ind
        },()=>{
            let currentQuestion = this.state.questions[this.state.currentSelectedQuestionIndex];
            if(currentQuestion && currentQuestion.id > 0){
                this.props.getAmploAttachmentImport(currentQuestion.id)
            }
        })
    }

    moveQuestionsHandler = (location, ind) => {
        let questions = [...this.state.questions];
        let nextIndex = null;
        if(location == "Up" && ind != 0){
            nextIndex = ind-1;
        }else if(location == "Down" && questions[ind+1] != null){
            nextIndex = ind+1;
        }
        if(nextIndex != null){
            let currentQuestion = questions[ind];
            let replacingQuestion = questions[nextIndex];
            questions[nextIndex] = currentQuestion;
            questions[ind] = replacingQuestion;
        }
        this.setState({
            questions
        })
    }

    duplicateQuestionHandler = (ind) => {
        let questions = [...this.state.questions];
        let newQuestion = {...questions[ind],id:0};
        questions.push(newQuestion);
        this.setState({
            questions
        })
    }
    
    // Author :Sonu Sharma || Full_stack developer
    // Date   : 20/07/2021
    // Name   : Method for update and new question bank (Admin Side)
    // Params : Batchid , QuestionBankId
    // Type   : POST, Patch
    // Purpose: Upload the excel sheet for update of quesiton bank/ new question bank...

    importFromInterfaceHandler = () => {

        if(this.props.match.params.quesitonBankId) {
            confirmAlert({
                title: 'Update Confirmation!',
                message: 'Are You Sure You Want To Update The Quesiton Bank ?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                        
                            const headers = {
                                "authorization": "Bearer " + CacheStorage.getItem("userToken")
                            }
                            axios.patch(config.laravelBaseUrl+'UpdateAmploQuestionBankFromInterface', {
                                QuestionBankId: this.props.match.params.quesitonBankId ,
                                BatchId: this.props.match.params.batchId
                            }, {
                                headers: headers
                            })
                            .then(res => {
                                  if(res.status === 200) {
                                      responseMessage("success","Question bank update successfully.")
                                      this.props.history.push("/questions-bank-admin");
                                  }
                            })
                            .catch(err => console.log(err))
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {}
                    }
                ]
            }); 
        }else {

            if(this.state.fetchedQuestions != this.state.questions){
                if(window.confirm('You have some unsaved data , Do you Want to proceed without saving it ?')){
                    this.props.saveAmploImportQuestionBankFromInterface({ batchId : this.state.batchId });
                    this.props.history.push("/questions-bank-admin");
                }
            }else{
                this.props.saveAmploImportQuestionBankFromInterface({ batchId : this.state.batchId });
                setTimeout(() => {
                    this.props.history.push("/questions-bank-admin");
                },2000)
            }
        }

    }

    removeQuestionHandler = (ind) => {
        confirmAlert({
            title: 'Confirm to continue',
            message: 'Are you sure to delete this Question ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let questions = [...this.state.questions];
                        if(questions[ind].id > 0){
                            this.props.deleteAmploImportQuestions(questions[ind].id)
                            questions.splice(ind,1);
                            this.setState({
                                questions
                            })
                        }else{
                            questions.splice(ind,1);
                            this.setState({
                                questions
                            })
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }

    clearQuestionHandler = (ind) => {
        let questions = [...this.state.questions];
        questions[ind] = {
            id:0,
            questionText:"",
            StyleId: "1",
            OrderOfQuestion: ind+1,
            response : [{
                position : 1,
                responseText : "",
                ImagePath: "0"
            },{
                position : 2,
                responseText : "",
                ImagePath: "0"
            },{
                position : 3,
                responseText : "",
                ImagePath: "0"
            },{
                position : 4,
                responseText : "",
                ImagePath: "0"
            },{
                position : 5,
                responseText : "",
                ImagePath: "0"
            }]
        }
        this.setState({
            questions
        })
    }

    questionChangeHandler = (e,ind) => {
        let questions = [...this.state.questions];
        questions[ind].questionText = e.target.value;
        this.setState({
            questions
        })
    }

    enableAflyScoreHandler = (e,ind) => {
        let questions = [...this.state.questions];
        if(e.target.checked == true){
            questions[ind].IsAflyScoreEnabled = '1';
        }else{
            questions[ind].IsAflyScoreEnabled = '0';
        }   
        this.setState({
            questions
        })
    }

    addQuestionHandler = () => {
        let questions = [...this.state.questions];
        let order = questions.length + 1;
        questions.push({
            id:0,
            questionText:"",
            StyleId: "1",
            OrderOfQuestion: order,
            importance : "3",
            IsAFlyScoreEnabled : "0",
            response : [{
                position : 1,
                responseText : "",
                ImagePath: "0"
            },{
                position : 2,
                responseText : "",
                ImagePath: "0"
            },{
                position : 3,
                responseText : "",
                ImagePath: "0"
            },{
                position : 4,
                responseText : "",
                ImagePath: "0"
            },{
                position : 5,
                responseText : "",
                ImagePath: "0"
            }]
        })

        this.setState({
            questions
        })
    }

    assignStyleToQuestion = (styleId) => {
        let questions = [...this.state.questions]
        if(this.state.currentSelectedQuestionIndex != -1){
            questions[this.state.currentSelectedQuestionIndex].StyleId = styleId
            this.setState({
                questions : questions,
                currentSelectedQuestionIndex : -1
            })
        }
    }

    saveQuestionsAnswers = () => {
        let saveObj = {
            questionsBankId: this.state.QuestionBankId,
            batchId : this.state.batchId,
            questionBankName: this.state.QuestionBankName,
            domainId: this.state.currentSelectedDomainId,
            domainName: this.state.currentSelectedDomainName,
            questions: this.state.questions
        }
        this.props.saveImportQuestionsAnswers(saveObj);
    }

    questionPriorityChangeHandler = (val, ind) => {
        let questions = [...this.state.questions];
        questions[ind].importance = val;
        this.setState({
            questions
        });
    }

    render(){
       
        let questions = this.state.questions.map((question,i)=>{
            let responses = question.response?question.response.map((res,j)=>{
                return(
                    <div className="row mb-3" key={'response_'+i+'_'+j}>
                        <div className="col-md-4 col-lg-3">
                            <select className="custom-select" value={res.position} onChange={(e)=>this.responseSequenceChangeHandler(e,i,j)}>
                                <option value="1">Response 1</option>
                                <option value="2">Response 2</option>
                                <option value="3">Response 3</option>
                                <option value="4">Response 4</option>
                                <option value="5">Response 5</option>
                            </select>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="quecontent-sm">
                                <textarea placeholder="Enter Your Response" value={res.responseText} onChange={(e)=>this.reponseChangeHandler(e,i,j)}></textarea>
                            </div>
                        </div>
                    </div>
                )
            }):null
            return(
                <div className="bg-light" key={"question"+i}>
                    <div className="quedropdown">
                        <div className="btn-group dropleft">
                            <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fas fa-ellipsis-h"></i>
                            </a>
                            <div className="dropdown-menu">
                                <a href="javascript:void(0)" onClick={()=>this.changeCurrentSelectedQuestionIndexHandler(i)} data-toggle="modal" data-target="#picktemplate">Pick a Style</a>
                                <a href="javascript:void(0)">Move Question <span className="float-right"><i className="fas fa-chevron-down mr-1" onClick={()=>this.moveQuestionsHandler("Down",i)}></i><i onClick={()=>this.moveQuestionsHandler("Up",i)} className="fas fa-chevron-up"></i></span></a>
                                <a href="javascript:void(0)" onClick={()=>this.duplicateQuestionHandler(i)}>Duplicate Question</a>
                                <a href="javascript:void(0)" onClick={()=>this.removeQuestionHandler(i)}>Delete Question</a>
                                <a href="javascript:void(0)" onClick={()=>this.clearQuestionHandler(i)}>Clear All</a>
                                {/* <a href="javascript:void(0)">Modify Industry Classification</a> */}
                            </div>
                        </div>
                    </div>
                    <div className="questionfrm">
                        <div className="form-group">
                            <label className="quelabel">Question {i+1}:</label>
                            <div className="prioritydrop">
                                <label>Priority :  &nbsp;</label>
                                <select className="form-control" style={{display : "inline", width:"115px"}} value={question.importance} onChange={(e)=>this.questionPriorityChangeHandler(e.target.value, i)}>
                                    <option value="5">Very High</option>
                                    <option value="4">High</option>
                                    <option value="3">Medium</option>
                                    <option value="2">Low</option>
                                    <option value="1">Very Low</option>
                                </select>
                            </div>
                            <div className="quecontent-lg">
                                <textarea value={question.questionText} onChange={(e)=>this.questionChangeHandler(e,i)} placeholder="Enter Your Question"></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="quelabel">Enter five answer choices:</label>
                            {responses}
                        </div>
                    </div>
                    <div className="delrow d-flex justify-content-between align-items-center">
                        <a href="javascript:void(0)" onClick={()=>this.removeQuestionHandler(i)}><i className="fas fa-trash-alt"></i></a>
                        <span>AFLY Score Enabled : <input type="checkbox" checked={question.IsAflyScoreEnabled == "0" ? false : true} onChange={(e)=>this.enableAflyScoreHandler(e,i)} /></span>
                    </div>
                </div>
            )
        })
        return(
            <>
                <QuestionsBankWrapper id="wrapper" style={{marginBottom : 0, marginTop : 0}}>
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* <!-- Main Content --> */}
                        <div id="content">
                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid container-dashboard">
                                <div className="row">
                                    <div className="col-12 d-flex" style={{justifyContent : "center", marginTop : "32px"}}>
                                        <h3>Question Bank Upload Preview</h3>
                                    </div>
                                </div>
                                <div className="row mt-4 question-dropsec">
                                    <div className="col-md-12 col-lg-12 col-xl-8">
                                        <h2>Question Bank Name for Import:</h2>
                                        <div className="d-flex justify-content-between">
                                            <input  
                                            disabled= {this.props.match.params.quesitonBankId ? true : false}
                                            placeholder="Questions Bank Name" value={this.state.QuestionBankName} onChange={(e)=>this.setState({ QuestionBankName : e.target.value })} className="form-control" style={{width : "35%"}} onBlur={()=>this.props.saveAmploImportQuestionsBank({ QuestionBankId : this.state.QuestionBankId, QuestionBankName : this.state.QuestionBankName })} />
                                        <div>
                                            <span className="dropdown">
                                            </span>
                                            <button type="button" className="btn btn-primary ml-3" onClick={()=>this.saveQuestionsAnswers()} disabled={this.state.fetchedQuestions == this.state.questions ? true : false}  >
                                                SAVE
                                            </button>
                                            <button type="button" className="btn btn-primary ml-3" onClick={()=>this.importFromInterfaceHandler()}  >
                                                IMPORT
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Start question Slider Section --> */}
                            <div className="row mt-4 question-sec">
                                <div className="col-md-12 col-lg-12 col-xl-8">
                                    <div className="bg-light">
                                        <div className="quedropdown">
                                            <div className="btn-group dropleft">
                                                <a href="#!" className="dropdown-toggle" data-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false">
                                                    <i className="fas fa-ellipsis-h"></i>
                                                </a>
                                                <div className="dropdown-menu">
                                                    {/* <a href="#!" data-toggle="modal"
                                                        data-target="#editDomains">Edit Domains</a> */}
                                                    <a href="#!" data-toggle="modal"
                                                        data-target="#addDomains">Add/Edit Domains</a>
                                                </div>
                                            </div>
                                        </div>
                                        <h2>Domains for Import</h2>
                                        <div className="benchmarking-map">
                                            <ul className="list-inline">
                                                {this.props.previewAmploDomains.map((domain)=>{
                                                    return(
                                                        <li className={domain.BMDomainImportId == this.state.currentSelectedDomainId ? "list-inline-item active" : 'list-inline-item'} onClick={()=>this.domainChangeHandler(domain.BMDomainImportId, domain.DomainName)} key={`domain_${domain.BMDomainImportId}`}  >{domain.DomainName}</li>
                                                    )
                                                })}
                                                <li className="list-inline-item" style={{color:"#cccccc"}} ></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-lg-4 col-xl-4" style={{position : "fixed", right : 0}}>
                                    <div className="bg-light">
                                        <p><b>Imported By : </b><span style={{color : "#083ac8"}}>{this.props.uploadBatchInfo[0] ? this.props.uploadBatchInfo[0].ImportedBy : ""}</span></p>
                                        <p><b>File Name : </b>{this.props.uploadBatchInfo[0] ?<a href={`${config.ApiBaseUrl}QuestionsBank/Archive/${this.props.uploadBatchInfo[0].ImportedFileName}`} target="_blank"><span style={{color : "#083ac8"}}>{this.props.uploadBatchInfo[0] ? this.props.uploadBatchInfo[0].ImportedFileName : ""}</span></a> : ""}</p>
                                        <p><b>Imported On : </b><span style={{color : "#083ac8"}}>{this.props.uploadBatchInfo[0] ? moment(this.props.uploadBatchInfo[0].ImportedOn).format("DD-MMM-YYYY hh:mm A"): ""}</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="row domain-slider-sec mt-3 mb-0" >
                            <div className="col-md-12 col-lg-10 col-xl-8">
                                <ul className="list-inline heading-list mb-0">
                                    <li>
                                        <h2>{this.state.currentSelectedDomainName}</h2>
                                    </li>
                                    <li className="sm-txt" onClick={()=>this.addQuestionHandler()}><small style={{pointerEvents:"none"}}><i className="fas fa-plus"></i> Add New Question</small><span
                                            className="ml-2"></span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row mt-4 question-sec" >
                            <div className="col-md-12 col-lg-12 col-xl-8">
                                {questions}
                            </div>
                            </div>
                                {/* <!-- /End container-fluid --> */}

                            </div>
                            {/* <!-- End of Main Content --> */}
                        </div>
                        {/* <!-- End of Content Wrapper --> */}
                    </div>

                    </QuestionsBankWrapper>
                    <QuestionsBankSelectStyleWrapper>
                        <QuestionsBankSelectStyle
                            selectedQuestion = {this.state.questions[this.state.currentSelectedQuestionIndex]}
                            assignStyleToQuestion = {this.assignStyleToQuestion.bind(this)}
                            preview = {true}
                        />
                    </QuestionsBankSelectStyleWrapper>
                    <QuestionsBankWrapper>
                        <QuestionsBankAddDomain
                            QuestionBankId = {this.state.QuestionBankId}
                            currentSelectedDomainId = {this.state.currentSelectedDomainId}
                            domainDeleted = {()=>this.setState({ currentSelectedDomainId : 0, currentSelectedDomainName : "" })}
                            preview = {true}
                        />
                    </QuestionsBankWrapper>
                </>
            )
        }
    }

const mapStateToProps = state => ({
    previewAmploQuestionBank : state.benchmarkingData.previewAmploQuestionBank,
    previewAmploDomains : state.benchmarkingData.previewAmploDomains,
    previewAmploQuestions : state.benchmarkingData.previewAmploQuestions,
    previewAmploInterfaceAttachments : state.benchmarkingData.previewAmploInterfaceAttachments,
    uploadBatchInfo : state.benchmarkingData.amploUploadBatchInfo
})

export default connect(mapStateToProps,{ getAmploQuestionBankImport, getAmploDomainsImport, getAmploQuestionsByDomainImport, getAmploAttachmentImport, getAllStylesListing, saveImportQuestionsAnswers, saveAmploImportQuestionsBank, deleteAmploImportQuestions, saveAmploImportQuestionBankFromInterface, getAmploUploadBatchinfo })(QuestionsBankAdminUploadPreview);