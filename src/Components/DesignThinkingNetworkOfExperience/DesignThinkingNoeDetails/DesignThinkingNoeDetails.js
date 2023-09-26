import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import DashboardHeader from "../../includes/dashboardHeader/DashboardHeader";
import { DesignThinkingNoeStyle } from '../Styling/DesignThinkingNoeStyle';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import Graph from './NoeGraph'
import { 
  fetchNOEBySubEpic
} from '../../../actions/noeActions';
import { 
    fetchDesignThinkingProjectDetails
} from '../../../actions/epicScreenActions';

import Topbar from './Topbar';

class DesignThinkingNoeDetails extends Component{
    state={
        dtId : this.props.match.params.dtId?this.props.match.params.dtId:0,
        epicId: this.props.match.params.epicId?this.props.match.params.epicId:0,
        versionHistoryNo: 0,
        data: [
            {
                "id":"427",
                "name":"Epic 7",
                "Version":"1.0",
                "EpicOrSubEpic":"",
                "Goal":null,
                "Description":null,
                "Association":[
                   
                ],
                "SubEpic":[
                   {
                      "id":"428",
                      "name":"SubEpic 1",
                      "Version":"1.0",
                      "EpicOrSubEpic":"",
                      "Goal":null,
                      "Description":null,
                      "SequenceNumber":"1",
                      "Association":[
                         
                      ]
                   },
                   {
                      "id":"429",
                      "name":"SubEpic 2",
                      "Version":"1.0",
                      "EpicOrSubEpic":"",
                      "Goal":null,
                      "Description":null,
                      "SequenceNumber":"2",
                      "Association":[
                         
                      ]
                   }
                ],
                "LifeCycle":[
                   {
                      "EpicLifeCycleId":"269",
                      "LifeCycleName":"LifeCycle 1",
                      "Personas":[
                         {
                            "PersonaId":"248",
                            "PersonaName":"Persona 1",
                            "FilePath":null,
                            "Stages":[
                               {
                                  "SubStages":[
                                     {
                                        "DtCjmStageHeaderId":"1336",
                                        "StageName":"sub stage 1",
                                        "Emotion": "positive",
                                        "Categories":[
                                           {
                                              "CategoryLookUpId":"20",
                                              "CategoryName":"Activities",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmProcessesId":"1939",
                                                    "ProcessName":"Enter some text1",
                                                    "ColorCode":"#f6c851",
                                                    "SequenceNumber":"1"
                                                 },
                                                 {
                                                    "DtCjmProcessesId":"1940",
                                                    "ProcessName":"Enter some text2",
                                                    "ColorCode":"#94ce65",
                                                    "SequenceNumber":"2"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"21",
                                              "CategoryName":"Touchpoints",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmTouchPointsId":"1630",
                                                    "TouchPointName":"Enter some text",
                                                    "SequenceNumber":"1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"52",
                                              "CategoryName":"Feelings",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmFeelingsId":"963",
                                                    "ProcessName":null,
                                                    "HasFeelings":"0",
                                                    "Comment":"abcd",
                                                    "CommentPlainText":"Enter some text1",
                                                    "Emotion":"neutral",
                                                    "SequenceNumber":"1"
                                                 },
                                                 {
                                                    "DtCjmFeelingsId":"964",
                                                    "ProcessName":null,
                                                    "HasFeelings":"0",
                                                    "Comment":"abcd",
                                                    "CommentPlainText":"Enter some text2",
                                                    "Emotion":"positive",
                                                    "SequenceNumber":"2"
                                                 },
                                                 {
                                                    "SequenceNumber":"1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"51",
                                              "CategoryName":"Experiences",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmExperiencesId":"916",
                                                    "ExperienceName":"Enter some text 1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"23",
                                              "CategoryName":"Impactee",
                                              "CategoryText":[
                                                 {
                                                    "DtStakeholderId":"5",
                                                    "ImagePath":""
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"22",
                                              "CategoryName":"Impactor",
                                              "CategoryText":[
                                                 {
                                                    "DtStakeholderId":"2",
                                                    "ImagePath":"http:\/\/divadev.azurewebsites.net\/public\/StakeHoldersImages\/1597297225.png"
                                                 },
                                                 {
                                                    "DtStakeholderId":"5",
                                                    "ImagePath":""
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"33",
                                              "CategoryName":"Painpoints",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmPainPointsId":"1206",
                                                    "PainPointName":"Enter some text3",
                                                    "SequenceNumber":"3"
                                                 },
                                                 {
                                                    "DtCjmPainPointsId":"1207",
                                                    "PainPointName":"Enter some text4",
                                                    "SequenceNumber":"4"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"34",
                                              "CategoryName":"Opportunities",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmOportunitiesId":"1199",
                                                    "OportunityName":"Enter some text",
                                                    "SequenceNumber":"1"
                                                 }
                                              ]
                                           }
                                        ]
                                     }
                                  ],
                                  "DtCjmStageHeaderId":"1335",
                                  "StageName":"Enter Stage Name1",
                                  "commentCol":"0",
                                  "disableAddNewColBtn":"0",
                                  "SequenceNumber":"1"
                               },
                               {
                                  "SubStages":[
                                     {
                                        "DtCjmStageHeaderId":"1338",
                                        "StageName":"sub-stage 1",
                                        "Emotion": "positive",
                                        "Categories":[
                                           {
                                              "CategoryLookUpId":"20",
                                              "CategoryName":"Activities",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmProcessesId":"1941",
                                                    "ProcessName":"Enter some text1",
                                                    "ColorCode":"#e75c53",
                                                    "SequenceNumber":"1"
                                                 },
                                                 {
                                                    "DtCjmProcessesId":"1942",
                                                    "ProcessName":"Enter some text2",
                                                    "ColorCode":"#f6c851",
                                                    "SequenceNumber":"2"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"21",
                                              "CategoryName":"Touchpoints",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmTouchPointsId":"1631",
                                                    "TouchPointName":"Enter some text",
                                                    "SequenceNumber":"1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"52",
                                              "CategoryName":"Feelings",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmFeelingsId":"965",
                                                    "ProcessName":null,
                                                    "HasFeelings":"0",
                                                    "Comment":"abcd",
                                                    "CommentPlainText":"Enter some text1",
                                                    "Emotion":"negative",
                                                    "SequenceNumber":"1"
                                                 },
                                                 {
                                                    "DtCjmFeelingsId":"966",
                                                    "ProcessName":null,
                                                    "HasFeelings":"0",
                                                    "Comment":"abcd",
                                                    "CommentPlainText":"Enter some text2",
                                                    "Emotion":"neutral",
                                                    "SequenceNumber":"2"
                                                 },
                                                 {
                                                    "SequenceNumber":"1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"51",
                                              "CategoryName":"Experiences",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmExperiencesId":"917",
                                                    "ExperienceName":"Enter some text 1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"23",
                                              "CategoryName":"Impactee",
                                              "CategoryText":[
                                                 {
                                                    "DtStakeholderId":"0",
                                                    "ImagePath":""
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"22",
                                              "CategoryName":"Impactor",
                                              "CategoryText":[
                                                 {
                                                    "DtStakeholderId":"0",
                                                    "ImagePath":""
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"33",
                                              "CategoryName":"Painpoints",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmPainPointsId":"1208",
                                                    "PainPointName":"Enter some text",
                                                    "SequenceNumber":"1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"34",
                                              "CategoryName":"Opportunities",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmOportunitiesId":"1200",
                                                    "OportunityName":"Enter some text1",
                                                    "SequenceNumber":"1"
                                                 },
                                                 {
                                                    "DtCjmOportunitiesId":"1201",
                                                    "OportunityName":"Enter some text3",
                                                    "SequenceNumber":"3"
                                                 }
                                              ]
                                           }
                                        ]
                                     }
                                  ],
                                  "DtCjmStageHeaderId":"1337",
                                  "StageName":"Enter Stage Name2",
                                  "commentCol":"0",
                                  "disableAddNewColBtn":"0",
                                  "SequenceNumber":"2"
                               },
                               {
                                  "SubStages":[
                                     {
                                        "DtCjmStageHeaderId":"1340",
                                        "StageName":"sub-stage 1",
                                        "Emotion": "positive",
                                        "Categories":[
                                           {
                                              "CategoryLookUpId":"20",
                                              "CategoryName":"Activities",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmProcessesId":"1943",
                                                    "ProcessName":"Enter some text1",
                                                    "ColorCode":"#94ce65",
                                                    "SequenceNumber":"1"
                                                 },
                                                 {
                                                    "DtCjmProcessesId":"1944",
                                                    "ProcessName":"Enter some text2",
                                                    "ColorCode":"#e75c53",
                                                    "SequenceNumber":"2"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"21",
                                              "CategoryName":"Touchpoints",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmTouchPointsId":"1632",
                                                    "TouchPointName":"Enter some text",
                                                    "SequenceNumber":"1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"52",
                                              "CategoryName":"Feelings",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmFeelingsId":"967",
                                                    "ProcessName":null,
                                                    "HasFeelings":"0",
                                                    "Comment":"abcd",
                                                    "CommentPlainText":"Enter some text1",
                                                    "Emotion":"positive",
                                                    "SequenceNumber":"1"
                                                 },
                                                 {
                                                    "DtCjmFeelingsId":"968",
                                                    "ProcessName":null,
                                                    "HasFeelings":"0",
                                                    "Comment":"abcd",
                                                    "CommentPlainText":"Enter some text2",
                                                    "Emotion":"negative",
                                                    "SequenceNumber":"2"
                                                 },
                                                 {
                                                    "SequenceNumber":"1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"51",
                                              "CategoryName":"Experiences",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmExperiencesId":"918",
                                                    "ExperienceName":"Enter some text 1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"23",
                                              "CategoryName":"Impactee",
                                              "CategoryText":[
                                                 {
                                                    "DtStakeholderId":"0",
                                                    "ImagePath":""
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"22",
                                              "CategoryName":"Impactor",
                                              "CategoryText":[
                                                 {
                                                    "DtStakeholderId":"0",
                                                    "ImagePath":""
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"33",
                                              "CategoryName":"Painpoints",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmPainPointsId":"1209",
                                                    "PainPointName":"Enter some text1",
                                                    "SequenceNumber":"1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"34",
                                              "CategoryName":"Opportunities",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmOportunitiesId":"1202",
                                                    "OportunityName":"Enter some text",
                                                    "SequenceNumber":"1"
                                                 }
                                              ]
                                           }
                                        ]
                                     }
                                  ],
                                  "DtCjmStageHeaderId":"1339",
                                  "StageName":"Enter Stage Name3",
                                  "commentCol":"0",
                                  "disableAddNewColBtn":"0",
                                  "SequenceNumber":"3"
                               },
                               {
                                  "SubStages":[
                                     {
                                        "DtCjmStageHeaderId":"1342",
                                        "StageName":"sub-stage 1",
                                        "Emotion": "positive",
                                        "Categories":[
                                           {
                                              "CategoryLookUpId":"20",
                                              "CategoryName":"Activities",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmProcessesId":"1945",
                                                    "ProcessName":"Enter some text1",
                                                    "ColorCode":"#94ce65",
                                                    "SequenceNumber":"1"
                                                 },
                                                 {
                                                    "DtCjmProcessesId":"1946",
                                                    "ProcessName":"Enter some text2",
                                                    "ColorCode":"#e75c53",
                                                    "SequenceNumber":"2"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"21",
                                              "CategoryName":"Touchpoints",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmTouchPointsId":"1633",
                                                    "TouchPointName":"Enter some text",
                                                    "SequenceNumber":"1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"52",
                                              "CategoryName":"Feelings",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmFeelingsId":"969",
                                                    "ProcessName":null,
                                                    "HasFeelings":"0",
                                                    "Comment":"abcd",
                                                    "CommentPlainText":"Enter some text1",
                                                    "Emotion":"positive",
                                                    "SequenceNumber":"1"
                                                 },
                                                 {
                                                    "DtCjmFeelingsId":"970",
                                                    "ProcessName":null,
                                                    "HasFeelings":"0",
                                                    "Comment":"abcd",
                                                    "CommentPlainText":"Enter some text2",
                                                    "Emotion":"negative",
                                                    "SequenceNumber":"2"
                                                 },
                                                 {
                                                    "SequenceNumber":"1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"51",
                                              "CategoryName":"Experiences",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmExperiencesId":"919",
                                                    "ExperienceName":"Enter some text 1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"23",
                                              "CategoryName":"Impactee",
                                              "CategoryText":[
                                                 {
                                                    "DtStakeholderId":"0",
                                                    "ImagePath":""
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"22",
                                              "CategoryName":"Impactor",
                                              "CategoryText":[
                                                 {
                                                    "DtStakeholderId":"0",
                                                    "ImagePath":""
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"33",
                                              "CategoryName":"Painpoints",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmPainPointsId":"1210",
                                                    "PainPointName":"Enter some text",
                                                    "SequenceNumber":"1"
                                                 }
                                              ]
                                           },
                                           {
                                              "CategoryLookUpId":"34",
                                              "CategoryName":"Opportunities",
                                              "CategoryText":[
                                                 {
                                                    "DtCjmOportunitiesId":"1203",
                                                    "OportunityName":"Enter some text",
                                                    "SequenceNumber":"1"
                                                 }
                                              ]
                                           }
                                        ]
                                     }
                                  ],
                                  "DtCjmStageHeaderId":"1341",
                                  "StageName":"Enter Stage Name4",
                                  "commentCol":"0",
                                  "disableAddNewColBtn":"0",
                                  "SequenceNumber":"4"
                               }
                            ]
                         }
                      ]
                   }
                ]
             }
         ]
    }
    componentDidMount(){
        this.props.fetchNOEBySubEpic(this.state.epicId)
        this.props.fetchDesignThinkingProjectDetails(this.state.dtId,this.state.versionHistoryNo);
    }
    render(){
        console.log("this.state.data",this.state.data)
        console.log("this.props.noeData",this.props.noeData)

        // const data1 = data.flatMap(d1 => d1.SubStages).flatMap(d2 => d2.Categories).filter(d3 => d3.CategoryName == "Feelings").flatMap(d4 => d4.CategoryText).map(d4 => d4.Emotion == "positive" ? 10 : d4.Emotion == "negative" ? 0: 5 );
        const NoeData = this.props.noeData.flatMap(d1 => d1.LifeCycle).flatMap(d1 => d1.Personas).flatMap(d1 => d1.Stages).filter(d => d.StageName !== null)
        const dataForChart = this.props.noeData.flatMap(d1 => d1.LifeCycle)
                            .flatMap(d1 => d1.Personas)
                            .flatMap(d1 => d1.Stages)
                            .filter(d => d.StageName !== null)
                            .flatMap(d1 => d1.SubStages)
                            .flatMap(d1 => d1.Categories)
                            .filter(d3 => d3.CategoryName == "Feelings")
                            .flatMap(d4 => d4.CategoryText)
                            .filter(d3 => d3.Emotion)
                            .map(d4 => d4.Emotion == "positive" ? 10 : d4.Emotion == "negative" ? 0: 5 ) 
                            
        console.log("dataForChart",dataForChart)
        console.log("NoeData",NoeData)
        // console.log("parsedjson",this.state.data[0].LifeCycle[0].Personas[0].Stages[0].SubStages)
        // console.log("noeData in detail",this.props.noeData)
        const greenFace = new Image()
        greenFace.src =require('../../../common/images/green-icon.png');

        const yellowFace = new Image()
        yellowFace.src =require('../../../common/images/yellow-icon.png');

        const redFace = new Image()
        redFace.src =require('../../../common/images/red-icon.png');


        const data = {
            labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ,'I' , 'J','M','N','O','P','Q','R','S','T','U','V'],
            datasets: [{
                label: 'Label1',
                pointRadius: [0, 0, 0, 0, 0, 0],
                lineTension : 0,
                pointHoverRadius: 0,
                fill : false,
                pointHitRadius: 20,
                pointStyle: [greenFace, redFace, greenFace, yellowFace, redFace, yellowFace, greenFace, yellowFace, redFace, yellowFace,greenFace, redFace, greenFace, yellowFace, redFace, yellowFace, greenFace, yellowFace, redFace, yellowFace],
                pointBackgroundColor: "#fff",
                borderColor : `#${Math.floor(Math.random()*16777215).toString(16)}`,
                data: [0,5,10,5,10,0,10,10,5,5,0,5,10,5,10,0,10,10,5,5]
            }
            // {
            //     label: 'Label2',
            //     pointRadius: [0, 0, 0, 0, 0, 0],
            //     pointHoverRadius: 0,
            //     lineTension : 0,
            //     fill : false,
            //     pointHitRadius: 0,
            //     pointStyle: [redFace, yellowFace, greenFace, yellowFace, redFace, yellowFace,greenFace, redFace, greenFace, yellowFace],
            //     pointBackgroundColor: "#fff",
            //     borderColor : `#${Math.floor(Math.random()*16777215).toString(16)}`,
            //     data: [Math.floor(Math.random()*1000), Math.floor(Math.random()*1000), Math.floor(Math.random()*1000), Math.floor(Math.random()*1000), Math.floor(Math.random()*1000), Math.floor(Math.random()*1000), Math.floor(Math.random()*1000), Math.floor(Math.random()*1000), Math.floor(Math.random()*1000), Math.floor(Math.random()*1000)]
            // }
        ]
        }
        return(
            <>
                <DashboardHeader/>
                <DesignThinkingNoeStyle id="wrapper">
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* <!-- Main Content --> */}
                        <div id="content">
                            {/* <!-- Breadcrumb --> */}
                            <ol className="breadcrumb dashbread mb-0">
                                <li className="breadcrumb-item active"><Link to="/dt-dashboard">Home</Link></li>
                                <li className="breadcrumb-item">Design Led Materiality</li>
                                <li className="breadcrumb-item">Epic 1</li>
                                <li className="breadcrumb-menu d-md-down-none ml-auto">
                                    <img src={require("../../../common/images/diva-icon.png")} className="logo-img" alt="Logo" />
                                    <a className="btn powered p-0" href="#">&nbsp;<i>Powered by Amploglobal</i></a>
                                </li>
                            </ol>
                            {/* <!-- End Breadcrumb --> */}
                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid container-dashboard">
                                <div className="row py-2 border-top border-bottom dt-project-sec1">
                                    <div className="col-sm-12 col-md-12 col-lg-9 col-xl-10">
                                        <Topbar
                                            dtId={this.state.dtId}
                                            epicId={this.state.epicId}
                                            dtProjects={this.props.dtProjects}
                                        />
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-3 col-xl-2">
                                        <div className="dt-btn-sec text-right">
                                            <Link to={`/dt-network-of-experience/${this.state.dtId}/${this.state.epicId}`}>Cancel</Link>
                                            <Link to={`/dt-problem-pinning/${this.state.dtId}/${this.state.epicId}`} style={{color: "white"}} className="btn btn-primary ml-3">Next</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="dt-screen-main">
                                        {/* <!-- Start Left Content --> */}
                                        <div className="dt-left-nav-bar" id="leftaccordpanel">
                                            <ul className="dt-left-list">
                                                <li className="border-bottom">
                                                    <a href="#" data-toggle="collapse" data-target="#benchmarking">
                                                        <i className="fas fa-chevron-right"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="">
                                                        <img src={require("../../../common/images/icon-1.png")} alt="" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="">
                                                        <img src={require("../../../common/images/icon-2.png")} alt="" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="">
                                                        <img src={require("../../../common/images/icon-3.png")} alt="" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" data-toggle="collapse" data-target="#draw">
                                                        <img src={require("../../../common/images/icon-6.png")} alt="" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="">
                                                        <img src={require("../../../common/images/icon-7.png")} alt="" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="">
                                                        <img src={require("../../../common/images/icon-4.png")} alt="" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" data-toggle="collapse" data-target="#help">
                                                        <img src={require("../../../common/images/icon-5.png")} alt="" />
                                                    </a>
                                                </li>
                                            </ul>
                                            <div className="active-left-panel collapse" id="benchmarking"
                                                data-parent="#leftaccordpanel">
                                                <div className="search-area">
                                                    <div className="form-group has-search">
                                                        <input type="text" className="form-control" placeholder="" />
                                                        <span className="fa fa-search form-control-feedback"></span>
                                                    </div>
                                                </div>
                                                <h2>Benchmarking Projects</h2>

                                                <div id="benchmarkingaccord" className="benchmarking-list w-267">
                                                    <div className="card">
                                                        <div className="d-flex">
                                                            <div className="custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input" id="check1" />
                                                                <label className="custom-control-label" for="check1"></label>
                                                            </div>
                                                            <a data-toggle="collapse" href="#benchmarking1">Benchmarking Project
                                                                1</a>
                                                        </div>
                                                        <div id="benchmarking1" className="collapse show"
                                                            data-parent="#benchmarkingaccord">
                                                            <ul className="domain-list">
                                                                <li>
                                                                    <div className="custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input"
                                                                            id="domain1" />
                                                                        <label className="custom-control-label" for="domain1">Domain
                                                                            1</label>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input"
                                                                            id="domain2" />
                                                                        <label className="custom-control-label" for="domain2">Domain
                                                                            2</label>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input"
                                                                            id="domain3" />
                                                                        <label className="custom-control-label" for="domain3">Domain
                                                                            3</label>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input"
                                                                            id="domain4" />
                                                                        <label className="custom-control-label" for="domain4">Domain
                                                                            4</label>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input"
                                                                            id="domain5" />
                                                                        <label className="custom-control-label" for="domain5">Domain
                                                                            5</label>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input"
                                                                            id="domain6" />
                                                                        <label className="custom-control-label" for="domain6">Domain
                                                                            6</label>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="d-flex">
                                                            <div className="custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input" id="check2" />
                                                                <label className="custom-control-label" for="check2"></label>
                                                            </div>
                                                            <a data-toggle="collapse" href="#benchmarking2">Benchmarking Project
                                                                2</a>
                                                        </div>
                                                        <div id="benchmarking2" className="collapse" data-parent="#benchmarkingaccord">
                                                            <ul className="domain-list">
                                                                <li>
                                                                    <div className="custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input"
                                                                            id="domain1-a" />
                                                                        <label className="custom-control-label" for="domain1-a">Domain
                                                                            1</label>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input"
                                                                            id="domain2-a" />
                                                                        <label className="custom-control-label" for="domain2">Domain
                                                                            2-a</label>
                                                                    </div>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="d-flex">
                                                            <div className="custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input" id="check3" />
                                                                <label className="custom-control-label" for="check3"></label>
                                                            </div>
                                                            <a data-toggle="collapse" href="#benchmarking3">Benchmarking Project
                                                                3</a>
                                                        </div>
                                                        <div id="benchmarking3" className="collapse" data-parent="#benchmarkingaccord">
                                                            <ul className="domain-list">
                                                                <li>
                                                                    <div className="custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input"
                                                                            id="domain1-b" />
                                                                        <label className="custom-control-label" for="domain1-b">Domain
                                                                            1</label>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="custom-checkbox">
                                                                        <input type="checkbox" className="custom-control-input"
                                                                            id="domain2-b" />
                                                                        <label className="custom-control-label" for="domain2-b">Domain
                                                                            2</label>
                                                                    </div>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                            <div className="active-left-panel collapse" id="help" data-parent="#leftaccordpanel">
                                                <div className="search-area">
                                                    <div className="form-group has-search">
                                                        <input type="text" className="form-control" placeholder="" />
                                                        <span className="fa fa-search form-control-feedback"></span>
                                                    </div>
                                                </div>
                                                <h2>Help</h2>
                                                <div className="w-267">
                                                    <p>1. A structured approach to planning design-led strategy and innovation. You
                                                        can use this to set up a Design Thinking Project from planning to prototype.
                                                    </p>
                                                    <p> 2. Create EPIC and associate Benchmarking, Capability Modeling, KPIs
                                                        scenarios. Or create new. You can add multiple EPICs</p>
                                                    <p> 3. Add Sub Epics and associate Benchmarking, Capability Modeling, KPIs
                                                        scenarios.</p>
                                                    <p> 4. Associate or Create new Network of Influence template.</p>
                                                    <p> 5. Click on BUILD to get started with Design Thinking process.</p>
                                                </div>
                                            </div>
                                            <div className="active-left-panel collapse" id="draw" data-parent="#leftaccordpanel">
                                                <div className="search-area">
                                                    <div className="form-group has-search">
                                                        <input type="text" className="form-control" placeholder="" />
                                                        <span className="fa fa-search form-control-feedback"></span>
                                                    </div>
                                                </div>
                                                <h2>Draw</h2>
                                                <div className="w-267 px-3 draw-list">
                                                    <a className="draw-link" data-toggle="collapse" href="#standard">
                                                        Standard
                                                    </a>
                                                    <div className="collapse show" id="standard">
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon1.png")} alt="" /></li>
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon2.png")} alt="" /></li>
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon3.png")} alt="" /></li>
                                                        </ul>
                                                    </div>

                                                    <a className="draw-link" data-toggle="collapse" href="#shapes">
                                                        Shapes
                                                    </a>
                                                    <div className="collapse show" id="shapes">
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon4.png")} alt="" /></li>
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon5.png")} alt="" /></li>
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon6.png")} alt="" /></li>
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon7.png")} alt="" /></li>
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon8.png")} alt="" /></li>
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon9.png")} alt="" /></li>
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon10.png")} alt="" /></li>
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon11.png")}alt="" /></li>
                                                        </ul>
                                                    </div>

                                                    <a className="draw-link" data-toggle="collapse" href="#postid">
                                                        Post ids
                                                    </a>
                                                    <div className="collapse show" id="postid">
                                                        <ul className="list-inline">
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon12.png")} alt="" />
                                                            </li>
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon13.png")} alt="" />
                                                            </li>
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon14.png")} alt="" />
                                                            </li>
                                                            <li className="list-inline-item"><img src={require("../../../common/images/epic-icon15.png")} alt="" />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- End Left Content --> */}
                                        {/* <!-- Start Body Content --> */}
                                        <div className="dt-content-wrapper">
                                            <div className="content-wraper">
                                                <div className="container-fluid">
                                                    <div className="row epic-version">
                                                        <div className="col-sm-12 col-md-8 col-lg-8 d-md-flex align-items-center pt-3">
                                                            <h2>Network of Experience</h2>
                                                        </div>
                                                        <div className="col-sm-12 col-md-4 col-lg-4 pt-3 text-right">
                                                            <ul className="list-inline pager-list">
                                                                <li className="list-inline-item"> <a href="#" className="btn-download"><i
                                                                            className="fas fa-cloud-download-alt"></i> Download</a></li>
                                                                <li className="list-inline-item">
                                                                    
                                                                    <Link to={`/dt-network-of-experience/${this.state.dtId}/${this.state.epicId}`}>
                                                                        Back</Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    {/* Epic */}
                                                    <div className="row highlight-sec">
                                                        <div className="w-100 justify-content-center d-flex">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                {
                                                                    this.props.noeData?this.props.noeData.map((item,i) => (
                                                                        <>
                                                                        <div className="d-flex justify-content-between texthead">
                                                                            <p>{item.name}</p>
                                                                            <div className="dropdown float-right dropleft">
                                                                                <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                                                                <i className="fas fa-ellipsis-h"></i>
                                                                                </a>
                                                                                {item.Association.length > 0 ?
                                                                                    <div className="dropdown-menu">
                                                                                    { item.Association.map((newEpic,newEpicIndex) => (
                                                                                        <>
                                                                                            <a key={newEpicIndex} className="dropdown-item" href="#">{newEpic.name}</a>
                                                                                            <div className="dropdown-divider"></div>
                                                                                        </>
                                                                                    ))
                                                                                    }
                                                                                    </div>
                                                                                :
                                                                                    <div className="dropdown-menu"><p className="dropdown-item">Not Available</p></div> 
                                                                                }
                                                                            </div>

                                                                            {/* <a href="#"><i className="fas fa-ellipsis-h"></i></a> */}
                                                                        </div>
                                                                        <div className="updated">
                                                                            <span>Added: <span className="txtblue">{item.Association.length} Scenarios</span></span>
                                                                            <span>Updated 1 day ago</span>
                                                                        </div>
                                                                        </>        
                                                                    )):null
                                                                }

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>
                                                    {/* Sub epic */}
                                                    <div className="row highlight-sec highlight-sec1 mt-4">
                                                        <div className="highlight-slider">
                                                            <div className="controlbtn">
                                                                <a href="#" className="pre-icon"><i className="fas fa-chevron-left"></i></a>
                                                                <a href="#" className="next-icon"><i
                                                                        className="fas fa-chevron-right"></i></a>
                                                            </div>
                                                            {
                                                                this.props.noeData?this.props.noeData.map((item,i) => (
                                                                    item.SubEpic?item.SubEpic.map((item1,i1) => (
                                                                        
                                                                            <div className="card">
                                                                                <div className="card-body">
                                                                                    <div className="d-flex justify-content-between texthead">
                                                                                        <p>{item1.name}</p>
                                                                                        <div className="dropdown float-right dropleft">
                                                                                            <a href="#" data-toggle="dropdown" className="dropdown-toggle">
                                                                                            <i className="fas fa-ellipsis-h"></i>
                                                                                            </a>
                                                                                            {item1.Association.length > 0 ?
                                                                                                <div className="dropdown-menu">
                                                                                                { item1.Association.map((newEpic,newEpicIndex) => (
                                                                                                    <>
                                                                                                        <a key={newEpicIndex} className="dropdown-item" href="#">{newEpic.name}</a>
                                                                                                        <div className="dropdown-divider"></div>
                                                                                                    </>
                                                                                                ))
                                                                                                }
                                                                                                </div>
                                                                                            :
                                                                                                <div className="dropdown-menu"><p className="dropdown-item">Not Available</p></div> 
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="updated">
                                                                                        <span>Added: <span className="txtblue">{item1.Association.length} Scenarios</span></span>
                                                                                        <span>Updated 1 day ago</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        
                                                                    )):null
                                                                )):null
                                                            }
                                                                
                                                        
                                                        </div>
                                                    </div>


                                                    <div className="bg-white border table-section mt-3 mb-4">

                                                        <div className="table-responsive">
                                                            {/* Header section */}
                                                            <div className="tabletop-details">
                                                                {
                                                                    this.state.data.map((item,i) => (
                                                                        item.LifeCycle.map((item1,i1) => (
                                                                            <div className="tablecol">                                                                    
                                                                                <h2>
                                                                                    <small>Step {i1+1}</small><br /> {item1.LifeCycleName}
                                                                                </h2>
                                                                                {
                                                                                    item1.Personas.map((item3,i3) => (
                                                                                        <ul className="list-inline mr-3">
                                                                                            <li className="list-inline-item">
                                                                                                <div className="custom-control custom-checkbox">
                                                                                                    <input type="checkbox" className="custom-control-input"
                                                                                                        id="customCheck" />
                                                                                                    <label className="custom-control-label"
                                                                                                        for="customCheck"></label>
                                                                                                </div>
                                                                                            </li>
                                                                                            <li className="list-inline-item">
                                                                                                <div className="process-sm-img" data-toggle="modal"
                                                                                                    data-target="#stakeholderModal">
                                                                                                    <img src={item.FilePath != null && item.FilePath !== ""?item.FilePath:require("../../../common/images/LogIn_image.png")} alt="" />
                                                                                                </div>
                                                                                            </li>
                                                                                            <li className="list-inline-item">{item3.PersonaName}</li>
                                                                                        </ul>
                                                                                    ))
                                                                                }
                                                                                
                                                                            </div>
                                                                        ))
                                                                    ))
                                                                }
                                                                <div className="tablecol tablecolright">
                                                                    <small>Stages</small>
                                                                    <Link to={`/dt-network-of-experience/${this.state.dtId}/${this.state.epicId}`} className="btndown ml-2"><i className="fas fa-chevron-down"></i></Link>
                                                                    
                                                                    <Link to={`/dt-network-of-experience/${this.state.dtId}/${this.state.epicId}`} className="btn-close"><i className="fas fa-times"></i></Link>
                                                                </div>
                                                            </div>

                                                            <table className="table table-bordered process-table">
                                                                <thead className="thead-dark">

                                                                    <tr>
                                                                        <th>
                                                                            <div
                                                                                className="d-flex justify-content-between align-items-center">
                                                                                <span className="tbltxt1">Stages</span> <span>
                                                                                    <a href="#"><i className="fas fa-plus"></i></a>
                                                                                    <a href="#" className="ml-1"><i className="fas fa-minus"></i></a></span>
                                                                            </div>
                                                                        </th>
                                                                        {
                                                                            NoeData?NoeData.map((stages,l) => (
                                                                                <th colspan={stages.StageName !== null && stages.SubStages.length}>
                                                                                    <div className="d-flex justify-content-between align-items-center">
                                                                                        <div>{stages.StageName} </div>
                                                                                        <div className="d-flex">
                                                                                            <div className="process-sm-img" data-toggle="modal" data-target="#stakeholderModal">
                                                                                                <img src={require("../../../common/images/LogIn_image.png")} alt="" />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </th>
                                                                            )):null                                                                         
                                                                        }
                                                                        

                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr className="substages">
                                                                        <td>
                                                                            <div
                                                                                className="d-flex justify-content-between align-items-center">
                                                                                <span className="tbltxt2">Sub-Stages</span> <span>
                                                                                    <a href="#"><i className="fas fa-plus"></i></a>
                                                                                    <a href="#" className="ml-1"><i className="fas fa-minus"></i></a></span>
                                                                            </div>
                                                                        </td>
                                                                        {
                                                                            NoeData?NoeData.map((stages,l) => (
                                                                                stages.StageName!==null&&stages.SubStages.map((substage,m) => (
                                                                                    <td><span className="tbltxt3">{substage.StageName}</span></td>
                                                                                ))                   
                                                                            )):null
                                                                        }
                                                                        
                                                                        
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span className="tbltxt4">Processes / Activities</span></td>
                                                                        {
                                                                            NoeData?NoeData.map((stages,l) => (
                                                                                stages.StageName!==null&&stages.SubStages.map((substage,m) => (
                                                                                <td>
                                                                                    {
                                                                                        substage.Categories.map((category,cattInd) => (
                                                                                            <div className="border-red">
                                                                                            {
                                                                                                category.CategoryName == "Activities" &&
                                                                                                category.CategoryText.length>0?
                                                                                                category.CategoryText.map((text,textInd) => (
                                                                                                    <>
                                                                                                        <p>{textInd+1} {text.ProcessName}
                                                                                                        {
                                                                                                            text.ColorCode == "#94ce65"?
                                                                                                            <span className="dot greendot"></span>
                                                                                                            :text.ColorCode == "#f6c851"?
                                                                                                            <span className="dot yellowdot"></span>
                                                                                                            :text.ColorCode == "#e75c53"?
                                                                                                            <span className="dot reddot"></span>
                                                                                                            :null
                                                                                                        }
                                                                                                        </p>
                                                                                                        {/* <p><a href="#">2. Leveraging Brand</a><span className="dot yellowdot"></span></p> */}
                                                                                                    </>
                                                                                                )):null
                                                                                            }
                                                                                            </div>
                                                                                        ))
                                                                                    }                   
                                                                                </td>
                                                                                ))
                                                                            )):null
                                                                        }
                                                                        


                                                                    </tr>
                                                                    <tr className="bg-gray">
                                                                        <td><span className="tbltxt4">Touchpoints</span></td>
                                                                        {
                                                                            NoeData?NoeData.map((stages,l) => (
                                                                                stages.StageName!==null&&stages.SubStages.map((substage,m) => (
                                                                                <td>
                                                                                    {
                                                                                        substage.Categories.map((category,cattInd) => (
                                                                                            <div className="border-blue">
                                                                                            {
                                                                                                category.CategoryName == "Touchpoints" &&
                                                                                                category.CategoryText.length>0?
                                                                                                category.CategoryText.map((text,textInd) => (
                                                                                                    <>
                                                                                                        <p>{textInd+1} {text.TouchPointName}</p>
                                                                                                        {/* <p><a href="#">2. Leveraging Brand</a><span className="dot yellowdot"></span></p> */}
                                                                                                    </>
                                                                                                )):null
                                                                                            }
                                                                                            </div>
                                                                                        ))
                                                                                    }                   
                                                                                </td>
                                                                                ))
                                                                            )):null
                                                                        }
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <span className="tbltxt4 d-block">Feelings/Emotional
                                                                                Experience</span>
                                                                            <div className="d-flex align-items-center mt-3">
                                                                                <span className="mr-1"><img src={require("../../../common/images/green-icon.png")} alt="" /></span>
                                                                                <span className="tbltxt6">Positive</span>
                                                                            </div>
                                                                            <div className="d-flex align-items-center mt-3">
                                                                                <span className="mr-1"><img src={require("../../../common/images/yellow-icon.png")} alt="" /></span>
                                                                                <span className="tbltxt6">Neutral</span>
                                                                            </div>
                                                                            <div className="d-flex align-items-center mt-3">
                                                                                <span className="mr-1"><img src={require("../../../common/images/red-icon.png")} alt="" /></span>
                                                                                <span className="tbltxt6">Negative</span>
                                                                            </div>
                                                                            <span className="tbltxt6 mt-2 d-block">Drag & drop the dots
                                                                                and add comment</span>
                                                                        </td>
                                                                        <td colspan="6" >
                                                                            <div style={{height:"200px"}}>
                                                                                {
                                                                                    dataForChart.length>0 &&
                                                                                    <Graph data={dataForChart}/>
                                                                                }    
                                                                            </div>
                                                                        </td>
                                                                        
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span className="tbltxt6">List the Experiences</span></td>
                                                                        {
                                                                            NoeData?NoeData.map((stages,l) => (
                                                                                stages.StageName!==null&&stages.SubStages.map((substage,m) => (
                                                                                <td>
                                                                                    {
                                                                                        substage.Categories.map((category,cattInd) => (
                                                                                            <div className="border-blue">
                                                                                            {
                                                                                                category.CategoryName == "Experiences" &&
                                                                                                category.CategoryText.length>0?
                                                                                                category.CategoryText.map((text,textInd) => (
                                                                                                    <>
                                                                                                        <p>{textInd+1} {text.ExperienceName}</p>
                                                                                                        {/* <p><a href="#">2. Leveraging Brand</a><span className="dot yellowdot"></span></p> */}
                                                                                                    </>
                                                                                                )):null
                                                                                            }
                                                                                            </div>
                                                                                        ))
                                                                                    }                   
                                                                                </td>
                                                                                ))
                                                                            )): null
                                                                        }
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span className="tbltxt6">Raise a Flag <i className="fas fa-flag"></i></span></td>
                                                                        <td>
                                                                            <div className="border-red mb-1">
                                                                                <span className="tbltxt6 d-flex"><i
                                                                                        className="fas fa-flag mr-1"></i>
                                                                                    <span>Enter Some Text</span>
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="border-red mb-1">
                                                                                <span className="tbltxt6 d-flex"><i
                                                                                        className="fas fa-flag mr-1"></i>
                                                                                    <span>Enter some text</span>
                                                                                </span>
                                                                            </div>
                                                                        </td>
 
                                                                    </tr>
                                                                    {/* <tr>
                                                                        <td>
                                                                            <span className="tbltxt4">Stakeholders</span>
                                                                            <span className="tbltxt5 text-right d-block">Impactor</span>
                                                                        </td>
                                                                        <td>
                                                                            <div
                                                                                className="d-flex align-items-center staktxt border-red ">
                                                                                <div className="process-sm-img">
                                                                                    <img src={require("../../../common/images/LogIn_image.png")} alt="" />
                                                                                </div>
                                                                                <span>Researcher,<br />Department</span>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="d-flex align-items-center staktxt border-red ">
                                                                                <div className="process-sm-img">
                                                                                    <img src={require("../../../common/images/LogIn_image.png")} alt="" />
                                                                                </div>
                                                                                <span>Researcher,<br />Department</span>
                                                                            </div>
                                                                        </td>
 
                                                                    </tr> */}
                                                                    
                                                                    {
                                                                        NoeData?NoeData.map((stages,l) => (
                                                                            stages.StageName!==null&&stages.SubStages.map((substage,m) => (
                                                                        
                                                                            substage.Categories.map((category,cattInd) => (
                                                                                
                                                                                    category.CategoryName == "Impactee" &&
                                                                                    category.CategoryText.length>0?
                                                                                    category.CategoryText.map((text,textInd) => (
                                                                                        <tr>
                                                                                            <td><span className="tbltxt5 text-right">Impactee</span></td>
                                                                                            <td>
                                                                                                <div className="d-flex align-items-center staktxt border-red ">
                                                                                                <div className="process-sm-img">
                                                                                                    <img src={require("../../../common/images/LogIn_image.png")} alt="" />
                                                                                                </div>
                                                                                                    {/* <span>Researcher,<br />Department</span> */}
                                                                                                </div>
                                                                                            </td>

                                                                                        </tr>
                                                                                    )):null
                                                                                    
                                                                                ))
                                                                                
                                                                            ))
                                                                        )):null
                                                                    }
                                                                    
                                                                    <tr className="bg-gray">
                                                                        <td><span className="tbltxt4">Painpoints</span></td>
                                                                        {

                                                                            NoeData?NoeData.map((stages,l) => (
                                                                                stages.StageName!==null&&stages.SubStages.map((substage,m) => (
                                                                                <td>
                                                                                    {
                                                                                        substage.Categories.map((category,cattInd) => (
                                                                                            <div className="border-blue">
                                                                                            {
                                                                                                category.CategoryName == "Painpoints" &&
                                                                                                category.CategoryText.length>0?
                                                                                                category.CategoryText.map((text,textInd) => (
                                                                                                    <>
                                                                                                        <p>{textInd+1} {text.PainPointName}</p>
                                                                                                        {/* <p><a href="#">2. Leveraging Brand</a><span className="dot yellowdot"></span></p> */}
                                                                                                    </>
                                                                                                )):null
                                                                                            }
                                                                                            </div>
                                                                                        ))
                                                                                    }                   
                                                                                </td>
                                                                                ))
                                                                            )):null
                                                                        }
                                                                    </tr>
                                                                    <tr>
                                                                        <td><span className="tbltxt4">Opportunities</span></td>
                                                                        {
                                                                            NoeData?NoeData.map((stages,l) => (
                                                                                stages.StageName!==null&&stages.SubStages.map((substage,m) => (
                                                                                <td>
                                                                                    {
                                                                                        substage.Categories.map((category,cattInd) => (
                                                                                            <div className="border-blue">
                                                                                            {
                                                                                                category.CategoryName == "Opportunities" &&
                                                                                                category.CategoryText.length>0?
                                                                                                category.CategoryText.map((text,textInd) => (
                                                                                                    <>
                                                                                                        <p>{textInd+1} {text.OportunityName}</p>
                                                                                                        {/* <p><a href="#">2. Leveraging Brand</a><span className="dot yellowdot"></span></p> */}
                                                                                                    </>
                                                                                                )):null
                                                                                            }
                                                                                            </div>
                                                                                        ))
                                                                                    }                   
                                                                                </td>
                                                                                ))
                                                                            )):null
                                                                        }
                                                                    </tr>

                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- End Body Content --> */}
                                </div>
                            </div>
                            {/* <!-- /End container-fluid --> */}
                        </div>
                        {/* <!-- End of Main Content --> */}
                    </div>
                    {/* <!-- End of Content Wrapper --> */}
                </DesignThinkingNoeStyle>
            </>
        )
    }
}
const mapStatetoProps= (state) =>{
    return {
      noeData: state.noe.noeBySubepicData,
      dtProjects: state.epicScreenData.dtProjects,
    }
  }
  
  export default connect(mapStatetoProps,{
    fetchNOEBySubEpic,
    fetchDesignThinkingProjectDetails
  })(DesignThinkingNoeDetails);
  