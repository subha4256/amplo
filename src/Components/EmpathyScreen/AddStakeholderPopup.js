import React from 'react';
const config = require('../../config.js');
const searchStakeholders = (e,props) => props.searchStakeholders(e);
const addStakeholderModel = props => {
    

    let StackHolderLists = props.StackHolder.map((item,index) =>{
        return(
            <div key={index} onClick={() => props.selectStakeholder(item)} className="media mb-4 px-3">
                <img className="mr-3 img-fluid" style={{height: '50px', width: '50px'}} src={(item.Image != null && item.image!="")?config.ApiBaseUrl+"StakeHoldersImages/"+item.Image:require('../../common/images/login_image.png')} alt=""/>
                <div className="media-body">
                    <h5 className="mt-0">{item.StakeHolderName}</h5>
                    <p>{item.StakeHolderType}</p>
                </div>
            </div>
        )
    })
    return(
            <div className="modal noiModal" id="addStakeholderModal">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">Select Stakeholder for Interview</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><img src={ require('../../common/images/close-icon.png') } alt=""/></span>
                    </button>
                    </div>
                    <div className="modal-body">
                    <div className="row">
                        <div className="col-sm-4 pr-0">
                        <div className="search-box">
                            <div className="search-area">
                            <div className="form-group has-search m-0">
                                <input type="text" className="form-control" placeholder="" onChange={(e) => searchStakeholders(e,props)}/>
                                <span className="fa fa-search form-control-feedback"></span>
                            </div>
                            </div>
                            {StackHolderLists}
                        </div>
                        </div>
                        <div className="col-sm-8 bg-gray pl-0 text-center">
                            <h3>Selected Stakeholders</h3>
                            <ul>
                                {
                                    props.selectedStakeholders.length > 0 &&
                                    props.selectedStakeholders.map((item,i) => (
                                        <li>
                                            <p>{item.StakeHolderName}</p>
                                        </li>
                                    ))
                                }
                                
                            </ul>  
                        </div>
                    </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-link" data-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal">Save</button>
                    </div>
                </div>
                </div>
            </div>
    );
}

export default addStakeholderModel;