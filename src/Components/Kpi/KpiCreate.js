import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Input, Button } from 'reactstrap';
import { addKpi, getaudit_frequency, getimprovement_basis } from '../../actions/kpiActions';
import CreateControlLever from './ControlLever/Create';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import {Global} from '../../utils/Env';
const config = require('../../config');
class KpiCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controlLevers: [],
            kpiSetId:0,
            leverCounter: 0,
            KPITitle: "",
            business_outcome: "",
            business_metrics: "",
            target_date: new Date(),
            persona_impacted: "",
            estimated_saving: "",
            estimated_target_growth: "",
            errors: {},
            measurement:[],
            frequency:{},
            improvement_basis:[],
            leverData: [{
                target_date: moment(new Date()).format("YYYY-MM-DD"),
                inhibitors: [],
                capabilities: []
            }]
        }
        
        this.setup();
        
    }

    setup(){
        Global.callback.addKpi_onComplete = () => {
            console.log('addKpi_onComplete')
            this.props.history.push("/kpi-setting/"+this.state.kpiSetId)
        }
    }

    componentWillReceiveProps(nextProps, prevProps) {
        if (nextProps.errors && Object.keys(nextProps.errors).length > 0 && this.props.errors !== nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }

        if(nextProps !== prevProps){
            this.setState({
                kpiSetId:nextProps.setId
            }, ()=>{})
        }
    }
    componentDidMount() {
        this.props.getimprovement_basis();
        this.props.getaudit_frequency();
        //this.props.getmeasurement();
    }
    
    handleTargetDateChange(date) {
        this.setState({
            target_date: date
        })
    }

    handleOnChange(e, leverCounter, parameter, parameterKey) {        
        if (leverCounter) {
            let leverData = this.state.leverData;
            if (!leverData[leverCounter - 1]) {
                leverData[leverCounter - 1] = {
                    inhibitors: [],
                    capabilities: []
                }
            }
            if (parameter) {
                if (!leverData[leverCounter - 1][parameter][parameterKey]) {
                    leverData[leverCounter - 1][parameter][parameterKey] = {
                        [e.target.name]: e.target.value
                    }
                } else {
                    leverData[leverCounter - 1][parameter][parameterKey][e.target.name] = e.target.value;
                }
            } else {
                leverData[leverCounter - 1][e.target.name] = e.target.value;
            }
            this.setState({
                leverData: leverData
            });
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }

    deleteInhibitor(leverCounter, inhibitorIndex) {
        let leverData = this.state.leverData;
        if(leverData) {
            delete (leverData[leverCounter - 1].inhibitors[inhibitorIndex]);
            this.setState({
                leverData: leverData
            });
        }
    }

    deleteCapability(leverCounter, capabilityIndex) {
        let leverData = this.state.newLeverData;
        if(leverData) {
            delete (leverData[leverCounter - 1].capabilities[capabilityIndex]);
            this.setState({
                newLeverData: leverData
            });
        }
    }

    addControlLever(e) {
        e.preventDefault();
        let leverCounter = this.state.leverCounter;
        leverCounter = leverCounter + 1;
        let controlLevers = this.state.controlLevers;
        controlLevers.push({
            leverCounter: leverCounter
        });
        this.setState({
            controlLevers: controlLevers,
            leverCounter: leverCounter
        });
    }
    deleteLever(e, index) {
        e.preventDefault();
        const levers = this.state.controlLevers;
        delete levers[index - 1];
        this.setState({
            controlLevers: levers
        })
    }
    saveKpiData() {
        let kpiObj = {
            KPITitle: this.state.KPITitle,
            kpiSetId:this.state.kpiSetId,
            business_metrics: this.state.business_metrics,
            business_outcome: this.state.business_outcome,
            persona_impacted: this.state.persona_impacted,
            estimated_saving: this.state.estimated_saving,
            estimated_target_growth: this.state.estimated_target_growth,
            measurement_unit: this.state.measurement_unit,
            improvement_basis1: this.state.improvement_basis1,
            target_date:this.state.target_date,
            audit_frequency:this.state.audit_frequency,
            leverData: this.state.leverData
        }

        

        this.props.addKpi(kpiObj);
    }
    handleTargetDateRollUp(){
        let leverData = this.state.leverData;
        let targetDate = this.state.target_date;
        for(let i in leverData) {
            if(targetDate != ""){
                //let findIndex = leverData[i].target_date.indexOf('-');
                //if(findIndex > -1){
                    let getSplitLeverDate = leverData[i].target_date.split('-');
                    let getLeverDate = new Date(getSplitLeverDate[0], Number(getSplitLeverDate[1])-1, getSplitLeverDate[2]);

                    if(getLeverDate > targetDate){
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
            target_date: targetDate
        })
    }
    handleClickEstimatedSavingsRollUp() {
        let estimated_saving = 0;
        let leverData = this.state.leverData;
        for(let i in leverData) {
            estimated_saving += Number(leverData[i].estimated_annual_saving);
        }
        this.setState({
            estimated_saving: estimated_saving.toLocaleString()
        });
    }
    handleEstimatedSavingsRollUp() {
        let estimated_saving = 0;
        let frequencyConversion = 1;
        let leverData = this.state.leverData;
        //console.log(leverData)
        for(let i in leverData) {
            let inhibitorCosts = 0;
            let capabilityCosts = 0;
            let opexCosts = 0;
            let capexCosts = 0;
            let expectedGain = 0;
            let auditFrequency = 0;
            switch(leverData[i].improvement_basis1) {
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
            if(auditFrequency != 0){
                expectedGain = (leverData[i].expected_gains / auditFrequency) * 8760;
                console.log(leverData[i].inhibitors);
                for(let j in leverData[i].inhibitors) {
                    let getImpactCosts = "";     
                    if(leverData[i].inhibitors[j].Probability != 'undefined'){
                        let probability = this.state.leverData[i].inhibitors[j].Probability.replace('%','');
                        if ("ImpactCost" in this.state.leverData[i].inhibitors[j]){
                            getImpactCosts = this.state.leverData[i].inhibitors[j].ImpactCost.replace('$');
                        }
                        if(probability && parseInt(probability) > 0 && getImpactCosts != "") {
                            inhibitorCosts = inhibitorCosts + (parseFloat(probability/100) * getImpactCosts);
                        }
                        console.log(inhibitorCosts);
                    }
                }
                
                for(let k in leverData[i].capabilities) {
                    console.log(leverData[i].capabilities);
                    switch(leverData[i].capabilities[k].frequency) {
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
                    if(frequencyConversion != 0){  
                        let getCapexCosts = "";  
                        let getOpexCosts = "";                      
                        if(this.state.leverData[i].capabilities[k].capex && this.state.leverData[i].capabilities[k].CapexSpreadYears && this.state.leverData[i].capabilities[k].CapexSpreadYears > 0) {
                            if ("capex" in this.state.leverData[i].capabilities[k]){
                                getCapexCosts = this.state.leverData[i].capabilities[k].capex.replace('$');
                            } 
                            if ("opex" in this.state.leverData[i].capabilities[k]){
                                getOpexCosts = this.state.leverData[i].capabilities[k].opex.replace('$');
                            }  
                            capexCosts = capexCosts + parseFloat(getCapexCosts/this.state.leverData[i].capabilities[k].CapexSpreadYears);
                            opexCosts = opexCosts + (parseFloat(getOpexCosts/frequencyConversion) * 8760);
                            capabilityCosts = capabilityCosts + capexCosts + opexCosts;
                        }
                    }
                }
                //console.log(capabilityCosts);
                if(parseInt(expectedGain) > 0) {
                    let estimatedAnnualSaving = Number(expectedGain) - Number(inhibitorCosts) - Number(capabilityCosts);
                    leverData[i].estimated_annual_saving = estimatedAnnualSaving;
                    leverData[i].estimated_annual_saving1 = estimatedAnnualSaving.toLocaleString();
                }
                console.log(estimated_saving);
            }
            
        }
        console.log(estimated_saving);
        if(this.state.leverData !== leverData) {
            this.setState({leverData});
        }
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
        const { errors } = this.state;
        let controlLevers = this.state.controlLevers.map((controlLever, key) => {
            return <CreateControlLever key={'controlLever-'+key} deleteLever={this.deleteLever.bind(this)} leverCounter={controlLever.leverCounter} handleOnChange={this.handleOnChange.bind(this)} leverData={this.state.leverData} deleteInhibitor={this.deleteInhibitor.bind(this)} deleteCapability={this.deleteCapability.bind(this)} handleEstimatedSavingsRollUp={this.handleEstimatedSavingsRollUp.bind(this)} />;
        });
        let unit_of_measurement = this.getmeasurementFromStore();
        let audit_frequency = this.getauditfrequencyFromStore()
        let improvement_basis = this.getimprovementbasisFromStore();
        return (
            <Row>
                <Col sm="12" md="9" lg="7" className="new-kpi-col">
                    <div className="kpi-heading d-sm-flex justify-content-between">
                        <h2>Add New KPI</h2>
                        <div className="kpi-btn">
                            <Link to={"/kpi-setting/"+this.state.kpiSetId}>Cancel</Link>
                            <Button color="primary" onClick={this.saveKpiData.bind(this)}>SAVE KPI</Button>
                        </div>
                    </div>
                    <div className="bg-white newkpi-form">
                        <div className="form-group">
                            <label>Kpi Title</label>
                            <Input type="text" name="KPITitle" onChange={(e) => this.handleOnChange(e, null, null, null)} />
                            {Object.keys(errors).length > 0 && errors.data && errors.data.KPITitle ? <p className="text-danger">{errors.data.KPITitle[0]}</p> : <></>}
                        </div>
                        <div className="form-group">
                            <label>Business Outcome</label>
                            <Input type="text" name="business_outcome" onChange={(e) => this.handleOnChange(e, null, null, null)} onBlur={(e) => e.target.placeholder = 'Reduce Energy, Water and Waste costs by 1% to 2%'} onFocus={(e) => e.target.placeholder = ''} placeholder="Reduce Energy, Water and Waste costs by 1% to 2%" />
                            {Object.keys(errors).length > 0 && errors.data && errors.data.business_outcome ? <p className="text-danger">{errors.data.business_outcome[0]}</p> : <></>}
                        </div>
                        <div className="form-group">
                            <label>Business Metrics</label>
                            <Input type="text" name="business_metrics" onChange={(e) => this.handleOnChange(e, null, null, null)} onBlur={(e) => e.target.placeholder = 'XXXXX XXX'} onFocus={(e) => e.target.placeholder = ''} placeholder="XXXXX XXX" />
                            {Object.keys(errors).length > 0 && errors.data && errors.data.business_metrics ? <p className="text-danger">{errors.data.business_metrics[0]}</p> : <></>}
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col sm="6">
                                    <label>Expected Target Growth</label>
                                    {/* <select name="target_growth" onChange={(e) => this.handleOnChange(e, null, null, null)} className="form-control">
<option value="10-20">10-20%</option>
</select> */}
                                    <input className="form-control" name="estimated_target_growth" type='number' onChange={(e) => this.handleOnChange(e, null, null, null)} />
                                    {Object.keys(errors).length > 0 && errors.data && errors.data.target_growth ? <p className="text-danger">{errors.data.target_growth[0]}</p> : <></>}
                                </Col>
                                <Col sm="6">
                                    <label>Unit of Measurement</label>
                                    <select name="measurement_unit" onChange={(e) => this.handleOnChange(e, null, null, null)} className="form-control">
                                        {/* <option value="percentage">Percentage</option>
                                        <option value="number">Number</option> */}
                                        <option></option>
                                        {unit_of_measurement}
                                    </select>
                                    {Object.keys(errors).length > 0 && errors.data && errors.data.measurement_unit ? <p className="text-danger">{errors.data.measurement_unit[0]}</p> : <></>}
                                </Col>
                            </Row>
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col sm="6">
                                    <label>Improvement Basis</label>
                                    <select name="improvement_basis1" onChange={(e) => this.handleOnChange(e, null, null, null)} className="form-control">
                                        {/* <option value="per_year">Per year</option>
                                        <option value="per_quater">Per Quater</option>
                                        <option value="per_month">Per Month</option> */}
                                        <option></option>
                                        {improvement_basis}
                                    </select>
                                    {Object.keys(errors).length > 0 && errors.data && errors.data.improvement_basis ? <p className="text-danger">{errors.data.improvement_basis[0]}</p> : <></>}
                                </Col>
                                <Col sm="6">
                                    <label>Target Date</label>
                                    <div className="d-flex mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-calendar-alt"></i>
                                            </div>
                                        </div>
                                        <DatePicker
                                            className="form-control textbox-control dateControl-class"
                                            selected={this.state.target_date}
                                            onChange={(date) => this.handleTargetDateChange(date)}
                                        />
                                        <Button color="primary"
                                        disabled={(this.state.leverCounter > 0)? false : true }
                                         onClick={this.handleTargetDateRollUp.bind(this)}><i className="fa fa-caret-up"></i></Button>
                                    </div>
                                    <p className="text-muted float-right mb-0"><small>Clicking on the button will roll up target date</small></p>
                                    {Object.keys(errors).length > 0 && errors.data && errors.data.target_date ? <p className="text-danger">{errors.data.target_date[0]}</p> : <></>}
                                </Col>
                            </Row>
                        </div>
                        <div className="form-group">
                            <label>Estimated Annual Savings $</label>
                            <div className="d-flex">
                                <Input type="text" name="estimated_saving" value={this.state.estimated_saving} onChange={(e) => this.handleOnChange(e, null, null, null)} className="w-90" />
                                <Button color="primary" className="ml-auto" 
                                disabled={(this.state.leverCounter > 0)? false : true } onClick={this.handleClickEstimatedSavingsRollUp.bind(this)}><i className="fa fa-caret-up"></i></Button>
                            </div>
                            <p className="text-muted float-right mb-0"><small>Clicking on the button will roll up estimated annual savings</small></p>
                            {Object.keys(errors).length > 0 && errors.data && errors.data.estimated_saving ? <p className="text-danger">{errors.data.estimated_saving[0]}</p> : <></>}
                        </div>
                        <div className="form-group">
                            <label>Persona Impacted</label>
                            <Input type="text" name="persona_impacted" onChange={(e) => this.handleOnChange(e, null, null, null)} onBlur={(e) => e.target.placeholder = 'VP Manufacturing, CXO'} onFocus={(e) => e.target.placeholder = ''} placeholder="VP Manufacturing, CXO" />
                            {Object.keys(errors).length > 0 && errors.data && errors.data.persona_impacted ? <p className="text-danger">{errors.data.persona_impacted[0]}</p> : <></>}
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col sm="12">
                                    <label>Audit Frequency</label>
                                    <select name="audit_frequency" className="form-control" onChange={(e) => this.handleOnChange(e, null, null, null)}>
                                        {/* <option value="monthly">Monthly</option>
                                        <option value="quaterly">Quaterly</option>
                                        <option value="yearly">Yearly</option> */}
                                        <option></option>
                                        {audit_frequency}
                                    </select>
                                    {Object.keys(errors).length > 0 && errors.data && errors.data.audit_frequency ? <p className="text-danger">{errors.data.audit_frequency[0]}</p> : <></>}
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col sm="12" md="9" lg="7" className="new-kpi-col mt-4 mb-5">
                    {controlLevers}
                    <div className="add-tab-bg">
                        <a href="#" onClick={(e) => this.addControlLever(e)}>
                            <div className="lever-icon">
                                <i className="fas fa-plus-circle"></i><br />
                                <span>Add Control lever</span>
                            </div>
                        </a>
                    </div>
                    <div className="kpi-heading d-md-flex justify-content-between">
                        <Link to={"/kpi-setting/"+this.state.kpiSetId} className="pt-2">Back</Link>
                        <div className="kpi-btn">
                        <Link to={"/kpi-setting/"+this.state.kpiSetId}>Cancel</Link>
                            <Button color="primary" onClick={this.saveKpiData.bind(this)}>SAVE KPI</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

KpiCreate.propTypes = {
    addKpi: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    getimprovement_basis: PropTypes.func.isRequired,
    getaudit_frequency: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    errors: state.errors,
    //measurement: state.kpiData.measurement,
    frequency: state.kpiData.frequency,
    improvement_basis: state.kpiData.improvement_basis,
});
export default connect(mapStateToProps, { addKpi,  getaudit_frequency, getimprovement_basis })(withRouter(KpiCreate));