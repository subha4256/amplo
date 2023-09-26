import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
//import { Row, Col, Input, Button } from 'reactstrap';
import { fetchKpis, deleteKpi, fetchKpiSetList , fetchKpiSetListForUser, saveFilterPreference, getSavedPreferences } from '../../actions/kpiActions';
import KpiSetting from "./KpiSetting";
import Slider from '@material-ui/core/Slider';
//import { KpiSettingWrapper, KpiCreateWrapper, KpiDetailWrapper } from './Styling/KpiSetting';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import moment from 'moment';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import $ from 'jquery';
import { Global } from '../../utils/Env';
import { responseMessage } from '../../utils/alert';
import ModalPopup from '../common/ModalPopup';

const config = require('../../config');
//.. Reviewed by Ashim: Need to implement LoadAPI > action-creator

class KpiList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kpis: [],
            kpiSetValue: "",
            kpiSetValues: [],
            loading: true,
            kpiSetId: this.props.match.params.kpiSetId ? this.props.match.params.kpiSetId : "global business initiative",
            value : [new Date('2016.01.01').getTime() / 1000,new Date().getTime() / 1000],
            filterSelectedPreference : "",
            filterPreferenceTitle : "",
            filterSelectedKpiSet : [],
            filterSortOrder : [],
            isAll : true,
            filterSelectedSortType : "",
            filterSelectedSortBy : "",
            isOpen : false,
            filterSortByList : [
                {
                    value : "1",
                    field : "Business Outcome Title"
                },
                {
                    value : "2",
                    field : "Business Metrics"
                },
                {
                    value : "3",
                    field : "Expected Target Growth %"
                },	
                {
                    value : "4",
                    field : "Expected Target Growth $"
                },	
                {
                    value : "5",
                    field : "Expected Target Quantity Growth %"
                },	
                {
                    value : "6",
                    field : "Expected Target Growth Quantity"
                },		
                {
                    value : "7",
                    field : "Estimated Annual Savings $"
                },		
                {
                    value : "8",
                    field : "Number of Control Levers"
                },		
                {
                    value : "9",
                    field : "Total Risk Cost"
                },		
                {
                    value : "10",
                    field : "Number of Risks(Inhibitors)"
                },		
                {
                    value : "11",
                    field : "Total CAPEX Cost"
                },		
                {
                    value : "12",
                    field : "Total OPEX Cost"
                },		
                {
                    value : "13",
                    field : "Number of CAPEX Initiatives"
                },		
                {
                    value : "14",
                    field : "Number of OPEX Expence Initiatives"
                },			
            ],
            filterSortTypeList : [
                {
                    value : "ASC",
                    title : "Low to high"
                },
                {
                    value : "DESC",
                    title : "High to Low"
                },
            ],
            filterDraggedRowSelectedInd : -1,
            fetchedFromDate : new Date().getTime() / 1000,
            fetchedToDate : new Date() / 1000,
            preferenceId : 0
        }
        Global.callback.saveFilterPreference_onComplete = (res) => {
            this.setState({preferenceId : res.data[0].KpiSearchandSortPreferenceId},()=>{
                this.props.fetchKpis("0",this.state.preferenceId)
                this.props.getSavedPreferences();
            });
        }
        Global.callback.deleteKpi_onComplete = () => {
            this.props.fetchKpis(this.state.preferenceId == 0 ? "1" : "0",this.state.preferenceId)
        }
        Global.callback.fetchKpiSetListForUser_onComplete = () => {
            this.getKpiSetValues();
        }
    }
    componentDidMount() {
        $(document).ready(function () {
            $(document).click(function (event) {
                var click = $(event.target);
                var _open = $("#collapseFilter").hasClass("show");
                if (_open === true && !click.hasClass("filterfrm") && !click.hasClass("custom-select") && !click.hasClass("form-group") && !click.hasClass("row") && !click.hasClass("form-control") && !click.hasClass("MuiSlider-root") && !click.hasClass("MuiSlider-thumb") && !click.hasClass("react-datepicker__day") && !click.hasClass("react-datepicker__day") && !click.hasClass("react-datepicker__day-name") && !click.hasClass("react-datepicker__current-month") && !click.hasClass("react-datepicker__navigation") && !click.hasClass("fa-plus") && !click.hasClass("table-responsive")  && !click.hasClass("table-bordered") && !click.hasClass("dropdown-item") && !click.hasClass("clear") && !click.hasClass("btnsave") && !click.hasClass("dontClose") && !click.is("input") && !click.is("label") && !click.is("th") && !click.is("td") && !click.is("tr") && !click.is("h3")) {
                    $(".filter-col a.btn").click();
                }
            });
        });
        this.getFilterStartEndDate();
        this.props.getSavedPreferences();
        this.props.fetchKpiSetListForUser();
        this.props.fetchKpis("1","0");
    }

    getFilterStartEndDate = async() => {
        let data  = await axios.get(config.laravelBaseUrl+`getTimeframeKpiFilter`,{
            headers: {
            "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        data = data.data.data[0];
        this.setState({
            value : [new Date(data.FromDate).getTime() / 1000,new Date(data.ToDate).getTime() / 1000],
            fetchedFromDate : new Date(data.FromDate).getTime() / 1000,
            fetchedToDate : new Date(data.ToDate) / 1000
        });
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.kpiSetId == "global business initiative" && nextProps.kpiSets.length > 0){
            let ind = nextProps.kpiSets.map(kpiSet=>kpiSet.KPISetName.toLowerCase()).indexOf("global business initiative");
            if(ind != -1){
                this.setState({
                    kpiSetId: nextProps.kpiSets[ind].KPISetID
                })
            }else{
                this.setState({
                    kpiSetId: nextProps.kpiSets[0]?nextProps.kpiSets[0].KPISetID:0
                })
            }
        }
        if (nextProps.kpis) {
            this.setState({
                kpis: nextProps.kpis,
                loading: false
            })
        }
    }
    deleteKpi(e, kpiId) {
        e.preventDefault();
        const kpiObj = {
            KPIID: kpiId
        }
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure to delete this KPI ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.props.deleteKpi(kpiObj);
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }
    getKpiSetValues() {

        if (this.props.kpiSets.length > 0) {
            let setId = "";
            if (this.state.kpiSetId === "global business initiative") {
                let kpiIndex = this.props.kpiSets.findIndex(x => x.KPISetTitle.toLowerCase() === "global business initiative")
                setId = this.props.kpiSets[kpiIndex].KPISetID
            }
            else {
                setId = this.state.kpiSetId

            }
            this.setState({
                kpiSetValues: this.props.kpiSets,
                loading: false,
                kpiSetValue: setId,
                kpiSetId: setId,
            });
            this.props.fetchKpis(this.state.preferenceId == 0 ? "1" : "0",this.state.preferenceId)
        }
    }
    kpiChangeHandler(e) {
        this.setState({
            kpiSetValue: e.target.value,
            kpiSetId: e.target.value,
            loading: true,
        })
        this.props.fetchKpis(this.state.preferenceId == 0 ? "1" : "0",this.state.preferenceId)
    }

    detailsHandler(e) {
        if (Number.isInteger(parseInt(e.target.value))) {
            return (
                <KpiSetting action={e.target.value} setId={this.state.kpiSetValue} />
            )
        } else {
            return ("")
        }
    }
    currencyCoverter(labelValue) {
        labelValue = Math.floor(parseInt(labelValue));
        if (labelValue > 0) {
            if ((Number.isInteger(parseInt(labelValue)))) {
                // Nine Zeroes for Billions
                
                return Math.abs(Number(labelValue)) >= 1.0e+9

                    ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
                    // Six Zeroes for Millions 
                    : Math.abs(Number(labelValue)) >= 1.0e+6

                        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
                        // Three Zeroes for Thousands
                        : Math.abs(Number(labelValue)) >= 1.0e+3

                            ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

                            : (Math.abs(Number(labelValue)));
            }
            else { return ("0") }
        } else {
            return ("0");
        }
        //tEST
    }

    ExpectedTargetGrowthConverter(val) {
        if (val !== null && val != "" && val !== undefined) {
            return val.toLocaleString()
        }
        else {
            return 0
        }
    }
    ImprovementbasisConverter(val) {
        if (val !== null && val != "" && val !== undefined) {
            return val;
        }
        else {
            return ""
        }
    }
    EstimatedSavingsvalidator(val) {
        let value = this.currencyCoverter(val);
        if (value != 'NaNM') {
            return value;
        } else {
            return "0";
        }
        // if(val !== null && val !== "" && val!== undefined){
        //     if(!isNaN(parseInt(val)))
        //     {return(this.currencyCoverter(val))}else {
        //         return ("0M")
        //     }
        // }else {
        //     return ("0M")
        // }
    }
    UnitOfMeasurementConverter1(val) {
        if (val !== null && val !== "" && val !== undefined) {
            if (val === "amount") {
                return "$"
            } else {
                return ""
            }
        } else {
            return ""
        }
    }
    UnitOfMeasurementConverter2(val) {
        if (val !== null && val !== "" && val !== undefined && val !== "amount") {
            if (val === "%" || val === "percent") {
                return "%"
            } else {
                return ""
            }
        } else {
            return ""
        }
    }

    showKpiList() {
        let kpiSetList = [];
        if ((this.props.kpiSets).length > 0) {
            kpiSetList = this.props.kpiSets.map(data => {
                if(data.DisableStatus != "Disabled"){
                 return (<option key={"Id" + data.KPISetID} value={data.KPISetID}>{data.KPISetTitle}</option>)
                }
            })
        }
        return kpiSetList
    }

    showKpiListDetails(){
        let kpiItem = []
        let expTargetGrowthJXS = "";
        kpiItem = this.state.kpis.map((kpiSet, ind) => {
            let item = kpiSet.Kpi.map((kpi, index) => {
                let bgClass = 'bg-warning';
                if (index % 3 === 1) {
                    bgClass = 'bg-danger'
                }
                if (index % 3 === 2) {
                    bgClass = 'bg-info'
                }
                if (kpi.ExpectedTargetGrowth !== null && kpi.ExpectedTargetGrowth != "") {
                    expTargetGrowthJXS = (<div>
                        <p className="txt-gray mb-0">Expected Target Growth{(kpi.UnitOfMeasurement == "PercentageQty" ||kpi.UnitOfMeasurement == "quantity")?" Qty":""}</p>
                        {(kpi.UnitOfMeasurement == 'percent' || kpi.UnitOfMeasurement == 'amount')?this.UnitOfMeasurementConverter1(kpi.UnitOfMeasurement) +((kpi.UnitOfMeasurement == 'percent')? this.ExpectedTargetGrowthConverter(kpi.ExpectedTargetGrowthPercentage): this.ExpectedTargetGrowthConverter(kpi.ExpectedTargetGrowthAmount) )+ this.UnitOfMeasurementConverter2(kpi.UnitOfMeasurement) + " Per " + this.ImprovementbasisConverter(kpi.Improvementbasis):""}
                        {(kpi.UnitOfMeasurement == 'PercentageQty')?Number(kpi.ExpectedTargetQtyGrowthPercent)+"%"+ " Per " + this.ImprovementbasisConverter(kpi.Improvementbasis):(kpi.UnitOfMeasurement == 'quantity')?Number(kpi.ExpectedTargetGrowthQty)+" Per " + this.ImprovementbasisConverter(kpi.Improvementbasis):""}
                    </div>)
                }
                let annualQuantity = "0";
                let impBasis = 0;
                switch(kpi.Improvementbasis){
                    case "Month":
                        impBasis = 12;
                    break;
                    case "Quarter":
                        impBasis = 4;
                    break;
                    case "Semi-Annually":
                        impBasis = 2;
                    break;
                    case "Year":
                        impBasis = 1;
                    break;
                }
                if(kpi.UnitOfMeasurement == "PercentageQty" ||kpi.UnitOfMeasurement == "quantity"){
                    if(kpi.UnitOfMeasurement == "PercentageQty"){
                        annualQuantity = Number(kpi.HistoricalQtyAchived) * (kpi.ExpectedTargetQtyGrowthPercent);
                        annualQuantity = Number(annualQuantity)/100;
                        annualQuantity = Number(annualQuantity)*Number(impBasis);
                    }else{
                        annualQuantity = Number(kpi.ExpectedTargetGrowthQty)*Number(impBasis);
                    }
                }
                return (
                    <div className="price-box" key={'kpiItem-' + index}>
                        <div className={"top-bg " + bgClass}>
                            <div className="dropdown">
                                <a href="#" className="float-right dropdown-toggle" data-toggle="dropdown"><i className="fas fa-ellipsis-v"></i></a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#" onClick={(e) => this.deleteKpi(e, kpi.KPIID)}>Delete</a>
                                </div>
                            </div>
                            <p>Business Target Outcome/KPIs</p>
                            <h3><Link to={"/kpi-setting/" + kpi.KPIID + "/" + kpiSet.KpiSetId}>{kpi.KPITitle}</Link></h3>
                        </div>
                        <div className="bottom-content">
                            <div className="mtrics-h">
                                <p className="txt-gray mb-0">Business Metrics</p>
                                <p className="txt-w">{kpi.BusinessMetrics}</p>
                            </div>
                            {/* <p className="txt-gray mb-0">Persona Impacted</p>
                            <p>{kpi.PersonaImpacted}</p> */}
                            <div className="kpi-price">

                                {(kpi.UnitOfMeasurement == "percent" ||kpi.UnitOfMeasurement == "amount")?"$" + this.EstimatedSavingsvalidator(kpi.EstimatedAnnualSavingsAmount):(kpi.UnitOfMeasurement == "PercentageQty" ||kpi.UnitOfMeasurement == "quantity")?this.EstimatedSavingsvalidator(annualQuantity):""}
                            </div>
                            <p className="txt-gray mb-2">Estimated Annual {kpi.UnitOfMeasurement == "percent" ||kpi.UnitOfMeasurement == "amount"? "$":(kpi.UnitOfMeasurement == "PercentageQty" ||kpi.UnitOfMeasurement == "quantity")?"Qty":""} Savings</p>

                            {expTargetGrowthJXS}

                            <div className="txt-gray mb-2"></div>
                            <p className="txt-gray mb-0">Audit Due Date</p>
                            {moment(kpi.AuditDueDate).format("MM/DD/YYYY")}

                            {kpi.ControlLeverCount != 0?<p><span className="badge badge-warning">{kpi.ControlLeverCount} Control Levers /Sub KPIs</span></p>:""}
                        </div>
                    </div>
                )
            })
            return(
                <div key={`setBox_${kpiSet.KpiSetId}`}>
                    <p className="heading" style={{fontSize:"20px"}}>{kpiSet.KPISetTitle} </p>
                    {item}
                </div>
            )
        })
        return kpiItem;
    }

    addSortHandler = () => {
        if(this.state.filterSelectedSortBy && this.state.filterSelectedSortType){
            let sortOrder = [...this.state.filterSortOrder];
            let newObj =  {
                SortByField: this.state.filterSelectedSortBy,
                OrderBy: this.state.filterSelectedSortType,
                SequenceNumber: sortOrder.length + 1
            }
            sortOrder.push(newObj);
            this.setState({
                filterSortOrder : sortOrder,
                filterSelectedSortBy : "",
                filterSelectedSortType : ""
            })
        }else{
            alert('Sort Field and Sort Type are Required.');
        }
    }

    dropRowHandler = ind => {
        if(ind > -1 && this.state.filterDraggedRowSelectedInd > -1){
            let sortOrder = [...this.state.filterSortOrder];
            let temp = {...sortOrder[ind]};
            let temp2 = {...sortOrder[this.state.filterDraggedRowSelectedInd]};
            temp.SequenceNumber = sortOrder[this.state.filterDraggedRowSelectedInd].SequenceNumber;
            temp2.SequenceNumber = sortOrder[ind].SequenceNumber;
            sortOrder[ind] = temp2;
            sortOrder[this.state.filterDraggedRowSelectedInd] = temp;
            this.setState({
                filterDraggedRowSelectedInd : -1,
                filterSortOrder : sortOrder
            })
        }
    }

    saveFilterPreference = (isSave) => {
        let saveObj = {
            PreferenceId: isSave ? this.state.filterSelectedPreference ? this.state.filterSelectedPreference : 0 : 0,
            PreferenceName: isSave ? this.state.filterPreferenceTitle : "",
            KpiSetId: this.state.filterSelectedKpiSet ? this.state.filterSelectedKpiSet : [],
            IsAllKpiSet: this.state.isAll, 
            FromDate: moment(new Date(this.state.value[0] * 1000)).format('YYYY/MM/DD'),
            ToDate: moment(new Date(this.state.value[1] * 1000)).format("YYYY/MM/DD"),
            DoSave:isSave,    
            OrderBy: this.state.filterSortOrder
        }
        if(isSave && this.state.filterPreferenceTitle){
            this.props.saveFilterPreference(saveObj);
        }else if(!isSave){
            this.props.saveFilterPreference(saveObj);
        }else{
            responseMessage('warning',"While saving Preference Name is Required.")
        }
    }

    changePreferenceHandler = async(e) => {
        if(e.target.value){
            let selectedPrefData = await axios.get(config.laravelBaseUrl+`getSavedKpiFilterPreferenceDetail/${e.target.value}`,{
                headers: {
                    "authorization": "Bearer " + sessionStorage.getItem("userToken")
                }
            });
            this.setState({ 
                filterSelectedPreference : selectedPrefData.data.data.PreferenceId,
                value : [new Date(selectedPrefData.data.data.FromDate).getTime() / 1000,new Date(selectedPrefData.data.data.ToDate).getTime() / 1000],
                filterPreferenceTitle : selectedPrefData.data.data.PreferenceName,
                filterSortOrder : selectedPrefData.data.data.OrderBy,
                filterSelectedKpiSet : selectedPrefData.data.data.KpiSetId,
                isAll : selectedPrefData.data.data.KpiSetId.length > 0 ? false : true
            })
        }else{
            this.setState({ 
                filterSelectedPreference : e.target.value
            });
        }
    }

    multiSelectKpiSetsHandler = (e, setId, isAll) => {
        if(isAll){
            if(e.target.checked == true){
                this.setState({
                    isAll : true,
                    filterSelectedKpiSet : []
                })
            }else{
                this.setState({
                    isAll : false,
                    filterSelectedKpiSet : []
                })
            }
        }else{
            if(e.target.checked == true){
                let sets = [...this.state.filterSelectedKpiSet];
                sets.push(setId);
                this.setState({
                    isAll : false,
                    filterSelectedKpiSet : sets
                })
            }else{
                let sets = [...this.state.filterSelectedKpiSet];
                let setInd = sets.indexOf(setId);
                sets.splice(setInd,1);
                this.setState({
                    isAll : false,
                    filterSelectedKpiSet : sets
                });
            }
        }
    }

    toggle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }

    render() {

        let kpiCreateLink = "/kpi-setting/create/0";
        let kpiItem = this.showKpiListDetails();
        
        

 
        kpiCreateLink = "/kpi-setting/create/" + this.state.kpiSetId;
       
            return (
                <div className="row kpi-setting-sec">
    
                    <div className="col-md-12">
    
                        <div className="col-md-12">
                            <p className="heading">Performance Measuring</p>
                        </div>
                        <div className="col-md-12 mb-4">
                            {/* <h1 className="Labelname-kpiset">Select Business Initiatives</h1>
                            <select className="form-control widthcont-add-tab-bg" id="kpiSet" name="kpiSet" onChange={(e) => this.kpiChangeHandler(e)} value={this.state.kpiSetId}>
                                {this.showKpiList()}
                            </select> */}
                            <div className="col-md-12 filter-col mb-5">
                                {/* <a href="#!" className="mr-3" onClick={()=>{this.props.fetchKpis("1","0");this.setState({
                                    afterFirstLoad : true
                                })}}>
                                    Load All Business Metrics 
                                </a> */}
                                <a className="btn" data-toggle="collapse" href="#collapseFilter" role="button" aria-expanded="false" aria-controls="collapseFilter">
                                    <i className="fas fa-plus"></i> Filter 
                                </a>
                                <div className="collapse filterblock" id="collapseFilter">
                                    <div className="filterfrm">
                                    <form>
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                            <label>Saved preferences</label>
                                            <select className="custom-select" onChange={(e)=>this.changePreferenceHandler(e)} value={this.state.filterSelectedPreference}>
                                                <option value="">Select Saved Preference</option>
                                                {this.props.filterPreferences.map(pref=>{
                                                    return <option key={`pref_${pref.KpiSearchandSortPreferenceId}`} value={pref.KpiSearchandSortPreferenceId}>{pref.KpiSearchandSortPreferenceName}</option>
                                                })}
                                            </select>
                                            </div>
                                            <div className="form-group col-md-6">
                                            <label>Preference Name</label>
                                            <input type="text" className="form-control" placeholder="" value={this.state.filterPreferenceTitle} onChange={(e)=>this.setState({ filterPreferenceTitle : e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="row">
                                        <h3 className="col-md-12">FILTER BY</h3>
                                        </div>
                                        <div className="row">
                                        <div className="form-group col-md-6">
                                            <label>Global Business Initiative</label>
                                            <button style={{textAlign:'left', fontSize : "13px", fontWeight : 400, color : "#73818f"}} className="custom-select"  data-toggle="dropdown" role="button" aria-expanded="false">Select Global Business Initiatives<span class="caret"></span></button>
                                            <ul class="dropdown-menu" role="menu" style={{width : "auto", overflowY : "scroll", height : "295px"}}>
                                                <li style={{fontSize : "13px", fontWeight : 400, color : "#73818f"}} >
                                                    <div className="d-flex justify-content-between dropdown-item" style={{textOverflow : "ellipsis", whiteSpace : "nowrap"}}>
                                                        <div className="dontClose">
                                                            <a className="dontClose">
                                                                All
                                                            </a>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" onChange={(e)=>this.multiSelectKpiSetsHandler(e,0,true)} checked={this.state.isAll}/>
                                                        </div>
                                                    </div>
                                                </li>
                                            {this.props.kpiSets.map(data => {
                                                if(data.DisableStatus != "Disabled"){
                                                    return (
                                                    <li style={{fontSize : "13px", fontWeight : 400, color : "#73818f"}} key={"Id" + data.KPISetID}>
                                                        <div className="d-flex justify-content-between dropdown-item" style={{textOverflow : "ellipsis", whiteSpace : "nowrap"}}>
                                                            <div>
                                                                <a>
                                                                    {data.KPISetTitle}
                                                                </a>
                                                            </div>
                                                            <div>
                                                                <input type="checkbox" onChange={(e)=>this.multiSelectKpiSetsHandler(e,data.KPISetID,false)} checked={this.state.filterSelectedKpiSet.includes(data.KPISetID) || this.state.isAll ? true : false}/>
                                                            </div>
                                                        </div>
                                                    </li>)
                                                }
                                            })}
                                                
                                            </ul>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label for="timeframe">Timeframe</label>
                                            <div className="position-relative timerange">
                                                <div className="framelabel">
                                                    <span>
                                                        <DatePicker
                                                            onKeyDown={event => {
                                                                event.preventDefault();
                                                                return false;
                                                            }}
                                                            maxDate={new Date(this.state.value[1] *1000)}
                                                            className="form-control border-secondary dis-date pl-3"
                                                            id="fromDate"
                                                            onChange={(date)=>{let value = [...this.state.value]; value[0] =date.getTime() / 1000; this.setState({value})}}
                                                            dateFormat="MM/dd/yyyy"
                                                            selected={new Date(this.state.value[0] *1000)}
                                                            autoComplete="off"
                                                        />
                                                    </span>
                                                    <span>
                                                        <DatePicker
                                                            onKeyDown={event => {
                                                                event.preventDefault();
                                                                return false;
                                                            }}
                                                            minDate={new Date(this.state.value[0] *1000)}
                                                            className="form-control border-secondary dis-date pl-3"
                                                            id="toDate"
                                                            onChange={(date)=>{let value = [...this.state.value]; value[1] =date.getTime() / 1000; this.setState({value})}}
                                                            dateFormat="MM/dd/yyyy"
                                                            selected={new Date(this.state.value[1] *1000)}
                                                            autoComplete="off"
                                                        />
                                                    </span>
                                                </div>
                                                <Slider
                                                    value={this.state.value}
                                                    onChange={(e,newVal)=>this.setState({ value : newVal })}
                                                    valueLabelDisplay="off"
                                                    min = {this.state.fetchedFromDate}
                                                    max = {this.state.fetchedToDate}
                                                    step = {86400}
                                                    aria-labelledby="range-slider"
                                                />
                                            </div>
                                        </div>
                                        </div>
                                        <div className="row">
                                            <h3 className="col-md-6">SORT BY</h3>
                                            <h3 className="col-md-6">SORT TYPE</h3>
                                        </div>
                                        <div className="row">
                                        <div className="form-group col-md-6">
                                            <select className="custom-select" value={this.state.filterSelectedSortBy} onChange={(e)=>this.setState({filterSelectedSortBy : e.target.value})}>
                                                <option value="">Select Field</option>
                                                {this.state.filterSortByList.map(field=>{
                                                    return <option key={`sortby_${field.value}`} value={field.value}>{field.field}</option>
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <div className="position-relative d-flex align-items-center">
                                            <select className="custom-select" value={this.state.filterSelectedSortType} onChange={(e)=>this.setState({ filterSelectedSortType : e.target.value })}>
                                                <option value="">Select Sort Type</option>
                                                {this.state.filterSortTypeList.map(sortType=>{
                                                    return <option key={`sorttype_${sortType.value}`} value={sortType.value}>{sortType.title}</option>
                                                })}
                                            </select>
                                            <a href="#!" className="addicn ml-2" onClick={()=>this.addSortHandler()}><i className="fas fa-plus"></i></a>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="row">
                                            <h3 className="col-md-12">SORT Order</h3>
                                            <div className="col-md-12">
                                            <div className="table-responsive">
                                                <table className="table table-bordered">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                        <th>SR N0.</th>
                                                        <th>Parameter</th>
                                                        <th>Sort Type</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.filterSortOrder.map((sortOrder,ind)=>{
                                                            let field = this.state.filterSortByList[this.state.filterSortByList.map(field=>field.value).indexOf(sortOrder.SortByField)].field;
                                                            let orderBy = this.state.filterSortTypeList[this.state.filterSortTypeList.map(sortType=>sortType.value).indexOf(sortOrder.OrderBy)].title;
                                                            return(
                                                                <tr 
                                                                    draggable={true} 
                                                                    onDragStart={()=>this.setState({
                                                                        filterDraggedRowSelectedInd : ind
                                                                    })} 
                                                                    onDragOver={(e)=>e.preventDefault()} 
                                                                    onDrop={()=>this.dropRowHandler(ind)}
                                                                >
                                                                    <td>{sortOrder.SequenceNumber}</td>
                                                                    <td>{field}</td>
                                                                    <td>{orderBy}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                    </table>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-4">
                                            <a href="#" className="clear" onClick={()=>{this.props.fetchKpis("1","0"); this.setState({
                                                filterSelectedPreference : "",
                                                filterPreferenceTitle : "",
                                                filterSelectedKpiSet : [],
                                                filterSortOrder : [],
                                                isAll : true,
                                                filterSelectedSortType : "",
                                                filterSelectedSortBy : "",
                                                isOpen : false,
                                            }); }}>Clear</a>
                                            <div className="d-flex justify-content-end align-items-center">
                                                <a href="#" className="btnsave" onClick={()=>this.saveFilterPreference(false)}>Apply</a>
                                                <a href="#" className="btnsave ml-3" onClick={()=>this.saveFilterPreference(true)} >Save & Apply</a>
                                            </div>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                                </div>
                        </div>
                        <div className="col-sm-12 col-md-10 col-lg-10 mb-5">
                            <div className="price-container">
                                {kpiItem}
    
                                <div className="add-tab">
                                    <div className="add-tab-bg">
                                        {(this.state.kpiSetId==="global business initiative")?
                                        <a href="#!">
                                            <div className="lever-icon" style={{marginLeft:"-118px"}}>
                                                <i className="fas fa-plus-circle"></i><br />
                                                Add new Business Target Outcome/KPI
                                            </div>
                                        </a>:
                                        <a href="#!" onClick={()=>this.toggle()}>
                                            <div className="lever-icon" style={{marginLeft:"-118px"}}>
                                                <i className="fas fa-plus-circle"></i><br />
                                                Add new Business Target Outcome/KPI
                                            </div>
                                        </a>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ModalPopup isOpen={this.state.isOpen} toggle={this.toggle.bind(this)} title="Select Global Business Initiative">
                            <div className="form-group">
                                {/* <h1 className="Labelname-kpiset">Select Business Initiatives</h1> */}
                                <select className="form-control widthcont-add-tab-bg" id="kpiSet" name="kpiSet" onChange={(e) => this.setState({ kpiSetId : e.target.value })} value={this.state.kpiSetId}>
                                    {this.showKpiList()}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary ml-3"  onClick={(e) => this.toggle(e)}>Cancel</button> 
                                <Link to={kpiCreateLink}  className="btn btn-primary ml-3">Create</Link> 
                            </div> 
                        </ModalPopup>
    
                    </div>
                </div>
            )

        }
        
    }

KpiList.propTypes = {
    fetchKpis: PropTypes.func.isRequired,
    fetchKpiSetListForUser: PropTypes.func.isRequired,
    deleteKpi: PropTypes.func,
    kpis: PropTypes.array.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    kpis: state.kpiData.kpis,
    kpiSets: state.kpiData.kpiSetsForUser,
    deleteKpiData: state.kpiData.deleteKpiData,
    errors: state.errors,
    filterPreferences : state.kpiData.filterPreferences
});
export default connect(mapStateToProps, { fetchKpis, deleteKpi, fetchKpiSetList, fetchKpiSetListForUser, saveFilterPreference, getSavedPreferences })(withRouter(KpiList));