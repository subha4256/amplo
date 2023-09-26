import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import { TableWrapper } from './Styling/ManageTableStyling';
import { TopWrapper } from './Styling/ManageTopStyling';

import EditTeamUser from './EditTeamUser';

class EditTeam extends Component {
    constructor( props ){
        super( props )
    }

    render() {
        return(
            [
            <DashboardHeader></DashboardHeader>,
            // Add Dashboard Sidebar Here
            <div id="wrapper">
                 <DashboardSidebar></DashboardSidebar>*
                 
                 <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <ol className="breadcrumb dashbread">
                            <li className="breadcrumb-item">Home</li>
                            <li class="breadcrumb-item">Manage</li>
                            <li class="breadcrumb-item">Manage AmploFly 4.0 Team</li>
                            <li class="breadcrumb-menu d-md-down-none ml-auto">
                            {<img src={ require('./../../common/images/diva-icon.png') } class="logo-img" alt="Logo" /> }
                                <a class="btn powered p-0" href="#">&nbsp;<i>Powered by Amploglobal</i></a>
                            </li>
                        </ol>
                        <div class="container-fluid container-dashboard">
                            <div class="user-content">
                                <h1 class="heading mt-3">Manage AmploFly 4.0Team</h1>
                                    {/* Start Add/Edit user Section */}
                                    <EditTeamUser />
                                    
                                    {/* End Add/Edit user Section */}
                                    <div class="card table-section mt-4 mb-5">
                                        <div class="card-header">Manage AmploFly 4.0 Team</div>
                                        <div class="card-body">
                                            <div class="data-length">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item">Show</li>
                                                    <li class="list-inline-item">
                                                    <select class="form-control form-control-sm">
                                                        <option value="5">5</option>
                                                        <option value="10">10</option>
                                                        <option value="15">15</option>
                                                        <option value="20">20</option>
                                                    </select>
                                                    </li>
                                                    <li class="list-inline-item"><label>entries</label></li>

                                                    <li class="list-inline-item float-right">
                                                    <div class="search-container">
                                                        <form>
                                                            <input type="text" placeholder="Search" />
                                                            <button type="submit"><i class="fa fa-search"></i></button>
                                                        </form>
                                                    </div>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div class="manage-table table-responsive">
                                                <table class="table table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>User Name</th>
                                                            <th>Access Type</th>
                                                            <th>Status</th>
                                                            <th>Disable Date</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>First Last Name</td>
                                                            <td>Super User</td>
                                                            <td><span class="badge badge-success">Active</span></td>
                                                            <td>10/06/2019</td>
                                                            <td><a class="btn btn-info" href="#"><i class="fa fa-edit"></i></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>First Last Name</td>
                                                            <td>Secondary User</td>
                                                            <td><span class="badge badge-warning">Invitation Sent</span></td>
                                                            <td>15/09/2019</td>
                                                            <td><a class="btn btn-info" href="#"><i class="fa fa-edit"></i></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>First Last Name</td>
                                                            <td>User</td>
                                                            <td><span class="badge badge-danger">Disabled</span></td>
                                                            <td>Not Available</td>
                                                            <td><a class="btn btn-info" href="#"><i class="fa fa-edit"></i></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>First Last Name</td>
                                                            <td>2</td>
                                                            <td><span class="badge badge-success">Active</span></td>
                                                            <td>10/06/2019</td>
                                                            <td><a class="btn btn-info" href="#"><i class="fa fa-edit"></i></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>First Last Name</td>
                                                            <td>User</td>
                                                            <td><span class="badge badge-success">Active</span></td>
                                                            <td>10/06/2019</td>
                                                            <td><a class="btn btn-info" href="#"><i class="fa fa-edit"></i></a></td>
                                                        </tr>
                                                        <tr>
                                                            <td>First Last Name</td>
                                                            <td>Admin</td>
                                                            <td><span class="badge badge-success">Active</span></td>
                                                            <td>Not Available</td>
                                                            <td><a class="btn btn-info" href="#"><i class="fa fa-edit"></i></a></td>
                                                        </tr>
                                                    </tbody>    
                                                </table>
                                            </div>
                                            <div class="row text-center mt-4">
                                                <ul class="pagination m-auto">
                                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                                </ul>
                                            </div>


                                            
                                        </div>
                                    </div> 
                            </div>
                        </div>
                    </div>
                 </div>
            </div>,
            <FooterComponent></FooterComponent>
        ]
        )
    }
}
export default EditTeam;