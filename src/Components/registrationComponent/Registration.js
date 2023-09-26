import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { RegistrationDiv } from "./registrationStyling";
import SimpleReactValidator from "simple-react-validator";
import Header from "../includes/header/Header";
import Footer from "../includes/footer/Footer";
import { Link, Redirect } from "react-router-dom";
import ApiServer from "./../../common/js/ApiServices.js";
import { fetchUserInfo } from "../../actions/userActions";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import $ from "jquery";
import { responseMessage } from "../../utils/alert";
import axios from "axios";
const config = require("../../config");

class Registration extends Component {
    query = new URLSearchParams(this.props.location.search);
    constructor(props) {
        super(props);
        this.apiServer = new ApiServer(true);
        this.restrictedDomains = [];
        this.userEmailValidationMessage = "";
        this.state = {
            revenueCollection: [],
            industryCollection: [],
            redirectToLogin: false,
            hash: this.props.match.params.hash,
            validationError: {
                organisation: false,
                division: false,
                Industry: false,
                organisationrevenue: false,
                fn: false,
                ln: false,
                email1: false,
                password: false,
                rePassword: false,
                ph2: false,
            },
            registrationData: {
                rePassword: "",
                organisation: "",
                division: "",
                parentcompany: "",
                organisationrevenue: "",
                Industry: "",
                fn: "",
                mn: "",
                ln: "",
                email1: "",
                password: "",
                ph2: "",
                UserTypeId: 1,
                dt: new Date().toString(),
                token: this.props.location.hash.replace("#token=", "") || "",
                flag: this.query.get("flag") || "",
            },
            updateRegistrationData: true,
            registrationMode: true,
            showPasswordInstruction: false,
            termCheck: false,
        };
        this.validator = new SimpleReactValidator({
            element: (message) => {
                return <p className="text-danger">{message}</p>;
            },
            autoForceUpdate: this,
        });
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            Object.keys(nextProps.userData).length > 0 &&
            prevState.industryCollection.length > 0 &&
            prevState.revenueCollection.length > 0
        ) {
            if (prevState.updateRegistrationData) {
                let industryID = "";
                if (prevState.industryCollection.length > 0) {
                    let ind = prevState.industryCollection
                        .map((industry) => industry.valueToShow)
                        .indexOf(nextProps.userData.industry);
                    industryID = prevState.industryCollection[ind].ID;
                }
                let revenueID = "";
                if (prevState.revenueCollection.length > 0) {
                    let ind = prevState.revenueCollection
                        .map((revenue) => revenue.valueToShow)
                        .indexOf(nextProps.userData.organisationrevenue);
                    revenueID = prevState.revenueCollection[ind].ID;
                }
                let registerData = prevState.registrationData;
                registerData.UserId = nextProps.userData.UserId;
                registerData.UserTypeId = nextProps.userData.UserTypeId;
                registerData.ClientId = nextProps.userData.ClientId;
                registerData.email1 = nextProps.userData.Email;
                registerData.parentcompany =
                    nextProps.userData.ClientParentCompany;
                registerData.fn = nextProps.userData.FirstName;
                registerData.ln = nextProps.userData.LastName;
                registerData.organisation = nextProps.userData.organisation;
                registerData.division = nextProps.userData.division;
                registerData.subscription = nextProps.userData.subscription;
                registerData.Industry = industryID;
                registerData.organisationrevenue = revenueID;
                return {
                    registrationData: registerData,
                    registrationMode: false,
                    updateRegistrationData: false,
                };
            }
        }
        return prevState;
    }
    componentDidMount() {
        if (this.state.hash) {
            this.props.fetchUserInfo(this.state.hash);
        }
        this.fetchRevenueCollection();
        this.fetchIndustryCollection();
        this.fetchRestrictedDomain();
        $(".legendF").focus((event) => {
            $(event.target).prev().css("visibility", "visible");
            this.forceUpdate();
        });
        $(".legendF").blur((event) => {
            $(event.target).prev().css("visibility", "hidden");
            this.forceUpdate();
        });
    }
    fetchRestrictedDomain() {
        return this.apiServer
            .SendRequest({
                method: "GET",
                url: "/restricted-domain",
                data: "",
            })
            .then((result) => {
                if (result) {
                    this.restrictedDomains = result.data;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    fetchRevenueCollection() {
        return this.apiServer
            .SendRequest({
                method: "GET",
                url: "/revenue-collection",
                data: "",
            })
            .then((result) => {
                if (result) {
                    this.setState({ revenueCollection: result.data });
                } else {
                    //this.setState({ Redirect: true });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    fetchIndustryCollection() {
        return this.apiServer
            .SendRequest({
                method: "GET",
                url: "/industry-collection",
                data: "",
            })
            .then((result) => {
                if (result) {
                    this.setState({ industryCollection: result.data });
                } else {
                    //this.setState({ Redirect: true });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    registerUser(event) {
        if (this.validator.allValid()) {
            if (
                !this.state.validationError.ph2 &&
                this.state.registrationData.ph2 != ""
            ) {
                if (
                    !this.state.validationError.rePassword &&
                    this.state.registrationData.rePassword != ""
                ) {
                    if (
                        !this.state.validationError.email1 &&
                        this.state.registrationData.email1 != ""
                    ) {
                        if (
                            this.state.registrationData.password ==
                            this.state.registrationData.rePassword
                        ) {
                            if (this.state.termCheck == true) {
                                axios
                                    .post(
                                        config.laravelBaseUrl + "register-user",
                                        this.state.registrationData
                                    )
                                    .then((result) => {
                                        if (result.data.status == "Success") {
                                            if (
                                                this.query.get("type") ===
                                                "user"
                                            ) {
                                                responseMessage(
                                                    "success",
                                                    "Registration Successful. "
                                                );
                                                this.setState({
                                                    redirectToLogin: true,
                                                });
                                            } else {
                                                setTimeout(() => {
                                                    this.setState({
                                                        redirectToLogin: true,
                                                    });
                                                }, 10000);
                                                responseMessage(
                                                    "Registration_success",
                                                    "Registration Successful. Please allow 3 hours for your account creation in Amplo."
                                                );
                                            }
                                        } else if (
                                            result.data.status == "Error"
                                        ) {
                                            responseMessage(
                                                "error",
                                                result.data.message,
                                                ""
                                            );
                                        } else {
                                            responseMessage(
                                                "error",
                                                "Sorry Registration Failed",
                                                ""
                                            );
                                        }
                                    })
                                    .catch((error) => {
                                        if (
                                            error.response.data.message &&
                                            error.response.data.message != ""
                                        ) {
                                            responseMessage(
                                                "error",
                                                error.response.data.message,
                                                ""
                                            );
                                        } else {
                                            responseMessage(
                                                "error",
                                                "Sorry Registration Failed",
                                                ""
                                            );
                                        }
                                    });
                            } else {
                                responseMessage(
                                    "warning",
                                    "You must accept the terms and conditions",
                                    ""
                                );
                            }
                        } else {
                            responseMessage(
                                "warning",
                                "Your confirm password does not match with password",
                                ""
                            );
                        }
                    } else {
                        this.setState({
                            validationError: {
                                ...this.state.validationError,
                                email1: true,
                            },
                        });
                    }
                } else {
                    this.setState({
                        validationError: {
                            ...this.state.validationError,
                            rePassword: true,
                        },
                    });
                }
            } else {
                this.setState({
                    validationError: {
                        ...this.state.validationError,
                        ph2: true,
                    },
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
                validationError: validationArray,
            });
            this.validator.hideMessageFor("termCheck");

            if (!this.state.termCheck) {
                responseMessage(
                    "warning",
                    "You must accept the terms and conditions",
                    ""
                );
            }
        }
    }
    showValidationMessage(event) {
        if (this.validator.fieldValid(event.target.id)) {
            // console.log(this.validator.fieldValid(event.target.id),"if",event.target.id);
            this.validator.hideMessageFor(event.target.id);
            this.setState({
                validationError: {
                    ...this.state.validationError,
                    [event.target.id]: false,
                },
            });
        } else {
            // console.log(this.validator.fieldValid(event.target.id),"else",event.target.id);
            this.validator.showMessageFor(event.target.id);
            this.setState({
                validationError: {
                    ...this.state.validationError,
                    [event.target.id]: true,
                },
            });
        }
    }
    showValidationPhone(validStatus) {
        if (validStatus) {
            this.setState({
                validationError: { ...this.state.validationError, ph2: false },
            });
        } else {
            this.setState({
                validationError: { ...this.state.validationError, ph2: true },
            });
        }
    }
    showEmailValidation() {
        if (this.state.registrationData.email1 == "") {
            this.setState({
                validationError: {
                    ...this.state.validationError,
                    email1: true,
                },
            });
            this.forceUpdate();
        }
    }
    handleUserEmailChange(event) {
        this.setState({
            registrationData: {
                ...this.state.registrationData,
                email1: event.target.value,
            },
        });
        let emailRegEx = new RegExp(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim
        );
        if (emailRegEx.test(event.target.value)) {
            let domainArray = event.target.value.split("@");
            let userDomain = domainArray[domainArray.length - 1].split(".");

            if (this.restrictedDomains.includes(userDomain[0])) {
                this.userEmailValidationMessage =
                    "You are trying to register from restricted domains " +
                    this.restrictedDomains.join(",");
                this.setState({
                    validationError: {
                        ...this.state.validationError,
                        email1: true,
                    },
                });
                this.forceUpdate();
            } else if (
                userDomain[0].toLowerCase() == "amploglobal" ||
                userDomain[0].toLowerCase() == "amploglobalinc" ||
                userDomain[0].toLowerCase() == "amplo"
            ) {
                this.userEmailValidationMessage = "amplo";
                this.setState({
                    validationError: {
                        ...this.state.validationError,
                        email1: true,
                    },
                });
            } else {
                this.userEmailValidationMessage = "";
                this.setState({
                    validationError: {
                        ...this.state.validationError,
                        email1: false,
                    },
                });
                this.forceUpdate();
            }
        } else {
            this.userEmailValidationMessage = "Invalid Email";
            this.setState({
                validationError: {
                    ...this.state.validationError,
                    email1: true,
                },
            });
            this.forceUpdate();
        }
    }
    showConfPasswordValidationMessage() {
        if (this.state.registrationData.rePassword == "") {
            this.setState({
                validationError: {
                    ...this.state.validationError,
                    rePassword: true,
                },
            });
            this.forceUpdate();
        }
    }
    handleConfPasswordChange(event) {
        this.setState({
            registrationData: {
                ...this.state.registrationData,
                rePassword: event.target.value,
            },
        });
        //console.log(this.state.registrationData);
        if (event.target.value === this.state.registrationData.password) {
            this.setState({
                validationError: {
                    ...this.state.validationError,
                    rePassword: false,
                },
            });
            this.forceUpdate();
        } else {
            this.setState({
                validationError: {
                    ...this.state.validationError,
                    rePassword: true,
                },
            });
            this.forceUpdate();
        }
    }
    handleInputChange(event) {
        this.setState({
            registrationData: {
                ...this.state.registrationData,
                [event.target.id]: event.target.value,
            },
        });
    }
    handlePhoneInputChange(validationStatus, phone, country) {
        this.setState({
            registrationData: {
                ...this.state.registrationData,
                ph2: phone,
                ph: country.dialCode,
            },
        });
        if (/^[0-9]*$/.test(phone)) {
            if (validationStatus) {
                this.setState({
                    validationError: {
                        ...this.state.validationError,
                        ph2: false,
                    },
                });
            } else {
                this.setState({
                    validationError: {
                        ...this.state.validationError,
                        ph2: true,
                    },
                });
            }
        } else {
            this.setState({
                validationError: { ...this.state.validationError, ph2: true },
            });
        }
    }
    render() {
        // console.log(this.state.registrationData.Industry)
        console.log(this.state.registrationData);
        console.log(this.query.get("type"));
        console.log(this.props.location);
        return [
            <Header
                pathName={this.props.location.pathname}
                key="dashboard-header"
            ></Header>,
            <RegistrationDiv id="login-wrapper" key="body-wrapper">
                {this.state.redirectToLogin && (
                    <Redirect to="/login"></Redirect>
                )}
                <div className="container-fluid container-signup">
                    <div className="regitration-row">
                        <div className="main-header text-center">
                            {this.state.hash ? (
                                <h1 className="mb-3">
                                    {this.state.registrationData.organisation.toLocaleUpperCase()}{" "}
                                    USER REGISTRATION TO AMPLOFLY 4.0
                                </h1>
                            ) : (
                                <h1 className="mb-3">
                                    Register as Enterprise User
                                </h1>
                            )}
                            <p>
                                <span className="p1">
                                    {" "}
                                    Use your work email to create new account.
                                </span>
                            </p>
                        </div>
                        <div className="col-sm-12 col-md-10 col-lg-8 m-auto">
                            <form className="mt-5" autoComplete={false}>
                                <h5 className="org">Your Organization</h5>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <legend className="legends">
                                            Organization
                                            <span className="star">*</span>
                                        </legend>
                                        <input
                                            type="text"
                                            className={
                                                this.state.hash
                                                    ? "form-control legendF disabled-field"
                                                    : "form-control legendF"
                                            }
                                            placeholder="Organization*"
                                            id="organisation"
                                            defaultValue={
                                                this.state.registrationData
                                                    .organisation
                                            }
                                            onChange={this.handleInputChange.bind(
                                                this
                                            )}
                                            onBlur={this.showValidationMessage.bind(
                                                this
                                            )}
                                            onKeyUp={this.showValidationMessage.bind(
                                                this
                                            )}
                                            disabled={this.state.hash ? 1 : 0}
                                            style={
                                                this.state.validationError
                                                    .organisation
                                                    ? { borderColor: "red" }
                                                    : {}
                                            }
                                        />
                                        {this.validator.message(
                                            "organisation",
                                            this.state.registrationData
                                                .organisation,
                                            "required|regex:^[a-zA-Z0-9' &.-]+$",
                                            {
                                                messages: {
                                                    required:
                                                        "Organisation name is required",
                                                    regex: "Special characters are not allowed",
                                                },
                                            }
                                        )}
                                    </div>
                                    <div className="col-sm-6">
                                        <legend className="legends">
                                            Division
                                            <span className="star">*</span>
                                        </legend>
                                        <input
                                            type="text"
                                            className={
                                                this.state.hash
                                                    ? "form-control legendF disabled-field"
                                                    : "form-control legendF"
                                            }
                                            id="division"
                                            placeholder="division*"
                                            defaultValue={
                                                this.state.registrationData
                                                    .division
                                            }
                                            onChange={this.handleInputChange.bind(
                                                this
                                            )}
                                            onBlur={this.showValidationMessage.bind(
                                                this
                                            )}
                                            onKeyUp={this.showValidationMessage.bind(
                                                this
                                            )}
                                            disabled={this.state.hash ? 1 : 0}
                                            style={
                                                this.state.validationError
                                                    .division
                                                    ? { borderColor: "red" }
                                                    : {}
                                            }
                                        />
                                        {this.validator.message(
                                            "division",
                                            this.state.registrationData
                                                .division,
                                            "required|regex:^[a-zA-Z0-9' &.-]+$",
                                            {
                                                messages: {
                                                    required:
                                                        "Division is required",
                                                    regex: "Special characters are not allowed except single quotes",
                                                },
                                            }
                                        )}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <legend className="legends">
                                            Parent Company
                                        </legend>
                                        <input
                                            type="text"
                                            className={
                                                this.state.hash
                                                    ? "form-control legendF disabled-field"
                                                    : "form-control legendF"
                                            }
                                            id="parentcompany"
                                            placeholder="Parent Company"
                                            defaultValue={
                                                this.state.registrationData
                                                    .parentcompany
                                            }
                                            disabled={this.state.hash ? 1 : 0}
                                            onChange={this.handleInputChange.bind(
                                                this
                                            )}
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        <legend className="legends">
                                            Subscription
                                        </legend>
                                        <input
                                            type="text"
                                            className={
                                                this.state.hash
                                                    ? "form-control legendF disabled-field"
                                                    : "form-control legendF"
                                            }
                                            placeholder="Subscription"
                                            defaultValue={
                                                this.state.registrationData
                                                    .subscription
                                            }
                                            disabled={this.state.hash ? 1 : 0}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <legend className="legends">
                                            Industry
                                            <span className="star">*</span>
                                        </legend>
                                        <select
                                            id="Industry"
                                            className={
                                                this.state.hash
                                                    ? "form-control legendF disabled-field"
                                                    : "form-control legendF"
                                            }
                                            onChange={this.handleInputChange.bind(
                                                this
                                            )}
                                            onBlur={this.showValidationMessage.bind(
                                                this
                                            )}
                                            value={
                                                this.state.registrationData
                                                    .Industry
                                            }
                                            disabled={this.state.hash ? 1 : 0}
                                            style={
                                                this.state.validationError
                                                    .Industry
                                                    ? { borderColor: "red" }
                                                    : {}
                                            }
                                        >
                                            <option selected disabled value="">
                                                Industry*
                                            </option>
                                            {this.state.industryCollection.map(
                                                (industry) => {
                                                    // console.log(industry,this.state.registrationData.Industry)
                                                    return (
                                                        <option
                                                            key={industry.ID}
                                                            value={industry.ID}
                                                        >
                                                            {
                                                                industry.valueToShow
                                                            }
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                        {this.validator.message(
                                            "Industry",
                                            this.state.registrationData
                                                .Industry,
                                            "required",
                                            {
                                                messages: {
                                                    required:
                                                        "Industry type is required",
                                                },
                                            }
                                        )}
                                    </div>
                                    <div className="col-sm-6">
                                        <legend className="legends">
                                            Organization Revenue
                                            <span className="star">*</span>
                                        </legend>
                                        <select
                                            id="organisationrevenue"
                                            className={
                                                this.state.hash
                                                    ? "form-control legendF disabled-field"
                                                    : "form-control legendF"
                                            }
                                            onChange={this.handleInputChange.bind(
                                                this
                                            )}
                                            onBlur={this.showValidationMessage.bind(
                                                this
                                            )}
                                            value={
                                                this.state.registrationData
                                                    .organisationrevenue
                                            }
                                            disabled={this.state.hash ? 1 : 0}
                                            style={
                                                this.state.validationError
                                                    .organisationrevenue
                                                    ? { borderColor: "red" }
                                                    : {}
                                            }
                                        >
                                            <option selected disabled value="">
                                                Organization Revenue*
                                            </option>
                                            {this.state.revenueCollection.map(
                                                (revenue) => (
                                                    <option
                                                        key={
                                                            "revenueOpt-" +
                                                            revenue.ID
                                                        }
                                                        value={revenue.ID}
                                                    >
                                                        {revenue.valueToShow}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        {this.validator.message(
                                            "organisationrevenue",
                                            this.state.registrationData
                                                .organisationrevenue,
                                            "required",
                                            {
                                                messages: {
                                                    required:
                                                        "Revenue of organization is required",
                                                },
                                            }
                                        )}
                                    </div>
                                </div>

                                <h5 className="org">Personal Information</h5>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <legend className="legends">
                                            First Name
                                            <span className="star">*</span>
                                        </legend>
                                        <input
                                            type="text"
                                            className="form-control legendF"
                                            placeholder="First Name*"
                                            id="fn"
                                            onChange={this.handleInputChange.bind(
                                                this
                                            )}
                                            onBlur={this.showValidationMessage.bind(
                                                this
                                            )}
                                            onKeyUp={this.showValidationMessage.bind(
                                                this
                                            )}
                                            defaultValue={
                                                this.state.registrationData.fn
                                            }
                                            // disabled={this.state.registrationData.fn && this.state.hash ? 1 : 0}
                                            style={
                                                this.state.validationError.fn
                                                    ? { borderColor: "red" }
                                                    : {}
                                            }
                                        />
                                        {this.validator.message(
                                            "fn",
                                            this.state.registrationData.fn,
                                            "required|regex:^[a-zA-Z' &.-]+$",
                                            {
                                                messages: {
                                                    required:
                                                        "First name is required",
                                                    regex: "Special characters except spaces are not allowed",
                                                },
                                            }
                                        )}
                                    </div>
                                    <div className="col-sm-6">
                                        <legend className="legends">
                                            Middle Name
                                        </legend>
                                        <input
                                            type="text"
                                            className="form-control legendF"
                                            placeholder="Middle Name"
                                            id="mn"
                                            onChange={this.handleInputChange.bind(
                                                this
                                            )}
                                            onKeyUp={this.showValidationMessage.bind(
                                                this
                                            )}
                                            style={
                                                this.state.validationError.mn
                                                    ? { borderColor: "red" }
                                                    : {}
                                            }
                                        />
                                        {this.validator.message(
                                            "mn",
                                            this.state.registrationData.mn,
                                            "regex:^[a-zA-Z' &.-]+$",
                                            {
                                                messages: {
                                                    regex: "Special characters except spaces are not allowed",
                                                },
                                            }
                                        )}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <legend className="legends">
                                            Last Name
                                            <span className="star">*</span>
                                        </legend>
                                        <input
                                            type="text"
                                            className="form-control legendF"
                                            placeholder="Last Name*"
                                            id="ln"
                                            onChange={this.handleInputChange.bind(
                                                this
                                            )}
                                            onBlur={this.showValidationMessage.bind(
                                                this
                                            )}
                                            defaultValue={
                                                this.state.registrationData.ln
                                            }
                                            // disabled={this.state.registrationData.ln && this.state.hash ? 1 : 0}
                                            onKeyUp={this.showValidationMessage.bind(
                                                this
                                            )}
                                            style={
                                                this.state.validationError.ln
                                                    ? { borderColor: "red" }
                                                    : {}
                                            }
                                        />
                                        {this.validator.message(
                                            "ln",
                                            this.state.registrationData.ln,
                                            "required|regex:^[a-zA-Z' &.-]+$",
                                            {
                                                messages: {
                                                    required:
                                                        "Last name is required",
                                                    regex: "Special characters except spaces are not allowed",
                                                },
                                            }
                                        )}
                                    </div>
                                    <div className="col-sm-6">
                                        <legend className="legends">
                                            Phone Number
                                            <span className="star">*</span>
                                        </legend>
                                        <span
                                            type="tel"
                                            id="telInput"
                                            className="legendF"
                                            placeholder="Phone Number*"
                                            name="ph1"
                                            size=""
                                        ></span>
                                        <IntlTelInput
                                            inputClassName={
                                                this.state.validationError.ph2
                                                    ? "form-control validation-border-color"
                                                    : "form-control"
                                            }
                                            fieldId="ph2"
                                            telInputProps={{ type: "number" }}
                                            placeholder="phone number"
                                            style={{ width: "100%" }}
                                            onPhoneNumberChange={this.handlePhoneInputChange.bind(
                                                this
                                            )}
                                            onPhoneNumberBlur={this.showValidationPhone.bind(
                                                this
                                            )}
                                        ></IntlTelInput>
                                        <div className="clearfix"></div>
                                        {this.state.validationError.ph2 ? (
                                            <p className="text-danger">
                                                {this.state.registrationData.ph2
                                                    ? "Invalid Phone Number"
                                                    : "Phone number is required"}
                                            </p>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>

                                <h5 className="org">Create Login</h5>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <legend className="legends">
                                                Username(Email)
                                                <span className="star">*</span>
                                            </legend>
                                            <input
                                                type="email"
                                                className={
                                                    this.state.hash
                                                        ? "form-control legendF disabled-field"
                                                        : "form-control legendF"
                                                }
                                                id="email1"
                                                placeholder="Username(Email)*"
                                                onChange={this.handleUserEmailChange.bind(
                                                    this
                                                )}
                                                onBlur={this.showEmailValidation.bind(
                                                    this
                                                )}
                                                defaultValue={
                                                    this.state.registrationData
                                                        .email1
                                                }
                                                disabled={
                                                    this.state.hash
                                                        ? true
                                                        : false
                                                }
                                                autoComplete={false}
                                                style={
                                                    this.state.validationError
                                                        .email1
                                                        ? { borderColor: "red" }
                                                        : {}
                                                }
                                            />
                                            {this.state.validationError
                                                .email1 ? (
                                                <p className="text-danger">
                                                    {this.state.registrationData
                                                        .email1 === "" ? (
                                                        "Username is required"
                                                    ) : this
                                                          .userEmailValidationMessage ===
                                                      "amplo" ? (
                                                        <>
                                                            Amplo Employees Sign
                                                            Up{" "}
                                                            <Link to="/emp-registration">
                                                                Here
                                                            </Link>
                                                        </>
                                                    ) : (
                                                        this
                                                            .userEmailValidationMessage
                                                    )}
                                                </p>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <legend className="legends">
                                                Password
                                                <span className="star">*</span>
                                            </legend>
                                            <input
                                                type="Password"
                                                id="password"
                                                className="form-control legendF"
                                                placeholder="Password*"
                                                value={
                                                    this.state.registrationData
                                                        .password
                                                }
                                                onChange={this.handleInputChange.bind(
                                                    this
                                                )}
                                                onBlur={this.showValidationMessage.bind(
                                                    this
                                                )}
                                                onKeyUp={this.showValidationMessage.bind(
                                                    this
                                                )}
                                                style={
                                                    this.state.validationError
                                                        .password
                                                        ? { borderColor: "red" }
                                                        : {}
                                                }
                                                onFocus={() =>
                                                    this.setState({
                                                        showPasswordInstruction: true,
                                                    })
                                                }
                                            />
                                            {this.validator.message(
                                                "password",
                                                this.state.registrationData
                                                    .password,
                                                [
                                                    "required",
                                                    {
                                                        regex: "(^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!+%*_\\-^:#?&])[A-Za-z\\d@$!+%*_\\-^:#?&]{8,16}$)",
                                                    },
                                                ],
                                                {
                                                    messages: {
                                                        regex: "Invalid Password",
                                                        required:
                                                            "password is required",
                                                    },
                                                }
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <legend className="legends">
                                                Confirm Password
                                                <span className="star">*</span>
                                            </legend>
                                            <input
                                                type="Password"
                                                id="rePassword"
                                                className="form-control legendF compul pass"
                                                placeholder="Confirm Password*"
                                                name="repassword"
                                                onChange={this.handleConfPasswordChange.bind(
                                                    this
                                                )}
                                                onBlur={this.showConfPasswordValidationMessage.bind(
                                                    this
                                                )}
                                                disabled={
                                                    this.state.registrationData
                                                        .password
                                                        ? ""
                                                        : "readonly"
                                                }
                                                style={
                                                    this.state.validationError
                                                        .rePassword
                                                        ? { borderColor: "red" }
                                                        : {}
                                                }
                                            />
                                            {this.state.validationError
                                                .rePassword ? (
                                                <p className="text-danger">
                                                    {this.state.registrationData
                                                        .rePassword
                                                        ? "Your confirm password does not match with password"
                                                        : "please re-type your password"}
                                                </p>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="gridCheck"
                                                onClick={(event) =>
                                                    this.setState({
                                                        termCheck:
                                                            event.target
                                                                .checked,
                                                    })
                                                }
                                            />
                                            <label
                                                className="form-check-label tc"
                                                htmlFor="gridCheck"
                                            >
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
                                            <div
                                                className="border-lft"
                                                id="passSpecs"
                                            >
                                                <p className="mb-2">
                                                    <b>
                                                        Password Requirements:
                                                    </b>
                                                </p>
                                                <p>
                                                    Must be at least 8
                                                    characters in length, with a
                                                    maximum of 16 characters.
                                                    <br />
                                                    Must include at least one
                                                    letter and one number.
                                                    <br />
                                                    Must include one lower case
                                                    letter.
                                                    <br />
                                                    Must include one upper case
                                                    letter.
                                                    <br />
                                                    Must include at least one
                                                    special characters (such as
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
                                                onClick={this.registerUser.bind(
                                                    this
                                                )}
                                                disabled={
                                                    this.state.termCheck
                                                        ? false
                                                        : true
                                                }
                                            >
                                                CREATE ACCOUNT
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <button
                                                type="button"
                                                className="btn btn-block btn-outline-primary"
                                            >
                                                <Link
                                                    to="/login"
                                                    className="login-anchor"
                                                >
                                                    Have an Account? LOG IN
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </RegistrationDiv>,
            <Footer key="dashboard-footer"></Footer>,
        ];
    }
}

Registration.propTypes = {
    userData: PropTypes.object,
    fetchUserInfo: PropTypes.func,
};

const mapStateToProps = (state) => ({
    userData: state.user.userData,
});
export default connect(mapStateToProps, { fetchUserInfo })(Registration);
