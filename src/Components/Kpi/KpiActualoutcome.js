import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import ModalPopup from '../common/ModalPopup';
import { connect } from 'react-redux';
import moment from 'moment';
import { getKpiAudit, saveKpiAudit, getAuditTypes, getAuditHistory, getAuditNames,getKpiAuditData } from '../../actions/kpiActions';
import { KpiAtualOutcomeWrapper } from './Styling/kpiActualoutcome.js';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import axios from 'axios';
import { responseMessage } from '../../utils/alert';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import "react-datepicker/dist/react-datepicker.css";

const config = require('../../config');


class KpiActualOutCome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auditShow:false,
            kpiData: [],
            controlLevers: [],
            leverData: [],
            AuditName: "",
            AuditDescription: "",
            AuditType: "",
            AuditSource: "",
            showToolbar : true,
            auditNamesPopUp : false,
            selectedAuditName : "",
            auditNames : [],
            editedRow: null,
            kpiAuditData:null
        }
    }

    componentDidMount() {
        setInterval(()=>{
            if(sessionStorage.getItem('refreshKpiAuditPage')!=null){
                sessionStorage.removeItem('refreshKpiAuditPage');
                this.props.getAuditTypes()
                this.props.getKpiAudit({ id: this.props.KpiId, kpiSetId: this.props.setId })
                this.props.getAuditHistory(this.props.KpiId)
                this.props.getAuditNames({AuditName:""})
            }
        },1000)
        this.props.getAuditTypes()
        this.props.getKpiAudit({ id: this.props.KpiId, kpiSetId: this.props.setId })
        this.props.getAuditHistory(this.props.KpiId)
        this.props.getAuditNames({AuditName:""})
        
    
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        let returnObj = {}
        returnObj.auditNames = nextProps.auditNames.map((auditName)=>auditName.AuditName);
        if (nextProps.kpiData != prevState.kpiData && Object.keys(nextProps.kpiData).length > 0) {
            returnObj.leverCounter = nextProps.kpiData.controls.length
            returnObj.kpiData = nextProps.kpiData
            if(nextProps.kpiData.details && nextProps.kpiData.details.length>0){
                console.log('to check ',nextProps.kpiData.details)
                switch(nextProps.kpiData.details[0].AuditFrequencyKIP){
                    case "Monthly":
                        returnObj.AuditType = "Monthly";
                        returnObj.AuditTypeId = "88";
                    break;
                    case "Quarterly":
                        returnObj.AuditType = "Quaterly";
                        returnObj.AuditTypeId = "89";
                    break;
                    case "Yearly":
                        returnObj.AuditType = "Yearly";
                        returnObj.AuditTypeId = "90";
                    break;
                }
            }
            returnObj.persona = nextProps.kpiData.details && nextProps.kpiData.details.length>0 ?nextProps.kpiData.details[0].PersonaImpacted?nextProps.kpiData.details[0].PersonaImpacted:"":""
            console.log(returnObj.AuditType,returnObj.AuditTypeId)
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
                                // console.log(nextProps.kpiData.capabilities[j])
                            }
                        }
                    }
                    for (let k in nextProps.kpiData.inhibitors) {
                        if (nextProps.kpiData.inhibitors[k]) {
                            if (nextProps.kpiData.inhibitors[k].KPIControlLeversID == returnObj.controlLevers[i].KPIControlLeversID) {
                                returnObj.leverData[i].inhibitors.push(nextProps.kpiData.inhibitors[k])
                                // console.log(nextProps.kpiData.inhibitors[k])
                            }
                        }
                    }
                }

            }
           
        }
        if(nextProps.kpiAuditData!==null&&typeof nextProps.kpiAuditData.details!=='undefined' &&
         nextProps.kpiAuditData.details.length>0){
             returnObj.kpiAuditData = nextProps.kpiAuditData;
             
         }
         
        return returnObj
    }
    editAudit(row) {
        this.setState({editedRow: row,showAudit:false}, () => {
            console.log(this.state.editedRow);
        });
    }
    handleAuditDate(date, type) {
        let editedRow = this.state.editedRow;
        if(type === 'from') {
            editedRow.FromDate = date;
        }else if(type === 'to') {
            editedRow.ToDate = date;
        }else if(type === 'auditEntry') {
            editedRow.AuditEntryDate = date;
        }
        this.setState({editedRow});
    }
    handleAuditEditOnChange(e) {
        let editedRow = this.state.editedRow;
        editedRow[e.target.name] = e.target.value;
        this.setState({editedRow});
    }
    handleAuditEditSubmit(e) {
        e.preventDefault();
        console.log(this.state.editedRow);
        this.setState({
            editedRow: null,

        })
    }
    cancelEdit() {
        this.setState({
            editedRow: null
        })
    }
    fetchAuditDetails(e, row) {
        e.preventDefault();
        console.log(row);
        this.setState({...this.state,editedRow:null,showAudit:true},()=>{
            let {KpiOutcomeMetricsId} = row;
            if(KpiOutcomeMetricsId === "" || KpiOutcomeMetricsId === null ||
            typeof KpiOutcomeMetricsId === 'undefined')
            return;
    
            this.props.getKpiAuditData(this.props.KpiId,KpiOutcomeMetricsId);
        })
        
    }
    InvesmentDateHandler(date, leverCounter, key) {
        let leverData = [...this.state.leverData]
        leverData[leverCounter - 1]["capabilities"][key]["InvestmentDate"] = date;
        this.setState({
            leverData
        })
    }
    kpiDateChangeHandler(date, attr){
        let dateI = moment(date).format("MM/DD/YYYY")
        if(attr === "from"){
            this.setState({FromDate:date})
        }
        else{
            this.setState({ToDate:date})
        }

    }
    controlDateChangeHandler(date, leverCounter, attr){
        let dateI = moment(date).format("MM/DD/YYYY")
        let leverData = [...this.state.leverData]
        if(attr === "from"){
            leverData[leverCounter - 1]["FromDate"] = date
        }
        else{
            leverData[leverCounter - 1]["ToDate"] = date
        }
        this.setState({
            leverData
        })

    }
    onSaveHandler = () => {
        let leverData = this.state.leverData.map((cL)=>{
            return{
                ...cL,
                ToDate:cL.ToDate?moment(cL.ToDate).format("YYYY-MM-DD"):moment().format("YYYY-MM-DD"),
                FromDate : cL.FromDate?moment(cL.FromDate).format("YYYY-MM-DD"):moment().format("YYYY-MM-DD")
            }
        })
        let saveObj = {
            inputJson: {
                AuditType: this.state.AuditType,
                AuditTypeId: this.state.AuditTypeId,
                AuditName: this.state.AuditName,
                AuditSource: this.state.AuditSource,
                AuditDescription: this.state.AuditDescription,
                "kpi_outcome_metrics": {
                    "KpiId": this.state.kpiData.details[0].KPIID,
                    "KpiOutcomeMetricsId": 0,
                    "initiation_date": this.state.kpiData.details[0].KPIInitiationDate,
                    "outcome_date": this.state.kpiData.details[0].BusinessOutComeTargetDate,
                    "elapsed_date": this.state.elapsed_date,
                    "growth_achieved": this.state.growth_achieved,
                    "FromDate": this.state.FromDate?moment(this.state.FromDate).format("YYYY-MM-DD"):moment().format("YYYY-MM-DD"),
                    "ToDate": this.state.ToDate?moment(this.state.ToDate).format("YYYY-MM-DD"):moment().format("YYYY-MM-DD"),
                    "persona": this.state.persona
                },
                "control_lever_data": leverData
            }
        }
        this.props.saveKpiAudit(saveObj)
    }
    onChangeHandler(e, leverCounter, parameter, parameterKey) {
        if(e.target.name === "ActualGrowthAchievedAmount" || e.target.name === "growth_achieved" || e.target.name === "persona"){
            if(this.elapsedDateCalculator() != "Audit Due"){
                if(this.state.allowAuditBeforeDueDate){
                    if (leverCounter) {
                        let leverData = [...this.state.leverData];
                        if (parameterKey) {
                            leverData[leverCounter - 1][parameter][parameterKey - 1][e.target.name] = e.target.value;
                            this.setState({
                                leverData
                            });
                        }
                        else{
                        leverData[leverCounter - 1][e.target.name] = e.target.value;
                        this.setState({
                            leverData
                        });
                    }
                    } else {
                        this.setState({
                            [e.target.name]: e.target.value
                        })
                    }
                }else{
                    let el = e.target;
                    confirmAlert({
                        title: 'Warning !',
                        message: 'KPI is not due for audit yet, Do you still want to continue ?',
                        buttons: [
                            {
                                label: 'Yes',
                                onClick: () => {
                                    if (leverCounter) {
                                        let leverData = [...this.state.leverData];
                                        if (parameterKey) {
                                            leverData[leverCounter - 1][parameter][parameterKey - 1][el.name] = el.value;
                                            this.setState({
                                                leverData,
                                                allowAuditBeforeDueDate : true
                                            });
                                        }
                                        else{
                                        leverData[leverCounter - 1][el.name] = el.value;
                                        this.setState({
                                            leverData,
                                            allowAuditBeforeDueDate : true
                                        });
                                    }
                                    } else {
                                        this.setState({
                                            [el.name]: el.value,
                                            allowAuditBeforeDueDate : true
                                        })
                                    }
                                }
                            },{
                                label: 'No',
                                onClick: () => {
                                    el.value = ""
                                }
                            }
                        ]
                    });
                }
            }else{
                if (leverCounter) {
                    let leverData = [...this.state.leverData];
                    if (parameterKey) {
                        leverData[leverCounter - 1][parameter][parameterKey - 1][e.target.name] = e.target.value;
                        this.setState({
                            leverData
                        });
                    }
                    else{
                    leverData[leverCounter - 1][e.target.name] = e.target.value;
                    this.setState({
                        leverData
                    });
                }
                } else {
                    this.setState({
                        [e.target.name]: e.target.value
                    })
                }
            }
        }else{
            if (leverCounter) {
                let leverData = [...this.state.leverData];
                if (parameterKey) {
                    leverData[leverCounter - 1][parameter][parameterKey - 1][e.target.name] = e.target.value;
                    this.setState({
                        leverData
                    });
                }
                else{
                leverData[leverCounter - 1][e.target.name] = e.target.value;
                this.setState({
                    leverData
                });
            }
            } else {
                this.setState({
                    [e.target.name]: e.target.value
                })
            }
        }
    }
    handleToolbarToggle = () => {
        this.setState({
            showToolbar : !this.state.showToolbar
        })
    }
    inhebitorLoopHandler(leverCounter) {
        let arr = (this.state.leverData.length > 0) ? (this.state.leverData[leverCounter].inhibitors) : [];
        // console.log(this.state.leverData)
        const inhebtors = arr.map((a, i) => {
            return (<div className="cardinhabitor" key={"in" + i}>
                <div className="card-header card-headerinhabitor " id="headingOneinhabitor">

                    <button type="button" className="btn text-left" data-target={"#collapseOneinhabitor" + i}>Inhibitor #{i + 1}: {a.InhibitorsName}</button>

                </div>
                <div id={"collapseOneinhabitor" + i} className="collapse show" aria-labelledby="headingOneinhabitor" data-parent="#accordionExampleinhabitor">
                    <div className="card-body">
                        <div className="inhabitor-bottom-div">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Actual Risk Impact</label>
                                        <input type="number" className="form-control"
                                            name="RiskImpact"
                                            // value={a.RiskImpact || ""}
                                            onChange={(e) => this.onChangeHandler(e, leverCounter + 1, "inhibitors", i + 1)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group drop-form-control">
                                        <label>Risk Mitigation Measure Comments</label>
                                        <input type="text" name="RiskMitigratonComments"
                                            //value={a.RiskMitigratonComments || ""}
                                            onChange={(e) => this.onChangeHandler(e, leverCounter + 1, "inhibitors", i + 1)}
                                            className="form-control" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        }
        )
        return inhebtors

    }
    capabilitiesLoopHandler(leverCounter) {

        let arr1 = (this.state.leverData.length > 0) ? (this.state.leverData[leverCounter].capabilities) : [];

        const capabilties = arr1.map((b, i) => {
            let date = (b.InvestmentDate != "") ? moment(b.InvestmentDate).format("MM/DD/YYYY").split('/') : (moment(new Date()).format("MM/DD/YYYY")).split('/')
            return (<div className="cardinhabitor" key={"ca" + i}>
                <div className="card-header card-headerinhabitor " id="headingOneinhabitor">

                    <button type="button" className="btn btn-link text-left" data-toggle="collapse" data-target={"#collapseOneCapability" + i}>Capability #{i + 1}: {b.CapabilitiesName}<i className="fas fa-chevron-right"></i></button>

                </div>
                <div id={"collapseOneCapability" + i} className="collapse show" aria-labelledby="headingOneinhabitor" data-parent="#accordionExampleinhabitor">
                    <div className="card-body">
                        <div className="inhabitor-bottom-div">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Actual Capex Investment</label>
                                        <input type="number" className="form-control"
                                            name="CapexInvestment"
                                            //value={b.CapexInvestment || ""}
                                            onChange={(e) => this.onChangeHandler(e, leverCounter + 1, "capabilities", i + 1)} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Invesment Date</label>
                                        <div className="input-group mb-2">
                                            {/* <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <i className="fas fa-calendar-alt"></i>
                                                </div>
                                            </div> */}
                                            <DatePicker
                                                className="form-control textbox-control dateControl-className-kpinew"
                                                onChange={(date) => this.InvesmentDateHandler(date, leverCounter + 1, i)}
                                                selected={new Date(date[2], (date[0]) - 1, date[1])}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Opex incurred Till Date</label>
                                        <input type="number" className="form-control"
                                            name="OpexCostIncurred"
                                            //value={b.OpexCostIncurred || ""}
                                            onChange={(e) => this.onChangeHandler(e, leverCounter + 1, "capabilities", i + 1)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        }
        )
        return capabilties
    }
    elapsedDateCalculator = () => {
        let auditDueDate = moment(this.state.kpiData.details &&this.state.kpiData.details.length>0 ?this.state.kpiData.details[0].AuditDueDate:"","YYYY-MM-DD")
        let today = moment()
        let diff = today.diff(auditDueDate,"days");
        let days = (diff < 0)?(diff*-1 === 1)?diff*-1 + " Day":diff*-1 + " Days":"Audit Due";
        return days;
    }
    auditNameSave = () => {
        this.setState({
            auditNamesPopUp : !this.state.auditNamesPopUp,
            AuditName : this.state.selectedAuditName
        })
    }
    toggleAuditNameModal = () => {
        this.setState({
            auditNamesPopUp : !this.state.auditNamesPopUp
        })
    }
    handleAuditNameChange = (name) => {
        this.setState({
            selectedAuditName : name
        })
    }
    exportDataHandler = () => {
        const headers = {
            "authorization": "Bearer " + sessionStorage.getItem("userToken"),
        }
        axios.get(config.laravelBaseUrl+ 'exportKpiAudit/'+this.props.KpiId, {
            headers: headers
        })
        .then(res => {
            if(res.data.data.file_name != ""){
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
            }else{
                responseMessage("error",res.data.message);
            }
        }); 
    }
    columns = [{
        Header: "",
        filterable: false,
        Cell: row => (
            <div>
                <button class="btn btn-primary" onClick={this.editAudit.bind(this, row.original)}><i className="fa fa-edit"></i></button>
            </div>
        )
      },{
        Header: 'Audit Name',
        accessor: 'AuditName',
        Cell: row => <a href="#" onClick={(e) => this.fetchAuditDetails(e, row.original)}>{row.original.AuditName}</a>
      }, {
        Header: 'From Date',
        accessor: 'FromDate',
        Cell: props => <span>{props.original.FromDate ? moment(props.original.FromDate).format("MM/DD/YYYY") : "Not Available"}</span>
      }, {
        Header: 'To Date',
        accessor: 'ToDate',
        Cell: props => <span>{props.original.ToDate ? moment(props.original.ToDate).format("MM/DD/YYYY") : "Not Available"}</span>
      },{
        Header: 'Audit Entry Date',
        accessor: 'AuditEntryDate',
        Cell: props => <span>{props.original.AuditEntryDate ? moment(props.original.AuditEntryDate).format("MM/DD/YYYY") : "Not Available"}</span>
      },{
        Header: 'Actual Growth Archive',
        accessor: 'ActualGrowthAchievedAmount',
        Cell : props => <span>{props.original.ActualGrowthAchievedAmount ? Number(props.original.ActualGrowthAchievedAmount).toFixed(2) : ""}</span>
      }];
      editAndSaveAudit(){
          console.log('state to be saved',this.state)
          let {KpiOutcomeMetricsId} = this.state.editedRow
          if(KpiOutcomeMetricsId=== null || typeof KpiOutcomeMetricsId=== 'undefined'
          || KpiOutcomeMetricsId ===""){
              return;
          }
        let saveObj = {
            inputJson: {
                
                AuditName: this.state.editedRow.AuditName,
              
                "kpi_outcome_metrics": {
                    "KpiId": this.state.kpiData.details[0].KPIID,
                    "KpiOutcomeMetricsId": KpiOutcomeMetricsId,
                    "initiation_date": this.state.kpiData.details[0].KPIInitiationDate,
                    "outcome_date": this.state.kpiData.details[0].BusinessOutComeTargetDate,
                    "elapsed_date": this.state.elapsed_date,
                    "growth_achieved": this.state.editedRow.ActualGrowthAchievedAmount,
                    "FromDate": this.state.editedRow.FromDate?moment(this.state.editedRow.FromDate).format("YYYY-MM-DD"):moment().format("YYYY-MM-DD"),
                    "ToDate": this.state.editedRow.ToDate?moment(this.state.editedRow.ToDate).format("YYYY-MM-DD"):moment().format("YYYY-MM-DD"),
                    "persona": this.state.persona
                },
                
            }
        }
        this.props.saveKpiAudit(saveObj)
      }
    render() {
        
        let controlLeverList = this.state.kpiAuditData!==null &&this.state.kpiAuditData.controls.length>0 ?
        this.state.kpiAuditData.controls.map((item,index)=>{
            
            return(
                <tr key={index}>
                    <td>
                        {item.ActualGrowthAchievedAmount}
                    </td>
                    <td>
                        {item.ControlLeverId}
                    </td>
                    <td>
                        {item.ControlLeverOutcomeMetricsId}
                    </td>
                    <td>{item.OutcomeDate}</td>
                </tr>
            )
        }):null

        // capabilities map InhibitorOutcomeMetricsId
        let capabilitiesList = this.state.kpiAuditData!==null &&this.state.kpiAuditData.capabilities.length>0 ?
        this.state.kpiAuditData.capabilities.map((item,index)=>{
            
            return(
                <tr key={index}>
                    <td>
                        {item.ActualGrowthAchievedAmount}
                    </td>
                    <td>
                        {item.CapabilitiesId}
                    </td>
                    <td>
                        {item.CapabilitiesOutcomeMetricsId}
                    </td>
                    <td>{item.OutcomeDate}</td>
                </tr>
            )
        }):null

        // inhibitors
        let inhibitorsList = this.state.kpiAuditData!==null &&this.state.kpiAuditData.inhibitors.length>0 ?
        this.state.kpiAuditData.inhibitors.map((item,index)=>{
            
            return(
                <tr key={index}>
                    <td>
                        {item.ActualGrowthAchievedAmount}
                    </td>
                    <td>
                        {item.InhibitorsId}
                    </td>
                    <td>
                        {item.InhibitorOutcomeMetricsId}
                    </td>
                    <td>{item.OutcomeDate}</td>
                </tr>
            )
        }):null
        let editAuditForm = null;
        let showAuditData = null;
        if(this.state.kpiAuditData !== null){
            showAuditData = (
                <>
                <hr style={{backgroundColor:"black",height:1}}/>
  <div className="row">
      
      <div className="col-md-6">
      <div className="card">
    
    <div className="card-body">
    <h5 className="card-title">
       Control Levers
    </h5>
    
<table className="table table-striped mb-0">
                                            <thead>
                                                <tr>
                                                    <th >Actual Growth</th>
                                                    <th >Control Lever</th>
                                                    <th >Metrics Id</th>
                                                    <th >Outcome Date</th>
                                                    
                                                </tr>
                                            </thead>
                                            
                                            <tbody>
                                            {controlLeverList}
                                            </tbody>
                                        </table> 

    </div>

</div>
      </div>

<div className="col-md-6">
<div className="card">
   
    <div className="card-body">
    <h5 className="card-title">
        Capabilities
    </h5>
    
<table className="table table-striped mb-0">
                                            <thead>
                                                <tr>
                                                    <th >Growth</th>
                                                    <th >Capability Id</th>
                                                    <th >Metrics Id</th>
                                                    <th >Outcome Date</th>
                                                    
                                                </tr>
                                            </thead>
                                            
                                            <tbody>
                                            {capabilitiesList}
                                            </tbody>
                                        </table> 

    </div>

</div>
</div>
<div className="col-md-6">
<div className="card">
   
    <div className="card-body">
    <h5 className="card-title">
        Risks
    </h5>
<table className="table table-striped mb-0">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "5%" }}>Actual Growth</th>
                                                    <th style={{ width: "19%" }}>RISKS ID</th>
                                                    <th style={{ width: "19%" }}>Metrics Id</th>
                                                    <th style={{ width: "19%" }}>Outcome Date</th>
                                                    
                                                </tr>
                                            </thead>
                                            
                                            <tbody>
                                            {inhibitorsList}
                                            </tbody>
                                        </table> 

    </div>

</div>
</div>

                </div>
                </>
            )
        }
        if(this.state.editedRow) {
            editAuditForm = (<div class="col-md-12"><hr />
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Edit Audit</h5>
                        <form onSubmit={this.handleAuditEditSubmit.bind(this)}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="auditName">Audit Name</label>
                                    <input type="text" className="form-control" id="auditName" name="AuditName" value={this.state.editedRow.AuditName} onChange={(e) => this.handleAuditEditOnChange(e)} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="fromDate">From Date</label>
                                    <DatePicker
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                          }}
                                        onChange={(date) => this.handleAuditDate(date, "from")}
                                        selected={new Date(this.state.editedRow.FromDate)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="auditName">To Date</label>
                                    <DatePicker
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                          }}
                                        onChange={(date) => this.handleAuditDate(date, "to")}
                                        selected={new Date(this.state.editedRow.ToDate)}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="auditEntryDate">Audit Entry Date</label>
                                    <DatePicker
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                          }}
                                        onChange={(date) => this.handleAuditDate(date, "auditEntry")}
                                        selected={new Date(this.state.editedRow.AuditEntryDate)}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="actualGrowth">Actual Growth Achieved Amount</label>
                                    <input type="text" className="form-control" name="ActualGrowthAchievedAmount" id="actualGrowth" value={this.state.editedRow.ActualGrowthAchievedAmount} onChange={(e) => this.handleAuditEditOnChange(e)} />
                                </div>
                            </div>
                            <button class="btn btn-primary" onClick={this.editAndSaveAudit.bind(this)} type="submit">Save</button>
                            <button class="btn btn-default" onClick={this.cancelEdit.bind(this)}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>)
        }
        // console.log(this.state.AuditType)
        let auditNameList = this.state.auditNames.map((name,i)=>{
            return(
                <tr key={"auditList"+i}>
                    <td><input type="radio" value={name}
                    id={name}
                    checked={this.state.selectedAuditName==name?true:false}
                    onChange={() => this.handleAuditNameChange(name)} /></td>
                    <td>{name}</td>
                </tr >
            )
        })
        
        // console.log(this.state.auditNames)
        // console.log(this.state.kpiData.details?this.state.kpiData.details[0].AuditDueDate:"")
        const AuditTypelist = this.props.auditTypes.map(auditTtype => {
            // console.log(this.state.kpiData[0]?this.state.kpiData[0].details.AuditFrequencyKIP:"","Freq");
            return (<option key={auditTtype.CategoryLookUpId} value={auditTtype.CategoryLookUpId}>{auditTtype.CategoryCode}</option>)

        })
        // console.log(this.state.kpiData.details?this.state.kpiData.details[0].AuditFrequencyKIP:"","Freq2");
        const historyList = this.props.auditHistory.map((data,i)=>{
            return (<tr key={"Key"+i}>
                <td>{i+1}</td>
                <td>{data.AuditName}</td>
                <td>{data.FromDate}</td>
                <td>{data.ToDate}</td>
                <td>{data.AuditEntryDate?moment(data.AuditEntryDate).format("YYYY-MM-DD"):""}</td>
                <td>{data.ActualGrowthAchievedAmount}</td>
            </tr>)
        })
          const tableConfig = {
            defaultPageSize: 10,
            resizable: false,
            className: 'table-striped'
          }
        const controlleves = this.state.controlLevers.map((c, i) => {
            return (
                <div className="card" key={"cl" + i}>
                    <div className="card-header" id="headingTwo">

                        <button type="button" className="btn btn-link accordianbutton collapsed" data-toggle="collapse" data-target={"#collapseTwokpi" + i}><i className="far fa-plus-square"></i>Control Lever Audit Record : {c.ControlLeversName}</button>

                    </div>
                    <div id={"collapseTwokpi" + i} className="collapspadding-control collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                        <div className="row pl-3 pr-3 mt-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>KPI Initiation Date</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-calendar-alt"></i>
                                            </div>
                                        </div>
                                        <input
                                            type="date"
                                            readOnly
                                            value={this.props.kpiData.details && this.props.kpiData.details.length>0 ? this.props.kpiData.details[0].KPIInitiationDate : ""}
                                            className="form-control textbox-control dateControl-className-kpinew"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Business Outcome Target Date</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-calendar-alt"></i>
                                            </div>
                                        </div>
                                        <input
                                            type="Date"
                                            readOnly
                                            value={this.props.kpiData.details && this.props.kpiData.details.length>0? moment(this.props.kpiData.details[0].BusinessOutComeTargetDate).format("YYYY-MM-DD") : ""}
                                            className="form-control textbox-control dateControl-className-kpinew"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Audit Due Date</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-calendar-alt"></i>
                                            </div>
                                        </div>
                                        <input
                                            type="Date"
                                            readOnly
                                            value={this.props.kpiData.details && this.props.kpiData.details.length>0 ? moment(this.props.kpiData.details[0].AuditDueDate).format("YYYY-MM-DD") : ""}
                                            className="form-control textbox-control dateControl-className-kpinew"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row pl-3 pr-3 mt-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Audit From Date</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-calendar-alt"></i>
                                            </div>
                                        </div>
                                        <DatePicker
                                            onChange={(date) => this.controlDateChangeHandler(date, (i+1), "from")}
                                            selected={this.state.leverData[i].FromDate ? this.state.leverData[i].FromDate : new Date()}
                                            className="form-control textbox-control dateControl-className-kpinew"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Audit To Date</label>
                                    <div className="input-group mb-2">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <i className="fas fa-calendar-alt"></i>
                                            </div>
                                        </div>
                                        <DatePicker
                                            onChange={(date) => this.controlDateChangeHandler(date, (i+1), "to")}
                                            selected={this.state.leverData[i].ToDate ? this.state.leverData[i].ToDate : new Date()}
                                            className="form-control textbox-control dateControl-className-kpinew"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Elapsed to Audit Period</label>
                                    <input type="text" 
                                        className={(this.elapsedDateCalculator() === "Audit Due")?"form-control is-invalid":"form-control"}
                                        readOnly
                                        value={this.elapsedDateCalculator()}
                                        name="elapsed_date" />
                                </div>
                            </div>
                        </div>
                        <div className="row pl-3 pr-3 mt-3">
                            <div className="col-md-6
                            ">
                                <div className="form-group">
                                    {(c.UnitOfMeasurementControl === "PercentageQty" || c.UnitOfMeasurementControl === "quantity")?<label>Actual Qty Growth Achieved</label>:<label>Actual Growth Achieved $</label>}
                                    <input type="number" className="form-control"
                                        name="ActualGrowthAchievedAmount"
                                        value={(c.ActualGrowthAchievedAmount)?(c.ActualGrowthAchievedAmount != 0.0)?c.ActualGrowthAchievedAmount:"":""}
                                        onChange={(e) => this.onChangeHandler(e, (i + 1), null, null)} />
                                </div>
                            </div>
                        </div>
                        <div className="nav-tab-kpi pl-3 pr-3 mt-3 mb-4">

                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" data-toggle="tab" href={"#home"+i}>Risk Materialization</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href={"#menu1"+i}>Investment Decisions</a>
                                </li>
                            </ul>

                            <div className="tab-content">
                                <div id={"home"+i} className="container tab-pane custom-tab-pane active p-0">
                                    <div className="accordion" id={"accordionExampleinhabitor"+i}>
                                        {this.inhebitorLoopHandler(i)?this.inhebitorLoopHandler(i):"No Data Found !"}
                                    </div>
                                </div>
                                <div id={"menu1"+i} className="container tab-pane custom-tab-pane fade p-0">
                                    <div className="accordion" id={"accordionExampleCapabilities"+i}>
                                        {this.capabilitiesLoopHandler(i)?this.capabilitiesLoopHandler(i):"No Data Found !"}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        })
        // console.log(this.state)
        // console.log(this.props.history,"history")
        return [
            <KpiAtualOutcomeWrapper>
            


                    <div className="row">
                    <div className="new-kpi-col col-sm-12 col-md-3 col-lg-7">
                        <div className="kpi-outcome-record user-content">
                            <div className="d-sm-flex justify-content-between">
                                <h2 className="heading mt-3">KPI Actual Record Outcome - {this.props.kpiData.details && this.props.kpiData.details.lenght>0 ? this.props.kpiData.details[0].TargetBusinessOutcome : ""}</h2>
                            </div>
                            {/* <div className="d-sm-flex justify-content-end">
                                <a href="#" onClick={this.props.history.goBack} className="btn btn-back">Back</a>
                            </div> */}


                            <div className="bg-white newkpi-form">

                                <div className="card-body manage-createKPI mb-4">
                                <button className="top-auditbutton btn btn-sm btn-primary mb-2" data-toggle="modal" data-target="#myModal">
                                        <i className="fas fa-arrow-alt-circle-right"></i>&nbsp; Previous Audits
                                    </button>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group drop-form-control">
                                                <label>Audit Type</label>
                                                <select className="form-control"
                                                    name="AuditType"
                                                    disabled={true}
                                                    onChange={(e) => { this.onChangeHandler(e, null, null, null) }}
                                                    value={this.state.AuditTypeId?this.state.AuditTypeId:""} >
                                                    {AuditTypelist}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <label>Audit Name</label>
                                            <input type="text"
                                                name="AuditName"
                                                onChange={(e) => { this.onChangeHandler(e, null, null, null) }}
                                                value={this.state.AuditName}
                                                className="form-control" />
                                        </div>
                                        <div className="col-md-1 pl-0">
                                            <label className="w-100">&nbsp;</label>
                                            <img onClick={this.toggleAuditNameModal.bind(this)} src={require('../../common/images/search-add.png')} />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Audit Source</label>
                                            {/* <h6 className="mt-1 mb-1">{this.props.AuditSource}</h6> */}
                                            <input type="text"
                                                name="AuditSource"
                                                onChange={(e) => { this.onChangeHandler(e, null, null, null) }}
                                                //value={this.state.AuditSource}
                                                className="form-control" />
                                        </div>
                                        <div className="col-md-6">
                                            <label>Audit Description</label>
                                            {/* <h6 className="mt-1 mb-1">{this.props.AuditSource}</h6> */}
                                            <input type="text"
                                                name="AuditDescription"
                                                onChange={(e) => { this.onChangeHandler(e, null, null, null) }}
                                                //value={this.state.AuditSource}
                                                className="form-control" />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 text-right mang-kpibtn">
                                            {/* <button type="button" className="btn btn-link mr-3">Cancel</button>
                                            <button type="submit" onClick={this.onSaveHandler} className="btn btn-primary">SAVE</button> */}
                                        </div>
                                        <div className="floats-toolbar">
                                            <i onClick={this.handleToolbarToggle} className="fas fa-ellipsis-v col-fontcontrol"></i>
                                            <div className={this.state.showToolbar ? "omp-toolbar" : "omp-toolbar-hide"}>
                                                <ul>
                                                    <li className="mb-3">
                                                        <i onClick={this.onSaveHandler} className="far fa-save fa-2x color123fc1" title="Save Audit "></i>
                                                    </li>
                                                    {/* <li className="mb-3">
                                                        <Link to={"/kpi-setting/"+this.props.KpiId+"/"+this.props.setId} className="far fa-times-circle fa-2x color123fc1" title="Cancel"></Link>
                                                    </li> */}
                                                    <li className="mb-3" style={{marginBottom : "5px !important;"}}>
                                                        <Link to={"/kpi-setting/"+this.props.KpiId+"/"+this.props.setId} className="far fa-arrow-alt-circle-left fa-2x color123fc1" title="Back"></Link>
                                                    </li>
                                                    <li className="mb-3">
                                                       <Link target="_blank" to={"/kpi-audit-excel-uploads/"+this.props.KpiId} className="fa fa-upload  fa-2x  color123fc1"  title="Import"></Link>
                                                    </li>
                                                    <li className="mb-0"> 
                                                        <Link className="fa fa-download  fa-2x  color123fc1"  onClick={this.exportDataHandler}></Link>
                                                    </li>
                                                    {/* <li>
                                                        <a href="#" onClick={(e) => this.addControlLever(e)} className="fas fa-plus-circle fa-2x color123fc1" title="Add Control Leaver"></a>
                                                    </li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="bg-white newkpi-form newkpi-form1">
                                <div className="card-header">
                                    KPI Audit Record for <strong>{this.props.kpiData.details && this.props.kpiData.details.length>0 ? this.props.kpiData.details[0].TargetBusinessOutcome : ""}</strong>
                                </div>
                                <div className="card-body manage-createKPI mb-4">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>KPI Initiation Date</label>
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <i className="fas fa-calendar-alt"></i>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="date"
                                                        readOnly
                                                        value={this.props.kpiData.details && this.props.kpiData.details.length>0 ? this.props.kpiData.details[0].KPIInitiationDate : ""}
                                                        className="form-control textbox-control dateControl-className-kpinew"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Business Outcome Target Date</label>
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <i className="fas fa-calendar-alt"></i>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="Date"
                                                        readOnly
                                                        value={this.props.kpiData.details && this.props.kpiData.details.length>0 ? moment(this.props.kpiData.details[0].BusinessOutComeTargetDate).format("YYYY-MM-DD") : ""}
                                                        className="form-control textbox-control dateControl-className-kpinew"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                       
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Audit Due Date</label>
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <i className="fas fa-calendar-alt"></i>
                                                        </div>
                                                    </div>
                                                    <input
                                                        type="Date"
                                                        readOnly
                                                        value={this.props.kpiData.details && this.props.kpiData.details.length>0 ? moment(this.props.kpiData.details[0].AuditDueDate).format("YYYY-MM-DD") : ""}
                                                        className="form-control textbox-control dateControl-className-kpinew"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Audit From Date</label>
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <i className="fas fa-calendar-alt"></i>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        onChange={(date) => this.kpiDateChangeHandler(date, "from")}
                                                        selected={this.state.FromDate ? this.state.FromDate : new Date()}
                                                        className="form-control textbox-control dateControl-className-kpinew"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Audit To Date</label>
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <i className="fas fa-calendar-alt"></i>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        onChange={(date) => this.kpiDateChangeHandler(date, "to")}
                                                        selected={this.state.ToDate ? this.state.ToDate : new Date()}
                                                        className="form-control textbox-control dateControl-className-kpinew"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Elapsed to Planned Audit Period</label>
                                                <input type="text" 
                                                    className={(this.elapsedDateCalculator() === "Audit Due")?"form-control is-invalid":"form-control"}
                                                    readOnly
                                                    value={this.elapsedDateCalculator()}
                                                    name="elapsed_date" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            {(this.state.kpiData.details && this.props.kpiData.details.length>0)?(this.state.kpiData.details[0].UnitOfMeasurementKIP === "PercentageQty" || this.state.kpiData.details[0].UnitOfMeasurementKIP === "quantity")?<label>Actual Quantity Growth Achieved </label>:<label>Actual Growth Achieved $ </label>:""}
                                                <input type="number" className="form-control"
                                                    name="growth_achieved"
                                                    value={this.state.growth_achieved}
                                                    onChange={(e) => { this.onChangeHandler(e, null, null, null) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group drop-form-control">
                                                <label>Persona Impacted</label>
                                                <input className="form-control"
                                                    name="persona"
                                                    value={this.state.persona}
                                                    onChange={(e) => { this.onChangeHandler(e, null, null, null) }}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    {/**/}
                                </div>
                            </div>


                        </div>

                        <div className="kpi-outcome-record"></div>
                        <div className="kpi-outcome-record mb-5">
                            <div className="bg-white newkpi-form">
                                <div className="card-header">
                                    Control Lever Outcome Metrics
                                </div>
                                <div className="card-body manage-createKPI mb-4">
                                    <div className="accordion-kpi" id="accordionExample">
                                        {controlleves}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    </div>


                <div className="audit-modal">
                    <div className="modal" id="myModal">
                        <div className="modal-dialog modal-lg" style={{maxWidth:1000}}>
                            <div className="modal-content">

                                {/* <!-- Modal Header --> */}
                                <div className="modal-header">
                                    <h4 className="modal-title">Audit History</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>

                                {/* <!-- Modal body --> */}
                                <div className="modal-body">
                                    <div className="table-responsive popup-table">
                                        <ReactTable
                                            data={this.props.auditHistory}
                                            columns={this.columns}
                                            minRows = {3}
                                            {...tableConfig}
                                        />
                                        { editAuditForm }
                                        { this.state.showAudit === true ? showAuditData:""}
                                        {/* <table className="table table-striped mb-0">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "5%" }}>Sr No.</th>
                                                    <th style={{ width: "19%" }}>Audit Name</th>
                                                    <th style={{ width: "19%" }}>From Date</th>
                                                    <th style={{ width: "19%" }}>To Date</th>
                                                    <th style={{ width: "19%" }}>Audit Entry Date</th>
                                                    <th style={{ width: "19%" }}>Actual Growth Archive</th>
                                                </tr>
                                            </thead>
                                            
                                            <tbody>
                                            {historyList}
                                            </tbody>
                                        </table> */}
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
            </KpiAtualOutcomeWrapper>,
            <ModalPopup isOpen={this.state.auditNamesPopUp} onSave={this.auditNameSave.bind(this)} toggle={this.toggleAuditNameModal.bind(this)} title="Audit Name" className="capability_modeling modal-lg" footer={true} saveBtnTitle={"SELECT"} disabled={false} >
                <div className="modal-body">
                    <div className="table-responsive popup-table">
                        <table className="table table-striped mb-0">
                            <thead>
                                <tr>
                                    <th style={{ width: "10%" }}></th>
                                    <th style={{ width: "90%" }}>Audit Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditNameList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ModalPopup> 
        ]
    }
}
const mapStateToProps = state => ({
    errors: state.errors,
    kpiData: state.kpiData.kpiAudit,
    auditTypes: state.kpiData.auditTypes,
    auditHistory: state.kpiData.auditHistory,
    auditNames : state.kpiData.auditNames,
    kpiAuditData:state.kpiData.kpiAuditData
});

export default withRouter(connect(mapStateToProps, { getKpiAudit, saveKpiAudit, getAuditTypes, getAuditHistory,getAuditNames,getKpiAuditData })(KpiActualOutCome));