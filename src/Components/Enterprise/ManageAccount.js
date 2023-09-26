import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import _ from 'underscore';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { ManageAccountStyle } from './Styling/ManageAccount';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import SidebarJs from '../../common/js/sidebarAnimation';
import { fetchEnterpriseAccounts, approveAccount} from '../../actions/enterpriseActions';
import Loader  from '../Loader';
import AccountsTable from './AccountsTable';
import {responseMessage} from '../../utils/alert';
import CacheStorage from '../../utils/CacheStorage';
const config = require('../../config');
//.. Reviewed by Ashim: Need to implement LoadAPI > action-creator
class ManageAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            errors: {}
        }
        this.sidebarAnimation=new SidebarJs();
    }

    componentDidMount() {
        this.sidebarAnimation.toggle();
        this.props.fetchEnterpriseAccounts();
    }
    async approveHandler(e,data) {
        if(e === "Approve"){
            /* const headers = {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
            await axios.get(config.laravelBaseUrl+'approve/'+data.original.ClientID, {
                headers: headers
            }) */
            await axios.get(config.laravelBaseUrl+'approve/'+data.original.ClientID)
            .then(res => {
                responseMessage("success", "Approved successfully. It will take some time to create your account!", "");
                axios.get(config.laravelBaseUrl+'get-approve/'+data.original.ClientID);
            })
        }
        //this.props.approveAccount(data.original.ClientID);}
    }
    static getDerivedStateFromProps(newProps, prevState) {
        if(Object.keys(newProps.errors).length > 0) {
            return {
                errors: newProps.errors
            }
        }
        if(newProps.accounts.success) {
            return {
                loading: false
            }
        }
        return prevState;
    }

    render() {
        return (
            [
            <DashboardHeader key="dashboard-header"></DashboardHeader>,
            <div id="wrapper" key="body-wrapper">
                <DashboardSidebar></DashboardSidebar>
                <Loader loading={this.state.loading}/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <ol className="breadcrumb dashbread">
                            <li className="breadcrumb-item">Home</li>
                            <li className="breadcrumb-item">Manage</li>
                            <li className="breadcrumb-item active">Enterprise Account Management</li>
                            <li className="breadcrumb-menu d-md-down-none ml-auto">
                               <img src={ require('../../common/images/diva-icon.png') } className="logo-img" alt="Logo" />
                                <a className="btn powered p-0" href="#">
                                    <i className="icon-graph"></i> &nbsp;
                                    <i>Powered by Amploglobal</i>
                                </a>
                            </li>
                        </ol>
                        <div className="container-fluid container-dashboard">
                            <ManageAccountStyle className="user-content">
                                <h1 className="heading mt-3">Enterprise Account Management</h1>
                                <Card className="manage-access-section">
                                    <CardHeader className="d-flex justify-content-between">
                                        <span>Manage Enterprise Accounts</span>
                                        <span className="position-relative helpwrap">
                                            <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                                            <div className="dropdown-menu" aria-labelledby="helpBtn">
                                                <p>Lorem Ipsum Dolor</p>
                                            </div>
                                        </span>
                                    </CardHeader>
                                    <CardBody>
                                        <AccountsTable accounts={this.props.accounts.data}  approveHandler={this.approveHandler.bind(this)}/>
                                    </CardBody>
                                </Card>
                            </ManageAccountStyle>
                        </div>
                    </div>
                </div>
            </div>,
            <FooterComponent key="dashboard-footer"></FooterComponent>
            ]
        )
    }
}

ManageAccount.propTypes = {
    fetchEnterpriseAccounts: PropTypes.func.isRequired,
    approveAccount: PropTypes.func.isRequired,
    accounts: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    accounts: state.enterpriseData.accounts,
    errors: state.errors
});
export default connect(mapStateToProps, { fetchEnterpriseAccounts, approveAccount })(ManageAccount);