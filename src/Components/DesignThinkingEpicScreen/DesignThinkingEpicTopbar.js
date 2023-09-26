import React from 'react';
import {Link} from 'react-router-dom';
const saveEpic  = (e,props) =>props.saveEpic(e);
const DesignThinkingEpicTopbar = props => {

    return(
        <>
            <div className="row py-2 border-top border-bottom dt-project-sec1">
            <div className="col-sm-6 col-md-6 col-lg-9 col-xl-9">
              <div className="form-group row">
                <div className="col-sm-12 col-md-12 col-lg-2">
                  <label className="pt-2">DT Project Name</label>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-7 d-flex">

                  <input type="text" value={props.dtProjects.ProjectTitle?props.dtProjects.ProjectTitle:""}   className="form-control" placeholder="" readOnly/>

                  <div className="dropdown ml-3 version-drop">
                    <button className="btn btn-drop dropdown-toggle" type="button" data-toggle="dropdown">
                      Version {props.dtProjects.ProjectVersion?props.dtProjects.ProjectVersion:""}
                    </button>
                    <div className="dropdown-menu">
                      <div className="version-style">
                        <p className="d-flex date-txt justify-content-between"><span>Version 2.2 </span> <span
                            className="date">06/03/20</span></p>
                        <p className="d-flex revised-txt justify-content-between"><span>Revised by: Dave Denis</span> <span
                            className="selected">Selected</span></p>
                      </div>
                      <div className="version-style">
                        <p className="d-flex date-txt justify-content-between"><span>Version 2.1 </span> <span
                            className="date">06/03/20</span></p>
                        <p className="d-flex revised-txt justify-content-between"><span>Revised by: James Denis</span> </p>
                      </div>
                      <div className="version-style">
                        <p className="d-flex date-txt justify-content-between"><span>Version 1.1 </span> <span
                            className="date">06/03/20</span></p>
                        <p className="d-flex revised-txt justify-content-between"><span>Revised by: Steve</span> </p>
                      </div>
                      <div className="version-style text-center">
                        <a href="#">
                          Version History
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <div className="dt-btn-sec text-right">
                <Link to={'/dt-dashboard'}>Cancel</Link>
                <button type="button" className="btn btn-primary ml-3" onClick={e => saveEpic(e,props)} >SAVE</button>
              </div>
            </div>
          </div>
        </>
    )
}

export default DesignThinkingEpicTopbar;