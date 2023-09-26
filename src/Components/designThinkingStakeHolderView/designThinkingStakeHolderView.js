import React, {Component} from "react";
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import FooterComponent from "../includes/dashboardFooter/FooterComponent";
import AsideComponent from "../includes/asideComponent/AsideComponent";
import { DesignThinkingStakeHolderViewWrapper } from './Styling/designThinkingStakeHolderView';
import {jsPlumb} from 'jsplumb';
import DesignThinkingStakeHolderViewBreadCrumb from './DesignThinkingStakeHolderViewBreadCrumb'; 
import DesignThinkingStakeHolderViewSidebar from './DesignThinkingStakeHolderViewSidebar';
import DesignThinkingStakeHolderCircles from './DesignThinkingStakeHolderCircles';
import DesignThinkingStakeHolderDataPopUp from './DesignThinkingStakeHolderDataPopUp';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchStakeHolders, fetchNoi } from '../../actions/designThinkingStakeHolderViewActions';
import {designThinkingArrowManager} from './designThinkingArrowManager';
import {designThinkingStakeHolderScopeReturner} from './designThinkingStakeHolderScopeReturner';
import {designThinkingStakeHolderEndPoints} from './designThinkingStakeHolderEndPoints';
import {responseMessage} from '../../utils/alert';
import $ from "jquery"
import html2canvas from "html2canvas";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { 
    fetchNetworkOfInfluenceTemplates,
} from '../../actions/epicScreenActions';
import domtoimage from 'dom-to-image';




const config = require('../../config');

class DesignThinkingStakeHolderView extends Component{
    constructor(props){
        super(props);
        this.arrowTypeClickHandler.bind(this)
        this.circleClickHandler.bind(this)
        this.modalToggle.bind(this)
        this.searchChangeHandler.bind(this)
        this.stakeHolderListClickHandler.bind(this)
        this.StakeHoldersSaveHandler.bind(this)
        this.arrowImpactClickHandler.bind(this)
        this.initNode.bind(this)
        this.newNode.bind(this)
        this.newNodeLoad.bind(this)




// $(document).ready(function(){
//     $('[data-toggle="tooltip"]').tooltip();   
//   });


    }
    
    state = {
        arrowType : "hasInfluenced",
        arrowImpact : "impactMedium",
        currentStakeholder : {
            stakeholderId : '',
            stakeholderName : '',
            stakeholderType : '',
            noOfConnections : '',
            connections : []
        },
        setWithPopUp : false,
        setPopUpData : {

        },
        searchFilter : {
            StakeHolderType : false,
            DepartmentType : false,
            Location : false
        },
        isOpen : false,
        endpoints : designThinkingStakeHolderEndPoints(),
        stakeHoldersSearch : "",
        addStakeHolderNode : '',
        stakeHolderTypeForColour : "",
        jsPlumbInstance : "",
        connections : [],
        NoiId:this.props.match.params.noiId?this.props.match.params.noiId:0,
        endpointsRecord : [],
        imageUrl:""
    }

