import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Global } from '../../../utils/Env';

import { duplicateAmploQuestionsBank, getAmploQuestionsBank } from '../../../actions/benchmarkingActions';
import { responseMessage } from '../../../utils/alert';

const QuestionsBankDuplicateQuestionsBank = (props) => {


    console.log("Duplocate Props =>>", props)

    Global.callback.duplicateAmploQuestionsBank_onComplete = () => {
        props.getAmploQuestionsBank()
    }

    const[QuestionsBankName, setQuestionsBankName] = useState("");

    const DuplicateQuestionBankSaveHandler = () => {


        const is_duplicateQuestionBank = props.questionBanks.some((item) => item.QuestionBankName.toLowerCase() == QuestionsBankName.toLowerCase())

        if(is_duplicateQuestionBank) {
           return  responseMessage(
            "warning",
            "Question bank name is already used!",
            ""
        );
        }

        let QBData = {
            SourceQuestionBankId:props.selectedQuestionBank.QuestionBankId,
            QuestionBankName:QuestionsBankName
        }
        if(props.verifyQuestionsChanged()){
            if(window.confirm('Questions are not saved, Do you still want to continue ?')){
                props.duplicateAmploQuestionsBank(QBData)
            }
        }else{
            props.duplicateAmploQuestionsBank(QBData)
        }
    }

    return(
        <div className="modal" id="duplicateQuestionsBank" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className={Object.entries(props.selectedQuestionBank).length === 0 ? "text-danger":null} >{Object.entries(props.selectedQuestionBank).length === 0 ? "Please Select a Question Bank for Duplicate!":"Duplicate Questions Bank"}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Enter New Questions Bank Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Question bank name" 
                                value={QuestionsBankName}
                                onChange={(e)=>setQuestionsBankName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" data-dismiss="modal"
                            aria-label="Close">Cancel</button>
                        <button type="button" className="btn btn-primary ml-3" data-dismiss="modal" disabled={QuestionsBankName != "" && Object.entries(props.selectedQuestionBank).length !== 0 ?false:true} onClick={()=>DuplicateQuestionBankSaveHandler()}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    selectedQuestionBank : state.benchmarkingData.currentSelectedQuestionBankAmplo
});

export default connect(mapStateToProps, { duplicateAmploQuestionsBank, getAmploQuestionsBank })(QuestionsBankDuplicateQuestionsBank)