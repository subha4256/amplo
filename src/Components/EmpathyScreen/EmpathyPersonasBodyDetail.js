import React,{Component, Fragment} from 'react';
import { connect } from 'react-redux';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import ContentEditable from 'react-contenteditable';
import {Link} from 'react-router-dom';
import { savePersonaDetails, getAllPersona, getAllStakeholdersForPersona, getAllLifecycleForPersona, getAllMotivationCategories, getAllPersonalityCategories, deletePersona } from '../../actions/personaActions';
import { Global } from '../../utils/Env';
import _ from 'lodash';
import { responseMessage } from '../../utils/alert';
const config = require('../../config.js');

class EmpathyPersonasBodyDetail extends Component {

    constructor(props){
        super(props);
        Global.callback.savePersonaDetails_onComplete = () => {
            this.setState({showCreateBtn: true})
            this.props.getAllPersona(this.props.ProjectId, this.props.ProjectVersionId, this.props.EpicId, this.props.EpicVersionId);
        }
        Global.callback.deletePersona_onComplete = () => {
            this.props.getAllPersona(this.props.ProjectId, this.props.ProjectVersionId, this.props.EpicId, this.props.EpicVersionId);
        }
        Global.callback.createCustomerJourneyMap_onComplete = (res) => {
            this.props.getAllPersona(this.props.ProjectId, this.props.ProjectVersionId, this.props.EpicId, this.props.EpicVersionId);     
        }
    }

    state = {
        showViewBtn: true,
        showCreateBtn: false,
        selectedLifeCycleId: "",
        rangeVal:50,
        data:[],
        fetchedPersonas : [],
        currentSelectedPersona : {},
        fetchedLifeCycle : [],
        currentSelectedPersonaInd : -1
    }

    componentDidMount(){
        this.props.personaSaveBtn();
        this.props.getAllPersona(this.props.ProjectId, this.props.ProjectVersionId, this.props.EpicId, this.props.EpicVersionId);
        this.props.getAllStakeholdersForPersona(this.props.ProjectId, this.props.EpicId);
        this.props.getAllMotivationCategories();
        this.props.getAllPersonalityCategories();
        this.props.getAllLifecycleForPersona(this.props.ProjectId, this.props.EpicId);
    }

    static getDerivedStateFromProps = (nextprops, prevState) => {
        
        let returnObj = {...prevState};
        if(!Array.isArray(nextprops.allPersona)){
            if(nextprops.allPersona.Persona !== null && nextprops.allPersona.Persona !== undefined && nextprops.allPersonalityCategories.length > 0 && nextprops.allMotivationCategories.length > 0){
                if(prevState.fetchedPersonas !== nextprops.allPersona.Persona){
                    let newData = nextprops.allPersona.Persona?nextprops.allPersona.Persona.map(persona=>{
                        let motivations = persona.Motivations.map(motivation=>{
                            console.log("motivation =>", motivation)
                            let ind = nextprops.allMotivationCategories.map(mot=>mot.CategoryLookUpId).indexOf(motivation.MotivationId)
                            return{
                                id : motivation.MotivationId,
                                name: motivation.CategoryText || nextprops.allMotivationCategories[ind].CategoryName,
                                value: motivation.Value
                            }
                        })
                        let personalities = persona.Personality.map(personality=>{

                            console.log("personality", personality)

                            let ind = nextprops.allPersonalityCategories.map(per=>per.CategoryLookUpId).indexOf(personality.PersonalityId)
                            return{
                                id : personality.PersonalityId,
                                name1:  nextprops.allPersonalityCategories[ind] ? personality?.CategoryText || nextprops.allPersonalityCategories[ind].CategoryName : 'name1',
                                name2:  nextprops.allPersonalityCategories[ind+4] ? 
                                personality?.PersonalityText || nextprops.allPersonalityCategories[ind+4].CategoryName : 'name2',
                                // name1: nextprops.allPersonalityCategories[ind].CategoryName,
                                // name2: nextprops.allPersonalityCategories[ind+4].CategoryName,
                                value: personality.Value
                            }
                        })
                        return {
                            CustomerJourneyMapId: persona.CustomerJourneyMapId,
                            id: persona.PersonaId,
                            name : persona.PersonaName,
                            img: persona.FilePath,
                            bio: persona.Bio,
                            goals: persona.Goals,
                            painpoints: persona.PainPoints,
                            summary: persona.Summary,
                            personalInfo: {
                                Age: persona.Age,
                                Occupation: persona.Occupation,
                                Family: persona.Family,
                                Location: persona.Location,
                                Archetype: persona.Archetype
                            },
                            motivations: motivations,
                            personality: personalities,
                            LifeCycleId : persona.LifeCycleId,
                            Links : persona.Links
                        }
                    }):[]
                    returnObj = {
                        ...prevState,
                        data : newData,
                        fetchedPersonas : nextprops.allPersona.Persona?nextprops.allPersona.Persona:[]
                    }
                }
            }
        }else{
            if(nextprops.allPersona != prevState.fetchedPersonas){
                returnObj = {
                    ...prevState,
                    data : nextprops.allPersona,
                    fetchedPersonas : nextprops.allPersona
                }
            }
        }
        if(prevState.fetchedLifeCycle != nextprops.allLifeCycle){
            returnObj.fetchedLifeCycle = nextprops.allLifeCycle
        }
        return returnObj;
    }

