import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import _ from "underscore";
import { UserProfileWrapper } from './Styling/Profile';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import ProfileSection  from './ProfileSection';
import ProfileForm  from './ProfileForm';
import { Link ,Redirect} from "react-router-dom";
import { responseMessage } from '../../utils/alert';
import {fetchUserProfile, fetchSecurityQuestions, saveSecurityQuestions, saveProfile} from '../../actions/profileActions';

class Profile extends Component {
    constructor (props){
        super (props);
        this.state = {
            ClientBusinessUnit: "",
            ClientParentCompany: "",
            FirstName: "",
            LastName: "",
            EmailAddress: "",
            PhoneNumber: "",
            ProfilePhoto: null,
            deletePhoto: false,
            questions: [],
            errors: {},
            customErrors:'',
            loading:true
        }
    }

    componentWillMount() {
        this.props.fetchUserProfile();
        this.props.fetchSecurityQuestions();
    }

    componentWillReceiveProps(nextProps) {
        
        if(Object.keys(nextProps.profile).length > 0 && Object.keys(nextProps.questions).length > 0 ) {
            
            this.setState({
                ...nextProps.profile,
                loading:false
            });
        }
        if(Object.keys(nextProps.saveprofile).length > 0 || Object.keys(nextProps.saveAnswers).length > 0){
          //  console.log(nextProps.saveAnswers);
            responseMessage("success",nextProps.saveAnswers.message, "");
            this.setState({
                loading:false
            })
        }
        if(Object.keys(nextProps.saveprofile).length > 0 || Object.keys(nextProps.saveAnswers).length > 0){
            //  console.log(nextProps.saveAnswers);
              responseMessage("success",nextProps.saveAnswers.message, "");
              this.setState({
                  loading:false
              })
          }
        if(Object.keys(nextProps.errors).length >0)
         {
          responseMessage("Error",nextProps.errors.message, "");
            this.setState({
                errors: nextProps.errors
            })
        }else{
            this.setState({
                errors: {}
            })
        }
    }

    handleInputChange(e, quesId) {        
        this.setState({customErrors:''});
        if(!quesId) {
            console.log(1);
            this.setState({
                [e.target.name]: e.target.value
            })
            
        }else{
            
            let questions = this.state.questions;
            
            const quesIndex = _.findIndex(questions, {QuestionID: quesId});
            if(quesIndex === -1) {
                questions.push({
                    QuestionID: quesId,
                    answer: e.target.value
                })
            }else{
                questions[quesIndex].answer = e.target.value;
            }
            this.setState({
                questions: questions
            })
        }
        console.log(this.state.questions.length);
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('FirstName',this.state.FirstName);
        formData.append('LastName',this.state.LastName);
        formData.append('ClientBusinessUnit',this.state.ClientBusinessUnit);
        formData.append('ClientParentCompany',this.state.ClientParentCompany);
        formData.append('PhoneNumber',this.state.PhoneNumber);
        formData.append('deletePhoto',this.state.deletePhoto);
        if(this.state.ProfilePhoto) {
            formData.append('ProfilePhoto', this.state.ProfilePhoto);
        }
        this.setState({
            loading:true
        })
        this.props.saveProfile(formData, this.props.history);
        setTimeout(this.props.fetchUserProfile(), 5000);
    }

    handleSecuritySubmit(e) {
        e.preventDefault();
           if(this.state.questions.length == 0){
              this.setState({customErrors:'please enter the required field'});
           }else{
            this.setState({customErrors:''}); 
       
                this.setState({
                    loading:true
                })
                this.props.saveSecurityQuestions(this.state.questions, this.props.history);
            }
    }

    onPhotoChange = e => {
        if(e.target.files.length > 0) {    
            const profilePhoto = e.target.files[0];
            this.setState({
                filePreview: URL.createObjectURL(profilePhoto),
                ProfilePhoto: profilePhoto
            })
        }
    }

    deleteProfilePhoto(e) {
        e.preventDefault();
        this.setState({
            ProfilePhoto: null,
            filePreview: null,
            ProfilePhotoPath: null,
            deletePhoto: true
        })
    }

    render(){
        const { errors } = this.state;
        return (
            [
            <DashboardHeader key="dashboard-header"></DashboardHeader>,
            <div id="wrapper" key="body-wrapper">
                <UserProfileWrapper id="content-wrapper" className="d-flex flex-column">
                    <div id="content">  
                        <ol className="breadcrumb dashbread">
                            <li className="breadcrumb-item active"><Link to="/dashboard">Home</Link></li>
                            <li className="breadcrumb-item">User Profile</li>
                            <li className="breadcrumb-menu d-md-down-none ml-auto">
                                <img src={ require('../../common/images/diva-icon.png') } className="logo-img" alt="Logo" />
                                <a className="btn powered p-0" href="#">
                                    <i className="icon-graph"></i> &nbsp;<i>Powered by Amploglobal</i>
                                </a>
                            </li>
                        </ol>                    
                        <div className="container-fluid container-dashboard">
                            <Row>
                                <Col sm="12" md="12" lg="12" xl="11" className="m-auto">
                                    <div className="user-profile-sec">
                                        <div className="card mt-4 mb-5">
                                            <div className="card-header d-flex justify-content-between">
                                                <span>Profile</span>
                                                <span className="position-relative helpwrap">
                                                    <a href="#" className="helpicon dropdown-toggle" id="helpBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="far fa-question-circle"></i></a>
                                                    <div className="dropdown-menu" aria-labelledby="helpBtn">
                                                        <p>Lorem Ipsum Dolor</p>
                                                    </div>
                                                </span>
                                            </div>
                                            <div className="card-body">
                                                <ProfileSection profile={this.state} filePreview={this.state.filePreview} />
                                                <ProfileForm profile={this.props.profile} handleInputChange={this.handleInputChange.bind(this)}  handleSubmit={this.handleSubmit.bind(this)} customErrors = {this.state.customErrors} error={errors} questions={this.props.questions} handleSecuritySubmit={this.handleSecuritySubmit.bind(this)} onPhotoChange={this.onPhotoChange.bind(this)} deleteProfilePhoto={this.deleteProfilePhoto.bind(this)} errors={this.state.errors} />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </UserProfileWrapper>
            </div>,
            <FooterComponent key="dashboard-footer"></FooterComponent>
            ]
        )
    }
};

Profile.propTypes = {
    fetchUserProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    fetchSecurityQuestions: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    saveSecurityQuestions: PropTypes.func,
    saveProfile: PropTypes.func,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile.profile,
    questions: state.profile.questions,
    saveprofile:state.profile.saveprofile,
    saveAnswers:state.profile.saveAnswers,
    errors: state.errors
});
export default connect(mapStateToProps, {fetchUserProfile, fetchSecurityQuestions, saveSecurityQuestions, saveProfile})(Profile);