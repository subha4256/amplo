import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Label, Col, FormGroup, Input, Button } from 'reactstrap';
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import {forgotPassword} from '../../actions/userActions';
import { ForgotPasswordWrapper } from './Styling/ForgotPassword';
import { responseMessage } from '../../utils/alert';
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailSuccess: false,
            email: "",
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            console.log(nextProps.errors);
            this.setState({
                errors: nextProps.errors
            })
        }
       
        if(nextProps.forgotData){
            if(nextProps.forgotData.status === "Success") {
                responseMessage("success",nextProps.forgotData.message, "");
                this.setState({
                    emailSuccess: true
                })
            }
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        const emailObj = {
            email: this.state.email
        }
        this.props.forgotPassword(emailObj);
    }


    handleKeyUp = event => {
        this.setState({
            errors: {}
        })
    }

    render() {
        return(
            [
                <DashboardHeader key="dashboard-header"></DashboardHeader>,
                <ForgotPasswordWrapper id="login-wrapper" key="body-wrapper">
                    <div className="container-fluid container-signup">
                        <div className="password-row">
                            <div className="password-content m-auto">
                                <Col sm="12">
                                    <div className="divition"></div>
                                    <h2 className="mb-4 pt-5">Forgot your password</h2>
                                    {
                                        !this.state.emailSuccess ? (
                                            <>
                                            <p>We’ll email you instructions to reset your password. If you don’t have access to your email anymore, you
                                                can contact <a href="#">Amplo support</a>.</p>
                                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                                <FormGroup>
                                                    <Label>Username <span className="text-danger">*</span></Label>
                                                    <Input type="text" className="form-control" placeholder="Company Email" onChange={(e) => this.setState({email: e.target.value})}  onKeyUp={this.handleKeyUp} defaultValue={this.state.email} />
                                                    {Object.keys(this.state.errors).length > 0 ? <p className="text-danger">{this.state.errors.message}</p> : <></> }
                                                </FormGroup>

                                                <FormGroup className="mt-3">
                                                    <Button color="primary">RESET PASSWORD</Button>
                                                    <Link to="/login" className="return-link ml-3">Return to login</Link>
                                                </FormGroup>
                                            </Form>
                                            </>
                                        ) : (
                                            <>
                                            <p>We sent a reset password email to {this.state.email}. Please click the reset password link to set your new password.</p>
                                            <p className="mt-3">Didn’t receive the email yet?<br />
                                            Please check your spam folder, or <a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                this.setState({emailSuccess: false});
                                            }}>try again</a>.</p>
                                            </>
                                        )
                                    }
                                    
                                </Col>
                            </div>
                        </div>
                    </div>
                </ForgotPasswordWrapper>
            ]
        )
    }
}

ForgotPassword.propTypes = {
    forgotPassword: PropTypes.func.isRequired,
    forgotData: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    forgotData: state.user.forgotData,
    errors: state.errors
});
export default connect(mapStateToProps, {forgotPassword})(ForgotPassword);