import React, {useState} from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const config = require('../../config');

const changeAllowSave = (props,val) => props.changeAllowSave(val)

const DesignThinkingManageStakeholdersTradingPartnerType = (props) => {
    const [isOpen , setIsOpen] = useState(false);
    const toggle = () => { setIsOpen(!isOpen) }
    if(props.mandatoryValues.title && props.mandatoryValues.locationId && props.mandatoryValues.partnerType && props.mandatoryValues.industry){
        if(props.mandatoryValues.title.trim() != "" && props.mandatoryValues.locationId != "" && props.mandatoryValues.partnerType != "" && props.mandatoryValues.industry.trim() != ""){
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

    let partnerType = props.partnerType.map((partner,i)=>{
        return(
            <option value={partner.PartnerTypeId} key={"partnertype"+i}>{partner.PartnerTypeName}</option>
        )
    })
    return(
        <>
            <div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>Title  <span className="text-danger">*</span></label>
                        <input id="title" value={props.mandatoryValues.title?props.mandatoryValues.title:''} onChange={e=>props.mandatoryChange(e)}  type="text" className="form-control" placeholder="" />
                        {(props.mandatoryValues.title?props.mandatoryValues.title.trim() == "":true || !props.mandatoryValues.title)?(props.showValidations === true)?<label className="text-danger">Title is Required.</label>:"":""}
                        {props.validationErrMsg&&props.validationErrMsg['Title']?<label className="text-danger">{props.validationErrMsg['Title'][0]}</label>:""}
                    </div>
                    <div className="col-sm-6">
                        <label>Location<span className="text-danger">*</span> </label>
                        <select id="locationId" value={props.mandatoryValues.locationId?props.mandatoryValues.locationId:''} onChange={e=>props.mandatoryChange(e)}  className="form-control">
                            <option value="">Select Location</option>
                            {locations}
                        </select>
                        {(props.mandatoryValues.locationId == "" || !props.mandatoryValues.locationId)?(props.showValidations === true)?<label className="text-danger">Location is Required.</label>:"":""}
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-6">
                        <label>Partner Type<span className="text-danger">*</span> </label>
                        <select id="partnerType" value={props.mandatoryValues.partnerType?props.mandatoryValues.partnerType:''} onChange={e=>props.mandatoryChange(e)}  className="form-control">
                            <option value="">Select Partner Type</option>
                            {partnerType}
                        </select>
                        {(props.mandatoryValues.partnerType == "" || !props.mandatoryValues.partnerType)?(props.showValidations === true)?<label className="text-danger">Partner Type is Required.</label>:"":""}
                    </div>
                    <div className="col-sm-6">
                        <label>Industry  <span className="text-danger">*</span></label>
                        <input id="industry" value={props.mandatoryValues.industry?props.mandatoryValues.industry:''} onChange={e=>props.mandatoryChange(e)}  type="text" className="form-control" placeholder="" />
                        {(props.mandatoryValues.industry?props.mandatoryValues.industry.trim() == "":true || !props.mandatoryValues.industry)?(props.showValidations === true)?<label className="text-danger">Industry is Required.</label>:"":""}
                    </div>
                </div>
                <div className="form-group row">
                   
                    <div className="col-sm-6">
                        <label>Thumbnail<span className="text-danger"></span></label>
                        <input id="thumbnail" onChange={e=>props.thumbailImageChangeHandler(e)} type="file" className="form-control" placeholder="" />
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
                                    <label>Key Contact<span className="text-danger"></span> </label>
                                    <input id="keyContact" value={props.additionalValues.keyContact?props.additionalValues.keyContact:''} onChange={e=>props.additionalChange(e)} type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="col-sm-6">
                                    <label>Relation from  <span className="text-danger"></span></label>
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
                                            id="relationFrom"
                                            minDate={new Date()}
                                            onChange={props.relationFromChangeHandler}
                                            dateFormat="dd/MM/yyyy"
                                            selected={props.additionalValues.relationFrom?props.additionalValues.relationFrom:''}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <label>Relation to<span className="text-danger"></span> </label>
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
                                            id="relationTo"
                                            minDate={new Date()}
                                            onChange={props.relationToChangeHandler}
                                            dateFormat="dd/MM/yyyy"
                                            selected={props.additionalValues.relationTo?props.additionalValues.relationTo:''}
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label>Contract Termination Date   <span className="text-danger"></span></label>
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
                                            id="contractTerminationDate"
                                            minDate={new Date()}
                                            onChange={props.contractTerminationDateChangeHandler}
                                            dateFormat="dd/MM/yyyy"
                                            selected={props.additionalValues.contractTerminationDate?props.additionalValues.contractTerminationDate:''}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <label>Primary Contact<span className="text-danger"></span> </label>
                                    <input id="primaryContact" value={props.additionalValues.primaryContact?props.additionalValues.primaryContact:''} onChange={e=>props.additionalChange(e)} type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="col-sm-6">
                                    <label>Owner  <span className="text-danger"></span></label>
                                    <input id="owner" value={props.additionalValues.owner?props.additionalValues.owner:''} onChange={e=>props.additionalChange(e)} type="text" className="form-control" placeholder="" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-6">
                                    <label>Partner Level<span className="text-danger"></span> </label>
                                    <input id="partnerLevel" value={props.additionalValues.partnerLevel?props.additionalValues.partnerLevel:''} onChange={e=>props.additionalChange(e)} type="text" className="form-control" placeholder="" />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        </>
    )
}

export default DesignThinkingManageStakeholdersTradingPartnerType;