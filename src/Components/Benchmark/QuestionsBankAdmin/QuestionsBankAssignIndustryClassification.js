import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Global } from '../../../utils/Env';

import { saveAmploAssignedIndustryClassification, getIndustryClassificationByQuestionsBankAmplo } from '../../../actions/benchmarkingActions';

const QuestionsBankAssignIndustryClassification = (props) => {

    Global.callback.saveAmploAssignedIndustryClassification_onComplete = () => {
        props.getIndustryClassificationByQuestionsBankAmplo(props.selectedQuestionBank.QuestionBankId)
    }

    const [selectedVertical, setselectedVertical] = useState("");
    const [selectedSubVertical, setselectedSubVertical] = useState("");
    const [subVerticalList, setsubVerticalList] = useState([]);

    useEffect(()=>{
        if(typeof props.clientIndustryClassification !== 'undefined' && props.clientIndustryClassification.length > 0){
            verticalChangeHandler({target : { value : props.clientIndustryClassification[0].IndustryVerticalId ? props.clientIndustryClassification[0].IndustryVerticalId : "" } } )
            setselectedVertical(props.clientIndustryClassification[0].IndustryVerticalId ? props.clientIndustryClassification[0].IndustryVerticalId : "");
            setselectedSubVertical(props.clientIndustryClassification[0].IndustrySubVerticalId ? props.clientIndustryClassification[0].IndustrySubVerticalId : "");
        }
    },[props]);

    const verticalChangeHandler = (e) => {
        let ind = props.industries.map(ver=>ver.IndustryVerticalID).indexOf(e.target.value)
        setsubVerticalList(ind != -1?props.industries[ind].subverticals:[])
        setselectedVertical(e.target.value)
    }

    const SaveAssignedIndustryClassification = () => {
        let data = {
            QuestionBankId:props.selectedQuestionBank.QuestionBankId,
            IndustryVerticalId:selectedVertical,
            IndustrySubVerticalId:selectedSubVertical
        }
        props.saveAmploAssignedIndustryClassification(data)
        setselectedVertical("")
        setselectedSubVertical("")
        setsubVerticalList([])
    }

    return(
        <div className="modal" id="assignIndustryClassification" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Assign Industry Classification</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Select Industry Vertical</label>
                            <select className="form-control" onChange={(e)=>verticalChangeHandler(e)} value={selectedVertical}>
                                <option value="">Select Industry Vertical</option>
                                {props.industries.map(ver=>{
                                    return(
                                        <option key={"vertical_"+ver.IndustryVerticalID} value={ver.IndustryVerticalID}>{ver.IndustryVerticalName}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Select Industry Sub-Vertical</label>
                            <select className="form-control" onChange={(e)=>setselectedSubVertical(e.target.value)} value={selectedSubVertical} disabled={selectedVertical != ""?false:true}>
                                <option value="">Select Industry Sub-Vertical</option>
                                {subVerticalList.map(ver=>{
                                    return(
                                        <option key={"vertical_"+ver.IndustrySubVerticalID} value={ver.IndustrySubVerticalID}>{ver.IndustrySubVerticalName}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal"
                            aria-label="Close">Cancel</button>
                        <button type="button" className="btn btn-primary ml-3" data-dismiss="modal" disabled={selectedVertical != "" && selectedSubVertical != ""?false:true} onClick={()=>SaveAssignedIndustryClassification()}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    industries: state.company.industries,
    selectedQuestionBank : state.benchmarkingData.currentSelectedQuestionBankAmplo,
    clientIndustryClassification : state.benchmarkingData.amploIndustryClassification
});

export default connect(mapStateToProps, { saveAmploAssignedIndustryClassification, getIndustryClassificationByQuestionsBankAmplo })(QuestionsBankAssignIndustryClassification)