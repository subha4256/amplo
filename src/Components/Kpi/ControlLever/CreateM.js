import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ModalPopup from '../../common/ModalPopup';
import { Input, Button, Row, Col } from 'reactstrap';
import DatePicker from "react-datepicker";
import moment from 'moment';
//import { getaudit_frequency, getimprovement_basis } from '../../../actions/kpiActions';
import "react-datepicker/dist/react-datepicker.css";
import { responseMessage } from '../../../utils/alert';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
const config = require('../../../config');
class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uom: [],
            personas:[],
            expandAcc:false,
            personaModalCL: false,
            riskCost: 0,
            frequency1: [],
            improvement_basis: [],
            UOMPercentCL: true,
            inhibitors: [{
                KPIInhibitorsID: 0,
                value: "",
                RiskProbabilityPercentage: "",
            }],
            capabilities: [{
                KPICapabilitiesID: 0,
                value: "",
                InvestmentRequired: 1,
                Capex: "",
                Opex: ""
            }]
        }
    }

    handleTargetDateChange(date, leverCounter) {
        const eObj = {
            target: {
                name: "TargetDate",
                value: moment(date).format("YYYY-MM-DD")
            }
        }
        //console.log(eObj);
        this.setState({
            ['TargetDate' + leverCounter]: date
        }, function () {
            this.props.handleOnChange(eObj, leverCounter, null, null);
        })
    }

    handleExpectedByChange(date, leverCounter, key) {
        //console.log(moment(date).format("YYYY-MM-DD"))
        //console.log((moment(this.state['target_date'+leverCounter]).format("YYYY-MM-DD")))
        if (((moment(date).format("YYYY-MM-DD"))) <= (moment(this.state['TargetDate' + leverCounter]).format("YYYY-MM-DD"))) {
            const eObj = {
                target: {
                    name: "ExpectedBy",
                    value: moment(date).format("YYYY-MM-DD")
                }
            }
            this.setState({
                ['ExpectedBy' + leverCounter + key]: date
            }, function () {
                this.props.handleOnChange(eObj, leverCounter, 'capabilities', key);
            })
            this.props.handleOnChange(eObj, leverCounter, 'capabilities', key);
        }
        else {
            responseMessage("warning", "You can't select expected date more than target date", "");
            const eObj = {
                target: {
                    name: "ExpectedBy",
                    value: moment(this.state['TargetDate' + leverCounter]).format("YYYY-MM-DD")
                }
            }
            this.setState({
                ['ExpectedBy' + leverCounter + key]: this.state['TargetDate' + leverCounter]
            }, function () {
                this.props.handleOnChange(eObj, leverCounter, 'capabilities', key);
            })
            this.props.handleOnChange(eObj, leverCounter, 'capabilities', key);
        }
    }
    showViewHandler = () => {
        for (let i = 1; i <= parseInt(this.props.leverCounter); i++) {
            let id = "CL" + i
            if (i == this.props.leverCounter) {
                this.setState({ [id]: true })
            }
            else {
                this.setState({ [id]: false })
            }
        }
    }
    componentDidMount() {
        // this.props.getimprovement_basis();
        // this.props.getaudit_frequency();
        this.showViewHandler();
    }


    riskcostHandler(key, leverCounter) {
        let pb = document.getElementById("RiskProbabilityPercentage" + leverCounter + key).value;
        let ic = document.getElementById("ImpactCost" + leverCounter + key).value;
        //console.log(pb);
        if (pb !== undefined && ic !== undefined) {
            let icost = parseInt((ic).replace('$', ''));
            let prob = parseInt((pb).replace('%', ''));
            let riskCost = ((icost * prob) / 100);
            //console.log(riskCost)
            if (!isNaN(riskCost)) {
                // document.getElementById("riskCost" + leverCounter + key).innerHTML = "$" + riskCost;
                document.getElementById("riskCostT" + leverCounter + key).value = riskCost;
                let e = {
                    "target":{
                        "name":"RiskCost",
                        "value":riskCost
                    }
                }
                 this.props.handleOnChange(e, leverCounter, 'inhibitors', key)
            } else {
                // document.getElementById("riskCost" + leverCounter + key).innerHTML = "";
            }
            // this.setState({
            //     [riskCost+leverCounter+key]: riskCost
            // })

        }
    }
    deleteInhibitor(leverCounter, inhibitorIndex) {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to delete this Inhibitor ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let inhibitors = this.state.inhibitors;
                        delete inhibitors[inhibitorIndex];
                        this.setState({
                            inhibitors: inhibitors
                        });
                        this.props.deleteInhibitor(leverCounter, inhibitorIndex);
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }

    deleteCapability(leverCounter, capabilityIndex) {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to delete this Capability ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        let capabilities = this.state.capabilities;
                        delete capabilities[capabilityIndex];
                        this.setState({
                            capabilities: capabilities
                        });
                        this.props.deleteCapability(leverCounter, capabilityIndex);
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
        
    }

    deleteLever(e, index) {
        e.preventDefault();
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to delete this Control Lever ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.deleteLever(e, index)
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }

    handleOnChange(e, leverCounter, parameter, key) {
        //console.log(leverCounter, parameter, key);
        this.setState({
            [e.target.name + leverCounter + key]: e.target.value
        })
        this.props.handleOnChange(e, leverCounter, parameter, key);
    }

    handleFrequencyChange(e, leverCounter, parameter, key) {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.props.handleOnChange(e, leverCounter, parameter, key);
        this.props.handleEstimatedSavingsRollUp();
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
    handlePersonaModalCL = () => {
        this.setState({ personaModalCL: true })
    }
    togglePersonaModalCL = () => {
        this.setState({ personaModalCL: !this.state.personaModalCL })
    }
    personaSaveCL = (leverCounter) => {
        let personaText = ""
        for (let i in this.state.personas) {
            if (this.state.personas[i].IsSelected == "1") {
                personaText += this.state.personas[i].PersonaName + ',';
            }
        }
        this.setState({
            personaModalCL: !this.state.personaModalCL,
            PersonaImpactedControlLever: personaText
        })
        this.props.handleOnChange({target:{name:"PersonaImpactedControlLever", value:personaText}},leverCounter,null,null)
    }
    handlePersonaChange(e, key) {
        let personas = this.props.uom;
        if (e.target.checked) {
            personas[key].IsSelected = "1";

        } else {
            personas[key].IsSelected = "0";
        }
        this.setState({
            personas: personas
        })
    }
    getPersonaFromStore = () => {
        let persona = [];
        if ((this.props.uom).length > 0) {
            persona = this.props.uom.map((p, i) => {
                return (
                    < tr key={p.PersonaId+i}>
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
    estimatedAnnualPercentGainCal = (percent, basis) => {
        let x = 0;
        switch (basis) {
            case "Month":
                x = 12
                break
            case "Quarter":
                x = 4
                break
            case "Semi-Annually":
                x = 2
                break
            case "Year":
                x = 1
                break

        }
        let EstimatedAnnual = percent * x;
        if (isNaN(EstimatedAnnual)) {
            EstimatedAnnual = 0
        }
        return EstimatedAnnual

    }
    EstimatedAmountforControlHandler(leverCounter){
        let amt = "";
        if(this.props.leverData[leverCounter - 1].UnitOfMeasurementControl == "percent"){
            if(this.props.leverData[leverCounter - 1].HistoricalGainAmount && this.props.leverData[leverCounter - 1].ExpectedGainPercentage){
                amt = Number(Number(this.props.leverData[leverCounter - 1].HistoricalGainAmount)*Number(this.props.leverData[leverCounter - 1].ExpectedGainPercentage));
                amt = Number(amt/100);
            }
            this.props.handleOnChange({target:{name:"ExpectedSavingsAmount", value:amt}}, leverCounter, null, null);
        }else{
            amt = this.props.leverData[leverCounter - 1].ExpectedGainAmount;
            this.props.handleOnChange({target:{name:"ExpectedSavingsAmount", value:amt}}, leverCounter, null, null);
        }
    }
    render() {
        //console.log(this.state);
        console.log(this.props.leverData,"inRender");
        let audit_frequency = this.getauditfrequencyFromStore()
        let improvement_basis = this.getimprovementbasisFromStore();
        let personaList = this.getPersonaFromStore();
        const { leverCounter } = this.props;
        let inhibitors = this.props.leverData[leverCounter - 1].inhibitors;
        let capabilities = this.props.leverData[leverCounter - 1].capabilities;
        // console.log(inhibitors, capabilities, this.props.leverData, leverCounter)
        let dynamicInhibitors = inhibitors.map((inhibitor, key) => {
            return (
                <div className="bs-exampleinhabitor" key={key}>
                    <div className="accordion" id="accordionExampleinhabitor">
                        <div className="card">
                            <div className="card-header card-headerinhabitor" id="headingOneinhabitor">
                                <h2 className="mb-0">
                                    <button type="button" className="btn btn-link" data-toggle="collapse" data-target={"#collapseinhabitor" + key}><i className="fas fa-chevron-right"></i></button>
                                    <span style={{fontSize:"20px", verticalAlign:"middle", fontWeight:300}}>Risk {key+1}</span>
                                </h2>
                            </div>
                            <div id={"collapseinhabitor" + key} className="collapse show" aria-labelledby="headingOneinhabitor" data-parent="#accordionExampleinhabitor">
                                <div className="card-body">
                                    <div className="inhabitor-bottom-div">
                                        <div className="form-group"></div>
                                        <div key={'inhibitor-' + key}>
                                            <div className="form-group">
                                                <Row>
                                                    <Col md="11" className="width85-mob-tab">
                                                        <Input type="text" onBlur={(e) => e.target.placeholder = 'Lorem ipsum dolor sit amet'} onFocus={(e) => e.target.placeholder = ''} placeholder="Lorem ipsum dolor sit amet" name={'InhibitorsName'} value={inhibitor.InhibitorsName} onChange={(e) => this.handleOnChange(e, leverCounter, 'inhibitors', key)} />
                                                    </Col>
                                                    <Col md="1" className="width15-mob-tab p-0">
                                                        <div className="del-field">
                                                            <button type="button" className="btn" onClick={this.deleteInhibitor.bind(this, leverCounter, key)}><i className="fas fa-trash-alt"></i></button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="form-group">
                                                <Row>
                                                    <Col md="11" className="width85-mob-tab">
                                                        <Input type="textarea" onBlur={(e) => e.target.placeholder = 'Description'} onFocus={(e) => e.target.placeholder = ''} placeholder="Description" name={'Description'} value={inhibitor.Description} onChange={(e) => this.handleOnChange(e, leverCounter, 'inhibitors', key)} />
                                                    </Col>
                                                    
                                                </Row>
                                            </div>
                                            <div className="form-group">
                                                <Row>
                                                    <Col sm="4">
                                                        <label>Risk Probability %</label>
                                                        <Input name="RiskProbabilityPercentage" type="text"
                                                            id={"RiskProbabilityPercentage" + leverCounter + key}
                                                            value={inhibitor.RiskProbabilityPercentage}
                                                            onFocus={(e) => { e.target.value = e.target.value.replace('%', '') }}
                                                            onBlur={(e) => { e.target.value = e.target.value!=""?isNaN(Number(e.target.value))?"": e.target.value + "%":"" }} 
                                                            onChange={(e) => { if (parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 100) { this.handleOnChange(e, leverCounter, 'inhibitors', key); this.props.handleEstimatedSavingsRollUp(); this.riskcostHandler(key, leverCounter); } }} />
                                                    </Col>
                                                    <Col sm="4">
                                                        <label>Impact Cost</label>
                                                        <Input name="ImpactCost"
                                                            id={"ImpactCost" + leverCounter + key} value={inhibitor.ImpactCost}
                                                            onFocus={(e) => { e.target.value = e.target.value.replace('$', '') }}
                                                            onBlur={(e) => { e.target.value = e.target.value!=""?isNaN(Number(e.target.value))?"":"$" + parseInt(e.target.value).toFixed(2):"" }} onChange={(e) => { this.handleOnChange(e, leverCounter, 'inhibitors', key); this.props.handleEstimatedSavingsRollUp(); this.riskcostHandler(key, leverCounter); }} />
                                                    </Col>
                                                    <Col sm="4">
                                                        <label>Risk Cost $</label>
                                                        <input type="text" className="form-control"
                                                            name="RiskCost" id={"riskCostT" + leverCounter + key}
                                                            value={inhibitor.RiskCost?"$ "+inhibitor.RiskCost:""}
                                                            readOnly
                                                             onChange={(e) => this.props.handleOnChange(e, leverCounter, 'inhibitors', key)}/>
                                                    </Col>
                                                    <Col sm="12" className="mt-1"><p className="smallp mb-0 w-100">Based on the above value the risk cost will be <span>{inhibitor.RiskCost?"$ "+inhibitor.RiskCost:""}</span></p></Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        let x = ((moment(this.state['TargetDate' + leverCounter]).format("MM/DD/YYYY")).split('/'));

        let dynamicCapabilities = capabilities.map((capability, key) => {
            console.log('inCapMap')
            let y = (moment(new Date()).format("MM/DD/YYYY")).split('/')
            if (capability.ExpectedBy) {
                y = (moment(capability.ExpectedBy).format("MM/DD/YYYY")).split('/')
            }
            return (
                <div className="bs-exampleinhabitor" key={key}>
                    <div className="accordion" id="accordionExamplecapability">
                        <div className="card">
                            <div className="card-header card-headerinhabitor" id="headingOnecapability">
                                <h2 className="mb-0">
                                    <button type="button" className="btn btn-link" data-toggle="collapse" data-target={"#collapsecapability" + key+1}><i className="fas fa-chevron-right"></i></button>
                                    <span style={{fontSize:"20px", verticalAlign:"middle", fontWeight:300}}>Capability {key+1}</span>
                                </h2>
                            </div>
                            <div id={"collapsecapability" + key+1} aria-expanded="true" className="collapse show" aria-labelledby="headingOneinhabitor" data-parent="#accordionExamplecapability">
                                <div className="card-body">
                                    <div className="inhabitor-bottom-div">
                                        <div className="form-group"></div>
                                        <div key={'capability-' + key}>
                                            <div className="form-group">
                                                <Row>
                                                    <Col md="11" className="width85-mob-tab">
                                                        <Input type="text" onBlur={(e) => e.target.placeholder = 'Lorem ipsum dolor sit amet'} onFocus={(e) => e.target.placeholder = ''} placeholder="Lorem ipsum dolor sit amet" name={'CapabilitiesName'} value={capability.CapabilitiesName} onChange={(e) => this.props.handleOnChange(e, leverCounter, 'capabilities', key)} />
                                                    </Col>
                                                    <Col md="1" className="width15-mob-tab p-0">
                                                        <button type="button" className="btn" onClick={this.deleteCapability.bind(this, leverCounter, key)}><i className="fas fa-trash-alt"></i></button>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="form-group">
                                                <Row>
                                                    <Col md="11" className="width85-mob-tab">
                                                        <Input type="textarea" onBlur={(e) => e.target.placeholder = 'Description'} onFocus={(e) => e.target.placeholder = ''} placeholder="Description" name={'Description'} value={capability.Description} onChange={(e) => this.props.handleOnChange(e, leverCounter, 'capabilities', key)} />
                                                    </Col>
                                                  
                                                </Row>
                                            </div>
                                            <div className="form-group drop-form-control">
                                                <Row>
                                                    <Col sm="6">
                                                        <label>CAPEX $</label>
                                                        <Input name="Capex"
                                                            value={capability.Capex}
                                                            onFocus={(e) => { e.target.value = e.target.value.replace('$', '') }}
                                                            onBlur={(e) => { e.target.value = "$" + parseInt(e.target.value).toFixed(2) }}
                                                            onChange={(e) => { this.handleOnChange(e, leverCounter, 'capabilities', key); this.props.handleEstimatedSavingsRollUp(); }} />
                                                    </Col>
                                                    <Col sm="6">
                                                        <label>Expected By</label>
                                                        <div className="d-flex mb-2">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text">
                                                                    <i className="fas fa-calendar-alt"></i>
                                                                </div>
                                                            </div>
                                                            <DatePicker
                                                                minDate={new Date()}
                                                                //maxDate={new Date(2021,10,2)}
                                                                maxDate={new Date(x[2], (x[0]) - 1, x[1])}
                                                                className="form-control textbox-control dateControl-class-kpinew"
                                                                selected={new Date(y[2], (y[0]) - 1, y[1])}
                                                                onChange={(date) => this.handleExpectedByChange(date, leverCounter, key)}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="form-group drop-form-control">
                                                <Row>
                                                    <Col sm="6">
                                                        <label>CAPEX SPREAD YEARS</label>
                                                        <Input name="CapexSpreadYears" type="number"
                                                            value={capability.CapexSpreadYears}
                                                            onChange={(e) => { this.handleOnChange(e, leverCounter, 'capabilities', key); this.props.handleEstimatedSavingsRollUp(); }} />
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="form-group drop-form-control">
                                                <Row>
                                                    <Col sm="6">
                                                        <label>OPEX $</label>
                                                        <Input name="Opex"
                                                            value={capability.Opex}
                                                            onFocus={(e) => { e.target.value = e.target.value.replace('$', '') }}
                                                            onBlur={(e) => { e.target.value = "$" + parseInt(e.target.value).toFixed(2) }}
                                                            onChange={(e) => { this.handleOnChange(e, leverCounter, 'capabilities', key); this.props.handleEstimatedSavingsRollUp(); }} />
                                                    </Col>
                                                    <Col sm="6">
                                                        <label>OPEX Frequency</label>

                                                        <select name="Frequency" className="form-control" value={capability.Frequency} onChange={(e) => this.handleFrequencyChange(e, leverCounter, 'capabilities', key)}>

                                                            <option></option>
                                                            {audit_frequency}
                                                        </select>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        if (this.props.leverData[leverCounter]) {
            //console.log(this.props.leverData[leverCounter].estimated_saving);
        }
        let z = (moment(new Date()).format("MM/DD/YYYY")).split('/')
        if (this.props.leverData[leverCounter - 1].TargetDate) {
            z = (moment(this.props.leverData[leverCounter - 1].TargetDate).format("MM/DD/YYYY")).split('/')
        }
        let amt = "";
        if(this.props.leverData[leverCounter - 1].UnitOfMeasurementControl == "percent"){
            if(this.props.leverData[leverCounter - 1].HistoricalGainAmount && this.props.leverData[leverCounter - 1].ExpectedGainPercentage){
                amt = Number(Number(this.props.leverData[leverCounter - 1].HistoricalGainAmount)*Number(this.props.leverData[leverCounter - 1].ExpectedGainPercentage));
                amt = Number(amt/100);
            }
        }else{
            amt = this.props.leverData[leverCounter - 1].ExpectedGainAmount;
        }
        console.log(this.props.leverData[leverCounter - 1].UnitOfMeasurementControl)
        return (
            <>
                <div className="accordion-kpi" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button onClick={()=>this.setState({expandAcc:!this.state.expandAcc})} type="button" className="btn btn-link accordianbutton" data-toggle="collapse" data-target={"#collapseOne" + this.props.leverCounter}><i className={this.state.expandAcc?"far fa-minus-square":"far fa-plus-square"}></i>Control Lever/Sub KPI #{this.props.leverCounter}</button>
                            </h2>
                        </div>
                        <div id={"collapseOne" + this.props.leverCounter} className="collapspadding-control collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="bg-white newkpi-form mb-4">
                                <a href="#" className="float-right" onClick={(e) => { this.deleteLever(e, leverCounter) }}>Delete</a>
                                <div className="control-lever">
                                    <div className="form-group">
                                        <label>Control Lever/Sub KPI #{this.props.leverCounter}</label>
                                        <Input type="text" name='ControlLeversName' value={this.props.leverData[leverCounter - 1].ControlLeversName}
                                            onChange={(e) => this.props.handleOnChange(e, leverCounter, null, null)} onBlur={(e) => e.target.placeholder = 'Decrease equipment downtime'} onFocus={(e) => e.target.placeholder = ''} placeholder="Decrease equipment downtime" />
                                    </div>
                                    <div className="form-group drop-form-control">
                                        <Row>
                                            <Col sm="12">
                                                <label>Business Metrics</label>
                                                <Input type="text" name="BusinessMetricsControl"
                                                    value={this.props.leverData[leverCounter - 1].BusinessMetricsControl}
                                                    onChange={(e) => this.handleOnChange(e, leverCounter, null, null)}
                                                    onBlur={(e) => e.target.placeholder = 'XXXXX XXX'}
                                                    onFocus={(e) => e.target.placeholder = ''} placeholder="XXXXX XXX" />
                                            </Col>
                                           
                                            {/* <Col sm="6">
                                                <label>Expected Target Growth%</label>
                                                <select className="form-control" name="ExpectedTargetGrowth"
                                                    value={this.props.leverData[leverCounter - 1].ExpectedTargetGrowth}
                                                    onChange={(e) => this.props.handleOnChange(e, leverCounter, null, null)}>
                                                    <option></option>
                                                    <option value={"10%"}>0-10%</option>
                                                    <option value={"20%"}>10-20%</option>
                                                    <option value={"30%"}>20-30%</option>
                                                    <option value={"40%"}>30-40%</option>
                                                    <option value={"50%"}>40-50%</option>
                                                    <option value={"60%"}>50-60%</option>
                                                    <option value={"70%"}>60-70%</option>
                                                    <option value={"80%"}>70-80%</option>
                                                    <option value={"90%"}>80-90%</option>
                                                    <option value={"100%"}>90-100%</option>
                                                </select>
                                            </Col> */}
                                        </Row>
                                        
                                    </div>
                                    <div className="form-group drop-form-control">
                                    <Row>
                                        <Col sm="12">
                                                <label>Description</label>
                                                <Input type="textarea" name="Description"
                                                    value={this.props.leverData[leverCounter - 1].Description}
                                                    onChange={(e) => this.handleOnChange(e, leverCounter, null, null)}
                                                    onBlur={(e) => e.target.placeholder = 'Description'}
                                                    onFocus={(e) => e.target.placeholder = ''} placeholder="Description" />
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="form-group drop-form-control">
                                        <div className="form-group drop-form-control">
                                            <Row>
                                                <Col md="5">
                                                    <label>Unit Of Measurement</label>
                                                    {/* <form>
                                                        <label className="radio-inline font-13-color000" id="percent">
                                                            <input type="radio" className="pos-rel-top-2" name="percent" checked={this.props.leverData[leverCounter - 1].UnitOfMeasurementControl == "percent" ? true : false} onChange={(e) => { this.props.handleControlLeverUnitOfM(e, leverCounter) }} />&nbsp;&nbsp;Percentage &nbsp;&nbsp;&nbsp;
                                            </label>
                                                        <label className="radio-inline font-13-color000" id="amount">
                                                            <input type="radio" className="pos-rel-top-2" name="amount" checked={this.props.leverData[leverCounter - 1].UnitOfMeasurementControl == "amount" ? true : false} onChange={(e) => { this.props.handleControlLeverUnitOfM(e, leverCounter) }} />&nbsp;&nbsp;Amount
                                            </label>
                                                    </form> */}
                                                    {(this.props.kpiMeasurementType == "percent" || this.props.kpiMeasurementType == "amount")?
                                                    <select className="form-control" value={this.props.leverData[leverCounter - 1].UnitOfMeasurementControl} onChange={(e) => this.props.handleControlLeverUnitOfM(e, leverCounter) }>
                                                        <option value="percent">Percentage $</option>
                                                        <option value="amount">Amount Based Target</option>
                                                        <option value="PercentageQty">Percentage Qty</option>
                                                        <option value="quantity">Quantity Only</option>
                                                    </select>
                                                    :
                                                    <select className="form-control" value={this.props.leverData[leverCounter - 1].UnitOfMeasurementControl} onChange={(e) => this.props.handleControlLeverUnitOfM(e, leverCounter) }>
                                                        <option value="PercentageQty">Percentage Qty</option>
                                                        <option value="quantity">Quantity Only</option>
                                                    </select>
                                                    }
                                                </Col>
                                                {this.props.leverData[leverCounter - 1].UnitOfMeasurementControl == "amount"?<Col sm="7" className= "amt-chk-show">
                                                    <label>Expected Gains $</label>
                                                    <input className="form-control"
                                                        value={this.props.leverData[leverCounter - 1].ExpectedGainAmount}
                                                        name="ExpectedGainAmount"
                                                        type='number' onChange={(e) => {this.handleOnChange(e, leverCounter, null, null);this.EstimatedAmountforControlHandler(leverCounter);this.props.handleEstimatedSavingsRollUp();}}  />
                                                </Col>:""}
                                                {this.props.leverData[leverCounter - 1].UnitOfMeasurementControl == "percent"?
                                                <><Col md="3" className="p-0 per-chk-show">
                                                    <label>Historical Gains $</label>
                                                    <input type="number" className="form-control"
                                                        value={this.props.leverData[leverCounter - 1].HistoricalGainAmount}
                                                        name="HistoricalGainAmount"
                                                        onChange={(e) => {this.handleOnChange(e, leverCounter, null, null);this.EstimatedAmountforControlHandler(leverCounter);this.props.handleEstimatedSavingsRollUp();}}/>
                                                </Col>
                                                <Col md="4" className="per-chk-show">
                                                    <label>Expected Gains %</label>
                                                    <input type="number" className="form-control"
                                                        value={this.props.leverData[leverCounter - 1].ExpectedGainPercentage}
                                                        name="ExpectedGainPercentage"
                                                        min="0" max="100"
                                                        onChange={(e) => {this.handleOnChange(e, leverCounter, null, null);this.EstimatedAmountforControlHandler(leverCounter);this.props.handleEstimatedSavingsRollUp();}}  />
                                                </Col></>:""}
                                                {this.props.leverData[leverCounter - 1].UnitOfMeasurementControl == "quantity"?<Col sm="7" className= "amt-chk-show">
                                                    <label>Expected Quantity Gains</label>
                                                    <input className="form-control"
                                                        value={this.props.leverData[leverCounter - 1].ExpectedTargetGrowthQty?this.props.leverData[leverCounter - 1].ExpectedTargetGrowthQty:""}
                                                        name="ExpectedTargetGrowthQty"
                                                        type='number' onChange={(e) => this.handleOnChange(e, leverCounter, null, null)}  />
                                                </Col>:""}
                                                {this.props.leverData[leverCounter - 1].UnitOfMeasurementControl == "PercentageQty"?
                                                <><Col md="3" className="p-0 per-chk-show">
                                                    <label>Historical Quantity Gains</label>
                                                    <input type="number" className="form-control"
                                                        value={this.props.leverData[leverCounter - 1].HistoricalQtyAchived?this.props.leverData[leverCounter - 1].HistoricalQtyAchived:""}
                                                        name="HistoricalQtyAchived"
                                                        onChange={(e) => this.handleOnChange(e, leverCounter, null, null)}/>
                                                </Col>
                                                <Col md="4" className="per-chk-show">
                                                    <label>Expected Quantity Gains %</label>
                                                    <input type="number" className="form-control"
                                                        vale={this.props.leverData[leverCounter - 1].ExpectedTargetQtyGrowthPercent?this.props.leverData[leverCounter - 1].ExpectedTargetQtyGrowthPercent:""}
                                                        name="ExpectedTargetQtyGrowthPercent"
                                                        min="0" max="100"
                                                        onChange={(e) => this.handleOnChange(e, leverCounter, null, null)}  />
                                                </Col></>:""}
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="form-group drop-form-control">
                                        <Row>
                                            <Col md="4">
                                                <label>Improvement Basis</label>
                                                <select name="ImprovementBasisControl"
                                                    value={this.props.leverData[leverCounter - 1].ImprovementBasisControl || ""}
                                                    onChange={(e) => { this.handleOnChange(e, leverCounter, null, null); this.props.handleEstimatedSavingsRollUp(); }} className="form-control">
                                                    <option></option>
                                                    {improvement_basis}
                                                </select>
                                            </Col>
                                            <Col md="4" p="0">
                                                <label>Control Lever Target Date</label>
                                                <div className="d-flex mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <i className="fas fa-calendar-alt"></i>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        className="form-control textbox-control dateControl-class"
                                                        selected={new Date(z[2], (z[0]) - 1, z[1])}
                                                        onChange={(date) => this.handleTargetDateChange(date, leverCounter)}
                                                    />
                                                </div>
                                            </Col>
                                            {(this.props.leverData[leverCounter - 1].UnitOfMeasurementControl == "percent")?
                                            <Col md="4">
                                                <label>Expected Savings {(this.props.leverData[leverCounter - 1].ImprovementBasisControl != null)?'per '+this.props.leverData[leverCounter - 1].ImprovementBasisControl:''} $</label>
                                                <input type="text" readOnly className="form-control"
                                                    value={this.props.leverData[leverCounter - 1].ExpectedSavingsAmount}
                                                    name="ExpectedSavingsAmount"
                                                    onChange={(e) => { this.props.handleEstimatedSavingsRollUp(); }} />
                                            </Col>:""}
                                        </Row>
                                    </div>
                                    <div className={(this.props.leverData[leverCounter - 1].UnitOfMeasurementControl == "percent" || this.props.leverData[leverCounter - 1].UnitOfMeasurementControl == "PercentageQty") ? "form-group mb-0" : "per-chk-hide"} >
                                        <label className="w-100"><span className="badge badge-warning d-block text-left pb-3 pt-3 mt-0">Estimated Annual % Gains - {this.estimatedAnnualPercentGainCal(this.props.leverData[leverCounter - 1].ExpectedGainPercentage?this.props.leverData[leverCounter - 1].ExpectedGainPercentage:this.props.leverData[leverCounter - 1].ExpectedTargetQtyGrowthPercent, this.props.leverData[leverCounter - 1].ImprovementBasisControl)}</span></label>
                                    </div>
                                    {(this.props.leverData[leverCounter - 1].UnitOfMeasurementControl == "percent" || this.props.leverData[leverCounter - 1].UnitOfMeasurementControl == "amount")?
                                    <div className="form-group mb-0">
                                        <label className="w-100">
                                            <span className="badge badge-warning d-block text-left pb-3 pt-3 mt-0">Estimated Annual Savings -  {(this.props.leverData[leverCounter - 1] !== undefined) ? ((this.props.leverData[leverCounter - 1].EstimatedAnnualSavingsAmountControl) ? this.props.leverData[leverCounter - 1].EstimatedAnnualSavingsAmountControl : 0) : 0}</span>
                                        </label>
                                    </div>:""}
                                    <div className="form-group drop-form-control">
                                        <Row>
                                            <Col md="5">
                                                <label>Persona Impacted</label>
                                                <div className="pos-rel-custom">
                                                    <Input type="text" name='PersonaImpactedControlLever'
                                                        value={this.props.leverData[leverCounter - 1].PersonaImpactedControlLever}
                                                        onChange={(e) => this.props.handleOnChange(e, leverCounter, null, null)}
                                                        onBlur={(e) => e.target.placeholder = 'Plant Manager / Maintenance Manager'}
                                                        onFocus={(e) => e.target.placeholder = ''} placeholder="Plant Manager" />
                                                    <div className="pos-ab-class-arrow"></div>
                                                </div>
                                            </Col>
                                            <Col md="1" className="pl-0">
                                                <label className="w-100">&nbsp;</label>
                                                <button className="button-add-search" onClick={this.handlePersonaModalCL}><img src={require('../../../common/images/search-add.png')} /></button>
                                            </Col>
                                             <ModalPopup isOpen={this.state.personaModalCL} onSave={()=>this.personaSaveCL(leverCounter)} toggle={this.togglePersonaModalCL.bind(this)} title="Persona Impacted" className="capability_modeling modal-lg" footer={true} saveBtnTitle={"SELECT"} disabled={false} >
                                                <div className="modal-body">
                                                    <div className="table-responsive popup-table">
                                                        <table className="table table-striped mb-0">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ width: "8%" }}></th>
                                                                    <th style={{ width: "30%" }}>Name</th>
                                                                    <th style={{ width: "62%" }}>Description</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {personaList}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </ModalPopup>
                                            <Col sm="6">
                                                <label>Audit Frequency</label>
                                                <select name="AuditFrequencyControl"
                                                    className="form-control"
                                                    value={this.props.leverData[leverCounter - 1].AuditFrequencyControl || ""}
                                                    onChange={(e) => this.handleOnChange(e, leverCounter, null, null)}>
                                                    <option></option>
                                                    {audit_frequency}
                                                </select>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="form-group">
                                        <div className="form-group mb-0">
                                            <label className="w-100"><span className="badge badge-warning d-block text-left pb-3 pt-3 mt-0">Inhibitor/Risk</span></label>
                                        </div>
                                        {dynamicInhibitors}
                                    </div>
                                    <div className="form-group">
                                        <a style={{cursor: 'pointer'}} onClick={(e) => this.props.handleAddInhibitor(leverCounter)} class="add-new-btn"><i class="fas fa-plus mr-2" aria-hidden="true"></i> <span>Add Risk</span></a>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-group mb-0">
                                            <label className="w-100"><span className="badge badge-info d-block text-left pb-3 pt-3">Necessary Capabilities</span></label>
                                        </div>
                                        {dynamicCapabilities}
                                    </div>
                                    <div className="form-group">
                                        <a style={{cursor: 'pointer'}} onClick={(e) => this.props.handleAddCapability(leverCounter)} class="add-new-btn"><i class="fas fa-plus mr-2" aria-hidden="true"></i> <span>Add Capability</span></a>
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

Create.propTypes = {
    errors: PropTypes.object.isRequired,
    getimprovement_basis: PropTypes.func.isRequired,
    getaudit_frequency: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    errors: state.errors,
    measurement: state.kpiData.measurement,
    frequency: state.kpiData.frequency,
    improvement_basis: state.kpiData.improvement_basis,
    uom: state.kpiData.uom,
    uem: state.kpiData.uem,
});
export default connect(mapStateToProps, { })(Create);