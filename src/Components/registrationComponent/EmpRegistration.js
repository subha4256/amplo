import React, {Component} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RegistrationDiv } from "./registrationStyling";
import SimpleReactValidator from "simple-react-validator";
import Header from "../includes/header/Header";
import Footer from "../includes/footer/Footer";
import { Link ,Redirect} from "react-router-dom";
import {Card, CardHeader, CardBody} from 'reactstrap';
import { fetchRestrictedDomain, fetchUserAccessTypes, registerEmployee } from '../../actions/userActions';
import "react-intl-tel-input/dist/main.css";
import $ from "jquery";
import {responseMessage} from '../../utils/alert';

class EmpRegistration extends Component {
  constructor(props) {
    super(props);
    this.userEmailValidationMessage = "";
    this.state = {
      redirectToLogin:false,
      errors: {},
      validationError: {
        manager_email: false,
        user_type_id: false,
        employee_email: false,
        user_name: false,
        password: false,
        confirm_password: false
      },
      registrationData: {
        confirm_password: "",
        manager_email:"",
        user_type_id: "",
        employee_email: "",
        user_name: "",
        password: "",
        dt: new Date().toString()
      },
      showPasswordInstruction: false,
      termCheck: false
    };
    this.validator = new SimpleReactValidator({
      element: message => {
        return <p className="text-danger">{message}</p>;
      },
      autoForceUpdate: this
    });
  }

