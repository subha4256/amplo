import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'underscore';
import axios from 'axios';
import moment from 'moment';
import { ManageAccountDetailStyle } from './Styling/ManageAccount';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import SidebarJs from '../../common/js/sidebarAnimation';
import { fetchIndustryData, fetchRegions, fetchCountries, fetchInitialStates, fetchStates, fetchInitialCities, fetchCities } from '../../actions/companyActions';
import { fetchClientDetails, updateAccount, fetchIndustries } from '../../actions/enterpriseActions';
import AccountDetailForm from './AccountDetailForm';
import {errorAlert, successAlert,responseMessage} from '../../utils/alert';
import CacheStorage from '../../utils/CacheStorage';
const config = require('../../config');

//.. Reviewed by Ashim: Need to implement LoadAPI > action-creator

class ManageAccountDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            clientId: this.props.match.params.id,
            clientDetail: {},
            errors: {}
        }
        this.sidebarAnimation=new SidebarJs();
    }

    async componentDidMount() {
        try{
            const headers = {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
            let industryVerticalData = await axios.get(config.laravelBaseUrl+'get_industry_vertical_subvertical', {
                headers: headers
            });
            this.props.fetchIndustryData(industryVerticalData);
            let industryData = await axios.get(config.laravelBaseUrl+'industry-collection', {
                headers: headers
            });
            this.props.fetchIndustries(industryData);
            let regionData = await axios.get(config.laravelBaseUrl+'get_regions', {
                headers: headers
            })
            this.props.fetchRegions(regionData);
            let countryData = await axios.get(config.laravelBaseUrl+'get_countries', {
                headers: headers
            });
            this.props.fetchCountries(countryData);
            
            let clientData = await axios.get(config.laravelBaseUrl+'getClientDetails/'+this.state.clientId, {
                headers: headers
            });
            this.props.fetchClientDetails(clientData);
            this.setState({
                clientDetail: this.props.clientDetail
            });
            let clientDetailObj = {};
            if(this.props.clientDetail && Object.keys(this.props.clientDetail).length > 0) {
                let subVerticalArr = _.findWhere(this.props.industries, {IndustryVerticalID: this.props.clientDetail.IndustryVerticalID});
                clientDetailObj = this.props.clientDetail;
                if (subVerticalArr != undefined){
                this.setState({
                    industrySubVertical: subVerticalArr.subverticals
                });}
                const country = clientDetailObj.Country;
                // let stateData = await axios.get(config.laravelBaseUrl+'get_states/'+country, {
                //     headers: headers
                // })
                // console.log(stateData);
                this.props.fetchInitialStates(country);
                // get cities arr
                const state = clientDetailObj.StateTerritory;
                // let citiesData = await axios.get(config.laravelBaseUrl+'get_cities/'+state, {
                //     headers: headers
                // });
                // console.log(citiesData)
                this.props.fetchInitialCities(state);
            }
            this.setState({
                loading: false,
                errors: {}
            })
            this.sidebarAnimation.toggle();
        }catch(error) {
            this.setState({
                loading: false
            });
            if(error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            throw error;
        }
    }

    static getDerivedStateFromProps(newProps, prevState) {
        if(newProps.clientDetail.success) {
            return {
                loading: false
            }
        }
        if(newProps.updateAccountStatus) {
            if(Object.keys(newProps.updateAccountStatus).length > 0){
                responseMessage("success", newProps.updateAccountStatus.message, "");
                return({
                    loading:false,
                    errors: {}
                })
            }
        }
        if(Object.keys(newProps.errors).length > 0){
            return({
                errors: newProps.errors,
                loading:false
            })
        }
        return prevState;
    }

    handleInputChange(e) {
        let clientData = this.state.clientDetail;
        clientData[e.target.name] = e.target.value;
        this.setState({
            clientDetail: clientData
        })
    }

    handleExpiryChange(date) {
        let clientData = this.state.clientDetail;
        clientData.EndDate = date;
        this.setState({
            clientDetail: clientData
        })
    }
    handleEffectiveChange(date) {
        let clientData = this.state.clientDetail;
        clientData.StartDate = date;
        this.setState({
            clientDetail: clientData
        })
    }
    handleFirstAuditChange(date) {
        let clientData = this.state.clientDetail;
        clientData.FirstAuditDate = moment(date).format("YYYY-MM-DD");
        this.setState({
            clientDetail: clientData
        })
    }
    handleRecentAuditChange(date) {
        let clientData = this.state.clientDetail;
        clientData.RecentAuditDate = moment(date).format("YYYY-MM-DD");
        this.setState({
            clientDetail: clientData
        })
    }
    handleIndustryChange(e) {
        if(e.target.value !== "") {
            let subVerticalArr = _.findWhere(this.props.industries, {IndustryVerticalID: e.target.value});
            let clientDetail = this.state.clientDetail;
            clientDetail[e.target.name] = e.target.value;
            this.setState({
                clientDetail: clientDetail,
                industrySubVertical: subVerticalArr.subverticals
            });
        }else{
            let clientDetail = this.state.clientDetail;
            clientDetail[e.target.name] = e.target.value;
            this.setState({
                clientDetail: clientDetail,
                industrySubVertical: []
            });
        }
    }
    handleCountryChange(e) {
        if(e.target.value !== "") {
            this.props.fetchStates(e.target.value);
        }
        let clientDetail = this.state.clientDetail;
        clientDetail.Country = e.target.value;
        this.setState({
            clientDetail: clientDetail
        },() => {
            console.log(this.state.clientDetail)
        });
    }

    handleStateChange(e) {
        if(e.target.value !== "") {
            this.props.fetchCities(e.target.value);
        }
        let clientDetail = this.state.clientDetail;
        clientDetail[e.target.name] = e.target.value;
        this.setState({
            clientDetail: clientDetail
        });
    }

    onPhotoChange = e => {
        if(e.target.files.length > 0) {    
            const companyPhoto = e.target.files[0];
            let clientDetail = this.state.clientDetail;
            clientDetail.CompanyLogo = companyPhoto;
            this.setState({
                clientDetail: clientDetail,
                filePreview: URL.createObjectURL(companyPhoto)
            })
        }
    }

    deleteCompanyLogo() {
        let clientDetail = this.state.clientDetail;
        clientDetail.CompanyLogo = null;
        clientDetail.deletePhoto = true;
        this.setState({
            clientDetail: clientDetail,
            filePreview: null
        })
}

    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            loading:true
        });
        const formData = new FormData();
        formData.append('ClientID',this.state.clientId);
        formData.append('IndustryID',this.state.clientDetail.IndustryID);
        formData.append('ClientName',this.state.clientDetail.ClientName);
        formData.append('IndustryVerticalID',this.state.clientDetail.IndustryVerticalID);
        formData.append('IndustrySubVerticalID',this.state.clientDetail.IndustrySubVerticalID);
        formData.append('NoOfEmployees',this.state.clientDetail.NoOfEmployees);
        formData.append('CountryRegionCodeID',this.state.clientDetail.CountryRegionCodeID);
        formData.append('Address1',this.state.clientDetail.Address1);
        formData.append('Address2',this.state.clientDetail.Address2);
        formData.append('Country',this.state.clientDetail.Country);
        formData.append('StateTerritory',this.state.clientDetail.StateTerritory);
        formData.append('City',this.state.clientDetail.City);
        formData.append('PostalCode',this.state.clientDetail.PostalCode);
        formData.append('AuditFrequency',this.state.clientDetail.AuditFrequency);
        formData.append('SubscriptionKey',this.state.clientDetail.SubscriptionKey);
        formData.append('StartDate',this.state.clientDetail.StartDate);
        formData.append('EndDate',this.state.clientDetail.EndDate);
        formData.append('FirstAuditDate',this.state.clientDetail.FirstAuditDate);
        formData.append('RecentAuditDate',this.state.clientDetail.RecentAuditDate);
        formData.append('FirstName',this.state.clientDetail.FirstName);
        formData.append('LastName',this.state.clientDetail.LastName);
        formData.append('EmailAddress',this.state.clientDetail.EmailAddress);
        formData.append('deletePhoto',this.state.clientDetail.deletePhoto);
        if(this.state.clientDetail.CompanyLogo) {
            formData.append('CompanyLogo', this.state.clientDetail.CompanyLogo);
        }
        this.props.updateAccount(formData, this.props.history);
    }

    render() {
        // console.log(this.props)
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
                            <li className="breadcrumb-item">Enterprise Account Management</li>
                            <li className="breadcrumb-item active">Client Details</li>
                            <li className="breadcrumb-menu d-md-down-none ml-auto">
                               <img src={ require('../../common/images/diva-icon.png') } className="logo-img" alt="Logo" />
                                <a className="btn powered p-0" href="#">
                                    <i className="icon-graph"></i> &nbsp;
                                    <i>Powered by Amploglobal</i>
                                </a>
                            </li>
                        </ol>
                        <div className="container-fluid container-dashboard">
                            <ManageAccountDetailStyle className="user-content">
                                <AccountDetailForm clientDetail={this.props.clientDetail} handleInputChange={this.handleInputChange.bind(this)} handleIndustryChange={this.handleIndustryChange.bind(this)} handleCountryChange={this.handleCountryChange.bind(this)} handleStateChange={this.handleStateChange.bind(this)} handleExpiryChange={this.handleExpiryChange.bind(this)} handleEffectiveChange={this.handleEffectiveChange.bind(this)} handleFirstAuditChange={this.handleFirstAuditChange.bind(this)} handleRecentAuditChange={this.handleRecentAuditChange.bind(this)} industries={this.props.industries} marketIndustries={this.props.marketIndustries} industrySubVertical={this.state.industrySubVertical} regions={this.props.regions} countries={this.props.countries} states={this.props.states} cities={this.props.cities} onPhotoChange={this.onPhotoChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} errors={this.state.errors} filePreview={this.state.filePreview}  deleteCompanyLogo={this.deleteCompanyLogo.bind(this)} />
                            </ManageAccountDetailStyle>
                        </div>
                    </div>
                </div>
            </div>,
            <FooterComponent key="dashboard-footer"></FooterComponent>
            ]
        )
    }
}