    stakeHolderListClickHandler(id,name,type,image){
        // console.log(e.target.getElementsByTagName("p")[0].innerHTML)
        this.setState({
            addStakeHolderNode : {
                id : id,
                name : name,
                type : type,
                image : image
            },
            stakeHolderTypeForColour : type
        })
    }

  
    async componentDidMount(){

        this.props.fetchNetworkOfInfluenceTemplates();
     

        jsPlumb.ready(() => {
            var instance = jsPlumb.getInstance({
                Endpoint: ["Dot", {radius: 2}],
                Connector:"Straight",
                HoverPaintStyle: {stroke: "#000000", strokeWidth: 2 },
                Container: "canvas"
            });
            
            instance.registerConnectionType("basic", { anchor:[ "Perimeter", { shape:"Circle" } ], connector:"Straight" });
        
            window.jsp = instance;
        
            var canvas = document.getElementById("canvas");
            var windows = jsPlumb.getSelector("#canvas .network-circle");
            
            instance.bind("click",(c) => {
                let curr_conenctions = [...this.state.connections];
                let index_obj = curr_conenctions.map((obj) => obj.conn_id).indexOf(c.id)
                curr_conenctions.splice(index_obj,1)
                this.setState({
                    connections : curr_conenctions
                },()=>instance.deleteConnection(c))
            });
        
            instance.bind("connection", (info) => {
                if(info.connection.source.id ===  info.connection.target.id){
                    instance.deleteConnection(info.connection);
                }else{
                    let curr_conenctions = [...this.state.connections];
                    let influence = "";
                    let impact = "";
                    let index = null;
                    if(this.state.setWithPopUp === true){
                        influence = this.state.setPopUpData.influence;
                        impact = this.state.setPopUpData.impact;
                        index = this.state.setPopUpData.index;
                    }else{
                        switch(this.state.arrowType){
                            case "hasInfluenced":
                                influence = "has";
                            break;
                            case "isInfluenced":
                                influence = "is";
                            break;
                            case "equalInfluenced":
                                influence = "equal";
                            break; 
                        }
                        switch(this.state.arrowImpact){
                            case "impactLow":
                                impact = "low";
                            break;
                            case "impactMedium":
                                impact = "medium";
                            break;
                            case "impactStrong":
                                impact = "strong";
                            break; 
                        }
                    }
                    if(index === null){
                        curr_conenctions.push({
                            conn_id : info.connection.id,
                            source : info.connection.source.id,
                            target : info.connection.target.id,
                            influence : influence,
                            impact : impact
                        });
                    }else{
                        curr_conenctions[index] = {
                            conn_id : info.connection.id,
                            source : info.connection.source.id,
                            target : info.connection.target.id,
                            influence : influence,
                            impact : impact
                        }
                    }
                    this.setState({
                        connections : curr_conenctions,
                        setWithPopUp : false,
                        setPopUpData : {}
                    });
                }
            });
        
            jsPlumb.on(canvas, "dblclick", (e) => {
                this.newNode(e.offsetX, e.offsetY);
            });
        
            instance.batch(() => {
                for (var i = 0; i < windows.length; i++) {
                    this.initNode(windows[i], true);
                }
            });
        
            jsPlumb.fire("jsPlumbDemoLoaded", instance);
            this.setState({
                jsPlumbInstance : instance
            })
        });
        let [stakeholders, noi] = await axios.all([axios.get(config.laravelBaseUrl+'getDesignThinkingStakeHolders', {
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        }),
        axios.get(config.laravelBaseUrl+'getNetworkOfInfluence/'+this.state.NoiId, {
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        })
        ]);
        this.props.fetchNoi(noi);
        noi = noi.data.data;
        if(noi != ''){
            document.getElementById("noi_name").value = noi.Title;
            for(let i = 0; i < noi.network.length; i++ ){
                this.newNodeLoad(noi.network[i].x,noi.network[i].y,noi.network[i].id,noi.network[i].Image)
            }
            for(let i = 0; i < noi.connections.length; i++){
                let ep_conn = designThinkingStakeHolderScopeReturner(this.state.endpointsRecord,noi.connections[i].source,noi.connections[i].destination,noi.connections[i].influence,noi.connections[i].impact)
                window.jsp.connect({
                    source:ep_conn.source,
                    target:ep_conn.target
                });
            }
            
        }
        this.props.fetchStakeHolders(stakeholders);
    }
    popUpInfluenceHandler(influence,connection,impact){
        let conns = window.jsp.getAllConnections();
        let ind = conns.map((conn)=>conn.id).indexOf(connection.conn_id);  
        let connec = conns[ind];
        let source = connection.source;
        let target = connection.target;
        let curr_conenctions = [...this.state.connections];
        let index_obj = curr_conenctions.map((obj) => obj.conn_id).indexOf(connection.conn_id)
        curr_conenctions.splice(index_obj,1,{})
        this.setState({
            connections : curr_conenctions,
            setWithPopUp : true
        },()=>{
            window.jsp.deleteConnection(connec)
            let ep_conn = designThinkingStakeHolderScopeReturner(this.state.endpointsRecord,source,target,influence,impact)
            this.setState({
                setPopUpData : {
                    influence : influence,
                    impact : impact,
                    index : index_obj
                }
            },()=>{
                window.jsp.connect({
                    source:ep_conn.source,
                    target:ep_conn.target
                });
            })
        })
    }
    initNode = (el) => {
        window.jsp.draggable(el,{
            containment:"canvas",
            stop:(el) => {
                el.el.classList.add("dragStoppedStopClick")
            }
        });
        window.jsp.fire("jsPlumbDemoNodeAdded", el);
    }
    searchFilterHandler = (e) => {
        let filters = {...this.state.searchFilter};
        filters[e.target.id] = !filters[e.target.id];
        this.setState({
            searchFilter : filters
        })
    }
    newNodeLoad = (x,y,idn,img) => {
        let d = document.createElement("div");
        let id = idn
        let cll = "network-circle circle-img circle-green";
        d.className = cll;
        d.id = id;
        d.onclick = (e)=>this.circleClickHandler(e);
        d.onmousemove = function() {
          
           $('[data-toggle="tooltip"]').tooltip();   

        }
        if(img != null && img != ''){
            d.innerHTML = '<img src="'+config.ApiBaseUrl+'StakeHoldersImages/'+img+'" style="pointer-events:none; >';
        }
        d.style.left = x ;
        d.style.top = y ;
        window.jsp.getContainer().appendChild(d);
        this.initNode(d);
        let bilow = window.jsp.addEndpoint(d,this.state.endpoints.biArrowEndpointLow);
        let bimed = window.jsp.addEndpoint(d, this.state.endpoints.biArrowEndpointMed);
        let bistr = window.jsp.addEndpoint(d, this.state.endpoints.biArrowEndpointStrong);
        let islow = window.jsp.addEndpoint(d, this.state.endpoints.isInfluencedEndpointLow);
        let ismed = window.jsp.addEndpoint(d, this.state.endpoints.isInfluencedEndpointMed);
        let isstr = window.jsp.addEndpoint(d, this.state.endpoints.isInfluencedEndpointStrong);
        let haslow = window.jsp.addEndpoint(d, this.state.endpoints.hasInfluencedEndpointLow);
        let hasmed = window.jsp.addEndpoint(d, this.state.endpoints.hasInfluencedEndpointMed);
        let hasstr = window.jsp.addEndpoint(d, this.state.endpoints.hasInfluencedEndpointStrong);
        let eprec = [...this.state.endpointsRecord];
        eprec[Number(id)] = {
            bilow : bilow,
            bimed : bimed,
            bistr : bistr,
            islow : islow,
            ismed : ismed,
            isstr : isstr,
            haslow : haslow,
            hasmed : hasmed,
            hasstr : hasstr
        }
        this.setState({
            endpointsRecord : eprec
        },()=>designThinkingArrowManager(this.state.arrowType, this.state.arrowImpact))
    }
    