    groupBy = (list, keyGetter) => {
        const map = new Map();
        list.forEach((item) => {
             const key = keyGetter(item);
             const collection = map.get(key);
             if (!collection) {
                 map.set(key, [item]);
             } else {
                 collection.push(item);
             }
        });
        return map;
    }
    addNewPersona = () => {
        let personas = [...this.state.data];
        let num = Number(personas.length)+1;
        let motivations = [...this.props.allMotivationCategories]
        motivations = motivations.map(motivation=>{
            return{
                id : motivation.CategoryLookUpId,
                name: motivation.CategoryName,
                value : 0
            }
        })
        let personalities = [...this.props.allPersonalityCategories]
   
        const grouped = this.groupBy(personalities, pet => pet.CategoryMeaning);

        const grouped1 = this.groupBy(personalities, pet => pet.CategoryDescription);
        
        const IntrovertObj = grouped.get("Introvert").map(d => {
            if(d.CategoryDescription == "Left"){
                return {name1: d.CategoryName}
            } else {
                return {name2: d.CategoryName}
            }
        })

        const AnalyticalObj = grouped.get("Analytical").map(d => {
            if(d.CategoryDescription == "Left"){
                return {name1: d.CategoryName}
            } else {
                return {name2: d.CategoryName}
            }
        })

        const LoyalObj = grouped.get("Loyal").map(d => {
            if(d.CategoryDescription == "Left"){
                return {name1: d.CategoryName}
            } else {
                return {name2: d.CategoryName}
            }
        })

        const PassiveObj = grouped.get("Passive").map(d => {
            if(d.CategoryDescription == "Left"){
                return {name1: d.CategoryName}
            } else {
                return {name2: d.CategoryName}
            }
        })

        const LeftObj = grouped1.get("Left")

        const obj1 = IntrovertObj.reduce((acc,cur) => Object.assign(acc,cur), {})
        const obj2 = AnalyticalObj.reduce((acc,cur) => Object.assign(acc,cur), {})
        const obj3 = LoyalObj.reduce((acc,cur) => Object.assign(acc,cur), {})
        const obj4 = PassiveObj.reduce((acc,cur) => Object.assign(acc,cur), {})

        const newPersonalityArr = [obj1,obj2,obj3,obj4]

        personalities = newPersonalityArr.map((personality,i) => {
            return{
                id : LeftObj[i].CategoryLookUpId,
                name1: personality.name1,
                name2: personality.name2,
                value: 0
            }
        })

        let newPersona = {
            id: 0,
            name : "Persona "+num,
            img: "",
            bio: "Add Bio Here",
            goals: [{
                Id : 0,
                Text:"Enter Your Goals"
            }],
            painpoints: [{
                Id : 0,
                Text:"Enter Your Painpoints"
            }],
            summary: "Add Summary Here",
            personalInfo: {
                    Age: "0",
                    Occupation: "Enter Occupation",
                    Family: "Enter Family Details",
                    Location: "Enter Location",
                    Archetype: "Enter ArcheType"
                },
            motivations: motivations,
            personality: personalities,
            Links : [],
            LifeCycleId : ""
        }
        personas.push(newPersona);
        this.setState({
            data : personas
        })
    }

