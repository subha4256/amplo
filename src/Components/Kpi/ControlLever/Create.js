import React, { Component } from "react";
import {Input,Button, Row, Col} from 'reactstrap';
import DatePicker from "react-datepicker";
import moment from 'moment';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import {responseMessage} from '../../../utils/alert';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getaudit_frequency, getimprovement_basis } from '../../../actions/kpiActions';
const config = require('../../../config');
class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            measurement:[],
            riskCost:0,
            frequency1:[],
            improvement_basis:[],
            inhibitors: [{
                id: "",
                value: "",
                Probability: "",
            }],
            capabilities: [{
                id: "",
                value: "",
                InvestmentRequired: 1,
                capex: "",
                opex: ""
            }]
        }
    }

    handleTargetDateChange(date, leverCounter) {
        const eObj = {
            target: {
                name: "target_date",
                value: moment(date).format("YYYY-MM-DD")
            }
        }
        //console.log(eObj);
        this.setState({
            ['target_date'+leverCounter]: date
        }, function() {
            this.props.handleOnChange(eObj, leverCounter, null, null);
        })
    }

    handleExpectedByChange(date, leverCounter, key) {
        //console.log(moment(date).format("YYYY-MM-DD"))
        //console.log((moment(this.state['target_date'+leverCounter]).format("YYYY-MM-DD")))
        if(((moment(date).format("YYYY-MM-DD")))<(moment(this.state['target_date'+leverCounter]).format("YYYY-MM-DD"))){
        const eObj = {
            target: {
                name: "ExpectedBy",
                value: moment(date).format("YYYY-MM-DD")
            }
        }
        this.setState({
            ['ExpectedBy'+leverCounter+key]: date
        }, function() {
            this.props.handleOnChange(eObj, leverCounter, 'capabilities', key);
        })
        this.props.handleOnChange(eObj, leverCounter, 'capabilities', key);
    }
        else{
            responseMessage("warning", "You can't select expected date more than target date", "");
            const eObj = {
            target: {
                name: "ExpectedBy",
                value: moment(this.state['target_date'+leverCounter]).format("YYYY-MM-DD")
            }
        }
        this.setState({
            ['ExpectedBy'+leverCounter+key]: this.state['target_date'+leverCounter]
        }, function() {
            this.props.handleOnChange(eObj, leverCounter, 'capabilities', key);
        })
        this.props.handleOnChange(eObj, leverCounter, 'capabilities', key);
        }
    }
    componentDidMount() {
        this.props.getimprovement_basis();
        this.props.getaudit_frequency();
        //this.props.getmeasurement();
    }
   
    handleAddInhibitor(e) {
        e.preventDefault();
        let inhibitors = this.state.inhibitors;
        inhibitors.push({
            id: "",
            value: "",
            Probability: ""
        });
        this.setState({
            inhibitors: inhibitors
        });
    }

    handleAddCapability(e) {
        e.preventDefault();
        let capabilities = this.state.capabilities;
        capabilities.push({
            id: "",
            value: "",
            capex: "",
            opex: ""
        });
        this.setState({
            capabilities: capabilities
        });
    }
    riskcostHandler(key, leverCounter){
        let pb=document.getElementById("Probability"+leverCounter+key).value;
        let ic=document.getElementById("ImpactCost"+leverCounter+key).value;
        console.log(pb);
        if(pb!== undefined && ic !== undefined){
            let icost=parseInt((ic).replace('$',''));
            let prob = parseInt((pb).replace('%',''));
            let riskCost = ((icost*prob)/100);
            if(riskCost != NaN){
                document.getElementById("riskCost"+leverCounter+key).innerHTML = "$"+riskCost;
            }else{
                document.getElementById("riskCost"+leverCounter+key).innerHTML = "";
            }
            // this.setState({
            //     [riskCost+leverCounter+key]: riskCost
            // })

        }
    }
    deleteInhibitor(leverCounter, inhibitorIndex) {
        let inhibitors = this.state.inhibitors;
        delete inhibitors[inhibitorIndex];
        this.setState({
            inhibitors: inhibitors
        });
        this.props.deleteInhibitor(leverCounter, inhibitorIndex);
    }

    deleteCapability(leverCounter, capabilityIndex) {
        let capabilities = this.state.capabilities;
        delete capabilities[capabilityIndex];
        this.setState({
            capabilities: capabilities
        });
        this.props.deleteCapability(leverCounter, capabilityIndex);
    }

    deleteLever(e, index){
        this.props.deleteLever( e, index )
    }

    handleOnChange(e, leverCounter, parameter, key) {
        console.log( leverCounter, parameter, key);
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
        let unit_of_measurement = this.getmeasurementFromStore();
        let audit_frequency = this.getauditfrequencyFromStore()
        let improvement_basis = this.getimprovementbasisFromStore();
        const {leverCounter} = this.props;
        const { inhibitors, capabilities } = this.state;
        let dynamicInhibitors = inhibitors.map((inhibitor, key) => {
            return (
                <div key={'inhibitor-'+key}>
                    <div className="delete-field">
                        <Input type="text" onBlur={(e) => e.target.placeholder = 'Lorem ipsum dolor sit amet'} onFocus={(e) => e.target.placeholder = ''} placeholder="Lorem ipsum dolor sit amet" name={'inhibitor'} defaultValue={inhibitor.value} onChange={(e) => this.handleOnChange(e, leverCounter, 'inhibitors', key)} />
                        <button type="button" className="btn" onClick={this.deleteInhibitor.bind(this, leverCounter, key)}><i className="fas fa-trash-alt"></i></button>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col sm="6">
                                <label>Probability %</label>
                                <Input name="Probability" type="text" id={"Probability"+leverCounter+key} onFocus={(e)=>{e.target.value=e.target.value.replace('%','')}}
                                onBlur={(e)=>{e.target.value=e.target.value+"%"}} onChange={(e)=>{
                                    if(parseInt((e.target.value).replace('%',''))>=0 && parseInt((e.target.value).replace('%',''))<= 100){e.target.value=e.target.value}else{e.target.value=""}}} onKeyUp={(e) => {if(parseInt(e.target.value)>=0 && parseInt(e.target.value)<= 100 ){this.handleOnChange(e, leverCounter, 'inhibitors', key);this.props.handleEstimatedSavingsRollUp(); this.riskcostHandler(key, leverCounter); }}} />
                            </Col>
                            <Col sm="6">
                                <label>Impact Cost</label>
                                <Input name="ImpactCost" id={"ImpactCost"+leverCounter+key} onFocus={(e)=>{e.target.value=e.target.value.replace('$','')}}
                                 onBlur={(e)=>{e.target.value="$"+parseInt(e.target.value).toFixed(2)}} onKeyUp={(e) => {this.handleOnChange(e, leverCounter, 'inhibitors', key);this.props.handleEstimatedSavingsRollUp(); this.riskcostHandler(key, leverCounter);}}/>
                            </Col>
                            <Col sm="12"><p className="text-muted mb-0"><small>Based on the above value the risk cost will be <span id={"riskCost"+leverCounter+key}></span></small></p></Col>
                        </Row>
                    </div>
                </div>
            )
        })
        let x=((moment(this.state['target_date'+leverCounter]).format("MM/DD/YYYY")).split('/'));
        let dynamicCapabilities = capabilities.map((capability, key) => {
            return (
                <div key={'capability-'+key}>
                    <div className="delete-field">
                        <Input type="text" onBlur={(e) => e.target.placeholder = 'Lorem ipsum dolor sit amet'} onFocus={(e) => e.target.placeholder = ''} placeholder="Lorem ipsum dolor sit amet" name={'capability'} defaultValue={capability.value} onChange={(e) => this.props.handleOnChange(e, leverCounter, 'capabilities', key)} />
                        <button type="button" className="btn" onClick={this.deleteCapability.bind(this, leverCounter, key)}><i className="fas fa-trash-alt"></i></button>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col sm="6">
                                <label>CAPEX $</label>
                                <Input name="capex" onFocus={(e)=>{e.target.value=e.target.value.replace('$','')}}
                                 onBlur={(e)=>{e.target.value="$"+parseInt(e.target.value).toFixed(2)}}
                                onKeyUp={(e) => {this.handleOnChange(e, leverCounter, 'capabilities', key);this.props.handleEstimatedSavingsRollUp();}}  />
                            </Col>
                            <Col sm="6">
                                <label>CAPEX SPREAD YEARS</label>
                                <Input name="CapexSpreadYears" type="number" onKeyUp={(e) => {this.handleOnChange(e, leverCounter, 'capabilities', key);this.props.handleEstimatedSavingsRollUp();}} />
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
                                        maxDate={new Date(x[2], (x[0])-1, x[1])}
                                        className="form-control textbox-control dateControl-class"
                                        selected={this.state['ExpectedBy'+leverCounter+key] ? this.state['ExpectedBy'+leverCounter+key] : new Date()}
                                        onChange={(date) => this.handleExpectedByChange(date, leverCounter, key)}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="6">
                                <label>OPEX $</label>
                                <Input name="opex" onFocus={(e)=>{e.target.value=e.target.value.replace('$','')}}
                                 onBlur={(e)=>{e.target.value="$"+parseInt(e.target.value).toFixed(2)}}
                                onKeyUp={(e) => {this.handleOnChange(e, leverCounter, 'capabilities', key);this.props.handleEstimatedSavingsRollUp();}} />
                            </Col>
                            <Col sm="6">
                                <label>Frequency</label>
                                
                                    <select name="frequency" className="form-control" onChange={(e) => this.handleFrequencyChange(e, leverCounter, 'capabilities', key)}>
                                        {/* <option value="monthly">Monthly</option>
                                        <option value="quaterly">Quaterly</option>
                                        <option value="yearly">Yearly</option> */}
                                        <option></option>
                                        {audit_frequency}
                                    </select>
                            </Col>
                            </Row>
                    </div>
                </div>
            )
        })
        if(this.props.leverData[leverCounter]) {
            //console.log(this.props.leverData[leverCounter].estimated_saving);
        }
        return (
            <>
                {/* <div className="kpi-heading">
                    <h2>Control Levers</h2>
                </div> */}
               
                <div className="bg-white newkpi-form mb-4">
                    <a href="#" className="float-right" onClick={(e)=>{this.deleteLever( e, leverCounter )}}>Delete</a>
                    <div className="control-lever">
                        <div className="form-group">
                            <label>Control Lever #{this.props.leverCounter}</label>
                            <Input type="text" name='ControlLever' onChange={(e) => this.props.handleOnChange(e, leverCounter, null, null)} onBlur={(e) => e.target.placeholder = 'Decrease equipment downtime'} onFocus={(e) => e.target.placeholder = ''} placeholder="Decrease equipment downtime" />
                        </div>
                        <div className="form-group">
                            <label>Business Metrics</label>
                            <Input type="text" name="business_metrics" onChange={(e) => this.handleOnChange(e, leverCounter, null, null)} onBlur={(e) => e.target.placeholder = 'XXXXX XXX'} onFocus={(e) => e.target.placeholder = ''} placeholder="XXXXX XXX" />
                        </div>
                        <div className="form-group">
                            <Row>
                                <Col sm="6">
                                    <label>Expected Gains</label>
                                    {/* <select name="target_growth" onChange={(e) => this.handleOnChange(e, leverCounter, null, null)} className="form-control">
                                        <option value="1-5">1-5%</option>
                                    </select> */}
                                    <input className="form-control" name="expected_gains" type='number' onKeyUp={(e) => {this.handleOnChange(e, leverCounter, null, null); this.props.handleEstimatedSavingsRollUp();}} />
                                </Col>
                                <Col sm="6">
                                    <label>Unit of Measurement</label>
                                    <select name="measurement_unit" onChange={(e) => this.handleOnChange(e, leverCounter, null, null)} className="form-control">
                                        {/* <option value="percentage">Percentage</option>
                                        <option value="number">Number</option> */}
                                        <option></option>
                                        {unit_of_measurement}
                                    </select>
                                </Col>
                            </Row>
                        </div>
                        <div className="form-group">
                            <Row>
                            <Col sm="6">
                                    <label>Improvement Basis</label>
                                    <select name="improvement_basis1" onChange={(e) => {this.handleOnChange(e, leverCounter, null, null); this.props.handleEstimatedSavingsRollUp();}} className="form-control">
                                        {/* <option value="per_year">Per year</option>
                                        <option value="per_quater">Per Quater</option>
                                        <option value="per_month">Per Month</option> */}
                                        <option></option>
                                        {improvement_basis}
                                    </select>
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
                                            selected={this.state['target_date'+leverCounter] ? this.state['target_date'+leverCounter] : new Date()}
                                            onChange={(date) => this.handleTargetDateChange(date, leverCounter)}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="form-group">
                            <label>Estimated Annual Savings $</label>
                            <p className="badge badge-warning">{(this.props.leverData[leverCounter - 1] !== undefined) ?((this.props.leverData[leverCounter - 1].estimated_annual_saving1 ) ? this.props.leverData[leverCounter - 1].estimated_annual_saving1 : 0): 0}</p>
                        </div>
                        <div className="form-group">
                            <label>Persona Impacted</label>
                            <Input type="text" name='PersonaImpacted' onChange={(e) => this.props.handleOnChange(e, leverCounter, null, null)} onBlur={(e) => e.target.placeholder = 'Plant Manager / Maintenance Manager'} onFocus={(e) => e.target.placeholder = ''} placeholder="Plant Manager / Maintenance Manager" />
                        </div>
                        <div className="form-group">
                            <label>Audit Frequency</label>
                            <select name="audit_frequency" className="form-control" onChange={(e) => this.handleOnChange(e, leverCounter, null, null)}>
                                {/* <option value="monthly">Monthly</option>
                                <option value="quaterly">Quaterly</option>
                                <option value="yearly">Yearly</option> */}
                                <option></option>
                                {audit_frequency}
                            </select>
                        </div>
                        <div className="form-group">
                            <label><span className="badge badge-warning">Inhibitors</span></label>
                            {dynamicInhibitors}
                        </div>
                        <div className="form-group">
                            <a href="#" onClick={(e) => this.handleAddInhibitor(e)}>Add Inhibitor</a>
                        </div>
                        <div className="form-group">
                            <label><span className="badge badge-info">Necessary Capabilities</span></label>
                            { dynamicCapabilities }
                        </div>
                        <div className="form-group">
                            <a href="#" onClick={(e) => this.handleAddCapability(e)}>Add Capability</a>
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
    frequency: state.kpiData.frequency,
    improvement_basis: state.kpiData.improvement_basis,

});
export default connect(mapStateToProps, { getaudit_frequency, getimprovement_basis })(Create);