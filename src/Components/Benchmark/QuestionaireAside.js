import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { QuestionaireAsideWrapper } from './Styling/Questionaire';
import axios from 'axios';
import config from '../../config';
import { responseMessage } from '../../utils/alert';


const QuestionaireAside = (props) => {

    let unansweredQuestions = props.unansweredQuestions.map((ques,key)=>{
        return(
            <>
                <li className={"list-inline-item"} key={key+"li"} style={{marginBottom:"10px"}} onClick={()=>props.handleNext(props.valueForQuestionChange,ques.QuestionId,true)}>
                    <div className={props.currentQuestion==ques.QuestionId?"rectangle-box selected":"rectangle-box"}>Q{ques.QuestionName}</div>
                </li>
            </>
        )
    })

//      useEffect(() => {
//             axios.get(`${config.laravelBaseUrl}GetReestablishAflyScore/${props.projectId}`,{
//                 headers : {
//                   authorization : sessionStorage.getItem('userToken')
//                 }
//               }).then(res=>{
//                     if(res.status == 200) {
//                         setScore(res.data.data[0])
//                     }
//               }).catch((error) =>{
//                 console.log("Error", error)
//               })
// }, [props.projectId])



    return (
        <>
            <QuestionaireAsideWrapper className="aside-menu aside-menu-right toggled">
                <Row>
                    <Col sm="3" className="pr-0">
                        <ul className="nav nav-tabs" role="tablist">
                        <a href='#' className='questionaireRightBar'><i className='fa fa-angle-right'></i></a>
                        {/*<li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#timeline" role="tab">
                            <i className="far fa-question-circle"></i>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#messages" role="tab">
                            <i className="far fa-comments"></i>
                            </a>
                        </li>*/}
                        
                        </ul>
                    </Col>
                    <Col sm="9" className="tab-content">
                        <div className="tab-pane active p-0 tab-message" id="messages" role="tabpanel">
                            <h3>Reference</h3>
                            <div className="message p-3">
                                <h4 className="font-weight-bold"><i className="fas fa-sort-down"></i> Selected Response</h4>
                                <p className="text-muted">{props.selectedAnswerDesc}</p>
                                {/* <p className="text-muted"><small>Some helpful links:</small></p>
                                <a href="#">Different Organizations</a><br />
                                <a href="#">Answer Help</a> */}
                            </div>
                            {/*<hr className="p-0 mx-3 my-0"></hr>
                            <div className="message p-3">
                                <h4 className="font-weight-bold"><i className="fas fa-sort-down"></i> Resources/Tooltip help</h4>
                                <div className="graph-img">
                                <img className="img-fluid" src={ require('../../common/images/graph-img1.PNG') } alt="" />
                                </div>
                                <p className="text-lg-sm">90% <small>selected answer 2 in</small> Retail Industry</p>
                                <p className="text-lg-sm">50% <small>selected answer 2 in</small> Retail Industry</p>

                            </div>*/}
                            <hr className="p-0 mx-3 my-0" />
                            <div className="message p-3">
                                <h4 className="font-weight-bold"><i className="fas fa-sort-down"></i> Unanswered Questions</h4>
                                <p className="">Click on the question number to populate the question</p>
                                <ul className="list-inline" style={{flexWrap:"wrap"}}>
                                    {unansweredQuestions}
                                </ul>
                            </div>

                            {/* <div className="pl-2">
                                <p>AsIsAflyScore : <strong> {score?.AsIsAflyScore}</strong></p>
                                <p className="mt-1">Re-EstablishAsIsAflyScore : <strong>{score?.ReestablishAsIsAflyScore} </strong> </p>
                            </div> */}
                        </div>
                    </Col>
                </Row>
            </QuestionaireAsideWrapper>
            <a href='#' className='questionaireRightBar arrowBtn'><i className='fa fa-angle-left'></i></a>
        </>
    )
}

export default QuestionaireAside;