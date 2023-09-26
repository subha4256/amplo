import React, {useState} from 'react';
import {Link} from 'react-router-dom';
const config = require('../../config.js');
const searchStakeholders = (e,props) => props.searchStakeholders(e);

const DesignThinkingEpicRightSidebar = props => {


    let UserProjects = props.UserProjectDetails.map((item) => {
        return(<p><Link to='#'>{item.ProjectTitle?item.ProjectTitle:""}</Link></p>)
    })

    let StackHolderLists = props.StackHolder.map((item,index) =>{
        return(
            <div key={index} className="media mb-4 px-3">
            <img 
                className="mr-3 img-fluid" 
                src={(item.Image != null && item.Image != "")?config.ApiBaseUrl+"StakeHoldersImages/"+item.Image:require('../../common/images/login_image.png')} alt=""/>
                {/* src={item.Image?item.Image:""} 
                alt=""/> */}
            <div className="media-body">
                <h5 className="mt-0">{item.StakeHolderName}</h5>
                <p>{item.StakeHolderType}</p>
            </div>
            </div>
        )
    })



    let data;
    if(props.epicdata == 1 ){
        data = 'View/Edit NOI';
    }else{
        data = 'Create Noi';
    }
    
    return(
        <>
        {/* <!-- Start Right Panel --> */}
        <div className="bg-white dt-right-panel">
            <div id="accordion" className="accordion">
                <div className="card mb-0">
                    <div className="card-header" data-toggle="collapse" href="#champion">
                        <a className="card-title">
                            DT Champion
                        </a>
                    </div>
                    <div id="champion" className="card-body collapse show">
                        <div className="media">
                            {
                                props.DtChampion.length>0?
                                props.DtChampion.map(item => (
                                    <>
                                        <img className="mr-3 img-fluid" src={(item.ImagePath != null && item.ImagePath!="")?config.ApiBaseUrl+"StakeHoldersImages/"+item.ImagePath:require('../../common/images/login_image.png')} alt=""/>
                                        <div className="media-body">
                                            <h5 className="mt-0">{item.Name}</h5>
                                            <p>{item.EmailAddress}</p>
                                        </div>
                                    </>
                                )): null
                            }
                        </div>
                        <div className="link-txt p-3">
                            <p>Past Design Thinking Sessions: </p>
                            {/* {UserProjects} */}
                        </div>
                    </div>
                    <div className="card-header" data-toggle="collapse" href="#nois">
                        <a className="card-title">
                            NOIs
                        </a>
                    </div>
                    <div id="nois" className="card-body collapse show">
                        <p className="px-3">Associate a Network of Influence for Improve Warehousing DT Project</p>
                        <div className="p-3 bg-gray">
                            <img className="img-fluid" src={ require('../../common/images/circle-sm.png') }alt=""/>
                        </div>
                        <div className="px-3">
                            <button type="button" className="btn btn-outline-primary btn-block" data-toggle="modal"
                            data-target="#noiModal" disabled={props.selectedEpic?false:true}>{props.selectedEpic?data:"Please select an Epic First"}</button>
                        </div>
                    </div>
                <div className="card-header" data-toggle="collapse" href="#associated">
                <a className="card-title">
                    Associated Stakeholders
                </a>
                </div>
                <div id="associated" className="collapse show">
                <div className="card-body">
                    <div className="form-group has-search">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder=""
                        value={props.searchTerm}
                        onChange={(e) => searchStakeholders(e,props)}
                    />
                    <span className="fa fa-search form-control-feedback"></span>
                    </div>
                    {StackHolderLists}
                </div>
                </div>
            </div>
        </div>

        </div>
            {/* <!-- End Right Panel --> */}
        </>
    )
}

export default DesignThinkingEpicRightSidebar;