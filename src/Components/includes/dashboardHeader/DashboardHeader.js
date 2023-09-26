import React from "react";
import {Link, withRouter} from 'react-router-dom';
import login_image from "../../../common/images/login_image.png";
import {DashboardHeaderNav} from "./dashboarHeaderStyling";
import { connect } from "react-redux";
import { fetchMenu } from "../../../actions/menuActions";
import { allSettled } from "q";
import CacheStorage from '../../../utils/CacheStorage';
import axios from 'axios';
import moment from 'moment';

const config = require('../../../config');


//.. Reviewed by Ashim: Need to refactor Storage access and fetch menu calls

class DashboardHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      activeClass:'active'
    }
  }
  
  componentDidMount(){
      const { fetchMenu }=this.props

      var pagename =  this.props.match.path;
      
      if(pagename ==='/dashboard'){
        if(CacheStorage.getItem('menutext')=='dashboard'){
          fetchMenu({id:1});
        }else if(CacheStorage.getItem('menutext')=='manage'){
          fetchMenu({id:2});
        }else{
          CacheStorage.setItem('menutext', 'dashboard' );
          fetchMenu({id:1});
        }
      }else if(pagename ==='/admin-dashboard'){
        if(CacheStorage.getItem('menutext')=='admin-dashboard'){
          fetchMenu({id:1});
        }else if(CacheStorage.getItem('menutext')=='manage'){
          fetchMenu({id:2});
        }else{
          CacheStorage.setItem('menutext', 'admin-dashboard' );
          fetchMenu({id:1});
        }
      }else{
       if(CacheStorage.getItem('userType') === "1") {
          if(CacheStorage.getItem('menutext')=='dashboard'){
          
            fetchMenu({id:1});
          }else if(CacheStorage.getItem('menutext')=='manage'){ 
            
            fetchMenu({id:2});
          }
        }else {
          fetchMenu({id:1});
        }
      }
      setInterval(()=>{
        let diff = moment().diff(moment(CacheStorage.getItem("loginTime")));
        let duration = moment.duration(diff);
        let days = duration.days();
        let hours = duration.hours();
        let minutes = duration.minutes();
        let seconds = duration.seconds();
        this.setState({elapsedTime : hours+"h :"+minutes+"m :"+seconds+"s"});
      },1000)
  }
  handlerChange = (menuItem) =>{
    
    if(menuItem=='dashboard'){
      this.props.fetchMenu({id:1}); 
      CacheStorage.setItem('menutext', 'dashboard' );
    }
    if(menuItem=='admin-dashboard'){
      this.props.fetchMenu({id:1}); 
      CacheStorage.setItem('menutext', 'admin-dashboard' );
    }
    if(menuItem=='manage'){
      this.props.fetchMenu({id:2});
      CacheStorage.setItem('menutext', 'manage' );
    }
  }
  handleLogout() {
    axios.post(config.laravelBaseUrl+"saveUserActivity",{ActivityDate:moment().format("YYYY-MM-DD HH:mm:ss"),TimeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,Activity:"Logout"},{
      headers : {
        Authorization : "Bearer "+CacheStorage.getItem("userToken")
      }
    }).then(res=>{
      CacheStorage.removeItem("userToken");
      CacheStorage.removeItem("userType");
      CacheStorage.clearAll(); // added for clearing all
      this.props.history.push("/login");
    }).catch(err=>{
      CacheStorage.removeItem("userToken");
      CacheStorage.removeItem("userType");
      CacheStorage.clearAll(); // added for clearing all
      this.props.history.push("/login");
    })
  }
  render() {
    
    
    return (
      <DashboardHeaderNav>

        <nav className="navbar navbar-expand navbar-light bg-white topbar fixed-top">
          <div className="sidebar-brand-text">
            <a className="navbar-brand DIVA" href="https://amploglobal.com/" target="
            -blank"><img className="diva-logo" src={ require('../../../common/images/amplofly-logo.png') }
                      alt="AmploFly 4.0" /></a>
          </div>
          {
            CacheStorage.getItem("userToken") ? (
              <>
              <button id="sidebarToggleTop" className="btn btn-link rounded-circle mr-3">
              <i className="fa fa-bars"></i>
              </button>
            <ul className="nav navbar-nav d-md-down-none navbar-nav-top-left">
            <li className="nav-item">
                <Link className="nav-link" to={`/${CacheStorage.getItem('menuType')}`} onClick={(event)=>{
                  event.preventDefault();
                  //this.props.fetchMenu(1);
                  this.props.history.push(`/${CacheStorage.getItem('menuType')}`);
                  this.handlerChange(CacheStorage.getItem('menuType'));
                }}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/powerbi-report" >
                  Dashboards
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/reports">
                  Reports
                </Link>
              </li>
              {(CacheStorage.getItem("userType") === "1" ) ? <li className="nav-item">
                <Link className="nav-link" to={`/${CacheStorage.getItem('menuType')}`}
                onClick={(event)=>{
                  event.preventDefault();
                  //this.props.fetchMenu(2);
                  this.props.history.push(`/${CacheStorage.getItem('menuType')}`);
                  this.handlerChange('manage');
                }}
                >
                  Manage{" "}
                </Link>
              </li> : <></>}
              <li className="nav-item">
                <Link className="nav-link" to="/support">
                  Support
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ml-auto navbar-nav-top-right">
            {/*<li className="nav-item dropdown no-arrow mx-1">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="alertsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                
                  <i className="fas fa-bell fa-fw"></i>
                  <span className="badge badge-danger badge-pill badge-counter">
                    3+
                  </span>
                </a>
              </li>

               <li className="nav-item dropdown no-arrow mx-1">
                <a className="nav-link dropdown-toggle" href="#">
                  <i className="fas fa-list-ul"></i>
                  <span className="badge badge-pill badge-warning badge-counter">
                    15
                  </span>
                </a>
              </li> 

              <li className="nav-item dropdown no-arrow mx-1"> 
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="messagesDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-envelope fa-fw"></i>
                  <span className="badge badge-primary badge-pill badge-counter">
                    7
                  </span>
                </a>
      </li>*/}<li className="nav-item dropdown no-arrow border-0 user-drop welcomeuser">
                <p>Welcome, <b>{CacheStorage.getItem("userFirstName")}</b>.</p> 
              </li>
              <li className="nav-item dropdown no-arrow border-0 user-drop welcomeuser">
                <p>Log In : <span style={{color:"#20a8d8"}}>{CacheStorage.getItem("loginTime")}</span></p>
                <p>&nbsp;Elapsed Login Time : <span style={{color:"#20a8d8"}}>{this.state.elapsedTime}</span></p>
              </li>
              <li className="nav-item dropdown no-arrow border-0 user-drop">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup={true}
                  aria-expanded={false}
                >
                  <img className="img-avatar" src={login_image} />
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                  <Link className="dropdown-item" to="/registration-details">
                    Registration Details
                  </Link>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#" onClick={this.handleLogout.bind(this)}>
                    Logout
                  </a>
                </div>
              </li>
              {/* <button
                id="sidebarRightToggle"
                data-toggle="aside-menu-lg-show"
                className="btn btn-link rounded-circle"
              >
                <i className="fa fa-bars"></i>
              </button> */}
              
            </ul></>) : <></>
          }
        </nav>
        {/* <!-- End of Topbar --> */}
      </DashboardHeaderNav>
    );
  }
}
const mapStateToProps = state => ({
  menuItems: state.menu.items
});
export default connect(
  mapStateToProps,
  { fetchMenu }
)(withRouter(DashboardHeader));
