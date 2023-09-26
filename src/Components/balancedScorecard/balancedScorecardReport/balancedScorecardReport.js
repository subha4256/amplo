import React , { Component } from 'react';
import DashboardHeader from "../../includes/dashboardHeader/DashboardHeader";
import FooterComponent from "../../includes/dashboardFooter/FooterComponent";
import AsideComponent from "../../includes/asideComponent/AsideComponent";
import BalancedScorecardBreadcrumb from '../balancedScorecardBreadcrumb';
import BalancedScorecardGoalSetting from '../balancedScorecardGoalSetting';
import BalancedScorecardObjectivesTarget from '../balancedScorecardObjectivesTargets';
import {BalancedScorecardWrapper} from '../styling/balancedScorecard';
import {jsPlumb} from 'jsplumb'; 
import axios from 'axios';
import moment from 'moment';
import CacheStorage from '../../../utils/CacheStorage';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReactDOMServer from 'react-dom/server';
import $ from 'jquery';
import {Canvg} from 'canvg';
import htmlToImage from 'html-to-image';
const config = require('../../../config');

class BalancedScorecardReport extends Component{
    constructor(props){ 
        super(props);
    }
    state = {
        goalSetting : [{
            "id": 0,
            "title": "Vision",
            "description": "Double Tap to Edit."
        },{
            "id": 0,
            "title": "Purpose",
            "description": []
        },{
            "id": 0,
            "title": "StrategicPriorities",
            "description": []
        },{
            "id": 0,
            "title": "StrategicResults",
            "description": []
        }],
        categoryRows : [],
        bscId : this.props.match.params.bscId?this.props.match.params.bscId:0,
        fromDate : this.props.match.params.fromDate?this.props.match.params.fromDate:"",
        toDate : this.props.match.params.toDate?this.props.match.params.toDate:"",
        bscName : "",
        connections : [],
        withActuals : (this.props.match.params.fromDate && this.props.match.params.toDate)?true:false,
        selectedToDate : this.props.match.params.toDate?new Date(this.props.match.params.toDate):"",
        selectedFromDate : this.props.match.params.fromDate?new Date(this.props.match.params.fromDate):""
    }
    componentDidMount = () => {
        jsPlumb.ready(() => {
            var instance = jsPlumb.getInstance({
                Endpoint: ["Dot", {radius: 2}],
                HoverPaintStyle: {stroke: "#1e8151", strokeWidth: 2 },
                ConnectionOverlays: [
                    [ "Arrow", {
                        location: 1,
                        id: "arrow",
                        length: 14,
                        foldback: 0.8
                    } ],
                ],
                Container: "canvas"
            });
            instance.registerConnectionType("basic", {anchor:[ "Perimeter", { shape:"Ellipse" } ]});
            window.jsp = instance;
            jsPlumb.fire("jsPlumbDemoLoaded", instance);   
        });
        if(this.state.bscId !== 0){
            this.fetchBsc()
        }
    }
    fetchBsc = async () => {
        let bsc = {};
        if(this.state.fromDate === '' && this.state.toDate === ''){
            bsc = await axios.post(config.laravelBaseUrl + "getBSCReportKpi",{
                BalanceScoreCardId : this.state.bscId,
                FromDate : this.state.fromDate,
                ToDate : this.state.toDate
            },{
                headers: {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
                }
            });
        }else{
            bsc = await axios.post(config.laravelBaseUrl + "getBscReportKpiActual",{
                BalanceScoreCardId : this.state.bscId,
                FromDate : this.state.fromDate,
                ToDate : this.state.toDate
            },{
                headers: {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
                }
            });
        } 
        bsc = bsc.data.data;
        this.setState({
            bscName : bsc.title,
            goalSetting : bsc.goalsetting,
            categoryRows : bsc.strategicobjective
        },()=>{
            for(let i = 0; i < bsc.Ovals.length; i++){
                this.fetchNewNode(bsc.Ovals[i].x,bsc.Ovals[i].y,bsc.Ovals[i].CategoryId,bsc.Ovals[i].OvalId,bsc.Ovals[i].OvalColor,bsc.Ovals[i].OvalText);
            }
            for(let i=0; i < bsc.connections.length; i++){
                window.jsp.connect({
                    source : bsc.connections[i].source,
                    target : bsc.connections[i].target,
                    anchor : [ "Perimeter", { shape:"Circle" } ]
                })
            }
        })
    }
    fetchNewNode = (x, y, parentId ,fid ,clnmm,text) => {
        let d = document.createElement("div");
        let innerD = document.createElement("div");
        let p = document.createElement("p");
        let id = fid;
        let clnm = "oval-shape "+clnmm;
        p.innerHTML = text;
        innerD.appendChild(p);
        d.className = clnm;
        d.id = id;
        innerD.style.zIndex = "1";
        d.appendChild(innerD);
        d.style.left = x;
        d.style.top = y;
        document.querySelector("tr#"+CSS.escape(parentId)+" .oval-shape-row").appendChild(d);
        this.fetchInitNode(d);
    }
    fetchInitNode = (el) => {
        window.jsp.makeSource(el, {
            filter: ".ep",
            anchor:[ "Perimeter", { shape:"Circle" } ],
            connectorStyle: { stroke: "#5c96bc", strokeWidth: 2, outlineStroke: "transparent", outlineWidth: 4 },
            connectionType:"basic",
            extract:{
                "action":"the-action"
            },
            maxConnections: -1,
            onMaxConnections: function (info, e) {
                alert("Maximum connections (" + info.maxConnections + ") reached");
            }
        });

        window.jsp.makeTarget(el, {
            dropOptions: { hoverClass: "dragHover" },
            anchor:[ "Perimeter", { shape:"Ellipse" } ],
            allowLoopback: true
        });
        window.jsp.fire("jsPlumbDemoNodeAdded", el);
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.match.params.fromDate != this.state.fromDate || nextProps.match.params.toDate != this.state.toDate || nextProps.match.params.bscId != this.state.bscId){
            this.setState({
                fromDate : nextProps.match.params.fromDate ,
                toDate : nextProps.match.params.toDate,
                bscId : nextProps.match.params.bscId
            },()=>{
                this.fetchBsc()
            })
        }
    }

    fromDateChangeHandler = (date) => {
        this.setState({
            selectedFromDate : date
        })
    }

    toDateChangeHandler = (date) => {
        this.setState({
            selectedToDate : date
        })
    }

    runReportHandler = () => {
        if(this.state.selectedFromDate && this.state.selectedToDate){
            this.props.history.push('/balanced-scorecard/report/'+this.state.bscId+"/"+moment(this.state.selectedFromDate).format("YYYY-MM-DD")+"/"+moment(this.state.selectedToDate).format("YYYY-MM-DD"))
        }
    }
    downloadpdfReport = () => {
var targetElem = document.getElementById('toCanvas')

// var elements = $(targetElem).find('svg').map(function() {
//     var svg = $(this);
//     var canvas = $('<canvas></canvas>').css({position: 'absolute', left:svg.css('left'), top: svg.css('top')});
// $(canvas).addClass($(svg).attr('class'))
//     svg.replaceWith(canvas);

//     // Get the raw SVG string and curate it
//     var content = svg.wrap('<p></p>').parent().html();
//     svg.unwrap();

//     Canvg.from(canvas, content);

//     return {
//         svg: svg,
//         canvas: canvas
//     };
// });

// At this point the container has no SVG, it only has HTML and Canvases.
// html2canvas(targetElem, {
//   onrendered: function(canvas) {
//       // Put the SVGs back in place
//       elements.each(function() {
//           this.canvas.replaceWith(this.svg);
//       });

//       $("#toCanvas").append(canvas);
//   }
// });


         $('.jtk-connector').each(function() {

            
            // for every SVG element created by JsPlumb for connections ...
            var left = this.style.left 
            var top = this.style.top 
            this.removeAttribute( 'style' );
            this.removeAttribute( 'position' );
            // this.setAttribute( 'width' ,  this.getAttribute ( 'width' ) + 'px' );
            // this.setAttribute( 'height' , this.getAttribute ( 'height' ) + 'px' );
            // this.setAttribute( 'preserveAspectRatio' , 'xMidYMid meet' );
            // this.setAttribute( 'xmlns' , ' http : // www . w3 . org / 2000 / svg ' );
            // this.children [0] is the path for connection line
            // this.children [1] is the path for connection arrow shape
            // this.children[0]?this.children[0].setAttribute ( 'xmlns' , ' http : // www . w3 . org / 2000 / svg ' ):console.log('nil');
            // this.children[1]?this.children[1].setAttribute ( 'xmlns' , ' http : // www . w3 . org / 2000 / svg ' ):console.log('nil');
            // this.setAttribute ( 'viewbox' , '0 0' + parseInt ( this.getAttribute( 'width' ), 10 ) + '' + parseInt ( this.getAttribute ( 'height' ), 10 ));
            // this.children[0].setAttribute ( 'stroke-width' , '2px' );
            // this.children[0].setAttribute ( 'stroke' , '# c9c9c9' );
            // this.children[1]?this.children[1].setAttribute ( 'fill' , '# c9c9c9' ):console.log('nil');
            // this.children[1]?this.children[1].setAttribute ( 'stroke' , '# c9c9c9' ):console.log('nil')
        
        $(this).wrap( '<span style = "position: absolute; left:' + left + '; top:' + top + ';"> </span>' );
          });
          
          $('td p').each(function(){
              
            var left;
            var top;  
            if(parseInt(this.style.top)>0){
                top = this.style.top
              }
              if(parseInt(this.style.left)>0){
                  left = this.style.left
              }
            let fontWeight = $(this).css("font-weight");
            let color = $(this).css("color");
            let align = $(this).css("text-align");
            let mBottom = $(this).css("margin-bottom");
            let minHeight = $(this).css("min-height");
            let fontSize = $(this).css("font-size");
            var width = $(this).css("width");
            var height = $(this).css("height")
            var newElement = $("<div></div>");
            let display = $(this).css('display');
            if(display == "flex"){
                
                $(newElement).css({"align-items":"center","justify-content":"center","display":"flex"});
            }
            $(newElement).style = this.style
            $(newElement).css({"color":color,"font-weight":fontWeight,
           "font-size":fontSize,"text-align":align,"margin-bottom":mBottom,"min-height":minHeight,
        "width":width,"height":height});
        var text = $(this).text();
        $(newElement).text(text)
           
           $(this).replaceWith(newElement);
         })
        
         domtoimage.toPng(document.getElementById('toCanvas'))
         .then(function (dataUrl) {
             
            const pdf = new jsPDF('l','mm',[1370,800]);
             pdf.addImage(dataUrl, 'PNG', 10, 10, 439.83333333, 251.66666667);
             pdf.addPage()
             html2canvas(document.getElementById("canvas")).then(canvas => {
                // document.body.appendChild(canvas);
                // doc.addPage();
                var imgData = canvas.toDataURL(
                    'image/png');              
              
                pdf.addImage(imgData, 'PNG', 10, 10,439.83333333,251.66666667);
                pdf.save("download.pdf");
               
            });  
            //  pdf.save('download.pdf')
             //   
         })
         .catch(function (error) {
             console.error('oops, something went wrong!', error);
         });
       
        
                
       
      }
    render(){
        return(
            <>
                <DashboardHeader />
                <BalancedScorecardWrapper id="wrapper">
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* <!-- Main Content --> */}
                        <div id="content">
                            <BalancedScorecardBreadcrumb />
                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid container-dashboard">
                                <div className="row">
                                    <div className="dt-screen-main" style={{overflow:"hidden"}}>
                                        {/* <!-- Start Body Content --> */}
                                        <div className="dt-content-wrapper">
                                            <div className="content-wraper">
                                            <div className="container-fluid">
                                                {/* <!-- Balanced Scorecard Section --> */}
                                                    <div className="row balanced-version">
                                                    <div className="col-sm-12 col-md-12 col-lg-9 d-md-flex align-items-center pt-3">
                                                        <h2 style={{width:"28%"}}>Global Business Initiative</h2>
                                                        <input 
                                                        style={{width:"35%"}}
                                                        type="text" 
                                                        readOnly
                                                        value={this.state.bscName}
                                                        className="form-control" 
                                                        placeholder="Global Business Initiative Name" 
                                                        />
                                                        <div className='d-flex pl-3'>
                                                            {this.state.fromDate ? <><span><b>From Date :</b></span> <span>{moment(this.state.fromDate).format('DD/MM/YYYY')}</span></> : null }
                                                            {this.state.toDate ? <><span className="ml-2"><b>To Date :</b></span> <span>{moment(this.state.toDate).format('DD/MM/YYYY')}</span></> : null }
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-12 col-lg-3 pt-3 text-right">
                                                        <ul className="list-inline pager-list">
                                                            <li className="list-inline-item">
                                                                <a href="#" onClick={this.downloadpdfReport} className="btn-download"><i className="fas fa-cloud-download-alt"></i> Download Report</a>
                                                            </li>
                                                            <li className="list-inline-item"><a href="#" onClick={this.props.history.goBack} className="btn btn-back">Back</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="downloadReport" id="toCanvas">
                                                <BalancedScorecardGoalSetting
                                                    editDoubleClickHandler={()=>{}}
                                                    GoalSettingBlurHandler={()=>{}}
                                                    goalSettingChangeHandler={()=>{}}
                                                    GoalSetting={this.state.goalSetting}
                                                    addGoalSettingRow={()=>{}}
                                                    arrayGoalSettingHandler={()=>{}}
                                                    arrayGoalSettingHandlerEdit={()=>{}}
                                                    arrayGoalSettingBlurHandler={()=>{}}
                                                    goalSettingDeleteRowHandler={()=>{}}
                                                    report = "report"
                                                />
                                                </div>
                                                <div id="canvas">
                                                <BalancedScorecardObjectivesTarget
                                                    categoryRows = {this.state.categoryRows}
                                                    kpiDeleteClickHandler = {()=>{}}
                                                    report = "report"
                                                    withActuals = {this.state.withActuals}
                                                    fromDateChangeHandler = {this.fromDateChangeHandler.bind(this)}
                                                    toDateChangeHandler = {this.toDateChangeHandler.bind(this)}
                                                    selectedFromDate = {this.state.selectedFromDate}
                                                    selectedToDate = {this.state.selectedToDate}
                                                    runReportHandler = {this.runReportHandler.bind(this)}
                                                />
                                                </div>
                                            {/* <!-- End Balanced Scorecard Section --> */}
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
                </BalancedScorecardWrapper>
                <AsideComponent />
                <FooterComponent />
            </>
        );
    }
}

export default BalancedScorecardReport;
