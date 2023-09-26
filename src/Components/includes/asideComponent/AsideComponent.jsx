import React from "react";
import login_image from '../../../common/images/login_image.png';
import "./aside.css";

export default class AsideComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <aside className="aside-menu aside-menu-right">
        <ul className="nav nav-tabs" role="tablist" style={{display: 'none' }}>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#timeline" role="tab">
              <i className="fas fa-bell fa-fw"></i>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link active"
              data-toggle="tab"
              href="#messages"
              role="tab"
            >
              <i className="fas fa-envelope fa-fw"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#settings" role="tab">
              <i className="icon-settings"></i>
            </a>
          </li>
        </ul>
        {/* <!------ tab content----------------------> */}
        <div className="tab-content" style={{display: 'none' }}>
          <div
            className="tab-pane active p-3 tab-message"
            id="messages"
            role="tabpanel"
          >
            {/* <!-------- tab content message ------> */}
            <div className="message" >
              <div className="py-3 pb-5 mr-3 float-left">
              
                <div className="avatar">
                  <img className="img-avatar" src={login_image} />
                  <span className="avatar-status badge-success"></span>
                </div>
               
              </div>
          
              <div>
                <small className="text-muted">Kimberly Celestine</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
             
              <div className="text-truncate font-weight-bold">
                <b>In Progress</b>
              </div>
              <small className="text-muted">
                The app is in progress. Check the data for more accurate
                assumptions
              </small>
            </div>
          
            <hr />
          
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
              
                <div className="avatar">
                  <img className="img-avatar" src={login_image} />
                  <span className="avatar-status badge-success"></span>
                </div>
               
              </div>
             
              <div>
                <small className="text-muted">Anirban</small>
                <small className="text-muted float-right mt-1">3:00 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">
                Request data access
              </div>
              <small className="text-muted">
                The data access is not working. We can reach out to admin to
                resolve the issue.
              </small>
            
            </div>
         
            <hr />
         
            <div className="message">
            
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img className="img-avatar" src={login_image} />
                  <span className="avatar-status badge-success"></span>
                </div>
              </div>
             
       
              <div>
                <small className="text-muted">Sonali</small>
                <small className="text-muted float-right mt-1">6:00 PM</small>
              </div>
            
        
              <div className="text-truncate font-weight-bold">
                Optimize Supply Chain
              </div>
              <small className="text-muted">
                We can figure out ways to optimize supply chain
              </small>
            </div>
           
            <hr />
          </div>
        </div>
      </aside>
    );
  }
}
