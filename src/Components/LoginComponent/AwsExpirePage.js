import React from "react";
import login_image from "../../common/images/login_image.png";
import { LoginDiv } from "./Styling/loginStyling";
import Header from "../includes/header/Header";
import Footer from "../includes/footer/Footer";
import { Link, Redirect, withRouter } from "react-router-dom";

const AwsExpirePage = () => {
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
                                AmploFly 4.0 tracks your Digital transformation
                                with the power of Industry 4.0
                            </p>
                        </div>
                        <img className="img-login" src={login_image} alt="" />
                    </div>

                    <div className="signup-content-right mt-5">
                        <div className="col-sm-12 col-md-11 col-lg-10">
                            <div className="d-flex flex-column justify-center">
                                <h2 className="text-center text-danger">
                                    There seems to be an issue with your AWS
                                    subscription. Please validate your
                                    subscription details in AWS.
                                </h2>
                                <div className="d-flex mt-4">
                                    <a
                                        href="https://aws.amazon.com/console/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="m-auto"
                                    >
                                        <button className="btn btn-primary">
                                            Go to Aws page
                                        </button>
                                    </a>
                                    <Link to="/login" className="m-auto">
                                        <button className="btn btn-primary ">
                                            Login Page
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LoginDiv>,
        <Footer key="footer"></Footer>,
    ];
};

export default withRouter(AwsExpirePage);
