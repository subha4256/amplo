import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { confirmAlert } from 'react-confirm-alert';

import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import FooterComponent from "../includes/dashboardFooter/FooterComponent";
import { DesignThinkingPrototypeWrapper } from './Styling/DesignThinkingPrototype';
import DesignThinkingPrototypeBreadcrumb from './DesignThinkingPrototypeBreadcrumb';
import DesignThinkingPrototypeTopBar from './DesignThinkingPrototypeTopBar';
import DesignThinkingPrototypeLeftBar from './DesignThinkingPrototypeLeftBar';
import DesignThinkingPrototypeBody from './DesignThinkingPrototypeBody';
import { fetchSwotEpics, fetchSwotIdeas } from '../../actions/ideateActions';
import { fetchPrototype, savePrototype, savePrototypeSession, uploadFilePrototype, deleteTextsPostIdsShapes, deletePrototypeFile } from '../../actions/prototypeActions';
import { Global } from '../../utils/Env';

class DesignThinkingPrototype extends Component {

    constructor(props){
        super(props);
        Global.callback.fetchSwotEpics_onComplete = res => {
            const SubEpics = res.data.EPic?res.data.EPic[0].SubEpic?res.data.EPic[0].SubEpic:[]:[];
            if(SubEpics.length > 0){
                this.props.fetchSwotIdeas(SubEpics[0].id);
                this.setState({
                    selectedSubEpic : SubEpics[0].id
                })
            }
        }
        Global.callback.fetchSwotIdeas_onComplete = res => {
            if(Object.keys(this.state.selectedIdea).length <= 0){
                this.setState({
                    selectedIdea : Array.isArray(res.data) ? res.data.length > 0 ? res.data[0] : {} : {}
                })
            }
            if(Array.isArray(res.data) && res.data.length > 0){
                this.props.fetchPrototype(res.data[0].DtIdeateSessionIdeaId);
            }
        }
        Global.callback.savePrototype_onComplete = () => {
            this.props.fetchPrototype(this.state.selectedIdea.DtIdeateSessionIdeaId);
        }
        Global.callback.uploadFilePrototype_onComplete = res => {
            let files = [...this.state.files];
            files.push({
                Id: 0,
                x: 150,
                y: 150,
                path: res.data.FilePath
            });
            this.setState({
                files
            });
        }
    }

    state = {
        projectId: this.props.match.params.projectId,
        epicId: this.props.match.params.epicId,
        shapes : [],
        texts : [],
        postIds : [],
        files : [],
        currentSelectedShapeToDrop : "",
        draggedPostIdColor : "",
        selectedSubEpic : 0,
        selectedIdea : {},
        prototypeId : 0,
        fetchedPrototype : {},
        fromTime: new Date(),
        fromDate: new Date(),
        toDate: new Date(),
        toTime: new Date(),
        ideateFormData: {
            Participants: [],
            NotifyType: "Notification",
            NotifyUnit: "Minutes",
            Location : "",
            pageId: ''
        },
        participantErr: "",
        participant: "",
        descriptionState: EditorState.createEmpty(),
    }

