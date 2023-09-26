import React , { Component } from 'react';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import FooterComponent from "../includes/dashboardFooter/FooterComponent";
import AsideComponent from "../includes/asideComponent/AsideComponent";
import {BalancedScorecardWrapper} from './styling/balancedScorecard';
import BalancedScorecardLeftbar from './balancedScorecardLeftbar';
import BalancedScorecardBreadcrumb from './balancedScorecardBreadcrumb';
import BalancedScorecardGoalSetting from './balancedScorecardGoalSetting';
import BalancedScorecardObjectivesTarget from './balancedScorecardObjectivesTargets';
import CardSettingKpi from '../Kpi/CardSettingKpi';
import {jsPlumb,jsPlumbUtil} from 'jsplumb';
import { Link, withRouter } from 'react-router-dom';
import { fetchBalancedScorecardKpi, fetchBalancedScorecardCategories, fetchAllBalancedScorecards,fetchAllKpiAgainstBalancedScorecards } from '../../actions/balancedScorecardActions';
import { startLoader, stopLoader } from '../../actions/loaderActions';
import { connect } from 'react-redux';
import {responseMessage} from '../../utils/alert';
import ModalPopup from '../common/ModalPopup';
import axios from 'axios';
import CacheStorage from '../../utils/CacheStorage';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const config = require('../../config');

class BalancedScorecard extends Component{
    constructor(props){
        super(props)
    }

    state = {
        color : "yellow",
        ovalId : 1,
        ovalShape : [],
        ovalData:[],
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
        kpiData: {
            data: []
        },
        bscId : this.props.match.params.bscId?this.props.match.params.bscId:0,
        bscName : "",
        connections : [],
        showNameValidation : false,
        selectBscModalOpen : false,
        reArrangePopUp : false,
        kpiDragging : false,
        BalancedScorecardGoalSettingModal:false
    }

    reDrawOvalsAndConnections = () => {
        let ovals = [...document.querySelectorAll(".oval-shape")];
        let ovalsArr = [];
        for(let i = 0; i < ovals.length; i++){
            let ovalIDForSave = ovals[i].id;
            if(ovalIDForSave.includes("_")){
                let splitedId = ovalIDForSave.split("_");
                ovalIDForSave = splitedId[1];
            }
            let obj = {
                CategoryId : ovals[i].parentElement.parentElement.parentElement.id,
                OvalId : ovalIDForSave,
                OvalText : ovals[i].querySelector("p").innerHTML,
                OvalColor : ovals[i].classList[1],
                x : ovals[i].style.left,
                y : ovals[i].style.top
            }
            ovalsArr.push(obj);
        }
        for(let i = 0; i < ovals.length; i++){
            window.jsp.remove(ovals[i].id)
        }
        for(let i = 0; i < ovalsArr.length; i++){
            this.fetchNewNode(ovalsArr[i].x,ovalsArr[i].y,ovalsArr[i].CategoryId,ovalsArr[i].OvalId,ovalsArr[i].OvalColor,ovalsArr[i].OvalText,ovalsArr[i].KPIControlLeversID);
        }
        for(let i=0; i < this.state.connections.length; i++){
            window.jsp.connect({
                source : this.state.connections[i].source,
                target : this.state.connections[i].target,
                anchor : [ "Perimeter", { shape:"Circle" } ]
            })
        }
    }

    reArrangePopUpClick = () => {

        if(this.state.reArrangePopUp === true){
            this.reDrawOvalsAndConnections();
        }

        this.setState({
            reArrangePopUp : !this.state.reArrangePopUp
        })
    }

    moveCategoryRow = (direction, ind) => {
        let categoryRows = [...this.state.categoryRows];
        if(direction === "up"){
            if(ind > 0){
                let newInd = Number(ind)-1;
                let tempData = categoryRows[newInd];
                categoryRows[newInd] = categoryRows[ind];
                categoryRows[ind] = tempData;
            }
        }else if(direction === "down"){
            let newInd = Number(ind)+1;
            if(newInd < this.state.categoryRows.length){
                let tempData = categoryRows[newInd];
                categoryRows[newInd] = categoryRows[ind];
                categoryRows[ind] = tempData;
            }
        }
        this.setState({
            categoryRows
        })
    }

    moveCategoryKpi = (direction, ind, rowInd) => {
        let kpis = [...this.state.categoryRows[rowInd].Kpi];
        if(direction === "up"){
            if(ind > 0){
                let newInd = Number(ind)-1;
                let tempData = kpis[newInd];
                kpis[newInd] = kpis[ind];
                kpis[ind] = tempData;
            }
        }else if(direction === "down"){
            let newInd = Number(ind)+1;
            if(newInd < kpis.length){
                let tempData = kpis[newInd];
                kpis[newInd] = kpis[ind];
                kpis[ind] = tempData;
            }
        }
        let categoryRows = [...this.state.categoryRows];
        categoryRows[rowInd].Kpi = kpis;
        this.setState({
            categoryRows
        })
    }

