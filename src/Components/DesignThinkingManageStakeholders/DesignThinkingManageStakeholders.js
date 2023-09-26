import React, {Component} from "react";
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardSidebar from "../includes/dashboardSidebar/DashboardSidebar";
import FooterComponent from "../includes/dashboardFooter/FooterComponent";
import AsideComponent from "../includes/asideComponent/AsideComponent";
import { DesignThinkingManageStakeholdersWrapper } from './Styling/DesignThinkingManageStakeholders';
import DesignThinkingManageStakeholdersBreadcrumb from './DesignThinkingManageStakeholdersBreadcrumb';
import DesignThinkingManageStakeholdersUploadTemplate from './DesignThinkingManageStakeholdersUploadTemplate';
import DesignThinkingManageStakeholdersEmployeeType from './DesignThinkingManageStakeholdersEmployeeType';
import DesignThinkingManageStakeholdersTeamsType from './DesignThinkingManageStakeholdersTeamsType';
import DesignThinkingManageStakeholdersTradingPartnerType from './DesignThinkingManageStakeholdersTradingPartnerType';
import DesignThinkingManageStakeholdersRegulatoryBodyType from './DesignThinkingManageStakeholdersRegulatoryBodyType';
import DesignThinkingManageStakeholdersMarketIntelligenceType from './DesignThinkingManageStakeholdersMarketIntelligenceType';
import DesignThinkingManageStakeholdersAssestResourceType from './DesignThinkingManageStakeholdersAssestResourceType';
import { connect } from "react-redux";
import {responseMessage} from '../../utils/alert';
import moment from "moment";
import axios from 'axios';
import { 
    fetchStakeHolders , 
    fetchStakeHoldersType, 
    fetchDtStakeholderLocations, 
    fetchDtStakeholderManagers, 
    fetchDtStakeholderDepartments, 
    fetchBusinessEntity,
    fetchEmployeeType,
    fetchModel,
    fetchPartnerType,
    fetchOrganizationalLevel,
    fetchAssetCategory,
    fetchAssetType,
    saveDTStakeholder
} from '../../actions/DesignThinkingManageStakholdersActions';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Global } from '../../utils/Env';
const config = require('../../config');


class DesignThinkingManageStakeholders extends Component{
    constructor(props){
        super(props)
        this.state = {
            search : "",
            StakeHolderType : "Employee",
            mandatoryFields : {},
            additionalFields : {},
            stakeHolderId : "0",
            disableDate : "",
            showValidations : false,
            allowToSubmit : true
        }
        this.StakeHolderTypeChangeHandler.bind(this)
        this.mandatoryFieldsChangeHandler.bind(this)
        this.additionalFieldsChangeHandler.bind(this)
        this.stakeHolderSaveHandler.bind(this)
        this.getTypeAndList.bind(this)
        this.stakeholderEditDetails.bind(this)
        Global.callback.saveDTStakeholder_onComplete = (res) => {
            this.updateFieldsValue(res);        
        }
    }
    updateFieldsValue = (res) =>{
        this.setState({
            stakeHolderId : "0",
            mandatoryFields : {},
            additionalFields : {}
        },()=>{
            document.getElementById("thumbnail").value = "";
            this.getTypeAndList();
        })
    }
    
