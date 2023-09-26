import React , {useState} from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';

const config = require('../../config');

const changeAllowSave = (props,val) => props.changeAllowSave(val)

const DesignThinkingManageStakeholdersRegulatoryBodyType = props => {
    const [isOpen , setIsOpen] = useState(false);
    const toggle = () => { setIsOpen(!isOpen) }
    if(props.mandatoryValues.title && props.mandatoryValues.locationId && props.mandatoryValues.headquarter){
        if(props.mandatoryValues.title.trim() != "" && props.mandatoryValues.locationId != ""  && props.mandatoryValues.headquarter.trim() != ""){
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
    return(
        <div>
            <div className="form-group row">
                <div className="col-sm-6">
                    <label>Title<span className="text-danger">*</span></label>
                    <input id="title" value={props.mandatoryValues.title?props.mandatoryValues.title:''} onChange={e=>props.mandatoryChange(e)} type="text" className="form-control" placeholder="" />
                    {(props.mandatoryValues.title?props.mandatoryValues.title.trim() == "":true || !props.mandatoryValues.title)?(props.showValidations === true)?<label className="text-danger">Title is Required.</label>:"":""}
                    {props.validationErrMsg&&props.validationErrMsg['Title']?<label className="text-danger">{props.validationErrMsg['Title'][0]}</label>:""}

                </div>
                <div className="col-sm-6">
                    <label>Location<span className="text-danger">*</span></label>
                    <select id="locationId" value={props.mandatoryValues.locationId?props.mandatoryValues.locationId:''} onChange={e=>props.mandatoryChange(e)} type="text" className="form-control">
                        <option value="">Select Location</option>
                        {locations}
                    </select>
                    {(props.mandatoryValues.locationId == "" || !props.mandatoryValues.locationId)?(props.showValidations === true)?<label className="text-danger">Location is Required.</label>:"":""}
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-6">
                    <label>Headquater<span className="text-danger">*</span> </label>
                    <input id="headquarter" value={props.mandatoryValues.headquarter?props.mandatoryValues.headquarter:''} onChange={e=>props.mandatoryChange(e)} type="text" className="form-control" placeholder="" />
                    {(props.mandatoryValues.headquarter?props.mandatoryValues.headquarter.trim() == "":true || !props.mandatoryValues.headquarter)?(props.showValidations === true)?<label className="text-danger">Headquater is Required.</label>:"":""}
                    {props.validationErrMsg&&props.validationErrMsg['Headquarter']?<label className="text-danger">{props.validationErrMsg['Headquarter'][0]}</label>:""}

                </div>
                <div className="col-sm-6">
                    <label>Thumbnail <span className="text-danger"></span></label>
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
                                <label>Head<span className="text-danger"></span> </label>
                                <input id="head" value={props.additionalValues.head?props.additionalValues.head:''} onChange={e=>props.additionalChange(e)} type="text" className="form-control" placeholder="" />
                            </div>
                            <div className="col-sm-6">
                                <label>Primary Contact  <span className="text-danger"></span></label>
                                <input id="primaryContact" value={props.additionalValues.primaryContact?props.additionalValues.primaryContact:''} onChange={e=>props.additionalChange(e)} type="text" className="form-control" placeholder="" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6">
                                <label>Enterprise Department<span className="text-danger"></span> </label>
                                <input id="enterpriseDepartment" value={props.additionalValues.enterpriseDepartment?props.additionalValues.enterpriseDepartment:''} onChange={e=>props.additionalChange(e)} type="text" className="form-control" placeholder="" />
                            </div>
                            <div className="col-sm-6">
                                <label>Sector<span className="text-danger"></span></label>
                                <input id="sector" value={props.additionalValues.sector?props.additionalValues.sector:''} onChange={e=>props.additionalChange(e)} type="text" className="form-control" placeholder="" />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}

export default DesignThinkingManageStakeholdersRegulatoryBodyType;