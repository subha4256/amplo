import React, { Component } from "react";
import { connect } from "react-redux";
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardFooter from "../includes/dashboardFooter/FooterComponent";
import { RegistrationDiv } from "../registrationComponent/registrationStyling";
import IntlTelInput from "react-intl-tel-input";
import { Link } from "react-router-dom";
import { fetchRegistrationDetails } from "../../actions/dashboardDataActions";
import ApiServer from "./../../common/js/ApiServices.js";
import Axios from "axios";
import config from "../../config";
import { printDocument } from "../Business Reports/PDFConvert/savePdf";

class RegistrationDetails extends Component {
    constructor(props) {
        super(props);
        this.apiServer = new ApiServer(true);
        this.state = {
            revenueCollection: [],
            industryCollection: [],
            contactDetails: {},
        };
    }

    componentDidMount = () => {
        this.props.fetchRegistrationDetails();
        this.fetchIndustryCollection();
        this.fetchRevenueCollection();

        Axios.get(`${config.laravelBaseUrl}getClientProfile`, {
            headers: {
                authorization: "Bearer " + sessionStorage.getItem("userToken"),
            },
        })
            .then((res) => {
                console.log("res =>", res);
                this.setState({ ...this.state, contactDetails: res.data.data });
            })
            .catch((error) => console.log(error));
    };

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
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        console.log(this.state);
        return (
            <>
                <DashboardHeader />
                <RegistrationDiv id="login-wrapper" 
                >
                    <div className="container-fluid container-signup"  id="registration_details_page">
                        <div className="regitration-row">
                            <div
                               
                                className="main-header row"
                                style={{ marginTop: "2%" }}
                            >
                                <div className="col-11 text-center">
                                    <h1 className="mb-3 ml-4">
                                        User Registration Details
                                    </h1>
                                    <p>
                                        <span className="p1"></span>
                                    </p>
                                </div>
                                <div className="col-1 d-flex justify-content-end">
                                    <div>
                                        <button className="btn-primary" 
                                        id="downLoad_button_PDF"
                                        onClick={() =>printDocument("registration_details_page")}
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
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
                                                className="form-control legendF disabled-field"
                                                placeholder="Organization*"
                                                id="organisation"
                                                value={
                                                    this.props
                                                        .registrationData[0]
                                                        ? this.props
                                                              .registrationData[0]
                                                              .ClientName
                                                        : ""
                                                }
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <legend className="legends">
                                                Division
                                                <span className="star">*</span>
                                            </legend>
                                            <input
                                                type="text"
                                                className="form-control legendF disabled-field"
                                                id="division"
                                                placeholder="division*"
                                                value={
                                                    this.props
                                                        .registrationData[0]
                                                        ? this.props
                                                              .registrationData[0]
                                                              .ClientBusinessUnit
                                                        : ""
                                                }
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <legend className="legends">
                                                Parent Company
                                            </legend>
                                            <input
                                                type="text"
                                                className="form-control legendF disabled-field"
                                                id="parentcompany"
                                                placeholder="Parent Company"
                                                value={
                                                    this.props
                                                        .registrationData[0]
                                                        ? this.props
                                                              .registrationData[0]
                                                              .ClientParentCompany
                                                        : ""
                                                }
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <legend className="legends">
                                                Subscription
                                            </legend>
                                            <input
                                                type="text"
                                                className="form-control legendF disabled-field"
                                                placeholder="Subscription"
                                                value={
                                                    this.props
                                                        .registrationData[0]
                                                        ? this.props
                                                              .registrationData[0]
                                                              .SubscriptionName
                                                        : ""
                                                }
                                                disabled={true}
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
                                                className="form-control legendF disabled-field"
                                                value={
                                                    this.props
                                                        .registrationData[0]
                                                        ? this.props
                                                              .registrationData[0]
                                                              .IndustryID
                                                        : ""
                                                }
                                                disabled={true}
                                            >
                                                <option
                                                    selected
                                                    disabled
                                                    value=""
                                                >
                                                    Industry*
                                                </option>
                                                {this.state.industryCollection.map(
                                                    (industry) => {
                                                        return (
                                                            <option
                                                                key={
                                                                    industry.ID
                                                                }
                                                                value={
                                                                    industry.ID
                                                                }
                                                            >
                                                                {
                                                                    industry.valueToShow
                                                                }
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
                                        </div>
                                        <div className="col-sm-6">
                                            <legend className="legends">
                                                Organization Revenue
                                                <span className="star">*</span>
                                            </legend>
                                            <select
                                                id="organisationrevenue"
                                                className="form-control legendF disabled-field"
                                                value={
                                                    this.props
                                                        .registrationData[0]
                                                        ? this.props
                                                              .registrationData[0]
                                                              .ClientRevenueRangeID
                                                        : ""
                                                }
                                                disabled={true}
                                            >
                                                <option
                                                    selected
                                                    disabled
                                                    value=""
                                                >
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
                                                            {
                                                                revenue.valueToShow
                                                            }
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <legend className="legends">
                                                Company Name
                                            </legend>
                                            <input
                                                type="text"
                                                className="form-control legendF disabled-field"
                                                id="parentcompany"
                                                placeholder="Parent Company"
                                                value={
                                                    this.state.contactDetails
                                                        .CompanyName
                                                        ? this.state
                                                              .contactDetails
                                                              .CompanyName
                                                        : ""
                                                }
                                                disabled={true}
                                            />
                                        </div>

                                        <div className="col-sm-6">
                                            <legend className="legends">
                                                EntrepreneurName
                                            </legend>
                                            <input
                                                type="text"
                                                className="form-control legendF disabled-field"
                                                id="parentcompany"
                                                placeholder="Parent Company"
                                                value={
                                                    this.state.contactDetails
                                                        .EntrepreneurName
                                                        ? this.state
                                                              .contactDetails
                                                              .EntrepreneurName
                                                        : ""
                                                }
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <legend className="legends">
                                                ERPSystem
                                            </legend>
                                            <input
                                                type="text"
                                                className="form-control legendF disabled-field"
                                                id="parentcompany"
                                                placeholder="Parent Company"
                                                value={
                                                    this.state.contactDetails
                                                        .ERPSystem
                                                        ? this.state
                                                              .contactDetails
                                                              .ERPSystem
                                                        : ""
                                                }
                                                disabled={true}
                                            />
                                        </div>
                                    </div>

                                    <h5 className="org">
                                        Personal Information
                                    </h5>
                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <legend className="legends">
                                                First Name
                                                <span className="star">*</span>
                                            </legend>
                                            <input
                                                type="text"
                                                className="form-control legendF disabled-field"
                                                placeholder="First Name*"
                                                id="fn"
                                                value={
                                                    this.props
                                                        .registrationData[0]
                                                        ? this.props
                                                              .registrationData[0]
                                                              .FirstName
                                                        : ""
                                                }
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <legend className="legends">
                                                Middle Name
                                            </legend>
                                            <input
                                                type="text"
                                                className="form-control legendF disabled-field"
                                                placeholder="Middle Name"
                                                id="mn"
                                                value={
                                                    this.props
                                                        .registrationData[0]
                                                        ? this.props
                                                              .registrationData[0]
                                                              .MiddleName
                                                        : ""
                                                }
                                                disabled={true}
                                            />
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
                                                className="form-control legendF disabled-field"
                                                placeholder="Last Name*"
                                                id="ln"
                                                value={
                                                    this.props
                                                        .registrationData[0]
                                                        ? this.props
                                                              .registrationData[0]
                                                              .LastName
                                                        : ""
                                                }
                                                disabled={true}
                                            />
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
                                            <input
                                                type="text"
                                                className="form-control legendF disabled-field"
                                                placeholder="Phone Number*"
                                                id="ln"
                                                value={
                                                    this.props
                                                        .registrationData[0]
                                                        ? this.props
                                                              .registrationData[0]
                                                              .PhoneNumber
                                                        : ""
                                                }
                                                disabled={true}
                                            />
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-sm-6">
                                            <legend className="legends">
                                                PayrollEmployee
                                                <span className="star">*</span>
                                            </legend>
                                            <input
                                                type="text"
                                                className="form-control legendF disabled-field"
                                                placeholder="First Name*"
                                                id="fn"
                                                value={
                                                    this.state.contactDetails
                                                        .PayrollEmployee
                                                        ? this.state
                                                              .contactDetails
                                                              .PayrollEmployee
                                                        : ""
                                                }
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <legend className="legends">
                                                SubContractedEmployee
                                            </legend>
                                            <input
                                                type="text"
                                                className="form-control legendF disabled-field"
                                                placeholder="Middle Name"
                                                id="mn"
                                                value={
                                                    this.state.contactDetails
                                                        .SubContractedEmployee
                                                        ? this.state
                                                              .contactDetails
                                                              .SubContractedEmployee
                                                        : ""
                                                }
                                                disabled={true}
                                            />
                                        </div>
                                    </div>

                                    <div className="row mt-4 mb-5">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <Link
                                                    to="/dashboard"
                                                    className="btn btn-block btn-primary"
                                                >
                                                    Go back
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </RegistrationDiv>
                <DashboardFooter />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    registrationData: state.dashboardData.registrationData,
});

export default connect(mapStateToProps, { fetchRegistrationDetails })(
    RegistrationDetails
);
