import React  from "react";
import { connect } from 'react-redux';
import { Button , Modal } from 'react-bootstrap';
import { useEffect } from "react";
import config from "../../../config";
import Axios from "axios";
import { useParams } from "react-router-dom";
import {
    errorAlert,
    successAlert,
    responseMessage,
} from "../../../utils/alert";
import { v4 as uuidv4 } from 'uuid';


const QuestionsBankQuestionsAndResponses = props => {
    const [show, setShow] = React.useState(false);
    const [data, setData] = React.useState([])
    const [showSetScore, setShowSetScore] = React.useState(false)
    const [questionIdForModal,setQuestionIdForModal]=React.useState(null);
    const [questionOptionIdForModal,setQuestionOptionIdForModal]=React.useState(null);
    const [domainIdForModal,setDomainIdForModal]=React.useState(null);
    const [projectIdForModal,setProjectIdForModal]=React.useState(props.mode=='edit'?props.projectId:null);
    const [checkedList, setCheckedList] = React.useState([])
    const [dropDowanStatus, setDropDowanStatus] = React.useState(false)
    const [inputs, setInputs] = React.useState([
        // {BenchmarkScoringDropdownId: 0 , DropdownValue: "" , DropdownText: "" },
        // {BenchmarkScoringDropdownId: 0 , DropdownValue: "" , DropdownText: "" }

    ])
    const [selectedQuestion, setSelectedQuestion] = React.useState("")
    
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
    
    const params = useParams()

 



    const handleOpenModel = (id,responseId) => {
        setQuestionIdForModal(id);
        setQuestionOptionIdForModal(responseId);
        setDomainIdForModal(props.mode=='edit'?props.currentDomainForEdit.DomainID:props.selectedDomain.BMDomainId);
        setProjectIdForModal(props.projectId);

        let url = props.mode  == "edit" ?  `${config.laravelBaseUrl}getListOfQuestionDomainWise/${props.currentDomainForEdit.DomainID}/${id}/${responseId}/Home/${0}` : `${config.laravelBaseUrl}getListOfQuestionDomainWise/${props.selectedDomain.BMDomainId}/${id}/${responseId}/Manage/${props.selectProject.QuestionBankId}`

        Axios.get(url, {
            headers: {
                authorization: "Bearer " + sessionStorage.getItem("userToken"),
            },
        })
        .then((res) => {
            console.log("RES =>", res);
            setData(res.data.data);
            let tempCheckedList=[];
            res.data.data.map((item)=>{
                if(item.IsChecked=='1')
                tempCheckedList.push(item.QuestionId);
            })
            setCheckedList(tempCheckedList);
        })
        .catch((error) => console.log(error));
        setTimeout(() => {
                setShow(!show)
        }, 1000);
    }


    const handleCheckbox =(e , id) =>{

        if(checkedList.filter((item)=>item==id).length==0) {
            setCheckedList([...checkedList , id])
        }else {
            setCheckedList(checkedList.filter(item => item != id))
        }

    }

    const handleSaveModal=()=>{
        let obj={
                "CurrentBenchmarkQuestionID": questionIdForModal,
                "CurrentBenchmarkQuestionOptionID": questionOptionIdForModal,
                "CurrentDomainId":domainIdForModal,
                "BenchmarkProjectId":projectIdForModal,
                "CalledFrom":props.mode=='edit'?'Home':'Manage'
            }
            let temp=[];
            checkedList.map((item)=>{
                temp.push( {
                    "BenchmarkQuestionIDToSkip": Number(item)
                })
            })
            obj.QuestionToSkip=temp;
        
        Axios.post(`${config.laravelBaseUrl}InsertUpdateSkipQuestion`,obj, {
            headers: {
                authorization: "Bearer " + sessionStorage.getItem("userToken"),
            },
        })
        .then((res) => {
            setShow(!show);
            responseMessage("success", 'Saved Successfully', "");
        })
        .catch((error) => console.log(error));
    }


    const handleSetScore = (questionId , status) => {
        setSelectedQuestion(questionId)
        setInputs([])
        setShowSetScore(!showSetScore)
        console.log(status)

        status == 1 ?  setDropDowanStatus(true) : setDropDowanStatus(false)


            Axios.get(`${config.laravelBaseUrl}getBenchmarkDropdoenScoring/${props?.projectId}/${props?.currentDomainForEdit?.DomainID}/${questionId}` , {
        headers: {
            authorization: "Bearer " + sessionStorage.getItem("userToken"),
        },
    })
    .then((res) => {
        console.log("RES =>", res);
        if(res.data.message === "data not found") {
            return 
        }else {

            setInputs(res.data.data)
        }

    })
    .catch((error) => console.log(error));
   
    }

    const handleDynmicInputs = () => {
 
         setInputs([...inputs ,  {BenchmarkScoringDropdownId: uuidv4() , DropdownValue: "" , DropdownText: "" } ])
    }


    const handleChangeValue =(e , id) => {
        
       let modi_inputs =  inputs.map(input => {
             if (input.BenchmarkScoringDropdownId === id) {
                   return {...input , [e.target.name] : e.target.value }
             }
             return input
        })

        console.log(modi_inputs)
       setInputs(modi_inputs) 
    }

    // --------

    const handleSaveScoreModal = () => {


        let modi_inputs = inputs.map(item => ({DropdownValue: item.DropdownValue , DropdownText: item.DropdownText , BenchmarkScoringDropdownId: item.BenchmarkScoringDropdownId.length > 10 ? "0" : item.BenchmarkScoringDropdownId }))

     

        let send_Data = {
             BenchmarkProjectId: props?.projectId,
    DomainID: props?.currentDomainForEdit?.DomainID,
    BenchmarkQuestionId: selectedQuestion,
    IsDropdownScoringEnabled:dropDowanStatus?1:0,
    Dropdown:modi_inputs
        }

        Axios.post(`${config.laravelBaseUrl}InsertUpdateBenchmarkDropdoenScoring`,send_Data, {
            headers: {
                authorization: "Bearer " + sessionStorage.getItem("userToken"),
            },
        })
        .then((res) => {
            // setShow(!show);
            console.log(res)
        setShowSetScore(!showSetScore)
        setDropDowanStatus(false)


            responseMessage("success", 'Saved Successfully', "");
        })
        .catch((error) => console.log(error));


     
    }
       
      
    let selectedDomain=props.mode=='edit'?props.currentDomainForEdit:props.selectedDomain
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
                            <textarea placeholder="Enter Your Response" value={res.responseText} onChange={(e)=>props.reponseChangeHandler(e,i,j)}>
                            </textarea>
                            <i onClick={() =>handleOpenModel(props.mode=='edit'?question.QuestionId:question.id,props.mode=='edit'?res.QuestionOptionId:res.QuestionOptionId) } style={{position:"absolute" , right: "30px" , cursor: "pointer"}} className="fas fa-ellipsis-h"></i>
                        </div>
                        <div>
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
                            <a href="javascript:void(0)" onClick={()=>props.aflyscoreChangeHandler(i)}>{question.IsAFlyScoreEnabled==1?"Disable AFly Flag":"Enable AFly Flag"}</a>
                           {question.QuestionId > 0 && <a onClick={() => handleSetScore(question.QuestionId , question.IsDropDownScoringEnabled)} href="javascript:void(0)">Set Scoring</a>}
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
                    {/* <span>Aug 20 Sridhar</span> */}
                </div>
            </div>
        )
    })
    return(
        <>
            <div className="row domain-slider-sec mt-3 mb-0" onDragOver={Object.keys(selectedDomain).length > 0?(e)=>props.onDraggedQuestionDragOver(e):()=>{}} onDrop={Object.keys(selectedDomain).length > 0?(e)=>props.onDraggedQuestionDrop(e):()=>{}}>
                <div className="col-md-12 col-lg-10 col-xl-8">
                    <ul className="list-inline heading-list mb-0">
                        <li>
                            <h2>{selectedDomain.DomainName?selectedDomain.DomainName:""}</h2>
                        </li>
                        {Object.keys(selectedDomain).length > 0?<li className="sm-txt" onClick={()=>props.addQuestionHandler()}><small style={{pointerEvents:"none"}}><i className="fas fa-plus"></i> Add New Question</small><span
                                className="ml-2"></span></li>:""}
                    </ul>
                </div>
            </div>
            {Object.keys(selectedDomain).length > 0?<div className="row mt-4 question-sec" onDragOver={Object.keys(selectedDomain).length > 0?(e)=>props.onDraggedQuestionDragOver(e):()=>{}} onDrop={Object.keys(selectedDomain).length > 0?(e)=>props.onDraggedQuestionDrop(e):()=>{}}>
                <div className="col-md-12 col-lg-12 col-xl-8">
                    {questions}
                </div>
            </div>:null}


            {/* MODEL FOR SKIPING THE QUESITONS */}
            <Modal show={show} onHide={handleClose} animation={false}
                           size="lg"
                           aria-labelledby="contained-modal-title-vcenter"
                           centered
                           scrollable
                        >
                        <Modal.Header closeButton>
                        <Modal.Title>Select Questions To Skip</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                        <div>
                        <ul class="list-group">
                            {data && data.length && data.map(item => (
                        <li class="list-group-item">
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" checked={checkedList.filter((ques)=>ques==item.QuestionId).length>0}  onChange={(e) =>handleCheckbox(e ,item.QuestionId )} id="defaultCheck1"/>
                        <label class="form-check-label" for="defaultCheck1">
                          { item.questionText}
                        </label>
                        </div>
                        </li>
                            ))}
                        </ul>
                        </div>

                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button disabled={!(data && data.length)} variant="primary" onClick={handleSaveModal}>
                            Save
                        </Button>
                        </Modal.Footer>
                    </Modal>


                           {/* MODEL FOR SET SCORING */}


                       <Modal show={showSetScore} onHide={() => setShowSetScore(!showSetScore)} animation={false}
                           size="lg"
                           aria-labelledby="contained-modal-title-vcenter"
                           centered
                           scrollable
                        >
                        <Modal.Header closeButton>
                        <Modal.Title>Set Score</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                        <div className="d-flex justify-content-between mx-2">
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" onChange={(e) => setDropDowanStatus(e.target.checked)} checked={dropDowanStatus} />
                        <label class="form-check-label" for="defaultCheck1" >
                            Set Dropdown Scoring
                        </label>
                        </div>
                            <div>

                        <button disabled={!dropDowanStatus} onClick={handleDynmicInputs} type="button" class="btn btn-primary btn-sm">+ Add Dropdown Options</button>
                            </div>
                           </div>

                        <div className="mt-4">
                   
                           {inputs.map(item => {
                               return    <div class="form-row form-group">
                               <div class="form-inline col-md-6">
                               <label for="value" class="col-sm-2 col-form-label">Text</label>
                                <div class="col-sm-10">
                                <input type="text" name="DropdownText" onChange={(e) => handleChangeValue(e,item.BenchmarkScoringDropdownId)}  class="form-control" id="value" value={item.DropdownText} />
                                </div>
                               </div>
                               <div class="form-inline col-md-6">
                               <label for="text" class="col-sm-2 col-form-label">Value</label>
                                <div class="col-sm-10">
                                <input type="text"  name="DropdownValue" onChange={(e) => handleChangeValue(e,item.BenchmarkScoringDropdownId)} class="form-control" id="text" value={item.DropdownValue} />
                                </div>
                               </div>
                             </div>
                               
                          
                        })}
                       
                        </div>

                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowSetScore(!showSetScore)}>
                            Close
                        </Button>
                        <Button  variant="primary" onClick={handleSaveScoreModal}>
                            Save
                        </Button>
                        </Modal.Footer>
                    </Modal>
                

        </>
    )
}

const mapStateToProps = state => ({
    selectedDomain : state.benchmarkingData.currentSelectedDomainName,
    selectProject: state.benchmarkingData.currentSelectedQuestionBank,
    currentDomainForEdit : state.questionaire.projectSelectedDomainData
})

export default connect(mapStateToProps,{})(QuestionsBankQuestionsAndResponses);