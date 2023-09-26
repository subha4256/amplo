import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Card, CardHeader, CardBody, Row, Col, Button, Label, Form } from 'reactstrap';
const config = require('../../config');

class AccountDetailForm extends Component {
    state = {
        startDate: new Date(),
        CompanyLogo: 'https://avatars.dicebear.com/v2/identicon/john-doe.svg',
        clientDetail: {},
        errors: {}
    };
    static getDerivedStateFromProps(nextProps) {
        if(nextProps.clientDetail.CompanyLogo) {
            return({
                CompanyLogo: config.ApiBaseUrl+'images/'+nextProps.clientDetail.CompanyLogo,
                clientDetail: nextProps.clientDetail
            });
        }else{
            return({
                CompanyLogo: 'https://avatars.dicebear.com/v2/identicon/john-doe.svg',
                clientDetail: nextProps.clientDetail
            });
        }
    }
    deleteCompanyLogo(e) {
        e.preventDefault();
        this.setState({
            filePreview: "",
            CompanyLogo: null
        }, function() {
            this.props.deleteCompanyLogo();
        })
    }
    render() {
        const errors = this.props.errors;
        let FirstAuditDate, EffectiveDate, ExpiryDate, RecentAuditDate = this.state.startDate;
        if(Object.keys(this.state.clientDetail).length > 0) {
            FirstAuditDate = this.state.clientDetail.FirstAuditDate;
            if(FirstAuditDate) {
                FirstAuditDate = new Date(FirstAuditDate);
            }
            EffectiveDate = this.state.clientDetail.StartDate;
            if(EffectiveDate) {
                EffectiveDate = new Date(EffectiveDate);
            }
            ExpiryDate = this.state.clientDetail.EndDate;
            if(ExpiryDate) {
                ExpiryDate = new Date(ExpiryDate);
            }
            RecentAuditDate = this.state.clientDetail.RecentAuditDate;
            if(RecentAuditDate) {
                RecentAuditDate = new Date(RecentAuditDate);
            }
        }
        let industryOptions = this.props.marketIndustries.map((industry, index) => {
            return (
                <option key={'indusryOpt-'+index} value={industry.ID} selected={this.state.clientDetail.IndustryID === industry.ID}>{ industry.valueToShow }</option>
            )
        });
        let industryVerticalOptions = this.props.industries.map((industry, index) => {
            return (
                <option key={'indusryVerticalOpt-'+index} value={industry.IndustryVerticalID} selected={this.state.clientDetail.IndustryVerticalID === industry.IndustryVerticalID}>{ industry.IndustryVerticalName }</option>
            )
        });
        let subVerticalOptions = [];
        if(this.props.industrySubVertical) {
            subVerticalOptions = this.props.industrySubVertical.map((subVertical, index) => {
                return (
                    <option key={'indusryVericalOpt-'+index} value={subVertical.IndustrySubVerticalID} selected={this.state.clientDetail.IndustrySubVerticalID === subVertical.IndustrySubVerticalID}>{ subVertical.IndustrySubVerticalName }</option>
                )
            });
        }
        let regionOptions = this.props.regions.map((region, index) => {
            return (
                <option key={'regionOpt-'+index} value={region.RegionID} selected={this.state.clientDetail ? this.state.clientDetail.CountryRegionCodeID === region.RegionID : ''}>{ region.RegionName }</option>
            )
        });
        let countryOptions = this.props.countries.map((country, index) => {
            return (
                <option key={'countryOpt-'+index} value={country.CountryID} selected={this.state.clientDetail ? this.state.clientDetail.Country === country.CountryID : ''}>{ country.CountryName }</option>
            )
        });
        let stateOptions = this.props.states.map((state, index) => {
            return (
                <option key={'stateOpt-'+index} value={state.StateProvinceCode.trim()} selected={this.state.clientDetail ? this.state.clientDetail.StateTerritory === state.StateProvinceCode.trim() : ''}>{ state.Name }</option>
            )
        });
        let cityOptions = this.props.cities.map((city, index) => {
            return (
                <option key={'cityOpt-'+index} value={city.NAME} selected={this.state.clientDetail.City ? this.state.clientDetail.City === city.NAME : ''}>{ city.NAME }</option>
            )
        });
        return (
            <>
                <h1 className="heading">Client Detail</h1>
                <Card className="enter-account-management">
                    <CardHeader>
                        View Information
                    </CardHeader>
                    <CardBody>
                        <Col sm="12" md="12" lg="10" className="user-form-section p-0">
                            <Form onSubmit={this.props.handleSubmit}>
                                <Row className="form-group">
                                    <Col sm="12">
                                        <Row className="form-group pad015px row">
                                            <div className="dropdown-width tab-fullwidth100">
                                                <Label>Client Name<span className="text-danger">*</span></Label>
                                                <input type="text" className="form-control textbox-control" placeholder="ABC Company" name="ClientName" value={this.state.clientDetail.ClientName ? this.state.clientDetail.ClientName : ''} onChange={(e) => this.props.handleInputChange(e)} />
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.ClientName ? <p className="text-danger">{errors.data.ClientName[0]}</p> : <></>}
                                            </div>
                                            <div className="dropdown-width tab-fullwidth100">
                                                <Label>Industry<span className="text-danger">*</span></Label>
                                                <select className="form-control" name="IndustryID" onChange={(e) => this.props.handleInputChange(e)}>
                                                    <option value=''>Please Select</option>
                                                    { industryOptions }
                                                </select>
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.IndustryID ? <p className="text-danger">{errors.data.IndustryID[0]}</p> : <></>}
                                            </div>
                                        </Row>
                                        <Row className="form-group pad015px">
                                            <div className="dropdown-width tab-fullwidth100">
                                                <Label>Industry Vertical<span className="text-danger">*</span></Label>
                                                <select className="form-control" name="IndustryVerticalID" onChange={this.props.handleIndustryChange}>
                                                    <option value=''>Please Select</option>
                                                    { industryVerticalOptions }
                                                </select>
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.IndustryVerticalID ? <p className="text-danger">{errors.data.IndustryVerticalID[0]}</p> : <></>}
                                            </div>
                                            <div className="dropdown-width tab-fullwidth100">
                                                <Label>Sub Vertical<span className="text-danger">*</span></Label>
                                                <select className="form-control" name="IndustrySubVerticalID" onChange={(e) => this.props.handleInputChange(e)}>
                                                    <option value=''>Please Select</option>
                                                    { subVerticalOptions }
                                                </select>
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.IndustrySubVerticalID ? <p className="text-danger">{errors.data.IndustrySubVerticalID[0]}</p> : <></>}
                                            </div>
                                        </Row>
                                        <Row className="form-group pad015px">
                                            <div className="dropdown-width tab-fullwidth100">
                                                <Label>No. of Employees<span className="text-danger">*</span></Label>
                                                <input type="text" className="form-control textbox-control" name="NoOfEmployees" onChange={(e) => this.props.handleInputChange(e)} value={this.state.clientDetail.NoOfEmployees ? this.state.clientDetail.NoOfEmployees : ''} />
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.NoOfEmployees ? <p className="text-danger">{errors.data.NoOfEmployees[0]}</p> : <></>}
                                            </div>
                                            <div className="dropdown-width tab-fullwidth100">
                                                <Label>Geographic Region<span className="text-danger">*</span></Label>
                                                <select className="form-control" name="CountryRegionCodeID" onChange={(e) => this.props.handleInputChange(e)}>
                                                    <option value=''>Please Select</option>
                                                    { regionOptions }
                                                </select>
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.CountryRegionCodeID ? <p className="text-danger">{errors.data.CountryRegionCodeID[0]}</p> : <></>}
                                            </div>
                                        </Row>
                                        <Row className="form-group pad015px">
                                            <div className="dropdown-width tab-fullwidth100">
                                                <Label>Address Line 1<span className="text-danger">*</span></Label>
                                                <input type="text" className="form-control textbox-control" name="Address1" onChange={(e) => this.props.handleInputChange(e)} value={this.state.clientDetail.Address1 ? this.state.clientDetail.Address1 : ''} />
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.Address1 ? <p className="text-danger">{errors.data.Address1[0]}</p> : <></>}
                                            </div>
                                            <div className="dropdown-width tab-fullwidth100">
                                                <Label>Address Line 2<span className="text-danger">*</span></Label>
                                                <input type="text" className="form-control textbox-control" name="Address2" onChange={(e) => this.props.handleInputChange(e)} value={this.state.clientDetail.Address2 ? this.state.clientDetail.Address2 : ''} />
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.Address2 ? <p className="text-danger">{errors.data.Address2[0]}</p> : <></>}
                                            </div>
                                        </Row>
                                        <Row className="form-group pad015px">
                                            <div className="dropdown-width tab-fullwidth100">
                                                <Label>Country<span className="text-danger">*</span></Label>
                                                <select className="form-control" name="Country" onChange={(e) => this.props.handleCountryChange(e)}>
                                                    <option value=''>Please Select</option>
                                                    { countryOptions }
                                                </select>
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.Country ? <p className="text-danger">{errors.data.Country[0]}</p> : <></>}
                                            </div>
                                            <div className="dropdown-width tab-fullwidth100">
                                                <Label>State<span className="text-danger">*</span></Label>
                                                <select className="form-control" name="StateTerritory" onChange={(e) => this.props.handleStateChange(e)}>
                                                    <option value=''>Please Select</option>
                                                    { stateOptions }
                                                </select>
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.StateTerritory ? <p className="text-danger">{errors.data.StateTerritory[0]}</p> : <></>}
                                            </div>
                                        </Row>
                                        <Row className="form-group pad015px row">
                                            <div className="dropdown-width tab-fullwidth100">
                                                <Label>City<span className="text-danger">*</span></Label>
                                                <select className="form-control" name="City" onChange={(e) => this.props.handleInputChange(e)}>
                                                    <option value=''>Please Select</option>
                                                    { cityOptions }
                                                </select>
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.City ? <p className="text-danger">{errors.data.City[0]}</p> : <></>}
                                            </div>
                                            <div className="dropdown-width tab-fullwidth100">
                                                <Label>Postal Code<span className="text-danger">*</span></Label>
                                                <input type="text" className="form-control textbox-control" placeholder="Postal Code" name="PostalCode" value={this.state.clientDetail.PostalCode ? this.state.clientDetail.PostalCode : ''} onChange={(e) => this.props.handleInputChange(e)} />
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.PostalCode ? <p className="text-danger">{errors.data.PostalCode[0]}</p> : <></>}
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                                <div className="">
                                    <h4 className="headerlabel-enterprisepage">License Information</h4>
                                </div>
                                <Row className="form-group pad015px">
                                    <div className="dropdown-width tab-fullwidth100">
                                            <Label>License Key<span className="text-danger">*</span></Label>
                                            <input type="text" className="form-control textbox-control" name="SubscriptionKey" onChange={(e) => this.props.handleInputChange(e)} placeholder="Finance" value={this.state.clientDetail.SubscriptionKey ? this.state.clientDetail.SubscriptionKey : ''} />
                                            {Object.keys(errors).length > 0 && errors.data && errors.data.SubscriptionKey ? <p className="text-danger">{errors.data.SubscriptionKey[0]}</p> : <></>}
                                    </div>
                                </Row>
                                <Row className="form-group pad015px">
                                    <div className="dropdown-width tab-fullwidth100">
                                        <Label className="date-label">Effective Date<span className="text-danger">*</span></Label>
                                        <div className="">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fas fa-calendar-alt"></i>
                                                    </div>
                                                </div>
                                                <DatePicker
                                                    className="form-control textbox-control dateControl-class"
                                                    selected={this.state.clientDetail ? EffectiveDate : this.state.startDate}
                                                    onChange={(date) => this.props.handleEffectiveChange(date)}
                                                />
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.StartDate ? <p className="text-danger">{errors.data.StartDate[0]}</p> : <></>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dropdown-width tab-fullwidth100">
                                        <Label className="date-label">Expiration Date<span className="text-danger">*</span></Label>
                                        <div className="">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fas fa-calendar-alt"></i>
                                                    </div>
                                                </div>
                                                <DatePicker
                                                    className="form-control textbox-control dateControl-class"
                                                    selected={this.state.clientDetail ? ExpiryDate : this.state.startDate}
                                                    onChange={(date) => this.props.handleExpiryChange(date)}
                                                />
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.EndDate ? <p className="text-danger">{errors.data.EndDate[0]}</p> : <></>}
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <Row className="form-group pad015px">
                                    <div className="dropdown-width tab-fullwidth100">
                                        <Label>Audit Frequency <span className="text-danger">*</span></Label>
                                        <select className="form-control" name="AuditFrequency" value={this.state.clientDetail.AuditFrequency} onChange={(e) => this.props.handleInputChange(e)}>
                                            <option value="">Please Select</option>
                                            <option value="Quarterly">Quarterly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="Semi-Annually">Semi-Annually</option>
                                            <option value="Annually">Annually</option>
                                        </select>
                                        {Object.keys(errors).length > 0 && errors.data && errors.data.AuditFrequency ? <p className="text-danger">{errors.data.AuditFrequency[0]}</p> : <></>}
                                    </div>
                                </Row>
                                <Row className="form-group pad015px">
                                    <div className="dropdown-width tab-fullwidth100">
                                        <Label className="date-label">First Audit Date<span className="text-danger">*</span></Label>
                                        <div className="">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fas fa-calendar-alt"></i>
                                                    </div>
                                                </div>
                                                <DatePicker
                                                    className="form-control textbox-control dateControl-class"
                                                    selected={this.state.clientDetail ? FirstAuditDate : this.state.startDate}
                                                    onChange={(date) => this.props.handleFirstAuditChange(date)}
                                                />
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.FirstAuditDate ? <p className="text-danger">{errors.data.FirstAuditDate[0]}</p> : <></>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dropdown-width tab-fullwidth100">
                                        <Label className="date-label">Recent Audit Date<span className="text-danger">*</span></Label>
                                        <div className="">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="fas fa-calendar-alt"></i>
                                                    </div>
                                                </div>
                                                <DatePicker
                                                    className="form-control textbox-control dateControl-class"
                                                    selected={this.state.clientDetail ? RecentAuditDate : this.state.startDate}
                                                    onChange={(date) => this.props.handleRecentAuditChange(date)}
                                                />
                                                {Object.keys(errors).length > 0 && errors.data && errors.data.RecentAuditDate ? <p className="text-danger">{errors.data.RecentAuditDate[0]}</p> : <></>}
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <div>
                                    <h4 className="headerlabel-enterprisepage">Point of Contact</h4>
                                </div>
                                <Row className="form-group pad015px">
                                    <div className="dropdown-width tab-fullwidth100">
                                        <Label>First Name<span className="text-danger">*</span></Label>
                                        <input type="text" className="form-control textbox-control" placeholder="ABC" name="FirstName" onChange={(e) => this.props.handleInputChange(e)} value={this.state.clientDetail.FirstName ? this.state.clientDetail.FirstName : ''} />
                                        {Object.keys(errors).length > 0 && errors.data && errors.data.FirstName ? <p className="text-danger">{errors.data.FirstName[0]}</p> : <></>}
                                    </div>
                                    <div className="dropdown-width tab-fullwidth100">
                                        <Label>Last Name<span className="text-danger">*</span></Label>
                                        <input type="text" className="form-control textbox-control" placeholder="xxx" name="LastName" onChange={(e) => this.props.handleInputChange(e)} value={this.state.clientDetail.LastName ? this.state.clientDetail.LastName : ''} />
                                        {Object.keys(errors).length > 0 && errors.data && errors.data.LastName ? <p className="text-danger">{errors.data.LastName[0]}</p> : <></>}
                                    </div>
                                </Row>
                                <Row className="form-group pad015px">
                                    <div className="dropdown-width tab-fullwidth100">
                                        <Label>Email<span className="text-danger">*</span></Label>
                                        <input className="form-control textbox-control" name="EmailAddress" onChange={(e) => this.props.handleInputChange(e)} value={this.state.clientDetail.EmailAddress ? this.state.clientDetail.EmailAddress : ''} />
                                        {Object.keys(errors).length > 0 && errors.data && errors.data.EmailAddress ? <p className="text-danger">{errors.data.EmailAddress[0]}</p> : <></>}
                                    </div>
                                </Row>
                                <Row className="form-group">
                                    <Col sm="6">
                                        <div className="company-logo-uploadsection">
                                            <Label>Company Logo</Label>
                                            <div className="upload-btn-wrapper">
                                                <input type="button" className="btn" value="BROWSE" /><input type="file" id="single" name="company_logo" onChange={this.props.onPhotoChange} />&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" onClick={this.deleteCompanyLogo.bind(this)}>Delete Existing Photo</a>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm="6 d-flex align-items-center justify-content-center">
                                        <img src={this.props.filePreview ? this.props.filePreview : this.state.CompanyLogo} alt="Company Logo" className="profile-img" />
                                    </Col>
                                </Row>
                                <Row className="form-group row-btn mt-5">
                                    <Col sm="6">
                                        <Button type="submit" color="primary" className="mr-3">SAVE</Button>
                                        <Link to="/enterprise-accounts">Cancel</Link>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </CardBody>
                </Card>
            </>
        )
    }
}

export default AccountDetailForm;