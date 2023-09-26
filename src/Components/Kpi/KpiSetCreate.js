import React, { Component } from 'react';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from "../includes/dashboardFooter/FooterComponent";
import ApiServer from "../../common/js/ApiServices.js";
import moment from "moment";
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Input } from 'reactstrap';
import { responseMessage } from '../../utils/alert';
import ReactTable from 'react-table';
import KpiAssocation from './KpiAssocation';
import { KpiSetCreateWrapper }from './Styling/KpiSetCreate.js'
import SimpleReactValidator from "simple-react-validator";
import 'react-table/react-table.css';
import ModalPopup from '../common/ModalPopup';
import "react-datepicker/dist/react-datepicker.css";
import { getKpiAssociation, fetchKpiUserList, fetchKpiSetList, fetchBcsList, saveKpiSet, fetchKpiSetById, saveBscCategory} from '../../actions/kpiActions';
import Axios from 'axios';

const config = require('../../config');

class KpiSetCreate extends Component {
  constructor(props) {
    super(props);
    this.userList = [];
    this.apiServer = new ApiServer(true);
    this.state = {
      userList: [],
      userListOri: [],
      kpiSetList: [],
      BSCCategory: "",
      selectedUserList: [],
      disableDate: "",
      assesmentName: "",
      projectList: [],
      projectId: "",
      search: "",
      validationError: {
        assesmentName: false
      },
      leftCheckAll: false,
      rightCheckAll: false,
      redirectToLogin: false,
      loading: true,
      combinedProject:{},
      addBscCategoryPopUp : false,
      addCategoryId : 0,
      addCategoryName : "",
      addCategoryDescription : "",
      addCategoryEndDate : ""
    };
    this.validator = new SimpleReactValidator({
      element: message => {
        return <p className="text-danger">{message}</p>;
      },
      autoForceUpdate: this
    });
  }
  componentDidMount() {
    this.props.fetchKpiUserList();
    this.props.fetchKpiSetList();
    this.props.fetchBcsList();
    //this.props.getKpiAssociation();

    //this.props.fetchBenchmarkProjectsWithDomains();
    //this.props.fetchDecompositionProjects();
    
   /* let comObject = {
          "association_data":[{
            "name":"Benchmarking Projects",
            "projects":this.props.fetchBenchmarkProjectsWithDomains()
          },
          {
            "name":"Capability Modelling Projects",
            "projects":this.props.fetchDecompositionProjects()
          },
        {
          "name":"Design Thinking Projects",
          "projects":[]
        }]

    }*/
    
    
    

    

  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let returnObj = {}
    if (nextProps.userList !== prevState.userListOri) {
      returnObj.userList = nextProps.userList
      returnObj.userListOri = nextProps.userList

    }
    if (nextProps.kpiSetList !== prevState.kpiSetList) {
      returnObj.projectList = nextProps.kpiSetList
    }

    return returnObj;
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
      this.setState({
        loading: true
      });
      let requestData = {
        url: "",
        method: "",
        data: {}
      };
      let selectedUserId = [];
      let selectedUserAccess = [];
      this.state.selectedUserList.forEach(user => {
        selectedUserId.push(user.UserID);
      });
      this.state.selectedUserList.forEach(user => {
        selectedUserAccess.push({ UserId: user.UserID, KpiId: "0", AccessType: "1", OwnerFlag: "1", });
      })
      if (this.state.projectId) {
        requestData.url = "/save_kpi_set";
        requestData.method = "POST";
        requestData.data = {
          postData: {
            KPISetID: this.state.projectId,
            KPISetName: this.state.assesmentName,
            KPISetTitle: this.state.assesmentName,
            Description:this.state.Description,
            Status: "1",
            GlobalFlag: "1",
            CategoryLookUpId: this.state.BSCCategory,
            KpiUserAccess: selectedUserAccess
          }
        };
        if (this.state.disableDate) {
          requestData.data.postData.disableDate = moment(this.state.disableDate).format(
            "YYYY-MM-DD"
          );
        }
      } else {
        requestData.url = "/save_kpi_set";
        requestData.method = "POST";
        requestData.data = {
          postData: {
            KPISetID: "0",
            KPISetName: this.state.assesmentName,
            KPISetTitle: this.state.assesmentName,
            Description:this.state.Description,
            Status: "1",
            GlobalFlag: "1",
            CategoryLookUpId: this.state.BSCCategory,
            KpiUserAccess: selectedUserAccess
          }
        };
        // console.log(JSON.stringify(requestData.data.postData))
      }

      return this.apiServer
        .SendRequest(requestData)
        .then(result => {
          if (result.success === true) {
            //console.log(result)
            if (this.state.projectId) {
              responseMessage("success", result.message, "");
            } else {
              responseMessage("success", result.message, "");
            }
            this.setState({
              assesmentName: "",
              selectedUserList: [],
              projectId: "",
              BSCCategory : "",
              Description:""
            });
            this.props.fetchKpiUserList();
            this.props.fetchKpiSetList();
            this.props.fetchBcsList();
          } else {
            responseMessage("error", result.message, "");
            this.setState({ loading: false })
          }
        })
        .catch(error => {
          responseMessage("error", "Sorry something went wrong. Please try again", "");
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
    //console.log("dragged user",JSON.stringify(selectingUser));
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
  editProject(KPISetID, disableDate) {
    return this.apiServer
      .SendRequest({
        method: "GET",
        url: "/get_kpi_set/" + KPISetID,
        data: ""
      })
      .then(result => {
        //console.log(result)
        if (result.success === true) {
          let projectData = result.data;
          let userList = [];
          let selectedUserList = [];
          this.state.userListOri.forEach((user, userIndex) => {
            let matchFlag = false;
            projectData.forEach((project, index) => {
              if (userIndex === 0) {
                if(project.UserID!=null && selectedUserList.map(userForCondition=>userForCondition.UserID).indexOf(project.UserID) == -1){
                  selectedUserList.push({
                    UserID: project.UserID,
                    FirstName: project.FirstName,
                    MiddleName: project.MiddleName,
                    LastName: project.LastName,
                    checked: false
                  });
                }
                if (index === 0) {
                  this.setState({
                    assesmentName: project.KPISetName,
                    projectId: project.KPISetID,
                    BSCCategory: project.CategoryLookUpId,
                    Description:project.Description
                  });
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

        // console.log(error);
      });
  }
handleChange(e){
  this.setState({...this.state,[e.target.name]:e.target.value})
}
  kpiSetNameHandler(event) {
    this.setState({
      assesmentName: event.target.value
    })
  }
  categoryHandler = (e) => {
    this.setState({ BSCCategory: e.target.value });
  }
  addBscCategoryPopUpOpen = () => {
    this.setState({
      addBscCategoryPopUp : !this.state.addBscCategoryPopUp
    })
  }
  addCategoryCategoryChangeHandler = (e) => {
    // console.log(e.target.value,"value")
    if(e.target.value == ""){
      this.setState({
        addCategoryName : "",
        addCategoryDescription : "",
        addCategoryEndDate : "",
        addCategoryId : 0
      })
    }else{
      let ind = this.props.kpiBsc.map(cat=>cat.CategoryLookUpId).indexOf(e.target.value);
      if(ind >= 0){
        this.setState({
          addCategoryName : this.props.kpiBsc[ind].CategoryName,
          addCategoryDescription : this.props.kpiBsc[ind].CategoryDescription,
          addCategoryEndDate : this.props.kpiBsc[ind].EndDate?new Date(this.props.kpiBsc[ind].EndDate):"",
          addCategoryId : this.props.kpiBsc[ind].CategoryLookUpId
        })
      }
    }
  }
  addCategoryendDateChangeHandler = (date) => {
    // console.log(date)
    this.setState({
      addCategoryEndDate : date
    })
  }
  addCategoryFieldChangeHandler = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  saveAddCategoryHandler = async() => {
    let saveObj = {
      Id:this.state.addCategoryId,
      Name:this.state.addCategoryName,
      Description:this.state.addCategoryDescription,
      EndDate:this.state.addCategoryEndDate!= ""?moment(this.state.addCategoryEndDate).format("YYYY-MM-DD"):"",
      ActiveFlag:"1"
    }
    Axios.post(config.laravelBaseUrl + 'saveBscCategory',saveObj,{
      headers : {
        "authorization": "Bearer " + sessionStorage.getItem("userToken")
      }
    }).then(res => {
      // console.log(res)
      responseMessage("success",res.data.message)
      this.props.fetchBcsList();
    }).catch(err => {
      responseMessage("error",err.response.data.message)
    })
    this.setState({
      addCategoryName : "",
      addCategoryDescription : "",
      addCategoryEndDate : "",
      addCategoryId : 0
    })
    this.addBscCategoryPopUpOpen();
    this.setState({addCategoryShowValidation:false})
    
  }
  render() {

    
    const tableConfig = {
      defaultPageSize: 5,
      resizable: false,
      className: 'table-striped'
    }
    let projectsList = [];
    if (this.state.projectList.length > 0) {
      projectsList = this.state.projectList;
    }
    if (this.state.search) {
      projectsList = projectsList.filter(row => {
        let projectName = row.KPISetName ? row.KPISetName.toLowerCase() : '';
        let noOfUsers = row.KpiUserAccessCount ? row.KpiUserAccessCount.toLowerCase() : '';
        let projectStatus = row.Status ? row.Status : '';
        let disableDate = row.DisableDate ? row.DisableDate.toLowerCase() : '';
        return projectName.includes(this.state.search.toLowerCase()) || noOfUsers.includes(this.state.search) || projectStatus.includes(this.state.search) || disableDate.includes(this.state.search.toLowerCase())
      })
    }
    let columns = [{
      Header: 'KPI',
      accessor: 'KPISetName'
    }, {
      Header: 'No. of Users',
      accessor: 'KpiUserAccessCount'
    }, {
      Header: 'Status',
      accessor: 'Status',
      Cell: props => <span className="badge badge-success">{props.original.DisableStatus}</span>
    }, {
      Header: 'Disable Date',
      accessor: 'DisableDate',
      Cell: props => <span>{props.original.DisableDate ? moment(props.original.DisableDate).format("DD/MM/YYYY") : "Not Available"}</span>
    }, {
      Header: 'Action',
      sortable: false,
      Cell: props => <a className="btn btn-info" href="#" onClick={this.editProject.bind(this, props.original.KPISetID, props.original.DisableDate)}><i className="fa fa-edit"></i></a>
    }];
    return [
      <DashboardHeader></DashboardHeader>,
      <div id="wrapper">
        <DashboardSidebar></DashboardSidebar>
        <KpiSetCreateWrapper className="w-100">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <ol className="breadcrumb dashbread">
              <li className="breadcrumb-item active">Dashboard</li>
              <li className="breadcrumb-item">Manage</li>
              <li className="breadcrumb-item">Performance Measuring Manage</li>
              <li className="breadcrumb-item">Create/Manage Global Business Initiative</li>
              <li className="breadcrumb-menu d-md-down-none ml-auto">
                {<img src={require('./../../common/images/diva-icon.png')} className="logo-img" alt="Logo" />}
                <a className="btn powered p-0" href="#">
                  <i className="icon-graph"></i> &nbsp;
                          <i>Powered by Amploglobal</i>
                </a>

              </li>
            </ol>

            <div className="container-fluid container-dashboard">
              <div className="user-content">
                <h1 className="heading mt-3">Global Business Initiative</h1>
                <div className="row">
                <div className="col-lg-8">
                <div className="card set-section">
                  <div className="card-header">Create Global Business Initiative</div>
                  <div className="card-body">
                    <p className="card-text">
                      Add Global Business Initiatives to your enterprise account to allow different
                      teams and business units to assess and compare their
                      results with other parts of your enterprise.
                          </p>
                    <div className="user-form-section">
                      <div className="row">
                        <div className="form-group col-sm-6">
                          <label>Global Business Initiative Name *</label>
                          <input
                            type="text"
                            placeholder=""
                            name="assesmentName"
                            disabled={this.state.projectId > 0 && this.state.assesmentName.toLowerCase() == "global business initiative"?true:false}
                            value={this.state.assesmentName}
                            onBlur={this.showValidationMessage.bind(this)}
                            onKeyUp={this.showValidationMessage.bind(this)}
                            onChange={event => this.kpiSetNameHandler(event)}
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
                        <div className="form-group col-sm-6">
                          <label>BSC Category</label>
                          <select className="form-control create-assessment-form" value={(this.state.BSCCategory != "") ? this.state.BSCCategory : ""} onChange={(e) => this.categoryHandler(e)}>
                            <option></option>
                            {this.props.kpiBsc.map(data => {
                              return (<option key={"Id" + data.CategoryLookUpId} value={data.CategoryLookUpId}>{data.CategoryName}</option>)
                            })}
                          </select>
                        </div>
                        {this.state.projectId ? (
                          <div className="col-sm-6">
                            <label>Select Project Disable Date</label>
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
                                disabled={this.state.projectId > 0 && this.state.assesmentName.toLowerCase() == "global business initiative"?true:false}
                                minDate={new Date()}
                                onChange={this.handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                selected={this.state.disableDate}
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                     
                      <div className="row">
                        <div className="form-group col-sm-6">&nbsp;</div>
                        <div className="form-group col-sm-6">
                          <a href="#" onClick={()=>this.addBscCategoryPopUpOpen()}>Add/Edit BSC Category</a>
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-md-12">
                        <label>Description</label>
                        <textarea
                            
                            style={{height:"90px"}}
                            placeholder=""
Description                            name="Description"
                            disabled={this.state.projectId > 0 && this.state.assesmentName.toLowerCase() == "global kpi set"?true:false}
                            
                            value={this.state.Description}
                            onChange={this.handleChange.bind(this)}
                            className="form-control create-assessment-form"
                          ></textarea>
                        </div>
                      </div>
                      <div className="drag-drop-sec">
                        <h2>Add Users</h2>
                        <p>
                          Drag and drop users from Enterprise users to add users
                          to Business Initiative
                              </p>
                        <div className="row px-3 mt-4 justify-content-between">
                          <div className="">
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
                                defaultChecked={this.state.leftCheckAll}
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
                                      defaultChecked={user.checked}
                                      className="left-check-box"
                                      id={'user-select-' + user.UserID}
                                      onChange={this.checkUser.bind(
                                        this,
                                        user.UserID
                                      )}
                                      value={user.UserID}
                                    />
                                    <label className="dragLabel" htmlFor={'user-select-' + user.UserID}>{user.FirstName + " " + user.LastName}</label>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="text-center user-pt">
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
                          <div className="">
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
                                defaultChecked={this.state.rightCheckAll}
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
                                      defaultChecked={user.checked}
                                      id={'user-deselect-' + user.UserID}
                                      onChange={this.rightCheckUser.bind(
                                        this,
                                        user.UserID
                                      )}
                                      value={user.UserID}
                                    />
                                    <label className="dragLabel" htmlFor={'user-deselect-' + user.UserID}>{user.FirstName + " " + user.LastName}</label>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="btn btn-project btn-primary btn-lg text-uppercase my-4"
                          onClick={this.saveAssesment.bind(this)}
                        >
                          Save 
                              </a>
                      </div>
                    </div>
                  </div>
                </div>
                </div></div>
                {/* KPI Assocation*/}
              
                <div className="row">
                <div className="col-lg-8">
                <div className="card table-section mt-4 mb-5">
                  <div className="card-header">
                    Manage Business Initiative
                  </div>
                  <div className="card-body">
                    <Row className="mb-2 m-0">
                      <Col sm="8"></Col>
                      <Col sm="4" className="form-group has-search">
                        <Input type="text" value={this.state.search} placeholder="Search" className="form-control" onChange={e => this.setState({ search: e.target.value })} />
                        <span className="fas fa-search form-control-search" ></span>
                      </Col>
                    </Row>
                    <div className="user-table table-responsive">
                      <ReactTable
                        data={projectsList}
                        columns={columns}
                        minRows = {0}
                        {...tableConfig}
                      />
                    </div>
                  </div>
                </div>
                </div>
                </div>
                {/* <KpiAssocation /> */}
             
              </div>
            </div>
          </div>
        </div>
        <ModalPopup isOpen={this.state.addBscCategoryPopUp} toggle={this.addBscCategoryPopUpOpen.bind(this)} title="Add/Edit BSC Category">
          <div class="form-group">
              <label>Select Existing Category (for Edit)<span class="text-danger"></span></label>
              <select className="form-control create-assessment-form" value={this.state.addCategoryId} onChange={(e)=>this.addCategoryCategoryChangeHandler(e)}>
                <option value=""></option>
                {this.props.kpiBsc.map((cat)=>{
                  return (
                    <option key={cat.CategoryLookUpId} value={cat.CategoryLookUpId}>{cat.CategoryName}</option>
                  )
                })}
              </select>
          </div>
          <div class="form-group">
              <label>New Category Name <span class="text-danger">*</span></label>
              <input className="form-control" type="text" name="addCategoryName" onChange={(e) => this.addCategoryFieldChangeHandler(e)} value={this.state.addCategoryName} />  {this.state.addCategoryName == "" && this.state.addCategoryShowValidation?<span class="text-danger">Category Name is required.</span>:""}
          </div>
          <div class="form-group">
              <label>New Category Description<span class="text-danger"></span></label>
              <input className="form-control" type="text" name="addCategoryDescription"  onChange={(e) => this.addCategoryFieldChangeHandler(e)} value={this.state.addCategoryDescription} />    {this.state.versionReason == ""?<span class="text-danger">Version Updrade reason is required.</span>:""}                                          
          </div>
          <div class="form-group">
              <label>Disable Date<span className="text-danger"></span></label>
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="far fa-calendar-alt"></i>
                        </div>
                    </div>
                    <DatePicker
                        onKeyDown={event => {
                        event.preventDefault();
                        return false;
                        }}
                        className="form-control border-secondary py-2 dis-date"
                        id="endDate"
                        minDate={new Date()}
                        onChange={this.addCategoryendDateChangeHandler}
                        dateFormat="dd/MM/yyyy"
                        selected={this.state.addCategoryEndDate?this.state.addCategoryEndDate:''}
                    />
                </div>                                      
          </div>
          <div className="modal-footer">
              <button type="button" className="btn btn-secondary"  onClick={()=>this.addBscCategoryPopUpOpen()}>Cancel</button> 
              <button type="button" className="btn btn-primary ml-3"  onClick={this.state.addCategoryName != ""?()=>this.saveAddCategoryHandler():()=>{this.setState({addCategoryShowValidation:true})}}>Save</button> 
          </div> 
        </ModalPopup>
        </KpiSetCreateWrapper>
      </div>,
      <FooterComponent></FooterComponent>
    ];
  }
}
const mapStateToProps = state => ({
  kpiSetList: state.kpiData.kpiSets,
  userList: state.kpiData.kpiUsers,
  kpiBsc: state.kpiData.kpiBsc,
  kpiSetSave: state.kpiData.kpiSetSave,
  kpiSetDetails: state.kpiData.kpiSetDetails,
  errors: state.errors
});
export default connect(mapStateToProps, { getKpiAssociation, fetchKpiUserList, fetchKpiSetList, fetchBcsList, saveKpiSet, fetchKpiSetById, saveBscCategory})(withRouter(KpiSetCreate));