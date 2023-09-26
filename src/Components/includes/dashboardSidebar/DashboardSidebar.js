import React from "react";
import { SidebarWrapper } from "./dashboardSidebarStyling";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import { fetchMenu } from "../../../actions/menuActions";
import CacheStorage from '../../../utils/CacheStorage';

//.. Reviewed by Ashim: Need to refactor Storage access 
class DashboardSidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //this.props.fetchMenu(1);
  }
  render() {
   
    return (
      <SidebarWrapper>
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <div className="sidebar-container-bg">
            <li className="nav-item active">
              <Link className="nav-link" to="/dashboard">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span>{CacheStorage.getItem('menutext')=='dashboard' ? 'Home' : 'Manage' }</span>{" "}
                <span className="badge badge-info badge-counter beta-b">
                  Beta
                </span>
              </Link>
            </li>
            <div className="sidebar-heading">{CacheStorage.getItem('menutext')=='dashboard' ? 'ORGANIZATION' : 'CONFIGURATION' }</div>
            {CacheStorage.getItem('menutext')==='dashboard' && CacheStorage.getItem('userType') === "2" ? <><li className="nav-item">
              <Link className="nav-link" to="/getting-started">
                <i><img src={ require('../../../common/images/ic_GettingStarted.svg') } className="sidebar-icon" alt="" /></i>
                <span>Getting Started</span>
              </Link>
            </li>
            </> : <><li className="nav-item">
              <Link className="nav-link" to="/company-profile">
                <i><img src={ require('../../../common/images/ic_CompanyProfile.svg') } className="sidebar-icon" alt="" /></i>
                  <span>Company Profile</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-team">
                  <i className="far fa-edit"></i>
                  <span>Manage AmploFly 4.0 Team</span>
                </Link>
              </li></>}
            <div className="sidebar-heading">MODULES</div>
            {this.props.menuItems ? this.props.menuItems.map(menu => (
              <li key={menu.menuId} className="nav-item">
                <a
                  className="nav-link collapsed"
                  href="#"
                  data-toggle="collapse"
                  data-target={menu.subMenu.length?"#collapse" + menu.menuId:''}
                  aria-expanded="true"
                >
                  <i><img src={ require('../../../common/images/ic_ProcessAssessment.svg') } className="sidebar-icon" alt="" /></i>
                  <span>{menu.menuName}</span>
                </a>
                <div
                  id={"collapse" + menu.menuId}
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionSidebar"
                >
                  <div className="collapse-inner rounded">
                    {menu.subMenu.map(menu => (
                      <Link key={menu.menuId} className="collapse-item" to={{ pathname: menu.link, state: 'flushDeal' }}>
                        {menu.menuName}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            )) : null}

            <div className="text-right d-md-block toggale-arrow">
              <button
                className="rounded-circle border-0"
                id="sidebarToggle"
              ></button>
            </div>
          </div>
          </ul>
        </SidebarWrapper>
      
    );
  }
}
const mapStateToProps = state => ({
  menuItems: state.menu.items
});
export default connect(
  mapStateToProps,
  { fetchMenu }
)(DashboardSidebar);
