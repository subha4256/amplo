import React, { Component, useState, useEffect } from "react";
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import SidebarJs from "../../common/js/sidebarAnimation";
import { getSignIn } from "../../common/js/ApiRequest";
import {
    getAccessToken,
    getEmbedToken,
    getAllReports,
    reInitialize,
    getAllUserReports,
} from "../../actions/powerbiActions";
import { connect } from "react-redux";
import $ from "jquery";
import { Link } from "react-router-dom";
import CacheStorage from "../../utils/CacheStorage";
import FpmDashboard from "./FpmDashboard";
import { PowerbiWrapper } from "../CapabilityModeling/Styling/PowerbiWrapper";
import { resetSaveValue } from "../../actions/dashboardAction";
import FooterComponent from "../includes/dashboardFooter/FooterComponent";
const PowerBi = (props) => {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         embedToken:"",
    //         embedUrl:"",
    //         accessToken:""
    //     }
    //     // this.sidebarAnimation=new SidebarJs();
    // }
    const [state, setState] = useState({
        client_id: "",
        assignedReport: {},
        selectedReport: {},
        embedToken: "",
        embedUrl: "",
        accessToken: "",
        reports: [],
        reportId: "",
        pageName: "",
    });
    const [visual, setVisual] = useState({ visuals: [], loaded: false });
    const [selectedVisual, setSelectedVisual] = useState({
        selected: [],
        isSelected: false,
    });
    const [mainVisual, setMainVisual] = useState("");
    const [ebitdaUpload, setUploadReport] = useState("");
    useEffect(() => {
        props.reInitialize();
    }, []);
    useEffect(() => {
        props.getAccessToken();
    }, []);
    useEffect(() => {
        // if()
        // console.log('nextprops',nextProps);
        // let returnObj = {...prevState}
        const { powerbiData } = props;
        const { powerbiAccessToken } = powerbiData;
        if (
            powerbiAccessToken.access_token &&
            powerbiAccessToken.access_token !== ""
        ) {
            CacheStorage.setItem("pbi-token", powerbiAccessToken.access_token);
            setState({
                ...state,
                accessToken: powerbiAccessToken.access_token,
                client_id: powerbiAccessToken.client_id,
            });
            let type = CacheStorage.getItem("userType");
            //  if(type === 2 || type === '2'){
            props.getAllUserReports();
            //  }
            //  else{
            //   props.getAllReports()
            //  }
        }
    }, [props.powerbiData.powerbiAccessToken]);

    useEffect(() => {
        if (props.powerbiData.powerbiReports.length > 0) {
            setState({ ...state, reports: props.powerbiData.powerbiReports });
        }
    }, [props.powerbiData.powerbiReports]);

    useEffect(() => {
        if (state.accessToken !== "") {
            if (state.selectedReport.hasOwnProperty("reportId")) {
                props.getEmbedToken(state.selectedReport);
            }
        }
    }, [state.selectedReport]);

    useEffect(() => {
        if (!state.selectedReport.hasOwnProperty("reportId")) {
            return;
        }
        if (
            typeof props.powerbiData.powerbiEmbedToken.token !== "undefined" &&
            props.powerbiData.powerbiEmbedToken.token !== ""
        ) {
            //  let cId = parseInt(state.client_id);
            //  console.log('id',cId)
            //   const filter = {
            //     $schema: "http://powerbi.com/product/schema#basic",
            //     target: {
            //         table: "Scripps311 KPI_FACT",
            //         column: "CLIENTID"
            //     },
            //     operator: "Equals",
            //     values: [cId]
            // };
            var embedContainer = null;
            // console.log('the embedContainer',embedContainer)
            // var report = null;
            //             var config;
            // var reportId = "b08746b6-8c8b-4a96-b70d-b33a078fa26a";
            var embedToken = props.powerbiData.powerbiEmbedToken.token;
            // var dataseId = "12e2fbc9-e9e1-435c-b4f6-778df9ec2cdb";
            var embedUrl =
                "https://app.powerbi.com/reportEmbed?reportId=b08746b6-8c8b-4a96-b70d-b33a078fa26a&groupId=d293733f-97a8-48ad-b2dc-280ac14c2e0d&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUVBU1QyLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsibW9kZXJuRW1iZWQiOnRydWV9fQ%3d%3d";
            // var models = pbi.models;
            var models = window["powerbi-client"].models;
            var permissions = models.Permissions.All;
            //         if(mainVisual.length>0){
            //             console.log('main page',state.pageName);

            // var config = {
            //     type: 'visual',
            //     tokenType:models.TokenType.Embed,
            //     accessToken:embedToken,
            //     embedUrl: state.selectedReport.embedUrl,
            //     id: state.selectedReport.reportId,
            //     pageName: state.pageName,
            //     visualName:mainVisual
            // };
            // console.log('Required',config)
            //             // var config = {
            //             //     type: 'visual',
            //             //     tokenType:models.TokenType.Embed,
            //             //     accessToken:embedToken,
            //             //     embedUrl: state.selectedReport.embedUrl,
            //             //     id: state.selectedReport.reportId,
            //             //     permissions: permissions,
            //             //     pageName:state.pageName,
            //             //     VisualName:mainVisual,

            //             //     // settings: {
            //             //     //   panes: {
            //             //     //     filters: {
            //             //     //       visible: true
            //             //     //     },
            //             //     //     pageNavigation: {
            //             //     //       visible: true
            //             //     //     }
            //             //     //   }
            //             //     // }
            //             // };
            //             // $('#embedContainer').empty()
            //             var visualContainer = $('#visualContainer')[0]

            //         // // Embed the report and display it within the div container.
            //         var report2 = window.powerbi.embed(visualContainer, config);

            //         // Report.off removes a given event handler if it exists.
            //         report2.off("loaded");

            //         // Report.on will add an event handler which prints to Log window.

            //         report2.on("loaded", function () {
            //         //     report.getPages()
            //         //     .then(function (pages) {
            //         //       // Retrieve first page.
            //         //       var firstPage = pages[0];
            //         //    console.log('PageName',firstPage)
            //         //       firstPage.getVisuals()
            //         //         .then(function (visuals) {
            //         //           console.log('visuals',visuals);
            //         //           if(visuals.length>0){
            //         //               setVisual({...visual,visuals:visuals,loaded:true});
            //         //               setState({...state,pageName:firstPage.name})
            //         //           }
            //         //         })
            //         //     })
            //         });
            //         // report.off("pageChanged");

            //         // Report.on will add an event listener.
            //         // report.on("pageChanged", function (event) {
            //         //     console.log("Event - pageChanged:");
            //         //     var page = event.detail.newPage;
            //         //     page.getVisuals()
            //         //     .then(function (visuals) {
            //         //       console.log('visuals',visuals);
            //         //       if(visuals.length>0){
            //         //           setVisual({...visual,visuals:visuals,loaded:true})
            //         //       }
            //         //     })

            //             // console.log("Page changed to \"" + page.name + "\" - \"" + page.displayName + "\"");
            //         // });
            //         // Report.off removes a given event handler if it exists.
            //         report2.off("rendered");

            //         // Report.on will add an event handler which prints to Log window.
            //         report2.on("rendered", function () {

            //         });
            //         }
            // else{
            var config = {
                type: "report",
                tokenType: models.TokenType.Embed,
                accessToken: embedToken,
                embedUrl: state.selectedReport.embedUrl,
                id: state.selectedReport.reportId,
                permissions: permissions,
                settings: {
                    panes: {
                        filters: {
                            visible: true,
                        },
                        pageNavigation: {
                            visible: true,
                        },
                    },
                },
            };
            embedContainer = $("#embedContainer")[0];

            // // Embed the report and display it within the div container.
            var report = window.powerbi.embed(embedContainer, config);

            // Report.off removes a given event handler if it exists.
            report.off("loaded");

            // Report.on will add an event handler which prints to Log window.

            report.on("loaded", function () {
                // report.setFilters([filter])
                // .then(function () {
                //     console.log("Report filter was set.");
                // })
                // .catch(function (errors) {
                //     console.log("errors",errors);
                // });
                report.getPages().then(function (pages) {
                    // Retrieve first page.
                    var firstPage = pages[0];
                    console.log("PageName", firstPage);
                    firstPage.getVisuals().then(function (visuals) {
                        console.log("visuals", visuals);
                        if (visuals.length > 0) {
                            setVisual({
                                ...visual,
                                visuals: visuals,
                                loaded: true,
                            });
                            setState({ ...state, pageName: firstPage.name });
                        }
                    });
                });
            });
            report.off("pageChanged");

            // Report.on will add an event listener.
            report.on("pageChanged", function (event) {
                console.log("Event - pageChanged:");
                var page = event.detail.newPage;
                page.getVisuals().then(function (visuals) {
                    console.log("visuals", visuals);
                    if (visuals.length > 0) {
                        setVisual({
                            ...visual,
                            visuals: visuals,
                            loaded: true,
                        });
                    }
                });
                console.log("Page Object", page);
                console.log(
                    'Page changed to "' +
                        page.name +
                        '" - "' +
                        page.displayName +
                        '"'
                );
            });
            // Report.off removes a given event handler if it exists.
            report.off("rendered");

            // Report.on will add an event handler which prints to Log window.
            report.on("rendered", function () {});
            // }
        }
    }, [props.powerbiData.powerbiEmbedToken, mainVisual]);

    useEffect(() => {
        if (props.saveResult !== null) {
            // console.log('after save',props.saveResult)
            if (props?.saveResult?.length > 0) {
                if (
                    props.saveResult[0].Success === 1 ||
                    props.saveResult[0].Success === "1" ||
                    props.saveResult[0].Success === true
                ) {
                    $("#showModal").click();
                    props.resetSaveValue();
                }
            }
        }
    }, [props.saveResult]);
    const selectReport = () => {
        let report = state.assignedReport;
        console.log("got report", report);
        let reportId = report.reportId;
        let embedUrl = report.reportEmbedUrl;
        if (reportId === null || typeof reportId === "undefined") {
            alert("Please select a dashboard");
            return;
        }
        let obj = {
            reportId: reportId,
            embedUrl: embedUrl,
            reportName: report.reportName,
        };
        setState({ ...state, selectedReport: obj });
    };
    //     useEffect(()=>{
    // if(visual.length>0){

    // }
    //     },[visual])
    const onVisualSelect = (visual, isSelected) => {
        if (isSelected === true) {
            setMainVisual(visual.name);
        } else {
            console.log("state array", selectedVisual.selected);
            console.log("visual name", visual.name);
            var newVisualArray = selectedVisual.selected.filter((item) => {
                console.log("item name", item);
                return visual.name !== item;
            });
            console.log("new array", newVisualArray);
            setSelectedVisual({ ...selectedVisual, selected: newVisualArray });
        }
    };
    const onReportSelect = (e) => {
        setState({ ...state, reportId: e.target.value });
        const filteredReport = state.reports.filter((report) => {
            return report.reportId === e.target.value;
        });
        console.log("filtered value", filteredReport);
        if (filteredReport.length > 0) {
            // selectReport(filteredReport[0])
            setState((prevState) => {
                let obj = Object.assign({}, prevState);
                obj.assignedReport = filteredReport[0];
                return obj;
            });
        }
    };
    const onReportSelect2 = (e) => {
        setUploadReport(e.target.value);
    };
    const onGotoUpload = () => {
        if (ebitdaUpload === "") {
            alert("Please select a report");
            return;
        }
        props.history.push("/ebidata-uploads");
    };
    //
    // render(){
    return (
        <>
            <DashboardHeader />
            <div id="wrapper" key="body-wrapper">
                <DashboardSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <ol className="breadcrumb dashbread">
                            <li className="breadcrumb-item active">Home</li>
                            <li className="breadcrumb-item active">Reports</li>
                            {/* <li className="breadcrumb-item active">FPM</li> */}
                            <li className="breadcrumb-menu d-md-down-none ml-auto">
                                {
                                    <img
                                        src={require("./../../common/images/diva-icon.png")}
                                        className="logo-img"
                                        alt="Logo"
                                    />
                                }
                                <a className="btn powered p-0" href="#">
                                    <i className="icon-graph"></i> &nbsp;
                                    <i>Powered by Amploglobal</i>
                                </a>
                            </li>
                        </ol>
                        <div className="container-fluid container-dashboard">
                            <PowerbiWrapper>
                                {/* <div class="row"> */}
                                {/* <div class="col-sm-12 col-md-12 m-auto"> */}
                                {/* <!-- Start dashboard landing Section --> */}
                                <div className="bg-white dashboard-sec">
                                    <h1 className="heading">Get Dashboard</h1>

                                    <div className="report-form">
                                        <div className="form-group row">
                                            <div className="col-sm-5 col-md-5">
                                                <label>
                                                    Choose from existing
                                                    Dashboards
                                                </label>
                                                <select
                                                    style={{ height: "40px" }}
                                                    className="form-control"
                                                    onChange={onReportSelect}
                                                >
                                                    <option selected>
                                                        Select Dashboard
                                                    </option>
                                                    {/* <option>Dashboard1</option> */}
                                                    {state.reports.length > 0 &&
                                                        state.reports.map(
                                                            (report) => {
                                                                return (
                                                                    <>
                                                                        {/* onClick={(e)=>selectReport(e,report)} */}
                                                                        <option
                                                                            key={
                                                                                report.reportId
                                                                            }
                                                                            value={
                                                                                report.reportId
                                                                            }
                                                                        >
                                                                            {
                                                                                report.reportName
                                                                            }
                                                                        </option>
                                                                    </>
                                                                );
                                                            }
                                                        )}
                                                </select>
                                            </div>
                                            <div className="col-sm-7 col-md-7">
                                                {/* <div class="form-group row"> */}

                                                <div class="col-sm-12 col-md-4">
                                                    <button
                                                        style={{
                                                            width: "380px",
                                                        }}
                                                        onClick={selectReport}
                                                        type="button"
                                                        class="btn btn-primary mt-4"
                                                    >
                                                        Run Dashboard
                                                    </button>
                                                </div>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                        <h6>OR </h6>
                                        <div
                                            class="form-group row"
                                            style={{ marginTop: "32px" }}
                                        >
                                            <div class="col-sm-5 col-md-5">
                                                <label>
                                                    Choose from uploaded
                                                    outside-in Data
                                                </label>
                                                <select
                                                    className="form-control"
                                                    onChange={onReportSelect2}
                                                >
                                                    <option
                                                        style={{
                                                            height: "40px",
                                                        }}
                                                        selected
                                                    >
                                                        Select Dashboard
                                                    </option>
                                                    {/* <option>Dashboard1</option> */}
                                                    <option value="EBITDA">
                                                        EBITDA
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="col-sm-7 col-md-7">
                                                <div class="col-sm-12 col-md-4">
                                                    <button
                                                        style={{
                                                            border: "0.6px solid} !important",
                                                            width: "380px",
                                                        }}
                                                        onClick={onGotoUpload}
                                                        class="btn btn-primary mt-4"
                                                    >
                                                        Upload Data
                                                    </button>
                                                </div>
                                            </div>
                                            {/* <select class="form-control">
                        <option selected>Select Dashboard Widget</option>
                        <option>Widget1</option>
                        <option>Widget2</option>
                      </select> */}
                                        </div>
                                        {/* <div class="form-group row">
                    <div class="col-sm-12 col-md-4">
                      <button onClick={selectReport} type="button" class="btn btn-primary mt-2">Run Dashboard</button>
                    </div>
                  </div> */}
                                    </div>
                                    {/* report show are starts */}
                                    <div className="mainReport" id="reportArea">
                                        {Object.keys(state.selectedReport)
                                            .length > 0 &&
                                        state.selectedReport.reportName
                                            .toLowerCase()
                                            .includes("ebi") ? (
                                            <></>
                                        ) : (
                                            ""
                                        )}
                                        {Object.keys(state.selectedReport)
                                            .length > 0 &&
                                        state.selectedReport.reportName
                                            .toLowerCase()
                                            .includes("fpm") ? (
                                            <div className="fpmDashboard">
                                                <FpmDashboard />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {/* <div className="visualArea">

              {visual.loaded === true && visual.visuals.length>0 ?
                <>
                <h6>Filter Graphs.</h6>
           {visual.visuals.map(((vis,index)=>{
               if(typeof vis.title !== 'undefined')
               return(
                   <>
                   <div className="form-check form-check-inline">
  <input name="selectedVisual" onChange={(e)=>{
      onVisualSelect(vis,e.target.checked)
  }} className="form-check-input" type="checkbox" id={"visual"+index} value={vis.name}/>
  <label className="form-check-label" for={"visual"+index}>{vis.title}</label>
</div>
                   </>
               )
           }))}
                </>
                :""}
              </div> */}
                                        <div
                                            style={{ height: 542 }}
                                            id="embedContainer"
                                        ></div>
                                    </div>
                                    {/* report show are ends */}
                                </div>

                                {/* <label style={{fontSize:"18px"}} for="totalReports">Select Existing Dashboard To Display</label> */}
                                {/* <select class="form-control" id="totalReports" name={state.reportId} onChange={selectReport} value={state.embedUrl}>
        {state.reports.length>0 && state.reports.map(report=>{
            return(
                <>
                  <option name={report.reportId} key={report.reportId} value={report.reportEmbedUrl}>{report.reportName}</option>
                </>
            )
        })}
    
     
    </select> */}
                                {/* <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Select Dashboard
  </button> */}
                                {/* <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> */}
                                {/* <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a> */}
                                {/* {state.reports.length>0 && state.reports.map(report=>{
            return(
                <>
                 <a class="dropdown-item" onClick={(e)=>selectReport(e,report)}>{report.reportName}</a> 
                </>
            )
        })} */}
                                {/* </div> */}
                                {/* </div> */}
                                {/* </div> */}
                                {/* <iframe width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=756cb5ac-a71a-4247-a83f-80f86adaa70b&autoAuth=true&ctid=7aeb1417-d9cf-43c8-a378-5dc3c6383163&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLWItcHJpbWFyeS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe> */}

                                <div
                                    style={{ width: 1000, height: 542 }}
                                    id="visualContainer"
                                ></div>
                                <a
                                    className="modalShow"
                                    id="showModal"
                                    data-toggle="modal"
                                    data-target="#requestPopup"
                                    style={{ display: "none" }}
                                ></a>
                                {/* modal starts */}
                                <div
                                    class="modal"
                                    id="requestPopup"
                                    tabindex="-1"
                                    role="dialog"
                                >
                                    <div
                                        class="modal-dialog modal-dialog-centered modal-lg"
                                        role="document"
                                    >
                                        <div class="modal-content">
                                            <div class="modal-header border-0">
                                                <a
                                                    class="close"
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
                                            <div class="modal-body text-center px-5 pb-5 pt-0">
                                                <div class="mb-4">
                                                    <i class="fas fa-check-circle"></i>
                                                </div>
                                                <h2>
                                                    Your request is received!
                                                </h2>
                                                <p class="mb-5 mt-4 text-center">
                                                    We are processing the
                                                    comparison to be presented
                                                    and consumed.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* modal ends */}
                            </PowerbiWrapper>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    );
    // }
};
const mapStateToProps = (state) => ({
    powerbiData: state.powerbiData,
    saveResult: state.dashboardData.saveFpmDashboard,
});
export default connect(mapStateToProps, {
    resetSaveValue,
    getAllUserReports,
    getAccessToken,
    getEmbedToken,
    getAllReports,
    reInitialize,
})(PowerBi);
