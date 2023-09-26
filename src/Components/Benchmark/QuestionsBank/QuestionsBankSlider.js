import Axios from "axios";
import React, { useState } from "react";
import { connect } from 'react-redux';

import { getClientQuestionsByDomain, setCurrentSelectedDomain } from '../../../actions/benchmarkingActions'
import { fetchBQBQuestionList, setProjectSelectedDomain } from '../../../actions/questionaireActions';

const QuestionsBankSlider = props => {
    const [activeDomain, setActiveDomain] = useState(0);

    const domainChangeHandler = async (domain) => {
        if (props.mode != 'edit') {
            props.getClientQuestionsByDomain(domain.BMDomainId, props.currentQuestionBank.QuestionBankId);
            props.setCurrentSelectedDomain(domain);
            setActiveDomain(domain.BMDomainId)
            props.setQbChanged()
        }
        else {

            await props.fetchBQBQuestionList({ "domainId": domain.DomainID, "projectId": props.projectId });
            await props.setProjectSelectedDomain(domain);
            setActiveDomain(domain.DomainID)
            await props.setQbChanged()
         

          
        }
    }

    return (
        <div className="row mt-4 question-sec">
            {(typeof props.currentQuestionBank == "object" && Object.keys(props.currentQuestionBank).length > 0) || props.mode == 'edit' ? <div className="col-md-12 col-lg-12 col-xl-8">
                <div className="bg-light">
                    <div className="quedropdown">
                        <div className="btn-group dropleft">
                            <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-ellipsis-h"></i>
                            </a>
                            <div className="dropdown-menu">
                                {/* <a href="javascript:void(0)" data-toggle="modal"
                                    data-target="#editDomains">Edit Domains</a> */}
                                <a href="javascript:void(0)" data-toggle="modal"
                                    data-target="#addDomains">Add/Edit Domains</a>
                            </div>
                        </div>
                    </div>
                    <h2>AmpMarking</h2>
                    <div className="benchmarking-map">
                        <ul className="list-inline">
                            {props.mode == 'edit' ? props.domainsForEdit.map((domain) => {
                                return (
                                    <li className={activeDomain === domain.DomainID ? "list-inline-item active" : "list-inline-item"} key={"domain" + domain.DomainID} onClick={() => {
                                        if (props.verifyQuestionsChanged()) {
                                            if (window.confirm('Questions are not saved, Do you still want to continue ?')) {
                                                domainChangeHandler(domain)
                                            }
                                        } else {
                                            domainChangeHandler(domain)
                                        }
                                    }}>{domain.DomainName}</li>
                                )
                            }) :
                                props.domains.map((domain) => {
                                    return (
                                        <li className={activeDomain === domain.BMDomainId ? "list-inline-item active" : "list-inline-item"} key={"domain" + domain.BMDomainId} onClick={() => {
                                            if (props.verifyQuestionsChanged()) {
                                                if (window.confirm('Questions are not saved, Do you still want to continue ?')) {
                                                    domainChangeHandler(domain)
                                                }
                                            } else {
                                                domainChangeHandler(domain)
                                            }
                                        }}>{domain.DomainName}</li>
                                    )
                                })}
                            <li className="list-inline-item" style={{ color: "#cccccc" }} ></li>
                        </ul>
                    </div>
                </div>
            </div> : null}
        </div>
    )
}

const mapStateToProps = state => ({
    domains: state.benchmarkingData.ClientDomains,
    domainsForEdit: state.questionaire.domainsForEdit,
    currentQuestionBank: state.benchmarkingData.currentSelectedQuestionBank
});

export default connect(mapStateToProps, { getClientQuestionsByDomain, setCurrentSelectedDomain, fetchBQBQuestionList, setProjectSelectedDomain })(QuestionsBankSlider);