import React from "react";
import login_image from "../../common/images/login_image.png";
import { LoginDiv } from "./Styling/loginStyling";
import SimpleReactValidator from "simple-react-validator";
import Header from "../includes/header/Header";
import Footer from "../includes/footer/Footer";
import { Link, Redirect, withRouter } from "react-router-dom";
import { responseMessage } from "../../utils/alert";
import CacheStorage from "../../utils/CacheStorage";
import ApiServer from "./../../common/js/ApiServices.js";
import axios from "axios";
import moment from "moment";
import { UserAgentApplication } from "msal";
import { msGraphConfig } from "../../utils/Config.js";
import { normalizeError, getUserProfile } from "../../utils/MSUtils";

const config = require("../../config");

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pathName: props.location.pathname,
            uname: "",
            psw: "",
            validationError: {
                uname: false,
                psw: false,
            },
            loginSuccessfull: false,
        };
        this.validator = new SimpleReactValidator({
            element: (message) => {
                return <p className="text-danger">{message}</p>;
            },
            autoForceUpdate: this,
        });
        this.apiServer = new ApiServer(true);

        this.userAgentApplication = new UserAgentApplication({
            auth: {
                clientId: msGraphConfig.clientId,
                authority: msGraphConfig.authority,
                redirectUri: msGraphConfig.redirectUri,
            },
            cache: {
                cacheLocation: "sessionStorage",
                storeAuthStateInCookie: true,
            },
        });
    }
    showValidationMessage(event) {
        if (this.validator.fieldValid(event.target.name)) {
            this.validator.hideMessageFor(event.target.name);
            this.setState({
                validationError: {
                    ...this.state.validationError,
                    [event.target.name]: false,
                },
            });
        } else {
            this.validator.showMessageFor(event.target.name);
            this.setState({
                validationError: {
                    ...this.state.validationError,
                    [event.target.name]: true,
                },
            });
        }
    }
    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    enterPressHandler = (event) => {
        if (event.keyCode === 13) {
            if (this.validator.allValid()) {
                this.apiServer
                    .SendRequest({
                        method: "POST",
                        url: "/login-user",
                        data: { uname: this.state.uname, psw: this.state.psw },
                    })
                    .then((result) => {
                        if (result.status == "Success") {
                            axios
                                .post(
                                    config.laravelBaseUrl + "saveUserActivity",
                                    {
                                        ActivityDate: moment().format(
                                            "YYYY-MM-DD HH:mm:ss"
                                        ),
                                        TimeZone:
                                            Intl.DateTimeFormat().resolvedOptions()
                                                .timeZone,
                                        Activity: "Login",
                                    },
                                    {
                                        headers: {
                                            Authorization:
                                                "Bearer " + result.data.token,
                                        },
                                    }
                                )
                                .then((res) => {
                                    CacheStorage.setItem(
                                        "userToken",
                                        result.data.token
                                    );
                                    CacheStorage.setItem(
                                        "userType",
                                        result.data.UserTypeID
                                    );
                                    CacheStorage.setItem(
                                        "loginTime",
                                        moment(
                                            res.data.data.ActivityDate
                                        ).format("DD-MMM-YYYY hh:mm A")
                                    );
                                    CacheStorage.setItem(
                                        "userFirstName",
                                        result.data.FirstName +
                                            " " +
                                            result.data.LastName
                                    );
                                    CacheStorage.setItem(
                                        "encryptedAccess",
                                        JSON.stringify(
                                            result.data.ModuleEncrypted
                                        )
                                    );
                                    this.setState({ loginSuccessfull: true });
                                    // if(result.data.UserTypeID === "1") {
                                    //   console.log('got to admin')
                                    //   this.props.history.push("/admin-dashboard");
                                    // }else{
                                    if (this.props.location.search !== "") {
                                        let id = this.props.location.search;
                                        let vlId = id.slice(1);
                                        let array = vlId.split("/");
                                        if (array[1] === "dt-prototype") {
                                            this.props.history.push(`${vlId}`);
                                        } else {
                                            this.props.history.push(`${vlId}`);
                                        }
                                        this.props.history.push(`${vlId}`);
                                    }
                                    if (result.data.Employee === false) {
                                        CacheStorage.setItem(
                                            "menuType",
                                            "dashboard"
                                        );
                                        CacheStorage.setItem(
                                            "menutext",
                                            "dashboard"
                                        );
                                        this.props.history.push("/dashboard");
                                        //}
                                        //this.setState({ industryCollection: result });
                                    } else {
                                        CacheStorage.setItem(
                                            "menuType",
                                            "admin-dashboard"
                                        );
                                        CacheStorage.setItem(
                                            "menutext",
                                            "admin-dashboard"
                                        );
                                        this.props.history.push(
                                            "/admin-dashboard"
                                        );
                                    }
                                })
                                .catch((err) => {
                                    CacheStorage.setItem(
                                        "userToken",
                                        result.data.token
                                    );
                                    CacheStorage.setItem(
                                        "userType",
                                        result.data.UserTypeID
                                    );
                                    CacheStorage.setItem(
                                        "loginTime",
                                        moment().format("DD-MMM-YYYY h:m A")
                                    );
                                    CacheStorage.setItem(
                                        "userFirstName",
                                        result.data.FirstName
                                    );
                                    CacheStorage.setItem(
                                        "encryptedAccess",
                                        JSON.stringify(
                                            result.data.ModuleEncrypted
                                        )
                                    );
                                    if (this.props.location.search !== "") {
                                        let id = this.props.location.search;
                                        let vlId = id.slice(1);
                                        let array = vlId.split("/");
                                        if (array[1] === "dt-prototype") {
                                            this.props.history.push(`${vlId}`);
                                        } else {
                                            this.props.history.push(`${vlId}`);
                                        }
                                        this.props.history.push(`${vlId}`);
                                    }
                                    if (result.data.Employee === false) {
                                        CacheStorage.setItem(
                                            "menuType",
                                            "dashboard"
                                        );
                                        CacheStorage.setItem(
                                            "menutext",
                                            "dashboard"
                                        );
                                        this.props.history.push("/dashboard");
                                        //}
                                        //this.setState({ industryCollection: result });
                                    } else {
                                        CacheStorage.setItem(
                                            "menuType",
                                            "admin-dashboard"
                                        );
                                        CacheStorage.setItem(
                                            "menutext",
                                            "admin-dashboard"
                                        );
                                        this.props.history.push(
                                            "/admin-dashboard"
                                        );
                                    }
                                });
                        } else {
                            responseMessage("error", result.message, "");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.MessageCode == 400) {
                            if (error?.data?.is_expired) {
                                this.props.history.push("/serviceExpiration");
                            }

                            responseMessage("error", error.message, "");
                        } else {
                            responseMessage(
                                "error",
                                "Sorry login attempt failed",
                                ""
                            );
                        }
                    });
            } else {
                this.validator.showMessages();
                if (
                    this.state.validationError.uname == false &&
                    this.state.uname == ""
                ) {
                    this.setState({
                        validationError: {
                            ...this.state.validationError,
                            uname: true,
                        },
                    });
                }
                if (
                    this.state.validationError.psw == false &&
                    this.state.psw == ""
                ) {
                    this.setState({
                        validationError: {
                            ...this.state.validationError,
                            psw: true,
                        },
                    });
                }
            }
        }
    };
    submitForm(event) {
        if (this.validator.allValid()) {
            this.apiServer
                .SendRequest({
                    method: "POST",
                    url: "/login-user",
                    data: { uname: this.state.uname, psw: this.state.psw },
                })
                .then((result) => {
                    if (result.status == "Success") {
                        this.setState({ loginSuccessfull: true });
                        // if(result.data.UserTypeID === "1") {
                        //   console.log('got to admin')
                        //   this.props.history.push("/admin-dashboard");
                        // }else{
                        axios
                            .post(
                                config.laravelBaseUrl + "saveUserActivity",
                                {
                                    ActivityDate: moment().format(
                                        "YYYY-MM-DD HH:mm:ss"
                                    ),
                                    TimeZone:
                                        Intl.DateTimeFormat().resolvedOptions()
                                            .timeZone,
                                    Activity: "Login",
                                },
                                {
                                    headers: {
                                        Authorization:
                                            "Bearer " + result.data.token,
                                    },
                                }
                            )
                            .then((res) => {
                                CacheStorage.setItem(
                                    "userToken",
                                    result.data.token
                                );
                                CacheStorage.setItem(
                                    "userType",
                                    result.data.UserTypeID
                                );
                                CacheStorage.setItem(
                                    "loginTime",
                                    moment(res.data.data.ActivityDate).format(
                                        "DD-MMM-YYYY hh:mm A"
                                    )
                                );
                                CacheStorage.setItem(
                                    "userFirstName",
                                    result.data.FirstName +
                                        " " +
                                        result.data.LastName
                                );
                                CacheStorage.setItem(
                                    "encryptedAccess",
                                    JSON.stringify(result.data.ModuleEncrypted)
                                );
                                if (this.props.location.search !== "") {
                                    let id = this.props.location.search;
                                    let vlId = id.slice(1);
                                    let array = vlId.split("/");
                                    if (array[1] === "dt-prototype") {
                                        this.props.history.push(`${vlId}`);
                                    } else {
                                        this.props.history.push(`${vlId}`);
                                    }
                                    this.props.history.push(`${vlId}`);
                                } else {
                                    if (result.data.Employee === false) {
                                        CacheStorage.setItem(
                                            "menuType",
                                            "dashboard"
                                        );
                                        CacheStorage.setItem(
                                            "menutext",
                                            "dashboard"
                                        );
                                        this.props.history.push("/dashboard");
                                        //}
                                        //this.setState({ industryCollection: result });
                                    } else {
                                        CacheStorage.setItem(
                                            "menuType",
                                            "admin-dashboard"
                                        );
                                        CacheStorage.setItem(
                                            "menutext",
                                            "admin-dashboard"
                                        );
                                        this.props.history.push(
                                            "/admin-dashboard"
                                        );
                                    }
                                }
                                // if(result.data.Employee === false){
                                //   CacheStorage.setItem('menuType', 'dashboard');
                                //   CacheStorage.setItem('menutext', 'dashboard');
                                //   this.props.history.push("/dashboard");
                                // //}
                                // //this.setState({ industryCollection: result });
                                // } else {
                                //   CacheStorage.setItem('menuType', 'admin-dashboard');
                                //   CacheStorage.setItem('menutext', 'admin-dashboard');
                                //   this.props.history.push("/admin-dashboard");
                                // }
                            })
                            .catch((err) => {
                                CacheStorage.setItem(
                                    "userToken",
                                    result.data.token
                                );
                                CacheStorage.setItem(
                                    "userType",
                                    result.data.UserTypeID
                                );
                                CacheStorage.setItem(
                                    "loginTime",
                                    moment().format("DD-MMM-YYYY h:m A")
                                );
                                CacheStorage.setItem(
                                    "userFirstName",
                                    result.data.FirstName
                                );
                                CacheStorage.setItem(
                                    "encryptedAccess",
                                    JSON.stringify(result.data.ModuleEncrypted)
                                );
                                if (this.props.location.search !== "") {
                                    let id = this.props.location.search;
                                    let vlId = id.slice(1);
                                    let array = vlId.split("/");
                                    if (array[1] === "dt-prototype") {
                                        this.props.history.push(`${vlId}`);
                                    } else {
                                        this.props.history.push(`${vlId}`);
                                    }
                                    this.props.history.push(`${vlId}`);
                                } else {
                                    if (result.data.Employee === false) {
                                        CacheStorage.setItem(
                                            "menuType",
                                            "dashboard"
                                        );
                                        CacheStorage.setItem(
                                            "menutext",
                                            "dashboard"
                                        );
                                        this.props.history.push("/dashboard");
                                        //}
                                        //this.setState({ industryCollection: result });
                                    } else {
                                        CacheStorage.setItem(
                                            "menuType",
                                            "admin-dashboard"
                                        );
                                        CacheStorage.setItem(
                                            "menutext",
                                            "admin-dashboard"
                                        );
                                        this.props.history.push(
                                            "/admin-dashboard"
                                        );
                                    }
                                }
                                // if(result.data.Employee === false){
                                //   CacheStorage.setItem('menuType', 'dashboard');
                                //   CacheStorage.setItem('menutext', 'dashboard');
                                //   this.props.history.push("/dashboard");
                                // //}
                                // //this.setState({ industryCollection: result });
                                // } else {
                                //   CacheStorage.setItem('menuType', 'admin-dashboard');
                                //   CacheStorage.setItem('menutext', 'admin-dashboard');
                                //   this.props.history.push("/admin-dashboard");
                                // }
                            });
                    } else {
                        responseMessage("error", result.message, "");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (error.MessageCode === 400) {
                        if (error?.data?.is_expired) {
                            this.props.history.push("/serviceExpiration");
                        }
                        responseMessage("error", error.message, "");
                    } else {
                        responseMessage(
                            "error",
                            "Sorry login attempt failed",
                            ""
                        );
                    }
                });
        } else {
            this.validator.showMessages();
            if (
                this.state.validationError.uname == false &&
                this.state.uname == ""
            ) {
                this.setState({
                    validationError: {
                        ...this.state.validationError,
                        uname: true,
                    },
                });
            }
            if (
                this.state.validationError.psw == false &&
                this.state.psw == ""
            ) {
                this.setState({
                    validationError: {
                        ...this.state.validationError,
                        psw: true,
                    },
                });
            }
        }
    }
    async login() {
        try {
            await this.userAgentApplication.loginPopup({
                scopes: msGraphConfig.scopes,
                prompt: "select_account",
            });

            const user = await getUserProfile(
                this.userAgentApplication,
                msGraphConfig.scopes
            );
            if (user) {
                //CacheStorage.setItem("azureDisplayName", user.displayName);
                //CacheStorage.setItem("azureUserEmail",user.mail || user.userPrincipalName);

                this.apiServer
                    .SendRequest({
                        method: "POST",
                        url: "/checkLogin",
                        data: { uname: user.mail || user.userPrincipalName },
                    })
                    .then((result) => {
                        if (result.status == "Success") {
                            this.setState({ loginSuccessfull: true });

                            axios
                                .post(
                                    config.laravelBaseUrl + "saveUserActivity",
                                    {
                                        ActivityDate: moment().format(
                                            "YYYY-MM-DD HH:mm:ss"
                                        ),
                                        TimeZone:
                                            Intl.DateTimeFormat().resolvedOptions()
                                                .timeZone,
                                        Activity: "Login",
                                    },
                                    {
                                        headers: {
                                            Authorization:
                                                "Bearer " + result.data.token,
                                        },
                                    }
                                )
                                .then((res) => {
                                    CacheStorage.setItem(
                                        "userToken",
                                        result.data.token
                                    );
                                    CacheStorage.setItem(
                                        "userType",
                                        result.data.UserTypeID
                                    );
                                    CacheStorage.setItem(
                                        "loginTime",
                                        moment(
                                            res.data.data.ActivityDate
                                        ).format("DD-MMM-YYYY hh:mm A")
                                    );
                                    CacheStorage.setItem(
                                        "userFirstName",
                                        result.data.FirstName +
                                            " " +
                                            result.data.LastName
                                    );
                                    CacheStorage.setItem(
                                        "encryptedAccess",
                                        JSON.stringify(
                                            result.data.ModuleEncrypted
                                        )
                                    );
                                    if (this.props.location.search !== "") {
                                        let id = this.props.location.search;
                                        let vlId = id.slice(1);
                                        let array = vlId.split("/");
                                        if (array[1] === "dt-prototype") {
                                            this.props.history.push(`${vlId}`);
                                        } else {
                                            this.props.history.push(`${vlId}`);
                                        }
                                        this.props.history.push(`${vlId}`);
                                    }
                                    if (result.data.Employee === false) {
                                        CacheStorage.setItem(
                                            "menuType",
                                            "dashboard"
                                        );
                                        CacheStorage.setItem(
                                            "menutext",
                                            "dashboard"
                                        );
                                        this.props.history.push("/dashboard");
                                    } else {
                                        CacheStorage.setItem(
                                            "menuType",
                                            "admin-dashboard"
                                        );
                                        CacheStorage.setItem(
                                            "menutext",
                                            "admin-dashboard"
                                        );
                                        this.props.history.push(
                                            "/admin-dashboard"
                                        );
                                    }
                                })
                                .catch((err) => {
                                    CacheStorage.setItem(
                                        "userToken",
                                        result.data.token
                                    );
                                    CacheStorage.setItem(
                                        "userType",
                                        result.data.UserTypeID
                                    );
                                    CacheStorage.setItem(
                                        "loginTime",
                                        moment().format("DD-MMM-YYYY h:m A")
                                    );
                                    CacheStorage.setItem(
                                        "userFirstName",
                                        result.data.FirstName
                                    );
                                    CacheStorage.setItem(
                                        "encryptedAccess",
                                        JSON.stringify(
                                            result.data.ModuleEncrypted
                                        )
                                    );
                                    if (this.props.location.search !== "") {
                                        let id = this.props.location.search;
                                        let vlId = id.slice(1);
                                        let array = vlId.split("/");
                                        if (array[1] === "dt-prototype") {
                                            this.props.history.push(`${vlId}`);
                                        } else {
                                            this.props.history.push(`${vlId}`);
                                        }
                                        this.props.history.push(`${vlId}`);
                                    }
                                    if (result.data.Employee === false) {
                                        CacheStorage.setItem(
                                            "menuType",
                                            "dashboard"
                                        );
                                        CacheStorage.setItem(
                                            "menutext",
                                            "dashboard"
                                        );
                                        this.props.history.push("/dashboard");
                                    } else {
                                        CacheStorage.setItem(
                                            "menuType",
                                            "admin-dashboard"
                                        );
                                        CacheStorage.setItem(
                                            "menutext",
                                            "admin-dashboard"
                                        );
                                        this.props.history.push(
                                            "/admin-dashboard"
                                        );
                                    }
                                });
                        } else {
                            responseMessage("error", result.message, "");
                        }
                    })
                    .catch((error) => {
                        if (error.MessageCode === 400) {
                            if (error?.data?.is_expired) {
                                this.props.history.push("/serviceExpiration");
                            }
                            responseMessage("error", error.message, "");
                        } else {
                            responseMessage(
                                "error",
                                "Sorry login attempt failed",
                                ""
                            );
                        }
                    });
            }
            /*this.setState({
        isAuthenticated: true,
        user: {
          displayName: user.displayName,
          email: user.mail || user.userPrincipalName
        },
        error: null
      });*/
        } catch (err) {
            this.setState({
                isAuthenticated: false,
                user: {},
                error: normalizeError(err),
            });
        }
    }
    render() {
        if (this.props.location.search !== "") {
            let id = this.props.location.search;
            let vlId = id.slice(1);
            console.log("location", vlId);
        }

        console.log("loginLoction=>", this.props.location);

        console.log(moment().format("YYYY-MM-DD HH:mm:ss"));
        if (this.props.match.params.id == "success") {
            var successMsg = "Your account has been successfully verified.";
        } else if (this.props.match.params.id == "error") {
            var errorMsg = "Your account is not Verified Yet.";
        } else {
            var successMsg = "";
            var errorMsg = "";
        }
        return [
            <Header key="header"></Header>,
            <LoginDiv id="login-wrapper" key="body-wrapper">
                <div className="container-fluid container-signup">
                    <div className="signup-row">
                        <div className="signup-content-left">
                            <div className="img-head">
                                <h1>
                                    AI-POWERED <br />
                                    ASSESSMENTS
                                </h1>
                                <p className="para">
                                    AmploFly 4.0 tracks your Digital
                                    transformation with the power of Industry
                                    4.0
                                </p>
                            </div>
                            <img
                                className="img-login"
                                src={login_image}
                                alt=""
                            />
                        </div>

                        <div className="signup-content-right">
                            <div className="col-sm-12 col-md-11 col-lg-8">
                                <div className="divition"></div>
                                <h2 className="mt-5 mb-4">
                                    Log in to AmploFly 4.0
                                </h2>
                                <div id="successMsg" style={{ color: "green" }}>
                                    {" "}
                                    {successMsg}{" "}
                                </div>
                                <div id="errorMsg" style={{ color: "red" }}>
                                    {" "}
                                    {errorMsg}{" "}
                                </div>
                                <form autoComplete="off">
                                    <div className="form-group">
                                        <label>
                                            Username{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="uname"
                                            placeholder="Company Email"
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
                                                this.state.validationError.uname
                                                    ? { borderColor: "red" }
                                                    : {}
                                            }
                                        />
                                        {this.validator.message(
                                            "uname",
                                            this.state.uname,
                                            "required|email",
                                            {
                                                messages: {
                                                    required:
                                                        "Username is required",
                                                    email: "Invalid email",
                                                },
                                            }
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Password{" "}
                                            <span className="text-danger">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="password"
                                            name="psw"
                                            className="form-control"
                                            placeholder="Password"
                                            onChange={this.handleInputChange.bind(
                                                this
                                            )}
                                            onKeyUp={this.showValidationMessage.bind(
                                                this
                                            )}
                                            onKeyDown={(e) =>
                                                this.enterPressHandler(e)
                                            }
                                            onBlur={this.showValidationMessage.bind(
                                                this
                                            )}
                                            style={
                                                this.state.validationError.psw
                                                    ? { borderColor: "red" }
                                                    : {}
                                            }
                                        />
                                        {this.validator.message(
                                            "psw",
                                            this.state.psw,
                                            "required",
                                            {
                                                messages: {
                                                    required:
                                                        "Password is required",
                                                },
                                            }
                                        )}
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="exampleCheck1"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="exampleCheck1"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="form-group mt-3">
                                        <button
                                            type="button"
                                            onClick={this.submitForm.bind(this)}
                                            className="btn btn-block btn-primary"
                                        >
                                            Log In
                                        </button>
                                    </div>
                                </form>
                                <div className="text-center login-bootom-text">
                                    <p>
                                        <b>
                                            <Link to="/forgot-password">
                                                I forgot my password
                                            </Link>
                                        </b>
                                    </p>
                                    <p>
                                        <b>
                                            {/* <button type="button"  className="btn btn-block btn-primary" onClick={() => this.login()}>Login with Microsoft account</button> */}
                                        </b>
                                    </p>
                                    <p>
                                        <i>
                                            By clicking Sign In, you agree to
                                            the Amplo (AmploFly 4.0){" "}
                                            <a href="#">Terms of Service</a>,
                                            Amplo (AmploFly 4.0){" "}
                                            <a href="#">Terms of Use</a> and
                                            have read and acknowledge our{" "}
                                            <a href="#">Privacy Statement.</a>
                                        </i>
                                    </p>
                                    <hr className="mb-4 mt-4" />
                                    <p>
                                        <b>
                                            New User?{" "}
                                            <Link to="/registration">
                                                Register Now
                                            </Link>
                                        </b>
                                    </p>
                                    <p>
                                        <b>
                                            Amplo Employees?{" "}
                                            <Link to="/emp-registration">
                                                Sign Up here
                                            </Link>
                                        </b>
                                    </p>
                                    <p>
                                        Invisible reCAPTCHA by Google
                                        <a href="#"> Privacy Policy</a> and{" "}
                                        <a href="#"> Terms of Use</a>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LoginDiv>,
            <Footer key="footer"></Footer>,
        ];
    }
}
export default withRouter(Login);
