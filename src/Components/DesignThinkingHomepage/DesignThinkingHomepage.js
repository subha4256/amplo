import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from "../includes/dashboardFooter/FooterComponent";
import AsideComponent from "../includes/asideComponent/AsideComponent";
import { DesignThinkingHomepageWrapper } from './Styling/DesignThinkingHomepage';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchDesignThinkingProjects , fetchDesignThinkingProjectsCreatePermission } from '../../actions/DesignThinkingHomepageActions';
import DesignThinkingEpicNoiModal from '../DesignThinkingEpicScreen/DesignThinkingEpicNoiModal';
import DesignThinkingHomepageProjects from './DesignThinkingHomepageProjects';

const config = require('../../config');

class DesignThinkingHomepage extends Component{

    componentDidMount(){
        // let [projects, permission] = await axios.all([axios.get(config.laravelBaseUrl + "getDesignThinkingProject",{
        //     headers: {
        //         "authorization": "Bearer " + sessionStorage.getItem("userToken")
        //     }
        // }),axios.get(config.laravelBaseUrl + "getDtProjectCreatePermission",{
        //     headers: {
        //         "authorization": "Bearer " + sessionStorage.getItem("userToken")
        //     }
        // })
        // ]);
        this.props.fetchDesignThinkingProjects();
        this.props.fetchDesignThinkingProjectsCreatePermission();
    }

    render(){
        return(
            <>
                <DashboardHeader />
                <DesignThinkingHomepageWrapper id="wrapper">
                    <DashboardSidebar />
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* <!-- Main Content --> */}
                        <div id="content">
                        {/* <!-- Breadcrumb --> */}
                        <ol className="breadcrumb dashbread">
                            <li className="breadcrumb-item active">Design Led Materiality</li>
                            <li className="breadcrumb-menu d-md-down-none ml-auto">
                                <span className="position-relative helpwrap">
                                    <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                                    <div className="dropdown-menu" aria-labelledby="helpBtn">
                                        <p>Lorem Ipsum Dolor</p>
                                    </div>
                                </span>
                            </li>
                            <li className="breadcrumb-menu d-md-down-none">
                                <img src={ require('../../common/images/diva-icon.png') } className="logo-img" alt="Logo" />
                                <a className="btn powered p-0" href="#">&nbsp;<i>Powered by Amploglobal</i></a>
                            </li>
                        </ol>
                        {/* <!-- End Breadcrumb --> */}
                        {/* <!-- Begin Page Content --> */}
                        <div className="container-fluid container-dashboard">
                            <div className="user-content">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="design-thinking mt-3">
                                            <div className="design-user-sec mb-5">
                                                <div className="row text-left d-md-flex justify-content-between">
                                                    <h2 className="mb-2 text-left">Design Led Materiality Projects</h2>
                                                    {(this.props.createProjectPermission === "1")?<NavLink to="/manage-dtprojects" className="btn btn-new">CREATE NEW PROJECT</NavLink>:''}
                                                </div>
                                                <DesignThinkingHomepageProjects
                                                    projects = {this.props.designThinkingProjects}
                                                />
                                                <div className="row text-left pt-3">
                                                    <h2 className="w-100 mb-2 text-left">More to Discover</h2>
                                                </div>
                                                <div className="row mt-3 engage-row">
                                                    <div className="col-sm-12 col-md-6 col-lg-4 mb-2">
                                                        <div className="bg-white">
                                                            <div className="descover-img">
                                                                <img src={ require('../../common/images/list-img.png') } alt="" />
                                                            </div>
                                                            <h3 className="mt-4">Network of Influences</h3>
                                                            <p>Start creating your documents</p>
                                                            <a href="#" className="btn btn-info mt-3" data-toggle="modal" data-target="#noiModal">View</a>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-6 col-lg-4 mb-2">
                                                        <div className="bg-white">
                                                            <div className="descover-img">
                                                                <img src={ require('../../common/images/personas.jpg') } alt="" />
                                                            </div>
                                                            <h3 className="mt-4">Personas</h3>
                                                            <p>Start creating your documents</p>
                                                            <a href="#" className="btn btn-info mt-3">View</a>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-6 col-lg-4 mb-2">
                                                        <div className="bg-white">
                                                            <div className="descover-img">
                                                                <img src={ require('../../common/images/maps.jpg') } alt="" />
                                                            </div>
                                                            <h3 className="mt-4">Customer Journey Maps</h3>
                                                            <p>Start creating your documents</p>
                                                            <a href="#" className="btn btn-info mt-3">View</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- /End container-fluid --> */}
                        </div>
                        {/* <!-- End of Main Content --> */}
                    </div>
                    {/* <!-- End of Content Wrapper --> */}
                    </div> 
                </DesignThinkingHomepageWrapper>
               
                <AsideComponent />
                <FooterComponent />
            </>
        );        
    }
}

const mapStateToProps = state => ({
    designThinkingProjects : state.designThinkingHomeProjects.projects?state.designThinkingHomeProjects.projects:[],
    createProjectPermission : state.designThinkingHomeProjects.permission
})

export default connect(mapStateToProps,{fetchDesignThinkingProjects,fetchDesignThinkingProjectsCreatePermission})(DesignThinkingHomepage);