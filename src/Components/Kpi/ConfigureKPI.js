import React,{Component} from 'react';
import KpiAssocation from './KpiAssocation';
import DashboardHeader from '../includes/dashboardHeader/DashboardHeader';
import DashboardSidebar from '../includes/dashboardSidebar/DashboardSidebar';
import { KpiSetCreateWrapper } from './Styling/KpiSetCreate';
import { getKpiAssociation, fetchKpiUserList, fetchKpiSetList, fetchBcsList,GetCo2EmmisionType, saveKpiSet, fetchKpiSetById, saveBscCategory} from '../../actions/kpiActions';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
class ConfigureKPI extends Component{
    constructor(props){
super(props);
    }
    componentDidMount(){
        this.props.fetchKpiUserList();
        this.props.fetchKpiSetList();
        this.props.fetchBcsList();
        this.props.GetCo2EmmisionType();
        // this.props.getKpiAssociation
    }
    render(){
        return(
        <>
        <DashboardHeader/>
        <div id="wrapper">
            <DashboardSidebar/>
            <KpiSetCreateWrapper>
            <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="container-fluid container-dashboard">
              <div className="user-content">
                  <div className="row">
                      <div className="col-md-12">
                <KpiAssocation/>
                </div>
                </div>
                </div>
                </div>
                </div>
                </div>
            </KpiSetCreateWrapper>
        </div>
        </>
        )
    }
}
const mapStateToProps = state => ({
    kpiSetList: state.kpiData.kpiSets,
    userList: state.kpiData.kpiUsers,
    kpiBsc: state.kpiData.kpiBsc,
    kpiCo2EmmusiontypeData:state.kpiData.kpiCo2EmmusiontypeData,
    kpiSetSave: state.kpiData.kpiSetSave,
    kpiSetDetails: state.kpiData.kpiSetDetails,
    errors: state.errors
  });
export default connect(mapStateToProps, { getKpiAssociation, fetchKpiUserList, fetchKpiSetList, fetchBcsList,GetCo2EmmisionType, saveKpiSet, fetchKpiSetById, saveBscCategory})(withRouter(ConfigureKPI));