import React, { Component, Fragment } from "react";
import _ from "lodash";
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import ContentEditable from "react-contenteditable";
import CJMScreenBreadcrumb from "./CJMScreenBreadcrumb";
import { CustomerJourneyMapScreenWrapper } from "./Styling/CustomerJourneyMapScreen";
import CJMScreenTopbar from "./CJMScreenTopbar";
import CJMScreenLeftSidebar from "./CJMScreenLeftSidebar";
import CJMScreenBodyDetail from "./CJMScreenBodyDetail";
import { fstat } from "fs";
import { connect } from "react-redux";
import {
    fetchBenchmarkProjectsWithDomains,
    fetchDecompositionProjects,
    fetchKpisControls,
    fetchDesignThinkingStakeHolders,
    fetchDecompositionProjectsFunctionPhaseLevel,
    fetchDesignThinkingProjectDetails,
    fetchAllEpic
} from "../../actions/epicScreenActions";

import {
    fetchEmpathyNotesStkDesc,
    deleteEmpathyNotesStakeHolders
} from "../../actions/empathyScreenActions";
import {  getAllPersona} from '../../actions/personaActions';
import { fetchCustomerJourneyMap } from "../../actions/cjmActions";
import { responseMessage } from "../../utils/alert";
import { Global } from "../../utils/Env";
import axios from "axios";
import { declareModule } from "@babel/types";
const config = require("../../config");

class EmpathyCustomerJourneyMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapId: "",
            epicLifecycleId: "",
            selectedPersona:this.props.match.params.personaId,
            mapName: "",
            mapGoal: "Enter Some Text",
            selectedEpicId:this.props.match.params.epicId? this.props.match.params.epicId: 0,
            mapDesc: "Enter Some Text",
            searchTerm: "",
            ptype: "",
            filterVal: "",
            options: {},
            showNoOfForms: 0,
            selectedStage: null,
            selectedSubstage: null,
            decompProjectId: "",
            cjmId: this.props.match.params.cjmId,
            personaId: this.props.match.params.personaId,
            dtId: this.props.match.params.dtId
                ? this.props.match.params.dtId
                : 0,
            epicId: this.props.match.params.epicId
                ? this.props.match.params.epicId
                : 0,
            decompositionchildData: [],
            dragValue: {},
            personaName: "",
            currentSubStage: {},
            curretDataInPopup:[],
            currentStageInd: "",
            currentSubStageInd: "",
            personaImage: "",
            versionHistoryNo: 0,
            personaData:[],
            updatedSomething: "",
            personaDesc: "",
            FilterStackHolderLeftSidebar: [],
            selectedEmoji: "",
            StagesCategories: [],
            Stages: [],
            showClass: false,
            currentData: {
                title: "",
                comment: "",
                emoji: "",
                catTextInd: "",
                catInd: "",
                subStageInd: "",
                processId: ""
            },
            FeelingsStageInfo: {
                StageIndex: null,
                StageId: null,
                StageName: null,
                SubStageIndex: null,
                SubStageId: null,
                SubStageName: null,
                substages: [],
                Activities: [],
                Activity: null
            },
            selectedTypeForEmotion: null
        };
        Global.callback.fetchDecompositionProjectsFunctionPhaseLevel_onComplete = res => {
            this.getDecomProject(res);
        };
        Global.callback.fetchCustomerJourneyMap_onComplete = res => {
            this.fetchCustomerJourneyMapCallback(res);
        };
        Global.callback.getAllPersona_onComplete = (res) => {
            this.getAllPersonaCallback(res);        
        }
    }
    getAllPersonaCallback = (res) => {
        const personaData = res.data.Persona?res.data.Persona.map(d => {
            return {
                PersonaId: d.PersonaId,
                PersonaName: d.PersonaName,
                CustomerJourneyMapId: d.CustomerJourneyMapId
            }
        }):[]
        this.setState({personaData: personaData},()=>{
            // const aa = this.state.personaData.filter(d => d.PersonaId == this.state.personaId)
            // console.log("abcdefghijklmnopqrstuvwxyz",aa[0].PersonaId)
            // this.setState({selectedPersona: aa[0].PersonaId})
        })
    }
    fetchCustomerJourneyMapCallback = res => {
        if (res) {
            const isFeelingAvail = res.data.Stages[0].SubStages[0].Categories.some(d => d.CategoryName === "Feelings");
            if (isFeelingAvail) {
                this.setState({
                    mapId: res.data.MapId,
                    epicLifecycleId: res.data.EpicLifeCycleId,
                    personaId: res.data.PersonaId,
                    mapName: res.data.MapName,
                    mapGoal: res.data.MapGoal,
                    mapDesc: res.data.MapDescription,
                    personaName: res.data.PersonaName,
                    personaImage: res.data.FilePath,
                    personaDesc: res.data.PersonaDescription
                });
                this.setState({ Stages: res.data.Stages });
            } else {
                const upcomingData = res.data.Stages;

                const experience = {
                    CategoryLookUpId: 0,
                    CategoryName: "Experiences",
                    CategoryText: [
                        {
                            Text: "Enter some text 1",
                            SequenceNumber: 1,
                            ColorCode: "none"
                        }
                    ]
                }
                const feelings = {
                    CategoryLookUpId: 0,
                    CategoryName: "Feelings",
                    ShowEmojis: false,
                    CategoryText: [
                        {
                            Id: 0,
                            ProcessId: 0,
                            Comment: "",
                            Emotion: "",
                            SequenceNumber: 1,
                            Value: "Enter some text 1"
                        }
                    ]
                }

                const removeNull = upcomingData.filter(d => d.StageName !== null )
       
                // const combineData = upcomingData.map((item, i) => {
                const combineData = removeNull.map((item, i) => {
                    return {
                        ...item,
                        SubStages: item.SubStages.map((item1, i1) => {
                            return {
                                ...item1,
                                Categories: [
                                    ...item1.Categories,
                                    _.cloneDeep(experience),
                                    _.cloneDeep(feelings)
                                ]
                            };
                        })
                    };
                });
                

                // const updateFeelingsData = removeNull.map((item, i) => {
                const updateFeelingsData = combineData.map((item, i) => {
                    return {
                        ...item,
                        SubStages: item.SubStages.map((item1, i1) => {
                            return {
                                ...item1,
                                Categories: item1.Categories.map(
                                    (item2, i2) => {
                                        if (item2.CategoryName == "Feelings") {
                                            return {
                                                CategoryLookUpId: 0,
                                                CategoryName: "Feelings",
                                                ShowEmojis: false,
                                                CategoryText: item1.Categories.filter(d =>d.CategoryName =="Activities")[0].CategoryText.map((a, b) => {
                                                        return {
                                                            Id: 0,
                                                            ProcessId: a.Id,
                                                            Comment: "",
                                                            Emotion: "",
                                                            SequenceNumber: `${b +1}`,
                                                            Value: a.Text
                                                        };
                                                    }
                                                )
                                            };
                                        }
                                        return item2;
                                    }
                                )
                            };
                        })
                    };
                });
                this.setState({ Stages: updateFeelingsData });
            }
        }
    };
  
    static getDerivedStateFromProps(nextProps, prevState) {
       

        return {
            mapId: nextProps.cjmData.MapId,
            epicLifecycleId: nextProps.cjmData.EpicLifeCycleId,
            // personaId: nextProps.cjmData.PersonaId,
            mapName: nextProps.cjmData.MapName,
            // mapGoal: nextProps.cjmData.MapGoal,
            // mapDesc: nextProps.cjmData.MapDescription,
            personaName: nextProps.cjmData.PersonaName,
            personaImage: nextProps.cjmData.FilePath,
            personaDesc: nextProps.cjmData.PersonaDescription
        };

    }

    componentDidMount() {
        this.onMountandUpdate()   
    }

    onMountandUpdate = () => {
        this.setState({selectedPersona: this.state.personaId})
        this.props.getAllPersona(this.state.dtId,0,this.state.epicId,0);
        this.props.fetchAllEpic(this.props.match.params.dtId,this.state.versionHistoryNo);
        
        this.props.fetchCustomerJourneyMap(
            this.state.cjmId,
            this.state.epicId,
            this.state.personaId
        );
        this.props.fetchBenchmarkProjectsWithDomains();
        this.props.fetchDecompositionProjects();
        this.props.fetchKpisControls();
        this.props.fetchDesignThinkingStakeHolders();
        this.props.fetchDesignThinkingProjectDetails(
            this.state.dtId,
            this.state.versionHistoryNo
        );

        axios.get(config.laravelBaseUrl+'getEmpathyLifeCycleCategory', {
            headers: {
                "authorization": "Bearer " + sessionStorage.getItem("userToken")
            }
        }).then((response) => {


            const UpdateStagesCategories = response.data.data.map((d,i) => {
                if(d.CategoryName == "Feelings"){
                    return {
                        CategoryLookUpId : d.CategoryLookUpId,
                        CategoryName: d.CategoryName,
                        SequenceNumber: i+1,
                        ShowEmojis: false,
                        CategoryText: [
                                {
                                    Id: 0,
                                    ProcessId: 0,
                                    Comment: "",
                                    Emotion: "",
                                    SequenceNumber: "1",
                                    Value: "Enter Some Text 1"
                                }
                            ]
                    }
                } else {
                    return {
                        CategoryLookUpId : d.CategoryLookUpId,
                        CategoryName: d.CategoryName,
                        SequenceNumber: i+1,
                        CategoryText: d.CategoryName == "Impactor" || d.CategoryName == "Impactee" ? 
                            [] 
                            :
                            [
                                {SequenceNumber:1,Text: "Enter some text 1"}
                            ] 
                    }
                }
                 
            })


            console.log("Update Cat =>", UpdateStagesCategories)
            const removeDuplicates = (array, key) => {
                return array.reduce((arr, item) => {
                  const removed = arr.filter(i => i[key] !== item[key]);
                  console.log(removed)
                  return [...removed, item];
                }, []);
              };
              

              const duplicate = removeDuplicates(UpdateStagesCategories, 'CategoryName')

            

             this.setState({StagesCategories: duplicate})
        })
    }
    
    toggleClass = () => {
        if (this.state.showClass) {
            this.setState({ showClass: false });
        } else {
            this.setState({ showClass: true });
        }
    };
    closePanel = () => {
        this.setState({ showClass: false });
    };
    getDecomProject(res) {
        let jsonObj = {
            projectId: this.state.decompProjectId,
            data: res.data
        };
        this.setState({ decompositionchildData: jsonObj });
    }
    filterProject(e, type) {
        this.setState({ filterVal: e.target.value, ptype: type });
    }
    searchStakeholdersLeftSidebar = e => {
        const text = e.target.value;
        const regex = new RegExp(text, "i");
        let data = this.props.StackHolder.filter(word =>
            regex.test(word.StakeHolderName)
        );
        this.setState({ FilterStackHolderLeftSidebar: data });
    };
    addDrag(e, item) {
        e.stopPropagation();
        const i = JSON.stringify(item);
        e.dataTransfer.setData("draggedText", i);
    }
    handleComment = (e) => {
        this.setState({
            currentData: { ...this.state.currentData, comment: e.target.value }
        });
    };

    testOnChangeFunction = () => {
        console.log('Testing');
    }

    handleCommentByDrop = (value) => {
        this.setState({
            currentData: { ...this.state.currentData, comment: value }
        });
    };
    handleEmoji = (colorCode, e) => {
       
        this.setState({ currentData: { ...this.state.currentData, emoji: e } });
        if (this.state.currentData.title !== "") {
            const updateActivitiesColor = {...this.state.currentSubStage}
            
            const newData = this.state.currentData;
            const index = updateActivitiesColor.Categories.findIndex(d => d.CategoryName == "Activities");
            // if (typeof updateActivitiesColor.Categories[index].CategoryText[newData.catTextInd] == 'undefined') {
            //     updateActivitiesColor.Categories[index].CategoryText[newData.catTextInd] = {
            //         ColorCode: null
            //     }
            // }
            // updateActivitiesColor.Categories[index].CategoryText[newData.catTextInd].ColorCode = colorCode;

            // this.setState({ currentSubStage: updateActivitiesColor });
        } else {
            alert("Select Stage First");
        }
    };
    handleListValues = (option,e,catTextInd,catInd) => {
        const updateVales = {...this.state.currentSubStage};
        if (catTextInd === null) {
            catTextInd = updateVales.Categories[catInd].CategoryText.length;
        }
        this.setState(
            {
                currentData: {
                    ...this.state.currentData,
                    title: e,
                    catTextInd: catTextInd,
                    catInd: catInd
                }
            }
        );
    };
    showEmojiSection = index => {
        const a = [...this.state.Stages];
    };
    deleteEmotion = (info) => {
        let allStages = this.state.Stages;
        let StagesIndex = info.StagesIndex;
        let SubStagesIndex = info.SubStagesIndex;
        let CategoriesIndex = info.CategoriesIndex;
        let CategoryTextIndex = info.CategoryTextIndex;
        let CategoryTextData = allStages[StagesIndex]['SubStages'][SubStagesIndex]['Categories'][CategoriesIndex]['CategoryText'];
        CategoryTextData.splice(CategoryTextIndex, 1);
        allStages[StagesIndex]['SubStages'][SubStagesIndex]['Categories'][CategoriesIndex]['CategoryText'] = CategoryTextData;

        this.setState({
            Stages: allStages
        });
    };

    selectedStageInfo = (index) => {
        let substages = [];
        let activities = [];
        if (this.state.Stages[index].SubStages != undefined) {
            substages = this.state.Stages[index].SubStages;
        }
        this.setState({
            FeelingsStageInfo: {
                StageIndex: index,
                StageId: this.state.Stages[index].StageId,
                StageName: this.state.Stages[index].StageName,
                SubStageIndex: null,
                SubStageId: null,
                SubStageName: null,
                substages: substages,
                Text: null,
                Activities: activities,
                Activity: null
            }
        });
    };

    selectedSubStageInfo = (index) => {
        // let info = this.state.FeelingsStageInfo;
        // let SubStage = this.state.Stages[info.StageIndex].SubStages[index];
        // let ActivitiesIndex = SubStage.Categories.findIndex(d => d.CategoryName == "Activities");
        // let activities = SubStage.Categories[ActivitiesIndex].CategoryText;

        // this.setState({
        //     FeelingsStageInfo: {
        //         ...info,
        //         SubStageIndex: index,
        //         SubStageId: SubStage.StageId,
        //         SubStageName: SubStage.SubStageName,
        //         Activities: activities
        //     }
        // });
    };

    selectedSubStageActivityInfo = (actindex) => {
        let info = this.state.FeelingsStageInfo;
        let activity = info['Activities'][actindex];
        this.setState({
            FeelingsStageInfo: {
                ...info,
                Activity: activity
            }
        });
    };

    selectedOptionInDropdown = (type) => {
        this.setState({
            selectedTypeForEmotion: type
        });
    };

    setCurrentActivityIndex = (stageIndex, subStageIndex, activityIndex) => {
        this.setState({
            currentActivityIndex: activityIndex
        });
    };

    setStageAndSubStage = (stage, substage, substageIndex) => {

        let info = this.state.FeelingsStageInfo;
        // let SubStage = this.state.Stages[info.StageIndex].SubStages[index];
        let SubStage = substage;
        let ActivitiesIndex = SubStage.Categories.findIndex(d => d.CategoryName == "Activities");
        let activities = SubStage.Categories[ActivitiesIndex].CategoryText;

        this.setState({
            FeelingsStageInfo: {
                ...info,
                SubStageIndex: substageIndex,
                SubStageId: SubStage.StageId,
                SubStageName: SubStage.SubStageName,
                Activities: activities,
                substages: [substage]
            }
        });
    };

    handleSave = () => {
        const updateVales = {...this.state.currentSubStage};
        const newData = this.state.currentData;
        // return;
        // newData.title != "" && 
        if (newData.comment && newData.emoji != "") {

            // if (updateVales.Categories[newData.catInd].CategoryText.length == 3) {
            //     alert('You can add maximum 3 emotions!');
            //     return false;
            // }

            if (typeof updateVales.Categories[newData.catInd] != 'undefined' && typeof updateVales.Categories[newData.catInd].CategoryText[newData.catTextInd] == 'undefined') {
                updateVales.Categories[newData.catInd].CategoryText[newData.catTextInd] = {
                    Comment: null,
                    CommentPlainText: null,
                    Emotion: null,
                    HasFeelings: null,
                    ProcessId: null,
                    ProcessName: null,
                    AppliedFor: null,
                    AppliedForID: null,
                    title: null
                }
            }

            let info = this.state.FeelingsStageInfo;
            let selectedTypeForEmotion = this.state.selectedTypeForEmotion;
            let emotion_type_id = null;
            let emotion_type_name = null;
            let emotion_type = null;
            let process_id = null;
            let process_name = null;
            

            updateVales.Categories[newData.catInd].CategoryText[newData.catTextInd].Comment = newData.comment;
            updateVales.Categories[newData.catInd].CategoryText[newData.catTextInd].Emotion = newData.emoji;
            updateVales.Categories[newData.catInd].CategoryText[newData.catTextInd].CommentPlainText = null;
            updateVales.Categories[newData.catInd].CategoryText[newData.catTextInd].Id = "0";
            updateVales.Categories[newData.catInd].CategoryText[newData.catTextInd].HasFeelings = "1";

            if (selectedTypeForEmotion === 'stage') {
                emotion_type_id = info['StageId'];
                emotion_type_name = info['StageName'];
                emotion_type = 'Stage';
            }
            if (selectedTypeForEmotion === 'substage') {
                emotion_type_id = info['SubStageId'];
                emotion_type_name = info['SubStageName'];
                emotion_type = 'SubStage';
            }
            if (selectedTypeForEmotion === 'activity') {
                emotion_type_id = info['Activity']['Id'] || null;
                process_id = info['Activity']['Id'] || null;
                emotion_type_name = info['Activity']['Text'] || '';
                process_name = info['Activity']['Text'] || '';
                emotion_type = 'Process';
            }
            updateVales.Categories[newData.catInd].CategoryText[newData.catTextInd].ProcessId = process_id;
            updateVales.Categories[newData.catInd].CategoryText[newData.catTextInd].ProcessName = process_name;
            updateVales.Categories[newData.catInd].CategoryText[newData.catTextInd].AppliedFor = emotion_type;
            updateVales.Categories[newData.catInd].CategoryText[newData.catTextInd].AppliedForID = emotion_type_id;
            updateVales.Categories[newData.catInd].CategoryText[newData.catTextInd].title = emotion_type_name;

            updateVales.Categories[newData.catInd].ShowEmojis = true;
            
            this.setState({ showNoOfForms: 0 });
            
            this.setState({currentSubStage: updateVales},() => {
                const updateStages = [...this.state.Stages]
                updateStages[this.state.currentStageInd].SubStages[this.state.currentSubStageInd] = {...this.state.currentSubStage}
                this.setState({
                    currentStageInd: "",
                    currentSubStage: {},
                    currentSubStageInd:"",
                    curretDataInPopup:[],
                    currentData: {
                        ...this.state.currentData,
                        title: "",
                        comment: "",
                        emoji: "",
                        catTextInd: "",
                        catInd: "",
                        subStageInd: ""
                    },
                    FeelingsStageInfo: {
                        StageIndex: null,
                        StageId: null,
                        StageName: null,
                        SubStageIndex: null,
                        SubStageId: null,
                        SubStageName: null,
                        substages: [],
                        Activities: [],
                        Activity: null
                    }
                });
                console.log("Stages On save Pop up", this.state.Stages);
            });
        
        } else {
            alert("Please select a Stage, an emotion and add some comment");
            // updateVales[newData.stageInd].SubStages[newData.subStageInd].Categories[newData.catInd].ShowEmojis = false;
        }
    };
    addAnother = () => {
        const updateExpData = {...this.state.currentSubStage};
        const updateCurrDataForPopup = [...this.state.curretDataInPopup]

        const ind = updateExpData.Categories.findIndex(cat => cat.CategoryName == "Feelings");
        const d =updateExpData.Categories[ind].CategoryText.length;
        const newData = this.state.currentData;
        updateCurrDataForPopup.push(_.cloneDeep(newData))

        if (newData.title != "" && newData.comment && newData.emoji != "") {
            updateExpData.Categories[newData.catInd].CategoryText[newData.catTextInd].Comment = newData.comment;
            updateExpData.Categories[newData.catInd].CategoryText[newData.catTextInd].Emotion = newData.emoji;
            updateExpData.Categories[newData.catInd].ShowEmojis = true;
            this.setState({ showNoOfForms: 0 });
            this.setState({currentSubStage: updateExpData, curretDataInPopup: updateCurrDataForPopup},() => {
                this.setState({
                    currentData: {
                        ...this.state.currentData,
                        title: "",
                        comment: "",
                        emoji: "",
                        catTextInd: "",
                        catInd: ""
                    }
                });
            });

            if (this.state.showNoOfForms <= d) {
                this.setState({ showNoOfForms: this.state.showNoOfForms + 1 });
            }

        } else {
            alert("Please select a Stage, an emotion and add some comment");
            // updateExpData[newData.stageInd].SubStages[newData.subStageInd].Categories[newData.catInd].ShowEmojis = false;
        }
    };
    addStages = () => {
        const newStage = {
            StageId: "0",
            StageName: `stage ${this.state.Stages.length + 1}`,
            SubStages: []
        };
        this.setState({ Stages: [...this.state.Stages, newStage] });
    };
    selectStage = i => {
        this.setState({ selectedStage: i });
    };
    removeStages = () => {
        if (this.state.selectedStage !== null) {
            this.setState((prevState, props) => ({
                Stages: prevState.Stages.filter(
                    (item, i) => i !== prevState.selectedStage
                )
            }));
        } else {
            alert("Please Select a Stage First");
        }
    };
    addSubStages = () => {
        if (this.state.selectedStage !== null) {
            const data = [...this.state.Stages];
            const obj1 = data.map((item, i) => {
                if (i !== this.state.selectedStage) {
                    return item;
                }
                return {
                    ...item,
                    SubStages: [
                        ...item.SubStages,
                        {
                            SubStageId: 1,
                            RaiseFlag: true,
                            RaiseFlagText: "Enter Some Text 1",
                            SequenceNumber: 1,
                            SubStageName: `sub-stage ${item.SubStages.length +
                                1}`,
                            Categories: _.cloneDeep(this.state.StagesCategories)
                        }
                    ]
                };
            });
            const obj3 = this.state.Stages.filter(
                (item, i) => i == this.state.selectedStage
            );
            this.setState({ Stages: [...obj1] } , ()=>{
                console.log("Addsubstage =>",this.state)
            });
            // this.setState({Stages:[...obj1], selectedSubstage: obj3[0].SubStages})


                console.log("Addsubstage =>",obj3)


        } else {
            alert("Please select a stage.");
        }
    };
    selectSubstage = (substageInd, stageInd) => {
        this.setState({
            selectedSubstage: substageInd,
            selectedStage: stageInd
        });
    };
    removeSubStages = () => {
        if (this.state.selectedSubstage !== null) {
            const obj4 = this.state.Stages.map((item, i) =>
                this.state.selectedStage == i
                    ? {
                          ...item,
                          SubStages: item.SubStages.filter(
                              (item, i) => i !== this.state.selectedSubstage
                          )
                      }
                    : item
            );
            this.setState({ Stages: [...obj4], selectedSubstage: null });
        } else {
            alert("Please select a sub stage");
        }
    };
    handleKeyPress = (stgInd, subStgInd, catInd) => {
        const updateStages = [...this.state.Stages];
        const length = updateStages[stgInd].SubStages[subStgInd].Categories[catInd].CategoryText.length+1
        const newTextField = {
            Text: `Enter some text ${length}`,
            SequenceNumber: length,
            ColorCode: "none"
        };
        
        updateStages[stgInd].SubStages[subStgInd].Categories[catInd].CategoryText = 
        [...updateStages[stgInd].SubStages[subStgInd].Categories[catInd].CategoryText,newTextField];
        
        this.setState({ Stages: updateStages }, () => {
            const updateFeelings = [...this.state.Stages];
            
            const feelingIndex = updateFeelings[stgInd].SubStages[subStgInd].Categories.findIndex(d => d.CategoryName == "Feelings");

            const newProcess = {
                Id: 0,
                ProcessId: 0,
                Comment: "",
                Emotion: "",
                SequenceNumber: updateFeelings[stgInd].SubStages[subStgInd].Categories[feelingIndex].CategoryText.length+1,
                Value: newTextField.Text
            };
            updateFeelings[stgInd].SubStages[subStgInd].Categories[feelingIndex].CategoryText = 
            [...updateFeelings[stgInd].SubStages[subStgInd].Categories[feelingIndex].CategoryText,newProcess];
            
            this.setState({ Stages: updateFeelings });
        });
        
    };
    updateActivities = (e, stgInd, subStgInd, catInd, catTxtInd) => {
        const updateActivitiesText = [...this.state.Stages];
        updateActivitiesText[stgInd].SubStages[subStgInd].Categories[
            catInd
        ].CategoryText[catTxtInd].Text = e;
        this.setState({ Stages: updateActivitiesText }, () => {
            const updateFeelings = [...this.state.Stages];
            const feelingIndex = updateFeelings[stgInd].SubStages[
                subStgInd
            ].Categories.findIndex(d => d.CategoryName == "Feelings");

            const newProcess = {
                Id: 0,
                ProcessId: 0,
                Comment: "",
                Emotion: "",
                SequenceNumber: "1",
                Value: e
            };
            updateFeelings[stgInd].SubStages[subStgInd].Categories[
                feelingIndex
            ].CategoryText = [
                ...updateFeelings[stgInd].SubStages[subStgInd].Categories[
                    feelingIndex
                ].CategoryText,
                newProcess
            ];
            this.setState({ Stages: updateFeelings });
        });
    };
    updateRaiseFlag = (e, stgInd, subStgInd) => {
        const updateRaiseFlagText = [...this.state.Stages];
        updateRaiseFlagText[stgInd].SubStages[subStgInd].RaiseFlag = 1;
        updateRaiseFlagText[stgInd].SubStages[subStgInd].RaiseFlagText = e;
        // Categories[catInd].CategoryText[catTxtInd].Text
        this.setState({ Stages: updateRaiseFlagText });
    };
    updateTouchpoints = (e, stgInd, subStgInd, catInd, catTxtInd) => {
        const updateTouchpointsText = [...this.state.Stages];
        updateTouchpointsText[stgInd].SubStages[subStgInd].Categories[
            catInd
        ].CategoryText[catTxtInd].Text = e;
        this.setState({ Stages: updateTouchpointsText });
    };
    updatePainpoints = (e, stgInd, subStgInd, catInd, catTxtInd) => {
        const updatePainpointsText = [...this.state.Stages];
        updatePainpointsText[stgInd].SubStages[subStgInd].Categories[
            catInd
        ].CategoryText[catTxtInd].Text = e;
        this.setState({ Stages: updatePainpointsText });
    };
    updateOpportunities = (e, stgInd, subStgInd, catInd, catTxtInd) => {
        const updateOpportunitiesText = [...this.state.Stages];
        updateOpportunitiesText[stgInd].SubStages[subStgInd].Categories[
            catInd
        ].CategoryText[catTxtInd].Text = e;
        this.setState({ Stages: updateOpportunitiesText });
    };
    updateExperience = (e, stgInd, subStgInd, catInd, catTxtInd) => {
        const updateExperienceText = [...this.state.Stages];
        updateExperienceText[stgInd].SubStages[subStgInd].Categories[catInd].CategoryText[catTxtInd].Text = e;
        this.setState({ Stages: updateExperienceText });
    };
    updateStageName = (event, id) => {
        const updateStage = [...this.state.Stages];
        updateStage[id].StageName = event;
        this.setState({ Stages: updateStage });
    };
    updateSubStageName = (event, stageInd, substageInd) => {
        const updateSubStage = [...this.state.Stages];
        updateSubStage[stageInd].SubStages[substageInd].SubStageName = event;
        this.setState({ Stages: updateSubStage });
    };
    dragStakeholder = (e, item) => {
        const i = JSON.stringify(item);
        e.dataTransfer.setData("draggedStk", i);
    };
    dropStakeholderInimpactee = (e, stageInd, subStageInd) => {
        const dragImpactee = JSON.parse(e.dataTransfer.getData("draggedStk"));
        const data = [...this.state.Stages];
        
        const impacteeData = {
            Id: dragImpactee.StakeHolderId,
            ImagePath: dragImpactee.Image
        };
        const impacteeIndex = data[stageInd].SubStages[subStageInd].Categories.findIndex(item => item.CategoryName == "Impactee");
        
        const impactee = data[stageInd].SubStages[subStageInd].Categories[impacteeIndex].CategoryText

        if(impactee.length == 0){
            data[stageInd].SubStages[subStageInd].Categories[impacteeIndex].CategoryText = [...data[stageInd].SubStages[subStageInd].Categories[impacteeIndex].CategoryText, impacteeData] 
        } 
        else {
            const a = impactee.some(d => d.Id == impacteeData.Id)
            if(!a){
                data[stageInd].SubStages[subStageInd].Categories[impacteeIndex].CategoryText = [...data[stageInd].SubStages[subStageInd].Categories[impacteeIndex].CategoryText, impacteeData] 
            }
        }
        

        this.setState({ Stages: data }, () => {
            this.setState({ draggedStakeholder: {} });
        });
    };
    dropStakeholderImpactor = (e, stageInd, subStageInd) => {
        const dragImpactor = JSON.parse(e.dataTransfer.getData("draggedStk"));
        // const dragImpactor = {...this.state.draggedStakeholder}
        const data = [...this.state.Stages];
        const impactorData = {
            Id: dragImpactor.StakeHolderId,
            ImagePath: dragImpactor.Image
        };
        const impactorIndex = data[stageInd].SubStages[subStageInd].Categories.findIndex(item => item.CategoryName == "Impactor");
        
        let impactors = data[stageInd].SubStages[subStageInd].Categories[impactorIndex].CategoryText

        if(impactors.length == 0){
            data[stageInd].SubStages[subStageInd].Categories[impactorIndex].CategoryText = [...data[stageInd].SubStages[subStageInd].Categories[impactorIndex].CategoryText, impactorData] 
        } 
        else {
            const a = impactors.some(d => d.Id == impactorData.Id)
            if(!a){
                data[stageInd].SubStages[subStageInd].Categories[impactorIndex].CategoryText = [...data[stageInd].SubStages[subStageInd].Categories[impactorIndex].CategoryText, impactorData] 
            }
        }
        
        this.setState({ Stages: data });
       
    };
    dropActivities = (e, stageInd, subStageInd) => {
        const dragText = JSON.parse(e.dataTransfer.getData("draggedText"));
        const updateSectionText = [...this.state.Stages];
        const ActivitiesIndex = updateSectionText[stageInd].SubStages[subStageInd].Categories.findIndex(item => item.CategoryName == "Activities");
        const length = updateSectionText[stageInd].SubStages[subStageInd].Categories[ActivitiesIndex].CategoryText.length+1;

        const impactorData = {
            Text: dragText.name,
            SequenceNumber: length,
            ColorCode: "none"
        };

        updateSectionText[stageInd].SubStages[subStageInd].Categories[ActivitiesIndex].CategoryText = 
        [...updateSectionText[stageInd].SubStages[subStageInd].Categories[ActivitiesIndex].CategoryText,impactorData];

        this.setState({ Stages: updateSectionText }, () => {
            const updateFeelings = [...this.state.Stages];
            
            const feelingIndex = updateFeelings[stageInd].SubStages[subStageInd].Categories.findIndex(d => d.CategoryName == "Feelings");

            const newProcess = {
                Id: 0,
                ProcessId: 0,
                Comment: "",
                Emotion: "",
                SequenceNumber: updateFeelings[stageInd].SubStages[subStageInd].Categories[feelingIndex].CategoryText.length+1,
                Value: dragText.name
            };
            updateFeelings[stageInd].SubStages[subStageInd].Categories[feelingIndex].CategoryText = 
            [...updateFeelings[stageInd].SubStages[subStageInd].Categories[feelingIndex].CategoryText,newProcess];
            
            this.setState({ Stages: updateFeelings });
        });
    };
    dropTouchpoints = (e, stageInd, subStageInd) => {
        const dragText = JSON.parse(e.dataTransfer.getData("draggedText"));
        // const dragImpactor = {...this.state.draggedStakeholder}
        const updateSectionText = [...this.state.Stages];
        const impactorData = {
            Text: dragText.name,
            SequenceNumber: "1",
            ColorCode: "none"
        };
        updateSectionText[stageInd].SubStages[
            subStageInd
        ].Categories[1].CategoryText = [
            ...updateSectionText[stageInd].SubStages[subStageInd].Categories[1]
                .CategoryText,
            impactorData
        ];
        this.setState({ Stages: updateSectionText });
    };
    getChild(data) {
        this.setState({ decompProjectId: data.projectId });
        this.props.fetchDecompositionProjectsFunctionPhaseLevel(data.projectId);
    }
    changeCjm = (value) => {
        // const id = value.split("_")
        const aa = this.state.personaData.filter(d => d.PersonaId == value)
        this.setState({selectedPersona: value})
        // this.props.history.push('/customer-journey-map/'+this.props.match.params.dtId+"/"+this.state.epicId+"/"+aa[0].PersonaId+"/"+aa[0].CustomerJourneyMapId)
        window.location.href = '/customer-journey-map/'+this.props.match.params.dtId+"/"+this.state.selectedEpicId+"/"+aa[0].PersonaId+"/"+aa[0].CustomerJourneyMapId;
    }
    getEpic =  (e) =>{
        this.setState({selectedEpicId: e.target.value})
        this.props.getAllPersona(this.state.dtId,0,e.target.value,0);

        // this.props.history.push('/empathydetail/'+this.props.match.params.dtId+"/"+e.target.value)       
        // window.location.href = '/customer-journey-map/'+this.props.match.params.dtId+"/"+e.target.value+"/"+this.state.personaId+"/"+this.state.cjmId;
        // this.props.fetchCustomerJourneyMap(
        //     this.state.cjmId,
        //     this.state.epicId,
        //     this.state.personaId
        // );
        // this.props.fetchAllEmpathyLifeCycle(this.state.dtId,this.state.ProjectVersionId,this.state.epicId,this.state.EpicVersionId)
    }
    saveCJM = () => {
        const updateStkFiellds = [...this.state.Stages];
        const dd = updateStkFiellds.map(item => ({
            ...item,
            SubStages: item.SubStages && item.SubStages.map(item1 => ({
                ...item1,
                Categories: item1.Categories.map(category => {
                    if (Array.isArray(category.CategoryText)) {

                        let CategoryTextInfo = category.CategoryText;
                        if (category.CategoryName == "Impactor" || category.CategoryName == "Impactee") {
                            CategoryTextInfo = category.CategoryText.map(
                                ({ Id }) => Id
                            ).join(",")
                        } else if (category.CategoryName == "Feelings") {
                            CategoryTextInfo = category.CategoryText.map((element, index) => {
                                element.SequenceNumber = index + 1;
                                return element;
                            });
                        }

                        return {
                            ...category,
                            CategoryText: CategoryTextInfo
                            // CategoryText:
                            //     category.CategoryName == "Impactor" ||
                            //     category.CategoryName == "Impactee"
                            //         ? category.CategoryText.map(
                            //               ({ Id }) => Id
                            //           ).join(",")
                            //         : category.CategoryText
                        };
                    } else return category;
                })
            }))
        }));
        const data = {
            MapId: this.state.mapId,
            ProjectId: this.state.dtId,
            ProjectVersionId: 0,
            EpicId: this.state.epicId,
            EpicLifeCycleId: this.state.epicLifecycleId,
            EpicVersionId: 0,
            PersonaId: this.state.personaId,
            MapName: this.state.mapName,
            MapGoal: this.state.mapGoal,
            MapDescription: this.state.mapDesc,
            Stakeholders: [
                {
                    id: 1
                }
            ],
            EmpathyMap: [
                {
                    id: 1
                }
            ],
            ProcessDetail: [
                {
                    id: 1
                }
            ],
            Stages: dd
        };
        axios
            .post(config.laravelBaseUrl + "saveCustomerJourneyMap", data, {
                headers: {
                    authorization: "Bearer " + sessionStorage.getItem("userToken")
                }
            })
            .then(response => {
                responseMessage("Success", response.data.message, "");
                this.props.fetchCustomerJourneyMap(
                    this.state.cjmId,
                    this.state.epicId,
                    this.state.personaId
                );
                    // demo.amplofly.com/public
            })
            .catch(err => {
                console.log("Error", err);
            });
    };
    updateGoal = e => {
        this.setState({ mapGoal: e });
    };
    updateDesc = e => {
        this.setState({ mapDesc: e });
    };
    currentSubStageHandler = (currentSubStage, currentStageInd, currentSubStageInd) => {
        this.selectedStageInfo(currentStageInd);
        this.setState({
            currentSubStage: _.cloneDeep(currentSubStage),
            currentStageInd: currentStageInd,
            currentSubStageInd: currentSubStageInd
        })
    }
    removeLine = (e,stgInd, subStgInd, catInd,SequenceNumber) => {
        if(e.target.innerHTML == "" && e.key == "Backspace"){
            const data = [...this.state.Stages];
            const updateData = data[stgInd].SubStages[subStgInd].Categories[catInd].CategoryText.filter(d4 => d4.SequenceNumber !== SequenceNumber)
            data[stgInd].SubStages[subStgInd].Categories[catInd].CategoryText = [...updateData]
           

            this.setState({Stages: data},() => {
                const combineData = [...this.state.Stages];
                const updateFeelingsData = combineData.map((item, i) => {
                    return {
                        ...item,
                        SubStages: item.SubStages && item.SubStages.map((item1, i1) => {
                            return {
                                ...item1,
                                Categories: item1.Categories.map(
                                    (item2, i2) => {
                                        if (item2.CategoryName == "Feelings") {
                                            return {
                                                CategoryLookUpId: 0,
                                                CategoryName: "Feelings",
                                                ShowEmojis: false,
                                                CategoryText: item1.Categories.filter(d =>d.CategoryName =="Activities")[0].CategoryText.map((a, b) => {
                                                        return {
                                                            Id: 0,
                                                            ProcessId: a.Id,
                                                            Comment: "",
                                                            Emotion: "",
                                                            SequenceNumber: `${b +1}`,
                                                            Value: a.Text
                                                        };
                                                    }
                                                )
                                            };
                                        }
                                        return item2;
                                    }
                                )
                            };
                        })
                    };
                });
                this.setState({Stages: updateFeelingsData})
            })
        }
    }
    removeLifecycleStakeholder = (e,Id,stgInd,subStgInd,catInd,catTextInd) => {
        if(e.button == 2 && Id !== ""){
            const data = [...this.state.Stages]
            const updateData = data[stgInd].SubStages[subStgInd].Categories[catInd].CategoryText.filter(d4 => d4.Id !== Id)
            data[stgInd].SubStages[subStgInd].Categories[catInd].CategoryText = [...updateData]
            this.setState({Stages: data})
        }
    }
    clearData = () =>{
        this.setState({
            currentStageInd: "",
            currentSubStage: {},
            currentSubStageInd:"",
            curretDataInPopup:[],
            currentData: {
                ...this.state.currentData,
                title: "",
                comment: "",
                emoji: "",
                catTextInd: "",
                catInd: "",
                subStageInd: ""
            }
        })
    }
    render() {



        console.log("All State=>>",this.state)
        console.log("All Props=>>",this.props)

        const { data,  showNoOfForms, Stages } = this.state;
        const x = Stages.map((d, i) => {
            if (d.SubStages != undefined) {
                return d.SubStages.length;
            } else {
                return 0;
            }
        });

        const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
        
        
        const TotalSubStages = x.length>0?x.reduce(reducer):0

        const filterStackHolderLeftSidebar = this.props.FilterStackHolderLeftSidebar.filter(
            stk => {
                let stkName = stk.StakeHolderName
                    ? stk.StakeHolderName.toLowerCase()
                    : "";
                return stkName.includes(this.state.searchTerm.toLowerCase());
            }
        );

        return (
            <>
                <DashboardHeader />
                {/* <!-- Page Wrapper --> */}
                <CustomerJourneyMapScreenWrapper id="wrapper">
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* <!-- Main Content --> */}
                        <div id="content">
                            {/* <!-- Breadcrumb --> */}
                            <CJMScreenBreadcrumb />
                            {/* <!-- End Breadcrumb --> */}

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid container-dashboard">
                                <CJMScreenTopbar
                                    saveCJM={this.saveCJM}
                                    dtId={this.state.dtId}
                                    epicId={this.state.epicId}
                                    dtProjects={this.props.dtProjects}
                                />

                                <div className="row">
                                    <div className="dt-screen-main">
                                        {/* <!-- Start Left Content --> */}
                                        <CJMScreenLeftSidebar
                                            ptype={this.state.ptype}
                                            toggleClass={() =>
                                                this.toggleClass()
                                            }
                                            closePanel={() => this.closePanel()}
                                            filterVal={this.state.filterVal}
                                            filterProject={this.filterProject.bind(
                                                this
                                            )}
                                            addDrag={this.addDrag.bind(this)}
                                            getChild={this.getChild.bind(this)}
                                            decompositionchildData={
                                                this.state
                                                    .decompositionchildData
                                            }
                                            StackHolderLeftSidebar={
                                                filterStackHolderLeftSidebar
                                            }
                                            // searchStakeholdersLeftSidebar={this.searchStakeholdersLeftSidebar.bind(this)}
                                            dragStakeholder={(e, item) =>
                                                this.dragStakeholder(e, item)
                                            }
                                            searchTerm={this.state.searchTerm}
                                            searchStakeholdersLeftSidebar={e =>
                                                this.setState({
                                                    searchTerm: e.target.value
                                                })
                                            }
                                        />
                                        {/* <!-- End Left Content --> */}

                                        {/* <!-- Start Body Content --> */}
                                        <CJMScreenBodyDetail
                                            clearData={() => this.clearData()}
                                            removeLifecycleStakeholder={(e,id,stgInd,subStgInd,catInd,catTextInd) => this.removeLifecycleStakeholder(e,id,stgInd,subStgInd,catInd,catTextInd)}
                                            removeLine={(e,stgInd, subStgInd, catInd,SequenceNumber) => this.removeLine(e,stgInd, subStgInd, catInd,SequenceNumber)}
                                            curretDataInPopup={this.state.curretDataInPopup}
                                            currentSubStage={this.state.currentSubStage}
                                            currentSubStageHandler={(subitem, i, j) => this.currentSubStageHandler(subitem, i, j)}
                                            selectedPersona={this.state.selectedPersona}
                                            personaData={this.state.personaData}
                                            changeCjm={(value) => this.changeCjm(value)}
                                            getEpic = {this.getEpic.bind(this)} 
                                            selectedEpicId={this.state.selectedEpicId}
                                            epicList = {this.props.epicList}
                                            showClass={this.state.showClass}
                                            personaName={this.state.personaName}
                                            personaImage={
                                                this.state.personaImage
                                            }
                                            personaDesc={this.state.personaDesc}
                                            mapGoal={this.state.mapGoal}
                                            mapDesc={this.state.mapDesc}
                                            updateGoal={e => this.updateGoal(e)}
                                            updateDesc={e => this.updateDesc(e)}
                                            currentData={this.state.currentData}
                                            TotalSubStages={TotalSubStages}
                                            dropTouchpoints={(
                                                e,
                                                stageInd,
                                                subStageInd
                                            ) =>
                                                this.dropTouchpoints(
                                                    e,
                                                    stageInd,
                                                    subStageInd
                                                )
                                            }
                                            dropActivities={(
                                                e,
                                                stageInd,
                                                subStageInd
                                            ) =>
                                                this.dropActivities(
                                                    e,
                                                    stageInd,
                                                    subStageInd
                                                )
                                            }
                                            dropStakeholderInimpactee={(
                                                e,
                                                stageInd,
                                                subStageInd
                                            ) =>
                                                this.dropStakeholderInimpactee(
                                                    e,
                                                    stageInd,
                                                    subStageInd
                                                )
                                            }
                                            dropStakeholderImpactor={(
                                                e,
                                                stageInd,
                                                subStageInd
                                            ) =>
                                                this.dropStakeholderImpactor(
                                                    e,
                                                    stageInd,
                                                    subStageInd
                                                )
                                            }
                                            updateSubStageName={(
                                                event,
                                                stageInd,
                                                substageInd
                                            ) =>
                                                this.updateSubStageName(
                                                    event,
                                                    stageInd,
                                                    substageInd
                                                )
                                            }
                                            updateStageName={(event, stgInd) =>
                                                this.updateStageName(
                                                    event,
                                                    stgInd
                                                )
                                            }
                                            updateExperience={(e,stgInd,subStgInd,catInd,catTxtInd) => this.updateExperience(e,stgInd,subStgInd,catInd,catTxtInd)}
                                            updateOpportunities={(
                                                e,
                                                stgInd,
                                                subStgInd,
                                                catInd,
                                                catTxtInd
                                            ) =>
                                                this.updateOpportunities(
                                                    e,
                                                    stgInd,
                                                    subStgInd,
                                                    catInd,
                                                    catTxtInd
                                                )
                                            }
                                            updatePainpoints={(
                                                e,
                                                stgInd,
                                                subStgInd,
                                                catInd,
                                                catTxtInd
                                            ) =>
                                                this.updatePainpoints(
                                                    e,
                                                    stgInd,
                                                    subStgInd,
                                                    catInd,
                                                    catTxtInd
                                                )
                                            }
                                            updateTouchpoints={(
                                                e,
                                                stgInd,
                                                subStgInd,
                                                catInd,
                                                catTxtInd
                                            ) =>
                                                this.updateTouchpoints(
                                                    e,
                                                    stgInd,
                                                    subStgInd,
                                                    catInd,
                                                    catTxtInd
                                                )
                                            }
                                            updateActivities={(
                                                e,
                                                stgInd,
                                                subStgInd,
                                                catInd,
                                                catTxtInd
                                            ) =>
                                                this.updateActivities(
                                                    e,
                                                    stgInd,
                                                    subStgInd,
                                                    catInd,
                                                    catTxtInd
                                                )
                                            }
                                            updateRaiseFlag={(
                                                e,
                                                stgInd,
                                                subStgInd
                                            ) =>
                                                this.updateRaiseFlag(
                                                    e,
                                                    stgInd,
                                                    subStgInd
                                                )
                                            }
                                            handleKeyPress={(stgInd,subStgInd,catInd) => this.handleKeyPress(stgInd,subStgInd,catInd)}
                                            addSubStages={this.addSubStages}
                                            selectedSubstage={
                                                this.state.selectedSubstage
                                            }
                                            selectSubstage={(
                                                substageInd,
                                                stageInd
                                            ) =>
                                                this.selectSubstage(
                                                    substageInd,
                                                    stageInd
                                                )
                                            }
                                            removeSubStages={
                                                this.removeSubStages
                                            }
                                            addStages={this.addStages}
                                            removeStages={this.removeStages}
                                            selectStage={i =>
                                                this.selectStage(i)
                                            }
                                            selectedStage={
                                                this.state.selectedStage
                                            }
                                            data={Stages}
                                            lifecycleData={data}
                                            dtId={this.state.dtId}
                                            epicId={this.state.epicId}

                                            showEmojiSection={index =>
                                                this.showEmojiSection(index)
                                            }
                                            showNoOfForms={showNoOfForms}
                                            handleComment={(e) =>this.handleComment(e)}
                                            handleCommentByDrop={(e) =>this.handleCommentByDrop(e)}
                                            handleEmoji={(colorCode,e) =>this.handleEmoji(colorCode,e)}
                                            handleListValues={(option,e,catTextInd,catInd) => this.handleListValues(option,e,catTextInd,catInd)}
                                            handleSave={() => this.handleSave()}
                                            addAnother={() =>this.addAnother()}
                                            deleteEmotion={(info) => this.deleteEmotion(info)}
                                            selectedStageInfo={(index) => this.selectedStageInfo(index)}
                                            selectedSubStageInfo={(index) => this.selectedSubStageInfo(index)}
                                            selectedSubStageActivityInfo={(actindex) => this.selectedSubStageActivityInfo(actindex)}
                                            FeelingsStageInfo={this.state.FeelingsStageInfo}
                                            setCurrentActivityIndex={(i, j, activityIndex) => this.setCurrentActivityIndex(i, j, activityIndex)}
                                            setStageAndSubStage={(item, subitem, j) => this.setStageAndSubStage(item, subitem, j)}
                                            currentActivityIndex={this.state.currentActivityIndex}
                                            selectedOptionInDropdown={(type) => this.selectedOptionInDropdown(type)}
                                            selectedTypeForEmotion={this.state.selectedTypeForEmotion}
                                        />
                                    </div>
                                    {/* <!-- End Body Content --> */}
                                </div>
                            </div>

                            {/* <!-- /End container-fluid --> */}
                        </div>
                        {/* <!-- End of Main Content --> */}
                    </div>
                    {/* <!-- End of Content Wrapper --> */}
                </CustomerJourneyMapScreenWrapper>

                {/* <!-- End of Page Wrapper --> */}
                {/* <!-- Footer --> */}
                <footer className="bg-white py-4">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <img
                                src={require("../../common/images/diva-icon.png")}
                                className="logo-img"
                                alt="Logo"
                            />{" "}
                            <span>
                                <i>Powered by Amploglobal</i>
                            </span>
                        </div>
                    </div>
                </footer>
                {/* <!-- End of Footer --> */}
                {/* <!-- Start POPUP --> */}
                <div className="modal stakmodal" id="stakeholderModal">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <a
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">
                                        <img src="imgs/close-icon.png" alt="" />
                                    </span>
                                </a>
                            </div>
                            <div className="modal-body pt-0">
                                <div className="popup-responsive">
                                    <div className="media border-0 pb-3">
                                        <img
                                            className="mr-3"
                                            src="imgs/LogIn_image.png"
                                            alt=""
                                        />
                                        <div className="media-body text-left">
                                            <h5 className="mt-0">
                                                Kathey K. Hernandez
                                            </h5>
                                            <p>Researcher, Department</p>
                                            <p>
                                                <span>
                                                    Sphere A - Immediate - 2
                                                    Connections
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <ul
                                            className="nav nav-tabs mb-3"
                                            role="tablist"
                                        >
                                            <li className="nav-item">
                                                <a
                                                    className="nav-link active"
                                                    data-toggle="tab"
                                                    href="#tab1"
                                                    role="tab"
                                                >
                                                    Connections
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className="nav-link"
                                                    data-toggle="tab"
                                                    href="#tab2"
                                                    role="tab"
                                                >
                                                    Processes
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a
                                                    className="nav-link"
                                                    data-toggle="tab"
                                                    href="#tab3"
                                                    role="tab"
                                                >
                                                    Touchpoints
                                                </a>
                                            </li>
                                            {/* <!-- <li>
                                        <a data-toggle="tab" href="#tab1">Connections</a></li>
                                      <li><a data-toggle="tab" href="#tab2">Processes</a></li>
                                      <li><a data-toggle="tab" href="#tab3">Touchpoints</a></li> --> */}
                                        </ul>

                                        <div className="tab-content">
                                            <div
                                                id="tab1"
                                                className="tab-pane in active"
                                            >
                                                <div className="connections">
                                                    {/* <!-- <h3>Connections</h3> --> */}
                                                    <div className="border-bottom pb-3 mb-3">
                                                        <div className="impact-block">
                                                            <p>
                                                                James A. Parker
                                                                <span className="d-block">
                                                                    Role
                                                                </span>
                                                            </p>
                                                            <div className="d-flex align-items-center impct">
                                                                <span>
                                                                    Impact
                                                                </span>
                                                                <select className="custom-select">
                                                                    <option
                                                                        selected
                                                                    >
                                                                        Medium
                                                                    </option>
                                                                    <option
                                                                        selected
                                                                    >
                                                                        Low
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="influence-block">
                                                            <div className="mr-3">
                                                                <p className="m-0">
                                                                    <strong>
                                                                        Influence
                                                                    </strong>
                                                                </p>
                                                            </div>
                                                            <div className="dropdown mr-3">
                                                                <a
                                                                    className="dropdown-toggle pl-3"
                                                                    data-toggle="dropdown"
                                                                >
                                                                    <img
                                                                        className="img-fluid"
                                                                        src="imgs/arrow1.png"
                                                                        alt=""
                                                                    />
                                                                </a>

                                                                <div className="dropdown-menu">
                                                                    <a
                                                                        className="d-block"
                                                                        href="#!"
                                                                    >
                                                                        {" "}
                                                                        <img
                                                                            className="img-fluid"
                                                                            src="imgs/arrow2.png"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                    <a
                                                                        className="d-block"
                                                                        href="#!"
                                                                    >
                                                                        {" "}
                                                                        <img
                                                                            className="img-fluid"
                                                                            src="imgs/arrow1.png"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="mr-3 arrow-lg">
                                                                <img
                                                                    className="img-fluid"
                                                                    src="imgs/arrow4.png"
                                                                    alt=""
                                                                />
                                                                <p>
                                                                    Has
                                                                    Influence
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <img
                                                                    className="influence-img"
                                                                    src="imgs/LogIn_image.png"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pb-3">
                                                        <div className="impact-block">
                                                            <p>
                                                                Dave Denis
                                                                <span className="d-block">
                                                                    Product
                                                                    Owner
                                                                </span>
                                                            </p>
                                                            <div className="d-flex align-items-center impct">
                                                                <span>
                                                                    Impact
                                                                </span>
                                                                <select className="custom-select">
                                                                    <option
                                                                        selected
                                                                    >
                                                                        Medium
                                                                    </option>
                                                                    <option
                                                                        selected
                                                                    >
                                                                        Strong
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="influence-block">
                                                            <div className="mr-3">
                                                                <p className="m-0">
                                                                    <strong>
                                                                        Influence
                                                                    </strong>
                                                                </p>
                                                            </div>
                                                            <div className="dropdown mr-3">
                                                                <a
                                                                    className="dropdown-toggle pl-1"
                                                                    data-toggle="dropdown"
                                                                >
                                                                    <img
                                                                        className="img-fluid"
                                                                        src="imgs/arrow3.png"
                                                                        alt=""
                                                                    />
                                                                </a>

                                                                <div className="dropdown-menu">
                                                                    <a
                                                                        className="d-block"
                                                                        href="#!"
                                                                    >
                                                                        {" "}
                                                                        <img
                                                                            className="img-fluid"
                                                                            src="imgs/arrow2.png"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                    <a
                                                                        className="d-block"
                                                                        href="#!"
                                                                    >
                                                                        {" "}
                                                                        <img
                                                                            className="img-fluid"
                                                                            src="imgs/arrow1.png"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="mr-3 arrow-lg">
                                                                <img
                                                                    className="img-fluid"
                                                                    src="imgs/arrow5.png"
                                                                    alt=""
                                                                />
                                                                <p>
                                                                    Equal
                                                                    Influence
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <img
                                                                    className="influence-img"
                                                                    src="imgs/LogIn_image.png"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="add-comment pb-3">
                                                    <h3>Add Comment</h3>
                                                    <textarea></textarea>
                                                </div>
                                            </div>
                                            <div
                                                id="tab2"
                                                className="tab-pane fade"
                                            >
                                                <div className="connections">
                                                    {/* <!-- <h3>Connections</h3> --> */}
                                                    <div className="border-bottom pb-3 mb-3">
                                                        <div className="impact-block">
                                                            <p>
                                                                James A. Parker
                                                                <span className="d-block">
                                                                    Role
                                                                </span>
                                                            </p>
                                                            <div className="d-flex align-items-center impct">
                                                                <span>
                                                                    Impact
                                                                </span>
                                                                <select className="custom-select">
                                                                    <option
                                                                        selected
                                                                    >
                                                                        Medium
                                                                    </option>
                                                                    <option
                                                                        selected
                                                                    >
                                                                        Low
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="influence-block">
                                                            <div className="mr-3">
                                                                <p className="m-0">
                                                                    <strong>
                                                                        Influence
                                                                    </strong>
                                                                </p>
                                                            </div>
                                                            <div className="dropdown mr-3">
                                                                <a
                                                                    className="dropdown-toggle pl-3"
                                                                    data-toggle="dropdown"
                                                                >
                                                                    <img
                                                                        className="img-fluid"
                                                                        src="imgs/arrow1.png"
                                                                        alt=""
                                                                    />
                                                                </a>

                                                                <div className="dropdown-menu">
                                                                    <a
                                                                        className="d-block"
                                                                        href="#!"
                                                                    >
                                                                        {" "}
                                                                        <img
                                                                            className="img-fluid"
                                                                            src="imgs/arrow2.png"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                    <a
                                                                        className="d-block"
                                                                        href="#!"
                                                                    >
                                                                        {" "}
                                                                        <img
                                                                            className="img-fluid"
                                                                            src="imgs/arrow1.png"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="mr-3 arrow-lg">
                                                                <img
                                                                    className="img-fluid"
                                                                    src="imgs/arrow4.png"
                                                                    alt=""
                                                                />
                                                                <p>
                                                                    Has
                                                                    Influence
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <img
                                                                    className="influence-img"
                                                                    src="imgs/LogIn_image.png"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pb-3">
                                                        <div className="impact-block">
                                                            <p>
                                                                Dave Denis
                                                                <span className="d-block">
                                                                    Product
                                                                    Owner
                                                                </span>
                                                            </p>
                                                            <div className="d-flex align-items-center impct">
                                                                <span>
                                                                    Impact
                                                                </span>
                                                                <select className="custom-select">
                                                                    <option
                                                                        selected
                                                                    >
                                                                        Medium
                                                                    </option>
                                                                    <option
                                                                        selected
                                                                    >
                                                                        Strong
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="influence-block">
                                                            <div className="mr-3">
                                                                <p className="m-0">
                                                                    <strong>
                                                                        Influence
                                                                    </strong>
                                                                </p>
                                                            </div>
                                                            <div className="dropdown mr-3">
                                                                <a
                                                                    className="dropdown-toggle pl-1"
                                                                    data-toggle="dropdown"
                                                                >
                                                                    <img
                                                                        className="img-fluid"
                                                                        src="imgs/arrow3.png"
                                                                        alt=""
                                                                    />
                                                                </a>

                                                                <div className="dropdown-menu">
                                                                    <a
                                                                        className="d-block"
                                                                        href="#!"
                                                                    >
                                                                        {" "}
                                                                        <img
                                                                            className="img-fluid"
                                                                            src="imgs/arrow2.png"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                    <a
                                                                        className="d-block"
                                                                        href="#!"
                                                                    >
                                                                        {" "}
                                                                        <img
                                                                            className="img-fluid"
                                                                            src="imgs/arrow1.png"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="mr-3 arrow-lg">
                                                                <img
                                                                    className="img-fluid"
                                                                    src="imgs/arrow5.png"
                                                                    alt=""
                                                                />
                                                                <p>
                                                                    Equal
                                                                    Influence
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <img
                                                                    className="influence-img"
                                                                    src="imgs/LogIn_image.png"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="add-comment pb-3">
                                                    <h3>Add Comment</h3>
                                                    <textarea></textarea>
                                                </div>
                                            </div>
                                            <div
                                                id="tab3"
                                                className="tab-pane fade"
                                            >
                                                <div className="connections">
                                                    {/* <!-- <h3>Connections</h3> --> */}
                                                    <div className="border-bottom pb-3 mb-3">
                                                        <div className="impact-block">
                                                            <p>
                                                                James A. Parker
                                                                <span className="d-block">
                                                                    Role
                                                                </span>
                                                            </p>
                                                            <div className="d-flex align-items-center impct">
                                                                <span>
                                                                    Impact
                                                                </span>
                                                                <select className="custom-select">
                                                                    <option
                                                                        selected
                                                                    >
                                                                        Medium
                                                                    </option>
                                                                    <option
                                                                        selected
                                                                    >
                                                                        Low
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="influence-block">
                                                            <div className="mr-3">
                                                                <p className="m-0">
                                                                    <strong>
                                                                        Influence
                                                                    </strong>
                                                                </p>
                                                            </div>
                                                            <div className="dropdown mr-3">
                                                                <a
                                                                    className="dropdown-toggle pl-3"
                                                                    data-toggle="dropdown"
                                                                >
                                                                    <img
                                                                        className="img-fluid"
                                                                        src="imgs/arrow1.png"
                                                                        alt=""
                                                                    />
                                                                </a>

                                                                <div className="dropdown-menu">
                                                                    <a
                                                                        className="d-block"
                                                                        href="#!"
                                                                    >
                                                                        {" "}
                                                                        <img
                                                                            className="img-fluid"
                                                                            src="imgs/arrow2.png"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                    <a
                                                                        className="d-block"
                                                                        href="#!"
                                                                    >
                                                                        {" "}
                                                                        <img
                                                                            className="img-fluid"
                                                                            src="imgs/arrow1.png"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="mr-3 arrow-lg">
                                                                <img
                                                                    className="img-fluid"
                                                                    src="imgs/arrow4.png"
                                                                    alt=""
                                                                />
                                                                <p>
                                                                    Has
                                                                    Influence
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <img
                                                                    className="influence-img"
                                                                    src="imgs/LogIn_image.png"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pb-3">
                                                        <div className="impact-block">
                                                            <p>
                                                                Dave Denis
                                                                <span className="d-block">
                                                                    Product
                                                                    Owner
                                                                </span>
                                                            </p>
                                                            <div className="d-flex align-items-center impct">
                                                                <span>
                                                                    Impact
                                                                </span>
                                                                <select className="custom-select">
                                                                    <option
                                                                        selected
                                                                    >
                                                                        Medium
                                                                    </option>
                                                                    <option
                                                                        selected
                                                                    >
                                                                        Strong
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="influence-block">
                                                            <div className="mr-3">
                                                                <p className="m-0">
                                                                    <strong>
                                                                        Influence
                                                                    </strong>
                                                                </p>
                                                            </div>
                                                            <div className="dropdown mr-3">
                                                                <a
                                                                    className="dropdown-toggle pl-1"
                                                                    data-toggle="dropdown"
                                                                >
                                                                    <img
                                                                        className="img-fluid"
                                                                        src="imgs/arrow3.png"
                                                                        alt=""
                                                                    />
                                                                </a>

                                                                <div className="dropdown-menu">
                                                                    <a
                                                                        className="d-block"
                                                                        href="#!"
                                                                    >
                                                                        {" "}
                                                                        <img
                                                                            className="img-fluid"
                                                                            src="imgs/arrow2.png"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                    <a
                                                                        className="d-block"
                                                                        href="#!"
                                                                    >
                                                                        {" "}
                                                                        <img
                                                                            className="img-fluid"
                                                                            src="imgs/arrow1.png"
                                                                            alt=""
                                                                        />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="mr-3 arrow-lg">
                                                                <img
                                                                    className="img-fluid"
                                                                    src="imgs/arrow5.png"
                                                                    alt=""
                                                                />
                                                                <p>
                                                                    Equal
                                                                    Influence
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <img
                                                                    className="influence-img"
                                                                    src="imgs/LogIn_image.png"
                                                                    alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="add-comment pb-3">
                                                    <h3>Add Comment</h3>
                                                    <textarea></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStatetoProps = state => {
    return {
        UserInfo: state.epicScreenData.UserDetail,
        UserProjectDetails: state.epicScreenData.UserProjectDetails,
        NetworkOfInfluence: state.epicScreenData.NetworkOfInfluence,
        // StakeHolder: state.epicScreenData.StakeHolder,

        StackHolder: state.epicScreenData.StakeHolder,
        FilterStackHolder: state.epicScreenData.StakeHolder,
        FilterStackHolderLeftSidebar: state.epicScreenData.StakeHolder,

        allempathyLifecycle: state.empathyScreen.allempathyLifecycle.data,
        StkDescOnEmpathyMap: state.empathyScreen.StkDescOnEmpathyMap,

        dtProjects: state.epicScreenData.dtProjects,
        epic: state.epicScreenData.epic.EPic
            ? state.epicScreenData.epic.EPic
            : [],
        checkNoi: state.epicScreenData.checkNoi,
        versionHistoryNo: state.epicScreenData.versionHistoryNo,
        epicList: state.epicScreenData.epicList
            ? state.epicScreenData.epicList
            : [],
        cjmData: state.cjm.cjmData ? state.cjm.cjmData : {}
    };
};
export default connect(mapStatetoProps, {
    fetchBenchmarkProjectsWithDomains,
    fetchDecompositionProjects,
    fetchKpisControls,
    fetchDesignThinkingStakeHolders,
    deleteEmpathyNotesStakeHolders,
    fetchEmpathyNotesStkDesc,
    fetchDecompositionProjectsFunctionPhaseLevel,
    fetchCustomerJourneyMap,
    fetchDesignThinkingProjectDetails,
    fetchAllEpic,
    getAllPersona
})(EmpathyCustomerJourneyMap);
