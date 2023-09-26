import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import axios from "axios";
import config from "../../config";
import { responseMessage } from "../../utils/alert";

const addEpic = (e, props) => props.addEpic(e);
const selectEpic = (props, id) => props.selectEpic(id);
const addSubEpic = (e, props) => props.addSubEpic(e);
const selectSubEpic = (e, props, parentEpicId, subEpicId) =>
    props.selectSubEpic(e, parentEpicId, subEpicId);

const removeEpic = (e, props) => props.removeEpic(e);
const dropEpic = (e, props, id) => props.dropEpic(e, id);
const dropchildEpic = (e, props, parentEpicId, subEpicId) =>
    props.dropchildEpic(e, parentEpicId, subEpicId);
const editTitle = (e, props, id) => props.editTitle(e, id);
const editsubTitle = (e, props, id, parentid) =>
    props.editsubTitle(e, id, parentid);
const doEpicLockUnlock = (e, props) => props.doEpicLockUnlock(e);

const DesignThinkingEpicBody = (props) => {
    const [deleteId, setDeleteId] = useState(null);

    const { epic } = props;

    const removeSubEpic = (e, props) => {
       
      if (window.confirm("Are you sure to delete the sub epic")) {
        DelelteApi(deleteId);
        props.removeSubEpic(e);
      }else {
        return null
      }


    };

    const removeEpic = (e, props) => {
      if (window.confirm("Are you sure to delete the epic")) {
        DelelteApi(deleteId);
        props.removeEpic(e, props);
       
      }else {
        return null
      }
    };

    const selectSubEpic = (e, props, parentEpicId, subEpicId) => {
        console.log(subEpicId);
        setDeleteId(subEpicId);

        return props.selectSubEpic(e, parentEpicId, subEpicId);
    };

    const selectEpic = (props, id) => {
        setDeleteId(id);
        return props.selectEpic(id);
        // console.log(id)
    };

    // DELETE API FOR EPIC AND SUBEPIC METHODS ********
    //    NAME = SONU SHARMA
    //    REACT DEVELOPER
    const DelelteApi = (id) => {
        axios
            .post(
                config.laravelBaseUrl + `uspDeleteEpiSubEpic`,
                { EpiSubEpicId: id },
                {
                    headers: {
                        authorization:
                            "Bearer " + sessionStorage.getItem("userToken"),
                    },
                }
            )
            .then((res) => {
                console.log(res);
                res.status == 200 &&
                    responseMessage(
                        "success",
                        "Data Deleted Successfully!",
                        ""
                    );
            })
            .catch((err) => console.log(err));
    };

    console.log("Props ==>", props);

    return (
        <>
            {/* <!-- Start Body Content --> */}
            <div
                className={`dt-content-wrapper ${
                    props.showClass ? "right-toggle" : ""
                }`}
            >
                <div className="content-wraper">
                    <div className="container-fluid">
                        <div className="EPICcount-row border-bottom row py-3">
                            <div className="col-sm-6 EPICcount-left d-flex justify-content-between">
                                <p>EPIC </p>
                                <p>
                                    <i
                                        className="fas fa-plus"
                                        onClick={(e) => addEpic(e, props)}
                                    ></i>
                                    <i
                                        className="fas fa-minus"
                                        onClick={(e) => removeEpic(e, props)}
                                    ></i>
                                </p>
                            </div>
                            <div className="col-sm-6 EPICcount-right">
                                <p>EPIC</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="warehousing-filter-btn d-flex py-3 ml-auto">
                                <span className="epic-icon">
                                    Sub Epics&nbsp;&nbsp;
                                    <i
                                        className="fas fa-plus"
                                        onClick={(e) => addSubEpic(e, props)}
                                    ></i>
                                    <i
                                        className="fas fa-minus ml-1"
                                        onClick={(e) => removeSubEpic(e, props)}
                                    ></i>
                                </span>
                                <span>
                                    <select
                                        className="custom-select ml-2"
                                        onChange={(e) =>
                                            doEpicLockUnlock(e, props)
                                        }
                                    >
                                        <option>Actions</option>
                                        <option value="lock">Lock</option>
                                        <option value="unlock">Unlock</option>
                                    </select>
                                </span>
                                {props.parentEpicId > 0 ? (
                                    <NavLink
                                        to={`/dt-epicdetail/${props.dtId}/${props.parentEpicId}`}
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                        >
                                            BUILD
                                        </button>
                                    </NavLink>
                                ) : (
                                    <button
                                        type="button"
                                        disabled
                                        className="btn btn-primary"
                                    >
                                        BUILD
                                    </button>
                                )}
                            </div>
                            <div
                                id="warehousingaccord"
                                className="accordion w-100"
                            >
                                <div className="card mb-0 m-t">
                                    {epic
                                        ? epic.map((epic, epicIndex) => (
                                              <>
                                                  <div
                                                      key={epicIndex}
                                                      className="card-header collapsed"
                                                      data-toggle="collapse"
                                                      href={"#epic" + epicIndex}
                                                      onClick={() =>
                                                          selectEpic(
                                                              props,
                                                              epic.id
                                                          )
                                                      }
                                                  >
                                                      <a
                                                          className="card-title"
                                                          title={epic.name}
                                                      >
                                                          {epic.name}
                                                      </a>
                                                  </div>
                                                  <div
                                                      key={epicIndex}
                                                      id={"epic" + epicIndex}
                                                      className="card-body collapse"
                                                      data-parent="#warehousingaccord"
                                                  >
                                                      <div className="row">
                                                          <div
                                                              className="col-sm-6 epic-left epic-sec pl-md-0"
                                                              onDragOver={(e) =>
                                                                  e.preventDefault()
                                                              }
                                                              onDrop={(e) =>
                                                                  dropEpic(
                                                                      e,
                                                                      props,
                                                                      epic
                                                                  )
                                                              }
                                                          >
                                                              <div
                                                                  key={
                                                                      epicIndex
                                                                  }
                                                                  className="card mb-3"
                                                              >
                                                                  <div className="card-body">
                                                                      <h5 className="card-title">
                                                                          {/* <span style={{width: "50%"}} contentEditable="true" onInput={e => editTitle(e,props,epic.id)}>{ epic.name }</span> */}
                                                                          <ContentEditable
                                                                              html={
                                                                                  epic.name
                                                                              } // innerHTML of the editable div
                                                                              disabled={
                                                                                  false
                                                                              } // use true to disable editing
                                                                              onChange={(
                                                                                  e
                                                                              ) =>
                                                                                  editTitle(
                                                                                      e,
                                                                                      props,
                                                                                      epic.id
                                                                                  )
                                                                              } // handle innerHTML change
                                                                              tagName="article" // Use a custom HTML tag (uses a div by default)
                                                                          />
                                                                          <div className="dropdown float-right dropleft">
                                                                              <a
                                                                                  href="#"
                                                                                  data-toggle="dropdown"
                                                                                  className="dropdown-toggle"
                                                                              >
                                                                                  <i className="fas fa-ellipsis-h"></i>
                                                                              </a>
                                                                              {epic
                                                                                  .Association
                                                                                  .length >
                                                                              0 ? (
                                                                                  <div className="dropdown-menu">
                                                                                      {epic.Association.map(
                                                                                          (
                                                                                              newEpic,
                                                                                              newEpicIndex
                                                                                          ) => (
                                                                                              <>
                                                                                                  <a
                                                                                                      key={
                                                                                                          newEpicIndex
                                                                                                      }
                                                                                                      className="dropdown-item"
                                                                                                      href="#"
                                                                                                  >
                                                                                                      {
                                                                                                          newEpic.name
                                                                                                      }
                                                                                                  </a>
                                                                                                  <div className="dropdown-divider"></div>
                                                                                              </>
                                                                                          )
                                                                                      )}
                                                                                  </div>
                                                                              ) : (
                                                                                  <div className="dropdown-menu">
                                                                                      <p className="dropdown-item">
                                                                                          Not
                                                                                          Available
                                                                                      </p>
                                                                                  </div>
                                                                              )}
                                                                          </div>
                                                                      </h5>
                                                                      <div className="d-flex justify-content-between added-box">
                                                                          {epic.Association ? (
                                                                              <p>
                                                                                  Added:{" "}
                                                                                  <span>
                                                                                      {
                                                                                          epic
                                                                                              .Association
                                                                                              .length
                                                                                      }{" "}
                                                                                      Scenarios
                                                                                  </span>
                                                                              </p>
                                                                          ) : null}
                                                                          <p>
                                                                              Updated
                                                                              1
                                                                              day
                                                                              ago
                                                                          </p>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          {epic.SubEpic ? (
                                                              <div className="col-sm-6 epic-right epic-sec">
                                                                  {epic.SubEpic.map(
                                                                      function (
                                                                          subEpic,
                                                                          subEpicIndex
                                                                      ) {
                                                                          return (
                                                                              <div
                                                                                  key={
                                                                                      subEpicIndex
                                                                                  }
                                                                                  className={`card mb-3 ${
                                                                                      props.subEpicId ==
                                                                                      subEpic.id
                                                                                          ? "active"
                                                                                          : ""
                                                                                  }`}
                                                                                  onClick={(
                                                                                      e
                                                                                  ) =>
                                                                                      selectSubEpic(
                                                                                          e,
                                                                                          props,
                                                                                          epic.id,
                                                                                          subEpic.id
                                                                                      )
                                                                                  }
                                                                                  onDragOver={(
                                                                                      e
                                                                                  ) =>
                                                                                      e.preventDefault()
                                                                                  }
                                                                                  onDrop={(
                                                                                      e
                                                                                  ) =>
                                                                                      dropchildEpic(
                                                                                          e,
                                                                                          props,
                                                                                          epic.id,
                                                                                          subEpic
                                                                                      )
                                                                                  }
                                                                              >
                                                                                  <div className="card-body">
                                                                                      <h5 className="card-title">
                                                                                          {/* <span style={{width: "50%"}}  contentEditable="true" onInput={e => editsubTitle(e,props,subEpic.id,epic.id)}> {subEpic.name}</span> */}
                                                                                          <ContentEditable
                                                                                              html={
                                                                                                  subEpic.name
                                                                                              } // innerHTML of the editable div
                                                                                              disabled={
                                                                                                  false
                                                                                              } // use true to disable editing
                                                                                              onChange={(
                                                                                                  e
                                                                                              ) =>
                                                                                                  editsubTitle(
                                                                                                      e,
                                                                                                      props,
                                                                                                      subEpic.id,
                                                                                                      epic.id
                                                                                                  )
                                                                                              } // handle innerHTML change
                                                                                              tagName="article" // Use a custom HTML tag (uses a div by default)
                                                                                          />

                                                                                          <div className="dropdown float-right dropleft">
                                                                                              <a
                                                                                                  href="#"
                                                                                                  data-toggle="dropdown"
                                                                                                  className="dropdown-toggle"
                                                                                              >
                                                                                                  <i className="fas fa-ellipsis-h"></i>
                                                                                              </a>
                                                                                              {epic
                                                                                                  .SubEpic[
                                                                                                  subEpicIndex
                                                                                              ]
                                                                                                  .Association
                                                                                                  .length >
                                                                                              0 ? (
                                                                                                  <div className="dropdown-menu">
                                                                                                      {epic.SubEpic[
                                                                                                          subEpicIndex
                                                                                                      ].Association.map(
                                                                                                          function (
                                                                                                              newsubEpic,
                                                                                                              newsubEpicIndex
                                                                                                          ) {
                                                                                                              return (
                                                                                                                  <>
                                                                                                                      <a
                                                                                                                          key={
                                                                                                                              newsubEpicIndex
                                                                                                                          }
                                                                                                                          className="dropdown-item"
                                                                                                                          href="#"
                                                                                                                      >
                                                                                                                          {
                                                                                                                              newsubEpic.name
                                                                                                                          }
                                                                                                                      </a>
                                                                                                                      <div className="dropdown-divider"></div>
                                                                                                                  </>
                                                                                                              );
                                                                                                          }
                                                                                                      )}
                                                                                                  </div>
                                                                                              ) : (
                                                                                                  <div className="dropdown-menu">
                                                                                                      <p className="dropdown-item">
                                                                                                          Not
                                                                                                          Available
                                                                                                      </p>
                                                                                                  </div>
                                                                                              )}
                                                                                          </div>
                                                                                      </h5>
                                                                                      <div className="d-flex justify-content-between added-box">
                                                                                          {epic
                                                                                              .SubEpic[
                                                                                              subEpicIndex
                                                                                          ]
                                                                                              .Association ? (
                                                                                              <p>
                                                                                                  Added:{" "}
                                                                                                  <span>
                                                                                                      {
                                                                                                          epic
                                                                                                              .SubEpic[
                                                                                                              subEpicIndex
                                                                                                          ]
                                                                                                              .Association
                                                                                                              .length
                                                                                                      }{" "}
                                                                                                      Scenarios
                                                                                                  </span>
                                                                                              </p>
                                                                                          ) : null}
                                                                                          <p>
                                                                                              Updated
                                                                                              1
                                                                                              day
                                                                                              ago
                                                                                          </p>
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                          );
                                                                      }
                                                                  )}
                                                              </div>
                                                          ) : null}
                                                      </div>
                                                  </div>
                                              </>
                                          ))
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Body Content --> */}
        </>
    );
};

export default DesignThinkingEpicBody;
