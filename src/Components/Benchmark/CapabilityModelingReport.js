import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import { Button, Label } from 'reactstrap';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import BenchmarkHeader from './BenchmarkHeader';
import ReportGrid from './ReportGrid';
import ReportProcessSummary from './ReportProcessSummary';
import { BenchReportsWrapper } from './Styling/BenchReport';
import { fetchFunctionalGrid } from '../../actions/reportActions';
import axios from 'axios';
import CacheStorage from '../../utils/CacheStorage';
import {errorAlert,responseMessage} from '../../utils/alert';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';
const config = require('../../config');

//.. Ashim: Need to implement LoadAPI

class CapabilityModelingReport extends Component {
	constructor(props) {
        super(props);
        this.state = {
            project_id:this.props.match.params.id,
        }
    }

    async handleFetchFunctionalGrid(functionId, phaseId) {
        try {
            const headers = {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
            let gridData = await axios.get(config.laravelBaseUrl+'getDecompositionReportProcessRanking/'+this.state.project_id+'/'+functionId+'/'+phaseId, {
                headers: headers
            });
            this.props.fetchFunctionalGrid(gridData);
        }catch(error) {
            this.setState({
                loading: false
            });
            if(error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        }
    }
    downloadpdfReport = () => {
        domtoimage.toPng(document.getElementsByClassName('downloadPdfReport')[0])
        .then(function (dataUrl) {
            console.log('CLECKED')
            const pdf = new jsPDF('p','mm',[960,850]);
            pdf.addImage(dataUrl, 'PNG', 10, 10, 275, 320);
            pdf.save("download.pdf");  
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
      }
    render () {
        return (
            [
                <DashboardHeader key="dashboard-header"></DashboardHeader>,
                <div id="wrapper" key="body-wrapper">
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <ol className="breadcrumb dashbread">
                                <li className="breadcrumb-item active"><Link to="/dashboard">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/reports">Reports</Link></li>
                                <li className="breadcrumb-item">Capability Modeling</li>
                                <li className="breadcrumb-menu d-md-down-none ml-auto">
                                    <img src={ require('./../../common/images/diva-icon.png') }  className="logo-img" alt="Logo" />
                                    <a className="btn powered p-0" href="#">&nbsp;<i>Powered by Amploglobal</i></a>
                                </li>
                            </ol>
                            <div className="container-fluid container-dashboard">
                                <div className="row">
                                    <BenchReportsWrapper className="col-sm-12 col-md-12 col-lg-11 col-xl-11 m-auto">
                                         <BenchmarkHeader onDownload={this.downloadpdfReport}/>
                                         <div className="downloadPdfReport">
                                        <ReportProcessSummary projectId={this.state.project_id} />
                                        <ReportGrid projectId={this.state.project_id} fetchFunctionalGrid={this.handleFetchFunctionalGrid.bind(this)} gridData={this.props.gridData.data} />
                                    </div>
                                    </BenchReportsWrapper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                <FooterComponent key="dasboard-footer"></FooterComponent>
            ]
        );
    }
}
CapabilityModelingReport.propTypes = {
    fetchFunctionalGridData: PropTypes.func,
    gridData: PropTypes.object
}

const mapStateToProps = state => ({
    gridData: state.report.gridData,
});
export default connect(mapStateToProps, { fetchFunctionalGrid })(CapabilityModelingReport);