    componentDidMount(){
        this.getTypeAndList()
    }
    getTypeAndList = async () =>{        
        this.props.fetchStakeHolders();
        this.props.fetchStakeHoldersType();
        this.props.fetchDtStakeholderLocations();
        this.props.fetchDtStakeholderManagers();
        this.props.fetchDtStakeholderDepartments();
        this.props.fetchBusinessEntity();

        this.props.fetchEmployeeType();
        this.props.fetchModel();
        this.props.fetchPartnerType();
        this.props.fetchOrganizationalLevel();
        this.props.fetchAssetCategory();
        this.props.fetchAssetType();

    }
    StakeHolderTypeChangeHandler = (e) => {
        this.setState({
            StakeHolderType : e.target.value,
            stakeHolderId : "0",
            mandatoryFields : {},
            additionalFields : {},
            allowToSubmit : false,
            showValidations : false
        })
    }
    changeAllowSave = (set) => {
        this.setState({
            allowToSubmit : set
        })
    }
    stakeHolderSaveHandler = async () => {
        if(this.state.allowToSubmit === false){
            this.setState({
                showValidations : true
            })
        }else{
            let res = {};
            let fd = new FormData;
            switch(this.state.StakeHolderType){
                case "Employee":
                    fd.append("id",this.state.stakeHolderId);
                    fd.append("DTStakeHolderType",this.state.StakeHolderType);
                    fd.append("NationalIDNumber",this.state.mandatoryFields.natIdNum?this.state.mandatoryFields.natIdNum:"");
                    fd.append("FirstName",this.state.mandatoryFields.firstName?this.state.mandatoryFields.firstName:"");
                    fd.append("MiddleName",this.state.mandatoryFields.middleName?this.state.mandatoryFields.middleName:"");
                    fd.append("LastName",this.state.mandatoryFields.lastName?this.state.mandatoryFields.lastName:"");
                    // fd.append("JobTitle",this.state.additionalFields.jobTitle?this.state.additionalFields.jobTitle:"",);
                    fd.append("BirthDate",this.state.mandatoryFields.birthDate?moment(this.state.mandatoryFields.birthDate).format('YYYY-MM-DD'):"");
                    fd.append("HireDate",this.state.mandatoryFields.hireDate?moment(this.state.mandatoryFields.hireDate).format('YYYY-MM-DD'):"");
                    fd.append("Email",this.state.mandatoryFields.email?this.state.mandatoryFields.email:"");
                    fd.append("ManagerID",this.state.mandatoryFields.managerId?this.state.mandatoryFields.managerId:"");
                    fd.append("DepartmentID",this.state.mandatoryFields.department?this.state.mandatoryFields.department:"");
                    fd.append("Location",this.state.mandatoryFields.locationId?this.state.mandatoryFields.locationId:"");
                    fd.append("DisableDate",this.state.mandatoryFields.disableDate?moment(this.state.mandatoryFields.disableDate).format('YYYY-MM-DD'):"");
                    fd.append("Image",this.state.mandatoryFields.thumbnail?this.state.mandatoryFields.thumbnail:"");
                    fd.append("additional",JSON.stringify({
                        BusinessEntityID: this.state.additionalFields.businessEntity?this.state.additionalFields.businessEntity:"",
                        MaritalStatus: this.state.additionalFields.maritialStatus?this.state.additionalFields.maritialStatus:"",
                        Gender: this.state.additionalFields.gender?this.state.additionalFields.gender:"",
                        PhoneNumber: this.state.additionalFields.phoneNumber?this.state.additionalFields.phoneNumber:"",
                        Salary: this.state.additionalFields.salary?this.state.additionalFields.salary:"",
                        OrganizationalLevel: this.state.additionalFields.organizationalLevel?this.state.additionalFields.organizationalLevel:"",
                        EmployeeType: this.state.additionalFields.employeeType?this.state.additionalFields.employeeType:"",
                        JobTitle: this.state.additionalFields.jobTitle?this.state.additionalFields.jobTitle:"",
                    }));
                break;
                case "Trading Partner":
                    fd.append("id",this.state.stakeHolderId);
                    fd.append("DTStakeHolderType","Trading Partner");
                    fd.append("Title",this.state.mandatoryFields.title?this.state.mandatoryFields.title:"");
                    fd.append("PartnerType",this.state.mandatoryFields.partnerType?this.state.mandatoryFields.partnerType:"");
                    fd.append("Industry",this.state.mandatoryFields.industry?this.state.mandatoryFields.industry:"");
                    fd.append("Location",this.state.mandatoryFields.locationId?this.state.mandatoryFields.locationId:"");
                    fd.append("DisableDate",this.state.mandatoryFields.disableDate?moment(this.state.mandatoryFields.disableDate).format('YYYY-MM-DD'):"");
                    fd.append("Image",this.state.mandatoryFields.thumbnail?this.state.mandatoryFields.thumbnail:"");
                    fd.append("additional",JSON.stringify( {
                        KeyContact: this.state.additionalFields.keyContact?this.state.additionalFields.keyContact:"",
                        RelationFrom: this.state.additionalFields.relationFrom?this.state.additionalFields.relationFrom:"",
                        RelationTo: this.state.additionalFields.relationTo?this.state.additionalFields.relationTo:"",
                        ContractTerminationDate: this.state.additionalFields.contractTerminationDate?moment(this.state.additionalFields.contractTerminationDate).format('YYYY-MM-DD'):"",
                        PrimaryContact: this.state.additionalFields.primaryContact?this.state.additionalFields.primaryContact:"",
                        Owner: this.state.additionalFields.owner?this.state.additionalFields.owner:"",
                        PartnerLevel: this.state.additionalFields.partnerLevel?this.state.additionalFields.partnerLevel:"",  
                    }));
                break;
                case "Asset/Resources" :
                    fd.append("id",this.state.stakeHolderId);
                    fd.append("DTStakeHolderType",this.state.StakeHolderType);
                    fd.append("ModelName",this.state.mandatoryFields.modelName?this.state.mandatoryFields.modelName:"");
                    fd.append("Model",this.state.mandatoryFields.modelId?this.state.mandatoryFields.modelId:"");
                    fd.append("AssetType",this.state.mandatoryFields.assetType?this.state.mandatoryFields.assetType:"");
                    fd.append("AssetName",this.state.mandatoryFields.assetName?this.state.mandatoryFields.assetName:"");
                    fd.append("AssetCategory",this.state.mandatoryFields.assetCategory?this.state.mandatoryFields.assetCategory:"");
                    fd.append("AssetDescription",this.state.mandatoryFields.assetDescription?this.state.mandatoryFields.assetDescription:"");
                    fd.append("Location",this.state.mandatoryFields.locationId?this.state.mandatoryFields.locationId:"");
                    fd.append("Image",this.state.mandatoryFields.thumbnail?this.state.mandatoryFields.thumbnail:"");
                    fd.append("DisableDate",this.state.mandatoryFields.disableDate?moment(this.state.mandatoryFields.disableDate).format('YYYY-MM-DD'):"");
                    fd.append("additional",JSON.stringify({
                            ManufacturerName: this.state.additionalFields.manufacturerName?this.state.additionalFields.manufacturerName:"",
                            AssetModelDescription: this.state.additionalFields.assetModelDescription?this.state.additionalFields.assetModelDescription:"",
                            AssetStartDate: this.state.additionalFields.assetStartDate?moment(this.state.additionalFields.assetStartDate).format('YYYY-MM-DD'):"",
                            AssetExpirationDate:this.state.additionalFields.assetExpirationDate?moment(this.state.additionalFields.assetExpirationDate).format('YYYY-MM-DD'):"",
                            AssetCost:this.state.additionalFields.assetCost?this.state.additionalFields.assetCost:"",
                            LastMaintenanceDate:this.state.additionalFields.lastMaintenance?moment(this.state.additionalFields.lastMaintenance).format('YYYY-MM-DD'):"",
                            MaintenanceInterval:this.state.additionalFields.maintenanceInterval?this.state.additionalFields.maintenanceInterval:"",
                            AssetNumber:this.state.additionalFields.assetNumber?this.state.additionalFields.assetNumber:"",
                            AssetKeyCCID:this.state.additionalFields.assetCCID?this.state.additionalFields.assetCCID:"",
                        }));
                break;
                case "MarketIntellegence" :
                    fd.append("id",this.state.stakeHolderId);
                    fd.append("DTStakeHolderType",this.state.StakeHolderType);
                    fd.append("Title",this.state.mandatoryFields.title?this.state.mandatoryFields.title:"");
                    fd.append("SourceName",this.state.mandatoryFields.sourceName?this.state.mandatoryFields.sourceName:"");
                    fd.append("Product",this.state.mandatoryFields.product?this.state.mandatoryFields.product:"");
                    fd.append("Location",this.state.mandatoryFields.locationId?this.state.mandatoryFields.locationId:"");
                    fd.append("DisableDate",this.state.mandatoryFields.disableDate?moment(this.state.mandatoryFields.disableDate).format('YYYY-MM-DD'):"");
                    fd.append("Image",this.state.mandatoryFields.thumbnail?this.state.mandatoryFields.thumbnail:"");
                    fd.append("additional",JSON.stringify({}));
                break;
                case "RegulatoryBody" :
                    fd.append("id",this.state.stakeHolderId);
                    fd.append("DTStakeHolderType",this.state.StakeHolderType);
                    fd.append("Title",this.state.mandatoryFields.title?this.state.mandatoryFields.title:"");
                    fd.append("Headquarter",this.state.mandatoryFields.headquarter?this.state.mandatoryFields.headquarter:"");
                    fd.append("Location",this.state.mandatoryFields.locationId?this.state.mandatoryFields.locationId:"");
                    fd.append("DisableDate",this.state.mandatoryFields.disableDate?moment(this.state.mandatoryFields.disableDate).format('YYYY-MM-DD'):"");
                    fd.append("Image",this.state.mandatoryFields.thumbnail?this.state.mandatoryFields.thumbnail:"");
                    fd.append("additional",JSON.stringify({
                        Sector: this.state.additionalFields.sector?this.state.additionalFields.sector:"",
                        Head: this.state.additionalFields.head?this.state.additionalFields.head:"",
                        PrimaryContract: this.state.additionalFields.primaryContact?this.state.additionalFields.primaryContact:"",
                        EnterpriseDepartment:this.state.additionalFields.enterpriseDepartment?this.state.additionalFields.enterpriseDepartment:""
                    }));
                break;
            }
            this.props.saveDTStakeholder(fd);

            // res = await axios.post(config.laravelBaseUrl+'saveDesignThinkingStakeHolder',fd,{
            //     headers: {
            //         "authorization": "Bearer " + sessionStorage.getItem("userToken")
            //     }
            // })
            // if(res.status === 200){
            //     if(res.data.success === true){
            //         responseMessage("success", res.data.message, "");
            //         this.setState({
            //             stakeHolderId : "0",
            //             mandatoryFields : {},
            //             additionalFields : {}
            //         },()=>{
            //             document.getElementById("thumbnail").value = "";
            //             this.getTypeAndList();
            //         })
            //     }
            // }
        }

    }

