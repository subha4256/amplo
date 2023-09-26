import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'underscore';

import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import { KpiSettingWrapper, KpiCreateWrapper, KpiDetailWrapper } from './Styling/KpiSetting';
import  KpiList  from './KpiList';
import  KpiCreate  from './KpiCreate';
import KpiCreateModified from './KpiCreateModified';
import KpiActualOutcome from './KpiActualoutcome';
import  KpiDetail  from './KpiDetail';

class KpiSetting extends Component {
    constructor (props){
        super (props);
        this.state = {
            action: this.props.match.params.action,
            detailAction: this.props.action,
            setId: this.props.match.params.kpiSetId,
            KpiId: this.props.match.params.KpiId
        }
    }
    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            action: nextProps.match.params.action,
            detailAction: nextProps.action,
            setId: nextProps.match.params.kpiSetId,
            KpiId: nextProps.match.params.KpiId
        })
    }
    renderActionView() {
        console.log('this.state.action',this.state.action)
        if(!this.state.action) {
            return (
                <KpiSettingWrapper>
                    <KpiList />
                </KpiSettingWrapper>
            )
        }else{
            if(Number.isInteger(parseInt(this.state.action))) {
                
                return (
                        <KpiCreateModified action={this.state.action} setId={this.state.setId} createNewKpi={false}  />
                )
            }else{
                if(this.state.action === 'create') {
                    return (
                            <KpiCreateModified setId={this.state.setId} createNewKpi={true} />
                    )
                }
                else if(this.state.action === 'audit') {
                    return (
                            <KpiActualOutcome setId={this.state.setId} KpiId={this.state.KpiId}/>
                    )
                }
            }
        }
    }
    render(){
        return (
            [
            <DashboardHeader key="dashboard-header"></DashboardHeader>,
            <div id="wrapper" key="body-wrapper">
                <DashboardSidebar></DashboardSidebar>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        {/* Breadcrumb */}    
                        <ol className="breadcrumb dashbread">
                            <li className="breadcrumb-item active"><Link to="/dashboard">Home</Link></li>
                            <li className="breadcrumb-item">Performance Measuring</li>
                            <li className="breadcrumb-menu d-md-down-none ml-auto">
                                <span className="position-relative helpwrap">
                                    <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                                    <div className="dropdown-menu" aria-labelledby="helpBtn">
                                        <p>Lorem Ipsum Dolor</p>
                                    </div>
                                </span>
                            </li>
                            <li className="breadcrumb-menu d-md-down-none">
                            {<img src={ require('./../../common/images/diva-icon.png') } className="logo-img" alt="Logo" /> }
                                <a className="btn powered p-0" href="#">
                                    <i className="icon-graph"></i> &nbsp;<i>Powered by Amploglobal</i>
                                </a>
                           
                            </li>
                        </ol>
                        {/* End Breadcrumbs */}
                    
                        <div className="container-fluid container-dashboard">
                            {this.renderActionView()}
                        </div>
                                    
                    </div>
                </div>
            </div>,
            <FooterComponent key="dashboard-footer"></FooterComponent>
            ]
        )
    }
}
KpiSetting.propTypes = {
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
});
export default connect(mapStateToProps, {  })(KpiSetting);