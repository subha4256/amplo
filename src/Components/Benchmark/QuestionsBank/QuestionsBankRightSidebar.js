import React, { useState } from "react";
import { connect } from 'react-redux';
import { Global } from '../../../utils/Env';

import { getClientSidebarQuestions } from '../../../actions/benchmarkingActions';

const QuestionsBankRightSidebar = props => {

    Global.callback.getClientSidebarQuestions_onComplete = ({data}) => {
        setdomainQuestionsData({
            ...domainQuestionsData,
            ["id"+lastExpandedQB] : data
        })
    }
    
    const [domainQuestionsData, setdomainQuestionsData] = useState({});
    const [ lastExpandedQB, setlastExpandedQB ] = useState(0);

    const questionBankExpandHandler = (QBId) => {
        setlastExpandedQB(QBId);
        if(!domainQuestionsData.hasOwnProperty("id"+QBId)){
            props.getClientSidebarQuestions(QBId)
        }
    }


    return(
        <div className="question-right-panel">
            <div className="search-area">
                <div className="form-group has-search">
                    {/* <input type="text" className="form-control" placeholder="" /> */}
                    {/* <span className="fa fa-search form-control-feedback"></span> */}
                </div>
            </div>
            <h2>Question Banks</h2>

            <div id="benchmarkingaccord" className="benchmarking-list w-267 p-3">
                <div className="listscroll">
                    {props.QuestionBanks.map((QB)=>{
                        return(
                            <div className="card mb-3" key={'sidebar_qb_'+QB.QuestionBankId}>
                                <div className="d-flex">
                                    <a className="banktxt" data-toggle="collapse" aria-expanded="false" href={"#quesbank"+QB.QuestionBankId} onClick={()=>questionBankExpandHandler(QB.QuestionBankId)}><span>{QB.QuestionBankName}</span></a>
                                </div>
                                <div id={"quesbank"+QB.QuestionBankId} className="collapse" data-parent="#benchmarkingaccord">
                                    {domainQuestionsData.hasOwnProperty("id"+QB.QuestionBankId)?
                                    domainQuestionsData["id"+QB.QuestionBankId].map((domain)=>{
                                        return(
                                            <ul className="domain-list" key={"sidebarDomain"+domain.BMDomainId}>
                                                <li>
                                                    <div className="card">
                                                        <div className="d-flex">
                                                            <a className="banktxt" data-toggle="collapse" aria-expanded="false"
                                                                href={"#sidebarDomain"+domain.BMDomainId}>{domain.DomainName}</a>
                                                        </div>
                                                        <div id={"sidebarDomain"+domain.BMDomainId} className="collapse">
                                                            <ul className="domain-list">
                                                                {domain.questions.map((ques)=>{
                                                                    return(
                                                                        <li key={"sidebarQues"+ques.QuestionsId} draggable={true} onDragStart={()=>props.sidebarQuesDragStart(ques)}>
                                                                            <span>{ques.questionText}</span>
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        )
                                    }):""}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    QuestionBanks : state.benchmarkingData.ClientQuestionsBank,
    SideBarDomainsQuestions : state.benchmarkingData.clientSidebarDomainsQuestions
})

export default connect(mapStateToProps,{ getClientSidebarQuestions })(QuestionsBankRightSidebar);