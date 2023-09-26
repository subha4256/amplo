import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import axios from 'axios';
import { Label, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import Permissions from './Permissions';
import { BenchmarkManageAccess } from '../Styling/ManageAccess';
import DashboardHeader from "../../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../../includes/dashboardFooter/FooterComponent';
import SidebarJs from '../../../common/js/sidebarAnimation';
import { fetchBenchmarkProjects, fetchBenchmarkDomains, fetchBenchmarkUsers, savePermissions } from '../../../actions/domainAccessActions';
import { getClientQuestionsBank, assignQuestionsBankToAmpMarkingProject } from '../../../actions/benchmarkingActions'
import Loader  from '../../Loader';
import CacheStorage from '../../../utils/CacheStorage';
import { Global } from '../../../utils/Env';
const config = require('../../../config');

//.. Reviewed by Ashim: LoadApi to be implemented

class ManageAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            permissions: [],
            currentProject: "",
            currentUser: "",
            errors: {},
            currentQuestionBank : {}
        }
        this.sidebarAnimation=new SidebarJs();
        Global.callback.assignQuestionsBankToAmpMarkingProject_onComplete = async () => {
            let projects = await axios.get(config.laravelBaseUrl+'get_benchmarking_projects', {
                headers: {
                    "authorization": "Bearer " + CacheStorage.getItem("userToken")
                }
            });
            this.props.fetchBenchmarkProjects(projects);

            let ind = projects.data.data.map((proj)=>proj.BMProjectID).indexOf(this.state.currentProject);
            if(Number(projects.data.data[ind].QuestionBankId) > 0){
                this.setState({
                    currentQuestionBank : {
                        QuestionBankId : projects.data.data[ind].QuestionBankId,
                        QuestionBankName : projects.data.data[ind].QuestionBankName,
                        fetchedQB : true
                    }
                })
            }else{
                this.setState({
                    currentQuestionBank : {}
                })
            }

            let dObj = {
                project_id: this.state.currentProject
            }
            
            let users = await axios.get(config.laravelBaseUrl+'get_benchmarking_project_users/'+dObj.project_id, {
                headers: {
                    "authorization": "Bearer " + CacheStorage.getItem("userToken")
                }
            });
            this.props.fetchBenchmarkUsers(users);
            this.setState({
                currentUser: users.data.data[0].UserID
            }, async function() {
                let domains = await axios.get(config.laravelBaseUrl+'get_benchmarking_domain_access/'+dObj.project_id+'/'+this.state.currentUser, {
                    headers: {
                        "authorization": "Bearer " + CacheStorage.getItem("userToken")
                    }
                });
                this.props.fetchBenchmarkDomains(domains); 
              
            })
        } 
    }

    componentWillMount() {
        this.initComponent();
    }

    async initComponent() {
        let projects = await axios.get(config.laravelBaseUrl+'get_benchmarking_projects', {
            headers: {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
        });
        if(Number(projects.data.data[0].QuestionBankId) > 0){
            this.setState({
                currentQuestionBank : {
                    QuestionBankId : projects.data.data[0].QuestionBankId,
                    QuestionBankName : projects.data.data[0].QuestionBankName,
                    fetchedQB : true
                }
            })
        }else{
            this.setState({
                currentQuestionBank : {}
            })
        }
        this.props.fetchBenchmarkProjects(projects);
        if(this.props.projects.length > 0) {
            this.setState({
                currentProject: this.props.projects[0].BMProjectID
            }, async function() {
                let dObj = {
                    project_id: this.state.currentProject
                }
                
                let users = await axios.get(config.laravelBaseUrl+'get_benchmarking_project_users/'+dObj.project_id, {
                    headers: {
                        "authorization": "Bearer " + CacheStorage.getItem("userToken")
                    }
                });
                this.props.fetchBenchmarkUsers(users);
                this.setState({
                    currentUser: this.props.users[0].UserID
                }, async function() {
                    let domains = await axios.get(config.laravelBaseUrl+'get_benchmarking_domain_access/'+dObj.project_id+'/'+this.state.currentUser, {
                        headers: {
                            "authorization": "Bearer " + CacheStorage.getItem("userToken")
                        }
                    });
                    this.props.fetchBenchmarkDomains(domains);
                })
            })        
        }
        this.setState({
            loading: false
        })
    }

    handleCancel(e) {
        e.preventDefault();
        this.setState({
            loading: true
        })
        this.initComponent();
    }

    componentDidMount() {
        this.sidebarAnimation.toggle();
        this.props.getClientQuestionsBank(1);
        
    }

    componentWillReceiveProps(newProps) {
        // console.log('the props',newProps);
        if(newProps.domains.length>0){
            this.setState({...this.state,permissions:newProps.domains})
        }
        if(newProps.errors) {
            this.setState({
                errors: newProps.errors
            })
        }
    }

    async handleProjectChange(e) {
        this.setState({
            currentProject: e.target.value,
            loading: true
        }, async function() {
            let ind = this.props.projects.map((proj)=>proj.BMProjectID).indexOf(this.state.currentProject);
            if(Number(this.props.projects[ind].QuestionBankId) > 0){
                this.setState({
                    currentQuestionBank : {
                        QuestionBankId : this.props.projects[ind].QuestionBankId,
                        QuestionBankName : this.props.projects[ind].QuestionBankName,
                        fetchedQB : true
                    }
                })
            }else{
                this.setState({
                    currentQuestionBank : {}
                })
            }
            
            let dObj = {
                project_id: this.state.currentProject
            }
            let domains = await axios.get(config.laravelBaseUrl+'get_benchmarking_domain_access/'+dObj.project_id+'/'+this.state.currentUser, {
                headers: {
                    "authorization": "Bearer " + CacheStorage.getItem("userToken")
                }
            });
            this.props.fetchBenchmarkDomains(domains);
            this.setState({
                loading: false
            })
        })
    }

    async handleUserChange(e) {
        this.setState({
            currentUser: e.target.value,
            loading: true
        }, async function(){
            let domains = await axios.get(config.laravelBaseUrl+'get_benchmarking_domain_access/'+this.state.currentProject+'/'+this.state.currentUser, {
                headers: {
                    "authorization": "Bearer " + CacheStorage.getItem("userToken")
                }
            });
            this.props.fetchBenchmarkDomains(domains);
            this.setState({
                loading: false
            })
        });
    }

    handlePermissionChange(domainId, permission) {
        const permissions = this.state.permissions;
        let domainIndex = _.findIndex(permissions, {DomainID: domainId});
        if(domainIndex === -1) {
            permissions.push({
                DomainID: domainId,
                AccessType: permission
            });
        }else{
            permissions[domainIndex].AccessType = permission;
        }
        this.setState({
            permissions: permissions
        })
    }

    handleSavePermissions() {
        let permissionObj = {
            BenchmarkProjectID: this.state.currentProject,
            UserID: this.state.currentUser,
            domains: this.state.permissions
        }
        this.props.savePermissions(permissionObj);
    }

    QuestionBankChangehandler = (qb) => {
        console.log(qb)
        this.setState({
            currentQuestionBank:qb
        },()=>{
            console.log(this.state.currentQuestionBank)
        })
    }

    render() {
        console.log(this.props.projects)
        const benchmarkProjects = this.props.projects.map(project => {
            return (
                <option key={project.BMProjectID} value={project.BMProjectID}>{project.BMProjectName}</option>
            )
        })
        const benchmarkUsers = this.props.users.map(user => {
            return (
                <option key={user.UserID} value={user.UserID}>{user.UserName}</option>
            )
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
                            <li className="breadcrumb-item">Manage</li>
                            <li className="breadcrumb-item active">Reports & Analytics</li>
                            <li className="breadcrumb-menu d-md-down-none ml-auto">
                               <img src={ require('../../../common/images/diva-icon.png') } className="logo-img" alt="Logo" />
                                <a className="btn powered p-0" href="#">
                                    <i className="icon-graph"></i> &nbsp;
                                    <i>Powered by Amploglobal</i>
                                </a>
                                
                            </li>
                        </ol>
                        <div className="container-fluid container-dashboard">
                            <BenchmarkManageAccess className="user-content">
                                <h1 className="heading">AmpMarking - Manage Access</h1>
                                <Card className="manage-access-section">
                                    <CardHeader>
                                        Manage User Access for AmpMarking Projects
                                    </CardHeader>
                                    <CardBody>
                                        <div className="user-form-section col-sm-12 col-md-12 col-lg-10 p-0">
                                            <Row className="form-group">
                                                <Col sm="12" md="6" lg="6" className="mb-1">
                                                    <Label>AmpMarking Project Name <span className="text-danger">*</span></Label>
                                                    <select className="form-control" onChange={this.handleProjectChange.bind(this)}>
                                                        {benchmarkProjects}
                                                    </select>
                                                </Col>
                                                <Col sm="12" md="6" lg="6">
                                                    <div className="col-sm-12 col-md-6">
                                                        <label>Questions Bank <span className="text-danger">*</span></label>
                                                        <div className="dropdown copydropdown">
                                                        {this.state.currentQuestionBank.hasOwnProperty("fetchedQB") && this.state.currentQuestionBank.fetchedQB?<div style={{height:"100%", width:"425px", background:"#00000038", zIndex:"999" , position:"absolute"}}></div>:""}
                                                            <div className="dropfield dropleft">
                                                                {this.state.currentQuestionBank.hasOwnProperty("QuestionBankName")?<span><i className="fas fa-times" onClick={()=>this.setState({currentQuestionBank:{}})}></i> {this.state.currentQuestionBank.QuestionBankName}</span>:""}
                                                                <a href="#" className="dropdown-toggle float-right" data-toggle="dropdown"><i className="fas fa-bars"></i></a>
                                                                <div className="dropdown-menu pt-0">
                                                                    <div className="form-group border-bottom mb-2">
                                                                    </div>
                                                                    <div className="disabled-date">
                                                                    <span>Question Bank Name</span> <span>Type</span>
                                                                    </div>
                                                                    <div className="drop-height">
                                                                        {this.props.questionBanks.map((qb)=>{
                                                                            return(
                                                                                <div className="custom-control custom-radio ml-2 mb-2" key={"questionBank_"+qb.QuestionBankId}>
                                                                                    <input type="radio" className="custom-control-input" name="list" id={"questionBank_"+qb.QuestionBankId} 
                                                                                    onChange={()=>this.QuestionBankChangehandler(qb)}
                                                                                    checked={this.state.currentQuestionBank.hasOwnProperty("QuestionBankId")?this.state.currentQuestionBank.QuestionBankId == qb.QuestionBankId ? true : false : false}/>
                                                                                    <label className="custom-control-label" htmlFor={"questionBank_"+qb.QuestionBankId}>{qb.QuestionBankName}</label>
                                                                                    <div className="d-date">{qb.IsAmploAssigned == 1?"Amplo Assigned":qb.Assignment}</div>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="form-group row-btn mt-4">
                                                <Col sm="6">
                                                    <Button disabled={this.state.currentProject && this.state.currentQuestionBank.hasOwnProperty('QuestionBankId')?this.state.currentQuestionBank.fetchedQB?true:false:true} color="primary" className="mr-3" onClick={()=>this.props.assignQuestionsBankToAmpMarkingProject({
                                                        ProjectId:this.state.currentProject,
                                                        QuestionBankId : this.state.currentQuestionBank.QuestionBankId
                                                    })}>SAVE</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <p className="card-text">Assign Domain access to Users for the respective AmpMarking projects. By default
                                        read/write access will be provided to all domains for the respective AmpMarking projects.</p>
                                        <div className="user-form-section col-sm-12 col-md-12 col-lg-10 p-0">
                                            {this.state.currentQuestionBank.hasOwnProperty("fetchedQB") && this.state.currentQuestionBank.fetchedQB?"":<div style={{height:"105%", width:"105%",top:"-15px", left:"-15px", background:"#00000038", zIndex:"999" , position:"absolute"}}></div>}
                                            <Row className="form-group">
                                                {/* <Col sm="12" md="6" lg="6" className="mb-1">
                                                    <Label>AmpMarking Project Name <span className="text-danger">*</span></Label>
                                                    <select className="form-control" onChange={this.handleProjectChange.bind(this)}>
                                                        {benchmarkProjects}
                                                    </select>
                                                </Col> */}
                                                <Col sm="12" md="6" lg="6">
                                                    <Label>All Users <span className="text-danger">*</span></Label>
                                                    <select className="form-control" onChange={this.handleUserChange.bind(this)}>
                                                        {benchmarkUsers}
                                                    </select>
                                                </Col>
                                            </Row>
                                            <Permissions domains={this.props.domains} handlePermissionChange={this.handlePermissionChange.bind(this)} currentUser={this.state.currentUser} />
                                            <Row className="form-group row-btn mt-4">
                                                <Col sm="6">
                                                    <Button color="primary" className="mr-3" onClick={this.handleSavePermissions.bind(this)}>SAVE</Button>
                                                    <a href="#" onClick={(e) => this.handleCancel(e)}>Cancel</a>
                                                </Col>
                                            </Row>
                                        </div>
                                    </CardBody>
                                </Card>
                            </BenchmarkManageAccess>
                        </div>
                    </div>
                </div>
            </div>,
            <FooterComponent key="dashboard-footer"></FooterComponent>
            ]
        )
    }
}

ManageAccess.propTypes = {
    errors: PropTypes.object.isRequired,
    fetchBenchmarkProjects: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    fetchBenchmarkDomains: PropTypes.func.isRequired,
    domains: PropTypes.array.isRequired,
    fetchBenchmarkUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    savePermissions: PropTypes.func
}

const mapStateToProps = state => ({
    projects: state.domainAccess.projects,
    domains: state.domainAccess.domains,
    users: state.domainAccess.users,
    questionBanks : state.benchmarkingData.ClientQuestionsBank,
    errors: state.errors
});
export default connect(mapStateToProps, { fetchBenchmarkProjects, fetchBenchmarkDomains, fetchBenchmarkUsers, savePermissions, getClientQuestionsBank, assignQuestionsBankToAmpMarkingProject })(ManageAccess);