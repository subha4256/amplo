import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import { GettingStartedWrapper } from './Styling/Gettingstarted';
import { fetchIndustryData, fetchRegions, fetchCountries, fetchInitialStates, fetchStates, fetchInitialCities, fetchCities, fetchQuestions, updateCompanyProfile, fetchCompanyProfile } from '../../actions/companyActions';
import SidebarJs from '../../common/js/sidebarAnimation';
import _ from 'underscore';
import CacheStorage from '../../utils/CacheStorage';
const config = require('../../config');

//.. Reviewed by Ashim: Need to implement LoadAPI > action-creator

class GettingStarted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoLink: ""
        }
        this.sidebarAnimation=new SidebarJs();
    }

    async getVideo() {
        
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken")
        }
        await axios.get(config.laravelBaseUrl+'getting-started-video', {
            headers: headers
        })
        .then(res => {
            const data = res.data.data;
            console.log(data[0].GettingStartedVideosDate);
            this.setState({
                'videoLink': data[0].GettingStartedVideosURLPath
            })
        }); 
    }

    componentDidMount() {
        this.sidebarAnimation.toggle();
        this.getVideo();
    }

    
    render() {
        return (
            [
            <DashboardHeader key="dashboard-header"></DashboardHeader>,
            <div id="wrapper" key="body-wrapper">
                <DashboardSidebar></DashboardSidebar>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <ol class="breadcrumb dashbread" style={{marginBottom:1+'em'}}>
                            <li class="breadcrumb-item active">Getting Started</li>
                            <li class="breadcrumb-menu d-md-down-none ml-auto">
                                 {/* {<img src={require('./../../../common/images/diva-icon.png')} className="logo-img" alt="Logo" />} */}
                                    <a className="btn powered p-0" href="#">
                                        <i className="icon-graph"></i> &nbsp;
                                    <i>Powered by Amploglobal</i>
                                    </a>
                            </li>
                        </ol>
                        
                        <div className="container-fluid container-dashboard">
                            
                        <div className="user-content">
                            <GettingStartedWrapper>
                            <Row>
                                <Col sm="12">
                                    <div className="getting-started-sec">
                                        <div className="bg-white maping-sec mb-3">
                                        <Row>
                                            <Col sm="12" md="6" lg="4">
                                                <h1>Features</h1>
                                                <h2>Mapping Your Transformation <br/> Journey</h2>
                                                <p>Create Projects, assess & customize processes, decompose problem and set up Business Outcome.
                                                </p>
                                                <ul className="nav nav-tabs flex-column" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" data-toggle="tab" href="#home"><i className="fas fa-compass" style
                                                    ={{marginRight:5 + "px"}}></i>
                                                    <span>Using AmploFly 4.0 Platform</span>
                                                    <p className="mt-2">Everything you need to start getting users to the AmploFly 4.0 platform</p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="tab" href="#menu1"><i className="fas fa-landmark" style
                                                    ={{marginRight:5 + "px"}}></i>
                                                    <span>Company Profile</span>
                                                    <p className="mt-2">Everything you need to start getting users to the AmploFly 4.0 platform</p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" data-toggle="tab" href="#menu2"><i className="fas fa-laptop"></i> <span>User
                                                    Setup & Management</span>
                                                    <p className="mt-2">Everything you need to start getting users to the AmploFly 4.0 platform</p>
                                                    </a>
                                                </li>
                                                </ul>
                                            </Col>
                                        
                                            <Col sm="12" md="6" lg="8">
                                                <div className="tab-content">
                                                <div id="home" className="tab-pane active"><br/>
                                                <iframe width="100%" height="400" src="https://www.youtube.com/embed/NPDLSEWXPhU?modestbranding=1&autohide=1&showinfo=0"
                                                frameborder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
                                                </div>
                                                <div id="menu1" className="tab-pane fade"><br/>
                                                {/* <iframe width="100%" height="400" src={this.state.videoLink}
                                                frameborder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe> */}
                                                 <iframe width="100%" height="400" src="https://www.youtube.com/embed/NPDLSEWXPhU?modestbranding=1&autohide=1&showinfo=0"
                                                frameborder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
                                                </div>
                                                <div id="menu2" className="tab-pane fade"><br/>
                                                <iframe width="100%" height="400" src="https://www.youtube.com/embed/NPDLSEWXPhU?modestbranding=1&autohide=1&showinfo=0"
                                                frameborder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowfullscreen></iframe>
                                                </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="engage-user-sec mb-5">
                                        <div className="row text-center engage-user-head">
                                            <h2 className="w-100 mb-2">Engage Users</h2>
                                            <h3 className="w-100 mb-2">Understanding the Modules</h3>
                                            <p className="w-100">Early stage in the process? Easy set up of Modules</p>
                                        </div>
                                        <div className="row mt-3 engage-row">
                                        <div className="col-sm-12 col-md-6 col-lg-4 mb-2">
                                            <div className="bg-white">
                                            <img src={require('../../common/images/list-img.png')} alt=""/>
                                            <h3 className="mt-4"><i>Amp</i>Marking</h3>
                                            <p>Start creating your documents</p>
                                            <Link to="/benchmark-questionaire" className="btn btn-info mt-3">Learn</Link>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 col-lg-4 mb-2">
                                            <div className="bg-white">
                                            <img src={require('../../common/images/list-img.png')} alt=""/>
                                            <h3 className="mt-4">Capability Modeling</h3>
                                            <p>Start creating your documents</p>
                                            <Link to="/capability" className="btn btn-info mt-3">Learn</Link>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-6 col-lg-4 mb-2">
                                            <div className="bg-white">
                                            <img src={require('../../common/images/list-img.png')} alt=""/>
                                            <h3 className="mt-4">Performance Measuring</h3>
                                            <p>Start creating your documents</p>
                                            <Link to="/kpi-setting" className="btn btn-info mt-3">Learn</Link>
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                    
                                    </div>
                                </Col>
                            </Row>
                            </GettingStartedWrapper>
                        </div>
                                
                        </div>
                    </div>
                </div>
            </div>,
            <FooterComponent key="dashboard-footer"></FooterComponent>
            ]
        )
    }
}




export default GettingStarted;