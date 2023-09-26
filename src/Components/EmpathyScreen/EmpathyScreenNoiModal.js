import React from 'react';
import { DesignThinkingEpicDetailScreenWrapper } from './Styling/EmpathyScreen'
const selectTemplate = (e,props,id) =>props.selectTemplate(e,id);

const EmpathyScreenNoiModal = props => {
    
    console.log('---->'+props.selectedEpic); 
    console.log(props.allEpic);

    const data = props.allEpic.filter(function (item) {
        return item.id == props.selectedEpic;
    });
    console.log(data);


    let animationClasses = (props.animate ? ' active': '');
    
    let networkList = props.NetworkOfInfluence.map((item,index) =>{
        
        return(
            <div key={index} className="network-search-list" onClick={e => selectTemplate(e,props,item)} >
                <h3>{item.Title}</h3>
                <p>Version 1, by Dave Denis</p>
            </div>
        )
     
        

    })
    return(
        <DesignThinkingEpicDetailScreenWrapper >
            <div className="modal noiModal" id="noiModal">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">Select Network for Influence</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><img src={ require('../../common/images/close-icon.png') } alt=""/></span>
                    </button>
                    </div>
                    <div className="modal-body">
                    <div className="row">
                        <div className="col-sm-4 pr-0">
                        <div className="search-box">
                            <div className="search-area">
                            <h2>NOIs <i className="fas fa-plus float-right"></i></h2>
                            <div className="form-group has-search m-0">
                                <input type="text" className="form-control" placeholder=""/>
                                <span className="fa fa-search form-control-feedback"></span>
                            </div>
                            </div>
                            {networkList}
                        </div>
                        </div>
                        <div className="col-sm-8 bg-gray pl-0 text-center">
                        <img className="img-fluid" src={ require('../../common/images/circle.png') } alt=""/>
                        </div>
                    </div>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-link mr-auto">Create New</button>
                    <button type="button" className="btn btn-link" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary">SELECT TEMPLATE</button>
                    </div>
                </div>
                </div>
            </div>
        </DesignThinkingEpicDetailScreenWrapper>
    );
}

export default EmpathyScreenNoiModal;