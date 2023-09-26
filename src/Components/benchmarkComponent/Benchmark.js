import React from "react";
import { connect } from 'react-redux';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from "../includes/dashboardFooter/FooterComponent";
import AsideComponent from "../includes/asideComponent/AsideComponent";
import SidebarJs from "../../common/js/sidebarAnimation";
import { BenchmarkWrapper } from "./benchmarkStyling";
import ApiServer from "./../../common/js/ApiServices.js";
import moment from "moment";
import DatePicker from "react-datepicker";
import SimpleReactValidator from "simple-react-validator";
import { Link } from 'react-router-dom';
import {Row, Col, Input, Tooltip} from 'reactstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {responseMessage} from '../../utils/alert';
import { startLoader, stopLoader } from '../../actions/loaderActions';
import { deleteProjectRelations } from '../../actions/benchmarkingActions';

import "react-datepicker/dist/react-datepicker.css"; 

class Benchmark extends React.Component {
  constructor(props) {
    super(props);
    this.sidebarAnimation = new SidebarJs();
    this.apiServer = new ApiServer(true);
    this.userList = []; // user list which cannot be mutated
    this.state = {
      userList: [],
      selectedUserList: [],
      disableDate: "",
      assesmentName: "",
      projectList: [],
      projectId: "",
      search: "",
      relations : [],
      relationsData : [],
      selectedRelationType : "",
      selectedProjectForRelation : "",
      tooltipOpen: false,
      //pageNumber: 1,
      //pageSize: 10,
      //totalResultCount: 0,
      validationError: {
        assesmentName: false
      },
      leftCheckAll: false,
      rightCheckAll: false
    };
    this.validator = new SimpleReactValidator({
      element: message => {
        return <p className="text-danger">{message}</p>;
      },
      autoForceUpdate: this
    });
  }
  componentDidMount() {
    this.sidebarAnimation.toggle();
    this.fetchUserList();
    this.fetchProjectList();
    this.fetchRelationsData();
  }

  showValidationMessage(event) {
    if (this.validator.fieldValid(event.target.name)) {
      this.validator.hideMessageFor(event.target.name);
      this.setState({
        validationError: {
          ...this.state.validationError,
          [event.target.name]: false
        }
      });
    } else {
      this.validator.showMessageFor(event.target.name);
      this.setState({
        validationError: {
          ...this.state.validationError,
          [event.target.name]: true
        }
      });
    }
  }
  handleDateChange = date => {
    this.setState({
      disableDate: date
    });
  };
  leftCheckAll(event) {
    let newUserList = [];

    if (event.target.checked) {
      this.setState({ leftCheckAll: true });
      this.state.userList.forEach(user => {
        user.checked = true;
        newUserList.push(user);
      });
    } else {
      this.state.userList.forEach(user => {
        this.setState({ leftCheckAll: false });
        user.checked = false;
        newUserList.push(user);
      });
    }
    this.setState({ userList: [...newUserList] });
  }

  rightCheckAll(event) {
    let newUserList = [];

    if (event.target.checked) {
      this.setState({ rightCheckAll: true });
      this.state.selectedUserList.forEach(user => {
        user.checked = true;
        newUserList.push(user);
      });
    } else {
      this.setState({ rightCheckAll: false });
      this.state.selectedUserList.forEach(user => {
        user.checked = false;
        newUserList.push(user);
      });
    }
    this.setState({ selectedUserList: [...newUserList] });
  }

  checkUser(userId, event) {
    let newUserList = [];

    if (event.target.checked) {
      this.state.userList.forEach(user => {
        if (user.UserID == userId) {
          user.checked = true;
        }
        newUserList.push(user);
      });
    } else {
      this.state.userList.forEach(user => {
        if (user.UserID == userId) {
          user.checked = false;
        }
        newUserList.push(user);
      });
    }
    this.setState({ userList: [...newUserList], leftCheckAll: false });
  }
  rightCheckUser(userId, event) {
    let newUserList = [];

    if (event.target.checked) {
      this.state.selectedUserList.forEach(user => {
        if (user.UserID == userId) {
          user.checked = true;
        }
        newUserList.push(user);
      });
    } else {
      this.state.selectedUserList.forEach(user => {
        if (user.UserID == userId) {
          user.checked = false;
        }
        newUserList.push(user);
      });
    }
    this.setState({ selectedUserList: [...newUserList], rightCheckAll: false });
  }
  selectUser() {
    let userList = [];
    let selectedUserList = [];
    this.state.userList.forEach(elem => {
      if (elem.checked) {
        elem.checked = false;
        selectedUserList.push(elem);
      } else {
        userList.push(elem);
      }
    });
    this.setState({ userList: [...userList], leftCheckAll: false });
    this.setState({
      selectedUserList: [...this.state.selectedUserList, ...selectedUserList]
    });
  }