    handleRangeSlider = (e,index,personaInd) => {
        const updateRangeSlider = [...this.state.data]
        updateRangeSlider[personaInd].personality[index].value = e.target.value;
        this.setState({data: updateRangeSlider})
    }
    handleProgressBar = (index,value, personaInd) => {
        const updateProgressBarValue = [...this.state.data]
        updateProgressBarValue[personaInd].motivations[index].value = value;
        this.setState({data: updateProgressBarValue})
    }
    updateMotivationName = (e,index,personaInd) => {
        const updateProgressBarName = [...this.state.data]
        updateProgressBarName[personaInd].motivations[index].name = e.target.value;
        this.setState({data: updateProgressBarName})
    }
    handlePersonalityName1 = (e,index,personaInd) => {
        const updatePersonalityName1 = [...this.state.data]
        updatePersonalityName1[personaInd].personality[index].name1 = e.target.value;
        this.setState({data: updatePersonalityName1})
    }
    handlePersonalityName2 = (e,index,personaInd) => {
        const updatePersonalityName2 = [...this.state.data]
        updatePersonalityName2[personaInd].personality[index].name2 = e.target.value;
        this.setState({data: updatePersonalityName2})
    }
    nameChangeHandler = (e,personaInd) => {
        const allPersona = [...this.state.data];
        allPersona[personaInd].name = e.target.value;
        this.setState({data: allPersona})
    }
    handleSummary = (e,personaInd) => {
        const updateSummary = [...this.state.data]
        updateSummary[personaInd].summary = e.target.value;
        this.setState({data: updateSummary})
    }
    handlePersonalInfo = (e,i,key,personaInd) => {
        const updatePersonalInfo = [...this.state.data]
        updatePersonalInfo[personaInd].personalInfo[key] = e.target.value;
        this.setState({data: updatePersonalInfo})
    }
    handleBio = (e,personaInd) => {
        const updateBio = [...this.state.data]
        updateBio[personaInd].bio = e.target.value;
        this.setState({data: updateBio})
    }
    handleGoal = (e,index,personaInd) => {
        const updateGoal = [...this.state.data]
        updateGoal[personaInd].goals[index].Text = e.target.value;
        this.setState({data: updateGoal})
    }
    handlePainPoints = (e,index,personaInd) => {
        const updatePainpoint = [...this.state.data]
        updatePainpoint[personaInd].painpoints[index].Text = e.target.value;
        this.setState({data: updatePainpoint})
    }
    handleImage = (e,personaInd) => {
        const updateImg = [...this.state.data]
        updateImg[personaInd].img = e.target.files[0];
        

        this.setState({data: updateImg})
    }

    createFormData = (formData, key, data, pureKey) => {
        if (data === Object(data) || Array.isArray(data)) {
            if(pureKey === 'File'){
                formData.append(key, data);
            }else{
                for (var i in data) {
                    this.createFormData(formData, key + '[' + i + ']', data[i],i);
                }
            }
        } else {
            formData.append(key, data);
        }
    }