ManageAccountDetail.propTypes = {
    fetchIndustryData: PropTypes.func.isRequired,
    industries: PropTypes.array.isRequired,
    fetchIndustries: PropTypes.func.isRequired,
    marketIndustries: PropTypes.array.isRequired,
    fetchRegions: PropTypes.func.isRequired,
    regions: PropTypes.array.isRequired,
    fetchCountries: PropTypes.func.isRequired,
    countries: PropTypes.array.isRequired,
    fetchInitialStates: PropTypes.func.isRequired,
    states: PropTypes.array.isRequired,
    fetchStates: PropTypes.func.isRequired,
    fetchCities: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    fetchInitialCities: PropTypes.func.isRequired,
    fetchClientDetails: PropTypes.func.isRequired,
    clientDetail: PropTypes.object.isRequired,
    updateAccount: PropTypes.func.isRequired,
    updateAccountStatus:PropTypes.object,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    industries: state.company.industries,
    marketIndustries: state.enterpriseData.marketIndustries,
    regions: state.company.regions,
    countries: state.company.countries,
    states: state.company.states,
    cities: state.company.cities,
    clientDetail: state.enterpriseData.clientDetail,
    errors: state.errors
});
export default connect(mapStateToProps, { fetchClientDetails, fetchIndustries, fetchIndustryData, fetchRegions, fetchCountries, fetchInitialStates, fetchStates, fetchCities, fetchInitialCities, updateAccount })(ManageAccountDetail);