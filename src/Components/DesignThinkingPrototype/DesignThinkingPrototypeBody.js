import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import ResizableRect from 'react-resizable-rotatable-draggable';
import DatePicker from "react-datepicker";
import { Editor } from 'react-draft-wysiwyg';
import { Link } from 'react-router-dom';
import { Rnd } from "react-rnd";
import { ReactComponent as Arrow } from '../../common/images/arrow.svg';
import { ReactComponent as Circle } from '../../common/images/circle.svg';
import { ReactComponent as Diamond } from '../../common/images/diamond.svg';
import { ReactComponent as Hexagon } from '../../common/images/hexagon.svg';
import { ReactComponent as Line } from '../../common/images/line.svg';
import { ReactComponent as Pentagon } from '../../common/images/pentagon.svg';
import { ReactComponent as Rectangle } from '../../common/images/rectangle.svg';
import { ReactComponent as Square } from '../../common/images/square.svg';
import { ReactComponent as Star } from '../../common/images/star.svg';
import { ReactComponent as Triangle } from '../../common/images/triangle.svg';
import ModalPopup from '../common/ModalPopup';


const DesignThinkingPrototypeBody = props => {

    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const handleSavePrototypeSession = () => {
        setIsOpen(!isOpen);
        props.handleSavePrototypeSession();
    }

    const components = {
        arrow : Arrow,
        line : Line,
        rectangle : Rectangle,
        square : Square,
        circle : Circle,
        pentagon : Pentagon,
        hexagon : Hexagon,
        star : Star,
        diamond : Diamond,
        triangle : Triangle
    }

    return(
        <>
            <div className="dt-content-wrapper">
                <div className="content-wraper">
                    <div className="container-fluid">
                        <div className="row epic-version align-items-center">
                            <div className="col-sm-12 col-md-12 col-lg-8 pt-3">
                                <h2 className="d-flex align-items-center"><span>Prototype</span> 
                                <select className="custom-select ml-3" onChange={(e)=>props.subEpicChangeHandler(e.target.value)} value={props.selectedSubEpic}>
                                    {Object.keys(props.epics).length > 0?props.epics.EPic[0].SubEpic.map(subEpic => {
                                        return <option key={'subEpic_'+subEpic.id} value={subEpic.id}>{subEpic.name}</option>
                                    }) : null}
                                </select> 
                                <Link to={`/dt-network-of-experience/${props.projectId}/${props.epicId}`} className="ml-3">Network of Experience</Link></h2>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-4 pt-3 text-right">
                                <ul className="list-inline pager-list mb-0">
                                    <li className="list-inline-item"><Link to={`/dt-dvf/${props.projectId}/${props.epicId}`}>Previous</Link></li>|
                                    <li className="list-inline-item"><Link to={`/dt-roadmap/${props.projectId}/${props.epicId}`}>Next</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row generate-ideas-row">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="ideascard mt-3">
                                    <div className="card-body ideas-card">
                                        <div className="row w-100">
                                            {props.ideas.map(idea=>{
                                               
                                                if(idea.IsForPrototype == 1) {
                                                    return(
                                                        <div className="col-sm-12 col-md-3 col-lg-3 mb-3" key={"idea_"+idea.DtIdeateSessionIdeaId} onClick={()=>props.ideaChangeHandler(idea)}>
                                                            <div className={props.selectedIdea.DtIdeateSessionIdeaId == idea.DtIdeateSessionIdeaId ? "ideas-box active" : "ideas-box"}>
                                                                <a href="#" className="moreicon"><i className="fas fa-ellipsis-h"></i></a>
                                                                <h3>{idea.IdeaTitle}</h3>
                                                                <p>{idea.IdeaNotePlainText}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                } 
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-12">
                                <div className="card prototype-height mb-10">
                                    <div className="card-body bg-white h-100" onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>props.shapeDropHandler(e)}>
                                        {
                                            props.shapes.map((shape,i)=>{
                                                if(shape.type){
                                                    let Component = components[shape.type]
                                                    return(
                                                        <Fragment key={`shape_no_${i}`}>
                                                            <div style={{left : shape.x, top : shape.y, height : shape.height, width : shape.width, position : "absolute", transform: `rotate(${shape.rotation}deg)`}}>
                                                                <Component />
                                                            </div>
                                                            <ResizableRect
                                                                top={shape.y}
                                                                rotatable
                                                                left={shape.x}
                                                                minWidth={10}
                                                                width={shape.width}
                                                                minHeight={10}
                                                                height={shape.height}
                                                                onDrag={(deltaX, deltaY)=>props.handleDragOfShapes(i, deltaX, deltaY)}
                                                                onRotate={rotateAngle=>props.handleRotateOfShapes(i,rotateAngle)}
                                                                onResize={(style, isShiftKey, type) =>props.handleResizeOfShapes(i,style)}
                                                                zoomable="nw, ne, se, sw"
                                                                rotateAngle={shape.rotation}
                                                            />
                                                            <i className="fa fa-times" style={{color : "red", position : "absolute", left : shape.x-10, top :  shape.y-10}} onClick={()=>props.deleteShapesPostIdsTexts(shape.Id,i,'shapes')}></i>
                                                        </Fragment>
                                                    )
                                                }else{
                                                    return null;
                                                }
                                            })
                                        }
                                        {
                                            props.texts.map((text,i)=>{
                                                return(
                                                    <>
                                                    <Rnd
                                                        style={{display:"flex",alignItems:"center",justifyContent:"center",border: "solid 1px #ddd", zIndex : 999}}
                                                        default={{
                                                            x : text.x,
                                                            y : text.y,
                                                            width : text.width,
                                                            height : text.height
                                                        }}
                                                        onDragStop={(e,d)=>props.textDragStopHandler(d,i)}
                                                        onResizeStop={(e, direction, ref, delta, position)=>props.textResizeStopHandler(ref, position, i)}
                                                        enableResizing={{top : true, topLeft : false, topRight : true, left : true, right : true, bottom : true, bottomLeft : true, bottomRight : true}}
                                                        key={`text_no_${i}`}
                                                    >
                                                        <textarea value={text.text} onChange={(e)=>props.textChangeHandler(e.target.value, i)} style={{ height : parseInt(text.height, 10), width : parseInt(text.width, 10), border : 0, background : "transparent", resize : "none" }}></textarea>
                                                    </Rnd>
                                                    <i className="fa fa-times" style={{color : "red", position : "absolute", left : text.x-10, top :  text.y-10}} onClick={()=>props.deleteShapesPostIdsTexts(text.Id,i,'texts')}></i>
                                                    </>
                                                );
                                            })
                                        }
                                        {
                                            props.files.map((file,i)=>{
                                                return(
                                                    <>
                                                    <Rnd
                                                        style={{display:"flex",alignItems:"center",justifyContent:"center",border: "solid 1px #ddd", zIndex : 999}}
                                                        default={{
                                                            x : file.x,
                                                            y : file.y,
                                                            width : 100,
                                                            height : 50
                                                        }}
                                                        onDragStop={(e,d)=>props.fileDragStopHandler(d,i)}
                                                        enableResizing={false}
                                                        lockAspectRatio={false}
                                                        key={`text_no_${i}`}
                                                    >
                                                        <div className={"squarbox boxyellow"} style={{ width : 100,height : 50 , display:"flex", alignItems : "center", justifyContent : "center"}}>
                                                            <input type="button" onClick={()=>window.open(file.path ? file.path : "", "_blank")} value="Open File" style={{background:"transparent", border : 0}} title={file.path} />
                                                        </div>
                                                    </Rnd>
                                                    <i className="fa fa-times" style={{color : "red", position : "absolute", left : file.x-10, top :  file.y-10}} onClick={()=>props.deleteFiles(file.Id, file.path, i)}></i>
                                                    </>
                                                );
                                            })
                                        }
                                        {
                                            props.postIds.map((postId, i)=>{
                                                return(
                                                    <>
                                                        <Rnd
                                                            style={{display:"flex",alignItems:"center",justifyContent:"center",border: "solid 1px #ddd"}}
                                                            default={{
                                                                x : postId.x,
                                                                y : postId.y,
                                                                width : postId.width,
                                                                height : postId.height
                                                            }}
                                                            onDragStop={(e,d)=>props.postIdsDragStopHandler(d,i)}
                                                            onResizeStop={(e, direction, ref, delta, position)=>props.postIdsResizeStopHandler(ref, position, i)}
                                                            key={`postId_no_${i}`}
                                                        >
                                                            <div className={"squarbox "+postId.color} style={{ width : postId.width,height : postId.height}}>
                                                            </div>
                                                        </Rnd>
                                                        <i className="fa fa-times" style={{color : "red", position : "absolute", left : postId.x-10, top :  postId.y-10}} onClick={()=>props.deleteShapesPostIdsTexts(postId.Id,i,'postIds')}></i>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalPopup isOpen={isOpen} toggle={toggle} title="Schedule Prototype Session" onSave={handleSavePrototypeSession} className="schedulemodal modal-lg" footer={true} saveBtnTitle="Send">
                <div className="row">
                <div className="col-md-12 col-lg-8 pr-10">
                    <ul className="nav nav-tabs mb-3 border-0" role="tablist">
                        <li className="nav-item mr-3">
                        <a className="nav-link active" data-toggle="tab" href="#tab1" role="tab">Live working session</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#tab2" role="tab">Remote Prototype Completion</a>
                        </li>
                    </ul>
                        <div className="tab-content">
                            <div id="tab1" className="tab-pane in active">
                                <div className="schedulefrm">
                                    <div className="form-group form-inline">
                                    <DatePicker
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                        }}
                                        className="form-control datefld mb-2 mr-sm-2"
                                        id="fromDate"
                                        onChange={props.fromDateChangeHandler}
                                        dateFormat="MMMM d, yyyy"
                                        selected={props.fromDate}
                                    />
                                    <DatePicker 
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                        }}
                                        selected={props.fromTime ? props.fromTime : new Date()}
                                        onChange={props.fromTimeChangeHandler}
                                        showTimeSelect 
                                        showTimeSelectOnly
                                        dateFormat="h:mm aa"
                                        className="form-control timefld mb-2 mr-sm-2"
                                    />
                                    <span className="mr-2">To</span>
                                    <DatePicker 
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                        }}
                                        selected={props.toTime ? props.toTime : new Date()}
                                        onChange={props.toTimeChangeHandler}
                                        showTimeSelect 
                                        showTimeSelectOnly
                                        dateFormat="h:mm aa"
                                        className="form-control timefld mb-2 mr-sm-2"
                                    />
                                    <DatePicker
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                        }}
                                        className="form-control datefld mb-2 mr-sm-2"
                                        id="toDate"
                                        onChange={props.toDateChangeHandler}
                                        dateFormat="MMMM d, yyyy"
                                        selected={props.toDate}
                                    />
                                    <span>Time Zone</span>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="fas fa-map-marker-alt"></i></div>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Add Location" name="Location" onChange={props.handleOnChange} />
                                        </div>
                                    </div>
                                    <div className="form-group groupnotification">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="far fa-bell"></i></div>
                                            </div>
                                            <select className="custom-select form-control datefld mb-2 mr-sm-2" name="NotifyType">
                                                <option value="Notification">Notification</option>
                                            </select>
                                            <input type="text" className="form-control timefld mb-2 mr-sm-2" placeholder="10" name="NotifyBefore" onChange={props.handleOnChange} />
                                            <select className="custom-select form-control datefld mb-2" name="NotifyUnit">
                                                <option value="Minutes">Minutes</option>
                                                <option value="Hours">Hours</option>
                                            </select>
                                            <a href="#" className="px-2 py-1"><i className="fas fa-times text-dark"></i></a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <Editor
                                            editorState={props.descriptionState}
                                            wrapperClassName="schedule-session-editor-wrapper"
                                            editorClassName="schedule-session-editor"
                                            toolbar={{
                                                options: ['inline', 'fontSize', 'fontFamily']
                                            }}
                                            onEditorStateChange={props.scheduleDescription}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div id="tab2" className="tab-pane fade">
                            <div className="schedulefrm">
                                    <div className="form-group form-inline">
                                    <DatePicker
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                        }}
                                        className="form-control datefld mb-2 mr-sm-2"
                                        id="fromDate"
                                        onChange={props.fromDateChangeHandler}
                                        dateFormat="MMMM d, yyyy"
                                        selected={props.fromDate}
                                    />
                                    <DatePicker 
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                        }}
                                        selected={props.fromTime ? props.fromTime : new Date()}
                                        onChange={props.fromTimeChangeHandler}
                                        showTimeSelect 
                                        showTimeSelectOnly
                                        dateFormat="h:mm aa"
                                        className="form-control timefld mb-2 mr-sm-2"
                                    />
                                    <span className="mr-2">To</span>
                                    <DatePicker 
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                        }}
                                        selected={props.toTime ? props.toTime : new Date()}
                                        onChange={props.toTimeChangeHandler}
                                        showTimeSelect 
                                        showTimeSelectOnly
                                        dateFormat="h:mm aa"
                                        className="form-control timefld mb-2 mr-sm-2"
                                    />
                                    <DatePicker
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                        }}
                                        className="form-control datefld mb-2 mr-sm-2"
                                        id="toDate"
                                        onChange={props.toDateChangeHandler}
                                        dateFormat="MMMM d, yyyy"
                                        selected={props.toDate}
                                    />
                                    <span>Time Zone</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <h2>Guests</h2>
                        <div className="schedulefrm">
                            <div className="form-group">
                                <input type="email" className="form-control mb-2 mr-sm-2" placeholder="Add Guests" name="participant" onChange={props.handleParticipantChange} onKeyDown={props.keyPress} value={props.participant} />
                                {props.participantErr !== "" ? <p className='text-danger'>{props.participantErr}</p> : null}
                            </div>
                            <div className="addguests d-flex justify-content-between">
                                <div>
                                    <p className="m-0">{props.ideateFormData.Participants.length} guests</p>
                                    <p><small>1 yes, 3 awaiting</small></p>
                                </div>
                                <div>
                                    <i className="far fa-envelope"></i>
                                </div>
                            </div>
                            {props.ideateFormData.Participants.length ? 
                                <ul className="guests-list">
                                    {props.ideateFormData.Participants.map((participant, key) => {
                                        return(<li key={'participant-'+key}>
                                            <i className="fas fa-user-circle"></i> <span>{participant.email}</span>
                                        </li>)
                                    })}
                                </ul> : null
                            }
                        </div>
                    </div>
                </div>
            </ModalPopup>
        </>
    )
}

const mapStateToProps = state => ({
    epics: state.ideate.epics,
    ideas : state.ideate.ideas
})

export default connect(mapStateToProps,{})(DesignThinkingPrototypeBody);