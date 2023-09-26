import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'underscore';
import {Link} from 'react-router-dom';
import { Form, Label, Row, Col  } from 'reactstrap';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import { TopComponentWrapper } from './Styling/Questionaire';
import DomainProgress from './DomainProgress';
import QuestionaireAside from './QuestionaireAside';
import { QuestionsBankWrapper } from "./QuestionsBank/Styling/QuestionsBank";
import QuestionsAddDomain from "./QuestionsAddDomain";
import Quiz from './Quiz';
import QuntitveQustoinModel from './Models/QuntitveQustoinModel'
import SidebarJs from '../../common/js/sidebarAnimation';
import { fetchProjects } from '../../actions/capabilityActions';
import {handleSelectProject, fetchBenchmarkProjects, fetchBenchmarkDomains, fetchDomainQuestions, fetchQuestion, saveAnswer, saveGoalSetting, getUnAnsweredQuestions } from '../../actions/questionaireActions';
import { getLock } from '../../actions/iotActions';
import Loader  from '../Loader';
import {errorAlert,responseMessage} from '../../utils/alert';
import CacheStorage from '../../utils/CacheStorage';
import { Global } from '../../utils/Env';
import $, { data } from 'jquery'
import { Button , Modal } from 'react-bootstrap';
import KPIReportsBodyAdd from './KPIReportsAdd/KPIReportsBodyAdd';
import Axios from 'axios';
const config = require('../../config');

//.. Ashim: Need to implement LoadAPI

class Questionaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            domains: [],
            currentProjectName:"",
            currentDomainIndex: 0,
            questions: [],
            currentQuesIndex: 0,
            currentProject: null,
            question: {},
            selectedAnswerDesc: '',
            quizDone: false,
            loading: true,
            errors: {},
            unansweredQuestions : [],
            valueForQuestionChange : 0,
            fetchedQuestionValue : 0,
            validate:"",
            show:false ,
            kpiDahboard: false,
            actionDropDownList: [],
            backButton:false ,
            backSkip: "",
            backSkipStatus:false,
            backQuesHis: [],
            quntitveModelStatus: false,
            userTypeId:""

        }

    
        this.sidebarAnimation=new SidebarJs();
        Global.callback.saveAnswer_onComplete = () => {
            this.props.getUnAnsweredQuestions(this.state.currentProject,this.props.domains.length > 0 ? this.props.domains[this.state.currentDomainIndex].DomainID : 0);
            this.getDomains()
        }
    }

    async getDomains() {
        
        let dObj = {
            project_id: this.state.currentProject
        }
        let domains = await axios.get(config.laravelBaseUrl+'get_user_domains_bm_project/'+dObj.project_id, {
            headers: {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
        });
        this.props.fetchBenchmarkDomains(domains);
        
        this.props.getLock( dObj.project_id )
    }

    async getDomainQuestions() {
        let dObj = {
            project_id: this.state.currentProject,
            domain_id: this.props.domains.length > 0 ? this.props.domains[this.state.currentDomainIndex].DomainID : 0
        }
        let questions = await axios.get(config.laravelBaseUrl+'fetch_bm_question_list/'+dObj.project_id+'/'+dObj.domain_id, {
            headers: {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
        });
        this.props.getUnAnsweredQuestions(this.state.currentProject,this.props.domains.length > 0 ? this.props.domains[this.state.currentDomainIndex].DomainID : 0);
        this.props.fetchDomainQuestions(questions);
    }

    async getQuizData(back) {


        console.log("Quiz currentQueIndex" ,this.state.currentQuesIndex)

        let qObj = {
            project_id: this.state.currentProject,
            domain_id: this.props.domains.length > 0 ? this.props.domains[this.state.currentDomainIndex].DomainID : 0,
            question_id: back == "back" ? this.state.backQuesHis.at(-2):  this.props.questions[this.state.currentQuesIndex]
        }

        console.log("QUIZ OBJ =>", qObj)

        if(qObj.question_id){
            let quiz = await axios.get(config.laravelBaseUrl+'fetch_bm_question_details/'+qObj.project_id+'/'+qObj.domain_id+'/'+qObj.question_id, {
                headers: {
                    "authorization": "Bearer " + CacheStorage.getItem("userToken")
                }
            });

            this.setState({
                currentQuesitonNum: this.props.questions.indexOf(quiz.data.data.BenchmarkQuestionID) +1
            })

           if(qObj.question_id != quiz.data.data.BenchmarkQuestionID) {
                  this.setState({
                    currentQuesIndex:  back == "back" ? this.state.currentQuesIndex-1 : this.state.currentQuesIndex+1 ,
                    backSkipStatus:true
                })
                console.log(this.props.questions.indexOf(quiz.data.data.BenchmarkQuestionID))
            }else {
                this.setState({
                    backSkipStatus:false
                })
            }
            this.props.fetchQuestion(quiz);
            if(back =="back") {
                this.state.backQuesHis.pop()
            }
            this.setState({
                loading: false ,
                backSkip: qObj.question_id ,
                backQuesHis:  back =="back" ?  this.state.backQuesHis : [...new Set([...this.state.backQuesHis , qObj.question_id]) ] 
                
            })  
        } 
    }


       fetchOption() {
           console.log("jeelo")
     }

    async componentDidMount() {

        console.log(localStorage.getItem('userType'))

           this.setState({ userTypeId: sessionStorage.getItem('userType')})

        try{
            let projects = await axios.get(config.laravelBaseUrl+'get_user_bm_projects', {
                headers: {
                    "authorization": "Bearer " + CacheStorage.getItem("userToken")
                }
            });
            this.props.fetchBenchmarkProjects(projects);

            // fetchOption()

            axios.get(config.laravelBaseUrl+"getActionListForQuestion" , {
                headers: {
                    authorization: "Bearer " + sessionStorage.getItem("userToken"),
                },
              })
              .then(res => {
                 console.log("res dropdown here" , res.data.data)
                 this.setState({
                    ...this.state ,
                    actionDropDownList: Object.values(res?.data?.data).filter(item => item.Value != "QuantitativeQuestions")
                 })
              })
              .catch(err => console.log(err))

            
            if(this.props.projects.length > 0) {
                let currentProjectName=this.props.selectedProject.currentProjectName?this.props.selectedProject.currentProjectName:this.props.location.state.projId ? this.props.location.state.projName :this.props.projects[0].BenchmarkProjectName;
                let currentProject=this.props.selectedProject.currentProject?this.props.selectedProject.currentProject:this.props.location.state.projName ? this.props.location.state.projId : this.props.projects[0].BenchmarkProjectID;
                this.setState({
                    currentProjectName: currentProjectName,
                    currentProject: currentProject,
                    loading: false
                });
                this.props.handleSelectProject({"currentProject":currentProject,"currentProjectName":currentProjectName});
                await this.getDomains();
                if(this.props.domains.length > 0) {
                    await this.getDomainQuestions();
                    await this.getQuizData();
                }           
            }else{
                this.setState({
                    errors: {
                        success: false
                    }
                })
            }
            this.sidebarAnimation.toggle();
        }catch(error) {
            this.setState({
                loading: false
            });
            if(error.response) {
                // responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
        this.props.fetchProjects()
    }

    componentWillReceiveProps(newProps) {
        if(newProps.errors) {
            this.setState({
                errors: newProps.errors
            })
        }
        if(newProps.unansweredQuestions != this.state.unansweredQuestions){
            this.setState({
                unansweredQuestions : newProps.unansweredQuestions
            })
        }
        if(Object.keys(newProps.answer).length > 0 && newProps.answer.success) {
            this.setState({
                loading: false
            })
        }
        if(newProps.question != this.state.question){
            this.setState({
                question : newProps.question
            },()=>{
                if(this.state.question.options){
                    let allNull = true;
                    for(let i in this.state.question.options){
                        if(this.state.question.options[i].Response != null){
                            allNull = false;
                            this.setState({
                                selectedAnswerDesc: this.state.question.options[i].OptionDescription,
                                valueForQuestionChange : this.state.question.options[i].Response,
                                fetchedQuestionValue : this.state.question.options[i].Response
                            })
                        }
                    }
                    if(allNull === true){
                        this.setState({
                            selectedAnswerDesc: "",
                            valueForQuestionChange : 0,
                            fetchedQuestionValue : 0
                        })
                    }
                }
            })
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.errors.hasOwnProperty('success')) {
            return this.state.errors.success;
        }else{
            return true;
        }
    }

    redirectToProjectEdit=()=>{
        if(this.state.currentProject)
        this.props.history.push( 
            {
                pathname: `questions-bank-project/edit/${this.state.currentProject}`,
                state: {
                  data: this.state.currentProjectName,
                },
            })
            
    }

    handleProjectChange = async (ev) => {
        //console.log(ev.target.value);
        //const domainIndex = 0;
        console.log('Name',ev.target.options[ev.target.selectedIndex].textContent)
        let name = ev.target.options[ev.target.selectedIndex].textContent
        try {
            this.setState({
                currentProject: ev.target.value,
                currentProjectName:name,
                currentDomainIndex: 0,
                currentQuesIndex: 0,
                quizDone: false,
                loading: true,
                show:false,
                validate:""
            }, async function() {     
                await this.getDomains();       
                await this.getDomainQuestions();            
                await this.getQuizData();            
            });
        this.props.handleSelectProject({"currentProject":ev.target.value,"currentProjectName":name});
        }catch(error) {
            this.setState({
                loading: false
            });
            if(error.response) {
                // responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }

    handleDomainClick(e, domainId) {
        e.preventDefault();
        try{
            const domainIndex = _.findIndex(this.props.domains, {DomainID: domainId});
            //console.log(domainIndex);
            this.setState({
                currentQuesIndex: 0,
                currentDomainIndex: domainIndex,
                quizDone: false,
                loading: true
            }, async function() {
                await this.getDomainQuestions();
                await this.getQuizData();
            });
        }catch(error) {
            this.setState({
                loading: false
            });
            if(error.response) {
                // responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }

    handleSelectedOption(answerDesc,valueForQuestionChange) {
        this.setState({selectedAnswerDesc: answerDesc, valueForQuestionChange : valueForQuestionChange});
    }

    async handleNext(selectedOption, backOption,questionId =null,QuestionChange =null,questionData=null ) {


        console.log("Parameters =>" , selectedOption , backOption)

        try{
            this.setState({
                loading: true ,
               
            })
            if(!this.state.quizDone) {
                if(selectedOption != this.state.fetchedQuestionValue){
                    let answerObj = {
                        "project_id": this.state.currentProject,
                        "domain_id": this.props.domains[this.state.currentDomainIndex].DomainID,
                        "question_id": this.props.questions[this.state.currentQuesIndex],
                        "option_id": selectedOption,
                        "SelectedDropDownValue":questionData && questionData.HasDropDown==1 && questionData.DropdownOptions.length?selectedOption:0,
                        "IsDropdownScoringEnabled":questionData && questionData.HasDropDown==1 && questionData.DropdownOptions.length?true:false,
                        "BenchmarkScoringDropdownId":questionData && questionData.HasDropDown==1 && questionData.DropdownOptions.length?questionData.DropdownOptions.filter((item)=>Number(item.OptionValue)==selectedOption).length>0?questionData.DropdownOptions.filter((item)=>Number(item.OptionValue)==selectedOption)[0].OptionId:0:0,
                    }
                    //console.log(answerObj);   
                   await this.props.saveAnswer(answerObj);
                }
                // console.log(this.props.questions);
                //console.log(this.state.currentQuesIndex);
                if(QuestionChange === true && questionId != null){

                     console.log("QuestioChange IF INTER 1=>" ,this.props.questions.indexOf(questionId))
                     console.log("QuestioChange IF INTER 1=>" ,this.state.currentQuesIndex)


                    this.setState({
                        currentQuesIndex: this.props.questions.indexOf(questionId)
                    }, async function() {
                        await this.getQuizData();
                    }); 
                }else if((this.state.currentDomainIndex+1) == this.props.domains.length && !this.props.questions[this.state.currentQuesIndex+1]){

                    console.log("QuestioChange IF INTER 2=>" ,this.props.questions.indexOf(questionId))
                     console.log("QuestioChange IF INTER 2=>" ,this.state.currentQuesIndex)



                    // console.log("inFirst ")
                    // await this.getDomains();
                    this.setState({
                        quizDone: true,
                        loading: false
                    }); 
                }else if(this.props.questions[this.state.currentQuesIndex+1]) {

                    console.log("QuestioChange IF INTER 3=>" ,this.props.questions.indexOf(questionId))
                     console.log("QuestioChange IF INTER 3=>" ,this.state.currentQuesIndex)



                    this.setState({
                        currentQuesIndex: backOption == "back" ? this.state.backSkipStatus ? this.state.currentQuesIndex-2  :  this.state.currentQuesIndex-1  : this.state.currentQuesIndex+1 ,
                        backButton: backOption == "back" ? true : false
                    }, async function() {
                        
                        if(selectedOption != this.state.fetchedQuestionValue){
                            setTimeout(async() => {
                                await this.getQuizData(backOption);
                            }, 2500);
    
                        }else{
                            await this.getQuizData(backOption);
    
                        }            
                    });    
                }else{
                    //console.log(this.props.domains)
                    //console.log( this.state.currentDomainIndex+1 )
                    if(this.props.domains[this.state.currentDomainIndex+1]) {
                        console.log("QuestioChange ELSE INTER 4=>" ,this.props.questions.indexOf(questionId))
                     console.log("QuestioChange IF INTER 4=>" ,this.state.currentQuesIndex)



                        this.setState({
                            currentQuesIndex: 0,
                            currentDomainIndex: this.state.currentDomainIndex+1 
                        }, async function() {                        
                            await this.getDomainQuestions();
                            await this.getQuizData();
                            await this.getDomains();                             
                        });
                    }else{
                        
                        // await this.getDomains();
                        this.setState({
                            quizDone: true,
                            loading: false
                        });                    
                    }
                }
                
            }else{
                const goalRatings = {
                    score_values: selectedOption,
                    project_id: this.state.currentProject
                }
                this.props.saveGoalSetting(goalRatings, this.props.history, this.state.currentProjectName);
                this.setState({
                    loading: false
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

    handleCompleteGoalClick = async(e) => {
        e.preventDefault();
        await this.getDomains();
        this.setState({
            quizDone : true
        })
    }
handleActionChange = (e)=>{

console.log(e.target.value)

    if(e.target.value!==""){
        if(e.target.value === "validate") {
            this.setState({
                ...this.state,validate:e.target.value
            },()=>{
                setTimeout(()=>this.setState({
                    ...this.state,validate:""
                }),500);
            });
        }else if(e.target.value == "EditKPIDashboard") {
            this.setState({...this.state , kpiDahboard: true} ,()=>{
                setTimeout(()=>this.setState({
                    ...this.state,validate:""
                }),500);
            })
        }else if(e.target.value == "QuantitativeQuestions") {
            this.setState({...this.state , quntitveModelStatus: true} ,()=>{
                setTimeout(()=>this.setState({
                    ...this.state,validate:""
                }),500);
            })
        }
    }
}
showDropdown = ()=>{
    this.setState({...this.state,show:!this.state.show})
}
resetValidate = ()=>{
    this.setState({...this.state,validate:""})
}

quntitiveModelShow = () => {
    this.setState({...this.state , quntitveModelStatus: !this.state.quntitveModelStatus})
}



    render() {

            console.log("Benchmrak Question Props ==>", this.props)
            console.log("Benchmrak Question Statesss ==>", this.state)
            console.log("Type", this.userTypeId )


        let projects = this.props.projects.map((project, i) => {
        
                if(this.props.selectedProject.currentProject != project.BenchmarkProjectID)
              return   <option name={project.BenchmarkProjectName} value={project.BenchmarkProjectID} key={'projectOpt-'+project.BenchmarkProjectID}>{project.BenchmarkProjectName}</option>
            
        })
        return (
            [
            <DashboardHeader key="dashboard-header"></DashboardHeader>,
            <div id="wrapper" key="body-wrapper">
                <DashboardSidebar></DashboardSidebar>
                <Loader loading={this.state.loading}/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <ol className="breadcrumb dashbread">
                            <li className="breadcrumb-item active"><Link to="/dashboard">Home</Link></li>
                            <li className="breadcrumb-item active">AmpMarking</li>
                            <li className="breadcrumb-menu d-md-down-none ml-auto">
                                <span className="position-relative helpwrap">
                                    <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                                    <div className="dropdown-menu" aria-labelledby="helpBtn">
                                        <p>Lorem Ipsum Dolor</p>
                                    </div>
                                </span>
                            </li>
                            <li className="breadcrumb-menu d-md-down-none">
                               <img src={ require('./../../common/images/diva-icon.png') } className="logo-img" alt="Logo" />
                                <a className="btn powered p-0" href="#">
                                    <i className="icon-graph"></i> &nbsp;
                                    <i>Powered by Amploglobal</i>
                                </a>
                                
                            </li>
                        </ol>
                        <div className="d-flex ml-5">
                            <div className="container-fluid container-dashboard">
                                <TopComponentWrapper>
                                    <Row className="bench-top-sec mt-4">
                                        <Col md="6">
                                            <Form>
                                                <div className="form-group">
                                                    <Label>Select AmpMarking Project:</Label>
                                                    <div className="d-flex">
                                                        <select className="form-control col-sm-5" onChange={(e) => this.handleProjectChange(e)}>
                                                        {this.props.selectedProject.currentProject && <option value={this.props.selectedProject.currentProject}>{this.props.selectedProject.currentProjectName}</option>}
                                                            { projects }
                                                        </select>
                                                        {Object.keys(this.props.lock).length > 0 && this.props.lock.flag==1 ? <i className="fa fa-lock"></i> : <></>}
                                                    </div>
                                                </div>
                                            </Form>
                                        </Col>
                                        <Col md="3" style={{textAlign:"right",paddingTop:"35px"}}>
                                            {this.state.userTypeId == 1 && <div className="d-flex mt-1 justify-content-center">
                                            <button onClick={()=>{this.redirectToProjectEdit()}} className="btn btn-sm btn-outline-info bg-white text-dark"> EDIT PROJECT</button>
                                            </div>}
                                            </Col>
                                      {  this.state.show===true?<Col md="6">
                                            <Form>
                                                <div className="form-group">
                                                    <Label>Action:</Label>
                                                    <div className="d-flex">
                                                        <select className="form-control col-sm-5"  
                                                        value ={ this.state.validate}onChange={(e) => this.handleActionChange(e)}>
                                                          <option value="" selected>Select Action</option>
                                                          {this.state.actionDropDownList?.map(item => (
                                                           <option value={item.Value}>{item.Text}</option>

                                                          ))}
                                                          
                                                        </select>
                                                        {Object.keys(this.props.lock).length > 0 && this.props.lock.flag==1 ? <i className="fa fa-lock"></i> : <></>}
                                                    </div>
                                                </div>
                                            </Form>
                                        </Col>:""}
                                    </Row>
                                    <DomainProgress projectId={this.state.currentProject} handleCompleteGoalClick={this.handleCompleteGoalClick.bind(this)} resVal = {this.state.responseVal} question={this.props.question} lock={this.props.lock} domains={this.props.domains} domainIndex={this.state.currentDomainIndex} quizDone={this.state.quizDone} handleDomainClick={this.handleDomainClick.bind(this)} />
                                </TopComponentWrapper>
                                <QuestionsBankWrapper>
                                    <QuestionsAddDomain
                                    projectId={this.state.currentProject}
                                    Domains={this.props.domains}
                                     />
                                </QuestionsBankWrapper>
                                <Quiz resetValidate={this.props.resetValidate} show={this.showDropdown} validate={this.state.validate} items={this.props.items} lock={this.props.lock} question={this.props.question} onNext={this.handleNext.bind(this)} currentQuesIndex={this.state.currentQuesIndex} totalDomainQuestions={this.props.questions.length} domains={this.props.domains} domain={this.props.domains[this.state.currentDomainIndex]} quizDone={this.state.quizDone} projId={this.state.currentProject} projName={this.state.currentProjectName} handleSelectedOption={this.handleSelectedOption.bind(this)} backButton={this.state.backButton} number={this.state.currentQuesitonNum} />
                            </div>
                            <QuestionaireAside selectedAnswerDesc={this.state.selectedAnswerDesc} unansweredQuestions={this.state.unansweredQuestions} handleNext={this.handleNext.bind(this)} valueForQuestionChange={this.state.valueForQuestionChange} currentQuestion={this.props.questions[this.state.currentQuesIndex]} 
                              projectId ={this.state.currentProject}
                            />
                        </div>
                    </div>
                </div>
                <div>
                <Modal
                    scrollable
                    dialogClassName="modelWidth"
                    centered
                show={this.state.kpiDahboard}
                onHide={() => this.setState({kpiDahboard: false})}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg"></Modal.Title>
            <Modal.Title id="example-custom-modal-styling-title">
            
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="container-fluid">
            <KPIReportsBodyAdd projectId={this.state.currentProject} onHide={() =>  this.setState({  kpiDahboard: false})} name={this.state.currentProjectName
            } />

        </div>
            </Modal.Body>
            
            </Modal>

            </div>
                   </div>,
              <FooterComponent key="dashboard-footer"></FooterComponent> ,
              <div className="container mt-5">

                 {/* { this.state.currentProject && <KPIReportsBodyAdd projectId={this.state.currentProject} />} */}
              </div>,


                // MODEL FOR QUNTITIVE VALUE *******
                <QuntitveQustoinModel projectId={this.state.currentProject} projectName={this.state.currentProjectName} status={this.state.quntitveModelStatus} quntitiveModelShow={this.quntitiveModelShow} />

            ]
        )
    }
}

Questionaire.propTypes = {
    fetchBenchmarkProjects: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    fetchBenchmarkDomains: PropTypes.func.isRequired,
    domains: PropTypes.array.isRequired,
    fetchDomainQuestions: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    fetchQuestion: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired,
    saveAnswer: PropTypes.func.isRequired,
    answer: PropTypes.object.isRequired,
    saveGoalSetting: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    getLock: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    projects: state.questionaire.projects,
    domains: state.questionaire.domains,
    questions: state.questionaire.questions,
    question: state.questionaire.question,
    unansweredQuestions : state.questionaire.unansweredQuestions,
    answer: state.questionaire.answer,
    errors: state.errors,
    lock: state.iot.item,
    items: state.capability.items,
    selectedProject:state.questionaire.selectedProject
});
export default connect(mapStateToProps, {handleSelectProject, fetchProjects,fetchBenchmarkProjects, fetchBenchmarkDomains, fetchDomainQuestions, fetchQuestion, saveAnswer, saveGoalSetting, getLock ,getUnAnsweredQuestions })(Questionaire);