    addGoalSettingRow = (title) => {
        let prevGoal = [...this.state.goalSetting];
        let ind = prevGoal.map((goal)=>goal.title).indexOf(title);
        prevGoal[ind].description.push({
                    id: 0,
                    description: "Double click to Edit."
                });
        this.setState({
            goalSetting : prevGoal
        })
    }
    createOvalOnDrop = (e) =>{
        e.persist();
        let droppedEl = document.elementFromPoint(e.clientX,e.clientY);
        if(droppedEl.classList.contains("oval-shape-row")){
            if(droppedEl.childElementCount < 4){
                this.newNode(e.clientX,e.clientY,droppedEl,e.target.id,"drop");
            }
        }else if(droppedEl.classList.contains("oval-shape")){
            if(droppedEl.parentElement.childElementCount < 4){
                this.newNode(e.clientX,e.clientY,droppedEl.parentElement,e.target.id,"drop");
            }
        }
    }
    newNode = (x, y, parent,color,type) => {
        let d = document.createElement("div");
        let innerD = document.createElement("div");
        let p = document.createElement("p");
        let input = document.createElement("input");
        let cross = document.createElement("a");
        let id = "oval"+this.state.ovalId;
        let clnm = "";
        switch(color){
            case "yellow":
                clnm = "oval-shape bg-yellow";
            break;
            case "blue":
                clnm = "oval-shape bg-blue";
            break;
            case "green":
                clnm = "oval-shape bg-green";
            break;
            case "orange":
                clnm = "oval-shape bg-orange";
            break;
        }
        p.innerHTML = "Double Click to Edit";
        p.ondblclick = this.editTextHandler.bind(this);
        p.setAttribute("title","Double Click to Edit");
        input.value = "Double Click to Edit";
        input.onblur = this.editOverHandler.bind(this);
        input.id = id;
        input.style.display = "none";
        cross.href="javascript:void(0)";
        cross.onclick = (e) => this.removeOvalOnClickHandler(e.target.parentElement.parentElement);
        cross.className = "ovalDelete"
        cross.innerHTML = '<i class="fa fa-times"></i>';
        innerD.appendChild(p);
        innerD.appendChild(input);
        let oval = [
            ...this.state.ovalShape
        ]
        let objjj = {
            id : id,
            text : "Double Click to Edit"
        };
        oval.push(objjj);
        this.setState({
            ovalShape: oval
        })
        d.className = clnm;
        d.id = id;
        d.innerHTML = "<div class=\"ep\"></div>";
        innerD.style.zIndex = "1";
        d.appendChild(innerD);
        d.ondblclick = (e) => this.removeOvalOnClickHandler(e.target)
        if(type === "dblClick"){
            d.style.left = x-70 + "px";
            d.style.top = y-40 + "px";
        }else if(type === "drop"){
            d.style.left = 250+ "px";
            d.style.top = 0 + "px";
        }
        
        parent.appendChild(d);
        d.appendChild(cross);
        this.initNode(d);
        this.setState({
            ovalId : this.state.ovalId+1
        })
        return d;
    }
    initNode = (el) => {
        window.jsp.draggable(el,{
            containment:true,
        });
        window.jsp.makeSource(el, {
            filter: ".ep",
            anchor:[ "Perimeter", { shape:"Ellipse" } ],
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
    };
    arrayGoalSettingHandler = (e) => {
        e.target.style.display = "none";
        e.target.nextElementSibling.style.display = "block";
    }
    arrayGoalSettingHandlerEdit = (e,title, key) => {
        let prevGoal = [...this.state.goalSetting];
        let ind = prevGoal.map((goal)=>goal.title).indexOf(title);
        prevGoal[ind].description[key].description = e.target.value;
        this.setState({
            goalSetting : prevGoal
        })
    }
    arrayGoalSettingBlurHandler = (e) => {
        e.target.style.display = "none";
        e.target.previousElementSibling.style.display = "block";
    }
    goalSettingDeleteRowHandler = (title,key) => {
        confirmAlert({
            title: 'Confirm to continue',
            message: 'Are you sure to delete this '+title+ '?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let prevGoal = [...this.state.goalSetting];
                        let ind = prevGoal.map((goal)=>goal.title).indexOf(title);
                        prevGoal[ind].description.splice(key,1);
                        this.setState({
                            goalSetting : prevGoal
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });     
    }
    kpiDropHandler(e,Target){
        e.persist();
        let category_id = "";
        let dropped_element = document.elementFromPoint(e.clientX,e.clientY);
        if(dropped_element.classList.contains("kpi-drop-area")){
            if(dropped_element.querySelector("#"+CSS.escape(e.target.id)) == null){
                category_id = dropped_element.parentElement.id;
            }
        }else if(dropped_element.classList.contains("child-kpi-drop-area")){
            if(dropped_element.parentElement.querySelector("#"+CSS.escape(e.target.id)) == null){
                category_id = dropped_element.parentElement.parentElement.id;
            }
        }
        if(category_id !== ""){
            let catRows = [...this.state.categoryRows];
            for(let i = 0; i < catRows.length; i++){
                if(catRows[i].CategoryId === category_id){
                    catRows[i].Kpi.push({
                        KpiId : e.target.id,
                        KpiName : e.target.innerHTML,
                        Target : Target
                    })
                }
            }
            let ovals = [...document.querySelectorAll(".oval-shape")];
            let ovalsArr = [];
            for(let i = 0; i < ovals.length; i++){
                let ovalIDForSave = ovals[i].id;
                if(ovalIDForSave.includes("_")){
                    let splitedId = ovalIDForSave.split("_");
                    ovalIDForSave = splitedId[1];
                }
                let obj = {
                    CategoryId : ovals[i].parentElement.parentElement.parentElement.id,
                    OvalId : ovalIDForSave,
                    OvalText : ovals[i].querySelector("p").innerHTML,
                    OvalColor : ovals[i].classList[1],
                    x : ovals[i].style.left,
                    y : ovals[i].style.top
                }
                ovalsArr.push(obj);
            }
            for(let i = 0; i < ovals.length; i++){
                window.jsp.remove(ovals[i].id)
            }
            for(let i = 0; i < ovalsArr.length; i++){
                this.fetchNewNode(ovalsArr[i].x,ovalsArr[i].y,ovalsArr[i].CategoryId,ovalsArr[i].OvalId,ovalsArr[i].OvalColor,ovalsArr[i].OvalText,ovalsArr[i].KPIControlLeversID);
            }
            for(let i=0; i < this.state.connections.length; i++){
                window.jsp.connect({
                    source : this.state.connections[i].source,
                    target : this.state.connections[i].target,
                    anchor : [ "Perimeter", { shape:"Circle" } ]
                })
            }
            this.setState({
                categoryRows : catRows
            },()=>{
                this.setState({
                    kpiDragging : false
                })
                this.reDrawOvalsAndConnections();
            })
        }
    }

    handleKpiSearch(e) {
        let kpis = this.props.kpiData.data;
        let term = e.target.value.trim();
        if(term.length) {

            let result = kpis.reduce((r, {KPISetID,KPISetTitle,KPI}) => {
                let o = KPI.filter(k => k.KPITitle ? k.KPITitle.toLowerCase().includes(term.toLowerCase()) || KPISetTitle.toLowerCase().includes(term.toLowerCase()) : false);
                    
                if(o && o.length)
                r.push({KPISetID,KPISetTitle,KPI : [...o]});
                return r;
            },[]);
            console.log(result)
            this.setState({
                kpiData: {
                    data: result
                }
            })
        }else{
            this.setState({
                kpiData: this.props.kpiData
            })
        }
    }

    kpiDeleteClickHandler = (catId,KpiId,KpiName) => {
        confirmAlert({
            title: 'Confirm to continue',
            message: 'Are you sure to delete '+KpiName+' ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let catRows = [...this.state.categoryRows];
                        for(let i = 0; i < catRows.length; i++){
                            if(catRows[i].CategoryId === catId){
                                let ind = catRows[i].Kpi.map((kpi)=>kpi.KpiId).indexOf(KpiId);
                                catRows[i].Kpi.splice(ind,1);
                            }
                        }
                        this.setState({
                            categoryRows : catRows
                        },()=>{
                            this.reDrawOvalsAndConnections();
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }

    addRowsHandler = (e,rowId) => {
        let prevRows = [...this.state.categoryRows];
        let inp = e.target;
        let ind = prevRows.map((row)=>row.CategoryId).indexOf(rowId);
        if(ind === -1){
            prevRows.push({
                CategoryId : rowId,
                title : e.target.nextElementSibling.innerHTML,
                Kpi : []
            })
            inp.checked = true;
        }else{
            confirmAlert({
                title: 'Confirm to continue',
                message: 'Are you sure to delete '+e.target.nextElementSibling.innerHTML+' ?' ,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            prevRows.splice(ind,1);
                            inp.checked = false;
                            this.setState({
                                categoryRows : prevRows
                            })
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {
                            inp.checked = true;
                        }
                    }
                ]
            });
        }
        // for(let i = 0; i < checked_categories.length; i++){
        //     let ind = prevRows.map((row)=>row.CategoryId).indexOf(checked_categories[i].id);
        //     let newObj = {
        //         CategoryId : checked_categories[i].id,
        //         title : checked_categories[i].nextElementSibling.innerHTML,
        //         Kpi : []
        //     }
        //     if(ind === -1){
        //         prevRows.push(newObj)
        //     }
        //     checked_categories[i].checked = false;
        // }
        this.setState({
            categoryRows : prevRows
        })
    }
    saveBalancedScorecardHandler = async () => {
        let id = this.state.bscId;
        let title = this.state.bscName;
        let goalSetting = this.state.goalSetting;
        let strategicObjectives = this.state.categoryRows;
        let ovals = [...document.querySelectorAll(".oval-shape")];
        let ovalsArr = [];
        
        if(this.state.bscName.trim() !== ""){
            for(let i = 0; i < ovals.length; i++){
                let ovalIDForSave = ovals[i].id;
                if(ovalIDForSave.includes("_")){
                    let splitedId = ovalIDForSave.split("_");
                    ovalIDForSave = splitedId[1];
                }
                let obj = {
                    CategoryId : ovals[i].parentElement.parentElement.parentElement.id,
                    OvalId : ovalIDForSave,
                    OvalText : ovals[i].querySelector("p").innerHTML,
                    OvalColor : ovals[i].classList[1],
                    x : ovals[i].style.left,
                    y : ovals[i].style.top,
                    KPIControlLeversID:this.state.ovalData[i].KPIControlLeversID,
                    KPIControlLeversType:this.state.ovalData[i].KPIControlLeversType,
                    KPIID:this.state.ovalData[i].KPIID
                }
                ovalsArr.push(obj);
            }
            let connections = [...this.state.connections];
            connections = connections.map((con)=>{
                let source = con.source;
                let target = con.target;
                if(source.includes("_")){
                    let splittedSource = source.split("_");
                    source = splittedSource[1];
                }
                if(target.includes("_")){
                    let splittedtarget = target.split("_");
                    target = splittedtarget[1];
                }
                return {
                    source: source,
                    strength: con.strength,
                    target: target
                }
            })
            let result = await axios.post( config.laravelBaseUrl + "saveBscConfig",{
                    id : id,
                    title : title,
                    goalsetting : goalSetting,
                    strategicobjective : strategicObjectives,
                    Ovals : ovalsArr,
                    connections : connections
                }, {
                    headers: {
                    "authorization": "Bearer " + CacheStorage.getItem("userToken")
                    }
                }
            )
            this.props.fetchAllBalancedScorecards();
            if (result.data.success == true) {
                responseMessage("success", result.data.message, "");
                for(let i = 0; i < ovals.length; i++){
                    window.jsp.remove(ovals[i].id)
                }
                this.setState({
                    bscId : result.data.data.id
                },()=>{this.fetchBsc(this.state.bscId);this.props.fetchAllKpiAgainstBalancedScorecards(this.state.bscId)})
            } else {
                responseMessage("error", result.data.message, "");
            }
        }else{
            this.setState({
                showNameValidation : true
            })
        }
    }
    deleteTableRow = (CategoryId,title) => {
        confirmAlert({
            title: 'Confirm to continue',
            message: 'Are you sure to delete '+title+' ?' ,
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    let prevRows = [...this.state.categoryRows];
                    let ind = prevRows.map(row=>row.CategoryId).indexOf(CategoryId);
                    prevRows.splice(ind,1);
                    let ovals = [...document.getElementById(CategoryId).getElementsByClassName('oval-shape-row')[0].childNodes];
                    for(let i = 0; i < ovals.length; i++){
                        window.jsp.remove(ovals[i].id)
                    }
                    this.setState({
                        categoryRows : prevRows
                    })
                }
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          });
    }
    componentDidMount = () => {
        jsPlumb.ready(() => {
            var instance = jsPlumb.getInstance({
                Endpoint: ["Dot", {radius: 2}],
                HoverPaintStyle: {stroke: "#1e8151", strokeWidth: 2 },
                Connector: [ "Bezier", { curviness:1 }],
                ConnectionOverlays: [
                    [ "Arrow", {
                        location: 1,
                        id: "arrow",
                        length: 14,
                    } ],
                ],
                Container: "canvas"
            });
            instance.registerConnectionType("basic", {anchor:[ "Perimeter", { shape:"Ellipse" } ]});
            window.jsp = instance;
            var canvas = document.getElementById("canvas");
            var windows = jsPlumb.getSelector(".oval-shape");
            instance.bind("click",(c) => {
                if(c.source.classList[1]!='bg-white' && c.target.classList[1]!='bg-white')
                {
                let conns = [...this.state.connections];
                conns.splice(conns.indexOf({
                    source : c.source.id,
                    target : c.target.id,
                    strength : "medium"
                }),1)
                this.setState({
                    connections : conns
                },()=>{instance.deleteConnection(c);})
                }
            });
            instance.bind("connection", (info) => {
                if(info.connection.target.id===info.connection.source.id){
                    instance.deleteConnection(info.connection);
                }
                else if((info.connection.target.classList[1]=='bg-white' || info.connection.source.classList[1]=='bg-white')
                && ((info.connection.target.classList[1]=='bg-white' && info.connection.source.classList[1]=='bg-white')
                || info.connection.source.classList[1]=='bg-white'
                || (info.connection.source.classList[2]!=info.connection.target.classList[2])))
                {
                    instance.deleteConnection(info.connection);
                }
                else{
                    let conns = [...this.state.connections];
                    conns.push({
                        source : info.connection.source.id,
                        target : info.connection.target.id,
                        strength : "medium"
                    })
                    this.setState({connections : conns});
                }
            });
            jsPlumb.on(canvas, "dblclick", (e) => {
                if(e.target.classList.contains("oval-shape-row")){
                    if(e.target.childElementCount < 4){
                        this.newNode(e.offsetX, e.offsetY, e.target,this.state.color,"dblClick");
                    }
                }
            });
            
            instance.batch(() => {
                for (var i = 0; i < windows.length; i++) {
                    this.initNode(windows[i], true);
                }
            });
            jsPlumb.fire("jsPlumbDemoLoaded", instance);
        
        });  
        this.props.fetchBalancedScorecardKpi(this.props.match.params.bscId?this.props.match.params.bscId:0);
        this.props.fetchBalancedScorecardCategories(this.props.match.params.bscId?this.props.match.params.bscId:0);
        this.props.fetchAllKpiAgainstBalancedScorecards(this.props.match.params.bscId?this.props.match.params.bscId:0)
        this.props.fetchAllBalancedScorecards();
        if(this.state.bscId !== 0){
            this.fetchBsc(this.state.bscId)
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if(nextProps.match.params.bscId){
            if(this.state.bscId != nextProps.match.params.bscId){
                let ovals = [...document.querySelectorAll(".oval-shape")];
                for(let i = 0; i < ovals.length; i++){
                    window.jsp.remove(ovals[i].id)
                }
                this.props.fetchBalancedScorecardKpi(nextProps.match.params.bscId?nextProps.match.params.bscId:0);
                this.props.fetchBalancedScorecardCategories(nextProps.match.params.bscId?nextProps.match.params.bscId:0);
                this.props.fetchAllKpiAgainstBalancedScorecards(nextProps.match.params.bscId?nextProps.match.params.bscId:0);
                this.props.fetchAllBalancedScorecards();
                this.setState({
                    color : "yellow",
                    ovalId : 1,
                    ovalShape : [],
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
                    bscId : nextProps.match.params.bscId,
                    bscName : "",
                    connections : [],
                    showNameValidation : false,
                    selectBscModalOpen : false
                })
                if(this.state.bscId !== 0){
                    this.fetchBsc(nextProps.match.params.bscId)
                }
            }
        }
        if(Object.keys(nextProps.kpiData).length) {
            this.setState({
                kpiData: nextProps.kpiData
            })
        }
    }
    fetchBsc = async (id) => {
        this.props.startLoader();
        let bsc = await axios.get(config.laravelBaseUrl + "getBscConfig/" +id,{
            headers: {
            "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
        });
        this.props.stopLoader();
        bsc = bsc.data.data;
        this.setState({
            bscName : bsc.title,
            goalSetting : bsc.goalsetting,
            categoryRows : bsc.strategicobjective
        },()=>{
            let ovals = [];
            for(let i = 0; i < bsc.Ovals.length; i++){
                let oval = this.fetchNewNode(bsc.Ovals[i].x,bsc.Ovals[i].y,bsc.Ovals[i].CategoryId,bsc.Ovals[i].OvalId,bsc.Ovals[i].OvalColor,bsc.Ovals[i].OvalText,bsc.Ovals[i].KPIControlLeversID);
                ovals.push(oval);
            }
            this.setState({
                ovalShape : ovals,
                ovalData:bsc.Ovals
            })
            let connections = [];
            for(let i=0; i < bsc.connections.length; i++){
                window.jsp.connect({
                    source : "oval_"+bsc.connections[i].source,
                    target : "oval_"+bsc.connections[i].target,
                    anchor : [ "Perimeter", { shape:"Circle" } ]
                })
                connections.push({
                    source : "oval_"+bsc.connections[i].source,
                    target : "oval_"+bsc.connections[i].target,
                    strength : bsc.connections[i].strength
                })
            }
            this.setState({
                connections : connections
            })
        })
    }
    fetchNewNode = (x, y, parentId ,fid ,clnmm,text,KPIControlLeversID) => {
        let d = document.createElement("div");
        let innerD = document.createElement("div");
        let p = document.createElement("p");
        let input = document.createElement("input");
        let cross = document.createElement("a");
        let id = "";
        if(Number.isNaN(Number(fid))){
            id = fid;
        }else{
            id = "oval_"+fid;
        }
        let clnm = "oval-shape "+clnmm+` ${KPIControlLeversID}`;
        p.innerHTML = text;
        p.setAttribute("title",text);
        {/*p.ondblclick = this.editTextHandler.bind(this);*/}
        input.value = text;
        input.onblur = this.editOverHandler.bind(this);
        input.id = id;
        input.style.display = "none";
        innerD.appendChild(p);
        innerD.appendChild(input);
        d.className = clnm;
        d.id = id;
        d.innerHTML = "<div class=\"ep\"></div>";
        innerD.style.zIndex = "1";
        d.appendChild(innerD);
        d.style.left = x;
        d.style.top = y;
        d.appendChild(cross);
        if(document.querySelector("tr#"+CSS.escape(parentId)+" .oval-shape-row")){
            document.querySelector("tr#"+CSS.escape(parentId)+" .oval-shape-row").appendChild(d);
        }
        this.fetchInitNode(d);
        return {
            id : id,
            text : "Double Click to Edit",
            fetchedOne : true
        };
        
    }
    fetchInitNode = (el) => {
        window.jsp.draggable(el,{
            containment:true,
        });
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
    editDoubleClickHandler = (e) => {
        e.target.style.display = "none";
        e.target.nextElementSibling.style.display = "block";
    }
    goalSettingChangeHandler = (e,title) => {
        let goalSet = [...this.state.goalSetting];
        let ind = goalSet.map((goal)=>goal.title).indexOf(title);
        goalSet[ind].description = e.target.value
        this.setState({
            goalSetting : goalSet
        })
    }
    GoalSettingBlurHandler = (e) => {
        e.target.style.display = "none";
        e.target.previousElementSibling.style.display = "block";
    }
    ovalColorChangeHandler = (e) => {
        this.setState({
            color : e.target.id
        })
    }
    removeOvalOnClickHandler = (target) => {
        if(target.classList.contains("oval-shape")){
            confirmAlert({
                title: 'Confirm to continue',
                message: 'Are you sure you want to delete this Strategic Object ? ',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            window.jsp.remove(target.id);
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {}
                    }
                ]
            });
        }
    }
    editTextHandler = (e) => {
        e.target.style.display = "none";
        e.target.nextElementSibling.style.display = "block";
    }
    editOverHandler = (e) => {
        let oval = [...this.state.ovalShape];
        let ind = oval.map((oval)=>oval.id).indexOf(e.target.id);
        oval[ind].text = e.target.value;
        this.setState({
            ovalShape : oval
        },()=>{
            e.target.value = this.state.ovalShape[ind].text;
            e.target.previousElementSibling.innerHTML = this.state.ovalShape[ind].text;
            e.target.previousElementSibling.setAttribute("title",this.state.ovalShape[ind].text);
            e.target.style.display = "none";
            e.target.previousElementSibling.style.display = "flex";
        })
        
    }
    balanceScorecardNameChangeHandler = (e) => {
        this.setState({
            bscName : e.target.value
        },()=>{
            if(this.state.bscName.trim() !== ""){
                this.setState({
                    showNameValidation : false
                })
            }
        })
    }
    toggleSelectBSCModal = () => {
        this.setState({
            selectBscModalOpen : !this.state.selectBscModalOpen
        })
    }
    // bscIdChangeHandler = (bscId) => {
    //     this.setState({
    //         bscId: bscId
    //     })
    // }
    addNewBSCClickHandler = () => {
        if(!this.props.match.params.bscId && this.state.bscId != 0){
            let ovals = [...document.querySelectorAll(".oval-shape")];
            for(let i = 0; i < ovals.length; i++){
                window.jsp.remove(ovals[i].id)
            }
            this.setState({
                color : "yellow",
                ovalId : 1,
                ovalShape : [],
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
                bscId : 0,
                bscName : "",
                connections : [],
                showNameValidation : false,
                selectBscModalOpen : false
            })
        }
    }
    deleteBalancedScorecard = (bscId,bscName) => {
        confirmAlert({
            title: 'Confirm to continue',
            message: 'Are you sure you want to delete '+bscName+' ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.get(config.laravelBaseUrl + 'deleteBsc/'+bscId,{
                            headers:{
                                authorization : "Bearer "+sessionStorage.getItem('userToken')
                            }
                        }).then(res=>{
                            if(this.props.match.params.bscId == bscId){
                                this.props.history.push('/balanced-scorecard')
                            }
                            this.props.fetchAllBalancedScorecards();
                            responseMessage('success',res.data.message)
                        }).catch(err=>{
                            responseMessage('error',err.response.data.message)
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }
    kpiDragStartHandler = () => {
        this.setState({
            kpiDragging : true
        })
    }
    render(){
        console.log("this.props.strategicObjectives",this.props.strategicObjectives)
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
                                        <BalancedScorecardLeftbar 
                                        ovalColorChangeHandler={this.ovalColorChangeHandler.bind(this)} 
                                        kpiDropHandler={this.kpiDropHandler.bind(this)}
                                        handleKpiSearch={this.handleKpiSearch.bind(this)}
                                        kpiData={this.state.kpiData.data}
                                        categoriesData={this.props.categories.data}
                                        createOvalOnDrop={this.createOvalOnDrop.bind(this)}
                                        color={this.state.color}
                                        addRowsHandler = {this.addRowsHandler.bind(this)}
                                        kpiDragStartHandler = {this.kpiDragStartHandler.bind(this)}
                                        />
                                        {/* <!-- Start Body Content --> */}
                                        <div className="dt-content-wrapper">
                                            <div className="content-wraper">
                                            <div className="container-fluid">
                                                {/* <!-- Balanced Scorecard Section --> */}
                                                    <div className="row balanced-version">
                                                    <div className="col-sm-12 col-md-12 col-lg-8 d-md-flex align-items-center pt-3">
                                                        <h2 style={{width:"28%"}}>Global Business Initiative</h2>
                                                        <input 
                                                        style={{width:"48%"}}
                                                        type="text" 
                                                        value={this.state.bscName}
                                                        className="form-control" 
                                                        placeholder="Global Business Initiative Name" 
                                                        onChange={this.balanceScorecardNameChangeHandler.bind(this)}
                                                        />{this.state.showNameValidation?
                                                        <p className="text-danger" style={{
                                                            margin: "0 0 0 25px"}}
                                                        >Name is required*</p>:""}
                                                        &nbsp; &nbsp; <a href="#" onClick={this.toggleSelectBSCModal.bind(this)}>Browse</a> 
                                                        &nbsp; &nbsp; <ul className="list-inline pager-list">
                                                        <li className="list-inline-item"><a href="#" className="btn btn-back" style={{width:"115px"}} onClick={()=>this.setState({BalancedScorecardGoalSettingModal:!this.state.BalancedScorecardGoalSettingModal})}>Goal Setting</a> </li>
                                                        </ul>
                                                    </div>
                                                    
                                                    <div className="col-sm-12 col-md-12 col-lg-4 pt-3 text-right">
                                                        <ul className="list-inline pager-list">
                                                            {/* <li className="list-inline-item">
                                                                <a href="#" className="btn-download"><i className="fas fa-cloud-download-alt"></i> Download Report</a>
                                                            </li> */}
                                                            <li className="list-inline-item"><Link to={"/balanced-scorecard/"} onClick={()=>this.addNewBSCClickHandler()} className="add-new-btn"><i className="fas fa-plus mr-2" aria-hidden="true"></i> <span>Add New</span></Link>&nbsp;&nbsp;<a href="#" className="btn btn-back" onClick={this.saveBalancedScorecardHandler.bind(this)}>Save</a></li>
                                                            
                                                        </ul>
                                                    </div>
                                                </div>
                                                {/*<BalancedScorecardGoalSetting
                                                    editDoubleClickHandler={this.editDoubleClickHandler.bind(this)}
                                                    GoalSettingBlurHandler={this.GoalSettingBlurHandler.bind(this)}
                                                    goalSettingChangeHandler={this.goalSettingChangeHandler.bind(this)}
                                                    GoalSetting={this.state.goalSetting}
                                                    addGoalSettingRow={this.addGoalSettingRow.bind(this)}
                                                    arrayGoalSettingHandler={this.arrayGoalSettingHandler.bind(this)}
                                                    arrayGoalSettingHandlerEdit={this.arrayGoalSettingHandlerEdit.bind(this)}
                                                    arrayGoalSettingBlurHandler={this.arrayGoalSettingBlurHandler.bind(this)}
                                                    goalSettingDeleteRowHandler={this.goalSettingDeleteRowHandler.bind(this)}
                                                        />*/}
                                                <div className="bg-white balanced-details-row mt-3 mb-4" style={{height:"350px"}}>
                                                <div className="balanced-col-wraper">
                                                <div className="row mb-2">
                                                <div className="col-sm-12 pl-0">
                                                    <h1 className="head-title">Business Target Outcome/KPIs</h1>
                                                </div>
                                                </div>
                                                <div className="card_details_kpi">
                                                    {
                                                       this.props.match.params.bscId && this.props.strategicObjectives.map((m)=>
                                                            <React.Fragment>
                                                            <div className="card_details_col">
                                                            <CardSettingKpi 
                                                            heading={m.KPIName?m.KPIName:''} 
                                                            UnitOfMeasurement={m.UnitOfMeasurement?m.UnitOfMeasurement:''}
                                                            ExpectedTargetGrowthAmount={m.ExpectedTargetGrowthAmount?m.ExpectedTargetGrowthAmount:''}
                                                            functionClick={() => console.log("clicked")}
                                                            />
                                                            </div>
                                                            </React.Fragment>
                                                        )
                                                    }
                                                </div>
                                                </div>
                                                </div>
                                                <div id="canvas">
                                                    <BalancedScorecardObjectivesTarget
                                                        kpiDeleteClickHandler={this.kpiDeleteClickHandler.bind(this)}
                                                        categoryRows = {this.state.categoryRows}
                                                        deleteTableRow = {this.deleteTableRow.bind(this)}
                                                        report = {false}
                                                        reArrangePopUpClick = {this.reArrangePopUpClick.bind(this)}
                                                        moveCategoryKpi = {this.moveCategoryKpi.bind(this)}
                                                        kpiDragging = {this.state.kpiDragging}
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
                <ModalPopup isOpen={this.state.selectBscModalOpen} toggle={this.toggleSelectBSCModal.bind(this)} title="Global Business Initiative" bodyHeight={true} >
                    <div className="table-responsive popup-table">
                        <table className="table table-striped mb-0">
                            <thead>
                                <tr>
                                    <th style={{width:"15%"}}>Sr No.</th>
                                    <th>Global Business Initiative Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.allBsc.map((bsc,ind)=>{
                                    return(
                                        <tr key={bsc.BalanceScoreCardId}>
                                            <td>{ind+1}</td>
                                            <td className="d-flex" style={{justifyContent:"space-between"}}><Link to={"/balanced-scorecard/"+bsc.BalanceScoreCardId}>{bsc.BalanceScoreCardName} </Link> <i className="fa fa-times text-danger" onClick={()=>this.deleteBalancedScorecard(bsc.BalanceScoreCardId,bsc.BalanceScoreCardName)}></i> </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>    
                    </div>
                    <div className="modal-footer">
                    </div> 
                </ModalPopup>
                <ModalPopup style={{maxWidth:"95%"}} isOpen={this.state.BalancedScorecardGoalSettingModal} toggle={()=>this.setState({BalancedScorecardGoalSettingModal:!this.state.BalancedScorecardGoalSettingModal})} bodyHeight={true} bodyHeightValue={350} >
                    <div style={{marginTop:"-45px"}}>
                <BalancedScorecardWrapper id="wrapper" style={{display:'block',marginBottom:"0px"}}>
                <BalancedScorecardGoalSetting
                                                    editDoubleClickHandler={this.editDoubleClickHandler.bind(this)}
                                                    GoalSettingBlurHandler={this.GoalSettingBlurHandler.bind(this)}
                                                    goalSettingChangeHandler={this.goalSettingChangeHandler.bind(this)}
                                                    GoalSetting={this.state.goalSetting}
                                                    addGoalSettingRow={this.addGoalSettingRow.bind(this)}
                                                    arrayGoalSettingHandler={this.arrayGoalSettingHandler.bind(this)}
                                                    arrayGoalSettingHandlerEdit={this.arrayGoalSettingHandlerEdit.bind(this)}
                                                    arrayGoalSettingBlurHandler={this.arrayGoalSettingBlurHandler.bind(this)}
                                                    goalSettingDeleteRowHandler={this.goalSettingDeleteRowHandler.bind(this)}
                                                        />
                
                </BalancedScorecardWrapper>
                </div>
                </ModalPopup>
                <ModalPopup isOpen={this.state.reArrangePopUp} toggle={this.reArrangePopUpClick.bind(this)} title="Re-Arrange Strategic Objectives" bodyHeight={true} >
                    <div className="table-responsive popup-table">
                        <table className="table table-striped mb-0">
                            <thead>
                                <tr>
                                    <th>Strategic Objectives</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.categoryRows.map((catRow,ind)=>{
                                    return(
                                        <tr key={`re_arrange_row_${catRow.CategoryId}`}>
                                            <td className="d-flex" style={{justifyContent:"space-between"}}>
                                                <span>
                                                    {catRow.title} 
                                                </span> 
                                                <span>
                                                    <i class="fas fa-arrow-up" onClick={()=>this.moveCategoryRow('up',ind)}></i>
                                                    &nbsp;&nbsp;
                                                    <i class="fas fa-arrow-down" onClick={()=>this.moveCategoryRow('down',ind)}></i>
                                                </span> 
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>    
                    </div>
                </ModalPopup>
                </BalancedScorecardWrapper>
                <AsideComponent />
                
                <FooterComponent />
            </>
        );
    }
}

const mapStateToProps = state => ({
    kpiData : state.balancedScorecard.kpiData,
    categories : state.balancedScorecard.categories,
    allBsc : state.balancedScorecard.allBsc,
    strategicObjectives:state.balancedScorecard.strategicObjectives
})

export default connect(mapStateToProps, {fetchBalancedScorecardKpi,fetchBalancedScorecardCategories, fetchAllBalancedScorecards,fetchAllKpiAgainstBalancedScorecards, startLoader, stopLoader})(BalancedScorecard);