    newNode = (x,y) => {
        if(this.state.addStakeHolderNode !== ""){
            if(document.getElementById("canvas").querySelector("#"+CSS.escape(this.state.addStakeHolderNode.id)) == null){
                
                let d = document.createElement("div");
                let id = this.state.addStakeHolderNode.id;
                console.log(this.state.stakeHolderTypeForColour)
                let cll = "network-circle circle-img circle-green";
                if(this.state.stakeHolderTypeForColour === "Employee"){
                    cll = "network-circle circle-img circle-red";
                }else if(this.state.stakeHolderTypeForColour === "Asset/Resources"){
                    cll = "network-circle circle-img circle-green";
                }else if(this.state.stakeHolderTypeForColour === "Trading Partner"){
                    cll = "network-circle circle-img circle-blue";
                }else if(this.state.stakeHolderTypeForColour === "RegulatoryBody"){
                    cll = "network-circle circle-img circle-yellow";
                }
                d.className = cll;
                d.id = id;
                d.setAttribute('data-name', this.state.addStakeHolderNode.name);
                d.setAttribute('data-type', this.state.addStakeHolderNode.type);
                d.setAttribute('data-toggle', "tooltip")
                d.setAttribute('title', this.state.addStakeHolderNode.name)
                d.onclick = (e)=>this.circleClickHandler(e);
                
                
                if(this.state.addStakeHolderNode.image != null && this.state.addStakeHolderNode.image != ""){
                    d.innerHTML = '<img src="'+this.state.addStakeHolderNode.image+'" style="pointer-events:none;">';
                    d.innerHTML = '<p style="margin-top: 22px;">'+this.state.addStakeHolderNode.name+'</p>'
                    d.onmousemove = function() {
                      
                  
                        $('[data-toggle="tooltip"]').tooltip();   
     
                     }
                } 

                d.innerHTML = '<p style="margin-top: 22px;">'+this.state.addStakeHolderNode.name+'</p>'

                d.onmousemove = function() {
                  
                    $('[data-toggle="tooltip"]').tooltip();   
 
                 }

                
                d.style.left = x + "px";
                d.style.top = y + "px";
                window.jsp.getContainer().appendChild(d);
                this.initNode(d);
                let bilow = window.jsp.addEndpoint(d,this.state.endpoints.biArrowEndpointLow);
                let bimed = window.jsp.addEndpoint(d, this.state.endpoints.biArrowEndpointMed);
                let bistr = window.jsp.addEndpoint(d, this.state.endpoints.biArrowEndpointStrong);
                let islow = window.jsp.addEndpoint(d, this.state.endpoints.isInfluencedEndpointLow);
                let ismed = window.jsp.addEndpoint(d, this.state.endpoints.isInfluencedEndpointMed);
                let isstr = window.jsp.addEndpoint(d, this.state.endpoints.isInfluencedEndpointStrong);
                let haslow = window.jsp.addEndpoint(d, this.state.endpoints.hasInfluencedEndpointLow);
                let hasmed = window.jsp.addEndpoint(d, this.state.endpoints.hasInfluencedEndpointMed);
                let hasstr = window.jsp.addEndpoint(d, this.state.endpoints.hasInfluencedEndpointStrong);
                let eprec = [...this.state.endpointsRecord];
                eprec[Number(id)] = {
                    bilow : bilow,
                    bimed : bimed,
                    bistr : bistr,
                    islow : islow,
                    ismed : ismed,
                    isstr : isstr,
                    haslow : haslow,
                    hasmed : hasmed,
                    hasstr : hasstr
                }
                this.setState({
                    endpointsRecord : eprec
                })
                
                this.setState({
                    addStakeHolderNode : "",
                    stakeHolderTypeForColour : ""
                },() => designThinkingArrowManager(this.state.arrowType, this.state.arrowImpact))
                return d;
            }else{
                console.log("Node for this stakeholder already exists.")
                this.setState({
                    addStakeHolderNode : "",
                    stakeHolderTypeForColour : ""
                })
            }
        }
    }
    