    componentDidMount(){
      this.props.fetchSwotEpics(this.state.projectId, this.state.epicId);
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        let returnObj = {...prevState};
        if(nextProps.prototype != prevState.fetchedPrototype){
            if(nextProps.prototype.length > 0){
                let PostIds = nextProps.prototype[0].PostIds ? nextProps.prototype[0].PostIds.map(postId=>{
                    return {
                        Id: postId.Id ? postId.Id : 0,
                        x: postId.x ? parseInt(postId.x,10) : 0,
                        y: postId.y ? parseInt(postId.y,10) : 0,
                        height: postId.height ? parseInt(postId.height,10) : 100,
                        width: postId.width ? parseInt(postId.width,10) : 100,
                        color: postId.colour ? postId.colour : 'boxyellow'
                    }
                }) : [];
        
                let Shapes = nextProps.prototype[0].Shapes ? nextProps.prototype[0].Shapes.map(shape=>{
                    return {
                        Id: shape.Id ? shape.Id : 0,
                        x: shape.x ? parseInt(shape.x,10) : 0,
                        y: shape.y ? parseInt(shape.y,10) : 0,
                        height: shape.height ? parseInt(shape.height,10) : 100,
                        width: shape.width ? parseInt(shape.width,10) : 100,
                        rotation: shape.rotations ? parseInt(shape.rotations,10) : 0,
                        type: shape.type ? shape.type : 'rectangle'
                    }
                }) : [];
        
                let Texts = nextProps.prototype[0].Text ? nextProps.prototype[0].Text.map(text=>{
                    return {
                        Id: text.Id ? text.Id : 0,
                        x: text.x ? parseInt(text.x,10) : 0,
                        y: text.y ? parseInt(text.y,10) : 0,
                        height: text.height ? parseInt(text.height,10) : 100,
                        width: text.width ? parseInt(text.width,10) : 100,
                        text: text.description ? text.description : ""
                    }
                }) : [];

                let Files = nextProps.prototype[0].Files ? nextProps.prototype[0].Files.map(file=>{
                    return {
                        Id: file.Id ? file.Id : 0,
                        x: file.x ? parseInt(file.x,10) : 0,
                        y: file.y ? parseInt(file.y,10) : 0,
                        path : file.path
                    }
                }) : [];

                returnObj = {
                    ...returnObj,
                    shapes : Shapes,
                    texts : Texts,
                    postIds : PostIds,
                    prototypeId : nextProps.prototype[0].PrototypeId,
                    fetchedPrototype : nextProps.prototype,
                    files : Files
                }
            }else{
                returnObj = {
                    ...returnObj,
                    shapes : [],
                    texts : [],
                    postIds : [],
                    files : [],
                    prototypeId : 0,
                    fetchedPrototype : nextProps.prototype
                }
            }
        }
        return returnObj;
    }

