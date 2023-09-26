import React from "react";
import login_image from '../../../../common/images/LogIn_image.png';
import "./aside.css";

export default class AsideComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <aside class="aside-menu aside-menu-right">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#timeline" role="tab">
              <i class="fas fa-bell fa-fw"></i>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link active"
              data-toggle="tab"
              href="#messages"
              role="tab"
            >
              <i class="fas fa-envelope fa-fw"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="tab" href="#settings" role="tab">
              <i class="icon-settings"></i>
            </a>
          </li>
        </ul>
        {/* <!------ tab content----------------------> */}
        <div class="tab-content">
          <div
            class="tab-pane active p-3 tab-message"
            id="messages"
            role="tabpanel"
          >
            {/* <!-------- tab content message ------> */}
            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                {/* <!----- user avatar-------------------> */}
                <div class="avatar">
                  <img class="img-avatar" src={login_image} />
                  <span class="avatar-status badge-success"></span>
                </div>
                {/* <!---- user avatar ends------------------> */}
              </div>
              {/* <!------ user name and time----------------------> */}
              <div>
                <small class="text-muted">Kimberly Celestine</small>
                <small class="text-muted float-right mt-1">1:52 PM</small>
              </div>
              {/* <!---- user name and time ends--------------------->
          <!------------------message status------------------------> */}
              <div class="text-truncate font-weight-bold">
                <b>In Progress</b>
              </div>
              <small class="text-muted">
                The app is in progress. Check the data for more accurate
                assumptions
              </small>
            </div>
            {/* <!--- message status ends-------> */}
            <hr />
            {/* <!---- tab content message-------------------> */}
            <div class="message">
              <div class="py-3 pb-5 mr-3 float-left">
                {/* <!-------user avater-------------------------> */}
                <div class="avatar">
                  <img class="img-avatar" src={login_image} />
                  <span class="avatar-status badge-success"></span>
                </div>
                {/* <!---------------------------USER AVATAR-----------------------> */}
              </div>
              {/* <!----- user name and message-------------------------> */}
              <div>
                <small class="text-muted">Anirban</small>
                <small class="text-muted float-right mt-1">3:00 PM</small>
              </div>
              <div class="text-truncate font-weight-bold">
                Request data access
              </div>
              <small class="text-muted">
                The data access is not working. We can reach out to admin to
                resolve the issue.
              </small>
              {/* <!----- user message end here-----------------------------------> */}
            </div>
            {/* <!------ message section end------------------------------> */}
            <hr />
            {/* <!-------------------message section start ---------------------> */}
            <div class="message">
              {/* <!------- user avatar--------------------> */}
              <div class="py-3 pb-5 mr-3 float-left">
                <div class="avatar">
                  <img class="img-avatar" src={login_image} />
                  <span class="avatar-status badge-success"></span>
                </div>
              </div>
              {/* <!-------user avater ends------>
          <!------- user message and time start-----------> */}
              <div>
                <small class="text-muted">Sonali</small>
                <small class="text-muted float-right mt-1">6:00 PM</small>
              </div>
              {/* <!-------- user message and time end----------------------->
          <!-------------------- user topic------------------> */}
              <div class="text-truncate font-weight-bold">
                Optimize Supply Chain
              </div>
              <small class="text-muted">
                We can figure out ways to optimize supply chain
              </small>
            </div>
            {/* <!------------------------------USer topic end------------------> */}
            <hr />
          </div>
        </div>
      </aside>
    );
  }
}
