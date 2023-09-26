import React, { Component } from 'react'; 
import { Button, Label, Input } from 'reactstrap';

//import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from '../includes/dashboardFooter/FooterComponent';
import { TableWrapper } from './Styling/ManageTableStyling';
import { TopWrapper } from './Styling/ManageTopStyling';

var divStyle = {
    margin:"0px 0 0px 0px",
    width:"100%"
};
const initialState ={
    first_name:"",
    last_name:"",
    email:"",
    user_type:"",
    firstNameError:"",
    lastNameError:"",
    emailError:"",
    userTypeError:"",
    successMsg:""
}
class AddTeamUser extends Component {
    constructor( props ){
        super( props )
        this.state = initialState;
    }
    componentWillReceiveProps( props ){
        //console.log(props.data.teamUser.success)
       if(props.data.teamUser.success===true){
            this.setState({
                successMsg:"Enterprise data added"
            })
       }
       if(props.resetData === true){
        this.setState({
            first_name:"",
            last_name:"",
            email:"",
            user_type:"",
            firstNameError:"",
            lastNameError:"",
            emailError:"",
            userTypeError:"",
            successMsg:""
        })
        props.resetDataChangeHandler.bind(this)
       }
    }
    handleChange = ( e ) =>{
        
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }
    validate() {
        let isError = false;

        let firstNameError = "";
        let lastNameError = "";
        let emailError = "";
        let userTypeError = "";

        const errors = {};
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (this.state.first_name === '') {
            firstNameError = "First name is required"
        }
        if (this.state.last_name === '') {
            lastNameError = "Last name is required"
        }  
        if (this.state.email === '') {
            emailError = "Email is required"
        }
        if( this.state.email!="" && !mailformat.test( this.state.email ) ){
            emailError = "You have entered an invalid email"
        }
        if (this.state.user_type=== '') {
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
        const isValid = this.validate();
        if (isValid) {
            //this.setState( initialState )
            this.props.onClickhandleSaveClick( this.state )
        }
    }
    handleGoback = (e) =>{
        this.props.data.history.goBack()
    }
    render() {
        const { accessType,teamUser } = this.props.data
        // console.log(this.state,"inAddUser");
        return(
                <div className="card-body">
                    <div className="alert alert-info mb-3">Complete the User info below and an invitation will be sent to the User.</div>
                    <p className="card-text">Add more users to your enterprise account to collaborate.</p>
                    <div id="successMsg"  style={{color:"green"}}> { this.state.successMsg} </div>
                    <div className="user-form-section col-sm-12 col-md-12 col-lg-10 p-0">
                        <div className="form-group row">
                            <div className="col-sm-6">
                                <Label>First Name <span className="text-danger">*</span></Label>  
                                <Input type="text" className="form-control" placeholder="" id="first_name" name="first_name" onChange={this.handleChange} value={this.state.first_name} />
                                <div style={{color:"red"}}>{ this.state.firstNameError}</div>
                            </div>
                            <div className="col-sm-6">
                                <Label>Last Name <span className="text-danger">*</span></Label>
                                <Input type="text" className="form-control" placeholder="" id="last_name" name="last_name" onChange={this.handleChange} value={this.state.last_name} />
                                <div style={{color:"red"}}>{ this.state.lastNameError}</div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-sm-6">
                                <Label>Email <span className="text-danger">*</span></Label>
                                <Input type="text" className="form-control" placeholder="" id="email" name="email" onChange={this.handleChange} value={this.state.email}/>
                                <div style={{color:"red"}}>{ this.state.emailError}</div>
                            </div>

                            <div className="col-sm-6">
                                <Label>Access Type* <span className="text-danger">*</span></Label>
                                <Input type="select" className="form-control" id="user_type" name="user_type" onChange={this.handleChange} value={this.state.user_type}>
                                    <option value="" >--Select access type--</option>
                                    { 
                                        accessType.length > 0 ?
                                        accessType.map((access_type, index) => (
                                         <option key={ index } value={ access_type.UserTypeID} > { access_type.UserTypeName}</option>
                                        )):null
                                    }
                                   
                                </Input>
                                <div style={{color:"red"}}>{ this.state.userTypeError}</div>
                            </div>
                        </div>
                         
                        <div className="form-group row row-btn mt-4">
                            <div className="col-sm-6">
                            <button type="submit" className="btn btn-primary mr-3" onClick={this.handleSaveClick }>SEND INVITATION</button>
                            {/* <a href="#" onClick={ this.handleGoback }>Cancel</a> */}
                            </div>
                        </div>

                    </div>
                </div>   
        )
    }
}
export default AddTeamUser;