import React, {Component} from 'react';
import { Form, Label, Row, Col, Input, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
const config = require('../../config');
class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CompanyLogo: 'https://avatars.dicebear.com/v2/identicon/john-doe.svg',
            errors: {}
        }
    }

    static getDerivedStateFromProps(nextProps) {
        if(nextProps.profileData) {
            if(nextProps.profileData.CompanyLogo) {
                return({CompanyLogo: config.ApiBaseUrl+'images/'+nextProps.profileData.CompanyLogo});
            }else{
                //return({CompanyLogo: 'https://avatars.dicebear.com/v2/identicon/john-doe.svg'});
            }
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

    handleQuestionChange(e, QuestionID) {
        this.props.handleQuestionChange(e, QuestionID)
    }

    render() {
        const errors = this.props.errors;
        // console.log(errors);
        //const { industrySubVertical } = this.props;
        let industryOptions = this.props.industries.map((industry, index) => {
            if(this.props.profileData) {
                
                return (
                    <option key={'indusryOpt-'+index} value={industry.IndustryVerticalID} selected={this.props.profileData.industry_vertical === industry.IndustryVerticalID}>{ industry.IndustryVerticalName }</option>
                )
            }
        });
        let subVerticalOptions = this.props.industrySubVertical.map((subVertical, index) => {
            return (
                <option key={'indusryVericalOpt-'+index} value={subVertical.IndustrySubVerticalID} >{ subVertical.IndustrySubVerticalName }</option>
            )
        });
        let regionOptions = this.props.regions.map((region, index) => {
            return (
                <option key={'regionOpt-'+index} value={region.RegionID} selected={this.props.profileData ? this.props.profileData.region === region.RegionID : ''}>{ region.RegionName }</option>
            )
        });
        let countryOptions = this.props.countries.map((country, index) => {
            return (
                <option key={'countryOpt-'+index} value={country.CountryID} selected={this.props.profileData ? this.props.profileData.country === country.CountryID : ''}>{ country.CountryName }</option>
            )
        });
        let stateOptions = this.props.states.map((state, index) => {
            return (
                <option key={'stateOpt-'+index} value={state.StateProvinceCode.trim()} selected={this.props.profileData ? this.props.profileData.state === state.StateProvinceCode.trim() : ''}>{ state.Name }</option>
            )
        });
        let cityOptions = this.props.cities.map((city, index) => {
            return (
                <option key={'cityOpt-'+index} value={city.NAME} selected={this.props.profileData ? this.props.profileData.city === city.NAME : ''}>{ city.NAME }</option>
            )
        });
        let quesRow = <></>;
        if(this.props.profileData && Object.keys(this.props.profileData).length > 0) {
            if(this.props.profileData.profile_questions){
            quesRow = this.props.profileData.profile_questions.map((question, index) => {
                return (
                    <Row className="form-group" key={'quesRow-'+index}>
                        <Col sm="12">
                            <Label>Q{index+1}: {question.question}</Label>
                            <textarea className="form-control" placeholder="" name={'question'+index} onChange={(e) => this.handleQuestionChange(e, question.question_id)} rel={question.answer} value={question.answer}></textarea>
                        </Col>
                    </Row>
                )
            });
          }
        }
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <Row className="form-group company-photo">
                    <Col sm="6">
                        <Label>Company Logo </Label>
                        <div className="upload-btn-wrapper">
                            <input type="button" className="btn" value="BROWSE" />
                            <input type='file' id='single' name='company_logo' onChange={this.props.onPhotoChange} />&nbsp;&nbsp;
                            <a href="#" onClick={this.deleteCompanyLogo.bind(this)}>Delete Existing Photo</a>
                        </div>
                    </Col>
                    <Col sm="6" className="user-col profile-col">
                        <img src={this.props.filePreview ? this.props.filePreview : this.state.CompanyLogo} alt="profile-photo" className="profile-img" />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col sm="6">
                        <Label>Industry Vertical <span className="text-danger">*</span></Label>
                        <select className="form-control" name="industry_vertical" onChange={this.props.handleIndustryChange}>
                            <option value=''>Please Select</option>
                            { industryOptions }
                        </select>
                        {Object.keys(errors).length > 0 && errors.data && errors.data.industry_vertical ? <p className="text-danger">{errors.data.industry_vertical[0]}</p> : <></>}
                        {Object.keys(errors).length > 0 && errors.industry_vertical ? <p className="text-danger">{errors.industry_vertical}</p> : <></>}
                    </Col>
                    <Col sm="6">
                        <Label>Industry Sub-vertical <span className="text-danger">*</span></Label>
                        <select className="form-control" name="industry_subvertical" onChange={this.props.handleInputChange} rel={this.props.profileData ? this.props.profileData.industry_subvertical : ''} value={this.props.profileData?this.props.profileData.industry_subvertical:''}>
                            <option value=''>Please Select</option>
                            { subVerticalOptions }
                        </select>
                        {Object.keys(errors).length > 0 && errors.data && errors.data.industry_subvertical ? <p className="text-danger">{errors.data.industry_subvertical[0]}</p> : <></>}
                        {Object.keys(errors).length > 0 && errors.industry_subvertical ? <p className="text-danger">{errors.industry_subvertical}</p> : <></>}
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col sm="6">
                        <Label>Number of Employees <span className="text-danger">*</span></Label>
                        <Input className="form-control" type="text" name="employees" onChange={this.props.handleInputChange} defaultValue={this.props.profileData ? this.props.profileData.employees : ''} />
                        {Object.keys(errors).length > 0 && errors.data && errors.data.employees ? <p className="text-danger">{errors.data.employees[0]}</p> : <></>}
                        {Object.keys(errors).length > 0 && errors.employees ? <p className="text-danger">{errors.employees}</p> : <></>}
                    </Col>
                    <Col className="col-sm-6">
                        <Label>Geographic Region <span className="text-danger">*</span></Label>
                        <select className="form-control" name="region" onChange={this.props.handleInputChange}>
                            <option value=''>Please Select</option>
                            { regionOptions }
                        </select>
                        {Object.keys(errors).length > 0 && errors.data && errors.data.region ? <p className="text-danger">{errors.data.region[0]}</p> : <></>}
                        {Object.keys(errors).length > 0 && errors.region ? <p className="text-danger">{errors.region}</p> : <></>}
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col sm="6">
                        <Label>Address Line1 <span className="text-danger">*</span></Label>
                        <Input className="form-control" type="text" name="address1" onChange={this.props.handleInputChange} defaultValue={this.props.profileData ? this.props.profileData.address1 : ''} />
                        {Object.keys(errors).length > 0 && errors.data && errors.data.address1 ? <p className="text-danger">{errors.data.address1[0]}</p> : <></>}
                        {Object.keys(errors).length > 0 && errors.address1 ? <p className="text-danger">{errors.address1}</p> : <></>}
                    </Col>
                    <Col sm="6">
                        <Label>Address Line2</Label>
                        <Input className="form-control" type="text" name="address2" onChange={this.props.handleInputChange} defaultValue={this.props.profileData ? this.props.profileData.address2 : ''} />
                     
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col sm="6">
                        <Label>Country <span className="text-danger">*</span></Label>
                        <select className="form-control" name="country" onChange={(e) => this.props.handleCountryChange(e)}>
                            <option value=''>Please Select</option>
                            { countryOptions }
                        </select>
                        {Object.keys(errors).length > 0 && errors.data && errors.data.country ? <p className="text-danger">{errors.data.country[0]}</p> : <></>}
                        {Object.keys(errors).length > 0 && errors.country ? <p className="text-danger">{errors.country}</p> : <></>}
                    </Col>
                    <Col sm="6">
                        <Label>State/Territory <span className="text-danger">*</span></Label>
                        <select className="form-control" name="state" onChange={(e) => this.props.handleStateChange(e)}>
                            <option value=''>Please Select</option>
                            { stateOptions }
                        </select>
                        {Object.keys(errors).length > 0 && errors.data && errors.data.state ? <p className="text-danger">{errors.data.state[0]}</p> : <></>}
                        {Object.keys(errors).length > 0 && errors.state ? <p className="text-danger">{errors.state}</p> : <></>}
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col sm="6">
                        <Label>City <span className="text-danger">*</span></Label>
                        <select className="form-control" name="city" onChange={this.props.handleInputChange}>
                            <option value=''>Please Select</option>
                            { cityOptions }
                        </select>
                        {Object.keys(errors).length > 0 && errors.data && errors.data.city ? <p className="text-danger">{errors.data.city[0]}</p> : <></>}
                        {Object.keys(errors).length > 0 && errors.city ? <p className="text-danger">{errors.city}</p> : <></>}
                    </Col>
                    <Col sm="6">
                        <Label>Zip Code <span className="text-danger">*</span></Label>
                        <Input type="text" className="form-control" name="pincode" onChange={this.props.handleInputChange} placeholder="" defaultValue={this.props.profileData ? this.props.profileData.pincode : ''} />
                        {Object.keys(errors).length > 0 && errors.data && errors.data.pincode ? <p className="text-danger">{errors.data.pincode[0]}</p> : <></>}
                        {Object.keys(errors).length > 0 && errors.pincode ? <p className="text-danger">{errors.pincode}</p> : <></>}
                    </Col>
                </Row>
                { quesRow }
                <Row className="mt-4">
                    <Col sm="12" className="text-right">
                        <Link to="/dashboard" className="mr-4">Cancel</Link>
                        <Button color="primary">SAVE PROFILE</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
export default ProfileForm;