import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';
import { Label, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import ReportPermissions from './ReportPermissions';
import { BenchmarkManageAccess } from '../Styling/ManageAccess';
import DashboardHeader from "../../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../../includes/dashboardFooter/FooterComponent';
import SidebarJs from '../../../common/js/sidebarAnimation';
import { Link } from 'react-router-dom';
import { fetchUsers, fetchReports, saveReportsAccess } from '../../../actions/reportAccessActions';

class ManageReportsAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            currentUser: "",
            permissions: [],
            errors: {}
        }
        this.sidebarAnimation=new SidebarJs();
    }

    componentWillMount() {
        this.props.fetchUsers();
    }

    componentDidMount() {
        this.sidebarAnimation.toggle();
    }

    componentWillReceiveProps(newProps) {
        if(newProps.errors) {
            this.setState({
                errors: newProps.errors
            })
        }
        if(Object.keys(newProps.users).length > 0 && newProps.users.MessageCode === 200 && newProps.users !== this.props.users) {
            this.props.fetchReports(newProps.users.data[0].UserID);
            this.setState({
                loading: false,
                currentUser: newProps.users.data[0].UserID
            })
        }
    }

    handleUserChange(e) {
        this.setState({
            currentUser: e.target.value
        }, function() {
            this.props.fetchReports(this.state.currentUser);
        })
    }

    handlePermissionChange(serviceId, reportId, checked) {
        let permissions = this.state.permissions;
        if(checked) {
            this.props.reports.data.map((report, key) => {   
                let serviceIndex = _.findIndex(permissions, {ServiceID: serviceId, ReportID: reportId});
                if(serviceIndex === -1){                    
                    permissions.push({
                        ServiceID: serviceId,
                        ReportID: reportId,
                        AccessType: 1
                    });
                }else{
                    permissions[serviceIndex].AccessType = 1;
                }
                if(report.ServiceID != serviceId && report.report.ReportID != reportId){
                    let serviceIndex1 = _.findIndex(permissions, {ServiceID: report.ServiceID, ReportID: report.report.ReportID});
                    if(serviceIndex1 === -1){ 
                        permissions.push({
                            ServiceID: report.ServiceID,
                            ReportID: report.report.ReportID,
                            AccessType: 0
                        });
                    }
                }
            })
        }else{
            permissions.map((report, key) => {
                let serviceIndex = _.findIndex(permissions, {ServiceID: serviceId, ReportID: reportId, AccessType: 1});
                if(serviceIndex === key){
                    report.AccessType = 0;
                }
            })
            //permissions.splice(serviceIndex, 1);
        }
        this.setState({
            permissions: permissions
        })
    }

    handleSavePermissions() {
        let permissionObj = {
            UserID: this.state.currentUser,
            permissions: this.state.permissions
        }
        this.props.saveReportsAccess(permissionObj);
    }

    render() {
        let users = [];
        // console.log(typeof this.props.users);
        if(typeof this.props.users === 'object'){
        if(Object.keys(this.props.users).length > 0) {
            // console.log(this.props.users);
            users = this.props.users.data.map((user, key) => {
                return (
                    <option key={'userOpt-'+user.UserID} value={user.UserID}>{[user.FirstName,user.LastName].join(' ')}</option>
                )
            })
        }
    }
        return (
            [
            <DashboardHeader key="dashboard-header"></DashboardHeader>,
            <div id="wrapper" key="body-wrapper">
                <DashboardSidebar></DashboardSidebar>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <ol className="breadcrumb dashbread">
                            <li className="breadcrumb-item active"><Link to="/dashboard">Home</Link></li>
                            <li className="breadcrumb-item">Manage</li>
                            <li className="breadcrumb-item active">Reports & Analytics</li>
                            <li className="breadcrumb-menu d-md-down-none ml-auto">
                               <img src={ require('../../../common/images/diva-icon.png') } className="logo-img" alt="Logo" />
                                <a className="btn powered p-0" href="#">
                                    <i className="icon-graph"></i> &nbsp;
                                    <i>Powered by Amploglobal</i>
                                </a>
                                
                            </li>
                        </ol>
                        <div className="container-fluid container-dashboard">
                            <BenchmarkManageAccess className="user-content">
                                <h1 className="heading mt-3">Reports & Analytics</h1>
                                <Card className="manage-access-section">
                                    <CardHeader>
                                    Manage User Access for Reports & Analytics
                                    </CardHeader>
                                    <CardBody>
                                        <p className="card-text">Assign Reports access to Users for the respective Modules. By default view access will be provided to all modules.</p>
                                        <div className="user-form-section col-sm-12 col-md-12 col-lg-10 p-0">
                                            <Row className="form-group">
                                                <Col sm="12" md="6" lg="6">
                                                    <Label>User <span className="text-danger">*</span></Label>
                                                    <select className="form-control" onChange={this.handleUserChange.bind(this)}>
                                                        {users}
                                                    </select>
                                                </Col>
                                            </Row>
                                            <ReportPermissions reports={this.props.reports.data} handlePermissionChange={this.handlePermissionChange.bind(this)} />
                                            <Row className="form-group row-btn mt-4">
                                                <Col sm="6">
                                                    <Button color="primary" className="mr-3" onClick={this.handleSavePermissions.bind(this)}>SAVE</Button>
                                                    <a href="#">Cancel</a>
                                                </Col>
                                            </Row>
                                        </div>
                                    </CardBody>
                                </Card>
                            </BenchmarkManageAccess>
                        </div>
                    </div>
                </div>
            </div>,
            <FooterComponent key="dashboard-footer"></FooterComponent>
            ]
        )
    }
}

ManageReportsAccess.propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
    fetchReports: PropTypes.func.isRequired,
    reports: PropTypes.object.isRequired,
    saveReportsAccess: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    users: state.reportAccess.users,
    reports: state.reportAccess.reports,
    errors: state.errors
});
export default connect(mapStateToProps, { fetchUsers, fetchReports, saveReportsAccess })(ManageReportsAccess);