    async stakeholderEditDetails(id){
        let stakeholder = await axios.get(config.laravelBaseUrl+'getDtStakeHolderDetails/'+id, {
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        });
        if(stakeholder.status === 200){
            if(stakeholder.data.success === true){
                let mand_fields ={};
                let add_fields={};
                let stkType = "";
                switch(stakeholder.data.data[0].DTStakeHolderType){
                    case "Employee":
                        stkType = "Employee";
                        mand_fields = {
                            natIdNum : stakeholder.data.data[0].NationalIDNumber,
                            firstName : stakeholder.data.data[0].FirstName,
                            middleName : stakeholder.data.data[0].MiddleName,
                            lastName : stakeholder.data.data[0].LastName,
                            birthDate : stakeholder.data.data[0].BirthDate?new Date(stakeholder.data.data[0].BirthDate):null,
                            hireDate : stakeholder.data.data[0].HireDate?new Date(stakeholder.data.data[0].HireDate):null,
                            email : stakeholder.data.data[0].Email,
                            managerId : stakeholder.data.data[0].ManagerID,
                            department : stakeholder.data.data[0].DepartmentID,
                            locationId : stakeholder.data.data[0].Location,
                            disableDate : stakeholder.data.data[0].DisableDate?new Date(stakeholder.data.data[0].DisableDate):null,
                            thumbnail : stakeholder.data.data[0].Image
                        }
                        add_fields = {
                            businessEntity : stakeholder.data.data[0].BusinessEntityID,
                            maritialStatus : stakeholder.data.data[0].MaritalStatus,
                            gender : stakeholder.data.data[0].Gender,
                            phoneNumber : stakeholder.data.data[0].PhoneNumber,
                            salary : stakeholder.data.data[0].Salary,
                            organizationalLevel : stakeholder.data.data[0].OrganizationalLevel,
                            employeeType : stakeholder.data.data[0].EmployeeType,
                            jobTitle : stakeholder.data.data[0].JobTitle
                        }
                    break;
                    case "Trading Partner":
                        mand_fields = {
                            title : stakeholder.data.data[0].Title,
                            partnerType : stakeholder.data.data[0].PartnerType,
                            industry : stakeholder.data.data[0].Industry,
                            locationId : stakeholder.data.data[0].Location,
                            disableDate : stakeholder.data.data[0].DisableDate?new Date(stakeholder.data.data[0].DisableDate):null,
                            thumbnail : stakeholder.data.data[0].Image
                        }
                        add_fields = { 
                            keyContact : stakeholder.data.data[0].KeyContact,
                            relationFrom : stakeholder.data.data[0].RelationFrom?new Date(stakeholder.data.data[0].RelationFrom):null,
                            relationTo : stakeholder.data.data[0].RelationTo?new Date(stakeholder.data.data[0].RelationTo):null,
                            primaryContact : stakeholder.data.data[0].PrimaryContact,
                            owner : stakeholder.data.data[0].Owner,
                            partnerLevel : stakeholder.data.data[0].PartnerType,
                            contractTerminationDate : stakeholder.data.data[0].ContractTerminationDate?new Date(stakeholder.data.data[0].ContractTerminationDate):null,
                        };
                        stkType = "Trading Partner";
                    break;
                    case "MarketIntellegence":
                        mand_fields = {
                            title : stakeholder.data.data[0].Title,
                            sourceName : stakeholder.data.data[0].StakeholdersEntityTitle,
                            product : stakeholder.data.data[0].Product,
                            locationId : stakeholder.data.data[0].Location,
                            disableDate : stakeholder.data.data[0].DisableDate?new Date(stakeholder.data.data[0].DisableDate):null,
                            thumbnail : stakeholder.data.data[0].Image
                        }
                        add_fields = {};
                        stkType = "MarketIntellegence";
                    break;
                    case "RegulatoryBody":
                        mand_fields = {
                            title : stakeholder.data.data[0].Title,
                            locationId : stakeholder.data.data[0].Location,
                            headquarter : stakeholder.data.data[0].Headquarters,
                            disableDate : stakeholder.data.data[0].DisableDate?new Date(stakeholder.data.data[0].DisableDate):null,
                            thumbnail : stakeholder.data.data[0].Image
                        };
                        add_fields = {
                            sector : stakeholder.data.data[0].Sector,
                            head : stakeholder.data.data[0].Head,
                            primaryContact : stakeholder.data.data[0].PrimaryContract,
                            enterpriseDepartment : stakeholder.data.data[0].EnterpriseDepartment,
                        };
                        stkType = "RegulatoryBody";
                    break;
                    case "Teams":
                        stkType = "Teams";
                    break;
                    case "Asset/Resources" :
                        mand_fields = {
                            modelName : stakeholder.data.data[0].ModelName,
                            modelId : stakeholder.data.data[0].ModelName,
                            assetType : stakeholder.data.data[0].AssetType,
                            assetName : stakeholder.data.data[0].AssetName,
                            assetCategory : stakeholder.data.data[0].AssetCategory,
                            assetDescription : stakeholder.data.data[0].AssetDescription,
                            locationId : stakeholder.data.data[0].Location,
                            disableDate : stakeholder.data.data[0].DisableDate?new Date(stakeholder.data.data[0].DisableDate):null,
                            thumbnail : stakeholder.data.data[0].Image
                        }
                        add_fields = {
                            manufacturerName : stakeholder.data.data[0].ManufacturerName,
                            assetModelDescription : stakeholder.data.data[0].AssetModelDescription,
                            assetCost : stakeholder.data.data[0].AssetCost,
                            maintenanceInterval : stakeholder.data.data[0].MaintenanceInterval,
                            assetNumber : stakeholder.data.data[0].AssetNumber,
                            assetCCID : stakeholder.data.data[0].AssetKeyCCID,
                            lastMaintenance : stakeholder.data.data[0].LastMaintenanceDate?new Date(stakeholder.data.data[0].LastMaintenanceDate):null,
                            assetStartDate : stakeholder.data.data[0].AssetStartDate?new Date(stakeholder.data.data[0].AssetStartDate):null,
                            assetExpirationDate : stakeholder.data.data[0].AssetExpirationDate?new Date(stakeholder.data.data[0].AssetExpirationDate):null,
                        };
                        stkType = "Asset/Resources";
                    break;
                    default:
                }
                this.setState({
                    StakeHolderType : stkType,
                    stakeHolderId : stakeholder.data.data[0].StakeHolderId
                },()=>{
                    this.setState({
                        mandatoryFields : mand_fields,
                        additionalFields : add_fields
                    })
                })
            }
        }
    }