    savePersona = (data) => {
        this.setState({showViewBtn: false})
        for(let item of this.state.data){
            if(item.Links.length < 1 || item.LifeCycleId == ""){
                responseMessage('error',`Please Link lifecycle and Stakeholders for ${item.name}`)
                return;
            }
        }
        let fd = new FormData;
        fd.append("ProjectId",data.ProjectId);
        fd.append("ProjectVersionId",data.ProjectVersionId);
        fd.append("EpicId",data.EpicId);
        fd.append("EpicVersionId",data.EpicVersionId);
        let dataBody = this.state.data.map(item=>{
            let Goals = item.goals.map(goal=>{
                return {
                    Id : goal.Id,
                    Text : goal.Text
                }
            })
            let PainPoints = item.painpoints.map(pp=>{
                return {
                    Id : pp.Id,
                    Text : pp.Text
                }
            })
            let Motivations = item.motivations.map((mot)=>{
                return {
                    MotivationId : mot.id,
                    MotivationText: mot.name ,
                    Value : mot.value
                }
            })
            let Personality = item.personality.map((pers) => {

                
                return {
                    PersonalityId : pers.id,
                    PersonalityText:pers.name1 ,
                    PersonalityText1:pers.name2 ,
                    Value : pers.value
                }
            })
            return {
                PersonaId : item.id,
                PersonaName : item.name,
                FilePath : "",
                Bio : item.bio,
                Summary : item.summary,
                Age : item.personalInfo.Age,
                Occupation : item.personalInfo.Occupation,
                Family : item.personalInfo.Family,
                Location : item.personalInfo.Location,
                Archetype : item.personalInfo.Archetype,
                LifeCycleId : this.state.selectedLifeCycleId,
                Goals,
                PainPoints,
                Motivations,
                Personality,
                Links : item.Links,
                File : item.img
            }
        })
        console.log("pers=>", dataBody)
        this.createFormData(fd,"Persona",dataBody);
        this.props.savePersonaDetails(fd);
    }