    searchChangeHandler(e){
        this.setState({
            stakeHoldersSearch : e.target.value
        })
    }

    arrowTypeClickHandler(e){
        this.setState({
            arrowType : e.target.id
        },() => {
            designThinkingArrowManager(this.state.arrowType, this.state.arrowImpact);
        })
    }

    arrowImpactClickHandler(e){
        document.getElementById("impactLow").classList.remove("active");
        document.getElementById("impactMedium").classList.remove("active");
        document.getElementById("impactStrong").classList.remove("active");
        e.target.classList.add("active");
        this.setState({
            arrowImpact : e.target.id
        },() => {
            designThinkingArrowManager(this.state.arrowType, this.state.arrowImpact);
        })
    }

    modalToggle = () => {
        if(this.state.isOpen === false){
            this.setState({
                isOpen: !this.state.isOpen
            },() => {
                document.getElementById("stakeholderModal").style.display = "block"
            })
        }else if(this.state.isOpen === true){
            this.setState({
                isOpen: !this.state.isOpen
            },() => {
                document.getElementById("stakeholderModal").style.display = "none"
            })
        }   
    }

    StakeHoldersSaveHandler = async () => {

        console.log(this.state)


        let stakeHolderNodes = document.querySelectorAll(".network-circle");
        let network = [];
        for(let i = 0; i < stakeHolderNodes.length; i++){
            network.push({
                id : stakeHolderNodes[i].id,
                x : stakeHolderNodes[i].style.left,
                y : stakeHolderNodes[i].style.top,
                circlename : "A"
            })
        }
        let cons = this.state.connections.map((con)=>{
            return {
                source : con.source,
                target : con.target,
                influence : con.influence,
                impact : con.impact
            }
        })
        let noi_name = document.getElementById("noi_name").value;

        let node = document.getElementById("Noi-image")

        function filter (node) {
            return (node.tagName !== 'i');
        }
        
         
        domtoimage.toPng(node, {filter: filter} )
            .then( (dataurl) =>{
         
              console.log(dataurl)

                          axios.post( config.laravelBaseUrl + "saveNetworkOfInfluence",{
                            templateid : this.state.NoiId,
                            Title : noi_name,
                            connections : cons,
                            network : network,
                            dataUrl: dataurl
                        }, {
                            headers: {
                              "authorization": "Bearer " + sessionStorage.getItem("userToken")
                            }
                        }
                    ).then(result => {
                        if (result.data.success === true) {
                            responseMessage("success", result.data.message, "");
                            this.setState({
                                NoiId : result.data.data.NoiId
                            })


                            this.props.fetchNetworkOfInfluenceTemplates();

                        } else {
                            responseMessage("error", result.data.message, "");
                        }
                    }).catch(err => {
                        console.log(err.response.data)
                        responseMessage("error", err.response.data.data.Title?err.response.data.data.Title[0]:err.response.data.data.network?err.response.data.data.network[0]:err.response.data.data.connections?err.response.data.data.connections[0]:err.response.data.message, "");
                    })
                


            });

        // await 

    
        
    }

