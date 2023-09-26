import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler';
import moment from 'moment';
import _ from 'underscore';
import axios from 'axios';
import { setFetchOwners, setFetchTasks } from '../../actions/roadmapActions';
import withDragDropContext from './withDnDContext';
import 'react-big-scheduler/lib/css/style.css';
import ModalPopup from '../common/ModalPopup';
import { responseMessage } from '../../utils/alert';
const config = require('../../config');
class GanttScheduler extends Component {
    constructor(props) {
        super(props);
        // this.resources = [
        //     {
        //         id: 'r0',
        //         name: 'Milestone 1',
        //         groupOnly: true,
        //     },
        //     {
        //         id: 'r1o1',
        //         name: 'Owner 1',
        //         parentId: 'r0',
        //     },
        //     {
        //         id: 'r1o2',
        //         name: 'Owner 2',
        //         parentId: 'r0',
        //     },
        //     {
        //         id: 'r1o3',
        //         name: 'Owner 3',
        //         parentId: 'r0',
        //     },
        //     {
        //         id: 'r1',
        //         name: 'Owner 4',
        //         parentId: 'r0',
        //     },
        //     {
        //         id: 'r2',
        //         name: 'Milestone 2',
        //         groupOnly: true,
        //     },
        //     {
        //         id: 'r2o1',
        //         name: 'Owner 1',
        //         parentId: 'r2',
        //     },
        //     {
        //         id: 'r2o2',
        //         name: 'Owner 2',
        //         parentId: 'r2',
        //     },
        //     {
        //         id: 'r2o3',
        //         name: 'Owner 3',
        //         parentId: 'r2',
        //     },
        //     {
        //         id: 'r3',
        //         name: 'Milestone 3',
        //         groupOnly: true,
        //     },
        //     {
        //         id: 'r3o1',
        //         name: 'Owner 1',
        //         parentId: 'r3'
        //     },
        //     {
        //         id: 'r3o2',
        //         name: 'Owner 2',
        //         parentId: 'r3'
        //     },
        //     {
        //         id: 'r3o3',
        //         name: 'Owner 3',
        //         parentId: 'r3'
        //     }
        // ];
        // this.events = [
        //       {
        //           id: 1,
        //           start: '2020-08-03 09:30:00',
        //           end: '2020-08-04 23:30:00',
        //           resourceId: '2000',
        //           title: 'I am finished',
        //           bgColor: '#D9D9D9',
        //           showPopover: false
        //       },
        //       {
        //           id: 2,
        //           start: '2020-08-03 12:30:00',
        //           end: '2020-08-15 23:30:00',
        //           resourceId: 'r2o1',
        //           title: 'I am not resizable',
        //           resizable: false
        //       },
        //       {
        //           id: 3,
        //           start: '2020-08-04 12:30:00',
        //           end: '2020-08-05 23:30:00',
        //           resourceId: 'r3o1',
        //           title: 'I am not movable',
        //           movable: false
        //       },
        //       {
        //           id: 4,
        //           start: '2020-08-04 14:30:00',
        //           end: '2020-08-05 23:30:00',
        //           resourceId: 'r3o2',
        //           title: 'I am not start-resizable',
        //           startResizable: false,
        //       },
        //       {
        //           id: 5,
        //           start: '2020-08-04 15:30:00',
        //           end: '2020-08-05 23:30:00',
        //           resourceId: 'r3o2',
        //           title: 'I am not end-resizable',
        //           endResizable: false
        //       },
        //       {
        //           id: 6,
        //           start: '2020-08-04 15:35:00',
        //           end: '2020-08-05 23:30:00',
        //           resourceId: 'r1o2',
        //           title: 'I am normal'
        //       },
        //       {
        //           id: 7,
        //           start: '2020-08-04 15:40:00',
        //           end: '2020-08-05 23:30:00',
        //           resourceId: 'r1o3',
        //           title: 'I am exceptional',
        //           bgColor: '#fcdc64'
        //       },
        //       {
        //           id: 8,
        //           start: '2020-08-04 15:50:00',
        //           end: '2020-08-04 23:30:00',
        //           resourceId: 'r1o2',
        //           title: 'I am locked',
        //           movable: false,
        //           resizable: false,
        //           bgColor: '#e45f48'
        //       },
        //       {
        //           id: 9,
        //           start: '2020-08-04 16:30:00',
        //           end: '2020-08-20 23:30:00',
        //           resourceId: 'r1o2',
        //           title: 'R1 has many tasks 1',
        //           bgColor: '#a8e4f6'
        //       },
        //       {
        //           id: 10,
        //           start: '2020-08-04 17:30:00',
        //           end: '2020-08-04 23:30:00',
        //           resourceId: 'r1o3',
        //           title: 'R1 has recurring tasks every week on Tuesday, Friday',
        //           rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
        //           bgColor: '#7fcd90'
        //       },
        //       {
        //           id: 11,
        //           start: '2020-08-04 18:30:00',
        //           end: '2020-08-05 23:30:00',
        //           resourceId: 'r2o2',
        //           title: 'R2 has many tasks 3',
        //           bgColor: '#a8e4f6'
        //       },
        //       {
        //           id: 12,
        //           start: '2020-08-05 18:30:00',
        //           end: '2020-08-05 23:30:00',
        //           resourceId: 'r2o2',
        //           title: 'R2 has many tasks 4',
        //           bgColor: '#a8e4f6'
        //       },
        //       {
        //           id: 13,
        //           start: '2020-08-06 18:30:00',
        //           end: '2020-08-07 23:30:00',
        //           resourceId: 'r2o2',
        //           title: 'R2 has many tasks 5',
        //           bgColor: '#ccd1cd'
        //       },
        //       {
        //           id: 14,
        //           start: '2020-08-08 18:30:00',
        //           end: '2020-08-18 23:30:00',
        //           resourceId: 'r2o2',
        //           title: 'R2 has many tasks 6',
        //           bgColor: '#ccd1cd'
        //       },
        //     ];
        this.state = {
            viewModel: {},
            isOpen: false,
            eventIndex: null,
            taskName: null,
            schedulerData: null
        }
    }



//    static getDerivedStateFromProps(nextProps,prevState) {
//        console.log("NEXTPROPS",nextProps)
//        console.log("NEXTState",prevState)
//         state.
//    }