    disableDateChangeHandler = (date) => {
        let mand_fields = {
            ...this.state.mandatoryFields,
            disableDate : date
        }
        this.setState({
            mandatoryFields : mand_fields
        })
    }
    relationFromChangeHandler = (date) => {
        let add_fields = {
            ...this.state.additionalFields,
            relationFrom : date
        }
        this.setState({
            additionalFields : add_fields
        })
    }

    relationToChangeHandler = (date) => {
        let add_fields = {
            ...this.state.additionalFields,
            relationTo : date
        }
        this.setState({
            additionalFields : add_fields
        })
    }
    hireDateChangeHandler = (date) => {
        let mand_fields = {
            ...this.state.mandatoryFields,
            hireDate : date
        }
        this.setState({
            mandatoryFields : mand_fields
        })
    }
    birthDateChangeHandler = (date) => {
        let mand_fields = {
            ...this.state.mandatoryFields,
            birthDate : date
        }
        this.setState({
            mandatoryFields : mand_fields
        })
    }
    contractTerminationDateChangeHandler = date => {
        let add_fields = {
            ...this.state.additionalFields,
            contractTerminationDate : date
        }
        this.setState({
            additionalFields : add_fields
        })
    }
    assetStartDateChangeHandler = (date) => {
        let mand_fields = {
            ...this.state.additionalFields,
            assetStartDate : date
        }
        this.setState({
            additionalFields : mand_fields
        })
    }
    assetExpirationDateChangeHandler = (date) => {
        let mand_fields = {
            ...this.state.additionalFields,
            assetExpirationDate : date
        }
        this.setState({
            additionalFields : mand_fields
        })
    }
    lastMaintenaceChangeHandler = (date) => {
        let mand_fields = {
            ...this.state.additionalFields,
            lastMaintenace : date
        }
        this.setState({
            additionalFields : mand_fields
        })
    }

