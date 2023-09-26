import React from 'react';
import {Link} from 'react-router-dom';

const DesignThinkingEpicDetailTopbar = props => {
    const {epicProject }  =  props;
    console.log(epicProject[0]);
    return(
        <>
            <div className="row py-2 border-top border-bottom dt-project-sec1">          
                <div className="col-sm-12 col-md-12 col-lg-9 col-xl-10">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-4">
                            <div className="dropdown version-drop pt-2">
                                <a className="btn-drop dropdown-toggle" data-toggle="dropdown">
                                    {props.dtProjects.ProjectTitle?props.dtProjects.ProjectTitle:""}
                                </a>
                                <div className="dropdown-menu">
                                    <div className="version-style">
                                    <p className="d-flex date-txt justify-content-between"><span className="fontbold">1.3 Business Decomposition Model 1 </span><span className="text-success">Active</span> <span
                                        className="date">06/03/20</span></p>
                                    <p className="d-flex revised-txt justify-content-between"><span>Revised by: Dave Denis</span> <span
                                        className="selected">Selected</span></p>
                                    </div>
                                    <div className="version-style">
                                    <p className="d-flex date-txt justify-content-between"><span className="fontbold">1.2 Business Decomposition Model 1</span> <span
                                        className="date">06/03/20</span></p>
                                    <p className="d-flex revised-txt justify-content-between"><span>Revised by: James Denis</span> </p>
                                    </div>
                                    <div className="version-style">
                                    <p className="d-flex date-txt justify-content-between"><span className="fontbold">1.1 Business Decomposition Model 1 </span> <span
                                        className="date">06/03/20</span></p>
                                    <p className="d-flex revised-txt justify-content-between"><span>Revised by: Steve</span> </p>
                                    </div>
                                    
                                </div>
                                </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-8 text-center">
                            <ul className="list-inline warehousing-slider">
                                <li className="list-inline-item active"><span><Link to={`/dt-epic-dashboard/${props.dtId}`}>Frame</Link></span></li>
                                <li className="list-inline-item active"><span><Link to={`/empathydetail/${props.dtId}/${props.epicId}`}>Emphatize</Link></span></li>
                                <li className="list-inline-item"><span><Link to={`/dt-problem-pinning/${props.dtId}/${props.epicId}`}>Ideate</Link></span></li>
                                <li className="list-inline-item"><span><Link to={`/dt-prototype/${props.dtId}/${props.epicId}`}>Prototype</Link></span></li>
                                <li className="list-inline-item"><span><Link to={`/dt-roadmap/${props.dtId}/${props.epicId}`}>Roadmap</Link></span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-3 col-xl-2">
                    <div className="dt-btn-sec text-right">
                        <Link to={`/dt-epicdetail/${props.dtId}/${props.epicId}`} >Cancel</Link>
                        <button type="button" onClick={e => props.saveNotes(e)} className="btn btn-primary ml-3">SAVE</button>
                    </div>
                </div>
          </div>
        </>
    )
}

export default DesignThinkingEpicDetailTopbar;