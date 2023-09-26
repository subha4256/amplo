import React , { useState } from "react";
import { connect } from 'react-redux';

import { getAmploQuestionsByDomain, setCurrentSelectedDomainAmplo } from '../../../actions/benchmarkingActions'

const QuestionsBankSlider = props => {
    const [activeDomain , setActiveDomain] = useState(0);

    const domainChangeHandler = (domain) => {
        props.getAmploQuestionsByDomain(domain.AmploBMDomainId,props.currentQuestionBank.QuestionBankId);
        props.setCurrentSelectedDomainAmplo(domain);
        setActiveDomain(domain.AmploBMDomainId)
        props.setQbChanged()
    }

    return(
        <div className="row mt-4 question-sec">
            {(typeof props.currentQuestionBank == "object" && Object.keys(props.currentQuestionBank).length > 0) ? <div className="col-md-12 col-lg-12 col-xl-8">
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
                            {props.domains.map((domain)=>{
                                return(
                                    <li className={activeDomain === domain.AmploBMDomainId?"list-inline-item active":"list-inline-item"} key={"domain"+domain.AmploBMDomainId} onClick={()=>{
                                        if(props.verifyQuestionsChanged()){
                                            if(window.confirm('Questions are not saved, Do you still want to continue ?')){
                                                domainChangeHandler(domain)
                                            }
                                        }else{
                                            domainChangeHandler(domain)
                                        }
                                    }}>{domain.DomainName}</li>
                                )
                            })}
                            <li className="list-inline-item" style={{color:"#cccccc"}} ></li>
                        </ul>
                    </div>
                </div>
            </div> : null }
        </div>
    )
}

const mapStateToProps = state => ({
    domains : state.benchmarkingData.AmploDomains,
    currentQuestionBank : state.benchmarkingData.currentSelectedQuestionBankAmplo
});

export default connect(mapStateToProps,{ getAmploQuestionsByDomain, setCurrentSelectedDomainAmplo })(QuestionsBankSlider);