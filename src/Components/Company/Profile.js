import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import { CompanyProfileWrapper } from './Styling/Profile';
import ProfileForm from './ProfileForm';
import { fetchIndustryData, fetchRegions, fetchCountries, fetchInitialStates, fetchStates, fetchInitialCities, fetchCities, fetchQuestions, updateCompanyProfile, fetchCompanyProfile } from '../../actions/companyActions';
import SidebarJs from '../../common/js/sidebarAnimation';
import _ from 'underscore';
import {Global} from '../../utils/Env';
import {errorAlert, successAlert, responseMessage} from '../../utils/alert';
import { returnStatement } from '@babel/types';


//.. Reviewed by Ashim: Need to implement LoadAPI > action-creator

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            industries: [],
            industrySubVertical: [],
            regions: [],
            countries: [],
            states: [],
            cities: [],
            questions: [],
            profileData: {
                industry_vertical: "",
                industry_subvertical: "",
                employees: "",
                region: "",
                CompanyLogo: "",
                deletePhoto: false,
                address1: "",
                address2: "",
                country: "",
                state: "",
                city: "",
                pincode: "",
                profile_questions: []
            },
            errors: {},
            loading:true
        }
        this.sidebarAnimation=new SidebarJs();

        this.setupCallback();
    }

    setupCallback(){
 
        //.. Setup callback functions
        Global.callback.fetchCompanyProfile_onComplete = () => {
            this.props.fetchStates(this.props.profileData.country);
            this.props.fetchCities(this.props.profileData.state);
            //this.props.fetchQuestions();
        }
        
        this.timer = setInterval(() =>{
            if(!this.props.loading){
                clearInterval(this.timer);
                //let subVerticalArr = _.find(this.props.industries, {IndustryVerticalID: this.props.profileData.industry_vertical});
                //let subVerticalArr = this.props.industries.find((element) => { element === this.props.profileData.industry_vertical });
                this.setState({
                    profileData: this.props.profileData
                });
                this.sidebarAnimation.toggle();
            } 
        }, 1000);
    }

    static getDerivedStateFromProps (newProps, prevState) {
        // if(Object.keys(newProps.errors).length > 0 && this.props.errors !== newProps.errors) {
        //     this.setState({
        //         errors: newProps.errors,
        //         loading: false
        //     }, function() {
        //         console.log(this.state.errors)
        //     })
        // }
        let returnObj = {...prevState}
        if(newProps.industries != ""){
            for(let i = 0; i < newProps.industries.length; i++){
                if(prevState.profileData){
                    if(newProps.industries[i].IndustryVerticalID == prevState.profileData.industry_vertical){
                        returnObj.industrySubVertical = newProps.industries[i].subverticals
                    }
                }
            }
        }
        return returnObj;
        // if(Object.keys(newProps.updateCompanyProfileStatus).length > 0){
        //     responseMessage("success", newProps.updateCompanyProfileStatus.message, "");
        //     return({
        //         loading:false,
        //         errors: {}
        //     })
        // }
        // if(Object.keys(newProps.errors).length > 0){
        //     return({
        //         errors: newProps.errors,
        //         loading:false
        //     })
        // }
        // return prevState;
    }
    
    componentDidMount() {
        
        this.props.fetchCompanyProfile();
        this.props.fetchIndustryData();
        this.props.fetchCountries();
        this.props.fetchRegions();
        
        /*try{
            const headers = {
                "authorization": "Bearer " + CacheStorage.getItem("userToken")
            }
            let industryData = await axios.get(config.laravelBaseUrl+'get_industry_vertical_subvertical', {
                headers: headers
            });
            this.props.fetchIndustryData(industryData);
            let regionData = await axios.get(config.laravelBaseUrl+'get_regions', {
                headers: headers
            })
            this.props.fetchRegions(regionData);
            let countryData = await axios.get(config.laravelBaseUrl+'get_countries', {
                headers: headers
            })
            this.props.fetchCountries(countryData);

           
            let profileData = await axios.get(config.laravelBaseUrl+'get_company_profile', {
                headers: headers
            })
            this.props.fetchCompanyProfile(profileData);
            this.setState({
                profileData: this.props.profileData
            })
            // get sub vertical arr
            let profileArr = {};
            if(this.props.profileData && Object.keys(this.props.profileData).length > 0) {
                let subVerticalArr = _.findWhere(this.props.industries, {IndustryVerticalID: this.props.profileData.industry_vertical});
                profileArr = this.props.profileData;
                this.setState({
                    industrySubVertical: subVerticalArr.subverticals
                });
                // fetch states arr
                const country = profileArr.country;
                let stateData = await axios.get(config.laravelBaseUrl+'get_states/'+country, {
                    headers: headers
                })
                this.props.fetchInitialStates(stateData);
                
                // get cities arr
                const state = profileArr.state;
                let citiesData = await axios.get(config.laravelBaseUrl+'get_cities/'+state, {
                    headers: headers
                });
                this.props.fetchInitialCities(citiesData);
            }else{
                let quesData = await axios.get(config.laravelBaseUrl+'get_profiling_question', {
                    headers: headers
                });
                this.props.fetchQuestions(quesData);
                profileArr.profileData = {
                    profile_questions: this.props.questions
                }
            }
            this.setState({...this.state, ...profileArr, loading: false});
            if(Object.keys(this.props.errors).length > 0) {
                this.setState({
                    errors: this.props.errors,
                    loading: false
                })
            }
            this.sidebarAnimation.toggle();
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
        }*/
    }

    handleInputChange(e) {
        let profileData = this.state.profileData;
        profileData[e.target.name] = e.target.value;
        this.setState({
            profileData: profileData
        });
    }

    handleCountryChange(e) {
        //try{
            if(e.target.value !== "") {
                this.props.fetchStates(e.target.value);
            }
            let profileData = this.state.profileData;
            profileData[e.target.name] = e.target.value;
            this.setState({
                profileData: profileData
            });
        /*}catch(error) {
            this.setState({
                loading: false
            });
            if(error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        } */
    }

    handleStateChange(e) {
        //try{
            if(e.target.value !== "") {
                this.props.fetchCities(e.target.value);
            }
            let profileData = this.state.profileData;
            profileData[e.target.name] = e.target.value;
            this.setState({
                profileData: profileData
            });
        /*}catch(error) {
            this.setState({
                loading: false
            });
            if(error.response) {
                responseMessage("error", error.response.data.message, "");
                return;
            }
            responseMessage("error", "Something Went Wrong!", "");
            throw error;
        } */
    }

    handleIndustryChange(e) {
        if(e.target.value !== "") {
            let subVerticalArr = _.find(this.props.industries, {IndustryVerticalID: e.target.value});
            let profileData = this.state.profileData;
            profileData[e.target.name] = e.target.value;
           

            this.setState({
                profileData: profileData,
                industrySubVertical: subVerticalArr.subverticals
            });
        }else{
            let profileData = this.state.profileData;
            profileData[e.target.name] = e.target.value;
            this.setState({
                profileData: profileData,
                industrySubVertical: []
            });
        }
    }

    handleQuestionChange(e, QuestionId) {
        let quesArr = this.state.profileData.profile_questions;
        this.state.profileData.profile_questions.map(question => {
            if(question.question_id == QuestionId) {
                let quesFind = _.findIndex(quesArr, {question_id: QuestionId});
                if(quesFind !== -1) {
                    quesArr[quesFind].answer = e.target.value
                }else{
                    quesArr.push({
                        "question_id": QuestionId,
                        "answer": e.target.value
                    });
                }
            }
        })
        let profileData = this.state.profileData;
        profileData.profile_questions = quesArr;
        this.setState({
            profileData: profileData
        });
    }

    onPhotoChange = e => {
        if(e.target.files.length > 0) {    
            const companyPhoto = e.target.files[0];
            let profileData = this.state.profileData;
            profileData.CompanyLogo = companyPhoto;
            this.setState({
                profileData: profileData,
                filePreview: URL.createObjectURL(companyPhoto)
            })
        }
    }

    deleteCompanyLogo() {
            let profileData = this.state.profileData;
            profileData.CompanyLogo = null;
            profileData.deletePhoto = true;
            this.setState({
                profileData: profileData,
                filePreview: null
            })
    }
    handleValidation(){
        let fields = this.state.profileData;
        
        let errors = {};
        let formIsValid = true;
            //First Name
        if(!fields["employees"]){
            
            formIsValid = false;
            errors["employees"] = "Please enter employees";
        }   
        if(!fields["industry_vertical"]){
            formIsValid = false;
            errors["industry_vertical"] = "Please select  Industry Vertical";
        }
        if(!fields["industry_subvertical"]){
            formIsValid = false;
            errors["industry_subvertical"] = "Please select  Industry sub Vertical";
        }
        if(!fields["region"]){
            formIsValid = false;
            errors["region"] = "Please select  region";
        }
        if(!fields["address1"]){
            formIsValid = false;
            errors["address1"] = "Please enter  address1";
        }
        if(!fields["state"]){
            formIsValid = false;
            errors["state"] = "Please select state";
        }
        if(!fields["country"]){
            formIsValid = false;
            errors["country"] = "Please select country";
        }
        if(!fields["city"]){
            formIsValid = false;
            errors["city"] = "Please select city";
        }
        if(!fields["pincode"]){
            formIsValid = false;
            errors["pincode"] = "Please enter zipcode";
        }
        this.setState({errors: errors});
        return formIsValid;
    }
 
    handleSubmit(e) {
        e.preventDefault();
        
      if(this.handleValidation()){
        try {
            this.setState({
                loading:true
            })
            const formData = new FormData();
            formData.append('industry_vertical',this.state.profileData.industry_vertical);
            formData.append('industry_subvertical',this.state.profileData.industry_subvertical);
            formData.append('employees',this.state.profileData.employees);
            formData.append('region',this.state.profileData.region);
            formData.append('address1',this.state.profileData.address1);
            formData.append('address2',this.state.profileData.address2);
            formData.append('country',this.state.profileData.country);
            formData.append('state',this.state.profileData.state);
            formData.append('city',this.state.profileData.city);
            formData.append('pincode',this.state.profileData.pincode);
            formData.append('profile_questions', JSON.stringify(this.state.profileData.profile_questions));
            formData.append('deletePhoto',this.state.profileData.deletePhoto);
            if(this.state.profileData.CompanyLogo) {
                formData.append('CompanyLogo', this.state.profileData.CompanyLogo);
            }
            this.props.updateCompanyProfile(formData, this.props.history);
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
    }
    
    render() {
        return (
            [
            <DashboardHeader key="dashboard-header"></DashboardHeader>,
            <div id="wrapper" key="body-wrapper">
                <DashboardSidebar></DashboardSidebar>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <ol className="breadcrumb dashbread">
                            <li className="breadcrumb-item active">Company Profile</li>
                            <li className="breadcrumb-menu d-md-down-none ml-auto">
                            {<img src={ require('./../../common/images/diva-icon.png') } className="logo-img" alt="Logo" /> }
                                <a className="btn powered p-0" href="#">
                                    <i className="icon-graph"></i> &nbsp;
                                    <i>Powered by Amploglobal</i>
                                </a>
                               
                            </li>
                        </ol>
                        <div className="container-fluid container-dashboard">
                            <CompanyProfileWrapper>
                                <Row className="bench-top-sec mt-4">
                                    <Col sm="12" md="12" lg="10" className="company-profile-sec mb-5">
                                        <div className="card table-section mt-4 mb-5">
                                            <div className="card-header d-flex justify-content-between">
                                                <span>Company Profile</span>
                                                <span className="position-relative helpwrap">
                                                    <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                                                    <div className="dropdown-menu" aria-labelledby="helpBtn">
                                                        <p>Lorem Ipsum Dolor</p>
                                                    </div>
                                                </span>
                                            </div>
                                            <div className="card-body">
                                                <ProfileForm industries={this.props.industries} industrySubVertical={this.state.industrySubVertical} regions={this.props.regions} countries={this.props.countries} states={this.props.states} cities={this.props.cities} handleCountryChange={this.handleCountryChange.bind(this)} handleStateChange={this.handleStateChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} handleInputChange={this.handleInputChange.bind(this)} handleIndustryChange={this.handleIndustryChange.bind(this)}  handleQuestionChange={this.handleQuestionChange.bind(this)} profileData={this.state.profileData} onPhotoChange={this.onPhotoChange.bind(this)} deleteCompanyLogo={this.deleteCompanyLogo.bind(this)} filePreview={this.state.filePreview} errors={this.state.errors} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CompanyProfileWrapper>
                        </div>
                    </div>
                </div>
            </div>,
            <FooterComponent key="dashboard-footer"></FooterComponent>
            ]
        )
    }
}

Profile.propTypes = {
    fetchIndustryData: PropTypes.func.isRequired,
    industries: PropTypes.array.isRequired,
    fetchRegions: PropTypes.func.isRequired,
    regions: PropTypes.array.isRequired,
    fetchCountries: PropTypes.func.isRequired,
    countries: PropTypes.array.isRequired,
    fetchStates: PropTypes.func.isRequired,
    states: PropTypes.array.isRequired,
    fetchCities: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    fetchQuestions: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    fetchCompanyProfile: PropTypes.func.isRequired,
    profileData: PropTypes.object,
    updateCompanyProfile: PropTypes.func,
    updateCompanyProfileStatus:PropTypes.object,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    loading: state.api.isLoadingData,
    industries: state.company.industries,
    regions: state.company.regions,
    countries: state.company.countries,
    states: state.company.states,
    cities: state.company.cities,
    questions: state.company.questions,
    profileData: state.company.profileData,
    updateCompanyProfileStatus:state.company.updateCompanyProfileStatus,
    errors: state.errors
});
export default connect(mapStateToProps, { fetchIndustryData, fetchRegions, fetchCountries, fetchStates, fetchInitialStates, fetchCities, fetchInitialCities, fetchQuestions, updateCompanyProfile, fetchCompanyProfile })(withRouter(Profile));