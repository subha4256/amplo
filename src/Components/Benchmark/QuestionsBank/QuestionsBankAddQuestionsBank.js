import React, { useState } from "react";
import { connect } from 'react-redux';
import { Global } from '../../../utils/Env';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { saveClientQuestionsBank, getClientQuestionsBank, deleteClientQuestionsBank, setCurrentSelectedQuestionsBank } from '../../../actions/benchmarkingActions';
import { responseMessage } from "../../../utils/alert";

const QuestionsBankAddQuestionsBank = props => {

    const [name, setName] = useState("")
    Global.callback.saveClientQuestionsBank_onComplete = () => {
        props.getClientQuestionsBank(0);
        setQuestionsBankName("");
        setselectedQuestionBank({});
    }

    Global.callback.deleteClientQuestionsBank_onComplete = () => {
        props.getClientQuestionsBank(0)
    }

    const [QuestionsBankName, setQuestionsBankName] = useState("");
    const [selectedQuestionBank, setselectedQuestionBank] = useState({});


    const NewQuestionsBankNameChangeHandler = (e) => {
        setQuestionsBankName(e.target.value)
        setName(e.target.value)
    }

    const deleteQuestionsBankHandler = (QBId) => {
        confirmAlert({
            title: 'Confirm to continue',
            message: 'Are you sure to delete this Question Bank ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        props.deleteClientQuestionsBank(QBId)
                        if (selectedQuestionBank.QuestionBankId == QBId) {
                            props.setCurrentSelectedQuestionsBank({})
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }


    const NewQuestionBankSaveHandler = () => {
        const saveObj = {
            QuestionBankId: Object.keys(selectedQuestionBank).length > 0 ? selectedQuestionBank.QuestionBankId : 0,
            QuestionBankName: QuestionsBankName
        }

        if (props.QuestionBanks.some(quesiton => quesiton.QuestionBankName === name)) {
            responseMessage("warn", "Question Bank Name Already Present.")
        } else {
            props.saveClientQuestionsBank(saveObj)

        }
        setName("")
    }
    return (
        <div className="modal" id="addQuestionsBank" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Add Questions Bank</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Enter Questions Bank Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={name}
                                onChange={(e) => NewQuestionsBankNameChangeHandler(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Select from Existing Questions Bank ( Edit Or <span className="text-danger">Delete</span>  )</label>
                            <div className="dropdown copydropdown">
                                <div className="dropfield dropleft">
                                    {Object.keys(selectedQuestionBank).length > 0 ? <span><i className="fas fa-times" onClick={() => { setselectedQuestionBank({}); setQuestionsBankName("") }}></i>{selectedQuestionBank.QuestionBankName}</span> : ""}
                                    <div className="dropdown-toggle float-right" data-toggle="dropdown"><i
                                        className="fas fa-bars"></i></div>
                                    <div className="dropdown-menu p-0">
                                        {/* <div className="form-group border-bottom mb-2"><input type="text"
                                                className="form-control searchbox" placeholder="Search" /></div> */}
                                        <div className="disabled-date"><span>Question Bank Name</span> <span>&nbsp;</span>
                                        </div>
                                        <div className="dropheight">
                                            {props.QuestionBanks.map(QB => {
                                                return (
                                                    <div className="custom-control custom-radio ml-2 mb-3" key={"QBPopUp_" + QB.QuestionBankId}>
                                                        <input type="radio" className="custom-control-input" id={"QB_" + QB.QuestionBankId} checked={selectedQuestionBank.QuestionBankId === QB.QuestionBankId ? true : false} onChange={() => { setselectedQuestionBank(QB); setQuestionsBankName(QB.QuestionBankName) }} name="list" />
                                                        <label className="custom-control-label" htmlFor={"QB_" + QB.QuestionBankId}>{QB.QuestionBankName}</label>
                                                        <div
                                                            onClick={() => deleteQuestionsBankHandler(QB.QuestionBankId)}
                                                            style={{ "cursor": "pointer" }} className="d-date text-danger border border-danger rounded py-2 px-3"><i className="fa fa-times" aria-hidden="true"></i></div>
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
                        <button type="button" className="btn btn-primary ml-3" data-dismiss="modal" onClick={() => NewQuestionBankSaveHandler()}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    saveQuestionsBankData: state.benchmarkingData.ClientQuestionsBankSave,
    QuestionBanks: state.benchmarkingData.ClientQuestionsBank,
    selectedQuestionBank: state.benchmarkingData.currentSelectedQuestionBank,
});

export default connect(mapStateToProps, { saveClientQuestionsBank, getClientQuestionsBank, deleteClientQuestionsBank, setCurrentSelectedQuestionsBank })(QuestionsBankAddQuestionsBank);