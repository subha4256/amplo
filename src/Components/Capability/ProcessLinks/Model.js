import React, { useEffect, useState } from "react";
import "./css/style.css";
import { Button, Modal } from "react-bootstrap";
import Axios from "axios";
import config from "../../../config";
import CacheStorage from "../../../utils/CacheStorage";
import DragDropContext from "../../DesignThinkingRoadmap/withDnDContext";
import { useDrop, useDrag } from "react-dnd";
import ProcessHOC from "./ProcessHOC";
import {
    fetchFunctions,
    fetchInnerProcess,
    fetchPhases,
    getCausalDetails,
    postCausalList,
} from "./action";
import ProcessIndepHOC from "./ProcessIndepHOC";
import { v4 as uuidv4 } from "uuid";
import DropHoc from "./DropHoc/DropHoc";
import { responseMessage } from "../../../utils/alert";

const ProcessModel = ({ status, hideMethod, projectOptions, projects }) => {
    const [functions, setFunctions] = useState([]);
    const [phases, setPhases] = useState([]);
    const [processLevel, setProcessLevel] = useState({});

    const [functionsTwo, setFunctionsTwo] = useState([]);
    const [phasesTwo, setPhasesTwo] = useState([]);
    const [processLevelTwo, setProcessLevelTwo] = useState({});

    const [dependentProjectName, setDependentProjectName] = useState({});
    const [independentProjectName, setIndependentProjectName] = useState({});

    const [causalList, setcausalList] = useState([]);

    const [errorOfScore, setErrorOfScore] = useState("");

    console.log("Functions Modle =>", functions);
    console.log(("Phase =>", phases));
    console.log(processLevel);

    console.log(Object.keys(processLevel));
    const getCausalDetails = async (projectId) => {
        // GetDependentDetailbyDecompositionProcessLevelID {API issue only please fix}

        const headers = {
            authorization: "Bearer " + CacheStorage.getItem("userToken"),
        };
        let functions = await Axios.get(
            config.laravelBaseUrl +
                "GetDependentDetailbyDecompositionProcessLevelID/" +
                projectId +
                "/0",
            {
                headers: headers,
            }
        );

        let updateResponseData = functions.data.data.reduce((acc, curr) => {
            let obj = curr.Data.map((item) => item);

            return [...acc, obj].flat();
        }, []);
        console.log(updateResponseData);

        if (functions.data.data) {
            setcausalList(updateResponseData);
        }
    };

    const handleChangeProject = async (e) => {
        setDependentProjectName({});
        let id = e.target.value;

        let projectName = projects?.find(
            (item) => item.DecompositionProjectID === id
        )?.ProjectName;

        setDependentProjectName({ ...dependentProjectName, projectName, id });

        setFunctions([]);
        setPhases([]);
        setProcessLevel({});

        let [getfunctions, getPhases, getProcess] = await Promise.all([
            fetchFunctions(id),
            fetchPhases(id),
            fetchInnerProcess(id),
        ]);
        await getCausalDetails(id);
        await setFunctions(getfunctions);
        await setPhases(getPhases);
        await setProcessLevel(getProcess);
    };

    const handleChangeProjectTwo = async (e) => {
        setIndependentProjectName({});
        let id = e.target.value;

        let projectName = projects?.find(
            (item) => item.DecompositionProjectID === id
        )?.ProjectName;

        setIndependentProjectName({ ...dependentProjectName, projectName, id });

        setFunctionsTwo([]);
        setPhasesTwo([]);
        setProcessLevelTwo({});

        let [getfunctions, getPhases, getProcess] = await Promise.all([
            fetchFunctions(id),
            fetchPhases(id),
            fetchInnerProcess(id),
        ]);

        setFunctionsTwo(getfunctions);
        setPhasesTwo(getPhases);
        setProcessLevelTwo(getProcess);
    };

    const addDependencyHandle = () => {
        let obj = {
            DecompositionProcessLevel1ID: uuidv4(),
            IndependentProcess: [],
        };

        setcausalList([obj, ...causalList]);
    };

    const handleSave = async () => {
        setErrorOfScore("");
        let scoreCheck = [];

        const uniqueValues = new Set(
            causalList.map((v) => v.DecompositionProcessLevel1ID)
        );

        if (uniqueValues.size < causalList.length) {
            // console.log("duplicates found");
            responseMessage("error", "Please remove circular reference!");
            return;
        }

        const sendData = {
            Name: dependentProjectName.projectName || "Project Name",
            Data: causalList.map((item) => ({
                DependentMasterId: item.DependentMasterId
                    ? item.DependentMasterId
                    : 0,
                DecompositionProcessLevel1ID: item.DecompositionProcessLevel1ID,
                DecompositionProjectID: item?.DecompositionProjectID
                    ? item?.DecompositionProjectID
                    : dependentProjectName.id,
                IndependentProcess: item.IndependentProcess.map((proc) => {
                    console.log(
                        item.IndependentProcess.reduce(
                            (a, b) => a + +b.Value,
                            0
                        )
                    );

                    let check =
                        item.IndependentProcess.reduce(
                            (a, b) => a + +b.Value,
                            0
                        ) == 100
                            ? true
                            : false;

                    scoreCheck.push(check);

                    return {
                        IndependentDecompositionProcessLevel1ID:
                            proc.IndependentDecompositionProcessLevel1ID,
                        Value: proc.Value,
                        DecompositionProjectID:
                            proc?.IndependendentDecompositionProjectID
                                ? proc?.IndependendentDecompositionProjectID
                                : independentProjectName.id,
                    };
                }),
            })),
        };

        console.log(sendData);
        console.log(scoreCheck);

        if (scoreCheck.includes(false)) {
            // setErrorOfScore("Score is not 100.00");
            responseMessage("warning", "Score is not 100.00.");

            return;
        }
        await postCausalList(sendData, ()=>getCausalDetails(dependentProjectName.id));
    };

    console.log(causalList);
    // console.log(projects);
    console.log({ dependentProjectName, independentProjectName });

    return (
        <div className="container">
            <Modal
                scrollable
                dialogClassName="modelWidth"
                centered
                show={status}
                onHide={hideMethod}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Create Correlation
                    </Modal.Title>
                    {/* <Modal.Title id="example-custom-modal-styling-title"></Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body">
                        <div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="main-div-project">
                                        <h3 className="main-project-name">
                                            Select Dependent Capability
                                        </h3>
                                        <select
                                            className="main-project-nameselect"
                                            onChange={handleChangeProject}
                                        >
                                            <option selected>
                                                Select Project
                                            </option>
                                            {projectOptions}
                                        </select>
                                        <div className="p-name-div">
                                            <h4 className="sub-head">
                                                Function,Phase,Capability
                                            </h4>
                                            {Object.keys(processLevel)
                                                .length === 0 && (
                                                <h4 className="d-flex justify-content-center">
                                                    Select Dependent Project
                                                </h4>
                                            )}
                                            {Object.keys(processLevel).length >
                                            0
                                                ? functions.map(
                                                      (func, index) => {
                                                          return phases.map(
                                                              (phs) => {
                                                                  return (
                                                                      <div
                                                                          className="sub-head-alabel sortable "
                                                                          key={
                                                                              phs?.DecompositionPhaseProjectID
                                                                          }
                                                                      >
                                                                          <h5 className="sub-sub-head bg-success">
                                                                              {`${func?.FunctionName} , ${phs?.PhaseName}`}
                                                                          </h5>

                                                                          {processLevel[
                                                                              `function${func.DecompositionFunctionProjectID}`
                                                                          ][
                                                                              `phase${phs?.DecompositionPhaseProjectID}`
                                                                          ]?.map(
                                                                              (
                                                                                  prcss
                                                                              ) => {
                                                                                  return (
                                                                                      <ProcessHOC
                                                                                          key={
                                                                                              prcss.DecompositionProcessLevel1ID
                                                                                          }
                                                                                          draggable
                                                                                          id={
                                                                                              prcss.DecompositionProcessLevel1ID
                                                                                          }
                                                                                          name={
                                                                                              prcss?.ProcessLevel1Name
                                                                                          }
                                                                                      />
                                                                                  );
                                                                              }
                                                                          )}
                                                                      </div>
                                                                  );
                                                              }
                                                          );
                                                      }
                                                  )
                                                : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="main-div-project">
                                        <h3 className="main-project-name">
                                            Select Independent Capability
                                        </h3>
                                        <select
                                            className="main-project-nameselect"
                                            onChange={handleChangeProjectTwo}
                                        >
                                            <option selected>
                                                Select Project
                                            </option>
                                            {projectOptions}
                                        </select>
                                        <div className="p-name-div">
                                            <h4 className="sub-head">
                                                Function,Phase,Capability
                                            </h4>
                                            {Object.keys(processLevelTwo)
                                                .length === 0 && (
                                                <h4 className="d-flex justify-content-center">
                                                    Select Independent Project
                                                </h4>
                                            )}
                                            {Object.keys(processLevelTwo)
                                                .length > 0
                                                ? functionsTwo.map(
                                                      (func, index) => {
                                                          return phasesTwo.map(
                                                              (phs) => {
                                                                  return (
                                                                      <div
                                                                          className="sub-head-alabel sortable"
                                                                          key={
                                                                              phs?.DecompositionPhaseProjectID
                                                                          }
                                                                      >
                                                                          <h5 className="sub-sub-head">
                                                                              {`${func?.FunctionName} , ${phs?.PhaseName}`}
                                                                          </h5>

                                                                          {processLevelTwo[
                                                                              `function${func.DecompositionFunctionProjectID}`
                                                                          ][
                                                                              `phase${phs?.DecompositionPhaseProjectID}`
                                                                          ]?.map(
                                                                              (
                                                                                  prcss
                                                                              ) => {
                                                                                  return (
                                                                                      <ProcessIndepHOC
                                                                                          key={
                                                                                              prcss.DecompositionProcessLevel1ID
                                                                                          }
                                                                                          draggable
                                                                                          id={
                                                                                              prcss.DecompositionProcessLevel1ID
                                                                                          }
                                                                                          name={
                                                                                              prcss?.ProcessLevel1Name
                                                                                          }
                                                                                      />
                                                                                  );
                                                                              }
                                                                          )}
                                                                      </div>
                                                                  );
                                                              }
                                                          );
                                                      }
                                                  )
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="row  justify-content-md-center"
                                style={{ marginTop: "-200px" }}
                            >
                                <div className="col-md-6">
                                    <div className="main-div-project">
                                        <h3 className="main-project-name">
                                            &nbsp;
                                        </h3>

                                        <h3
                                            className="main-project-name"
                                            style={{ marginBottom: "15px" }}
                                        >
                                            Causal
                                        </h3>

                                        <h3 className="sub-head text-left pr-2">
                                            Dependency{" "}
                                            <a
                                                href="#"
                                                onClick={addDependencyHandle}
                                                className="flo-depen-link btn btn-sm btn-outline-primary bg-white text-dark "
                                            >
                                                Add Dependency
                                            </a>
                                        </h3>

                                        {/* CAUSAL BOX START**** */}

                                        {causalList?.length > 0 ? (
                                            causalList?.map((causal, index) => {
                                                return (
                                                    <DropHoc
                                                        key={index}
                                                        dropId={
                                                            causal.DecompositionProcessLevel1ID
                                                        }
                                                        causalList={causalList}
                                                        setcausalList={
                                                            setcausalList
                                                        }
                                                        independentDroopList={
                                                            causal.IndependentProcess
                                                        }
                                                        index={index}
                                                        causal={causal}
                                                    />
                                                );
                                            })
                                        ) : (
                                            <div className="d-flex justify-content-center">
                                                <h5>Add Dependency!</h5>
                                            </div>
                                        )}

                                        {/* CAUSAL BOX END The**** */}
                                    </div>
                                    {errorOfScore && (
                                        <h3 className="text-danger">
                                            {errorOfScore}
                                        </h3>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={hideMethod}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

// export default DragDropContext(ProcessModel);
export default ProcessModel;
