import React, {Component, Fragment} from 'react';
import ContentEditable from 'react-contenteditable';
import classNames from 'classnames/bind';
import { Editor } from 'react-draft-wysiwyg';
const config = require('../../config.js');

class EmpathyProcessBodyDetail extends Component{
    state={
        number: 1
    }

    componentDidMount(){
        this.props.lifecycleSaveBtn()
    }
    createMarkup(value) {
		return { __html: value };
	}
    stkImg = (id) => {
        const d =this.props.StakeHolder.find(d => d.StakeHolderId == id).Image
        return d;
    }
    render(){
        // let { number } = this.state
        const { data, allempathyLifecycle, selectedDtNoiStk, dtnoiStakeholder,StakeHolder } = this.props;
        console.log("data in lifecycle",data) 
        let number =1;
        return(
            <>
                {/* <!-- Start Body Content --> */}
                <div className="">
                    <div className="tab-content dt-tab-content border-0 tab-content-mx w-100">
                        <div className="tab-pane fade show active" id="process">
                            <div className="row">

                                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 process-user-info-sec pb-0">
                                    <div className="interview-heading d-md-flex justify-content-between py-3 px-3">
                                        <h2>
                                            Process Details
                                            <span className="ml-3">
                                                <a href="" className="active"><i className="fas fa-bars"></i></a>
                                                <a href="" className="ml-2"><i className="fas fa-sitemap"></i></a>
                                            </span>
                                        </h2>
                                        <div>
                                            <a href="#"><i className="fas fa-cloud-download-alt"></i> Download</a>
                                            <a href="#" onClick={() => this.props.addNewLifecycle()} className="ml-3"><i className="fas fa-plus"></i></a>
                                        </div>
                                    </div>
                                    { data.length > 0 &&data.map((d,outerId) =>(
                                    <>
                                    <div className="interview-heading border-0 d-md-flex justify-content-between px-3">
                                    
                                        <div className="dropdown version-drop pt-2">
                                            <a className="btn-drop dropdown-toggle" data-toggle="dropdown">
                                                1.1 {d.LifeCycleName}
                                            </a>
                                            <div className="dropdown-menu ls-dropdown">
                                                {/* {
                                                Object.keys(allempathyLifecycle).map((key,value) => (
                                                    allempathyLifecycle[key]?
                                                    allempathyLifecycle[key].map((item,i) => (
                                                        <p onClick={() => this.props.fetchEmpathyLifeCycle(item.EpicLifeCycleId)}>{item.LifeCycleName}</p>
                                                    ))
                                                    :null
                                                ))
                                                } */}
                                                <div className="version-style">
                                                <p className="d-flex date-txt justify-content-between"><span className="fontbold">1.3 Empathy Map 1 </span><span className="text-success">Active</span> <span
                                                    className="date">06/03/20</span></p>
                                                <p className="d-flex revised-txt justify-content-between"><span>Revised by: Dave Denis</span> <span
                                                    className="selected">Selected</span></p>
                                                </div>
                                                <div className="version-style">
                                                <p className="d-flex date-txt justify-content-between"><span className="fontbold">1.2 Empathy Map 1</span> <span
                                                    className="date">06/03/20</span></p>
                                                <p className="d-flex revised-txt justify-content-between"><span>Revised by: James Denis</span> </p>
                                                </div>
                                                <div className="version-style">
                                                <p className="d-flex date-txt justify-content-between"><span className="fontbold">1.1 Empathy Map 1 </span> <span
                                                    className="date">06/03/20</span></p>
                                                <p className="d-flex revised-txt justify-content-between"><span>Revised by: Steve</span> </p>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        
                                        <div className="pt-3">
                                            <a href="#" className="ml-1"><i className="fas fa-plus"></i> Add a version </a>
                                        </div>
                                        <div className="pt-3">
                                            <a href="#" onClick={() => this.props.createDuplicateLifecycle(d)}>Duplicate</a> |
                                            {
                                                d.LifeCycleId == 0 ?
                                                <a href="#" onClick={() => this.props.removeLifecycle(outerId)} className="mx-1">Delete</a>
                                                :
                                                <a href="#" onClick={() => this.props.deleteLifecycle(d.LifeCycleId)} className="mx-1">Delete</a>
                                            }
                                        </div>
                                    </div>
                                    <div className="process-table-responsive">
                                        <table className="table table-bordered process-table">
                                            <thead className="thead-dark">
                                                <tr className="tableTopTr">
                                                    <td><small>Click on plus sign to add in between stages Problem areas </small>                                                        
                                                    </td>
                                                    {/* loop for showing + button on the top of every stage name */}

                                                    {
                                                        d.Stages.map((item,i) => (
                                                           <Fragment key={i}>
                                                               <td colSpan={item.SubStages?item.SubStages.length:""}>
                                                                   {
                                                                       item.disableAddNewColBtn == 1 ?
                                                                        <a href='javascript:void(0)' className="ml-3">
                                                                            <i className="fas fa-plus"></i>
                                                                        </a>
                                                                       :
                                                                    //    <a href='javascript:void(0)' className="ml-3" onClick={() => this.props.addCommentCol(i,outerId)}>

                                                                        <a href='javascript:void(0)' className="ml-3" onClick={() => this.props.addCommentCol(i,outerId)}>
                                                                            <i className="fas fa-plus"></i>
                                                                        </a>
                                                                   }
                                                                    
                                                                </td>
                                                           </Fragment> 
                                                        ))
                                                    }
                                                                                                   
                                                </tr>
                                                <tr>
                                                    <th>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                        <span className="tbltxt1">Stages</span> <span>
                                                        <a href='javascript:void(0)' onClick={() => this.props.addStages(outerId)}><i className="fas fa-plus"></i></a>
                                                        <a href='javascript:void(0)' onClick={() => this.props.removeStages(outerId)} className="ml-1"><i className="fas fa-minus"></i></a></span>
                                                        </div>
                                                    </th>
                                                    {/* Stage name loop eg. Stage 1, Stage 2 ... */}
                                                    {
                                                        d.Stages.map((item,i) => {
                                                            if(i == 0) number = 1
                                                            return(
                                                           <Fragment key={i}>
                                                               {
                                                                   item.StageName == null ?
                                                                   <th 
                                                                        className={classNames({
                                                                        'active-commentCol' : item.commentCol == 1?true:false
                                                                        })}
                                                                    ></th>
                                                                    :       
                                                                    <th 
                                                                        className={classNames({
                                                                            'activeStage' : this.props.selectedStage == i
                                                                        })}
                                                                        colSpan={item.SubStages?item.SubStages.length:""} 
                                                                        onClick={() => this.props.selectStage(i)}
                                                                    >
                                                                        {
                                                                            item.StageName && <p>Stage {number++}</p>
                                                                        }
                                                                        <p 
                                                                            style={{display: "inline-block"}}
                                                                            contenteditable={item.StageName !== null ? "true":"false"}
                                                                            onClick={(e) => e.stopPropagation()}
                                                                            onBlur={(event) => this.props.updateStageName(event.currentTarget.innerText,i,outerId)}
                                                                            
                                                                        >{item.StageName !== null ? item.StageName:""}</p>
                                                                    </th>
                                                               }
                                                           </Fragment>
                                                        )})
                                                    }

                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                <tr className="substages">
                                                    <td>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span className="tbltxt2">Sub-Stages</span> <span>
                                                        <a href='javascript:void(0)' onClick={() => this.props.addSubStages(outerId)}><i className="fas fa-plus"></i></a>
                                                        <a href='javascript:void(0)' onClick={() => this.props.removeSubStages(outerId)} className="ml-1"><i className="fas fa-minus"></i></a></span>
                                                        </div>
                                                    </td>
                                                    {
                                                        d.Stages.map((item,i) => (
                                                        <Fragment key={i}>
                                                            {
                                                                item.SubStages.length ==0 ?
                                                                <td className={item.commentCol==1 ? 'active-commentCol' : ''}></td>
                                                                :
                                                                item.SubStages.map((subitem,j) => (
                                                                    <Fragment>
                                                                        <td className={this.props.selectedSubstage == j && this.props.selectedStage == i ? 'activeSubStage' : ''}
                                                                            onClick={() => this.props.selectSubstage(j,i)}
                                                                            >
                                                                        <span className="tbltxt3">

                                                                        <ContentEditable
                                                                            html={subitem.SubStageName } 
                                                                            disabled={false}
                                                                            onChange={(event) => this.props.updateSubStageName(event,i, j, outerId)} // handle innerHTML change
                                                                            tagName='span' 
                                                                        />
                                                                        </span></td>        
                                                                    </Fragment>
                                                                ))
                                                            }
                                                            
                                                            {/* <td><span className="tbltxt3">{item.name}</span></td> * this line was commented before */}
                                                        </Fragment> 
                                                        ))
                                                    }
                                                </tr>                                            
                                                <tr>
                                                    <td><span className="tbltxt4">Activities</span></td>
                                                    {
                                                        d.Stages.map((item,i) => (
                                                            <Fragment key={i}>
                                                                {
                                                                    item.SubStages.length == 0 ?
                                                                    <td  className={item.commentCol==1 ? 'active-commentCol' : ''}></td>
                                                                    :
                                                                    item.SubStages.map((subitem,j) => (
                                                                        <Fragment>
                                                                            <td>
                                                                                {
                                                                                    subitem.Categories.map((activity,activityIndex) => (
                                                                                        activity.CategoryName.toLowerCase() == "activities" && 
                                                                                        <>
                                                                                            <a href='javascript:void(0)' style={{float: "right"}} onClick={() => this.props.addNewLine(i, j, activityIndex, outerId)} className="ml-3" ><i className="fas fa-plus"></i></a>
                                                                                            {
                                                                                                activity.CategoryText.map((txt,catTxtInd) => (
                                                                                                    <>
                                                                                                        <div
                                                                                                            contenteditable="true"
                                                                                                            onKeyDown={(e) => this.props.removeLine(e,i, j, activityIndex, outerId,txt.SequenceNumber)}
                                                                                                            // onInput={e => console.log('Text inside div', e.currentTarget.textContent)}
                                                                                                            style={{display: catTxtInd == 0 ? "inline-block" : "", fontSize: "12px"}}
                                                                                                            onBlur={(event) => this.props.updateActivities(event,i, j, activityIndex, outerId,catTxtInd)}
                                                                                                            dangerouslySetInnerHTML={this.createMarkup(txt.Text)}
                                                                                                        />
                                                                                                    </>
                                                                                                ))
                                                                                            }
                                                                                        </>
                                                                                    ))
                                                                                }
                                                                            </td>        
                                                                        </Fragment>
                                                                    ))
                                                                }
                                                            </Fragment> 
                                                        ))
                                                    }
                                                    

                                                </tr>

                                                <tr className="bg-gray">
                                                    <td><span className="tbltxt4">Touchpoints</span></td>
                                                    {
                                                        d.Stages.map((item,i) => (
                                                            <Fragment key={i}>
                                                                {
                                                                    item.SubStages.length == 0?
                                                                    <td  className={item.commentCol==1 ? 'active-commentCol' : ''}></td>
                                                                    :
                                                                    item.SubStages.map((subitem,j) => (
                                                                        <Fragment>
                                                                            <td>
                                                                                {
                                                                                    subitem.Categories.map((touchpoint,touchpointIndex) => (
                                                                                        touchpoint.CategoryName.toLowerCase() == "touchpoints" &&
                                                                                        <>
                                                                                        <a href='javascript:void(0)' style={{float: "right"}} onClick={() => this.props.addNewLine(i, j, touchpointIndex, outerId)} className="ml-3" ><i className="fas fa-plus"></i></a>
                                                                                        {
                                                                                        touchpoint.CategoryText.map((txt,catTxtInd) => (
                                                                                            <>
                                                                                                <div 
                                                                                                    contenteditable="true"
                                                                                                    onKeyDown={(e) => this.props.removeLine(e,i, j, touchpointIndex, outerId,txt.SequenceNumber)}
                                                                                                    style={{fontSize: "12px",display: catTxtInd == 0 ? "inline-block" : ""}}
                                                                                                    onBlur={(event) => this.props.updateTouchpoints(event.target.innerHTML,i, j, touchpointIndex,outerId,catTxtInd)}
                                                                                                    dangerouslySetInnerHTML={this.createMarkup(txt.Text)}
                                                                                                />
                                                                                            </>
                                                                                        ))
                                                                                        }
                                                                                        </>
                                                                                    ))
                                                                                }
                                                                            </td>        
                                                                        </Fragment>
                                                                    ))
                                                                }
                                                            </Fragment> 
                                                        ))
                                                    }                                                    
                                                </tr>
                                                

                                                <tr>
                                                    <td><span className="tbltxt5">Impactor</span></td>
                                                    {
                                                        d.Stages.map((item,i) => (
                                                            <Fragment key={i}>
                                                                {
                                                                    item.SubStages.length == 0 ?
                                                                    <td 
                                                                        className={item.commentCol ==1 ? 'active-commentCol' : ''}></td>
                                                                    :
                                                                    item.SubStages.map((subitem,j) => (
                                                                        <Fragment>
                                                                            <td
                                                                                // style={{display: "flex"}}
                                                                                // className="h"
                                                                                onDragOver={e => e.preventDefault() }
                                                                                onDrop={e => this.props.dropStakeholder(e,i,j,outerId)}
                                                                            >
                                                                                {
                                                                                subitem.Categories.map((user,impactorIndex) => (
                                                                                    user.CategoryName.toLowerCase() == "impactor" &&
                                                                                    <>          
                                                                                    {
                                                                                        user.CategoryText &&
                                                                                        user.CategoryText.map((img,catTextInd) => (
                                                                                            <div className="process-sm-img" style={{display: "contents"}} data-toggle="modal" data-target="#stakeholderModal">
                                                                                                <img 
                                                                                                    className="mr-3 img-fluid" 
                                                                                                    onClick={() => this.props.fetchDtNoiStkhldrDetail(img)}
                                                                                                    onMouseDown={ (e) => this.props.removeLifecycleStakeholder(e,img.Id,i,j,impactorIndex,catTextInd,outerId,"impactor")}
                                                                                                    style={{height: '40px', width: '40px'}} 
                                                                                                    src={(img.ImagePath !== null && img.ImagePath !== "")?img.ImagePath:require('../../common/images/login_image.png')} alt=""/>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                 
                                                                                    </>
                                                                                ))
                                                                                }
                                                                            </td>        
                                                                        </Fragment>
                                                                    ))
                                                                }
                                                            </Fragment> 
                                                        ))
                                                    }
                                                </tr>
                                                <tr>
                                                    <td><span className="tbltxt5">Impactee</span></td>
                                                    {
                                                        d.Stages.map((item,i) => (
                                                            <Fragment key={i}>
                                                                {
                                                                    item.SubStages.length == 0?
                                                                    <td className={item.commentCol==1 ? 'active-commentCol' : ''}></td>
                                                                    :
                                                                    item.SubStages.map((subitem,j) => (
                                                                        <Fragment>
                                                                            <td
                                                                                // style={{display: "flex"}}
                                                                                className="h"
                                                                                onDragOver={e => e.preventDefault() }
                                                                                onDrop={e => this.props.dropStakeholderInimpactee(e,i,j,outerId)}
                                                                            >
                                                                                {
                                                                                subitem.Categories.map((user,impacteeIndex) => (
                                                                                    user.CategoryName.toLowerCase() == 'impactee' &&
                                                                                    <>          
                                                                                    {
                                                                                        user.CategoryText &&
                                                                                        user.CategoryText.map((img,catTextInd) => (
                                                                                            <div className="process-sm-img" style={{display: "contents"}} data-toggle="modal" data-target="#stakeholderModal">
                                                                                                <img 
                                                                                                    className="mr-3 img-fluid" 
                                                                                                    onClick={() => this.props.fetchDtNoiStkhldrDetail(img)}
                                                                                                    style={{height: '40px', width: '40px'}}
                                                                                                    onMouseDown={ (e) => this.props.removeLifecycleStakeholder(e,img.Id,i,j,impacteeIndex,catTextInd,outerId,"impactee")} 
                                                                                                    src={(img.ImagePath != null && img.ImagePath != "")?img.ImagePath:require('../../common/images/login_image.png')} alt=""/>
                                                                                            </div>
                                                                                        ))
                                                                                    }
                                                                                 
                                                                                    </>
                                                                                ))
                                                                                }
                                                                            </td>        
                                                                        </Fragment>
                                                                    ))
                                                                }
                                                            </Fragment> 
                                                        ))
                                                    }
                                                </tr>
                                                <tr className="bg-gray">
                                                    <td><span className="tbltxt4">Painpoints</span></td>
                                                    {
                                                        d.Stages.map((item,i) => (
                                                            <Fragment key={i}>
                                                                {
                                                                    item.SubStages.length == 0?
                                                                    <td className={item.commentCol==1 ? 'active-commentCol' : ''}></td>
                                                                    :
                                                                    item.SubStages.map((subitem,j) => (
                                                                        <Fragment>
                                                                            <td>
                                                                                {
                                                                                    subitem.Categories.map((painpoint,painpointIndex) => (
                                                                                        painpoint.CategoryName.toLowerCase() == "painpoints" &&
                                                                                        <>
                                                                                        <a href='javascript:void(0)' style={{float: "right"}} onClick={() => this.props.addNewLine(i, j, painpointIndex, outerId)} className="ml-3" ><i className="fas fa-plus"></i></a>
                                                                                        {
                                                                                        painpoint.CategoryText.map((txt,catTxtInd) => (
                                                                                            <>
                                                                                                <div 
                                                                                                    contenteditable="true"
                                                                                                    onKeyDown={(e) => this.props.removeLine(e,i, j, painpointIndex, outerId,txt.SequenceNumber)}
                                                                                                    style={{fontSize: "12px",display: catTxtInd == 0 ? "inline-block" : ""}}
                                                                                                    onBlur={(event) => this.props.updatePainpoints(event.target.innerHTML,i, j, painpointIndex,outerId,catTxtInd)}
                                                                                                    dangerouslySetInnerHTML={this.createMarkup(txt.Text)}
                                                                                                />
                                                                                            </>
                                                                                        ))
                                                                                        }
                                                                                        </>
                                                                                    ))
                                                                                }
                                                                            </td>        
                                                                        </Fragment>
                                                                    ))
                                                                }
                                                            </Fragment> 
                                                        ))
                                                    }
                                                    
                                                </tr>
                                                <tr>
                                                    <td><span className="tbltxt4">Opportunities</span></td>
                                                    {
                                                        d.Stages.map((item,i) => (
                                                            <Fragment key={i}>
                                                                {
                                                                    item.SubStages.length == 0?
                                                                    <td  className={item.commentCol==1 ? 'active-commentCol' : ''}></td>
                                                                    :
                                                                    item.SubStages.map((subitem,j) => (
                                                                        <Fragment>
                                                                            <td>
                                                                                {
                                                                                    subitem.Categories.map((opportunity,oppertunityIndex) => (
                                                                                        opportunity.CategoryName.toLowerCase() == "opportunities" &&
                                                                                        <>
                                                                                        <a href='javascript:void(0)' style={{float: "right"}} onClick={() => this.props.addNewLine(i, j, oppertunityIndex, outerId)} className="ml-3" ><i className="fas fa-plus"></i></a>
                                                                                        {
                                                                                        opportunity.CategoryText.map((txt,catTxtInd) => (
                                                                                            <>
                                                                                                <div 
                                                                                                    contenteditable="true"
                                                                                                    onKeyDown={(e) => this.props.removeLine(e,i, j, oppertunityIndex, outerId,txt.SequenceNumber)}
                                                                                                    style={{fontSize: "12px",display: catTxtInd == 0 ? "inline-block" : ""}}
                                                                                                    onBlur={(event) => this.props.updateOpportunities(event.target.innerHTML,i, j, oppertunityIndex,outerId,catTxtInd)}
                                                                                                    dangerouslySetInnerHTML={this.createMarkup(txt.Text)}
                                                                                                />
                                                                                            </>
                                                                                        ))
                                                                                        }
                                                                                        </>
                                                                                    ))
                                                                                }
                                                                            </td>        
                                                                        </Fragment>
                                                                    ))
                                                                }
                                                            </Fragment> 
                                                        ))
                                                    }
                                                    
                                                </tr>
                                            
                                            </tbody>
                                        </table>
                                    </div>
                                    </>
                                    ))    
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div className="modal stakmodal" id="stakeholderModal">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <a className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true"><img src={require("../../common/images/close-icon.png")} alt="" /></span>
                                    </a>
                                </div>
                                <div className="modal-body pt-0">
                                    <div className="popup-responsive">
                                        <div className="media border-0 pb-3">
                                            <img className="mr-3" src={(selectedDtNoiStk.Image != null && selectedDtNoiStk.image!="")?config.ApiBaseUrl+"StakeHoldersImages/"+selectedDtNoiStk.Image:require('../../common/images/login_image.png')} alt=""/>
                                            <div className="media-body text-left">
                                                <h5 className="mt-0">{selectedDtNoiStk.StakeHolderName}</h5>
                                                <p>{selectedDtNoiStk.StakeHolderType}</p>
                                                <p><span>Sphere A - Immediate - 2 Connections</span></p>
                                            </div>
                                        </div>
                                        <div>
                                            <ul className="nav nav-tabs mb-3" role="tablist">
                                                    <li className="nav-item">
                                                    <a className="nav-link active" data-toggle="tab" href="#tab1" role="tab">Connections</a>
                                                    </li>
                                                    <li className="nav-item">
                                                            <a className="nav-link" data-toggle="tab" href="#tab2" role="tab">Processes</a>
                                                    </li>
                                                    <li className="nav-item">
                                                            <a className="nav-link" data-toggle="tab" href="#tab3" role="tab">Touchpoints</a>
                                                    </li>
                                            
                                                {/* <li><a data-toggle="tab" href="#tab1">Connections</a></li>
                                                <li><a data-toggle="tab" href="#tab2">Processes</a></li>
                                                <li><a data-toggle="tab" href="#tab3">Touchpoints</a></li> */}
                                            </ul>

                                            <div className="tab-content">
                                                <div id="tab1" className="tab-pane in active">
                                                    <div className="connections">
                                                        {/* <h3>Connections</h3> */}
                                                        {
                                                            dtnoiStakeholder.length>0?dtnoiStakeholder.map((item,i) => (
                                                                <div className="border-bottom pb-3 mb-3">
                                                                    <div className="impact-block">
                                                                        <p>
                                                                            {StakeHolder.find(d => d.StakeHolderId == item.FromStakeholderID)?StakeHolder.find(d => d.StakeHolderId == item.FromStakeholderID).StakeHolderName : ''}
                                                                            <span className="d-block">Role</span>
                                                                        </p>
                                                                        <div className="d-flex align-items-center impct">
                                                                            <span>Impact</span>
                                                                            <select className="custom-select">
                                                                                <option selected>Medium</option>
                                                                                <option selected>Low</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="influence-block">
                                                                        <div className="mr-3">
                                                                            <p className="m-0"><strong>Influence</strong></p>
                                                                        </div>
                                                                        <div className="dropdown mr-3">
                                                                            <a className="dropdown-toggle pl-3" data-toggle="dropdown">
                                                                                <img className="img-fluid" src={require("../../common/images/arrow1.png")} alt=""/>
                                                                            </a>

                                                                            <div className="dropdown-menu">
                                                                                <a className="d-block" href="#!"> <img className="img-fluid"
                                                                                        src={require("../../common/images/arrow2.png")} alt=""/></a>
                                                                                <a className="d-block" href="#!"> <img className="img-fluid"
                                                                                        src={require("../../common/images/arrow1.png")} alt=""/></a>
                                                                                <a className="d-block" href="#!"> <img className="img-fluid"
                                                                                        src={require("../../common/images/arrow3.png")} alt=""/></a>
                                                                            </div>

                                                                        </div>
                                                                        <div className="mr-3 arrow-lg">
                                                                            <img className="img-fluid" src={require("../../common/images/arrow4.png")} alt=""/>
                                                                            <p>Has Influence</p>
                                                                        </div>
                                                                        <div>

                                                                            {/* src={require("../../common/images/LogIn_image.png")}  */}
                                                                            <img 
                                                                                src={(this.stkImg(item.ToStakeholderID) != null && this.stkImg(item.ToStakeholderID)!="")?config.ApiBaseUrl+"StakeHoldersImages/"+this.stkImg(item.ToStakeholderID):require('../../common/images/login_image.png')}
                                                                                className="influence-img" 
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                            : null                                                            
                                                        }
                                                    </div>

                                                    <div className="add-comment pb-3">
                                                        <h3>Add Comment</h3>
                                                        <textarea></textarea>
                                                    </div>
                                                </div>
                                                <div id="tab2" className="tab-pane fade">
                                                    <div className="add-comment pb-3">
                                                        <Editor
                                                            // editorState={props.fixedSectionState}
                                                            wrapperClassName="demo-wrapper"
                                                            editorClassName="demo-editor"
                                                            // onEditorStateChange={() => props.onFixedSectionStateChange()}
                                                        />
                                                    </div>
                                                </div>
                                                <div id="tab3" className="tab-pane fade">
                                                    <div className="add-comment pb-3">
                                                        <Editor
                                                            // editorState={props.fixedSectionState}
                                                            wrapperClassName="demo-wrapper"
                                                            editorClassName="demo-editor"
                                                            // onEditorStateChange={() => props.onFixedSectionStateChange()}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div> 
                {/* <!-- End Body Content --> */}
            </>
        );
    } 
} 

export default EmpathyProcessBodyDetail;