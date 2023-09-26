import React from 'react';
import { Link } from 'react-router-dom';
import { DesignThinkingEpicDetailScreenWrapper } from './Styling/DesignThinkingEpicDetailScreen'
const selectTemplate = (e,props,id) =>props.selectTemplate(e,id);
const DesignThinkingEpicDetailNoiModal = props => {
    // console.log(props.currentSelectedTemplate)
    let networkList = props.NetworkOfInfluence.map((item,index) =>{
        return(
            <div key={index} className={props.currentSelectedTemplate.Id == item.Id ? "network-search-list active" : "network-search-list"} onClick={e => selectTemplate(e,props,item)} >
                  <h3 style={{fontSize:"medium"}}>{item.Title}</h3>
                {/* <p style={{fontSize:"smaller"}}>Version 1, by Dave Denis</p> */}
             </div>
            )
        })
    return(
        <DesignThinkingEpicDetailScreenWrapper >
            <div className="modal noiModal" id="noiModal">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title">{props.allEpic[0]?.NOI?.TemplateNoiName}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"><img src={ require('../../common/images/close-icon.png') } alt=""/></span>
                    </button>
                    </div>
                    <div className="modal-body">
                    <div className="row">
                        {/* <div className="col-sm-4 pr-0">
                        <div className="search-box">
                            <div className="search-area">
                            <h2 style={{fontSize:"medium"}}>NOIs <Link className="float-right" to={"/dt-stakeholdersview"} target="_blank"><i className="fas fa-plus float-right"></i></Link></h2>
                            <div className="form-group has-search m-0">
                                <input type="text" className="form-control" placeholder="" value={props.NOISearchTerm} onChange={(e)=>props.setNOISearchTerm(e.target.value)} />
                                <span className="fa fa-search form-control-feedback"></span>
                            </div>
                            </div>
                            {networkList}
                        </div>
                        </div> */}
                        <div className="col-sm-8 bg-gray pl-0 offset-2 text-center">
                        <img className="img-fluid" src={ props.allEpic[0]?.NOI?.NOIImageURL||require('../../common/images/circle.png') } alt=""/>
                        </div>
                    </div>
                    </div>
                    {/* <div className="modal-footer">
                    <Link className="btn btn-link mr-auto" to={"/dt-stakeholdersview"} target="_blank">Create New</Link>
                    <button type="button" className="btn btn-link" data-dismiss="modal" onClick={()=>props.cancelTemplatePopUpHandler()}>Cancel</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" disabled={Object.keys(props.currentSelectedTemplate).length > 0?false:true} onClick={()=>props.saveSelectedtemplate()}>SELECT TEMPLATE</button>
                    </div> */}
                </div>
                </div>
            </div>
        </DesignThinkingEpicDetailScreenWrapper>
    );
}

export default DesignThinkingEpicDetailNoiModal;