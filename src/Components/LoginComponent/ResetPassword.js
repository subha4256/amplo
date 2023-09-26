import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {  Form, Label, Col, FormGroup, Input, Button } from 'reactstrap';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import { ResetPasswordWrapper } from './Styling/ResetPassword';
import { resetPassword } from '../../actions/userActions';
import { Global } from '../../utils/Env'
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirm_password: "",
            match1: false,
            match2: false,
            match3: false,
            match4: false,
            passMatch: false,
            emailToken: this.props.match.params.token,
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        Global.callback.resetPassword_onComplete = () => {
            this.props.history.push("/login");
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
        if(nextProps.resetData){
            if(nextProps.resetData.status === "Success") {
                this.props.history.push("/login");
            }
        }
    }
    
    onChange(e) {
        if(e.target.name === 'password') {
            const password = e.target.value;
            // 8-16 char atleast 1 number and 1 char
            if(/^(?=.*[A-Za-z])[A-Za-z\d]{8,16}$/.test(password)) {
                this.setState({
                    match1: true
                });
            }else{
                this.setState({
                    match1: false
                });
            }

            // 8.16 chars at least one letter, one number
            if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(password)) {
                this.setState({
                    match2: true
                });
            }else{
                this.setState({
                    match2: false
                });
            }

            // 8.16 chars at least one letter, one number, one lowercase
            if(/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test(password)) {
                this.setState({
                    match3: true
                });
            }else{
                this.setState({
                    match3: false
                });
            }

            // 8.16 chars at least one letter, one number, one uppercase
            if(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test(password)) {
                this.setState({
                    match4: true
                });
            }else{
                this.setState({
                    match4: false
                });
            }

            // 8-16 chars and special char
            if(/^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(password)) {
                this.setState({
                    match5: true
                });
            }else{
                this.setState({
                    match5: false
                });
            }
            
            // 8.16 chars at least one letter, one number, one special character, one lowercase, one uppercase
            if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!+%*_\-^:#?&])[A-Za-z\d@$!+%*_\-^:#?&]{8,16}$/.test(password)) {
                this.setState({
                    match1: true,
                    match2: true,
                    match3: true,
                    match4: true,
                    match5: true
                });
            }else{
                this.setState({
                    match5: false
                });
            }
        }
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.state.password === this.state.confirm_password) {
            this.setState({
                passMatch: true
            }, function(){
                if(this.state.match1 && this.state.match2 && this.state.match3 && this.state.match4 && this.state.match5 && this.state.passMatch) {
                    const resetData = {
                        email_token: this.state.emailToken,
                        password: this.state.password,
                        confirm_password: this.state.confirm_password
                    }
                    this.props.resetPassword(resetData);
                }else{
                    this.setState({
                        errors: {
                            message: "Please match the pattern."
                        }
                    })
                }
            });
        }else{
            this.setState({
                passMatch: false,
                errors: {
                    message: "Password & Confirm Password do not match."
                }
            })
        }
    }
    render() {
        return(
            [
                <DashboardHeader></DashboardHeader>,
                <ResetPasswordWrapper id="login-wrapper">
                    <div className="container-fluid container-reset">
                        <div className="reset-password-row">
                            <div className="reset-password-content">
                                <Col sm="12">
                                    <div className="divition"></div>
                                    <h2 className="mt-5 mb-4">Reset password</h2>
                                    <div className="reset-container">
                                        <Form onSubmit={this.onSubmit}>
                                            <div className="form-group">
                                                <Label>Enter New Password <span className="text-danger">*</span></Label>
                                                <Input type="password" className="form-control" placeholder="Password" name="password" onChange={this.onChange} />
                                            </div>
                                            <FormGroup>
                                                <Label>Re-enter Password <span className="text-danger">*</span></Label>
                                                <Input type="password" className="form-control" placeholder="Confirm Password" name="confirm_password" onChange={this.onChange} />
                                                {Object.keys(this.state.errors).length > 0 ? <p className="text-danger">{this.state.errors.message}</p> : <></> }
                                            </FormGroup>

                                            <FormGroup className="mt-3">
                                                <Input type="submit" className="btn btn-primary" value="SAVE" />
                                                <Link to="/login" className="return-link ml-3">Cancel</Link>
                                            </FormGroup>
                                        </Form>
                                        <div className="reset-right">
                                            <p><b>Password Must:</b></p>
                                            <p>{
                                                this.state.match1 ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>
                                            }Must be at least 8 characters in length, with a maximum of 16 characters.<br />
                                            {
                                                this.state.match2 ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>
                                            }Must include at least one letter and one number.<br />
                                            {
                                                this.state.match3 ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>
                                            }Must include one lower case letter.<br />
                                            {
                                                this.state.match4 ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>
                                            }Must include one upper case letter.<br />
                                            {
                                                this.state.match5 ? <i className="fas fa-check text-success mr-2"></i> : <i className="fas fa-times text-danger mr-2"></i>
                                            }Must include at least one special characters (such as "!" "&" and "+") 
                                            Password is case-sensitive.
                                            </p>
                                            <p><b>Password Must NOT:</b></p>
                                            <p>Must not be previously used passwords.</p>
                                        </div>
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </div>
                </ResetPasswordWrapper>
            ]
        )
    }
}

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired,
    resetData: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    resetData: state.user.resetData,
    errors: state.errors
});
export default connect(mapStateToProps, {resetPassword})(ResetPassword);