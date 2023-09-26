import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Label, Input } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import moment from 'moment'
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import { TableWrapper } from './Styling/ManageTableStyling';
import { TopWrapper } from './Styling/ManageTopStyling';
import axios from 'axios';


const initialState ={
    FirstName:"",
    LastName:"",
    Email:"",
    UserTypeID:"",
    firstNameError:"",
    lastNameError:"",
    emailError:"",
    userTypeError:"",
    successMsg:"",
    userDetails:"",
}
class EditTeamUser extends Component {
    constructor( props ){
        super( props )
        
        this.state={
            DisableDate: "",//new Date(),
            successMsg:"",
            errors:{}
        }
    
    }
    handleChange = ( e ) =>{
        
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }
    handleDateChange = date => {
        this.setState({
            DisableDate: date
        });
    };
    componentDidMount(){
        
    }
    componentWillMount() {
        
        
    }
    componentWillReceiveProps( props ){
        const { getUserData,updateUser } = this.props.data;
       
       
        if( Object.keys(props.data.errors).length > 0){
            this.setState({
                errors: props.data.errors.data
            })
        }
        else if(props.data.updateUser.success===true){
            this.setState({
                successMsg:"User updated successfully"
            })
            this.setState( props.data.updateUser.data )
        }

        
        if( props.data.getUserData!= getUserData){
            this.setState( props.data.getUserData.data )
        }
      
    }
    validate() {
        let isError = false;

        let firstNameError = "";
        let lastNameError = "";
        let emailError = "";
        let userTypeError = "";

        const errors = {};
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            
        if (this.state.FirstName === '') {
            firstNameError = "First name is required"
        }
        if (this.state.LastName === '') {
            lastNameError = "Last name is required"
        }  
        if (this.state.Email === '') {
            emailError = "Email is required"
        }
        if( this.state.Email!="" && !mailformat.test( this.state.Email ) ){
            emailError = "You have entered an invalid email"
        }
        if (this.state.UserTypeID=== '') {
            userTypeError = "Access type is required"
        }
        if( firstNameError || lastNameError || emailError || userTypeError){
            this.setState({
                firstNameError, lastNameError, emailError, userTypeError
            })
            return false;
        }
        return true;
        
    }
    handleSaveClick =(e) => {
        //console.log( this.state)
        const isValid = this.validate();
        if (isValid) { 
            this.props.onClickhandleUpdateClick( this.state, this.actionInput.value )
        }
    }
    handleGoback = (e) =>{
        this.props.data.history.goBack()
    }
    render() {
        const { accessType,teamUser,getUserData } = this.props.data
        console.log(this.state.errors)
        return(
            <div className="card-body">
                <div className="alert alert-info mb-3">Complete the User info below and an invitation will be sent to the User.</div>
                <p className="card-text">Add more users to your enterprise account to collaborate.</p>
                <div id="successMsg"  style={{color:"green"}}> { this.state.successMsg!=undefined ? this.state.successMsg : '' } </div>
                <div className="user-form-section col-sm-12 col-md-12 col-lg-10 p-0">
                    <div className="form-group row">
                        <input type="hidden" name="UserDIVATeamID" defaultValue={ this.state.UserDIVATeamID } ref={(input) => { this.actionInput = input }} />
                        <div className="col-sm-6">
                            <Label>First Name <span className="text-danger">*</span></Label>  
                            <Input type="text" className="form-control"  ref={(input) => { this.actionFirstName = input }} defaultValue={ this.state.FirstName } id="FirstName" name="FirstName" onChange={this.handleChange}/>
                            <p className="text-danger">{ this.state.firstNameError}</p>
                            {Object.keys(this.state.errors).length > 0 && this.state.errors.first_name ? <p className="text-danger">{this.state.errors.first_name[0]}</p> : <></>}

                        </div>
                        <div className="col-sm-6">
                            <Label>Last Name <span className="text-danger">*</span></Label>
                            <Input type="text" className="form-control" defaultValue={ this.state.LastName } id="LastName" name="LastName" onChange={this.handleChange} />
                            <p className="text-danger">{ this.state.lastNameError}</p>
                            {Object.keys(this.state.errors).length > 0 && this.state.errors.last_name ? <p className="text-danger">{this.state.errors.last_name[0]}</p> : <></>}
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-6">
                            <Label>Email <span className="text-danger">*</span></Label>
                            <Input type="text" className="form-control" defaultValue={ this.state.Email } id="Email" name="Email" onChange={this.handleChange} />
                            <p className="text-danger">{ this.state.emailError}</p>
                            {Object.keys(this.state.errors).length > 0 && this.state.errors.email ? <p className="text-danger">{this.state.errors.email[0]}</p> : <></>}
                        </div>

                        <div className="col-sm-6">
                            <Label>Access Type* <span className="text-danger">*</span></Label>
                            <Input type="select" value={this.state.UserTypeID} className="form-control" id="UserTypeID" name="UserTypeID" onChange={this.handleChange}>
                                    <option value="DEFAULT" >--Select access type--</option>
                                    { 
                                        accessType.length > 0 ?
                                            accessType.map((access_type, index) => {
                                            return(
                                                <option  key={ index } value={ access_type.UserTypeID} > { access_type.UserTypeName}</option>
                                            )})
                                        :null
                                    }
                                   
                            </Input>
                            <p className="text-danger">{ this.state.userTypeError}</p>    
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-4">
                        <Label>Access Disable Date <span className="text-danger"></span></Label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                            <div className="input-group-text"><i className="far fa-calendar-alt"></i></div>
                            </div>
                            <DatePicker
                                className="form-control"
                                selected={
                                    this.state.DisableDate!=undefined &&  this.state.DisableDate!="" ? new Date( this.state.DisableDate) :  this.state.DisableDate
                
                                }
                                onChange={this.handleDateChange}
                                minDate={new Date()}
                            />
                        </div>
                        </div>
                    </div>
                    <div className="form-group row row-btn mt-4">
                        <div className="col-sm-6">
                        <button type="submit" className="btn btn-primary mr-3" onClick={this.handleSaveClick } >SAVE</button>
                        <Link to="/manage-team" >Cancel</Link>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default EditTeamUser;