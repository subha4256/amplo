import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import { ReportsWrapper } from './Styling/Reports';
import { fetchServices, moduleService, moduleParameter, emptyModules } from '../../actions/reportActions';
import axios from 'axios';
import CacheStorage from '../../utils/CacheStorage';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { ReactComponent as RoadmapImg } from '../../common/images/ic_roadmap1.svg';
import { ReactComponent as LifeRing } from '../../common/images/ic_DT.svg';
import { Global } from '../../utils/Env';
import Axios from 'axios';

const config = require('../../config');

//.. Reviewed by Ashim: Need to implement LoadAPI > action-creator

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {

            selectedModule: '',
            type: '',
            benchMarkCount: null,
            capabilityCount: null,
            kpiCount: null,
            fromDate: null,
            toDate: null,
            isModuleSelected: false,
            isSelectParameter: false,
            reportType: 0,
            selectedReportName: "",
            financialYears:[],
            selectedYear: ''
        }

        Global.callback.moduleService_onComplete = () => {
            /* this.setState({ 
                isModuleSelected: true
            }, ()=>{
                console.log('isModuleSelected updated');
            }); */
            console.log('moduleService_onComplete');
        }
    }

    componentDidMount() {
        this.getServicesCount(1);
        this.getServicesCount(2);
        this.getServicesCount(3);
        this.props.emptyModules();
        Axios.get(`${config.laravelBaseUrl}getFinancialYear`, {
            headers: {
                authorization: "Bearer " + sessionStorage.getItem("userToken"),
            },
        })
            .then((res) => {
                console.log("RES =>", res);
        
                this.setState({
                    ...this.state , 
                    financialYears: res.data.data.FinancialYear,
                    selectedYear: res.data.data.FinancialYear.at(-1).CombinedYear
                    ,
                })
               
            })
            .catch((error) => console.log(error));
    }

    async getServicesCount(currentService) {

        const headers = {
            "authorization": "Bearer " + CacheStorage.getItem("userToken")
        }
        await axios.get(config.laravelBaseUrl + 'get_service_count/' + currentService, {
            headers: headers
        })
            .then(res => {
                const count = res.data.data;
                if (currentService == 1) {
                    this.setState({
                        'benchMarkCount': count
                    })
                } else if (currentService == 2) {
                    this.setState({
                        'capabilityCount': count
                    })
                } else if (currentService == 3) {
                    this.setState({
                        'kpiCount': count
                    })
                }
                console.log(count);
            });
    }


    //.. Module selection
    selectModule = (e, selectedModule) => {
        let type = "";
        if (selectedModule == 1) {
            type = "benchmark-report";
        } else if (selectedModule == 2) {
            type = "capability-report";
        } else if (selectedModule == 3) {
            type = "balanced-scorecard/report";
        } else if (selectedModule == 4) {
            type = "balanced-scorecard/report";
        }
        this.setState({

            type: type,

            isModuleSelected: false,

            isSelectParameter: false,
            currentParameter: null,
            selectedModule: selectedModule,
            fromDate: null,
            toDate: null
        });

        this.props.moduleService(selectedModule);
    }

    handleChangeReport = (ev) => {
        if (ev.target.value !== 0 && ev.target.value !== '') {
            let [reportName, selectedReport] = ev.target.value.split("||")
            this.props.moduleParameter(reportName);
            this.setState({
                isModuleSelected: true,
                reportType: reportName,
                selectedReportName:selectedReport
            }, () => {
                console.log("moduleParameter");
            });
        }
    }

    handleChangeParameter = (ev) => {
        this.setState({
            isSelectParameter: true,
            currentParameter: ev.target.value
        })
    }
    fromDateChangeHandler = Date => {
        this.setState({
            fromDate: Date,
            toDate: null
        })
    }
    toDateChangeHandler = Date => {
        this.setState({
            toDate: Date
        })
    }
    renderModule() {
        return (
            <div className="form-group row">
                <Col sm="5">
                    <label>Report Name</label>
                    <select className="form-control" onChange={this.handleChangeReport}>
                        <option value="">Select Report</option>
                        {
                            this.props.services.map(service =>
                                <option key={service.ServicesID} value={service.ServicesID + "||" + service.ServicesName}

                                >{service.ServicesName}</option>
                            )
                        }
                    </select>
                </Col>
            </div>)
    }

    renderParameter() {
        console.log("State Reports", this.state)
        return (
            <>
                {this.props.parameter.length === 0 ? null :
                    (<div className={this.state.isModuleSelected === true ? "form-group row" : "form-group row d-none"}>
                        <Col sm="5">
                            <label>Parameters</label>
                            <select className="form-control" onChange={this.handleChangeParameter}>
                                <option value="">Select Report Project</option>
                                {
                                    this.props.parameter.map(parameter =>
                                        <option key={parameter.ProjectID} value={parameter.ProjectID}>{parameter.ReportTitle}</option>
                                    )
                                }
                            </select>
                            {(this.state.reportType == 4) ?
                                <div className="form-inline mt-3">
                                    <label>From</label>
                                    <DatePicker
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                        }}
                                        className="form-control border-secondary py-2 dis-date"
                                        id="fromDate"
                                        // minDate={new Date()}
                                        onChange={this.fromDateChangeHandler}
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.fromDate}
                                        autoComplete="off"
                                    />
                                    <label>To</label>
                                    <DatePicker
                                        onKeyDown={event => {
                                            event.preventDefault();
                                            return false;
                                        }}
                                        className="form-control border-secondary py-2 dis-date"
                                        id="toDate"
                                        // minDate={new Date(this.state.fromDate?this.state.fromDate:'')}
                                        onChange={this.toDateChangeHandler}
                                        dateFormat="dd/MM/yyyy"
                                        selected={this.state.toDate}
                                        autoComplete="off"
                                    /></div> : ""}
                        </Col>
                    </div>)}
            </>
        )
    }


    handleFinancialYear = () => {
           return (
            <div className="form-group row">

            <Col sm="5">
            <label>Financial Year</label>
            <select className="form-control" onChange={(e) => this.setState({...this.state , selectedYear: e.target.value})}>
            <option value="">Select Financial Year</option>
            {
                this.state.financialYears .map(parameter =>
                    <option key={parameter.ID} value={parameter.CombinedYear}>{parameter.CombinedYear}</option>
                    )
                }
        </select>
        </Col>
         </div>
           )
    }


    handleRunSubmit = () => {

        let id = this.state.currentParameter

        console.log(this.state.selectedReportName)

        switch (this.state.selectedReportName) {
            case "Business Discovery Report":
               this.props.history.push(`/reports/benchmark-report/${id}`)
                break;

            case "Performance Summary":
            this.props.history.push(`/reports/performance-report/${id}`)
        
           break;
             case "KPI Dashboard":
                  this.props.history.push(`/reports/kpi-reports/${id}/${this.state.selectedYear}`)
            break;
            case "Strategy Assessment 1":
                this.props.history.push(`/reports/strategy-reports-one/${id}`)
            
            break;
            case "Strategy Assessment 2":
            this.props.history.push(`/reports/strategy-reports-two/${id}`)
        
            break;
            case "Strategy Assessment 3":
            this.props.history.push(`/reports/strategy-reports-three/${id}`)
        
            break;
            case "Revenue Growth Management":
            this.props.history.push(`/reports/revenue-one/${id}/${this.state.selectedYear}`)
        
            break;
            case "Revenue Growth Management 2":
            this.props.history.push(`/reports/revenue-two/${id}`)
        
            break;
            case "Revenue Growth Management 3":
            this.props.history.push(`/reports/revenue-three/${id}`)
            break;
            case "Heatmap Analysis":
            this.props.history.push(`/reports/heatmap-analysis/${id}`)
            break;

            // case "Operations Management":
            //     this.props.history.push(`/reports/operationManagment/${id}`)
            // break;
            // case "People Management":
            //     this.props.history.push(`/reports/peopleManagment/${id}`)
            //     break;
            // case "Transformation Projects":
            //     this.props.history.push(`/reports/transformation/${id}`)
            //     break;  
            //     case "Digital Adoption & Financial Management":
            //         this.props.history.push(`/reports/digitalManagement/${id}`)
            //         break;        
             default:
             break;
        }
     
        
    }

    render() {

        console.log("Props =>", this.props)

        return (
            [
                <DashboardHeader key="dashboard-header"></DashboardHeader>,
                <div id="wrapper" key="body-wrapper">
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <ol className="breadcrumb dashbread">
                                <li className="breadcrumb-item active"><Link to="/dashboard">Home</Link></li>
                                <li className="breadcrumb-item">Reports</li>
                                <li className="breadcrumb-menu d-md-down-none ml-auto">
                                    <span className="position-relative helpwrap">
                                        <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                                        <div className="dropdown-menu" aria-labelledby="helpBtn">
                                            <p>Lorem Ipsum Dolor</p>
                                        </div>
                                    </span>
                                </li>
                                <li className="breadcrumb-menu d-md-down-none">
                                    <img src={require('../../common/images/diva-icon.png')} className="logo-img" alt="Logo" />
                                    <a className="btn powered p-0" href="#">&nbsp;<i>Powered by Amploglobal</i></a>
                                </li>
                            </ol>
                            <ReportsWrapper className="container-fluid container-dashboard">
                                <Row>
                                    <Col sm="12" md="12" lg="10" xl="8" className="m-auto">
                                        <div className="bg-white report-sec">
                                            <h1 className="heading">Pick a module to view<br />
                                                your industry 4.0 reports</h1>
                                            <div className="module-container selection">
                                                <div className={this.state.selectedModule === 1 ? "module-box bg-blue active" : "module-box bg-blue"} onClick={(e) => this.selectModule(e, 1)}>
                                                    <div className="top-icon">
                                                        <i className="far fa-edit"></i>
                                                    </div>
                                                    <div className="content-sec bg-dark-blue">
                                                        <p><i>Amp</i>Marking</p>
                                                        <p className="sm-txt">{this.state.benchMarkCount} Reports</p>
                                                    </div>
                                                </div>

                                                <div className={this.state.selectedModule === 2 ? "module-box bg-yellow active" : "module-box bg-blue"} onClick={(e) => this.selectModule(e, 2)}>
                                                    <div className="top-icon">
                                                        <i className="fas fa-border-all"></i>
                                                    </div>
                                                    <div className="content-sec bg-dark-yellow ">
                                                        <p>Capability Modeling</p>
                                                        <p className="sm-txt">{this.state.capabilityCount} Reports</p>
                                                    </div>
                                                </div>

                                                <div className={this.state.selectedModule === 3 ? "module-box bg-green active" : "module-box bg-green"} onClick={(e) => this.selectModule(e, 3)}>
                                                    <div className="top-icon">
                                                        <i className="fas fa-cogs"></i>
                                                    </div>
                                                    <div className="content-sec bg-dark-green">
                                                        <p>Performance Measuring</p>
                                                        <p className="sm-txt">{this.state.kpiCount} Reports</p>
                                                    </div>
                                                </div>

                                                <div  className={this.state.selectedModule === 4 ? "module-box bg-red active" : "module-box bg-red"} onClick={(e) => this.selectModule(e, 4)}>
                                                    <div className="top-icon">
                                                        {/* <i class
                                                        Name="far fa-life-ring"></i> */}
                                                        <LifeRing />
                                                    </div>
                                                    <div className="content-sec bg-dark-red">
                                                        <p>Design Thinking</p>
                                                        <p className="sm-txt">4 Reports&nbsp;&nbsp;<span className="badge bg-red">New</span></p>
                                                    </div>
                                                </div>

                                                <div className="module-box bg-blue">
                                                    <div className="top-icon">
                                                        <i className="fas fa-map"></i>
                                                        {/* <RoadmapImg />  */}
                                                    </div>
                                                    <div className="content-sec bg-dark-blue">
                                                        <p>Roadmap</p>
                                                        <p className="sm-txt">2 Reports</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="report-form">
                                                {this.renderModule()}
                                                {this.renderParameter()}
                                                { ["Revenue Growth Management" , "KPI Dashboard"].includes( this.state.selectedReportName)  &&  this.handleFinancialYear()}
                                                <div className="form-group row">
                                                    <Col sm="5">
                                                        <Link
                                                            //  to={this.state.type + "/" + this.state.currentParameter + ((this.state.fromDate) ? "/" + moment(this.state.fromDate).format("YYYY-MM-DD") : "") + ((this.state.toDate) ? "/" + moment(this.state.toDate).format("YYYY-MM-DD") : "")} 

                                                            className={this.state.isSelectParameter === true ? "" : "d-none"} >

                                                            <button
                                                                onClick={this.handleRunSubmit}
                                                                type="button" disabled={(this.state.reportType == 4) ? (this.state.toDate && this.state.fromDate) ? false : true : false} className={this.state.isSelectParameter === true ? "btn btn-primary" : "btn btn-primary disabled"}>RUN REPORT</button>

                                                        </Link>
                                                    </Col>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </ReportsWrapper>
                        </div>
                    </div>
                </div>,
                <FooterComponent />
            ]
        )
    }
}
Reports.propTypes = {
    fetchServices: PropTypes.func.isRequired,
    moduleService: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    services: state.report.currentModule,
    parameter: state.report.currentModuleParameter,
})
export default connect(mapStateToProps, { emptyModules, fetchServices, moduleService, moduleParameter })(Reports);
//export default Reports;