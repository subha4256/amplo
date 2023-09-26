import React , { useState } from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const config = require('../../config');

const changeAllowSave = (props,val) => props.changeAllowSave(val)

const DesignThinkingManageStakeholdersAssestResourceType = (props) => {
    const [isOpen , setIsOpen] = useState(false);
    const toggle = () => { setIsOpen(!isOpen) }
    if(props.mandatoryValues.modelId && props.mandatoryValues.locationId && props.mandatoryValues.modelName && props.mandatoryValues.assetType && props.mandatoryValues.assetName && props.mandatoryValues.assetCategory){
        if(props.mandatoryValues.modelId != "" && props.mandatoryValues.locationId != "" && props.mandatoryValues.modelName.trim() != "" && props.mandatoryValues.assetType != "" && props.mandatoryValues.assetName.trim() != "" && props.mandatoryValues.assetCategory != "" ){
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

    let assetCategory = props.assetCategory.map((asstCat,i)=>{
        return(
            <option value={asstCat.AssetCategoryId} key={"assetCategory"+i}>{asstCat.AssetCategoryName}</option>
        )
    })

    let assetType = props.assetType.map((asstType,i)=>{
        return(
            <option value={asstType.AssetTypeId} key={"assetType"+i}>{asstType.AssetTypeName}</option>
        )
    })

    let model = props.model.map((model,i)=>{
        return(
            <option value={model.ModelId} key={"model"+i}>{model.ModelName}</option>
        )
    })


    return(
        <div>
            <div className="form-group row">
                <div className="col-sm-6">
                    <label>Model<span className="text-danger">*</span></label>
                    <select id="modelId" value={props.mandatoryValues.modelId?props.mandatoryValues.modelId:""} onChange={e => props.mandatoryChange(e)} type="text" className="form-control" >
                        <option value="">Select Model</option>
                        {model}
                    </select>
                    {(props.mandatoryValues.modelId == "" || !props.mandatoryValues.modelId)?(props.showValidations === true)?<label className="text-danger">Model is Required.</label>:"":""}
                </div>
                <div className="col-sm-6">
                    <label>Location<span className="text-danger">*</span></label>
                    <select id="locationId" value={props.mandatoryValues.locationId?props.mandatoryValues.locationId:""} onChange={e => props.mandatoryChange(e)} type="text" className="form-control">
                        <option value="">Select Location</option>
                        {locations}
                    </select>
                    {(props.mandatoryValues.locationId == "" || !props.mandatoryValues.locationId)?(props.showValidations === true)?<label className="text-danger">Location is Required.</label>:"":""}
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-6">
                    <label>Model Name<span className="text-danger">*</span> </label>
                    <input id="modelName" value={props.mandatoryValues.modelName?props.mandatoryValues.modelName:""} onChange={e => props.mandatoryChange(e)} type="text" className="form-control" placeholder="" />
                    {(props.mandatoryValues.modelName?props.mandatoryValues.modelName.trim() == "":true || !props.mandatoryValues.modelName)?(props.showValidations === true)?<label className="text-danger">Model Name is Required.</label>:"":""}
                    {props.validationErrMsg&&props.validationErrMsg['ModelName']?<label className="text-danger">{props.validationErrMsg['ModelName'][0]}</label>:""}

                </div>
                <div className="col-sm-6">
                    <label>Asset Type<span className="text-danger">*</span></label>
                    <select id="assetType" value={props.mandatoryValues.assetType?props.mandatoryValues.assetType:""} onChange={e => props.mandatoryChange(e)} type="text" className="form-control">
                        <option value="">Select Asset Type</option>
                        {assetType}
                    </select>
                    {(props.mandatoryValues.assetType == "" || !props.mandatoryValues.assetType)?(props.showValidations === true)?<label className="text-danger">Asset Type is Required.</label>:"":""}
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-6">
                    <label>Asset Name<span className="text-danger">*</span> </label>
                    <input id="assetName" value={props.mandatoryValues.assetName?props.mandatoryValues.assetName:""} onChange={e => props.mandatoryChange(e)} type="text" className="form-control" placeholder="" />
                    {(props.mandatoryValues.assetName?props.mandatoryValues.assetName.trim() == "":true || !props.mandatoryValues.assetName)?(props.showValidations === true)?<label className="text-danger">Asset Name is Required.</label>:"":""}
                </div>
                <div className="col-sm-6">
                    <label>Asset Category  <span className="text-danger">*</span></label>
                    <select id="assetCategory" value={props.mandatoryValues.assetCategory?props.mandatoryValues.assetCategory:""} onChange={e => props.mandatoryChange(e)} type="text" className="form-control">
                        <option value="">Select Asset Category</option>
                        {assetCategory}
                    </select>
                    {(props.mandatoryValues.assetCategory == "" || !props.mandatoryValues.assetCategory)?(props.showValidations === true)?<label className="text-danger">Asset Category is Required.</label>:"":""}
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-6">
                    <label>Thumbnail<span className="text-danger"></span></label>
                    <input id="thumbnail" onChange={e => props.thumbailImageChangeHandler(e)} type="file" className="form-control" placeholder="" />
                </div>
                {(props.mandatoryValues.thumbnail != "" && props.mandatoryValues.thumbnail != null) ? <div className="col-sm-6">
                    <img src={typeof props.mandatoryValues.thumbnail == 'object' ? URL.createObjectURL(props.mandatoryValues.thumbnail) : `${config.ApiBaseUrl}StakeHoldersImages/${props.mandatoryValues.thumbnail}`} style={{height : 100, width : 100, borderRadius : "50%"}} />
                </div> : null }
            </div>
            <div className="form-group row">
                <div className="col-sm-12">
                    <label>Asset Description<span className="text-danger"></span> </label>
                    <textarea id="assetDescription" onChange={e => props.mandatoryChange(e)} className="form-control" value={props.mandatoryValues.assetDescription?props.mandatoryValues.assetDescription:""}></textarea>
                </div>
            </div>
            
            <a onClick={toggle} style={{ marginBottom: '1rem' }}>Additional Fields</a>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <div className="form-group row">
                            <div className="col-sm-6">
                                <label>Manufacturer Name<span className="text-danger"></span> </label>
                                <input id="manufacturerName" value={props.additionalValues.manufacturerName?props.additionalValues.manufacturerName:""} onChange={e => props.additionalChange(e)}  type="text" className="form-control" placeholder="" />
                            </div>
                            <div className="col-sm-6">
                                <label>Asset Start Date<span className="text-danger"></span></label>
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
                                        id="assetStartDate"
                                        className="form-control border-secondary py-2 dis-date"
                                        minDate={new Date()}
                                        onChange={props.assetStartDateChangeHandler}
                                        dateFormat="dd/MM/yyyy"
                                        selected={props.additionalValues.assetStartDate?props.additionalValues.assetStartDate:''}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6">
                                <label>Asset Expiration Date<span className="text-danger"></span></label>
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
                                        id="assetExpirationDate"
                                        minDate={new Date()}
                                        dateFormat="dd/MM/yyyy"
                                        onChange={props.assetExpirationDateChangeHandler}
                                        selected={props.additionalValues.assetExpirationDate?props.additionalValues.assetExpirationDate:''}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label>Asset Cost<span className="text-danger"></span> </label>
                                <input id="assetCost" value={props.additionalValues.assetCost?props.additionalValues.assetCost:""} onChange={e => props.additionalChange(e)} type="text" className="form-control" placeholder="" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6">
                                <label>Last Maintenance Date<span className="text-danger"></span></label>
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
                                        id="lastMaintenance"
                                        minDate={new Date()}
                                        dateFormat="dd/MM/yyyy"
                                        onChange={props.lastMaintenaceChangeHandler}
                                        selected={props.additionalValues.lastMaintenace?props.additionalValues.lastMaintenace:''}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <label>Maintenance Interval<span className="text-danger"></span> </label>
                                <input id="maintenanceInterval" value={props.additionalValues.maintenanceInterval?props.additionalValues.maintenanceInterval:''} onChange={e => props.additionalChange(e)} type="text" className="form-control" placeholder="" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-6">
                                <label>Asset Number<span className="text-danger"></span> </label>
                                <input id="assetNumber" value={props.additionalValues.assetNumber?props.additionalValues.assetNumber:''} onChange={e => props.additionalChange(e)} type="text" className="form-control" placeholder="" />
                            </div>
                            <div className="col-sm-6">
                                <label>Asset CCID<span className="text-danger"></span> </label>
                                <input type="text" id="assetCCID" value={props.additionalValues.assetCCID?props.additionalValues.assetCCID:''} onChange={e => props.additionalChange(e)} className="form-control" placeholder="" />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}

export default DesignThinkingManageStakeholdersAssestResourceType;