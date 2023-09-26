import React, {Component} from 'react';
import GanttScheduler from './GanttScheduler';
import { Link } from 'react-router-dom';

class DTRoadmapBody extends Component {
  constructor(props) {
    super(props);
  }
    render() {
      return(
          <div className="dt-content-wrapper">
            <div className="content-wraper">
              <div className="container-fluid">

                <div className="row epic-version align-items-center">
                  <div className="col-sm-12 col-md-12 col-lg-8 pt-3">
                    <h2 className="d-flex align-items-center"><span>Roadmap</span>
                      <div className="dropdown version-drop ml-3">
                        <a className="btn btn-drop dropdown-toggle px-0" data-toggle="dropdown">
                          1.1 Product Development Roadmap
                        </a>
                        <div className="dropdown-menu">
                          <div className="version-style">
                            <p className="d-flex date-txt justify-content-between"><span>Version 2.2 </span> <span
                                className="date">06/03/20</span></p>
                            <p className="d-flex revised-txt justify-content-between"><span>Revised by: Dave
                                Denis</span> <span className="selected">Selected</span></p>
                          </div>
                          <div className="version-style">
                            <p className="d-flex date-txt justify-content-between"><span>Version 2.1 </span> <span
                                className="date">06/03/20</span></p>
                            <p className="d-flex revised-txt justify-content-between"><span>Revised by: James
                                Denis</span> </p>
                          </div>
                          <div className="version-style">
                            <p className="d-flex date-txt justify-content-between"><span>Version 1.1 </span> <span
                                className="date">06/03/20</span></p>
                            <p className="d-flex revised-txt justify-content-between"><span>Revised by: Steve</span>
                            </p>
                          </div>
                          <div className="version-style text-center">
                            <a href="#">
                              Version History
                            </a>
                          </div>
                        </div>

                      </div>

                    </h2>
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-4 pt-3 text-right">
                    <ul className="list-inline pager-list mb-0">
                      <li className="list-inline-item"><a href="#">Download <i
                            className="fas fa-cloud-download-alt"></i></a></li>
                      <li className="list-inline-item"><Link to={`/dt-prototype/${this.props.projectId}/${this.props.epicId}`}>Back</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="row roadmap-row">
                  <div className="col-sm-12 col-md-12 col-lg-12 bg-white border py-3">
                  <div className="table-responsive">
                      <GanttScheduler setViewModel={this.props.handleSetViewModel} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )
    }
}
export default DTRoadmapBody;