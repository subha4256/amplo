import React, { useState, Fragment, useEffect } from "react";
import { connect } from 'react-redux';
import { Global } from '../../../utils/Env';

import { getAmploSidebarQuestions, getClientQuestionsAndDomainsAmplo } from '../../../actions/benchmarkingActions';
import { confirmAlert } from "react-confirm-alert";
import CacheStorage from "../../../utils/CacheStorage";
import axios from "axios";
import config from "../../../config";
import { responseMessage } from "../../../utils/alert";


const QuestionsBankRightSidebar = props => {

    Global.callback.getAmploSidebarQuestions_onComplete = ({data}) => {
        setdomainQuestionsData({
            ...domainQuestionsData,
            ["id"+lastExpandedQB] : data
        })
    }

    Global.callback.getClientQuestionsAndDomainsAmplo_onComplete = ({data}) => {
        setdomainQuestionsData({
            ...domainQuestionsData,
            ["id"+lastExpandedQB] : data
        })
    }
    
    const [domainQuestionsData, setdomainQuestionsData] = useState({});
    const [ lastExpandedQB, setlastExpandedQB ] = useState(0);
    const [isChecked, setisChecked] = useState(false);
    const [selectedId, setSelectedId] = useState("")

 

    const questionBankExpandHandler = (QBId) => {
        setisChecked("hello")
        setlastExpandedQB(QBId);
        if(!domainQuestionsData.hasOwnProperty("id"+QBId)){
            props.getAmploSidebarQuestions(QBId)
        }
    }

    const clientQuestionBankExpandHandler = (QBId) => {


        setlastExpandedQB(QBId);
        if(!domainQuestionsData.hasOwnProperty("id"+QBId)){
            props.getClientQuestionsAndDomainsAmplo(QBId)
        }
    }



    // Author :Sonu Sharma || Full_stack developer
    // Date   : 28/07/2021
    // Name   : Method for enable amplfy score (Admin Side)
    // Params : QuestionBankId , ClientId, QuestionId
    // Type   : POST
    // Purpose: For question ampfly score enable.

    const questionBankSelectbox =(e , clientId , quesitonBankId , questId )=>{


        setSelectedId(questId);

            if(e.target.checked) {
                setisChecked(true)

                console.log("updateing state");
                console.log("Checked >" , isChecked);

                confirmAlert({
                    title: 'Confirmation!',
                    message: 'Do you want to enable AFLY for this question',
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                            
                                const headers = {
                                    "authorization": "Bearer " + CacheStorage.getItem("userToken")
                                }
                                axios.post(config.laravelBaseUrl+'uspEnableClientQuestionBankAFlyScoreFromAmploSidePost', {
                                    ClientId: +clientId ,
                                    QuestionsId: +questId
                                }, {
                                    headers: headers
                                })
                                .then(res => {
                                    console.log(res)
                                      if(res.status === 200) {
        
                                        responseMessage("success", "Ampfly score enable successfully")
                                     
                                        props.getClientQuestionsAndDomainsAmplo(quesitonBankId)
        
                                        Global.callback.getClientQuestionsAndDomainsAmplo_onComplete = ({data}) => {
                                            setdomainQuestionsData({
                                                ...domainQuestionsData,
                                                ["id"+lastExpandedQB] : data
                                            })
                                        }
                                      }
                                })
                                .catch(err => console.log(err))
                              }
                        },
                        {
                            label: 'No',
                            onClick: () => {
                                setisChecked(false);
                                setSelectedId("")
                               
                            }
                        }
                    ]
                }); 

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
            <div id="accordion" class="accordion">
                <div class="card mb-0">
                    <div class="card-header" data-toggle="collapse" href="#admin">
                        <a class="card-title">
                            Amplo Questions Bank
                        </a>
                    </div>
                    <div id="admin" class="card-body collapse" data-parent="#accordion">
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
                                                        <ul className="domain-list" key={"sidebarDomain"+domain.AmploBMDomainId}>
                                                            <li>
                                                                <div className="card">
                                                                    <div className="d-flex">
                                                                        <a className="banktxt" data-toggle="collapse" aria-expanded="false"
                                                                            href={"#sidebarDomain"+domain.AmploBMDomainId}>{domain.DomainName}</a>
                                                                    </div>
                                                                    <div id={"sidebarDomain"+domain.AmploBMDomainId} className="collapse">
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
                    <div class="card-header" data-toggle="collapse" href="#client">
                        <a class="card-title">
                            Client Question Bank
                        </a>
                    </div>
                    <div id="client" class="card-body collapse" data-parent="#accordion">
                        <div id="benchmarkingaccord" class="benchmarking-list w-267 p-3">
                            <div class="listscroll">
                                {props.ClientQuestionBanks.length > 0 ? 
                                    props.ClientQuestionBanks.map(client=>{
                                        return(
                                            <div class="card mb-3" key={"client_name_"+client.ClientId+'_'+client.ClientName}>
                                                <div class="d-flex">
                                                    <a class="banktxt" data-toggle="collapse" aria-expanded="false" href={"#"+"client_name_"+client.ClientId+'_'+client.ClientName}>
                                                            <span>{client.ClientName}</span>
                                                    </a>
                                                </div>
                                                <div id={"client_name_"+client.ClientId+'_'+client.ClientName} class="collapse ques-parent mt-3 pl-4">
                                                    {client.hasOwnProperty("QuestionBank") ? client.QuestionBank.map(qb=>{
                                                        return(
                                                            <Fragment>
                                                            <div class="d-flex mb-3">
                                                                <a class="banktxt" data-toggle="collapse" aria-expanded="false"
                                                                    href={"#"+qb.QuestionBankId} onClick={()=>clientQuestionBankExpandHandler(qb.QuestionBankId)}><span>{qb.QuestionBankName}</span>
                                                                    </a>
                                                                 
                                                            </div>
                                                            <div id={qb.QuestionBankId} class="collapse" data-parent="#benchmarkingaccord">
                                                                {domainQuestionsData.hasOwnProperty("id"+qb.QuestionBankId)?
                                                                domainQuestionsData["id"+qb.QuestionBankId].map((domain)=>{
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
                                                                                                    <li key={"sidebarQues"+ques.id} draggable={true} onDragStart={()=>props.sidebarQuesDragStart(ques)}>
                                                                                                        <span
                                                                                                         className="mr-1"
                                                                                                        >{ques.questionText}</span>
                                                                                                        <input className="ml-1" type="checkbox"
                                                                     checked={ques.IsAFlyScoreEnabled == 1  ? true : selectedId == ques.id ? true : null }
                                                                     disabled={ques.IsAFlyScoreEnabled == 1  ? true : null }
                                                                   
                                                                    onChange={(e)=>questionBankSelectbox(e,client.ClientId ,qb.QuestionBankId , ques.id )}
                                                                    />
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
                                                            </Fragment>
                                                        )
                                                    }) : null }
                                                </div>
                                            </div>
                                        )
                                    })
                                : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    QuestionBanks : state.benchmarkingData.AmploQuestionsBank,
    ClientQuestionBanks : state.benchmarkingData.clientQuestionsBankforAmplo,
    SideBarDomainsQuestions : state.benchmarkingData.amploSidebarDomainsQuestions
})

export default connect(mapStateToProps,{ getAmploSidebarQuestions, getClientQuestionsAndDomainsAmplo })(QuestionsBankRightSidebar);