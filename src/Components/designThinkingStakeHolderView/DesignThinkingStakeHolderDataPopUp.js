import React from 'react';  
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const DesignThinkingStakeHolderPopUp = (props) => {
    let conns = [];
    let connecs = [...props.connState];
    let stakeHolder = props.stakeholder.stakeholderId;
    let popUpConnecs = [];
    for(let i =0; i<connecs.length; i++){
        if(connecs[i].source == stakeHolder){
            popUpConnecs.push(connecs[i]);
        }
    }
    if(popUpConnecs != ""){
        conns = popUpConnecs.map((conn)=>{
            console.log(conn)
            let target = '';
            let impact = "";
            let influence = "";
            if(conn != null){
                if(conn.target != null){
                    target = document.getElementById("canvas").querySelector("#"+CSS.escape(conn.target));
                }
                impact = conn.impact;
                influence = conn.influence;
                return(<div className="border-bottom pb-3 mb-3" key={conn.conn_id}>
                    <div className="impact-block">
                        <p>
                            {target?target.getAttribute("data-name"):""}
                            <span className="d-block">{target?target.getAttribute("data-type"):""}</span>
                        </p>
                        <div className="d-flex align-items-center impct">
                            <span>Impact</span>
                            <select defaultValue={impact} onChange={(e) => props.popUpInfluenceHandler(influence,conn,e.target.value)} className="custom-select">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="strong">Strong</option>
                            </select>
                        </div>
                    </div>
                    <div className="influence-block">
                        <div className="mr-3">
                            <p className="m-0"><strong>Influence</strong></p>
                        </div>
                        <div className="dropdown mr-3">
                            <a className="dropdown-toggle" data-toggle="dropdown">
                                {(influence==="has")?<img className="img-fluid" src={ require('../../common/images/arrow1.png') } alt="" />:(influence==="is")?<img className="img-fluid" src={ require('../../common/images/arrow2.png') } alt="" />:(influence==="equal")?<img className="img-fluid" src={ require('../../common/images/arrow3.png') } alt="" />:""}
                            </a>
                            <div className="dropdown-menu">
                                <a className="d-block" href="#!" id="has" onClick={(e)=>props.popUpInfluenceHandler(e.target.id,conn,impact)}> <img className="img-fluid" style={{pointerEvents : "none"}} src={ require('../../common/images/arrow2.png') } alt="" />
                                </a>
                                <a className="d-block" href="#!" id="is" onClick={(e)=>props.popUpInfluenceHandler(e.target.id,conn,impact)}> <img className="img-fluid" style={{pointerEvents : "none"}} src={ require('../../common/images/arrow1.png') } alt="" /></a>
                                <a className="d-block" href="#!" id="equal" onClick={(e)=>props.popUpInfluenceHandler(e.target.id,conn,impact)}> <img className="img-fluid" style={{pointerEvents : "none"}} src={ require('../../common/images/arrow3.png') } alt="" /></a>
                            </div>
                        </div>
                        <div className="mr-3 arrow-lg">
                            <img className="img-fluid" src={ require('../../common/images/arrow4.png') } alt="" />
                            <p>{influence} Influence</p>
                        </div>
                        <div>
                            <img className="influence-img" src={ require('../../common/images/login_image.png') } alt="" />
                        </div>
                    </div>
                </div>);
            }
        });
    }
    return(
        <>
            {/*<!-- Start POPUP -->*/}
            <div className="modal stakmodal" id="stakeholderModal">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <a className="close" data-dismiss="modal" aria-label="Close" onClick={props.toggle}>
                                <span aria-hidden="true"><img src={ require('../../common/images/close-icon.png') } alt="" /></span>
                            </a>
                        </div>
                        <div className="modal-body">
                            <div className="popup-responsive">
                                <div className="media border-bottom pb-3">
                                    <img className="mr-3" src={ require('../../common/images/login_image.png') } alt="" />
                                    <div className="media-body text-left">
                                        <h5 className="mt-0">{props.stakeholder.stakeholderName}{/*Kathey K. Hernandez*/}</h5>
                                        <p>{props.stakeholder.stakeholderType}, Department</p>
                                        <p><span>{/**Sphere A - Immediate - */}{popUpConnecs.length} Outgoing Connections</span></p>
                                    </div>
                                </div>
                                <div className="connections">
                                    <h3>Connections</h3>
                                    {conns?conns:""}
                                </div>
                                <div className="add-comment pb-3">
                                    <h3>Add Comment</h3>
                                    <Editor
                                        // editorState={editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        // onEditorStateChange={this.onEditorStateChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div> 
            {/*<!-- End POPUP --></a>*/}   
        </> 
    );
}

export default DesignThinkingStakeHolderPopUp;