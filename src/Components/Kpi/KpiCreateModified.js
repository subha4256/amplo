import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalPopup from '../common/ModalPopup';
import { Link, withRouter } from 'react-router-dom';
import {toast} from 'react-toastify';
import { Redirect } from 'react-router';
import { Row, Col, Input, Button, Label } from 'reactstrap';
import { deleteRelated, createKpi, getaudit_frequency, getimprovement_basis, getpersona, getuseremails, getKpi, fetchKpiSetById, fetchBcsList,GetCo2EmmisionType,GetCountryforCo2Emmision,CalculateCO2Emmision } from '../../actions/kpiActions';
import CreateControlLever from './ControlLever/CreateM';
import DatePicker from "react-datepicker";
import { Global } from '../../utils/Env';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import KpiCreateModified from './Styling/KpiCreateModified.css'
import axios from 'axios';
import CacheStorage from '../../utils/CacheStorage';
import Axios from 'axios';
import { responseMessage } from '../../utils/alert';
import { nextTick } from 'q';

const config = require('../../config');
class KpiCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FinaliseFlag: 0,
            KPIID: 0,
            controlLevers: [],
            kpiSetId: this.props.setId?this.props.setId:0,
            leverCounter: 0,
            KPITitle: "",
            TargetBusinessOutcome: "",
            BusinessMetricsKPI: "",
            DescriptionKPI:"",
            UnitOfMeasurementKIP: "percent",
            KPIInitiationDate: new Date(),
            BusinessOutComeTargetDate: new Date(),
            PersonaImpacted: "",
            PersonaEmail: "",
            EstimatedAnnualSavingsAmountKPI: "",
            ExpectedTargetGrowthAmount: "",
            HistoricalAchievementAmount: 0,
            ExpectedTargetGrowthPercentageKPI: 0,
            NotificationStart: 1,
            NotificationStartTimeframe: "",
            errors: {},
            uom: [],
            uem: [],
            frequency: {},
            ImprovementbasisKIP: "Month",
            showToolbar: true,
            UOMPercent: true,
            emailModal: false,
            personaModal: false,
            personas: [],
            emails: [],
            leverData: [],
            historyData: [],
            CategoryLookUpId : "",
            updateBscId : true,
            addBscCategoryPopUp : false,
            addCategoryId : 0,
            addCategoryName : "",
            addCategoryDescription : "",
            addCategoryEndDate : "",
            createNewKpi : false,
            emmisionType:"",
            countryType:"",
            estimatedvalue:"",
            factor:"",
            displaytopdiv:false,
            emisionTypevalue:[],
            emisionTypevalueId:[]
            
        }
        Global.callback.deleteRelated_onComplete = () => {
            if (this.props.action) {
                this.props.getKpi({ id: this.props.action, kpiSetId: this.props.setId });
            }
        }
        Global.callback.createKpi_onComplete = (res) => {
            if(this.props.createNewKpi == true){
                this.props.history.push("/kpi-setting/"+res.data.KpiId+"/" + this.state.kpiSetId)
            }
        }
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log(nextProps.createNewKpi);
        // console.log(nextProps.setId,"setID")
        // console.log(nextProps.action,nextProps.setId)
        console.log('LINE FIRST')
        if(nextProps.createNewKpi == true){
            
            if(nextProps.kpiSetDetails.length > 0 && prevState.updateBscId === true && prevState.CategoryLookUpId === ""){
                
                let returnObj = {...prevState};
                returnObj.CategoryLookUpId = nextProps.kpiSetDetails[0].CategoryLookUpId
                returnObj.updateBscId = false;
                returnObj.createNewKpi = true;
                return returnObj;
            }
        }else if(nextProps.createNewKpi == false){
            
            if(nextProps.createNewKpi != prevState.createNewKpi){
                
                nextProps.getimprovement_basis();
                nextProps.getaudit_frequency();
                nextProps.getpersona();
                nextProps.getuseremails()
                if (nextProps.action) {
                    // console.log('this.props.action',this.props.action)
                    nextProps.getKpi({ id: nextProps.action, kpiSetId: nextProps.setId });
                }
                nextProps.fetchKpiSetById(nextProps.setId);
                nextProps.fetchBcsList();
                let returnObj = {...prevState};
                returnObj.createNewKpi = false;
                return returnObj;
            }
        }
        if((nextProps.action != null) && nextProps.setId != null){
                console.log('CONSOLE')
                let returnObj = {}
            if (nextProps.errors && Object.keys(nextProps.errors).length > 0 && prevState.errors !== nextProps.errors) {

                returnObj.errors = nextProps.errors
            }
            if (nextProps.action) {
                console.log('CONSOLE 1')
                returnObj.KPIID = nextProps.action
            }
            if(nextProps.kpiData.details){
                console.log('CONSOLE 2' )
                if (nextProps.kpiData.details.length > 0 && prevState.updateBscId === true && prevState.CategoryLookUpId === "") {
                    returnObj.CategoryLookUpId = nextProps.kpiData.details[0].CategoryLookUpId
                    returnObj.updateBscId = false;
                }
            }
            if (nextProps.uom.length > 0 && nextProps.uom != prevState.uom) {
                console.log('CONSOLE 3')
                returnObj.uom = nextProps.uom
                returnObj.personas = nextProps.uom
            }
            if (nextProps.uem.length > 0 && nextProps.uem != prevState.uem) {
                console.log('CONSOLE 4')
                returnObj.uem = nextProps.uem
                returnObj.emails = nextProps.uem
            }
            let counter = 0;
            if (nextProps.kpiData != prevState.kpiData) {
                console.log('CONSOLE 5')
                if (nextProps.kpiData.controls) {
                    counter = nextProps.kpiData.controls.length
                    console.log('CONSOLE 6')
                    if (nextProps.kpiData.details && nextProps.kpiData.details.length > 0) {
                        console.log('CONSOLE 7')
                        returnObj.kpiData = nextProps.kpiData
                        let kpiData = nextProps.kpiData.details[0]
                        returnObj.leverCounter = counter
                        returnObj.KPIID = kpiData.KPIID
                        returnObj.FirstName = kpiData.FirstName
                        returnObj.DescriptionKPI = kpiData.Description
                        returnObj.ModifiedDate = kpiData.ModifiedDate
                        returnObj.CurrentVersion = kpiData.CurrentVersion
                        returnObj.KPITitle = kpiData.TargetBusinessOutcome
                        returnObj.KPIName = kpiData.TargetBusinessOutcome
                        returnObj.kpiSetId = kpiData.kpiSetId
                        returnObj.ActiveFlag = kpiData.ActiveFlag
                        returnObj.CategoryLookUpId = kpiData.CategoryLookUpId
                        returnObj.FinaliseFlag = kpiData.FinaliseFlag
                        returnObj.BusinessMetricsKPI = kpiData.BusinessMetricsKPI
                        returnObj.TargetBusinessOutcome = kpiData.TargetBusinessOutcome
                        returnObj.PersonaImpacted = kpiData.PersonaImpacted
                        returnObj.PersonaEmail = kpiData.NotificationEmails
                        returnObj.EstimatedAnnualSavingsAmountKPI = kpiData.EstimatedAnnualSavingsAmountKPI
                        returnObj.ExpectedTargetGrowthAmount = kpiData.ExpectedTargetGrowthAmount
                        returnObj.ExpectedTargetGrowthPercentageKPI = kpiData.ExpectedTargetGrowthPercentageKPI
                        returnObj.HistoricalAchievementAmount = kpiData.HistoricalAchievementAmount
                        returnObj.UnitOfMeasurementKIP = kpiData.UnitOfMeasurementKIP
                        returnObj.ImprovementbasisKIP = kpiData.ImprovementbasisKIP
                        returnObj.BusinessOutComeTargetDate = kpiData.BusinessOutComeTargetDate
                        returnObj.AuditFrequencyKIP = kpiData.AuditFrequencyKIP
                        returnObj.KPIInitiationDate = kpiData.KPIInitiationDate
                        returnObj.ExpectedQuantityOnly = kpiData.ExpectedTargetGrowthQty 
                        returnObj.ExpectedTargetQuantityGrowth = kpiData.ExpectedTargetQtyGrowthPercent
                        returnObj.HistoricalQuantityAchieved = kpiData.HistoricalQtyAchived
                        returnObj.NotificationStart = kpiData.NotificationStart ? kpiData.NotificationStart : 1
                        returnObj.NotificationStartTimeframe = kpiData.NotificationStartTimeFrame
                        returnObj.AuditDueDate = kpiData.AuditDueDate
                        if (nextProps.kpiData.controls && nextProps.kpiData.controls.length > 0) {
                            returnObj.leverData = nextProps.kpiData.controls
                            returnObj.controlLevers = nextProps.kpiData.controls
                            for (let i in returnObj.controlLevers) {
                                returnObj.controlLevers[i].leverCounter = parseInt(i) + 1;
                                returnObj.leverData[i].capabilities = [];
                                returnObj.leverData[i].inhibitors = [];
                                for (let j in nextProps.kpiData.capabilities) {
                                    if (nextProps.kpiData.capabilities[j]) {
                                        if (nextProps.kpiData.capabilities[j].KPIControlLeversID == returnObj.controlLevers[i].KPIControlLeversID) {
                                            returnObj.leverData[i].capabilities.push(nextProps.kpiData.capabilities[j])
                                        }
                                    }
                                }
                                for (let k in nextProps.kpiData.inhibitors) {
                                    if (nextProps.kpiData.inhibitors[k]) {
                                        if (nextProps.kpiData.inhibitors[k].KPIControlLeversID == returnObj.controlLevers[i].KPIControlLeversID) {
                                            returnObj.leverData[i].inhibitors.push(nextProps.kpiData.inhibitors[k])
                                        }
                                    }
                                }
                            }

                        }else{
                            returnObj.leverData = []
                            returnObj.controlLevers = []
                        }
                    }
                }
            }
            returnObj.kpiSetId = nextProps.setId
            return returnObj;
        }else{
            return prevState;
        }  
    }
    componentDidMount() {
        setInterval(()=>{
            if(sessionStorage.getItem('refreshKpiPage')!=null){
                sessionStorage.removeItem('refreshKpiPage');
                this.props.getimprovement_basis();
                this.props.getaudit_frequency();
                this.props.getpersona();
                this.props.getuseremails()
                if (this.props.action) {
                    // console.log('this.props.action',this.props.action)
                    this.props.getKpi({ id: this.props.action, kpiSetId: this.props.setId });
                }
                this.props.fetchKpiSetById(this.props.setId);
                this.props.fetchBcsList();
                this.props.GetCo2EmmisionType();
                this.props.GetCountryforCo2Emmision();
            // }

                // Shashi verma, get history popup data

                const head = {
                    "authorization": "Bearer " + CacheStorage.getItem("userToken")
                }
                axios.get(config.laravelBaseUrl+ 'getKPIVersionHistory/'+this.props.setId, {
                    headers: head
                })
                .then(res => {
                    this.setState({historyData: [...res.data.data]})
                })
                .catch(err => console.log(err)) 
            }
        },1000)
        this.props.getimprovement_basis();
        this.props.getaudit_frequency();
        this.props.getpersona();
        this.props.getuseremails()
        if (this.props.action) {
            // console.log('this.props.action',this.props.action)
            this.props.getKpi({ id: this.props.action, kpiSetId: this.props.setId });
        }
        this.props.fetchKpiSetById(this.props.setId);
        this.props.fetchBcsList();
        this.props.GetCo2EmmisionType();
        this.props.GetCountryforCo2Emmision();
    // }

        // Shashi verma, get history popup data

        const head = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken")
        }
        axios.get(config.laravelBaseUrl+ 'getKPIVersionHistory/'+this.props.setId, {
            headers: head
        })
        .then(res => {
            this.setState({historyData: [...res.data.data]})
        })
        .catch(err => console.log(err))
    }
    handleTargetDateChange(date) {

        this.setState({
            BusinessOutComeTargetDate: moment(date).format("MM/DD/YYYY")
        })
    }
    handleKPIInitiationDateChange(date) {

        this.setState({
            KPIInitiationDate: moment(date).format("MM/DD/YYYY")
        })
    }
    handleControlLeverUnitOfM(e, leverCounter) {
        if (leverCounter) {
            let leverData = this.state.leverData;
            if (!leverData[leverCounter - 1]) {
                leverData[leverCounter - 1] = {
                    KPIControlLeversID: 0,
                    inhibitors: [],
                    capabilities: []
                }
            }
            leverData[leverCounter - 1]["UnitOfMeasurementControl"] = e.target.value;
            this.setState({
                leverData: leverData
            });
        }
    }
    handleOnChange(e, leverCounter, parameter, parameterKey) {
        if (leverCounter) {
            let leverData = this.state.leverData;
            if (!leverData[leverCounter - 1]) {
                leverData[leverCounter - 1] = {
                    KPIControlLeversID: 0,
                    inhibitors: [],
                    capabilities: []
                }
            }
            if (parameter) {
                if (!leverData[leverCounter - 1][parameter][parameterKey]) {
                    leverData[leverCounter - 1][parameter][parameterKey] = {
                        [e.target.name]: e.target.value,
                        KPIInhibitorsID: 0,
                        KPICapabilitiesID: 0
                    }
                } else {
                    leverData[leverCounter - 1][parameter][parameterKey][e.target.name] = e.target.value;
                }
            } else {
                if(e.target.name == "ExpectedTargetGrowthQty" || e.target.name == "HistoricalQtyAchived" || e.target.name == "ExpectedTargetQtyGrowthPercent"){
                    leverData[leverCounter-1] = {...leverData[leverCounter-1],
                        ExpectedGainAmount : null,
                        HistoricalGainAmount : null,
                        ExpectedGainPercentage : null,
                        EstimatedAnnualSavingsAmountControl : null,
                        ExpectedSavingsAmount : null,
                        ExpectedTargetGrowth : null,
                    }
                }else if(e.target.name == "ExpectedGainAmount" || e.target.name == "HistoricalGainAmount" || e.target.name == "ExpectedGainPercentage"){
                    leverData[leverCounter-1] = {...leverData[leverCounter-1],
                        ExpectedTargetGrowthQty : null,
                        HistoricalQtyAchived : null,
                        ExpectedTargetQtyGrowthPercent : null
                    }
                }
                // console.log(leverData[leverCounter-1])
                // console.log(e.target.name,"name")
                leverData[leverCounter - 1][e.target.name] = e.target.value;
            }
            this.setState({
                leverData: leverData
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            },
                this.estimatedAnnualSavingChange)

    }
    }
    deleteInhibitor(leverCounter, inhibitorIndex) {
        let dltObj = {
            Id: this.state.leverData[leverCounter - 1].inhibitors[inhibitorIndex].KPIInhibitorsID,
            DeleteFrom: 'KPIInhibitors'
        }
        this.props.deleteRelated(dltObj)
        let leverData = this.state.leverData;
        if (leverData) {
            delete (leverData[leverCounter - 1].inhibitors[inhibitorIndex]);
            this.setState({
                leverData: leverData
            });
        }
    }
    deleteCapability(leverCounter, capabilityIndex) {
        let dltObj = {
            Id: this.state.leverData[leverCounter - 1].capabilities[capabilityIndex].KPICapabilitiesID,
            DeleteFrom: 'KPICapabilities'
        }
        this.props.deleteRelated(dltObj)
        let leverData = this.state.newLeverData;
        if (leverData) {
            delete (leverData[leverCounter - 1].capabilities[capabilityIndex]);
            this.setState({
                newLeverData: leverData
            });
        }
    }
    addControlLever(e) {
        e.preventDefault();
        let leverCounter = this.state.leverCounter;
        let leverData = [...this.state.leverData];
        // console.log(leverData,"beforeIf");
        leverCounter = leverCounter + 1;
        let controlLevers = this.state.controlLevers;
        controlLevers.push({
            leverCounter: leverCounter
        });
        if (!leverData[leverCounter - 1]) {
            // console.log("inIf")
            leverData[leverCounter - 1] = {
                KPIControlLeversID: 0,
                inhibitors: [],
                TargetDate: moment(new Date()).format("YYYY-MM-DD"),
                capabilities: [],
                UnitOfMeasurementControl : (this.state.UnitOfMeasurementKIP == "percent" || this.state.UnitOfMeasurementKIP == "amount")?"percent":"PercentageQty"
            }
        }
        // console.log(leverData,"afterIf")
        this.setState({
            controlLevers: controlLevers,
            leverCounter: leverCounter,
            leverData: leverData
        });

    }
    deleteLever(e, index) {
        let dltObj = {
            Id: this.state.leverData[index - 1].KPIControlLeversID,
            DeleteFrom: 'KPIControlLevers'
        }
        this.props.deleteRelated(dltObj)
        e.preventDefault();
        const levers = this.state.controlLevers;
        delete levers[index - 1];
        this.setState({
            controlLevers: levers
        })
    }
    estimatedAnnualSavingChange = () => {
        if(this.state.UnitOfMeasurementKIP == "PercentageQty" || this.state.UnitOfMeasurementKIP == "quantity"){
            let amt = this.state.EstimatedAnnualQuantitySavings;
            if (this.state.UnitOfMeasurementKIP == "PercentageQty") {
                amt = Number(Number(this.state.HistoricalQuantityAchieved) * Number(this.state.ExpectedTargetQuantityGrowth));
                amt = Number(amt / 100);
            } else if (this.state.UnitOfMeasurementKIP == "quantity") {
                amt = Number(this.state.ExpectedQuantityOnly);
            }
            switch(this.state.ImprovementbasisKIP){
                case "Month":
                    amt = amt*12;
                break;
                case "Quarter":
                    amt = amt*4;
                break;
                case "Semi-Annually":
                    amt = amt*2;
                break;
                case "Year":
                    amt = amt;
                break;
            }
            this.setState({ EstimatedAnnualSavingsQuantityKPI: amt })
        }else if(this.state.UnitOfMeasurementKIP == "percent" || this.state.UnitOfMeasurementKIP == "amount"){
            let amt = this.state.EstimatedAnnualSavingsAmountKPI;
            if (this.state.UnitOfMeasurementKIP == "percent") {
                amt = Number(Number(this.state.HistoricalAchievementAmount) * Number(this.state.ExpectedTargetGrowthPercentageKPI));
                amt = Number(amt / 100);
            } else if (this.state.UnitOfMeasurementKIP == "amount") {
                amt = Number(this.state.ExpectedTargetGrowthAmount);
            }
            switch(this.state.ImprovementbasisKIP){
                case "Month":
                    amt = amt*12;
                break;
                case "Quarter":
                    amt = amt*4;
                break;
                case "Semi-Annually":
                    amt = amt*2;
                break;
                case "Year":
                    amt = amt;
                break;
            }
            this.setState({ EstimatedAnnualSavingsAmountKPI: amt })
        }
    }
    saveKpiData() {
        if(!this.state.CategoryLookUpId)
        {
            return toast.error("Please select BSC Category first. This is mandatory",{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose:5000
            });
        }else if(!this.state.TargetBusinessOutcome || this.state.TargetBusinessOutcome=='')
        {
            return toast.error("Please give Business Target Outcome/KPI Name first. This is mandatory",{
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose:5000
            });
        }
        let kpiObj = {
            inputJson: {
                KPIID: this.state.KPIID,
                KPITitle: this.state.TargetBusinessOutcome,
                KPIName: this.state.TargetBusinessOutcome,
                kpiSetId: this.state.kpiSetId,
                Description:this.state.DescriptionKPI,
                ActiveFlag: 1,
                CategoryLookUpId: this.state.CategoryLookUpId,
                FinaliseFlag: this.state.FinaliseFlag,
                BusinessMetricsKPI: this.state.BusinessMetricsKPI,
                TargetBusinessOutcome: this.state.TargetBusinessOutcome,
                PersonaImpacted: this.state.PersonaImpacted,
                PersonaEmail: this.state.PersonaEmail,
                EstimatedAnnualSavingsAmountKPI: (this.state.UnitOfMeasurementKIP == "percent" || this.state.UnitOfMeasurementKIP == "amount")?this.state.EstimatedAnnualSavingsAmountKPI:null,
                ExpectedTargetGrowthAmount: (this.state.UnitOfMeasurementKIP == "percent" || this.state.UnitOfMeasurementKIP == "amount")?this.state.ExpectedTargetGrowthAmount:null,
                ExpectedTargetGrowthPercentageKPI: (this.state.UnitOfMeasurementKIP == "percent" || this.state.UnitOfMeasurementKIP == "amount")?this.state.ExpectedTargetGrowthPercentageKPI:null,
                ExpectedTargetGrowthQty:(this.state.UnitOfMeasurementKIP == "percent" || this.state.UnitOfMeasurementKIP == "amount")?null:this.state.ExpectedQuantityOnly?this.state.ExpectedQuantityOnly:null,
                HistoricalQtyAchived:(this.state.UnitOfMeasurementKIP == "percent" || this.state.UnitOfMeasurementKIP == "amount")?null:this.state.HistoricalQuantityAchieved?this.state.HistoricalQuantityAchieved:null,
                ExpectedTargetQtyGrowthPercent:(this.state.UnitOfMeasurementKIP == "percent" || this.state.UnitOfMeasurementKIP == "amount")?null:this.state.ExpectedTargetQuantityGrowth?this.state.ExpectedTargetQuantityGrowth:null,
                HistoricalAchievementAmount: this.state.HistoricalAchievementAmount,
                UnitOfMeasurementKIP: this.state.UnitOfMeasurementKIP,
                ImprovementbasisKIP: this.state.ImprovementbasisKIP,
                BusinessOutComeTargetDate: this.state.BusinessOutComeTargetDate,
                AuditFrequencyKIP: this.state.AuditFrequencyKIP,
                KPIInitiationDate: this.state.KPIInitiationDate,
                AuditDueDate: this.AuditDueDateCal(),
                NotificationStartDate: moment(new Date()).format("MM/DD/YYYY"),
                NotificationStart: this.state.NotificationStart,
                NotificationStartTimeFrame: this.state.NotificationStartTimeframe,
                KPIControlLeversJSON: this.state.leverData != ""?this.state.leverData[0].ControlLeversName ? this.state.leverData : [] : []
            }
        }
        this.props.createKpi(kpiObj);
    }
    handleTargetDateRollUp() {
        let leverData = this.state.leverData;
        let targetDate = this.state.BusinessOutComeTargetDate;
        for (let i in leverData) {
            if (targetDate != "") {
                //let findIndex = leverData[i].target_date.indexOf('-');
                //if(findIndex > -1){
                let getSplitLeverDate = leverData[i].TargetDate.split('-');
                let getLeverDate = new Date(getSplitLeverDate[0], Number(getSplitLeverDate[1]) - 1, getSplitLeverDate[2]);

                if (getLeverDate > targetDate) {
                    targetDate = getLeverDate;
                }
                //}
                // else{
                //     if(leverData[i].target_date > targetDate){
                //         targetDate = leverData[i].target_date;
                //     }
                // }
            }
        }
        this.setState({
            BusinessOutComeTargetDate: targetDate
        })
    }
    handleToolbarToggle = () => {
        let showToolbar = this.state.showToolbar
        this.setState({ showToolbar: !(showToolbar) });
    }
    handleUOMPercentToggle = (e) => {
        if (e.target.value === "percent") {
            this.setState({
                UOMPercent: true,
                UnitOfMeasurementKIP: e.target.value
            })
        }
        else {
            this.setState({
                UOMPercent: false,
                UnitOfMeasurementKIP: e.target.value
            })
        }
    }
    handleClickEstimatedSavingsRollUp() {
        let EstimatedAnnualSavingsAmountKPI = 0;
        let leverData = this.state.leverData;
        for (let i in leverData) {
            EstimatedAnnualSavingsAmountKPI += Number(leverData[i].EstimatedAnnualSavingsAmountControl);
        }
        this.setState({
            EstimatedAnnualSavingsAmountKPI: EstimatedAnnualSavingsAmountKPI
        });
    }
    handleEstimatedSavingsRollUp() {
        let estimated_saving = 0;
        let frequencyConversion = 1;
        let leverData = this.state.leverData;
        // console.log(leverData)
        for (let i in leverData) {
            let inhibitorCosts = 0;
            let capabilityCosts = 0;
            let opexCosts = 0;
            let capexCosts = 0;
            let expectedGain = 0;
            let auditFrequency = 0;
            switch (leverData[i].ImprovementBasisControl) {
                case 'Month':
                    auditFrequency = 730;
                    break;
                case 'Quarter':
                    auditFrequency = 2190;
                    break;
                case 'Semi-Annually':
                    auditFrequency = 4380;
                    break;
                case 'Year':
                    auditFrequency = 8760;
                    break;
                case 'default':
                    auditFrequency = 0;
            }
            if (auditFrequency != 0) {
                expectedGain = (leverData[i].ExpectedSavingsAmount / auditFrequency) * 8760;
                // console.log(expectedGain, leverData[i].ExpectedSavingsAmount, auditFrequency);
                for (let j in leverData[i].inhibitors) {
                    let getImpactCosts = "";
                    if (leverData[i].inhibitors[j].RiskProbabilityPercentage) {
                        //console.log(this.state.leverData[i].inhibitors[j].RiskProbabilityPercentage)
                        let probability = this.state.leverData[i].inhibitors[j].RiskProbabilityPercentage.replace('%', '');
                        if (this.state.leverData[i].inhibitors[j].ImpactCost) {
                            getImpactCosts = this.state.leverData[i].inhibitors[j].ImpactCost.replace('$');
                        }
                        if (probability && parseInt(probability) > 0 && getImpactCosts != "") {
                            inhibitorCosts = inhibitorCosts + (parseFloat(probability / 100) * getImpactCosts);
                        }
                        //console.log(inhibitorCosts);
                    }
                }

                for (let k in leverData[i].capabilities) {
                    //console.log(leverData[i].capabilities);
                    switch (leverData[i].capabilities[k].Frequency) {
                        case 'Monthly':
                            frequencyConversion = 730;
                            break;
                        case 'Quarterly':
                            frequencyConversion = 2190;
                            break;
                        case 'Yearly':
                            frequencyConversion = 8760;
                            break;
                        case 'default':
                            frequencyConversion = 0;
                    }
                    if (frequencyConversion != 0) {
                        let getCapexCosts = "";
                        let getOpexCosts = "";
                        if (this.state.leverData[i].capabilities[k].Capex && this.state.leverData[i].capabilities[k].CapexSpreadYears && this.state.leverData[i].capabilities[k].CapexSpreadYears > 0) {
                            if (this.state.leverData[i].capabilities[k].Capex) {
                                getCapexCosts = this.state.leverData[i].capabilities[k].Capex.replace('$');
                            }
                            if (this.state.leverData[i].capabilities[k].Opex) {
                                getOpexCosts = this.state.leverData[i].capabilities[k].Opex.replace('$');
                            }
                            capexCosts = capexCosts + parseFloat(getCapexCosts / this.state.leverData[i].capabilities[k].CapexSpreadYears);
                            opexCosts = opexCosts + (parseFloat(getOpexCosts / frequencyConversion) * 8760);
                            capabilityCosts = capabilityCosts + capexCosts + opexCosts;
                        }
                    }
                }
                // console.log(expectedGain);
                if (parseInt(expectedGain) > 0) {
                    let estimatedAnnualSaving = Number(expectedGain) - Number(inhibitorCosts) - Number(capabilityCosts);
                    leverData[i].EstimatedAnnualSavingsAmountControl = parseInt(estimatedAnnualSaving);
                    // console.log(leverData[i].EstimatedAnnualSavingsAmountControl)
                    //leverData[i].estimated_annual_saving1 = estimatedAnnualSaving.toLocaleString();
                }
                //console.log(estimated_saving);
            }

        }
        //console.log(estimated_saving);
        if (this.state.leverData !== leverData) {
            this.setState({ leverData });
        }
    }
    handlePersonaModal = () => {
        this.setState({ personaModal: true })
    }
    handleEmailModal = () => {
        this.setState({ emailModal: true })
    }
    togglePersonaModal = () => {
        this.setState({ personaModal: !this.state.personaModal })
    }
    toggleEmailModal = () => {
        this.setState({ emailModal: !this.state.emailModal })
    }
    emailSave = () => {
        let emailText = ""
        for (let i in this.state.emails) {
            if (this.state.emails[i].IsSelected == "1") {
                emailText += this.state.emails[i].EmailAddress + ',';
            }
        }
        this.setState({
            emailModal: !this.state.emailModal,
            PersonaEmail: emailText
        })
    }
    personaSave = () => {
        let personaText = ""
        for (let i in this.state.personas) {
            if (this.state.personas[i].IsSelected == "1") {
                personaText += this.state.personas[i].PersonaName + ',';
            }
        }
        this.setState({
            personaModal: !this.state.personaModal,
            PersonaImpacted: personaText
        })
    }
    handlePersonaEmailChange(e, key) {
        let emails = this.state.emails;
        if (e.target.checked) {
            emails[key].IsSelected = "1";
        } else {
            emails[key].IsSelected = "0";
        }
        this.setState({
            emails: emails
        })
    }
    handlePersonaChange(e, key) {
        let personas = this.state.personas;
        if (e.target.checked) {
            personas[key].IsSelected = "1";

        } else {
            personas[key].IsSelected = "0";
        }
        this.setState({
            personas: personas
        })
    }
    finlseKpihndkler(e) {
        let FinaliseFlag = ""
        if (e.target.checked) {
            FinaliseFlag = 1
        } else {
            FinaliseFlag = 0
        }
        this.setState({
            FinaliseFlag: FinaliseFlag
        })
    }
    handleNotificationStart(e) {
        let NotificationStart = this.state.NotificationStart
        //console.log(e.target.name)
        if (e.target.name === "minus") {
            if (NotificationStart > 0) {
                NotificationStart = NotificationStart - 1
            }
        }
        else if (e.target.name === "plus") {
            NotificationStart = NotificationStart + 1
        }
        this.setState({ NotificationStart: NotificationStart })
    }
    handleAddInhibitor(leverCounter) {
        let leverData = this.state.leverData;
        if (!leverData[leverCounter - 1]) {
            leverData[leverCounter - 1] = {
                KPIControlLeversID: 0,
                inhibitors: [],
                capabilities: []
            }
        }
        leverData[leverCounter - 1].inhibitors.push({
            KPIInhibitorsID: 0,
            InhibitorsName: "",
            RiskProbabilityPercentage: ""
        });
        this.setState({
            leverData: leverData
        });
    }
    AuditDueDateHandler(e) {
        this.setState({
            AuditDueDate: e.target.value
        })
    }
    AuditDueDateCal() {
        let KPIInitiationDate = this.state.KPIInitiationDate
        let AuditFrequencyKIP = this.state.AuditFrequencyKIP
        let x = 0;
        switch (AuditFrequencyKIP) {
            case "Monthly":
                x = 1
                break
            case "Quarterly":
                x = 3
                break
            case "Yearly":
                x = 12
                break

        }
        let startDate = new Date(KPIInitiationDate);
        let endDateMoment = moment(startDate); // moment(...) can also be used to parse dates in string format
        endDateMoment.add(x, 'months');
        return endDateMoment.format("MM/DD/YYYY")
    }
    handleAddCapability(leverCounter) {
        let leverData = this.state.leverData;
        if (!leverData[leverCounter - 1]) {
            leverData[leverCounter - 1] = {
                KPIControlLeversID: 0,
                inhibitors: [],
                capabilities: []
            }
        }
        leverData[leverCounter - 1].capabilities.push({
            KPICapabilitiesID: 0,
            CapabilitiesName: "",
            Capex: "",
            Opex: ""
        });
        this.setState({
            leverData: leverData
        });
    }
    getimprovementbasisFromStore = () => {
        let improvement_basis = [];
        if ((this.props.improvement_basis).length > 0) {
            improvement_basis = this.props.improvement_basis.map(improvement_basis => {
                return (<option key={"Id" + improvement_basis} value={improvement_basis}>{(improvement_basis !== "Semi-Annual" && improvement_basis !== "Semi-Annually") ? ("Per " + improvement_basis) : improvement_basis}</option>)
            })
        }
        return improvement_basis;
    }
    getauditfrequencyFromStore = () => {
        let audit_frequency = [];
        if ((this.props.frequency).length > 0) {
            audit_frequency = this.props.frequency.map(Frequency => {
                return (<option key={"Id" + Frequency} value={Frequency}>{Frequency}</option>)
            })
        }
        return audit_frequency;
    }
    getEmailFromStore = () => {
        let email = [];
        if ((this.state.emails).length > 0) {
            email = this.state.emails.map((p, i) => {
                return (
                    < tr key={p.UserID + i}>
                        <td><input type="checkbox" id={"Id" + p.UserID}
                            checked={(p.IsSelected) ? (p.IsSelected === "1" ? true : false) : false}
                            onChange={(e) => this.handlePersonaEmailChange(e, i)} /></td>
                        <td>{p.FirstName}</td>
                        <td>{p.EmailAddress}</td>
                    </tr >
                )
            })
        }
        return email;
    }
    getPersonaFromStore = () => {
        let persona = [];
        if ((this.state.personas).length > 0) {
            persona = this.state.personas.map((p, i) => {
                return (
                    < tr key={p + i}>
                        <td><input type="checkbox" id={"Id" + p.PersonaId}
                            checked={(p.IsSelected) ? (p.IsSelected === "1" ? true : false) : false}
                            onChange={(e) => this.handlePersonaChange(e, i)} /></td>
                        <td>{p.PersonaName}</td>
                        <td>Persona Impacted</td>
                    </tr >
                )
            })
        }
        return persona;
    }
    exportDataHandler = () => {
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken"),
            //"responseType": "arraybuffer"
        }
        //  axios.get('http://divadev.azurewebsites.net/public/api/generateCSV/9/598'+'/'+this.props.projectId+'/'+this.props.functionId, {
        //     headers: headers
        // })
        axios.get(config.laravelBaseUrl+ 'exportKpi/'+this.state.KPIID, {
            headers: headers
        })
        .then(res => {
            //console.log(res.data);
            let fileName = res.data.data.file_name;
            window.open(config.ApiBaseUrl+fileName, '_blank');
            let fileArray = {
                'file_name': fileName
            }
            setTimeout(function(){
                return axios.post(config.laravelBaseUrl+ 'unlinkFile', fileArray, {
                    headers: headers
                })
            },10000);
        });
        
        console.log("ssfsdfds")
        
    }
     handleSubmit = () => {
        if(this.state.estimatedvalue<=0 || this.state.estimatedvalue==null){
            responseMessage("error", "Please select Estimated Value!");
        }
        else if(this.state.factor<=0 || this.state.factor==null){
            responseMessage("error", "Please select Conversion Factor!");
        }
        else if(this.state.emisionTypevalueId<=0 || this.state.emisionTypevalueId==null){
            responseMessage("error", "Please select Emissions Type!");
        }
        else{   
        this.props.CalculateCO2Emmision({"$UOM":this.state.estimatedvalue,"$EPA":this.state.factor})
        this.setState({
            displaytopdiv : true,
        })
        }    
    }
    handleReset=()=>{
        this.setState({
            displaytopdiv : false,
            estimatedvalue:"",
            factor:""
        })
    }
 
    bscCategoryChangeHandler = (e) => {
        this.setState({
            CategoryLookUpId : e.target.value
        })
    }
    co2EmmisionType = (e) => {
        this.setState({
            emmisionType : e.target.value
        })
        let unitsq= e.target.value.split('_');
        this.setState({
            emisionTypevalue: unitsq[1],
            emisionTypevalueId:unitsq[0]
        })
    }
    co2EmmisionCountryType = (e) => {
        console.log(e.target.value)
        this.setState({
            countryType : e.target.value
        })
    }
    handleChangeEstimatedvalue=(e)=>{
        this.setState({
            estimatedvalue:e.target.value
        })
    }
    handleChangeFactor=(e)=>{
        this.setState({
            factor:e.target.value
        })
    }
   
    addBscCategoryPopUpOpen = () => {
        this.setState({
          addBscCategoryPopUp : !this.state.addBscCategoryPopUp
        })
    }
    addCategoryCategoryChangeHandler = (e) => {
        // console.log(e.target.value,"value")
        if(e.target.value == ""){
          this.setState({
            addCategoryName : "",
            addCategoryDescription : "",
            addCategoryEndDate : "",
            addCategoryId : 0
          })
        }else{
          let ind = this.props.kpiBsc.map(cat=>cat.CategoryLookUpId).indexOf(e.target.value);
          if(ind >= 0){
            this.setState({
              addCategoryName : this.props.kpiBsc[ind].CategoryName,
              addCategoryDescription : this.props.kpiBsc[ind].CategoryDescription,
              addCategoryEndDate : this.props.kpiBsc[ind].EndDate?new Date(this.props.kpiBsc[ind].EndDate):"",
              addCategoryId : this.props.kpiBsc[ind].CategoryLookUpId
            })
          }
        }
      }
      addCategoryFieldChangeHandler = (e) => {
        this.setState({
          [e.target.name] : e.target.value
        })
      }
      addCategoryendDateChangeHandler = (date) => {
        // console.log(date)
        this.setState({
          addCategoryEndDate : date
        })
      }
      saveAddCategoryHandler = async() => {
        let saveObj = {
          Id:this.state.addCategoryId,
          Name:this.state.addCategoryName,
          Description:this.state.addCategoryDescription,
          EndDate:this.state.addCategoryEndDate!= ""?moment(this.state.addCategoryEndDate).format("YYYY-MM-DD"):"",
          ActiveFlag:"1"
        }
        Axios.post(config.laravelBaseUrl + 'saveBscCategory',saveObj,{
          headers : {
            "authorization": "Bearer " + sessionStorage.getItem("userToken")
          }
        }).then(res => {
          // console.log(res)
          responseMessage("success",res.data.message)
          this.props.fetchBcsList();
        }).catch(err => {
          responseMessage("error",err.response.data.message)
        })
        this.setState({
          addCategoryName : "",
          addCategoryDescription : "",
          addCategoryEndDate : "",
          addCategoryId : 0
        })
        this.addBscCategoryPopUpOpen();
        this.setState({addCategoryShowValidation:false})
        
      }
    render() {
        console.log(this.state.leverData)
        // console.log(this.state.CategoryLookUpId,"inKpiCreateRender")
        let kpiData = {};
        let kpiLevers = [];
        if (this.state.kpiData && Object.keys(this.state.kpiData).length > 0) {

            kpiData = this.state.kpiData.details[0];
            kpiLevers = this.state.kpiData.controls;
        }
        // console.log(this.state.UnitOfMeasurementKIP,"unit of measurement")
        // console.log(this.state.ImprovementbasisKIP,"improvement basis")
        const { errors } = this.state;
        let controlLevers = this.state.controlLevers.map((controlLever, key) => {
            return <CreateControlLever
                kpiMeasurementType = {this.state.UnitOfMeasurementKIP}
                handleAddCapability={this.handleAddCapability.bind(this)}
                handleAddInhibitor={this.handleAddInhibitor.bind(this)}
                key={'controlLever-' + key}
                handleControlLeverUnitOfM={this.handleControlLeverUnitOfM.bind(this)}
                deleteLever={this.deleteLever.bind(this)}
                leverCounter={controlLever.leverCounter}
                handleOnChange={this.handleOnChange.bind(this)}
                leverData={this.state.leverData}
                deleteInhibitor={this.deleteInhibitor.bind(this)}
                deleteCapability={this.deleteCapability.bind(this)}
                handleEstimatedSavingsRollUp={this.handleEstimatedSavingsRollUp.bind(this)} />;
        });
        let personaList = this.getPersonaFromStore();
        let emailList = this.getEmailFromStore();
        let audit_frequency = this.getauditfrequencyFromStore()
        let improvement_basis = this.getimprovementbasisFromStore();
        let x = ""
        if (this.state.BusinessOutComeTargetDate) {
            x = (moment(this.state.BusinessOutComeTargetDate).format("MM/DD/YYYY")).split("/")
            //console.log(x)
        }
        let y = moment(new Date()).format("MM/DD/YYYY").split("/")
        if (this.state.KPIInitiationDate) {
            y = (moment(this.state.KPIInitiationDate).format("MM/DD/YYYY")).split("/")
        }
        let amt = "";
        if (this.state.UnitOfMeasurementKIP == "percent") {
            amt = Number(Number(this.state.HistoricalAchievementAmount) * Number(this.state.ExpectedTargetGrowthPercentageKPI));
            amt = Number(amt / 100);
        } else {
            amt = Number(this.state.ExpectedTargetGrowthAmount);
        }
        console.log("hkk",this.props.savecalculateEmmisionValue.tCO2)
        console.log("kk",this.state.displaytopdiv)
        return (
            <>
            <Row>
                <Col sm="12" md="3" lg="7" className="new-kpi-col">
                    <div className="d-sm-flex justify-content-between">
                        <h2 className="kpi-heading mt-3">{this.state.TargetBusinessOutcome!=""?this.state.TargetBusinessOutcome:"Add New KPI (KPI Name will be same as the Business Outcome)"}</h2>
                    </div>
                    <div className="update-kpi-version mb-3">
                        <h2 className="heading-updatekpi-version"><span className="infoicon-class"><i className="fas fa-info-circle"></i></span>Updated Version
                        <b> {this.state.CurrentVersion ? this.state.CurrentVersion : 1} </b>
                            {this.state.ModifiedDate ? "Modified By : " : ""}
                            <b>{this.state.FirstName ? this.state.FirstName : ""}</b>
                            {this.state.ModifiedDate ? " on " + moment(this.state.ModifiedDate).format("MM/DD/YYYY") : ""}
                            <a href="#" className="float-right d-block mt-2 pt-1" data-toggle="modal" data-target="#historyModal">History</a></h2>
                    </div>
                    <div className="bg-white newkpi-form p-0">
                        <div className="padding-control-bg-white">
                            <div className="form-group text-right mb-1">
                                <div className="checkbox">
                                    <label className="mb-0"><input type="checkbox" className="pos-rel-top-2" checked={(this.state.FinaliseFlag == "1") ? true : false}
                                        onChange={(e) => this.finlseKpihndkler(e)} />&nbsp;&nbsp;Finalize KPI </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>BSC Category*</label>
                                <div className="drop-form-control">
                                    <select className="form-control" value={this.state.CategoryLookUpId} onChange={this.bscCategoryChangeHandler.bind(this)}>
                                        <option value="">Select BSC Category</option>
                                        {this.props.kpiBsc.map(bsc=>{
                                            return(
                                                <option value={bsc.CategoryLookUpId}>{bsc.CategoryName}</option>
                                            )
                                        })}
                                        {/* <option value={this.props.kpiSetDetails[0] ? this.props.kpiSetDetails[0].CategoryName : ""}>{this.props.kpiSetDetails[0] ? this.props.kpiSetDetails[0].CategoryName : ""}</option> */}
                                    </select>
                                    {/* <input className="form-control" disabled={true} value={this.props.kpiSetDetails[0] ? this.props.kpiSetDetails[0].CategoryName : ""} /> */}
                                </div>
                            </div>
                            <div className="form-group">
                                <a href="#" onClick={()=>this.addBscCategoryPopUpOpen()}>Add/Edit BSC Category</a>
                            </div>
                            <ModalPopup isOpen={this.state.addBscCategoryPopUp} toggle={this.addBscCategoryPopUpOpen.bind(this)} title="Add/Edit BSC Category">
                                <div class="form-group">
                                    <label>Select Existing Category (for Edit)<span class="text-danger"></span></label>
                                    <select className="form-control create-assessment-form" value={this.state.addCategoryId} onChange={(e)=>this.addCategoryCategoryChangeHandler(e)}>
                                        <option value=""></option>
                                        {this.props.kpiBsc.map((cat)=>{
                                        return (
                                            <option key={cat.CategoryLookUpId} value={cat.CategoryLookUpId}>{cat.CategoryName}</option>
                                        )
                                        })}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>New Category Name <span class="text-danger">*</span></label>
                                    <input className="form-control" type="text" name="addCategoryName" onChange={(e) => this.addCategoryFieldChangeHandler(e)} value={this.state.addCategoryName} />  {this.state.addCategoryName == "" && this.state.addCategoryShowValidation?<span class="text-danger">Category Name is required.</span>:""}
                                </div>
                                <div class="form-group">
                                    <label>New Category Description<span class="text-danger"></span></label>
                                    <input className="form-control" type="text" name="addCategoryDescription"  onChange={(e) => this.addCategoryFieldChangeHandler(e)} value={this.state.addCategoryDescription} />    {this.state.versionReason == ""?<span class="text-danger">Version Updrade reason is required.</span>:""}                                          
                                </div>
                                <div class="form-group">
                                    <label>Disable Date<span className="text-danger"></span></label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="far fa-calendar-alt"></i>
                                                </div>
                                            </div>
                                            <DatePicker
                                                onKeyDown={event => {
                                                event.preventDefault();
                                                return false;
                                                }}
                                                className="form-control border-secondary py-2 dis-date"
                                                id="endDate"
                                                minDate={new Date()}
                                                onChange={this.addCategoryendDateChangeHandler}
                                                dateFormat="dd/MM/yyyy"
                                                selected={this.state.addCategoryEndDate?this.state.addCategoryEndDate:''}
                                            />
                                        </div>                                      
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"  onClick={()=>this.addBscCategoryPopUpOpen()}>Cancel</button> 
                                    <button type="button" className="btn btn-primary ml-3"  onClick={this.state.addCategoryName != ""?()=>this.saveAddCategoryHandler():()=>{this.setState({addCategoryShowValidation:true})}}>Save</button> 
                                </div> 
                                </ModalPopup>
                            <div className="form-group">
                                <label>Business Target Outcome/KPI Name*</label>
                                <Input type="text" className="form-control"
                                    name="TargetBusinessOutcome"
                                    onChange={(e) => this.handleOnChange(e, null, null, null)}
                                    value={this.state.TargetBusinessOutcome}
                                    onBlur={(e) => e.target.placeholder = 'Reduce Energy, Water and Waste costs by 1% to 2%'}
                                    onFocus={(e) => e.target.placeholder = ''} placeholder="Reduce Energy, Water and Waste costs by 1% to 2%" />
                                {Object.keys(errors).length > 0 && errors.data && errors.data.TargetBusinessOutcome ? <p className="text-danger">{errors.data.TargetBusinessOutcome[0]}</p> : <></>}
                            </div>
                            <div className="form-group">
                                <label>Business Metrics</label>
                                <Input type="text" className="form-control"
                                    name="BusinessMetricsKPI"
                                    onChange={(e) => this.handleOnChange(e, null, null, null)}
                                    value={this.state.BusinessMetricsKPI}
                                    onBlur={(e) => e.target.placeholder = 'XXXXX XXX'}
                                    onFocus={(e) => e.target.placeholder = ''} placeholder="XXXXX XXX" />
                                {Object.keys(errors).length > 0 && errors.data && errors.data.BusinessMetricsKPI ? <p className="text-danger">{errors.data.BusinessMetricsKPI[0]}</p> : <></>}
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <Input type="textarea" className="form-control"
                                
                                    name="DescriptionKPI"
                                    onChange={(e) => this.handleOnChange(e, null, null, null)}
                                    value={this.state.DescriptionKPI}
                                    onBlur={(e) => e.target.placeholder = 'Description'}
                                    onFocus={(e) => e.target.placeholder = ''} placeholder="Description" />
                                {Object.keys(errors).length > 0 && errors.data && errors.data.DescriptionKPI ? <p className="text-danger">{errors.data.DescriptionKPI[0]}</p> : <></>}
                            </div>
                            <div className="form-group drop-form-control">
                                <Row>
                                    <Col md="4">
                                        <label>Unit Of Measurement</label>
                                        {/* <form> */}
                                        <select className="form-control" value={this.state.UnitOfMeasurementKIP} onChange={(e) => this.handleUOMPercentToggle(e)}>
                                            <option value="percent">Percentage $</option>
                                            <option value="amount">Amount Based Target</option>
                                            <option value="PercentageQty">Percentage Qty</option>
                                            <option value="quantity">Quantity Only</option>
                                        </select>
                                            {/* <label className="radio-inline font-13-color000" id="percent">
                                                <input type="radio" className="pos-rel-top-2" name="percent" checked={(this.state.UnitOfMeasurementKIP == "percent") ? true : false}
                                                    onChange={(e) => this.handleUOMPercentToggle(e)} />&nbsp;&nbsp;Percentage &nbsp;&nbsp;&nbsp;
                                            </label>
                                            <label className="radio-inline font-13-color000" id="amount">
                                                <input type="radio" className="pos-rel-top-2" name="amount" checked={(this.state.UnitOfMeasurementKIP == "amount") ? true : false}
                                                    onChange={(e) => this.handleUOMPercentToggle(e)} />&nbsp;&nbsp;Amount
                                            </label> */}
                                        {/* </form> */}
                                    </Col>
                                    {(this.state.UnitOfMeasurementKIP == "amount")?
                                    <Col sm="8" className="amt-chk-show">
                                        <label>Expected Target Growth $</label>
                                        <input className="form-control"
                                            name="ExpectedTargetGrowthAmount"
                                            value={this.state.ExpectedTargetGrowthAmount || ""}
                                            type='number' onChange={(e) => { this.handleOnChange(e, null, null, null) }} />
                                        {Object.keys(errors).length > 0 && errors.data && errors.data.ExpectedTargetGrowthAmount ? <p className="text-danger">{errors.data.ExpectedTargetGrowthAmount[0]}</p> : <></>}
                                    </Col>:null}
                                    {(this.state.UnitOfMeasurementKIP == "percent")?
                                    <>
                                    <Col md="4" className="p-0 per-chk-show">
                                        <label>Historical $ Achievement</label>
                                        <input type="number" className="form-control"
                                            name="HistoricalAchievementAmount"
                                            value={this.state.HistoricalAchievementAmount}
                                            onChange={(e) => { this.handleOnChange(e, null, null, null) }} />
                                    </Col>
                                    <Col md="4" className={(this.state.UnitOfMeasurementKIP == "percent") ? "per-chk-show" : "per-chk-hide"}>
                                        <label>Expected Target Growth %</label>
                                        <input type="number" className="form-control"
                                            name="ExpectedTargetGrowthPercentageKPI"
                                            min="0" max="100"
                                            value={this.state.ExpectedTargetGrowthPercentageKPI}
                                            onChange={(e) => { this.handleOnChange(e, null, null, null) }} />
                                    </Col></>:null}
                                    {(this.state.UnitOfMeasurementKIP == "PercentageQty")?
                                    <>
                                    <Col md="4" className="p-0 per-chk-show">
                                        <label>Historical Quantity Achieved</label>
                                        <input type="number" className="form-control"
                                            name="HistoricalQuantityAchieved"
                                            value={this.state.HistoricalQuantityAchieved?this.state.HistoricalQuantityAchieved:""}
                                            onChange={(e) => { this.handleOnChange(e, null, null, null) }} />
                                    </Col>
                                    <Col md="4" className="per-chk-show">
                                        <label>Expected Target Quantity Growth %</label>
                                        <input type="number" className="form-control"
                                            name="ExpectedTargetQuantityGrowth"
                                            min="0" max="100"
                                            value={this.state.ExpectedTargetQuantityGrowth?this.state.ExpectedTargetQuantityGrowth:""}
                                            onChange={(e) => { this.handleOnChange(e, null, null, null) }} />
                                    </Col></>:null}
                                    {(this.state.UnitOfMeasurementKIP == "quantity")?
                                    <Col sm="8" className="amt-chk-show">
                                        <label>Expected Target Growth Quantity</label>
                                        <input className="form-control"
                                            name="ExpectedQuantityOnly"
                                            value={this.state.ExpectedQuantityOnly?this.state.ExpectedQuantityOnly:""}
                                            type='number' onChange={(e) => { this.handleOnChange(e, null, null, null) }} />
                                        {Object.keys(errors).length > 0 && errors.data && errors.data.ExpectedTargetGrowthAmount ? <p className="text-danger">{errors.data.ExpectedTargetGrowthAmount[0]}</p> : <></>}
                                    </Col>:null}
                                </Row>
                            </div>
                            <div className="form-group drop-form-control">
                                <Row>
                                    <Col md="6">
                                        <label>Business Target Outcome/KPI Initiation Date</label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="fas fa-calendar-alt"></i>
                                                </div>
                                            </div>
                                            <DatePicker
                                                className="form-control textbox-control dateControl-class-kpinew"
                                                selected={new Date(y[2], y[0] - 1, y[1])}
                                                onChange={(date) => this.handleKPIInitiationDateChange(date)} />
                                        </div>
                                    </Col>
                                    <Col sm="6">
                                        <label>Business Target Outcome/KPI Target Date</label>
                                        <div className="d-flex mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="fas fa-calendar-alt"></i>
                                                </div>
                                            </div>
                                            <DatePicker
                                                className="form-control textbox-control dateControl-class"
                                                selected={new Date(x[2], x[0] - 1, x[1])}
                                                onChange={(date) => this.handleTargetDateChange(date)}
                                            />
                                            <Button className="topbox-arrow" color="primary"
                                                disabled={(this.state.leverCounter > 0) ? false : true}
                                                onClick={this.handleTargetDateRollUp.bind(this)}><i className="fa fa-caret-up"></i></Button>
                                        </div>
                                        <p className="text-muted float-right mb-0"><small>Clicking on the button will roll up target date</small></p>
                                        {Object.keys(errors).length > 0 && errors.data && errors.data.BusinessOutComeTargetDate ? <p className="text-danger">{errors.data.BusinessOutComeTargetDate[0]}</p> : <></>}
                                        <div className="floats-toolbar">
                                            <i onClick={this.handleToolbarToggle} className="fas fa-ellipsis-v col-fontcontrol"></i>
                                            <div className={this.state.showToolbar ? "omp-toolbar" : "omp-toolbar-hide"} style={(this.props.action != null && this.props.setId != null)?{top:"-226px"}:{top:"-226px"}}>
                                                <ul>
                                                    <li className="mb-3">
                                                        <i onClick={this.saveKpiData.bind(this)} className="far fa-save fa-2x color123fc1" title="Save KPI"></i>
                                                    </li>
                                                    {/* <li className="mb-3">
                                                        <Link to={"/kpi-setting/"} className="far fa-times-circle fa-2x color123fc1" title="Cancel"></Link>
                                                    </li> */}
                                                    <li className="mb-3">
                                                        <Link to={"/kpi-setting/"+this.state.kpiSetId} className="far fa-arrow-alt-circle-left fa-2x color123fc1" title="Back"></Link>
                                                    </li>
                                                    <li className="mb-3">
                                                        <a href="#" onClick={(e) => this.addControlLever(e)} className="fas fa-plus-circle fa-2x color123fc1" title="Add Control Leaver"></a>
                                                    </li>
                                                    <li className="mb-3">
                                                       <Link target="_blank" to={"/kpi-excel-uploads/"+this.state.KPIID} className="fa fa-upload  fa-2x  color123fc1"  title="Import"></Link>
                                                    </li>
                                                    <li className={(this.props.action != null && this.props.setId != null)?"mb-3":"mb-0"}> 
                                                    <Link className="fa fa-download  fa-2x  color123fc1"  onClick={this.exportDataHandler} title="Export"></Link>
                                                    </li>
                                                    {(this.props.action != null && this.props.setId != null)?<li className="mb-0"> 
                                                    <Link className="fa fa-user  fa-2x  color123fc1" title="Enter Actual Outcome for this KPI"  to={"/kpi-setting/audit/"+this.props.setId+"/"+this.props.action} ></Link>
                                                    </li>:""}
                                                    {/* {(this.props.action != null && this.props.setId != null)?
                                                    <Row>
                                                        <Col sm="11" className="text-right pt-5">
                                                            <Link className="outcomes-btn" to={"/kpi-setting/audit/"+this.props.setId+"/"+this.props.action}>
                                                            Enter Actual Outcome for this KPI
                                                            </Link>
                                                        </Col>
                                                    </Row>:""} */}
                                                </ul>
                                            </div>
                                            <div class="right-div-performance-measure">
            <div className={this.state.displaytopdiv==false?"top-div":"top-div-show"}>
                <div className="input-group mb-2">
                 
                    <input type="text" class="form-control border-right-0 leftcustor-radious rightcustor-radious" value={this.props.savecalculateEmmisionValue.tCO2} />
                    <div className="input-group-append">
                      <span className="input-group-text bg-white spn-label rd-o">MT CO2e</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="btn btn-danger pl-3 pr-3" onClick={this.handleReset}>Reset</button>
                  </div>
            </div>
            <div className="bottom-div">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item pointer-none">
                      <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Source</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Calculate</a>
                    </li>
                   
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade " id="home" role="tabpanel" aria-labelledby="home-tab">Sourcr</div>
                    <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="mt-2">
                            <div className="form-group mb-2" id="emissiontype">
                            <label>CO<sub>2</sub>e Emissions Type</label>
                                <div className="drop-form-control">
                                    <select className="form-control" value={this.state.emmisionType} onChange={this.co2EmmisionType.bind(this)}>
                                        <option value="">Select Emissions Type</option>
                                        {this.props.kpiCo2EmmusiontypeData.map(bsc=>{
                                            return(
                                                <option value={bsc.Value}>{bsc.Text}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-2">
                                <div className="input-group mb-1">
                                    <div className="input-group-prepend min-w-95">
                                      <span className="input-group-text border-0 bg-white txt-dark"><label className="m-0">Estimated Value</label></span>
                                    </div>
                                    <input type="number" className="form-control leftcustor-radious" aria-label="Amount (to the nearest dollar)"value={this.state.estimatedvalue} onChange={this.handleChangeEstimatedvalue.bind(this)}/>
                                    <div className="input-group-append">
                                      <span className="input-group-text border-0 bg-white spn-label">{this.state.emisionTypevalue}</span>
                                    </div>
                                  </div>
                            </div>
                            <div className="mt-2">
                                <div className="input-group mb-1">
                                    <div className="input-group-prepend min-w-95">
                                      <span className="input-group-text border-0 bg-white txt-dark"><label className="m-0">Country</label></span>
                                    </div>
                                    <select className="form-control" value={this.state.countryType} onChange={this.co2EmmisionCountryType.bind(this)}>
                                        <option value="">Select Country</option>
                                        {this.props.getcountryforco2emmision.map(bsc=>{
                                            return(
                                                <option value={bsc.Id}>{bsc.Country}</option>
                                            )
                                        })}
                                    </select>
                                  </div>
                            </div>
                            <div className="mt-2">
                                <div className="input-group mb-1">
                                    <div className="input-group-prepend min-w-95">
                                      <span className="input-group-text border-0 bg-white txt-dark"><label className="m-0">Conversion Factor</label></span>
                                    </div>
                                    <input type="number" className="form-control leftcustor-radious" aria-label="Amount (to the nearest dollar)" value={this.state.factor} onChange={this.handleChangeFactor.bind(this)}/>
                                  </div>
                            </div>
                        </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <button className="btn btn-primary w-100" onClick={this.handleSubmit}>
                    Calculate
                </button>
                  </div>
            </div>
        </div>
                                        </div>
                                        
                                    </Col>
                                </Row>
                            </div>
                            <div className="form-group drop-form-control">
                                <Row>
                                    <Col sm="6">
                                        <label>Improvement Basis</label>
                                        <select name="ImprovementbasisKIP"
                                            value={this.state.ImprovementbasisKIP}
                                            onChange={(e) => this.handleOnChange(e, null, null, null)} className="form-control">
                                            {improvement_basis}
                                        </select>
                                        {Object.keys(errors).length > 0 && errors.data && errors.data.ImprovementbasisKIP ? <p className="text-danger">{errors.data.ImprovementbasisKIP[0]}</p> : <></>}
                                    </Col>
                                    <Col md="5">
                                        <div className="">
                                            {/* Shashi verma, Placeholder removed */}
                                            <label>Persona Impacted</label>
                                            <div className="pos-rel-custom">
                                                <Input type="text" name="PersonaImpacted" value={this.state.PersonaImpacted ? this.state.PersonaImpacted : ""}
                                                    onChange={(e) => this.handleOnChange(e, null, null, null)}  />
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.PersonaImpacted ? <p className="text-danger">{errors.data.PersonaImpacted[0]}</p> : <></>}
                                                <div className="pos-ab-class-arrow"></div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="1" className="pl-0">
                                        <label className="w-100">&nbsp;</label>
                                        <button className="button-add-search" onClick={this.handlePersonaModal}><img src={require('../../common/images/search-add.png')} /></button>
                                    </Col>
                                    <ModalPopup isOpen={this.state.personaModal} onSave={this.personaSave} toggle={this.togglePersonaModal.bind(this)} title="Persona Impacted" className="capability_modeling modal-lg" footer={true} saveBtnTitle={"SELECT"} disabled={false} >
                                        <div className="modal-body">
                                            <div className="table-responsive popup-table">
                                                <table className="table table-striped mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: "8%" }}></th>
                                                            <th style={{ width: "32%" }}>Name</th>
                                                            <th style={{ width: "60%" }}>Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {personaList}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </ModalPopup>
                                </Row>
                            </div>
                            <div className="form-group drop-form-control">
                                <Row>
                                    <Col sm="6">
                                        <div className="d-inline-block align-top w-75 width70tab mr-3">
                                            <label>Estimated Annual Savings $</label>
                                            <div className="input-group">
                                                <Input type="number" name="EstimatedAnnualSavingsAmountKPI"
                                                    value={(this.state.UnitOfMeasurementKIP == "percent" || this.state.UnitOfMeasurementKIP == "amount")?this.state.EstimatedAnnualSavingsAmountKPI:""}
                                                    onChange={(e) => this.handleOnChange(e, null, null, null)}
                                                    disabled={(this.state.UnitOfMeasurementKIP == "percent" || this.state.UnitOfMeasurementKIP == "amount")?false:true}
                                                    className="w-90" />
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.EstimatedAnnualSavingsAmountKPI ? <p className="text-danger">{errors.data.EstimatedAnnualSavingsAmountKPI[0]}</p> : <></>}
                                            </div>
                                        </div>
                                        <div className="d-inline-block align-top">
                                            <label className="w-100">&nbsp;</label>
                                            <Button color="primary" className="topbox-arrow" 
                                                disabled={(this.state.leverCounter > 0) ? (this.state.UnitOfMeasurementKIP == "percent" || this.state.UnitOfMeasurementKIP == "amount")?false:true : true}
                                                onClick={this.handleClickEstimatedSavingsRollUp.bind(this)}>
                                                <i className="fa fa-caret-up"></i></Button>
                                        </div>
                                        <p className="text-muted float-right mb-0"><small>Clicking on the button will roll up estimated annual savings</small></p>
                                    </Col>
                                    <Col sm="6">
                                        <label>Audit Frequency</label>
                                        <select name="AuditFrequencyKIP" className="form-control" value={this.state.AuditFrequencyKIP} onChange={(e) => this.handleOnChange(e, null, null, null)}>
                                            <option></option>
                                            {audit_frequency}
                                        </select>
                                        {Object.keys(errors).length > 0 && errors.data && errors.data.AuditFrequencyKIP ? <p className="text-danger">{errors.data.AuditFrequencyKIP[0]}</p> : <></>}
                                    </Col>
                                </Row>
                            </div>
                            <div className="form-group">
                                <Row>
                                    <Col sm="6">
                                        <label>Notification Start</label>
                                        <div className="input-group">
                                            <span className="input-group-btn">
                                                <button type="button" className="btn btn-default btn-numberminus" name="minus" onClick={(e) => this.handleNotificationStart(e)}>
                                                    <i className="fas fa-minus" />
                                                </button>
                                            </span>
                                            <input type="text" name="NotificationStart" disabled className="form-control input-number"
                                                defaultValue={(this.state.NotificationStart == 1) ? this.state.NotificationStart + " Day" : this.state.NotificationStart + " Days"} style={{ borderRadius: "0" }} />
                                            <span className="input-group-btn">
                                                <button type="button" className="btn btn-default btn-numberplus" name="plus" onClick={(e) => this.handleNotificationStart(e)} >
                                                    <i className="fas fa-plus" />
                                                </button>
                                            </span>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <label>Notification Start Timeframe</label>
                                        <input type="text" disabled name="NotificationStartTimeframe" className="form-control"
                                            value={this.state.NotificationStartTimeframe?this.state.NotificationStartTimeframe:""} onChange={(e) => this.handleOnChange(e, null, null, null)} />
                                    </Col>
                                    <div className="clearfix"></div>
                                </Row>
                            </div>
                            <div className="form-group drop-form-control pb-3 mb-5">
                                <Row>
                                    {/* Shashi verma, disabled Input fields */}
                                    <Col sm="11">
                                        <label>Notification Email Address</label>
                                        <div className="pos-rel-custom">
                                            <input type="text" disabled name="PersonaEmail" className="form-control"
                                                placeholder="Email Id" value={this.state.PersonaEmail || ""} onChange={(e) => this.handleOnChange(e, null, null, null)} />
                                            <div className="pos-ab-class-arrow"></div>
                                        </div>
                                    </Col>
                                    <Col md="1" className="pl-0">
                                        <label className="w-100">&nbsp;</label>
                                        <button className="button-add-search" onClick={this.handleEmailModal}><img src={require('../../common/images/search-add.png')} /></button>
                                    </Col>
                                    <ModalPopup isOpen={this.state.emailModal} onSave={this.emailSave} toggle={this.toggleEmailModal.bind(this)} title="Email User" className="capability_modeling modal-lg" footer={true} saveBtnTitle={"SELECT"} disabled={false} >
                                        <div className="modal-body">
                                            <div className="table-responsive popup-table">
                                                <table className="table table-striped mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: "8%" }}></th>
                                                            <th style={{ width: "32%" }}>Name</th>
                                                            <th style={{ width: "60%" }}>Email</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {emailList}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </ModalPopup>
                                </Row>
                                <Row>
                                    <Col md="11">
                                        <Label style={{ paddingTop: "15px" }}>Audit Due Date: </Label><input disabled={true} value={this.AuditDueDateCal()} onChange={this.AuditDueDateHandler} />
                                    </Col>
                                </Row>
                                
                                
                            </div>
                        </div>
                        <div>
                            {controlLevers}
                        </div>
                    </div>
                </Col>
                <div className="new-kpi-col mt-4 mb-5">
                </div>
            </Row>
            
            {/* Shashi verma, History pop added */}
            <div className="audit-modal">
                <div className="modal" id="historyModal">
                    <div className="modal-dialog modal-lg" style={{maxWidth:880}}>
                        <div className="modal-content">

                            {/* <!-- Modal Header --> */}
                            <div className="modal-header">
                                <h4 className="modal-title">Audit History</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <div className="modal-body">
                                <div className="table-responsive popup-table">
                                    <table className="table table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "5%" }}>Sr No.</th>
                                                <th style={{ width: "19%" }}>Version</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                            {this.state.historyData.length > 0 ?
                                            this.state.historyData.map((data,i)=>{
                                                return (<tr key={"Key"+i}>
                                                    <td>{i+1}</td>
                                                    <td>{data.Version}</td>
                                                </tr>)
                                            }) : 
                                            <tr>
                                                <td style={{textAlign:"center"}} colSpan="2"> No data found ! </td>
                                            </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <!-- Modal footer --> */}
                            <div className="modal-footer">
                                <div className="text-right mang-kpibtn">
                                    <button type="button" data-dismiss="modal" className="btn btn-link mr-3">Cancel</button>
                                    {/* <button type="submit" class="btn btn-primary">SAVE</button> */}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            </>
        )
    }
}

KpiCreate.propTypes = {
    createKpi: PropTypes.func.isRequired,
    getKpi: PropTypes.func.isRequired,
    fetchKpiSetById: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    getpersona: PropTypes.func.isRequired,
    getuseremails: PropTypes.func.isRequired,
    deleteRelated: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    errors: state.errors,
    uom: state.kpiData.uom,
    uem: state.kpiData.uem,
    frequency: state.kpiData.frequency,
    improvement_basis: state.kpiData.improvement_basis,
    kpiCreate: state.kpiData.kpiCreate,
    kpiBsc: state.kpiData.kpiBsc,
    kpiData: state.kpiData.kpi,
    kpiSetDetails: state.kpiData.kpiSetDetails,
    kpiCo2EmmusiontypeData: state.kpiData.kpiCo2EmmusiontypeData,
    getcountryforco2emmision:state.kpiData.getcountryforco2emmision,
    savecalculateEmmisionValue:state.kpiData.savecalculateEmmisionValue
});
export default connect(mapStateToProps, { deleteRelated, createKpi, getKpi, fetchKpiSetById, getuseremails, getpersona, getaudit_frequency, getimprovement_basis, fetchBcsList,GetCo2EmmisionType,GetCountryforCo2Emmision,CalculateCO2Emmision })(withRouter(KpiCreate));