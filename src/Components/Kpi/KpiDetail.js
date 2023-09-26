import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Input, Button, Col } from 'reactstrap';
import _ from 'underscore';
import { getaudit_frequency, getimprovement_basis, getKpi, getControlLever, updateControlLever, updateKpi, saveNewLevers, deleteKpi, deleteKpiLever } from '../../actions/kpiActions';
import { withRouter } from 'react-router-dom';
import CreateControlLever from './ControlLever/Create';
import DatePicker from "react-datepicker";
import axios from 'axios';
import {responseMessage} from '../../utils/alert';
import KpiCreate from "./KpiCreate";
import swal from "sweetalert";
import  Loader  from '../Loader';
import moment from 'moment';
import CacheStorage from '../../utils/CacheStorage';
const config = require('../../config');
var __ = require('lodash');

//.. Reviewed by Ashim: Need to implement LoadAPI > action-creator
//.. @Syed : Match up the code you wrote for ashim_dev
class KpiDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            measurement: [],
            frequency1: [],
            improvement_basis: [],
            currentLever: null,
            editKpiMode: false,
            leverCounter: 0,
            newControlLevers: [],
            business_outcome: "",
            business_metrics: "",
            persona_impacted: "",
            estimated_saving: "",
            // newLeverData: [{
            //     //target_date: moment(new Date()).format("YYYY-MM-DD"),
            //     inhibitors: [],
            //     capabilities: []
            // }]
            newLeverData: [],
            loading:true

        }
    }
    componentWillReceiveProps(nextProps) {
        let counter = 0;
        if("controls" in nextProps.kpiData){
            counter = nextProps.kpiData.controls.length
        }
        let stateObj = {
            leverData: nextProps.leverData,
            kpiData: nextProps.kpiData,
            leverCounter: counter,
            loading: false,
            setId:nextProps.setId
        }
        if (Object.keys(nextProps.updatedLever).length > 0) {
            //stateObj.currentLever = null;
            stateObj['viewLever' + nextProps.updatedLever.ControlLeverID] = 'block';
            stateObj['editLever' + nextProps.updatedLever.ControlLeverID] = 'none';
        }
        this.setState(stateObj);
        //this.handleClickEstimatedSavingsRollUp();
        if (Object.keys(nextProps.deleteLeverData).length > 0) {
            let kpiData = this.state.kpiData.details;
            let controls = this.state.kpiData.controls;
            let delLeverIndex = _.findIndex(controls, { ControlLeverID: nextProps.deleteLeverData.ControlLeverID });
            delete controls[delLeverIndex];
            this.setState({
                kpiData: {
                    details: kpiData,
                    controls: controls
                }
            })
             swal({
            title: "Do you want to roll-up? ",
            //text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
                }).then((permission) => {
                    if (permission) {
                        this.handleClickEstimatedSavingsRollUp();
                        this.props.updateKpi(this.state.kpiData.details, this.props.history, this.props.setId);
                    }
                })
        }
    }
   
    componentDidMount() {
        this.props.getimprovement_basis();
        this.props.getaudit_frequency();
        //this.props.getmeasurement();
        this.props.getKpi({id:this.props.action, kpiSetId:this.props.setId});
        //this.handleClickEstimatedSavingsRollUp();
    }
    handleOnChange(e, leverCounter, parameter, parameterKey) {
        // console.log(e.target.name);
        // console.log(leverCounter);
        // console.log(parameter);
        // console.log(parameterKey);
        if (leverCounter) {
            let leverData = this.state.newLeverData;
            if (!leverData[leverCounter - 1]) {
                leverData[leverCounter - 1] = {
                    inhibitors: [],
                    capabilities: []
                }
            }

            if (parameter) {
                // let obj={e.target.name:e.target.value};
                // __.merge(obj, leverData[leverCounter-1][parameter][parameterKey]);
                if (!leverData[leverCounter - 1][parameter][parameterKey]) {
                    leverData[leverCounter - 1][parameter][parameterKey] = {
                        [e.target.name]: e.target.value
                    }
                } else {
                    leverData[leverCounter - 1][parameter][parameterKey][e.target.name] = e.target.value;
                }

                //alert(1);
            } else {
                leverData[leverCounter - 1][e.target.name] = e.target.value;
                //alert(2);
            }
            this.setState({
                newLeverData: leverData
            });
            //console.log(leverData);
        } else {
            //alert(3);
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        //console.log(this.state.newLeverData);
    }

    deleteInhibitor(leverCounter, inhibitorIndex) {
        let leverData = this.state.newLeverData;
        delete (leverData[leverCounter - 1].inhibitors[inhibitorIndex]);
        this.setState({
            newLeverData: leverData
        });
    }

    deleteCapability(leverCounter, capabilityIndex) {
        let leverData = this.state.newLeverData;
        delete (leverData[leverCounter - 1].capabilities[capabilityIndex]);
        this.setState({
            newLeverData: leverData
        });
    }

    addControlLever(e) {
        e.preventDefault();
        let leverCounter = this.state.leverCounter;
        leverCounter = leverCounter + 1;
        let controlLevers = this.state.newControlLevers;
        controlLevers.push(<CreateControlLever key={Math.random()} deleteLever={this.deleteNewLever.bind(this)} leverCounter={leverCounter} handleOnChange={this.handleOnChange.bind(this)} leverData={this.state.newLeverData} deleteInhibitor={this.deleteInhibitor.bind(this)} deleteCapability={this.deleteCapability.bind(this)} handleEstimatedSavingsRollUp={this.handleEstimatedSavingsRollUp.bind(this)} />);
        // controlLevers.push(<CreateControlLever key={'controlLever-'+key} deleteLever={this.deleteLever.bind(this)} leverCounter={controlLever.leverCounter} handleOnChange={this.handleOnChange.bind(this)} leverData={this.state.leverData} deleteInhibitor={this.deleteInhibitor.bind(this)} deleteCapability={this.deleteCapability.bind(this)} handleEstimatedSavingsRollUp={this.handleEstimatedSavingsRollUp.bind(this)} />)
        this.setState({
            newControlLevers: controlLevers,
            leverCounter: leverCounter
        });
    }

    deleteNewLever(e, index) {
        e.preventDefault();
        const levers = this.state.newControlLevers;
        delete levers[index - 1];
        this.setState({
            newControlLevers: levers
        })
    }

    saveNewLevers() {
        
        //console.log(this.state.newLeverData);
        let newSaveLeverData = this.state.newLeverData;
        //if(newSaveLeverData)
        const leverObj = {
            KpiID: this.props.action,
            leverData: this.state.newLeverData
        }
        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken")
        }
        axios.post(config.laravelBaseUrl + 'add_kpi_control_levers', leverObj, {
            headers: headers
        })
        .then(kpis => {
            responseMessage("success", "New Control Lever added successfully", "");
            axios.get(config.laravelBaseUrl + 'get_kpi_details/' + this.props.action +'/'+this.props.setId, {
                headers: headers
            })
            .then(kpi => {
                this.setState({
                    kpiData: kpi.data.data,
                    newLeverData:[]
                })
            });
            swal({
            title: "Do you want to roll-up? ",
            //text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
                }).then((permission) => {
                    if (permission) {
                        this.handleClickEstimatedSavingsRollUp();
                        this.props.updateKpi(this.state.kpiData.details, this.props.history, this.props.setId);
                    }
                })
            //this.props.getKpi(this.props.action, this.props.setId);
            //console.log(this.state.kpiData);
            //this.props.history.push("/kpi-setting/" + this.props.action + "/" + this.props.setId);
            this.setState({
                newControlLevers: []
            })
        })
        //this.props.saveNewLevers(leverObj);        
    }
    expandControlLever(id) {
        this.props.getControlLever(id);
        this.setState(prevState => ({
            currentLever: prevState.currentLever ? null : id,
            ['viewLever' + id]: 'block',
            ['editLever' + id]: 'none'
        }))
    }
    editLever(e, leverId) {
        e.preventDefault();
        this.props.getControlLever(leverId);
        //this.props.getKpi(this.props.action, this.props.setId);
        this.setState({
            currentLever: leverId,
            ['viewLever' + leverId]: 'none',
            ['editLever' + leverId]: 'block',
        })
    }
    cancelEdit(e, leverId) {
        e.preventDefault();
        this.setState({
            currentLever: null,
            ['viewLever' + leverId]: 'block',
            ['editLever' + leverId]: 'none',
        })
    }
    onInputChange(e, leverId) {
        //console.log(this.props.kpiData)
        let kpiLevers = this.state.kpiData.controls;
        let kpidetails = this.state.kpiData.details;
        let leverIndex = _.findIndex(kpiLevers, { ControlLeverID: leverId });
        kpiLevers[leverIndex][e.target.name] = e.target.value;
        this.setState({
            kpiData: {
                controls: kpiLevers,
                details: kpidetails
            }
        })

        //console.log(this.state.kpiData)

    }

    onInhibitorChange(e, leverId, inhibitorId, inhibitorKey) {
        // console.log(e);
        // console.log(leverId);
        // console.log(inhibitorId);
        // console.log(inhibitorKey);
        let inhibitorArr = this.state.leverData.inhibitors;
        let capabilityArr = this.state.leverData.capabilities;
        if (inhibitorId !== "") {
            let inhibitorIndex = _.findIndex(inhibitorArr, { KPIInhibitorsId: inhibitorId });
            inhibitorArr[inhibitorIndex][e.target.name] = e.target.value;
            inhibitorArr[inhibitorIndex].Action = "MODIFY";
        } else {
            inhibitorArr[inhibitorKey][e.target.name] = e.target.value;
            inhibitorArr[inhibitorKey].Action = "ADD";
        }
        this.setState({
            leverData: {
                inhibitors: inhibitorArr,
                capabilities: capabilityArr
            }
        })
    }
    riskcostHandler(inhibitorId){
        let inhibitorArr = this.state.leverData.inhibitors;
        let capabilityArr = this.state.leverData.capabilities;
        if (inhibitorId !== "") {
            let inhibitorIndex = _.findIndex(inhibitorArr, { KPIInhibitorsId: inhibitorId });
            if(inhibitorArr[inhibitorIndex].ImpactCost !== undefined && inhibitorArr[inhibitorIndex].Probability !== undefined){
            let icost=parseInt(inhibitorArr[inhibitorIndex].ImpactCost.replace('$',''));
            let prob = parseInt(inhibitorArr[inhibitorIndex].Probability.replace('%',''));
        
            let riskCost = ((icost*prob)/100);
            inhibitorArr[inhibitorIndex].RiskCost = riskCost ;
            this.setState({
                leverData: {
                    inhibitors: inhibitorArr,
                    capabilities: capabilityArr
                }
            })
        }
        }
    }
    onCapabilityChange(e, leverId, capabilityId, capabilityKey) {
        let inhibitorArr = this.state.leverData.inhibitors;
        let capabilityArr = this.state.leverData.capabilities;
        if (capabilityId !== "") {
            let capabilityIndex = _.findIndex(capabilityArr, { KPICapabilitiesId: capabilityId });
            capabilityArr[capabilityIndex][e.target.name] = e.target.value;
            capabilityArr[capabilityIndex].Action = "MODIFY";
        } else {
            capabilityArr[capabilityKey][e.target.name] = e.target.value;
            capabilityArr[capabilityKey].Action = "ADD";
        }
        //console.log(capabilityArr)
        //console.log(e.target.name, e.target.value)
        this.setState({
            leverData: {
                inhibitors: inhibitorArr,
                capabilities: capabilityArr
            }
        })
    }
    handleLeverTargetDate(date, leverId) {
        let kpiLevers = this.state.kpiData.controls;
        let kpidetails = this.state.kpiData.details;
        let leverIndex = _.findIndex(kpiLevers, { ControlLeverID: leverId });
        kpiLevers[leverIndex].TargetDate = moment(date).format("MM/DD/YYYY");
        kpiLevers[leverIndex].target_date = moment(date).format("MM/DD/YYYY");
        // kpiLevers[leverIndex].target_date = moment(date).format("MM/DD/YYYY");
        this.setState({
            kpiData: {
                controls: kpiLevers,
                details: kpidetails
            }
        })
    }
    findTargetDate(id){
       let kpiLevers = this.state.kpiData.controls;
        let leverIndex = _.findIndex(kpiLevers, { ControlLeverID: id });
        if(leverIndex !== -1)
        {return kpiLevers[leverIndex].TargetDate}
        else{return moment(new Date()).format("MM/DD/YYYY")}
    }
    handleExpectedByChange(date, leverCounter, capabilityId, capabilityKey) {
        let inhibitorArr = this.state.leverData.inhibitors;
        let capabilityArr = this.state.leverData.capabilities;
        if (capabilityId !== "") {
            let capabilityIndex = _.findIndex(capabilityArr, { KPICapabilitiesId: capabilityId });
            capabilityArr[capabilityIndex].ExpectedBy = moment(date).format("MM/DD/YYYY");
            capabilityArr[capabilityIndex].Action = "MODIFY";
        } else {
            capabilityArr[capabilityKey].ExpectedBy = moment(date).format("MM/DD/YYYY");
            capabilityArr[capabilityKey].Action = "ADD";
        }
        //     console.log(moment(date).format("YYYY-MM-DD"))
        //     console.log((moment(this.state['target_date'+leverCounter]).format("YYYY-MM-DD")))
        //     if(((moment(date).format("YYYY-MM-DD")))<(moment(this.state['target_date'+leverCounter]).format("YYYY-MM-DD"))){
        //     const eObj = {
        //         target: {
        //             name: "ExpectedBy",
        //             value: moment(date).format("YYYY-MM-DD")
        //         }
        //     }
        //     this.setState({
        //         ['ExpectedBy'+leverCounter+key]: date
        //     }, function() {
        //         this.props.handleOnChange(eObj, leverCounter, 'capabilities', key);
        //     })
        //     this.props.handleOnChange(eObj, leverCounter, 'capabilities', key);
        //  }
        //     else{
        //         alert("You can't select expected date more than target date")
        //         const eObj = {
        //         target: {
        //             name: "ExpectedBy",
        //             value: moment(this.state['target_date'+leverCounter]).format("YYYY-MM-DD")
        //         }
        //     }
        //     this.setState({
        //         ['ExpectedBy'+leverCounter+key]: this.state['target_date'+leverCounter]
        //     }, function() {
        //         this.props.handleOnChange(eObj, leverCounter, 'capabilities', key);
        //     })
        //     this.props.handleOnChange(eObj, leverCounter, 'capabilities', key);
        //     }
        this.setState({
            leverData: {
                inhibitors: inhibitorArr,
                capabilities: capabilityArr
            }
        })
    }
    updateControlLever(e, leverId) {
        const leverIndex = _.findIndex(this.state.kpiData.controls, { ControlLeverID: leverId });
        let leverObj = { ...this.state.kpiData.controls[leverIndex], ...this.state.leverData };
        leverObj.Action = 'MODIFY';
        this.props.updateControlLever(leverObj);
        console.log(leverObj);
    }
    handleKpiInputChange(e) {
        let kpiData = this.props.kpiData.details;
        let kpiLevers = this.state.kpiData.controls;
        kpiData[e.target.name] = e.target.value;
        this.setState({
            kpiData: {
                details: kpiData,
                controls: kpiLevers
            }
        })
    }
    handleKpiTargetDate(date) {
        let kpiData = this.state.kpiData.details;
        let kpiLevers = this.state.kpiData.controls;
        kpiData.TargetDate = moment(date).format("MM/DD/YYYY");
        kpiData.target_date = moment(date).format("MM/DD/YYYY");
        this.setState({
            kpiData: {
                details: kpiData,
                controls: kpiLevers
            }
        })
    }
    handleKpiUpdate() {
        this.setState({
            editKpiMode: false
        })
        this.props.updateKpi(this.state.kpiData.details, this.props.history, this.props.setId);
    }

    handleAddInhibitor(e) {
        e.preventDefault();
        let capabilityArr = this.props.leverData.capabilities;
        let inhibitorArr = this.props.leverData.inhibitors;
        inhibitorArr.push({
            KPIInhibitorsId: "",
            Inhibitors: ""
        });
        this.setState({
            leverData: {
                inhibitors: inhibitorArr,
                capabilities: capabilityArr
            }
        });
    }

    handleAddCapability(e) {
        e.preventDefault();
        let capabilityArr = this.props.leverData.capabilities;
        let inhibitorArr = this.props.leverData.inhibitors;
        capabilityArr.push({
            KPICapabilitiesId: "",
            Capability: ""
        });
        this.setState({
            leverData: {
                inhibitors: inhibitorArr,
                capabilities: capabilityArr
            }
        });
    }

    deleteKpi(e, kpiId) {
        e.preventDefault();
        const kpiObj = {
            KPIID: kpiId
        }
        this.props.deleteKpi(kpiObj);
        this.props.history.push("/kpi-setting");
    }

    deleteKpiLever(e, kpiId, leverId) {
        e.preventDefault();
        const leverObj = {
            KPIID: kpiId,
            ControlLeverID: leverId,
            Action: "DELETE"
        }
        swal({
            title: "Are you sure you want to delete this control lever? ",
            //text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((permission) => {
            if (permission) {
                this.props.deleteKpiLever(leverObj);
            }
        })
    }
    handleClickEstimatedSavingsRollUp() {
        let estimated_saving = 0;
        if(this.state.kpiData !== undefined ){
            if(this.state.kpiData.details !== undefined && this.state.kpiData.controls.length > 0){
                let kpiData = this.state.kpiData.details;
                let newLeverData = this.state.kpiData.controls;
                for (let i in newLeverData) {
                    estimated_saving += Number(newLeverData[i].estimated_savings);
                }
        kpiData.EstimatedSavings = estimated_saving;
        this.setState({
            kpiData: {
                details: kpiData,
                controls: newLeverData
            }
        });}}
    }
    handleEstimatedSavingsRollUp() {
        
        let estimated_saving = 0;
        let frequencyConversion = 1;
        let newLeverData = this.state.newLeverData;
        //console.log(newLeverData)
        for (let i in newLeverData) {
            let inhibitorCosts = 0;
            let capabilityCosts = 0;
            let opexCosts = 0;
            let capexCosts = 0;
            let expectedGain = 0;
            let auditFrequency = 0;
            switch (newLeverData[i].improvement_basis1) {
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
                expectedGain = (newLeverData[i].expected_gains / auditFrequency) * 8760;
                //console.log(newLeverData[i].inhibitors);
                for (let j in newLeverData[i].inhibitors) {
                    let getImpactCosts = "";
                    if (newLeverData[i].inhibitors[j].Probability != 'undefined') {
                        let probability = this.state.newLeverData[i].inhibitors[j].Probability.replace('%', '');
                        if ("ImpactCost" in this.state.newLeverData[i].inhibitors[j]) {
                            getImpactCosts = this.state.newLeverData[i].inhibitors[j].ImpactCost.replace('$');
                        }
                        if (probability && parseInt(probability) > 0 && getImpactCosts != "") {
                            inhibitorCosts = inhibitorCosts + (parseFloat(probability / 100) * getImpactCosts);
                        }
                        // console.log(inhibitorCosts);
                    }
                }

                for (let k in newLeverData[i].capabilities) {
                    // console.log(newLeverData[i].capabilities);
                    switch (newLeverData[i].capabilities[k].frequency) {
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
                        if (this.state.newLeverData[i].capabilities[k].capex && this.state.newLeverData[i].capabilities[k].CapexSpreadYears && this.state.newLeverData[i].capabilities[k].CapexSpreadYears > 0) {
                            if ("capex" in this.state.newLeverData[i].capabilities[k]) {
                                getCapexCosts = this.state.newLeverData[i].capabilities[k].capex.replace('$');
                            }
                            if ("opex" in this.state.newLeverData[i].capabilities[k]) {
                                getOpexCosts = this.state.newLeverData[i].capabilities[k].opex.replace('$');
                            }
                            capexCosts = capexCosts + parseFloat(getCapexCosts / this.state.newLeverData[i].capabilities[k].CapexSpreadYears);
                            opexCosts = opexCosts + (parseFloat(getOpexCosts / frequencyConversion) * 8760);
                            capabilityCosts = capabilityCosts + capexCosts + opexCosts;
                        }
                    }
                }
                //console.log(capabilityCosts);
                if (parseInt(expectedGain) > 0) {
                    let estimatedAnnualSaving = Number(expectedGain) - Number(inhibitorCosts) - Number(capabilityCosts);
                    newLeverData[i].estimated_annual_saving = Math.floor(estimatedAnnualSaving);
                    newLeverData[i].estimated_annual_saving1 = estimatedAnnualSaving.toLocaleString();
                }
                console.log(estimated_saving);
            }

        }
        //console.log(estimated_saving);
        if (this.state.newLeverData !== newLeverData) {
            this.setState({ newLeverData });
        }
    }
    handleEstimatedSavingsRollUp1(leverId) {
        let estimated_saving = 0;
        let frequencyConversion = 1;
        let newLeverData = this.state.leverData;
        const leverIndex = _.findIndex(this.state.kpiData.controls, { ControlLeverID: leverId });
        let leverObj = this.state.kpiData.controls[leverIndex];
        console.log(leverObj);
        console.log(newLeverData);
        let inhibitorCosts = 0;
            let capabilityCosts = 0;
            let opexCosts = 0;
            let capexCosts = 0;
            let expectedGain = 0;
            let auditFrequency = 0;
            switch (leverObj.improvement_basis) {
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
                expectedGain = (this.parseNumber((leverObj.ExpectedTargetGrowth).replace('$','')) / auditFrequency) * 8760;
                console.log(expectedGain);
                for (let j in newLeverData.inhibitors) {
                    let getImpactCosts = "";
                    if (newLeverData.inhibitors[j].Probability != 'undefined') {
                        let probability = this.parseNumber(newLeverData.inhibitors[j].Probability.replace('%', ''));
                        if ("ImpactCost" in newLeverData.inhibitors[j]) {
                            getImpactCosts = this.parseNumber(newLeverData.inhibitors[j].ImpactCost.replace('$'));
                        }
                        if (probability && parseInt(probability) > 0 && getImpactCosts != "") {
                            inhibitorCosts = inhibitorCosts + (parseFloat(probability / 100) * getImpactCosts);
                        }
                    }
                }

                for (let k in newLeverData.capabilities) {
                    switch (newLeverData.capabilities[k].Frequency) {
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
                        if (newLeverData.capabilities[k].Capex && newLeverData.capabilities[k].CapexSpreadYears && newLeverData.capabilities[k].CapexSpreadYears > 0) {
                            if ("Capex" in newLeverData.capabilities[k]) {
                                getCapexCosts = this.parseNumber(newLeverData.capabilities[k].Capex.replace('$'));
                            }
                            if ("Opex" in newLeverData.capabilities[k]) {
                                getOpexCosts = this.parseNumber(newLeverData.capabilities[k].Opex.replace('$'));
                            }
                            capexCosts = capexCosts + parseFloat(getCapexCosts / newLeverData.capabilities[k].CapexSpreadYears);
                            opexCosts = opexCosts + (parseFloat(getOpexCosts / frequencyConversion) * 8760);
                            capabilityCosts = capabilityCosts + capexCosts + opexCosts;
                        }
                    }
                    console.log(expectedGain);
                    console.log(inhibitorCosts);
                    console.log(capabilityCosts);
                }
                if (parseInt(expectedGain) > 0) {
                    let estimatedAnnualSaving = Number(expectedGain) - Number(inhibitorCosts) - Number(capabilityCosts);
                    leverObj.estimated_savings = estimatedAnnualSaving;
                    estimated_saving = estimatedAnnualSaving.toLocaleString();
                    console.log(estimatedAnnualSaving);
                }
                console.log(estimated_saving);
            }
        //console.log(estimated_saving);
        if (this.state.kpiData.controls[leverIndex] !== leverObj) {
            this.setState({ leverObj });
        }
    }
    
    currencyCoverter(labelValue) {
        let val = 0;
        if (labelValue !== null && labelValue !== "" && labelValue !== undefined) {
            if ((Number.isInteger(parseInt(labelValue)))) {
                // Nine Zeroes for Billions
                 val = Math.abs(Number(labelValue)) >= 1.0e+9

                    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
                    // Six Zeroes for Millions 
                    : Math.abs(Number(labelValue)) >= 1.0e+6

                        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
                        // Three Zeroes for Thousands
                        : Math.abs(Number(labelValue)) >= 1.0e+3

                            ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

                            : (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M";
            }
            else {(val = "0M") }
        }
        else {(val = "0M") }
        if(val !== 'NaNM'){
            return val
        }else { return "0M"}
    }
    ExpectedTargetGrowthConverter(val){
        if(val!== null && val != "" && val!== undefined) 
            {
                return val.toLocaleString()
            }
         else
         {
             return 0
            
         }   
    }
    ImprovementbasisConverter(val){
        if(val!== null && val != "" && val!== undefined){
            return val;
        }
        else {
            return ""
        }
    }
   
    UnitOfMeasurementConverter1(val){
        if(val !== null && val !== "" && val!== undefined){
            if(val === "Amount"){
                return "$"
            }else {
                return ""
            }
            }else {
            return ""}
    }
    UnitOfMeasurementConverter2(val){
        if(val !== null && val !== "" && val!== undefined && val !== "Amount"){
            if(val === "%" || val === "Percentage"){
                return "%"
            }else {
                return ""
            }
            }else {
            return ""} 
    }
     
    parseNumber(strg) {
        var strg = strg || "";
        var decimal = '.';
        strg = strg.replace(/[^0-9$.,]/g, '');
        if(strg.indexOf(',') > strg.indexOf('.')) decimal = ',';
        if((strg.match(new RegExp("\\" + decimal,"g")) || []).length > 1) decimal="";
        if (decimal != "" && (strg.length - strg.indexOf(decimal) - 1 == 3) && strg.indexOf("0" + decimal)!==0) decimal = "";
        strg = strg.replace(new RegExp("[^0-9$" + decimal + "]","g"), "");
        strg = strg.replace(',', '.');
        return Math.floor(strg);
    } 

    handleTargetDateRollUp(){
        let kpiData = this.state.kpiData.details;
        let leverData = this.state.kpiData.controls;
        let targetDate = new Date();
        console.log(leverData);
        for(let i in leverData) {
            if(targetDate != "" && leverData[i].TargetDate != null){
                let getSplitLeverDate = leverData[i].TargetDate.split('/');
                console.log(getSplitLeverDate);
                let getLeverDate = new Date(getSplitLeverDate[2].trim()+"-"+getSplitLeverDate[0]+"-"+getSplitLeverDate[1]);
                console.log(getLeverDate);
                if(getLeverDate > targetDate){
                    targetDate = getLeverDate;
                }
            }
        }
        kpiData.TargetDate = moment(targetDate).format("MM/DD/YYYY");
        kpiData.target_date = moment(targetDate).format("MM/DD/YYYY");
        this.setState({
            kpiData: {
                details: kpiData,
                controls: leverData
            }
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

    getmeasurementFromStore = () => {
        let unit_of_measurement = [];
        if ((this.props.measurement).length > 0) {
            unit_of_measurement = this.props.measurement.map(measurement => {
                return (<option key={"Id" + measurement.UOMID} value={measurement.UOMTitle}>{measurement.UOMTitle}</option>)
            })
        }
        return unit_of_measurement;
    }
    render() {
        let kpiData = {};
        let kpiLevers = [];
        let inhibitorArr = [];
        let capabilityArr = [];
        let inhibitorDivs = [];
        let capabilityDivs = [];
        let controlLevers = [];
        let unit_of_measurement = this.getmeasurementFromStore();
        let audit_frequency = this.getauditfrequencyFromStore()
        let improvement_basis = this.getimprovementbasisFromStore();
        if (this.state.kpiData && Object.keys(this.state.kpiData).length > 0) {
            
            kpiData = this.state.kpiData.details;
            kpiLevers = this.state.kpiData.controls;
        }
        if (this.state.leverData && Object.keys(this.state.leverData).length > 0) {
            inhibitorArr = this.state.leverData.inhibitors;
            capabilityArr = this.state.leverData.capabilities;
        }
        if (inhibitorArr) {
            inhibitorDivs = inhibitorArr.map((inhibitor, key) => {
                return (
                    <div key={'inhibitorRow-' + key}>
                        <div className="delete-field">
                            <p style={{ display: this.state['viewLever' + this.state.currentLever] }}>{inhibitor.Inhibitors}</p>
                            <Input type="text" name='Inhibitors' defaultValue={inhibitor.Inhibitors} className="inibitorText" style={{ display: this.state['editLever' + this.state.currentLever] }} onChange={(e) => this.onInhibitorChange(e, this.state.currentLever, inhibitor.KPIInhibitorsId, key)} />
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col sm="6">
                                    <label>Probability %</label>
                                    <p style={{ display: this.state['viewLever' + this.state.currentLever] ? this.state['viewLever' + this.state.currentLever] : 'block' }}>{inhibitor.Probability}</p>
                                    <Input name="Probability" onFocus={(e)=>{e.target.value=this.parseNumber(e.target.value.replace('%',''))}}
                                    onBlur={(e)=>{e.target.value=e.target.value+"%"}}
                                    onChange={(e)=>{if(parseInt((e.target.value).replace('%',''))>=0 && parseInt((e.target.value).replace('%',''))<= 100){e.target.value=e.target.value.replace('%','')}else{e.target.value=""}}}
                                    defaultValue={inhibitor.Probability} className="inibitorText" style={{ display: this.state['editLever' + this.state.currentLever] }} 
                                    onKeyUp={(e) => {if(parseInt(e.target.value)>=0 && parseInt(e.target.value)<= 100 ){ this.onInhibitorChange(e, this.state.currentLever, inhibitor.KPIInhibitorsId, key);this.handleEstimatedSavingsRollUp1(this.state.currentLever); this.riskcostHandler(inhibitor.KPIInhibitorsId)}}} />
                                </Col>
                                <Col sm="6">
                                    <label>Impact Cost</label>
                                    <p style={{ display: this.state['viewLever' + this.state.currentLever] ? this.state['viewLever' + this.state.currentLever] : 'block' }}>{inhibitor.ImpactCost}</p>
                                    <Input name="ImpactCost" onFocus={(e)=>{e.target.value=this.parseNumber(e.target.value.replace('$',''))}}
                                    onBlur={(e)=>{e.target.value="$"+parseInt(e.target.value).toFixed(2)}}
                                    defaultValue={inhibitor.ImpactCost} className="inibitorText" style={{ display: this.state['editLever' + this.state.currentLever] }} 
                                    onChange={(e)=>{e.target.value=e.target.value.replace('$','')}}
                                    onKeyUp={(e) =>{ this.onInhibitorChange(e, this.state.currentLever, inhibitor.KPIInhibitorsId, key);this.handleEstimatedSavingsRollUp1(this.state.currentLever);this.riskcostHandler(inhibitor.KPIInhibitorsId)}} />
                                </Col>
                                <Col sm="12"><p className="text-muted mb-0"><small>Based on the above value the risk cost will be {inhibitor.RiskCost}</small></p></Col>
                            </Row>
                        </div>
                    </div>
                )
            })
        }
        if (capabilityArr) {
            capabilityDivs = capabilityArr.map((capability, key) => {
                 let y = 0;
                 if (this.findTargetDate(this.state.currentLever) !== null) { y = this.findTargetDate(this.state.currentLever).split('/') } else { y = moment(new Date()).format("MM/DD/YYYY").split('/') }
                let x = 0;
                if (capability.ExpectedBy !== null && capability.ExpectedBy !== undefined) { x = ((capability.ExpectedBy).split('/')) } else { x = moment(new Date()).format("MM/DD/YYYY").split('/') }
                return (
                    <div key={'capabilityRow-' + key}>
                        <div className="delete-field">
                            <p style={{ display: this.state['viewLever' + this.state.currentLever] }}>{capability.Capabilities}</p>
                            <Input type="text" name='Capabilities' defaultValue={capability.Capabilities} className="capabilityText" style={{ display: this.state['editLever' + this.state.currentLever] }} onChange={(e) => this.onCapabilityChange(e, this.state.currentLever, capability.KPICapabilitiesId, key)} />
                        </div>
                        <div className="form-group">
                            <Row>
                                {/* <Col sm="6">
                                    <label>Investment required $</label>
                                    <Input name="investment_required" defaultValue={capability.InvestmentRequired} className="capabilityText" style={{ display: this.state['editLever' + this.state.currentLever] }} onChange={(e) => this.onCapabilityChange(e, this.state.currentLever, capability.KPICapabilitiesId, key)} />
                                </Col> */}
                                <Col sm="6">
                                    <label>CAPEX $</label>
                                    <p style={{ display: this.state['viewLever' + this.state.currentLever] ? this.state['viewLever' + this.state.currentLever] : 'block' }}>{capability.Capex}</p>
                                    <Input name="Capex" 
                                    onFocus={(e)=>{e.target.value=this.parseNumber(e.target.value.replace('$',''))}}
                                    onBlur={(e)=>{e.target.value="$"+parseInt(e.target.value).toFixed(2)}}
                                    onKeyUp={(e)=>{e.target.value=e.target.value.replace('$','');this.handleEstimatedSavingsRollUp1(this.state.currentLever)}}
                                    defaultValue={(capability.Capex)} 
                                    onChange={(e) => {this.onCapabilityChange(e, this.state.currentLever, capability.KPICapabilitiesId, key)}} 
                                    className="capabilityText" style={{ display: this.state['editLever' + this.state.currentLever] }} />
                                </Col>
                                <Col sm="6">
                                    <label>CAPEX SPREAD YEARS</label>
                                    <p style={{ display: this.state['viewLever' + this.state.currentLever] ? this.state['viewLever' + this.state.currentLever] : 'block' }}>{capability.CapexSpreadYears}</p>
                                    <Input name="CapexSpreadYears" defaultValue={parseInt(capability.CapexSpreadYears)} type="number" onChange={(e) => {this.onCapabilityChange(e, this.state.currentLever, capability.KPICapabilitiesId, key);this.handleEstimatedSavingsRollUp1(this.state.currentLever)}} className="capabilityText" style={{ display: this.state['editLever' + this.state.currentLever] }} />
                                </Col>
                                <Col sm="6">
                                    <label>Expected By</label>
                                    <p style={{ display: this.state['viewLever' + this.state.currentLever] ? this.state['viewLever' + this.state.currentLever] : 'block' }}>{capability.ExpectedBy}</p>
                                    {this.state['editLever' + this.state.currentLever] === 'block' ? <div className="d-flex mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-calendar-alt"></i>
                                            </div>
                                        </div>

                                        <DatePicker
                                            className="form-control textbox-control dateControl-class"
                                            maxDate={new Date(y[2], (y[0])-1, y[1])}
                                            selected={new Date(x[2], (x[0] - 1), x[1])}
                                            onChange={(date) => this.handleExpectedByChange(date, this.state.currentLever, capability.KPICapabilitiesId, key)}
                                        /></div> : <></>}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6">
                                    <label>OPEX $</label>
                                    <p style={{ display: this.state['viewLever' + this.state.currentLever] ? this.state['viewLever' + this.state.currentLever] : 'block' }}>{capability.Opex}</p>
                                    <Input name="Opex" 
                                    onFocus={(e)=>{e.target.value=this.parseNumber(e.target.value.replace('$',''))}}
                                    onBlur={(e)=>{e.target.value="$"+parseInt(e.target.value).toFixed(2)}}
                                    onKeyUp={(e)=>{e.target.value=e.target.value.replace('$','');this.handleEstimatedSavingsRollUp1(this.state.currentLever)}}
                                    defaultValue={(capability.Opex)}  
                                    onChange={(e) => {this.onCapabilityChange(e, this.state.currentLever, capability.KPICapabilitiesId, key)}} 
                                    className="capabilityText" style={{ display: this.state['editLever' + this.state.currentLever] }} />
                                </Col>
                                <Col sm="6">
                                    <label>Frequency</label>
                                    <p style={{ display: this.state['viewLever' + this.state.currentLever] ? this.state['viewLever' + this.state.currentLever] : 'block' }}>{capability.Frequency}</p>
                                    <select name="Frequency" onChange={(e) => {this.onCapabilityChange(e, this.state.currentLever, capability.KPICapabilitiesId, key);this.handleEstimatedSavingsRollUp1(this.state.currentLever)}}  className="form-control"
                                     style={{ display: this.state['editLever' + this.state.currentLever] }} value={capability.Frequency}>
                                        {/* <option value="year">Year</option>
                                            <option value="month">Month</option> */}
                                        <option>{"Select"}</option>
                                        {audit_frequency}
                                    </select>
                                </Col>
                            </Row>
                        </div>
                    </div>
                )
            })
        }
        if (kpiLevers) {
            controlLevers = kpiLevers.map((lever, index) => {
                let x = 0;
                
                if (lever.target_date !== null) { x = (moment(lever.target_date).format("MM/DD/YYYY")).split('/') } else { x = moment(new Date()).format("MM/DD/YYYY").split('/') }
                let estimatedSavingsData = parseFloat(parseInt(lever.estimated_savings).toFixed(2));
                 estimatedSavingsData=((estimatedSavingsData != NaN) ? estimatedSavingsData.toLocaleString(): 0)
                return (
                    <div className="bg-white newkpi-form mb-3" key={'kpiLever-' + index}>
                        <div className="dropdown">
                            <a href="#" className="float-right dropdown-toggle" data-toggle="dropdown"><i
                                className="fas fa-ellipsis-v"></i></a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="#" onClick={(e) => this.editLever(e, lever.ControlLeverID)}>Edit</a>
                                <a className="dropdown-item" href="#" onClick={(e) => this.deleteKpiLever(e, kpiData.KPIID, lever.ControlLeverID)}>Delete</a>
                            </div>
                        </div>
                        <div className="control-lever default-view">
                            <div className="form-group">
                                <label>Control Lever #{index+1}</label>
                                <h3 style={{ display: this.state['viewLever' + lever.ControlLeverID] ? this.state['viewLever' + lever.ControlLeverID] : 'block' }}>{lever.ControlLeversTitle}</h3>
                                <Input type="text" name='ControlLeversTitle' defaultValue={lever.ControlLeversTitle} className="inibitorText" style={{ display: this.state['editLever' + lever.ControlLeverID] ? this.state['editLever' + lever.ControlLeverID] : 'none' }} onChange={(e) => this.onInputChange(e, lever.ControlLeverID)} />
                            </div>
                            <div className="form-group">
                                <label>Business Metrics</label>
                                <p style={{ display: this.state['viewLever' + lever.ControlLeverID] ? this.state['viewLever' + lever.ControlLeverID] : 'block' }}>{lever.business_metrics}</p>
                                <Input type="text" name="business_metrics" defaultValue={lever.business_metrics} className="inibitorText" style={{ display: this.state['editLever' + lever.ControlLeverID] ? this.state['editLever' + lever.ControlLeverID] : 'none' }} onChange={(e) => this.onInputChange(e, lever.ControlLeverID)} />
                            </div>
                            <div className="form-group">
                                <Row>
                                    <Col sm="6">
                                        <label>Expected Target Growth</label>
                                        <p style={{ display: this.state['viewLever' + lever.ControlLeverID] ? this.state['viewLever' + lever.ControlLeverID] : 'block' }}>{lever.ExpectedTargetGrowth}</p>
                                        <Input name="ExpectedTargetGrowth" defaultValue={(lever.ExpectedTargetGrowth).replace('$','')} 
                                        onFocus={(e)=>e.target.value=this.parseNumber(e.target.value)}
                                        className="inibitorText" style={{ display: this.state['editLever' + lever.ControlLeverID] ? this.state['editLever' + lever.ControlLeverID] : 'none' }}
                                         onChange={(e) => {this.onInputChange(e, lever.ControlLeverID);this.handleEstimatedSavingsRollUp1(lever.ControlLeverID)}} />
                                    </Col>
                                    <Col sm="6">
                                        <label style={{ display: this.state['editLever' + lever.ControlLeverID] ? this.state['editLever' + lever.ControlLeverID] : 'none' }}>Unit of Measurement</label>
                                        {/* <p style={{ display: this.state['viewLever' + lever.ControlLeverID] ? this.state['viewLever' + lever.ControlLeverID] : 'block' }}>{lever.MeasurementUnit}</p> */}
                                        <select name="measurement_unit" onChange={(e) => this.onInputChange(e, lever.ControlLeverID)} style={{ display: this.state['editLever' + lever.ControlLeverID] ? this.state['editLever' + lever.ControlLeverID] : 'none' }} className="form-control" value={lever.measurement_unit}>
                                            {/* <option value="year">Year</option>
                                            <option value="month">Month</option> */}
                                             <option>{"Select"}</option>
                                            {unit_of_measurement}
                                        </select>
                                    </Col>
                                </Row>
                            </div>
                            <div className="form-group">
                                <Row>
                                    <Col sm="6">
                                        <label>Target Date</label>
                                        <div className="d-flex mb-2">
                                            <div className="input-group-prepend" style={{ display: this.state['editLever' + lever.ControlLeverID] ? this.state['editLever' + lever.ControlLeverID] : 'none' }}>
                                                <div className="input-group-text">
                                                    <i className="fas fa-calendar-alt"></i>
                                                </div>
                                            </div>
                                            <p style={{ display: this.state['viewLever' + lever.ControlLeverID] ? this.state['viewLever' + lever.ControlLeverID] : 'block' }}>
                                                {moment(lever.target_date).format("MM/DD/YYYY")}</p>
                                            {this.state['editLever' + lever.ControlLeverID] === 'block' ? <DatePicker
                                                className="form-control textbox-control dateControl-class"
                                                selected={(new Date(x[2], (x[0] - 1), x[1]))}
                                                onChange={(date) => this.handleLeverTargetDate(date, lever.ControlLeverID)}
                                            /> : <></>}
                                            {/* <Button color="primary" className="rollUp" style={{ display: this.state['editLever' + lever.ControlLeverID] ? this.state['editLever' + lever.ControlLeverID] : 'none' }}><i className="fa fa-caret-up"></i></Button> */}
                                        </div>
                                        {/* <p className="text-muted float-right mb-0" style={{ display: this.state['editLever' + lever.ControlLeverID] ? this.state['editLever' + lever.ControlLeverID] : 'none' }}><small>Clicking on the button will roll up target date</small></p> */}
                                    </Col>
                                    <Col sm="6">
                                        <label>Improvement Basis</label>
                                        <p style={{ display: this.state['viewLever' + lever.ControlLeverID] ? this.state['viewLever' + lever.ControlLeverID] : 'block' }}>{lever.improvement_basis}</p>
                                        <select name="improvement_basis" onChange={(e) => {this.onInputChange(e, lever.ControlLeverID);this.handleEstimatedSavingsRollUp1(lever.ControlLeverID)}} style={{ display: this.state['editLever' + lever.ControlLeverID] ? this.state['editLever' + lever.ControlLeverID] : 'none' }} value={lever.improvement_basis} className="form-control">
                                            {/* <option value="per_year">Per year</option> */}
                                            <option>{"Select"}</option>
                                            {improvement_basis}
                                        </select>
                                    </Col>
                                </Row>
                                <div className="form-group" >
                                    <label>Estimated Annual Savings $</label>
                                    <p className="badge badge-warning">{estimatedSavingsData}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Persona Impacted</label>
                                <p style={{ display: this.state['viewLever' + lever.ControlLeverID] ? this.state['viewLever' + lever.ControlLeverID] : 'block' }}>{lever.PersonaImpacted}</p>
                                <Input type="text" name='PersonaImpacted' defaultValue={lever.PersonaImpacted} className="inibitorText" style={{ display: this.state['editLever' + lever.ControlLeverID] ? this.state['editLever' + lever.ControlLeverID] : 'none' }} onChange={(e) => this.onInputChange(e, lever.ControlLeverID)} />
                            </div>
                        </div>
                        <div className="summary">
                            <div rel={this.state.currentLever} className={this.state.currentLever === lever.ControlLeverID ? "collapse show" : "collapse"} id={"collapseSummary" + index}>
                                <div className="control-lever default-view">
                                    <div className="form-group">
                                        <label><span className="badge badge-warning">{lever.KPIInhibitorsCount} Inhibitors</span></label>
                                        {inhibitorDivs}
                                    </div>
                                    {this.state['editLever' + lever.ControlLeverID] === 'block' ? <div className="form-group">
                                        <a href="#" onClick={(e) => this.handleAddInhibitor(e)}>Add Inhibitor</a>
                                    </div> : <></>}
                                    <div className="form-group">
                                        <label><span className="badge badge-info">{lever.KPICapabilities} Necessary Capabilities</span></label>
                                        {capabilityDivs}
                                    </div>
                                    {this.state['editLever' + lever.ControlLeverID] === 'block' ? <div className="form-group">
                                        <a href="#" onClick={(e) => this.handleAddCapability(e)}>Add Capability</a>
                                    </div> : <></>}
                                </div>
                                <div className="actionBtns" style={{ display: this.state['editLever' + lever.ControlLeverID] }}>
                                    <Button color="primary" className="mr-4" onClick={(e) => this.updateControlLever(e, lever.ControlLeverID)}>SAVE</Button>
                                    <a href="#" onClick={(e) => this.cancelEdit(e, lever.ControlLeverID)}>Cancel</a>
                                </div>
                            </div>
                            <a className={this.state.currentLever === lever.ControlLeverID ? "readbtn float-right" : "readbtn collapsed float-right"} data-toggle="collapse" href={"#collapseSummary" + index} aria-expanded="false" aria-controls="collapseSummary" onClick={this.expandControlLever.bind(this, lever.ControlLeverID)}></a>
                        </div>
                    </div>
                )
            })
        }

        let newControlLevers = this.state.newControlLevers.map(controlLever => {
            return (controlLever);
        });
        let date = 0
        let x = (moment(new Date()).format("MM/DD/YYYY")).split("/")
        { if (kpiData.TargetDate !== null) { date = moment(kpiData.TargetDate).format("MM/DD/YYYY"); x = (moment(kpiData.TargetDate).format("MM/DD/YYYY")).split("/") } else { date = moment(kpiData.target_date).format("MM/DD/YYYY"); x = (moment(kpiData.target_date).format("MM/DD/YYYY")).split("/") } };
        //  let x = (moment(kpiData.TargetDate).format("MM/DD/YYYY")).split("/") } else { let date = moment(kpiData.target_date).format("MM/DD/YYYY"); let x = (moment(kpiData.target_date).format("MM/DD/YYYY")).split("/") }
        let expTargetGrowthJXS = "";
        if (kpiData.ExpectedTargetGrowth !== null && kpiData.ExpectedTargetGrowth != "") {
            expTargetGrowthJXS = (<div>
                {this.UnitOfMeasurementConverter1(kpiData.UnitOfMeasurement) + this.ExpectedTargetGrowthConverter(kpiData.ExpectedTargetGrowth) + this.UnitOfMeasurementConverter2(kpiData.UnitOfMeasurement) + " Per " + this.ImprovementbasisConverter(kpiData.Improvementbasis)}
            </div>)
        } else {
            expTargetGrowthJXS = (<div>0</div>)
        }
        return (

            <>
                <Loader loading={this.state.loading}/>
                <Row className="kpi-detail-sec mb-4">
                    <div className="detail-left">
                        <div className="kpi-heading">
                            <h2 className="heading">KPI</h2>
                        </div>
                        <div className="price-container">
                            <div className="price-box">
                                <div className="top-bg bg-warning">
                                    <div className="dropdown">
                                        <a href="#" className="float-right dropdown-toggle" data-toggle="dropdown"><i
                                            className="fas fa-ellipsis-v"></i></a>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="#" onClick={(e) => {
                                                e.preventDefault();
                                                this.setState({ editKpiMode: true })
                                            }}>Edit</a>
                                            <a className="dropdown-item" href="#" onClick={(e) => this.deleteKpi(e, kpiData.KPIID)}>Delete</a>
                                        </div>
                                    </div>
                                    <p>Business Target Outcome/KPIs</p>
                                    <h3 style={{ display: this.state.editKpiMode ? 'none' : 'block' }}>{kpiData.KPITitle}</h3>
                                    <Input type="text" name="KPITitle" defaultValue={kpiData.KPITitle} style={{ display: this.state.editKpiMode ? 'block' : 'none' }} onChange={(e) => this.handleKpiInputChange(e)} />
                                </div>
                                <div className="bottom-content">
                                    <p className="txt-gray mb-0">Business Metrics</p>
                                    <p style={{ display: this.state.editKpiMode ? 'none' : 'block' }}>{kpiData.BusinessMetrics}</p>
                                    <Input type="text" name="BusinessMetrics" defaultValue={kpiData.BusinessMetrics} style={{ display: this.state.editKpiMode ? 'block' : 'none' }} onChange={(e) => this.handleKpiInputChange(e)} />
                                    <p className="txt-gray mb-0">Persona Impacted</p>
                                    <p style={{ display: this.state.editKpiMode ? 'none' : 'block' }}>{kpiData.PersonaImpacted}</p>
                                    <Input type="text" name="PersonaImpacted" defaultValue={kpiData.PersonaImpacted} style={{ display: this.state.editKpiMode ? 'block' : 'none' }} onChange={(e) => this.handleKpiInputChange(e)} />
                                    <p className="txt-gray mb-0">Estimated Annual $ Savings</p>
                                    <div style={{ display: this.state.editKpiMode ? 'none' : 'block' }} className="kpi-price">
                                        {"$"+this.currencyCoverter(kpiData.EstimatedSavings)}
                                    </div>
                                    <Input type="text" name="EstimatedSavings" value={kpiData.EstimatedSavings} style={{ display: this.state.editKpiMode ? 'inline-block' : 'none',width:'85%' }} onChange={(e) => this.handleKpiInputChange(e)} />
                                    <Button color="primary" className="ml-auto" style={{ display: this.state.editKpiMode ? 'inline-block' : 'none' }} onClick={this.handleClickEstimatedSavingsRollUp.bind(this)}><i className="fa fa-caret-up"></i></Button>
                                   
                                    <p className="txt-gray mb-0">Expected Target Growth</p>
                                    <div style={{ display: this.state.editKpiMode ? 'none' : 'block' }}>
                                        {expTargetGrowthJXS}
                                    </div>
                                   

                                    <Input type="text" name="ExpectedTargetGrowth" defaultValue={kpiData.ExpectedTargetGrowth} style={{ display: this.state.editKpiMode ? 'block' : 'none' }} onChange={(e) => this.handleKpiInputChange(e)} />
                                    <p className="txt-gray mb-0">Target Date</p>
                                    <div style={{ display: this.state.editKpiMode ? 'none' : 'block' }}>
                                        {date}
                                    </div>


                                    {this.state.editKpiMode === true ? <DatePicker
                                        className="form-control textbox-control dateControl-class wi200px"
                                        selected={new Date(x[2], (x[0] - 1), x[1])}
                                        onChange={(date) => this.handleKpiTargetDate(date)}
                                    />
                                     : <></>}
                                     {this.state.editKpiMode === true ? <Button color="primary"
                                         onClick={this.handleTargetDateRollUp.bind(this)}><i className="fa fa-caret-up"></i></Button>
                                         : <></>}   
                                    <p><span className="badge badge-warning">{kpiData.ControlLevelCount} Control Lever</span></p>
                                </div>
                                <div className="bottom-content actionBtns" style={{ display: this.state.editKpiMode ? 'block' : 'none' }}>
                                    <Button color="primary" className="mr-4" onClick={this.handleKpiUpdate.bind(this)}>Save</Button>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({ editKpiMode: false })
                                    }
                                    }>Cancel</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="new-kpidetail-col">
                        <div className="kpi-heading d-sm-flex justify-content-between">
                            <h2>Control Levers</h2>
                            <div className="kpi-btn">
                                <button type="button" className="btn btn-primary" onClick={() => this.props.history.push("/kpi-setting/"+this.state.setId)}>BACK</button>
                            </div>
                        </div>
                        <div className="control-levers-container">
                            {controlLevers}
                            {newControlLevers}
                        </div>
                        {this.state.leverCounter > 0 ? <Button color="primary" onClick={this.saveNewLevers.bind(this)}>SAVE</Button> : <></>}
                    </div>
                </Row>
                <Row className="bottom-btn-tab">
                    <div className="detail-left">&nbsp;</div>
                    <div className="new-kpidetail-col mb-5">
                        <div className="add-tab-bg">
                            <div className="lever-icon">
                                <a href="#" onClick={(e) => this.addControlLever(e)}>
                                    <i className="fas fa-plus-circle"></i><br />
                                    <span>Add Control lever</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Row>
                <Row className="mt-5 bg-bottom">
                    <div className="kpi-btn text-center m-auto">
                        <Button color="primary">START DESIGN THINKING</Button>
                    </div>
                </Row>
            </>
        )
    }
}

KpiDetail.propTypes = {
    getKpi: PropTypes.func.isRequired,
    getaudit_frequency : PropTypes.func.isRequired,
    getimprovement_basis : PropTypes.func.isRequired,
    kpiData: PropTypes.object.isRequired,
    getControlLever: PropTypes.func,
    leverData: PropTypes.object,
    updateControlLever: PropTypes.func,
    updatedLever: PropTypes.object,
    updateKpi: PropTypes.func,
    saveNewLevers: PropTypes.func,
    deleteKpi: PropTypes.func,
    deleteKpiData: PropTypes.object,
    deleteKpiLever: PropTypes.func,
    deleteLeverData: PropTypes.object,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    kpiData: state.kpiData.kpi,
    leverData: state.kpiData.leverData,
    updatedLever: state.kpiData.updatedLever,
    deleteKpiData: state.kpiData.deleteKpiData,
    deleteLeverData: state.kpiData.deleteLeverData,
    //measurement: state.kpiData.measurement,
    frequency: state.kpiData.frequency,
    improvement_basis: state.kpiData.improvement_basis,
    errors: state.errors
});
export default connect(mapStateToProps, {getaudit_frequency, getimprovement_basis, getKpi, getControlLever, updateControlLever, updateKpi, saveNewLevers, deleteKpi, deleteKpiLever })(withRouter(KpiDetail));