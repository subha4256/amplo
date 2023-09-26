import React from 'react';
import {Link} from 'react-router-dom'
const CJMScreenTopbar = props => {
    return (
        <>
            <div className="row py-2 border-top border-bottom dt-project-sec1">
                <div className="col-sm-12 col-md-12 col-lg-9 col-xl-10">
                    <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <div className="dropdown version-drop">
                        <a className="btn btn-drop dropdown-toggle px-0" data-toggle="dropdown">
                        {props.dtProjects.ProjectTitle?props.dtProjects.ProjectTitle:""}
                        </a>
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
                    <div className="col-sm-12 col-md-12 col-lg-8 text-center">
                        <ul className="list-inline warehousing-slider">
                        <li className="list-inline-item active"><span><Link to={`/dt-epic-dashboard/${props.dtId}`}>Plan</Link></span></li>
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
                    <Link to={`/empathydetail/${props.dtId}/${props.epicId}`}>Cancel</Link>
                    <button type="button" className="btn btn-primary ml-3" onClick={props.saveCJM}>SAVE</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CJMScreenTopbar;