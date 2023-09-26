import React from "react";
import "./dashboardStyling.js";
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import DashboardBox from "./subComponent/dashboardBox/DashboardBox";
import NewsSection from "./subComponent/newsSection/NewsSection";
import AnnouncementSection from "./subComponent/announcementSection/AnnouncementSection";
import PopularResources from "./subComponent/popularResources/PopularResources";
import ScrippsStrategicGoals from "./subComponent/scrippsStrategicGoals/scrippsStrategicGoals";
import Webinar from "./subComponent/webinar/Webinar";
import TodoList from "./subComponent/todoList/TodoList";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import AsideComponent from '../includes/asideComponent/AsideComponent';
import SidebarJs from '../../common/js/sidebarAnimation';
import { connect } from "react-redux";
import { fetchDashboardData, fetchAMPercentagevalue, fetchCMPercentageValue } from "../../actions/dashboardDataActions"
import { fetchBenchmarkProjects } from '../../actions/questionaireActions';
import { fetchProjects } from '../../actions/capabilityActions';

import axios from 'axios';
import {errorAlert,responseMessage} from '../../utils/alert';
import CacheStorage from '../../utils/CacheStorage';

const config = require('../../config');

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.sidebarAnimation=new SidebarJs();
    this.state = {
      projects: []
    }
    
  }
  async componentDidMount(){
    this.sidebarAnimation.toggle();
    this.props.fetchDashboardData();
    this.props.fetchAMPercentagevalue(0);
    this.props.fetchCMPercentageValue(0);
    try{
        this.props.fetchProjects();
        let projects = await axios.get(config.laravelBaseUrl+'get_user_bm_projects', {
            headers: {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
        });
        this.props.fetchBenchmarkProjects(projects);
        if(this.props.projects.length > 0) {
            this.setState({
                currentProject: this.props.projects[0].BenchmarkProjectID,
                loading: false
            });
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
  }
  getAMPercentage = (projectId) => {
    this.props.fetchAMPercentagevalue(projectId);
  }

  getCMPercentage = (projectId) => {
    this.props.fetchCMPercentageValue(projectId);
  }
  render() {
    return [
      <DashboardHeader key="header"></DashboardHeader>,
      <div id="wrapper" key="body-wrapper">
        <DashboardSidebar></DashboardSidebar> 
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <ol className="breadcrumb dashbread">
              <li className="breadcrumb-item active"></li>
              <li className="breadcrumb-menu d-md-down-none ml-auto">
                  <span className="position-relative helpwrap">
                      <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                      <div className="dropdown-menu" aria-labelledby="helpBtn">
                          <p>Lorem Ipsum Dolor</p>
                      </div>
                  </span>
              </li>
              <li className="breadcrumb-menu d-md-down-none">
              {<img src={ require('./../../common/images/diva-icon.png') } className="logo-img" alt="Logo" /> }
                  <a className="btn powered p-0" href="#">
                    <i className="icon-graph"></i> &nbsp;
                    <i>Powered by Amploglobal</i>
                  </a>
               
              </li>
            </ol>
            <div className="container-fluid container-dashboard mt-3">
              
                <DashboardBox 
                  getAMPercentage={(projectId) => this.getAMPercentage(projectId)}
                  AMPercentageValue={this.props.AMPercentageValue}
                  getCMPercentage={(projectId) => this.getCMPercentage(projectId)}
                  CMPercentageValue={this.props.CMPercentageValue}
                  AMdata= {this.props.projects}
                  CMdata={this.props.items}
                  highlight={this.props.dashboardItems?this.props.dashboardItems.dashBoardHighlight:null}></DashboardBox>
              
              <div className="row pb-3">
                <div className="col-sm-6 col-lg-6">
                  <NewsSection newsResource={this.props.dashboardItems?this.props.dashboardItems.industryNews:null}></NewsSection>
                  <AnnouncementSection announcements={this.props.dashboardItems?this.props.dashboardItems.announcements:null}></AnnouncementSection>
                  <PopularResources resources={this.props.dashboardItems?this.props.dashboardItems.popularResources:null}></PopularResources>
                  {/* <ScrippsStrategicGoals></ScrippsStrategicGoals> */}
                </div>
                <Webinar webinars={this.props.dashboardItems?this.props.dashboardItems.webinars:null}></Webinar>
                <TodoList todoList={this.props.dashboardItems?this.props.dashboardItems.todo:null} events={this.props.dashboardItems?this.props.dashboardItems.event:null}></TodoList>
              </div>
            </div>
          </div>
        </div>
        </div>
      ,
      
      <FooterComponent key="footer"></FooterComponent>
    ];
  }
}
const mapStateToProps = state => ({
  dashboardItems: state.dashboardData.items,
  projects: state.questionaire.projects,
  domains: state.questionaire.domains,
  items: state.capability.items,
  AMPercentageValue: state.dashboardData.amPercentageVal,
  CMPercentageValue: state.dashboardData.cmPercentageVal,
});



export default connect(
  mapStateToProps,
  { fetchBenchmarkProjects,fetchDashboardData, fetchProjects, fetchAMPercentagevalue, fetchCMPercentageValue }
)(Dashboard);
