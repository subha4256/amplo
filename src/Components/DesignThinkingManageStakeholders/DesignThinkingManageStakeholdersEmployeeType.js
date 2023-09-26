import React , {useState} from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const config = require('../../config');

const changeAllowSave = (props,val) => props.changeAllowSave(val)

const DesignThinkingManageStakeholdersEmployeeType = (props) => {
    const [isOpen , setIsOpen] = useState(false);
    const toggle = () => { setIsOpen(!isOpen) }
    if(props.mandatoryValues.firstName && props.mandatoryValues.lastName && props.mandatoryValues.birthDate && props.mandatoryValues.email && props.mandatoryValues.hireDate && props.mandatoryValues.managerId && props.mandatoryValues.locationId && props.mandatoryValues.department){
        if(props.mandatoryValues.firstName.trim() != "" && props.mandatoryValues.lastName.trim() != "" && props.mandatoryValues.birthDate != "" && props.mandatoryValues.email.trim() != "" && props.mandatoryValues.hireDate != "" && props.mandatoryValues.managerId != "" && props.mandatoryValues.locationId != "" && props.mandatoryValues.department != ""){
            if(props.allowToSubmit === false){
                changeAllowSave(props,true);
            }
        }else{
            if(props.allowToSubmit === true){
                changeAllowSave(props,false);
            }
        }
    }else{
        if(props.allowToSubmit === true){
            changeAllowSave(props,false);
        }
    }
    let locations = props.locations.map((loc,i)=>{
        return(
            <option value={loc.LocationID} key={"location"+i}>{loc.StreetAddress+", "+loc.City+", "+loc.StateProvince}</option>
        )
    })
    let managers = props.managers.map((manager,i)=>{
        return(
            <option value={manager.EmployeeID} key={"manager"+i}>{manager.FirstName+" "+manager.LastName}</option>
        )
    })
    let departments = props.departments.map((dep,i)=>{
        return(
            <option value={dep.DepartmentID} key={"department"+i}>{dep.DepartmentName}</option>
        )
    })
    let businessEntity = props.businessEntity.map((bus,i)=>{
        return(
            <option value={bus.BusinessEntityId} key={"business"+i}>{bus.BusinessEntityName}</option>
        )
    })
    let organizationalLevel = props.organizationalLevel.map((org,i)=>{
        return(
            <option value={org.OrganizationalLevelId} key={"organization"+i}>{org.OrganizationLevelName}</option>
        )
    })

    let employeeType = props.employeeType.map((empType,i)=>{
        return(
            <option value={empType.EmployeeTypeId} key={"empType"+i}>{empType.EmployeeTypeName}</option>
        )
    })

    return(
        <>
            <div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>
                            National ID Number
                        </label>
                        <input id="natIdNum" value={props.mandatoryValues.natIdNum?props.mandatoryValues.natIdNum:""} onChange={e => props.mandatoryChange(e)}  type="text" className="form-control" placeholder="" />
                    </div>
                    <div className="col-sm-6">
                        <label>First Name  <span className="text-danger">*</span></label>
                        <input id="firstName" value={props.mandatoryValues.firstName?props.mandatoryValues.firstName:""} onChange={e => props.mandatoryChange(e)}  type="text" className="form-control" placeholder="" />
                        {(props.mandatoryValues.firstName?props.mandatoryValues.firstName.trim() == "":true || !props.mandatoryValues.firstName)?(props.showValidations === true)?<label className="text-danger">First Name is Required.</label>:"":""}
                        {props.validationErrMsg&&props.validationErrMsg['FirstName']?<label className="text-danger">{props.validationErrMsg['FirstName'][0]}</label>:""}
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>
                            Middle Name
                        </label>
                        <input id="middleName" value={props.mandatoryValues.middleName?props.mandatoryValues.middleName:""} onChange={e => props.mandatoryChange(e)}  type="text" className="form-control" placeholder="" />
                    </div>
                    <div className="col-sm-6">
                        <label>Last Name  <span className="text-danger">*</span></label>
                        <input id="lastName" value={props.mandatoryValues.lastName?props.mandatoryValues.lastName:""} onChange={e => props.mandatoryChange(e)}  type="text" className="form-control" placeholder="" />
                        {(props.mandatoryValues.lastName?props.mandatoryValues.lastName.trim() == "":true || !props.mandatoryValues.lastName)?(props.showValidations === true)?<label className="text-danger">Last Name is Required.</label>:"":""}
                        {props.validationErrMsg&&props.validationErrMsg['LastName']?<label className="text-danger">{props.validationErrMsg['LastName'][0]}</label>:""}
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>Birth Date <span className="text-danger">*</span></label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="far fa-calendar-alt"></i>
                                </div>
                            </div>
                            <DatePicker
                                onKeyDown={event => {
                                event.preventDefault();
                                return false;
                                }}
                                className="form-control border-secondary py-2 dis-date"
                                id="birthDate"
                                maxDate={new Date()}
                                onChange={props.birthDateChangeHandler}
                                dateFormat="dd/MM/yyyy"
                                selected={props.mandatoryValues.birthDate?props.mandatoryValues.birthDate:''}
                            />
                        </div>
                        {(props.mandatoryValues.birthDate == "" || !props.mandatoryValues.birthDate)?(props.showValidations === true)?<label className="text-danger">Birth Date is Required.</label>:"":""}
                    </div>
                    <div className="col-sm-6">
                        <label>Email <span className="text-danger">*</span></label>
                        <input id="email" value={props.mandatoryValues.email?props.mandatoryValues.email:""} onChange={e => props.mandatoryChange(e)}  type="text" className="form-control" placeholder="" />
                        {(props.mandatoryValues.email?props.mandatoryValues.email.trim() == "":true || !props.mandatoryValues.email)?(props.showValidations === true)?<label className="text-danger">Email is Required.</label>:"":""}
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>Hire Date <span className="text-danger">*</span></label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="far fa-calendar-alt"></i>
                                </div>
                            </div>
                            <DatePicker
                                onKeyDown={event => {
                                event.preventDefault();
                                return false;
                                }}
                                className="form-control border-secondary py-2 dis-date"
                                id="hireDate"
                                maxDate={new Date()}
                                onChange={props.hireDateChangeHandler}
                                dateFormat="dd/MM/yyyy"
                                selected={props.mandatoryValues.hireDate?props.mandatoryValues.hireDate:''}
                            />
                        </div>
                        {(props.mandatoryValues.hireDate == "" || !props.mandatoryValues.hireDate)?(props.showValidations === true)?<label className="text-danger">Hire Date is Required.</label>:"":""}
                    </div>
                    <div className="col-sm-6">
                        <label>Manager ID <span className="text-danger">*</span></label>
                        <select id="managerId" value={props.mandatoryValues.managerId?props.mandatoryValues.managerId:""} onChange={e => props.mandatoryChange(e)}  type="text" className="form-control">
                            <option value="">Select Manager</option>
                            {managers}
                        </select>
                        {(props.mandatoryValues.managerId == "" || !props.mandatoryValues.managerId)?(props.showValidations === true)?<label className="text-danger">Manager is Required.</label>:"":""}
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>Location<span className="text-danger">*</span></label>
                        <select id="locationId" value={props.mandatoryValues.locationId?props.mandatoryValues.locationId:""} onChange={e => props.mandatoryChange(e)}  type="text" className="form-control">
                            <option value="">Select Location</option>
                            {locations}
                        </select>
                        {(props.mandatoryValues.locationId == "" || !props.mandatoryValues.locationId)?(props.showValidations === true)?<label className="text-danger">Location is Required.</label>:"":""}
                    </div>
                    <div className="col-sm-6">
                        <label>Department<span className="text-danger">*</span></label>
                        <select id="department" value={props.mandatoryValues.department?props.mandatoryValues.department:""} onChange={e => props.mandatoryChange(e)}  type="text" className="form-control">
                            <option value="">Select Department</option>
                            {departments}
                        </select>
                        {(props.mandatoryValues.department == "" || !props.mandatoryValues.department)?(props.showValidations === true)?<label className="text-danger">Department is Required.</label>:"":""}
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>Thumbnail<span className="text-danger"></span></label>
                        <input id="thumbnail" onChange={props.thumbailImageChangeHandler} type="file" className="form-control" />
                    </div>
                    {(props.mandatoryValues.thumbnail != "" && props.mandatoryValues.thumbnail != null) ? <div className="col-sm-6">
                    <img src={typeof props.mandatoryValues.thumbnail == 'object' ? URL.createObjectURL(props.mandatoryValues.thumbnail) : `${config.ApiBaseUrl}StakeHoldersImages/${props.mandatoryValues.thumbnail}`} style={{height : 100, width : 100, borderRadius : "50%"}} />
                </div> : null }
                </div>
                <a onClick={toggle} style={{ marginBottom: '1rem' }}>Additional Fields</a>
                <Collapse isOpen={isOpen}>
                    <Card>
                        <CardBody>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <label>
                                        Organizational Level
                                    </label>
                                    <select id="organizationalLevel" value={props.additionalValues.organizationalLevel?props.additionalValues.organizationalLevel:""} onChange={e => props.additionalChange(e)} type="text" className="form-control">
                                        <option value="">Select Organizational Level</option>
                                        {organizationalLevel}
                                    </select>
                                </div>
                                <div className="col-sm-6">
                                    <label>Business Entity  <span className="text-danger"></span></label>
                                    <select id="businessEntity" value={props.additionalValues.businessEntity?props.additionalValues.businessEntity:""} onChange={e => props.additionalChange(e)} type="text" className="form-control">
                                        <option value="">Select Business Entity</option>
                                        {businessEntity}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <label>
                                        Job Title
                                    </label>
                                    <input id="jobTitle" value={props.additionalValues.jobTitle?props.additionalValues.jobTitle:""} onChange={e => props.additionalChange(e)} type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="col-sm-6">
                                    <label>Maritial Status  <span className="text-danger"></span></label>
                                    <select id="maritialStatus" value={props.additionalValues.maritialStatus?props.additionalValues.maritialStatus:""} onChange={e => props.additionalChange(e)} type="text" className="form-control">
                                        <option value="">Select Maritial Status</option>
                                        <option value="Married">Married</option>
                                        <option value="Single">Single</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <label>
                                        Phone Number
                                    </label>
                                    <input id="phoneNumber" value={props.additionalValues.phoneNumber?props.additionalValues.phoneNumber:""} onChange={e => props.additionalChange(e)} type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="col-sm-6">
                                    <label>Gender  <span className="text-danger"></span></label>
                                    <select id="gender" value={props.additionalValues.gender?props.additionalValues.gender:""} onChange={e => props.additionalChange(e)} type="text" className="form-control">
                                        <option value=""></option>
                                        <option value="m">Male</option>
                                        <option value="f">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <label>
                                        Salary
                                    </label>
                                    <input type="text" id="salary" value={props.additionalValues.salary?props.additionalValues.salary:""} onChange={e => props.additionalChange(e)} className="form-control" placeholder="" />
                                </div>
                                <div className="col-sm-6">
                                    <label>Employee Type  <span className="text-danger"></span></label>
                                    <select id="employeeType" value={props.additionalValues.employeeType?props.additionalValues.employeeType:""} onChange={e => props.additionalChange(e)} type="text" className="form-control">
                                        <option value="">Select Employee Type</option>
                                        {employeeType}
                                    </select>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        </>
    )

}

export default DesignThinkingManageStakeholdersEmployeeType;