    mandatoryFieldsChangeHandler = (e) => {
        let man_fields = {
            ...this.state.mandatoryFields,
            [e.target.id] : e.target.value
        };

        this.setState({
            mandatoryFields : man_fields
        })
    }

    additionalFieldsChangeHandler = (e) => {
        let add_fields = {
            ...this.state.additionalFields,
            [e.target.id] : e.target.value
        }

        this.setState({
            additionalFields : add_fields
        })
    }
    thumbailImageChangeHandler(e){
        if(e.target.value != ""){
            let manFields = {
                ...this.state.mandatoryFields,
                thumbnail : e.target.files[0]
            }
            this.setState({
                mandatoryFields : manFields
            })
        }
    }

    render(){
        // console.log("ValidationErrMsg",this.props.stakeholderValidationErrMsg.data)
        // console.log("ResponseData",this.props.stakeholderResponseData.success)
        

        let stakeHolderFields = '';
        switch(this.state.StakeHolderType){
            case "Employee":
                stakeHolderFields = <DesignThinkingManageStakeholdersEmployeeType
                birthDateChangeHandler={this.birthDateChangeHandler.bind(this)}
                mandatoryValues={this.state.mandatoryFields}
                mandatoryChange={this.mandatoryFieldsChangeHandler.bind(this)}
                additionalValues={this.state.additionalFields}
                additionalChange={this.additionalFieldsChangeHandler.bind(this)}
                thumbailImageChangeHandler={this.thumbailImageChangeHandler.bind(this)}
                hireDateChangeHandler={this.hireDateChangeHandler.bind(this)}
                showValidations={this.state.showValidations}
                changeAllowSave={this.changeAllowSave.bind(this)}
                allowToSubmit = {this.state.allowToSubmit}
                locations = {this.props.stakeholderLocations}
                managers = {this.props.stakeholderManagers}
                departments = {this.props.stakeholderDepartments}
                businessEntity = {this.props.stakeholderBusinessEntity}
                organizationalLevel = {this.props.stakeholderOrganizationalLevel}
                employeeType = {this.props.stakeholderEmployeeType}
                validationErrMsg={this.props.stakeholderValidationErrMsg.data}
                />
            break;
            case "Trading Partner":
                stakeHolderFields = <DesignThinkingManageStakeholdersTradingPartnerType
                contractTerminationDateChangeHandler = {this.contractTerminationDateChangeHandler.bind(this)}
                mandatoryValues = {this.state.mandatoryFields} 
                mandatoryChange={this.mandatoryFieldsChangeHandler.bind(this)}
                thumbailImageChangeHandler={this.thumbailImageChangeHandler.bind(this)}
                additionalValues = {this.state.additionalFields}
                additionalChange={this.additionalFieldsChangeHandler.bind(this)} 
                relationToChangeHandler={this.relationToChangeHandler.bind(this)}
                relationFromChangeHandler={this.relationFromChangeHandler.bind(this)}
                showValidations={this.state.showValidations}
                changeAllowSave={this.changeAllowSave.bind(this)}
                allowToSubmit = {this.state.allowToSubmit}
                locations = {this.props.stakeholderLocations}
                partnerType = {this.props.stakeholderPartnerType}
                validationErrMsg={this.props.stakeholderValidationErrMsg.data}
                />
            break;
            case "MarketIntellegence":
                stakeHolderFields = <DesignThinkingManageStakeholdersMarketIntelligenceType
                mandatoryValues = {this.state.mandatoryFields} 
                mandatoryChange={this.mandatoryFieldsChangeHandler.bind(this)}
                thumbailImageChangeHandler={this.thumbailImageChangeHandler.bind(this)}
                showValidations={this.state.showValidations}
                changeAllowSave={this.changeAllowSave.bind(this)}
                allowToSubmit = {this.state.allowToSubmit}
                locations = {this.props.stakeholderLocations}
                validationErrMsg={this.props.stakeholderValidationErrMsg.data}
                responseStatus={this.props.stakeholderResponseData.success}
                />
            break;
            case "RegulatoryBody":
                stakeHolderFields = <DesignThinkingManageStakeholdersRegulatoryBodyType
                mandatoryValues = {this.state.mandatoryFields} 
                additionalValues = {this.state.additionalFields} 
                mandatoryChange={this.mandatoryFieldsChangeHandler.bind(this)} 
                additionalChange={this.additionalFieldsChangeHandler.bind(this)} 
                thumbailImageChangeHandler={this.thumbailImageChangeHandler.bind(this)}
                showValidations={this.state.showValidations}
                changeAllowSave={this.changeAllowSave.bind(this)}
                allowToSubmit = {this.state.allowToSubmit}
                locations = {this.props.stakeholderLocations}
                validationErrMsg={this.props.stakeholderValidationErrMsg.data}
                />
            break;
            case "Teams":
                stakeHolderFields = <DesignThinkingManageStakeholdersTeamsType />
            break;
            case "Asset/Resources" : 
                stakeHolderFields = <DesignThinkingManageStakeholdersAssestResourceType
                mandatoryValues = {this.state.mandatoryFields} 
                additionalValues = {this.state.additionalFields} 
                mandatoryChange={this.mandatoryFieldsChangeHandler.bind(this)} 
                additionalChange={this.additionalFieldsChangeHandler.bind(this)} 
                assetStartDateChangeHandler={this.assetStartDateChangeHandler.bind(this)}
                assetExpirationDateChangeHandler={this.assetExpirationDateChangeHandler.bind(this)}
                thumbailImageChangeHandler={this.thumbailImageChangeHandler.bind(this)}
                lastMaintenaceChangeHandler={this.lastMaintenaceChangeHandler.bind(this)}
                showValidations={this.state.showValidations}
                changeAllowSave={this.changeAllowSave.bind(this)}
                allowToSubmit = {this.state.allowToSubmit}
                locations = {this.props.stakeholderLocations}
                assetCategory = {this.props.stakeholderAssetCategory}
                assetType = {this.props.stakeholderAssetType}
                model = {this.props.stakeholderModel}
                validationErrMsg={this.props.stakeholderValidationErrMsg.data}
                />
            break;
            default:
        }
        let stakeholders = this.props.stakeHoldersData?this.props.stakeHoldersData:[];
        if (this.state.search) {
            stakeholders = stakeholders.filter(row => {
              let StakeHolderType = row.StakeHolderType ? row.StakeHolderType.toLowerCase() : '';
              let StakeHolderName = row.StakeHolderName ? row.StakeHolderName.toLowerCase() : '';
              let Location = row.Location ? row.Location.toLowerCase() : '';
              let disableDate = row.DisableDate ? row.DisableDate.toLowerCase() : '';
              return StakeHolderType.includes(this.state.search.toLowerCase()) || StakeHolderName.includes(this.state.search.toLowerCase()) || Location.includes(this.state.search.toLowerCase()) || disableDate.includes(this.state.search.toLowerCase())
            })
        }
        let columns = [{
            Header: 'Stakeholder Type',
            accessor: 'StakeHolderType',
            Cell: props => <span>{props.original.StakeHolderType}</span>
          }, {
            Header: 'Name',
            accessor: 'StakeHolderName',
            Cell: props => <span>{props.original.StakeHolderName}</span>
          }, {
            Header: 'Location',
            accessor: 'Location',
            Cell: props => <span>{props.original.Location}</span>
          }, {
            Header: 'Disable Date',
            accessor: 'DisableDate',
            Cell: props => <span>{props.original.DisableDate ? moment(props.original.DisableDate).format("DD/MM/YYYY") : "Not Available"}</span>
        }, 
        {
            Header: 'Actions',
            sortable: false,
            Cell: props => <a className="btn btn-info" href="#" onClick={this.stakeholderEditDetails.bind(this, props.original.StakeHolderId)} ><i className="fa fa-edit"></i></a>
        }
        ];
        {/**/}
        const tableConfig = {
            defaultPageSize: 10,
            resizable: false,
            className: 'table-striped'
        }
        let stakeHolderTypes = this.props.stakeholdersType.map((type)=>{
            return(
                <option value={type.code} key={type.id} >{type.name}</option>
            );
        })


        return(
            <>
                <DashboardHeader />
                <div id="wrapper">
                    <DashboardSidebar />
                    <DesignThinkingManageStakeholdersWrapper id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <DesignThinkingManageStakeholdersBreadcrumb />
                            <div className="container-fluid container-dashboard">
                                <div className="user-content">
                                    <h1 className="heading mt-3">Design Led Materiality - Manage Stakeholders</h1>
                                    <DesignThinkingManageStakeholdersUploadTemplate />
                                    <div className="card thingking-section">
                                        <div className="card-header">
                                            OR Add & Edit Stakeholder
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">Add stakeholders to your enterprise account for Design Led Materiality Projects.</p>
                                            <div className="user-form-section col-sm-12 col-md-12 col-lg-10 p-0">
                                                <div className="form-group row">
                                                    <div className="col-sm-6">
                                                        <label>Stakeholder Type <span className="text-danger">*</span></label>
                                                        <select className="form-control" 
                                                        value={this.state.StakeHolderType}
                                                        onChange={(e => this.StakeHolderTypeChangeHandler(e))}>
                                                           {stakeHolderTypes}
                                                        </select>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label>Select Stakeholder Disable Date</label>
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
                                                                id="disableDate"
                                                                minDate={new Date()}
                                                                onChange={this.disableDateChangeHandler.bind(this)}
                                                                dateFormat="dd/MM/yyyy"
                                                                selected={this.state.mandatoryFields.disableDate?this.state.mandatoryFields.disableDate:''}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {stakeHolderFields}
                                                <div className="form-group row row-btn mt-4">
                                                    <div className="col-sm-6">
                                                        <button onClick={this.stakeHolderSaveHandler.bind(this)} type="button" className="btn btn-primary mr-3">SAVE</button>
                                                        <a href="#">Cancel</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card table-section mt-4 mb-5">
                                        <div className="card-header">
                                            Manage Stakeholders
                                        </div>
                                        <div className="card-body">
                                            <div className="data-length row">
                                                <div className="col-8"></div>
                                                <div className="col-4">
                                                    <ul className="list-inline">
                                                        <li className="list-inline-item">
                                                        <div className="search-container">
                                                            <input type="text" className="form-control" placeholder="Search" value={this.state.search} onChange={e => this.setState({search: e.target.value})} />
                                                            <span className="fas fa-search form-control-search" ></span>
                                                        </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="manage-table table-responsive">
                                                <ReactTable
                                                    data={stakeholders}
                                                    columns={columns}
                                                    {...tableConfig}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DesignThinkingManageStakeholdersWrapper>
                </div>
                <AsideComponent />
                <FooterComponent />
            </>

        );
    }
}

