import React, { useState } from "react";
import { connect } from 'react-redux';
import { Global } from '../../utils/Env';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import axios from 'axios';
import { saveProjectDomains,deleteProjectDomains, setProjectSelectedDomain,getQBDomainsForEdit } from '../../actions/questionaireActions';
import { getLock } from '../../actions/iotActions';
import CacheStorage from '../../utils/CacheStorage';
const config = require('../../config');

const QuestionsAddDomain = props => {

    const getDomains=async ()=> {
        
        let dObj = {
            projectId: props.projectId
        }
        props.getQBDomainsForEdit(dObj);
        
        props.getLock( dObj.projectId )
    }

    Global.callback.saveprojectdomains_onComplete = () => {
        getDomains();
        setselectedDomainForEdit({});
        setaddNewDomainName("");
    }

    Global.callback.deleteprojectdomain_onComplete = () => {
        getDomains();
    }

    const [addNewDomainName, setaddNewDomainName] = useState('');
    const [selectedDomainForEdit, setselectedDomainForEdit] = useState({});

    const deleteDomainHandler = (domId) => {
        confirmAlert({
            title: 'Confirm to continue',
            message: 'Are you sure to delete this Domain ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        props.deleteProjectDomains({"projectId":props.projectId,"domainId":domId})
                        if(props.currentDomain.DomainID == domId){
                            props.setProjectSelectedDomain({})
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        }); 
    }

    const saveNewDomainHandler = () => {
        const saveObj = {
            "BenchmarkProjectId":props.projectId,
            "DomainId":Object.keys(selectedDomainForEdit).length > 0?selectedDomainForEdit.DomainID:0,
            "DomainName":addNewDomainName
        }
            props.saveProjectDomains(saveObj);
    }

    return(
        <div className="modal" id="addDomains" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Add Domain</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Enter Domain Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="" 
                                value={addNewDomainName}
                                onChange={(e)=>setaddNewDomainName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Select from Existing Domains</label>
                            <div className="dropdown copydropdown">
                                <div className="dropfield dropleft">
                                    {Object.keys(selectedDomainForEdit).length > 0?<span><i className="fas fa-times" onClick={()=>{setselectedDomainForEdit({}); setaddNewDomainName("")}}></i>{selectedDomainForEdit.DomainName}</span>:""}
                                    <div className="dropdown-toggle float-right" data-toggle="dropdown"><i
                                            className="fas fa-bars"></i></div>
                                    <div className="dropdown-menu p-0">
                                        {/* <div className="form-group border-bottom mb-2"><input type="text"
                                                className="form-control searchbox" placeholder="Search" /></div> */}
                                        <div className="disabled-date"><span>Domain Name</span> <span>&nbsp;</span>
                                        </div>
                                        <div className="dropheight">
                                            {props.Domains && props.Domains.map(dom=>{
                                                return(
                                                    <div className="custom-control custom-radio ml-2 mb-2" key={"domPopUp_"+dom.DomainID}>
                                                        <input type="radio" className="custom-control-input" id={"domPopUp_"+dom.DomainID}
                                                            name="list" checked={selectedDomainForEdit.DomainID === dom.DomainID?true:false} onChange={()=>{setselectedDomainForEdit(dom); setaddNewDomainName(dom.DomainName)}} />
                                                        <label className="custom-control-label" htmlFor={"domPopUp_"+dom.DomainID}>{dom.DomainName}</label>
                                                        <div className="d-date"> <i onClick={()=>deleteDomainHandler(dom.DomainID)} className="fa fa-times" aria-hidden="true"></i></div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal"
                            aria-label="Close">Cancel</button>
                        <button type="button" className="btn btn-primary ml-3" data-dismiss="modal" onClick={()=>saveNewDomainHandler()}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    domainsSaveData : state.questionaire.saveProjectDomainData,
    currentDomain : state.questionaire.projectSelectedDomainData
});

export default connect(mapStateToProps,{ saveProjectDomains, deleteProjectDomains, setProjectSelectedDomain,getQBDomainsForEdit,getLock })(QuestionsAddDomain);