import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import config from "../../../config";
import CacheStorage from "../../../utils/CacheStorage";
import "./quntitiveModel.css";

const QuntitveQustoinModel = ({
    status,
    quntitiveModelShow,
    projectName,
    projectId,
}) => {
    const [data, setData] = useState({
        quesOne: 0.00,
        quesTwo: 0.00,
    });

    useEffect(() => {
      setData({
        quesOne: 0.00,
        quesTwo: 0.00,
    })
    }, [projectName])
    

    const handleChange = async (e, quesType) => {
        let value = e.target.value;

        let res = await Axios.get(
            `${config.laravelBaseUrl}getQuantitativeQuestionsScore/${quesType}/${value}`,
            {
                headers: {
                    authorization:
                        "Bearer " + CacheStorage.getItem("userToken"),
                },
            }
        );

        if (res.status === 200) {
            setData({
                ...data,
                [quesType == 1 ? "quesOne" : "quesTwo"]: res.data.data.SCORE,
            });
        }
    };

    return (
        <div>
            <Modal
                scrollable
                dialogClassName="modelWidth"
                centered
                show={status}
                onHide={quntitiveModelShow}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg"></Modal.Title>
                    <Modal.Title id="example-custom-modal-styling-title"></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body">
                        <div className="d-flex justify-content-between ">
                            <div>
                                <h4 className="mb-4">{projectName}</h4>
                            </div>
                        </div>
                        <div>
                            <table className="w-100 ques-anstable">
                                <thead>
                                    <tr>
                                        <th
                                            className="question-td"
                                            style={{ width: "70%" }}
                                        >
                                            <h2 className="m-0 text-white">
                                                Question{" "}
                                            </h2>
                                        </th>
                                        <th
                                            className="score-td"
                                            tyle={{ width: "30%" }}
                                        >
                                            <h2 className="m-0 text-white">
                                                Scores
                                            </h2>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="bord-rightwhite light-red-bg">
                                            <div className="text-left ">
                                                <h3 className="ques-text">
                                                    <span className="q-label">
                                                        Q.{" "}
                                                    </span>
                                                    What is estimated market
                                                    size for your products and
                                                    service for the current?
                                                </h3>
                                                <div className="ans-radio-div">
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="group1"
                                                            value="100_Cr"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e,
                                                                    1
                                                                )
                                                            }
                                                        />
                                                        Upto 100 Cr
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="group1"
                                                            value="100Cr_To_125_Cr"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e,
                                                                    1
                                                                )
                                                            }
                                                        />
                                                        100 Cr To 125 Cr
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="group1"
                                                            value="125_Cr_To_150_Cr"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e,
                                                                    1
                                                                )
                                                            }
                                                        />
                                                        125 Cr To 150 Cr
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="group1"
                                                            value="150_Cr To_200_Cr"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e,
                                                                    1
                                                                )
                                                            }
                                                        />
                                                        150 Cr To 200 Cr
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="group1"
                                                            value="200_Cr_To_300_Cr"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e,
                                                                    1
                                                                )
                                                            }
                                                        />
                                                        200 Cr To 300 Cr
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="group1"
                                                            value="300_Cr_To_350_Cr"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e,
                                                                    1
                                                                )
                                                            }
                                                        />
                                                        300 Cr To 350 Cr
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="group1"
                                                            value="Above_350_Cr"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e,
                                                                    1
                                                                )
                                                            }
                                                        />
                                                        Above 350 Cr
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="score-valuetd score-valuetd-div">
                                            <div className="scoreno">
                                                {data.quesOne}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="bord-rightwhite light-red-bg">
                                            <div className="text-left ">
                                                <h3 className="ques-text">
                                                    <span className="q-label">
                                                        Q.{" "}
                                                    </span>
                                                    What is your annual
                                                    expense/burn rate?
                                                </h3>
                                                <div className="ans-radio-div">
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="group2"
                                                            value="Above_100_Cr"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e,
                                                                    2
                                                                )
                                                            }
                                                        />
                                                        Above 100 Cr
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="group2"
                                                            value="80_Cr_To_90_Cr"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e,
                                                                    2
                                                                )
                                                            }
                                                        />
                                                        80 Cr To 90 Cr
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="group2"
                                                            value="70_Cr_To_800_Cr"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e,
                                                                    2
                                                                )
                                                            }
                                                        />
                                                        70 Cr To 800 Cr
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="group2"
                                                            value="60_Cr_To_70_Cr"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e,
                                                                    2
                                                                )
                                                            }
                                                        />
                                                        60 Cr To 70 Cr
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="group2"
                                                            value="40_Cr_To_60_Cr"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e,
                                                                    2
                                                                )
                                                            }
                                                        />
                                                        40 Cr To 60 Cr
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="group2"
                                                            value="30_Cr_To_40_Cr"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e,
                                                                    2
                                                                )
                                                            }
                                                        />
                                                        30 Cr To 40 Cr
                                                    </label>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name="group2"
                                                            value="Below_25_Cr"
                                                            onChange={(e) =>
                                                                handleChange(
                                                                    e,
                                                                    2
                                                                )
                                                            }
                                                        />
                                                        Below 25 Cr
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="score-valuetd score-valuetd-div">
                                            <div className="scoreno">
                                                {data.quesTwo}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={quntitiveModelShow}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={quntitiveModelShow}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default QuntitveQustoinModel;