const mapStateToProps = state => ({
    stakeHoldersData : state.DesignThinkingManageStakeholders.stakeholders,
    stakeholdersType : state.DesignThinkingManageStakeholders.stakeholdersType,
    stakeholderLocations : state.DesignThinkingManageStakeholders.locations,
    stakeholderManagers : state.DesignThinkingManageStakeholders.managers,
    stakeholderDepartments : state.DesignThinkingManageStakeholders.departments,
    stakeholderBusinessEntity :  state.DesignThinkingManageStakeholders.businessEntity,
    stakeholderEmployeeType :  state.DesignThinkingManageStakeholders.employeeType,
    stakeholderModel :  state.DesignThinkingManageStakeholders.model,
    stakeholderPartnerType :  state.DesignThinkingManageStakeholders.partnerType,
    stakeholderOrganizationalLevel :  state.DesignThinkingManageStakeholders.organizationalLevel,
    stakeholderAssetCategory :  state.DesignThinkingManageStakeholders.assetCategory,
    stakeholderAssetType :  state.DesignThinkingManageStakeholders.assetType,
    stakeholderResponseData :  state.DesignThinkingManageStakeholders.responseData,
    stakeholderValidationErrMsg :  state.DesignThinkingManageStakeholders.validationErrMsg
})

export default connect(mapStateToProps,{
    fetchStakeHolders ,
    fetchStakeHoldersType, 
    fetchDtStakeholderLocations, 
    fetchDtStakeholderManagers, 
    fetchDtStakeholderDepartments, 
    fetchBusinessEntity,
    fetchEmployeeType,
    fetchModel,
    fetchPartnerType,
    fetchOrganizationalLevel,
    fetchAssetCategory,
    fetchAssetType,
    saveDTStakeholder
})(DesignThinkingManageStakeholders);