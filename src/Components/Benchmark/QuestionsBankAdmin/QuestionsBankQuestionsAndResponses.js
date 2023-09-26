import React from "react";
import { connect } from 'react-redux';

const QuestionsBankQuestionsAndResponses = props => {
    let questions = props.questions.map((question,i)=>{
        let responses = question.response?question.response.map((res,j)=>{
            return(
                <div className="row mb-3" key={'response_'+i+'_'+j}>
                    <div className="col-md-4 col-lg-3">
                        <select className="custom-select" value={res.position} onChange={(e)=>props.responseSequenceChangeHandler(e,i,j)}>
                            <option value="1">Response 1</option>
                            <option value="2">Response 2</option>
                            <option value="3">Response 3</option>
                            <option value="4">Response 4</option>
                            <option value="5">Response 5</option>
                        </select>
                    </div>
                    <div className="col-md-8 col-lg-9">
                        <div className="quecontent-sm">
                            <textarea placeholder="Enter Your Response" value={res.responseText} onChange={(e)=>props.reponseChangeHandler(e,i,j)}></textarea>
                        </div>
                            
                    </div>
                </div>
            )
        }):null
        return(
            <div className="bg-light" key={"question"+i}>
                <div className="quedropdown">
                    <div className="btn-group dropleft">
                        <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="fas fa-ellipsis-h"></i>
                        </a>
                        <div className="dropdown-menu">
                            <a href="javascript:void(0)" onClick={()=>props.changeCurrentSelectedQuestionIndexHandler(i)} data-toggle="modal" data-target="#picktemplate">Pick a Style</a>
                            <a href="javascript:void(0)">Move Question <span className="float-right"><i className="fas fa-chevron-down mr-1" onClick={()=>props.moveQuestionsHandler("Down",i)}></i><i onClick={()=>props.moveQuestionsHandler("Up",i)} className="fas fa-chevron-up"></i></span></a>
                            <a href="javascript:void(0)" onClick={()=>props.duplicateQuestionHandler(i)}>Duplicate Question</a>
                            <a href="javascript:void(0)" onClick={()=>props.removeQuestionHandler(i)}>Delete Question</a>
                            <a href="javascript:void(0)" onClick={()=>props.clearQuestionHandler(i)}>Clear All</a>
                            {/* <a href="javascript:void(0)">Modify Industry Classification</a> */}
                        </div>
                    </div>
                </div>
                <div className="questionfrm">
                    <div className="form-group">
                        <label className="quelabel">Question {i+1}:</label>
                        <div className="prioritydrop">
                            <label>Priority :  &nbsp;</label>
                            <select className="form-control" style={{display : "inline", width:"115px"}} value={question.importance} onChange={(e)=>props.questionPriorityChangeHandler(e.target.value, i)}>
                                <option value="5">Very High</option>
                                <option value="4">High</option>
                                <option value="3">Medium</option>
                                <option value="2">Low</option>
                                <option value="1">Very Low</option>
                            </select>
                        </div>
                        <div className="quecontent-lg">
                            <textarea value={question.questionText} onChange={(e)=>props.questionChangeHandler(e,i)} placeholder="Enter Your Question"></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="quelabel">Enter five answer choices:</label>
                        {responses}
                    </div>
                </div>
                <div className="delrow d-flex justify-content-between align-items-center">
                    <a href="javascript:void(0)" onClick={()=>props.removeQuestionHandler(i)}><i className="fas fa-trash-alt"></i></a>
                    <span>AFLY Score Enabled : <input type="checkbox" checked={question.IsAFlyScoreEnabled == "0" ? false : true} onChange={(e)=>props.enableAflyScoreHandler(e,i)} /></span>
                </div>
            </div>
        )
    })
    return(
        <>
            <div className="row domain-slider-sec mt-3 mb-0" onDragOver={Object.keys(props.selectedDomain).length > 0?(e)=>props.onDraggedQuestionDragOver(e):()=>{}} onDrop={Object.keys(props.selectedDomain).length > 0?(e)=>props.onDraggedQuestionDrop(e):()=>{}}>
                <div className="col-md-12 col-lg-10 col-xl-8">
                    <ul className="list-inline heading-list mb-0">
                        <li>
                            <h2>{props.selectedDomain.DomainName?props.selectedDomain.DomainName:""}</h2>
                        </li>
                        {Object.keys(props.selectedDomain).length > 0?<li className="sm-txt" onClick={()=>props.addQuestionHandler()}><small style={{pointerEvents:"none"}}><i className="fas fa-plus"></i> Add New Question</small><span
                                className="ml-2"></span></li>:""}
                    </ul>
                </div>
            </div>
            {Object.keys(props.selectedDomain).length > 0?<div className="row mt-4 question-sec" onDragOver={Object.keys(props.selectedDomain).length > 0?(e)=>props.onDraggedQuestionDragOver(e):()=>{}} onDrop={Object.keys(props.selectedDomain).length > 0?(e)=>props.onDraggedQuestionDrop(e):()=>{}}>
                <div className="col-md-12 col-lg-12 col-xl-8">
                    {questions}
                </div>
            </div>:null}
        </>
    )
}

const mapStateToProps = state => ({
    selectedDomain : state.benchmarkingData.currentSelectedDomainAmplo
})

export default connect(mapStateToProps,{})(QuestionsBankQuestionsAndResponses);