    async componentDidMount() {
        let owners = await axios.get(config.laravelBaseUrl+'getRoadMapOwner/1/0/0',{
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        this.props.setFetchOwners(owners.data);
        let tasks = await this.fetchTasks();
        this.props.setFetchTasks(tasks.data);
    
    
    
        let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week);
        schedulerData.localeMoment.locale('en');
        schedulerData.setResources(this.props.owners);
        schedulerData.setEvents(this.props.tasks);
        schedulerData.config.schedulerWidth = '85%';
        this.dupSchedulerData = schedulerData;
        this.setState({
            viewModel: schedulerData
        })
    }
    async fetchTasks() {
        let tasks = await axios.get(config.laravelBaseUrl+'getRoadMapTasks/1/0/0/0',{
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        return tasks;
    }
    prevClick = (schedulerData)=> {
        schedulerData.prev();
        schedulerData.setEvents(this.props.tasks);
        this.setState({
            viewModel: schedulerData
        })
    }

    nextClick = (schedulerData)=> {
        schedulerData.next();
        schedulerData.setEvents(this.props.tasks);
        this.setState({
            viewModel: schedulerData
        })
    }

    onViewChange = (schedulerData, view) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(this.props.tasks);
        this.setState({
            viewModel: schedulerData
        })
    }

    onSelectDate = (schedulerData, date) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(this.props.tasks);
        this.setState({
            viewModel: schedulerData
        })
    }

    eventClicked = async(schedulerData, event) => {
    

       let eIndex = _.findIndex(schedulerData.events, {id: event.id});
       
       console.log(("indexValue=>>", eIndex))
       
        //alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}`);
        this.setState({
            eventIndex: eIndex,
            taskName: event.title,
            schedulerData: schedulerData
        },() => {
            this.toggle();
        });

      
      
    };

    ops1 = (schedulerData, event) => {
        alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    ops2 = (schedulerData, event) => {
        alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
    };

    newEvent = (schedulerData, slotId, slotName, start, end) => {
        if(window.confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}}`)){

           console.log("New event",this.state.viewModel)

            let newEvent = {
                id: `new${uuidv4()}`,
                title: 'New event you just created',
                start: start,
                end: end,
                resourceId: slotId,
                bgColor: '#CCD1CD',
                status: 'Not Started'
            }
            schedulerData.addEvent(newEvent);
            this.setState({
                viewModel: schedulerData
            }, () => {
                this.props.setViewModel(this.state.viewModel)
            })
        }
    }

    updateEventStart = (schedulerData, event, newStart) => {
        if(window.confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
            schedulerData.updateEventStart(event, newStart);
        }
        this.setState({
            viewModel: schedulerData
        }, () => {
            this.props.setViewModel(this.state.viewModel)
        })
    }

    updateEventEnd = (schedulerData, event, newEnd) => {
        if(window.confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
            schedulerData.updateEventEnd(event, newEnd);
        }
        this.setState({
            viewModel: schedulerData
        }, () => {
            this.props.setViewModel(this.state.viewModel)
        })
    }

    moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
        if(window.confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {
            schedulerData.moveEvent(event, slotId, slotName, start, end);
            this.setState({
                viewModel: schedulerData
            }, () => {
                this.props.setViewModel(this.state.viewModel)
            })
        }
    }

    onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
        if(schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.next();
            schedulerData.setEvents(this.props.tasks);
            this.setState({
                viewModel: schedulerData
            });
    
            schedulerContent.scrollLeft = maxScrollLeft - 10;
        }
    }

    onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
        if(schedulerData.ViewTypes === ViewTypes.Day) {
            schedulerData.prev();
            schedulerData.setEvents(this.props.tasks);
            this.setState({
                viewModel: schedulerData
            });

            schedulerContent.scrollLeft = 10;
        }
    }

    onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollTop');
    }

    onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
        console.log('onScrollBottom');
    }

    toggleExpandFunc = (schedulerData, slotId) => {
        schedulerData.toggleExpandStatus(slotId);
        this.setState({
            viewModel: schedulerData
        });
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    async handleTaskStatus(e, schedulerData, eventItem, status, color) {
        e.preventDefault();
        let payload = {
            TaskId: eventItem.id,
            Status: status
        }
        let updateTask = await axios.post(config.laravelBaseUrl+'updateStatus', payload, {
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        if(updateTask.data.success) {
            responseMessage("success", updateTask.data.data[0].message, "");
        }else{
            responseMessage("error", updateTask.data.data[0].message, "");
        }
        let tasks = schedulerData.events;
        const eIndex = _.findIndex(tasks, {id: eventItem.id});
        tasks[eIndex].status = status;
        tasks[eIndex].bgColor = color;
        schedulerData.setEvents(tasks);
        this.setState({
            viewModel: schedulerData
        }, () => {
            this.props.setViewModel(this.state.viewModel);
        });
    }
    async handleRemoveTask(e, schedulerData, eventItem) {
        e.preventDefault();
        if(window.confirm('Are you sure you want to delete this task?')) {
            let delTask = await axios.delete(config.laravelBaseUrl+'deleteRoadMapTask/'+eventItem.id, {
                headers: {
                    "authorization": "Bearer " + sessionStorage.getItem("userToken")
                }
            });
            if(delTask.data.success) {
                responseMessage("success", delTask.data.data[0].message, "");
            }else{
                responseMessage("error", delTask.data.data[0].message, "");
            }
            let tasks = schedulerData.events;
            const eIndex = _.findIndex(tasks, {id: eventItem.id});
            tasks.splice(eIndex, 1);
            schedulerData.setEvents(tasks);
            this.setState({
                viewModel: schedulerData
            }, () => {
                this.props.setViewModel(this.state.viewModel);
            });
        }
    }
    handleTaskNameChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleTaskNameSubmit() {
        let tasks = this.state.schedulerData.events;
        tasks[this.state.eventIndex].title = this.state.taskName;
        this.state.schedulerData.setEvents(tasks);
        this.setState({
            viewModel: this.dupSchedulerData,
            isOpen: false,
            eventIndex: null,
            schedulerData: null
        }, () => {
            this.props.setViewModel(this.state.viewModel)
        })
    }
    eventItemPopoverTemplateResolver = (schedulerData, eventItem, title, start, end, statusColor) => {
        return (
            <div className="dropmenusec" style={{width: '170px'}}>
                <div className="text-left mb-2 dropDownStyle">
                    <div className="overflow-text ml-2">
                        <a href="#" className="header2-text dropdown-item p-0"  data-toggle="dropdown">Pick Status <i
                                      class="fas fa-chevron-right float-right mt-1 mr-2"></i></a>
                        <div class="dropdown-menu inner-dropdown">
                        <div className="dropmenusec" style={{width: '170px'}}>
               
                <div className="d-flex align-items-center mb-2 dropDownStyle">
                    <div>
                        <div className="status-dot" style={{backgroundColor: '#7fcd90'}} />
                    </div>
                    <div className="overflow-text ml-2">
                        <a href="#" className="header2-text" onClick={(e) => this.handleTaskStatus(e, schedulerData, eventItem, 'Completed', '#7fcd90')}>Completed</a>
                        
                    </div>
                </div>
                <div className="d-flex align-items-center mb-2 dropDownStyle">
                    <div>
                        <div className="status-dot" style={{backgroundColor: '#fcdc64'}} />
                    </div>
                    <div className="overflow-text ml-2">
                        <a href="#" className="header2-text" onClick={(e) => this.handleTaskStatus(e, schedulerData, eventItem, 'In Progress', '#fcdc64')}>In Progress</a>
                    </div>
                </div>
                <div className="d-flex align-items-center mb-2 dropDownStyle">
                    <div>
                        <div className="status-dot" style={{backgroundColor: '#ccd1cd'}} />
                    </div>
                    <div className="overflow-text ml-2">
                        <a href="#" className="header2-text" onClick={(e) => this.handleTaskStatus(e, schedulerData, eventItem, 'Not Started', '#ccd1cd')}>Not Started</a>
                    </div>
                </div>
                <div className="d-flex align-items-center mb-2 dropDownStyle">
                    <div>
                        <div className="status-dot" style={{backgroundColor: '#a8e4fc'}} />
                    </div>
                    <div className="overflow-text ml-2">
                        <a href="#" className="header2-text" onClick={(e) => this.handleTaskStatus(e, schedulerData, eventItem, 'Scheduled', '#a8e4fc')}>Scheduled</a>
                    </div>
                </div>
                <div className="d-flex align-items-center mb-2 dropDownStyle pb-0">
                    <div>
                        <div className="status-dot" style={{backgroundColor: '#e45f48'}} />
                    </div>
                    <div className="overflow-text ml-2">
                        <a href="#" className="header2-text" onClick={(e) => this.handleTaskStatus(e, schedulerData, eventItem, 'Not Complete', '#e45f48')}>Not Complete</a>
                    </div>
                </div>
              
            </div>
           
                        </div>
                    </div>

                </div>
                <div className="text-left mb-2 dropDownStyle">
                    <div className="overflow-text ml-2">
                        <a href="#" className="header2-text" onClick={(e) => this.handleRemoveTask(e, schedulerData, eventItem)}>Remove Task</a>
                    </div>
                </div>
            </div>    
           
        );
    }
    render() {


        console.log("State=>>", this.state)
        console.log("Props =>>>", this.props)


        const taskName = (<div className="col-md-12 col-lg-8 pr-5">
            <form>
                <div className="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="taskName" className="form-control" value={this.state.taskName} onChange={(e) => this.handleTaskNameChange(e)} />
                </div>
            </form>
        </div>)
        const {viewModel} = this.state;
        if(Object.keys(viewModel).length) {
            return(<>
            <Scheduler schedulerData={viewModel}
                prevClick={this.prevClick}
                nextClick={this.nextClick}
                onSelectDate={this.onSelectDate}
                onViewChange={this.onViewChange}
                eventItemClick={this.eventClicked}
                viewEventClick={this.ops1}
                viewEventText="Ops 1"
                viewEvent2Text="Ops 2"
                viewEvent2Click={this.ops2}
                updateEventStart={this.updateEventStart}
                updateEventEnd={this.updateEventEnd}
                moveEvent={this.moveEvent}
                newEvent={this.newEvent}
                onScrollLeft={this.onScrollLeft}
                onScrollRight={this.onScrollRight}
                onScrollTop={this.onScrollTop}
                onScrollBottom={this.onScrollBottom}
                toggleExpandFunc={this.toggleExpandFunc}
                eventItemPopoverTemplateResolver={this.eventItemPopoverTemplateResolver}
            />
            <ModalPopup isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} title="Task Details" onSave={this.handleTaskNameSubmit.bind(this)} className="taskmodal" footer={true} saveBtnTitle="Save">
                <div className="row">
                    {taskName}
                </div>
            </ModalPopup>
            </>);
        }else{
            return(<></>);
        }
    }
}
GanttScheduler.propTypes = {
    setFetchOwners: PropTypes.func.isRequired,
    owners: PropTypes.array.isRequired,
    setFetchTasks: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
owners: state.roadmap.owners,
tasks: state.roadmap.tasks,
errors: state.errors
});
export default connect(mapStateToProps,{setFetchOwners, setFetchTasks})(withDragDropContext(GanttScheduler));