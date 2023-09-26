import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import _ from 'underscore';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import DatePicker from "react-datepicker";
import IdeaDefault from './IdeaDefault';
import GenerateIdeas from './GenerateIdeas';
import EpicList from './EpicList';
import EpicBreakDown from './EpicBreakDown';
import ModalPopup from '../common/ModalPopup';
import "react-datepicker/dist/react-datepicker.css";
import {fetchEpics, setFetchIdeas, setFetchLookups} from '../../actions/ideateActions';
import { responseMessage } from '../../utils/alert';
const config = require('../../config');
class DTProblemPinningBodyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptionState: EditorState.createEmpty(),
            generateIdeas: false,
            fullView: false,
            expandView: false,
            draggedIdea: null,
            selectedSubEpic: null,
            selectedIdea: null,
            ideateFormData: {
                Participants: [],
                NotifyType: "Notification",
                NotifyUnit: "Minutes",
                pageId: ''
            },
            prioritizedSubEpics: [],
            fromTime: new Date(),
            fromDate: new Date(),
            toDate: new Date(),
            toTime: new Date(),
            participantErr: "",
            participant: "",
            ideas:  [],
            isOpen: true,
            redirect : false,
            redirectBack : false
        }
    }
    
    async componentDidMount() {
        this.props.fetchEpics(this.props.projectId, this.props.epicId);
        let priorityLookups = await axios.get(config.laravelBaseUrl+'getPriorityLookup',{
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        this.props.setFetchLookups(priorityLookups.data);
        let pins = await axios.get(config.laravelBaseUrl+'getSubEpicByPriority/'+this.props.epicId+'/0',{
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        if(pins.status === 200) {
            this.setState({
                prioritizedSubEpics: pins.data.data
            })
        }else{
            responseMessage("error", pins.data.message, "");
        }
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    toggleFullView = (e) => {
        e.preventDefault();
        this.setState({
            fullView: !this.state.fullView
        })
    }
    toggleExpandView = (e) => {
        e.preventDefault();
        this.setState({
            expandView: !this.state.expandView
        })
    }
    addDrag = (e, subEpic) => {      
        this.setState({
            selectedSubEpic: subEpic
        });  
    }
    onDrop = (e) => {
        let el = e.target.parentElement.getBoundingClientRect();
        let elX = el.x+window.pageXOffset;
        let elY = el.y+window.pageYOffset;
        let posDropped = {x : e.pageX-elX, y : e.pageY-elY};
        let prioritizedSubEpics = this.state.prioritizedSubEpics;
        let subEpicExists = _.findIndex(prioritizedSubEpics, {SubEpicId: this.state.selectedSubEpic.id, PriorityLookUpId: e.currentTarget.getAttribute('rel')});
        if(subEpicExists !== -1) {
            prioritizedSubEpics[subEpicExists].SequenceNumber = parseInt(prioritizedSubEpics[subEpicExists].SequenceNumber) + 1;
        }else{
            prioritizedSubEpics.push({
                Id: 0,
                SubEpicId: this.state.selectedSubEpic.id,
                PriorityLookUpId: e.currentTarget.getAttribute('rel'),
                Difficulty: null,
                AnticipatedBenifitPoint: null,
                LocationX: posDropped.x,
                LocationY: posDropped.y,
                SequenceNumber: this.state.selectedSubEpic.SequenceNumber
            });
        }
        this.setState({
            prioritizedSubEpics: prioritizedSubEpics,
            selectedSubEpic: null
        });
        this.props.handlePrioritizedSubEpics(prioritizedSubEpics);
    }
    addIdeaDrag = (e, index) => {      
        this.setState({
            draggedIdea: index
        })    
    }
    onIdeaDrop = (e, index) => {
        let ideas = this.state.ideas;
        let draggedIdea = ideas[this.state.draggedIdea];
        let droppedIdea = ideas[index];
        droppedIdea.IdeaNotePlainText = droppedIdea.IdeaNotePlainText + ' ' + draggedIdea.IdeaNotePlainText;
        ideas[this.state.draggedIdea].Merged = true;
        this.setState({
            ideas,
            draggedIdea: null
        })
    }
    scheduleDescription = (descriptionState) => {
        this.setState({
            descriptionState
        });
    };
    handleNextNav = async (e) => {
        e.preventDefault();
        if(this.state.generateIdeas == true){
            this.setState({
                redirect : true
            })
        }
        let ideas = await this.fetchIdeas(this.props.epics.EPic[0].SubEpic[0].id);
        this.props.setFetchIdeas(ideas.data);
        this.setState({
            generateIdeas: true,
            selectedSubEpic: this.props.epics.EPic[0].SubEpic[0],
            ideas: this.props.ideas
        })
    }
    async handleSubEpicClick(subEpic) {
        let ideas = await this.fetchIdeas(subEpic.id);
        this.props.setFetchIdeas(ideas.data);
        this.setState({
            selectedSubEpic: subEpic,
            ideas: this.props.ideas
        })
    }
    async fetchIdeas(subEpicId) {
        let ideas = await axios.get(config.laravelBaseUrl+'getAllIdeas/'+subEpicId,{
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        return ideas;
    }
    handleIdeaAdd = (e) => {
        e.preventDefault();
        let ideas = this.state.ideas;
        ideas.push({
            "DtIdeateSessionIdeaId": 0,
            "IdeaNotePlainText": "",
            "IdeaTitle": "Idea "+(ideas.length + 1),
            "SequenceNumber": (ideas.length + 1)
        });
        this.setState({ideas});
    }
    handleIdeaChange = (e, key) => {
        e.preventDefault();
        let ideas = this.state.ideas;
        ideas[key].IdeaNotePlainText = e.target.value;
        this.setState({ideas});        
    }
    handleSubmitIdeas = async (e) => {
        e.preventDefault();
        let ideas = this.state.ideas;
        if(ideas.length) {
            let payload = {
                dtSubEpicId: this.state.selectedSubEpic.id,
                Ideas: ideas,
            }
            let saveIdeas = {};
            if(this.state.fullView) {
                saveIdeas = await axios.post(config.laravelBaseUrl+'mergeIdeas', payload, {
                    headers: {
                        "authorization": "Bearer " + sessionStorage.getItem("userToken")
                    }
                });
            }else{
                saveIdeas = await axios.post(config.laravelBaseUrl+'saveIdeas', payload, {
                    headers: {
                        "authorization": "Bearer " + sessionStorage.getItem("userToken")
                    }
                });
            }
            if(saveIdeas.data.success) {
                responseMessage("success", saveIdeas.data.data[0].message, "");
            }else{
                responseMessage("error", saveIdeas.data.data[0].message, "");
            }
        }
    }
    handleIdeaClick = (e, key) => {
        e.preventDefault();
        this.setState({
            selectedIdea: key
        });
    }
    handleIdeaDelete = (e) => {
        e.preventDefault();
        if(this.state.selectedIdea !== null) {
            let ideas = this.state.ideas;
            ideas.splice(this.state.selectedIdea, 1);
            this.setState({ideas: ideas, selectedIdea: null});
        }
    }
    handlePrevNav = (e) => {
        e.preventDefault();
        if(this.state.generateIdeas == false){
            this.setState({
                redirectBack : true
            })
        }
        this.setState({
            generateIdeas: false
        })
    }
    handleOnChange(e) {
        let ideateFormData = this.state.ideateFormData;
        ideateFormData[e.target.name] = e.target.value;
        this.setState({ideateFormData: ideateFormData});
    }
    handleParticipantChange(e) {
        this.setState({[e.target.name]: e.target.value});
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
    toDateChangeHandler = (date) => {
        this.setState({
            toDate: date
        })
    }
    toTimeChangeHandler = (time) => {
        this.setState({
            toTime: time
        })
    }
    keyPress(e){
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
    async handleSaveIdeate() {
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
        ideateFormData.ToDateTime = toDateTime;
        ideateFormData.SubEpicId = 144; // static for now
        ideateFormData.ProjectVersionId = 0;
        ideateFormData.EpicVersionId = 0;
        ideateFormData.TimeZoneName = "Indian Standard Time";
        ideateFormData.EpicVersionId = 0;
        ideateFormData.NotePlainText = ideateFormData.Note.replace( /(<([^>]+)>)/ig, '');
        ideateFormData.pageId =this.props.location.pathname
        const ideateData = await this.saveIdeate(ideateFormData);
        if(ideateData.data.success) {
            this.setState({
                isOpen: false
            });
            responseMessage("success", ideateData.data.data[0].message, "");
        }else{
            responseMessage("error", ideateData.data.data[0].message, "");
        }
    }
    async saveIdeate(ideateData) {
        let ideate = await axios.post(config.laravelBaseUrl+'saveIdeateSession', ideateData, {
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        return ideate;
    }
    render() {
        if(this.state.redirect){
            return <Redirect to={`/dt-swot-analysis/${this.props.projectId}/${this.props.epicId}`} />
        }
        if(this.state.redirectBack){
            return <Redirect to={`/dt-network-of-experience/${this.props.projectId}/${this.props.epicId}`} />
        }
        let ideasView = <IdeaDefault onDrop={this.onDrop} lookups={this.props.lookups} prioritizedSubEpics={this.state.prioritizedSubEpics} />
        if(this.state.generateIdeas) {
            ideasView = <GenerateIdeas toggleFullView={this.toggleFullView.bind(this)} fullView={this.state.fullView} toggleExpandView={this.toggleExpandView.bind(this)} expandView={this.state.expandView} ideas={this.state.ideas} addIdeaDrag={this.addIdeaDrag} onIdeaDrop={this.onIdeaDrop} handleIdeaAdd={this.handleIdeaAdd.bind(this)} handleIdeaChange={this.handleIdeaChange} handleSubmitIdeas={this.handleSubmitIdeas} handleIdeaClick={this.handleIdeaClick} handleIdeaDelete={this.handleIdeaDelete} />
        }
        let options = {
            options: ['inline', 'fontSize', 'fontFamily']
        }
        let participants = this.state.ideateFormData.Participants.map((participant, key) => {
            return(<li key={'participant-'+key}>
                <i className="fas fa-user-circle"></i> <span>{participant.email}</span>
            </li>)
        })
        let sceduleIdeate = (
            <>
                <div className="col-md-12 col-lg-8 pr-5">
                    <ul className="nav nav-tabs mb-3 border-0" role="tablist">
                        <li className="nav-item mr-3">
                        <a className="nav-link active" data-toggle="tab" href="#tab1" role="tab">Live working session</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#tab2" role="tab">Remote Idea Completion</a>
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
                                        onChange={this.fromDateChangeHandler}
                                        dateFormat="MMMM d, yyyy"
                                        selected={this.state.fromDate}
                                    />
                                    <DatePicker 
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                        }}
                                        selected={this.state.fromTime ? this.state.fromTime : new Date()}
                                        onChange={this.fromTimeChangeHandler}
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
                                        selected={this.state.toTime ? this.state.toTime : new Date()}
                                        onChange={this.toTimeChangeHandler}
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
                                        onChange={this.toDateChangeHandler}
                                        dateFormat="MMMM d, yyyy"
                                        selected={this.state.toDate}
                                    />
                                    <span>Time Zone</span>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="fas fa-map-marker-alt"></i></div>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Add Location" name="Location" onChange={this.handleOnChange.bind(this)} />
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
                                            <input type="text" className="form-control timefld mb-2 mr-sm-2" placeholder="10" name="NotifyBefore" onChange={this.handleOnChange.bind(this)} />
                                            <select className="custom-select form-control datefld mb-2" name="NotifyUnit">
                                                <option value="Minutes">Minutes</option>
                                                <option value="Hours">Hours</option>
                                            </select>
                                            <a href="#" className="px-2 py-1"><i className="fas fa-times text-dark"></i></a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <Editor
                                            editorState={this.state.descriptionState}
                                            wrapperClassName="schedule-session-editor-wrapper"
                                            editorClassName="schedule-session-editor"
                                            toolbar={options}
                                            onEditorStateChange={this.scheduleDescription.bind(this)}
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
                                        onChange={this.fromDateChangeHandler}
                                        dateFormat="MMMM d, yyyy"
                                        selected={this.state.fromDate}
                                    />
                                    <DatePicker 
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                        }}
                                        selected={this.state.fromTime ? this.state.fromTime : new Date()}
                                        onChange={this.fromTimeChangeHandler}
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
                                        selected={this.state.toTime ? this.state.toTime : new Date()}
                                        onChange={this.toTimeChangeHandler}
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
                                        onChange={this.toDateChangeHandler}
                                        dateFormat="MMMM d, yyyy"
                                        selected={this.state.toDate}
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
                                <input type="email" className="form-control mb-2 mr-sm-2" placeholder="Add Guests" name="participant" onChange={this.handleParticipantChange.bind(this)} onKeyDown={this.keyPress.bind(this)} value={this.state.participant} />
                                {this.state.participantErr !== "" ? <p className='text-danger'>{this.state.participantErr}</p> : null}
                            </div>
                            <div className="addguests d-flex justify-content-between">
                                <div>
                                    <p className="m-0">{this.state.ideateFormData.Participants.length} guests</p>
                                    <p><small>1 yes, 3 awaiting</small></p>
                                </div>
                                <div>
                                    <i className="far fa-envelope"></i>
                                </div>
                            </div>
                            {this.state.ideateFormData.Participants.length ? 
                                <ul className="guests-list">
                                    {participants}
                                </ul> : null
                            }
                        </div>
                    </div>
            </>
        );
        return(
            <div className="dt-content-wrapper">
                <div className="content-wraper">
                <div className="container-fluid">

                <div className="row epic-version align-items-center">
                    <div className="col-sm-12 col-md-12 col-lg-8 pt-3">
                    <h2 className="d-flex align-items-center"><span>Ideate - Problem Pinning & Prioritize SUB EPICS
                        </span> <Link to={`/dt-network-of-experience/${this.props.projectId}/${this.props.epicId}`} className="ml-3">Network of Experience</Link>
                    </h2>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4 pt-3 text-right">
                    <ul className="list-inline pager-list mb-0">
                        <li className="list-inline-item"><a href="#" onClick={(e) => this.handlePrevNav(e)}>Previous</a></li> |
                        <li className="list-inline-item"><a href="#" onClick={(e) => this.handleNextNav(e)}>Next</a></li>
                    </ul>
                    </div>
                </div>
                <div className="row generate-ideas-row">
                    <div className="col-sm-12 col-md-12 col-lg-6 pr-lg-0" style={{display: this.state.fullView || this.state.expandView ? 'none' : ''}}>
                    <div className="card idealeft ideascard mt-3">
                        <EpicList epics={this.props.epics} addDrag={this.addDrag} generateIdeas={this.state.generateIdeas} handleSubEpicClick={this.handleSubEpicClick.bind(this)} selectedSubEpic={this.state.selectedSubEpic} />
                    </div>
                    </div>
                    <div className={this.state.fullView || this.state.expandView ? "col-sm-12 col-md-12 col-lg-12 pl-lg-0" : "col-sm-12 col-md-12 col-lg-6 pl-lg-0"}>
                    <div className="card ideascard mt-3">
                        {ideasView}
                    </div>
                    </div>
                </div>
                {!this.state.fullView ? <EpicBreakDown epics={this.props.epics} /> : null}
                </div>
            </div>
            <ModalPopup isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} title="Schedule Ideate Session" onSave={this.handleSaveIdeate.bind(this)} className="schedulemodal modal-lg" footer={true} saveBtnTitle="Send">
                <div className="row">
                    {sceduleIdeate}
                </div>
            </ModalPopup>
            </div>
        )
    }
}  

DTProblemPinningBodyDetail.propTypes = {
    epics: PropTypes.object.isRequired,
    fetchEpics: PropTypes.func.isRequired,
    ideas: PropTypes.array,
    setFetchIdeas: PropTypes.func.isRequired,
    lookups: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    epics: state.ideate.epics,
    ideas: state.ideate.ideas,
    lookups: state.ideate.lookups
});
export default connect(mapStateToProps, { fetchEpics, setFetchIdeas, setFetchLookups })(withRouter(DTProblemPinningBodyDetail));