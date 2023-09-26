import React from 'react';
import moment from 'moment';

const config = require('../../config');

const changeAllowSave = (props,val) => props.changeAllowSave(val)

const DesignThinkingManageStakeholdersMarketIntelligenceType = (props) => {
    if(props.validationErrMsg){
        // console.log("props.validationErrMsg",props.validationErrMsg['Title'][0])
    
        // let a = Object.keys(props.validationErrMsg).map(key => key === 'Title' )
        // console.log("aaaaaaaaaaaaaaaaaa",a )
    }
    if(props.mandatoryValues.title && props.mandatoryValues.locationId && props.mandatoryValues.sourceName){
        if(props.mandatoryValues.title.trim() != "" && props.mandatoryValues.locationId != ""  && props.mandatoryValues.sourceName.trim() != ""){
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
    let d = new Date;
    return(
        <div>
            <div className="form-group row">
                <div className="col-sm-6">
                    <label>Title<span className="text-danger">*</span> </label>
                    <input id="title" value={props.mandatoryValues.title?props.mandatoryValues.title:""} onChange={e=>props.mandatoryChange(e)} type="text" className="form-control" placeholder="" />
                    {(props.mandatoryValues.title?props.mandatoryValues.title.trim() == "":true || !props.mandatoryValues.title)?(props.showValidations === true)?<label className="text-danger">Title is Required.</label>:"":""}
                    {props.validationErrMsg&&props.validationErrMsg['Title']?<label className="text-danger">{props.validationErrMsg['Title'][0]}</label>:""}
                </div>
                <div className="col-sm-6">
                    <label>Source Name  <span className="text-danger">*</span></label>
                    <input id="sourceName" value={props.mandatoryValues.sourceName?props.mandatoryValues.sourceName:""} onChange={e=>props.mandatoryChange(e)} type="text" className="form-control" placeholder="" />
                    {(props.mandatoryValues.sourceName?props.mandatoryValues.sourceName.trim() == "":true || !props.mandatoryValues.sourceName)?(props.showValidations === true)?<label className="text-danger">Source Name is Required.</label>:"":""}
                    {props.validationErrMsg&&props.validationErrMsg['SourceName']?<label className="text-danger">{props.validationErrMsg['SourceName'][0]}</label>:""}
                    {/* {validationErrMsg} */}
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-6">
                    <label>Location<span className="text-danger">*</span> </label>
                    <select id="locationId" onChange={e=>props.mandatoryChange(e)} value={props.mandatoryValues.locationId?props.mandatoryValues.locationId:""} type="text" className="form-control">
                        <option value="">Select Location</option>
                        {locations}
                    </select>
                    {(props.mandatoryValues.locationId == "" || !props.mandatoryValues.locationId)?(props.showValidations === true)?<label className="text-danger">Location is Required.</label>:"":""}
                </div>
                <div className="col-sm-6">
                    <label>Product <span className="text-danger"></span></label>
                    <input id="product" onChange={e=>props.mandatoryChange(e)} value={props.mandatoryValues.product?props.mandatoryValues.product:""} type="text" className="form-control" placeholder="" />
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-6">
                    <label>Thumbnail <span className="text-danger"></span></label>
                    <input id="thumbnail" onChange={e => props.thumbailImageChangeHandler(e)} type="file" className="form-control" placeholder="" />
                </div>
                {(props.mandatoryValues.thumbnail != "" && props.mandatoryValues.thumbnail != null) ? <div className="col-sm-6">
                    <img src={typeof props.mandatoryValues.thumbnail == 'object' ? URL.createObjectURL(props.mandatoryValues.thumbnail) : `${config.ApiBaseUrl}StakeHoldersImages/${props.mandatoryValues.thumbnail}`} style={{height : 100, width : 100, borderRadius : "50%"}} />
                </div> : null }
            </div>
        </div>
    )

}

export default DesignThinkingManageStakeholdersMarketIntelligenceType;