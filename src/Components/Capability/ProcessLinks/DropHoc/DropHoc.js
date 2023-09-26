import React, { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDrop, useDrag } from "react-dnd";
import { responseMessage } from "../../../../utils/alert";
import {
    deleteCausal,
    deleteIndependentCausal,
    getCausalDetails,
} from "../action";

const DropHoc = ({
    dropId,
    causalList,
    setcausalList,
    independentDroopList,
    causal,
}) => {
    // DRAG METHOD FOR DEPENDENT *********

    const [{ isOver }, dropRef] = useDrop({
        accept: "dependent",
        drop: (item) => {
            console.log("this is drop Hoc", item, dropId);
            let deppp = causalList?.map((dependList) => {
                if (dependList.DecompositionProcessLevel1ID === dropId) {
                    return { ...dependList, ...item };
                }
                return dependList;
            });

            setcausalList(deppp);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    // DRAG METHOD FOR INDEPENDENT *********
    const [{ isOverIn }, dropRefIn] = useDrop({
        accept: "independent",
        drop: (item) => {
            console.log("this is drop Hoc inddd", item, dropId);

            const dropp = causalList?.map((independ) => {
                if (independ.DecompositionProcessLevel1ID === dropId) {
                    return {
                        ...independ,
                        IndependentProcess: independentDroopList?.find(
                            (proc) =>
                                proc.IndependentDecompositionProcessLevel1ID ===
                                item.IndependentDecompositionProcessLevel1ID
                        )
                            ? independ.IndependentProcess
                            : [item, ...independ.IndependentProcess],
                    };
                } else {
                    return independ;
                }
            });

            setcausalList(dropp);
        },
        collect: (monitor) => ({
            isOverIn: monitor.isOver(),
        }),
    });

    // DROP DEPENDENT PROCESS LIST *********
    const dependentLists = () => {
        return (
            <>
                <p className="capability-list dep-cap">
                    {causal?.DependentProcessLevelName}
                </p>

                {/* <i
                    onClick={() =>
                        handleDeleteCausal(
                            "dependent",
                            causal.DecompositionProcessLevel1ID
                        )
                    }
                    className="fas fa-trash-alt trash-main-inner"
                    aria-hidden="true"
                ></i> */}
            </>
        );
    };

    // DROP INDEPENDENT PROCESS LIST AND INPUT*********

    const handleValueChange = (event, id) => {
        console.log(causal.DecompositionProcessLevel1ID);

        let update = causalList.reduce((acc, curr) => {
            console.log("sbse phle", acc);

            if (
                curr.DecompositionProcessLevel1ID ==
                causal.DecompositionProcessLevel1ID
            ) {
                console.log("fist if condition", acc);
                return [
                    ...acc,
                    {
                        ...curr,
                        IndependentProcess: curr.IndependentProcess.map(
                            (item) => {
                                if (
                                    item.IndependentDecompositionProcessLevel1ID ===
                                    id
                                ) {
                                    console.log("map in ");
                                    return {
                                        ...item,
                                        Value: event.target.value,
                                    };
                                } else return item;
                            }
                        ),
                    },
                ];
            } else return [...acc, curr];
        }, []);

        console.log(update);

        setcausalList(update);
    };

    const independentLists = () => {
        return independentDroopList?.map((item) => (
            <>
                <div
                    className="row align-items-center"
                    key={item.IndependentDecompositionProcessLevel1ID}
                >
                    <div className="col-8">
                        <p
                            className="capability-list dep-cap"
                            key={item?.DecompositionProcessLevel1ID}
                        >
                            {item?.IndependenProcessName}
                        </p>
                    </div>

                    <div className="col-3 p-0">
                        <input
                            type="text"
                            class="form-control mb-2"
                            id="inlineFormInput"
                            onChange={(e) =>
                                handleValueChange(
                                    e,
                                    item.IndependentDecompositionProcessLevel1ID
                                )
                            }
                            value={item?.Value ? item?.Value : ""}
                            placeholder="Value"
                        />
                    </div>

                    <div className="col-1 p-0">
                        <i
                            onClick={() =>
                                handleDeleteCausal(
                                    causal.DecompositionProjectID,
                                    item.IndependentDecompositionProcessLevel1ID,
                                    causal.DependentMasterId,
                                    causal.DecompositionProcessLevel1ID
                                )
                            }
                            className="fas fa-trash-alt trash-main-inner"
                            aria-hidden="true"
                        ></i>
                    </div>
                </div>
            </>
        ));
    };

    // DELETE THE PROCESS FORM CAUSAL *******
    const handleDeleteCausal = async (
        projectId,
        processLID,
        masterId,
        dependendId
    ) => {
        console.log({ projectId, processLID, masterId, dependendId });

        confirmAlert({
            title: "Confirm to continue",
            message: "Are you sure to delete this independent Process ?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        if (!masterId) {
                            const filterList = causalList.map((item) => {
                                if (
                                    item.DecompositionProcessLevel1ID ===
                                    dependendId
                                ) {
                                    return {
                                        ...item,
                                        IndependentProcess:
                                            item.IndependentProcess?.filter(
                                                (pro) => {
                                                    return (
                                                        pro?.IndependentDecompositionProcessLevel1ID !=
                                                        processLID
                                                    );
                                                }
                                            ),
                                    };
                                }
                                return item;
                            });
                            console.log(filterList);
                            setcausalList(filterList);
                        } else {
                            const data = await deleteIndependentCausal(
                                projectId,
                                processLID,
                                masterId
                            );

                            console.log(data);

                            if (data?.data?.Success) {
                                responseMessage(
                                    "success",
                                    "Dependent Master deleted successfully."
                                );
                            }

                            let resData = await getCausalDetails(0);

                            setcausalList(resData);
                        }
                    },
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
        });
    };

    // REMOVE THE CAUSAL METHOD *****
    const handleRemoveCausal = async (projectId, processLID, masterId) => {
        // console.log({ projectId, processLID, masterId, removed });

        confirmAlert({
            title: "Confirm to continue",
            message: "Are you sure to delete this Causal ?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        if (!masterId) {
                            let removed = causalList.filter(
                                (item) =>
                                    item.DecompositionProcessLevel1ID !==
                                    processLID
                            );
                            setcausalList(removed);
                        } else {
                            let data = await deleteCausal(
                                projectId,
                                processLID,
                                masterId
                            );
                            if (data?.data?.Success) {
                                responseMessage(
                                    "success",
                                    "Dependent Master deleted successfully."
                                );
                            }

                            let resData = await getCausalDetails(0);

                            setcausalList(resData);
                        }
                    },
                },
                {
                    label: "No",
                    onClick: () => {},
                },
            ],
        });
    };

    return (
        <div>
            <div className="box-dependency shadow-lg">
                {/* <h5 className="text-center bg-warning p-1">{causal?.CausalName}</h5> */}
                <div className="de-indecapa">
                    <h5>
                        Dependent Capability
                        <i
                            onClick={() =>
                                handleRemoveCausal(
                                    causal.DecompositionProjectID,
                                    causal.DecompositionProcessLevel1ID,
                                    causal.DependentMasterId
                                )
                            }
                            className="fas fa-trash-alt trash-main"
                            aria-hidden="true"
                        ></i>
                    </h5>
                    <div
                        ref={dropRef}
                        style={{
                            minHeight: "70px",
                        }}
                        className="p-2"
                    >
                        {isOver && (
                            <div className="d-flex justify-content-center">
                                <h3>Drop Dependent Here!</h3>
                            </div>
                        )}
                        {/* {dependentLists()} */}
                        {causal.DependentProcessLevelName ? (
                            dependentLists()
                        ) : (
                            <div className="d-flex justify-content-center">
                                <h5>Drag and Drop Dependent Here!</h5>
                            </div>
                        )}
                    </div>
                </div>
                <div className="de-indecapa">
                    <h5>
                        Independent Capabilities
                        {/* <a href="#">+ Add</a> */}
                    </h5>
                    <div
                        style={{
                            minHeight: "70px",
                        }}
                        className="ind-capadd p-2"
                        ref={dropRefIn}
                    >
                        {isOverIn && (
                            <div className="d-flex justify-content-center">
                                <h3>Drop Independent Here!</h3>
                            </div>
                        )}

                        {independentDroopList?.length > 0 ? (
                            independentLists()
                        ) : (
                            <div className="d-flex justify-content-center">
                                <h5>Drag and Drop Inependent Here!</h5>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DropHoc;
