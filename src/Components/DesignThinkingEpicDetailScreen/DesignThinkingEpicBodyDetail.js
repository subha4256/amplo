import React from 'react';
import ContentEditable from 'react-contenteditable';
import {Link} from 'react-router-dom';
//const addEpic    = (e,props) => props.addEpic(e);
//const selectEpic = (e,props,id) => props.selectEpic(e,id);
const addSubEpic = (e,props) => props.addSubEpic(e);
const selectSubEpic = (e,props,subEpicId) => props.selectSubEpic(e,subEpicId);
const removeSubEpic = (e,props) => props.removeSubEpic(e);
//const removeEpic = (e,props) => props.removeEpic(e);
const dropEpic = (e,props,id,type) =>props.dropEpic(e,id,type);
const dropchildEpic = (e,props,subEpicId,type) => props.dropchildEpic(e,subEpicId,type);
const editTitle = (e,props,id,type) => props.editTitle(e,id,type);
const getEpic = (e,props) => props.getEpic(e);

const nextSubEpic = (e,props,index) => props.nextSubEpic(e,index);
const previouSubEpic = (e,props,index) => props.previouSubEpic(e,index);
const editsubTitle = (e,props,id,type) => props.editsubTitle(e,id,type);



const DesignThinkingEpicBodyDetail = props => {
    let { selectedEpicId,epic,epicList,epicDetail,allEpicData } = props; 
    console.log("allEpicData====>",epic)
    
    epic =  epic.filter(function (item) {
      return item.id === selectedEpicId;
     });
     
    return(
        <>
            {/* <!-- Start Body Content --> */}
            <div className={`dt-content-wrapper ${props.showClass ? 'right-toggle' : ''}`}>
                <div className="content-wraper">
                    <div className="container-fluid">
                        <div className="row epic-version">
                            <div className="col-sm-12 col-md-12 col-lg-8 d-md-flex align-items-center pt-3">
                                <h2>Epic </h2>
                                <select className="custom-select" value={selectedEpicId} onChange={(e) => getEpic(e,props)}> 
                                { 
                                epicList ? 
                                epicList.map(function (epic, epicIndex) { 
                                    return(<><option value={epic.DTEPICHeaderID}>{epic.Title}</option></>)                                    
                                    },this) 
                                :null }
                                </select>
                                <div className="dropdown ml-md-3 mr-3 version-drop">
                                <button className="btn btn-drop dropdown-toggle" type="button" data-toggle="dropdown">
                                    {allEpicData.Version}
                                </button>

                                <div className="dropdown-menu">
                                    <div className="version-style">
                                    <p className="d-flex date-txt justify-content-between"><span>Version 2.2 </span> <span
                                        className="date">06/03/20</span></p>
                                    <p className="d-flex revised-txt justify-content-between"><span>Revised by: Dave Denis</span>
                                        <span className="selected">Selected</span></p>
                                    </div>
                                    <div className="version-style">
                                    <p className="d-flex date-txt justify-content-between"><span>Version 2.1 </span> <span
                                        className="date">06/03/20</span></p>
                                    <p className="d-flex revised-txt justify-content-between"><span>Revised by: James Denis</span>
                                    </p>
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
                                <a href="#" className="btn-download mr-3">Save as New Version</a>
                                <a href="#" className="btn-download"><i className="fas fa-cloud-download-alt"></i> Download</a>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-4 pt-3 text-right">
                                <ul className="list-inline pager-list">
                                <li className="list-inline-item"><Link to={`/dt-epic-dashboard/${allEpicData.DtProjectId}`}>Previous</Link></li>
                                <li className="list-inline-item"><Link to={`/empathydetail/${allEpicData.DtProjectId}/${selectedEpicId}`} className="btn-next">Next</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white epic-details-row mt-3 mb-4">
                      <div className="epic-col-wraper">
                        <div className="row mb-2">
                          <div className="col-sm-12 pl-0">
                            <h1>Epic Details</h1>
                          </div>
                        </div>
                        <div className="row border-top">
                          <div className="col-sm-12 col-md-2 bg-yellow align-items-center py-3">
                            <h2>EPIC</h2>
                          </div>

                          { epic ?
                          epic.map(function (epic, epicIndex) { 
                          return(<><div className="col-sm-12 col-md-10 align-items-center py-3">
                                  {/* <p contenteditable="true" onInput={e => editTitle(e,props,epic.id,'name')}>{epic.name}</p> */}
                                  <ContentEditable
                                    html={epic.name} // innerHTML of the editable div
                                    disabled={false}       // use true to disable editing
                                    onChange={e => editTitle(e,props,epic.id,'name')} // handle innerHTML change
                                    tagName='article' // Use a custom HTML tag (uses a div by default)
                                  />
                                </div></>)                                    
                          },this) 
                          :null }
                          
                        </div>
                        <div className="row border-top">
                          <div className="col-sm-12 col-md-2 bg-green align-items-center py-3">
                            <h2>Goal</h2>
                          </div>
                          { epic ?
                         epic.map(function (epic, epicIndex) { 
                          return(<><div className="col-sm-12 col-md-10 align-items-center py-3 bg-gray">
                                {/* <p contenteditable="true" onInput={e => editTitle(e,props,epic.id,'goal')} >{epic.Goal}</p> */}
                                <ContentEditable
                                  html={epic.Goal} // innerHTML of the editable div
                                  disabled={false}       // use true to disable editing
                                  onChange={e => editTitle(e,props,epic.id,'goal')} // handle innerHTML change
                                  tagName='article' // Use a custom HTML tag (uses a div by default)
                                />
                               
                              </div></>)                                    
                          },this) 
                          :null }
                        
                        </div>
                        <div className="row border-top">
                          <div className="col-sm-12 col-md-2 bg-orange align-items-center py-3">
                            <h2>Description</h2>
                          </div>
                          { epic  ?
                          epic.map(function (epic, epicIndex) { 
                          return(<><div className="col-sm-12 col-md-10 align-items-center py-3">
                                  {/* <p contenteditable="true" onInput={e => editTitle(e,props,epic.id,'description')}>{epic.Description}</p> */}
                                  <ContentEditable
                                    html={epic.Description} // innerHTML of the editable div
                                    disabled={false}       // use true to disable editing
                                    onChange={e => editTitle(e,props,epic.id,'description')} // handle innerHTML change
                                    tagName='article' // Use a custom HTML tag (uses a div by default)
                                  />
                                </div></>)                                    
                          },this) 
                          :null }
                          
                        </div>
                        <div className="row border-top border-bottom">
                          <div className="col-sm-12 col-md-2 bg-lightblue align-items-center py-3">
                            <h2>NOI</h2>
                          </div>
                          <div className="col-sm-12 col-md-10 align-items-center py-3 bg-gray">
                          <p data-toggle="modal" data-target="#noiModal"><a href="#">{epic[0] && epic[0].NOI && typeof epic[0].NOI === 'object' && epic[0].NOI !== null && epic[0].NOI.hasOwnProperty('TemplateNoiName') ? epic[0].NOI.TemplateNoiName : "Select a Template" }</a></p>         
                          </div>
                        </div>
                      </div>
                      <div className="benchmarking-col-wraper">
                        {
                          epic[0]?
                          <div className="row mt-4">
                            <div className="col-sm-12 col-md-6 col-lg-4" 
                                onDragOver={e => e.preventDefault()} 
                                onDrop={e => dropEpic(e,props,epic[0],1)} >

                              <h3>AmpMarking Projects

                                <div className="dropdown float-right dropleft" >
                                  <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                    <i className="fas fa-ellipsis-h"></i>
                                  </a>                                
                                    <div className="dropdown-menu">
                                    { epic[0].Association.length > 0?  
                                    epic[0].Association.map(function (association, epicIndex) { 
                                      if(association.type == 'BenchmarkingProjects'){
                                        return(<><a className="dropdown-item" href="#">{association.name}</a>
                                        <div className="dropdown-divider"></div></>)
                                      }
                                    },this)
                                    
                                    : null
                                    }
                                    
                                  </div>
                                </div>
                                  
                              </h3>
                              <div className="table-responsive">
                                <table className="table table-bordered bench-mark-table">
                                  <tbody>
                                  { epic[0].Association.length > 0?  
                                    epic[0].Association.map(function (association, epicIndex) { 
                                      if(association.type == 'BenchmarkingProjects'){
                                      return(<><tr>
                                        <td>{association.name}</td>
                                        <td className="text-right"><button type="button" className="btn btn-green">{association.score}</button></td>
                                      </tr></>)
                                      }
                                    },this)
                                    : null
                                  }
                                  
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4" onDragOver={e => e.preventDefault()} onDrop={e => dropEpic(e,props,epic[0],2)}>
                              <h3>Capability Modeling Projects

                              <div className="dropdown float-right dropleft">
                                  <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                    <i className="fas fa-ellipsis-h"></i>
                                  </a>
                                  
                                    <div className="dropdown-menu">
                                    { epic[0].Association.length > 0?  
                                    epic[0].Association.map(function (association, epicIndex) { 
                                      if(association.type == 'CapabilityModellingProjects'){
                                    return(<><a className="dropdown-item" href="#" >{association.name}</a>
                                    <div className="dropdown-divider"></div></>)
                                    }
                                    },this)
                                    
                                    : null
                                    }
                                    
                                  </div>
                                </div>
                              
                              </h3>
                              <div className="table-responsive">
                                <table className="table table-bordered bench-mark-table">
                                  <tbody>
                                  { epic[0].Association.length>0?  
                                    epic[0].Association.map(function(association, epicIndex) { 
                                      if(association.type == 'CapabilityModellingProjects'){
                                      return(<><tr>
                                        <td>{association.name}</td>
                                        <td className="text-right"><button type="button" className="btn btn-green">{association.score}</button></td>
                                      </tr></>)
                                      }
                                    },this)
                                    : null
                                  }
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-4" onDragOver={e => e.preventDefault()} onDrop={e => dropEpic(e,props,epic[0],3)}>
                              <h3>KPIs

                              <div className="dropdown float-right dropleft">
                                  <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                    <i className="fas fa-ellipsis-h"></i>
                                  </a>
                                  
                                    <div className="dropdown-menu">
                                    { epic[0].Association.length>0?  
                                    epic[0].Association.map(function (association, epicIndex) { 
                                      if(association.type == 'Kpis'){
                                    return(<><a className="dropdown-item" href="#" >{association.name}</a>
                                    <div className="dropdown-divider"></div></>)
                                    }
                                    },this)
                                    
                                    : null
                                    }
                                    
                                  </div>
                                </div>
                              
                              </h3>
                              <div className="table-responsive">
                                <table className="table table-bordered bench-mark-table">
                                  <tbody>
                                  { epic[0].Association.length>0?  
                                    epic[0].Association.map(function (association, epicIndex) { 
                                      if(association.type == 'Kpis'){
                                      return(<><tr>
                                        <td>{association.name}</td>
                                        <td className="text-right"><button type="button" className="btn btn-green">{association.score}</button></td>
                                      </tr></>)
                                      }
                                    },this)
                                    : null
                                  }
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          :
                          null
                        }
                      </div>
                      <div className="row epic-version subepic-version">

                      <div className="col-sm-12 col-md-6 pt-3">
                        <h2>Associated Sub Epics</h2>
                      </div>
                      <div className="col-sm-12 col-md-6 pt-3 text-right">
                        <ul className="list-inline pager-list">
                          <li className="list-inline-item">
                            <select className="custom-select">
                              <option selected>Action</option>
                              <option>Action1</option>
                              <option>Action2</option>
                            </select>
                          </li>
                          <li className="list-inline-item">
                            <span className="epic-icon">
                              Sub Epics&nbsp;&nbsp;<i className="fas fa-plus" onClick={e => addSubEpic(e,props)}></i>
                              <i className="fas fa-minus ml-1" onClick={e => removeSubEpic(e,props)}></i></span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white epic-details-row subepic-details-row mt-3 mb-4">
                    { 
                        epic[0]?  
                        epic[0].SubEpic.map((epic, epicIndex) => {   
                        return(
                        <>
                          <div 
                            key={epicIndex} 
                            data={epicIndex}
                            className='epic-col-wraper subEpic' 

                            // className={epicIndex === showSubEpic ? 'epic-col-wraper asubEpic' : 'epic-col-wraper dsubEpic'} 
                            onClick={e => selectSubEpic(e,props,epic.id)}
                          >
                            <div className="row mb-2">
                              <div className="col-sm-12 pl-0">
                                <h1>Sub Epic Details</h1>
                              </div>
                            </div>                        
                            <div className="row border-top">
                              <div className="col-sm-12 col-md-2 bg-yellow align-items-center py-3">
                                <h2>Sub EPIC</h2>
                              </div>
                              <div className="col-sm-12 col-md-10 align-items-center py-3">
                                {/* <p contenteditable="true" onInput={e => editsubTitle(e,props,epic.id,'name')}>{epic.name}</p> */}
                                <ContentEditable
                                  html={epic.name} // innerHTML of the editable div
                                  disabled={false}       // use true to disable editing
                                  onChange={e => editsubTitle(e,props,epic.id,'name')} // handle innerHTML change
                                  tagName='article' // Use a custom HTML tag (uses a div by default)
                                />
                              </div>
                            </div>
                            <div className="row border-top">
                              <div className="col-sm-12 col-md-2 bg-green align-items-center py-3">
                                <h2>Goal</h2>
                              </div>
                              <div className="col-sm-12 col-md-10 align-items-center py-3 bg-gray">
                                {/* <p contenteditable="true" onInput={e => editsubTitle(e,props,epic.id,'goal')}>{epic.Goal}</p> */}
                                <ContentEditable
                                  html={epic.Goal} // innerHTML of the editable div
                                  disabled={false}       // use true to disable editing
                                  onChange={e => editsubTitle(e,props,epic.id,'goal')} // handle innerHTML change
                                  tagName='article' // Use a custom HTML tag (uses a div by default)
                                />
                              </div>
                            </div>
                            <div className="row border-top">
                              <div className="col-sm-12 col-md-2 bg-orange align-items-center py-3">
                                <h2>Description</h2>
                              </div>
                              <div className="col-sm-12 col-md-10 align-items-center py-3">
                                {/* <p  contenteditable="true" onInput={e => editsubTitle(e,props,epic.id,'description')}>{epic.Description}</p> */}
                                <ContentEditable
                                  html={epic.Description} // innerHTML of the editable div
                                  disabled={false}       // use true to disable editing
                                  onChange={e => editsubTitle(e,props,epic.id,'description')} // handle innerHTML change
                                  tagName='article' // Use a custom HTML tag (uses a div by default)
                                />
                              </div>
                            </div>
                          </div>
                          <div  
                            key={epicIndex} 
                            data={epicIndex}   
                            className='benchmarking-col-wraper asubEpic'
                            // className={epicIndex === showSubEpic ? 'benchmarking-col-wraper asubEpic' : 'benchmarking-col-wraper dsubEpic'}
                            >
                            <div className="row mt-4">
                              <div className="col-sm-12 col-md-6 col-lg-4" onDragOver={e => e.preventDefault()} onDrop={e => dropchildEpic(e,props,epic,1)} >

                                <h3>AmpMarking Projects

                                  <div className="dropdown float-right dropleft" >
                                    <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                      <i className="fas fa-ellipsis-h"></i>
                                    </a>                                
                                      <div className="dropdown-menu">
                                      { epic.Association?  
                                      epic.Association.map(function (association, epicIndex) { 
                                        if(association.type == 'BenchmarkingProjects'){
                                          return(<><a className="dropdown-item" href="#">{association.name}</a>
                                          <div className="dropdown-divider"></div></>)
                                        }
                                      },this)
                                      
                                      : null
                                      }
                                      
                                    </div>
                                  </div>
                                    
                                </h3>
                                <div className="table-responsive">
                                  <table className="table table-bordered bench-mark-table">
                                    <tbody>
                                    { epic.Association?  
                                      epic.Association.map(function (association, epicIndex) { 
                                        if(association.type == 'BenchmarkingProjects'){
                                        return(<><tr>
                                          <td>{association.name}</td>
                                          <td className="text-right"><button type="button" className="btn btn-green">{association.score}</button></td>
                                        </tr></>)
                                        }
                                      },this)
                                      : null
                                    }
                                    
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div className="col-sm-12 col-md-6 col-lg-4" onDragOver={e => e.preventDefault()} onDrop={e => dropchildEpic(e,props,epic,2)}>
                                <h3>Capability Modeling Projects

                                <div className="dropdown float-right dropleft">
                                    <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                      <i className="fas fa-ellipsis-h"></i>
                                    </a>
                                    
                                      <div className="dropdown-menu">
                                      { epic.Association?  
                                      epic.Association.map(function (association, epicIndex) { 
                                        if(association.type == 'CapabilityModellingProjects'){
                                      return(<><a className="dropdown-item" href="#" >{association.name}</a>
                                      <div className="dropdown-divider"></div></>)
                                      }
                                      },this)
                                      
                                      : null
                                      }
                                      
                                    </div>
                                  </div>
                                
                                </h3>
                                <div className="table-responsive">
                                  <table className="table table-bordered bench-mark-table">
                                    <tbody>
                                    { epic.Association?  
                                      epic.Association.map(function(association, epicIndex) { 
                                        if(association.type == 'CapabilityModellingProjects'){
                                        return(<><tr>
                                          <td>{association.name}</td>
                                          <td className="text-right"><button type="button" className="btn btn-green">{association.score}</button></td>
                                        </tr></>)
                                        }
                                      },this)
                                      : null
                                    }
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div className="col-sm-12 col-md-6 col-lg-4" onDragOver={e => e.preventDefault()} onDrop={e => dropchildEpic(e,props,epic,3)}>
                                <h3>KPIs

                                <div className="dropdown float-right dropleft">
                                    <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                      <i className="fas fa-ellipsis-h"></i>
                                    </a>
                                    
                                      <div className="dropdown-menu">
                                      { epic.Association?  
                                      epic.Association.map(function (association, epicIndex) { 
                                        if(association.type == 'Kpis'){
                                      return(<><a className="dropdown-item" href="#" >{association.name}</a>
                                      <div className="dropdown-divider"></div></>)
                                      }
                                      },this)
                                      
                                      : null
                                      }
                                      
                                    </div>
                                  </div>
                                
                                </h3>
                                <div className="table-responsive">
                                  <table className="table table-bordered bench-mark-table">
                                    <tbody>
                                    { epic.Association?  
                                      epic.Association.map(function (association, epicIndex) { 
                                        if(association.type == 'Kpis'){
                                        return(<><tr>
                                          <td>{association.name}</td>
                                          <td className="text-right"><button type="button" className="btn btn-green">{association.score}</button></td>
                                        </tr></>)
                                        }
                                      },this)
                                      : null
                                    }
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>)  
                          })
                             : null
                        }
                    </div>

                    <div className="col-sm-12 col-md-12 col-lg-4 pt-3 text-right">
                      <ul className="list-inline pager-list">
                      {/* <li className="list-inline-item"><a href="javascript:void(0)">Previous</a></li>
                      <li className="list-inline-item"><a href="javascript:void(0)" className="btn-next" >Next</a></li> */}

                        {/* <li className="list-inline-item"><a href="javascript:void(0)" onClick={e => previouSubEpic(e,props,showSubEpic)} >Previous</a></li>
                        <li className="list-inline-item"><a href="javascript:void(0)" className="btn-next" onClick={e => nextSubEpic(e,props,showSubEpic)}  >Next</a></li> */}
                      </ul>
                     </div>
                    
                    </div>
                    </div>
                </div>
            </div>
            
              {/* <!-- End Body Content --> */}
        </>
    );
} 

export default DesignThinkingEpicBodyDetail;