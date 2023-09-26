import React from 'react';
import {Link} from 'react-router-dom';
const saveEpic  = (e,props) =>props.saveEpic(e);
const DesignThinkingEpicDetailTopbar = props => {
    const {epicProject }  =  props;
    // console.log(epicProject[0]);
    return(
        <>
            <div className="row py-2 border-top border-bottom dt-project-sec1">
            <div className="col-sm-6 col-md-6 col-lg-9 col-xl-9">
              <div className="form-group row">
                <div className="col-sm-12 col-md-12 col-lg-2">
                 { 
                      epicProject ? 
                      epicProject.map(function (project, epicIndex) { 
                          return(<><label className="pt-2">{project.ProjectTitle}</label></>)                                    
                          },this) 
                      :null }                  
                </div>
                <div className="col-sm-12 col-md-12 col-lg-9 text-center">
                  <ul className="list-inline warehousing-slider">
                    <li className="list-inline-item active"><span><Link to={`/dt-epic-dashboard/${props.dtId}`}>Frame</Link></span></li>
                    <li className="list-inline-item"><span><Link to={`/empathydetail/${props.dtId}/${props.epicId}`}>Emphatize</Link></span></li>
                    <li className="list-inline-item"><span><Link to={`/dt-problem-pinning/${props.dtId}/${props.epicId}`}>Ideate</Link></span></li>
                    <li className="list-inline-item"><span><Link to={`/dt-prototype/${props.dtId}/${props.epicId}`}>Prototype</Link></span></li>
                    <li className="list-inline-item"><span><Link to={`/dt-roadmap/${props.dtId}/${props.epicId}`}>Roadmap</Link></span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
              <div className="dt-btn-sec text-right">
                
                <Link to={`/dt-epic-dashboard/${props.allEpicData.DtProjectId}`}>Cancel</Link>
                <button type="button" className="btn btn-primary ml-3" onClick={e => saveEpic(e,props)} >SAVE</button>
              </div>
            </div>
          </div>
        </>
    )
}

export default DesignThinkingEpicDetailTopbar;