    deleteShapesPostIdsTexts = (id,i,type) => {
        confirmAlert({
            title: 'Confirm to continue',
            message: 'Are you sure to delete this ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let items = [...this.state[type]]
                        if(id > 0){
                            this.props.deleteTextsPostIdsShapes(id);
                            items.splice(i,1);
                        }else{
                            items.splice(i,1);
                        }
                        this.setState({
                            [type] : items
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        }); 
    }

    deleteFiles = (id, path, i) => {
        confirmAlert({
            title: 'Confirm to continue',
            message: 'Are you sure to delete this ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let files = [...this.state.files]
                        this.props.deletePrototypeFile({
                            FilePath:path
                        });
                        files.splice(i,1);
                        this.setState({
                            files : files
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        }); 
    }

    handleSavePrototypeSession = () => {
        let ideateFormData = this.state.ideateFormData;
        const fromDate = this.state.fromDate;
        const fromTime = this.state.fromTime;
        const toDate = this.state.toDate;
        const toTime = this.state.toTime;
        ideateFormData.Note = draftToHtml(convertToRaw(this.state.descriptionState.getCurrentContent()));
        ;

        // for appending 0
        let fromMonth = (parseInt(fromDate.getMonth())+1);
        if(fromMonth < 10) {
            fromMonth = '0'+fromMonth;
        }
        let fromDayDate = fromDate.getDate();
        if(fromDayDate < 10) {
            fromDayDate = '0'+fromDayDate;
        }
        let toMonth = (parseInt(toDate.getMonth())+1);
        if(fromMonth < 10) {
            toMonth = '0'+toMonth;
        }
        let toDayDate = toDate.getDate();
        if(toDayDate < 10) {
            toDayDate = '0'+toDayDate;
        }
        let fromHours = fromTime.getHours();
        if(fromHours < 10) {
            fromHours = '0'+fromHours;
        }
        let fromMins = fromTime.getMinutes();
        if(fromMins < 10) {
            fromMins = '0'+fromMins;
        }
        let toHours = toTime.getHours();
        if(toHours < 10) {
            toHours = '0'+toHours;
        }
        let toMins = toTime.getMinutes();
        if(toMins < 10) {
            toMins = '0'+toMins;
        }

        let fromDateTime = fromDate.getFullYear()+'-'+fromMonth+'-'+fromDayDate+' '+fromHours+':'+fromMins+':00';
        ideateFormData.FromDateTime = fromDateTime;
        let toDateTime = toDate.getFullYear()+'-'+toMonth+'-'+toDayDate+' '+toHours+':'+toMins+':00';
        let json = {
            PrototypeSessionId:0,
            FromDateTime: fromDateTime,
            ToDateTime: toDateTime,
            TimeZoneName: "Indian Standard Time",
            Location: ideateFormData.Location,
            NotifyBefore: ideateFormData.NotifyBefore,
            TimeType: ideateFormData.TimeType ? ideateFormData.TimeType : "",
            Note: ideateFormData.Note,
            NotePlainText: ideateFormData.Note.replace( /(<([^>]+)>)/ig, ''),
            EpicId: this.state.epicId,
            EpicVersionId: 0,
            ProjectId: this.state.projectId,
            ProjectVersionId: 0,
            Participants: ideateFormData.Participants,
            pageId: this.props.location.pathname
        }
        this.props.savePrototypeSession(json);
    }

    fromDateChangeHandler = (date) => {
        this.setState({
            fromDate: date
        })
    }

    fromTimeChangeHandler = (time) => {
        this.setState({
            fromTime: time
        })
    }

    toTimeChangeHandler = (time) => {
        this.setState({
            toTime: time
        })
    }

    toDateChangeHandler = (date) => {
        this.setState({
            toDate: date
        })
    }

    uploadFile = (inputId) => {
        let fd = new FormData;
        fd.append('File', document.getElementById(inputId).files[0])
        this.props.uploadFilePrototype(fd);
        document.getElementById(inputId).value = "";
    }

    handleOnChange = (e) => {
        let ideateFormData = this.state.ideateFormData;
        ideateFormData[e.target.name] = e.target.value;
        this.setState({ideateFormData: ideateFormData});
    }

    scheduleDescription = (descriptionState) => {
        this.setState({
            descriptionState
        });
    };
    
    handleParticipantChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    keyPress = (e) => {
        if(e.keyCode == 13){
            let email = e.target.value;
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(email)) {
                let ideateForm = this.state.ideateFormData;
                ideateForm.Participants.push({email: email});
                this.setState({ideateFormData: ideateForm, participantErr: "", participant: ""});
            }else{
                this.setState({participantErr: "Email is invalid"});
            }
        }
     }

    savePrototype = () => {
        let PostIds = this.state.postIds.map(postId=>{
            return {
                Id: postId.Id,
                x: postId.x,
                y: postId.y,
                height: postId.height,
                width: postId.width,
                colour: postId.color
            }
        });

        let Shapes = this.state.shapes.map(shape=>{
            return {
                Id: shape.Id,
                x: shape.x,
                y: shape.y,
                height: shape.height,
                width: shape.width,
                rotations: shape.rotation,
                type: shape.type
            }
        });

        let Texts = this.state.texts.map(text=>{
            return {
                Id: text.Id,
                x: text.x,
                y: text.y,
                height: text.height,
                width: text.width,
                description: text.text
            }
        });

        let saveObj = {
            PrototypeId:this.state.prototypeId,
            ProjectId:this.state.projectId,
            ProjectVersionId:0,
            EpicId:this.state.epicId,
            EpicVersionId:0,
            SubEpicId:this.state.selectedSubEpic,
            Files:this.state.files,
            IdeaId:this.state.selectedIdea.DtIdeateSessionIdeaId,
            Shapes:Shapes,
            Text:Texts,
            PostIds:PostIds
        }
        this.props.savePrototype(saveObj);
    }

    subEpicChangeHandler = subEpicId => {
        this.setState({
            selectedSubEpic : subEpicId,
            selectedIdea : {}
        });
        this.props.fetchSwotIdeas(subEpicId);
    }

    ideaChangeHandler = idea => {
        this.setState({
            selectedIdea : idea,
            prototypeId : 0
        });
        this.props.fetchPrototype(idea.DtIdeateSessionIdeaId);
    }

    shapeDragStartHandler = (e, type, color) => {
        this.setState({
            currentSelectedShapeToDrop : type,
            draggedPostIdColor : color ? color : ""
        })
    }

    shapeDropHandler = (e) => {
        let el = e.target.getBoundingClientRect();
        let elX = el.x+window.pageXOffset;
        let elY = el.y+window.pageYOffset;
        let posDropped = {x : e.pageX-elX, y : e.pageY-elY};
        if(this.state.currentSelectedShapeToDrop !== "text" && this.state.currentSelectedShapeToDrop !== "postIds"){
            this.setState({
                shapes : [...this.state.shapes, {
                    Id : 0,
                    type : this.state.currentSelectedShapeToDrop, 
                    x : posDropped.x, 
                    y : posDropped.y, 
                    height : 100,
                    width : 100,
                    rotation : 0
                }],
                currentSelectedShapeToDrop : ""
            });
        }else if(this.state.currentSelectedShapeToDrop === "text"){
            this.textDropHandler(posDropped);
        }else if(this.state.currentSelectedShapeToDrop === "postIds"){
            this.postIdsDropHandler(posDropped);
        }
    }

    postIdsDropHandler = (posDropped) => {
        this.setState({
            postIds : [...this.state.postIds, {
                Id : 0,
                x : posDropped.x,
                y : posDropped.y,
                height : 100,
                width : 100,
                color : this.state.draggedPostIdColor
            }],
            currentSelectedShapeToDrop : "",
            draggedPostIdColor : ""
        })
    }

    textDropHandler = (posDropped) => {
        this.setState({
            texts : [...this.state.texts, { 
                Id : 0,
                x : posDropped.x, 
                y : posDropped.y, 
                height : 100,
                width : 100,
                text : ""
            }],
            currentSelectedShapeToDrop : ""
        })
    }

    handleDragOfShapes = (i, deltaX, deltaY) => {
        let shapes = [...this.state.shapes];
        shapes[i].x = shapes[i].x + deltaX;
        shapes[i].y = shapes[i].y + deltaY;
        this.setState({
            shapes
        });
    }

    textDragStopHandler = (position, ind) => {
        let texts = [...this.state.texts];
        texts[ind].x = position.x;
        texts[ind].y = position.y;
        this.setState({
            texts
        })
    }

    fileDragStopHandler = (position, ind) => {
        let files = [...this.state.files];
        files[ind].x = position.x;
        files[ind].y = position.y;
        this.setState({
            files
        })
    }

    postIdsDragStopHandler = (position, ind) => {
        let postIds = [...this.state.postIds];
        postIds[ind].x = position.x;
        postIds[ind].y = position.y;
        this.setState({
            postIds
        })
    }

    textResizeStopHandler = (ref, pos, ind) => {
        let texts = [...this.state.texts];
        texts[ind] = {
            ...texts[ind],
            height : ref.style.height,
            width : ref.style.width,
            ...pos
        }
        this.setState({
            texts
        })
    }

    postIdsResizeStopHandler = (ref, pos, ind) => {
        let postIds = [...this.state.postIds];
        postIds[ind] = {
            ...postIds[ind],
            height : ref.style.height,
            width : ref.style.width,
            ...pos
        }
        this.setState({
            postIds
        })
    }

    handleRotateOfShapes = (i,rotateAngle) => {
        let shapes = [...this.state.shapes];
        shapes[i].rotation = rotateAngle;
        this.setState({
            shapes
        });
    }

    handleResizeOfShapes = (i,style) => {
        const { top, left, width, height } = style;
        let shapes = [...this.state.shapes];
        shapes[i].x = Math.round(left);
        shapes[i].y = Math.round(top);
        shapes[i].height = Math.round(height);
        shapes[i].width = Math.round(width);
        this.setState({
            shapes
        });
    }

    textChangeHandler = (value, ind) => {
        let texts = [...this.state.texts];
        texts[ind].text = value;
        this.setState({
            texts
        })
    }


    render(){
        return(
            <>
                <DashboardHeader />
                <DesignThinkingPrototypeWrapper id="wrapper">
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <DesignThinkingPrototypeBreadcrumb  />
                            <div className="container-fluid container-dashboard">
                                <DesignThinkingPrototypeTopBar projectId={this.state.projectId} epicId={this.state.epicId} savePrototype={this.savePrototype} />
                                <div className="row">
                                    <div className="dt-screen-main">
                                        <DesignThinkingPrototypeLeftBar 
                                            shapeDragStartHandler={this.shapeDragStartHandler} 
                                        />
                                        <DesignThinkingPrototypeBody  
                                            deleteShapesPostIdsTexts = {this.deleteShapesPostIdsTexts}
                                            shapeDropHandler={this.shapeDropHandler} 
                                            shapes={this.state.shapes} 
                                            files = {this.state.files}
                                            fileDragStopHandler = {this.fileDragStopHandler}
                                            handleDragOfShapes={this.handleDragOfShapes} 
                                            handleRotateOfShapes={this.handleRotateOfShapes} 
                                            handleResizeOfShapes={this.handleResizeOfShapes} 
                                            texts={this.state.texts} 
                                            textChangeHandler={this.textChangeHandler} 
                                            textDragStopHandler={this.textDragStopHandler}
                                            textResizeStopHandler = {this.textResizeStopHandler}
                                            postIds={this.state.postIds}
                                            postIdsDragStopHandler={this.postIdsDragStopHandler}
                                            postIdsResizeStopHandler={this.postIdsResizeStopHandler}
                                            subEpicChangeHandler={this.subEpicChangeHandler}
                                            selectedSubEpic={this.state.selectedSubEpic}
                                            ideaChangeHandler={this.ideaChangeHandler}
                                            selectedIdea={this.state.selectedIdea}
                                            projectId={this.state.projectId} 
                                            epicId={this.state.epicId}
                                            handleSavePrototypeSession = {this.handleSavePrototypeSession}
                                            fromTime = {this.state.fromTime}
                                            fromDate = {this.state.fromDate}
                                            toDate = {this.state.toDate}
                                            toTime = {this.state.toTime}
                                            ideateFormData = {this.state.ideateFormData}
                                            participantErr = {this.state.participantErr}
                                            participant = {this.state.participant}
                                            descriptionState = {this.state.descriptionState}
                                            fromDateChangeHandler = {this.fromDateChangeHandler}
                                            fromTimeChangeHandler = {this.fromTimeChangeHandler}
                                            toTimeChangeHandler = {this.toTimeChangeHandler}
                                            toDateChangeHandler = {this.toDateChangeHandler}
                                            handleOnChange = {this.handleOnChange}
                                            scheduleDescription = {this.scheduleDescription}
                                            handleParticipantChange = {this.handleParticipantChange}
                                            keyPress = {this.keyPress}
                                            deleteFiles = {this.deleteFiles}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DesignThinkingPrototypeWrapper>
                <FooterComponent />
                <div className="modal modeling-modal" id="addImage">                
                    <div className="modal-dialog modal-dialog-centered">                    
                        <div className="modal-content">
                            <div className="modal-header pb-0">
                                <h5>Add Image</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body pt-0">
                                <div className="form-group">
                                    <label>Add Image</label>
                                    <input className="form-control" type="file" name="addImage" id="addImagePopupInput"  />  
                                </div>
                            </div>
                            <div className="modal-footer pt-0">                       
                                <button type="button" className="btn btn-primary ml-3" onClick={()=>{document.getElementById('addImagePopupInput').value = ""}}  data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary ml-3" onClick={()=>this.uploadFile('addImagePopupInput')}  data-dismiss="modal">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal modeling-modal" id="addVideo">                
                    <div className="modal-dialog modal-dialog-centered">                    
                        <div className="modal-content">
                            <div className="modal-header pb-0">
                                <h5>Add Video</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body pt-0">
                                <div className="form-group">
                                    <label>Add Video</label>
                                    <input className="form-control" type="file" name="addVideo" id="addVideoPopupInput"  />  
                                </div>
                            </div>
                            <div className="modal-footer pt-0">                       
                                <button type="button" className="btn btn-primary ml-3" onClick={()=>{document.getElementById('addVideoPopupInput').value = ""}}  data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary ml-3" onClick={()=>this.uploadFile('addVideoPopupInput')}  data-dismiss="modal">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal modeling-modal" id="addAudio">                
                    <div className="modal-dialog modal-dialog-centered">                    
                        <div className="modal-content">
                            <div className="modal-header pb-0">
                                <h5>Add Audio</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body pt-0">
                                <div className="form-group">
                                    <label>Add Audio</label>
                                    <input className="form-control" type="file" name="addAudio" id="addAudioPopupInput"  />  
                                </div>
                            </div>
                            <div className="modal-footer pt-0">                       
                                <button type="button" className="btn btn-primary ml-3" onClick={()=>{document.getElementById('addAudioPopupInput').value = ""}} data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary ml-3" onClick={()=>this.uploadFile('addAudioPopupInput')} data-dismiss="modal">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    epics: state.ideate.epics,
    ideas : state.ideate.ideas,
    prototype : state.prototype.prototype
})

export default connect(mapStateToProps, { fetchSwotEpics, fetchSwotIdeas, fetchPrototype, savePrototype, savePrototypeSession, uploadFilePrototype, deleteTextsPostIdsShapes, deletePrototypeFile })(DesignThinkingPrototype);