    circleClickHandler = (e) => {
        if(e.target.classList.contains("dragStoppedStopClick")){
            e.target.classList.remove("dragStoppedStopClick")
        }else{
            let curr_stakho = '';
            let curState = {...this.state.currentStakeholder};
            
            for(let i = 0; i < this.props.stakeHoldersData.length; i++){
                if(this.props.stakeHoldersData[i].StakeHolderId === e.target.id){
                    curr_stakho = this.props.stakeHoldersData[i];
                }
            }
            curState.stakeholderId = curr_stakho.StakeHolderId;
            curState.stakeholderName = curr_stakho.StakeHolderName;
            curState.stakeholderType = curr_stakho.StakeHolderType;
            this.setState({
                currentStakeholder : curState
            },()=>{
                this.modalToggle()
            })
            
        }
    }
    stakeholderDragStart = (e,stakeholder) => {
        this.setState({
            addStakeHolderNode : stakeholder,
            stakeHolderTypeForColour : stakeholder.type
        })
    }
    stakeHolderDropHandler = (e) => {
        let el = e.target.getBoundingClientRect();
        let elX = el.x+window.pageXOffset;
        let elY = el.y+window.pageYOffset;
        let posDropped = {x : e.pageX-elX, y : e.pageY-elY};
        this.newNode(posDropped.x,posDropped.y);
    }
    stakeholderDragOverHandler = (e) => {
        e.preventDefault();
    }



    
    handleNoiName= async(e)=>{
        e.preventDefault();
  
   
    }