  componentWillReceiveProps(newProps) {

    // console.log(newProps.empRegister);
    if(newProps.errors) {    
     
        this.setState({
            errors: newProps.errors
        })
    }
    if(Object.keys(newProps.empRegister).length > 0){
      responseMessage("success",newProps.empRegister, "");
    }
  }
  componentDidMount() {
    // alert("test")
    this.props.fetchRestrictedDomain();
    this.props.fetchUserAccessTypes();
    $(".legendF").focus(event => {
      $(event.target)
        .prev()
        .css("visibility", "visible");
      this.forceUpdate();
    });
    $(".legendF").blur(event => {
      $(event.target)
        .prev()
        .css("visibility", "hidden");
      this.forceUpdate();
    });
  }
  registerUser() {
    if (this.validator.allValid()) {
      if (
        !this.state.validationError.confirm_password &&
        this.state.registrationData.confirm_password != ""
      ) {
        if (
          !this.state.validationError.employee_email &&
          this.state.registrationData.employee_email != ""
        ) {
          if(
            this.state.registrationData.password==this.state.registrationData.confirm_password
          ){          
          
          if(this.state.termCheck==true) {
            this.props.registerEmployee(this.state.registrationData);
            }else{    
              responseMessage("warning", "You must accept the terms and conditions", ""); 
            }
          }else{
            responseMessage("warning", "Your confirm password does not match with password", ""); 
          }
        } else {
          this.setState({
            validationError: { ...this.state.validationError, employee_email: true }
          });
        }
      } else {
        this.setState({
          validationError: { ...this.state.validationError, confirm_password: true }
        });
      }
    } else {
      this.validator.showMessages();
      let validationArray = { ...this.state.validationError };
      for (let key in validationArray) {
        if (
          validationArray[key] == false &&
          this.state.registrationData[key] == ""
        )
          validationArray[key] = true;
      }
      this.setState({
        validationError: validationArray
      });
      this.validator.hideMessageFor("termCheck");
      
      if (!this.state.termCheck) {
        responseMessage("warning", "You must accept the terms and conditions", ""); 
      }
    }
  }
  showValidationMessage(event) {
    if (this.validator.fieldValid(event.target.id)) {
      this.validator.hideMessageFor(event.target.id);
      this.setState({
        validationError: {
          ...this.state.validationError,
          [event.target.id]: false
        }
      });
    } else {
      this.validator.showMessageFor(event.target.id);
      this.setState({
        validationError: {
          ...this.state.validationError,
          [event.target.id]: true
        }
      });
    }
  }
  showEmailValidation() {
    if (this.state.registrationData.employee_email == "") {
      this.setState({
        validationError: { ...this.state.validationError, employee_email: true }
      });
      this.forceUpdate();
    }
  }
  handleUserEmailChange(event) {
    this.setState({
      registrationData: {
        ...this.state.registrationData,
        employee_email: event.target.value,
        user_name: event.target.value
      }
    });
    let emailRegEx = new RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim
    );
    if (emailRegEx.test(event.target.value)) {
      let domainArray = event.target.value.split("@");
      let userDomain = domainArray[domainArray.length - 1].split(".");
    
      if (this.props.restrictedDomains.includes(userDomain[0])) {
        this.userEmailValidationMessage =
          "You are trying to register from restricted domains " +
          this.props.restrictedDomains.join(",");
        this.setState({
          validationError: { ...this.state.validationError, employee_email: true }
        });
        this.forceUpdate();
      } else {
        this.userEmailValidationMessage = "";
        this.setState({
          validationError: { ...this.state.validationError, employee_email: false }
        });
        this.forceUpdate();
      }
    } else {
      this.userEmailValidationMessage = "Invalid Email";
      this.setState({
        validationError: { ...this.state.validationError, employee_email: true }
      });
      this.forceUpdate();
    }
  }
  showConfPasswordValidationMessage() {
    if (this.state.registrationData.confirm_password == "") {
      this.setState({
        validationError: { ...this.state.validationError, confirm_password: true }
      });
      this.forceUpdate();
    }
  }
  handleConfPasswordChange(event) {
    this.setState({
      registrationData: {
        ...this.state.registrationData,
        confirm_password: event.target.value
      }
    });
    //console.log(this.state.registrationData);
    if (event.target.value === this.state.registrationData.password) {
      this.setState({
        validationError: { ...this.state.validationError, confirm_password: false }
      });
      this.forceUpdate();
    } else {
      this.setState({
        validationError: { ...this.state.validationError, confirm_password: true }
      });
      this.forceUpdate();
    }
  }
  handleInputChange(event) {
    this.setState({
      registrationData: {
        ...this.state.registrationData,
        [event.target.id]: event.target.value
      }
    });
  }
  render() {
    // console.log()
    return [
      <Header pathName={this.props.location.pathname} key="dashboard-header"></Header>,
      <RegistrationDiv id="login-wrapper" key="body-wrapper">
        {this.state.redirectToLogin &&
        <Redirect to="/"></Redirect>
        }
        <div className="container-fluid container-signup">
          <div className="regitration-row">
            <div className="main-header text-center">
              <h1 className="mb-3">Register as Amplo Employee</h1>
              <p>
                <span className="p1">
                  {" "}
                  You are an Employee of Amplo Global Inc.
                </span>
              </p>
              <p>
                <span className="p1">
                  {" "}
                  Use your work email to create new account.
                </span>
              </p>
            </div>
            <div className="col-sm-12 col-md-10 col-lg-8 m-auto">
              {Object.keys(this.props.empRegister).length > 0 && this.props.empRegister.success ? <Card className="manage-access-section">
                <CardHeader>
                  Account Information Submitted
                </CardHeader>
                <CardBody>
                  <p className="card-text">Your account request has been submitted to your manager for approval with instructions containing the next steps to access your account.</p>
                  </CardBody></Card> : <form className="mt-5" autoComplete="off">
                <div className="form-group row">
                  <div className="col-sm-6">
                    <legend className="legends">
                      Employee Email<span className="star">*</span>
                    </legend>
                    <input
                      type="email"
                      className="form-control legendF"
                      id="employee_email"
                      placeholder="Employee Email*"
                      onChange={this.handleUserEmailChange.bind(this)}
                      onBlur={this.showEmailValidation.bind(this)}
                      style={
                        this.state.validationError.employee_email
                          ? { borderColor: "red" }
                          : {}
                      }
                    />
                    {this.state.validationError.employee_email ? (
                      <p className="text-danger">
                        {this.state.registrationData.employee_email === ""
                          ? "Employee email is required"
                          : this.userEmailValidationMessage}
                      </p>
                    ) : (
                      ""
                    )}
                    {Object.keys(this.props.errors).length > 0 && this.props.errors.data.employee_email ? <p className="text-danger">{this.props.errors.data.employee_email[0]}</p> : <></> }
                  </div>
                  <div className="col-sm-6">
                    <legend className="legends">
                      Manager Email<span className="star">*</span>
                    </legend>
                    <input
                      type="email"
                      className="form-control legendF"
                      id="manager_email"
                      placeholder="Manager Email*"
                      onChange={this.handleInputChange.bind(this)}
                      onBlur={this.showValidationMessage.bind(this)}
                      onKeyUp={this.showValidationMessage.bind(this)}
                      style={
                        this.state.validationError.manager_email
                          ? { borderColor: "red" }
                          : {}
                      }
                    />
                    {this.validator.message(
                      "manager_email",
                      this.state.registrationData.manager_email,
                      "required",
                      {
                        messages: {
                          required: "Manager Email is required"
                        }
                      }
                    )}
                  </div>
                </div>

                <h5 className="org">Create Login</h5>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <legend className="legends">
                        Username(Email)<span className="star">*</span>
                      </legend>
                      <input
                        type="email"
                        className="form-control legendF"
                        id="user_name"
                        placeholder="Username(Email)*"
                        defaultValue={this.state.registrationData.employee_email}
                        readOnly="1"
                        style={
                          this.state.validationError.user_name
                            ? { borderColor: "red" }
                            : {}
                        }
                      />
                      {this.state.validationError.user_name ? (
                        <p className="text-danger">
                          {this.state.registrationData.user_name === ""
                            ? "Username is required"
                            : this.userEmailValidationMessage}
                        </p>
                      ) : (
                        ""
                      )}
                      {Object.keys(this.props.errors).length > 0 && this.props.errors.data.user_name ? <p className="text-danger">{this.props.errors.data.user_name[0]}</p> : <></> }
                    </div>
                    <div className="form-group">
                      <legend className="legends">
                        Password<span className="star">*</span>
                      </legend>
                      <input
                        type="Password"
                        id="password"
                        className="form-control legendF"
                        placeholder="Password*"
                        value={this.state.registrationData.password}
                        onChange={this.handleInputChange.bind(this)}
                        onBlur={this.showValidationMessage.bind(this)}
                        onKeyUp={this.showValidationMessage.bind(this)}                        
                        style={
                          this.state.validationError.password
                            ? { borderColor: "red" }
                            : {}
                        }
                        onFocus={() =>
                          this.setState({ showPasswordInstruction: true })
                        }
                      />
                      {this.validator.message(
                        "password",
                        this.state.registrationData.password,
                        [
                          "required",
                          {
                            regex:
                              "(^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!+%*_\\-^:#?&])[A-Za-z\\d@$!+%*_\\-^:#?&]{8,16}$)"
                          }
                        ],
                        {
                          messages: {
                            regex: "Invalid Password",
                            required: "password is required"
                          }
                        }
                      )}
                    </div>
                    <div className="form-group">
                      <legend className="legends">
                        Confirm Password<span className="star">*</span>
                      </legend>
                      <input
                        type="Password"
                        id="confirm_password"
                        className="form-control legendF compul pass"
                        placeholder="Confirm Password*"
                        name="confirm_password"
                        onChange={this.handleConfPasswordChange.bind(this)}
                        onBlur={this.showConfPasswordValidationMessage.bind(
                          this
                        )}
                        style={
                          this.state.validationError.confirm_password
                            ? { borderColor: "red" }
                            : {}
                        }
                      />
                      {this.state.validationError.confirm_password ? (
                        <p className="text-danger">
                          {this.state.registrationData.confirm_password
                            ? "Your confirm password does not match with password"
                            : "please re-type your password"}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <legend className="legends">
                        Account Type<span className="star">*</span>
                      </legend>
                      <select
                        id="user_type_id"
                        className="form-control legendF"
                        onChange={this.handleInputChange.bind(this)}
                        onBlur={this.showValidationMessage.bind(this)}
                        style={
                          this.state.validationError.user_type_id
                            ? { borderColor: "red" }
                            : {}
                        }
                      >
                        <option selected disabled>
                          Account Type*
                        </option>
                        {this.props.accountTypes.map(type => (
                          <option key={type.UserTypeID} value={type.UserTypeID}>
                            {type.UserTypeName}
                          </option>
                        ))}
                      </select>
                      {this.validator.message(
                        "user_type_id",
                        this.state.registrationData.user_type_id,
                        "required",
                        {
                          messages: {
                            required: "Account type is required"
                          }
                        }
                      )}
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gridCheck"
                        onClick={event =>
                          this.setState({ termCheck: event.target.checked })
                        }
                      />
                      <label className="form-check-label tc" htmlFor="gridCheck">
                        I have read the{" "}
                        <a href="#">
                          {" "}
                          <u>Terms and Conditions.</u>
                        </a>
                      </label>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    {this.state.showPasswordInstruction ? (
                      <div className="border-lft" id="passSpecs">
                        <p className="mb-2">
                          <b>Password Requirements:</b>
                        </p>
                        <p>
                          Must be at least 8 characters in length, with a
                          maximum of 16 characters.
                          <br />
                          Must include at least one letter and one number.
                          <br />
                          Must include one lower case letter.
                          <br />
                          Must include one upper case letter.
                          <br />
                          Must include at least one special characters (such as
                          "!" "&" and "+")
                          <br />
                          Password is case-sensitive.
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row mt-4 mb-5">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <button
                        type="button"
                        className="btn btn-block btn-primary"
                        id="submit_button"
                        onClick={this.registerUser.bind(this)}
                        disabled={this.state.termCheck!=false?false:true}
                      >
                        CREATE ACCOUNT
                      </button>
                      { Object.keys(this.state.errors).length > 0 ? <p className="text-danger">{this.state.errors.message}</p> : <></>}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <button
                        type="button"
                        className="btn btn-block btn-outline-primary"
                      >
                        <Link to="/login" className="login-anchor">
                          Have an Account? LOG IN
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </form>}
            </div>
          </div>
        </div>
      </RegistrationDiv>,
      <Footer key="dashboard-footer"></Footer>
    ];
  }
}

EmpRegistration.propTypes = {
  fetchRestrictedDomain: PropTypes.func.isRequired,
  restrictedDomains: PropTypes.array.isRequired,
  registerEmployee: PropTypes.func,
  empRegister: PropTypes.object,
  fetchUserAccessTypes: PropTypes.func.isRequired,
  accountTypes: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  restrictedDomains: state.user.restrictedDomains,
  accountTypes: state.user.accountTypes,
  empRegister: state.user.empRegister,
  errors: state.errors
});
export default connect(mapStateToProps, { fetchRestrictedDomain, fetchUserAccessTypes, registerEmployee })(EmpRegistration);
