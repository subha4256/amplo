import React, {
    useReducer,
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";
import { connect } from "react-redux";
import ContentEditable from "react-contenteditable";
import { saveSwot, fetchSwot, castVote ,fetchSwotIdeas } from "../../actions/ideateActions";
import { Global } from "../../utils/Env";
import { responseMessage } from "../../utils/alert";
import axios from "axios";
import config from "../../config";

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_STRENGTH":
            return {
                ...state,
                strength: action.payload,
            };
        case "UPDATE_WEAKNESS":
            return {
                ...state,
                weakness: action.payload,
            };
        case "UPDATE_OPPORTUNITIES":
            return {
                ...state,
                opportunities: action.payload,
            };
        case "UPDATE_THREATS":
            return {
                ...state,
                threats: action.payload,
            };
        default:
            return state;
    }
};

const IdeaAnalysis = forwardRef((props, ref) => {
    Global.callback.saveSwot_onComplete = () => {
        props.fetchSwot(props.selectedIdea.DtIdeateSessionIdeaId);
    };

    const [{ strength, weakness, opportunities, threats }, dispatch] =
        useReducer(reducer, {
            strength: [],
            weakness: [],
            opportunities: [],
            threats: [],
        });

    const [fetchedSwot, setFetchedSwot] = useState([]);
    const [fetchedIdeas, setFetchedIdeas] = useState([]);

    useEffect(() => {
        if (props.swot != fetchedSwot) {
            setFetchedSwot(props.swot);
            if (
                !Array.isArray(props.swot) &&
                Object.keys(props.swot).length > 0
            ) {
                if (props.swot.Swot) {
                    const { Swot } = props.swot;
                    const strengthInd = Swot.map((swot) => swot.Type).indexOf(
                        "Strength"
                    );
                    const weaknessInd = Swot.map((swot) => swot.Type).indexOf(
                        "Weakness"
                    );
                    const opportunityInd = Swot.map(
                        (swot) => swot.Type
                    ).indexOf("Opportunities");
                    const threatInd = Swot.map((swot) => swot.Type).indexOf(
                        "Threats"
                    );
                    dispatch({
                        type: "UPDATE_STRENGTH",
                        payload:
                            strengthInd != -1
                                ? Swot[strengthInd].Notes
                                    ? Swot[strengthInd].Notes
                                    : []
                                : [],
                    });
                    dispatch({
                        type: "UPDATE_WEAKNESS",
                        payload:
                            weaknessInd != -1
                                ? Swot[weaknessInd].Notes
                                    ? Swot[weaknessInd].Notes
                                    : []
                                : [],
                    });
                    dispatch({
                        type: "UPDATE_OPPORTUNITIES",
                        payload:
                            opportunityInd != -1
                                ? Swot[opportunityInd].Notes
                                    ? Swot[opportunityInd].Notes
                                    : []
                                : [],
                    });
                    dispatch({
                        type: "UPDATE_THREATS",
                        payload:
                            threatInd != -1
                                ? Swot[threatInd].Notes
                                    ? Swot[threatInd].Notes
                                    : []
                                : [],
                    });
                }
            } else {
                dispatch({
                    type: "UPDATE_STRENGTH",
                    payload: [],
                });
                dispatch({
                    type: "UPDATE_WEAKNESS",
                    payload: [],
                });
                dispatch({
                    type: "UPDATE_OPPORTUNITIES",
                    payload: [],
                });
                dispatch({
                    type: "UPDATE_THREATS",
                    payload: [],
                });
            }
        }
        if (props.ideas != fetchedIdeas) {
            setFetchedIdeas(props.ideas);
            if (props.ideas.length <= 0) {
                dispatch({
                    type: "UPDATE_STRENGTH",
                    payload: [],
                });
                dispatch({
                    type: "UPDATE_WEAKNESS",
                    payload: [],
                });
                dispatch({
                    type: "UPDATE_OPPORTUNITIES",
                    payload: [],
                });
                dispatch({
                    type: "UPDATE_THREATS",
                    payload: [],
                });
            }
        }
    }, [props]);

    useImperativeHandle(ref, () => ({
        saveSwot(idea) {
            let saveObj = {
                IdeateIdeaId: idea.DtIdeateSessionIdeaId,
                Swot: [
                    {
                        Type: "Strength",
                        Notes: strength,
                    },
                    {
                        Type: "Weakness",
                        Notes: weakness,
                    },
                    {
                        Type: "Opportunities",
                        Notes: opportunities,
                    },
                    {
                        Type: "Threats",
                        Notes: threats,
                    },
                ],
                IsActive: 1,
            };
            props.saveSwot(saveObj);
        },
    }));

    const editStrength = (e, ind) => {
        let strengths = [...strength];
        strengths[ind].Note = e.currentTarget.textContent;
        dispatch({
            type: "UPDATE_STRENGTH",
            payload: strengths,
        });
    };

    const editWeakness = (e, ind) => {
        let weaknesses = [...weakness];
        weaknesses[ind].Note = e.currentTarget.textContent;
        dispatch({
            type: "UPDATE_WEAKNESS",
            payload: weaknesses,
        });
    };

    const editOpportunity = (e, ind) => {
        let opportunitiess = [...opportunities];
        opportunitiess[ind].Note = e.currentTarget.textContent;
        dispatch({
            type: "UPDATE_OPPORTUNITIES",
            payload: opportunitiess,
        });
    };

    const editThreat = (e, ind) => {
        let threatss = [...threats];
        threatss[ind].Note = e.currentTarget.textContent;
        dispatch({
            type: "UPDATE_THREATS",
            payload: threatss,
        });
    };

    const addStrength = () => {
        if (fetchedIdeas.length > 0) {
            let strengths = [
                ...strength,
                {
                    IdeaSwotId: 0,
                    Note: "Click here to edit strength",
                },
            ];
            dispatch({
                type: "UPDATE_STRENGTH",
                payload: strengths,
            });
        }
    };

    const addWeakness = () => {
        if (fetchedIdeas.length > 0) {
            let weaknesses = [
                ...weakness,
                {
                    IdeaSwotId: 0,
                    Note: "Click here to edit weakness",
                },
            ];
            dispatch({
                type: "UPDATE_WEAKNESS",
                payload: weaknesses,
            });
        }
    };

    const addOpportunity = () => {
        if (fetchedIdeas.length > 0) {
            let opportunitiess = [
                ...opportunities,
                {
                    IdeaSwotId: 0,
                    Note: "Click here to edit opportunity",
                },
            ];
            dispatch({
                type: "UPDATE_OPPORTUNITIES",
                payload: opportunitiess,
            });
        }
    };

    const addThreat = () => {
        if (fetchedIdeas.length > 0) {
            let threatss = [
                ...threats,
                {
                    IdeaSwotId: 0,
                    Note: "Click here to edit threat",
                },
            ];
            dispatch({
                type: "UPDATE_THREATS",
                payload: threatss,
            });
        }
    };

    const handleDislikeVote = (e) => {
        e.preventDefault();
        const data = {
            IdeaId: props.selectedIdea.DtIdeateSessionIdeaId,
        };

        axios
            .post(config.laravelBaseUrl + "uspCastVoteOut", data, {
                headers: {
                    authorization:
                        "Bearer " + sessionStorage.getItem("userToken"),
                },
            })
            .then((res) => {
                if (res.data.success) {
                    responseMessage("success", res.data.message, "");

                    props.fetchSwotIdeas(props.selectedSubEpic);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    console.log(props)

    return (
        <div className="row generate-ideas-row">
            <div className="col-sm-12 col-md-12">
                <div className="card idealeft ideascard mt-2">
                    <div className="card-header d-flex align-items-center">
                        <h3>SWOT Analysis</h3>
                    </div>
                    <div className="card-body p-0">
                        <div className="swot-row px-3 py-3 d-md-flex justify-content-between align-items-center">
                            <div>
                                <h3>
                                    {props.selectedIdea.IdeaTitle
                                        ? props.selectedIdea.IdeaTitle
                                        : ""}
                                </h3>
                            </div>
                            {props.votingEnabled ? (
                                <>
                                    <div className="">
                                        <ul className="list-inline vote-client mb-0">
                                            {props.voters.map((voter, i) => {
                                                return (
                                                    <li
                                                        className="list-inline-item"
                                                        key={"voter_" + i}
                                                        title={
                                                            voter.Emails
                                                        }
                                                    >
                                                        <a href="#">
                                                            <img
                                                                src={require("../../common/images/login_image.png")}
                                                                alt={voter.Emails}
                                                            />
                                                            <i className="fas fa-thumbs-up"></i>
                                                        </a>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                    <div>
                                        <ul className="list-inline vote-list mb-0">
                                            <li className="list-inline-item">
                                                <strong className="text-danger">
                                                    {Object.keys(
                                                        props.selectedIdea
                                                    ).length > 0
                                                        ? props.selectedIdea
                                                              .NoOfVotes
                                                        : 0}{" "}
                                                    Votes
                                                </strong>
                                            </li>
                                            <li className="list-inline-item">
                                                <a
                                                    href="#"
                                                    className={
                                                        props.selectedIdea
                                                            .HasVoted == 1
                                                            ? "btn btn-vote"
                                                            : "btn btn-vote"
                                                    }
                                                    onClick={
                                                        props.selectedIdea
                                                            .HasVoted == 1
                                                            ? handleDislikeVote
                                                            : () =>
                                                                  props.castVote(
                                                                      {
                                                                          IdeateIdeaId:
                                                                              props
                                                                                  .selectedIdea
                                                                                  .DtIdeateSessionIdeaId,
                                                                      }
                                                                  )
                                                    }
                                                >
                                                    {props.selectedIdea
                                                        .HasVoted == 1
                                                        ? "Voteout"
                                                        : "Vote"}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            ) : null}
                        </div>
                        <div className="swot-content d-md-flex justify-content-between">
                            <div className="col-block bg-blue flex-fill px-3 py-4">
                                <h3 className="mt-4 mb-3">
                                    Strength{" "}
                                    <i
                                        className="fa fa-plus"
                                        aria-hidden="true"
                                        onClick={() => addStrength()}
                                    ></i>
                                </h3>
                                {strength.map((str, i) => {
                                    return (
                                        <ContentEditable
                                            html={str.Note}
                                            // disabled={str.IdeaSwotId > 0 ? true : false}
                                            onChange={(e) => editStrength(e, i)}
                                            tagName="p"
                                        />
                                    );
                                })}
                            </div>
                            <div className="col-block bg-orange flex-fill px-3 py-4">
                                <h3 className="mt-4 mb-3">
                                    Weakness{" "}
                                    <i
                                        className="fa fa-plus"
                                        aria-hidden="true"
                                        onClick={() => addWeakness()}
                                    ></i>
                                </h3>
                                {weakness.map((weak, i) => {
                                    return (
                                        <ContentEditable
                                            html={weak.Note}
                                            // disabled={weak.IdeaSwotId > 0 ? true : false}
                                            onChange={(e) => editWeakness(e, i)}
                                            tagName="p"
                                        />
                                    );
                                })}
                            </div>
                            <div className="col-block bg-green flex-fill px-3 py-4">
                                <h3 className="mt-4 mb-3">
                                    Opportunities{" "}
                                    <i
                                        className="fa fa-plus"
                                        aria-hidden="true"
                                        onClick={() => addOpportunity()}
                                    ></i>
                                </h3>
                                {opportunities.map((opr, i) => {
                                    return (
                                        <ContentEditable
                                            html={opr.Note}
                                            // disabled={opr.IdeaSwotId > 0 ? true : false}
                                            onChange={(e) =>
                                                editOpportunity(e, i)
                                            }
                                            tagName="p"
                                        />
                                    );
                                })}
                            </div>
                            <div className="col-block bg-red flex-fill px-3 py-4">
                                <h3 className="mt-4 mb-3">
                                    Threats{" "}
                                    <i
                                        className="fa fa-plus"
                                        aria-hidden="true"
                                        onClick={() => addThreat()}
                                    ></i>
                                </h3>
                                {threats.map((thr, i) => {
                                    return (
                                        <ContentEditable
                                            html={thr.Note}
                                            // disabled={thr.IdeaSwotId > 0 ? true : false}
                                            onChange={(e) => editThreat(e, i)}
                                            tagName="p"
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

const mapStateToProps = (state) => ({
    swot: state.ideate.swot,
    ideas: state.ideate.ideas,
    voters: state.ideate.voters,
});

export default connect(
    mapStateToProps,
    { saveSwot, fetchSwot, castVote, fetchSwotIdeas },
    null,
    { forwardRef: true }
)(IdeaAnalysis);
