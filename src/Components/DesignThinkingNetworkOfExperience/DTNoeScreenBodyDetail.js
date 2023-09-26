import React,{Fragment, useState} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
const config = require('../../config.js');
 const DTNoeScreenBodyDetail = props => {
    // props.noeData.map((item,i) => (
    //     item.LifeCycle.map((item1,i1) => (
            // Object.entries(item1).map(([key, value]) => {
            //     if(key == 'Thoughts & Feelings'){
                    console.log("props.noeData[0]",props.noeData[0])
            //     }
            // })
    //     ))
    // ))
    const createMarkup = value => {
		return { __html: value };
	}
     return(
         <>
            <div className="dt-content-wrapper">
                <div className="content-wraper">
                    <div className="container-fluid">
                        <div className="row epic-version">
                            <div className="col-sm-12 col-md-8 col-lg-8 d-md-flex align-items-center pt-3">
                                <h2>Network of Experience</h2>
                            </div>
                            <div className="col-sm-12 col-md-4 col-lg-4 pt-3 text-right">
                                <ul className="list-inline pager-list">
                                    <li className="list-inline-item"> <a href="#" className="btn-download"><i className="fas fa-cloud-download-alt"></i> Download</a></li>
                                    <li className="list-inline-item">
                                        <a onClick={props.history.goBack} href="#">
                                            Back</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row highlight-sec">
                            <div className="w-100 justify-content-center d-flex">
                                <div className="card">

                                    <div className="card-body">
                                        {
                                            props.noeData.map((item,i) => (
                                                <>
                                                <div className="d-flex justify-content-between texthead">
                                                    <p>{item.name}</p>
                                                    <div className="dropdown float-right dropleft">
                                                        <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                                        <i className="fas fa-ellipsis-h"></i>
                                                        </a>
                                                        {item.Association.length > 0 ?
                                                            <div className="dropdown-menu">
                                                            { item.Association.map((newEpic,newEpicIndex) => (
                                                                <>
                                                                    <a key={newEpicIndex} className="dropdown-item" href="#">{newEpic.name}</a>
                                                                    <div className="dropdown-divider"></div>
                                                                </>
                                                            ))
                                                            }
                                                            </div>
                                                        :
                                                            <div className="dropdown-menu"><p className="dropdown-item">Not Available</p></div> 
                                                        }
                                                    </div>

                                                    {/* <a href="#"><i className="fas fa-ellipsis-h"></i></a> */}
                                                </div>
                                                <div className="updated">
                                                    <span>Added: <span className="txtblue">{item.Association.length} Scenarios</span></span>
                                                    <span>Updated 1 day ago</span>
                                                </div>
                                                </>        
                                            ))
                                        }
                                        
                                        

                                    </div>

                                </div>
                                <div className="highlighttoggle d-flex align-items-center justify-content-end ">
                                    <span className="mr-3 htxt ">Highlight Differences</span>
                                    <label className="switch ">
                                    <input type="checkbox" />
                                    <span className="slider round "></span>
                                </label>
                                </div>
                            </div>

                        </div>
                        <div className="row highlight-sec highlight-sec1 mt-4">
                            <div className="highlight-slider">
                                <div className="controlbtn">
                                    <a href="#" className="pre-icon"><i className="fas fa-chevron-left"></i></a>
                                    <a href="#" className="next-icon"><i className="fas fa-chevron-right"></i></a>
                                </div>
                                {
                                    props.noeData.map((item,i) => (
                                        item.SubEpic?item.SubEpic.map((item1,i1) => (
                                            
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between texthead">
                                                            <p>{item1.name}</p>
                                                            <div className="dropdown float-right dropleft">
                                                                <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                                                <i className="fas fa-ellipsis-h"></i>
                                                                </a>
                                                                {item1.Association.length > 0 ?
                                                                    <div className="dropdown-menu">
                                                                    { item1.Association.map((newEpic,newEpicIndex) => (
                                                                        <>
                                                                            <a key={newEpicIndex} className="dropdown-item" href="#">{newEpic.name}</a>
                                                                            <div className="dropdown-divider"></div>
                                                                        </>
                                                                    ))
                                                                    }
                                                                    </div>
                                                                :
                                                                    <div className="dropdown-menu"><p className="dropdown-item">Not Available</p></div> 
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="updated">
                                                            <span>Added: <span className="txtblue">{item1.Association.length} Scenarios</span></span>
                                                            <span>Updated 1 day ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                        )):null
                                    ))
                                }

                                {/* <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between texthead">
                                            <p>Final Assembly Troubleshoots</p>
                                            <a href="#"><i className="fas fa-ellipsis-h"></i></a>
                                        </div>
                                        <div className="updated">
                                            <span>Added: <span className="txtblue">4 Scenarios</span></span>
                                            <span>Updated 1 day ago</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between texthead">
                                            <p>Sub assembly Line defects</p>
                                            <a href="#"><i className="fas fa-ellipsis-h"></i></a>
                                        </div>
                                        <div className="updated">
                                            <span>Added: <span className="txtblue">4 Scenarios</span></span>
                                            <span>Updated 1 day ago</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between texthead">
                                            <p>Procurement Improvements</p>
                                            <a href="#"><i className="fas fa-ellipsis-h"></i></a>
                                        </div>
                                        <div className="updated">
                                            <span>Added: <span className="txtblue">4 Scenarios</span></span>
                                            <span>Updated 1 day ago</span>
                                        </div>
                                    </div>
                                </div>
                             */}
                            </div>
                        </div>

                        <div className="row lifecycle-sec ">
                            <div className="col-md-12 ">
                                <div className="lifecycle-container ">
                                    <div className="lifecycle-main ">
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-head blue ">
                                                            <div className="headleft ">
                                                                <small>Step 1</small>
                                                                <p>{item1.LifeCycleName}</p>
                                                            </div>
                                                            <div className="headright ">
                                                                <span>Stages</span> <Link onClick={() => props.getData()} to={`/dt-network-of-experience-details/${props.dtId}/${props.epicId}`}><i className="fas fa-chevron-up "></i></Link>
                                                            </div>
                                                        </div>
                                                    ))
                                                ))
                                            }
                                        </div>
                                        
                                        {/* KPIs */}
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className={`box-gray ${i1 == 0? 'box-gray': 'box-gray1'}`}> 
                                                            {i1 == 0 && <div className="grayleft ">
                                                                <i className="fas fa-cog "></i> <span>Kpis </span>
                                                            </div>}
                                                            <div className="grayright ">
                                                                <span>{item1.Kpis != undefined && item1.Kpis != null ? item1.Kpis.length : 0}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ))
                                            }
                                            
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        item1.Kpis.length>0?item1.Kpis.map((item3,i3) => (
                                                            <div className="box-white ">
                                                                <ul className="cyclelist ">
                                                                    <li dangerouslySetInnerHTML={createMarkup(item3.SubCategoryText)} />
                                                                </ul>
                                                            </div>            
                                                        )):null
                                                    ))
                                                ))
                                            }

                                        </div>

                                        {/* Opportunities */}
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className={`box-gray ${0 == 0? 'box-gray': 'box-gray1'}`}> 
                                                            <div className="grayleft ">
                                                            {0 == i1 && <><i className="fas fa-cog "></i> <span>Opportunities </span></>}
                                                            </div>
                                                            <div className="grayright ">
                                                                <span>{item1.Opportunities.length}</span>
                                                            </div>
                                                        </div>            
                                                    ))
                                                ))
                                            }
                                            
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-white ">
                                                            <ul className="cyclelist ">{
                                                                item1.Opportunities.length>0?item1.Opportunities.map((item3,i3) => (
                                                                    <li dangerouslySetInnerHTML={createMarkup(item3.OportunityName)} />
                                                                    )):null
                                                                }
                                                            </ul>
                                                        </div>            
                                                    ))
                                                ))
                                            }

                                        </div>
                                        
                                        {/* Personas */}
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className={`box-gray ${i1 == 0? 'box-gray': 'box-gray1'}`}> 
                                                            {i1 == 0 && <div className="grayleft ">
                                                                <i className="fas fa-cog "></i> <span>Personas </span>
                                                            </div>}
                                                            <div className="grayright ">
                                                                <span>{item1.Personas.length}</span>
                                                            </div>
                                                        </div>

                                                    ))
                                                ))
                                            }
                                            
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-white ">
                                                            {item1.Personas.length>0?item1.Personas.map((item3,i3) => (
                                                                    <div className="process-sm-img ">
                                                                        <img src={(item3.FilePath != null && item3.FilePath!="")?config.ApiBaseUrl+"StakeHoldersImages/"+item3.FilePath:require('../../common/images/login_image.png')} alt=" "/>
                                                                    </div>
                                                            )):null}
                                                        </div>         
                                                    ))
                                                ))
                                            }

                                        </div>

                                                                            
                                        {/* TouchPoints */}
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className={`box-gray ${0 == 0? 'box-gray': 'box-gray1'}`}> 
                                                            <div className="grayleft ">
                                                            {0 == i1 &&  <><i className="fas fa-cog "></i> <span>TouchPoints </span></>}
                                                            </div>
                                                            <div className="grayright ">
                                                                <span>{item1.TouchPoints.length}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ))
                                            }
                                            
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-white ">
                                                            <ul className="cyclelist ">
                                                                {
                                                                    item1.TouchPoints.length>0?item1.TouchPoints.map((item3,i3) => (
                                                                        <li dangerouslySetInnerHTML={createMarkup(item3.TouchPointName)} />
                                                                    )):null
                                                                }
                                                            </ul>
                                                        </div>            
                                                    ))
                                                ))
                                            }

                                        </div>

                                                                                
                                        {/* Do */}
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData?props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (

                                                            <div className={`box-gray ${i1 == 0? 'box-gray': 'box-gray1'}`}> 
                                                                {i1 == 0 && <div className="grayleft ">
                                                                    <i className="fas fa-cog "></i> <span>Do </span>
                                                                </div>}
                                                                <div className="grayright ">
                                                                    <span>{item1.Do.length}</span>
                                                                </div>
                                                            </div>            

                                                    ))
                                                )):null
                                            }
                                            
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-white ">
                                                        {item1.Do?item1.Do.map((item3,i3) => (
                                                                <ul className="cyclelist ">
                                                                    <li dangerouslySetInnerHTML={createMarkup(item3.SubCategoryText)} />
                                                                </ul>
                                                        )):null}
                                                        </div>            
                                                    ))
                                                ))
                                            }

                                        </div>
                                        
                                        {/* Triggers */}
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        item1.Triggers &&
                                                            <div className={`box-gray ${i1 == 0? 'box-gray': 'box-gray1'}`}> 
                                                                {i1 == 0 && <div className="grayleft ">
                                                                    <i className="fas fa-cog "></i> <span>Triggers </span>
                                                                </div>}
                                                                <div className="grayright ">
                                                                    <span>{item1.Triggers.length}</span>
                                                                </div>
                                                            </div>            
                                                        
                                                    ))
                                                ))
                                            }
                                            
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-white ">
                                                        {item1.Triggers?item1.Triggers.map((item3,i3) => (
                                                                <ul className="cyclelist ">
                                                                    <li dangerouslySetInnerHTML={createMarkup(item3.SubCategoryText)} />
                                                                </ul>
                                                        )):null}
                                                            </div>            
                                                    ))
                                                ))
                                            }

                                        </div>
                                        
                                        {/* Barriers */}
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        item1.Barrier &&
                                                            <div className={`box-gray ${i1 == 0? 'box-gray': 'box-gray1'}`}> 
                                                                {i1 == 0 && <div className="grayleft ">
                                                                    <i className="fas fa-cog "></i> <span>Barriers </span>
                                                                </div>}
                                                                <div className="grayright ">
                                                                    <span>{item1.Barrier.length}</span>
                                                                </div>
                                                            </div>            
                                                        
                                                    ))
                                                ))
                                            }
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-white ">
                                                        {item1.Barrier?item1.Barrier.map((item3,i3) => (
                                                                <ul className="cyclelist ">
                                                                    <li dangerouslySetInnerHTML={createMarkup(item3.SubCategoryText)} />
                                                                </ul>
                                                        )):null}
                                                            </div>            
                                                    ))
                                                ))
                                            }
                                        </div>
                                        
                                        {/* Hacks */}
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        item1.Hacks&&
                                                            <div className={`box-gray ${i1 == 0? 'box-gray': 'box-gray1'}`}> 
                                                                {i1 == 0 && <div className="grayleft ">
                                                                    <i className="fas fa-cog "></i> <span>Hacks </span>
                                                                </div>}
                                                                <div className="grayright ">
                                                                    <span>{item1.Hacks.length}</span>
                                                                </div>
                                                            </div>            

                                                    ))
                                                ))
                                            }
                                            
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-white ">
                                                        {item1.Hacks?item1.Hacks.map((item3,i3) => (
                                                                <ul className="cyclelist ">
                                                                    <li dangerouslySetInnerHTML={createMarkup(item3.SubCategoryText)} />
                                                                </ul>
                                                        )):null}
                                                            </div>            
                                                    ))
                                                ))
                                            }

                                        </div>
                                        
                                        {/* Gains */}
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        item1.Gains&&
                                                            <div className={`box-gray ${i1 == 0? 'box-gray': 'box-gray1'}`}> 
                                                                {i1 == 0 && <div className="grayleft ">
                                                                    <i className="fas fa-cog "></i> <span>Gains </span>
                                                                </div>}
                                                                <div className="grayright ">
                                                                    <span>{item1.Gains.length}</span>
                                                                </div>
                                                            </div>            

                                                    ))
                                                ))
                                            }
                                            
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-white ">
                                                        {item1.Gains?item1.Gains.map((item3,i3) => (
                                                                <ul className="cyclelist ">
                                                                    <li dangerouslySetInnerHTML={createMarkup(item3.SubCategoryText)} />
                                                                </ul>
                                                        )):null}
                                                            </div>            
                                                    ))
                                                ))
                                            }

                                        </div>

                                        {/* Delights */}
                                        <div className="lifecycle-row ">
                                        {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        item1.Delights&&
                                                            <div className={`box-gray ${i1 == 0? 'box-gray': 'box-gray1'}`}> 
                                                                {i1 == 0 && <div className="grayleft ">
                                                                    <i className="fas fa-cog "></i> <span>Delights </span>
                                                                </div>}
                                                                <div className="grayright ">
                                                                    <span>{item1.Delights.length}</span>
                                                                </div>
                                                            </div>            

                                                    ))
                                                ))
                                            }
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-white ">
                                                        {item1.Delights?item1.Delights.map((item3,i3) => (
                                                                <ul className="cyclelist ">
                                                                    <li dangerouslySetInnerHTML={createMarkup(item3.SubCategoryText)} />
                                                                </ul>
                                                        )):null}
                                                            </div>            
                                                    ))
                                                ))
                                            }
                                        </div>
                                        
                                        {/* Pains */}
                                        <div className="lifecycle-row ">
                                        {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        item1.Pains&&
                                                            <div className={`box-gray ${i1 == 0? 'box-gray': 'box-gray1'}`}> 
                                                                {i1 == 0 && <div className="grayleft ">
                                                                    <i className="fas fa-cog "></i> <span>Pains </span>
                                                                </div>}
                                                                <div className="grayright ">
                                                                    <span>{item1.Pains.length}</span>
                                                                </div>
                                                            </div>            

                                                    ))
                                                ))
                                            }
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-white ">
                                                        {item1.Pains?item1.Pains.map((item3,i3) => (
                                                                <ul className="cyclelist ">
                                                                    <li dangerouslySetInnerHTML={createMarkup(item3.SubCategoryText)} />
                                                                </ul>
                                                        )):null}
                                                            </div>            
                                                    ))
                                                ))
                                            }
                                        </div>

                                        {/* Say */}
                                        <div className="lifecycle-row ">
                                        {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        item1.Say&&
                                                            <div className={`box-gray ${i1 == 0? 'box-gray': 'box-gray1'}`}> 
                                                                {i1 == 0 && <div className="grayleft ">
                                                                    <i className="fas fa-cog "></i> <span>Say </span>
                                                                </div>}
                                                                <div className="grayright ">
                                                                    <span>{item1.Say.length}</span>
                                                                </div>
                                                            </div>            

                                                    ))
                                                ))
                                            }
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-white ">
                                                        {item1.Say?item1.Say.map((item3,i3) => (
                                                                <ul className="cyclelist ">
                                                                    <li dangerouslySetInnerHTML={createMarkup(item3.SubCategoryText)} />
                                                                </ul>
                                                        )):null}
                                                            </div>            
                                                    ))
                                                ))
                                            }
                                        </div>

                                        {/* Sight */}
                                        <div className="lifecycle-row ">
                                        {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        item1.Sight&&
                                                            <div className={`box-gray ${i1 == 0? 'box-gray': 'box-gray1'}`}> 
                                                                {i1 == 0 && <div className="grayleft ">
                                                                    <i className="fas fa-cog "></i> <span>Sight </span>
                                                                </div>}
                                                                <div className="grayright ">
                                                                    <span>{item1.Sight.length}</span>
                                                                </div>
                                                            </div>            

                                                    ))
                                                ))
                                            }
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-white ">
                                                        {item1.Sight?item1.Sight.map((item3,i3) => (
                                                                <ul className="cyclelist ">
                                                                <li dangerouslySetInnerHTML={createMarkup(item3.SubCategoryText)} />
                                                                </ul>
                                                        )):null}
                                                            </div>            
                                                    ))
                                                ))
                                            }
                                        </div>
                                        
                                        {/* Thoughts & Feelings */}
                                        <div className="lifecycle-row ">
                                        {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        Object.entries(item1).map(([key, value]) => (
                                                            key == 'Thoughts & Feelings' &&
                                                            
                                                                <div className={`box-gray ${i1 == 0? 'box-gray': 'box-gray1'}`}> 
                                                                    {i1 == 0 && <div className="grayleft ">
                                                                        <i className="fas fa-cog "></i> <span>Thoughts & Feelings </span>
                                                                    </div>}
                                                                    <div className="grayright ">
                                                                        <span>{value.length}</span>
                                                                    </div>
                                                                </div>      

                                                        ))
                                                    ))
                                                ))
                                            }
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-white ">
                                                    {Object.entries(item1).map(([key, value]) => (
                                                        key == 'Thoughts & Feelings' ?
                                                        value.map((item3,i3) => (
                                                                <ul className="cyclelist ">
                                                                <li dangerouslySetInnerHTML={createMarkup(item3.SubCategoryText)} />
                                                                </ul>
                                                        )):null
                                                    ))}
                                                                </div>
                                                    ))
                                                ))
                                            }
                                        </div>

                                        {/* PainPoints */}
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className={`box-gray ${0 == 0? 'box-gray': 'box-gray1'}`}> 
                                                            <div className="grayleft ">
                                                                {i1 == 0 && <><i className="fas fa-cog "></i><span>PainPoints </span></>}
                                                            </div>
                                                            <div className="grayright ">
                                                                <span>{item1.PainPoints.length}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ))
                                            }
                                            
                                        </div>
                                        <div className="lifecycle-row ">
                                            {
                                                props.noeData.map((item,i) => (
                                                    item.LifeCycle.map((item1,i1) => (
                                                        <div className="box-white ">
                                                            <ul className="cyclelist ">
                                                                {
                                                                    item1.PainPoints.length>0?item1.PainPoints.map((item3,i3) => (
                                                                    <li dangerouslySetInnerHTML={createMarkup(item3.PainPointName)} />
                                                                    )):null
                                                                }
                                                            </ul>
                                                        </div>            
                                                    ))
                                                ))
                                            }

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>       
         </>
     )
 }
 export default withRouter(DTNoeScreenBodyDetail);