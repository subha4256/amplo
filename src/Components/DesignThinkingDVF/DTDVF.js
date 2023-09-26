import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Loader from "../Loader";
import DashboardHeader from "../includes/dashboardHeader/DashboardHeader";
import DashboardFooter from "../includes/dashboardFooter/FooterComponent";
import { DTDVFWrapper } from "./Styling/DTDVFStyle";
import { DTLeftSideBarWrapper } from "../common/DTLeftSideBar/Styling/DTLeftSideBar";
import DTDVFBodyDetail from "./DTDVFBodyDetail";
import DTDVFBreadcrumb from "./DTDVFBreadcrumb";
import DTDVFTopbar from "./DTDVFTopbar";
import DTLeftSidebar from "../common/DTLeftSideBar/DTLeftSideBar";
import {
    fetchBenchmarkProjectsWithDomains,
    fetchDecompositionProjects,
    fetchKpisControls,
} from "../../actions/epicScreenActions";
import {
    fetchSwotEpics,
    fetchSwotIdeas,
    saveDvf,
    getDvfScore,
    publishScores,
} from "../../actions/ideateActions";
import { Global } from "../../utils/Env";

const config = require("../../config");

class DTDVF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decompositionchildData: [],
            loading: false,
            dragValue: {},
            filterVal: "",
            ptype: "",
            FilterStackHolderLeftSidebar: [],
            StackHolder: [],
            ideas: [],
            DtProjectId: this.props.match.params.projectId,
            EpicId: this.props.match.params.epicId,
            selectedSubEpic: 0,
            fetchedIdeas: [],
            fetchedDvf: [],
            ideasToPublish: [],
            totalSelectedId: [],
            isPublish: [],
            isScorePublish: [],
        };
        Global.callback.fetchSwotEpics_onComplete = (res) => {
            const SubEpics = res.data.EPic
                ? res.data.EPic[0].SubEpic
                    ? res.data.EPic[0].SubEpic
                    : []
                : [];
            if (SubEpics.length > 0) {
                this.props.fetchSwotIdeas(SubEpics[0].id);
                this.props.getDvfScore(SubEpics[0].id);
                this.setState({
                    selectedSubEpic: SubEpics[0].id,
                });
            }
        };
        Global.callback.saveDvf_onComplete = (res) => {
            this.props.getDvfScore(this.state.selectedSubEpic);
        };
    }

    static getDerivedStateFromProps = (nextProps, PrevState) => {
        let sel = nextProps.dvf.map((dvf) => {
            if (dvf.IsForPrototype == 1) {
                return dvf.DtIdeateSessionIdeaId;
            }
        });

        let disableList = nextProps.dvf.map((dvf) => {
            if (dvf.IsScorePublished == 1) {
                return dvf.DtIdeateSessionIdeaId;
            }
        });


        let returnObj = { ...PrevState };
        if (
            nextProps.ideas != PrevState.fetchedIdeas ||
            nextProps.dvf != PrevState.fetchedDvf
        ) {
            let newIdeas = nextProps.ideas.map((idea) => {
     
                let dvfInd = nextProps.dvf
                    .map((dvf) => dvf.DtIdeateSessionIdeaId)
                    .indexOf(idea.DtIdeateSessionIdeaId);
                return {
                    IsForPrototype: idea.IsForPrototype,

                    id: idea.DtIdeateSessionIdeaId,
                    title: idea.IdeaTitle,
                    description: idea.IdeaNotePlainText,
                    votes: idea.NoOfVotes,
                    desirable:
                        dvfInd != -1
                            ? nextProps.dvf[dvfInd].AggregatedDesirableScore
                            : 0,
                    viable:
                        dvfInd != -1
                            ? nextProps.dvf[dvfInd]
                                  .AggregatedFinacialViabilityScore
                            : 0,
                    feasible:
                        dvfInd != -1
                            ? nextProps.dvf[dvfInd]
                                  .AggregatedTechnicalFeasibility
                            : 0,
                    totalScore:
                        dvfInd != -1 ? nextProps.dvf[dvfInd].TotalScore : 0,
                };
            });
            returnObj = {
                ...returnObj,
                ideas: newIdeas,
                fetchedIdeas: nextProps.ideas,
                fetchedDvf: nextProps.dvf,
                totalSelectedId: sel,
                isPublish: disableList,
            };
        }
        return returnObj;
    };

    saveDvf = () => {
    

        let saveObj = this.state.ideas.map((idea) => {
            return {
                IdeaId: idea.id,
                DesirableScore: idea.desirable,
                FinacialViabilityScore: idea.viable,
                TechnicalFeasibility: idea.feasible,
                IsForPrototype: idea.IsForPrototype,
            };
        });

        let jsonData = {
            InputJson: saveObj,
        };
    
        this.props.saveDvf(jsonData);
    };

    sliderValueChangeHandler = (ind, key, value) => {
        if (!Number.isInteger(value)) {
            value = value.toFixed(1);
        }
        let ideas = [...this.state.ideas];
        ideas[ind][key] = value;
        ideas[ind].totalScore = (
            (Number(ideas[ind].desirable) +
                Number(ideas[ind].viable) +
                Number(ideas[ind].feasible)) /
            3
        ).toFixed(1);
        this.setState({
            ideas,
        });
    };

    publishIdeas = (e, ideaId) => {
     
        let ideas = [...this.state.ideasToPublish];
        let totalSelected = [...this.state.totalSelectedId];

        if (e.target.checked) {
            ideas.push({
                IdeaId: ideaId,
                IsPublish: 1,
            });
            totalSelected.push(ideaId);
        } else {
            let ideaInd = ideas.map((idea) => idea.IdeaId).indexOf(ideaId);
            if (ideaInd != -1) {
                ideas.splice(ideaInd, 1);
            }
            // let remId = totalSelected.map((idea) => idea).indexOf(ideaId);
            // if (remId != -1) {
            //     totalSelected.splice(remId, 1);
            // }

            totalSelected = totalSelected.filter((idea) => ideaId != idea);
        }

     

        this.setState({
            totalSelectedId: totalSelected,
        });

        const newIdea = this.state.ideas.map((idea) => ({
            ...idea,
            IsForPrototype: totalSelected.includes(idea.id) ? 1 : 0,
        }));

        this.setState({
            ideas: newIdea,
        });

        this.setState({
            ideasToPublish: ideas,
        });
    };

    componentDidMount() {
        this.props.fetchSwotEpics(this.state.DtProjectId, this.state.EpicId);
        this.props.fetchBenchmarkProjectsWithDomains();
        this.props.fetchDecompositionProjects();
        this.props.fetchKpisControls();
    }

    publishScores = async () => {
        let newInputJson = this.state.ideas.map((idea) => {
            return { IdeaId: idea.id, IsPublish: 1 };
        });

        console.log(newInputJson);

        let totalPublish = newInputJson.map((idea) => idea.IdeaId);

        if (
            window.confirm("After publish you can not able to change DVF score")
        ) {
            this.props.publishScores({
                InputJson: newInputJson,
            });

            this.setState({
                isPublish: totalPublish,
            });
        } else {
            return null;
        }
    };

    async getChild(data) {
        let selfOBj = this;
        selfOBj.setState({ loading: true });
        axios
            .get(
                config.laravelBaseUrl +
                    "getDecompositionProjectsFunctionPhaseLevel/" +
                    data.projectId,
                {
                    headers: {
                        authorization:
                            "Bearer " + sessionStorage.getItem("userToken"),
                    },
                }
            )
            .then(function (response) {
                console.log(response);
                selfOBj.setState({ loading: false });
                let jsonObj = {
                    projectId: data.projectId,
                    data: response.data.data,
                };
                selfOBj.setState({ decompositionchildData: jsonObj });
            });
    }
    getDesignThinkingStakeHolders() {
        axios
            .get(config.laravelBaseUrl + "getDesignThinkingStakeHolders", {
                headers: {
                    authorization:
                        "Bearer " + sessionStorage.getItem("userToken"),
                },
            })
            .then((res) => {
                console.log("getDesignThinkingStakeHolders", res);
                this.setState({
                    StackHolder: res.data.data,
                    FilterStackHolder: res.data.data,
                    FilterStackHolderLeftSidebar: res.data.data,
                });
            });
    }
    searchStakeholdersLeftSidebar = (e) => {
        const text = e.target.value;
        const regex = new RegExp(text.toLowerCase(), "i");
        let data = this.state.StackHolder.filter((word) =>
            regex.test(word.StakeHolderName.toLowerCase())
        );
        this.setState({ FilterStackHolderLeftSidebar: data });
    };
    filterProject(e, type) {
        this.setState({ filterVal: e.target.value, ptype: type });
    }
    addDrag(e, domain) {
        const data = { id: domain.id, name: domain.name };
        this.setState({ dragValue: data });
    }
    dragStakeholder = (e) => {
        this.setState({ draggedStakeholderId: e });
    };
    handleSliderChangeComplete = (key, value, scoretype) => {
        if (!Number.isInteger(value)) {
            value = value.toFixed(2);
        }
        let ideas = this.state.ideas;
        ideas[key][scoretype] = value;
        ideas[key].totalScore =
            parseFloat(ideas[key].desirable) +
            parseFloat(ideas[key].viable) +
            parseFloat(ideas[key].feasible);
        this.setState({ ideas });
    };
    changeSelectedSubEpic = (subEpicId) => {
        this.props.fetchSwotIdeas(subEpicId);
        this.props.getDvfScore(subEpicId);
        this.setState({
            selectedSubEpic: subEpicId,
        });
    };
    render() {
        // const {data, chartData, expData, showNoOfForms, options} = this.state;
        console.log("StateDVF=>", this.state);
        console.log("props=>>", this.props);

        return (
            <>
                <DashboardHeader />
                <Loader loading={this.state.loading} />
                {/* <!-- Page Wrapper --> */}
                <div id="wrapper">
                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* <!-- Main Content --> */}
                        <div id="content">
                            {/* <!-- Breadcrumb --> */}
                            <DTDVFBreadcrumb />
                            {/* <!-- End Breadcrumb --> */}

                            {/* <!-- Begin Page Content --> */}
                            <DTDVFWrapper className="container-fluid container-dashboard">
                                <DTDVFTopbar
                                    saveDvf={this.saveDvf}
                                    projectId={this.state.DtProjectId}
                                    epicId={this.state.EpicId}
                                />

                                <div className="row">
                                    <div className="dt-screen-main">
                                        {/* <!-- Start Left Content --> */}
                                        <DTLeftSideBarWrapper>
                                            <DTLeftSidebar
                                                ptype={this.state.ptype}
                                                filterVal={this.state.filterVal}
                                                filterProject={this.filterProject.bind(
                                                    this
                                                )}
                                                addDrag={this.addDrag.bind(
                                                    this
                                                )}
                                                getChild={this.getChild.bind(
                                                    this
                                                )}
                                                decompositionchildData={
                                                    this.state
                                                        .decompositionchildData
                                                }
                                                StackHolderLeftSidebar={
                                                    this.state
                                                        .FilterStackHolderLeftSidebar
                                                }
                                                searchStakeholdersLeftSidebar={this.searchStakeholdersLeftSidebar.bind(
                                                    this
                                                )}
                                                dragStakeholder={(e) =>
                                                    this.dragStakeholder(e)
                                                }
                                            />
                                        </DTLeftSideBarWrapper>
                                        {/* <!-- End Left Content --> */}

                                        {/* <!-- Start Body Content --> */}
                                        <DTDVFBodyDetail
                                            ideas={this.state.ideas}
                                            totalSelected={
                                                this.state.totalSelectedId
                                            }
                                            isPublish={this.state.isPublish}
                                            changeSelectedSubEpic={
                                                this.changeSelectedSubEpic
                                            }
                                            selectedSubEpic={
                                                this.state.selectedSubEpic
                                            }
                                            epics={this.props.epics}
                                            handleSliderChangeComplete={
                                                this.handleSliderChangeComplete
                                            }
                                            sliderValueChangeHandler={
                                                this.sliderValueChangeHandler
                                            }
                                            publishIdeas={this.publishIdeas}
                                            ideasToPublish={
                                                this.state.ideasToPublish
                                            }
                                            publishScores={this.publishScores}
                                            projectId={this.state.DtProjectId}
                                            epicId={this.state.EpicId}
                                            dvf={this.props.dvf}
                                        />
                                    </div>
                                    {/* <!-- End Body Content --> */}
                                </div>
                            </DTDVFWrapper>

                            {/* <!-- /End container-fluid --> */}
                        </div>
                        {/* <!-- End of Main Content --> */}
                    </div>
                    {/* <!-- End of Content Wrapper --> */}
                </div>
                <DashboardFooter />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    epics: state.ideate.epics,
    ideas: state.ideate.ideas,
    dvf: state.ideate.dvf,
});

export default connect(mapStateToProps, {
    fetchBenchmarkProjectsWithDomains,
    fetchDecompositionProjects,
    fetchKpisControls,
    fetchSwotEpics,
    fetchSwotIdeas,
    saveDvf,
    getDvfScore,
    publishScores,
})(DTDVF);
