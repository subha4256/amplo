import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import {Row, Col, Input, Button, Label, FormGroup, Form, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import SecurityForm from './SecurityForm';

const ProfileForm = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    return (
        <div className="user-form">
            <Nav tabs className="mb-5">
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        User Information
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Security Questions
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1" id="information">
                    <Form onSubmit={props.handleSubmit}>
                        <Row>
                            <Col sm="12" md="6" lg="5">
                                <FormGroup>
                                    <Label>Division / Business Unit / Dept <span className="text-danger">*</span></Label>
                                    <Input type="text" className="form-control" name="ClientBusinessUnit" defaultValue={props.profile.ClientBusinessUnit} onChange={(e) => props.handleInputChange(e)}  disabled={props.profile.IsMainUser == "1"?false:true} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Parent Company <span className="text-danger">*</span></Label>
                                    <Input type="text" name="ClientParentCompany" defaultValue={props.profile.ClientParentCompany} onChange={(e) => props.handleInputChange(e)} disabled={props.profile.IsMainUser == "1"?false:true} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>First Name <span className="text-danger">*</span></Label>
                                    <Input type="text" name="FirstName" defaultValue={props.profile.FirstName} onChange={(e) => props.handleInputChange(e)}  />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Last Name <span className="text-danger">*</span></Label>
                                    <Input type="text" name="LastName" defaultValue={props.profile.LastName} onChange={(e) => props.handleInputChange(e)}  />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email <span className="text-danger">*</span></Label>
                                    <Input type="text" name="EmailAddress" defaultValue={props.profile.EmailAddress} onChange={(e) => props.handleInputChange(e)}  disabled />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Phone <span className="text-danger">*</span></Label>
                                    <Input type="text" name="PhoneNumber" defaultValue={props.profile.PhoneNumber} onChange={(e) => props.handleInputChange(e)}  />
                                </FormGroup>
                            </Col>
                            <Col sm="12" md="6" lg="7">
                                <div className="profile-photo">
                                    <FormGroup>
                                        <Label>Profile Photo</Label>
                                        <div className="upload-btn-wrapper">
                                            <button className="btn">BROWSE</button>
                                            <input type='file' id='single' name='profile_photo' onChange={props.onPhotoChange} />&nbsp;&nbsp;
                                            <a href="#" onClick={props.deleteProfilePhoto}>Delete Existing Photo</a>
                                        </div>
                                    </FormGroup>
                                </div>
                            </Col>
                            <div className="form-group mt-3">
                                <Col sm="12">
                                    <Button color="primary" className="mr-4">SAVE</Button>
                                    <Link to="/dashboard">Cancel</Link>
                                    {(Object.keys(props.errors).length > 0 && ("data" in props.errors)) ? <p className="text-danger mt-2">{props.errors.data.ProfilePhoto ? props.errors.data.ProfilePhoto[0] : ''}</p> : <></>}
                                </Col>
                            </div>
                        </Row>
                    </Form>
                </TabPane>
                <TabPane tabId="2" id="security">
                    <SecurityForm customErrors ={props.customErrors}  questions={props.questions} handleSecuritySubmit={props.handleSecuritySubmit} handleInputChange={props.handleInputChange} />
                </TabPane>
            </TabContent>

        </div>
    )
}

export default ProfileForm;