import React from "react";
import DashboardHeader from "../../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from "../../includes/dashboardFooter/FooterComponent";
import AsideComponent from "../../includes/asideComponent/AsideComponent";
import SidebarJs from "../../../common/js/sidebarAnimation";
import "./CreateManageProjectsDT.css";
import ApiServer from "../../../common/js/ApiServices.js";
import moment from "moment";
import DatePicker from "react-datepicker";
import SimpleReactValidator from "simple-react-validator";
import {Row, Col, Input} from 'reactstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {responseMessage} from '../../../utils/alert';
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
const config = require('../../../config');

export default class CreateManageProjectsDT extends React.Component {
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
      //pageNumber: 1,
      //pageSize: 10,
      //totalResultCount: 0,
      validationError: {
        assesmentName: false
      },
      leftCheckAll: false,
      rightCheckAll: false,
      dtChampionsList : [],
      dtChampion : ""
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
      return axios.post(config.laravelBaseUrl + 'saveDesignThinkingProject', {
        DtProjectId:this.state.projectId ? this.state.projectId : 0,
        ProjectName: this.state.assesmentName,
        DisableDate:this.state.disableDate ? this.state.disableDate : "",
        ChampionUserId:this.state.dtChampion,
        userId:selectedUserId
      }, {
        headers: {
          "authorization": "Bearer " + sessionStorage.getItem("userToken")
        }
      })
        .then(result => {
          if (result.data.success === true) {
            if (this.state.projectId) {
              responseMessage("success", result.data.message, "");
            } else {
              responseMessage("success", result.data.message, "");
            }
            this.setState({
              assesmentName: "",
              selectedUserList: [],
              projectId: "",
              dtChampion : ""
            });
            this.fetchUserList();
            this.fetchProjectList();
          } else {
            responseMessage("error", result.data.message, "");
          }
        })
        .catch(error => {
          responseMessage("error", error.response.data.message, "");
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
    //console.log("user dragged",user);
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
    return axios.all([
        axios.get(config.laravelBaseUrl + "getDesignThinkingProjectDetails/"+projectId+'/0', {
        headers: {
          "authorization": "Bearer " + sessionStorage.getItem("userToken")
        }
      }),
      axios.get(config.laravelBaseUrl + "getDesignThinkingProjectUserDetails/"+projectId, {
        headers: {
          "authorization": "Bearer " + sessionStorage.getItem("userToken")
        }
      })
    ])
      .then(axios.spread((result, resultUser) => {
        if (result.data.success === true) {
          let projectData = result.data.data;
          console.log(projectData[0])
          let userList = [];
          let selectedUserList = [];
          this.userList.forEach((user, userIndex) => {
            let matchFlag = false;
            resultUser.data.data.forEach((project, index) => {
              if (userIndex === 0) {
                selectedUserList.push({
                  UserID: project.UserID,
                  FirstName: project.FirstName,
                  MiddleName: project.MiddleName,
                  LastName: project.LastName,
                  checked: false
                });
                if (index === 0) {
                  this.setState({ assesmentName: projectData[0].ProjectTitle, dtChampion :  projectData[0].ChampionUserId ? projectData[0].ChampionUserId : ""});
                  this.setState({ projectId: projectData[0].DTProjectID });
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
      }))
      .catch(error => {
        console.log(error);
      });
  }

  fetchUserList() {
      return axios.get(config.laravelBaseUrl + "client-users", {
        headers: {
            "authorization": "Bearer " + sessionStorage.getItem("userToken")
          }
      })
      .then(result => {
        if (result.data.status === "Success") {
          this.userList = [...result.data.data];
          this.userList.forEach(elem => {
            elem.checked = false;
          });
          this.setState({
            userList: [...this.userList],
            dtChampionsList : [...this.userList]
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchProjectList(pageSize = 10, pageNumber = 1) {
    return axios.get(config.laravelBaseUrl + "getDesignThinkingProject", {
        headers: {
            "authorization": "Bearer " + sessionStorage.getItem("userToken")
        }
    })
    .then(result => {
      if (result.data.success === true) {
        this.setState({
          projectList: [...result.data.data]
        });
      }
      // console.log(this.state.projectList)
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
  render() {
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
        let projectName = row.ProjectTitle ? row.ProjectTitle.toLowerCase() : '';
        let noOfUsers = row.NoOfUsers ? row.NoOfUsers.toLowerCase() : '';
        let projectStatus = row.Status ? row.Status.toLowerCase() : '';
        let disableDate = row.DisableDate ? row.DisableDate.toLowerCase() : '';
        return projectName.includes(this.state.search.toLowerCase()) || noOfUsers.includes(this.state.search) || projectStatus.includes(this.state.search) || disableDate.includes(this.state.search.toLowerCase())
      })
    }
    let columns = [{
        Header: 'Business Decompostion Project',
        accessor: 'ProjectTitle'
      }, {
        Header: 'No. of Users',
        accessor: 'NoOfUsers'
      }, {
        Header: 'Status',
        accessor: 'Statuse',
        Cell: props => <span className="badge badge-success">{props.original.Status}</span>
      }, {
        Header: 'Disable Date',
        accessor: 'DisableDate',
        Cell: props => <span>{props.original.DisableDate ? moment(props.original.DisableDate).format("DD/MM/YYYY") : "Not Available"}</span>
    }, {
        Header: 'Actions',
        sortable: false,
        Cell: props => <a className="btn btn-info" href="#" onClick={this.editProject.bind(this, props.original.DTProjectID, props.original.DisableDate)}><i className="fa fa-edit"></i></a>
    }];
    return [
      <DashboardHeader></DashboardHeader>,
      <div id="wrapper">
        <DashboardSidebar></DashboardSidebar>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <ol className="breadcrumb dashbread">
              <li className="breadcrumb-item active">Home</li>
              <li className="breadcrumb-item">Manage</li>
              <li className="breadcrumb-item">Design Led Materiality</li>
              <li className="breadcrumb-item">Create & Manage Projects</li>
              <li className="breadcrumb-menu d-md-down-none ml-auto">
              {<img src={ require('../../../common/images/diva-icon.png') } className="logo-img" alt="Logo" /> }
                  <a className="btn powered p-0" href="#">
                    <i className="icon-graph"></i> &nbsp;
                    <i>Powered by Amploglobal</i>
                  </a>
              </li>
            </ol>

            {/* <BenchmarkWrapper className="container-fluid container-dashboard"> */}
            <div className="container-fluid container-dashboard">
              <div className="user-content">
                <h1 className="heading mt-3">Design Led Materiality - Create/Manage Projects</h1>

                <div className="card set-section">
                  <div className="card-header">Create Design Thinking Project</div>
                  <div className="card-body">
                    <p className="card-text">
                      Add sets to your enterprise account to allow different
                      teams and business units to assess and compare their
                      results with other parts of your enterprise.
                    </p>
                    <div className="user-form-section">
                      <div className="row">
                        <div className="form-group col-sm-4">
                          <label>Design Thinking Project Name *</label>
                          <input
                            type="text"
                           
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
                      <div className="drag-drop-sec">
                        <h2>Add Users</h2>
                        <p>
                          Drag and drop users from Enterprise users to add users
                          to Design Thinking Project selected users.
                        </p>
                        <div className="row mt-4" style={{marginBottom : "2.5rem"}}>
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
                      </div>
                      <div className="row">
                        <div className="form-group col-sm-4">
                          <label> Design Thinking Champion <span className="text-danger">*</span></label>
                          <select className="form-control" value={this.state.dtChampion} onChange={(e)=>this.setState({ dtChampion : e.target.value })}>
                            <option value="">Select Design Thinking Champion</option>
                            {this.state.dtChampionsList.map(champ=>{
                              return <option value={champ.UserID} key={'champ_'+champ.UserID}>{champ.FirstName+' '+champ.LastName}</option>
                            })}
                          </select>
                          {this.validator.message(
                            "dtChampion",
                            this.state.dtChampion,
                            "required",
                            {
                              messages: {
                                required: "Design Thinking Champion is required"
                              }
                            }
                          )}
                        </div>
                      </div>
                        <a
                          href="#"
                          className="btn btn-project btn-primary btn-lg text-uppercase my-4"
                          onClick={this.saveAssesment.bind(this)}
                          style={{fontSize : "0.95rem"}}
                        >
                          Save Project
                        </a>
                    </div>
                  </div>
                </div>

                <div className="card table-section mt-4 mb-5">
                  <div className="card-header">
                    Manage Business Decomposition Projects
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
              </div>
            {/* </BenchmarkWrapper> */}
          </div>
        </div>
      </div>,
      <AsideComponent></AsideComponent>,
      <FooterComponent></FooterComponent>
    ];
  }
}