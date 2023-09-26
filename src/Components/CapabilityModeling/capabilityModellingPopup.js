import React from 'react';
import { Editor } from 'react-draft-wysiwyg';

const capabilityModellingPopup = props => {
    const { selectedProcess } = props
    let ppNum = 0;
    return(
        <>
            <div className="modal modeling-modal" id="modelingPopup">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header pb-0">
                            <h5>Level {selectedProcess.ProcessLevel}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body pt-0">
                        <p>{(selectedProcess.number === null)?"1 ":selectedProcess.number}- {selectedProcess.text}</p>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#tab1">Description</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#tab2">Painpoints</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#tab3">Comments</a>
                            </li>
                        </ul>
                        {/* <!-- Tab panes --> */}
                        <div className="tab-content mt-3">
                            <div className="tab-pane active" id="tab1">
                                <div className="descripton-sec">
                                    <Editor
                                        editorState={props.descriptionState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={props.ondescriptionState}
                                    />
                                    <div className="delsec">
                                        <a className="mr-auto delicon" onClick={()=>props.deletePopupButton("description")}><i className="far fa-trash-alt"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab2">
                                <div id="painpointaccord">
                                    <div className="descripton-sec">
                                        {
                                            props.painpointsState.map((painPoint,Ind)=>{
                                                if(painPoint.action != "delete"){
                                                    ppNum = ppNum+1;
                                                    return[
                                                        <div class="card" key={"title"+Ind}>
                                                            <div class="card-header">
                                                                <a style={{fontSize:"17px"}} class="card-link" data-toggle="collapse" href={"#painpoint"+ppNum} onClick={()=>props.selectPainpointForDelete(Ind)}>
                                                                {(painPoint.paintpoint_title != "")?painPoint.paintpoint_title:"Painpoint "+ppNum+" Title"}
                                                                </a>
                                                            </div>
                                                            <div id={"painpoint"+ppNum} class={Ind == 0?"collapse show":"collapse"} data-parent="#painpointaccord">
                                                                <div class="card-body">
                                                                <div class="descripton-sec">
                                                                    <input style={{fontSize:"17px"}} type="text" placeholder={"Painpoint "+ppNum+" Title"}  onChange={(e)=>props.onPainPointChange(e.target.value,Ind,"title")} value={painPoint.paintpoint_title} />
                                                                    <Editor
                                                                        key={"painPoint"+Ind}
                                                                        editorState={painPoint.paintpoint_description}
                                                                        wrapperClassName="demo-wrapper"
                                                                        editorClassName="demo-editor"
                                                                        onEditorStateChange={(painPointState)=>props.onPainPointChange(painPointState,Ind,"editor")}
                                                                    />
                                                                    <div class="delsec">
                                                                    <a class="mr-auto delicon" onClick={()=>props.deletePopupButton("painpoints",Ind)}><i class="far fa-trash-alt"></i></a>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                       
                                                    ];
                                                }
                                            })
                                        }
                                        <div className="delsec">
                                            {/* <a className="mr-auto delicon" ><i className="far fa-trash-alt"></i></a> */}
                                            <a onClick={props.addPainPointHandler} className="text-cenetr m-auto">+ Add Another Painpoint</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="tab3">
                                <div className="descripton-sec">
                                    <Editor
                                        editorState={props.commentsState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                        onEditorStateChange={props.oncommentsState}
                                    />
                                    <div className="delsec">
                                    <a className="mr-auto delicon" onClick={()=>props.deletePopupButton("comment")}><i className="far fa-trash-alt"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer pt-0">
                        <a href="#" data-dismiss="modal">Cancel</a> <span className="mx-1">|</span>
                        <a href="#" data-dismiss="modal" onClick={()=>props.savePopUpData(selectedProcess, props.descriptionState, props.commentsState, props.painpointsState)}>Save</a>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default capabilityModellingPopup;