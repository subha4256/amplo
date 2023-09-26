import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';
import { Label, Row, Col, Card, CardHeader, CardBody, Button } from 'reactstrap';
import Permissions from './KpiManagePermission';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import SidebarJs from '../../common/js/sidebarAnimation';
import { fetchKpiSets, fetchKpiSetList, fetchKpiSetUserById, fetchKpisAccess, fetchKpikUsers, saveKpiAccessPermissions } from '../../actions/kpiActions';
import { Global } from '../../utils/Env';

const config = require('../../config');

class ManageAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions: [],
            currentProject: "",
            currentUser: "",
            errors: {}
        }

        this.sidebarAnimation = new SidebarJs();

        this.setupCallback();
    }

    setupCallback() {

        this.sidebarAnimation.toggle();

        Global.callback.fetchKpiSetUserById_onComplete = () => {
            this.setState({
                currentUser: this.props.users[0].UserID
            })
            this.displayAccessDetails({  UserId: this.props.users[0].UserID, SetId: this.state.currentProject });
        }
    }

    displayAccessDetails(obj){
        this.props.fetchKpisAccess({ UserId: obj.UserId, SetId: obj.SetId })
    }

    handleCancel(e) {
        e.preventDefault();
    }

    componentDidMount() {
        
        this.props.fetchKpiSetList();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({
                errors: newProps.errors
            })
        }
    }

    handleProjectChange(e) {
        this.setState({
            currentProject: e.target.value,
            permissions: []
        })
        this.props.fetchKpiSetUserById(e.target.value);
    }

    handleUserChange(e) {
        this.setState({
            currentUser: e.target.value,
            permissions: []
        })
        this.displayAccessDetails({ UserId: e.target.value, SetId: this.state.currentProject })
    }

    handlePermissionChange(KPIID, permission) {
        const permissions = this.state.permissions;
        let domainIndex = _.findIndex(permissions, { KPIID: KPIID });
        if (domainIndex === -1) {
            permissions.push({
                KPIID: KPIID,
                AccessType: permission
            });
        } else {
            permissions[domainIndex].AccessType = permission;
        }
        this.setState({
            permissions: permissions
        })
    }

    handleSavePermissions() {
        let permissionObj = {
            inputJson: {
                KpiUserAccessId: this.props.domains.length > 0 ? this.props.domains[0].KpiUserAccessId: "",
                SetID: this.state.currentProject,
                UserID: (this.state.currentUser !== "") ? this.state.currentUser: this.props.users[0].UserID,
                KPIs: this.state.permissions
            }
        }
        this.props.saveKpiAccessPermissions(permissionObj);
    }

    render() {
        const Projects = this.props.projects.map(project => {
            if(project.DisableStatus != "Disabled"){
                return (
                    <option key={project.KPISetID} value={project.KPISetID}>{project.KPISetName}</option>
                )
            }
        })
        const kpiUsers = this.props.users.map(user => {
            return (
                <option key={user.UserID} value={user.UserID}>{user.FirstName}</option>
            )
        })
        return (
            [
                <DashboardHeader key="dashboard-header"></DashboardHeader>,
                <div id="wrapper" key="body-wrapper">
                    <DashboardSidebar></DashboardSidebar>
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <ol className="breadcrumb dashbread">
                                <li className="breadcrumb-item">Home</li>
                                <li className="breadcrumb-item">Manage</li>
                                <li className="breadcrumb-item">KPI</li>
                                <li className="breadcrumb-item active">Business Initiative Manage Access</li>
                                <li className="breadcrumb-menu d-md-down-none ml-auto">
                                    <img src={require('../../common/images/diva-icon.png')} className="logo-img" alt="Logo" />
                                    <a className="btn powered p-0" href="#">
                                        <i className="icon-graph"></i> &nbsp;
                                    <i>Powered by Amploglobal</i>
                                    </a>

                                </li>
                            </ol>
                            <div className="container-fluid container-dashboard">
                                <div>
                                    <h1 className="heading mt-3">Business Initiative Manage Access</h1>
                                    <Card className="manage-access-section">
                                        <CardHeader>
                                        Business Initiative Manage Access
                                    </CardHeader>
                                        <CardBody>
                                            <p className="card-text">Assign Business Initiative access to Users for the respective KPIs.</p>
                                            <div className="user-form-section col-sm-12 col-md-12 col-lg-10 p-0">
                                                <Row className="form-group">
                                                    <Col sm="12" md="6" lg="6" className="mb-1">
                                                        <Label>Business Initiative Name <span className="text-danger">*</span></Label>
                                                        <select className="form-control"  onChange={this.handleProjectChange.bind(this)}>
                                                            <option></option>
                                                            {Projects}
                                                        </select>
                                                    </Col>
                                                    <Col sm="12" md="6" lg="6">
                                                        <Label>User <span className="text-danger">*</span></Label>
                                                        <select className="form-control" value={this.state.currentUser} onChange={this.handleUserChange.bind(this)}>
                                                            {kpiUsers}
                                                        </select>
                                                    </Col>
                                                </Row>
                                                <Permissions domains={this.props.domains} handlePermissionChange={this.handlePermissionChange.bind(this)} />
                                                <Row className="form-group row-btn mt-4">
                                                    <Col sm="6">
                                                        <Button color="primary" className="mr-3" disabled={this.props.domains.length > 0?false:true} onClick={this.handleSavePermissions.bind(this)}>SAVE</Button>
                                                        <a href="#" onClick={(e) => this.handleCancel(e)}>Cancel</a>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                <FooterComponent key="dashboard-footer"></FooterComponent>
            ]
        )
    }
}

ManageAccess.propTypes = {
    errors: PropTypes.object.isRequired,
    fetchKpiSets: PropTypes.func.isRequired,
    fetchKpiSetList: PropTypes.func.isRequired,
    fetchKpiSetUserById: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
    fetchKpisAccess: PropTypes.func.isRequired,
    domains: PropTypes.array.isRequired,
    fetchKpikUsers: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    saveKpiAccessPermissions: PropTypes.func
}

const mapStateToProps = state => ({
    projects: state.kpiData.kpiSets,
    domains: state.kpiData.kpiAccessKpis,
    users: state.kpiData.kpiSetUser,
    errors: state.errors
});
export default connect(mapStateToProps, { fetchKpiSetList, fetchKpiSetUserById, fetchKpiSets, fetchKpisAccess, fetchKpikUsers, saveKpiAccessPermissions })(ManageAccess);