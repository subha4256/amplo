import React, {useState} from "react";
import { connect } from 'react-redux';
import { Global } from '../../../utils/Env'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import  { saveQuestionsAttachment, deleteClientAttachment, getQuestionsAttachment, deleteClientImportAttachment,getClientInterfaceAttachmentImport, saveClientImportQuestionAttachment } from  '../../../actions/benchmarkingActions'

const QuestionsBankSelectStyle = props => {

    Global.callback.deleteClientAttachment_onComplete = () => {
        props.getQuestionsAttachment(selectedQuestion.id)
    }

    Global.callback.deleteClientImportAttachment_onComplete = () => {
        props.getClientInterfaceAttachmentImport(selectedQuestion.id)
    }

    const fileRemoveHandler = (attchId) => {
        confirmAlert({
            title: 'Confirm to continue',
            message: 'Are you sure to delete this attachment ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        if(props.preview === true){
                            props.deleteClientImportAttachment(attchId)
                        }else{
                            props.deleteClientAttachment(attchId)
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        }); 
    }

    const [ selectedStyleId, setselectedStyleId ] = useState(0)
    const [ selectedQuestion, setselectedQuestion ] = useState(props.selectedQuestion)
    const [ selectedQuestionsResponses, setselectedQuestionsResponses ] = useState([])

    if(selectedQuestion != props.selectedQuestion){
        setselectedQuestion(props.selectedQuestion)
        if(props.selectedQuestion != null){
            setselectedStyleId(props.selectedQuestion.StyleId)
            setselectedQuestionsResponses(props.selectedQuestion.response)
        }
    }

    const changeResponseImage = (e,i) => {
        let responses = [...selectedQuestionsResponses]
        responses[i].ImagePath = e.target.checked == true ? "1" : "0"
        setselectedQuestionsResponses(responses)
    }

    let ind = props.stylesList.map(style=>style.StyleId).indexOf(selectedStyleId);
    let template_name = "";
    if(ind != -1){
        template_name = props.stylesList[ind].StyleName
    }

    const saveAttachment = () => {
        if(selectedQuestion && selectedQuestion.id > 0){
            if(document.getElementById('questionsAttachmentFile').files[0]){
                let fd = new FormData()
                fd.append('files',document.getElementById('questionsAttachmentFile').files[0])
                fd.append('attachment_note','')
                fd.append('QuestionId',selectedQuestion.id)
                if(props.preview === true){
                    props.saveClientImportQuestionAttachment(fd)
                }else{
                    props.saveQuestionsAttachment(fd)
                }
            }
        }
    }

    return(
        <div className="modal" id="picktemplate" role="dialog">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5>Pick a Style</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <ul className="list-inline">
                                {props.stylesList.map((style,i)=>{
                                    if(i < 5){
                                        let img = i+1;
                                        return(
                                            <li className="list-inline-item" key={"style_"+style.StyleId}>
                                                <div className="d-block">
                                                    <img className="img-fluid" src={require("../../../common/images/style-"+img+".png")} alt="" />
                                                </div>
                                                <div className="custom-control custom-radio ml-2 mb-2">
                                                    <input type="radio" className="custom-control-input" id={"style_"+style.StyleId} name="style" onChange={()=>setselectedStyleId(style.StyleId)} checked={selectedStyleId===style.StyleId?true:false} />
                                                    <label className="custom-control-label" htmlFor={"style_"+style.StyleId}>{style.StyleName}</label>
                                                </div>
                                            </li>
                                        )
                                    }
                                })}
                            </ul>
                        </div>

                        <div className="form-group row upload-row mt-4">
                            <div className="col-sm-12 col-md-5">
                                {template_name != ""?<div><h2 className="mb-4">{template_name} Response Images </h2>
                                {selectedQuestionsResponses.map((response,i)=>{
                                    return(<div className="custom-control custom-checkbox mb-3" key={"response"+i}>
                                        <input type="checkbox" className="custom-control-input" id={"response"+i} name="example1" onChange={(e)=>changeResponseImage(e,i)} 
                                        // checked={response.ImagePath == 0 || response.ImagePath == "0"?false:true}
                                        checked={true}
                                        disabled={true}
                                        />
                                        <label className="custom-control-label" htmlFor={"response"+i}>Response Image {i+1}</label>
                                    </div>)
                                })}</div>:""}
                                {/* <h2 className="mb-4">Questions Attachments</h2>
                                <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="response4" name="example1" />
                                    <label className="custom-control-label" htmlFor="response4">Question Attachments 
                                    </label>
                                </div> */}
                            </div>
                            <div className="col-sm-12 col-md-7 upload-files">
                                <h2>Upload files</h2>
                                <div className="upload-area text-center">
                                    {(props.preview == true) ? (props.previewAmploInterfaceAttachments.length > 0 )?<div className="filename">
                                        <div className="upfilename">
                                            <span>{props.previewAmploInterfaceAttachments[0].AttachmentName}</span>
                                            <i onClick={()=>fileRemoveHandler(props.previewAmploInterfaceAttachments[0].AttachmentId)} className="fa fa-times" aria-hidden="true"></i>
                                       </div>
                                    </div>:"" :(props.fetchedAttachmentData.length > 0 && selectedQuestion.id > 0)?<div className="filename">
                                        <div className="upfilename">
                                            <span>{props.fetchedAttachmentData[0].AttachmentName}</span>
                                            <i onClick={()=>fileRemoveHandler(props.fetchedAttachmentData[0].AttachmentId)} className="fa fa-times" aria-hidden="true"></i>
                                       </div>
                                    </div>:""}
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    <div>
                                        <span>Drag and drop here</span><br />
                                        <span>or</span> <br />
                                        <div className="upload-btn-wrapper">
                                            <button className="btn">browse</button>
                                            <input type="file" name="myfile" id="questionsAttachmentFile" disabled={true} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer pt-0">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal"
                            aria-label="Close">Cancel</button>
                        <button type="button" className="btn btn-primary ml-3" data-dismiss="modal" onClick={()=>{props.assignStyleToQuestion(selectedStyleId);  setselectedStyleId(0); saveAttachment()}} >Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    stylesList : state.benchmarkingData.stylesList,
    fetchedAttachmentData : state.benchmarkingData.getClientQuestionAttachment,
    previewAmploInterfaceAttachments : state.benchmarkingData.previewInterfaceAttachments,
})

export default connect(mapStateToProps,{ saveQuestionsAttachment, deleteClientAttachment, getQuestionsAttachment, deleteClientImportAttachment, getClientInterfaceAttachmentImport, saveClientImportQuestionAttachment })(QuestionsBankSelectStyle)