  disSelectUser() {
    let userList = [];
    let selectedUserList = [];
    this.state.selectedUserList.forEach(elem => {
      if (elem.checked) {
        elem.checked = false;
        userList.push(elem);
      } else {
        selectedUserList.push(elem);
      }
    });
    this.setState({ userList: [...this.state.userList, ...userList] });
    this.setState({
      selectedUserList: [...selectedUserList],
      rightCheckAll: false
    });
  }
  saveAssesment(event) {
    event.preventDefault();
    if (this.validator.allValid()) {
      if (this.state.selectedUserList.length == 0) {
        responseMessage("warning", "Please select one or more user", "");
        return;
      }
      let requestData = {
        url: "",
        method: "",
        data: {}
      };
      let selectedUserId = [];

      this.state.selectedUserList.forEach(user => {
        selectedUserId.push(user.UserID);
      });
      if (this.state.projectId) {
        requestData.url = "/update-client-project";
        requestData.method = "PUT";
        requestData.data = {
          assesmentSetName: this.state.assesmentName,
          userId: selectedUserId,
          assesmentId: this.state.projectId,
          Relation : this.state.relations
        };
        if (this.state.disableDate) {
          requestData.data.disableDate = moment(this.state.disableDate).format(
            "YYYY-MM-DD"
          );
        }
      } else {
        requestData.url = "/add-client-project";
        requestData.method = "POST";
        requestData.data = {
          assesmentSetName: this.state.assesmentName,
          userId: selectedUserId
        };
      }
      this.props.startLoader();
      return this.apiServer
        .SendRequest(requestData)
        .then(result => {
          if (result.status === "Success") {
            if (this.state.projectId) {
              responseMessage("success", result.message, "");
            } else {
              responseMessage("success", result.message, "");
            }
            this.setState({
              assesmentName: "",
              selectedUserList: [],
              projectId: "",
              relations : [],
              selectedRelationType : "",
              selectedProjectForRelation : ""
            });
            this.fetchUserList();
            this.fetchProjectList();
          } else {
            responseMessage("error", result.message, "");
          }
          this.props.stopLoader();
        })
        .catch(error => {
          responseMessage("error", "Sorry something went wrong. Please try again", "");
          this.props.stopLoader();
        });
    } else {
      this.validator.showMessages();
      if (
        this.state.validationError.assesmentName == false &&
        this.state.assesmentName == ""
      ) {
        this.setState({
          validationError: {
            ...this.state.validationError,
            assesmentName: true
          }
        });
      }
    }
  }
  startDragging(userId, event) {
    console.log("user dragged",event);
    event.dataTransfer.setData("userId", userId);
  }
  dropElement(selectingUser, event) {
    let userId = event.dataTransfer.getData("userId");
    //console.log("dragged user",JSON.stringify(draggedUser));
    if (selectingUser) {
      let selectedUser;
      let newUserList = this.state.userList.filter(user => {
        if (userId == user.UserID) {
          user.checked = false;
          selectedUser = user;
          return false;
        } else {
          return true;
        }
      });
      if (selectedUser) {
        this.setState(
          { selectedUserList: [...this.state.selectedUserList, selectedUser] },
          () => {
            this.setState({ rightCheckAll: false });
          }
        );
        this.setState({ userList: [...newUserList] }, () => {
          if (this.state.userList.length == 0) {
            this.setState({ leftCheckAll: false });
          }
        });
      }
    } else {
      let disSelectedUser;
      let newUserList = this.state.selectedUserList.filter(user => {
        if (userId == user.UserID) {
          user.checked = false;
          disSelectedUser = user;
          return false;
        } else {
          return true;
        }
      });
      if (disSelectedUser) {
        this.setState(
          { userList: [...this.state.userList, disSelectedUser] },
          () => {
            this.setState({ leftCheckAll: false });
          }
        );
        this.setState({ selectedUserList: [...newUserList] }, () => {
          if (this.state.selectedUserList.length == 0) {
            this.setState({ rightCheckAll: false });
          }
        });
      }
    }
  }
  editProject(projectId, disableDate) {
    return this.apiServer
      .SendRequest({
        method: "GET",
        url: "/project-details/" + projectId,
        data: ""
      })
      .then(result => {
        if (result.status === "Success") {
          let projectData = result.data.Projects;
          let projectRelations = result.data.Relation;
          this.setState({
            relations : projectRelations
          });
          let userList = [];
          let selectedUserList = [];
          this.userList.forEach((user, userIndex) => {
            let matchFlag = false;
            projectData.forEach((project, index) => {
              if (userIndex === 0) {
                selectedUserList.push({
                  UserID: project.UserID,
                  FirstName: project.FirstName,
                  MiddleName: project.MiddleName,
                  LastName: project.LastName,
                  checked: false
                });
                if (index === 0) {
                  this.setState({ assesmentName: project.BMProjectName });
                  this.setState({ projectId: project.BMProjectID });
                  this.setState({
                    disableDate: disableDate ? new Date(disableDate) : null
                  });
                  this.setState({
                    validationError: {
                      ...this.state.assesmentName,
                      assesmentName: false
                    }
                  });
                }
              }
              if (user.UserID === project.UserID) {
                matchFlag = true;
              }
            });
            if (!matchFlag) {
              userList.push({ ...user, checked: false });
            }
          });
          this.setState({
            userList: [...userList],
            selectedUserList: [...selectedUserList]
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchUserList() {
    return this.apiServer
      .SendRequest({
        method: "GET",
        url: "/client-users",
        data: ""
      })
      .then(result => {
        if (result.status === "Success") {
          this.userList = [...result.data];
          this.userList.forEach(elem => {
            elem.checked = false;
          });
          this.setState({
            userList: [...this.userList]
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchRelationsData() {
    return this.apiServer
      .SendRequest({
        method: "GET",
        url:
          "/getRelationShipData/bm",
        data: ""
      })
      .then(result => {
        this.setState({
          relationsData : result.data
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchProjectList(pageSize = 10, pageNumber = 1) {
    return this.apiServer
      .SendRequest({
        method: "GET",
        url:
          "/client-projects",
        data: ""
      })
      .then(result => {
        if (result.status === "Success") {
          this.setState({
            projectList: [...result.data]
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  /*updateProject() {}
  handlePageChange(event) {
    //console.log(event);
    //this.setState({pageNumber:event});
    this.fetchProjectList(this.state.pageSize, event);
  }
  changePageSize(event) {
    this.fetchProjectList(event.target.value, 1);
  }*/
  addRelationHandler = () => {
    if(this.state.selectedRelationType != "" && this.state.selectedProjectForRelation != ""){
      let relations = [...this.state.relations];
      relations.push({
        RelatedProjectId : this.state.selectedProjectForRelation,
        RelationTypeId : this.state.selectedRelationType,
        RelationshipId : 0
      })
      this.setState({
        relations,
        selectedRelationType : "",
        selectedProjectForRelation : "",
      })
    }else{
      responseMessage('warning', 'Relation Type and Related Project are required.');
    }
  }

  deleteRelationHandler = (ind, id) => {
    if(window.confirm('Do you want to delete this relation ?')){
      let relations = [...this.state.relations];
      relations.splice(ind,1);
      if(id != 0){
        this.props.deleteProjectRelations(id);
      }
      this.setState({
        relations
      })
    }
  }

  toggleTooltip(userId) {
    if(this.state['tooltipOpen'+userId] === undefined) {
      this.setState({
        ['tooltipOpen'+userId]: true
      })
    }else{
      this.setState({
        ['tooltipOpen'+userId]: !this.state['tooltipOpen'+userId]
      })
    }
  }

  render() {
    let relatedProjectsList = this.state.projectList.filter(proj=>!this.state.relations.map(rel=>rel.RelatedProjectId).includes(proj.BMProjectID));
    const tableConfig = {
      defaultPageSize: 10,
      resizable: false,
      className: 'table-striped'
    }
    let projectsList = [];
    if(this.state.projectList.length > 0) {
      projectsList = this.state.projectList;
    }
    if (this.state.search) {
      projectsList = projectsList.filter(row => {
        let projectName = row.BMProjectName ? row.BMProjectName.toLowerCase() : '';
        let noOfUsers = row.NoOfUsers ? row.NoOfUsers.toLowerCase() : '';
        let projectStatus = row.StatusName ? row.StatusName.toLowerCase() : '';
        let disableDate = row.DisableDate ? row.DisableDate.toLowerCase() : '';
        return projectName.includes(this.state.search.toLowerCase()) || noOfUsers.includes(this.state.search) || projectStatus.includes(this.state.search) || disableDate.includes(this.state.search.toLowerCase())
      })
    }
    let columns = [{
        Header: 'AmpMarking Project',
        accessor: 'BMProjectName'
      }, {
        Header: 'No. of Users',
        accessor: 'NoOfUsers'
      }, {
        Header: 'Status',
        accessor: 'StatusName',
        Cell: props => <span className="badge badge-success">{props.original.StatusName}</span>
      }, {
        Header: 'Disable Date',
        accessor: 'DisableDate',
        Cell: props => <span>{props.original.DisableDate ? moment(props.original.DisableDate).format("DD/MM/YYYY") : "N/A"}</span>
    }, {
        Header: 'Action',
        sortable: false,
        Cell: props => <a className="btn btn-info" href="#" onClick={this.editProject.bind(this, props.original.BMProjectID, props.original.DisableDate)}><i className="fa fa-edit"></i></a>
    }];
    return [
      <DashboardHeader></DashboardHeader>,
      <div id="wrapper">
        <DashboardSidebar></DashboardSidebar>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <ol className="breadcrumb dashbread">
              <li className="breadcrumb-item active"><Link to="/dashboard">Dashboard</Link></li>
              <li className="breadcrumb-item">Manage</li>
              <li className="breadcrumb-item">AmpMarking</li>
              <li className="breadcrumb-item">Create Manage Set</li>
              <li className="breadcrumb-menu d-md-down-none ml-auto">
              {<img src={ require('./../../common/images/diva-icon.png') } className="logo-img" alt="Logo" /> }
                  <a className="btn powered p-0" href="#">
                    <i className="icon-graph"></i> &nbsp;
                    <i>Powered by Amploglobal</i>
                  </a>
              </li>
            </ol>

            <BenchmarkWrapper className="container-fluid container-dashboard">
              <div className="user-content">
                <h1 className="heading mt-3">Create AmpMarking Project</h1>

                <div className="card set-section">
                  <div className="card-header">Create AmpMarking Project</div>
                  <div className="card-body">
                    <p className="card-text">
                      Add AmpMarking Projects to your enterprise account to allow different
                      teams and business units to assess and compare their
                      results with other parts of your enterprise.
                    </p>
                    <div className="user-form-section">
                      <div className="row">
                        <div className="form-group col-sm-4">
                          <label>Project Name *</label>
                          <input
                            type="text"
                            name=""
                            placeholder=""
                            name="assesmentName"
                            value={this.state.assesmentName}
                            onBlur={this.showValidationMessage.bind(this)}
                            onKeyUp={this.showValidationMessage.bind(this)}
                            style={
                              this.state.validationError.assesmentName
                                ? { borderColor: "red" }
                                : {}
                            }
                            onChange={event =>
                              this.setState({
                                assesmentName: event.target.value
                              })
                            }
                            className="form-control create-assessment-form"
                          />

                          {this.validator.message(
                            "assesmentName",
                            this.state.assesmentName,
                            "required",
                            {
                              messages: {
                                required: "Project name is required"
                              }
                            }
                          )}
                        </div>
                        {this.state.projectId ? (
                          <div className="col-sm-4">
                            <label>Select Project Disable Date</label>

                            {/* <!------ Date picker html start------------> */}

                            <div className="input-group search-box">
                              <div className="input-group-prepend">
                                <button
                                  className="btn btn-outline-secondary"
                                  type="button"
                                >
                                  <i className="fa fa-calendar-alt"></i>
                                </button>
                              </div>
                              <DatePicker
                                onKeyDown={event => {
                                  event.preventDefault();
                                  return false;
                                }}
                                className="form-control border-secondary py-2 dis-date"
                                id="disable-date"
                                minDate={new Date()}
                                onChange={this.handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                selected={this.state.disableDate}
                              />
                            </div>
                            {/* <!-------- Date picker HTML end-------------------> */}
                          </div>
                        ) : null}
                      </div>
                      <div className="drag-drop-sec" >
                        <h2>Add Users</h2>
                        <p>
                          Drag and drop users from Enterprise users to add users
                          to AmpMarking Projects
                        </p>
                        <div className="row mt-4">
                          <div className="col-sm-12 col-md-4 col-lg-4">
                            <h3 className="mb-3">
                              {" "}
                              Enterprise Users(
                              {this.state.userList.length
                                ? this.state.userList.length
                                : 0}
                              )
                            </h3>
                            <div className="select-all">
                              <input
                                type="checkbox"
                                onClick={this.leftCheckAll.bind(this)}
                                checked={this.state.leftCheckAll}
                                name=""
                              />{" "}
                              Select All
                            </div>
                            <div
                              className="box-1 pd-0-box"
                              onDragOver={ev => {
                                ev.preventDefault();
                              }}
                              onDrop={this.dropElement.bind(
                                this,
                                false /*selecting user*/
                              )}
                            >
                              <ul className="list-group">
                                {this.state.userList.map(user => (
                                  <li
                                    className="list-group-item"
                                    key={user.UserID}
                                    draggable
                                    onDragStart={this.startDragging.bind(
                                      this,
                                      user.UserID
                                    )}
                                    id={"Tooltip"+user.UserID}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={user.checked}
                                      className="left-check-box"
                                      id={'user-select-'+user.UserID}
                                      onChange={this.checkUser.bind(
                                        this,
                                        user.UserID
                                      )}
                                      value={user.UserID}
                                    />
                                    <label className="dragLabel" htmlFor={'user-select-'+user.UserID}>{user.FirstName + " " + user.LastName}</label>
                                    <Tooltip placement="left" isOpen={this.state['tooltipOpen'+user.UserID]} target={"Tooltip"+user.UserID} toggle={() => this.toggleTooltip(user.UserID)}>
                                      <Row>
                                        <Col md="3">
                                          <img src={user.ProfilePhotoPath} alt="image" className="img-responsive" height="100" />
                                        </Col>
                                        <Col md="9">
                                          <small>{user.FirstName + " " + user.LastName}</small><br/>
                                          <small>{user.EmailAddress}</small><br/>
                                          <small>{user.PhoneNumber}</small>
                                        </Col>
                                      </Row>
                                    </Tooltip>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-3 col-lg-1 text-center user-pt">
                            <div className="box-2">
                              <button
                                type="button"
                                className="btn btn-light mb-3" onClick={this.selectUser.bind(this)}
                              >
                                <i className="fas fa-chevron-right"
                                ></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-light mb-3" onClick={this.disSelectUser.bind(this)}
                              >
                                <i className="fas fa-chevron-left"
                                ></i>
                              </button>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-4 col-lg-4 user-pl">
                            <h3 className="mb-3">
                              Selected Users({" "}
                              {this.state.selectedUserList.length
                                ? this.state.selectedUserList.length
                                : 0}
                              )
                            </h3>
                            <div className="select-all">
                              <input
                                type="checkbox"
                                onClick={this.rightCheckAll.bind(this)}
                                checked={this.state.rightCheckAll}
                                name=""
                              />{" "}
                              Select All
                            </div>

                            <div
                              className="box-1  pd-0-box"
                              onDragOver={event => {
                                event.preventDefault();
                              }}
                              onDrop={this.dropElement.bind(this, true)}
                            >
                              <ul className="list-group fit-list">
                                {this.state.selectedUserList.map(user => (
                                  <li
                                    className="list-group-item"
                                    key={user.UserID}
                                    draggable
                                    onDragStart={this.startDragging.bind(
                                      this,
                                      user.UserID
                                    )}
                                  >
                                    <input
                                      type="checkbox"
                                      className="right-user-check-box"
                                      checked={user.checked}
                                      id={'user-deselect-'+user.UserID}
                                      onChange={this.rightCheckUser.bind(
                                        this,
                                        user.UserID
                                      )}
                                      value={user.UserID}
                                    />
                                    <label className="dragLabel" htmlFor={'user-deselect-'+user.UserID}>{user.FirstName + " " + user.LastName}</label>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        {!this.state.projectId ? <a
                          href="#"
                          className="btn btn-project btn-primary btn-lg text-uppercase my-4"
                          onClick={this.saveAssesment.bind(this)}
                        >
                          Save Project
                        </a> : null }
                      </div>
                      {this.state.projectId ? <div className="drag-drop-sec" style={{marginTop : "45px", position : "relative"}}>
                        {!this.state.projectId ? <div style={{position : "absolute", background : "#0000005c", height : '100%', width : "76%", top : "-10px", left : "-9px", zIndex : "1"}}></div> : "" }
                        <h2>Projects Relations</h2>
                        <p>
                          Select and Add related projects.
                        </p>
                        <div className="row mt-4">
                          <div className="col-3" style={{marginLeft : "2%"}}>
                            <label>AmpMarking Project</label>
                            <input type="text" className="form-control" value={this.state.assesmentName} disabled={true} />
                          </div>
                          <div className="col-2">
                            <label>Relation Type</label>
                            <select className="form-control" value={this.state.selectedRelationType} onChange={(e)=>this.setState({ selectedRelationType : e.target.value })}>
                              <option value="">Select Relation Type</option>
                              {this.state.relationsData.map(rel=>{
                                return <option key={`rel_${rel.RelationshipTypeId}`} value={rel.RelationshipTypeId}>{rel.RelationShipName}</option>
                              })}
                            </select>
                          </div>
                          <div className="col-3">
                            <label>Related Project</label>
                            <select className="form-control" value={this.state.selectedProjectForRelation} onChange={(e)=>this.setState({ selectedProjectForRelation : e.target.value })}>
                              <option value="">Select Related Project</option>
                              {relatedProjectsList.map(proj=>{
                                return <option key={`proj_${proj.BMProjectID}`} value={proj.BMProjectID}>{proj.BMProjectName}</option>
                              })}
                            </select>
                          </div>
                          <div className="col-1" style={{position : "relative"}}>
                            <a style={{position : "absolute", bottom : "9%"}} onClick={()=>this.addRelationHandler()}><i className="fa fa-plus" style={{fontSize : "19px"}}></i></a>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-9">
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th>AmpMarking Project</th>
                                  <th>Relation Type</th>
                                  <th>Related Project</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.relations.map((relation, ind) => {
                                  let relatedProject = this.state.projectList.filter(project => relation.RelatedProjectId == project.BMProjectID)
                                  let relationType = this.state.relationsData.filter(rel=>  relation.RelationTypeId == rel.RelationshipTypeId)
                                  return(
                                    <tr key={`relation_${ind}`}>
                                      <td>{this.state.assesmentName}</td>
                                      <td>{relationType[0].RelationShipName}</td>
                                      <td>{relatedProject[0].BMProjectName}</td>
                                      <td><i className="fa fa-times" onClick={()=>this.deleteRelationHandler(ind, relation.RelationshipId)}></i></td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        {this.state.projectId ? <a
                          href="#"
                          className="btn btn-project btn-primary btn-lg text-uppercase my-4"
                          onClick={this.saveAssesment.bind(this)}
                        >
                          Save Project
                        </a> : null }
                      </div> : null }
                    </div>
                  </div>
                </div>

                <div className="card table-section mt-4 mb-5">
                  <div className="card-header">
                    Manage AmpMarking Projects
                  </div>
                  <div className="card-body">
                    <Row className="mb-2 m-0">
                        <Col sm="8"></Col>
                        <Col sm="4" className="form-group has-search">
                            <Input type="text" value={this.state.search} placeholder="Search" className="form-control" onChange={e => this.setState({search: e.target.value})} />
                            <span className="fas fa-search form-control-search" ></span>
                        </Col>
                    </Row>
                    <div className="user-table table-responsive">
                      <ReactTable
                        data={projectsList}
                        columns={columns}
                        {...tableConfig}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </BenchmarkWrapper>
          </div>
        </div>
      </div>,
      <AsideComponent></AsideComponent>,
      <FooterComponent></FooterComponent>
    ];
  }
}

export default connect(null, { startLoader, stopLoader, deleteProjectRelations })(Benchmark);