    render(){

        console.log(this.props)

        return(
            <>
                <DashboardHeader />
                {/*<!-- Page Wrapper -->*/}
                <DesignThinkingStakeHolderViewWrapper id="wrapper">
                    {/*<!-- Content Wrapper -->*/}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/*<!-- Main Content -->*/}
                        <div id="content">
                            {/*<!-- Breadcrumb -->*/}
                            <DesignThinkingStakeHolderViewBreadCrumb />
                            {/*<!-- End Breadcrumb -->*/}
                            {/*<!-- Begin Page Content -->*/}
                            <div className="container-fluid container-dashboard">
                                <div className="row py-2 border-top border-bottom dt-project-sec1">
                                    <div className="col-sm-12 col-md-12 col-lg-10 col-xl-10">
                                        <div className="form-group row">
                                            <div className="col-sm-12 col-md-12 col-lg-2 pr-0">
                                                <label className="pt-2">Network of Influence</label>
                                            </div>
                                            <div className="col-sm-12 col-md-12 col-lg-6 d-flex updated-col">
                                                <input type="text" className="form-control" placeholder="Name" id="noi_name"
                                                 onChange={this.handleNoiName} />
                                               
                                                <span>Updated 2 days ago</span>
                                            </div>

                                            <div className="ol-sm-12 col-md-12 col-lg-4 d-flex align-items-center">
                                            <label className="mx-1 mt-1">Noi</label>
                                            <select className="custom-select ml-1" style={{ "width": "360px" }}>
                                               
                                            <option value="" selected disabled >Network of Influence</option>
                                            {this.props.NetworkOfInfluence.map((noi)=>(
                                                <option value="">{noi.Title}</option>

                                            ))}   </select>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-lg-2 col-xl-2">
                                        <div className="dt-btn-sec text-right">
                                            <a href="#">Cancel</a>
                                            <button type="button" onClick={this.StakeHoldersSaveHandler} className="btn btn-primary ml-3">SAVE</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="dt-screen-main">
                                    {/*<!-- Start Left Content -->*/}
                                        <DesignThinkingStakeHolderViewSidebar 
                                            arrowClick={this.arrowTypeClickHandler.bind(this)}
                                            influence = {this.state.arrowType}
                                            impact = {this.state.arrowImpact} 
                                            stakeholders={this.props.stakeHoldersData} 
                                            stakeholderssearch={this.state.stakeHoldersSearch} 
                                            search={this.searchChangeHandler.bind(this)}
                                            stakeHolderListClickHandler={this.stakeHolderListClickHandler.bind(this)} 
                                            arrowImpactClickHandler={this.arrowImpactClickHandler.bind(this)}
                                            searchFilterHandler={this.searchFilterHandler.bind(this)}
                                            filters = {this.state.searchFilter}
                                            stakeholderDragStart = {this.stakeholderDragStart.bind(this)}
                                        />
                                    {/*<!-- End Left Content -->*/}
                                    {/*<!-- Start Body Content -->*/}
                                        <div className="dt-content-wrapper d-flex flex-column">
                                            <div className="container-fluid">
                                                <div className="row pt-3">
                                                    <div className="right-sec ml-auto">
                                                        <select className="custom-select">
                                                            <option>70% zoom</option>
                                                            <option>80% zoom</option>
                                                            <option>90% zoom</option>
                                                        </select>
                                                        <span className="stake-menu-icon">
                                                            <a href="#"><i className="fas fa-bars"></i></a>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="row py-5">
                                                    <div className="col-lg-12 text-center network-influence-graph">
                                                        {/*<!-- Start Circles -->*/}
                                                        <DesignThinkingStakeHolderDataPopUp stakeholder={this.state.currentStakeholder}
                                                        toggle={this.modalToggle} 
                                                        connState = {this.state.connections}
                                                        popUpInfluenceHandler = {this.popUpInfluenceHandler.bind(this)}
                                                        />
                                                        <DesignThinkingStakeHolderCircles 
                                                        click={this.circleClickHandler} 
                                                        stakeHolderDropHandler={this.stakeHolderDropHandler.bind(this)} 
                                                        stakeholderDragOverHandler={this.stakeholderDragOverHandler.bind(this)}
                                                        />
                                                        {/*<!-- End Circles -->*/}
                                                        </div>
                                                    </div>
                                                    <div className="row py-5">
                                                        <div className="col-lg-12 text-center network-influence-buttons">
                                                            <div className="net-btn m-auto">
                                                                <a href="#" className="btn-gray"><span className="btn-txt">A</span> <span>Immediate</span></a>
                                                                <a href="#" className="btn-gray"><span className="btn-txt">B</span> <span>Local</span></a>
                                                                <a href="#" className="btn-gray"><span className="btn-txt">C</span> <span>Systemic</span></a>
                                                            </div>
                                                            <div className="net-stake-txt m-auto">
                                                                <span>Stakeholder Types:</span>
                                                                <span><span className="dot-green"></span> Employee</span>
                                                                <span><span className="dot-red"></span>Partner</span>
                                                                <span><span className="dot-blue"></span>Vendor</span>
                                                                <span><span className="dot-yellow"></span>Consultant</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        {/*<!-- End Body Content -->*/}
                                        </div>
                                    </div>
                                {/*<!-- /End container-fluid -->*/}
                                </div>
                            {/*<!-- End of Main Content -->*/}
                            </div>
                        </div>
                    </DesignThinkingStakeHolderViewWrapper>
                    <AsideComponent />
                <FooterComponent />
            </>
        );
    }
}

const mapStateToProps = state => ({
    stakeHoldersData : state.designThinkingStakeHolder.stakeholders,
    noiData : state.designThinkingStakeHolder.noi,
    NetworkOfInfluence: state.epicScreenData.NetworkOfInfluence,
})

export default connect(mapStateToProps,{fetchStakeHolders, fetchNoi,fetchNetworkOfInfluenceTemplates})(DesignThinkingStakeHolderView);