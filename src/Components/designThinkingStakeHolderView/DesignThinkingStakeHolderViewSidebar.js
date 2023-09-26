import React from 'react';
const config = require('../../config.js');

const DesignThinkingStakeHolderViewSidebar = (props) => {
    let stakelist = [];
    if(props.stakeholderssearch !== ''){
        stakelist = [...props.stakeholders];
        stakelist = stakelist.filter((sholder)=>{
            let Name = sholder.StakeHolderName ? sholder.StakeHolderName.toLowerCase() : "";
            let StakeHolderType = (props.filters.StakeHolderType === true) ? sholder.StakeHolderType.toLowerCase() : "";
            let Location = (props.filters.Location === true) ? sholder.Location.toLowerCase() : "";
            return Name.includes(props.stakeholderssearch.toLowerCase()) || StakeHolderType.includes(props.stakeholderssearch.toLowerCase()) || Location.includes(props.stakeholderssearch.toLowerCase());
        })
    }
    stakelist = stakelist.map((item)=>{
        return(
            <li key={item.StakeHolderId} id={item.StakeHolderId} className="stakeholderdrag" onClick={()=>props.stakeHolderListClickHandler(item.StakeHolderId,item.StakeHolderName,item.StakeHolderType,(item.Image != null && item.image!="")?config.ApiBaseUrl+"StakeHoldersImages/"+item.Image:null)} draggable={true} onDragStart={(e)=>{props.stakeholderDragStart(e,{id : item.StakeHolderId,name : item.StakeHolderName,type : item.StakeHolderType,image : (item.Image != null && item.image!="")?config.ApiBaseUrl+"StakeHoldersImages/"+item.Image:null})}} >
                <div className="media no-pointer-event" >
                <img className="mr-3 img-fluid no-pointer-event" src={(item.Image != null && item.image!="")?config.ApiBaseUrl+"StakeHoldersImages/"+item.Image:require('../../common/images/login_image.png')} alt=""  />
                <div className="media-body text-left no-pointer-event" >
                    <h5 className="mt-0 no-pointer-event ">{item.StakeHolderName}</h5>
                    <p className="no-pointer-event">{item.StakeHolderType}</p>
                </div>
                </div>
            </li>
        ); 
    })
    return(
        <div className="dt-left-nav-bar">
            <ul className="dt-left-list stake-list">
                <li className="btn-group dropright border-bottom">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <i className="fas fa-plus"></i>
                    </a>
                    <div className="dropdown-menu" style={{maxHeight:"500px",overflowY:"scroll"}}>
                        <h2>Add Stakeholder
                            <button type="button" className="close" data-dismiss="dropdown-menu" aria-label="Close">
                                <span aria-hidden="true">
                                    <img src={ require('../../common/images/close-icon.png') } alt="" />
                                        </span>
                            </button>
                        </h2>
                        <div className="search-area">
                            <div className="form-group has-search">
                                <input type="text" className="form-control" placeholder="Search" onChange={(e)=>props.search(e)} />
                                <span className="form-control-feedback">
                                    <img src={ require('../../common/images/search-icon.png') } alt="" />
                                </span>
                            </div>
                        </div>
                        <div className="filter-box">
                            <h3>Filter By</h3>
                            <div className="search-btn">
                                <a className={(props.filters.StakeHolderType === true)?"btn-gray active":"btn-gray"} id="StakeHolderType" onClick={props.searchFilterHandler}>
                                    <span className="btn-txt" style={{pointerEvents:"none"}}>
                                        <img src={ require('../../common/images/search-icon.png') } alt="" />
                                    </span> 
                                    <span style={{pointerEvents:"none"}}>Stakeholder Type</span>
                                </a>
                                <a className={(props.filters.DepartmentType === true)?"btn-gray active":"btn-gray"} id="DepartmentType" onClick={props.searchFilterHandler}>
                                    <span className="btn-txt" style={{pointerEvents:"none"}}>
                                        <img src={ require('../../common/images/search-icon.png') } alt="" />
                                    </span> 
                                    <span style={{pointerEvents:"none"}}>Department Type</span>
                                </a>
                                <a className={(props.filters.Location === true)?"btn-gray active":"btn-gray"} id="Location" onClick={props.searchFilterHandler}>
                                    <span className="btn-txt" style={{pointerEvents:"none"}}>
                                        <img src= { require('../../common/images/search-icon.png') } alt="" />
                                    </span> 
                                    <span style={{pointerEvents:"none"}}>Location</span>
                                </a>
                            </div>
                        </div>
                        <div className="search-list1">
                            <ul>
                            {stakelist.length ? stakelist :
                                props.stakeholders.map((item) => (
                                       <li key={item.StakeHolderId} id={item.StakeHolderId} className="stakeholderdrag" onClick={()=>props.stakeHolderListClickHandler(item.StakeHolderId,item.StakeHolderName,item.StakeHolderType,(item.Image != null && item.image!="")?config.ApiBaseUrl+"StakeHoldersImages/"+item.Image:null)} draggable={true} onDragStart={(e)=>{props.stakeholderDragStart(e,{id : item.StakeHolderId,name : item.StakeHolderName,type : item.StakeHolderType,image : (item.Image != null && item.image!="")?config.ApiBaseUrl+"StakeHoldersImages/"+item.Image:null})}} >
                                       <div className="media no-pointer-event" >
                                       <img className="mr-3 img-fluid no-pointer-event" src={(item.Image != null && item.image!="")?config.ApiBaseUrl+"StakeHoldersImages/"+item.Image:require('../../common/images/login_image.png')} alt=""  />
                                       <div className="media-body text-left no-pointer-event" >
                                           <h5 className="mt-0 no-pointer-event ">{item.StakeHolderName}</h5>
                                           <p className="no-pointer-event">{item.StakeHolderType}</p>
                                       </div>
                                       </div>
                                   </li>
                                )) }
                            </ul>
                        </div>
                    </div>
                </li>
                <li className="dropright arrow-list">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <img className="mr-3 img-fluid" src={ require('../../common/images/arrow-icon.png') } alt="" />
                    </a>
                    <div className="dropdown-menu">
                        <h2>Influence</h2>
                        <div className="d-flex justify-content-between">
                            <div className="arrow-type">
                                <a href="#" className={(props.influence === "hasInfluenced")?"active":""} onClick={(e) => props.arrowClick(e)} id="hasInfluenced">
                                    <img className="img-fluid" src={ require('../../common/images/arrow1.png') } alt="" />
                                </a>
                                <p>Has Influence</p>
                            </div>
                            <div className="arrow-type">
                                <a href="#" onClick={(e) => props.arrowClick(e)} className={(props.influence === "isInfluenced")?"active":""} id="isInfluenced">
                                    <img className="img-fluid" src={ require('../../common/images/arrow2.png') }  alt="" />
                                </a>
                                <p>Is Influenced</p>
                            </div>
                            <div className="arrow-type">
                                <a href="#" onClick={(e) => props.arrowClick(e)} className={(props.influence === "equalInfluenced")?"active":""} id="equalInfluenced">
                                    <img className="img-fluid" src={ require('../../common/images/arrow3.png') } alt="" />
                                </a>
                                <p>Equal Influence</p>
                            </div>
                        </div>
                        <h2>Impact</h2>
                        <div className="d-flex justify-content-between">
                            <div className="arrow-type">
                                <a href="#" id="impactLow" className={(props.impact === "impactLow")?"active":""} onClick={(e) => props.arrowImpactClickHandler(e)}>
                                    <img className="img-fluid" src={ require('../../common/images/line1.png') } alt="" />
                                </a>
                                <p>Low</p>
                            </div>
                            <div className="arrow-type">
                                <a href="#" className={(props.impact === "impactMedium")?"active":""} id="impactMedium" onClick={(e) => props.arrowImpactClickHandler(e)}>
                                    <img className="img-fluid" src={ require('../../common/images/line2.png') } alt="" />
                                </a>
                                <p>Medium</p>
                            </div>
                            <div className="arrow-type">
                                <a href="#" className={(props.impact === "impactStrong")?"active":""} id="impactStrong" onClick={(e) => props.arrowImpactClickHandler(e)}>
                                    <img className="img-fluid" src={ require('../../common/images/line3.png') } alt="" />
                                </a>
                                <p>Strong</p>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}


export default DesignThinkingStakeHolderViewSidebar;