    deletePersonaHandler = (persona, personaInd) => {
        confirmAlert({
            title: 'Confirm to continue',
            message: 'Are you sure to delete this Persona ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        if(Number(persona.id) > 0){
                            this.props.deletePersona(this.props.ProjectId, this.props.ProjectVersionId, this.props.EpicId, this.props.EpicVersionId,persona.id)
                        }else{
                            let personas = [...this.state.data];
                            personas.splice(personaInd,1);
                            this.setState({
                                data : personas
                            })
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }

    duplicatePersonaHandler = (persona) => {
        let newPersona = _.cloneDeep(persona);
        let allPersona = [...this.state.data];
        newPersona.id = 0;
        for(let i in newPersona.goals){
            newPersona.goals[i].Id = 0;
        }
        for(let j in newPersona.painpoints){
            newPersona.painpoints[j].Id = 0;
        }
        allPersona.push(newPersona);
        this.setState({
            data : allPersona
        })
    }

    lifecycleChangeHandler = (id) => {
        let per = {...this.state.currentSelectedPersona};
        per.LifeCycleId = id;
        this.setState({
            selectedLifeCycleId: id,
            currentSelectedPersona : per
        })
    }

    linkedStakeholdersChangeHandler = (e, StakeholderId, selectAll) =>{
        let per = {...this.state.currentSelectedPersona};
        if(e.target.checked == true){
            if(selectAll == true){
                per.Links = [];
                for(let stakeholder of this.props.StkHolderForLinkEmpathyMap){
                    per.Links.push({
                        StakeholderId : stakeholder.stakeholderId
                    })
                }
            }else{
                if(!per.Links.map(stk=>stk.StakeholderId).includes(StakeholderId)){
                    per.Links.push({
                        StakeholderId : StakeholderId
                    })
                }
            }
        }else{
            if(selectAll == true){
                per.Links = [];
            }else{
                let ind = per.Links.map(stk=>stk.StakeholderId).indexOf(StakeholderId)
                if(ind != -1){
                    per.Links.splice(ind,1)
                }
            }
        }
        this.setState({
            currentSelectedPersona : per
        })
    }
    createcjm = (id) => {
        this.props.createCjm(id)
        this.setState({showCreateBtn: false, showViewBtn: true})
        // this.props.getAllPersona(this.props.ProjectId, this.props.ProjectVersionId, this.props.EpicId, this.props.EpicVersionId);
    }

    render(){


        // console.log("Persona Props ==>", this.props)
        this.props.StkDescOnEmpathyMap.length = 4

        const { data } = this.state;

            console.log(this.state)
        const Linkedstakeholders =  Object.keys(this.state.currentSelectedPersona).length > 0 ? this.state.currentSelectedPersona.Links.map(link=>link.StakeholderId) : []
        return(
        <>
            {/* <!-- Start Body Content --> */}
            <div className="row">
                <div className="tab-content dt-tab-content w-100">
                    <div className="tab-pane fade show active" id="empathymap">
                        <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 pr-lg-0">
                                <div className="interview-left empathymap-left d-flex">
                                    <div className="empathymap-tab">
                                        <ul className="nav">
                                        {
                                            this.props.selectedStakeholdersForInterview.map((item,i) => (
                                                
                                                // item.image == null ?
                                                <li className="nav-item  active">
                                                    <a className="nav-link" href="#" onClick={() => this.props.doToggleStackHolders(item.StakeholderId,item.StakeHolderName)}>
                                                    {
                                                        item.StakeHolderName.split(" ").map(word => word[0]).slice(0, 2).join("").toUpperCase()
                                                    }
                                                    </a>
                                                </li>
                                                // :
                                                // <li className="nav-item">
                                                //     <a className="nav-link active" href="#" onClick={() => props.doToggleStackHolders(item.StakeholderId)} ><img src={(item.Image != null && item.image!="")?config.ApiBaseUrl+"StakeHoldersImages/"+item.Image:require('../../common/images/LogIn_image.png')} alt=""/></a>
                                                // </li>
                                            ))
                                        }
                                        </ul>
                                    </div>
                                    <div className="empathymap-content">
                                        <h2>{this.props.SelectedStkName}</h2>
                                        <div>
                                            {
                                                this.props.StkDescOnEmpathyMap.map((item,i) => (
                                                    <>
                                                    <h6>{item.SectionCategoryTitle}</h6>
                                                    <ContentEditable
                                                        html={item.SectionDescription }
                                                        disabled={true}
                                                        // onDragStart={(e) => props.dragSelectedText(e)} onMouseUp={props.selectedText}
                                                        tagName='p'
                                                    />
                                                    </>
                                                ))
                                            }
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 interview-user-info-sec pb-4 pl-4 pr-5">
                                <div className="interview-heading d-flex justify-content-between py-3">
                                    <h2>Personas</h2>
                                    <div>
                                        <a href="#"><i className="fas fa-cloud-download-alt"></i> Download</a>
                                        <a className="ml-3"><i className="fas fa-plus" onClick={()=>this.addNewPersona()}></i></a>
                                    </div>
                                </div>
                                {
                                    data.length > 0 ?
                                    data.map((item, personaInd) => ( 
                                        <div key={'persona_'+personaInd}>  
                                        <div className="interview-heading border-0 d-md-flex justify-content-between">
                                    <div className="dropdown version-drop pt-2">
                                        <a className="btn-drop dropdown-toggle"
                                            data-toggle="dropdown">
                                            1.1 <ContentEditable
                                                html={item.name} // innerHTML of the editable div
                                                disabled={false}       // use true to disable editing
                                                onChange={(event) => this.nameChangeHandler(event,personaInd)} // handle innerHTML change
                                                tagName='span' // Use a custom HTML tag (uses a div by default)
                                            />
                                        </a>
                                        <div className="dropdown-menu">
                                            <div className="version-style">
                                                <p
                                                    className="d-flex date-txt justify-content-between">
                                                    <span className="fontbold">1.3 Persona 1
                                                    </span><span
                                                        className="text-success">Active</span>
                                                    <span className="date">06/03/20</span></p>
                                                <p
                                                    className="d-flex revised-txt justify-content-between">
                                                    <span>Revised by: Dave Denis</span>
                                                    <span className="selected">Selected</span>
                                                </p>
                                            </div>
                                            <div className="version-style">
                                                <p
                                                    className="d-flex date-txt justify-content-between">
                                                    <span className="fontbold">1.2 Persona 2
                                                        1</span> <span
                                                        className="date">06/03/20</span></p>
                                                <p
                                                    className="d-flex revised-txt justify-content-between">
                                                    <span>Revised by: James Denis</span>
                                                </p>
                                            </div>
                                            <div className="version-style">
                                                <p
                                                    className="d-flex date-txt justify-content-between">
                                                    <span className="fontbold">1.3 Persona 1
                                                    </span> <span
                                                        className="date">06/03/20</span></p>
                                                <p
                                                    className="d-flex revised-txt justify-content-between">
                                                    <span>Revised by: Steve</span> </p>
                                            </div>

                                        </div>
                                        <a href="#" className="ml-2"><i className="fas fa-plus"></i>
                                            Add a version</a>
                                    </div>
                                    <div className="pt-3">
                                        <a href="#" data-toggle="modal" data-target="#linkedstakeholderModal" onClick={()=>this.setState({currentSelectedPersona : _.cloneDeep(item), currentSelectedPersonaInd : personaInd})}>Persona Links</a> |
                                        <a onClick={()=>this.duplicatePersonaHandler(item)}> Duplicate</a> |
                                        <a className="mx-1" onClick={()=>this.deletePersonaHandler(item,personaInd)}>Delete</a>
                                        <a className="ml-1"><img src="imgs/save-icon.PNG" alt=""/></a>
                                    </div>
                                </div>                                 
                                <div className="persona-content-container mt-4">                                    
                                <div className="row" key={personaInd}>
                                    <div className="col-sm-12 col-md-6 col-lg-4">
                                        <div className="add-photo-box">
                                            <img className="mr-3 img-fluid" src={item.img != null ? typeof item.img == 'object' ? URL.createObjectURL(item.img) : item.img : ""} alt=""/>
                                            <div className="upload-btn-wrapper">
                                                <button className="btn">Add Photo</button>
                                                <input type="file" name="myfile" onChange={(e) => this.handleImage(e,personaInd)} />
                                            </div>
                                        </div>
                                        <div className="description-box">
                                            <ContentEditable
                                                html={item.summary} // innerHTML of the editable div
                                                disabled={false}       // use true to disable editing
                                                onChange={(event) => this.handleSummary(event,personaInd)} // handle innerHTML change
                                                tagName='p' // Use a custom HTML tag (uses a div by default)
                                            />
                                            {/* <p>“{item.summary}”</p> */}
                                        </div>
                                            <div className="user-info-box">
                                                {
                                                Object.entries(item.personalInfo).map(([key, value]) => (
                                                    <Fragment>
                                                        <p>{key} :  
                                                        <ContentEditable
                                                            html={value} // innerHTML of the editable div
                                                            disabled={false}       // use true to disable editing
                                                            onChange={(event) => this.handlePersonalInfo(event,personaInd,key,personaInd)} // handle innerHTML change
                                                            tagName='span' // Use a custom HTML tag (uses a div by default)
                                                        />
                                                        </p>
                                                    </Fragment>    
                                                ))
                                                }
                                            </div>                                          
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4">
                                        <div className="bio-info-box">
                                            <h3>Bio</h3>
                                            <ContentEditable
                                                html={item.bio} // innerHTML of the editable div
                                                disabled={false}       // use true to disable editing
                                                onChange={(event) => this.handleBio(event,personaInd)} // handle innerHTML change
                                                tagName='p' // Use a custom HTML tag (uses a div by default)
                                            />
                                        </div>
                                        <div className="goal-interest-box mt-4">
                                            <h3>Goals · Interest</h3>
                                            {
                                                item.goals.map((goal,i) => (
                                                    <ul className="goalsLists">
                                                        <ContentEditable
                                                            html={goal.Text} // innerHTML of the editable div
                                                            disabled={false}       // use true to disable editing
                                                            onChange={(event) => this.handleGoal(event,i,personaInd)} // handle innerHTML change
                                                            tagName='div' // Use a custom HTML tag (uses a div by default)
                                                        />
                                                    </ul>
                                                ))
                                            }
                                            
                                        </div>
                                        <div className="goal-interest-box mt-4">
                                            <h3>Pain Points · Concerns</h3>
                                            {
                                                item.painpoints.map((painpoint,i) => (
                                                    <ul className="painPointsLists">
                                                        <ContentEditable
                                                            html={painpoint.Text} // innerHTML of the editable div
                                                            disabled={false}       // use true to disable editing
                                                            onChange={(event) => this.handlePainPoints(event,i,personaInd)} // handle innerHTML change
                                                            tagName='div' // Use a custom HTML tag (uses a div by default)
                                                        />
                                                    </ul>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-lg-4">
                                        <div className="motivation-box">
                                        <h3>Motivations</h3>
                                        {
                                            item.motivations.map((motivation,i) => (
                                                <Fragment>
                                                    <div className="motivation-row mb-3">
                                                        <ContentEditable
                                                            html={motivation.name } // innerHTML of the editable div
                                                            disabled={false}       // use true to disable editing
                                                            onChange={(event) => this.updateMotivationName(event,i,personaInd)} // handle innerHTML change
                                                            tagName='h4' // Use a custom HTML tag (uses a div by default)
                                                        />
                                                        <div className="motivation-bar">
                                                            <Slider
                                                                value={motivation.value}
                                                                orientation="horizontal"
                                                                onChange={(e) => this.handleProgressBar(i,e,personaInd)}
                                                            />
                                                            {/* <div className="blue-bar" style={{ width: `${motivation.value}%` }}></div> */}
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            ))
                                        }
                                    </div>
                                        <div className="motivation-box personality-box mt-5">
                                        <h3>Personality</h3>
                                        {
                                            item.personality.map((personality,i) => (
                                                <Fragment>
                                                    <div className="motivation-row mb-3">
                                                        <h4 className="d-flex justify-content-between">
                                                            
                                                            <ContentEditable
                                                                html={personality.name1 } 
                                                                disabled={false}       
                                                                onChange={(event) => this.handlePersonalityName1(event,i,personaInd)} // handle innerHTML change
                                                                tagName='span' 
                                                            />
                                                            
                                                            <ContentEditable
                                                                html={personality.name2 } 
                                                                disabled={false}       
                                                                onChange={(event) => this.handlePersonalityName2(event,i,personaInd)} // handle innerHTML change
                                                                tagName='span' 
                                                            />
                                                        </h4>
                                                        <div className="motivation-bar">
                                                            <input type="range" className="slider" min="1" max="100" value={personality.value} onChange={(e) => this.handleRangeSlider(e,i,personaInd)} />
                                                            {/* <div className="blue-bar" style={{width: '21px', left: '30%'}}></div> */}
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            ))
                                        }
                                        


                                    </div>
                                    </div>
                                </div>
                                    <div className="row text-center journey-btn mt-4">
                                    <div className="col-md-12">
                                        {
                                            item.CustomerJourneyMapId == 0 ? 
                                            <button 
                                                onClick={() => this.createcjm(item.id)}
                                                className="btn btn-primary m-auto"
                                                >
                                                    Create Customer Journey Map
                                            </button>
                                            : 
                                            null
                                        }
                                        {
                                            item.CustomerJourneyMapId > 0?
                                            <Link 
                                                to={`/customer-journey-map/${this.props.ProjectId}/${this.props.EpicId}/${item.id}/${item.CustomerJourneyMapId}`}
                                                onClick={() => this.props.viewCjm(item.id)}
                                                className="btn btn-primary m-auto"
                                                >
                                                    View Customer Journey Map
                                            </Link>
                                            :null
                                        }                                        

                                        {/* {item.id > 0 ? <NavLink to="/customer-journey-map" className="btn btn-primary m-auto">Create Customer Journey Map</NavLink> : null} */}
                                    </div>
                                </div>

                            </div>
                            </div>
                                    ))
                                    :
                                    null
                                }
                                    

                            </div>
                        </div>
                    </div>

                </div>
            </div>           
              {/* <!-- End Body Content --> */}

              {/* <!--Link Stakeholders to Persona Modal --> */}
            <div className="modal personamodal" id="linkedstakeholderModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered"  role="document">
                    <div className="modal-content">
                        <div className="modal-header border-0 p-4">
                            <h5 className="modal-title">Link Persona</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body px-4 pt-0 pb-4">
                            <div className="row">
                                <div className="col-sm-6">
                                    <h3>
                                        <span>Stakeholders</span>                           
                                        <div className="custom-control custom-checkbox mb-1 float-right">
                                            <input type="checkbox" className="custom-control-input" id="selectall" onClick={(e)=>this.linkedStakeholdersChangeHandler(e, 0, true)} />
                                            <label className="custom-control-label pt-1" htmlFor="selectall">Select All</label>
                                        </div>
                                    </h3>
                                    <div className="card p-3 w-100">
                                        {this.props.StkHolderForLinkEmpathyMap.map(stk=>{
                                            return(<div className="custom-control custom-checkbox mb-1" key={`stake_link_${stk.stakeholderId}`}>
                                                <input type="checkbox" className="custom-control-input" id={`stake_link_${stk.stakeholderId}`} checked={Object.keys(this.state.currentSelectedPersona).length > 0 ? Linkedstakeholders.includes(stk.stakeholderId) : false} onClick={(e)=>this.linkedStakeholdersChangeHandler(e, stk.stakeholderId, false)}/>
                                                <label className="custom-control-label" htmlFor={`stake_link_${stk.stakeholderId}`}>{stk.name}</label>
                                            </div>)
                                        })}
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <h3>
                                        <span>Lifecycle</span>                           
                                        {/* <!-- <div className="custom-control custom-checkbox mb-1 float-right">
                                            <input type="checkbox" className="custom-control-input" id="selectall">
                                            <label className="custom-control-label pt-1" htmlFor="selectall">Select All</label>
                                        </div> --> */}
                                    </h3>
                                    <div className="card p-3 w-100">
                                        {this.props.allLifeCycle.map(lifecycle=>{
                                            return(
                                                <div className="custom-control custom-checkbox mb-1" key={`lifecycle_${lifecycle.EpicLifeCycleId}`}>
                                                    <input type="checkbox" className="custom-control-input" name="lifecycle" checked={Object.keys(this.state.currentSelectedPersona).length > 0 ? this.state.currentSelectedPersona.LifeCycleId == lifecycle.EpicLifeCycleId ? true : false : false} id={`lifecycle_${lifecycle.EpicLifeCycleId}`} onChange={()=>this.lifecycleChangeHandler(lifecycle.EpicLifeCycleId)} />
                                                    <label className="custom-control-label" htmlFor={`lifecycle_${lifecycle.EpicLifeCycleId}`}>{lifecycle.LifeCycleName}</label>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer border-0 px-4 pt-0 pb-4">
                            <a className="text-primary" data-dismiss="modal">Cancel</a>
                            <button type="button" data-dismiss="modal" className="btn btn-primary ml-3" onClick={()=>{
                                let allPersona = [...this.state.data];
                                allPersona[this.state.currentSelectedPersonaInd] = _.cloneDeep(this.state.currentSelectedPersona)
                                this.setState({data : allPersona})
                            }} >Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )};
} 

const mapStateToProps = (state) => ({
    allPersona : state.persona.allPersona,
    allLifeCycle : state.persona.allLifeCycle,
    allStakeholdersForPersona : state.persona.allStakeholdersForPersona,
    allMotivationCategories : state.persona.allMotivationCategories,
    allPersonalityCategories : state.persona.allPersonalityCategories
})

export default connect(mapStateToProps, { savePersonaDetails, getAllPersona, getAllStakeholdersForPersona, getAllLifecycleForPersona, getAllMotivationCategories, getAllPersonalityCategories, deletePersona }, null, { forwardRef : true })(EmpathyPersonasBodyDetail);