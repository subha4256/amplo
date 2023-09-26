import React, { useState } from "react";
import { connect } from 'react-redux';
import { Global } from '../../../utils/Env';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import { saveClientDomains, getClientDomains ,deleteClientDomains, setCurrentSelectedDomain, saveClientImportDomains, getClientDomainsImport, deleteClientImportDomains } from '../../../actions/benchmarkingActions';

const QuestionsBankAddDomain = props => {

    Global.callback.saveClientDomains_onComplete = () => {
        props.getClientDomains(props.selectedQuestionBank.QuestionBankId);
        setselectedDomainForEdit({});
        setaddNewDomainName("");
    }

    Global.callback.saveClientImportDomains_onComplete = () => {
        props.getClientDomainsImport(props.QuestionBankId);
    }

    Global.callback.deleteClientDomains_onComplete = () => {
        props.getClientDomains(props.selectedQuestionBank.QuestionBankId);
    }

    Global.callback.deleteClientImportDomains_onComplete = () => {
        props.getClientDomainsImport(props.QuestionBankId);
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
                        props.deleteClientDomains(domId)
                        if(props.currentDomain.BMDomainId == domId){
                            props.setCurrentSelectedDomain({})
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

    const deleteImportDomainHandler = (domId) => {
        confirmAlert({
            title: 'Confirm to continue',
            message: 'Are you sure to delete this Domain ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        props.deleteClientImportDomains(domId)
                        if(props.currentSelectedDomainId == domId){
                            props.domainDeleted()
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
            QuestionBankId:props.preview === true ? props.QuestionBankId : props.selectedQuestionBank.QuestionBankId,
            DomainId:Object.keys(selectedDomainForEdit).length > 0?props.preview === true ? selectedDomainForEdit.BMDomainImportId :selectedDomainForEdit.BMDomainId:0,
            DomainName:addNewDomainName
        }
        if(props.preview === true){
            props.saveClientImportDomains(saveObj)
        }else{
            props.saveClientDomains(saveObj);
        }
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
                                            {props.preview === true ? null : props.Domains.map(dom=>{
                                                return(
                                                    <div className="custom-control custom-radio ml-2 mb-2" key={"domPopUp_"+dom.BMDomainId}>
                                                        <input type="radio" className="custom-control-input" id={"domPopUp_"+dom.BMDomainId}
                                                            name="list" checked={selectedDomainForEdit.BMDomainId === dom.BMDomainId?true:false} onChange={()=>{setselectedDomainForEdit(dom); setaddNewDomainName(dom.DomainName)}} />
                                                        <label className="custom-control-label" htmlFor={"domPopUp_"+dom.BMDomainId}>{dom.DomainName}</label>
                                                        <div className="d-date"> <i onClick={()=>deleteDomainHandler(dom.BMDomainId)} className="fa fa-times" aria-hidden="true"></i></div>
                                                    </div>
                                                )
                                            })}
                                            {props.preview === true ? props.previewAmploDomains.map(dom=>{
                                                return(
                                                    <div className="custom-control custom-radio ml-2 mb-2" key={"domPopUp_"+dom.BMDomainImportId}>
                                                        <input type="radio" className="custom-control-input" id={"domPopUp_"+dom.BMDomainImportId}
                                                            name="list" checked={selectedDomainForEdit.BMDomainImportId === dom.BMDomainImportId?true:false} onChange={()=>{setselectedDomainForEdit(dom); setaddNewDomainName(dom.DomainName)}} />
                                                        <label className="custom-control-label" htmlFor={"domPopUp_"+dom.BMDomainImportId}>{dom.DomainName}</label>
                                                        <div className="d-date"> <i onClick={()=>deleteImportDomainHandler(dom.BMDomainImportId)} className="fa fa-times" aria-hidden="true"></i></div>
                                                    </div>
                                                )
                                            }) : null}
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
    domainsSaveData : state.benchmarkingData.ClientDomainsSave,
    Domains : state.benchmarkingData.ClientDomains,
    selectedQuestionBank : state.benchmarkingData.currentSelectedQuestionBank,
    currentDomain : state.benchmarkingData.currentSelectedDomainName,
    previewAmploDomains : state.benchmarkingData.previewDomains,
});

export default connect(mapStateToProps,{ saveClientDomains, getClientDomains, deleteClientDomains, setCurrentSelectedDomain, saveClientImportDomains, getClientDomainsImport, deleteClientImportDomains })(QuestionsBankAddDomain);