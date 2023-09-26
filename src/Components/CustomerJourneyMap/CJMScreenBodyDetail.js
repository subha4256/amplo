import React, { Fragment, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import Graph from "./CJMGraph";

import green from "../../common/images/green-icon.png";
import red from "../../common/images/red-icon.png";
import yellow from "../../common/images/yellow-icon.png";

const config = require("../../config.js");
const showEmojiSection = (props, i) => props.showEmojiSection(i);
const handleComment = (e, props) => props.handleComment(e);
// const handleEmoji = (val,props) => props.handleEmoji(val);

const getEmotionsCount = (CategoryTextInfo) => {
    let emotionCount = 0;
    for (const [optionIndex, option] of CategoryTextInfo.entries()) {
        if (option.Emotion === 'positive') {
            emotionCount++;
        }
        if (option.Emotion === 'neutral') {
            emotionCount++;
        }
        if (option.Emotion === 'negative') {
            emotionCount++;
        }
    }
    return emotionCount;
};

const getEmotions = (CategoryTextInfo, i, j, activityIndex, deleteEmotion) => {
    let positive = [], neutral = [], negative = [];
    // let optionIndex = 0;
    const marginRight = "12px";
    const marginBottom = "7px";
    for (const [optionIndex, option] of CategoryTextInfo.entries()) {
        let optionText = option.title || option.ProcessName;
        if (option.Emotion === 'positive') {
            console.log('>> mushran 1', optionText)
            positive.push(<a href="javascript:void(0)" style={{fontSize: "8px", marginRight: marginRight, marginBottom: marginBottom, display: 'inline-block'}} data-toggle="tooltip" title={optionText}>
                <img src={require("../../common/images/green-icon.png")} alt="" />
                <i index={optionIndex} onClick={() => deleteEmotion({StagesIndex: i, SubStagesIndex: j, CategoriesIndex: activityIndex, CategoryTextIndex: optionIndex})} className="fas fa-minus" ></i>
            </a>);
        }
        if (option.Emotion === 'neutral') {
            neutral.push(<a href="javascript:void(0)" style={{fontSize: "8px", marginRight: marginRight, marginBottom: marginBottom, display: 'inline-block'}} data-toggle="tooltip"title={optionText}>
                <img src={require("../../common/images/yellow-icon.png")}alt="" />
                <i index={optionIndex} onClick={() => deleteEmotion({StagesIndex: i, SubStagesIndex: j, CategoriesIndex: activityIndex, CategoryTextIndex: optionIndex})} className="fas fa-minus" ></i>
            </a>);
        }
        if (option.Emotion === 'negative') {
            negative.push(<a href="javascript:void(0)" style={{fontSize: "8px", marginRight: marginRight, marginBottom: marginBottom, display: 'inline-block'}} data-toggle="tooltip"title={optionText}>
                <img src={require("../../common/images/red-icon.png")}alt="" />
                <i index={optionIndex} onClick={() => deleteEmotion({StagesIndex: i, SubStagesIndex: j, CategoriesIndex: activityIndex, CategoryTextIndex: optionIndex})} className="fas fa-minus" ></i>
            </a>);
        }
        // optionIndex++;
    }
    return <Fragment>
        <div style={{ width: '100%', minHeight: '83px' }}>
            {positive}
        </div>
        <div style={{ width: '100%', minHeight: '83px' }}>
            {neutral}
        </div>
        <div style={{ width: '100%', minHeight: '83px' }}>
            {negative}
        </div>
    </Fragment>;
};

const CJMScreenBodyDetail = props => {



console.log("All Props Page" , props)



    const { lifecycleData, data } = props;
    const [enableDraw, setEnableDraw] = useState(false);
    const [chartData, setChartData] = useState([]);
    const enableDrawLine = () => {
        const data1 = data
            .flatMap(d1 => d1.SubStages)
            .flatMap(d2 => d2.Categories)
            .filter(d3 => d3.CategoryName == "Feelings")
            .flatMap(d4 => d4.CategoryText)
            .map(d4 =>
                d4.Emotion == "positive" ? 10 : d4.Emotion == "negative" ? 0 : d4.Emotion == "neutral"? 5 : null
            ).filter(x => x !== null);
        // const Categories = Sub
        setChartData(data1);
        // const chartData = data.map((d1,i1) => {
        //     return ;
        // d1.SubStages.map((d2,i2) => {
        //     d2.Categories.map((d3,i3) => {
        //         if(d3.CategoryName == "Feelings"){
        //             return {asd:"abc"}
        //         }
        //     })
        // })
        // })
        setEnableDraw((draw)=> !draw);
    };

    console.log(chartData)

    const childRef = useRef();
    let emotionColorCode = '';
    let emotionEmoji = '';
    let FeelingsStageIndex = null;

    const disableDrawLine = () => {
        childRef.current.controlGraph(false);
    };
    const createMarkup = value => {
        return { __html: value };
    };
    const dragElement = (emotion, colorCode) => {
        emotionColorCode = colorCode;
        emotionEmoji = emotion;
    }
    const allowDrop = (e) => {
        e.preventDefault();
    }
    const dropEmotion = (e, subitem, activityIndex, i, j) => {
        e.preventDefault();
        // const jindex = e.target.getAttribute("data-jindex");
        // const iindex = e.target.getAttribute("data-iindex");
        // const actindex = e.target.getAttribute("data-actindex");
        // console.log('>> mushran dropEmotion 1', activityIndex, i, j);
        // console.log('>> mushran dropEmotion 3', e.target, e);
        // props.handleListValues(e.target, '', 0, actindex);
        // console.log('>> mushran subitem', subitem);
        props.currentSubStageHandler(subitem, i, j);
        setTimeout(() => {
            props.handleListValues(e.target, emotionEmoji, null, activityIndex);
        }, 50);
        setTimeout(() => {
            props.handleEmoji(emotionColorCode, emotionEmoji);
        }, 60);
        setTimeout(() => {
            props.handleCommentByDrop(emotionEmoji);
        }, 30);
        setTimeout(() => {
            props.handleSave();
        }, 100);
    }
    const deleteEmotion = (info) => {
        if (window.confirm('Are you sure that you want to delete this emotion?')) {
            props.deleteEmotion(info);
        }
    }

    return (
        <>
            <div
                className={`dt-content-wrapper ${
                    props.showClass ? "right-toggle" : ""
                }`}
            >
                <div className="content-wraper">
                    <div className="container-fluid">
                        <div className="row epic-version">
                            <div className="col-sm-12 col-md-12 col-lg-8 d-md-flex align-items-center pt-3">
                                <h2>Journey Maps</h2>
                                <select className="custom-select custom-select1 mr-1 ml-3" value={props.selectedEpicId} onChange={(e) => props.getEpic(e)}>
                                { 
                                    props.epicList?props.epicList.map((epic, epicIndex) =>  ( 
                                        <><option value={epic.DTEPICHeaderID}>{epic.Title}</option></>                                    
                                    )):null 
                                }
                                </select>
                                <select className="custom-select mr-3 ml-1" value={props.selectedPersona}  onChange={(e) => props.changeCjm(e.target.value)}>
                                {
                                    props.personaData?props.personaData.map(d => (
                                        <option value={d.PersonaId}>{d.PersonaName}</option>
                                    )):null
                                }
                                </select>

                                <a href="#" className="btn-download">
                                    <i className="fas fa-cloud-download-alt"></i>{" "}
                                    Download
                                </a>
                            </div>

                            <div className="col-sm-12 col-md-12 col-lg-4 pt-3 text-right">
                                <ul className="list-inline pager-list">
                                    <li className="list-inline-item">
                                        <Link
                                            to={`/empathydetail/${props.dtId}/${props.epicId}`}
                                        >
                                            Previous
                                        </Link>
                                    </li>
                                    |{" "}
                                    <li className="list-inline-item">
                                        <Link
                                            to={`/dt-network-of-experience/${props.dtId}/${props.epicId}`}
                                        >
                                             Next
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* linked persona*/}
                        <div className="bg-white epic-details-row mt-3 mb-4">
                            <div className="epic-col-wraper">
                                <div className="row mb-4">
                                    <div className="media d-flex align-items-center">
                                        <img
                                            className="mr-3"
                                            src={
                                                props.personaImage !== null &&
                                                props.personaImage !== ""
                                                    ? props.personaImage
                                                    : require("../../common/images/login_image.png")
                                            }
                                        />
                                        <div className="media-body">
                                            <h5 className="mt-0">
                                                {props.personaName}
                                            </h5>
                                            <p>{props.personaDesc}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row border-top">
                                    <div className="col-sm-12 col-md-2 bg-yellow align-items-center py-3">
                                        <h2>Goal</h2>
                                    </div>
                                    <div className="col-sm-12 col-md-10 align-items-center py-3">
                                        <p
                                            // style={{display: "inline-block"}}
                                            contenteditable="true"
                                            onClick={e => e.stopPropagation()}
                                            onBlur={event =>props.updateGoal(event.currentTarget.innerText)}
                                        >
                                            {props.mapGoal}
                                        </p>
                                    </div>
                                </div>
                                <div className="row border-top">
                                    <div className="col-sm-12 col-md-2 bg-green align-items-center py-3">
                                        <h2>Description</h2>
                                    </div>
                                    <div className="col-sm-12 col-md-10 align-items-center py-3 bg-gray">
                                        <p
                                            // style={{display: "inline-block"}}
                                            contenteditable="true"
                                            onClick={e => e.stopPropagation()}
                                            onBlur={event =>
                                                props.updateDesc(
                                                    event.currentTarget
                                                        .innerText
                                                )
                                            }
                                        >
                                            {props.mapDesc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border table-section mt-3 mb-4">
                            <div className="tbltitle">
                                <h2 className="d-flex align-items-center">
                                    <div className="dropdown version-drop">
                                        <a
                                            className="btn btn-drop dropdown-toggle px-0"
                                            data-toggle="dropdown"
                                        >
                                            1.1 Customer Journey Map 1
                                        </a>
                                        <div className="dropdown-menu">
                                            <div className="version-style">
                                                <p className="d-flex date-txt justify-content-between">
                                                    <span>Version 2.2 </span>{" "}
                                                    <span className="date">
                                                        06/03/20
                                                    </span>
                                                </p>
                                                <p className="d-flex revised-txt justify-content-between">
                                                    <span>
                                                        Revised by: Dave Denis
                                                    </span>{" "}
                                                    <span className="selected">
                                                        Selected
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="version-style">
                                                <p className="d-flex date-txt justify-content-between">
                                                    <span>Version 2.1 </span>{" "}
                                                    <span className="date">
                                                        06/03/20
                                                    </span>
                                                </p>
                                                <p className="d-flex revised-txt justify-content-between">
                                                    <span>
                                                        Revised by: James Denis
                                                    </span>{" "}
                                                </p>
                                            </div>
                                            <div className="version-style">
                                                <p className="d-flex date-txt justify-content-between">
                                                    <span>Version 1.1 </span>{" "}
                                                    <span className="date">
                                                        06/03/20
                                                    </span>
                                                </p>
                                                <p className="d-flex revised-txt justify-content-between">
                                                    <span>
                                                        Revised by: Steve
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="version-style text-center">
                                                <a href="#">Version History</a>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#" className="ml-3">
                                        <i className="fas fa-plus"></i> Add a
                                        version
                                    </a>
                                </h2>
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <a href="#"> Stakeholders</a>
                                    </li>
                                    |{" "} 
                                    <li className="list-inline-item">
                                        <a href="#">  Empathy Map </a>
                                    </li>
                                    |{" "} 
                                    <li className="list-inline-item">
                                        <a href="#">  Process Detail</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="table-responsive mt-4">
                                <table className="table table-bordered process-table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="tbltxt1">
                                                        Stages
                                                    </span>{" "}
                                                    <span>
                                                        <a
                                                            href="javascript:void(0)"
                                                            onClick={() =>
                                                                props.addStages()
                                                            }
                                                        >
                                                            <i className="fas fa-plus"></i>
                                                        </a>
                                                        <a
                                                            href="javascript:void(0)"
                                                            onClick={() =>
                                                                props.removeStages()
                                                            }
                                                            className="ml-1"
                                                        >
                                                            <i className="fas fa-minus"></i>
                                                        </a>
                                                    </span>
                                                </div>
                                            </th>
                                            {/* Stage name loop eg. Stage 1, Stage 2 ... */}
                                            {data.map((item, stgInd) => (
                                                <Fragment key={stgInd}>
                                                    <th
                                                        colSpan={item.SubStages ? item.SubStages.length : 0}
                                                        onClick={() =>props.selectStage(stgInd)}
                                                    >
                                                        <p
                                                            style={{display:"inline-block"}}
                                                            contenteditable="true"
                                                            onClick={e =>e.stopPropagation()}
                                                            onBlur={event =>props.updateStageName(event.currentTarget.innerText,stgInd)}
                                                        >
                                                            {item.StageName}
                                                        </p>
                                                    </th>
                                                </Fragment>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="substages">
                                            <td>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="tbltxt2">
                                                        Sub-Stages
                                                    </span>{" "}
                                                    <span>
                                                        <a
                                                            href="javascript:void(0)"
                                                            onClick={() =>
                                                                props.addSubStages()
                                                            }
                                                        >
                                                            <i className="fas fa-plus"></i>
                                                        </a>
                                                        <a
                                                            href="javascript:void(0)"
                                                            onClick={() =>
                                                                props.removeSubStages()
                                                            }
                                                            className="ml-1"
                                                        >
                                                            <i className="fas fa-minus"></i>
                                                        </a>
                                                    </span>
                                                </div>
                                            </td>
                                            {data.map((item, stgInd) => (
                                                <Fragment key={stgInd}>
                                                    {!item.SubStages || item.SubStages.length == 0 ? (
                                                        <td
                                                            style={{width: "250px"}}></td>
                                                    ) : (
                                                        item.SubStages.map((subitem,subStgInd) => (
                                                                <Fragment>
                                                                    <td
                                                                        style={{width:"250px"}}
                                                                        onClick={() =>props.selectSubstage(subStgInd,stgInd)}
                                                                    >
                                                                        <span className="tbltxt3">
                                                                            <span
                                                                                contenteditable="true"
                                                                                onBlur={event =>props.updateSubStageName(event.currentTarget.innerText,stgInd,subStgInd)}
                                                                                dangerouslySetInnerHTML={createMarkup(subitem.SubStageName)}
                                                                            />
                                                                        </span>
                                                                    </td>
                                                                </Fragment>
                                                            )
                                                        )
                                                    )}

                                                    {/* <td><span className="tbltxt3">{item.name}</span></td> */}
                                                </Fragment>
                                            ))}
                                        </tr>
                                        {/* Activities */}
                                        <tr>
                                            <td><span className="tbltxt4">Processes / Activities</span></td>
                                            {data.map((item, stgInd) => (
                                                <Fragment key={stgInd}>
                                                    {!item.SubStages || item.SubStages.length == 0 ? (<td style={{width: "250px"}}></td>
                                                    ) : (
                                                        item.SubStages.map((subitem,subStgInd) => (
                                                            <Fragment>
                                                                <td
                                                                    style={{width:"250px"}}
                                                                    onDragOver={e =>e.preventDefault()}
                                                                    onDrop={e =>props.dropActivities(e,stgInd,subStgInd)}
                                                                >
                                                                    <ol className="activitiesLists olsmtext">
                                                                        {subitem.Categories.map((activity,catInd) =>
                                                                            activity.CategoryName =="Activities" &&
                                                                            <>
                                                                            <a 
                                                                                href='javascript:void(0)' 
                                                                                style={{marginLeft: "-18px"}} 
                                                                                onClick={() => props.handleKeyPress(stgInd, subStgInd, catInd)} 
                                                                                    ><i className="fas fa-plus"></i></a>
                                                                            {
                                                                            activity.CategoryText.map((txt,catTxtInd) => (
                                                                                    <>
                                                                                    <li className="textAndColor">
                                                                                        <div contenteditable="true"
                                                                                        className="text-wrap" style={{"width": "6rem"}}
                                                                                            // onInput={e => console.log('Text inside div', e.currentTarget.textContent)}
                                                                                            // style={{display: "inline-block"}}
                                                                                            onKeyDown={(e) => props.removeLine(e,stgInd, subStgInd, catInd,txt.SequenceNumber)}
                                                                                            onBlur={event => props.updateActivities(event.target.innerHTML,stgInd,subStgInd,catInd,catTxtInd)}
                                                                                            dangerouslySetInnerHTML={createMarkup(txt.Text)}
                                                                                        />
                                                                                        {txt.ColorCode == "#94ce65" ? (
                                                                                            <span className="dot greendot"></span>
                                                                                        ) : txt.ColorCode == "#f6c851" ? (
                                                                                            <span className= "dot yellowdot"></span>
                                                                                        ) : txt.ColorCode == "#e75c53" ? (
                                                                                            <span className="dot reddot"></span>
                                                                                        ) : null}
                                                                                        </li>
                                                                                    </>
                                                                                )
                                                                            )
                                                                            }
                                                                            </>
                                                                        )}
                                                                    </ol>
                                                                </td>
                                                            </Fragment>
                                                            )
                                                        )
                                                    )}
                                                </Fragment>
                                            ))}
                                        </tr>
                                        {/* Touchpoints */}
                                        <tr className="bg-gray">
                                            <td>
                                                <span className="tbltxt4">
                                                    Touchpoints
                                                </span>
                                            </td>
                                            {data.map((item, stgInd) => (
                                                <Fragment key={stgInd}>
                                                    {!item.SubStages || item.SubStages.length ==0 ? (
                                                        <td style={{width: "250px"}}></td>
                                                    ) : (
                                                        item.SubStages.map((subitem,subStgInd) => (
                                                            <Fragment>
                                                                <td
                                                                    style={{width:"250px"}}
                                                                    // onDragOver={e =>e.preventDefault()}
                                                                    // onDrop={e =>props.dropTouchpoints(e,stgInd,subStgInd)}
                                                                >
                                                                    <ol className="touchpointsLists olsmtext">
                                                                        {subitem.Categories.map((activity,catInd) =>
                                                                            activity.CategoryName =="Touchpoints" &&
                                                                            <>
                                                                            <a 
                                                                                href='javascript:void(0)' 
                                                                                style={{marginLeft: "-18px"}} 
                                                                                onClick={() => props.handleKeyPress(stgInd, subStgInd, catInd)} 
                                                                                ><i className="fas fa-plus"></i></a>
                                                                            {
                                                                            activity.CategoryText.map((txt,catTxtInd) => (
                                                                                <div
                                                                                    contenteditable="true"
                                                                                    className="text-wrap" style={{"width": "6rem"}}
                                                                                    // onInput={e => console.log('Text inside div', e.currentTarget.textContent)}
                                                                                    // style={{display: "inline-block"}}
                                                                                    // onBlur={(event) => this.props.updateActivities(event.target.innerHTML,i, j, activityIndex)}
                                                                                    onKeyDown={(e) => props.removeLine(e,stgInd, subStgInd, catInd,txt.SequenceNumber)}
                                                                                    dangerouslySetInnerHTML={createMarkup(txt.Text)}
                                                                                    onBlur={event =>props.updateTouchpoints(event.target.innerHTML,stgInd,subStgInd,catInd,catTxtInd)}
                                                                                    // onKeyUp={e =>props.handleKeyPress(e,stgInd,subStgInd,catInd,catTxtInd)}
                                                                                />
                                                                            ))
                                                                            }
                                                                            </>
                                                                        )}

                                                                    </ol>
                                                                </td>
                                                            </Fragment>
                                                        ))
                                                    )}
                                                </Fragment>
                                            ))}
                                        </tr>
                                        {/* Feelings / Emotional */}
                                        <tr>
                                            <td>
                                                <span className="tbltxt4 d-block">
                                                    Feelings/Emotional
                                                    Experience
                                                </span>
                                                {/* <div className="d-flex align-items-center mt-3" draggable="true" onDragStart={() => dragElement('positive', "#94ce65")}> */}
                                                <div className="d-flex align-items-center mt-3">
                                                    <span className="mr-1">
                                                        <img
                                                            src={require("../../common/images/green-icon.png")}
                                                            alt=""
                                                        />
                                                    </span>
                                                    <span className="tbltxt6">
                                                        Positive
                                                    </span>
                                                </div>
                                                {/* <div className="d-flex align-items-center mt-3" draggable="true" onDragStart={() => dragElement('neutral', "#f6c851")}> */}
                                                <div className="d-flex align-items-center mt-3">
                                                    <span className="mr-1">
                                                        <img
                                                            src={require("../../common/images/yellow-icon.png")}
                                                            alt=""
                                                        />
                                                    </span>
                                                    <span className="tbltxt6">
                                                        Neutral
                                                    </span>
                                                </div>
                                                {/* <div className="d-flex align-items-center mt-3" draggable="true" onDragStart={() => dragElement('negative', "#e75c53")}> */}
                                                <div className="d-flex align-items-center mt-3">
                                                    <span className="mr-1">
                                                        <img src={require("../../common/images/red-icon.png")}alt=""/>
                                                    </span>
                                                    <span className="tbltxt6">
                                                        Negative
                                                    </span>
                                                </div>
                                                <span className="tbltxt6 mt-2 d-block">
                                                    Drag & drop the dots and add
                                                    comment
                                                </span>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary ml-3"
                                                    onClick={() =>
                                                        enableDrawLine()
                                                    }
                                                >
                                                   {enableDraw ? "Undraw" :"Draw Line"}
                                                </button>
                                                {/* <button type="button" className="btn btn-primary ml-3" onClick={() => disableDrawLine()}>Disable Draw Line</button> */}
                                            </td>
                                            {/* Here get the length of total substages to show the total no of colspan */}
                                            <td colSpan={props.TotalSubStages} className="p-0">
                                                <div className="position-relative">
                                                    <table className="table m-0" style={{height: "256px"}}>
                                                        <tr>
                                                            {data.map((item, i) => (
                                                                <Fragment key={i}>
                                                                    {!item.SubStages || item.SubStages.length == 0 ? null
                                                                        : item.SubStages.map((subitem,j) => (
                                                                            <Fragment>
                                                                                <td style={{width:"250px"}}>
                                                                                    {subitem.Categories.map((activity,activityIndex) => activity.CategoryName =="Feelings" && (
                                                                                    <>
                                                                                    <a 
                                                                                        href='javascript:void(0)' 
                                                                                        style={{marginLeft: "-5px"}} 
                                                                                        data-toggle="modal"data-target={"#emotionModal"} 
                                                                                        onClick={() => {
                                                                                            console.log('>> mushran', props.data)
                                                                                            props.currentSubStageHandler(subitem, i, j);
                                                                                            props.setCurrentActivityIndex(i, j, activityIndex);
                                                                                            setTimeout(() => {
                                                                                                props.setStageAndSubStage(item, subitem, j);
                                                                                            }, 100);
                                                                                        }}
                                                                                        ><i className="fas fa-plus"></i></a>
                                                                                    {(getEmotionsCount(activity.CategoryText) > 0) ? (
                                                                                        // <table style={{height:"254px",width:"100%"}} onDrop={(e) => dropEmotion(e, subitem, activityIndex, i, j)} onDragOver={(e) => allowDrop(e)}>
                                                                                        <table style={{height:"254px",width:"100%"}}>
                                                                                            <tr>
                                                                                                <td>
                                                                                                    {getEmotions(activity.CategoryText, i, j, activityIndex, deleteEmotion)}
                                                                                                    
                                                                                                {/* {activity.CategoryText.map((option, optionIndex) => (
                                                                                                        <> */}
                                                                                                        {/* <td
                                                                                                        style={{width:"40px"}}>*/}
                                                                                                            {/* {option.Emotion =="positive" ? (
                                                                                                                <div className="">
                                                                                                                    <a href="javascript:void(0)" style={{fontSize: "8px"}} data-toggle="tooltip" title={option.Comment}>
                                                                                                                        <img src={require("../../common/images/green-icon.png")} alt="" />
                                                                                                                        <i onClick={() => deleteEmotion({StagesIndex: i, SubStagesIndex: j, CategoriesIndex: activityIndex, CategoryTextIndex: optionIndex})} className="fas fa-minus" ></i>
                                                                                                                    </a>
                                                                                                                </div>
                                                                                                            ) : option.Emotion =="neutral" ? (
                                                                                                                <div className=""style={{marginTop:"101px"}}>
                                                                                                                    <a href="javascript:void(0)" style={{fontSize: "8px"}} data-toggle="tooltip"title={option.Comment}>
                                                                                                                        <img src={require("../../common/images/yellow-icon.png")}alt="" />
                                                                                                                        <i onClick={() => deleteEmotion({StagesIndex: i, SubStagesIndex: j, CategoriesIndex: activityIndex, CategoryTextIndex: optionIndex})} className="fas fa-minus" ></i>
                                                                                                                    </a>
                                                                                                                </div>
                                                                                                            ) : option.Emotion =="negative" ? (
                                                                                                                <div className=""style={{marginTop:"203px"}}>
                                                                                                                    <a href="javascript:void(0)" style={{fontSize: "8px"}} data-toggle="tooltip"title={option.Comment}>
                                                                                                                        <img src={require("../../common/images/red-icon.png")}alt="" />
                                                                                                                        <i onClick={() => deleteEmotion({StagesIndex: i, SubStagesIndex: j, CategoriesIndex: activityIndex, CategoryTextIndex: optionIndex})} className="fas fa-minus" ></i>
                                                                                                                    </a>
                                                                                                                </div>
                                                                                                            ) : null} */}
                                                                                                        {/* </td> */}
                                                                                                        {/* </>
                                                                                                    ))} */}
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    ) : (
                                                                                        // <div className="circle-container1" onDrop={(e) => dropEmotion(e, subitem, activityIndex, i, j)} onDragOver={(e) => allowDrop(e)}>
                                                                                        <div className="circle-container1">
                                                                                            <span>
                                                                                                <a href="#"data-toggle="modal"data-target={"#emotionModal"} onClick={() => {
                                                                                                    props.currentSubStageHandler(subitem, i, j);
                                                                                                    props.setCurrentActivityIndex(i, j, activityIndex);
                                                                                                    setTimeout(() => {
                                                                                                        props.setStageAndSubStage(item, subitem, j);
                                                                                                    }, 100);
                                                                                                }}>
                                                                                                    <i className="fas fa-plus"></i>
                                                                                                </a>
                                                                                            </span>
                                                                                        </div>
                                                                                    )}
                                                                                    </>
                                                                                ))}
                                                                                </td>
                                                                            </Fragment>
                                                                        ))
                                                                    }
                                                                </Fragment>
                                                            ))}
                                                        </tr>
                                                    </table>
                                                    {/* enableDraw */}
                                                    {enableDraw && (
                                                        <table
                                                            className="table-absolute"
                                                            style={{backgroundColor:"white"}}>
                                                            <tr>
                                                                <td className="p-0">
                                                                    <Graph ref={childRef}data={chartData}/>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                        {/* List the Experience */}
                                        <tr>
                                            <td>
                                                <span className="tbltxt6">List the Experiences</span>
                                            </td>
                                            {data.map((item, stgInd) => (
                                                <Fragment key={stgInd}>
                                                    {!item.SubStages || item.SubStages.length ==0 ? (
                                                        <td></td>
                                                    ) : (
                                                        item.SubStages.map((subitem,subStgInd) => (
                                                            <Fragment>
                                                                <td>
                                                                    <ol className="painpointsLists olsmtext">
                                                                        {subitem.Categories.map((activity,catInd) =>
                                                                            activity.CategoryName =="Experiences" &&
                                                                            <>
                                                                            <a 
                                                                                href='javascript:void(0)' 
                                                                                style={{marginLeft: "-18px"}} 
                                                                                onClick={() => props.handleKeyPress(stgInd, subStgInd, catInd)} 
                                                                                    ><i className="fas fa-plus"></i></a>
                                                                            {
                                                                            activity.CategoryText.map((txt,catTxtInd) => (
                                                                                <div
                                                                                    contenteditable="true"
                                                                                    className="text-wrap" style={{"width": "6rem"}}
                                                                                    // onInput={e => console.log('Text inside div', e.currentTarget.textContent)}
                                                                                    // style={{display: "inline-block"}}
                                                                                    // onBlur={(event) => this.props.updateActivities(event.target.innerHTML,i, j, activityIndex)}
                                                                                    onKeyDown={(e) => props.removeLine(e,stgInd, subStgInd, catInd,txt.SequenceNumber)}
                                                                                    dangerouslySetInnerHTML={createMarkup(txt.Text)}
                                                                                    onBlur={event =>props.updateExperience(event.target.innerHTML,stgInd,subStgInd,catInd,catTxtInd)}
                                                                                    // onKeyUp={e =>props.handleKeyPress(e,stgInd,subStgInd,catInd,catTxtInd)}
                                                                                />
                                                                            ))
                                                                            }
                                                                            </>
                                                                        )}
                                                                    </ol>
                                                                </td>
                                                            </Fragment>
                                                        ))
                                                    )}
                                                </Fragment>
                                            ))}
                                        </tr>
                                        {/* Raise Flag */}
                                        <tr>
                                            <td>
                                                <span className="tbltxt6">
                                                    Raise a Flag{" "}
                                                    <i className="fas fa-flag"></i>
                                                </span>
                                            </td>
                                            {data.map((item, stgInd) => (
                                                <Fragment key={stgInd}>
                                                    {!item.SubStages || item.SubStages.length ==
                                                    0 ? (
                                                        <td></td>
                                                    ) : (
                                                        item.SubStages.map(
                                                            (
                                                                subitem,
                                                                subStgInd
                                                            ) => (
                                                                <Fragment>
                                                                    <td>
                                                                        <span className="tbltxt6 d-flex">
                                                                            <i className="fas fa-flag mr-1"></i>
                                                                            <span
                                                                                contenteditable="true"
                                                                                // onInput={e => console.log('Text inside div', e.currentTarget.textContent)}
                                                                                style={{
                                                                                    display:
                                                                                        "inline-block"
                                                                                }}
                                                                                onBlur={event =>
                                                                                    props.updateRaiseFlag(
                                                                                        event
                                                                                            .target
                                                                                            .innerHTML,
                                                                                        stgInd,
                                                                                        subStgInd
                                                                                    )
                                                                                }
                                                                                dangerouslySetInnerHTML={createMarkup(
                                                                                    subitem.RaiseFlagText ==
                                                                                        ""
                                                                                        ? "Enter some Text"
                                                                                        : subitem.RaiseFlagText
                                                                                )}
                                                                            />
                                                                        </span>
                                                                    </td>
                                                                </Fragment>
                                                            )
                                                        )
                                                    )}
                                                </Fragment>
                                            ))}
                                        </tr>
                                        {/* StakeHolders / Impactor */}
                                        <tr>
                                            <td>
                                                <span className="tbltxt4">
                                                    Stakeholders
                                                </span>
                                                <span className="tbltxt5">
                                                    Impactor
                                                </span>
                                            </td>
                                            {data.map((item, stgInd) => (
                                                <Fragment key={stgInd}>
                                                    {!item.SubStages || item.SubStages.length ==0 ? (
                                                        <td className={item.commentCol? "active-commentCol": "d"}></td>
                                                    ) : (
                                                        item.SubStages.map((subitem,subStgInd) => (
                                                                <Fragment>
                                                                    <td
                                                                        // style={{display: "flex"}}
                                                                        className="h"
                                                                        onDragOver={e =>e.preventDefault()}
                                                                        onDrop={e =>props.dropStakeholderImpactor(e,stgInd,subStgInd)}
                                                                    >
                                                                        {subitem.Categories.map((user,catInd) =>
                                                                            user.CategoryName =="Impactor" && (
                                                                                <>
                                                                                    {user.CategoryText &&
                                                                                    user.CategoryText.map((img,catTxtInd) => (
                                                                                        // data-toggle="modal" data-target="#stakeholderModal"
                                                                                        <div
                                                                                            className="process-sm-img"
                                                                                            style={{display:"contents"}}
                                                                                        >
                                                                                            <img
                                                                                                className="mr-3 img-fluid"
                                                                                                // onClick={() => props.fetchDtNoiStkhldrDetail(img)}
                                                                                                onMouseDown={ (e) => props.removeLifecycleStakeholder(e,img.Id,stgInd,subStgInd,catInd,catTxtInd)} 
                                                                                                style={{height:"40px",width:"40px"}}
                                                                                                src={img.ImagePath !=null &&img.ImagePath !=""? config.ApiBaseUrl +"StakeHoldersImages/" +img.ImagePath: require("../../common/images/login_image.png")} alt="" />
                                                                                        </div>
                                                                                        )
                                                                                    )}
                                                                                </>
                                                                            )
                                                                        )}
                                                                    </td>
                                                                </Fragment>
                                                            )
                                                        )
                                                    )}
                                                </Fragment>
                                            ))}
                                        </tr>
                                        {/* Impactee */}
                                        <tr>
                                            <td><span className="tbltxt5">Impactee</span></td>
                                            {data.map((item, stgInd) => (
                                                <Fragment key={stgInd}>
                                                    {!item.SubStages || item.SubStages.length == 0 ? (
                                                        <td className={item.commentCol? "active-commentCol": ""}></td>
                                                    ) : (
                                                        item.SubStages.map(
                                                            (subitem, subStgInd) => (
                                                                <Fragment>
                                                                    <td
                                                                        // style={{display: "flex"}}
                                                                        className="h"
                                                                        onDragOver={e =>e.preventDefault()}
                                                                        onDrop={e =>props.dropStakeholderInimpactee(e,stgInd,subStgInd)}
                                                                    >
                                                                        {subitem.Categories.map((user,catInd) =>
                                                                                user.CategoryName =="Impactee" && (
                                                                                    <>
                                                                                        {user.CategoryText &&
                                                                                        user.CategoryText.map((img,catTxtInd) => (
                                                                                                    <div
                                                                                                        className="process-sm-img"
                                                                                                        style={{display:"contents"}}
                                                                                                    >
                                                                                                        <img
                                                                                                            className="mr-3 img-fluid"
                                                                                                            style={{height:"40px",width:"40px"}}
                                                                                                            onMouseDown={ (e) => props.removeLifecycleStakeholder(e,img.Id,stgInd,subStgInd,catInd,catTxtInd)}
                                                                                                            src={
                                                                                                                img.ImagePath !=
                                                                                                                    null &&
                                                                                                                img.ImagePath !=
                                                                                                                    ""
                                                                                                                    ? config.ApiBaseUrl +
                                                                                                                      "StakeHoldersImages/" +
                                                                                                                      img.ImagePath
                                                                                                                    : require("../../common/images/login_image.png")
                                                                                                            }
                                                                                                            alt=""
                                                                                                        />
                                                                                                    </div>
                                                                                                )
                                                                                            )}
                                                                                    </>
                                                                                )
                                                                        )}
                                                                    </td>
                                                                </Fragment>
                                                            )
                                                        )
                                                    )}
                                                </Fragment>
                                            ))}
                                            {/* <td>
                                        <div className="red-circle">
                                            <i className="far fa-file-image"></i>
                                        </div>
                                        </td>
                                        <td></td>
                                        <td>
                                        <div className="red-circle">
                                            <i className="far fa-file-image"></i>
                                        </div>

                                        </td>
                                        <td></td> */}
                                        </tr>
                                        {/* Painpoints */}
                                        <tr className="bg-gray">
                                            <td><span className="tbltxt4">Painpoints</span></td>
                                            {data.map((item, stgInd) => (
                                                <Fragment key={stgInd}>
                                                    {!item.SubStages || item.SubStages.length == 0 ? (
                                                        <td></td>
                                                    ) : (
                                                        item.SubStages.map((subitem,subStgInd) => (
                                                            <Fragment>
                                                                <td>
                                                                    <ol className="painpointsLists olsmtext">
                                                                        {subitem.Categories.map((activity,catInd) =>
                                                                            activity.CategoryName =="Painpoints" &&
                                                                            <>
                                                                            <a 
                                                                                href='javascript:void(0)' 
                                                                                style={{marginLeft: "-18px"}} 
                                                                                onClick={() => props.handleKeyPress(stgInd, subStgInd, catInd)} 
                                                                                    ><i className="fas fa-plus"></i></a>
                                                                            {
                                                                            activity.CategoryText.map((txt,catTxtInd) => (
                                                                                <div
                                                                                    contenteditable="true"
                                                                                    className="text-wrap" style={{"width": "6rem"}}
                                                                                    // onInput={e => console.log('Text inside div', e.currentTarget.textContent)}
                                                                                    // style={{display: "inline-block"}}
                                                                                    // onBlur={(event) => this.props.updateActivities(event.target.innerHTML,i, j, activityIndex)}
                                                                                    onKeyDown={(e) => props.removeLine(e,stgInd, subStgInd, catInd,txt.SequenceNumber)}
                                                                                    dangerouslySetInnerHTML={createMarkup(txt.Text)}
                                                                                    onBlur={event =>props.updatePainpoints(event.target.innerHTML,stgInd,subStgInd,catInd,catTxtInd)}
                                                                                    onKeyUp={e =>props.handleKeyPress(e,stgInd,subStgInd,catInd,catTxtInd)}
                                                                                />
                                                                            ))
                                                                            }
                                                                            </>
                                                                        )}
                                                                        
                                                                    </ol>
                                                                </td>
                                                            </Fragment>
                                                        ))
                                                    )}
                                                </Fragment>
                                            ))}
                                        </tr>
                                        {/* opportunity */}
                                        <tr>
                                            <td>
                                                <span className="tbltxt4">
                                                    Opportunities
                                                </span>
                                            </td>
                                            {data.map((item, stgInd) => (
                                                <Fragment key={stgInd}>
                                                    {!item.SubStages || item.SubStages.length == 0 ? (
                                                        <td></td>
                                                    ) : (
                                                        item.SubStages.map((subitem,subStgInd) => (
                                                                <Fragment>
                                                                    <td>
                                                                        <ol className="opportunityLists olsmtext">
                                                                            {subitem.Categories.map((activity,catInd) =>
                                                                                activity.CategoryName =="Opportunities" &&
                                                                                <>
                                                                                <a 
                                                                                    href='javascript:void(0)' 
                                                                                    style={{marginLeft: "-18px"}} 
                                                                                    onClick={() => props.handleKeyPress(stgInd, subStgInd, catInd)} 
                                                                                        ><i className="fas fa-plus"></i></a>
                                                                                {
                                                                                activity.CategoryText.map((txt,catTxtInd) => (
                                                                                    <div
                                                                                        contenteditable="true"
                                                                                        className="text-wrap" style={{"width": "6rem"}}
                                                                                        // onInput={e => console.log('Text inside div', e.currentTarget.textContent)}
                                                                                        // style={{display: "inline-block"}}
                                                                                        // onBlur={(event) => this.props.updateActivities(event.target.innerHTML,i, j, activityIndex)}
                                                                                        onKeyDown={(e) => props.removeLine(e,stgInd, subStgInd, catInd,txt.SequenceNumber)}
                                                                                        dangerouslySetInnerHTML={createMarkup(txt.Text)}
                                                                                        onBlur={event =>props.updateOpportunities(event.target.innerHTML,stgInd,subStgInd,catInd,catTxtInd)}
                                                                                        // onKeyUp={e =>props.handleKeyPress(e,stgInd,subStgInd,catInd,catTxtInd)}
                                                                                    />
                                                                                ))
                                                                                }
                                                                                </>
                                                                            )}
                                                                           
                                                                        </ol>
                                                                    </td>
                                                                </Fragment>
                                                            )
                                                        )
                                                    )}
                                                </Fragment>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal stakmodal emotionModal" id={"emotionModal"}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <a
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">
                                    <img
                                        src={require("../../common/images/close-icon.png")}
                                        alt=""
                                    />
                                </span>
                            </a>
                        </div>
                        <div className="modal-body pt-0">
                            <h5>Feelings / Emotional Experience</h5>
                            <div className="emotionfrm">
                            {
                                props.curretDataInPopup.length > 0 ?
                                <div className="accordion" id="accordionExample">
                                    <div className="card">
                                        {
                                            props.curretDataInPopup.length>0?props.curretDataInPopup.map((item,i) =>(
                                                <>
                                                <div className="card-header" id="headingOne">
                                                    <h2 className="mb-0">
                                                        <a 
                                                            className="btn btn-link" 
                                                            type="button" 
                                                            data-toggle="collapse" 
                                                            href={"#collapseOne"+i}
                                                            aria-expanded="true" 
                                                            aria-controls="collapseOne"
                                                        >
                                                            {i+1}
                                                        </a>
                                                    </h2>
                                                </div>

                                                <div 
                                                    id={"collapseOne"+i} 
                                                    className="collapse" 
                                                    aria-labelledby="headingOne" 
                                                    data-parent="#accordionExample"
                                                >
                                                    <div className="card-body">
                                                        <div className="addbox">
                                                            <div className="form-group">
                                                                <label>Stage/Process/Activity</label>
                                                                <div className="dropdown">
                                                                    <a href="" className="dropdown-toggle" data-toggle="dropdown">
                                                                        {item.title ?<span dangerouslySetInnerHTML={createMarkup(item.title)}/>: "Select"}
                                                                    </a>
                                                                    <ul className="dropdown-menu w-100">
                                                                        {Object.keys(props.currentSubStage).length>0 && props.currentSubStage.Categories.map((activity,catInd) =>
                                                                            activity.CategoryName =="Feelings" &&
                                                                            activity.CategoryText.map((option,catTextInd) => (
                                                                            <li
                                                                                className="dropdown-item"
                                                                                onClick={e =>props.handleListValues(option,option.Value,catTextInd,catInd)}
                                                                                dangerouslySetInnerHTML={createMarkup(option.Value)}
                                                                            />
                                                                            ))
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <textarea
                                                                    className="form-control"
                                                                    placeholder="Enter Comment"
                                                                    value={item.comment}
                                                                    ></textarea>
                                                                    {/* onChange={e => handleComment(e,props)} */}
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Emotion</label>
                                                                <div className="dropdown">
                                                                    <a href="" className="dropdown-toggle" data-toggle="dropdown">
                                                                        {item.emoji =="positive" ? (
                                                                            <p>
                                                                                <img src={require("../../common/images/green-icon.png")} alt="" />{" "}Positive{" "}
                                                                            </p>
                                                                        ) : item.emoji =="neutral" ? (
                                                                            <p>
                                                                                <img src={require("../../common/images/yellow-icon.png")}alt=""/>{" "}Neutral{" "}
                                                                            </p>
                                                                        ) : item.emoji =="negative" ? (
                                                                            <p>
                                                                                <img src={require("../../common/images/red-icon.png")}alt=""/>{" "}Negative{" "}
                                                                            </p>
                                                                        ) : (
                                                                            "Select"
                                                                        )}
                                                                    </a>
                                                                    <ul className="dropdown-menu w-100">
                                                                        <li className="dropdown-item"
                                                                            onClick={() => props.handleEmoji("#94ce65","positive")}
                                                                        >
                                                                            {" "}
                                                                            <img src={green} alt="" />{" "}Delightful
                                                                        </li>
                                                                        <li
                                                                            className="dropdown-item"
                                                                            onClick={() => props.handleEmoji("#f6c851","neutral")}
                                                                        >
                                                                            {" "}
                                                                            <img src={yellow} alt="" />{" "}Neutral
                                                                        </li>
                                                                        <li
                                                                            className="dropdown-item"
                                                                            onClick={() =>props.handleEmoji("#e75c53","negative")
                                                                            }
                                                                        >
                                                                            {" "}
                                                                            <img src={red} alt=""/>{" "}Negative
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>        
                                                    </div>
                                                </div>
                                                </>
                                            )):null
                                        }

                                    </div>
                                </div>
                                :null
                            }

                                <div className="addbox">
                                    <div className="form-group">
                                        {/* <label>Stage/Process/Activity</label> */}
                                        <div className="dropdown-fix">
                                            <a href="" className="dropdown-toggle-fix" data-toggle="dropdown">
                                                {/* {props.currentData.title ? <span dangerouslySetInnerHTML={createMarkup(props.currentData.title)}/> : "Select"} */}
                                                {/* {props.FeelingsStageInfo.StageName != null ? <span dangerouslySetInnerHTML={createMarkup(props.FeelingsStageInfo.StageName)}/> : "Select"} */}
                                            </a>
                                            {/* { JSON.stringify(props.data) } */}
                                            <ul className="dropdown-menu-fix w-100">
                                                {/* {Object.keys(props.currentSubStage).length>0 && props.currentSubStage.Categories.map((activity,catInd) =>
                                                    activity.CategoryName =="Feelings" &&
                                                    activity.CategoryText.map((option,catTextInd) => (
                                                    <li
                                                        className="dropdown-item"
                                                        onClick={e =>props.handleListValues(option,option.Text,catTextInd,catInd)}
                                                        dangerouslySetInnerHTML={createMarkup(option.CommentPlainText)}
                                                    />
                                                    ))
                                                )} */}

                                                
                                                {/* {props.data.length > 0 ? (props.data.map((element,index) => {
                                                    return (<li
                                                        className="dropdown-item"
                                                        // onClick={e =>props.handleListValues(element,element.StageName,index)}
                                                        onClick={() => props.selectedStageInfo(index) }
                                                        // onChange={ testOnChangeFunction() }
                                                        dangerouslySetInnerHTML={createMarkup(element.StageName)}
                                                    />)
                                                })) : null} */}

                                            </ul>
                                        </div>
                                    </div>

                                    {/* {JSON.stringify(props.FeelingsStageInfo.substages)} */}

                                    <div className="form-group">
                                        <label>Stages/ SubStages/ Processes/ Activities</label>
                                        <div className="dropdown">
                                            <a href="" className="dropdown-toggle" data-toggle="dropdown">
                                                {props.selectedTypeForEmotion === null ? 'Select' : null}
                                                {props.selectedTypeForEmotion === 'stage' && props.FeelingsStageInfo.StageName != null ? props.FeelingsStageInfo.StageName : null}
                                                {props.selectedTypeForEmotion === 'substage' && props.FeelingsStageInfo.SubStageName != null ? props.FeelingsStageInfo.SubStageName : null}
                                                {props.selectedTypeForEmotion === 'activity' && props.FeelingsStageInfo.Activity != null ? <span dangerouslySetInnerHTML={createMarkup(props.FeelingsStageInfo.Activity.Text)}/> : null}
                                            </a>
                                            
                                            <ul className="dropdown-menu w-100">
                                                <li className="dropdown-item "
                                                    onClick={() => {
                                                        props.selectedOptionInDropdown('stage');
                                                      
                                                        let activityId = props.data[props.FeelingsStageInfo.StageIndex].SubStages[props.FeelingsStageInfo.SubStageIndex].Categories.findIndex(d => d.CategoryName == "Feelings");
                                                        props.handleListValues(null, props.FeelingsStageInfo.StageName, null, activityId);
                                                    }}     
                                                    
                                                    dangerouslySetInnerHTML={createMarkup(props.FeelingsStageInfo.StageName)}
                                                   / >
                                                        
                                                        {/* <b>{props.FeelingsStageInfo.StageName != null ? <span dangerouslySetInnerHTML={createMarkup('Stage: ' + props.FeelingsStageInfo.StageName)}/> : "-"}</b></li> */}


                                                        {/* <li
                                                        className="dropdown-item"
                                                        onClick={e =>props.handleListValues(option,option.Text,catTextInd,catInd)}
                                                        dangerouslySetInnerHTML={createMarkup(option.CommentPlainText)}
                                                    /> */}

                                                {props.FeelingsStageInfo.substages.length > 0 ? (props.FeelingsStageInfo.substages.map((element,index) => {

                                                    // {props.FeelingsStageInfo.activities.length > 0 ? (props.FeelingsStageInfo.activities.map((element,index) => {

                                                            return (<li
                                                                className="dropdown-item "
                                                                // onClick={e =>props.handleListValues(element,element.SubStages.SubStageName,index)}
                                                                onClick={() => {
                                                                    props.selectedOptionInDropdown('substage');
                                                                    let activityId = props.data[props.FeelingsStageInfo.StageIndex].SubStages[props.FeelingsStageInfo.SubStageIndex].Categories.findIndex(d => d.CategoryName == "Feelings");
                                                                    props.handleListValues(null, props.FeelingsStageInfo.SubStageName, null, activityId);
                                                                    // props.selectedSubStageInfo(index)
                                                                }}
                                                                dangerouslySetInnerHTML={createMarkup( element.SubStageName)}
                                                            />)

                                                    // })) : null}

                                                })) : null}

                                                {props.FeelingsStageInfo.Activities.length > 0 ? props.FeelingsStageInfo.Activities.map((element, actindex) => <li
                                                    className="dropdown-item"
                                                    onClick={() => {
                                                        props.selectedOptionInDropdown('activity');
                                                        props.handleListValues(null, element.Text, null, props.currentActivityIndex);
                                                        // props.selectedSubStageInfo(index)
                                                        props.selectedSubStageActivityInfo(actindex);
                                                    }}
                                                    dangerouslySetInnerHTML={createMarkup(element.Text)}
                                                />) : null}

                                            </ul>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            placeholder="Enter Comment"
                                            value={props.currentData.comment}
                                            onChange={e => handleComment(e,props)} 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Emotion</label>
                                        <div className="dropdown">
                                            <a href="" className="dropdown-toggle" data-toggle="dropdown">
                                                {props.currentData.emoji =="positive" ? (
                                                    <p>
                                                        <img src={green} alt="" />Positive
                                                    </p>
                                                ) : props.currentData.emoji =="neutral" ? (
                                                    <p>
                                                        <img src={yellow}alt=""/>Neutral
                                                    </p>
                                                ) : props.currentData.emoji =="negative" ? (
                                                    <p>
                                                        <img src={red}alt=""/>Negative
                                                    </p>
                                                ) : (
                                                    "Select"
                                                )}
                                            </a>
                                            <ul className="dropdown-menu w-100">
                                                <li className="dropdown-item" onClick={() => props.handleEmoji("#94ce65","positive")}>
                                                    <img src={green} alt="" />Delightful
                                                </li>
                                                <li className="dropdown-item" onClick={() => props.handleEmoji("#f6c851","neutral")}>
                                                    <img src={yellow} alt="" />Neutral
                                                </li>
                                                <li className="dropdown-item" onClick={() =>props.handleEmoji("#e75c53","negative")}>
                                                    <img src={red} alt=""/>Negative
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                            
                                        {/* {Object.keys(props.currentSubStage).length>0 && props.currentSubStage.Categories.map((activity, activityIndex) =>
                                            activity.CategoryName =="Feelings" ?
                                            <div className="form-group addlink">
                                                {props.showNoOfForms !== activity.CategoryText.length -1 ? (
                                                    <a href="#" onClick={() =>props.addAnother()}>+ Add Another</a>
                                                ) : null}
                                            </div>
                                        :null
                                        )} */}

                                    </div>

                                <div className="form-group addlink text-right">
                                    <a data-dismiss="modal" href="#" onClick={() => props.clearData()}> Cancel </a>{" "}
                                    |
                                    <a data-dismiss="modal" href="#"
                                        onClick={() => {showEmojiSection(props,"stageInd");props.handleSave();}}> Save</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    
        </>
    );
};

export default CJMScreenBodyDetail;
