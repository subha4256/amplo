import React, { useState } from "react";
import { connect } from 'react-redux';
import { Global } from '../../../utils/Env';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import { saveAmploDomains, getAmploDomains ,deleteAmploDomains, setCurrentSelectedDomainAmplo, saveAmploImportDomains, getAmploDomainsImport, deleteAmploImportDomains } from '../../../actions/benchmarkingActions';

const QuestionsBankAddDomain = props => {

    Global.callback.saveAmploDomains_onComplete = () => {
        props.getAmploDomains(props.selectedQuestionBank.QuestionBankId);
        setselectedDomainForEdit({});
        setaddNewDomainName("");
    }

    Global.callback.saveAmploImportDomains_onComplete = () => {
        props.getAmploDomainsImport(props.QuestionBankId);
    }

    Global.callback.deleteAmploDomains_onComplete = () => {
        props.getAmploDomains(props.selectedQuestionBank.QuestionBankId);
    }

    Global.callback.deleteAmploImportDomains_onComplete = () => {
        props.getAmploDomainsImport(props.QuestionBankId);
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
                        props.deleteAmploDomains(domId)
                        if(props.currentDomain.AmploBMDomainId == domId){
                            props.setCurrentSelectedDomainAmplo({})
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
                        props.deleteAmploImportDomains(domId)
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
            DomainId:Object.keys(selectedDomainForEdit).length > 0?props.preview === true ? selectedDomainForEdit.BMDomainImportId :selectedDomainForEdit.AmploBMDomainId:0,
            DomainName:addNewDomainName
        }
        if(props.preview === true){
            props.saveAmploImportDomains(saveObj)
        }else{
            props.saveAmploDomains(saveObj);
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
                                                    <div className="custom-control custom-radio ml-2 mb-2" key={"domPopUp_"+dom.AmploBMDomainId}>
                                                        <input type="radio" className="custom-control-input" id={"domPopUp_"+dom.AmploBMDomainId}
                                                            name="list" checked={selectedDomainForEdit.AmploBMDomainId === dom.AmploBMDomainId?true:false} onChange={()=>{setselectedDomainForEdit(dom); setaddNewDomainName(dom.DomainName)}} />
                                                        <label className="custom-control-label" htmlFor={"domPopUp_"+dom.AmploBMDomainId}>{dom.DomainName}</label>
                                                        <div className="d-date"> <i onClick={()=>deleteDomainHandler(dom.AmploBMDomainId)} className="fa fa-times" aria-hidden="true"></i></div>
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
    domainsSaveData : state.benchmarkingData.AmploDomainsSave,
    Domains : state.benchmarkingData.AmploDomains,
    selectedQuestionBank : state.benchmarkingData.currentSelectedQuestionBankAmplo,
    currentDomain : state.benchmarkingData.currentSelectedDomainAmplo,
    previewAmploDomains : state.benchmarkingData.previewAmploDomains,
});

export default connect(mapStateToProps,{ saveAmploDomains, getAmploDomains, deleteAmploDomains, setCurrentSelectedDomainAmplo, saveAmploImportDomains, getAmploDomainsImport, deleteAmploImportDomains })(QuestionsBankAddDomain);